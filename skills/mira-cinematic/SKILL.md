---
name: mira-cinematic
description: >-
  Film-grade mood pieces on Mira AI: one strong image, motivated light, real optics, a grade.
  Use it for "cinematic", "film look", "brand film", "hero shot", "mood video", "кино", "как в
  фильме", "атмосферно", teasers and key visuals. Pass skill="cinematic" to generate_video or
  generate_image. Do NOT use for phone-shot creator content (mira-ugc), catalogue packshots
  (mira-product) or fast paid cuts (mira-ads).
license: MIT
metadata:
  mira:
    id: cinematic
    title: Cinematic
    kind: both
    video_style: cinematic
    image_style: cinematic
    models: [veo-quality, veo, seedance-2-5, runway, gpt-image-2, gpt-image-2.5-sunburst, seedream-5-pro, seedream-4]
    order: 40
    icon: clapperboard
---

# Mira Cinematic

Cinematic is not a filter. It is one deliberate image with a reason for its light, a lens that
has character, and a grade that agrees with the story. Fewer things happen, and each one is
composed.

## When to use

A brand film, a teaser, a hero shot, a key visual, an atmospheric moment with a person, a place or
a product. The piece is meant to be felt before it is understood.

## Doctrine

This is a cinematic piece: one strong composed image per beat, and few beats. Light is motivated
and directional, a single source with a visible reason in the scene, deep shadow around it, haze
or dust in the air catching it, a hard edge from behind separating the subject from the
background. Optics have character: shallow depth of field, a wide-screen feel with gentle flare
and soft falloff at the edges, 35mm photographic realism in skin, fabric and surfaces. Colour is
graded as one decision, warm filmic tones or a cool-and-warm split, applied consistently across
the whole piece. The camera moves for one reason, to follow the subject or to reveal, and moves
slow; most of the energy lives in the subject and the light, not in the lens. Sound and silence
are part of the frame. Write the final prompt in English. Do not name film titles, directors or
third-party brands; state the visual facts they would stand for. Do not invent on-screen text.

## Interview

- **mood** What is the temperature of the piece? (default: warm)
  - `warm` Warm: Golden and amber light, warm skin, soft shadows, an inviting grade.
  - `cold` Cold: Steel and blue light, hard shadows, a cooler grade with clean whites.
  - `noir` Noir: Near-black surroundings, one hard light, strong contrast, colour almost gone.
- **subject** What carries the frame? (default: person)
  - `person` A person: A single character in a real place, their face and hands the point of focus.
  - `product` A product: The product as an object of desire in an atmospheric setting, still exact in shape and label.
  - `place` A place: Architecture or landscape with a small human figure for scale, the light doing the storytelling.
- **take** How is it shot? (default: one)
  - `one` One unbroken take: A single continuous shot with one move and one reveal.
  - `sequence` A cut sequence: Three to five composed shots that build to one final image.

## Hint

The one image you want people to remember, and where the light in it comes from.

## Model picks

For a single unbroken hero take, `veo-quality`; it cannot cut, so keep it to one shot. `veo` for
the same look at a fair price. For a sequence with cuts or a longer piece, `seedance-2-5`; for
forceful camera work in a sequence, `runway`. For stills, `gpt-image-2` for photoreal skin and
materials, `gpt-image-2.5-sunburst` (premium) for the film-still hero frame inspected closely,
`seedream-5-pro` for photographic skin and materials at true 2K on the exact ratio, `seedream-4`
for the same character across several frames.

## Checklist

- Every light has a reason that is visible or implied in the scene.
- One grade, named once. One lens character, named once.
- The camera move has a start point and an end point and a reason.

## Do not

Do not write "cinematic", "epic" or "masterpiece" in the prompt; those words are the reason this
playbook exists. Do not mix a warm and a cold grade in one piece. Do not add a second light
source to fix a shadow; move the subject.
