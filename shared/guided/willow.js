/* =====================================================================
   GUIDED CHECK-IN SCRIPT . WILLOW (shared/guided/willow.js), GWG BLD 886
   The spoken guide moments for Willow's guided check-in, read by
   shared/gg-guided.js (window.GGGuided). Questions are never copied here:
   the engine reads them live from window.WILLOW_CHECKIN (willow/checkin.js),
   so the spoken question is always Willow's own question text.

   Willow's way: very gentle, unhurried, presence over fixing. Every line
   leaves room. Brian narrates Willow (shared/gg-learn.js VOICES.willow).

   Kinds (how the page picks one, see patches/bld886/willow-map.md):
     start     the very first check-in for the person (role person, said by self)
     full      a later full check-in, the person answering for themselves
     quick     the quick check-in (question 1 of each part)
     tapped    the person answers out loud and a helper taps (full or quick)
     observed  a helper answering from what they see (full or quick)
     helper    a helper's own check-in, about themselves (full or quick)
   Slots: open, enter {part: lines} (one line as each part begins, full style
   kinds), mid {every, lines}, tips {part: lines}, close, plus two
   extras the engine may use when it shows those screens: faith (before the
   faith screen) and who (before Who Is Answering). No safety step and no
   safety slot (GWG BLD 887). Lines never name a narrator and never speak a
   crisis line or helpline: Willow's own quiet line of type stays on screen,
   hospice first.
   Willow has no Growth Plan builder today (Today offers one gentle practice
   a day). kinds.plan below is ready for the day Willow's Growth Plan joins
   Today (shared/practice-rhythm.js already holds Willow's rhythms); the page
   uses it only once a plan save exists. Chris decides that step.
   ===================================================================== */
(function () {
  'use strict';
  window.GG_GUIDED = window.GG_GUIDED || {};

  // Tips for the person's own tree, spoken after an answer that shows a Growing Edge in that part.
  var PERSON_TIPS = {
    roots: [
      'Thank you for telling the truth about this. Roots grow quietly, and they still hold.',
      'Whatever grounds you, faith, love, the land, your people, it can be found again in small ways. A prayer, a song, a window.',
      'You can ask for what feeds your spirit. A reading, a blessing, someone from your tradition, or simply quiet.',
      'This part can be tended gently, with someone beside you. A chaplain is glad to sit with this, if you wish.'
    ],
    trunk: [
      'Your life has shaped people in more ways than you know. One story is enough to begin.',
      'Some things can still be said or set right. Some can be set down. Both are welcome here.',
      'Thank you for sharing that. Cuttings is a good place to keep one story when you are ready.',
      'Meaning often hides in small, true details. We can look for them together, slowly.'
    ],
    bark: [
      'Thank you for saying that. Peace often comes in moments, and moments count.',
      'Naming a fear out loud to someone you trust can make it a little lighter to carry.',
      'Let your breath be slow and easy for a moment. There is nothing to hurry here.',
      'Your hospice team wants to know about restlessness or worry. They are there for exactly this.'
    ],
    branches: [
      'Love is still moving between you and your people, even on hard days.',
      'Receiving help is part of love too. The people beside you are choosing this.',
      'Words like thank you, I love you, and I forgive you keep their power. Someone can help you say them, or write them.',
      'Thank you for your honesty. Who would you like close right now? That is a good place to start.'
    ],
    leaves: [
      'Comfort matters. Let your hospice nurse know today, so they can help.',
      'Small comforts count: a soft light, a familiar voice, a song you love.',
      'Rest is part of this season. It is welcome here, any time of day.',
      'One small joy a day is plenty. A taste, a sound, the light at the window.'
    ],
    fruit: [
      'Thank you for trusting us with that. You can say anything here.',
      'Hope changes shape near the end. It can be as small as a good visit or a quiet afternoon.',
      'Readiness grows a little at a time, in its own season.',
      'What you are feeling matters, and your hospice team and the people who love you want to hear it.'
    ]
  };

  // Tips for a helper's own tree.
  var HELPER_TIPS = {
    roots: [
      'What holds you up matters too, while you hold them. A few quiet minutes for your own spirit count.',
      'Anger or distance from what you hold sacred is common in caregiving. It can be spoken, and it can be tended.',
      'Something small can feed your spirit today: a walk outside, a song, a prayer, a deep breath at the door.'
    ],
    trunk: [
      'Guilt often means you love them. You are doing what love can do today.',
      'The care you give has meaning, even on the days it feels like tasks.',
      'Share one memory with them, or with someone else, today. Stories hold you both.'
    ],
    bark: [
      'Let yourself feel what you feel. It belongs to loving someone through this.',
      'Thank you for being honest. Overwhelm is a signal to let others carry a little more.',
      'One slow breath out, longer than the breath in. Then the next small thing.'
    ],
    branches: [
      'You are allowed to lean on someone. Who could you call today?',
      'Families see things differently in seasons like this. Your hospice social worker can help a family talk.',
      'Thank you for saying that. You deserve company in this, too.'
    ],
    leaves: [
      'Your body is carrying this too. One real meal, some water, and a little rest are part of the work.',
      'A break is part of caring well. Someone else can be on for an hour.',
      'Rest that refills you may need more than sleep. A walk, a friend, or time outside can help.'
    ],
    fruit: [
      'This is one of the hardest things a person does. Thank you for telling the truth about it.',
      'You will carry this with others beside you. Your hospice bereavement team is there for you, now and after.',
      'Hope can be small today. A good moment with them, a call from a friend, a quiet night.'
    ]
  };

  // A helper answering from what they see: the tips speak to the helper about the person.
  var OBSERVED_TIPS = {
    roots: [
      'Thank you for noticing. A reading, a song, or someone from their tradition may bring them comfort.',
      'You can offer what feeds their spirit, gently, and let them choose.'
    ],
    trunk: [
      'Asking for one story can help them feel their life mattered. Listen for the details.',
      'If they seem weighed down, a chaplain can sit with them. Let the team know.'
    ],
    bark: [
      'Restlessness or worry is worth telling the hospice nurse about today.',
      'A soft voice, low light, and familiar music can help a room feel calm.'
    ],
    branches: [
      'Telling them they are loved still matters, even when they seem far away.',
      'Your presence is the gift. Holding a hand, reading aloud, simply being there.'
    ],
    leaves: [
      'If comfort seems hard for them, call the hospice nurse today.',
      'Small comforts help: lip balm, a cool cloth, a song they love.'
    ],
    fruit: [
      'What you see matters. Share it with the hospice nurse and chaplain.',
      'Thank you for watching over them so closely. You are part of their peace.'
    ]
  };

  // One line as each part begins (full style kinds; the quick check-in shows all six together).
  var ENTER_PERSON = {
    roots: ['Roots: what grounds you. Faith, spirit, or whatever holds you up.', 'We begin with your roots, the quiet things that hold you.'],
    trunk: ['Trunk: your story, and knowing your life has mattered.', 'Now your trunk. Your story, and what you pass on.'],
    bark: ['Bark: peace inside, and the calm moments between.', 'Next, your bark. How things feel inside lately.'],
    branches: ['Branches: the people you love, and the words you want to say.', 'Now your branches. Love, and the people close to you.'],
    leaves: ['Leaves: comfort, rest, and small joys.', 'Next, your leaves. Comfort, rest, and the senses.'],
    fruit: ['Fruit: hope, and getting ready for what is ahead.', 'Last, your fruit. Hope, in whatever shape it takes now.']
  };
  var ENTER_OBSERVED = {
    roots: ['Roots: what seems to ground them lately.'],
    trunk: ['Trunk: their story, and how they seem to hold it.'],
    bark: ['Bark: how peaceful or unsettled they seem.'],
    branches: ['Branches: how they seem with the people around them.'],
    leaves: ['Leaves: their comfort and rest, as you see it.'],
    fruit: ['Fruit: hope and readiness, from what you have heard.']
  };
  var ENTER_HELPER = {
    roots: ['Roots: what holds you up while you hold them.'],
    trunk: ['Trunk: the meaning in the care you give.'],
    bark: ['Bark: what you are feeling, and room to feel it.'],
    branches: ['Branches: who holds you up, and how the family is doing.'],
    leaves: ['Leaves: food, sleep, and breaks. Your body is carrying this too.'],
    fruit: ['Fruit: hope, and picturing yourself on the other side of this.']
  };

  var FAITH_PERSON = [
    'Next, a few words about faith, spirit, or whatever has mattered to you. Every answer is welcome here, including none.',
    'Before the questions, we ask what grounds you. Faith, spirit, or something else. Take your time.'
  ];

  window.GG_GUIDED.willow = {
    voice: 'brian',
    // No tip on a flagged question (struggle, regret, burden, guilt in WILLOW_CHECKIN): Willow's own gentle note shows there.
    tipSkip: ['flag'],
    kinds: {
      start: {
        open: [
          'Welcome to Willow. We are glad you are here. Take all the time you need.',
          'We will go one question at a time. Answer as things are lately, and Not Sure is always a fine answer.',
          'Some questions may touch tender places. You can pause, rest, or come back later. Your answers stay on this device.',
          'Let your breath settle for a moment. When you are ready, we will begin.'
        ],
        faith: FAITH_PERSON,
        mid: { every: 6, lines: [
          'You are doing well. Take a breath if you like.',
          'Thank you for your honesty. We can rest here a moment.',
          'Every honest answer is the right one. Simply what is true for you lately.',
          'Gently now. A few more, whenever you are ready.',
          'You can pause anytime. Your answers are kept right where you left them.'
        ] },
        enter: ENTER_PERSON,
        tips: PERSON_TIPS,
        close: [
          'Thank you. That was a gift of honesty, and your tree is planted.',
          'Your tree has its first ring now. What you see next are gentle words, simply listening to you.',
          'Today has one small practice waiting for you. One is plenty, and rest is welcome too.',
          'Whenever you like, the people you love can help you write down what matters most.'
        ]
      },
      full: {
        open: [
          'Welcome back. We are glad to sit with you again.',
          'Same gentle questions as before. Answer as things are lately, and Not Sure is always welcome.',
          'Take all the time you need. We will go slowly, one question at a time.',
          'Let your shoulders soften. When you are ready, here is the first one.'
        ],
        faith: [
          'First, a look at what grounds you. If it is the same as last time, one tap keeps it.',
          'Faith, spirit, or something else. Has anything changed? Either answer is welcome.'
        ],
        mid: { every: 6, lines: [
          'Thank you. You are doing beautifully.',
          'A gentle pause here. Breathe in, and let it out slowly.',
          'Every answer helps your tree speak for you.',
          'Take your time. We are right here.',
          'Halfway through a part is a fine place to rest, if you need to.'
        ] },
        enter: ENTER_PERSON,
        tips: PERSON_TIPS,
        close: [
          'Thank you. Your tree has a new ring.',
          'Every part of a tree has seasons. What you shared today helps the people beside you know how to be present.',
          'Today leans toward one gentle practice. Try it if you like, and rest if you need to.',
          'We are glad you took this time for yourself.'
        ]
      },
      quick: {
        open: [
          'A quick check-in today. One question for each part of your tree.',
          'About two minutes, at your own pace. Not Sure is always welcome.',
          'Just six questions. Let them be easy.'
        ],
        faith: FAITH_PERSON,
        mid: { every: 3, lines: [
          'Halfway there. Thank you.',
          'Gently on. Three more.',
          'You are doing well. Take a breath if you like.'
        ] },
        tips: PERSON_TIPS,
        close: [
          'Thank you. That is a gentle snapshot of today.',
          'Your tree is ready to see. Today has one small practice waiting, whenever you like.',
          'Thank you for checking in. Rest well.'
        ]
      },
      tapped: {
        open: [
          'Welcome. We will read each question aloud, slowly.',
          'Answer out loud in your own words, and your helper will tap the answer closest to what you said.',
          'Not Sure is always welcome. You can rest between questions whenever you like.'
        ],
        who: [
          'Who is answering today? This keeps their own voice clear.',
          'First, tell us who is answering. Every answer remembers who gave it.'
        ],
        faith: [
          'Now a few words about faith, spirit, or what has mattered. Each person answers for themselves, so ask them, and tap what they say.',
          'Here we ask what grounds them, in their own words. Every answer is welcome, including none.'
        ],
        mid: { every: 6, lines: [
          'Thank you both. Take a breath before the next one.',
          'Slow is good. There is plenty of time.',
          'If they are tired, it is fine to rest and come back.',
          'You are doing this together, and that matters.'
        ] },
        enter: ENTER_PERSON,
        tips: PERSON_TIPS,
        close: [
          'Thank you both. Their tree has a new ring, in their own words.',
          'What they shared helps everyone beside them know how to be present.',
          'Today has one gentle practice waiting. It can be done lying down, with a helper.'
        ]
      },
      observed: {
        open: [
          'Thank you for watching over them so closely.',
          'Answer from what you have seen and heard lately. This is kept apart from their own answers, so their rings hold their own words.',
          'Not Sure is always welcome. Your noticing helps their hospice team.'
        ],
        who: [
          'First, choose who is answering today.',
          'Every answer remembers who gave it, so their own voice stays clear.'
        ],
        mid: { every: 6, lines: [
          'Thank you. What you notice matters.',
          'A pause here, for you too.',
          'You are doing well. A few more.',
          'Gently on, at your own pace.'
        ] },
        enter: ENTER_OBSERVED,
        tips: OBSERVED_TIPS,
        close: [
          'Thank you. This helps their helpers and their hospice team notice what is changing.',
          'Please take a moment for yourself too. Your own tree is here whenever you want it.',
          'What you saw today is kept apart, gently, with their own words.'
        ]
      },
      helper: {
        open: [
          'This one is for you. You are carrying this too.',
          'These questions ask how you are doing, as you care for someone you love. Answer as things are lately.',
          'Not Sure is always welcome. Your answers stay locked in your own profile.'
        ],
        mid: { every: 6, lines: [
          'Thank you for taking this time for yourself.',
          'Breathe out slowly. You are allowed to rest here.',
          'Every answer helps you see what you need.',
          'You are doing well. A few more.'
        ] },
        enter: ENTER_HELPER,
        tips: HELPER_TIPS,
        close: [
          'Thank you. Your own tree grows here too.',
          'Today has one small thing for you. Five minutes for yourself counts, and it helps them too.',
          'Caring for someone you love is deep, hard work. Be gentle with yourself tonight.'
        ]
      },
      plan: {
        open: [
          'Let us choose a few gentle practices for this season. Slowly, and only what feels right.',
          'We will look at one part at a time, starting where your tree is asking for tending.',
          'Every practice here works lying down, and every one can be done with a helper. One is plenty.'
        ],
        part: {
          roots: [
            'Roots are what grounds you. Tending them can bring comfort when the wind picks up.',
            'Whatever holds you up, faith, love, nature, your values, a small practice can keep it close.'
          ],
          trunk: [
            'Trunk is your story. Tending it helps the people you love carry your life forward.',
            'One story, one thing learned, one small gift. Each one keeps your life close to the people you love.'
          ],
          bark: [
            'Bark is peace inside. Tending it makes room for calm moments between the hard ones.',
            'A slow breath, a kind word to yourself, a worry handed to someone else. Small practices, real peace.'
          ],
          branches: [
            'Branches are the people you love. Tending them is how love gets said out loud.',
            'A thank you, a blessing, a hand held. These are the practices of this season.'
          ],
          leaves: [
            'Leaves are comfort, rest, and small joys. Tending them makes each day a little softer.',
            'A favorite sound, a soft light, a taste you love. Small comforts are worth planning.'
          ],
          fruit: [
            'Fruit is hope and readiness. Tending it helps you face what is ahead in your own way.',
            'Hope changes shape near the end. A small practice can help it stay close.'
          ]
        },
        close: [
          'Here is what you are tending this season.',
          'Choose one a day, or simply rest. Both are welcome.',
          'Your practices are saved, and Today will offer them gently.'
        ]
      }
    }
  };
})();
