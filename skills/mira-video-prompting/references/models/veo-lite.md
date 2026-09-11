<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Google Veo 3.1 Lite (`veo-lite`)

| | |
|---|---|
| seconds | 8 |
| output | 1080p |
| reference images | 3 |
| audio | yes |
| prompt cap | 3000 chars |
| extend | no |
| last frame | no |
| reference clips | no |

## When to pick it

the cheap Veo: same 8s audio clips at a fraction of the price, but NO reference images - drafts, b-roll, volume runs

## How it reads a prompt

MODEL: Veo 3.1 Lite (Google) - the budget tier of the Veo family: same native synchronised audio and prompt formula, noticeably simpler rendering, 720p ONLY and no negative-prompt field, so every exclusion must be phrased positively inside the prompt. Prefer one subject and one clear action - Lite degrades faster than Fast on busy scenes. Its differentiator is NATIVE SYNCHRONISED AUDIO plus strong cinematic realism and physics, so always design sound as a real scene layer rather than a 'with sound' afterthought - undefined audio makes Veo rush delivery, mismatch ambience, or paste distracting captions. GOOGLE'S DOCUMENTED FORMULA: cinematography + subject + action + context + style and ambiance. Front-load the shot type and camera work. DIALOGUE: introduce speech with a COLON and NO quotation marks - 'the man in the red hat says: Where is the rabbit?' is Google's own documented form, and it also avoids the burned-in captions that quotation marks tend to trigger. Put the spoken line early. Always add a vocal-tone cue plus a voice and accent descriptor, because Veo drifts accents between clips, and keep dialogue to ONE short sentence - a single natural breath is all that fits a 4-8 second clip. AUDIO: Google documents that audio should be described in SEPARATE SENTENCES from the visuals. Label them - 'SFX: the cap clicks shut.' and 'Ambient noise: quiet cafe murmur.' - plus a brief music mood. CAMERA: one clear move (slow push-in, dolly, tracking, crane, pan). Keep faces and motion natural and physically believable. Veo is weak at multi-subject coordination, so keep to one or two subjects. STORYBOARD FOR VEO: Veo officially supports timestamped storyboards, so ALWAYS write an explicit timeline in Google's bracket form - '[00:00-00:03] ... [00:03-00:06] ... [00:06-00:08] ...'. Cover the exact clip length given in the CLIP SPEC with no gap and no overrun: a 4-second clip gets two segments, 6 seconds gets two or three, 8 seconds gets three. Give every segment its own visual beat AND its own audio line, and keep one continuous camera move running across the segments so the clip still reads as a single unbroken take rather than a set of cuts. NEVER write the words 'no' or 'don't' anywhere in the prompt: Google documents that instructive negation is unreliable and that exclusions belong in the separate negative field as plain nouns. If the clip should be silent, fill the audio positively with ambience and music only and describe the subject as alone with lips closed. Do NOT add resolution jargon codes - those are set separately. GOLD EXAMPLES (verbatim, Google official docs): 'A medium shot in a dimly lit interrogation room. The seasoned detective says: Your story has holes. The nervous informant, sweating under a single bare bulb, replies: I'm telling you everything I know. The only other sounds are the slow, rhythmic ticking of a wall clock and the faint sound of rain against the window' | 'Medium shot, a tired corporate worker, rubbing his temples in exhaustion, in front of a bulky 1980s computer in a cluttered office late at night. The scene is lit by the harsh fluorescent overhead lights and the green glow of the monochrome monitor. Retro aesthetic, shot as if on 1980s color film, slightly grainy.' | 'A montage of pizza making: a chef tossing and flattening the floury dough, ladling rich red tomato sauce in a spiral, sprinkling mozzarella cheese and pepperoni, and a final shot of the bubbling golden-brown pizza, upbeat electronic music with a rhythmical beat is playing, high energy professional video.' Keep the final prompt to 4-6 vivid sentences plus the timestamp segments, and well under 1024 tokens. REFERENCE PHOTOS: when SEVERAL photos are attached they reach Veo natively as asset reference images that preserve each subject's appearance - NOT as a start frame, so describe the opening composition yourself. Name each photographed subject descriptively ('the red sneaker', 'the dark-haired woman') and keep its identity unchanged for the whole clip. References force the clip to exactly 8 seconds. A SINGLE photo still arrives as the literal opening frame - then describe only how it comes alive.

## Doctrine

The budget Veo: same audio and prompt formula, simpler rendering - drafts and volume when sound matters more than polish. Costs about as little as seedance.

## Format law the critic applies

FORMAT CHECK: introduce dialogue with a colon and NO quotation marks ('she says: ...'), audio as its own short sentences (SFX: ... / Ambient noise: ...). Zero negation words in the visual description.
