# Scene: blocking, power, the bible

How a scene is staged so the drama reads in the frame, and how characters, places and states stay
the same across shots and episodes. Object counts, hands and cause-before-reaction are in
`mira-craft` continuity.md; this file adds what a series needs on top.

## Blocking a scene

Answer four questions before any shot: who wants what from whom, who moves, where the axis runs,
where the light comes from in the room.

**Distance in numbers.** Write a change of distance as metres over seconds ("from 2.4 m to 0.6 m
over 4 s"), never "comes closer". Whoever closes the distance wants something; whoever does not
step back holds the power.

**Power moves**, used one at a time:
- height: one stands, one sits; the camera below the standing one's shoulder line shows the
  ceiling behind them;
- the exit: whoever stands between the other and the door controls the scene;
- stillness: the one who moves is the one who needs; the one who holds position wins;
- the turn away mid-line: power taken by refusing to look;
- the object: whoever holds the phone, the envelope, the key holds the scene.

**Staging that a model renders reliably**, best first:
- a table between two people: the most stable geometry for dialogue;
- a doorway: cut on the threshold rather than walking through it in one take;
- depth instead of coverage: a soft head in the foreground drops out of frame and the figure
  behind becomes the subject, a shot and reverse in one generation;
- one person moving, everyone else holding with an explicit verb ("she stays seated, hands flat
  on the table"); a body with no verb drifts.

Unreliable, replace them:
- an orbit around two people: use two locked angles at the ends of the arc and cut;
- an object handed from one to the other: cut on the hand-over, giver in one shot, receiver in
  the next;
- stairs, a fall, sitting down into furniture: start or end the shot after the motion;
- two people speaking in one shot with lip sync: one speaker per shot (shots.md).

**Entrances are hard, exits are easy.** A body entering the frame is invented anew by the model.
Start with a piece of it already in frame (a shoulder, a hand on the door, a shadow on the wall).
An exit past the lens is strong and costs a take.

## The axis

Draw the line between the two people who talk. Every shot of the scene stays on one side of it,
so she always looks right and he always looks left. Write the side into each shot line ("axis:
Anna left, Marco right"). In a three-hander name the active pair per shot.

Cross the axis only legally: on a visible move of a character, on a camera move through the line,
on a neutral shot straight down the axis, or after a cut to an insert. When two singles do not
match their eyelines, render one two-shot and crop both singles from it.

## Light belongs to the room

Fix the light to the location, not to the camera: "the window is on the north wall, the lamp on
the desk by the door". Then each shot gets its own camera-relative phrase derived from that ("from
behind her, the window rims her hair; from the reverse, the window lights his face from the
left"). A light written relative to the camera flips on the reverse shot and the cut breaks.

In a two-hander one direction lights both faces; the drama is the difference in contrast between
the faces, not a change of direction. Move the spread, never the direction: an even 2:1 while
power is balanced, 6:1 on the one losing it, back to 3:1 at the turn. A practical source in the
frame (a lamp, a screen, a candle, headlights) is the most reliable light a model renders and the
easiest to change on a beat.

Pick the scheme in `mira-craft` light.md and pass it in `direction.lighting`; write the room
geometry and the per-shot phrase in the prompt.

## The bible

Built once per series, pasted word for word into every shot that needs it. Paraphrase is where
drift starts.

**Identity line, 30-50 words per character:** age as one number, two or three facts of the face
structure, exactly one checkable mark with its side ("a small mole under the left eye"), the hair,
and one item of wardrobe last. Never in it: mood, lens, "looks like actor X", an age range, states
that change (wet, crying, bleeding). With AI Film Studio the element's passport plays this role;
keep the prompt consistent with it.

**Wardrobe and its state, kept apart.** Wardrobe is permanent for the episode ("charcoal wool coat,
white shirt"). State changes per shot and moves at most one step between adjacent shots: dry →
damp → soaked, never dry → soaked across a cut. The exit state of a scene is the entry state of the
next. Keep a short ledger per episode:

| Shot | Anna | Marco |
|---|---|---|
| 3 | coat on, dry | jacket open |
| 4 | coat on, damp shoulders | jacket open, phone in hand |
| 5 | coat off on the chair, damp hair | phone face down on the table |

**Locations with an orientation rule:** the room in one paragraph and one rule for the camera
("the camera stays on the window side of the table"), plus the light geometry above. Use only
furniture visible in the location reference; anything not in it the model invents differently in
each shot.

**Props by fixed nouns:** describe each prop with the same two or three nouns every time ("the red
leather notebook"); a synonym becomes a different object.

## Series continuity

- Grade, film stock and palette are chosen once for the series and passed in `direction` on every
  take (mira-craft look.md and direction.md).
- The last frame of an episode is the reference for the opening of the next when the action
  continues (`film_extract_frame`).
- Time of day and weather are written as states in the ledger and change only on a visible cause
  or a cut to a new scene.
