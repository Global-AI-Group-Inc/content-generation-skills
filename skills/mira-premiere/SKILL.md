---
name: mira-premiere
description: >-
  Edit in the user's own Premiere Pro through the Mira MCP: read the timeline, cut talking footage on
  whole sentences from a transcript, take out silences, switch multicam angles by speaker, assemble a
  rough cut or a vertical reel from a cut plan in one call, mark chapters, add captions, then check
  the result frame by frame. Use it when the user says "edit this in Premiere", "смонтируй в
  премьере", "вырежи паузы", "собери рилс из интервью", "make a rough cut", "cut the podcast", or when
  adobe_status reports a connected Premiere Pro. Requires the Mira for Adobe panel with the bridge
  switched on. NOT for motion design (mira-after-effects) or for generating new footage
  (mira-generate).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira Premiere

The user's Premiere Pro is the edit bay. The tools that reach it:

- `adobe_status` — is it there, which app, the open project, the active sequence.
- `adobe_command` — typed timeline steps, each with a JSON input:
  - `get_timeline` — tracks with every clip (start, end, name, mediaPath, enabled, selected), fps,
    frame size, in/out and the playhead. Read it before every change and after it.
  - `assemble_edit {name?, clips, width?, height?}` — a NEW sequence matched to the first clip's
    footage, reframed when asked (1080x1920 for 9:16), the whole cut plan placed gaplessly, every
    clip fitted to the frame. The plan is the argument: once you have the in/out times, call it.
  - `apply_cut_plan {clips, at?}` — the same plan onto the active sequence, from `at` or its end.
  - `apply_cuts {cuts:[{s,e}], mode}` — remove sequence ranges on every unlocked track; `ripple`
    closes the gaps, `lift` leaves them.
  - `switch_multicam {segments:[{s,e,track}]}` — inside each range only that video track stays on.
  - `add_markers`, `create_subclips`, `import_captions {path|url}`, `set_sequence_format`,
    `fit_all_video {punch?}`, `open_sequence`, `set_playhead`, `save_project`.
- `adobe_contact_sheet` (up to 12 frames with timecodes) and `adobe_export_frame` at `time`.
- `adobe_import_generation` — a finished Mira generation (b-roll, music, a voice) into the project.
- `adobe_place_element` — Mira Elements media and sounds (no templates in Premiere).
- `adobe_execute_script` — ExtendScript for anything the commands do not cover.

A clip in a cut plan is `{source, in, out, track?, punch?, marker?}`: `source` is a `mediaPath` from
`get_timeline`, a project item name or a local file; `url` instead of `source` downloads it first;
`in` and `out` are SOURCE seconds; `track` is the 0-based video track (linked audio follows).

The words come from Mira, not from Premiere: `transcribe_video` (word timestamps, speakers, an .srt)
and `analyze_transcript` (`clean_cut` silences and `multicam` speaker turns are free; `clipper`,
`seo` and `chapters` cost a flat fee). Footage that lives only on the user's disk goes up first with
`create_upload` (kind `video`); only clients with file access can do that.

Not connected (`adobe_status.connected == false`): say how to switch the bridge on in the Mira panel
(Bridge MCP → Connect) and stop. Do not retry in a loop.

## When to use

- A podcast, interview or talking head: silences out, fluffs out, one take per line, captions.
- Two or more cameras of one conversation: the angle follows whoever speaks.
- Highlights for Reels, TikTok or Shorts from a long recording, reframed to 9:16.
- A rough cut assembled from a list of shots, or a b-roll montage cut to a track.

## Doctrine

**Name the job before the first cut.** Cleanup keeps every line and only removes air and fluffs.
Highlight keeps whole thoughts and drops the rest. Reorder moves whole answers. A target script
rebuilds a given text from takes. The cut points differ for each; ask when the brief is unclear.

**Speech is cut on sentences, never on a clock.** Every cut point in talking footage comes from the
transcript: a sentence or phrase boundary, with the breath going to the line that follows it.
Without a transcript, keep takes whole. Beat-driven cutting is for b-roll and music only.

**One take per line.** When a speaker repeats a line, keep the last complete take unless an earlier
one carries something the last lacks. Never splice half of one take to half of another into a
sentence nobody said.

**Lock the voice first.** Cut the dialogue, play it through, then lay b-roll, then titles, then
music, then captions. Anything placed before the voice is locked drifts out of sync on the next
trim.

**Every seam has a reason.** Cut on action, a jump cut only in a run of three or more, a hold for a
number or a quote, a match or a wipe by an object. Most seams are plain cuts; transitions are rare.

**Look at the timeline, not at the tool's answer.** After every change: `get_timeline` again (the
user may have edited between turns) and an `adobe_contact_sheet` at the cuts you made. A successful
call is not proof of a good edit.

The numbers (air, pauses, fillers, pace, loudness, the transition ladder) are in
`references/editing.md`. Read it before the first cut.

## Workflow

1. `adobe_status` → `adobe_command get_timeline`. Say what is there: sequences, tracks, length.
2. Ask the job and the platform (see Interview), one question at a time.
3. Speech: `create_upload` the source if needed → `transcribe_video` → `analyze_transcript
   clean_cut` (or `multicam`, `clipper`) → choose the cut points on sentence boundaries from the
   words, not only the silences.
4. Cleanup of the active sequence: `apply_cuts` with `ripple`. A new reel or a reordered cut:
   `assemble_edit` with the plan (`width` 1080, `height` 1920 for vertical).
5. Several cameras: `switch_multicam` with the speaker turns mapped to tracks; hold an angle at least
   two seconds unless the reaction is the point.
6. `adobe_contact_sheet` at each cut (cut-0.2, cut, cut+0.2) and at the start; fix what jumps.
7. B-roll and music with `adobe_import_generation`, then captions with `import_captions` (the .srt
   from `transcribe_video` or `add_captions`), chapters with `add_markers`.
8. `save_project` only when the user asks. Export stays with the user (File → Export → Media), or a
   script when they ask for one; `adobe_render` is After Effects only.

## Interview

Ask only what the brief leaves open:

1. The job: cleanup, highlights, reorder or a given script.
2. The platform and shape: 16:9 long form, or 9:16 for Reels, TikTok or Shorts, and the length.
3. What must stay: lines, names, a call to action, the speakers' order.
4. Music: none, the user's track, or one made with Mira.
5. Captions: none, a caption track, or burned in.

## Checklist

- Every speech cut sits on a sentence or phrase boundary; no word is clipped.
- No more than the allowed air at the head and tail of each line; pauses within the ranges.
- One take per repeated line; no spliced sentences.
- The hook lands in the first two seconds of a short.
- Music sits under the voice, not on top of it; the mix is checked at the loudest line.
- A contact sheet at every cut has been looked at; nothing is black between clips.
- The project is saved only when the user asked.
