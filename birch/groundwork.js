/* =====================================================================
   BIRCH GROUNDWORK . the Groundwork notebook and Skills I've Got
   Read by Birch (/birch/), the Groundwork tab (GWG BLD 742). Edit prompts
   and skills here, not in index.html or app.js. Built on the shape of
   /pine/nextsteps.js (Next Steps), so the app renders it the same way.

   Sequoia looks back (the Legacy Book), Pine looks ahead (Next Steps), and
   Birch builds: Groundwork is a private notebook for a young adult, 18 to
   26, plus Skills I've Got, short checklists of practical life skills the
   person marks at their own pace. Prompts are written fresh for Grounded.
   None of the wording of a scale or program is copied.

   Each chapter:
     { id, title, lead, optIn, note, prompts: [{ id, t, help, plain? }] }
   Optional fields:
     chapter.plainTitle, chapter.plainLead, chapter.plainNote
                     the Plain wording of the faith and meaning chapter.
     chapter.whenLabel the label for a prompt's optional date when it is
                     not "By when" (the letter uses "Read it again on").
     chapter.fromPine: 1  the From Pine chapter (below). Shown only when the
                     record holds fromPine; the app may list it first.
     prompt.plain    the Plain wording of t. Shown when the profile uses
                     Plain wording; t is the Faith wording. Prompts with no
                     plain read the same in both.
     prompt.plainHelp the Plain wording of help, when it differs.
     prompt.care: 1  the app shows careLine under the prompt, with the
                     adult help lines one tap away (the calm card).
     prompt.when: 1  the app offers an optional date next to the answer
                     (label "By when", or chapter.whenLabel). The date is
                     saved with the answer. No reminders, nudges, or overdue
                     marks.
   Faith or Plain never changes scores; this notebook has no scores at all.

   SKILLS (Skills I've Got): { [chapterId]: [skill, ...] } for the
   practical chapters (work, money, home, health, people). Each skill:
     { id, t, help, link?, site? }
     t       the skill, in the first person ("Make a monthly budget").
     help    one or two short lines: what it means and a first step.
     link    optional, one of:
               { practice: 'part|Name' }  a practice in BIRCH_PRACTICES
                                          (birch/practices.js), by its key
               { guide: 'oak:<id>' }      one of Oak's When Life Changes
                                          guides (oak/guides.js), opened at
                                          /oak/#life=<id>. Birch's own guides
                                          arrive in Birch 2 as 'birch:<id>'.
     site    optional [label, url]: an official page to start from.
   Skills are never graded and never required. A skill can be marked done,
   with an optional short note, and unmarked any time.

   Marking a skill done is a milestone in the game layer (birch/app.js,
   the same pattern as Pine's MILES). GAME.miles below names the ones this
   file suggests: the first skill marked done, ten skills, and every skill
   in one chapter. Once reached, a milestone stays, even if a skill is
   unmarked later. Never counted against anyone, never a streak, never
   shown to anyone else.

   From Pine: Start My Birch (pine/app.js, the moving-on card) copies the
   Pine teen's Next Steps notebook into the new Birch profile as
   groundwork.fromPine (Pine keeps its own copy). Groundwork shows it as the
   From Pine chapter: a read-only list of what was written in Pine, grouped
   by Pine's chapter titles (PINE_CHAPTERS, keyed by the part of the prompt
   id before the dash), each with its date, plus the From Pine prompts
   below so the person keeps writing. Pine's words are never edited here.

   Saved shape (under GGP.data(id, 'birch').groundwork, locked):
     groundwork: { answers: { [promptId]: { text, date, when?, q } },
                   opened: { [chapterId]: 'YYYY-MM-DD' },
                   skills: { [skillId]: { done: 'YYYY-MM-DD', note?, t } },
                   fromPine?: { answers, opened, from: 'pine', copied } }
   q and t keep the prompt or skill as it read when written, so the words
   still make sense if this file is edited later or the tree changes.

   Firm rules:
   - Private. Everything stays on the device, encrypted in the person's own
     profile, opened only with their passcode. Share to Family never
     includes Groundwork. A helper (when the person turns helpers on) never
     sees Groundwork unless the person prints or shares a chapter by choice.
   - Printed, saved as a PDF, or shared only when the person chooses, and
     only the chapters (and skills lists) the person picks.
   - Moving to Oak (from the 26th birthday, Move My Tree to Oak): Groundwork stays whole in
     the Birch record and prints whole.
   - Every prompt can be skipped. No streaks, reminders, or nudges.
   - Nothing assumes college, a job, a partner, a family shape, money, a
     home, or faith. Every path is honored equally: work, school, a trade,
     an apprenticeship, the military, service, parenting, caregiving, and
     time between things.
   - The faith and meaning chapter is optIn and closed until the person
     opens it, in both wordings. Adult faith rules apply (Oak's): ask about
     experience, never belief or affiliation; faith can be a resource or a
     stressor; all faith traditions and everything in-between are welcome,
     and so are questions and doubt.
   - Nothing is prefilled, invented, or rewritten for the person.

   Sources used (ids for shared/gg-sources.js, see p742/out/groundwork-sources.json):
     damon03, bronk18, mlq, arnett, yeager18, snyder, king, stanley,
     cfpbfwb
   ===================================================================== */
(function(){
const VERSION = 1;

const CARE_LINE = 'If this brings up more than you want to carry alone, pause here and reach out to someone you trust, or call or text 988 any time.';

const CHAPTERS = [
  { id: 'becoming', title: 'Who I\'m Becoming', optIn: false,
    lead: 'These years are for trying things, changing your mind, and finding out who you are when the choices are yours. Write who you are now, not who you are supposed to be.',
    prompts: [
      { id: 'becoming-1', t: 'Three words for who you are right now.', help: 'Not forever. Just this season of your life.' },
      { id: 'becoming-2', t: 'Something about you that has changed in the last year or two.', help: 'A view, a habit, a friendship, how you handle stress, what you care about.' },
      { id: 'becoming-3', t: 'Something you\'re proud of that nobody handed you a trophy for.', help: 'Getting through a hard stretch counts. So does showing up for someone.' },
      { id: 'becoming-4', t: 'What people count on you for.', help: 'Fixing things, listening, making people laugh, getting the job done, keeping calm.' },
      { id: 'becoming-5', t: 'Something you\'re still figuring out.', help: 'Take the time you need. Searching is a normal part of these years.' },
      { id: 'becoming-6', t: 'Where you live by your own choices, and where you still follow someone else\'s script.', help: 'Every answer is welcome. Just notice. Is there room to choose a little more of your own?' },
      { id: 'becoming-7', t: 'Where you feel behind, and what one next step would look like.', help: 'Everyone\'s timeline is different. Comparing is easy; one small step is more useful.', care: 1 },
      { id: 'becoming-8', t: 'Who you want to be in five years.', help: 'Not what you want to have. Who you want to be: how you treat people, how you spend your days.' }
    ] },
  { id: 'values', title: 'What Matters Most to Me', optIn: false,
    lead: 'Values are what you care about enough to act on. The right answers here are yours.',
    prompts: [
      { id: 'values-1', t: 'The values you want to live by.', help: 'Honesty, fairness, family, hard work, kindness, adventure, loyalty, service, courage. Pick a few, or write your own.' },
      { id: 'values-2', t: 'A time you stood by what you value when it cost you something.', help: 'Big or small. What did you do, and what did it teach you?' },
      { id: 'values-3', t: 'Where your time and money went last week, and whether that matches what matters to you.', help: 'Just notice. Small changes start with seeing clearly.' },
      { id: 'values-4', t: 'A value you were raised with that you\'re keeping, and one you\'re choosing for yourself.', help: 'Both can be true. Your values can grow as you do.', care: 1 },
      { id: 'values-5', t: 'Someone whose way of living you respect.', help: 'Someone you know, or someone you have only read about. What do they get right?' },
      { id: 'values-6', t: 'Something you would keep doing even if no one noticed.', help: 'That is often a clue to what matters most.' },
      { id: 'values-7', t: 'A way you want to make a difference beyond yourself.', help: 'For a person, a place, a cause, people you will never meet. Now or someday.' }
    ] },
  { id: 'work', title: 'Work, School, and Calling', optIn: false,
    lead: 'A job, school, a trade, an apprenticeship, the military, service, parenting, caring for someone, or figuring it out. Every one of these is real work, and a path can change more than once.',
    prompts: [
      { id: 'work-1', t: 'What you spend most of your days doing right now.', help: 'School, a job, two jobs, training, service, caring for someone, looking for what is next. All of it counts.' },
      { id: 'work-2', t: 'What you like about it, and what drains you.', help: 'Write both. They point toward what fits you.' },
      { id: 'work-3', t: 'Work you would like to try, learn, or grow into.', help: 'Curious is enough. You do not have to choose yet.' },
      { id: 'work-4', t: 'What you want from work besides a paycheck.', help: 'To learn, to help people, to build things, steady hours, a good team, time for the people you love.' },
      { id: 'work-5', t: 'One skill, license, or credential that would open a door.', help: 'What it costs, how long it takes, and who could tell you more.' },
      { id: 'work-6', t: 'Someone who does work you are curious about, and one question you could ask them.', help: 'Most people are glad to talk about their work for ten minutes.' },
      { id: 'work-7', t: 'Your next step in the next month.', help: 'Small and real: update a résumé, ask about a class, apply for one job, talk with a mentor or a recruiter.', when: 1 },
      { id: 'work-8', t: 'Another way there, if the first road closes.', help: 'Most goals have more than one road. Name a second one.' }
    ] },
  { id: 'money', title: 'Money and My Plan', optIn: false,
    lead: 'Money is a skill, and nobody is born knowing it. Nothing here asks how much you have. Wherever you are starting from is a fine place to start.',
    prompts: [
      { id: 'money-1', t: 'What money means to you.', help: 'Security, freedom, helping family, fun, worry. Every answer is welcome.', care: 1 },
      { id: 'money-2', t: 'Your money picture, in a sentence or two.', help: 'What comes in, what goes out, and what you owe, if anything. Only what you want to write.', care: 1 },
      { id: 'money-3', t: 'Something you are saving toward, or would like to.', help: 'A cushion for surprises, a car, rent, a trip, school, a ring, a move.' },
      { id: 'money-4', t: 'One money habit that is working, and one you want to change.', help: 'Keep it to one of each. Small changes last.' },
      { id: 'money-5', t: 'Money questions you want answered.', help: 'Credit, loans, taxes, insurance, saving, investing. Any question counts, even ones that feel basic.' },
      { id: 'money-6', t: 'Someone you could ask about money.', help: 'Someone in your family, a coworker, a credit union, a financial counselor at school or work.' },
      { id: 'money-7', t: 'A money goal for this year, and the first step.', help: 'The first step can be ten minutes long.', when: 1 }
    ] },
  { id: 'home', title: 'My Home', optIn: false,
    lead: 'Home might be a dorm, a barracks, an apartment, your family\'s house, a room you rent, or a place you are still looking for. All of these count.',
    prompts: [
      { id: 'home-1', t: 'Where you live right now, and how it feels to come home.', help: 'Calm, crowded, lonely, busy, safe, temporary. Write what is true.', care: 1 },
      { id: 'home-2', t: 'What makes a place feel like home to you.', help: 'Light, quiet, plants, music, people, a clean counter, a door that locks.' },
      { id: 'home-3', t: 'Living with others: what works, and what you would change.', help: 'Roommates, family, a partner, a bunkmate, kids. Bills, chores, guests, quiet hours.' },
      { id: 'home-4', t: 'One small thing that would make your space better this month.', help: 'A shelf, a lamp, a clear table, a talk with a roommate.', when: 1 },
      { id: 'home-5', t: 'Where you would like to live in a few years, and why.', help: 'Close to family, a new city, small town, wherever the work is. Staying and going are both good choices.' },
      { id: 'home-6', t: 'If home stopped working, where you would go first.', help: 'A person, a place, or 211 for local help with housing, food, and bills.', care: 1 }
    ] },
  { id: 'health', title: 'My Health', optIn: false,
    lead: 'Your health is yours to run now. Start with what you know and what you want to learn.',
    prompts: [
      { id: 'health-1', t: 'How your body has been feeling lately.', help: 'Energy, sleep, aches, appetite. Just notice.' },
      { id: 'health-2', t: 'What helps you sleep, and what gets in the way.', help: 'Shift work, screens, roommates, a baby, worry, a late job. Write what is real for you.' },
      { id: 'health-3', t: 'How you eat in a normal week, and one small change you would like.', help: 'No rules here. One change you can keep beats a big plan.' },
      { id: 'health-4', t: 'Movement you enjoy, or would like to try.', help: 'Walking, a gym, a team, a bike, dancing, stretching after a shift. Seated and gentle ways count too.' },
      { id: 'health-5', t: 'What you reach for when stress runs high.', help: 'The helpful and the less helpful. Both are worth noticing, without shame.', care: 1 },
      { id: 'health-6', t: 'Signs you are running low, and what you will do when you notice them.', help: 'Sleeping too much or too little, skipping meals, pulling away from people. Name one thing that helps.', care: 1 },
      { id: 'health-7', t: 'Questions you want to ask a doctor, a dentist, or a counselor.', help: 'Write them down now so they are ready when you are in the room.' }
    ] },
  { id: 'people', title: 'My People', optIn: false,
    lead: 'Family by birth or by choice, friends, coworkers, mentors, neighbors, a team, a community. Nobody builds a life alone.',
    prompts: [
      { id: 'people-1', t: 'People in your corner right now.', help: 'One is enough to start. They can be anywhere: near, far, at work, online, back home.', care: 1 },
      { id: 'people-2', t: 'Who you would call at two in the morning.', help: 'Write a name and a way to reach them. 988 belongs on this list too, by call or text, any time.', care: 1 },
      { id: 'people-3', t: 'A friendship you want to keep growing, and how.', help: 'A standing call, a text on Sundays, a meal once a month, showing up for the hard stuff.' },
      { id: 'people-4', t: 'How things with your family are changing as you grow up.', help: 'Closer, more distant, more equal, complicated. All of these happen.', care: 1 },
      { id: 'people-5', t: 'What you want in a close relationship, and what you will not accept.', help: 'Friendship or dating. Respect, honesty, your own space, being able to say no.', care: 1 },
      { id: 'people-6', t: 'Someone you look out for.', help: 'A sibling, a friend, a coworker, a child, a neighbor. Looking out for others is part of standing tall.' },
      { id: 'people-7', t: 'Where you might find more of your people.', help: 'A class, a team, a job, a faith community, a club, volunteering, a group that meets in person.' }
    ] },
  { id: 'faith', title: 'Faith and Meaning', plainTitle: 'Meaning and What Holds Me Up', optIn: true,
    lead: 'Only if you want this chapter. It is here for faith, for meaning, and for the questions in between.',
    plainLead: 'Only if you want this chapter. It is here for whatever gives your life meaning, and for your questions too.',
    note: 'This chapter is for whatever holds you up: God, prayer, worship, scripture, quiet, nature, music, service, your values, or something you are still working out. All faith traditions and everything in-between are welcome here, and so are questions and doubt. Many people make faith their own in these years, step back for a while, or find their way home to it. If faith or a faith community has been hard for you, that belongs here too.',
    plainNote: 'This chapter is for whatever holds you up: quiet, nature, music, service, the people you love, your values, or something you are still working out. Questions are welcome here too.',
    prompts: [
      { id: 'faith-1', t: 'What helps you feel grounded and at peace.', help: 'Prayer, worship, scripture, quiet, being outside, music, time with people you love.', plainHelp: 'Quiet, being outside, music, a walk, time with people you love.' },
      { id: 'faith-2', t: 'A practice that is yours, chosen for yourself.', help: 'Whether you grew up with it or found it on your own. What does it give you?' },
      { id: 'faith-3', t: 'How your faith has changed since you were younger.', plain: 'How what gives you meaning has changed since you were younger.', help: 'Deeper, quieter, questioned, set aside, found again. All of these are real.' },
      { id: 'faith-4', t: 'A big question about life, meaning, or faith that you are carrying.', plain: 'A big question about life or meaning that you are carrying.', help: 'Questions are welcome here. They do not need answers yet.' },
      { id: 'faith-5', t: 'Whether faith feels like a source of strength right now, a source of stress, or some of both.', plain: 'Whether what you were taught about how to live feels like a source of strength right now, a source of stress, or some of both.', help: 'Only what you want to write. Your experience matters, and you can talk it through with someone you trust.', care: 1 },
      { id: 'faith-6', t: 'A community where you feel you belong, or one you would like to find.', help: 'A congregation, a small group, a service team, friends who share what matters to you.', plainHelp: 'A service team, a group, a circle of friends who share what matters to you.' },
      { id: 'faith-7', t: 'How what you believe or value shapes your work and the way you treat people.', plain: 'How what you value shapes your work and the way you treat people.', help: 'The choices you make, the way you serve, the people you show up for.' },
      { id: 'faith-8', t: 'Where you find hope.', help: 'A person, a prayer, a practice, a place, a moment.', plainHelp: 'A person, a practice, a place, a moment.' }
    ] },
  { id: 'letter', title: 'A Letter to Myself at 26', optIn: false, whenLabel: 'Read it again on (optional)',
    lead: 'Write to the person you will be at 26. If you are 26 already, write to yourself a year from now. Pick a day to come back and read it.',
    prompts: [
      { id: 'letter-1', t: 'Dear me at 26.', help: 'Start here. Write what your life is like right now, the good and the hard.', when: 1 },
      { id: 'letter-2', t: 'What you hope has happened by then.', help: 'Picture things going well. Not perfect, just well. What is different?' },
      { id: 'letter-3', t: 'What you want to remember about who you are right now.', help: 'Your people, your music, your worries, your jokes, what you care about.' },
      { id: 'letter-4', t: 'Something you are afraid of, and what you would tell yourself about it.', help: 'Speak to yourself the way you would speak to a good friend.', care: 1 },
      { id: 'letter-5', t: 'A promise to yourself that you can keep.', help: 'Small and real.' },
      { id: 'letter-6', t: 'Words for a stretch that turns out harder than you hoped.', help: 'What you would want to hear. Hard stretches pass, and help is there when you reach for it.', care: 1 }
    ] },
  { id: 'fromPine', title: 'From Pine', optIn: false, fromPine: 1,
    lead: 'What you wrote in Pine\'s Next Steps, carried here when you started Birch. Pine keeps its own copy. Read it, and keep writing.',
    prompts: [
      { id: 'fromPine-1', t: 'Reading this now, what still fits?', help: 'The values, plans, and people that still feel true.' },
      { id: 'fromPine-2', t: 'What has changed since you wrote it.', help: 'Plans change, and so do people. That is growth, not failure.' },
      { id: 'fromPine-3', t: 'A step from back then that you took, or one you still want to take.', help: 'Count the ones you took. Pick one for now, if you like.', when: 1 }
    ] }
];

// Pine's Next Steps chapter titles, keyed by the part of a Pine prompt id
// before the dash, so the From Pine list can group what was written.
const PINE_CHAPTERS = {
  values: 'What Matters to Me',
  strengths: 'What I\'m Good At and What I Love',
  people: 'People in My Corner',
  paths: 'Paths I\'m Curious About',
  steps: 'My Next Small Steps',
  money: 'Money Basics I Want to Learn',
  faith: { t: 'Faith and Meaning', plain: 'Meaning and What Holds Me Up' },
  letter: 'A Letter to Myself in a Year'
};

// Skills I've Got: practical chapters only. Mark what you can do already,
// and come back for the rest when life asks for it.
const SKILLS = {
  work: [
    { id: 'sk-resume', t: 'Write a résumé', help: 'One page: what you have done, what you can do, and how to reach you. Jobs, school, service, volunteering, and caring for family all count.' },
    { id: 'sk-apply', t: 'Fill out an application start to finish', help: 'A job, a program, a school, or training. Keep your dates, past addresses, and references in one place.' },
    { id: 'sk-interview', t: 'Practice for an interview', help: 'Say your answer to "Tell me about yourself" out loud three times. Have one question ready to ask them.' },
    { id: 'sk-reference', t: 'Ask someone to be a reference', help: 'A boss, a teacher, a coach, a leader. Ask first, and tell them what the job or program is.' },
    { id: 'sk-paystub', t: 'Read my pay stub', help: 'Find what you earned, what came out for taxes and benefits, and what you took home.' },
    { id: 'sk-raise', t: 'Ask for a raise or more hours', help: 'Write down what you do well and what has grown since you started. Ask for a time to talk, then ask plainly.' },
    { id: 'sk-paying', t: 'Find out how school or training gets paid for', help: 'If school or training is part of your plan: aid, grants, pay while you train, service benefits. The federal student aid site is a good start.', site: ['Federal Student Aid', 'https://studentaid.gov/'] },
    { id: 'sk-jobends', t: 'Know what to do if a job ends', help: 'Ask about your last paycheck and benefits, look up your state\'s unemployment insurance, and tell one person you trust.', link: { guide: 'oak:job-loss' } }
  ],
  money: [
    { id: 'sk-budget', t: 'Make a monthly budget', help: 'List what comes in and what goes out. Needs first, then savings, then the rest. A note on your phone is enough.' },
    { id: 'sk-account', t: 'Open a checking or savings account', help: 'A bank or a credit union. Ask about monthly fees and overdraft before you sign up.' },
    { id: 'sk-cushion', t: 'Start an emergency cushion', help: 'Any amount counts. Even a little set aside each payday makes surprises easier to handle.' },
    { id: 'sk-credit', t: 'Check my credit report', help: 'You can see your reports from the three credit bureaus at the official site. Look for accounts you do not know.', site: ['AnnualCreditReport.com', 'https://www.annualcreditreport.com/'] },
    { id: 'sk-creditwork', t: 'Know how credit works', help: 'Paying on time and keeping balances low help the most. A card is a tool, not extra money.' },
    { id: 'sk-taxes', t: 'File my taxes', help: 'Gather your W-2 or 1099 forms, then file by the deadline. Many people can file at no cost, and the IRS site explains how.', site: ['IRS', 'https://www.irs.gov/'] },
    { id: 'sk-debts', t: 'Know what I owe', help: 'List each loan or card: who it is with, the rate, and the monthly payment. Seeing it in one place is the first step.', link: { guide: 'oak:money-crisis' } },
    { id: 'sk-scam', t: 'Spot a scam', help: 'Pressure to act now, payment by gift card or crypto, or a job that pays you before you start. Slow down and ask someone.' },
    { id: 'sk-autopay', t: 'Check my subscriptions and auto-pay', help: 'Once a season, look at what renews each month. Keep what you use.' }
  ],
  home: [
    { id: 'sk-lease', t: 'Read a lease before signing', help: 'Check the rent, the length, the deposit, who pays which bills, how repairs work, and what happens if you need to leave early.', link: { guide: 'oak:moving' } },
    { id: 'sk-movein', t: 'Take move-in photos', help: 'Photograph every room, every wall and floor, on the day you move in. Save them where you can find them when you move out.' },
    { id: 'sk-roommate', t: 'Make a roommate agreement', help: 'Bills, chores, guests, quiet hours, and food. Easier to settle on a good day than a bad one.' },
    { id: 'sk-bills', t: 'Set up the bills and know the due dates', help: 'Power, internet, phone, rent. Put each due date on your calendar.' },
    { id: 'sk-repair', t: 'Ask for a repair in writing', help: 'Say what is broken, when it started, and send a photo. Keep a copy.' },
    { id: 'sk-fixes', t: 'Handle the small fixes', help: 'Reset a breaker, unclog a drain, find the water shutoff, change a smoke alarm battery.' },
    { id: 'sk-cook', t: 'Cook five meals I like', help: 'Five simple meals you can make on a tired night and a tight week. Repeat is fine.' },
    { id: 'sk-groceries', t: 'Shop for groceries with a plan', help: 'Plan a few meals, make a list, and check what you already have before you go.' },
    { id: 'sk-housinghelp', t: 'Know where to turn if housing falls through', help: 'Dial 211 for local help with housing, food, and bills. Name one person you could stay with for a night.', site: ['211', 'https://www.211.org/'] }
  ],
  health: [
    { id: 'sk-doctor', t: 'Set up a doctor or clinic of my own', help: 'Find one that takes your insurance, or a community clinic, and book a first visit while you are well.' },
    { id: 'sk-pharmacy', t: 'Choose a pharmacy and refill a prescription', help: 'Know which pharmacy has your prescriptions and how to ask for a refill before you run out.' },
    { id: 'sk-insurance', t: 'Know my insurance and what happens at 26', help: 'Where your coverage comes from, your member number, and what a visit costs. Coverage on a parent\'s plan usually ends at 26; HealthCare.gov explains the window to choose a new plan.', site: ['HealthCare.gov', 'https://www.healthcare.gov/'] },
    { id: 'sk-history', t: 'Know my health history', help: 'Allergies, medicines, past surgeries, vaccines, and what runs in your family, written down in one place.' },
    { id: 'sk-appt', t: 'Make my own appointment and ask my questions', help: 'Call or book online, bring your list of questions, and ask what to do next before you leave.' },
    { id: 'sk-dental', t: 'Book a dental or eye exam', help: 'Once a year is a good rhythm. Ask about cost when you book.' },
    { id: 'sk-speak', t: 'Name who can speak for me in a medical emergency', help: 'Once you are 18, family is not told your health information automatically. A health care directive names the person you choose.' },
    { id: 'sk-mental', t: 'Know where to find support for my mind and feelings', help: 'Through your insurance, a school counseling center, a work assistance program, or a community clinic. 988 is there any time, by call or text.' },
    { id: 'sk-safetyplan', t: 'Make a safety plan for hard days', help: 'A short plan: your warning signs, what helps, people and places to reach, how to make your space safer, and 988.', link: { guide: 'oak:suicidal-self' } }
  ],
  people: [
    { id: 'sk-ice', t: 'Set an emergency contact in my phone', help: 'Add one in your phone\'s emergency or medical settings so help can reach someone even when your phone is locked.' },
    { id: 'sk-hardtalk', t: 'Have a hard conversation calmly', help: 'Say what happened, how it felt, and what you need. One topic at a time.' },
    { id: 'sk-no', t: 'Say no without a long explanation', help: '"No, I can\'t this time" is a full sentence. Kind and clear beats long and guilty.' },
    { id: 'sk-repairfriend', t: 'Make things right after a conflict', help: 'Name your part, say sorry for it, and ask what would help.', link: { guide: 'oak:forgiveness' } },
    { id: 'sk-signs', t: 'Know the signs of a controlling relationship', help: 'Checking your phone, cutting you off from friends, controlling money, threats. Love Is Respect is there any time: call 1-866-331-9474 or text LOVEIS to 22522.', link: { guide: 'oak:domestic-violence' }, site: ['Love Is Respect', 'https://www.loveisrespect.org/'] },
    { id: 'sk-friendhelp', t: 'Help a friend who is struggling', help: 'Ask directly how they are, listen more than you talk, and help them reach 988 or someone they trust.', link: { guide: 'oak:suicidal-other' } },
    { id: 'sk-newpeople', t: 'Find one place to meet people', help: 'A class, a team, a club, a faith community, volunteering, a group at work. Go three times before you decide.', link: { guide: 'oak:loneliness' } }
  ]
};

const INTRO = [
  'Groundwork is your private notebook for who you are becoming and the life you are building, plus Skills I\'ve Got, a checklist of practical skills you mark at your own pace.',
  'Pick any chapter and any prompt. Skip whatever you like. Nothing is due, and nothing here is graded.',
  'Every path counts: work, school, a trade, an apprenticeship, the military, service, parenting, caring for someone, or time between things. You can change your mind as often as you need to.',
  'Your notebook stays on this device, locked with your passcode, so only you can open it. You decide what to print or share, and with whom.',
  'If you started in Pine, what you wrote in Next Steps is here too, in its own chapter.'
];

// Game layer suggestions for birch/app.js (the same shape as Pine's MILES:
// [id, name, line]). Reached once, kept for good.
const GAME = {
  miles: [
    ['skill1', 'First Skill I\'ve Got', 'You marked your first skill in Groundwork.'],
    ['skill10', 'Ten Skills I\'ve Got', 'Ten practical skills, marked in Groundwork.'],
    ['skillset', 'A Full Set of Skills', 'Every skill in one Groundwork chapter, marked.']
  ]
};

// Design cautions for the app. Not shown as prompts.
const CAUTIONS = [
  'Every prompt and every skill can be skipped, and the notebook says so plainly. No streaks, reminders, nudges, or overdue marks, even on dated goals.',
  'Only the person opens Groundwork. Share to Family never includes it. Helpers never see it unless the person prints or shares a chapter by choice.',
  'Every path is honored equally. Never rank college above work, trades, service, the military, parenting, caregiving, or time between things.',
  'Nothing assumes college, a job, a partner, a family shape, money, a home, or faith.',
  'The faith and meaning chapter is opt-in in both wordings, follows the adult faith rules, and shows the Plain wording when the profile uses Plain.',
  'Prompts that could stir hard things carry care: 1, so the care line shows under them with the adult help lines one tap away (988, Crisis Text Line, Love Is Respect, The Hotline, 911).',
  'Skills are a checklist for the person, never a test. Marking one done is a quiet milestone; unmarking takes nothing away.',
  'The From Pine chapter shows Pine\'s words as they were written, never edited, with room to keep writing.',
  'Never prefill, invent, or rewrite the person\'s words.',
  'Everything stays on the device, encrypted in the profile, and stays whole in the Birch record when the tree moves to Oak.'
];

// Ids in gg-sources.js (proposed in p742/out/groundwork-sources.json).
const SOURCES = ['damon03', 'bronk18', 'mlq', 'arnett', 'yeager18', 'snyder', 'king', 'stanley', 'cfpbfwb'];

window.BIRCH_GROUNDWORK = { version: VERSION, title: 'Groundwork', skillsTitle: 'Skills I\'ve Got', intro: INTRO, careLine: CARE_LINE, chapters: CHAPTERS, skills: SKILLS, pineChapters: PINE_CHAPTERS, game: GAME, cautions: CAUTIONS, sources: SOURCES };
})();
