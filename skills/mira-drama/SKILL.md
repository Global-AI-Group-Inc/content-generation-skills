---
name: mira-drama
description: >-
  Write and shoot AI short dramas on Mira: vertical micro-drama series, mini-series of 3-10
  episodes for Reels and TikTok, a single dramatic scene with dialogue. Covers the series and
  episode architecture, the first five seconds, the end-of-episode hook, payoff beats, villains,
  dialogue as action, blocking and power in a two-hander, the continuity bible across shots and
  episodes, how much one generated shot can hold, dialogue timing per model, reaction and contact
  shots, and how to repair a take or cut around it. Every shot leaves with a camera move and a light
  picked from the craft banks. Use it for "short drama", "micro drama", "vertical drama", "series",
  "episode", "cliffhanger", "dialogue scene", "шорт драма", "мини-сериал", "серия", "сериал для
  рилс", "клиффхэнгер", "диалоговая сцена". NOT the camera and light banks themselves (mira-craft)
  or what each model does with a prompt (mira-video-prompting).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira drama

A short drama is not a long film cut short. The viewer decides in the first five seconds whether
to stay and in the last ten whether to watch the next one, and a generated clip holds two or
three readable actions, not six. So the story is built backwards from those two moments and
forwards from what one shot can carry. This skill is the dramaturgy and the shot discipline; the
camera, light and look come from `mira-craft`, the model from `mira-video-prompting`.

## The order of work

1. **Series sheet.** Premise in one sentence, the want and the wound of the lead, the antagonist
   ladder, how many episodes and how long. [series.md](references/series.md)
2. **Episode map.** One line per episode: the hook that opens it, the turn, the payoff, the hook
   that ends it. Check the hook types do not repeat. [series.md](references/series.md)
3. **Bible.** Identity line for every character, wardrobe and its state, locations with an
   orientation rule, props by fixed nouns. Built once, pasted word for word.
   [scene.md](references/scene.md)
4. **Scene blocking.** Who wants what, who moves, where the axis is, where the light comes from in
   the room. [scene.md](references/scene.md)
5. **Shot list.** Each beat becomes shots that one generation can hold: one or two actions, one
   exchange of lines, one reaction. [shots.md](references/shots.md)
6. **Direct every shot.** Camera move and light from `mira-craft`, passed in `direction`, written
   in words in the prompt. See "Camera and light on every shot" below.
7. **Render, review, repair, cut.** Triage what failed, fix it at the cheapest rung, cut on
   action. [repair.md](references/repair.md)

One file per step. Do not load all four for one shot.

## Camera and light on every shot

Every shot card carries two decisions before it is rendered: the camera move and the light. Open
`mira-craft` (camera.md for the move, light.md for the scheme), pick one of each by what the beat
needs, and:

- pass the keys in `generate_video` `direction`: `camera_moves` (up to 4, in order) and
  `lighting`, plus `grade`, `stock` and `palette` once for the whole series;
- write the same decision in plain words in the prompt ("the camera holds, then pushes in on her
  as she reads the message; a hard practical lamp from the left, the right side of her face in
  shadow"); never a key in the prose;
- keep the grade, stock and palette identical across every shot of the series, and the light
  direction fixed to the room, not to the camera (scene.md, "Light belongs to the room").

How the beat picks the move and the light:

| Beat | Camera | Light |
|---|---|---|
| hook, threat arrives | a sudden move: a fast push-in, a snap zoom, a hard pan to the door | a hard source, a cut in the light (a door opens, a lamp dies) |
| dialogue, power balanced | locked frames, an over-the-shoulder pair on one side of the axis | one key for both faces, same direction |
| power shifts | a slow push-in on the one who gains it, or the frame tightens | the contrast between the two faces changes, not the direction |
| reveal | a rack focus or a tilt that uncovers it | the reveal lands in the brightest part of the frame |
| reaction, payoff | a held close-up, no move | motivated, steady; let the face do it |
| end-of-episode hook | a push-in that stops on the unanswered thing, or a cut to black on it | the light changes on the final beat (headlights, a phone screen, a shadow crossing) |

Leave `direction` empty only when the user asks to leave the look to the model.

## Tools that do the work

| Job | Tool |
|---|---|
| a whole series with a team, cast that stays identical | AI Film Studio: `film_create_project`, `film_create_element`, then `generate_video` with `filmProjectId` and `elementIds` (mira-generate, film-studio.md) |
| the frame first, then the take from it | `generate_image` for the frame, `generate_video` with `startImageUrl` |
| the next shot continues the last one | `film_extract_frame` (last frame) or `extend_video` |
| a ready-made micro drama of one clip up to 30 s | `direct_video` preset `micro-drama` |
| the user's AI Blogger as the lead | `bloggerId` on `generate_video` (mira-generate, ai-blogger.md) |
| dialogue recorded apart, then lips matched | `generate_audio` kind `dialogue` then `lipsync_video` (mira-audio) |
| captions burned in for silent viewing | `add_captions` (mira-audio) |

## Where this sits

- `mira-craft` has the banks: camera moves, lighting schemes, grades, cut patterns, the continuity
  doctrine. This skill tells you which one a beat needs; that one tells you what it is.
- `mira-video-prompting` says what each model does with a prompt. For dialogue-heavy shots read
  the model file before writing (shots.md lists the model behaviours that matter here).
- A playbook `skill` still applies per clip: `cinematic` for a mood drama, `ugc` for a drama shot
  as phone footage, `anime` or `toon3d` for an animated series.

Credits: the series structure, shot-load numbers and repair ladder draw on three MIT-licensed
open-source projects; see THIRD_PARTY_NOTICES.md in the repository root.
