# Voices

## What the account can use

`list_voices` shows the platform's library: premade and professional voices every account shares,
filtered by language, gender, age, accent and use case.

```
list_voices {"scope": "library"}
list_voices {"scope": "library", "gender": "male", "accent": "american", "useCase": "advertisement"}
```

Filters and how to present the choice are in speech.md. Every library voice works in
`generate_audio` speech and dialogue and in `voiceover_video`. Offer two or three voices by name
with their preview links; the ids stay with you.

## Keep a character's voice

A character who speaks in several clips keeps one `voiceId` for all of them: pick it once from the
library and pass the same id to every `generate_audio` and `voiceover_video` call. Video models
that generate their own sound may give each clip a different voice; when the voice has to match
across a series, generate the clip without speech and lay the line over it with `voiceover_video`.

## What is never done

- No voice of a real person: no celebrity, no politician, no "sounds like" a named actor, singer
  or streamer, in a prompt or anywhere else. Describe qualities, never a person.
- No voice cloning, voice design or re-voicing of a recording here. If the user asks, say it is not
  available in this app and continue with a library voice.
