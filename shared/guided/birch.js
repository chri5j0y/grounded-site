/* Grow With Grounded: Guided Check-in script for Birch, ages 18 to 26 (BLD 886).
   Read by shared/gg-guided.js. The questions are read live from birch/checkin.js
   (BIRCH_CHECKIN.getBank, weeklyList, optionalList), never copied here.
   GG_GUIDED.birch = {voice, tipSkip, kinds: {start, full, quick, together, plan}}
     open    a few warm lines before question 1 (the engine picks one or two)
     enter   one line as each part begins (optional for the engine)
     mid     {every, lines}: encouragement every N questions
     tips    {part: [lines]}: one small thing to try, after an answer that
             shows a Growing Edge for that part
     close   lines that celebrate and point to the next step
     plan    {open, part: {part: [why lines]}, close}
   together is a check-in where a helper taps while the person answers
   (startCheckin('tapped', id)).
   tipSkip names the questions that never get a tip: any question the tree
   still marks with a flag, questions with a help note, and the optional
   question. No safety step (GWG BLD 887), and no help line
   is ever spoken.
   Roots lines name no faith, so they fit Faith and Plain wording alike.
   Voice: the Birch narrator (the BLD 778 voice map). No line names a narrator.
   No dashes. Edit words here; keep them warm, brief, and forward. */
(function () {
window.GG_GUIDED = window.GG_GUIDED || {};
const ENTER = {
  roots: ['First, Roots: what grounds you.', 'We\'ll start with Roots, the peace and values you\'re making your own.'],
  trunk: ['Next, your Trunk: purpose, and where you\'re headed.', 'On to Trunk, what matters to you.'],
  bark: ['Now Bark: stress, setbacks, and everything adult life asks.', 'Next is Bark, your mind and feelings.'],
  branches: ['Now Branches: friends, family, and the people in your corner.', 'On to Branches, your people.'],
  leaves: ['Now Leaves: Move, Rest, and Nourish.', 'Next is Leaves, how your body is doing.'],
  fruit: ['Last part, Fruit: hope, and what you look forward to.', 'Fruit to finish: what you believe is possible.']
};
const TIPS = {
  roots: [
    'Something small to try: five quiet minutes today, phone in another room, just breathing.',
    'Try this: take a slow walk outside and look for one thing that makes you pause.',
    'Write down one value you want to live by this month, and one way to live it this week.',
    'Pick a steady ritual for your mornings or evenings, even two minutes, and keep it for a week.',
    'Carry one honest question with you this week, and give it some quiet time.'
  ],
  trunk: [
    'Try this: name one thing that matters to you, and give it thirty minutes this week.',
    'Write down three things you\'re good at. Ask a friend to add one more.',
    'Pick one next step toward where you\'re headed, small enough to start today.',
    'Ask someone a few steps ahead of you how they found their way.',
    'Give an hour to a cause you care about. Purpose often grows when we serve.'
  ],
  bark: [
    'Try a slow breath: in for four, out for six, five times.',
    'When a feeling rises, name it in one word. Naming it is a strong first step.',
    'Speak to yourself the way you\'d speak to a good friend in the same spot.',
    'Try a worry window: fifteen minutes to write it all down, then close the page.',
    'Choose one small thing on your list today, finish it, and call it a win.'
  ],
  branches: [
    'Try this: reach out to one person today, just to say you\'re thinking of them.',
    'Plan one face to face hangout this week, phones away.',
    'Try a group that fits you: a class, a team, a club, or a volunteer crew. One visit is a great start.',
    'Send a thank you to someone who has had your back.',
    'Ask someone a real question, and give them your full attention as they answer.'
  ],
  leaves: [
    'Try charging your phone outside your bedroom tonight.',
    'Pick a steady wake time for this week, and see how your days feel.',
    'Move in a way you enjoy for twenty minutes today: a walk, a lift, a run, or a pickup game.',
    'Get some morning daylight, even five minutes outside.',
    'Plan one regular meal you enjoy, and sit down to eat it.',
    'Keep a water bottle with you today, and refill it twice.'
  ],
  fruit: [
    'Try this: tonight, write down three good things from today.',
    'Put one thing to look forward to on your calendar this week.',
    'Picture your life going well a few years from now. Write one sentence about it.',
    'Celebrate one win from this week, even a small one.',
    'Write a short note to your future self about what you\'re hoping for.'
  ]
};
const G = window.GG_GUIDED.birch = {
  voice: 'brian',
  tipSkip: ['flag', 'help', 'sens'],
  kinds: {
    start: {
      open: [
        'Welcome to Birch. We\'re glad you\'re here.',
        'This is your first check-in, a look at six parts of your life.',
        'One question at a time. Think about the past two weeks, and pick what fits best.',
        'Every answer is welcome. Honest answers grow the strongest trees.',
        'Your answers stay on this device, locked in your profile. Take your time.'
      ],
      enter: ENTER,
      mid: { every: 6, lines: [
        'You\'re doing great. Keep going.',
        'Nice and steady. Go with what feels true today.',
        'Good work. You\'re learning a lot about yourself right now.',
        'Take a breath if you need one. You\'ve got this.',
        'Halfway there, and going strong.',
        'This is real tending, and you\'re doing it.',
        'Every answer adds to the picture. Keep it up.'
      ] },
      tips: TIPS,
      close: [
        'You did it. Your first check-in is complete.',
        'That took honesty and focus. Well done.',
        'Your tree is ready to see.',
        'Next, build your Growth Plan: a few small practices, ready in Today.',
        'This is where your growth begins.'
      ]
    },
    full: {
      open: [
        'Welcome back. Let\'s see how your tree is growing.',
        'Good to see you. Time for a full check-in.',
        'Six parts, one question at a time. Think about the past two weeks.',
        'Pick what fits best. Every answer is welcome.',
        'Settle in. This time is for you.'
      ],
      enter: ENTER,
      mid: { every: 6, lines: [
        'You\'re doing great.',
        'Keep going. Each answer shows a little more of your tree.',
        'Nice work. Go with your first honest answer.',
        'You\'re showing up for yourself today.',
        'A deep breath, and on we go.',
        'More than halfway. Strong finish ahead.',
        'Steady and honest. That\'s how trees grow.'
      ] },
      tips: TIPS,
      close: [
        'All done. Nice work.',
        'You made time for yourself today, and that matters.',
        'Your tree is ready. Let\'s take a look.',
        'Next, check your Growth Plan, and give your Growing Edge a practice or two.',
        'Your practices will be waiting in Today.',
        'Growth happens a little at a time. You\'re on your way.'
      ]
    },
    quick: {
      open: [
        'Quick Check-in time. Six questions, about two minutes.',
        'Welcome back. Let\'s do a quick one.',
        'One question for each part. Think about the past two weeks.',
        'Pick what fits best, and we\'ll keep it moving.'
      ],
      mid: { every: 4, lines: [
        'Nice, almost there.',
        'Two more, and you\'re done.',
        'Keep going. You\'re doing great.'
      ] },
      tips: TIPS,
      close: [
        'Done. Nice work checking in.',
        'Your tree is ready to see.',
        'Keep tending your practices in Today, a little each day.',
        'A full check-in every few months shows how far you\'ve come.'
      ]
    },
    together: {
      open: [
        'Welcome to a check-in together.',
        'One of you answers, and the other taps. Take it one question at a time.',
        'Think about the past two weeks, and pick what fits best.',
        'Go at your own pace, and talk as you go if you like.'
      ],
      enter: ENTER,
      mid: { every: 6, lines: [
        'You\'re doing great together.',
        'Nice and steady. Keep going.',
        'Good work, both of you.',
        'More than halfway there.'
      ] },
      tips: TIPS,
      close: [
        'All done. Thank you both.',
        'This check-in saves to the tree it belongs to, marked as taken together.',
        'The last few questions wait for the next check-in on your own.',
        'Let\'s take a look at the tree.'
      ]
    },
    plan: {
      open: [
        'Let\'s build your Growth Plan together.',
        'This is where your tree starts to grow.',
        'We\'ll go one part at a time, starting with your Growing Edge.',
        'Pick one to three practices for each part you want to tend. Small and steady is perfect.',
        'Tap How on any card to see the steps.'
      ],
      part: {
        roots: [
          'Roots hold you steady through change. A little quiet time goes a long way.',
          'These years bring a lot of change. Strong roots help you stay grounded through it.',
          'This season, your roots are ready to grow deeper.'
        ],
        trunk: [
          'Your Trunk is purpose. A direction is enough, and small steps count.',
          'What matters to you deserves real time. Let\'s give it some.',
          'This is a great season to grow your sense of where you\'re headed.'
        ],
        bark: [
          'Bark is how you meet stress and setbacks. A few steady skills make every week easier.',
          'Adult life asks a lot. These practices help you bounce back.',
          'This season, give your mind and feelings some kind attention.'
        ],
        branches: [
          'Your people matter. Small moments of connection add up.',
          'Branches grow when you reach out. One call or one hangout is a great start.',
          'This season, let\'s grow the people in your corner.'
        ],
        leaves: [
          'Your body carries everything you do. Move, Rest, and Nourish help it feel its best.',
          'Small steps with sleep, movement, and meals add up.',
          'This season, let\'s give your body some steady attention.'
        ],
        fruit: [
          'Hope is a skill you can grow. These practices help you see what\'s ahead.',
          'Something to look forward to brightens every week.',
          'This season, let\'s grow your hope a little each day.'
        ]
      },
      close: [
        'Here\'s what you\'re tending this season.',
        'Great choices. This plan is all yours.',
        'Your practices are waiting in Today, ready to check off.',
        'Start small, stay steady, and watch your tree grow.',
        'You can change your plan any time.'
      ]
    }
  }
};
})();
