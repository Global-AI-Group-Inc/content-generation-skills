# Mira Motion Kit

The panel (Mira for Adobe 0.4.5+) carries a motion library inside After Effects. Reach it two ways:

- `adobe_apply_recipe {recipe, params}`: one recipe, one undo step, no script. `recipe: "list"`
  returns the catalogue with every param. Use it for single moves and when you cannot script.
- `adobe_execute_script`: the same functions as the global `MK` (`MK.enter(layer, {...})`), for a
  whole scene in one call. `MK.apply(name, params)` runs a recipe from a script.

`comp` defaults to the active composition; `layer` is a name, a 1-based index or (in scripts) a
layer object; times are seconds in composition time; colours are `#rrggbb`.

## Recipes

| Recipe | Params | What it does |
|---|---|---|
| `text` | `text, font` (PostScript name), `size, color, x, y, anchor` (center, left, right, top, bottom, top-left, ...), `align, tracking, leading, box: [w, h], caps, stroke, strokeWidth, name` | A text layer whose anchor sits on its real bounds, so `x, y` place the centre, an edge or a corner exactly |
| `shape` | `kind` rect, ellipse or path; `w, h, radius, fill, stroke, strokeWidth, fillOpacity, x, y, points, closed, name` | Shape layers; `points` are composition coordinates |
| `glow` | `color, size, x, y, opacity, blend` (screen, add) | A soft light: a feathered elliptical solid |
| `draw_on` | `layer, t0, t1` | Trim Paths: the stroke draws itself |
| `shadow` | `layer, opacity` (0-100), `distance, softness, direction` | A drop shadow |
| `enter` / `exit` | `layer, style, t, dur, ease, distance` | Styles: fade, rise, drop, slide_left, slide_right, pop, slam, blur, zoom_out, spin, wipe_right. `exit` ends at `t + dur` |
| `text_animate` | `layer, style, by` (char, word, line), `t, dur` (per unit), `stagger, direction` (in, out), `distance` | Kinetic type on one text layer: rise, drop, fade, blur, pop, slam, typewriter, mask_up, tracking. Returns `ends_by` |
| `keys` | `layer, property, keys: [[t, value], ...], ease` | Keyframes with a named ease, a `[x1, y1, x2, y2]` curve, or a list with one per segment |
| `punch` | `layer, times` ([t, ...], "bars", "beats" or "drops"), `amount` (%), `decay` | A scale hit on each time; the named sets come from `mira:` markers |
| `transition` | `from, to, t, style, dur, direction` (left, right, up, down), `color` | whip, zoom, push, flash, dip, iris, clock, blinds, wipe, glitch, cut. `from` ends at `t`, `to` starts at `t` |
| `camera` | `move, t0, t1, amount, ease` (no `move`: just build the rig; `dof, aperture, focus`) | A 3D camera on the null "Mira Camera Rig": push, pull, dolly, orbit, truck, pedestal, roll, drift |
| `parallax` | `layers: [...], depths: [z, ...]` (px, positive = further) | Real depth: layers go 3D at their z with scale compensated, so the frame at rest is unchanged |
| `expression` | `layer, property, kind` + `freq, amp, decay, leader, seconds, fps, amount, speed` | wiggle, bounce, overshoot, delay, loop, pingpong, posterize, beat_pulse, spin |
| `fx` | `layer, kind` + params | noise_bg, turbulence, light_sweep, echo, glow, directional_blur, radial_blur, shake, chromatic, particles, grain |
| `grade` | `grain` (0-100), `vignette` (0-100), `exposure, contrast, saturation` (100 = unchanged), `vibrance, temperature, faded, tint, tintOpacity, lut` (.ffx path), `t0, t1` | One adjustment layer on top: Lumetri tone and vignette, Grain Implant, an overlay tint, a LUT preset |
| `scene` | `name, w, h, fps, dur, bg, parent, at, rebuild` | A scene composition in "Mira Scenes". Calling it again clears and rebuilds it. A composition the Kit did not make is refused |
| `beats` | none | `{offset, beat, bpm, bars, beats, drops}` from the `mira:` markers |
| `captions` | `cues: [{s, e, text, words: [{t, s, e}]}]`, `style: {font, size, color, highlight, stroke, strokeWidth, box, boxColor, boxOpacity, position, platform, animation}`, `replace` | Word-timed captions: one text layer per cue, each word animated on its own time (pop, rise, reveal, karaoke, highlight), a plate that follows the text, kept clear of the platform's UI; earlier Mira captions are replaced |
| `safe_zone` | `platform` (reels, tiktok, shorts, youtube), `remove` | A guide layer that never renders, shading the platform's top bar, captions area and side buttons |
| `brand` | none | The brand kit the user saved in the panel, or null |
| `check` | `times` (default every 0.5 s), `platform` (reels, tiktok, shorts, youtube), `margin` | Issues as data: `out_of_frame`, `text_overlap`, `platform_ui_zone` |

## Brand

When the user saved a brand in the panel's Brand screen, every recipe takes `"brand:primary"`,
`"brand:accent"`, `"brand:text"`, `"brand:background"` wherever a colour goes and `"brand:display"`,
`"brand:body"` wherever a font goes. `text` without a font uses the display face and the brand's text
colour. `brand` returns the kit (null when none is saved); do not invent brand values.

## Captions

Split the transcript's words (`transcribe_video` → words with `t, s, e` in seconds) into cues of 2-3
words for punchy social captions or 6-8 for subtitles, breaking on sentence ends and long pauses, and
add the source's start in the composition to every time. Break long cues into two balanced lines with
`\r`. `animation` `pop` or `highlight` for Reels-style captions, `karaoke` for lyrics, `none` for
documentary subtitles. `platform` keeps them above the app's buttons.

## Eases

Curves are CSS `cubic-bezier` values turned into exact After Effects temporal ease, so a name moves
the way it moves on the web.

| Name | Curve | Use |
|---|---|---|
| `snappy` | .2, 0, 0, 1 | Entrances, UI, anything that should feel quick and settle long |
| `out` | 0, 0, .2, 1 | The incoming half of a transition, landings |
| `in` | .7, 0, 1, 1 | Exits, the outgoing half of a transition |
| `ease` / `smooth` | .45, 0, .55, 1 | A move between two holds |
| `gentle` | .33, 0, .2, 1 | Slow drifts, backgrounds |
| `dramatic` | .7, 0, .1, 1 | Hero reveals: slow build, hard land |
| `luxe` | .6, 0, .2, 1 | Premium brands: slow and confident |
| `entrance_sharp`, `settle_soft` | | Sharp arrival; soft settle |
| `anticipate` | .36, 0, .66, -.56 | A small pull back before the move |
| `overshoot` | .34, 1.56, .64, 1 | Passes the target and comes back |
| `linear`, `hold` | | Mechanical motion; a jump cut in values |

At most two eases per scene. The entrance is longer than the exit.

## Patterns

**Depth in one scene.** Background, midground, subject and a foreground element. Run `parallax`
with depths such as `[1500, 600, 0, -250]`, then one `camera` move (`push` over the whole scene,
`amount` about 25 % of the zoom). Near planes pass faster than far ones; scaling a flat layer is fake depth.
Parallax works on layers that are already keyed.

**Kinetic title.** `text` with the brand typeface, then `text_animate` `rise` or `mask_up` by
`char` (short words) or `word` (a line), `stagger` 0.03-0.06 s for chars and 0.08-0.12 s for words.
One `punch` on the drop, nothing else on the title.

**A cut on the beat.** `beats` → pick a bar time → `transition` with `from` and `to` at that time.
whip and push read as one move because the outgoing layer accelerates (`in`) and the incoming one
decelerates (`out`): the speed peaks on the cut. Add the whoosh 0.3-0.5 s before.

**Life without keys.** `expression` `bounce` or `overshoot` after a landing, `delay` for followers
(`leader`, `seconds`), `beat_pulse` for a 3-5 % breath on every marker, `posterize` at 8-12 fps
for a stop-motion feel.

**Finish.** `fx noise_bg` or a plate under everything, `fx glow` on the one bright thing, `grade`
with grain 20-30 and vignette 15-25 over all of it, then `check` with the target `platform` and
fix every issue before `adobe_render`.

## Script API

The global `MK` exposes: `comp(ref)`, `layer(comp, ref)`, `property(layer, path)`, `solid`,
`nullLayer`, `text`, `rect`, `ellipse`, `path`, `glow`, `drawOn`, `shadow`, `cover`, `contain`,
`P/S/O/R/A(layer)` (position, scale, opacity, rotation, anchor), `EASE`, `keys(prop, pairs, ease)`,
`enter`, `exit`, `textAnimate`, `punch`, `cameraRig`, `cameraMove`, `parallax`, `transition`,
`expression(prop, o)`, `fx(comp, layer, o)`, `grade`, `scene`, `beats`, `grid(offset, beat)` (`.b(k)`,
`.bar(n, sub)`, `.snap(t)`), `check`, `apply(name, params)`, `recipes()`, `version`.

```js
var c = MK.scene("S2", {w: 1080, h: 1920, fps: 30, dur: 4, bg: "#0b0d12"});
var t = MK.text(c, {text: "NEW DROP", font: "Unbounded-Bold", size: 150, color: "#f4f6f8", x: 540, y: 900});
MK.textAnimate(t, {style: "rise", by: "char", t: 0.2, stagger: 0.04});
var card = MK.rect(c, {w: 760, h: 420, radius: 36, fill: "#14cca2", x: 540, y: 1250, name: "Card"});
MK.enter(card, {style: "pop", t: 0.6});
result = MK.check(c, {platform: "reels"});
```

## Traps

- `scene` rebuild removes every layer of that scene: build the whole scene in the same script.
- `transition` needs both layers in the same composition; it trims their in and out points.
- `check` measures 2D bounds; it does not project through the 3D camera, so recheck scenes with
  depth on a contact sheet.
- `chromatic` adds three adjustment layers on top; `particles` and `noise_bg` add their own layers.
- `grade` `lut` wants a `.ffx` preset (a LUT element), never Apply Color LUT.
- A script with a ternary inside a ternary's first branch (`a ? (b ? 1 : 2) : 3`) stops After
  Effects with a modal "Expected: :" dialog. Write if/else.
