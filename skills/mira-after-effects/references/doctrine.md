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

## 9. Against the default look

What every generated motion piece does by default, and what to do instead:

- Centred text on a full-frame gradient with fades → a plate with depth, type anchored to an edge
  or a grid, entrances that are verbs (slide, mask reveal, slam) and a real transition on the cut.
- Full-frame linear gradients on dark → they band in H.264; use a textured plate or a radial glow.
- Inter, Roboto, Poppins, the same weight everywhere → a display face with character and a quiet
  text face; contrast in weight (300 against 800-900) and tight tracking on the big lines.
- Every move with the same ease → at most two eases per scene; entrances longer than exits
  (≈0.4 s in, 0.25 s out); the slowest scene about three times the pace of the fastest.
- A scene that builds and then just sits → build, breathe, resolve (≈30 / 40 / 30 % of the scene).
- Motion blur on everything → only on the snaps (whips, slams, zooms), never on text being read.
- A picture dropped in flat → tilt it in perspective, give it a slow push (100 → 104 %) or put it
  in a device frame.

## 10. Platforms

| Platform | Frame | Keep clear | Length |
|---|---|---|---|
| Reels | 1080×1920 | bottom ~20 % (caption, buttons), right ~12 % (actions), top ~10 % | hook in the first 1-2 s |
| TikTok | 1080×1920 | bottom ~20 %, right ~15 %, top ~8 % | hook in the first 1-2 s, loop the end into the start |
| Shorts | 1080×1920 | bottom ~15 %, right ~12 % | hook in the first 2 s |
| YouTube | 1920×1080 | lower third while the player bar shows, top-right corner | title card in the first 5 s |

Loudness about -14 LUFS integrated with the peaks under -1 dBTP; the voice sits above the music.
`adobe_render` takes the platform as `preset` and reports a composition of the wrong shape.

## Check before rendering

- Five planes in the busiest scene, three in the quietest.
- Grain and vignette on the whole piece, one LUT.
- Every cut on a beat with a sound under it.
- Two typefaces, no more; type never enters onto an empty frame.
- Something glows in every scene.
- Nothing from the default look (section 9); nothing important in the platform's UI zones (section 10).
