/* =====================================================================
   PINE CHECKIN . the question bank
   Read by Pine (/pine/) and, in a later build, Pine Guide in the Field
   Guide, so both always ask the same thing. Edit questions here, not in
   index.html or app.js.

   Pine is the tree for high schoolers, grades 9 to 12. It follows the
   Grounded tree standard, version 1, the same as Oak and Sequoia:
   - Six parts in one order: Roots (What grounds you), Trunk (Purpose),
     Bark (Mind and feelings), Branches (Relationships), Leaves (Body),
     Fruit (Hope). Code names match the tree part: roots, trunk, bark,
     branches, leaves, fruit. PARTS holds Pine's own words for each.
   - Seven questions per part, 42 in all (Aspen asks 6, Oak 8).
   - Every question has a tip for the person sitting with the teen (a
     parent, mentor, coach, youth leader, or Pine Guide, who may read it
     aloud) and a short "why" line a teen can tap to read.
   - Four answers plus "Not sure", asked about the past two weeks.
     Scores run 1 to 10 for every tool.
   - Two reverse worded questions in every part.
   - Levels: Strong (8 to 10), Steady (5 to 7), Growing Edge (1 to 4).
   - A safety step fitted to grades 9 to 12, always with 988 and 911.
   - Flagged answers (alone, losing hope, bullied, someone hurting me)
     are never lost: the teen sees help lines right away.

   Leaves holds three strands, Move, Rest, and Nourish. One Leaves question
   for each is tagged s: 'move', 'rest', or 'nourish'. The weekly quick
   check-in asks question 1 of every part plus each tagged strand (WEEKLY):
   Leaves question 1 is the Rest strand, so the quick check-in asks eight.

   Each question: { t, tip, why } plus
     r: 1        a reverse question ("Often" is the hard answer)
     flag        'alone', 'hope', or 'bully' (see FLAGS)
     s           'move', 'rest', or 'nourish' (Leaves strands)
     src: ['id'] where the "why" line rests on a study or measure
     v           band variants: v['9-10'] or v['11-12'] holds any of
                 { t, tip, why, src } that replace the shared wording
                 for that band. A question with no v is the same for
                 both bands.
     plain       the Plain wording: any of { t, tip, why, src } that
                 replace the Faith wording when the profile uses Plain.
                 A question with no plain reads the same either way.
   Question 1 of every part is the quick check-in question, so it is never
   a reverse question, and it is the same in both bands.

   BANDS: two grade bands, '9-10' and '11-12'. They share most questions
   and differ where the future looks different (starting high school or
   leaving it). Each band has exactly seven questions per part, in the
   same order, so a question's place means the same thing in both bands.
   The profile stores the grade (9, 10, 11, or 12); bandOf(grade) gives
   the band. Rings note their band and bank, and compare only with rings
   from the same band and bank. Rings from Oak or Aspen are kept, labeled
   earlier, and never compared with Pine rings.

   getBank(band, wording) returns the questions ready to ask: one list per
   part, seven each, with the band and wording already applied.
   wording is 'faith' (the default) or 'plain'.

   Faith or Plain: a grown-up sets it at setup with the teen, and the teen
   can change it later in settings. Every Roots line, and any other line
   that names faith, has a Plain wording. Plain asks the same thing
   without religious words, so scores never change between the two.
   Roots follows the kids' faith wording: invite, don't assume; God is
   named as one door among several (prayer, worship, quiet, nature,
   family traditions); start from family; ask about experience, never
   belief or affiliation; God is never presented as the judge. Roots
   measures whether faith is a resource or a stressor. A teen of all
   faith traditions and everything in-between can score Strong.

   Nothing in this bank asks a teen to reveal substance use, dating, or
   who they like. Friends, relationships, substances, driving, and
   screens are asked as readiness and pressure questions.

   SENSITIVE: two optional questions, one on pressure to vape, drink, or
   use drugs to cope (Leaves), one on pressure or control from someone
   close (Branches). Both are off unless the teen turns them on in
   settings; only the teen can. They are asked after their part, never
   count toward a score, never raise the grown-up alert, and are never
   shared, printed for a grown-up, or sent to The Grove.

   Who sees what: a grown-up who agreed when the profile was made sees
   only a quiet "Please check in" alert, never answers, levels, notes,
   or faith answers. ALERT_KINDS lists what raises it (the safety step,
   feeling alone, losing hope), written as
   GGP.setShared(pid, { safety: { flag: date, kinds } }), the same shape
   as oakTeenAlert. NEVER_ALERT lists what never raises it: when a teen
   says someone is hurting them, the person may be one of the grown-ups
   who would get the alert, so the teen sees outside help instead
   (SAFETY.lines.hurt).

   Questions are written fresh. EPOCH, SWEMWBS, the BMMRS, the Claremont
   Purpose Scale, the PHQ-A, PHQ-2, GAD-2, the three-item loneliness
   scale, the Children's Hope Scale, the CDC Youth Risk Behavior Survey,
   and the NIMH ASQ are foundations only. None of their items are copied.

   Sources used (ids for gg-sources.js; the lead merges
   p739/out/checkin-sources.json):
     Roots:    desrosiers, smithdenton, bmmrsteen, exline
     Trunk:    damon03, bronk18, schreier13, yeager18
     Bark:     selfcompteen, bluth16, mnconsent, gad2, uspstfanx, phqa, yrbs23
     Branches: wyman10, cdcconnect23, steinberg89, murthy, ucla3, cdcbully23
     Leaves:   aasm16, aapsleep14, recchia23, cdcpa, sgsocial23, mtf24, cdcteendrivers
     Fruit:    snyder, chs97, yrbs23, schleider22
     Safety:   asq, horowitz12, gould05, dazzi
   ===================================================================== */
(function(){
const VERSION = 1;   // the Grounded tree standard
const BANK = 1;      // Pine's first question bank
const PER_PART = 7;

const ANSWERS = [
  ['rarely', 'Rarely', 0],
  ['sometimes', 'Sometimes', 1],
  ['often', 'Often', 2],
  ['always', 'Almost always', 3],
  ['unsure', 'Not sure', null]
];

const LEVELS = [
  ['strong', 'Strong', 8],
  ['steady', 'Steady', 5],
  ['edge', 'Growing Edge', 1]
];

const STEMS = {
  standard: 'In the past two weeks, how often have you...'
};

// Pine's own words for the six parts. line is the teen's one-line meaning;
// plainLine replaces it under Plain wording where it differs.
const PARTS = [
  { key: 'roots', name: 'Roots', sub: 'What grounds you', line: 'Peace, faith, and what holds you steady', plainLine: 'Peace, values, and what holds you steady' },
  { key: 'trunk', name: 'Trunk', sub: 'Purpose', line: 'What you care about and where you are headed' },
  { key: 'bark', name: 'Bark', sub: 'Mind and feelings', line: 'Handling stress, mistakes, and big feelings' },
  { key: 'branches', name: 'Branches', sub: 'Relationships', line: 'Friends, family, and the adults in your corner' },
  { key: 'leaves', name: 'Leaves', sub: 'Body', line: 'Move, Rest, and Nourish' },
  { key: 'fruit', name: 'Fruit', sub: 'Hope', line: 'What you look forward to and believe is possible' }
];

// Two grade bands. The profile stores the grade; the band follows it.
const BANDS = [
  ['9-10', 'Grades 9 and 10', ['9', '10']],
  ['11-12', 'Grades 11 and 12', ['11', '12']]
];
const GRADES = [
  ['9', 'Grade 9'],
  ['10', 'Grade 10'],
  ['11', 'Grade 11'],
  ['12', 'Grade 12']
];

// Check-in modes. In 'trust', the tip shows as a conversation prompt
// after each answer (Aspen's gold note), for a parent, mentor, coach,
// youth leader, or counselor the teen chose.
const MODES = [
  ['self', 'On my own'],
  ['trust', 'With someone I trust']
];

const Q = {
  roots: [
    { t: 'Felt peace deep down, even when life was busy or hard?',
      tip: 'Ask where those moments come from, and help protect time for them. Share where you find peace, if they want to hear it.',
      why: 'Peace deep down helps you stay steady when school, people, and plans get loud.',
      plain: { t: 'Felt peace deep down, even when life was busy or hard?' } },
    { t: 'Felt connected to God, the Sacred, or something larger than yourself, in your own way, like when you pray, worship, sit quietly, or spend time outside?',
      tip: 'Ask what "in your own way" looks like for them, and let them use their own words. Share a moment of your own if it fits. Never push.',
      why: 'For many teens, feeling a personal connection to the sacred goes with lighter moods, more than just showing up does.',
      src: ['desrosiers'],
      plain: { t: 'Felt connected to something bigger than yourself, like nature, music, or the people you love?',
        tip: 'Ask where they feel most part of something bigger. Share a moment of your own if it fits.',
        why: 'Feeling part of something bigger can steady you and make hard things feel less lonely.',
        src: [] } },
    { t: 'Leaned on family traditions, or a faith, that matter to you?',
      tip: 'Ask which traditions mean the most, and why. If family traditions feel complicated right now, ask what they would want to keep, or start.',
      why: 'Traditions connect you to the people who came before you, and they give hard days a shape.',
      plain: { t: 'Leaned on traditions or values from your family that matter to you?',
        tip: 'Ask which traditions or values mean the most, and why. If family feels complicated right now, ask what they would want to keep, or start.' } },
    { t: 'Taken time to be quiet, pray, or reflect?',
      tip: 'Ask what helps them slow down: prayer, a walk, music, a journal, or sitting outside. Quiet works best as a choice, never a rule.',
      why: 'A few quiet minutes can help you sort out your thoughts and know yourself better.',
      plain: { t: 'Taken quiet time to think or reflect?',
        tip: 'Ask what helps them slow down: a walk, music, a journal, or sitting outside. Quiet works best as a choice, never a rule.' } },
    { t: 'Felt welcome to bring your honest questions and doubts, about faith or about life\'s big questions?',
      tip: 'Questions and doubts are a normal part of faith at this age. Share some of your own if it fits, and don\'t push or rush to answers.',
      why: 'Lots of people your age find faith hard to put into words. Honest questions are part of growing, not a problem.',
      src: ['smithdenton'],
      plain: { t: 'Felt welcome to bring your honest questions about life\'s big questions, like why things happen or what matters most?',
        tip: 'Big questions are normal at this age. Share some of your own if it fits, and don\'t rush to answers.',
        why: 'Big questions are part of growing up. Having room to ask them helps you find your own answers.',
        src: [] } },
    { t: 'Felt scared, ashamed, or pushed out by something about faith, worship, or a faith community?', r: 1,
      tip: 'Listen first. Don\'t defend or correct. Ask what happened, or who made them feel that way. Faith that wounds is worth taking seriously. If a person or group is causing harm, step in.',
      why: 'Faith is meant to be a source of strength. In teens, hurtful experiences with faith go with heavier moods, so it is worth talking about with someone you trust.',
      src: ['bmmrsteen', 'exline'],
      plain: { t: 'Felt scared, ashamed, or not good enough because of rules or beliefs from your family or community?',
        tip: 'Listen first. Don\'t defend or correct. Ask what happened, or who made them feel that way. If a person or group is causing harm, step in.',
        why: 'Rules or beliefs that leave you feeling not good enough can weigh on everything. It is worth talking about with someone you trust.',
        src: [] } },
    { t: 'Felt empty inside, like something is missing?', r: 1,
      tip: 'Listen without fixing, and thank them for telling you. If it lasts two weeks or more, help them talk with a doctor or school counselor.',
      why: 'Feeling empty is worth noticing. It can mean part of you needs some tending.',
      plain: { t: 'Felt empty inside, like something is missing?' } }
  ],
  trunk: [
    { t: 'Known what you care about enough to stand up for?',
      tip: 'Ask what they would stand up for, and why. Tell them when you see them do it.',
      why: 'Knowing what you would stand up for shows you what you value most.' },
    { t: 'Had a goal you\'re working toward, and known your next step?',
      tip: 'Ask about it with curiosity, not advice. Help them name one next step and when they\'ll take it.',
      why: 'Purpose grows through the high school years. It starts with a goal that matters to you and a next step you can take.',
      src: ['damon03', 'bronk18'],
      v: {
        '9-10': { t: 'Had a goal you\'re working toward, in school, a sport, a job, or something you love, and known your next step?' },
        '11-12': { t: 'Had a goal you\'re working toward, for now or for after high school, and known your next step?',
          tip: 'College, a trade, work, service, the military, a gap year, and staying close to home are all real paths. Ask what draws them, and help them name one next step.' }
      } },
    { t: 'Used a strength or skill that people count on you for?',
      tip: 'Name a strength you count on them for, and when you last saw it.',
      why: 'Strengths other people count on remind you that you have something real to give.' },
    { t: 'Had a chance to help or make a difference, at home, at school, at work, on a team, or in your community?',
      tip: 'Ask when helping felt good. Look together for one place to do more of it.',
      why: 'Helping is good for the helper too. Teens who volunteered with younger kids even showed healthier hearts.',
      src: ['schreier13'] },
    { t: 'Felt that what you do each day matters?',
      tip: 'Ask which part of the day feels most worth it, and which part feels empty.',
      why: 'Feeling that your days matter helps you keep going when things get hard.' },
    { t: 'Felt you had to act like someone you\'re not to be accepted?', r: 1,
      tip: 'Ask where that happens most. Tell them which parts of the real them you value.',
      why: 'Acting like someone else all day is exhausting. The right people want the real you.' },
    { t: 'Spent most of your time on things only because other people expect it?', r: 1,
      tip: 'Ask what they would spend time on if it were up to them. Listen, and look for a little room to make that happen.',
      why: 'Spending time only on what others expect can leave you feeling empty. What you care about matters too.',
      v: {
        '11-12': { t: 'Felt pushed toward a plan for after high school that doesn\'t feel like yours?',
          tip: 'Ask what they would choose if it were up to them. More than one good path exists. Help them say what they want out loud, and listen before you advise.',
          why: 'Teens do best when their own values are respected. Plans you choose yourself are the ones you keep going on.',
          src: ['yeager18'] }
      } }
  ],
  bark: [
    { t: 'Noticed stress building and done something that helps?',
      tip: 'Ask how they know stress is building, and what helps most. Offer to try a new one together, like a walk or slow breathing.',
      why: 'Noticing stress early lets you do something about it before it piles up.' },
    { t: 'Felt calm inside?',
      tip: 'Ask when they feel most settled, and what helps them get back there.',
      why: 'A calm mind gives you room to think clearly and choose what to do next.' },
    { t: 'Learned from a mistake or a failure without being harsh with yourself?',
      tip: 'Share a failure of your own and what you learned. Ask what they would say to a friend in the same spot.',
      why: 'In teens, being kind to yourself goes with less stress and lower moods, and it is a skill you can learn.',
      src: ['selfcompteen', 'bluth16'] },
    { t: 'Reached out for help when things were hard?',
      tip: 'Tell them about a time you asked for help. Make it normal, never a weakness.',
      why: 'Asking for help is a strength, and it gets problems solved faster.',
      v: {
        '11-12': { tip: 'Tell them about a time you asked for help. Make it normal, never a weakness. In Minnesota, at 16 a teen can ask for counseling on their own.',
          why: 'Asking for help is a strength. In Minnesota, once you are 16 you can ask for counseling yourself.',
          src: ['mnconsent'] }
      } },
    { t: 'Held your ground when people pushed you toward something you knew wasn\'t right for you?',
      tip: 'Ask about a time they held their ground, and tell them you\'re proud of it. Practice an easy way out together, and let them use you as the excuse.',
      why: 'Holding your ground takes strength, and it gets easier with practice.' },
    { t: 'Had worry or nervousness that was hard to switch off, and got in the way of sleep, school, or fun?', r: 1,
      tip: 'Ask what they worry about most. Listen first. If it lasts more than a couple of weeks, help them talk with a doctor or school counselor.',
      why: 'Worry that won\'t switch off is common at your age. Doctors check teens for it because help works.',
      src: ['gad2', 'uspstfanx'] },
    { t: 'Felt down, numb, or not interested in things you used to enjoy?', r: 1,
      tip: 'Listen without fixing. If it lasts two weeks or more, help them talk with a doctor or school counselor. Listen for hopelessness.',
      why: 'Low moods are common in high school, and they respond to help. A low mood that lasts two weeks is worth telling a doctor or counselor.',
      src: ['phqa', 'yrbs23'] }
  ],
  branches: [
    { t: 'Had friends who have your back?',
      tip: 'Ask who those friends are and how they show it.',
      why: 'Friends who have your back make hard things easier to face.' },
    { t: 'Had at least one adult besides a parent you could go to, like a coach, teacher, counselor, youth leader, relative, or boss?',
      tip: 'Help them name that adult. If no one comes to mind, think together about who has shown up for them before.',
      why: 'A trusted adult outside your family makes it easier to get help, for you or for a friend.',
      src: ['wyman10'] },
    { t: 'Felt close to people at school, or like you belong somewhere, like a team, a club, a job, a group, or a faith community?',
      tip: 'Ask where they feel most at home. Help them stay connected, or find one place to try.',
      why: 'High schoolers who feel close to people at school are much less likely to feel sad or hopeless.',
      src: ['cdcconnect23'],
      plain: { t: 'Felt close to people at school, or like you belong somewhere, like a team, a club, a job, or a group?' } },
    { t: 'Felt close to someone in your family, even when you disagree?',
      tip: 'Keep regular one-on-one time, even short. Car rides and side-by-side time often work best. Staying close while disagreeing is something you can show them.',
      why: 'Warmth at home, with room to be yourself, helps teens through these years.',
      src: ['steinberg89'] },
    { t: 'Known who you could talk to if someone you\'re close to or going out with ever pressured you, controlled you, or made you feel bad about yourself?',
      tip: 'Keep the door open without prying. Say: "You can always tell me, and you won\'t be in trouble for telling." Love Is Respect (call 1-866-331-9474, or text LOVEIS to 22522) helps teens think it through.',
      why: 'Knowing who you would go to makes it much easier to get help fast if a friendship or relationship turns controlling.' },
    { t: 'Felt lonely, even with people around?', r: 1, flag: 'alone',
      tip: 'Plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.',
      why: 'Young people are among the loneliest groups today. Loneliness is worth sharing with someone you trust.',
      src: ['murthy', 'ucla3'] },
    { t: 'Had someone bully, threaten, or embarrass you, in person or online?', r: 1, flag: 'bully',
      tip: 'Listen first and thank them for telling you. Save any messages or pictures, then work with the school. If someone is threatening them with a picture, Take It Down and the CyberTipline can help, and they are not in trouble.',
      why: 'Bullying, in person or online, is never your fault, and you don\'t have to handle it alone.',
      src: ['cdcbully23'] }
  ],
  leaves: [
    { t: 'Gotten enough sleep to wake up feeling rested?', s: 'rest',
      tip: 'Teens need 8 to 10 hours. A teen body clock runs later, so this is biology, not laziness. Phones charging outside the bedroom help a lot.',
      why: 'Teens need 8 to 10 hours of sleep, and your body clock shifts later in these years. Sleep is where mood and focus recharge.',
      src: ['aasm16', 'aapsleep14'] },
    { t: 'Moved your body in a way you enjoy, like a sport, walking, lifting, dancing, or biking?', s: 'move',
      tip: 'Every kind counts, including seated and adapted movement. Ask what is most fun, and make room for it. Rest when hurt, and after a hit to the head, stop and get checked.',
      why: 'Moving helps your mood, not just your body. In teens, being active eased low moods.',
      src: ['recchia23', 'cdcpa'] },
    { t: 'Eaten regular meals, without guilt or strict rules?', s: 'nourish',
      tip: 'Keep it about energy, never weight or looks. Make breakfast and snacks easy to grab. If food starts to feel like rules they can\'t break, talk with their doctor.',
      why: 'Regular meals keep your energy, mood, and focus steady through the day.' },
    { t: 'Felt okay in your own body?',
      tip: 'Keep the talk about strength, energy, and health, never weight or looks. Listen without judging.',
      why: 'Lots of teens say social media makes them feel worse about their bodies. How your body feels and what it can do matter more than how it looks online.',
      src: ['sgsocial23'] },
    { t: 'Felt ready to say no, with an easy way out, if someone offered you a vape, a drink, or drugs?',
      tip: 'Practice a few easy ways out together. Let them use you as the excuse, and promise a no-questions ride home any time.',
      why: 'Most high schoolers don\'t vape, drink, or use drugs. Planning a way out ahead of time makes it easy to stay that way.',
      src: ['mtf24'],
      v: {
        '11-12': { t: 'Felt ready to turn down a ride or a plan that didn\'t feel safe, like a driver who had been drinking or was on their phone?',
          tip: 'Agree on a code word and a no-questions ride home, any time. Practice what they would say.',
          why: 'New drivers have the highest crash risk on the road. A plan made ahead of time makes the safe choice easy in the moment.',
          src: ['cdcteendrivers'] }
      } },
    { t: 'Stayed up late on your phone or other screens?', r: 1,
      tip: 'Agree on a time when screens charge outside the bedroom, and keep it yourself too. Ask how they feel after a long late scroll.',
      why: 'Late-night screens can steal the sleep your body and mind need.' },
    { t: 'Felt tired during the day, even after sleeping?', r: 1,
      tip: 'Look at bedtime, late screens, work hours, and early mornings. If it keeps up, or they snore loudly, mention it to their doctor.',
      why: 'With a body clock that runs later and early school starts, many teens run short on sleep. It is not a character flaw.',
      src: ['aapsleep14'] }
  ],
  fruit: [
    { t: 'Looked forward to something, soon or someday?',
      tip: 'A game, a trip, a friend, a season, or a plan all count. If nothing comes to mind, plan one small good thing together.',
      why: 'Something to look forward to gives each week a little more light.' },
    { t: 'Believed your life can turn out good, even when things are hard right now?',
      tip: 'Share a time you got through something hard. Don\'t argue with the feeling; add your own belief in them.',
      why: 'Believing your life can turn out good helps you keep going through hard stretches.' },
    { t: 'Found a way forward when something got in the way?',
      tip: 'Ask about a time they found another way. Name that strength back to them.',
      why: 'Hope is more than a feeling. It is seeing a way forward and believing you can take it.',
      src: ['snyder', 'chs97'] },
    { t: 'Had people who believe in your future?',
      tip: 'Tell them, plainly, that you believe in their future.',
      why: 'People who believe in your future help you believe in it too.',
      v: {
        '11-12': { t: 'Had people cheering you on as you plan what comes after high school?',
          tip: 'Tell them, plainly, that you believe in their future, whatever path they choose.',
          why: 'People cheering you on make big choices feel less lonely, and help you believe in where you are headed.' }
      } },
    { t: 'Done kind things for others, even when no one was watching?',
      tip: 'Notice and name the kind things they do. Do one together this month.',
      why: 'Kindness that no one sees still grows hope, in you and in others.' },
    { t: 'Felt like there\'s no point in trying anymore?', r: 1, flag: 'hope',
      tip: 'Take this seriously and keep talking. Ask gently how long it has felt this way. If they talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency. The safety step comes next.',
      why: 'Many high schoolers go through stretches of feeling hopeless. It can get better, and even one short session of help can lift it.',
      src: ['yrbs23', 'schleider22'] },
    { t: 'Blamed yourself for everything that goes wrong?', r: 1,
      tip: 'Help them sort what was theirs and what wasn\'t. Share a time you were too hard on yourself.',
      why: 'Blaming yourself for everything makes hard times heavier than they need to be.' }
  ]
};

// The weekly quick check-in: question 1 of every part (Leaves question 1
// is Rest), plus the Move and Nourish strands. Eight questions, all
// worded so "Almost always" is the good answer, so week to week
// comparisons read the right way. Indexes are within each part.
const WEEKLY = { roots: [0], trunk: [0], bark: [0], branches: [0], leaves: [0, 1, 2], fruit: [0] };

// What a flagged answer means, and which answers flag it.
// alone and hope flag on Often or Almost always; Almost always also opens the calm card.
// bully flags on Sometimes, Often, or Almost always.
// hurt comes from the safety step (someone hurting me), never from a part question.
// alert: true means the flag raises the quiet grown-up alert (ALERT_KINDS).
// lines names the help lines (SAFETY.lines.calm and .hurt ids) to show with the note.
const FLAGS = {
  alone: { on: ['often', 'always'], calm: ['always'], alert: true, title: 'Feeling alone',
    note: 'You said you\'ve felt lonely often. That\'s worth tending, and lots of people your age feel it too. Reaching out to one person this week can help: a friend, someone in your family, a coach, or a school counselor. If it feels heavy, call or text 988 any time.',
    lines: ['988', 'ctl', 'teenline'],
    guide: 'They named loneliness. Talk together about one person they could reach toward, and one group, team, or club to try. Listen for hopelessness.' },
  hope: { on: ['often', 'always'], calm: ['always'], alert: true, title: 'Losing hope',
    note: 'You said it\'s felt like there\'s no point in trying. You don\'t have to carry that alone, and it can get better with help. Call or text 988, or text HOME to 741741, any time, day or night.',
    lines: ['988', 'ctl', 'teenline', '911'],
    guide: 'They named low hope. Make sure the safety step was asked. Share 988, and follow your protocol if they speak of not wanting to be alive.' },
  bully: { on: ['sometimes', 'often', 'always'], calm: [], alert: false, title: 'Bullied or threatened',
    note: 'You said someone has been bullying, threatening, or embarrassing you. That\'s never your fault. Save any messages or pictures, and tell an adult you trust, like a school counselor, coach, or teacher. If someone is threatening you with a picture, you are not in trouble, and help is below.',
    lines: ['takeitdown', 'childhelp', '988', '911'],
    guide: 'They named bullying or threats. Listen first, help them save messages or pictures, and work with the school. If a picture is involved, point to Take It Down and the CyberTipline.' },
  hurt: { from: 'safety', alert: false, title: 'Someone hurting me',
    note: 'Thank you for telling me. No one has the right to hurt you, at home, at school, online, or in a relationship. These people are outside your home, and they can help any time. You can also tell a trusted adult at school, like a counselor, coach, or teacher.',
    lines: ['childhelp', 'dayone', 'loveisrespect', '911', 'school'],
    guide: 'They said someone is hurting them or making them feel unsafe. This never goes to the family alert. Ask privately whether they are safe right now. Pine Guide visits follow your reporting steps under Minnesota\'s child protection law.' }
};

// What raises the quiet "Please check in" alert for the grown-ups who
// agreed. 'safety' is the safety step's self question (SAFETY.on.self);
// alone and hope are the flags above. The alert never shows an answer.
const ALERT_KINDS = ['safety', 'alone', 'hope'];
// What never raises the alert: the hurt answer, bullying, and both
// optional sensitive questions.
const NEVER_ALERT = ['hurt', 'bully', 'cope', 'dating'];
// What Pine tells the teen when an alert is sent.
const ALERT_TOLD = 'A grown-up you chose will get a quiet note to check in with you. They won\'t see your answers.';

// The safety step, fitted to grades 9 to 12. Aspen's two questions, in
// Grounded's own words, shaped by the NIMH ASQ's direct approach (never
// its items). Direct wording is the research-informed way to ask; vague
// questions miss teens, and asking does not plant the idea.
// questions: [text, kind], as Aspen reads them. kind 'safe' is someone
// hurting me (the hurt flag, never the alert); kind 'self' raises the alert.
// now is asked only after a yes or not sure to the self question; a yes
// to it opens the calm card at the top.
const SAFETY = {
  intro: 'A lot of people your age go through really heavy stretches. These two questions help make sure you\'re okay. There\'s no wrong answer, and you can skip.',
  questions: [
    ['Is anyone hurting you, threatening you, or making you feel unsafe, at home, at school, online, or in a relationship?', 'safe'],
    ['Over the past few weeks, have you had thoughts of ending your life, or of not wanting to be alive?', 'self']
  ],
  selfLead: 'Sometimes, when life gets really heavy, people think about not wanting to be alive. Lots of people your age have had that thought, and it\'s safe to say so here.',
  now: 'Right now, today, are those thoughts with you?',
  answers: [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure'], ['skip', 'I\'d rather not say']],
  // Which answers count. 'skip' is respected and never counts as a yes.
  on: { safe: ['yes', 'unsure'], self: ['yes', 'unsure'], now: ['yes', 'unsure'] },
  kinds: { safe: 'hurt', self: 'safety' },
  yes: 'Thank you for telling me. You matter, and this can get better with help. Please reach out now. Someone will listen, any time.',
  means: 'If there are guns or a lot of medicine at home, ask a grown-up you trust to lock them up or keep them somewhere else for now.',
  title: 'You matter, and you don\'t have to carry this alone.',
  calmIntro: 'These people want to help, any time. You can also tell a grown-up you trust, like a parent, teacher, school counselor, coach, or someone else in your family.',
  hurtTitle: 'No one has the right to hurt you.',
  hurtIntro: 'These people are outside your home, and they can help any time. Telling a trusted adult at school is a strong step too.',
  // Help lines in the order shown. tel and sms are dialable; smsBody is
  // the word to text. calm is the calm card (decision 12); hurt is shown
  // when someone is hurting the teen (decision 6), never sent to the alert.
  lines: {
    calm: [
      { id: '988', name: '988 Suicide and Crisis Lifeline', show: 'Call or text 988', tel: '988', sms: '988', url: 'https://988lifeline.org/chat/', note: 'Private, all day and night. You can also chat at 988lifeline.org.' },
      { id: 'ctl', name: 'Crisis Text Line', show: 'Text HOME to 741741', sms: '741741', smsBody: 'HOME', note: 'All day and night. In Minnesota, you can text MN to 741741.' },
      { id: 'childhelp', name: 'Someone hurting you? Childhelp', show: 'Call or text 1-800-422-4453', tel: '18004224453', sms: '18004224453', note: 'All day and night, in many languages.' },
      { id: 'loveisrespect', name: 'Someone you\'re close to or going out with? Love Is Respect', show: 'Call 1-866-331-9474, or text LOVEIS to 22522', tel: '18663319474', sms: '22522', smsBody: 'LOVEIS', url: 'https://www.loveisrespect.org', note: 'All day and night. You can also chat at loveisrespect.org.' },
      { id: 'takeitdown', name: 'Someone threatening you with a picture?', show: 'Go to takeitdown.ncmec.org, or call 1-800-843-5678', tel: '18008435678', url: 'https://takeitdown.ncmec.org', note: 'You are not in trouble. The CyberTipline also takes reports at report.cybertip.org.' },
      { id: 'teenline', name: 'Want to talk to another teen? Teen Line', show: 'Call 800-852-8336, or text TEEN to 839863', tel: '18008528336', sms: '839863', smsBody: 'TEEN', note: 'Evenings: calls 8 p.m. to midnight Central, texts 8 to 11 p.m. Central. Other times, 988 answers.' },
      { id: 'mncrisis', name: 'In Minnesota: your county crisis team', show: 'Call **CRISIS (274747) from a cell phone', note: 'All day and night.' },
      { id: 'dayone', name: 'In Minnesota: Day One', show: 'Call 1-866-223-1111, or text 612-399-9995', tel: '18662231111', sms: '6123999995', note: 'All day and night, for anyone being hurt by someone close to them.' },
      { id: '911', name: 'In danger right now?', show: 'Call 911', tel: '911' }
    ],
    hurt: [
      { id: 'childhelp', name: 'Childhelp', show: 'Call or text 1-800-422-4453', tel: '18004224453', sms: '18004224453', note: 'All day and night, in many languages. They listen, and help you figure out what to do next.' },
      { id: 'dayone', name: 'Day One, in Minnesota', show: 'Call 1-866-223-1111, or text 612-399-9995', tel: '18662231111', sms: '6123999995', note: 'All day and night, for anyone being hurt by someone close to them.' },
      { id: 'loveisrespect', name: 'Love Is Respect', show: 'Call 1-866-331-9474, or text LOVEIS to 22522', tel: '18663319474', sms: '22522', smsBody: 'LOVEIS', url: 'https://www.loveisrespect.org', note: 'All day and night, when it\'s someone you\'re close to or going out with.' },
      { id: '911', name: 'In danger right now?', show: 'Call 911', tel: '911' },
      { id: 'school', name: 'A trusted adult at school', show: 'Tell a school counselor, coach, or teacher', note: 'They know how to help, and they can help you stay safe.' }
    ]
  },
  src: ['asq', 'horowitz12', 'gould05', 'dazzi']
};

// Optional sensitive questions (decision 7). Off unless the teen turns
// them on in settings; only the teen can. Asked on the answer scale
// right after their part. Readiness and pressure wording only, never
// use. Never part of a score, never the alert, never shared or printed
// for a grown-up. on: answers that show the note and lines.
const SENSITIVE = [
  { id: 'cope', part: 'leaves', r: 1,
    t: 'Felt pressure, from people around you or from stress, to vape, drink, or use drugs?',
    tip: 'If yes, stay calm and thank them for telling you. Ask what the pressure is like, without a lecture. Practice a few easy ways out together, and promise a no-questions ride home.',
    why: 'This one is optional, and only you can turn it on. It never counts toward your score, and it\'s never shared. Noticing pressure early makes it easier to plan your way out.',
    on: ['sometimes', 'often', 'always'],
    note: 'Pressure like that is real, and you can handle it. Plan an easy way out, and talk with someone you trust. The SAMHSA National Helpline is there any time, in English and Spanish: 1-800-662-4357.',
    lines: ['988', 'ctl'] },
  { id: 'dating', part: 'branches', r: 1,
    t: 'Felt pressured, checked up on, or controlled by someone you\'re close to or going out with, like them checking your phone or telling you who you can see?',
    tip: 'If yes, thank them for telling you and stay calm. Don\'t criticize the other person; ask how it feels to them. Love Is Respect can help them think it through.',
    why: 'This one is optional, and only you can turn it on. It never counts toward your score, and it\'s never shared. Checking your phone or deciding who you see are signs worth noticing.',
    on: ['sometimes', 'often', 'always'],
    note: 'You deserve to be trusted and respected. Checking your phone, or telling you who you can see, is not okay. You can talk it through any time, privately.',
    lines: ['loveisrespect', 'dayone', '911'] }
];

// Helpers for the app. bandOf('11') gives '11-12'. getBank(band, wording)
// gives { roots: [7 questions], ... } with the band and wording applied.
function bandOf(grade) {
  const g = String(grade || '');
  const b = BANDS.find(x => x[2].indexOf(g) !== -1);
  return b ? b[0] : '9-10';
}
function resolve(q, band, wording) {
  const o = Object.assign({}, q);
  if (q.v && q.v[band]) Object.assign(o, q.v[band]);
  if (wording === 'plain' && q.plain) Object.assign(o, q.plain);
  delete o.v; delete o.plain;
  if (o.src && !o.src.length) delete o.src;
  return o;
}
function bank(band, wording) {
  const out = {};
  Object.keys(Q).forEach(k => { out[k] = Q[k].map(q => resolve(q, band, wording)); });
  return out;
}
function weekly(band, wording) {
  const b = bank(band, wording), out = [];
  PARTS.forEach(p => (WEEKLY[p.key] || []).forEach(i => out.push(Object.assign({ part: p.key, i }, b[p.key][i]))));
  return out;
}
function sensitive() { return SENSITIVE.map(q => Object.assign({}, q)); }

window.PINE_CHECKIN = { version: VERSION, bank: BANK, perPart: PER_PART, answers: ANSWERS, levels: LEVELS, stems: STEMS,
  parts: PARTS, bands: BANDS, grades: GRADES, modes: MODES, questions: Q, weekly: WEEKLY, flags: FLAGS,
  alertKinds: ALERT_KINDS, ALERT_KINDS: ALERT_KINDS, neverAlert: NEVER_ALERT, alertTold: ALERT_TOLD,
  safety: SAFETY, sensitive: SENSITIVE, SENSITIVE: SENSITIVE,
  bandOf: bandOf, resolve: resolve, getBank: bank, weeklyList: weekly, sensitiveList: sensitive };
})();
