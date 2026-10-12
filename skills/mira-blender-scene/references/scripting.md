# Scripting the user's Blender: rules, traps, motion checks

Read this before the first `blender_execute_python` of a session. The rules protect the user's work;
the traps are the ones that cost real builds; the motion checks catch what a single screenshot
cannot.

## Working rules

- **Never save unless asked.** The user decides when their `.blend` changes on disk.
- **Checkpoint before a broad change.** Before anything that touches many objects at once (a
  rebuild of the blockout, a mass rename, a modifier applied everywhere), and only when the file
  already has a path, write a copy next to it and say so:
  `bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath.replace(".blend", "_mira_backup.blend"), copy=True)`.
  `copy=True` keeps the open file and its path unchanged. This is the one file you may write.
- **A call that succeeded is not a result you saw.** If a screenshot or playblast could not be taken
  or looked at, the step is blocked, not passed; say so rather than reporting success.
- **After an exception, re-read the scene.** A script that failed halfway left half its objects
  behind. Read `blender_get_scene` (or print what exists) before running anything again.
- **Retries are idempotent.** Write steps as "make it if it is not there": look up the object by
  name and reuse or replace it, so running a step twice does not leave `Wall_L.001`.
- **Check an API you are not sure of.** `blender_search_api` reads the user's own Blender: `path`
  `bpy.types.Action.fcurves` answers `exists: false` with `also_on`, `query` "boolean modifier"
  finds the right type. One lookup is cheaper than a traceback.

## Traps

- **Layered actions (Blender 4.4+, required in 5.x).** `action.fcurves` is gone: curves live in
  `action.layers[i].strips[j].channelbag(slot).fcurves`, filtered by the object's action slot. To
  key, use `obj.keyframe_insert(...)`; to read or edit curves, go through the channelbag of
  `obj.animation_data.action_slot`.
- **Bevel on a scaled object** bulges into pillows: apply scale first
  (`bpy.ops.object.transform_apply(scale=True)`), then bevel.
- **`bound_box` is not a radius.** For round things (wheels, columns) measure the radius from the
  mesh (the largest vertex distance from the axis), not half the box.
- **Quaternions have two signs for one rotation.** Compare with `q1.rotation_difference(q2).angle`,
  not component by component.
- **Do not select geometry by coordinate boxes.** Select by name, by vertex group or by material;
  a box that worked on one mesh catches the wrong faces on the next.
- **Constraint targets** (track-to empties, path curves) stay visible in the viewport and hidden in
  the render only (`hide_render = True`), so the user can still grab them.

## Motion checks

- **Rolling has arithmetic.** A wheel or ball that rolls without slipping turns by
  distance / radius radians per frame. Compute the rotation from the travel, do not eyeball it.
- **No Copy Location on a rotating child.** It fights the parent's rotation and the child drifts
  off its axle; parent it, or drive the rotation from the parent's travel.
- **Contact with uneven ground.** For a vehicle or a creature on a slope, cast rays down from each
  support point (wheels, feet) with `scene.ray_cast`, set height, roll and pitch from the
  differences, and smooth the result over about 20 frames. Two passes: place, then re-check.
- **Spinners strobe.** A wheel or a fan whose step per frame is close to a multiple of its spoke
  angle looks frozen or backwards. Keep the step about half a sector away from a multiple.
- **Look at the motion, not one frame.** Screenshot the first, middle and last frame of a move, or
  playblast a few seconds, before calling the animation done.
