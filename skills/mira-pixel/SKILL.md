---
name: mira-pixel
description: >-
  Pixel art on Mira AI: sprites on a visible grid, a limited palette, stair-stepped edges, motion
  in held frames. Use it for "pixel art", "8-bit", "16-bit", "retro game style", "sprite",
  "пиксель-арт", "как в старой игре", "пиксельный". Pass skill="pixel" to generate_video or
  generate_image. Do NOT use for smooth cartoon animation (mira-toon3d), anime (mira-anime) or
  flat vector illustration (mira-illustration).
license: MIT
metadata:
  mira:
    id: pixel
    title: Pixel art
    kind: both
    video_style: pixel
    image_style: pixel
    models: [omni, seedance-2-5, gpt-image-2, gpt-image-2.5-flare, nano-banana-pro]
    order: 90
    icon: grid-2x2
---

# Mira Pixel art

Pixel art is a discipline, not a filter. One pixel density across the whole frame, a palette
you could count, edges that stair-step instead of blur, and motion that snaps between held
poses. Any smoothing anywhere breaks the illusion of a single game.

## When to use

A retro game look for a product, a mascot as a sprite, a short scene that plays like a cutscene
from an indie game, a pixel banner or key visual.

## Doctrine

This is pixel art, the look of a crafted modern indie game, never a photograph and never
smoothed. Everything is drawn on one visible pixel grid at one consistent density, as if captured
from a single game: crisp square pixels, a deliberately limited harmonised palette, clean
hand-placed dithered shading and edges that stay sharp and stair-stepped, never anti-aliased or
blurred. Faces are minimal and iconic, a few pixel clusters for eyes and mouth with the expression
still readable; hair, outfits, props and the product are simplified into bold pixel masses with
strong silhouettes and one or two accent colours, the product's colours and shape kept
recognisable. Motion animates the way sprites animate: a small number of held frames with
decisive pose changes, no smooth interpolation, and the view scrolls, cuts or snaps in whole-pixel
steps rather than gliding. Write the final prompt in English. Never order photographic texture:
no film stock, grain, halation, bokeh, depth of field or lens character. Do not name games or
consoles as the style; describe the pixel density and palette instead.

## Interview

- **density** How fine is the grid? (default: sixteen)
  - `sixteen` 16-bit: Finer grid, more colours per object, detailed backgrounds, readable faces.
  - `eight` 8-bit: Coarse grid, very few colours, chunky shapes, iconic simplicity.
- **motion** How does it move? (default: sprite)
  - `sprite` Sprite cycles: Held frames and snapped pose changes, a locked view.
  - `scroll` Side scroll: The scene scrolls in whole-pixel steps behind a sprite that walks or runs in place.

## Hint

The scene, the sprite in it, and the two or three colours that should dominate.

## Model picks

For video, `omni` holds a limited palette and cuts on its own; `seedance-2-5` when a product
reference or length decides it. For stills, `gpt-image-2` keeps a strict grid; `gpt-image-2.5-flare`
or `nano-banana-pro` when pixel text must be readable.

## Checklist

- One density, stated once. One palette, three to six colours named.
- Motion is described as frames and steps, never as smooth or fluid.
- Nothing photographic appears anywhere in the prompt.

## Do not

Do not write "high resolution pixel art". Do not mix pixel characters with a smooth background.
Do not describe a camera lens.
