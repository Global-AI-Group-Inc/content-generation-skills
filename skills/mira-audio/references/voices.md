# Voices

## What the account can use

`list_voices` shows two groups: the platform's voices (premade and professional voices every
account shares) and the user's own voices (designed on Mira, or a clone of their own voice made on
the website). Other users' voices are never visible and cannot be used.

```
list_voices {"scope": "all"}
list_voices {"scope": "library", "gender": "male", "accent": "american", "useCase": "advertisement"}
list_voices {"scope": "mine"}
```

`scope`: `all` (both groups), `library` (the platform's only), `mine` (the user's only). Filters
and how to present the choice are in speech.md. Every voice works in `generate_audio` speech and
dialogue, `voiceover_video` and `change_voice`.

## Design a voice: design_voice → save_voice

When no voice in the library fits, describe one. `design_voice` returns three previews of the
description; the user listens and `save_voice` keeps one as their own.

```
design_voice {"description": "A warm, confident woman in her late thirties with a light Scottish accent. Mid-low pitch, smooth and a little husky, unhurried pace, friendly authority. Narrates a premium outdoor-gear commercial. Studio-quality close-mic recording, no room echo.",
  "language": "en",
  "previewText": "Out here, the weather doesn't care about your plans. So we built a jacket that doesn't either. Tested on three continents, in rain, wind and snow."}
```

- `description`: 20 to 1000 characters. Write it the way a casting director briefs an actor:

| Part | Examples |
|---|---|
| age and gender | "a man in his early twenties", "an elderly woman around seventy", "a child of about eight" |
| accent | "light Scottish accent", "neutral American", "Brazilian Portuguese speaker", "Received Pronunciation" |
| timbre | "deep and gravelly", "bright and slightly nasal", "breathy", "warm and husky", "thin and reedy" |
| pace and energy | "fast and punchy", "unhurried with long pauses", "calm authority", "barely contained excitement" |
| context | "hypes a gaming stream", "reads bedtime stories", "explains a banking app", "cartoon creature" |
| recording | "studio-quality close-mic", "dry, no reverb", "old telephone line", "radio broadcast" |

- `previewText` is the line the previews read. Give the kind of text the voice will really say,
  at least 100 characters; shorter or empty, and the provider writes its own line.
- `language` sets the language of the previews.
- The result carries a `designId` and three previews, each with a `generatedVoiceId`, a
  `previewUrl` and a length. Play the links to the user; the ids stay with you.
- A small flat fee per call, reported in the result. A retake is another call: change the
  description rather than repeating it.

```
save_voice {"designId": "<designId>", "generatedVoiceId": "<the preview the user picked>", "name": "Isla - outdoor narrator"}
```

- Save within 24 hours. After that the previews expire and `save_voice` answers
  `voice_not_found`: design again.
- Saving is free and the voice appears in `list_voices` scope `mine` at once.
- A user keeps up to five designed voices (`voice_quota_exceeded` past that). Offer to delete
  one they no longer use; `voice_slots_exhausted` instead means the platform itself is full for
  now, not the user.

More descriptions that work:

- "An energetic young man in his early twenties, American, bright and slightly nasal, fast and
  punchy delivery with a grin in his voice. Hypes a new sneaker drop for a streaming audience.
  Clean, dry recording."
- "An elderly male storyteller around seventy, deep gravelly voice with a soft rasp, slow and
  deliberate, long pauses, Received Pronunciation. Reads fairy tales by a fireplace. Warm,
  intimate recording."
- "A small mischievous forest creature, high-pitched, squeaky and quick, giggles between words,
  a slight lisp. A cartoon voice for a children's animation."

## Delete a voice

```
delete_voice {"voiceId": "<one of the user's own voices>"}
```

Only the user's own voices can be deleted, and it is permanent: anything that used the voice
keeps its audio, but new calls with it fail with `voice_not_found`. Always ask first, naming the
voice.

## Re-voice a performance: change_voice

`change_voice` keeps the words, the timing and the intonation of a recording and replaces the
voice. A clip comes back as a clip with the new voice, a track as a track; up to 120 s.

```
change_voice {"libraryItemId": "<the user's own recording>", "voiceId": "<id from list_voices>", "removeNoise": true}
```

- The fastest way to an exact performance: the user records the read with the timing and
  emotion they want, on a phone, and `change_voice` turns it into the brand voice.
- It also makes a character sound the same across clips whose model gave each clip a different
  voice.
- `removeNoise` cleans the source first; for a noisy room run `isolate_voice` before it (mix.md).
- Price: `estimate_cost {"kind": "voice_change", "sourceSeconds": 30}`.

## What is never done

- No voice of a real person: no celebrity, no politician, no "sounds like" a named actor, singer
  or streamer, in a design description or anywhere else. Describe qualities, never a person.
- No cloning through the agent. A clone of the user's OWN voice is made only on the Mira website:
  the user reads a consent phrase with a one-time code aloud, the recording is checked, and one
  clone per account is allowed. It may not be switched on yet. If the user asks, point them to the
  Voices section of the website and continue with a library or designed voice; never promise a
  clone as a step of the plan, and never help clone someone else.
- `change_voice` and `translate_video` on someone else's speech only when the user has the right
  to use that recording; for dubbing a third party prefer `disableVoiceCloning`
  (dub-captions.md).
