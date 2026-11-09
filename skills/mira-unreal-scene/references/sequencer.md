# Sequencer: camera moves and playblasts

`unreal_playblast` records a Level Sequence through its camera cuts. Build the shot first: a CineCamera,
a Level Sequence in `/Game/Mira/Sequences`, the camera bound with a transform track, and a Camera Cut
track pointing at it.

## A camera push in 3 seconds

```python
import unreal
actors = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
cam = next(a for a in actors.get_all_level_actors() if a.get_actor_label() == "Cam_Main")

tools = unreal.AssetToolsHelpers.get_asset_tools()
seq = tools.create_asset("SEQ_Shot01", "/Game/Mira/Sequences", unreal.LevelSequence,
                         unreal.LevelSequenceFactoryNew())
fps = 24
seq.set_display_rate(unreal.FrameRate(fps, 1))
seq.set_playback_start(0)
seq.set_playback_end(3 * fps)

binding = seq.add_possessable(cam)
track = binding.add_track(unreal.MovieScene3DTransformTrack)
section = track.add_section()
section.set_range(0, 3 * fps)

# Location X, Y, Z, then Rotation roll, pitch, yaw, then Scale X, Y, Z.
ch = section.get_all_channels()
loc = cam.get_actor_location()
ch[0].add_key(unreal.FrameNumber(0), loc.x)
ch[0].add_key(unreal.FrameNumber(3 * fps), loc.x + 200)      # 2 m forward
ch[2].add_key(unreal.FrameNumber(0), loc.z)
ch[2].add_key(unreal.FrameNumber(3 * fps), loc.z)

cuts = seq.add_track(unreal.MovieSceneCameraCutTrack)
cut = cuts.add_section()
cut.set_range(0, 3 * fps)
cut.set_camera_binding_id(seq.get_portable_binding_id(seq, binding))

unreal.LevelSequenceEditorBlueprintLibrary.open_level_sequence(seq)
print(seq.get_path_name())
```

Channels without keys keep the actor's current value. Key only what moves.

## Traps

- **Names moved between 5.x versions.** `get_all_channels` / `get_channels_by_type`,
  `add_master_track` / `add_track`, `get_binding_id` / `get_portable_binding_id`: when a call is missing,
  ask `unreal_search_api` for the version the user runs instead of guessing.
- **Frames vs ticks.** `set_range` and `add_key` take display-rate frames in the scripting API; set the
  display rate before keying.
- **Possessable vs spawnable.** `add_possessable` drives the actor already in the level, so the user sees
  the camera move in the viewport; do not convert it to a spawnable.
- **Focus.** A CineCamera focuses at a fixed distance by default; for a push, set
  `focus_settings.manual_focus_distance` to the subject distance or switch the focus method to Disable
  for an all-sharp blockout.
- **One camera move per shot.** For a playblast that feeds a video model, keep one move, 3–10 s, plain
  materials; the model repeats the framing and timing, not the look.

## Recording

`unreal_playblast(sequence: "/Game/Mira/Sequences/SEQ_Shot01", aspect)` renders the sequence through its
camera cuts at 720p and uploads the MP4. Without a sequence it records the viewport camera for the given
frames. Pass the returned `url` in `referenceVideoUrls` of `generate_video` and describe the shot in words.
