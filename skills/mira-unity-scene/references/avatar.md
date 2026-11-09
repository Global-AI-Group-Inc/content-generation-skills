# Avatars in Unity

## From a Mira character

1. The character must be a humanoid with clear limbs in an A- or T-pose. Generate it with
   `generate_3d` (`model: "meshy-7"`, `rig: true`, `pose: "a-pose"`, `skill: "3d"`) or rig a finished model
   with `rig_3d` (8 credits + 5 per extra clip). Quote `estimate_cost` (kind `model3d` or `rig`) first.
   Walking and running clips come free with every rig; extra presets by id (0 Idle, 28 Wave hello, 25 Nod
   yes, 22 Funny dance, 64 Dance, 298 Cheer …).
2. `unity_setup_avatar(generationId, name)` imports the rigged GLB with its clips, matches the bones to
   Unity's human bones, builds the Avatar, bakes the clips into humanoid clips and puts them on an
   AnimatorController (first clip = default state). The answer lists `mapped_bones`, `missing_bones`
   and `clips`.
3. `missing_bones` not empty → the rig is not humanoid; do not force it. Say which bones are missing.

## From a VRM

The user imports the `.vrm` with UniVRM (Package Manager → `com.vrmc.vrm`); its prefab is the `.vrm` asset.
`unity_setup_avatar(vrmPath: "Assets/…/name.vrm", name)` instantiates it and adds `MiraAvatar`. VRM
expressions (aa, blink) drive the face.

## Motion

`unity_apply_motion(target, generationId | clipPath, label, loop)`: the clip of an animation generation
is baked on its own skeleton into muscle curves and becomes the default state of the target's controller.
Any humanoid takes it — a VRM, a Mixamo character, another Mira rig. A generic (non-humanoid) target only
plays clips of the same skeleton.

## Voice

`generate_audio(kind: "speech", text, voiceId | bloggerId)` (quote `estimate_cost` kind `audio`,
model `speech`, chars), wait, then `unity_avatar_speak(target, generationId)`. `MiraAvatar` plays the clip on
Start and opens the mouth by the voice's loudness (VRM `aa`, or a blendshape named jawOpen / mouthOpen / A).
A model without mouth blendshapes moves its body but not its lips — say so (`mouth_shapes: 0`).

## On the phone

`unity_build_player(target: "android")` → `.apk` (install with `adb install -r`); `"ios"` → Xcode project
(signing in Xcode, run on the device). Needs the platform module; the scene must be saved.
