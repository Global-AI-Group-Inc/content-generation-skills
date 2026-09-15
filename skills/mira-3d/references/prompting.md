# Writing for a mesh generator

A 3D prompt describes ONE physical object, complete on all sides, and nothing else. Everything a
video or image prompt adds - scene, camera, lens, light, mood, motion, text on surfaces - does not
exist in a mesh and only confuses the generator.

## The order

1. **Category first** - a humanoid character, a creature, a vehicle, a prop, a piece of furniture, a
   building fragment - so the model knows what kind of shape to expect.
2. **Silhouette and parts** - the overall form, the parts it is made of and their proportions to
   each other ("a stocky four-legged robot, body two thirds of its length, legs thick at the hip").
3. **Materials per part, with a finish word** - the model bakes metallic-roughness PBR maps
   (base colour, metalness, roughness, normal) on every provider we run (Hunyuan 3.1, Meshy 6/7,
   Rodin, Trellis 2), so the finish is what you name: matte plastic, brushed steel, anodised
   aluminium, clear-coated carbon weave, rough cast iron, oiled walnut, worn leather, soft felt.
   "Metal" alone is a coin flip; "brushed steel with a satin finish" is a texture.
4. **Real size or scale** for props and products ("a 25 cm feather", "fits in one hand"); keep
   label and logo geometry simple, and never ask for lettering or fine print on a surface.

## Characters and creatures

Ask for a symmetrical A-pose or T-pose, arms away from the body, legs apart, limbs fully visible,
no held prop overlapping the body - so the mesh can be rigged (Meshy rigging expects a clear
humanoid). A creature is described by the real animal it moves like when it moves later in a
clip; for the mesh only its anatomy matters: how many legs, where the tail joins, wing span.

## What not to write

No lighting, camera angle, depth of field, motion or atmosphere. No "8k", "ultra detailed",
"hyperrealistic" - they do not raise polygon or texture resolution; the tier does. No text.

## Styles

`asset` (the `3d` skill) - one clean asset, materials named per part. `lowpoly` - simple
silhouette, flat materials, modest polygon budget. `toy` - chunky collectible, smooth vinyl finish,
a flat base.

## In a Blender scene

A generated mesh never goes into the reference playblast: a textured model is copied as it looks
and `blender_playblast` stops on it. It is for the user's own scene, a product or a look-dev pass;
the clip gets a stand-in plus a reference photo (mira-blender-scene).
