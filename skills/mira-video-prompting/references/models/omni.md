<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Google Gemini Omni Flash (`omni`)

| | |
|---|---|
| seconds | model-chosen 3-10s |
| output | provider default |
| reference images | 4 |
| audio | yes |
| prompt cap | 10000 chars |
| extend | yes |
| last frame | no |
| reference clips | up to 3, 3 s each |

## When to pick it

self-directing storyteller and the only model that can EDIT an existing clip: multi-shots by default, renders on-frame text well, chooses its own 3-10s length (you cannot pin the duration)

## How it reads a prompt

MODEL: Gemini Omni Flash (Google Interactions API) - an all-in-one generator with NATIVE AUDIO on every clip; it renders 3-10 seconds and picks the exact length itself, so never request a duration in seconds. MULTI-SHOT IS ITS DEFAULT: left undirected, the model cuts the clip into several shots on its own. For one continuous take say so explicitly - 'Continuous, unbroken handheld shot', 'a single unbroken scene, no scene cuts'. When cuts ARE wanted, timecoded blocks are officially supported and precise: '[0-3s] A person walks to the window. [3-6s] They stop and turn around.' Natural-language timing also works ('After 3 seconds, a woman enters the scene', 'At 5s the chorus starts'). STRUCTURE: describe the scene as a director briefs a cinematographer - subject with concrete appearance details, action with amplitude and speed, environment, light, and ONE deliberate camera move per shot with a pacing word. REFERENCE TAGS (official syntax): the attached start frame is <FIRST_FRAME>; reference photos are <IMAGE_REF_0>, <IMAGE_REF_1>, ... - NUMBERING STARTS AT 0 and follows attachment order. Weave the tags into the prose: 'in the style of <IMAGE_REF_0> a woman <IMAGE_REF_1> is walking'. Every attached photo must be tagged at least once or it may be ignored. AUDIO: the model always lays a track; direct it explicitly - 'Sound design: gentle breeze, distant bird chirps', 'Include calm background music', dialogue in double quotes with delivery attached. NEGATIVES: unlike most models here, short inline negatives are the documented control - 'No dialogue.', 'No embellishments.', 'No extra sound effects.' Use them for audio and text; keep visual description positive. ON-SCREEN TEXT is a strength of this model: give the exact words in double quotes and describe their animation if wanted. LENGTH: one to two short paragraphs, or timecoded blocks when using cuts.

## Doctrine

Gemini Omni Flash - current text-to-video arena leader with native audio; picks its own length (3-10s, plan ~8) so never promise exact seconds; no square. MULTI-SHOT BY DEFAULT: for one take write 'a single unbroken scene, no scene cuts'; control cuts with timecode blocks '[0-3s] ...'. References via official tags numbered from ZERO in attachment order - <FIRST_FRAME>, <IMAGE_REF_0>, <IMAGE_REF_1> - and every attached photo must be tagged or it may be ignored. Short inline negatives are allowed ('No dialogue.'). Good at short on-screen text given in double quotes. ~2.5x seedance.

## Format law the critic applies

FORMAT CHECK: no duration codes - the model picks its own length. For one continuous take state 'a single unbroken scene, no scene cuts'. Attached photos are <FIRST_FRAME> / <IMAGE_REF_0>, <IMAGE_REF_1>, ... (numbering from 0) and each tag must appear in the prompt.

## Video references

Attached clips reach Omni Flash as tagged reference videos: <VIDEO_REF_0>, <VIDEO_REF_1>, ... in attachment order - numbering starts at ZERO, separately from <IMAGE_REF_N>. Reference every tag at least once and say what it lends - 'the person in <IMAGE_REF_0> moves like the dancer in <VIDEO_REF_0>'. Clips are trimmed to 3 s each; Omni takes motion and style from them, not identity. When a clip is a 3D blockout or playblast (blockout geometry with mannequin, capsule or 3D-model figures in any colours), treat it as a rough guide: bind it to the camera path, the framing and roughly where the characters stand and move, and say that the figures in the clip, whatever they look like, are only stand-ins whose poses and gestures are NOT copied beat for beat - 'the characters do not repeat the movements of the figures in the clip; they look and act as described, in the chosen style, with natural weight and follow-through'. The style comes from the prompt, not from the clip: live action, anime, cartoon or 3D animation alike. Do not ask for 'the framing at each moment' or 'the position of every character', and do not time the actions to the dummies' movements: that makes the model repeat the blockout frame by frame. The blockout's surfaces and simple shapes are placeholders too: flat colours, faceted or noisy surfaces and flat primitive parts become the real materials and forms the prompt describes - say so, and do not claim the blockout has no textures without checking. Copy the figures' motion only when the user wants that exact choreography.
