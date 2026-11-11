# Interpreter Strip — German Practice

A single-page web guide that helps a Scout or adult leader prepare for the four
requirements of the Scouting America Interpreter strip in German.

## The requirements

Youth and adults may wear the Interpreter strip by showing their knowledge of a
foreign language or sign language by carrying on a five-minute conversation in
the language, translating a two-minute speech or address, writing a letter in the
language (this one does not apply for sign language), and translating 200 words
from the written word.

## What this is, and what it is not

Three of the four requirements need a live witness: a counselor has to hear the
conversation, hear the translated address, and read the letter. This guide does
not certify anyone and does not pretend to. It is preparation scaffolding —
prompts, drills, and reference answers the learner reveals only after their own
attempt, plus a head start on the vocabulary English speakers already half-know.

The views are an overview of the requirements, a Patterns course that teaches
high-yield rules for reading German above an A1 level, a conversation prep with
topic cards and a five-minute timer, speeches to translate with references, a
letter module with German conventions and a model, and 200-word translation
drills. The four requirement sections are designed to build on each other — the
conversation plants words used in the speech, the speech plants words used in the
letter, the letter plants the format reused in the translation.

## Approach

The floor is a learner who has finished an A1 class. Rather than drill vocabulary,
the guide teaches the patterns that connect English and German — identical
cognates, verb cousins, the th→d and k→ch sound shifts, the small glue words,
sound-alikes, and a few pronunciation tricks — then gives them German text built to be read
with those patterns. Most words in each passage are reachable by a taught
pattern, a function word, or basic A1 vocabulary, with only a handful needing
context. `tools/coverage.py` measures this against the mutual-intelligibility
catalog. Teach the pattern, then give text it unlocks.

## Content sources

All German is original, written for this guide at an A1 reading level: the
200-word translation passages, the addresses to translate, the model letter, and
the conversation prompts. The patterns and the false-friend warnings are drawn
from the English–German mutual-intelligibility pattern catalog.

All practice material lives in `content.js` as data, separated from the app shell,
so adding a new source is a data edit, not a code change. Add an entry to `SOURCES`
and reference it by `sourceId` from a new passage or speech.

## Running it

Static files, no backend. Serve the directory with any static server:

```bash
python3 -m http.server 8753 -d .
```

Then open `http://localhost:8753/`. It can also be opened directly from disk.

## Built on Axe

Styling uses the [Axe](https://github.com/excelano/axe) semantic CSS framework.
`brand.css` is the project's Scouting field-guide palette (navy, warm paper, signal
red), with light and dark themes. `axe/` holds vendored copies of the Axe files the
page uses; refresh them from the Axe repository when it updates.

## Structure

```
index.html    App shell: nav and one <article> per view.
app.js        View rendering, tab routing, and the countdown timers.
content.js    All practice material as data (SOURCES, PATTERNS course, + the four requirement modules).
app.css       Project-specific styles layered on Axe.
brand.css     Project brand: colors, fonts, shape.
axe/          Vendored Axe framework.
tools/        coverage.py — measures passage decodability and cross-section vocabulary overlap.
```

## License

Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0). See the
LICENSE file. The cognate pairs, sound-shift groupings, and false-friend list are
drawn from the
[mutual-intelligibility](https://github.com/anderix/en-de-mutual-intelligibility)
project, which is CC BY-SA 4.0; this guide carries the same license accordingly.
