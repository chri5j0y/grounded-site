/* =====================================================================
   ASPEN CHECKIN . the question bank
   Read by Aspen (/aspen/) and Aspen Guide in the Field Guide, so both
   always ask the same thing.
   Edit questions here, not in index.html.

   The Grounded tree standard, version 1:
   - Six parts in one order: Roots (What grounds you), Trunk (Purpose),
     Bark (Mind and feelings), Branches (Relationships), Leaves (Body),
     Fruit (Hope). Code names match the tree part: roots, trunk, bark,
     branches, leaves, fruit.
   - The number of questions per part fits the stage: Maple 4, Aspen 6,
     Oak 8, written for each grade or life stage. Aspen asks 6.
   - Every question has a tip for the grown-up or guide.
   - Three answers plus "Not sure." Scores run 1 to 10 for every tool.
   - At least one reverse worded question in every part (marked 'r').
     Aspen has two in every part.
   - Levels: Strong (8 to 10), Steady (5 to 7), Growing Edge (1 to 4).
   - A safety step fitted to the age, always with 988 and 911.
   - Flagged answers (alone, bullied, losing hope) always reach a grown-up.

   Each question: [text, tip] or [text, tip, 'r'] or [text, tip, 'r', flag].
   Question 1 of every part is the quick check-in question, so it is never
   a reverse question. WHY holds a short "Why this question?" line for
   every question, in the same order, written for students.
   'r' means "yes" is the hard answer. flag names a sign a grown-up
   should hear about when the answer is yes or sometimes:
   'alone', 'bully', 'hope'.

   BANK 2 (session 23): six questions per part. Questions 1 to 4 are the
   same as bank 1, word for word, so rings saved with four questions still
   read correctly. Rings note their bank; rings from an earlier bank are
   kept, labeled earlier, and never compared with newer ones.

   Roots asks about experience, never belief or affiliation. It measures
   whether the sacred is a resource or a stressor. A student of
   all faith traditions and everything in-between can score Strong.

   Nothing in this bank asks a student to reveal substance use, dating,
   or who they like. Friends, relationships, and substances are asked as
   readiness and pressure questions.

   SENSITIVE: grades 7 and 8 have one optional question about being
   offered a vape or other substances. It is off unless a grown-up turns
   it on, and it takes the place of the readiness question in the same
   spot, so every part keeps six questions. Never sent to The Grove.
   ===================================================================== */
(function(){
const VERSION = 1;   // the Grounded tree standard
const BANK = 2;      // which set of questions: bank 1 asked 4 per part, bank 2 asks 6
const PER_PART = 6;
const BANK_SIZES = { 1: 4, 2: 6 };

const ANSWERS = [
  ['yes', 'Yeah, most of the time', 3],
  ['some', 'Sometimes', 2],
  ['no', 'Not really', 1],
  ['unsure', 'Not sure', null]
];

const LEVELS = [
  ['strong', 'Strong', 8],
  ['steady', 'Steady', 5],
  ['edge', 'Growing Edge', 1]
];

const GRADES = [
  ['6', 'Grade 6'],
  ['7', 'Grade 7'],
  ['8', 'Grade 8']
];

const Q = {
  '6': {
    roots: [
      ['Is there a place or a moment where you feel calm and peaceful inside?', 'If they name one, ask what it feels like there. Help them get there more often.'],
      ['Do you ever feel close to God, the Sacred, or something holy, like when you pray, worship, sit quietly, or spend time outside?', 'Share a time you felt that way yourself. If they say not really, that\'s okay. Ask where they feel most at peace instead.'],
      ['Do you feel like you matter, just for being you?', 'If the answer is not really, say: "You matter to me, just for being you." Then ask what makes it hard to feel that.'],
      ['Do thoughts about God, or something bigger than you, ever leave you feeling worried or weighed down?', 'Listen without correcting or arguing. Thank them for telling you, and ask what brings that feeling. Let them know they\'re loved as they are. A faith leader you trust can help too.', 'r'],
      ['Do you feel thankful for things in your life, even small ones?', 'Trade one thing you\'re each thankful for today. Thankfulness grows with practice, so make it a habit at dinner or bedtime.'],
      ['Do you feel empty inside, like something is missing?', 'Listen without fixing, and thank them for telling you. Ask when it feels that way most. If it keeps up for a couple of weeks, talk with their doctor or school counselor.', 'r']
    ],
    trunk: [
      ['Is there something you love doing so much that you lose track of time?', 'Ask what they like most about it, then listen for a while. Make room for it this week.'],
      ['Do you feel like you\'re good at something?', 'Name one strength you see in them, and say when you saw it.'],
      ['Do you get chances to help people, at home, at school, or in your community?', 'Ask when helping someone felt good. Find one new way they can help this month.'],
      ['Do you feel like you have to act like someone you\'re not, just to fit in?', 'Ask where that happens most. Tell them which parts of the real them you love.', 'r'],
      ['Do you try new things, even when you might not be good at them yet?', 'Tell them about something you were bad at when you started. Praise the try, not just how it turned out.'],
      ['Do you feel bored a lot, like nothing really interests you?', 'Ask what used to interest them, and try one new thing together this month. If they\'ve stopped enjoying things they used to love, talk with their doctor.', 'r']
    ],
    bark: [
      ['When you feel upset, do you know something that helps you calm down?', 'Ask what helps them calm down. Practice it together sometime when things are calm.'],
      ['When you make a mistake, can you be kind to yourself?', 'Ask what they say to themselves after a mistake. Share a mistake of your own and how you handled it.'],
      ['Do worries take up a lot of your day?', 'Ask what the biggest worry is right now. Listen first, then help them pick one small thing they can do about it.', 'r'],
      ['If friends pushed you to do something that felt wrong, could you say no and still feel okay?', 'Practice an easy way out together. Let them know they can always blame you: "My parents would ground me forever."'],
      ['Can you name what you\'re feeling, like sad, mad, nervous, or embarrassed?', 'Name your own feelings out loud sometimes, like "I\'m frustrated right now." It shows them how.'],
      ['Do you get so upset or angry that it\'s hard to calm down?', 'Ask what usually happens right before. When things are calm, plan a calm-down spot and a signal they can use.', 'r']
    ],
    branches: [
      ['Do you have at least one friend you can be yourself around?', 'If they name someone, ask what makes that friend easy to be around.'],
      ['Is there a grown-up you trust enough to tell almost anything?', 'Help them name that grown-up. It might be you.'],
      ['Do you feel lonely or left out?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying you, in person or online?', 'If yes, listen first and thank them for telling you. Save any messages, then work with the school.', 'r', 'bully'],
      ['Do you feel close to someone in your family?', 'Plan ten minutes of one-on-one time this week, doing something they pick. Put your phone away while you do.'],
      ['Do you feel like you belong at your school?', 'Ask where at school they feel most at home, and where they don\'t. Help them find one club, team, or group to try.']
    ],
    leaves: [
      ['Do you usually get enough sleep to feel rested?', 'Most kids this age need 9 to 12 hours. Keeping phones out of the bedroom at night helps a lot.'],
      ['Do you move your body in ways you enjoy, like sports, biking, or dancing?', 'Ask what kind of moving is the most fun, and do it together this week.'],
      ['Do you feel bad about how your body looks?', 'If yes, listen without judging. Keep the talk about strength and energy, not weight. Watch for skipped meals, and talk with their doctor if you\'re concerned.', 'r'],
      ['If someone offered you a vape, do you know what you\'d say or do?', 'Practice a few easy ways out together, like "No thanks, I have a game." Let them use you as the excuse any time.'],
      ['Do you spend time outside most days?', 'Get outside together, even for ten minutes. Daylight helps sleep and mood.'],
      ['Do you feel tired during the day, even after sleeping?', 'Look at bedtime, screens at night, and the morning rush. If it keeps up, mention it to their doctor.', 'r']
    ],
    fruit: [
      ['Do you have something to look forward to this week?', 'If not, plan one small good thing together.'],
      ['Do you believe things can get better, even when they\'re hard?', 'Share a time something hard got better for you.'],
      ['Do you notice good things that happen, even small ones?', 'Try trading three good things at dinner or bedtime.'],
      ['Do you ever feel like giving up on everything?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope'],
      ['Do you do kind things for other people?', 'Do one kind thing together this week, like a note, a favor, or a meal for someone. Talk about how it felt afterward.'],
      ['When one thing goes wrong, does it feel like your whole day is ruined?', 'Help them name what went wrong and what still went okay. One bad moment doesn\'t make a bad day.', 'r']
    ]
  },
  '7': {
    roots: [
      ['Do you ever feel wonder, like when you see the stars, hear music you love, or stand somewhere beautiful?', 'Ask about the last time they felt that. Share one of your own.'],
      ['When life gets hard, does something sacred help you, like prayer, scripture, worship, meditation, or a tradition from your family?', 'Ask what helps most. Share a practice from your own life or tradition. If they don\'t have one, explore quiet, nature, or music together without pushing.'],
      ['Do you feel like you matter, just for being you, even on bad days?', 'Tell them, plainly, that they matter to you on their worst days too.'],
      ['Does anything about God, faith, or religion make you feel scared, judged, or not good enough?', 'Listen first. Don\'t defend or correct. Ask: "What happened, or who made you feel that way?" Faith that wounds is worth taking seriously. If a person or group is causing harm, step in.', 'r'],
      ['Do you notice things you\'re thankful for, like people, places, or good moments?', 'Ask them to name three good things from this week, and share yours too.'],
      ['Do you hold onto anger at someone for a long time?', 'Listen to what happened before you talk about letting go. Forgiving someone doesn\'t mean what they did was okay, and it doesn\'t have to happen fast.', 'r']
    ],
    trunk: [
      ['Do you know what matters most to you?', 'Ask them to name one or two things. Tell them what you see them caring about.'],
      ['Is there something you\'re getting better at that you\'re proud of?', 'Ask them to show you. Notice the effort, not just the result.'],
      ['Do you use something you\'re good at to help other people?', 'Ask when that felt good. Look for a place to do more of it.'],
      ['Do you feel like you\'re just going through the motions most days?', 'Ask what part of the day feels most alive, and what feels empty. Listen for anything that has stopped being fun.', 'r'],
      ['Is there something you\'re working to get better at?', 'Ask what they\'re working toward, then help them plan one small next step.'],
      ['Do you do things mostly because other people expect you to, not because you care about them?', 'Ask which activities they would keep if it were up to them. Listen without pushing.', 'r']
    ],
    bark: [
      ['When stress builds up, do you have ways to calm down that actually work?', 'Ask what works and what does not. Try a new one together, like a walk or slow breathing.'],
      ['When you mess up, can you be kind to yourself instead of beating yourself up?', 'Ask what they say to themselves after a mistake. Would they say that to a friend?'],
      ['Do you compare yourself to other people online and feel worse?', 'Ask whose posts leave them feeling worse. Talk about how much online life is edited. Unfollowing is allowed.', 'r'],
      ['If friends pushed you to do something that felt wrong, could you say no and still feel okay?', 'Practice an easy way out together. Let them know they can always blame you, and that you\'d rather get a call than have them stay.'],
      ['When something is bothering you, do you talk to someone about it?', 'Make talking easy. Car rides, walks, and side-by-side time often work better than face-to-face talks.'],
      ['Do you replay embarrassing or upsetting moments over and over in your head?', 'Ask what moment keeps coming back. Saying it out loud, or moving their body, can help the loop let go.', 'r']
    ],
    branches: [
      ['Do you have friends who treat you well, even when you disagree?', 'Talk about what a good friend does when you disagree.'],
      ['If a friend, or someone you liked, ever pressured you or made you feel bad about yourself, would you know someone you could talk to?', 'Keep the door open without prying. Say: "You can always tell me, and you won\'t be in trouble for telling."'],
      ['Do you feel lonely or left out, even around other kids?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying you, in person, in group chats, or online?', 'If yes, listen first and thank them for telling you. Save any messages, then work with the school.', 'r', 'bully'],
      ['Is there someone in your family you feel close to and can count on?', 'Plan regular one-on-one time, doing something they choose. Keep showing up, even if they act like they don\'t care.'],
      ['Is there a group, team, or club where you feel like you belong?', 'Help them find a group, or stick with one they like. Belonging grows with time.']
    ],
    leaves: [
      ['Do you usually get enough sleep to think clearly and feel good?', 'Most kids this age need 9 to 12 hours. Keep phones out of the bedroom at night.'],
      ['Do you do something active most days?', 'Help them find a sport or activity they enjoy, even a daily walk.'],
      ['Do you feel stressed or upset about food, eating, or how your body looks?', 'If yes, listen without judging. Keep it about energy and strength, not weight. Watch for skipped meals or big changes, and talk with their doctor if you\'re concerned.', 'r'],
      ['If someone offered you a vape or something to drink, do you know how you\'d get out of it?', 'Practice a few easy ways out together. Let them use you as the excuse, and promise a no-questions ride home if they ever need one.'],
      ['Do you eat regular meals that keep your energy up during the day?', 'Keep it about energy, not weight. Make breakfast and snacks easy to grab.'],
      ['Do you scroll or watch screens for hours without meaning to?', 'Ask how they feel after a long scroll. Agree on screen-free times together, and keep them yourself.', 'r']
    ],
    fruit: [
      ['Do you have something coming up that you\'re excited about?', 'If not, plan one good thing together this month.'],
      ['Do you believe you can handle hard things, with help if you need it?', 'Remind them of something hard they already got through.'],
      ['Do you have a dream or goal for your future?', 'Ask about it with curiosity, not advice. Help them take one small step.'],
      ['Do you ever feel hopeless, like nothing will ever get better?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope'],
      ['Do you do kind or helpful things for other people?', 'Look for one way to help together this month, at home, at school, or in your community.'],
      ['When something goes wrong, do you think it will always be that way?', 'Help them remember a time something hard changed. Hard things usually don\'t last forever.', 'r']
    ]
  },
  '8': {
    roots: [
      ['Do you have moments when you feel peace deep down, even when life is busy or hard?', 'Ask where those moments come from. Help protect time for them.'],
      ['Do you feel connected to God, the Divine, or something sacred, in your own way?', 'Ask what "in your own way" looks like for them. Questions and doubts are a normal part of faith at this age. Share some of your own, and don\'t push.'],
      ['Do you feel loved and accepted just as you are?', 'Tell them what you love about who they are, not what they do.'],
      ['Do God, faith, or religion ever make you feel scared, ashamed, or pushed out?', 'Listen first. Don\'t defend or correct. Ask: "What happened, or who made you feel that way?" Faith that wounds is worth taking seriously. If a person or group is causing harm, step in.', 'r'],
      ['Do you take time to be quiet, pray, or reflect?', 'Ask what helps them slow down. Protect a few quiet minutes in their day, and take some for yourself too.'],
      ['Do you feel empty inside, even when things are going okay?', 'Listen without fixing, and thank them for telling you. If it keeps up for a couple of weeks, talk with their doctor or school counselor.', 'r']
    ],
    trunk: [
      ['Do you know what you care about enough to stand up for?', 'Ask what they would stand up for, and why. Tell them when you see them do it.'],
      ['Do you have a strength or talent that people count on you for?', 'Name the strength you count on them for.'],
      ['Do you feel like what you do each day matters?', 'Ask what part of the day feels most worth it.'],
      ['Do you feel like you have to be someone you\'re not to be liked?', 'Ask where that happens most. Tell them which parts of the real them you love.', 'r'],
      ['Do you have a goal you\'re working toward, and know your next step?', 'Ask about it with curiosity. Help them name one next step and when they\'ll take it.'],
      ['Do you put a lot of time into things only because other people expect it?', 'Ask what they would spend time on if it were up to them. Listen, and look for a little room to make that happen.', 'r']
    ],
    bark: [
      ['When stress piles up, can you notice it and do something that helps?', 'Ask how they know stress is building. Help them name one thing that helps.'],
      ['When you fail at something, can you learn from it without hating yourself?', 'Share a failure of your own and what you learned.'],
      ['Does worry or stress get in the way of sleep, school, or fun?', 'Ask what gets squeezed out first. If it lasts more than a couple of weeks, talk with their doctor or school counselor.', 'r'],
      ['If people pushed you to do something that goes against what you believe is right, could you hold your ground?', 'Ask about a time they held their ground. Tell them you\'re proud of it.'],
      ['When things are hard, are you willing to ask for help?', 'Tell them about a time you asked for help. Make it normal, not a weakness.'],
      ['Do you replay upsetting moments over and over in your head?', 'Ask what moment keeps coming back. Saying it out loud, writing it down, or moving their body can help the loop let go.', 'r']
    ],
    branches: [
      ['Do you have friends who have your back?', 'Ask who those friends are and how they show it.'],
      ['If someone you liked or went out with ever pressured you, controlled you, or made you feel bad about yourself, would you know someone you could talk to?', 'Keep the door open without prying. Say: "You can always tell me, and you won\'t be in trouble for telling."'],
      ['Do you feel lonely, even when people are around?', 'If yes, plan some one-on-one time this week. Ask when it feels that way most, and listen without fixing.', 'r', 'alone'],
      ['Is anyone bullying, threatening, or embarrassing you, in person or online?', 'If yes, listen first and thank them for telling you. Save any messages or pictures, then work with the school.', 'r', 'bully'],
      ['Do you feel close to someone in your family, even when you don\'t agree?', 'Keep regular one-on-one time, even short. Disagreeing and still staying close is something you can show them.'],
      ['Do you feel like you belong somewhere, like at school, on a team, or in a group?', 'Ask where they feel most at home. Help them stay connected to that group.']
    ],
    leaves: [
      ['Do you get enough sleep to feel rested most days?', 'Teens need 8 to 10 hours. Keep phones out of the bedroom at night.'],
      ['Do you feel okay in your own body?', 'Keep the talk about strength, energy, and health, not weight or looks.'],
      ['Do you stay up late on your phone or other screens?', 'Agree on a time when screens charge outside the bedroom, and follow it yourself too.', 'r'],
      ['If someone offered you a vape, a drink, or drugs, do you know how you\'d get out of it?', 'Practice a few easy ways out together. Let them use you as the excuse, and promise a no-questions ride home if they ever need one.'],
      ['Do you spend time outside most days?', 'Daylight helps sleep and mood. Walk, bike, or just sit outside together.'],
      ['Do you feel tired during the day, even after sleeping?', 'Look at bedtime, late screens, and early mornings. Teens need 8 to 10 hours. If it keeps up, mention it to their doctor.', 'r']
    ],
    fruit: [
      ['Are you looking forward to high school, or to something else coming next?', 'Ask what they look forward to, and what feels scary about it.'],
      ['Do you believe your life can turn out good, even when things are hard right now?', 'Share a time you got through something hard.'],
      ['Do you have people who believe in your future?', 'Tell them, plainly, that you believe in their future.'],
      ['Do you ever feel like there\'s no point in trying anymore?', 'Take this seriously and keep talking. If they ever talk about wanting to die or hurting themselves, call or text 988 right away, or call 911 in an emergency.', 'r', 'hope'],
      ['Do you do kind things for people, even when no one is watching?', 'Notice and name the kind things they do. Do one together this month.'],
      ['When something goes wrong, do you blame yourself for all of it?', 'Help them sort what was theirs and what wasn\'t. Share a time you were too hard on yourself.', 'r']
    ]
  }
};

/* Why this question? One line per question, same order as Q. */
const WHY = {
  '6': {
    roots: [
      'Having a calm place inside, or a calm place to go, helps you handle hard days.',
      'Feeling close to something holy helps many people feel peaceful and less alone.',
      'Knowing you matter just for being you is one of the strongest roots a person can have.',
      'Faith should help you feel loved. If it makes you feel scared or in trouble, that\'s worth talking about.',
      'Noticing what you\'re thankful for helps you feel happier and calmer.',
      'Feeling empty is worth noticing, because it can mean part of you needs some care.'
    ],
    trunk: [
      'Doing something you love so much you lose track of time is a sign you\'re doing what fits you.',
      'Knowing what you\'re good at helps you feel confident when things get hard.',
      'Helping other people helps you feel like you matter, and it\'s good for your mood too.',
      'Having to act like someone else is tiring. Being the real you is easier with people who like you.',
      'Trying things before you\'re good at them is how people find what they love.',
      'Feeling bored a lot can mean you haven\'t found what fits you yet, or that something needs care.'
    ],
    bark: [
      'Knowing what helps you calm down is like having a tool ready before you need it.',
      'Being kind to yourself after a mistake helps you learn from it instead of feeling stuck.',
      'Everyone worries sometimes. When worries take up a lot of your day, it helps to get support.',
      'Saying no to friends when something feels wrong is hard, and it\'s a skill you can practice.',
      'Putting a feeling into words helps your brain calm it down.',
      'Big feelings are normal. Knowing when they take over helps you find what works for you.'
    ],
    branches: [
      'One friend you can be yourself around can make a big difference.',
      'A grown-up you trust is someone to go to when things get hard.',
      'Feeling lonely or left out hurts, and it\'s something grown-ups want to know about.',
      'Bullying is never your fault, and no one should have to handle it alone.',
      'Feeling close to your family is one of the strongest protections for kids your age.',
      'Feeling like you belong at school helps with friends, mood, and learning.'
    ],
    leaves: [
      'Sleep helps your mood, your focus, and how you feel about yourself.',
      'Moving in ways you enjoy helps your body and your mood.',
      'Lots of kids your age worry about how they look. Talking about it helps.',
      'Knowing what you\'d say ahead of time makes it much easier to say no.',
      'Daylight and fresh air help your sleep, mood, and focus.',
      'Feeling tired all day can mean your body needs more sleep, or better sleep.'
    ],
    fruit: [
      'Having something to look forward to gives each week a little more light.',
      'Believing things can get better helps you keep going when life is hard.',
      'Noticing good things, even small ones, trains your brain to see more of them.',
      'Feeling like giving up is important to share, so the people who care about you can help.',
      'Being kind to others is one of the surest ways to feel hopeful yourself.',
      'Seeing a bad moment as just a moment helps hope last through hard days.'
    ]
  },
  '7': {
    roots: [
      'Wonder reminds you that the world is bigger than your problems.',
      'Something sacred, like prayer or a family tradition, can help you through hard times.',
      'Knowing you matter, even on bad days, helps you get through them.',
      'Faith should help you feel loved. If it makes you feel scared or judged, that\'s worth talking about.',
      'Noticing what you\'re thankful for is linked to better mood, sleep, and friendships.',
      'Holding onto anger for a long time can weigh on you. Letting go is something you can learn.'
    ],
    trunk: [
      'Knowing what matters to you helps you make choices you feel good about.',
      'Getting better at something takes effort, and being proud of it builds confidence.',
      'Using your strengths to help others gives you a sense of purpose.',
      'Going through the motions can mean you need more of what makes you feel alive.',
      'Working toward something you care about gives your days direction.',
      'Knowing what you care about, not just what others expect, helps you find your own path.'
    ],
    bark: [
      'Having ways to calm down that really work helps you handle stress before it grows.',
      'Talking to yourself kindly after a mistake helps you bounce back faster.',
      'Comparing yourself to edited posts online can make anyone feel worse. Noticing it is the first step.',
      'Saying no to friends when something feels wrong takes courage, and it gets easier with practice.',
      'Talking about what bothers you keeps it from growing bigger inside.',
      'Thoughts that replay over and over can make stress last longer than it needs to.'
    ],
    branches: [
      'Good friends treat you well even when you don\'t agree.',
      'Knowing who you could talk to helps you get help fast if someone treats you badly.',
      'Feeling lonely, even around other kids, is worth sharing with someone you trust.',
      'Bullying in person or online is never your fault, and you don\'t have to handle it alone.',
      'Feeling close to family helps people your age handle stress, school, and friendships.',
      'Belonging to a group gives you people who notice you and cheer you on.'
    ],
    leaves: [
      'Sleep helps you think clearly, feel steady, and get along with people.',
      'Moving most days helps your mood as much as your body.',
      'Stress about food or how you look is common, and talking about it helps.',
      'Planning a way out ahead of time makes it much easier to use when you need it.',
      'Regular meals keep your energy, mood, and focus steady.',
      'Hours of screens can crowd out sleep, moving, and time with people.'
    ],
    fruit: [
      'Something to be excited about helps you get through the slower days.',
      'Believing you can handle hard things, with help, makes them easier to face.',
      'A dream or goal gives you something to grow toward.',
      'Feeling hopeless is important to share, so people who care about you can help.',
      'Helping others builds hope in you, too.',
      'Knowing that hard times can change is a big part of hope.'
    ]
  },
  '8': {
    roots: [
      'Peace deep down helps you stay steady when life gets busy or hard.',
      'Feeling connected to something sacred, in your own way, can give you strength and comfort.',
      'Feeling loved as you are is one of the strongest roots a person can have.',
      'Faith should help you feel loved. If it makes you feel scared, ashamed, or pushed out, that\'s worth talking about.',
      'Quiet time to pray or reflect helps you feel calm and know yourself better.',
      'Feeling empty is worth noticing, because it can mean part of you needs some care.'
    ],
    trunk: [
      'Knowing what you\'d stand up for shows you what you value most.',
      'Strengths that others count on remind you that you have something to give.',
      'Feeling like your days matter helps you keep going when things get hard.',
      'Having to be someone you\'re not to be liked is tiring. The right people like the real you.',
      'A goal and a next step give your days direction.',
      'Spending time only on what others expect can leave you feeling empty. What you care about matters too.'
    ],
    bark: [
      'Noticing stress early lets you do something about it before it piles up.',
      'Learning from failure without hating yourself is a skill that helps for life.',
      'When worry gets in the way of sleep, school, or fun, it\'s worth getting support.',
      'Holding your ground when people push you takes strength, and it gets easier with practice.',
      'Asking for help is a strength, and it gets problems solved faster.',
      'Thoughts that replay over and over can make stress last longer than it needs to.'
    ],
    branches: [
      'Friends who have your back make hard things easier to face.',
      'Knowing who you could talk to helps you get help fast if someone treats you badly.',
      'Feeling lonely, even around people, is worth sharing with someone you trust.',
      'Bullying, threats, or being embarrassed online is never your fault, and you don\'t have to handle it alone.',
      'Staying close to family, even when you disagree, helps you through the teen years.',
      'Belonging somewhere gives you people who notice you and cheer you on.'
    ],
    leaves: [
      'Sleep helps your mood, focus, and how you handle stress.',
      'Feeling okay in your body helps you feel okay in the rest of your life.',
      'Late-night screens can steal the sleep your body and mind need.',
      'Planning a way out ahead of time makes it much easier to use when you need it.',
      'Daylight and fresh air help your sleep, mood, and focus.',
      'Feeling tired all day can mean your body needs more sleep, or better sleep.'
    ],
    fruit: [
      'Looking forward to what\'s next helps you get through changes.',
      'Believing your life can turn out good helps you keep going through hard times.',
      'People who believe in your future help you believe in it too.',
      'Feeling like there\'s no point is important to share, so people who care about you can help.',
      'Kindness that no one sees still grows hope, in you and in others.',
      'Blaming yourself for everything makes hard times heavier than they need to be.'
    ]
  }
};

/* Optional sensitive questions. Off unless a grown-up turns them on.
   [part, index it replaces, question]. Never sent to The Grove. */
const SENSITIVE = {
  '7': ['leaves', 3, ['Has anyone offered you a vape, or pressured you to try one?', 'If yes, stay calm and thank them for telling you. Ask what happened, without a lecture. Practice a few easy ways out together, and let them use you as the excuse.', 'r']],
  '8': ['leaves', 3, ['Has anyone offered you a vape, alcohol, or drugs, or pressured you to try them?', 'If yes, stay calm and thank them for telling you. Ask what happened, without a lecture. Practice a few easy ways out together, and promise a no-questions ride home if they ever need one.', 'r']]
};
const SENSITIVE_WHY = {
  '7': 'This question is optional. It helps your grown-up know if someone has been pressuring you, so they can help.',
  '8': 'This question is optional. It helps your grown-up know if someone has been pressuring you, so they can help.'
};

/* The weekly quick check-in (Rebrand Session 4): question 1 of every part
   (Leaves question 1 is about sleep, so it stands for Rest), plus the Leaves
   questions below where a grade has one. Only questions where "yes" is the
   good answer are tagged, so week to week comparisons read the right way.
   Grade 8 has no movement or food question, so it asks the six. */
const WEEKLY = {
  '6': { move: 1 },
  '7': { move: 1, nourish: 4 },
  '8': {}
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

window.ASPEN_CHECKIN = { weekly: WEEKLY, version: VERSION, bank: BANK, perPart: PER_PART, bankSizes: BANK_SIZES, answers: ANSWERS, levels: LEVELS, grades: GRADES, questions: Q, why: WHY, sensitive: SENSITIVE, sensitiveWhy: SENSITIVE_WHY, safety: SAFETY };
})();
