---
name: mira-illustration
description: >-
  Drawn and painted artwork in motion on Mira AI: editorial illustration, storybook, comic panel,
  flat vector, watercolour or gouache brought to life. Use it for "illustration", "illustrated
  video", "motion graphics", "storybook", "watercolour", "иллюстрация", "нарисованный ролик",
  "как в детской книге". Video only. Pass skill="illustration" to generate_video. Do NOT use for
  Japanese anime (mira-anime), 3D animation (mira-toon3d) or pixel art (mira-pixel).
license: MIT
metadata:
  mira:
    id: illustration
    title: Illustration
    kind: video
    video_style: illustration
    models: [omni, seedance-2-5, kling]
    order: 70
    icon: pen-tool
---

# Mira Illustration

Illustration is artwork first and motion second. Every element shows the hand that made it,
brush, ink, pencil or vector, and colour is designed, not photographed. The animation moves the
artwork; it never turns it into a film.

## When to use

An explainer that should feel like a magazine illustration, a storybook moment, a comic panel
that comes alive, a flat vector scene for a product story, a watercolour mood piece.

## Doctrine

This is illustrated artwork in motion, not footage: drawn or painted elements with visible brush,
ink, pencil or vector character in every part of the frame, and colour that is designed as a
palette rather than photographed. Shapes are simplified and composed; texture is the texture of
the medium, paper grain, brush edges, flat vector fills, never the texture of a lens. Movement is
economical and deliberate: elements slide, unfold, rotate or are revealed as if drawn in, with
clean easing and holds between beats. Depth comes from layered flat planes moving at different
speeds, not from focus. Characters are stylised with readable silhouettes and simple expressive
faces; a product keeps its exact shape, colours and label, re-drawn in the same medium as
everything else. Write the final prompt in English and name the medium in plain words. Never
order film stock, grain, halation, bokeh, depth of field or lens character. Do not name artists
or third-party brands as the style.

## Interview

- **medium** What is it drawn with? (default: editorial)
  - `editorial` Editorial illustration: Confident ink lines, limited flat colour, textured paper, a magazine feel.
  - `storybook` Storybook: Soft painted shapes, warm palette, gentle paper texture, friendly characters.
  - `vector` Flat vector: Clean geometric shapes, no outlines or thin ones, bold flat colour, crisp edges.
  - `watercolour` Watercolour: Translucent washes, soft bleeding edges, white paper showing through, sparse line.
- **motion** How does it move? (default: reveal)
  - `reveal` Drawn in: Elements appear as if being drawn or unfolded, one at a time, with holds.
  - `parallax` Layered scene: Flat planes slide at different speeds around a mostly still subject.

## Hint

The scene, the one thing that moves, and the medium it is drawn in.

## Model picks

`omni` cuts a short illustrated story on its own and keeps flat colour clean. `seedance-2-5`
when the piece is longer or a product reference must stay exact. `kling` for a character with
more elaborate motion.

## Checklist

- The medium is named in plain words and nothing contradicts it.
- Motion is described as movement of artwork, not as camera optics.
- The product, if any, is re-drawn in the same medium and keeps its facts.

## Do not

Do not mix a photographed background with drawn characters. Do not ask for "photorealistic
illustration". Do not add lens flares, grain or depth of field.
