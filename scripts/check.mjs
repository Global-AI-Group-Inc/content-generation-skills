#!/usr/bin/env node
// Lint for the skills. Runs in CI and before every push.
//   node scripts/check.mjs
// Fails on: missing or malformed frontmatter, a router over 150 lines, a doctrine over 1500
// characters, bank keys or validator-banned words inside a doctrine, a playbook whose
// interview options have no clause, a folder that is not mira-*, and generated files that
// carry a stale registry marker. Warns on the words that make text read like a machine wrote it.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";
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
for (const f of [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json", ".codex-plugin/plugin.json"]) {
  const j = JSON.parse(readFileSync(join(ROOT, f), "utf8"));
  const v = j.version ?? j.plugins?.[0]?.version;
  if (v !== version) fail(`${f}: version ${v} differs from VERSION ${version}`);
}

await checkChatgptPackage();

console.log(`${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);

// The ChatGPT/Codex plugin package (scripts/build-chatgpt-plugin.mjs). Builds it in memory and checks
// it against the Agent Plugins schemas, the OpenAI submission limits and the catalog rules: the
// shipped skills name only tools the /chatgpt endpoint serves, the listing sells nothing, exactly
// five positive and three negative review cases. Needs ajv (npm ci).
async function checkChatgptPackage() {
  const { buildPackage, loadConfig } = await import("./build-chatgpt-plugin.mjs");
  const P = (m) => fail(`chatgpt: ${m}`);
  let pkg, cfg;
  try { cfg = loadConfig(); pkg = buildPackage(); } catch (e) { P(`build failed: ${e.message}`); return; }
  const { tools, rewrites } = cfg;
  const files = new Map(pkg.files.map((f) => [f.path, f.data]));

  // the allowlist itself
  const allowed = new Set(tools.tools);
  if (allowed.size !== tools.tools.length) P("chatgpt-tools.json lists a tool twice");
  for (const t of tools.excluded) if (allowed.has(t)) P(`'${t}' is both allowed and excluded`);
  for (const t of allowed) if (tools.excludedPrefixes.some((p) => t.startsWith(p))) P(`allowed tool '${t}' has an excluded prefix`);

  // overrides are written against one version of their source
  for (const [rel, o] of Object.entries(rewrites.override)) {
    const sha = createHash("sha256").update(readFileSync(join(ROOT, rel))).digest("hex");
    if (sha !== o.sha256) P(`${rel} changed since ${o.with} was written: port the change, then set its sha256 to ${sha}`);
  }

  // shipped skills
  const skillNames = new Set();
  const exceptions = tools.exceptions ?? [];
  const toolRe = new RegExp(`\\b(${[...tools.excluded, ...tools.excludedSkills].map((t) => t.replace(/[-]/g, "\\-")).join("|")}|(?:${tools.excludedPrefixes.join("|")})[a-z0-9_]+)\\b`, "g");
  for (const [path, data] of files) {
    if (/(^|\/)\.|\.app\.json$|^hooks\//.test(path)) P(`${path}: hidden files, .app.json and hooks cannot be submitted`);
    if (!path.startsWith("skills/") || !/\.(md|csv|txt|ya?ml|json)$/.test(path)) continue;
    const text = data.toString("utf8");
    for (const m of text.matchAll(toolRe)) {
      if (exceptions.some((x) => x.file === path && x.name === m[1])) continue;
      P(`${path}: names '${m[1]}', which the /chatgpt endpoint does not serve (reword it in chatgpt/rewrites.json)`);
    }
    if (text.includes("mcp.mybots.pro/mcp")) P(`${path}: points at the /mcp endpoint; the plugin connects /chatgpt by itself`);
    for (const m of text.matchAll(/\]\((?![a-z][a-z0-9+.-]*:|#)([^)#\s]+)/g)) {
      const target = posixJoin(path, m[1]);
      if (!files.has(target)) P(`${path}: link to ${m[1]} does not resolve inside the package`);
    }
    if (/\/SKILL\.md$/.test(path)) {
      const dir = path.split("/")[1];
      const fm = frontmatter(text, `chatgpt ${path}`);
      if (!fm) continue;
      if (fm.name !== dir) P(`${path}: name '${fm.name}' does not match its folder`);
      if (skillNames.has(fm.name)) P(`${path}: skill name '${fm.name}' twice`);
      skillNames.add(fm.name);
      if (fm.description && fm.description.length > 1024) P(`${path}: description is ${fm.description.length} chars, limit 1024`);
      if (`${pkg.plugin.name}:${fm.name}`.length > 64) P(`${path}: '${pkg.plugin.name}:${fm.name}' is over 64 chars`);
      const lines = text.split("\n").length;
      if (lines > MAX_ROUTER_LINES) P(`${path}: ${lines} lines, limit ${MAX_ROUTER_LINES}`);
      if (/[а-яё]/i.test(fm.body)) P(`${path}: Cyrillic in the body`);
    }
  }
  // the package is English only: no Cyrillic anywhere in it, manifests included
  for (const [path, data] of files) {
    if (/\.(png|jpe?g|webp|gif)$/i.test(path)) continue;
    const lines = data.toString("utf8").split("\n").flatMap((l, i) => (/[\u0400-\u04FF]/.test(l) ? [i + 1] : []));
    if (lines.length) P(`${path}: Cyrillic on line ${lines.slice(0, 5).join(", ")}${lines.length > 5 ? "..." : ""}; the package is English only (stripCyrillicTriggers or a rewrite)`);
  }
  for (const s of tools.excludedSkills) if ([...files.keys()].some((p) => p.startsWith(`skills/${s}/`))) P(`${s} must not ship`);
  if (!skillNames.size) P("no skills in the package");

  // schemas (vendored copies of agent-plugins.org 1.0.0)
  let Ajv;
  try { Ajv = (await import("ajv/dist/2020.js")).default; } catch { P("ajv is not installed: run npm ci"); return; }
  const ajv = new Ajv({ allErrors: true, strict: false });
  const schema = (n) => JSON.parse(readFileSync(join(ROOT, "chatgpt", "schemas", `${n}.schema.json`), "utf8"));
  const plugin = JSON.parse(files.get("plugin.json"));
  const mcp = JSON.parse(files.get("mcp.json"));
  const validate = (n, doc) => {
    const v = ajv.compile(schema(n));
    if (!v(doc)) for (const e of v.errors) P(`${n}.json${e.instancePath} ${e.message}`);
  };
  validate("plugin", plugin);
  // OpenAI documents per-server auth under mcpServers.<name>.extensions["com.openai"], which the 1.0.0
  // schema does not list yet: validate the server without it, and the auth object below.
  const mcpBare = { ...mcp, mcpServers: Object.fromEntries(Object.entries(mcp.mcpServers ?? {}).map(([k, { extensions, ...s }]) => [k, s])) };
  validate("mcp", mcpBare);

  // mcp.json: one remote server, the /chatgpt endpoint, OAuth without secrets
  const servers = Object.entries(mcp.mcpServers ?? {});
  if (servers.length !== 1) P(`mcp.json must declare exactly one server, has ${servers.length}`);
  for (const [name, s] of servers) {
    if (s.url !== tools.endpoint) P(`mcp.json ${name}: url ${s.url} is not ${tools.endpoint}`);
    if (s.headers && Object.keys(s.headers).length) P(`mcp.json ${name}: public submission rejects server headers`);
    const ext = s.extensions ?? {};
    if (Object.keys(ext).some((k) => k !== "com.openai")) P(`mcp.json ${name}: unknown extension namespace`);
    const auth = ext["com.openai"]?.auth;
    if (!auth) { P(`mcp.json ${name}: no extensions["com.openai"].auth`); continue; }
    if (auth.type !== "oauth") P(`mcp.json ${name}: auth.type must be oauth`);
    if (!["provided", "dcr", "cimd"].includes(auth.client?.mode)) P(`mcp.json ${name}: auth.client.mode must be provided, dcr or cimd`);
    if (auth.client?.mode !== "provided" && (auth.client?.clientId || auth.client?.tokenEndpointAuthMethod)) P(`mcp.json ${name}: no client id or auth method with ${auth.client.mode}`);
    if (JSON.stringify(auth).match(/secret|token"\s*:/i)) P(`mcp.json ${name}: credentials do not belong in the package`);
    if (auth.resource !== s.url) P(`mcp.json ${name}: auth.resource ${auth.resource} is not the server url`);
    if (!Array.isArray(auth.baseScopes) || !auth.baseScopes.every((x) => typeof x === "string" && x.trim())) P(`mcp.json ${name}: baseScopes must be non-empty strings`);
  }

  // plugin.json: OpenAI listing limits (developers.openai.com/plugins/deploy/submission)
  const oa = plugin.extensions?.["com.openai"] ?? {};
  const ui = oa.interface ?? {};
  const forbidden = (o, path = "") => Object.entries(o ?? {}).flatMap(([k, v]) =>
    [...(["hooks", "apps", "test_credentials", "reviewer_instructions", "mcpServers", "skills"].includes(k) ? [path + k] : []),
     ...(v && typeof v === "object" && !Array.isArray(v) ? forbidden(v, `${path}${k}.`) : [])]);
  for (const k of forbidden(oa)) P(`plugin.json: extensions.com.openai.${k} is not allowed in a submitted package`);
  if (plugin.version !== version) P(`plugin.json version ${plugin.version} differs from VERSION ${version}`);
  if (!plugin.description || plugin.description.length > 1024) P("plugin.json: description is required, at most 1024 chars");
  if (plugin.author?.name?.length > 120) P("plugin.json: author.name over 120 chars");
  const oneLine = (s) => typeof s === "string" && s.trim() && !/[\n\r\t]/.test(s);
  const limit = (label, s, n) => { if (!oneLine(s) || s.length > n) P(`${label} must be one non-empty line of at most ${n} chars (${s?.length ?? 0})`); };
  limit("interface.displayName", ui.displayName, 30);
  if (/\bmira\s*(mcp|plugin)\b/i.test(ui.displayName ?? "")) P("interface.displayName must not be 'Mira MCP' or 'Mira Plugin'");
  limit("interface.shortDescription", ui.shortDescription, 30);
  limit("interface.developerName", ui.developerName, 80);
  if (!ui.longDescription?.trim() || ui.longDescription.length > 4000) P(`interface.longDescription is required, at most 4000 chars (${ui.longDescription?.length ?? 0})`);
  const CATEGORIES = ["Productivity", "Creativity", "Developer Tools", "Business & Operations", "Data & Analytics", "Communication", "Education & Research", "Security", "Finance", "Healthcare", "Travel", "Entertainment", "Other"];
  if (!CATEGORIES.includes(ui.category)) P(`interface.category '${ui.category}' is not one of ${CATEGORIES.join(", ")}`);
  if (!Array.isArray(ui.capabilities) || ui.capabilities.length > 20) P("interface.capabilities must be an array of at most 20");
  for (const c of ui.capabilities ?? []) limit(`capability '${c}'`, c, 120);
  for (const k of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    const u = ui[k];
    if (typeof u !== "string" || !/^https:\/\/[^\s@]+$/.test(u) || u.length > 1024) P(`interface.${k} must be an HTTPS URL of at most 1024 chars`);
  }
  const prompts = [].concat(ui.defaultPrompt ?? []);
  if (prompts.length > 3) P("interface.defaultPrompt takes at most 3 prompts");
  for (const p of prompts) { limit(`defaultPrompt '${p}'`, p, 128); if (/@/.test(p)) P(`defaultPrompt '${p}' must not @mention`); }
  if (new Set(prompts.map((p) => p.trim().replace(/\s+/g, " ").toLowerCase())).size !== prompts.length) P("interface.defaultPrompt has duplicates");
  const contrast = (a, b) => { const L = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }; const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  for (const [k, bg] of [["brandColor", "#FFFFFF"], ["brandColorDark", "#212121"]]) {
    if (ui[k] === undefined) continue;
    if (!/^#[0-9A-Fa-f]{6}$/.test(ui[k])) P(`interface.${k} must be #RRGGBB`);
    else if (contrast(ui[k], bg) < 2) P(`interface.${k} ${ui[k]} has ${contrast(ui[k], bg).toFixed(2)}:1 against ${bg}, needs 2:1`);
  }
  for (const k of ["logo", "logoDark", "composerIcon", "composerIconDark"]) {
    if (ui[k] === undefined) { if (k === "logo" || k === "composerIcon") P(`interface.${k} is required`); continue; }
    if (!/^\.\/assets\//.test(ui[k])) { P(`interface.${k} must be a ./assets/ path`); continue; }
    const img = files.get(ui[k].slice(2));
    if (!img) { P(`interface.${k}: ${ui[k]} is not in the package`); continue; }
    if (img.length > 5 * 1024 * 1024) P(`interface.${k}: over 5 MiB`);
    if (img.readUInt32BE(0) !== 0x89504e47) { P(`interface.${k}: not a PNG`); continue; }
    const w = img.readUInt32BE(16), h = img.readUInt32BE(20);
    if (w !== h || w < 48 || w > 4096) P(`interface.${k}: ${w}x${h}, must be square, 48-4096 px`);
    if (k === "logo" && w !== 512) P(`interface.logo: ${w}x${h}, the listing logo is kept at 512x512`);
  }

  // the catalog sells nothing: no prices, plans, trials or credit offers in listing text
  const SALES = /\$\s?\d|€\s?\d|\b(price|prices|pricing|cheap|free trial|trial|subscribe|subscription|discount|promo(tion)?|coupon|upgrade|buy|credits?|tokens?|per month|pro plan)\b|подписк|тариф|скидк|кредит|пробн|цена|цены|купит/i;
  const tr = oa.publication?.translations ?? {};
  const listing = [["displayName", ui.displayName], ["shortDescription", ui.shortDescription], ["longDescription", ui.longDescription], ["description", plugin.description],
    ...prompts.map((p, i) => [`defaultPrompt[${i}]`, p]), ...(ui.capabilities ?? []).map((c, i) => [`capabilities[${i}]`, c]),
    ...Object.entries(tr).flatMap(([loc, t]) => [[`${loc}.subtitle`, t?.subtitle], [`${loc}.description`, t?.description]])];
  for (const [label, text] of listing) { const m = typeof text === "string" && text.match(SALES); if (m) P(`listing ${label}: '${m[0]}' reads as selling; the catalog allows no prices, plans, trials or credit offers`); }

  // review cases: exactly 5 positive and 3 negative, positive tools from the allowlist
  const cases = oa.review?.test_cases ?? {};
  if (cases.positive?.length !== 5) P(`review.test_cases.positive needs exactly 5 cases, has ${cases.positive?.length ?? 0}`);
  if (cases.negative?.length !== 3) P(`review.test_cases.negative needs exactly 3 cases, has ${cases.negative?.length ?? 0}`);
  for (const [kind, list] of Object.entries(cases)) for (const [i, c] of (list ?? []).entries()) {
    const at = `review.test_cases.${kind}[${i}]`;
    if (!c.description?.trim() || c.description.length > 4000) P(`${at}.description is required, at most 4000 chars`);
    if (!c.prompt?.trim()) P(`${at}.prompt is required`);
    if (kind === "positive") {
      if (!c.tools_triggered?.trim() || !c.expected_behavior?.trim()) P(`${at} needs tools_triggered and expected_behavior`);
      for (const t of (c.tools_triggered ?? "").split(/[,\s]+/).filter(Boolean)) if (!allowed.has(t)) P(`${at}.tools_triggered: '${t}' is not served by /chatgpt`);
    }
  }
  const pub = oa.publication ?? {};
  if (pub.countries && !(Array.isArray(pub.countries) && pub.countries.every((c) => /^[A-Z]{2}$/.test(c)))) P("publication.countries must be uppercase country codes");
  for (const [loc, t] of Object.entries(tr)) {
    if (!/^[a-z]{2,3}(-[A-Z]{2})?$/.test(loc)) P(`publication.translations: locale '${loc}' looks malformed`);
    if (t?.subtitle != null) limit(`translations.${loc}.subtitle`, t.subtitle, 30);
    if (t?.description != null && (!t.description.trim() || t.description.length > 4000 || /[\t\r]/.test(t.description))) P(`translations.${loc}.description must be 1-4000 chars without tabs`);
  }
}

function posixJoin(from, rel) {
  const parts = from.split("/").slice(0, -1);
  for (const seg of rel.split("/")) { if (seg === "..") parts.pop(); else if (seg !== "." && seg) parts.push(seg); }
  return parts.join("/");
}
