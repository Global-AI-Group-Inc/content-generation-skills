---
name: mira-after-effects
description: >-
  Build motion pieces inside the user's own After Effects through the Mira MCP: read the project,
  write ExtendScript that adds plates, overlays, templates, type, transitions, sound and a grade,
  check frames, render and finish with ffmpeg. Use it when the user says "build this in After
  Effects", "собери ролик в афтере", "промо в After Effects", "make a motion reel", "add grain and
  a LUT", or when adobe_status reports a connected After Effects. Requires the Mira for Adobe
  panel with the bridge switched on. NOT for generating clips (mira-generate) or Blender scenes
  (mira-blender-scene).
license: MIT
metadata:
  version: "0.1.0"
---

# Mira After Effects

The user's After Effects is your compositor. Eight tools reach it: `adobe_status` (is it there,
which app, what is open), `adobe_get_project` (compositions and layers as data),
`adobe_execute_script` (ExtendScript, the way you change anything), `adobe_export_frame` (the
frame under the playhead), `adobe_import_generation` (a finished Mira generation as a layer),
`adobe_place_element` and `adobe_install_fonts` (an element from the Mira Elements library, placed
or installed by the panel) and `adobe_command` (a few typed commands: create a composition, add a
text or solid layer, set a keyframe, apply an effect, set a track matte). Everything runs on the user's machine and shows up
in the panel's log, so work like a careful colleague at their desk: look first, build in small
steps, show frames, never delete what you did not make.

## When to use

- A promo, a teaser, a title sequence, a lower third, captions, a logo reveal in After Effects.
- "Make it look less flat": grain, grade, overlays, light, depth over an existing composition.
- A rendered file from a composition, finished with music and a grade.

Not connected (`adobe_status.connected == false`): say how to switch the bridge on in the Mira
panel (Bridge MCP → Connect) and stop. Do not retry in a loop.

## Doctrine

**Flat comes from primitives.** Solids, text and position keys never look filmed. Every scene
needs a plate, a texture, a subject, something in front and a grade over all of it; see
`references/doctrine.md` for the eight rules and the pre-render check.

**Elements, not effects menus.** Rich pieces are assembled from footage: gradient plates, grain
and halftone overlays, light leaks and wipes on the cuts, whooshes and hits under them, template
projects for type and mockups, one LUT for the whole piece. Two sources, in this order:

- The **Mira Elements library**, available to every user: `list_elements` (kinds overlay,
  background, transition, lut, sfx, template, font; all Mira originals), `get_element` for a
  template's texts and controls, then `adobe_place_element` to drop it into the active
  composition at a time, and `adobe_install_fonts` for the open-licence fonts a template needs.
  The panel downloads the file, so nothing else is required from the user.
- A **private bank** on the user's machine, when `$AE_LIBRARY/bank/BANK.md` exists (default
  `~/AE-Library`): the layout is in `references/bank-schema.md`, it is used through
  `adobe_execute_script` and its recipes.

Without either, build with stock effects and the user's own footage and say so. Never invent
element ids or file paths.

**Scripts are ES3 and run blind.** `adobe_execute_script` takes at most 40 000 characters, returns
only the `result` variable and times out at 180 s; libraries load with `$.evalFile`, progress goes
to a log file. The rules that break scripts (string plus object, the LUT dialog, 0-based
`app.effects`, expressions on Source Text, opacity through parents, time remap loops) are in
`references/recipes.md`. Read it before the first script.

**Everything on the beat.** Measure the tempo and the first kick from the decoded audio; scene
boundaries, cuts, sound hits and type entrances are grid values. A cut off the grid is a bug.

**Verify with frames, not with faith.** After every scene: a bounding-box lint over text layers
and an exported frame at the key times. After the render: a contact sheet with timecodes, and
details cropped at full size. Only then show the result.

## Workflow

`adobe_status` → `adobe_get_project` → `list_elements` and, if present, the bank → beat grid →
shot list (one line per scene, shown to the user) → one script per scene, elements placed with
`adobe_place_element` or the bank recipes → lint + frames → `aerender` → ffmpeg finish (WAV
audio, optional LUT blend, loudness, faststart) → contact sheet. Details and commands are in
`references/workflow.md`.

## Interview

Ask only what the brief leaves open, one question at a time:

1. Format and length: 9:16 or 16:9, seconds, fps.
2. The track, or none; where the drop is if they know.
3. What must appear exactly: words, logo files, footage, brand colours and typefaces.
4. Mood in one line: which reference they liked and why.
5. Whether to build into the open project or a new one, and where to save.

## Checklist

- Every scene has at least three planes and one thing that glows or leaks light.
- Grain and vignette on the whole piece, one LUT, footage pre-graded before import.
- Every cut on a beat with a transition clip and a sound under it.
- Two typefaces at most; type never enters onto an empty frame.
- Text layers checked for overlap and out-of-frame at 0.5 s steps.
- Rendered file looked at as a contact sheet before it is shown.

## Do not

Do not run destructive scripts (removing items, overwriting files, `app.newProject()`) without
asking. Do not add `Apply Color LUT` from a script. Do not build for more than 40 000 characters
in one call or wait on a call past 180 s; batch and log instead. Do not ship third-party pack
names or local paths in anything public. Do not spend generation credits from this skill; footage
comes from the user, the bank or a `mira-generate` call they approved.
