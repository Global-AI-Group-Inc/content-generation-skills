---
name: mira-unity-scene
description: >-
  Build scenes, characters and avatars inside the user's own Unity Editor through the Mira MCP:
  read the scene, change it with C#, import generated 3D models with their clips, turn a rigged
  character or a VRM into a talking, moving humanoid, record an edit-mode playblast for a video
  model, and make an Android or iOS test build. Use it when the user says "do it in my Unity",
  "собери сцену в юнити", "put the model in Unity", "make an avatar", "apply this animation",
  "build for my phone", or when unity_status reports a connected Unity. Requires the Mira for Unity
  package (Window → Mira) with "Connect agents" on. NOT for 3D assets on their own (mira-3d) or
  Blender scenes (mira-blender-scene).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira Unity scene

The user's Unity Editor is your workbench. The tools that reach it:

| tool | what it does |
|---|---|
| `unity_status` | is it there, Unity and package versions, open scene, render pipeline, `compiling`, build modules |
| `unity_get_scene` | objects (hierarchy paths, components, transforms), cameras, lights |
| `unity_execute_csharp` | your C# runs in the Editor — the way you change anything |
| `unity_search_api` | the UnityEngine/UnityEditor API of their exact Unity version |
| `unity_screenshot` | the Scene view or a camera, as an image |
| `unity_import_generation` | a finished 3D generation into `Assets/Mira/Generations` and the scene, clips on an Animator |
| `unity_setup_avatar` | a rigged generation or a VRM → humanoid with a `MiraAvatar` (voice, lip-sync, blinking) |
| `unity_apply_motion` | an animation generation baked into a humanoid clip and played on any humanoid |
| `unity_avatar_speak` | a speech generation as the avatar's voice; the mouth follows it in Play mode |
| `unity_playblast` | edit-mode recording through a camera, uploaded as an MP4 for `referenceVideoUrls` |
| `unity_build_player` | Android `.apk` or iOS Xcode project of the open scene |

Everything runs on the user's machine with their permissions and every call is listed in their
Mira window. Work like a careful colleague at their desk: look first, change in small steps, show
the result, ask before spending credits.

## When to use

- A scene, a level, a set, lighting or a camera in Unity; a generated model placed into it.
- An avatar: a Mira character (generate_3d with `rig`, or rig_3d) or the user's VRM that moves and speaks.
- "Record it and make a clip": playblast → video model, as in mira-blender-scene.
- A test build to see it on a phone.

Not connected (`unity_status.connected == false`): tell the user to open Unity with Mira for Unity
(mira.mybots.pro/unity), Window → Mira → sign in → **Connect agents**, and stop. Do not retry in a loop.

## Doctrine

**Look before touching.** `unity_status`, then `unity_get_scene`. Note the render pipeline
(builtin/urp/hdrp decides which shaders exist), the main camera, what is selected. A
`unity_screenshot` at the start shows the framing the user is looking at.

**Unity is not Blender.** Y is up, the coordinate system is left-handed, units are metres, rotations
are degrees (`transform.eulerAngles`, `Quaternion.Euler`). A chair is 0.45 m high, a door 2.1 m.
Name every object you make and parent a build under one root (`new GameObject("Blockout")`) so the
user can hide or delete it as a unit. Never rename, move or delete the user's objects unless asked.

**Code is the body of a method.** `unity_execute_csharp` compiles your code with Unity's own Roslyn
without a domain reload; it is the body of `static object Run(AgentContext mira)` with `System`,
`System.Linq`, `System.Collections.Generic`, `UnityEngine`, `UnityEditor` already imported (more
`using` lines may open the code). Assign `result` to return a value; `print(...)` and `Debug.Log`
come back as output. Register what you create — `mira.Created(new GameObject("Cam_Main"))`,
`Undo.RecordObject(obj, "…")` before changing it — so the user undoes your whole step with one
Ctrl+Z. `mira.Find("Root/Child")` finds an object by path or name. No classes, no `MonoBehaviour`
definitions in the code: to add a script asset, write a `.cs` file under `Assets/` and call
`mira.RequestRefresh()` — Unity then recompiles and the next `unity_status` shows `compiling`;
wait until it is false. Read `references/scripting.md` before the first call.

**Look things up, don't guess.** API differs across 2022.3 and Unity 6 (`FindObjectsByType` vs
`FindObjectsOfType`, URP vs built-in shaders). `unity_search_api` with words or an exact path answers
for their version.

**Small steps, verified.** One call per logical step (floor, walls, lights, camera, animation), each
followed by `unity_screenshot` when the result is visual. Print what you created. On a compile error
the message names `agent.cs(line,col)` of your code: fix that line and rerun only that step. Never
save scenes or assets unless asked; never touch Project Settings, packages or files outside `Assets/`.

**Avatars.** A Mira character for an avatar is `generate_3d` with `rig: true` (meshy-7) or `rig_3d` on
a finished model — characters in an A-pose with clear limbs (quote `estimate_cost` first). Then
`unity_setup_avatar(generationId)` makes a humanoid: it reports the matched bones; `missing_bones`
means the rig is not humanoid enough — say so instead of forcing it. A VRM the user imported with
UniVRM goes in by `vrmPath`. `unity_apply_motion` puts the clips of any rigged generation (walking,
running, dance presets of rig_3d) on any humanoid, the VRM included. Speech: `generate_audio`
(kind speech, quote the price) → `unity_avatar_speak`; the mouth moves in Play mode.
Details: `references/avatar.md`.

**Playblast for a video model.** Same doctrine as mira-blender-scene: primitive shapes, plain
materials, one camera move, 3–10 s; `unity_playblast(camera: true)` steps every Timeline and
Animator in edit mode and uploads an MP4 tagged as a blockout. Pass its `url` in
`referenceVideoUrls` of `generate_video` with the shot described in words.

**Phone builds** need the Android or iOS module (`unity_status.build_targets`); if missing, tell the
user to add it in Unity Hub → Installs → Add modules. A build switches the platform and can take
minutes; ask first. iOS returns an Xcode project the user signs and runs.

## Interview

Ask only what changes the build; one question at a time.

1. What is it for: a scene, a game level, an avatar demo, a clip?
2. Is there a hero — a generated model, a VRM, a product?
3. For an avatar: what should it do (idle, walk, wave, talk) and say?

Defaults: URP/builtin as the project has it, a three-point light, `Cam_Main` at eye height, 30 fps.

## Checklist

- [ ] `unity_status` connected, not compiling; `unity_get_scene` read; a screenshot taken before changes.
- [ ] Metres, Y-up, degrees; everything named and parented under one root; Undo registered.
- [ ] Credits quoted (`estimate_cost`) and confirmed before `generate_3d`, `rig_3d`, `generate_audio`, `generate_video`.
- [ ] Avatar: humanoid confirmed (no `missing_bones`), motion applied, speech assigned; tell the user to press Play.
- [ ] Final `unity_screenshot` shown to the user; nothing saved unless they asked.

## Do not

- Do not delete, rename or move the user's objects or assets without asking; do not save scenes.
- Do not install or remove packages, change Project Settings or player settings, or write outside `Assets/`.
- Do not start a phone build or a long playblast without saying how long it may take.
- Do not run Play mode yourself; ask the user to press Play.
