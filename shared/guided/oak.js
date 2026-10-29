/* =====================================================================
   OAK . Guided Check-in script (GWG BLD 886)
   The words a guide says around the questions in Guided mode (shared/gg-guided.js).
   The questions themselves are read live from OAK_CHECKIN (/oak/checkin.js), never copied.
   GG_GUIDED.oak = {voice, tipSkip, kinds: {<kind>: {open, enter, mid: {every, lines}, tips: {<part>}, close}}}
   open and close hold one set of choices (a list inside the list): the player says one of them.
   enter and tips hold variants too (one is said); mid lines take turns.
   enter: {<part>: [lines]}, one line as each part begins (full style kinds only).
   tipSkip: none. Every question is an open question (GWG BLD 887): no flags and no safety step.
   kinds: start (first full check-in, plants the tree and starts season 1), full, season (full check-in at week 12 or later, adds a ring), quick, week (GGTend weekly check-in), together (CK.by tapped), plan.
   plan: {open, part: {<part>: [why lines]}, close} for the Guided Growth Plan.
   Tips play after an answer that shows a Growing Edge.
   Crisis lines are never spoken here; each tree keeps its own text line.
   Generated from data (grounded-workshop patches/bld886/source/p3/gen-guided.js); edit the data and rebuild so quotes stay escaped.
   ===================================================================== */
(function () {
  window.GG_GUIDED = window.GG_GUIDED || {};
  var T_oak = {
    "roots": [
      "A small thing to try: two quiet minutes today with whatever steadies you most, a prayer, a song, or the sky outside.",
      "Try this: name one thing that held you up in a hard moment, and give thanks for it, out loud or on paper.",
      "Roots grow with small, regular water. Pick one practice that feeds your spirit and give it five minutes this week.",
      "Your questions are welcome here. Try writing one honest question down and letting it rest with you for a day."
    ],
    "trunk": [
      "Try this: write one sentence about what you are living for right now. It can be a person, a craft, or simply today.",
      "A small thing to try: name one value you hold dear, and do one thing today that lines up with it.",
      "Meaning often lives in ordinary roles. Tonight, notice one way you showed up for someone today."
    ],
    "bark": [
      "Try this: breathe in slowly for four counts and out for six, three times. Let your shoulders drop.",
      "A small thing to try: when a feeling rises, give it a name in a word or two. Naming it is a good first step.",
      "Be as kind to yourself today as you would be to a good friend. One gentle sentence counts.",
      "Try a five minute pause today: step outside, look at something far away, and breathe."
    ],
    "branches": [
      "Try this: send one short message today to someone you would love to hear from.",
      "A small thing to try: say yes to one invitation this week, or offer one of your own.",
      "Connection grows in small moments. A call, a walk together, or a shared meal all count."
    ],
    "leaves": [
      "Try this: drink a glass of water and step outside for a few minutes of daylight.",
      "A small thing to try: a ten minute walk, or any movement your body enjoys, sometime today.",
      "Try a gentle wind down tonight, with screens put away and the lights low.",
      "Add one whole, nourishing food to a meal today. Small changes add up."
    ],
    "fruit": [
      "Try this: write down one thing you are looking forward to, however small.",
      "A small thing to try: before bed, name three good moments from today.",
      "Hope grows when it is shared. Tell someone about one good thing you noticed this week."
    ]
  };
  var ENTER = {
    "roots": [
      "First, Roots: what grounds you.",
      "We will begin with Roots, what holds you steady."
    ],
    "trunk": [
      "Next, your Trunk: purpose and meaning.",
      "On to Trunk, the larger story you are living."
    ],
    "bark": [
      "Now Bark: your mind and feelings.",
      "Next is Bark, how you calm down and heal over."
    ],
    "branches": [
      "Now Branches: your people.",
      "On to Branches, who shows up for you and who you show up for."
    ],
    "leaves": [
      "Next, Leaves: your body, with rest, movement, and nourishment.",
      "Now Leaves, how your body is doing."
    ],
    "fruit": [
      "And last, Fruit: hope.",
      "Finally, Fruit, the good you are growing toward."
    ]
  };
  window.GG_GUIDED["oak"] = {
    "voice": "brian",
    "tipSkip": [],
    "kinds": {
      "start": {
        "open": [
          [
            "Welcome. We will walk through your tree together, one question at a time, six parts in all.",
            "Every honest answer is the right answer here. Think about the past two weeks, and go at your own pace.",
            "Take a breath. This is time set apart for you. We will go one question at a time, and you can pause whenever you like.",
            "This first check-in plants your tree. Answer with what is true for the past two weeks, and we will take it from there."
          ]
        ],
        "mid": {
          "every": 5,
          "lines": [
            "You are doing well. Keep going at your own pace.",
            "Nice and steady. Each answer helps your tree come into view.",
            "Thank you for being honest with yourself. That is the whole work here.",
            "Take a breath if you like. We will keep going when you are ready.",
            "Good. Your first answer is usually the truest one.",
            "You are making good progress. Every part of you matters here.",
            "Honest answers draw the clearest picture. This time is a gift to yourself."
          ]
        },
        "close": [
          [
            "That is every part. Thank you for giving yourself this time. Let us see your tree, and then choose a few practices to tend this season.",
            "Well done. Your tree is planted, and your first season begins today. Next, we will build your Growth Plan together.",
            "You did it. Your tree is ready to see, and your Growth Plan is the next step."
          ]
        ],
        "tips": T_oak,
        "enter": ENTER
      },
      "full": {
        "open": [
          [
            "Welcome back. Let us see how your tree is growing, one question at a time, for the past two weeks.",
            "Good to see you again. Settle in, take a breath, and we will walk through all six parts together.",
            "Time for a check-in. Answer with what is true right now, and notice how far you have come.",
            "Here we go again, one part at a time. Your answers stay on this device."
          ]
        ],
        "mid": {
          "every": 5,
          "lines": [
            "You are doing well. Keep going at your own pace.",
            "Nice and steady. Each answer helps your tree come into view.",
            "Thank you for being honest with yourself. That is the whole work here.",
            "Take a breath if you like. We will keep going when you are ready.",
            "Good. Your first answer is usually the truest one.",
            "You are making good progress. Every part of you matters here.",
            "Honest answers draw the clearest picture. This time is a gift to yourself."
          ]
        },
        "close": [
          [
            "That is the whole check-in. Thank you. Let us look at your tree and see what has grown.",
            "Well done. Your tree is ready. Take a look, and if a part is calling for attention, we can refresh your Growth Plan.",
            "Thank you for checking in. Growth is easiest to see over time, and today adds to the picture."
          ]
        ],
        "tips": T_oak,
        "enter": ENTER
      },
      "season": {
        "open": [
          [
            "You have tended a whole season. This check-in adds a ring to your tree. Let us see how it has grown.",
            "Twelve weeks of tending. Well done. Let us walk through your tree once more and mark the season.",
            "A season check-in. Think about the past two weeks, and let your answers show where you are now."
          ]
        ],
        "mid": {
          "every": 5,
          "lines": [
            "You are doing well. Keep going at your own pace.",
            "Nice and steady. Each answer helps your tree come into view.",
            "Thank you for being honest with yourself. That is the whole work here.",
            "Take a breath if you like. We will keep going when you are ready.",
            "Good. Your first answer is usually the truest one.",
            "You are making good progress. Every part of you matters here.",
            "Honest answers draw the clearest picture. This time is a gift to yourself."
          ]
        },
        "close": [
          [
            "A new ring for your tree. Thank you for tending it so steadily. Let us see it, then choose what you will tend next season.",
            "That is the season check-in. Every ring on an oak started as an ordinary day. Your next season begins now.",
            "Well done. Your tree carries this season with it. Let us look, and set your Growth Plan for the season ahead."
          ]
        ],
        "tips": T_oak,
        "enter": ENTER
      },
      "quick": {
        "open": [
          [
            "A quick check-in: one question for each part of your tree. About two minutes.",
            "Just six questions today, one for each part. Answer from the past two weeks.",
            "A short check-in to stay in touch with your tree. Here is the first question."
          ]
        ],
        "mid": {
          "every": 4,
          "lines": [
            "Good. Just a few more.",
            "Nice. You are almost there.",
            "Halfway. Nice work.",
            "Thank you. A few more to go."
          ]
        },
        "close": [
          [
            "That is it. Thank you for checking in. Let us see your tree.",
            "Done. Quick check-ins keep you in touch with your tree between full ones.",
            "Thank you. A quick look is a good way to stay close to what matters."
          ]
        ],
        "tips": T_oak
      },
      "week": {
        "open": [
          [
            "Your weekly check-in. Eight short questions about this past week.",
            "Let us look back on your week, one question at a time.",
            "A few questions about this past week, then a moment to reflect if you like."
          ]
        ],
        "mid": {
          "every": 4,
          "lines": [
            "Good. Just a few more.",
            "Nice. You are almost there.",
            "Halfway. Nice work.",
            "Thank you. A few more to go."
          ]
        },
        "close": [
          [
            "That is your week. Take a moment with this week's reflection if you like.",
            "Thank you. Week by week, your tree tells its story.",
            "Saved for the week. Small and steady is how an oak grows."
          ]
        ],
        "tips": T_oak
      },
      "together": {
        "open": [
          [
            "Welcome, both of you. One of you answers, and the other taps. We will go one question at a time.",
            "Thank you for doing this together. Take your time with each question, and let every answer be welcome.",
            "A check-in shared. Answer in your own words, and your helper will tap the choice."
          ]
        ],
        "mid": {
          "every": 5,
          "lines": [
            "You are both doing well. Keep going at your own pace.",
            "Thank you. Each answer helps the tree come into view.",
            "Take a breath together if you like. We will continue when you are ready.",
            "Good. Steady and honest is just right."
          ]
        },
        "close": [
          [
            "That is every part. Thank you both. The check-in is saved to their tree, marked as taken together.",
            "Well done, both of you. Let us look at the tree together."
          ]
        ],
        "tips": T_oak,
        "enter": ENTER
      },
      "plan": {
        "open": [
          [
            "Now let us build your Growth Plan. We will go one part at a time, starting with your Growing Edge, and you will choose one to three practices for each.",
            "Let us choose what you will tend this season. Start small: one to three practices for a part is plenty.",
            "Here comes the fun part. For each part of your tree, pick the practices that fit your life right now."
          ]
        ],
        "part": {
          "roots": [
            "Your roots hold you steady when life shakes. A small practice here keeps you anchored.",
            "Roots grow quietly, out of sight. A few quiet minutes here feed everything above."
          ],
          "trunk": [
            "Your trunk is your sense of purpose. Tending it helps a hard day feel like part of something larger.",
            "A clear sense of what you live for gives your days a spine. Choose a practice that brings your values into ordinary life."
          ],
          "bark": [
            "Your bark is how you calm down and heal over. A practice here gives you a tool for the next hard moment.",
            "Healthy bark heals over well. Pick something you can reach for when stress shows up."
          ],
          "branches": [
            "Your branches are your people. Tending them keeps support flowing both ways.",
            "The more branches a tree has, the more life it can hold. Choose one way to reach toward someone."
          ],
          "leaves": [
            "Your leaves are your body: rest, movement, and nourishment. Small, steady habits here lift every other part.",
            "Your body often speaks first. A simple practice here helps you listen and respond."
          ],
          "fruit": [
            "Your fruit is hope. A practice here helps you notice the good that is still growing.",
            "Fruit is what a tree grows toward. Choose a practice that keeps something good in view."
          ]
        },
        "close": [
          "Here's what you're tending this season.",
          [
            "Your practices are waiting for you in Today. Small and steady is how an oak grows.",
            "Well chosen. Start with one practice tomorrow, and let the rest follow.",
            "Your Growth Plan is set. You can change it any time as your season unfolds."
          ]
        ]
      }
    }
  };
})();
