<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Mira Cinematic (Mira) (`mira-cinematic`)

**AI Film Studio only:** pass `filmProjectId` with this model; without it the request is refused (`model_film_only`) before any credit is spent. It is not in the general selection table on purpose. See mira-generate `references/film-studio.md`.

| | |
|---|---|
| seconds | 4-15s, any whole second |
| output | 720p by default; 1080p with quality=hd |
| reference images | 5 |
| audio | yes |
| prompt budget | 1300 chars |
| extend | forward and backward |
| draft | no |
| last frame | yes |
| reference clips | 1 control video up to 30 s: a 3D staging playblast drives layout and camera, any other clip drives motion |
| reference audio | up to 2, follows the voice or music; no binding needed |

## When to pick it

Mira's own model, AI Film Studio only: 4-15s, 720p or 1080p, native audio, 6 ratios incl. 21:9; start/end frames, up to 5 reference images (4 people or objects + 1 location) and 2 voice references bound to Image 1/Image 2, ONE control video - a 3D staging playblast from Blender/Unity/Unreal drives the layout and camera exactly, any other clip drives the motion; extend forward and backward. Pick it in Film Studio when a blockout must be followed precisely or when the house model is wanted; not available outside a film project

## How it reads a prompt

MODEL: Mira Cinematic - Mira's own video model (LTX-2.5 with Mira's adapters, rendered on Mira's GPUs), 24 fps, 720p or 1080p, 4-15 seconds, native synchronised audio, ratios 16:9 / 9:16 / 1:1 / 21:9 / 4:3 / 3:4. AI Film Studio only. WRITE ONE CHRONOLOGICAL PARAGRAPH of at most 200 words in the present tense, in the order things happen on screen: open with the shot (shot size, where the camera stands, the lens feel), the subject and the place; then the action beat by beat with cause before effect; name the camera move explicitly in plain film words ('the camera dollies in', 'a slow orbit to the left', 'handheld, it follows her through the door'); then light and colour in plain words; then the sound - ambience, effects tied to visible actions, music mood. ONE continuous take by default; when the story needs cuts, use two to four and open each with the words 'Hard cut to' followed by the new shot described in full - shot size, subject and place - as if it opened a new scene ('Hard cut to a close-up of her hands on the wheel, rain streaking the windscreen behind them.'); a bare 'Cut to' reads as a dissolve and leaves double exposures. Dialogue goes in double quotes with the speaker and their action before the line: 'He leans on the bar and says, "Same as always."'. REFERENCES are Image 1 ... Image 5 in upload order: bind each once to what it fixes ('the woman from Image 1', 'the bottle from Image 2'); up to four people or objects and one location. An attached voice track belongs to Image 1 (a second one to Image 2) - write that person's line in quotes. With a LAYOUT control video (a staging guide from the user's 3D scene) the camera path, framing and positions already come from the clip: describe only the finished world - real people, materials, light, weather, sound - and NEVER use the words clay, 3D, Unreal, Blender, blockout, mannequin, stand-in or playblast. With a MOTION control video the clip lends movement, camera and pacing only: describe who moves and how they look. Real-time speed unless slow motion is the point and is named once. Phrase everything positively - name what stays still instead of listing what must not happen. Keep on-screen text to a word or two.

## Doctrine

Mira Cinematic: Mira's own model for AI Film Studio - 4-15 s, 720p or 1080p, native audio, 6 ratios, start/end frames, up to 5 reference images and 2 audio references, one control video (3D staging playblast = layout and camera; any other clip = motion), extend forward and backward. Write ONE chronological paragraph under 200 words: shot, subject and place, action beats, the camera move named explicitly, light and colour, sound; one continuous take or two to four cuts, each opened with 'Hard cut to' and the new shot described in full; dialogue in double quotes after the speaker's action; references as Image N. With a staging playblast describe the finished look only - never clay, 3D, Unreal, blockout or stand-ins.

## Format law the critic applies

FORMAT CHECK: one chronological paragraph under 200 words (1300 characters), no JSON, no labels; camera move named explicitly; one take or two to four cuts, each opened with 'Hard cut to' plus the new shot in full; dialogue in double quotes; references as Image N; with a layout control video none of the words clay, 3D, Unreal, Blender, blockout, mannequin, stand-in, playblast.

## Video references

One attached clip reaches Mira Cinematic as its control video, never as a numbered reference. A staging playblast from the user's 3D scene fixes the camera path, the framing and where everyone stands - the prompt then describes only the finished world (real people, materials, light, weather, sound) and never names the clip, its figures or the words clay, 3D, Unreal, Blender, blockout, mannequin, stand-in or playblast. Any other clip lends movement, camera and pacing only - describe who moves and how they look; its people, place and product do not carry over.
