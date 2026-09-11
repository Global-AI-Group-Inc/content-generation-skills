<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# Runway Gen-4.5 (`runway`)

| | |
|---|---|
| seconds | 5 / 10 |
| output | provider default |
| reference images | 4 |
| audio | no |
| prompt cap | 1000 chars |
| extend | no |
| last frame | no |
| reference clips | no |

## When to pick it

Gen-4.5, text-to-video AND image-to-video: the sequencing specialist - executes several ordered camera moves and timed beats inside ONE prompt, and takes forceful camera work (sweeping arcs, crash zooms, whip pans) the others smear; weak on fine motor detail; NO audio; 720p; 5/10s

## How it reads a prompt

MODEL: Runway Gen-4.5. It handles BOTH text-to-video (no start frame) and image-to-video, and Runway's guides are now written for this model. WITH A START FRAME the frame already fixes subject, composition, colors and style, so the prompt describes ONLY motion and refers to the subject generically ('the subject', 'she', 'the bottle') - re-describing the picture reduces motion and destabilises the shot; describe visuals in that mode only to introduce an element absent from the frame, to specify a transformation, or to define an interaction between two elements. WITHOUT a start frame describe BOTH the visual scene (subject, setting, lighting, mood, lens) AND its motion, still leading with motion. Official template: 'The camera <motion description> as <the subject> <one concrete action>. <Additional descriptions>'. Motion slots: subject action, environmental motion, camera motion, motion style and timing, direction and speed. SEQUENCES ARE OFFICIALLY SUPPORTED on Gen-4.5 and are its strength - it executes complex, sequenced instructions, multiple camera moves and precise event timing inside ONE generation. Order the beats either in natural language ('X happens, then Y happens. Finally Z happens.') or with rough timestamps ('[00:01] X. [00:03] Y. [00:05] Z.'). Match the number of beats to the CLIP SPEC duration: two beats for a 5-second clip, three to four for a 10-second clip. Dynamic, forceful camera work is allowed and documented - sweeping arcs, crash zooms, whip pans, handheld shake - so pick the energy the idea actually needs instead of defaulting to slow. Name each camera move precisely ('dolly in', 'push in', 'truck left', 'pan', 'tilt', 'crane up', 'orbit around', 'tracking shot', 'whip pan', 'handheld') and pair it with speed ('slowly', 'rapidly', 'steadily'); prefer these over the ambiguous 'zoom'. CRITICAL - the final prompt must contain ZERO negation words (no, not, avoid, without, never, don't). Runway documents that negative phrasing 'may produce unpredictable or even opposite results'. Express every constraint POSITIVELY and NAME WHAT STAYS STILL: write 'Locked camera. The camera remains still.' rather than 'no camera movement'; write 'the label stays flat, sharp and rigid' rather than 'the text does not warp'; write 'sharp focus, high detail' rather than 'not blurry'. Keep hands calm and any readable text (labels, screens, packaging copy) flat, rigid and still while the camera carries the motion, and let hair, fabric, steam, liquid, light and reflections do the secondary motion - fine-motor beats (sipping, spraying, typing, finger gestures) remain the weakest spot of this family. Give no conflicting instructions ('dramatic shadows with soft even lighting'), no abstract or conceptual language ('embodies the essence of joy'), and no conversational requests ('can you please add...') - Runway documents all three as failure modes. GOLD EXAMPLES (verbatim from Runway's official guides, incl. Gen-4.5 - match this register: short, plain, motion-first): 'The camera slowly pushes in as the person scales the giant soda.' | 'The camera executes an aggressive, sweeping horizontal arc around the subject, followed by an extremely rapid, aggressive crash zoom that concludes with a sharp focus on the subject's eyes.' | 'Handheld camera: The man stands still as the crowd moves around him. He starts yelling as the camera slowly zooms out. Natural camera shake.' | 'Whip pan to painting of a fox. Whip pan back to the woman with a curious expression. Whip pan back to the fox painting, the fox is moving.' | 'The man extends his arm to shake hands, then nods politely.' Keep the final prompt under 1000 characters - Runway's hard cap, enforced by the API. If the beats will not fit, drop scene adjectives, never a beat.

## Doctrine

Runway Gen-4.5: the SEQUENCING model - it executes several ordered camera moves and timed beats inside one prompt, and it is the one place forceful camera work belongs (sweeping arcs, crash zooms, whip pans, handheld shake). Text-to-video and image-to-video both native, so it works with or without imageRefs. Silent - no audio track at all - and 720p, which is Gen-4.5's hard ceiling. Prompt under 1000 characters, positive phrasing with ZERO negation words; order the beats in natural language or with rough timestamps. Weak spot: fine motor detail.

## Format law the critic applies

FORMAT CHECK: positive phrasing only - zero negation words (no/not/without/never); name what stays still instead. With a start frame describe MOTION only; without one describe the scene AND its motion. Order the beats in sequence, matching their number to the duration - two for 5 seconds, three or four for 10. Every camera move named precisely and paired with a speed. Under 1000 characters.
