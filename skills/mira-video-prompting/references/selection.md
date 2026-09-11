<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Selecting the model

Facts per model, straight from the registry. The routing rule is in SKILL.md; this is the
table it points at.

| key | model | seconds | output | references | audio | prompt cap |
|---|---|---|---|---|---|---|
| `seedance-2-5` | ByteDance Seedance 2.5 | 5 / 10 / 15 / 30 | 720p | up to 4 native | yes | 4000 |
| `runway` | Runway Gen-4.5 | 5 / 10 | provider default | up to 4, merged into one start frame | no | 1000 |
| `kling` | Kling 3.0 | 5 / 10 / 15 | 1080p | up to 4, merged into one start frame | yes | 2500 |
| `veo` | Google Veo 3.1 Fast | 8 | 1080p | up to 3 native | yes | 3000 |
| `veo-lite` | Google Veo 3.1 Lite | 8 | 1080p | up to 3 native | yes | 3000 |
| `veo-quality` | Google Veo 3.1 Quality | 8 | 1080p | up to 3 native | yes | 3000 |
| `omni` | Google Gemini Omni Flash | model-chosen 3-10s | provider default | up to 4 native | yes | 10000 |
| `minimax` | MiniMax H3 (Hailuo 3.0) | 5 / 10 / 15 | 1080p | up to 4 native | yes | 7000 |
| `happyhorse` | HappyHorse 1.1 | 5 / 10 / 15 | 1080p | up to 4 native | yes | 5000 |
| `wan3` | Wan 3.0 | 5 / 10 / 15 / 30 | 1080p | up to 4 native | yes | 8000 |
| `kling-motion` | kling-motion | 5 / 10 / 15 / 30 | 1080p | up to 1 native | yes | 2500 |

## What each model is for

- **`seedance-2-5`** — the long-form specialist: up to 30s, heavy referencing (storyboards, keyframe chains, video edit/extend); pricier than any Veo tier - reach for it only when length or reference volume decides the clip. ALSO the camera-trick model WITH audio: in live runs (2026-09-06) it executed every phased single-take trick as written - a top-down crash dive, a full 360 orbit returning to the start, a whip pan fusing two locations, a dolly zoom, a camera struck and falling while it records, a locked day-night cycle, a pass through a mirror into a new place - where Runway smeared or split half of them and Kling stopped short of the move; when the MOVE is the concept and the clip needs sound, this is the key
- **`runway`** — Gen-4.5, text-to-video AND image-to-video: the sequencing specialist - executes several ordered camera moves and timed beats inside ONE prompt, and takes forceful camera work (sweeping arcs, crash zooms, whip pans) the others smear; weak on fine motor detail; NO audio; 720p; 5/10s
- **`kling`** — best human anatomy and physics (sport, cloth, water), legible in-frame text, native audio with multi-speaker dialogue and accents; 3-15s; 1080p output
- **`veo`** — premium cinematography with native synchronized audio at a fair price; fixed 8s; keep to 1-2 subjects; attaching references locks the clip to 8s
- **`veo-lite`** — the cheap Veo: same 8s audio clips at a fraction of the price, but NO reference images - drafts, b-roll, volume runs
- **`veo-quality`** — the flagship Veo for hero clips: top cinematic realism at ~3x the Fast price - finals only, never drafts. ONE UNBROKEN TAKE: it cannot cut, so a brief with cuts, a chase or a launch stride is not its brief even when it is the hero
- **`omni`** — self-directing storyteller and the only model that can EDIT an existing clip: multi-shots by default, renders on-frame text well, chooses its own 3-10s length (you cannot pin the duration)
- **`minimax`** — the purpose model for SPEECH plus legible/Cyrillic in-frame text - the only one holding both; millisecond-precise shot timing; 4-15s; NOT a general default
- **`happyhorse`** — dialogue-first with 7-language lip-sync and up to 9 character references; single-beat clips and exotic vertical ratios; briefs must stay tiny
- **`wan3`** — the long-take model: 30 seconds in ONE continuous generation, so a whole story keeps one look and one cast - no stitching; shot-numbered storyboard with timecodes, native audio, 4 photo refs; 2-30s; 1080p
- **`kling-motion`** — motion transfer: ONE photo of a character + ONE driving video (3-30 s, one person, single take) - the character in the photo performs the motion of the video; output length = video length; 1080p; keeps the clip's original sound. The only model that copies choreography exactly. Needs both inputs - refuse without a video

Withdrawn from the lineup (still in the registry for old jobs and pricing): `seedance`, `wan`, `grok`. Do not pick them.

The registry default is `seedance-2-5`. An empty or unknown model id resolves to it silently.
