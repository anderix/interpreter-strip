/*
 * Interpreter Strip — app shell
 *
 * Renders the practice views from CONTENT and handles the two things that
 * need script: switching tabs and the countdown timers. Every reveal uses
 * a native <details> element, styled by Axe, so self-check needs no code.
 *
 * Author: David M. Anderson. Built with AI assistance (Claude, Anthropic).
 */
(function () {
  "use strict";

  const { SOURCES, REQUIREMENTS, PATTERNS, CONVERSATION, SPEECHES, LETTER, PASSAGES } = CONTENT;

  /* --- small helpers --------------------------------------------------- */

  // Render a text block with blank-line-separated paragraphs.
  function paragraphs(text, className) {
    const cls = className ? ` class="${className}"` : "";
    return text.split(/\n\s*\n/).map((p) => `<p${cls}>${p.replace(/\n/g, "<br>")}</p>`).join("");
  }

  function reveal(summary, body) {
    return `<details class="reveal"><summary>${summary}</summary><div class="reveal-body">${body}</div></details>`;
  }

  function sourceLine(sourceId, extra) {
    const s = SOURCES[sourceId];
    if (!s) return "";
    const bits = [`<em>${s.title}</em>`, s.author];
    if (extra) bits.push(extra);
    return `<p class="source-line">Source: ${bits.join(" · ")}</p>`;
  }

  function timer(seconds, label) {
    return `<div class="timer" data-seconds="${seconds}">
      <span class="timer-label">${label}</span>
      <span class="timer-clock">--:--</span>
      <button type="button" class="timer-start">Start</button>
      <button type="button" class="timer-reset">Reset</button>
    </div>`;
  }

  /* --- views ----------------------------------------------------------- */

  function renderOverview() {
    const reqs = REQUIREMENTS.map(
      (r) => `<tr><td><strong>${r.label}</strong></td><td>${r.text}</td></tr>`
    ).join("");
    return `
      <header><h1>Interpreter Strip — German</h1></header>
      <p>Youth and adults may wear the Interpreter strip by showing their knowledge of a
      language. This guide is practice scaffolding for the German requirements: prompts,
      drills, and reference answers you reveal only after your own attempt.</p>
      <table>
        <thead><tr><th>Requirement</th><th>What you must do</th></tr></thead>
        <tbody>${reqs}</tbody>
      </table>
      <section>
        <h2>How this works</h2>
        <p>Three of the four requirements need a live witness: your counselor hears the
        conversation, hears you translate the address, and reads your letter. This guide
        cannot sign you off and does not try to. What it does is get you ready — and let
        you check yourself honestly before you sit down with a counselor.</p>
        <p>Start with <a href="#patterns" data-view="patterns">Patterns</a> — seven rules that
        let you read German well above a beginner's level — then explore the sections in whatever
        order suits you.</p>
      </section>`;
  }

  function renderConversation() {
    const cards = CONVERSATION.topics
      .map((t) => {
        const prompts = t.prompts
          .map((p) => `<li><span class="de">${p.de}</span><span class="gloss">${p.en}</span></li>`)
          .join("");
        const vocab = t.vocab
          .map((v) => `<li><span class="de">${v.de}</span><span class="gloss">${v.en}</span></li>`)
          .join("");
        return `<article>
          <h3>${t.title}</h3>
          <p class="topic-de">${t.titleDe}</p>
          <h4>You might be asked</h4>
          <ul class="prompt-list">${prompts}</ul>
          <h4>Words you'll want</h4>
          <ul class="vocab-list">${vocab}</ul>
        </article>`;
      })
      .join("");
    return `
      <header><h1>Conversation</h1></header>
      <p class="req-text">Carry on a five-minute conversation in this language.</p>
      <p>${CONVERSATION.intro}</p>
      ${timer(300, "Five-minute practice")}
      <div class="grid">${cards}</div>`;
  }

  function renderSpeech() {
    const blocks = SPEECHES.map((sp) => {
      return `<section>
        <h2>${sp.title}</h2>
        ${sourceLine(sp.sourceId, `about ${sp.minutes} minutes`)}
        <p class="instructions">Have your counselor read this aloud, or read it yourself, then
        translate it into English. Reveal the reference only after your own attempt.</p>
        <div class="passage">${paragraphs(sp.de)}</div>
        ${reveal("Show reference translation", paragraphs(sp.en))}
      </section>`;
    }).join("");
    return `
      <header><h1>Speech</h1></header>
      <p class="req-text">Translate a two-minute speech or address.</p>
      ${timer(120, "Two-minute address")}
      ${blocks}`;
  }

  function renderLetter() {
    const conv = LETTER.conventions
      .map((c) => `<tr><td><strong>${c.label}</strong></td><td class="de">${c.de}</td><td class="gloss">${c.note}</td></tr>`)
      .join("");
    const prompts = LETTER.prompts.map((p) => `<li>${p}</li>`).join("");
    return `
      <header><h1>Letter</h1></header>
      <p class="req-text">Write a letter in the language (does not apply for sign language).</p>
      <p>${LETTER.intro}</p>
      <section>
        <h2>Conventions</h2>
        <table>
          <thead><tr><th>Part</th><th>German</th><th>Note</th></tr></thead>
          <tbody>${conv}</tbody>
        </table>
      </section>
      <section>
        <h2>Choose a prompt</h2>
        <ul class="prompt-choices">${prompts}</ul>
      </section>
      <section>
        <h2>Model letter</h2>
        <p class="instructions">Write your own first. Use this only to check shape and tone.</p>
        ${reveal("Show model letter (German)", `<div class="passage">${paragraphs(LETTER.model.de)}</div>`)}
        ${reveal("Show English of the model", `<div class="passage">${paragraphs(LETTER.model.en)}</div>`)}
      </section>`;
  }

  function renderTranslation() {
    const blocks = PASSAGES.map((p) => {
      const leans = p.leans ? `<p class="leans"><strong>Leans on:</strong> ${p.leans}</p>` : "";
      return `<section>
        <h2>${p.title}</h2>
        ${sourceLine(p.sourceId, `${p.words} words`)}
        ${leans}
        <p class="instructions">Translate this passage into English on paper, then reveal the
        reference to check yourself.</p>
        <div class="passage">${paragraphs(p.de)}</div>
        ${reveal("Show reference translation", paragraphs(p.en))}
      </section>`;
    }).join("");
    return `
      <header><h1>Translation</h1></header>
      <p class="req-text">Translate 200 words from the written word.</p>
      ${blocks}`;
  }

  function renderPatterns() {
    const lessons = PATTERNS.lessons
      .map((l) => {
        const examples = l.examples
          .map((e) => `<li><span class="de">${e.de}</span><span class="gloss">${e.en}</span></li>`)
          .join("");
        return `<section class="lesson">
          <h2>${l.title}</h2>
          <p class="pattern-rule">${l.rule}</p>
          <p class="pattern-why">${l.why}</p>
          <ul class="cognate-list">${examples}</ul>
        </section>`;
      })
      .join("");
    const ff = PATTERNS.falseFriends
      .map((f) => `<tr><td class="de">${f.de}</td><td>${f.looksLike}</td><td>${f.means}</td></tr>`)
      .join("");
    return `
      <header><h1>Patterns</h1></header>
      <p>${PATTERNS.intro}</p>
      ${lessons}
      <section class="lesson">
        <h2>One warning: false friends</h2>
        <p>A few words look like English but mean something else. These are where a confident
        guess goes wrong — learn them as exceptions to the rules above.</p>
        <table>
          <thead><tr><th>German</th><th>Looks like</th><th>Actually means</th></tr></thead>
          <tbody>${ff}</tbody>
        </table>
      </section>`;
  }

  const VIEWS = {
    overview: renderOverview,
    conversation: renderConversation,
    speech: renderSpeech,
    letter: renderLetter,
    translation: renderTranslation,
    patterns: renderPatterns,
  };

  /* --- timers ---------------------------------------------------------- */

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function wireTimers(root) {
    root.querySelectorAll(".timer").forEach((t) => {
      const total = parseInt(t.dataset.seconds, 10);
      const clock = t.querySelector(".timer-clock");
      const startBtn = t.querySelector(".timer-start");
      const resetBtn = t.querySelector(".timer-reset");
      let remaining = total;
      let handle = null;

      const paint = () => {
        clock.textContent = fmt(remaining);
        t.classList.toggle("done", remaining === 0);
      };
      const stop = () => {
        clearInterval(handle);
        handle = null;
        startBtn.textContent = "Start";
      };
      const reset = () => {
        stop();
        remaining = total;
        paint();
      };

      startBtn.addEventListener("click", () => {
        if (handle) {
          stop();
          return;
        }
        if (remaining === 0) remaining = total;
        startBtn.textContent = "Pause";
        handle = setInterval(() => {
          remaining -= 1;
          paint();
          if (remaining <= 0) stop();
        }, 1000);
      });
      resetBtn.addEventListener("click", reset);
      reset();
    });
  }

  /* --- tab routing ----------------------------------------------------- */

  function show(view) {
    if (!VIEWS[view]) view = "overview";
    document.querySelectorAll(".view").forEach((el) => (el.hidden = true));
    const target = document.getElementById("view-" + view);
    target.innerHTML = VIEWS[view]();
    target.hidden = false;
    wireTimers(target);
    document.querySelectorAll("#tabs a").forEach((a) => {
      a.classList.toggle("active", a.dataset.view === view);
    });
    window.scrollTo(0, 0);
  }

  function viewFromHash() {
    return (location.hash || "#overview").slice(1);
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-view]");
    if (!link) return;
    e.preventDefault();
    location.hash = link.dataset.view;
  });

  window.addEventListener("hashchange", () => show(viewFromHash()));
  show(viewFromHash());
})();
