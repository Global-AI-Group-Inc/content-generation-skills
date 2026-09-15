---
name: mira-anime
description: >-
  Hand-drawn anime on Mira AI: cel-shaded characters, painted backgrounds, drawn camera, not
  footage. Use it for "anime", "аниме", "manga style", "cel shading", "make it a cartoon in the
  Japanese style", turning a photo or a product into an anime scene. Pass skill="anime" to
  generate_video or generate_image. Do NOT use for Western illustration or storybook (mira-illustration),
  3D animation (mira-toon3d) or pixel art (mira-pixel).
license: MIT
metadata:
  mira:
    id: anime
    title: Anime
    kind: both
    video_style: anime
    image_style: anime
    models: [seedance-2-5, kling, omni, gpt-image-2, gpt-image-2.5-flare, nano-banana-pro]
    order: 60
    icon: sparkles
---

# Mira Anime

Anime is a drawn medium with its own physics. Lines are ink, colour is flat with hard shadow
steps, backgrounds are paintings, and motion is a few decisive poses rather than a smooth
interpolation. The moment a prompt asks for grain or a lens, the render slides back to a photo.

## When to use

The user wants a scene, a person, a product or a photo re-drawn as Japanese animation. The
identity of a character or a product stays; the medium changes completely.

## Doctrine

This is hand-drawn anime animation, not footage. Figures are cel-shaded with clean ink linework,
flat colour fills and hard shadow steps, large expressive eyes and readable expressions. Backgrounds
are painted plates with atmospheric depth in the style of a modern anime film. Motion is limited on
holds and full on the key beat, with speed lines and impact frames for accents. The camera exists
but it is a drawn camera: it can pan, push or whip across the scene, and it has no lens. Attached
reference photos define WHO and WHAT, the same face, hair colour, outfit and product shape, re-drawn
in this medium, never kept photographic. A 3D blockout or playblast gives placement and camera only:
redraw its figures with anime faces and proportions and never keep its 3D shading or volumes. Write
the final prompt in English and describe how the lines, fills, shading and movement are DRAWN. Never
order photographic texture: no film stock, grain, halation, bokeh, depth of field or lens character.
Do not name studios, directors or copyrighted characters; describe the look in plain words.

## Interview

- **era** Which anime look? (default: modern)
  - `modern` Modern film: Clean thin lines, soft gradient skies, detailed painted cities, gentle bloom on light sources.
  - `retro` 90s cel: Thicker lines, grainless flat colour, bold shadow steps, slightly muted palette, held frames.
- **energy** How much movement? (default: calm)
  - `calm` Calm: A held scene with one meaningful movement, hair or fabric drifting, a slow drawn pan.
  - `action` Action: A key beat with speed lines, an impact frame and a snap cut to the reaction.

## Hint

Who or what is in the scene, what they are doing, and one detail that must stay the same as in the photo.

## Model picks

For video, `seedance-2-5` when reference photos or a longer story decide the clip; `kling` for
character action with clean motion; `omni` for a cheap multi-shot scene. For stills,
`gpt-image-2` for a faithful re-draw of a photo; `gpt-image-2.5-flare` when the re-draw must
keep the exact ratio or carry text; `nano-banana-pro` when several people must survive the
conversion.

## Checklist

- The prompt says how it is drawn, not how it was filmed.
- No photographic words anywhere: stock, grain, lens, bokeh, depth of field.
- Identity facts from the photo are listed as facts: hair colour, outfit, product shape, label.

## Do not

Do not ask for "realistic anime". Do not mix a photographic background with drawn characters.
Do not name a studio or a franchise as the style.
