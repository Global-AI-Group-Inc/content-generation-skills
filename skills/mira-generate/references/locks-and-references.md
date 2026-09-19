# References, locks and failure handling

## Brand assets

`list_brand_assets` returns three kinds of asset with ids:

- **avatar**: a person. Pass `avatarId`. The platform injects the canonical photos and an
  appearance passport (CHARACTER LOCK). Identity never changes: face, hair, build, age, marks.
  Clothes and the render medium may change; say so in the prompt when they should.
- **location** (`studioId`): a place. The platform injects its reference and a scene passport
  (SCENE LOCK). Keep its signage and lettering in frame; they are the user's own, not third-party
  brands.
- **product** (`productId`): the thing being sold. Its photos become references, its name and
  description become facts (PRODUCT LOCK). The product stays the hero and keeps shape, colours and
  label. Packaging may appear beside it, never over it.

Pass the id and describe the asset consistently. Do not paste the passport text into the prompt;
the platform already did.

## Reference URLs

`referenceImageUrls` takes up to eight public HTTPS URLs. One image on a video call turns it
into image-to-video with that frame as the start. Several images are merged into one start frame
on most models; `seedance-2-5` takes them natively and is the only family where an attached
avatar reaches the model as an identity rather than a rebuilt frame. Private and loopback
addresses are refused.

An image attached to a chat is not a URL. If the client has file access, read the file and call
`upload_reference_image` with its bytes; if it does not, ask the user for a link.

## Keyframe anchors

`startImageUrl` and `endImageUrl` on `generate_video` are the clip's literal FIRST frame and the
frame it must land on. This is how shots chain without a visible seam: the end frame of one shot
becomes the start frame of the next.

They are a SEPARATE MODE at the provider, not two more references. With a pair attached you may
not pass `referenceImageUrls`, `referenceVideoUrls`, `referenceAudioUrls`, `imageRole`,
`avatarId`, `studioId` or `productId` in the same call - ModelArk answers *"first/last frame
content cannot be mixed with reference media content"*, and the platform refuses the call before
a single credit is spent rather than letting you pay for a request the provider will reject. Make
two calls when you need both: one to build the frame, one to animate it.

A target end frame is accepted by `seedance-2-5`, `kling`, `minimax`, `omni` and the whole Veo
family; `list_models` reports `supports_last_frame` per model, and everything else refuses with
`end_frame_not_supported`. On most of them `endImageUrl` needs `startImageUrl` alongside it - a
clip cannot land on a frame without starting from one. `minimax` is the exception: it takes an
end frame ALONE, and the clip then starts wherever the model likes and simply has to land there.
`list_models` flags that as `supports_last_frame_only`.

Each family carries the anchors differently, which matters only when something goes wrong:
`seedance-2-5` and `wan3` send them as separate content roles, Veo as a `lastFrame` field, and
`omni` as `<FIRST_FRAME>` / `<LAST_FRAME>` tags inside the prompt.

The end frame is a strong directional guide, not a pixel-perfect constraint: the clip moves
towards it and the final rendered frame may differ slightly. Build the second frame by EDITING
the first (`generate_image` on it) rather than writing a fresh prompt, or the model spends the
shot reconciling two different rooms.

## Video references

`referenceVideoUrls` on `generate_video` takes public HTTPS clips (mp4/mov, up to
200 MB each). The model borrows their motion, camera work, pacing or grade - never the people,
the place or the product in them. Only `seedance-2-5`, `seedance`, `minimax`, `wan3`, `wan3-prime`, `wan`,
`kling` (one clip, 3-10 s, Kling 3.0 Omni: `@video_1`, native audio off) accept clips; `omni`
does NOT - its video port is closed on our key;
every other model refuses with `video_not_supported`. How many and how long differs per model -
`seedance-2-5` takes ten of up to 30 s, `wan3` five of 15 s, `kling` one of 3-10 s - so read
`max_videos`, `video_ref_max_seconds`, `video_ref_min_seconds` and
`video_ref_max_seconds` from `list_models` instead of assuming three. Bind each clip in the prompt the way the model's file says: `@Video1`
on Seedance, `Video 1` on Wan, `reference video 1` on MiniMax, `<VIDEO_REF_0>` on Omni - an
unbound clip is ignored. A clip this account generated earlier (`list_generations`) is a valid
URL, which makes "do it again with this motion" a one-call job.

Seedance (ModelArk) screens reference clips the way it screens photos: a clip that shows a
real-looking person who is not the account's avatar is refused before billing
(`moderation_blocked`). Blockout playblasts, capsule or mannequin figures, stylised characters and
the account's own avatars pass. For a real stranger's motion take `minimax`, `wan3` (or
`wan3-prime`), `omni` or `kling-motion`. Give every reference ONE narrow job with an explicit
rejection, the way the providers' own guides put it: "@Image1 controls only the product's shape,
materials and label - do not copy its background, lighting or angle"; "@Video1 sets only the camera
path, the framing and the cuts - do not copy its figures, surfaces or colours". An image and a
video never do the same job.

`imageRole` on `generate_video` says what a SINGLE photo is for: `reference` - it shows the hero, the
place or the product and the model builds its own first frame (`seedance-2-5`, `seedance`, `veo*`,
`minimax`, `wan*`, `omni`, `kling`); `start_frame` - the photo is the literal opening frame the clip grows
out of; `auto` (default) - a reference on every model that has the mode, a start frame on `runway`,
`happyhorse`, `grok`. So when the user wants THIS photo animated (a product shot coming alive, a
live cover), pass `start_frame` explicitly. Two or
more photos are always references. Say which one you mean: a product shot you want animated is a start
frame; a photo of a place you want the clip to be set in is a reference.

`kling-motion` is the exception: it REQUIRES exactly one clip of a person performing the motion
(3-30 s, one person, single take, no cuts) and exactly one reference image of the character,
and the output is as long as the clip. The prompt only dresses the scene - wardrobe, setting,
mood - never the motion or the camera.

## Audio references

`referenceAudioUrls` on `generate_video` takes tracks (mp3/wav) the model borrows a voice, timbre
or rhythm from. `seedance-2-5` takes up to ten and `wan3`/`wan3-prime` up to five; `list_models`
reports `max_audios` per model, and everything else refuses. The provider needs at least
one photo or clip attached alongside - audio on its own is refused
(`audio_requires_visual_reference`). Bind each in the prompt as `@Audio1`, the same way clips are
bound: an unbound track is ignored.

## References beside a continuation

`extend_video` takes `referenceImageUrls`, `referenceVideoUrls` and `referenceAudioUrls` too, on
the models that accept references beside a continuation. `seedance-2-5` takes photos, clips and
audio; `omni` takes PHOTOS beside its continuation (a photo attached to an extend turn really is
used - a car photo put the car in the continuation) but no clips; Veo continues from the footage
alone and refuses references rather than dropping them silently.

The numbering shifts by one: the source clip itself is `@Video1`, so your clips start at
`@Video2`, and one fewer fits than on a fresh render. Their seconds count towards the provider's
total video budget TOGETHER with the source, so a long source leaves little room - trim the
references rather than sending more of them.

## Seeds

Most models ignore the seed. Reuse it together with a lightly edited prompt for a close
variation; a model change discards it.

## When a call fails

- 401 on `tools/call`: the sign-in was not completed. Ask the user to finish it in the browser.
- `out_of_credits`: say so plainly and stop. Do not retry with a cheaper model unasked.
- `moderation_blocked`: the provider refused the input. Real faces on some models are re-routed
  automatically; if it still fails, describe the person instead of attaching the photo.
- `still_running` from `wait_for_generation`: call it again. Video routinely needs three or four
  calls.
- An unknown model id does not error; it falls back to the registry default. Check with
  `list_models` when unsure.
