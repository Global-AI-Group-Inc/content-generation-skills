# Clip operations

Tools that take a clip the account already has and return a new generation. Each takes exactly
one source: `sourceGenerationId` for a Mira generation (`list_generations`) or `libraryItemId`
for a clip or a track the user attached to the chat. A source over the
tool's limit is refused (`source_too_long`) before a credit is spent. Every call returns a
generation id; `wait_for_generation` brings the result. Quote with `estimate_cost` and the
source's length in `sourceSeconds`; never from memory.

Sound (voice, music, effects, captions, stems, transcripts) is in mira-audio.

| Tool | Longest source | `estimate_cost` kind |
|---|---|---|
| `modify_video` | 15 s | `modify` |
| `reframe_video` | 15 s | `reframe` |
| `remove_background` | 30 s | `rembg` |
| `swap_object` | 10 s (at least 3 s) | `swap` |
| `draw_edit_video` | 4 to 30 s | `draw_edit` (model = resolution `480p`, `720p` or `1080p`) |

## modify_video

The same framing, subjects and motion with one thing changed. `effect` is `lighting`, `weather`,
`time_of_day`, `backdrop` (the environment behind the subjects) or `restyle` (free-form).
`prompt` describes only the change, in English. `strength`: `adhere` keeps closest to the
source, `flex` (default) balances, `reimagine` allows the biggest change. `referenceImageUrl`
optionally shows the target look.

```
modify_video {"sourceGenerationId": "<clip>", "effect": "time_of_day", "prompt": "blue hour after sunset, street lamps on, wet asphalt reflecting them", "strength": "flex"}
```

## reframe_video

A new aspect ratio (`9:16`, `16:9`, `4:3`, `3:4`, `1:1`, `21:9`) with the newly exposed canvas
generated and the subject kept centred: a vertical cut of a landscape clip without letterboxing.
`prompt` optionally says what the filled areas should continue.

```
reframe_video {"sourceGenerationId": "<clip>", "aspectRatio": "9:16", "prompt": "the street continues above and below, same shopfronts"}
```

## remove_background

A clean key without a green screen. The result is the clip on black plus, in `files[]`, a luma
matte MP4 (role `matte`) and, when available, a ProRes 4444 MOV with alpha (role `alpha`).
`subjectPrompt` says what to keep when the frame has several candidates. In an editor, the matte
goes on the clip as its track matte.

```
remove_background {"sourceGenerationId": "<clip>", "subjectPrompt": "the dancer in the red jacket"}
```

## swap_object

One element of a clip replaced from photos while everything else, the sound included, stays:
`target` is `outfit`, `product`, `location` or `text`; `imageUrls` holds 1 to 4 clean photos of
the new object (uploads or Mira images); `prompt` names what to replace and with what. Any clip
works, with or without a person in it; 3 to 10 s.

```
swap_object {"sourceGenerationId": "<clip>", "target": "product", "imageUrls": ["<https photo of the new bottle>"], "prompt": "replace the energy drink can in her hand with the green glass bottle from the photo, label facing the camera"}
```

## draw_edit_video

Draw to Edit: the user marks on ONE frame of the clip WHERE to change (circles, arrows,
scribbles, short notes) and says WHAT to change; Seedance 2.5 edit changes only that area across
the whole clip and keeps people, motion, camera, timing and the clip's sound. The marks only point
at the area - they never appear in the result. Pass the marked frame as `frameImageUrl`, or the
drawing alone as `overlayImageUrl` (a transparent PNG the size of the frame) and Mira lays it over
the frame at `frameSeconds`; both must be uploaded to Mira first. You cannot draw: ask the user
for the marked frame, or describe the area in words in `prompt` on a clean frame. `prompt` starts
with a verb (replace, remove, add, change); `referenceImageUrl` optionally shows the new look;
`resolution` `480p`, `720p` (default) or `1080p`. Uploaded clips with real people may be refused by
the model (`moderation_blocked`, refunded).

```
draw_edit_video {"sourceGenerationId": "<clip>", "frameSeconds": 2.4, "frameImageUrl": "<https frame with a red circle around the cup>", "prompt": "Replace the paper cup in the circled area with a glass of orange juice"}
```

## list_effects

Ready-made presets where the prompt is already written and the user brings a photo or a clip:
cakeify, figurine, age progression, weather change, explosion and more. Pass the id as `effect`
on `generate_image` or `generate_video`; your own `prompt` becomes a short refinement appended
to the effect's text, and the effect picks its model unless you name one. `needs` says what to
attach; `options` are set through `effectOptions`. An effect is not a style and not a playbook:
use one only when the user asks for that named effect.

## marketing_brief

A plan for a short product clip, returned in the same call: a script, a shot list, a ready
English prompt for `generate_video` (references cited as `@Image1`...), a caption, hashtags and
voiceover text. `format` is `showcase`, `review`, `unboxing` or `how_to`; describe the product
with `productUrl` and/or `productName` and `productDescription`; `referenceImageUrls` (up to 4)
become the visual references; `durationSeconds` 5 to 15; `language` for the script and caption
(the prompt is always English); `platform` as a hint. Then run `generate_video` with the prompt
and the same references, and voice the text with `voiceover_video` on the finished clip
(mira-audio). Priced with `estimate_cost` kind `marketing`.
