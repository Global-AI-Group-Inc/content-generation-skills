# Scripting Unreal through unreal_execute_python

## The call

Your code runs as a script in the Editor's Python (the Python Editor Script Plugin, on with Mira).
`unreal` is imported; import anything else yourself. `print(...)` output and the traceback of an error
come back to you; print JSON (`json.dumps`) when you need structured data. Output over 20 KB is cut.

- Wrap changes in `with unreal.ScopedEditorTransaction("Mira: floor"):` — one Ctrl+Z undoes the step.
  Spawning, moving and property changes on actors are recorded; creating an asset is not (asset files
  stay until deleted), so make assets only under `/Game/Mira`.
- Long loops freeze the Editor; keep a call under a few seconds and split big builds into steps.
- Never call `unreal.EditorLoadingAndSavingUtils.save_*`, `LevelEditorSubsystem.save_current_level`
  or `EditorAssetLibrary.save_*` unless the user asked to save.

## Units and axes

Z up, left-handed: X forward, Y right. Centimetres. `unreal.Vector(x, y, z)`;
`unreal.Rotator(roll=0, pitch=-10, yaw=90)` — pass by keyword, the positional order is
roll, pitch, yaw and is easy to get wrong. Yaw turns around Z; pitch negative looks down.
Look-at: `unreal.MathLibrary.find_look_at_rotation(start, target)`.

## Subsystems

```python
actors = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
editor = unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem)
level = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
assets = unreal.get_editor_subsystem(unreal.EditorAssetSubsystem)

world = editor.get_editor_world()
everything = actors.get_all_level_actors()
selected = actors.get_selected_level_actors()
cam_loc, cam_rot = editor.get_level_viewport_camera_info()   # where the user is looking
```

`unreal.EditorLevelLibrary` still exists but is deprecated in UE 5; use the subsystems.

## Recipes

Floor, sun, sky and a camera:

```python
import unreal
actors = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
cube = unreal.load_asset("/Engine/BasicShapes/Cube")       # 100 cm on each side
plane = unreal.load_asset("/Engine/BasicShapes/Plane")     # 100 × 100 cm

def mesh(label, asset, loc, scale):
    a = actors.spawn_actor_from_class(unreal.StaticMeshActor, loc)
    a.static_mesh_component.set_static_mesh(asset)
    a.set_actor_scale3d(scale)
    a.set_actor_label(label)
    a.set_folder_path("Mira/Blockout")
    return a

with unreal.ScopedEditorTransaction("Mira: blockout"):
    mesh("Floor", plane, unreal.Vector(0, 0, 0), unreal.Vector(20, 20, 1))      # 20 × 20 m
    crate = mesh("Crate", cube, unreal.Vector(0, 0, 50), unreal.Vector(1, 1, 1))

    sun = actors.spawn_actor_from_class(unreal.DirectionalLight, unreal.Vector(0, 0, 500),
                                        unreal.Rotator(roll=0, pitch=-40, yaw=-35))
    sun.set_actor_label("LGT_sun"); sun.set_folder_path("Mira/Light")
    sun.light_component.set_intensity(8.0)                                        # lux
    sky = actors.spawn_actor_from_class(unreal.SkyLight, unreal.Vector(0, 0, 300))
    sky.set_actor_label("LGT_sky"); sky.set_folder_path("Mira/Light")

    target = unreal.Vector(0, 0, 60)
    loc = unreal.Vector(-450, 0, 160)
    cam = actors.spawn_actor_from_class(unreal.CineCameraActor, loc,
                                        unreal.MathLibrary.find_look_at_rotation(loc, target))
    cam.set_actor_label("Cam_Main"); cam.set_folder_path("Mira/Camera")
    cc = cam.get_cine_camera_component()
    cc.set_editor_property("current_focal_length", 35.0)
print([a.get_actor_label() for a in actors.get_selected_level_actors()])
```

A level without a SkyAtmosphere stays black above the horizon; add `unreal.SkyAtmosphere` and
`unreal.ExponentialHeightFog` when the sky is in frame.

A plain colour material (an instance of the engine's basic-shape material):

```python
tools = unreal.AssetToolsHelpers.get_asset_tools()
mi = tools.create_asset("MI_Clay", "/Game/Mira/Materials", unreal.MaterialInstanceConstant,
                        unreal.MaterialInstanceConstantFactoryNew())
mi.set_editor_property("parent", unreal.load_asset("/Engine/BasicShapes/BasicShapeMaterial"))
unreal.MaterialEditingLibrary.set_material_instance_vector_parameter_value(
    mi, "Color", unreal.LinearColor(0.8, 0.78, 0.74, 1.0))
crate.static_mesh_component.set_material(0, mi)
```

Find an actor by label:

```python
def find(label):
    return next((a for a in actors.get_all_level_actors() if a.get_actor_label() == label), None)
```

Show the user what you made: `actors.set_selected_level_actors([cam])`; pilot the viewport through a
camera only when asked (`level.pilot_level_actor(cam)`, `level.eject_pilot_level_actor()`).

## Traps

- **PIE.** During Play-in-Editor the editor world is not the one that runs; `unreal_status` says so.
  Do not change actors then.
- **Labels are not names.** `get_name()` is the internal object name (`StaticMeshActor_3`); the
  Outliner shows `get_actor_label()`. Search and report by label.
- **World Partition levels** load actors by region; `get_all_level_actors` only sees loaded cells.
  Mention it when the level is large and actors seem missing.
- **Mobility.** Spawned lights and meshes are Movable by default in Python; leave them so — static
  lighting needs a light build the user did not ask for.
- **Content paths.** `/Game/Mira/...` is `Content/Mira/...` on disk; `/Engine/...` is read-only.
