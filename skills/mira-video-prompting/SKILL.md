---
name: mira-video-prompting
description: >-
  Which of Mira's fourteen video models to pick and how each one treats a prompt: Seedance 2.5,
  Runway Gen-4.5, Kling 3.0, Veo 3.1 (Fast, Lite, Quality), Gemini Omni Flash, MiniMax H3,
  HappyHorse, Wan 2.7 and 3.0, Grok Imagine. Use it before any generate_video call on Mira, when the
  user asks "which model", "how long can it be", "does it have sound", "промпт для видео", or pastes
  a video prompt to improve. NOT for stills (mira-image-prompting) or for the camera and light banks
  themselves (mira-craft).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira video prompting

Thirteen models, one prompt pipeline. The pipeline projects your prose into each model's native
format, so you never write model syntax. What you do decide is the model, and the facts the
prompt must carry. Read this router, then exactly one model file.

## Step 1. Choose the model

Name the ONE thing that decides the clip. If any of these is true, take the model for it:

| The clip needs | Model |
|---|---|
| a person speaking on camera, or legible in-frame text, or Cyrillic | `minimax` |
| several ordered camera moves and timed beats in one prompt, forceful camera work | `runway` |
| convincing human anatomy and physics, sport, cloth, water | `kling` |
| 10, 15 or 30 seconds, heavy referencing, an attached avatar as identity | `seedance-2-5` |
| an edit of a clip that already exists | `omni` |
| a 30 second story in one continuous take with one cast | `wan3` |
| multi-language lip-sync with many character references | `happyhorse` |
| THIS character repeating the motion of THAT clip (a dance trend, a presenter's gesture) | `kling-motion` — one photo + one driving clip, output as long as the clip |
| a clip of your own whose motion, camera or grade to follow | `seedance-2-5`, `minimax`, `wan3` or `omni` with `referenceVideoUrls` |

If none of them is true, a simple short clip, the answer is one of two by what the clip is FOR:
`omni` as the working default, cheapest, it cuts on its own and renders on-frame text well, but
you cannot pin its duration and it takes no 1:1; `veo-quality` when the clip is the hero, one
unbroken take at roughly four times the price, finals only. `veo` and `veo-lite` are the fair and
the cheap Veo for eight second audio clips. Price is the last tie-breaker, never the first
filter, and repeating the same model out of habit is the most common routing failure.

Full facts per model, generated from the live registry:
[references/selection.md](references/selection.md).

## Step 2. Read the model file

One file, not all of them: `references/models/<key>.md`. It carries the model's doctrine, the
format law the critic applies, the limits (seconds, resolution, references, audio) and the things
that model renders badly.

## Step 3. Write the prompt

Read [references/universal-rules.md](references/universal-rules.md) once per session. The short
version: prose in English; subject, then action, then camera, then lens and framing, then light;
count every entity; give every object a carrier and a state after it leaves; every visible change
has a named cause; one move per shot with a start and an end; pace words from one ladder; no
adverbs of softness; no layout words such as overlay or safe zone, the model draws them as
objects; spoken lines word for word in quotes; on-screen text exactly or not at all.

## Step 4. Check before you send

- Does the first two seconds contain a hook: an action, a face, the product in motion?
- Is there exactly one thing the clip proves?
- Would the model file object to anything you wrote (speech on a silent model, a cut on a
  one-take model, a 1:1 on Veo or Omni)?
- Did a bank key leak in (`push_in`, `rembrandt`)? Replace it with the described motion or light.

## Output

Return the prompt as one block of prose, then the model id and the duration. Nothing else.
