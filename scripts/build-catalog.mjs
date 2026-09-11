#!/usr/bin/env node
// Writes catalog.json: the index Mira's own agent (AnythingLLM shelf) and the MCP server read.
// Same schema as the shelf's catalog (visual-guides-catalog-1) plus a `skills` array with the
// playbook ids, so a consumer can list playbooks without opening every SKILL.md.
//   node scripts/build-catalog.mjs          write
//   node scripts/build-catalog.mjs --check  verify it is current
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const OUT = join(ROOT, "catalog.json");
const SECTION_EXT = /\.(md|csv)$/i;
const SKIP = new Set(["SKILL.md", "LICENSE", "NOTICE", "README.md"]);
const REPO = "https://github.com/Global-AI-Group-Inc/content-generation-skills";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
}
function titleOf(file) {
  const raw = readFileSync(file, "utf8");
  if (file.toLowerCase().endsWith(".csv")) return `CSV, columns: ${raw.split("\n", 1)[0].trim()}`;
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
  for (const line of body.split("\n")) { const m = line.match(/^#{1,3}\s+(.+?)\s*$/); if (m) return m[1].replace(/[*`]/g, ""); }
  return (body.split("\n").find((l) => l.trim()) || "").slice(0, 120);
}
// End-of-input is spelled (?![\s\S]): with the m flag a bare $ stops at the first line break, which cut folded
// (>-) descriptions down to nothing and "When to use" down to its first line.
function fmField(fm, name) { return fm.match(new RegExp(`^${name}:\\s*([\\s\\S]*?)(?=\\n[a-z_-]+:|(?![\\s\\S]))`, "m"))?.[1]?.trim(); }
function miraMeta(fm) {
  const m = fm.match(/^metadata:\n((?:[ \t]+.*\n?)+)/m); if (!m || !/^\s+mira:/m.test(m[1])) return null;
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^\s{4,}([a-z0-9_]+):\s*(.+)$/); if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[")) v = v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
    else if (/^\d+$/.test(v)) v = Number(v); else v = v.replace(/^["']|["']$/g, "");
    out[kv[1]] = v;
  }
  return out;
}
function firstParagraph(body, title) {
  const m = body.match(new RegExp(`^## ${title}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"));
  if (!m) return "";
  return m[1].trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
}

const guides = {}; const skills = [];
for (const name of readdirSync(SKILLS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  const dir = join(SKILLS, name);
  const entry = join(dir, "SKILL.md");
  const text = readFileSync(entry, "utf8");
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const body = text.slice((text.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? "").length);
  const sections = {};
  for (const file of walk(dir).sort()) {
    const rel = relative(dir, file);
    if (SKIP.has(rel) || !SECTION_EXT.test(rel)) continue;
    sections[rel.replace(/^references\//, "").replace(SECTION_EXT, "")] = { file: rel, bytes: statSync(file).size, title: titleOf(file) };
  }
  const description = fmField(fm, "description")?.replace(/^>-?\s*/, "").replace(/\s+/g, " ") ?? "";
  guides[name] = {
    source: `${REPO}/tree/main/skills/${name}`,
    license: "MIT",
    attribution: "",
    summary: description.split(/\.\s/)[0].slice(0, 240),
    entry: "SKILL.md",
    entryBytes: statSync(entry).size,
    hasNotice: false,
    sections,
  };
  const meta = miraMeta(fm);
  if (meta) skills.push({
    id: meta.id, skill: name, title: meta.title, kind: meta.kind,
    video_style: meta.video_style ?? null, image_style: meta.image_style ?? null,
    models: meta.models ?? [], order: meta.order ?? 0, icon: meta.icon ?? null,
    when: firstParagraph(body, "When to use"),
    tool: meta.kind === "image" ? "generate_image" : meta.kind === "video" ? "generate_video" : meta.kind === "model3d" ? "generate_3d" : "generate_video / generate_image",
  });
}
skills.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
const version = readFileSync(join(ROOT, "VERSION"), "utf8").trim();
const catalog = { schema: "visual-guides-catalog-1", snapshot: version, repo: REPO, tools: {}, skills, guides };
const json = JSON.stringify(catalog, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (!existsSync(OUT) || readFileSync(OUT, "utf8") !== json) { console.error("catalog.json is stale: run node scripts/build-catalog.mjs"); process.exit(1); }
  console.log("catalog.json is current");
} else {
  writeFileSync(OUT, json);
  console.log(`catalog.json: ${Object.keys(guides).length} skills, ${skills.length} playbooks, snapshot ${version}`);
}
