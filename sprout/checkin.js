/* =====================================================================
   SPROUT CHECKIN . the question bank
   Read by Sprout (/sprout/) and, later, Sprout Guide in the Field Guide.
   Edit questions here, not in index.html.

   The Grounded tree standard, version 1:
   - Six parts in one order: Roots (holy), Trunk (meaning), Bark (mind),
     Branches (community), Leaves (body), Fruit (hope).
   - The number of questions per part fits the stage: Sprout 4, Sapling 6,
     Soul Tree 8, written for each grade or life stage. Sprout asks 4.
   - Every question has a tip for the grown-up or guide, and a short
     "Why this question?" line for the grown-up (WHY).
   - Four answers plus "I don't know." Scores run 1 to 10 for every tool.
   - At least one reverse worded question in every part (marked 'r').
   - Levels: Strong (8 to 10), Steady (5 to 7), Needs care (1 to 4).
   - A safety step fitted to the age, always with 988 and 911.

   Each question: [text, tip] or [text, tip, 'r'] or [text, tip, 'r', flag].
   'r' means "yes" is the hard answer. flag names a sign a grown-up
   should hear about when the answer is yes or sometimes:
   'alone', 'bully', 'hope'.
   ===================================================================== */
(function(){
const VERSION = 1;

const ANSWERS = [
  ['yes', 'Yes, a lot', 3],
  ['some', 'Sometimes', 2],
  ['no', 'Not really', 1],
  ['unsure', "I don't know", null]
];

const LEVELS = [
  ['strong', 'Strong', 8],
  ['steady', 'Steady', 5],
  ['care', 'Needs care', 1]
];

const GRADES = [
  ['K', 'Kindergarten'],
  ['1', 'Grade 1'],
  ['2', 'Grade 2'],
  ['3', 'Grade 3'],
  ['4', 'Grade 4'],
  ['5', 'Grade 5']
];

const Q = {
  K: {
    holy: [
      ['Do you feel loved at home?', 'Ask: "How do you know someone loves you?" Listen for the small things.'],
      ['Do you feel safe when you go to sleep at night?', 'If not, ask what feels scary at night. A night light, a song, or a bedtime prayer can help.'],
      ['Do you have a quiet time, like a prayer or a hug before bed?', 'Share one quiet practice from your own family, like a prayer, a song, or a blessing.'],
      ['Do you feel all alone inside?', 'If yes, stay close and say: "You are not alone. I am right here." Then ask when it feels that way.', 'r', 'alone']
    ],
    meaning: [
      ['Do you like being you?', 'Tell them one thing you love about who they are.'],
      ['Is there something you are good at?', 'Name a strength you have seen, and say when you saw it.'],
      ['Do you get to help at home?', 'Give them one small job this week and thank them for it.'],
      ['Do you wish you were somebody else?', 'If yes, ask gently: "Who would you be?" Listen for what they feel they are missing.', 'r']
    ],
    mind: [
      ['When you feel mad or sad, can you tell a grown-up?', 'Practice naming feelings together when things are calm.'],
      ['Can you calm down after you get upset?', 'Try balloon breaths together: in slow, out slow, three times.'],
      ['Do you know big feelings go away after a while?', 'Say: "Feelings are like weather. They come and they go."'],
      ['Do you feel scared or worried a lot?', 'Ask what the worry is about, and listen before you fix.', 'r']
    ],
    community: [
      ['Do you have a friend to play with?', 'Ask who they like to play with, and why.'],
      ['Is there a grown-up you can go to when you need help?', 'Name their helpers together: at home, at school, and in your community.'],
      ['Are the kids at school kind to you?', 'Ask about recess and lunch. Hard things often happen there.'],
      ['Is someone being mean to you?', 'If yes, listen first and stay calm. Then talk with their teacher.', 'r', 'bully']
    ],
    body: [
      ['Do you sleep well at night?', 'Look at bedtime and screens before bed.'],
      ['Do you get to run and play every day?', 'Plan one way to move and play together this week.'],
      ['Do you eat food that helps you grow strong?', 'Let them help pick a healthy snack.'],
      ['Does your tummy or head hurt a lot?', 'Aches that keep coming back can come from worry or from being sick. Mention them to their doctor.', 'r']
    ],
    hope: [
      ['Is something fun coming up soon?', 'Plan one small, fun thing to look forward to.'],
      ['Are you happy when you wake up in the morning?', 'Ask what makes a good morning for them.'],
      ['Do you have a wish for when you grow up?', 'Ask about their wish and take it seriously.'],
      ['Do you feel like nothing good will happen?', 'If yes, ask gently how they are feeling. If a child ever talks about wanting to die or to be hurt, call their doctor or 988 right away.', 'r', 'hope']
    ]
  },

  1: {
    holy: [
      ['Do you know the people in your family love you?', 'Tell them, in plain words, that you love them and why.'],
      ['Do you feel safe at home?', 'If not, ask what makes home feel unsafe, and listen closely to the answer.'],
      ['Do you ever pray, or sit quietly and feel peaceful?', 'Try one minute of quiet or prayer together, in your family\'s own way.'],
      ['Do you feel lonely, even when people are around?', 'If yes, plan some one on one time this week, just the two of you.', 'r', 'alone']
    ],
    meaning: [
      ['Do you like the way you are?', 'Name something about them that you would never want to change.'],
      ['Is there something you love to do?', 'Ask them to teach you how to do it.'],
      ['Do you feel proud when you try something hard?', 'Praise the trying, not only the result.'],
      ['Do you feel like you are not good at anything?', 'If yes, name two real things you have seen them do well.', 'r']
    ],
    mind: [
      ['Can you say what you are feeling, like mad, sad, or scared?', 'Make a short list of feeling words together and keep it on the fridge.'],
      ['When you get upset, can you calm your body down?', 'Practice a calm-down trick together, like counting to ten or squeezing a pillow.'],
      ['Can you tell a grown-up when something is bothering you?', 'Tell them: "You can always tell me, even the hard stuff."'],
      ['Do your feelings get so big that they are hard to stop?', 'If yes, notice when it happens most, like when tired, hungry, or rushed.', 'r']
    ],
    community: [
      ['Do you have friends at school?', 'Ask them to name a friend and one thing they like about that friend.'],
      ['Do you have grown-ups who listen to you?', 'Put the phone down and give them a few minutes of full attention today.'],
      ['Do you feel like you belong in your class?', 'Ask what makes class feel good or hard for them.'],
      ['Do other kids leave you out or pick on you?', 'If yes, listen first, then let their teacher know.', 'r', 'bully']
    ],
    body: [
      ['Do you feel rested when you wake up?', 'Check bedtime. Most kids this age need ten to twelve hours of sleep.'],
      ['Do you play outside or move your body every day?', 'Find a way to move together, like a walk, a dance, or tag.'],
      ['Do you drink water during the day?', 'Give them a water bottle of their own.'],
      ['Do you feel tired or sick a lot?', 'If yes, keep track for a week and talk with their doctor.', 'r']
    ],
    hope: [
      ['Do you have something to look forward to?', 'Put one fun thing on the calendar and count down together.'],
      ['Do you think tomorrow can be a good day?', 'At bedtime, ask: "What is one good thing that could happen tomorrow?"'],
      ['Do you have a dream of something you want to do someday?', 'Ask about their dream and draw it together.'],
      ['Do you feel sad about what is coming next?', 'If yes, ask what is coming that feels sad. If a child ever talks about wanting to die, call their doctor or 988 right away.', 'r', 'hope']
    ]
  },

  2: {
    holy: [
      ['Do you feel loved by your family, just for being you?', 'Say it out loud: "I love you just for being you, not for what you do."'],
      ['Is there a place where you feel calm and safe?', 'Ask them to describe the place, and help them go there more often.'],
      ['When you are scared, does something help you feel held, like a prayer, a song, or a hug?', 'Ask what helps most on a scary night. Let them know you can be one of those things.'],
      ['Do you feel like nobody really cares about you?', 'If yes, stay close, and tell them who cares about them by name.', 'r', 'alone']
    ],
    meaning: [
      ['Do you feel good about who you are?', 'Share a story of a time they made you proud.'],
      ['Are you getting better at something you practice?', 'Point out how far they have come.'],
      ['Do you feel like you matter in your family?', 'Ask their opinion about a family choice and use it.'],
      ['Do you think other kids are better than you?', 'If yes, ask who they compare themselves to, and why.', 'r']
    ],
    mind: [
      ['Can you name your feelings when they happen?', 'Name your own feelings out loud sometimes. It shows them how.'],
      ['When something goes wrong, can you try again?', 'Tell a story about a time you messed up and tried again.'],
      ['Do you have ways to calm down, like breathing or drawing?', 'Ask which calm-down trick works best for them, and practice it.'],
      ['Do you worry about things a lot?', 'If yes, set a short worry time each day to talk the worries through.', 'r']
    ],
    community: [
      ['Do you have a good friend you can count on?', 'Help them plan time with that friend.'],
      ['Do you feel like you belong at school?', 'Ask where they feel most at home at school, and where they don\'t.'],
      ['Do you help other people or do kind things for them?', 'Notice their kindness and name it.'],
      ['Are kids at school being mean to you or leaving you out?', 'If yes, listen first and stay calm. Then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you go to bed at about the same time each night?', 'A steady bedtime helps sleep more than almost anything else.'],
      ['Do you get to play and move for a good part of the day?', 'Aim for about an hour of active play, in little bits.'],
      ['Does your body feel strong and healthy?', 'Ask what makes their body feel good.'],
      ['Do you spend a lot of time on screens?', 'If yes, plan a screen-free time each day together.', 'r']
    ],
    hope: [
      ['Do you have something fun to look forward to this week?', 'Plan something small and good together.'],
      ['When things go wrong, do you believe they can get better?', 'Tell them about a hard time that got better.'],
      ['Do you have a goal you are working on?', 'Help them break the goal into small steps.'],
      ['Do you sometimes wish tomorrow would not come?', 'Take this seriously. Ask gently what makes tomorrow feel hard. If a child ever talks about wanting to die, call their doctor or 988 right away.', 'r', 'hope']
    ]
  },

  3: {
    holy: [
      ['Do you feel loved, even when you make a mistake?', 'After a mistake, say: "I still love you. Let\'s fix it together."'],
      ['Do you ever notice something amazing, like the sky, a song, or an animal?', 'Ask: "What amazed you lately?" Share one of your own.'],
      ['Do you have something holy that helps you, like prayer, faith, or quiet time?', 'Share a prayer, verse, or practice from your own family.'],
      ['Do you feel all alone with your problems?', 'If yes, say: "You don\'t have to carry this alone." Then ask what is on their mind.', 'r', 'alone']
    ],
    meaning: [
      ['Do you like who you are becoming?', 'Name a way you have seen them grow this year.'],
      ['Is there something you are proud of learning?', 'Ask them to show you.'],
      ['Do you get to help others in ways that matter?', 'Find a way to help someone together this week.'],
      ['Do you feel like you mess everything up?', 'If yes, name things they did right this week. Be specific.', 'r']
    ],
    mind: [
      ['Can you tell when a big feeling is starting in your body?', 'Ask: "Where do you feel mad or worried in your body?"'],
      ['Do you have a way to calm down that works for you?', 'Practice it together when things are calm.'],
      ['Can you talk to someone about your worries?', 'Tell them who they can go to, at home and at school.'],
      ['Do you keep your feelings stuck inside?', 'If yes, try talking side by side, like while driving or drawing. It feels easier.', 'r']
    ],
    community: [
      ['Do you have at least one friend who is glad to see you?', 'Ask about that friend and invite them over.'],
      ['Are there grown-ups at school you can talk to?', 'Help them name one trusted grown-up at school.'],
      ['Do you feel included when kids play or work in groups?', 'Ask how groups get picked, and how that feels.'],
      ['Is someone teasing, bullying, or hurting you?', 'If yes, listen first and thank them for telling. Then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you get enough sleep to feel good the next day?', 'Turn screens off an hour before bed.'],
      ['Do you move and play hard, like running, biking, or sports?', 'Find an active thing they love and make room for it.'],
      ['Do you eat breakfast most mornings?', 'Keep easy breakfasts ready for busy mornings.'],
      ['Do you get stomachaches or headaches a lot?', 'If yes, notice when they happen, like before school or tests, and mention them to their doctor.', 'r']
    ],
    hope: [
      ['Do you have something you are excited about?', 'Ask about it and get excited with them.'],
      ['Do you believe you can get better at hard things?', 'Say: "You can\'t do it yet. Yet is the key word."'],
      ['Do you have a dream for when you are older?', 'Ask what they would need to learn to get there.'],
      ['Do you feel like things will never get better?', 'Take this seriously and keep talking. If a child ever talks about wanting to die or hurting themselves, call their doctor or 988 right away.', 'r', 'hope']
    ]
  },

  4: {
    holy: [
      ['Do you feel like you matter, just for being you?', 'If the answer is "not really," say: "You matter to me, just for being you." Then ask what makes it hard to feel that.'],
      ['Do you feel close to God, or to something good and bigger than you?', 'Ask what they think about God or something bigger. Listen without correcting.'],
      ['When life feels wobbly, does something help you feel steady?', 'Ask what helps them feel steady, and help them use it more.'],
      ['Do you feel empty or alone inside?', 'If yes, spend unhurried time together, and ask gently about it.', 'r', 'alone']
    ],
    meaning: [
      ['Do you know what you are good at?', 'Name one strength and when you saw it.'],
      ['Do you care about something a lot, like animals, art, or helping people?', 'Find a small way to help them do more of it.'],
      ['Do you feel like what you do each day matters?', 'Ask: "What part of your day feels most worth it?"'],
      ['Do you often feel like you are not good enough?', 'If yes, ask where that feeling comes from. Listen before you reassure.', 'r']
    ],
    mind: [
      ['When you are upset, can you figure out why?', 'Help them find the feeling under the feeling, like hurt under anger.'],
      ['Can you calm yourself down before you say or do something you regret?', 'Practice a pause: stop, breathe, then choose.'],
      ['Do you know that it is okay to feel sad or mad sometimes?', 'Say: "All feelings are okay. Some actions are not."'],
      ['Do worries keep you up at night or bother you a lot?', 'If yes, try writing worries down before bed and talking about them in the morning.', 'r']
    ],
    community: [
      ['Do you have friends you can be yourself around?', 'Ask what makes a good friend, and who fits.'],
      ['Do you feel like you belong somewhere, like a team, club, class, or faith group?', 'Help them find one place to belong.'],
      ['Do you stand up for other kids when they are treated badly?', 'Praise courage and kindness when you see it.'],
      ['Is anyone at school or online being mean to you or leaving you out?', 'If yes, listen first and thank them for telling. Then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you feel rested most mornings?', 'Look at bedtime, screens, and worries at night.'],
      ['Do you get outside or move your body every day?', 'Plan active time together, even a short walk.'],
      ['Do you feel okay about your body?', 'Talk about what bodies can do, not how they look.'],
      ['Do you use screens late at night or more than you want to?', 'If yes, set screen rules together and follow them yourself too.', 'r']
    ],
    hope: [
      ['Do you have goals you are working toward?', 'Help them pick one goal and the first step.'],
      ['When something goes wrong, do you believe you can find a way through?', 'Ask how they got through a hard thing before.'],
      ['Are you thankful for good things in your life?', 'Name three good things together at dinner or bedtime.'],
      ['Do you feel hopeless, like nothing will ever change?', 'Take this seriously and keep talking. If a child ever talks about wanting to die or hurting themselves, call their doctor or 988 right away.', 'r', 'hope']
    ]
  },

  5: {
    holy: [
      ['Do you feel loved and accepted for who you really are?', 'Tell them you love the real them, including the parts they hide.'],
      ['Do you have big questions about God, life, or what matters, and someone to ask?', 'Welcome their questions. Saying "I wonder too" is a fine answer.'],
      ['Do you have a practice that helps you feel peaceful, like prayer, nature, music, or quiet?', 'Ask about their practice and make time for it.'],
      ['Do you feel alone with what you are going through?', 'If yes, ask what they are carrying and stay with them while they tell you.', 'r', 'alone']
    ],
    meaning: [
      ['Do you have a good sense of who you are?', 'Ask: "What three words describe you?" Then share three words you would use for them.'],
      ['Are you proud of how you treat other people?', 'Name a time you saw them treat someone well.'],
      ['Do you feel like you have something to give the world?', 'Help them find one way to serve or give this month.'],
      ['Do you compare yourself to others and feel worse?', 'If yes, talk about how social media and comparing can make people feel small.', 'r']
    ],
    mind: [
      ['Can you handle stress, like tests or big changes, without falling apart?', 'Teach one tool for stress, like breathing, a walk, or writing it down.'],
      ['When you feel bad, can you say it in words to someone?', 'Ask open questions, then wait. Silence gives them room.'],
      ['Can you be kind to yourself when you make a mistake?', 'Ask: "What would you say to a friend who made that mistake?"'],
      ['Do you feel stressed or worried most days?', 'If yes, look at what is on their plate and what can come off it.', 'r']
    ],
    community: [
      ['Do you have friends who treat you well?', 'Talk about what healthy friendships feel like.'],
      ['Is there a grown-up you trust enough to tell anything?', 'Help them name that grown-up. It might be you.'],
      ['Do you feel like you fit in with kids your age?', 'Ask where they feel they fit, and where they don\'t.'],
      ['Is anyone bullying you, in person or online?', 'If yes, listen first and thank them for telling. Save any messages, then work with the school.', 'r', 'bully']
    ],
    body: [
      ['Do you get enough sleep to feel good and think clearly?', 'Keep phones and tablets out of the bedroom at night.'],
      ['Do you do something active most days?', 'Help them find a sport or activity they enjoy.'],
      ['Do you eat in a way that gives you energy?', 'Keep it about energy and strength, not weight.'],
      ['Do you worry about how your body looks?', 'If yes, listen without judging, and watch for skipped meals. Talk with their doctor if you are concerned.', 'r']
    ],
    hope: [
      ['Are you looking forward to growing up?', 'Ask what they look forward to most about getting older.'],
      ['Do you believe you can make your life good, even when things are hard?', 'Share a time you got through something hard.'],
      ['Do you have people and plans that make the future feel bright?', 'Make one plan together for something good this month.'],
      ['Do you ever feel like giving up on everything?', 'Take this seriously and keep talking. If a child ever talks about wanting to die or hurting themselves, call their doctor or 988 right away.', 'r', 'hope']
    ]
  }
};

/* Why this question? One line per question, same order as Q, written for the grown-up.
   Shown in With a grown-up mode, next to the tip. */
const WHY = {
  K: {
    holy: [
      'Feeling loved at home is the first root a young child grows.',
      'Feeling safe at bedtime tells you a lot about how safe a young child feels overall.',
      'Small quiet rituals, like a prayer or a hug, help young children feel held.',
      'Young children can feel alone even in a busy home. This helps you hear it early.'
    ],
    meaning: [
      'Liking who they are is the start of a healthy sense of self.',
      'Knowing they\'re good at something builds a young child\'s confidence.',
      'Helping at home gives young children a sense that they belong and matter.',
      'Wishing to be someone else can point to something a child feels they are missing.'
    ],
    mind: [
      'Telling a grown-up about big feelings is the first step in handling them.',
      'Calming down after being upset is a skill young children are just learning.',
      'Knowing feelings pass helps young children feel less scared of them.',
      'Lots of worry at this age is worth noticing, so you can help early.'
    ],
    community: [
      'A friend to play with helps young children learn to get along and share.',
      'Knowing who to go to for help is one of the most important safety skills for young children.',
      'Kind classmates help a young child feel safe at school.',
      'Young children may not say on their own that someone is being mean. Asking gently helps.'
    ],
    body: [
      'Sleep shapes a young child\'s mood, behavior, and growth.',
      'Running and playing every day helps young bodies and moods.',
      'Good food helps young children grow and have energy to play.',
      'Tummy aches and headaches that keep coming back can be a sign of worry, not only sickness.'
    ],
    hope: [
      'Something fun to look forward to helps young children feel hopeful.',
      'Waking up happy is a simple window into how a young child is doing.',
      'Wishes for growing up show that a child can picture a good future.',
      'A young child who expects nothing good to happen may need extra care and attention.'
    ]
  },
  '1': {
    holy: [
      'Knowing they are loved helps children feel secure enough to grow.',
      'Feeling safe at home is the base everything else grows from.',
      'Prayer or quiet time can help children feel peaceful and connected.',
      'Children can feel lonely even when people are around. This question helps you hear it.'
    ],
    meaning: [
      'Liking the way they are helps children feel confident and secure.',
      'Something they love to do gives children joy and a sense of who they are.',
      'Feeling proud after trying something hard builds a child\'s grit.',
      'Feeling not good at anything is worth hearing early, before it sticks.'
    ],
    mind: [
      'Naming feelings helps children understand and handle them.',
      'Calming their body down is a skill that helps children for life.',
      'Telling a grown-up when something bothers them keeps small problems small.',
      'Feelings that are hard to stop can mean a child needs more tools, or more support.'
    ],
    community: [
      'Friends at school help children feel happy and safe there.',
      'Grown-ups who listen help children feel valued.',
      'Feeling like they belong in class helps children learn and enjoy school.',
      'Being left out or picked on is painful, and young children don\'t always say so on their own.'
    ],
    body: [
      'Waking up rested is a good sign that sleep is working.',
      'Moving every day supports a child\'s body, mood, and focus.',
      'Drinking water during the day helps energy and focus.',
      'Feeling tired or sick a lot is worth noticing, and worth mentioning to their doctor.'
    ],
    hope: [
      'Something to look forward to helps children feel hopeful.',
      'Believing tomorrow can be good helps children bounce back from hard days.',
      'Dreams of what they want to do show a child picturing a good future.',
      'Sadness about what is coming next can point to a worry worth talking about.'
    ]
  },
  '2': {
    holy: [
      'Feeling loved just for being themselves is one of the strongest roots a child can have.',
      'A calm, safe place gives children somewhere to settle when life feels big.',
      'Something that helps them feel held when scared gives children comfort and courage.',
      'Feeling that nobody cares is painful and important to hear right away.'
    ],
    meaning: [
      'Feeling good about who they are helps children try new things.',
      'Getting better with practice teaches children that effort pays off.',
      'Feeling like they matter in their family helps children feel secure.',
      'Thinking others are better can start early. Hearing it helps you respond with care.'
    ],
    mind: [
      'Naming feelings as they happen helps children manage them.',
      'Trying again after something goes wrong builds resilience.',
      'Having ways to calm down gives children tools for hard moments.',
      'A lot of worry at this age is worth noticing, so you can help early.'
    ],
    community: [
      'A friend they can count on helps children feel safe and happy.',
      'Feeling like they belong at school helps children learn and enjoy it.',
      'Helping others builds kindness and a sense of purpose.',
      'Being treated badly or left out at school is something children need help with.'
    ],
    body: [
      'A steady bedtime helps children sleep better.',
      'Lots of play and movement helps children\'s bodies and moods.',
      'Feeling strong and healthy helps children feel good about their bodies.',
      'Lots of screen time can crowd out sleep, play, and time with people.'
    ],
    hope: [
      'Something fun this week gives children something to look forward to.',
      'Believing things can get better helps children handle disappointment.',
      'Working on a goal teaches children that they can make things happen.',
      'Wishing tomorrow would not come can be a sign of real worry or sadness. Take it seriously.'
    ]
  },
  '3': {
    holy: [
      'Feeling loved even after a mistake teaches children that love isn\'t earned.',
      'Noticing amazing things builds wonder, one of the deepest roots of spiritual health.',
      'Something holy, like prayer, faith, or quiet time, can help children feel steady.',
      'Feeling alone with problems means a child may need help reaching out.'
    ],
    meaning: [
      'Liking who they are becoming helps children grow with confidence.',
      'Being proud of learning something builds motivation.',
      'Helping in ways that matter gives children a sense of purpose.',
      'Feeling like they mess everything up is harsh self-talk worth gently challenging.'
    ],
    mind: [
      'Noticing a big feeling early helps children catch it before it takes over.',
      'A calm-down tool that works gives children confidence in hard moments.',
      'Talking about worries keeps them from growing bigger inside.',
      'Keeping feelings stuck inside can make them heavier over time.'
    ],
    community: [
      'A friend who is glad to see them helps a child feel wanted.',
      'Grown-ups at school they can talk to give children another safe place.',
      'Feeling included in groups helps children feel they belong.',
      'Teasing, bullying, or being hurt is never okay, and children need grown-ups to know.'
    ],
    body: [
      'Enough sleep helps children feel and learn their best the next day.',
      'Hard play builds strong bodies and helps with stress.',
      'Breakfast helps children focus and have energy at school.',
      'Stomachaches and headaches that keep coming back can be a sign of worry, not only sickness.'
    ],
    hope: [
      'Something to be excited about helps children feel hopeful.',
      'Believing they can get better at hard things builds a growth mindset.',
      'Dreams for when they\'re older help children picture a good future.',
      'Feeling like things will never get better is worth taking seriously.'
    ]
  },
  '4': {
    holy: [
      'Feeling that they matter just for being themselves is one of the strongest roots a child can have.',
      'Feeling close to God, or to something good and bigger, can give children comfort and meaning.',
      'Something that helps them feel steady gives children a place to stand when life feels wobbly.',
      'Feeling empty or alone inside is worth hearing and gently exploring.'
    ],
    meaning: [
      'Knowing their strengths helps children feel capable.',
      'Caring about something a lot gives children a sense of purpose.',
      'Feeling that their days matter helps children stay motivated.',
      'Often feeling not good enough is worth hearing early, before it becomes how they see themselves.'
    ],
    mind: [
      'Figuring out why they\'re upset helps children solve the problem underneath.',
      'Calming down before acting helps children avoid regrets.',
      'Knowing sad and mad are okay helps children accept their feelings.',
      'Worries that keep children up at night are worth talking about.'
    ],
    community: [
      'Friends they can be themselves around help children feel accepted.',
      'Belonging to a team, club, class, or faith group gives children support beyond home.',
      'Standing up for others builds courage and kindness.',
      'Meanness at school or online is never okay, and children need grown-ups to know.'
    ],
    body: [
      'Feeling rested most mornings is a good sign that sleep is working.',
      'Moving every day helps children\'s bodies and moods.',
      'Feeling okay about their body matters more at this age than many grown-ups realize.',
      'Late-night screens can steal sleep children need.'
    ],
    hope: [
      'Working toward goals gives children a sense of direction.',
      'Believing they can find a way through builds resilience.',
      'Gratitude helps children notice the good in their lives.',
      'Feeling hopeless is serious and worth talking about right away.'
    ]
  },
  '5': {
    holy: [
      'Feeling loved and accepted as they really are helps children grow strong roots.',
      'Big questions are a healthy part of growing up, and having someone to ask helps.',
      'A peaceful practice gives children a way to find calm on their own.',
      'Feeling alone with what they\'re going through means a child may need help reaching out.'
    ],
    meaning: [
      'A good sense of who they are helps children handle peer pressure.',
      'Being proud of how they treat others builds strong character.',
      'Feeling they have something to give helps children find purpose.',
      'Comparing themselves to others and feeling worse often starts around this age.'
    ],
    mind: [
      'Handling stress without falling apart is a key skill for the middle school years.',
      'Putting bad feelings into words helps children get support.',
      'Being kind to themselves after mistakes helps children learn and bounce back.',
      'Stress or worry most days is worth noticing, so you can help early.'
    ],
    community: [
      'Friends who treat them well help children through the changes ahead.',
      'A grown-up they trust with anything is one of the strongest protections a child can have.',
      'Feeling they fit in matters a lot at this age.',
      'Bullying in person or online is never okay, and children need grown-ups to know.'
    ],
    body: [
      'Enough sleep helps children feel good and think clearly.',
      'Being active most days helps children\'s bodies and moods.',
      'Eating for energy keeps the focus on strength, not looks.',
      'Worries about how they look often start around this age. Hearing them early helps.'
    ],
    hope: [
      'Looking forward to growing up helps children face changes ahead.',
      'Believing they can make life good helps children keep going through hard times.',
      'People and plans that make the future feel bright give children hope.',
      'Feeling like giving up is serious and worth talking about right away.'
    ]
  }
};

// The safety step. Feeling safe for every grade; the gentle direct question for grades 3 to 5 only.
const SAFETY = {
  young: [
    ['Is anyone hurting you, or making you feel scared?', 'safe']
  ],
  older: [
    ['Is anyone hurting you, or making you feel unsafe at home, at school, or online?', 'safe'],
    ['Sometimes when kids feel really sad, they wish they were not alive, or they think about hurting themselves. Have you felt like that?', 'self']
  ],
  answers: [['yes', 'Yes'], ['no', 'No'], ['unsure', 'Not sure']],
  intro: 'Two last questions. These help grown-ups keep kids safe.',
  introYoung: 'One last question. It helps grown-ups keep kids safe.'
};

window.SPROUT_CHECKIN = { version: VERSION, answers: ANSWERS, levels: LEVELS, grades: GRADES, questions: Q, why: WHY, safety: SAFETY };
})();
