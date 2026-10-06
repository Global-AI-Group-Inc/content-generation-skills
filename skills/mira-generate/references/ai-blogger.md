# AI Blogger

An AI Blogger is the user's persistent brand character: a person, a stylised character or an
anthropomorphic animal with a fixed face, body, default look and voice that every Mira tool can
reuse. The name stays "AI Blogger" (plural "AI Bloggers") in every language; do not translate it.
Its id is `bloggerId`; `avatarId` is the older name of the same parameter and still works.

Not to be confused with `avatar_video`: that is Kling AI Avatar, a talking-portrait model
(media-ops.md). It works with a `bloggerId` too.

## Tools

| Tool | Credits | Use it for |
|---|---|---|
| `list_blogger_traits` | free | The trait catalog: sections, option ids, which sections apply to people or creatures, live prices and limits. Call once before building. |
| `create_blogger_draft` | 8 | One draft image, 3:2: portrait and full body side by side on white, about a minute. Every edit and every reroll is a new draft. |
| `save_blogger` | 45 | The draft becomes a blogger: the full set of angles, a character sheet, a live cover and a voice designed from the traits (3 previews). |
| `list_blogger_presets` | free | Driving clips for Motion by `shelf`: `preset` (platform clips, each tagged with the modes it fits), `community`, `hero`. |
| `blogger_motion` | per second | The blogger repeats a clip, takes the place of the person in it, or one object in it is swapped; optional spoken line. |
| `blogger_speak` | per character + per second | A script spoken by the blogger in its own voice (Kling AI Avatar). |
| `set_blogger_voice` | free; `auto` 3 | Pin a voice, pick one of the auto-voice previews, design fresh previews, or unpin. |
| `swap_object` | 6 per second | One element of ANY clip replaced from photos; no blogger needed. |

The prices are the ones `list_blogger_traits` reports today; quote from it, never from memory.

## Build one

1. `list_blogger_traits`. Ask what the character is for (brand host, mascot, persona), then the
   few traits the user cares about. Do not walk through 23 sections.
2. `create_blogger_draft` with `traits` as `{sectionId: [optionIds]}`:
   - `character_type`: `average` (a believable everyday person), `bold` (exaggerated, meme-ready),
     `extreme` (caricature), or a creature: `cat`, `dog`, `frog`, `bird`, `insect`, `rodent`,
     `fox`, `bear`, `panda`, `bunny`.
   - `render`: `photoreal`, `game_cg`, `cartoon_2d`, `anime`, `pixel_art`, `clay`, `comic`,
     `vinyl_toy`. A photoreal person may
     be shown in another medium later; any other render, and every creature, keeps its own style
     in every scene.
   - `character_type`, `gender`, `age` and `render` are required; left out, they fall back to
     `average`, `female`, `adult`, `photoreal`. Set them anyway. With face photos, `gender` and
     `age` left out follow the photos instead of those defaults.
   - One option per section, except `features` (up to 3), `distinctive` (up to 2), `makeup`
     (up to 2) and `accessories` (up to 3). `ethnicity`, `skin_color`, `head_shape`, `neck`,
     `eye_shape`, `features`, `facial_hair` and `makeup` are for people only; `coat_color` is for
     creatures only.
   - `style` is the outfit (24 looks, from `business` to `y2k`, `kpop_stage`, `rave`,
     `harajuku`); `palette` recolours it (`neon`, `pastel`, `candy`, `primary`, `sunset`,
     `metallic`, `all_black`...). Hair colours include `split_dye`, `ombre`, `rainbow`.
   - `description` (up to 400 characters) describes the character in words, instead of tiles or
     on top of them. `randomize: true` fills the sections you left out at random.
   - `photoUrls`: 1-4 photos of ONE person (`photoUrl` takes a single one); more angles keep the
     face closer. The face comes from them, and gender, age and hair too unless the traits name
     them. Still pass `gender` as seen in the photos: `save_blogger` matches the voice to it.
     Only with `character_type` `average`: `bold`/`extreme` are refused
     (`trait_photo_caricature`), a creature type too (`trait_not_applicable`). Only the user's own
     face or one they have consent for; never a public figure.
   - `styleReferenceUrl`: a photo whose outfit the character wears. Clothes only.
3. Show the draft. To change something, call `create_blogger_draft` again with the same traits,
   `previousDraftId` and `editText`: a new draft that keeps everything else (8 credits).
4. Saving costs 45: say so and wait for a clear yes. `save_blogger {draftId, name, language}`;
   `language` is the language of the voice previews. The angles take a few minutes. Play the 3
   voice previews; the user's pick goes to `set_blogger_voice` as `generatedVoiceId`.

At most two drafts render at once (`blogger_draft_busy`): wait for one before the next. A draft
already works in `blogger_motion` and `blogger_speak` (`draftId`), so the user can test the look
in motion before paying for the save.

## Trait sets that work

- Brand host: `average`, `photoreal`, `business` or `casual` style, one feature (`freckles`,
  `dimples`, `beauty_mark`). Reads as a real person and holds up across hundreds of clips.
- Meme persona: `bold`, `game_cg` or `cartoon_2d`, a loud hairstyle (`mohawk`, `disco_curls`,
  `space_buns`) in `pink` or `blue`, one `distinctive` (`gold_grill`, `eye_patch`, `glitter`).
- Animal mascot: `cat`, `dog` or `frog`, a `coat_color`, `streetwear` or `tracksuit`,
  `cartoon_2d` or `game_cg`. `photoreal` gives a realistic animal standing like a person.
- Anime or pixel creator: `anime` or `pixel_art` with a saturated hair colour and one accessory
  (`headphones`, `glasses`): small sizes still read.
- Bright trend creator: `average` or `bold`, a loud `style` (`y2k`, `rave`, `harajuku`,
  `kpop_stage`) with a `neon` or `candy` `palette`, `split_dye` or `rainbow` hair and one `makeup`
  (`neon_liner`, `glass_skin`). One loud axis is enough when the rest stays simple.
- Toy mascot: a creature (`panda`, `bunny`, `fox`) in `vinyl_toy` or `clay`, a `pastel` palette:
  reads as merch on any background.

Fewer picks read stronger. Every feature, mark and accessory has to reappear in every future
clip, so choose the ones the user wants forever. The style is only the default outfit: scenes may
change the clothes, never the face, hair, build or marks.

## Edit phrases

- One change per phrase, imperative and concrete, in English: "shave the head", "make the jacket
  red leather", "add round glasses", "around fifty, grey at the temples", "remove the beard".
- Name what changes, not what stays; the edit keeps the rest on its own. Up to 200 characters.
- A new type, gender or render is not an edit: start a fresh draft with new traits.
- After three or four edits the face can drift. Go back to the draft the user liked and edit
  from that one.

## Motion

`blogger_motion {mode, bloggerId | draftId, presetId | sourceGenerationId | libraryItemId}`. The
source is a preset from `list_blogger_presets` or a clip of the user's (a generation, or an upload
through `create_upload` kind `video`).

| `mode` | What comes back | Source | Price |
|---|---|---|---|
| `motion` | The blogger performs the body motion of the clip; the clip sets the moves and timing, the blogger's frame and `prompt` set the look and the place. To keep the clip's own place, use `recast`. | 3-30 s | 6 per second |
| `recast` | The person in the clip is replaced by the blogger; scene, camera, light, timing and sound stay. 1080p. | 3-10 s | 6 per second |
| `swap` | One element (`swapTarget` `outfit`, `product`, `location` or `text`) replaced from 1-4 photos in `swapImageUrls`; the sound stays. | 3-10 s | 6 per second |

- The driving clip: ONE person, the whole body (at least the whole upper body) in frame for the
  whole clip, a single take with no cuts, not tiny in frame, not hidden behind objects. Without a
  body the job fails with `motion_no_body` and the credits come back.
- `framing` (`motion` only): `full` (default) uses the full-body frame, `half` the waist-up one
  for clips that show the person from the waist up. `recast` always uses the full body.
- `prompt` dresses the scene: setting, wardrobe, mood. Never the motion, never the camera.
- `keepSound` keeps the clip's own sound.
- A spoken line (`motion` only): `lineText`, optionally `lineVoiceId`. After the motion the line is
  spoken in the blogger's voice and lip-synced; the clip's own sound is dropped. It must fit
  inside the clip, at about 2.5 words a second, or the call is refused before billing
  (`line_too_long`). The face has to be visible: `lipsync_no_face` returns the credits. A line adds
  the speech and 1 credit per second of lip sync.
- `swap_object` does the same swap on any clip, without a blogger: `sourceGenerationId` or
  `libraryItemId`, `target`, `imageUrls` (1-4 clean photos of the new object) and a `prompt` that
  names what to replace and with what ("replace the black tote with the green leather backpack
  from the photos").

Quote with `estimate_cost`: kind `blogger_motion` (`sourceSeconds`, plus `chars` for a line),
`recast`, `swap`.

## Speak

`blogger_speak {bloggerId | draftId, script, voiceId?, language?, mode, ratio?}`: the script is
spoken in the blogger's voice, then Kling AI Avatar animates the blogger's portrait to it. The
clip is as long as the speech: 2 to 300 s, up to 4000 characters of script (about 900 characters
of English make a minute). `mode` `pro` (default, sharper, 6 per second) or `std` (3 per second),
plus the speech by characters. `ratio` `9:16` (default), `1:1` or `3:4`; the portrait is fitted to
it. Write the script for the ear, with emotion tags where they help (mira-audio, speech.md). Quote
with `estimate_cost` kind `blogger_speech` (`chars`, `model` `std` or `pro`). A blogger built on a
real face speaks only text that passes moderation: on `text_moderated` rewrite, never resend.

## Voice

- `save_blogger` designs a voice from the traits (gender, age, type, render, species) and returns
  three previews. The accent is not taken from ethnicity: for an accent, pin a library voice or
  design one (mira-audio, voices.md).
- `set_blogger_voice {bloggerId}` plus one of: `voiceId` (any voice from `list_voices`),
  `generatedVoiceId` (one of the auto previews, kept as "<name> (AI Blogger)"), `auto: true` (three
  fresh previews, 3 credits), `clear: true`. Previews expire after 24 hours.
- An auto voice has its own slot: it does not count towards the user's five designed voices and
  is deleted with the blogger. `voice_slots_exhausted` means the platform is out of voice slots
  for now: pin a library voice instead.
- The pinned voice speaks in `blogger_speak`, in a Motion line, and in `generate_audio` and
  `voiceover_video` called with `bloggerId` and no `voiceId`. An explicit `voiceId` always wins.

## bloggerId on the other tools

- `generate_image`, `generate_video`, `extend_video`, `generate_3d`, `direct_video`: the canonical
  shots and the appearance passport go in as the character lock (locks-and-references.md).
  Describe the blogger consistently; never redraw the face.
- `avatar_video`, `motion_control`, `recast_video`, `lipsync_video`: the blogger is the character;
  where the tool needs a character frame, it comes from the canon, fitted to the clip's ratio,
  instead of `characterImageUrl`.
- `generate_audio`, `voiceover_video`: the blogger's pinned voice when `voiceId` is empty.

## When it fails

| Code | What to do |
|---|---|
| `blogger_draft_busy` | Two drafts are rendering. Wait for one, then call again. |
| `trait_unknown:<section>` | Use ids from `list_blogger_traits` only. |
| `trait_single:<section>` / `trait_max:<section>` | Too many options in a section: one, or the section's maximum. |
| `trait_not_applicable:<section>` | A people-only section on a creature, `coat_color` on a person, or a photo on a creature. Drop it. |
| `trait_photo_caricature` | A face photo with `bold` or `extreme`: switch to `average` or drop the photo. |
| `voice_slots_exhausted` | Pin a library voice with `set_blogger_voice`. |
| `line_too_long` | Shorten the line or use a longer clip. |
| `motion_no_body` | No complete figure in the clip. Credits refunded; pick a clip with one full body. |
| `lipsync_no_face` | The face is too small or turned away for the line. Credits refunded; drop the line or choose a clip that faces the camera. |
