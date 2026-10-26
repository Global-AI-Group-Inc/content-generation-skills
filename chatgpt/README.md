# Mira AI for ChatGPT and Codex

Sources of the plugin package for the universal plugin directory shared by ChatGPT and Codex
([developers.openai.com/plugins](https://developers.openai.com/plugins)). The package is built, not
kept: `node scripts/build-chatgpt-plugin.mjs` writes `dist/mira-chatgpt.zip`, and `node
scripts/check.mjs` validates it. Upload that ZIP at [platform.openai.com/plugins](https://platform.openai.com/plugins).

| File | What it is |
|---|---|
| `plugin.json` | The Agent Plugins manifest with the listing, review cases and publication under `extensions["com.openai"]`. `version` comes from `VERSION` at build time. |
| `mcp.json` | One remote server, `https://mcp.mybots.pro/chatgpt`, with OAuth (CIMD). |
| `chatgpt-tools.json` | The tools that endpoint serves, and every other tool of `/mcp`. Mirrors `ChatGptToolset.Default` in mybots.mcp: change both together. |
| `rewrites.json` | How the shipped skills differ from `skills/`: files dropped, files overridden whole, exact text rewrites. |
| `overrides/` | Whole-file replacements, each pinned to the sha256 of the source it was written against. |
| `assets/` | Logo 512 px and composer icon 128 px, light and dark, from the master `mira.png`: the dark pair only swaps the white tile background. |
| `schemas/` | Vendored agent-plugins.org 1.0.0 schemas for `plugin.json` and `mcp.json`. |

The package ships every skill except mira-blender-scene, mira-after-effects, mira-premiere and
mira-3d: the endpoint has no Blender or Adobe bridge and no 3D. When a source skill changes, the
build fails on a rewrite that no longer matches and the check fails on an override whose source
moved on, or on a shipped file that names a tool the endpoint does not serve.

Not in the package on purpose: reviewer credentials and the demo video (entered in the dashboard),
hooks, `.app.json`, prices or anything that sells credits or plans.
