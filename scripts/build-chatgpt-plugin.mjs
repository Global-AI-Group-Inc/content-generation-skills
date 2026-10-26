#!/usr/bin/env node
// Builds the ChatGPT/Codex plugin package: dist/mira-chatgpt.zip with plugin.json, mcp.json,
// skills/ and assets/ at the ZIP root. Sources live in chatgpt/: the manifests, the tool allowlist
// of the /chatgpt endpoint, and rewrites.json, which says how the shipped skills differ from the
// repo skills (bridge, social, 3D and upload tools are not served there). Same input, same bytes.
//   node scripts/build-chatgpt-plugin.mjs           write dist/mira-chatgpt.zip
//   node scripts/build-chatgpt-plugin.mjs --list    print the files instead
// check.mjs imports buildPackage() and validates the result.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, lstatSync, existsSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "chatgpt");
const OUT = join(ROOT, "dist", "mira-chatgpt.zip");
const SKIP = new Set([".DS_Store", "Thumbs.db"]);

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const posix = (p) => p.split(sep).join("/");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => !SKIP.has(e.name))
    .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}

// Replaces one "## Heading" section (up to the next heading of level 1 or 2, or the end) as a whole.
function replaceSection(text, heading, replacement, where) {
  const lines = text.split("\n");
  const starts = lines.flatMap((l, i) => (l.trim() === heading ? [i] : []));
  if (starts.length !== 1) throw new Error(`${where}: section '${heading}' found ${starts.length} times, expected 1`);
  const start = starts[0];
  let end = lines.findIndex((l, i) => i > start && /^#{1,2} /.test(l));
  if (end < 0) end = lines.length;
  const tail = lines.slice(end);
  const body = replacement.trim() ? replacement.replace(/\n*$/, "\n").split("\n").slice(0, -1) : [];
  const head = lines.slice(0, start);
  if (!body.length) while (head.length && !head[head.length - 1].trim()) head.pop(); // dropped: no double blank line
  return [...head, ...body, ...(tail.length ? ["", ...tail] : [""])].join("\n");
}

// The package is English only. Skill descriptions carry trigger phrases in other languages as quoted
// items of a list ("dubbing", "озвучка", "субтитры"); drop the Cyrillic items and the comma before each.
const CYRILLIC = /[А-Яа-яЁё]/;
function stripCyrillicTriggers(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n/);
  if (!m) return text;
  const MARK = "\u0000";
  let fm = m[0].replace(/"[^"\n]*(?:\n[^"\n]*)?"/g, (q) => (CYRILLIC.test(q) ? MARK : q));
  const withComma = new RegExp(`,\\s*${MARK}`), bare = new RegExp(`${MARK}\\s*,?[ \\t]*`);
  while (fm.includes(MARK)) fm = withComma.test(fm) ? fm.replace(withComma, "") : fm.replace(bare, "");
  return fm + text.slice(m[0].length);
}

// A tool the /chatgpt endpoint exposes under another name (miracle -> replace_in_video). Renames the
// bare lowercase word only, as the server does in its own descriptions: not "Miracle", not miracle_*,
// not a file name (miracle.md), and not the estimate_cost kind value, which keeps the old name.
export const renameRe = (from) => new RegExp(`(?<![\\w/.-])(?<!kind \`)${from}(?![\\w./-])`, "g");

export function loadConfig() {
  return {
    tools: readJson(join(SRC, "chatgpt-tools.json")),
    rewrites: readJson(join(SRC, "rewrites.json")),
    plugin: readJson(join(SRC, "plugin.json")),
    mcp: readJson(join(SRC, "mcp.json")),
    version: readFileSync(join(ROOT, "VERSION"), "utf8").trim(),
  };
}

// Returns { files: [{ path, data }], plugin, mcp } with paths relative to the plugin root.
export function buildPackage() {
  const { tools, rewrites, plugin: pluginSrc, mcp, version } = loadConfig();
  const excludedSkills = new Set(tools.excludedSkills);
  const drop = new Set(rewrites.drop);
  const files = new Map();

  for (const dir of readdirSync(join(ROOT, "skills"), { withFileTypes: true })) {
    if (!dir.isDirectory() || excludedSkills.has(dir.name)) continue;
    for (const abs of walk(join(ROOT, "skills", dir.name))) {
      if (lstatSync(abs).isSymbolicLink()) throw new Error(`${posix(relative(ROOT, abs))}: symlinks are not allowed in the package`);
      const rel = posix(relative(ROOT, abs));
      if (!drop.has(rel)) files.set(rel, readFileSync(abs));
    }
  }
  for (const rel of drop) if (!existsSync(join(ROOT, rel))) throw new Error(`rewrites.drop: ${rel} does not exist any more`);

  for (const [rel, o] of Object.entries(rewrites.override)) {
    if (!files.has(rel)) throw new Error(`rewrites.override: ${rel} is not in the package`);
    files.set(rel, readFileSync(join(ROOT, o.with)));
  }

  for (const r of rewrites.rewrite) {
    const where = `rewrites: ${r.file}`;
    if (!files.has(r.file)) throw new Error(`${where} is not in the package`);
    if (rewrites.override[r.file]) throw new Error(`${where} is overridden whole; edit the override instead`);
    let text = files.get(r.file).toString("utf8");
    if (r.section) text = replaceSection(text, r.section, r.replace, where);
    else {
      const n = text.split(r.find).length - 1;
      if (n !== 1) throw new Error(`${where}: text found ${n} times, expected 1: ${JSON.stringify(r.find.slice(0, 70))}`);
      text = text.replace(r.find, () => r.replace);
    }
    files.set(r.file, Buffer.from(text, "utf8"));
  }

  if (rewrites.stripCyrillicTriggers)
    for (const [rel, data] of files) if (rel.endsWith("/SKILL.md")) files.set(rel, Buffer.from(stripCyrillicTriggers(data.toString("utf8")), "utf8"));

  for (const [from, to] of Object.entries(tools.renamed ?? {}))
    for (const [rel, data] of files)
      if (/\.(md|csv|txt|ya?ml|json)$/.test(rel)) files.set(rel, Buffer.from(data.toString("utf8").replace(renameRe(from), to), "utf8"));

  // version follows the repo; key order keeps $schema and name first
  const { $schema, name, ...rest } = pluginSrc;
  const plugin = { $schema, name, version, ...rest };
  const assets = walk(join(SRC, "assets")).map((abs) => [`assets/${posix(relative(join(SRC, "assets"), abs))}`, readFileSync(abs)]);

  const all = [
    ["plugin.json", Buffer.from(JSON.stringify(plugin, null, 2) + "\n")],
    ["mcp.json", Buffer.from(JSON.stringify(mcp, null, 2) + "\n")],
    ["LICENSE", readFileSync(join(ROOT, "LICENSE"))],
    ...assets,
    ...files,
  ].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return { files: all.map(([path, data]) => ({ path, data })), plugin, mcp };
}

// --- ZIP (PKWARE APPNOTE): deflate, fixed timestamp, no extra fields -------------------------------
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
const DOS_TIME = 0, DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1; // 2026-01-01 00:00

export function zip(files) {
  const locals = [], centrals = [];
  let offset = 0;
  for (const { path, data } of files) {
    const name = Buffer.from(path, "utf8");
    const deflated = deflateRawSync(data, { level: 9 });
    const stored = deflated.length >= data.length;
    const body = stored ? data : deflated;
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(stored ? 0 : 8, 8); local.writeUInt16LE(DOS_TIME, 10); local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(body.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(0x0314, 4); central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8); central.writeUInt16LE(stored ? 0 : 8, 10); central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14); central.writeUInt32LE(crc, 16); central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24); central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE((0o100644 << 16) >>> 0, 38); central.writeUInt32LE(offset, 42);
    locals.push(local, name, body);
    centrals.push(central, name);
    offset += local.length + name.length + body.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { files, plugin } = buildPackage();
  if (process.argv.includes("--list")) {
    for (const f of files) console.log(`${String(f.data.length).padStart(8)}  ${f.path}`);
  } else {
    mkdirSync(dirname(OUT), { recursive: true });
    const buf = zip(files);
    writeFileSync(OUT, buf);
    console.log(`${posix(relative(ROOT, OUT))}: ${plugin.name} ${plugin.version}, ${files.length} files, ${(buf.length / 1024).toFixed(0)} KiB`);
  }
}
