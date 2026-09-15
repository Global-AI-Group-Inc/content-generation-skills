---
name: mira-image-prompting
description: >-
  How to write stills for Mira AI's image models: GPT Image 2 and 2.5, Nano Banana Pro, Seedream 4, 4K
  and 5 Pro, Muse Image, Flux. Which model holds text, which keeps a product identical across a series, how the craft
  banks for light, optics, composition, grade and materials are used, and the words that make an
  image worse. Use it before any generate_image call on Mira, or when the user says "image prompt",
  "промпт для картинки", "нарисуй", "сгенерируй картинку", poster, packshot, banner, cover. NOT for
  video (mira-video-prompting).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira image prompting

The image pipeline works like the video one: your facts are kept, a planner and four specialists
fill the light, optics, composition and grade you did not state, a critic projects the result into
the model's format. So the job is to be exact about the subject and clear about the one or two
craft decisions you care about.

## Step 1. Choose the model

Name the ONE thing that decides the image:

| The image needs | Model |
|---|---|
| text in frame, any language, Cyrillic | `gpt-image-2.5-flare` (or `nano-banana-pro`) |
| a polished campaign visual or a faithful edit of the user's photo, inspected closely | `gpt-image-2.5-sunburst` (premium) |
| the same product or person across several images | `seedream-4` |
| premium photoreal at true 2K: skin, fabric, glass, metal that must look photographed | `seedream-5-pro` (4 credits) |
| a real, specific place, landmark or product that must be recognisable; cheap drafts | `muse-image` (1 credit) |
| print-grade detail, a large-format hero | `seedream-4k` |
| an exact tall ratio (9:16, 4:5) that must come back exactly | `gpt-image-2.5-flare`, `nano-banana-pro`, `seedream-5-pro` or `seedream-4` |
| fast drafts and mood exploration, no text | `flux` |
| everything else: a detailed commercial brief, packshots, materials, skin | `gpt-image-2` |

Costs and quirks per model: [references/models.md](references/models.md).

## Step 2. Build the prompt

Read [references/craft.md](references/craft.md), generated from the registry, once per session.
One paragraph of prose, 90 to 160 words, in this order: subject with material detail; composition
and framing for the exact ratio; background and depth; the lighting setup with a source and a
direction; palette; optics and shot size; surface and texture; grade; the empty part of the frame
left for later. Choose one lighting scheme, one optics entry, one grade and at most two materials.

## Step 3. Pick from the banks, write in words

The banks are for choosing. Open the one you need, pick an entry, and write its description into
the prompt in plain words. A key such as `three_point` or `macro_100` in a prompt is a bug.

| Decision | Read |
|---|---|
| light | [references/light.md](references/light.md) |
| lens and shot size | [references/optics.md](references/optics.md) |
| how the frame is arranged | [references/composition.md](references/composition.md) |
| colour treatment | [references/grade.md](references/grade.md) |
| surfaces and materials | [references/materiality.md](references/materiality.md) |

## Step 4. Check

- Every adjective is checkable against the finished image. Delete the ones that are not.
- No tag soup, no brand shorthand, no praise words. See the banned list in
  [references/craft.md](references/craft.md).
- The product's label and the location's signage are the user's own and stay exact; third-party
  brands are described generically.
- Text appears in double quotes, exactly, or not at all.

## Output

```
Model: <id>
Ratio: <w:h>
Prompt: <one paragraph>
```
