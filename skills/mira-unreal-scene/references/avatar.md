# Avatars in Unreal

## From a Mira character

1. The character must be a humanoid with clear limbs in an A- or T-pose. Generate it with
   `generate_3d` (`model: "meshy-7"`, `rig: true`, `pose: "a-pose"`, `skill: "3d"`) or rig a finished model
   with `rig_3d` (8 credits + 5 per extra clip). Quote `estimate_cost` (kind `model3d` or `rig`) first.
   Walking and running clips come free with every rig; extra presets by id (0 Idle, 28 Wave hello, 25 Nod
   yes, 22 Funny dance, 64 Dance, 298 Cheer …).
2. `unreal_setup_avatar(generationId, name)` imports the rigged GLB as a Skeletal Mesh with its Skeleton
   and animation sequences under `/Game/Mira/Avatars/<name>`, builds an IK Rig with the humanoid
   retarget chains (spine, neck, head, arms, legs) and places a SkeletalMeshActor in the level. The answer
   lists the chains it mapped, the ones it could not and the clips.
3. Missing chains for the spine, arms or legs → the rig is not humanoid; do not force it. Say which
   chains are missing.

## From the user's skeletal mesh

A character already in the project (the UE Mannequin `SKM_Manny`/`SKM_Quinn`, a Mixamo or MetaHuman body)
goes in by its asset path instead of `generationId`. If it already has an IK Rig, it is reused. Never edit
the user's IK Rig or Skeleton assets; make copies under `/Game/Mira` when something must change.

## Motion

`unreal_apply_motion(target, generationId | animationPath, label, loop)`: the clip is retargeted from its
own skeleton onto the target through an IK Retargeter between the two IK Rigs, saved as a new Animation
Sequence in `/Game/Mira/Motions`, and set on the actor's skeletal mesh component (Animation Mode = Use
Animation Asset). Any humanoid takes it — the Mannequin, a Mixamo character, another Mira rig. For a
shot, add the retargeted sequence to the avatar's Animation track in the Level Sequence instead
(`references/sequencer.md`), so the playblast records it.

## Voice

`generate_audio(kind: "speech", text, voiceId | bloggerId)` (quote `estimate_cost` kind `audio`,
model `speech`, chars), wait, then `unreal_avatar_speak(target, generationId)`. The audio is imported as a
Sound Wave and the mouth opens by the voice's loudness through a morph target named jawOpen, mouthOpen,
JawOpen or A. A mesh without mouth morph targets moves its body but not its lips — say so (`mouth_shapes: 0`).

## On the phone

`unreal_build_player(target: "android")` → `.apk` (install with `adb install -r`); `"ios"` → a package to
sign and deploy from Xcode on a Mac. The level must be saved and set as the map to package — ask the user
to save; packaging cooks content and can take a long time on the first run.
