# Blockout rules and helpers

Read this before the first `blender_execute_python` of a build. The video model copies what the
playblast shows: shapes, silhouettes, surface patterns and any colour that already matches the
prompt. A blockout is layout, not a look: it fixes where things are, how big they are and where
the camera goes. Everything the prompt describes - outfits, faces, materials, paintings, colours -
is left for the model to draw.

## What goes into a blockout

| Thing | Build it as | Never |
|---|---|---|
| People with a job | `stand_in()` below: the heroes and the extras whose place or action the story needs; one smooth body, a nose for facing, the right height and build | costumes, hair, hats, gloves, props in hands, flat colours that mirror the prompt |
| Crowd, extras | stand-ins inside a collection named `Crowd` (or `obj["mira_crowd"] = True`): the playblast leaves them out, `facts.crowd` counts them | extras as visible stand-ins - they come back as wooden mannequins |
| Animals, creatures | simple volumes with thickness (body, head, legs as cylinders); an animated one flexed (below) | fins, wings or ears as one flat polygon; a rigid body gliding along its path |
| Palms, trees, bushes | a trunk at most; the foliage is written in the prompt | blade leaves (they come back as cardboard) |
| Vehicles | boxes and cylinders with the real footprint; a generated model only if the silhouette is the point | a textured model when a box would do |
| Furniture | the characteristic silhouette (a chesterfield's rolled arms, a chaise's curved back) | smooth boxes for iconic pieces, colour as the only cue |
| Paintings, screens, posters | a neutral canvas in its frame | flat saturated panels (they stay flat panels) |
| Props | real size (a feather is 25 cm, not a metre) | oversized placeholders |
| Walls, facades | broken into rough floors, windows and doors | blank flat walls (they come back as giant windows) |
| Rock, bark, ground | smooth-shaded volumes | Displace, noise, dense flat-shaded faces (they come back as a blocky pattern) |

**Colour.** `blender_playblast` paints the clip in neutral clay by default, so object colours do
not reach the model. `look="ids"` gives each figure a flat label colour (useful to tell people
apart in the prompt: "the figure on the left is ..."); `look="scene"` sends the scene's own
colours - only when colour itself must carry, and never with figures painted like their outfits.

**Motion.** A figure travels and turns as one object; gestures, talking, dancing are written in
the prompt. `blender_playblast` freezes figures' limbs and bones by default and keeps their travel;
`freezeFigures=false` keeps every keyed motion, which the model then repeats beat for beat.

**Crowd.** Build the extras if their layout helps you, then keep them in a `Crowd` collection:
`blender_playblast` leaves it out (`facts.crowd` counts them and names the parts of each shot they
fill) and the prompt writes the crowd as a mass - "a packed beach: families under striped
umbrellas, kids at the waterline". Keep `stand_in()` figures only for the heroes and the few extras
with an action the story needs; a visible stand-in extra comes back as a wooden mannequin.

**Creatures.** Key the path (`location`, `rotation_euler`), then flex the body; a creature keyed
as one rigid block glides like an airship and the model copies that:

```python
bpy.ops.mira.flex_creature(target="Whale")   # spine arch along the path, tail strokes, landing squash
```

A leaping or falling body rolls around its long axis; it does not bank like an aircraft. Water it
breaks through pours off it and falls back - say so in the prompt, never a column rising with it.

## Cuts and the prompt

Several shots in one clip: bind a camera to a timeline marker at the frame where it takes over.
Blender switches the camera while the playblast renders, so the hard cuts are baked into the
reference and the model keeps them.

```python
sc = bpy.context.scene
for frame, cam_name in ((1, "Cam_Wide"), (44, "Cam_Close"), (101, "Cam_Top")):
    m = sc.timeline_markers.new(f"S_{cam_name}", frame=frame)
    m.camera = bpy.data.objects[cam_name]
```

`blender_playblast` returns `facts`: the shots with timecodes (`start`/`end` in seconds) and every
figure's pose, place, facing and position per shot. Write the prompt in this order:

- SUBJECT - who is in the clip, what they wear, faces, props; one line per person.
- LOCATION - the place, materials, colours, light, time of day.
- CAMERA REFERENCE - "@Video1 is a clay blockout: follow its camera path, framing and N hard cuts
  exactly; its figures are stand-ins, not the look."
- SHOT 1 - 0.00 to 1.83: what happens in that shot. One SHOT per shot, the timecodes from `facts`.

Attach a photo of the hero or the product with the clip (`referenceImageUrls`) when it must be
recognisable: the photo sets who, the clip sets where and how the camera moves.

## stand_in()

```python
import bpy, bmesh, math
from mathutils import Matrix


def stand_in(name, location=(0, 0, 0), facing_deg=0.0, height=1.75, build="average", pose="stand", parent=None):
    """A person as a blockout stand-in: one smooth object, no costume, a nose that shows where it
    faces (-Y before rotation). pose: "stand" | "sit" (seat 0.45 m above `location`) | "lie" (on the back)."""
    w = {"slim": 0.32, "average": 0.40, "broad": 0.50}.get(build, 0.40)   # shoulder width
    r = height * 0.065                                                      # head radius
    leg = w * 0.2
    bm = bmesh.new()

    def cyl(rad, depth, x, y, z, rot=None):
        m = Matrix.Translation((x, y, z)) @ (rot or Matrix.Identity(4))
        bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=rad, radius2=rad, depth=depth, matrix=m)

    def ball(rad, x, y, z):
        bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=rad, matrix=Matrix.Translation((x, y, z)))

    def nose(x, y, z):
        bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation((x, y, z)) @ Matrix.Diagonal((r * 0.45, r * 0.7, r * 0.35, 1)))

    if pose == "lie":
        along = Matrix.Rotation(math.pi / 2, 4, "X")                        # body along Y, head at +Y
        body = height - 2 * r
        cyl(w / 2, body * 0.45, 0, body * 0.2, w / 2, along)
        for sx in (-1, 1):
            cyl(leg, body * 0.55, sx * w * 0.22, -body * 0.28, leg, along)
        ball(r, 0, body * 0.43 + r, w / 2)
        nose(0, body * 0.43 + r, w / 2 + r)                                 # nose points up
    else:
        sit = pose == "sit"
        hip = 0.45 if sit else height * 0.5
        torso = height * 0.34
        cyl(w / 2, torso, 0, 0, hip + torso / 2)
        if sit:
            forward = Matrix.Rotation(math.pi / 2, 4, "X")
            for sx in (-1, 1):
                cyl(leg, height * 0.25, sx * w * 0.22, -height * 0.12, hip, forward)   # thighs forward
                cyl(leg, hip, sx * w * 0.22, -height * 0.245, hip / 2)                 # shins down
        else:
            for sx in (-1, 1):
                cyl(leg, hip, sx * w * 0.22, 0, hip / 2)
        for sx in (-1, 1):
            cyl(leg * 0.8, torso * 0.9, sx * (w / 2 + leg * 0.8), 0, hip + torso * 0.5)  # arms down the sides
        head_z = hip + torso + r * 1.1
        ball(r, 0, 0, head_z)
        nose(0, -r, head_z)
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    for p in mesh.polygons:
        p.use_smooth = True
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler.z = math.radians(facing_deg)
    obj["mira_figure"] = True
    if parent is not None:
        obj.parent = parent
    return obj
```

Examples:

```python
root = bpy.data.objects.get("Blockout")
guest = stand_in("Guest_01", location=(1.2, 0.4, 0), facing_deg=90, height=1.68, build="slim", parent=root)
seated = stand_in("Dealer", location=(0, -0.8, 0), facing_deg=0, pose="sit", parent=root)   # hips at 0.45 m
reader = stand_in("Reader", location=(2, 1, 0.42), pose="lie", parent=root)                 # on a 0.42 m chaise
# travel and turn as a block: keys on the object only
guest.keyframe_insert("location", frame=1)
guest.location.x += 2.0; guest.rotation_euler.z += 1.2
guest.keyframe_insert("location", frame=96); guest.keyframe_insert("rotation_euler", frame=96)
```

## Set, camera and keys

```python
import bpy, math
from mathutils import Vector

def box(name, size, loc, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True)
    if parent: o.parent = parent
    return o

root = bpy.data.objects.new("Blockout", None); bpy.context.scene.collection.objects.link(root)
floor = box("Floor", (18, 2.6, 0.1), (0, 0, -0.05), root)
wall_l = box("Wall_L", (18, 0.1, 2.3), (0, 1.3, 1.15), root)

cam_data = bpy.data.cameras.new("Cam_Main"); cam_data.lens = 35
cam = bpy.data.objects.new("Cam_Main", cam_data); bpy.context.scene.collection.objects.link(cam)
cam.location = (-8, -0.4, 1.4); bpy.context.scene.camera = cam
target = bpy.data.objects.new("Cam_Target", None); bpy.context.scene.collection.objects.link(target)
target.location = (4, 0, 1.2)
c = cam.constraints.new("TRACK_TO"); c.target = target; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"

sc = bpy.context.scene; sc.frame_start, sc.frame_end = 1, 120
cam.keyframe_insert("location", frame=1)
cam.location.x = -2; cam.keyframe_insert("location", frame=120)
result = [o.name for o in root.children]
```

Blender 4.4+ actions are layered: `action.fcurves` no longer exists - key with
`obj.keyframe_insert`. Leave the default Bezier easing (it reads as a natural ease in/out). Look
through the camera to check framing: `space.region_3d.view_perspective = "CAMERA"`. Smooth-shade
what you build (`bpy.ops.object.shade_smooth()` or `polygon.use_smooth = True`).
