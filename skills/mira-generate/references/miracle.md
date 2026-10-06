# Miracle

Miracle changes anything in a clip while every move stays: put the user, a friend or an AI Blogger
in place of the people in a video, or swap an outfit, a product, the place or a sign. The camera,
the timing and the sound stay as in the original. The name stays "Miracle" in every language.

It works on clips of 3 to 30 s. A clip longer than 10 s is cut into parts of up to 10 s (at scene
cuts where it has them), each part is rendered on its own and the parts are joined back under the
original sound. A run takes about 5 to 8 minutes.

## Tools

| Tool | Credits | Use it for |
|---|---|---|
| `list_miracle_presets` | free | The motion library by `shelf`: `preset` (platform clips with fictional people, each already analysed), `community`, `hero`. |
| `miracle_analyze` | free | Reads a clip: the parts, every person with a position and a description, the objects that can be swapped, the price. Lives 24 hours. |
| `miracle` | 6 per second of the clip | The run itself, on an analysis. |
| `estimate_cost` | free | kind `miracle`, `sourceSeconds` = the clip length. |

## Two modes

- `transfer` (motion transfer): the clip's motion, camera and timing are kept; the cast, the place
  and the look are rebuilt from the references. Typical: "me and my friend doing this dance",
  "this walk, but in Shibuya at night".
- `swap`: only what is named changes - a person, an outfit, a product, the place or a sign; the
  rest of the frame stays as filmed. Typical: "replace the can in her hand with our bottle",
  "change the sign to say FRESH BREAD".

## Flow

1. Source. A preset (`presetId` from `list_miracle_presets`), a clip the account made
   (`sourceGenerationId`) or a file sent through `create_upload` (kind `video`, then
   `libraryItemId`). 3 to 30 s.
2. `miracle_analyze` with that source. Show the user what was found, in their language and in
   plain words: "1 · on the left - young man in a dark grey cardigan; 2 · on the right - ...",
   the objects, the length, the number of parts and the price. A person seen only in some parts
   is marked with those parts.
3. Ask who becomes whom and what changes. For each person: keep, a saved AI Blogger
   (`bloggerId` from `list_brand_assets`) or a photo (`photoUrl`: `upload_reference_image` or a
   Mira image). People not listed stay as they are.
4. Say the price and wait for a clear yes. Then `miracle`, and `wait_for_generation`.

```
miracle_analyze {"sourceGenerationId": "<dance clip>"}
miracle {"analysisId": "<from miracle_analyze>", "mode": "transfer",
         "cast": [{"personId": "p1", "bloggerId": "<the user's AI Blogger>"},
                  {"personId": "p2", "photoUrl": "<https photo of the friend>"}],
         "locationUrl": "<https photo of a night street>", "consent": true}
miracle {"analysisId": "<...>", "mode": "swap",
         "swaps": [{"target": "product", "objectId": "o2", "imageUrls": ["<https photo of the bottle>"]},
                   {"target": "text", "objectId": "o3", "text": "FRESH BREAD"}]}
```

## Rules

- At most 4 photos go into one part of the clip: the people visible in that part, the new place
  and the swapped objects. The analysis says which parts each person is in; a person who is not
  in a part does not count there. Over the limit is refused (`miracle_too_many_images`).
- `swaps[].target`: `outfit`, `product` or `location` with 1 to 4 `imageUrls`; `text` with the
  new lettering in `text` (up to 80 characters). `objectId` comes from the analysis; a swap
  without it applies to every part.
- `locationUrl` is for `transfer`; in `swap` the place is a swap with `target: "location"`.
- `prompt` (optional, up to 400 characters) adds a direction: light, weather, a style. On its own
  it is enough for a `transfer` run that only restyles the clip.
- `keepSound` (default true) keeps the original sound under the result.
- A photo of a real person needs `consent: true`: ask the user to confirm the person is them or
  agreed to it. Never a public figure, never a face the user has no consent for. A run with
  nothing to change is refused (`miracle_nothing_to_change`).
- An analysis expires after 24 hours (`miracle_analysis_expired`): analyse again. Analyses are
  free but limited to 30 per hour.
- Each run is one generation; failed runs return the credits in full. The result is a regular
  video generation: `extend_video`, `upscale_video`, the sound tools and `draft_mira_guide` take
  it like any other clip.

## Miracle or another tool

- One person into one 3-10 s clip, no analysis needed: `recast_video` or `blogger_motion` (mode
  `recast`) is enough.
- A blogger repeating a dance from a preset: `blogger_motion` (mode `motion`) keeps the blogger's
  framing and adds a spoken line.
- Several people, a clip up to 30 s, or a person plus a place or product at once: Miracle.
- One object in a clip up to 10 s: `swap_object` works too; Miracle does the same on longer clips
  and several objects.
