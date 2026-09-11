---
name: mira-ads
description: >-
  Short paid creative on Mira AI: a bold ad clip or a banner with a hook in the first beat, an
  offer and a clean closing frame. Use it for "ad", "commercial", "promo", "sale", "banner",
  "рекламный ролик", "промо", "баннер", "скидка", Meta or TikTok ads, launch teasers. Pass
  skill="ads" to generate_video or generate_image. Do NOT use for authentic creator clips
  (mira-ugc), quiet catalogue packshots (mira-product) or slow film mood (mira-cinematic).
license: MIT
metadata:
  mira:
    id: ads
    title: Ads
    kind: both
    video_style: ads
    image_style: banner
    models: [runway, omni, minimax, kling, gpt-image-2.5-flare, gpt-image-2.5-sunburst, nano-banana-pro, gpt-image-2, muse-image]
    order: 30
    icon: megaphone
---

# Mira Ads

An ad has one job in the first second and one job in the last. The first second stops the thumb.
The last frame holds still so the message can land. Everything in between is proof, cut fast.

## When to use

Paid social creative, a launch teaser, a sale announcement, a static banner with a headline. The
piece exists to make someone act, not to be admired.

## Doctrine

This is a bold, high-impact advertising piece. It opens on a hook inside the very first beat, an
abrupt action, the product snapping into frame, a face already speaking, and never on an
establishing shot. Energy is punchy: dramatic directional light with deep shadows and strong
highlights, saturated but controlled colour, forceful camera work and fast beats that each show
one proof of the promise. The product keeps its exact shape, colours and label through every beat
and is the largest thing in frame at least twice. The piece ends on a static hero frame with the
product sharp and the surroundings calm, held for the last two seconds, built so a headline could
sit beside it. If the user gave headline or offer text, it appears exactly in those words as large,
high-contrast lettering integrated into the frame; if not, no text appears at all. Write the final
prompt in English. Do not invent claims, prices, awards, third-party brand names or logos.

## Interview

- **offer** What is the ad selling? (default: launch)
  - `launch` A launch: Something new is here, the reveal of the product is the climax.
  - `discount` A discount or sale: Urgency and value, the product shown with the deal in the closing frame.
  - `feature` One feature: The whole piece proves a single feature works, shown not told.
- **energy** How loud should it be? (default: punchy)
  - `punchy` Punchy: Hard cuts, fast moves, high contrast, meme-native emphasis.
  - `premium` Premium: Fewer, longer beats, richer light, restraint that reads expensive.
- **text** On-screen text? (default: none)
  - `none` None: No lettering of any kind in frame; leave the closing frame calm for later.
  - `given` The user's words: The exact headline or offer the user wrote appears as large legible type in the closing frame only.

## Hint

The product, the one promise, and the exact headline if there is one.

## Model picks

For video, `runway` executes several ordered moves and timed beats in one prompt; `omni` cuts on
its own and is cheapest for volume; `minimax` when someone speaks or text must be legible in
frame; `kling` for human action and physics. For a banner, `gpt-image-2.5-flare` renders legible
text in any language at the exact ratio; `gpt-image-2.5-sunburst` (premium) for the polished
campaign key visual; `nano-banana-pro` for one design in several languages; `gpt-image-2` when
the layout is complex and there is no text; `muse-image` (1 credit) for cheap drafts and a visual
that must show a real, recognisable place or product.

## Checklist

- The first beat is an action or a face, never a wide shot of a room.
- Every beat proves the promise. A beat that only looks nice gets cut.
- The closing frame is static, the product sharp, and it holds.
- Text appears only if the user typed it, and then character for character.

## Do not

Do not write "epic", "stunning" or "high energy": name the action instead. Do not stack more than
one grade or lighting look. Do not put a price or a percentage in frame that the user did not give.
