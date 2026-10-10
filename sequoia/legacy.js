/* =====================================================================
   SEQUOIA LEGACY . the Legacy Book prompts
   Read by Sequoia (/sequoia/), the Legacy Book tab. Edit prompts here,
   not in index.html.

   The order follows structured life review (Haight's order: early years,
   family and home, adult life, then a summing up), with lighter chapters
   first and the hard chapters after them. Prompts are written fresh for
   Grounded, shaped by the themes of life review, Dignity Therapy, and the
   ethical will. None of their wording is copied.

   Firm rules:
   - Every prompt can be skipped. No streaks or nudges for the Legacy Book.
   - Hard chapters are optIn: closed until the person chooses to open them,
     with a gentle note. Each of their prompts has care: 1, so the app shows
     careLine under it.
   - Nothing assumes marriage, children, faith, or a family shape.
   - A family member can write for the person ("told to" entries).
   - Nothing is prefilled, invented, or rewritten for the person.
   - Everything stays on the device, encrypted in the profile, until the
     person chooses to print or share a page.

   Each chapter: { id, title, lead, optIn, note, prompts: [{ id, t, help }] }.

   Sources used (ids from the build's sources.json, for gg-sources.js):
     butler, pinquart, bohlmeijer, westerhof, woodsrt, chochinov11, allen,
     ethicalwill, erikson, davison
   ===================================================================== */
(function(){
const VERSION = 1;

const CARE_LINE = 'If this brings up more than you want to carry alone, stop here and call someone you trust, or call or text 988.';

const CHAPTERS = [
  { id: 'early', title: 'Early Years', optIn: false,
    lead: 'Start wherever your memory takes you. A small detail is enough.',
    prompts: [
      { id: 'early-1', t: 'A place from when you were young that you can still see when you close your eyes.', help: 'A kitchen, a yard, a street, a room. What did it look like, sound like, smell like?' },
      { id: 'early-2', t: 'Who made you feel safe when you were small?', help: 'It can be anyone: a parent, a grandparent, a neighbor, a teacher, an older friend.' },
      { id: 'early-3', t: 'A smell, a song, or a food that takes you right back.', help: 'Tell where it takes you and who is there.' },
      { id: 'early-4', t: 'What did you love to do as a child?', help: 'Games, hiding places, books, chores you secretly liked.' },
      { id: 'early-5', t: 'A time you got into trouble, or almost did.', help: 'Funny stories count. So do stories that taught you something.' },
      { id: 'early-6', t: 'What was the world like when you were growing up?', help: 'Prices, news, music, how people traveled, what was new.' },
      { id: 'early-7', t: 'Something you wanted to be when you grew up.', help: 'Did any of it come true, in a way you didn\'t expect?' }
    ] },
  { id: 'family', title: 'Family and Home', optIn: false,
    lead: 'Family can mean the people you were born to, the people who raised you, or the people you chose.',
    prompts: [
      { id: 'family-1', t: 'Someone who shaped who you became, and how.', help: 'Family by blood or by choice. What did they do or say that stayed with you?' },
      { id: 'family-2', t: 'A family saying, habit, or tradition worth keeping.', help: 'A holiday, a phrase, a way of doing things.' },
      { id: 'family-3', t: 'The homes you have lived in.', help: 'Pick one or tell them all. What made a place feel like home?' },
      { id: 'family-4', t: 'Where your people came from, as far as you know.', help: 'Places, languages, journeys, names. "I\'m not sure" is a fine answer.' },
      { id: 'family-5', t: 'A gathering you remember well.', help: 'A meal, a celebration, a reunion, a hard day everyone came together.' },
      { id: 'family-6', t: 'Something about your family that would surprise people.', help: 'A talent, a secret recipe, a story that gets retold.' },
      { id: 'family-7', t: 'A pet or animal you loved.', help: 'Their name, their habits, a story about them.' }
    ] },
  { id: 'work', title: 'School, Work, and Service', optIn: false,
    lead: 'Paid work, unpaid work, raising others, serving, making, and fixing all belong here.',
    prompts: [
      { id: 'work-1', t: 'A teacher or mentor who made a difference.', help: 'What did they see in you?' },
      { id: 'work-2', t: 'Your first job, or the first work you were proud of.', help: 'What did you earn, learn, or spend it on?' },
      { id: 'work-3', t: 'Work or service you are proud of.', help: 'In a job, at home, in a congregation, in the community, or in the military.' },
      { id: 'work-4', t: 'Something you made, built, grew, or fixed.', help: 'A garden, a house, a quilt, a business, an engine, a meal for a crowd.' },
      { id: 'work-5', t: 'A coworker, crew, or team you remember.', help: 'What made them good to work beside?' },
      { id: 'work-6', t: 'A turning point, when your path changed.', help: 'A move, a new job, a door that closed, a chance you took.' },
      { id: 'work-7', t: 'If you served in the military, a friend or a good moment from that time.', help: 'Only what you want to share. Harder memories have their own chapter, if you ever want it.' },
      { id: 'work-8', t: 'What retirement, or a slower season, has been like.', help: 'What you miss, what you don\'t, and what has surprised you.' }
    ] },
  { id: 'love', title: 'Love and Friendship', optIn: false,
    lead: 'Love takes many shapes: friends, partners, family, neighbors, and the people who became family.',
    prompts: [
      { id: 'love-1', t: 'How you met someone who mattered to you.', help: 'A friend, a love, a neighbor, a mentor. Where were you?' },
      { id: 'love-2', t: 'A friend you would thank today.', help: 'What would you thank them for?' },
      { id: 'love-3', t: 'A time someone showed you real kindness.', help: 'Big or small. How did it change your day, or your life?' },
      { id: 'love-4', t: 'What you have learned about love.', help: 'About giving it, receiving it, or keeping it going.' },
      { id: 'love-5', t: 'A friendship that has lasted a long time.', help: 'What has kept it going?' },
      { id: 'love-6', t: 'Someone you loved to laugh with.', help: 'A story that still makes you smile.' },
      { id: 'love-7', t: 'A person who made you feel at home in the world.', help: 'It can be anyone, at any time in your life.' }
    ] },
  { id: 'things', title: 'Recipes, Places, and Things', optIn: false,
    lead: 'Lighter memories that carry a lot. Write as much or as little as you like.',
    prompts: [
      { id: 'things-1', t: 'A recipe you want kept.', help: 'Write it the way you make it, "a handful" and all. Who taught you, and when do you make it?' },
      { id: 'things-2', t: 'A place you love to go, or wish you could go back to.', help: 'A lake, a church, a diner, a city, a porch, a stretch of road.' },
      { id: 'things-3', t: 'An object that matters to you, and its story.', help: 'A ring, a tool, a chair, a photo, a book. Who should know its story?' },
      { id: 'things-4', t: 'Songs that belong to your life.', help: 'A song for a season, a dance, a drive, a celebration.' },
      { id: 'things-5', t: 'A trip or adventure you remember.', help: 'Near or far. What happened that you still tell about?' },
      { id: 'things-6', t: 'Your favorite season, and what you do in it.', help: 'The first snow, the garden in June, the smell of fall.' },
      { id: 'things-7', t: 'A book, a show, or a game you have loved.', help: 'What drew you to it?' },
      { id: 'things-8', t: 'Something you collect, keep, or make by hand.', help: 'How it started, and what you would like to happen to it.' }
    ] },
  { id: 'proud', title: 'Proud Moments', optIn: false,
    lead: 'Proud moments can be quiet. Getting through a hard day counts.',
    prompts: [
      { id: 'proud-1', t: 'A moment you felt proud of yourself.', help: 'Big or small. What did you do?' },
      { id: 'proud-2', t: 'A hard thing you did anyway.', help: 'What gave you the courage?' },
      { id: 'proud-3', t: 'Someone you helped, and how.', help: 'They may never have known. You can tell it here.' },
      { id: 'proud-4', t: 'A skill you worked hard to learn.', help: 'How long it took, and who helped.' },
      { id: 'proud-5', t: 'A time you stood up for something or someone.', help: 'What happened, and how did it feel?' },
      { id: 'proud-6', t: 'Something about the way you have lived that you would want noticed.', help: 'Your honesty, your humor, your patience, your work, your faithfulness to people.' }
    ] },
  { id: 'faith', title: 'Faith and Meaning', optIn: true,
    lead: 'Only if you want this chapter. It is here for whatever has given your life meaning, faith or not.',
    note: 'This chapter is for whatever has held you up: faith, spirit, nature, love, your values, or something you are still finding. All faith traditions and everything in-between are welcome here, and so are questions.',
    prompts: [
      { id: 'faith-1', t: 'What has held you up through the years.', help: 'A faith, a practice, a person, a place, a way of seeing the world.' },
      { id: 'faith-2', t: 'A prayer, song, saying, or practice that has fed you.', help: 'Write it out if you like, and when it helped most.' },
      { id: 'faith-3', t: 'A time you felt part of something larger than yourself.', help: 'Where were you? What happened?' },
      { id: 'faith-4', t: 'How your sense of meaning has changed over the years.', help: 'What has stayed, what has shifted, what has grown.' },
      { id: 'faith-5', t: 'A question you still carry.', help: 'Questions are welcome here. They don\'t need answers.' },
      { id: 'faith-6', t: 'If faith or a faith community has been a weight or a hurt, what you would want people to understand.', help: 'Only what you want to say. Your experience matters here.' },
      { id: 'faith-7', t: 'Where you have found peace.', help: 'A moment, a place, a person, a practice.' }
    ] },
  { id: 'losses', title: 'Losses and Hard Seasons', optIn: true,
    lead: 'A chapter to open only when you want to. You can close it any time.',
    note: 'Looking back can stir grief. That is normal, and you can stop at any point. You might ask someone you trust to sit with you while you write. If it gets heavy, call or text 988 any time.',
    prompts: [
      { id: 'losses-1', t: 'Someone you have lost, and what you want remembered about them.', help: 'Their name, their laugh, a story only you can tell.', care: 1 },
      { id: 'losses-2', t: 'A hard time you came through, and what helped you through it.', help: 'People, faith, humor, work, stubbornness. Whatever helped counts.', care: 1 },
      { id: 'losses-3', t: 'Something you lost that was not a person.', help: 'A home, a job, your health, a dream, a way of life.', care: 1 },
      { id: 'losses-4', t: 'Who showed up for you in a hard season.', help: 'What did they do that you still remember?', care: 1 },
      { id: 'losses-5', t: 'What grief has taught you.', help: 'About love, about people, about yourself.', care: 1 },
      { id: 'losses-6', t: 'Something that still brings you comfort when you miss someone.', help: 'A ritual, a place, a song, a habit you kept.', care: 1 }
    ] },
  { id: 'memories', title: 'War and Hard Memories', optIn: true,
    lead: 'For memories that are hard to carry, including war, service, or harm. Open it only if and when you choose.',
    note: 'Old memories, including war memories, can come back stronger later in life, around retirement, illness, or the loss of people who were there. Write only what you want to. You can stop any time, and you can write with someone you trust beside you. If it gets heavy, call or text 988. Veterans, call 988 and press 1, or text 838255.',
    prompts: [
      { id: 'memories-1', t: 'A time that changed you, that you have rarely talked about.', help: 'Only as much as you want. A few lines is enough.', care: 1 },
      { id: 'memories-2', t: 'If you served, what you want people to understand about that time.', help: 'About the work, the people, or what it cost.', care: 1 },
      { id: 'memories-3', t: 'Someone you served or went through it with, and what you want remembered about them.', help: 'Their name, what they were like, a moment you shared.', care: 1 },
      { id: 'memories-4', t: 'What helped you carry it afterward.', help: 'People, faith, work, time, silence, help you sought.', care: 1 },
      { id: 'memories-5', t: 'What you want the people who come after you to know about it.', help: 'A lesson, a warning, a hope.', care: 1 },
      { id: 'memories-6', t: 'What brought you back to yourself.', help: 'A person, a place, a moment of peace.', care: 1 }
    ] },
  { id: 'peace', title: 'Regrets and Making Peace', optIn: true,
    lead: 'Every life has things we would do differently. This chapter is for making peace with them, at your own pace.',
    note: 'Some regrets can still be mended, and some can be set down. Both are possible. Write only what you want to keep, and you can delete anything any time. If it gets heavy, call or text 988.',
    prompts: [
      { id: 'peace-1', t: 'Something you would do differently, and what you know now.', help: 'What you know now that you wish you had known then.', care: 1 },
      { id: 'peace-2', t: 'Something you have changed your mind about.', help: 'What changed it?', care: 1 },
      { id: 'peace-3', t: 'Something you are still hoping to mend.', help: 'A call, a letter, a visit, an apology. It can be a first step, or simply named here.', care: 1 },
      { id: 'peace-4', t: 'Something you have forgiven, or are learning to.', help: 'Forgiving never means saying harm was okay, or being near someone unsafe.', care: 1 },
      { id: 'peace-5', t: 'Something you have forgiven yourself for, or would like to.', help: 'Speak to yourself the way you would speak to a friend.', care: 1 },
      { id: 'peace-6', t: 'What you would say to your younger self.', help: 'At any age you choose.', care: 1 }
    ] },
  { id: 'learned', title: 'What Life Has Taught Me', optIn: false,
    lead: 'The lessons you have earned. Short answers are some of the best.',
    prompts: [
      { id: 'learned-1', t: 'Three things life has taught you.', help: 'They can be big, or as small as how to fold a shirt.' },
      { id: 'learned-2', t: 'Advice you would give someone starting out.', help: 'About work, money, love, or getting through hard days.' },
      { id: 'learned-3', t: 'What matters most to you now.', help: 'Has it changed over the years?' },
      { id: 'learned-4', t: 'Something about growing older that surprised you.', help: 'What has been better, or harder, than you expected?' },
      { id: 'learned-5', t: 'How you got through the hardest days.', help: 'What you would want someone else to try.' },
      { id: 'learned-6', t: 'A value you have tried to live by.', help: 'Where did it come from, and where did you see it pay off?' },
      { id: 'learned-7', t: 'What you hope the world learns.', help: 'From your life, your generation, or your times.' }
    ] },
  { id: 'blessings', title: 'Blessings and Words to Leave', optIn: false,
    lead: 'A letter of the heart, sometimes called an ethical will: the values, thanks, hopes, and blessings you want to pass on. Write to one person, to many, or to whoever reads this someday.',
    prompts: [
      { id: 'blessings-1', t: 'What you hope for the people you love.', help: 'For their lives, their work, their hearts. By blood or by choice.' },
      { id: 'blessings-2', t: 'What you want them to remember about you.', help: 'Not what you did. Who you were.' },
      { id: 'blessings-3', t: 'The values you hope they carry forward.', help: 'Honesty, kindness, hard work, humor, faithfulness. In your own words.' },
      { id: 'blessings-4', t: 'A blessing, in your own words, for someone you love.', help: 'It can be one sentence. It can follow your tradition, or none.' },
      { id: 'blessings-5', t: 'Thank you.', help: 'To whom, and for what. Name as many people as you like.' },
      { id: 'blessings-6', t: 'I love you.', help: 'To whom. Say what you love about them.' },
      { id: 'blessings-7', t: 'Words of forgiveness, asked or given, if you want to say them.', help: 'Only if you want to. Forgiveness is never forced, and never toward someone unsafe.' },
      { id: 'blessings-8', t: 'What you want said at the end, or when people gather to remember you.', help: 'A reading, a song, a story, a joke, a wish.' },
      { id: 'blessings-9', t: 'A letter to one person.', help: 'Start with "Dear" and their name, and write what you most want them to know.' },
      { id: 'blessings-10', t: 'Anything else you want said.', help: 'The last word is yours.' }
    ] }
];

const INTRO = [
  'Your Legacy Book is a place to keep the stories, lessons, recipes, and blessings you want the people you love to have.',
  'Pick any chapter and any prompt. Skip whatever you like. Go in any order, at your own pace.',
  'Someone you trust can write while you tell. Mark it "told to," and it stays yours.',
  'Your book stays on this device, locked in your profile. You decide what to print or share, and with whom.',
  'Looking back can bring joy, and sometimes grief. Harder chapters stay closed until you choose to open them.'
];

// Design cautions for the app and for guides. Not shown as prompts.
const CAUTIONS = [
  'Every prompt can be skipped, and the book says so plainly. No streaks, reminders, or nudges for the Legacy Book.',
  'Looking back can stir grief, regret, and old trauma. Hard chapters are opt-in, come after lighter ones, and show the care line under each prompt.',
  'Combat veterans can find war memories return as they age. Where prompts touch service, show the Veterans Crisis Line: call 988 and press 1.',
  'Nothing assumes marriage, children, faith, or a particular family shape.',
  'People with memory changes can write with a family member, with "told to" entries. Looking back together is a way to connect, whatever it brings.',
  'Never prefill, invent, or rewrite a person\'s words. Their book holds only what they or the person they chose wrote.',
  'Everything stays on the device, encrypted in the profile, until the person chooses to print or share a page.'
];

// Ids in gg-sources.js (proposed in the build's sources.json).
const SOURCES = ['butler', 'pinquart', 'bohlmeijer', 'westerhof', 'woodsrt', 'chochinov11', 'allen', 'ethicalwill', 'erikson', 'davison'];

window.SEQUOIA_LEGACY = { version: VERSION, title: 'Legacy Book', intro: INTRO, careLine: CARE_LINE, chapters: CHAPTERS, cautions: CAUTIONS, sources: SOURCES };
})();
