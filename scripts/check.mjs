#!/usr/bin/env node
// Lint for the skills. Runs in CI and before every push.
//   node scripts/check.mjs
// Fails on: missing or malformed frontmatter, a router over 150 lines, a doctrine over 1500
// characters, bank keys or validator-banned words inside a doctrine, a playbook whose
// interview options have no clause, a folder that is not mira-*, and generated files that
// carry a stale registry marker. Warns on the words that make text read like a machine wrote it.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const MAX_ROUTER_LINES = 150;
const MAX_DOCTRINE = 1500;

// Keys the pipeline's validator would flag if they leaked into a prompt, plus the words it
// bans outright. Kept here as data so the list can be regenerated from the registry.
const BANK_KEYS = JSON.parse(readFileSync(join(ROOT, "scripts", "bank-keys.json"), "utf8"));
const BANNED_WORDS = ["slowly", "gently", "serenely", "softly", "calmly", "leisurely", "gracefully", "peacefully"];
const LAYOUT_WORDS = ["end card", "end screen", "copy space", "copy-space", "call to action", "cta", "overlay", "safe zone", "ui-safe", "negative space", "lower third", "watermark", "caption area", "text area"];
// Not errors. Just the vocabulary that makes a page read as generated.
const SLOP = ["leverage", "unleash", "seamlessly", "elevate", "dive into", "delve", "in today's", "game-changing", "cutting-edge", "robust", "empower", "harness the power", "unlock"];

let errors = 0, warnings = 0;
const fail = (m) => { console.error("ERROR  " + m); errors++; };
const warn = (m) => { console.warn("warn   " + m); warnings++; };

function frontmatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { fail(`${file}: no frontmatter`); return null; }
  const fm = m[1];
  const name = fm.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  // yaml scalar or a >- folded block: everything up to the next top-level key
  const description = fm.match(/^description:\s*([\s\S]*?)(?=\n[a-z_-]+:|$(?![\s\S]))/m)?.[1]?.replace(/^>-?\s*/, "").replace(/\s+/g, " ").trim();
  if (!name) fail(`${file}: frontmatter has no name`);
  if (!description || description.length < 60) fail(`${file}: description missing or shorter than 60 chars`);
  if (!/^license:\s*MIT/m.test(fm)) fail(`${file}: license must be MIT`);
  return { name, description, raw: fm, body: text.slice(m[0].length) };
}

function section(body, title) {
  const re = new RegExp(`^## ${title}\\s*\\n([\\s\\S]*?)(?=^## |\\Z)`, "m");
  const m = body.match(re);
  return m ? m[1].trim() : null;
}

function miraMeta(fm) {
  // metadata.mira block: two-space indented yaml, values are scalars or [a, b] lists.
  const m = fm.match(/^metadata:\n((?:[ \t]+.*\n?)+)/m);
  if (!m) return null;
  const block = m[1];
  if (!/^\s+mira:/m.test(block)) return null;
  const out = {};
  for (const line of block.split("\n")) {
    const kv = line.match(/^\s{4,}([a-z0-9_]+):\s*(.+)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[")) v = v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
    else if (/^\d+$/.test(v)) v = Number(v);
    else v = v.replace(/^["']|["']$/g, "");
    out[kv[1]] = v;
  }
  return out;
}

// A key "leaks" when it reads as a label, not as English: anything with an underscore or a digit,
// plus the handful of single-word names nobody would write in prose by accident.
const JARGON = ["rembrandt", "chiaroscuro", "snorricam", "hyperlapse", "eterna", "ektachrome", "kodachrome", "dashcam"];
const allKeys = new Set([...Object.values(BANK_KEYS).flat().filter((k) => /[_0-9]/.test(k)), ...JARGON]);

for (const dir of readdirSync(SKILLS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  if (!/^mira-[a-z0-9-]+$/.test(dir)) { fail(`${dir}: skill folders must be named mira-*`); continue; }
  const file = join(SKILLS, dir, "SKILL.md");
  if (!existsSync(file)) { fail(`${dir}: no SKILL.md`); continue; }
  const text = readFileSync(file, "utf8");
  const fm = frontmatter(text, dir);
  if (!fm) continue;
  if (fm.name !== dir) fail(`${dir}: frontmatter name '${fm.name}' does not match the folder`);
  const lines = text.split("\n").length;
  if (lines > MAX_ROUTER_LINES) fail(`${dir}: SKILL.md is ${lines} lines, limit ${MAX_ROUTER_LINES}`);
  if (/[а-яё]/i.test(fm.body)) fail(`${dir}: Cyrillic in the body; only the description may carry trigger phrases in other languages`);
  for (const w of SLOP) if (new RegExp(`\\b${w}\\b`, "i").test(text)) warn(`${dir}: '${w}' reads like a machine wrote it`);
  if (/(^|\n)(\*\*[^*]+\*\*:\s*){3,}/.test(fm.body)) warn(`${dir}: bold-label lists in a row`);

  const meta = miraMeta(fm.raw);
  if (meta) {
    // playbook checks
    for (const k of ["id", "kind", "order", "title"]) if (meta[k] === undefined) fail(`${dir}: metadata.mira.${k} missing`);
    if (!["video", "image", "both", "model3d"].includes(meta.kind)) fail(`${dir}: metadata.mira.kind must be video | image | both | model3d`);
    if (meta.kind === "model3d" && !meta.model3d_style) fail(`${dir}: model3d_style required for kind model3d`);
    if ((meta.kind === "video" || meta.kind === "both") && !meta.video_style) fail(`${dir}: video_style required for kind ${meta.kind}`);
    if ((meta.kind === "image" || meta.kind === "both") && !meta.image_style) fail(`${dir}: image_style required for kind ${meta.kind}`);
    const doctrine = section(fm.body, "Doctrine");
    if (!doctrine) fail(`${dir}: no ## Doctrine section`);
    else {
      if (doctrine.length > MAX_DOCTRINE) fail(`${dir}: doctrine is ${doctrine.length} chars, limit ${MAX_DOCTRINE}`);
      const low = doctrine.toLowerCase();
      for (const key of allKeys) if (new RegExp(`(^|[^a-z0-9_])${key}([^a-z0-9_]|$)`).test(low)) fail(`${dir}: bank key '${key}' inside the doctrine`);
      for (const w of BANNED_WORDS) if (new RegExp(`\\b${w}\\b`).test(low)) fail(`${dir}: banned adverb '${w}' inside the doctrine`);
      for (const w of LAYOUT_WORDS) if (new RegExp(`\\b${w}\\b`).test(low)) fail(`${dir}: layout word '${w}' inside the doctrine - the model draws it as an object`);
    }
    const hint = section(fm.body, "Hint");
    if (!hint || hint.split("\n").length > 2) fail(`${dir}: ## Hint must be one or two lines`);
    const interview = section(fm.body, "Interview");
    if (!interview) fail(`${dir}: no ## Interview section`);
    else {
      const qs = interview.split(/\n(?=- \*\*)/).filter((q) => q.trim().startsWith("- **"));
      if (qs.length < 1 || qs.length > 4) fail(`${dir}: interview needs 1-4 questions, has ${qs.length}`);
      for (const q of qs) {
        const head = q.match(/^- \*\*([a-z0-9_]+)\*\*\s+(.+?)\s*(?:\(default:\s*([a-z0-9_-]+)\))?\s*$/m);
        if (!head) { fail(`${dir}: interview question line malformed: ${q.split("\n")[0]}`); continue; }
        const opts = [...q.matchAll(/^\s+- `([a-z0-9_-]+)`\s+([^:]+):\s*(.+)$/gm)];
        if (opts.length < 2) fail(`${dir}: question '${head[1]}' needs at least 2 options with clauses`);
        if (head[3] && !opts.some((o) => o[1] === head[3])) fail(`${dir}: question '${head[1]}' default '${head[3]}' is not among its options`);
        for (const o of opts) {
          const low = o[3].toLowerCase();
          for (const key of allKeys) if (new RegExp(`(^|[^a-z0-9_])${key}([^a-z0-9_]|$)`).test(low)) fail(`${dir}: bank key '${key}' inside option '${o[1]}'`);
        }
      }
    }
    const models = section(fm.body, "Model picks");
    if (models && Array.isArray(meta.models))
      for (const m of models.matchAll(/`([a-z0-9-]+)`/g)) if (!meta.models.includes(m[1]) && !["skill", "generate_video", "generate_image"].includes(m[1])) warn(`${dir}: model picks mention '${m[1]}' which is not in metadata.mira.models`);
  }

  // generated references must say so and stay under the reference dir
  const refs = join(SKILLS, dir, "references");
  if (existsSync(refs)) {
    const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
    for (const f of walk(refs)) {
      if (statSync(f).size === 0) fail(`${dir}: empty reference ${f}`);
      const t = readFileSync(f, "utf8");
      // generated model files may quote Cyrillic examples (MiniMax reads Cyrillic); hand-written ones may not
      if (/[а-яё]/i.test(t) && !t.includes("generated from the registry")) fail(`${dir}: Cyrillic in ${f}`);
    }
  }
}

const version = readFileSync(join(ROOT, "VERSION"), "utf8").trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`VERSION '${version}' is not semver`);
for (const f of [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json"]) {
  const j = JSON.parse(readFileSync(join(ROOT, f), "utf8"));
  const v = j.version ?? j.plugins?.[0]?.version;
  if (v !== version) fail(`${f}: version ${v} differs from VERSION ${version}`);
}

console.log(`${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
