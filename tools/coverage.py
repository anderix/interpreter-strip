#!/usr/bin/env python3
"""
coverage.py — measure how decodable each German passage is.

The pedagogical claim is that a learner who knows the seven patterns in the
Patterns tab can read German well above an A1 level. This script tests that
claim against real data instead of an eyeball estimate.

The reference catalog is the en-de-mutual-intelligibility repository — the same
catalog the Patterns tab teaches a subset of. Every content word in each passage
is sorted into one of:

  - taught     : reachable by one of the patterns we actually teach
                 (free words, Germanic/verb cousins, th->d, k->ch, glue words,
                  sound-alikes; pronunciation tricks are not a decoding rule)
  - untaught   : in the catalog, but only via a pattern we do NOT teach
                 (other sound shifts, suffix families, loanwords)
  - uncovered  : not in the catalog at all — the learner needs A1 vocabulary
                 or context. These are the flagged words.

Proper names and false friends are counted separately. Matching uses light
morphological normalization (suffix stripping + de-umlauting) to map inflected
passage words onto catalog base forms, so the numbers are a careful estimate,
not a parse. The uncovered list is the conservative, reliable output.

Usage:
    python3 tools/coverage.py [--mi PATH] [passage_id ...]

Author: David M. Anderson. Built with AI assistance (Claude, Anthropic).
"""

import os
import re
import sys
import argparse

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
CONTENT_JS = os.path.join(REPO, "content.js")
DEFAULT_MI = os.path.expanduser("~/en-de-mutual-intelligibility")

# Map mutual-intelligibility filenames to the patterns we teach. Anything
# not listed here is a real cross-language pattern we do NOT teach.
# Keep in sync with the lessons in content.js (PATTERNS.lessons).
TAUGHT_FILES = {
    "identical-spelling-and-sound": "1. free words",
    "germanic-cognates-no-shift":   "2. Germanic cognates (incl. verb cousins)",
    "shift-th-to-d":                "3. th->d",
    "shift-k-to-ch":                "4. k->ch",
    "sound-equivalent":             "6. sound-alikes",
    # function-words handled as the glue set (pattern 5)
}
GLUE_FILE = "function-words"
WARNING_FILES = {"warning-false-friends", "warning-pseudo-anglicisms"}

ARTICLES = {"der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "einer"}
SUFFIXES = ["ern", "nen", "en", "er", "es", "em", "st", "et", "n", "e", "s", "t"]

# Closed-class grammar words a post-A1 learner already owns. They are dropped
# when parsing catalog noun entries ("das Haus" -> "Haus"), so they must be
# re-added to the glue set explicitly or they wrongly read as "uncovered".
CLOSED_CLASS = {
    "der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem",
    "einer", "eines", "kein", "keine", "mein", "meine", "meinen", "meiner",
    "dein", "deine", "sein", "seine", "ihr", "ihre", "unser", "unsere",
    "am", "im", "zum", "zur", "beim", "vom", "ins", "ans",
    "bin", "bist", "ist", "sind", "seid", "war", "warst", "waren", "wart",
    "hat", "habe", "hast", "haben", "hatte", "hatten",
    "werde", "wirst", "wird", "werden", "es", "man",
}

# Proper names appearing in the passages — transparent, but not cognate wins.
NAMES = {
    "max", "tim", "anna", "peter", "maria", "emma", "becker",
    "rhein", "deutschland", "amerika", "koln", "koeln", "september",
}


def deumlaut(w):
    return (w.replace("äu", "au").replace("ä", "a").replace("ö", "o")
             .replace("ü", "u").replace("ß", "ss"))


def clean(token):
    """Lowercase a raw token and drop everything that is not a German letter."""
    token = token.lower()
    return re.sub(r"[^a-zäöüß]", "", token)


def strip_set(word):
    """All comparable forms of a word: itself, de-umlauted, and suffix-stripped."""
    forms = {word, deumlaut(word)}
    for base in list(forms):
        for suf in SUFFIXES:
            if base.endswith(suf) and len(base) - len(suf) >= 3:
                forms.add(base[:-len(suf)])
    return forms


def catalog_bases(german_side):
    """Extract clean base forms from the German half of a catalog entry,
    e.g. 'der Bad / baden' -> {'bad', 'baden'}; 'dies- (dieser/diese)' -> {'dies'}."""
    german_side = re.sub(r"\([^)]*\)", " ", german_side)   # drop parentheticals
    bases = set()
    for part in re.split(r"[/,]", german_side):
        for word in part.split():
            w = word.strip("-").strip()
            c = clean(w)
            if c and c not in ARTICLES and len(c) >= 2:
                bases.add(c)
    return bases


def load_mi(mi_path):
    """Build the reference sets from the mutual-intelligibility repo.
    Returns (taught_set, untaught_set, glue_set, false_friends, pattern_of)."""
    taught, untaught, glue, false_friends = set(), set(), set(), set()
    pattern_of = {}   # base form -> human-readable pattern label

    if not os.path.isdir(mi_path):
        return None

    glue |= CLOSED_CLASS

    for fname in os.listdir(mi_path):
        if not fname.endswith(".md") or fname == "README.md":
            continue
        stem = fname[:-3]
        text = open(os.path.join(mi_path, fname), encoding="utf-8").read()

        if stem in WARNING_FILES:
            for m in re.finditer(r"^\*\*([^*]+?)\*\*", text, re.M):
                false_friends.add(clean(m.group(1)))
            continue

        for m in re.finditer(r"\*\*[^*]*?↔([^*]+?)\*\*", text):
            for base in catalog_bases(m.group(1)):
                for form in strip_set(base):
                    if stem == GLUE_FILE:
                        glue.add(form)
                    elif stem in TAUGHT_FILES:
                        taught.add(form)
                        pattern_of.setdefault(form, TAUGHT_FILES[stem])
                    else:
                        untaught.add(form)
                        pattern_of.setdefault(form, "untaught: " + stem)

    return taught, untaught, glue, false_friends, pattern_of


def load_passages(ids_filter):
    text = open(CONTENT_JS, encoding="utf-8").read()
    blob = re.search(r"const PASSAGES = \[(.*?)\n\];", text, re.S).group(1)
    out = []
    for m in re.finditer(r'id:\s*"([^"]+)".*?title:\s*"([^"]+)".*?de:\s*`(.*?)`', blob, re.S):
        pid, title, de = m.group(1), m.group(2), m.group(3)
        if not ids_filter or pid in ids_filter:
            out.append((pid, title, de))
    return out


def classify(de_text, ref):
    taught, untaught, glue, false_friends, pattern_of = ref
    buckets = {"taught": [], "glue": [], "name": [],
               "untaught": [], "false_friend": [], "uncovered": []}
    pattern_hits = {}

    for raw in de_text.split():
        c = clean(raw)
        if not c:
            continue
        forms = strip_set(c)
        if c in NAMES:
            buckets["name"].append(c)
        elif c in false_friends:
            buckets["false_friend"].append(c)
        elif forms & glue:
            buckets["glue"].append(c)
        elif forms & taught:
            buckets["taught"].append(c)
            label = next((pattern_of[f] for f in forms if f in pattern_of), "?")
            pattern_hits[label] = pattern_hits.get(label, 0) + 1
        elif forms & untaught:
            buckets["untaught"].append(c)
            label = next((pattern_of[f] for f in forms if f in pattern_of), "?")
            pattern_hits[label] = pattern_hits.get(label, 0) + 1
        else:
            buckets["uncovered"].append(c)
    return buckets, pattern_hits


def pct(n, d):
    return f"{(100.0 * n / d):.0f}%" if d else "—"


def report(pid, title, buckets, pattern_hits):
    total = sum(len(v) for v in buckets.values())
    glue, name = len(buckets["glue"]), len(buckets["name"])
    taught, untaught = len(buckets["taught"]), len(buckets["untaught"])
    ff, uncov = len(buckets["false_friend"]), len(buckets["uncovered"])
    content = total - glue - name                      # meaningful vocabulary
    readable = glue + name + taught + untaught          # everything decodable

    print(f"\n{'='*64}\n{title}  ({pid}) — {total} words\n{'='*64}")
    print(f"  Readable overall      {readable:>3}/{total}  {pct(readable, total)}"
          f"   (patterns + glue + names)")
    print(f"  Pattern coverage      {taught:>3}/{content}  {pct(taught, content)}"
          f"   (of {content} content words)")
    print(f"  ---")
    print(f"  taught patterns       {taught:>3}")
    print(f"  glue words            {glue:>3}")
    print(f"  proper names          {name:>3}")
    print(f"  untaught pattern      {untaught:>3}")
    print(f"  false friends         {ff:>3}")
    print(f"  UNCOVERED             {uncov:>3}")
    if pattern_hits:
        print("  pattern breakdown:")
        for label, n in sorted(pattern_hits.items(), key=lambda kv: -kv[1]):
            print(f"      {n:>3}  {label}")
    if buckets["untaught"]:
        print("  needs an UNTAUGHT pattern: " + ", ".join(sorted(set(buckets["untaught"]))))
    if buckets["false_friend"]:
        print("  FALSE FRIENDS present: " + ", ".join(sorted(set(buckets["false_friend"]))))
    if buckets["uncovered"]:
        print("  UNCOVERED words (need A1 vocab or context):")
        print("      " + ", ".join(sorted(set(buckets["uncovered"]))))
    return total, content, taught


# --- shared-vocabulary check ------------------------------------------------
# The four requirement sections are written to reinforce one another: the
# conversation plants words used in the speech, the speech plants words used in
# the letter, the letter plants words reused in the translation. This measures
# that overlap instead of asserting it.

SECTION_ORDER = ["Conversation", "Speech", "Letter", "Translation"]
CHAIN = [("Conversation", "Speech"), ("Speech", "Letter"), ("Letter", "Translation")]


def _blob(text, decl):
    """The body of a top-level `const NAME = {...}` or `[...]` declaration."""
    m = re.search(re.escape(decl) + r"(.*?)\n[}\]];", text, re.S)
    return m.group(1) if m else ""


def load_sections():
    """German text of each requirement section, pooled across its items."""
    text = open(CONTENT_JS, encoding="utf-8").read()
    quoted = lambda blob: re.findall(r'\bde:\s*"([^"]+)"', blob)   # convention/prompt strings
    fenced = lambda blob: re.findall(r"\bde:\s*`([^`]*)`", blob)   # passage/speech blocks
    return {
        "Conversation": " ".join(quoted(_blob(text, "const CONVERSATION = {"))),
        "Speech":       " ".join(fenced(_blob(text, "const SPEECHES = ["))),
        "Letter":       " ".join(quoted(_blob(text, "const LETTER = {"))
                                 + fenced(_blob(text, "const LETTER = {"))),
        "Translation":  " ".join(fenced(_blob(text, "const PASSAGES = ["))),
    }


def content_tokens(text, glue):
    """Content words of a section: (surface, comparable-forms), minus glue/names."""
    text = re.sub(r"\([^)]*\)", " ", text)   # drop parenthetical notes
    toks = []
    for raw in text.split():
        c = clean(raw)
        if len(c) < 3 or c in glue or c in NAMES:
            continue
        toks.append((c, strip_set(c)))
    return toks


def shared(a_tokens, b_tokens):
    b_forms = set().union(*(f for _, f in b_tokens)) if b_tokens else set()
    return sorted({surface for surface, forms in a_tokens if forms & b_forms})


def report_shared(ref):
    glue = ref[2]
    toks = {name: content_tokens(text, glue) for name, text in load_sections().items()}
    print(f"\n{'='*64}\nSHARED VOCABULARY BETWEEN SECTIONS\n{'='*64}")
    print("  content words only (glue words and names excluded)\n")
    for name in SECTION_ORDER:
        print(f"  {name:<13} {len({s for s, _ in toks[name]}):>3} distinct content words")
    print()
    for a, b in CHAIN:
        sh = shared(toks[a], toks[b])
        print(f"  {a} → {b}: {len(sh)} shared")
        if sh:
            print("      " + ", ".join(sh))
    print("\n  note: matching is lexical (suffix/umlaut-normalized). Strong-verb")
    print("  forms (singen/gesungen) and compounds may be under-counted.")


def main():
    ap = argparse.ArgumentParser(description="Measure passage decodability.")
    ap.add_argument("--mi", default=DEFAULT_MI, help="path to en-de-mutual-intelligibility repo")
    ap.add_argument("ids", nargs="*", help="passage ids to check (default: all)")
    args = ap.parse_args()

    ref = load_mi(args.mi)
    if ref is None:
        sys.exit(f"mutual-intelligibility repo not found at {args.mi}\n"
                 f"pass --mi PATH to point at it.")

    passages = load_passages(set(args.ids))
    if not passages:
        sys.exit("no matching passages found in content.js")

    print(f"reference catalog: {args.mi}")
    tot_total = tot_content = tot_taught = 0
    for pid, title, de in passages:
        buckets, hits = classify(de, ref)
        t, c, tg = report(pid, title, buckets, hits)
        tot_total += t
        tot_content += c
        tot_taught += tg

    print(f"\n{'='*64}\nALL PASSAGES\n{'='*64}")
    print(f"  Taught-pattern content coverage: {tot_taught}/{tot_content}  "
          f"{pct(tot_taught, tot_content)}")

    report_shared(ref)


if __name__ == "__main__":
    main()
