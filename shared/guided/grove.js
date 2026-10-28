/* =====================================================================
   GUIDED CHECK-IN SCRIPT . THE GROVE (shared/guided/grove.js), GWG BLD 886
   The spoken guide moments for The Grove's guided Group Check-in and the
   guided Growth Plan, read by shared/gg-guided.js (window.GGGuided).
   Questions are never copied here: the engine reads them live from The
   Grove (questionsFor(kind) and qList(kind, quick) in grove/app.js, which
   read window.GROVE_KINDS.questions in grove/kinds.js), so the spoken
   question is always the grove's own question text, Faith or Plain.

   The Grove's way: an inclusive "we", one shared answer for the whole
   circle, talked over together. Every line here fits each kind of grove
   (Family, Classroom, Faith Community, Small Group, Team) and both Faith and
   Plain wording, so no line speaks of faith. Jenny narrates The Grove
   (shared/gg-learn.js VOICES.grove).

   Kinds: full (24 questions), quick (6 questions), plan (the Growth Plan).
   The Grove has no separate first check-in; its first full check-in uses
   full, and start is given too for a grove's very first time.
   Slots: open, mid {every, lines}, tips {part: lines}, close, plus extras the
   engine may use: changes (before What's Changed Lately), differ (after We
   See It Differently), pass (after Pass), kidsFirst (once, when children
   answer first). Plan extras: edges, anchor, youngest, strength, words.
   Crisis lines are never spoken: The Grove's own help card stays on screen.
   ===================================================================== */
(function () {
  'use strict';
  window.GG_GUIDED = window.GG_GUIDED || {};

  // Spoken after a shared answer that shows a Growing Edge in that part.
  var TIPS = {
    roots: [
      'Thank you for naming that together. Roots grow in small, steady moments.',
      'A short pause together, a thank you said out loud, a few quiet minutes: small things steady a whole circle.',
      'This is a good part to grow. Our Growth Plan can start right here.',
      'What steadies us can be as simple as a shared moment at the start of the day.'
    ],
    trunk: [
      'Noticing this together is already a step. What matters most to us can make room for itself again.',
      'Every person has a part that matters here. Naming it out loud helps.',
      'When days get full, one small shared purpose can bring us back to center.',
      'Thank you for being honest. Our plan can help protect what matters most.'
    ],
    bark: [
      'It takes courage to name how things really feel. Thank you.',
      'Calm can be learned together: a slow breath, a pause, a kind word after a hard moment.',
      'Coming back to each other after a hard moment is a skill that grows with practice.',
      'This part grows well with gentle, steady practice. We can start small.'
    ],
    branches: [
      'Reaching toward each other is how branches grow. One small reach a day counts.',
      'Time together, with screens set aside, is one of the easiest places to begin.',
      'Thank you for noticing this. A spoken thank you to each other is a good first step.',
      'When everyone gets a say, people feel closer. We can practice that together.'
    ],
    leaves: [
      'Rest, real food, and moving together lift the whole circle.',
      'A shared walk, a meal together, or an earlier evening are good places to start.',
      'Our rhythm can make room for rest. Small changes add up.',
      'Thank you for naming this. Leaves grow quickly once they get a little sun and water.'
    ],
    fruit: [
      'Something to look forward to together can grow from one simple plan.',
      'Celebrating small good moments helps us see the good more often.',
      'Hope grows when we share it. Name one good thing coming up.',
      'Thank you for your honesty. Seeing the good is a practice, and we can practice it together.'
    ]
  };

  var DIFFER = [
    'Seeing it differently is good to know. We will keep this one as a Thing to Talk About.',
    'Thank you. Different views are welcome here. We will come back to this one together.',
    'That one goes on our list of Things to Talk About, gently, later.'
  ];
  var PASS = [
    'Passing is perfectly fine. On to the next one.',
    'We will let that one rest for now.'
  ];
  var KIDS_FIRST = [
    'Let the children answer first, so their voices shape our answer.',
    'Children first: let the youngest share, then the grown-ups.'
  ];
  var CHANGES = [
    'Before the questions, what has changed for us lately? Tap any that fit. This helps choose practices and keeps every answer just as it is.',
    'First, a quick look at our season. What has changed lately? Tap any that fit.'
  ];

  window.GG_GUIDED.grove = {
    voice: 'jenny',
    kinds: {
      start: {
        open: [
          'Welcome to our first check-in together. We are glad you gathered.',
          'Here is how it works. We will hear one question at a time. Talk it over, then choose one answer for all of us.',
          'Not Yet, Sometimes, Often, or Almost Always. When we see it differently, there is a button for that. Pass skips a question.',
          'This is a conversation, simply a look at how we are growing. Ready? Here is the first one.'
        ],
        changes: CHANGES,
        kidsFirst: KIDS_FIRST,
        mid: { every: 4, lines: [
          'Nice work, everyone. On to the next part of our tree.',
          'Thank you for talking that through together.',
          'Every voice helps. Take a breath, and here comes the next part.',
          'We are growing as we go. Keep sharing.',
          'Good listening, all of you. A few more.',
          'That is one more part of our tree in light. Onward.'
        ] },
        tips: TIPS,
        differ: DIFFER,
        pass: PASS,
        close: [
          'We did it. Our grove has its first ring.',
          'Look at what we noticed together: our Shared Strengths, what is Steady, and our Growing Edges.',
          'Next, we can make our Growth Plan together, in about five minutes.',
          'Thank you, everyone, for showing up for each other.'
        ]
      },
      full: {
        open: [
          'Welcome back, everyone. Time for our full check-in.',
          'One question at a time. Talk it over, and settle on one answer together.',
          'When we see it differently, choose We See It Differently. Pass is always fine.',
          'Let us begin.'
        ],
        changes: CHANGES,
        kidsFirst: KIDS_FIRST,
        mid: { every: 4, lines: [
          'Thank you. On to the next part of our tree.',
          'Good talking, everyone. Here comes the next part.',
          'We are doing well. Keep it honest and kind.',
          'Every part has its seasons. Onward together.',
          'Nice. A quick stretch if anyone needs one, then the next part.',
          'Another part in light. We are more than halfway there.'
        ] },
        tips: TIPS,
        differ: DIFFER,
        pass: PASS,
        close: [
          'Well done, everyone. Our grove has a new ring.',
          'Let us look at our Shared Strengths and our Growing Edges together.',
          'Our Growth Plan can grow right from here, with a practice or two for the season ahead.',
          'Thank you for growing together.'
        ]
      },
      quick: {
        open: [
          'A quick check-in: six questions, one for each part of our tree.',
          'Talk each one over briefly, and choose one answer together.',
          'Short and simple. Here we go.'
        ],
        changes: CHANGES,
        kidsFirst: KIDS_FIRST,
        mid: { every: 3, lines: [
          'Halfway there. Thank you, everyone.',
          'Three more. Nice work together.',
          'Good sharing. On we go.'
        ] },
        tips: TIPS,
        differ: DIFFER,
        pass: PASS,
        close: [
          'Thank you, everyone. That is a snapshot of our week.',
          'A quick check-in shows how this week feels. A full check-in adds a ring to our grove.',
          'Back to our plan and our practices. Well done.'
        ]
      },
      plan: {
        open: [
          'Let us make our Growth Plan together. It takes about five minutes.',
          'We will start with one or two Growing Edges, then choose a few practices, each tied to a time we are already together.',
          'Anything can be changed later. Simply choose what feels right for this season.'
        ],
        edges: [
          'First, our Growing Edges. The suggested ones come from our check-in, and any part can be chosen.',
          'Pick one or two parts to grow this season.'
        ],
        part: {
          roots: [
            'Roots are what steady us. Growing here gives every other part something to stand on.',
            'When our roots are tended, hard seasons feel more held.'
          ],
          trunk: [
            'Trunk is what we live for together. Growing here helps us keep what matters most at the center.',
            'A shared purpose makes ordinary days feel like they count.'
          ],
          bark: [
            'Bark is how we meet big feelings. Growing here helps our time together feel calmer and safer.',
            'Learning to settle together helps everyone come back to each other sooner.'
          ],
          branches: [
            'Branches are how we reach toward each other. Growing here helps everyone feel they belong.',
            'Real time together is the heart of a grove.'
          ],
          leaves: [
            'Leaves are rest, food, movement, and play. Growing here gives everyone more energy for each other.',
            'A steadier rhythm of rest, meals, and movement lifts the whole circle.'
          ],
          fruit: [
            'Fruit is what we look forward to and what we give. Growing here helps us see the good together.',
            'Shared hope and celebration make a season feel full.'
          ]
        },
        anchor: [
          'Now, when will we do it? Tie each practice to a time we are already together.',
          'Pick a time we already share, like a meal, a meeting, or the end of the day. That is how routines stick.'
        ],
        youngest: [
          'Now the youngest gets to choose one practice for the plan.',
          'Let the youngest pick one. Their choice belongs in our plan too.'
        ],
        strength: [
          'One more: a practice from a part that is already strong, so we keep growing what works.',
          'Keep one Shared Strength going. Choose a practice we already enjoy.'
        ],
        words: [
          'If you like, add a line about what this plan means to us, or a tradition of our own.',
          'Our own words are welcome here, and they are optional.'
        ],
        close: [
          'Here is what we are tending this season.',
          'Twelve weeks together, with a quick check-in at weeks four and eight, and a full check-in at week twelve.',
          'Our plan is saved and locked with the grove. Well done, everyone.'
        ]
      }
    }
  };
})();
