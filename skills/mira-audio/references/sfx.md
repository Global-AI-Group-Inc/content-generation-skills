# Sound effects

`generate_audio` kind `sfx`: a sound described in words becomes an mp3 from 0.5 to 30 seconds.
Foley, impacts, whooshes, ambience beds, UI sounds, trailer risers. One sound per call.

```
generate_audio {"kind": "sfx", "durationSeconds": 2,
  "text": "A heavy oak door slams shut in a long stone corridor, close perspective, sharp wooden impact with a long echoing tail"}

generate_audio {"kind": "sfx", "durationSeconds": 20, "loop": true,
  "text": "Steady light rain on a car roof heard from inside the car, muffled, constant, no thunder, no music"}
```

- `durationSeconds` 0.5 to 30. Leave it empty and the model picks a natural length for the event.
- `loop: true` makes the end flow back into the start without a click, for ambience beds and
  engine idles under a longer scene.
- Price: `estimate_cost {"kind": "audio", "model": "sfx", "durationSeconds": 2}`.

## Writing the prompt

Five things, in this order, in plain English:

| Part | Examples |
|---|---|
| source: what makes the sound, and its material | "a ceramic mug", "a V8 engine", "a crowd of about fifty people", "a paper bag" |
| action: what it does | "set down hard on a glass table", "revs twice and idles", "cheers then settles", "crumpled in one hand" |
| space: where it happens | "in a small tiled bathroom", "in an open field", "in an empty warehouse", "inside a car" |
| perspective: where the listener is | "close-mic", "from across the street", "passing from left to right", "heard through a wall" |
| intensity and tail: how it starts and ends | "soft onset", "sharp transient", "dry, no reverb", "long metallic ring-out", "cuts off abruptly" |

Say what must not be there when the model likes to add it: "no music", "no voices", "no birds".

Named effect types the model knows: whoosh, swoosh, riser, downlifter, impact, hit, boom, sub
drop, braam, stinger, glitch, click, pop, UI confirmation, notification chime, Foley footsteps,
cloth rustle, room tone.

## One event per call, then layer

A complex moment is several simple sounds stacked. Generate each part short and on its own, and
line them up in the editor:

| Moment | Layers |
|---|---|
| a logo slam | a 1.5 s rising whoosh + a 1 s deep impact with sub drop + a 3 s metallic ring-out |
| a car passing | a 4 s engine pass-by left to right + a 2 s tyre hiss on wet asphalt |
| a product reveal | a 2 s riser + a 0.5 s bright shimmer hit + a 3 s room tone bed (looped) |
| a punch in a fight scene | a 0.5 s cloth whoosh + a 0.5 s dull body impact + a 1 s scuff of shoes on concrete |

The loudest transient of each layer goes on the frame where the thing happens: the impact on the
cut, the whoosh ending on it.

## Getting it onto the picture

The effect is a separate mp3; Mira has no tool that lays an arbitrary track under a finished clip.
Stack effects on a timeline in the user's After Effects (mira-after-effects covers sound layers and
where their transient goes) or in their own editor. For music under a clip use
`add_soundtrack`, for a voice `voiceover_video` (mix.md).
