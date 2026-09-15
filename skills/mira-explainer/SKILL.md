---
name: mira-explainer
description: >-
  Clear demonstration clips on Mira AI: show how a product or service works in plain light and
  plain framing so the value is obvious without words. Use it for "explainer", "demo", "how it
  works", "tutorial", "show the steps", "объясняющее видео", "покажи как работает", "инструкция".
  Video only. Pass skill="explainer" to generate_video. Do NOT use for creator testimonials
  (mira-ugc), paid ads (mira-ads) or drawn motion graphics (mira-illustration).
license: MIT
metadata:
  mira:
    id: explainer
    title: Explainer
    kind: video
    video_style: explainer
    models: [omni, minimax, kling, wan3]
    order: 50
    icon: presentation
---

# Mira Explainer

An explainer is a clip you understand with the sound off. The action is the message. If a
viewer cannot say what the product does after watching, the clip failed, however pretty it was.

## When to use

A product demo, a how-it-works piece, a step-by-step, a before-and-after, an app or service shown
in use. The audience is deciding whether it is for them.

## Doctrine

This is a clean, friendly explainer clip that shows the product or service in real use. Framing
is clear and uncluttered: the action fills the centre of the frame, the background is simple and
out of the way, the hands and the object are large enough to read. Light is bright and even, a
soft daylight quality with mild shadows, no drama and no grade. Each beat shows exactly one step
or one effect, in order, with a cause visible on screen: a press, a pour, a swipe, a turn. The
result is shown clearly at the end, held still. Pace is steady and unhurried, and nothing in the
frame competes with the action. A person, when present, is calm and competent and looks at the
task, not at the camera. Write the final prompt in English. Do not invent on-screen text, arrows
or labels; the user's own interface and product text stay exactly as they are.

## Interview

- **format** What is being shown? (default: demo)
  - `demo` A demo: One continuous use of the product from start to finished result.
  - `steps` Steps: Three or four distinct steps, each its own beat, in the order a user performs them.
  - `beforeafter` Before and after: The problem state first, the product in use, then the fixed state held still.
- **pace** How fast? (default: calm)
  - `calm` Calm: Longer beats, one action each, the result held at the end.
  - `brisk` Brisk: Shorter beats, faster hands, still one action per beat.

## Hint

What the product does, in the order a person would do it, and what the finished result looks like.

## Model picks

`omni` cuts steps on its own and renders on-screen interface text well. `minimax` when a
voice explains while hands work, or when text on the product must stay legible. `kling` for
convincing hands and physics. `wan3` for a 30 second walkthrough in one continuous take.

## Checklist

- Every beat has a visible cause and a visible effect.
- The background could be described in five words.
- The final frame is the result, still, in focus.

## Do not

Do not add music-video cuts, a grade or dramatic light. Do not show the person's face more than
the task. Do not write text or arrows into the frame.
