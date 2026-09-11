<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# HappyHorse 1.1 (`happyhorse`)

| | |
|---|---|
| seconds | 5 / 10 / 15 |
| output | 1080p |
| reference images | 4 |
| audio | yes |
| prompt cap | 5000 chars |
| extend | no |
| last frame | no |
| reference clips | no |

## When to pick it

dialogue-first with 7-language lip-sync and up to 9 character references; single-beat clips and exotic vertical ratios; briefs must stay tiny

## How it reads a prompt

MODEL: HappyHorse 1.1 (QwenCloud / Alibaba DashScope), 24 fps, 3-15 seconds, up to 1080p, with NATIVE SYNCHRONISED AUDIO on every clip - speech, sound effects and music are generated with the picture, so sound is a required layer of the prompt, never an afterthought. OFFICIAL FORMULA (QwenCloud prompt guide): Entity (description) + Scene (description) + Motion (description) + Aesthetic control + Stylization, then the sound layer. Entity = the subject with its concrete appearance details. Scene = the environment, background and foreground. Motion = what actually moves, with its AMPLITUDE, SPEED and EFFECT named ('swaying gently', 'turning slowly', 'tipping open a few centimetres'). Aesthetic control = light source, lighting quality, shot size, camera angle, lens and camera movement. Stylization = the visual look. DOCUMENTED LAYOUT: the platform's own gold prompts OPEN with a short comma-separated aesthetic-control header and only then start the prose - 'Low angle, medium shot, daylight from a large window, soft side lighting, warm tones, center composition.' Always write that header as the first sentence, then the entity-and-scene paragraph, then the motion, then the audio sentence last. SOUND SUB-FORMULAS (official): Voice = the exact line + emotion + tone + speed + timbre + accent. Sound effect = source material + action + ambient sound. Background music = score + style. Put spoken lines in DOUBLE QUOTATION MARKS - that is the documented form for this family, and every official example uses it - and attach the delivery to the line, e.g. 'she says, "we made it lighter this year," in a warm, unhurried voice with a soft British accent'. Keep any line to one short sentence that fits inside the clip. Close with a single audio sentence covering ambience, one or two concrete effects synchronised to a visible action, and the music mood. TIMELINE: HappyHorse documents NO shot-number or timecode syntax, so never write bracketed timestamps, 'Shot 1', or second ranges into the prompt - they get read as on-screen text or confuse the pacing. Write ONE unbroken take and order the beats with plain sequencing words ('first', 'then', 'and finally'), giving each beat its own concrete movement so the described action still fills the exact clip length in the CLIP SPEC. IMAGE-TO-VIDEO: when a start frame is attached the picture already fixes entity, scene and style, so the official image-to-video formula is only Motion + Camera movement. Do NOT re-describe the subject, the wardrobe or the set - describe what moves, how fast, and how the camera travels ('fixed camera' if it should not move at all), plus the audio layer. REFERENCE PHOTOS: when SEVERAL photos are attached they reach HappyHorse natively as numbered reference images (reference-to-video), NOT as a start frame. The official form binds each with bracketed numbers and a concrete noun - 'the woman in a red qipao from [Image 1]'. Bind every reference to a named subject or scene element, keep its identity exactly as photographed (same face, shape, colours and labels), and describe the full scene yourself - unlike image-to-video, references do not fix the composition, so the aesthetic-control header and the audio layer are still required. CAMERA: name one deliberate move with real vocabulary and a pacing word - slow push-in, smooth dolly left, steady tracking shot, gentle handheld follow, crane up, slow orbit. GOLD EXAMPLE (verbatim, QwenCloud official docs): 'Moonlight, soft lighting, side lighting, medium close-up shot, center composition. Inside a cozy children's bedroom, pale silver moonlight streams through the window, casting gentle shadows across the wooden floor. A young girl, around 6 years old, sits curled up against a fluffy pillow, wearing a pastel pink pyjama set with tiny star patterns. She tightly embraces an oversized brown teddy bear, her small face buried momentarily in its soft fur before she pulls back slightly to whisper with innocent tenderness: "Don't be afraid, I'll protect you." The camera holds steady at eye level, capturing the delicate movement of her lips. Faint ambient sounds of a creaking house and distant crickets fill the silence, while a soft wind rustles the sheer curtains near the window.' LENGTH: one paragraph of roughly 90-170 words, hard-capped at 5000 characters. Write only positive description - state what IS in frame; never phrase an exclusion as 'no ...' or 'without ...', because naming the unwanted thing tends to summon it. Do not ask for on-screen captions or subtitles, and do not write resolution or duration codes into the prompt - those are separate parameters.

## Doctrine

QwenCloud: native audio on every clip, 15s, mid-priced; refs bound as '[Image N]'. Open the prompt with a short comma-separated aesthetic-control header (angle, shot size, light, tones, composition), then Entity+Scene+Motion, sound sentence LAST; plain 'first/then' sequencing and NEVER timecodes. A single photo fixes the framing over the requested ratio. ~2x seedance.

## Format law the critic applies

HappyHorse format law: 30-55 words TOTAL across all values; one beat; subject first; [Image N] with the object named; audio explicitly stated; dialogue short and quoted with its language; no negation field - positive phrasing only.
