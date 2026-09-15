---
name: mira-craft
description: >-
  The camera, light, look, rhythm, time and continuity banks Mira's prompt pipeline is built on,
  generated from the live registry: 58 camera moves, 36 lighting schemes, film stocks, grades,
  lenses, hooks, cut patterns, the continuity doctrine. Use it when you write a clip prompt for
  Mira yourself and want a camera move, a light or a look to be YOUR decision rather than the
  pipeline's: pick from the bank, write the description in words. Also answers "what camera
  moves exist", "lighting scheme for", "движение камеры", "схема света". NOT a prompting
  workflow (mira-video-prompting) and never a list of keys to paste.
license: MIT
metadata:
  version: "0.1.0"
  generated: registry
---

# Mira craft banks

<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

These are the same banks the pipeline's own specialists read inside the graph. Whatever you state
in a prompt is kept word for word; the specialists fill only the slots you left empty. So this is
what you open when you want a decision to be yours, and what you can skip when you do not care:
an unstated slot is filled by a specialist that sees the whole bank at once.

Use the keys to choose, never to write. Pick one move, one lighting scheme, one stock, one grade,
and put the chosen entry's description into the prompt in your own words. A prompt containing a
bank key (`push_in`, `rembrandt`) is a bug; it happened in production once and the clip came back
with the key rendered as a caption.

Choose, do not collect. One item from every list describes a scene that cannot physically exist.

| You are deciding | Read |
|---|---|
| a camera move, a framing, anything about time and speed | [camera.md](references/camera.md) |
| the lighting scheme and its direction | [light.md](references/light.md) |
| film stock, grade, lens, texture, a social aesthetic | [look.md](references/look.md) |
| the hook, the cut pattern, pacing, composition, sound, a genre preset | [rhythm.md](references/rhythm.md) |
| props, object counts, hands, occlusion, cause and effect | [continuity.md](references/continuity.md) |

One file per decision. Do not load all five for one prompt.
