/*
 * Interpreter Strip — content data
 *
 * Everything the learner works with lives here as data, separated from the
 * app shell. The German is original, written for this guide at an A1 reading
 * level (the floor is someone who has finished an A1 class). It is built to be
 * read with the patterns in the Patterns tab: most words are reachable by a
 * taught pattern, a function word, or basic A1 vocabulary, with only a handful
 * needing context. Run tools/coverage.py to measure this against the
 * mutual-intelligibility catalog. Teach the pattern, then give text it unlocks.
 *
 * To add a source later: add to SOURCES, reference it by sourceId.
 *
 * Author: David M. Anderson. Built with AI assistance (Claude, Anthropic).
 */

const SOURCES = {
  "original": {
    title: "Written for this guide",
    author: "A1 level",
    note: "Original German, built to be read with the patterns in the Patterns tab.",
    level: "A1",
  },
};

/* The four official requirements, verbatim from Scouting America. */
const REQUIREMENTS = [
  { id: "conversation", label: "Conversation",
    text: "Carry on a five-minute conversation in this language." },
  { id: "speech", label: "Speech",
    text: "Translate a two-minute speech or address." },
  { id: "letter", label: "Letter",
    text: "Write a letter in the language (does not apply for sign language)." },
  { id: "translation", label: "Translation",
    text: "Translate 200 words from the written word." },
];

/* The Patterns course — the bridge between English and German. Seven high-yield,
   generative rules, drawn from the en-de-mutual-intelligibility project. Teach
   only what the passages use; assume A1 grammar is already done. */
const PATTERNS = {
  intro: "If you already know some German basics, you have what you need to begin — because English and German are cousins, and most of the work is already done for you. Learn these seven patterns and you can read far above your level, including the passages and the speeches in this guide. Do not memorize word lists. Learn the moves.",
  lessons: [
    {
      title: "1. Free words",
      rule: "Thousands of words are spelled the same in both languages.",
      why: "English borrowed heavily from German's relatives, and both share modern international words. When a word looks English, try the English meaning first. (German capitalizes every noun — that is a reading aid, not a different word.)",
      examples: [
        { de: "die Hand", en: "hand" }, { de: "der Arm", en: "arm" },
        { de: "der Name", en: "name" }, { de: "der Finger", en: "finger" },
        { de: "der Winter", en: "winter" }, { de: "warm", en: "warm" },
        { de: "modern", en: "modern" }, { de: "normal", en: "normal" },
        { de: "der Ball", en: "ball" }, { de: "der Bus", en: "bus" },
      ],
    },
    {
      title: "2. Verb cousins",
      rule: "The everyday verbs are visibly related; the German ending is usually -en.",
      why: "Strip the -en ending and the English verb is often right there. These are the verbs you meet in every sentence.",
      examples: [
        { de: "haben", en: "to have" }, { de: "kommen", en: "to come" },
        { de: "gehen", en: "to go" }, { de: "sehen", en: "to see" },
        { de: "sagen", en: "to say" }, { de: "hören", en: "to hear" },
        { de: "finden", en: "to find" }, { de: "bringen", en: "to bring" },
        { de: "singen", en: "to sing" }, { de: "lernen", en: "to learn" },
      ],
    },
    {
      title: "3. The th → d rule",
      rule: "Where English has 'th', German usually has 'd'.",
      why: "This is the single highest-yield sound shift. Once you see it, you can decode words you have never met: say the German with a 'th' instead of 'd' and listen for the English.",
      examples: [
        { de: "der / die / das", en: "the" }, { de: "das", en: "that" },
        { de: "dann", en: "then" }, { de: "danke", en: "thanks" },
        { de: "drei", en: "three" }, { de: "dick", en: "thick" },
        { de: "dünn", en: "thin" }, { de: "tausend", en: "thousand" },
        { de: "der Bruder", en: "brother" }, { de: "das Ding", en: "thing" },
      ],
    },
    {
      title: "4. The k → ch rule",
      rule: "Where English has 'k' or 'ck' (often after a vowel), German frequently has 'ch'.",
      why: "The same idea as th→d, with a different pair. Say the German 'ch' as a hard 'k' and the English usually appears: machen → 'maken' → make.",
      examples: [
        { de: "machen", en: "to make" }, { de: "das Buch", en: "book" },
        { de: "die Woche", en: "week" }, { de: "die Milch", en: "milk" },
        { de: "die Küche", en: "kitchen" }, { de: "kochen", en: "to cook" },
        { de: "sprechen", en: "to speak" }, { de: "suchen", en: "to seek" },
        { de: "brechen", en: "to break" }, { de: "reich", en: "rich" },
      ],
    },
    {
      title: "5. The little glue words",
      rule: "The small connecting words — pronouns, prepositions, and conjunctions — are cousins too.",
      why: "These are the glue that holds a sentence together. They are short, they repeat constantly, and once you recognize them the shape of every sentence opens up.",
      examples: [
        { de: "ich", en: "I" }, { de: "wir", en: "we" },
        { de: "und", en: "and" }, { de: "oder", en: "or" },
        { de: "aber", en: "but" }, { de: "mit", en: "with" },
        { de: "für", en: "for" }, { de: "hier", en: "here" },
        { de: "oft", en: "often" }, { de: "was", en: "what" },
        { de: "wer", en: "who" }, { de: "wie", en: "how" },
      ],
    },
    {
      title: "6. Sound-alikes",
      rule: "Some words are spelled differently but sound almost the same out loud.",
      why: "Reading silently hides them. Say the German word aloud and the English jumps out. This is why reading German is easier when you whisper it.",
      examples: [
        { de: "das Haus", en: "house" }, { de: "die Maus", en: "mouse" },
        { de: "der Tee", en: "tea" }, { de: "das Eis", en: "ice" },
        { de: "das Auge", en: "eye" }, { de: "das Boot", en: "boat" },
        { de: "fein", en: "fine" }, { de: "braun", en: "brown" },
      ],
    },
    {
      title: "7. Sound tricks for speaking",
      rule: "A few German letters are said differently than in English.",
      why: "You need these for the spoken speech requirement. They turn a word you can read into a word you can hear. The big three: V sounds like F, W sounds like V, Z sounds like TS.",
      examples: [
        { de: "Vater  (V = F)", en: "sounds like FAH-ter → father" },
        { de: "viel  (V = F)", en: "feel → 'a lot'" },
        { de: "Wasser  (W = V)", en: "VAH-ser → water" },
        { de: "Wein  (W = V, ei = eye)", en: "vine → wine" },
        { de: "Zeit  (Z = TS)", en: "tsite → time" },
        { de: "zehn  (Z = TS)", en: "tsayn → ten" },
        { de: "lesen  (S = Z)", en: "LAY-zen → to read" },
        { de: "mein  (ei = eye)", en: "mine → my" },
      ],
    },
  ],
  falseFriends: [
    { de: "also", looksLike: "also", means: "therefore, so (English 'also' is 'auch')" },
    { de: "bald", looksLike: "bald", means: "soon (English 'bald' is 'kahl')" },
    { de: "bekommen", looksLike: "become", means: "to receive, to get (English 'become' is 'werden')" },
    { de: "der Brief", looksLike: "brief", means: "a letter (English 'brief' is 'kurz')" },
    { de: "der Chef", looksLike: "chef", means: "the boss (English 'chef' is 'Koch')" },
    { de: "das Gift", looksLike: "gift", means: "poison (English 'gift' is 'Geschenk')" },
    { de: "der Rat", looksLike: "rat", means: "advice (the animal is 'Ratte')" },
    { de: "das Handy", looksLike: "handy", means: "cell phone (not the adjective)" },
  ],
};

/* Requirement 1 — five-minute conversation. Prompt cards by topic. */
const CONVERSATION = {
  intro: "A counselor leads a five-minute back-and-forth. You cannot script a conversation, but you can walk in ready. Each card is a topic with questions you are likely to hear and the words you need to answer. Notice how many of the words are cognates from the Patterns tab. Practice answering out loud, then have someone ask you cold.",
  topics: [
    {
      title: "Greetings & introducing yourself",
      titleDe: "Begrüßung und Vorstellung",
      prompts: [
        { de: "Wie heißt du?", en: "What is your name?" },
        { de: "Woher kommst du?", en: "Where are you from?" },
        { de: "Wie alt bist du?", en: "How old are you?" },
        { de: "Wie geht es dir?", en: "How are you?" },
      ],
      vocab: [
        { de: "heißen", en: "to be called" },
        { de: "kommen aus", en: "to come from" },
        { de: "wohnen in", en: "to live in" },
        { de: "der Freund / die Freundin", en: "friend" },
      ],
    },
    {
      title: "Family & home",
      titleDe: "Familie und Zuhause",
      prompts: [
        { de: "Hast du Geschwister?", en: "Do you have siblings?" },
        { de: "Hast du einen Bruder oder eine Schwester?", en: "Do you have a brother or a sister?" },
        { de: "Wo wohnst du?", en: "Where do you live?" },
        { de: "Hast du ein Haustier?", en: "Do you have a pet?" },
      ],
      vocab: [
        { de: "der Bruder", en: "brother (th→d!)" },
        { de: "die Schwester", en: "sister" },
        { de: "das Haus", en: "house" },
        { de: "die Katze / der Hund", en: "cat / dog" },
      ],
    },
    {
      title: "School & daily life",
      titleDe: "Schule und Alltag",
      prompts: [
        { de: "Was ist dein Lieblingsfach?", en: "What is your favorite subject?" },
        { de: "Wie viele Stunden hast du?", en: "How many class hours do you have?" },
        { de: "Was machst du am Morgen?", en: "What do you do in the morning?" },
        { de: "Lernst du gern?", en: "Do you like learning?" },
      ],
      vocab: [
        { de: "die Schule", en: "school" },
        { de: "lernen", en: "to learn" },
        { de: "das Buch", en: "book" },
        { de: "der Morgen", en: "morning" },
      ],
    },
    {
      title: "Hobbies & free time",
      titleDe: "Hobbys und Freizeit",
      prompts: [
        { de: "Welche Hobbys hast du?", en: "What hobbies do you have?" },
        { de: "Spielst du ein Instrument?", en: "Do you play an instrument?" },
        { de: "Singst du gern?", en: "Do you like to sing?" },
        { de: "Was machst du am Wochenende?", en: "What do you do on the weekend?" },
      ],
      vocab: [
        { de: "spielen", en: "to play" },
        { de: "singen", en: "to sing" },
        { de: "die Gitarre", en: "guitar" },
        { de: "der Ball", en: "ball" },
      ],
    },
    {
      title: "Food & eating",
      titleDe: "Essen und Trinken",
      prompts: [
        { de: "Was isst du gern?", en: "What do you like to eat?" },
        { de: "Was ist dein Lieblingsessen?", en: "What is your favorite food?" },
        { de: "Kannst du kochen?", en: "Can you cook?" },
        { de: "Was trinkst du gern?", en: "What do you like to drink?" },
      ],
      vocab: [
        { de: "essen / trinken", en: "to eat / to drink" },
        { de: "das Brot", en: "bread" },
        { de: "kochen", en: "to cook (k→ch)" },
        { de: "der Apfel", en: "apple" },
      ],
    },
    {
      title: "Scouting",
      titleDe: "Pfadfinder",
      prompts: [
        { de: "Was machst du bei den Pfadfindern?", en: "What do you do in Scouting?" },
        { de: "Gehst du gern zelten?", en: "Do you like to camp?" },
        { de: "Hast du Freunde in deiner Gruppe?", en: "Do you have friends in your group?" },
        { de: "Magst du das Lagerfeuer?", en: "Do you like the campfire?" },
      ],
      vocab: [
        { de: "der Pfadfinder", en: "Scout" },
        { de: "zelten", en: "to camp (in a tent)" },
        { de: "das Feuer", en: "fire" },
        { de: "der Wald", en: "forest, woods" },
      ],
    },
  ],
};

/* Requirement 2 — translate a two-minute speech or address.
   Calibrated to the A1 floor, like everything else here. To offer higher
   levels later, add A2/B1 entries and matching A2/B1 passages together. */
const SPEECHES = [
  {
    id: "welcome",
    title: "A welcome address",
    sourceId: "original",
    minutes: 2,
    de: `Hallo und herzlich willkommen!

Ich bin sehr froh, dass ihr heute hier seid. Manche von euch kommen von weit weg, aus anderen Städten und aus anderen Ländern. Manche von euch wohnen hier in der Stadt. Das ist nicht wichtig. Heute Abend sind wir alle Freunde.

Hier hört man viele Sprachen. Ich höre Deutsch. Ich höre Englisch. Ich höre Französisch und noch mehr. Das ist kein Problem. Das ist gut! Jede Sprache ist ein Geschenk. Jede Sprache ist eine neue Tür. Wer eine neue Sprache lernt, findet auch neue Freunde.

Wir sind jetzt zusammen. Wir essen zusammen. Wir singen zusammen. Wir spielen und lernen zusammen. Vielleicht macht ihr Fehler, wenn ihr Deutsch sprecht. Das ist ganz normal. Habt keine Angst! Jeder Fehler ist ein kleiner Schritt nach vorn.

Ich wünsche euch eine schöne Zeit. Ich wünsche euch viele neue Freunde. Sprecht miteinander! Hört einander zu! Und habt Mut: Fangt einfach an!

Eine Sprache lernt man mit dem Kopf. Aber am besten lernt man sie mit dem Herzen.

Vielen Dank, und noch einmal: herzlich willkommen!`,
    en: `Hello and a warm welcome!

I am very glad that you are here today. Some of you come from far away, from other cities and other countries. Some of you live here in the city. That is not important. Tonight we are all friends.

Here you hear many languages. I hear German. I hear English. I hear French and more. That is not a problem. That is good! Every language is a gift. Every language is a new door. Whoever learns a new language also finds new friends.

We are together now. We eat together. We sing together. We play and learn together. Maybe you will make mistakes when you speak German. That is completely normal. Do not be afraid! Every mistake is a small step forward.

I wish you a wonderful time. I wish you many new friends. Talk to one another! Listen to one another! And have courage: just begin!

You learn a language with your head. But you learn it best with your heart.

Thank you, and once again: a warm welcome!`,
  },
  {
    id: "farewell",
    title: "A farewell address",
    sourceId: "original",
    minutes: 2,
    de: `Liebe Freunde,

unsere Woche zusammen ist fast zu Ende. Das ist ein bisschen traurig, aber ich bin auch sehr glücklich.

Was haben wir alles gemacht? Wir haben zusammen gesungen. Wir haben am Feuer gesessen. Wir haben gespielt, gelacht und viel gelernt. Wir haben neue Wörter gelernt und neue Freunde gefunden.

Am Anfang hatten manche von euch Angst zu sprechen. Das war ganz normal. Aber jetzt sprecht ihr mit Mut! Ihr habt es gemacht. Ich bin sehr stolz auf euch.

Bald fahrt ihr wieder nach Hause. Die Reise ist lang. Zu Hause warten eure Familien. Bitte erzählt ihnen von dieser Woche. Macht viele Fotos und vergesst uns nicht.

Eine Freundschaft endet nicht an der Tür. Wir sind jetzt Freunde — in vielen Ländern und in vielen Sprachen. Vielleicht sehen wir uns bald wieder.

Vielen Dank für diese schöne Zeit. Danke für eure Lieder, euer Lachen und euer Herz.

Gute Reise, liebe Freunde. Auf Wiedersehen!`,
    en: `Dear friends,

our week together is almost over. That is a little sad, but I am also very happy.

What did we all do? We sang together. We sat by the fire. We played, laughed, and learned a lot. We learned new words and found new friends.

At the beginning, some of you were afraid to speak. That was completely normal. But now you speak with courage! You did it. I am very proud of you.

Soon you will travel back home. The journey is long. At home your families are waiting. Please tell them about this week. Take many photos and do not forget us.

A friendship does not end at the door. We are friends now — in many countries and in many languages. Maybe we will see each other again soon.

Thank you very much for this lovely time. Thank you for your songs, your laughter, and your heart.

Safe travels, dear friends. Goodbye!`,
  },
];

/* Requirement 3 — write a letter. Conventions, prompts, and an A1 model. */
const LETTER = {
  intro: "This requirement asks you to write, not translate. Pick a prompt, use the conventions, and write 8–12 simple sentences in German. Short sentences are fine. The model letter shows the shape; do not copy it.",
  conventions: [
    { label: "Date line", de: "Köln, den 5. April 2026",
      note: "Place and date at the top. Note 'den' and the period after the day number." },
    { label: "Informal opening", de: "Liebe Anna, / Lieber Max,",
      note: "For friends and family. 'Liebe' for a girl, 'Lieber' for a boy. The next word is lowercase." },
    { label: "Formal opening", de: "Sehr geehrte Frau Becker,",
      note: "For an adult you address as 'Sie'. Use 'Sehr geehrte Damen und Herren,' if you do not know the name." },
    { label: "Informal closing", de: "Viele Grüße / Dein Max / Deine Anna",
      note: "Friendly sign-off; your name on the next line." },
    { label: "Formal closing", de: "Mit freundlichen Grüßen",
      note: "The standard polite sign-off." },
  ],
  prompts: [
    "Write a thank-you letter to a host family after a week with them.",
    "Write to a German pen pal: introduce yourself and your family.",
    "Write to a friend about a day at Scout camp.",
    "Write to invite a German friend to visit you in the United States.",
  ],
  model: {
    de: `Köln, den 5. April 2026

Liebe Familie Becker,

vielen Dank für die schöne Woche! Es war wunderbar bei euch. Mein Zimmer war warm und das Essen war sehr gut.

Wir haben viel gemacht. Wir waren am Rhein. Das Wetter war schön und der Fluss war groß. Ich habe viele Fotos gemacht.

Mein Deutsch ist jetzt besser. Am Anfang hatte ich Angst. Aber ihr wart sehr nett und geduldig. Jetzt habe ich Mut und spreche viel mehr.

Ich komme bald wieder. Und ihr seid herzlich willkommen in Amerika!

Nochmals vielen Dank für alles.

Viele Grüße
Emma`,
    en: `Köln, the 5th of April 2026

Dear Becker family,

thank you for the lovely week! It was wonderful with you. My room was warm and the food was very good.

We did a lot. We were at the Rhine. The weather was nice and the river was big. I took many photos.

My German is better now. At first I was afraid. But you were very kind and patient. Now I have courage and speak much more.

I will come again soon. And you are warmly welcome in America!

Thank you again for everything.

Best wishes,
Emma`,
  },
};

/* Requirement 4 — translate 200 words from the written word.
   Original A1 passages engineered to be decodable with the seven patterns.
   `leans` names the patterns each passage exercises. */
const PASSAGES = [
  {
    id: "camp",
    title: "A day at camp",
    sourceId: "original",
    words: 201,
    leans: "Free words, verb cousins, the little glue words, sound-alikes",
    de: `Hallo! Ich heiße Max. Ich bin elf Jahre alt. Ich bin ein Pfadfinder.

Heute bin ich im Camp. Das Wetter ist warm und die Sonne scheint. Mein Freund Tim ist auch hier. Wir haben ein Zelt. Das Zelt ist grün.

Am Morgen trinke ich Wasser und esse Brot. Dann gehen wir in den Wald. Wir sehen Bäume, Vögel und einen Fluss. Das Wasser ist kalt und klar. Tim findet einen Stein und ich finde eine Feder.

Am Nachmittag schwimmen wir im See. Das Wasser ist kühl. Wir spielen Ball und wir lachen viel. Später kommen wir zurück zum Camp.

Am Camp lernen wir auch viel. Wir lernen Knoten und wir kochen Suppe. Die Suppe ist heiß und schmeckt gut. Mein Freund Tim und ich helfen gern. Wir haben viel Spaß zusammen.

Am Abend machen wir ein Feuer. Das Feuer ist warm und hell. Wir singen Lieder und wir essen zusammen. Ein Mann spielt Gitarre. Alle Kinder hören zu und singen mit.

Der Himmel ist jetzt dunkel. Ich sehe den Mond und viele Sterne. Mein Freund Tim sagt: „Gute Nacht, Max.“ Ich sage: „Gute Nacht, Tim.“

Ich bin müde, aber ich bin glücklich. Das Camp ist wunderbar. Morgen ist ein neuer Tag.`,
    en: `Hello! My name is Max. I am eleven years old. I am a Scout.

Today I am at camp. The weather is warm and the sun is shining. My friend Tim is here too. We have a tent. The tent is green.

In the morning I drink water and eat bread. Then we go into the woods. We see trees, birds, and a river. The water is cold and clear. Tim finds a stone and I find a feather.

In the afternoon we swim in the lake. The water is cool. We play ball and we laugh a lot. Later we come back to camp.

At camp we also learn a lot. We learn knots and we cook soup. The soup is hot and tastes good. My friend Tim and I like to help. We have a lot of fun together.

In the evening we make a fire. The fire is warm and bright. We sing songs and we eat together. A man plays guitar. All the children listen and sing along.

The sky is dark now. I see the moon and many stars. My friend Tim says, "Good night, Max." I say, "Good night, Tim."

I am tired, but I am happy. The camp is wonderful. Tomorrow is a new day.`,
  },
  {
    id: "anna",
    title: "A letter from Anna",
    sourceId: "original",
    words: 202,
    leans: "Free words, the th→d rule (Bruder), the little glue words, sound-alikes (Haus, Maus)",
    de: `Liebe Freunde,

mein Name ist Anna. Ich komme aus Deutschland. Ich wohne in einer kleinen Stadt am Rhein.

Ich habe eine Familie. Mein Vater heißt Peter. Meine Mutter heißt Maria. Ich habe einen Bruder und eine Schwester. Mein Bruder ist jung. Meine Schwester ist älter — sie ist zwanzig.

Wir haben ein Haus. Das Haus ist alt, aber warm. Wir haben auch eine Katze und einen Hund. Die Katze ist weiß und der Hund ist braun. Im Haus wohnt auch eine kleine Maus, aber das ist ein Geheimnis!

Im Sommer ist das Wetter warm. Wir gehen oft in den Garten. Mein Vater hat einen Apfelbaum. Wir essen die Äpfel im September.

Im Winter ist es kalt. Manchmal kommt Schnee. Wir machen ein Feuer und trinken Tee. Ich lese ein Buch und meine Mutter singt. Das ist sehr schön und gemütlich.

Ich gehe in die Schule. Mein Lieblingsfach ist Englisch. Ich lerne auch Musik. Ich spiele Gitarre und singe gern.

Am Wochenende spiele ich mit meinen Freunden. Wir gehen in den Park und spielen Fußball. Manchmal fahren wir mit dem Rad. Das ist mein Lieblingstag!

Was machst du gern? Hast du eine Familie? Wo wohnst du? Bitte schreibe mir bald.

Deine Freundin
Anna`,
    en: `Dear friends,

my name is Anna. I come from Germany. I live in a small town on the Rhine.

I have a family. My father is called Peter. My mother is called Maria. I have a brother and a sister. My brother is young. My sister is older — she is twenty.

We have a house. The house is old, but warm. We also have a cat and a dog. The cat is white and the dog is brown. A little mouse also lives in the house, but that is a secret!

In summer the weather is warm. We often go into the garden. My father has an apple tree. We eat the apples in September.

In winter it is cold. Sometimes snow comes. We make a fire and drink tea. I read a book and my mother sings. That is very nice and cozy.

I go to school. My favorite subject is English. I also learn music. I play guitar and like to sing.

On the weekend I play with my friends. We go to the park and play soccer. Sometimes we ride bikes. That is my favorite day!

What do you like to do? Do you have a family? Where do you live? Please write to me soon.

Your friend,
Anna`,
  },
];

const CONTENT = { SOURCES, REQUIREMENTS, PATTERNS, CONVERSATION, SPEECHES, LETTER, PASSAGES };
