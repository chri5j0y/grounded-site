/* =====================================================================
   HEALTH AND ABILITY LEARN VIDEOS (shared/learn-life.js)   GWG BLD 756, HA 1, October 2026
   Generated from data by the build (worker V, gen.py) so every quote is escaped. Edit the data, not this file.
   window.GG_LEARN_LIFE[app] = {eyebrow, title, intro, tracks: [{id, kind: 'support', group: 'life', title, who, lessons}]}
   for maple, aspen, pine, birch, oak, sequoia (7 each: a how-to on the setting, then 6 support videos) and grove (2).
   Lessons play in shared/gg-learn.js exactly like learn-lessons.js support videos, and add two keys:
     life   the Health and Ability choice ids each video fits (GGLife.order sorts fitting videos first; [] fits everyone)
     howto  true on the how-to video for the setting
   Loaded on demand by gg-learn.js only when Learn opens (learn-lessons.js is already large).
   ===================================================================== */
(function () {
  if (window.GG_LEARN_LIFE) return;
  window.GG_LEARN_LIFE = {
   "version": "hl1",
   "maple": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "maple-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos for kids, and one for the grown-up",
      "lessons": [
       {
        "id": "mp-ha-howto",
        "n": 1,
        "title": "Health and Ability, Set Together",
        "mins": 3,
        "blurb": "For the grown-up: how to set Health and Ability with your child.",
        "for": "grownup",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "Health and Ability",
          "sub": "Set it with your child, in the grown-up view.",
          "say": "This short video is for the grown-up. It shows a setting called Health and Ability, and how to set it with your child."
         },
         {
          "k": "big",
          "h": "Maple can fit your child’s body and health.",
          "sub": "It adds and reorders, and keeps everything.",
          "say": "Some children live with a health condition, move or hear or see differently, or learn in their own way. Some have a brother or sister who does. Health and Ability lets Maple fit them. It only adds and reorders, and every guide and activity stays one tap away for everyone."
         },
         {
          "k": "screen",
          "app": "maple",
          "app_name": "Maple",
          "title": "Their Health and Ability",
          "rows": [
           [
            "A Health Condition",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "Hearing Differently",
            ""
           ],
           [
            "Learning and Attention",
            ""
           ],
           [
            "Someone in Our Family",
            ""
           ],
           [
            "None Right Now",
            ""
           ]
          ],
          "tap": 0,
          "panel": {
           "h": "Choose together",
           "sub": "Pick as many as fit, or none.",
           "items": [
            "I’d Rather Not Say turns on gentler ways",
            "Change it any time",
            "Clear My Choices erases it"
           ]
          },
          "say": "In the grown-up view, open Settings and tap Their Health and Ability. Sit with your child and choose together. Pick anything that is part of their life right now, as many as fit, or none. I’d Rather Not Say is there too, and it still turns on gentler ways."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit your child show at the top of When Life Changes, under Picked for You. Activities and practices with a gentler way show first, tagged Fits You. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways show first"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Good to know",
          "say": "Your child’s choice stays locked inside their profile, on this device. The check-in questions and scores stay exactly the same, and so do the safety questions. Your child sees only the help it adds. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Locked on this device",
            "Inside your child’s profile"
           ],
           [
            "Questions and scores stay the same",
            "Safety questions too"
           ],
           [
            "Only the effects show",
            "Your child sees only the help"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it together.",
          "sub": "Or tap Maybe Later. It waits in Settings.",
          "say": "If you like, ask your child now: what would help Maple fit you? Then choose together, or come back to it any time.",
          "beats": [
           {
            "t": "If you like, ask your child now: what would help Maple fit you?",
            "w": 10
           },
           "Then choose together, or come back to it any time."
          ]
         }
        ]
       },
       {
        "id": "mp-ha-doctor",
        "n": 2,
        "title": "Doctor Day Calm",
        "mins": 2,
        "blurb": "Squeeze and let go, and one question ready, before a doctor visit.",
        "for": "kids",
        "sources": [],
        "life": [
         "health",
         "moving",
         "hearing",
         "seeing",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "Doctor Day Calm",
          "sub": "For the waiting room, or the car on the way.",
          "say": "Hi, friend! Some days have a doctor visit, or a test, or a visit with the nurse. Here is a way to feel calm and ready."
         },
         {
          "k": "big",
          "h": "Lots of kids feel wiggly before a visit.",
          "sub": "Nervous, bored, or brave. All of it is okay.",
          "say": "Before a visit, some kids feel nervous. Some feel bored, or brave, or all three at once. Every feeling is okay."
         },
         {
          "k": "points",
          "h": "Squeeze and let go",
          "say": "Let us try squeeze and let go. Make two tight fists and squeeze, squeeze, squeeze. Now let go, and make your hands floppy, like noodles. Notice how soft and warm they feel.",
          "items": [
           [
            "Make two tight fists",
            "Squeeze, squeeze, squeeze"
           ],
           [
            "Now let go",
            "Floppy hands, like noodles"
           ],
           [
            "Notice the difference",
            "Soft and warm"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Now you try, three times.",
          "sub": "Squeeze. Let go. Squeeze. Let go.",
          "say": "Now you do it three times, all by yourself. Squeeze, then let go, nice and slow, and I will wait for you.",
          "beats": [
           "Now you do it three times, all by yourself.",
           {
            "t": "Squeeze, then let go, nice and slow, and I will wait for you.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "One question, ready to ask",
          "say": "You can bring one question with you. Will this hurt? What happens next? Can my grown-up stay with me? Pick one, or think of your own.",
          "items": [
           "Will this hurt?",
           "What happens next?",
           "Can my grown-up stay with me?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          },
          "beats": [
           "You can bring one question with you.",
           "Will this hurt?",
           "What happens next?",
           "Can my grown-up stay with me?",
           {
            "t": "Pick one, or think of your own.",
            "p": 3
           }
          ]
         },
         {
          "k": "big",
          "h": "Doctors and nurses like questions.",
          "sub": "Your grown-up can help you ask.",
          "say": "Doctors and nurses are glad when kids ask questions. If the words get stuck, your grown-up can help you ask."
         },
         {
          "k": "big",
          "h": "You are brave in your own way.",
          "sub": "Squeeze and let go works anywhere.",
          "say": "Squeeze and let go works anywhere: in the car, in the waiting room, even on the doctor’s table. You are brave in your own way."
         }
        ]
       },
       {
        "id": "mp-ha-body",
        "n": 3,
        "title": "My Body Is on My Team",
        "mins": 2,
        "blurb": "A kind hello to each part of your body. Skip any part you like.",
        "for": "kids",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "moving",
         "hearing",
         "seeing",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "My Body Is on My Team",
          "sub": "A kind hello to each part.",
          "say": "Hi, friend! Let us say a kind hello to your body. You can sit, lie down, or stay just how you are."
         },
         {
          "k": "big",
          "h": "Every body works its own way.",
          "sub": "Wheels, braces, hearing aids, and glasses are part of the team too.",
          "say": "Every body works its own way. Some bodies use wheels, or braces, or hearing aids, or glasses. They are part of the team too."
         },
         {
          "k": "big",
          "h": "You can skip any part.",
          "sub": "Just think, skip!",
          "say": "As we go, you can skip any part you want. Just think, skip, and we will move on together."
         },
         {
          "k": "points",
          "h": "Hello, body",
          "say": "Think about your feet or your legs, and say, hello, thank you. Now your tummy, going up and down as you breathe. Now your hands, and give them a little wiggle if they like. Now pick one more part you like, and give it a kind hello, while I wait.",
          "items": [
           [
            "Your feet or legs",
            "Hello, thank you"
           ],
           [
            "Your tummy",
            "Up and down"
           ],
           [
            "Your hands",
            "A little wiggle"
           ],
           [
            "One more part",
            "Your choice"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Think about your feet or your legs, and say, hello, thank you.",
            "p": 3
           },
           {
            "t": "Now your tummy, going up and down as you breathe.",
            "p": 3
           },
           {
            "t": "Now your hands, and give them a little wiggle if they like.",
            "p": 3
           },
           {
            "t": "Now pick one more part you like, and give it a kind hello, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "breathe",
          "h": "One slow team breath",
          "sub": "In while it grows. Out while it shrinks.",
          "hold": 12,
          "say": "Now one slow breath for your whole team. Breathe in while the circle grows, and out while it shrinks."
         },
         {
          "k": "big",
          "h": "Your body is on your team.",
          "sub": "Tell a safe grown-up when something hurts.",
          "say": "Even on hard days, your body is on your team. And you can always tell a safe grown-up when something hurts or feels wrong."
         }
        ]
       },
       {
        "id": "mp-ha-rest",
        "n": 4,
        "title": "When My Body Needs a Rest",
        "mins": 2,
        "blurb": "Turtle Rest, for tired, achy, or sick days.",
        "for": "kids",
        "sources": [],
        "life": [
         "health",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "When My Body Needs a Rest",
          "sub": "Resting is a smart choice.",
          "say": "Hi, friend. Some days your body feels tired, or achy, or sick. Let us learn a cozy way to rest."
         },
         {
          "k": "big",
          "h": "Rest helps your body.",
          "sub": "Even big, strong trees rest in winter.",
          "say": "Resting is a smart thing your body asks for. It helps your body get strong again. Even big, strong trees rest in winter."
         },
         {
          "k": "points",
          "h": "Turtle Rest",
          "say": "Let us do Turtle Rest. First, get cozy, sitting or lying down. Pull in like a turtle in its shell, with soft shoulders. Now take slow breaths in your cozy shell.",
          "items": [
           [
            "Get cozy",
            "Sit or lie down"
           ],
           [
            "Pull in, like a turtle",
            "Soft shoulders"
           ],
           [
            "Slow breaths",
            "In your cozy shell"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Rest in your shell.",
          "sub": "Slow and cozy.",
          "say": "Stay in your shell for a few slow breaths, and I will wait for you.",
          "beats": [
           {
            "t": "Stay in your shell for a few slow breaths, and I will wait for you.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "If something hurts, tell a grown-up.",
          "sub": "Show where, and how big: small, medium, or big.",
          "say": "If something hurts, tell a grown-up. Show them where it hurts, and how big the hurt is: small, medium, or big."
         },
         {
          "k": "big",
          "h": "Rest days count.",
          "sub": "Your tree is gentle on rest days too.",
          "say": "Rest days count. In Maple, your tree is gentle on rest days too."
         }
        ]
       },
       {
        "id": "mp-ha-ask",
        "n": 5,
        "title": "Telling a Grown-up What I Need",
        "mins": 2,
        "blurb": "Short words that help, and practice saying one out loud.",
        "for": "kids",
        "sources": [],
        "life": [
         "health",
         "moving",
         "hearing",
         "seeing",
         "learning",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "Telling a Grown-up What I Need",
          "sub": "Short words that help.",
          "say": "Hi, friend! Sometimes you need something, and it is hard to say. Let us practice some short words that help."
         },
         {
          "k": "big",
          "h": "Grown-ups want to know.",
          "sub": "Teachers, parents, nurses, and coaches.",
          "say": "Your grown-ups want to know what helps you. Teachers, parents, nurses, and coaches can help most when they know."
         },
         {
          "k": "words",
          "h": "Words that help",
          "say": "Here are some words that help. I need a break. Can you say that again? Can I sit down? It is too loud for me. I need help with this.",
          "items": [
           "I need a break.",
           "Can you say that again?",
           "Can I sit down?",
           "It is too loud for me.",
           "I need help with this."
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4,
            5
           ]
          }
         },
         {
          "k": "big",
          "h": "Now you try.",
          "sub": "Pick one, and say it out loud.",
          "say": "Pick one of those, and say it out loud, nice and clear. Go ahead, and I will wait for you.",
          "beats": [
           "Pick one of those, and say it out loud, nice and clear.",
           {
            "t": "Go ahead, and I will wait for you.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Every way of telling counts.",
          "sub": "A card, a sign, a picture, or a tap.",
          "say": "You can also use a card, a hand sign, a picture, or a tap on the shoulder. Every way of telling counts."
         },
         {
          "k": "big",
          "h": "Your needs matter.",
          "sub": "Asking is brave.",
          "say": "Your needs matter. Asking is brave, and you can do it."
         }
        ]
       },
       {
        "id": "mp-ha-join",
        "n": 6,
        "title": "My Way Counts Too",
        "mins": 2,
        "blurb": "Wiggle What Wiggles, and ways to ask to join in.",
        "for": "kids",
        "sources": [],
        "life": [
         "moving",
         "health",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "My Way Counts Too",
          "sub": "Join in, your own way.",
          "say": "Hi, friend! There are lots of ways to play, move, and join in. Your way counts too."
         },
         {
          "k": "big",
          "h": "Every way of moving counts.",
          "sub": "Rolling, wiggling, stretching, clapping, nodding.",
          "say": "Some kids run. Some kids roll, or use crutches, or a wheelchair. Some kids wiggle their fingers, nod, or clap. Every way of moving counts."
         },
         {
          "k": "points",
          "h": "Wiggle What Wiggles",
          "say": "Let us play Wiggle What Wiggles. Wiggle your fingers. Lift your shoulders up and down. Nod your head yes, slowly. Now wiggle anything else that likes to wiggle, while I wait.",
          "items": [
           [
            "Fingers",
            "Wiggle, wiggle"
           ],
           [
            "Shoulders",
            "Up and down"
           ],
           [
            "Head",
            "Nod yes, slowly"
           ],
           [
            "Anything else",
            "Your choice"
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
          "beats": [
           "Let us play Wiggle What Wiggles.",
           {
            "t": "Wiggle your fingers.",
            "p": 2
           },
           {
            "t": "Lift your shoulders up and down.",
            "p": 2
           },
           {
            "t": "Nod your head yes, slowly.",
            "p": 2
           },
           {
            "t": "Now wiggle anything else that likes to wiggle, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "You can ask for a way to join.",
          "sub": "Can we play it sitting down?",
          "say": "If a game does not fit your body, you can ask for a way to join. You could ask, can we play it sitting down? Or, can I be the one who keeps score?"
         },
         {
          "k": "big",
          "h": "Your way counts too.",
          "sub": "The best games have room for everyone.",
          "say": "The best games have room for everyone. Your way counts too."
         }
        ]
       },
       {
        "id": "mp-ha-asks",
        "n": 7,
        "title": "When Someone Asks About Me",
        "mins": 2,
        "blurb": "Things you can say when other kids ask about your body.",
        "for": "kids",
        "sources": [],
        "life": [
         "moving",
         "hearing",
         "seeing",
         "autism",
         "health",
         "learning"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "maple",
          "eyebrow": "Health and Ability",
          "h": "When Someone Asks About Me",
          "sub": "You choose what to say.",
          "say": "Hi, friend. Sometimes other kids ask about your body, your wheelchair, your hearing aids, or how you do things. You get to choose what to say."
         },
         {
          "k": "big",
          "h": "Most kids ask because they wonder.",
          "sub": "You choose your words.",
          "say": "Most kids ask because they are curious. Some ask kindly, and some do not. Either way, you choose your words."
         },
         {
          "k": "words",
          "h": "Things you can say",
          "say": "Here are some things you can say. That is how my body works. It helps me hear. I can tell you later. I do not want to talk about it right now.",
          "items": [
           "That is how my body works.",
           "It helps me hear.",
           "I can tell you later.",
           "I don’t want to talk about it right now."
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Practice one.",
          "sub": "Say it in your head, or out loud.",
          "say": "Pick one you like, and say it in your head or out loud, while I wait.",
          "beats": [
           {
            "t": "Pick one you like, and say it in your head or out loud, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "If someone is unkind, tell a grown-up.",
          "sub": "Teasing is never your fault.",
          "say": "If someone teases you or keeps being unkind, tell a grown-up you trust. Teasing is never your fault."
         },
         {
          "k": "big",
          "h": "You are you.",
          "sub": "And that is a great thing to be.",
          "say": "You are you, and that is a great thing to be."
         }
        ]
       }
      ]
     }
    ]
   },
   "aspen": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "aspen-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos for students, to use any time",
      "lessons": [
       {
        "id": "as-ha-howto",
        "n": 1,
        "title": "How Health and Ability Works",
        "mins": 3,
        "blurb": "A setting that helps Aspen fit your body and your health.",
        "for": "you",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "How Health and Ability Works",
          "sub": "A setting that helps Aspen fit you.",
          "say": "This video shows a setting called Health and Ability. It helps Aspen fit your body and your health."
         },
         {
          "k": "big",
          "h": "Choose what is part of your life right now.",
          "sub": "Or none. Pick as many as fit.",
          "say": "Health and Ability lets you choose anything that is part of your life right now. Maybe a health condition, pain or headaches that keep coming back, or a body that moves its own way. Maybe you learn differently, or someone close to you lives with something. Pick as many as fit, or none."
         },
         {
          "k": "screen",
          "app": "aspen",
          "app_name": "Aspen",
          "title": "Their Health and Ability",
          "rows": [
           [
            "A Long-Term Health Condition",
            ""
           ],
           [
            "Pain or Headaches That Keep Coming Back",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "None Right Now",
            ""
           ],
           [
            "I’d Rather Not Say",
            ""
           ]
          ],
          "tap": 0,
          "panel": {
           "h": "Choose together",
           "sub": "With your grown-up, in the grown-up view.",
           "items": [
            "As many as fit, or none",
            "Change it any time",
            "Clear My Choices erases it"
           ]
          },
          "say": "Your grown-up opens it in the grown-up view, where it says Their Health and Ability. Then you choose together. None Right Now and I’d Rather Not Say are there too."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit you show at the top of When Life Changes, under Picked for You. Activities and practices with a gentler way show first, tagged Fits You. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways show first"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Good to know",
          "say": "It stays locked inside your profile, on this device, and your questions and scores stay the same. Show Gentler Ways First, in Settings, works for anyone, with no choice needed. Rest Week, on Today, holds your tree still for a hard week. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Locked on this device",
            "Questions and scores stay the same"
           ],
           [
            "Show Gentler Ways First",
            "For anyone"
           ],
           [
            "Rest Week",
            "One tap on Today"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "What would help Aspen fit you?",
          "sub": "Choose with your grown-up, or tap Maybe Later.",
          "say": "Take a moment and think: what would help Aspen fit you best? When you are ready, choose it with your grown-up.",
          "beats": [
           {
            "t": "Take a moment and think: what would help Aspen fit you best?",
            "w": 10
           },
           "When you are ready, choose it with your grown-up."
          ]
         }
        ]
       },
       {
        "id": "as-ha-roughday",
        "n": 2,
        "title": "A Rough Body Day",
        "mins": 2,
        "blurb": "Plan a smaller, kinder day when your body is loud.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "A Rough Body Day",
          "sub": "Plan a smaller, kinder day.",
          "say": "Some days your body is louder than usual. Pain, tiredness, or a health thing makes everything harder. Here is a way to reset the day."
         },
         {
          "k": "big",
          "h": "Your energy is like a phone battery.",
          "sub": "Some days start at 30 percent.",
          "say": "Think of your energy like a phone battery. Some days start full. Some days start at thirty percent. On a thirty percent day, you plan differently."
         },
         {
          "k": "points",
          "h": "Reset the day",
          "say": "Here is the reset. Pick the one thing that matters most today. Let one thing go, or move it to tomorrow. And ask for one bit of help, from a grown-up, a teacher, or a friend.",
          "items": [
           [
            "Pick one thing that matters most",
            "Just one"
           ],
           [
            "Let one thing go",
            "Or move it to tomorrow"
           ],
           [
            "Ask for one help",
            "A grown-up, a teacher, or a friend"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it now.",
          "sub": "One thing that matters. One thing to let go.",
          "say": "Think about today, and pick the one thing that matters most, and one thing you can let go, while I wait.",
          "beats": [
           {
            "t": "Think about today, and pick the one thing that matters most, and one thing you can let go, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "A smaller day is still a good day.",
          "sub": "Rest counts.",
          "say": "A smaller day is still a good day. Rest counts, and so does asking for help."
         },
         {
          "k": "big",
          "h": "Let a grown-up know how your body is doing.",
          "sub": "The school nurse can help too.",
          "say": "Let a parent, a grandparent, or the school nurse know how your body is doing. If something feels very wrong, tell a grown-up right away."
         }
        ]
       },
       {
        "id": "as-ha-pain",
        "n": 3,
        "title": "Breathing Around Pain",
        "mins": 2,
        "blurb": "Soften around pain or a headache with slow breaths.",
        "for": "you",
        "sources": [],
        "life": [
         "pain",
         "health"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "Breathing Around Pain",
          "sub": "For pain or a headache that keeps coming back.",
          "say": "When pain or a headache shows up, your whole body can tense up around it. Tensing up can make it feel louder. Let us try breathing around it."
         },
         {
          "k": "big",
          "h": "Make a little room around it.",
          "sub": "You can soften around it.",
          "say": "You can set down the fight, and make a little room around the pain."
         },
         {
          "k": "points",
          "h": "How to do it",
          "say": "Get comfy, sitting or lying down. Notice where the pain is, with kindness. Then breathe out long, and let the muscles around it soften.",
          "items": [
           [
            "Get comfy",
            "Sit or lie down"
           ],
           [
            "Notice where it is",
            "Just notice"
           ],
           [
            "Breathe out long",
            "Let the muscles around it soften"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "breathe",
          "h": "Breathe around it",
          "sub": "In for four. Out for six.",
          "hold": 14,
          "say": "Follow the circle. In for four, and out for six. With each breath out, let the muscles around the pain go a little softer."
         },
         {
          "k": "big",
          "h": "Three more, on your own.",
          "sub": "Softer each time.",
          "say": "Now take three more slow breaths on your own, softening a little each time, while I wait.",
          "beats": [
           {
            "t": "Now take three more slow breaths on your own, softening a little each time, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Even a little softer counts.",
          "sub": "Shoulders, jaw, and hands.",
          "say": "Notice your shoulders, your jaw, and your hands. Even a little softer counts."
         },
         {
          "k": "big",
          "h": "Tell someone about pain that keeps coming back.",
          "sub": "A parent, the school nurse, or your doctor.",
          "say": "If pain or headaches keep coming back, tell a parent, the school nurse, or your doctor. If pain is sudden or very bad, tell a grown-up right away."
         }
        ]
       },
       {
        "id": "as-ha-nurse",
        "n": 4,
        "title": "Before the Nurse or the Doctor",
        "mins": 2,
        "blurb": "Three things to have ready, and words for the room.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "moving",
         "hearing",
         "seeing",
         "learning",
         "autism",
         "mind"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "Before the Nurse or the Doctor",
          "sub": "Three things to have ready.",
          "say": "Going to the nurse or a doctor visit can feel like a lot. A little planning makes it easier."
         },
         {
          "k": "big",
          "h": "You know your body best.",
          "sub": "What you notice matters.",
          "say": "You are the one who lives in your body. What you notice matters, so it helps to have it ready."
         },
         {
          "k": "points",
          "h": "Three things ready",
          "say": "First, what is going on: when it started, and how it feels. Second, what helps, and what makes it worse. Third, one question you want answered.",
          "items": [
           [
            "What is going on",
            "When it started, how it feels"
           ],
           [
            "What helps",
            "And what makes it worse"
           ],
           [
            "One question",
            "Something you want to know"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Make your list.",
          "sub": "On your phone, on paper, or in your head.",
          "say": "Think of a visit coming up, or one from before, and name your three things, while I wait.",
          "beats": [
           {
            "t": "Think of a visit coming up, or one from before, and name your three things, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "Words for the room",
          "say": "In the room, these words can help. Can you say that another way? Can my grown-up stay? Can I have a minute?",
          "items": [
           "Can you say that another way?",
           "Can my grown-up stay?",
           "Can I have a minute?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "You can speak up for yourself.",
          "sub": "That is a skill you are building.",
          "say": "Every time you speak up, you are building a skill. And your grown-up can back you up, any time."
         }
        ]
       },
       {
        "id": "as-ha-tell",
        "n": 5,
        "title": "Telling Someone What You Need",
        "mins": 2,
        "blurb": "A simple three-step way to ask a teacher, a coach, or a friend.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "moving",
         "hearing",
         "seeing",
         "learning",
         "autism",
         "mind"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "Telling Someone What You Need",
          "sub": "A teacher, a coach, or a friend.",
          "say": "Sometimes you need something at school, and it is hard to say it. Let us practice a simple way to ask."
         },
         {
          "k": "big",
          "h": "Asking is a strength.",
          "sub": "People help more when they know.",
          "say": "Asking for what you need is a strength. Teachers, coaches, and friends can help more when they know."
         },
         {
          "k": "points",
          "h": "A simple way to ask",
          "say": "Here is a simple way. First, say what is going on, like, my headache is back today. Then say what would help, like, sitting near the door. Then say thanks.",
          "items": [
           [
            "Say what is going on",
            "My headache is back today"
           ],
           [
            "Say what would help",
            "Sitting near the door would help"
           ],
           [
            "Say thanks",
            "That helps a lot"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try one.",
          "sub": "A real one, or a made-up one.",
          "say": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
          "beats": [
           {
            "t": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "You choose how much to share.",
          "sub": "You choose how much to explain.",
          "say": "You choose how much to share. You choose how much to explain, and to whom."
         },
         {
          "k": "big",
          "h": "Go to a grown-up you trust.",
          "sub": "A parent, the school counselor, or the nurse.",
          "say": "If asking does not work, go to a grown-up you trust, like a parent, the school counselor, or the nurse. They can help you ask again."
         }
        ]
       },
       {
        "id": "as-ha-scan",
        "n": 6,
        "title": "A Body Kindness Scan",
        "mins": 2,
        "blurb": "A slow, kind check-in with your body. Skip any part you want.",
        "for": "you",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "pain",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "A Body Kindness Scan",
          "sub": "Skip any part you want.",
          "say": "This is a slow, kind check-in with your body. You can sit or lie down. And you can skip any part you want."
         },
         {
          "k": "big",
          "h": "Skipping is always okay.",
          "sub": "Every way of doing this is welcome.",
          "say": "If a part hurts, or feels hard to think about, just skip it. Every way of doing this is welcome."
         },
         {
          "k": "points",
          "h": "Part by part",
          "say": "Start with your feet and legs, or skip them, and just notice how they feel. Now your belly and chest, rising and falling as you breathe. Now your hands and arms, heavy or light. Last, your shoulders and face, letting them go soft if they can, and I will wait.",
          "items": [
           [
            "Feet and legs",
            "Or skip them"
           ],
           [
            "Belly and chest",
            "Rising and falling"
           ],
           [
            "Hands and arms",
            "Heavy or light"
           ],
           [
            "Shoulders and face",
            "Soft, if they can be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Start with your feet and legs, or skip them, and just notice how they feel.",
            "p": 4
           },
           {
            "t": "Now your belly and chest, rising and falling as you breathe.",
            "p": 4
           },
           {
            "t": "Now your hands and arms, heavy or light.",
            "p": 4
           },
           {
            "t": "Last, your shoulders and face, letting them go soft if they can, and I will wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Say one kind thing to your body.",
          "sub": "Thanks for getting me through today.",
          "say": "Now say one kind thing to your body. Something like, thanks for getting me through today."
         },
         {
          "k": "big",
          "h": "Your body is doing its best.",
          "sub": "Come back to this whenever you want.",
          "say": "Your body is doing its best, and so are you. Come back to this whenever you want."
         }
        ]
       },
       {
        "id": "as-ha-rest",
        "n": 7,
        "title": "Rest Without Guilt",
        "mins": 2,
        "blurb": "For sick days, missed days, and slow days.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "aspen",
          "eyebrow": "Health and Ability",
          "h": "Rest Without Guilt",
          "sub": "For sick days, missed days, and slow days.",
          "say": "Missing school, sitting out, or resting while others keep going can bring up guilt. This video is a reminder that rest is part of getting better."
         },
         {
          "k": "big",
          "h": "Rest is part of the plan.",
          "sub": "It is how bodies heal and recharge.",
          "say": "Rest is part of moving forward. It is how bodies heal and recharge."
         },
         {
          "k": "words",
          "h": "Kind things to tell yourself",
          "say": "Here are some kind things to tell yourself. Rest is part of the plan. I can catch up a little at a time. I matter more than my to-do list.",
          "items": [
           "Rest is part of the plan.",
           "I can catch up a little at a time.",
           "I matter more than my to-do list."
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Pick one.",
          "sub": "Say it to yourself, slowly.",
          "say": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
          "beats": [
           {
            "t": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "points",
          "h": "Catching up, a little at a time",
          "say": "Ask a teacher what matters most to catch up on. Do one small piece a day. And use the help you have, like the nurse, or a plan at school.",
          "items": [
           [
            "Ask what matters most",
            "Your teacher can help sort it"
           ],
           [
            "One small piece a day",
            "Small pieces add up"
           ],
           [
            "Use the help you have",
            "The nurse, or a plan at school"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Resting today helps tomorrow.",
          "sub": "Be as kind to yourself as you would be to a friend.",
          "say": "Resting today helps tomorrow. Be as kind to yourself as you would be to a friend."
         }
        ]
       }
      ]
     }
    ]
   },
   "pine": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "pine-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos to use any time",
      "lessons": [
       {
        "id": "pn-ha-howto",
        "n": 1,
        "title": "How Health and Ability Works",
        "mins": 3,
        "blurb": "A setting that helps Pine fit your body and your health.",
        "for": "you",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "How Health and Ability Works",
          "sub": "Make Pine fit your body and your health.",
          "say": "This video shows Health and Ability, a setting that helps Pine fit your body and your health. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Choose what is part of your life right now.",
          "sub": "Or none. As many as fit.",
          "say": "Open Settings, or Manage My Profile, and tap Health and Ability. Choose anything that is part of your life right now: a health condition, pain or fatigue, a disability, a mental health condition, or someone close to you living with one. Pick as many as fit, or None Right Now, or I’d Rather Not Say."
         },
         {
          "k": "screen",
          "app": "pine",
          "app_name": "Pine",
          "title": "Health and Ability",
          "rows": [
           [
            "A Long-Term Health Condition",
            ""
           ],
           [
            "Chronic Pain or Fatigue",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "Deaf or Hard of Hearing",
            ""
           ],
           [
            "Learning and Attention",
            ""
           ],
           [
            "None Right Now",
            ""
           ]
          ],
          "tap": 1,
          "panel": {
           "h": "Choose what fits",
           "sub": "Each choice has one plain line.",
           "items": [
            "As many as fit, or none",
            "I’d Rather Not Say turns on gentler ways",
            "Change it any time"
           ]
          },
          "say": "Each choice has one plain line, so you can see what it means. I’d Rather Not Say still turns on gentler ways, without naming anything."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit you show at the top of When Life Changes, under Picked for You. Practices with a gentler way show first, tagged Fits You, with their seated, lying down, or shorter way. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways first, with the adapted way"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Yours alone",
          "say": "Only you set it, and only your passcode opens it. It stays yours alone, and alerts leave it out. Your questions and scores stay the same, safety questions too. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Only you set it",
            "Only your passcode opens it"
           ],
           [
            "It stays yours alone",
            "Alerts leave it out"
           ],
           [
            "Questions and scores stay the same",
            "Safety questions too"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "card",
          "title": "Want Grounded to fit your body and health?",
          "body": "You can choose in Settings.",
          "btns": [
           "Choose Now",
           "Maybe Later"
          ],
          "tap": 0,
          "say": "After your first full check-in, a small card offers this once. Choose Now opens it, and Maybe Later leaves it waiting in Settings."
         },
         {
          "k": "big",
          "h": "For anyone: gentler ways and rest.",
          "sub": "Show Gentler Ways First, in Settings. Rest Week, on Today.",
          "say": "Show Gentler Ways First, in Settings, puts seated, short, and gentle ways first, for anyone. Rest Week, on Today, holds your tree still for a hard week, with everything kept."
         },
         {
          "k": "big",
          "h": "What would help Pine fit you?",
          "sub": "Choose now, or any time later.",
          "say": "Take a moment and think: what would help Pine fit you best? Choose it now, or any time later in Settings.",
          "beats": [
           {
            "t": "Take a moment and think: what would help Pine fit you best?",
            "w": 10
           },
           "Choose it now, or any time later in Settings."
          ]
         }
        ]
       },
       {
        "id": "pn-ha-flare",
        "n": 2,
        "title": "A Flare-Day Reset",
        "mins": 2,
        "blurb": "Count your spoons, spend them on what matters, and let the rest wait.",
        "for": "you",
        "sources": [
         "miserandino"
        ],
        "life": [
         "pain",
         "health",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "A Flare-Day Reset",
          "sub": "When your body sets the pace today.",
          "say": "Some days your condition flares, and the plan you had does not fit anymore. This is a reset for those days. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Some days start with fewer spoons.",
          "sub": "Every task uses a little energy.",
          "say": "Some people picture their energy as a handful of spoons. Every task, like a shower, a class, or practice, uses a spoon or two. On a flare day, you start with fewer."
         },
         {
          "k": "points",
          "h": "Reset the day",
          "say": "Here is the reset. First, count your spoons for today, roughly. Then pick what matters most, and spend spoons there first. Drop, shrink, or swap the rest, or ask for help with it. And keep one spoon back, for the unexpected.",
          "items": [
           [
            "Count your spoons",
            "Roughly is fine"
           ],
           [
            "Spend them on what matters",
            "That one thing first"
           ],
           [
            "Drop, shrink, or swap the rest",
            "Or ask for help"
           ],
           [
            "Keep one spoon back",
            "For the unexpected"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it now.",
          "sub": "Your spoons, and your one thing.",
          "say": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
          "beats": [
           {
            "t": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Pacing is a skill.",
          "sub": "A smaller day can mean more good days after.",
          "say": "Pacing is a skill, and it takes practice. Doing less on a flare day can mean more good days after."
         },
         {
          "k": "big",
          "h": "Your tree can rest too.",
          "sub": "Rest Week, on Today, holds it still.",
          "say": "In Pine, Rest Week on Today holds your tree still for a hard week. And if a flare feels different or scary, tell your doctor, the school nurse, or a parent right away."
         }
        ]
       },
       {
        "id": "pn-ha-pain",
        "n": 3,
        "title": "Breathing Around Pain",
        "mins": 2,
        "blurb": "Slow breaths that soften the body around pain.",
        "for": "you",
        "sources": [],
        "life": [
         "pain",
         "health",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "Breathing Around Pain",
          "sub": "Make a little room around it.",
          "say": "When pain shows up, the body often tightens around it. That tightness can make the pain feel louder. Let us try breathing around it."
         },
         {
          "k": "big",
          "h": "You can soften around it.",
          "sub": "Make a little room around it instead.",
          "say": "You can set down the fight and the push, and make a little room around the pain."
         },
         {
          "k": "points",
          "h": "How to do it",
          "say": "Find a position that is a little easier, sitting, lying down, or even in a classroom chair. Notice where the pain is, with kindness. Then breathe out long, and let the muscles around it soften.",
          "items": [
           [
            "Find an easier position",
            "Any position counts"
           ],
           [
            "Notice where it is",
            "Just notice"
           ],
           [
            "Breathe out long",
            "Soften the muscles around it"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "breathe",
          "h": "Breathe around it",
          "sub": "In for four. Out for six.",
          "hold": 14,
          "say": "Follow the circle. In for four, and out for six. With each breath out, let the muscles around the pain go a little softer."
         },
         {
          "k": "big",
          "h": "Three more, on your own.",
          "sub": "Softer each time.",
          "say": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
          "beats": [
           {
            "t": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Even a little softer counts.",
          "sub": "Jaw, shoulders, and hands.",
          "say": "Notice your jaw, your shoulders, and your hands. Even a little softer counts."
         },
         {
          "k": "big",
          "h": "Pain that changes needs a call.",
          "sub": "Your doctor, or 911 in an emergency.",
          "say": "If pain is new, sudden, or very bad, tell a grown-up right away, or call nine one one in an emergency."
         }
        ]
       },
       {
        "id": "pn-ha-appt",
        "n": 4,
        "title": "Before an Appointment",
        "mins": 2,
        "blurb": "Three things to bring, and words that help in the room.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "Before an Appointment",
          "sub": "Taking over your own health, one visit at a time.",
          "say": "Visits with a doctor can be short, and it is easy to forget what you meant to say. A few minutes of planning helps a lot."
         },
         {
          "k": "big",
          "h": "You know how you feel.",
          "sub": "What you notice matters.",
          "say": "You are the one who lives in your body every day. What you notice matters, so bring it with you."
         },
         {
          "k": "points",
          "h": "Bring three things",
          "say": "First, what has changed since last time. Second, your medicines, and how they are going. Third, your questions, with the most important one first.",
          "items": [
           [
            "What has changed",
            "Since last time"
           ],
           [
            "Your medicines",
            "And how they are going"
           ],
           [
            "Your questions",
            "The most important one first"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Write your top question now.",
          "sub": "In your phone, or on paper.",
          "say": "Write down your most important question now, or say it to yourself, while I wait.",
          "beats": [
           {
            "t": "Write down your most important question now, or say it to yourself, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "Words that help in the room",
          "say": "These words can help in the room. Can you explain that another way? What should I watch for? Can I talk with you on my own for a minute?",
          "items": [
           "Can you explain that another way?",
           "What should I watch for?",
           "Can I talk with you on my own for a minute?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Little by little, it becomes yours.",
          "sub": "Your grown-up can be your backup while you learn.",
          "say": "Start with one thing, like answering the first question yourself, or calling in a refill. Your grown-up can be your backup while you learn."
         }
        ]
       },
       {
        "id": "pn-ha-rest",
        "n": 5,
        "title": "Rest Without Guilt",
        "mins": 2,
        "blurb": "Rest as part of the plan, and kind words for slow days.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "Rest Without Guilt",
          "sub": "Rest is part of the plan.",
          "say": "Missing school, sitting out of practice, or canceling plans can bring up guilt. This video is a reminder that rest is part of living well."
         },
         {
          "k": "big",
          "h": "Rest is part of the plan.",
          "sub": "It is how bodies heal and recharge.",
          "say": "Rest is part of moving forward. It is how bodies heal, recharge, and get ready for the next good day."
         },
         {
          "k": "words",
          "h": "Kind things to tell yourself",
          "say": "Here are some kind things to tell yourself. Rest is part of the plan. I matter more than my to-do list. Today I am doing what my body needs.",
          "items": [
           "Rest is part of the plan.",
           "I matter more than my to-do list.",
           "Today I am doing what my body needs."
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Pick one.",
          "sub": "Say it slowly, two or three times.",
          "say": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
          "beats": [
           {
            "t": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "points",
          "h": "Rest that restores",
          "say": "Real rest can be lying down with your eyes closed. It can be sitting by a window, or listening to music. And it can be time with someone who lets you be as you are.",
          "items": [
           [
            "Lying down",
            "Eyes closed"
           ],
           [
            "Sitting quietly",
            "A window, or music"
           ],
           [
            "Easy company",
            "Someone who lets you be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Be as kind to yourself as you would be to a friend.",
          "sub": "Need to talk? Call or text 988, any time.",
          "say": "Be as kind to yourself as you would be to a friend. If the heaviness will not lift, tell a parent, a counselor, or another grown-up you trust, or call or text nine eight eight, any time."
         }
        ]
       },
       {
        "id": "pn-ha-tell",
        "n": 6,
        "title": "Telling Someone What You Need",
        "mins": 2,
        "blurb": "A simple three-step way to ask for what helps.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism",
         "close"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "Telling Someone What You Need",
          "sub": "A simple way to ask.",
          "say": "Asking for what you need can be one of the hardest parts of living with a condition. Let us practice a simple way to do it."
         },
         {
          "k": "big",
          "h": "Asking is a strength.",
          "sub": "People help more when they know.",
          "say": "Asking for what you need is a strength. People like a teacher, a coach, a boss at work, or a friend can help more when they know."
         },
         {
          "k": "points",
          "h": "Three short steps",
          "say": "Here are three short steps. First, say what is going on, like, my energy is low today. Then say what would help, like, could I take the test in a quieter room? Then thank them.",
          "items": [
           [
            "Say what is going on",
            "My energy is low today."
           ],
           [
            "Say what would help",
            "Could I take the test in a quieter room?"
           ],
           [
            "Thank them",
            "Thanks, that helps a lot."
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try one.",
          "sub": "A real one, or a made-up one.",
          "say": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
          "beats": [
           {
            "t": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "You choose how much to share.",
          "sub": "You choose how much of your story to share.",
          "say": "You choose how much to share. You can ask for what helps and share only as much of your story as you choose."
         },
         {
          "k": "big",
          "h": "Help is easier with a plan.",
          "sub": "A plan at school can help.",
          "say": "At school, a 504 plan or an IEP can put what helps in writing. And a parent, a counselor, or another grown-up you trust can help you ask again if the first try does not land."
         }
        ]
       },
       {
        "id": "pn-ha-scan",
        "n": 7,
        "title": "A Body Kindness Scan",
        "mins": 2,
        "blurb": "A slow, kind check-in with your body. Skip any part you want.",
        "for": "you",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "pain",
         "moving",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "pine",
          "eyebrow": "Health and Ability",
          "h": "A Body Kindness Scan",
          "sub": "Skip any part you want.",
          "say": "This is a slow, kind check-in with your body. You can do it sitting, lying down, or even in a classroom chair. And you can skip any part, any time."
         },
         {
          "k": "big",
          "h": "Skipping is always okay.",
          "sub": "Every way of doing this is welcome.",
          "say": "If a part hurts, is missing, or is hard to think about, simply skip it. Every way of doing this is welcome."
         },
         {
          "k": "points",
          "h": "Part by part",
          "say": "Start with your feet and legs, or skip them, and notice how they feel. Now your belly and chest, rising and falling as you breathe. Now your hands and arms, heavy or light. Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
          "items": [
           [
            "Feet and legs",
            "Or skip them"
           ],
           [
            "Belly and chest",
            "Rising and falling"
           ],
           [
            "Hands and arms",
            "Heavy or light"
           ],
           [
            "Shoulders, neck, and face",
            "Soft, if they can be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Start with your feet and legs, or skip them, and notice how they feel.",
            "p": 4
           },
           {
            "t": "Now your belly and chest, rising and falling as you breathe.",
            "p": 4
           },
           {
            "t": "Now your hands and arms, heavy or light.",
            "p": 4
           },
           {
            "t": "Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Say one kind thing to your body.",
          "sub": "Thank you for getting me through today.",
          "say": "Now say one kind thing to your body. Something like, thank you for getting me through today."
         },
         {
          "k": "big",
          "h": "Your body is doing its best.",
          "sub": "Come back to this whenever you want.",
          "say": "Your body is doing its best, and so are you. Come back to this whenever you want."
         }
        ]
       }
      ]
     }
    ]
   },
   "birch": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "birch-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos to use any time",
      "lessons": [
       {
        "id": "br-ha-howto",
        "n": 1,
        "title": "How Health and Ability Works",
        "mins": 3,
        "blurb": "A setting that helps Birch fit your body and your health.",
        "for": "you",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "How Health and Ability Works",
          "sub": "Make Birch fit your body and your health.",
          "say": "This video shows Health and Ability, a setting that helps Birch fit your body and your health. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Choose what is part of your life right now.",
          "sub": "Or none. As many as fit.",
          "say": "Open Settings, or Manage My Profile, and tap Health and Ability. Choose anything that is part of your life right now: a health condition, pain or fatigue, a disability, a mental health condition, a serious illness, or someone close to you living with one. Pick as many as fit, or None Right Now, or I’d Rather Not Say."
         },
         {
          "k": "screen",
          "app": "birch",
          "app_name": "Birch",
          "title": "Health and Ability",
          "rows": [
           [
            "A Long-Term Health Condition",
            ""
           ],
           [
            "Chronic Pain or Fatigue",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "Deaf or Hard of Hearing",
            ""
           ],
           [
            "A Mental Health Condition",
            ""
           ],
           [
            "None Right Now",
            ""
           ]
          ],
          "tap": 1,
          "panel": {
           "h": "Choose what fits",
           "sub": "Each choice has one plain line.",
           "items": [
            "As many as fit, or none",
            "I’d Rather Not Say turns on gentler ways",
            "Change it any time"
           ]
          },
          "say": "Each choice has one plain line, so you can see what it means. I’d Rather Not Say still turns on gentler ways, without naming anything."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit you show at the top of When Life Changes, under Picked for You. Practices with a gentler way show first, tagged Fits You, with their seated, lying down, or shorter way. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways first, with the adapted way"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Yours to share, if you choose",
          "say": "It stays locked in your profile, on this device. Helpers never see it, unless you turn on Share My Health and Ability with my helpers. Your questions and scores stay the same, safety questions too. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Locked on this device",
            "Inside your profile"
           ],
           [
            "Private from helpers",
            "Unless you turn sharing on"
           ],
           [
            "Questions and scores stay the same",
            "Safety questions too"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "card",
          "title": "Want Grounded to fit your body and health?",
          "body": "You can choose in Settings.",
          "btns": [
           "Choose Now",
           "Maybe Later"
          ],
          "tap": 0,
          "say": "After your first full check-in, a small card offers this once. Choose Now opens it, and Maybe Later leaves it waiting in Settings."
         },
         {
          "k": "big",
          "h": "For anyone: gentler ways and rest.",
          "sub": "Show Gentler Ways First, in Settings. Rest Week, on Today.",
          "say": "Show Gentler Ways First, in Settings, puts seated, short, and gentle ways first, for anyone. Rest Week, on Today, holds your tree still for a hard week, with everything kept."
         },
         {
          "k": "big",
          "h": "What would help Birch fit you?",
          "sub": "Choose now, or any time later.",
          "say": "Take a moment and think: what would help Birch fit you best? Choose it now, or any time later in Settings.",
          "beats": [
           {
            "t": "Take a moment and think: what would help Birch fit you best?",
            "w": 10
           },
           "Choose it now, or any time later in Settings."
          ]
         }
        ]
       },
       {
        "id": "br-ha-flare",
        "n": 2,
        "title": "A Flare-Day Reset",
        "mins": 2,
        "blurb": "Count your spoons, spend them on what matters, and let the rest wait.",
        "for": "you",
        "sources": [
         "miserandino"
        ],
        "life": [
         "pain",
         "health",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "A Flare-Day Reset",
          "sub": "When your body sets the pace today.",
          "say": "Some days your condition flares, and the plan you had does not fit anymore. This is a reset for those days. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Some days start with fewer spoons.",
          "sub": "Every task uses a little energy.",
          "say": "Some people picture their energy as a handful of spoons. Every task, like a shower, a class, a shift, or a phone call, uses a spoon or two. On a flare day, you start with fewer."
         },
         {
          "k": "points",
          "h": "Reset the day",
          "say": "Here is the reset. First, count your spoons for today, roughly. Then pick what matters most, and spend spoons there first. Drop, shrink, or swap the rest, or ask for help with it. And keep one spoon back, for the unexpected.",
          "items": [
           [
            "Count your spoons",
            "Roughly is fine"
           ],
           [
            "Spend them on what matters",
            "That one thing first"
           ],
           [
            "Drop, shrink, or swap the rest",
            "Or ask for help"
           ],
           [
            "Keep one spoon back",
            "For the unexpected"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it now.",
          "sub": "Your spoons, and your one thing.",
          "say": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
          "beats": [
           {
            "t": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Pacing is a skill.",
          "sub": "A smaller day can mean more good days after.",
          "say": "Pacing is a skill, and it takes practice. Doing less on a flare day can mean more good days after."
         },
         {
          "k": "big",
          "h": "Your tree can rest too.",
          "sub": "Rest Week, on Today, holds it still.",
          "say": "In Birch, Rest Week on Today holds your tree still for a hard week, with everything kept. And if a flare feels different or scary, call your doctor or clinic."
         }
        ]
       },
       {
        "id": "br-ha-pain",
        "n": 3,
        "title": "Breathing Around Pain",
        "mins": 2,
        "blurb": "Slow breaths that soften the body around pain.",
        "for": "you",
        "sources": [],
        "life": [
         "pain",
         "health",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "Breathing Around Pain",
          "sub": "Make a little room around it.",
          "say": "When pain shows up, the body often tightens around it. That tightness can make the pain feel louder. Let us try breathing around it."
         },
         {
          "k": "big",
          "h": "You can soften around it.",
          "sub": "Make a little room around it instead.",
          "say": "You can set down the fight and the push, and make a little room around the pain."
         },
         {
          "k": "points",
          "h": "How to do it",
          "say": "Find a position that is a little easier, sitting, lying down, or on a break. Notice where the pain is, with kindness. Then breathe out long, and let the muscles around it soften.",
          "items": [
           [
            "Find an easier position",
            "Any position counts"
           ],
           [
            "Notice where it is",
            "Just notice"
           ],
           [
            "Breathe out long",
            "Soften the muscles around it"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "breathe",
          "h": "Breathe around it",
          "sub": "In for four. Out for six.",
          "hold": 14,
          "say": "Follow the circle. In for four, and out for six. With each breath out, let the muscles around the pain go a little softer."
         },
         {
          "k": "big",
          "h": "Three more, on your own.",
          "sub": "Softer each time.",
          "say": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
          "beats": [
           {
            "t": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Even a little softer counts.",
          "sub": "Jaw, shoulders, and hands.",
          "say": "Notice your jaw, your shoulders, and your hands. Even a little softer counts."
         },
         {
          "k": "big",
          "h": "Pain that changes needs a call.",
          "sub": "Your doctor, or 911 in an emergency.",
          "say": "If pain is new, sudden, or very different, call your doctor or clinic, or nine one one in an emergency."
         }
        ]
       },
       {
        "id": "br-ha-appt",
        "n": 4,
        "title": "Before an Appointment",
        "mins": 2,
        "blurb": "Three things to bring, and words that help in the room.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "Before an Appointment",
          "sub": "Getting the most out of a short visit.",
          "say": "Visits with a doctor can be short, and it is easy to forget what you meant to say. A few minutes of planning helps a lot."
         },
         {
          "k": "big",
          "h": "You know how you feel.",
          "sub": "What you notice matters.",
          "say": "You are the one who lives in your body every day. What you notice matters, so bring it with you."
         },
         {
          "k": "points",
          "h": "Bring three things",
          "say": "First, what has changed since last time. Second, your medicines, and how they are going. Third, your questions, with the most important one first.",
          "items": [
           [
            "What has changed",
            "Since last time"
           ],
           [
            "Your medicines",
            "And how they are going"
           ],
           [
            "Your questions",
            "The most important one first"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Write your top question now.",
          "sub": "In your phone, or on paper.",
          "say": "Write down your most important question now, or say it to yourself, while I wait.",
          "beats": [
           {
            "t": "Write down your most important question now, or say it to yourself, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "Words that help in the room",
          "say": "These words can help in the room. Can you explain that another way? What should I watch for? What are my choices?",
          "items": [
           "Can you explain that another way?",
           "What should I watch for?",
           "What are my choices?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "You are part of the team.",
          "sub": "Your questions belong in the room.",
          "say": "You are part of your own team. Your questions belong in the room, every time."
         }
        ]
       },
       {
        "id": "br-ha-rest",
        "n": 5,
        "title": "Rest Without Guilt",
        "mins": 2,
        "blurb": "Rest as part of the plan, and kind words for slow days.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "Rest Without Guilt",
          "sub": "Rest is part of the plan.",
          "say": "Missing class, calling in sick, or canceling plans can bring up guilt, especially when everyone around you seems to keep going. This video is a reminder that rest is part of living well."
         },
         {
          "k": "big",
          "h": "Rest is part of the plan.",
          "sub": "It is how bodies heal and recharge.",
          "say": "Rest is part of moving forward. It is how bodies heal, recharge, and get ready for the next good day."
         },
         {
          "k": "words",
          "h": "Kind things to tell yourself",
          "say": "Here are some kind things to tell yourself. Rest is part of the plan. I matter more than my to-do list. Today I am doing what my body needs.",
          "items": [
           "Rest is part of the plan.",
           "I matter more than my to-do list.",
           "Today I am doing what my body needs."
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Pick one.",
          "sub": "Say it slowly, two or three times.",
          "say": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
          "beats": [
           {
            "t": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "points",
          "h": "Rest that restores",
          "say": "Real rest can be lying down with your eyes closed. It can be sitting by a window, or listening to music. And it can be time with someone who lets you be as you are.",
          "items": [
           [
            "Lying down",
            "Eyes closed"
           ],
           [
            "Sitting quietly",
            "A window, or music"
           ],
           [
            "Easy company",
            "Someone who lets you be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Be as kind to yourself as you would be to a friend.",
          "sub": "Need to talk? Call or text 988, any time.",
          "say": "Be as kind to yourself as you would be to a friend. If the heaviness will not lift, call or text nine eight eight, any time."
         }
        ]
       },
       {
        "id": "br-ha-tell",
        "n": 6,
        "title": "Telling Someone What You Need",
        "mins": 2,
        "blurb": "A simple three-step way to ask for what helps.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism",
         "close"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "Telling Someone What You Need",
          "sub": "A simple way to ask.",
          "say": "Asking for what you need can be one of the hardest parts of living with a condition. Let us practice a simple way to do it."
         },
         {
          "k": "big",
          "h": "Asking is a strength.",
          "sub": "People help more when they know.",
          "say": "Asking for what you need is a strength. People like a professor, a boss, a roommate, or a friend can help more when they know."
         },
         {
          "k": "points",
          "h": "Three short steps",
          "say": "Here are three short steps. First, say what is going on, like, i live with a condition that flares sometimes. Then say what would help, like, could I have extra time, or a quieter space? Then thank them.",
          "items": [
           [
            "Say what is going on",
            "I live with a condition that flares sometimes."
           ],
           [
            "Say what would help",
            "Could I have extra time, or a quieter space?"
           ],
           [
            "Thank them",
            "Thanks, that helps me do my best work."
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try one.",
          "sub": "A real one, or a made-up one.",
          "say": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
          "beats": [
           {
            "t": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "You choose how much to share.",
          "sub": "You choose how much of your story to share.",
          "say": "You choose how much to share. You can ask for what helps and share only as much of your story as you choose."
         },
         {
          "k": "big",
          "h": "Help is easier with a plan.",
          "sub": "Disability services at college, or a written ask at work.",
          "say": "At college, the disability services office can help set up accommodations. At work, it often helps to ask in writing. And a friend, a mentor, or someone in your family can help you ask again if the first try does not land."
         }
        ]
       },
       {
        "id": "br-ha-scan",
        "n": 7,
        "title": "A Body Kindness Scan",
        "mins": 2,
        "blurb": "A slow, kind check-in with your body. Skip any part you want.",
        "for": "you",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "pain",
         "moving",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "birch",
          "eyebrow": "Health and Ability",
          "h": "A Body Kindness Scan",
          "sub": "Skip any part you want.",
          "say": "This is a slow, kind check-in with your body. You can do it sitting, lying down, or on a break. And you can skip any part, any time."
         },
         {
          "k": "big",
          "h": "Skipping is always okay.",
          "sub": "Every way of doing this is welcome.",
          "say": "If a part hurts, is missing, or is hard to think about, simply skip it. Every way of doing this is welcome."
         },
         {
          "k": "points",
          "h": "Part by part",
          "say": "Start with your feet and legs, or skip them, and notice how they feel. Now your belly and chest, rising and falling as you breathe. Now your hands and arms, heavy or light. Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
          "items": [
           [
            "Feet and legs",
            "Or skip them"
           ],
           [
            "Belly and chest",
            "Rising and falling"
           ],
           [
            "Hands and arms",
            "Heavy or light"
           ],
           [
            "Shoulders, neck, and face",
            "Soft, if they can be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Start with your feet and legs, or skip them, and notice how they feel.",
            "p": 4
           },
           {
            "t": "Now your belly and chest, rising and falling as you breathe.",
            "p": 4
           },
           {
            "t": "Now your hands and arms, heavy or light.",
            "p": 4
           },
           {
            "t": "Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Say one kind thing to your body.",
          "sub": "Thank you for getting me through today.",
          "say": "Now say one kind thing to your body. Something like, thank you for getting me through today."
         },
         {
          "k": "big",
          "h": "Your body is doing its best.",
          "sub": "Come back to this whenever you want.",
          "say": "Your body is doing its best, and so are you. Come back to this whenever you want."
         }
        ]
       }
      ]
     }
    ]
   },
   "oak": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "oak-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos to use any time",
      "lessons": [
       {
        "id": "ok-ha-howto",
        "n": 1,
        "title": "How Health and Ability Works",
        "mins": 3,
        "blurb": "A setting that helps Oak fit your body and your health.",
        "for": "you",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "How Health and Ability Works",
          "sub": "Make Oak fit your body and your health.",
          "say": "This video shows Health and Ability, a setting that helps Oak fit your body and your health. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Choose what is part of your life right now.",
          "sub": "Or none. As many as fit.",
          "say": "Open Settings, or Manage My Profile, and tap Health and Ability. Choose anything that is part of your life right now: a health condition, pain or fatigue, a disability, a mental health condition, a serious illness, memory or thinking changes, or someone close to you living with one. Pick as many as fit, or None Right Now, or I’d Rather Not Say."
         },
         {
          "k": "screen",
          "app": "oak",
          "app_name": "Oak",
          "title": "Health and Ability",
          "rows": [
           [
            "A Long-Term Health Condition",
            ""
           ],
           [
            "Chronic Pain or Fatigue",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "Blind or Low Vision",
            ""
           ],
           [
            "A Mental Health Condition",
            ""
           ],
           [
            "None Right Now",
            ""
           ]
          ],
          "tap": 1,
          "panel": {
           "h": "Choose what fits",
           "sub": "Each choice has one plain line.",
           "items": [
            "As many as fit, or none",
            "I’d Rather Not Say turns on gentler ways",
            "Change it any time"
           ]
          },
          "say": "Each choice has one plain line, so you can see what it means. I’d Rather Not Say still turns on gentler ways, without naming anything."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit you show at the top of When Life Changes, under Picked for You. Practices with a gentler way show first, tagged Fits You, with their seated, lying down, or shorter way. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways first, with the adapted way"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Good to know",
          "say": "It stays locked in your profile, on this device, and nothing about it ever leaves. Visit cards, The Grove, and printed plans never carry it. Your questions and scores stay the same, safety questions too. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Locked on this device",
            "It stays here"
           ],
           [
            "Kept private",
            "Left out of Visit cards, The Grove, and printed plans"
           ],
           [
            "Questions and scores stay the same",
            "Safety questions too"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "card",
          "title": "Want Grounded to fit your body and health?",
          "body": "You can choose in Settings.",
          "btns": [
           "Choose Now",
           "Maybe Later"
          ],
          "tap": 0,
          "say": "After your first full check-in, a small card offers this once. Choose Now opens it, and Maybe Later leaves it waiting in Settings."
         },
         {
          "k": "big",
          "h": "For anyone: gentler ways and rest.",
          "sub": "Show Gentler Ways First, in Settings. Rest Week, on Today.",
          "say": "Show Gentler Ways First, in Settings, puts seated, short, and gentle ways first, for anyone. Rest Week, on Today, holds your tree still for a hard week, with everything kept."
         },
         {
          "k": "big",
          "h": "What would help Oak fit you?",
          "sub": "Choose now, or any time later.",
          "say": "Take a moment and think: what would help Oak fit you best? Choose it now, or any time later in Settings.",
          "beats": [
           {
            "t": "Take a moment and think: what would help Oak fit you best?",
            "w": 10
           },
           "Choose it now, or any time later in Settings."
          ]
         }
        ]
       },
       {
        "id": "ok-ha-flare",
        "n": 2,
        "title": "A Flare-Day Reset",
        "mins": 2,
        "blurb": "Count your spoons, spend them on what matters, and let the rest wait.",
        "for": "you",
        "sources": [
         "miserandino"
        ],
        "life": [
         "pain",
         "health",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "A Flare-Day Reset",
          "sub": "When your body sets the pace today.",
          "say": "Some days your condition flares, and the plan you had does not fit anymore. This is a reset for those days. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Some days start with fewer spoons.",
          "sub": "Every task uses a little energy.",
          "say": "Some people picture their energy as a handful of spoons. Every task, like a shower, a shift, a school pickup, or a hard conversation, uses a spoon or two. On a flare day, you start with fewer."
         },
         {
          "k": "points",
          "h": "Reset the day",
          "say": "Here is the reset. First, count your spoons for today, roughly. Then pick what matters most, and spend spoons there first. Drop, shrink, or swap the rest, or ask for help with it. And keep one spoon back, for the unexpected.",
          "items": [
           [
            "Count your spoons",
            "Roughly is fine"
           ],
           [
            "Spend them on what matters",
            "That one thing first"
           ],
           [
            "Drop, shrink, or swap the rest",
            "Or ask for help"
           ],
           [
            "Keep one spoon back",
            "For the unexpected"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it now.",
          "sub": "Your spoons, and your one thing.",
          "say": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
          "beats": [
           {
            "t": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Pacing is a skill.",
          "sub": "A smaller day can mean more good days after.",
          "say": "Pacing is a skill, and it takes practice. Doing less on a flare day can mean more good days after."
         },
         {
          "k": "big",
          "h": "Your tree can rest too.",
          "sub": "Rest Week, on Today, holds it still.",
          "say": "In Oak, Rest Week on Today holds your tree still for a hard week, with everything kept. And if a flare feels different or scary, call your doctor or clinic."
         }
        ]
       },
       {
        "id": "ok-ha-pain",
        "n": 3,
        "title": "Breathing Around Pain",
        "mins": 2,
        "blurb": "Slow breaths that soften the body around pain.",
        "for": "you",
        "sources": [],
        "life": [
         "pain",
         "health",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "Breathing Around Pain",
          "sub": "Make a little room around it.",
          "say": "When pain shows up, the body often tightens around it. That tightness can make the pain feel louder. Let us try breathing around it."
         },
         {
          "k": "big",
          "h": "You can soften around it.",
          "sub": "Make a little room around it instead.",
          "say": "You can set down the fight and the push, and make a little room around the pain."
         },
         {
          "k": "points",
          "h": "How to do it",
          "say": "Find a position that is a little easier, sitting, lying down, or in the car before you go in. Notice where the pain is, with kindness. Then breathe out long, and let the muscles around it soften.",
          "items": [
           [
            "Find an easier position",
            "Any position counts"
           ],
           [
            "Notice where it is",
            "Just notice"
           ],
           [
            "Breathe out long",
            "Soften the muscles around it"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "breathe",
          "h": "Breathe around it",
          "sub": "In for four. Out for six.",
          "hold": 14,
          "say": "Follow the circle. In for four, and out for six. With each breath out, let the muscles around the pain go a little softer."
         },
         {
          "k": "big",
          "h": "Three more, on your own.",
          "sub": "Softer each time.",
          "say": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
          "beats": [
           {
            "t": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Even a little softer counts.",
          "sub": "Jaw, shoulders, and hands.",
          "say": "Notice your jaw, your shoulders, and your hands. Even a little softer counts."
         },
         {
          "k": "big",
          "h": "Pain that changes needs a call.",
          "sub": "Your doctor, or 911 in an emergency.",
          "say": "If pain is new, sudden, or very different, call your doctor or clinic, or nine one one in an emergency."
         }
        ]
       },
       {
        "id": "ok-ha-appt",
        "n": 4,
        "title": "Before an Appointment",
        "mins": 2,
        "blurb": "Three things to bring, and words that help in the room.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "Before an Appointment",
          "sub": "Getting the most out of a short visit.",
          "say": "Visits with a doctor can be short, and it is easy to forget what you meant to say. A few minutes of planning helps a lot."
         },
         {
          "k": "big",
          "h": "You know how you feel.",
          "sub": "What you notice matters.",
          "say": "You are the one who lives in your body every day. What you notice matters, so bring it with you."
         },
         {
          "k": "points",
          "h": "Bring three things",
          "say": "First, what has changed since last time. Second, your medicines, and how they are going. Third, your questions, with the most important one first.",
          "items": [
           [
            "What has changed",
            "Since last time"
           ],
           [
            "Your medicines",
            "And how they are going"
           ],
           [
            "Your questions",
            "The most important one first"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Write your top question now.",
          "sub": "In your phone, or on paper.",
          "say": "Write down your most important question now, or say it to yourself, while I wait.",
          "beats": [
           {
            "t": "Write down your most important question now, or say it to yourself, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "Words that help in the room",
          "say": "These words can help in the room. Can you explain that another way? What should I watch for? What are my choices?",
          "items": [
           "Can you explain that another way?",
           "What should I watch for?",
           "What are my choices?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "You are part of the team.",
          "sub": "Your questions belong in the room.",
          "say": "You are part of your own team. Your questions belong in the room, every time."
         }
        ]
       },
       {
        "id": "ok-ha-rest",
        "n": 5,
        "title": "Rest Without Guilt",
        "mins": 2,
        "blurb": "Rest as part of the plan, and kind words for slow days.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "Rest Without Guilt",
          "sub": "Rest is part of the plan.",
          "say": "Calling in, leaving the dishes, or saying no to the kids or a friend can bring up guilt, especially when people count on you. This video is a reminder that rest is part of living well."
         },
         {
          "k": "big",
          "h": "Rest is part of the plan.",
          "sub": "It is how bodies heal and recharge.",
          "say": "Rest is part of moving forward. It is how bodies heal, recharge, and get ready for the next good day."
         },
         {
          "k": "words",
          "h": "Kind things to tell yourself",
          "say": "Here are some kind things to tell yourself. Rest is part of the plan. I matter more than my to-do list. Today I am doing what my body needs.",
          "items": [
           "Rest is part of the plan.",
           "I matter more than my to-do list.",
           "Today I am doing what my body needs."
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Pick one.",
          "sub": "Say it slowly, two or three times.",
          "say": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
          "beats": [
           {
            "t": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "points",
          "h": "Rest that restores",
          "say": "Real rest can be lying down with your eyes closed. It can be sitting by a window, or listening to music. And it can be time with someone who lets you be as you are.",
          "items": [
           [
            "Lying down",
            "Eyes closed"
           ],
           [
            "Sitting quietly",
            "A window, or music"
           ],
           [
            "Easy company",
            "Someone who lets you be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Be as kind to yourself as you would be to a friend.",
          "sub": "Need to talk? Call or text 988, any time.",
          "say": "Be as kind to yourself as you would be to a friend. If the heaviness will not lift, call or text nine eight eight, any time."
         }
        ]
       },
       {
        "id": "ok-ha-tell",
        "n": 6,
        "title": "Telling Someone What You Need",
        "mins": 2,
        "blurb": "A simple three-step way to ask for what helps.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism",
         "close"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "Telling Someone What You Need",
          "sub": "A simple way to ask.",
          "say": "Asking for what you need can be one of the hardest parts of living with a condition. Let us practice a simple way to do it."
         },
         {
          "k": "big",
          "h": "Asking is a strength.",
          "sub": "People help more when they know.",
          "say": "Asking for what you need is a strength. People like a boss, a coworker, your family, or a friend can help more when they know."
         },
         {
          "k": "points",
          "h": "Three short steps",
          "say": "Here are three short steps. First, say what is going on, like, i have a condition that flares sometimes. Then say what would help, like, could we move the meeting to the afternoon? Then thank them.",
          "items": [
           [
            "Say what is going on",
            "I have a condition that flares sometimes."
           ],
           [
            "Say what would help",
            "Could we move the meeting to the afternoon?"
           ],
           [
            "Thank them",
            "Thanks, that makes a real difference."
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try one.",
          "sub": "A real one, or a made-up one.",
          "say": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
          "beats": [
           {
            "t": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "You choose how much to share.",
          "sub": "You choose how much of your story to share.",
          "say": "You choose how much to share. You can ask for what helps and share only as much of your story as you choose."
         },
         {
          "k": "big",
          "h": "Help is easier with a plan.",
          "sub": "A written ask can help at work.",
          "say": "At work, it often helps to ask in writing, and to ask what accommodations are possible. And a friend, your partner, or someone in your family can help you ask again if the first try does not land."
         }
        ]
       },
       {
        "id": "ok-ha-scan",
        "n": 7,
        "title": "A Body Kindness Scan",
        "mins": 2,
        "blurb": "A slow, kind check-in with your body. Skip any part you want.",
        "for": "you",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "pain",
         "moving",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "oak",
          "eyebrow": "Health and Ability",
          "h": "A Body Kindness Scan",
          "sub": "Skip any part you want.",
          "say": "This is a slow, kind check-in with your body. You can do it sitting, lying down, or in the car before you go in. And you can skip any part, any time."
         },
         {
          "k": "big",
          "h": "Skipping is always okay.",
          "sub": "Every way of doing this is welcome.",
          "say": "If a part hurts, is missing, or is hard to think about, simply skip it. Every way of doing this is welcome."
         },
         {
          "k": "points",
          "h": "Part by part",
          "say": "Start with your feet and legs, or skip them, and notice how they feel. Now your belly and chest, rising and falling as you breathe. Now your hands and arms, heavy or light. Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
          "items": [
           [
            "Feet and legs",
            "Or skip them"
           ],
           [
            "Belly and chest",
            "Rising and falling"
           ],
           [
            "Hands and arms",
            "Heavy or light"
           ],
           [
            "Shoulders, neck, and face",
            "Soft, if they can be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Start with your feet and legs, or skip them, and notice how they feel.",
            "p": 4
           },
           {
            "t": "Now your belly and chest, rising and falling as you breathe.",
            "p": 4
           },
           {
            "t": "Now your hands and arms, heavy or light.",
            "p": 4
           },
           {
            "t": "Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Say one kind thing to your body.",
          "sub": "Thank you for getting me through today.",
          "say": "Now say one kind thing to your body. Something like, thank you for getting me through today."
         },
         {
          "k": "big",
          "h": "Your body is doing its best.",
          "sub": "Come back to this whenever you want.",
          "say": "Your body is doing its best, and so are you. Come back to this whenever you want."
         }
        ]
       }
      ]
     }
    ]
   },
   "sequoia": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Short videos for living with a health condition or disability, or walking beside someone who is. Open one anytime, as often as you like.",
    "tracks": [
     {
      "id": "sequoia-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos to use any time",
      "lessons": [
       {
        "id": "sq-ha-howto",
        "n": 1,
        "title": "How Health and Ability Works",
        "mins": 3,
        "blurb": "A setting that helps Sequoia fit your body and your health.",
        "for": "you",
        "sources": [],
        "life": [],
        "howto": true,
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "How Health and Ability Works",
          "sub": "Make Sequoia fit your body and your health.",
          "say": "This video shows Health and Ability, a setting that helps Sequoia fit your body and your health. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Choose what is part of your life right now.",
          "sub": "Or none. As many as fit.",
          "say": "Open Settings, or Manage My Profile, and tap Health and Ability. Choose anything that is part of your life right now: a health condition, pain or fatigue, moving, hearing, or seeing differently, memory or thinking changes, or someone close to you living with one. Pick as many as fit, or None Right Now, or I’d Rather Not Say."
         },
         {
          "k": "screen",
          "app": "sequoia",
          "app_name": "Sequoia",
          "title": "Health and Ability",
          "rows": [
           [
            "A Long-Term Health Condition",
            ""
           ],
           [
            "Chronic Pain or Fatigue",
            ""
           ],
           [
            "Moving Differently",
            ""
           ],
           [
            "Deaf or Hard of Hearing",
            ""
           ],
           [
            "Blind or Low Vision",
            ""
           ],
           [
            "None Right Now",
            ""
           ]
          ],
          "tap": 1,
          "panel": {
           "h": "Choose what fits",
           "sub": "Each choice has one plain line.",
           "items": [
            "As many as fit, or none",
            "I’d Rather Not Say turns on gentler ways",
            "Change it any time"
           ]
          },
          "say": "Each choice has one plain line, so you can see what it means. I’d Rather Not Say still turns on gentler ways, without naming anything."
         },
         {
          "k": "points",
          "h": "What it changes",
          "say": "It changes only what shows first, and adds a little help. Guides that fit you show at the top of When Life Changes, under Picked for You. Practices with a gentler way show first, tagged Fits You, with their seated, lying down, or shorter way. A few check-in questions get a short example underneath. And help lines show below the crisis lines, never instead of them.",
          "items": [
           [
            "Picked for You",
            "Guides that fit, at the top of When Life Changes"
           ],
           [
            "Fits You",
            "Gentler ways first, with the adapted way"
           ],
           [
            "A few examples",
            "Under some check-in questions"
           ],
           [
            "Help lines",
            "Below the crisis lines, never instead"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "points",
          "h": "Yours to share, if you choose",
          "say": "It stays locked in your profile, on this device. Helpers never see it, unless you turn on Share My Health and Ability with my helpers. Your questions and scores stay the same, safety questions too. And Clear My Choices erases it, any time.",
          "items": [
           [
            "Locked on this device",
            "Inside your profile"
           ],
           [
            "Private from helpers",
            "Unless you turn sharing on"
           ],
           [
            "Questions and scores stay the same",
            "Safety questions too"
           ],
           [
            "Clear My Choices",
            "Erases it, any time"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "card",
          "title": "Want Grounded to fit your body and health?",
          "body": "You can choose in Settings.",
          "btns": [
           "Choose Now",
           "Maybe Later"
          ],
          "tap": 0,
          "say": "After your first full check-in, a small card offers this once. Choose Now opens it, and Maybe Later leaves it waiting in Settings."
         },
         {
          "k": "big",
          "h": "For anyone: gentler ways and rest.",
          "sub": "Show Gentler Ways First, in Settings. Rest Week, on Today.",
          "say": "Show Gentler Ways First, in Settings, puts seated, short, and gentle ways first, for anyone. Rest Week, on Today, holds your tree still for a hard week, with everything kept."
         },
         {
          "k": "big",
          "h": "What would help Sequoia fit you?",
          "sub": "Choose now, or any time later.",
          "say": "Take a moment and think: what would help Sequoia fit you best? Choose it now, or any time later in Settings.",
          "beats": [
           {
            "t": "Take a moment and think: what would help Sequoia fit you best?",
            "w": 10
           },
           "Choose it now, or any time later in Settings."
          ]
         }
        ]
       },
       {
        "id": "sq-ha-flare",
        "n": 2,
        "title": "A Flare-Day Reset",
        "mins": 2,
        "blurb": "Count your spoons, spend them on what matters, and let the rest wait.",
        "for": "you",
        "sources": [
         "miserandino"
        ],
        "life": [
         "pain",
         "health",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "A Flare-Day Reset",
          "sub": "When your body sets the pace today.",
          "say": "Some days your condition flares, and the plan you had does not fit anymore. This is a reset for those days. It takes about three minutes."
         },
         {
          "k": "big",
          "h": "Some days start with fewer spoons.",
          "sub": "Every task uses a little energy.",
          "say": "Some people picture their energy as a handful of spoons. Every task, like getting dressed, a shower, a phone call, or a visit, uses a spoon or two. On a flare day, you start with fewer."
         },
         {
          "k": "points",
          "h": "Reset the day",
          "say": "Here is the reset. First, count your spoons for today, roughly. Then pick what matters most, and spend spoons there first. Drop, shrink, or swap the rest, or ask for help with it. And keep one spoon back, for the unexpected.",
          "items": [
           [
            "Count your spoons",
            "Roughly is fine"
           ],
           [
            "Spend them on what matters",
            "That one thing first"
           ],
           [
            "Drop, shrink, or swap the rest",
            "Or ask for help"
           ],
           [
            "Keep one spoon back",
            "For the unexpected"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it now.",
          "sub": "Your spoons, and your one thing.",
          "say": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
          "beats": [
           {
            "t": "Take a guess at your spoons for today, and pick the one thing that matters most, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Pacing is a skill.",
          "sub": "A smaller day can mean more good days after.",
          "say": "Pacing is a skill, and it takes practice. Doing less on a flare day can mean more good days after."
         },
         {
          "k": "big",
          "h": "Easier today, and Rest Week.",
          "sub": "Smaller ways, and a tree that waits for you.",
          "say": "In Sequoia, Easier today shows a smaller way to do a practice, often seated or in bed. Rest Week on Today holds your tree still for a hard week, with everything kept. And if a flare feels different or scary, call your doctor or clinic."
         }
        ]
       },
       {
        "id": "sq-ha-pain",
        "n": 3,
        "title": "Breathing Around Pain",
        "mins": 2,
        "blurb": "Slow breaths that soften the body around pain.",
        "for": "you",
        "sources": [],
        "life": [
         "pain",
         "health",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "Breathing Around Pain",
          "sub": "Make a little room around it.",
          "say": "When pain shows up, the body often tightens around it. That tightness can make the pain feel louder. Let us try breathing around it."
         },
         {
          "k": "big",
          "h": "You can soften around it.",
          "sub": "Make a little room around it instead.",
          "say": "You can set down the fight and the push, and make a little room around the pain."
         },
         {
          "k": "points",
          "h": "How to do it",
          "say": "Find a position that is a little easier, sitting in a chair, or lying in bed. Notice where the pain is, with kindness. Then breathe out long, and let the muscles around it soften.",
          "items": [
           [
            "Find an easier position",
            "Any position counts"
           ],
           [
            "Notice where it is",
            "Just notice"
           ],
           [
            "Breathe out long",
            "Soften the muscles around it"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "breathe",
          "h": "Breathe around it",
          "sub": "In for four. Out for six.",
          "hold": 14,
          "say": "Follow the circle. In for four, and out for six. With each breath out, let the muscles around the pain go a little softer."
         },
         {
          "k": "big",
          "h": "Three more, on your own.",
          "sub": "Softer each time.",
          "say": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
          "beats": [
           {
            "t": "Now take three more slow breaths at your own pace, softening a little each time, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "Even a little softer counts.",
          "sub": "Jaw, shoulders, and hands.",
          "say": "Notice your jaw, your shoulders, and your hands. Even a little softer counts."
         },
         {
          "k": "big",
          "h": "Pain that changes needs a call.",
          "sub": "Your doctor, or 911 in an emergency.",
          "say": "If pain is new, sudden, or very different, call your doctor or clinic, or nine one one in an emergency."
         }
        ]
       },
       {
        "id": "sq-ha-appt",
        "n": 4,
        "title": "Before an Appointment",
        "mins": 2,
        "blurb": "Three things to bring, and words that help in the room.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "Before an Appointment",
          "sub": "Getting the most out of a short visit.",
          "say": "Visits with a doctor can be short, and it is easy to forget what you meant to say. A few minutes of planning helps a lot."
         },
         {
          "k": "big",
          "h": "You know how you feel.",
          "sub": "What you notice matters.",
          "say": "You are the one who lives in your body every day. What you notice matters, so bring it with you."
         },
         {
          "k": "points",
          "h": "Bring three things",
          "say": "First, what has changed since last time. Second, a list of every medicine, including vitamins and anything over the counter. Third, your questions, with the most important one first.",
          "items": [
           [
            "What has changed",
            "Since last time"
           ],
           [
            "Every medicine",
            "Vitamins and over the counter too"
           ],
           [
            "Your questions",
            "The most important one first"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Write your top question now.",
          "sub": "In your phone, or on paper.",
          "say": "Write down your most important question now, or say it to yourself, while I wait.",
          "beats": [
           {
            "t": "Write down your most important question now, or say it to yourself, while I wait.",
            "w": 12
           }
          ]
         },
         {
          "k": "words",
          "h": "Words that help in the room",
          "say": "These words can help in the room. Could you face me while you talk? Could you write that down for me? What should I watch for?",
          "items": [
           "Could you face me while you talk?",
           "Could you write that down for me?",
           "What should I watch for?"
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Bring someone, if it helps.",
          "sub": "A second set of ears.",
          "say": "If it helps, bring a family member or a friend as a second set of ears. And it is always fine to ask them to say it again."
         }
        ]
       },
       {
        "id": "sq-ha-rest",
        "n": 5,
        "title": "Rest Without Guilt",
        "mins": 2,
        "blurb": "Rest as part of the plan, and kind words for slow days.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "Rest Without Guilt",
          "sub": "Rest is part of the plan.",
          "say": "Saying no to a visit, leaving a chore for another day, or needing help with something you used to do can bring up guilt. This video is a reminder that rest is part of living well."
         },
         {
          "k": "big",
          "h": "Rest is part of the plan.",
          "sub": "It is how bodies heal and recharge.",
          "say": "Rest is part of moving forward. It is how bodies heal, recharge, and get ready for the next good day."
         },
         {
          "k": "words",
          "h": "Kind things to tell yourself",
          "say": "Here are some kind things to tell yourself. Rest is part of the plan. I matter more than my to-do list. Today I am doing what my body needs.",
          "items": [
           "Rest is part of the plan.",
           "I matter more than my to-do list.",
           "Today I am doing what my body needs."
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Pick one.",
          "sub": "Say it slowly, two or three times.",
          "say": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
          "beats": [
           {
            "t": "Pick the one that fits today, and say it to yourself slowly, two or three times, while I wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "points",
          "h": "Rest that restores",
          "say": "Real rest can be lying down with your eyes closed. It can be sitting by a window, or listening to music. And it can be time with someone who lets you be as you are.",
          "items": [
           [
            "Lying down",
            "Eyes closed"
           ],
           [
            "Sitting quietly",
            "A window, or music"
           ],
           [
            "Easy company",
            "Someone who lets you be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2
           ]
          }
         },
         {
          "k": "big",
          "h": "Be as kind to yourself as you would be to a friend.",
          "sub": "Need to talk? Call or text 988, any time.",
          "say": "Be as kind to yourself as you would be to a friend. If the heaviness will not lift, call or text nine eight eight, any time."
         }
        ]
       },
       {
        "id": "sq-ha-tell",
        "n": 6,
        "title": "Telling Someone What You Need",
        "mins": 2,
        "blurb": "A simple three-step way to ask for what helps.",
        "for": "you",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "moving",
         "hearing",
         "seeing",
         "memory",
         "learning",
         "autism",
         "close"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "Telling Someone What You Need",
          "sub": "A simple way to ask.",
          "say": "Asking for what you need can be one of the hardest parts of living with a condition. Let us practice a simple way to do it."
         },
         {
          "k": "big",
          "h": "Asking is a strength.",
          "sub": "People help more when they know.",
          "say": "Asking for what you need is a strength. People like your family, a helper, a neighbor, or a friend can help more when they know."
         },
         {
          "k": "points",
          "h": "Three short steps",
          "say": "Here are three short steps. First, say what is going on, like, my hands are stiff today. Then say what would help, like, could you open this for me, and stay for a cup of coffee? Then thank them.",
          "items": [
           [
            "Say what is going on",
            "My hands are stiff today."
           ],
           [
            "Say what would help",
            "Could you open this for me, and stay for a cup of coffee?"
           ],
           [
            "Thank them",
            "Thank you, that means a lot."
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "Try one.",
          "sub": "A real one, or a made-up one.",
          "say": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
          "beats": [
           {
            "t": "Think of something you might need this week, and say it in those three steps, in your head or out loud.",
            "w": 12
           }
          ]
         },
         {
          "k": "big",
          "h": "You choose how much to share.",
          "sub": "You choose how much of your story to share.",
          "say": "You choose how much to share. You can ask for what helps and share only as much of your story as you choose."
         },
         {
          "k": "big",
          "h": "Help is easier with a plan.",
          "sub": "A clear ask is a gift.",
          "say": "Most people are glad to be asked. A clear ask is a gift to them too. And a friend, a helper, or someone in your family can help you ask again if the first try does not land."
         }
        ]
       },
       {
        "id": "sq-ha-scan",
        "n": 7,
        "title": "A Body Kindness Scan",
        "mins": 2,
        "blurb": "A slow, kind check-in with your body. Skip any part you want.",
        "for": "you",
        "sources": [
         "mbsr"
        ],
        "life": [
         "health",
         "pain",
         "moving",
         "serious"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "sequoia",
          "eyebrow": "Health and Ability",
          "h": "A Body Kindness Scan",
          "sub": "Skip any part you want.",
          "say": "This is a slow, kind check-in with your body. You can do it sitting in a chair, or lying in bed. And you can skip any part, any time."
         },
         {
          "k": "big",
          "h": "Skipping is always okay.",
          "sub": "Every way of doing this is welcome.",
          "say": "If a part hurts, is missing, or is hard to think about, simply skip it. Every way of doing this is welcome."
         },
         {
          "k": "points",
          "h": "Part by part",
          "say": "Start with your feet and legs, or skip them, and notice how they feel. Now your belly and chest, rising and falling as you breathe. Now your hands and arms, heavy or light. Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
          "items": [
           [
            "Feet and legs",
            "Or skip them"
           ],
           [
            "Belly and chest",
            "Rising and falling"
           ],
           [
            "Hands and arms",
            "Heavy or light"
           ],
           [
            "Shoulders, neck, and face",
            "Soft, if they can be"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          },
          "beats": [
           {
            "t": "Start with your feet and legs, or skip them, and notice how they feel.",
            "p": 4
           },
           {
            "t": "Now your belly and chest, rising and falling as you breathe.",
            "p": 4
           },
           {
            "t": "Now your hands and arms, heavy or light.",
            "p": 4
           },
           {
            "t": "Last, your shoulders, neck, and face, letting them soften if they can, and I will wait.",
            "w": 10
           }
          ]
         },
         {
          "k": "big",
          "h": "Say one kind thing to your body.",
          "sub": "Thank you for getting me through today.",
          "say": "Now say one kind thing to your body. Something like, thank you for getting me through today."
         },
         {
          "k": "big",
          "h": "Your body is doing its best.",
          "sub": "Come back to this whenever you want.",
          "say": "Your body is doing its best, and so are you. Come back to this whenever you want."
         }
        ]
       }
      ]
     }
    ]
   },
   "grove": {
    "eyebrow": "Support",
    "title": "Health and Ability",
    "intro": "Ways for every body in the family to join in, and a slower day together. Open one anytime.",
    "tracks": [
     {
      "id": "grove-life",
      "kind": "support",
      "group": "life",
      "title": "Health and Ability",
      "who": "Short videos for the whole family, side by side",
      "lessons": [
       {
        "id": "gr-ha-join",
        "n": 1,
        "title": "Ways Everyone Can Join",
        "mins": 2,
        "blurb": "Seated, smaller, with a helper, or imagined: a way in for every body.",
        "sources": [],
        "life": [
         "moving",
         "health",
         "pain",
         "hearing",
         "seeing",
         "autism",
         "serious",
         "memory"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "grove",
          "eyebrow": "Do This Together",
          "h": "Ways Everyone Can Join",
          "sub": "Room for every body in the family.",
          "say": "This one is for the whole family. In most families, bodies work in different ways. A grandparent uses a cane, a little one is still learning to walk, someone is tired from treatment, or someone uses a wheelchair. Here is how everyone can join."
         },
         {
          "k": "points",
          "h": "Four ways in",
          "say": "There are four ways in to almost anything. Seated: almost any move can happen in a chair. Smaller: fewer, shorter, or slower. With a helper: two people, one turn. Imagined: picture it, and it still counts.",
          "items": [
           [
            "Seated",
            "Almost any move works in a chair"
           ],
           [
            "Smaller",
            "Fewer, shorter, or slower"
           ],
           [
            "With a helper",
            "Two people, one turn"
           ],
           [
            "Imagined",
            "Picture it, and it counts"
           ]
          ],
          "cue": {
           "at": [
            1,
            2,
            3,
            4
           ]
          }
         },
         {
          "k": "big",
          "h": "Try it together.",
          "sub": "Show one way. Everyone copies.",
          "say": "Let us try one right now. Everyone, sitting or standing, reach your arms up high, or just imagine it. Now let each person show one way to stretch that works for them, and everyone else copy it, while I wait.",
          "beats": [
           "Let us try one right now.",
           "Everyone, sitting or standing, reach your arms up high, or just imagine it.",
           {
            "t": "Now let each person show one way to stretch that works for them, and everyone else copy it, while I wait.",
            "w": 15
           }
          ]
         },
         {
          "k": "big",
          "h": "Ask, instead of guessing.",
          "sub": "What way works for you today?",
          "say": "Before a game or a walk, ask, what way works for you today? The answer can change from day to day, and that is okay."
         },
         {
          "k": "points",
          "h": "Find it in The Grove",
          "say": "In The Grove, Do This Together has gentle ways for many practices. And a family setting, Show Ways Everyone Can Join First, puts seated and gentle ways at the top.",
          "items": [
           [
            "Do This Together",
            "Gentle ways for many practices"
           ],
           [
            "Show Ways Everyone Can Join First",
            "A family setting"
           ]
          ],
          "cue": {
           "at": [
            0,
            1
           ]
          }
         },
         {
          "k": "big",
          "h": "When everyone can join, everyone belongs.",
          "sub": "That is what a grove is for.",
          "say": "When everyone can join, everyone belongs. That is what a grove is for."
         }
        ]
       },
       {
        "id": "gr-ha-rest",
        "n": 2,
        "title": "A Family Rest Day",
        "mins": 2,
        "blurb": "A slow, quiet day together, when someone in the family needs rest.",
        "sources": [],
        "life": [
         "health",
         "pain",
         "serious",
         "mind",
         "close"
        ],
        "scenes": [
         {
          "k": "title",
          "hero": "grove",
          "eyebrow": "Do This Together",
          "h": "A Family Rest Day",
          "sub": "Slow down, together.",
          "say": "Sometimes the whole family needs a slower day. Maybe someone is sick, or healing, or worn out, or it has just been a lot. A family rest day is a gift to everyone."
         },
         {
          "k": "big",
          "h": "Rest together is still together.",
          "sub": "Quiet time counts as family time.",
          "say": "Rest together is still together. Quiet time counts as family time."
         },
         {
          "k": "points",
          "h": "Ideas for a rest day",
          "say": "Build a blanket pile with books, pictures, or a puzzle. Share a slow snack, and really taste it together. Play quiet sounds, like music, rain, or a story read aloud. And let bigger kids be helping hands, bringing water or a pillow.",
          "items": [
           [
            "A blanket pile",
            "Books, pictures, or a puzzle"
           ],
           [
            "A slow snack",
            "Taste it together"
           ],
           [
            "Quiet sounds",
            "Music, rain, or a story"
           ],
           [
            "Helping hands",
            "Water, or a pillow"
           ]
          ],
          "cue": {
           "at": [
            0,
            1,
            2,
            3
           ]
          }
         },
         {
          "k": "big",
          "h": "A quiet minute together.",
          "sub": "Just listen to the room.",
          "say": "Let us try a quiet minute together right now. Sit or lie close, close your eyes or look softly at the floor, and listen to the room together, while I wait.",
          "beats": [
           "Let us try a quiet minute together right now.",
           {
            "t": "Sit or lie close, close your eyes or look softly at the floor, and listen to the room together, while I wait.",
            "w": 15
           }
          ]
         },
         {
          "k": "big",
          "h": "Everyone can say what they need.",
          "sub": "A nap, a hug, some space, or a snack.",
          "say": "On a rest day, everyone can say what they need. It might be a nap, a hug, some space, or a snack."
         },
         {
          "k": "big",
          "h": "Rest days help families grow.",
          "sub": "Come back whenever you need a slower day.",
          "say": "Rest days help a family grow strong roots. Come back to this whenever your family needs a slower day."
         }
        ]
       }
      ]
     }
    ]
   }
  };
})();
