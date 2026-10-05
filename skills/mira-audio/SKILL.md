---
name: mira-audio
description: >-
  Voice, music and sound on Mira AI through its MCP server: text to speech with emotion tags in
  70+ languages, multi-voice dialogue, music timed to the cut, a soundtrack the model writes by
  watching the clip, sound effects, voiceover and captions on a finished clip, dubbing, clean
  audio, stems and voice design. Use it for "voiceover", "narration", "text to speech", "TTS",
  "dialogue", "podcast", "music", "soundtrack", "jingle", "beat", "sound effect", "SFX",
  "dubbing", "translate video", "captions", "subtitles", "clean audio", "noise removal",
  "stems", "voice design", "озвучка", "музыка к видео", "субтитры", "перевести видео", "звук".
  NOT for the picture itself (mira-generate) or for laying sound on a timeline in the user's
  After Effects (mira-after-effects).
license: MIT
metadata:
  version: "0.2.0"
---

# Mira audio

Every sound on Mira comes from ElevenLabs models behind the same MCP server that makes the
pictures: Eleven v4 and v4 Turbo for speech, text-to-dialogue, Music v2.5, the sound-effects model,
the voice changer and the voice isolator, dubbing, and Scribe v2 for transcripts. A tool that
makes something returns a generation id at once and `wait_for_generation` brings the result: a
track is an mp3 in `urls[0]`, an operation on a clip is a new clip, and stems, captions and
transcripts arrive as files in `files[]`, each with a `role`.

## Pick the tool

| The user wants | Call | Read |
|---|---|---|
| one voice reading a text: a voiceover track, narration, an ad read | `generate_audio` kind `speech` | [speech.md](references/speech.md) |
| two or more people talking: a podcast, a sketch, an interview | `generate_audio` kind `dialogue` | [dialogue.md](references/dialogue.md) |
| music with a structure, lyrics or hits on given seconds | `plan_music` → `generate_audio` kind `music` | [music.md](references/music.md) |
| a sound effect or an ambience bed | `generate_audio` kind `sfx` | [sfx.md](references/sfx.md) |
| the sounds of what happens on screen, for a silent clip | `add_sound_effects` | [sfx.md](references/sfx.md) |
| music for a clip that already exists | `add_soundtrack` | [mix.md](references/mix.md) |
| a voice over a finished clip, captions optional | `voiceover_video` | [mix.md](references/mix.md) |
| speech without the noise, music and echo around it | `isolate_voice` | [mix.md](references/mix.md) |
| vocals and instruments on separate tracks | `separate_stems` | [mix.md](references/mix.md) |
| a face on screen saying a new track | `generate_audio` → `lipsync_video` | [mix.md](references/mix.md) |
| the clip's speech in another language | `translate_video` | [dub-captions.md](references/dub-captions.md) |
| subtitles burned in, plus an SRT | `add_captions` | [dub-captions.md](references/dub-captions.md) |
| a transcript, a silence cut, short clips, chapters | `transcribe_video` → `analyze_transcript` | [dub-captions.md](references/dub-captions.md) |
| the same performance in another voice | `change_voice` | [voices.md](references/voices.md) |
| a voice that does not exist yet | `design_voice` → `save_voice` | [voices.md](references/voices.md) |

One file per job. Do not load all seven for one track.

## Sources

An operation on existing media takes exactly one of two ids: `sourceGenerationId` for anything
the account made on Mira (find it with `list_generations`, kind `video` or `audio`), or
`libraryItemId` for a file the user brings (`create_upload` kind `video` or `audio`, PUT the
bytes, use the returned id).

| Tool | Takes | Longest source |
|---|---|---|
| `add_soundtrack` | a clip | 600 s |
| `voiceover_video` | a clip | 300 s |
| `add_captions` | a clip | 30 min |
| `translate_video` | a clip | 180 s |
| `change_voice` | a clip or a track | 120 s |
| `isolate_voice` | a clip or a track | 30 min |
| `transcribe_video` | a clip or a track | 30 min |
| `separate_stems` | a track or a clip | 600 s |
| `lipsync_video` | a clip plus a track | 60 s |

A longer source is refused (`source_too_long`) before a credit is spent: trim it first.

## Credits

Everything that makes or changes sound spends credits; `list_voices`, `plan_music`,
`save_voice` and `delete_voice` do not. Never quote a price from memory: rates change and
`estimate_cost` is the only source. Speech and dialogue bill by characters, music, soundtracks
and stems by length, the operations on a clip by the source's seconds or minutes.

```
estimate_cost {"kind": "audio", "model": "speech", "chars": 740}
estimate_cost {"kind": "audio", "model": "music", "durationSeconds": 60}
estimate_cost {"kind": "soundtrack", "sourceSeconds": 15}
estimate_cost {"kind": "stems", "model": "6", "sourceSeconds": 180}
```

`design_voice` takes a small flat fee and reports it in its result; say so before the call.

## Workflow

1. Name the job from the table. Say in one sentence what you will make and that it spends credits.
2. When the user cares who speaks, call `list_voices` with filters and offer two or three voices
   by name with their preview links. Otherwise leave `voiceId` empty for the default voice.
3. Write for the medium: text for the ear (speech.md), genre, tempo and instruments for music
   (music.md), a source in a space for an effect (sfx.md).
4. Quote with `estimate_cost` before anything long: minutes of music, pages of text, a long dub.
5. Call, then `wait_for_generation` until it finishes. Show the link. Do not narrate polling.
6. Iterate by changing one thing: one tag, one section length, one style, one voice.

## Common chains

- Ad with a voice and music: `generate_video` → `voiceover_video` (original `duck`, `captions`
  on) → `add_soundtrack` with mix `under`, so the music dips under the new voice.
- Talking character: `generate_audio` speech → `lipsync_video` with `audioGenerationId` on a
  clip where the face is large and frontal.
- Dub a creator clip: `isolate_voice` if the room is noisy → `translate_video` (`lipsync` for
  close-ups) → `add_captions` in the target language.
- Cut the picture to the music: `plan_music` → `generate_audio` music → the track's URL in
  `referenceAudioUrls` of `generate_video` on `seedance-2-5`, or into After Effects for beat markers.
- Long talk to shorts: `transcribe_video` → `analyze_transcript` task `clipper` → cut the ranges
  in an editor → `add_captions` style `bold` on each short.

## Rules

- Never imitate a real person. No celebrity voices, no "sounds like" a named actor or singer, no
  designed voice described as someone real. Voice cloning exists only on the website, for the
  user's own voice, recorded with a spoken consent phrase. No agent tool can clone; never offer it
  as a step.
- Music prompts name no artists, bands or songs and quote no existing lyrics: the provider
  refuses them (`music_prompt_rejected`) and suggests a rewrite. Describe the sound instead.
- Speech text is written in the language it will be spoken, lyrics in the language they will be
  sung, music and effect prompts in English. Parameter values stay English. Reply in the user's
  language.
- Never show generation, voice or design ids to the user; show names and links.
- `delete_voice` is permanent. Ask before calling it.

## When it fails

| Code | What to do |
|---|---|
| `text_too_long` | Split at paragraph ends: v4 takes 10000 characters a call, turbo 20000, a dialogue 2000. |
| `source_too_long` | The source is over the tool's limit in the Sources table: trim it and send the part. |
| `music_prompt_rejected` | An artist, a song or known lyrics were recognised. Take the suggested prompt or describe the sound. |
| `composition_invalid` | A section is outside 3-120 s or over 30 lines, or there are more than 30 sections. |
| `voice_not_found` | The voice was deleted or is not visible to this account: `list_voices` again. |
| `voice_quota_exceeded` | The user already keeps five designed voices: offer to delete one. |
| `voice_slots_exhausted` | The platform has no free voice slots right now: try later. |
| `text_moderated` | The text was refused. Rewrite it; do not resend it as is. |
| `elevenlabs_disabled` | Audio is switched off on the platform at the moment. Say so and stop. |
| any other `*_failed` | A failed job returns its credits. Retry once, then report the code in plain words. |
