<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Kling 3.0 (`kling`)

| | |
|---|---|
| seconds | 5 / 10 / 15 |
| output | 1080p |
| reference images | 4 |
| audio | yes |
| prompt cap | 2500 chars |
| extend | no |
| last frame | yes |
| reference clips | no |

## When to pick it

best human anatomy and physics (sport, cloth, water), legible in-frame text, native audio with multi-speaker dialogue and accents; 3-15s; 1080p output

## How it reads a prompt

MODEL: Kling 3 (Kuaishou). Documented strengths: photoreal people with clean anatomy, physically believable motion (weight, momentum, cloth, hair, water), precise camera control, and - officially, unlike the other models - native-level legible in-frame text, which Kling markets specifically for e-commerce advertising. Product packaging, signage and price tags stay readable under camera motion and may be used deliberately. KLING'S OFFICIAL FORMULA, text-to-video: subject and its appearance + subject movement + scene and its description + optional camera language, lighting and atmosphere. Image-to-video is shorter: subject + movement, background + movement - the scene is already given, so do not re-describe it. NEVER issue a bare instruction such as 'put on sunglasses': Kling then reads the frame as a static picture and merely pans across it. Always bind the action to a named subject, the way Kling's own corrected example does - 'Mona Lisa puts on sunglasses with her hand, and a ray of light appears in the background'. Use simple words and simple sentence structure; Kling documents that complex language degrades output. Movement must obey physics and stay close to what the start frame plausibly allows - a description far from the image causes an unwanted cut. Kling struggles with complex physical trajectories (a bouncing ball, a thrown object) and with exact counts of objects. CAMERA: always include camera language, since a missing camera makes Kling produce static or hung clips - but give EXACTLY ONE move. If the camera should hold, anchor it with rig words ('camera locked off, static camera, tripod'). Shot vocabulary that works: macro close-up, medium shot, full body shot, low angle, high angle, aerial view, tracking, POV, bokeh, depth of field. STORYBOARD AND PACING: Kling tends to drift into dreamy slow motion, which looks wrong in an ad. The documented fix is an explicit TIMELINE, and Kling is the one model besides Veo whose own docs anchor actions to named seconds - use that form: 'at the 2nd second she lifts the jar', 'in the final 2 seconds the camera settles'. Put such a marker on EVERY beat, not just one, so the beats tile the whole clip: 'in the first 2 seconds ...', 'at the 3rd second ...', 'in the final 2 seconds ...'. Scale the markers to the clip length given in the CLIP SPEC and never exceed it. Keep everything inside ONE unbroken shot with 2-3 beats: the beats change what the SUBJECT does, while the single camera move runs continuously underneath them - a second camera move or an implied cut makes Kling break the shot. Also state real-time pacing plainly ('at natural speed') and pick energetic, concrete verbs; reserve an explicit slow cue for deliberately cinematic shots only. TEXT: name the copy the way Kling's own example does, quoting the words and stating the surface they sit on, and keep the text short and large enough to read. AUDIO: every clip now carries Kling's native synchronised soundtrack - direct it explicitly or the model invents one. Close the prompt with one audio sentence: the ambience, one or two concrete sound effects tied to visible actions, and the music mood. A short spoken line may go in double quotation marks with its delivery attached; keep it one breath long. NEGATIVES: Kling recommends folding exclusions into the positive prompt as one short trailing clause ('no camera drift, no facial warping, no flicker') rather than relying on a separate field. Do NOT add camera or resolution jargon codes - those are set separately. GOLD EXAMPLES (verbatim, Kling official docs): 'The camera remains fixed on the word "KLING" emblazoned on the baseball bat as the player swings and hits the ball.' | 'A giant panda wearing black-framed glasses is reading a book in a café, with the book placed on the table. On the table, there is also a cup of coffee emitting steam, and next to it is the café's window.' | 'The camera gradually moves around to the front of the girl, who then lifts her head and smiles warmly at the camera, as if seeing an old friend after many years.' Aim for roughly 80-130 words. MULTI-SHOT (official Kling 3.0 syntax, use ONLY when the clip genuinely needs cuts): 'shot n, m, words; shot n, m, words;' where n is the shot number (1-6), m is that shot's length in whole seconds (each >=1) and the lengths MUST sum exactly to the clip duration; each shot description stays under 512 characters and shots are separated by semicolons. A single continuous take remains the default - the multi-shot flag is enabled automatically only when this syntax is present. Full prompt stays under 2500 characters.

## Doctrine

Photoreal people, believable physics, and legible Latin in-frame text under motion (packaging copy, price tags, signage); native audio; up to 15s; ~1.25x seedance. Photos merge into ONE start frame - describe that single frame. Single continuous take by default; cuts ONLY via the official 'shot n, m, words;' syntax (1-6 shots, per-shot seconds summing exactly to the clip duration). Bind every action to a named subject, keep words simple, stay under 2500 characters.

## Format law the critic applies

FORMAT CHECK: one camera move for a single take; cuts only via the official 'shot n, m, words;' syntax with the per-shot seconds summing to the clip duration. Under 2500 characters.
