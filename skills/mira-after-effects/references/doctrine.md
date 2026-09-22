# Why a scripted motion piece looks flat, and what makes it rich

A composition built only from solids, text layers and position keyframes reads as a slide deck
with movement. Nothing in it has ever been photographed, so nothing carries light, grain or
depth. The fixes below are the ones a motion designer applies by habit; apply them in this order
and stop when the piece holds together, not when every trick has been used.

## 1. Depth: three to five planes, never one

Every scene has a plate, a texture on it, the subject, something in front of the subject and a
grade over the lot. A plate is a gradient clip, a smoke plate, a blurred still or a full-bleed
video, never a flat colour on its own. The front plane is a light leak, dust, a lens smear or a
foreground shape with heavy blur. Scale contrast does the rest: one giant word against one small
caption, one huge mockup against a row of tiny chips. Parallax comes free from a 3D camera with
a slow push and layers at different Z, or from position keys that move background and subject at
different speeds.

## 2. Texture: grain, halftone, dirt

Clean pixels are the strongest tell of a render. Put film grain over everything at 25-40%
(Overlay or Screen), a halftone or scanline plate on flat colour at 15-30%, dirt or dust on
dark scenes. One texture per plane; two textures on the same plane look like a mistake.

## 3. Grade and vignette

One LUT for the whole piece, chosen before the first scene and never changed mid-way; footage
is pre-graded before import so type and UI stay clean. A vignette of 20-35% closes the frame.
Chromatic aberration of 2-4 px on the very edge of a fast move sells speed; on a still frame it
is noise.

## 4. Light

Something in every scene should glow or leak: a light leak on the cut, a glow behind the hero
word, a soft orb behind a logo, a moving highlight across a chrome title. Light is what the
audience reads as expensive.

## 5. A typography system

Two typefaces, three sizes, one alignment rule. Display type is huge and set tight; body type is
small and airy. Kinetic type moves on the beat and in one direction per phrase: slide, rise or
slam, never all three. Type entering a frame should enter over something, not onto emptiness.

## 6. Cuts on the beat, with sound

Every cut sits on a beat. A whoosh starts 0.3-0.5 s before the cut and its transient lands on
it; a hit lands on the peak; a riser runs the 1-2 s before a drop. Transitions are footage
(light leak, film burn, luma wipe), not opacity fades. A fade is reserved for the very end.

## 7. Framing devices

A phone, a screen, an old TV or a billboard mockup gives footage a place in the world. The
footage plays inside the device; the device moves, not the footage.

## 8. Restraint

One hero per shot. At most three moving things per second. One transition family per piece.
If a scene needs a second texture or a third font to work, the scene is wrong, not the toolbox.

## Check before rendering

- Five planes in the busiest scene, three in the quietest.
- Grain and vignette on the whole piece, one LUT.
- Every cut on a beat with a sound under it.
- Two typefaces, no more; type never enters onto an empty frame.
- Something glows in every scene.
