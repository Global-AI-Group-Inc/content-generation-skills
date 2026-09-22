# Workflow: from a brief to a rendered motion piece

1. **Look first.** `adobe_status` (host, version, bridge on), `adobe_get_project` (what is
   open, active comp, playhead). Never build into a project the user is editing without saying so.
2. **Read what is available.** Call `list_elements` (the shared Mira Elements library: overlays,
   backgrounds, transitions, LUTs, sounds, templates, fonts) and, if `$AE_LIBRARY/bank/BANK.md`
   exists, read it whole. Note the ids of the background, overlays, transitions, sound and
   templates you intend to use and look at their previews. Nothing available: say so and build
   with stock effects and the user's own footage only; never invent ids or paths.
3. **Beat grid.** Take the track the user gave, find the tempo and the first kick from the
   decoded audio (`ffmpeg` + `astats`, or count kicks on a waveform), and write the grid as a
   function. Every scene boundary and every cut is a grid value.
4. **Shot list.** One line per scene: time in, time out, the hero, the plate, the texture, the
   transition into the next scene, the sound. Show it to the user before building.
5. **Build scene by scene.** Library elements go in with `adobe_place_element` (time, duration,
   aspect, texts and controls for templates; fonts install first). Everything else is one script
   per scene, each loading the shared libraries with `$.evalFile`. Plates first, then subject,
   then overlays, then grade. Log to a file.
6. **Check.** After every scene: a bounding-box lint at 0.5 s steps and `adobe_export_frame`
   at two or three key times. Fix before moving on.
7. **Render.** `aerender` with a Best Settings template to an H.264 master, then ffmpeg for the
   final: audio from the WAV, optional LUT blend, loudness normalisation, faststart.
8. **Contact sheet.** `fps=2` tiles with timecodes over the whole piece, crop the details at
   full size. Only then show the result and ask for changes.
