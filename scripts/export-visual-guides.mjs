#!/usr/bin/env node
// Copies the skills onto Mira's own shelf (the assistants repo, data/plugins/visual-guides) and
// removes the shelf's older generated guide that mira-craft replaces. One direction only: the
// shelf also holds third-party CC-BY guides, and nothing from there may flow back into this repo.
//   node scripts/export-visual-guides.mjs [path-to-assistants-repo]
import { cpSync, rmSync, existsSync, readdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv[2] ?? join(process.env.HOME ?? "", "assistants");
const shelf = join(target, "visual-guides");
if (!existsSync(shelf)) { console.error(`no shelf at ${shelf}`); process.exit(1); }

const REPLACED = ["mybots-craft"];
for (const name of REPLACED) if (existsSync(join(shelf, name))) { rmSync(join(shelf, name), { recursive: true }); console.log(`removed ${name}`); }
const names = readdirSync(join(ROOT, "skills"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
for (const name of names) {
  const dst = join(shelf, name);
  if (existsSync(dst)) rmSync(dst, { recursive: true });
  cpSync(join(ROOT, "skills", name), dst, { recursive: true });
  // the shelf handler renders the license line from the catalog; a LICENSE file per guide keeps the folder self-describing
  writeFileSync(join(dst, "LICENSE"), readFileSync(join(ROOT, "LICENSE")));
  console.log(`exported ${name}`);
}
writeFileSync(join(shelf, "MIRA_SKILLS_VERSION"), readFileSync(join(ROOT, "VERSION")));
// the shelf's own catalog builder reads this for the playbook list and the per-skill summaries
cpSync(join(ROOT, "catalog.json"), join(shelf, "mira-skills.json"));
console.log("done; now run node agent-skills/build-catalog.mjs in the assistants repo");
