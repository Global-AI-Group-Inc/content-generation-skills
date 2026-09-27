# Dubbing, captions and transcripts

## Dub a clip: translate_video

The speech of a clip is transcribed, translated and spoken again in the target language by
voices matched to each speaker, then mixed back over the clip's music and ambience. 70+ languages,
clips up to 180 s.

```
translate_video {"sourceGenerationId": "<clip>", "targetLang": "es", "sourceLang": "en",
  "numSpeakers": 1, "lipsync": true, "dropBackground": true}
```

| Parameter | What it does | When to set it |
|---|---|---|
| `targetLang` | ISO-639-1 code of the new language: `es`, `de`, `fr`, `pt`, `it`, `ja`, `ko`, `zh`, `hi`, `ar`, `ru`... | always |
| `sourceLang` | the language spoken now; empty detects it | short clips, mixed languages, strong accents |
| `numSpeakers` | how many people speak; 0 detects it | whenever you know it: a wrong count merges two people into one voice or splits one into two |
| `lipsync` | re-animates the mouths to the new speech; an add-on that costs more and takes longer | faces on camera, close-ups, talking heads; skip it for off-screen narration and wide shots |
| `dropBackground` | leaves only the dubbed voice, without the original music and ambience | a monologue to camera whose background is noise; never when the music or the room is part of the clip |
| `highestResolution` | keeps the source's full resolution in the result | finals |
| `disableVoiceCloning` | speaks with similar library voices instead of recreating each speaker's own voice | the speaker is not the user or has not agreed to have their voice reproduced; a source too noisy to clone well |
| `startTime` / `endTime` | dubs only that range of the clip, in seconds | one line or one scene of a longer clip |

- Clean a noisy source with `isolate_voice` first (mix.md), then dub the cleaned clip.
- Translated speech often runs longer than the original (Spanish and German by a fifth or more);
  the dub is fitted to the original timing, so dense speech gets faster. Clips with pauses
  between sentences dub best.
- For copy that must be exact (a brand line, a legal sentence, a price), translate the script
  yourself and use `voiceover_video` in the target language instead: you choose every word, the
  voice is a new one.
- Price: `estimate_cost {"kind": "translate", "sourceSeconds": 45}`; with lip sync add
  `"model": "lipsync"`.

## Subtitles: add_captions

Burns subtitles into the clip and returns an SRT and a word-timed transcript beside it, in
`files[]` with roles `srt` and `transcript`. Clips up to 30 minutes.

```
add_captions {"sourceGenerationId": "<clip>", "style": "bold"}

add_captions {"sourceGenerationId": "<clip>", "language": "en", "style": "clean",
  "script": "Meet the lightest shoe we have ever made. Seven ounces. Zero compromise."}
```

- With `script` the text is aligned to the speech word by word: the captions say exactly what you
  wrote, with brand names and punctuation right. Use it whenever the words are known (a
  voiceover you wrote, an ad read).
- Without `script` the speech is recognised by Scribe v2 (90+ languages). Good for interviews
  and street talk; check names and brand terms in the result.
- `style`: `clean` is small and low, for 16:9 and talking heads; `bold` is large and set higher,
  clear of the buttons and caption bars of vertical platforms, for 9:16 shorts.
- `language` is an ISO-639-1 hint; set it on a dubbed clip to the dub's language.
- Burned captions cannot be switched off. For YouTube or any platform that takes a caption file,
  upload the SRT with the clean clip instead.
- `voiceover_video` with `captions: true` does the same in one step for a voice it adds itself.
- Price: `estimate_cost {"kind": "captions", "sourceSeconds": 40}`.

## Transcripts and edit decisions

`transcribe_video` turns speech into data; `analyze_transcript` turns that data into an edit.

```
transcribe_video {"libraryItemId": "<uploaded interview>", "language": "en", "diarize": true}
analyze_transcript {"transcriptGenerationId": "<transcript>", "task": "clipper", "platform": "reels", "maxClips": 5, "clipSeconds": 30}
```

- `transcribe_video` takes a clip or a track up to 30 minutes and returns a generation of kind
  `transcript`: in `files[]` a JSON (`text`, `words` with start and end times and a speaker,
  `segments`, `speakers`, `language`) and an SRT. `diarize` (on by default) labels speakers.
- `analyze_transcript` takes that generation's id:
  - `clean_cut` (free): the silences to remove, tuned by `minSilenceMs` and `paddingMs`.
  - `multicam` (free): the timeline split by speaker, for cutting between two cameras.
  - `clipper`: the best short clips with a title and a hook each, tuned by `platform`,
    `maxClips` and `clipSeconds`.
  - `seo`: a title, a description, tags, hashtags and chapters.
  - `chapters`: chapter markers only.
- The result is one JSON file in `files[]` with role `analysis`. The cuts themselves happen in an
  editor or in the user's After Effects; Mira returns the decisions, not a cut clip.
- Price: `estimate_cost {"kind": "transcribe", "sourceSeconds": 1200}`; for analysis
  `{"kind": "analysis", "model": "clipper"}`.

## Which one first

| Goal | Chain |
|---|---|
| captions for a clip whose words you know | `add_captions` with `script` |
| captions for an interview | `add_captions` alone; it recognises the speech itself |
| exact captions for an interview with names and jargon | `transcribe_video` → correct the text → `add_captions` with that text as `script` |
| a dub with captions | `translate_video` → `add_captions` with `language` = the target |
| shorts from a long talk | `transcribe_video` → `analyze_transcript` `clipper` → cut → `add_captions` `bold` per short |
| a tighter talking-head clip | `transcribe_video` → `analyze_transcript` `clean_cut` → cut in the editor |
| a title, a description and chapters for a video | `transcribe_video` → `analyze_transcript` `seo` |
