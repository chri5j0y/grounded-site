/* Grow With Grounded: Guided Check-in script for Pine, grades 9 to 12 (BLD 886).
   Read by shared/gg-guided.js. The questions are read live from pine/checkin.js
   (PINE_CHECKIN.getBank, weeklyList, sensitiveList, safety), never copied here.
   GG_GUIDED.pine = {voice, tipSkip, kinds: {start, full, quick, plan}}
     open    a few warm lines before question 1 (the engine picks one or two)
     enter   one line as each part begins (optional for the engine)
     mid     {every, lines}: encouragement every N questions
     tips    {part: [lines]}: one small thing to try, after an answer that
             shows a Growing Edge for that part
     close   lines that celebrate and point to the next step
     plan    {open, part: {part: [why lines]}, close}
   tipSkip names the questions that never get a tip: flagged questions, the
   optional questions, and the safety step. The tree's own calm card and
   text lines handle those, and no help line is ever spoken.
   Roots lines name no faith, so they fit Faith and Plain wording alike.
   Voice: the Pine narrator (the BLD 778 voice map). No line names a narrator.
   No dashes. Edit words here; keep them warm, brief, and forward. */
(function () {
window.GG_GUIDED = window.GG_GUIDED || {};
const G = window.GG_GUIDED.pine = {
  voice: 'jenny',
  tipSkip: ['flag', 'sens', 'safety'],
  kinds: {
    start: {
      open: [
        'Welcome to Pine. We\'re really glad you\'re here.',
        'This is your first check-in, and it\'s all about you.',
        'We\'ll ask about six parts of your life, one question at a time.',
        'Think about the past two weeks, and pick the answer that fits best. Every answer helps your tree.',
        'Your answers stay on this device, just for you. Take your time.'
      ],
      enter: {
        roots: ['First up, Roots: what keeps you steady.', 'We\'ll start at the Roots, with what holds you steady.'],
        trunk: ['Next, your Trunk: what you care about and where you\'re headed.', 'On to your Trunk, your sense of purpose.'],
        bark: ['Now your Bark: stress, mistakes, and big feelings.', 'Next is Bark, how you handle what life throws at you.'],
        branches: ['Now Branches: your friends, your family, and the adults in your corner.', 'On to Branches, the people in your life.'],
        leaves: ['Now Leaves: Move, Rest, and Nourish.', 'Next is Leaves, how your body is doing.'],
        fruit: ['Last part, Fruit: what you look forward to.', 'Here\'s the last part, Fruit, all about hope.']
      },
      mid: { every: 5, lines: [
        'You\'re doing great. Keep going.',
        'Nice. Go with the answer that feels true today.',
        'Look at you, already this far.',
        'Honest answers grow the best trees. You\'re doing it.',
        'Good work. A quick stretch or a deep breath, then on we go.',
        'You\'re finding out a lot about yourself right now.',
        'Halfway there and going strong.'
      ] },
      close: [
        'You did it. Your first check-in is done.',
        'That took real honesty. Nice work.',
        'Your tree is ready to see, every part of it.',
        'Next, pick a few small practices for your Growth Plan. They\'ll wait for you in Today.',
        'Every tree starts somewhere, and yours starts now.'
      ]
    },
    full: {
      open: [
        'Welcome back. Let\'s see how your tree is growing.',
        'Good to see you. Time for a full check-in.',
        'Six parts, one question at a time. Think about the past two weeks.',
        'Pick what fits best. Every answer is welcome.',
        'Get comfy. This is your time.'
      ],
      enter: {
        roots: ['Let\'s start with Roots, what keeps you steady.', 'Roots first: peace and what holds you up.'],
        trunk: ['On to your Trunk, your purpose.', 'Next, your Trunk: what matters to you.'],
        bark: ['Now Bark, your mind and feelings.', 'On to Bark: stress, setbacks, and how you bounce back.'],
        branches: ['Now Branches, your people.', 'Next, Branches: friends, family, and your crew.'],
        leaves: ['Now Leaves: Move, Rest, and Nourish.', 'On to Leaves, your body.'],
        fruit: ['Last part, Fruit: hope and what\'s ahead.', 'Fruit to finish: what you look forward to.']
      },
      mid: { every: 5, lines: [
        'You\'re doing great.',
        'Nice and steady. Keep going.',
        'Every answer shows us a little more of your tree.',
        'Good work. Go with your first honest answer.',
        'You\'re really showing up for yourself today.',
        'Take a breath. You\'ve got this.',
        'More than halfway. Strong finish ahead.'
      ] },
      tips: {
        roots: [
          'Something small to try: take five quiet minutes today, phone down, and just breathe.',
          'Try this: step outside and notice one thing in the sky or the trees.',
          'Here\'s an idea: write down one thing that helps you feel steady, and keep it where you\'ll see it.',
          'Try a calm spot: one corner, one song, and a few slow breaths.',
          'Ask someone in your family about a tradition that matters to them. You might find a root you share.'
        ],
        trunk: [
          'Try this: name one thing you care about, and do one small thing for it this week.',
          'Here\'s a small step: write down one thing you\'re good at, or getting better at.',
          'Ask an adult you look up to how they found their path. Their answer might surprise you.',
          'Pick one tiny goal for this week, small enough that you can start today.',
          'Try helping someone for ten minutes. Purpose often shows up when we help.'
        ],
        bark: [
          'Try a slow breath: in for four, out for six, three times.',
          'When a feeling shows up, give it one word, like mad, sad, or worried. Naming it is a strong first step.',
          'Talk to yourself the way you\'d talk to a good friend who made the same mistake.',
          'Try a worry window: ten minutes to write your worries down, then close the notebook.',
          'Put on a song that calms you, and give it your full attention.'
        ],
        branches: [
          'Try this: text one friend today, just to say you thought of them.',
          'Think of one adult in your corner, and say hi to them this week.',
          'Try a club, a team, or a group that sounds fun. One visit is a great start.',
          'At your next meal with someone, put the phones away and really talk.',
          'Send a thank you to someone who showed up for you.'
        ],
        leaves: [
          'Try charging your phone outside your bedroom tonight.',
          'Move your body in a way you enjoy for ten minutes today: a walk, a shoot around, or dancing in your room.',
          'Pick a steady bedtime for this week, and see how your mornings feel.',
          'Grab some daylight in the morning, even five minutes outside.',
          'Plan one regular meal you enjoy, and sit down to eat it.',
          'Fill a water bottle and keep it with you today.'
        ],
        fruit: [
          'Try this: tonight, write down three good things from your day, big or small.',
          'Plan one small thing to look forward to this week.',
          'Picture yourself a year from now, doing well. Write one sentence about what you see.',
          'Make a short playlist of songs that lift you up.',
          'Celebrate one small win from this week. It counts.'
        ]
      },
      close: [
        'All done. Nice work.',
        'You showed up for yourself today, and that matters.',
        'Your tree is ready. Let\'s take a look.',
        'Next, check your Growth Plan. Pick a practice or two for the part that\'s growing most.',
        'Your practices will be waiting in Today.',
        'Trees grow a little at a time, and so do you.'
      ]
    },
    quick: {
      open: [
        'Quick Check-in time. Six questions, about two minutes.',
        'Hey, welcome back. Let\'s do a quick one.',
        'One question for each part. Think about the past two weeks.',
        'Pick what fits best, and we\'ll keep it moving.'
      ],
      mid: { every: 4, lines: [
        'Nice, almost there.',
        'Two more, and you\'re done.',
        'Keep going. You\'re doing great.'
      ] },
      close: [
        'Done. That was quick.',
        'Nice work checking in with yourself.',
        'Your tree is ready to see.',
        'Keep tending your practices in Today, a little at a time.',
        'A full check-in every few months shows how much you\'ve grown.'
      ]
    },
    plan: {
      open: [
        'Let\'s build your Growth Plan together.',
        'This is where your tree starts growing.',
        'We\'ll go one part at a time, starting with your Growing Edge.',
        'Pick one to three practices for each part you want to tend. Small is perfect.',
        'Tap How on any card to see the steps.'
      ],
      part: {
        roots: [
          'Roots hold you steady when life gets loud. A few quiet minutes go a long way.',
          'Strong roots help you bend and spring back. Let\'s give yours some attention.',
          'This season, your roots are ready to grow deeper.'
        ],
        trunk: [
          'Your Trunk is purpose. A direction is enough, and small steps count.',
          'What you care about matters. Let\'s give it a little time each week.',
          'This is a great season to grow your sense of where you\'re headed.'
        ],
        bark: [
          'Bark is how you handle stress and big feelings. A few calm skills make every day easier.',
          'Strong bark is about healing well. These practices help you bounce back.',
          'This season, give your mind and feelings some kind attention.'
        ],
        branches: [
          'Your people matter. Small moments of connection add up.',
          'Branches grow when you reach out. One text or one talk is a great start.',
          'This season, let\'s grow the friendships and the adults in your corner.'
        ],
        leaves: [
          'Your body carries everything you do. Move, Rest, and Nourish help it feel its best.',
          'Small steps with sleep, movement, and meals add up fast.',
          'This season, let\'s give your body some steady tending.'
        ],
        fruit: [
          'Hope is a skill you can grow. These practices help you see what\'s ahead.',
          'Something to look forward to makes every week brighter.',
          'This season, let\'s grow your hope a little each day.'
        ]
      },
      close: [
        'Here\'s what you\'re tending this season.',
        'Nice choices. This plan is all yours.',
        'Your practices are waiting in Today, ready to check off.',
        'Start small, keep it steady, and watch your tree grow.',
        'You can change your plan any time.'
      ]
    }
  }
};
// The first check-in and the Quick Check-in share the full check-in's tips.
G.kinds.start.tips = G.kinds.full.tips;
G.kinds.quick.tips = G.kinds.full.tips;
})();
