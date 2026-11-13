<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Google Gemini Omni 1.2 Flash (`omni`)

| | |
|---|---|
| seconds | 3-15s, any whole second (3-10s with a first and a last frame) |
| output | 720p by default; 360p with quality=sd; 1080p with quality=hd; 4K with quality=uhd |
| reference images | 6 |
| audio | yes |
| prompt budget | 3000 chars |
| extend | forward |
| draft | no |
| last frame | yes |
| reference clips | no |
| reference audio | no |

## When to pick it

self-directing storyteller and the only model that can EDIT an existing clip: multi-shots by default, renders on-frame text well, 3-15s at the length you pass (any whole second; 3-10s with a first and a last frame); 720p, plus a cheap 360p tier for quick tries and 1080p / 4K tiers; up to 6 photo refs and first/last frame anchors, but NO clip input at all - its video port is closed on our key

## How it reads a prompt

MODEL: Gemini Omni 1.2 Flash (Google Interactions API) - an all-in-one generator with NATIVE AUDIO on every clip; it renders 3-15 seconds at the exact length the platform sets as an API field (the CLIP SPEC duration; 3-10 seconds when both a first and a last frame are attached, and per extension turn), so never write a duration in seconds into the prompt - tile the timeline to that length. MULTI-SHOT IS ITS DEFAULT: left undirected, the model cuts the clip into several shots on its own. For one continuous take say so explicitly - 'Continuous, unbroken handheld shot', 'a single unbroken scene, no scene cuts'. When cuts ARE wanted, timecoded blocks are officially supported and precise: '[0-3s] A person walks to the window. [3-6s] They stop and turn around.' Natural-language timing also works ('After 3 seconds, a woman enters the scene', 'At 5s the chorus starts'). STRUCTURE: describe the scene as a director briefs a cinematographer - subject with concrete appearance details, action with amplitude and speed, environment, light, and ONE deliberate camera move per shot with a pacing word. REFERENCES IN PLAIN WORDS: Omni 1.2 deprecated control tags, so the prompt carries none - no angle-bracket tags of any kind. The attached photos are photo 1, photo 2, ... in attachment order, COUNTING FROM ONE. Name each photo in the prose by its number and its role: 'the woman from photo 1 walks into the cafe from photo 2', 'the bottle in photo 3 stands on the counter'. When a first and a last frame are attached, say 'start exactly on photo 1 and land exactly on the last photo'. Up to 6 photos, at most 3 per character for up to 2 characters. Every attached photo must be named at least once or it may be ignored. AUDIO: the model always lays a track; direct it explicitly - 'Sound design: gentle breeze, distant bird chirps', 'Include calm background music', dialogue in double quotes with delivery attached. NEGATIVES: unlike most models here, short inline negatives are the documented control - 'No dialogue.', 'No embellishments.', 'No extra sound effects.' Use them for audio and text; keep visual description positive. ON-SCREEN TEXT is a strength of this model: give the exact words in double quotes and describe their animation if wanted. LENGTH: one to two short paragraphs, or timecoded blocks when using cuts.

## Doctrine

Gemini Omni 1.2 Flash - current text-to-video arena leader with native audio; 3-15s at the length you pass (any whole second; 3-10s with a first and a last frame); no square. MULTI-SHOT BY DEFAULT: for one take write 'a single unbroken scene, no scene cuts'; control cuts with timecode blocks '[0-3s] ...'. References in plain words - photo 1, photo 2, ... counting from ONE in attachment order, never control tags (deprecated in 1.2) - and every attached photo must be named or it may be ignored. Short inline negatives are allowed ('No dialogue.'). Good at short on-screen text given in double quotes. ~0.3x seedance-2-5 per second.

## Format law the critic applies

FORMAT CHECK: no duration codes in the text - the length is an API field. For one continuous take state 'a single unbroken scene, no scene cuts'. Attached photos are named in plain words - photo 1, photo 2, ... (counting from 1) - and each must appear in the prompt; no angle-bracket control tags.

## Video references

When a clip is a 3D blockout or playblast (blockout geometry with mannequin, capsule or 3D-model figures in any colours), treat it as a rough guide: bind it to the camera path, the framing and roughly where the characters stand and move, and say that the figures in the clip, whatever they look like, are only stand-ins whose poses and gestures are NOT copied beat for beat - 'the characters do not repeat the movements of the figures in the clip; they look and act as described, in the chosen style, with natural weight and follow-through'. The style comes from the prompt, not from the clip: live action, anime, cartoon or 3D animation alike. Do not ask for 'the framing at each moment' or 'the position of every character', and do not time the actions to the dummies' movements: that makes the model repeat the blockout frame by frame. The blockout's surfaces and simple shapes are placeholders too: flat colours, faceted or noisy surfaces and flat primitive parts become the real materials and forms the prompt describes - say so, and do not claim the blockout has no textures without checking. Copy the figures' motion only when the user wants that exact choreography. The clip is a staging guide (2026-09-15): handled objects and the characters' business with them (the ball, the drink, the phone), gestures, faces, outfits, crowd, plants, props, materials and textures are absent from it on purpose - the prompt writes all of them with their physics (approach, contact, transfer of force, recovery) at real-time speed.
