/* =====================================================================
   SAPLING CHECKUP . the question bank
   Read by Sapling (/sapling/) and, next, Sapling Guide in the Field Guide.
   Edit questions here, not in index.html.

   The Grounded tree standard, version 1:
   - Six parts in one order: Roots (holy), Trunk (meaning), Bark (mind),
     Branches (community), Leaves (body), Fruit (hope).
   - Four questions per part in a full checkup, written for each grade.
   - Every question has a tip for the grown-up or guide.
   - Three answers plus "Not sure." Scores run 1 to 10 for every tool.
   - At least one reverse worded question in every part (marked 'r').
   - Levels: Strong (8 to 10), Steady (5 to 7), Needs care (1 to 4).
   - A safety step fitted to the age, always with 988 and 911.
   - Flagged answers (alone, bullied, losing hope) always reach a grown-up.

   Each question: [text, tip] or [text, tip, 'r'] or [text, tip, 'r', flag].
   'r' means "yes" is the hard answer. flag names a sign a grown-up
   should hear about when the answer is yes or sometimes:
   'alone', 'bully', 'hope'.

   Roots asks about experience, never belief or affiliation. It measures
   whether the sacred is a resource or a stressor. A student of any
   worldview, or none, can score Strong.

   Nothing in this bank asks a student to reveal substance use, dating,
   or who they like. Friends, relationships, and substances are asked as
   readiness and pressure questions.

   SENSITIVE: grades 7 and 8 have one optional question about being
   offered a vape or other substances. It is off unless a grown-up turns
   it on, and it takes the place of the readiness question in the same
   spot, so every part keeps four questions. Never sent to The Grove.
   ===================================================================== */
(function(){
const VERSION = 1;

const ANSWERS = [
  ['yes', 'Yeah, most of the time', 3],
  ['some', 'Sometimes', 2],
  ['no', 'Not really', 1],
  ['unsure', 'Not sure', null]
];

const LEVELS = [
  ['strong', 'Strong', 8],
  ['steady', 'Steady', 5],
  ['care', 'Needs care', 1]
];

const GRADES = [
  ['6', 'Grade 6'],
  ['7', 'Grade 7'],
  ['8', 'Grade 8']
];

const Q = {
  '6': {
    holy: [
      ['Is there a place or a moment where you feel calm and peaceful inside?', 'If they name one, ask what it feels like there. Help them get there more often.'],
      ['Do you ever feel close to God, the Sacred, or something holy, like when you pray, worship, sit quietly, or spend time outside?', 'Share a time you felt that way yourself. If they say not really, that\'s okay. Ask where they feel most at peace instead.'],
      ['Do you feel like you matter, just for being you?', 'If the answer is not really, say: "You matter to me, just for being you." Then ask what makes it hard to feel that.'],
      ['Do you ever worry that God, or the Holy, is angry with you or disappointed in you?', 'Listen without correcting or arguing. Thank them for telling you, and ask where that feeling comes from. Let them know they\'re loved as they are. A faith leader you trust can help too.', 'r']
    ],
    meaning: [
      ['Is there something you love doing so much that you lose track of time?', 'Ask what they like most about it, then listen for a while. Make room for it this week.'],
      ['Do you feel like you\'re good at something?', 'Name one strength you see in them, and say when you saw it.'],
      ['Do you get chances to help people, at home, at school, or in your community?', 'Ask when helping someone felt good. Find one new way they can help this month.'],
      ['Do you feel like you have to act like someone you\'re not, just to fit in?', 'Ask where that happens most. Tell them which parts of the real them you love.', 'r']
    ],
    mind: [
      ['When you feel upset, do you know something that helps you calm down?', 'Ask what helps them calm down. Practice it together sometime when things are calm.'],
      ['When you make a mistake, can you be kind to yourself?', 'Ask what they say to themselves after a mistake. Share a mistake of your own and how you handled it.'],
      ['Do worries take up a lot of your day?', 'Ask what the biggest worry is right now. Listen first, then help them pick one small thing they can do about it.', 'r'],
      ['If friends pushed you to do something that felt wrong, could you say no and still feel okay?', 'Practice an easy way out together. Let them know they can always blame you: "My parents would ground me forever."']
    ],
    community: [
      ['Do you have at least one friend you can be yourself around?', 'If they name someone, ask what makes that friend easy to be around.'],
      ['Is there a grown-up you trust enough to tell almost anything?', 'Help them name that grown-up. It might be you.'],
      ['Do you feel lonely or left out?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying you, in person or online?', 'If yes, listen first and thank them for telling you. Save any messages, then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you usually get enough sleep to feel rested?', 'Most kids this age need 9 to 12 hours. Keeping phones out of the bedroom at night helps a lot.'],
      ['Do you move your body in ways you enjoy, like sports, biking, or dancing?', 'Ask what kind of moving is the most fun, and do it together this week.'],
      ['Do you feel bad about how your body looks?', 'If yes, listen without judging. Keep the talk about strength and energy, not weight. Watch for skipped meals, and talk with their doctor if you\'re concerned.', 'r'],
      ['If someone offered you a vape, do you know what you\'d say or do?', 'Practice a few easy ways out together, like "No thanks, I have a game." Let them use you as the excuse any time.']
    ],
    hope: [
      ['Do you have something to look forward to this week?', 'If not, plan one small good thing together.'],
      ['Do you believe things can get better, even when they\'re hard?', 'Share a time something hard got better for you.'],
      ['Do you notice good things that happen, even small ones?', 'Try trading three good things at dinner or bedtime.'],
      ['Do you ever feel like giving up on everything?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope']
    ]
  },
  '7': {
    holy: [
      ['Do you ever feel wonder, like when you see the stars, hear music you love, or stand somewhere beautiful?', 'Ask about the last time they felt that. Share one of your own.'],
      ['When life gets hard, does something sacred help you, like prayer, scripture, worship, meditation, or a tradition from your family?', 'Ask what helps most. Share a practice from your own life or tradition. If they don\'t have one, explore quiet, nature, or music together without pushing.'],
      ['Do you feel like you matter, just for being you, even on bad days?', 'Tell them, plainly, that they matter to you on their worst days too.'],
      ['Does anything about God, faith, or religion make you feel scared, judged, or not good enough?', 'Listen first. Don\'t defend or correct. Ask: "What happened, or who made you feel that way?" Faith that wounds is worth taking seriously. If a person or group is causing harm, step in.', 'r']
    ],
    meaning: [
      ['Do you know what matters most to you?', 'Ask them to name one or two things. Tell them what you see them caring about.'],
      ['Is there something you\'re getting better at that you\'re proud of?', 'Ask them to show you. Notice the effort, not just the result.'],
      ['Do you use something you\'re good at to help other people?', 'Ask when that felt good. Look for a place to do more of it.'],
      ['Do you feel like you\'re just going through the motions most days?', 'Ask what part of the day feels most alive, and what feels empty. Listen for anything that has stopped being fun.', 'r']
    ],
    mind: [
      ['When stress builds up, do you have ways to calm down that actually work?', 'Ask what works and what does not. Try a new one together, like a walk or slow breathing.'],
      ['When you mess up, can you be kind to yourself instead of beating yourself up?', 'Ask what they say to themselves after a mistake. Would they say that to a friend?'],
      ['Do you compare yourself to other people online and feel worse?', 'Ask whose posts leave them feeling worse. Talk about how much online life is edited. Unfollowing is allowed.', 'r'],
      ['If friends pushed you to do something that felt wrong, could you say no and still feel okay?', 'Practice an easy way out together. Let them know they can always blame you, and that you\'d rather get a call than have them stay.']
    ],
    community: [
      ['Do you have friends who treat you well, even when you disagree?', 'Talk about what a good friend does when you disagree.'],
      ['If a friend, or someone you liked, ever pressured you or made you feel bad about yourself, would you know someone you could talk to?', 'Keep the door open without prying. Say: "You can always tell me, and you won\'t be in trouble for telling."'],
      ['Do you feel lonely or left out, even around other kids?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying you, in person, in group chats, or online?', 'If yes, listen first and thank them for telling you. Save any messages, then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you usually get enough sleep to think clearly and feel good?', 'Most kids this age need 9 to 12 hours. Keep phones out of the bedroom at night.'],
      ['Do you do something active most days?', 'Help them find a sport or activity they enjoy, even a daily walk.'],
      ['Do you feel stressed or upset about food, eating, or how your body looks?', 'If yes, listen without judging. Keep it about energy and strength, not weight. Watch for skipped meals or big changes, and talk with their doctor if you\'re concerned.', 'r'],
      ['If someone offered you a vape or something to drink, do you know how you\'d get out of it?', 'Practice a few easy ways out together. Let them use you as the excuse, and promise a no-questions ride home if they ever need one.']
    ],
    hope: [
      ['Do you have something coming up that you\'re excited about?', 'If not, plan one good thing together this month.'],
      ['Do you believe you can handle hard things, with help if you need it?', 'Remind them of something hard they already got through.'],
      ['Do you have a dream or goal for your future?', 'Ask about it with curiosity, not advice. Help them take one small step.'],
      ['Do you ever feel hopeless, like nothing will ever get better?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope']
    ]
  },
  '8': {
    holy: [
      ['Do you have moments when you feel peace deep down, even when life is busy or hard?', 'Ask where those moments come from. Help protect time for them.'],
      ['Do you feel connected to God, the Divine, or something sacred, in your own way?', 'Ask what "in your own way" looks like for them. Questions and doubts are a normal part of faith at this age. Share some of your own, and don\'t push.'],
      ['Do you feel loved and accepted just as you are?', 'Tell them what you love about who they are, not what they do.'],
      ['Do God, faith, or religion ever make you feel scared, ashamed, or pushed out?', 'Listen first. Don\'t defend or correct. Ask: "What happened, or who made you feel that way?" Faith that wounds is worth taking seriously. If a person or group is causing harm, step in.', 'r']
    ],
    meaning: [
      ['Do you know what you care about enough to stand up for?', 'Ask what they would stand up for, and why. Tell them when you see them do it.'],
      ['Do you have a strength or talent that people count on you for?', 'Name the strength you count on them for.'],
      ['Do you feel like what you do each day matters?', 'Ask what part of the day feels most worth it.'],
      ['Do you feel like you have to be someone you\'re not to be liked?', 'Ask where that happens most. Tell them which parts of the real them you love.', 'r']
    ],
    mind: [
      ['When stress piles up, can you notice it and do something that helps?', 'Ask how they know stress is building. Help them name one thing that helps.'],
      ['When you fail at something, can you learn from it without hating yourself?', 'Share a failure of your own and what you learned.'],
      ['Does worry or stress get in the way of sleep, school, or fun?', 'Ask what gets squeezed out first. If it lasts more than a couple of weeks, talk with their doctor or school counselor.', 'r'],
      ['If people pushed you to do something that goes against what you believe is right, could you hold your ground?', 'Ask about a time they held their ground. Tell them you\'re proud of it.']
    ],
    community: [
      ['Do you have friends who have your back?', 'Ask who those friends are and how they show it.'],
      ['If someone you liked or went out with ever pressured you, controlled you, or made you feel bad about yourself, would you know someone you could talk to?', 'Keep the door open without prying. Say: "You can always tell me, and you won\'t be in trouble for telling."'],
      ['Do you feel lonely, even when people are around?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying, threatening, or embarrassing you, in person or online?', 'If yes, listen first and thank them for telling you. Save any messages or pictures, then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you get enough sleep to feel rested most days?', 'Teens need 8 to 10 hours. Keep phones out of the bedroom at night.'],
      ['Do you feel okay in your own body?', 'Keep the talk about strength, energy, and health, not weight or looks.'],
      ['Do you stay up late on your phone or other screens?', 'Agree on a time when screens charge outside the bedroom, and follow it yourself too.', 'r'],
      ['If someone offered you a vape, a drink, or drugs, do you know how you\'d get out of it?', 'Practice a few easy ways out together. Let them use you as the excuse, and promise a no-questions ride home if they ever need one.']
    ],
    hope: [
      ['Are you looking forward to high school, or to something else coming next?', 'Ask what they look forward to, and what feels scary about it.'],
      ['Do you believe your life can turn out good, even when things are hard right now?', 'Share a time you got through something hard.'],
      ['Do you have people who believe in your future?', 'Tell them, plainly, that you believe in their future.'],
      ['Do you ever feel like there\'s no point in trying anymore?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope']
    ]
  }
};

/* Optional sensitive questions. Off unless a grown-up turns them on.
   [part, index it replaces, question]. Never sent to The Grove. */
const SENSITIVE = {
  '7': ['body', 3, ['Has anyone offered you a vape, or pressured you to try one?', 'If yes, stay calm and thank them for telling you. Ask what happened, without a lecture. Practice a few easy ways out together, and let them use you as the excuse.', 'r']],
  '8': ['body', 3, ['Has anyone offered you a vape, alcohol, or drugs, or pressured you to try them?', 'If yes, stay calm and thank them for telling you. Ask what happened, without a lecture. Practice a few easy ways out together, and promise a no-questions ride home if they ever need one.', 'r']]
};

// The safety step. The same two questions for grades 6 to 8.
const SAFETY = {
  questions: [
    ['Is anyone hurting you, or making you feel unsafe at home, at school, or online?', 'safe'],
    ['Sometimes when life is really hard, people think about hurting themselves or not wanting to be alive. Have you had thoughts like that lately?', 'self']
  ],
  answers: [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure']],
  intro: 'These help make sure you\'re safe. There\'s no wrong answer, and you can skip if you want.'
};

window.SAPLING_CHECKUP = { version: VERSION, answers: ANSWERS, levels: LEVELS, grades: GRADES, questions: Q, sensitive: SENSITIVE, safety: SAFETY };
})();
