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
   Wording rules: no em dashes or en dashes, positive frames, Title Case for names of things.
   ===================================================================== */
window.GG_LEARN = {
  maple: {
    title: 'Learn Maple',
    intro: 'Short lessons to watch together, narrated aloud. Kids and grown-ups can watch side by side.',
    tracks: [
      { id: 'maple-start', title: 'Start Here', who: 'For kids and the grown-ups who help them', lessons: [
        { id: 'mp-welcome', n: 1, title: 'Welcome to Maple', mins: 2, scenes: [
          { k: 'title', hero: 'maple', eyebrow: 'Maple', h: 'Welcome to Maple', sub: 'Bright leaves, strong roots.', say: 'Welcome to Maple! Maple helps kids notice how they are growing, and helps the grown-ups who love them.' },
          { k: 'big', h: 'Every kid is growing like a tree.', sub: 'Six parts make a kid whole.', say: 'Every kid is growing like a tree. And a whole tree needs all six of its parts.' },
          { k: 'six', h: 'The six parts of your tree', words: ['Feeling safe, loved, and calm inside', 'What you love to do', 'Your feelings, and calming down', 'Friends and family', 'Moving, resting, eating well', 'Looking forward to good things'], say: 'Here are the six parts. Roots, what grounds you. Trunk, your purpose. Bark, your mind and feelings. Branches, the people in your life. Leaves, your body. And Fruit, your hope.' },
          { k: 'screen', app: 'maple', app_name: 'Maple', title: 'Check-in', rows: [['Roots', 'Sunny', '#C07A26'], ['Trunk', 'Sunny', '#C07A26'], ['Bark', 'Partly cloudy', '#7D6B57'], ['Branches', 'Sunny', '#C07A26'], ['Leaves', 'Rainy', '#3D5A73'], ['Fruit', 'Sunny', '#C07A26']], tap: 4, panel: { h: 'Rainy days add rings too.', sub: 'Weather comes and goes.', items: ['Pick a practice for Leaves', 'Try it today', 'Watch your tree grow'] }, say: 'In a check-in, you answer a few questions for each part. Then each part gets its weather. Sunny, partly cloudy, or rainy. Rainy days are okay. Weather comes and goes.' },
          { k: 'flow', h: 'How Maple works', steps: [['Check in', 'A few questions for each part'], ['See the weather', 'Sunny, cloudy, or rainy'], ['Practice a little', 'One small thing each day'], ['Watch it grow', 'Rings, leaves, and critters']], say: 'Here is how Maple works. Check in. See the weather. Practice a little each day. And watch your tree grow, with new rings, new leaves, and critters who come to visit.' },
          { k: 'points', h: 'For grown-ups', items: [['Grown-up Guide', 'Tips for every question, in the Grown-up Guide tab'], ['When Life Changes', 'Guides for hard talks, from a pet dying to scary news'], ['Private by design', 'No account. Answers stay on this device.']], say: 'For grown-ups: the Grown-up Guide has a tip for every question. When Life Changes has guides for hard talks. And everything stays private, right on this device.' },
          { k: 'quiz', q: 'What does Maple help kids notice?', opts: ['How fast they can run', 'The six parts that make them whole', 'Their spelling scores'], right: 1, why: 'Maple helps kids notice and tend all six parts of their tree.', say: 'Quick question. What does Maple help kids notice?' }
        ] }
      ] }
    ]
  },
  aspen: {
    title: 'Learn Aspen',
    intro: 'Short lessons, narrated aloud. Watch on your own or with a grown-up, in any order.',
    tracks: [
      { id: 'aspen-start', title: 'Start Here', who: 'For students in grades 6 to 8, and their grown-ups', lessons: [
        { id: 'as-welcome', n: 1, title: 'Welcome to Aspen', mins: 2, scenes: [
          { k: 'title', hero: 'aspen', eyebrow: 'Aspen', h: 'Welcome to Aspen', sub: 'Rooted together.', say: 'Welcome to Aspen. Aspen is your tree for grades six to eight.' },
          { k: 'big', h: 'Every middle schooler is like an aspen: growing fast and putting down roots.', say: 'Every middle schooler is like an aspen: growing fast and putting down roots.' },
          { k: 'six', h: 'Six parts make you whole', words: ['What keeps you steady', 'Goals and trying new things', 'Naming feelings, asking for help', 'Friends, family, belonging', 'Sleep, movement, real meals', "Hope for what's ahead"], say: 'Your tree has six parts. Roots, Trunk, Bark, Branches, Leaves, and Fruit. Being whole means noticing all six.' },
          { k: 'levels', say: 'After a check-in, each part shows a level. Strong. Steady. Or Growing Edge. A Growing Edge is a part to tend, not a grade.' },
          { k: 'flow', h: 'How Aspen works', steps: [['Check in', 'Questions written for your grade'], ['See your levels', 'Tap Why for any question'], ['Tend each day', 'Practices fitted to you'], ['Grow your tree', 'A ring and leaves each check-in']], say: 'Here is how it works. Check in with questions written for your grade. See your levels. Tend a little each day, right in Aspen. And every check-in adds a growth ring and leaves to your tree.' },
          { k: 'points', h: 'Yours to keep', items: [['Private by design', 'No account. Answers stay on this device.'], ['The Grove', 'Your tree can stand with your family, and you choose what shows'], ['When Life Changes', 'Guides for the hard stuff, any time']], say: 'Aspen is yours. Your answers stay on this device. Your tree can stand in The Grove with your family, and you choose what shows. And When Life Changes has guides for the hard stuff, any time.' },
          { k: 'quiz', q: 'What does a Growing Edge mean?', opts: ['You failed that part', 'A part to tend, not a grade', 'You need to start over'], right: 1, why: 'A Growing Edge is simply the part that needs some care right now.', say: 'Quick question. What does a Growing Edge mean?' }
        ] }
      ] }
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
          { k: 'story', title: 'A Presence That Cannot Be Boxed', lines: ['The nurse warned me: not religious. The family sat with their arms crossed, ready to get through my visit politely.', 'Then the wife leaned forward. We are not religious, she said. But we are deeply spiritual. We believe in a presence that cannot be boxed or labeled or fully described.', 'We kept what felt true from each tradition and let the rest go. It is not neat or tidy. But it is ours.'], lesson: 'Roots don’t have to fit a box to hold you up.', note: 'From a Grounded story by Chris Joy', say: 'Chris tells about a visit where the nurse warned him, not religious. The family sat with their arms crossed. Then the wife leaned forward and said, we are not religious, but we are deeply spiritual. We believe in a presence that cannot be boxed, or labeled, or fully described. We kept what felt true from each tradition, and let the rest go. It is not neat or tidy. But it is ours. Chris told her she had just explained God better than most sermons he had ever heard. And the whole room laughed.' },
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
          { k: 'story', title: 'Finding a New Purpose', lines: ['Sophia was twenty-eight, studying to be a physical trainer, when a rare bone disease changed everything. Everything I worked for is disappearing, she said.', 'I asked her: Even if your body changes, what part of you, the real you, can still strengthen others?', 'I can’t train people to run marathons anymore, she told me later. But maybe I can help them run their own race.'], lesson: 'Roles can change. Your gifts come with you.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about Sophia. She was twenty eight, building a life as a physical trainer, when a rare bone disease changed everything. She was afraid she would become someone people had to take care of, instead of someone who lifts others up. Chris did not rush in with answers. He stayed and listened. Then, gently, he asked, even if your body changes, what part of you, the real you, can still strengthen others? Sophia had always been an encourager. That gift had not gone anywhere. Months later she said, I cannot train people to run marathons anymore. But maybe I can help them run their own race.' },
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
          { k: 'story', title: 'Emotional Resilience', lines: ['I sat beside a patient whose sudden turn left the room heavy with uncertainty. For a moment, I felt my own steadiness waver.', 'I placed my hand lightly on the patient’s, breathed slowly, and reminded myself: this moment is sacred, and so is my capacity to stay rooted.', 'Resilience is not the absence of sorrow. It is bending without breaking, letting the waves move through us instead of pulling us under.'], lesson: 'Let the feeling move through you.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about sitting beside a patient whose sudden turn left the room heavy with fear. For a moment, he felt his own steadiness waver. So he placed his hand lightly on the patient’s hand, and breathed slowly. He did not push the feeling away. He made room for it. Resilience, he says, is not the absence of sorrow. It is bending without breaking. Letting the waves move through us, instead of pulling us under.' },
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
          { k: 'story', title: 'The Recovery', lines: ['I broke a dying woman’s saucer. Antique china. She had just shown it to me, the one good thing in her hard day.', 'I dropped to my knees and said how sorry I was. Instead of anger, I got grace. Someone broke a special one on me once, she said. Didn’t even say sorry. At least you did.', 'That night I glued what I could, and found a nearly identical saucer. Not the mistake. The recovery.'], lesson: 'What happens after a break matters most.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/the-recovery', label: 'Read the Full Story: The Recovery' }, say: 'Chris tells about Gail, who lives in memory care, and keeps her whole life in a china cabinet. One day she proudly showed him a new cup and saucer. He picked it up, and the saucer slipped and shattered on the floor. He dropped to his knees and told her how sorry he was. And instead of anger, she gave him grace. Someone broke a special one on me once, she said. Did not even say sorry. At least you did. They ended up laughing together. That night he glued what he could, and found a nearly identical saucer to bring back, with flowers. What stays, he says, is not the mistake. It is the recovery.' },
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
          { k: 'story', title: 'A Lion-Sized Reset', lines: ['My alarm didn’t go off, the dog got into the trash, and I walked out the door with two different shoes on.', 'A detour added twenty minutes. By the time I pulled up to my first visit, my head was spinning.', 'So I parked a little early, rolled down the window, and roared. Three times. By the third one, I was laughing at myself, and I was ready.'], lesson: 'Your body can reset your mind.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a morning that went wrong from the start. No alarm, the dog in the trash, two different shoes, and a twenty minute detour. By his first visit, his head was spinning. So he parked, rolled down the window, and did a lion’s breath. A deep breath in, then mouth wide, tongue out, and a long, loud haaa. Three times. His jaw loosened, his shoulders dropped, and he started laughing at himself. His body reset his mind.' },
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
          { k: 'story', title: 'A Day of Contrasts', lines: ['At the end of a muddy dirt road, a woman who had lived on her farm for nearly eighty years set out orange juice and a plate of cookies.', 'She pointed out the window. Can you see that right there? A little woodpecker on the tree.', 'That’s the reason I’m here, she said. That’s all I need to be happy. I’m simple. It doesn’t take much.'], lesson: 'Hope often starts with noticing what is already good.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a visit at the end of a muddy dirt road, with a woman who had lived on her farm for almost eighty years and raised nine children there. Over orange juice and cookies, she pointed out the window. Can you see that right there? A little woodpecker, on the tree. That is the reason I am here, she said. That is all I need to be happy. I am simple. It does not take much. Chris left with his heart full.' },
          { k: 'points', h: 'Practice: One Woodpecker', items: [['Look around', 'Find one small good thing, right now'], ['Say it', 'Out loud, or write it down'], ['Look ahead', 'Name one small thing to look forward to']], cue: { w: { 1: 15, 2: 10, 3: 12 }, at: [1, 2, 3] }, say: 'Let us practice. This one is called One Woodpecker. Look around and find one small good thing, right now. Say it out loud, or write it down. Then name one small thing to look forward to, today or this week.' },
          { k: 'big', h: 'Losing hope? You don’t have to hold it alone.', sub: 'Call or text 988, any time. In danger right now? Call 911.', say: 'If it is hard to see anything good ahead, you do not have to hold that alone. Call or text nine eight eight, any time. If you are in danger right now, call nine one one.' },
          { k: 'big', h: 'Tend the whole tree, and fruit will come.', sub: 'One Woodpecker is in the Practice Library.', say: 'Tend the whole tree, a little at a time, and fruit will come. One Woodpecker is in the Practice Library. That is all six parts. Well done.' },
          { k: 'quiz', q: 'Where does hope often start?', opts: ['With a big change', 'With noticing one small good thing', 'With having no problems'], right: 1, why: 'Hope often starts with noticing what is already good.', say: 'Last question. Where does hope often start?' }
        ] }
      ] },
      { id: 'oak-shelter', title: 'Shelter for Others', who: 'For parents, partners, friends, and caregivers', certTitle: 'Oak: Shelter for Others', lessons: [

        { id: 'ok-s-present', n: 1, title: 'Being There Is the Gift', mins: 5, blurb: 'Presence matters more than the perfect words.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 1', h: 'Being There Is the Gift', sub: 'Shelter for others. Strength for you.', say: 'This series is for anyone walking with someone through a hard time. A parent, a partner, a friend, a coworker, a caregiver. Let us start with the most important thing.' },
          { k: 'big', h: 'Hospice taught me this: hold space.', sub: 'Being there matters more than the perfect words.', say: 'When Chris thinks about what years of hospice work have taught him, it often comes down to two words. Hold space. Your being there matters more than finding the perfect words.' },
          { k: 'points', h: 'Holding space looks like', items: [['Showing up', 'In person, by phone, or by text'], ['Listening more than fixing', 'Let them finish'], ['Letting silence be', 'Quiet together is still company'], ['Following their lead', 'Their topic, their pace']], say: 'Holding space looks like showing up, in person, by phone, or even by text. Listening more than fixing. Let them finish. Letting silence be. Quiet together is still company. And following their lead, on their topic, at their pace.' },
          { k: 'story', title: 'You Don’t Have to Know What to Say', lines: ['A husband sat beside his wife in her final hours, his chair so close his knee touched the bed rail.', 'As he talked, he reached over and smoothed her blanket. It had not slipped.', 'He kept holding her hand, like it was the only job left for him to do.'], lesson: 'Small, steady presence says what words can’t.', note: 'From a Grounded story by Chris Joy', say: 'Chris tells about a husband who sat beside his wife in her last hours, his chair so close his knee touched the bed rail. As he talked, he reached over and smoothed her blanket. It had not slipped. He just kept holding her hand, like it was the only job left for him to do. Small, steady presence says what words cannot.' },
          { k: 'points', h: 'Small things that say I am here', items: [['A text with no question', 'Thinking of you today. No need to reply.'], ['A specific offer', 'Can I bring dinner Thursday?'], ['Coming back', 'The second week matters as much as the first']], say: 'Small things say, I am here. A text with no question to answer. Thinking of you today, no need to reply. A specific offer, like, can I bring dinner Thursday? And coming back. The second week, and the second month, matter as much as the first day.' },
          { k: 'big', h: 'You are not there to fix it. You are there so they are not alone in it.', say: 'You are not there to fix it. You are there so they are not alone in it.' },
          { k: 'points', h: 'Practice: Sit, Don’t Fix', items: [['Pick one person', 'Someone going through something'], ['Reach out once this week', 'Ask how they are, really'], ['Listen to the end', 'Then say: Thank you for telling me.']], cue: { w: { 1: 12, 3: 6 }, at: [1, 2, 3] }, say: 'Let us practice. Think of one person going through something right now. Take a moment. This week, reach out once, and ask how they are, really. Then listen all the way to the end, without fixing. And say, thank you for telling me.' },
          { k: 'quiz', q: 'What matters most when someone is going through something hard?', opts: ['Finding the perfect words', 'Being there, so they are not alone in it', 'Fixing the problem fast'], right: 1, why: 'Presence is the gift. Words are optional.', say: 'Quick question. What matters most when someone is going through something hard?' }
        ] },

        { id: 'ok-s-listen', n: 2, title: 'Listening Beneath the Words', mins: 5, blurb: 'Hearing what someone means, not just what they say.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 2', h: 'Listening Beneath the Words', sub: 'Hear what they mean.', say: 'People often say one thing, and carry another. This lesson is about listening beneath the words.' },
          { k: 'story', title: 'Emotional Intelligence', lines: ['In a family meeting, a daughter’s words said one thing while her eyes and her tightly folded arms said another.', 'Instead of rushing to fill the space with comfort, I slowed down, met her gaze, and asked softly: What is this moment asking of you right now?', 'The room shifted. Tears came. Real connection followed.'], lesson: 'Our greatest gift is how deeply we are willing to see.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a family meeting where a daughter’s words said one thing, while her eyes and her tightly folded arms said another. Instead of rushing to fill the space with comfort, he slowed down, met her eyes, and asked softly, what is this moment asking of you right now? The room shifted. Tears came. Real connection followed.' },
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
          { k: 'story', title: 'A Day of Contrasts', lines: ['The family had turned the chaplain away before. The house was tense, and the wife snapped at my small talk.', 'Then she told me she lost her first husband at thirty-seven and raised four boys alone. My eyes filled. I have four boys, I said. I can imagine.', 'Guards dropped. A muffin was pressed into my hand. When I left, the man who refused my hand held it and said, Thank you for coming.'], lesson: 'A moment of honest heart can open a closed room.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a family who had turned the chaplain away before. The house was tense, and his small talk fell flat. Then the wife told him she had lost her first husband at thirty seven, and raised four boys alone. His eyes filled with tears. I have four boys, he said. I can imagine. Guards dropped. A muffin was pressed into his hand. When he left, the man who had refused his hand at the start held it, and said, thank you for coming. A moment of honest heart opened the room.' },
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
          { k: 'story', title: 'The Beautiful Hodgepodge', lines: ['On the shelf: a crucifix, a bundle of sage, a Lutheran church directory, and a beaded medicine wheel catching the light.', 'We are a hodgepodge, the daughter laughed. Catholic on Mom’s side, Native on Dad’s side, and now half of us go to the Lutheran church because the pastor showed up with coffee.', 'We just want to love her well, she said. That is really all we are trying to do.'], lesson: 'What matters is the hand you reach for.', note: 'From a Grounded story by Chris Joy', say: 'Chris tells about a family he calls the beautiful hodgepodge. On one shelf, a crucifix, a bundle of sage, a Lutheran church directory, and a beaded medicine wheel, all catching the same afternoon light. We are a hodgepodge, the daughter laughed. Catholic on mom’s side, Native on dad’s side, and half of us go to the Lutheran church now, because the pastor showed up with coffee when nobody else did. Then she looked at her mother and said, we just want to love her well. That is really all we are trying to do.' },
          { k: 'big', h: 'Not the label. The hand you reach for.', say: 'The families who love each other best are not always the ones who have everything figured out. Sometimes it is the ones who have argued and wandered and stayed anyway. Not the label. The hand you reach for.' },
          { k: 'flow', h: 'When views clash', steps: [['Name it', 'Inside: we see this differently'], ['Refocus', 'On the person, not the topic'], ['Find common ground', 'What do we both love?'], ['Care for yourself', 'Afterward, let it go']], say: 'When views clash, try four steps. Name it, quietly inside. We see this differently, and that is okay. Refocus on the person, not the topic. Find common ground. What do we both love? And care for yourself afterward, so you can let it go.' },
          { k: 'words', h: 'Words that keep the door open', items: ['I see it differently, and I love you.', 'Help me understand what this means to you.', 'Can we set this one down for today?'], say: 'Here are words that keep the door open. I see it differently, and I love you. Help me understand what this means to you. And, can we set this one down for today?' },
          { k: 'points', h: 'Practice: Common Ground', items: [['Picture someone who sees life differently', 'Family, neighbor, coworker'], ['Name one thing you share', 'A love, a hope, a memory'], ['Lead with it next time', 'Start there']], cue: { w: { 1: 10, 2: 12 }, at: [1, 2, 3] }, say: 'Let us practice. Picture someone who sees life differently than you do. Now name one thing you share. A love, a hope, or a memory. Next time you are together, start there.' },
          { k: 'quiz', q: 'When views clash, where should your focus go?', opts: ['Winning the argument', 'The person, not the topic', 'Avoiding them'], right: 1, why: 'Every person deserves compassionate presence, whatever their views.', say: 'Quick question. When views clash, where should your focus go?' }
        ] },

        { id: 'ok-s-gates', n: 6, title: 'Caring for Yourself While You Care', mins: 6, blurb: 'Boundaries with gates, and refilling your own cup.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Shelter for Others, Lesson 6', h: 'Caring for Yourself While You Care', sub: 'Shelter for others. Strength for you.', say: 'This last lesson is about you. To be a shelter for others, you need strength of your own.' },
          { k: 'story', title: 'My Boundaries Have Gates', lines: ['He had endured a brutally hard life with almost no one in his corner. You promise you’ll come back? he asked. I never make promises in this work. I said yes anyway.', 'I picture my boundary as a white picket fence around my own home, with a gate in it.', 'Sometimes I choose to open that gate and let someone in. They stay with me longer. And that is not a bad thing. It just asks more of me.'], lesson: 'Boundaries can have gates. You choose when to open them.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/my-boundaries-have-gates', label: 'Read the Full Story: My Boundaries Have Gates' }, say: 'Chris tells about a man who had lived a brutally hard life, with almost no one in his corner. He asked Chris, you promise you will come back? Chris never makes promises in this work, and he said yes anyway. He pictures his boundaries as a white picket fence around his own home, with a gate in it. Sometimes he chooses to open that gate and let someone in. They stay with him longer, almost like friends. That is not a bad thing. It just asks more of him.' },
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
          { k: 'story', title: 'Grounded in Coffee', lines: ['On the way to a visit, a reckless driver cut me off. My coffee flew across the seat, and my whole body shook.', 'I had a few minutes before I needed to walk into a family’s home calm. So I pulled over by a quiet field and named what my senses could find.', 'Four out of five senses came back coffee. I laughed out loud, and I was ready.'], lesson: 'Your senses can bring you home to this moment.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grounded-in-coffee', label: 'Read the Full Story: Grounded in Coffee' }, say: 'Chris, the chaplain behind Grow With Grounded, tells about a morning when a reckless driver cut him off and sent his coffee flying. He had only a few minutes before he needed to walk into a family’s home calm. So he pulled over and named what his senses could find. Four out of five came back coffee. He laughed, and he was ready.' },
          { k: 'points', h: 'Five, four, three, two, one', items: [['5 things you can see', 'Look slowly around you'], ['4 things you can feel', 'Your feet, the chair, your clothes, the air'], ['3 things you can hear', 'Near and far'], ['2 things you can smell', 'Or two smells you like'], ['1 thing you can taste', 'Or one sip of water']], cue: { w: { 1: 10, 4: 8, 5: 7, 6: 6, 7: 6 }, at: [1, 2, 5, 6, 7] }, say: 'Let us do it together. Name five things you can see. Now four things you can feel. Your feet on the floor. Whatever is holding you up. Three things you can hear. Two things you can smell. And one thing you can taste.' },
          { k: 'breathe', h: 'One slow breath to finish', hold: 12, cue: { p: { 1: 3, 2: 4 } }, say: 'Now one slow breath. In for four. And out for six.' },
          { k: 'big', h: 'You are here. That is enough for right now.', cue: { p: { 0: 1.5 } }, say: 'You are here, in this moment. That is enough for right now. Come back to this whenever you need it.' }
        ] },

        { id: 'ok-r-lion', n: 2, title: 'A Lion-Sized Reset', mins: 3, blurb: 'A loud, silly breath that shakes off a rough start.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'A Lion-Sized Reset', sub: 'When the day knocks you off center.', say: 'Some days knock you off center before they have even started. Here is a fast way to reset. It looks a little silly, and it works.' },
          { k: 'story', title: 'A Lion-Sized Reset', lines: ['My alarm didn’t go off, the dog got into the trash, and I walked out the door with two different shoes on.', 'A detour added twenty minutes. By the time I pulled up to my first visit, my head was spinning.', 'So I parked a little early, rolled down the window, and roared. Three times. By the third one, I was laughing at myself, and I was ready.'], lesson: 'You can pause and reset, even on the messy mornings.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a morning when his alarm did not go off, the dog got into the trash, and he walked out the door in two different shoes. A detour added twenty minutes. By the time he reached his first visit, his head was spinning. So he parked, rolled down the window, and did three lion’s breaths. By the third one, he was laughing at himself. And he walked in steady.' },
          { k: 'points', h: 'Lion’s Breath', items: [['Breathe in through your nose', 'Deep and slow'], ['Open your mouth wide', 'Stick your tongue out, all the way'], ['Breathe out with a long haaa', 'Add a little roar, if you like']], cue: { at: [2, 3, 4] }, say: 'Here is how. First, sit tall. Breathe in deep through your nose. Then open your mouth wide and stick your tongue out as far as it goes. And breathe out with a long, loud haaa. You can even add a little roar.' },
          { k: 'big', h: 'Let us do three together.', sub: 'In through your nose. Then mouth open, tongue out, haaa.', cue: { w: { 1: 6, 2: 6, 3: 6 } }, say: 'Let us do three together. Breathe in, then let it out. One more. And the last one, as big as you like.' },
          { k: 'points', h: 'Notice what changed', items: [['Your jaw', 'Looser?'], ['Your shoulders', 'Lower?'], ['Your mind', 'A little quieter?']], cue: { p: { 1: 1.5, 2: 1.5, 3: 1.5 } }, say: 'Now notice. Is your jaw looser? Are your shoulders lower? Is your mind a little quieter? Maybe you even smiled.' },
          { k: 'big', h: 'It is okay to take a second to roar.', say: 'One wrong start does not have to set the tone for the whole day. It is okay to take a second to roar.' }
        ] },

        { id: 'ok-r-box', n: 3, title: 'When Anxiety Spikes', mins: 3, blurb: 'Box breathing: four counts in, hold, out, hold.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'When Anxiety Spikes', sub: 'Breathing in a box.', say: 'When worry comes on fast, your breath can slow it down. This one is called box breathing. You can do it anywhere, and no one has to know.' },
          { k: 'story', title: 'The Quiet Power of Teamwork', lines: ['I was racing to meet a new patient and realized I had nothing but a name and an address. A wave of panic hit me.', 'I pulled onto a quiet street and found the notes my teammates had left. Then, still a little shaky, I did a few rounds of box breathing.', 'My shoulders dropped. My mind cleared. I went in with presence instead of pressure.'], lesson: 'A small pause can turn pressure into presence.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about racing to meet a new family with nothing but a name and an address. A wave of panic hit. He pulled over, found the notes his teammates had left, and then did a few rounds of box breathing. His shoulders dropped. His mind cleared. And he walked in with presence instead of pressure.' },
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
          { k: 'story', title: 'Grief Debt', lines: ['One week I caught myself walking around numb. Not sad, not angry. Just numb.', 'A few losses had stacked up quietly, and I kept telling myself I would feel them later.', 'Grief we put off piles up, like laundry we swear we will fold.'], lesson: 'Paying grief down a little at a time keeps it from piling up.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grief-debt', label: 'Read the Full Story: Grief Debt' }, say: 'Chris tells about a week he caught himself walking around numb. A few losses had stacked up quietly, while he told himself he would feel them later. Grief we put off piles up, like laundry we swear we will fold. A wave like this one is a chance to pay a little of it down.' },
          { k: 'flow', h: 'Pay it down', steps: [['Notice it', 'Something is here'], ['Name it', 'Who or what you miss'], ['Express it', 'Cry, say it, write it'], ['Unpack it', 'Walk, stretch, breathe']], cue: { w: { 1: 5, 3: 10, 5: 15, 7: 8 }, at: [0, 2, 4, 6] }, say: 'Notice it. Something is here. Name it. Who, or what, do you miss right now? Express it. Let the tears come, say their name out loud, or write a line to them. Then unpack it with your body. Stretch, walk, or take a slow breath.' },
          { k: 'big', h: 'Grief is love with nowhere to go.', sub: 'The wave will pass. The love stays.', say: 'Grief is love with nowhere to go. The wave will pass. The love stays.' },
          { k: 'big', h: 'You don’t have to carry it alone.', sub: 'When Life Changes has guides for many kinds of loss. Need to talk now? Call or text 988.', say: 'You do not have to carry it alone. When Life Changes in Oak has guides for many kinds of loss. And if you need to talk with someone right now, call or text nine eight eight.' }
        ] },

        { id: 'ok-r-talk', n: 8, title: 'Before a Hard Conversation', mins: 3, blurb: 'Steady yourself, and walk in ready to listen.', scenes: [
          { k: 'title', hero: 'oak', eyebrow: 'Support for Right Now', h: 'Before a Hard Conversation', sub: 'A few minutes to get steady.', say: 'If you are about to walk into a hard conversation, take a few minutes with me first.' },
          { k: 'breathe', h: 'One slow minute', hold: 30, say: 'First, steady your body. Follow the circle. In for four, and out for six.' },
          { k: 'points', h: 'Get clear', items: [['One sentence', 'What do I most want them to know?'], ['One hope', 'What would a good outcome look like?'], ['One question', 'What do I want to understand about them?']], cue: { w: { 2: 12, 3: 12, 4: 12 }, at: [1, 3, 4] }, say: 'Now get clear. What is the one thing you most want them to know? Say it to yourself in one sentence. What would a good outcome look like? And what do you want to understand about them?' },
          { k: 'story', title: 'Listening Beneath the Words', lines: ['In a family meeting, a daughter’s words said one thing while her eyes and her tightly folded arms said another.', 'Instead of rushing to fill the space, I slowed down, met her gaze, and asked softly: What is this moment asking of you right now?', 'The room shifted. Tears came. Real connection followed.'], lesson: 'Slow down and listen beneath the words.', note: 'From a Grounded reflection by Chris Joy', say: 'Chris tells about a family meeting where a daughter’s words said one thing, and her folded arms said another. Instead of rushing to fill the space, he slowed down and asked softly, what is this moment asking of you right now? The room shifted. Real connection followed.' },
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
          { k: 'story', title: 'Grounded in Coffee', lines: ['On the way to a visit, a reckless driver cut me off. My coffee flew across the seat, and my whole body shook.', 'I had a few minutes before I needed to walk into a family\u2019s home calm. So I pulled over by a quiet field and named what my senses could find.', 'Four out of five senses came back coffee. I laughed out loud, and I was ready.'], lesson: 'Your senses can bring you home to this moment.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/grounded-in-coffee', label: 'Read the Full Story: Grounded in Coffee' }, say: "Chris, the chaplain behind Grow With Grounded, tells about a morning when a reckless driver cut him off and sent his coffee flying. He had only a few minutes before he needed to walk into a family's home calm. So he pulled over and named what his senses could find. Four out of five came back coffee. He laughed, and he was ready." },
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
          { k: 'story', title: 'Drift Away', lines: ['Suzan had not spoken or opened her eyes in three days.', 'Then her family played a song she loved. Under the sheet, her toes began to move to the beat. She lifted her chin and smiled wider than I had ever seen a dying person smile.', 'She never woke again. She drifted away peacefully a short time later.'], lesson: 'Music can reach a person when words cannot.', note: 'From a Grounded story by Chris Joy', link: { href: 'https://chri5j0y.substack.com/p/drift-away', label: 'Read the Full Story: Drift Away' }, say: "Chris tells about Suzan, who had not spoken in three days. Then a song she loved came on, and under the sheet, her toes began to move to the beat. She lifted her chin and smiled. She drifted away peacefully a short time later. Music can reach a person when words cannot." },
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
        {"id": "wl-s-hand", "n": 11, "title": "A Hand on Theirs", "mins": 4, "blurb": "A quiet minute of presence at the bedside.", "scenes": [{"k": "title", "hero": "willow", "eyebrow": "Support for Right Now", "h": "A Hand on Theirs", "sub": "A quiet minute of presence.", "say": "When you don't know what to do at the bedside, this is for you. Sometimes being there is the whole job."}, {"k": "story", "title": "The Blanket That Didn't Need Smoothing", "lines": ["A husband sat beside his wife in her final hours, his chair so close his knee touched the bed rail.", "He told me about their life together. As he talked, he reached over and smoothed her blanket. It had not slipped.", "He kept holding her hand, like it was the only job left for him to do."], "lesson": "Sometimes love just needs somewhere to put its hands.", "note": "Names and details changed", "say": "A husband once sat beside his wife in her final hours, his chair so close his knee touched the bed rail. As he talked about their life, he reached over and smoothed her blanket. It had not slipped. Sometimes love just needs somewhere to put its hands."}, {"k": "big", "h": "Rest your hand on theirs.", "say": "If you are beside them, rest your hand on theirs. If you are not, picture it. Notice the warmth, or the coolness, or the stillness.", "beats": ["If you are beside them, rest your hand on theirs.", "If you are not, picture it.", {"t": "Notice the warmth, or the coolness, or the stillness.", "w": 12}]}, {"k": "breathe", "h": "Breathe slowly beside them", "sub": "A calm body in the room helps everyone.", "say": "Now breathe slowly beside them. In for four. And out for six. If their breathing is hard, your slow, steady breath can be a quiet comfort in the room.", "hold": 30}, {"k": "big", "h": "Notice one good thing.", "say": "One more moment. Notice one good thing in this room. A face, a sound, a memory, the light.", "beats": ["One more moment.", "Notice one good thing in this room.", {"t": "A face, a sound, a memory, the light.", "w": 10}]}, {"k": "big", "h": "Being there is enough.", "say": "Being there is enough. If anything about their comfort worries you, call your hospice nurse, day or night."}]}
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
  grove: {
    title: 'Learn The Grove',
    intro: 'Short lessons, narrated aloud, for the whole family to watch together.',
    tracks: [
      { id: 'grove-start', title: 'Start Here', who: 'For families growing side by side', lessons: [
        { id: 'gr-welcome', n: 1, title: 'Welcome to The Grove', mins: 2, scenes: [
          { k: 'title', hero: 'grove', eyebrow: 'The Grove', h: 'Welcome to The Grove', sub: 'Where our trees grow together.', say: 'Welcome to The Grove, where our trees grow together.' },
          { k: 'big', h: 'Your tree is yours. The grove is ours.', say: 'Your tree is yours. The grove is ours.' },
          { k: 'trees', h: 'A tree for every age', grove: true, say: 'Everyone in the family has their own tree, in their own app. Maple for kids, Aspen for middle schoolers, Oak for adults, and more on the way.' },
          { k: 'flow', h: 'How The Grove works', steps: [['Tend your own tree', 'In your own app'], ['Show your growth', 'Switch it on in your app'], ['Grow together', 'Side by side in The Grove']], say: 'Here is how it works. Everyone tends their own tree in their own app. Each app has a switch to show your growth on The Grove. Then your trees stand side by side here.' },
          { k: 'points', h: 'In The Grove', items: [['The Wall', 'Cheer each other on with posts and reactions'], ['Together', 'Practices to do as a family'], ['Visitors', 'They arrive as the days add up'], ['Grown-ups keep it kind', 'A grown-up can remove any post']], say: 'In The Grove, the family wall lets you cheer each other on. Together has practices to do as a family. Visitors arrive as the days add up. And a grown-up can remove any post, to keep it kind.' },
          { k: 'quiz', q: 'Where does each person do their daily tending?', opts: ['In their own tree app', 'Only in The Grove', 'On paper'], right: 0, why: 'Daily tending happens in each person\u2019s own tree app. The Grove is where the trees stand together.', say: 'Quick question. Where does each person do their daily tending?' }
        ] }
      ] }
    ]
  }
};
