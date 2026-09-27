# Music

`generate_audio` kind `music` on Music v2.5: from 3 to 600 seconds, instrumental or sung, from
one prompt or from a plan of sections whose lengths the model keeps. For music that has to follow
a clip that already exists, `add_soundtrack` usually fits better (mix.md).

## Two ways to call it

A prompt alone, when the length matters and the inner structure does not:

```
generate_audio {"kind": "music", "durationSeconds": 30, "instrumental": true,
  "text": "Upbeat funk-pop instrumental for a sneaker ad, 118 BPM, E minor. Slap bass, glassy electric piano chords, chopped disco strings, tight four-on-the-floor kick. Opens with a filtered two-bar intro, the full groove lands on bar three, builds to a brighter final chorus and ends on a hard stop with one short reverb tail. Punchy, wide, polished mix."}
```

A plan of sections, when something has to happen at a given second: a drop on the cut, a lyric
on the product shot, a final hit on the logo. Section lengths are enforced, which a prompt alone
never guaranteed ("final hit at 17 s" in a prompt was routinely ignored).

1. Ask for a draft plan. It is free.

```
plan_music {"prompt": "Punchy electro house for a 15 second sneaker ad, 128 BPM, F minor, instrumental, drop on the product reveal", "durationSeconds": 15}
```

2. It returns `sections` (each with `name`, `durationSeconds`, `lyrics`, `directions`, `styles`,
   `excludeStyles`) and global `styles`. Edit them: lengths to whole bars (below), lyrics, the one
   direction per section that matters.
3. Send the edited plan:

```
generate_audio {"kind": "music", "instrumental": true,
  "styles": ["electro house", "128 bpm", "F minor", "punchy kick", "sidechained synth bass", "bright supersaw lead"],
  "excludeStyles": ["acoustic guitar", "lo-fi", "trap hi-hats"],
  "sections": [
    {"name": "Intro", "durationSeconds": 3.75, "styles": ["filtered", "sparse"], "directions": "low-pass filter opening over two bars"},
    {"name": "Build", "durationSeconds": 3.75, "styles": ["snare roll", "rising riser"]},
    {"name": "Drop",  "durationSeconds": 7.5,  "styles": ["full energy", "heavy kick"], "directions": "drop hits on the first beat, hard stop at the end"}
  ]}
```

Rules of the plan:

- Up to 30 sections, each from 3 to 120 seconds; the total stays within 600 s. Anything else fails
  with `composition_invalid` before a credit is spent.
- Global `styles` set the genre and go into the first section: six or seven genre, tempo, key and
  instrument styles. A section's own `styles` are only the shift there: "half-time", "stripped
  back", "full band", "choir enters".
- `excludeStyles` lists what must not appear. Name the likely mistakes only, not everything you
  can think of.
- `name` is the section's role: Intro, Verse, Pre-Chorus, Chorus, Bridge, Drop, Breakdown, Outro.
  Pass it bare; the brackets are added.
- `directions` is a short performance note: "guitar solo", "beat drops out", "vocals a cappella".
  Pass it bare; the braces are added.
- Price: `estimate_cost {"kind": "audio", "model": "music", "durationSeconds": 15}`.

## Timing to the cut: count in bars

In 4/4 one bar lasts `240 / BPM` seconds. Give every section a whole number of bars and each
boundary lands on a downbeat. That downbeat is where the drop, the hit or the change happens, so
put your cuts there.

| BPM | 1 bar | 2 bars | 4 bars | 8 bars |
|---|---|---|---|---|
| 90 | 2.667 s | 5.333 s | 10.667 s | 21.333 s |
| 100 | 2.4 s | 4.8 s | 9.6 s | 19.2 s |
| 110 | 2.182 s | 4.364 s | 8.727 s | 17.455 s |
| 120 | 2.0 s | 4.0 s | 8.0 s | 16.0 s |
| 128 | 1.875 s | 3.75 s | 7.5 s | 15.0 s |
| 140 | 1.714 s | 3.429 s | 6.857 s | 13.714 s |
| 150 | 1.6 s | 3.2 s | 6.4 s | 12.8 s |
| 174 | 1.379 s | 2.759 s | 5.517 s | 11.034 s |

A section under 3 s is refused. Two bars clear that up to 160 BPM; faster than that, give every
section at least four bars.

The example above: 128 BPM, intro two bars (3.75 s), build two bars (3.75 s), drop four bars
(7.5 s). The drop lands at 7.5 s, the product cut goes there, and the track ends at exactly 15 s.

When the moment is fixed by the picture, fit the tempo to it. The bars before a moment at `t`
seconds are `t × BPM / 240`; for `n` whole bars the tempo is `240 × n / t`. A logo at 17.0 s:
at 120 BPM that is 8.5 bars, off the grid. Nine bars at 127 BPM put it at 17.01 s, so the plan
is intro 2 bars (3.780 s), build 3 (5.669 s), drop 4 (7.559 s), then an outro of 2 bars
(3.780 s) whose first beat, at 17.01 s, is the final hit.

The section boundaries are exact; the beat inside a section is the model's reading of your tempo,
close but not sample-exact. Check the result against the picture. In the user's After Effects,
`adobe_beat_markers` measures the real grid (mira-after-effects).

## Writing the prompt

Order the parts the way a producer would brief a composer:

1. What it is for: "for a 30 second sneaker ad", "under a cooking tutorial", "podcast intro".
2. Genre and subgenre: "melodic techno", "90s boom-bap hip-hop", "cinematic orchestral hybrid".
3. Tempo and key: "96 BPM, D minor". Both steer the feel more than adjectives.
4. Three to five instruments by name: "nylon-string guitar, upright bass, brushed drums".
5. The energy over time: how it opens, where it lifts, how it ends.
6. Vocals or instrumental. For vocals: voice type, delivery and language ("breathy female alto,
   close-mic, English").
7. Production words: "tape-saturated", "wide stereo", "dry and intimate", "big room reverb",
   "sidechained pads", "punchy radio mix".
8. The ending: "hard stop", "final chord rings out", "fade out". Without it the model decides,
   and an ad needs a clean end.

Moods alone ("epic", "happy") give generic stock music. Tempo, instruments and the arc give music
that fits a cut.

## Lyrics

- One sung line per text line, up to 30 lines per section (the name and the direction count as
  lines) and 200 characters per line.
- One line per one or two bars. An 8-bar chorus holds 4 to 8 lines; more gets rushed, fewer
  gets held notes and gaps.
- Write in the language to be sung and say that language in the styles ("Spanish-language vocals").
- Repeat the hook line in every chorus exactly; the model then sings it the same way.
- `instrumental: true` drops all lyrics and excludes vocals for you.

```
{"name": "Chorus", "durationSeconds": 16, "styles": ["full band", "layered harmonies"],
 "lyrics": "We run it back tonight\nCity humming in the light\nNothing's heavy, nothing's slow\nWe run it back, and go"}
```

## No artist names

The provider refuses prompts that name an artist, a band or a song, and lyrics of existing songs,
with `music_prompt_rejected`. The error carries a suggested prompt; use it or rewrite. Describe
what the reference sounds like instead:

| Instead of | Write |
|---|---|
| "like a famous 80s synth-pop band" | "1980s synth-pop, gated-reverb snare, analog polysynth pads, chorus-heavy bass, deep male baritone vocal" |
| "in the style of a well-known lo-fi channel" | "lo-fi hip-hop, 78 BPM, dusty vinyl crackle, muted jazz piano, lazy swung drums, warm tape wobble" |
| "a stadium rock anthem like <band>" | "stadium rock anthem, 140 BPM, big open power chords, pounding floor toms, gang vocals on the chorus" |

The same holds for voices: describe the timbre, never the singer.

## Loops and songs

- A loop (a background under a longer video, a game level, a waiting screen): one or two
  sections, a length of whole bars, and in the prompt "seamless loop: no intro, no ending,
  constant energy, the last bar leads back into the first". Music has no loop switch (that is an
  effects option); cut the file on a bar line in the editor.
- A song: Intro, Verse, Chorus, Bridge, Outro with lyrics; two to three minutes is the usual
  length, 600 s the limit.
- Ad cut-downs (15, 30, 60 s): give each length its own plan so each one ends properly, rather
  than fading a long track out early.

## Using the track

The mp3 is in `urls[0]`. It can go into `referenceAudioUrls` of `generate_video` on
`seedance-2-5` (bound as `@Audio1`, with at least one photo or clip attached) so the picture
takes its rhythm; into the user's After Effects for beat markers and a cut; or through
`separate_stems` when only the drums or only the instrumental are needed (mix.md).
