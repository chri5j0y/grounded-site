/* =====================================================================
   BIRCH CHECKIN . the question bank
   Read by Birch (/birch/) and, in a later build, Birch Guide in the Field
   Guide, so both always ask the same thing. Edit questions here, not in
   index.html or app.js.

   Birch is the tree for young adults, 18 to 26 (GWG BLD 742). It sits
   between Pine (grades 9 to 12) and Oak (adults, 25 to 60). It follows
   the Grounded tree standard, version 1, the same as Pine, Oak, and
   Sequoia:
   - Six parts in one order: Roots (What grounds you), Trunk (Purpose),
     Bark (Mind and feelings), Branches (Relationships), Leaves (Body),
     Fruit (Hope). Code names match the tree part: roots, trunk, bark,
     branches, leaves, fruit. PARTS holds Birch's own words for each.
   - Eight questions per part, 48 in all, the same count as Oak and
     Sequoia (plan decision 4).
   - Every question has a tip for the person sitting with them (a friend,
     mentor, partner, or Birch Guide, who may read it aloud) and a short
     "why" line the person can tap to read.
   - Oak's four answers plus "Not sure", asked about the past two weeks
     (decision 5). Scores run 1 to 10 for every tool.
   - Two or three reverse worded questions in every part.
   - Levels: Strong (8 to 10), Steady (5 to 7), Growing Edge (1 to 4).
   - A safety step fitted to young adults, always with 988 and 911.
   - Flagged answers (alone, losing hope, someone hurting me) are never
     lost: the person sees help lines right away.

   Leaves holds three strands, Move, Rest, and Nourish. One Leaves question
   for each is tagged s: 'move', 'rest', or 'nourish'. The weekly quick
   check-in asks question 1 of every part plus each tagged strand (WEEKLY):
   Leaves question 1 is the Rest strand, so the quick check-in asks eight.

   Each question: { t, tip, why } plus
     r: 1        a reverse question ("Often" is the hard answer)
     flag        'alone', 'hope', or 'hurt' (see FLAGS)
     s           'move', 'rest', or 'nourish' (Leaves strands)
     src: ['id'] where the "why" line rests on a study or measure
     plain       the Plain wording: any of { t, tip, why, src } that
                 replace the Faith wording when the profile uses Plain.
                 A question with no plain reads the same either way.
     season      My Season notes: season[id] holds { ex, tip } for that
                 season (see MY_SEASON). ex is a short example line shown
                 under the question; tip is added after the shared tip.
                 A season note may hold its own plain: { ex, tip } for
                 Plain wording. Only ex and tip are ever read, so a
                 season never changes the question, the why line, the
                 sources, reverse scoring, flags, or scores.
     help        a quiet note on the results for one answer range, with
                 topic lines: { on, note, lines }. It is not a flag, never
                 sent to anyone, and never shown to a helper.
   Question 1 of every part is the quick check-in question, so it is never
   a reverse question.

   One bank (decision 6). After high school the season of life changes
   more than the age does, so there are no age bands. Every Birch ring
   is scored on the same 48 questions and compares with every other Birch
   ring. Rings from Pine or Oak are kept, labeled From Pine or From Oak,
   and never compared with Birch rings. bandOf() always gives 'birch' so
   apps built from Pine's code keep working.

   MY_SEASON (decision 6): In school or training, Working, Serving,
   Parenting, Between things. The person picks any, or none, in settings.
   A season changes only examples, tips, and suggested guides, never the
   questions or scores.

   getBank(seasons, wording) returns the questions ready to ask: one list
   per part, eight each, with the seasons and wording already applied.
   seasons is a season id, a list of ids, or nothing (any other value,
   such as a band name from Pine's code, is ignored). wording is 'faith'
   (the default) or 'plain'.

   Faith or Plain (decision 7): the person sets it, and Start My Birch
   carries a Pine teen's choice. Every line that names faith (five in
   Roots, one in Branches, and one season example) has a Plain wording;
   the other Roots lines name no faith and read the same either way.
   Plain asks the same thing
   without religious words, so scores never change between the two.
   Roots follows the ADULT faith rules (Oak's and Sequoia's, never the
   kids' rules): ask about experience, never belief or affiliation;
   measure whether the sacred is a resource or a stressor; make room for
   questions and for practices chosen for yourself. Anyone of all faith
   traditions and everything in-between can score Strong.

   Substances (decision 8): using alcohol, cannabis, or other substances
   to cope is in the regular bank (Leaves question 8), asked as coping,
   never amounts. It carries a help note with the SAMHSA line, and it
   raises no flag to anyone. OPTIONAL holds one question, betting and
   gambling: off unless the person turns it on in settings, never scored,
   never shared, never shown to a helper, never printed for anyone else.

   Who sees what (decision 11): Birch has no grown-up alert, and nothing
   is ever sent to anyone. ALERT_KINDS is empty on purpose. Helpers, when
   the person turns them on (Sequoia's model), see only what the person
   shares, and NEVER_SHARE lists what a helper never sees: the safety
   step, every flag and its note, help notes, and the optional question.

   Questions are written fresh. The Mental Health Continuum Short Form,
   the BMMRS, the Brief RCOPE, spiritual struggles themes, the Meaning in
   Life Questionnaire, the Claremont Purpose Scale, PHQ-2, GAD-2, the
   Perceived Stress Scale, the CFPB Financial Well-Being Scale, the
   three-item loneliness scale, AUDIT-C themes, the Adult Hope Scale, and
   the NIMH ASQ are foundations only. None of their items are copied.

   Sources used (ids for gg-sources.js; the lead merges
   p742/out/checkin-sources.json):
     Roots:    koenig, smithsnell, exline, rcope
     Trunk:    damon03, mlq, sumner, bronk18, ryff, arnett
     Bark:     neff, kessler05, gad2, phq2, cfpbfwb, shed24
     Branches: murthy, pewparents, nisvs, mcc21, ucla3
     Leaves:   nsfsleep, pag, noetel, white, mtfpanel24
     Fruit:    snyder, arnett, nsduh24
     Optional: fdupoll
     Safety:   asq, dazzi, nsduh24
   ===================================================================== */
(function(){
const VERSION = 1;   // the Grounded tree standard
const BANK = 1;      // Birch's first question bank
const PER_PART = 8;

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

// Birch's own words for the six parts. line is the one-line meaning;
// plainLine replaces it under Plain wording where it differs.
const PARTS = [
  { key: 'roots', name: 'Roots', sub: 'What grounds you', line: 'Peace, faith, and what you are making your own', plainLine: 'Peace, values, and what you are making your own' },
  { key: 'trunk', name: 'Trunk', sub: 'Purpose', line: 'What matters to you and where you are headed' },
  { key: 'bark', name: 'Bark', sub: 'Mind and feelings', line: 'Handling stress, setbacks, and everything adult life asks' },
  { key: 'branches', name: 'Branches', sub: 'Relationships', line: 'Friends, family, and the people in your corner' },
  { key: 'leaves', name: 'Leaves', sub: 'Body', line: 'Move, Rest, and Nourish' },
  { key: 'fruit', name: 'Fruit', sub: 'Hope', line: 'What you look forward to and believe is possible' }
];

// One bank. bandOf() and BANDS stay for apps built from Pine's code.
const BAND = 'birch';
const BANDS = [[BAND, 'Birch, 18 to 26', []]];

// My Season (decision 6). Pick any, or none. id, name (Title Case, as
// shown in settings), line (what it covers), lines (topic help lines
// that fit, from SAFETY.lines.topic), guides (suggested guides; Birch's
// When Life Changes guides arrive in Birch 2, so these stay empty now).
const MY_SEASON = [
  { id: 'school', name: 'In School or Training', line: 'College, a trade program, an apprenticeship, classes, or training of any kind', lines: ['nami'], guides: [] },
  { id: 'work', name: 'Working', line: 'A job, more than one job, shift work, or building something of your own', lines: [], guides: [] },
  { id: 'serve', name: 'Serving', line: 'The military, the Guard or Reserve, AmeriCorps, or a service year', lines: ['veterans', 'milonesource'], guides: [] },
  { id: 'parent', name: 'Parenting', line: 'Raising a child, expecting one, or helping raise one', lines: ['tlcmama'], guides: [] },
  { id: 'between', name: 'Between Things', line: 'Looking for work, taking time, helping family, healing, or figuring out what\'s next', lines: ['mn211'], guides: [] }
];
const SEASON_IDS = MY_SEASON.map(x => x.id);

// Check-in modes. In 'trust', the tip shows as a conversation prompt
// after each answer, for a friend, mentor, partner, or Birch Guide the
// person chose.
const MODES = [
  ['self', 'On my own'],
  ['trust', 'With someone I trust']
];

const Q = {
  roots: [
    { t: 'Felt peace deep down, even when life felt unsettled?',
      tip: 'Ask where those moments of peace come from, and what helps them get back there. Share where you find peace, if they want to hear it.',
      why: 'Peace deep down helps you stay steady while so much around you is changing.' },
    { t: 'Felt connected to God, the Sacred, or something larger than yourself, in your own way?',
      tip: 'Let them name it in their own words, and use their word for the sacred, not yours. Never push.',
      why: 'For many adults, a felt connection with the sacred goes with more hope and lighter moods.',
      src: ['koenig'],
      plain: { t: 'Felt connected to something bigger than yourself, like nature, music, a cause, or the people you love?',
        tip: 'Let them name it in their own words. Ask where they feel most part of something bigger.',
        why: 'Feeling part of something bigger can steady you and make hard things feel less lonely.',
        src: [] } },
    { t: 'Kept a practice you chose for yourself that steadies you, like prayer, worship, scripture, meditation, or quiet time outside?',
      tip: 'Ask what they practice now, and how it compares with what they grew up with. A practice they chose for themselves counts fully, even if it looks new.',
      why: 'After high school, many people test the practices they grew up with and choose their own. The ones you choose tend to stick.',
      src: ['smithsnell'],
      season: { parent: { tip: 'With a child, even two quiet minutes count. Ask what fits around naps and bedtimes.' },
        work: { tip: 'Ask what fits a work schedule: a few minutes before a shift, or on the drive home.' } },
      plain: { t: 'Kept a habit of quiet or reflection you chose for yourself, like journaling, meditation, music, or time outside?',
        tip: 'Ask what they do now to slow down and think. A habit they chose for themselves counts fully, even if it looks new.',
        why: 'After high school, many people choose their own habits for the first time. The ones you choose tend to stick.',
        src: [] } },
    { t: 'Had people to share faith or meaning with, or known where you might find them?',
      tip: 'Ask where they have felt most at home with others around faith or meaning. If they are looking, help them name one place to visit.',
      why: 'Sharing what matters most with other people makes it easier to hold onto, especially after a move or a change.',
      season: { school: { ex: 'Like a campus group, a congregation near school, or friends who talk about big things.',
          plain: { ex: 'Like a campus group, a club, or friends who talk about big things.' } },
        serve: { ex: 'Like a chaplain, a group on base, or people you serve with.',
          plain: { ex: 'Like a group on base, or people you serve with.' } } },
      plain: { t: 'Had people who share your deepest values, or known where you might find them?',
        tip: 'Ask where they have felt most at home with people who value what they value. If they are looking, help them name one place to try.',
        why: 'Sharing what matters most with other people makes it easier to hold onto, especially after a move or a change.' } },
    { t: 'Felt welcome to bring your honest questions and doubts about faith?',
      tip: 'Doubt is common in these years and is part of making faith your own. Listen without fixing, and don\'t rush to answers.',
      why: 'Many people rework their faith in their late teens and twenties. Honest questions are part of that, not a problem.',
      src: ['smithsnell'],
      plain: { t: 'Felt welcome to bring your honest questions about life\'s big questions, like why things happen or what matters most?',
        tip: 'Big questions are common in these years. Listen without fixing, and don\'t rush to answers.',
        why: 'Big questions are part of building a life of your own. Room to ask them helps you find your own answers.',
        src: [] } },
    { t: 'Felt grateful for something, even in a hard season?',
      tip: 'Ask for one good thing from the past two weeks, and let them linger on it.',
      why: 'Gratitude helps you notice what is still holding you up, even when much is unsettled.' },
    { t: 'Felt ashamed, afraid, or pushed out because of faith, a faith community, or people of faith?', r: 1,
      tip: 'Listen first. Don\'t defend or correct. Ask what happened. Faith that wounds is worth taking seriously, and if a person or group is still causing harm, help them get safe.',
      why: 'Faith can be a resource or a weight. Hurt connected to faith weighs on people, and naming it is a first step.',
      src: ['exline', 'rcope'],
      plain: { t: 'Felt ashamed or afraid because of beliefs or a community you grew up with?',
        tip: 'Listen first. Don\'t defend or correct. Ask what happened. If a person or group is still causing harm, help them get safe.',
        why: 'Beliefs or a community that leave you ashamed or afraid can weigh on everything. Naming it is a first step.',
        src: [] } },
    { t: 'Felt empty inside, like something is missing?', r: 1,
      tip: 'Listen without fixing, and thank them for telling you. If it lasts two weeks or more, help them talk with a doctor or counselor.',
      why: 'Feeling empty is worth noticing. It can mean part of you needs some tending.' }
  ],
  trunk: [
    { t: 'Known what matters most to you?',
      tip: 'Ask them to name one or two things. Tell them where you see those things in how they live.',
      why: 'Knowing what matters most to you gives every other choice something to stand on.' },
    { t: 'Had a direction you\'re working toward, and known your next step?',
      tip: 'Ask with curiosity, not advice. School, a trade, work, service, family, and time to figure things out are all real paths. Help them name one next step and when they\'ll take it.',
      why: 'Purpose keeps growing through your twenties. Searching for it is normal and never counts against you; a next step is enough.',
      src: ['damon03', 'mlq'],
      season: { school: { ex: 'Like finishing a class, a certificate, or a degree.' },
        work: { ex: 'Like learning a skill, earning a raise, or finding work that fits you better.' },
        serve: { ex: 'Like a new qualification, the next rank, or a plan for after your service.' },
        parent: { ex: 'Like a plan for your family, or one goal of your own.' },
        between: { ex: 'Like an application, a call, or one thing to try this month.', tip: 'Between things is a real season. Help them pick one small step, not a whole plan.' } } },
    { t: 'Felt that what you do most days is worth doing, or is taking you somewhere?',
      tip: 'Ask which part of their days feels most worth it, and which part feels empty. A job that pays the bills counts as taking them somewhere.',
      why: 'Purpose doesn\'t depend on a degree. People on every path find it, in different places.',
      src: ['sumner'],
      season: { work: { tip: 'If work feels empty right now, ask where else in the week they find meaning.' },
        parent: { tip: 'Raising a child is real, worthy work. Name it back to them.' } } },
    { t: 'Used your strengths, at work, at school, at home, or for someone else?',
      tip: 'Name a strength you see in them, and when you last saw it.',
      why: 'Using your strengths builds confidence and shows you what you have to give.' },
    { t: 'Done something that helps others, beyond yourself?',
      tip: 'Ask when helping felt good. Look together for one place to do more of it.',
      why: 'Purpose that reaches beyond yourself tends to last, and it makes ordinary days feel worth more.',
      src: ['bronk18'] },
    { t: 'Made your own decisions, and lived by your own values?',
      tip: 'Ask about a choice they made for themselves lately. Respect it, even if you would have chosen differently.',
      why: 'Choosing for yourself, by what you value, is a core part of well-being in adult life.',
      src: ['ryff'] },
    { t: 'Lived mostly by what other people expect of you?', r: 1,
      tip: 'Ask what they would choose if it were fully up to them. Listen before you advise.',
      why: 'Living only by what others expect can leave you feeling empty. Your own values matter too.' },
    { t: 'Felt stuck, or behind compared with people your age?', r: 1,
      tip: 'Everyone\'s timeline is different. Don\'t argue with the feeling; ask what one next step would look like.',
      why: 'These years are full of trying, moving, and starting over. There is no one schedule for building a life.',
      src: ['arnett'] }
  ],
  bark: [
    { t: 'Noticed stress building and done something that helps?',
      tip: 'Ask how they know stress is building, and what helps most. Offer to try a new one together, like a walk or slow breathing.',
      why: 'Noticing stress early lets you do something about it before it piles up.' },
    { t: 'Felt calm inside?',
      tip: 'Ask when they feel most settled, and what helps them get back there.',
      why: 'A calm mind gives you room to think clearly and choose what to do next.' },
    { t: 'Learned from a mistake or a setback without being harsh with yourself?',
      tip: 'Share a setback of your own and what you learned. Ask what they would say to a friend in the same spot.',
      why: 'Being kind to yourself after a setback eases stress and helps you try again. It is a skill you can learn.',
      src: ['neff'] },
    { t: 'Reached out for help when things were hard?',
      tip: 'Tell them about a time you asked for help. Make it normal, never a weakness. A doctor, a counselor, or a trusted friend are all good places to start.',
      why: 'Most mental health conditions that people ever have begin by the mid twenties, and help early changes the course. Asking is a strength.',
      src: ['kessler05'],
      season: { school: { tip: 'Most colleges and training programs have counseling for students. Ask if they know where it is.' },
        work: { tip: 'Some employers offer a few private counseling sessions through an assistance program. Ask if theirs does.' },
        serve: { tip: 'Military OneSource (800-342-9647) offers private counseling referrals any time.' },
        parent: { tip: 'New parents can call or text the National Maternal Mental Health Hotline any time: 1-833-852-6262.' } } },
    { t: 'Felt able to handle what adult life asks of you, like bills, appointments, and everyday decisions?',
      tip: 'Ask which adult task feels hardest right now. Offer to sit with them while they do one, or show them how you do it.',
      why: 'Many of these tasks are new in these years. Feeling up to them grows one task at a time.' },
    { t: 'Had worry or nervousness that was hard to switch off?', r: 1,
      tip: 'Ask what they worry about most. Listen first. If it lasts more than a couple of weeks or gets in the way of sleep, work, or school, help them talk with a doctor or counselor.',
      why: 'Worry that won\'t switch off is common, and doctors ask about it because help works.',
      src: ['gad2'] },
    { t: 'Felt down, numb, or not interested in things you used to enjoy?', r: 1,
      tip: 'Listen without fixing. If it lasts two weeks or more, help them talk with a doctor or counselor. Listen for hopelessness.',
      why: 'Low moods are common in these years, and they respond to help. A low mood that lasts two weeks is worth telling a doctor or counselor.',
      src: ['phq2'] },
    { t: 'Had money worries crowd your thinking or keep you up at night?', r: 1,
      tip: 'Ask about the worry, never the amounts. Help them pick one small step, like looking at one bill or one account together.',
      why: 'Money stress is mind stress. Many adults your age are still building a cushion, and small steady steps help.',
      src: ['cfpbfwb', 'shed24'],
      season: { school: { tip: 'The Federal Student Aid Information Center (1-800-433-3243) answers questions about aid and loans on weekdays.' },
        between: { tip: 'Minnesota 211 (dial 211) can point to help with rent, food, and bills.' } },
      help: { on: ['often', 'always'],
        note: 'Money worries are heavy, and help is out there. In Minnesota, dial 211 any time for help with housing, food, and bills.',
        lines: ['mn211'] } }
  ],
  branches: [
    { t: 'Had people who have your back, that you could call at any hour?',
      tip: 'Ask who those people are and how they show it. If no one comes to mind, think together about who has shown up before.',
      why: 'People who have your back make hard things easier to face.' },
    { t: 'Made new friends, or stayed close to old ones?',
      tip: 'Ask who they have stayed close to and who they would like to see more. One message or plan this week counts.',
      why: 'After school, friendships take more intention. The ones you tend now can last for decades.' },
    { t: 'Felt like you belong somewhere, like a team, a class, a crew at work, a unit, a group, or a faith community?',
      tip: 'Ask where they feel most at home. If nowhere comes to mind, help them pick one place to try three times.',
      why: 'Belonging protects. Leaving school ends many built-in places to belong, so finding one on purpose matters.',
      src: ['murthy'],
      season: { school: { ex: 'Like a class, a club, a team, or a study group.' },
        work: { ex: 'Like a crew at work, a team, or people you see every week.' },
        serve: { ex: 'Like your unit, your team, or a group near where you are stationed.' },
        parent: { ex: 'Like a parents\' group, a library story time, or neighbors with kids.' } },
      plain: { t: 'Felt like you belong somewhere, like a team, a class, a crew at work, a unit, or a group?' } },
    { t: 'Felt close to someone in your family, even as your relationship changes?',
      tip: 'Ask who in their family they feel closest to now. Closeness can look new at this age. If family isn\'t safe or close, the people they choose as family count fully.',
      why: 'Most young adults get along well with their parents, and the relationship keeps changing in these years. Closeness can take a new shape.',
      src: ['pewparents'] },
    { t: 'If you\'re dating or married, felt safe, respected, and able to be yourself?',
      tip: 'If they aren\'t dating, "Not sure" is fine. Keep the door open without prying. Love Is Respect (call 1-866-331-9474, or text LOVEIS to 22522) helps people think it through.',
      why: 'Many people who are ever hurt by a partner are first hurt before 25. Respect and safety are what every relationship deserves.',
      src: ['nisvs'] },
    { t: 'Had at least one person you can be fully yourself with?',
      tip: 'Ask who it is. If no one comes to mind, gently note that, and come back to it in the growth plan.',
      why: 'One person who knows the real you can carry you through a great deal.' },
    { t: 'Felt lonely, even with people around?', r: 1, flag: 'alone',
      tip: 'Plan some time together this week. Ask when it feels that way most, and listen without fixing.',
      why: 'Loneliness peaks in the young adult years. It\'s common, it\'s worth naming, and it can change.',
      src: ['mcc21', 'ucla3'] },
    { t: 'Had someone close to you control, threaten, or hurt you, in person or online?', r: 1, flag: 'hurt',
      tip: 'Listen first and thank them for telling you. Ask privately whether they are safe right now. Love Is Respect, the National Domestic Violence Hotline, and Day One can help them think it through.',
      why: 'No one has the right to control, threaten, or hurt you. Help is there any time, and you are not in trouble for telling.',
      src: ['nisvs'] }
  ],
  leaves: [
    { t: 'Gotten enough sleep to wake up feeling rested?', s: 'rest',
      tip: 'Adults 18 to 25 need about 7 to 9 hours. Shifts, classes, babies, and phones all cut into it, so look for one small change, never blame.',
      why: 'Adults your age need about 7 to 9 hours of sleep. Sleep is where mood and focus recharge.',
      src: ['nsfsleep'],
      season: { work: { tip: 'For shift work, a dark, quiet room and a set sleep window after nights help.' },
        serve: { tip: 'Sleep on a mission or a duty schedule is hard to control. Ask what helps when they can rest.' },
        parent: { tip: 'With a baby, sleep comes in pieces. Ask who could take one feeding or one morning so they can rest.' } } },
    { t: 'Moved your body in a way you enjoy, like walking, lifting, running, a class, or a pickup game?', s: 'move',
      tip: 'Every kind counts, including seated and adapted movement. Ask what is most fun, and make room for it. Rest when hurt.',
      why: 'Moving helps your mood, not just your body. Exercise eases low moods in adults.',
      src: ['pag', 'noetel'],
      season: { parent: { ex: 'A walk with the stroller counts.' },
        work: { ex: 'A walk on a break, or biking to work, counts.' } } },
    { t: 'Eaten regular meals, without guilt or strict rules?', s: 'nourish',
      tip: 'Keep it about energy, never weight or looks. If food starts to feel like rules they can\'t break, the ANAD helpline (1-888-375-7767) and their doctor can help.',
      why: 'Regular meals keep your energy, mood, and focus steady through the day.',
      season: { work: { tip: 'Long or late shifts make meals easy to skip. Ask what they could pack or keep on hand.' },
        school: { tip: 'Classes and work together make meals easy to skip. Ask what is easy to grab.' } } },
    { t: 'Spent time outside in daylight?',
      tip: 'A walk, a porch, or lunch outside all count. Ask what gets in the way.',
      why: 'Regular time in nature is linked with better health and well-being.',
      src: ['white'] },
    { t: 'Known where you would go for a doctor, a prescription, or help with your mind?',
      tip: 'Ask if they have a clinic, a pharmacy, and a number to call after hours. Offer to help them find one and save it in their phone.',
      why: 'Many people pick a doctor and a pharmacy on their own for the first time in these years. Knowing where to go makes it easier to get help early.' },
    { t: 'Stayed up late on your phone or other screens?', r: 1,
      tip: 'Ask how they feel after a long late scroll. Charging the phone away from the bed helps a lot.',
      why: 'Late-night screens can steal the sleep your body and mind need.' },
    { t: 'Felt tired or run down, even after sleeping?', r: 1,
      tip: 'Look at sleep hours, late screens, and work or school schedules. If it keeps up, or they snore loudly, mention it to a doctor.',
      why: 'Feeling run down is worth noticing. It can come from short sleep, stress, or something a doctor can help with.' },
    { t: 'Used alcohol, cannabis, or other substances to get through hard feelings or stress?', r: 1,
      tip: 'Ask without judgment and without asking amounts. Ask what the hard feelings are, and what else helps. The SAMHSA National Helpline (1-800-662-4357) is open all day and night.',
      why: 'Using to cope helps for a night, then can add its own weight. Cannabis use among adults your age is at record highs, and it is worth noticing why you reach for it.',
      src: ['mtfpanel24'],
      help: { on: ['sometimes', 'often', 'always'],
        note: 'Reaching for alcohol, cannabis, or other substances to get through hard feelings is common, and it can quietly add weight. Talking it over helps. The SAMHSA National Helpline is private and open all day and night, in English and Spanish.',
        lines: ['samhsa', '988'] } }
  ],
  fruit: [
    { t: 'Looked forward to something, soon or someday?',
      tip: 'A trip, a friend, a season, or a plan all count. If nothing comes to mind, plan one small good thing together.',
      why: 'Something to look forward to gives each week a little more light.' },
    { t: 'Believed your life can turn out good, even if it\'s hard right now?',
      tip: 'Share a time you got through something hard. Don\'t argue with the feeling; add your own belief in them.',
      why: 'Many people your age are hopeful even when life is unsettled. That hope helps you keep going.',
      src: ['arnett'] },
    { t: 'Found a way forward when something got in the way?',
      tip: 'Ask about a time they found another way. Name that strength back to them.',
      why: 'Hope is more than a feeling. It is seeing a way forward and believing you can take it.',
      src: ['snyder'] },
    { t: 'Had people who believe in your future?',
      tip: 'Tell them, plainly, that you believe in their future, whatever path they choose.',
      why: 'People who believe in your future help you believe in it too.' },
    { t: 'Noticed progress you\'ve made, even small?',
      tip: 'Name one way they have grown this year. Small steps count.',
      why: 'Noticing your own progress builds hope, especially on days when you feel behind.' },
    { t: 'Done kind things for others, even when no one was watching?',
      tip: 'Notice and name the kind things they do. Do one together this month.',
      why: 'Kindness lifts the giver too, and it grows hope in you and in others.' },
    { t: 'Felt like there\'s no point in trying anymore?', r: 1, flag: 'hope',
      tip: 'Take this seriously and keep talking. Ask gently how long it has felt this way. If they talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency. The safety step comes next.',
      why: 'Many people your age go through stretches of feeling hopeless. You don\'t have to carry it alone, and it can get better with help.',
      src: ['nsduh24'] },
    { t: 'Felt like everyone else is ahead of you?', r: 1,
      tip: 'Ask who they compare themselves with, and where. Help them name one thing they are proud of that no one else sees.',
      why: 'Comparing your life to others, especially online, can weigh on hope. Your path is your own.' }
  ]
};

// The weekly quick check-in: question 1 of every part (Leaves question 1
// is Rest), plus the Move and Nourish strands. Eight questions, all
// worded so "Almost always" is the good answer, so week to week
// comparisons read the right way. Indexes are within each part.
const WEEKLY = { roots: [0], trunk: [0], bark: [0], branches: [0], leaves: [0, 1, 2], fruit: [0] };

// What a flagged answer means, and which answers flag it.
// alone and hope flag on Often or Almost always; Almost always also opens the calm card.
// hurt flags on Sometimes, Often, or Almost always (Branches question 8),
// and also comes from the safety step's first question (from: 'safety');
// Often or Almost always opens the calm card with the hurt lines.
// alert is false for every flag: Birch never alerts anyone.
// lines names the help lines (ids in SAFETY.lines) to show with the note.
// Flags and their notes are never shown to a helper (NEVER_SHARE).
const FLAGS = {
  alone: { on: ['often', 'always'], calm: ['always'], alert: false, title: 'Feeling alone',
    note: 'You said you\'ve felt lonely often. That\'s worth tending, and lots of people your age feel it too. Reaching out to one person this week can help: a friend, someone in your family, a coworker, or a group you could try. If it feels heavy, call or text 988 any time.',
    lines: ['988', 'ctl'],
    guide: 'They named loneliness. Talk together about one person they could reach toward, and one group, class, or team to try. Listen for hopelessness.' },
  hope: { on: ['often', 'always'], calm: ['always'], alert: false, title: 'Losing hope',
    note: 'You said it\'s felt like there\'s no point in trying. You don\'t have to carry that alone, and it can get better with help. Call or text 988, or text HOME to 741741, any time, day or night. Veterans and service members, call 988 and press 1.',
    lines: ['988', 'veterans', 'ctl', '911'],
    guide: 'They named low hope. Make sure the safety step was asked. Share 988, and follow your protocol if they speak of not wanting to be alive.' },
  hurt: { on: ['sometimes', 'often', 'always'], calm: ['often', 'always'], from: 'safety', alert: false, title: 'Someone hurting me',
    note: 'Thank you for telling me. No one has the right to control, threaten, or hurt you, at home, at work, online, or in a relationship. These people can help any time, and you can talk it through privately.',
    lines: ['loveisrespect', 'thehotline', 'dayone', 'rainn', 'stopncii', '911'],
    guide: 'They said someone close is controlling, threatening, or hurting them. Ask privately whether they are safe right now. Share Love Is Respect, the National Domestic Violence Hotline, or Day One. If they are a vulnerable adult, follow your reporting duties (MAARC, 1-844-880-1574).' }
};

// No alert to anyone (decision 11). Empty on purpose, so apps built from
// Pine's code send nothing. NEVER_ALERT keeps Pine's shape for those apps.
const ALERT_KINDS = [];
const NEVER_ALERT = ['safety', 'alone', 'hope', 'hurt', 'betting'];
// What a helper never sees, even when the person shares their check-in:
// the safety step, every flag and its note, help notes on questions, and
// the optional question.
const NEVER_SHARE = ['safety', 'flags', 'help', 'optional'];

// The safety step, fitted to young adults: Pine's two questions in adult
// words, with Oak's hopelessness and burden themes in the lead, "I'd
// rather not say", and the 'now' follow-up. Shaped by the NIMH ASQ's
// direct approach (never its items). Direct wording is the
// research-informed way to ask, and asking does not plant the idea.
// questions: [text, kind]. kind 'safe' is someone hurting me (the hurt
// flag); kind 'self' is thoughts of suicide. now is asked only after a
// yes or not sure to the self question; a yes to it opens the calm card
// with 988 and 911 at the top. Nothing here is ever sent to anyone or
// shown to a helper.
const SAFETY = {
  intro: 'These years can bring some heavy stretches. These two questions help make sure you\'re okay. There\'s no wrong answer, and you can skip.',
  questions: [
    ['Is anyone hurting you, threatening you, or making you feel unsafe, at home, at work, online, or in a relationship?', 'safe'],
    ['In the past two weeks, have you had thoughts of ending your life, or of not wanting to be alive?', 'self']
  ],
  selfLead: 'Sometimes, when life gets heavy, people feel hopeless or like a burden, and think about not wanting to be alive. Lots of people your age have had that thought, and it\'s safe to say so here.',
  now: 'Right now, today, are those thoughts with you?',
  answers: [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure'], ['skip', 'I\'d rather not say']],
  // Which answers count. 'skip' is respected and never counts as a yes.
  on: { safe: ['yes', 'unsure'], self: ['yes', 'unsure'], now: ['yes', 'unsure'] },
  kinds: { safe: 'hurt', self: 'safety' },
  yes: 'Thank you for telling me. You matter, and this can get better with help. Please reach out now. Someone will listen, any time.',
  means: 'If there are guns or a lot of medicine where you live, ask someone you trust to hold them for now.',
  burden: 'You matter to people, even when it is hard to see. Feeling like a burden is a sign to reach out, not a fact about you.',
  title: 'You matter, and you don\'t have to carry this alone.',
  calmIntro: 'These people want to help, any time. You can also tell someone you trust, like a friend, someone in your family, a doctor, or a counselor.',
  hurtTitle: 'No one has the right to hurt you.',
  hurtIntro: 'These people can help any time, and you can talk it through privately. You are not in trouble for telling.',
  // Help lines in the order shown, numbers only from docs/birch-research.md
  // section 4. tel and sms are dialable; smsBody is the word to text.
  // calm is the calm card; hurt is shown when someone is hurting the
  // person; topic lines appear on results, help notes, the optional
  // question, and My Season where they fit. Apps look a line up by id in
  // calm, then hurt, then topic (lineById below).
  lines: {
    calm: [
      { id: '988', name: '988 Suicide and Crisis Lifeline', show: 'Call or text 988', tel: '988', sms: '988', url: 'https://988lifeline.org/chat/', note: 'Private, all day and night. You can also chat at 988lifeline.org.' },
      { id: 'veterans', name: 'Veterans, service members, and their families', show: 'Call 988, then press 1', tel: '988', sms: '838255', note: 'Or text 838255. All day and night, for the Guard and Reserve too.' },
      { id: 'ctl', name: 'Crisis Text Line', show: 'Text HOME to 741741', sms: '741741', smsBody: 'HOME', note: 'All day and night. In Minnesota, you can text MN to 741741.' },
      { id: 'loveisrespect', name: 'Someone you\'re dating or with? Love Is Respect', show: 'Call 1-866-331-9474, or text LOVEIS to 22522', tel: '18663319474', sms: '22522', smsBody: 'LOVEIS', url: 'https://www.loveisrespect.org', note: 'All day and night, for people 13 to 26. You can also chat at loveisrespect.org.' },
      { id: 'stopncii', name: 'Someone threatening you with an intimate image?', show: 'Go to stopncii.org', url: 'https://stopncii.org', note: 'For adults 18 and up. It makes a digital fingerprint on your own device so partner sites can block the image. The image stays with you.' },
      { id: 'mncrisis', name: 'In Minnesota: your county crisis team', show: 'Call **CRISIS (274747) from a cell phone', note: 'All day and night.' },
      { id: 'dayone', name: 'In Minnesota: Day One', show: 'Call 1-866-223-1111, or text 612-399-9995', tel: '18662231111', sms: '6123999995', note: 'All day and night, for anyone being hurt by someone close to them.' },
      { id: '911', name: 'In danger right now?', show: 'Call 911', tel: '911' }
    ],
    hurt: [
      { id: 'loveisrespect', name: 'Love Is Respect', show: 'Call 1-866-331-9474, or text LOVEIS to 22522', tel: '18663319474', sms: '22522', smsBody: 'LOVEIS', url: 'https://www.loveisrespect.org', note: 'All day and night, for people 13 to 26, when it\'s someone you\'re dating or with.' },
      { id: 'thehotline', name: 'National Domestic Violence Hotline', show: 'Call 1-800-799-7233, or text START to 88788', tel: '18007997233', sms: '88788', smsBody: 'START', url: 'https://www.thehotline.org', note: 'All day and night. You can also chat at thehotline.org.' },
      { id: 'dayone', name: 'Day One, in Minnesota', show: 'Call 1-866-223-1111, or text 612-399-9995', tel: '18662231111', sms: '6123999995', note: 'All day and night, for anyone being hurt by someone close to them.' },
      { id: 'rainn', name: 'National Sexual Assault Hotline (RAINN)', show: 'Call 1-800-656-4673, or text HOPE to 64673', tel: '18006564673', sms: '64673', smsBody: 'HOPE', url: 'https://rainn.org', note: 'All day and night.' },
      { id: 'stopncii', name: 'Someone sharing or threatening to share an intimate image?', show: 'Go to stopncii.org', url: 'https://stopncii.org', note: 'For adults 18 and up. The image stays on your own device. If it was taken before you were 18, use takeitdown.ncmec.org.' },
      { id: '911', name: 'In danger right now?', show: 'Call 911', tel: '911' }
    ],
    topic: [
      { id: 'samhsa', name: 'SAMHSA National Helpline', show: 'Call 1-800-662-4357', tel: '18006624357', note: 'All day and night, in English and Spanish. Private help finding support for substance use or mental health.' },
      { id: 'nami', name: 'NAMI HelpLine', show: 'Call 1-800-950-6264, or text NAMI to 62640', tel: '18009506264', sms: '62640', smsBody: 'NAMI', note: 'Weekdays. Information and support, not a crisis line; for a crisis, call or text 988.' },
      { id: 'tlcmama', name: 'National Maternal Mental Health Hotline', show: 'Call or text 1-833-852-6262', tel: '18338526262', sms: '18338526262', note: 'All day and night, in English and Spanish, for parents during pregnancy and after a baby comes.' },
      { id: 'anad', name: 'ANAD Eating Disorders Helpline', show: 'Call 1-888-375-7767', tel: '18883757767', note: 'Weekdays.' },
      { id: 'mngambling', name: 'Minnesota Problem Gambling Helpline', show: 'Call 1-800-333-4673, or text HOPE to 53342', tel: '18003334673', sms: '53342', smsBody: 'HOPE', note: 'All day and night.' },
      { id: 'ncpg', name: 'National Problem Gambling Helpline', show: 'Call 1-800-MY-RESET (1-800-697-3738)', tel: '18006973738', note: 'All day and night. You can also text 800GAM.' },
      { id: 'mn211', name: 'Minnesota 211', show: 'Dial 211, or call 1-800-543-7709', tel: '211', sms: '898211', note: 'All day and night, for help with housing, food, bills, and more. You can also text your ZIP code to 898-211.' },
      { id: 'milonesource', name: 'Military OneSource', show: 'Call 800-342-9647', tel: '8003429647', note: 'All day and night, for service members and their families.' },
      { id: 'takeitdown', name: 'An image taken before you were 18?', show: 'Go to takeitdown.ncmec.org', url: 'https://takeitdown.ncmec.org', note: 'You are not in trouble.' },
      { id: 'poison', name: 'Poison Help', show: 'Call 1-800-222-1222', tel: '18002221222', note: 'All day and night.' }
    ]
  },
  src: ['asq', 'dazzi', 'nsduh24']
};

// Optional question (decision 8). Off unless the person turns it on in
// settings; only they can. Asked on the answer scale right after its
// part. Never part of a score, never shared, never shown to a helper,
// never printed for anyone else. on: answers that show the note and lines.
const OPTIONAL = [
  { id: 'betting', part: 'leaves', r: 1, off: true,
    name: 'Betting and Gambling',
    t: 'Bet or gambled more than you meant to, on sports, online games, or anything else for money?',
    tip: 'If yes, stay calm and thank them for telling you. Ask what it\'s like, without a lecture. Chasing losses and hiding it are signs worth noticing. Help is private and works.',
    why: 'This one is optional, and only you can turn it on. It never counts toward your score, and it\'s never shared. Online betting has grown fast among young adults, and noticing early makes it easier to stay in charge.',
    src: ['fdupoll'],
    on: ['sometimes', 'often', 'always'],
    note: 'Betting that gets ahead of you is common, and help works. You can talk it through privately, any time, day or night.',
    lines: ['mngambling', 'ncpg', '988'] }
];

// Helpers for the app.
function bandOf() { return BAND; }
function seasonList(seasons) {
  const list = Array.isArray(seasons) ? seasons : (seasons ? [seasons] : []);
  return list.filter(id => SEASON_IDS.indexOf(id) !== -1);
}
// resolve(q, seasons, wording): one question ready to ask. Season notes
// add only ex (a list of example lines) and tip text; plain replaces the
// Faith wording last.
function resolve(q, seasons, wording) {
  const o = Object.assign({}, q);
  const ex = [], tips = [];
  seasonList(seasons).forEach(id => {
    let n = q.season && q.season[id];
    if (!n) return;
    if (wording === 'plain' && n.plain) n = Object.assign({}, n, n.plain);
    if (n.ex) ex.push(n.ex);
    if (n.tip) tips.push(n.tip);
  });
  if (wording === 'plain' && q.plain) Object.assign(o, q.plain);
  if (ex.length) o.ex = ex;
  if (tips.length) o.tip = [o.tip].concat(tips).join(' ');
  delete o.season; delete o.plain;
  if (o.src && !o.src.length) delete o.src;
  return o;
}
// getBank(seasons, wording) gives { roots: [8 questions], ... }.
function bank(seasons, wording) {
  const out = {};
  Object.keys(Q).forEach(k => { out[k] = Q[k].map(q => resolve(q, seasons, wording)); });
  return out;
}
function weekly(seasons, wording) {
  const b = bank(seasons, wording), out = [];
  PARTS.forEach(p => (WEEKLY[p.key] || []).forEach(i => out.push(Object.assign({ part: p.key, i }, b[p.key][i]))));
  return out;
}
function optional() { return OPTIONAL.map(q => Object.assign({}, q)); }
function lineById(id) {
  const L = SAFETY.lines;
  return L.calm.find(x => x.id === id) || L.hurt.find(x => x.id === id) || L.topic.find(x => x.id === id) || null;
}
function seasonLines(seasons) {
  const ids = [];
  seasonList(seasons).forEach(id => (MY_SEASON.find(x => x.id === id).lines || []).forEach(l => { if (ids.indexOf(l) === -1) ids.push(l); }));
  return ids.map(lineById).filter(Boolean);
}

window.BIRCH_CHECKIN = { version: VERSION, bank: BANK, perPart: PER_PART, answers: ANSWERS, levels: LEVELS, stems: STEMS,
  parts: PARTS, band: BAND, bands: BANDS, mySeason: MY_SEASON, MY_SEASON: MY_SEASON, modes: MODES, questions: Q, weekly: WEEKLY, flags: FLAGS,
  alertKinds: ALERT_KINDS, ALERT_KINDS: ALERT_KINDS, neverAlert: NEVER_ALERT, neverShare: NEVER_SHARE, NEVER_SHARE: NEVER_SHARE,
  safety: SAFETY, optional: OPTIONAL, OPTIONAL: OPTIONAL, sensitive: OPTIONAL, SENSITIVE: OPTIONAL,
  bandOf: bandOf, resolve: resolve, getBank: bank, weeklyList: weekly, optionalList: optional, sensitiveList: optional,
  lineById: lineById, seasonLines: seasonLines };
})();
/* LIFE notes start: Health and Ability notes (GWG BLD 756, HA 1). Like My Season, a note adds only
   ex (an example) and tip, read for the chosen ids. The question, the answers, and the score never change,
   and no safety or flagged question carries a note. Generated by worker A. */
(function () { var C = window.BIRCH_CHECKIN; if (!C || !C.questions) return; var N = {"leaves": {"0": {"pain": {"ex": "If pain or treatment breaks up your nights, count rest that leaves you a little restored."}, "serious": {"ex": "If pain or treatment breaks up your nights, count rest that leaves you a little restored."}, "mind": {"ex": "Mood and some medicines can change sleep. Notice what helps you rest."}}, "1": {"moving": {"ex": "Any way your body moves counts: rolling, stretching, chair exercises, swimming, or adapted sports.", "tip": "Ask what kind of movement feels good in their body, not what it should look like."}, "pain": {"ex": "On a hard day, a gentle stretch or a few minutes of movement counts.", "tip": "Ask what movement looks like on good days and on hard days."}, "health": {"ex": "Movement that fits your body and your doctor's advice counts fully."}}, "3": {"moving": {"ex": "Sitting by a bright window, on a balcony, or on a porch counts."}}, "4": {"health": {"ex": "Like knowing your specialist, your pharmacy, and who to call after hours.", "tip": "Ask who is on their care team now, and what changes at 26."}, "serious": {"ex": "Like knowing your care team, your pharmacy, and who to call after hours."}, "mind": {"ex": "Like knowing how to reach your counselor or prescriber between visits."}}}, "bark": {"0": {"autism": {"ex": "Like stepping away to a quiet spot, or putting on headphones."}, "pain": {"ex": "Like slow breathing or resting when pain rises."}, "close": {"ex": "Like taking a break while someone else helps the person you care for."}}, "3": {"hearing": {"ex": "Reaching out by text, chat, or video in sign counts."}, "autism": {"ex": "Reaching out by text or in writing counts."}}, "4": {"learning": {"ex": "Using reminders, lists, or a helper to keep track counts as handling it."}, "health": {"ex": "Like keeping up with refills, appointments, and insurance."}, "autism": {"ex": "Using routines, lists, or a helper counts as handling it."}}}, "branches": {"1": {"hearing": {"ex": "Friendships online, by text, or in sign count fully."}, "autism": {"ex": "Friendships online, by text, or built around a shared interest count fully."}}, "2": {"hearing": {"ex": "Like a Deaf community group, a captioned class, or friends who sign."}, "moving": {"ex": "Like an adapted sports team, or a group that meets online."}, "autism": {"ex": "Like a group built around something you love, online or in person."}, "health": {"ex": "Like a group for people living with the same condition."}}, "3": {"close": {"ex": "Like time with a family member who is ill, or a break from helping care for them.", "tip": "Ask how caring for someone in the family is changing things at home."}}}, "trunk": {"3": {"moving": {"ex": "Strengths that have nothing to do with what your body can do count fully."}, "health": {"ex": "Strengths that have nothing to do with what your body can do count fully."}, "learning": {"ex": "Like creativity, problem solving, or noticing what others miss."}}}, "fruit": {"2": {"moving": {"ex": "Like finding a workaround, an accommodation, or a tool that helps."}, "hearing": {"ex": "Like finding a workaround, an accommodation, or a tool that helps."}, "seeing": {"ex": "Like finding a workaround, an accommodation, or a tool that helps."}, "learning": {"ex": "Like finding a workaround, an accommodation, or a tool that helps."}}, "4": {"health": {"ex": "Like a good day, an appointment handled, or rest you took without guilt."}, "pain": {"ex": "Like a good day, or rest you took without guilt."}, "serious": {"ex": "Like a treatment finished, a good hour, or a visit you enjoyed."}, "mind": {"ex": "Like a calmer day, or using a tool from counseling."}}}};
  Object.keys(N).forEach(function (p) { Object.keys(N[p]).forEach(function (i) { var q = (C.questions[p] || [])[+i]; if (q && !q.flag && !q.help) q.life = N[p][i]; }); }); })();
/* LIFE notes end */
