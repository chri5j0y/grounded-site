/* =====================================================================
   GROW WITH GROUNDED LEARN: lessons for the tree apps (shared/learn-lessons.js)
   Read by the Learn tab in Maple, Aspen, Oak, Willow, and The Grove (shared/gg-learn.js).
   Each app has tracks (series), each track has lessons, each lesson has scenes. Scene kinds and
   fields are listed at the top of gg-learn.js. A series of three or more lessons earns a
   Certificate of Completion when every lesson is finished (cert: false turns that off, cert: true
   turns it on for a shorter series). certTitle and certLine set the words on the certificate.
   Series grow deeper with the age and stage: short and simple in Maple, deepest in Willow.
   Started with one Start Here lesson per app (Learn build, October 2026); the full series plug in here.
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
    intro: 'Short animated lessons, narrated aloud. Watch them in any order, as often as you like.',
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
      ] }
    ]
  },
  willow: {
    title: 'Learn Willow',
    intro: 'Short, gentle lessons, narrated aloud. Watch them alone or together, whenever there is time.',
    tracks: [
      { id: 'willow-start', title: 'Start Here', who: 'For the person in hospice, and the people who love them', lessons: [
        { id: 'wl-welcome', n: 1, title: 'Welcome to Willow', mins: 2, scenes: [
          { k: 'title', hero: 'willow', eyebrow: 'Willow', h: 'Welcome to Willow', sub: 'Held gently, all the way home.', say: 'Welcome to Willow. A tree for the last part of the path.' },
          { k: 'big', h: 'Built for two.', sub: 'The person in hospice, and the people who love them.', say: 'Willow is built for two. The person in hospice, and the people who love them.' },
          { k: 'six', h: 'Every part still matters', words: ['Faith, tradition, and peace', 'Meaning, legacy, a life story', 'Feelings, fears, and calm', 'The people who love them', 'Comfort, rest, and ease', 'Hope that changes shape'], say: 'At the end of life, every part of a person still matters. Faith and peace. Meaning and legacy. Feelings and calm. The people they love. Comfort in the body. And hope, which changes shape along the way.' },
          { k: 'points', h: 'Faith comes first', items: [['Asked with care', 'Willow asks about faith or tradition first'], ['Every tradition', 'All faith traditions and everything in-between'], ['Faith cards', 'Words and practices for 29 traditions']], say: 'Willow asks about faith or tradition first, with care. It is made for all faith traditions and everything in-between, with faith cards for twenty nine traditions.' },
          { k: 'points', h: 'What you will find', items: [['What Matters', 'A page for what matters most'], ['Cuttings', 'Stories and letters to leave behind'], ['Bedside', 'A log of what helped today'], ['Helpers', 'Their own passcode, and only what is shared']], say: 'You will find a page for what matters most. Cuttings, for the stories and letters they want to leave. A log of what helped today. And helpers open Willow with their own passcode, seeing only what the person chooses to share.' },
          { k: 'quiz', q: 'Who is Willow built for?', opts: ['Only the hospice team', 'The person in hospice, and the people who love them', 'Only the family'], right: 1, why: 'Willow is built for two: the person, and the people who love them.', say: 'One question. Who is Willow built for?' }
        ] }
      ] }
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
