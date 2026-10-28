/* =====================================================================
   GUIDED CHECK-IN SCRIPT . HEARTWOOD (shared/guided/heartwood.js), GWG BLD 886
   The spoken guide moments for Heartwood's guided Before the Vows check-in
   for two (each partner on their own, in their own locked box), read by
   shared/gg-guided.js (window.GGGuided).
   Questions are never copied here. Heartwood's questions are sealed
   (heartwood/lib-heartwood.js, opened by heartwood/open.js into
   window.BTV_Q); the engine reads them live from BTV_Q.questions (by area)
   and BTV_Q.scale, and their spoken clips play as Jenny's locked clips with
   Heartwood's audio key (window.HW_AUDIO), the way Heartwood's Learn does.
   Only these open guide lines are public. Area ids match BTV_Q.areas (the
   open sample, heartwood/sample.js, shows all ten), plus two for Two
   Traditions, One Home.

   Kinds: full (Before the Vows, each partner on their own). The Monthly
   Check-in for Two and the First-Year Check-in are written reflections and
   stay as forms. Heartwood has no Growth Plan; Practices for Two stay as
   they are, so there is no kinds.plan.
   Slots: open, mid {every, lines}, tips {area: lines}, close, plus extras:
   wording (before the Faith or Plain choice), safety (before Just for You),
   handoff (when one device passes to the other partner).
   Helplines are never spoken: Just for You keeps its own text lines.
   Jenny narrates Heartwood (Heartwood's Learn, sealed: voice jenny).
   ===================================================================== */
(function () {
  'use strict';
  window.GG_GUIDED = window.GG_GUIDED || {};

  // Spoken after an answer that leans toward Disagree, a place the two of you can grow.
  var TIPS = {
    talk: [
      'Thank you for answering honestly. Talking and listening are skills, and couples grow them together.',
      'A set time to talk, and a gentle start, can make hard things easier to say.'
    ],
    repair: [
      'Every couple disagrees. Coming back together well is something you can practice.',
      'Noticing this now is a strength. Talk About This will give the two of you a place to start.'
    ],
    money: [
      'Money carries feelings for everyone. Naming them early helps you build a plan you both trust.',
      'The Money Map is a good place to lay this out side by side.'
    ],
    family: [
      'The families you come from shape the family you are starting. Talking it through helps you choose together.',
      'Thank you for your honesty. This is a good conversation to have early.'
    ],
    home: [
      'Fair feels different to each person. Saying what fair looks like to you is a great first step.',
      'Who does what can be talked about, tried, and adjusted together.'
    ],
    expect: [
      'Everyone brings a picture of married life. Saying yours out loud helps the two pictures meet.',
      'Thank you. Hopes said early become plans you share.'
    ],
    kids: [
      'Whether, when, and how: each is worth talking through, gently and honestly.',
      'Thank you for answering as things are today. This is a good one to talk over together.'
    ],
    fun: [
      'Time together, time apart, and time with friends all help a marriage breathe.',
      'Planning one easy, enjoyable thing together is a lovely place to start.'
    ],
    health: [
      'How each of you handles hard days matters. Knowing it helps you support each other well.',
      'Healthy rhythms of rest, food, and movement are easier to build as a team.'
    ],
    dreams: [
      'Where you are headed together is worth saying out loud, often.',
      'Thank you for your honesty. Shared dreams grow when you talk about them.'
    ],
    two: [
      'Two traditions in one home can be a rich gift. Talking about how you will honor both helps.',
      'Thank you. Each of you gets to share what matters most from your tradition.'
    ]
  };

  window.GG_GUIDED.heartwood = {
    voice: 'jenny',
    kinds: {
      full: {
        open: [
          'Welcome. This is your part of Before the Vows, just for you.',
          'Answer for yourself, as things are today. Your answers stay locked with your passcode until the two of you sit down together.',
          'We will go one statement at a time. Choose how much you agree, and skip any you like.',
          'Take a breath. Here is the first one.'
        ],
        wording: [
          'This area asks about faith and spirit. Choose Faith or Plain wording, whichever fits you. Either way, your answers line up with your partner’s.',
          'Pick the words that fit you best, Faith or Plain. Both lead to the same conversation.'
        ],
        mid: { every: 6, lines: [
          'You are doing great. Keep answering as things are today.',
          'Thank you for your honesty. Every answer helps the two of you talk well.',
          'A quick breath, then on to the next.',
          'Honest answers make the best conversations later.',
          'Nice. You can lock and step away anytime, and pick up right here.',
          'Steady and honest. Keep going.'
        ] },
        tips: TIPS,
        safety: [
          'These last few questions are just for you. Your answers stay on this screen, with you alone.',
          'One last page, only for you. Answer only if you feel safe doing so right now.'
        ],
        handoff: [
          'Thank you. Your answers are locked. Now hand the device to your partner for their turn.',
          'Your part is done and locked. Your partner’s turn begins with their own passcode.'
        ],
        close: [
          'Thank you. Your part of Before the Vows is complete and locked with your passcode.',
          'When you have both finished, sit together and open Talk About This.',
          'The places you see differently are some of the best conversations you will have. Well done.'
        ]
      }
    }
  };
})();
