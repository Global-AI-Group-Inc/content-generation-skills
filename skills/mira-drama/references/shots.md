# Shots: what one generation can hold

Turning beats into shots a model can actually render, and the model behaviours that decide
dialogue, reactions and contact. Numbers marked "probe" come from small open probes (2-4 runs per
variant through third-party access); treat them as hypotheses and confirm on your own takes.

## Beat to shot

- A line plus a gesture is one shot.
- A change of tactic, or the listener's face, is a cut.
- A chain of blows is split by phase: wind-up, contact, consequence.
- A silent blow (the look, the slammed door, the photo on the table) is its own held shot.
- One exchange of lines is one shot.

**Load.** A 4-5 s shot holds one or two connected actions. Probe on Seedance at 5 s with 2, 4 and
6 actions: two or three stayed readable; the extra ones were not dropped but squeezed to half a
second each. Speed comes from the clip length, not from words: "without pauses" or second-by-second
timecodes did not change the curve. For one round of a fight pick the shortest length it fits.

**Vertical frame.** No empty establishing wides: reveal the space through the lead's action (she
walks in, the room opens behind her). Close-ups carry a vertical drama; a starting norm is 45% or
more of shots at close-up and an average shot of about 2.5 s on the final cut. If the model's
minimum clip is longer than that, either render several shots as one multi-shot clip or harvest
two shots from one longer clip (repair.md).

## The shot card

Every shot is written as a card before it is rendered. The camera and light lines are not
optional.

```
Shot 07 - Reaction | 3 s | axis: Anna left, Marco right
Frame: close-up, Anna, head in the upper third, eye-level
Action: she reads the message; a beat; her jaw tightens; she turns the phone face down
Line: none (Marco, off: "You knew.")
Camera: holds, then a short push-in as the phone turns        -> direction.camera_moves
Light: the phone screen lights her from below, the window behind -> direction.lighting
State: coat off, damp hair (ledger)
Cut: on the phone turning, to Marco's single
```

The camera and light lines name the decision in words; the arrows say which `direction` field
carries the key you picked in `mira-craft`. Grade, stock and palette are set once for the series
and repeated on every card's render.

## Dialogue

**Speech rate.** English runs about 3 words per second on screen. Probe on MiniMax H3: speech
starts 1.3-2.4 s late when the shot is anchored on a first frame, and dialogue shots came back
1.5-2.5 s longer than planned; with three or more lines in one multi-shot segment, lines were
lost. Plan short shots, one line or one exchange each, and leave a tail.

**Wrong mouth.** H3 and Wan put the lip movement on the most visible front-facing face. State the
silent one explicitly ("he listens, lips closed") or, better, turn them away or keep them out of
frame. One speaker per shot is the safe default.

**Give the line to the listener.** Put the important line over the listener's reaction shot; the
voice then never has to sync to a mouth, and the drama lands on the face that receives it.

**Recorded apart.** For exact words in several voices generate the dialogue track first
(`generate_audio` kind `dialogue`), then match lips per shot (`lipsync_video`), or lay it over
listener shots in the cut (mira-audio).

## Reaction close-ups

Models want opposite things here (probe):
- **MiniMax H3:** name the emotion in one word, give two visible tells (the eyes drop, the hand
  tightens), keep it within about 1.5 s and hold.
- **Seedance 2.5:** a written visible chain works best: the trigger, a pause, the build, the hold
  ("she hears the name, freezes for a beat, her breath catches, then her face sets").
- Always show a reaction to a decisive line: its own close-up, or a freeze in the two-shot.

## Contact between bodies

- A slap on H3 (probe): one shot with the whole phase, approach - contact - force - result.
- A push on H3: two shots, before contact and after.
- A punch on Seedance (probe): over the shoulder of the one who hits, from the hitter's side, the
  point of contact hidden: 3 of 3 readable; from the side, head-on: 1 of 3. Show what the blow does
  (the pipe falling, the chair sliding) as a separate shot.
- A blow as a cut sequence: wind-up / the receiver's close-up with the fist entering from off
  frame / the consequence, cut to about 0.8 + 0.4 + 1.0 s.
- Two bodies in contact for long (an embrace, a struggle) drift; split them by character and put
  the contact on the cut.

Mira's action rules (mira-video-prompting action.md) still hold; this adds the drama cases.

## Framing words that work

- "Fixed camera." stops the model adding its own push or pan when the shot should be locked.
- Without a start frame, write a concrete frame: waist up, head in the upper third, camera height
  and distance.
- Depth through foreground and background relative to the camera. "Facing each other across a
  table" failed in a probe (0 of 9); "her shoulder soft in the foreground, him sharp across the
  table, both in profile to the lens" is the kind of sentence that holds.

## Keeping several shots consistent

- In a multi-shot clip, anchor each cut with its own keyframe; without them the face and the
  composition drift from the second shot on (probe on H3 and Seedance 2.5: frame similarity fell
  from about 0.89 to about 0.35).
- To continue an unbroken action, use the real last frame of the previous clip
  (`film_extract_frame`) or `extend_video`.
- To write what happened before a finished clip, use first-and-last-frame mode with the clip's
  first frame as the end anchor, or `extend_video` backward on `seedance-2-5`.
- A reference clip lends its motion and its cuts too: Seedance copies the edit of a reference
  video along with the movement.
