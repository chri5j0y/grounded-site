/* =====================================================================
   GROW WITH GROUNDED LEARN: lessons for the tree apps (shared/learn-lessons.js)
   Read by the Learn tab in Maple, Aspen, Oak, Willow, and The Grove (shared/gg-learn.js).
   Each app has tracks (series), each track has lessons, each lesson has scenes. Scene kinds and
   fields are listed at the top of gg-learn.js. A series of three or more lessons earns a
   Certificate of Completion when every lesson is finished (cert: false turns that off, cert: true
   turns it on for a shorter series). certTitle and certLine set the words on the certificate.
   Series grow deeper with the age and stage: short and simple in Maple, deepest in Willow.
   Started with one Start Here lesson per app (Learn build, October 2026); the full series plug in here.
   Willow Learn (October 2026): Support for Right Now (8 videos, kind: 'support'), For You (3), and
   For the People Who Love Them (6). From the Bedside scenes retell published Grounded stories (with a
   link) or unpublished ones with names and details changed (no link).
   Willow Learn, premium (GWG BLD 728): Using Willow (7) and The Six Parts (6) added, For You grown to 6, and
   Start Here and For the People Who Love Them rebuilt at full length.
   The Grove Learn (GWG BLD 730): Using The Grove (7), The Six Parts, Together (6), and Do This Together (8 short videos
   for the whole family) join the Welcome.
   Wording rules: no em dashes or en dashes, positive frames, Title Case for names of things.
   ===================================================================== */
window.GG_LEARN = {
  /* Maple Learn and Aspen Learn (GWG BLD 729): Start Here, Using the app, The Six Parts, For Grown-ups, and Support for Right Now.
     Generated from patches/bld729/source in grounded-workshop. */
  maple: {
 "title": "Learn Maple",
 "intro": "Short lessons to watch together, narrated aloud. Kids and grown-ups can watch side by side.",
 "supportFirst": true,
 "support": {
  "eyebrow": "Support",
  "title": "Support for Right Now",
  "intro": "Short videos to use in the middle of a hard moment. Open one anytime, as often as you need. Nothing to finish."
 },
 "lessonsTitle": "Learn Step by Step",
 "tracks": [
  {
   "id": "maple-start",
   "title": "Start Here",
   "who": "For kids and the grown-ups who help them",
   "lessons": [
    {
     "id": "mp-welcome",
     "n": 1,
     "title": "Welcome to Maple",
     "mins": 3,
     "blurb": "Meet your tree, its six parts, and how Maple works for kids and grown-ups.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Start Here, Lesson 1",
       "h": "Welcome to Maple",
       "sub": "Bright leaves, strong roots.",
       "say": "Welcome to Maple! Maple is for kids in kindergarten through fifth grade, and for the grown-ups who love them. Let us take a look around."
      },
      {
       "k": "big",
       "h": "Every kid is growing like a little tree.",
       "sub": "Six parts make a kid whole.",
       "say": "Every kid is growing like a little tree. You grow a little bit every day, even when you cannot see it. And a whole tree needs all six of its parts."
      },
      {
       "k": "six",
       "h": "The six parts of your tree",
       "words": [
        "Feeling safe and loved",
        "What makes you you",
        "Big feelings",
        "Your people",
        "Sleep, food, and play",
        "Looking forward"
       ],
       "say": "Here are the six parts. Roots are feeling safe and loved. Your trunk is what makes you you. Bark is for big feelings. Branches are your people. Leaves are sleep, food, and play. And fruit is looking forward to good things."
      },
      {
       "k": "big",
       "h": "Be a tree!",
       "sub": "Roots down. Branches up.",
       "beats": [
        "Let us be a tree right now.",
        "Sit up tall, or stand up tall, like a strong trunk.",
        "Press your feet down into the floor, like roots.",
        "Reach your arms up high, like branches.",
        {
         "t": "Now wiggle your fingers like leaves in the wind, and take one big, slow breath.",
         "w": 10
        }
       ],
       "say": "Let us be a tree right now. Sit up tall, or stand up tall, like a strong trunk. Press your feet down into the floor, like roots. Reach your arms up high, like branches. Now wiggle your fingers like leaves in the wind, and take one big, slow breath."
      },
      {
       "k": "flow",
       "h": "How Maple works",
       "steps": [
        [
         "Check in",
         "Questions for each part"
        ],
        [
         "See the weather",
         "Sunny, cloudy, or rainy"
        ],
        [
         "Practice a little",
         "Small things each day"
        ],
        [
         "Watch it grow",
         "A new ring each check-in"
        ]
       ],
       "say": "Here is how Maple works. First, you check in. You answer a few questions for each part. Then you see the weather on your tree. Next, you practice a little each day. And you watch your tree grow, with a new ring for every check-in."
      },
      {
       "k": "card",
       "title": "How are we doing this?",
       "body": "Pick one. Then type your first name and pick your grade.",
       "fields": [
        [
         "What's your first name?",
         "Sam"
        ],
        [
         "What grade are you in?",
         "Grade 2"
        ]
       ],
       "btns": [
        "On my own",
        "With a grown-up"
       ],
       "tap": 1,
       "say": "To start, Maple asks, how are we doing this? You can pick On my own, or With a grown-up. Then you type your first name and pick your grade. The questions are written just for your grade."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "My Kids",
        "When Life Changes",
        "Grown-up Guide",
        "Learn"
       ],
       "tap": 0,
       "note": {
        "h": "Check-in",
        "p": "Start here. Your tree and your check-ins live here too."
       },
       "say": "Along the top are the tabs. Check-in is where you start. When Life Changes and the Grown-up Guide are for grown-ups. My Kids shows up when a grown-up is helping. And Learn is where you are right now."
      },
      {
       "k": "points",
       "h": "For grown-ups",
       "items": [
        [
         "Grown-up Guide",
         "A tip and conversation starters for every part"
        ],
        [
         "When Life Changes",
         "Guides for hard talks, like a pet dying"
        ],
        [
         "Private by design",
         "Everything stays on this device"
        ]
       ],
       "say": "For grown-ups, the Grown-up Guide has tips and conversation starters for every part. When Life Changes has guides for hard talks, from a pet dying to scary news. And everything stays on this device. Nothing is sent to Grounded or anyone else."
      },
      {
       "k": "big",
       "h": "Maple is made to do together.",
       "sub": "The best part happens after the screen.",
       "say": "Maple is made to do together. The best part happens after the screen, when a kid and a grown-up talk about the weather on their tree."
      },
      {
       "k": "quiz",
       "q": "How many parts does your tree have?",
       "opts": [
        "Three",
        "Six",
        "Ten"
       ],
       "right": 1,
       "why": "Roots, Trunk, Bark, Branches, Leaves, and Fruit. All six make you whole.",
       "say": "Quick question. How many parts does your tree have?"
      }
     ]
    }
   ]
  },
  {
   "id": "maple-using",
   "title": "Using Maple",
   "who": "Every part of Maple, step by step",
   "certTitle": "Maple: Using Maple",
   "certLine": "For finishing every lesson on using Maple, step by step.",
   "lessons": [
    {
     "id": "mp-u-checkin",
     "n": 1,
     "title": "Your First Check-in",
     "mins": 4,
     "blurb": "How a Maple check-in works, one part at a time.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 1",
       "h": "Your First Check-in",
       "sub": "Six parts, one at a time.",
       "say": "Everything in Maple starts with a check-in. This lesson shows you what happens, step by step, so you know just what to expect."
      },
      {
       "k": "card",
       "title": "Let's check on your tree!",
       "body": "Pick On my own or With a grown-up.",
       "fields": [
        [
         "What's your first name?",
         "Sam"
        ],
        [
         "What grade are you in?",
         "Grade 1"
        ]
       ],
       "btns": [
        "Start my check-in"
       ],
       "tap": 0,
       "say": "First, pick On my own, or With a grown-up. Type your first name, and tap your grade. Then tap Start my check-in."
      },
      {
       "k": "flow",
       "h": "One part at a time",
       "steps": [
        [
         "Learn",
         "What this part does for a tree, and for you"
        ],
        [
         "Answer",
         "Four short questions"
        ],
        [
         "Next",
         "On to the next part"
        ]
       ],
       "say": "Your check-in goes one part at a time, from roots to fruit. For each part, you learn what it does for a tree, and what it does for you. Then you answer four short questions. Then you tap Next."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Part 3 of 6: Bark",
       "rows": [
        [
         "Can you calm down after you get upset?",
         ""
        ],
        [
         "Yes, a lot",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "I don't know",
         ""
        ]
       ],
       "tap": 2,
       "say": "Here is a question from Bark. Can you calm down after you get upset? Every question has the same answers. Yes, a lot. Sometimes. Not really. And I do not know."
      },
      {
       "k": "big",
       "h": "Every honest answer is a good answer.",
       "sub": "\"I don't know\" is always okay.",
       "beats": [
        "Let us practice one question together.",
        "Do you have a friend to play with?",
        "You could say yes, a lot.",
        "Or sometimes, or not really, or I do not know.",
        {
         "t": "Say your answer out loud right now.",
         "w": 8
        }
       ],
       "say": "Let us practice one question together. Do you have a friend to play with? You could say yes, a lot. Or sometimes, or not really, or I do not know. Say your answer out loud right now."
      },
      {
       "k": "points",
       "h": "Helpers on every page",
       "items": [
        [
         "Read Aloud",
         "Maple reads the questions to you"
        ],
        [
         "Skip",
         "Pass on any part"
        ],
        [
         "Back",
         "Go back and change an answer"
        ]
       ],
       "say": "There are helpers on every page. Tap Read Aloud, and Maple reads the questions to you. It starts on for kindergarten through second grade. Tap Skip to pass on a part. And tap Back to change an answer."
      },
      {
       "k": "big",
       "h": "Your tree grows as you go.",
       "sub": "One new piece for every part.",
       "say": "Watch your tree while you go. Each time you finish a part, a new piece of your tree grows. Roots, then a trunk, then bark, branches, leaves, and fruit."
      },
      {
       "k": "points",
       "h": "With a grown-up",
       "items": [
        [
         "A Grown-up tip",
         "Under every question"
        ],
        [
         "Why this question?",
         "Tap to see why it matters"
        ],
        [
         "Sit close",
         "And talk about it together"
        ]
       ],
       "say": "When a grown-up is helping, they see a Grown-up tip under every question. They can tap Why this question? to learn why it matters. The best thing a grown-up can do is sit close, and talk about it together."
      },
      {
       "k": "points",
       "h": "Staying safe",
       "items": [
        [
         "Almost done",
         "One or two last questions"
        ],
        [
         "Yes, No, or Not sure",
         "Answer what is true"
        ],
        [
         "Tell a grown-up",
         "Someone you trust can help"
        ]
       ],
       "say": "At the end comes Staying safe. It asks whether anyone is hurting you or making you feel scared. Older kids get one more gentle question about very sad feelings. If you answer yes, or not sure, Maple thanks you for telling, and asks you to show a grown-up you trust today, like a parent, a teacher, or a school counselor. You are not in trouble. Telling is brave."
      },
      {
       "k": "points",
       "h": "To have a good check-in",
       "items": [
        [
         "Find a cozy spot",
         "About 10 to 15 minutes"
        ],
        [
         "Go with your first answer",
         "No need to think too hard"
        ],
        [
         "Take your time",
         "There is no rush"
        ]
       ],
       "say": "A few tips. Find a cozy spot. A check-in takes about ten to fifteen minutes. Go with your first answer. And take your time. When you finish, tap See my tree."
      },
      {
       "k": "quiz",
       "q": "What can you say if you are not sure?",
       "opts": [
        "I don't know",
        "Nothing, you have to guess",
        "Yes, a lot, every time"
       ],
       "right": 0,
       "why": "I don't know is an honest answer, and it is always okay.",
       "say": "Quick question. What can you say if you are not sure?"
      }
     ]
    },
    {
     "id": "mp-u-weather",
     "n": 2,
     "title": "Your Tree and Its Weather",
     "mins": 3,
     "blurb": "What sunny, partly cloudy, and rainy mean, and what to do next.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 2",
       "h": "Your Tree and Its Weather",
       "sub": "Sunny, cloudy, or rainy.",
       "say": "When your check-in is done, you get to see your whole tree. This lesson is about reading the weather on it."
      },
      {
       "k": "points",
       "h": "Three kinds of weather",
       "items": [
        [
         "Sunny",
         "This part is growing strong",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "This part is holding on and growing",
         "#7D6B57"
        ],
        [
         "Rainy",
         "This part could use extra tending",
         "#3D5A73"
        ]
       ],
       "say": "Each part of your tree gets its own weather. Sunny means that part is growing strong. Partly cloudy means it is holding on, and still growing. And rainy means that part could use a little extra tending right now."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Great job, Sam!",
       "rows": [
        [
         "Roots",
         "Sunny",
         "#C07A26"
        ],
        [
         "Trunk",
         "Sunny",
         "#C07A26"
        ],
        [
         "Bark",
         "Partly cloudy",
         "#7D6B57"
        ],
        [
         "Branches",
         "Sunny",
         "#C07A26"
        ],
        [
         "Leaves",
         "Rainy",
         "#3D5A73"
        ],
        [
         "Fruit",
         "Partly cloudy",
         "#7D6B57"
        ]
       ],
       "tap": 4,
       "panel": {
        "h": "Leaves",
        "sub": "Rain waters leaves too.",
        "items": [
         "Rest",
         "Water",
         "Play"
        ]
       },
       "say": "Here is a whole tree. Next to each part is its weather, and a kind word. For a rainy Leaves part, Maple says, rain waters leaves too. Rest, water, and play will help you feel better."
      },
      {
       "k": "big",
       "h": "Rainy days add rings too.",
       "sub": "Weather comes and goes.",
       "say": "Rainy days are okay. Every tree gets rain, and rain helps trees grow. Rainy days add rings too. Weather comes and goes, and you are still you."
      },
      {
       "k": "points",
       "h": "A few more things to know",
       "items": [
        [
         "Skipped a part?",
         "It is still a seed, and that is okay"
        ],
        [
         "A few rainy parts?",
         "Show your tree to a grown-up you trust"
        ],
        [
         "Save my tree",
         "Keep a picture of it"
        ]
       ],
       "say": "If you skipped a part, Maple says that part is still a seed, and that is okay. If a few parts are rainy, Maple asks you to show your tree to a grown-up you trust. And tap Save my tree to keep a picture of it."
      },
      {
       "k": "big",
       "h": "What is your weather today?",
       "sub": "Sunny, cloudy, rainy, or stormy.",
       "beats": [
        "Let us try a weather check right now.",
        "Close your eyes, or look down at your hands.",
        "What is the weather inside you today?",
        "Sunny, cloudy, rainy, or stormy?",
        {
         "t": "Say your weather word out loud.",
         "w": 8
        }
       ],
       "say": "Let us try a weather check right now. Close your eyes, or look down at your hands. What is the weather inside you today? Sunny, cloudy, rainy, or stormy? Say your weather word out loud."
      },
      {
       "k": "big",
       "h": "Feelings Weather is a practice in Bark.",
       "sub": "Ready for your growth plan.",
       "say": "Nice job. That is called Feelings Weather. It is a practice in Bark, and you can pick it for your growth plan."
      },
      {
       "k": "points",
       "h": "Then and now",
       "items": [
        [
         "Your last tree",
         "And your tree today"
        ],
        [
         "Side by side",
         "On your next check-in"
        ],
        [
         "Look how you grew!",
         "Maple points out each change"
        ]
       ],
       "say": "On your next check-in, Maple shows your last tree and your new tree, side by side. When a part gets sunnier, Maple says, look how your bark grew! Or your roots, or your fruit."
      },
      {
       "k": "levels",
       "levels": [
        [
         "Sunny",
         "Strong",
         "#5F7D48"
        ],
        [
         "Partly cloudy",
         "Steady",
         "#8B5E1A"
        ],
        [
         "Rainy",
         "Growing Edge",
         "#B8612F"
        ]
       ],
       "say": "For grown-ups, the weather matches the levels in every Grounded tree. Sunny is Strong. Partly cloudy is Steady. And rainy is a Growing Edge, a part to tend."
      },
      {
       "k": "points",
       "h": "For grown-ups",
       "items": [
        [
         "Open For grown-ups",
         "Under the tree"
        ],
        [
         "Levels and every answer",
         "Plus any part that was skipped"
        ],
        [
         "Be curious, not worried",
         "\"Tell me about that rain cloud\""
        ]
       ],
       "say": "Under the tree, open the box called For grown-ups. You will see each level, every answer, and any part that was skipped. Then be curious, not worried. Tell me about that rain cloud opens more doors than, what is wrong?"
      },
      {
       "k": "quiz",
       "q": "What does a rainy part mean?",
       "opts": [
        "You did something wrong",
        "That part could use extra tending right now",
        "Your tree is broken"
       ],
       "right": 1,
       "why": "Rain helps trees grow. A rainy part is a part to tend, and weather comes and goes.",
       "say": "Quick question. What does a rainy part mean?"
      }
     ]
    },
    {
     "id": "mp-u-today",
     "n": 3,
     "title": "Today, Plan, and Season",
     "mins": 4,
     "blurb": "Pick practices, tend your tree each day, and watch your seasons grow.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 3",
       "h": "Today, Plan, and Season",
       "sub": "A little each day adds up.",
       "say": "After your check-in, tap Go to my tree. Your tree has five tabs of its own. This lesson shows you how they work together."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Sam's tree",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 3,
       "note": {
        "h": "Growth Plan",
        "p": "Pick things to practice for each part of your tree."
       },
       "say": "Start with Growth Plan. This is where you pick things to practice for each part of your tree. Parts with rain or clouds come first, marked Suggested for you."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Growth Plan: Bark",
       "rows": [
        [
         "Balloon Breaths",
         "Picked",
         "#5F7D48"
        ],
        [
         "Feelings Weather",
         "Picked",
         "#5F7D48"
        ],
        [
         "Calm Corner",
         ""
        ],
        [
         "Worry Box",
         ""
        ],
        [
         "Show Me Others",
         ""
        ]
       ],
       "tap": 2,
       "say": "Tap a practice to pick it. About three for each part is a good start, and a few more for a part with clouds or rain. Tap Show Me Others to see more. You can even type your own idea, and tap Add mine. Then tap Save my plan."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Sam's tree",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 0,
       "note": {
        "h": "Today",
        "p": "Your practices for today. Check off one, and your tree is watered."
       },
       "say": "Now your practices show up in Today. Do one, then tap its circle to check it off. Any one practice waters your tree for the day."
      },
      {
       "k": "points",
       "h": "Little helpers in Today",
       "items": [
        [
         "Easier today",
         "A smaller way to do it"
        ],
        [
         "How to do this",
         "The steps, one by one"
        ],
        [
         "Add a note",
         "A few words about how it went"
        ]
       ],
       "say": "Each practice has little helpers. On a tired day, tap Easier today for a smaller way to do it. Tap How to do this to see the steps. And tap Add a note to write how it went."
      },
      {
       "k": "big",
       "h": "Good morning, tree!",
       "sub": "A stretch in the morning. A good thing at bedtime.",
       "beats": [
        "Let us try a morning stretch right now.",
        "Stand up tall, like a tree.",
        "Reach your arms up high to the sky.",
        {
         "t": "Now stretch as tall as you can, and say good morning to your day.",
         "w": 8
        }
       ],
       "say": "Let us try a morning stretch right now. Stand up tall, like a tree. Reach your arms up high to the sky. Now stretch as tall as you can, and say good morning to your day."
      },
      {
       "k": "points",
       "h": "Your tree in Today",
       "items": [
        [
         "Bright leaves",
         "One for each part you tend today"
        ],
        [
         "Days Tended",
         "Every day you practiced"
        ],
        [
         "Rings",
         "One for every check-in"
        ]
       ],
       "say": "Today has a morning stretch at the top, and a good thing to share at bedtime at the bottom. Your tree grows a bright leaf for each part you tend today. And you can count your Days Tended and your Rings."
      },
      {
       "k": "big",
       "h": "Your tree is always happy when you come back.",
       "sub": "Missed a few days? One practice wakes it up.",
       "say": "If you miss a few days, your tree gets a little dry, and it rests. It never goes away. Do one practice, and it starts to wake up. Your tree is always happy when you come back."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Sam's tree",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 1,
       "note": {
        "h": "Week",
        "p": "A theme, a short check-in, and a question to think about."
       },
       "say": "Each week brings a new theme, a short check-in with one question for each part, and a question to think about. What you write is just for you, unless you choose to share it with your grown-up."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Sam's tree",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 2,
       "note": {
        "h": "Season",
        "p": "Twelve weeks: Planting, Rooting, and Blooming."
       },
       "say": "A season is twelve weeks of tending, from Planting, to Rooting, to Blooming. Every full check-in adds a ring to your tree, and you can check in anytime. Tap How I have grown to see your tree change."
      },
      {
       "k": "quiz",
       "q": "What waters your tree for the day?",
       "opts": [
        "Checking off any one practice",
        "Doing every practice",
        "A new check-in"
       ],
       "right": 0,
       "why": "Any one practice waters your tree. One is enough.",
       "say": "Quick question. What waters your tree for the day?"
      }
     ]
    },
    {
     "id": "mp-u-changes",
     "n": 4,
     "title": "When Life Changes",
     "mins": 4,
     "blurb": "Guides and short videos for the hard talks, for kids and the grown-ups beside them.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 4",
       "h": "When Life Changes",
       "sub": "How to show up.",
       "say": "Sometimes life changes all at once for a child. A pet dies. A family moves. Scary news comes on. When Life Changes helps you find the words, and this lesson shows you how it works."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "When Life Changes",
        "Grown-up Guide",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "When Life Changes",
        "p": "More than 50 guides for hard talks with kids."
       },
       "say": "Tap the When Life Changes tab. It has more than fifty guides for parents, guardians, and teachers. You can also reach it from Guides, inside your child's tree."
      },
      {
       "k": "points",
       "h": "Guides in groups",
       "items": [
        [
         "Inside Me",
         "Worry, anger, sadness, feeling different"
        ],
        [
         "Close to Home",
         "Loss, health, and family changes"
        ],
        [
         "School and Community",
         "Friends, classrooms, neighbors"
        ],
        [
         "Country, World, and Safety",
         "Big news, and the first minutes"
        ]
       ],
       "say": "The guides come in groups. Inside Me, for feelings that live inside a child. Close to Home, for loss, illness, and changes at home. School and community, for friends, classrooms, and the town around you. And country, world, and safety, for big news, and for the first minutes when something scary happens."
      },
      {
       "k": "card",
       "title": "Search",
       "body": "Type what is happening in your own words.",
       "fields": [
        [
         "Search",
         "pet died"
        ]
       ],
       "btns": [
        "Search"
       ],
       "tap": 0,
       "result": "A pet died",
       "say": "Or just search, in your own words. Type pet died, or moving, and Maple finds the guide."
      },
      {
       "k": "flow",
       "h": "Read it two ways",
       "steps": [
        [
         "Quick Reference",
         "Read it right before you talk"
        ],
        [
         "Talking It Through",
         "The full guide, step by step"
        ]
       ],
       "say": "Each guide starts as a card. The card is a quick reference to read right before a hard talk. Tap Talking It Through for the full guide."
      },
      {
       "k": "points",
       "h": "Inside a full guide",
       "items": [
        [
         "What this can look like",
         "For grades K to 2, and 3 to 5"
        ],
        [
         "How to start",
         "Words you can say"
        ],
        [
         "Questions kids often ask",
         "With gentle answers"
        ],
        [
         "When to reach out",
         "And where to get more help"
        ]
       ],
       "say": "Inside, you'll see what this can look like for younger and older kids. How to start, with words you can say. Questions kids often ask, with gentle answers. And when to reach out for more help. There's a part on faith and the holy too, for all faith traditions and everything in-between."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "A Pet Died",
       "rows": [
        [
         "Watch: For You",
         ""
        ],
        [
         "Watch: For the Grown-up",
         ""
        ],
        [
         "Quick Reference",
         ""
        ],
        [
         "Talking It Through",
         ""
        ]
       ],
       "tap": 1,
       "panel": {
        "h": "Two short videos",
        "sub": "A few minutes each, read aloud.",
        "items": [
         "For You: for the child",
         "For the Grown-up: for you"
        ]
       },
       "say": "More and more guides have two short videos at the top. Watch: For You is for the child going through it. Watch: For the Grown-up is for you, the parent or helper beside them. Each one is a few minutes long, and read aloud."
      },
      {
       "k": "points",
       "h": "A way to use them",
       "items": [
        [
         "Watch yours first",
         "On your own, when you can"
        ],
        [
         "Then watch together",
         "Sit close and pause anytime"
        ],
        [
         "Talk after",
         "Ask what they noticed"
        ]
       ],
       "say": "Here's one way to use them. Watch For the Grown-up first, on your own. Then watch For You together, sitting close. Pause anytime. And talk after. Ask what they noticed."
      },
      {
       "k": "points",
       "h": "In the Learn tab too",
       "items": [
        [
         "When Life Changes",
         "Every video, in groups"
        ],
        [
         "A quiet check",
         "For each one you watched"
        ],
        [
         "Open the Full Guide",
         "Right from the last scene"
        ]
       ],
       "say": "You'll find every one of these videos in the Learn tab too, under When Life Changes. There's no quiz. A quiet check marks the ones you've watched. And at the end, Open the Full Guide takes you right back to the guide."
      },
      {
       "k": "big",
       "h": "Start with one change.",
       "sub": "Name it, then find its guide.",
       "beats": [
        "Let's try it.",
        "Take one slow breath.",
        "Now think of one change your child is facing right now, big or small.",
        {
         "t": "Say it out loud in a word or two, like a move, a new baby, or a pet who died.",
         "w": 10
        }
       ],
       "say": "Let's try it. Take one slow breath. Now think of one change your child is facing right now, big or small. Say it out loud in a word or two, like a move, a new baby, or a pet who died."
      },
      {
       "k": "big",
       "h": "You don't need perfect words.",
       "sub": "Being close and honest helps most.",
       "say": "Now you know where to look. Find that guide when you're ready. You don't need perfect words. Being close and honest helps most."
      },
      {
       "k": "quiz",
       "q": "Who is the For You video made for?",
       "opts": [
        "The child going through it",
        "Teachers only",
        "The doctor"
       ],
       "right": 0,
       "why": "For You speaks to the child. For the Grown-up speaks to you.",
       "say": "Quick question. Who is the For You video made for?"
      }
     ]
    },
    {
     "id": "mp-u-guide",
     "n": 5,
     "title": "The Grown-up Guide",
     "mins": 4,
     "blurb": "What is inside the Grown-up Guide, and how to use it after a check-in.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 5",
       "h": "The Grown-up Guide",
       "sub": "For parents, guardians, and teachers.",
       "say": "Maple is made for kids, and for the grown-ups who love them. This lesson is for you, the grown-up. It walks through the Grown-up Guide."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "When Life Changes",
        "Grown-up Guide",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Grown-up Guide",
        "p": "How Maple works, and how to talk about it."
       },
       "say": "Tap the Grown-up Guide tab. You can also tap I'm a grown-up at the top of Maple, or the Grown-up Guide button under Guides in your child's tree."
      },
      {
       "k": "points",
       "h": "What Maple is",
       "items": [
        [
         "A gentle check-in",
         "Not a test, and no wrong answers"
        ],
        [
         "Kids see weather",
         "Sunny, partly cloudy, or rainy"
        ],
        [
         "Grown-ups see a level",
         "Strong, Steady, or Growing Edge"
        ]
       ],
       "say": "The guide starts with what Maple is. It's a gentle check-in, not a test, and no answer is wrong. Kids see their tree and its weather. Grown-ups also see a simple level for each part. Strong, Steady, or Growing Edge. So you know where to lean in."
      },
      {
       "k": "points",
       "h": "How a check-in works",
       "items": [
        [
         "On my own, or With a grown-up",
         "With a grown-up adds a tip each time"
        ],
        [
         "Questions for each grade",
         "Kindergarten to grade 5"
        ],
        [
         "Four short questions a part",
         "Any part can be skipped"
        ],
        [
         "A short safety step",
         "Help is shown right away"
        ]
       ],
       "say": "Next, how a check-in works. A child picks On my own, or With a grown-up. With a grown-up adds a short tip under every question. Each grade has its own questions. Each part has four short questions, and any part can be skipped. At the end there's a short safety step. If a child answers yes or not sure, Maple shows them a calm card with help, and shows you what to do next."
      },
      {
       "k": "points",
       "h": "Talking about answers",
       "items": [
        [
         "Be curious",
         "Wonder with them"
        ],
        [
         "Listen more than you fix",
         "Kids often just need to be heard"
        ],
        [
         "Take their weather seriously",
         "Even if it seems small"
        ],
        [
         "Share a little of yours",
         "Everyone has rainy days"
        ]
       ],
       "say": "The most important part of Maple happens after the screen. Be curious. Listen more than you fix. Take their weather seriously, even if it seems small to you. And share a little of your own weather, so they know everyone has rainy days."
      },
      {
       "k": "words",
       "h": "Try a curious question",
       "items": [
        "Tell me about that rain cloud."
       ],
       "sub": "A curious question opens doors.",
       "beats": [
        "Let's practice one.",
        "Picture your child beside you, looking at a rainy part of their tree.",
        {
         "t": "Now say it out loud, in your kindest voice: Tell me about that rain cloud.",
         "w": 8
        }
       ],
       "say": "Let's practice one. Picture your child beside you, looking at a rainy part of their tree. Now say it out loud, in your kindest voice: Tell me about that rain cloud."
      },
      {
       "k": "flow",
       "h": "For each of the six parts",
       "steps": [
        [
         "Conversation starters",
         "Easy questions to ask"
        ],
        [
         "Why this works",
         "In plain words"
        ],
        [
         "If it's rainy",
         "What to try next"
        ]
       ],
       "say": "The Six Parts section goes one part at a time. Each part has conversation starters. A short note on why this works. And what to try if that part is rainy."
      },
      {
       "k": "points",
       "h": "For home and for school",
       "items": [
        [
         "Parents and guardians",
         "Pick an unhurried moment, stay close"
        ],
        [
         "Your family's faith",
         "Share what holds you, if you like"
        ],
        [
         "Teachers",
         "One child at a time, a shared device"
        ]
       ],
       "say": "There are tips for parents and guardians, like picking an unhurried moment and staying close. Roots leaves room for each family to share what holds them, from prayer to quiet. And there are tips for teachers, who use Maple with one child at a time."
      },
      {
       "k": "points",
       "h": "When to reach out",
       "items": [
        [
         "Rain that lasts",
         "More than a couple of weeks"
        ],
        [
         "Big changes",
         "In joy, sleep, eating, or school"
        ],
        [
         "Someone hurting them",
         "Or being mean to them"
        ],
        [
         "Talk of wanting to die",
         "Call or text 988. Danger: 911"
        ]
       ],
       "say": "The guide also says when to reach out to someone you trust, like a pastor, a teacher, a school counselor, or your child's doctor. If rainy weather lasts more than a couple of weeks. If joy, sleep, eating, or schoolwork change a lot. Or if a child says someone is hurting them. If a child ever talks about wanting to die, take it seriously. Call their doctor, or call or text nine eight eight, any time. If someone is in danger, call nine one one."
      },
      {
       "k": "card",
       "title": "The Grown-up Guide",
       "body": "Keep a copy on paper, or share it with a teacher.",
       "btns": [
        "Save or print this guide"
       ],
       "tap": 0,
       "say": "Want it on paper? Tap Save or print this guide, and keep a copy on the fridge, or share it with a teacher."
      },
      {
       "k": "quiz",
       "q": "Which question opens more doors with a child?",
       "opts": [
        "What's wrong?",
        "Tell me about that rain cloud.",
        "Why did you answer that?"
       ],
       "right": 1,
       "why": "A curious question invites a child to share.",
       "say": "Quick question. Which question opens more doors with a child?"
      }
     ]
    },
    {
     "id": "mp-u-kids",
     "n": 6,
     "title": "My Kids, Private and Saved",
     "mins": 4,
     "blurb": "The My Kids tab, Kids profiles with a picture code, who sees what, and keeping a backup.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Using Maple, Lesson 6",
       "h": "My Kids, Private and Saved",
       "sub": "Every child gets their own tree.",
       "say": "Every child gets their own tree in Maple. This last lesson shows where those trees live, how they stay private, and how to keep them safe."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "My Kids",
        "When Life Changes",
        "Grown-up Guide",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "My Kids",
        "p": "Every child's tree, saved on this device."
       },
       "say": "On the Check-in tab, pick With a grown-up, and a My Kids tab appears. Every child's tree saves there, on this device. Tap a name to open their tree, growth plan, and check-ins."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "My Kids",
       "rows": [
        [
         "Maya",
         "Grade 2"
        ],
        [
         "Sam",
         "Kindergarten"
        ],
        [
         "Save everyone to a file",
         ""
        ],
        [
         "Restore from a file",
         ""
        ]
       ],
       "tap": 0,
       "panel": {
        "h": "On each child's card",
        "items": [
         "Their grade",
         "Their last check-in",
         "Weather for each part"
        ]
       },
       "say": "Each child's card shows their grade, their last check-in, and the weather for each part. Brothers and sisters each get their own tree, saved by first name."
      },
      {
       "k": "card",
       "title": "Save Maya's tree",
       "body": "A Kids profile keeps a tree locked with a secret picture code.",
       "btns": [
        "Save Maya's tree",
        "Not Now"
       ],
       "tap": 0,
       "say": "After a first check-in, a new tree is kept only until the page closes. To keep it, tap Save, with the child's name. That gives them a Kids profile, locked with a secret picture code. A grown-up makes their own profile first, then checks a box to agree."
      },
      {
       "k": "big",
       "h": "Tap three pictures. That's your code.",
       "sub": "A fox, an owl, a bee, a sunflower, and more.",
       "beats": [
        "Kids, let's try it in your head.",
        "Pick three pictures you like, in an order you'll remember.",
        {
         "t": "Keep them secret, and say them to yourself one more time.",
         "w": 10
        }
       ],
       "say": "Kids, let's try it in your head. Pick three pictures you like, in an order you'll remember. Keep them secret, and say them to yourself one more time."
      },
      {
       "k": "points",
       "h": "Who can open a tree",
       "items": [
        [
         "The child",
         "With their own picture code"
        ],
        [
         "Grown-ups who agreed",
         "With their own passcode"
        ],
        [
         "Whose tree today?",
         "Pick a name on the Check-in tab"
        ]
       ],
       "say": "Here's how the code works. Tap your three pictures twice, the same way, and you're set. The child opens their tree with their picture code. The grown-ups who agreed can always open it too, with their own passcode. And on the Check-in tab, Whose tree today shows every child's name, ready to tap."
      },
      {
       "k": "points",
       "h": "What your grown-up can see",
       "items": [
        [
         "Always shown",
         "If you need help, so they can help"
        ],
        [
         "The big picture",
         "Check-ins, tree, days tended"
        ],
        [
         "Just yours",
         "The weekly thoughts you write"
        ]
       ],
       "say": "Tap the picture at the top of a tree to open Settings. There, kids can read what their grown-up can see. Always shown: if you say someone is hurting you or scaring you, that someone is being mean to you, that you feel alone inside, or that you don't want tomorrow to come, your grown-up sees it so they can help. The big picture: your check-ins, your tree, and the days you tended it. And just yours: the weekly thoughts you write. You can share one with your grown-up anytime."
      },
      {
       "k": "big",
       "h": "Everything stays on this device.",
       "sub": "Nothing is sent to Grounded or anyone else.",
       "say": "Everything in Maple stays on this device. Nothing is sent to Grounded, or to anyone else."
      },
      {
       "k": "points",
       "h": "Keep a backup",
       "items": [
        [
         "Save everyone to a file",
         "In the My Kids tab"
        ],
        [
         "Back up everything",
         "In the profile menu, still locked"
        ],
        [
         "Restore or load",
         "On a new device, or after a reset"
        ]
       ],
       "say": "Because everything lives in this browser, clearing it or switching devices would erase it. So save a file now and then. In My Kids, tap Save everyone to a file. Or open the profile menu at the top of the page, and tap Back up everything. That saves one file with every profile, each one still locked. On a new device, tap Restore from a file, or Load a backup, and the trees come back."
      },
      {
       "k": "big",
       "h": "You know Maple now. Go grow together.",
       "sub": "A little at a time, side by side.",
       "say": "That's the whole tour. You know Maple now. Go grow together, a little at a time."
      },
      {
       "k": "quiz",
       "q": "Who can open a child's Kids profile?",
       "opts": [
        "Anyone who picks up the device",
        "The child, and the grown-ups who agreed",
        "Only Grounded"
       ],
       "right": 1,
       "why": "The child uses their picture code. Grown-ups who agreed use their own passcode.",
       "say": "Last question. Who can open a child's Kids profile?"
      }
     ]
    }
   ]
  },
  {
   "id": "maple-six",
   "title": "The Six Parts",
   "who": "One lesson for each part of a kid's tree, with something to try",
   "certTitle": "Maple: The Six Parts",
   "certLine": "For finishing every lesson on the six parts of a kid's tree.",
   "lessons": [
    {
     "id": "mp-6-roots",
     "n": 1,
     "title": "Roots: Feeling Safe and Loved",
     "mins": 4,
     "blurb": "Feeling safe and loved, and what holds you close.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 1",
       "h": "Roots",
       "sub": "Feeling safe and loved.",
       "say": "This lesson is about Roots. Roots are about feeling safe and loved."
      },
      {
       "k": "big",
       "h": "Roots hold a tree tight.",
       "sub": "You can't see them. They are always working.",
       "say": "Roots hold a tree tight. They grow deep underground, where they find water. You can't see them, and they are always working. Your roots work the same way. They hold you when things feel wobbly."
      },
      {
       "k": "points",
       "h": "Roots can look like",
       "items": [
        [
         "Feeling loved",
         "Just for being you"
        ],
        [
         "Feeling safe",
         "At home and at bedtime"
        ],
        [
         "Quiet times",
         "A prayer, a song, a hug"
        ],
        [
         "Wonder",
         "The sky, a song, an animal"
        ]
       ],
       "say": "Roots can look like feeling loved, just for being you. Feeling safe, at home and when you go to sleep. Quiet times, like a prayer, a song, or a hug before bed. And wonder, when the sky or an animal makes you say wow."
      },
      {
       "k": "points",
       "h": "Every family has its own ways",
       "items": [
        [
         "Some pray",
         "Or go to worship together"
        ],
        [
         "Some sit quietly",
         "Or sing, or walk outside"
        ],
        [
         "Some keep traditions",
         "A special meal, a blessing"
        ]
       ],
       "say": "Every family has its own ways. Some families pray, or go to worship together. Some sit quietly, or sing, or take a walk outside. Some share a special meal or a blessing. Ask your grown-up what your family does. All of these can help roots grow deep."
      },
      {
       "k": "points",
       "h": "Roots weather",
       "items": [
        [
         "Sunny",
         "I know I am loved.",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "My roots are holding on.",
         "#7D6B57"
        ],
        [
         "Rainy",
         "I feel alone inside.",
         "#3D5A73"
        ]
       ],
       "say": "After a check-in, your roots get their weather. Sunny might mean you know you are loved. Partly cloudy might mean your roots are holding on. Rainy might mean you feel alone inside. Even in the rain, roots keep reaching down. You are loved, even today."
      },
      {
       "k": "big",
       "h": "Feel alone inside? Tell a grown-up.",
       "sub": "You are not in trouble. They want to know.",
       "say": "If you feel all alone inside, tell a grown-up you trust. A parent, a grandparent, a teacher, or your school counselor. You are not in trouble. They want to know, and they can stay close."
      },
      {
       "k": "points",
       "h": "Practice: My Safe Place",
       "items": [
        [
         "Get comfy",
         "Close your eyes if you like"
        ],
        [
         "Picture a safe place",
         "Where you feel calm and happy"
        ],
        [
         "Look around",
         "What do you see and hear?"
        ],
        [
         "Keep it with you",
         "Visit any time you feel scared"
        ]
       ],
       "cue": {
        "w": {
         "2": 4,
         "3": 8,
         "7": 10
        },
        "at": [
         2,
         3,
         5,
         9
        ]
       },
       "say": "Let's try one from Maple. It is called My Safe Place. Get comfy, and close your eyes if you like. Now picture a place where you feel safe and calm. Maybe your bed, a grandparent's kitchen, or a spot outside. Look around your safe place. What do you see? What do you hear? Now open your eyes. Your safe place stays with you, and you can visit it any time you feel scared."
      },
      {
       "k": "points",
       "h": "For grown-ups",
       "items": [
        [
         "Say it plainly",
         "\"I love you just for being you.\""
        ],
        [
         "Share your family's way",
         "A prayer, a verse, a quiet practice"
        ],
        [
         "Welcome big questions",
         "\"I wonder too\" is a fine answer"
        ]
       ],
       "say": "For grown-ups. Say it in plain words: I love you just for being you. Share a prayer, a verse, or a quiet practice from your own family's way. And welcome their big questions. I wonder too is a fine answer. When you check in With a grown-up, a Grown-up tip shows under every question."
      },
      {
       "k": "big",
       "h": "Strong roots hold you up.",
       "sub": "Pick it for your growth plan.",
       "say": "Strong roots hold you up, even on rainy days. After your check-in, tap Make My Growth Plan. You can pick My Safe Place, Wonder Walk, or Bedtime Blessing."
      },
      {
       "k": "quiz",
       "q": "What do roots help you feel?",
       "opts": [
        "Fast and strong",
        "Safe and loved",
        "Sleepy"
       ],
       "right": 1,
       "why": "Roots hold you tight, so you feel safe and loved.",
       "say": "Quick question. What do roots help you feel?"
      }
     ]
    },
    {
     "id": "mp-6-trunk",
     "n": 2,
     "title": "Trunk: What Makes You You",
     "mins": 3,
     "blurb": "What you love, what you are good at, and how you help.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 2",
       "h": "Trunk",
       "sub": "What makes you you.",
       "say": "This lesson is about your Trunk. Your trunk is what makes you you."
      },
      {
       "k": "big",
       "h": "The trunk helps a tree stand tall.",
       "sub": "It grows a new ring every year.",
       "say": "The trunk helps a tree stand tall. And every year, it grows a new ring. You grow too. Every day, you are becoming more you."
      },
      {
       "k": "points",
       "h": "Your trunk is",
       "items": [
        [
         "What you love to do",
         "Drawing, building, animals"
        ],
        [
         "What you are good at",
         "And getting better at"
        ],
        [
         "How you help",
         "At home and at school"
        ]
       ],
       "say": "Your trunk is what you love to do, like drawing, building, or caring for animals. It is what you are good at, and what you are getting better at. And it is how you help, at home and at school."
      },
      {
       "k": "big",
       "h": "There is only one you!",
       "sub": "Trying hard things makes your trunk strong.",
       "say": "There is only one you! And here is something about trunks. Trying something hard makes your trunk stronger, even before you get it right."
      },
      {
       "k": "points",
       "h": "Trunk weather",
       "items": [
        [
         "Sunny",
         "I like being me.",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "I am growing a new ring.",
         "#7D6B57"
        ],
        [
         "Rainy",
         "I wish I were someone else.",
         "#3D5A73"
        ]
       ],
       "say": "After a check-in, your trunk gets its weather. Sunny might mean you like being you. Partly cloudy might mean you are growing a new ring. Rainy might mean you wish you were someone else, or you feel like you are not good at anything. Rainy days add rings too. You matter just the way you are."
      },
      {
       "k": "points",
       "h": "Practice: Proud Jar",
       "items": [
        [
         "Think back",
         "Over your day or your week"
        ],
        [
         "Find one proud moment",
         "Big or small"
        ],
        [
         "Say it out loud",
         "\"I am proud that I...\""
        ],
        [
         "Keep it",
         "Write it down, drop it in a jar"
        ]
       ],
       "cue": {
        "w": {
         "3": 6,
         "6": 8
        },
        "at": [
         2,
         3,
         5,
         8
        ]
       },
       "say": "Let's try one from Maple. It is called Proud Jar. Think back over your day, or your week. Find one thing you did that made you proud. It can be big or small, like helping a friend or trying a hard puzzle. Now say it out loud. Start with the words, I am proud that I. Nice! You can write each one down and drop it in a jar."
      },
      {
       "k": "points",
       "h": "For grown-ups",
       "items": [
        [
         "Name a real strength",
         "\"You didn't give up when...\""
        ],
        [
         "Praise the trying",
         "Not only the result"
        ],
        [
         "Give a small job",
         "And thank them for it"
        ]
       ],
       "say": "For grown-ups. Name one strength you have really seen, like, you were kind when, or you did not give up when. Praise the trying, not only the result. And give them a small job that matters, then thank them for it. When a grown-up names a strength, a child starts to see it too."
      },
      {
       "k": "big",
       "h": "You are becoming more you every day.",
       "sub": "Pick it for your growth plan.",
       "say": "You are becoming more you every day. After your check-in, tap Make My Growth Plan. You can pick Proud Jar, Strength Detective, or Helper Job."
      },
      {
       "k": "quiz",
       "q": "What makes your trunk stronger?",
       "opts": [
        "Being the best at everything",
        "Trying hard things",
        "Never making mistakes"
       ],
       "right": 1,
       "why": "Trying hard things helps your trunk grow, even before you get it right.",
       "say": "Quick question. What makes your trunk stronger?"
      }
     ]
    },
    {
     "id": "mp-6-bark",
     "n": 3,
     "title": "Bark: Big Feelings",
     "mins": 4,
     "blurb": "Naming big feelings and calming down.",
     "sources": [
      "lieberman",
      "siegel"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 3",
       "h": "Bark",
       "sub": "Big feelings.",
       "say": "This lesson is about Bark. Your bark helps you with big feelings, like mad, sad, and scared."
      },
      {
       "k": "big",
       "h": "Bark keeps a tree safe.",
       "sub": "When it gets a scrape, it grows back.",
       "say": "Bark keeps a tree safe. And when a tree gets a scrape, its bark slowly grows back over it. Your bark is how you handle big feelings. It can heal and grow strong too."
      },
      {
       "k": "big",
       "h": "Feelings are like weather.",
       "sub": "They come, and they go.",
       "say": "Here is something to remember. Feelings are like weather. They come, and they go. All feelings are okay to feel, mad, sad, scared, and glad."
      },
      {
       "k": "points",
       "h": "Strong bark can look like",
       "items": [
        [
         "Naming feelings",
         "\"I feel mad.\" \"I feel worried.\""
        ],
        [
         "Calming down",
         "Slow breaths, a pillow hug"
        ],
        [
         "Telling someone",
         "A grown-up you trust"
        ],
        [
         "Trying again",
         "After something goes wrong"
        ]
       ],
       "say": "Strong bark can look like naming your feelings, like, I feel mad, or I feel worried. Calming your body down, with slow breaths or a pillow hug. Telling a grown-up when something is bothering you. And trying again after something goes wrong."
      },
      {
       "k": "points",
       "h": "Bark weather",
       "items": [
        [
         "Sunny",
         "I can calm down.",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "My bark is healing.",
         "#7D6B57"
        ],
        [
         "Rainy",
         "My feelings get too big.",
         "#3D5A73"
        ]
       ],
       "say": "After a check-in, your bark gets its weather. Sunny might mean you can calm down when you are upset. Partly cloudy might mean your bark is healing and growing. Rainy might mean your feelings get too big, too fast, or you worry a lot. Big feelings are okay. Naming them is how bark grows strong."
      },
      {
       "k": "points",
       "h": "Practice: Name It to Tame It",
       "items": [
        [
         "Stop for a moment",
         "Feet still, hands still"
        ],
        [
         "Find the feeling",
         "Where is it in your body?"
        ],
        [
         "Say its name",
         "\"I feel worried.\""
        ],
        [
         "Notice",
         "Did it get a little smaller?"
        ]
       ],
       "cue": {
        "w": {
         "6": 6,
         "8": 8
        },
        "at": [
         2,
         4,
         7,
         9
        ]
       },
       "say": "Let's try one from Maple. It is called Name It to Tame It. First, stop for a moment. Keep your feet still and your hands still. Now think of a feeling you have right now, or one from today. Where do you feel it in your body? Your tummy, your chest, or your hands? Now say its name out loud. You might say, I feel mad, or I feel worried, or I feel happy. Did the feeling get a little smaller? Naming a feeling can help it calm down."
      },
      {
       "k": "big",
       "h": "Feelings too big? Tell a grown-up.",
       "sub": "A parent, a teacher, or your school counselor.",
       "say": "If your feelings feel too big, or a worry won't go away, tell a grown-up you trust. A parent, a grandparent, a teacher, or your school counselor. You are not in trouble. Grown-ups want to help."
      },
      {
       "k": "points",
       "h": "For grown-ups",
       "items": [
        [
         "Name your own feelings",
         "Out loud. It shows them how."
        ],
        [
         "Practice when calm",
         "So they are ready when things are not"
        ],
        [
         "Listen before you fix",
         "Ask what the worry is about"
        ]
       ],
       "say": "For grown-ups. Name your own feelings out loud sometimes. It shows them how. Practice calm-down tricks when things are calm, so they are ready when things are not. And when they worry, ask what the worry is about, and listen before you fix. If big feelings or worries keep showing up for weeks, talk with your child's doctor or school counselor."
      },
      {
       "k": "big",
       "h": "Big feelings are okay.",
       "sub": "Pick it for your growth plan.",
       "say": "Big feelings are okay, and you can learn to handle them. After your check-in, tap Make My Growth Plan. You can pick Name It to Tame It, Shake It Out, or Calm Corner."
      },
      {
       "k": "quiz",
       "q": "What are feelings like?",
       "opts": [
        "Rocks that never move",
        "Weather that comes and goes",
        "Homework due tomorrow"
       ],
       "right": 1,
       "why": "Feelings come and go, like weather. All feelings are okay.",
       "say": "Quick question. What are feelings like?"
      }
     ]
    },
    {
     "id": "mp-6-branches",
     "n": 4,
     "title": "Branches: Your People",
     "mins": 4,
     "blurb": "Family, friends, and helpers, and how to reach out.",
     "sources": [
      [
       "Layous and colleagues, kindness counts: prosocial behavior in preadolescents (2012)",
       ""
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 4",
       "h": "Branches",
       "sub": "Your people.",
       "say": "This lesson is about Branches. Your branches are your people."
      },
      {
       "k": "big",
       "h": "Branches reach out wide.",
       "sub": "And give birds a place to rest.",
       "say": "Look at a tree. Its branches reach out wide, and they give birds a place to rest. You reach out too. Your branches are your people: family, friends, teachers, and neighbors."
      },
      {
       "k": "points",
       "h": "Your people can be",
       "items": [
        [
         "Family",
         "At home, near or far"
        ],
        [
         "Friends",
         "Someone glad to see you"
        ],
        [
         "Helpers",
         "A teacher, a coach, a neighbor"
        ],
        [
         "You!",
         "You help others too"
        ]
       ],
       "say": "Your people can be family, the ones at home and the ones far away, like a grandparent or a cousin. Friends, someone who is glad to see you. Helpers, like a teacher, a coach, or a neighbor. And you! Branches reach both ways. You help other people too."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Check-in: Branches",
       "rows": [
        [
         "Do you have a friend to play with?",
         ""
        ],
        [
         "Yes, a lot",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "I don't know",
         ""
        ]
       ],
       "tap": 1,
       "say": "In a check-in, Maple asks four questions about your branches. Like, do you have a friend to play with? Is there a grown-up you can go to when you need help? You can answer yes, a lot. Sometimes. Not really. Or I do not know. Every answer is okay."
      },
      {
       "k": "points",
       "h": "Weather for your branches",
       "items": [
        [
         "Sunny",
         "Full of people who love you",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "Growing. Keep reaching out.",
         "#7D6B57"
        ],
        [
         "Rainy",
         "Your people want to help",
         "#3D5A73"
        ]
       ],
       "say": "Then your branches get their weather. Sunny means your branches are full of people who love you. Partly cloudy means your branches are growing, so keep reaching out. And rainy? Rain helps branches grow. Your people want to help you."
      },
      {
       "k": "big",
       "h": "Someone being mean? Tell a grown-up.",
       "sub": "Telling is brave. You are not in trouble.",
       "say": "Sometimes branches have a hard day. Maybe you feel left out. Maybe someone is being mean to you. Here is what to do. Tell a safe grown-up, like a parent, a grandparent, a teacher, or a school counselor. Telling is brave, and you are not in trouble. If you tell Maple that someone is being mean to you, your grown-up sees it, so they can help."
      },
      {
       "k": "points",
       "h": "Practice: My People Tree",
       "items": [
        [
         "Picture a big tree",
         "With lots of branches"
        ],
        [
         "Put your people on it",
         "Say their names"
        ],
        [
         "Find your helper",
         "Give them a star"
        ]
       ],
       "cue": {
        "w": {
         "4": 12,
         "7": 6
        },
        "at": [
         2,
         3,
         5
        ]
       },
       "say": "Let us try one together. It is called My People Tree. Picture a big tree with lots of branches. Now put your people on it, one on each branch. Say their names out loud. Last, find your helper. Who is one person you can go to for help? Put a star by them."
      },
      {
       "k": "big",
       "h": "Small kind things help branches grow.",
       "sub": "Kindness Three and Ask to Play are in your plan.",
       "say": "Here is something neat. Kids who do small kind things on purpose often feel closer to the people around them. So try Kindness Three. Do three kind things this week, and tell your grown-up. Or try Ask to Play, and ask someone new to play with you. You will find these, and My People Tree, when you pick things to practice in your plan."
      },
      {
       "k": "big",
       "h": "Reach out, and your branches grow.",
       "sub": "Grown-ups: ask who they would go to for help.",
       "say": "Grown-ups, here is a good question for tonight. Who would you go to if you needed help? Listen for the names. If someone is being mean, listen first and stay calm, then work with the school. Reach out a little every day, and branches grow."
      },
      {
       "k": "quiz",
       "q": "If someone is being mean to you, what can you do?",
       "opts": [
        "Keep it a secret",
        "Tell a safe grown-up",
        "Be mean back"
       ],
       "right": 1,
       "why": "Telling a safe grown-up is brave, and you are not in trouble.",
       "say": "Quick question. If someone is being mean to you, what can you do?"
      }
     ]
    },
    {
     "id": "mp-6-leaves",
     "n": 5,
     "title": "Leaves: Sleep, Food, and Play",
     "mins": 4,
     "blurb": "Move, rest, and nourish, so your whole tree has energy.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 5",
       "h": "Leaves",
       "sub": "Sleep, food, and play.",
       "say": "This lesson is about Leaves. Your leaves are your body."
      },
      {
       "k": "big",
       "h": "Leaves soak up sunshine.",
       "sub": "And turn it into food for the whole tree.",
       "say": "Leaves soak up sunshine and turn it into food for the whole tree. Your body is a little like that. When your body gets what it needs, all of you has more energy to learn, to play, and to handle hard days."
      },
      {
       "k": "flow",
       "h": "Three ways to tend Leaves",
       "steps": [
        [
         "Move",
         "Run, dance, and play"
        ],
        [
         "Rest",
         "Sleep and quiet breaks"
        ],
        [
         "Nourish",
         "Water and good food"
        ]
       ],
       "say": "Maple tends leaves in three ways. Move, like running, dancing, and playing. Rest, like a good night of sleep, and quiet breaks. And nourish, like water, and food that helps you grow strong."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Check-in: Leaves",
       "rows": [
        [
         "Do you sleep well at night?",
         ""
        ],
        [
         "Yes, a lot",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "I don't know",
         ""
        ]
       ],
       "tap": 1,
       "say": "In a check-in, Maple asks about your leaves. Do you sleep well at night? Do you get to run and play every day? Do you eat food that helps you grow strong? And does your tummy or your head hurt a lot?"
      },
      {
       "k": "points",
       "h": "Weather for your leaves",
       "items": [
        [
         "Sunny",
         "Green and bright",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "A little more rest and play",
         "#7D6B57"
        ],
        [
         "Rainy",
         "Rest, water, and play help",
         "#3D5A73"
        ]
       ],
       "say": "Then your leaves get their weather. Sunny means your leaves are green and bright. Your body is getting what it needs. Partly cloudy means a little more rest and play will help. And rainy? Rain waters leaves too. Rest, water, and play will help you feel better."
      },
      {
       "k": "big",
       "h": "Tummy or head hurt a lot? Tell a grown-up.",
       "sub": "Feelings can show up in your body too.",
       "say": "Did you know feelings can show up in your body? A worry can feel like a tummy ache. So if your tummy or your head hurts a lot, tell your grown-up. They can help you figure it out, and they can talk with your doctor."
      },
      {
       "k": "points",
       "h": "Practice: Animal Moves",
       "items": [
        [
         "Hop like a frog",
         "Big hops"
        ],
        [
         "Stomp like a bear",
         "Stomp, stomp, stomp"
        ],
        [
         "Flap like a bird",
         "Wings out wide"
        ],
        [
         "Slow like a turtle",
         "Slow, slower, still"
        ]
       ],
       "cue": {
        "w": {
         "3": 5,
         "4": 5,
         "5": 5,
         "8": 4,
         "10": 5
        },
        "at": [
         3,
         4,
         5,
         6
        ]
       },
       "say": "Let us move! Stand up if you can. If you are sitting, use your arms. Hop like a frog. Stomp like a bear. Flap like a bird, with your wings out wide. Now slow down, like a sleepy turtle. Slower. And still. Notice your body. How does it feel now?"
      },
      {
       "k": "big",
       "h": "Little bits add up.",
       "sub": "Animal Moves and more are in your plan.",
       "say": "Little bits add up. Dance to one song. Take a few sips of water. Turn screens off before bed, and pick a calm bedtime story. You will find Animal Moves, Water Check, and Screens Off, Lights Low when you pick things to practice in your plan."
      },
      {
       "k": "big",
       "h": "Grown-ups: start with the simple things.",
       "sub": "Bedtime, screens, water, and time outside.",
       "say": "Grown-ups, when leaves are rainy, start with the simple things. Bedtime, screens before bed, water, and time outside. Talk about what bodies can do, not how they look. And aches that keep coming back are worth mentioning to their doctor."
      },
      {
       "k": "quiz",
       "q": "Maple tends Leaves in three ways. What are they?",
       "opts": [
        "Move, Rest, Nourish",
        "Run, Win, Score",
        "Sit, Watch, Snack"
       ],
       "right": 0,
       "why": "Move, Rest, and Nourish keep your leaves green and bright.",
       "say": "Quick question. Maple tends Leaves in three ways. What are they?"
      }
     ]
    },
    {
     "id": "mp-6-fruit",
     "n": 6,
     "title": "Fruit: Looking Forward",
     "mins": 4,
     "blurb": "Hope, and the good things still to come.",
     "sources": [
      "snyder"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "The Six Parts, Lesson 6",
       "h": "Fruit",
       "sub": "Looking forward.",
       "say": "This last lesson is about Fruit. Your fruit is hope: the good things you are looking forward to."
      },
      {
       "k": "big",
       "h": "Fruit holds seeds for new trees.",
       "sub": "Hope holds good things still to come.",
       "say": "Fruit holds seeds, so new trees can grow someday. Hope is like that. It holds the good things that are still coming. And fruit grows from the whole tree. Roots, trunk, bark, branches, and leaves all help it grow."
      },
      {
       "k": "points",
       "h": "Hope can look like",
       "items": [
        [
         "Something fun coming",
         "A visit, a trip, a birthday"
        ],
        [
         "A good tomorrow",
         "One good thing that could happen"
        ],
        [
         "A dream",
         "Something to do someday"
        ],
        [
         "Trying again",
         "Hard things can get better"
        ]
       ],
       "say": "Hope can look like something fun coming up, like a visit, a trip, or a birthday. A good tomorrow, and one good thing that could happen. A dream, something you want to do someday. And trying again, because hard things can get better."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Check-in: Fruit",
       "rows": [
        [
         "Is something fun coming up soon?",
         ""
        ],
        [
         "Yes, a lot",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "I don't know",
         ""
        ]
       ],
       "tap": 0,
       "say": "In a check-in, Maple asks about your fruit. Is something fun coming up soon? Do you have a wish for when you grow up? Answer what feels true. Every answer helps your grown-up know you better."
      },
      {
       "k": "points",
       "h": "Weather for your fruit",
       "items": [
        [
         "Sunny",
         "Bright and full of seeds",
         "#C07A26"
        ],
        [
         "Partly cloudy",
         "Ripening. Hope is growing.",
         "#7D6B57"
        ],
        [
         "Rainy",
         "Good days are still ahead",
         "#3D5A73"
        ]
       ],
       "say": "Then your fruit gets its weather. Sunny means your fruit is bright and full of seeds. Good things are coming! Partly cloudy means your fruit is ripening, and hope is growing inside you. And rainy? Fruit takes time to grow. Good days are still ahead of you."
      },
      {
       "k": "big",
       "h": "Hope can grow.",
       "sub": "A goal, a path, and \"I can do it.\"",
       "say": "Hope can grow, just like a tree. Hope has three pieces. A goal, something you want. A path, a way to get there. And a voice inside that says, I can do it."
      },
      {
       "k": "points",
       "h": "Practice: Hope Map",
       "items": [
        [
         "Pick a goal",
         "Something to do or learn"
        ],
        [
         "Find two paths",
         "Two ways to get there"
        ],
        [
         "Say it",
         "I can do it!"
        ]
       ],
       "cue": {
        "w": {
         "2": 8,
         "4": 5,
         "5": 5,
         "7": 3
        },
        "at": [
         1,
         3,
         6
        ]
       },
       "say": "Let us make a Hope Map, right in your head. Think of something you want to do or learn. Maybe riding a bike, reading a big book, or making a new friend. Now think of two ways to get there. Path one. And path two. Last, say it out loud with me. I can do it!"
      },
      {
       "k": "big",
       "h": "Hard to see good things ahead? Tell a grown-up.",
       "sub": "Grown-ups: doctor or 988. In danger, 911.",
       "say": "Sometimes fruit has a rainy day. If it ever feels like nothing good is coming, or you do not want tomorrow to come, tell a safe grown-up right away. A parent, a grandparent, a teacher, or a school counselor. You are not in trouble. If you tell Maple, your grown-up sees it, so they can help. Grown-ups, take those words seriously and keep talking. If a child ever talks about wanting to die, call their doctor, or call or text nine eight eight. If someone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Tend the whole tree, and fruit will come.",
       "sub": "Hope Map and Tomorrow Wish are in your plan.",
       "say": "Here is one more to try tonight. It is called Tomorrow Wish. Before bed, say one good thing you hope happens tomorrow. In the morning, look for it. Tend your whole tree, a little each day, and fruit will come. That is all six parts. Well done!"
      },
      {
       "k": "quiz",
       "q": "What are the three pieces of hope?",
       "opts": [
        "A goal, a path, and \"I can do it\"",
        "Luck, wishes, and waiting",
        "Being first, fastest, and best"
       ],
       "right": 0,
       "why": "A goal, a path to get there, and \"I can do it\" help hope grow.",
       "say": "Last question. What are the three pieces of hope?"
      }
     ]
    }
   ]
  },
  {
   "id": "maple-grownups",
   "title": "For Grown-ups",
   "who": "For parents, grandparents, and the grown-ups who help kids grow",
   "certTitle": "Maple: For Grown-ups",
   "certLine": "For finishing every lesson for the grown-ups who help kids grow.",
   "lessons": [
    {
     "id": "mp-p-talk",
     "n": 1,
     "title": "Talking With Little Ones",
     "mins": 5,
     "blurb": "How to talk with a child after a check-in, and in all the small moments in between.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 1",
       "h": "Talking With Little Ones",
       "sub": "The best part happens after the screen.",
       "say": "This lesson is for parents, grandparents, teachers, and every grown-up who loves a child. It is about the talk that comes after a check-in, and all the small talks in between."
      },
      {
       "k": "big",
       "h": "The most important part of Maple happens after the screen.",
       "sub": "The check-in opens a door.",
       "say": "The Grown-up Guide in Maple says it plainly. The most important part of Maple happens after the screen. A check-in opens a door. You are the one who walks through it with them."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "For grown-ups",
       "rows": [
        [
         "Roots",
         "Strong",
         "#5F7D48"
        ],
        [
         "Trunk",
         "Steady",
         "#8B5E1A"
        ],
        [
         "Bark",
         "Growing Edge",
         "#B8612F"
        ],
        [
         "Branches",
         "Strong",
         "#5F7D48"
        ],
        [
         "Leaves",
         "Steady",
         "#8B5E1A"
        ],
        [
         "Fruit",
         "Skipped",
         "#7D6B57"
        ]
       ],
       "tap": 2,
       "say": "After a check-in, open the For grown-ups box under your child's tree. Your child sees their tree and its weather. You see a simple level for each part. Strong, Steady, or Growing Edge. That tells you where to lean in. If a part was skipped, it shows here too. A skip can be a quiet signal, so you might gently ask about it later."
      },
      {
       "k": "points",
       "h": "After the screen",
       "items": [
        [
         "Be curious, not worried",
         "Tell me about that rain cloud"
        ],
        [
         "Listen more than you fix",
         "Kids often just need to be heard"
        ],
        [
         "Take their weather seriously",
         "Even if it seems small to you"
        ],
        [
         "Share a little of your weather",
         "Everyone has rainy days"
        ]
       ],
       "say": "A few things help. Be curious, not worried. Tell me about that rain cloud opens more doors than, what is wrong? Listen more than you fix. Kids often just need to be heard. Take their weather seriously, even if it seems small to you. And share a little of your own weather. It shows them everyone has rainy days."
      },
      {
       "k": "points",
       "h": "Little ones talk side by side",
       "items": [
        [
         "Pick an unhurried moment",
         "Bedtime, or a slow weekend morning"
        ],
        [
         "Sit beside, not across",
         "In the car, on a walk, while drawing"
        ],
        [
         "Short and often",
         "A few minutes, many times"
        ]
       ],
       "say": "Little ones often talk best side by side. Pick an unhurried moment, like a quiet afternoon, bedtime, or a slow weekend morning. Sit beside them, not across from them. The car, a walk, or a table full of crayons can work wonders. And keep it short. A few minutes, many times, will carry you further than one big talk."
      },
      {
       "k": "words",
       "h": "Doors that open",
       "items": [
        "Tell me about that.",
        "What was the best part of your day?",
        "What does mad feel like in your body?",
        "When do you feel most safe and loved?"
       ],
       "say": "Here are a few openers to keep in your pocket. Tell me about that. What was the best part of your day? What does mad feel like in your body? And, when do you feel most safe and loved?"
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "When Life Changes",
        "Grown-up Guide",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Grown-up Guide",
        "p": "Conversation starters for each part, and what helps when a part is rainy."
       },
       "say": "You never have to come up with these on your own. The Grown-up Guide tab has conversation starters for every one of the six parts. Each part also says why it works, and what helps if that part is rainy. You can save or print the whole guide."
      },
      {
       "k": "card",
       "title": "When Life Changes",
       "body": "Sixty guides for hard talks, each with Talking It Through.",
       "fields": [
        [
         "Search",
         "a new baby"
        ]
       ],
       "btns": [
        "Talking It Through"
       ],
       "tap": 0,
       "say": "For the harder talks, open When Life Changes. There are sixty guides, from a pet dying to scary news. Each one has a quick reference, and a full Talking It Through, with how to start, questions kids often ask, and what helps."
      },
      {
       "k": "big",
       "h": "Tell me about that. I'm listening.",
       "sub": "Say it out loud.",
       "beats": [
        "Let us practice one opener right now.",
        "Picture a child you love, and a time they seemed a little cloudy.",
        {
         "t": "Now say this out loud, softly, the way you would to them: tell me about that, I am listening.",
         "w": 10
        }
       ],
       "say": "Let us practice one opener right now. Picture a child you love, and a time they seemed a little cloudy. Now say this out loud, softly, the way you would to them: tell me about that, I am listening."
      },
      {
       "k": "points",
       "h": "If they share something hard",
       "items": [
        [
         "Stay calm and listen",
         "Thank them for telling you"
        ],
        [
         "Promise help, not secrecy",
         "Safety stays in the open"
        ],
        [
         "Help is right there",
         "Call or text 988. In danger, call 911."
        ]
       ],
       "say": "Sometimes a child shares something heavy. Stay calm, find a quiet moment, and listen more than you talk. Thank them for telling you. Promise to help, rather than promising to keep a secret. Every Maple check-in ends with a short safety step, and if an answer needs a closer look, the For grown-ups box tells you what to do next. If a child talks about wanting to die or to hurt themselves, call their doctor, or call or text nine eight eight, any time. If anyone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Keep it light. A gift, not a test.",
       "say": "And keep it light. Maple works best when it feels like a gift, not a test. A child who feels heard today is more ready to talk tomorrow."
      },
      {
       "k": "quiz",
       "q": "Which opener invites a child to talk?",
       "opts": [
        "What's wrong now?",
        "Tell me about that rain cloud.",
        "Cheer up, it's not a big deal."
       ],
       "right": 1,
       "why": "A curious question opens more doors than a worried one.",
       "say": "Quick question. Which opener invites a child to talk?"
      }
     ]
    },
    {
     "id": "mp-p-feelings",
     "n": 2,
     "title": "Big Feelings, Calm Grown-ups",
     "mins": 6,
     "blurb": "How a grown-up who resets first can help a child find their calm.",
     "sources": [
      "lieberman",
      "siegel"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 2",
       "h": "Big Feelings, Calm Grown-ups",
       "sub": "Your calm is the lighthouse.",
       "say": "Every child has big feelings. Mad, sad, scared, and wound up. This lesson is about the grown-up in the room, and how your calm can help a child find theirs."
      },
      {
       "k": "big",
       "h": "Kids borrow our calm.",
       "sub": "Steady yourself first.",
       "say": "Kids borrow our calm. When a feeling gets really big, a child's body takes over, and words bounce off. But your calm body and your soft voice still get through. So the first step is always the same. Steady yourself first."
      },
      {
       "k": "story",
       "title": "A Lion-Sized Reset",
       "lines": [
        "My alarm didn't go off, the dog got into the trash, and I walked out the door with two different shoes on.",
        "So I parked a little early, rolled down the window, and decided it was time for a reset.",
        "After the third roar my jaw loosened, my shoulders dropped, and I actually started laughing at myself."
       ],
       "lesson": "The grown-up resets first.",
       "note": "Names and details changed",
       "hold": 2,
       "say": "My alarm didn't go off, the dog got into the trash, and I walked out the door with two different shoes on. A detour added twenty minutes. When I finally pulled up to the patient's house, I felt like my head was spinning. So I parked a little early, rolled down the window, and decided it was time for a reset. I did a Lion's Breath, three times, right there in the front seat. After the third roar my jaw loosened, my shoulders dropped, and I actually started laughing at myself. I walked into that visit feeling steady and present."
      },
      {
       "k": "points",
       "h": "Reset before you step in",
       "items": [
        [
         "Notice your signals",
         "Tight jaw, rising voice, hot face"
        ],
        [
         "Take one slow breath",
         "Before you say a word"
        ],
        [
         "Get low and soft",
         "A little to the side, few words"
        ]
       ],
       "say": "The same kind of reset works at home, before you step into a child's storm. Notice your own signals. A tight jaw, a rising voice, a hot face. Take one slow breath before you say a word. Then get down low, a little to the side, with a soft voice and very few words."
      },
      {
       "k": "big",
       "h": "Try a Lion's Breath",
       "sub": "In through your nose. Mouth wide, tongue out, haaa.",
       "beats": [
        "Let us try one together, right now.",
        "Breathe in deep through your nose.",
        "Now open your mouth wide, stick your tongue out, and breathe out with a long haaa.",
        {
         "t": "Do two more on your own, as big as you like.",
         "w": 12
        }
       ],
       "say": "Let us try one together, right now. Breathe in deep through your nose. Now open your mouth wide, stick your tongue out, and breathe out with a long haaa. Do two more on your own, as big as you like."
      },
      {
       "k": "words",
       "h": "Few words, the same each time",
       "items": [
        "I'm here.",
        "You're safe.",
        "I'll wait with you."
       ],
       "say": "In the middle of the storm, use a few words, the same ones each time. I'm here. You're safe. I'll wait with you. Save the lessons and the questions for later. Waiting is doing something."
      },
      {
       "k": "points",
       "h": "Give their body a job",
       "items": [
        [
         "Balloon Breaths",
         "Hands on belly, fill it slowly"
        ],
        [
         "Shake It Out",
         "Like a wet puppy, then stand still"
        ],
        [
         "Calm Corner",
         "A blanket and a soft toy"
        ],
        [
         "Squeeze a pillow",
         "Or push against the wall"
        ]
       ],
       "say": "Then give their body a job. Balloon Breaths, with hands on the belly, filling it up slowly like a balloon. Shake It Out, like a wet puppy, then stand still. A Calm Corner with a blanket and a soft toy. Or squeeze a pillow, or push against the wall."
      },
      {
       "k": "points",
       "h": "After the storm",
       "items": [
        [
         "Reconnect before you correct",
         "A hug, a snack, or quiet time"
        ],
        [
         "Name it together",
         "You felt really frustrated"
        ],
        [
         "Make it right together",
         "Clean up, a kind word, or a redo"
        ]
       ],
       "say": "After the storm, reconnect before you correct. A hug, a snack, or quiet time together comes first. Then name the feeling together. You felt really frustrated. Putting a feeling into words helps calm it down. In Maple, that practice is called Name It to Tame It. Then make it right together, with a clean up, a kind word, or a redo."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 3,
       "note": {
        "h": "Growth Plan",
        "p": "Pick Bark practices to try together on calm days."
       },
       "say": "In Maple, Bark is how a child handles big feelings. Open your child's Growth Plan and pick a Bark practice or two, like Balloon Breaths or Name It to Tame It. Practice them when things are calm, so they are ready when things are not. You can even tap Add mine and write in your own, like a family Lion's Breath."
      },
      {
       "k": "card",
       "title": "When Life Changes",
       "body": "Two guides for stormy days.",
       "fields": [
        [
         "",
         "In the Middle of a Meltdown"
        ],
        [
         "",
         "Anger and Big Outbursts"
        ]
       ],
       "btns": [
        "Talking It Through"
       ],
       "tap": 0,
       "say": "When Life Changes has two guides for stormy days. In the Middle of a Meltdown, and Anger and Big Outbursts. Each one has words to say during and after, and the questions kids often ask, like, am I in trouble?"
      },
      {
       "k": "points",
       "h": "When to reach out",
       "items": [
        [
         "Storms most days",
         "Talk with your doctor or school counselor"
        ],
        [
         "Talk of hurting themselves",
         "Call or text 988, any time"
        ],
        [
         "Danger right now",
         "Call 911"
        ]
       ],
       "say": "Reach out for more help if meltdowns happen most days, last a long time, or keep getting worse. Your pediatrician or school counselor is a good first call. If a child talks about hurting themselves or not wanting to be alive, call or text nine eight eight, any time. If anyone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Reset first. Then reach for them.",
       "sub": "Even on the messy mornings.",
       "say": "You will not get it right every time. Nobody does. Take a breath, come back, and make it right together. Your child learns calm by watching you find yours, even on the messy mornings."
      },
      {
       "k": "quiz",
       "q": "In a meltdown, what helps first?",
       "opts": [
        "A long talk about the rules",
        "Your own slow breath and a soft voice",
        "Counting down to a consequence"
       ],
       "right": 1,
       "why": "Kids borrow our calm. Steady yourself first, then help them.",
       "say": "Quick question. In the middle of a meltdown, what helps first?"
      }
     ]
    },
    {
     "id": "mp-p-faith",
     "n": 3,
     "title": "Wonder, Faith, and Big Questions",
     "mins": 6,
     "blurb": "Making room for wonder and big questions, starting from your own family.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 3",
       "h": "Wonder, Faith, and Big Questions",
       "sub": "Every family fills in its own roots.",
       "say": "Kids ask big questions. Why is the sky so big? Where do people go when they die? This lesson is about wonder, faith, and making room for big questions, in families of all faith traditions and everything in-between."
      },
      {
       "k": "big",
       "h": "Roots: what grounds you.",
       "sub": "Feeling safe, loved, and calm inside.",
       "say": "In Maple, Roots is what grounds you. For a child, that means feeling safe, loved, and calm inside. Roots leaves room for every family to fill it in with their own tradition, and it is where wonder and faith most often show up."
      },
      {
       "k": "points",
       "h": "Many doors to the holy",
       "items": [
        [
         "Prayer and worship",
         "In your family's own way"
        ],
        [
         "Quiet and stillness",
         "One calm minute together"
        ],
        [
         "Nature and wonder",
         "Clouds, bugs, and the night sky"
        ],
        [
         "Family traditions",
         "A song, a blessing, a meal"
        ]
       ],
       "say": "There are many doors into this part of a child's life. For some families, it is God, prayer, and worship. For others, it is quiet and stillness, a walk outside, a sky full of stars, or a tradition your family keeps, like a song, a blessing, or a special meal. Every one of these can help a child feel held."
      },
      {
       "k": "big",
       "h": "Start from your family.",
       "sub": "Share what holds you.",
       "say": "Start from your family. Share what holds you, simply and honestly, in your own words. A prayer, a verse, a practice, or a quiet habit. Your child learns most from watching what you turn to when life feels wobbly."
      },
      {
       "k": "words",
       "h": "Ask about experience",
       "items": [
        "When do you feel most safe and loved?",
        "What helps you feel peaceful inside?",
        "What big question are you wondering about?"
       ],
       "say": "Then ask about their experience. These come from the Roots starters in the Grown-up Guide. When do you feel most safe and loved? What helps you feel peaceful inside? And, what big question are you wondering about? Questions like these fit every child, in every family."
      },
      {
       "k": "points",
       "h": "When a big question comes",
       "items": [
        [
         "Let them wonder",
         "No need to rush an answer"
        ],
        [
         "Ask what they think",
         "What made you wonder that?"
        ],
        [
         "Say I don't know, kindly",
         "And share what you do know"
        ],
        [
         "Find out together",
         "In a book, or by asking someone"
        ]
       ],
       "say": "When a big question comes, let them wonder. There is no need to rush to an answer. Ask what they think, or what made them wonder that. It is okay to say, I don't know everything, and then share what you do know. Some families say, I know love doesn't end. And you can find out together, in a book, or by asking someone you trust."
      },
      {
       "k": "big",
       "h": "Holy things can feel like a safe place.",
       "sub": "Notice: comfort, or worry?",
       "say": "Here is something worth watching. For most children, faith and holy things are a comfort. For a few, something they heard can turn into a worry. Notice which one it is for your child. If something holy starts to feel scary, slow down, listen, and talk with someone you trust, like a pastor or faith leader."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Growth Plan: Roots",
       "rows": [
        [
         "Quiet Together",
         "Chosen",
         "#5F7D48"
        ],
        [
         "Wonder Walk",
         "Chosen",
         "#5F7D48"
        ],
        [
         "Bedtime Blessing",
         ""
        ],
        [
         "Look Up",
         ""
        ],
        [
         "Our Family Way",
         ""
        ]
       ],
       "tap": 1,
       "say": "Your child's Growth Plan has Roots practices that fit many homes. Quiet Together, a prayer or one still minute side by side. Wonder Walk, looking for three things that make you say wow. Bedtime Blessing, with a blessing, a prayer, or kind words. Look Up, at the clouds, the moon, or the stars. And Our Family Way, a tradition your family keeps. Pick what fits your home."
      },
      {
       "k": "card",
       "title": "Faith and the Holy",
       "body": "A gentle word for families, in every When Life Changes guide.",
       "fields": [
        [
         "Search",
         "a pet died"
        ]
       ],
       "btns": [
        "Talking It Through"
       ],
       "tap": 0,
       "say": "Big questions often arrive with big changes, like a death in the family or a pet that died. Every guide in When Life Changes has a section called Faith and the Holy, with a gentle word for families who want one."
      },
      {
       "k": "big",
       "h": "What holds you?",
       "sub": "Say its name out loud.",
       "beats": [
        "Let us try something before we finish.",
        "Think of one thing that holds you when life feels wobbly.",
        "It might be a prayer, a place outside, a song, or a quiet habit.",
        {
         "t": "Say its name out loud, softly, right now.",
         "w": 8
        }
       ],
       "say": "Let us try something before we finish. Think of one thing that holds you when life feels wobbly. It might be a prayer, a place outside, a song, or a quiet habit. Say its name out loud, softly, right now."
      },
      {
       "k": "points",
       "h": "For every grown-up",
       "items": [
        [
         "Teachers",
         "Each child answers from their family's tradition"
        ],
        [
         "Rainy roots for weeks",
         "Talk with a pastor, counselor, or doctor"
        ],
        [
         "Talk of wanting to die",
         "Call or text 988. In danger, call 911."
        ]
       ],
       "say": "That one thing is a gift you can share with your child this week. For teachers, Roots leaves room for every child to answer from their own family's tradition, so check with your school about how it fits your classroom. If roots stay rainy for more than a couple of weeks, reach out to a pastor, a school counselor, or your child's doctor. And if a child ever talks about wanting to die, call or text nine eight eight, any time. If anyone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Wonder is a door. Walk through it together.",
       "say": "Wonder is a door. You do not need every answer to walk through it together."
      },
      {
       "k": "quiz",
       "q": "Which question asks about experience?",
       "opts": [
        "What should you believe?",
        "When do you feel most safe and loved?",
        "Why did you get that wrong?"
       ],
       "right": 1,
       "why": "Asking about experience opens the door for every child, in every family.",
       "say": "Quick question. Which question asks about a child's experience?"
      }
     ]
    },
    {
     "id": "mp-p-worry",
     "n": 4,
     "title": "When to Worry, and Who to Call",
     "mins": 6,
     "blurb": "The signs that call for more help, how to ask about safety, and who to call.",
     "sources": [
      "dazzi",
      [
       "988 Suicide and Crisis Lifeline",
       "https://988lifeline.org"
      ],
      [
       "HealthyChildren.org (American Academy of Pediatrics)",
       "https://www.healthychildren.org"
      ],
      [
       "Childhelp National Child Abuse Hotline",
       "https://www.childhelphotline.org"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 4",
       "h": "When to Worry, and Who to Call",
       "sub": "Calm, ready, and close by.",
       "say": "Most rainy days pass with time, closeness, and patience. This lesson is about the days that need more. What to watch for, how to ask, and who to call."
      },
      {
       "k": "big",
       "h": "Rain is part of growing.",
       "sub": "Some storms need more hands.",
       "say": "Every child has rainy days, and Maple treats rain as part of how a tree grows. Your job is not to stop every storm. Your job is to notice when a storm needs more hands, and to know whose hands to reach for."
      },
      {
       "k": "points",
       "h": "Signs to reach out",
       "items": [
        [
         "Rain for weeks",
         "Rainy weather lasts more than a couple of weeks"
        ],
        [
         "Joy goes quiet",
         "They stop enjoying what they loved"
        ],
        [
         "Big changes",
         "Sleep, eating, or schoolwork shifts a lot"
        ],
        [
         "Someone is hurting them",
         "Or being mean to them"
        ]
       ],
       "say": "The Grown-up Guide names four signs to reach out. Rainy weather that lasts more than a couple of weeks. A child who stops enjoying the things they used to love. Big changes in sleep, eating, or schoolwork. And a child who says someone is hurting them, or being mean to them."
      },
      {
       "k": "flow",
       "h": "Who to reach for",
       "steps": [
        [
         "Your child's doctor",
         "Their pediatrician knows them"
        ],
        [
         "The school counselor",
         "Sees them most days"
        ],
        [
         "Someone you trust",
         "A pastor, a teacher, a friend"
        ]
       ],
       "say": "When you see those signs, reach out. Start with your child's doctor. Their pediatrician knows their body and their history, and can help you find the next step. Talk with the school counselor, who sees your child most days. And lean on someone you trust, like a pastor or a teacher. You do not have to figure this out alone."
      },
      {
       "k": "card",
       "title": "Staying safe",
       "body": "Is anyone hurting you, or making you feel scared?",
       "fields": [
        [
         "",
         "Yes"
        ],
        [
         "",
         "No"
        ],
        [
         "",
         "Not sure"
        ]
       ],
       "btns": [
        "See my tree"
       ],
       "tap": 0,
       "say": "Every Maple check-in ends with a short safety step. Every grade answers one question. Is anyone hurting you, or making you feel scared? Grades three to five also answer one gentle question about wishing they were not alive. A yes or a not sure shows your child a calm card with nine eight eight and nine one one, and shows you what to do next."
      },
      {
       "k": "big",
       "h": "Asking does not put the idea in their head.",
       "sub": "It opens a door.",
       "say": "Many grown-ups worry that asking about dying will give a child the idea. Research says it does not. Asking opens a door, and it tells your child that nothing is too big to bring to you."
      },
      {
       "k": "words",
       "h": "Ask in their words",
       "items": [
        "Sometimes when kids feel really sad, they wish they were not alive. Have you felt like that?",
        "Are you thinking about hurting yourself?",
        "I am really glad you told me. Can you tell me more?"
       ],
       "say": "Ask in words your child can hold. Maple's own question is a good one. Sometimes when kids feel really sad, they wish they were not alive. Have you felt like that? If the answer is yes, ask plainly. Are you thinking about hurting yourself? Then listen. I am really glad you told me. Can you tell me more?"
      },
      {
       "k": "big",
       "beats": [
        "Practice the words that matter most, out loud, so they are ready when you need them.",
        "Say them now, slowly.",
        {
         "t": "Thank you for telling me. You are not in trouble. I am going to help.",
         "w": 10
        }
       ],
       "h": "Say the words that matter most.",
       "sub": "Thank you for telling me. You are not in trouble.",
       "say": "Practice the words that matter most, out loud, so they are ready when you need them. Say them now, slowly. Thank you for telling me. You are not in trouble. I am going to help."
      },
      {
       "k": "points",
       "h": "If your child says yes",
       "items": [
        [
         "Stay close and stay calm",
         "Your face tells them it was safe to tell"
        ],
        [
         "Call or text 988",
         "Or call their doctor today"
        ],
        [
         "In danger right now?",
         "Call 911"
        ],
        [
         "Keep it with helpers",
         "Never promise to keep it a secret"
        ]
       ],
       "say": "If your child talks about wanting to die or to hurt themselves, take it seriously, every time, even from a very young child. Stay close, and stay calm. Call their doctor right away, or call or text nine eight eight, the Suicide and Crisis Lifeline, any time. If your child is in danger right now, call nine one one. And never promise to keep it a secret. Tell them, kindly, that you will bring in people whose job is to help kids."
      },
      {
       "k": "points",
       "h": "If someone is hurting them",
       "items": [
        [
         "Believe them",
         "Thank them for telling"
        ],
        [
         "Listen, then get help",
         "Let trained people ask the questions"
        ],
        [
         "Report it the same day",
         "Child protection or the Childhelp hotline"
        ]
       ],
       "say": "If your child says someone is hurting them, believe them, and thank them for telling. Listen without asking for details. Trained people will ask the questions. Then report it the same day, to your county child protection agency, or the police. The Childhelp hotline can help you figure out who to call."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Check-in",
        "My Kids",
        "When Life Changes",
        "Grown-up Guide"
       ],
       "tap": 2,
       "note": {
        "h": "Safety",
        "p": "Four guides: when a child tells you someone hurt them, wanting to die, body safety, and online secrets."
       },
       "say": "Read ahead, before you need it. In When Life Changes, the Safety guides walk you through it. When a child tells you someone hurt them. When a child talks about wanting to die. Teaching body safety. And when someone online asks for secrets. Each has a quick card, words to say, and where to get help."
      },
      {
       "k": "big",
       "h": "A calm grown-up is the strongest help.",
       "sub": "988, any time. 911 if a child is in danger.",
       "say": "You do not need to be an expert. A calm grown-up who listens, and then reaches for help, is one of the strongest helps a child can have. Nine eight eight is there any time. And nine one one is there if a child is in danger right now."
      },
      {
       "k": "quiz",
       "q": "Your child says they wish they were not alive. What comes first?",
       "opts": [
        "Promise to keep it a secret",
        "Stay calm, thank them, and get help today",
        "Wait to see if it passes"
       ],
       "right": 1,
       "why": "Take it seriously every time. Stay close, and call their doctor or 988 today.",
       "say": "Quick question. Your child says they wish they were not alive. What comes first?"
      }
     ]
    },
    {
     "id": "mp-p-together",
     "n": 5,
     "title": "Using Maple Together",
     "mins": 6,
     "blurb": "Side by side with your child: the check-in, the weather, practices, and the growth plan.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 5",
       "h": "Using Maple Together",
       "sub": "Side by side, one small step at a time.",
       "say": "Maple is made to do together. This lesson shows how to sit side by side with your child, from the first check-in to the daily practices."
      },
      {
       "k": "big",
       "h": "The most important part happens after the screen.",
       "sub": "Maple opens the door. You walk through it together.",
       "say": "The most important part of Maple happens after the screen. Maple opens the door to a good talk. You and your child walk through it together."
      },
      {
       "k": "flow",
       "h": "Two ways to check in",
       "steps": [
        [
         "On my own",
         "The child taps through, you stay near"
        ],
        [
         "With a grown-up",
         "A short tip under every question"
        ]
       ],
       "say": "A check-in starts with a choice. On my own, or With a grown-up. Even on my own, stay nearby and be ready to talk. With a grown-up adds a short tip under every question, and a Why this question link, so you know what each one is listening for. Kindergarten through grade two starts with read aloud on."
      },
      {
       "k": "points",
       "h": "While they answer",
       "items": [
        [
         "Pick an unhurried moment",
         "Before bed, or a slow morning"
        ],
        [
         "Let them answer",
         "Their words, not yours"
        ],
        [
         "I don’t know is okay",
         "Any part can be skipped"
        ]
       ],
       "say": "Pick an unhurried moment, like a quiet afternoon, or a slow weekend morning. Let your child answer in their own way, even when you would have answered differently. I don’t know is always an honest answer, and any part can be skipped. A check-in takes about ten to fifteen minutes."
      },
      {
       "k": "screen",
       "app": "maple",
       "app_name": "Maple",
       "title": "Check-in",
       "rows": [
        [
         "Roots",
         "Sunny",
         "#C07A26"
        ],
        [
         "Trunk",
         "Sunny",
         "#C07A26"
        ],
        [
         "Bark",
         "Rainy",
         "#3D5A73"
        ],
        [
         "Branches",
         "Partly cloudy",
         "#7D6B57"
        ],
        [
         "Leaves",
         "Sunny",
         "#C07A26"
        ],
        [
         "Fruit",
         "Sunny",
         "#C07A26"
        ]
       ],
       "tap": 2,
       "panel": {
        "h": "Tell me about that rain cloud.",
        "sub": "Curious, not worried.",
        "items": [
         "Listen more than you fix",
         "Take their weather seriously",
         "Share a little of your own"
        ]
       },
       "say": "At the end, each part of the tree gets its weather. Sunny, partly cloudy, or rainy. Your child sees the weather. You see a simple level for each part, Strong, Steady, or Growing Edge, so you know where to lean in. When you see rain, be curious, not worried. Tell me about that rain cloud opens more doors than what’s wrong."
      },
      {
       "k": "points",
       "h": "Talking about the weather",
       "items": [
        [
         "Listen more than you fix",
         "Being heard is often enough"
        ],
        [
         "Take it seriously",
         "Even when it seems small"
        ],
        [
         "Share your own weather",
         "Everyone has rainy days"
        ]
       ],
       "say": "Listen more than you fix. Kids often just need to be heard. Take their weather seriously, even if it seems small to you. And share a little of your own weather. It shows them that everyone has rainy days."
      },
      {
       "k": "big",
       "beats": [
        "Try it now, the way you might at the kitchen table.",
        "Say your own weather out loud, in one short line.",
        {
         "t": "Today I feel partly cloudy, because I am tired, and I am glad to be here with you.",
         "w": 10
        }
       ],
       "h": "Today I feel partly cloudy, because...",
       "sub": "Say your own weather out loud.",
       "say": "Try it now, the way you might at the kitchen table. Say your own weather out loud, in one short line. Today I feel partly cloudy, because I am tired, and I am glad to be here with you."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 3,
       "note": {
        "h": "Growth Plan",
        "p": "Pick things to practice. About 3 for each part is a good start. No limit, and add your own."
       },
       "say": "After the check-in, your child’s tree is ready to tend. Open the Growth Plan together. Maple suggests starting with the parts that had rain or clouds. About three for each part is a good start, and a few more for any part with clouds or rain. There is no limit, and you can add your own ideas."
      },
      {
       "k": "tabs",
       "app": "maple",
       "app_name": "Maple",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 0,
       "note": {
        "h": "Today",
        "p": "Check off a practice. How to do this, Easier today, and a note."
       },
       "say": "Each day, open Today together. Tap How to do this, and read the steps out loud. On a tired day, tap Easier today for a smaller version. Check off what you do, and add a short note if you like. A few minutes a day is plenty."
      },
      {
       "k": "points",
       "h": "Watch it grow",
       "items": [
        [
         "A bright leaf",
         "For each part tended today"
        ],
        [
         "Days tended",
         "Counted on the Today tab"
        ],
        [
         "A new ring",
         "With every check-in"
        ],
        [
         "A weekly question",
         "To talk about together"
        ]
       ],
       "say": "Then cheer together as the tree grows. Each part tended today brings a bright leaf. The Today tab counts the days tended. Every new check-in adds a ring. And each week brings a short check-in and a question to talk about. Celebrate each one."
      },
      {
       "k": "points",
       "h": "What you can see",
       "items": [
        [
         "The big picture",
         "Check-ins, the tree, days tended"
        ],
        [
         "Always shown to you",
         "If someone is hurting or scaring them"
        ],
        [
         "Just theirs",
         "The weekly thoughts they write"
        ]
       ],
       "say": "Here is what you can see. The big picture, which means their check-ins, their tree, how many days they tended it, and which parts they are tending. If your child says someone is hurting or scaring them, or that they don’t want tomorrow to come, you always see it, so you can help. The weekly thoughts they write are theirs, and they can share one with you anytime. Everything stays on this device."
      },
      {
       "k": "big",
       "h": "Keep it light. Maple works best as a gift.",
       "sub": "A few minutes, side by side.",
       "say": "Keep it light. Maple works best when it feels like a gift, not a test. A few minutes, side by side, is how a tree grows."
      },
      {
       "k": "quiz",
       "q": "Your child’s Bark shows rain. What is a good first step?",
       "opts": [
        "Fix it right away",
        "Ask with curiosity: tell me about that rain cloud",
        "Skip that part next time"
       ],
       "right": 1,
       "why": "Be curious, not worried. Listening opens the door.",
       "say": "Quick question. Your child’s Bark shows rain. What is a good first step?"
      }
     ]
    },
    {
     "id": "mp-p-you",
     "n": 6,
     "title": "Caring for Yourself Too",
     "mins": 5,
     "blurb": "Your tree matters too, and tending it helps the little ones who lean on you.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "For Grown-ups, Lesson 6",
       "h": "Caring for Yourself Too",
       "sub": "Your tree matters too.",
       "say": "This last lesson is for you. Not as a parent, a grandparent, or a teacher. Just you. Because your tree matters too."
      },
      {
       "k": "big",
       "h": "A tree gives shade from what its roots can drink.",
       "sub": "Tending yourself is part of tending them.",
       "say": "A tree can only give shade from what its roots can drink. Grown-ups are the same. Tending yourself is part of tending the kids who lean on you. It is not selfish. It is how the shade keeps coming."
      },
      {
       "k": "points",
       "h": "Kids notice our weather",
       "items": [
        [
         "They read your face",
         "Long before your words"
        ],
        [
         "They borrow your calm",
         "And feel your rush"
        ],
        [
         "They learn from you",
         "How a grown-up tends a hard day"
        ]
       ],
       "say": "Kids notice our weather. They read your face long before they hear your words. On a calm day, they borrow your calm. On a rushed day, they feel the rush. And every day, they are learning from you how a grown-up tends a hard day."
      },
      {
       "k": "points",
       "h": "Signs you are running low",
       "items": [
        [
         "Short fuse",
         "Small things feel huge"
        ],
        [
         "Running on empty",
         "Sleep, meals, and breaks slip away"
        ],
        [
         "Pulling away",
         "From people who fill you up"
        ],
        [
         "Joy goes quiet",
         "Even the good parts feel flat"
        ]
       ],
       "say": "Here are some signs you are running low. A short fuse, when small things feel huge. Running on empty, when sleep, meals, and breaks slip away. Pulling away from the people who fill you up. And joy going quiet, when even the good parts feel flat. These are signals, not failures. They tell you where to tend."
      },
      {
       "k": "six",
       "h": "Your tree has six parts too",
       "words": [
        "What holds you up",
        "What you live for",
        "Your mind and feelings",
        "Your people",
        "Sleep, movement, food",
        "Something to look forward to"
       ],
       "say": "Your tree has the same six parts as your child’s. Roots, what holds you up. Trunk, what you live for. Bark, your mind and feelings. Branches, your people. Leaves, your body. And Fruit, something to look forward to."
      },
      {
       "k": "points",
       "h": "Small things count",
       "items": [
        [
         "Rest when you can",
         "An early night beats a late scroll"
        ],
        [
         "Reach for one person",
         "A call, a text, a coffee"
        ],
        [
         "Move a little",
         "A walk around the block"
        ],
        [
         "Ask for help",
         "Trade a pickup, share a meal"
        ]
       ],
       "say": "Small things count. Rest when you can. An early night often helps more than a late scroll. Reach for one person, with a call, a text, or a coffee. Move a little, even a walk around the block. And ask for help. Trade a school pickup. Share a meal. Letting others help you shows your kids that asking is strong."
      },
      {
       "k": "points",
       "h": "Practice: A Two-Minute Refill",
       "items": [
        [
         "Settle",
         "Feet down, one slow breath"
        ],
        [
         "Name your weather",
         "Sunny, partly cloudy, or rainy"
        ],
        [
         "What helps you?",
         "One thing that brings you back"
        ],
        [
         "One small way today",
         "Small is fine"
        ]
       ],
       "cue": {
        "w": {
         "1": 6,
         "2": 8,
         "3": 10,
         "4": 8
        },
        "at": [
         1,
         2,
         3,
         4
        ]
       },
       "say": "Let us practice, right where you are. Put your feet down, and take one slow breath. Now name your own weather today, sunny, partly cloudy, or rainy. What is one thing that helps you feel more like yourself? Choose one small way to give yourself that today."
      },
      {
       "k": "big",
       "h": "Snapped today? Repair counts more.",
       "sub": "I was grumpy. I am sorry. I love you.",
       "say": "Some days you will snap, or rush, or say it wrong. Every grown-up does. What matters most is what comes after. Go back and repair it. I was grumpy, and I am sorry. I love you. That small repair teaches your child more than a perfect day ever could."
      },
      {
       "k": "points",
       "h": "Support for you",
       "items": [
        [
         "Oak",
         "A check-in for grown-ups, root to fruit"
        ],
        [
         "When Life Changes",
         "Guides for hard seasons"
        ],
        [
         "Need to talk now?",
         "Call or text 988, any time"
        ]
       ],
       "say": "Grounded has support for you too. Oak is a check-in for grown-ups, with the same six parts, from root to fruit. When Life Changes has guides for the hard seasons. If your own rain lasts for weeks, talk with your doctor or a counselor. And if you need to talk right now, call or text nine eight eight, any time. If anyone is in danger, call nine one one."
      },
      {
       "k": "big",
       "h": "Tend your tree, and the shade keeps coming.",
       "sub": "Thank you for all you give.",
       "say": "Tend your tree, a little at a time, and the shade keeps coming. You are doing more good than you know. Thank you for all you give to the kids in your life."
      },
      {
       "k": "quiz",
       "q": "Why does tending your own tree matter?",
       "opts": [
        "It takes time away from your kids",
        "It is part of tending the kids who lean on you",
        "Only if you have extra time"
       ],
       "right": 1,
       "why": "A tree gives shade from what its roots can drink.",
       "say": "Last question. Why does tending your own tree matter?"
      }
     ]
    }
   ]
  },
  {
   "id": "maple-support",
   "kind": "support",
   "title": "For Big Feelings",
   "who": "Short videos for kids, to use right in the middle of it",
   "lessons": [
    {
     "id": "mp-r-balloon",
     "n": 1,
     "title": "Balloon Breaths",
     "mins": 3,
     "blurb": "Slow belly breaths that help a big feeling get smaller.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "Balloon Breaths",
       "sub": "Your belly is the balloon.",
       "say": "Hi, friend! Let us make some balloons. No balloons needed. Your belly is the balloon!"
      },
      {
       "k": "big",
       "h": "Slow breaths help your body feel calm.",
       "sub": "They work for mad, scared, sad, and wiggly.",
       "say": "When a feeling gets really big, slow breaths can help it get smaller. They help with mad, scared, sad, and even wiggly."
      },
      {
       "k": "points",
       "h": "Get ready",
       "items": [
        [
         "Sit or stand tall",
         "Like a tall maple tree"
        ],
        [
         "Hands on your belly",
         "Right on the balloon"
        ],
        [
         "Lips like a tiny straw",
         "For blowing out slow"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "First, get ready. Sit or stand up tall, like a tall maple tree. Put your hands on your belly. Now make your lips small, like a tiny straw."
      },
      {
       "k": "big",
       "h": "Let’s blow up three balloons.",
       "sub": "In through your nose. Out through your straw.",
       "beats": [
        "Let us blow up three balloons together.",
        "Breathe in through your nose, slow and quiet.",
        "Feel your belly get big and round.",
        "Now let the air out through your straw, slow, slow, slow.",
        "Feel your belly get small again.",
        {
         "t": "Now do two more balloons, nice and slow, and I will wait for you.",
         "w": 12
        }
       ],
       "say": "Let us blow up three balloons together. Breathe in through your nose, slow and quiet. Feel your belly get big and round. Now let the air out through your straw, slow, slow, slow. Feel your belly get small again. Now do two more balloons, nice and slow, and I will wait for you."
      },
      {
       "k": "breathe",
       "h": "Follow the circle",
       "sub": "Big belly in. Little belly out.",
       "hold": 20,
       "say": "Now follow the circle. Breathe in while it grows. Breathe out while it shrinks."
      },
      {
       "k": "points",
       "h": "How do you feel now?",
       "items": [
        [
         "Your belly",
         "Softer?"
        ],
        [
         "Your shoulders",
         "Lower?"
        ],
        [
         "Your feeling",
         "A little smaller?"
        ]
       ],
       "cue": {
        "p": {
         "1": 1.5,
         "2": 1.5,
         "3": 1.5
        }
       },
       "say": "Let us check. Is your belly softer? Are your shoulders lower? Is your big feeling a little smaller? Even a tiny bit counts."
      },
      {
       "k": "big",
       "h": "One big balloon breath is enough.",
       "sub": "Practice when you feel calm, so it’s ready for big feelings.",
       "say": "Here is a secret. Even one big balloon breath helps. Try it when you feel calm, too. Then your balloon is ready when a feeling gets big."
      },
      {
       "k": "big",
       "h": "You can always go to a safe grown-up.",
       "sub": "A parent, grandparent, teacher, or school counselor.",
       "say": "And if a feeling stays big, go to a safe grown-up. A parent, a grandparent, a teacher, or your school counselor. They are glad to help you."
      }
     ]
    },
    {
     "id": "mp-r-scared",
     "n": 2,
     "title": "When I Feel Scared",
     "mins": 3,
     "blurb": "Feet down, slow breaths, and a picture of your safe place.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Feel Scared",
       "sub": "Let’s get calm together.",
       "say": "Hi, friend. Are you feeling scared? I am right here with you. Let us get calm together."
      },
      {
       "k": "big",
       "h": "Everybody feels scared sometimes.",
       "sub": "Even grown-ups. Even brave people.",
       "say": "Everybody feels scared sometimes. Kids do. Grown-ups do. Even really brave people do. Scared is a feeling, and feelings come and go, like weather."
      },
      {
       "k": "points",
       "h": "Scared can feel like",
       "items": [
        [
         "A fast heart",
         "Thump, thump, thump"
        ],
        [
         "A tight tummy",
         "Like a knot"
        ],
        [
         "Shaky hands",
         "Wiggly and cold"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Scared can feel funny in your body. Your heart might go thump, thump, thump. Your tummy might feel tight, like a knot. Your hands might feel shaky."
      },
      {
       "k": "points",
       "h": "Feet on the ground",
       "items": [
        [
         "Press your feet down",
         "Strong, like roots"
        ],
        [
         "Find two things you see",
         "Look slowly around"
        ],
        [
         "Find one thing you hear",
         "Near or far"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ],
        "p": {
         "1": 2,
         "2": 3,
         "3": 3
        }
       },
       "say": "Let us grow some roots. Press your feet down into the floor, strong, like a tree. Now look around and find two things you can see. And find one thing you can hear."
      },
      {
       "k": "breathe",
       "h": "Balloon breaths",
       "sub": "Big belly in. Little belly out.",
       "hold": 16,
       "say": "Now put your hands on your belly. Breathe in slow, like a balloon. And let it out slow."
      },
      {
       "k": "big",
       "h": "Picture your safe place.",
       "sub": "Where you feel cozy, calm, and loved.",
       "beats": [
        "Now close your eyes, if you like.",
        "Picture a place where you feel safe and cozy.",
        "Maybe your bed, or a hug, or a sunny spot outside.",
        "What do you see there?",
        {
         "t": "Stay in your safe place for a little while, and I will wait with you.",
         "w": 10
        }
       ],
       "say": "Now close your eyes, if you like. Picture a place where you feel safe and cozy. Maybe your bed, or a hug, or a sunny spot outside. What do you see there? Stay in your safe place for a little while, and I will wait with you."
      },
      {
       "k": "words",
       "h": "Say it with me",
       "items": [
        "I feel scared.",
        "I can breathe.",
        "I can get help."
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 1,
         "3": 1.5
        }
       },
       "say": "Say it with me. I feel scared. I can breathe. I can get help."
      },
      {
       "k": "big",
       "h": "Go to a safe grown-up. You’re never in trouble for telling.",
       "sub": "A parent, grandparent, teacher, or school counselor.",
       "say": "Now go find a safe grown-up. A parent, a grandparent, a teacher, or your school counselor. Tell them, I feel scared. And if someone is hurting you, tell a safe grown-up right away. You are never in trouble for telling."
      }
     ]
    },
    {
     "id": "mp-r-mad",
     "n": 3,
     "title": "When I Feel Really Mad",
     "mins": 2,
     "blurb": "Shake it out, breathe it slow, and name the mad.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Feel Really Mad",
       "sub": "Let’s cool it down.",
       "say": "Are you feeling really mad right now? That is okay. Let us cool it down together."
      },
      {
       "k": "big",
       "h": "Mad is okay to feel.",
       "sub": "It tells you something matters to you.",
       "say": "Mad is okay to feel. It tells you something matters to you. What we do with mad is up to us. We can keep our hands and words gentle, and let the mad out in a safe way."
      },
      {
       "k": "points",
       "h": "Mad can feel like",
       "items": [
        [
         "Hot cheeks",
         "Like a red sun"
        ],
        [
         "Tight fists",
         "Squeezed hard"
        ],
        [
         "A loud voice inside",
         "Wanting to yell"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Mad can feel hot in your body. Your cheeks might feel hot. Your hands might squeeze into tight fists. You might want to yell."
      },
      {
       "k": "big",
       "h": "Shake it out like a wet puppy!",
       "sub": "Hands, arms, legs. Then stand still.",
       "beats": [
        "Let us shake the mad out.",
        "Stand up and shake your hands, your arms, and your legs, like a wet puppy.",
        "Shake, shake, shake, while I count to ten.",
        {
         "t": "One, two, three, four, five, six, seven, eight, nine, ten.",
         "w": 8
        }
       ],
       "say": "Let us shake the mad out. Stand up and shake your hands, your arms, and your legs, like a wet puppy. Shake, shake, shake, while I count to ten. One, two, three, four, five, six, seven, eight, nine, ten."
      },
      {
       "k": "breathe",
       "h": "Now stand still and breathe",
       "sub": "Slow in. Slower out.",
       "hold": 16,
       "say": "Now stand still like a tree. Breathe in slow. And blow it out even slower, like cooling hot soup."
      },
      {
       "k": "words",
       "h": "Name it to tame it",
       "items": [
        "I feel mad.",
        "I feel mad because...",
        "I need a break."
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 2,
         "3": 1.5
        }
       },
       "say": "Now name it, to tame it. Say, I feel mad. You can say why, too: I feel mad because, and then what happened. And you can say, I need a break."
      },
      {
       "k": "big",
       "h": "Tell a safe grown-up what happened.",
       "sub": "A parent, grandparent, teacher, or school counselor.",
       "say": "When you feel a little cooler, tell a safe grown-up what happened. A parent, a grandparent, a teacher, or your school counselor. They can help you fix it, or make it right."
      },
      {
       "k": "big",
       "h": "Big feelings get smaller. You can do this.",
       "say": "Big mad feelings get smaller. You can do this."
      }
     ]
    },
    {
     "id": "mp-r-sleep",
     "n": 4,
     "title": "When I Can’t Sleep",
     "mins": 3,
     "blurb": "A sleepy turtle, a heavy body, and slow breaths for bedtime.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Can’t Sleep",
       "sub": "Slow and sleepy, like a turtle.",
       "say": "Is it bedtime, and your eyes just will not close? Let us get slow and sleepy together. Snuggle in, and keep the sound soft."
      },
      {
       "k": "big",
       "h": "Lots of kids have trouble falling asleep.",
       "sub": "Your body knows how to rest.",
       "say": "Lots of kids have nights when sleep is slow to come. That is okay. Your body knows how to rest. We just need to help it slow down."
      },
      {
       "k": "points",
       "h": "A worry for the morning",
       "items": [
        [
         "Got a worry?",
         "Picture it in a little box"
        ],
        [
         "Close the lid",
         "It can wait"
        ],
        [
         "Tomorrow",
         "A grown-up can help with it"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Is a worry keeping you awake? Picture putting it in a little box. Close the lid. In the morning, you can open it with a grown-up, and they can help."
      },
      {
       "k": "points",
       "h": "Heavy like a sleepy turtle",
       "items": [
        [
         "Your feet and legs",
         "Heavy and still"
        ],
        [
         "Your tummy",
         "Soft, going up and down"
        ],
        [
         "Your arms and hands",
         "Floppy, like noodles"
        ],
        [
         "Your face",
         "Soft and sleepy"
        ]
       ],
       "cue": {
        "w": {
         "1": 6,
         "2": 6,
         "3": 6,
         "4": 6
        },
        "at": [
         1,
         2,
         3,
         4
        ]
       },
       "say": "Now be a sleepy turtle, slow and still. Let your feet and legs get heavy. Let your tummy go soft and rise up and down. Let your arms and hands get floppy, like cooked noodles. And let your face go soft and sleepy."
      },
      {
       "k": "breathe",
       "h": "Slow, sleepy breaths",
       "sub": "In through your nose. Out nice and long.",
       "hold": 30,
       "say": "Now just breathe, nice and slow. In through your nose. And out, nice and long. If your mind wanders off, that is okay. Come back to the next breath."
      },
      {
       "k": "big",
       "h": "Still wide awake? Go tell your grown-up.",
       "sub": "They can tuck you in, or sit with you a while.",
       "say": "If you are still wide awake after a while, or a bad dream woke you up, go tell your grown-up. They can tuck you in again, or sit with you for a little bit."
      },
      {
       "k": "big",
       "h": "Resting counts, even before sleep comes.",
       "say": "Resting counts, even before sleep comes. Good night, friend."
      }
     ]
    },
    {
     "id": "mp-r-sad",
     "n": 5,
     "title": "When I Feel Sad",
     "mins": 2,
     "blurb": "Name the sad, give yourself a hug, and let a grown-up help.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Feel Sad",
       "sub": "Sad can come with you here.",
       "say": "Hi, friend. Are you feeling sad today? You can bring your sad right here. Let us sit with it together."
      },
      {
       "k": "big",
       "h": "Sad is a rainy day inside.",
       "sub": "Rainy days come, and they go.",
       "say": "Sad is like a rainy day inside you. Everybody has rainy days. Rain helps trees grow, and rainy days come and go."
      },
      {
       "k": "points",
       "h": "Sad can feel like",
       "items": [
        [
         "Tears",
         "It’s okay to cry"
        ],
        [
         "A heavy body",
         "Slow and tired"
        ],
        [
         "Wanting a hug",
         "Or wanting to be close"
        ]
       ],
       "cue": {
        "at": [
         0,
         2,
         3
        ]
       },
       "say": "Sad can feel like tears. It is okay to cry. Sad can make your body feel heavy and tired. And sad can make you want a hug."
      },
      {
       "k": "words",
       "h": "Name it out loud",
       "items": [
        "I feel sad.",
        "I feel sad because..."
       ],
       "beats": [
        "Let us name it.",
        "Say it out loud with me.",
        "I feel sad.",
        {
         "t": "Now, if you want, say why you feel sad, and I will wait.",
         "w": 10
        }
       ],
       "say": "Let us name it. Say it out loud with me. I feel sad. Now, if you want, say why you feel sad, and I will wait."
      },
      {
       "k": "points",
       "h": "A cozy hug",
       "items": [
        [
         "Hug yourself",
         "Arms around, squeeze gently"
        ],
        [
         "Or hug something soft",
         "A pillow or a stuffed friend"
        ],
        [
         "Rock slowly",
         "Side to side"
        ]
       ],
       "cue": {
        "at": [
         0,
         2,
         3
        ],
        "p": {
         "3": 3
        }
       },
       "say": "Now give yourself a cozy hug. Wrap your arms around yourself and squeeze gently. Or hug a pillow, or a soft stuffed friend. Rock slowly, side to side."
      },
      {
       "k": "breathe",
       "h": "Slow breaths",
       "sub": "In slow. Out slow.",
       "hold": 14,
       "say": "Now breathe slow with the circle. In. And out."
      },
      {
       "k": "big",
       "h": "Tell a safe grown-up you feel sad.",
       "sub": "A parent, grandparent, teacher, or school counselor.",
       "say": "Sad feels better when you share it. Go tell a safe grown-up. A parent, a grandparent, a teacher, or your school counselor. You can say, I feel sad. Can you sit with me?"
      },
      {
       "k": "big",
       "h": "You are loved, on rainy days too.",
       "say": "You are loved on sunny days, and on rainy days too."
      }
     ]
    },
    {
     "id": "mp-r-miss",
     "n": 6,
     "title": "When I Miss Someone",
     "mins": 3,
     "blurb": "A heart hug and a happy memory for when you miss someone you love.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Miss Someone",
       "sub": "Missing is a kind of love.",
       "say": "Sometimes we miss someone a whole lot. Maybe they live far away. Maybe they are gone for a while. Or maybe they died. If you are missing someone right now, come sit with me."
      },
      {
       "k": "big",
       "h": "Missing someone is love.",
       "sub": "Your heart is remembering them.",
       "say": "That achy feeling inside has a name. It is called missing. And missing someone is a kind of love. Your heart is remembering them."
      },
      {
       "k": "breathe",
       "h": "Hug breaths",
       "sub": "Arms around you. Slow and soft.",
       "hold": 14,
       "say": "Let us give your heart a hug. Wrap your arms around yourself, like a big, cozy hug. Now breathe in slowly. And let it out, nice and long. Again, in. And out."
      },
      {
       "k": "points",
       "h": "Think of them",
       "items": [
        [
         "Hand on your heart",
         "Thump, thump"
        ],
        [
         "Picture their face",
         "Their smile, their voice"
        ],
        [
         "One happy time",
         "Something you did together"
        ]
       ],
       "cue": {
        "w": {
         "4": 10
        },
        "at": [
         0,
         2,
         3
        ]
       },
       "say": "Now put one hand on your heart. Can you feel it go thump, thump? Close your eyes, if you like, and picture their face. Think of one happy time you had together. Stay with that happy time for a little while."
      },
      {
       "k": "words",
       "h": "Say it softly",
       "items": [
        "I miss you.",
        "I love you.",
        "I remember you."
       ],
       "cue": {
        "p": {
         "1": 1.5,
         "2": 1.5,
         "3": 2
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "You can tell them, out loud or in your head. I miss you. I love you. I remember you."
      },
      {
       "k": "points",
       "h": "Ways to feel close",
       "items": [
        [
         "Draw a picture",
         "You and them together"
        ],
        [
         "Hold something of theirs",
         "A photo, a gift, a sweater"
        ],
        [
         "Tell a grown-up",
         "Share a story about them"
        ]
       ],
       "say": "Here are some ways to feel close to them. Draw a picture of the two of you. Hold something that reminds you of them, like a photo or a gift. And tell a grown-up a story about them. Missing feels lighter when we share it."
      },
      {
       "k": "big",
       "h": "You can miss them and still have fun.",
       "sub": "Both can be true.",
       "say": "You can miss someone and still laugh and play today. Both can be true. Your heart has room for all of it."
      }
     ]
    },
    {
     "id": "mp-r-new",
     "n": 7,
     "title": "Before Something New",
     "mins": 2,
     "blurb": "Calm the butterflies and find your brave before something new.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "Before Something New",
       "sub": "Brave can feel wobbly.",
       "say": "Is something new coming up? A new school, a new class, a new team, or a new place? New things can make your tummy feel full of butterflies. Let us get ready together."
      },
      {
       "k": "big",
       "h": "Butterflies mean it matters.",
       "sub": "Brave and nervous can go together.",
       "say": "Butterflies in your tummy are normal. They show up when something matters to you. Being brave means you feel the butterflies, and you take a step anyway."
      },
      {
       "k": "breathe",
       "h": "Smell the flower, blow the candle",
       "sub": "In through your nose. Out, soft and slow.",
       "hold": 14,
       "say": "Let us calm those butterflies. Pretend you are holding a flower. Smell it slowly through your nose. Now pretend it is a candle. Blow it out, soft and slow. Smell the flower. Blow the candle."
      },
      {
       "k": "words",
       "h": "Brave words",
       "items": [
        "I can do new things.",
        "I can ask for help.",
        "I can try."
       ],
       "cue": {
        "w": {
         "4": 9
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Now let us find some brave words. I can do new things. I can ask for help. I can try. Say them out loud with me, nice and strong."
      },
      {
       "k": "points",
       "h": "Get ready a little",
       "items": [
        [
         "Ask questions",
         "What will happen there?"
        ],
        [
         "Picture it going okay",
         "See yourself walking in"
        ],
        [
         "Pack a little brave",
         "A note or a small thing from home"
        ]
       ],
       "cue": {
        "at": [
         0,
         2,
         3
        ]
       },
       "say": "Here are ways to get ready. Ask your grown-up questions, like, what will happen there? And who will be with me? Picture yourself walking in, and picture it going okay. And pack a little brave, like a note from home or a small treasure in your pocket."
      },
      {
       "k": "big",
       "h": "New things can become your things.",
       "sub": "Every friend was new once.",
       "say": "Every favorite place was new once. Every friend was new once, too. New things can become your things. You are ready to try."
      }
     ]
    },
    {
     "id": "mp-r-wiggles",
     "n": 8,
     "title": "Wiggles Out",
     "mins": 3,
     "blurb": "Shake, stomp, and hop the wiggles out, then help your body settle.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "Wiggles Out",
       "sub": "Shake, stomp, and settle.",
       "say": "Do you have the wiggles? Is your body bouncy and buzzy, and it is hard to sit still? That is okay. Bodies love to move. Let us get those wiggles out, and then help your body settle."
      },
      {
       "k": "big",
       "h": "Stand up and make some room.",
       "sub": "Arms out wide. Nothing to bump.",
       "cue": {
        "p": {
         "1": 2
        }
       },
       "say": "Stand up, if you can. Hold your arms out wide and check that you have room. Nothing to bump? Great."
      },
      {
       "k": "points",
       "h": "Shake like a wet puppy",
       "items": [
        [
         "Shake your hands",
         "Wiggle, wiggle"
        ],
        [
         "Shake your arms",
         "Up high, down low"
        ],
        [
         "Shake your legs",
         "One, then the other"
        ],
        [
         "Freeze!",
         "Still as a statue"
        ]
       ],
       "cue": {
        "w": {
         "0": 5,
         "1": 5,
         "2": 6,
         "4": 4
        },
        "at": [
         0,
         1,
         2,
         3
        ]
       },
       "say": "Shake your hands like a wet puppy. Now shake your arms, up high and down low. Now shake your legs, one and then the other. And freeze! Still as a statue."
      },
      {
       "k": "points",
       "h": "Animal moves",
       "items": [
        [
         "Stomp like an elephant",
         "Big, heavy steps"
        ],
        [
         "Hop like a bunny",
         "Little, quick hops"
        ],
        [
         "Stretch like a cat",
         "Tall and slow"
        ]
       ],
       "cue": {
        "p": {
         "1": 5,
         "2": 5,
         "3": 5
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Now some animal moves. Stomp like an elephant, with big, heavy steps. Hop like a bunny, with little, quick hops. Then stretch up tall like a cat, slow and long."
      },
      {
       "k": "breathe",
       "h": "Now settle",
       "sub": "Slow and soft, like a sleepy cat.",
       "hold": 14,
       "say": "Now let your body settle. Stand still, or sit down. Breathe in slowly. And let it out, long and slow. Feel your body getting calm and quiet."
      },
      {
       "k": "big",
       "h": "Moving helps. Resting helps too.",
       "sub": "Wiggle out, then settle in.",
       "say": "Your body loves to move, and it loves to rest. When the wiggles come back, you know just what to do. Wiggle out, then settle in."
      }
     ]
    },
    {
     "id": "mp-r-unkind",
     "n": 9,
     "title": "When Someone Was Unkind",
     "mins": 2,
     "blurb": "Kind words for your hurt heart, and who to tell.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When Someone Was Unkind",
       "sub": "Your heart matters.",
       "say": "Did someone say something mean, or leave you out, or push you? That can really hurt inside. I am glad you are here. Let us help your heart feel a little better."
      },
      {
       "k": "big",
       "h": "You deserve kindness.",
       "sub": "Sad, mad, or both is okay.",
       "say": "First, you deserve kindness. Everyone does, and that includes you. It makes sense to feel sad, or mad, or both."
      },
      {
       "k": "breathe",
       "h": "Breathe it out",
       "sub": "In slowly. Out long.",
       "hold": 12,
       "say": "Let us breathe out some of that hurt. Breathe in slowly through your nose. And blow it out, long and slow. One more time."
      },
      {
       "k": "words",
       "h": "Kind words to me",
       "items": [
        "I matter.",
        "I am loved.",
        "I am still me."
       ],
       "cue": {
        "w": {
         "4": 9
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Put a hand on your heart and say these kind words to yourself. I matter. I am loved. I am still me. Now say them again, out loud or in your head, and feel your hand on your heart."
      },
      {
       "k": "points",
       "h": "What can help",
       "items": [
        [
         "Tell a grown-up",
         "A parent, a teacher, a counselor"
        ],
        [
         "Find a kind friend",
         "Play with someone nice to you"
        ],
        [
         "Stay near grown-ups",
         "At recess and on the bus"
        ]
       ],
       "cue": {
        "at": [
         1,
         3,
         4
        ]
       },
       "say": "Here is what can help. Tell a grown-up what happened, like your parent, your teacher, or your school counselor. Telling is asking for help, and that is brave. Find a kind friend to play with. And if it keeps happening, stay close to grown-ups at recess and on the bus."
      },
      {
       "k": "big",
       "h": "If someone hurts you, tell a grown-up.",
       "sub": "You are not in trouble.",
       "say": "If someone keeps being mean, or hurts your body, always tell a grown-up. You are not in trouble. Grown-ups want to know, so they can help."
      },
      {
       "k": "big",
       "h": "You are worth being kind to.",
       "sub": "Be kind to yourself, too.",
       "say": "You are worth being kind to. And that means being kind to yourself, too, right now."
      }
     ]
    },
    {
     "id": "mp-r-tell",
     "n": 10,
     "title": "When I Need to Tell a Grown-up",
     "mins": 3,
     "blurb": "When something feels wrong, tell a safe grown-up, and keep telling until someone helps.",
     "scenes": [
      {
       "k": "title",
       "hero": "maple",
       "eyebrow": "Support for Right Now",
       "h": "When I Need to Tell a Grown-up",
       "sub": "Telling is brave.",
       "say": "Sometimes something happens that feels wrong, or scary, or mixed up. When that happens, tell a safe grown-up. Let us learn how, together."
      },
      {
       "k": "big",
       "h": "Your body belongs to you.",
       "sub": "You can say no. You can say stop.",
       "say": "Here is something important. Your body belongs to you. You can say no, and you can say stop."
      },
      {
       "k": "points",
       "h": "Tell a grown-up when",
       "items": [
        [
         "Something feels wrong",
         "Yucky, scary, or mixed up"
        ],
        [
         "Someone hurts you",
         "Or touches you in a way that is not okay"
        ],
        [
         "Someone says keep it secret",
         "Bad-feeling secrets get told"
        ]
       ],
       "cue": {
        "at": [
         0,
         1,
         2
        ]
       },
       "say": "Tell a safe grown-up when something feels wrong, or yucky, or mixed up inside. Tell when someone hurts you, or touches you in a way that is not okay. And tell when someone says to keep it a secret. Surprises, like a birthday present, are happy and short. Secrets that feel bad always get told."
      },
      {
       "k": "big",
       "h": "It is never your fault.",
       "sub": "You are not in trouble for telling.",
       "say": "If something like this happens, it is never your fault, even if someone said it was. You are not in trouble for telling. Telling is brave, and it is the right thing to do."
      },
      {
       "k": "points",
       "h": "My helping hand",
       "items": [
        [
         "Hold up one hand",
         "Spread your fingers wide"
        ],
        [
         "One finger, one grown-up",
         "Who could you tell?"
        ],
        [
         "Safe grown-ups",
         "Parent, grandparent, teacher, counselor"
        ]
       ],
       "cue": {
        "w": {
         "4": 12
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Now let us make a helping hand. Hold up one hand and spread your fingers wide. For each finger, think of one safe grown-up you could tell. It might be a parent, a grandparent, a teacher, or your school counselor. Take your time, and count them on your fingers."
      },
      {
       "k": "words",
       "h": "Words to start",
       "items": [
        "I need to tell you something.",
        "Something happened, and I need help."
       ],
       "cue": {
        "p": {
         "1": 2,
         "2": 2
        },
        "at": [
         1,
         2
        ]
       },
       "say": "If it feels hard to start, you can say this. I need to tell you something. Something happened, and I need help."
      },
      {
       "k": "big",
       "h": "Keep telling until someone helps.",
       "sub": "Tell another grown-up, and another.",
       "say": "If you tell a grown-up and they do not help, tell another one. And another. Keep telling until someone helps you. You deserve to be safe."
      },
      {
       "k": "big",
       "h": "If a friend tells you something scary, tell too.",
       "sub": "Even if they asked you not to.",
       "say": "And if a friend tells you something scary, like someone is hurting them, or they want to hurt themselves, tell a grown-up right away. Even if they asked you to keep it a secret. That is how friends help friends."
      },
      {
       "k": "big",
       "h": "You are brave, and you are loved.",
       "sub": "Grown-ups: When Life Changes has guides for this.",
       "say": "You are brave. You are loved. And there are grown-ups who want to help you, always."
      }
     ]
    }
   ]
  }
 ]
},
  aspen: {
 "title": "Learn Aspen",
 "intro": "Short lessons, narrated aloud. Watch on your own or with a grown-up, in any order.",
 "supportFirst": true,
 "support": {
  "eyebrow": "Support",
  "title": "Support for Right Now",
  "intro": "Short videos to use in the middle of a hard moment. Open one anytime, as often as you need. Nothing to finish."
 },
 "lessonsTitle": "Learn Step by Step",
 "tracks": [
  {
   "id": "aspen-start",
   "title": "Start Here",
   "who": "For students in grades 6 to 8, and their grown-ups",
   "lessons": [
    {
     "id": "as-welcome",
     "n": 1,
     "title": "Welcome to Aspen",
     "mins": 4,
     "blurb": "A first look at your tree, its six parts, and how Aspen works.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Start Here, Lesson 1",
       "h": "Welcome to Aspen",
       "sub": "Rooted together.",
       "say": "Welcome to Aspen. Aspen is a tree for students in grades six to eight, and for the grown-ups who walk with them. This lesson shows you around."
      },
      {
       "k": "big",
       "h": "Aspens grow fast, and they grow together.",
       "sub": "A whole grove can share one set of roots.",
       "say": "Aspen trees grow fast, and a whole grove of them can grow from the same roots. Middle school is a lot like that. You are changing fast, and you grow best with good people around you."
      },
      {
       "k": "six",
       "h": "Six parts make you whole",
       "words": [
        "What keeps you steady",
        "Goals and trying new things",
        "Naming feelings, asking for help",
        "Friends, family, belonging",
        "Sleep, movement, real meals",
        "Hope for what's ahead"
       ],
       "say": "Your tree has six parts. Roots, what grounds you. Trunk, your purpose. Bark, your mind and feelings. Branches, your people. Leaves, your body. And Fruit, your hope. Being whole means noticing all six, not just one or two."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Home",
        "Students",
        "Grown-ups",
        "When Life Changes",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "Students",
        "p": "Tap your name, or add yourself."
       },
       "say": "To begin, open the Students tab. Tap your name, or add yourself with your first name and your grade. A grown-up agrees when your profile is made, and your tree is locked with a passcode only you know."
      },
      {
       "k": "flow",
       "h": "How Aspen works",
       "steps": [
        [
         "Check in",
         "Questions for your grade"
        ],
        [
         "See your levels",
         "Strong, Steady, Growing Edge"
        ],
        [
         "Tend each day",
         "Small practices"
        ],
        [
         "Add a ring",
         "Each full check-in"
        ]
       ],
       "say": "Here is how Aspen works. Check in, with questions written for your grade. See how each part is doing: Strong, Steady, or Growing Edge. A Growing Edge is a part to tend, not a grade. Tend a little each day with small practices. And each full check-in adds a growth ring to your tree."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 0,
       "note": {
        "h": "Your tree",
        "p": "Five tabs for tending your tree."
       },
       "say": "Once you are in, your tree has five tabs. Today, Week, Season, Growth Plan, and Guides. The next lessons walk through each one, step by step."
      },
      {
       "k": "big",
       "h": "One slow breath before your phone.",
       "sub": "Wake up slow, from Today.",
       "beats": [
        "Aspen has a tiny practice for the start of each day.",
        "Before you grab your phone, take one slow breath and notice how you feel.",
        {
         "t": "Try it right now.",
         "w": 10
        }
       ],
       "say": "Aspen has a tiny practice for the start of each day. Before you grab your phone, take one slow breath and notice how you feel. Try it right now."
      },
      {
       "k": "points",
       "h": "Yours to keep",
       "items": [
        [
         "No account",
         "Your tree stays on this device"
        ],
        [
         "Your grown-up sees the big picture",
         "Plus a few safety answers"
        ],
        [
         "Need help now?",
         "One tap, any time"
        ]
       ],
       "say": "Aspen is yours. There is no account, and your tree stays on this device. Your grown-up sees the big picture of your tree, plus a few safety answers, so they can help. And the Need help now button is always one tap away."
      },
      {
       "k": "points",
       "h": "More in Aspen",
       "items": [
        [
         "When Life Changes",
         "Guides for the hard stuff"
        ],
        [
         "Learn",
         "Lessons, and Support for Right Now"
        ],
        [
         "The Grove",
         "Your tree beside your family"
        ]
       ],
       "say": "There is more. When Life Changes has guides about hard things, written for grown-ups, and you can read them too. Learn has short lessons like this one, plus Support for Right Now videos for hard moments. And your tree can stand in The Grove beside your family's trees, showing only your growth, never your answers."
      },
      {
       "k": "quiz",
       "q": "What does a Growing Edge mean?",
       "opts": [
        "You failed that part",
        "A part to tend, where growth begins",
        "You need to start over"
       ],
       "right": 1,
       "why": "A Growing Edge is a part to tend, not a grade.",
       "say": "Quick question. What does a Growing Edge mean?"
      }
     ]
    }
   ]
  },
  {
   "id": "aspen-using",
   "title": "Using Aspen",
   "who": "Every part of Aspen, tab by tab",
   "certTitle": "Aspen: Using Aspen",
   "certLine": "For finishing every lesson on using Aspen, tab by tab.",
   "lessons": [
    {
     "id": "as-u-checkin",
     "n": 1,
     "title": "Your First Check-in",
     "mins": 5,
     "blurb": "How the check-in works, step by step, and how to take it well.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 1",
       "h": "Your First Check-in",
       "sub": "An honest look at all six parts.",
       "say": "Everything in Aspen starts with a check-in. This lesson walks you through your first one, so you know what to expect."
      },
      {
       "k": "card",
       "title": "Add a student",
       "body": "First name or nickname, and your grade.",
       "fields": [
        [
         "First name or nickname",
         "Sam"
        ],
        [
         "Grade",
         "7th"
        ]
       ],
       "btns": [
        "Add and start"
       ],
       "tap": 0,
       "say": "First, open the Students tab and add yourself. Type your first name or a nickname, pick your grade, and tap Add and start. A grown-up agrees when your profile is made, and your tree is locked with a passcode only you know. You can also just try it without saving, and then your tree is kept only until the page closes."
      },
      {
       "k": "card",
       "title": "Before you start",
       "body": "How are you doing this check-in?",
       "btns": [
        "On my own",
        "With a grown-up"
       ],
       "tap": 0,
       "say": "Before you start, Aspen asks how you are doing this check-in. On my own, or With a grown-up. With a grown-up, they see a gold note after each answer, with a question to talk about together. For a check-in you do together, your grown-up can see every answer."
      },
      {
       "k": "points",
       "h": "Six parts, six questions each",
       "items": [
        [
         "36 questions",
         "Written for your grade"
        ],
        [
         "Then two safety questions",
         "You can skip them"
        ],
        [
         "Pause anytime",
         "Aspen keeps your place"
        ]
       ],
       "say": "The check-in has thirty six questions, six for each part, written for your grade. Then come two short safety questions, and you can skip them if you want. Tap Pause anytime, and Aspen keeps your place."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Check-in: Roots",
       "rows": [
        [
         "Is there a place or a moment where you feel calm and peaceful inside?",
         ""
        ],
        [
         "Yeah, most of the time",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "Not sure",
         ""
        ]
       ],
       "tap": 2,
       "say": "Each question has three answers, plus Not sure. Yeah, most of the time. Sometimes. Or Not really. Answer with what is true lately, not what you wish were true. And Not sure is always okay."
      },
      {
       "k": "points",
       "h": "Helpers on every page",
       "items": [
        [
         "Why this question?",
         "See why Aspen asks it"
        ],
        [
         "Read Aloud",
         "Hear each question"
        ],
        [
         "Next part",
         "When all six are answered"
        ]
       ],
       "say": "Every page has helpers. Tap Why this question to see why Aspen asks it. Turn on Read Aloud to hear the questions. When you have answered all six, tap Next part."
      },
      {
       "k": "points",
       "h": "Some questions are turned around",
       "items": [
        [
         "Most ask what is going well",
         "Yes counts up"
        ],
        [
         "A few ask what is hard",
         "Yes counts down"
        ],
        [
         "Answer each one plainly",
         "Aspen does the math"
        ]
       ],
       "say": "A few questions are turned around on purpose. Most ask about what is going well. A few ask about what is hard, like whether you feel lonely or left out. Just answer each one plainly. Aspen does the math."
      },
      {
       "k": "big",
       "h": "Is there a place where you feel calm inside?",
       "sub": "Answer it in your head.",
       "beats": [
        "Let's try one.",
        "Is there a place or a moment where you feel calm and peaceful inside?",
        "Yeah, most of the time, sometimes, not really, or not sure.",
        {
         "t": "Answer it in your head, honestly.",
         "w": 8
        }
       ],
       "say": "Let's try one. Is there a place or a moment where you feel calm and peaceful inside? Yeah, most of the time, sometimes, not really, or not sure. Answer it in your head, honestly."
      },
      {
       "k": "points",
       "h": "Two last questions",
       "items": [
        [
         "Asked gently",
         "To help keep you safe"
        ],
        [
         "Your grown-up sees these",
         "So they can help"
        ],
        [
         "Help is right there",
         "988, 741741, and 911"
        ]
       ],
       "say": "At the end come two safety questions. They ask whether anyone is hurting you, and whether you have had thoughts of hurting yourself. Your grown-up always sees these answers, so they can help. If you need help, a calm card opens with people you can reach any time. Call or text nine eight eight. Text HOME to seven four one seven four one. And if you are in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Tell a grown-up you trust.",
       "sub": "A parent, teacher, or school counselor.",
       "say": "You can always tell a grown-up you trust, like a parent, a grandparent, a teacher, or a school counselor. Telling the truth is brave, and people want to help."
      },
      {
       "k": "points",
       "h": "To take it well",
       "items": [
        [
         "Find a quiet moment",
         "Take your time"
        ],
        [
         "Go with your first honest answer",
         "No need to overthink"
        ],
        [
         "Finish and add my ring",
         "Your first ring is your start"
        ]
       ],
       "say": "A few tips. Find a quiet moment. Go with your first honest answer. And when you reach the end, tap Finish and add my ring. Your first ring shows where your tree is starting."
      },
      {
       "k": "quiz",
       "q": "What does Not sure mean in a check-in?",
       "opts": [
        "You did it wrong",
        "An honest answer that is always okay",
        "Your tree loses a ring"
       ],
       "right": 1,
       "why": "Not sure is always okay, and it never counts against a part.",
       "say": "Quick question. What does Not sure mean in a check-in?"
      }
     ]
    },
    {
     "id": "as-u-tree",
     "n": 2,
     "title": "Your Tree and Your Levels",
     "mins": 4,
     "blurb": "Reading Strong, Steady, and Growing Edge, and how your tree and rings grow.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 2",
       "h": "Your Tree and Your Levels",
       "sub": "A picture of right now, not a grade.",
       "say": "After a check-in, Aspen shows how each part of your tree is doing. This lesson is about reading it well, and about how your tree grows over time."
      },
      {
       "k": "points",
       "h": "Three levels",
       "items": [
        [
         "Strong",
         "Growing strong right now",
         "#5F7D48"
        ],
        [
         "Steady",
         "Doing okay, with room to grow",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "Where your next growth begins",
         "#B8612F"
        ]
       ],
       "say": "Each part gets one of three levels. Strong means it is growing strong right now. Steady means it is doing okay, with room to grow. And Growing Edge means it is where your next growth begins."
      },
      {
       "k": "big",
       "h": "A Growing Edge is a part to tend, not a grade.",
       "sub": "Everyone has one.",
       "say": "A Growing Edge is not a bad grade. It is a part to tend. Everyone has one, grown-ups too. And Aspen will help you tend it."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "A new ring for your tree",
       "rows": [
        [
         "Roots",
         "Strong",
         "#5F7D48"
        ],
        [
         "Trunk",
         "Steady",
         "#8B5E1A"
        ],
        [
         "Bark",
         "Growing Edge",
         "#B8612F"
        ],
        [
         "Branches",
         "Strong",
         "#5F7D48"
        ],
        [
         "Leaves",
         "Growing Edge",
         "#B8612F"
        ],
        [
         "Fruit",
         "Steady",
         "#8B5E1A"
        ]
       ],
       "tap": 2,
       "panel": {
        "h": "Aspen suggests two parts",
        "sub": "Start with Bark and Leaves.",
        "items": [
         "Build my growth plan",
         "See my rings",
         "Back to my tree"
        ]
       },
       "say": "Your results show each part and its level. Aspen also suggests two parts to start tending, the ones that could use it most right now. You can always choose any part you like. From here, tap Build my growth plan, or See my rings."
      },
      {
       "k": "points",
       "h": "Read it with kindness",
       "items": [
        [
         "Notice your strengths",
         "They help the other parts grow"
        ],
        [
         "Look for patterns",
         "Parts lean on each other"
        ],
        [
         "Pick one or two to start",
         "Not all six at once"
        ]
       ],
       "say": "Read your results with kindness. Notice your strengths first. A strong part can help the others grow. Look for patterns. When you sleep badly, your feelings often feel it too. And pick one or two parts to start with, not all six at once."
      },
      {
       "k": "points",
       "h": "Talk it over",
       "items": [
        [
         "Your grown-up sees your levels",
         "So they can help"
        ],
        [
         "Show them one part",
         "And what you want to try"
        ],
        [
         "Ask what helps them",
         "Grown-ups have edges too"
        ]
       ],
       "say": "Your grown-up sees your levels too, so they can help. You might show them one part and tell them what you want to try. And ask them what helps them with that part. Grown-ups have growing edges too."
      },
      {
       "k": "big",
       "h": "Name one strength. Name one edge.",
       "sub": "Just for you.",
       "beats": [
        "Try this now.",
        "Think of one part of your tree that feels strong for you lately.",
        "Now think of one part you would like to grow.",
        {
         "t": "Name them both, out loud or in your head.",
         "w": 10
        }
       ],
       "say": "Try this now. Think of one part of your tree that feels strong for you lately. Now think of one part you would like to grow. Name them both, out loud or in your head."
      },
      {
       "k": "points",
       "h": "Your rings",
       "items": [
        [
         "Each full check-in adds a ring",
         "Your tree grows with you"
        ],
        [
         "Grew, Dipped, or Same",
         "Compared with your last ring"
        ],
        [
         "Darker lines",
         "Mark a new school year"
        ]
       ],
       "say": "Every full check-in adds a growth ring. To see them, open Season and tap My progress over time. Tap any ring to see that check-in. Aspen shows whether each part grew, dipped, or stayed the same since your last ring. And darker lines mark a new school year, so by eighth grade your tree holds years of you."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 0,
       "note": {
        "h": "Your tree, today",
        "p": "It shows how your tending is going."
       },
       "say": "Your tree also lives on the Today tab. It shows how your tending is going, along with your Days Tended and your Rings."
      },
      {
       "k": "points",
       "h": "Your tree is gentle",
       "items": [
        [
         "Thriving",
         "When you tend it"
        ],
        [
         "A little dry, then drooping",
         "After some days away"
        ],
        [
         "Resting bare",
         "Nothing is lost"
        ]
       ],
       "say": "When you tend it, your tree thrives. Miss a few days, and it looks a little dry, then it droops. After a couple of weeks away, it rests bare. It never dies, and nothing is ever taken away. One practice perks it up, and a few days of tending bring it all the way back."
      },
      {
       "k": "big",
       "h": "Every level is a starting point.",
       "say": "Remember, every level is a starting point. It tells you where you are, so you can choose where to grow."
      },
      {
       "k": "quiz",
       "q": "What does Aspen compare each new ring with?",
       "opts": [
        "Other students",
        "Your last ring",
        "A perfect score"
       ],
       "right": 1,
       "why": "Aspen shows whether each part grew, dipped, or stayed the same since your last ring.",
       "say": "Quick question. What does Aspen compare each new ring with?"
      }
     ]
    },
    {
     "id": "as-u-today",
     "n": 3,
     "title": "Today, Growth Plan, and Season",
     "mins": 4,
     "blurb": "Your growth plan, daily tending, the weekly check-in, and the twelve-week season.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 3",
       "h": "Today, Growth Plan, and Season",
       "sub": "A little each day adds up.",
       "say": "Aspen has a gentle rhythm. Pick a few practices, tend a little each day, check in each week, and add a ring each season. Here is how it fits together."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 3,
       "note": {
        "h": "Growth Plan",
        "p": "Pick small practices for each part."
       },
       "say": "Start with Growth Plan. After a check-in, tap Build my growth plan. Each part of your tree has practices to pick from, written for your grade."
      },
      {
       "k": "points",
       "h": "Suggestions, never limits",
       "items": [
        [
         "Strong: about 3",
         "To keep it strong",
         "#5F7D48"
        ],
        [
         "Steady: about 4",
         "To help it grow",
         "#8B5E1A"
        ],
        [
         "Growing Edge: about 5",
         "More ways to tend it",
         "#B8612F"
        ]
       ],
       "say": "Aspen suggests about three practices for a strong part, four for a steady one, and five for a growing edge. These are suggestions, never limits. Pick as many or as few as fit your life."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Growth Plan: Bark",
       "rows": [
        [
         "Breathe in for four, out for six, five times.",
         "Picked",
         "#5F7D48"
        ],
        [
         "Write one thing you did well today.",
         ""
        ],
        [
         "Name five things you can see.",
         ""
        ],
        [
         "Learn more",
         ""
        ],
        [
         "Show Me Others",
         ""
        ]
       ],
       "tap": 3,
       "say": "Tap a practice to pick it. Each one shows its kind, like Move, Write or draw, Quiet, or Connect, and about how many minutes it takes. Tap Learn more to see why it helps, how to do it, what to do if it is hard, and a way to try it with a grown-up. Show Me Others brings up more choices."
      },
      {
       "k": "points",
       "h": "Make it yours",
       "items": [
        [
         "Write your own",
         "Anything that tends a part"
        ],
        [
         "Save my growth plan",
         "Your practices go to Today"
        ],
        [
         "Change it anytime",
         "Your plan grows with you"
        ]
       ],
       "say": "Make it yours. You can write your own practice for any part, like shooting hoops with your brother or texting a friend. Then tap Save my growth plan, and your practices show up in Today. You can change your plan anytime."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 0,
       "note": {
        "h": "Today",
        "p": "Check off any one practice, and your tree is watered."
       },
       "say": "Now open Today. Your practices are here, grouped by part. Check off any one, and your tree is watered for the day. Tend all six parts, and that is a full day. At the top is Wake up slow, and at the bottom, End the day."
      },
      {
       "k": "points",
       "h": "On a hard day",
       "items": [
        [
         "Easier today",
         "A smaller version that counts"
        ],
        [
         "Add a note",
         "One line, just for you"
        ],
        [
         "One is enough",
         "Any practice waters your tree"
        ]
       ],
       "say": "On a hard day, tap Easier today for a smaller version of a practice. It still counts. Add a note if you like, just one line. And remember, one practice is enough to water your tree."
      },
      {
       "k": "big",
       "h": "In for four. Out for six.",
       "sub": "A Bark practice from Aspen.",
       "beats": [
        "Let's try one practice right now.",
        "This one is from Bark.",
        "Breathe in slowly for four, then out for six.",
        {
         "t": "Do one round, at your own pace.",
         "w": 10
        }
       ],
       "say": "Let's try one practice right now. This one is from Bark. Breathe in slowly for four, then out for six. Do one round, at your own pace."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 1,
       "note": {
        "h": "Week",
        "p": "A theme, a short check-in, and a question."
       },
       "say": "Each week brings a theme, a short check-in, and a question to think about. The weekly check-in asks one question for each part. Your reflection is just for you, unless you choose to share it with your grown-up. Week also has your calendar, where every day you tended is filled in."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Today",
        "Week",
        "Season",
        "Growth Plan",
        "Guides"
       ],
       "tap": 2,
       "note": {
        "h": "Season",
        "p": "Twelve weeks. A full check-in adds a ring."
       },
       "say": "A season is twelve weeks, from Planting to Rooting to Blooming. It begins the day you finish your first full check-in. At week twelve, your season check-in is ready. A full check-in then adds a ring and begins a new season. And you can check in anytime."
      },
      {
       "k": "big",
       "h": "No streaks to break. Growth only adds.",
       "sub": "Missed a few days? Pick up today.",
       "say": "There are no streaks to break in Aspen. Growth only adds. If you miss a few days, just pick up today. Your tree is always glad to see you."
      },
      {
       "k": "quiz",
       "q": "What waters your tree for the day?",
       "opts": [
        "Checking off any one practice",
        "Finishing every practice",
        "A full check-in"
       ],
       "right": 0,
       "why": "Any one practice waters your tree. One is enough.",
       "say": "Quick question. What waters your tree for the day?"
      }
     ]
    },
    {
     "id": "as-u-changes",
     "n": 4,
     "title": "When Life Changes",
     "mins": 4,
     "blurb": "Where Aspen keeps guides for the hard stuff, and how to use them with a grown-up.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 4",
       "h": "When Life Changes",
       "sub": "Guides for the hard stuff.",
       "say": "Sometimes life changes fast. Someone gets sick, a friend group falls apart, or the news gets scary. This lesson shows you where Aspen keeps help for moments like that."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Home",
        "Students",
        "Grown-ups",
        "When Life Changes",
        "Learn"
       ],
       "tap": 3,
       "note": {
        "h": "When Life Changes",
        "p": "Guides for hard things, open any time."
       },
       "say": "Look at the tabs across the top of Aspen. Right after Grown-ups is When Life Changes. It holds forty nine guides for hard things, and you can open it any time."
      },
      {
       "k": "points",
       "h": "Guides in five groups",
       "items": [
        [
         "Home and family",
         "Moving, divorce, a death, a new baby"
        ],
        [
         "Friends and school",
         "Drama, being left out, bullying"
        ],
        [
         "Growing up and online",
         "Phones, sleep, faith, who you are"
        ],
        [
         "Big world, hard news",
         "Plus Safety, when someone is hurting"
        ]
       ],
       "say": "The guides come in five groups. Home and family, for things like moving, divorce, or a death. Friends and school, for drama, being left out, and bullying. Growing up and online, for phones, sleep, big questions about faith, and figuring out who you are. Big world, hard news, for things like storms and scary headlines. And Safety, for when you or a friend is hurting."
      },
      {
       "k": "points",
       "h": "Written for grown-ups, open to you",
       "items": [
        [
         "Written for your grown-ups",
         "To help them talk with you"
        ],
        [
         "You can read them too",
         "Any guide, any time"
        ],
        [
         "Or read one together",
         "Ask a grown-up to sit with you"
        ]
       ],
       "say": "These guides are written for grown-ups, to help them talk with you about hard things. You can read them too. Or ask your grown-up to read one with you. Sometimes it is easier to start a hard talk when you are both looking at the same page."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Being left out",
       "rows": [
        [
         "Watch: For You",
         ""
        ],
        [
         "Watch: For the Grown-up",
         ""
        ],
        [
         "Quick Card",
         ""
        ],
        [
         "Talking It Through",
         ""
        ],
        [
         "Words you can use",
         ""
        ],
        [
         "Where to get help",
         ""
        ]
       ],
       "tap": 0,
       "say": "Open a guide, like Being left out. At the top are two short videos. For You is for the student going through it. For the Grown-up is for the parent or helper beside you. Below the videos, the guide has a Quick Card, Talking It Through, words you can use, and where to get help."
      },
      {
       "k": "card",
       "title": "Search",
       "body": "Type it in your own words.",
       "fields": [
        [
         "Search",
         "group chats"
        ]
       ],
       "btns": [
        "Search"
       ],
       "tap": 0,
       "result": "First phone and group chats",
       "say": "Not sure which guide fits? Type what is happening in your own words, like group chats, and Aspen finds the guides that fit."
      },
      {
       "k": "points",
       "h": "Inside your tree too",
       "items": [
        [
         "The Guides tab",
         "Your six parts, and When life gets hard"
        ],
        [
         "Your Growth Plan",
         "Guides for your grown-up, by part"
        ],
        [
         "Watched videos",
         "A quiet check marks them"
        ]
       ],
       "say": "You will find guides inside your own tree too. The Guides tab shows your six parts, and the same guides under When life gets hard. In your Growth Plan, each part lists a few guides for your grown-up. And once you watch a guide's video, a quiet check marks it."
      },
      {
       "k": "big",
       "h": "Who could read one with you?",
       "sub": "Picture a safe grown-up.",
       "beats": [
        "Think of one grown-up you could read a guide with.",
        "A parent, a grandparent, a teacher, or a school counselor.",
        {
         "t": "Picture their face, and say their name in your head.",
         "w": 10
        }
       ],
       "say": "Think of one grown-up you could read a guide with. A parent, a grandparent, a teacher, or a school counselor. Picture their face, and say their name in your head."
      },
      {
       "k": "points",
       "h": "When it can’t wait",
       "items": [
        [
         "Tell a safe grown-up",
         "Today, in person if you can"
        ],
        [
         "Call or text 988",
         "Any time, day or night"
        ],
        [
         "Text HOME to 741741",
         "Crisis Text Line"
        ],
        [
         "In danger right now?",
         "Call 911"
        ]
       ],
       "say": "Some moments can't wait for a guide. Tell a safe grown-up, today. Call or text nine eight eight, any time, day or night, or text HOME to seven four one seven four one. If someone is in danger right now, call nine one one. And the See the calm card button, at the bottom of When Life Changes, shows all of these in one place."
      },
      {
       "k": "big",
       "h": "Hard things are lighter when you carry them together.",
       "say": "Hard things are lighter when you carry them together. That is what these guides are for."
      },
      {
       "k": "quiz",
       "q": "Who are the When Life Changes guides written for?",
       "opts": [
        "Only teachers",
        "Grown-ups, and you can read them too",
        "Only students"
       ],
       "right": 1,
       "why": "They help grown-ups talk with you, and you can read any of them.",
       "say": "Quick question. Who are the When Life Changes guides written for?"
      }
     ]
    },
    {
     "id": "as-u-grown",
     "n": 5,
     "title": "The Grown-ups Tab",
     "mins": 7,
     "blurb": "What a grown-up sees in Aspen, and how to use it to help.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 5",
       "h": "The Grown-ups Tab",
       "sub": "Equal partners in Aspen.",
       "say": "Parents, guardians, and teachers are equal partners in Aspen. This lesson walks a grown-up through the Grown-ups tab. Students, you are welcome to watch too, so you know exactly what your grown-up sees."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Home",
        "Students",
        "Grown-ups",
        "When Life Changes",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Grown-ups",
        "p": "What students see, what you can see, and how to help."
       },
       "say": "Tap Grown-ups at the top of Aspen. It shows what students see, what you can see, and how to help."
      },
      {
       "k": "points",
       "h": "Your own grown-up profile",
       "items": [
        [
         "You agree for each student",
         "When their profile is made"
        ],
        [
         "You can open it",
         "With your own passcode"
        ],
        [
         "Open your profile first",
         "The round button at the top"
        ]
       ],
       "say": "When a student makes their own profile, a grown-up agrees for them. That grown-up can open the student's profile with their own passcode, so no child is ever alone with something hard. To see every student you agreed for, open your own grown-up profile with the round button at the top of the page. Each one then shows under Students on this device."
      },
      {
       "k": "flow",
       "h": "How Aspen works",
       "steps": [
        [
         "Check in",
         "36 questions, six per part"
        ],
        [
         "See the levels",
         "Strong, Steady, Growing Edge"
        ],
        [
         "Tend each day",
         "A growth plan of small practices"
        ],
        [
         "Add a ring",
         "Each twelve-week season"
        ]
       ],
       "say": "Here is the rhythm. Each check-in has thirty six questions, six for each part, written for the student's grade. Each part gets a level: Strong, Steady, or Growing Edge. Aspen points to two parts to tend, and the student builds a growth plan of small daily practices. A full check-in at the end of a twelve week season adds a growth ring."
      },
      {
       "k": "points",
       "h": "On my own, or with a grown-up",
       "items": [
        [
         "On my own",
         "The student checks in alone"
        ],
        [
         "With a grown-up",
         "A gold note after each answer"
        ],
        [
         "Done together",
         "Every answer is there for you after"
        ]
       ],
       "say": "Students choose how to check in. On my own, or With a grown-up. In grown-up mode, a gold note after each answer gives you a question to take the conversation deeper. And for a check-in you did together, every answer is there for you afterward."
      },
      {
       "k": "points",
       "h": "What you can see",
       "items": [
        [
         "Always shown to you",
         "Safety, lonely, bullied, giving up",
         "#B8612F"
        ],
        [
         "The big picture",
         "Levels, the tree, days tended",
         "#8B5E1A"
        ],
        [
         "Just theirs",
         "Other answers, notes, reflections",
         "#5F7D48"
        ]
       ],
       "say": "Aspen gives students privacy in three layers, and tells them so plainly before they start. Always shown to you: the two safety questions, and the questions about feeling lonely or left out, being bullied, and feeling like giving up. The big picture: each part's level, how the tree looks today, how many days they tended it, and which parts they are tending. And just theirs: the rest of their answers, the practices they check off, their notes, and their weekly reflections, unless they choose to share one with you."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Ring 3: grade 7",
       "rows": [
        [
         "Branches",
         "Growing Edge",
         "#B8612F"
        ],
        [
         "Worth a check-in",
         "What they said",
         "#B8612F"
        ],
        [
         "Answers always shown to you",
         ""
        ],
        [
         "How to start the check-in",
         ""
        ]
       ],
       "tap": 1,
       "panel": {
        "h": "How to start the check-in",
        "sub": "Pick a calm, private moment.",
        "items": [
         "Say what you noticed, without alarm",
         "Listen more than you talk",
         "Thank them for being honest"
        ]
       },
       "say": "Tap a student to see their rings. When an answer is worrying, that ring shows a Worth a check-in marker, with exactly what they said and what to do next. Then How to start the check-in walks you through it. Pick a calm, private moment. Say what you noticed without alarm. Listen more than you talk. And thank them for being honest."
      },
      {
       "k": "big",
       "h": "Try the words out loud.",
       "sub": "I saw some of your answers and I care.",
       "beats": [
        "Aspen offers words to begin.",
        "I saw some of your answers and I care about how you're doing.",
        {
         "t": "Say that line out loud once now, slowly, in your own voice.",
         "w": 8
        }
       ],
       "say": "Aspen offers words to begin. I saw some of your answers and I care about how you're doing. Say that line out loud once now, slowly, in your own voice."
      },
      {
       "k": "points",
       "h": "If an answer worries you",
       "items": [
        [
         "Stay with them",
         "Stay calm, and listen first"
        ],
        [
         "Call or text 988",
         "Any time, day or night"
        ],
        [
         "In danger right now?",
         "Call 911"
        ],
        [
         "Someone hurting them?",
         "Childhelp, 1-800-422-4453"
        ]
       ],
       "say": "Aspen points the way, and you are the follow-up. If a student talks about wanting to die or hurting themselves, stay with them, and call or text nine eight eight, any time. If they are in danger right now, call nine one one. If someone is hurting them, Childhelp can help you figure out who to call, at one eight hundred, four two two, four four five three. Teachers follow their school's reporting and crisis steps. And See the calm card shows you what the student sees, with people they can call or text on their own."
      },
      {
       "k": "points",
       "h": "More on each student’s page",
       "items": [
        [
         "Tending",
         "Days tended, and the parts they chose"
        ],
        [
         "This week in Aspen",
         "The theme and their question"
        ],
        [
         "Reflections they shared",
         "Only the ones they chose"
        ],
        [
         "Optional question",
         "Grades 7 and 8, off unless you turn it on"
        ]
       ],
       "say": "Each student's page shows more. Tending shows their tree, how many of the last seven days they tended it, and the parts they are tending, with guides for those parts. This week in Aspen shows the week's theme and their reflection question, so you can ask it too. Reflections they chose to share show up here. And in grades seven and eight, an optional question about being offered a vape or other substances stays off unless you turn it on. It never asks whether a student has used anything."
      },
      {
       "k": "points",
       "h": "Further down the tab",
       "items": [
        [
         "Why each part matters",
         "The research behind each part"
        ],
        [
         "Stories from Grounded",
         "Real stories from Chris"
        ],
        [
         "When Life Changes",
         "Guides for the hard talks"
        ]
       ],
       "say": "Further down the Grown-ups tab, Why each part matters shares the research behind each part, with links to read more. Stories from Grounded has real stories from Chris, the hospice chaplain behind Grow With Grounded. And When Life Changes opens guides for talking with a middle schooler about hard things."
      },
      {
       "k": "big",
       "h": "Listen more than you talk.",
       "say": "If you remember one thing, make it this. Listen more than you talk. Your steady presence is what helps most."
      },
      {
       "k": "quiz",
       "q": "Which answers are always shown to a grown-up?",
       "opts": [
        "Every answer, every time",
        "Safety answers, plus lonely, bullied, and giving up",
        "None of them"
       ],
       "right": 1,
       "why": "Those always show so a grown-up can help. The rest stay the student’s own.",
       "say": "Quick question. Which answers are always shown to a grown-up?"
      }
     ]
    },
    {
     "id": "as-u-private",
     "n": 6,
     "title": "Private, Saved, and Shared",
     "mins": 6,
     "blurb": "Where your tree is saved, what stays yours, and what your grown-up sees.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Using Aspen, Lesson 6",
       "h": "Private, Saved, and Shared",
       "sub": "Your tree is yours.",
       "say": "Your tree holds real answers about your life. This lesson shows where it is saved, what stays private, and exactly what your grown-up can see."
      },
      {
       "k": "card",
       "title": "Add a student",
       "body": "Saved on this device, locked with your own passcode.",
       "fields": [
        [
         "First name or nickname",
         "Sam"
        ],
        [
         "Grade",
         "7th"
        ]
       ],
       "btns": [
        "Add and start",
        "Just try it without saving"
       ],
       "tap": 0,
       "say": "When you add yourself in the Students tab, Aspen saves your tree in your own Middle school profile. It stays on this device, locked with a passcode only you know. There is no account, and your answers stay right here. A grown-up agrees when your profile is made."
      },
      {
       "k": "points",
       "h": "Just trying it out?",
       "items": [
        [
         "Just try it without saving",
         "Kept until the page closes"
        ],
        [
         "Save my tree",
         "Turns it into a locked profile"
        ],
        [
         "With a grown-up",
         "They agree when it is made"
        ]
       ],
       "say": "You can also tap Just try it without saving. Then your tree is only kept until the page closes. To keep it, tap Save my tree, and make your profile with a grown-up."
      },
      {
       "k": "points",
       "h": "Who can open your profile",
       "items": [
        [
         "You",
         "With your passcode"
        ],
        [
         "Grown-ups who agreed",
         "With their own passcode"
        ],
        [
         "Forgot your passcode?",
         "A grown-up can help you set a new one"
        ]
       ],
       "say": "Who can open your profile? You can, with your passcode. The grown-ups who agreed for you can open it too, with their own passcode, so you are never alone with something hard. That also means if you forget your passcode, a grown-up can open it and help you set a new one."
      },
      {
       "k": "points",
       "h": "What your grown-up sees",
       "items": [
        [
         "Always shown",
         "Being hurt, bullied, alone, or giving up",
         "#B8612F"
        ],
        [
         "The big picture",
         "Levels, your tree, days tended",
         "#8B5E1A"
        ],
        [
         "Just yours",
         "Other answers, notes, reflections",
         "#5F7D48"
        ]
       ],
       "say": "Here is exactly what your grown-up sees in Aspen. Always shown: if you answer that someone is hurting you, that you have thought about hurting yourself, that you are being bullied, that you feel lonely or left out, or that you feel like giving up. Your grown-up sees that answer so they can help. The big picture: how each part is doing, how your tree looks today, how many days you tended it, and which parts you are tending. And just yours: the rest of your answers, the practices you check off, your notes, and your weekly reflections."
      },
      {
       "k": "big",
       "h": "Some answers always show.",
       "sub": "So a safe grown-up can help.",
       "beats": [
        "Those few answers always show because you matter, and nobody should carry something heavy alone.",
        "Think of two safe grown-ups you could tell, like a parent, a grandparent, a teacher, or a school counselor.",
        {
         "t": "Say their names, out loud or in your head.",
         "w": 10
        }
       ],
       "say": "Those few answers always show because you matter, and nobody should carry something heavy alone. Think of two safe grown-ups you could tell, like a parent, a grandparent, a teacher, or a school counselor. Say their names, out loud or in your head."
      },
      {
       "k": "points",
       "h": "Sharing you choose",
       "items": [
        [
         "With a grown-up",
         "They see every answer of that check-in"
        ],
        [
         "Share this reflection",
         "A switch on each weekly reflection"
        ],
        [
         "Show my growth on The Grove",
         "On or off, in Settings"
        ]
       ],
       "say": "Some sharing is your choice. If you check in With a grown-up, your grown-up sees every answer from that check-in, since you did it together. On a weekly reflection, you can turn on Share this reflection with my grown-up. And in Settings, Show my growth on The Grove lets your tree stand beside your family's trees. It starts on, and you can turn it off anytime. Only the big picture shows there: days tended, rings, and which parts you tended. Never your answers, levels, or notes."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Profile and Settings",
       "rows": [
        [
         "Your Profile",
         ""
        ],
        [
         "Movement Level",
         ""
        ],
        [
         "The Grove",
         ""
        ],
        [
         "What your grown-up can see",
         ""
        ],
        [
         "Daily Reminder",
         ""
        ],
        [
         "Reading and Display",
         ""
        ]
       ],
       "tap": 3,
       "say": "To check any of this, tap your picture in your tree, where it says Settings. Under What your grown-up can see, Aspen spells it all out in plain words."
      },
      {
       "k": "points",
       "h": "Keep your tree safe",
       "items": [
        [
         "Back up everything",
         "In the round button at the top"
        ],
        [
         "One file, still locked",
         "Every profile on this device"
        ],
        [
         "Load a backup",
         "On a new device, or after a reset"
        ]
       ],
       "say": "Your tree lives in this browser. Clearing the browser or resetting the device erases it, so back it up now and then, with a grown-up. Tap the round profile button at the top of the page, then Back up everything. It saves one file with every profile on this device, each one still locked. On a new device, Load a backup brings it all back."
      },
      {
       "k": "points",
       "h": "Help is always close",
       "items": [
        [
         "Need help now?",
         "The button next to your name"
        ],
        [
         "Call or text 988",
         "Any time, day or night"
        ],
        [
         "Text HOME to 741741",
         "Crisis Text Line"
        ],
        [
         "In danger right now?",
         "Call 911"
        ]
       ],
       "say": "If you ever need help right away, tap Need help now, next to your name, to see the calm card. Call or text nine eight eight any time, or text HOME to seven four one seven four one. If you are in danger right now, call nine one one. And if a friend tells you they want to hurt themselves or die, always tell a grown-up, even if your friend asks you not to. You are not in trouble. You are being a good friend."
      },
      {
       "k": "big",
       "h": "Your tree is yours. The grove is ours.",
       "say": "Your tree is yours. The grove is ours. And the safe grown-ups in your life are there to help you grow."
      },
      {
       "k": "quiz",
       "q": "What stays just yours in Aspen?",
       "opts": [
        "Answers about being hurt or bullied",
        "Your notes and weekly reflections, unless you share",
        "Nothing at all"
       ],
       "right": 1,
       "why": "Your notes and reflections are yours. You can share a reflection anytime.",
       "say": "Quick question. What stays just yours in Aspen?"
      }
     ]
    }
   ]
  },
  {
   "id": "aspen-six",
   "title": "The Six Parts",
   "who": "One lesson for each part of your tree, with a practice",
   "certTitle": "Aspen: The Six Parts",
   "certLine": "For finishing every lesson on the six parts of your tree.",
   "lessons": [
    {
     "id": "as-6-roots",
     "n": 1,
     "title": "Roots: What Keeps You Steady",
     "mins": 5,
     "blurb": "What grounds you, and what keeps you steady when life gets loud.",
     "sources": [
      [
       "Lisa Miller, Teachers College, Columbia University",
       "https://www.tc.columbia.edu/faculty/lfm14/"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 1",
       "h": "Roots",
       "sub": "What keeps you steady.",
       "say": "This lesson is about Roots. In Aspen, Roots means what grounds you. It is what keeps you steady when life gets loud."
      },
      {
       "k": "big",
       "h": "Roots hold a tree steady when the wind blows.",
       "sub": "Aspens share their roots, so a whole grove stands together.",
       "say": "You cannot see a tree’s roots, and they hold it steady when the wind blows. Aspen trees are known for sharing roots underground, so a whole grove stands together. Your roots help you stand, too."
      },
      {
       "k": "points",
       "h": "Roots can look like",
       "items": [
        [
         "A calm place",
         "Inside you, or a spot you go"
        ],
        [
         "Wonder",
         "Stars, music, somewhere beautiful"
        ],
        [
         "God, prayer, worship",
         "If your family prays or worships"
        ],
        [
         "Quiet and traditions",
         "Nature, stillness, family ways"
        ]
       ],
       "say": "Roots can look like a calm place, inside you or a spot you like to go. Wonder, like the stars at night or a song you love. For many families, roots are God, prayer, and worship. For others, roots are quiet, time outside, or traditions passed down in your family. Aspen is made for all faith traditions and everything in-between."
      },
      {
       "k": "big",
       "h": "You matter, just for being you.",
       "sub": "One of the strongest roots there is.",
       "say": "Roots also means knowing you matter, just for being you. Not for your grades, your followers, or how good you are at something. Just for being you. That is one of the strongest roots a person can have. And noticing what you are thankful for, even small things, helps that root grow."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Check-in: Roots",
       "rows": [
        [
         "Do you feel like you matter, just for being you?",
         ""
        ],
        [
         "Yeah, most of the time",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "Not sure",
         ""
        ]
       ],
       "tap": 2,
       "say": "In a check-in, Roots asks about your experience. Where you feel calm. Whether you feel like you matter. Whether something holy feels close to you. Aspen asks about what you live and feel. And if you wonder why a question is there, tap Why this question? to find out."
      },
      {
       "k": "big",
       "h": "Faith should help you feel loved.",
       "sub": "If it ever feels heavy, talk with a grown-up you trust.",
       "say": "Roots asks one more kind of question. Sometimes thoughts about God or faith can leave a person feeling worried, scared, or not good enough. Faith should help you feel loved. If it ever feels heavy, that is worth talking about with a grown-up you trust. Big questions are a normal part of growing up."
      },
      {
       "k": "big",
       "h": "Feeling held by something bigger helps in hard times.",
       "sub": "Middle school is often when this part of you wakes up.",
       "say": "Here is something researchers have found. Feeling held by something bigger than yourself is one of the strongest supports young people have in hard times. And the middle school years are often when that part of you starts to wake up."
      },
      {
       "k": "points",
       "h": "How Roots can look",
       "items": [
        [
         "Strong",
         "You know what steadies you, and you reach for it",
         "#5F7D48"
        ],
        [
         "Steady",
         "It is there, though you reach for it less lately",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "You feel empty, unsure, or weighed down",
         "#B8612F"
        ]
       ],
       "say": "Strong roots might mean you know what steadies you, and you reach for it. Steady might mean it is there, though you reach for it less lately. And a Growing Edge might mean you feel empty inside, unsure, or weighed down. That is an honest place to be, and it is a part to tend, not a grade."
      },
      {
       "k": "points",
       "h": "Practice: Look Up and Breathe",
       "items": [
        [
         "Find the sky",
         "Step outside, or look out a window"
        ],
        [
         "Look up",
         "Let your eyes rest there"
        ],
        [
         "Breathe slowly",
         "In, then out even slower"
        ],
        [
         "Notice",
         "How do you feel now?"
        ]
       ],
       "cue": {
        "w": {
         "2": 6,
         "4": 15,
         "5": 5
        },
        "at": [
         1,
         2,
         3,
         5
        ]
       },
       "say": "Let us try one from Aspen’s Roots practices. Find the sky, outside or through a window. Look up, and let your eyes rest there. Now breathe in slowly, and breathe out even more slowly. Do that three times. Then notice how you feel."
      },
      {
       "k": "big",
       "h": "Tend your roots, and they will hold you.",
       "sub": "Find Roots practices in Growth Plan.",
       "say": "Tend your roots, and they will hold you. Practices like this one are in Growth Plan, under Roots, and each one has a Learn more button with the steps. You can also ask someone in your family what helps them feel peaceful. Their answer might help your roots grow, too."
      },
      {
       "k": "quiz",
       "q": "What does Aspen ask about in Roots?",
       "opts": [
        "Which religion you belong to",
        "What steadies you, and whether it helps or weighs on you",
        "How often you go to services"
       ],
       "right": 1,
       "why": "Roots asks about your experience, never what you believe.",
       "say": "Quick question. What does Aspen ask about in Roots?"
      }
     ]
    },
    {
     "id": "as-6-trunk",
     "n": 2,
     "title": "Trunk: Goals and Trying New Things",
     "mins": 4,
     "blurb": "What you care about, what you are good at, and why it matters.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 2",
       "h": "Trunk",
       "sub": "Goals and trying new things.",
       "say": "This lesson is about your Trunk. In Aspen, Trunk means purpose. What you care about, what you are good at, and why it matters."
      },
      {
       "k": "big",
       "h": "The trunk carries everything up to the branches.",
       "say": "A tree’s trunk carries water from the roots all the way up to the branches and leaves. Purpose works like that for you. It gives your days somewhere to go."
      },
      {
       "k": "points",
       "h": "Trunk can look like",
       "items": [
        [
         "Losing track of time",
         "Doing something you love"
        ],
        [
         "Getting better",
         "A skill you are proud of"
        ],
        [
         "Helping",
         "At home, at school, around you"
        ],
        [
         "Trying new things",
         "Before you are good at them"
        ]
       ],
       "say": "Trunk can look like doing something you love so much that you lose track of time. Getting better at a skill, and feeling proud of it. Helping people, at home, at school, or around your community. And trying new things, even before you are good at them."
      },
      {
       "k": "big",
       "h": "Every skill starts with a first try.",
       "sub": "You do not have to be good at it yet.",
       "say": "Trying things before you are good at them is how people find what they love. A new club, an instrument, a sport, a recipe. Your first try counts, even when it is wobbly. You do not have to be good at it yet."
      },
      {
       "k": "big",
       "h": "The real you is the one worth growing.",
       "sub": "The right people like the real you.",
       "say": "Trunk also asks if you feel like you have to act like someone you are not, just to fit in. Or if you do things mostly because other people expect you to. That can be tiring. The real you is the one worth growing, and the right people like the real you."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Check-in: Trunk",
       "rows": [
        [
         "Is there something you love doing so much that you lose track of time?",
         ""
        ],
        [
         "Yeah, most of the time",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "Not sure",
         ""
        ]
       ],
       "tap": 1,
       "say": "In a check-in, Trunk asks questions written for your grade. In sixth grade, one asks, is there something you love doing so much that you lose track of time? In eighth grade, one asks what you care about enough to stand up for."
      },
      {
       "k": "points",
       "h": "How Trunk can look",
       "items": [
        [
         "Strong",
         "You know what you care about, and you go for it",
         "#5F7D48"
        ],
        [
         "Steady",
         "Things you like, though some days feel flat",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "Bored a lot, or going through the motions",
         "#B8612F"
        ]
       ],
       "say": "A strong trunk might mean you know what you care about, and you go for it. Steady might mean you have things you like, though some days feel flat. And a Growing Edge might mean you feel bored a lot, or like you are going through the motions. If you have stopped enjoying things you used to love, tell a grown-up you trust. That is worth some support."
      },
      {
       "k": "points",
       "h": "Practice: Things I’m Good At",
       "items": [
        [
         "Think",
         "Big or small things count"
        ],
        [
         "Name three",
         "Out loud, or on your fingers"
        ],
        [
         "Stuck?",
         "What do friends come to you for?"
        ],
        [
         "Later",
         "Ask someone to add one"
        ]
       ],
       "cue": {
        "w": {
         "3": 15,
         "4": 5
        },
        "at": [
         1,
         3,
         4,
         5
        ]
       },
       "say": "Let us try one from Aspen’s Trunk practices. Think of things you are good at. They can be big or small, like being kind, being funny, or being good at drawing. Now name three of them, out loud or on your fingers. If you get stuck, think about what your friends come to you for. Later, ask someone who knows you to add one more."
      },
      {
       "k": "big",
       "h": "Purpose grows when you use it.",
       "sub": "Find Trunk practices in Growth Plan.",
       "say": "Purpose grows when you use it. In Growth Plan, under Trunk, you will find practices like this one, and ideas like teaching someone a skill, or helping at home without being asked. You can write your own, too."
      },
      {
       "k": "quiz",
       "q": "What helps your Trunk grow?",
       "opts": [
        "Only doing what you are already great at",
        "Trying things, even before you are good at them",
        "Acting like whoever fits in best"
       ],
       "right": 1,
       "why": "Trying new things is how people find what they love.",
       "say": "Quick question. What helps your Trunk grow?"
      }
     ]
    },
    {
     "id": "as-6-bark",
     "n": 3,
     "title": "Bark: Naming Feelings, Asking for Help",
     "mins": 5,
     "blurb": "How you talk to yourself and handle big feelings.",
     "sources": [
      "lieberman"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 3",
       "h": "Bark",
       "sub": "Naming feelings, asking for help.",
       "say": "This lesson is about Bark, your mind and feelings. How you talk to yourself, and how you handle big feelings."
      },
      {
       "k": "big",
       "h": "Bark protects the tree, and stretches as it grows.",
       "sub": "Healthy bark bends without breaking.",
       "say": "Bark protects a tree from storms and sun. And it has to stretch as the tree grows. Your mind and feelings work the same way. Healthy bark bends without breaking."
      },
      {
       "k": "points",
       "h": "Healthy bark can look like",
       "items": [
        [
         "Calming down",
         "Knowing what helps you"
        ],
        [
         "Naming feelings",
         "Sad, mad, nervous, embarrassed"
        ],
        [
         "Kind self-talk",
         "Even after a mistake"
        ],
        [
         "Asking for help",
         "Before it gets too heavy"
        ]
       ],
       "say": "Healthy bark can look like knowing what helps you calm down. Naming what you feel, like sad, mad, nervous, or embarrassed. Talking to yourself kindly, even after a mistake. And asking for help before things get too heavy."
      },
      {
       "k": "big",
       "h": "Naming a feeling helps your brain calm it down.",
       "sub": "Even one word helps.",
       "say": "Here is something researchers have found. Putting a feeling into words helps your brain calm it down. Just saying, I feel nervous, can turn the volume down a little."
      },
      {
       "k": "big",
       "h": "Would you say that to a friend?",
       "sub": "Kind self-talk helps you bounce back.",
       "say": "Bark is also about how you talk to yourself. When you mess up, what do you say inside? Would you say that to a friend? Being kind to yourself after a mistake helps you learn from it and bounce back faster."
      },
      {
       "k": "big",
       "h": "Asking for help is a strength.",
       "sub": "Talking keeps a worry from growing.",
       "say": "And Bark is about asking for help. Asking for help is a strength, and it gets problems solved faster. Talking about what bothers you keeps it from growing bigger inside."
      },
      {
       "k": "screen",
       "app": "aspen",
       "app_name": "Aspen",
       "title": "Check-in: Bark",
       "rows": [
        [
         "Can you name what you’re feeling, like sad, mad, nervous, or embarrassed?",
         ""
        ],
        [
         "Yeah, most of the time",
         ""
        ],
        [
         "Sometimes",
         ""
        ],
        [
         "Not really",
         ""
        ],
        [
         "Not sure",
         ""
        ]
       ],
       "tap": 1,
       "say": "In a check-in, Bark asks questions like, can you name what you are feeling? And, do worries take up a lot of your day? In seventh grade, one asks if you compare yourself to people online and feel worse. Answer with what is true lately. Not sure is always an honest answer."
      },
      {
       "k": "points",
       "h": "How Bark can look",
       "items": [
        [
         "Strong",
         "You feel your feelings and find your way back",
         "#5F7D48"
        ],
        [
         "Steady",
         "Mostly steady, with some heavy days",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "Worry, stress, or big feelings wear you down",
         "#B8612F"
        ]
       ],
       "say": "Strong bark might mean you feel your feelings, and find your way back. Steady might mean mostly steady, with some heavy days. And a Growing Edge might mean worry, stress, or big feelings are wearing you down. That is a part to tend, and a good time to let someone help."
      },
      {
       "k": "points",
       "h": "Practice: Name It in One Word",
       "items": [
        [
         "Get still",
         "Feet pressed into the floor"
        ],
        [
         "Check inside",
         "What feeling is here?"
        ],
        [
         "One word",
         "Calm, tired, glad, nervous, sad"
        ],
        [
         "Say it softly",
         "Out loud, or inside"
        ]
       ],
       "cue": {
        "w": {
         "1": 4,
         "3": 6,
         "4": 6,
         "5": 5
        },
        "at": [
         1,
         2,
         4,
         5
        ]
       },
       "say": "Let us try one from Aspen’s Bark practices. Get still, and press your feet into the floor. Now check inside. What feeling is here right now? Find one word for it, like calm, tired, glad, nervous, or sad. Say your word softly, out loud or inside. You just named it, and that helps."
      },
      {
       "k": "big",
       "h": "Heavy for a while? Tell a safe grown-up.",
       "sub": "Need to talk now? Call or text 988. In danger? Call 911.",
       "say": "If worry or sadness stays heavy for a couple of weeks, tell a grown-up you trust. A parent, a grandparent, a teacher, or your school counselor. If a friend ever says they want to hurt themselves or die, always tell a grown-up, even if your friend asked you not to. You are not in trouble for telling. And if you need to talk right now, call or text nine eight eight. If someone is in danger, call nine one one."
      },
      {
       "k": "quiz",
       "q": "What can help a big feeling calm down?",
       "opts": [
        "Pretending it is not there",
        "Putting it into words",
        "Keeping it to yourself"
       ],
       "right": 1,
       "why": "Naming a feeling helps your brain calm it down.",
       "say": "Quick question. What can help a big feeling calm down?"
      }
     ]
    },
    {
     "id": "as-6-branches",
     "n": 4,
     "title": "Branches: Friends, Family, Belonging",
     "mins": 5,
     "blurb": "Friends, family, and grown-ups you can count on.",
     "sources": [
      [
       "Search Institute, developmental relationships",
       "https://searchinstitute.org/developmental-relationships"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 4",
       "h": "Branches",
       "sub": "Friends, family, belonging.",
       "say": "This lesson is about Branches. Your friends, your family, and the places where you belong."
      },
      {
       "k": "big",
       "h": "Branches reach out. That is how a tree catches light.",
       "say": "Branches reach out from the trunk. That is how a tree catches light. People are the same. You were made to reach toward others, and to let others reach toward you."
      },
      {
       "k": "points",
       "h": "Branches can look like",
       "items": [
        [
         "One friend you can be yourself around",
         "Even one makes a big difference"
        ],
        [
         "A grown-up you trust",
         "Someone to go to when things get hard"
        ],
        [
         "Feeling close to family",
         "Even when you disagree"
        ],
        [
         "A place you belong",
         "A team, a club, a group"
        ]
       ],
       "say": "Branches can look like one friend you can be yourself around. Even one friend like that makes a big difference. A grown-up you trust, someone to go to when things get hard. Feeling close to someone in your family, even when you disagree. And a place where you belong, like a team, a club, or a group."
      },
      {
       "k": "big",
       "h": "Grown-ups in your corner help you grow strong.",
       "sub": "They care, cheer you on, and give you a say.",
       "say": "People who study kids your age have found something hopeful. When the grown-ups in your life show they care, cheer you on, back you up, and give you a real say, you grow stronger. Middle school is when having a real say starts to matter most."
      },
      {
       "k": "points",
       "h": "What Aspen asks about Branches",
       "items": [
        [
         "Friends who treat you well",
         "Even when you disagree"
        ],
        [
         "A grown-up you trust",
         "Someone you could tell almost anything"
        ],
        [
         "Feeling left out",
         "Lonely, even around other kids"
        ],
        [
         "Bullying",
         "In person, in group chats, or online"
        ]
       ],
       "say": "In a check-in, Aspen asks six Branches questions, written for your grade. Do you have friends who treat you well? Is there a grown-up you trust? A few are turned around on purpose, like whether you feel lonely or left out, or whether anyone is bullying you, in person, in group chats, or online. For those, Not really is the strong answer."
      },
      {
       "k": "points",
       "h": "How Branches can look",
       "items": [
        [
         "Strong",
         "You have people, and you reach for them",
         "#5F7D48"
        ],
        [
         "Steady",
         "Good people, with some lonely days",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "You feel left out, or someone is unkind",
         "#B8612F"
        ]
       ],
       "say": "Strong branches might mean you have people, and you reach for them. Steady might mean you have good people, with some lonely days. And a Growing Edge might mean you feel left out a lot, or someone is being unkind to you. A Growing Edge is a part to tend, not a grade."
      },
      {
       "k": "big",
       "h": "Lonely or bullied? Your grown-up gets to help.",
       "sub": "Bullying is never your fault.",
       "say": "Here is something good to know before you check in. If you say you feel lonely, or someone is bullying you, your grown-up sees that answer, so they can help. Bullying is never your fault, and you deserve help with it. Tell a safe grown-up, like a parent, a grandparent, a teacher, or a school counselor."
      },
      {
       "k": "words",
       "h": "If a friend is in trouble",
       "items": [
        "Tell a grown-up, even if they asked you not to.",
        "That is being a good friend.",
        "You are not in trouble for telling."
       ],
       "say": "One more thing about friends. If a friend ever says they want to hurt themselves, or die, always tell a grown-up, even if your friend asked you not to. That is being a good friend. And you are not in trouble for telling."
      },
      {
       "k": "points",
       "h": "Practice: My People List",
       "items": [
        [
         "A friend",
         "Someone you can be yourself around"
        ],
        [
         "A grown-up at home",
         "A parent, grandparent, or family member"
        ],
        [
         "A grown-up at school",
         "A teacher, coach, or school counselor"
        ]
       ],
       "cue": {
        "w": {
         "2": 8,
         "3": 8,
         "4": 8
        },
        "at": [
         2,
         3,
         4
        ]
       },
       "say": "Let us practice. This one is your people list. Think of one friend you can be yourself around, and say their name in your head. Now think of a grown-up at home you could go to, like a parent or a grandparent. Last, think of a grown-up at school, like a teacher, a coach, or a school counselor. Those are your people. Coaches, neighbors, and pets count too."
      },
      {
       "k": "big",
       "h": "Reach out a little, and your branches grow.",
       "sub": "Pick Branches practices in your Growth Plan.",
       "say": "Branches grow a little at a time. A hi to someone who seems alone. A kind message to a friend. Ten minutes with family, phones put away. Pick a few Branches practices in your Growth Plan, and check one off in Today. Every practice has a Learn more button with the steps."
      },
      {
       "k": "quiz",
       "q": "A friend says they want to hurt themselves. What do you do?",
       "opts": [
        "Keep it a secret",
        "Tell a grown-up, even if asked not to",
        "Wait and see if it passes"
       ],
       "right": 1,
       "why": "Telling a grown-up is being a good friend, and you are not in trouble for telling.",
       "say": "Quick question. A friend says they want to hurt themselves, and asks you not to tell. What do you do?"
      }
     ]
    },
    {
     "id": "as-6-leaves",
     "n": 5,
     "title": "Leaves: Sleep, Movement, Real Meals",
     "mins": 5,
     "blurb": "Sleep, movement, screens, and feeling at home in your body.",
     "sources": [
      [
       "HealthyChildren.org (American Academy of Pediatrics), healthy sleep habits",
       "https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 5",
       "h": "Leaves",
       "sub": "Sleep, movement, real meals.",
       "say": "This lesson is about Leaves, your body. Sleep, movement, real meals, and feeling at home in your body."
      },
      {
       "k": "big",
       "h": "Leaves turn sunlight into energy for the whole tree.",
       "say": "Leaves catch sunlight and turn it into energy for the whole tree. Your body does that for all of you. When your body gets what it needs, your mood, your focus, and your friendships all have more to work with."
      },
      {
       "k": "flow",
       "h": "Three ways to tend Leaves",
       "steps": [
        [
         "Rest",
         "Sleep, and phones out at night"
        ],
        [
         "Move",
         "In ways you enjoy"
        ],
        [
         "Nourish",
         "Real meals that keep you going"
        ]
       ],
       "say": "Aspen tends Leaves in three ways. Rest, with real sleep. Move, in ways you enjoy, like sports, biking, or dancing. And nourish, with regular meals that keep your energy up all day."
      },
      {
       "k": "big",
       "h": "Most kids your age need 9 to 12 hours of sleep.",
       "sub": "Teens need 8 to 10. Phones sleep outside.",
       "say": "Sleep experts say most kids your age need nine to twelve hours of sleep a night, and teens need eight to ten. That is a lot! Sleep helps your mood, your focus, and how you feel about yourself. One of the biggest helps is simple. Charge your phone outside your bedroom at night."
      },
      {
       "k": "points",
       "h": "What Aspen asks about Leaves",
       "items": [
        [
         "Sleep",
         "Enough to feel rested?"
        ],
        [
         "Moving and getting outside",
         "Most days?"
        ],
        [
         "Your body",
         "Feeling okay in it?"
        ],
        [
         "Screens",
         "Late nights and long scrolls"
        ]
       ],
       "say": "In a check-in, Aspen asks six Leaves questions, written for your grade. Do you get enough sleep to feel rested? Do you move in ways you enjoy, or get outside most days? Some are turned around, like whether you feel bad about how your body looks, or stay up late on screens. And one asks whether you would know what to say if someone offered you a vape. Knowing your line ahead of time makes it much easier to say no."
      },
      {
       "k": "points",
       "h": "How Leaves can look",
       "items": [
        [
         "Strong",
         "You rest, move, and eat in ways that fuel you",
         "#5F7D48"
        ],
        [
         "Steady",
         "Mostly okay, with a weak spot or two",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "Tired a lot, or uneasy in your body",
         "#B8612F"
        ]
       ],
       "say": "Strong leaves might mean you rest, move, and eat in ways that fuel you. Steady might mean mostly okay, with a weak spot or two, like late nights. And a Growing Edge might mean you feel tired a lot, or uneasy in your body. That is a part to tend, not a grade."
      },
      {
       "k": "big",
       "h": "Your body is your home, and it is growing.",
       "sub": "Think strength and energy.",
       "say": "Lots of kids your age worry about how they look. Bodies change fast in middle school, and that is normal. Try thinking about what your body lets you do. Run, laugh, hug, and carry your backpack all day. If worries about food or how you look keep coming back, tell a grown-up you trust. Talking about it helps."
      },
      {
       "k": "points",
       "h": "Practice: Shoulders, Jaw, Hands",
       "items": [
        [
         "Shoulders",
         "Lift them up, then let them drop"
        ],
        [
         "Jaw",
         "Let your teeth come apart"
        ],
        [
         "Hands",
         "Squeeze tight, then let go"
        ]
       ],
       "cue": {
        "w": {
         "3": 5,
         "5": 6,
         "7": 4,
         "8": 8
        },
        "at": [
         2,
         4,
         6
        ]
       },
       "say": "Let us practice, right where you are. You can sit or lie down. Breathe in slowly, and lift your shoulders up toward your ears. Now breathe out, and let them drop. Next, your jaw. Let your teeth come apart, and let your face go soft. Last, your hands. Squeeze them into tight fists, and hold. Now let go, and notice how your body feels."
      },
      {
       "k": "big",
       "h": "Tend Leaves a little each day.",
       "sub": "Find Leaves practices in your Growth Plan.",
       "say": "That one helps at bedtime too. You will find practices like it in your Growth Plan, under Leaves, along with ones like a dance break or a calm bedtime plan. Hard day? Tap Easier today for a smaller version that still counts."
      },
      {
       "k": "quiz",
       "q": "Aspen tends Leaves in three ways. What are they?",
       "opts": [
        "Rest, Move, Nourish",
        "Win, Train, Compete",
        "Wake, Study, Scroll"
       ],
       "right": 0,
       "why": "Rest, Move, and Nourish keep your leaves green.",
       "say": "Quick question. Aspen tends Leaves in three ways. What are they?"
      }
     ]
    },
    {
     "id": "as-6-fruit",
     "n": 6,
     "title": "Fruit: Hope for What's Ahead",
     "mins": 5,
     "blurb": "Looking forward, being thankful, and believing things can get better.",
     "sources": [
      "snyder",
      "froh"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "The Six Parts, Lesson 6",
       "h": "Fruit",
       "sub": "Hope for what's ahead.",
       "say": "This last lesson in The Six Parts is about Fruit, your hope for what is ahead."
      },
      {
       "k": "big",
       "h": "Fruit takes time. It grows from the whole tree.",
       "say": "Fruit takes time. It grows from everything else. Roots, Trunk, Bark, Branches, and Leaves all feed it. Hope works the same way. When you tend the whole tree, hope has something to grow from."
      },
      {
       "k": "points",
       "h": "Hope can look like",
       "items": [
        [
         "Something to look forward to",
         "This week, big or small"
        ],
        [
         "Noticing good things",
         "Even small ones"
        ],
        [
         "Believing things can get better",
         "Even when they are hard"
        ],
        [
         "Being kind",
         "It grows hope in you too"
        ]
       ],
       "say": "Hope can look like something to look forward to this week, big or small. Noticing good things, even small ones. Believing things can get better, even when they are hard. And being kind to others, which is one of the surest ways to feel hopeful yourself."
      },
      {
       "k": "big",
       "h": "Hope can be grown, like anything you tend.",
       "sub": "A goal, a way forward, and the will to keep going.",
       "say": "People who study hope describe it as three things together. A goal, a way to get there, and the will to keep going. And here is the good news. Hope can be grown. Noticing good things each day is one simple way kids your age grow it."
      },
      {
       "k": "points",
       "h": "What Aspen asks about Fruit",
       "items": [
        [
         "Looking forward",
         "Something coming up?"
        ],
        [
         "Things getting better",
         "Even when life is hard?"
        ],
        [
         "Kindness",
         "Doing kind things for others?"
        ],
        [
         "Giving up",
         "Ever feel there is no point?"
        ]
       ],
       "say": "In a check-in, Aspen asks six Fruit questions, written for your grade. Do you have something to look forward to? Do you believe things can get better, even when they are hard? Do you do kind things for other people? A few are turned around on purpose, like whether one bad moment ruins your whole day, or whether you ever feel like giving up."
      },
      {
       "k": "points",
       "h": "How Fruit can look",
       "items": [
        [
         "Strong",
         "You look ahead with hope, even on hard days",
         "#5F7D48"
        ],
        [
         "Steady",
         "Hope is there, though some days it fades",
         "#8B5E1A"
        ],
        [
         "Growing Edge",
         "It is hard to see anything good ahead",
         "#B8612F"
        ]
       ],
       "say": "Strong fruit might mean you look ahead with hope, even on hard days. Steady might mean hope is there, though some days it fades. And a Growing Edge might mean it is hard to see anything good ahead right now. That is a real and honest place to be, and it is worth telling someone."
      },
      {
       "k": "big",
       "h": "A bad moment is just a moment.",
       "sub": "Name what went wrong, and what still went okay.",
       "say": "Picture a day where a quiz goes badly in second period. By lunch, it can feel like the whole day is ruined. Try this. Name what went wrong. Then name what still went okay. A friend saved you a seat. Practice went well. A bad moment is just a moment, and hope lasts longer when you see it that way."
      },
      {
       "k": "points",
       "h": "Practice: Three Good Things",
       "items": [
        [
         "Good thing one",
         "Say it out loud"
        ],
        [
         "Good thing two",
         "Small ones count"
        ],
        [
         "Good thing three",
         "Then ask why it happened"
        ]
       ],
       "cue": {
        "w": {
         "3": 6,
         "4": 6,
         "5": 6,
         "6": 8
        },
        "at": [
         3,
         4,
         5
        ]
       },
       "say": "Let us practice. This one is called Three Good Things. Think back over today, or yesterday. Say one good thing out loud, even a small one. Now say a second one. And a third. Last, pick one, and ask yourself, why did that happen?"
      },
      {
       "k": "words",
       "h": "Feeling like giving up?",
       "items": [
        "Tell a safe grown-up today.",
        "Call or text 988.",
        "Text HOME to 741741.",
        "In danger right now? Call 911."
       ],
       "say": "If you ever feel like giving up, or it is hard to see anything good ahead, you deserve help with that. Tell a safe grown-up today, like a parent, a grandparent, a teacher, or a school counselor. If you answer that way in a check-in, Aspen shows a calm card with people to call or text, and your grown-up sees that answer so they can help. You can call or text nine eight eight, any time, or text HOME to seven four one seven four one. If you are in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Tend the whole tree, and fruit will come.",
       "sub": "Find Fruit practices in your Growth Plan.",
       "say": "Tend the whole tree, a little at a time, and fruit will come. You will find practices like Three Good Things in your Growth Plan, under Fruit. That is all six parts. Well done."
      },
      {
       "k": "quiz",
       "q": "Where does hope often start?",
       "opts": [
        "With a big change",
        "With noticing small good things",
        "With never having problems"
       ],
       "right": 1,
       "why": "Noticing good things, even small ones, trains your brain to see more of them.",
       "say": "Last question. Where does hope often start?"
      }
     ]
    }
   ]
  },
  {
   "id": "aspen-grownups",
   "title": "For Grown-ups",
   "who": "For parents, grandparents, and the grown-ups walking with a middle schooler",
   "certTitle": "Aspen: For Grown-ups",
   "certLine": "For finishing every lesson for the grown-ups walking with a middle schooler.",
   "lessons": [
    {
     "id": "as-p-talk",
     "n": 1,
     "title": "Talking So They'll Talk",
     "mins": 6,
     "blurb": "Be fully there, listen first, and keep the door open.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 1",
       "h": "Talking So They'll Talk",
       "sub": "Be fully there. Listen first.",
       "say": "Middle schoolers still want to talk with the grown-ups who love them. This lesson is about making room for that, so they bring the real things to you."
      },
      {
       "k": "big",
       "h": "They open up when they can tell you are really there.",
       "sub": "Presence opens the door. Words come after.",
       "say": "Kids this age read us closely. Before they open up, they want to know we are really there, and not half somewhere else. Presence opens the door. Our words come after."
      },
      {
       "k": "story",
       "title": "Boundaries and Presence",
       "lines": [
        "After work, I rushed straight to my son's middle school band concert. I slipped into the gym just as it began and silenced both my phones.",
        "My son spotted us and flashed a big smile. As the band launched into the Star Wars theme, I realized I was still half at work.",
        "So I unclipped my badge, tucked it into my pocket, took a few deep breaths, and made a conscious decision to arrive fully. For the rest of the concert, I was laughing, clapping, and soaking in my son's excitement."
       ],
       "lesson": "Arriving fully is a choice we can make in the moment.",
       "note": "Names and details changed",
       "say": "One day after work, I rushed straight to my son's middle school band concert. I slipped into the gym just as the performance began, found my wife in the bleachers, and silenced my personal phone and my work phone. My son spotted us and flashed a big smile. As the band launched into the Star Wars theme, I realized I was still half at work. So I unclipped my badge, tucked it into my pocket, took a few deep breaths, and made a conscious decision to arrive fully in that moment. It worked. For the rest of the concert, I was truly present, laughing, clapping, and soaking in my son's excitement.",
       "hold": 2
      },
      {
       "k": "points",
       "h": "Try it: arrive fully",
       "items": [
        [
         "Name your badge",
         "What keeps you half somewhere else"
        ],
        [
         "Put it away",
         "Pocket it, or picture setting it down"
        ],
        [
         "One slow breath",
         "With a long breath out"
        ],
        [
         "Say it to yourself",
         "I am here."
        ]
       ],
       "beats": [
        "Let us try that now.",
        "Think of your own badge, the thing that keeps you half somewhere else.",
        "Maybe your phone, your work, or a worry you carry home.",
        "Put it away, or picture yourself setting it down.",
        "Take one slow breath, with a long breath out.",
        {
         "t": "Then say quietly to yourself, I am here.",
         "w": 10
        }
       ],
       "say": "Let us try that now. Think of your own badge, the thing that keeps you half somewhere else. Maybe your phone, your work, or a worry you carry home. Put it away, or picture yourself setting it down. Take one slow breath, with a long breath out. Then say quietly to yourself, I am here."
      },
      {
       "k": "points",
       "h": "Side by side is easier",
       "items": [
        [
         "In the car",
         "Eyes on the road, not on them"
        ],
        [
         "On a walk",
         "Moving loosens the words"
        ],
        [
         "Making a snack",
         "Hands busy, ears open"
        ]
       ],
       "say": "For many middle schoolers, face to face talks feel like a spotlight. Side by side is easier. Aspen's practice cards suggest it again and again. Try asking in the car, or on a walk. Cook a meal or make a snack together. With hands busy and eyes elsewhere, the words often come."
      },
      {
       "k": "points",
       "h": "Listen first, advise later",
       "items": [
        [
         "Listen more than you talk",
         "Let a little quiet sit"
        ],
        [
         "Ask before advising",
         "Ideas, or just an ear?"
        ],
        [
         "Ask again, gently",
         "When the answer is fine"
        ]
       ],
       "say": "Then listen first, and advise later. Listen more than you talk, and let a little quiet sit. Ask before you give advice. Do you want ideas, or do you just want me to listen? And when the answer is fine, ask a second time, gently."
      },
      {
       "k": "words",
       "h": "Words that keep them talking",
       "items": [
        "\"That sounds like it really hurt.\"",
        "\"I'm really glad you told me.\"",
        "\"What do you want to happen next?\""
       ],
       "say": "A few words help keep them talking. That sounds like it really hurt. I'm really glad you told me. And, what do you want to happen next?"
      },
      {
       "k": "card",
       "title": "Check-in",
       "body": "Do it on your own or with a grown-up.",
       "btns": [
        "On my own",
        "With a grown-up"
       ],
       "tap": 1,
       "result": "A gold note after each answer, with a question to talk about",
       "say": "Aspen can help start the talk. Before a check-in, a student chooses On my own, or With a grown-up. In grown-up mode, a gold note after each answer gives you a question to take the conversation deeper. Every practice has a Learn more card with a way to try it with a grown-up. And students can share a weekly reflection with you anytime."
      },
      {
       "k": "points",
       "h": "Trust grows with a little privacy",
       "items": [
        [
         "Always shown to you",
         "Safety answers, so you can help"
        ],
        [
         "The big picture",
         "How each part of the tree is doing"
        ],
        [
         "Just theirs",
         "Most answers, notes, and reflections"
        ]
       ],
       "say": "Trust also grows when kids have a little privacy. Aspen tells students plainly, before they start, what you can see. Safety answers are always shown to you. You see the big picture of their tree. The rest of their answers, their notes, and their reflections are theirs, unless they choose to share. Kids answer more honestly when they know up front."
      },
      {
       "k": "points",
       "h": "Keep the door open",
       "items": [
        [
         "Stay calm when it is hard",
         "Calm tells them it is safe"
        ],
        [
         "Thank them for telling",
         "Every time"
        ],
        [
         "Share something real",
         "A story of your own"
        ],
        [
         "Help is close",
         "Call or text 988. In danger, 911."
        ]
       ],
       "say": "When they bring you something hard, how you respond decides whether they come back. Stay calm. Thank them for telling you. Share something real of your own. And if anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text nine eight eight, or call nine one one in an emergency."
      },
      {
       "k": "big",
       "h": "Be fully there. Then listen.",
       "sub": "The talking grows from there.",
       "say": "Be fully there. Then listen. The talking grows from there, one car ride at a time."
      },
      {
       "k": "quiz",
       "q": "When are many middle schoolers most ready to talk?",
       "opts": [
        "Face to face, right after school",
        "Side by side, like in the car or on a walk",
        "In a family meeting"
       ],
       "right": 1,
       "why": "Side by side feels easier than a spotlight, so the words often come.",
       "say": "Quick question. When are many middle schoolers most ready to talk?"
      }
     ]
    },
    {
     "id": "as-p-phones",
     "n": 2,
     "title": "Phones, Friends, and Group Chats",
     "mins": 5,
     "blurb": "Skills, an agreement you make together, and a door that stays open.",
     "sources": [
      [
       "HealthyChildren.org: How to make a family media plan",
       "https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 2",
       "h": "Phones, Friends, and Group Chats",
       "sub": "Skills, an agreement, and an open door.",
       "say": "For most middle schoolers, friendships now live in two places, the hallway and the phone. This lesson is about helping them handle both, with real skills, an agreement you make together, and a door that stays open."
      },
      {
       "k": "big",
       "h": "Friend groups shift a lot in middle school.",
       "sub": "Losing a friend can feel as big as any loss.",
       "say": "Friend groups shift a lot between sixth and eighth grade. Losing a friend can feel as big as any loss. Coaching works better than rescuing. Help them think it through, and then let them try."
      },
      {
       "k": "points",
       "h": "When a friendship hurts",
       "items": [
        [
         "Listen first",
         "Ask what happened"
        ],
        [
         "Ask what they want",
         "What do you want to happen?"
        ],
        [
         "Practice a calm message",
         "Say it out loud together"
        ],
        [
         "Friends in more than one place",
         "School, a team, the neighborhood"
        ]
       ],
       "say": "When a friendship hurts, listen first, and ask what happened before giving advice. Ask, what do you want to happen? Help them practice a calm message they could send or say. And encourage friends in more than one place, like school, a team, or the neighborhood, so one breakup never takes everything."
      },
      {
       "k": "points",
       "h": "Make a phone agreement together",
       "items": [
        [
         "Screen-free times",
         "Dinner, homework, and bedtime"
        ],
        [
         "Phones charge outside bedrooms",
         "Yours too"
        ],
        [
         "Fewer pulls",
         "Autoplay and notifications off"
        ],
        [
         "Rules for you too",
         "Made together, kept together"
        ]
       ],
       "say": "Next, write a phone agreement together. Choose screen-free times, like dinner, homework, and bedtime. Charge phones outside the bedroom at night, yours included. Turn off autoplay and notifications. A plan made together works better than rules handed down. So invite them in, and include a few rules for yourself."
      },
      {
       "k": "points",
       "h": "Group chat skills",
       "items": [
        [
         "Mute or leave",
         "Any chat that feels bad"
        ],
        [
         "Screenshot and report",
         "When something crosses a line"
        ],
        [
         "Let cruel stuff stop with you",
         "Keep it from spreading"
        ],
        [
         "Come to a grown-up",
         "When something feels wrong"
        ]
       ],
       "say": "Group chats can be fun, and they can be brutal. Teach the practical skills. How to mute a chat, and how to leave one. How to screenshot and report. How to let cruel stuff stop with them, instead of passing it on. And to come to you when something feels wrong. Conversations like these do what a monitoring app alone cannot."
      },
      {
       "k": "big",
       "h": "Telling you never costs them their phone.",
       "sub": "Say it before anything happens.",
       "say": "Here is the promise that matters most. Telling you about something scary never costs them their phone. Middle schoolers often keep quiet about bullying because they fear losing their phone. So say the promise plainly, and say it before anything happens."
      },
      {
       "k": "words",
       "h": "Say it out loud",
       "items": [
        "\"If you see something scary, tell me.\"",
        "\"You won't lose your phone.\"",
        "\"You can always leave a chat that makes you feel bad.\""
       ],
       "beats": [
        "Let us practice it now.",
        "Out loud, in your own voice, try these words.",
        "If you see something scary, tell me.",
        "You won't lose your phone.",
        "You can always leave a chat that makes you feel bad.",
        {
         "t": "Now say them once more, the way you would at your own kitchen table.",
         "w": 10
        }
       ],
       "say": "Let us practice it now. Out loud, in your own voice, try these words. If you see something scary, tell me. You won't lose your phone. You can always leave a chat that makes you feel bad. Now say them once more, the way you would at your own kitchen table."
      },
      {
       "k": "points",
       "h": "Where Aspen helps",
       "items": [
        [
         "When Life Changes",
         "First phone and group chats"
        ],
        [
         "More guides",
         "Friendship breakups, being left out, bullying"
        ],
        [
         "Leaves practices",
         "Charge your phone outside your bedroom"
        ]
       ],
       "say": "Aspen has help ready. In When Life Changes, the guide called First phone and group chats has a quick card, words to use, and trusted links. Nearby are guides for friendship breakups and drama, being left out, and bullying, in person and online. And your student will find Leaves practices like charging the phone outside the bedroom, or asking a grown-up to help set up a screen-free time each day."
      },
      {
       "k": "points",
       "h": "What you will see",
       "items": [
        [
         "Always shown to you",
         "Answers about bullying or feeling left out"
        ],
        [
         "Worth a check-in",
         "A marker on that ring"
        ],
        [
         "Help is close",
         "Call or text 988. In danger, 911."
        ]
       ],
       "say": "Aspen also keeps you in the loop on what matters most. If your student answers that they are being bullied, or feel lonely or left out, you always see that answer, with a Worth a check-in marker and what to do next. If anyone ever threatens them with a picture, they are not in trouble, and the guide on online pressure and pictures walks you through the steps. And if anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text nine eight eight, or call nine one one in an emergency."
      },
      {
       "k": "big",
       "h": "Skills, an agreement, and an open door.",
       "say": "Skills, an agreement you make together, and a door that stays open. That is how kids learn to carry a phone well."
      },
      {
       "k": "quiz",
       "q": "Your student tells you about a cruel group chat. What helps most?",
       "opts": [
        "Take the phone away for a while",
        "Thank them, and keep your promise about the phone",
        "Tell them to just ignore it"
       ],
       "right": 1,
       "why": "Telling you never costs them their phone, so they keep telling you.",
       "say": "Quick question. Your student tells you about a cruel group chat. What helps most?"
      }
     ]
    },
    {
     "id": "as-p-faith",
     "n": 3,
     "title": "Big Questions and Faith",
     "mins": 6,
     "blurb": "Meeting big questions with wonder, in whatever way fits your family.",
     "sources": [
      [
       "Lisa Miller, Teachers College, Columbia University",
       "https://www.tc.columbia.edu/faculty/lfm14/"
      ],
      [
       "Miller: Spiritual awakening in adolescents (PubMed)",
       "https://pubmed.ncbi.nlm.nih.gov/24354605/"
      ],
      [
       "Fuller Youth Institute: Why doubt",
       "https://fulleryouthinstitute.org/blog/why-doubt"
      ],
      [
       "BMC Psychiatry: Spirituality and depression in young people",
       "https://link.springer.com/article/10.1186/s12888-023-05091-2"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 3",
       "h": "Big Questions and Faith",
       "sub": "Wonder with them.",
       "say": "Middle school is when many kids start asking big questions, about God, about meaning, and about why hard things happen. This lesson is about meeting those questions with wonder, in whatever way fits your family. Aspen is made for all faith traditions and everything in-between."
      },
      {
       "k": "big",
       "h": "Early adolescence is when spiritual life often wakes up.",
       "sub": "Questions are a sign of growing.",
       "say": "Early adolescence is when spiritual life often wakes up. Research finds that a lived spiritual life is one of the strongest protections young people have, and that this awakening is a normal part of growing up. Questions are a sign of growing, not of losing faith."
      },
      {
       "k": "big",
       "h": "Silence, more than doubt, is what does harm.",
       "sub": "Doubt spoken out loud is healthier than doubt kept quiet.",
       "say": "Many young people in faith communities carry serious doubts, and only about a quarter ever talk with anyone about them. Researchers who studied this concluded that silence, not doubt, is what harms faith. When kids can bring their questions to you, faith has room to grow up with them."
      },
      {
       "k": "points",
       "h": "How Aspen asks about Roots",
       "items": [
        [
         "About experience",
         "Never about belief"
        ],
        [
         "Many doors",
         "Prayer, worship, quiet, nature, tradition"
        ],
        [
         "Comfort or weight",
         "Does it help, or weigh them down?"
        ]
       ],
       "say": "That is why Aspen asks about experience, never belief. A Roots question might ask whether a student ever feels close to God, the Sacred, or something holy, like when they pray, worship, sit quietly, or spend time outside. Another asks whether thoughts about God, or something bigger, ever leave them worried or weighed down. Students of all faith traditions and everything in-between can be strong in Roots."
      },
      {
       "k": "big",
       "h": "Faith should help a child feel loved.",
       "sub": "Faith that wounds is worth taking seriously.",
       "say": "Faith can be a deep comfort. It can also become a weight. Research on young people finds that spiritual well-being protects against depression, while spiritual struggle, like feeling abandoned or punished by God, adds to it. So if your student says faith makes them feel scared, judged, or not good enough, listen first, without defending or correcting. Ask, what happened, or who made you feel that way? And if a person or group is causing harm, step in."
      },
      {
       "k": "words",
       "h": "When they ask",
       "items": [
        "\"That's a real question.\"",
        "\"I'm so glad you asked me that.\"",
        "\"I've wondered about that too.\"",
        "\"Who else could we ask?\""
       ],
       "say": "When a big question comes, a few words help. That's a real question. People of faith have asked it for thousands of years. I'm so glad you asked me that. I've wondered about that too. And, who else could we ask? Wonder with them, instead of rushing to answers."
      },
      {
       "k": "points",
       "h": "Try it: remember your own question",
       "items": [
        [
         "Think back",
         "To about their age"
        ],
        [
         "Your big question",
         "What did you wonder about?"
        ],
        [
         "Name it",
         "Quietly, to yourself"
        ]
       ],
       "beats": [
        "Let us pause here.",
        "Think back to when you were about their age.",
        "What big question did you carry, about God, or life, or why things happen?",
        "Did you tell anyone, or keep it to yourself?",
        {
         "t": "Name that question quietly to yourself now.",
         "w": 10
        }
       ],
       "say": "Let us pause here. Think back to when you were about their age. What big question did you carry, about God, or life, or why things happen? Did you tell anyone, or keep it to yourself? Name that question quietly to yourself now."
      },
      {
       "k": "points",
       "h": "Roots practices in Aspen",
       "items": [
        [
         "A hidden question",
         "Write it down, keep it or share it"
        ],
        [
         "A belief in progress",
         "Talk it through with a grown-up"
        ],
        [
         "Ask an elder",
         "What helps you trust when life is hard?"
        ],
        [
         "Quiet time",
         "Pray or sit in stillness, your way"
        ]
       ],
       "say": "Remembering your own questions makes it easier to welcome theirs. Aspen's Roots practices give students ways in. Write down a question about faith or life you've never said out loud. Talk with a trusted grown-up about one belief you're still figuring out. Ask an elder what helps them trust when life is hard. Or pray, or sit in stillness, in whatever way fits you and your family. Each practice's Learn more card asks the same of grown-ups. Listen and wonder. Don't rush to answers."
      },
      {
       "k": "points",
       "h": "More help",
       "items": [
        [
         "When Life Changes",
         "Big questions about faith"
        ],
        [
         "Someone you trust",
         "A pastor, imam, rabbi, elder, or mentor"
        ],
        [
         "If it ever gets heavy",
         "Call or text 988. In danger, 911."
        ]
       ],
       "say": "For more, open the When Life Changes guide called Big questions about faith. Point your student to trusted mentors in your tradition, like a pastor, imam, rabbi, elder, or mentor you trust. And if a hard season ever points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text nine eight eight, or call nine one one in an emergency."
      },
      {
       "k": "big",
       "h": "Wonder with them.",
       "sub": "Faith can grow up with them.",
       "say": "Wonder with them. When their questions have a safe place to land, faith can grow up right along with them."
      },
      {
       "k": "quiz",
       "q": "What does Aspen ask about in Roots?",
       "opts": [
        "Which religion a student belongs to",
        "Whether the sacred comforts them or weighs on them",
        "How often they attend services"
       ],
       "right": 1,
       "why": "Roots asks about experience, never belief, so every student can be strong there.",
       "say": "Quick question. What does Aspen ask about in Roots?"
      }
     ]
    },
    {
     "id": "as-p-worry",
     "n": 4,
     "title": "When to Worry, and Who to Call",
     "mins": 6,
     "blurb": "Signs that need more help, the plain words to ask, and who to call.",
     "sources": [
      "dazzi"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 4",
       "h": "When to Worry, and Who to Call",
       "sub": "Know the signs. Know the words. Know the numbers.",
       "say": "Most hard days in middle school pass on their own. Some signs mean a student needs more help, and soon. This lesson walks through those signs, the plain words to use, and who to call."
      },
      {
       "k": "big",
       "h": "Moody is normal. A real change is worth a closer look.",
       "sub": "Watch for changes that last, or that come on fast.",
       "say": "Middle schoolers have big ups and downs, and most of them are normal. What matters most is change. A student who seems different from who they have been, for more than a couple of weeks, or all at once, is worth a closer look."
      },
      {
       "k": "points",
       "h": "Signs that need more help",
       "items": [
        [
         "Talk of dying or being a burden",
         "Even when it sounds like a joke"
        ],
        [
         "Pulling away",
         "From friends, family, and things they loved"
        ],
        [
         "Big changes in sleep or eating",
         "Lasting more than two weeks"
        ],
        [
         "Hidden marks, or saying goodbye",
         "Giving away things that matter to them"
        ]
       ],
       "say": "Here are signs that need more help. Talk about dying, wanting to disappear, or being a burden, even when it sounds like a joke. Pulling away from friends, family, and the things they used to love. Big changes in sleep or eating that last more than two weeks. And marks they keep hidden, or giving away things that matter to them, as if they are saying goodbye."
      },
      {
       "k": "card",
       "title": "Worth a check-in",
       "body": "You see what they answered, and what to do next.",
       "fields": [
        [
         "Safety question",
         "Not sure"
        ],
        [
         "Next step",
         "Ask gently, and listen"
        ]
       ],
       "btns": [
        "See the calm card"
       ],
       "tap": 0,
       "say": "Aspen helps you notice too. Every check-in ends with two direct safety questions. When a student answers one in a worrying way, you see a marker on that ring that says Worth a check-in, with what they said and what to do next. Your student sees a calm card right away, with people to talk to. Aspen cannot follow up on its own. That part is yours."
      },
      {
       "k": "big",
       "h": "Asking directly about suicide is safe.",
       "sub": "It does not put the idea in their head. It opens the door.",
       "say": "If you see these signs, ask directly. Asking a young person about suicide is safe. It does not put the idea in their head. It tells them you can handle the answer, and that they do not have to carry it alone."
      },
      {
       "k": "words",
       "h": "Say it in plain words",
       "items": [
        "I have noticed you seem really down lately.",
        "Are you thinking about killing yourself?"
       ],
       "sub": "Say it once out loud. It gets easier.",
       "beats": [
        "Plain words work best.",
        "Start with what you noticed.",
        "I have noticed you seem really down lately.",
        "Then ask the question plainly.",
        "Are you thinking about killing yourself?",
        "Saying it out loud the first time is the hardest part.",
        {
         "t": "So say that question now, out loud, one time, right where you are.",
         "w": 10
        }
       ],
       "say": "Plain words work best. Start with what you noticed. I have noticed you seem really down lately. Then ask the question plainly. Are you thinking about killing yourself? Saying it out loud the first time is the hardest part. So say that question now, out loud, one time, right where you are."
      },
      {
       "k": "points",
       "h": "If they say yes, or not sure",
       "items": [
        [
         "Stay calm, and stay with them",
         "Close by, and listening"
        ],
        [
         "Thank them for telling you",
         "They are not in trouble"
        ],
        [
         "Promise help, not secrecy",
         "I love you too much to keep this quiet"
        ],
        [
         "Get help together, today",
         "Call or text 988 side by side"
        ]
       ],
       "say": "If they say yes, or not sure, stay calm and stay with them. Thank them for telling you. They are not in trouble. Promise help, not secrecy. You can say, I love you too much to keep this quiet. Then get help together, today. Call or text nine eight eight side by side."
      },
      {
       "k": "points",
       "h": "Who to call",
       "items": [
        [
         "In danger right now?",
         "Call 911"
        ],
        [
         "Call or text 988",
         "The Suicide and Crisis Lifeline, any time"
        ],
        [
         "Text HOME to 741741",
         "Crisis Text Line"
        ],
        [
         "School counselor and doctor",
         "This week, for a closer look"
        ]
       ],
       "say": "Know who to call. If they are in danger right now, call nine one one. For a crisis, or when you are not sure, call or text nine eight eight, the Suicide and Crisis Lifeline, any time, day or night. You can call it yourself, as the worried grown-up. Or text the word home to seven four one, seven four one. And when signs worry you, call the school counselor and your child’s doctor this week, and tell them what you have seen. Teachers and counselors, follow your school’s own steps too."
      },
      {
       "k": "points",
       "h": "More help, right in Aspen",
       "items": [
        [
         "Self-harm and cutting",
         "What to say, and what to do"
        ],
        [
         "When a friend is hurting",
         "When your child carries a friend’s secret"
        ],
        [
         "See the calm card",
         "Helplines a student can reach alone"
        ]
       ],
       "say": "Aspen has more for you. In When Life Changes, the Safety group has two guides. Self-harm and cutting walks you through what to say and what to do. When a friend is hurting helps when your child is carrying a friend’s secret. Teach them this: telling a grown-up is being a good friend, even if the friend asked them not to, and they are never in trouble for telling. And in the Grown-ups tab, See the calm card shows the helplines a student can reach on their own."
      },
      {
       "k": "big",
       "h": "You do not have to be the expert.",
       "sub": "Ask plainly. Stay close. Call for help.",
       "say": "You do not have to be the expert. Ask plainly, stay close, and call for help. Getting help early is a strong and loving thing to do."
      },
      {
       "k": "quiz",
       "q": "What is the best way to ask about suicide?",
       "opts": [
        "Hint at it, so you do not scare them",
        "Ask directly, in plain words",
        "Wait for them to bring it up"
       ],
       "right": 1,
       "why": "Asking directly is safe, and it shows you can handle the answer.",
       "say": "Quick question. What is the best way to ask about suicide?"
      }
     ]
    },
    {
     "id": "as-p-together",
     "n": 5,
     "title": "Using Aspen Together",
     "mins": 5,
     "blurb": "Side by side with your student: the two tabs, what you can see, and growth plans.",
     "sources": [
      [
       "Search Institute: Developmental relationships",
       "https://searchinstitute.org/developmental-relationships"
      ]
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 5",
       "h": "Using Aspen Together",
       "sub": "Side by side, with room to grow.",
       "say": "Aspen works best when a student and a grown-up use it side by side. This lesson shows how, and how to give your student room to make it their own."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Home",
        "Students",
        "Grown-ups",
        "When Life Changes",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "Students",
        "p": "Each student adds themselves and keeps their own tree."
       },
       "say": "Aspen has two doors. The Students tab is for your student. They add themselves with their grade, and the tree is theirs. With you beside them, they can save it in their own profile, locked with a passcode only they know. The grown-ups who agree for them can open it too, so they can help."
      },
      {
       "k": "tabs",
       "app": "aspen",
       "app_name": "Aspen",
       "tabs": [
        "Home",
        "Students",
        "Grown-ups",
        "When Life Changes",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Grown-ups",
        "p": "What students see, what you can see, and how to help."
       },
       "say": "The Grown-ups tab is for you. It shows the students on this device. Open your own grown-up profile, with the button at the top of the page, to see every student you agreed for. Then tap a student to see their rings and their tree."
      },
      {
       "k": "points",
       "h": "What you can see",
       "items": [
        [
         "Always shown to you",
         "Safety answers, and a few key questions"
        ],
        [
         "The big picture",
         "Levels, days tended, parts they tend"
        ],
        [
         "Just theirs",
         "Other answers, notes, and reflections"
        ]
       ],
       "say": "Aspen gives students privacy in three layers, and tells them so before they start. Always shown to you: the two safety questions, and the questions about feeling lonely or left out, being bullied, and feeling like giving up. The big picture: how each part is doing, how many days they tended their tree, and which parts they are tending. And just theirs: the rest of their answers, the practices they check off, their notes, and their weekly reflections, unless they choose to share one with you."
      },
      {
       "k": "big",
       "h": "Kids answer more honestly when they know up front.",
       "sub": "Their privacy is part of what makes Aspen work.",
       "say": "That privacy is on purpose. Kids answer more honestly when they know up front who will see what. Honoring it builds the trust you will lean on when the hard days come."
      },
      {
       "k": "card",
       "title": "How are you doing this check-in?",
       "body": "Your grown-up will see a gold note with a question to talk about after each answer.",
       "btns": [
        "On my own",
        "With a grown-up"
       ],
       "tap": 1,
       "say": "When you want to go deeper, do a check-in together. At the start, your student picks On my own, or With a grown-up. Together, a gold note after each answer gives you a question to take the talk deeper. And because you did it together, you can see every answer on that ring."
      },
      {
       "k": "points",
       "h": "The growth plan, side by side",
       "items": [
        [
         "Aspen suggests two parts",
         "Your student can choose any part"
        ],
        [
         "Learn more",
         "Why it helps, how, and if it is hard"
        ],
        [
         "Try it with a grown-up",
         "A way to join in, on every practice"
        ],
        [
         "For your grown-up",
         "Guides that fit each part"
        ]
       ],
       "say": "After a check-in, Aspen suggests two parts to tend, and your student builds a growth plan of small daily practices. Let them choose. Every practice has a Learn more button, with why it helps, the steps, what to do if it is hard, and a way to try it with a grown-up. And under each part, For your grown-up links you to the guides that fit."
      },
      {
       "k": "flow",
       "h": "Today, Week, and Season",
       "steps": [
        [
         "Today",
         "One practice waters the tree"
        ],
        [
         "Week",
         "A theme and a question"
        ],
        [
         "Season",
         "Twelve weeks, then a new ring"
        ]
       ],
       "say": "Your student tends their tree in Today, Week, and Season. Checking off any one practice waters it for the day. Each week brings a theme and a reflection question, and your view of their tree shows this week’s theme and question, so you can bring it up at dinner. Twelve weeks make a season, and the next full check-in adds a ring."
      },
      {
       "k": "words",
       "h": "Ask, and let them lead",
       "items": [
        "What practice are you liking lately?",
        "Want to try one together this week?"
       ],
       "sub": "Say one out loud.",
       "beats": [
        "Questions open more doors than keeping watch does.",
        "Here are two to try.",
        "What practice are you liking lately?",
        "Want to try one together this week?",
        {
         "t": "Pick the one that sounds most like you, and say it out loud now, the way you would at dinner.",
         "w": 8
        }
       ],
       "say": "Questions open more doors than keeping watch does. Here are two to try. What practice are you liking lately? Want to try one together this week? Pick the one that sounds most like you, and say it out loud now, the way you would at dinner."
      },
      {
       "k": "big",
       "h": "Share power, a little more each year.",
       "sub": "Middle school is when it starts to matter most.",
       "say": "Close relationships with caring adults help young people thrive, and in middle school, sharing power starts to matter most. Let your student lead their tree. Your part is to walk beside it."
      },
      {
       "k": "quiz",
       "q": "After a check-in done On my own, what can you see?",
       "opts": [
        "Every answer",
        "Safety answers and the big picture",
        "Nothing at all"
       ],
       "right": 1,
       "why": "Safety answers always show, plus how each part is doing. The rest is theirs.",
       "say": "Quick question. After a check-in your student did on their own, what can you see?"
      }
     ]
    },
    {
     "id": "as-p-you",
     "n": 6,
     "title": "Caring for Yourself Too",
     "mins": 5,
     "blurb": "Tending your own tree, so you have steadiness to share.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "For Grown-ups, Lesson 6",
       "h": "Caring for Yourself Too",
       "sub": "Your steadiness is a gift to them.",
       "say": "This last lesson is for you, the grown-up. Walking beside a middle schooler takes a lot out of you. Here is how to tend yourself along the way."
      },
      {
       "k": "big",
       "h": "Calm is contagious. So is worry.",
       "sub": "Your steadiness helps them find theirs.",
       "say": "Kids borrow calm from the grown-ups around them. Calm is contagious, and so is worry. When you are steady, your student has something solid to lean on. So tending yourself is part of helping them. You do not have to be calm all the time. You only need a way back to calm, and this lesson is about finding yours."
      },
      {
       "k": "points",
       "h": "Signs you are running low",
       "items": [
        [
         "A short fuse",
         "Snapping at small things"
        ],
        [
         "Running on empty",
         "Tired, even after sleep"
        ],
        [
         "Carrying it alone",
         "No one to talk it through with"
        ],
        [
         "Dreading the hard talks",
         "Putting them off, or rushing through"
        ]
       ],
       "say": "Notice the signs that you are running low. A short fuse, snapping at small things. Running on empty, tired even after a night of sleep. Carrying it all alone, with no one to talk it through with. And dreading the hard talks, putting them off, or rushing through them. These are signals, not failures. They tell you it is time to tend your own tree."
      },
      {
       "k": "six",
       "h": "You have six parts too",
       "words": [
        "What holds you up",
        "Why you do all this",
        "Your own feelings",
        "Your own people",
        "Sleep, movement, meals",
        "Hope you can hand on"
       ],
       "say": "You have a tree too, with the same six parts. Roots, what holds you up. Trunk, the reason you do all this. Bark, your own mind and feelings. Branches, your own people, beyond your kids. Leaves, your body, with sleep, movement, and real meals. And Fruit, the hope you hand on."
      },
      {
       "k": "points",
       "h": "Small things that refill you",
       "items": [
        [
         "One slow breath first",
         "Before you walk in the door"
        ],
        [
         "Your own people",
         "A friend who listens to you"
        ],
        [
         "A few minutes that are yours",
         "A walk, music, or quiet"
        ],
        [
         "Rest without guilt",
         "Rest helps you show up"
        ]
       ],
       "say": "Small things refill you. One slow breath before you walk in the door. Time with your own people, like a friend who listens to you for a change. A few minutes each day that are just yours, like a walk, some music, or quiet. And rest without guilt. Rest is part of how you keep showing up."
      },
      {
       "k": "breathe",
       "h": "One minute for you",
       "sub": "Shoulders down. Jaw soft. Long breath out.",
       "beats": [
        "Let us try one right now.",
        "Drop your shoulders.",
        "Unclench your jaw.",
        "Breathe in slowly, and let a long breath out.",
        {
         "t": "Do that two more times, at your own pace.",
         "w": 12
        }
       ],
       "say": "Let us try one right now. Drop your shoulders. Unclench your jaw. Breathe in slowly, and let a long breath out. Do that two more times, at your own pace."
      },
      {
       "k": "points",
       "h": "Share the load",
       "items": [
        [
         "You are one of their grown-ups",
         "Not the only one"
        ],
        [
         "Name their circle",
         "Grandparents, coaches, teachers, mentors"
        ],
        [
         "Let others in",
         "Ask for help before you run dry"
        ]
       ],
       "say": "Share the load. You are one of your student’s grown-ups, not the only one. Grandparents, coaches, teachers, a school counselor, a neighbor, or a mentor. Each one adds a root that holds your student up. Name that circle, and let them in. Ask for a ride, a meal, or a listening ear before you run dry. Letting others help you is part of helping your kid too."
      },
      {
       "k": "big",
       "h": "Repair matters more than getting it right.",
       "sub": "I got that wrong. Let me try again.",
       "say": "You will lose your cool sometimes. Every grown-up does. What matters most is what happens after. Come back, name it, and make it right. You can say, I got that wrong. Let me try again. Your student learns more from watching you repair than from watching you be perfect."
      },
      {
       "k": "points",
       "h": "Support for you too",
       "items": [
        [
         "Talk with someone",
         "A friend, a counselor, your doctor"
        ],
        [
         "Oak, for grown-ups",
         "Your own tree, check-ins, and practices"
        ],
        [
         "Call or text 988",
         "For you too, any time"
        ]
       ],
       "say": "You deserve support too. Talk with a friend, a counselor, or your doctor, especially if worry or sadness stays with you for weeks. Grow With Grounded has a tree for grown-ups, called Oak, with your own check-ins and practices. And if you are ever in crisis yourself, call or text nine eight eight, any time. In danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Tend your own tree. They are watching how you grow.",
       "say": "Tend your own tree, a little at a time. Your student is watching how you grow, and that may be the best lesson Aspen can offer."
      },
      {
       "k": "quiz",
       "q": "Why does tending yourself help your student?",
       "opts": [
        "It only helps you",
        "Your calm gives them something steady to lean on",
        "It means you can skip the hard talks"
       ],
       "right": 1,
       "why": "Kids borrow calm from the grown-ups around them.",
       "say": "Last question. Why does tending yourself help your student?"
      }
     ]
    }
   ]
  },
  {
   "id": "aspen-support",
   "kind": "support",
   "title": "For Hard Moments",
   "who": "Short videos for students, to use right in the middle of it",
   "lessons": [
    {
     "id": "as-r-ground",
     "n": 1,
     "title": "Ground Yourself Right Now",
     "mins": 3,
     "blurb": "Use your five senses to come back to right here, right now.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "Ground Yourself Right Now",
       "sub": "Five senses, one at a time.",
       "say": "When everything feels like too much, your senses can bring you back to right now. This takes about three minutes. Let us do it together."
      },
      {
       "k": "big",
       "h": "Your senses always live in right now.",
       "sub": "That makes them a great way back.",
       "say": "Sometimes your brain races ahead to what might happen, or keeps replaying what already did. Your senses only know one time: right now. That makes them a great way back."
      },
      {
       "k": "points",
       "h": "Five, four, three, two, one",
       "items": [
        [
         "5 things you can see",
         "Look slowly around"
        ],
        [
         "4 things you can feel",
         "Feet, chair, sleeves, air"
        ],
        [
         "3 things you can hear",
         "Near and far"
        ],
        [
         "2 things you can smell",
         "Or two smells you like"
        ],
        [
         "1 thing you can taste",
         "Or one sip of water"
        ]
       ],
       "cue": {
        "w": {
         "1": 10,
         "4": 8,
         "5": 7,
         "6": 6,
         "7": 5
        },
        "at": [
         1,
         2,
         5,
         6,
         7
        ]
       },
       "say": "Let us go slowly. Look around and name five things you can see. Now four things you can feel. Your feet in your shoes. The chair under you. Three things you can hear, near and far. Two things you can smell. And one thing you can taste."
      },
      {
       "k": "breathe",
       "h": "One slow breath to finish",
       "hold": 12,
       "cue": {
        "p": {
         "1": 3,
         "2": 4
        }
       },
       "say": "Now one slow breath. In for four. And out for six."
      },
      {
       "k": "points",
       "h": "Use it anywhere",
       "items": [
        [
         "In class",
         "Quietly, in your head"
        ],
        [
         "Before a game or a test",
         "Feet on the floor first"
        ],
        [
         "In bed at night",
         "Name the sounds of the house"
        ]
       ],
       "say": "You can do this anywhere, and no one has to know. In class, quietly in your head. Before a game or a test. Even in bed at night, listening to the sounds of the house."
      },
      {
       "k": "big",
       "h": "You are here. And you have people.",
       "sub": "Tell a parent, grandparent, teacher, or school counselor. In Aspen, tap Need to talk to someone?",
       "say": "If the big feeling stays, you do not have to handle it alone. Tell a grown-up you trust, like a parent, grandparent, teacher, or school counselor. And in Aspen, the button that says Need to talk to someone shows people you can reach any time. You are here. And you have people."
      }
     ]
    },
    {
     "id": "as-r-anxious",
     "n": 2,
     "title": "When You Feel Anxious",
     "mins": 3,
     "blurb": "Box breathing to slow worry down, anywhere.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You Feel Anxious",
       "sub": "Breathing in a box.",
       "say": "Anxious can feel like a tight chest, a knotted stomach, or a brain that keeps asking, what if? If that is you right now, stay with me for a few minutes."
      },
      {
       "k": "big",
       "h": "Worry is your body trying to keep you safe.",
       "sub": "Sometimes the alarm rings louder than it needs to.",
       "say": "Worry is your body trying to keep you safe. Sometimes the alarm rings louder than it needs to. Your breath is one way to turn the volume down."
      },
      {
       "k": "points",
       "h": "Where do you feel it?",
       "items": [
        [
         "Your chest",
         "Tight or fast"
        ],
        [
         "Your stomach",
         "Butterflies or knots"
        ],
        [
         "Your hands and jaw",
         "Clenched or shaky"
        ]
       ],
       "cue": {
        "p": {
         "1": 1.5,
         "2": 1.5,
         "3": 1.5
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "First, notice where you feel it. Maybe in your chest. Maybe in your stomach. Maybe in your hands or your jaw. Just noticing is a good start."
      },
      {
       "k": "words",
       "h": "Around the box",
       "items": [
        "In, two, three, four.",
        "Hold, two, three, four.",
        "Out, two, three, four.",
        "Hold, two, three, four."
       ],
       "cue": {
        "w": {
         "1": 4,
         "2": 4,
         "3": 4,
         "4": 4
        },
        "at": [
         1,
         2,
         3,
         4
        ]
       },
       "say": "Let us go around the box together. Breathe in slowly through your nose. Hold it gently. Breathe out slowly through your mouth. And hold again."
      },
      {
       "k": "big",
       "h": "Three more times, at your own pace.",
       "sub": "In four. Hold four. Out four. Hold four.",
       "hold": 40,
       "say": "Now go around the box three more times, at your own pace. I will wait with you."
      },
      {
       "k": "words",
       "h": "Say it to yourself",
       "items": [
        "This is worry.",
        "It rises, and it settles.",
        "I can take one small step."
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 1,
         "3": 1.5
        }
       },
       "say": "Say this to yourself, slowly. This is worry. It rises, and it settles. I can take one small step."
      },
      {
       "k": "big",
       "h": "You don’t have to carry worry alone.",
       "sub": "Tell a parent, teacher, or school counselor. Need to talk now? Call or text 988, or text HOME to 741741.",
       "say": "You do not have to carry worry alone. If it keeps showing up, tell a grown-up you trust, like a parent, grandparent, teacher, or school counselor. And if you need to talk to someone right now, call or text nine eight eight, or text HOME to seven four one seven four one."
      }
     ]
    },
    {
     "id": "as-r-test",
     "n": 3,
     "title": "Before a Big Test",
     "mins": 3,
     "blurb": "Settle your body and your thoughts before you start.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "Before a Big Test",
       "sub": "A few minutes to get steady.",
       "say": "A big test is coming, and your body might be buzzing. That buzz means it matters to you. Here is how to get steady, so your brain can show what it knows."
      },
      {
       "k": "big",
       "h": "A little nervous is normal.",
       "sub": "When it gets too big, your body can bring it down.",
       "say": "A little nervous energy is normal, and it can keep you alert. When it gets to be too much, your body can help bring it back down."
      },
      {
       "k": "points",
       "h": "Squeeze and let go",
       "items": [
        [
         "Your hands",
         "Two tight fists"
        ],
        [
         "Your shoulders",
         "Up to your ears"
        ],
        [
         "Your feet",
         "Press into the floor"
        ]
       ],
       "cue": {
        "w": {
         "1": 5,
         "2": 4,
         "3": 5,
         "4": 4,
         "5": 5,
         "6": 4
        },
        "at": [
         1,
         3,
         5
        ]
       },
       "say": "Let us let some of that buzz out. Make two tight fists, and squeeze. Now let go. Lift your shoulders up toward your ears, and hold. Now let them drop. Press your feet into the floor. And let them rest."
      },
      {
       "k": "breathe",
       "h": "In for four, out for six",
       "hold": 20,
       "say": "Now breathe with the circle. In for four. And out for six. A longer breath out helps your body settle."
      },
      {
       "k": "words",
       "h": "Tell yourself",
       "items": [
        "I prepared what I could.",
        "One question at a time.",
        "I can come back to a hard one."
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 1,
         "3": 1.5
        }
       },
       "say": "Now give your brain something kind to hear. I prepared what I could. One question at a time. I can come back to a hard one."
      },
      {
       "k": "points",
       "h": "During the test",
       "items": [
        [
         "Stuck?",
         "Skip it and come back"
        ],
        [
         "Mind racing?",
         "Feet on the floor, one breath"
        ],
        [
         "Read it twice",
         "Slow and steady"
        ]
       ],
       "say": "And during the test, if you get stuck on a question, skip it and come back. If your mind starts racing, press your feet into the floor and take one slow breath. And read each question twice. Slow and steady works."
      },
      {
       "k": "big",
       "h": "One test is one day. You are more than a score.",
       "sub": "Tests worry you a lot? Tell a teacher, a school counselor, or a parent.",
       "say": "One test is one day, and you are so much more than a score. If tests worry you a lot, tell someone who can help, like a teacher, a school counselor, or a parent. They may have ideas that make the next one easier. You can do this."
      }
     ]
    },
    {
     "id": "as-r-mad",
     "n": 4,
     "title": "When You’re Really Mad",
     "mins": 3,
     "blurb": "Make room for anger, then choose what you do next.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You’re Really Mad",
       "sub": "Make room before you react.",
       "say": "Anger is a real feeling, and an important one. It often means something feels unfair, or something matters to you. This is about making room, so you get to choose what happens next."
      },
      {
       "k": "points",
       "h": "Where is the heat?",
       "items": [
        [
         "Your face",
         "Hot or red"
        ],
        [
         "Your fists and jaw",
         "Tight"
        ],
        [
         "Your heart",
         "Fast and loud"
        ]
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 1,
         "3": 1
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Anger shows up in your body first. Maybe your face feels hot. Maybe your fists or your jaw get tight. Maybe your heart beats fast. That is your signal to pause."
      },
      {
       "k": "flow",
       "h": "Stop",
       "steps": [
        [
         "Step back",
         "Walk away for a minute"
        ],
        [
         "Take a breath",
         "Long and slow out"
        ],
        [
         "Observe",
         "Name it: this is anger"
        ],
        [
         "Proceed",
         "One good next step"
        ]
       ],
       "cue": {
        "w": {
         "4": 6,
         "6": 4,
         "7": 6
        },
        "at": [
         1,
         3,
         5,
         7
        ]
       },
       "say": "Remember the word stop. Step back. Walk away for a minute, if you can. Take a breath. Try it now: breathe in, and then a long, slow breath out. Observe. Say it quietly now: this is anger. Then proceed, with one choice you will be glad about later."
      },
      {
       "k": "points",
       "h": "Let the energy out safely",
       "items": [
        [
         "Move",
         "Fast walk, run, push a wall"
        ],
        [
         "Squeeze",
         "A pillow or a stress ball"
        ],
        [
         "Write it",
         "Everything, just for you"
        ]
       ],
       "say": "Anger is energy, so let it out in a safe way. Move your body. Take a fast walk, run, or push hard against a wall. Squeeze a pillow. Or write down everything you want to say, just for you."
      },
      {
       "k": "words",
       "h": "Words that buy time",
       "items": [
        "I need a minute.",
        "I want to talk when I’m calmer.",
        "Can we try this again later?"
       ],
       "say": "Some words can buy you time. I need a minute. I want to talk about this when I am calmer. Or, can we try this again later?"
      },
      {
       "k": "big",
       "h": "Your anger matters. So do you.",
       "sub": "Tell a parent, teacher, or school counselor what happened. Anyone in danger? Call 911.",
       "say": "When you have cooled down, tell a grown-up you trust what happened, like a parent, grandparent, teacher, or school counselor. Talking it through helps. If someone is hurting you, or anyone is in danger, tell a grown-up right away, or call nine one one. Your anger matters. So do you."
      }
     ]
    },
    {
     "id": "as-r-sleep",
     "n": 5,
     "title": "When You Can’t Sleep",
     "mins": 3,
     "blurb": "Set your thoughts down and let your body rest.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You Can’t Sleep",
       "sub": "Set it down for tonight.",
       "say": "If it is late, and your mind will not slow down, this is for you. Keep the lights low and the volume soft."
      },
      {
       "k": "points",
       "h": "Put it on paper",
       "items": [
        [
         "Write what is spinning",
         "A few words each"
        ],
        [
         "Add one small step",
         "For tomorrow, not tonight"
        ],
        [
         "Close it",
         "It will keep until morning"
        ]
       ],
       "cue": {
        "at": [
         0,
         2,
         3
        ]
       },
       "say": "First, if you have paper nearby, write down what is spinning in your head. Just a few words each. Next to anything you need to do, write one small step for tomorrow. Then close it. It will keep until morning."
      },
      {
       "k": "points",
       "h": "Soften, from your toes up",
       "items": [
        [
         "Toes and legs",
         "Heavy and still"
        ],
        [
         "Belly and chest",
         "Rising and falling"
        ],
        [
         "Shoulders and hands",
         "Dropping down"
        ],
        [
         "Jaw and forehead",
         "Soft"
        ]
       ],
       "cue": {
        "w": {
         "1": 8,
         "2": 8,
         "3": 8,
         "4": 8
        },
        "at": [
         1,
         2,
         3,
         4
        ]
       },
       "say": "Now lie back. Let your toes and legs get heavy. Let your belly and chest rise and fall on their own. Let your shoulders and hands drop. And let your jaw and forehead go soft."
      },
      {
       "k": "breathe",
       "h": "Slow breaths",
       "hold": 40,
       "say": "Now just breathe. In for four, and out for six. If your mind wanders, that is okay. Come back to the next breath."
      },
      {
       "k": "points",
       "h": "For tomorrow night",
       "items": [
        [
         "Phone outside your room",
         "Charge it somewhere else"
        ],
        [
         "A calm wind-down",
         "Music, a book, a shower"
        ],
        [
         "A steady bedtime",
         "About the same most nights"
        ]
       ],
       "say": "Tomorrow, you can make sleep a little easier. Charge your phone outside your room. Wind down with something calm, like music, a book, or a warm shower. And go to bed around the same time most nights."
      },
      {
       "k": "big",
       "h": "Rest counts, even before sleep comes.",
       "sub": "Lots of hard nights? Tell a parent, grandparent, or school counselor.",
       "say": "If a lot of nights feel like this, tell a grown-up you trust, like a parent, grandparent, or school counselor. Worries feel lighter when someone else knows. And remember, rest counts, even before sleep comes. Good night."
      }
     ]
    },
    {
     "id": "as-r-sad",
     "n": 6,
     "title": "When You Feel Sad",
     "mins": 3,
     "blurb": "Be kind to the sad part, and let someone help carry it.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You Feel Sad",
       "sub": "Sad is allowed here.",
       "say": "If you feel sad right now, I am glad you are here. Sadness is a real feeling, and it is okay to have it. Let us take a few minutes together."
      },
      {
       "k": "big",
       "h": "Sadness shows up when something matters.",
       "sub": "It comes in waves, and waves pass.",
       "say": "Sadness often shows up when something matters to you. Maybe you lost something, or someone. Maybe the day just went wrong. Sadness comes in waves, and waves pass."
      },
      {
       "k": "breathe",
       "h": "Slow breaths first",
       "hold": 20,
       "say": "First, follow the circle. Breathe in for four. And out for six. Let your shoulders drop a little."
      },
      {
       "k": "points",
       "h": "Be kind to the sad part",
       "items": [
        [
         "Name it",
         "I feel sad."
        ],
        [
         "Hand on your heart",
         "Feel how warm it is"
        ],
        [
         "Say something kind",
         "This is hard. I will be okay."
        ]
       ],
       "cue": {
        "w": {
         "5": 10
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Now try this with me. Say quietly, I feel sad. Put one hand on your heart, and feel how warm it is. Then say something kind to yourself, the way you would to a friend. This is hard, and I am going to be okay. Stay here for a few breaths."
      },
      {
       "k": "points",
       "h": "One small thing next",
       "items": [
        [
         "Drink some water",
         "Or have a snack"
        ],
        [
         "Move a little",
         "A walk, a stretch, a song"
        ],
        [
         "Be near someone",
         "A pet, a sibling, a grown-up"
        ]
       ],
       "say": "Then pick one small thing. Drink some water, or have a snack. Move a little, with a walk, a stretch, or a song you like. Or just be near someone, like a pet, a brother or sister, or a grown-up."
      },
      {
       "k": "big",
       "h": "Tell a grown-up you trust.",
       "sub": "Sad for weeks? Tell them. Not wanting to be alive: call or text 988.",
       "say": "Sadness is easier to carry with someone. Tell a grown-up you trust, like a parent, a grandparent, a teacher, or your school counselor. If the sadness sticks around for a couple of weeks, tell them that too. And if it ever gets so heavy that you do not want to be alive, tell a grown-up today, and call or text nine eight eight, any time."
      },
      {
       "k": "big",
       "h": "Waves rise, and waves pass.",
       "sub": "You do not have to carry this alone.",
       "say": "Waves rise, and waves pass. You do not have to carry this alone. Come back here whenever you need to."
      }
     ]
    },
    {
     "id": "as-r-left",
     "n": 7,
     "title": "When You Feel Left Out",
     "mins": 3,
     "blurb": "Ease the sting, remember what is true, and make one small reach.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You Feel Left Out",
       "sub": "It stings. You still belong.",
       "say": "Maybe you saw pictures of a party you were not invited to. Maybe a group went quiet when you walked up. Feeling left out stings. Let us take a few minutes together."
      },
      {
       "k": "big",
       "h": "Being left out really hurts.",
       "sub": "Almost everyone your age feels it sometimes.",
       "say": "Being left out really hurts. Almost everyone in middle school feels it at some point, even the kids who look like they have it all together. It does not mean something is wrong with you."
      },
      {
       "k": "points",
       "h": "Squeeze and let go",
       "items": [
        [
         "Make two tight fists",
         "Squeeze for five"
        ],
        [
         "Let your hands open",
         "Notice the difference"
        ],
        [
         "Drop your shoulders",
         "Let the sting soften"
        ]
       ],
       "cue": {
        "p": {
         "2": 3
        },
        "w": {
         "6": 10
        },
        "at": [
         1,
         3,
         5
        ]
       },
       "say": "Try this with me. Make two tight fists, and squeeze. Hold it, two, three, four, five. Now let your hands fall open. Notice the difference. Let your shoulders drop, too. Do it one more time, at your own pace."
      },
      {
       "k": "words",
       "h": "Things that are also true",
       "items": [
        "One moment is not my whole story.",
        "I can be a good friend to me.",
        "I matter, even today."
       ],
       "cue": {
        "p": {
         "1": 1.5,
         "2": 1.5,
         "3": 1.5
        }
       },
       "say": "Here are some things that are also true. Say them to yourself. One moment is not my whole story. I can be a good friend to me. I matter, even today."
      },
      {
       "k": "points",
       "h": "One small reach",
       "items": [
        [
         "Text one person",
         "Hey, want to hang out?"
        ],
        [
         "Sit by someone new",
         "At lunch, on the bus, in a club"
        ],
        [
         "Do a thing you love",
         "Friends often find you there"
        ]
       ],
       "say": "When you are ready, try one small reach. Text one person. Hey, want to hang out? Sit by someone new at lunch or on the bus. Or do a thing you love, like a club, a team, or art. Good friends often find you there."
      },
      {
       "k": "big",
       "h": "If it keeps happening, tell a grown-up.",
       "sub": "Asking for backup is smart, not tattling.",
       "say": "If being left out keeps happening, or it turns into teasing or meanness, tell a grown-up you trust, like a parent, a teacher, or your school counselor. That is not tattling. It is asking for backup."
      },
      {
       "k": "big",
       "h": "You belong, even on the days it stings.",
       "say": "You belong, even on the days it stings. Be gentle with yourself today."
      }
     ]
    },
    {
     "id": "as-r-online",
     "n": 8,
     "title": "When Something Online Upsets You",
     "mins": 3,
     "blurb": "Put the phone down, get steady, and know what to do next.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When Something Online Upsets You",
       "sub": "Phone down. Breathe first.",
       "say": "Maybe you saw something scary or cruel online. Maybe a message made your stomach drop. Put the phone face down for a minute. Let us take a breath together first."
      },
      {
       "k": "breathe",
       "h": "Breathe with the circle",
       "hold": 20,
       "say": "Follow the circle. In for four. And out for six. You do not have to answer anything right now."
      },
      {
       "k": "points",
       "h": "Come back to the room",
       "items": [
        [
         "Feet on the floor",
         "Press down"
        ],
        [
         "Hands on something solid",
         "A desk, your knees"
        ],
        [
         "Name three things you see",
         "Out loud, if you can"
        ]
       ],
       "cue": {
        "w": {
         "4": 10
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Now come back to the room you are in. Press your feet into the floor. Put your hands on something solid. Name three things you can see, out loud if you can. Take your time."
      },
      {
       "k": "points",
       "h": "What helps next",
       "items": [
        [
         "Close the app",
         "For now"
        ],
        [
         "Do not reply or forward",
         "Especially anything cruel"
        ],
        [
         "Mute, block, or leave",
         "You can always leave a chat"
        ]
       ],
       "say": "Here is what helps next. Close the app for now. Do not reply, and do not forward anything cruel. You can mute, block, or leave. You can always leave a chat that makes you feel bad."
      },
      {
       "k": "big",
       "h": "Pictures or threats? Tell a grown-up today.",
       "sub": "You are not in trouble. Do not pay or send anything.",
       "say": "If anyone asks you for pictures, threatens you, or says they will share a picture of you, real or fake, tell a trusted grown-up today. Stop replying, and do not pay or send anything. Save the messages. You are not in trouble. The person threatening you is the one to blame, every time."
      },
      {
       "k": "big",
       "h": "Help is here",
       "sub": "Need help now? in Aspen. Not wanting to be alive: 988. Danger now: 911.",
       "say": "The Need help now button at the top of your tree in Aspen has people you can reach, including help getting pictures taken down. If it ever feels so heavy you do not want to be alive, call or text nine eight eight, any time. If you are in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Telling is the brave, smart move.",
       "sub": "You are not alone in this.",
       "say": "You are not alone in this. Telling a grown-up is the bravest, smartest move. Come back here whenever you need to."
      }
     ]
    },
    {
     "id": "as-r-racing",
     "n": 9,
     "title": "When Your Heart Is Racing",
     "mins": 3,
     "blurb": "Your body has an alarm, and you can help it settle.",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When Your Heart Is Racing",
       "sub": "It feels big. It settles.",
       "say": "If your heart is pounding, your hands feel shaky, or your breath is fast, this is for you. Stay with me."
      },
      {
       "k": "big",
       "h": "A racing heart is your body's alarm.",
       "sub": "You can help it settle.",
       "say": "A racing heart is your body's alarm going off. Maybe you got scared, or nervous, or just had a big surprise. It feels big, and it settles. You can help it settle faster."
      },
      {
       "k": "words",
       "h": "Say it to yourself",
       "items": [
        "This is my alarm.",
        "It will pass.",
        "I can slow it down."
       ],
       "cue": {
        "p": {
         "1": 1,
         "2": 1,
         "3": 1.5
        }
       },
       "say": "Say this to yourself, slowly. This is my alarm. It will pass. I can slow it down."
      },
      {
       "k": "points",
       "h": "Press and let go",
       "items": [
        [
         "Press your palms together",
         "Hard, for five"
        ],
        [
         "Let go",
         "Hands soft in your lap"
        ],
        [
         "Long breath out",
         "Like cooling hot cocoa"
        ]
       ],
       "cue": {
        "p": {
         "1": 3
        },
        "w": {
         "4": 12
        },
        "at": [
         0,
         2,
         3
        ]
       },
       "say": "Now press your palms together in front of you, hard. Hold it, two, three, four, five. Let go, and rest your hands in your lap. Now breathe out slowly, like you are cooling a cup of hot cocoa. Do that two more times."
      },
      {
       "k": "breathe",
       "h": "Longer out than in",
       "hold": 30,
       "say": "Now follow the circle. In for four. And out for six. A long breath out tells your body it is safe to slow down."
      },
      {
       "k": "big",
       "h": "If it keeps happening, tell a grown-up.",
       "sub": "Chest pain, or can't catch your breath? Get a grown-up and call 911.",
       "say": "If your heart races a lot, or out of nowhere, tell a parent or another grown-up you trust, so they can help you check it out. And if you have chest pain, or you cannot catch your breath, get a grown-up right away, and call nine one one."
      },
      {
       "k": "big",
       "h": "Your body knows how to settle.",
       "say": "Your body knows how to settle. You just helped it. Come back here whenever you need to."
      }
     ]
    },
    {
     "id": "as-r-tell",
     "n": 10,
     "title": "When You Need to Tell Someone",
     "mins": 4,
     "blurb": "Who to tell, what to say, and why you are not in trouble.",
     "crisis": [
      "988: call or text, any time",
      "Text HOME to 741741",
      "911: danger right now"
     ],
     "music": "safety",
     "scenes": [
      {
       "k": "title",
       "hero": "aspen",
       "eyebrow": "Support for Right Now",
       "h": "When You Need to Tell Someone",
       "sub": "Telling is brave.",
       "say": "Maybe something is wrong, and you have been holding it in. Maybe someone is hurting you, or a friend told you something scary. This is for you."
      },
      {
       "k": "big",
       "h": "Some things are too big to carry alone.",
       "sub": "Grown-ups are there to help carry them.",
       "say": "Some things are too big for a kid to carry alone. That is not weakness. It is just true. Helping carry big things is a grown-up's job."
      },
      {
       "k": "points",
       "h": "Tell a grown-up when",
       "items": [
        [
         "Someone is hurting you",
         "At home, at school, or online"
        ],
        [
         "A friend is in danger",
         "Or says they want to hurt themselves"
        ],
        [
         "Something feels wrong",
         "Even if you can't explain it"
        ]
       ],
       "say": "Tell a trusted grown-up if someone is hurting you, at home, at school, or online. Tell if a friend is being hurt, or if a friend says they want to hurt themselves or die. Tell even if they asked you to keep it a secret. And tell if something just feels wrong, even if you cannot explain it yet."
      },
      {
       "k": "big",
       "h": "A secret about safety is one to tell.",
       "sub": "You are not in trouble for telling.",
       "say": "A secret about someone's safety is a secret to tell. Your friend might be upset at first. Telling is still how you help them. And you are not in trouble for telling."
      },
      {
       "k": "points",
       "h": "Who you can tell",
       "items": [
        [
         "A parent or grandparent",
         "Or another family grown-up"
        ],
        [
         "A teacher or coach",
         "Someone at school you trust"
        ],
        [
         "Your school counselor",
         "Helping is their job"
        ]
       ],
       "say": "Who can you tell? A parent, a grandparent, or another grown-up in your family. A teacher or a coach you trust. Or your school counselor. Helping kids with hard things is their job."
      },
      {
       "k": "points",
       "h": "Practice telling",
       "items": [
        [
         "Picture a safe grown-up",
         "See their face"
        ],
        [
         "Say it out loud",
         "I need to tell you something."
        ],
        [
         "Then say what happened",
         "Short and plain is fine"
        ]
       ],
       "cue": {
        "w": {
         "6": 12
        },
        "at": [
         2,
         3,
         5
        ]
       },
       "say": "Let us practice. Close your eyes, or rest them on one spot. Picture one grown-up you trust, and see their face. Now say this out loud, as if they are right here. I need to tell you something. Then say what happened, short and plain. Take your time."
      },
      {
       "k": "points",
       "h": "If the first grown-up doesn't help",
       "items": [
        [
         "Tell another one",
         "Keep telling until someone helps"
        ],
        [
         "Write it down",
         "If saying it is too hard"
        ],
        [
         "Tap Need help now?",
         "At the top of your tree in Aspen"
        ]
       ],
       "say": "If the first grown-up does not help, tell another one. Keep telling until someone does. If saying it out loud is too hard, write it down and hand it to them. And the Need help now button at the top of your tree in Aspen has people you can call or text, all day and night."
      },
      {
       "k": "big",
       "h": "Help right now",
       "sub": "988: call or text, any time. Text HOME to 741741. Danger right now: 911.",
       "say": "If you or a friend ever have thoughts of not wanting to be alive, call or text nine eight eight, any time. You can also text HOME to seven four one seven four one. And if anyone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Telling is brave. You deserve to be safe.",
       "say": "Telling is brave. You are not in trouble, and you are not alone. You deserve to be safe."
      }
     ]
    }
   ]
  }
 ]
},
  oak: {
    title: 'Learn Oak',
    intro: 'Short videos, narrated aloud. Watch them in any order, as often as you like.',
    supportFirst: true,
    support: { eyebrow: 'Support', title: 'Support for Right Now', intro: 'Short videos to use in the middle of a hard moment. Open one anytime, as often as you need. Nothing to finish.' },
    lessonsTitle: 'Learn Step by Step',
    tracks: [
      { id: 'oak-start', title: 'Start Here', who: 'For adults tending their own tree', lessons: [
        { id: 'ok-welcome', n: 1, title: 'Welcome to Oak', mins: 2, scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Oak', h: 'Welcome to Oak', sub: 'Shelter for others. Strength for you.', say: 'Welcome to Oak. Oak is a check-in for the whole person, from root to fruit.' },
          { k: 'parts', say: 'You are made of six parts. Roots, what grounds you. Trunk, your purpose. Bark, your mind and feelings. Branches, your relationships. Leaves, your body. And Fruit, your hope.' },
          { k: 'big', h: 'Being whole means noticing and tending all six.', sub: 'Strength in one part can carry another for a while.', say: 'Being whole means noticing and tending all six. Strength in one part can carry another for a while, and the part that needs care deserves your attention too.' },
          { k: 'levels', say: 'Each part shows a level after a check-in. Strong, Steady, or Growing Edge. A Growing Edge is a part to tend, not a grade.' },
          { k: 'flow', h: 'How Oak works', steps: [['Check in', 'Eight questions for each part'], ['See your levels', 'Part by part'], ['Make a growth plan', 'Practices for your Growing Edge'], ['Tend today', 'Small steps, every day']], say: 'Here is how Oak works. Check in. See your levels, part by part. Make a growth plan with practices for your Growing Edge. Then tend a little, every day, in the Today tab.' },
          { k: 'points', h: 'Always here', items: [['When Life Changes', "Guides for more than 50 of life's hardest seasons"], ['Private by design', 'No account. Answers stay on this device.'], ['Need to talk now?', 'Call or text 988, any time.']], say: "When Life Changes has guides for more than fifty of life's hardest seasons. Everything stays private on this device. And if you ever need to talk right now, call or text nine eight eight, any time." },
          { k: 'quiz', q: 'Where does your daily tending happen?', opts: ['Only at your yearly check-in', 'In the Today tab, a little each day', 'Only with a chaplain'], right: 1, why: 'Oak is built for small steps every day, in the Today tab.', say: 'Quick question. Where does your daily tending happen?' }
        ] }
      ] },
      { id: 'oak-using', title: 'Using Oak', who: 'Every part of the app, step by step', certTitle: 'Oak: Using Oak', lessons: [

        { id: 'ok-u-checkin', n: 1, title: 'Your First Check-in', mins: 4, blurb: 'How the check-in works, and how to take it well.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 1', h: 'Your First Check-in', sub: 'An honest look at all six parts.', say: 'Everything in Oak starts with a check-in. This lesson walks you through your first one, so you know what to expect.' },
          { k: 'card', title: 'Your Private Profile', body: 'Your tree, practices, and check-ins stay on this device, locked with a passcode only you know.', fields: [['Your name', 'Sam'], ['Passcode', '••••••']], btns: ['Create My Profile', 'Not Now'], tap: 0, say: 'First, Oak asks you to make a private profile. Your tree, your practices, and your check-ins stay on this device, locked with a passcode only you know. Nothing is sent anywhere.' },
          { k: 'flow', h: 'Two kinds of check-in', steps: [['Full Check-in', 'Eight questions for each part'], ['Quick Check-in', 'One question for each part']], say: 'There are two kinds of check-in. The Full Check-in asks eight questions for each part, forty eight in all, and takes about fifteen minutes. The Quick Check-in asks one question for each part, for a fast look on a busy day.' },
          { k: 'screen', app: 'oak', app_name: 'Oak', title: 'Check-in: Roots', rows: [['I have something that grounds me when life is hard.', ''], ['Often', ''], ['Sometimes', ''], ['Rarely', ''], ['Not sure', '']], tap: 2, say: 'Each question has a few answers, plus Not sure. Answer with what is true lately, not what you wish were true. And Not sure is always an honest answer.' },
          { k: 'points', h: 'Some questions are turned around', items: [['Most ask about what is going well', 'Yes counts up'], ['A few ask about what is hard', 'Yes counts down'], ['Answer each one plainly', 'Oak does the math']], say: 'A few questions are turned around on purpose. Most ask about what is going well. A few ask about what is hard. Just answer each one plainly. Oak does the math.' },
          { k: 'points', h: 'A few gentle safety questions', items: [['Asked with care', 'Near the end of the check-in'], ['Never part of a score', 'They are only there to help'], ['Help is right there', '988 and 911, any time']], say: 'Near the end, Oak asks a few gentle safety questions, like whether you have felt hopeless. They are never part of a score. They are there so that if you need help, it is right there for you, with nine eight eight and nine one one.' },
          { k: 'points', h: 'To take it well', items: [['Find a quiet moment', 'Fifteen minutes, if you can'], ['Go with your first honest answer', 'No need to overthink'], ['Take a break anytime', 'Oak keeps your place']], say: 'A few tips. Find a quiet moment. Go with your first honest answer. And take a break whenever you need one. Oak keeps your place.' },
          { k: 'quiz', q: 'What does Not sure mean in a check-in?', opts: ['You did it wrong', 'An honest answer that is always okay', 'Your score goes down'], right: 1, why: 'Not sure is an honest answer, and it never counts against you.', say: 'Quick question. What does Not sure mean in a check-in?' }
        ] },

        { id: 'ok-u-levels', n: 2, title: 'Reading Your Levels', mins: 4, blurb: 'Strong, Steady, and Growing Edge, and what to do with them.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 2', h: 'Reading Your Levels', sub: 'A picture of right now, not a grade.', say: 'After a check-in, each part of your tree gets a level. This lesson is about reading them well.' },
          { k: 'levels', say: 'There are three levels. Strong, from eight to ten. Steady, from five to seven. And Growing Edge, from one to four.' },
          { k: 'big', h: 'A Growing Edge is where your next growth begins.', sub: 'It is a part to tend, not a grade.', say: 'A Growing Edge is not a failing grade. It is where your next growth begins. It is a part to tend, and Oak will help you tend it.' },
          { k: 'screen', app: 'oak', app_name: 'Oak', title: 'Your Results', rows: [['Roots', 'Strong, 8 of 10', '#5F7D48'], ['Trunk', 'Steady, 6 of 10', '#8B5E1A'], ['Bark', 'Growing Edge, 4 of 10', '#B8612F'], ['Branches', 'Steady, 7 of 10', '#8B5E1A'], ['Leaves', 'Steady, 5 of 10', '#8B5E1A'], ['Fruit', 'Strong, 9 of 10', '#5F7D48']], tap: 2, say: 'Your results show each part, with its level and its score. Oak also names your biggest growing edge right now. That is a good place to start.' },
          { k: 'points', h: 'Read it with kindness', items: [['Look for patterns', 'Which parts lean on each other?'], ['Notice your strengths', 'They can carry you while you grow'], ['Pick one part to start', 'Not all six at once']], say: 'Read your results with kindness. Look for patterns. When one part is hurting, another often feels it too. Notice your strengths. A strong part can carry you while another one grows. And pick one part to start with, not all six at once.' },
          { k: 'points', h: 'Rings and changes', items: [['Each full check-in adds a ring', 'Your tree grows with you'], ['Grew, Dipped, or Same', 'Compared with your last check-in'], ['Like with like', 'Full with full, quick with quick']], say: 'Over time, every full check-in adds a growth ring to your tree. Oak shows whether each part grew, dipped, or stayed the same since last time, and it only compares a full check-in with a full one, and a quick one with a quick one.' },
          { k: 'big', h: 'Every score is a starting point.', say: 'Remember, every score is a starting point. It tells you where you are, so you can choose where to grow.' },
          { k: 'quiz', q: 'What is a Growing Edge?', opts: ['A failing grade', 'A part to tend, where your next growth begins', 'A part you should ignore'], right: 1, why: 'A Growing Edge is a part to tend, not a grade.', say: 'Quick question. What is a Growing Edge?' }
        ] },

        { id: 'ok-u-plan', n: 3, title: 'Building Your Growth Plan', mins: 4, blurb: 'Choosing practices that fit your life.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 3', h: 'Building Your Growth Plan', sub: 'Small practices for each part.', say: 'Your growth plan is a short list of practices for each part of your tree. This lesson shows you how to build one that fits your life.' },
          { k: 'points', h: 'Suggestions, never limits', items: [['Strong: about 3', 'To keep it strong', '#5F7D48'], ['Steady: about 4', 'To help it grow', '#8B5E1A'], ['Growing Edge: about 5', 'More ways to tend it', '#B8612F']], say: 'Oak suggests a few practices for each part, based on its level. About three for a strong part, four for a steady one, and five for a growing edge. These are suggestions, never limits. Choose as many or as few as you like.' },
          { k: 'screen', app: 'oak', app_name: 'Oak', title: 'Growth Plan: Bark', rows: [['Slow Exhale', 'Chosen', '#5F7D48'], ['Name It', 'Chosen', '#5F7D48'], ['Worry Window', ''], ['Leaves on a Stream', ''], ['How to do this', '']], tap: 2, say: 'Tap any practice to choose it. Tap How to do this to see why it helps, the steps, and what to try if it is hard.' },
          { k: 'card', title: 'Find more practices', body: 'Browse by part, or search: sleep, calm, friends, prayer.', fields: [['Search', 'sleep']], btns: ['Add to my practices', 'Show me how'], tap: 0, say: 'At the bottom of Today, Find more practices opens the whole Grow With Grounded library. Browse by part, or search for a word like sleep, calm, or friends. Then add what fits.' },
          { k: 'points', h: 'Practices born from stories', items: [['From the Bedside', 'Practices that grew out of real visits'], ['Linked to their story', 'Watch the lesson or read the story'], ['In the library', 'Ready to add to your plan']], say: 'Some practices are marked From the Bedside. They grew out of real stories from Chris’s work as a chaplain, like Lion’s Breath and One Woodpecker. Each one links to its story.' },
          { k: 'points', h: 'Make it yours', items: [['Write your own', 'Anything that tends a part counts'], ['Start small', 'Two minutes beats zero'], ['Change it anytime', 'Your plan grows with you']], say: 'Make it yours. Write your own practices. Anything that tends a part counts, like calling your sister or taking the long way home. Start small. Two minutes beats zero. And change your plan anytime.' },
          { k: 'quiz', q: 'How many practices should you choose for a part?', opts: ['Exactly the number Oak suggests', 'As many or as few as fit your life', 'Only one'], right: 1, why: 'Oak’s numbers are suggestions, never limits.', say: 'Quick question. How many practices should you choose for a part?' }
        ] },

        { id: 'ok-u-rhythm', n: 4, title: 'Today, Week, and Season', mins: 4, blurb: 'The rhythm that helps your tree grow.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 4', h: 'Today, Week, and Season', sub: 'A little each day adds up.', say: 'Oak has a gentle rhythm. A little each day, a short look each week, and a full check-in each season. Here is how it fits together.' },
          { k: 'tabs', app: 'oak', app_name: 'Oak', tabs: ['Today', 'Week', 'Season', 'Growth Plan', 'When Life Changes', 'Learn'], tap: 0, note: { h: 'Today', p: 'Your practices for today. Check off one, and your tree is watered.' }, say: 'Start with Today. Your practices for today are here. Check off any one, and your tree is watered for the day.' },
          { k: 'points', h: 'On a hard day', items: [['Easier today', 'Swap in a smaller version'], ['Add a note', 'One line about how it went'], ['One is enough', 'Any practice waters your tree']], say: 'On a hard day, tap Easier today for a smaller version of a practice. Add a note if you like, just one line. And remember, one practice is enough to water your tree.' },
          { k: 'tabs', app: 'oak', app_name: 'Oak', tabs: ['Today', 'Week', 'Season', 'Growth Plan', 'When Life Changes', 'Learn'], tap: 1, note: { h: 'Week', p: 'A theme, a short check-in, and a question to sit with.' }, say: 'Each week brings a theme, a short check-in, and a question to sit with. The weekly check-in asks one question for each part, plus how you are moving, resting, and eating.' },
          { k: 'tabs', app: 'oak', app_name: 'Oak', tabs: ['Today', 'Week', 'Season', 'Growth Plan', 'When Life Changes', 'Learn'], tap: 2, note: { h: 'Season', p: 'Twelve weeks. It begins and ends with a full check-in, and each one adds a ring.' }, say: 'A season is twelve weeks. It begins with a full check-in, and the next full check-in closes it and adds a ring to your tree. The Season tab also has your Days Tended calendar.' },
          { k: 'big', h: 'No streaks to break. Growth only adds.', sub: 'Missed a few days? Pick up today.', say: 'There are no streaks to break in Oak. Growth only adds. If you miss a few days, just pick up today. Your tree is still yours.' },
          { k: 'quiz', q: 'What waters your tree for the day?', opts: ['Checking off any one practice', 'Finishing every practice', 'A full check-in'], right: 0, why: 'Any one practice waters your tree. One is enough.', say: 'Quick question. What waters your tree for the day?' }
        ] },

        { id: 'ok-u-wlc', n: 5, title: 'When Life Changes', mins: 4, blurb: 'Guides for life’s hardest seasons, for you and for helpers.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 5', h: 'When Life Changes', sub: 'How to show up.', say: 'When life changes all at once, you need words and steps you can use right now. That is what When Life Changes is for.' },
          { k: 'points', h: 'More than 60 guides', items: [['Inside Me', 'Anxiety, sadness, burnout, shame'], ['Loss and Grief', 'Every kind of goodbye'], ['Health and the End of Life', 'Diagnosis, caregiving, dying'], ['Relationships and Family', 'Marriage, divorce, aging parents'], ['Work, Money, Faith, and Community', 'And more']], say: 'There are more than sixty guides, in groups. Inside Me. Loss and Grief. Health and the End of Life. Relationships and Family. And Work, Money, Faith, and Community.' },
          { k: 'flow', h: 'Two sides to every guide', steps: [['For you', 'When you are going through it'], ['For the helper', 'When you are walking with someone']], say: 'Every guide has two sides. One for you, when you are the one going through it. And one for the helper, when you are walking with someone else.' },
          { k: 'points', h: 'Inside a guide', items: [['A Quick Card', 'The first things to know'], ['What to say, and what to skip', 'Words that help'], ['Faith and meaning', 'For all faith traditions and everything in-between'], ['Practices and where to get help', 'Real next steps']], say: 'Inside a guide, start with the Quick Card, the first things to know. Then words to say and words to skip. Faith and meaning, for all faith traditions and everything in-between. And practices, plus where to get help.' },
          { k: 'card', title: 'Search', body: 'Type what is happening in your own words.', fields: [['Search', 'my dad has dementia']], btns: ['Search'], tap: 0, result: 'Caring for someone with dementia', say: 'Search in your own words, like my dad has dementia, and Oak finds the right guide.' },
          { k: 'big', h: 'Videos for every guide are on the way.', say: 'Videos for every guide are on the way, one for you, and one for the helper. Until then, every guide can be read aloud.' },
          { k: 'quiz', q: 'Every When Life Changes guide has two sides. What are they?', opts: ['Easy and hard', 'For you, and for the helper', 'Short and long'], right: 1, why: 'Each guide speaks to the person going through it and the person walking with them.', say: 'Quick question. Every guide has two sides. What are they?' }
        ] },

        { id: 'ok-u-home', n: 6, title: 'Your Household and Your Backup', mins: 4, blurb: 'Profiles for everyone, one backup file, and The Grove.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Using Oak, Lesson 6', h: 'Your Household and Your Backup', sub: 'Everyone gets their own tree.', say: 'Oak works for a whole household on one device. This last lesson shows how, and how to keep everything safe.' },
          { k: 'card', title: 'Who’s tending today?', body: 'Each adult has their own private profile and passcode.', fields: [['', 'Sam'], ['', 'Jordan']], btns: ['Add a Person', 'Switch Person'], tap: 0, say: 'When Oak opens, it asks who is tending today. Each adult has their own private profile and passcode, so nobody sees anyone else’s answers. High schoolers tend in Oak too, until Pine is ready.' },
          { k: 'points', h: 'One file for everything', items: [['Back up everything', 'Every profile, still locked'], ['Keep the file somewhere safe', 'Email it to yourself, or save it to a drive'], ['Load a backup', 'On a new phone, or after a reset']], say: 'Back up everything saves one file with every profile on this device, each one still locked, plus The Grove and your settings. Keep that file somewhere safe. On a new phone, tap Load a backup, and everything comes back.' },
          { k: 'points', h: 'The Grove', items: [['Your tree is yours', 'Answers always stay private'], ['The grove is ours', 'Your family’s trees, side by side'], ['You choose', 'Show my growth on The Grove, on or off']], say: 'If your family uses The Grove, your tree can stand there beside theirs. Only your growth shows, never your answers. And it is your choice, with a switch in settings.' },
          { k: 'points', h: 'Make it easy to come back', items: [['Daily Reminder', 'Pick a time that fits your day'], ['Movement Level', 'Gentle, Moderate, or Athletic'], ['Reading and Display', 'Voice, speed, and text size']], say: 'Finally, settings help Oak fit you. Set a daily reminder. Choose your movement level, so practices fit your body. And set your voice and text size under Reading and Display.' },
          { k: 'big', h: 'You know Oak now. Go tend your tree.', say: 'That is the whole tour. You know Oak now. Go tend your tree, a little at a time.' },
          { k: 'quiz', q: 'What does Back up everything save?', opts: ['Only your answers, unlocked', 'One file with every profile, still locked', 'Nothing, it sends your data online'], right: 1, why: 'One file holds every profile on the device, each still locked.', say: 'Last question. What does Back up everything save?' }
        ] }
      ] },
      { id: 'oak-six', title: 'The Six Parts', who: 'One lesson for each part of your tree, with a story and a practice', certTitle: 'Oak: The Six Parts', lessons: [

        { id: 'ok-6-roots', n: 1, title: 'Roots: What Grounds You', mins: 6, blurb: 'What holds you up when life gets heavy.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 1', h: 'Roots', sub: 'What grounds you.', say: 'This lesson is about Roots, the part of you that holds you up when life gets heavy.' },
          { k: 'big', h: 'Roots are what you lean on when the wind blows.', sub: 'You can’t always see them. You always need them.', say: 'Every tree stands on its roots. You cannot always see them, and you always need them. Your roots are what you lean on when the wind blows.' },
          { k: 'points', h: 'Roots can look like', items: [['Faith and prayer', 'God, the Sacred, the Divine, the Holy'], ['Nature and wonder', 'The sky, the woods, the water'], ['Traditions', 'The ways your people mark life'], ['Quiet and meaning', 'A sense of something bigger than you']], say: 'For many people, roots are faith and prayer, and God, by whatever name they use. For others, roots are nature and wonder. Traditions, the ways your people mark birth, marriage, and death. Or quiet, and a sense of something bigger than you. Oak is made for all faith traditions and everything in-between.' },
          { k: 'big', h: 'What grounds you can help you cope.', sub: 'Feeling abandoned, judged, or far from the sacred can weigh heavily too.', say: 'Research on spirituality and health often finds that what grounds people helps them cope with hard seasons. And the opposite is real too. Feeling abandoned, judged, or far from the sacred can weigh heavily.' },
          { k: 'points', h: 'How Roots can look', items: [['Strong', 'You know what holds you up, and you reach for it', '#5F7D48'], ['Steady', 'It is there, though you reach for it less lately', '#8B5E1A'], ['Growing Edge', 'You feel unmoored, or faith feels heavy right now', '#B8612F']], say: 'Strong roots might mean you know what holds you up, and you reach for it. Steady might mean it is there, though you reach for it less lately. And a Growing Edge might mean you feel unmoored, or faith feels heavy right now. That is a real and honest place to be.' },
          { k: 'story', title: 'A Presence That Cannot Be Boxed', lines: ['The nurse warned me: not religious. The family sat with their arms crossed, ready to get through my visit politely.', 'Then the wife leaned forward. We are not religious, she said. But we are deeply spiritual. We believe in a presence that cannot be boxed or labeled or fully described.', 'We kept what felt true from each tradition and let the rest go. It is not neat or tidy. But it is ours.'], lesson: 'Roots don’t have to fit a box to hold you up.', note: 'From a Grounded story by Chris Joy', say: 'On one visit, the nurse warned me, not religious. The family sat with their arms crossed. Then the wife leaned forward and said, we are not religious, but we are deeply spiritual. We believe in a presence that cannot be boxed, or labeled, or fully described. We kept what felt true from each tradition, and let the rest go. It is not neat or tidy. But it is ours. I told her she had just explained God better than most sermons I had ever heard. And the whole room laughed.' },
          { k: 'big', h: 'Oak never asks what you believe.', sub: 'It asks whether your roots are holding you up.', say: 'That is why Oak never asks what you believe. It asks whether your roots are holding you up, or weighing you down. Your roots are yours.' },
          { k: 'points', h: 'Practice: A Presence Check', items: [['Settle', 'Feet down, one slow breath'], ['What holds me up today?', 'A person, a prayer, a place, a word'], ['Where did I feel something bigger than me this week?', 'Even for a moment'], ['Name it', 'With a word, a prayer, or a thank-you']], cue: { w: { 1: 5, 2: 15, 3: 15, 4: 10 }, at: [1, 2, 3, 4] }, say: 'Let us practice. This one is called a Presence Check. Settle in, with your feet down, and take one slow breath. Now ask yourself, what holds me up today? Maybe a person, a prayer, a place, or a word. Next, where did I feel something bigger than me this week? Even for a moment. Last, name it. With a word, a prayer, or a simple thank you.' },
          { k: 'big', h: 'Tend your roots, and they will hold you.', sub: 'Presence Check is in the Practice Library, ready for your growth plan.', say: 'Tend your roots, and they will hold you. You will find the Presence Check in the Practice Library, ready to add to your growth plan.' },
          { k: 'quiz', q: 'What does Oak look at in Roots?', opts: ['Which religion you belong to', 'Whether what grounds you holds you up or weighs you down', 'How often you attend services'], right: 1, why: 'Roots are about what holds you up, never about what you believe.', say: 'Quick question. What does Oak look at in Roots?' }
        ] },

        { id: 'ok-6-trunk', n: 2, title: 'Trunk: Purpose', mins: 6, blurb: 'What you live for, and what you give.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 2', h: 'Trunk', sub: 'Purpose.', say: 'This lesson is about your Trunk, your purpose. What you live for, and what you give.' },
          { k: 'big', h: 'The trunk carries everything up to the branches.', say: 'A tree’s trunk carries everything from the roots up to the branches. Purpose works the same way. It carries your days. It gives your effort somewhere to go.' },
          { k: 'points', h: 'Purpose can look like', items: [['Work you care about', 'Paid or not'], ['People who count on you', 'Family, friends, neighbors'], ['Something you are building', 'A skill, a garden, a business'], ['Your gifts', 'The way you show up for others']], say: 'Purpose can look like work you care about, paid or not. People who count on you. Something you are building or learning. And your gifts, the way you show up for others.' },
          { k: 'big', h: 'A sense of purpose helps people through hard seasons.', sub: 'And purpose can change shape and still be real.', say: 'Research finds that people with a sense of purpose tend to handle stress and hard seasons better. And here is the hopeful part. Purpose can change shape, and still be real.' },
          { k: 'points', h: 'How Trunk can look', items: [['Strong', 'You know what you are here for, and it fills you', '#5F7D48'], ['Steady', 'You have purpose, though some days feel flat', '#8B5E1A'], ['Growing Edge', 'You feel lost, or a role you loved has ended', '#B8612F']], say: 'A strong trunk might mean you know what you are here for, and it fills you. Steady might mean you have purpose, though some days feel flat. And a Growing Edge might mean you feel lost, or a role you loved has ended. That is often where the most growth begins.' },
          { k: 'story', title: 'Finding a New Purpose', lines: ['Sophia was twenty-eight, studying to be a physical trainer, when a rare bone disease changed everything. Everything I worked for is disappearing, she said.', 'I asked her: Even if your body changes, what part of you, the real you, can still strengthen others?', 'I can’t train people to run marathons anymore, she told me later. But maybe I can help them run their own race.'], lesson: 'Roles can change. Your gifts come with you.', note: 'From a Grounded reflection by Chris Joy', say: 'Let me tell you about Sophia. She was twenty eight, building a life as a physical trainer, when a rare bone disease changed everything. She told me she was scared she would become someone people had to take care of, instead of someone who lifts others up. I did not rush in with answers. I stayed and listened. Then, gently, I asked, even if your body changes, what part of you, the real you, can still strengthen others? Sophia had always been an encourager. That gift had not gone anywhere. One day she said, I cannot train people to run marathons anymore. But maybe I can help them run their own race.' },
          { k: 'big', h: 'Roles can change. Your gifts come with you.', say: 'Roles change. Jobs end. Kids grow up. Bodies change. But your gifts come with you, and they can find a new shape.' },
          { k: 'points', h: 'Practice: The Real You', items: [['Name three gifts', 'Not job titles. Encouraging, fixing, noticing, making people laugh.'], ['Find who needs one', 'A person, a group, a cause'], ['Choose one way this week', 'Small is fine']], cue: { w: { 1: 20, 2: 15, 3: 12 }, at: [1, 2, 3] }, say: 'Let us practice. This one is called The Real You. First, name three of your gifts. Not job titles. Things like encouraging, fixing, noticing, or making people laugh. Now, who could use one of those gifts? A person, a group, or a cause. Last, choose one way to use it this week. Small is fine.' },
          { k: 'big', h: 'Purpose grows when you use it.', sub: 'The Real You is in the Practice Library.', say: 'Purpose grows when you use it, a little at a time. You will find The Real You in the Practice Library.' },
          { k: 'quiz', q: 'What does Sophia’s story show about purpose?', opts: ['When a role ends, purpose is gone', 'Your gifts can find a new shape', 'Only paid work counts'], right: 1, why: 'Roles change, and your gifts come with you.', say: 'Quick question. What does Sophia’s story show about purpose?' }
        ] },

        { id: 'ok-6-bark', n: 3, title: 'Bark: Mind and Feelings', mins: 6, blurb: 'Bending without breaking.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 3', h: 'Bark', sub: 'Mind and feelings.', say: 'This lesson is about Bark, your mind and your feelings.' },
          { k: 'big', h: 'Bark protects the tree, and it flexes as the tree grows.', say: 'Bark protects a tree from storms and sun, and it has to flex as the tree grows. Your mind and feelings work the same way. Healthy bark bends without breaking.' },
          { k: 'points', h: 'Healthy bark can look like', items: [['Thoughts that settle', 'Worry comes, and it also goes'], ['Feelings you can name', 'Sad, scared, angry, tired, glad'], ['Bouncing back', 'Hard days don’t take over the week'], ['Asking for help', 'Before it gets too heavy']], say: 'Healthy bark can look like thoughts that settle, so worry comes and also goes. Feelings you can name. Bouncing back, so a hard day does not take over the whole week. And asking for help before it gets too heavy.' },
          { k: 'big', h: 'Putting a feeling into words can turn down the alarm.', sub: 'Name it to tame it.', say: 'Here is something researchers have found. Simply putting a feeling into words can turn down the body’s alarm. Some people call it, name it to tame it.' },
          { k: 'points', h: 'How Bark can look', items: [['Strong', 'You feel your feelings and find your way back', '#5F7D48'], ['Steady', 'Mostly steady, with some heavy stretches', '#8B5E1A'], ['Growing Edge', 'Worry, sadness, or stress is wearing you down', '#B8612F']], say: 'Strong bark might mean you feel your feelings, and find your way back. Steady might mean mostly steady, with some heavy stretches. And a Growing Edge might mean worry, sadness, or stress is wearing you down. That deserves tending, and sometimes more support.' },
          { k: 'story', title: 'Emotional Resilience', lines: ['I sat beside a patient whose sudden turn left the room heavy with uncertainty. For a moment, I felt my own steadiness waver.', 'I placed my hand lightly on the patient’s, breathed slowly, and reminded myself: this moment is sacred, and so is my capacity to stay rooted.', 'Resilience is not the absence of sorrow. It is bending without breaking, letting the waves move through us instead of pulling us under.'], lesson: 'Let the feeling move through you.', note: 'From a Grounded reflection by Chris Joy', say: 'I once sat beside a patient whose sudden turn left the room heavy with uncertainty. For a moment, I felt my own steadiness waver. So I placed my hand lightly on the patient’s hand, and breathed slowly. I did not push the feeling away. I made room for it. Resilience, I realized, is not the absence of sorrow. It is bending without breaking. Letting the waves move through us, instead of pulling us under.' },
          { k: 'points', h: 'Practice: Shake Off the Raindrops', items: [['Name it', 'This is grief. This is fear.'], ['Ground it', 'Feet on the floor, breath moving'], ['Shake it off', 'Shake your hands like raindrops'], ['Find one bright moment', 'A smile, a kindness, a bit of light']], cue: { w: { 1: 8, 3: 10, 5: 10, 7: 12 }, at: [0, 2, 4, 6] }, say: 'Let us practice four steps from that day. Name it. Say softly inside, this is grief, or this is fear. Ground it. Feel your feet on the floor, and your breath moving in and out. Shake it off. Shake your hands gently, as if you are letting go of heavy raindrops. Then find one bright moment from today. A smile, a kindness, a bit of light.' },
          { k: 'big', h: 'Heavy for weeks? You deserve more support.', sub: 'Talk with your doctor or a counselor. Need to talk now? Call or text 988.', say: 'If your feelings stay heavy for weeks, you deserve more support. Talk with your doctor or a counselor. Getting help is a strong thing to do. And if you need to talk right now, call or text nine eight eight.' },
          { k: 'quiz', q: 'What is emotional resilience?', opts: ['Never feeling sad', 'Bending without breaking', 'Keeping your feelings hidden'], right: 1, why: 'Resilience lets feelings move through you without pulling you under.', say: 'Quick question. What is emotional resilience?' }
        ] },

        { id: 'ok-6-branches', n: 4, title: 'Branches: Relationships', mins: 6, blurb: 'Reaching toward people, and repairing what breaks.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 4', h: 'Branches', sub: 'Relationships.', say: 'This lesson is about Branches, your relationships. The people you reach toward.' },
          { k: 'big', h: 'Branches reach out. That is how a tree catches light.', say: 'Branches reach out. That is how a tree catches light. People are the same. We were made to reach toward each other.' },
          { k: 'points', h: 'Branches can look like', items: [['Someone to call', 'When the news is good, or bad'], ['Belonging', 'A family, a team, a congregation, a circle'], ['Giving and receiving', 'Help goes both ways'], ['Repair', 'Making it right when things break']], say: 'Branches can look like someone to call, when the news is good or bad. Belonging, in a family, a team, a congregation, or a circle of friends. Giving and receiving help. And repair, making it right when things break.' },
          { k: 'big', h: 'Close relationships are among the strongest helps for health.', sub: 'And loneliness weighs on body and mind.', say: 'Research keeps finding that close relationships are among the strongest helps for health and long life. And loneliness weighs on both body and mind. Your branches matter.' },
          { k: 'points', h: 'How Branches can look', items: [['Strong', 'You have people, and you reach for them', '#5F7D48'], ['Steady', 'Good people, though some ties feel thin', '#8B5E1A'], ['Growing Edge', 'You feel alone, or a key relationship is hurting', '#B8612F']], say: 'Strong branches might mean you have people, and you reach for them. Steady might mean good people, though some ties feel thin. And a Growing Edge might mean you feel alone, or an important relationship is hurting.' },
          { k: 'story', title: 'The Recovery', lines: ['I broke a dying woman’s saucer. Antique china. She had just shown it to me, the one good thing in her hard day.', 'I dropped to my knees and said how sorry I was. Instead of anger, I got grace. Someone broke a special one on me once, she said. Didn’t even say sorry. At least you did.', 'That night I glued what I could, and found a nearly identical saucer. Not the mistake. The recovery.'], lesson: 'What happens after a break matters most.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/the-recovery', label: 'Read the Full Story: The Recovery' }, say: 'Let me tell you about Gail, who lives in memory care, and keeps her whole life in a china cabinet. One day she showed me a new cup and saucer. I picked it up, and the saucer let go and shattered on the floor. I dropped to my knees and told her how sorry I was. And instead of anger, she gave me grace. Someone broke a special one on me once, she said. Did not even say sorry. At least you did. We ended up laughing together. That night I glued what I could, and found a nearly identical saucer to bring back, with flowers. What stays, I have come to believe, is not the mistake. It is the recovery.' },
          { k: 'big', h: 'Every relationship has breaks.', sub: 'What happens after matters most.', say: 'Every relationship has breaks. Words we wish we could take back. Times we let someone down. What happens after matters most.' },
          { k: 'points', h: 'Practice: Make the Repair', items: [['Own it plainly', 'I did that. I am sorry.'], ['Skip the but', 'No excuses, no explaining it away'], ['Ask what would help', 'What can I do to make this right?'], ['Follow through', 'Then do it']], cue: { w: { 1: 15, 7: 12 }, at: [2, 3, 5, 6] }, say: 'Let us practice. Think of one relationship that could use a repair, big or small. Take a moment. Here are the steps. Own it plainly. I did that, and I am sorry. Skip the but. No excuses, and no explaining it away. Ask, what can I do to make this right? Then follow through. Now picture your first step.' },
          { k: 'big', h: 'Repair takes courage, and it grows trust.', sub: 'Make the Repair is in the Practice Library.', say: 'Repair takes courage, and it grows trust. If a relationship is not safe for you, your safety comes first, and When Life Changes has a guide for that. You will find Make the Repair in the Practice Library.' },
          { k: 'quiz', q: 'In The Recovery, what mattered most?', opts: ['That the saucer never broke', 'What happened after the break', 'Who was to blame'], right: 1, why: 'Not the mistake. The recovery.', say: 'Quick question. In The Recovery, what mattered most?' }
        ] },

        { id: 'ok-6-leaves', n: 5, title: 'Leaves: Body', mins: 6, blurb: 'Move, rest, and nourish.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 5', h: 'Leaves', sub: 'Body.', say: 'This lesson is about Leaves, your body.' },
          { k: 'big', h: 'Leaves turn light into energy for the whole tree.', say: 'Leaves turn sunlight into energy for the whole tree. Your body does something like that for all of you. When your body is cared for, everything else has more to work with.' },
          { k: 'flow', h: 'Three ways to tend Leaves', steps: [['Move', 'In a way that fits your body'], ['Rest', 'Sleep, and small pauses'], ['Nourish', 'Water and real food']], say: 'Oak tends Leaves in three ways. Move, in a way that fits your body. Rest, with sleep and small pauses. And nourish, with water and real food.' },
          { k: 'big', h: 'Body and mind talk to each other all day long.', sub: 'Small amounts of movement, rest, and steady meals can lift mood and energy.', say: 'Your body and mind talk to each other all day long. Research finds that even small amounts of movement, regular rest, and steady meals can lift mood and energy. You do not need a big plan to start.' },
          { k: 'points', h: 'How Leaves can look', items: [['Strong', 'You move, rest, and eat in ways that fuel you', '#5F7D48'], ['Steady', 'Mostly okay, with a weak spot or two', '#8B5E1A'], ['Growing Edge', 'Worn out, running on empty, or hurting', '#B8612F']], say: 'Strong leaves might mean you move, rest, and eat in ways that fuel you. Steady might mean mostly okay, with a weak spot or two. And a Growing Edge might mean you feel worn out, run down, or in pain.' },
          { k: 'story', title: 'A Lion-Sized Reset', lines: ['My alarm didn’t go off, the dog got into the trash, and I walked out the door with two different shoes on.', 'A detour added twenty minutes. By the time I pulled up to my first visit, my head was spinning.', 'So I parked a little early, rolled down the window, and roared. Three times. By the third one, I was laughing at myself, and I was ready.'], lesson: 'Your body can reset your mind.', note: 'From a Grounded reflection by Chris Joy', say: 'One morning went wrong from the start. No alarm, the dog in the trash, two different shoes, and a twenty minute detour. By my first visit, my head was spinning. So I parked, rolled down the window, and did a lion’s breath. A deep breath in, then mouth wide, tongue out, and a long, loud haaa. Three times. My jaw loosened, my shoulders dropped, and I started laughing at myself. My body reset my mind.' },
          { k: 'points', h: 'Practice: A Body Check-in', items: [['Move', 'What would feel good to move right now?'], ['Rest', 'When will I rest today?'], ['Nourish', 'Have I had water and a real meal?']], cue: { w: { 1: 10, 2: 10, 3: 10, 5: 20 }, at: [1, 2, 3] }, say: 'Let us do a quick body check in. Move. What would feel good to move right now? Rest. When will I rest today, even for five minutes? Nourish. Have I had water, and a real meal? Now pick one, and do it right now. Stand and stretch, or go get a glass of water. I will wait.' },
          { k: 'big', h: 'Your body is part of the whole you.', sub: 'Set your Movement Level in settings. Talk with your doctor before big changes.', say: 'Your body is part of the whole you, not separate from it. In settings, choose your movement level, gentle, moderate, or athletic, so practices fit your body. And talk with your doctor before big changes. Lion’s Breath is in the Practice Library too.' },
          { k: 'quiz', q: 'Oak tends Leaves in three ways. What are they?', opts: ['Move, Rest, Nourish', 'Run, Lift, Diet', 'Sleep, Work, Play'], right: 0, why: 'Move, Rest, and Nourish keep your leaves green.', say: 'Quick question. Oak tends Leaves in three ways. What are they?' }
        ] },

        { id: 'ok-6-fruit', n: 6, title: 'Fruit: Hope', mins: 6, blurb: 'What grows when the whole tree is tended.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'The Six Parts, Lesson 6', h: 'Fruit', sub: 'Hope.', say: 'This last lesson is about Fruit, your hope.' },
          { k: 'big', h: 'Fruit takes time. It grows from everything else.', say: 'Fruit takes time. It grows from everything else. Roots, trunk, bark, branches, and leaves all feed it. Hope works the same way.' },
          { k: 'points', h: 'Hope can look like', items: [['Something to look forward to', 'Big or small'], ['Noticing good', 'Even on hard days'], ['A future you can picture', 'And a next step toward it'], ['Believing things can change', 'For you, and for others']], say: 'Hope can look like something to look forward to, big or small. Noticing the good, even on hard days. A future you can picture, and a next step toward it. And believing that things can change.' },
          { k: 'big', h: 'Hope can be grown.', sub: 'It is a goal, a way forward, and the will to keep going.', say: 'Researchers who study hope describe it as three things together. A goal, a way forward, and the will to keep going. And hope can be grown, like anything else you tend.' },
          { k: 'points', h: 'How Fruit can look', items: [['Strong', 'You look ahead with hope, even when it is hard', '#5F7D48'], ['Steady', 'Hope is there, though some days it fades', '#8B5E1A'], ['Growing Edge', 'It is hard to see anything good ahead', '#B8612F']], say: 'Strong fruit might mean you look ahead with hope, even when it is hard. Steady might mean hope is there, though some days it fades. And a Growing Edge might mean it is hard to see anything good ahead right now.' },
          { k: 'story', title: 'A Day of Contrasts', lines: ['At the end of a muddy dirt road, a woman who had lived on her farm for nearly eighty years set out orange juice and a plate of cookies.', 'She pointed out the window. Can you see that right there? A little woodpecker on the tree.', 'That’s the reason I’m here, she said. That’s all I need to be happy. I’m simple. It doesn’t take much.'], lesson: 'Hope often starts with noticing what is already good.', note: 'From a Grounded reflection by Chris Joy', say: 'One visit took me to the end of a muddy dirt road, to a woman who had lived on her farm for almost eighty years and raised nine children there. Over orange juice and cookies, she asked, can you see that right there? I spotted a little woodpecker, on the tree outside. That is the reason I am here, she said. That is all I need to be happy. I am simple. It does not take much. I left with my heart full.' },
          { k: 'points', h: 'Practice: One Woodpecker', items: [['Look around', 'Find one small good thing, right now'], ['Say it', 'Out loud, or write it down'], ['Look ahead', 'Name one small thing to look forward to']], cue: { w: { 1: 15, 2: 10, 3: 12 }, at: [1, 2, 3] }, say: 'Let us practice. This one is called One Woodpecker. Look around and find one small good thing, right now. Say it out loud, or write it down. Then name one small thing to look forward to, today or this week.' },
          { k: 'big', h: 'Losing hope? You don’t have to hold it alone.', sub: 'Call or text 988, any time. In danger right now? Call 911.', say: 'If it is hard to see anything good ahead, you do not have to hold that alone. Call or text nine eight eight, any time. If you are in danger right now, call nine one one.' },
          { k: 'big', h: 'Tend the whole tree, and fruit will come.', sub: 'One Woodpecker is in the Practice Library.', say: 'Tend the whole tree, a little at a time, and fruit will come. One Woodpecker is in the Practice Library. That is all six parts. Well done.' },
          { k: 'quiz', q: 'Where does hope often start?', opts: ['With a big change', 'With noticing one small good thing', 'With having no problems'], right: 1, why: 'Hope often starts with noticing what is already good.', say: 'Last question. Where does hope often start?' }
        ] }
      ] },
      { id: 'oak-shelter', title: 'Shelter for Others', who: 'For parents, partners, friends, and caregivers', certTitle: 'Oak: Shelter for Others', lessons: [

        { id: 'ok-s-present', n: 1, title: 'Being There Is the Gift', mins: 5, blurb: 'Presence matters more than the perfect words.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 1', h: 'Being There Is the Gift', sub: 'Shelter for others. Strength for you.', say: 'This series is for anyone walking with someone through a hard time. A parent, a partner, a friend, a coworker, a caregiver. Let us start with the most important thing.' },
          { k: 'big', h: 'Hospice taught me this: hold space.', sub: 'Being there matters more than the perfect words.', say: 'When I think about hospice and what it means, it often comes down to two words. Hold space. Your being there matters more than finding the perfect words.' },
          { k: 'points', h: 'Holding space looks like', items: [['Showing up', 'In person, by phone, or by text'], ['Listening more than fixing', 'Let them finish'], ['Letting silence be', 'Quiet together is still company'], ['Following their lead', 'Their topic, their pace']], say: 'Holding space looks like showing up, in person, by phone, or even by text. Listening more than fixing. Let them finish. Letting silence be. Quiet together is still company. And following their lead, on their topic, at their pace.' },
          { k: 'story', title: 'You Don’t Have to Know What to Say', lines: ['A husband sat beside his wife in her final hours, his chair so close his knee nearly touched the bed rail.', 'After he told me about their life, he reached over and adjusted her blanket. It had not slipped.', 'He kept holding her hand, like it was the only job left for him to do.'], lesson: 'Small, steady presence says what words can’t.', note: 'From a Grounded story by Chris Joy', say: 'I once visited a woman in her final hours. Her husband sat beside her, his chair so close his knee nearly touched the bed rail. After he told me about their life, he reached over and adjusted her blanket. It had not slipped. He kept holding her hand, like it was the only job left for him to do. Small, steady presence says what words cannot.' },
          { k: 'points', h: 'Small things that say I am here', items: [['A text with no question', 'Thinking of you today. No need to reply.'], ['A specific offer', 'Can I bring dinner Thursday?'], ['Coming back', 'The second week matters as much as the first']], say: 'Small things say, I am here. A text with no question to answer. Thinking of you today, no need to reply. A specific offer, like, can I bring dinner Thursday? And coming back. The second week, and the second month, matter as much as the first day.' },
          { k: 'big', h: 'You are not there to fix it. You are there so they are not alone in it.', say: 'You are not there to fix it. You are there so they are not alone in it.' },
          { k: 'points', h: 'Practice: Sit, Don’t Fix', items: [['Pick one person', 'Someone going through something'], ['Reach out once this week', 'Ask how they are, really'], ['Listen to the end', 'Then say: Thank you for telling me.']], cue: { w: { 1: 12, 3: 6 }, at: [1, 2, 3] }, say: 'Let us practice. Think of one person going through something right now. Take a moment. This week, reach out once, and ask how they are, really. Then listen all the way to the end, without fixing. And say, thank you for telling me.' },
          { k: 'quiz', q: 'What matters most when someone is going through something hard?', opts: ['Finding the perfect words', 'Being there, so they are not alone in it', 'Fixing the problem fast'], right: 1, why: 'Presence is the gift. Words are optional.', say: 'Quick question. What matters most when someone is going through something hard?' }
        ] },

        { id: 'ok-s-listen', n: 2, title: 'Listening Beneath the Words', mins: 5, blurb: 'Hearing what someone means, not just what they say.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 2', h: 'Listening Beneath the Words', sub: 'Hear what they mean.', say: 'People often say one thing, and carry another. This lesson is about listening beneath the words.' },
          { k: 'story', title: 'Emotional Intelligence', lines: ['In a family meeting, a daughter’s words said one thing while her eyes and her tightly folded arms said another.', 'Instead of rushing to fill the space with comfort, I slowed down, met her gaze, and asked softly: What is this moment asking of you right now?', 'The room shifted. Tears came. Real connection followed.'], lesson: 'Our greatest gift is how deeply we are willing to see.', note: 'From a Grounded reflection by Chris Joy', say: 'I walked into a family meeting where a daughter’s words said one thing, while her eyes and her tightly folded arms said another. Instead of rushing to fill the space with comfort, I slowed down, met her gaze, and asked softly, what is this moment asking of you right now? The room shifted. Tears came. Real connection followed.' },
          { k: 'flow', h: 'Four steps', steps: [['Pause', 'One breath before you answer'], ['Reflect', 'Say back what you notice'], ['Name it', 'The feeling, without judging it'], ['Ask', 'One open question']], say: 'Here are four steps. Pause. Take one breath before you answer, and ask yourself what you are sensing beneath the words. Reflect. Say back what you notice. Name it. Name the feeling in the room, without judging it. And ask one open question.' },
          { k: 'words', h: 'Words that help people feel heard', items: ['It sounds like this is weighing on you.', 'I can see how much you love her.', 'That makes sense.', 'Tell me more.'], say: 'Here are words that help people feel heard. It sounds like this is weighing on you. I can see how much you love her. That makes sense. And, tell me more.' },
          { k: 'points', h: 'Listen for', items: [['What they keep coming back to', 'That is often what matters most'], ['What their body says', 'Arms, eyes, voice, silence'], ['What they are not saying', 'Gently, when the time is right']], say: 'Listen for what they keep coming back to. That is often what matters most. Notice what their body says, their arms, eyes, voice, and silence. And, gently, when the time is right, notice what they are not saying.' },
          { k: 'points', h: 'Practice: One Breath Before You Answer', items: [['In your next real conversation', 'With anyone'], ['Pause one breath', 'Before you respond'], ['Reflect one thing back', 'It sounds like...']], cue: { w: { 3: 8 } }, say: 'Let us practice. In your next real conversation, with anyone, pause for one breath before you respond. Then reflect one thing back. It sounds like. Try it now in your mind with someone you will talk to today.' },
          { k: 'quiz', q: 'What is the first of the four listening steps?', opts: ['Give advice', 'Pause for one breath', 'Share your own story'], right: 1, why: 'A pause opens the door to real understanding.', say: 'Quick question. What is the first of the four steps?' }
        ] },

        { id: 'ok-s-words', n: 3, title: 'What to Say, and What to Skip', mins: 5, blurb: 'Words that comfort, and better swaps for words that sting.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 3', h: 'What to Say, and What to Skip', sub: 'Simple words are enough.', say: 'Most of us worry about saying the wrong thing. This lesson gives you words that comfort, and better swaps for words that can sting.' },
          { k: 'words', h: 'Words that are almost always right', items: ['I’m so sorry.', 'This is really hard.', 'I’m here.', 'I don’t know what to say, but I care about you.'], say: 'Here are words that are almost always right. I am so sorry. This is really hard. I am here. And, I do not know what to say, but I care about you. Honest and simple is enough.' },
          { k: 'points', h: 'Swap this for that', items: [['Instead of: Everything happens for a reason', 'Try: I’m so sorry this is happening.'], ['Instead of: At least...', 'Try: This is really hard.'], ['Instead of: I know exactly how you feel', 'Try: I can’t imagine all of it. Tell me.'], ['Instead of: You should...', 'Try: Would it help if I...?']], say: 'Some common phrases can sting, even when we mean well. So here are some swaps. Instead of, everything happens for a reason, try, I am so sorry this is happening. Instead of, at least, try, this is really hard. Instead of, I know exactly how you feel, try, I cannot imagine all of it, tell me. And instead of, you should, try, would it help if I?' },
          { k: 'story', title: 'A Day of Contrasts', lines: ['The family had refused a chaplain at first. When I called it a beautiful home, the wife snapped back.', 'Then she told me she lost her first husband at thirty-seven and raised four boys alone. My eyes filled. I have four boys, I said. I can imagine.', 'Guards dropped. A muffin was pressed into my hand. When I left, the man who refused my hand held it and said, Thank you for coming.'], lesson: 'A moment of honest heart can open a closed room.', note: 'From a Grounded reflection by Chris Joy', say: 'I once visited a family who had refused a chaplain at first, and had been tough with staff. When I called their place a beautiful home, the wife snapped back. Then she told me she had lost her first husband at thirty seven, and raised four boys alone. My eyes filled with tears. I have four boys, I said. I can imagine. Guards dropped. A muffin was pressed into my hand. When I left, the man who had refused my hand at the start held it, and said, thank you for coming. A moment of honest heart opened the room.' },
          { k: 'points', h: 'Sharing your own heart', items: [['Keep it short', 'One honest line'], ['Turn it back to them', 'Their story stays at the center'], ['Let your feelings show', 'Tears are okay']], say: 'Sharing a little of your own heart can help, when it is short. One honest line. Then turn it back to them, so their story stays at the center. And it is okay if your feelings show. Tears are a way of saying, this matters.' },
          { k: 'points', h: 'Practice: Your Go-To Words', items: [['Pick two lines that feel like you', 'From this lesson, or your own'], ['Say them out loud once', 'So they are ready'], ['Use one this week', 'With someone who is hurting']], cue: { w: { 1: 12, 2: 8 }, at: [1, 2, 3] }, say: 'Let us practice. Pick two lines from this lesson that feel like you, or write your own. Now say them out loud once, so they are ready when you need them. Then use one this week, with someone who is hurting.' },
          { k: 'quiz', q: 'What is a better swap for "At least..."?', opts: ['Look on the bright side', 'This is really hard', 'It could be worse'], right: 1, why: 'Naming that it is hard helps people feel understood.', say: 'Quick question. What is a better swap for at least?' }
        ] },

        { id: 'ok-s-struggle', n: 4, title: 'When Someone Is Struggling', mins: 5, blurb: 'Noticing, asking directly, and getting help together.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 4', h: 'When Someone Is Struggling', sub: 'Notice. Ask. Stay. Connect.', say: 'Sometimes someone we love is struggling more than they say. This lesson is about noticing, asking, and getting help together.' },
          { k: 'points', h: 'Signs to notice', items: [['Pulling away', 'From people and things they love'], ['Big changes', 'Sleep, eating, drinking, mood'], ['Hopeless talk', 'What’s the point? You’d be better off without me.'], ['Giving things away', 'Or saying goodbye in odd ways']], say: 'Here are signs to notice. Pulling away from people and things they love. Big changes in sleep, eating, drinking, or mood. Hopeless talk, like, what is the point, or, you would be better off without me. And giving things away, or saying goodbye in unusual ways.' },
          { k: 'flow', h: 'Four steps', steps: [['Notice', 'Trust what you see'], ['Ask', 'Directly and kindly'], ['Stay', 'Listen without judging'], ['Connect', 'To help, together']], say: 'If you notice signs like these, follow four steps. Notice, and trust what you see. Ask, directly and kindly. Stay, and listen without judging. And connect them to help, together.' },
          { k: 'big', h: 'It is okay to ask: Are you thinking about suicide?', sub: 'Asking directly does not put the idea in someone’s head. It opens the door.', say: 'If you are worried, it is okay to ask directly. Are you thinking about suicide? Research shows that asking does not put the idea in someone’s head. It opens the door, and often brings relief.' },
          { k: 'words', h: 'Words you can use', items: ['I’ve noticed you seem down. I care about you.', 'Are you thinking about suicide?', 'Thank you for telling me. Let’s call 988 together.'], say: 'Here are words you can use. I have noticed you seem down, and I care about you. Are you thinking about suicide? And if they say yes, thank you for telling me. Let us call nine eight eight together.' },
          { k: 'points', h: 'Getting help together', items: [['988', 'Call or text, any time, together'], ['Stay with them', 'And help keep them safe'], ['911', 'If they are in danger right now']], say: 'Call or text nine eight eight, any time, and you can do it together. Stay with them, and help them stay safe. If they are in danger right now, call nine one one. When Life Changes in Oak has a full guide for this, called, when someone else is thinking about suicide.' },
          { k: 'big', h: 'Caring enough to ask can save a life.', sub: 'And you deserve support too.', say: 'Caring enough to ask can save a life. And you deserve support too. After a hard conversation like this, talk with someone you trust.' },
          { k: 'quiz', q: 'Does asking someone directly about suicide put the idea in their head?', opts: ['Yes, so avoid the word', 'No. Asking opens the door to help.', 'Only if they are young'], right: 1, why: 'Asking directly opens the door, and often brings relief.', say: 'Quick question. Does asking someone directly about suicide put the idea in their head?' }
        ] },

        { id: 'ok-s-differ', n: 5, title: 'Love Across Differences', mins: 5, blurb: 'Caring for people whose faith, politics, or ways differ from yours.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 5', h: 'Love Across Differences', sub: 'Different views. The same love.', say: 'Sometimes the people we care for see the world very differently than we do. Different faith, different politics, different ways of living. This lesson is about loving well across those differences.' },
          { k: 'story', title: 'The Beautiful Hodgepodge', lines: ['On the shelf: a crucifix, a bundle of sage, a Lutheran church directory, and a beaded medicine wheel catching the light.', 'We are a hodgepodge, the daughter laughed. Catholic on Mom’s side, Native on Dad’s side, and now half of us go to the Lutheran church because the pastor showed up with coffee.', 'We just want to love her well, she said. That is really all we are trying to do.'], lesson: 'What matters is the hand you reach for.', note: 'From a Grounded story by Chris Joy', say: 'Let me tell you about a family I call the beautiful hodgepodge. On the shelves, a crucifix, a bundle of sage, a Lutheran church directory, and a beaded medicine wheel, all catching the same afternoon light. We are a hodgepodge, the daughter laughed. Catholic on mom’s side, Native on dad’s side, and half of us go to the Lutheran church now, because the pastor showed up with coffee when nobody else did. Then she looked at her mother and said, we just want to love her well. That is really all we are trying to do.' },
          { k: 'big', h: 'Not the label. The hand you reach for.', say: 'The families who love each other best are not always the ones who have everything figured out. Sometimes it is the ones who have argued and wandered and stayed anyway. Not the label. The hand you reach for.' },
          { k: 'flow', h: 'When views clash', steps: [['Name it', 'Inside: we see this differently'], ['Refocus', 'On the person, not the topic'], ['Find common ground', 'What do we both love?'], ['Care for yourself', 'Afterward, let it go']], say: 'When views clash, try four steps. Name it, quietly inside. We see this differently, and that is okay. Refocus on the person, not the topic. Find common ground. What do we both love? And care for yourself afterward, so you can let it go.' },
          { k: 'words', h: 'Words that keep the door open', items: ['I see it differently, and I love you.', 'Help me understand what this means to you.', 'Can we set this one down for today?'], say: 'Here are words that keep the door open. I see it differently, and I love you. Help me understand what this means to you. And, can we set this one down for today?' },
          { k: 'points', h: 'Practice: Common Ground', items: [['Picture someone who sees life differently', 'Family, neighbor, coworker'], ['Name one thing you share', 'A love, a hope, a memory'], ['Lead with it next time', 'Start there']], cue: { w: { 1: 10, 2: 12 }, at: [1, 2, 3] }, say: 'Let us practice. Picture someone who sees life differently than you do. Now name one thing you share. A love, a hope, or a memory. Next time you are together, start there.' },
          { k: 'quiz', q: 'When views clash, where should your focus go?', opts: ['Winning the argument', 'The person, not the topic', 'Avoiding them'], right: 1, why: 'Every person deserves compassionate presence, whatever their views.', say: 'Quick question. When views clash, where should your focus go?' }
        ] },

        { id: 'ok-s-gates', n: 6, title: 'Caring for Yourself While You Care', mins: 6, blurb: 'Boundaries with gates, and refilling your own cup.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 6', h: 'Caring for Yourself While You Care', sub: 'Shelter for others. Strength for you.', say: 'This last lesson is about you. To be a shelter for others, you need strength of your own.' },
          { k: 'story', title: 'My Boundaries Have Gates', lines: ['He had endured a brutally hard life with almost no one in his corner. You promise you’ll come back? he asked. I never make promises in this work. I said yes anyway.', 'I picture my boundary as a white picket fence around my own home, with a gate in it.', 'Sometimes I choose to open that gate and let someone in. They stay with me longer. And that is not a bad thing. It just asks more of me.'], lesson: 'Boundaries can have gates. You choose when to open them.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/my-boundaries-have-gates', label: 'Read the Full Story: My Boundaries Have Gates' }, say: 'Let me tell you about a man who had lived a brutally hard life, with almost no one in his corner. He asked me, you promise you will come back? I never make promises in this work, and I said yes anyway. I picture my boundaries as a white picket fence around my own home, with a gate in it. Sometimes I choose to open that gate and let someone in. They stay with me longer, almost like friends. That is not a bad thing. It just asks more of me.' },
          { k: 'big', h: 'Boundaries aren’t walls. They have gates.', sub: 'You choose who comes in, and you tend your own yard.', say: 'Boundaries are not walls. They have gates. You get to choose who comes in, and when. And you still have to tend your own yard.' },
          { k: 'points', h: 'Signs you need to refill', items: [['Running on empty', 'Tired, even after rest'], ['Short fuse', 'Small things set you off'], ['Numb', 'Hard to feel much at all'], ['Only me', 'Thinking no one else can do this']], say: 'Watch for signs that you need to refill. Running on empty, tired even after rest. A short fuse. Feeling numb. Or thinking, no one else can do this. Caregivers call this compassion fatigue, and it is common. It is a signal, not a failure.' },
          { k: 'points', h: 'Practice: Gate Check', items: [['Who is inside my gate right now?', 'Name them'], ['What does my own yard need?', 'Rest, help, a friend, a walk'], ['One gate to close gently', 'Or one person to invite in to help']], cue: { w: { 1: 12, 2: 12, 3: 12 }, at: [1, 2, 3] }, say: 'Let us do a gate check. Who is inside my gate right now? Name them. What does my own yard need? Rest, help, a friend, or a walk. And is there one gate to close gently for a while? Or one person to invite in, to help you carry this?' },
          { k: 'points', h: 'Refill, a little every day', items: [['Let others help', 'Give them something specific'], ['Pay down grief', 'Notice, name, express, unpack'], ['Keep your own tree', 'Your practices count too'], ['988', 'For you, any time']], say: 'Refill a little every day. Let others help, and give them something specific to do. Pay down your own grief as you go. Keep tending your own tree. Your practices count too. And if you are struggling, call or text nine eight eight. That line is for you too.' },
          { k: 'big', h: 'You can only give shelter if you have strength.', sub: 'Thank you for being a shelter for someone.', say: 'You can only give shelter if you have strength. Tend your own tree. And thank you, for being a shelter for someone. Gate Check is in the Practice Library.' },
          { k: 'quiz', q: 'What does My Boundaries Have Gates teach?', opts: ['Never let anyone in', 'You choose when to open the gate, and you still tend your own yard', 'Always say yes'], right: 1, why: 'Boundaries are not walls. They have gates, and your own yard needs tending too.', say: 'Last question. What does My Boundaries Have Gates teach?' }
        ] }
      ] },
      { id: 'oak-support', kind: 'support', title: 'For the Hard Moments', who: 'Short videos to use right in the middle of it', lessons: [

        { id: 'ok-r-ground', n: 1, title: 'Ground Yourself Right Now', mins: 3, blurb: 'Five senses to bring you back when everything is too much.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'Ground Yourself Right Now', sub: 'Five senses, one at a time.', say: 'When everything feels like too much, your senses can bring you back to this moment. This takes about three minutes.' },
          { k: 'story', title: 'Grounded in Coffee', lines: ['On the way to a visit, a reckless driver cut me off. My coffee flew across the seat, and my whole body shook.', 'I had a few minutes before I needed to walk into a family’s home calm. So I pulled over by a quiet field and named what my senses could find.', 'Four out of five senses came back coffee. I laughed out loud, and I was ready.'], lesson: 'Your senses can bring you home to this moment.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grounded-in-coffee', label: 'Read the Full Story: Grounded in Coffee' }, say: 'One morning a reckless driver cut me off and sent my coffee flying. I had only a few minutes before I needed to walk into a family’s home calm. So I pulled over and named what my senses could find. Four out of five came back coffee. I laughed, and I was ready.' },
          { k: 'points', h: 'Five, four, three, two, one', items: [['5 things you can see', 'Look slowly around you'], ['4 things you can feel', 'Your feet, the chair, your clothes, the air'], ['3 things you can hear', 'Near and far'], ['2 things you can smell', 'Or two smells you like'], ['1 thing you can taste', 'Or one sip of water']], cue: { w: { 1: 10, 4: 8, 5: 7, 6: 6, 7: 6 }, at: [1, 2, 5, 6, 7] }, say: 'Let us do it together. Name five things you can see. Now four things you can feel. Your feet on the floor. Whatever is holding you up. Three things you can hear. Two things you can smell. And one thing you can taste.' },
          { k: 'breathe', h: 'One slow breath to finish', hold: 12, cue: { p: { 1: 3, 2: 4 } }, say: 'Now one slow breath. In for four. And out for six.' },
          { k: 'big', h: 'You are here. That is enough for right now.', cue: { p: { 0: 1.5 } }, say: 'You are here, in this moment. That is enough for right now. Come back to this whenever you need it.' }
        ] },

        { id: 'ok-r-lion', n: 2, title: 'A Lion-Sized Reset', mins: 3, blurb: 'A loud, silly breath that shakes off a rough start.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'A Lion-Sized Reset', sub: 'When the day knocks you off center.', say: 'Some days knock you off center before they have even started. Here is a fast way to reset. It looks a little silly, and it works.' },
          { k: 'story', title: 'A Lion-Sized Reset', lines: ['My alarm didn’t go off, the dog got into the trash, and I walked out the door with two different shoes on.', 'A detour added twenty minutes. By the time I pulled up to my first visit, my head was spinning.', 'So I parked a little early, rolled down the window, and roared. Three times. By the third one, I was laughing at myself, and I was ready.'], lesson: 'You can pause and reset, even on the messy mornings.', note: 'From a Grounded reflection by Chris Joy', say: 'One morning my alarm did not go off, the dog got into the trash, and I walked out the door in two different shoes. A detour added twenty minutes. By the time I reached my first visit, my head was spinning. So I parked, rolled down the window, and did three lion’s breaths. By the third one, I was laughing at myself. And I walked in steady.' },
          { k: 'points', h: 'Lion’s Breath', items: [['Breathe in through your nose', 'Deep and slow'], ['Open your mouth wide', 'Stick your tongue out, all the way'], ['Breathe out with a long haaa', 'Add a little roar, if you like']], cue: { at: [2, 3, 4] }, say: 'Here is how. First, sit tall. Breathe in deep through your nose. Then open your mouth wide and stick your tongue out as far as it goes. And breathe out with a long, loud haaa. You can even add a little roar.' },
          { k: 'big', h: 'Let us do three together.', sub: 'In through your nose. Then mouth open, tongue out, haaa.', cue: { w: { 1: 6, 2: 6, 3: 6 } }, say: 'Let us do three together. Breathe in, then let it out. One more. And the last one, as big as you like.' },
          { k: 'points', h: 'Notice what changed', items: [['Your jaw', 'Looser?'], ['Your shoulders', 'Lower?'], ['Your mind', 'A little quieter?']], cue: { p: { 1: 1.5, 2: 1.5, 3: 1.5 } }, say: 'Now notice. Is your jaw looser? Are your shoulders lower? Is your mind a little quieter? Maybe you even smiled.' },
          { k: 'big', h: 'It is okay to take a second to roar.', say: 'One wrong start does not have to set the tone for the whole day. It is okay to take a second to roar.' }
        ] },

        { id: 'ok-r-box', n: 3, title: 'When Anxiety Spikes', mins: 3, blurb: 'Box breathing: four counts in, hold, out, hold.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'When Anxiety Spikes', sub: 'Breathing in a box.', say: 'When worry comes on fast, your breath can slow it down. This one is called box breathing. You can do it anywhere, and no one has to know.' },
          { k: 'story', title: 'The Quiet Power of Teamwork', lines: ['I was racing to meet a new patient and realized I had nothing but a name and an address. A wave of panic hit me.', 'I pulled onto a quiet street and found the notes my teammates had left. Then, still a little shaky, I did a few rounds of box breathing.', 'My shoulders dropped. My mind cleared. I went in with presence instead of pressure.'], lesson: 'A small pause can turn pressure into presence.', note: 'From a Grounded reflection by Chris Joy', say: 'I was racing to meet a new patient and family with nothing but a name and an address. A wave of panic hit. I pulled over, found the notes my teammates had left, and then did a few rounds of box breathing. My shoulders dropped. My mind cleared. And I went on with presence instead of pressure.' },
          { k: 'words', h: 'Around the box', items: ['In, two, three, four.', 'Hold, two, three, four.', 'Out, two, three, four.', 'Hold, two, three, four.'], cue: { w: { 1: 4, 2: 4, 3: 4, 4: 4 }, at: [1, 2, 3, 4] }, say: 'Let us go around the box together. Breathe in slowly through your nose. Hold it gently. Breathe out slowly through your mouth. And hold again.' },
          { k: 'big', h: 'Three more times around the box, at your own pace.', sub: 'In four. Hold four. Out four. Hold four.', hold: 50, say: 'Now go around the box three more times, at your own pace. I will wait with you.' },
          { k: 'big', h: 'Worry rises, and it also settles.', sub: 'If anxiety keeps you from living your life, you deserve more support. Talk with your doctor or a counselor.', say: 'Worry rises, and it also settles. Come back to the box anytime. And if anxiety keeps getting in the way of your life, you deserve more support. Talk with your doctor or a counselor.' }
        ] },

        { id: 'ok-r-panic', n: 4, title: 'When Panic Hits', mins: 3, blurb: 'What is happening in your body, and how to ride it out.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'When Panic Hits', sub: 'It feels huge. It passes.', say: 'If your heart is racing, your chest is tight, and you feel like something terrible is happening, this is for you. Stay with me.' },
          { k: 'big', h: 'Panic is your body’s alarm, ringing loud.', sub: 'It usually peaks within minutes, and then it eases.', say: 'Panic is your body’s alarm system, ringing loud. It feels huge. It usually peaks within a few minutes, and then it eases. You can ride it out.' },
          { k: 'words', h: 'Say it to yourself', items: ['This is panic.', 'It will pass.', 'I am safe right now.'], cue: { p: { 1: 1, 2: 1, 3: 1.5 } }, say: 'Say this to yourself, slowly. This is panic. It will pass. I am safe right now.' },
          { k: 'points', h: 'Feel the ground', items: [['Feet flat on the floor', 'Press down a little'], ['Hands on something solid', 'A table, your knees, the chair'], ['Eyes on one spot', 'Let them rest there']], cue: { w: { 4: 8 }, at: [1, 2, 3] }, say: 'Now feel the ground. Press your feet flat on the floor. Put your hands on something solid. Let your eyes rest on one spot. Stay here for a few breaths.' },
          { k: 'breathe', h: 'Longer out than in', hold: 34, say: 'Now follow the circle. In for four. And out for six. A long breath out tells your body the danger has passed.' },
          { k: 'big', h: 'If this is new, or you have chest pain, call 911 to be safe.', sub: 'Need to talk? Call or text 988, any time.', say: 'If this is the first time this has happened, or you have chest pain, call 911 to be safe. And if you need to talk to someone right now, call or text nine eight eight, any time.' }
        ] },

        { id: 'ok-r-sleep', n: 5, title: 'When You Can’t Sleep', mins: 4, blurb: 'Set the worries down and let your body rest.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'When You Can’t Sleep', sub: 'Set it down for tonight.', say: 'If it is late, and your mind will not stop, this is for you. Keep the lights low, and the volume soft.' },
          { k: 'points', h: 'Put it on paper', items: [['Write down what is spinning', 'Just a few words each'], ['Add one next step', 'For tomorrow, not tonight'], ['Close the notebook', 'It will keep until morning']], cue: { w: { 2: 30 }, p: { 3: 3 }, at: [1, 3, 4] }, say: 'First, put it on paper. Write down what is spinning in your mind, just a few words each. Take your time. Next to anything that needs doing, write one small step for tomorrow. Then close the notebook. It will keep until morning.' },
          { k: 'points', h: 'Soften, from your feet up', items: [['Your feet and legs', 'Let them get heavy'], ['Your belly and chest', 'Let them rise and fall'], ['Your shoulders and hands', 'Let them drop'], ['Your jaw and forehead', 'Let them go soft']], cue: { w: { 1: 8, 2: 8, 3: 8, 4: 8 }, at: [1, 2, 3, 4] }, say: 'Now lie back. Let your feet and legs get heavy. Let your belly and chest rise and fall on their own. Let your shoulders and hands drop. And let your jaw and forehead go soft.' },
          { k: 'breathe', h: 'Slow breaths', hold: 40, say: 'Now just breathe. In for four, and out for six. If your mind wanders, that is okay. Come back to the next breath.' },
          { k: 'big', h: 'Still awake after about twenty minutes? Get up for a bit.', sub: 'Dim light, something calm, then back to bed when you feel sleepy.', say: 'If you are still wide awake after about twenty minutes, get up for a little while. Keep the light dim, do something calm, and go back to bed when you feel sleepy. Your bed is for rest, not for wrestling.' },
          { k: 'big', h: 'Rest counts, even before sleep comes.', say: 'Rest counts, even before sleep comes. Good night.' }
        ] },

        { id: 'ok-r-anger', n: 6, title: 'When Anger Runs Hot', mins: 3, blurb: 'Stop, breathe, and choose what you do next.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'When Anger Runs Hot', sub: 'Make room before you respond.', say: 'Anger is a real feeling, and often an important one. It tells you something matters. This is about making room, so you get to choose what happens next.' },
          { k: 'flow', h: 'Stop', steps: [['Step back', 'Leave the room, if you can'], ['Take a breath', 'Long and slow'], ['Observe', 'Name it, find it in your body'], ['Proceed', 'With one choice']], cue: { w: { 2: 4, 4: 6, 7: 8 }, at: [1, 3, 5, 8] }, say: 'Remember the word stop. Step back. Leave the room if you can. Take a breath, long and slow. Breathe out longer than you breathed in. Observe. Name it to yourself: this is anger. Notice where it sits in your body. Then proceed, with one choice you will be glad you made.' },
          { k: 'words', h: 'Words that buy time', items: ['I need a minute. I’ll come back.', 'I want to talk about this when I’m calmer.', 'Let me think about that.'], say: 'Some words can buy you time. I need a minute. I will come back. I want to talk about this when I am calmer. Or, let me think about that.' },
          { k: 'points', h: 'Let the energy out', items: [['Move', 'A brisk walk, stairs, or push against a wall'], ['Roar it out', 'Lion’s Breath, a few times'], ['Write it', 'Everything you want to say, just for you']], say: 'Anger is energy, so let it out safely. Move your body, with a brisk walk or a few flights of stairs. Try a few lion’s breaths. Or write everything you want to say, just for you, and keep it.' },
          { k: 'big', h: 'If anyone is in danger, call 911.', sub: 'Feeling unsafe at home? The Domestic Violence Hotline is 1-800-799-7233.', say: 'If anyone is in danger, call nine one one. And if you do not feel safe at home, the National Domestic Violence Hotline is there any time, at one eight hundred, seven nine nine, seven two three three.' }
        ] },

        { id: 'ok-r-grief', n: 7, title: 'A Wave of Grief', mins: 3, blurb: 'When grief rises out of nowhere.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'A Wave of Grief', sub: 'Let it come, and let it go.', say: 'Grief often comes in waves. A song, a smell, a date on the calendar, and suddenly it is here. If that is happening now, stay with me.' },
          { k: 'story', title: 'Grief Debt', lines: ['One week I caught myself walking around numb. Not sad, not angry. Just numb.', 'A few losses had stacked up quietly, and I kept telling myself I would feel them later.', 'Grief we put off piles up, like laundry we swear we will fold.'], lesson: 'Paying grief down a little at a time keeps it from piling up.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grief-debt', label: 'Read the Full Story: Grief Debt' }, say: 'One week I caught myself walking around numb. A few losses had stacked up quietly, while I told myself I would feel them later. Grief we put off piles up, like laundry we swear we will fold. A wave like this one is a chance to pay a little of it down.' },
          { k: 'flow', h: 'Pay it down', steps: [['Notice it', 'Something is here'], ['Name it', 'Who or what you miss'], ['Express it', 'Cry, say it, write it'], ['Unpack it', 'Walk, stretch, breathe']], cue: { w: { 1: 5, 3: 10, 5: 15, 7: 8 }, at: [0, 2, 4, 6] }, say: 'Notice it. Something is here. Name it. Who, or what, do you miss right now? Express it. Let the tears come, say their name out loud, or write a line to them. Then unpack it with your body. Stretch, walk, or take a slow breath.' },
          { k: 'big', h: 'Grief is love with nowhere to go.', sub: 'The wave will pass. The love stays.', say: 'Grief is love with nowhere to go. The wave will pass. The love stays.' },
          { k: 'big', h: 'You don’t have to carry it alone.', sub: 'When Life Changes has guides for many kinds of loss. Need to talk now? Call or text 988.', say: 'You do not have to carry it alone. When Life Changes in Oak has guides for many kinds of loss. And if you need to talk with someone right now, call or text nine eight eight.' }
        ] },

        { id: 'ok-r-talk', n: 8, title: 'Before a Hard Conversation', mins: 3, blurb: 'Steady yourself, and walk in ready to listen.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'Before a Hard Conversation', sub: 'A few minutes to get steady.', say: 'If you are about to walk into a hard conversation, take a few minutes with me first.' },
          { k: 'breathe', h: 'One slow minute', hold: 30, say: 'First, steady your body. Follow the circle. In for four, and out for six.' },
          { k: 'points', h: 'Get clear', items: [['One sentence', 'What do I most want them to know?'], ['One hope', 'What would a good outcome look like?'], ['One question', 'What do I want to understand about them?']], cue: { w: { 2: 12, 3: 12, 4: 12 }, at: [1, 3, 4] }, say: 'Now get clear. What is the one thing you most want them to know? Say it to yourself in one sentence. What would a good outcome look like? And what do you want to understand about them?' },
          { k: 'story', title: 'Listening Beneath the Words', lines: ['In a family meeting, a daughter’s words said one thing while her eyes and her tightly folded arms said another.', 'Instead of rushing to fill the space, I slowed down, met her gaze, and asked softly: What is this moment asking of you right now?', 'The room shifted. Tears came. Real connection followed.'], lesson: 'Slow down and listen beneath the words.', note: 'From a Grounded reflection by Chris Joy', say: 'I once walked into a family meeting where a daughter’s words said one thing, and her folded arms said another. Instead of rushing to fill the space, I slowed down and asked softly, what is this moment asking of you right now? The room shifted. Real connection followed.' },
          { k: 'words', h: 'Words to carry in', items: ['Help me understand.', 'Tell me more.', 'I want us to get through this together.', 'Can we take a short break?'], say: 'Here are some words to carry in with you. Help me understand. Tell me more. I want us to get through this together. And if it gets too hot, can we take a short break?' },
          { k: 'big', h: 'You can listen and still say what matters to you.', say: 'You can listen deeply, and still say what matters to you. Go gently. You are ready.' }
        ] },

        { id: 'ok-r-news', n: 9, title: 'After Bad News', mins: 3, blurb: 'The first few minutes after the call or the appointment.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'After Bad News', sub: 'Nothing has to be decided right now.', say: 'If you have just gotten hard news, I am sorry. Sit down if you can. Take a breath. You do not have to decide anything right this minute.' },
          { k: 'big', h: 'Shock is your mind catching up.', sub: 'Numb, shaky, foggy, or strangely calm are all common.', say: 'Shock is your mind catching up with what it just heard. Feeling numb, shaky, foggy, or strangely calm are all common. There is no wrong way to feel this.' },
          { k: 'breathe', h: 'Breathe first', hold: 24, say: 'Breathe with the circle for a moment. In for four. And out for six.' },
          { k: 'points', h: 'Three small steps', items: [['Reach one person', 'A call or a text: I just got hard news.'], ['Write down your questions', 'For the next conversation'], ['Eat or drink something', 'Your body is carrying this too']], cue: { w: { 3: 10 }, at: [1, 4, 5] }, say: 'Then, three small steps. Reach one person. A call or a text is enough. I just got hard news. Write down the questions you want to ask next time, while they are fresh. And drink some water, or eat something small. Your body is carrying this too.' },
          { k: 'big', h: 'One step at a time is enough.', sub: 'When Life Changes has guides for hard diagnoses, losses, and more.', say: 'One step at a time is enough. When you are ready, When Life Changes in Oak has guides for hard diagnoses, losses, and more. And if you need to talk right now, call or text nine eight eight.' }
        ] },

        { id: 'ok-r-still', n: 10, title: 'A Moment of Stillness', mins: 4, blurb: 'A breath prayer, or a quiet minute in plain words.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'A Moment of Stillness', sub: 'For any faith, and everything in-between.', say: 'This is a few minutes of stillness. If you pray, make it a prayer. If not, let it be a quiet minute. Both are welcome here.' },
          { k: 'points', h: 'Settle in', items: [['Sit comfortably', 'Feet on the floor'], ['Hands open', 'In your lap'], ['Eyes soft', 'Closed, or resting on one spot']], cue: { p: { 0: 2, 1: 2, 2: 2 } }, say: 'Sit comfortably, with your feet on the floor. Let your hands rest open in your lap. Let your eyes close, or rest them on one spot.' },
          { k: 'words', h: 'Choose a few words', items: ['Here I am.', 'I am held.', 'Peace, be still.', 'Breathe in love. Breathe out fear.'], say: 'Choose a few words that fit you. Here I am. I am held. Peace, be still. Or, breathe in love, and breathe out fear. If you pray, you might add a name for God that is yours.' },
          { k: 'breathe', h: 'Breathe with your words', sub: 'First half in. Second half out.', hold: 60, say: 'Now breathe with your words. The first half as you breathe in, and the second half as you breathe out. When your mind wanders, come back to the words. I will keep the quiet with you.' },
          { k: 'big', h: 'Carry your words with you today.', sub: 'In line, at a red light, before a hard conversation.', say: 'Carry your words with you today. In line, at a red light, or before a hard conversation. They go wherever you go.' }
        ] },

        { id: 'ok-r-alone', n: 11, title: 'Feeling Alone Tonight', mins: 3, blurb: 'One small step toward someone, and help any time.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'Feeling Alone Tonight', sub: 'You are not the only one.', say: 'If you feel alone tonight, I am glad you are here. Loneliness is one of the most common feelings there is. It is not a sign that something is wrong with you.' },
          { k: 'big', h: 'Loneliness is a signal, like hunger.', sub: 'It tells you that connection matters to you.', say: 'Loneliness is a signal, like hunger. It tells you that connection matters to you. And small steps toward people count.' },
          { k: 'points', h: 'One small reach', items: [['Text one person', 'Thinking of you. How are you?'], ['Hear a voice', 'A call, a voice message, or a radio show'], ['Go where people are', 'A coffee shop, a walk, a service']], cue: { w: { 3: 15 }, at: [1, 4, 5] }, say: 'Try one small reach. Text one person. It can be as simple as, thinking of you, how are you? Take a moment now, if you like. Or hear a voice, with a call or a voice message. Tomorrow, go where people are, even just a coffee shop or a walk.' },
          { k: 'points', h: 'Be kind to yourself tonight', items: [['Something warm', 'Tea, a shower, a blanket'], ['Something gentle', 'A familiar show, music, a book'], ['Something for the morning', 'One small plan to look forward to']], say: 'And be kind to yourself tonight. Something warm, like tea or a blanket. Something gentle, like music you love. And one small plan for the morning, something to look forward to.' },
          { k: 'big', h: 'Call or text 988 any time.', sub: 'If you are thinking about ending your life, reach out now. In danger right now? Call 911.', say: 'If you want to talk to someone right now, call or text nine eight eight, any time, day or night. If you are thinking about ending your life, please reach out now. You matter. And if you are in danger right now, call nine one one.' }
        ] }
      ] }
    ]
  },
  willow: {
    title: 'Learn Willow',
    intro: 'Gentle videos, narrated aloud. Watch alone or together, whenever there is time. Pause anytime.',
    supportFirst: true,
    support: { eyebrow: 'Support', title: 'Support for Right Now', intro: 'Short videos for the hard hours. Open one anytime, as often as you need. Nothing to finish.' },
    lessonsTitle: 'Learn Step by Step',
    tracks: [
      /* ---------- Support for Right Now: no quiz, no certificate, gentle closing ---------- */
      { id: 'willow-support', kind: 'support', title: 'For the Hard Hours', who: 'For anyone sitting with someone near the end of life, and for the person themselves', lessons: [

        { id: 'wl-s-breathe', n: 1, title: 'Breathe at the Bedside', mins: 3, blurb: 'A slow breathing practice you can do right where you are.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'Breathe at the Bedside', sub: 'Right where you are.', say: "Let's take a few minutes to breathe together. You don't need to go anywhere. You can do this right where you are, even in the chair beside the bed." },
          { k: 'points', h: 'Get settled', items: [['Feet on the floor', 'Feel the ground holding you up'], ['Hands open', 'In your lap, or holding their hand'], ['Eyes soft', 'Closed, or resting on one spot']], cue: { p: { 0: 3, 1: 3, 2: 3 } }, say: 'Put your feet flat on the floor and feel the ground holding you up. Let your hands rest open, in your lap, or holding their hand. Let your eyes close, or rest them on one spot.' },
          { k: 'big', h: 'A longer breath out tells your body it is safe.', sub: 'In for four. Out for six.', say: 'Here is the one thing to know. When your breath out is longer than your breath in, your body starts to settle. So we will breathe in for four, and out for six.' },
          { k: 'breathe', h: 'Breathe with the circle', sub: 'In as it grows. Out as it softens.', hold: 34, say: 'Follow the circle. Breathe in as it grows, two, three, four. And out as it softens, slowly, all the way out. Keep going on your own for a few breaths.' },
          { k: 'big', h: 'If your mind wanders, that is okay.', sub: 'Come back to the next breath.', say: 'If your mind wanders to the worries, that is okay. Notice it, and come back to the next breath. There is nothing to do right.' },
          { k: 'breathe', h: 'A few more', sub: 'You can breathe for them too.', hold: 30, say: 'A few more breaths. If the person you love is breathing hard, you can breathe slow and steady beside them. Sometimes a calm body in the room helps everyone.' },
          { k: 'big', h: 'You can come back to this anytime.', sub: 'Day or night.', say: 'That is all it takes. Come back to this anytime, day or night. And if anything about their breathing worries you, call your hospice. They are there around the clock.' }
        ] },

        { id: 'wl-s-say', n: 2, title: "When You Don't Know What to Say", mins: 2, blurb: 'Simple words that are always enough.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: "When You Don't Know What to Say", sub: 'Simple words are enough.', say: "If you are standing at the bedside and the words won't come, this is for you. Simple words are enough." },
          { k: 'big', h: 'Your being there says the most.', say: 'First, the most important thing. Your being there already says the most. Holding a hand says, I am here, without a single word.' },
          { k: 'words', h: 'Words that are always enough', items: ["I'm here.", 'I love you.', 'Thank you.', "You don't have to talk. I'll sit with you."], say: "If you want words, these are always enough. I'm here. I love you. Thank you. You don't have to talk. I'll just sit with you." },
          { k: 'words', h: 'Four things many people want to say', items: ['Please forgive me.', 'I forgive you.', 'Thank you.', 'I love you.'], sub: 'Then, when it feels right: goodbye.', say: 'Many hospice teams teach four things people often want to say before a goodbye. Please forgive me. I forgive you. Thank you. I love you. And then, when it feels right, goodbye. Say the ones that are true for you.' },
          { k: 'words', h: 'Words that open a door', items: ['Tell me about the day we met.', 'What are you proudest of?', 'What do you want us to remember?', 'Is there anything you want me to do?'], say: 'If they are able to talk, a question can open a door. Tell me about the day we met. What are you proudest of. What do you want us to remember. Is there anything you want me to do.' },
          { k: 'big', h: 'Keep talking, even when they are quiet.', sub: 'Hearing may be one of the last senses to go.', say: 'If they can no longer answer, keep talking anyway. Hearing may be one of the last senses to go. Tell them who is in the room. Tell them what you want them to know.' },
          { k: 'big', h: 'If it comes out wrong, love covers it.', say: 'And if your words come out clumsy, or you cry in the middle, that is okay. Love covers it. They know what you mean.' }
        ] },

        { id: 'wl-s-ground', n: 3, title: 'Ground Yourself Right Now', mins: 3, blurb: 'Five senses to bring you back when everything is too much.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'Ground Yourself Right Now', sub: 'Five senses, one breath at a time.', say: 'When everything feels like too much, your senses can bring you back to this moment. This takes about three minutes.' },
          { k: 'story', title: 'Grounded in Coffee', lines: ['On the way to a visit, a reckless driver cut me off. My coffee flew across the seat, and my whole body shook.', 'I had a few minutes before I needed to walk into a family\u2019s home calm. So I pulled over by a quiet field and named what my senses could find.', 'Four out of five senses came back coffee. I laughed out loud, and I was ready.'], lesson: 'Your senses can bring you home to this moment.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grounded-in-coffee', label: 'Read the Full Story: Grounded in Coffee' }, say: "One morning a reckless driver cut me off and sent my coffee flying. I had only a few minutes before I needed to walk into a family's home calm. So I pulled over and named what my senses could find. Four out of five came back coffee. I laughed, and I was ready." },
          { k: 'points', h: 'Five, four, three, two, one', items: [['5 things you can see', 'Look slowly around the room'], ['4 things you can feel', 'The chair, your feet, your clothes, their hand'], ['3 things you can hear', 'Near and far'], ['2 things you can smell', 'Or two smells you like'], ['1 thing you can taste', 'Or one sip of water']], gap: 2.4, cue: { w: { 1: 10, 4: 8, 5: 7, 6: 6, 7: 6 }, at: [1, 2, 5, 6, 7] }, say: 'Let us do it together. Name five things you can see. Now four things you can feel. The chair under you. Your feet on the floor. Three things you can hear. Two things you can smell. And one thing you can taste.' },
          { k: 'breathe', h: 'One slow breath to finish', hold: 12, cue: { p: { 1: 3, 2: 4 } }, say: 'Now one slow breath. In for four. And out for six.' },
          { k: 'big', h: 'You are here. That is enough for right now.', cue: { p: { 0: 1.5 } }, say: 'You are here, in this moment. That is enough for right now. Come back to this whenever you need it.' }
        ] },

        { id: 'wl-s-before', n: 4, title: 'Grief Before the Goodbye', mins: 2, blurb: 'Why you may be grieving already, and what helps.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'Grief Before the Goodbye', sub: 'It has a name.', say: 'If you are grieving someone who is still here, you are not alone, and you are not doing anything wrong. It has a name.' },
          { k: 'big', h: 'Anticipatory grief', sub: 'Grieving a loss as you watch it coming.', say: 'It is called anticipatory grief. It is the grief of watching a loss come, a little at a time. Many families feel it for weeks or months before a death.' },
          { k: 'points', h: 'It can look like', items: [['Sadness that comes in waves', 'Strong one hour, gone the next'], ['Tired all the way through', 'Even after sleep'], ['Feeling numb', 'Or far away from it all'], ['Wishing it were over', 'And feeling guilty for it']], say: 'It can look like sadness that comes in waves. Being tired all the way through. Feeling numb. And sometimes wishing it were over, then feeling guilty for wishing it. All of these are common. All of them come from love.' },
          { k: 'flow', h: 'Notice. Name. Express. Unpack.', steps: [['Notice it', 'Something is there'], ['Name it', 'Sad, scared, angry, tired'], ['Express it', 'Talk, write, cry'], ['Unpack it', 'Walk, stretch, breathe']], say: 'Here is a simple way to move through it. Notice it. Name it, as clearly as you can. Express it, by talking, writing, or crying. Then unpack it with your body. Walk, stretch, breathe.' },
          { k: 'big', h: 'You can grieve and still be fully present.', sub: 'Both are love.', say: 'Grieving now does not mean giving up. You can grieve and still be fully present. Both are love. And your hospice has people who can talk with you about it, now and after.' }
        ] },

        { id: 'wl-s-vigil', n: 5, title: 'The Vigil Hours', mins: 2, blurb: 'Sitting with someone in their last hours or days.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'The Vigil Hours', sub: 'Keeping watch, with love.', say: 'When someone is in their last hours or days, families often keep watch at the bedside. This is called a vigil. Here is what can help.' },
          { k: 'points', h: 'Make the room theirs', items: [['Their music', 'Softly, the songs they love'], ['Their words', 'Prayers, readings, or poems from their life'], ['Soft light', 'A lamp instead of overhead lights'], ['Familiar things', 'A blanket, a photo, a smell from home']], say: 'Make the room theirs. Their music, played softly. Prayers, readings, or poems from their life. A lamp instead of bright overhead lights. Familiar things, like a favorite blanket or photo.' },
          { k: 'story', title: 'Drift Away', lines: ['Suzan had not spoken or opened her eyes in three days.', 'Then an old song came on, Drift Away. She knew every word. Under the sheet, her toes moved to the beat, and she smiled wider than I had ever seen a dying person smile.', 'She never woke again. She drifted away peacefully a short time later.'], lesson: 'Music can reach a person when words cannot.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/drift-away', label: 'Read the Full Story: Drift Away' }, say: "Let me tell you about Suzan, who had not spoken in three days. Then an old song came on, Drift Away, and under the sheet, her toes began to move to the beat. She lifted her chin and smiled. She drifted away peacefully a short time later. Music can reach a person when words cannot." },
          { k: 'points', h: 'Take turns', items: [['Shifts, not marathons', 'Two to four hours, then rest'], ['Eat and sleep', 'They would want that for you'], ['Write it down', 'What Helped Today, for the next person'], ['Call the hospice', 'For any change that worries you']], say: 'Take turns. Shifts work better than marathons. Eat, and sleep when you can. They would want that for you. Use What Helped Today in Willow, so the next person knows what brought comfort. And call your hospice for any change that worries you.' },
          { k: 'big', h: 'If they die while you stepped out, it is not your fault.', sub: 'Some people seem to wait until loved ones leave the room.', say: 'One more thing, and it matters. Some people die in the few minutes when everyone has stepped out. Bedside workers see it often. If that happens, it is not your fault. You were there for so much of it, and that is what they knew.' },
          { k: 'big', h: 'You are keeping watch with love.', say: 'You are keeping watch with love. That is a holy thing to do, whatever your faith. Take all the time you need.' }
        ] },

        { id: 'wl-s-after', n: 6, title: 'The First Hour After', mins: 2, blurb: 'There is no rush. What to do, and what can wait.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'The First Hour After', sub: 'There is no rush.', cue: { p: { 1: 3 } }, say: 'If the person you love has just died, I am so sorry. Take a breath. There is no rush. Nothing has to happen right away.' },
          { k: 'points', h: 'What to do first', items: [['Call the hospice', 'Not 911. They will guide you.'], ['Take your time', 'Sit with them as long as you need'], ['Say goodbye', 'Hold their hand, speak to them'], ['Invite others in', 'Children too, if they want to come']], say: 'Call your hospice, not 911. The hospice will guide you, and a nurse will come to help with the next steps, including the funeral home. Then take your time. Sit with them. Hold their hand. Say goodbye. Invite others in, children too, if they want to come.' },
          { k: 'points', h: 'Your tradition matters now', items: [['Prayers or readings', 'From their faith, or their favorite words'], ['Rituals', 'Washing, anointing, chanting, keeping watch'], ['Their faith card', 'In Willow, on the Bedside tab'], ['Their clergy', 'Call them, if they would want that']], say: 'If they had a faith or tradition, this is the time for it. Prayers or readings. Rituals like washing, anointing, chanting, or keeping watch with the body. Their faith card in Willow can help. And you can call their clergy, if they would want that.' },
          { k: 'big', h: 'Whatever you feel is okay.', sub: 'Tears, numbness, relief, all of it.', say: 'Whatever you feel right now is okay. Tears. Numbness. Even relief, after a long road. All of it belongs.' },
          { k: 'big', h: 'Your hospice keeps walking with you.', sub: 'Most offer grief support for about a year after a death.', say: 'Your hospice keeps walking with you. Most offer grief support for about thirteen months after a death. Ask for it by name. Take all the time you need.' }
        ] },

        { id: 'wl-s-tonight', n: 7, title: 'Caring for Yourself Tonight', mins: 2, blurb: 'Small things that help a tired heart and body.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'Caring for Yourself Tonight', sub: 'Small things count.', say: 'Caring for someone near the end of life is some of the hardest work there is. Tonight, here are a few small things for you.' },
          { k: 'points', h: 'Tonight, try one', items: [['Drink a glass of water', 'Right now, if you can'], ['Eat something warm', 'Even something small'], ['Step outside', 'Five minutes of air'], ['Text one person', 'Let someone know how you are']], say: 'Tonight, try just one of these. Drink a glass of water. Eat something warm, even something small. Step outside for five minutes of air. Or text one person and let them know how you are really doing.' },
          { k: 'words', h: 'Let people help', items: ['Can you bring dinner Thursday?', 'Can you sit with him for two hours?', 'Can you pick up the kids?'], sub: 'Specific asks are easier to say yes to.', say: 'When people say, let me know if you need anything, give them something specific. Can you bring dinner Thursday. Can you sit with him for two hours. Specific asks are easier to say yes to.' },
          { k: 'big', h: 'Rest is part of loving them well.', say: 'Rest is not leaving them. Rest is part of loving them well, for as long as this takes.' },
          { k: 'points', h: 'Your own tree', items: [['Helpers have a tree too', 'In Willow, with your own check-ins'], ['Your hospice line', 'For them, day or night'], ['988', 'Call or text, if you are struggling']], say: 'Willow gives helpers a tree of their own, because you are carrying this too. Your hospice line is there for your person, day or night. And if you are struggling yourself, you can call or text 988 anytime.' }
        ] },

        { id: 'wl-s-blessing', n: 8, title: 'A Blessing for the Room', mins: 2, blurb: 'A quiet moment of prayer or stillness, for any faith tradition.', scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Support for Right Now', h: 'A Blessing for the Room', sub: 'A quiet moment, together.', say: 'This is a quiet moment for the room. If they have a faith, you can make it a prayer. If not, let it be a moment of stillness. Both are welcome here.' },
          { k: 'breathe', h: 'First, one slow breath', hold: 10, cue: { p: { 1: 3, 2: 4 } }, say: 'First, one slow breath together. In. And out.' },
          { k: 'words', h: 'A prayer, for those who pray', items: ['God, you are here with us.', 'Hold this one we love, and give them peace.', 'Carry what we cannot carry.', 'Stay close to each of us. Amen.'], gap: 2, cue: { p: { 5: 2 } }, say: 'For those who pray. God, you are here with us. Hold this one we love, and give them peace. Carry what we cannot carry. Stay close to each of us. Amen.' },
          { k: 'words', h: 'A blessing, in plain words', items: ['May you feel how loved you are.', 'May your body be at ease.', 'May you rest in peace, and in good company.', 'We are here.'], gap: 2, cue: { p: { 4: 2 } }, say: 'Or, a blessing in plain words. May you feel how loved you are. May your body be at ease. May you rest in peace, and in good company. We are here.' },
          { k: 'big', h: 'Use their own words, too.', sub: 'Their prayers, scripture, or poems are on the Readings tab.', say: 'Their own words are best of all. A prayer from their tradition. A favorite psalm, sutra, or poem. Willow has readings for all faith traditions and everything in-between on the Readings tab.' }
        ] },

        /* Build B1: from the When Life Changes videos */
        {"id": "wl-s-hear", "n": 9, "title": "Words They Can Still Hear", "mins": 4, "blurb": "Say what you want to say, even when they can no longer answer.", "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Words They Can Still Hear", "sub": "Even when they can no longer answer.", "say": "If the person you love can no longer answer you, this is for you. We'll practice a few words together."}, {"k": "big", "h": "Hearing may be one of the last senses to go.", "say": "Hearing may be one of the last senses to go. In a hospice study, unresponsive patients' brains still responded to sound in their last hours. So your words may reach them.", "sub": "Your words may reach them."}, {"k": "big", "h": "Start with your name.", "say": "Let us start simply. Say their name, and then, it's me, I'm here. Out loud if you are with them, quietly if you are not.", "beats": ["Let us start simply.", "Say their name, and then, it's me, I'm here.", {"t": "Out loud if you are with them, quietly if you are not.", "w": 8}]}, {"k": "big", "h": "Tell them who is here.", "say": "Now tell them who is in the room. Or who is thinking of them from far away. Names and voices are a comfort.", "beats": ["Now tell them who is in the room.", "Or who is thinking of them from far away.", {"t": "Names and voices are a comfort.", "w": 10}]}, {"k": "words", "h": "Say one thank-you.", "say": "Now one thank-you. Something only you would know to say. Take your time.", "beats": ["Now one thank-you.", "Something only you would know to say.", {"t": "Take your time.", "w": 14}], "items": ["Thank you for..."]}, {"k": "words", "h": "If you want more words", "items": ["I love you.", "We're going to be okay.", "You can rest when you are ready."], "say": "If you want more words, these are often enough. I love you. We're going to be okay. And, when it feels right, you can rest when you are ready."}, {"k": "big", "h": "Keep talking, as often as you like.", "say": "That's all it takes. Keep talking to them, as often as you like. Tell them stories, read to them, play their music softly. Love still reaches them."}]},

        /* Build B1: from the When Life Changes videos */
        {"id": "wl-s-goodbye", "n": 10, "title": "Your Own Goodbye", "mins": 4, "blurb": "For when you missed the moment, or never got to say it.", "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Your Own Goodbye", "sub": "It is not too late.", "say": "If you didn't get to say goodbye the way you wanted, or you weren't there at the end, this is for you. It is not too late to say it."}, {"k": "big", "h": "Goodbyes can happen after.", "say": "A goodbye doesn't have to happen at the bedside to be real. People say goodbye in letters, at graves, on walks, and in their hearts, sometimes years later. Yours still counts.", "sub": "Yours still counts."}, {"k": "breathe", "h": "Settle first", "sub": "In for four. Out for six.", "say": "Let's settle first. Breathe in for four. And out for six. A few more, at your own pace.", "hold": 24}, {"k": "big", "h": "Picture them.", "say": "Picture their face. Their hands, their voice, the way they said your name. Stay with that for a moment.", "beats": ["Picture their face.", "Their hands, their voice, the way they said your name.", {"t": "Stay with that for a moment.", "w": 12}]}, {"k": "words", "h": "Say it now.", "say": "Now say what you wanted to say. Out loud, in a whisper, or in your heart. There is no wrong way to do this.", "beats": ["Now say what you wanted to say.", "Out loud, in a whisper, or in your heart.", {"t": "There is no wrong way to do this.", "w": 20}], "items": ["I was with you so many days.", "Thank you.", "I love you.", "Goodbye, for now."]}, {"k": "points", "h": "Ways to keep it", "items": [["Write it down", "A letter to them, today"], ["A ritual of your own", "A candle, a walk, a song"], ["Tell someone", "A friend, or hospice bereavement support"]], "say": "If you want to keep it, write it down, in a letter to them. Make a ritual of your own, a candle, a walk, a song. Or tell someone, a friend, or your hospice bereavement team."}, {"k": "big", "h": "You loved them. They knew.", "say": "You loved them, and they knew. Come back to this whenever you need it."}]},

        /* Build B1: from the When Life Changes videos */
        {"id": "wl-s-hand", "n": 11, "title": "A Hand on Theirs", "mins": 4, "blurb": "A quiet minute of presence at the bedside.", "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "A Hand on Theirs", "sub": "A quiet minute of presence.", "say": "When you don't know what to do at the bedside, this is for you. Sometimes being there is the whole job."}, {"k": "story", "title": "The Blanket That Didn't Need Smoothing", "lines": ["A husband sat beside his wife in her final hours, his chair so close his knee nearly touched the bed rail.", "He told me about their life together. Then he reached over and adjusted her blanket. It had not slipped.", "He kept holding her hand, like it was the only job left for him to do."], "lesson": "Sometimes love just needs somewhere to put its hands.", "note": "Names and details changed", "say": "A husband once sat beside his wife in her final hours, his chair so close his knee nearly touched the bed rail. He told me about their life, and then he reached over and adjusted her blanket. It had not slipped. Sometimes love just needs somewhere to put its hands."}, {"k": "big", "h": "Rest your hand on theirs.", "say": "If you are beside them, rest your hand on theirs. If you are not, picture it. Notice the warmth, or the coolness, or the stillness.", "beats": ["If you are beside them, rest your hand on theirs.", "If you are not, picture it.", {"t": "Notice the warmth, or the coolness, or the stillness.", "w": 12}]}, {"k": "breathe", "h": "Breathe slowly beside them", "sub": "A calm body in the room helps everyone.", "say": "Now breathe slowly beside them. In for four. And out for six. If their breathing is hard, your slow, steady breath can be a quiet comfort in the room.", "hold": 30}, {"k": "big", "h": "Notice one good thing.", "say": "One more moment. Notice one good thing in this room. A face, a sound, a memory, the light.", "beats": ["One more moment.", "Notice one good thing in this room.", {"t": "A face, a sound, a memory, the light.", "w": 10}]}, {"k": "big", "h": "Being there is enough.", "say": "Being there is enough. If anything about their comfort worries you, call your hospice nurse, day or night."}]}
      ] },


      /* ---------- W4 (GWG BLD 717): Support for Right Now, four more groups. Generated from patches/w4/source in grounded-workshop ---------- */
      {"id": "willow-sp-process", "kind": "support", "title": "Processing", "who": "Making sense of what you feel", "lessons": [
        {"id": "wl-s-news", "n": 12, "title": "When the News Is New", "mins": 4, "blurb": "For the first days after hard news: one thing at a time.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When the News Is New", "sub": "One thing at a time.", "say": "When you have just heard the word hospice, or been told that time is short, this is for you. You don't have to take it all in today."}, {"k": "big", "h": "Shock is how a mind takes in hard news.", "sub": "Numb, racing, or both.", "say": "Right after hard news, many people feel numb. Others feel their mind racing, making lists in the middle of the night. Some feel both in the same hour. This is common. Shock is how a mind takes in more than it can hold at once."}, {"k": "points", "h": "The first days can feel like", "items": [["Numb or far away", "Like watching from outside"], ["A racing mind", "Questions and what-ifs, over and over"], ["Forgetting things", "Keys, names, what the nurse just said"], ["Tears, or none at all", "Both are normal"]], "say": "The first days can feel strange. Numb, or far away, like you are watching from outside. A racing mind, with the same questions over and over. Forgetting things, even what the nurse just said. Tears, or no tears at all. Every one of these is normal."}, {"k": "breathe", "h": "Let your body catch up", "sub": "In for four. Out for six.", "hold": 24, "say": "Before anything else, let your body catch up with the news. Breathe in for four. And out for six. Again, slowly, at your own pace."}, {"k": "big", "h": "Name the one thing in front of you.", "sub": "Just one.", "say": "A racing mind tries to hold everything at once. Let's set most of it down. Ask yourself, what is the one thing in front of me right now? Name it, out loud or in your head.", "beats": ["A racing mind tries to hold everything at once.", "Let's set most of it down.", "Ask yourself, what is the one thing in front of me right now?", {"t": "Name it, out loud or in your head.", "w": 10}]}, {"k": "points", "h": "Much of it can wait", "items": [["Big decisions", "Ask your team what truly cannot wait"], ["Telling everyone", "Start with a few people"], ["Reading everything", "Your hospice team can answer"], ["Getting it right", "There is no right way to do this"]], "say": "Much of it can wait a few days. Most big decisions can wait, so ask your hospice team what truly cannot. Telling everyone can wait. Start with a few people, and let them help spread the word. Reading everything online can wait. Your hospice team can answer your questions. And getting it right can wait forever. There is no right way to do this."}, {"k": "words", "h": "Write the questions down", "items": ["What should we watch for?", "Who do I call, and when?", "What can wait?"], "sub": "Bring them to your hospice team.", "say": "Your mind may keep circling the same questions. Write them down, so you don't have to hold them. Good first questions are, what should we watch for, who do I call, and when, and what can wait. Write one now, on paper or in your phone.", "beats": ["Your mind may keep circling the same questions.", "Write them down, so you don't have to hold them.", "Good first questions are, what should we watch for, who do I call, and when, and what can wait.", {"t": "Write one now, on paper or in your phone.", "w": 12}]}, {"k": "flow", "h": "Today, just three things", "steps": [["Eat something", "Even a little"], ["Tell one person", "Someone who can help carry it"], ["Save the hospice number", "Day or night"]], "say": "For today, just three things. Eat something, even a little. Tell one person, someone who can help you carry this. And save your hospice number where you can find it fast. They are there day or night."}, {"k": "big", "h": "One thing, then the next.", "sub": "You do not have to understand it all today.", "say": "If the fear gets to be too much, call your hospice, day or night. If you are struggling yourself, call or text 988. If anyone is in danger right now, call 911. You don't have to understand all of this today. One thing, then the next. Come back to this whenever you need it."}]},
        {"id": "wl-s-anger", "n": 13, "title": "Anger Has a Place", "mins": 4, "blurb": "Anger often comes from love. Safe ways to let it move.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Anger Has a Place", "sub": "It often comes from love.", "say": "If you are angry, and you aren't sure where to put it, this is for you. Anger belongs here too."}, {"k": "points", "h": "Anger can land anywhere", "items": [["The illness", "For taking so much"], ["The doctors", "For what they said, or didn't"], ["The family", "For what they do, or don't do"], ["The person, or yourself", "For choices made, or not doing more"]], "say": "Anger can land anywhere. On the illness, for taking so much. On the doctors, for what they said, or didn't say. On the family, for what they do, or don't do. On the person you love, for the choices they made. On yourself. Some people feel angry at God, and that belongs too."}, {"k": "big", "h": "Anger is often love with nowhere to go.", "sub": "It is common, and it makes sense.", "say": "Underneath, anger is often love with nowhere to go. You want to protect them, to fix this, to keep them, and you can't. That energy has to go somewhere. Feeling angry doesn't make you a bad person. It makes you a person who loves."}, {"k": "big", "h": "Where do you feel it?", "sub": "Jaw, chest, hands, stomach.", "say": "Let's notice it together. Where do you feel your anger in your body? Your jaw, your chest, your hands, your stomach. Put a hand there, and just notice.", "beats": ["Let's notice it together.", "Where do you feel your anger in your body?", "Your jaw, your chest, your hands, your stomach.", {"t": "Put a hand there, and just notice.", "w": 10}]}, {"k": "points", "h": "Safe ways to let it move", "items": [["Move your body", "Walk fast, climb stairs, squeeze a towel"], ["Write it out", "Then tear it up, or keep it"], ["Let your voice out", "Into a pillow, or alone in the car"], ["Talk to someone safe", "A friend, a chaplain, a counselor"]], "say": "Anger needs a way to move. Move your body. Walk fast, climb the stairs, shake out your hands. Squeeze something and let it go, a towel, a pillow, your own fists. Write it all out, then tear it up, or keep it. Let your voice out, into a pillow, or alone in the car. Or talk to someone safe, a friend, a chaplain, a counselor."}, {"k": "breathe", "h": "Let it settle", "sub": "A long breath out, like a sigh.", "hold": 20, "say": "Now let your body settle a little. Breathe in through your nose. And let a long breath out through your mouth, like a sigh. Again, as many times as you need."}, {"k": "words", "h": "Name it, then the love under it", "items": ["I am angry that...", "Because I love..."], "sub": "Out loud, quietly, or on paper.", "say": "Try finishing two sentences. I am angry that. And then, because I love. Say them quietly, or write them down.", "beats": ["Try finishing two sentences.", "I am angry that.", "And then, because I love.", {"t": "Say them quietly, or write them down.", "w": 14}]}, {"k": "card", "title": "If anger gets too big", "body": "Step away before words or hands can hurt. Call your hospice, day or night. For your own crisis, call or text 988. If anyone is in danger right now, call 911.", "say": "If anger ever feels too big, step away before words or hands can hurt someone. Call your hospice, day or night. They hear this often. If you are in crisis yourself, call or text 988. If anyone is in danger right now, call 911."}, {"k": "big", "h": "Your anger has a place. So do you.", "say": "Your anger has a place here. It can move through you without taking over. When it passes, be gentle with yourself. Come back to this whenever you need it."}]},
        {"id": "wl-s-guilt", "n": 14, "title": "The Guilt That Visits", "mins": 4, "blurb": "When guilt keeps visiting, and what it may be missing.", "sources": ["tangney"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "The Guilt That Visits", "sub": "It often comes from love.", "say": "Guilt has a way of visiting when you are tired and grieving. If it has been visiting you, this is for you."}, {"k": "words", "h": "Thoughts that often visit", "items": ["I should have noticed sooner.", "I moved them to a facility.", "I lost my patience today.", "Part of me wishes it were over."], "say": "Many caregivers hear thoughts like these. I should have noticed sooner. I moved them to a facility. I lost my patience today. Part of me wishes it were over. If any of these are yours, you are in good company."}, {"k": "story", "title": "A Betrayal of the Mind", "lines": ["A woman in memory care told anyone who would listen that her children had stolen everything and dumped her there.", "Her family had tried home health, day programs, and live-in help first. They visited almost every day.", "My team and I helped them see her accusations as the illness, and gave them permission to set boundaries with their own guilt."], "lesson": "An illness can rewrite love as a crime story. The love is still true.", "note": "Names and details changed", "hold": 2, "say": "I once sat with a family whose mother lived in memory care. She told anyone who would listen that her children had stolen everything and dumped her there. But she had been found outside, lost, more than once. They had tried every other option first, home health, day programs, live-in help. They visited almost every day. My team and I helped them see that her accusations were the illness, not their failure. We gave them permission to set boundaries with their own guilt. And they found some peace, knowing they were humans doing an impossible thing."}, {"k": "big", "h": "Guilt and shame are different.", "sub": "Guilt: I did something. Shame: I am something.", "say": "It helps to know the difference. Guilt says, I did something I regret. Shame says, I am bad. Guilt can point you toward making something right. Shame only weighs you down, and it is rarely telling the truth."}, {"k": "points", "h": "Look again at what you did", "items": [["The move to a facility", "Often a choice to keep them safe"], ["Losing your patience", "A tired body, not a lack of love"], ["Wishing it were over", "Often wishing their suffering would end"], ["I should have...", "You know now what you couldn't then"]], "say": "Look again at what guilt is pointing to. A move to a facility is often a choice to keep someone safe. Losing your patience usually means a tired body, not a lack of love. Wishing it were over is very common, and it often means wishing their suffering would end. And I should have, usually means you know now what you couldn't know then."}, {"k": "words", "h": "Say what you were trying to do.", "items": ["I was trying to keep them safe.", "I was so tired.", "I wanted the suffering to stop."], "sub": "Your own words are best.", "say": "Let's try something. Pick the guilt that visits you most. Now say what you were really trying to do, in your own words. Take your time.", "beats": ["Let's try something.", "Pick the guilt that visits you most.", "Now say what you were really trying to do, in your own words.", {"t": "Take your time.", "w": 14}]}, {"k": "words", "h": "If something needs repair", "items": ["I'm sorry I snapped.", "I was tired, and I love you.", "I forgive myself, too."], "say": "If something needs repair, keep it simple. I'm sorry I snapped. I was tired, and I love you. And then, the harder one, I forgive myself, too."}, {"k": "card", "title": "When guilt feels heavy", "body": "Tell your hospice team, day or night. Chaplains and social workers hear this often. If you have thoughts of ending your life, call or text 988. If anyone is in danger right now, call 911.", "say": "If guilt feels too heavy to carry, tell your hospice team, day or night. Chaplains and social workers hear this often. If wishing it were over ever turns into thoughts of ending your own life, call or text 988. If anyone is in danger right now, call 911."}, {"k": "big", "h": "Guilt can visit. It doesn't have to stay.", "say": "Guilt may visit again. When it does, notice it, name what you were really trying to do, and let it go on its way. You are doing a hard thing, with love."}]},
        {"id": "wl-s-relief", "n": 15, "title": "Relief and Grief Together", "mins": 4, "blurb": "Relief and grief can sit side by side. Both are true.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Relief and Grief Together", "sub": "Both can be true.", "say": "Some people feel relief and grief at the same time, and wonder if that is allowed. If that is you, this is for you."}, {"k": "big", "h": "Relief is a common part of grief.", "sub": "It doesn't cancel your love.", "say": "After a long road, many people feel relief. Relief that the suffering is ending, or has ended. Relief that the nights of worry are done. Relief often sits right next to grief, and it doesn't cancel your love."}, {"k": "points", "h": "Relief can sound like", "items": [["They aren't hurting anymore", "Their suffering is over"], ["I can sleep again", "The long watch is done"], ["A hard relationship eased", "Old tension can finally rest"], ["I can breathe", "Even while I cry"]], "say": "Relief can sound like, they aren't hurting anymore. Or, I can sleep again. Sometimes it comes when a hard relationship finally eases, and old tension can rest. Sometimes it is simply, I can breathe, even while I cry."}, {"k": "story", "title": "He Came to Collect", "lines": ["I visit Evelyn in memory care. Her son had stolen from her in the past.", "When he came back wanting money, she said no, and her family took steps to protect her.", "A couple of weeks later she told me, \"I am sad. He is my boy. But I feel safer. Like I can breathe.\""], "lesson": "Sadness and safety can sit side by side.", "note": "From a Grounded story by Chris Joy", "hold": 2, "link": {"href": "https://chri5j0y.substack.com/p/he-came-to-collect", "label": "Read the Full Story: He Came to Collect"}, "say": "I visit a woman named Evelyn in memory care. Her son had stolen from her in the past, and when he came back wanting money, she said no. With help, her family took steps to protect her, and he left. A couple of weeks later, she told me, I am sad. He is my boy. But I feel safer. Like I can breathe."}, {"k": "big", "h": "Hold both.", "sub": "One hand for each.", "say": "Let's make room for both. Put one hand on your chest, for the grief. Put the other on your stomach, for the relief. Let both hands rest there, and breathe.", "beats": ["Let's make room for both.", "Put one hand on your chest, for the grief.", "Put the other on your stomach, for the relief.", {"t": "Let both hands rest there, and breathe.", "w": 12}]}, {"k": "words", "h": "Words for both", "items": ["I miss them, and I'm relieved.", "I'm sad, and I can breathe.", "I loved them, and it was hard."], "sub": "And, not but.", "say": "Notice the little word and. I miss them, and I'm relieved. I'm sad, and I can breathe. I loved them, and it was hard. Say the one that fits, or make your own.", "beats": ["Notice the little word and.", "I miss them, and I'm relieved.", "I'm sad, and I can breathe.", "I loved them, and it was hard.", {"t": "Say the one that fits, or make your own.", "w": 10}]}, {"k": "points", "h": "When others don't understand", "items": [["You don't owe an explanation", "Relief can stay private"], ["Find one safe listener", "A friend, a chaplain, a grief group"], ["Expect it to shift", "Relief and grief can trade places"]], "say": "Not everyone will understand. You don't owe anyone an explanation. Your relief can stay private if you want it to. Find one safe listener, a friend, a chaplain, a grief group. And expect it to shift. Some days relief is louder, and some days grief is."}, {"k": "big", "h": "Relief and grief can both be love.", "sub": "Let them sit side by side.", "say": "If you ever worry that a vulnerable adult in Minnesota is being harmed, you can call MAARC at 1 844 880 1574. For now, let relief and grief sit side by side, as long as they need. Both can be love. Come back to this whenever you need it."}]},
        {"id": "wl-s-waves", "n": 16, "title": "Grief That Comes in Waves", "mins": 4, "blurb": "How to ride a wave of grief, wherever it finds you.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Grief That Comes in Waves", "sub": "You can ride it.", "say": "Grief often comes in waves. If one has been knocking you over, before a death or after, this is for you."}, {"k": "big", "h": "Waves rise, crest, and pass.", "sub": "Even the big ones.", "say": "A wave of grief can come out of nowhere. A song, a smell, an empty chair. It rises, it crests, and it passes. Fighting it often makes it bigger. Riding it lets it move through you."}, {"k": "points", "h": "Waves often come with", "items": [["Firsts", "Holidays, birthdays, the first spring"], ["Small things", "Their mug, their handwriting"], ["Quiet moments", "Bedtime, the drive home"], ["Good news", "Wanting to tell them"]], "say": "Waves often come with firsts, like holidays, birthdays, the first spring. With small things, like their mug or their handwriting. With quiet moments, at bedtime or on the drive home. Even with good news, when you reach for the phone to tell them."}, {"k": "flow", "h": "Riding a wave", "steps": [["Feel it come", "Here is a wave"], ["Let it crest", "Cry if you need to"], ["Breathe long", "Out longer than in"], ["Watch it go", "Waves pass"]], "say": "Here is how to ride one. Feel it come, and say to yourself, here is a wave. Let it crest. Cry if you need to. Breathe long, with your breath out longer than your breath in. Then watch it go. Waves pass."}, {"k": "breathe", "h": "Ride this one", "sub": "In for four. Out for six.", "hold": 30, "say": "If a wave is here right now, let's ride it together. Let it rise. Breathe in for four. And out for six. Let the tears come if they want to. Keep breathing as it passes."}, {"k": "points", "h": "If a wave hits in public", "items": [["Find a quiet spot", "A restroom, your car, a hallway"], ["Press your feet down", "Feel the floor hold you"], ["Have a line ready", "I'm having a grief moment. I'll be okay."], ["Tears are okay", "Most people understand"]], "say": "If a wave hits in public, find a quiet spot if you can, a restroom, your car, a hallway. Press your feet into the floor and feel it hold you. Have a line ready, like, I'm having a grief moment. I'll be okay. And know that tears are okay. Most people understand."}, {"k": "big", "h": "At the bedside, you can let it show.", "sub": "I'm sad because I love you.", "say": "If a wave hits at the bedside, you don't have to hide it. You can say, I'm sad because I love you. Or step out for a minute, and come back. Try those words now, quietly, so they are ready.", "beats": ["If a wave hits at the bedside, you don't have to hide it.", "You can say, I'm sad because I love you.", "Or step out for a minute, and come back.", {"t": "Try those words now, quietly, so they are ready.", "w": 10}]}, {"k": "words", "h": "A line to keep ready", "items": ["This is a wave. It will pass.", "I can feel this and still be okay."], "say": "Some people keep one line ready for when a wave hits. This is a wave. It will pass. Or, I can feel this and still be okay. Choose one, and say it slowly, three times.", "beats": ["Some people keep one line ready for when a wave hits.", "This is a wave.", "It will pass.", "Or, I can feel this and still be okay.", {"t": "Choose one, and say it slowly, three times.", "w": 12}]}, {"k": "big", "h": "Waves come, and waves go.", "sub": "You are still here.", "say": "If grief ever feels like more than you can carry, your hospice has people to talk with, before a death and after. And you can call or text 988 anytime. Waves come, and waves go. You are still here. Come back to this whenever you need it."}]}
      ] },
      {"id": "willow-sp-calm", "kind": "support", "title": "Calming", "who": "When things heat up or panic rises", "lessons": [
        {"id": "wl-s-panic", "n": 17, "title": "When Panic Rises", "mins": 4, "blurb": "Steady your body when panic or a racing heart hits.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When Panic Rises", "sub": "One breath, one step at a time.", "say": "When your heart is racing, your chest feels tight, or panic comes out of nowhere, this is for you. It helps whether you are keeping watch or you are the one in the bed. Stay with me for a few minutes."}, {"k": "big", "h": "Panic is a wave. Waves pass.", "sub": "Your body is working hard to protect you.", "say": "First, know this. Panic is a wave of alarm moving through the body. It feels huge, and it passes. It is common in hard seasons like this one, and it comes from a body working hard to protect you."}, {"k": "big", "h": "Feet on the floor.", "sub": "Let something hold you up.", "say": "Put both feet flat on the floor. Press down a little, and feel the floor press back. If you are lying down, feel the bed holding your whole weight. Let it hold you.", "beats": ["Put both feet flat on the floor.", "Press down a little, and feel the floor press back.", "If you are lying down, feel the bed holding your whole weight.", {"t": "Let it hold you.", "w": 8}]}, {"k": "words", "h": "Name it.", "items": ["This is panic.", "It feels big, and it will pass.", "I can breathe slowly."], "say": "Now give it a name, out loud or in your head. This is panic. It feels big, and it will pass. I can breathe slowly. Say those words once more, at your own pace.", "beats": ["Now give it a name, out loud or in your head.", "This is panic.", "It feels big, and it will pass.", "I can breathe slowly.", {"t": "Say those words once more, at your own pace.", "w": 10}]}, {"k": "big", "h": "A hand on your chest.", "sub": "Feel the warmth of your own hand.", "say": "Rest one hand flat on your chest. Notice it rise and fall. You can rest the other hand on your belly. Feel the warmth of your own hand, right there.", "beats": ["Rest one hand flat on your chest.", "Notice it rise and fall.", "You can rest the other hand on your belly.", {"t": "Feel the warmth of your own hand, right there.", "w": 10}]}, {"k": "breathe", "h": "A long, slow breath out", "sub": "Out like cooling a spoonful of soup.", "hold": 36, "say": "Now let your breath out grow longer than your breath in. Breathe in through your nose. Then let it out slowly through your lips, like cooling a spoonful of soup. Keep going on your own, hand on your chest, feet on the floor."}, {"k": "points", "h": "If the panic is theirs", "items": [["Sit close, at eye level", "Calm and unhurried"], ["Breathe slowly where they can see", "They may follow your rhythm"], ["Keep words few", "I'm here. Breathe with me."], ["Call the hospice nurse", "Day or night, for any distress"]], "say": "If the panic belongs to the person in the bed, sit close, at their eye level. Breathe slowly where they can see you, so they can follow your rhythm if they want to. Keep your words few. I'm here. Breathe with me. And call the hospice nurse. They have ways to ease breathlessness and fear."}, {"k": "card", "title": "Help is one call away", "body": "If they are struggling to breathe or in distress, call your hospice nurse, day or night. If you are in crisis yourself, call or text 988. If anyone is in danger right now, call 911.", "say": "If the person in the bed is struggling to breathe or in distress, call your hospice nurse, day or night. If you are in crisis yourself, call or text 988. And if anyone is in danger right now, call 911."}, {"k": "big", "h": "You rode the wave.", "sub": "Come back to this anytime.", "say": "You rode the wave. Feet on the floor, a name for it, a hand on your chest, a long breath out. Come back to this as often as you need. That is enough for right now."}]},
        {"id": "wl-s-arguing", "n": 18, "title": "When the Family Is Arguing", "mins": 4, "blurb": "Steps and words to cool a heated room at the bedside.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When the Family Is Arguing", "sub": "Bring the room back to what matters.", "say": "When voices are rising around the bed, or every family talk turns into a fight, this is for you. Here are a few steps, and some words to say, to cool the room."}, {"k": "big", "h": "Strong feelings often come from love.", "sub": "Fear and grief can come out as anger.", "say": "First, this is common. When someone you all love is dying, fear and grief often come out sideways, as anger. A family arguing at the bedside is usually a family that loves the same person very much."}, {"k": "words", "h": "Take it out of the room.", "items": ["Let's step out and talk.", "Can we take this to the kitchen?", "Let's keep this room peaceful for Dad."], "say": "When voices rise, take the talk out of the room. The bedside is a place for gentle voices. You might say, let's step out and talk. Or, can we take this to the kitchen? Pick one, and say it out loud now, so it is ready when you need it.", "beats": ["When voices rise, take the talk out of the room.", "The bedside is a place for gentle voices.", "You might say, let's step out and talk.", "Or, can we take this to the kitchen?", {"t": "Pick one, and say it out loud now, so it is ready when you need it.", "w": 8}]}, {"k": "breathe", "h": "One breath before you answer", "sub": "A calmer voice lowers the whole room.", "hold": 14, "say": "Before you answer anyone, take one slow breath. In. And a long breath out. A calmer voice helps the whole room come down."}, {"k": "points", "h": "One voice at a time", "items": [["One person talks", "Everyone listens to the end"], ["Say it back", "What I hear you saying is..."], ["Start with I", "I'm scared, not you never help"], ["Take a break", "Ten minutes, then come back"]], "say": "Then try one voice at a time. One person talks, and everyone else listens to the end. Say back what you heard, starting with, what I hear you saying is. Start with I. I'm scared is easier to hear than you never help. And if it is still too hot, take a ten minute break, and come back."}, {"k": "words", "h": "Go back to what they want.", "items": ["What would Mom want right now?", "What has she told us matters most?", "Let's read What Matters together."], "say": "When you are stuck, turn back to the person in the bed. Ask, what would Mom want right now? What has she told us matters most? If their wishes are written in What Matters in Willow, read them together. Think of one thing you know matters to them.", "beats": ["When you are stuck, turn back to the person in the bed.", "Ask, what would Mom want right now?", "What has she told us matters most?", "If their wishes are written in What Matters in Willow, read them together.", {"t": "Think of one thing you know matters to them.", "w": 10}]}, {"k": "points", "h": "Ask your hospice to help", "items": [["The social worker", "Can help lead a family meeting"], ["The chaplain", "Can help hold hard talks"], ["One shared plan", "Written down, so all can see it"]], "say": "You don't have to referee this alone. Your hospice social worker or chaplain can help lead a family meeting. You can ask, could you help us talk this through as a family? A calm guide in the room helps everyone be heard. Then write down what you agree on, so everyone can see it."}, {"k": "card", "title": "If things get too heated", "body": "Your hospice team is there day or night, for them and for hard family moments. If you are in crisis yourself, call or text 988. If anyone is in danger right now, call 911.", "say": "Your hospice team is there day or night, for the person in the bed and for hard family moments. If you are in crisis yourself, call or text 988. And if anyone is in danger right now, call 911."}, {"k": "big", "h": "You can disagree and still love each other.", "sub": "The person in the bed is where you all meet.", "say": "You can disagree and still love each other. Come back to the person in the bed. That is where you all meet."}]},
        {"id": "wl-s-restless", "n": 19, "title": "When They're Restless", "mins": 4, "blurb": "Calm presence when the person you love is restless or confused.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When They're Restless", "sub": "Your calm can reach them.", "say": "When the person you love is restless, picking at the sheets, trying to get up, or confused about where they are, this is for you. Here is how to bring calm into the room."}, {"k": "big", "h": "Call the hospice nurse first.", "sub": "Day or night. The nurse can often ease it.", "say": "First, call your hospice nurse, right away, day or night. Restlessness near the end is common, and it can have causes the nurse can look into and ease. You are not bothering anyone. This is exactly what the line is for."}, {"k": "breathe", "h": "Steady yourself", "sub": "Your calm is something they can feel.", "hold": 16, "say": "While you wait, steady yourself. Your calm is something they can feel. Breathe in. And let a long, slow breath out."}, {"k": "points", "h": "Make the room calm", "items": [["Soft light", "A lamp, not the overhead light"], ["Quiet", "TV off, fewer voices at once"], ["Familiar music", "Low, the songs they know"], ["A gentle hand", "Only if it seems welcome"]], "say": "Then make the room calm. Soft light, a lamp instead of the overhead light. Quiet, with the TV off and fewer voices at once. Familiar music, played low. And a gentle hand on their arm or shoulder, only if it seems welcome. If they pull away, that is okay. Your presence nearby still helps."}, {"k": "words", "h": "A low, slow voice", "items": ["It's me. I'm right here.", "You're at home, in your own bed.", "You're safe. I'm staying with you."], "say": "Come close, where they can see you, and speak low and slow. Tell them who is here, and where they are. It's me, I'm right here. You're at home, in your own bed. You're safe, I'm staying with you. Try those words now, softly, the way you would say them to them.", "beats": ["Come close, where they can see you, and speak low and slow.", "Tell them who is here, and where they are.", "It's me, I'm right here.", "You're at home, in your own bed.", "You're safe, I'm staying with you.", {"t": "Try those words now, softly, the way you would say them to them.", "w": 10}]}, {"k": "points", "h": "If they try to get up", "items": [["Move slowly", "Calm hands, no sudden grabs"], ["Go with their feeling", "You want to go home. Tell me."], ["Stay beside them", "Sit close, hold a hand if welcome"], ["Ask the nurse", "How to keep them safe from falls"]], "say": "If they try to get up, move slowly, with calm hands. Go with their feeling instead of arguing with it. If they say they need to go home, you might say, you want to go home. Tell me about home. Stay beside them. And ask the nurse how to keep them safe from falls."}, {"k": "card", "title": "Who to call", "body": "Your hospice nurse, day or night, for restlessness, new confusion, or any change. If you are in crisis yourself, call or text 988. If anyone is in danger right now, call 911.", "say": "Call your hospice nurse, day or night, for restlessness, new confusion, or any change that worries you. If you are in crisis yourself, call or text 988. And if anyone is in danger right now, call 911."}, {"k": "big", "h": "Your steady presence is a comfort.", "sub": "Even when they cannot say so.", "say": "You don't have to fix this alone. Call the nurse, soften the room, slow your voice, and stay close. Your steady presence is a comfort, even when they cannot say so."}]},
        {"id": "wl-s-snap", "n": 20, "title": "When You're About to Snap", "mins": 4, "blurb": "A pause, a safe step away, and a way back.", "sources": ["tangney"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When You're About to Snap", "sub": "Find the pause.", "say": "If you are at the end of your rope, worn out, and one moment away from saying something you will regret, this is for you. Let's find the pause together."}, {"k": "big", "h": "This happens to loving caregivers.", "sub": "It is a sign you are carrying too much.", "say": "First, you are a good person having a hard moment. Many caregivers hit this wall. Feeling close to snapping comes from exhaustion and love stretched thin. It is a signal that you need something too."}, {"k": "big", "h": "Pause before words.", "sub": "One breath between the feeling and the words.", "say": "Let's practice the pause, so it is there when you need it. Close your lips. Let your shoulders drop. Take one long breath out before any word.", "beats": ["Let's practice the pause, so it is there when you need it.", "Close your lips.", "Let your shoulders drop.", {"t": "Take one long breath out before any word.", "w": 8}]}, {"k": "flow", "h": "Safe first, then step away", "steps": [["Make sure they are safe", "Settled in bed or a chair"], ["Step away", "Another room, a few minutes"], ["Cool down", "Let your body settle"], ["Come back", "When your voice is calm again"]], "say": "If the pause isn't enough, step away, safely. First make sure they are safe, settled in bed or in a chair. Then step into another room for a few minutes. Let your body cool down. Come back when your voice is calm again. Stepping away safely is a loving choice."}, {"k": "points", "h": "Cool your body", "items": [["Cold water", "On your wrists and face"], ["Unclench", "Jaw, hands, shoulders"], ["Move", "Walk, shake out your arms"], ["Breathe out long", "Longer out than in"]], "say": "While you are away, cool your body. Run cold water over your wrists, or splash your face. Unclench your jaw, your hands, your shoulders. Walk a little, or shake out your arms. And let each breath out run longer than the breath in."}, {"k": "breathe", "h": "Let it settle", "sub": "In. And a long breath out.", "hold": 20, "say": "Let's do a few together. Breathe in. And a long, slow breath out. Again, at your own pace."}, {"k": "words", "h": "Repair is possible.", "items": ["I'm sorry I raised my voice.", "I was worn out, and that wasn't fair to you.", "I love you."], "sub": "Guilt about a moment can lead to repair.", "say": "If the words already came out, repair is possible. Feeling bad about what you did can lead you back to make it right. It does not make you a bad person. Come back and say it simply. I'm sorry I raised my voice. I was worn out, and that wasn't fair to you. I love you. Say one of these quietly to yourself now, so it is ready.", "beats": ["If the words already came out, repair is possible.", "Feeling bad about what you did can lead you back to make it right.", "It does not make you a bad person.", "Come back and say it simply.", "I'm sorry I raised my voice.", "I was worn out, and that wasn't fair to you.", "I love you.", {"t": "Say one of these quietly to yourself now, so it is ready.", "w": 8}]}, {"k": "points", "h": "Ask for a break", "items": [["Name one person", "Who could sit with them for two hours?"], ["Ask your hospice", "About respite and volunteers"], ["Say it plainly", "I need a break. Can you help?"]], "say": "Then ask for a break. Name one person who could sit with them for two hours. Ask your hospice about respite and volunteers. And say it plainly. I need a break. Can you help? Rest helps you keep going."}, {"k": "card", "title": "If it feels like too much", "body": "Call your hospice, day or night. If you are in crisis yourself, call or text 988. If anyone is in danger right now, call 911.", "say": "If it feels like too much, call your hospice, day or night. They can help. If you are in crisis yourself, call or text 988. And if anyone is in danger right now, call 911."}, {"k": "big", "h": "You are allowed to be human.", "sub": "Pause. Step away. Come back.", "say": "You are carrying something heavy, and you are allowed to be human. Pause, step away, come back. That is how love keeps going."}]},
        {"id": "wl-s-night", "n": 21, "title": "When Fear Comes at Night", "mins": 4, "blurb": "For the middle of the night, when fear gets loud.", "sources": ["kerr"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When Fear Comes at Night", "sub": "You are not alone in the dark.", "say": "It's the middle of the night, and fear has you wide awake. Whether you are keeping watch or you are the one in the bed, this is for you."}, {"k": "big", "h": "Fear is louder at night.", "sub": "Many worries look smaller by daylight.", "say": "Fear often grows louder at night. The house is quiet, you are tired, and every worry feels bigger in the dark. That is common. Many things that feel huge at three in the morning look smaller by daylight."}, {"k": "big", "h": "Turn on a soft light.", "sub": "A lamp, a night light, something gentle.", "say": "Start with light. Turn on a lamp or a night light, something soft. Look around and notice the room as it is right now. Find one familiar thing, and rest your eyes on it.", "beats": ["Start with light.", "Turn on a lamp or a night light, something soft.", "Look around and notice the room as it is right now.", {"t": "Find one familiar thing, and rest your eyes on it.", "w": 8}]}, {"k": "breathe", "h": "Breathe with the quiet", "sub": "Slow in. Slower out.", "hold": 24, "say": "Now breathe with the quiet. Slowly in. And slower still on the way out. Let the night be still around you for a few breaths."}, {"k": "big", "h": "A hand, a voice.", "sub": "I'm here. We're together tonight.", "say": "Now a hand. Rest a hand on your own heart, or on theirs. If you are with them, let them hear your voice. Say softly, I'm here. We're together tonight.", "beats": ["Now a hand.", "Rest a hand on your own heart, or on theirs.", "If you are with them, let them hear your voice.", "Say softly, I'm here.", {"t": "We're together tonight.", "w": 10}]}, {"k": "words", "h": "This can wait until morning.", "items": ["Phone calls and decisions", "Paperwork and plans", "Big talks with family", "Figuring out what comes next"], "sub": "Write it on a scrap of paper by the bed.", "say": "Let's set a few things down for the night. Phone calls and decisions can wait until morning. So can paperwork, plans, and big talks with family. If a worry keeps circling, write it on a scrap of paper by the bed. Name one worry now, and tell it, you can wait until morning.", "beats": ["Let's set a few things down for the night.", "Phone calls and decisions can wait until morning.", "So can paperwork, plans, and big talks with family.", "If a worry keeps circling, write it on a scrap of paper by the bed.", {"t": "Name one worry now, and tell it, you can wait until morning.", "w": 12}]}, {"k": "big", "h": "Dreams of loved ones", "sub": "Many people find these dreams comforting.", "say": "Some people near the end see or dream of loved ones who have died, often at night. Many find these dreams and visions comforting. If the person you love tells you about one, you can simply listen, and ask, who did you see? If anything they see seems to frighten them, call the hospice nurse."}, {"k": "points", "h": "Through the night", "items": [["Your hospice line", "Answered day or night"], ["988", "Call or text, for your own crisis"], ["911", "For danger right now"]], "say": "You are not alone tonight. Your hospice line is answered through the night, for any change or worry about them, and for a frightened caregiver too. If you are in crisis yourself, call or text 988. And call 911 for danger right now."}, {"k": "big", "h": "Morning will come.", "sub": "This is enough for tonight.", "say": "Morning will come. For now, a soft light, a slow breath, a hand. Rest if you can. This is enough for tonight."}]}
      ] },
      {"id": "willow-sp-meditate", "kind": "support", "title": "Meditation", "who": "Guided quiet, for the chair beside the bed or the bed itself", "lessons": [
        {"id": "wl-s-resting", "n": 22, "title": "Resting Breath", "mins": 4, "blurb": "A slow, gentle rest for the person in the bed, and anyone beside them.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Resting Breath", "sub": "Nothing to do. Only rest.", "say": "This one is for resting. If you are lying in bed, it was made for you. And if you are sitting nearby, you are welcome to rest along with it."}, {"k": "big", "h": "There is nothing you need to do.", "sub": "You can simply rest.", "say": "There is nothing you need to do right now. Nothing to finish. Nothing to say. You can simply rest, and let these words keep you company."}, {"k": "big", "h": "Let the bed hold you.", "say": "Let the bed hold you. Feel the pillow under your head. Feel the blanket resting on you. Let your weight sink in, a little at a time.", "beats": ["Let the bed hold you.", "Feel the pillow under your head.", "Feel the blanket resting on you.", {"t": "Let your weight sink in, a little at a time.", "w": 12}]}, {"k": "breathe", "h": "Let your breath come on its own", "sub": "No counting. No effort.", "hold": 36, "say": "Now notice your breath. You don't need to change it. Let it come in on its own. And let it go out on its own. Each breath out can be a little softer."}, {"k": "big", "h": "Let your hands be heavy.", "say": "Let your hands rest right where they are. Let your shoulders soften into the bed. Let your face soften, around your eyes and around your mouth. Nothing to hold up now.", "beats": ["Let your hands rest right where they are.", "Let your shoulders soften into the bed.", "Let your face soften, around your eyes and around your mouth.", {"t": "Nothing to hold up now.", "w": 12}]}, {"k": "words", "h": "Words to rest in", "items": ["It is okay to rest.", "You are not alone.", "You are so loved."], "say": "Here are a few words to rest in. It is okay to rest. You are not alone. You are so loved. Let those words settle over you like a blanket.", "beats": ["Here are a few words to rest in.", "It is okay to rest.", "You are not alone.", "You are so loved.", {"t": "Let those words settle over you like a blanket.", "w": 12}]}, {"k": "breathe", "h": "Rest with the breath", "sub": "Softly in. Softly out.", "hold": 40, "say": "Rest here with your breath for a while. Softly in. Softly out. If your mind drifts, let it drift. If you fall asleep, that is fine too."}, {"k": "big", "h": "Rest as long as you like.", "sub": "You are held.", "say": "Rest as long as you like. You are held, by this bed, and by the people who love you. And if you are sitting nearby and anything about their comfort worries you, call your hospice nurse, day or night."}]},
        {"id": "wl-s-kind", "n": 23, "title": "Kind Words to Send", "mins": 5, "blurb": "Send kind wishes to them, to yourself, and to everyone who loves them.", "sources": ["metta"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Kind Words to Send", "sub": "Simple wishes, sent with love.", "say": "When you want to give something and there is nothing left to fix, this is for you. We will send kind wishes, one person at a time."}, {"k": "big", "h": "Kind wishes are always yours to give.", "sub": "Near or far, awake or asleep.", "say": "This is an old and simple practice. You say a few kind lines, slowly, and mean them as much as you can. You can do it beside the bed, in the hallway, or miles away. It gives your love somewhere to go."}, {"k": "breathe", "h": "Settle first", "sub": "In softly. A longer breath out.", "hold": 20, "say": "First, let's settle. Let your breath slow down. Breathe in. And a longer breath out."}, {"k": "words", "h": "For the one in the bed", "items": ["May you be at peace.", "May you be comfortable.", "May you feel how loved you are."], "say": "Start with the person in the bed. Look at them gently, or picture their face. May you be at peace. May you be comfortable. May you feel how loved you are. Say them again, slowly, in your own heart.", "beats": ["Start with the person in the bed.", "Look at them gently, or picture their face.", "May you be at peace.", "May you be comfortable.", "May you feel how loved you are.", {"t": "Say them again, slowly, in your own heart.", "w": 14}]}, {"k": "words", "h": "For yourself", "items": ["May I be at peace.", "May I be gentle with myself.", "May I have the strength I need."], "say": "Now turn the same kindness toward yourself. This part can feel strange, and that is common. May I be at peace. May I be gentle with myself. May I have the strength I need. Let one of those land, even a little.", "beats": ["Now turn the same kindness toward yourself.", "This part can feel strange, and that is common.", "May I be at peace.", "May I be gentle with myself.", "May I have the strength I need.", {"t": "Let one of those land, even a little.", "w": 12}]}, {"k": "words", "h": "For the family", "items": ["May you be at peace.", "May you be gentle with each other.", "May you know you are not alone."], "say": "Now picture the family, everyone who loves this person. Include the ones who are easy to love, and the ones who are harder. May you be at peace. May you be gentle with each other. May you know you are not alone. Hold them all in mind for a moment.", "beats": ["Now picture the family, everyone who loves this person.", "Include the ones who are easy to love, and the ones who are harder.", "May you be at peace.", "May you be gentle with each other.", "May you know you are not alone.", {"t": "Hold them all in mind for a moment.", "w": 12}]}, {"k": "words", "h": "For someone far away", "items": ["May you be at peace.", "May you feel close, even from far away.", "May you know you are part of this."], "say": "Now someone far away. Someone who could not be here, or who is on the way. May you be at peace. May you feel close, even from far away. May you know you are part of this. Send it to them now, in your own words if you like.", "beats": ["Now someone far away.", "Someone who could not be here, or who is on the way.", "May you be at peace.", "May you feel close, even from far away.", "May you know you are part of this.", {"t": "Send it to them now, in your own words if you like.", "w": 12}]}, {"k": "breathe", "h": "Rest in the kindness", "sub": "Everyone, all at once.", "hold": 24, "say": "Now picture all of them together, and yourself in the middle. Breathe in. And breathe out kindness, to all of you."}, {"k": "big", "h": "You can send these anytime.", "sub": "Day or night, near or far.", "say": "That is the whole practice. A few quiet words, full of love. You can send them anytime, day or night, from anywhere. Come back to them whenever you need to."}]},
        {"id": "wl-s-safe", "n": 24, "title": "A Safe Place in Your Mind", "mins": 5, "blurb": "Visit a calm place of your choosing, with all five senses.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "A Safe Place in Your Mind", "sub": "A few minutes somewhere calm.", "say": "When the room feels heavy and you need a few minutes of calm, this is for you. We will visit a peaceful place, right in your mind."}, {"k": "big", "h": "Your mind can take you somewhere calm.", "sub": "You stay in charge the whole time.", "say": "Your mind can take you somewhere calm, even while you stay right where you are. When you picture a peaceful place in detail, your body often settles too. You stay in charge the whole time, and you can open your eyes whenever you like."}, {"k": "breathe", "h": "Settle in", "sub": "Eyes closed, or resting on one spot.", "hold": 18, "say": "Let your eyes close, or rest them on one spot. Breathe in slowly. And let a long breath out."}, {"k": "points", "h": "Choose your place", "items": [["A porch", "Early morning, a warm cup in your hands"], ["A lake", "Water lapping at the shore"], ["A kitchen", "Something good in the oven"], ["Anywhere you feel at ease", "Real, or one you imagine"]], "say": "Choose a place where you feel at ease. Maybe a porch in the early morning. A lake, with water lapping at the shore. A kitchen, with something good in the oven. It can be real, or one you imagine. Choose one now, and picture yourself there.", "beats": ["Choose a place where you feel at ease.", "Maybe a porch in the early morning.", "A lake, with water lapping at the shore.", "A kitchen, with something good in the oven.", "It can be real, or one you imagine.", {"t": "Choose one now, and picture yourself there.", "w": 10}]}, {"k": "big", "h": "What do you see?", "say": "Look around your place. Notice the colors, and the light. What is close to you, and what is far away?", "beats": ["Look around your place.", "Notice the colors, and the light.", {"t": "What is close to you, and what is far away?", "w": 12}]}, {"k": "big", "h": "What do you hear?", "say": "Now listen. Maybe birds, or wind, or water, or a voice you love. Let the sounds come to you.", "beats": ["Now listen.", "Maybe birds, or wind, or water, or a voice you love.", {"t": "Let the sounds come to you.", "w": 12}]}, {"k": "big", "h": "What do you feel, smell, and taste?", "say": "Feel the air on your skin, warm or cool. Feel what is under your feet, or what you are sitting on. Breathe in the smell of this place. Maybe there is a taste too: coffee, fresh bread, clean air.", "beats": ["Feel the air on your skin, warm or cool.", "Feel what is under your feet, or what you are sitting on.", "Breathe in the smell of this place.", {"t": "Maybe there is a taste too: coffee, fresh bread, clean air.", "w": 12}]}, {"k": "breathe", "h": "Rest here", "sub": "Nothing to do. Just be here.", "hold": 36, "say": "Rest in your place for a little while. Breathe slowly. Let it hold you."}, {"k": "words", "h": "Bring one thing back", "items": ["A color.", "A sound.", "A word, like calm or home."], "say": "Before you leave, choose one thing to bring back with you. A color. A sound. Or a word, like calm, or home. Remembering it can take you back here anytime.", "beats": ["Before you leave, choose one thing to bring back with you.", "A color.", "A sound.", "Or a word, like calm, or home.", {"t": "Remembering it can take you back here anytime.", "w": 8}]}, {"k": "big", "h": "Come back gently.", "sub": "Your place will be there.", "say": "Now come back gently. Feel the chair or the bed under you. Wiggle your fingers and toes. Open your eyes when you are ready. Your place will be there whenever you need it."}]},
        {"id": "wl-s-sleep", "n": 25, "title": "Rest for a Tired Body", "mins": 5, "blurb": "Let worries wait and let your body sink toward sleep.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Rest for a Tired Body", "sub": "Letting go into sleep.", "say": "Trying to sleep in a chair by the bed, or at home between shifts? This is for you. Let's help your body let go."}, {"k": "big", "h": "Your only job right now is rest.", "sub": "Tired body, watchful mind.", "say": "Sleep can be hard to find when someone you love is so sick. Your body is tired, and your mind keeps watch. That is common, and it comes from love. For the next few minutes, your only job is rest."}, {"k": "words", "h": "What can wait until morning", "items": ["The calls to make.", "The list of things to do.", "The questions for the team."], "sub": "Anything urgent: call your hospice, day or night.", "say": "First, set the worries down. Most of what is on your mind can wait until morning. The calls, the lists, the questions for the team. If something can't wait, call your hospice, day or night, then come back to rest. Picture writing each worry on a note, and setting it on the table. Name what can wait, and let it wait.", "beats": ["First, set the worries down.", "Most of what is on your mind can wait until morning.", "The calls, the lists, the questions for the team.", "If something can't wait, call your hospice, day or night, then come back to rest.", "Picture writing each worry on a note, and setting it on the table.", {"t": "Name what can wait, and let it wait.", "w": 14}]}, {"k": "breathe", "h": "Let your breath slow down", "sub": "A long, easy breath out.", "hold": 24, "say": "Get as comfortable as you can, in the chair or in your bed. Breathe in gently. And let a long, easy breath go out. Let each breath out be a little slower than the last."}, {"k": "big", "h": "Let your body grow heavy.", "say": "Now let your body grow heavy. Your legs, heavy and still. Your arms, heavy and loose. Let the chair or the bed take all your weight.", "beats": ["Now let your body grow heavy.", "Your legs, heavy and still.", "Your arms, heavy and loose.", {"t": "Let the chair or the bed take all your weight.", "w": 12}]}, {"k": "big", "h": "Let your face go soft.", "say": "Let your forehead smooth out. Let your jaw drop a little. Let your tongue rest. Let the space around your eyes go soft.", "beats": ["Let your forehead smooth out.", "Let your jaw drop a little.", "Let your tongue rest.", {"t": "Let the space around your eyes go soft.", "w": 10}]}, {"k": "words", "h": "If your mind wakes up", "items": ["Not now.", "That can wait.", "Back to rest."], "say": "If your mind wakes up with a worry, that is okay. Tell it kindly, not now. That can wait. Then come back to the heaviness of your body.", "beats": ["If your mind wakes up with a worry, that is okay.", "Tell it kindly, not now.", "That can wait.", {"t": "Then come back to the heaviness of your body.", "w": 8}]}, {"k": "breathe", "h": "Drift", "sub": "Nothing to do. Nowhere to be.", "hold": 40, "say": "Now just breathe and drift. You don't have to fall asleep. Resting with your eyes closed is good for you too. Let go a little more with each breath out."}, {"k": "big", "h": "You have done enough for today.", "sub": "Rest now.", "say": "You have done enough for today. Rest now. If you wake in the night, come back to this, or simply let your breath grow long and slow again."}]},
        {"id": "wl-s-scan", "n": 26, "title": "A Body Scan in the Chair", "mins": 4, "blurb": "Notice your body part by part, and soften what is tight.", "sources": ["mbsr"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "A Body Scan in the Chair", "sub": "Noticing, from the ground up.", "say": "For the hours in the chair beside the bed, this one is for you. We will move slowly through your body, noticing as we go."}, {"k": "big", "h": "Notice, then soften.", "sub": "Whatever you find is okay.", "say": "This is a body scan. You move your attention slowly through your body, one part at a time. You notice what is there: tight, tired, warm, or nothing much at all. Whatever you find is okay. Where you can, you let it soften."}, {"k": "breathe", "h": "Settle into the chair", "sub": "In. And a longer breath out.", "hold": 18, "say": "Sit back in the chair. Let your breath slow down. Breathe in. And a longer breath out."}, {"k": "big", "h": "Your feet", "say": "Start with your feet. Feel them on the floor, or in your shoes. Notice warmth, or coolness, or pressure. Just notice, and let them rest.", "beats": ["Start with your feet.", "Feel them on the floor, or in your shoes.", "Notice warmth, or coolness, or pressure.", {"t": "Just notice, and let them rest.", "w": 10}]}, {"k": "big", "h": "Your legs", "say": "Now your legs. Feel the backs of your legs against the seat. If your knees or calves feel tight, let them soften.", "beats": ["Now your legs.", "Feel the backs of your legs against the seat.", {"t": "If your knees or calves feel tight, let them soften.", "w": 10}]}, {"k": "big", "h": "Your back", "say": "Move up to your back. Notice where it touches the chair, and where it doesn't. Long hours in a chair can leave it stiff. Breathe toward any tight place, and let it ease.", "beats": ["Move up to your back.", "Notice where it touches the chair, and where it doesn't.", "Long hours in a chair can leave it stiff.", {"t": "Breathe toward any tight place, and let it ease.", "w": 12}]}, {"k": "big", "h": "Your hands", "say": "Now your hands. They may be resting in your lap, or holding a hand on the bed. Notice them. Let your fingers loosen.", "beats": ["Now your hands.", "They may be resting in your lap, or holding a hand on the bed.", "Notice them.", {"t": "Let your fingers loosen.", "w": 10}]}, {"k": "big", "h": "Your shoulders and jaw", "say": "Now your shoulders. Many people carry worry here. Let them drop, just a little. And your jaw. Let your teeth part, and your jaw go loose.", "beats": ["Now your shoulders.", "Many people carry worry here.", "Let them drop, just a little.", "And your jaw.", {"t": "Let your teeth part, and your jaw go loose.", "w": 12}]}, {"k": "breathe", "h": "Your whole body", "sub": "Breathing here, beside them.", "hold": 30, "say": "Now feel your whole body at once, sitting here beside them. Breathing in. Breathing out. Let the softening spread."}, {"k": "big", "h": "Come back to this anytime.", "sub": "Your body is carrying a lot.", "say": "Your body is carrying a lot right now. A few minutes of noticing is a kind thing to give it. Come back to this whenever you sit down in that chair."}]}
      ] },
      {"id": "willow-sp-talk", "kind": "support", "title": "Talking Things Through", "who": "Words for the talks that matter most", "lessons": [
        {"id": "wl-s-children", "n": 27, "title": "Talking With Children About Dying", "mins": 4, "blurb": "Honest, simple words for the children in your family.", "sources": ["dougy"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Talking With Children About Dying", "sub": "The truth, told gently.", "say": "When there are children in your family, and someone they love is dying, this is for you. Children do best with the truth, told gently."}, {"k": "big", "h": "Children notice more than we think.", "sub": "Simple truth helps them feel safe.", "say": "Children notice more than we think. They feel the hush in the house and see the tired faces. When no one explains, they often fill the gaps with something scarier, or decide it is somehow their fault. Simple, honest words help them feel safe."}, {"k": "words", "h": "Use the real words.", "items": ["Grandpa is very sick.", "His body can't get better.", "He is dying.", "When he dies, his body will stop working."], "sub": "Say dying and died.", "say": "Use the real words, even though they are hard to say. Grandpa is very sick. His body can't get better. He is dying. Words like sleeping, or lost, or gone away can confuse a child, or even make them afraid to fall asleep. Dying and died are clear, and clear is kind."}, {"k": "words", "h": "Practice your first sentence.", "items": ["I need to tell you something sad.", "Grandma is dying."], "say": "Let's practice. Think of the child you need to talk with. Say their name, and then one true, simple sentence, out loud or in your head.", "beats": ["Let's practice.", "Think of the child you need to talk with.", {"t": "Say their name, and then one true, simple sentence, out loud or in your head.", "w": 12}]}, {"k": "points", "h": "Short answers, and let them ask", "items": [["Answer what they ask", "Then pause and listen"], ["Ask what they think", "What have you noticed?"], ["I don't know is okay", "Honest is better than perfect"], ["They may ask again", "Repeating helps them understand"]], "say": "Keep your answers short, and let them ask. Answer what they ask, then pause and listen. Ask what they think, what have you noticed. It's okay to say, I don't know. And expect the same question again, and again. Repeating is how children make sense of big news."}, {"k": "points", "h": "Let them be part of it", "items": [["Visit, if they want to", "Tell them first what they will see"], ["Give them a way to help", "A drawing, a song, holding a hand"], ["A card counts too", "If they would rather not visit"]], "say": "Let them be part of it, if they want to be. Before a visit, tell them what they will see, the bed, the quiet breathing, any equipment in the room. Give them a way to help, a drawing for the wall, a song, a hand to hold. If they would rather not visit, a card or a message counts too. Let them choose."}, {"k": "points", "h": "Their grief comes in bursts", "items": [["Sad, then playing", "That is how children grieve"], ["Play helps them work it out", "Even playing hospital or funeral"], ["Questions at odd times", "Bedtime, the car, the bath"], ["Tell their school", "So teachers can watch and help"]], "say": "Children's grief often comes in bursts. They may cry, then run off to play a minute later. That is normal. Play is how they work things out, even playing hospital or funeral. Big questions come at odd times, at bedtime, in the car. And tell their school, so teachers can watch for hard days and help."}, {"k": "big", "h": "Your honesty and your arms are enough.", "sub": "It is okay to cry together.", "say": "You don't need perfect words. It's okay to cry in front of them. It shows them that sadness is what love feels like right now. Your honesty and your arms around them are enough. And your hospice team can help you find words for children. Just ask."}]},
        {"id": "wl-s-matters", "n": 28, "title": "Saying What Matters", "mins": 4, "blurb": "Four things worth saying, and how to say the ones that are true.", "sources": ["byock4"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Saying What Matters", "sub": "While there is still time.", "say": "When there are things you want to say before it's too late, this is for you. We'll go a little deeper than the words themselves."}, {"k": "words", "h": "The Four Things", "items": ["Please forgive me.", "I forgive you.", "Thank you.", "I love you."], "sub": "Then, when it feels right: goodbye.", "say": "Many people near the end of life, and the people who love them, find four things they want to say. Please forgive me. I forgive you. Thank you. I love you. And then, when it feels right, goodbye. Let's look at what each one carries."}, {"k": "points", "h": "What each one carries", "items": [["Please forgive me", "Owning your part, simply"], ["I forgive you", "Setting down what you carried"], ["Thank you", "Naming one real thing"], ["I love you", "Plain, and out loud"]], "say": "Please forgive me is about owning your part. It can be one sentence. I'm sorry for the years I stayed away. I forgive you sets down something you have carried, sometimes for a long time. Thank you is strongest when it names one real thing. And I love you needs nothing added."}, {"k": "big", "h": "Say the ones that are true.", "sub": "Every family is different.", "say": "You don't have to say all four. Say the ones that are true for you. If forgiveness isn't ready yet, that is honest, and it's okay. A true thank-you means more than a forced I forgive you."}, {"k": "story", "title": "The Wisdom They Share", "lines": ["Marcus had spent twenty-eight years in prison. In his final days, no one came to visit.", "He told me, Real strength is owning what you did. Asking forgiveness.", "Then: Tell the people you love that you love them while you still can. Don't wait until the end of the road like I did."], "lesson": "The words are worth saying while there is still time.", "note": "Names and details changed", "hold": 2, "say": "I once sat with a man named Marcus in his final days. He had spent twenty-eight years in prison, and no one came to visit. He told me he used to think being tough was the only way to survive. Lying there, he saw how wrong he was. Real strength is owning what you did, he said. Asking forgiveness. Then he looked straight at me. Tell the people you love that you love them while you still can. Don't wait until the end of the road like I did."}, {"k": "words", "h": "Choose one to say.", "items": ["I'm sorry for...", "I forgive you for...", "Thank you for...", "I love you because..."], "say": "Now choose one of the four that is true for you. Finish the sentence, in your head or out loud. Take your time.", "beats": ["Now choose one of the four that is true for you.", "Finish the sentence, in your head or out loud.", {"t": "Take your time.", "w": 14}]}, {"k": "points", "h": "If speaking is hard", "items": [["Write it", "A letter, a card, a note"], ["Read it to them", "Or let them read it"], ["Say it in pieces", "One thing today, one tomorrow"], ["Ask for support", "A chaplain or social worker can sit with you"]], "say": "If the words won't come out loud, write them. A letter, a card, a few lines on a napkin. You can read it to them, or let them read it. You can say it in pieces, one thing today and another tomorrow. And your hospice chaplain or social worker can sit with you while you say it."}, {"k": "big", "h": "Goodbye comes when it feels right.", "sub": "A word, or a hand held a little longer.", "say": "Goodbye can come last, when it feels right. For some families it is a word. For others it is a hand held a little longer. Both count."}, {"k": "big", "h": "Say one true thing today.", "say": "There may never be a perfect moment. A true one is enough. Say one of them today, while you still can."}]},
        {"id": "wl-s-dying", "n": 29, "title": "When They Want to Talk About Dying", "mins": 4, "blurb": "How to follow their lead when they bring it up.", "sources": ["convo"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When They Want to Talk About Dying", "sub": "Follow their lead.", "say": "When the person you love starts talking about dying, and everything in you wants to change the subject, this is for you."}, {"k": "big", "h": "Changing the subject is a common reflex.", "sub": "It comes from love.", "say": "When they say, I don't think I'm getting better, it's common to jump in. Don't talk like that. You're going to be fine. That reflex comes from love. And it can close a door they just found the courage to open."}, {"k": "big", "h": "Talking about it is often a relief.", "sub": "You only have to stay.", "say": "Many people near the end already know. Carrying it alone, while everyone around them pretends, can be lonely. Talking about it is often a relief to them. You don't have to fix anything. You only have to stay in the conversation."}, {"k": "words", "h": "Words that keep the door open", "items": ["Tell me more.", "What are you thinking about?", "What has that been like?", "What worries you most?"], "say": "A few words can keep the door open. Tell me more. What are you thinking about. What has that been like for you. What worries you most. Then let them talk, and let the pauses be long."}, {"k": "big", "h": "Practice staying.", "say": "Let's practice. Picture them saying, I think I'm dying. Notice the urge to rush in with comfort. Take one slow breath instead. Then say it softly, tell me more.", "beats": ["Let's practice.", "Picture them saying, I think I'm dying.", "Notice the urge to rush in with comfort.", "Take one slow breath instead.", {"t": "Then say it softly, tell me more.", "w": 10}]}, {"k": "story", "title": "A Quiet Doorway", "lines": ["A retired engineer had banned the word hospice. For weeks we talked bridges and puzzles.", "One quiet evening he asked, They brought me here to die, didn't they? I answered honestly, but gently.", "He talked about his wife and his children. His family said it gave them back their father."], "lesson": "When they open the door, walk through it gently.", "note": "Names and details changed", "hold": 2, "say": "I once sat with a retired engineer who had banned the word hospice. No talk of dying. So for weeks we talked bridges and puzzles, and trust came in layers. One quiet evening he looked straight at me and said, They brought me here to die, didn't they? There was no panic in his voice. I answered honestly, but gently. Over the next days he talked about the wife he had lost, and the children he hoped would remember his steady hands. His family later told me those conversations gave them back their father."}, {"k": "points", "h": "What can come next", "items": [["Listen more than you talk", "Silence is okay"], ["Ask what matters most now", "People, places, wishes"], ["It's okay to cry", "You can be sad together"], ["Bring in your hospice team", "They help with these talks"]], "say": "Listen more than you talk. Silence is okay. When it fits, ask what matters most to them now, the people they want near, the wishes they want kept. It's okay to cry. You can be sad together. And your hospice nurse, social worker, and chaplain are good company for these talks."}, {"k": "card", "title": "If they say they want to die", "body": "Being ready is common near the end. It is not the same as a plan to end their life. If they talk about ending their life, tell your hospice team. For your own crisis, call or text 988. For danger right now, call 911.", "say": "Sometimes they say, I just want to die. Being ready, or tired of waiting, is common near the end, and it is not the same as a plan to end their life. You can still say, tell me more. If they talk about ending their life, tell your hospice team, day or night. If you are struggling yourself, call or text 988. And if anyone is in danger right now, call 911."}, {"k": "big", "h": "You do not need answers. Just stay close.", "say": "You don't need answers. Your willingness to stay in the conversation is the gift. Let them lead, and stay close."}]},
        {"id": "wl-s-ask", "n": 30, "title": "Asking for What You Need", "mins": 4, "blurb": "Asking your hospice team, your people, and the one you love.", "sources": [], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "Asking for What You Need", "sub": "The ask is a gift.", "say": "If you have been carrying most of this on your own, this is for you. Asking is a strength, and it opens doors."}, {"k": "big", "h": "The ask is the gift.", "sub": "It shows people how to help.", "say": "Many caregivers wait until they are worn through before they ask. But the ask is a gift. It shows the people around you how to love you both. Your hospice team wants to know what you need."}, {"k": "points", "h": "Ask your hospice team", "items": [["An extra nurse visit", "When something changes or worries you"], ["A hospice aide", "Help with bathing and personal needs"], ["The chaplain or social worker", "Any faith or none; paperwork, family stress"], ["Respite or a volunteer", "So you can rest or step out"]], "say": "Your hospice team is more than the nurse. You can ask for an extra nurse visit when something changes. A hospice aide, to help with bathing. The chaplain, for anyone, of any faith or none. The social worker, for paperwork, money worries, and family stress. And ask about respite or a volunteer, so you can rest or step away for a while."}, {"k": "story", "title": "If She Is Still Here", "lines": ["On my day off, Jenny texted: It's mom. She's taken a turn. Can you come?", "I offered tomorrow. She wrote back: If she is still here.", "I came right away. Carol died peacefully a few hours after I left."], "lesson": "A plain ask lets people know it matters now.", "note": "From a Grounded story by Chris Joy", "hold": 2, "link": {"href": "https://chri5j0y.substack.com/p/if-she-is-still-here", "label": "Read the Full Story: If She Is Still Here"}, "say": "On a day off, I got a text from Jenny, a daughter whose family I had been visiting for about a year. It's mom. She's taken a turn and not doing well. Can you come? I wrote back that I could come by tomorrow. She answered, Okay. If she is still here. My heart dropped. I wrote, I can come now if that's okay. I was out the door within minutes, and I stayed close to two hours. Carol died peacefully in her sleep a few hours after I left. I almost said tomorrow. I am so glad I did not."}, {"k": "big", "h": "Plain words help people say yes.", "sub": "You do not need to explain or apologize.", "say": "Jenny's ask was plain. Can you come. Plain words like that let people know it matters now. You don't need to explain, or apologize, or wait until you are sure."}, {"k": "words", "h": "Ask family and friends, specifically", "items": ["Can you call the pharmacy for me?", "Can you sit with Mom Saturday morning?", "Can you be the one who updates everyone?", "Can you come now?"], "say": "With family and friends, specific asks work best. Can you call the pharmacy for me. Can you sit with Mom on Saturday morning, so I can sleep. Can you be the one who updates everyone. And sometimes, simply, can you come now."}, {"k": "words", "h": "Name one ask.", "items": ["Can you...?"], "say": "Let's practice. Think of one thing that would help this week. Think of one person who could do it. Now say the ask to yourself, in one plain sentence.", "beats": ["Let's practice.", "Think of one thing that would help this week.", "Think of one person who could do it.", {"t": "Now say the ask to yourself, in one plain sentence.", "w": 12}]}, {"k": "words", "h": "Ask the one you love, too", "items": ["What would make today better?", "Who would you like to see?", "Would you like company, or quiet?", "What would you like to hear?"], "say": "And ask the person in the bed. Their wishes still lead. What would make today better. Who would you like to see. Would you like company, or quiet. What would you like to hear, music, a story, the news from home."}, {"k": "big", "h": "Send one ask today.", "sub": "Your hospice is there day or night.", "say": "Asking lets other people love you both. Send one ask today. And for anything about their comfort that worries you, call your hospice, day or night."}]},
        {"id": "wl-s-far", "n": 31, "title": "When Family Is Far Away", "mins": 4, "blurb": "Ways to be there, and to say goodbye, from far away.", "sources": ["blundon"], "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "When Family Is Far Away", "sub": "Love can travel.", "say": "Whether you are the one far away, or the one at the bedside holding the phone, this is for you."}, {"k": "big", "h": "Being far away is common.", "sub": "It does not measure your love.", "say": "Families are spread out. Work, money, health, travel, or a heart that just can't face it can keep someone away. If that is you, you are not alone. Being far away does not measure your love."}, {"k": "points", "h": "Ways to be there from far away", "items": [["A phone to their ear", "Or a video call, held close"], ["A recorded message", "Played whenever it helps"], ["A letter, read aloud", "By someone at the bedside"], ["A photo", "Set where they can see it"]], "say": "Here are ways to be there. Ask someone at the bedside to hold the phone to their ear, or set up a video call. Hearing may be one of the last senses to go, so your voice can still reach them. Record a message that can be played again. Write a letter for someone to read aloud. Send a photo to set where they can see it."}, {"k": "points", "h": "For the ones at the bedside", "items": [["Offer the phone", "Would you like to talk to them?"], ["Read their words aloud", "Slowly, in your own voice"], ["Name them in the room", "Your son is thinking of you"], ["Leave room for their choice", "Everyone comes in their own way"]], "say": "If you are the one at the bedside, you are the bridge. Offer the phone. Read their letters aloud, slowly, in your own voice. Name them in the room. Your son is thinking of you. Your sister sends her love. And leave room for their choice. Everyone comes in their own way."}, {"k": "story", "title": "Please Help My Dad Die", "lines": ["A man was struggling to let go. His son would not come. He said he just couldn't do this.", "I told him, Your son loves you deeply, even if he can't be here right now.", "The next day he died peacefully, with his daughter at his side."], "lesson": "Love can reach them, even from far away.", "note": "From a Grounded story by Chris Joy", "hold": 2, "link": {"href": "https://chri5j0y.substack.com/p/please-help-my-dad-die", "label": "Read the Full Story: Please Help My Dad Die"}, "say": "I was once called to the bedside of a man named Bob, who was struggling to let go. His son would not come. He said he just couldn't do this. Bob was in a deep sleep and could no longer respond. I placed a hand on his shoulder and told him his children would be alright, and that his son loved him deeply, even if he couldn't be here right now. The next day, Bob died peacefully, with his daughter at his side."}, {"k": "words", "h": "Say it from where you are.", "items": ["I love you.", "I'm with you from here.", "Thank you for...", "I'll carry you with me."], "say": "If you are far away, try it now. Picture their face. Say what you want them to know, out loud or in your heart.", "beats": ["If you are far away, try it now.", "Picture their face.", {"t": "Say what you want them to know, out loud or in your heart.", "w": 14}]}, {"k": "big", "h": "You can say goodbye from far away.", "sub": "It is a real goodbye.", "say": "Here is permission, if you need it. You can say goodbye from far away. A goodbye said on the phone, in a letter, or in your heart is a real goodbye."}, {"k": "big", "h": "Love travels farther than we think.", "say": "Love travels farther than we think. Send your words today, in whatever way you can. And if you need help setting up a call, ask your hospice team."}]}
      ] },
      /* ---------- end W4 ---------- */
      /* ---------- Start Here (unchanged from the Learn build) ---------- */
      /* Willow Learn, premium (GWG BLD 728): Start Here, Using Willow, The Six Parts, For You, and For the People Who Love Them.
         Generated from patches/bld728/source in grounded-workshop. */
      {
  "id": "willow-start",
  "title": "Start Here",
  "who": "For the person in hospice, and the people who love them",
  "lessons": [
   {
    "id": "wl-welcome",
    "n": 1,
    "title": "Welcome to Willow",
    "mins": 4,
    "blurb": "What Willow is, who it is for, and where to begin.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Start Here, Lesson 1",
      "h": "Welcome to Willow",
      "sub": "Held gently, all the way home.",
      "say": "Welcome to Willow. A tree for the last part of the path, for the person in hospice, and the people who love them."
     },
     {
      "k": "big",
      "h": "A willow bends, and it doesn't break.",
      "sub": "Near the end of life, everyone in the room is bending.",
      "say": "A willow bends. It bends so far in a storm you'd think it should break, and it doesn't. Near the end of life, everyone in the room is bending. Willow is here so no one bends alone."
     },
     {
      "k": "flow",
      "h": "Built for two",
      "steps": [
       [
        "For me",
        "I'm in hospice, or facing the end of my life"
       ],
       [
        "For someone I love",
        "A parent, a partner, a friend, or family"
       ]
      ],
      "say": "Willow is built for two. When you begin, it asks who Willow is for today. For me, or for someone I love. Helpers open the person's tree with their own passcode, and see only what the person chooses to share."
     },
     {
      "k": "six",
      "h": "Six parts of one tree",
      "words": [
       "What grounds you",
       "A life that mattered",
       "Peace inside",
       "Love said out loud",
       "Comfort",
       "Hope and readiness"
      ],
      "say": "Willow looks gently at six parts of a tree. Roots, what grounds you. Trunk, a life that mattered. Bark, peace inside. Branches, love said out loud. Leaves, comfort. And Fruit, hope and readiness."
     },
     {
      "k": "points",
      "h": "A gentle check-in",
      "items": [
       [
        "Quick Check-in",
        "One question for each part"
       ],
       [
        "Full Check-in",
        "Three questions for each part"
       ],
       [
        "Faith comes first",
        "Asked gently, every time"
       ],
       [
        "Gentle words, not scores",
        "Every part of a tree has seasons"
       ]
      ],
      "say": "A check-in is how Willow listens. The Quick Check-in asks one question for each part. The Full Check-in asks three. Faith comes first, and every answer is welcome, including none. Afterward, Willow shows gentle words, not scores, and each check-in the person answers adds a ring to their tree."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 0,
      "note": {
       "h": "Seven tabs",
       "p": "Start with Today: the tree, one gentle practice, and the hospice line."
      },
      "say": "Today holds the tree, one gentle practice, and the hospice line. What Matters keeps the person's own words. Cuttings keeps stories and letters to leave behind. Bedside has what to do when you don't know what to do. When Life Changes has words for the hardest conversations. Readings has words to read aloud. And Learn is right here."
     },
     {
      "k": "big",
      "h": "Call your hospice first, day or night.",
      "sub": "In danger, call 911. Call or text 988, any time.",
      "beats": [
       "Your hospice has a line you can call day or night.",
       "Add it in Willow Settings, and it sits at the top of Today.",
       "For anything worrying at home, call your hospice first.",
       "In danger, call nine one one, and nine eight eight is there to call or text, any time.",
       {
        "t": "If you can, find your hospice's number now, often on the admission papers or a sheet on the fridge.",
        "w": 10
       }
      ],
      "say": "Your hospice has a line you can call day or night. Add it in Willow Settings, and it sits at the top of Today. For anything worrying at home, call your hospice first. In danger, call nine one one, and nine eight eight is there to call or text, any time. If you can, find your hospice's number now, often on the admission papers or a sheet on the fridge."
     },
     {
      "k": "big",
      "h": "A chaplain's questions, kept gently.",
      "sub": "What grounds you? What matters most? Who do you want close?",
      "say": "Willow was made by Chris Joy, a hospice chaplain, from the questions he asks every day. What grounds you? What matters most? Who do you want close? Willow keeps them gently in one place, on this device."
     },
     {
      "k": "points",
      "h": "Where to go next",
      "items": [
       [
        "Using Willow",
        "A short tour of each tab"
       ],
       [
        "The Six Parts",
        "One lesson for each part"
       ],
       [
        "For You",
        "For the person in hospice"
       ],
       [
        "For the People Who Love Them",
        "For family and helpers"
       ]
      ],
      "say": "From here, Using Willow walks through each tab, and The Six Parts gives a lesson to each part. For You is for the person in hospice, and For the People Who Love Them is for family and helpers."
     },
     {
      "k": "quiz",
      "q": "Who is Willow built for?",
      "opts": [
       "Only the hospice team",
       "The person in hospice, and the people who love them",
       "Only the family"
      ],
      "right": 1,
      "why": "Willow is built for two: the person, and the people who love them.",
      "say": "One question. Who is Willow built for?"
     }
    ]
   }
  ]
 },
 {
  "id": "willow-using",
  "title": "Using Willow",
  "who": "Every part of Willow, tab by tab",
  "certTitle": "Willow: Using Willow",
  "certLine": "For finishing every lesson on using Willow, tab by tab.",
  "lessons": [
   {
    "id": "wl-u-today",
    "n": 1,
    "title": "Today",
    "mins": 6,
    "blurb": "The 24/7 line, the tree and its check-ins, one gentle practice, and what helped today.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 1",
      "h": "Today",
      "sub": "Where every visit to Willow begins.",
      "say": "Every time you open Willow, you land on Today. This lesson walks through it from top to bottom, so you know what each part is for."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 0,
      "note": {
       "h": "Today",
       "p": "The 24/7 line, the tree, one gentle thing for today, and what helped."
      },
      "say": "Today is the first tab. At the top it shows the date, and it says whose tree you are looking at. Your own, or the tree of the person you help."
     },
     {
      "k": "card",
      "title": "Hospice 24/7 line",
      "body": "Shown at the top of Today. Call it first, day or night.",
      "fields": [
       [
        "Hospice name",
        "Our hospice"
       ],
       [
        "24/7 phone number",
        "320-555-0100"
       ]
      ],
      "btns": [
       "Save the number"
      ],
      "tap": 0,
      "say": "First, the hospice line. Until a number is saved, Today says, worried? Call your hospice first, day or night. Tap Add your hospice's 24/7 number, type the name and number, and tap Save the number. From then on it sits at the top of Today, one tap away. Call it first, before nine one one, for anything hospice can help with."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Your tree",
      "rows": [
       [
        "Roots",
        "Well tended",
        "#5F7D48"
       ],
       [
        "Trunk",
        "Holding",
        "#8B5E1A"
       ],
       [
        "Bark",
        "A growing edge",
        "#B8612F"
       ],
       [
        "Branches",
        "Well tended",
        "#5F7D48"
       ],
       [
        "Quick Check-in",
        ""
       ],
       [
        "Full Check-in",
        ""
       ]
      ],
      "tap": 4,
      "panel": {
       "h": "Gentle words",
       "sub": "Never scores.",
       "items": [
        "Well tended right now",
        "Holding. A little tending could help.",
        "A growing edge, where new growth begins"
       ]
      },
      "say": "Next comes the tree. After a check-in, each of the six parts shows a few gentle words, never a score. Well tended right now. Holding, where a little tending could help. Or a growing edge, where new growth begins. Below the tree are two buttons. Quick Check-in, and Full Check-in."
     },
     {
      "k": "flow",
      "h": "Two ways to check in",
      "steps": [
       [
        "Quick Check-in",
        "One question for each part, about 2 minutes"
       ],
       [
        "Full Check-in",
        "Three questions for each part"
       ]
      ],
      "say": "The Quick Check-in asks one question for each part, and takes about two minutes. The Full Check-in asks three for each part. Both ask about faith on the second screen, every time, because a chaplain always asks. Each answer is Rarely, Sometimes, Often, Almost always, or Not sure. Not sure is always okay. If an answer shows someone may need help, Willow shows the hospice line first, then nine eight eight to call or text, and nine one one for danger."
     },
     {
      "k": "points",
      "h": "Who is answering?",
      "items": [
       [
        "They answered",
        "On their own"
       ],
       [
        "They answered, I tapped",
        "They talk, a helper taps"
       ],
       [
        "I'm answering from what I see",
        "Kept apart, never adds a ring"
       ]
      ],
      "say": "When a helper opens the person's tree, Willow first asks, who is answering? They answered. They answered, I tapped, when the person talks and you tap. Or I'm answering from what I see, for when they can no longer say. That last kind is kept apart, and never speaks for their own tree."
     },
     {
      "k": "big",
      "h": "A ring grows with every check-in.",
      "sub": "Past Check-ins keeps them all.",
      "say": "Each check-in the person answers themselves adds a ring to the willow, with or without a helper tapping. Check in whenever it helps. Once there is a check-in, Past Check-ins shows every one, and who answered it."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "One gentle thing",
      "rows": [
       [
        "Long out-breath",
        "Bark"
       ],
       [
        "1 to 3 min",
        "Growing evidence"
       ],
       [
        "Did it today",
        ""
       ],
       [
        "Something else",
        ""
       ]
      ],
      "tap": 2,
      "panel": {
       "h": "Done for today",
       "sub": "That's enough.",
       "items": [
        "Works lying down",
        "Can be done with a helper"
       ]
      },
      "say": "Below the tree is one gentle thing for today. After a check-in, it leans toward the part that needs tending most. It shows how long it takes and how well it is backed. Tap Did it today when you have done it. Tap Something else for a different one. Every practice works lying down, and every one can be done with a helper."
     },
     {
      "k": "big",
      "h": "Long out-breath",
      "sub": "Never force it. Stop if breathing feels hard.",
      "beats": [
       "Let's try that one now.",
       "Breathe in gently.",
       "Let the breath out slower and longer.",
       {
        "t": "Never force it, and stop if breathing feels hard.",
        "w": 10
       }
      ],
      "say": "Let's try that one now. Breathe in gently. Let the breath out slower and longer. Never force it, and stop if breathing feels hard."
     },
     {
      "k": "big",
      "h": "No streaks here.",
      "sub": "One a day is plenty, and none is okay.",
      "say": "There are no streaks in Willow. One a day is plenty, and none is okay. When a helper is on their own tree, the practice is for them. Five minutes for you counts. It helps them too."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What helped today",
      "rows": [
       [
        "Pass it on to the next helper",
        ""
       ],
       [
        "She settled when we played Amazing Grace.",
        ""
       ],
       [
        "He asked for his brother.",
        ""
       ],
       [
        "Add to today",
        ""
       ]
      ],
      "tap": 3,
      "say": "On the person's tree comes What helped today. One line is enough. She settled when we played Amazing Grace. He asked for his brother. Type it under Add a line, and tap Add to today. Each line keeps the time and who wrote it, so the next person on shift will know. Earlier days opens the lines from before."
     },
     {
      "k": "points",
      "h": "Further down Today",
      "items": [
       [
        "At the bedside today",
        "Two ideas, when you open their tree"
       ],
       [
        "Support for Right Now",
        "Short videos for the hard hours"
       ],
       [
        "Your chaplain or doula",
        "Share with my chaplain or doula"
       ],
       [
        "The people you care for",
        "A helper's way to each tree"
       ]
      ],
      "say": "Further down, a helper on the person's tree sees two ideas for the bedside today. Support for Right Now opens short videos for the hard hours. Share with my chaplain or doula sends check-ins in person, and you choose what goes. And on a helper's own tree, The people you care for leads to each tree they help with."
     },
     {
      "k": "quiz",
      "q": "How many gentle practices does Today ask for?",
      "opts": [
       "Every one, to keep a streak",
       "One a day is plenty, and none is okay",
       "Three each morning"
      ],
      "right": 1,
      "why": "Willow keeps no streaks. One a day is plenty, and none is okay.",
      "say": "Quick question. How many gentle practices does Today ask for?"
     }
    ]
   },
   {
    "id": "wl-u-matters",
    "n": 2,
    "title": "What Matters",
    "mins": 5,
    "blurb": "A page in their own words, so everyone at the bedside knows who they are.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 2",
      "h": "What Matters",
      "sub": "Who they are, in their own words.",
      "say": "What Matters is a page about the person, in their own words. This lesson shows what is on it, and how to fill it in, alone or together."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 1,
      "note": {
       "h": "What Matters",
       "p": "So the people caring for you know who you are, not just what you have."
      },
      "say": "What Matters is the second tab. It is there so the people caring for you know who you are, not just what you have. Write a little or a lot. A helper can type while you talk."
     },
     {
      "k": "big",
      "h": "It starts with who you are.",
      "sub": "The work you did, the people you love, what makes you laugh.",
      "say": "The first question asks what people should know about you as a person. The work you did. The people you love. What makes you laugh. What you want remembered."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What Matters",
      "rows": [
       [
        "What makes a good day now?",
        ""
       ],
       [
        "Small things that bring joy",
        ""
       ],
       [
        "What I'm hoping for",
        ""
       ],
       [
        "What worries me",
        ""
       ],
       [
        "Who I want close",
        ""
       ],
       [
        "What comforts me",
        ""
       ]
      ],
      "tap": 0,
      "panel": {
       "h": "A good day now",
       "sub": "Coffee by the window. The grandkids after school. Quiet."
      },
      "say": "Then come six short questions. What makes a good day now? Small things that bring joy. What I'm hoping for. What worries me. Who I want close. And what comforts me. Each box shows a gentle example, like coffee by the window, or the grandkids after school."
     },
     {
      "k": "card",
      "title": "Anything we should never do",
      "body": "It shows on the Bedside tab as Never do.",
      "fields": [
       [
        "Anything we should never do",
        "No visits from my old church."
       ]
      ],
      "btns": [
       "Save"
      ],
      "tap": 0,
      "say": "The last question is, anything we should never do? Some people write, don't pray over me, or no visits from my old church. The check-in asks this too, in its faith step, and Willow carries that answer here. It also shows on the Bedside tab as Never do, for the helpers it is shared with."
     },
     {
      "k": "points",
      "h": "When the time comes",
      "items": [
       [
        "The room",
        "Light or dark? Window open?"
       ],
       [
        "The people",
        "Who should be there?"
       ],
       [
        "The words",
        "Said, read, prayed, or sung"
       ],
       [
        "Touch, and after",
        "Hand held, or space. The first hour."
       ]
      ],
      "say": "Below that is a section called When the time comes. Some people like to say how they want the last days to feel. The room, light or dark, the window open. The people who should be there. The words to be said, read, prayed, or sung. Touch, like a hand held, or space. And after, the first hour. Skip anything that doesn't fit."
     },
     {
      "k": "big",
      "h": "A good day now looks like...",
      "sub": "One small thing is enough.",
      "beats": [
       "Try the easiest question now.",
       "Finish this line, out loud or quietly.",
       "A good day now looks like.",
       {
        "t": "Name one small thing, like a song, a window, or a voice.",
        "w": 10
       }
      ],
      "say": "Try the easiest question now. Finish this line, out loud or quietly. A good day now looks like. Name one small thing, like a song, a window, or a voice."
     },
     {
      "k": "card",
      "title": "What Matters",
      "body": "Last changed Mon, Oct 5 by Dan.",
      "fields": [],
      "btns": [
       "Save",
       "Read it aloud",
       "Save or Print"
      ],
      "tap": 1,
      "say": "At the bottom are three buttons. Save keeps every answer, and the page shows when it was last changed, and by whom. Read it aloud reads the whole page out loud. Save or Print makes a clean page you can print, or save as a file to keep."
     },
     {
      "k": "points",
      "h": "Writing it together",
      "items": [
       [
        "Their words, not yours",
        "Type while they talk"
       ],
       [
        "Read it to new faces",
        "Nurses, aides, and visitors"
       ],
       [
        "On a helper's own tree",
        "A button opens their page"
       ]
      ],
      "say": "For helpers, write it with the person, in their words. Then read it aloud to new nurses, aides, and visitors, so they know who they are caring for. If you open What Matters from your own tree, Willow reminds you this page belongs to the person you care for, with a button to open their page."
     },
     {
      "k": "points",
      "h": "Theirs to share",
      "items": [
       [
        "Locked in their profile",
        "Kept on this device"
       ],
       [
        "What Matters to Me",
        "A switch in Willow Settings"
       ],
       [
        "Faith answers",
        "Shown at the top when shared"
       ]
      ],
      "say": "The page stays locked in the person's own profile, on this device. Helpers see it when the What Matters to Me switch is on in Willow Settings. And when the person also shares their faith answers, a short summary sits at the top of the page, with who to call."
     },
     {
      "k": "big",
      "h": "Start with one line.",
      "sub": "You can always add more.",
      "say": "You do not have to fill it in all at once. Start with one line. Come back and add more whenever it helps."
     },
     {
      "k": "quiz",
      "q": "Where does the answer to anything we should never do also show?",
      "opts": [
       "On the Bedside tab, as Never do",
       "Nowhere else",
       "In a message to the hospice"
      ],
      "right": 0,
      "why": "Never do shows on the Bedside tab, so everyone who is shared with knows it.",
      "say": "Quick question. Where does the answer to anything we should never do also show?"
     }
    ]
   },
   {
    "id": "wl-u-cuttings",
    "n": 3,
    "title": "Cuttings",
    "mins": 5,
    "blurb": "Stories, letters, lessons, and blessings, kept for the people who stay.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 3",
      "h": "Cuttings",
      "sub": "What I want to leave.",
      "say": "Cuttings is where a life's words are kept. This lesson shows the six kinds of cutting, how to write one, and what happens to it after."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 2,
      "note": {
       "h": "Cuttings",
       "p": "Stories, letters, lessons, and blessings, kept for the people who stay."
      },
      "say": "Cuttings is the third tab. Its heading reads, what I want to leave. Stories, letters, lessons, and blessings, kept for the people who stay."
     },
     {
      "k": "big",
      "h": "A small piece of a tree can root and grow somewhere new.",
      "say": "The name comes from gardening. A cutting is a small piece of a tree that can root and grow somewhere new. A story told today can keep growing in the people you love."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Cuttings",
      "rows": [
       [
        "A story",
        ""
       ],
       [
        "Things I learned",
        ""
       ],
       [
        "A letter to keep",
        ""
       ],
       [
        "One of the Four Things",
        ""
       ],
       [
        "A blessing to leave",
        ""
       ],
       [
        "A recipe or a how-to",
        ""
       ]
      ],
      "tap": 0,
      "panel": {
       "h": "A story",
       "sub": "Tell one story you want remembered."
      },
      "say": "There are six kinds to choose from. A story. Things I learned. A letter to keep. One of the Four Things. A blessing to leave. And a recipe or a how-to. Tap one to begin."
     },
     {
      "k": "points",
      "h": "Each kind, in a line",
      "items": [
       [
        "Things I learned",
        "Three things life taught you"
       ],
       [
        "A letter to keep",
        "To someone, for now or for later"
       ],
       [
        "A blessing to leave",
        "A wedding, a birthday, a hard day"
       ],
       [
        "A recipe or a how-to",
        "The pie. The fishing spot."
       ]
      ],
      "say": "Things I learned holds three things life taught you, for the people you love. A letter to keep goes to someone, for now or for later. A blessing to leave gives someone words for a wedding you won't see, a birthday, or a hard day. And a recipe or a how-to keeps the pie, the fishing spot, or how to fix the furnace."
     },
     {
      "k": "words",
      "h": "One of the Four Things",
      "items": [
       "Please forgive me.",
       "I forgive you.",
       "Thank you.",
       "I love you."
      ],
      "say": "One of the Four Things is for the words many people want to say before a goodbye. Please forgive me. I forgive you. Thank you. I love you. Choose the one that is true for you, and say who it is for."
     },
     {
      "k": "card",
      "title": "A new cutting",
      "body": "What kind: A story",
      "fields": [
       [
        "A title",
        "The summer at the lake"
       ],
       [
        "For (optional)",
        "For Emma, on her wedding day"
       ],
       [
        "The words",
        ""
       ]
      ],
      "btns": [
       "Save this cutting",
       "Cancel"
      ],
      "tap": 0,
      "say": "Each cutting has a title, like the summer at the lake. A line for who it is for, if you like, like for Emma, on her wedding day. And the words. You can change the kind while you write. Then tap Save this cutting, and Willow says, kept."
     },
     {
      "k": "big",
      "h": "The summer at the lake.",
      "sub": "One story is enough to start.",
      "beats": [
       "Let's begin one now.",
       "Think of one story you want remembered.",
       "Give it a short title, the way you would name a photo.",
       {
        "t": "Now say its first line, out loud or quietly.",
        "w": 10
       }
      ],
      "say": "Let's begin one now. Think of one story you want remembered. Give it a short title, the way you would name a photo. Now say its first line, out loud or quietly."
     },
     {
      "k": "points",
      "h": "Kept so far",
      "items": [
       [
        "Read this aloud",
        "Hear it read out loud"
       ],
       [
        "Save or Print",
        "A clean page to give or keep"
       ],
       [
        "Edit",
        "Add to it anytime"
       ],
       [
        "Remove",
        "Willow asks first"
       ]
      ],
      "say": "Every saved cutting shows under Kept so far, with its kind, who it is for, and the date. Each one can be read aloud. Save or Print makes a clean page to give someone, or to keep. Edit lets you add to it anytime. And Remove asks first, because it cannot be undone unless you have a backup."
     },
     {
      "k": "points",
      "h": "When a helper types",
      "items": [
       [
        "Type while they talk",
        "Use their words, not yours"
       ],
       [
        "Written down by",
        "Willow notes who typed it"
       ],
       [
        "Short is fine",
        "One story is enough to start"
       ]
      ],
      "say": "Many cuttings are typed by a helper while the person talks. Use their words, not yours. Willow notes who wrote it down, so it is always clear whose story it is. And short is fine. One story is enough to start."
     },
     {
      "k": "points",
      "h": "Kept for the people who stay",
      "items": [
       [
        "Locked in their profile",
        "On this device"
       ],
       [
        "The Cuttings switch",
        "In Willow Settings, for helpers"
       ],
       [
        "Their Cuttings",
        "Still there, just as they were"
       ]
      ],
      "say": "Cuttings stay locked in the person's own profile, on this device. Helpers see them when the Cuttings switch is on in Willow Settings. And after a death, their tree stays just as it was, with a button on Today that opens their Cuttings."
     },
     {
      "k": "quiz",
      "q": "What is a cutting in Willow?",
      "opts": [
       "A list of medicines",
       "A story, letter, or blessing kept for the people who stay",
       "A note for the hospice nurse"
      ],
      "right": 1,
      "why": "Like a piece of a tree that roots somewhere new, a cutting keeps growing in the people you love.",
      "say": "Quick question. What is a cutting in Willow?"
     }
    ]
   },
   {
    "id": "wl-u-bedside",
    "n": 4,
    "title": "Bedside",
    "mins": 5,
    "blurb": "Small, real things to do at the bedside, support for the one keeping watch, and faith done gently.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 4",
      "h": "Bedside",
      "sub": "What to do when you don't know what to do.",
      "say": "Bedside is for the moments when you are in the room and don't know what to do. This lesson walks through everything on it."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 3,
      "note": {
       "h": "Bedside",
       "p": "Small, real things families and helpers can do, with how well each one is backed."
      },
      "say": "Bedside is the fourth tab. Anyone can open it, with or without a profile. It holds small, real things families and helpers can do, with how well each one is backed."
     },
     {
      "k": "big",
      "h": "You don't have to say the perfect thing.",
      "sub": "You only have to stay.",
      "say": "The page opens with the most important thing. You don't have to say the perfect thing. You only have to stay."
     },
     {
      "k": "points",
      "h": "At the top",
      "items": [
       [
        "The hospice 24/7 line",
        "Call first, day or night"
       ],
       [
        "Never do",
        "What they asked everyone to avoid"
       ],
       [
        "Their tradition card",
        "When they share their faith answers"
       ]
      ],
      "say": "At the top is the hospice line, the same one as on Today. Call it first, day or night. When you are on the person's tree, and they share it, you will also see their Never do, in their own words. And if they named a tradition, their tradition card is right there."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What helps",
      "rows": [
       [
        "Keep talking",
        ""
       ],
       [
        "Read or sing",
        ""
       ],
       [
        "Hold a hand",
        ""
       ],
       [
        "Comfort, not calories",
        ""
       ],
       [
        "The vigil playlist",
        ""
       ],
       [
        "Give permission",
        ""
       ]
      ],
      "tap": 2,
      "panel": {
       "h": "How well it is backed",
       "items": [
        "Well studied",
        "Growing evidence",
        "Clinical consensus",
        "Traditional wisdom"
       ]
      },
      "say": "Next is What helps. Twelve small things, each with a short how-to and a tag for how well it is backed. Well studied, growing evidence, clinical consensus, or traditional wisdom. Keep talking. Read or sing. Hold a hand. Comfort, not calories. The vigil playlist. Give permission."
     },
     {
      "k": "points",
      "h": "A few more that help",
      "items": [
       [
        "When they're restless",
        "Soft voice, low light. Call the nurse."
       ],
       [
        "Listen to the visitors",
        "Ask gently, Who's here?"
       ],
       [
        "Kids can help",
        "Draw, choose music, tell a story"
       ],
       [
        "Shift handoff",
        "One line in What helped today"
       ]
      ],
      "say": "A few more. When they're restless, a soft voice, low light, and familiar music, and call the hospice nurse. When they see people who died, ask gently, who's here? Kids can help, by drawing, choosing music, or telling a story. And before you leave, add one line to What helped today."
     },
     {
      "k": "big",
      "h": "Hold a hand",
      "sub": "Let them pull away if they want.",
      "beats": [
       "Let's try one together.",
       "If you are at the bedside, rest your hand on theirs.",
       "If you are not, rest one hand gently on the other.",
       "Let them pull away if they want.",
       {
        "t": "Stay there for a few slow breaths.",
        "w": 12
       }
      ],
      "say": "Let's try one together. If you are at the bedside, rest your hand on theirs. If you are not, rest one hand gently on the other. Let them pull away if they want. Stay there for a few slow breaths."
     },
     {
      "k": "points",
      "h": "Care for the one keeping watch",
      "items": [
       [
        "Long out-breath",
        "One minute before you walk in"
       ],
       [
        "Eat something real",
        "One real meal today"
       ],
       [
        "Gates, not walls",
        "Tag out for an hour"
       ],
       [
        "Set guilt down",
        "I'm doing what love can do today."
       ]
      ],
      "say": "Then comes a section for you, called Care for the one keeping watch. You can't pour from an empty cup. One minute of long out-breaths before you walk in. One real meal today. Tag out for an hour while someone else is on. And write the guilt down, then write, I'm doing what love can do today."
     },
     {
      "k": "points",
      "h": "Faith at the bedside",
      "items": [
       [
        "Offer, then follow their lead",
        "Would you like a prayer?"
       ],
       [
        "Their own faith comes first",
        "Or their lack of one"
       ],
       [
        "Ask first after a death",
        "Traditions differ on the body"
       ]
      ],
      "say": "Faith at the bedside gives a few firm rules. Offer a prayer, and let them choose. From your tradition, or in my own words? Protect the person's own faith, or their lack of one, even when a relative pushes. And ask before touching the body after a death, because traditions differ."
     },
     {
      "k": "card",
      "title": "Look up a tradition",
      "body": "For a family with more than one faith, a visitor from another tradition, or just to understand.",
      "fields": [
       [
        "Tradition",
        "Catholic"
       ]
      ],
      "btns": [],
      "tap": null,
      "result": "Words they may use, what may comfort, before and after death",
      "say": "Look up a tradition opens any of twenty nine tradition cards. Choose one, and the card shows words they may use, what may comfort, what matters before and after death, and often who to call. Each card ends the same way. Families practice their faith in their own ways. Ask."
     },
     {
      "k": "points",
      "h": "When faith is complicated",
      "items": [
       [
        "When faith has changed",
        "Hurt, doubt, and struggle"
       ],
       [
        "Old wounds",
        "Believe them, and protect them"
       ],
       [
        "Mixed-faith families",
        "Their own wishes come first"
       ],
       [
        "Children and faith",
        "The truth, in simple words"
       ]
      ],
      "say": "Last, When faith is complicated. Four short sections open with a tap. When faith has changed, for hurt, doubt, and struggle. Old wounds, where the first step is to believe them. Mixed-faith families, where the dying person's own wishes come first. And children and faith, the truth in simple words. The tradition cards are drafts until a reviewer from each tradition reads them. If something is different for your family, trust your family."
     },
     {
      "k": "quiz",
      "q": "What does Bedside say you have to do?",
      "opts": [
       "Say the perfect thing",
       "Stay",
       "Know every tradition"
      ],
      "right": 1,
      "why": "You don't have to say the perfect thing. You only have to stay.",
      "say": "Quick question. What does Bedside say you have to do?"
     }
    ]
   },
   {
    "id": "wl-u-changes",
    "n": 5,
    "title": "When Life Changes",
    "mins": 5,
    "blurb": "Words for the hardest conversations, and how to find the right guide fast.",
    "sources": [
     [
      "VitalTalk: I wish, I worry, I wonder",
      "https://www.vitaltalk.org"
     ]
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 5",
      "h": "When Life Changes",
      "sub": "Words for the hardest conversations.",
      "say": "Near the end of life, the hardest moments often arrive as one sentence. We're hoping for a miracle. I'm a burden. Can they hear me? When Life Changes is where Willow keeps words for those moments."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 4,
      "note": {
       "h": "How to show up",
       "p": "What's happening, what to say, what to skip, and what helps."
      },
      "say": "Open the When Life Changes tab. Its first words are, how to show up. Each guide covers what's happening, what to say, what to skip, and what helps. It is written for families, and for the chaplains and doulas who sit with them."
     },
     {
      "k": "points",
      "h": "Twenty-two guides, in two groups",
      "items": [
       [
        "The spirit and the people",
        "Miracles, forgiveness, fear, family"
       ],
       [
        "The last days and after",
        "Signs of dying, the rally, the first hour"
       ],
       [
        "Titles in real words",
        "\"I'm not ready.\" \"Can they hear me?\""
       ]
      ],
      "say": "There are twenty two guides, in two groups. The spirit and the people, for hoping for a miracle, forgiveness, fear, and family conflict. And the last days and after, for what dying looks like, the rally, and the first hour after a death. Many titles are the very words people say, like I'm not ready, or are they starving?"
     },
     {
      "k": "card",
      "title": "Search the guides",
      "body": "Type a word, or what is happening.",
      "fields": [
       [
        "Search",
        "not eating"
       ]
      ],
      "btns": [
       "Search"
      ],
      "tap": 0,
      "result": "\"Are they starving?\"",
      "say": "To find one fast, type in the search box. Try a word like not eating, burden, or kids. Willow shows its own guides first, then anything else from Grow With Grounded that fits. You can also tap All, or one of the two groups, to narrow the list."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "\"Can they hear me?\"",
      "rows": [
       [
        "Watch: For You",
        ""
       ],
       [
        "Watch: For the Helper",
        ""
       ],
       [
        "What we know",
        ""
       ],
       [
        "Say",
        ""
       ],
       [
        "What helps",
        ""
       ],
       [
        "For the Helper",
        ""
       ]
      ],
      "tap": 0,
      "say": "Tap Open the guide, and it opens on one page. Two buttons sit at the top, Watch: For You, and Watch: For the Helper. Below them, the guide itself, in short sections you can read in a minute or two."
     },
     {
      "k": "flow",
      "h": "Two sides to every guide",
      "steps": [
       [
        "For You",
        "If this is what you are facing"
       ],
       [
        "For the Helper",
        "If you are walking beside someone"
       ]
      ],
      "say": "Every guide speaks to two people. For You, if this is what you are facing. And For the Helper, if you are walking beside someone who is. Each side has its own short video, narrated aloud, a few minutes long."
     },
     {
      "k": "points",
      "h": "More inside every guide",
      "items": [
       [
        "Read this guide aloud",
        "Willow reads it to the room"
       ],
       [
        "Save or print this guide",
        "To keep, or hand to family"
       ],
       [
        "For chaplains and doulas",
        "A short note at the end"
       ],
       [
        "A Grounded story",
        "On many guides, to read in full"
       ]
      ],
      "say": "There is more inside. Read this guide aloud lets Willow read it to the whole room. Save or print this guide gives you a page to keep, or to hand to family. A short note for chaplains and doulas sits at the end. And many guides link to a Grounded story you can read in full."
     },
     {
      "k": "big",
      "h": "Name the feeling first, then talk.",
      "sub": "I wish... I worry... I wonder...",
      "say": "One tool sits at the top of the tab, and it works almost everywhere. Name the feeling first, then talk. I wish. I worry. I wonder."
     },
     {
      "k": "words",
      "h": "Try it in your own words",
      "items": [
       "I wish...",
       "I worry...",
       "I wonder..."
      ],
      "beats": [
       "Try it now, out loud or quietly.",
       "Think of someone you love who is facing something hard.",
       {
        "t": "Finish one of these for them: I wish, I worry, or I wonder.",
        "w": 10
       }
      ],
      "say": "Try it now, out loud or quietly. Think of someone you love who is facing something hard. Finish one of these for them: I wish, I worry, or I wonder."
     },
     {
      "k": "points",
      "h": "Willow brings guides to you",
      "items": [
       [
        "After a check-in",
        "A guide for this, when an answer needs it"
       ],
       [
        "When a tree is remembered",
        "The first hour after, and what comes next"
       ],
       [
        "After a guide video",
        "Open the Full Guide"
       ]
      ],
      "say": "Willow also brings guides to you. After a check-in, if an answer touches something hard, a gentle note offers a guide for this. When a tree is marked as remembered, Today offers the first hour after, making it official, and relief. And at the end of each guide video, Open the Full Guide brings you right back here."
     },
     {
      "k": "big",
      "h": "When you're worried, call your hospice nurse.",
      "sub": "They're there day and night.",
      "say": "Every guide ends the same way. When you're worried, call your hospice nurse. They're there day and night. These guides offer spiritual and emotional support, and the hospice team is your first call for anything medical. In danger now, call nine one one. Thinking about ending your life, call or text nine eight eight."
     },
     {
      "k": "quiz",
      "q": "Every guide has two short videos. Who are they for?",
      "opts": [
       "Morning and night",
       "For You, and For the Helper",
       "Doctors and nurses"
      ],
      "right": 1,
      "why": "Each guide speaks to the person facing it and to the person walking beside them.",
      "say": "Quick question. Every guide has two short videos. Who are they for?"
     }
    ]
   },
   {
    "id": "wl-u-readings",
    "n": 6,
    "title": "Readings",
    "mins": 4,
    "blurb": "Psalms, prayers, poems, and blessings to read aloud, and how to find the right one.",
    "sources": [
     "blundon"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 6",
      "h": "Readings",
      "sub": "Words to read aloud.",
      "say": "Sometimes the best words at a bedside were written long ago, or written just for this moment. The Readings tab is where Willow keeps them, ready to read aloud."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 5,
      "note": {
       "h": "Words to read aloud",
       "p": "Psalms, prayers, poems, and blessings for all faith traditions and everything in-between."
      },
      "say": "Open the Readings tab. Here are psalms, prayers, poems, and blessings, for all faith traditions and everything in-between. You don't need a profile to read them."
     },
     {
      "k": "points",
      "h": "More than eighty readings",
      "items": [
       [
        "Blessings written for Willow",
        "For the last days, for after"
       ],
       [
        "Scripture and prayers",
        "From many faith traditions"
       ],
       [
        "Hymns and poems",
        "Old words, read slowly"
       ],
       [
        "Nature and humanist words",
        "For every kind of belief"
       ]
      ],
      "say": "There are more than eighty readings. Blessings written for Willow, like For the last days, and For after. Scripture and prayers from many traditions, Christian, Jewish, Muslim, Hindu, Buddhist, and Sikh. Hymns and poems. And words from nature, and from humanist and philosophical writers, for every kind of belief."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Readings",
      "rows": [
       [
        "For the last days",
        "Written for Willow"
       ],
       [
        "For the one keeping watch",
        "Written for Willow"
       ],
       [
        "For when you can't find words",
        "Written for Willow"
       ],
       [
        "For after",
        "Written for Willow"
       ],
       [
        "Psalm 23",
        "Public domain"
       ]
      ],
      "tap": 0,
      "say": "Each reading shows where it comes from. Written for Willow. Public domain, old words anyone may share. Or In plain English, a gentle rendering of an ancient text. Tap any reading to open it."
     },
     {
      "k": "card",
      "title": "Find the right words",
      "body": "Choose a tradition, or search a word.",
      "fields": [
       [
        "Tradition",
        "For every tradition and in-between"
       ],
       [
        "Search",
        "peace"
       ]
      ],
      "btns": [
       "For me"
      ],
      "tap": 0,
      "say": "To narrow the list, choose a tradition, or search a word like shepherd, peace, river, or home. When the person has shared their faith answers, a For me button appears, or For, and their name, with readings that fit their tradition, and readings meant for everyone."
     },
     {
      "k": "points",
      "h": "Inside a reading",
      "items": [
       [
        "Read this aloud",
        "Willow reads it in a gentle voice"
       ],
       [
        "Save or Print",
        "A page to keep, or tuck in a card"
       ],
       [
        "Back to readings",
        "To find another"
       ]
      ],
      "say": "Inside a reading, Read this aloud lets Willow read it in a gentle voice, for the times your own voice won't come. Save or Print gives you a page to keep, or tuck in a card. And Back to readings takes you to the list again."
     },
     {
      "k": "big",
      "h": "Read slowly. Read it twice.",
      "sub": "Hearing may be one of the last senses to go.",
      "say": "At the top of the tab, Willow gives one piece of advice. Read slowly. Read it twice. Hearing may be one of the last senses to go, so your voice may still reach them."
     },
     {
      "k": "words",
      "h": "For when you can't find words",
      "items": [
       "We're here.",
       "You are loved.",
       "You can rest now."
      ],
      "beats": [
       "Let's read one together.",
       "This blessing was written for Willow, for the moments when nothing else comes.",
       {
        "t": "Read it out loud now, slowly, the way you would at the bedside.",
        "w": 12
       }
      ],
      "say": "Let's read one together. This blessing was written for Willow, for the moments when nothing else comes. Read it out loud now, slowly, the way you would at the bedside."
     },
     {
      "k": "points",
      "h": "Songs families often ask for",
      "items": [
       [
        "Precious Lord, Take My Hand",
        "And How Great Thou Art"
       ],
       [
        "I'll Fly Away",
        "And On Eagle's Wings"
       ],
       [
        "Play it, or sing it",
        "Off key counts"
       ]
      ],
      "say": "Below the readings are songs families often ask for, like Precious Lord, Take My Hand, How Great Thou Art, and I'll Fly Away. Play a recording the family loves, or sing it. Off key counts."
     },
     {
      "k": "points",
      "h": "Two more lists to know",
      "items": [
       [
        "Beloved writing to find in print",
        "Named, so you can find the book"
       ],
       [
        "Words that stay with their people",
        "Some prayers belong to clergy and elders"
       ],
       [
        "Willow helps you reach them",
        "The one who carries those words"
       ]
      ],
      "say": "Two short lists end the tab. Beloved writing to find in print names favorite poems and books, so you can find them in the book or online. And words that stay with their people. Some prayers and rites belong to clergy, elders, and a family's own ritual specialists. Willow names them, and helps the family reach the one who carries them."
     },
     {
      "k": "big",
      "h": "Offer a reading. Let them choose.",
      "sub": "All faith traditions and everything in-between.",
      "say": "One gentle way to begin. Offer, and let the person choose. Would you like me to read something? Then read what fits their faith, or what fits a life lived without one. Their words are the right words."
     },
     {
      "k": "quiz",
      "q": "What does the For me button show?",
      "opts": [
       "Every reading in Willow",
       "Readings that fit the person's tradition, and ones for everyone",
       "Only the hymns"
      ],
      "right": 1,
      "why": "For me shows readings for the tradition the person shared, plus readings meant for everyone.",
      "say": "Quick question. What does the For me button show?"
     }
    ]
   },
   {
    "id": "wl-u-private",
    "n": 7,
    "title": "Private, Saved, and Shared",
    "mins": 6,
    "blurb": "Profiles, helpers, who answered, backup, printing, and sharing with the people who visit.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "Using Willow, Lesson 7",
      "h": "Private, Saved, and Shared",
      "sub": "Your words stay with you.",
      "say": "Willow holds tender things. Faith, fears, letters, and the last wishes of someone you love. This lesson shows how Willow keeps them private, how to save them, and how to share only what you choose."
     },
     {
      "k": "big",
      "h": "Everything stays on this device.",
      "sub": "Locked with a passcode, in each person's own profile.",
      "say": "Everything saved in Willow stays on this device, locked with a passcode, in each person's own profile. Nothing is sent to Grounded, or anyone else."
     },
     {
      "k": "card",
      "title": "Who is Willow for today?",
      "body": "Everything stays on this device, locked with a passcode.",
      "btns": [
       "For me",
       "For someone I love"
      ],
      "tap": 0,
      "say": "When you begin, Willow asks who it is for today. For me, if you are in hospice or facing the end of your life. For someone I love, if you are caring for them. Either way, each person gets their own profile, with a passcode only they know."
     },
     {
      "k": "points",
      "h": "Keep your passcode close",
      "items": [
       [
        "It stays on this device",
        "Only you know it"
       ],
       [
        "A backup is your safety net",
        "More on that in a moment"
       ],
       [
        "Tap Lock when you step away",
        "At the top of the page"
       ]
      ],
      "say": "Please remember your passcode. It never leaves this device, so only you can open your profile. A backup file is your safety net. And when you step away, tap Lock at the top of the page."
     },
     {
      "k": "flow",
      "h": "Built for two",
      "steps": [
       [
        "The person",
        "Their own tree, their own profile"
       ],
       [
        "A helper",
        "Their own passcode, their own tree"
       ]
      ],
      "say": "Willow is built for two. The person's tree lives in their own profile. A helper makes their own profile on this device, and opens the person's tree with their own passcode. Helpers have a tree of their own here too, because they are carrying this as well."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What helpers see",
      "rows": [
       [
        "How my tree is doing",
        "On"
       ],
       [
        "What Matters to Me",
        "On"
       ],
       [
        "Cuttings",
        "On"
       ],
       [
        "What helped today",
        "On"
       ],
       [
        "My faith answers",
        "Off"
       ],
       [
        "Notes from my check-ins",
        "Off"
       ]
      ],
      "tap": 4,
      "say": "The person chooses what helpers see. In Willow Settings, under What helpers see, four things start switched on. How my tree is doing, in gentle words, never the answers. What Matters to Me. Cuttings. And What helped today. My faith answers, and Notes from my check-ins, start private. Any of them can change, anytime. The answer about feeling safe at home always stays with the person."
     },
     {
      "k": "flow",
      "h": "Adding a helper",
      "steps": [
       [
        "Their own profile",
        "The helper makes one first"
       ],
       [
        "Settings, then Helpers",
        "Choose them under Add a helper"
       ],
       [
        "They type their passcode",
        "Then tap Add as a helper"
       ]
      ],
      "say": "To add a helper, the helper first makes their own Grounded profile on this device. Then the person opens Willow Settings, goes to Helpers, and chooses them under Add a helper. The helper types their own passcode, and taps Add as a helper. A helper can be removed, right there, anytime."
     },
     {
      "k": "points",
      "h": "Every answer says who answered",
      "items": [
       [
        "They answered",
        "In their own words"
       ],
       [
        "They answered, I tapped",
        "Their words, a helper's hands"
       ],
       [
        "I'm answering from what I see",
        "Kept apart, never adds a ring"
       ]
      ],
      "say": "Every check-in keeps track of who answered, so the person's own voice is never mixed up with anyone else's. They answered. They answered, I tapped, when the person speaks and a helper taps. Or, I'm answering from what I see, when the person can no longer say. That last kind is kept apart. It never adds a ring, and never speaks for the person."
     },
     {
      "k": "points",
      "h": "Save or Print",
      "items": [
       [
        "What Matters",
        "For new nurses, aides, and visitors"
       ],
       [
        "Any cutting",
        "A letter to hold in a hand"
       ],
       [
        "Every guide and reading",
        "To keep, or hand to family"
       ]
      ],
      "say": "Many pages in Willow have a Save or Print button. What Matters, to share with new nurses, aides, and visitors. Any cutting, so a letter can be held in a hand. And every guide and reading. Your device's print window lets you print it, or save it as a file."
     },
     {
      "k": "card",
      "title": "Your Records",
      "body": "One file with every profile on this device, each still locked.",
      "btns": [
       "Back up everything",
       "Load a backup"
      ],
      "tap": 0,
      "say": "The safety net. In Willow Settings, find Your Records. Back up everything saves one file with every profile on this device, each one still locked. Keep that file somewhere private. On a new phone, or after a reset, tap Load a backup. Willow shows what is inside, and adds it back, keeping everything already here."
     },
     {
      "k": "points",
      "h": "Share with my chaplain or doula",
      "items": [
       [
        "You choose what goes",
        "Check-ins, faith, What Matters, notes"
       ],
       [
        "They scan a code",
        "You read two words and a number aloud"
       ],
       [
        "It travels in person",
        "Straight from your device to theirs"
       ]
      ],
      "say": "On Today, Share with my chaplain or doula sends check-ins to the chaplain or doula who visits. You choose what goes. They scan a code on your screen with their Field Guide, and you read them two words and a number, out loud. It travels in person, straight from your device to theirs. After a visit, they can send a card back, opened the same way."
     },
     {
      "k": "big",
      "h": "Look at what you share.",
      "sub": "Settings, then What helpers see.",
      "beats": [
       "Take a moment now.",
       "If Willow is open, tap Settings at the top of the page, and look at What helpers see.",
       {
        "t": "Or simply name one thing you want kept private, and one thing you want shared.",
        "w": 10
       }
      ],
      "say": "Take a moment now. If Willow is open, tap Settings at the top of the page, and look at What helpers see. Or simply name one thing you want kept private, and one thing you want shared."
     },
     {
      "k": "quiz",
      "q": "A helper answers from what they see. What happens to that check-in?",
      "opts": [
       "It adds a ring to the tree",
       "It is kept apart, and never speaks for the person",
       "It replaces the person's own answers"
      ],
      "right": 1,
      "why": "The person's own voice is never mixed up with anyone else's.",
      "say": "Quick question. A helper answers from what they see. What happens to that check-in?"
     }
    ]
   }
  ]
 },
 {
  "id": "willow-six",
  "title": "The Six Parts",
  "who": "One lesson for each part of the tree at the end of life, with a story and a practice",
  "certTitle": "Willow: The Six Parts",
  "certLine": "For finishing every lesson on the six parts of the tree at the end of life.",
  "lessons": [
   {
    "id": "wl-6-roots",
    "n": 1,
    "title": "Roots: What Grounds You",
    "mins": 8,
    "blurb": "Faith, spirit, or whatever holds you up, and how Willow listens for it.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 1",
      "h": "Roots",
      "sub": "What grounds you.",
      "say": "This lesson is about Roots, the first part of the willow. Roots are what grounds you."
     },
     {
      "k": "big",
      "h": "Roots matter most when the wind picks up.",
      "sub": "Faith, spirit, or whatever holds you up.",
      "say": "Here is how Willow describes them. Faith, spirit, or whatever holds you up. Roots are mostly unseen, and they matter most when the wind picks up. Near the end of life, the wind is real."
     },
     {
      "k": "points",
      "h": "Roots can look like",
      "items": [
       [
        "Faith and prayer",
        "In a tradition, or in your own way"
       ],
       [
        "A ritual or a song",
        "A rosary, a hymn, a blessing, silence"
       ],
       [
        "Love, nature, your values",
        "What grounds you, in your words"
       ],
       [
        "What comes after",
        "Peace about it, or worry"
       ]
      ],
      "say": "For many people, roots are faith and prayer, in a tradition or in their own way. For some, roots live in a ritual or a song. A rosary, a hymn, a blessing, or silence. For others, roots are love, nature, or their values. And roots hold the question of what comes after, whether it brings peace or worry. Willow is made for all faith traditions and everything in-between."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Faith, spirit, or something else",
      "rows": [
       [
        "What has mattered to you?",
        ""
       ],
       [
        "How much does it matter now?",
        ""
       ],
       [
        "Has it changed?",
        ""
       ],
       [
        "Someone we should call?",
        ""
       ],
       [
        "Anything we should never do?",
        ""
       ]
      ],
      "tap": 0,
      "say": "Willow asks about faith on its own screen in every check-in, because a chaplain always asks. Faith, spirit, or something else. What has mattered to you? Every answer is welcome here, including none. Then it asks how much it matters now, whether it has changed, who from your faith or community to call, and anything we should never do. After the first time, it shows what you said and asks if that is still true."
     },
     {
      "k": "big",
      "h": "Willow listens for whether your roots are holding you.",
      "sub": "Steadying you, or weighing on you.",
      "say": "Each person answers for themselves, in their own words. And Willow listens for one thing. Is what grounds you steadying you right now, or weighing on you? Both answers are honest. Both can be tended."
     },
     {
      "k": "flow",
      "h": "The three Roots questions",
      "steps": [
       [
        "Strength and comfort",
        "From what grounds you"
       ],
       [
        "A practice that matters",
        "A prayer, ritual, song, or practice"
       ],
       [
        "Far, or afraid",
        "From the sacred, or of what comes after"
       ]
      ],
      "say": "A full check-in asks three Roots questions. Lately, how often has your faith, your spirit, or what grounds you given you the strength and comfort you need? That one is also the quick check-in question. How often have you found comfort in a prayer, ritual, song, or practice that matters to you? And how often have you felt far from God or what you hold sacred, or afraid of what comes after? When faith does not matter to someone, Willow asks in other words, about love, nature, and values."
     },
     {
      "k": "points",
      "h": "What each question listens for",
      "items": [
       [
        "Strength and comfort",
        "Whether the spirit is being fed"
       ],
       [
        "Small practices count",
        "Practices are how roots drink"
       ],
       [
        "Far or afraid is common",
        "And it can be eased"
       ]
      ],
      "say": "Here is what each one listens for. The first notices whether the spirit is being fed. The second is about practice, because practices are how roots drink, and small ones count. The third is turned around on purpose. Feeling far, or afraid, is common near the end, and it can be eased."
     },
     {
      "k": "points",
      "h": "Words, not scores",
      "items": [
       [
        "Strong",
        "Feels well tended right now",
        "#5F7D48"
       ],
       [
        "Steady",
        "Holding. A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others near",
        "#B8612F"
       ]
      ],
      "say": "After a check-in, the person sees gentle words, never a score. Strong roots feel well tended right now. Maybe what grounds you feels close. Steady roots are holding, and a little tending could help. Maybe prayer has gone quiet lately. And a growing edge is where new growth begins, tended with others beside you. Maybe God feels far, or what comes after feels frightening."
     },
     {
      "k": "story",
      "title": "He Deserves That",
      "lines": [
       "Judy cut me off on the phone. Bill is transitioning, she said. You need to go see him right away.",
       "We grew up Catholic, she said, but Bill never really followed along with it. I know he still believes. He deserves that.",
       "I read the Twenty-third Psalm and prayed. It was peaceful, I told her. I don't think he was alone for a second of it."
      ],
      "lesson": "Roots can run deep, even after years of quiet.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/he-deserves-that",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about Bill. At the end of my day, I called his sister Judy to introduce myself. She cut me off. Bill is transitioning, she said, and you need to go see him right away. I asked about his faith. We grew up Catholic, she said, but Bill never really followed along with it. I know he still believes. He was not much for priests or church. If you could do it, she said, that would be better. He is a good man. He deserves that. I sat beside Bill, read the Twenty-third Psalm, and prayed. His breathing had been sporadic, and it settled into a rhythm. When he died, I called Judy. It was peaceful, I told her. I don't think he was alone for a second of it."
     },
     {
      "k": "big",
      "h": "Someone remembered what would hold him.",
      "sub": "Willow keeps what grounds a person, in their own words.",
      "say": "Bill's faith had been quiet for years, and his sister still knew what would hold him. Willow keeps what grounds a person in their own words. When they choose to share it, the people beside them can bring it to the bedside."
     },
     {
      "k": "points",
      "h": "Practice: Breath Prayer",
      "items": [
       [
        "Choose two short phrases",
        "One for in, one for out"
       ],
       [
        "Breathe in on the first",
        "Be still. I am held."
       ],
       [
        "Breathe out on the second",
        "And know. I am loved."
       ],
       [
        "Stay a few breaths",
        "Lying down is fine"
       ]
      ],
      "cue": {
       "w": {
        "5": 8,
        "8": 25
       },
       "at": [
        2,
        6,
        7,
        8
       ]
      },
      "say": "Let us try one of Willow's practices together. It is called Breath Prayer. Choose two short phrases, one for breathing in, and one for breathing out. Some people use, be still, and know. Some use, I am held, I am loved. Any words that are true for you will do. Breathe in gently on the first phrase. Breathe out on the second, slowly. Stay with it for a few breaths, lying down if you like. Never force the breath, and stop if breathing feels hard."
     },
     {
      "k": "big",
      "h": "Feeling far from the sacred? You can have company.",
      "sub": "A chaplain can sit with this. Ask your hospice team.",
      "say": "Breath Prayer is one of the practices Willow offers in Today, one gentle thing at a time, leaning toward the part that needs it most. And if you have felt far from what you hold sacred, you can sort it out with company. A chaplain can sit with this. Ask your hospice team."
     },
     {
      "k": "quiz",
      "q": "What does Willow listen for in Roots?",
      "opts": [
       "Which religion you belong to",
       "Whether what grounds you steadies you or weighs on you",
       "How often you go to services"
      ],
      "right": 1,
      "why": "Roots are about what holds you up, in your own words.",
      "say": "Quick question. What does Willow listen for in Roots?"
     }
    ]
   },
   {
    "id": "wl-6-trunk",
    "n": 2,
    "title": "Trunk: A Life That Mattered",
    "mins": 7,
    "blurb": "Your story, knowing your life mattered, and passing on what you know.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 2",
      "h": "Trunk",
      "sub": "A life that mattered.",
      "say": "This lesson is about the Trunk, the second part of the willow. In Willow, the trunk is a life that mattered."
     },
     {
      "k": "big",
      "h": "A trunk carries the story of the whole tree.",
      "sub": "Your story, and what you pass on.",
      "say": "Cut a trunk open, and you can count its years in the rings. Willow describes the trunk this way. Your story. Knowing your life mattered, and passing on what you know."
     },
     {
      "k": "points",
      "h": "Trunk can look like",
      "items": [
       [
        "Looking back",
        "What you are proudest of"
       ],
       [
        "Telling your stories",
        "The ones you want remembered"
       ],
       [
        "Passing it on",
        "A lesson, a blessing, a recipe"
       ],
       [
        "Setting things down",
        "Repairing what can still be repaired"
       ]
      ],
      "say": "The trunk can look like looking back, and naming what you are proudest of. Telling the stories you want remembered. Passing on what you know, a lesson, a blessing, even a recipe. And setting things down, repairing what can still be repaired, and grieving what cannot."
     },
     {
      "k": "flow",
      "h": "The three Trunk questions",
      "steps": [
       [
        "A life that mattered",
        "Has your life mattered?"
       ],
       [
        "Stories passed on",
        "A chance to tell them"
       ],
       [
        "Regrets",
        "And things left undone"
       ]
      ],
      "say": "A full check-in asks three Trunk questions. Lately, how often have you felt that your life has mattered? That one is also the quick check-in question. How often have you had the chance to tell your stories, or pass on what you know? And how often have you felt weighed down by regrets, or things left undone?"
     },
     {
      "k": "points",
      "h": "What each question listens for",
      "items": [
       [
        "A life that mattered",
        "A steadying thing near the end"
       ],
       [
        "Something left behind",
        "For the one leaving, and the ones staying"
       ],
       [
        "Regret is human",
        "Some can be repaired, some set down"
       ]
      ],
      "say": "Here is what each one listens for. Knowing your life mattered can steady a person against despair near the end. Leaving something behind helps the one leaving, and the ones staying. And the third is turned around on purpose. Regret is human. Some of it can still be repaired, and some can be set down."
     },
     {
      "k": "big",
      "h": "Meaning hides in specifics.",
      "sub": "Ask for one story.",
      "say": "If you are helping someone answer, here is a tip from Willow. Ask for one story. Tell me about the work you loved. Tell me about the day your first child was born. Meaning hides in specifics."
     },
     {
      "k": "points",
      "h": "Words, not scores",
      "items": [
       [
        "Strong",
        "Feels well tended right now",
        "#5F7D48"
       ],
       [
        "Steady",
        "Holding. A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others near",
        "#B8612F"
       ]
      ],
      "say": "After a check-in, the person sees gentle words, never a score. A well tended trunk might mean you can look back and see that your life counted. A steady trunk is holding, though some days the meaning feels far away. And a growing edge might mean regret is heavy, or one question keeps coming back. Why am I still here?"
     },
     {
      "k": "story",
      "title": "Birth Plan",
      "lines": [
       "Why am I still here? Jan cried out from her wheelchair. Why am I still alive?",
       "She spent thirty years walking babies into the world. What did you used to ask them, I said. Before it started.",
       "Who they wanted with them. Quiet, or music on. Then something clicked. Like a birth plan, she said."
      ],
      "lesson": "You get a say in how it goes.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/birth-plan",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about Jan. She spent thirty years walking babies into the world. One day in the dining room, she cried out, why am I still here? Why am I still alive? Later, in her room, she told me she had said her goodbyes. I'm ready to go, she said. We're just waiting on the Lord. But what am I supposed to do, she asked. Just sit here and wait? So I asked what she used to ask the mothers, before it started. I'd ask what they wanted the room to feel like, she said. Who they wanted with them. Quiet, or music on. So ask yourself the same thing, I said. You get a say in how it goes. Something clicked behind her eyes. Like a birth plan, she said. Yes. Like a birth plan."
     },
     {
      "k": "big",
      "h": "Her answer was waiting in her own life.",
      "sub": "A life that mattered can keep mattering.",
      "say": "Jan's question sounded like the end of meaning. The answer was waiting in her own life. Thirty years of helping people through the one moment nobody gets to control had taught her exactly what to ask. A life that mattered can keep mattering, right to the end."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What Matters: When the time comes",
      "rows": [
       [
        "The room",
        "See, hear, smell"
       ],
       [
        "The people",
        "Who should be there"
       ],
       [
        "The words",
        "Said, read, prayed, sung"
       ],
       [
        "Touch",
        "A hand held, or space"
       ],
       [
        "After",
        "The first hour"
       ]
      ],
      "tap": 0,
      "say": "Willow has a place for that kind of plan. Open What Matters, and look for When the time comes. The room. What do you want to see, hear, and smell? The people. Who should be there? The words. What do you want said, read, prayed, or sung? Touch. A hand held, or space? And after. Skip anything that does not fit."
     },
     {
      "k": "points",
      "h": "Practice: Three Things I Learned",
      "items": [
       [
        "Settle in",
        "Sitting up or lying down"
       ],
       [
        "Name one thing life taught you",
        "Say it out loud"
       ],
       [
        "Then a second, and a third",
        "For the people you love"
       ],
       [
        "Keep them in Cuttings",
        "A helper can type while you talk"
       ]
      ],
      "cue": {
       "w": {
        "4": 15,
        "5": 20
       },
       "at": [
        2,
        3,
        5,
        6
       ]
      },
      "say": "Let us try one of Willow's practices. It is called Three Things I Learned. Settle in, sitting up or lying down. Now name one thing life taught you, and say it out loud. Take your time. Then a second, and a third, for the people you love. When you are ready, keep them in Cuttings, under Things I learned. A helper can type while you talk."
     },
     {
      "k": "big",
      "h": "Some regrets can be repaired. Some can be set down.",
      "sub": "When Life Changes has a guide for forgiveness.",
      "say": "Three Things I Learned is one of the practices Willow offers in Today. And if regrets weigh heavy, Willow says so gently after the check-in. Some regrets can still be repaired, and some can be set down. Both are possible here. When Life Changes has a guide for forgiveness, and your hospice chaplain or social worker can help."
     },
     {
      "k": "quiz",
      "q": "In Willow, what is the Trunk about?",
      "opts": [
       "Your medical history",
       "Your story, and knowing your life mattered",
       "How busy you are"
      ],
      "right": 1,
      "why": "The trunk holds your story, and what you pass on.",
      "say": "Quick question. In Willow, what is the Trunk about?"
     }
    ]
   },
   {
    "id": "wl-6-bark",
    "n": 3,
    "title": "Bark: Peace Inside",
    "mins": 6,
    "blurb": "Fear and worry, and the moments of calm between.",
    "sources": [
     "singh"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 3",
      "h": "Bark",
      "sub": "Peace inside.",
      "say": "This lesson is about Bark, the third part of the willow. In Willow, bark is peace inside."
     },
     {
      "k": "big",
      "h": "Bark is where the tree meets the weather.",
      "sub": "Fear and worry, and the calm between.",
      "say": "Bark is where a tree meets the weather. Willow describes it this way. Peace inside. Fear and worry, and the moments of calm between."
     },
     {
      "k": "points",
      "h": "Bark can look like",
      "items": [
       [
        "Moments of peace",
        "Even brief ones count"
       ],
       [
        "Feeling like yourself",
        "More than your illness"
       ],
       [
        "Naming a fear",
        "Out loud, to someone"
       ],
       [
        "Calm between the waves",
        "Worry comes, and it also goes"
       ]
      ],
      "say": "Bark can look like moments of peace, and even brief ones count. Feeling like yourself, more than your illness. Naming a fear out loud, to someone who will listen. And calm between the waves, where worry comes, and it also goes."
     },
     {
      "k": "flow",
      "h": "The three Bark questions",
      "steps": [
       [
        "At peace",
        "Even for a moment"
       ],
       [
        "Like yourself",
        "More than your illness"
       ],
       [
        "Afraid or restless",
        "Worried inside"
       ]
      ],
      "say": "A full check-in asks three Bark questions. Lately, how often have you felt at peace, even for a moment? That one is also the quick check-in question. How often have you felt like yourself, more than your illness? And how often have you felt afraid, worried, or restless inside?"
     },
     {
      "k": "points",
      "h": "What each question listens for",
      "items": [
       [
        "At peace, even briefly",
        "How the spirit is doing"
       ],
       [
        "Still you",
        "Dignity starts there"
       ],
       [
        "Fear is normal",
        "So is getting help with it"
       ]
      ],
      "say": "Here is what each one listens for. Feeling at peace, even for a moment, says a lot about how the spirit is doing. The second says, you are still you, and dignity starts there. The third is turned around on purpose. Fear is normal, and so is getting help with it."
     },
     {
      "k": "points",
      "h": "Each kind of fear has its own help",
      "items": [
       [
        "Pain or restlessness",
        "Tell the hospice nurse"
       ],
       [
        "What dying is like",
        "A guide in When Life Changes"
       ],
       [
        "What comes after",
        "A chaplain, or your own clergy"
       ],
       [
        "Leaving people",
        "Words to say, and Cuttings to keep"
       ]
      ],
      "say": "If you are helping, ask gently what the fear is about. Pain. The process of dying. What comes after. Or leaving people. Each has its own help. For pain or restlessness, tell the hospice nurse. When Life Changes has a guide called What Dying Looks Like. A chaplain, or the person's own clergy, can sit with fears about what comes after. And for leaving people, there are words to say, and Cuttings to keep."
     },
     {
      "k": "points",
      "h": "Words, not scores",
      "items": [
       [
        "Strong",
        "Feels well tended right now",
        "#5F7D48"
       ],
       [
        "Steady",
        "Holding. A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others near",
        "#B8612F"
       ]
      ],
      "say": "After a check-in, the person sees gentle words, never a score. Well tended bark might mean peace comes often, even on hard days. Steady bark is holding, with some restless stretches. And a growing edge might mean fear or worry is close most of the time. That is where new growth begins, and it is tended with others beside you."
     },
     {
      "k": "story",
      "title": "Enlightenment",
      "lines": [
       "Matthew is a monk in his eighties. Sixty years of prayer, and now he wanted company for the rest of the walk.",
       "Picture standing on a dock your whole life, I said, gripping the post while the tide pulls at your ankles.",
       "I have spent my whole life learning how to hold on well, he said. Perhaps I only have one more thing left to learn."
      ],
      "lesson": "Peace can come with open hands.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/enlightenment",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about Matthew. He is a Catholic monk in his eighties. He has spent sixty years in prayer and silence, and he wanted to experience enlightenment when he died. He asked me to walk with him through a book about dying. One day I offered him a picture. Picture standing on a dock your whole life, gripping the post while the tide pulls at your ankles. We spend a lifetime believing holiness means holding on tighter. But maybe the ones who arrive fully present are the ones who finally let their hands open. Matthew went quiet. Then he looked down at his hands, folded loose in his lap. I have spent my whole life learning how to hold on well, he said. Perhaps I only have one more thing left to learn."
     },
     {
      "k": "big",
      "h": "Peace inside can be something you let in.",
      "sub": "A moment at a time.",
      "say": "Matthew had spent his life learning to hold on well. Near the end, peace looked like opening his hands. Peace inside often comes that way, as something you let in, a moment at a time."
     },
     {
      "k": "points",
      "h": "Practice: Long Out-Breath",
      "items": [
       [
        "Let your hands rest open",
        "In your lap, or on the blanket"
       ],
       [
        "Breathe in gently",
        "No need to fill up"
       ],
       [
        "Let the breath out slower",
        "Longer than the breath in"
       ],
       [
        "A few more breaths",
        "Never force it"
       ]
      ],
      "cue": {
       "p": {
        "2": 3
       },
       "w": {
        "7": 25
       },
       "at": [
        2,
        3,
        4,
        7
       ]
      },
      "say": "Let us try one of Willow's practices together. It is called Long Out-Breath. Let your hands rest open, in your lap or on the blanket. Breathe in gently. Now let the breath out slower, and longer. Again. In gently, and out slow. Stay with it for a few more breaths. Never force it, and stop if breathing feels hard."
     },
     {
      "k": "big",
      "h": "Fear or restlessness that stays? Call your hospice.",
      "sub": "Their 24/7 line first, day or night. In danger now? Call 911.",
      "say": "Long Out-Breath is one of the practices Willow offers in Today, one gentle thing at a time. If fear or restlessness stays, call your hospice's 24/7 line, day or night. That is what it is there for. And if anyone is in danger right now, call nine one one."
     },
     {
      "k": "quiz",
      "q": "Someone you love is afraid. What helps first?",
      "opts": [
       "Telling them not to worry",
       "Asking gently what the fear is about",
       "Changing the subject"
      ],
      "right": 1,
      "why": "Each kind of fear has its own help, so ask which one it is.",
      "say": "Quick question. Someone you love is afraid. What helps first?"
     }
    ]
   },
   {
    "id": "wl-6-branches",
    "n": 4,
    "title": "Branches: The People You Love",
    "mins": 7,
    "blurb": "Feeling loved, and saying what matters to the people who matter.",
    "sources": [
     "byock4"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 4",
      "h": "Branches",
      "sub": "The people you love.",
      "say": "This lesson is about Branches, the people you love. In Willow, Branches has another name. Love said out loud."
     },
     {
      "k": "big",
      "h": "Love is the main thing, at the end more than ever.",
      "sub": "Branches reach toward the people we love.",
      "say": "A tree's branches reach out toward the light. Near the end of life, we reach toward the people we love. Willow puts it simply. Love is the main thing, at the end more than ever."
     },
     {
      "k": "points",
      "h": "Three questions for Branches",
      "items": [
       [
        "Felt loved and cared for?",
        "The quick check-in question"
       ],
       [
        "Said what you want to say?",
        "To the people who matter"
       ],
       [
        "Felt like a burden?",
        "Turned around, and asked gently"
       ]
      ],
      "cue": {
       "at": [
        2,
        3,
        5
       ]
      },
      "say": "Willow asks three questions for Branches, and each one starts with, lately, how often have you. The first is the quick check-in question. Felt loved and cared for? The second asks whether you have said what you want to say to the people who matter. The third is turned around on purpose. Felt like a burden to the people caring for you? Any answer is welcome, and Not sure is always an honest one."
     },
     {
      "k": "words",
      "h": "Words that are never too late",
      "items": [
       "Please forgive me.",
       "I forgive you.",
       "Thank you.",
       "I love you.",
       "Goodbye."
      ],
      "say": "The second question names the words that matter most near the end. Please forgive me. I forgive you. Thank you. I love you. And goodbye. These words are never too late. They can be said out loud, written down, or kept as a letter. Forgiveness is always a choice, and it is never owed to someone unsafe."
     },
     {
      "k": "big",
      "h": "Receiving care is part of love too.",
      "sub": "Feeling like a burden is common near the end.",
      "say": "The third question asks about feeling like a burden. Many people near the end feel this sometimes, and the people caring for them usually see it differently. If it comes up, you can let it be said. Ask what being cared for is like. Receiving care is part of love too."
     },
     {
      "k": "points",
      "h": "How Branches can look",
      "items": [
       [
        "Feels well tended",
        "Loved, with the words said or on their way",
        "#5F7D48"
       ],
       [
        "Holding",
        "A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others beside you",
        "#B8612F"
       ]
      ],
      "cue": {
       "at": [
        2,
        3,
        4
       ]
      },
      "say": "After a check-in, Willow shows gentle words instead of scores. These are words, not grades. When Branches feels well tended, you may feel loved, with the important words said or on their way. When it is holding, the love is there, and a little tending could help, like a call, a visit, or a thank you. When Branches is a growing edge, someone may feel far away, words may be waiting, or being cared for may feel heavy. That is where new growth begins, and you can tend it with others beside you."
     },
     {
      "k": "story",
      "title": "Love.",
      "lines": [
       "Kathy's dementia has taken most of her words. I've been visiting her for over a year, long enough to learn how to hear her anyway.",
       "I read her a chapter from my small Bible. She closed her eyes and took the words in slowly, like water.",
       "She tapped the page. This is true. You have it right. Then she gripped my hands. Thank you. Thank you. Thank you."
      ],
      "lesson": "Love reaches past words.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/love",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about Kathy. Her dementia has taken most of her words. I have been visiting her for over a year, long enough to learn how to hear her anyway. One day she was glowing, more animated than I had seen her in months. I asked if I could read a chapter from the Bible, and she said, yes, that would be nice. If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal. She closed her eyes and took the words in slowly, like water. When I told her it all comes down to love, she tapped the page. This is true, she said. You have it right. Then she gripped my hands. Thank you. Thank you. Thank you."
     },
     {
      "k": "big",
      "h": "Love reaches past words.",
      "sub": "A hand held. A face close. Time together.",
      "say": "Kathy's words came out scrambled, and her meaning came through whole. Love reaches past words. When words run short, love can still be said with a hand held, a face close, and time together."
     },
     {
      "k": "points",
      "h": "Practice: One of the Four Things",
      "items": [
       [
        "Settle",
        "One easy breath"
       ],
       [
        "Picture one person",
        "Whoever comes to mind first"
       ],
       [
        "Choose one of the words",
        "Forgive me, I forgive you, thank you, I love you"
       ],
       [
        "Say it",
        "Out loud, in your heart, or to them"
       ]
      ],
      "cue": {
       "w": {
        "2": 5,
        "3": 10,
        "8": 8,
        "9": 12
       },
       "at": [
        2,
        3,
        4,
        9
       ]
      },
      "say": "Let us practice. This one is called One of the Four Things. Settle in, and take one easy breath. Now picture one person, whoever comes to mind first. Choose one of the words for them. Please forgive me. I forgive you. Thank you. Or, I love you. Now say it, out loud, or quietly in your heart, or to them if they are near."
     },
     {
      "k": "card",
      "title": "One of the Four Things",
      "body": "Please forgive me. I forgive you. Thank you. I love you.",
      "fields": [
       [
        "A title",
        "Thank you"
       ],
       [
        "For (optional)",
        "For my son"
       ]
      ],
      "btns": [
       "Save this cutting",
       "Cancel"
      ],
      "tap": 0,
      "say": "When you are ready, Willow can keep the words. In Cuttings, choose One of the Four Things, or A letter to keep, for now or for later. Type it, or have a helper type while you talk. And on Today, the one gentle practice for the day is sometimes a Branches practice, like a thank-you list, or the call or visit you want."
     },
     {
      "k": "big",
      "h": "Helping someone say it",
      "sub": "Ask who they feel loved by. Offer to write while they talk.",
      "say": "If you are helping someone you love, ask who they feel loved by, and help them say thank you. Offer to write the words down while they talk. Your own Branches matter too. In your own check-in, Willow asks whether you have someone to lean on."
     },
     {
      "k": "quiz",
      "q": "In Willow, what does Branches listen for?",
      "opts": [
       "How many visitors come by",
       "Feeling loved, and the words you want to say",
       "Who is to blame for old hurts"
      ],
      "right": 1,
      "why": "Branches is love said out loud: feeling loved, and saying what matters.",
      "say": "Quick question. In Willow, what does Branches listen for?"
     }
    ]
   },
   {
    "id": "wl-6-leaves",
    "n": 5,
    "title": "Leaves: Comfort, Rest, and the Senses",
    "mins": 8,
    "blurb": "Comfort in the body, rest without guilt, and small joys for the senses.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 5",
      "h": "Leaves",
      "sub": "Comfort, rest, and the senses.",
      "say": "This lesson is about Leaves, the body. In Willow, Leaves is about comfort, rest, and small joys for the senses."
     },
     {
      "k": "big",
      "h": "Leaves are where the tree meets the light.",
      "sub": "Near the end, the body asks for comfort.",
      "say": "Leaves are where a tree meets the light and the air. Near the end of life, growth looks different. It is about peace, and comfort, and being yourself to the last. So Leaves is a gentle part. It asks how the body is resting, and what small joys still reach you."
     },
     {
      "k": "flow",
      "h": "Three strands of Leaves",
      "steps": [
       [
        "Comfort",
        "Comfortable enough to rest"
       ],
       [
        "Rest",
        "Sleep that truly helps"
       ],
       [
        "The senses",
        "A taste, a sound, a touch, the light"
       ]
      ],
      "say": "Willow asks three questions for Leaves, one for each strand. Comfort. Have you felt comfortable enough in your body to rest? Rest. Have you rested or slept in a way that helped? And the senses. Have you enjoyed something small, like a taste, a sound, a touch, or the light?"
     },
     {
      "k": "big",
      "h": "Comfort matters, and your hospice team can do a lot.",
      "sub": "Pain or hard breathing? Tell the hospice nurse today.",
      "say": "The first question is about comfort, and comfort matters. Your hospice team can do a lot. If pain or breathing is hard, tell the hospice nurse today. And for anything urgent at home, call your hospice's twenty four hour line first, day or night. It sits at the top of Today."
     },
     {
      "k": "big",
      "h": "Rest is part of comfort.",
      "sub": "Sleep is allowed. Rest is part of comfort.",
      "say": "The second question is about rest. Many people near the end sleep more, and some feel guilty about it. Sleep is allowed. Rest is part of comfort. A helper can ask what helps you settle. A voice, a light, a song."
     },
     {
      "k": "points",
      "h": "Small joys are still joys",
      "items": [
       [
        "Music I love",
        "Favorite songs or hymns"
       ],
       [
        "Gentle touch",
        "Lotion on the hands, hair brushed"
       ],
       [
        "One small taste",
        "A spoon of ice cream, the smell of coffee"
       ],
       [
        "Air and light",
        "Window open, sun on your hands"
       ]
      ],
      "cue": {
       "at": [
        3,
        4,
        5,
        6
       ]
      },
      "say": "The third question is about the senses. Small joys are still joys. Here are a few from Willow's practices. Music you love, favorite songs or hymns. Gentle touch, like lotion on the hands, or hair brushed, if touch is welcome. One small taste, like a spoon of ice cream, or the smell of coffee. And air and light. A window open, and sun on your hands."
     },
     {
      "k": "points",
      "h": "How Leaves can look",
      "items": [
       [
        "Feels well tended",
        "Comfortable, rested, a small joy or two",
        "#5F7D48"
       ],
       [
        "Holding",
        "A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others beside you",
        "#B8612F"
       ]
      ],
      "cue": {
       "at": [
        2,
        3,
        4
       ]
      },
      "say": "After a check-in, Willow shows gentle words instead of scores. These are words, not grades. When Leaves feels well tended, you may feel comfortable, rested, and able to enjoy a small thing or two. When it is holding, comfort is mostly there, and a little tending could help, like a better place to rest, or one small joy planned for today. When Leaves is a growing edge, comfort or sleep may be hard to find. That is where new growth begins, and the hospice team and the people who love you can tend it with you."
     },
     {
      "k": "story",
      "title": "Prayer",
      "lines": [
       "Dee sat alone in her wheelchair, folding a napkin back and forth in her lap.",
       "I reached for the worn Bible on her shelf. The moment I opened it, her hands went still.",
       "Then she prayed for me, her voice steady and her sentences whole."
      ],
      "lesson": "What is familiar can still reach us.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/thank-god-for-sending-you",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about Dee. I found her alone in a small activity room, folding a napkin back and forth in her lap. Dementia had taken her sense of time, and her sense of names. In her room, I held her hand, and we went through her photographs one by one. Then I reached for the worn Bible on her shelf. I don't read it as well as I used to, she said. The moment I opened it, her hands, which had been moving the whole visit, went still. She closed her eyes, and her breathing slowed. When I prayed, her hand tightened around mine. Then she said, I want to pray for you. Her voice steadied, and the sentences that had been scattering all visit came out whole."
     },
     {
      "k": "big",
      "h": "What is familiar can still reach us.",
      "sub": "A song, a voice, a touch, words known by heart.",
      "say": "Dee's hands went still, and her breathing slowed. What is familiar can still reach us, even when so much else has slipped. For Dee it was prayer. For someone else, it may be a song, a voice they love, a hand on theirs, or words they have known by heart for years."
     },
     {
      "k": "points",
      "h": "Practice: One Small Joy",
      "items": [
       [
        "Settle",
        "Let your body rest right where it is"
       ],
       [
        "Listen",
        "One sound, near or far"
       ],
       [
        "Feel",
        "One touch: a hand, a blanket, the air"
       ],
       [
        "Choose one small joy",
        "A taste, a song, the light"
       ]
      ],
      "cue": {
       "w": {
        "3": 5,
        "5": 8,
        "7": 8,
        "9": 10
       },
       "at": [
        3,
        4,
        6,
        8
       ]
      },
      "say": "Let us practice. This one is called One Small Joy. You can do it lying down, or with a helper. Let your body rest right where it is. Now listen. Notice one sound, near or far. Now feel. Notice one touch, a hand, a blanket, or the air on your skin. Last, choose one small joy for today. A taste, a song, or the light."
     },
     {
      "k": "card",
      "title": "One small taste",
      "body": "A favorite flavor: a spoon of ice cream, the smell of coffee.",
      "fields": [
       [
        "Leaves",
        "2 min"
       ]
      ],
      "btns": [
       "Did it today",
       "Something else"
      ],
      "tap": 0,
      "say": "On Today, Willow offers one gentle thing a day, and some days it comes from Leaves. Every practice works lying down, and every one can be done with a helper. Tap Did it today when it is done, or Something else for a different one. One a day is plenty, and none is okay."
     },
     {
      "k": "big",
      "h": "Write down what helped.",
      "sub": "One line is enough for the next helper.",
      "say": "If you are helping someone you love, plan one small joy a day with the family. When something brings comfort, add a line to What Helped Today. She settled when we played Amazing Grace. The next person on shift will know. And your own leaves matter too. Food, sleep, and breaks. Your body is carrying this too."
     },
     {
      "k": "quiz",
      "q": "What are the three strands of Leaves in Willow?",
      "opts": [
       "Comfort, rest, and the senses",
       "Exercise, diet, and sleep",
       "Medicine, meals, and visits"
      ],
      "right": 0,
      "why": "Leaves holds comfort, rest, and small joys for the senses.",
      "say": "Quick question. What are the three strands of Leaves in Willow?"
     }
    ]
   },
   {
    "id": "wl-6-fruit",
    "n": 6,
    "title": "Fruit: Hope and Readiness",
    "mins": 8,
    "blurb": "Hope that changes shape, and getting ready for what is ahead.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "The Six Parts, Lesson 6",
      "h": "Fruit",
      "sub": "Hope and readiness.",
      "say": "This last lesson of the six is about Fruit. Hope that changes shape, and getting ready for what is ahead."
     },
     {
      "k": "big",
      "h": "Hope changes shape near the end.",
      "sub": "It can stay, in a new shape.",
      "say": "Near the end of life, hope changes shape, and it can stay. A person may stop hoping for a cure, and start hoping for a good day, a visit, or peace. That is still hope."
     },
     {
      "k": "points",
      "h": "Three questions for Fruit",
      "items": [
       [
        "Hopeful about something small?",
        "The quick check-in question"
       ],
       [
        "Ready, or getting ready?",
        "Readiness grows a little at a time"
       ],
       [
        "Hopeless, or wishing it would end?",
        "Turned around, and asked with care"
       ]
      ],
      "cue": {
       "at": [
        2,
        3,
        6
       ]
      },
      "say": "Willow asks three questions for Fruit. The first is the quick check-in question. Have you felt hopeful about something, even something small? The second asks whether you have felt ready, or getting ready, for what is ahead. Readiness grows a little at a time. The third is turned around on purpose. Have you felt hopeless, or wished it would all end soon?"
     },
     {
      "k": "points",
      "h": "What hope can look like now",
      "items": [
       [
        "Peace",
        "Inside, and in the room"
       ],
       [
        "A visit",
        "Someone you want to see"
       ],
       [
        "A good day",
        "Today, or tomorrow"
       ],
       [
        "What comes after",
        "In your own faith, or your own way"
       ]
      ],
      "cue": {
       "at": [
        1,
        2,
        3,
        4
       ]
      },
      "say": "Ask what someone is hoping for now, and listen. It may be peace. A visit from someone they love. A good day. Or what comes after, in their own faith, or in their own way."
     },
     {
      "k": "flow",
      "h": "Readiness, one piece at a time",
      "steps": [
       [
        "Affairs",
        "Papers, plans, and wishes"
       ],
       [
        "People",
        "Words said, and goodbyes"
       ],
       [
        "Spirit",
        "Peace with what is ahead"
       ]
      ],
      "say": "Readiness has a few pieces. When something feels unready, it helps to ask which piece. Affairs, like papers, plans, and wishes. The What Matters tab can hold those. People, like words said, and goodbyes. Or spirit, and peace with what is ahead. One piece at a time is plenty."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "One More Gentle Question",
      "rows": [
       [
        "Which is closest for you right now?",
        ""
       ],
       [
        "I'm not ready yet.",
        ""
       ],
       [
        "I'm ready when it comes.",
        ""
       ],
       [
        "I wish it would come sooner.",
        ""
       ],
       [
        "I've thought about ending my life myself.",
        ""
       ],
       [
        "I'd rather not say.",
        ""
       ]
      ],
      "tap": 2,
      "say": "The third question names something many people near the end feel. You can say it out loud here. When the answer is sometimes or more, Willow asks one more gentle question. When you think about dying, which is closest for you right now? Being ready for death is different from wanting to end your life, and this question helps tell them apart. Every answer is met with kindness, and I'd rather not say is always there."
     },
     {
      "k": "big",
      "h": "Help is always right there.",
      "sub": "Hospice 24/7 line first. 988, call or text. 911 in danger.",
      "say": "If someone wishes it would come sooner, their hospice team should know, so they can help with whatever is making it hard. If someone has thought about ending their own life, tell someone right now. Call your hospice's twenty four hour line, or call or text nine eight eight. If anyone is in danger now, call nine one one."
     },
     {
      "k": "points",
      "h": "How Fruit can look",
      "items": [
       [
        "Feels well tended",
        "Some hope, and some peace with what is ahead",
        "#5F7D48"
       ],
       [
        "Holding",
        "A little tending could help",
        "#8B5E1A"
       ],
       [
        "Growing Edge",
        "Where new growth begins, with others beside you",
        "#B8612F"
       ]
      ],
      "cue": {
       "at": [
        2,
        3,
        4
       ]
      },
      "say": "After a check-in, Willow shows gentle words instead of scores. These are words, not grades. When Fruit feels well tended, there may be something to hope for, and some peace with what is ahead. When it is holding, hope is there, and a little tending could help, like one good thing planned for tomorrow. When Fruit is a growing edge, hope may feel far away right now. That is where new growth begins, and you can tend it with others beside you."
     },
     {
      "k": "story",
      "title": "Letting Go. Eleanor's Story",
      "lines": [
       "Eleanor's body was failing fast. Her heart was fixed three months down the road, on the due date of her first grandchild.",
       "She recorded messages, and we wrote letters to be opened at the birth, the first birthday, even high school graduation.",
       "I guess my arms won't hold this baby, she said, but maybe my words will."
      ],
      "lesson": "Hope can travel ahead of you.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "Let me tell you about Eleanor. She was seventy one, in a hospital bed in her front room, so she could see the fields she had worked her whole life. Her body was failing fast, but her heart was fixed three months down the road, on the due date of her first grandchild. I keep praying God will let me hold that baby, she told me. Just once. I didn't try to answer. I just stayed. One afternoon I brought a little recorder, and asked, what if you could still meet this baby? She recorded stories, advice for sleepless nights, and blessings. We wrote letters to be opened at the birth, the first birthday, even high school graduation. Then she began to speak differently about time. I guess my arms won't hold this baby, she said, but maybe my words will."
     },
     {
      "k": "big",
      "h": "Hope can travel ahead of you.",
      "sub": "In a letter, a story, or a blessing.",
      "say": "Eleanor still hoped for a miracle. And her hope found a new shape too. Her love could travel ahead of her, in her own words. Hope can do that. It can travel ahead of you, in a letter, a story, or a blessing."
     },
     {
      "k": "points",
      "h": "Practice: What I'm Hoping For",
      "items": [
       [
        "Settle",
        "One easy breath"
       ],
       [
        "Name one hope for today",
        "However small"
       ],
       [
        "Say it",
        "Out loud, or to someone near"
       ],
       [
        "Plan one good thing",
        "For tomorrow"
       ]
      ],
      "cue": {
       "w": {
        "2": 5,
        "3": 10,
        "4": 8,
        "5": 10
       },
       "at": [
        2,
        3,
        4,
        5
       ]
      },
      "say": "Let us practice. This one is called What I'm Hoping For. Settle in, and take one easy breath. Now name one hope for today, however small. Say it out loud, or to someone near you. Last, plan one good thing for tomorrow."
     },
     {
      "k": "points",
      "h": "Fruit in Willow",
      "items": [
       [
        "What I'm hoping for today",
        "One hope, however small"
       ],
       [
        "Plan one good thing",
        "Something to look forward to"
       ],
       [
        "Give something away",
        "And watch them receive it"
       ],
       [
        "A blessing to leave",
        "Kept in Cuttings"
       ]
      ],
      "cue": {
       "at": [
        1,
        2,
        3,
        4
       ]
      },
      "say": "On Today, the one gentle practice is sometimes from Fruit. What I'm hoping for today. Plan one good thing. Give something away, while you can watch them receive it. And in Cuttings, you can leave a blessing, for a birthday, a wedding, or a hard day. If you are helping someone you love, your own Fruit matters too. In your own check-in, Willow asks whether you can picture yourself getting through what comes after."
     },
     {
      "k": "big",
      "h": "Every part still matters, to the very end.",
      "sub": "Held gently, all the way home.",
      "say": "That is all six parts. Roots, trunk, bark, branches, leaves, and fruit. Every part still matters, to the very end. Held gently, all the way home."
     },
     {
      "k": "quiz",
      "q": "What happens to hope near the end of life?",
      "opts": [
       "It always disappears",
       "It can change shape, and stay",
       "It only means hoping for a cure"
      ],
      "right": 1,
      "why": "Hope changes shape near the end: a good day, a visit, peace, words that travel ahead.",
      "say": "Last question. What happens to hope near the end of life?"
     }
    ]
   }
  ]
 },
 {
  "id": "willow-you",
  "title": "For You",
  "who": "For the person in hospice. Watch at your own pace, alone or with someone you love.",
  "cert": false,
  "lessons": [
   {
    "id": "wl-y-yours",
    "n": 1,
    "title": "Your Tree, Your Way",
    "mins": 6,
    "blurb": "Willow is yours: how it works, what it asks, and how you stay in charge of it.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 1",
      "h": "Your Tree, Your Way",
      "sub": "Willow is yours.",
      "say": "This lesson is for you, the person this tree belongs to. Willow is yours. You decide how you use it, how much, and when. Get comfortable. There is no hurry here."
     },
     {
      "k": "big",
      "h": "You are still growing.",
      "sub": "Every part of you still matters.",
      "say": "Here is what Willow believes. You are still growing, right up to the end. A willow bends in a storm, so far you would think it should break, and it doesn't. Willow is here so no one bends alone."
     },
     {
      "k": "six",
      "h": "Six parts of you",
      "words": [
       "What grounds you",
       "A life that mattered",
       "Peace inside",
       "Love said out loud",
       "Comfort",
       "Hope and readiness"
      ],
      "say": "Your tree has six parts. Roots, for what grounds you. Trunk, for a life that mattered. Bark, for peace inside. Branches, for love said out loud. Leaves, for comfort. And Fruit, for hope and readiness. Every one of them still matters."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 0,
      "note": {
       "h": "Today",
       "p": "Your hospice line, your tree, and one gentle thing for today."
      },
      "say": "Willow opens on Today. At the top is your hospice's 24/7 line. Below it is your tree. And below that, one gentle thing for today. Done is enough. There are no streaks here, and your tree never dries out."
     },
     {
      "k": "flow",
      "h": "Two ways to check in",
      "steps": [
       [
        "Quick Check-in",
        "One question for each part"
       ],
       [
        "Full Check-in",
        "Three questions for each part"
       ]
      ],
      "say": "When you want to, you can check in. The Quick Check-in asks one question for each part, and takes about two minutes. The Full Check-in asks three. Check in whenever it helps."
     },
     {
      "k": "points",
      "h": "You decide",
      "items": [
       [
        "Answer what fits",
        "Not sure is always okay"
       ],
       [
        "Someone can tap for you",
        "You talk, and a helper taps"
       ],
       [
        "Lying down is fine",
        "Every practice works lying down"
       ],
       [
        "Stop anytime",
        "Willow is here when you come back"
       ]
      ],
      "say": "Answer what fits. Not sure is always an honest answer. If reading is tiring, someone can read each question to you and tap your answer while you talk. Every practice works lying down. And you can stop anytime. Willow will be here when you come back."
     },
     {
      "k": "points",
      "h": "Words, never scores",
      "items": [
       [
        "Well tended",
        "This part feels well tended right now",
        "#5F7D48"
       ],
       [
        "Holding",
        "A little tending could help",
        "#8B5E1A"
       ],
       [
        "A growing edge",
        "Where new growth begins",
        "#B8612F"
       ]
      ],
      "say": "After a check-in, your tree shows gentle words, never scores. A part might feel well tended right now. It might be holding, where a little tending could help. Or it might be a growing edge, where new growth begins, and you can tend it with others beside you. Each check-in you answer adds a ring to your tree."
     },
     {
      "k": "points",
      "h": "Faith comes first, every time",
      "items": [
       [
        "Faith, spirit, or something else",
        "Every answer is welcome, including none"
       ],
       [
        "Asked each time",
        "Still true, or something has changed"
       ],
       [
        "Readings for you",
        "Words from your tradition"
       ]
      ],
      "say": "On the second screen of every check-in, Willow asks about faith, spirit, or something else, because a chaplain always asks. Every answer is welcome, including none. Once you have answered, Willow shows what you said and asks if it is still true. Then the Readings tab can show words for you, from your own tradition."
     },
     {
      "k": "story",
      "title": "No Scared. New Body.",
      "lines": [
       "Somchai laughed through most of my visit, his hands trembling in his lap.",
       "I asked if he knew he was dying. He patted his chest and said, in English: No scared. New body.",
       "His family wanted someone to sit with him who wasn't scared of what he believes, and wasn't trying to change it."
      ],
      "lesson": "Your faith is yours. Willow is here to honor it.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "Let me tell you about Somchai. Buddhist families don't usually request a chaplain. His did. He sat near the window, his hands trembling in his lap, and he laughed through most of my visit. Eventually I asked the question I always ask. Do you know you are dying? He nodded slowly, still smiling. Then he patted his chest and said, in English, No scared. New body. Malee, who translated for us, told me why they had asked for me. They wanted someone to sit with him who wasn't scared of what he believes, and wasn't trying to change it either. I told her that was exactly what I hoped to be. No scared. New body. I have not stopped thinking about those four words."
     },
     {
      "k": "points",
      "h": "You choose what helpers see",
      "items": [
       [
        "Helpers have their own passcode",
        "They see only what you switch on"
       ],
       [
        "Faith answers start private",
        "So do notes from your check-ins"
       ],
       [
        "Change it anytime",
        "In Willow Settings"
       ]
      ],
      "say": "If someone helps you with Willow, they open it with their own passcode, and they see only what you switch on. Your faith answers and the notes from your check-ins start private. Your safety answers about home are never shared. You can change the rest anytime, in Willow Settings."
     },
     {
      "k": "words",
      "h": "One thing about you",
      "items": [
       "What I want you to know about me is...",
       "I am still..."
      ],
      "say": "Let's take a quiet moment together. Take one easy breath, at your own pace. Now think of one thing about you that you want the people around you to know. Say it out loud, or just in your heart.",
      "beats": [
       "Let's take a quiet moment together.",
       "Take one easy breath, at your own pace.",
       "Now think of one thing about you that you want the people around you to know.",
       {
        "t": "Say it out loud, or just in your heart.",
        "w": 10
       }
      ]
     },
     {
      "k": "big",
      "h": "Go at your own pace.",
      "sub": "Willow will be here whenever you are ready.",
      "say": "You can write that on the What Matters page, or ask someone to write it for you. Go at your own pace. Willow will be here whenever you are ready."
     },
     {
      "k": "quiz",
      "q": "Who decides what your helpers can see in Willow?",
      "opts": [
       "The hospice team",
       "You do",
       "Your helpers decide"
      ],
      "right": 1,
      "why": "Willow is your tree. You choose what is shared, and you can change it anytime.",
      "say": "One question. Who decides what your helpers can see?"
     }
    ]
   },
   {
    "id": "wl-y-matters",
    "n": 2,
    "title": "What Matters to You",
    "mins": 6,
    "blurb": "Keeping who you are and what you want to leave, in your own words.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 2",
      "h": "What Matters to You",
      "sub": "Your words, kept safe.",
      "say": "This lesson is about what matters to you, and how to keep it, in your own words, for the people you love. Take it slowly. You can pause anytime."
     },
     {
      "k": "big",
      "h": "Writing it down is a gift.",
      "sub": "The people you love will not have to guess.",
      "say": "Writing down what matters is a gift to the people you love. When the time comes, they will not have to guess what you would want. And it helps everyone caring for you know who you are, not just what you have."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 1,
      "note": {
       "h": "What Matters to Me",
       "p": "Who you are, in your own words. Write a little or a lot."
      },
      "say": "The What Matters tab opens a page called What Matters to Me. It is yours, in your own words. Write a little or a lot."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What Matters to Me",
      "rows": [
       [
        "What should we know about you?",
        ""
       ],
       [
        "What makes a good day now?",
        ""
       ],
       [
        "Small things that bring joy",
        ""
       ],
       [
        "What I'm hoping for",
        ""
       ],
       [
        "What worries me",
        ""
       ],
       [
        "Who I want close",
        ""
       ]
      ],
      "tap": 1,
      "panel": {
       "h": "A good day now",
       "sub": "For example",
       "items": [
        "Coffee by the window",
        "The grandkids after school",
        "Quiet"
       ]
      },
      "say": "The page asks a few gentle questions. What should we know about you as a person? What makes a good day now? Maybe coffee by the window, or quiet. Small things that bring joy. What you are hoping for, and what worries you. Who you want close. What comforts you. And anything we should never do."
     },
     {
      "k": "points",
      "h": "When the time comes",
      "items": [
       [
        "The room",
        "Light or dark? Window open?"
       ],
       [
        "The people",
        "Who should be there?"
       ],
       [
        "The words",
        "Said, read, prayed, or sung"
       ],
       [
        "Touch",
        "A hand held, or space"
       ]
      ],
      "say": "Lower on the page is a part called When the time comes. Some people like to say how they want the last days to feel. The room: light or dark, the window open. The people you want there. The words you want said, read, prayed, or sung. Touch, or space. And what should happen after. Skip anything that doesn't fit."
     },
     {
      "k": "points",
      "h": "Write it your way",
      "items": [
       [
        "Talk, and a helper types",
        "Your words, not theirs"
       ],
       [
        "Read it aloud",
        "Willow reads your page back"
       ],
       [
        "Save or Print",
        "For new nurses, aides, and visitors"
       ]
      ],
      "say": "You do not have to type a word. You can talk while a helper types, in your words, not theirs. Read it aloud plays your page back to you. And Save or Print makes a copy your family can read to new nurses, aides, and visitors."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 2,
      "note": {
       "h": "Cuttings",
       "p": "Stories, letters, lessons, and blessings, kept for the people who stay."
      },
      "say": "Next door is Cuttings. A cutting is a small piece of a tree that can root and grow somewhere new. These are pieces of you, kept for the people who stay."
     },
     {
      "k": "points",
      "h": "Pieces of you to leave",
      "items": [
       [
        "A story",
        "One story you want remembered"
       ],
       [
        "A letter to keep",
        "For now, or for later"
       ],
       [
        "A blessing to leave",
        "For a wedding you won't see"
       ],
       [
        "A recipe or a how-to",
        "The pie. The fishing spot."
       ]
      ],
      "say": "There are six kinds. A story you want remembered. Things I learned, three things life taught you. A letter to keep, for now or for later. One of the Four Things, like thank you or I love you. A blessing to leave, for a wedding you won't see, or a hard day. And a recipe or a how-to. The pie. The fishing spot. How to fix the furnace."
     },
     {
      "k": "story",
      "title": "Passing It On",
      "lines": [
       "A man who built his fishing guide business from one old boat told me, I can't die right now. The business will fall apart without me.",
       "Over the next days, we turned from loss to legacy. He recorded what he knew and made a video message for each of his guides.",
       "Then he told his family: I release you. Run it, sell it, or close the doors. Don't let it own you."
      ],
      "lesson": "What you pass on keeps growing after you.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "Let me tell you about Jack. He had built a fishing guide business from a single old jon boat into twenty boats and a waiting list. Now cancer was taking him, and he told me, I can't die right now. The business will fall apart without me. So I didn't push. I sat with him on the deck and let him talk. Over the next several days, we focused on legacy instead of loss. We recorded his fishing wisdom: favorite spots, how to read the water, stories from years on the lake. He made a video message for each of his guides. Then he told his family, I release you. Run it if you want, sell it if you need to, or close the doors. In his final days, his grip softened into pride and peace."
     },
     {
      "k": "words",
      "h": "Start with one line.",
      "items": [
       "What I want you to know is...",
       "Remember the time...",
       "Thank you for..."
      ],
      "say": "Let's start one now. Think of one person you love. Now think of one thing you want them to know, or one story you want them to keep. Say the first line out loud, or tell someone nearby so they can write it down.",
      "beats": [
       "Let's start one now.",
       "Think of one person you love.",
       "Now think of one thing you want them to know, or one story you want them to keep.",
       {
        "t": "Say the first line out loud, or tell someone nearby so they can write it down.",
        "w": 12
       }
      ]
     },
     {
      "k": "big",
      "h": "One story is enough to start.",
      "sub": "You can always add more.",
      "say": "That first line counts. You do not have to write it all at once. One story is enough to start, and you can always add more, on a good day, with someone beside you."
     },
     {
      "k": "quiz",
      "q": "What is a Cutting in Willow?",
      "opts": [
       "A medical record",
       "A story, letter, or piece of you to leave behind",
       "A list of medicines"
      ],
      "right": 1,
      "why": "Like a willow cutting that grows a new tree, a Cutting is something of you that keeps growing in the people you love.",
      "say": "One question. What is a Cutting?"
     }
    ]
   },
   {
    "id": "wl-y-help",
    "n": 3,
    "title": "Letting Others Help",
    "mins": 6,
    "blurb": "Receiving help as part of love, and asking for what you need.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 3",
      "h": "Letting Others Help",
      "sub": "Receiving is a gift too.",
      "say": "This lesson is about something many people find hard near the end of life: letting others help. Settle in. We'll go gently."
     },
     {
      "k": "big",
      "h": "Many people worry about being a burden.",
      "sub": "If you feel that way, you are not alone.",
      "say": "Many people near the end of life worry about being a burden. If you feel that way, you are not alone. Most people feel it sometimes, and it is one of the most common worries there is."
     },
     {
      "k": "big",
      "h": "It's hard to be on this side of the caring.",
      "sub": "That loss is real.",
      "say": "It's hard to be on this side of the caring. Maybe you were the one who drove, cooked, fixed things, and looked after everyone else. Letting go of that is a real loss, and it is okay to feel it."
     },
     {
      "k": "big",
      "h": "Letting them help is a gift you give them.",
      "sub": "It gives them a way to love you back.",
      "say": "Here is another way to see it. When you let the people you love care for you, you give them a way to love you back. Receiving care is part of love too, in the time you have left together."
     },
     {
      "k": "points",
      "h": "You still have much to give",
      "items": [
       [
        "Words for each person",
        "One line each is enough"
       ],
       [
        "A story from your life",
        "Kept as a Cutting"
       ],
       [
        "Your advice",
        "What life taught you"
       ],
       [
        "One specific thank-you",
        "Name one real thing"
       ]
      ],
      "say": "And you still have much to give. Words for each person you love. One line each is enough. A story from your life, kept as a Cutting. Your advice, the things life taught you. And one specific thank-you, naming one real thing they did."
     },
     {
      "k": "words",
      "h": "You can tell them what you need",
      "items": [
       "I need some quiet today.",
       "Will you sit with me?",
       "Please read to me.",
       "I want to talk about what is happening."
      ],
      "say": "You can tell them what you need. I need some quiet today. Will you sit with me? Please read to me. Or, I want to talk about what is happening. Many families are waiting for you to open that door."
     },
     {
      "k": "points",
      "h": "Willow helps them help you",
      "items": [
       [
        "They can tap for you",
        "You talk, they tap your answers"
       ],
       [
        "What helped today",
        "One line for the next helper"
       ],
       [
        "What Matters to Me",
        "Read aloud to new nurses and aides"
       ],
       [
        "You choose what they see",
        "In Willow Settings"
       ]
      ],
      "say": "Willow is built to help them help you. In a check-in, you can talk while a helper taps your answers, and Willow notes that the answers were yours. On Today, helpers keep a short log called What helped today, so the next person on shift knows. Your What Matters page tells new nurses and aides who you are. And you choose what helpers see."
     },
     {
      "k": "points",
      "h": "Your hospice team is there for you",
      "items": [
       [
        "The 24/7 line",
        "At the top of Today, day or night"
       ],
       [
        "Your nurse",
        "For comfort in your body"
       ],
       [
        "Your chaplain",
        "For faith, fears, and meaning"
       ],
       [
        "Your social worker",
        "For family, plans, and worries"
       ]
      ],
      "say": "Your hospice team is there for you too. Their 24/7 line is at the top of Today. Call it first, day or night. Your nurse helps with comfort in your body. Your chaplain is there for faith, fears, and meaning. Your social worker helps with family, plans, and worries."
     },
     {
      "k": "big",
      "h": "If the weight gets heavy, tell someone today.",
      "sub": "Your hospice team first. 988, call or text, any time.",
      "say": "If feeling like a burden gets heavy, tell your hospice team. When Life Changes has a guide for this, called I'm a burden. And if you ever think about ending your life, please tell someone right now. You can call or text nine eight eight, any time. If you are in danger, call nine one one."
     },
     {
      "k": "story",
      "title": "Total Bliss",
      "lines": [
       "Jane had been a young widow, and never stopped loving her husband.",
       "She told me her kids had said it was okay to go when she was ready.",
       "She said she felt nothing but peace and joy. Almost bliss."
      ],
      "lesson": "Peace can be part of the path, too.",
      "note": "From a Grounded story by Chris Joy",
      "hold": 2,
      "link": {
       "href": "https://chri5j0y.substack.com/p/total-bliss",
       "label": "Read the Full Story"
      },
      "say": "I met Jane in an assisted living facility, a few days before she died. She had been a young widow, left to raise two children alone, and she never stopped loving her husband, Gary. I asked if she felt like she was getting close. She said, I do feel like I am getting close to my death. But I feel nothing but peace and joy and almost, bliss. She told me she had talked with her kids, and they had told her it was okay to go when she was ready. I am so proud of those kids, she said, and I know they will be okay. We prayed together before I said goodbye. She died peacefully a few days later, her children at her side."
     },
     {
      "k": "words",
      "h": "Ask for one thing, or say one thank-you.",
      "items": [
       "Will you sit with me?",
       "Thank you for..."
      ],
      "say": "Let's try it. Think of one person who helps you. Picture their face. Now choose one thing you could ask them for, or one thank-you you could give them. Say it now, out loud or in your heart.",
      "beats": [
       "Let's try it.",
       "Think of one person who helps you.",
       "Picture their face.",
       "Now choose one thing you could ask them for, or one thank-you you could give them.",
       {
        "t": "Say it now, out loud or in your heart.",
        "w": 10
       }
      ]
     },
     {
      "k": "big",
      "h": "Receiving is part of love too.",
      "sub": "Let them in.",
      "say": "When they come in next, you might say it to them. Receiving is part of love too. Let them in."
     },
     {
      "k": "quiz",
      "q": "What is one way to see letting others help you?",
      "opts": [
       "As a burden on them",
       "As a gift that lets them show their love",
       "As something to avoid"
      ],
      "right": 1,
      "why": "Letting people help gives them a way to love you back, in the time you have together.",
      "say": "One question. What is one way to see letting others help you?"
     }
    ]
   },
   {
    "id": "wl-y-story",
    "n": 4,
    "title": "Your Story, in Your Words",
    "mins": 6,
    "blurb": "Telling your story, keeping your voice, and leaving letters for later.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 4",
      "h": "Your Story, in Your Words",
      "sub": "Kept for the people who stay.",
      "say": "This lesson is about your story, told in your own words. The stories only you can tell, kept for the people you love. Take it slowly. There is plenty of room here."
     },
     {
      "k": "big",
      "h": "Your story is worth keeping.",
      "sub": "Small stories count most of all.",
      "say": "Your story is worth keeping. Not only the big moments. The small ones count most of all. How you met. The job that taught you patience. The kitchen on a Saturday morning. The people you love will treasure these."
     },
     {
      "k": "points",
      "h": "Ways to tell it",
      "items": [
       [
        "Talk, and someone types",
        "Your words, written as you say them"
       ],
       [
        "Write it yourself",
        "A few lines at a time"
       ],
       [
        "Keep your voice, too",
        "Someone can record you on a phone"
       ]
      ],
      "say": "There are a few ways to tell it. You can talk, while someone you trust types your words just as you say them. You can write it yourself, a few lines at a time. And if you want your voice kept too, someone can record you on a phone."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Cuttings",
      "rows": [
       [
        "A story",
        ""
       ],
       [
        "Things I learned",
        ""
       ],
       [
        "A letter to keep",
        ""
       ],
       [
        "A blessing to leave",
        ""
       ],
       [
        "A recipe or a how-to",
        ""
       ]
      ],
      "tap": 0,
      "say": "In Willow, your story lives in Cuttings. A cutting is a small piece of a tree that can root and grow somewhere new. Choose what kind you are keeping. A story. Things I learned. A letter to keep. A blessing to leave. Or a recipe or a how-to, like the pie, or the fishing spot."
     },
     {
      "k": "card",
      "title": "A New Cutting",
      "body": "Type it, or have a helper type while you talk.",
      "fields": [
       [
        "A title",
        "The summer at the lake"
       ],
       [
        "For (optional)",
        "For Emma, on her wedding day"
       ]
      ],
      "btns": [
       "Save this cutting",
       "Cancel"
      ],
      "tap": 0,
      "say": "Give it a title, like the summer at the lake. If it is for someone, say so, like for Emma, on her wedding day. Then the words. Tap Save this cutting, and it is kept, with the date. If a helper typed it, Willow notes who wrote it down."
     },
     {
      "k": "points",
      "h": "Letters for later",
      "items": [
       [
        "A birthday you will miss",
        "Words they can open that day"
       ],
       [
        "A wedding or a graduation",
        "Your blessing, waiting for them"
       ],
       [
        "A hard day",
        "Something to hold when life is heavy"
       ]
      ],
      "say": "Some of the dearest cuttings are letters for later. A letter for a birthday you will miss. A blessing for a wedding or a graduation, waiting for them when the day comes. Or words for a hard day, something to hold when life gets heavy. A letter can be one paragraph."
     },
     {
      "k": "story",
      "title": "Letting Go. Mike's Story",
      "lines": [
       "Mike was forty-six, a crane operator for twenty years, with a son of fifteen and a daughter of thirteen.",
       "One afternoon I asked, What if you could still be the dad who shows up for them? His eyes sharpened.",
       "We recorded messages together, and he dictated letters for driver's license day, prom, graduation, even their weddings."
      ],
      "lesson": "Your voice and your words keep showing up for them.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "Let me tell you about Mike. He was forty-six, and he had run the big cranes for twenty years. His boy was fifteen and his girl was thirteen. I can't go yet, he told me. They still need their dad. I didn't argue. I pulled up a chair and stayed. One afternoon I asked him, what if you could still be the dad who shows up for them? His eyes sharpened. His ex-wife, Sarah, brought in his phone, and we recorded messages together. Stories from the crane cabs. Advice on bullies and heartbreak. How to change the oil in the old truck he was restoring with his son. He dictated letters for driver's license day, prom, graduation, even their weddings. Those recordings and letters are tucked away now, voice notes his kids can play when life gets heavy."
     },
     {
      "k": "big",
      "h": "Say the first line.",
      "sub": "One story is enough to start.",
      "beats": [
       "Let's try it together.",
       "Think of one story you want remembered.",
       "Maybe the day you met someone, or something life taught you the hard way.",
       {
        "t": "Now say its first line, out loud or quietly to yourself.",
        "w": 10
       }
      ],
      "say": "Let's try it together. Think of one story you want remembered. Maybe the day you met someone, or something life taught you the hard way. Now say its first line, out loud or quietly to yourself."
     },
     {
      "k": "points",
      "h": "Your words, your choice",
      "items": [
       [
        "Kept on this device",
        "Locked in your own profile"
       ],
       [
        "You choose who sees them",
        "Cuttings sharing is in Settings"
       ],
       [
        "Save or Print",
        "Any cutting, on paper too"
       ]
      ],
      "say": "Your cuttings are yours. They stay on this device, locked in your own profile. You choose whether your helpers can see them, in Settings. And every cutting has a Save or Print button, so you can hand it to someone on paper."
     },
     {
      "k": "points",
      "h": "More places your story lives",
      "items": [
       [
        "What Matters",
        "Who you are, in your own words"
       ],
       [
        "One gentle thing for today",
        "Sometimes it is One story"
       ],
       [
        "Photo time",
        "Old photos bring the stories back"
       ]
      ],
      "say": "Your story lives in other places, too. What Matters asks who you are as a person, so the people caring for you know who you are, not just what you have. Some days, the one gentle thing on Today will be One story. And old photos are a wonderful way to let the stories come back."
     },
     {
      "k": "big",
      "h": "One story is enough to start.",
      "sub": "You can always add more.",
      "say": "One story is enough to start. You can always add more, a little at a time. Your words will keep growing in them, like a cutting from a willow."
     },
     {
      "k": "quiz",
      "q": "How can you keep a story in Cuttings?",
      "opts": [
       "Only by typing it all yourself",
       "Talk while a helper types your words",
       "Wait until you can write it perfectly"
      ],
      "right": 1,
      "why": "A helper can type while you talk, in your own words. A few lines is enough.",
      "say": "One question. How can you keep a story in Cuttings?"
     }
    ]
   },
   {
    "id": "wl-y-rest",
    "n": 5,
    "title": "Rest Without Guilt",
    "mins": 5,
    "blurb": "Sleep is allowed, and rest is part of comfort.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 5",
      "h": "Rest Without Guilt",
      "sub": "Rest is part of comfort.",
      "say": "This lesson is about rest. If you are tired as you watch this, that is perfectly fine. You can watch it lying down, with your eyes closed, and just listen."
     },
     {
      "k": "big",
      "h": "Your body is doing hard work.",
      "sub": "Rest is how it carries you.",
      "say": "Near the end of life, many people find they want more rest, and more sleep. Your body is doing hard work. Rest is how it carries you through the day."
     },
     {
      "k": "big",
      "h": "Sleep is allowed. Rest is part of comfort.",
      "sub": "You are welcome to rest, today and every day.",
      "say": "Here is what Willow believes. Sleep is allowed. Rest is part of comfort. You are welcome to rest, today and every day, as often as your body asks."
     },
     {
      "k": "points",
      "h": "If guilt shows up",
      "items": [
       [
        "I should be doing more",
        "Resting is doing something"
       ],
       [
        "I am wasting the time I have",
        "Rest makes room for good hours"
       ],
       [
        "They need me awake",
        "Your being near is a gift to them"
       ]
      ],
      "say": "Sometimes guilt shows up anyway. It might say, I should be doing more. Resting is doing something. It is tending your body. It might say, I am wasting the time I have. Rest makes room for the good hours, the visits and the talks. Or it might say, they need me awake. The people who love you are often glad simply to sit near you while you sleep."
     },
     {
      "k": "big",
      "h": "Your presence is a gift, awake or asleep.",
      "sub": "Sitting with you is one way they love you.",
      "say": "Your presence is a gift, awake or asleep. For many families, sitting quietly beside you is one of the ways they love you. If you ever feel like a burden, there is a guide for that in When Life Changes, called I'm a burden. It speaks right to you."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 0,
      "note": {
       "h": "Today",
       "p": "One gentle thing for today. One a day is plenty, and none is okay."
      },
      "say": "On Today, Willow offers one gentle thing for today. Some days, it will be Rest without guilt. Tap Did it today, and that's enough. Tap Something else for a different idea. There are no streaks here. One a day is plenty, and none is okay."
     },
     {
      "k": "big",
      "h": "Let yourself be held.",
      "sub": "Right where you are.",
      "beats": [
       "Let's rest for a moment, right now.",
       "Let your shoulders soften.",
       "Let your hands grow heavy.",
       "Breathe gently, just as you are.",
       {
        "t": "Let the bed, or the chair, hold you.",
        "w": 12
       }
      ],
      "say": "Let's rest for a moment, right now. Let your shoulders soften. Let your hands grow heavy. Breathe gently, just as you are. Let the bed, or the chair, hold you."
     },
     {
      "k": "points",
      "h": "Make rest easier",
      "items": [
       [
        "What comforts me",
        "Write it in What Matters"
       ],
       [
        "Say what you need",
        "I need some quiet today"
       ],
       [
        "What helped",
        "One line on Today, for the next person"
       ]
      ],
      "say": "A few things can make rest easier. In What Matters, there is a place called What comforts me. Write what helps you settle, like music, touch, light or dark, or a window open. Tell the people near you what you need. I need some quiet today, is a kind thing to say. And when something helps you rest, add one line under What helped, on Today, so the next person knows."
     },
     {
      "k": "points",
      "h": "If rest is hard to find",
      "items": [
       [
        "Pain or hard breathing",
        "Call your hospice 24/7 line"
       ],
       [
        "A busy mind",
        "Hand off a worry to someone"
       ],
       [
        "Long, restless nights",
        "Tell your hospice nurse today"
       ]
      ],
      "say": "If rest is hard to find, your hospice team can help a great deal. For pain or hard breathing, call your hospice twenty four hour line, day or night. The number is at the top of Today. If your mind is busy, try the practice called Hand off a worry. Give one practical worry to someone else to carry. And if the nights are long and restless, tell your hospice nurse today."
     },
     {
      "k": "big",
      "h": "Rest is part of your growing.",
      "sub": "Every part of your tree can rest.",
      "say": "Rest is part of your growing, too. A willow rests in winter, and it is still a willow. Rest whenever you need to. Willow will be right here when you wake."
     },
     {
      "k": "quiz",
      "q": "What does Willow say about rest?",
      "opts": [
       "Rest has to be earned",
       "Rest is part of comfort",
       "Rest is time wasted"
      ],
      "right": 1,
      "why": "Sleep is allowed, and rest is part of comfort. You are welcome to rest whenever your body asks.",
      "say": "One question. What does Willow say about rest?"
     }
    ]
   },
   {
    "id": "wl-y-say",
    "n": 6,
    "title": "Saying What Needs Saying",
    "mins": 5,
    "blurb": "Thank you, I love you, I am sorry, I forgive you, and goodbye.",
    "sources": [
     "byock4"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For You, Lesson 6",
      "h": "Saying What Needs Saying",
      "sub": "A few words can hold a lifetime.",
      "say": "This last lesson is about the words you may want to say to the people who matter. A few words can hold a lifetime. Go at your own pace."
     },
     {
      "k": "big",
      "h": "These words are never too late.",
      "sub": "Today is a good day to say one.",
      "say": "Near the end of life, many people find there are a few things they want to say, while there is time. These words are never too late. Today is a good day to say one."
     },
     {
      "k": "words",
      "h": "Words many people want to say",
      "items": [
       "Thank you.",
       "I love you.",
       "I'm sorry. Please forgive me.",
       "I forgive you."
      ],
      "sub": "Then, when it feels right: goodbye.",
      "say": "Many hospice teams teach a few simple words. Thank you. I love you. I'm sorry, please forgive me. I forgive you. And then, when it feels right, goodbye. Say the ones that are true for you, and leave the rest."
     },
     {
      "k": "points",
      "h": "One at a time",
      "items": [
       [
        "Pick one person",
        "Whoever comes to mind first"
       ],
       [
        "Pick one true word",
        "Thank you is a fine place to start"
       ],
       [
        "Say it your way",
        "Out loud, in a letter, or a message"
       ]
      ],
      "say": "You can take these one at a time. Pick one person, whoever comes to mind first. Pick one word that is true for them. Thank you is a fine place to start. Then say it your way. Out loud, in a letter, in a message, or on a visit, if you both want one."
     },
     {
      "k": "points",
      "h": "About forgiveness",
      "items": [
       [
        "Forgiving sets a weight down",
        "It is different from saying it was okay"
       ],
       [
        "A letter counts",
        "Even one you never send"
       ],
       [
        "Always your choice",
        "And never owed to someone unsafe"
       ]
      ],
      "say": "A word about forgiveness. Forgiving is setting a weight down. It is different from saying it was okay, and it can happen without making up. A letter counts, even one you never send. One step counts too. And forgiveness is always your choice. It is never owed to someone who is unsafe."
     },
     {
      "k": "big",
      "h": "Sometimes it is just two words.",
      "sub": "Thank you, said simply, can mean everything.",
      "say": "Picture a family gathered at a bedside. No one quite knows what to say. Then a grown daughter takes her father's hand and says, simply, thank you. Thank you for every ride to school. Thank you for staying. He squeezes her hand. Nothing more is needed. The words are small. What they carry is enormous. A moment like that can stay with a family for years."
     },
     {
      "k": "points",
      "h": "When words are hard to find",
      "items": [
       [
        "Start with their name",
        "Then one true sentence"
       ],
       [
        "Hold a hand instead",
        "Touch can say it too"
       ],
       [
        "Ask for help",
        "A helper or your chaplain can sit with you"
       ]
      ],
      "say": "If the words are hard to find, start with their name, and then one true sentence. If speaking is hard, a hand held can say it too. And you can ask for help. A helper, or your hospice chaplain, can sit with you while you find the words."
     },
     {
      "k": "words",
      "h": "Say one now.",
      "items": [
       "Thank you.",
       "I love you.",
       "I'm sorry.",
       "I forgive you."
      ],
      "beats": [
       "Let's try one together.",
       "Think of one person.",
       "Choose one of these words that is true for them.",
       {
        "t": "Now say it, out loud, in a whisper, or quietly inside.",
        "w": 12
       }
      ],
      "say": "Let's try one together. Think of one person. Choose one of these words that is true for them. Now say it, out loud, in a whisper, or quietly inside."
     },
     {
      "k": "card",
      "title": "A New Cutting",
      "body": "One of the Four Things: please forgive me, I forgive you, thank you, I love you.",
      "fields": [
       [
        "For (optional)",
        "For my brother"
       ],
       [
        "The words",
        "Thank you for every Sunday call."
       ]
      ],
      "btns": [
       "Save this cutting",
       "Cancel"
      ],
      "tap": 0,
      "say": "If you want to keep those words, open Cuttings. Choose One of the Four Things, or A letter to keep. Write who it is for, then the words. You can talk while a helper types. Tap Save this cutting, and it is kept for them, ready to read, or to print and hand over."
     },
     {
      "k": "points",
      "h": "More help in Willow",
      "items": [
       [
        "Who I want close",
        "In What Matters, so people know"
       ],
       [
        "The call or visit I want",
        "A helper can make it happen"
       ],
       [
        "When Life Changes",
        "The guide: I can't forgive them"
       ]
      ],
      "say": "Willow can help in other ways, too. In What Matters, write who you want close, and who you wish were here. If there is a call or a visit you want, name it, and a helper can make it happen. And if forgiveness feels heavy, open When Life Changes and find the guide called I can't forgive them. It speaks right to you."
     },
     {
      "k": "big",
      "h": "Love said out loud keeps going.",
      "sub": "One word, to one person, is a beautiful start.",
      "say": "Love said out loud keeps going, long after the words are spoken. One word, to one person, is a beautiful start. Say it today, if you can, in whatever way is yours."
     },
     {
      "k": "quiz",
      "q": "What if you cannot say it in person?",
      "opts": [
       "It is too late to say it",
       "A letter counts, even one you never send",
       "Wait for the perfect moment"
      ],
      "right": 1,
      "why": "Words in a letter, a message, or a cutting still count. One step is enough.",
      "say": "One question. What if you cannot say it in person?"
     }
    ]
   }
  ]
 },
 {
  "id": "willow-helpers",
  "title": "For the People Who Love Them",
  "who": "For family, friends, and caregivers walking with someone in hospice",
  "certTitle": "Willow: For the People Who Love Them",
  "certLine": "For finishing every lesson in the Willow series for families and caregivers.",
  "lessons": [
   {
    "id": "wl-h-present",
    "n": 1,
    "title": "You Don't Have to Know What to Say",
    "mins": 7,
    "blurb": "Presence comes first: how to sit with someone you love near the end of life.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 1",
      "h": "You Don't Have to Know What to Say",
      "sub": "Presence comes first.",
      "say": "Welcome. This series is for the people who love someone in hospice. A spouse, a daughter or son, a friend, a neighbor who keeps showing up. Let's start with the worry almost everyone carries into the room. I don't know what to say."
     },
     {
      "k": "big",
      "h": "Your being there is the gift.",
      "sub": "Words are optional.",
      "say": "Here is what years at the bedside teach. Your being there is the gift. Words are optional. Most people near the end of life do not need a speech. They need someone close, someone who stays."
     },
     {
      "k": "points",
      "h": "The worries people carry in",
      "items": [
       [
        "Saying the wrong thing",
        "Kindness carries most words"
       ],
       [
        "Crying in front of them",
        "Your tears show your love"
       ],
       [
        "Not having the answers",
        "You can stay with the question"
       ],
       [
        "Not visiting long enough",
        "A short visit still counts"
       ]
      ],
      "say": "Almost everyone walks in with the same worries. What if I say the wrong thing? Kindness carries most words. What if I cry in front of them? Your tears show your love. What if they ask something I can't answer? You can stay with the question. And what if I can only stay a little while? A ten minute visit still counts."
     },
     {
      "k": "story",
      "title": "The Blanket That Didn't Need Smoothing",
      "lines": [
       "Her husband sat in a chair pulled so close his knee nearly touched the bed rail.",
       "For the next hour, he told me about their life together. Then he reached over and adjusted her blanket, though it hadn't slipped.",
       "He kept holding her hand like it was the only job left for him to do."
      ],
      "lesson": "Sometimes love just needs somewhere to put its hands.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "I once walked into a quiet room to see a woman in her final hours. Her husband sat in a chair pulled so close his knee nearly touched the bed rail. At first he was guarded, arms crossed. Then he said, I could probably use the company. Pull up a chair. For the next hour, he told me about their life together. They never let a day pass without saying I love you. As he talked, he reached over and adjusted her blanket, though it hadn't slipped. What matters, he told me, is that we loved each other well, and we said it every single day. And it's enough. He kept holding her hand like it was the only job left for him to do. Sometimes love just needs somewhere to put its hands."
     },
     {
      "k": "points",
      "h": "Ways to be present",
      "items": [
       [
        "Sit close",
        "Pull your chair near, at eye level"
       ],
       [
        "Offer touch, if it is welcome",
        "A hand to hold, a hand on the shoulder"
       ],
       [
        "Let silence be",
        "Quiet together is still company"
       ],
       [
        "Do small things",
        "A cool cloth, lip balm, a blanket set right"
       ]
      ],
      "say": "Here are some ways to be present. Sit close, at eye level. Offer touch, if it is welcome. A hand to hold, or a hand on the shoulder. If they pull away, that's okay too. Let silence be. Quiet together is still company. And do small things, like a cool cloth, lip balm, or a blanket set just right."
     },
     {
      "k": "points",
      "h": "Let them lead",
      "items": [
       [
        "Follow their topic",
        "The weather, the game, the old days"
       ],
       [
        "Let feelings be",
        "Tears and laughter both belong"
       ],
       [
        "Listen more than you fix",
        "You do not need every answer"
       ],
       [
        "Let them rest",
        "Sleep is part of the visit too"
       ]
      ],
      "say": "Let them lead. Follow their topic, even if it is the weather or the game or the old days. Let feelings be. Tears and laughter both belong in the room. Listen more than you fix. You do not need every answer. And if they drift off to sleep, let them rest. Sleep is part of the visit too."
     },
     {
      "k": "words",
      "h": "A few words are often enough",
      "items": [
       "I'm here.",
       "Tell me more.",
       "I love you.",
       "I don't know what to say, and I'm right here."
      ],
      "say": "When you do want words, a few are often enough. I'm here. Tell me more. I love you. And it is okay to be honest. I don't know what to say, and I'm right here. That one opens more doors than any speech."
     },
     {
      "k": "big",
      "h": "When they say something hard, you can stay with it.",
      "sub": "Tell me more. I am here.",
      "say": "Sometimes they will say something hard. I'm scared. I'm ready. Why is this happening? You do not have to fix it. You can say, tell me more. Or simply, I'm here. If they ever talk about ending their own life, call your hospice right away, day or night. If anyone is in danger right now, call nine one one."
     },
     {
      "k": "big",
      "h": "Try it now: I'm here.",
      "sub": "Close, quiet, and steady.",
      "beats": [
       "Let's try it now.",
       "If you are beside them, pull your chair a little closer, and rest your hand near theirs.",
       "If you are not, picture their face.",
       "Let one slow breath out.",
       {
        "t": "Then say it, out loud or in your heart: I'm here.",
        "w": 10
       }
      ],
      "say": "Let's try it now. If you are beside them, pull your chair a little closer, and rest your hand near theirs. If you are not, picture their face. Let one slow breath out. Then say it, out loud or in your heart: I'm here."
     },
     {
      "k": "points",
      "h": "Coming and going well",
      "items": [
       [
        "Say your name as you come in",
        "It's me. I'm here."
       ],
       [
        "Tell them when you leave",
        "Even if they seem asleep"
       ],
       [
        "Say when you will be back",
        "Or simply, see you soon"
       ],
       [
        "Pass it on",
        "One line for the next person"
       ]
      ],
      "say": "Coming and going matter too. As you come in, say your name, even if they know you well. When you leave, tell them, even if they seem asleep. Say when you will be back, or simply, see you soon. And before you go, pass on what helped."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Today with Mom",
      "rows": [
       [
        "Hospice 24/7 line",
        "Call"
       ],
       [
        "Mom's tree",
        "Quick Check-in"
       ],
       [
        "One gentle thing for today",
        ""
       ],
       [
        "What Helped Today",
        "Add a line"
       ],
       [
        "At the bedside today",
        "Two ideas"
       ]
      ],
      "tap": 3,
      "panel": {
       "h": "Pass it on to the next helper",
       "sub": "One line is enough.",
       "items": [
        "She settled when we played Amazing Grace.",
        "He asked for his brother."
       ]
      },
      "say": "Willow can help with that. When you open their tree, Today has a card called What Helped Today. One line is enough. She settled when we played Amazing Grace. He asked for his brother. The next person to sit with them will know what brought comfort."
     },
     {
      "k": "big",
      "h": "Bedside has more ideas for right now.",
      "sub": "Small, real things families can do.",
      "say": "When you want more ideas, open the Bedside tab. It holds small, real things families can do, like playing their music softly, or holding a hand. And Support for Right Now, on Today, has short videos for the hard hours."
     },
     {
      "k": "quiz",
      "q": "What matters most when you sit with someone near the end of life?",
      "opts": [
       "Finding the perfect words",
       "Being there with them",
       "Keeping the conversation going"
      ],
      "right": 1,
      "why": "Your being there is the gift. Words are optional.",
      "say": "One question. What matters most when you sit with someone near the end of life?"
     }
    ]
   },
   {
    "id": "wl-h-together",
    "n": 2,
    "title": "Using Willow Together",
    "mins": 6,
    "blurb": "Setting up Willow for someone you love, answering together, and keeping their voice their own.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 2",
      "h": "Using Willow Together",
      "sub": "One tree. Built for two.",
      "say": "This lesson walks through using Willow together, with the person you love. How to set it up, how to answer a check-in with them, and how their voice stays their own."
     },
     {
      "k": "big",
      "h": "Willow is their tree.",
      "sub": "You help them tend it.",
      "say": "Willow is their tree. You are there to help them tend it. They decide what to answer, and what to share with you. That choice is part of their dignity, right to the end."
     },
     {
      "k": "flow",
      "h": "Setting it up",
      "steps": [
       [
        "Your own profile",
        "Locked with your own passcode"
       ],
       [
        "A profile for them",
        "Made together, if you can"
       ],
       [
        "You open it as their helper",
        "With your own passcode"
       ]
      ],
      "say": "Here is how it starts. On Willow, choose For someone I love. First you make your own profile, locked with your own passcode. Then choose Make a profile for them, together if you can. Their tree lives in their own locked profile, and you open it as their helper, with your own passcode. If they already have a profile, open it with their passcode, and add yourself as a helper in Willow Settings."
     },
     {
      "k": "card",
      "title": "Who is answering?",
      "body": "Every answer keeps track of who gave it, so their own voice is never mixed up with anyone else's.",
      "fields": [
       [
        "",
        "Quick Check-in for Mom"
       ]
      ],
      "btns": [
       "They answered",
       "They answered, I tapped",
       "I'm answering from what I see"
      ],
      "tap": 1,
      "say": "When you start a check-in for them, Willow first asks, who is answering? Every answer keeps track of who gave it, so their own voice is never mixed up with anyone else's."
     },
     {
      "k": "points",
      "h": "Three ways to answer",
      "items": [
       [
        "They answered",
        "They read and answer on their own"
       ],
       [
        "They answered, I tapped",
        "They answer out loud, you tap"
       ],
       [
        "I'm answering from what I see",
        "When they can no longer say"
       ]
      ],
      "say": "There are three ways. They answered, reading on their own. They answered, I tapped, when they talk and you tap for them. Both of those grow a ring on their tree. And, I'm answering from what I see, when they can no longer say. Those answers are kept apart. They never add to their rings, and never speak for their own tree."
     },
     {
      "k": "words",
      "h": "Read one question aloud",
      "items": [
       "Lately, how often have you felt at peace, even for a moment?"
      ],
      "sub": "Then wait. Not sure is always okay.",
      "beats": [
       "When you tap for them, slow is kind.",
       "Read each question, then wait.",
       "Not sure is always an honest answer.",
       {
        "t": "Try one now, out loud and slowly: Lately, how often have you felt at peace, even for a moment?",
        "w": 10
       }
      ],
      "say": "When you tap for them, slow is kind. Read each question, then wait. Not sure is always an honest answer. Try one now, out loud and slowly: Lately, how often have you felt at peace, even for a moment?"
     },
     {
      "k": "points",
      "h": "Faith comes second, every time",
      "items": [
       [
        "Asked every time",
        "Right after who is answering"
       ],
       [
        "Every answer welcome",
        "Including none"
       ],
       [
        "Each person answers for themselves",
        "Never from what you see"
       ]
      ],
      "say": "Right after who is answering, Willow asks about faith, every time, because a chaplain always asks. Every answer is welcome, including none. And each person answers faith for themselves. When you answer from what you see, Willow leaves faith for them."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Mom's tree",
      "rows": [
       [
        "Roots",
        "Well tended",
        "#5F7D48"
       ],
       [
        "Trunk",
        "Holding",
        "#8B5E1A"
       ],
       [
        "Bark",
        "A growing edge",
        "#B8612F"
       ],
       [
        "Branches",
        "Well tended",
        "#5F7D48"
       ],
       [
        "Leaves",
        "Holding",
        "#8B5E1A"
       ],
       [
        "Fruit",
        "Holding",
        "#8B5E1A"
       ]
      ],
      "tap": 2,
      "panel": {
       "h": "A growing edge",
       "sub": "Where new growth begins.",
       "items": [
        "You can tend it with others beside you"
       ]
      },
      "say": "After a check-in, their tree shows gentle words for each part, never scores. Well tended right now. Holding, where a little tending could help. Or a growing edge, where new growth begins, tended with others beside them. Today then offers one gentle thing to do, often for the part that needs it most."
     },
     {
      "k": "points",
      "h": "What you can see is their choice",
      "items": [
       [
        "Usually shared",
        "Tree words, What Matters, Cuttings, the log"
       ],
       [
        "Private until they share",
        "Faith answers and check-in notes"
       ],
       [
        "Always private",
        "Their answer about safety at home"
       ],
       [
        "Theirs to change",
        "Anytime, in Willow Settings"
       ]
      ],
      "say": "What you can see is their choice. Their tree words, What Matters, Cuttings, and What Helped Today start out shared. Faith answers and notes from check-ins start private, until they share them. Their answer about feeling safe at home always stays private. And they can change any of it, anytime, in Willow Settings."
     },
     {
      "k": "points",
      "h": "Your own tree",
      "items": [
       [
        "My Own Tree",
        "Your check-ins, about you"
       ],
       [
        "One gentle thing for you",
        "Five minutes for you counts"
       ],
       [
        "Switch anytime",
        "Their tree, and yours"
       ]
      ],
      "say": "You have your own tree in Willow too, because you are carrying this as well. Tap My Own Tree. Your check-ins there ask about you, as you care for them. Today offers one gentle thing for you, because five minutes for you counts. It helps them too. And you can switch between their tree and yours anytime."
     },
     {
      "k": "points",
      "h": "Bring the team in",
      "items": [
       [
        "Share with My Chaplain or Doula",
        "Only what they chose to share"
       ],
       [
        "In person, sealed",
        "With a code you read aloud"
       ],
       [
        "Their faith on Bedside",
        "When they share it"
       ]
      ],
      "say": "Willow also helps you bring the hospice team in. Share with My Chaplain or Doula sends check-ins and What Matters to the chaplain or doula who visits, so they know where to start. You can share only what your person chose to share with helpers. It travels in person, sealed with a code you read aloud. And if they share their faith answers, the Bedside tab shows what matters in their tradition."
     },
     {
      "k": "big",
      "h": "The hospice line is at the top of Today.",
      "sub": "Call it first, day or night.",
      "say": "One last thing. Add your hospice twenty four hour number in Willow Settings, and it sits at the top of Today, one tap away. For anything urgent, call it first, day or night."
     },
     {
      "k": "quiz",
      "q": "When you answer a check-in from what you see, what happens to those answers?",
      "opts": [
       "They replace their own answers",
       "They are kept apart from their own tree",
       "They are sent to the hospice"
      ],
      "right": 1,
      "why": "Answers from what you see are kept apart, and never speak for their own tree.",
      "say": "One question. When you answer a check-in from what you see, what happens to those answers?"
     }
    ]
   },
   {
    "id": "wl-h-weeks",
    "n": 3,
    "title": "What the Last Weeks Can Look Like",
    "mins": 7,
    "blurb": "Changes many people go through near the end of life, and how love can meet each one.",
    "sources": [
     "hui",
     "mccann",
     "kerr",
     "nahm"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 3",
      "h": "What the Last Weeks Can Look Like",
      "sub": "Knowing helps.",
      "say": "Many families say the hardest part was not knowing what was normal. This lesson walks through changes many people go through near the end of life. Every person is different, and your hospice nurse knows your person best."
     },
     {
      "k": "flow",
      "h": "A world that slowly gets smaller",
      "steps": [
       [
        "Weeks before",
        "More sleep, less eating, less talking"
       ],
       [
        "Days before",
        "Very little food or drink, restless or confused at times"
       ],
       [
        "Hours before",
        "Breathing changes, less response"
       ]
      ],
      "say": "Here is the general shape. Weeks before, many people sleep more, eat less, and talk less. Their world gets smaller. Days before, they may take very little food or drink, and may be restless or confused at times. In the last hours, breathing changes, and they respond less. No one can name the minute, so take it one day at a time."
     },
     {
      "k": "big",
      "h": "Turning inward is normal.",
      "sub": "Your presence still matters in the quiet.",
      "say": "Turning inward is normal. If they talk less, or seem far away, they are often doing quiet inner work. Your presence still matters, even in the quiet. You can sit close, and let the silence be company."
     },
     {
      "k": "points",
      "h": "When they stop eating",
      "items": [
       [
        "The body slows down",
        "It can no longer use food the same way"
       ],
       [
        "Hunger usually fades",
        "Most do not feel hunger or thirst"
       ],
       [
        "Part of dying, not the cause",
        "Not eating is not starving"
       ]
      ],
      "say": "When they stop eating, it is hard to watch. Food is love in almost every family. But near the end, the body slows down and can no longer use food the same way. A dying person usually does not feel hunger or thirst. Not eating is part of dying, not the cause of it."
     },
     {
      "k": "words",
      "h": "Love looks different now",
      "items": [
       "Ice chips and sips, only if they want them",
       "A swab and lip balm for a dry mouth",
       "A little taste of something they love",
       "Sitting together at the table"
      ],
      "say": "So love looks different now. Ice chips and sips, only if they want them. A swab and lip balm for a dry mouth. A little taste of something they love. Or simply sitting together at the table, even if they do not eat. Pushing food can make them uncomfortable, so follow their lead."
     },
     {
      "k": "story",
      "title": "Welcome Home",
      "lines": [
       "A daughter texted me before my first sip of coffee: Dad is seeing ghosts. What does this mean?",
       "Her father turned toward something we could not see and raised both arms. Very quietly, he said, I love you. I love you. I love you.",
       "That evening, he passed peacefully, just as we had seen him: arms open."
      ],
      "lesson": "Visions near the end usually bring comfort. Ask who is there.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/welcome-home",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Before my first sip of coffee, a text came in. Dad is seeing ghosts. What does this mean? I wrote back, we might be getting close. Can I come by? Jim was in a hospital bed in the small living room. His daughter July asked me, is he going to be okay? I told her this happens more than you'd think. Patients see relatives who died years ago, across just about every faith, and plenty of people with no faith at all. Then Jim turned toward something on his left and raised both arms. Very quietly, he said, I love you. I love you. I love you. His arms stayed open, reaching for someone neither of us could see. That evening, July texted me. He had passed peacefully, arms open."
     },
     {
      "k": "points",
      "h": "When they see someone you cannot",
      "items": [
       [
        "Ask, do not correct",
        "Who's here? What are they saying?"
       ],
       [
        "Usually a comfort",
        "Often loved ones who have died"
       ],
       [
        "Different from confusion",
        "And often a sign death is closer"
       ],
       [
        "Tell the nurse",
        "Right away if it brings fear"
       ]
      ],
      "say": "Many people near the end see loved ones who have died. It usually brings comfort, and it is different from confusion. So ask, don't correct. Who's here? What are they saying? It often means death is getting closer. Let the hospice nurse know, and call right away if a vision brings fear or distress."
     },
     {
      "k": "points",
      "h": "In the last hours or days",
      "items": [
       [
        "Breathing changes",
        "Pauses, then a few quick breaths"
       ],
       [
        "A rattling sound",
        "Usually bothers us more than them"
       ],
       [
        "Cool hands and feet",
        "Blotchy skin on knees and feet"
       ],
       [
        "Less response",
        "Keep talking to them"
       ]
      ],
      "say": "In the last hours or days, breathing often changes, with long pauses and then a few quick breaths. There may be a rattling sound in the throat. It usually bothers us more than it bothers them. Hands and feet may feel cool, and the skin on the knees and feet may look blotchy. They respond less. Keep talking to them, and moisten their lips."
     },
     {
      "k": "big",
      "h": "Steady your own breath.",
      "sub": "A calm body in the room helps everyone.",
      "beats": [
       "Changing breath can be hard to listen to.",
       "Let your own breath be the steady one in the room.",
       "Breathe in slowly.",
       {
        "t": "Now let it out, longer than it came in, and do one more at your own pace.",
        "w": 10
       }
      ],
      "say": "Changing breath can be hard to listen to. Let your own breath be the steady one in the room. Breathe in slowly. Now let it out, longer than it came in, and do one more at your own pace."
     },
     {
      "k": "big",
      "h": "Sometimes there is a rally.",
      "sub": "A surprising burst of energy. Treat it as a gift.",
      "say": "Sometimes a person who has been very sleepy wakes up, talks, eats, and knows everyone. It is real, and it is often brief. Treat it as a gift. Use it to say what you want to say, and call family who want to come. Talk with the nurse before reading it as recovery."
     },
     {
      "k": "points",
      "h": "Call your hospice first",
      "items": [
       [
        "Restless or grimacing",
        "Or anything that looks like distress"
       ],
       [
        "Day or night",
        "The 24/7 line is at the top of Today"
       ],
       [
        "Before 911",
        "For anything hospice can help with"
       ]
      ],
      "say": "Most of all, call your hospice anytime something worries you. Restlessness, grimacing, or anything that looks like distress. Their twenty four hour line sits at the top of Today in Willow. Call it first, before nine one one, for anything hospice can help with. You never have to guess alone."
     },
     {
      "k": "big",
      "h": "When Life Changes has a guide for each.",
      "sub": "What dying looks like, not eating, visions, and the rally.",
      "say": "When you want to read more, open When Life Changes in Willow. There are guides for what dying looks like, for when they stop eating, for visions of people who have died, and for the rally. Each one has words to say, and what helps."
     },
     {
      "k": "quiz",
      "q": "When someone near the end stops eating, what usually helps most?",
      "opts": [
       "Encouraging them to eat more",
       "Ice chips, lip balm, and only what they want",
       "Waiting to visit until they eat again"
      ],
      "right": 1,
      "why": "Near the end, love looks like comfort: ice chips, lip balm, and only what they want.",
      "say": "One question. When someone near the end stops eating, what usually helps most?"
     }
    ]
   },
   {
    "id": "wl-h-words",
    "n": 4,
    "title": "When Words Run Out",
    "mins": 7,
    "blurb": "How love still reaches them when they can no longer answer.",
    "sources": [
     "blundon"
    ],
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 4",
      "h": "When Words Run Out",
      "sub": "Love still reaches them.",
      "say": "There may come a time when the person you love can no longer talk, or open their eyes, or squeeze your hand back. This lesson is about how love still reaches them."
     },
     {
      "k": "big",
      "h": "Hearing may be one of the last senses to go.",
      "sub": "Speak to them, not about them.",
      "say": "Hearing may be one of the last senses to go. In a hospice study, the brains of people who could no longer respond still answered to sound in their last hours. No one can know how much they understand. So speak to them, not about them."
     },
     {
      "k": "points",
      "h": "In the room",
      "items": [
       [
        "Greet them by name",
        "It's me. I'm here."
       ],
       [
        "Tell them who is here",
        "And who is thinking of them"
       ],
       [
        "Say what you are doing",
        "I'm going to wet your lips now."
       ],
       [
        "Take hard talks outside",
        "Plans and worries, in the hallway"
       ]
      ],
      "say": "In the room, greet them by name. It's me. I'm here. Tell them who is here, and who is thinking of them from far away. Say what you are doing, like, I'm going to wet your lips now. And take the hard talks out to the hallway."
     },
     {
      "k": "points",
      "h": "Ways to reach them",
      "items": [
       [
        "Your voice",
        "Stories, memories, the small news of the day"
       ],
       [
        "Their music",
        "The songs they love, played softly"
       ],
       [
        "Touch, if it is welcome",
        "A hand held, an arm stroked, hair brushed"
       ],
       [
        "A phone to their ear",
        "For family far away"
       ]
      ],
      "say": "Here are ways to reach them. Your voice, with stories, memories, or the small news of the day. Their music, played softly. Touch, if it is welcome, like a hand held, an arm stroked, or hair brushed. And for family far away, a phone held gently to their ear."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "What Matters: When the Time Comes",
      "rows": [
       [
        "The room",
        ""
       ],
       [
        "The people",
        ""
       ],
       [
        "The words",
        ""
       ],
       [
        "Touch",
        ""
       ],
       [
        "After",
        ""
       ]
      ],
      "tap": 2,
      "panel": {
       "h": "The words",
       "sub": "What do you want said, read, prayed, or sung?",
       "items": [
        "The song from our wedding",
        "A reading from my tradition",
        "The grandkids telling stories"
       ]
      },
      "say": "Willow can help you know what they would want. On What Matters, under When the time comes, there is a place called The words. What do they want said, read, prayed, or sung? If they wrote it down while they could, this is the time to use it."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 5,
      "note": {
       "h": "Readings",
       "p": "Psalms, prayers, poems, and blessings to read aloud, for all faith traditions and everything in-between."
      },
      "say": "If you are not sure what to say, the Readings tab has words ready. Psalms, prayers, poems, and blessings, for all faith traditions and everything in-between. Choose one that fits them. Read slowly. Read it twice."
     },
     {
      "k": "story",
      "title": "If She Is Still Here",
      "lines": [
       "On my day off, a daughter texted that her mom had taken a turn. I wrote back that I could come tomorrow.",
       "She answered: Okay. If she is still here. I went right away.",
       "Her mom died peacefully in her sleep a few hours after I left. I am so glad I did not wait."
      ],
      "lesson": "If something tells you to go now, go now.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/if-she-is-still-here",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Let me tell you about a text I got on my day off. It was from Jenny, a daughter I had been visiting for about a year. Her mom, Carol, had taken a turn. Can you come? I wrote back that I was off, and could come by tomorrow. She answered, okay. If she is still here. My heart dropped. Only a few days before, Carol and I had been laughing together. I went right away. I prayed for Carol and her family, and everyone in the room cried. It was not grief breaking them down. It was something in them finally letting go. Carol died peacefully in her sleep a few hours after I left. I almost said tomorrow. I am so glad I did not."
     },
     {
      "k": "words",
      "h": "Things you can say now",
      "items": [
       "Thank you for loving me.",
       "I'll take care of Mom.",
       "We're going to be okay.",
       "You can rest when you are ready."
      ],
      "say": "If something is telling you to go now, go now, and say what you want to say today. Here are things families often say. Thank you for loving me. I will take care of Mom. We are going to be okay. And, when it feels right, you can rest when you are ready."
     },
     {
      "k": "big",
      "h": "Say one true thing to them.",
      "beats": [
       "Let us practice.",
       "Think of the person you love.",
       "Picture their face, and say their name.",
       {
        "t": "Now say one true thing to them, out loud or in your heart.",
        "w": 12
       }
      ],
      "say": "Let us practice. Think of the person you love. Picture their face, and say their name. Now say one true thing to them, out loud or in your heart."
     },
     {
      "k": "story",
      "title": "Please Help My Dad Die",
      "lines": [
       "A man was struggling to let go. His son, the one closest to him, could not bring himself to come.",
       "I told him his children would be alright, that his son loved him deeply even if he could not be there, and that he was free to go.",
       "His arm lifted, as if reaching for something. His daughter cried, Dad, I am here. You can go. He died peacefully the next day, with her at his side."
      ],
      "lesson": "Telling someone, once, that they can go when they are ready can be a gift.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/please-help-my-dad-die",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "I was once called to the bedside of a man named Bob, who was struggling to let go. His daughter hoped I could help. Her brother, the one closest to their dad, could not bring himself to come. Bob was in a deep sleep. I put a hand on his shoulder and told him who I was. Then I told him it was okay to go. That his son and daughter would be alright. That his son loved him deeply, even if he could not be there. That he was free to go. His arm lifted slowly, as if he were reaching for something. His daughter burst into tears. Dad, I'm here. You can go. The next day, Bob died peacefully, with his daughter at his side."
     },
     {
      "k": "big",
      "h": "Some people seem to wait.",
      "sub": "For a visitor, a date, or permission.",
      "say": "Some people seem to wait, for a visitor, a date, or permission. Bedside workers see it often, though no one can say for sure why. Is anyone missing? Is anything left unsaid? If it feels right, tell them once that they can go when they are ready. Once is enough."
     },
     {
      "k": "big",
      "h": "Something worries you? Call your hospice first.",
      "sub": "Day or night. The line is at the top of Today.",
      "say": "If anything worries you, like restlessness or a grimace, call your hospice first, day or night. Their twenty four hour line sits at the top of Today."
     },
     {
      "k": "quiz",
      "q": "If the person you love can no longer respond, what can you still do?",
      "opts": [
       "Stop talking, since they cannot hear",
       "Keep talking to them, play their music, and hold their hand",
       "Talk about them in the room as if they are not there"
      ],
      "right": 1,
      "why": "Hearing may be one of the last senses to go. Speak to them, play their music, and stay close.",
      "say": "One question. If the person you love can no longer respond, what can you still do?"
     }
    ]
   },
   {
    "id": "wl-h-ready",
    "n": 5,
    "title": "When They're Ready and You're Not",
    "mins": 7,
    "blurb": "Holding on, letting go, and the hard space in between.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 5",
      "h": "When They're Ready and You're Not",
      "sub": "Holding on, and letting go.",
      "say": "Sometimes the person you love finds peace with dying before you do. They are ready, and you are not. Sometimes it is the other way around. This lesson is about that hard space in between."
     },
     {
      "k": "big",
      "h": "Readiness comes to each person in its own time.",
      "sub": "It comes a little at a time, or not at all.",
      "say": "Readiness rarely arrives for everyone at once. The person who is dying may get there first, after quiet work of their own. Or a spouse may be ready long before the person is. Readiness comes a little at a time, or not at all, and both are allowed."
     },
     {
      "k": "story",
      "title": "Peace That Passes Understanding",
      "lines": [
       "Her husband sat in a lawn chair in the driveway. I'm not ready for any of this, he said.",
       "Inside, she smiled. I'm going to die, and I'm okay with it. But a lot of people think I should fight it.",
       "She was not depressed or hopeless. She was ready to go be with God. Not giving up. A deep spiritual readiness."
      ],
      "lesson": "Love sometimes holds on with everything it has. Sometimes it opens its hands.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "I once pulled up to a house where the husband was already sitting outside, in a lawn chair in the driveway. It's not going well, he told me. She's given up. She's the one who wanted you to come. I'm not ready for any of this. Inside, his wife sat at the dining room table with a bright, peaceful smile. I'm going to die, she told me, and I'm okay with it. But a lot of people think I should fight it. Some are even saying I'm suicidal. She was not depressed or hopeless. I'm ready to go be with Him, she said. Sitting with her, I did not see someone giving up. I saw a deep spiritual readiness. Love sometimes holds on with everything it has. And sometimes it learns to let go with open hands."
     },
     {
      "k": "big",
      "h": "Being ready is different from wanting to end your life.",
      "sub": "Unsure? Call your hospice. 988 and 911 too.",
      "say": "Here is something important. Being at peace with dying is different from wanting to end your life. Many people near the end feel ready, and that can be a deep peace. If they ever talk about ending their own life, or you are unsure which you are hearing, call your hospice right away, day or night. You can also call or text nine eight eight. In danger now, call nine one one."
     },
     {
      "k": "points",
      "h": "If you are not ready",
      "items": [
       [
        "Say so, gently",
        "I am not ready to lose you, and I love you"
       ],
       [
        "Let both be true",
        "Your grief and their peace can share a room"
       ],
       [
        "Get support",
        "The hospice chaplain or social worker"
       ],
       [
        "Take breaks",
        "Step outside when it is too much"
       ]
      ],
      "say": "If you are not ready, you can say so, gently. I am not ready to lose you, and I love you. Let both be true. Your grief and their peace can share a room. Talk with the hospice chaplain or social worker. And step outside when it is too much."
     },
     {
      "k": "words",
      "h": "Words for when you are not ready",
      "items": [
       "I am not ready to lose you.",
       "And I love you.",
       "Tell me what peace feels like for you.",
       "I will be with you, all the way."
      ],
      "say": "Here are words for this space. I am not ready to lose you. And I love you. Tell me what peace feels like for you. I will be with you, all the way."
     },
     {
      "k": "big",
      "h": "Hold on, then open your hands.",
      "beats": [
       "Let us try this with your body.",
       "Make two fists, and hold them tight, the way love holds on.",
       "Now slowly open your hands, palms up, and let them rest.",
       {
        "t": "Breathe out, and notice what open hands feel like.",
        "w": 10
       }
      ],
      "say": "Let us try this with your body. Make two fists, and hold them tight, the way love holds on. Now slowly open your hands, palms up, and let them rest. Breathe out, and notice what open hands feel like."
     },
     {
      "k": "big",
      "h": "If they ask, Why is God doing this to me?",
      "sub": "You can stay with the question.",
      "say": "Sometimes it is the other way around. You are ready to let them rest, and they are angry, afraid, or asking, why is God doing this to me? That question is as old as faith itself. You can stay with it."
     },
     {
      "k": "story",
      "title": "Why Is God Doing This to Me?",
      "lines": [
       "Her arms shook with tremors. Why is God doing this to me? she asked. I was careful not to rush an answer.",
       "I held her hands and said, anyone in your shoes would be asking the same thing. Scripture is full of people asking it too.",
       "Something shifted. He has never left me, she said. Later she said, I'm ready for that, and closed her eyes."
      ],
      "lesson": "You can honor the question without rushing to answer it.",
      "note": "Names and details changed",
      "hold": 2,
      "say": "I once sat with a woman named Mary, whose arms shook with tremors she could not control. She asked me, why is God doing this to me? The nurse in the room looked at me as if to say, how do you even answer that? I was careful not to rush. I held both her hands, leaned in, and said, Mary, anyone in your shoes would be asking the same thing. Scripture is full of people shaking their fists at God and asking why. Something shifted in her. You're right, she said. He has never left me. Then, quietly, but when will this end? I told her I did not know when. But I knew her rest was coming. She said, I'm ready for that, and closed her eyes."
     },
     {
      "k": "points",
      "h": "When faith feels complicated",
      "items": [
       [
        "Listen first",
        "Let them say the hard thing"
       ],
       [
        "Stay curious",
        "Doubt and anger are part of faith for many"
       ],
       [
        "Offer their own words",
        "A prayer or reading from their tradition"
       ],
       [
        "Invite the chaplain",
        "Or their own faith leader"
       ]
      ],
      "say": "When faith feels complicated, listen first. Let them say the hard thing. Stay curious with them. For many people, doubt and anger are part of faith. Offer words from their own tradition. And invite the hospice chaplain, or their own faith leader. Bedside has a section called When faith is complicated, for this."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "When Life Changes",
      "rows": [
       [
        "\"I wish it would end.\" \"I'm ready.\"",
        "Guide"
       ],
       [
        "\"I'm not ready.\"",
        "Guide"
       ],
       [
        "\"Is God punishing me?\"",
        "Guide"
       ],
       [
        "\"Why are they hanging on?\"",
        "Guide"
       ]
      ],
      "tap": 1,
      "panel": {
       "h": "\"I'm not ready.\"",
       "sub": "Sort what feels least ready.",
       "items": [
        "Affairs",
        "People",
        "Spirit"
       ]
      },
      "say": "When Life Changes has guides for this exact space. I'm ready. I'm not ready. Is God punishing me? Each guide has words to say, and two short videos, one For You and one For the Helper."
     },
     {
      "k": "quiz",
      "q": "Your person feels ready to die and you are not. What can help?",
      "opts": [
       "Hiding your feelings completely",
       "Letting both be true, and getting support for yourself",
       "Convincing them to keep fighting"
      ],
      "right": 1,
      "why": "Your grief and their peace can share a room. Let both be true, and lean on your hospice team.",
      "say": "One question. Your person feels ready, and you are not. What can help?"
     }
    ]
   },
   {
    "id": "wl-h-you",
    "n": 6,
    "title": "Caring for Yourself on the Way",
    "mins": 7,
    "blurb": "Your own tree, your own grief, and the help that is there for you.",
    "scenes": [
     {
      "k": "title",
      "hero": "willow",
      "eyebrow": "For the People Who Love Them, Lesson 6",
      "h": "Caring for Yourself on the Way",
      "sub": "You matter here too.",
      "say": "This last lesson is about you. Caring for someone at the end of life is love, and it is also hard, tiring work. You matter here too."
     },
     {
      "k": "points",
      "h": "What caregivers carry",
      "items": [
       [
        "Long days and nights",
        "Watching, waiting, listening"
       ],
       [
        "Hard choices",
        "Often made tired, and often made fast"
       ],
       [
        "Grief that starts early",
        "Losing them a little at a time"
       ],
       [
        "Your own life on hold",
        "Work, sleep, friends, meals"
       ]
      ],
      "say": "Look at what you are carrying. Long days and nights of watching and waiting. Hard choices, often made tired. Grief that starts early, as you lose them a little at a time. And your own life, set on hold. That is a lot for one heart."
     },
     {
      "k": "story",
      "title": "Grief Debt",
      "lines": [
       "One week I caught myself walking around numb. Not sad, not angry. Just numb.",
       "A few patients I had grown attached to had died, and a close friend had just lost his wife. Three smaller losses hit me like one big one.",
       "Grief we put off piles up quietly, like laundry we swear we will fold."
      ],
      "lesson": "Pay grief down a little at a time.",
      "note": "From a Grounded story by Chris Joy",
      "link": {
       "href": "https://chri5j0y.substack.com/p/grief-debt",
       "label": "Read the Full Story"
      },
      "hold": 2,
      "say": "Some weeks just feel heavier than others. One week I caught myself walking around numb. Not sad, not angry, just numb. That is usually my first clue that I have racked up too much grief debt. Grief debt is what happens when life keeps handing you losses, and you keep telling yourself you will feel them later. That week, a few patients I had grown attached to had died, and a close friend had just lost his wife. Three smaller losses had quietly joined forces and hit me like one big one. My heart was keeping better count than my head. The pile grows quietly, like laundry you swear you are going to fold. The kindness is learning to pay it down before the interest gets too high."
     },
     {
      "k": "flow",
      "h": "Notice. Name. Express. Unpack.",
      "steps": [
       [
        "Notice it",
        "Something is there"
       ],
       [
        "Name it",
        "As clearly as you can"
       ],
       [
        "Express it",
        "Talk, write, cry"
       ],
       [
        "Unpack it",
        "Walk, stretch, breathe"
       ]
      ],
      "say": "Here is a simple way to pay it down. First, notice it. Just admit something is there, with no fixing and no judgment. Second, name it, as clearly as you can. Third, express it. Talk, write, cry, or sit and let yourself feel it. Fourth, unpack it with your body. A slow walk, a stretch, a few long breaths."
     },
     {
      "k": "points",
      "h": "Practice: A Grief Debt Check",
      "items": [
       [
        "Notice",
        "What have I been carrying lately?"
       ],
       [
        "Name",
        "One loss I have not let myself feel"
       ],
       [
        "Express",
        "A few words, out loud or inside"
       ],
       [
        "Unpack",
        "Roll your shoulders, one long breath out"
       ]
      ],
      "cue": {
       "w": {
        "2": 8,
        "4": 10,
        "6": 12,
        "8": 8
       },
       "at": [
        1,
        3,
        5,
        7
       ]
      },
      "say": "Let us try it now, for just a minute. Notice. Ask yourself, what have I been carrying lately? Name. Choose one loss you have not let yourself feel yet. Express. Say a few words about it, out loud or in your heart. Unpack. Roll your shoulders, and let one long breath out."
     },
     {
      "k": "points",
      "h": "Signs you need a break",
      "items": [
       [
        "Short temper",
        "Snapping at people you love"
       ],
       [
        "Not sleeping or eating",
        "Running on empty"
       ],
       [
        "Feeling numb",
        "Or far away"
       ],
       [
        "Thinking, no one else can do this",
        "Others can help"
       ]
      ],
      "say": "Watch for signs you need a break. A short temper. Not sleeping or eating. Feeling numb, or far away. Or thinking, no one else can do this. Others can help, and letting them is part of loving well."
     },
     {
      "k": "big",
      "h": "Guilt usually means you love them.",
      "sub": "I'm doing what love can do today.",
      "say": "Many caregivers carry guilt. Am I doing enough? Am I doing it wrong? Guilt usually means you love them. Try writing the guilt down. Then, under it, write, I'm doing what love can do today."
     },
     {
      "k": "screen",
      "app": "willow",
      "app_name": "Willow",
      "title": "Today, for you",
      "rows": [
       [
        "Hospice 24/7 line",
        "Call"
       ],
       [
        "Your tree",
        "Gentle words"
       ],
       [
        "Today's practice",
        "For you"
       ],
       [
        "The people you care for",
        "Mom's tree"
       ]
      ],
      "tap": 1,
      "panel": {
       "h": "Lately, as you care for Mom",
       "sub": "Your own check-in.",
       "items": [
        "Had someone to lean on?",
        "Taken a break without guilt?",
        "Let yourself feel what you feel?"
       ]
      },
      "say": "Willow gives you a tree of your own, because caregivers carry this as well. When you open your own tree, Today says, Today, for you. Your check-in asks about you. Have you had someone to lean on? Taken a break without guilt? Let yourself feel what you feel? You see gentle words, never a score."
     },
     {
      "k": "tabs",
      "app": "willow",
      "app_name": "Willow",
      "tabs": [
       "Today",
       "What Matters",
       "Cuttings",
       "Bedside",
       "When Life Changes",
       "Readings",
       "Learn"
      ],
      "tap": 3,
      "note": {
       "h": "Care for the one keeping watch",
       "p": "Small things for you: a long out-breath, a grief debt check, one real meal."
      },
      "say": "On Bedside, scroll to Care for the one keeping watch. It has small things for you. One minute of long out-breaths before you walk in. A grief debt check. Gates, not walls, so someone else can take a shift. And one real meal today."
     },
     {
      "k": "points",
      "h": "Help is there",
      "items": [
       [
        "Respite care",
        "Ask your hospice about short breaks"
       ],
       [
        "Hospice volunteers",
        "Someone to sit while you rest"
       ],
       [
        "Grief support",
        "Now, and for about a year after"
       ],
       [
        "988",
        "Call or text if you are struggling"
       ]
      ],
      "say": "Help is there. Ask your hospice about respite care, a short break for you. Hospice volunteers can sit while you rest. Grief support is there now, and for about a year after a death. Ask for it by name. And if you are struggling, call or text nine eight eight, any time. In danger now, call nine one one."
     },
     {
      "k": "big",
      "h": "Feeling relief after a long road is normal.",
      "sub": "It does not mean you loved them less.",
      "say": "One more thing. After a long road, many people feel relief when it ends, and then guilt for feeling relief. Relief and grief can live in the same heart. Relief is normal. It means you carried a lot, for a long time."
     },
     {
      "k": "big",
      "h": "You are bending, and you are not alone.",
      "sub": "Held gently, all the way home.",
      "say": "A willow bends in the storm, so far you think it should break, and it does not. You are bending too. You are not alone. Thank you for walking with the person you love, all the way home."
     },
     {
      "k": "quiz",
      "q": "What is grief debt?",
      "opts": [
       "Money owed for a funeral",
       "Grief that piles up when we keep putting it off",
       "A kind of hospice bill"
      ],
      "right": 1,
      "why": "Grief we keep putting off piles up. Notice, name, express, and unpack to pay it down.",
      "say": "Last question. What is grief debt?"
     }
    ]
   }
  ]
 }
    ]
  },
  /* The Grove Learn (GWG BLD 730): Start Here, Using The Grove, The Six Parts, Together, and Do This Together.
     Generated from patches/bld730/source in grounded-workshop. */
  grove: {
 "title": "Learn The Grove",
 "intro": "Short lessons, narrated aloud, for the whole family to watch together.",
 "supportFirst": true,
 "support": {
  "eyebrow": "Together",
  "title": "Do This Together",
  "intro": "Short videos for the whole family to do side by side. Pick one anytime, as often as you like. Nothing to finish."
 },
 "lessonsTitle": "Learn Step by Step",
 "tracks": [
  {
   "id": "grove-start",
   "title": "Start Here",
   "who": "For families growing side by side",
   "lessons": [
    {
     "id": "gr-welcome",
     "n": 1,
     "title": "Welcome to The Grove",
     "mins": 4,
     "blurb": "Where every tree in your family grows side by side.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Start Here, Lesson 1",
       "h": "Welcome to The Grove",
       "sub": "Where our trees grow together.",
       "say": "Welcome to The Grove, where our trees grow together. This short lesson is for the whole family. Grab a spot on the couch, and let us start."
      },
      {
       "k": "big",
       "h": "Your tree is yours. The grove is ours.",
       "sub": "All ages, all stages, side by side.",
       "say": "Here is the big idea. Your tree is yours. The grove is ours. All ages, all stages, side by side."
      },
      {
       "k": "trees",
       "h": "A tree for every age",
       "grove": true,
       "say": "Everyone in the family has their own tree, in their own app. Maple is for kids. Aspen is for middle schoolers. Oak is for grown-ups, and for high schoolers until Pine is ready. And The Grove is where all of those trees stand together."
      },
      {
       "k": "points",
       "h": "Every family looks different",
       "items": [
        [
         "One grown-up or two",
         "Or grandparents raising grandkids"
        ],
        [
         "Blended and foster families",
         "Everyone who lives with you"
        ],
        [
         "Roommates who are family",
         "Family is who you grow with"
        ]
       ],
       "say": "Every family looks different, and every family belongs here. Maybe there is one grown-up, or two, or grandparents raising grandkids. Maybe you are a blended family, or a foster family. Maybe you are roommates who have become family. Family is the people you grow with."
      },
      {
       "k": "flow",
       "h": "How The Grove works",
       "steps": [
        [
         "Tend your own tree",
         "In your own app"
        ],
        [
         "Show my growth",
         "A switch in your app"
        ],
        [
         "Grow together",
         "Side by side in The Grove"
        ]
       ],
       "say": "Here is how it works. First, each person tends their own tree, in their own app. Second, each app has a switch called Show my growth on The Grove. Third, your trees stand side by side here, and the grove grows."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 0,
       "note": {
        "h": "Our Grove",
        "p": "Every tree in your household, side by side, with visitors that come as the days add up."
       },
       "say": "The Grove has a few tabs. Our Grove shows every tree in your household, side by side. The Wall is where you cheer each other on. Together has practices to do as a family. How it works explains it all in writing. And Learn has lessons like this one."
      },
      {
       "k": "points",
       "h": "What grows the grove",
       "items": [
        [
         "Each person tending their tree",
         "In Maple, Aspen, or Oak"
        ],
        [
         "Practices you do together",
         "From the Together tab"
        ],
        [
         "Growth only adds",
         "A quiet week takes nothing away"
        ]
       ],
       "say": "Two things grow the grove. Each person tending their own tree, and the practices you do together. Visitors come and new scenery opens as the days add up. And growth only adds. A quiet week never takes anything away."
      },
      {
       "k": "words",
       "h": "One word each",
       "items": [
        "How do you feel today?",
        "One word is enough."
       ],
       "beats": [
        "Let us try it right now, together.",
        "Look around at who is here with you.",
        "Each person, say one word for how you feel today.",
        {
         "t": "Go around once, and just listen.",
         "w": 10
        }
       ],
       "say": "Let us try it right now, together. Look around at who is here with you. Each person, say one word for how you feel today. Go around once, and just listen."
      },
      {
       "k": "points",
       "h": "Kind and safe",
       "items": [
        [
         "Grown-ups keep it kind",
         "A grown-up can remove any post"
        ],
        [
         "Your answers stay yours",
         "The Grove sees the big picture only"
        ],
        [
         "If anyone is not safe",
         "Tell a safe grown-up right away"
        ]
       ],
       "say": "A few things keep the grove kind and safe. A grown-up can remove any post on the wall. Your answers stay in your own tree. The Grove only sees the big picture. And if anyone in your family is not safe, tell a safe grown-up right away. Grown-ups can call or text nine eight eight, or call nine one one."
      },
      {
       "k": "big",
       "h": "A little each day, side by side.",
       "sub": "The next lessons show each part of The Grove.",
       "say": "That is The Grove. A little each day, side by side. The next lessons walk through each part, one at a time."
      },
      {
       "k": "quiz",
       "q": "Where does each person tend their own tree?",
       "opts": [
        "In their own app, like Maple, Aspen, or Oak",
        "Only in The Grove",
        "On The Wall"
       ],
       "right": 0,
       "why": "Each person tends their own tree in their own app. The Grove is where the trees stand together.",
       "say": "Quick question. Where does each person tend their own tree?"
      }
     ]
    }
   ]
  },
  {
   "id": "grove-using",
   "title": "Using The Grove",
   "who": "Every part of The Grove, step by step",
   "certTitle": "The Grove: Using The Grove",
   "certLine": "For finishing every lesson on using The Grove together.",
   "lessons": [
    {
     "id": "gr-u-family",
     "n": 1,
     "title": "Your Family Grove",
     "mins": 4,
     "blurb": "Profiles, pictures, and how everyone in the household gets a tree.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 1",
       "h": "Your Family Grove",
       "sub": "Everyone in the household gets a tree.",
       "say": "This lesson shows how your family grove gets started, and how everyone in your household gets a tree of their own."
      },
      {
       "k": "card",
       "title": "Start with your own tree",
       "body": "Make a private Grounded profile, then tend your tree in the app for your age. It grows here too.",
       "btns": [
        "Make my profile",
        "Oak",
        "Aspen",
        "Maple"
       ],
       "tap": 0,
       "say": "It starts with one tree. A grown-up taps Make my profile, chooses a name, a picture, and a passcode. That profile is private, and it stays on this device."
      },
      {
       "k": "points",
       "h": "Then add the people you live with",
       "items": [
        [
         "A grown-up comes first",
         "Then kids and teens can be added"
        ],
        [
         "A grown-up agrees for each child",
         "A parent, guardian, or caring grown-up"
        ],
        [
         "Everyone picks a picture",
         "An animal, a flower, or a photo"
        ]
       ],
       "say": "Then add the people you live with. Tap Who is here, or Switch person, then New profile. A grown-up comes first. For each child or teen, a grown-up agrees for them. That might be a parent, a guardian, a grandparent, or another responsible grown-up. And everyone picks a picture, like an animal, a flower, or a photo."
      },
      {
       "k": "points",
       "h": "A way in that fits each age",
       "items": [
        [
         "Kids",
         "A secret picture code, three taps"
        ],
        [
         "Middle and high school",
         "A passcode of their own"
        ],
        [
         "Grown-ups",
         "A passcode only they know"
        ]
       ],
       "say": "Each age has a way in that fits. Kids tap three pictures in an order they will remember. That is their secret picture code. Middle schoolers, high schoolers, and grown-ups each choose a passcode of their own."
      },
      {
       "k": "points",
       "h": "Grown-ups who agreed can help",
       "items": [
        [
         "Kids and middle schoolers",
         "A grown-up who agreed can open their profile"
        ],
        [
         "High schoolers",
         "Only their own passcode opens it"
        ],
        [
         "So no child is alone",
         "With something hard"
        ]
       ],
       "say": "For kids and middle schoolers, a grown-up who agreed can open their profile with the grown-up’s own passcode, so no child is ever alone with something hard. For high schoolers, only their own passcode opens their answers and journal. Their grown-ups still get a quiet alert if a check-in asks for a caring conversation."
      },
      {
       "k": "trees",
       "h": "Each tree is shaped by its stage",
       "grove": true,
       "say": "Once people are added, their trees appear in the grove, shaped by their stage of life. Each person tends their tree in their own app. Maple for kids, Aspen for middle schoolers, and Oak for grown-ups and high schoolers, until Pine is ready."
      },
      {
       "k": "card",
       "title": "Who’s here?",
       "body": "Looking around is open to everyone. To post, react, or check off a family practice, choose your picture first.",
       "btns": [
        "Who’s here?"
       ],
       "tap": 0,
       "say": "When you open The Grove, anyone can look around. To post, to react, or to check off a family practice, tap Who is here, and choose your picture. Then type your passcode, or tap your picture code."
      },
      {
       "k": "points",
       "h": "Here as you",
       "items": [
        [
         "Here as your name",
         "At the top of every tab"
        ],
        [
         "Switch person",
         "When someone else takes a turn"
        ],
        [
         "Lock",
         "When you are done"
        ]
       ],
       "say": "Once you are in, the top of the page says Here as, with your name. When someone else wants a turn, tap Switch person. And when you are done, tap Lock."
      },
      {
       "k": "words",
       "h": "Say your name and your picture",
       "items": [
        "My name is ...",
        "My picture would be ..."
       ],
       "beats": [
        "Let us try one together.",
        "Each person, say your name, and the picture you would choose for yourself.",
        "A fox, an owl, a sunflower, a frog, or anything you like.",
        {
         "t": "Go around once, youngest first.",
         "w": 10
        }
       ],
       "say": "Let us try one together. Each person, say your name, and the picture you would choose for yourself. A fox, an owl, a sunflower, a frog, or anything you like. Go around once, youngest first."
      },
      {
       "k": "points",
       "h": "Keep it all safe",
       "items": [
        [
         "Back up everything",
         "One file, every profile still locked"
        ],
        [
         "Keep it somewhere safe",
         "Email it to yourself, or save it to a drive"
        ],
        [
         "Load a backup",
         "On a new phone, everything comes back"
        ]
       ],
       "say": "One more thing for the grown-ups. Under How it works, Back up everything saves one file with The Grove and every profile on this device, each one still locked. Keep that file somewhere safe. On a new phone, tap Load a backup, and everything comes back."
      },
      {
       "k": "big",
       "h": "Every tree belongs here.",
       "sub": "However your family looks.",
       "say": "However your family looks, every tree belongs here. Start with one, and add the rest when you are ready."
      },
      {
       "k": "quiz",
       "q": "What do you tap to post, react, or check off a practice?",
       "opts": [
        "Who’s here, then choose your picture",
        "Make a new profile each time",
        "Nothing, anyone can post as anyone"
       ],
       "right": 0,
       "why": "Tap Who’s here? and choose your picture, so the family knows who is posting and cheering.",
       "say": "Quick question. What do you tap to post, react, or check off a practice?"
      }
     ]
    },
    {
     "id": "gr-u-ours",
     "n": 2,
     "title": "Our Grove",
     "mins": 5,
     "blurb": "Your family’s trees side by side, the visitors, and what each tree shows.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 2",
       "h": "Our Grove",
       "sub": "Every tree in your household, side by side.",
       "say": "Our Grove is the first tab, and the heart of The Grove. This lesson shows what you see there, and what makes it grow."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 0,
       "note": {
        "h": "Our Grove",
        "p": "Every tree in your household, side by side. Under the grove, a picture for each person."
       },
       "say": "Tap Our Grove. You will see every tree in your household, standing side by side. Each tree is shaped by its stage of life. A kid’s tree looks like a maple, a middle schooler’s like an aspen, and a grown-up’s like an oak. Under the grove, there is a picture for each person."
      },
      {
       "k": "card",
       "title": "Where our trees grow together",
       "body": "Your tree is yours. The grove is ours. Cheer each other on, do a few things together, and watch the grove grow.",
       "btns": [
        "Got it"
       ],
       "tap": 0,
       "say": "The first time you visit, a welcome note sits above the grove. It says, your tree is yours, and the grove is ours. Cheer each other on, do a few things together, and watch the grove grow. Tap Got it, and the note tucks away."
      },
      {
       "k": "points",
       "h": "Trees that show the growing",
       "items": [
        [
         "Taller with each day tended",
         "Every tree grows over time"
        ],
        [
         "Parts tended this week glow",
         "Roots, leaves, fruit, and more"
        ],
        [
         "No one is ranked",
         "Each tree grows at its own pace"
        ]
       ],
       "say": "Watch the trees closely. Each tree grows taller as its person tends it, day by day. The parts someone tended this week show brighter, like their roots, their leaves, or their fruit. And no one is ranked. Each tree grows at its own pace."
      },
      {
       "k": "points",
       "h": "What grows the grove",
       "items": [
        [
         "Anyone tends their tree",
         "In Maple, Aspen, or Oak"
        ],
        [
         "The family does a practice",
         "And taps We did this today"
        ],
        [
         "Days of growing together",
         "The count under the grove"
        ]
       ],
       "say": "Two things grow the grove. Any day anyone tends their own tree, in Maple, Aspen, or Oak. And any day the family does a practice together, and taps We did this today. Under the grove, a line counts your days of growing together."
      },
      {
       "k": "points",
       "h": "Visitors arrive",
       "items": [
        [
         "Ladybug",
         "Your first day"
        ],
        [
         "Butterfly",
         "One week"
        ],
        [
         "Bluebird",
         "Two weeks"
        ],
        [
         "Bunny",
         "Five weeks"
        ]
       ],
       "say": "As the days add up, visitors arrive. A ladybug comes on your very first day. A butterfly comes after a week. A bluebird after two weeks, and a bunny after five. More butterflies come along the way, and the line under the grove tells you who is coming next."
      },
      {
       "k": "screen",
       "app": "grove",
       "app_name": "The Grove",
       "title": "A tree in the grove",
       "rows": [
        [
         "Days Tended",
         "24"
        ],
        [
         "Rings",
         "1"
        ],
        [
         "Tended this week",
         "Roots, Leaves"
        ],
        [
         "The big picture only",
         "Never answers"
        ],
        [
         "Go tend your tree",
         ""
        ]
       ],
       "tap": 4,
       "say": "Tap anyone’s picture to see their tree. You will see their days tended, their rings, and which parts they tended this week. That is the big picture only. Never answers, levels, or notes. And there is a button to go tend your own tree in your own app."
      },
      {
       "k": "points",
       "h": "Every tree keeps its place",
       "items": [
        [
         "Resting this week",
         "A tree never dies"
        ],
        [
         "Growing quietly",
         "Their switch is off, and their tree still stands"
        ],
        [
         "Remembered",
         "A willow stays, just as it was"
        ]
       ],
       "say": "Every tree keeps its place. If someone did not tend this week, their tree is resting. A tree never dies, and nothing is taken away. If someone turned their switch off, their tree is growing quietly, and it still stands in the grove. And when someone in the family has died, their willow stays in the grove, just as it was."
      },
      {
       "k": "points",
       "h": "Your tree in the grove",
       "items": [
        [
         "Kind of tree",
         "Birch at 15 days, Maple at 35, Pine at 60"
        ],
        [
         "Days you tend unlock it",
         "In your own app"
        ],
        [
         "Scenery",
         "Lake, Autumn, Winter, and Dusk"
        ],
        [
         "Family days unlock it",
         "For everyone"
        ]
       ],
       "say": "When you have chosen your picture, a card called Your tree in the grove appears. Days you tend in your own app unlock new kinds of trees. A birch at fifteen days, a maple at thirty five, and a pine at sixty. Days the family grows together unlock new scenery for everyone. A lake, autumn, winter, and dusk."
      },
      {
       "k": "words",
       "h": "Pick the scenery",
       "items": [
        "Forest",
        "Lake",
        "Autumn",
        "Winter",
        "Dusk"
       ],
       "cue": {
        "at": [
         2,
         2,
         2,
         2,
         2
        ]
       },
       "beats": [
        "Let us choose together, just for fun.",
        "If your family could pick the scenery today, which would it be?",
        "Forest, Lake, Autumn, Winter, or Dusk.",
        {
         "t": "Each person, say your pick out loud.",
         "w": 10
        }
       ],
       "say": "Let us choose together, just for fun. If your family could pick the scenery today, which would it be? Forest, Lake, Autumn, Winter, or Dusk. Each person, say your pick out loud."
      },
      {
       "k": "big",
       "h": "Growth only adds.",
       "sub": "A quiet week never takes anything away.",
       "say": "Remember, growth only adds. There are no streaks to break. A quiet week never takes anything away. Just pick up today, together."
      },
      {
       "k": "quiz",
       "q": "What happens to the grove after a quiet week?",
       "opts": [
        "The trees shrink",
        "Nothing is taken away, growth only adds",
        "The grove starts over"
       ],
       "right": 1,
       "why": "Growth only adds. A resting tree keeps its place, and nothing is taken away.",
       "say": "Quick question. What happens to the grove after a quiet week?"
      }
     ]
    },
    {
     "id": "gr-u-together",
     "n": 3,
     "title": "Together",
     "mins": 4,
     "blurb": "Family practices for every part of the tree, and how they grow the grove.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 3",
       "h": "Together",
       "sub": "Things your family does side by side.",
       "say": "Together is where your family finds things to do side by side. Small things, like a walk, a game, or a good question at dinner. This lesson shows how it works."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Together",
        "p": "Things your family does side by side. Each one grows the grove. Suggestions only."
       },
       "say": "Tap Together. Each practice here is something your family does side by side, and each one grows the grove. They are suggestions only. Do one, do several, or skip a week."
      },
      {
       "k": "points",
       "h": "This week’s theme",
       "items": [
        [
         "Twelve weekly themes",
         "Like Start where you are, and Love between us"
        ],
        [
         "One featured practice",
         "Right at the top"
        ],
        [
         "A new one each week",
         "Then the twelve begin again"
        ]
       ],
       "say": "At the top, you will find this week’s theme, with one practice picked for it. There are twelve themes, like Start where you are, and Love between us. Each week brings the next one, and after twelve weeks, they begin again."
      },
      {
       "k": "six",
       "h": "Practices for all six parts",
       "words": [
        "Gratitude Round",
        "Make Something Together",
        "Family Reset",
        "Game Night",
        "Kitchen Dance Party",
        "Plant a Seed"
       ],
       "say": "Below the theme, practices are grouped by the six parts of the tree. Roots, Trunk, Bark, Branches, Leaves, and Fruit. Tap a part to see just its practices, or tap All parts to see them all."
      },
      {
       "k": "points",
       "h": "Fit them into the day you have",
       "items": [
        [
         "At dinner",
         "Phones-Down Dinner, Rose and Thorn"
        ],
        [
         "At bedtime",
         "Bedtime Blessing, Early Night"
        ],
        [
         "On the weekend",
         "Family Walk, Cook Together"
        ],
        [
         "When things get loud",
         "Family Reset"
        ]
       ],
       "say": "Many practices fit into the day you already have. At dinner, try Phones-Down Dinner, or Rose and Thorn. At bedtime, try a Bedtime Blessing, or an Early Night. On the weekend, take a Family Walk, or Cook Together. And when things get loud, try a Family Reset. Everyone pauses, takes three breaths, and starts again."
      },
      {
       "k": "card",
       "title": "Game Night",
       "body": "Play one game together, and let the youngest pick. For little ones: Play a game together. The youngest picks!",
       "btns": [
        "We did this today",
        "Show me how"
       ],
       "tap": 1,
       "say": "Each practice has a short line about what to do, and a line for little ones in simpler words. Tap Show me how to see the steps, one at a time."
      },
      {
       "k": "card",
       "title": "Game Night",
       "body": "The youngest picks the game. Everyone plays, grown-ups included. Laugh at the mistakes, especially your own.",
       "btns": [
        "We did this today",
        "Hide how"
       ],
       "tap": 0,
       "result": "Nice work. The grove grew today.",
       "say": "When your family has done it, tap We did this today. The grove grows, and a note says, nice work, the grove grew today. If you tapped it by mistake, tap it again to undo."
      },
      {
       "k": "points",
       "h": "It shows on The Wall",
       "items": [
        [
         "The family did it together",
         "A note on The Wall"
        ],
        [
         "Checked off by you",
         "When you have chosen your picture"
        ],
        [
         "Everyone can cheer",
         "Proud of you, Hug, Thank you"
        ]
       ],
       "say": "Each practice you check off shows on The Wall, as something the family did together. If you chose your picture first, it shows who checked it off. Then everyone can cheer, with Proud of you, a Hug, or Thank you."
      },
      {
       "k": "words",
       "h": "Our Family Words",
       "items": [
        "Kind",
        "Brave",
        "Honest",
        "Fun",
        "Curious"
       ],
       "cue": {
        "at": [
         3,
         3,
         3,
         3,
         3
        ]
       },
       "beats": [
        "Let us try one right now.",
        "It is called Our Family Words.",
        "Think of one word for what your family stands for, or wants to live by.",
        "Kind, brave, honest, fun, curious, or a word all your own.",
        {
         "t": "Each person, say your word out loud.",
         "w": 12
        }
       ],
       "say": "Let us try one right now. It is called Our Family Words. Think of one word for what your family stands for, or wants to live by. Kind, brave, honest, fun, curious, or a word all your own. Each person, say your word out loud."
      },
      {
       "k": "points",
       "h": "Make it fit your family",
       "items": [
        [
         "Start small",
         "One practice is plenty"
        ],
        [
         "Let everyone take part",
         "Every age, every way"
        ],
        [
         "Grown-ups join in",
         "Phones in the basket too"
        ]
       ],
       "say": "Make it fit your family. Start small. One practice is plenty. Let everyone take part in their own way, from the littlest to the oldest. And grown-ups join in too, phones in the basket and all."
      },
      {
       "k": "big",
       "h": "Doing it together is the point.",
       "sub": "Every practice you share grows the grove.",
       "say": "Doing it together is the point. Every practice you share grows the grove, and grows your family too."
      },
      {
       "k": "quiz",
       "q": "What do you tap after your family does a practice?",
       "opts": [
        "We did this today",
        "Show me how",
        "All parts"
       ],
       "right": 0,
       "why": "We did this today checks it off, grows the grove, and shows it on The Wall.",
       "say": "Quick question. What do you tap after your family does a practice?"
      }
     ]
    },
    {
     "id": "gr-u-week",
     "n": 4,
     "title": "This Week in The Grove",
     "mins": 5,
     "blurb": "The weekly theme, this week on the wall, and where each journal lives.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 4",
       "h": "This Week in The Grove",
       "sub": "One week at a time, together.",
       "say": "The Grove moves one week at a time. This lesson shows what each new week brings, and where the past weeks go. Gather the people you live with, and watch together."
      },
      {
       "k": "big",
       "h": "Every week is a fresh start.",
       "sub": "A new theme, and a clean page on the wall.",
       "say": "Every week in The Grove is a fresh start. There is a new theme for the family, and a clean page on the wall."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "This week’s theme",
        "p": "One featured practice for the whole family, picked for this week."
       },
       "say": "Start in Together. At the top, you will see this week’s theme, with one featured practice picked to match it. It is a simple place to begin."
      },
      {
       "k": "points",
       "h": "Twelve weekly themes",
       "items": [
        [
         "Start where you are",
         "Week one"
        ],
        [
         "Rest and limits",
         "Week two"
        ],
        [
         "The body knows",
         "Week three"
        ],
        [
         "Nine more after that",
         "Then the twelve begin again"
        ]
       ],
       "say": "There are twelve themes, one for each week. Week one is Start where you are. Week two is Rest and limits. Week three is The body knows. Nine more follow, and then the twelve begin again."
      },
      {
       "k": "card",
       "title": "Gratitude Round",
       "body": "At dinner or bedtime, everyone names one thing they’re thankful for today.",
       "btns": [
        "We did this today",
        "Show me how"
       ],
       "tap": 0,
       "result": "Nice work. The grove grew today.",
       "say": "Here is the featured practice for week one, the Gratitude Round. Tap Show me how for the steps. When your family has done it, tap We did this today. The grove grows that day. Tapped it by mistake? Tap Done today, Undo."
      },
      {
       "k": "big",
       "h": "Let us do a Gratitude Round now.",
       "sub": "One thing each. Small counts.",
       "beats": [
        "Let us do a Gratitude Round right now.",
        "Think of one thing from today that you are thankful for.",
        "Small counts, like a warm sock or a good sandwich.",
        {
         "t": "Now go around, and each person says theirs out loud.",
         "w": 12
        }
       ],
       "say": "Let us do a Gratitude Round right now. Think of one thing from today that you are thankful for. Small counts, like a warm sock or a good sandwich. Now go around, and each person says theirs out loud."
      },
      {
       "k": "points",
       "h": "A simple family rhythm",
       "items": [
        [
         "Pick one family moment",
         "Dinner, a car ride, or bedtime"
        ],
        [
         "Read the theme out loud",
         "Everyone hears it together"
        ],
        [
         "Do one thing",
         "Or several, or skip a week"
        ]
       ],
       "say": "Here is a simple rhythm. Pick one family moment each week, like dinner, a car ride, or bedtime. Read the theme out loud, so everyone hears it. Then do one thing together. The practices are suggestions only. Do one, do several, or skip a week. Every family looks different, and every week does too."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "This week",
        "p": "Posts, growth, and things you did together, newest first."
       },
       "say": "Now look at The Wall. It opens on This week, with the newest things first. Posts, growth from each tree, and the practices you did together. The wall’s week runs Monday to Sunday."
      },
      {
       "k": "points",
       "h": "Looking back",
       "items": [
        [
         "Show last week",
         "One tap to look back"
        ],
        [
         "Show the week before",
         "About a month in all"
        ],
        [
         "Back to this week",
         "Home again in one tap"
        ]
       ],
       "say": "Want to look back? Tap Show last week. Then Show the week before, about a month in all. Older weeks fold away, so the wall stays short and easy to read. Tap Back to this week to come home."
      },
      {
       "k": "big",
       "h": "A quiet week takes nothing away.",
       "sub": "Growth only adds. Pick up any day.",
       "say": "Some weeks are busy, and some are quiet. That is okay. A quiet week takes nothing away from the grove. Growth only adds, so you can pick up again any day."
      },
      {
       "k": "points",
       "h": "Where each journal lives",
       "items": [
        [
         "In your own tree app",
         "Maple, Aspen, or Oak"
        ],
        [
         "With your weekly check-in",
         "Kept in your own profile"
        ],
        [
         "The grove sees the big picture",
         "Days tended and parts tended"
        ]
       ],
       "say": "What about journals? Each person’s journal lives in their own tree app, with their weekly check-in, kept in their own profile. The Grove sees only the big picture, like days tended and which parts were tended."
      },
      {
       "k": "points",
       "h": "The Earlier tab",
       "items": [
        [
         "Shows up only when needed",
         "For tending saved here before"
        ],
        [
         "Days tended and reflections",
         "Ready to move"
        ],
        [
         "Open your tree app",
         "It moves there on its own"
        ]
       ],
       "say": "You might also see a tab called Earlier. It shows up only if someone tended a tree inside The Grove before each person had their own app. Open your tree app, and those days and reflections move there on their own, under Earlier, from The Grove."
      },
      {
       "k": "quiz",
       "q": "What happens to the grove after a quiet week?",
       "opts": [
        "It shrinks",
        "Nothing is taken away. Growth only adds.",
        "You have to start over"
       ],
       "right": 1,
       "why": "Growth only adds. A quiet week never takes anything away.",
       "say": "Quick question. What happens to the grove after a quiet week?"
      }
     ]
    },
    {
     "id": "gr-u-wall",
     "n": 5,
     "title": "The Wall",
     "mins": 4,
     "blurb": "Posts, reactions, and cheering each other on, kindly.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 5",
       "h": "The Wall",
       "sub": "Cheer each other on.",
       "say": "The Wall is where your family cheers each other on. This lesson shows how to post, how to react, and how to keep it kind."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 1,
       "note": {
        "h": "The Wall",
        "p": "Short posts, growth from each tree, and things you did together."
       },
       "say": "Tap The Wall. It shows this week, with the newest things at the top."
      },
      {
       "k": "points",
       "h": "Three things show up here",
       "items": [
        [
         "Short posts",
         "From anyone in the family"
        ],
        [
         "Growth notes",
         "When someone tends their tree"
        ],
        [
         "Together",
         "Practices the family checked off"
        ]
       ],
       "say": "Three kinds of things show up here. Short posts, from anyone in the family. Growth notes, when someone tends their tree with their switch on, like, Sam tended their tree, Roots and Leaves. And Together notes, when the family checks off a practice."
      },
      {
       "k": "card",
       "title": "Who’s here?",
       "body": "To post, react, or check off a family practice, choose your picture first.",
       "btns": [
        "Who’s here?"
       ],
       "tap": 0,
       "say": "Looking around is open to everyone. To post or react, tap Who’s here, and choose your picture. Type your passcode, or tap your three secret pictures if that is how you open. Then the top of the page says Here as, and your name, with Switch person and Lock."
      },
      {
       "k": "card",
       "title": "Post to the wall as Sam",
       "fields": [
        [
         "",
         "Proud of you for the walk today."
        ]
       ],
       "btns": [
        "Post"
       ],
       "tap": 0,
       "result": "Posted to the wall.",
       "say": "To post, write a few words in the box, then tap Post. Keep it short and kind, like, proud of you for the walk today. A post holds up to two hundred eighty characters, room for a few short sentences."
      },
      {
       "k": "points",
       "h": "Ideas for a good post",
       "items": [
        [
         "A thank-you",
         "Thanks for making dinner"
        ],
        [
         "Something you noticed",
         "You were so patient today"
        ],
        [
         "Good news",
         "I finished my project!"
        ]
       ],
       "say": "Not sure what to post? Try a thank-you, like, thanks for making dinner. Or something you noticed, like, you were so patient today. Or share good news, like, I finished my project. Little ones can ask a grown-up to help them write."
      },
      {
       "k": "points",
       "h": "Five ways to react",
       "items": [
        [
         "Love",
         "A heart"
        ],
        [
         "Proud of you",
         "A star"
        ],
        [
         "Hug",
         "A big squeeze"
        ],
        [
         "Thank you and Ha",
         "For thanks, and for a laugh"
        ]
       ],
       "say": "Under each post are five ways to react. Love. Proud of you. Hug. Thank you. And Ha, for something funny. Tap one to add it. Tap it again to take it back."
      },
      {
       "k": "big",
       "h": "Reactions show who cheered you on.",
       "sub": "Names, not numbers.",
       "say": "Reactions show the names of who cheered you on, never a running total. The wall is about people, so there is nothing to count and nothing to chase."
      },
      {
       "k": "big",
       "h": "Let us cheer out loud.",
       "sub": "I am proud of you for...",
       "beats": [
        "Let us practice cheering out loud, right now.",
        "Look at someone near you.",
        "Say, I am proud of you for, and finish the sentence with something real.",
        {
         "t": "Take turns until everyone has heard one.",
         "w": 12
        }
       ],
       "say": "Let us practice cheering out loud, right now. Look at someone near you. Say, I am proud of you for, and finish the sentence with something real. Take turns until everyone has heard one."
      },
      {
       "k": "points",
       "h": "Keeping it kind",
       "items": [
        [
         "Remove your own post",
         "Tap Remove"
        ],
        [
         "A grown-up can remove any post",
         "To keep the wall kind"
        ],
        [
         "Posts stay on this device",
         "For your household"
        ]
       ],
       "say": "Here is how the wall stays kind. You can remove your own post. Just tap Remove. A grown-up can remove any post, to keep the wall kind for everyone. And posts stay on this device, just for your household."
      },
      {
       "k": "points",
       "h": "For something big or hard",
       "items": [
        [
         "Tell a safe grown-up",
         "In person, face to face"
        ],
        [
         "Not safe right now?",
         "Call or text 988, or call 911"
        ],
        [
         "The wall is for cheering",
         "Big things need a real talk"
        ]
       ],
       "say": "The wall is for cheering. For something big, scary, or hard, tell a safe grown-up in person. If anyone in your family is not safe, a grown-up can call or text nine eight eight, or call nine one one."
      },
      {
       "k": "points",
       "h": "A wall that stays short",
       "items": [
        [
         "This week up top",
         "Newest first"
        ],
        [
         "Older weeks fold away",
         "Tap to look back"
        ],
        [
         "Then go tend your tree",
         "The wall ends there"
        ]
       ],
       "say": "The wall stays short on purpose. This week is up top. Older weeks fold away until you tap to look back. And at the bottom, the wall says, That’s the wall. Now go tend your tree."
      },
      {
       "k": "quiz",
       "q": "Who can remove a post from the wall?",
       "opts": [
        "Only the person who wrote it",
        "The person who wrote it, or a grown-up",
        "Nobody"
       ],
       "right": 1,
       "why": "You can remove your own post, and a grown-up can remove any post to keep the wall kind.",
       "say": "Quick question. Who can remove a post from the wall?"
      }
     ]
    },
    {
     "id": "gr-u-library",
     "n": 6,
     "title": "The Practice Library",
     "mins": 4,
     "blurb": "Every Grounded practice, how to find one, and how to make it yours.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 6",
       "h": "The Practice Library",
       "sub": "Every Grounded practice, with how to do it.",
       "say": "The Grove holds the Practice Library, every Grounded practice in one place, with how to do it. This lesson shows how to find one, and how to make it part of your own tree."
      },
      {
       "k": "points",
       "h": "Two kinds of practices",
       "items": [
        [
         "Together",
         "Things the family does side by side"
        ],
        [
         "The Practice Library",
         "Every practice, for each person’s tree"
        ],
        [
         "Both help the grove grow",
         "Tending, and doing things together"
        ]
       ],
       "say": "There are two kinds of practices here. The Together tab has practices the whole family does side by side. The Practice Library has every practice for each person’s own tree. Both help the grove grow."
      },
      {
       "k": "flow",
       "h": "Finding a practice",
       "steps": [
        [
         "Tap Search",
         "At the top, by the logo"
        ],
        [
         "Type a word",
         "Like sleep or calm"
        ],
        [
         "Tap a practice",
         "It opens in The Grove"
        ]
       ],
       "say": "Here is how to find one. Tap Search, at the top of the page, next to the logo. Type a word, like sleep or calm. Then tap a practice, and it opens right here, in the Practice Library."
      },
      {
       "k": "card",
       "title": "Practice Library",
       "body": "Every Grounded practice, with how to do it.",
       "fields": [
        [
         "Search",
         "calm"
        ]
       ],
       "btns": [
        "Show me how"
       ],
       "tap": 0,
       "result": "Why it helps. How to do it. If it’s hard.",
       "say": "Inside the library there is a search box too. Try sleep, calm, friends, or grief. Practices come up first. Under each one, tap Show me how."
      },
      {
       "k": "points",
       "h": "Inside Show me how",
       "items": [
        [
         "Why it helps",
         "In a sentence or two"
        ],
        [
         "How to do it",
         "Short, numbered steps"
        ],
        [
         "If it’s hard",
         "A smaller way to try"
        ],
        [
         "Sources",
         "Where the idea came from"
        ]
       ],
       "say": "Show me how opens four things. Why it helps, in a sentence or two. How to do it, in short, numbered steps. If it’s hard, with a smaller way to try on a tough day. And when an idea came from somewhere, a quiet line at the end says where."
      },
      {
       "k": "points",
       "h": "Some practices have a story",
       "items": [
        [
         "From the Bedside",
         "Born from a real story"
        ],
        [
         "Watch the Video",
         "When there is one"
        ],
        [
         "Read the Full Story",
         "When it is published"
        ]
       ],
       "say": "Some practices are marked From the Bedside. They grew out of real stories from Grounded’s work at the bedside. Under those, you may see Watch the Video, or Read the Full Story. A story can help a practice make sense, for grown-ups and kids alike."
      },
      {
       "k": "points",
       "h": "Search finds even more",
       "items": [
        [
         "Practices first",
         "From every tree app"
        ],
        [
         "When Life Changes guides",
         "For big changes"
        ],
        [
         "Books and more",
         "From across Grow With Grounded"
        ]
       ],
       "say": "Searching finds even more. Practices come first. Then When Life Changes guides, for the big changes in life. Then books and more, from across Grow With Grounded."
      },
      {
       "k": "big",
       "h": "Let us try one together.",
       "sub": "In through the nose. Out like cooling soup.",
       "beats": [
        "Let us try a practice together, right now.",
        "Sit or stand close to each other.",
        "Breathe in through your nose for a count of four.",
        "Now breathe out slowly, like cooling a spoonful of hot soup.",
        {
         "t": "Do two more, together, nice and slow.",
         "w": 12
        }
       ],
       "say": "Let us try a practice together, right now. Sit or stand close to each other. Breathe in through your nose for a count of four. Now breathe out slowly, like cooling a spoonful of hot soup. Do two more, together, nice and slow."
      },
      {
       "k": "flow",
       "h": "Make it part of your tree",
       "steps": [
        [
         "Open your tree app",
         "Maple, Aspen, or Oak"
        ],
        [
         "Tap Find more practices",
         "Browse by part, or search"
        ],
        [
         "Add what fits",
         "It joins your practices"
        ]
       ],
       "say": "Found one you like? Open your own tree app, Maple, Aspen, or Oak. Tap Find more practices. Browse by part, or search. Then add what fits, and it joins your practices. In Maple, the steps come in words just for kids."
      },
      {
       "k": "points",
       "h": "Choosing well",
       "items": [
        [
         "Start small",
         "One practice is enough"
        ],
        [
         "Pick what fits your life",
         "Your age, your days, your family"
        ],
        [
         "Change it anytime",
         "Your practices grow with you"
        ]
       ],
       "say": "A few tips for choosing. Start small. One practice is enough. Pick what fits your life, your age, your days, and your family. And change it anytime. Your practices grow with you."
      },
      {
       "k": "big",
       "h": "Find one that fits, and make it yours.",
       "sub": "Back to our grove when you are done.",
       "say": "Find one that fits, and make it yours. When you are done, tap Back to our grove."
      },
      {
       "k": "quiz",
       "q": "How do you add a library practice to your own tree?",
       "opts": [
        "Post it on The Wall",
        "Open your tree app and tap Find more practices",
        "Check it off in Together"
       ],
       "right": 1,
       "why": "Your practices live in your own tree app. Find more practices adds one there.",
       "say": "Quick question. How do you add a library practice to your own tree?"
      }
     ]
    },
    {
     "id": "gr-u-private",
     "n": 7,
     "title": "Your Tree Is Yours, the Grove Is Ours",
     "mins": 5,
     "blurb": "What the grove shows, what stays in your own tree, and how to keep it all safe.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Using The Grove, Lesson 7",
       "h": "Your Tree Is Yours, the Grove Is Ours",
       "sub": "What we share, and what stays yours.",
       "say": "This last lesson is about what The Grove shares with your family, what stays in your own tree, and how to keep it all safe."
      },
      {
       "k": "big",
       "h": "Your tree is yours. The grove is ours.",
       "say": "Your tree is yours. The grove is ours. Those two short sentences hold the whole idea."
      },
      {
       "k": "points",
       "h": "Two places to grow",
       "items": [
        [
         "Your tree",
         "In your own app, kept in your profile"
        ],
        [
         "The grove",
         "Shared ground for the whole family"
        ],
        [
         "Side by side",
         "Each tree shaped by its life stage"
        ]
       ],
       "say": "Each person tends their own tree in their own app. Check-ins, daily practices, and journals all live there, in that person’s own profile. The grove is the family’s shared ground, where every tree stands side by side, each one shaped by its life stage."
      },
      {
       "k": "points",
       "h": "What the grove can see",
       "items": [
        [
         "Your name and picture",
         "And your age group"
        ],
        [
         "Days tended and rings",
         "If your switch is on"
        ],
        [
         "Parts you tended lately",
         "Like Roots or Leaves"
        ]
       ],
       "say": "Here is what the grove can see. Your name, your picture, and your age group. And if your switch is on, the big picture of your growth. How many days you have tended, your rings, and which parts you tended lately."
      },
      {
       "k": "points",
       "h": "What stays in your tree",
       "items": [
        [
         "Your answers",
         "Every check-in answer"
        ],
        [
         "Your levels",
         "Strong, Steady, Growing Edge"
        ],
        [
         "Your notes and journal",
         "Kept in your own profile"
        ]
       ],
       "say": "And here is what stays in your own tree. Your check-in answers. Your levels, like Strong, Steady, or Growing Edge. And your notes and journal. Those stay with you, in your own profile."
      },
      {
       "k": "card",
       "title": "The Grove",
       "body": "Only the big picture shows: days tended, rings, and which parts you tended.",
       "fields": [
        [
         "Show my growth on The Grove",
         "On"
        ]
       ],
       "btns": [
        "Visit The Grove"
       ],
       "say": "You choose what shows. In your tree app’s settings, find The Grove, and the switch called Show my growth on The Grove. It starts on. Anyone can turn it off, kids included. With it off, your tree still stands in the grove, and it simply says you keep your growth private."
      },
      {
       "k": "points",
       "h": "A code for every tree",
       "items": [
        [
         "Grown-ups and teens",
         "A passcode only they know"
        ],
        [
         "Kids",
         "Three secret pictures, if they like"
        ],
        [
         "Lock",
         "When you step away"
        ]
       ],
       "say": "Every profile is locked with its own code. Grown-ups and teens use a passcode only they know. Kids can use three secret pictures instead. Anyone can look around The Grove. To post or react, tap Who’s here and choose your picture. When you step away, tap Lock."
      },
      {
       "k": "points",
       "h": "Bringing your family in",
       "items": [
        [
         "Make my profile",
         "Each person makes their own"
        ],
        [
         "Kids and teens",
         "A grown-up agrees first"
        ],
        [
         "Everyone on this device",
         "Their trees stand here together"
        ]
       ],
       "say": "To bring your family in, each person makes their own profile on this device. For kids and teens, a grown-up agrees first. Then every tree on this device stands together in the grove. One parent or two, grandparents, foster, or blended, every family fits."
      },
      {
       "k": "points",
       "h": "A quiet alert for grown-ups",
       "items": [
        [
         "Please check in with...",
         "When a check-in asks for a talk"
        ],
        [
         "A nudge, not the answers",
         "Find a quiet moment and listen"
        ],
        [
         "988 and 911",
         "If anyone is in danger"
        ]
       ],
       "say": "There is one more thing to know. If a kid’s or teen’s check-in asks for a caring conversation, the grown-ups who agreed for them see a quiet note here. It says, please check in with them. It shows no answers. It asks the grown-up to find a quiet moment and listen. And if anyone is in danger, call or text nine eight eight, or call nine one one."
      },
      {
       "k": "big",
       "h": "No one has to carry something hard alone.",
       "sub": "Tell a safe grown-up. They want to know.",
       "say": "Kids, that note is there so no one carries something hard alone. If you are not safe, or something feels too big, tell a safe grown-up. They want to know, and they will help."
      },
      {
       "k": "big",
       "h": "Let us say it together.",
       "sub": "Your tree is yours. The grove is ours.",
       "beats": [
        "Let us make it a family promise, right now.",
        "Hold hands, or put a hand on a shoulder.",
        "Give one gentle squeeze for your tree is yours.",
        "Give two squeezes for the grove is ours.",
        {
         "t": "Now say it out loud, all together, your tree is yours, and the grove is ours.",
         "w": 10
        }
       ],
       "say": "Let us make it a family promise, right now. Hold hands, or put a hand on a shoulder. Give one gentle squeeze for your tree is yours. Give two squeezes for the grove is ours. Now say it out loud, all together, your tree is yours, and the grove is ours."
      },
      {
       "k": "points",
       "h": "One file keeps it safe",
       "items": [
        [
         "Back up everything",
         "In How it works"
        ],
        [
         "One file",
         "The Grove, every profile, settings"
        ],
        [
         "Load a backup",
         "On a new device, or to combine two"
        ]
       ],
       "say": "Everything stays on this device. To keep it safe, open How it works and tap Back up everything. You get one file with The Grove, every profile, each still locked, and your settings. On a new device, tap Load a backup. You can even combine two devices. Posts, reactions, and family practices come together, and nothing is erased."
      },
      {
       "k": "big",
       "h": "Groves that link across phones are coming later.",
       "sub": "For now, your grove lives on this device.",
       "say": "Groves that link across different phones are coming later. For now, your family grove lives right here, on this device."
      },
      {
       "k": "quiz",
       "q": "What does the grove show about your tree?",
       "opts": [
        "Your answers and journal",
        "The big picture, if your switch is on",
        "Everything you write"
       ],
       "right": 1,
       "why": "Only the big picture shows: days tended, rings, and which parts you tended, and only with your switch on.",
       "say": "Last question. What does the grove show about your tree?"
      }
     ]
    }
   ]
  },
  {
   "id": "grove-six",
   "title": "The Six Parts, Together",
   "who": "One lesson for each part of a family grove, with a practice to do together",
   "certTitle": "The Grove: The Six Parts, Together",
   "certLine": "For finishing every lesson on tending the six parts together as a family.",
   "lessons": [
    {
     "id": "gr-6-roots",
     "n": 1,
     "title": "Roots: What Grounds You",
     "mins": 5,
     "blurb": "What holds your family up, together.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 1",
       "h": "Roots",
       "sub": "What grounds you.",
       "say": "This lesson is about Roots, what grounds you. For a family, roots are what hold everyone up, together."
      },
      {
       "k": "big",
       "h": "Roots hold a tree up, deep where no one sees.",
       "sub": "You can’t always see them. You always need them.",
       "say": "Every tree stands on its roots. They grow deep, where no one can see them. You can’t always see a family’s roots either. But when the wind blows, they are what hold everyone up."
      },
      {
       "k": "points",
       "h": "Roots for a family can look like",
       "items": [
        [
         "Feeling thankful",
         "Noticing the good in today"
        ],
        [
         "Quiet and wonder",
         "A still minute, a wow outside"
        ],
        [
         "Family traditions",
         "The ways your family marks a day"
        ],
        [
         "Faith, if your family has one",
         "Prayer, worship, God by any name"
        ]
       ],
       "say": "Roots for a family can look like feeling thankful, and noticing the good in today. Quiet and wonder, like a still minute, or a wow outside. Family traditions, the ways your family marks a birthday, a holiday, or a hard day. And for some families, roots include faith: prayer, worship, or God, by whatever name you use. Every family’s roots look a little different. The Grove is made for all faith traditions and everything in-between."
      },
      {
       "k": "big",
       "h": "Roots are about what you feel together.",
       "sub": "When we are quiet, thankful, or outside, do we feel more peaceful inside?",
       "say": "Roots are not a test of what anyone believes. A better question for a family is this one. When we are quiet together, or thankful, or outside, do we feel more peaceful inside? Everyone’s answer is welcome, from the youngest to the oldest."
      },
      {
       "k": "points",
       "h": "How families tend Roots",
       "items": [
        [
         "Gratitude Round",
         "One thank-you each, at dinner or bedtime"
        ],
        [
         "Bedtime Blessing",
         "A kind wish by name, in your own words"
        ],
        [
         "Family Awe Walk",
         "Find one thing that makes you say wow"
        ],
        [
         "A Family Spot",
         "A calm place for five quiet minutes"
        ]
       ],
       "say": "Here are a few ways families tend their roots. A Gratitude Round, where everyone names one thing they are thankful for today. A Bedtime Blessing, a short blessing or kind wish over each person, in whatever words fit your family. A prayer, a wish, or simply, I’m glad you’re mine. A Family Awe Walk, where everyone looks for one thing that makes them say wow. And A Family Spot, one calm place where you sit together for five quiet minutes."
      },
      {
       "k": "tabs",
       "app": "grove",
       "app_name": "The Grove",
       "tabs": [
        "Our Grove",
        "The Wall",
        "Together",
        "How it works",
        "Learn"
       ],
       "tap": 2,
       "note": {
        "h": "Together",
        "p": "Tap Roots to see the family practices for this part."
       },
       "say": "You will find all of these in The Grove, on the Together tab. Tap Roots to see just the Roots practices. Each one has a line for little ones, and Show me how opens the steps."
      },
      {
       "k": "card",
       "title": "One Quiet Minute",
       "body": "Set a timer and sit in silence together for one minute. Then each person shares one sound they heard.",
       "btns": [
        "We did this today",
        "Show me how"
       ],
       "tap": 0,
       "say": "Here is one to try. It is called One Quiet Minute. When your family has done it, anyone can tap We did this today. The grove grows, and The Wall shows that the family did it together."
      },
      {
       "k": "points",
       "h": "Practice: One Quiet Minute",
       "items": [
        [
         "Get still",
         "Sit close, eyes closed or on the floor"
        ],
        [
         "Listen",
         "For every sound you can hear"
        ],
        [
         "Share one sound",
         "Each person names one"
        ]
       ],
       "cue": {
        "w": {
         "3": 30,
         "4": 20
        },
        "at": [
         1,
         3,
         4
        ]
       },
       "say": "Let us try a short one together, right now. Everyone, sit close. Close your eyes, or look at the floor. Now be very quiet, and listen for every sound you can hear. Now go around, and each person share one sound you heard."
      },
      {
       "k": "big",
       "h": "Small things, done often, grow deep roots.",
       "sub": "At home, set a timer for the full minute.",
       "say": "Thank you for listening together. When you try it at home, set a timer for the full minute. Small things, done often, grow deep roots."
      },
      {
       "k": "big",
       "h": "Your tree shows which parts you tended.",
       "sub": "Tap a tree on Our Grove. Never answers, levels, or notes.",
       "say": "One more thing. On Our Grove, tap a person to see their tree. If their switch is on, you can see which parts they tended this week, like Roots. Never their answers, levels, or notes. Your tree is yours. The grove is ours."
      },
      {
       "k": "quiz",
       "q": "What matters most in a family’s roots?",
       "opts": [
        "Everyone believing the same thing",
        "What helps the family feel grounded and at peace",
        "Doing every practice every day"
       ],
       "right": 1,
       "why": "Roots are about what holds your family up, never a test of what anyone believes.",
       "say": "Quick question. What matters most in a family’s roots?"
      }
     ]
    },
    {
     "id": "gr-6-trunk",
     "n": 2,
     "title": "Trunk: Purpose",
     "mins": 5,
     "blurb": "What your family lives for, and the things you make along the way.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 2",
       "h": "Trunk",
       "sub": "Purpose.",
       "say": "This lesson is about the Trunk, purpose. What your family lives for, and the things you make along the way."
      },
      {
       "k": "big",
       "h": "The trunk carries everything up to the branches.",
       "say": "A tree’s trunk carries water from the roots all the way up to the branches. Purpose works the same way in a family. It carries your days, and it gives everyone’s effort somewhere to go."
      },
      {
       "k": "points",
       "h": "Purpose for a family can look like",
       "items": [
        [
         "Making things together",
         "Build, bake, draw, or plant"
        ],
        [
         "Knowing what you stand for",
         "Kind, brave, honest, fun"
        ],
        [
         "Helping others",
         "A neighbor, a friend, a stranger"
        ],
        [
         "Everyone has a job",
         "Even the smallest helper"
        ]
       ],
       "say": "Purpose for a family can look like making things together. Building, baking, drawing, or planting. Knowing what your family stands for, like kind, brave, honest, or fun. Helping others, a neighbor, a friend, or even a stranger. And everyone having a job, even the smallest helper."
      },
      {
       "k": "big",
       "h": "Everyone in the family has something to give.",
       "sub": "Little hands and grown-up hands both count.",
       "say": "Here is a big idea. Everyone in the family has something to give. A little one can set out the spoons. A teenager can teach a grandparent the new phone. A grandparent can tell how things used to be. Purpose belongs to every age."
      },
      {
       "k": "points",
       "h": "How families tend the Trunk",
       "items": [
        [
         "Make Something Together",
         "Start to finish, even if it’s messy"
        ],
        [
         "Our Family Words",
         "Three words, hung where everyone sees"
        ],
        [
         "Help Someone Together",
         "One kind thing, as a family"
        ],
        [
         "A Job That Matters",
         "Side by side, and name who it helps"
        ]
       ],
       "say": "Here are a few ways families tend the trunk. Make Something Together, one small thing, start to finish, even if it is messy. Our Family Words, three words for what your family stands for, written big and hung where everyone sees them. Help Someone Together, one kind thing for someone, as a family. And A Job That Matters. Do a household job side by side, and name who it helps, even if the answer is all of us."
      },
      {
       "k": "card",
       "title": "Our Family Words",
       "body": "Choose three words for what your family stands for, and put them where everyone sees them.",
       "btns": [
        "We did this today",
        "Show me how"
       ],
       "tap": 1,
       "say": "You will find these on the Together tab, under Trunk. At the top, This week’s theme shows one practice picked for your family’s week. Tap Show me how to see the steps. For Our Family Words, everyone suggests words, you talk about why each one matters, and then you choose three together."
      },
      {
       "k": "points",
       "h": "Practice: Dream Out Loud",
       "items": [
        [
         "Ask the question",
         "What do you hope to do someday?"
        ],
        [
         "Every dream is welcome",
         "From astronaut to a new bike trick"
        ],
        [
         "Ask one curious question",
         "About someone’s dream"
        ]
       ],
       "cue": {
        "w": {
         "3": 25,
         "4": 15
        },
        "at": [
         2,
         3,
         4
        ]
       },
       "say": "Let us practice one together, right now. It is called Dream Out Loud. Someone ask the question: what is one thing you hope to do or become someday? Go around, and let every answer be welcome, from astronaut to a new bike trick. Now pick one dream, and ask that person one curious question about it."
      },
      {
       "k": "big",
       "h": "A dream grows when someone is curious about it.",
       "say": "Big or small, a dream grows when someone is curious about it. When you have done a family practice, tap We did this today, and the grove grows too."
      },
      {
       "k": "big",
       "h": "Purpose can change shape and still be real.",
       "sub": "New seasons bring new ways to give.",
       "say": "Families change. A new baby arrives. Someone moves away, or retires, or gets sick. When that happens, purpose can change shape and still be real. Ask each other, what can each of us still give? There is always an answer."
      },
      {
       "k": "quiz",
       "q": "Who has something to give in a family?",
       "opts": [
        "Only the grown-ups",
        "Everyone, at every age",
        "Only the people with jobs"
       ],
       "right": 1,
       "why": "Purpose belongs to every age, from the smallest helper to the oldest.",
       "say": "Quick question. Who has something to give in a family?"
      }
     ]
    },
    {
     "id": "gr-6-bark",
     "n": 3,
     "title": "Bark: Mind and Feelings",
     "mins": 5,
     "blurb": "Big feelings, calm breaths, and kind thoughts, for the whole family.",
     "sources": [
      "lieberman",
      "siegel"
     ],
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 3",
       "h": "Bark",
       "sub": "Mind and feelings.",
       "say": "This lesson is about Bark, mind and feelings. Big feelings, calm breaths, and kind thoughts, for the whole family."
      },
      {
       "k": "big",
       "h": "Bark protects the tree, and it stretches as it grows.",
       "say": "Bark protects a tree from wind and sun. And it has to stretch as the tree grows. Feelings in a family work the same way. Healthy bark bends without breaking."
      },
      {
       "k": "points",
       "h": "Healthy bark in a family can look like",
       "items": [
        [
         "Every feeling is welcome",
         "Sad, scared, mad, tired, glad"
        ],
        [
         "Listening without fixing",
         "Thanks for telling us"
        ],
        [
         "Calm breaths",
         "When things get loud"
        ],
        [
         "Starting again, kinder",
         "With no blame"
        ]
       ],
       "say": "Healthy bark in a family can look like this. Every feeling is welcome: sad, scared, mad, tired, and glad. Listening without fixing, and simply saying, thanks for telling us. Calm breaths, when things get loud. And starting again, kinder, with no blame."
      },
      {
       "k": "big",
       "h": "Naming a feeling helps it settle.",
       "sub": "Some families call it name it to tame it.",
       "say": "Here is something researchers have found. Putting a feeling into words can help it settle. Some families call it, name it to tame it. It works for a five year old, and for a grandparent too."
      },
      {
       "k": "points",
       "h": "How families tend Bark",
       "items": [
        [
         "Breathe Together",
         "Five slow breaths, like cooling soup"
        ],
        [
         "Worry Jar",
         "Draw a worry, and talk about one"
        ],
        [
         "Family Reset",
         "Pause, three breaths, start again"
        ],
        [
         "Screen-Free Hour",
         "Every screen away, grown-ups too"
        ]
       ],
       "say": "Here are a few ways families tend their bark. Breathe Together, five slow breaths, in through the nose and out like blowing on hot soup. A Worry Jar, where everyone writes or draws a worry, and you talk about one together. Family Reset. When things get loud, anyone says your reset word, everyone takes three breaths, and you start again. And a Screen-Free Hour, with every screen put away, grown-ups too. You will find them all on the Together tab, under Bark."
      },
      {
       "k": "card",
       "title": "Feelings Weather Report",
       "body": "Everyone names their inside weather today: sunny, cloudy, rainy, or stormy. No fixing, just listening.",
       "btns": [
        "We did this today",
        "Show me how"
       ],
       "tap": 0,
       "say": "Here is one more, called the Feelings Weather Report. Everyone names the weather inside them today. When you are done, anyone can tap We did this today."
      },
      {
       "k": "points",
       "h": "Practice: Feelings Weather Report",
       "items": [
        [
         "Find your weather",
         "Sunny, cloudy, rainy, or stormy"
        ],
        [
         "Go around once",
         "Each person names their weather"
        ],
        [
         "Just listen",
         "Thanks for telling us"
        ]
       ],
       "cue": {
        "w": {
         "2": 8,
         "3": 20
        },
        "at": [
         1,
         3,
         4
        ]
       },
       "say": "Let us try it together, right now. First, everyone think quietly about the weather inside you today. Is it sunny, cloudy, rainy, or stormy? Now go around once, and each person say their weather. If someone says rainy or stormy, just say, thanks for telling us."
      },
      {
       "k": "big",
       "h": "Every family has rainy days.",
       "sub": "Telling each other is how bark grows strong.",
       "say": "Every family has rainy days, and stormy ones too. No fixing, and no advice unless someone asks. Telling each other, and being heard, is how bark grows strong."
      },
      {
       "k": "big",
       "h": "Grown-ups may see a quiet alert.",
       "sub": "Please check in. Never the answers.",
       "say": "A note for grown-ups. When a kid or teen’s check-in asks for a caring conversation, the grown-ups who agreed for them see a quiet alert in The Grove. It never shows their answers. Find a quiet moment, ask how they are doing, and listen. And kids, you can always go to a grown-up yourself, any time."
      },
      {
       "k": "big",
       "h": "If anyone is not safe, tell a safe grown-up.",
       "sub": "Grown-ups: call or text 988. In danger now? Call 911.",
       "say": "If anyone in your family is not safe, or a feeling stays heavy for a long time, tell a safe grown-up. That is a brave and strong thing to do. Grown-ups, you can talk with a doctor or a counselor, and you can call or text nine eight eight any time. If someone is in danger right now, call nine one one."
      },
      {
       "k": "quiz",
       "q": "Someone shares a stormy feeling. What can you say?",
       "opts": [
        "Cheer up, it’s not that bad",
        "Thanks for telling us",
        "Let’s fix it right now"
       ],
       "right": 1,
       "why": "Listening without fixing helps a feeling settle, and helps the whole family feel safe to share.",
       "say": "Quick question. Someone shares a stormy feeling. What can you say?"
      }
     ]
    },
    {
     "id": "gr-6-branches",
     "n": 4,
     "title": "Branches: Relationships",
     "mins": 5,
     "blurb": "Reaching toward people, and letting them reach you.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 4",
       "h": "Branches",
       "sub": "Relationships.",
       "say": "This lesson is about Branches, the part of a family that reaches toward people, and lets them reach back."
      },
      {
       "k": "big",
       "h": "Reaching toward people, and letting them reach you.",
       "say": "In The Grove, Branches means reaching toward people, and letting them reach you. A tree catches light with its branches. A family catches light the same way, by reaching toward each other."
      },
      {
       "k": "points",
       "h": "Branches in a family can look like",
       "items": [
        [
         "Time side by side",
         "A meal, a game, a walk"
        ],
        [
         "Listening",
         "Without rushing to fix"
        ],
        [
         "Reaching beyond the house",
         "Grandparents, cousins, neighbors, friends"
        ],
        [
         "Saying thank you",
         "Out loud, and often"
        ]
       ],
       "say": "In a family, branches can look like time side by side, at a meal, a game, or a walk. Listening, without rushing to fix. Reaching beyond your own house, to grandparents, cousins, neighbors, and friends. And saying thank you, out loud and often."
      },
      {
       "k": "big",
       "h": "Every family’s branches look different.",
       "sub": "One grown-up or two, grandparents, stepfamilies, foster families, roommates who are family.",
       "say": "Every family looks different. One grown-up or two. Grandparents raising grandkids. Stepfamilies, foster families, and roommates who are family. Whatever yours looks like, these branches are yours to tend together."
      },
      {
       "k": "story",
       "eyebrow": "A Family Moment",
       "title": "Phones in the Basket",
       "lines": [
        "The phones go in a basket by the door, grown-ups first.",
        "At first, the table feels too quiet. Then someone asks, what made you laugh today?",
        "The youngest tells a story so long and so silly that dinner goes cold. Nobody minds."
       ],
       "lesson": "Just people, turned toward each other.",
       "say": "Picture a family at dinner. The phones go in a basket by the door, grown-ups first. At first, the table feels too quiet. Then someone asks, what made you laugh today? The youngest tells a story so long and so silly that dinner goes cold. Nobody minds. That is Branches. Nothing fancy. Just people, turned toward each other."
      },
      {
       "k": "points",
       "h": "Branches practices in Together",
       "items": [
        [
         "Phones-Down Dinner",
         "Phones in another room, grown-ups too"
        ],
        [
         "Rose and Thorn",
         "The best and hardest part of your day"
        ],
        [
         "Reach Out Together",
         "A call or a card for someone you miss"
        ],
        [
         "Game Night",
         "The youngest picks"
        ]
       ],
       "say": "The Together tab has five Branches practices. Phones-Down Dinner, with phones in another room, grown-ups too. Rose and Thorn, where everyone shares the best and the hardest part of their day. Reach Out Together, a call or a card for someone your family misses. Game Night, where the youngest picks the game. And Thank-You Notes, for someone in the family."
      },
      {
       "k": "screen",
       "app": "grove",
       "app_name": "The Grove",
       "title": "Together: Branches",
       "rows": [
        [
         "Rose and Thorn",
         "Branches",
         "#1F8A8F"
        ],
        [
         "The best and hardest part of your day",
         ""
        ],
        [
         "Show me how",
         ""
        ],
        [
         "We did this today",
         ""
        ]
       ],
       "tap": 3,
       "say": "Each practice card has a Show me how button with simple steps, and words for little ones too. When you finish, one person taps We did this today. The grove grows, and a note shows up on The Wall that the family did it together."
      },
      {
       "k": "points",
       "h": "Practice: Rose and Thorn",
       "items": [
        [
         "Gather",
         "Everyone who is here right now"
        ],
        [
         "Your rose",
         "The best part of your day"
        ],
        [
         "Your thorn",
         "The hardest part of your day"
        ],
        [
         "Say thank you",
         "No fixing, just listening"
        ]
       ],
       "cue": {
        "w": {
         "3": 20,
         "5": 20
        },
        "at": [
         2,
         3,
         4,
         5
        ]
       },
       "say": "Let us try one together, right now. This one is called Rose and Thorn. Gather everyone who is watching. Go around once, and each person shares a rose, the best part of their day. Then go around again for a thorn, the hardest part of their day. Listen without fixing, and after each one, say, thanks for telling us."
      },
      {
       "k": "big",
       "h": "Cheer each other on.",
       "sub": "On The Wall, post a short note, or react with Proud of you, Hug, or Thank you.",
       "say": "Branches grow on The Wall too. Post a short note, like proud of you for the walk today. Or react with Proud of you, Hug, or Thank you. Reactions show who reacted, never a running total, because this is about each other, not a score."
      },
      {
       "k": "big",
       "h": "Everyone deserves to feel safe at home.",
       "sub": "If someone is not safe, tell a safe grown-up. Call or text 988. In danger right now? Call 911.",
       "say": "Branches grow best where everyone is safe. If anyone in your family is not safe, or is being hurt, tell a safe grown-up, like a teacher, a relative, or a school counselor. You can call or text nine eight eight, any time. And if someone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Reach toward each other, a little at a time.",
       "sub": "Rose and Thorn is in Together, under Branches.",
       "say": "Reach toward each other, a little at a time, and your branches will grow. You will find Rose and Thorn in the Together tab, under Branches."
      },
      {
       "k": "quiz",
       "q": "In Rose and Thorn, what do you do when someone shares a thorn?",
       "opts": [
        "Fix it right away",
        "Listen, and thank them for telling you",
        "Skip to the next person"
       ],
       "right": 1,
       "why": "Listening without fixing helps people feel heard.",
       "say": "Quick question. In Rose and Thorn, what do you do when someone shares a thorn?"
      }
     ]
    },
    {
     "id": "gr-6-leaves",
     "n": 5,
     "title": "Leaves: Body",
     "mins": 5,
     "blurb": "Moving, resting, and eating well, together.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 5",
       "h": "Leaves",
       "sub": "Body.",
       "say": "This lesson is about Leaves, the body. Moving, resting, and eating in ways that are good for every body in the family."
      },
      {
       "k": "big",
       "h": "Leaves turn sunlight into energy for the whole tree.",
       "say": "Leaves turn sunlight into energy for the whole tree. Bodies do something like that for a family. When bodies are rested and fed, everyone has more to give."
      },
      {
       "k": "flow",
       "h": "Three ways to tend Leaves",
       "steps": [
        [
         "Move",
         "Every body, at its own pace"
        ],
        [
         "Rest",
         "Sleep and cozy breaks"
        ],
        [
         "Nourish",
         "Good food and meals together"
        ]
       ],
       "say": "The Grove tends Leaves in three ways. Move, with every body going at its own pace. Rest, with sleep and cozy breaks. And Nourish, with good food, water, and meals together."
      },
      {
       "k": "big",
       "h": "Every body moves its own way.",
       "sub": "Walking, rolling, stretching, dancing in a chair. It all counts.",
       "say": "Every body is different, and every body moves its own way. Walking, rolling, stretching, or dancing in a chair. It all counts. On a Family Walk, the slowest walker sets the pace, so no one gets left behind."
      },
      {
       "k": "points",
       "h": "Leaves practices in Together",
       "items": [
        [
         "Family Walk",
         "Fifteen minutes, at the slowest pace"
        ],
        [
         "Kitchen Dance Party",
         "One song, everyone dances"
        ],
        [
         "Early Night",
         "Lights low, thirty minutes early"
        ],
        [
         "Cook Together",
         "Everyone gets a job"
        ]
       ],
       "say": "The Together tab has five Leaves practices. Family Walk, fifteen minutes at the pace of the slowest walker. Kitchen Dance Party, one song, and everyone dances. Early Night, when everyone winds down thirty minutes early, with the lights low. Cook Together, where everyone gets a job. And Stretch Together, which we will do in a moment."
      },
      {
       "k": "story",
       "eyebrow": "A Family Moment",
       "title": "Thank the Cooks",
       "lines": [
        "On a busy night, a family cooks together. One person washes. One stirs. The littlest sets the table, a little crooked.",
        "The meal takes longer than usual, and it is not perfect.",
        "When they sit down, someone says, thank you to the cooks. Everyone laughs, because that is all of them."
       ],
       "lesson": "Nourish is about the table, not only the food.",
       "say": "Picture a busy night. A family decides to cook together. One person washes. One stirs. The littlest sets the table, a little crooked. The meal takes longer than usual, and it is not perfect. When they sit down, someone says, thank you to the cooks. Everyone laughs, because that is all of them. Nourish is about the table, not only the food."
      },
      {
       "k": "big",
       "h": "Rest is part of how bodies grow.",
       "sub": "Early Night is one way to rest together.",
       "say": "Rest matters too. Rest is part of how bodies grow, for kids and grown-ups alike. Early Night is a simple way to rest together. Pick a night this week. Turn the lights low, put screens away, and read, talk quietly, or just rest."
      },
      {
       "k": "points",
       "h": "Practice: Stretch Together",
       "items": [
        [
         "Reach up tall",
         "Like a tree"
        ],
        [
         "Fold over slowly",
         "Like a rag doll"
        ],
        [
         "Stretch out wide",
         "Like a star"
        ],
        [
         "Three slow breaths",
         "All together"
        ]
       ],
       "cue": {
        "w": {
         "3": 8,
         "4": 8,
         "5": 8,
         "6": 12
        },
        "at": [
         3,
         4,
         5,
         6
        ]
       },
       "say": "Let us move together, right now. This one is called Stretch Together. Stand up, or sit tall in your chair, and only stretch in ways that feel good. Reach up tall, like a tree. Now fold over slowly, like a rag doll. Come back up, and stretch out wide, like a star. Last, take three slow breaths, all together."
      },
      {
       "k": "screen",
       "app": "grove",
       "app_name": "The Grove",
       "title": "The Wall",
       "rows": [
        [
         "Together",
         "This week"
        ],
        [
         "The family did Family Walk together.",
         ""
        ],
        [
         "Proud of you",
         "React"
        ]
       ],
       "tap": 2,
       "say": "When you finish a practice, tap We did this today, and the grove grows. The Wall shows that the family did it together. Anyone can react with Proud of you, or a Hug."
      },
      {
       "k": "big",
       "h": "Every body in the family matters.",
       "sub": "Talk with a doctor before big changes.",
       "say": "Every body in your family matters, big and small, fast and slow. Talk with a doctor before any big changes. And you will find Stretch Together in the Together tab, under Leaves."
      },
      {
       "k": "quiz",
       "q": "On a Family Walk, who sets the pace?",
       "opts": [
        "The fastest walker",
        "The slowest walker",
        "Whoever is in front"
       ],
       "right": 1,
       "why": "The slowest walker sets the pace, so no one gets left behind.",
       "say": "Quick question. On a Family Walk, who sets the pace?"
      }
     ]
    },
    {
     "id": "gr-6-fruit",
     "n": 6,
     "title": "Fruit: Hope",
     "mins": 5,
     "blurb": "Looking forward, noticing the good, and growing toward it.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "The Six Parts, Together, Lesson 6",
       "h": "Fruit",
       "sub": "Hope.",
       "say": "This last lesson is about Fruit, a family’s hope. Looking forward, noticing the good, and growing toward it."
      },
      {
       "k": "big",
       "h": "Fruit grows from the whole tree.",
       "say": "Fruit takes time, and it grows from the whole tree. Roots, trunk, bark, branches, and leaves all feed it. A family’s hope grows the same way, from all the small things you do together."
      },
      {
       "k": "points",
       "h": "Fruit in a family can look like",
       "items": [
        [
         "Something to look forward to",
         "Pancakes on Saturday counts"
        ],
        [
         "Noticing the good",
         "Even on hard days"
        ],
        [
         "Kind acts",
         "Big or small, seen or secret"
        ],
        [
         "Remembering good days",
         "And what you still carry from them"
        ]
       ],
       "say": "In a family, fruit can look like something to look forward to, even pancakes on Saturday. Noticing the good, even on hard days. Kind acts, big or small. And remembering good days together."
      },
      {
       "k": "big",
       "h": "Hope is something a family can do.",
       "sub": "Sometimes the feeling catches up with you.",
       "say": "Hope is not only a feeling you wait for. It is something a family can practice. Noticing what is good, taking the next small step, and giving to others. Sometimes you do the hopeful thing first, and the feeling catches up with you."
      },
      {
       "k": "points",
       "h": "Fruit practices in Together",
       "items": [
        [
         "Something to Look Forward To",
         "Plan one small thing together"
        ],
        [
         "Secret Kindness",
         "Guess who did what"
        ],
        [
         "Remember Together",
         "Old photos, one good day"
        ],
        [
         "Plant a Seed",
         "Check on it each week"
        ]
       ],
       "say": "The Together tab has five Fruit practices. Something to Look Forward To, where you plan one small thing and put it on the calendar. Good News Round, where everyone shares one good thing from the week. Secret Kindness, where everyone does a kind thing without telling, and at the end of the week, you guess who did what. Remember Together, with old photos and the story of a good day. And Plant a Seed, which you check on each week, because growth takes time."
      },
      {
       "k": "story",
       "eyebrow": "A Family Moment",
       "title": "A Bean on the Windowsill",
       "lines": [
        "A family plants one bean in a paper cup and sets it on the windowsill.",
        "For days, nothing. The youngest checks every morning. Still nothing.",
        "Then one morning, a tiny green loop pushes up through the dirt. Everyone crowds around the window."
       ],
       "lesson": "Growth takes time. Waiting together is part of it.",
       "say": "Picture a family planting one bean in a paper cup. They set it on the windowsill. For days, nothing. The youngest checks every morning. Still nothing. Then one morning, a tiny green loop pushes up through the dirt, and everyone crowds around the window. Growth takes time. Waiting together is part of it."
      },
      {
       "k": "screen",
       "app": "grove",
       "app_name": "The Grove",
       "title": "Our Grove",
       "rows": [
        [
         "14 days of growing together",
         ""
        ],
        [
         "Ladybug",
         "Here",
         "#3A9B58"
        ],
        [
         "Butterfly",
         "Here",
         "#3A9B58"
        ],
        [
         "Bluebird",
         "Here",
         "#3A9B58"
        ],
        [
         "Bunny",
         "At 35 days"
        ]
       ],
       "say": "You can see fruit in Our Grove too. Each day someone tends their tree, or the family does a practice together, the grove grows. Visitors arrive as the days add up. First a ladybug, then a butterfly, then a bluebird. And growth only adds. A quiet week never takes anything away."
      },
      {
       "k": "points",
       "h": "Practice: Good News Round",
       "items": [
        [
         "Think",
         "One good thing from this week"
        ],
        [
         "Go around",
         "Each person shares"
        ],
        [
         "Cheer",
         "For every single one"
        ]
       ],
       "cue": {
        "w": {
         "3": 10,
         "5": 25
        },
        "at": [
         2,
         4,
         5
        ]
       },
       "say": "Let us practice together. This one is called Good News Round. Everyone, think of one good thing that happened this week. Small counts, like a good sandwich or a funny moment. Now go around once, and each person shares their good thing. After each one, everyone cheers."
      },
      {
       "k": "big",
       "h": "When hope feels far, you don’t have to hold it alone.",
       "sub": "Tell a safe grown-up. Call or text 988, any time. In danger right now? Call 911.",
       "say": "Some days, it is hard to see anything good ahead. If that is you, you do not have to hold it alone. Tell a safe grown-up. Call or text nine eight eight, any time. And if someone is in danger right now, call nine one one."
      },
      {
       "k": "big",
       "h": "Tend the whole tree together, and fruit will come.",
       "sub": "Good News Round is in Together, under Fruit.",
       "say": "Tend the whole tree together, a little at a time, and fruit will come. Good News Round is in the Together tab, under Fruit. That is all six parts. Well done, all of you."
      },
      {
       "k": "quiz",
       "q": "What does Plant a Seed teach a family?",
       "opts": [
        "Growth happens overnight",
        "Growth takes time",
        "Only big gardens grow"
       ],
       "right": 1,
       "why": "Growth takes time, and waiting together is part of it.",
       "say": "Last question. What does Plant a Seed teach a family?"
      }
     ]
    }
   ]
  },
  {
   "id": "grove-together",
   "kind": "support",
   "title": "Do This Together",
   "who": "Short videos for the whole family, side by side",
   "lessons": [
    {
     "id": "gr-r-breath",
     "n": 1,
     "title": "A Family Breath",
     "mins": 2,
     "blurb": "Five slow breaths together, in through the nose and out like blowing on soup.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "A Family Breath",
       "sub": "Five slow breaths, side by side.",
       "say": "This one is for the whole family, all at once. Big people, little people, and everyone in between. It takes about three minutes, and all you need is each other."
      },
      {
       "k": "points",
       "h": "Get close",
       "items": [
        [
         "Sit or stand together",
         "The couch, the floor, anywhere"
        ],
        [
         "Feet on the ground",
         "Feel the floor hold you up"
        ],
        [
         "Hands where they like",
         "On your belly, or holding hands"
        ]
       ],
       "say": "First, get close. Sit or stand together, on the couch, on the floor, wherever you are. Put your feet on the ground. Rest your hands on your belly, or hold the hand next to you."
      },
      {
       "k": "words",
       "h": "Breathe like this",
       "items": [
        "In through your nose, two, three, four.",
        "Out slowly, like blowing on hot soup."
       ],
       "say": "Here is how. Breathe in through your nose for a count of four. Then breathe out slowly, like you are cooling a spoonful of hot soup. Not too fast, or the soup splashes!"
      },
      {
       "k": "big",
       "h": "Five breaths, together",
       "sub": "In through your nose. Out like hot soup.",
       "beats": [
        "Let us do five together.",
        {
         "t": "Breathe in.",
         "p": 3.5
        },
        {
         "t": "And out, like hot soup.",
         "p": 5
        },
        {
         "t": "Breathe in.",
         "p": 3.5
        },
        {
         "t": "And out, slow and long.",
         "p": 5
        },
        {
         "t": "One more in.",
         "p": 3.5
        },
        {
         "t": "And out.",
         "p": 5
        },
        {
         "t": "Now two more, nice and slow, at your own pace.",
         "w": 12
        }
       ],
       "say": "Let us do five together. Breathe in. And out, like hot soup. Breathe in. And out, slow and long. One more in. And out. Now two more, nice and slow, at your own pace."
      },
      {
       "k": "points",
       "h": "Look around",
       "items": [
        [
         "Shoulders",
         "A little lower?"
        ],
        [
         "Bellies",
         "A little softer?"
        ],
        [
         "The room",
         "A little quieter?"
        ]
       ],
       "cue": {
        "p": {
         "1": 1.5,
         "2": 1.5,
         "3": 1.5
        }
       },
       "say": "Now look around at each other. Are your shoulders a little lower? Are your bellies a little softer? Is the room a little quieter? Maybe someone is smiling."
      },
      {
       "k": "points",
       "h": "Find it in The Grove",
       "items": [
        [
         "Together",
         "Breathe Together, under Bark"
        ],
        [
         "Show me how",
         "The steps, any time"
        ],
        [
         "We did this today",
         "Tap it, and the grove grows"
        ]
       ],
       "say": "You can find this in The Grove, in the Together tab. It is called Breathe Together, under Bark. Tap Show me how to see the steps. And when you have done it, tap We did this today, and the grove grows."
      },
      {
       "k": "big",
       "h": "When the house feels loud, breathe together.",
       "sub": "Before school, after a hard moment, or at bedtime.",
       "say": "Use it any time the house feels loud. Before school, after a hard moment, or right before bed. A few slow breaths, together, can settle the whole room."
      }
     ]
    },
    {
     "id": "gr-r-thanks",
     "n": 2,
     "title": "A Thank-You Round",
     "mins": 3,
     "blurb": "Everyone names one thing they are thankful for, all the way around.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "A Thank-You Round",
       "sub": "One thank-you each, all the way around.",
       "say": "This is a thank-you round. Everyone gets a turn, from the youngest to the oldest. It works at dinner, in the car, or at bedtime. It takes about three minutes."
      },
      {
       "k": "points",
       "h": "How it works",
       "items": [
        [
         "Go around once",
         "Each person gets one turn"
        ],
        [
         "Name one thing from today",
         "Small things count"
        ],
        [
         "Just listen",
         "No one has to explain"
        ]
       ],
       "say": "Here is how it works. Go around once. Each person names one thing they are thankful for today. Small things count. A warm sock. A funny moment. A really good sandwich. And no one has to explain. Everyone else just listens."
      },
      {
       "k": "words",
       "h": "If you get stuck",
       "items": [
        "I’m thankful for…",
        "Something good today was…",
        "Thank you, [name], for…"
       ],
       "say": "If you get stuck, try one of these. I am thankful for, and then fill it in. Something good today was, and fill that in. Or say thank you to someone in the room, for something they did."
      },
      {
       "k": "big",
       "h": "Your turn, all the way around",
       "sub": "Start with the youngest. One thank-you each.",
       "beats": [
        "Let us try it now.",
        "Start with the youngest, and go all the way around.",
        "Pause the video if your round needs more time.",
        {
         "t": "One thank-you each, starting now.",
         "w": 12
        }
       ],
       "say": "Let us try it now. Start with the youngest, and go all the way around. Pause the video if your round needs more time. One thank-you each, starting now."
      },
      {
       "k": "points",
       "h": "Want to go further?",
       "items": [
        [
         "Thank someone in the room",
         "Look at them when you say it"
        ],
        [
         "Make a thank-you",
         "Draw it or write it"
        ],
        [
         "Hide it",
         "Where they will find it"
        ]
       ],
       "say": "Want to go further? Next time, thank someone right there in the room, and look at them when you say it. Or try Thank-You Notes. Everyone draws a name and makes a thank-you for that person. Then hide it where they will find it, or hand it right over."
      },
      {
       "k": "points",
       "h": "Find it in The Grove",
       "items": [
        [
         "Gratitude Round",
         "In Together, under Roots"
        ],
        [
         "Thank-You Notes",
         "In Together, under Branches"
        ],
        [
         "We did this today",
         "Tap it, and the grove grows"
        ]
       ],
       "say": "In The Grove, you will find Gratitude Round in the Together tab, under Roots, and Thank-You Notes under Branches. When your family has done one, tap We did this today, and the grove grows. And on The Wall, you can react to anyone’s post with Thank you."
      },
      {
       "k": "big",
       "h": "Thank-yous grow when we say them out loud.",
       "say": "Thank-yous grow when we say them out loud. Try another round tomorrow, and see what everyone notices."
      }
     ]
    },
    {
     "id": "gr-r-table",
     "n": 3,
     "title": "Dinner Table Questions",
     "mins": 3,
     "blurb": "Phones down, one good question, and everyone gets a turn.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "Dinner Table Questions",
       "sub": "Phones down. One good question.",
       "say": "A meal is one of the best times for a family to talk. Any meal counts, breakfast, dinner, or snacks on the living room floor. Here are some questions that open things up."
      },
      {
       "k": "points",
       "h": "Set the table for talking",
       "items": [
        [
         "Phones in another room",
         "Grown-ups too"
        ],
        [
         "One question at a time",
         "Everyone gets a turn"
        ],
        [
         "Listen without fixing",
         "Thank each person for sharing"
        ]
       ],
       "say": "First, set the table for talking. Phones go in another room, grown-ups too. Ask one question at a time, and give everyone a turn. And listen without fixing. Just thank each person for sharing."
      },
      {
       "k": "words",
       "h": "Rose and Thorn",
       "items": [
        "Rose: the best part of my day.",
        "Thorn: the hardest part of my day."
       ],
       "say": "One family favorite is called Rose and Thorn. Your rose is the best part of your day. Your thorn is the hardest part. Everyone shares both."
      },
      {
       "k": "words",
       "h": "More questions to try",
       "items": [
        "What made you laugh today?",
        "What kind thing did you see?",
        "What is your inside weather?",
        "What superpower would you pick?"
       ],
       "say": "Here are a few more questions to try. What made you laugh today? What kind thing did you see someone do? What is your inside weather? Sunny, cloudy, rainy, or stormy? And one just for fun. If you could have any superpower tomorrow, what would it be?"
      },
      {
       "k": "big",
       "h": "Ask one now",
       "sub": "What made you laugh today?",
       "beats": [
        "Let us try one together, right now.",
        "Pick someone to answer first, then go around.",
        "Pause the video if your table needs more time.",
        {
         "t": "What made you laugh today?",
         "w": 12
        }
       ],
       "say": "Let us try one together, right now. Pick someone to answer first, then go around. Pause the video if your table needs more time. What made you laugh today?"
      },
      {
       "k": "big",
       "h": "When an answer is big, slow down.",
       "sub": "Say, “Thanks for telling us.” If anyone is not safe, tell a safe grown-up.",
       "say": "Sometimes a simple question opens something big. A thorn that really hurts. A stormy day. When that happens, slow down, and say, thanks for telling us. You can talk more after the meal, just the two of you. And if anyone is not safe, tell a safe grown-up right away."
      },
      {
       "k": "points",
       "h": "Find it in The Grove",
       "items": [
        [
         "Phones-Down Dinner",
         "In Together, under Branches"
        ],
        [
         "Rose and Thorn",
         "In Together, under Branches"
        ],
        [
         "We did this today",
         "Tap it, and the grove grows"
        ]
       ],
       "say": "You will find Phones-Down Dinner and Rose and Thorn in the Together tab, under Branches. When your family has done one, tap We did this today, and the grove grows."
      },
      {
       "k": "big",
       "h": "Good questions say, “I want to know you.”",
       "say": "The best questions all say the same thing. I want to know you. Enjoy your meal."
      }
     ]
    },
    {
     "id": "gr-r-bedtime",
     "n": 4,
     "title": "A Bedtime Blessing",
     "mins": 3,
     "blurb": "A few kind words over each person before sleep, in whatever words fit your family.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "A Bedtime Blessing",
       "sub": "A few kind words before sleep.",
       "say": "This is a bedtime blessing. It is a few kind words you say over each person before they sleep. It takes less than a minute a night, and families keep it for years. Keep the lights low and the voices soft."
      },
      {
       "k": "points",
       "h": "A blessing can be",
       "items": [
        [
         "A prayer",
         "If your family prays"
        ],
        [
         "A kind wish",
         "Sleep well. You are loved."
        ],
        [
         "A family saying",
         "Words that belong just to you"
        ]
       ],
       "say": "A blessing looks different in every family. If your family prays, it can be a prayer. It can be a kind wish, like, sleep well, you are loved. Or it can be a family saying, words that belong just to you. Every one of these is welcome here."
      },
      {
       "k": "words",
       "h": "Some words to borrow",
       "items": [
        "I’m glad you’re mine.",
        "You are loved, today and always.",
        "Rest well. Tomorrow is new.",
        "May you be safe, and sleep in peace."
       ],
       "say": "Here are some words to borrow. I am glad you are mine. You are loved, today and always. Rest well, tomorrow is new. Or, may you be safe, and sleep in peace. Change any of them to fit your family."
      },
      {
       "k": "points",
       "h": "How to do it",
       "items": [
        [
         "Say their name",
         "Each person, one at a time"
        ],
        [
         "Add a touch, if they like",
         "A hand on the head, or a hug"
        ],
        [
         "Keep it short",
         "So it lasts for years"
        ]
       ],
       "say": "Here is how. Say each person’s name, one at a time. Add a touch, if they like it, like a hand on their head, or a hug. And keep it short, so it lasts for years."
      },
      {
       "k": "big",
       "h": "Bless each other now",
       "sub": "One name. A few kind words.",
       "beats": [
        "Let us try it now.",
        "Pick the words that fit your family.",
        "Turn to the person next to you, say their name, and say your blessing.",
        "Little ones can bless the grown-ups too.",
        {
         "t": "Take turns, all the way around.",
         "w": 12
        }
       ],
       "say": "Let us try it now. Pick the words that fit your family. Turn to the person next to you, say their name, and say your blessing. Little ones can bless the grown-ups too. Take turns, all the way around."
      },
      {
       "k": "points",
       "h": "Find it in The Grove",
       "items": [
        [
         "Bedtime Blessing",
         "In Together, under Roots"
        ],
        [
         "Early Night",
         "A calm wind-down, under Leaves"
        ],
        [
         "We did this today",
         "Tap it, and the grove grows"
        ]
       ],
       "say": "You will find Bedtime Blessing in the Together tab, under Roots. For an even calmer night, try Early Night, under Leaves. When your family has done one, tap We did this today, and the grove grows."
      },
      {
       "k": "big",
       "h": "You are loved. Sleep well.",
       "sub": "The same words, every night, for as long as you like.",
       "say": "Say the same words every night, for as long as you like. Little by little, they become part of your family. You are loved. Sleep well."
      }
     ]
    },
    {
     "id": "gr-r-hardday",
     "n": 5,
     "title": "After a Hard Day",
     "mins": 3,
     "blurb": "Land together, name your inside weather, and listen without fixing.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "After a Hard Day",
       "sub": "Come home to each other.",
       "say": "Some days are just hard. Maybe someone had a rough day at school, at work, or right here at home. This is a few minutes to land, together. Gather up wherever you are."
      },
      {
       "k": "big",
       "h": "Hard days happen in every family.",
       "sub": "You can carry them together.",
       "say": "Hard days happen in every family. Little kids have them. Teenagers have them. Grown-ups have them too. You do not have to fix the day. For a few minutes, you can just carry it together."
      },
      {
       "k": "points",
       "h": "First, land",
       "items": [
        [
         "Sit close",
         "The couch, the floor, anywhere"
        ],
        [
         "Breathe in through your nose",
         "Slow, for a count of four"
        ],
        [
         "Breathe out like cooling soup",
         "Long and slow"
        ]
       ],
       "cue": {
        "p": {
         "3": 3,
         "4": 4
        },
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "First, land. Sit close, wherever you are. Breathe in through your nose, slow, for a count of four. Then breathe out slowly, like you are blowing on hot soup. One more time, all together."
      },
      {
       "k": "points",
       "h": "Feelings Weather Report",
       "items": [
        [
         "Sunny",
         "Bright and okay"
        ],
        [
         "Cloudy",
         "A little gray"
        ],
        [
         "Rainy",
         "Sad or heavy"
        ],
        [
         "Stormy",
         "Mad, scared, or upset"
        ]
       ],
       "cue": {
        "at": [
         2,
         3,
         4,
         5
        ]
       },
       "say": "Now a Feelings Weather Report. What is the weather inside you right now? Sunny. Cloudy. Rainy. Or stormy. Every kind of weather is welcome here."
      },
      {
       "k": "big",
       "h": "Go around once. One word each.",
       "sub": "If someone says rainy or stormy: Thanks for telling us.",
       "beats": [
        "Go around once.",
        "Each person says their inside weather, just one word.",
        "If someone says rainy or stormy, you can say, thanks for telling us.",
        {
         "t": "Take your turns now.",
         "w": 12
        }
       ],
       "say": "Go around once. Each person says their inside weather, just one word. If someone says rainy or stormy, you can say, thanks for telling us. Take your turns now."
      },
      {
       "k": "points",
       "h": "No fixing, just listening",
       "items": [
        [
         "Listen",
         "You do not have to solve it"
        ],
        [
         "Stay close",
         "A hand, a hug, a seat nearby"
        ],
        [
         "Ask one thing",
         "What would help tonight?"
        ]
       ],
       "cue": {
        "at": [
         2,
         3,
         4
        ]
       },
       "say": "Here is the secret. No fixing, and no advice unless someone asks. Just listen. Stay close, with a hand, a hug, or a seat nearby. Then ask one gentle question. What would help tonight?"
      },
      {
       "k": "big",
       "h": "Too heavy to carry? Tell a grown-up you trust.",
       "sub": "Grown-ups, you can call or text 988 any time.",
       "say": "If a hard day feels too heavy to carry, tell a grown-up you trust. You never have to hold it by yourself. And grown-ups, you can call or text nine eight eight, any time, day or night."
      },
      {
       "k": "big",
       "h": "A hard day is lighter when we carry it together.",
       "sub": "Feelings Weather Report and Breathe Together are in Together, under Bark.",
       "say": "A hard day is still a hard day. But it is lighter when we carry it together. You can find Feelings Weather Report and Breathe Together in Together, under Bark, any time you need them."
      }
     ]
    },
    {
     "id": "gr-r-repair",
     "n": 6,
     "title": "Making Up After a Fight",
     "mins": 3,
     "blurb": "Pause, breathe, and make it right, with grown-ups going first.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "Making Up After a Fight",
       "sub": "Repair, not blame.",
       "say": "Every family argues sometimes. Voices get loud, doors close, and feelings get hurt. That does not mean something is broken. This is how a family makes up, together."
      },
      {
       "k": "big",
       "h": "Fights happen. Making up is what matters.",
       "sub": "Repair is a skill a family can grow.",
       "say": "Fights happen in every family, even in families who love each other very much. What matters most is what comes next. Making up is a skill, and families get better at it with practice."
      },
      {
       "k": "flow",
       "h": "Family Reset",
       "steps": [
        [
         "Pause",
         "Anyone can say the reset word"
        ],
        [
         "Breathe",
         "Three slow breaths"
        ],
        [
         "Start again",
         "Kinder this time"
        ]
       ],
       "cue": {
        "p": {
         "3": 5
        },
        "at": [
         1,
         3,
         4
        ]
       },
       "say": "It starts with a Family Reset. First, pause. Anyone can say your family’s reset word, like stop, or pause. Then breathe, three slow breaths, all together. And start again, kinder this time."
      },
      {
       "k": "points",
       "h": "Grown-ups go first",
       "items": [
        [
         "Name it",
         "I yelled, and that was not fair."
        ],
        [
         "Own it",
         "I am sorry."
        ],
        [
         "Make it right",
         "Next time, I will take a breath first."
        ]
       ],
       "cue": {
        "at": [
         3,
         5,
         7
        ]
       },
       "say": "Here is something important. Grown-ups go first. When a grown-up says sorry, kids learn that everyone makes mistakes, and everyone can make things right. Name what you did. I yelled, and that was not fair. Own it. I am sorry. Then make it right. Next time, I will take a breath first."
      },
      {
       "k": "words",
       "h": "Repair, not blame",
       "items": [
        "I’m sorry for my part.",
        "That hurt my feelings.",
        "Can we start again?",
        "We’re okay."
       ],
       "say": "Then anyone can take a turn. Repair means making things right, not deciding who is to blame. Words like these help. I am sorry for my part. That hurt my feelings. Can we start again? We are okay."
      },
      {
       "k": "big",
       "h": "Grown-ups first. Then anyone who is ready.",
       "sub": "Nothing to make up today? Squeeze a hand and say: We’re okay.",
       "beats": [
        "If there is something to make right today, take turns now.",
        "Grown-ups first, then anyone who is ready.",
        "No one has to say sorry before they mean it.",
        "If there is nothing to make up, just squeeze a hand and say, we are okay.",
        {
         "t": "Go ahead.",
         "w": 12
        }
       ],
       "say": "If there is something to make right today, take turns now. Grown-ups first, then anyone who is ready. No one has to say sorry before they mean it. If there is nothing to make up, just squeeze a hand and say, we are okay. Go ahead."
      },
      {
       "k": "big",
       "h": "Everyone deserves to feel safe at home.",
       "sub": "Not safe? Tell a safe grown-up. In danger right now? Call 911.",
       "say": "Everyone deserves to feel safe at home. Arguing happens, but being hurt, or being scared at home, is different. If anyone in your home is ever not safe, tell a safe grown-up, like a teacher, a relative, or a school counselor. Keep telling until someone helps. If someone is in danger right now, call nine one one. And grown-ups, if you need to talk with someone, call or text nine eight eight."
      },
      {
       "k": "big",
       "h": "We can be upset and still be a family.",
       "say": "You can be upset with someone and still love them. That is what families do. We drift apart for a moment, and we find our way back."
      }
     ]
    },
    {
     "id": "gr-r-celebrate",
     "n": 7,
     "title": "Celebrate Something",
     "mins": 2,
     "blurb": "A Good News Round, a cheer, and a turn for everyone to shine.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "Celebrate Something",
       "sub": "Big wins and small ones.",
       "say": "Families get a lot of practice noticing what went wrong. Today, let us practice noticing what went right. Big or small, it is worth a cheer."
      },
      {
       "k": "big",
       "h": "Small things count.",
       "sub": "A lost tooth, a hard test, a brave phone call.",
       "say": "You do not have to wait for a birthday or a trophy. A lost tooth counts. Finishing a hard test counts. Trying something new counts. A grown-up making a brave phone call counts too."
      },
      {
       "k": "points",
       "h": "Ways to celebrate",
       "items": [
        [
         "Good News Round",
         "One good thing each"
        ],
        [
         "A cheer",
         "Clap, stomp, or a big hooray"
        ],
        [
         "The Wall",
         "A post, or a tap on Proud of you"
        ],
        [
         "Kitchen Dance Party",
         "One song, everyone dances"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3,
         4
        ]
       },
       "say": "There are lots of ways to celebrate. A Good News Round, where each person shares one good thing. A cheer, as loud or as quiet as you like. In The Grove, you can post on The Wall, or tap Proud of you on someone’s post. Or a Kitchen Dance Party. Someone picks one song, and everyone dances."
      },
      {
       "k": "big",
       "h": "One good thing each. Then cheer!",
       "sub": "Something from today or this week.",
       "beats": [
        "Let us do a Good News Round right now.",
        "Go around once.",
        "Each person shares one good thing from this week.",
        "After each one, everybody cheers.",
        {
         "t": "Your turn.",
         "w": 12
        }
       ],
       "say": "Let us do a Good News Round right now. Go around once. Each person shares one good thing from this week. After each one, everybody cheers. Your turn."
      },
      {
       "k": "points",
       "h": "Celebrate the trying",
       "items": [
        [
         "Keeping at it",
         "You kept going"
        ],
        [
         "Courage",
         "You tried something new"
        ],
        [
         "Kindness",
         "You helped someone"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "Celebrate the trying, not only the winning. Cheer when someone keeps at it, even when it is hard. Cheer when someone has the courage to try something new. And cheer when someone is kind."
      },
      {
       "k": "big",
       "h": "Every person gets a turn to shine.",
       "sub": "Good News Round is in Together, under Fruit.",
       "say": "In a family, every person gets a turn to shine. The youngest, the oldest, and everyone in-between. You can find Good News Round in Together, under Fruit. When you do it, tap We did this today, and the grove grows."
      }
     ]
    },
    {
     "id": "gr-r-move",
     "n": 8,
     "title": "Move Together",
     "mins": 2,
     "blurb": "Stretch like a tree, a rag doll, and a star, and find more ways to move.",
     "scenes": [
      {
       "k": "title",
       "hero": "grove",
       "eyebrow": "Do This Together",
       "h": "Move Together",
       "sub": "Stretch, wiggle, and walk it out.",
       "say": "Moving our bodies together is good for everyone in the family. It wakes us up, shakes out the stress, and usually ends in a few laughs. Let us move."
      },
      {
       "k": "big",
       "h": "Every body moves in its own way.",
       "sub": "Standing, sitting, or from a chair. All of it counts.",
       "say": "Every body moves in its own way. You can stand, sit, or do this from a chair or a bed. Go at the pace of whoever needs it slowest. All of it counts."
      },
      {
       "k": "points",
       "h": "Stretch Together",
       "items": [
        [
         "Reach up tall",
         "Like a tree"
        ],
        [
         "Fold over slowly",
         "Like a rag doll"
        ],
        [
         "Stretch out wide",
         "Like a star"
        ],
        [
         "Three slow breaths",
         "Breathe in, and let it go"
        ]
       ],
       "cue": {
        "w": {
         "2": 8,
         "4": 8,
         "5": 8,
         "6": 10
        },
        "at": [
         2,
         3,
         5,
         6
        ]
       },
       "say": "Let us stretch together. Stand or sit tall. Reach up tall, like a tree. Fold over slowly, like a rag doll. Let your arms hang loose. Now stretch out wide, like a star. Finish with three slow breaths, all together."
      },
      {
       "k": "points",
       "h": "More ways to move",
       "items": [
        [
         "Family Walk",
         "The slowest walker sets the pace"
        ],
        [
         "Count along the way",
         "Dogs, red cars, birds"
        ],
        [
         "Kitchen Dance Party",
         "One song, everyone dances"
        ]
       ],
       "cue": {
        "at": [
         1,
         2,
         3
        ]
       },
       "say": "The Grove has more ways to move together. A Family Walk, for fifteen minutes, where the slowest walker sets the pace. Count things along the way, like dogs, red cars, or birds. Or a Kitchen Dance Party. Someone picks one song, and everyone dances, any way at all."
      },
      {
       "k": "big",
       "h": "Find them in Together, under Leaves.",
       "sub": "Tap We did this today, and the grove grows.",
       "say": "You can find all of these in Together, under Leaves. When you do one, tap We did this today. It shows on The Wall, and the grove grows."
      },
      {
       "k": "big",
       "h": "A little movement, together, goes a long way.",
       "say": "A little movement, done together, goes a long way. Come back and move anytime."
      }
     ]
    }
   ]
  }
 ]
}
};
