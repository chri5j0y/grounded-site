/* =====================================================================
   PINE NEXT STEPS . the Next Steps notebook prompts
   Read by Pine (/pine/), the Next Steps tab. Edit prompts here, not in
   index.html or app.js. Built on the shape of /sequoia/legacy.js (the
   Legacy Book), so the app can render it the same way.

   Next Steps is a private notebook for a high schooler's values, strengths,
   people, and plans after high school. The chapters follow the three parts
   of youth purpose: what matters to me (meaning), where I am headed and my
   next step (goals), and how I can help or make a difference (beyond the
   self). Prompts are written fresh for Grounded. None of the wording of a
   scale or program is copied.

   Each chapter:
     { id, title, lead, optIn, note, prompts: [{ id, t, help, plain? }] }
   Optional fields:
     chapter.plainTitle, chapter.plainLead, chapter.plainNote
                     the Plain wording of the faith and meaning chapter.
     prompt.plain    the Plain wording of t. Shown when the profile uses
                     Plain wording; t is the Faith wording. Prompts with no
                     plain read the same in both.
     prompt.plainHelp the Plain wording of help, when it differs.
     prompt.care: 1  the app shows careLine under the prompt.
     prompt.when: 1  the app offers an optional "By when" date next to the
                     answer (My Next Small Steps). The date is saved with the
                     answer. No reminders, nudges, or overdue marks.
   Faith or Plain never changes scores; this notebook has no scores at all.

   Saved shape (suggested for the app, under GGP.data(id, 'pine')):
     nextsteps: { answers: { [promptId]: { text, date, when?, q } },
                  opened: { [chapterId]: 'YYYY-MM-DD' } }
   q keeps the prompt as it read when written, so the answer still makes
   sense if the prompt is edited later or the notebook moves to another tree.

   Firm rules:
   - Private. Everything stays on the device, encrypted in the teen's own
     profile, opened only with the teen's passcode. A grown-up never sees
     Next Steps, and Share to Family never includes it. No helper or
     "told to" entries in Pine.
   - Printed, saved as a PDF, or shared only when the teen chooses, and only
     the chapters the teen picks.
   - Carried forward: into Birch later (the Start My Birch step), and into
     Oak by the Start My Oak step, labeled as written in Pine. Never lost.
   - Every prompt can be skipped. No streaks, reminders, or nudges.
   - Nothing assumes a family shape, college, money, or faith. Every path
     after high school is honored equally: work, college, trade school, an
     apprenticeship, the military, service, a gap year, staying close to home.
   - The faith and meaning chapter is optIn and closed until the teen opens
     it, in both wordings. Kids' faith rules apply: invite, don't assume;
     God named as one door among several; God never presented as a judge;
     ask about experience, never belief; faith can be a resource or a
     stressor.
   - Nothing is prefilled, invented, or rewritten for the teen.

   Sources used (ids for shared/gg-sources.js, see p739/out/nextsteps-sources.json):
     damon03, bronk18, yeager18, schreier13, monahan, snyder, gollwitzer, mcii,
     king, wyman10
   ===================================================================== */
(function(){
const VERSION = 1;

const CARE_LINE = 'If this brings up more than you want to carry alone, stop here and talk with someone you trust, or call or text 988 any time.';

const CHAPTERS = [
  { id: 'values', title: 'What Matters to Me', optIn: false,
    lead: 'Values are the things you care about enough to act on. There are no right answers here, only yours.',
    prompts: [
      { id: 'values-1', t: 'Something you care about enough to stand up for.', help: 'A person, a cause, a principle, a place. What would you speak up for?' },
      { id: 'values-2', t: 'Three words you want people to use about you.', help: 'Honest, loyal, funny, brave, fair, kind, hardworking. Pick yours, or write your own.' },
      { id: 'values-3', t: 'A time you acted on what you believe, even when it was hard.', help: 'Big or small. What did you do, and what did it teach you?' },
      { id: 'values-4', t: 'Where your time goes because you choose it, and where it goes because others expect it.', help: 'No judgment either way. Just notice. Is there room to choose a little more of your own?' },
      { id: 'values-5', t: 'Someone whose way of living you respect.', help: 'Someone you know, or someone you have only read about. What do they get right?' },
      { id: 'values-6', t: 'A way you want to make a difference, now or someday.', help: 'At home, at school, at work, on a team, in your town, or for people you will never meet.' }
    ] },
  { id: 'strengths', title: 'What I\'m Good At and What I Love', optIn: false,
    lead: 'Strengths are what you do well. Sparks are what light you up. Both point somewhere.',
    prompts: [
      { id: 'strengths-1', t: 'Something people count on you for.', help: 'Fixing things, listening, making people laugh, showing up on time, keeping the group organized.' },
      { id: 'strengths-2', t: 'Something you lose track of time doing.', help: 'A sport, an instrument, cars, code, drawing, cooking, building, a job, animals, a game.' },
      { id: 'strengths-3', t: 'A skill you have worked hard to build.', help: 'How long did it take, and who helped?' },
      { id: 'strengths-4', t: 'A class, job, team, or project where you felt most like yourself.', help: 'What about it fit you?' },
      { id: 'strengths-5', t: 'Something you want to get better at this year.', help: 'A skill, a habit, a subject, a craft, a sport.' },
      { id: 'strengths-6', t: 'A compliment you got that you quietly believed.', help: 'Who said it, and why did it land?' }
    ] },
  { id: 'people', title: 'People in My Corner', optIn: false,
    lead: 'Nobody figures out the future alone. These are the people who help you stand tall, wherever they come from.',
    prompts: [
      { id: 'people-1', t: 'Adults you trust, at home or anywhere else.', help: 'A parent, a grandparent, an aunt or uncle, a coach, a teacher, a boss, a neighbor, a school counselor, a youth leader. One is enough to start.', care: 1 },
      { id: 'people-2', t: 'A friend who gets you.', help: 'What do they understand about you that others miss?' },
      { id: 'people-3', t: 'Someone who knows about a path you are curious about.', help: 'Someone who works in it, studied it, served, or took that road. What is one question you could ask them?' },
      { id: 'people-4', t: 'Who you would reach out to if things got hard.', help: 'Write a name and a way to reach them. 988 belongs on this list too, any time, by call or text.', care: 1 },
      { id: 'people-5', t: 'Someone you help or look out for.', help: 'A brother or sister, a teammate, a younger kid, a neighbor, a friend. Helping others is part of standing tall.' },
      { id: 'people-6', t: 'Where you might find more people for your corner.', help: 'A team, a club, a class, a job, a group you already belong to, a place to volunteer.' }
    ] },
  { id: 'paths', title: 'Paths I\'m Curious About', optIn: false,
    lead: 'Work, college, trade school, an apprenticeship, the military, service, a gap year, staying close to home. Every one of these is a real path, and plenty of people try more than one.',
    prompts: [
      { id: 'paths-1', t: 'Paths you are curious about right now.', help: 'List as many as you like. Curious is enough. You don\'t have to choose yet.' },
      { id: 'paths-2', t: 'What draws you to each one.', help: 'The work itself, the people, the pay, the place, the chance to help, the challenge.' },
      { id: 'paths-3', t: 'What you want to find out before you choose.', help: 'What it costs, how long the training takes, what a normal day looks like, where it can lead.' },
      { id: 'paths-4', t: 'A way to try one out this year.', help: 'A job shadow, a class, a summer job, volunteering, a visit, a talk with someone who does it.' },
      { id: 'paths-5', t: 'What other people hope you will do, and what you want.', help: 'Write both down. They may match, or not. Seeing them side by side helps you talk about it.' },
      { id: 'paths-6', t: 'Staying close to home or going somewhere new, and why.', help: 'Both are good choices. Family, work, money, a place you love, a place you want to see.' },
      { id: 'paths-7', t: 'If you work during the school year, how it fits.', help: 'What you earn, what you learn, and how many hours still leave room for school, sleep, and friends.' }
    ] },
  { id: 'steps', title: 'My Next Small Steps', optIn: false,
    lead: 'Big plans are built from small steps. Pick a few you can really do, and give each one a date if you like.',
    prompts: [
      { id: 'steps-1', t: 'One goal for the next month.', help: 'Small and real: ask about a job, finish an application, sign up for a class, talk with a counselor or a recruiter.', when: 1 },
      { id: 'steps-2', t: 'The very first step, and the day you will take it.', help: 'Something you could do in ten minutes.', when: 1 },
      { id: 'steps-3', t: 'What might get in the way.', help: 'Be honest: time, nerves, money, a ride, forgetting, other people\'s plans.' },
      { id: 'steps-4', t: 'Your if-then plan.', help: 'If that gets in the way, then I will... For example: if I forget, then I will set a reminder right after practice.' },
      { id: 'steps-5', t: 'One goal for this school year.', help: 'A grade, a skill, a job, a team, a license, a test, savings, a habit.', when: 1 },
      { id: 'steps-6', t: 'Another way there, if the first way closes.', help: 'Most goals have more than one road. Name a second one.' },
      { id: 'steps-7', t: 'A step you already took that you are proud of.', help: 'Count it. Small steps add up.' }
    ] },
  { id: 'money', title: 'Money Basics I Want to Learn', optIn: false,
    lead: 'Money is a skill, and nobody is born knowing it. Start with what you want to know. Wherever you are starting from is a fine place to start.',
    prompts: [
      { id: 'money-1', t: 'Money questions you want answered.', help: 'Bank accounts, paychecks, taxes, budgets, credit, loans, saving. Any question counts, even ones that feel basic.' },
      { id: 'money-2', t: 'Something you are saving for, or would like to.', help: 'A phone, a car, a trip, rent someday, a cushion for surprises.' },
      { id: 'money-3', t: 'How a path you are curious about gets paid for.', help: 'Pay while you train, scholarships, grants, financial aid, work, service benefits. Write what you know and what you want to find out.' },
      { id: 'money-4', t: 'Someone you could ask about money.', help: 'A family member, a boss, a school counselor, a teacher, someone at a bank or credit union.' },
      { id: 'money-5', t: 'One money habit you want to try.', help: 'Track a week of spending, save a little from each paycheck, or wait a day before buying something big.' },
      { id: 'money-6', t: 'What money means to you.', help: 'Security, freedom, helping family, fun, stress. There is no right answer.', care: 1 }
    ] },
  { id: 'faith', title: 'Faith and Meaning', plainTitle: 'Meaning and What Holds Me Up', optIn: true,
    lead: 'Only if you want this chapter. It is here for faith, for meaning, and for the questions in between.',
    plainLead: 'Only if you want this chapter. It is here for whatever gives your life meaning, and for your questions too.',
    note: 'This chapter is for whatever holds you up: God, prayer, worship, quiet, nature, music, family traditions, your values, or something you are still figuring out. All faith traditions and everything in-between are welcome here, and so are questions. If faith or a faith community has been hard for you, that belongs here too.',
    plainNote: 'This chapter is for whatever holds you up: quiet, nature, music, family traditions, your values, or something you are still figuring out. Questions are welcome here too.',
    prompts: [
      { id: 'faith-1', t: 'What helps you feel peaceful inside.', help: 'Prayer, worship, sitting quietly, being outside, music, time with people you love.', plainHelp: 'Sitting quietly, being outside, music, a walk, time with people you love.' },
      { id: 'faith-2', t: 'A family tradition, a faith, or a practice that matters to you.', plain: 'A family tradition or a practice that matters to you.', help: 'What is it, and what does it give you?' },
      { id: 'faith-3', t: 'A time you felt part of something bigger than yourself.', help: 'In worship, in nature, on a team, at a concert, helping someone.', plainHelp: 'In nature, on a team, at a concert, with family, helping someone.' },
      { id: 'faith-4', t: 'A big question about life, meaning, or faith that you are carrying.', plain: 'A big question about life or meaning that you are carrying.', help: 'Questions are welcome here. They don\'t need answers yet.' },
      { id: 'faith-5', t: 'Whether anything about faith or worship has ever made you feel scared or not good enough.', plain: 'Whether a group, a tradition, or something you were taught has ever made you feel scared or not good enough.', help: 'Only what you want to write. Your experience matters, and you can talk it through with someone you trust.', care: 1 },
      { id: 'faith-6', t: 'How what you believe or value might shape the path you choose.', plain: 'How what you value might shape the path you choose.', help: 'The work you do, the way you serve, where you live, the people you spend time with.' },
      { id: 'faith-7', t: 'Where you find hope.', help: 'A person, a prayer, a practice, a place, a moment.', plainHelp: 'A person, a practice, a place, a moment.' }
    ] },
  { id: 'letter', title: 'A Letter to Myself in a Year', optIn: false,
    lead: 'Write to the person you will be a year from now. Come back and read it then.',
    prompts: [
      { id: 'letter-1', t: 'Dear me, a year from now.', help: 'Start here. Write what your life is like right now, the good and the hard.' },
      { id: 'letter-2', t: 'What you hope has happened by then.', help: 'Picture a year where things went well. Not perfect, just well. What is different?' },
      { id: 'letter-3', t: 'What you want to remember about who you are right now.', help: 'Your friends, your music, your worries, your jokes, what you care about.' },
      { id: 'letter-4', t: 'A question for your future self.', help: 'Something you want to know the answer to next year.' },
      { id: 'letter-5', t: 'Words for a year that turns out harder than you hoped.', help: 'What you would want to hear. Speak to yourself the way you would speak to a good friend.', care: 1 }
    ] }
];

const INTRO = [
  'Next Steps is your private notebook for what matters to you and where you might go after high school.',
  'Pick any chapter and any prompt. Skip whatever you like. Nothing is due, and nothing here is graded.',
  'Every path is a real path: work, college, trade school, an apprenticeship, the military, service, a gap year, or staying close to home. You can change your mind as often as you need to.',
  'Your notebook stays on this device, locked with your passcode, so only you can open it. You decide what to print or share, and with whom.',
  'When you move on from Pine, your notebook comes with you.'
];

// Design cautions for the app. Not shown as prompts.
const CAUTIONS = [
  'Every prompt can be skipped, and the notebook says so plainly. No streaks, reminders, nudges, or overdue marks, even on dated goals.',
  'Only the teen opens Next Steps. A grown-up never sees it, Share to Family never includes it, and there are no helper or "told to" entries.',
  'Every path after high school is honored equally. Never rank college above work, trades, service, the military, a gap year, or staying close to home.',
  'Nothing assumes a family shape, college, money, or faith. Trusted adults can be anywhere, not only at home.',
  'The faith and meaning chapter is opt-in in both wordings, follows the kids\' faith rules, and shows the Plain wording when the profile uses Plain.',
  'Prompts that could stir hard things carry care: 1, so the care line shows under them. If home is not safe, the teen\'s outside help lines (Childhelp, Day One, Love Is Respect, 911, a trusted adult at school) are one tap away.',
  'Never prefill, invent, or rewrite the teen\'s words.',
  'Everything stays on the device, encrypted in the profile, carried into Birch later and into Oak by Start My Oak, and printed or shared only when the teen chooses.'
];

// Ids in gg-sources.js (proposed in p739/out/nextsteps-sources.json).
const SOURCES = ['damon03', 'bronk18', 'yeager18', 'schreier13', 'monahan', 'snyder', 'gollwitzer', 'mcii', 'king', 'wyman10'];

window.PINE_NEXTSTEPS = { version: VERSION, title: 'Next Steps', intro: INTRO, careLine: CARE_LINE, chapters: CHAPTERS, cautions: CAUTIONS, sources: SOURCES };
})();
