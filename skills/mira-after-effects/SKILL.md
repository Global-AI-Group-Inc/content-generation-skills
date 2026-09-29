---
name: mira-after-effects
description: >-
  Build motion pieces inside the user's own After Effects through the Mira MCP: read the project,
  mark the beat of the music, animate with the Mira Motion Kit (kinetic type, camera depth,
  velocity-matched transitions, expressions, grade) or ExtendScript, add plates, overlays,
  templates and sound, check contact sheets, render on the user's machine. Use it when the user says "build this in After
  Effects", "собери ролик в афтере", "промо в After Effects", "make a motion reel", "add grain and
  a LUT", or when adobe_status reports a connected After Effects. Requires the Mira for Adobe
  panel with the bridge switched on. NOT for generating clips (mira-generate) or Blender scenes
  (mira-blender-scene).
license: MIT
metadata:
  version: "0.5.0"
---

# Mira After Effects

The user's After Effects is your compositor. The tools that reach it:

- `adobe_status` — is it there, which app, what is open, what the panel is `busy` with, running renders.
- `adobe_get_project`, `adobe_command list_layers` — compositions and layers as data (type, in/out,
  3D, parent, blend, track matte, effects, markers).
- `adobe_execute_script` — ExtendScript, the way you build anything; `$.writeln` / `print()` come back
  as `output`.
- `adobe_command` — typed steps without a script (`set_keyframes` with ease, markers, `precompose`,
  `set_parent`, `set_time`, `set_work_area`, `open_comp`, `set_track_matte` and the rest it lists).
- `adobe_apply_recipe` — the Mira Motion Kit (one undo step each): type, eases, transitions, camera,
  expressions, effects, grade, captions, safe zone, check, and tricks — text behind the subject, video
  in letters, pixel break, counter, split-flap, chart, 3D models, the Blender camera, variants.
  In scripts the same functions are the global `MK`.
- `adobe_reference` — a reference video measured: cuts, shot lengths, pace, palette, a brief and a
  sheet of every shot; `makeRef` also builds a REF composition with cut markers.
- `adobe_beat_markers` — tempo, beat grid, downbeats, drops and sections, as `mira:*` markers.
- `adobe_export_frame` (one frame) and `adobe_contact_sheet` (up to 12 frames with timecodes).
- `adobe_import_generation` — a finished Mira generation as a layer (with its matte, if any).
- `adobe_place_element` and `adobe_install_fonts` — an element from the Mira Elements library.
- `adobe_render`, `adobe_render_status`, `adobe_render_cancel` — an MP4 of a composition, rendered
  on the user's machine, optionally uploaded to the Mira library.

Everything runs on the user's machine and shows up in the panel's log, so work like a careful
colleague at their desk: look first, build in small steps, show frames, never delete what you did
not make.

## When to use

- A promo, a teaser, a title sequence, a lower third, captions, a logo reveal in After Effects.
- "Make it look less flat": grain, grade, overlays, light, depth over an existing composition.
- A rendered file from a composition, finished with music and a grade.

Not connected (`adobe_status.connected == false`): say how to switch the bridge on in the Mira
panel (Bridge MCP → Connect) and stop. Do not retry in a loop.

## Doctrine

**Flat comes from primitives.** Solids, text and position keys never look filmed. Every scene
needs a plate, a texture, a subject, something in front and a grade over all of it; see
`references/doctrine.md` for the ten rules (the last two: against the default look, platforms) and the pre-render check.

**Elements, not effects menus.** Rich pieces are assembled from footage: gradient plates, grain
and halftone overlays, light leaks and wipes on the cuts, whooshes and hits under them, template
projects for type and mockups, one LUT for the whole piece. Two sources, in this order:

- The **Mira Elements library**, available to every user: `list_elements` (kinds overlay,
  background, transition, lut, preset, sfx, template, font), `get_element` for a template's texts,
  controls and placeholders, then `adobe_place_element` to drop it into the active composition at
  a time. Templates take `texts`, `controls` and `media` (a generation id or https link per
  placeholder such as "Media 1" or "Logo"); a luma wipe becomes the track matte that reveals the
  layer starting at `time` (or `options.incoming`); an animation preset goes on `options.layer`;
  the variant closest to the composition's shape is picked. The panel downloads the files and
  installs the fonts, so nothing else is required from the user.
- A **private bank** on the user's machine, when `$AE_LIBRARY/bank/BANK.md` exists (default
  `~/AE-Library`): the layout is in `references/bank-schema.md`, it is used through
  `adobe_execute_script` and its recipes.

Without either, build with stock effects and the user's own footage and say so. Never invent
element ids or file paths.

**Kit first, raw keys last.** Motion that looks designed comes from curves, stagger, depth and
cuts that carry speed, not from linear position keys. Reach for `adobe_apply_recipe` (or `MK.*` in
a script) before hand-written keyframes: `text_animate` for type, `parallax` plus one `camera` move
for depth, `transition` on the cuts, `expression bounce` after landings, `grade` over the piece and
`check` before the render. The catalogue, eases and patterns are in `references/motion-kit.md`.

**Scripts are ES3.** `adobe_execute_script` takes at most 40 000 characters and times out at 180 s
(the script keeps running in the app; later calls wait their turn); it returns `result` and what the
script printed. Prefer `adobe_command` for single steps. The rules that break scripts (string plus object, the LUT dialog, 0-based
`app.effects`, expressions on Source Text, opacity through parents, time remap loops) are in
`references/recipes.md`. Read it before the first script.

**Everything on the beat.** `adobe_beat_markers` on the music layer gives the grid (beat k at
`grid_offset + k * beat_seconds`), the downbeats and the drops as markers. Scene boundaries, cuts,
sound hits and type entrances are grid values; a cut off the grid is a bug. When the tempo reads
as a half, double or triplet feel, pass `bpmHint` (the BPM the track was made at) or one of the
returned `alternatives`.

**A reference, not a default.** Without one, motion defaults to centred text on a gradient with
fades, and every piece looks the same. Ask for one or two reference videos and measure them with
`adobe_reference`: match its average shot length and cuts per 10 s, take its palette, look at the
sheet of shots for framing and type. Name what you copy (pace, type, transitions) and hold to it.
The anti-default rules are in `references/doctrine.md`.

**The brand is already there.** A brand saved in the panel works in every recipe as `"brand:accent"` (colours)
and `"brand:display"` (fonts); see `references/motion-kit.md`.

**Stills before motion, frames before faith.** Build each scene as a still first and show
`adobe_contact_sheet` at one moment per scene: fixing a storyboard costs seconds, fixing a render
costs minutes. After animating: a contact sheet at the key times of each scene (a transition at
cut-0.2 / cut / cut+0.2). After the render: look at it before you show it.

## Workflow

`adobe_status` → `adobe_get_project` → `adobe_reference` and the brand → `adobe_beat_markers` → three
storyboard variants, the user picks one → stills per scene, `adobe_contact_sheet` → animation
with the Kit, elements placed with `adobe_place_element` → `check` recipe and contact sheets →
`adobe_render` → `adobe_render_status` → the user's notes, applied as named changes → once they like the
render, offer once to write it up as a community guide (`draft_mira_guide`, tools `after-effects`, `mira-adobe`).
Details are in `references/workflow.md`.

## Interview

Ask only what the brief leaves open, one question at a time:

1. Format and length: 9:16 or 16:9, seconds, fps.
2. The track, or none; its BPM if they know it.
3. What must appear exactly: words, logo files, footage, brand colours and typefaces.
4. One or two reference videos, and what in them to copy.
5. Whether to build into the open project or a new one, and where to save.

## Checklist

- Every scene has at least three planes and one thing that glows or leaks light.
- Grain and vignette on the whole piece, one LUT, footage pre-graded before import.
- Every cut on a beat with a transition clip and a sound under it.
- Two typefaces at most; type never enters onto an empty frame.
- `check` finds no issues for the target platform; a `safe_zone` guide stays in while you build.
- Captions word-timed (`captions` recipe); the pace close to the reference's average shot.
- Named eases, at most two per scene; the entrance longer than the exit.
- A still of every scene approved before anything moves.
- Rendered file looked at as a contact sheet before it is shown.

## Do not

Do not run destructive scripts (removing items, overwriting files, `app.newProject()`) without
asking. Do not add `Apply Color LUT` from a script (it opens a dialog that hangs the app); a LUT is
a `.ffx` element. Do not build for more than 40 000 characters in one call; batch instead. Do not
pass `save_project` to `adobe_render` without asking: it saves the user's project. Do not ship third-party pack
names or local paths in anything public. Do not spend generation credits from this skill; footage
comes from the user, the bank or a `mira-generate` call they approved.
