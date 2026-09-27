# Soundtrack, voiceover and the mix

The operations here take a finished clip or track (one of `sourceGenerationId` or
`libraryItemId`) and give back a new one with the sound changed. `add_soundtrack` and
`voiceover_video` normalise their mix to -14 LUFS integrated with peaks under -1.5 dB, the level
social platforms play at, so none of them turns it up or down. When you finish a mix elsewhere,
in the user's After Effects or editor, aim for the same.

## Music for a clip: add_soundtrack or generate_audio

| | `add_soundtrack` | `generate_audio` kind `music` |
|---|---|---|
| Input | a finished clip, up to 600 s | a prompt or a plan of sections |
| The model | watches the clip (cuts, pace, mood) and writes to its length | writes to your prompt and your section lengths |
| Output | the clip with the music mixed in, plus the bare track | an mp3 |
| You control | a description, up to ten style tags, the mix | genre, tempo, key, sections, lyrics, a hit on a given second |
| Use it when | the picture is final and the music should follow it | the music comes first and the picture is cut to it, it has lyrics, it must hit given seconds, or it is reused across clips |

```
add_soundtrack {"sourceGenerationId": "<clip>",
  "description": "Tense pulsing electronic score that tightens with each cut and resolves on the final wide shot of the car",
  "tags": ["dark synthwave", "pulsing bass", "cinematic", "no vocals"],
  "mix": "under", "musicVolumeDb": -4}
```

- `description` says what the music should do, in English, with no artist names (music.md).
- `tags` are up to ten style words.
- `mix`: `under` (the default) keeps the clip's own sound and dips the music under its speech;
  `mix` keeps both at their levels, for ambience and effects that should stay loud; `replace`
  drops the clip's sound and leaves the music alone. A clip without sound gets music only in any
  mode.
- `musicVolumeDb` from -20 to +6: -4 by default for `under` and `mix`, 0 for `replace`. Go to -8
  or lower when the clip's dialogue or effects must lead.
- The music ends with the clip and fades out over the last 1.5 s. The bare track comes back in
  `files[]` with role `music`, for reuse in an editor.
- If the model that watches video is unavailable, the platform writes music of the clip's exact
  length from the description and tags alone. Write a description that works without the picture.
- Price: `estimate_cost {"kind": "soundtrack", "sourceSeconds": 15}`.

## Voiceover on a clip

`voiceover_video` writes the script as speech (v3 or Flash, speech.md), places it on the clip at
`startSeconds` and mixes it with the clip's own sound. Clips up to 300 s.

```
voiceover_video {"sourceGenerationId": "<clip>", "voiceId": "<id from list_voices>",
  "model": "v3", "language": "en", "startSeconds": 0.5, "original": "duck",
  "script": "Meet the lightest shoe we have ever made. Seven ounces. Zero compromise.",
  "captions": true, "captionStyle": "bold"}
```

- `original`: `duck` (the default) dips the clip's sound under the voice and brings it back in
  the gaps; `mute` leaves the voice alone; `keep` plays both at their levels, for a clip whose
  sound is quiet ambience.
- `captions: true` burns subtitles aligned to the script's exact words and adds an SRT.
  `captionStyle`: `clean` (small, low, for 16:9) or `bold` (large and higher, for vertical
  shorts). With captions on, keep audio tags and `<break>` tags out of the script: they are
  aligned as words and can show up in the subtitles. Direct the delivery with punctuation.
- Empty `voiceId` means the default voice.
- The result is the clip with the voice; the voice alone is in `files[]` with role `voiceover`,
  the subtitles with role `srt`.
- Price: `estimate_cost {"kind": "voiceover", "model": "v3", "chars": 72, "sourceSeconds": 10}` with
  the script's length and the clip's; model `"v3+captions"` or `"flash+captions"` prices the subtitles too.

### Timing the script

Room for the voice = clip length - `startSeconds`. English speech runs at about 2.5 words a
second; languages with longer words (German, Russian) nearer 2. Leave half a second at the end
for the picture to land:

`words that fit ≈ (clip seconds - startSeconds - 0.5) × 2.5`

A 10 s clip with the voice from 0.5 s holds about 22 English words. Tags, ellipses and pauses
add time. When the voice runs longer than the room, the platform speeds it up by at most 1.15×
and then holds the last frame until the voice ends, so the clip gets longer. Rewrite shorter
rather than rely on that: a sped-up read sounds rushed and a frozen last frame looks like a
mistake.

### Voice and music together

Voiceover first, then `add_soundtrack` with `under`: the music dips under the new voice. The
opposite order also works with `original: "duck"`, which dips the music and the clip's sound
together under the voice.

## Clean audio: isolate_voice

```
isolate_voice {"libraryItemId": "<uploaded clip>"}
```

Removes noise, music and room echo around speech. A clip comes back as a clip with the cleaned
sound, a track as a track; up to 30 minutes. Run it before `translate_video` (a noisy source
separates speakers worse and carries the noise into the dub), before `transcribe_video` and
`add_captions` (fewer recognition errors) and before `change_voice` (the changer copies noise).
Do not run it on a clip whose music or ambience the user wants to keep: only the voice survives.
Price: `estimate_cost {"kind": "isolate", "sourceSeconds": 90}`.

## Stems: separate_stems

```
separate_stems {"sourceGenerationId": "<track or clip>", "stems": 2}
```

- `stems: 2`: vocals and instrumental. `stems: 6`: vocals, drums, bass, guitar, piano, other.
- A track or the sound of a clip, up to 600 s. The result is an audio generation whose main link
  is the vocals; every stem is in `files[]` with role `stem:<name>` (`stem:vocals`,
  `stem:instrumental`, `stem:drums` and so on).
- Uses: an instrumental bed from a generated song to put under a voiceover in an editor; the
  drum stem to find the beat; a vocal alone for a remix; karaoke.
- Price: `estimate_cost {"kind": "stems", "model": "6", "sourceSeconds": 120}`.

## A face saying a new track: lipsync_video

Generate the speech first (`generate_audio` kind `speech`), then re-animate the mouth in a clip:

```
lipsync_video {"sourceGenerationId": "<clip>", "audioGenerationId": "<speech>",
  "model": "lipsync-2-pro", "syncMode": "cut_off"}
```

- The clip up to 60 s; the audio is a Mira audio generation (`audioGenerationId`) or an upload
  (`audioLibraryItemId`).
- `lipsync-2` by default; `lipsync-2-pro` for close-ups, sharper and pricier.
- `syncMode` when the lengths differ: `cut_off` (trim the longer), `loop`, `bounce`, `silence`
  (pad the audio) or `remap` (retime the video). Better still, make the clip as long as the speech.
- Works best on one face, large and frontal, mouth never covered, no speech of its own.
- Price: `estimate_cost {"kind": "lipsync", "model": "lipsync-2-pro", "sourceSeconds": 8}`.
