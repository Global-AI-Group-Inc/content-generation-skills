# Editing reference

Numbers and rules for cutting in Premiere through `adobe_command`. They are defaults: a reference the
user gives, or the material itself, wins.

## Speech

**Air at the edges of a line.** Keep at most 0.15 s before the first word and 0.2 s after the last.
A breath belongs to the line that follows it: cut before the inhale, never through it. Before a hard
consonant at the start of a word (p, b, t, k) leave about 50 ms, or the attack is clipped.

**Pauses.** Inside a thought 0.3–0.5 s, between blocks 0.6–1.0 s, after a comma 0.1–0.3 s; nothing
over 1.2 s unless the pause is the point. Once the speech clips are laid, `recompact_audio` with
`min_pause` 0.25 and `max_pause` 1.0 fixes ragged holes and rushed joins between clips in one pass
(it never touches the pauses inside a clip: those come from the transcript cut). Shorten long pauses down into these ranges; do not set
every pause to one length, or the speaker sounds like a metronome. `analyze_transcript clean_cut`
with `minSilenceMs` 600–800 and `paddingMs` 100–150 finds the candidates; the words decide.

**Fillers in two tiers.** Hesitation sounds (uh, um, lip smacks, false starts) go every time.
Discourse words (well, so, like, you know) stay unless they break the line; judge each in context,
never by a list.

**Takes.** One take per line in the cut. Default to the last complete take; use an earlier one up to
the point where it breaks only when it carries a set-up the last lacks.

**Joining different takes.** Match their loudness before you judge the cut: a jump in level reads as
a bad edit even when the words are right. Use L-cuts and J-cuts (the sound leads or trails the
picture by a few frames) where a hard join sounds abrupt, not everywhere.

**Order of passes.** Voice, then b-roll, then titles, then music, then captions. Re-cut the voice
and everything after it moves; that is why it goes first.

**Voice-over to picture.** Find the beats of the picture by looking (a contact sheet), not by
dividing the length. Budget about 2.5 words per second of picture. Check the real length of each
recorded line before laying it; never speed a clip up to make words fit.

## Seams

Each cut needs a reason:

- **Cut on action** — the movement starts in the outgoing shot and finishes in the incoming one.
- **Jump cut** — only in a run of three or more, so it reads as a style, not a mistake.
- **Hold** — stay on a number, a quote or a call to action until it can be read twice.
- **Match cut** — a shape, colour or motion repeats across the cut.
- **Wipe by an object** — something crosses the lens and the new shot is behind it.
- **Loop reset** — the last frame of a short leads back into the first.

An animated title is judged on the frame after it settles, not mid-move.

## Transitions

Climb this ladder and stop at the first rung that works:

1. A plain cut. Most seams want nothing else.
2. A native Premiere transition by its exact name (Cross Dissolve, Dip to Black, Film Dissolve)
   through `adobe_execute_script`. An empty list of transitions is not proof there are none.
3. A Mira Elements transition with `adobe_place_element`.
4. A keyframed fallback: a one-sided dissolve, a dip to black of 8–10 frames, a short blur dissolve,
   a punch-in on both sides of the cut.
5. A generated bridge between the last and first frames (`generate_video` with both frames) only for
   one hero seam; it costs credits.

## Short-form pace (Reels, TikTok, Shorts)

- The hook in the first 2.0 s: the strongest line or image first, context after.
- 45–50 cuts per minute on average, in waves: faster in the action, a breath before the payoff.
- In fast passages, shots of 1.2 s or less.
- A light punch-in of 115–125 % (`punch` 1.15–1.25) to hide a jump cut or lift a line; never 150 %.
- Change something every 3–5 s: framing, a b-roll insert, a caption style, a sound.
- Vertical: `assemble_edit` with `width` 1080, `height` 1920; keep faces and captions out of the
  bottom fifth and the right edge, where the platform draws its buttons.

## Sound

- Music under speech sits 15–20 dB below the voice; ramp it down and up over 200–500 ms around each
  line rather than switching. `music_bed` does this in one call (`duck_db` −15 to −20, ramps of
  0.3 s); `duck_music` re-ducks a bed that is already there after the speech changed.
- The music never decides the length: `music_bed` trims it to the last content clip and tiles a
  short track with crossfades instead of stretching it.
- Master loudness: about −10 to −12 LUFS for TikTok and Reels, −14 LUFS for YouTube and Shorts.
- Lay the music only after the voice is locked; cut the music on its own phrases, not mid-bar.

## Multicam

- The audio is the master: every angle follows the recorded sound, so a speech edit never pulls the
  picture out of sync.
- Speaker turns from `analyze_transcript multicam` map to video tracks: decide which track shows
  which speaker from `get_timeline` and a contact sheet, then `switch_multicam`.
- Hold an angle at least two seconds; cut to the listener only for a reaction worth seeing.

## Text in Premiere

- Captions: an .srt from `transcribe_video` or `add_captions` into `import_captions` (a caption track
  the user can restyle), or `add_captions` burned into the clip.
- Titles and lower thirds: the user's own .mogrt with `import_mogrt` (it lists the text fields) and
  `set_mogrt_text`, or a Mira Elements template in After Effects. Never generate text as an image.
- Before placing a title, look at the frame it goes on.
