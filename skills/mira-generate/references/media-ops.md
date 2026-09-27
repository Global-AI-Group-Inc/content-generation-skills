# Clip operations

Tools that take a clip the account already has and return a new generation. Each takes exactly
one source: `sourceGenerationId` for a Mira generation (`list_generations`) or `libraryItemId`
for a file sent through `create_upload` (kind `video`, or `audio` for a track). A source over the
tool's limit is refused (`source_too_long`) before a credit is spent. Every call returns a
generation id; `wait_for_generation` brings the result. Quote with `estimate_cost` and the
source's length in `sourceSeconds`; never from memory.

Sound (voice, music, effects, dubbing, captions, stems, transcripts) is in mira-audio.

| Tool | Longest source | `estimate_cost` kind |
|---|---|---|
| `modify_video` | 15 s | `modify` |
| `reframe_video` | 15 s | `reframe` |
| `remove_background` | 30 s | `rembg` |
| `motion_control` | 30 s (`orientation: "video"`), 10 s (`"image"`) | `motion_control` |
| `recast_video` | 30 s | `recast` |
| `lipsync_video` | 60 s | `lipsync` (model `lipsync-2` or `lipsync-2-pro`) |

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
`subjectPrompt` says what to keep when the frame has several candidates. In After Effects,
`adobe_import_generation` places the matte as the clip's track matte.

```
remove_background {"sourceGenerationId": "<clip>", "subjectPrompt": "the dancer in the red jacket"}
```

## motion_control and recast_video

Two ways to put a new character into a performance:

- `motion_control`: the character in `characterImageUrl` performs the body motion of the clip.
  `orientation: "video"` keeps the clip's framing (up to 30 s), `"image"` the photo's (up to
  10 s). `keepSound` keeps the clip's sound (default true). `prompt` optionally dresses the scene.
- `recast_video`: the person in the clip is swapped for the character in `characterImageUrl`,
  while the performance, the camera and the background stay. `resolution` `480p`, `580p` or
  `720p` (default).

```
motion_control {"sourceGenerationId": "<dance clip>", "characterImageUrl": "<https image of the character>", "orientation": "video"}
recast_video {"libraryItemId": "<uploaded clip>", "characterImageUrl": "<https image of the character>"}
```

The character image is a Mira image or an upload (`upload_reference_image`). For "this character
repeats that motion" inside a fresh render, `generate_video` with `kling-motion` is the
alternative (mira-video-prompting).

## lipsync_video

The mouth of the speaker in a clip re-animated to a new track: an audio generation
(`audioGenerationId`, from `generate_audio`) or an uploaded track (`audioLibraryItemId`).
`model` `lipsync-2` (default) or `lipsync-2-pro` for close-ups. `syncMode` when the lengths
differ: `cut_off` (default), `loop`, `bounce`, `silence`, `remap`. Writing the speech and the
voice is in mira-audio.

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
