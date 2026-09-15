---
name: mira-toon3d
description: >-
  Stylised 3D animation and CGI key visuals on Mira AI: the look of a modern animated feature,
  appealing simplified shapes, designed studio light, bouncy timing. Use it for "3D animation",
  "Pixar-like", "3D cartoon", "CGI character", "3D render of my product", "3D мультфильм",
  "мультяшный 3D", "рендер". Pass skill="toon3d" to generate_video or generate_image. Do NOT use
  for hand-drawn anime (mira-anime), flat illustration (mira-illustration) or photoreal product
  renders (mira-product).
license: MIT
metadata:
  mira:
    id: toon3d
    title: 3D toon
    kind: both
    video_style: toon3d
    image_style: render3d
    models: [seedance-2-5, kling, omni, gpt-image-2, gpt-image-2.5-flare, nano-banana-pro]
    order: 80
    icon: box
---

# Mira 3D toon

Stylised 3D lives between a cartoon and a photograph, and it has to commit to the cartoon side.
Shapes are simplified and appealing, materials are art-directed, light is designed on a stage,
and timing has bounce. Say how it is modelled, shaded and animated, and the render follows.

## When to use

A character piece in the manner of an animated feature, a product turned into a designed CGI key
visual, a mascot brought to life, an explainer with a friendly 3D cast.

## Doctrine

This is stylised CG animation, the look of a modern animated feature, never a photoreal render.
Characters and objects are modelled from simplified, appealing shapes with clean bevels and
exaggerated proportions; skin has soft subsurface warmth, hair is shaped into clean masses,
materials are art-directed with designed roughness rather than measured realism. Light is a
designed studio setup: a soft key, a coloured rim from behind, smooth global fill, a gentle contact
shadow on the floor and a restrained gradient backdrop. Motion has weight and bounce, squash and
stretch on the key beat, anticipation before an action and a settle after it. Attached references
define identity and product facts, the same face, outfit, product shape and label, rebuilt in this
medium. Write the final prompt in English and say how the scene is MODELLED, SHADED and ANIMATED.
Never order film stock, grain, halation or lens character. Do not name studios or franchises.

## Interview

- **tone** What is it for? (default: feature)
  - `feature` Feature film: Warm character-led scene, cinematic staging, emotive lighting, a story beat.
  - `commercial` Commercial key visual: Clean product-led composition, brighter studio light, a single bold action.
- **light** How is it lit? (default: studio)
  - `studio` Designed studio: Soft key, coloured rim, gradient backdrop, controlled shadows.
  - `sunlit` Sunlit world: Warm directional sun, sky fill, long soft shadows, an outdoor stylised set.

## Hint

Who or what is in the scene, what happens in one action, and the identity facts that must stay.

## Model picks

For video, `seedance-2-5` when references or length matter; `kling` for weighty character motion;
`omni` for a cheap multi-shot scene. For stills, `gpt-image-2` for a clean product key visual;
`gpt-image-2.5-flare` when the visual carries text or an exact ratio; `nano-banana-pro` when
several characters must survive.

## Checklist

- Modelling, shading and lighting are each described in one clause.
- One coloured rim, one key. Not a lighting rig with six sources.
- The product's real shape, colours and label are listed as facts.

## Do not

Do not ask for "realistic 3D" or "photoreal". Do not describe camera lenses. Do not mix a
photographed background with CG characters.
