# Workflow: from a brief to a rendered motion piece

1. **Look first.** `adobe_status` (host, version, bridge on, `busy`), `adobe_get_project` and
   `adobe_command list_layers` (what is open, the active comp, its layers). Never build into a
   project the user is editing without saying so; offer a new composition.
2. **Reference and brand.** Ask for one or two reference videos and name what to copy: the pace
   (shots per 10 s), the type (weight, case, size, how it enters), the transitions, the palette.
   Take the brand: logo files, colours, two typefaces, real product screenshots. Without these the
   piece defaults to centred text on a gradient with fades.
3. **Read what is available.** `list_elements` (backgrounds, overlays, transitions, LUT presets,
   sounds, templates with placeholders, fonts) and, if `$AE_LIBRARY/bank/BANK.md` exists, the bank.
   Look at the previews of what you intend to use. Never invent ids or paths.
4. **The beat.** Put the track in the composition and call `adobe_beat_markers` on it (mode
   `downbeats`, or `every` with 2 for a denser grid). Keep `grid_offset`, `beat_seconds`, the drops
   and the sections: every scene boundary, cut, sound hit and type entrance is a grid value. If the
   BPM is off by a half, double or triplet feel, run it again with `bpmHint`.
5. **Three storyboards.** Write three different directions as tables — Frame / Beat / On screen /
   Why — each true to the reference and the brand. The user picks one; do not build before that.
6. **Stills per scene.** Build every scene as a still (layers placed, type set, no animation yet)
   and show `adobe_contact_sheet` at one moment per scene. Fix the storyboard here: it costs seconds.
7. **Animate scene by scene.** Library elements go in with `adobe_place_element` (templates with
   `texts`, `controls` and `media`; a luma wipe at the cut with the incoming layer starting a little
   before it; a whoosh 0.3-0.5 s before a cut, a riser 1-2 s before a drop). Motion comes from the
   Kit (`adobe_apply_recipe`, or `MK.*` inside a script): `text_animate` for type, `parallax` and
   one `camera` move for depth, `transition` on the cuts, `keys` with named eases, `punch` on the
   bars. Structural steps go through `adobe_command` (`set_parent`, `precompose`, `add_marker`);
   whole scenes through `adobe_execute_script` with `MK.scene`. Plates first, then the subject,
   then overlays, then the grade.
8. **Check.** After every scene: `adobe_contact_sheet` at its key times (a transition at cut-0.2 /
   cut / cut+0.2) and the `check` recipe with the target `platform` (text out of frame, text on
   text, text under the platform's UI). Fix before moving on.
9. **Render.** `adobe_render` with the platform `preset` (reels, tiktok, shorts, youtube, master)
   and `upload: true` when the file should land in the Mira library; poll `adobe_render_status`
   with `waitSeconds`. A saved project renders in the background (the user keeps working); unsaved
   changes render inside After Effects, which is busy until it finishes. Loudness comes from the
   layer levels: the music around -14 LUFS integrated, voice above it.
10. **Director's notes.** Apply the user's notes as named changes, not as "make it better":

| Note | Change |
|---|---|
| "slow every zoom to 0.7x" | stretch the scale keys of every zoom by 1/0.7, keep their start |
| "hard cut here" | remove the transition at that marker, cut on the grid value |
| "hold it" / "hold N frames" | move the next scene's in-point by N frames, re-snap to the next beat |
| "push in on the button" | `camera` `push` over one bar, or scale 100 → 110-115 % toward the button's centre |
| "whip to the next shot" | `transition` style `whip` on the cut, `dur` 0.2-0.3 s |
| "match cut" | align the shape or motion of the outgoing and incoming shot on the cut frame |
| "punchier" | shorter entrances (0.25-0.35 s), stronger ease out, one more cut per bar |
| "calmer" | fewer cuts (one per bar or two), longer holds, gentle ease, no shake |
