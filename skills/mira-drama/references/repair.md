# Repair and the cut

What to do when a take comes back wrong, and how to cut generated clips into a drama. The ladder
goes from cheapest to dearest; climb only as far as the defect requires.

## Triage first

Name the defect before touching the prompt:

| Defect | Usual cause | First fix |
|---|---|---|
| the face drifts between shots | identity paraphrased, no anchor frame | paste the identity line word for word; start from a frame (`startImageUrl`) |
| the wrong person talks | two front-facing faces in a speaking shot | one speaker per shot; the other turned away or out of frame |
| actions blur together | too many actions for the length | split the shot; one or two actions per 4-5 s |
| the light flips on the reverse | light written relative to the camera | fix the light to the room (scene.md) |
| the eyelines do not meet | shots on both sides of the axis | stay on one side; crop two singles from one two-shot |
| a prop changes or doubles | synonyms for the prop; it left and re-entered the frame | fixed nouns; put the exit and re-entry on a cut |
| bodies merge in contact | one shot carries both bodies in contact | split by character, contact on the cut |
| the camera wanders | no camera decision, or "cinematic" with no move | a move in `direction.camera_moves` and in words; "Fixed camera." for a locked shot |
| the look changes between shots | grade and stock not repeated | the same `grade`, `stock`, `palette` on every take of the series |

Two different defects in one take: re-plan the shot, do not patch the prompt. Three: it was three
shots.

## The ladder

1. **Trim in the cut.** Most clips have a usable stretch; take it.
2. **Cover with an insert.** A 0.8-1.5 s close-up of a hand, an object or a reaction hides a jump.
3. **Cut on action.** A cut in the middle of a movement hides drift best.
4. **Reframe.** Crop a single from a two-shot; push in on the usable part (`reframe_video` for a
   new ratio).
5. **Same prompt, new take.** Variance alone fixes many small things; try a cheap tier first
   (`draft` on `seedance-2-5`, `quality: "sd"` on `omni`).
6. **Edit the take, not the scene.** `modify_video` for light or weather, `swap_object` or Draw to
   Edit (`draw_edit_video`) for one wrong thing in an otherwise good take.
7. **Re-plan the shot.** Fewer actions, a different angle, the contact moved to a cut.
8. **Re-plan the beat.** The scene is asking a model for something it cannot do; tell it another
   way.

Three failures on the same shot: change the shot, not the wording. Re-render only for an identity
error, a defect over more than half the clip, or broken physics; everything else is fixed in the
cut.

What prompting does not fix today: fine hand work longer than about 1.5 s, two bodies in long
contact, exact counts of many things, reflections that must match, a crowd of distinct faces.
Design around them.

## Cutting generated clips

**Handles.** Plan to drop roughly the first 8 and last 12 frames of every clip (the model settles
in and drifts out). Render 1.5-2.5 s longer than the shot needs.

**Harvest.** One longer clip with a held composition can give two or three shots in the cut: a
wide, then a crop, then the reaction. Fast cutting is expensive when every shot is a generation;
harvesting is how a 2.5 s average stays affordable.

**Dialogue edits.** Enter about 0.25 s before the first sound of a line and leave about 0.4 s
after the last (about 0.6 s across a big jump in shot size); no line shot shorter than 1.2 s. Let
the sound lead or trail the picture (J- and L-cuts) so reactions breathe. A blow's close-up holds
0.3-0.5 s around the contact.

**Joining clips made apart.** Match five things across a hard cut: the eyeline side, the light
direction, the grade, the wardrobe state, the prop positions. Break the shot size on purpose
(wide to close, never close to almost-as-close). A dissolve is an honest repair between scenes,
never between two shots of one continuous moment.

**Sound and captions.** Even the speech to about -19 LUFS within 1 LU, true peak at or below -1.5
dBTP. In a vertical frame place captions about 24% of the height above the bottom, about 40
characters per line. `add_captions` burns them in; `add_soundtrack` and `add_sound_effects` cover a
silent take (mira-audio).

**After Effects or Premiere.** When the user cuts in their own editor, hand over the takes and the
shot list (mira-premiere, mira-after-effects); in AI Film Studio the cut is the team's Editor
(film-studio.md).
