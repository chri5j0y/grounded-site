/* =====================================================================
   SOUL TREE CHECKIN . the question bank
   Read by Soul Tree (/soul-tree/) and Soul Tree Guide in the Field Guide,
   so both always ask the same thing. Edit questions here, not in index.html.

   The Grounded tree standard, version 1:
   - Six parts in one order: Roots (holy), Trunk (meaning), Bark (mind),
     Branches (community), Leaves (body), Fruit (hope).
   - The number of questions per part fits the stage: Sprout 4, Sapling 6,
     Soul Tree 8.
   - Every question has a tip for the guide. Soul Tree also gives each one
     a short "why" line a person can tap to read.
   - Four answers plus "Not sure." Scores run 1 to 10 for every tool.
   - At least one reverse worded question in every part (Soul Tree: two).
   - Levels: Strong (8 to 10), Steady (5 to 7), Needs care (1 to 4).
   - A safety step fitted to the age, always with 988 and 911.
   - Flagged answers (alone, losing hope, not safe at home) are never
     lost: the person sees help lines, and a guide sees them at goodbye.

   Each question: { t, tip, why } plus r: 1 for reverse questions
   ("Often" is the hard answer) and flag: 'alone', 'hope', or 'home'.
   Question 1 of every part is the quick check-in question, so it is never
   a reverse question.

   Roots asks about experience, never belief or affiliation. It measures
   whether the sacred is a resource or a stressor. Anyone of any faith,
   or none, can score Strong.

   staff: a work-focused set for coworkers and helping professionals,
   on the same standard, asked with its own opener.
   ===================================================================== */
(function(){
const VERSION = 1;

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
  ['care', 'Needs care', 1]
];

const STEMS = {
  standard: 'In the past two weeks, how often have you...',
  staff: 'In the past two weeks, thinking about your work, how often have you...'
};

const Q = {
  holy: [
    { t: 'Felt connected to something larger than yourself, like God, the Holy, nature, or love?',
      tip: 'Let them name it in their own words. Use their word for the sacred, not yours.',
      why: 'Feeling part of something larger is one of the strongest roots a person can have.' },
    { t: 'Had a spiritual practice, of any kind, that fed you?',
      tip: 'Prayer, walking, music, silence, worship, and time in nature all count. Ask what it gives them.',
      why: 'Practices are how roots get water. Small, regular ones count most.' },
    { t: 'Found comfort or strength in your faith or spirit during a hard moment?',
      tip: 'If yes, ask what helped. If no, listen for whether faith has gone quiet or become a weight.',
      why: 'This shows whether the sacred is a resource for you right now, or not.' },
    { t: 'Felt free to bring your honest questions and doubts?',
      tip: 'Doubt is not a problem to fix. Say that questions are welcome here.',
      why: 'Roots grow deeper when you can bring your whole self, questions included.' },
    { t: 'Felt a deep inner peace, even for a moment?',
      tip: 'Ask where they were and what was happening. Help them find their way back there.',
      why: 'Moments of peace show where your spirit rests. They are worth finding again.' },
    { t: 'Felt far from God or the sacred, or felt let down by it?', r: 1,
      tip: 'Listen. Do not defend God or correct them. Spiritual struggle is real and can be named without fixing.',
      why: 'Feeling far from the sacred can weigh on everything else. Naming it is a first step.' },
    { t: 'Felt hurt by a church, a religious community, or people of faith?', r: 1,
      tip: 'Take the wound seriously and do not explain it away. If a person or group is still causing harm, help them get safe.',
      why: 'Religious hurt is common and painful. It matters here, whatever you believe now.' },
    { t: 'Carried guilt or shame that felt heavy on your spirit?', r: 1,
      tip: 'Do not rush to reassure. Ask what it is about, if they want to say. Offer their own tradition\'s ways of release, or a faith leader they trust.',
      why: 'Guilt and shame can choke the roots. They can also be set down, with help.' }
  ],
  meaning: [
    { t: 'Felt that your life matters?',
      tip: 'If they hesitate, ask who would notice if they were gone. Listen for hopelessness and move to safety if it is there.',
      why: 'Knowing your life matters is the core of the trunk.' },
    { t: 'Had a clear sense of what you\'re living for?',
      tip: 'Ask them to name it. It can be a person, a cause, a craft, or simply today.',
      why: 'A clear "what for" gives the rest of your days a spine.' },
    { t: 'Lived in line with what you value most?',
      tip: 'Ask what they value most, then where life lines up with it and where it does not.',
      why: 'Living by your values brings a steadiness nothing else can.' },
    { t: 'Found meaning in your daily work or roles?',
      tip: 'Roles include parent, caregiver, neighbor, volunteer, and patient. Unpaid roles count fully.',
      why: 'Meaning in ordinary days keeps the trunk strong between big moments.' },
    { t: 'Given something good to the people who come after you?',
      tip: 'Listen for legacy: stories, values, kindness, things made or taught. This matters deeply near the end of life.',
      why: 'Passing something good on is one of the deepest sources of meaning.' },
    { t: 'Felt that your life story makes sense, even with its hard chapters?',
      tip: 'Invite a little life review if there is time. Ask which chapter they are in now.',
      why: 'When the story hangs together, hard chapters become part of a whole.' },
    { t: 'Felt empty or adrift, without a sense of purpose?', r: 1,
      tip: 'Do not hurry to hand them a purpose. Ask when they last felt it, and what has changed.',
      why: 'Feeling adrift is a sign the trunk needs tending. It is often a season, not forever.' },
    { t: 'Carried something you did, saw, or couldn\'t prevent that goes against your values?', r: 1,
      tip: 'This can be moral injury. Listen without judging. Their own faith leader, a chaplain, or a counselor can help them carry it.',
      why: 'Carrying something that went against your values is a heavy, real wound.' }
  ],
  mind: [
    { t: 'Been kind to yourself when you struggled?',
      tip: 'Ask how they would talk to a friend in the same spot. Then how they talk to themselves.',
      why: 'Self-kindness helps you bounce back. It is a skill, and it can grow.' },
    { t: 'Remembered that others struggle too, and you\'re not alone in it?',
      tip: 'Normalize gently, without shrinking their pain.',
      why: 'Knowing others struggle too softens shame and isolation.' },
    { t: 'Been able to name a strong feeling and ride it out?',
      tip: 'Help them name the feeling in a word or two. Naming it often takes some of its power.',
      why: 'Feelings you can name are feelings you can ride out.' },
    { t: 'Felt able to meet the stress in front of you?',
      tip: 'Ask what helps when stress climbs. Name the strengths you hear.',
      why: 'Feeling up to your stress, even barely, protects the rest of your tree.' },
    { t: 'Been fully present in what you were doing?',
      tip: 'Ask when they last felt fully there. It is often a clue to what restores them.',
      why: 'Presence gives the mind a rest from replaying and worrying.' },
    { t: 'Been hard on yourself, with a harsh inner voice?', r: 1,
      tip: 'Ask what the voice says. Do not argue with it. Ask whose voice it sounds like.',
      why: 'A harsh inner voice wears down the bark that protects you.' },
    { t: 'Gotten stuck replaying problems over and over?', r: 1,
      tip: 'Ask what they replay most. Offer one small way to step out of the loop, like a walk or a written list.',
      why: 'Replaying problems keeps the body on alert without solving anything.' },
    { t: 'Felt worn out from caring for others?', r: 1,
      tip: 'Caregivers rarely say this first. Thank them for saying it, and ask who cares for them.',
      why: 'Caring for others drains you too. Noticing it is how you start to refill.' }
  ],
  community: [
    { t: 'Had at least one person you can be fully yourself with?',
      tip: 'Ask who it is. If no one comes to mind, gently note that, and come back to it in the growth plan.',
      why: 'One safe person can carry you through a great deal.' },
    { t: 'Felt that you belong to a group or community?',
      tip: 'Belonging can be a faith community, a team, a club, a neighborhood, or a group online.',
      why: 'Belonging protects health and hope. Humans are not built to grow alone.' },
    { t: 'Felt warmth and safety in your closest relationships?',
      tip: 'If they pause, ask softly what makes it hard. Listen for harm.',
      why: 'Warm, safe relationships are the strongest branches.' },
    { t: 'Asked for help when you needed it?',
      tip: 'Ask what makes asking hard. Many people were taught not to.',
      why: 'Asking for help is a strength. It lets other people in.' },
    { t: 'Been able to let go of resentment, without excusing harm?',
      tip: 'Forgiveness never requires excusing harm or reconnecting with someone unsafe. Say so.',
      why: 'Letting go of resentment frees you. It never means saying harm was okay.' },
    { t: 'Felt safe with the people you live with?', flag: 'home',
      tip: 'If not, ask privately and calmly whether they are safe right now. Have the domestic violence line ready, and follow your reporting duties.',
      why: 'Everyone deserves to feel safe at home. If you don\'t, help is available.' },
    { t: 'Felt lonely?', r: 1, flag: 'alone',
      tip: 'Loneliness is common and painful. Ask when it is worst, and who they wish they could talk to.',
      why: 'Loneliness hurts body and spirit. It is worth tending, not hiding.' },
    { t: 'Felt strain or conflict in an important relationship?', r: 1,
      tip: 'Ask which relationship, if they want to say. Listen for harm, not only disagreement.',
      why: 'Strain with someone close pulls on every other part of the tree.' }
  ],
  body: [
    { t: 'Gotten enough restful sleep?',
      tip: 'Ask what gets in the way of sleep. Pain, worry, and grief often do.',
      why: 'Sleep is the soil everything else grows in.' },
    { t: 'Moved your body in ways you enjoy?',
      tip: 'Any movement counts: stretching, walking, dancing in the kitchen. Fit it to what their body can do.',
      why: 'Movement lifts mood and gives stress somewhere to go.' },
    { t: 'Eaten in ways that nourish you, without guilt or strict rules?',
      tip: 'Keep this gentle. If you hear fear or strict rules around food, listen, and point to a professional.',
      why: 'Food is meant to be care, not a test you pass or fail.' },
    { t: 'Taken unhurried rest, with nothing to get done?',
      tip: 'Ask what real rest looks like for them. Many people only stop when they collapse.',
      why: 'Real rest is different from collapsing. Your body needs both sleep and downtime.' },
    { t: 'Spent time outdoors or in nature?',
      tip: 'Even a window, a porch, or a few minutes of daylight counts.',
      why: 'Time outside steadies mood, sleep, and attention.' },
    { t: 'Listened to what your body was telling you?',
      tip: 'If they live with pain or illness, honor it. This question is about listening, not about being well.',
      why: 'Your body speaks before you are ready to listen. Listening sooner helps.' },
    { t: 'Used alcohol or other substances to get through hard feelings?', r: 1,
      tip: 'Ask without judgment. If use is growing or scary, the SAMHSA line (1-800-662-4357) and their doctor can help.',
      why: 'Numbing hard feelings works for a while, then adds its own weight.' },
    { t: 'Felt drained by your phone or screens?', r: 1,
      tip: 'Ask which parts drain them and which parts connect them. Both are real.',
      why: 'Screens can connect us or drain us. Noticing which is the first step.' }
  ],
  hope: [
    { t: 'Held on to hope, even when you couldn\'t know how things would turn out?',
      tip: 'Ask what they hope for now. Near the end of life, hope often changes shape. It does not disappear.',
      why: 'Hope that holds without knowing the ending is the deepest kind.' },
    { t: 'Been able to picture a good future?',
      tip: 'The future can be tomorrow, a visit, a season, or what happens after them.',
      why: 'Picturing something good ahead pulls you toward it.' },
    { t: 'Had energy to work toward what you hope for?',
      tip: 'Ask for one small next step, not a whole plan.',
      why: 'Hope grows when you take small steps toward it.' },
    { t: 'Found a way forward when something blocked your path?',
      tip: 'Ask about a time they found another way. Name that strength back to them.',
      why: 'Finding another way when blocked is the working heart of hope.' },
    { t: 'Noticed and savored things you\'re grateful for?',
      tip: 'Ask for one good thing from this week. Let them linger on it.',
      why: 'Noticing the good trains your eyes to find more of it.' },
    { t: 'Had moments of joy or delight?',
      tip: 'Laughter belongs here, even in hard seasons. Ask what made them laugh lately.',
      why: 'Joy is fruit. Even small moments of it feed the whole tree.' },
    { t: 'Felt that things will never get better?', r: 1, flag: 'hope',
      tip: 'Take this seriously. Ask gently how long they have felt this way, and listen for thoughts of not wanting to be alive. The safety step comes next.',
      why: 'When hope runs low, you deserve support. You don\'t have to carry it alone.' },
    { t: 'Felt like you had nothing to look forward to?', r: 1,
      tip: 'Help them find one small thing in the next few days, together.',
      why: 'Having nothing to look forward to drains hope. Small things count.' }
  ]
};

// Work-focused set for staff and helping professionals.
const STAFF = {
  holy: [
    { t: 'Felt connected to something sacred or larger than yourself in your work?',
      tip: 'Use their language: calling, purpose, God, the Holy, or simply love.',
      why: 'Work that touches the sacred can feed your roots, not only drain them.' },
    { t: 'Had a practice that restores your spirit after hard days?',
      tip: 'Ask what it is and whether they have had time for it lately.',
      why: 'Restoring practices keep roots watered in demanding work.' },
    { t: 'Found a moment of peace, prayer, or quiet during a hard day?',
      tip: 'Even thirty seconds in a car or hallway counts. Ask where those moments happen.',
      why: 'Small pauses keep the spirit steady through hard days.' },
    { t: 'Been able to honor a death or loss at work in a way that felt right to you?',
      tip: 'Ask what rituals they or the team have. Offer to help create one.',
      why: 'Marking a loss helps grief move instead of piling up.' },
    { t: 'Felt your own beliefs and values were respected at work?',
      tip: 'Listen for faith or values clashes on the team, without taking sides.',
      why: 'Respect for what you hold sacred helps you stay whole at work.' },
    { t: 'Felt your work is part of something bigger than the tasks?',
      tip: 'Ask what the bigger thing is for them.',
      why: 'Seeing the bigger picture keeps hard tasks from feeling empty.' },
    { t: 'Felt spiritually empty or dry?', r: 1,
      tip: 'Listen. Dryness is common in helping work and is not a failure.',
      why: 'Spiritual dryness is a sign your roots need water, not that you are failing.' },
    { t: 'Felt your faith or spirit strained by what you have seen at work?', r: 1,
      tip: 'Do not defend or explain. Ask what they saw that stays with them.',
      why: 'What you witness can shake your spirit. It deserves attention.' }
  ],
  meaning: [
    { t: 'Felt that your work matters?',
      tip: 'Ask for a recent moment when it clearly mattered.',
      why: 'Knowing your work matters is the trunk of a working life.' },
    { t: 'Felt your daily tasks line up with why you chose this work?',
      tip: 'Ask why they chose it. Listen for where the tasks have drifted from it.',
      why: 'When tasks match your reasons, work feeds you instead of draining you.' },
    { t: 'Seen the difference you make for someone?',
      tip: 'Help them name one person or moment.',
      why: 'Seeing your impact refills meaning.' },
    { t: 'Been able to give the kind of support you believe in?',
      tip: 'Ask what gets in the way: time, staffing, rules, or something else.',
      why: 'Giving support the way you believe in protects against burnout.' },
    { t: 'Felt proud of how you showed up?',
      tip: 'Name what you hear them do well. Helpers rarely hear it.',
      why: 'Pride in how you show up is a sign the trunk is strong.' },
    { t: 'Learned or grown in your work?',
      tip: 'Ask what they would like to learn next.',
      why: 'Growing in your work keeps it alive.' },
    { t: 'Felt like you were only getting through the shift?', r: 1,
      tip: 'Ask how long it has felt this way. A season of survival is common. A long stretch is a sign to get support.',
      why: 'Just getting through is survival mode. It is worth noticing.' },
    { t: 'Been unable to do what you believed was right because of limits outside your control?', r: 1,
      tip: 'This is moral distress. Name it. Ask whether there is someone at work they can raise it with safely.',
      why: 'Moral distress wears helpers down. Naming it is the first step.' }
  ],
  mind: [
    { t: 'Been able to set down hard moments after the workday?',
      tip: 'Ask what helps them leave work at work, and what follows them home.',
      why: 'Setting hard moments down lets your mind rest.' },
    { t: 'Been kind to yourself after a mistake?',
      tip: 'Helpers are often hardest on themselves. Ask what they told themselves.',
      why: 'Self-kindness after mistakes keeps you learning instead of shrinking.' },
    { t: 'Taken a moment to breathe between hard tasks or visits?',
      tip: 'Offer a two-breath pause they can use anywhere.',
      why: 'Short pauses keep stress from stacking up all day.' },
    { t: 'Felt able to handle the emotional weight of your work?',
      tip: 'Ask what has been heaviest lately.',
      why: 'Feeling able to carry the weight protects the rest of your tree.' },
    { t: 'Had room to grieve the people you have lost through your work?',
      tip: 'Grief in helping work is often unspoken. Give it room here.',
      why: 'Grief that gets room moves. Grief that does not, piles up.' },
    { t: 'Felt clear-headed and able to focus?',
      tip: 'If not, ask about sleep and workload before anything else.',
      why: 'Focus shows how much room your mind has left.' },
    { t: 'Felt worn out or numb from caring for others?', r: 1,
      tip: 'This can be compassion fatigue. Normalize it, and point to their employee help program or a counselor.',
      why: 'Compassion fatigue is common in caring work. It can be tended.' },
    { t: 'Carried other people\'s pain home with you?', r: 1,
      tip: 'Ask what they carry most. Offer a small end-of-day ritual for setting it down.',
      why: 'Carrying others\' pain home is heavy. You can learn to set it down.' }
  ],
  community: [
    { t: 'Had a coworker you can be honest with?',
      tip: 'Ask who. If no one, gently note that.',
      why: 'One honest coworker can carry you through hard seasons at work.' },
    { t: 'Felt supported by your team?',
      tip: 'Ask what support looks like when it works well.',
      why: 'Team support protects against burnout more than almost anything.' },
    { t: 'Felt your leaders have your back?',
      tip: 'Listen without taking sides. You are not their supervisor in this conversation.',
      why: 'Feeling backed up lets you do hard work without bracing.' },
    { t: 'Talked through a hard case or day with someone?',
      tip: 'Ask whether the team has a regular debrief. Offer one if it would help.',
      why: 'Debriefing helps hard days move through instead of sticking.' },
    { t: 'Asked for help when work got heavy?',
      tip: 'Ask what makes asking hard at work.',
      why: 'Asking for help at work is a strength, not a weakness.' },
    { t: 'Felt respected on your team?',
      tip: 'Listen for disrespect or harassment. Point to the right reporting path if you hear it.',
      why: 'Respect is part of being safe at work.' },
    { t: 'Felt alone in the hard parts of your work?', r: 1, flag: 'alone',
      tip: 'Ask who they wish they could talk to. Help them find one person.',
      why: 'Carrying hard work alone makes it heavier. You deserve company in it.' },
    { t: 'Felt tension or conflict on your team?', r: 1,
      tip: 'Ask how it affects them, not who is to blame.',
      why: 'Team conflict drains energy from everything else.' }
  ],
  body: [
    { t: 'Gotten restful sleep between workdays?',
      tip: 'Shift work and on-call often break sleep. Ask what would help most.',
      why: 'Sleep is how your body recovers from the work.' },
    { t: 'Taken your breaks?',
      tip: 'Ask what keeps them from breaks. Many helpers skip them out of guilt.',
      why: 'Breaks keep the body and mind going through the day.' },
    { t: 'Eaten real meals on workdays?',
      tip: 'Ask what a workday of eating usually looks like.',
      why: 'Real meals give steady energy for hard days.' },
    { t: 'Moved your body in ways that help you recover?',
      tip: 'Walking, stretching, and anything they enjoy count.',
      why: 'Movement helps your body let go of stress.' },
    { t: 'Left work at work during your time off?',
      tip: 'Ask about checking messages, worry, and on-call at home.',
      why: 'Time truly off is how you come back whole.' },
    { t: 'Had time off that truly restored you?',
      tip: 'Ask when they last had a real break.',
      why: 'Restoring time off is part of doing this work for the long haul.' },
    { t: 'Felt physically exhausted at the end of the day?', r: 1,
      tip: 'Ask how long it has been this way. Point to their doctor if it is new or growing.',
      why: 'Constant exhaustion is a sign the load is too heavy.' },
    { t: 'Used alcohol, food, or screens to numb out after work?', r: 1,
      tip: 'Ask without judgment. Offer their employee help program or the SAMHSA line if use is growing.',
      why: 'Numbing out helps for a night, then adds its own weight.' }
  ],
  hope: [
    { t: 'Held on to hope about your work?',
      tip: 'Ask what keeps them going.',
      why: 'Hope keeps helpers in hard work.' },
    { t: 'Seen something good come from the hard parts of your work?',
      tip: 'Help them name one moment of grace.',
      why: 'Seeing good come from hard work refills hope.' },
    { t: 'Looked forward to parts of your work?',
      tip: 'Ask which parts.',
      why: 'Looking forward to something is a sign hope is alive.' },
    { t: 'Shared joy or laughter with coworkers or the people you serve?',
      tip: 'Dark humor and laughter are part of how teams cope. Welcome it.',
      why: 'Joy at work, even small, feeds the whole tree.' },
    { t: 'Pictured yourself doing this work a year from now and felt okay about it?',
      tip: 'Listen without pushing them to stay or go.',
      why: 'Feeling okay about your future at work is a sign of steadiness.' },
    { t: 'Felt grateful for your work?',
      tip: 'Ask what they are grateful for this week.',
      why: 'Gratitude helps you notice what is working.' },
    { t: 'Thought about leaving because it is too much?', r: 1,
      tip: 'Listen without judging. This is a burnout sign worth taking seriously, not a failure.',
      why: 'Wanting to leave because it is too much is a sign you need more support.' },
    { t: 'Felt that things will never get better at work?', r: 1, flag: 'hope',
      tip: 'Take this seriously. Ask how it spills into the rest of life, and listen for hopelessness beyond work.',
      why: 'When hope runs low, you deserve support. You don\'t have to carry it alone.' }
  ]
};

// What a flagged answer means, and which answers flag it.
// alone and hope flag on Often or Almost always; Almost always also opens the calm card.
// home flags on Rarely, Sometimes, or Not sure; Rarely also opens the calm card.
const FLAGS = {
  alone: { on: ['often', 'always'], calm: ['always'], title: 'Feeling alone',
    note: 'You said you have felt lonely often. That is worth tending. Reaching out to one person this week, or calling 988 if it feels heavy, can help.',
    guide: 'They named loneliness. Talk together about one person they could reach toward, and consider a referral to grief or community support.' },
  hope: { on: ['often', 'always'], calm: ['always'], title: 'Losing hope',
    note: 'You said things have felt like they will never get better. You don\'t have to carry that alone. Call or text 988 any time to talk with someone.',
    guide: 'They named low hope. Make sure the safety step was asked. Share 988, and follow your protocol if they speak of not wanting to be alive.' },
  home: { on: ['rarely', 'sometimes', 'unsure'], calm: ['rarely'], title: 'Safety at home',
    note: 'You said you haven\'t always felt safe with the people you live with. You deserve to be safe. The National Domestic Violence Hotline is free and private: 1-800-799-7233, or text START to 88788. In danger now, call 911.',
    guide: 'They named not feeling safe at home. Ask privately whether they are safe right now. Share the domestic violence line, and follow your reporting duties for vulnerable adults.' }
};

// The safety step. Unchanged in wording.
const SAFETY = {
  opener: 'Some seasons are heavy. In the past two weeks, how often have you felt hopeless, or like a burden to others?',
  direct: 'In the past two weeks, have you had thoughts of ending your life or hurting yourself?',
  directOpts: [['no', 'No'], ['sometimes', 'Sometimes'], ['often', 'Often'], ['skip', 'I\'d rather not say']]
};

window.SOUL_TREE_CHECKIN = { version: VERSION, answers: ANSWERS, levels: LEVELS, stems: STEMS, questions: Q, staff: STAFF, flags: FLAGS, safety: SAFETY };
})();
