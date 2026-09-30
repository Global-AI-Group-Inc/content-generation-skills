# Speech

`generate_audio` kind `speech`: one voice reads a text and the result is an mp3. The same engine
speaks the script in `voiceover_video` (mix.md), so everything below applies there too.

## Eleven v4 or v4 Turbo

| | v4 (`"model": "v4"`, the default) | v4 Turbo (`"model": "turbo"`) |
|---|---|---|
| Delivery | acts: reads the emotion from the text, laughs, whispers, changes pace inside a line | the same voice and tags, a little less nuance |
| Languages | 85 | 85 |
| Audio tags | yes | yes |
| Text per call | 10000 characters | 20000 characters on Mira (above 10000 Mira reads it with Flash v2.5) |
| Price | `estimate_cost` kind `audio`, model `speech` | half; model `speech_turbo` |

Take v4 for anything with a performance: an ad, a story, a character, a hook that has to land in
the first second. Take Turbo for long reads (a course, a manual, an article read aloud), for cheap
drafts of a script whose timing you are still checking, and for bulk variants. A script drafted on
Turbo and finished on v4 changes length a little; re-time it after the switch. The old names
`"v3"` and `"flash"` are still accepted and mean the same two tiers.

Voices a user designed from a description are read with Eleven v3 automatically (ElevenLabs says
designed voices perform less well on v4); cloned and library voices use v4.

```
generate_audio {"kind": "speech", "model": "v4", "language": "en", "voiceId": "<id from list_voices>",
  "text": "[excited] It's finally here. The lightest running shoe we have ever made."}

generate_audio {"kind": "speech", "model": "turbo", "language": "de",
  "text": "Willkommen zum zweiten Kapitel. Heute geht es um die Pflege von Lederschuhen."}
```

The generation id of the result feeds `lipsync_video` as `audioGenerationId` and `change_voice`
as `sourceGenerationId`.

## Writing for the ear

The voice reads everything it is given, including what a reader would skip. Write the text the
way it should sound.

- Short sentences, one idea each. A listener cannot go back and re-read a clause.
- Numbers, prices, dates and units as words when the reading matters: "twelve ninety-nine", not
  "$12.99"; "March third"; "two to three days". Phone numbers in the groups people say them in.
- Links and handles as spoken: "mira dot mybots dot pro", "at mira ai".
- Abbreviations the way they are said: "A-I" letter by letter, "NASA" as a word.
- A brand name the voice gets wrong: respell it phonetically for this call only, and keep the
  on-screen text correct.
- No parentheses, slashes, bullets, emoji or markdown. They are read aloud or dropped at random.

Punctuation is the direction you have on both models:

| Mark | What the voice does |
|---|---|
| comma | takes a breath |
| full stop | finishes the thought, a short rest |
| ellipsis `...` | hesitates, trails off, a longer rest |
| em dash `—` | breaks the thought or cuts off |
| question mark | lifts the end of the line |
| exclamation mark | adds energy; one per paragraph is plenty |
| a word in CAPITALS | gets the stress; one per sentence at most |
| a new paragraph | a longer pause and a reset of the delivery |

There is no pause of a set length: Eleven v4 ignores SSML, so `<break time="1.5s" />` is dropped
silently (checked live on 2026-09-30). For a longer pause end the sentence, use an ellipsis or start
a new paragraph; for a beat of silence between two reads, generate them separately.

v4 varies more on very short texts. A single line under about 250 characters can come back with a
different reading each time: give it a sentence of context, or generate two takes and keep the
better one.

## Audio tags

A tag is a stage direction in square brackets, in English, placed before the words it colours. It
is not read aloud (checked on v4 and v4 Turbo). It holds until the next tag or until the delivery
resets at a new paragraph. v4 reads free-form directions (`[quietly curious]`, `[lower, thoughtful]`
work too), so this is a starting set that works reliably, not a closed list.

| Kind | Tags |
|---|---|
| emotion | `[excited]`, `[happy]`, `[sad]`, `[angry]`, `[nervous]`, `[curious]`, `[surprised]`, `[sarcastic]`, `[tired]`, `[thoughtful]`, `[annoyed]`, `[relieved]`, `[in awe]` |
| delivery | `[whispers]`, `[shouting]`, `[quietly]`, `[loudly]`, `[rushed]`, `[deadpan]`, `[flatly]`, `[dramatically]`, `[hesitates]`, `[stammers]`, `[matter-of-fact]`, `[mischievously]` |
| pacing | `[pause]`, `[short pause]`, `[long pause]` |
| non-verbal | `[laughs]`, `[chuckles]`, `[giggles]`, `[sighs]`, `[exhales]`, `[inhales deeply]`, `[gasps]`, `[clears throat]`, `[gulps]`, `[snorts]`, `[sniffles]`, `[crying]` |
| accent | `[strong French accent]`, `[British accent]`, `[Southern American accent]`, `[Australian accent]` |
| experimental | `[sings]`, `[applause]`, `[clapping]`: unreliable; make real effects with kind `sfx` |

What keeps tags working:

- The tag has to suit the voice. A breathy, close voice will not shout convincingly; a booming
  narrator will not giggle. Change the voice before stacking tags.
- The words have to agree with the tag. `[sad]` over a cheerful sentence gives a confused read.
- One or two tags per sentence at most. A tag on every clause turns into a caricature.
- A non-verbal tag goes exactly where the sound happens: "[laughs] No, seriously. [sighs] Fine."
- An accent tag bends the voice's own accent. For a native speaker of a language, pick a voice
  from that language instead (below).

```
generate_audio {"kind": "speech", "model": "v4", "language": "en",
  "text": "[whispers] Okay... nobody knows about this yet. [excited] But the new one is HALF the weight! [laughs] I know. I didn't believe it either."}
```

## Language

`language` is an ISO-639-1 hint: `en`, `es`, `de`, `fr`, `pt`, `it`, `ja`, `ko`, `zh`, `ru` and
the rest. v4 reads the language from the text anyway; set it for short texts, for names and
numbers, and for a text that mixes languages, so the reading follows the language you mean.

The voice keeps its accent across languages: an American voice reading Spanish sounds like an
American speaking Spanish. For a native sound call `list_voices` with `language` or `accent` and
pick a voice from that language. v4 and Turbo cover the same 85 languages; v4 also keeps a cloned
voice sounding like itself in a language its owner never recorded.

## Length

v4 takes 10000 characters a call and Turbo 20000; above that the call fails with `text_too_long`.
About 900 characters of English make a minute of speech. For a longer text split at paragraph
ends, keep the voice, the model and the language the same for every part, generate the parts in
order and join them in an editor.

## Choosing the voice

The voice decides more than any tag. `list_voices` returns the platform's voices and the user's
own, each with a name, a kind, a description, labels (gender, age, accent, use case, language)
and a `previewUrl` to listen to.

```
list_voices {"scope": "library", "gender": "female", "age": "middle aged", "accent": "british", "useCase": "narrative"}
list_voices {"language": "es"}
list_voices {"scope": "mine"}
list_voices {"query": "warm"}
```

Gender and age match exactly (`male`, `female`, `neutral`; `young`, `middle aged`, `old`).
Accent, use case and language match part of the label, so one word is enough: `narrative`,
`conversational`, `characters`, `social`, `advertisement`, `news`, `educational`. `query` searches
names and labels. Labels differ between voices: when a filter returns nothing, drop the least
important one or move the word into `query`. Offer two or three candidates by name with their
preview links and let the user listen before you spend on a long text.

An empty `voiceId` means the platform's default voice, Sarah, a premade female American voice:
fine for a neutral read, a poor choice for a character. `voiceover_video` falls back to the same
voice. Designing a new voice is in voices.md.
