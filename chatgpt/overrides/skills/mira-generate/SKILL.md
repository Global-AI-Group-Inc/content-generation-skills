---
name: mira-generate
description: >-
  Generate images and video on Mira AI: pick a model, attach the user's location or product,
  write the prompt, pass a playbook skill, wait for the result, extend or upscale a clip.
  Use it whenever the user wants to "generate", "make a video", "make an image", "animate this
  photo", "create an ad", "make a 3D model". Chain with
  mira-video-prompting and mira-image-prompting for what to write, and with the mira-* playbooks for
  the genre. NOT for prompting theory on its own, and not for voice, music, sound effects or
  captions (mira-audio).
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

The Mira plugin connects the server for you. The user signs in with their Mira account the first
time a tool needs it; there is no API key. If a call says the user is not signed in, ask them to
connect Mira in the plugin settings and try again once.

## Tools

| Tool | Spends credits | Use it for |
|---|---|---|
| `list_models` | no | Valid model ids, ratios, durations, resolutions. Call once per session. |
| `list_skills` / `get_skill` | no | Playbook ids for the `skill` parameter and the knowledge skills, bundled with the server. |
| `list_brand_assets` | no | The user's saved locations and products with their ids. |
| `upload_reference_image` | no | An image the user attached becomes a reference URL. A clip or a track they attach reaches the clip and audio tools as `libraryItemId`. |
| `generate_image` | yes | Stills. Returns a generation id at once. |
| `generate_video` | yes | Clips. Returns a generation id at once; video takes minutes. Takes up to 3 reference clips in `referenceVideoUrls` (motion, camera, pacing); `kling-motion` needs exactly one clip and one photo. `draft=true` on `seedance-2-5` renders a cheap 480p take to try an idea; `quality="hd"` renders straight to 1080p. |
| `list_generations` | no | The account's recent generations with ids, URLs and poster URLs: image / video / model3d by default, `audio`, `transcript` or `analysis` only when asked for by kind. To find an earlier clip to extend, a 3D model to rig, a source for a clip operation. |
| `get_generation` / `wait_for_generation` | no | Status and the result. `wait_for_generation` blocks up to ~50 s and may need several calls. |
| `extend_video` | yes | Native continuation of a clip the account already made. `direction="backward"` (seedance-2-5) adds what happens before the first frame. |
| `finalize_draft` | yes | Re-renders a 480p draft as the same take in 1080p, within 7 days of the draft. |
| `upscale_video` | yes | Topaz on a finished clip - a Mira clip (`generationId`) or an attached file (`libraryItemId`): `target` `1080p` (default, 720p only), `4k` (720p or 1080p, up to 30 s; `fps` up to 60 in the same pass) or `fps` (FPS Boost at the same resolution: `fps` 24-120, default 60; `slowdown` 2/4/8 for slow motion - longer clip, no sound; up to 60 s of output). `credits_spent` is the confirmed price. A result cannot be upscaled, boosted or extended again: for 4K at 60 fps run `4k` + `fps` 60 on the original in one pass. Not for drafts: finalize them instead. |
| `generate_3d` | yes | One object as a 3D model from text or up to four photos (`hunyuan-3.1`, `meshy-7`, `trellis-2`, `rodin-fast`). Result files (GLB plus other formats) come back in `files`. Playbook: `3d`; read mira-3d. |
| `rig_3d` | yes | Humanoid skeleton with walk/run on a finished 3D generation (`generationId`), plus animation clips by preset id. |
| `search_mira_guides` / `get_mira_guide` / `draft_mira_guide` / `list_my_mira_guides` / `update_mira_guide` / `publish_mira_guide` | no | Community guides at [mira.mybots.pro/guides](https://mira.mybots.pro/guides): real results with the model and prompt behind them, written by users (not the playbooks). Search before an unfamiliar effect or look; draft a guide from a result the user likes; edit their own guides; publish only when they explicitly ask. [references/guides.md](references/guides.md). |
| `list_direct_presets` / `direct_video` | `direct_video` yes | Direct presets: the user answers a short questionnaire (short film, music video, product or UGC ad, brand film, real-estate tour, micro drama, explainer, trailer, social post, ad remake) and the preset directs ONE clip up to 30 s - you write no prompt. Offer one when the user wants such a piece and brings no prompt. [references/direct-presets.md](references/direct-presets.md). |
| `swap_object` | yes | One object in any clip (a product, a prop, a garment) replaced from 1-4 photos, everything else kept. Up to 10 s. |
| `list_effects` | no | Ready-made effect presets (cakeify, figurine, age progression...) for the `effect` parameter of `generate_image` / `generate_video`, with what each needs attached. Only when the user names an effect. |
| `modify_video` | yes | The same clip with one thing changed: lighting, weather, time of day, backdrop, or a free restyle. Up to 15 s. |
| `reframe_video` / `remove_background` | yes | A new aspect ratio with the new canvas filled (up to 15 s); a clean key without a green screen, with a luma matte or a ProRes alpha (up to 30 s). |
| `marketing_brief` | yes | Script, shot list, a ready `generate_video` prompt, caption, hashtags and voiceover text for a product clip, returned in the same call. |
| `generate_audio` / `plan_music` | yes / no | Speech, multi-voice dialogue, sound effects and music; `plan_music` drafts a free section plan for music timed to the cut. |
| `list_voices` | no | The platform's library voices with their ids, for speech and voiceover. |
| `add_soundtrack` / `voiceover_video` / `add_captions` | yes | On a finished clip: music the model writes by watching it; a spoken script over the ducked original; burned subtitles plus an SRT. |
| `isolate_voice` / `separate_stems` | yes | Speech cleaned of noise, music and echo; a track or a clip's sound split into 2 or 6 stems. |
| `transcribe_video` / `analyze_transcript` | yes / partly | A word-timed transcript and SRT with speakers (up to 30 min); silence cuts and multicam splits (free), the best short clips, SEO, chapters. |
| `estimate_cost` | no | What a call would spend, before making it: image, video (duration, `draft`, `quality="hd"`), `finalize`, model3d (quality/pbr/rig/animations), rig, every clip operation (`sourceSeconds`) and every audio job (`model`, `chars`, `durationSeconds`). Quote it before a costly call. |
| `film_list_projects` / `film_get_project` / `film_list_elements` / `film_list_assets` / `film_move_assets` / `film_update_brief` / `film_add_comment` | no | AI Film Studio team projects and AI Marketing Studio campaigns (`projectType: "marketing"`): read the brief and the cast, then render into the project with `filmProjectId` + `elementIds` on `generate_image` / `generate_video` (the workspace owner pays); sort takes, write the brief, leave notes. [references/film-studio.md](references/film-studio.md). |
| `mkt_get_brand` / `mkt_list_styles` / `mkt_list_channels` / `mkt_create_variants` / `mkt_adapt` / `mkt_draft_post` / `mkt_script` / `mkt_script_generate` | variants, adapt, localize, scripts | A campaign's brand kit, the composer catalog (`styleId`, `hookId`, `settingId`, `placementId`), A/B variant sets, placements (always `dryRun` first, then a yes), post drafts. [references/marketing-studio.md](references/marketing-studio.md). |
| `list_elements` / `get_element` | no | The Mira Elements library: overlays, backgrounds, transitions, LUTs, sounds, templates and open-licence fonts for the user's own editor, with ids and previews. |

Clip and audio operations take exactly one source: `sourceGenerationId` (a Mira generation) or `libraryItemId` (a file the user attached to the chat). `draw_edit_video` (Draw to Edit) changes only the area the user marked on one frame - the user draws WHERE, `prompt` says WHAT. Limits, parameters and outputs: [references/media-ops.md](references/media-ops.md).

## Sound

Voice, music, sound effects, captions and voices have their own skill: read mira-audio
before `generate_audio` or any tool that changes a clip's sound. Finish the picture first, then add the voice, the music and the captions to it.

## Workflow

1. Say which model you picked and that it spends credits. One sentence, before the call.
2. A team film project or a campaign? Follow [references/film-studio.md](references/film-studio.md) or [references/marketing-studio.md](references/marketing-studio.md). If the user mentions a place or product of theirs, call `list_brand_assets` and pass
   `studioId` or `productId`. The platform injects the reference photos and the
   passport itself. Describe it consistently with the passport.
3. Decide the playbook. A review, an unboxing, a creator talking to camera is `ugc`; a packshot is
   `product`; a hook-and-offer piece is `ads`; a mood piece is `cinematic`; a demo is `explainer`;
   drawn media are `anime`, `illustration`, `toon3d`, `pixel`. Pass it as `skill`. Leave it empty
   for a universal render. Read [references/playbooks.md](references/playbooks.md) when in doubt.
4. Write the prompt in English as prose. Facts first: subject, setting, the moment, spoken lines
   word for word, on-screen text exactly. Then the one or two craft decisions you actually care
   about. Leave the rest. For model-specific rules read the model file in `mira-video-prompting`
   or `mira-image-prompting`.
   An effect or look you have not made on Mira: `search_mira_guides` first, adapt a recipe, credit the guide. To repeat a guide as is (a guide link), follow "Repeat a guide" in [references/guides.md](references/guides.md).
5. Call the generate tool, then `wait_for_generation` until it is done. Show the URL. Do not
   narrate polling.
6. Iterate with the same seed and a lightly edited prompt for a close variation; change the model
   only when the brief needs a capability the current one lacks.
7. A finished result the user is happy with (or the last step of a longer job: extend, upscale, voiceover): offer once, in one sentence, to write it up as a community guide with `draft_mira_guide` (a draft; publish only when they ask). Not for drafts or retakes; never again after a no.

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
user. Tell the cost class before a video call: video costs far more than an image, and premium
models several times a draft model. Refuse sexual content, real people without their consent and
anything not suitable for a general audience aged 13 and up, whatever the tool would accept.

## Chaining

`upload_reference_image` → `generate_image` → `generate_video` from that image → `extend_video`
→ `upscale_video`. To explore on `seedance-2-5`: two or three `generate_video` calls with
`draft=true` (480p) → the user picks one → `finalize_draft` renders that same take in 1080p →
`extend_video` in either direction continues the final in 1080p. A draft is never extended or
upscaled. When the shot is already clear, skip the drafts: `quality="hd"` renders straight to
1080p. For 3D: `generate_image` (clean object on a neutral background) → `generate_3d` from that
image → `rig_3d` on the result. A generation id from any step is a valid input to the next. Details and failure handling:
[references/locks-and-references.md](references/locks-and-references.md).
