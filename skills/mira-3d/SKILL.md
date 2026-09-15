---
name: mira-3d
description: >-
  3D models on Mira AI: a textured mesh (GLB, FBX, OBJ, USDZ) from a text prompt or from one to
  four photos, optionally rigged as a humanoid with animation clips. Use it for "3D model",
  "3д модель", "сделай меш", "GLB", "для Blender", "для Unity", "for a game", "3D print",
  "AR product", "turn this photo into 3D", "rig this character". Pass skill="3d" to
  generate_3d, or call rig_3d on an existing model. Do NOT use for 2D renders that merely look
  three-dimensional (mira-toon3d) or for product photos (mira-product).
license: MIT
metadata:
  mira:
    id: 3d
    title: 3D model
    kind: model3d
    model3d_style: asset
    models: [hunyuan-3.1, meshy-7, trellis-2, rodin-fast]
    order: 95
    icon: box
---

# Mira 3D

One subject becomes one mesh. The model reads the prompt or the photo as a description of a
single object seen from all sides, so everything that helps it understand the shape belongs in
the request, and everything that describes a scene, a mood or a camera does not.

## When to use

A character, a prop, a product or a piece of environment that has to exist as geometry: to drop
into Blender, Unity, Unreal or a browser game, to print, to show in AR, to animate as a rigged
humanoid. Anything where the deliverable is a file with polygons, not a picture.

## Doctrine

This is a single-asset 3D generation: one subject, complete on all sides, standing alone on a
neutral background with nothing else in frame. Describe the object as a physical thing: its
overall silhouette, the parts it is made of, their proportions to each other, the materials and
colours of each part, and the surface finish. Name the category first (a humanoid character, a
creature, a vehicle, a prop, a piece of furniture, a building fragment) so the model knows what
kind of shape to expect. For characters and creatures, ask for a symmetrical A-pose or T-pose
with arms away from the body and legs apart, limbs fully visible, no held props overlapping the
body, so the mesh can be rigged. For products and props, give the real-world size or the scale
relative to a hand, and keep the label or logo geometry simple. Say nothing about lighting,
camera angle, depth of field, motion or atmosphere: none of it exists in a mesh. Do not ask for
text, lettering or fine print on the surface. Write the prompt in English.

## Interview

- **subject** What kind of asset is it? (default: prop)
  - `character` Character: A humanoid or creature, symmetrical A-pose, arms away from the body, legs apart, limbs fully visible, no props overlapping the body.
  - `prop` Prop or product: A single object with a clear silhouette, real-world proportions, standing on its base, complete on all sides.
  - `environment` Environment piece: A modular piece of a set, such as a wall, a tree, a rock, a vehicle or a building fragment, with a flat resting side so it can be placed.
- **use** Where will it go? (default: general)
  - `general` General: Clean geometry and a full-colour texture, the default for previews and renders.
  - `game` Game engine: Clean quad-friendly topology at a modest polygon count, no floating pieces, a texture that reads at a distance.
  - `print` 3D print: A single watertight solid without thin protrusions, colour is irrelevant.
- **detail** How much detail? (default: standard)
  - `draft` Draft: A quick low-detail pass to check the shape.
  - `standard` Standard: Full geometry and texture at the model's normal quality.
  - `high` High: The model's highest geometry and texture setting, with PBR maps where the model offers them.

## Hint

Name the object, its parts and materials, and say if it is a character that should be rigged.

## Model picks

`hunyuan-3.1` is the default: strong geometry from text or a photo, FBX and USDZ included, PBR
on request. `meshy-7` for characters that must be rigged and animated, and for game-ready
low-poly meshes. `trellis-2` for props and products from a photo with the cleanest UVs.
`rodin-fast` for a cheap draft in any format, including STL for printing. Rigging works on any
finished GLB through `rig_3d`, whichever model made it, and on a mesh the user already has: from
Blender or another DCC tool, export the character as GLB, `create_upload` it (kind `model3d`) and
call `rig_3d` with the returned `libraryItemId`.

## Checklist

- One subject, nothing else in the prompt or the photo.
- Characters in A/T-pose with limbs apart when a rig is planned.
- Materials and colours named per part, not as a mood.
- Photo references show the object cleanly, ideally on a plain background.

## Do not

Do not describe a scene, a camera or a light. Do not ask for text on the surface. Do not send
a photo of several objects and expect one of them back.
