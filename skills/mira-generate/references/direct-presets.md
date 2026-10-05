# Direct presets ("Direct Your Video")

A Direct preset is a ready-made director: the user answers a short questionnaire instead of writing a
prompt, and the preset turns the answers, the cast, the photos and the song into ONE finished clip of up
to 30 s (several shots inside it, on Seedance 2.5). The preset writes the prompt itself. You write none.

## When to offer one

The user wants a short film, a music video, a product ad, a UGC ad, a brand film, a real-estate tour, a
micro drama, an explainer, a film trailer or a social post, and has not brought a prompt of their own.
Or they want an existing ad remade with their product (`ad-remake`). If they already wrote a prompt, or
need something no preset covers, use `generate_video` instead.

## Flow

1. `list_direct_presets` (free). It returns every preset with its questions (`fields`), the allowed
   lengths and ratios, and the price per length.
2. Ask that preset's questions in plain words, required ones first; ask optional ones only if the user
   cares. Choice fields take an option id, or the user's own words where the field is `custom`.
3. Quote the price for the chosen length and get a yes.
4. `direct_video` with `preset`, `answers` ({fieldId: answer}), and as the preset needs:
   - `characters`: each ONE of `avatarId` (a ready avatar from `list_brand_assets`), `imageUrl` or
     `description`, plus an optional role `name`;
   - `images`: `{field, url}` per photo, several photos of one field as several entries in the user's
     order (a property tour follows it);
   - `songUrl` and `songStart` (music video): the clip is cut to the song from that second and the
     song is laid over the result;
   - `duration`, `ratio`: one of the preset's values, or empty for its default.
5. `wait_for_generation` until it is done; show the URL.

Every URL must be the user's own file: `upload_reference_image` or `create_upload` (kind `audio` for a
song, `video` for an ad clip), or one of their generations from `list_generations`. Any other link is
refused before a credit is spent. A refused questionnaire (a missing answer, too few photos) costs
nothing: ask for what is missing and call again.

## Presets

| Preset | Asks for | Lengths, ratios |
|---|---|---|
| `short-film` | the story; visual style; up to 4 characters; up to 4 reference images | 15/30 s; 16:9, 9:16, 1:1 |
| `music-video` | type (narrative, performance, visualizer); the song; one performer; visual direction | 15/30 s; 9:16, 16:9, 1:1 |
| `real-estate` | 3-20 photos of the property in tour order; preferences | 15/30 s; 16:9, 9:16 |
| `product-ads` | 1-8 product photos; product name; why it is worth buying | 10/15/30 s; 9:16, 16:9, 1:1 |
| `ugc-ads` | product name and selling points; up to 8 product photos; one creator | 10/15/30 s; 9:16, 1:1 |
| `social-content` | one character; what they talk about; vibe | 10/15/30 s; 9:16, 1:1 |
| `micro-drama` | 1-4 characters; the plot; vibe (romance, thriller, comedy, horror) | 15/30 s; 9:16 |
| `brand-film` | brand name; what it stands for; how people should feel; up to 4 references | 15/30 s; 16:9, 9:16, 1:1 |
| `explainer` | what to explain; audience; style (cinematic, whiteboard, minimal, illustrated) | 15/30 s; 16:9, 9:16, 1:1 |
| `film-trailer` | the concept; genre; up to 3 characters; up to 4 references | 15/30 s; 16:9, 9:16 |
| `ad-remake` | the ad clip (`videoUrl`, 2-120 s); product photos as `images` of field `product`; at most one character; `mode` close or flex, `language`, `note`, `keepAudio` | follows the source, up to 30 s |

The live catalog from `list_direct_presets` is the source of truth for fields, options and prices.
