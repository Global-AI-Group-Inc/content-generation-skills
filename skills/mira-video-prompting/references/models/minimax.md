<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# MiniMax H3 (Hailuo 3.0) (`minimax`)

| | |
|---|---|
| seconds | 5 / 10 / 15 |
| output | 1080p |
| reference images | 4 |
| audio | yes |
| prompt cap | 7000 chars |
| extend | no |
| last frame | yes |
| reference clips | up to 3, 15 s each |

## When to pick it

the purpose model for SPEECH plus legible/Cyrillic in-frame text - the only one holding both; millisecond-precise shot timing; 4-15s; NOT a general default

## How it reads a prompt

MODEL: MiniMax H3 (MiniMax). Documented strengths: native STEREO AUDIO in which voice, sound effects and music are modelled jointly with the picture (not dubbed on afterwards); accurate on-screen TEXT and brand rendering; native multi-shot in a single clip; up to 15 seconds at 2K. It is the only model in this line-up that combines legible in-frame text WITH synchronised speech, so route packaging copy, price tags and spoken lines here.

OUTPUT FORMAT IS NOT FREE PROSE. MiniMax documents three mandatory fields and the model was trained on them. Emit exactly these three labels, each on its own line, in this order, and nothing else:
integrated_multimodal_description: ...
overall_soundscape: ...
non_diegetic_music: ...

integrated_multimodal_description carries the whole picture: subjects, actions, environment, camera work and any spoken lines. Open the first shot with the label [Shot 1] and NO timestamp. Every later shot starts with its own label and cut time, e.g. "[Shot 2] At 00:03.500, the camera cuts to ..."; the documented cut wordings are "the camera cuts to", "the shot cuts to", "the shot transitions to", "the shot changes to", "the shot switches to". Keep at most three shots in a 15-second clip and at most two below 10 seconds.

REFERENCE MODE (when several photos are attached): the photos reach H3 as reference images labelled <Picture 1>, <Picture 2> in upload order - NOT as a start frame, so describe the full scene yourself, including the opening composition. Inside integrated_multimodal_description state what each picture contributes at its first appearance ('the woman from <Picture 1>', 'the cream jar from <Picture 2>') and say the subject is fully referenced - same face, shape, colours and labels throughout. The three-label output format does not change in reference mode.

CAMERA: write motion type + amplitude + speed, e.g. "The camera pushes in with small amplitude at slow speed toward the jar in her hands." Motion types: Zoom In/Out, Push In/Out, Pan Left/Right, Truck Left/Right, Tilt Up/Down, Pedestal Up/Down, Arc Shot, Tracking Shot, Static Shot, Shake Slightly/Strongly, POV, Roll Clockwise/Counterclockwise. Amplitude is "with small amplitude" or "with large amplitude"; speed is "at slow speed" or "at fast speed". Give every shot exactly one camera move.

DIALOGUE: give each speaker a stable id (S1), (S2) — or (S1,S2) when they speak together — and wrap the words in the documented tag, e.g. "The young woman with a warm, unhurried voice (S1) says: <d>[English] I get off at the next station.</d>" For narration off camera add "in an off-screen voiceover" and state that the lips stay closed. Keep a spoken line short enough to fit the clip in one breath. If a line carries over a cut, mark <scenetrans> at both connecting points and say it "continues seamlessly across the cut"; if the clip ends mid-word, mark <cutoff>.

ON-SCREEN TEXT: put the exact wording in double quotation marks and keep the user's own language and punctuation, e.g. A label reading "СКИДКА 30%" on the front of the jar. H3 renders this reliably — do not paraphrase it and do not translate it.

overall_soundscape: 1-4 sentences on ambient sound, the noises the visible actions make, and non-verbal human sound (breath, footsteps, fabric, rain). It must NOT contain dialogue, singing or music the characters can hear. Write "N/A" only when the user explicitly asked for silence.

non_diegetic_music: 1-3 sentences on the score the characters cannot hear. Name instrumentation, tempo, rhythm and dynamics rather than an abstract mood. Write "N/A" when there is no score.

Tie every sound to something visible on screen instead of asking for generic cinematic audio. Phrase everything positively — describe what IS in the frame, never what should be absent. Do not add a watermark, a logo overlay or subtitles. REFERENCE ROLES (official full-reference guide): give every attached reference exactly ONE explicit role - <Picture N> anchors a concrete frame or composition, <Subject N> carries a reusable visual identity (a person or product that must stay consistent). Do not mix roles for one asset. The prompt may run up to 7000 characters, so never sacrifice the three labelled fields to save space.

## Doctrine

MiniMax H3 - a PURPOSE model, never a default: take it when the clip needs speech on camera, Cyrillic, or reliably legible in-frame text - it is the only model that holds all three; up to 15s. OUTPUT IS NOT FREE PROSE - exactly three labelled fields, each on its own line, nothing else: integrated_multimodal_description: / overall_soundscape: / non_diegetic_music:. Shots open '[Shot 1]' with no timestamp, later '[Shot N] At 00:03.500, the camera cuts to ...'. Refs: <Picture N> anchors a frame, <Subject N> carries a reusable identity - one role per reference. Dialogue: speaker id (S1) + <d>[English] line</d>. Up to 7000 characters. ~1.25x seedance.

## Format law the critic applies

FORMAT CHECK: the model expects exactly three labelled fields, each on its own line and nothing else: integrated_multimodal_description: / overall_soundscape: / non_diegetic_music:. The first shot opens '[Shot 1]' with no timestamp; later shots '[Shot N] At 00:0X.000, the camera cuts to ...'.

## Video references

Attached clips reach MiniMax H3 as reference videos in upload order; refer to them in prose as 'reference video 1', 'reference video 2'. Say what each one lends - 'follow the motion in reference video 1', 'match the camera work and cutting of reference video 2', 'take the sound design of reference video 1' - and what must stay from the photos instead. Clips are 2-15 s each and 15 s in total. When a clip is a 3D blockout or playblast (blockout geometry with mannequin, capsule or 3D-model figures in any colours), treat it as a rough guide: bind it to the camera path, the framing and roughly where the characters stand and move, and say that the figures in the clip, whatever they look like, are only stand-ins whose poses and gestures are NOT copied beat for beat - 'the characters do not repeat the movements of the figures in the clip; they look and act as described, in the chosen style, with natural weight and follow-through'. The style comes from the prompt, not from the clip: live action, anime, cartoon or 3D animation alike. Do not ask for 'the framing at each moment' or 'the position of every character', and do not time the actions to the dummies' movements: that makes the model repeat the blockout frame by frame. The blockout's surfaces and simple shapes are placeholders too: flat colours, faceted or noisy surfaces and flat primitive parts become the real materials and forms the prompt describes - say so, and do not claim the blockout has no textures without checking. Copy the figures' motion only when the user wants that exact choreography.
