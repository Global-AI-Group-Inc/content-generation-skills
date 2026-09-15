# Blockout rules and helpers

Read this before the first `blender_execute_python` of a build. The video model copies what the
playblast shows: shapes, silhouettes, surface patterns, motion and any colour. A blockout is layout,
not a look: it fixes where things are, how big they are, how they move and where the camera goes.
Keep it primitive and in clay. Everything it leaves out - outfits, faces, materials, colours, the
surroundings, crowds, plants, small props, detail parts - the model draws from the prompt, as real footage;
everything it contains comes back looking the way it was built (a race track recorded in the scene's
flat colours came back as a racing video game, with lollipop trees and a plastic halo).

## What goes into a blockout

| Thing | Build it as | Never |
|---|---|---|
| People with a job | `stand_in()` below: the heroes and the few extras whose action the story needs; one smooth body, a nose for facing, the right height and build | costumes, hair, hats, gloves, props in hands, flat colours that mirror the prompt |
| Crowd, extras | not built: the prompt writes the crowd as a mass ("packed grandstands waving flags"); a `Crowd` collection from an older scene is left out near each shot's camera | extras as stand-ins - they come back as wooden mannequins |
| People lifted, carried or thrown | `stand_in(pose="limp")`: held by its middle, limbs and head hanging below it; at most half a turn, slow | a straight figure spinning in the air - it comes back as a diver or a gymnast |
| Animals, creatures | simple volumes with thickness (body, head, legs as cylinders); an animated one flexed (below) | fins, wings or ears as one flat polygon; a rigid body gliding along its path |
| Palms, trees, bushes | not built: the prompt writes the vegetation; a trunk only when someone touches the tree | ball-on-a-stick trees or blade leaves (they come back exactly like that) |
| Vehicles | `vehicle()` below: one object in real size, boxes and wheels, clay like everything else (the prompt names the colour); it rolls on its wheels, and a hop, bounce or rock is written in the prompt | keyed hops or bounces (a rigid box that jumps comes back as a toy on a spring); mirrors, lights, a halo or a steering wheel; a textured model when a box would do |
| Roads, tracks, yards | a slightly raised ribbon with low curbs, so the layout reads in clay; lane marks or posts only where speed must read | a bare plane (size and speed become guesses), colour as the only cue |
| Surroundings: houses and blocks beyond the route, a hillside town, a skyline | not built: the prompt writes them and a photo in `referenceImageUrls` shows them; when a drone needs the relief, one terrain mass (a slope, a few big terraces) without separate houses | a field of look-alike boxes (a hillside of box houses on a grid came back as a toy town of identical cubes) |
| Furniture | the characteristic silhouette (a chesterfield's rolled arms, a chaise's curved back) | smooth boxes for iconic pieces, colour as the only cue |
| Paintings, screens, posters | a neutral canvas in its frame | flat saturated panels (they stay flat panels) |
| Props | only the ones the story handles, at real size (a feather is 25 cm, not a metre) | set dressing (cones, bottles, signs, benches): the prompt adds it |
| Walls, facades | only the ones the action runs along or the camera passes close: broken into rough floors, windows and doors, no two alike | blank flat walls (they come back as giant windows) |
| Rock, bark, ground | smooth-shaded volumes | Displace, noise, dense flat-shaded faces (they come back as a blocky pattern) |

**Colour.** `blender_playblast` paints the clip in neutral clay, vehicles too: flat paint came back
as toy cars and a plastic nose, so the prompt names every colour. `look="ids"` gives each figure a
flat label colour (useful to tell people apart in the prompt: "the figure on the left is ...").
`look="scene"` is not for video: flat viewport colours come back as game-like surfaces.

**Motion.** A figure travels and turns as one object; gestures, talking, dancing are written in
the prompt. `blender_playblast` freezes figures' limbs and bones by default and keeps their travel;
`freezeFigures=false` keeps every keyed motion, which the model then repeats beat for beat. The
model also copies HOW a figure travels: one at full speed on its first frame, or turning around in
a few frames, comes back as a sprinter off the blocks. People react first, stagger their starts,
build up to 3.5-5 m/s over a second or so and slow into turns - `run_path()` below keys exactly that.

**Leave it out, write it in.** Crowds, extras, plants, set dressing and the surroundings beyond the
route stay out of the scene. The prompt writes them where they belong - "packed grandstands waving
flags, marshals in orange at their posts, pine woods on the hills, a dense town up the hillside with
every house a different height and colour" - and the model draws them as real footage. Keep
`stand_in()` figures for the heroes and the few extras with an action the story needs; build a tree
only when someone touches it. `blender_playblast` does not record while they are in the scene: it
returns `stops` to fix.

**Build the route, not the district.** The model re-imagines big single forms and copies small
repeated ones as a pattern. An alley, a stairway and a caged court built close to the cameras came
back as real places; the hillside of look-alike box houses around them came back as a toy town of
identical cubes, although a real aerial photo was attached. Build what lies within about 20 m of the
cameras and the action - the ground, the facades, stairs and courts it runs along; beyond that, at
most one terrain mass for the relief. Any rhythm you build close to the lens (windows, doors, steps,
posts) varies in size and spacing. `blender_playblast` stops on a field of look-alike blocks away
from the cameras.

**Creatures.** Key the path (`location`, `rotation_euler`), then flex the body; a creature keyed
as one rigid block glides like an airship and the model copies that:

```python
bpy.ops.mira.flex_creature(target="Whale")   # spine arch along the path, tail strokes, landing squash
```

A leaping or falling body rolls around its long axis; it does not bank like an aircraft. Water it
breaks through pours off it and falls back - say so in the prompt, never a column rising with it.

**Lifted, carried, thrown.** A person pulled up by a beam, carried off or thrown by a blast is
passive: swap in `stand_in(pose="limp")` and key the pull on its origin, the middle of the body,
with at most half a turn of slow, uneven rotation. In the prompt say where the force holds the body
and that the limbs dangle and flail; a straight figure turning over comes back as a dive.

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
- LOCATION - the place, materials, colours, light, time of day, and the surroundings, crowd, plants
  and props the blockout leaves out; the surroundings as a mass where every building differs (height,
  colour, roofline, age), with a photo of the place when there is one; the big surfaces with their
  wear and texture (mira-video-prompting, `references/textures.md`).
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
    faces (-Y before rotation). pose: "stand" | "sit" (seat 0.45 m above `location`) | "lie" (on the back)
    | "limp" (held by its middle at `location`, head, arms and legs hanging: lifted, carried, thrown)."""
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

    along = Matrix.Rotation(math.pi / 2, 4, "X")                            # a cylinder along Y
    if pose == "lie":
        body = height - 2 * r                                               # body along Y, head at +Y
        cyl(w / 2, body * 0.45, 0, body * 0.2, w / 2, along)
        for sx in (-1, 1):
            cyl(leg, body * 0.55, sx * w * 0.22, -body * 0.28, leg, along)
        ball(r, 0, body * 0.43 + r, w / 2)
        nose(0, body * 0.43 + r, w / 2 + r)                                 # nose points up
    elif pose == "limp":
        torso = height * 0.34                                               # level at the origin, head end +Y
        cyl(w / 2, torso, 0, 0, 0, along)
        ball(r, 0, torso / 2 + r * 0.6, -r * 1.2)                           # the head drops below the shoulders
        nose(0, torso / 2 + r * 0.6, -r * 2.3)
        for sx in (-1, 1):
            cyl(leg * 0.8, torso * 0.9, sx * (w / 2 + leg * 0.8), torso * 0.3, -torso * 0.45)   # arms hang
            cyl(leg, height * 0.45, sx * w * 0.22, -torso / 2, -height * 0.225 - w * 0.1)     # legs hang
    else:
        sit = pose == "sit"
        hip = 0.45 if sit else height * 0.5
        torso = height * 0.34
        cyl(w / 2, torso, 0, 0, hip + torso / 2)
        if sit:
            for sx in (-1, 1):
                cyl(leg, height * 0.25, sx * w * 0.22, -height * 0.12, hip, along)   # thighs forward
                cyl(leg, hip, sx * w * 0.22, -height * 0.245, hip / 2)               # shins down
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
lifted = stand_in("Girl_Fly", location=(0, 0, 1.0), pose="limp", parent=root)             # key the pull on its origin
# travel and turn as a block: keys on the object only
guest.keyframe_insert("location", frame=1)
guest.location.x += 2.0; guest.rotation_euler.z += 1.2
guest.keyframe_insert("location", frame=96); guest.keyframe_insert("rotation_euler", frame=96)
```

## run_path()

```python
import bpy, math
from mathutils import Vector


def run_path(obj, points, start_frame, speed=4.2, reaction=0.6, ramp=1.2):
    """Keys a person running through ground points [(x, y), ...] the way people do: stands still for
    `reaction` s, builds up to `speed` m/s over `ramp` s (3.5-5 for ordinary people - vary it per
    person), slows to half speed around turns sharper than 60 degrees and turns at most 200 deg/s,
    facing where it runs (stand_in noses look down -Y). Keys every 3 frames."""
    fps = bpy.context.scene.render.fps / bpy.context.scene.render.fps_base
    pts = [Vector((x, y, obj.location.z)) for x, y in points]
    segs = [(a, b) for a, b in zip(pts, pts[1:]) if (b - a).length > 1e-3]
    corners, run = [], 0.0
    for (a, b), (c, d) in zip(segs, segs[1:]):
        run += (b - a).length
        if math.degrees((b - a).angle(d - c)) > 60:
            corners.append(run)
    total = sum((b - a).length for a, b in segs)

    def at(dist):
        for a, b in segs:
            if dist <= (b - a).length:
                return a.lerp(b, dist / (b - a).length), (b - a).normalized()
            dist -= (b - a).length
        a, b = segs[-1]
        return b, (b - a).normalized()

    f, dist, t = start_frame, 0.0, 0.0
    obj.location = pts[0]
    heading = obj.rotation_euler.z
    obj.keyframe_insert("location", frame=f); obj.keyframe_insert("rotation_euler", frame=f)
    f += round(reaction * fps)
    obj.keyframe_insert("location", frame=f); obj.keyframe_insert("rotation_euler", frame=f)
    while dist < total:
        t += 3 / fps
        slow = min([1.0] + [0.5 + 0.5 * min(1.0, abs(dist - c) / 1.5) for c in corners])
        dist = min(total, dist + speed * min(1.0, t / ramp) * slow * 3 / fps)
        p, d = at(dist)
        want = math.atan2(d.x, -d.y)
        turn = (want - heading + math.pi) % (2 * math.pi) - math.pi
        heading += max(-math.radians(25), min(math.radians(25), turn))
        f += 3
        obj.location = p
        obj.rotation_euler.z = heading
        obj.keyframe_insert("location", frame=f); obj.keyframe_insert("rotation_euler", frame=f)
    return f


# a panicking beach: different reactions and paces, nobody at full speed on frame one
run_path(stand_in("Runner_01", location=(3, 2, 0)), [(3, 2), (3, -8), (-6, -14)], start_frame=150, speed=4.6, reaction=0.4)
run_path(stand_in("Runner_02", location=(6, 4, 0)), [(6, 4), (9, -10)], start_frame=150, speed=3.8, reaction=1.1)
```

## vehicle()

```python
import bpy, bmesh, math
from mathutils import Matrix

VEHICLE_KINDS = ("car", "suv", "van", "truck", "bus", "formula", "motorcycle")


def vehicle(name, kind="car", location=(0, 0, 0), facing_deg=0.0, parent=None):
    """A vehicle as a blockout stand-in: one object in real size - boxes for the body, cylinders for the
    wheels, no mirrors, lights, halo or steering wheel. The front points at -Y before rotation, like a
    stand_in nose. It records in clay like everything else; the prompt names its colour. It rolls on
    its wheels: a lowrider hop, a bounce or a rock is written in the prompt, never keyed on the box.
    obj["mira_eye"] is the local point for an onboard camera: in front of the windscreen or the helmet,
    never inside the body (a camera in a closed box sees its walls)."""
    bm = bmesh.new()

    def block(sx, sy, sz, x, y, z):                          # size and centre in metres
        bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation((x, y, z)) @ Matrix.Diagonal((sx, sy, sz, 1)))

    def smooth(make):
        before = set(bm.faces)
        make()
        for f in set(bm.faces) - before:
            f.smooth = True

    def wheels(r, w, xs, ys):                                # axles across X
        for x in xs:
            for y in ys:
                m = Matrix.Translation((x, y, r)) @ Matrix.Rotation(math.pi / 2, 4, "Y")
                smooth(lambda: bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=r, radius2=r, depth=w, matrix=m))

    if kind == "car":            # 4.7 x 1.85 x 1.45 m saloon
        block(1.80, 4.70, 0.62, 0, 0, 0.61); block(1.62, 2.40, 0.52, 0, 0.30, 1.18)
        wheels(0.33, 0.22, (-0.80, 0.80), (-1.45, 1.45)); eye = (0, -1.20, 1.05)      # above the bonnet
    elif kind == "suv":          # 4.8 x 1.95 x 1.8 m
        block(1.90, 4.80, 0.75, 0, 0, 0.75); block(1.80, 3.00, 0.66, 0, 0.35, 1.45)
        wheels(0.38, 0.25, (-0.84, 0.84), (-1.50, 1.50)); eye = (0, -1.30, 1.25)
    elif kind == "van":          # 5.3 x 2.0 x 2.3 m
        block(2.00, 4.30, 1.90, 0, 0.50, 1.30); block(1.90, 1.00, 0.70, 0, -2.15, 0.70)
        wheels(0.36, 0.24, (-0.86, 0.86), (-1.75, 1.65)); eye = (0, -1.90, 1.25)
    elif kind == "truck":        # 9 x 2.5 x 3.9 m box truck
        block(2.50, 2.30, 2.70, 0, -3.35, 2.05); block(2.50, 6.50, 3.00, 0, 1.25, 2.40)
        wheels(0.52, 0.40, (-1.05, 1.05), (-3.60, 2.20, 3.60)); eye = (0, -4.60, 2.60)
    elif kind == "bus":          # 12 x 2.55 x 3.2 m city bus
        block(2.55, 12.0, 2.80, 0, 0, 1.80)
        wheels(0.50, 0.35, (-1.05, 1.05), (-3.90, 3.30)); eye = (0, -6.05, 2.30)
    elif kind == "formula":      # 5.4 x 2.0 x 0.95 m open-wheel racer: the exposed wheels are the silhouette
        block(0.30, 1.20, 0.22, 0, -2.30, 0.30); block(0.75, 1.90, 0.50, 0, -0.85, 0.42)   # nose, tub
        block(1.45, 1.70, 0.45, 0, 0.45, 0.36); block(0.55, 1.60, 0.55, 0, 1.95, 0.45)     # sidepods, tail
        block(1.95, 0.45, 0.05, 0, -2.70, 0.10); block(0.95, 0.35, 0.30, 0, 2.55, 0.88)    # wings
        wheels(0.36, 0.30, (-0.82, 0.82), (-1.80,)); wheels(0.36, 0.40, (-0.82, 0.82), (1.80,))
        smooth(lambda: bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=0.14,
                                                 matrix=Matrix.Translation((0, -0.45, 0.86))))   # helmet
        eye = (0, -0.62, 0.92)                                   # just in front of the helmet
    elif kind == "motorcycle":   # 2.1 x 0.75 x 1.1 m; the rider is a stand_in(pose="sit") on it
        block(0.35, 1.30, 0.45, 0, 0, 0.72); block(0.75, 0.06, 0.06, 0, -0.50, 1.05)     # body, handlebar
        wheels(0.32, 0.14, (0,), (-0.72, 0.72)); eye = (0, 0.05, 1.45)
    else:
        raise ValueError("kind must be one of %s" % (VEHICLE_KINDS,))
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler.z = math.radians(facing_deg)
    obj["mira_vehicle"] = kind
    obj["mira_eye"] = eye
    if parent is not None:
        obj.parent = parent
    return obj
```

Examples:

```python
root = bpy.data.objects.get("Blockout")
racer = vehicle("Car_07", kind="formula", parent=root)
bus = vehicle("Bus", kind="bus", location=(4, 20, 0), facing_deg=180, parent=root)
# onboard: the camera rides at mira_eye, looking down the nose (-Y), a touch below the horizon
pov = bpy.data.objects.new("Cam_POV", bpy.data.cameras.new("Cam_POV")); bpy.context.scene.collection.objects.link(pov)
pov.parent = racer; pov.location = racer["mira_eye"]; pov.rotation_euler = (math.radians(86), 0, math.pi); pov.data.lens = 18
# drive it as a block: keys on the object, speed built over seconds, never full speed on the first frame;
# a hop, a bounce or a rock is never keyed - the prompt writes it: "the front lifts on its hydraulics,
# the wheels hang, it slams down and rebounds"
```

The prompt gives it everything the boxes leave out: "a red open-wheel racing car with a halo, carbon
wings and a white number 7, a driver in a white helmet".

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
