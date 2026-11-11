---
name: mira-unreal-scene
description: >-
  Build levels, characters and avatars inside the user's own Unreal Editor (UE 5.7 and 5.8) through
  the Mira MCP: read the level, change it with Python, import generated images, clips and 3D models,
  turn a rigged character into a talking, moving avatar through IK Rig, record a Sequencer playblast
  for a video model, and package an Android or iOS test build. Use it when the user says "do it in
  my Unreal", "собери сцену в анриле", "put the model in Unreal", "make an avatar",
  "apply this animation", "build for my phone", or when unreal_status reports a connected Unreal.
  Requires the Mira for Unreal Engine plugin (Window → Mira) with "Connect agents" on. NOT for 3D
  assets on their own (mira-3d), Unity (mira-unity-scene) or Blender scenes (mira-blender-scene).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira Unreal scene

The user's Unreal Editor is your workbench. The tools that reach it:

| tool | what it does |
|---|---|
| `unreal_status` | is it there, engine and plugin versions, project, open level, PIE, selection |
| `unreal_get_scene` | actors of the open level (labels, classes, folders, transforms), cameras, lights |
| `unreal_execute_python` | your Python runs in the Editor with the `unreal` module — the way you change anything |
| `unreal_search_api` | the `unreal` Python API of their exact engine version |
| `unreal_screenshot` | the level viewport or a camera (16:9 unless `aspect` says 9:16, 1:1 …), as an image |
| `unreal_import_generation` | a finished generation into `/Game/Mira` and the level: texture, media source, static or skeletal mesh |
| `unreal_setup_avatar` | a rigged generation or a skeletal mesh → avatar with an IK Rig, placed in the level |
| `unreal_apply_motion` | an animation generation retargeted through IK Retargeter onto the avatar |
| `unreal_avatar_speak` | a speech generation as the avatar's voice; mouth morph targets follow it |
| `unreal_playblast` | a camera recorded through a Level Sequence (16:9 unless `aspect`), uploaded as an MP4 for `referenceVideoUrls` |
| `unreal_build_player` | an Android `.apk` or an iOS package of the open project |

Everything runs on the user's machine with their permissions and every call is listed in their
Mira tab. Work like a careful colleague at their desk: look first, change in small steps, show
the result, ask before spending credits.

## When to use

- A level, a set, lighting or a camera in Unreal; a generated model placed into it.
- An avatar: a Mira character (generate_3d with `rig`, or rig_3d) or the user's skeletal mesh that moves and speaks.
- "Record it and make a clip": playblast → video model, as in mira-blender-scene.
- A test build to see it on a phone.

Not connected (`unreal_status.connected == false`): tell the user to open their project with Mira for
Unreal Engine (miralabs.art/unreal) in `Plugins/`, Window → Mira → sign in → **Connect agents**, and
stop. Do not retry in a loop.

## Doctrine

**Look before touching.** `unreal_status`, then `unreal_get_scene`. Note the open level, the cameras,
what is selected, whether PIE is running (never change the level during PIE). An `unreal_screenshot`
at the start shows the framing the user is looking at.

**Unreal is not Unity or Blender.** Z is up, the coordinate system is left-handed (X forward, Y right),
units are **centimetres**, rotations are degrees as `unreal.Rotator(roll=, pitch=, yaw=)`. A chair is
45 cm high, a door 210 cm, a basic-shape cube is 100 cm. Label every actor you make
(`set_actor_label`) and put a build in one Outliner folder (`set_folder_path("Mira/Blockout")`) so the
user can hide or delete it as a unit. Never rename, move or delete the user's actors unless asked.

**One transaction per step.** `unreal_execute_python` runs your code in the Editor's Python. Wrap
changes in `with unreal.ScopedEditorTransaction("label"):` so one Ctrl+Z undoes your whole step.
Use the subsystems — `unreal.get_editor_subsystem(unreal.EditorActorSubsystem)` and friends — not the
deprecated `EditorLevelLibrary`. `print(...)` comes back as output; print what you created. New assets
go under `/Game/Mira/...` only. Read `references/scripting.md` before the first call.

**Look things up, don't guess.** The Python API moves between 5.x releases (Sequencer channels, IK
Retargeter batch calls). `unreal_search_api` with words or an exact name answers for their version.

**Small steps, verified.** One call per logical step (floor, walls, lights, camera, sequence), each
followed by `unreal_screenshot` when the result is visual. On a Python error the traceback names the
line of your code: fix that line and rerun only that step. Never save levels or assets unless asked;
never touch Project Settings, plugins, `.ini` files or anything outside `/Game/Mira`.

**Avatars.** A Mira character for an avatar is `generate_3d` with `rig: true` (meshy-7) or `rig_3d` on
a finished model — characters in an A-pose with clear limbs (quote `estimate_cost` first). Then
`unreal_setup_avatar(generationId)` imports a skeletal mesh and builds its IK Rig; a report of missing
retarget chains means the rig is not humanoid enough — say so instead of forcing it.
`unreal_apply_motion` retargets the clips of any rigged generation (walking, running, dance presets of
rig_3d) onto the avatar. Speech: `generate_audio` (kind speech, quote the price) →
`unreal_avatar_speak`. Details: `references/avatar.md`.

**Playblast for a video model.** Same doctrine as mira-blender-scene: primitive shapes, plain
materials, one camera move, 3–10 s. Build the move as a Level Sequence with a CineCameraActor and a
Camera Cut track (`references/sequencer.md`); `unreal_playblast` renders it and uploads an MP4 tagged
as a blockout. Pass its `url` in `referenceVideoUrls` of `generate_video` with the shot described in words.

**Phone builds** need the Android SDK and NDK set up in the Editor, or a Mac with Xcode for iOS; if
`unreal_build_player` reports them missing, tell the user. Packaging cooks the whole project and can
take many minutes; ask first. Signing stays with the user.

## Interview

Ask only what changes the build; one question at a time.

1. What is it for: a level, a cinematic shot, an avatar demo, a clip?
2. Is there a hero — a generated model, their own character, a product?
3. For an avatar: what should it do (idle, walk, wave, talk) and say?

Defaults: a directional sun with a sky light, `Cam_Main` CineCamera at 160 cm eye height with a 35 mm
lens, 24 fps.

## Checklist

- [ ] `unreal_status` connected, no PIE; `unreal_get_scene` read; a screenshot taken before changes.
- [ ] Centimetres, Z-up, Rotator by keyword; actors labelled and foldered; every step in a transaction.
- [ ] Credits quoted (`estimate_cost`) and confirmed before `generate_3d`, `rig_3d`, `generate_audio`, `generate_video`.
- [ ] Avatar: IK Rig built without missing chains, motion applied, speech assigned; tell the user to press Play or scrub the sequence.
- [ ] Final `unreal_screenshot` shown to the user; nothing saved unless they asked.

## Do not

- Do not delete, rename or move the user's actors or assets without asking; do not save levels.
- Do not enable plugins, change Project Settings or `.ini` files, or write outside `/Game/Mira`.
- Do not start a package build or a long playblast without saying how long it may take.
- Do not start PIE yourself; ask the user to press Play.
