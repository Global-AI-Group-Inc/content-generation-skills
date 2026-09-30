# Dialogue

`generate_audio` kind `dialogue`: several voices take turns in one mp3, performed together on
Eleven v4, so the timing between turns sounds like a conversation rather than clips glued in a
row. For a podcast intro, a two-voice radio ad, a sketch, an interview, a customer exchange.

## The call

```
generate_audio {"kind": "dialogue", "lines": [
  {"voiceId": "<host>",  "text": "[excited] Okay, I have to show you something. Close your eyes."},
  {"voiceId": "<guest>", "text": "[suspicious] Why do I feel like this is going to be another gadget?"},
  {"voiceId": "<host>",  "text": "[laughs] Because it is. But this one—"},
  {"voiceId": "<guest>", "text": "[interrupting] —folds into your pocket. You said that about the last one."},
  {"voiceId": "<host>",  "text": "[short pause] ...Okay, fair. But this time it's TRUE."}
]}
```

- `lines` is the script in order: one turn per line, each with its voice.
- Up to 2000 characters across all lines, tags included, and up to 10 different voices.
- Audio tags work per line exactly as in speech.md; the line inherits nothing from the one before.
- Speakers are set by `voiceId`. Never write "Host:" or a name label into the text: it is spoken.
- Price: `estimate_cost {"kind": "audio", "model": "dialogue", "chars": 900}`.

## Casting

A listener has to tell the voices apart without names. Cast for contrast: a different gender, or
a clear gap in age, pitch or pace. Two similar mid-range voices turn a dialogue into one person
talking to themselves. Find them with `list_voices` (use case `conversational` or `characters`),
play the previews to the user, then write the lines for the voices you picked: a dry, low voice
reads `[deadpan]` well and `[giggles]` badly.

## Writing turns that sound live

- Short turns. Real conversation is mostly one or two sentences a turn, with a longer one for the
  story or the reveal. Vary the lengths; equal turns sound read.
- Reactions are turns: "Mm-hm.", "[laughs] No way.", "Wait, what?" They carry the rhythm.
- Cut-offs: end a turn with an em dash (`But this one—`) and open the next with `[interrupting]`
  and a dash. The second voice comes in on top of the last syllable.
- Trailing off: an ellipsis at the end of a turn and a reply that picks it up.
- Silence: `[short pause]` or `[long pause]` at the start of a turn, or an ellipsis before the
  first word, gives the beat before an answer.
- Names in speech ("Right, Sam?") help the listener track who is who in the first seconds.
- Spoken style: contractions, fragments, a restart ("I mean— look, it works.").

## Longer scenes

Over 2000 characters, split into scenes at a finished exchange, never mid-turn. Keep the same
voices in every part and generate them in order; join them in an editor.
Each part ends on a complete turn, so the joins sit in natural pauses.

## Putting it on picture

The dialogue mp3 is a sound track: it plays under a clip in an editor or in the user's After
Effects (mira-after-effects). `lipsync_video` animates one face per clip, so a two-shot of both
speakers is better made as one clip with native speech on a model that speaks (read
mira-video-prompting), with the same words in the prompt.
