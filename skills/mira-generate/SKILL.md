---
name: mira-generate
description: >-
  Generate images and video on Mira AI through its MCP server: connect, pick a model, attach the
  user's avatar, location or product, write the prompt, pass a playbook skill, wait for the result,
  extend or upscale a clip. Use it whenever the user wants to "generate", "make a video", "make an
  image", "animate this photo", "create an ad", "сгенерируй", "сделай видео", "сделай картинку" and
  a Mira MCP server is connected or can be. Chain with mira-video-prompting and mira-image-prompting
  for what to write, and with the mira-* playbooks for the genre. NOT for prompting theory on its own.
license: MIT
metadata:
  version: "0.1.0"
---

# Mira generate

Mira is a generation platform with a prompt pipeline behind every tool: what you state is kept
word for word, and a set of specialists fills only the craft you left out. That changes how you
write. You do not have to know lighting schemes to get good light. You do have to be exact about
the facts: who, what, where, what happens, what is said, what must not change.

## Connect

Server: `https://mcp.mybots.pro/mcp` (streamable HTTP). It signs in with the user's Mira account
through OAuth on the first call that spends credits; there is no API key. The setup page for each
client is [mira.mybots.pro/mcp](https://mira.mybots.pro/mcp). If `tools/list` works but a call
returns 401, the user has to finish the sign-in in the browser window the client opened.

## Tools

| Tool | Spends credits | Use it for |
|---|---|---|
| `list_models` | no | Valid model ids, ratios, durations, resolutions. Call once per session. |
| `list_skills` / `get_skill` | no | Playbook ids for the `skill` parameter and the knowledge skills, bundled with the server. |
| `list_brand_assets` | no | The user's avatars, locations and products with their ids. |
| `upload_reference_image` | no | A local image becomes a reference URL (base64, up to 8 MB). Only clients with file access can do this. |
| `create_upload` | no | A one-time PUT URL for files that do not fit base64: a clip for `referenceVideoUrls` or a GLB/FBX mesh for `rig_3d` (up to 200 MB). PUT the raw bytes, then use `value.url` or `value.id`. |
| `generate_image` | yes | Stills. Returns a generation id at once. |
| `generate_video` | yes | Clips. Returns a generation id at once; video takes minutes. Takes up to 3 reference clips in `referenceVideoUrls` (motion, camera, pacing); `kling-motion` needs exactly one clip and one photo. |
| `list_generations` | no | The account's recent generations (kind image / video / model3d) with ids, URLs and poster URLs — to find an earlier clip to extend, a 3D model to rig or import, a video to reference. |
| `get_generation` / `wait_for_generation` | no | Status and the result. `wait_for_generation` blocks up to ~50 s and may need several calls. |
| `extend_video` | yes | Native continuation of a clip the account already made. |
| `upscale_video` | yes | 720p to 1080p on a finished clip. |
| `generate_3d` | yes | One object as a 3D model from text or up to four photos (fal.ai: `hunyuan-3.1`, `meshy-7`, `trellis-2`, `rodin-fast`). Result files (GLB plus other formats) come back in `files`. Playbook: `3d`. |
| `rig_3d` | yes | Humanoid skeleton with walk/run on a finished 3D generation (`generationId`) or a mesh uploaded through `create_upload` (`libraryItemId`), plus animation clips by preset id (Meshy). |
| `estimate_cost` | no | Credits a call would spend, before making it: image, video (duration/resolution), model3d (quality/pbr/rig/animations) or rig. Quote it before a costly call. |
| `get_credit_balance` | no | What the user can afford. |
| `blender_status` | no | Whether the user's Blender (Mira add-on, "Connect agents" on) is reachable; version, file, frame range, selection. Call it before any other `blender_*` tool. |
| `blender_get_scene` / `blender_screenshot` | no | See what the user sees: objects with transforms and dimensions, cameras, lights; a viewport or camera capture returned inline. |
| `blender_execute_python` | no | Run bpy code in the user's Blender and get its output back: build blockouts, place lights and cameras, keyframe. Small steps, check with a screenshot. |
| `blender_import_generation` | no | Put a finished `generate_3d` / `rig_3d` result into the user's scene at the 3D cursor. |
| `ask_mira` / `mira_history` / `list_mira_dialogs` | yes (2 per reply) | Talk to Mira, the platform's own creative agent, in the user's dialogs: a brief, a look, a scene idea, or the whole task — she starts generations herself and they come back as cards. |
| `blender_playblast` | no | Render the user's viewport animation to a 720p clip, uploaded to their library; its URL goes into `referenceVideoUrls`. Bind it to camera, framing and rough placement, not the figures' exact gestures; Clay and frozen gestures by default (`look`, `freezeFigures`); build people with `stand_in()` (mira-blender-scene). Keep ranges under 30 s. |

## Blender

When `blender_status` says connected, the user's own Blender is your canvas: read the scene, change it with `blender_execute_python` in small steps, look at `blender_screenshot` after each, import generated assets with `blender_import_generation`, and finish a shot with `blender_playblast` → `generate_video`. Code runs on the user's machine: stay inside Blender's data, never touch files outside it, and say what each step does before running it. Not connected → tell the user how to switch on "Connect agents" in the Mira tab and stop; do not retry in a loop.

## Workflow

1. Say which model you picked and that it spends credits. One sentence, before the call.
2. If the user mentions a person, place or product of theirs, call `list_brand_assets` and pass
   `avatarId`, `studioId` or `productId`. The platform injects the reference photos and the
   passport itself. Describe the character consistently with the passport; never redraw the face.
3. Decide the playbook. A review, an unboxing, a creator talking to camera is `ugc`; a packshot is
   `product`; a hook-and-offer piece is `ads`; a mood piece is `cinematic`; a demo is `explainer`;
   drawn media are `anime`, `illustration`, `toon3d`, `pixel`. Pass it as `skill`. Leave it empty
   for a universal render. Read [references/playbooks.md](references/playbooks.md) when in doubt.
4. Write the prompt in English as prose. Facts first: subject, setting, the moment, spoken lines
   word for word, on-screen text exactly. Then the one or two craft decisions you actually care
   about. Leave the rest. For model-specific rules read the model file in `mira-video-prompting`
   or `mira-image-prompting`.
5. Call the generate tool, then `wait_for_generation` until it is done. Show the URL. Do not
   narrate polling.
6. Iterate with the same seed and a lightly edited prompt for a close variation; change the model
   only when the brief needs a capability the current one lacks.

## What the pipeline does with your prompt

- `authored` mode is the default for agents: your decisions become law, the plan step extracts
  them, specialists fill empty slots, a validator checks counts and continuity, a critic projects
  the text into the model's native format.
- A `skill` adds the playbook's doctrine to the plan step. It does not override anything you wrote.
- `style` is the medium only: `anime`, `illustration`, `toon3d`, `pixel`. A playbook of the same
  name already implies it.
- Bank keys such as `push_in` or `rembrandt` must never appear in a prompt. Describe the move or
  the light in words; the pipeline maps it.

## UX rules

Be concise. Reply in the user's language; parameter values stay English. Ask one question at a
time and only if the answer is missing and matters. Never show generation ids or asset ids to the
user. Tell the price class before a video call: video costs far more than an image, and premium
models several times a draft model.

## Chaining

`upload_reference_image` → `generate_image` → `generate_video` from that image → `extend_video`
→ `upscale_video`. For 3D: `generate_image` (clean object on a neutral background) → `generate_3d`
from that image → `rig_3d` on the result. A generation id from any step is a valid input to the next.
From a DCC tool such as Blender: export the selection as GLB → `create_upload` (kind `model3d`) → `rig_3d`
with `libraryItemId`; a viewport playblast → `create_upload` (kind `video`) → `generate_video` with that URL
in `referenceVideoUrls`. Details and failure handling:
[references/locks-and-references.md](references/locks-and-references.md).
