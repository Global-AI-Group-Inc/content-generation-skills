# Depth: making a stack of flat layers read as space

Read this when a scene has more than two planes, a camera move, or a single still that has to feel
deep. The numbers are starting points for 1920x1080 and 1080x1920; the frame you look at decides.

## One number per plane

Every plane gets one depth factor, and speed, size and haze all follow it. With the Kit's 3D route
(`parallax` with `depths`, then one `camera` move) After Effects does this for you: a plane at
depth z moves and shrinks by zoom / (zoom + z). On a 2D stack (no camera), apply the same factor by
hand to the position travel, the scale change and the amount of haze of each plane, or the eye sees
cut-out cards.

- Neighbouring planes differ in speed by two to four times. Closer than that they read as one
  layer; further apart they tear.
- The farthest plane barely moves or holds still: the sky is not on the dolly.
- A completely still stack looks like a postcard. A slow `expression wiggle` on the camera rig
  (about 1 per second, 1-2 px) keeps it breathing; never wiggle the planes one by one.

## Pushing in

A push into a 2D stack is not a position move. Scale the planes against each other instead: the
front plane grows to about 110-115 %, the back plane eases to about 90-95 %, over three to five
seconds. Zoom is perceived logarithmically, so ease it (`gentle` or `luxe`) rather than `linear`;
a linear scale reads as accelerating at the start and dead at the end. With a 3D camera, a `push`
of 20-30 % of the zoom does the same thing honestly.

## Air between the planes

- Haze only the far planes. Colour them toward the haze colour with Tint or Fill at a low amount,
  not with Opacity: opacity lets the plane behind show through and the stack goes muddy.
- Equal thin haze layers between planes (about 15 % each) add up to the right falloff on their own;
  there is no need to compute it.
- Lift the blacks of the far planes a little: distance never has true black.
- Desaturate with distance in steps, for example 0, -15, -30, -50 from front to back.
- The `atmosphere` recipe does all of this in one call: `layers` nearest first, `step` 0.15.

## Depth from a single still

When there is only one image, a displacement map made from it fakes the parallax:

- The map's neutral value is exactly 50 % grey (128): grey does not move, white comes forward,
  black goes back.
- Budget 15-30 px of displacement at 1080 px; more and edges smear.
- Blur the depth map a little before using it, or every hair and edge tears.
- The same map drives a depth of field (Camera Lens Blur with the map as the blur layer), the haze
  (as a luma matte for a haze solid) and a rack focus (animate the blur focal distance).

## Standing on the ground

Objects that should touch something need two shadows, not one:

- A contact shadow right under the object: tight (2-4 px blur), about 20 % opacity.
- An ambient shadow: wide (8-16 px blur), about 12 %.
- The `double_shadow` recipe lays both; on a busy floor raise the opacities until they read.

Lay a floor in perspective with CC Power Pin, not Corner Pin, so the texture keeps its perspective.
Light on a floor falls off: about a quarter darker for every doubling of distance from the source.

## Speed, motion blur and the cut

- The fastest plane should not move more than about composition width / (7 x fps) pixels per frame.
  Faster than that strobes even with motion blur; if the move must be faster, raise the shutter
  angle to 270-360 degrees on that composition.
- Scroll with Position, not with the Offset effect: Offset renders without motion blur.
- `motion_audit` flags fast moves that have no blur; fix them before the render.

## Making the planes belong together

- Light wrap on the subject: a blurred copy of the background behind it, Screen at 70-75 %, masked to
  a 5-10 px rim, so the background's light spills over its edge (`light_wrap`; for keyed footage pass
  the matte layer and `mode` luma).
- One grain pass over the whole stack (`grade` with `grain`), never a different grain per plane.
- One lens for the whole scene: one field of view, and chromatic aberration only in the corners,
  about 0.5-0.75 % of the width (`fx chromatic` on the final adjustment layer).

## Vertical (9:16) budgets

- Sideways parallax stays small: about 16 px of travel. Vertical travel can go to about 55-60 px.
- Put the horizon on a third: about y 640 or y 1280 in a 1920-high frame, never in the middle.
- Keep the depth anchors (the subject, the closest plane's focal point) inside the central
  900 x 1400 core: the platform's buttons and captions eat the rest (`safe_zone`).
