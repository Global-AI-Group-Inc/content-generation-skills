<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Kling 4.0 (`kling-4`)

| | |
|---|---|
| seconds | 5 / 10 / 15 / 30 |
| output | 720p |
| reference images | 7 |
| audio | yes |
| prompt budget | 5000 chars |
| extend | no |
| draft | no |
| last frame | yes |
| reference clips | up to 1, 10 s each |
| reference audio | no |

## When to pick it

the newest Kling: ONE continuous take of 3-30s at 720p, native audio always on, 21:9 available; best-in-line anatomy, physics and legible in-frame text; up to 7 photo refs or one reference clip, start and end frames; slightly cheaper than kling; no multi-shot and no 1080p - for those use kling

## How it reads a prompt

MODEL: Kling 4.0 (Kuaishou) - the newest Kling: photoreal people with clean anatomy, physically believable motion (weight, momentum, cloth, hair, water, collisions), precise camera control and legible in-frame text, in clips of 3-30 s at 720p with native audio ALWAYS on. Text-to-video (21:9, 16:9, 9:16 or 1:1), image-to-video from a start frame with an optional end frame, or Omni with reference photos and a reference clip. Write ONE continuous take as labelled blocks, the way Kling's own 4.0 example does: SCENE: the frame, the place, the subject and their look, the palette. CAMERA: one continuous move with where it starts and where it ends ('starts low beside the trolley, then cranes up and pulls back high above the road'). ACTION / STORY: the beats on a timeline that tiles the whole clip ('0-3s he pushes the trolley forward... 3-6s one watermelon tumbles off... 6-10s he keeps pushing as the camera rises'), each beat bound to a named subject, cause before effect. Name what must stay in frame when the camera moves (CRITICAL CONTINUITY: the runaway watermelon stays visible the whole time). AUDIO: the ambience, the sound effects tied to visible actions, the music mood, and either a spoken line as Dialogue (speaker): "line" with the speaker's action before it, or 'No speech'. LOOK: the light, the contrast, the colour and the grain in plain words, real-time speed ('everything moves at normal real-time speed, no slow motion'), correct anatomy. Use simple words and plain sentences. With a start frame, write only what moves and how the camera moves - the frame already fixes the subject, the scene and the style. No 'shot n, m' syntax: 4.0 takes no multi-shot flag. Scale the timeline to the clip length in the CLIP SPEC. Full prompt under 5000 characters.

## Doctrine

Kling 4.0: the newest Kling - photoreal people, believable physics and legible in-frame text, ONE continuous take of 3-30 s at 720p, native audio always on, 21:9 available. Up to 7 reference photos (@image_N) or one reference clip (@video_1), a start frame and an end frame. Write it as SCENE / CAMERA / ACTION with timed beats / AUDIO / LOOK. Pick it over kling for long single takes (up to 30 s), wide 21:9 and the newest model, at a slightly lower price than kling (720p against kling's 1080p). Pick kling for a cut-up multi-shot sequence or 1080p, kling-turbo for cheap drafts.

## Format law the critic applies

FORMAT CHECK: plain text in labelled blocks (SCENE, CAMERA, ACTION / STORY, AUDIO, LOOK), one continuous take with one camera move, timed beats inside the clip duration, no 'shot n, m' syntax and no JSON. Under 5000 characters.

## Video references

An attached clip reaches Kling 4.0 Omni as the feature reference video, addressed in the prompt as @video_1: it guides the motion, the camera and the pacing, never the people, the place or the product. Reference photos are @image_1, @image_2 ... in upload order (at most 4 photos next to a clip). Native audio stays on, so direct the sound as usual. When a clip is a 3D blockout or playblast (blockout geometry with mannequin, capsule or 3D-model figures in any colours), treat it as a rough guide: bind it to the camera path, the framing and roughly where the characters stand and move, and say that the figures in the clip, whatever they look like, are only stand-ins whose poses and gestures are NOT copied beat for beat - 'the characters do not repeat the movements of the figures in the clip; they look and act as described, in the chosen style, with natural weight and follow-through'. The style comes from the prompt, not from the clip: live action, anime, cartoon or 3D animation alike. Do not ask for 'the framing at each moment' or 'the position of every character', and do not time the actions to the dummies' movements: that makes the model repeat the blockout frame by frame. The blockout's surfaces and simple shapes are placeholders too: flat colours, faceted or noisy surfaces and flat primitive parts become the real materials and forms the prompt describes - say so, and do not claim the blockout has no textures without checking. Copy the figures' motion only when the user wants that exact choreography. The clip is a staging guide (2026-09-15): handled objects and the characters' business with them (the ball, the drink, the phone), gestures, faces, outfits, crowd, plants, props, materials and textures are absent from it on purpose - the prompt writes all of them with their physics (approach, contact, transfer of force, recovery) at real-time speed.
