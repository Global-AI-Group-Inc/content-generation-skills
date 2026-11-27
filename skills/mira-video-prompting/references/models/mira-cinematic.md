<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Mira Cinematic (Mira) (`mira-cinematic`)

**AI Film Studio only:** pass `filmProjectId` with this model; without it the request is refused (`model_film_only`) before any credit is spent. It is not in the general selection table on purpose. See mira-generate `references/film-studio.md`.

| | |
|---|---|
| seconds | 4-15s, any whole second |
| output | 768p by default (1344x768 at 16:9); 2K (2560x1440) with quality=hd - text and frame takes only, up to 10 s |
| reference images | 9 |
| audio | yes |
| prompt budget | 6400 chars |
| extend | forward and backward |
| draft | no |
| last frame | yes |
| reference clips | 1 control video up to 15 s: a 3D staging playblast drives layout and camera, any other clip drives motion |
| reference audio | up to 2, follows the voice or music; no binding needed |

## When to pick it

Mira's own model, AI Film Studio only: 4-15s, native stereo audio with verbatim speech (English, Russian), legible in-frame text incl. Cyrillic, multi-shot by timecodes, 6 ratios incl. 21:9; start/end frames (end frame alone too), up to 9 reference images and 2 voice references, ONE clip - a 3D staging playblast from Blender/Unity/Unreal drives the layout and camera exactly, any other clip is a camera reference; extend forward and backward by 5 or 10 s; a 2K tier (2560x1440) for text and frame takes of up to 10 s. Pick it in Film Studio for dialogue scenes, takes with the cast, a blockout that must be followed precisely, or when the house model is wanted; not available outside a film project

## How it reads a prompt

MODEL: Mira Cinematic - Mira's own video model (MiniMax H3 open weights with Mira's accelerators, rendered on Mira's GPUs), 24 fps, 4-15 seconds, native STEREO AUDIO in which voice, sound effects and music are modelled jointly with the picture; legible in-frame TEXT, Cyrillic included; native multi-shot in a single clip; ratios 16:9 / 9:16 / 1:1 / 21:9 / 4:3 / 3:4. AI Film Studio only.

OUTPUT FORMAT IS NOT FREE PROSE. The model was trained on three mandatory fields. Emit exactly these three labels, each on its own line, in this order, and nothing else:
integrated_multimodal_description: ...
overall_soundscape: ...
non_diegetic_music: ...

integrated_multimodal_description carries the whole picture: subjects, actions, environment, camera work and any spoken lines. Open the first shot with the label [Shot 1] and NO timestamp, starting with the visual style ('Live-action, cinematic, ...'). Every later shot starts with its own label and cut time, e.g. "[Shot 2] At 00:03.500, the camera cuts to ..."; the cut wordings are "the camera cuts to", "the shot cuts to", "the shot transitions to", "the shot changes to", "the shot switches to". Keep at most three shots in a 15-second clip and at most two below 10 seconds; a cut must bring new information - otherwise move the camera.

REFERENCE MODE (several photos, or a photo with imageRole=reference, or a voice or clip reference): the output has SIX labelled sections instead of three, each label on its own line followed by its text: subject_definitions: / summary: / retention_analysis: / detailed_description: / overall_soundscape: / non_diegetic_music:. In subject_definitions define every reusable subject once from its picture - '<Subject 1> is the young woman in <Picture 1>: long dark hair, a cream coat' - a voice as '<Audio 1> is the voice-timbre reference for <Subject 1> (S1)' and a clip as '<Video 1> provides the target video's camera movement and pacing'. summary is one sentence opening with '[reference generation]'. retention_analysis gives each label one level: fully_preserved, partially_preserved or attribute_transfer, with what is kept. detailed_description is the shot list, written with the labels only. The photos are references, NOT a start frame: describe the opening composition yourself. A picture of a PLACE shows where the scene happens, never how a shot is framed: keep its architecture, furniture and light, frame every shot anew, and never write that a composition follows the picture - a wide plate copied as the frame leaves the cast tiny.

FACE SIZE: a face that is small in the frame loses its features and its likeness. Whoever speaks, and whoever the shot is about, is framed at medium close-up or closer - head and shoulders, the face at least one sixth of the frame height, eyes visible - and say so in the shot ('a medium close-up of ...'). A wide shot is for geography and for an action that needs the room: nobody speaks in it, and a wide that only shows geography holds for two seconds at most before a cut closer. A line said across a room gets the speaker's own shot, not one wide frame of both people. This is a rendering limit of the model, not a style choice, so it OUTRANKS a shot size named in the brief: when the brief puts a spoken line in a wide or medium-wide frame, keep its staging, action and words, and give the line itself to a medium close-up of the speaker - open on it, or cut to it for the line - while the wider frame, if kept, shows the geography without speech.

ONE SHOT, ONE JOB: a shot carries either speech or an action that needs the room, never both. A line stays in the speaker's medium close-up; an action that crosses the space - something thrown, an object that flies and lands, a walk across the room, a door at the far wall - gets a shot of its own, framed as wide as the action needs, with nobody speaking in it. Written into one shot the two fight: the model widens the frame to fit the action and the speaker's face is lost, whatever size the shot names. When the brief puts a line and such an action in one shot, split it along its own order of events - the line at medium close-up (the object may enter or leave that frame), then a cut to the action - and keep every word, every event and the total length. A part shorter than two seconds does not read: when the take is too short for both, the line keeps the close shot and the action is told by what enters that frame, or it belongs to the next take.

CAMERA: motion type + amplitude + speed inside the action, e.g. "The camera pushes in with small amplitude at slow speed toward the jar in her hands." Motion types: Zoom In/Out, Push In/Out, Pan Left/Right, Truck Left/Right, Tilt Up/Down, Pedestal Up/Down, Arc Shot, Tracking Shot, Static Shot, Shake Slightly/Strongly, POV, Roll Clockwise/Counterclockwise. One camera move per shot.

DIALOGUE: give each speaker a stable id (S1), (S2) in order of first speech and wrap the words in the tag, e.g. "The young woman (S1) says in a warm, unhurried voice <d>[English] I get off at the next station.</d>" - the language tag names the language of the line, the words stay verbatim in that language (Russian lines are spoken in Russian: <d>[Russian] ...</d>). For narration off camera write "says in an off-screen voiceover" and state that the lips stay closed. Keep a spoken line short enough to fit the clip in one breath.

ON-SCREEN TEXT: put the exact wording in double quotation marks and keep the user's own language and punctuation, e.g. A sign reading "КНИГИ" above the door. Do not paraphrase or translate it.

overall_soundscape: 1-4 sentences on ambient sound, the noises the visible actions make and non-verbal human sound. No dialogue, no music the characters can hear. "N/A" only when the user asked for silence.

non_diegetic_music: 1-3 sentences on the score the characters cannot hear - instrumentation, tempo, dynamics. "N/A" when there is no score.

With a STAGING CLIP (a playblast of the user's 3D scene) the camera path, the framing and where everyone stands come from the clip exactly and the look frame fixes how the world looks: describe the finished world - real people, materials, light, weather, sound - and what happens, and do not mention the clip or its grey shapes. Tie every sound to something visible on screen. Phrase everything positively - describe what IS in the frame. Do not add a watermark, a logo overlay or subtitles. The prompt may run up to 7000 characters, so never sacrifice the labelled fields to save space.

## Doctrine

Mira Cinematic: Mira's own model for AI Film Studio - 4-15 s, native stereo audio with verbatim speech, legible in-frame text incl. Cyrillic, multi-shot by timecodes, 6 ratios, start/end frames, up to 9 reference images, 2 voice references, one clip (3D staging playblast = layout and camera; any other clip = camera and pacing reference), extend by 5 or 10 s both ways, 2K tier for text and frame takes up to 10 s. OUTPUT IS NOT FREE PROSE - exactly three labelled fields, each on its own line: integrated_multimodal_description: / overall_soundscape: / non_diegetic_music:. Shots open '[Shot 1]' with no timestamp, later '[Shot N] At 00:03.500, the camera cuts to ...'. With references the format has six sections (subject_definitions, summary, retention_analysis, detailed_description, overall_soundscape, non_diegetic_music) and subjects are bound as <Subject N> from <Picture N>. Dialogue: speaker id (S1) + <d>[English] line</d>. Up to 7000 characters.

## Format law the critic applies

FORMAT CHECK: the model expects labelled fields, each on its own line and nothing else: integrated_multimodal_description: / overall_soundscape: / non_diegetic_music: (with references: subject_definitions: / summary: / retention_analysis: / detailed_description: / overall_soundscape: / non_diegetic_music:). The first shot opens '[Shot 1]' with no timestamp; later shots '[Shot N] At 00:0X.000, the camera cuts to ...'. Dialogue sits in <d>[Language] ...</d> after a speaker id (S1). FRAMING CHECK: a speaker is never smaller than a medium close-up, whatever size the brief named - if a line sits in a wide or medium-wide shot, give the speaker a closer shot; no shot holds both a line and an action that needs the room - split it into the speaker's close shot and the action's own shot; no shot repeats the composition of a location picture.

## Video references

One attached clip reaches Mira Cinematic. A staging playblast from the user's 3D scene is a control clip, never a numbered reference: it fixes the camera path, the framing and where everyone stands, and the look frame fixes how the world looks - the prompt describes the finished world (real people, materials, light, weather, sound) and what happens, and does not mention the clip or its shapes. Any other clip is <Video 1>, a reference video: define it once - '<Video 1> provides the target video's camera movement and pacing' - and cite it where the move takes effect ('The camera follows <Video 1>'); its people, place and product do not carry over. Clips are 2-15 s.
