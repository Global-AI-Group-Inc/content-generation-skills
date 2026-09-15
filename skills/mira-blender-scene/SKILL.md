---
name: mira-blender-scene
description: >-
  Build and shoot scenes inside the user's own Blender through the Mira MCP: block out a set with
  primitives, place lights and a camera, import generated 3D assets, animate, then turn a viewport
  playblast into a finished clip with a video model. Use it when the user says "build this in my
  Blender", "собери сцену в блендере", "make a blockout", "put a camera on it", "render this scene
  with Seedance", "animate my scene", or when blender_status reports a connected Blender. Requires
  the Mira for Blender add-on with "Connect agents" switched on. NOT for 3D assets on their own
  (mira-3d) or for video prompting theory (mira-video-prompting).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira Blender scene

The user's Blender is your canvas. Six tools reach it: `blender_status` (is it there, what is
open), `blender_get_scene` (objects, cameras, lights as data), `blender_execute_python` (bpy code,
the way you change anything), `blender_screenshot` (what the user sees), `blender_import_generation`
(a finished 3D generation at the 3D cursor) and `blender_playblast` (the viewport animation as a
clip, uploaded, ready for `referenceVideoUrls`). Everything runs on the user's machine with their
permissions, and every call shows up in their add-on log, so work the way a careful colleague
would at their desk: look first, change in small steps, show the result, ask before spending.

## When to use

- A scene, a set, a blockout, a camera move, a lighting setup, an animation in Blender.
- "Take my scene and make a clip of it": playblast → video model.
- "Put the model I generated into my scene", "build the environment around it".

Not connected (`blender_status.connected == false`): say how to switch on **Connect agents** in
the Mira tab (N-panel → Agents, or the Agents chip on the viewport card) and stop. Do not retry
in a loop; the user has to flip the switch.

## Doctrine

**Look before touching.** `blender_status` then `blender_get_scene`. Note units (`unit_scale`),
the frame range and fps, the active camera, what is selected. A `blender_screenshot` at the start
tells you the framing the user is looking at; keep that framing unless asked to change it.

**Metres, named, parented.** Blender works in metres; a chair is 0.45 m high, a door 2.1 m, a
subway car 18 m long and 2.6 m wide. Name every object you make (`Wall_L`, `Seat_03`,
`Cam_Main`); put a blockout under one empty (`Blockout`) so the user can hide, move or delete it as
a unit. Never rename or delete objects you did not create unless asked.

**Primitive and in clay.** The video model copies what the playblast shows - shapes, silhouettes,
surface patterns and any colour - and draws everything the blockout leaves out from the prompt, as
real footage. Build only what sets the camera, the composition, the scale and the motion: heroes as
`stand_in()` figures (one smooth body, a nose for facing, no costume, hair or props), vehicles as
`vehicle()` (real size, one object, rolling on its wheels), the route as volumes (the ground, walls,
facades, stairs and courts the action runs along or the camera passes close), the road or track as a
raised ribbon with low curbs. Build the route, not the district: beyond about 20 m of the cameras
nothing is built but one terrain mass for the relief; the town, the hillside of houses, the skyline
are written in the prompt and shown in a reference photo. Any repeated rhythm - look-alike houses on
a grid, rows of windows, seats, posts - comes back as the same repetition. Leave out extras and
crowds, plants, small props and detail parts (mirrors, a halo, a steering wheel, signs): the prompt
writes them. Record in clay; the scene's own colours come back
as a video-game look. An animated creature is flexed; furniture keeps its characteristic silhouette;
surfaces are smooth-shaded volumes, never Displace or noise; big walls get rough floors and windows.
Read `references/blockout.md` before the first build: the rules per object and the helpers.
Before the prompt read `references/textures.md` of mira-video-prompting: surfaces, wear and light are the prompt's job.

**Generated models never go into the playblast.** A textured mesh is copied as it looks and
`blender_playblast` stops on it; the clip gets a `stand_in()` or a `vehicle()` box plus a reference
photo in `referenceImageUrls`. `generate_3d` (mira-3d) and `blender_import_generation` are for the
user's own scene, a product or a look-dev pass - ask before the first one (≈4–50 credits) and keep
the result out of the reference clip. A rigged character arrives with its clips as muted NLA tracks.

**Light like a set.** One key (`SUN` 3–5 W/m² or a large `AREA` 200–1000 W), a fill at a quarter of
its energy, a rim to separate the subject; a dark neutral world colour so the viewport reads.

**Camera is the shot.** Create `Cam_Main` (50 mm default; 35 mm for interiors, 85 mm for
portraits), make it the scene camera (`scene.camera = cam`), aim it with a `TRACK_TO` constraint
to an empty at the subject when the move is an orbit or a push-in. Frame with the rule of thirds
and leave headroom; check through the camera (`blender_screenshot(throughCamera=true)`).

**Move people as blocks.** A figure travels and turns as one object (`location`, `rotation_euler`
keys); gestures, talking and dancing are written in the prompt, not keyed. The camera move carries
the shot: 3–10 s at the scene fps, `scene.frame_start/frame_end` set to that range. A creature is
keyed by its path, then flexed (`bpy.ops.mira.flex_creature(target=name)`); a leaping or falling
body rolls around its long axis instead of banking like an aircraft. A person lifted, carried or
thrown is `stand_in(pose="limp")`, never a straight figure spinning (it comes back as a diver);
runners react, then build speed (`run_path()`), never full speed on the first frame.

**Shoot, then render with a model.** `blender_playblast(frameStart, frameEnd, throughCamera=true)`
returns the clip URL and `warnings` about parts the model would copy literally - fix and re-record.
The clip is neutral clay and figures' gestures hold still while they travel; `look="ids"` paints
each figure a flat label colour, `freezeFigures=false` keeps keyed motion (exact choreography only);
never `look="scene"`. The tool stops without recording while extras, a crowd, plants, set dressing, a
field of look-alike blocks away from the cameras, a bouncing vehicle or scene colours remain: fix them (`force=true` only when the user insists). Pass the URL in `referenceVideoUrls` of `generate_video` (`seedance-2-5`, `minimax`, `wan3`, `wan3-prime`, `kling`)
with `ratio: "16:9"`. Prompt: SUBJECT (who, wearing what), LOCATION (materials, colours, light, the surroundings, crowd, plants and props the blockout leaves out),
CAMERA REFERENCE (the clay clip gives the camera path, the framing, the cuts and where people
stand; its figures are stand-ins), then one SHOT per shot with the timecodes from the result's
`facts` (cuts = cameras bound to timeline markers, see `references/blockout.md`). Never ask for
"the framing at each moment". Quote `estimate_cost` first.

**Small steps, verified.** One `blender_execute_python` per logical step (walls, seats, lights,
camera, keys), each under 3 minutes, each followed by a screenshot when the result is visual.
Print what you created (`print(obj.name, obj.dimensions[:])`) so the tool output confirms it. On
an error, read the traceback, fix, rerun only the failed step; the user can Ctrl+Z what you did.

## Interview

Ask only what changes the build; one question at a time, defaults otherwise.

1. What is the scene and what is it for: a still, a clip, a game level, a product shot?
2. Scale and style cues: real-world object or stylised, day or night, interior or exterior.
3. Is there a hero the scene is built around (a generated model, a product)?
4. Shot: static, push-in, orbit, walk-through; length in seconds.

Defaults: 24 fps, 5 s, 16:9, 50 mm, three-point light, blockout under `Blockout`.

## Checklist

- [ ] `blender_status` connected; `blender_get_scene` read; a screenshot taken before changes.
- [ ] Real metres; everything named; blockout parented under one empty.
- [ ] Primitive: heroes `stand_in()`, vehicles `vehicle()`, the route as volumes; no extras, plants, small props, costumes or surroundings beyond the route.
- [ ] Key, fill, rim; world background set; camera made the scene camera and aimed.
- [ ] Frame range set to the shot; camera keys at both ends; figures move as blocks.
- [ ] Credits quoted (`estimate_cost`) and confirmed before `generate_3d` / `generate_video`.
- [ ] Playblast through the camera in clay, 3–10 s; warnings fixed; prompt describes the finished world.
- [ ] Prompt gives the 2-3 big surfaces their wear and the light that shows it; no smooth, clean or render words.
- [ ] Final `blender_screenshot` and the clip URL shown to the user.

## Do not

- Do not touch files outside Blender data, install packages, change preferences, or delete, rename or move the user's objects without asking.
- Do not playblast a frozen scene: without keyframes the clip is a still and teaches the model nothing.
- Do not dress stand-ins: a figure that already looks like the outfit you describe stays a mannequin.
- Do not build crowds, plants or set dressing: whatever you build comes back looking the way it was built.
- Do not build the neighbourhood: a field of look-alike houses comes back as a toy town of identical boxes; build the route and write the rest.
- Capsule figures are fine in a Seedance playblast; only a photoreal non-avatar person is refused.
