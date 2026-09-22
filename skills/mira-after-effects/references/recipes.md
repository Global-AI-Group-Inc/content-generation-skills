# ExtendScript recipes for the bridge

Everything below runs through `adobe_execute_script`. Keep each call under 40 000 characters;
put libraries in files and load them with `$.evalFile(new File("/abs/path/lib.jsx"))`. The call
returns only what you assign to `result`; anything else goes to a log file you read afterwards.

## Bridge rules learned the hard way

- Never concatenate a string with an object: `"t=" + new Date()` and `"err " + e` throw
  "Object of type X found where a Number, Array, or Property is needed". Always `String(x)`,
  `e.message`, `d.getTime()`.
- Never `addProperty("ADBE Apply Color LUT")` from a script: it opens a file dialog that blocks
  the host and the bridge until someone clicks Cancel. Apply LUTs with `applyPreset` on a
  hand-saved `.ffx`, or grade the footage with ffmpeg `lut3d` before import.
- `app.effects` is 0-based. `comp.layer(i)` and `folder.item(i)` are 1-based.
- The host script is ES3: no `JSON`, no `Array.map`, no trailing commas, no regex literal with
  `/` inside a character class (`/[\\/]/` not `/[\/]/`). Ship indexes as object literals.
- Long scripts keep running after the bridge times out (180 s). Batch work with a time budget,
  write progress to a file, resume by skipping what exists.
- Wrap `beginSuppressDialogs()` / `endSuppressDialogs(false)` around imports of foreign
  projects; dialogs the host raises anyway (LUT chooser, font manager) still need a human.
- Source Text: `var td = prop.value; td.text = String(v); prop.setValue(td)`; a text layer whose
  Source Text has an expression is driven by a controller, edit the controller.
- `KeyframeEase` influence must be at least 0.1. Set `parent` after keying the children.
  Opacity is not inherited through `parent`; fade every layer.
- Short footage under a long layer: `timeRemapEnabled = true` and
  `loopOut('cycle')` on Time Remap, then set `outPoint`.
- Globals from every `$.evalFile` share one scope: prefix library internals, never reuse a
  helper name for a variable.
- Write logs and frames inside the project folder; `/tmp` works on macOS but is not portable.

## Import footage once

```js
function imp(path) {
  var f = new File(path), it = findItem(f.name, FootageItem);
  if (it) return it;
  it = app.project.importFile(new ImportOptions(f));
  it.parentFolder = folder("assets"); return it;
}
```

## Import a template project

```js
var io = new ImportOptions(new File(aep)); io.importAs = ImportAsType.PROJECT;
app.beginSuppressDialogs();
var fld = app.project.importFile(io);      // a FolderItem with the whole project inside
app.endSuppressDialogs(false);
var main = findCompIn(fld, "Render");        // recursive search by name
main.layer("Title").property("ADBE Text Properties").property("ADBE Text Document") ...
var l = targetComp.layers.add(main); l.startTime = t0;   // nest it
```

Controls live on a controller layer as expression controls: read `effect.matchName`
(`ADBE Slider Control`, `ADBE Color Control`, `ADBE Checkbox Control`), set `effect.property(1)`.
Placeholders are footage items; `layer.replaceSource(newItem, false)` on every layer that uses
one.

## Overlay with a blend mode

```js
var l = comp.layers.add(imp(clip)); cover(l);            // scale to fill W x H
l.blendingMode = BlendingMode.SCREEN;                     // grain: OVERLAY, paper: MULTIPLY
l.inPoint = tIn; l.outPoint = tIn + dur; l.startTime = tIn;
```

## Transition on a cut

Light leak or film burn: an overlay whose full-cover frame (`hit`) sits on the cut, so
`startTime = tCut - hit`. Luma wipe: place the wipe clip directly above the incoming layer and
`incoming.setTrackMatte(wipe, TrackMatteType.LUMA)`; the wipe starts at `tCut - hit`.

## Sound

`layer.startTime = t - hit` where `hit` is the transient measured with ffmpeg (peak RMS over
20 ms windows). Levels: `layer.property("ADBE Audio Group").property("ADBE Audio Levels")`
takes decibels.

## Stock-effect grade

An adjustment layer on top: `VISINF Grain Implant` (Add Grain) or a grain clip on Overlay,
`CS Vignette` (CC Vignette), three additive copies with `ADBE Shift Channels` offset by a few
pixels for chromatic aberration. Names differ from the menu: check `app.effects[i].matchName`.

## Beat grid

`function beatGrid(bpm, offset) { var d = 60 / bpm; return { beat: d, b: function (k) { return offset + d * k; } }; }`
Measure `offset` from the kicks of the decoded audio, not from a timestamp someone wrote down.

## Verify

Export frames at the key times (`comp.saveFrameToPng(t, File)` or `adobe_export_frame`), run a
bounding-box lint over text layers every half second (out of frame, overlapping), render with
`aerender`, then look at a contact sheet (`ffmpeg -vf "fps=2,tile=6x5"`) before calling it done.
