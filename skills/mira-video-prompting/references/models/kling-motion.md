<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->

# kling-motion (`kling-motion`)

| | |
|---|---|
| seconds | 5 / 10 / 15 / 30 |
| output | 1080p |
| reference images | 1 |
| audio | yes |
| prompt cap | 2500 chars |
| extend | no |
| last frame | no |
| reference clips | exactly 1 driving clip, 3-30 s (required); output length = clip length |

## When to pick it

motion transfer: ONE photo of a character + ONE driving video (3-30 s, one person, single take) - the character in the photo performs the motion of the video; output length = video length; 1080p; keeps the clip's original sound. The only model that copies choreography exactly. Needs both inputs - refuse without a video

## How it reads a prompt

MODEL: Kling 3.0 Motion Control (Kuaishou). Input is ONE photo of a character (upper body or full body, head visible, not too small in frame, aspect 1:2.5-2.5:1) and ONE driving video of a person performing the motion (3-30 s, single continuous take, one person, no cuts or camera moves). The character in the photo repeats the motion of the video; the prompt only adds or adjusts what the pair leaves open - wardrobe, background, mood, small props - and may carry negatives. Output length equals the usable motion length of the video. Do not describe the motion itself or a camera move: both come from the video.

## Doctrine

MOTION TRANSFER: when the user wants THIS character to do THAT movement - a dance trend, a presenter's gesture, a mascot copying a person. Needs exactly one photo and one driving clip; the prompt only dresses the scene. Output length follows the clip (3-30 s); ~1.25x seedance per second.

## Format law the critic applies

FORMAT CHECK: no camera moves, no shot list, no timecodes - Motion Control renders one continuous take driven by the clip. Keep to wardrobe, setting, mood and negatives, under 2500 characters.

## Video references

The single clip is the motion reference: the character repeats its movement beat for beat. Do not describe the movement; say only what the photo and the clip leave open (wardrobe change, background, mood).
