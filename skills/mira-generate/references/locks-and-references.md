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

## Video references

`referenceVideoUrls` on `generate_video` takes up to three public HTTPS clips (mp4/mov, up to
200 MB each). The model borrows their motion, camera work, pacing or grade - never the people,
the place or the product in them. Only `seedance-2-5`, `seedance`, `minimax`, `wan3`, `wan3-prime`, `wan`,
`kling` (one clip, 3-15 s, Kling 3.0 Omni: `@video_1`, native audio off) and `omni` accept clips (15 s per
clip, `omni` 3 s); every other model refuses with `video_not_supported`. Bind each clip in the prompt the way the model's file says: `@Video1`
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
out of; `auto` (default) - start frame, except next to a clip or a brand asset, where it is a reference.
Models without a reference mode (`runway`, `happyhorse`, `grok`) keep the start frame and warn. Two or
more photos are always references. Say which one you mean: a product shot you want animated is a start
frame; a photo of a place you want the clip to be set in is a reference.

`kling-motion` is the exception: it REQUIRES exactly one clip of a person performing the motion
(3-30 s, one person, single take, no cuts) and exactly one reference image of the character,
and the output is as long as the clip. The prompt only dresses the scene - wardrobe, setting,
mood - never the motion or the camera.

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
