---
name: mira-ugc
description: >-
  Creator-style clips and photos on Mira AI: phone-shot, handheld, someone talking to the camera,
  a review, an unboxing, a how-to, a testimonial. Use it when the user says UGC, "shot on a phone",
  "like a customer filmed it", "creator video", "TikTok ad", "influencer style", "отзыв", "распаковка",
  "как снято на телефон". Pass skill="ugc" to generate_video or generate_image on Mira. Do NOT use for
  glossy product hero shots (mira-product), brand films (mira-cinematic) or anything drawn (mira-anime,
  mira-toon3d, mira-pixel).
license: MIT
metadata:
  mira:
    id: ugc
    title: UGC
    kind: both
    video_style: ugc
    image_style: ugc
    models: [minimax, omni, seedance-2-5, kling, gpt-image-2, gpt-image-2.5-flare, nano-banana-pro, muse-image]
    order: 10
    icon: smartphone
---

# Mira UGC

UGC sells because it does not look like an ad. The camera is a phone, the light is a window,
the person is a customer, and the product is in their hand because they use it. Everything
below protects that impression. Polish is the enemy here.

## When to use

A real person shows or talks about a product the way a customer would: a review, an unboxing, a
short how-to, a testimonial, a "day with it" clip. Vertical, social, meant to sit between other
people's phone videos and not stand out as paid.

## Doctrine

This is authentic user-generated content: a real customer's casual smartphone clip, never a studio
ad. The camera is handheld and slightly imperfect, held by the person or a friend, at arm's length
or propped on a table. The setting is everyday and lived-in: a kitchen, a bathroom shelf, a car seat,
a desk with clutter in the background. Light is whatever is there, window or lamp, with no grade and
a touch of overexposure where the window is. Skin keeps real texture; nothing is retouched. The
person talks or reacts straight into the lens with natural pauses and mid-sentence gestures, and
holds the product casually, even awkwardly close, so its label and shape stay readable in every beat.
One honest benefit, said or shown, not a list. Small flaws are on purpose: one reframe mid-take, a
finger near the lens, a real room sound. Write the final prompt in English. Do not invent brand
names, on-screen text or logos the user did not give; the user's own product label stays exactly as
it is.

## Interview

Ask only what the request leaves open. Options are fixed; each carries the clause the pipeline gets.

- **format** What kind of clip is it? (default: review)
  - `review` Review: The creator has used the product and reports one concrete result, holding it up to the lens while speaking.
  - `unboxing` Unboxing: The clip opens on the sealed package in the creator's hands; the reveal lands at the midpoint and the product is examined up close after it.
  - `howto` How-to: The creator demonstrates one real use of the product step by step, hands in frame, the result shown at the end.
  - `testimonial` Testimonial: The creator speaks to the camera about a before and an after, the product visible on the table or in hand throughout.
- **platform** Where will it be posted? (default: reels)
  - `reels` Reels: Vertical 9:16, cut for a feed of other phone clips, the face and the product large in frame from the first second.
  - `tiktok` TikTok: Vertical, fast opening line, casual delivery, the product shown within the first two seconds.
  - `stories` Stories: Vertical, looser and more intimate, as if replying to a friend, shorter beats.
- **hook** How does it open? (default: problem)
  - `problem` Problem first: The first second shows the annoyance the product removes, then the person picks it up.
  - `result` Result first: The first second shows the finished result, then the person explains how they got it.
  - `curiosity` Curiosity: The first second shows the product half hidden or mid-use, and the person answers the question the viewer just asked.

## Hint

What is the product, who is showing it, and what would that person honestly say about it in one line.

## Model picks

For speech to camera pick `minimax`: it holds spoken lines and legible packaging text. For a quick
silent clip `omni` is cheapest and cuts on its own. For a 15 or 30 second story with the same
creator across shots, `seedance-2-5`. For a photo, `gpt-image-2` for a plain phone-photo look,
`gpt-image-2.5-flare` when the packaging text must be readable at the exact story ratio,
`nano-banana-pro` for a multilingual design, `muse-image` (1 credit) for a cheap draft or a shot
in a real, recognisable place.

## Checklist

- The product is visible and readable in every beat, held or placed, not floating.
- One benefit. If you wrote a list, cut it to the one the person would actually say.
- Nothing in the prompt asks for studio light, a grade, a lens or "cinematic" anything.
- The person is a customer, not a model. Say what they are doing, not how attractive they are.

## Do not

Do not write "professional", "high quality" or "4K": those words push the render toward an ad.
Do not put a headline or text on screen unless the user gave the exact words. Do not describe
the room as clean or minimal; UGC lives in real rooms.
