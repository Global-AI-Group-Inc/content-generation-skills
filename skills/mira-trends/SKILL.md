---
name: mira-trends
description: >-
  Find what is trending in AI video on TikTok and Instagram Reels right now and repeat it on Mira AI:
  trending sounds and hashtags with their share of AI-generated videos, top AI videos broken down into
  hook, shots, the named trend format, the model it was likely made with, the Mira model that remakes it
  and a ready recreate prompt, plus a one-call path to remake a trend video with its original sound.
  Use it for "what's trending", "viral ideas", "trend", "trending sound", "AI trend", "remake this
  trend", "repeat this video", "что в тренде", "тренды", "вирусное видео", "повтори тренд".
  NOT for the generation mechanics themselves (mira-generate) or for writing a prompt from scratch
  (mira-video-prompting).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira trends

Mira watches TikTok and Instagram Reels in the US every few days and keeps what is moving, with
AI-generated video first. A video counts as AI when the platform labelled it (the creator's own AI
label or the platform's detection) or when its tags and caption name an AI tool such as Sora, Veo,
Kling, Seedance, Hailuo or Runway. Sounds and hashtags carry the share of AI videos among the ones
collected, so an "AI trend" is a sound or a tag that AI creators are actually riding, not one
that merely mentions AI.

## Tools

| Tool | Spends credits | Use it for |
|---|---|---|
| `get_trends` | no | Trending sounds, hashtags and videos. `aiOnly` is true by default; `platform` is `tiktok`, `instagram` or empty. |
| `get_trend_video` | no | One video from `get_trends` with its original sound, as a direct `video_url`. The first call takes up to a minute. |
| `direct_video` | yes | Preset `ad-remake` with `videoUrl` = that `video_url` and `keepAudio=true` repeats the trend with its sound. |
| `generate_video` | yes | A fresh clip in the trend's format, starting from `recreate_prompt`. |

## Read the result

- `stage`: `rising` (growing and speeding up), `peaking` (growing, slowing down), `fading` (growth
  has stalled), `new` (one observation so far, no trajectory yet). Ride `rising`; `peaking` is late
  but still works for a fast follower; skip `fading`.
- `ai_share` and `ai_videos` on a sound or a hashtag: how many of its collected videos are AI. A sound
  at 90% with 20 videos is a format AI creators copy from each other, which is the best signal there is.
- On a video, `features` is the breakdown: `hook` (the first one or two seconds), `shots`, `pacing`,
  `ai_format` (the named trend, for example "talking baby podcast"), `likely_model`, `mira_model`,
  `duration_s` and `recreate_prompt`. Videos with a breakdown come first.
- Data refreshes every four days. Say so when the user asks about something from this morning.

## Three ways to use a trend

1. **Repeat the video with its sound.** Call `get_trend_video`, quote the ad-remake price, get a yes,
   then `direct_video` with preset `ad-remake`, `videoUrl` = `video_url`, `keepAudio=true`, and
   `mode` `flex` (keeps story, pace, look and hook) or `close` (shot for shot). The result gets the
   trend's original audio. `keepAudio` cannot be combined with `language`.
2. **Same format, the user's subject.** Start `generate_video` from `recreate_prompt`, swap the subject
   for the user's product, AI Blogger or idea, keep the hook and the beat structure, and render on
   `mira_model` at `duration_s`. Put the trend (format, hook, sound title) in the brief's
   `trend_context` so the pipeline keeps the rhythm.
3. **Ride the sound only.** Make the user's own clip, then tell them which trending sound to attach
   when they post: the platforms group videos by sound, and that grouping is what puts a clip into
   the trend.

## Rules

- Never present a trend as fresher than its `last_seen`, and never invent counts; quote what the tool
  returned.
- Do not promise virality. A trend raises the odds; the hook still has to land.
- `recreate_prompt` describes a concept, not a copy: no real names, logos or copyrighted characters.
  Keep it that way when you edit it.
- Remakes spend credits. Quote the price and get a yes before `direct_video` or `generate_video`.
