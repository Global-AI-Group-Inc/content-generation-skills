# A private element bank for After Effects

Third-party packs (templates, overlays, LUTs, sound effects) cannot be shipped with a public
skill, so they live in a private library on the user's machine. This file describes the layout
that the recipes expect, so a new library can be built the same way.

## Layout

```
$AE_LIBRARY (default ~/AE-Library)
  src/<pack>/            unpacked packs as they came
  bank/
    BANK.md              the table the agent reads first
    bank.json            the full index
    bank-index.jsx       the same index as an ES3 object literal (`var BANK = {...}`)
    ae-bank.jsx          the recipes (overlay, transition, useTemplate, sfx, ffx, grade, beatGrid)
    curation.json        hand-written tags, moods, blend hints, hit times
    crawl/out/<id>.json  one structure dump per .aep (comps, layers, texts, controls, fonts)
    previews/            contact sheets per media family and per LUT family
    graded/              clips pre-graded with a LUT before import
    presets/lut/         hand-saved .ffx presets for LUTs that must be applied inside AE
```

## An entry

One entry per family; a family collapses numbered variants (`Light 01..05`) and is addressed
as `pack/family`, variants as 1-based indexes.

| field | meaning |
|---|---|
| `id` | `pack/family` or `pack/dir--family` when names collide |
| `kind` | `template`, `overlay`, `transition`, `background`, `mockup`, `lut`, `sfx`, `preset`, `script`, `plugin` |
| `paths` | absolute paths, one per variant |
| `format`, `duration`, `fps`, `w`, `h`, `alpha`, `loopable`, `aspect` | from ffprobe |
| `blend_hint` | `screen`, `add`, `overlay`, `multiply`, `normal`, `luma`, `alpha` |
| `hit` | seconds: the transient of a sound, or the frame where a transition covers the frame |
| `main`, `comps`, `texts`, `controls`, `placeholders`, `fonts_required`, `fonts_missing`, `effects_missing` | templates only, from the crawl |
| `tags`, `mood`, `use_for`, `notes` | curation |
| `mac_ok` | false when the pack needs a Windows-only plugin or a missing effect |

## How templates are crawled

A script running inside After Effects imports each `.aep` with
`ImportOptions.importAs = ImportAsType.PROJECT` under suppressed dialogs, walks every
composition and layer, records text layers (text, font, size, whether an expression drives
them), expression controls on controller layers (sliders, colours, checkboxes with their values),
placeholder footage, effects used and effects not installed (`app.effects`), fonts not installed
(`app.fonts.getFontsByPostScriptName`), then removes the imported folder. Batches of 8-25 files
fit inside the bridge timeout; a budget check and per-file resume make the crawl restartable.

## BANK.md

Generated from `bank.json`: one table per kind, one row per family, under 600 lines, so an agent
can read the whole thing before choosing. Look at the preview sheet of a family before using it;
names lie, frames do not.
