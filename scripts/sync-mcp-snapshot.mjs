#!/usr/bin/env node
// Copies the skills and catalog into the public MCP server build (mybots.mcp.public/Skills), where
// they become embedded resources for list_skills / get_skill. The server's CI compares the VERSION
// file it ships with the one in this repo.
//   node scripts/sync-mcp-snapshot.mjs [path-to-mybots.mcp.public]
import { cpSync, rmSync, existsSync, readdirSync, writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv[2] ?? join(process.env.HOME ?? "", "RiderProjects", "mybots.mcp", "mybots.mcp.public");
const dst = join(target, "Skills");
if (!existsSync(target)) { console.error(`no project at ${target}`); process.exit(1); }
if (existsSync(dst)) rmSync(dst, { recursive: true });
mkdirSync(dst, { recursive: true });
for (const name of readdirSync(join(ROOT, "skills"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name))
  cpSync(join(ROOT, "skills", name), join(dst, name), { recursive: true });
cpSync(join(ROOT, "catalog.json"), join(dst, "catalog.json"));
writeFileSync(join(dst, "VERSION"), readFileSync(join(ROOT, "VERSION")));
console.log(`snapshot written to ${dst}`);
