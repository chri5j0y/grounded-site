/* =====================================================================
   SEQUOIA . WHEN LIFE CHANGES
   Guides for the changes a long life brings, for the person going through it and for the helper beside them.
   Read by Sequoia (/sequoia/) and the site-wide search. Each topic has Oak's shape: id, ring, title, keys, parts, quick,
   feel, self {first, helps, tell, people}, helper {feel, say, avoid, help, you}, faith, practices ("part|Name", matching
   sequoia/practices.js), reach, more. Generated from patches/bld734/source (and later builds) in grounded-workshop:
   edit the data there and rebuild. Groups A to D: BLD 734. Groups E to H: BLD 735.
   ===================================================================== */
(function(){
const LC_RINGS = [
 {
  "key": "purpose",
  "name": "Work, Roles, and Purpose",
  "color": "#7A4A12",
  "blurb": "When work ends or a role changes, and you wonder where you fit now."
 },
 {
  "key": "loss",
  "name": "Loss and Grief",
  "color": "#6B4226",
  "blurb": "When someone you love is gone, and the losses add up."
 },
 {
  "key": "body",
  "name": "Body and Health",
  "color": "#9A4A2C",
  "blurb": "When your body changes, and daily life changes with it."
 },
 {
  "key": "mind",
  "name": "Memory and Mind",
  "color": "#4E5D7A",
  "blurb": "Memory, mood, worry, and the old memories that come back."
 },
 {
  "key": "home",
  "name": "Home and Money",
  "color": "#4A5D3A",
  "blurb": "Moving, money, scams, and putting your affairs in order."
 },
 {
  "key": "family",
  "name": "Family and Love",
  "color": "#8A3B4A",
  "blurb": "Spouses, children, grandchildren, and love at every age."
 },
 {
  "key": "belong",
  "name": "Belonging and Identity",
  "color": "#3F6E7A",
  "blurb": "Feeling seen, connected, and part of things."
 },
 {
  "key": "meaning",
  "name": "Faith, Meaning, and the Last Chapter",
  "color": "#5E4A7A",
  "blurb": "Faith, big questions, and the last chapter of a long life."
 }
];
const L = {};
const LC_TOPICS = [
 {
  "id": "retirement",
  "ring": "purpose",
  "title": "Retirement: who am I now?",
  "keys": "retirement retired retiring who am i now identity lost my role miss work miss my job bored restless days too long no structure not needed anymore forced retirement early retirement spouse home all day purpose after work",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "Retirement can bring freedom and loss in the same week. Both are real.",
   "Work gave your days shape, people, and a role. Plan for all three, along with rest and fun.",
   "Your gifts came with you. Roles can change shape, and unpaid roles count fully.",
   "Give yourself a season to adjust. Most people find their footing, especially once a new role takes root."
  ],
  "feel": "Relief at first, maybe, and then a strange quiet. The days can feel long and shapeless. You may miss being needed, being the one people came to, or simply the faces you saw every day. Someone asks “What do you do?” and you're not sure what to say. If retirement came sooner than you planned, because of your health, a layoff, or caring for someone you love, it can feel more like a loss than a reward. Some people feel guilty for not enjoying it more. All of it is common.",
  "self": {
   "first": [
    "Give each day an anchor: a set time to get up, a morning walk, a standing coffee, or one task you finish.",
    "Write down the roles you hold now: grandparent, neighbor, friend, gardener, the one who remembers birthdays. Circle the one you'd like to grow.",
    "Put one thing with other people on your calendar every week."
   ],
   "helps": [
    "Naming the gifts your work used, like teaching, fixing, organizing, or listening, and finding new places to use them.",
    "A regular role where people count on you: volunteering, mentoring, a group you help run, a class you teach.",
    "Learning something new and a little challenging, ideally alongside other people.",
    "Keeping up, on purpose, with the friends from work you truly liked.",
    "Moving your body most days, in the way that fits it."
   ],
   "tell": [
    "“I'm more than what I did for a living.”",
    "“My gifts came with me.”",
    "“It's okay to grieve what I left, even if I chose to leave it.”"
   ],
   "people": "Try: “I'm still figuring out this new season. Would you like to try something new with me?” Or, at home: “Let's talk about how we each want our days to look now.”"
  },
  "helper": {
   "feel": "They may miss their role, their routine, and their people more than they say. Some feel invisible, or wonder whether they are still useful. A spouse or partner may be adjusting too, with more time together than either is used to.",
   "say": [
    "“What do you miss about your work? What don't you miss at all?”",
    "“You were always the one people came to for advice. Who could use that now?”",
    "“Would you show me how you do that?”",
    "“What would you like this year to hold?”"
   ],
   "avoid": [
    "“You must be bored.”",
    "“Just relax, you've earned it.” It can brush past a real loss.",
    "Filling their calendar for them, or deciding what their new role should be.",
    "Talking about them, instead of with them, when the family makes plans."
   ],
   "help": [
    "Ask for their know-how and their advice, and mean it.",
    "Invite them into something side by side: a class, a project, a walk on the same day each week.",
    "Notice early or unplanned retirement. It often carries more grief.",
    "Keep them in family and community decisions. Their voice still counts."
   ],
   "you": "Let them set the pace and choose the role. Your part is to notice their gifts out loud, keep inviting, and look after your own days too."
  },
  "faith": "For some people, a faith community becomes a home for a new role: teaching, welcoming, visiting, or simply belonging. Many traditions honor elders as keepers of wisdom and memory. If faith is part of your life, this can be a season to listen for what you're being called toward next. If it isn't, the same question points to your values and what you'd like to give.",
  "practices": [
   "trunk|Find Your Role",
   "trunk|Name Your Gifts",
   "trunk|Keep Learning",
   "trunk|Mentor Someone",
   "trunk|Volunteer",
   "branches|Standing Call"
  ],
  "reach": [
   "Low mood, poor sleep, or little interest in things you used to enjoy, lasting two weeks or more: talk with your doctor. Depression is not a normal part of aging, and it is very treatable.",
   "Feeling you have no place or use anymore, or like a burden: tell someone you trust. If it turns into not wanting to be here, call or text 988, any time. Veterans: dial 988, then press 1.",
   "Danger right now: call 911.",
   "Drinking more to fill the days, or new trouble with sleep or appetite: tell your doctor or pharmacist.",
   "To find local classes, programs, and volunteer roles: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "AmeriCorps Seniors, for people 55 and up: Foster Grandparents, Senior Companions, and RSVP."
  ],
  "more": [
   [
    "AmeriCorps Seniors",
    "https://americorps.gov/serve/americorps-seniors"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways/"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ]
  ]
 },
 {
  "id": "purpose-again",
  "ring": "purpose",
  "title": "Finding purpose again",
  "keys": "purpose meaning no purpose lost my role not needed anymore useless what's the point empty days nothing to do caregiving ended kids grown can't do what i used to burden in the way reason to get up why am i still here",
  "parts": [
   "trunk",
   "fruit",
   "roots"
  ],
  "quick": [
   "Losing a role can feel like losing a piece of yourself. That grief is real.",
   "Purpose doesn't need to be big. A reason to get up in the morning counts.",
   "Purpose is usually found in doing, one small step at a time, more than in thinking.",
   "Roles change shape. Your gifts, your love, and your know-how come with you."
  ],
  "feel": "A role that filled your days has ended: caring for a spouse, raising a houseful of children, a job, a business, a farm, a place in your community. Or your body can't do what it used to. The days can feel empty. You may feel you have no place or use anymore, or even feel like a burden. Some people feel restless, some feel flat, and many are quietly grieving the person they used to be.",
  "self": {
   "first": [
    "Each morning, name one person or thing that is glad you're here today.",
    "Name three gifts you carry, not job titles: encouraging, fixing, listening, cooking, making people laugh.",
    "Ask one person what they come to you for. Their answer is a gift you still have."
   ],
   "helps": [
    "One small commitment you can keep: a weekly call, a plant to water, a neighbor to check on.",
    "Passing on what you know: a recipe, a repair, a story, a skill.",
    "Adapting an old love to the body you have now: larger tools, more light, a seated version, a phone role in place of a driving one.",
    "Looking back over your life with a listener, and noticing what has always mattered to you.",
    "Spending time with others who are also starting a new chapter."
   ],
   "tell": [
    "“Purpose doesn't have to be big to be real.”",
    "“Being needed can look different now and still count.”",
    "“I don't need the whole map to take the next step.”"
   ],
   "people": "Try: “Since that season ended, I've felt a little lost. Could you use a hand with something? I'd like to be useful.”"
  },
  "helper": {
   "feel": "They may feel they have nothing left to give, or that they've become a burden. They may not say it plainly. Listen for “What's the point?” or “I'm just in the way.”",
   "say": [
    "“I still need you. Will you help me with this?”",
    "“What did you love about that role? Where else could that live?”",
    "“You've always been the one who listens. I see that in you still.”"
   ],
   "avoid": [
    "“Just keep busy.” Busy is different from meaningful.",
    "Doing everything for them, out of kindness, until nothing is left for them to do.",
    "Brushing off “I'm a burden” with quick reassurance. Slow down and stay with it."
   ],
   "help": [
    "Leave them real jobs, and ask for their help with things that truly matter.",
    "Help them adapt what they love to what their body can do now.",
    "Name the strengths you see in them, specifically and out loud.",
    "If they say they feel like a burden, ask gently and directly whether they've thought about not wanting to be here, and listen to the answer."
   ],
   "you": "You can't hand someone a purpose. You can make room for theirs, and keep telling them they matter to you."
  },
  "faith": "For some people, faith is where purpose has always lived: a sense of being called, of being held, of still having a part to play. Prayer, a faith community, or a spiritual director can help you listen for what's next. If faith isn't part of your life, the same listening works with your values: what has always mattered to you, and where it could live now.",
  "practices": [
   "trunk|Reason to Get Up",
   "trunk|Name Your Gifts",
   "trunk|Find Your Role",
   "trunk|Pass On a Skill",
   "trunk|Life Review",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Low mood, poor sleep, or little interest in almost everything, lasting two weeks or more: talk with your doctor. Depression is not a normal part of aging, and it is very treatable.",
   "Feeling like a burden, or that others would be better off without you: tell someone you trust today, and call or text 988, any time. Veterans: dial 988, then press 1.",
   "Danger right now: call 911.",
   "To find local programs, classes, and volunteer roles: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "A chaplain, counselor, or spiritual director, when the questions run deep."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "AmeriCorps Seniors",
    "https://americorps.gov/serve/americorps-seniors"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ]
  ]
 },
 {
  "id": "volunteering",
  "ring": "purpose",
  "title": "Volunteering and serving",
  "keys": "volunteer volunteering serve serving give back giving back help others helping out mentor tutor reading buddy foster grandparent senior companion rsvp americorps food shelf hospital library church where to volunteer too old to volunteer too tired said yes to too much worn out",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "Giving your time in later life is linked with better well-being, health, and thinking.",
   "Start with what you love and what you're good at, then look for who needs it.",
   "Small and steady beats big and rare. An hour a week is plenty.",
   "Serving takes many shapes: a phone call, a card, a meal, a lesson, a listening ear."
  ],
  "feel": "You may want to give back and not know where to start. Or you've said yes to so much that you feel worn thin. Some people wonder if they're too old, too slow, or no longer needed. Others miss the way serving used to feel before their health, hearing, or driving changed. And many light up the moment they're counted on again.",
  "self": {
   "first": [
    "Make one call or visit one website to ask what help is needed: a library, school, food shelf, hospital, or faith community.",
    "Write down what you love and what you're good at. Look for the place where they meet a need.",
    "Try something once before you commit to more."
   ],
   "helps": [
    "A steady weekly role, so people count on you and faces become familiar.",
    "Serving alongside others, which grows friendships without pressure.",
    "Roles with children, like reading or tutoring, which many older volunteers find energizing.",
    "At-home roles when energy or getting around is limited: calls to people who live alone, writing cards, knitting for a hospital.",
    "Saying no, kindly, to what doesn't fit, so you have room for what does."
   ],
   "tell": [
    "“My time and experience are a gift.”",
    "“Small and steady counts.”",
    "“I can serve in the way that fits my body today.”"
   ],
   "people": "Try: “I have some time, and I'd like to help. What do you need most right now?”"
  },
  "helper": {
   "feel": "They may want to serve and feel unsure they still can. Or they may be giving so much that they're running on empty. Either way, they want to be useful, and respected for what they give.",
   "say": [
    "“You have so much to offer. What kind of helping do you enjoy most?”",
    "“Want to try it together the first time?”",
    "“How's it going? Does it still fit?”"
   ],
   "avoid": [
    "Signing them up for something without asking.",
    "“Aren't you too old for that?”",
    "Praising only how busy they are, instead of what they give."
   ],
   "help": [
    "Offer a ride, or help finding a role close to home.",
    "Help them set it up by phone or online if they'd like a hand, then step back.",
    "Notice if serving has tipped into overload, and help them name what to keep.",
    "Serve beside them sometimes."
   ],
   "you": "Follow their lead. Where and how much to give is their choice. Keep your own rest and your own ways of giving too."
  },
  "faith": "Many traditions teach service as a way to love your neighbor and live what you believe, and faith communities often have roles for every energy level: visiting, cooking, greeting, praying for others, mentoring. If faith isn't part of your life, serving is still a way to live your values and stay connected.",
  "practices": [
   "trunk|Volunteer",
   "trunk|Read With a Child",
   "trunk|Mentor Someone",
   "fruit|Pay It Forward",
   "branches|One Reach-Out a Day"
  ],
  "reach": [
   "To find volunteer roles near you: AmeriCorps Seniors, for people 55 and up (Foster Grandparents, Senior Companions, RSVP).",
   "Eldercare Locator, 1-800-677-1116 (call or text), to find local programs, rides, and help.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Before starting volunteer work that is hard on the body, talk with your doctor, especially after a fall, a new diagnosis, or a change in medicines.",
   "Serving that leaves you exhausted, low, or unable to rest: talk with someone you trust. A low mood that lasts two weeks or more: talk with your doctor.",
   "Thoughts of not wanting to be here: call or text 988, any time. Veterans: dial 988, then press 1. Danger right now: 911."
  ],
  "more": [
   [
    "AmeriCorps Seniors",
    "https://americorps.gov/serve/americorps-seniors"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways/"
   ]
  ]
 },
 {
  "id": "working-longer",
  "ring": "purpose",
  "title": "Working longer, or going back to work",
  "keys": "working longer going back to work job after retirement part time job unretire need money fixed income older worker age bias too old to work new job at 70 still working",
  "parts": [
   "trunk",
   "leaves",
   "branches"
  ],
  "quick": [
   "Working longer, or going back, can bring income, purpose, people, and pride. Every reason counts.",
   "Name your gifts, the skills under your job titles. They come with you into any work.",
   "Look for work that fits your body and your life now: fewer hours, flexible days, seasonal work, or work from home.",
   "Before you say yes, ask how earnings may affect your benefits and taxes."
  ],
  "feel": "Pride at still being needed, or relief at having a reason to get dressed in the morning. Tiredness by Thursday. Worry about new tools, younger coworkers, or being passed over for someone younger. If money is the reason, you may feel embarrassed, or angry that the plan changed. Many people feel several of these in one week, and all of them make sense.",
  "self": {
   "first": [
    "Write down why you want to work: income, people, purpose, structure, or a mix. Every reason is a good enough reason.",
    "Name three gifts you carry, like patience, a steady hand, or knowing how to calm a room.",
    "Before you accept a job, ask Social Security or a trusted adviser how earnings may affect your benefits and taxes."
   ],
   "helps": [
    "Flexible work: part-time hours, seasonal jobs, or the work you once did, done fewer days a week.",
    "Learning a new tool slowly, with someone patient beside you. Asking questions is part of learning at any age.",
    "Protecting sleep, real meals, and at least one day a week with nothing due.",
    "Keeping other roles too: friends, faith community, a volunteer shift, the grandchildren. Work is one way to be needed, and there are many others."
   ],
   "tell": [
    "“I still have much to give.”",
    "“Every reason to work is a good enough reason.”",
    "“I can learn this at my own pace.”"
   ],
   "people": "Try: “I'm thinking about going back to work, part-time. I'd love for you to hear my reasons before we talk about what you think.”"
  },
  "helper": {
   "feel": "They may feel proud and worried at the same time. If money is the reason, they may feel embarrassed, and they may brace for your opinion before they tell you.",
   "say": [
    "“What do you like most about the work?”",
    "“What would make the days easier?”",
    "“I'm proud of you.”"
   ],
   "avoid": [
    "“You should be resting at your age.”",
    "“Can you even keep up with that?”",
    "Taking over the job search, or the computer, without being asked."
   ],
   "help": [
    "Offer help with applications or new tools, then let them lead. Let them hold the mouse.",
    "Make room for rest: a meal, a ride, a quiet evening.",
    "Notice strain, like pain, poor sleep, or a heavy mood, and suggest a talk with their doctor.",
    "If money is tight, keep shame out of the room, and point them to the right helper for benefits questions."
   ],
   "you": "Watching someone you love work hard later in life can stir worry or guilt, especially if money is tight for them or for you. Talk with someone you trust about your own feelings, so the choice stays theirs."
  },
  "faith": "Many traditions honor work as a way to serve, and many also honor rest. If faith is part of your life, you might ask what your work is for in this season, and let your tradition's rhythm of rest, like a sabbath or a day set apart, shape your week.",
  "practices": [
   "trunk|Name Your Gifts",
   "trunk|Find Your Role",
   "trunk|Keep Learning",
   "trunk|Mentor Someone",
   "leaves|Steady Wake Time"
  ],
  "reach": [
   "Minnesota Aging Pathways, 1-800-333-2433, weekdays: questions about benefits and services in Minnesota.",
   "Eldercare Locator, 1-800-677-1116 (call or text): help near you, anywhere in the US.",
   "Your doctor, if pain, exhaustion, or low mood lasts two weeks or more.",
   "Call or text 988 any time if you think about not wanting to be here. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "CareerOneStop",
    "https://www.careeronestop.org"
   ],
   [
    "AmeriCorps Seniors: service roles for people 55 and up",
    "https://americorps.gov/serve/americorps-seniors"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Work, retirement, and well-being in later life: scoping review (2026)",
    "https://link.springer.com/article/10.1186/s12889-026-28628-y"
   ]
  ]
 },
 {
  "id": "burden",
  "ring": "purpose",
  "title": "Feeling like a burden",
  "keys": "burden in the way bother useless dependent needing help asking for help hate to ask independence better off without me guilt nuisance",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "Feeling like a burden is common in later life, especially when you need more help than before.",
   "Love has always gone both ways. Letting people help you now lets them give back.",
   "You still give: your listening, your stories, your blessing, your presence.",
   "If it turns into thinking others would be better off without you, tell someone today, and call or text 988."
  ],
  "feel": "Guilt each time you ask for a ride. Apologizing over and over. Saying no to help you need, so no one has to bother. You may feel useless after years of being the one who helped, or embarrassed to need help with the body's private things. Some people go quiet and pull away, thinking it is kinder. It feels like a fact. It is a feeling, and feelings can change.",
  "self": {
   "first": [
    "Say the feeling out loud to one person you trust: “I've been feeling like a burden.”",
    "Ask for one specific thing, and try saying thank you instead of sorry.",
    "Name one way you still give, and do it this week."
   ],
   "helps": [
    "Spreading the help around: family, friends, neighbors, faith community, and local services, so no one person carries it all.",
    "Doing what you can for yourself, at your own pace, and letting others do the rest.",
    "Remembering the help you gave over the years. Love has always gone both ways.",
    "Roles that let you give: listening, praying for someone, telling family stories, teaching a skill, giving a blessing."
   ],
   "tell": [
    "“Needing help is part of a long life.”",
    "“Letting them help me is a gift to them, too.”",
    "“I matter for who I am, not for what I can do.”"
   ],
   "people": "Try: “I've been feeling like a burden lately. I'd rather say it than hide it. Can we talk about how we share the help?”"
  },
  "helper": {
   "feel": "They may feel guilty, embarrassed, or useless, and may hide what they need so they don't bother you. Feeling like a burden can also be a warning sign for thoughts of suicide, so listen closely.",
   "say": [
    "“I love helping you. You did it for me.”",
    "“Your company matters to me.”",
    "“Can I ask your advice on something?”",
    "“Are you thinking about ending your life?” Asking plainly is safe, and it opens the door."
   ],
   "avoid": [
    "“Don't be silly.” It brushes the feeling aside.",
    "“Cheer up, you have so much to live for.”",
    "Sighing, rushing, or talking over them while you help.",
    "Taking over things they can still do."
   ],
   "help": [
    "Ask before you do: “How would you like this done?”",
    "Share the load with siblings, friends, and local services, so help comes from more than one person.",
    "Ask for their help, their advice, and their stories.",
    "If they speak of ending their life, stay with them and call or text 988 together. Ask the crisis line how to make the home safer for now, and let their doctor know."
   ],
   "you": "Helping every day can wear you down, and hearing “I'm a burden” can hurt. Both can sit beside love. Take real breaks, ask others to share the load, and call or text 988 yourself any time for advice on how to help."
  },
  "faith": "Many traditions teach that a person's worth is a gift, not something earned by being useful, and many honor elders as a blessing to their people. If faith is part of your life, you might bring this feeling to prayer, or let your faith community take a turn helping. If it isn't, the same truth holds: you matter for who you are.",
  "practices": [
   "bark|Self-Compassion Break",
   "branches|Ask for Help",
   "trunk|Find Your Role",
   "fruit|Blessing for Those You Love",
   "trunk|Reason to Get Up"
  ],
  "reach": [
   "Call or text 988 any time if you think others would be better off without you, or about ending your life. Veterans: 988, then press 1.",
   "Call 911 if you are in danger right now.",
   "Your doctor, if low mood, poor sleep, or appetite changes last two weeks or more.",
   "Eldercare Locator, 1-800-677-1116 (call or text): rides, meals, and help at home, so help comes from more than one person. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "If someone close makes you feel like a burden through threats, neglect, or pressure about money: in Minnesota, MAARC, 1-844-880-1574, any time."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Veterans Crisis Line",
    "https://www.veteranscrisisline.net"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "NCOA: suicide and older adults",
    "https://www.ncoa.org/article/suicide-and-older-adults-what-you-should-know/"
   ]
  ]
 },
 {
  "id": "spouse-death",
  "ring": "loss",
  "title": "Losing a spouse or partner",
  "keys": "widow widower husband died wife died partner died spouse death grief living alone after losing my husband after losing my wife bereaved alone now",
  "parts": [
   "branches",
   "leaves",
   "fruit",
   "roots"
  ],
  "quick": [
   "Losing a spouse or partner changes every part of the day. Expect it to be hard for a long time.",
   "The first months ask the most of your body. Keep your doctor visits, and tell your doctor about your loss.",
   "Eat, drink, and sleep on a simple schedule, even when you don't feel like it.",
   "When you can, wait about a year before big choices, like selling the house."
  ],
  "feel": "The house is too quiet. The other side of the bed, the second chair at the table, the coffee made for two. You may feel lost, numb, angry, or relieved after a long illness, and all of it is normal. Friends who were couples may call less. You may face tasks your partner always handled, like the bills, the car, or the cooking, all while grieving.",
  "self": {
   "first": [
    "Eat something at regular times, keep water within reach, and get up at the same time each day.",
    "Tell your doctor about your loss, and keep your appointments and medicines.",
    "Let one trusted person help with paperwork and deadlines.",
    "Before any money talk on the phone or online, pause and check with someone you trust."
   ],
   "helps": [
    "A standing call or a shared meal each week, especially at your hardest hour.",
    "A grief group with others who have lost a partner. Hospices, funeral homes, and faith communities often host them.",
    "Talking about your partner by name, and keeping a few of their things close.",
    "Learning one task your partner used to handle, at your own pace, with help."
   ],
   "tell": [
    "“There is no right way or timeline to grieve.”",
    "“Looking after myself honors the life we shared.”",
    "“Feeling joy again does not mean I have forgotten.”"
   ],
   "people": "Try: “Sunday evenings are the hardest. Would you call me then for a while?”"
  },
  "helper": {
   "feel": "They may be worn out from months or years of caregiving, overwhelmed by paperwork, and lonely once the funeral crowd goes home. They may stop eating or sleeping well, and their own health can slip.",
   "say": [
    "“Tell me about her.”",
    "“I'm bringing supper Thursday. Is 5 okay?”",
    "“Which time of day is hardest now?”"
   ],
   "avoid": [
    "“At least you had many years together.”",
    "“You should sell the house,” or any big choice made for them.",
    "Talking over them about their home or their money.",
    "Disappearing after the first month."
   ],
   "help": [
    "Check in often in the first six months, and keep going past the first year.",
    "Share meals. Eating with someone helps the appetite and the heart.",
    "Help with one practical task at a time, side by side, and let them decide.",
    "Say their partner's name, and remember the anniversary."
   ],
   "you": "Their grief may stir your own losses, or your fear of losing your own partner. If the one who died was your parent, you are grieving too. Talk with someone you trust, and let others share the visits."
  },
  "faith": "For many people, faith is one door through this: prayers for the dead, rituals of remembrance, a congregation that keeps showing up, a sense that love continues. For others, a death stirs hard questions, and those belong here too. If you have a faith leader, they can help with ritual and remembrance. Meaning can also come through family, nature, and the love you still carry.",
  "practices": [
   "branches|Shared Meal",
   "branches|Standing Call",
   "branches|Support Group",
   "leaves|Steady Wake Time",
   "leaves|Easy Meals Plan",
   "roots|Ritual"
  ],
  "reach": [
   "Call or text 988 any time if you think about joining your partner, or about ending your life. Veterans: 988, then press 1.",
   "Call 911 if you are in danger right now.",
   "Your doctor, especially in the first months, and if sleep, appetite, or weight change.",
   "A grief counselor, if grief stays intense or grows heavier after many months, or keeps you from daily life.",
   "If hospice cared for your partner, ask about its grief support.",
   "Eldercare Locator, 1-800-677-1116 (call or text): meals, rides, and help at home. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "friend-death",
  "ring": "loss",
  "title": "Outliving your friends",
  "keys": "friend died best friend death grief outliving friends last one left funerals old friends shrinking circle lonely losing friends",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Losing a friend is a real loss, even when the world treats it as a smaller one.",
   "In later life the goodbyes can come close together. It makes sense to feel worn down by them.",
   "Old friends hold your history. Grieve that too, and keep telling the stories.",
   "New friendships still grow late in life. They add to your circle; they never replace anyone."
  ],
  "feel": "The phone that no longer rings on Thursday morning. Another funeral, another card, another name crossed out in the address book. You may feel sad, numb, or simply tired of goodbyes. Some people feel quietly afraid of being the last one left, or guilty for still being here. Many feel deeply grateful for the years. All of it is normal, and all of it can be true on the same day.",
  "self": {
   "first": [
    "Let yourself grieve, even if people treat you as “only a friend.” Friendship counts.",
    "Go to the funeral or memorial if you can, or hold your own small goodbye at home: a candle, a photo, their favorite song.",
    "Call one person who knew them too, and share a story."
   ],
   "helps": [
    "Staying in touch with your friend's spouse or family, if that feels right. They are often lonely too.",
    "A Standing Call: the same friend, the same day, every week, with the friends still here.",
    "One group that meets often, so faces become familiar: a club, a class, a community center, a faith community.",
    "Grief Time: a set time each week to remember the friends you have lost, so grief has a place to go.",
    "Writing down the stories only you remember now, for yourself or for their family."
   ],
   "tell": [
    "“Grieving my friend is a way of honoring the friendship.”",
    "“I can miss them and still make room for new people.”",
    "“Being one of the last ones is lonely. It also means I get to carry their stories.”"
   ],
   "people": "You can ask for something small and specific. Try: “Ed and I had coffee every Thursday for thirty years. Would you call me Thursday mornings for a while? That's when I miss him most.”"
  },
  "helper": {
   "feel": "They may feel their grief is overlooked because they were “just” a friend. They may be worn down by many goodbyes in a short time, and lonelier than they let on. Some quietly wonder who will be left to call.",
   "say": [
    "“I am so sorry about Ruth. Tell me about her.”",
    "“How long were you two friends? How did you meet?”",
    "“Would you like a ride to the service? I would be glad to go with you.”"
   ],
   "avoid": [
    "“At your age, you have to expect it.”",
    "“At least she lived a long life” as the first thing you say.",
    "Pushing new friends or a new activity in the first weeks.",
    "Deciding for them whether they are up to the funeral or the trip."
   ],
   "help": [
    "Offer rides to funerals, memorials, and visits with the friends still here. Let them choose which ones.",
    "Help them keep in touch with friends far away, by phone or video, at their pace and in their own hands.",
    "Ask about the friend by name, and listen to the old stories, more than once.",
    "Notice the empty spots in the week: the day they used to call, the lunch they used to share, and the anniversary."
   ],
   "you": "Watching someone you love lose their circle can stir your own fear of aging and loss. That's human. Share the load with others, and keep your own friendships alive, too."
  },
  "faith": "Many traditions remember the dead together: memorial prayers, a candle, a name read aloud on a day of remembrance. If faith or a faith community steadies you, let it hold this loss too. If that isn't your way, a walk in a place you both loved, or raising a cup to your friend, can be its own goodbye. All of it honors the friendship.",
  "practices": [
   "bark|Grief Time",
   "bark|Letter to Someone Gone",
   "branches|Standing Call",
   "branches|Clubs",
   "branches|Friends",
   "trunk|Record a Story"
  ],
  "reach": [
   "Loneliness or low mood that settles in and stays for two weeks or more: talk with your doctor. It is common, and help works.",
   "Grief that stays as sharp as the first weeks after many months: talk with your doctor or a grief counselor.",
   "Thoughts of not wanting to live: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text): programs, groups, and rides near you.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays 8 to 4:30, for programs and groups close to home."
  ],
  "more": [
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "National Academies: Social Isolation and Loneliness in Older Adults",
    "https://www.nationalacademies.org/read/25663"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "child-death",
  "ring": "loss",
  "title": "Losing an adult child",
  "keys": "son died daughter died adult child died grown child death grief bereaved parent outliving my child child died before me grandchildren son-in-law daughter-in-law overdose",
  "parts": [
   "roots",
   "bark",
   "branches"
  ],
  "quick": [
   "Your child is your child at any age. This is one of the deepest losses a person can know.",
   "A child dying before a parent turns the expected order upside down. Feeling shaken to the core makes sense.",
   "People may ask first about the spouse or the grandchildren. Your grief counts fully, too.",
   "You will always be their parent. Saying their name keeps that bond in the room."
  ],
  "feel": "Disbelief, a deep ache, and a sense that it should have been you. Some parents carry guilt or questions that will not rest, especially after a sudden death, an overdose, or a suicide. You may find that sympathy flows to your child's spouse and children while you stand at the edge of the room. You may also grieve the future: the child who was going to help in your later years, or sit with you at the end. All of it is part of loving a child.",
  "self": {
   "first": [
    "Let others carry practical things for a while: meals, rides, errands.",
    "Keep up the basics: sleep, food, water, and your own medicines. Tell your doctor what has happened.",
    "Ask the funeral home, hospice, or your faith community about support for bereaved parents."
   ],
   "helps": [
    "Being with other parents who have lost a child, who understand without explanation. The Compassionate Friends welcomes parents and grandparents.",
    "Saying your child's name, keeping photos out, and marking their birthday in a way that fits you.",
    "A Letter to Someone Gone: what you remember, what you're thankful for, what you would still like to say.",
    "Staying close to your grandchildren and your child's spouse or partner where you can, and talking openly about how the family will keep in touch."
   ],
   "tell": [
    "“I will always be her mother.”",
    "“My grief counts, even when others' grief is louder.”",
    "“I am doing the best I can with a loss no one should have to carry.”"
   ],
   "people": "You can name what you need. Try: “When you see me, please ask how I am doing, too. And say Mark's name. I love hearing it.”"
  },
  "helper": {
   "feel": "They may feel the world has turned upside down, and that their grief stands behind everyone else's in line. Many parents who lose a grown child say people ask about the grandchildren or the spouse first, and rarely about them. Some also carry quiet worry about their own future without this child.",
   "say": [
    "“I am so sorry about your son. How are you doing today?”",
    "“Tell me about Mark. What was he like as a boy?”",
    "“I am thinking of Lisa today, on her birthday.”"
   ],
   "avoid": [
    "Asking only about the grandchildren or the spouse.",
    "“At least you have other children.”",
    "“Everything happens for a reason,” or any explanation of the death.",
    "Taking over their decisions because you think they are too fragile."
   ],
   "help": [
    "Ask how they are doing, by name, before you ask about anyone else.",
    "Say their child's name, and remember the birthday and the anniversary, for years.",
    "Offer rides to visit the grandchildren or the grave, and let them set the pace.",
    "Help with the practical tasks they ask for, side by side, and leave the decisions in their hands."
   ],
   "you": "Being near a parent's grief is hard. If this was also your brother, sister, or parent, you are grieving too. Find support of your own, and let more than one person share the walk."
  },
  "faith": "Many parents find their questions for the sacred grow loud after a child dies. Anger, silence, and lament have a long place in many traditions, and a faith community at its best simply stays, sits, and carries. For others, meaning comes through family, through nature, or through carrying on their child's kindness. Every path is welcome, across all faith traditions and everything in-between.",
  "practices": [
   "bark|Grief Time",
   "bark|Letter to Someone Gone",
   "branches|Support Group",
   "roots|Lament",
   "bark|Slow Exhale"
  ],
  "reach": [
   "The Compassionate Friends supports parents, grandparents, and siblings after a child of any age dies.",
   "Grief that stays as sharp as the first weeks after many months, or keeps you from eating, sleeping, or seeing people: talk with your doctor or a grief counselor. Help works.",
   "Thoughts of not wanting to live, or of wanting to be with your child: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for help close to home. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays 8 to 4:30."
  ],
  "more": [
   [
    "The Compassionate Friends",
    "https://www.compassionatefriends.org"
   ],
   [
    "Alliance of Hope for Suicide Loss Survivors",
    "https://allianceofhope.org"
   ],
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "sibling-death",
  "ring": "loss",
  "title": "Losing a sibling",
  "keys": "brother died sister died sibling death grief twin last of my family only one left childhood big brother little sister",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "quick": [
   "A brother or sister is often the longest relationship of a life. Losing one is a big loss.",
   "Sympathy often goes first to their spouse and children. Your grief counts fully, too.",
   "Siblings hold your childhood. When one dies, a keeper of your early story is gone, and you carry it now.",
   "Close, distant, or complicated, the grief is real. What was left unsaid can still be tended."
  ],
  "feel": "A deep loneliness for the one who shared your parents, your childhood home, and your first memories. Some people feel suddenly old, or newly aware of their own health, especially when a sibling close in age dies. If you are now the last of your family, it can feel like standing alone at the front of the line. If the relationship was distant or hard, you may grieve what never was. Love, sorrow, regret, and even relief can all sit together.",
  "self": {
   "first": [
    "Let yourself grieve as a sister or brother, even when people turn first to the spouse and children.",
    "Take part in the goodbye in a way that fits you: speak at the service, bring a photo, or hold your own remembrance at home.",
    "Reach out to the people who knew you both: cousins, old neighbors, their children."
   ],
   "helps": [
    "Telling the family stories, and writing down the ones only you remember now.",
    "Looking through old photos with someone who will listen.",
    "Staying close to your nieces and nephews, who may treasure your stories of their parent.",
    "If health runs in your family, bringing it up at your next doctor's visit. Your doctor can help you sort out what matters for you.",
    "If something was left unsaid, a letter, a prayer, or a quiet word spoken aloud."
   ],
   "tell": [
    "“I was her sister for seventy years. Of course this hurts.”",
    "“I can grieve the brother I had and the brother I wished for.”",
    "“I carry our family's stories now.”"
   ],
   "people": "Try: “Everyone asks about his wife and kids, and they should. It would mean a lot if you asked about me, too. He was my big brother.”"
  },
  "helper": {
   "feel": "They may feel overlooked as sympathy flows to the spouse and children. They may miss the one person who remembers their childhood, worry about their own health, or feel alone as the last of their family.",
   "say": [
    "“I am so sorry about your brother. What was he like when you were kids?”",
    "“You two shared a whole lifetime.”",
    "“How are you doing with this?”"
   ],
   "avoid": [
    "Asking only about the spouse and children.",
    "“At least you weren't close,” or “At least you had many years.”",
    "Turning the talk to their own health or age before they do.",
    "Deciding for them whether they are up to traveling to the funeral."
   ],
   "help": [
    "Ask about the sibling by name, and invite the childhood stories, the funny ones and the hard ones.",
    "Help them get to the funeral, the family gathering, or the grave, if they want to go.",
    "Help them stay in touch with nieces, nephews, and cousins, in their own way.",
    "Remember the birthday and the anniversary."
   ],
   "you": "If this sibling was your aunt or uncle, or a friend of your own, you are grieving too. It may also stir worry about your own brothers and sisters. Take care of that, call your own siblings, and let others share the walk."
  },
  "faith": "For many families, faith and ritual run through childhood: a song your mother sang, the words said at the table, the place of worship you grew up in. Those memories can be a comfort now, or bring up old questions, and either is welcome. Some people honor a sibling by visiting a place from childhood, or sharing a family meal in their memory.",
  "practices": [
   "trunk|Life Review",
   "trunk|Record a Story",
   "bark|Grief Time",
   "trunk|Peace With the Past",
   "branches|Family"
  ],
  "reach": [
   "Grief that stays as sharp as the first weeks after many months, or keeps you from daily life: talk with your doctor or a grief counselor. Help works.",
   "Thoughts of not wanting to live: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for grief groups and help close to home. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays 8 to 4:30."
  ],
  "more": [
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "grief-stuck",
  "ring": "loss",
  "title": "When grief won't ease",
  "keys": "grief stuck prolonged grief complicated grief still grieving years later cant move on cant accept death widow widower miss them every day grief counselor",
  "parts": [
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "Most grief softens with time. The love stays, and the sharpest pain slowly makes room for the rest of life.",
   "When grief stays as sharp as the first weeks after many months, that is a sign to get help, and help works at any age.",
   "Your doctor or a grief counselor is a good first call. Grief groups help many people too.",
   "Getting better is not forgetting. It makes room to carry your love and still live your own days."
  ],
  "feel": "Months or years later, it can still feel like it just happened. You may long for them most of the day, find it hard to believe they are really gone, or stay away from anything that reminds you. Some people feel numb, or feel that part of them died too. Days can feel empty, and plans for the future can feel pointless. Some feel ashamed that it has lasted so long, or worry that others are tired of hearing about it.",
  "self": {
   "first": [
    "Tell your doctor how long it has been and how hard the days are. Grief can wear on sleep, appetite, and health, and your doctor can help you find a grief counselor.",
    "Ask a hospice, your faith community, or a community center about a grief group near you.",
    "Tell one person the truth: “It hasn't gotten easier.”"
   ],
   "helps": [
    "Talking with a counselor trained in grief that lingers. This kind of help works well in later life too.",
    "Grief Time: a set time each day to remember them, so grief has a place to go and other hours can hold other things.",
    "Small steady routines: a daily walk, meals at the same times, a standing call with a friend.",
    "A letter to the one who died: what you miss, what you're thankful for, what you'd still like to say."
   ],
   "tell": [
    "“Needing help with grief is not weakness. It is love that needs somewhere to go.”",
    "“Feeling better does not mean forgetting.”",
    "“I can carry my love for them and still live my own days.”"
   ],
   "people": "Try: “It's been a long time, and my grief hasn't eased. I think I need more help. Would you help me find someone to talk to?”"
  },
  "helper": {
   "feel": "They may feel ashamed that grief has lasted so long, worried that people are tired of hearing about it, or afraid that getting better means letting go of the one who died.",
   "say": [
    "“How is your grief these days, really? I have time.”",
    "“Tell me about her. I'd love to hear.”",
    "“It makes sense that you still miss him so much. Would talking with a grief counselor help? I could find one with you.”"
   ],
   "avoid": [
    "“It's been long enough. Time to move on.”",
    "Deciding for them that they need help, or talking about their grief to others in front of them.",
    "Going quiet about the person who died."
   ],
   "help": [
    "Keep asking, and keep saying their person's name.",
    "Offer to find a grief group or counselor with them, and offer a ride. Let them choose.",
    "Help them bring it up with their doctor, if they'd like you there.",
    "If you hear a wish to die or to join their person, ask directly and call or text 988 together."
   ],
   "you": "Long grief can wear on the people walking beside it, and their loss may be yours too. Keep your own supports. You don't have to fix it. Staying near is enough."
  },
  "faith": "For many people, faith and ritual hold grief that words can't: prayers for the dead, remembrance days, a community that keeps showing up. For others, a long grief brings hard questions, or a feeling that the sacred has gone quiet. Both are welcome. Lament, honest prayer about what hurts, is one of the oldest practices there is. A chaplain, pastor, or spiritual director can walk with these questions too.",
  "practices": [
   "bark|Grief Time",
   "bark|Talk About Your Mood",
   "roots|Lament",
   "branches|Support Group",
   "bark|Letter to Someone Gone"
  ],
  "reach": [
   "Grief that stays as sharp as the first weeks after many months, or keeps you from eating, sleeping, or getting through the day: talk with your doctor or a grief counselor.",
   "Thoughts of wanting to die, or to join the one who died: call or text 988, any time. Veterans: call 988, then press 1.",
   "Danger right now: call 911.",
   "Grief groups and services near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "holidays-alone",
  "ring": "loss",
  "title": "Holidays and anniversaries alone",
  "keys": "holiday alone christmas thanksgiving hanukkah easter new year birthday anniversary wedding anniversary lonely by myself no family far away widow widower first holiday",
  "parts": [
   "branches",
   "fruit",
   "roots"
  ],
  "quick": [
   "Spending a big day alone is common in later life, and it can be planned for.",
   "Alone and lonely are different. A quiet day can be a good day.",
   "Plan ahead: one thing to look forward to, one person to talk with, one way to remember.",
   "Say yes to an invitation, or make one. Many people are waiting to be asked."
  ],
  "feel": "The days before can bring dread. Music, ads, and other people's plans can make the quiet feel louder. You may miss the people who used to fill the table, feel forgotten by family far away, or feel embarrassed to say you'll be alone. Some people feel relief at a quieter day, and that is okay too.",
  "self": {
   "first": [
    "Decide ahead of time how you want the day to go, hour by hour if it helps.",
    "Set one call or visit for the day itself, and one for the day after.",
    "Plan one small thing to look forward to: a favorite meal, music, a walk, a show."
   ],
   "helps": [
    "Keeping one tradition that still feels right, and letting the rest rest for now.",
    "Remembering someone you miss with a candle, a photo, or their recipe.",
    "Serving others on the day: a community meal, a faith community event, a card to someone else who is alone.",
    "Calling the Eldercare Locator a few weeks ahead to find community meals, rides, and events near you."
   ],
   "tell": [
    "“A quiet day is still a real day.”",
    "“I can miss the old days and still enjoy this one.”",
    "“Reaching out first is a gift, not a bother.”"
   ],
   "people": "Try: “I'll be on my own for the holiday this year. Could we have a call that morning?” Or: “Would you like to spend the day together? I'd rather not be alone, and maybe you'd rather not be either.”"
  },
  "helper": {
   "feel": "They may not tell you they will be alone. Many older adults don't want to be a bother, or feel embarrassed to ask.",
   "say": [
    "“What are your plans for the holiday? I'd love to be part of it.”",
    "“I'll call you that morning. Is 9 a good time?”",
    "“Your anniversary is next week. I'm thinking of you, and of her.”"
   ],
   "avoid": [
    "Assuming they are fine because they didn't say otherwise.",
    "Planning their day for them without asking.",
    "One call on the day, then silence until next year."
   ],
   "help": [
    "Ask early, and offer a specific time.",
    "Offer a ride to a gathering, a service, or a community meal.",
    "Let them bring something: a dish, a story, a toast.",
    "Put their hard dates in your own calendar, for years."
   ],
   "you": "You can't fill every empty chair, and you don't have to. One call, one visit, or one invitation matters more than you know. Holidays may stir your own losses too, so be gentle with yourself."
  },
  "faith": "Many holidays are holy days. For some, a service, a candle, or prayers known by heart bring the old days close and make the day less lonely. Many faith communities welcome people on holidays, and some offer rides. If faith isn't part of your life, any ritual of remembering or giving can give the day a shape.",
  "practices": [
   "fruit|Something to Look Forward To",
   "branches|Standing Call",
   "roots|Ritual",
   "branches|Shared Meal",
   "fruit|Pay It Forward"
  ],
  "reach": [
   "Holiday sadness that lasts long after the day, or grows heavier each year: talk with your doctor or a counselor.",
   "Community meals, rides, and events near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: call 988, then press 1.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways"
   ],
   [
    "US Surgeon General: Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ]
  ]
 },
 {
  "id": "pet-death",
  "ring": "loss",
  "title": "Losing a pet",
  "keys": "pet dog cat bird died death euthanasia put down put to sleep animal companion grief rehome rehoming new home for my pet moving lonely quiet house",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "quick": [
   "Grief for a pet is real grief. You lost daily company and part of the shape of your day.",
   "For many older adults, a pet is a reason to get up, a reason to walk, and someone to talk to. Expect to feel the loss in every hour.",
   "Choosing a peaceful death, or a new home for a pet you could no longer keep, is an act of love.",
   "There is no deadline to decide about another animal. You choose what fits your life now."
  ],
  "feel": "The house is too quiet. You still listen for paws on the floor, or reach for the food bowl at the usual time. Mornings may feel pointless without someone waiting for you. You may feel guilty about a decision, or embarrassed by how much it hurts. If a move or your health meant giving your pet a new home, you may grieve someone who is still alive.",
  "self": {
   "first": [
    "Let yourself grieve. Cry, talk to them, tell their stories.",
    "Tell someone who knew them, or who has loved an animal the same way.",
    "Keep the parts of the old routine that still help: the morning walk, the chair by the window, a reason to get up."
   ],
   "helps": [
    "A small memorial: a photo by your chair, a planted flower, their collar or tag in a special place.",
    "A letter to them, or a list of your favorite days together.",
    "A pet loss support group, in person, by phone, or online.",
    "When you are ready, other ways to be with animals: feeding birds, visiting a friend's pet, volunteering at a shelter, or fostering. If you bring a new animal home, make a plan for who would look after them if you are sick or move."
   ],
   "tell": [
    "“My grief shows how much I loved them.”",
    "“I gave them a good life, and they gave me one too.”",
    "“I can decide about another pet in my own time.”"
   ],
   "people": "Try: “I lost Biscuit this week. She was my company every day, and the house is so quiet. Could you come by for coffee?”"
  },
  "helper": {
   "feel": "They may feel embarrassed at how deep the grief goes, or worry that others will think it was just an animal. They may have lost the reason they got up and out each morning.",
   "say": [
    "“I'm so sorry about Biscuit. She was such good company for you.”",
    "“What was she like? Tell me your favorite story.”",
    "“Would you like company for your morning walk this week?”"
   ],
   "avoid": [
    "“It was just a dog.”",
    "“You should get another one,” or surprising them with a new pet.",
    "Deciding for them whether they are able to have another animal."
   ],
   "help": [
    "Use the pet's name, and share a memory if you have one.",
    "Help fill the empty hour: a walk, a call, a visit at the time they used to feed or walk their pet.",
    "Send a note a month later, when most people have forgotten.",
    "If they want another animal, help them think it through, then let them decide."
   ],
   "you": "You don't need to have loved this animal to honor the bond. If it brings back pets you have lost, that's okay. Simple kindness and a few visits go a long way."
  },
  "faith": "Some traditions bless animals or give thanks for their lives, and a simple blessing can be a meaningful goodbye. People sometimes wonder where their pet is now. Those questions are welcome, and a chaplain or faith leader can talk them through with you.",
  "practices": [
   "bark|Letter to Someone Gone",
   "roots|Ritual",
   "trunk|Reason to Get Up",
   "leaves|Walk Your Way",
   "fruit|Watch Something Grow"
  ],
  "reach": [
   "Grief that keeps you from eating, sleeping, or daily life for weeks: talk with your doctor or a counselor.",
   "Thoughts of ending your life: call or text 988, any time. Veterans: call 988, then press 1. Danger right now: call 911.",
   "Meals, visitors, rides, and other help near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "new-diagnosis",
  "ring": "body",
  "title": "A new diagnosis",
  "keys": "diagnosis new diagnosis chronic illness long term condition diabetes heart failure copd kidney disease parkinsons arthritis cancer test results doctor appointment questions for the doctor bad news",
  "parts": [
   "leaves",
   "bark",
   "fruit"
  ],
  "quick": [
   "The first days after news like this are often a blur. You don't have to understand or decide everything at once.",
   "Write your questions down, and bring someone you trust to appointments.",
   "A long-term condition is one part of your life, not the whole of it. You are still you.",
   "Many people live well for years with a condition. Living well often comes in small, steady steps.",
   "Ask for help early. It lets the people who love you show it."
  ],
  "feel": "Shock, fear, or a strange calm. Some people feel numb for days, then sad or angry later. Some feel relief to finally have a name for what was wrong. Others feel tired before they've even started. You may worry about losing your independence, about being a burden, or about what comes next. Every one of these is a normal answer to big news.",
  "self": {
   "first": [
    "Give yourself a few days. Rest, eat, and let the news settle before you make big choices.",
    "Start a notebook just for this: questions, answers, medicines, and the names of your care team.",
    "Ask your doctor or nurse for the name of the condition written down, and what to watch for.",
    "Tell one person you trust what you've learned."
   ],
   "helps": [
    "Bringing someone to appointments to listen, take notes, and ask what you forget.",
    "Three questions for each visit: What does this mean for my daily life? What are my choices? What should I call you about?",
    "Asking your doctor or pharmacist to look over all your medicines whenever a new one is added.",
    "A support group with others living with the same condition. Many meet by phone or video.",
    "Keeping one thing you love on the calendar every week, so the condition doesn't fill the whole page."
   ],
   "tell": [
    "“I can take this one step at a time.”",
    "“I am more than this diagnosis.”",
    "“Asking questions is part of taking care of myself.”"
   ],
   "people": "Try: “I got some news from the doctor. I'm still taking it in. Would you come with me to my next appointment and help me keep track?”"
  },
  "helper": {
   "feel": "They may feel frightened, overwhelmed by new words and new medicines, and afraid of losing their say in their own life. Many older adults worry about becoming a burden, and some keep the news to themselves for that reason.",
   "say": [
    "“Thank you for telling me. I'm with you.”",
    "“What would help most this week?”",
    "“Would you like me to come to the next appointment, or would you rather go on your own?”",
    "“What questions do you want to be sure to ask?”"
   ],
   "avoid": [
    "Talking to the doctor about them as if they weren't in the room.",
    "Taking over their medicines, calendar, or decisions without asking.",
    "Cure stories, miracle products, and “My aunt had that, and she...”",
    "“At least it's not worse.”"
   ],
   "help": [
    "Drive to appointments, sit beside them, and take notes they can keep.",
    "Help them write questions before each visit, in their own words.",
    "Ask before you help, every time, and let them do what they can.",
    "Keep inviting them to ordinary life: meals, visits, the things they love."
   ],
   "you": "News like this can stir your own fear of losing them, and your own worries about the future. Find your own person to talk to, and keep up your own rest and health. You are walking beside them, and you can take turns with others."
  },
  "faith": "For many people, faith, prayer, ritual, and a faith community are a deep resource when health news comes. Some find a blessing, an anointing, or the prayers of others brings real comfort. Others carry hard questions, or feel far from what used to steady them, and that belongs too. If you have a faith leader or a chaplain, they can sit with you in this. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "leaves|Medicine",
   "bark|Name It",
   "branches|Ask for Help",
   "branches|Support Group",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Ask your doctor or clinic about a nurse, a social worker, or a chaplain who can help you understand the news and plan ahead.",
   "Low mood for two weeks or more, or losing interest in things you usually enjoy: tell your doctor. It responds well to help, at any age.",
   "Thoughts of not wanting to live: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Rides, meals, and help at home anywhere in the US: Eldercare Locator, 1-800-677-1116 (call or text).",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "New symptoms that frighten you, or danger right now: call 911."
  ],
  "more": [
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "CDC, chronic disease and healthy aging",
    "https://www.cdc.gov/mmwr/volumes/67/wr/mm6737a4.htm"
   ],
   [
    "CDC Healthy Aging",
    "https://www.cdc.gov/healthy-aging/about/index.html"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "The Conversation Project: talking about what matters most",
    "https://theconversationproject.org/"
   ]
  ]
 },
 {
  "id": "pain",
  "ring": "body",
  "title": "Living with pain",
  "keys": "pain chronic pain ache aches hurting sore arthritis back pain joint pain nerve pain neuropathy hurts every day pain medicine bad days flare cant sleep from pain",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "Your pain is real, whether or not anyone can see it.",
   "Pain that is new, worse, or different deserves a talk with your doctor or nurse. Pain can often be eased.",
   "Questions about pain medicines belong with your doctor or pharmacist, every time.",
   "Pain is part of your day. It doesn't get to be the whole of who you are.",
   "Sudden, severe pain, or chest pain: call 911."
  ],
  "feel": "Worn down. Tired of hurting, and tired of talking about it. Some days you may feel short-tempered, or sad, or afraid of what the pain means. You may pull back from people and plans because you can't count on your body. Many people also feel alone in it, because pain doesn't show on the outside.",
  "self": {
   "first": [
    "Tell your doctor or nurse what your pain is like: where it is, when it's worse, and what it keeps you from.",
    "Keep a simple pain notebook for a week: a number from 0 to 10, morning and evening, and what you were doing.",
    "Make a list of every medicine, vitamin, and supplement you take, and bring it to your doctor or pharmacist.",
    "Find the most comfortable spot you can, and let yourself rest there without guilt."
   ],
   "helps": [
    "Pacing: doing a little, resting a little, instead of pushing through and paying for it later.",
    "Movement your doctor or a physical therapist says fits your body, even from a chair.",
    "Giving your mind something kind to hold: music, a voice you love, a favorite show, a window.",
    "Planning the day around your better hours, and saving them for what matters most to you.",
    "Saying yes to company, even for a short visit."
   ],
   "tell": [
    "“My pain is real, and so is the rest of me.”",
    "“A hard hour is not a hard life.”",
    "“Rest is part of how I take care of myself.”"
   ],
   "people": "Try: “I want to come. I may need to sit most of the time, or leave early. Is that okay?”"
  },
  "helper": {
   "feel": "They may feel worn out, unbelieved, or embarrassed to keep saying it hurts. Many older adults play their pain down so they won't seem like complainers or a burden, so the pain may be worse than they say.",
   "say": [
    "“I believe you.”",
    "“What is today like for you?”",
    "“What would make this easier right now?”",
    "“Would it help to tell your doctor how much this is getting in the way?”"
   ],
   "avoid": [
    "“You don't look like you're in pain.”",
    "Suggesting cures, remedies, or medicines. Questions about treatment belong with their doctor or pharmacist.",
    "“Everyone your age has aches.” Pain that stops someone from living deserves attention at any age.",
    "Doing everything for them on a bad day without asking."
   ],
   "help": [
    "Help them write down what the pain is like before an appointment, and go along if they want you there.",
    "Make plans that can bend: a shorter visit, a closer place, a chair with arms.",
    "Bring the outside in on bad days: news, photos, a meal, a show to watch together.",
    "Keep one good thing on the calendar with them each week."
   ],
   "you": "Watching someone you love hurt is hard, and you can't take the pain away. That is not your job. Your job is to believe them, stay close, and help them be heard. Keep your own rest and your own people, too."
  },
  "faith": "Many traditions hold words for bodies in pain: prayers for strength, psalms of lament, a practice of offering the hard hours, a ritual of anointing. Some people find comfort there, and some find their prayers change shape when the body hurts. Both belong. A chaplain or faith leader can sit with you if you'd like. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Body Scan",
   "leaves|Chair Stretch",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Pain that is new, worse, or different, or that keeps you from what matters to you: tell your doctor or nurse.",
   "Questions about pain medicines, or how they mix with your other medicines or with alcohol: ask your pharmacist or doctor.",
   "Sudden, severe pain, chest pain, or pain with trouble breathing: call 911.",
   "Pain wearing you down until you feel you can't go on: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Rides to appointments and help at home anywhere in the US: Eldercare Locator, 1-800-677-1116 (call or text).",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "CDC Healthy Aging",
    "https://www.cdc.gov/healthy-aging/about/index.html"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "falls",
  "ring": "body",
  "title": "After a fall",
  "keys": "fall fell falling fear of falling afraid to fall unsteady balance dizzy tripped slipped cant get up on the floor broken hip cane walker grab bars rugs home safety steadi matter of balance",
  "parts": [
   "leaves",
   "bark",
   "branches"
  ],
  "quick": [
   "Tell your doctor about every fall, even one with no injury. Ask for a fall risk check.",
   "One fall makes another more likely, and many falls can be prevented. Strength and balance practice helps.",
   "Small changes at home make a big difference: light, clear paths, grab bars, railings.",
   "Fear of falling is common, and it can be eased. Staying home and still makes falls more likely, not less.",
   "If you fall and can't get up, are hurt, or hit your head: call 911."
  ],
  "feel": "Shaken, embarrassed, or scared. Some people feel angry at their body, or worried that one fall means losing their independence. Many keep a fall to themselves so family won't worry or push for a move. Afterward, it's common to walk more stiffly, watch every step, and say no to outings you used to enjoy.",
  "self": {
   "first": [
    "Tell your doctor about the fall, even if you weren't hurt. Ask for a fall risk check.",
    "Ask your doctor or pharmacist to look over all your medicines. Some can add to dizziness.",
    "Keep a phone, or an alert button, with you, including in the bathroom and at night.",
    "Walk through your home and move one thing you could trip on today."
   ],
   "helps": [
    "Strength and balance practice most days, holding something sturdy. A physical therapist can show you what fits your body.",
    "Night lights from bed to bathroom, grab bars by the tub and toilet, and railings on both sides of the stairs.",
    "Sturdy, flat shoes that fit well, at home as well as out.",
    "Having your eyes checked, and wearing your glasses.",
    "A class on fear of falling, such as A Matter of Balance, offered in many communities.",
    "Learning, ahead of time, how to get up safely from the floor."
   ],
   "tell": [
    "“Telling my doctor is how I stay independent.”",
    "“Steady practice builds steady feet.”",
    "“Using a cane or a grab bar is a wise choice, not a defeat.”"
   ],
   "people": "Try: “I had a fall last week. I'm okay, but I want to tell you, and I'd like help making the house a little safer.”"
  },
  "helper": {
   "feel": "They may feel embarrassed, frightened, or afraid that telling you will lead to losing their home or their car keys. Many older adults hide falls for exactly that reason, so a calm, respectful response makes it easier for them to tell you next time.",
   "say": [
    "“I'm glad you told me. How are you feeling now?”",
    "“Would you like me to come along when you tell the doctor?”",
    "“What would help you feel steadier at home?”",
    "“You decide what changes. I'm happy to do the climbing and lifting.”"
   ],
   "avoid": [
    "“That's it, you can't live alone anymore.”",
    "Scolding, or “I told you to be careful.”",
    "Rearranging their home without asking.",
    "Doing everything for them. Staying still weakens the very muscles that keep them steady."
   ],
   "help": [
    "Encourage them to tell their doctor about every fall, and offer to go along.",
    "Walk through the home with them and make one change a week, with their say.",
    "Help them find a strength and balance class or a fear of falling class through the Eldercare Locator.",
    "Keep inviting them out, with a steady arm and a good plan."
   ],
   "you": "A fall can frighten you as much as them, and fear can push you to take over. Breathe first. Their safety and their dignity both matter, and you can protect both. Share the worry with someone you trust, and remember you can't prevent every fall."
  },
  "faith": "For some people, a fall stirs bigger questions about growing older, limits, and trust. Faith, prayer, and a faith community can be a steadying resource, and a congregation can offer rides, visits, and helping hands with home changes. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "leaves|Fall Confidence",
   "leaves|Home Safety Walk-Through",
   "leaves|Balance Practice",
   "leaves|Sit to Stand",
   "leaves|Tai Chi"
  ],
  "reach": [
   "After any fall, even with no injury: tell your doctor and ask for a fall risk check.",
   "If you fall and can't get up, are hurt, or hit your head: call 911.",
   "Falls classes, A Matter of Balance, home safety programs, and help at home anywhere in the US: Eldercare Locator, 1-800-677-1116 (call or text), or your Area Agency on Aging.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Fear of falling that has turned into low mood or staying home: tell your doctor."
  ],
  "more": [
   [
    "CDC STEADI: Stay Independent fall risk check",
    "https://www.cdc.gov/steadi/patient-resources/"
   ],
   [
    "CDC, facts about older adult falls",
    "https://www.cdc.gov/falls/data-research/facts-stats/index.html"
   ],
   [
    "A Matter of Balance, program review",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC4410326/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "hearing",
  "ring": "body",
  "title": "Hearing loss",
  "keys": "hearing loss hard of hearing deaf cant hear hearing aids hearing test audiologist ringing in ears tinnitus captions mumbling turn it up tv too loud phone calls left out of conversation",
  "parts": [
   "branches",
   "leaves",
   "bark"
  ],
  "quick": [
   "Hearing loss is very common in later life: about one in three people 65 to 74 has it, and nearly half of those over 75.",
   "The quiet cost is pulling back from conversation. Staying in the conversation is the goal.",
   "A hearing test is a simple, painless first step. Hearing aids, captions, and a few changes in how people talk all help.",
   "Needing help to hear says nothing about your mind or your worth. Hearing aids are a way to stay connected."
  ],
  "feel": "A family dinner turns into a blur of voices. You nod and smile without catching the joke. Phone calls feel like work, so you make fewer of them. You may feel worn out after a visit, embarrassed to ask again, or quietly left out at a table you used to lead. Some people feel it most at worship, at a grandchild's game, or in the voice of someone they love. Others hear from family long before they notice it themselves, and that can sting.",
  "self": {
   "first": [
    "Book a hearing test, or ask your doctor where to start.",
    "Turn on captions on your TV, your phone, and video calls.",
    "Tell one person: “I'm having trouble hearing. Please face me and slow down a little.”"
   ],
   "helps": [
    "Sitting with your back to the window and your better ear toward the speaker, away from kitchen and TV noise.",
    "Wearing hearing aids every day, so your brain gets used to the sound. The first weeks take patience.",
    "Going back to your hearing provider for adjustments until the aids feel right.",
    "Smaller gatherings, quieter restaurants, and video calls with captions, so you can see faces.",
    "Asking your doctor or the Eldercare Locator about lower cost hearing help, if cost is in the way."
   ],
   "tell": [
    "“Asking again is how I stay in the conversation.”",
    "“My hearing changed. I still have plenty to say.”",
    "“Hearing aids are like glasses for my ears.”"
   ],
   "people": "Try: “I want to hear you. Can we turn the TV down and sit where I can see your face?”"
  },
  "helper": {
   "feel": "They may feel embarrassed, worn out from straining, or left out, and may pretend to hear rather than ask again. Some push back on hearing aids because of what they seem to say about getting older. Hearing loss usually comes on slowly, so they may truly not notice what you notice.",
   "say": [
    "“I'd love for you to catch all of this. Can we move somewhere quieter?”",
    "“Would you like company for a hearing test? I could drive.”",
    "“Tell me what makes it easier, and I'll do it.”"
   ],
   "avoid": [
    "“Never mind, it's not important.” It leaves them outside the conversation.",
    "Shouting, or talking about them to someone else while they sit right there.",
    "Teasing about hearing aids, or “You only hear what you want to.”"
   ],
   "help": [
    "Get their attention first, face them, and speak clearly at a steady pace.",
    "Say it another way instead of repeating the same words louder.",
    "Choose quiet places and seats with good light on your face.",
    "Turn on captions at home and on video calls.",
    "Offer to go along to a hearing test, and let the choices be theirs."
   ],
   "you": "Repeating yourself can wear thin. Take a breath, and remember they are working harder to hear than you are to speak. Lean on your own people when you're tired."
  },
  "faith": "If worship or prayer gatherings have become hard to hear, many faith communities offer a hearing loop, a listening device, printed words, or captions on a screen. Ask an usher or a leader. A seat near the front, or a recording to listen to later at home, can bring back what you've been missing.",
  "practices": [
   "leaves|Hearing and Vision Check",
   "branches|Ask for Help",
   "branches|Friends",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Sudden hearing loss in one or both ears: see a doctor right away.",
   "Ringing, ear pain, or dizziness that won't go away: tell your doctor.",
   "Pulling back from people, or sadness that doesn't lift for two weeks or more: talk with your doctor.",
   "To find hearing services and help near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota: Minnesota Aging Pathways, 1-800-333-2433.",
   "Thoughts of not wanting to live: call or text 988. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "NIDCD: Age-related hearing loss",
    "https://www.nidcd.nih.gov/health/age-related-hearing-loss"
   ],
   [
    "The ACHIEVE study: hearing help and thinking",
    "https://www.achievestudy.org/press-kit"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Hearing Loss Association of America",
    "https://www.hearingloss.org"
   ]
  ]
 },
 {
  "id": "vision",
  "ring": "body",
  "title": "Vision loss",
  "keys": "vision loss low vision eyesight losing my sight blind blindness macular degeneration glaucoma cataracts diabetic eyes cant see cant read large print magnifier eye doctor reading the mail",
  "parts": [
   "leaves",
   "trunk",
   "branches"
  ],
  "quick": [
   "Low vision is more common with age, but age itself is not the cause. A yearly eye exam matters.",
   "When glasses, medicine, or surgery can't bring sight back, vision rehabilitation can help you make the most of the sight you have.",
   "Light, contrast, magnifiers, large print, and talking books open a lot of life back up.",
   "Staying independent often means doing things a new way, not giving them up."
  ],
  "feel": "The mail, the recipe, and the prayer book get harder to read. Faces blur across the room. You may stop going out at dusk, set aside a hobby you love, or worry about falling and about losing your independence. Some people feel grief for what they used to see, frustration with everyday tasks, or fear of what comes next. Some feel embarrassed to ask for help with things they've done all their lives. All of it makes sense.",
  "self": {
   "first": [
    "See an eye doctor, and ask: “Would vision rehabilitation help me?”",
    "Add light: a bright lamp aimed at what you're doing, and night-lights in halls and the bathroom.",
    "Try large print, a magnifier, or the bigger text setting on your phone."
   ],
   "helps": [
    "High contrast: bright tape on step edges, a dark plate for light foods, a light mug for dark coffee.",
    "One home for each thing, so you can find it by touch.",
    "Talking books, radio, podcasts, and voices on the phone.",
    "A low vision support group, where others share what works.",
    "Walking through your home for trip hazards, one fix at a time."
   ],
   "tell": [
    "“I'm learning new ways to do the things I love.”",
    "“Asking for a hand is still being independent. I'm choosing how.”"
   ],
   "people": "Try: “Please say your name when you come in, and put things back right where you found them.”"
  },
  "helper": {
   "feel": "They may grieve, worry about losing independence, or feel embarrassed to need help with things they've done all their lives. Some hide how much they can't see.",
   "say": [
    "“Hi, it's Sam.” Say your name when you come in.",
    "“What would make this easier for you?”",
    "“Want me to read it, or would you like the magnifier?”",
    "“The cup is just to the right of your plate.”"
   ],
   "avoid": [
    "Moving their things without telling them.",
    "Doing everything for them without asking first.",
    "Pointing and saying “over there.”",
    "Talking about them to others while they sit right there."
   ],
   "help": [
    "Offer your arm when walking, and say what's ahead: a step, a curb, a door.",
    "Help add lighting and contrast at home, with their say in every change.",
    "Help set up talking books and large text on their phone.",
    "Keep inviting them, and offer a ride."
   ],
   "you": "Watching someone you love lose their sight is a loss for you too. Let yourself feel it, and lean on your own people, so you can stay steady beside them."
  },
  "faith": "Many traditions offer scripture, prayer books, and hymnals in large print or audio. Prayers and songs known by heart need no light at all. If getting to worship is harder now, ask your faith community about a ride or a seat with good light.",
  "practices": [
   "leaves|Hearing and Vision Check",
   "leaves|Home Safety Walk-Through",
   "bark|Five Senses Pause",
   "trunk|Record a Story",
   "branches|Support Group"
  ],
  "reach": [
   "Sudden vision loss, flashes of light, a shadow or curtain over your sight, or eye pain: get emergency help right away.",
   "Changes in your sight you haven't had checked: see an eye doctor.",
   "Sadness, worry, or pulling back from people that doesn't lift: talk with your doctor.",
   "To find low vision services, rides, and help near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota: Minnesota Aging Pathways, 1-800-333-2433.",
   "Thoughts of not wanting to live: call or text 988. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "National Eye Institute: Low vision",
    "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/low-vision"
   ],
   [
    "National Eye Institute: Vision and aging",
    "https://www.nei.nih.gov/about/education-and-outreach/vision-and-aging-resources"
   ],
   [
    "National Library Service for the Blind and Print Disabled (talking books)",
    "https://www.loc.gov/nls/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "driving",
  "ring": "body",
  "title": "Giving up driving",
  "keys": "driving stop driving give up driving car keys taking the keys license no car rides getting around transportation independence unsafe driver dad wont stop driving mom driving worried bus",
  "parts": [
   "trunk",
   "branches",
   "bark"
  ],
  "quick": [
   "For many people, the car keys mean freedom. Giving them up is one of the hardest losses of later life, and grief is a fair response.",
   "Planning ahead, while you still drive, keeps the choice in your hands.",
   "Research links stopping driving with more low mood and a smaller world, so build new ways to get around before you need them.",
   "Families can raise it with dignity: early, in private, and with the person at the center of the decision."
  ],
  "feel": "You may feel angry, embarrassed, or trapped. The car carried you to work, to worship, to the grandchildren, and to the store on your own schedule. Asking for rides can feel like being a burden. You may feel your family is ganging up on you, or that people think you're done. You may also feel relief at setting down a worry you've carried on every drive. Many people feel several of these in one day.",
  "self": {
   "first": [
    "Make a plan now: which trips matter most, who could drive you, and what rides exist near you.",
    "Ask your doctor whether your eyes, health, or medicines affect your driving.",
    "Try one other way to get around this week, while it's still a choice."
   ],
   "helps": [
    "A driving evaluation with a driver rehabilitation specialist, for an honest outside view.",
    "Small changes first, if your doctor agrees they fit: daytime only, familiar roads, no highways.",
    "A list of rides: family, friends, neighbors, your faith community, volunteer driver programs, buses, and ride services.",
    "A standing ride to the places that matter most, so you don't have to ask every time.",
    "Giving something back: gas money, a meal, good company."
   ],
   "tell": [
    "“Stopping on my own terms is a strong choice.”",
    "“A ride is time together, not a debt.”",
    "“I can still go where my life is.”"
   ],
   "people": "Try: “I'd like to keep going to my Tuesday group. Could we set up a standing ride?”"
  },
  "helper": {
   "feel": "They may feel their freedom, privacy, and pride are all at stake. Many hear this talk as being told they're old. They may feel ganged up on, push back hard, or grieve quietly and say nothing.",
   "say": [
    "“I've noticed a few things on the road that worry me. Can we talk about it?”",
    "“What would you need to keep doing the things you love?”",
    "“Let's look at this together. Your say matters most.”"
   ],
   "avoid": [
    "Taking the keys or selling the car without them.",
    "Raising it in front of others, or as a family ambush.",
    "“You're too old to drive.” Safety is the question, not age."
   ],
   "help": [
    "Raise it early, before a crisis, and in private.",
    "Share what you've seen: specific, calm, and kind.",
    "Ask their doctor or a driving evaluation to weigh in, so it isn't you against them.",
    "Build the ride plan together before the last drive.",
    "Keep their calendar full: a standing ride to the places and people they love."
   ],
   "you": "This talk is hard for families too. You may feel guilt, worry, or the strain of new driving duties. Share the rides with others, and share the worry with someone you trust."
  },
  "faith": "For many people, getting to worship and a faith community matters a great deal. Many congregations have members glad to give rides, and it's worth asking. Being driven can become a time of company, good conversation, or quiet prayer, if that is your way.",
  "practices": [
   "branches|Ask for Help",
   "branches|Standing Call",
   "fruit|Something to Look Forward To",
   "trunk|Find Your Role"
  ],
  "reach": [
   "To find rides and transportation near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota: Minnesota Aging Pathways, 1-800-333-2433.",
   "Health, eyes, or medicines that may affect driving: talk with a doctor or pharmacist.",
   "Low mood, pulling away, or staying home most days after stopping: talk with your doctor.",
   "Thoughts of not wanting to live: call or text 988. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "Eldercare Locator: help finding rides and services",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways/"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Research: stopping driving and health in later life",
    "https://doi.org/10.1111/jgs.13931"
   ]
  ]
 },
 {
  "id": "hospital",
  "ring": "body",
  "title": "Surgery, recovery, or a hospital stay",
  "keys": "surgery operation hospital hospital stay recovery recovering discharge going home coming home rehab hip replacement knee replacement heart surgery confused after surgery confusion foggy delirium weak tired home health help at home",
  "parts": [
   "leaves",
   "branches",
   "bark"
  ],
  "quick": [
   "Recovery takes time, often longer than anyone expects. Slow is still progress.",
   "Before you go home, ask for the plan in writing, go over your medicines, and know who to call.",
   "Some people feel foggy or confused after surgery or a hospital stay. Tell your doctor about it.",
   "Letting people help is part of healing, and it gives them a way to love you."
  ],
  "feel": "Tired in a way sleep doesn't fix. Weaker than before, and frustrated by it. Glad to be home, and a little uneasy about being home. You may feel foggy, low, or teary, or worry about being a burden. Some people grieve how easily they used to do things. All of it is normal.",
  "self": {
   "first": [
    "Before you leave, ask for your plan for home in writing, and have someone you trust listen with you.",
    "Go over every medicine with your nurse or pharmacist: new ones, stopped ones, and changed ones.",
    "Write down who to call with questions, day or night, and keep it by the phone."
   ],
   "helps": [
    "Rest, and gentle movement in the ways your care team describes.",
    "Water and small, regular meals, even when your appetite is low.",
    "A clear path at home: lights on at night, rugs out of the way, the things you need within reach.",
    "One small thing each day that feels like you: a call, a page of a book, a seat by the window."
   ],
   "tell": [
    "“Healing keeps its own clock.”",
    "“Asking for help is part of getting better.”",
    "“Slow is still progress.”"
   ],
   "people": "Try: “Could you drive me to my follow-up visit on Tuesday? That would help me a lot.”"
  },
  "helper": {
   "feel": "They may feel weak, foggy, or embarrassed to need help, and worried about losing their independence. Some hide how hard it is so they won't be a bother.",
   "say": [
    "“What would help most today?”",
    "“Take your time. I'm in no hurry.”",
    "“You decide, and I'll help.”"
   ],
   "avoid": [
    "“You should be better by now.”",
    "Doing everything for them when they would rather try.",
    "Talking about them to doctors or family as if they aren't in the room."
   ],
   "help": [
    "Be a second set of ears at the hospital, and write down the plan for home.",
    "Keep a simple list of medicines that are new, stopped, or changed.",
    "Watch for new confusion, and tell their doctor about it.",
    "Offer specific help: a ride, a meal, the laundry, an hour of company."
   ],
   "you": "A hospital stay is hard on the people who love the patient, too. Eat, sleep when you can, and let others share the load."
  },
  "faith": "Many people find comfort in prayer before and after surgery, in a visit from the hospital chaplain, or in a faith community bringing a meal or a blessing home. Others find steadiness in quiet, in music, or in the people at their side. Any of these can hold you while your body mends.",
  "practices": [
   "bark|Slow Exhale",
   "branches|Ask for Help",
   "leaves|Medicine",
   "leaves|Home Safety Walk-Through",
   "leaves|Water Within Reach"
  ],
  "reach": [
   "Confusion that comes on suddenly, or seems to be getting worse: call the doctor right away.",
   "An emergency, or something that feels seriously wrong: call 911.",
   "Low mood that lasts two weeks or more: talk with your doctor. Thoughts of ending your life: call or text 988, any time.",
   "More help at home after a hospital stay: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433."
  ],
  "more": [
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways/"
   ],
   [
    "National Institute on Aging: health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "CDC STEADI: fall prevention for patients and families",
    "https://www.cdc.gov/steadi/patient-resources/"
   ]
  ]
 },
 {
  "id": "appetite",
  "ring": "body",
  "title": "Losing appetite or weight",
  "keys": "appetite no appetite not hungry losing weight weight loss not eating eating less skipping meals food tastes different cooking for one eating alone thin clothes loose malnutrition protein drinking water dehydrated meals on wheels",
  "parts": [
   "leaves",
   "branches",
   "bark"
  ],
  "quick": [
   "Weight you didn't plan to lose is worth telling your doctor about, even if you feel fine.",
   "Small meals with a little protein, and water within reach, go a long way.",
   "Food often tastes better with company. Eating with someone, even once a week, can lift appetite and heart alike.",
   "Many things can change appetite: medicines, teeth, taste, mood, or grief. Your doctor, dentist, or pharmacist can help sort it out."
  ],
  "feel": "Food just doesn't call to you the way it used to. Cooking for one feels like too much trouble. Your belt, your clothes, or your rings may feel looser. Food may taste different, or meals may feel lonely since someone is gone. You may not want anyone to fuss.",
  "self": {
   "first": [
    "Tell your doctor if you've lost weight without trying, or your appetite has stayed low.",
    "Ask your pharmacist whether any of your medicines can affect appetite or taste.",
    "Keep a glass of water within reach, and sip through the day, unless your doctor has asked you to limit fluids."
   ],
   "helps": [
    "Small, frequent meals and snacks instead of three big ones.",
    "A protein food at every meal: eggs, yogurt, beans, fish, cheese, or meat.",
    "Favorite foods, and a few easy meals kept on hand for low-energy days.",
    "Eating with someone: a friend, a community meal, a standing lunch date."
   ],
   "tell": [
    "“Small bites count.”",
    "“Feeding myself well honors the life I have.”"
   ],
   "people": "Try: “Would you like to have lunch together on Wednesdays? I eat better with company.”"
  },
  "helper": {
   "feel": "They may feel embarrassed, tired of being asked about food, or protective of their independence. Sometimes low appetite sits on top of grief, loneliness, or low mood.",
   "say": [
    "“Would you like company for supper this week?”",
    "“I made extra of your favorite soup. Want some?”",
    "“Have you mentioned this to your doctor? I could come with you.”"
   ],
   "avoid": [
    "Pushing, bribing, or counting bites.",
    "Comments about how thin they look, especially in front of others.",
    "Starting shakes, supplements, or vitamins without asking their doctor or pharmacist."
   ],
   "help": [
    "Share meals when you can, in person or over a video call.",
    "Bring favorite foods in small portions.",
    "Notice loose clothes or a near-empty fridge, and gently mention the doctor.",
    "Help them find community dining or meals delivered at home, if they want that."
   ],
   "you": "You can offer good food and good company. What they eat is theirs to decide. Let that take some weight off you, too."
  },
  "faith": "Many traditions bless food and gather people around a table. A blessing before a meal, even a few words of thanks, can slow you down and make a small meal feel like enough. If meals feel lonely, a faith community's suppers, or a friend from worship, may be glad of your company.",
  "practices": [
   "leaves|Appetite Helpers",
   "leaves|Protein at Every Meal",
   "leaves|Water Within Reach",
   "branches|Shared Meal",
   "roots|Mealtime Blessing"
  ],
  "reach": [
   "Weight loss you didn't plan, or an appetite that stays low: tell your doctor.",
   "Trouble chewing or swallowing, or sore teeth or gums: see your doctor or dentist.",
   "Low mood or grief that has taken your appetite for weeks: talk with your doctor. Thoughts of ending your life: call or text 988, any time.",
   "Serious illness: eating less can be part of the illness itself. Ask the doctor, nurse, or hospice team what it means and what helps.",
   "Meals at home or community dining nearby: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433."
  ],
  "more": [
   [
    "Dietary Guidelines and older adults (ACL summary)",
    "https://acl.gov/sites/default/files/nutrition/Nutrition%20Guidelines/DGA%20Policy%20&%20Practice%20Implications%201-17-23%20update_508.pdf"
   ],
   [
    "National Institute on Aging: dietary supplements for older adults",
    "https://www.nia.nih.gov/health/vitamins-and-supplements/dietary-supplements-older-adults"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Meals on Wheels America",
    "https://www.mealsonwheelsamerica.org"
   ]
  ]
 },
 {
  "id": "memory-worry",
  "ring": "mind",
  "title": "Worried about your memory",
  "keys": "memory forgetful forgetting forgetting names losing things misplacing memory loss memory problems dementia alzheimers worried about memory brain fog confused confusion cognitive decline mild cognitive impairment brain health am i getting dementia",
  "parts": [
   "bark",
   "leaves",
   "branches"
  ],
  "quick": [
   "Many memory changes come with getting older: a name that comes back later, glasses misplaced now and then.",
   "Getting lost somewhere familiar, trouble with everyday tasks, or changes others notice are worth bringing to a doctor.",
   "Fewer than half of people who worry about their memory mention it to a doctor. Saying it out loud is a strong first step.",
   "Hearing, vision, movement, mood, and good company all help keep the brain healthy."
  ],
  "feel": "A name won't come. You walk into a room and wonder why. Each slip can bring a flash of fear: is this the start of something? You may hide it, laugh it off, or lie awake wondering. You may worry about losing your independence, or about becoming a worry to your family.",
  "self": {
   "first": [
    "Write down what you've noticed, and when it happens.",
    "Make an appointment to talk with your doctor about it, and bring your list of medicines and vitamins.",
    "Bring someone you trust along, if you'd like a second set of ears."
   ],
   "helps": [
    "Simple memory helpers: one home for keys and glasses, a calendar by the door.",
    "Hearing and vision checks, and using the aids that help.",
    "Moving your body, restful sleep, and time with people you enjoy.",
    "Learning something new and a little challenging."
   ],
   "tell": [
    "“A forgotten name is not a diagnosis.”",
    "“Asking is a strong first step.”",
    "“I am so much more than my memory.”"
   ],
   "people": "Try: “I've been noticing some memory slips, and it's been worrying me. Would you come with me when I talk to my doctor?”"
  },
  "helper": {
   "feel": "They may feel frightened, embarrassed, or protective of their independence. Some keep the worry to themselves for a long time.",
   "say": [
    "“That sounds worrying. What have you noticed?”",
    "“Would you like me to come to the appointment with you?”",
    "“Whatever this is, you are still you, and I'm with you.”"
   ],
   "avoid": [
    "“Don't you remember?” or quizzing them.",
    "“Everyone forgets things,” said to wave away a real worry.",
    "Talking about them as if they aren't in the room, or deciding for them."
   ],
   "help": [
    "Gently encourage a visit to their doctor, and offer to go along.",
    "At the appointment, let them speak first, and add what you've noticed when they invite you.",
    "Help set up the memory helpers they choose, like a calendar or a pill organizer.",
    "Keep doing things together: walks, games, music, meals."
   ],
   "you": "Worry for someone you love is heavy. Talk with someone you trust. The Alzheimer's Association Helpline is there for family members too, any hour of the day or night."
  },
  "faith": "Many people find that prayers, songs, or verses learned long ago stay close, even on foggy days, and they can steady a worried heart. If faith is part of your life, you might hold this worry in prayer or bring it to a chaplain. If not, quiet, music, nature, or the people who love you can do the same steadying work.",
  "practices": [
   "bark|Memory Helpers",
   "bark|Self-Compassion Break",
   "leaves|Hearing and Vision Check",
   "trunk|Keep Learning",
   "leaves|Movement"
  ],
  "reach": [
   "Memory changes that get in the way of daily life, or that others notice: talk with your doctor.",
   "Confusion that comes on suddenly: call your doctor right away, or 911 in an emergency.",
   "Questions about memory, any hour: Alzheimer's Association 24/7 Helpline, 1-800-272-3900.",
   "Worry or low mood that won't lift: talk with your doctor. Thoughts of ending your life: call or text 988, any time.",
   "Help finding services nearby: Eldercare Locator, 1-800-677-1116. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433."
  ],
  "more": [
   [
    "Alzheimer's Association",
    "https://www.alz.org"
   ],
   [
    "Alzheimer's Association 24/7 Helpline",
    "https://www.alz.org/help-support/resources/helpline"
   ],
   [
    "CDC: subjective cognitive decline (memory worries)",
    "https://www.cdc.gov/healthy-aging-data/media/pdfs/subjective-cognitive-decline-508.pdf"
   ],
   [
    "Lancet Commission on dementia prevention (2024)",
    "https://www.thelancet.com/commissions-do/dementia-prevention-intervention-and-care"
   ]
  ]
 },
 {
  "id": "dementia",
  "ring": "mind",
  "title": "A dementia diagnosis",
  "keys": "dementia alzheimers diagnosis memory loss diagnosed mild cognitive impairment forgetting planning early stage",
  "parts": [
   "bark",
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "A diagnosis names an illness. It doesn't name you. Your history, humor, values, and love come with you.",
   "Many people live well for years after a diagnosis, especially when they stay active and connected.",
   "Now is the best time to plan, while you can say clearly what you want.",
   "You don't have to figure this out alone. The Alzheimer's Association Helpline is there any time: 1-800-272-3900."
  ],
  "feel": "Fear, grief, anger, or numbness. Some people feel relief at finally having a name for what they noticed. You may worry about becoming a burden, losing your independence, or how people will treat you now. Some days the news feels far away, and some days it is all you can think about. All of it is normal.",
  "self": {
   "first": [
    "Give yourself time with the news. You don't have to decide everything this week.",
    "Write down your questions for your doctor, and bring someone you trust to the next visit.",
    "Call the Alzheimer's Association Helpline, 1-800-272-3900, for yourself. They talk with people who are newly diagnosed, not only families."
   ],
   "helps": [
    "Keeping up what you love, changing how you do it rather than whether: the garden, the choir, the card game, the walk.",
    "Memory helpers: one home for keys and glasses, a big calendar by the door, a pill organizer, reminders on your phone.",
    "Moving your body, getting outside, and seeing people every week.",
    "A group for people who are newly diagnosed, where you can talk with others who understand.",
    "Planning now: choosing a health care agent, putting your wishes in writing, and asking an attorney about a power of attorney for money and legal papers.",
    "Talking with your doctor about driving early, so it stays your choice."
   ],
   "tell": [
    "“I am still me.”",
    "“I can still choose how I live, and I can plan for what comes next.”",
    "“Asking for help is part of living well.”"
   ],
   "people": "You choose who to tell, and when. Try: “I've been diagnosed with dementia. I'm still me. Please talk to me, not around me. One thing that would help is a weekly call.”"
  },
  "helper": {
   "feel": "They may feel afraid, embarrassed, or watched, and worried that people will start treating them like a child. Many want to keep living their own life for as long as they can, and they can.",
   "say": [
    "“How are you feeling about all this?”",
    "“What would you like to keep doing?”",
    "“Take your time. I'm not in a hurry.”"
   ],
   "avoid": [
    "“Do you remember?” It can feel like a test.",
    "Talking about them in front of them, or to the doctor instead of them.",
    "Correcting every small slip, or taking over tasks they can still do."
   ],
   "help": [
    "Do things with them, not for them. Offer two simple choices when choices get harder.",
    "Help them plan while they can lead: a health care agent, written wishes, and legal and money papers.",
    "Ask about their stories. Long-ago memories often stay strong, and telling them is a joy.",
    "Keep inviting them. Staying connected matters."
   ],
   "you": "Walking beside dementia is a long road, and it brings its own grief. Join a caregiver group, keep your own sleep and friends, and call the Alzheimer's Association Helpline, 1-800-272-3900, any time you need it."
  },
  "faith": "For many people, prayers learned long ago, familiar hymns, sacred music, and rituals stay close even as memory changes. If faith is part of your life, a faith leader can visit, pray with you, and help your community keep including you. If it isn't, music, nature, and the people you love can hold the same kind of steadiness.",
  "practices": [
   "bark|Memory Helpers",
   "fruit|Make Your Wishes Known",
   "trunk|What I Want Remembered",
   "trunk|Record a Story",
   "branches|Support Group",
   "leaves|Walk Your Way"
  ],
  "reach": [
   "Alzheimer's Association 24/7 Helpline: 1-800-272-3900, for you or your family, any time.",
   "Eldercare Locator: 1-800-677-1116 (call or text), for help and services near you.",
   "In Minnesota, Minnesota Aging Pathways: 1-800-333-2433, weekdays.",
   "If the news brings thoughts of not wanting to live: call or text 988. Veterans: 988, then press 1. Danger right now: 911.",
   "If someone is taking advantage of you, in Minnesota call MAARC, 1-844-880-1574, any time."
  ],
  "more": [
   [
    "Alzheimer's Association",
    "https://www.alz.org"
   ],
   [
    "Alzheimer's Association Helpline",
    "https://www.alz.org/help-support/resources/helpline"
   ],
   [
    "PREPARE for Your Care",
    "https://prepareforyourcare.org"
   ],
   [
    "The Conversation Project",
    "https://theconversationproject.org/"
   ],
   [
    "Honoring Choices Minnesota",
    "https://www.honoringchoices.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "depression",
  "ring": "mind",
  "title": "Depression in later life",
  "keys": "depression depressed low mood sad empty flat no interest not myself tired hopeless withdrawn lost interest",
  "parts": [
   "bark",
   "fruit",
   "branches",
   "leaves"
  ],
  "quick": [
   "In later life, depression often shows up as lost interest, tiredness, aches, or \"not myself\" more than sadness.",
   "Depression is not a normal part of getting older, and it is not a weakness.",
   "It responds well to treatment in later life. Start with your doctor.",
   "If hope feels gone, call or text 988 today. Veterans: 988, then press 1."
  ],
  "feel": "Flat, heavy, or empty. The things you used to enjoy, like the garden, the phone calls, or the card game, don't pull at you anymore. Sleep and appetite change. You may feel tired in a way rest doesn't fix, have more aches, or feel short with people. Many people say, \"I'm just not myself,\" or blame it on age.",
  "self": {
   "first": [
    "Notice whether you've felt low, or lost interest in things you usually enjoy, for two weeks or more. Write it down in a sentence or two.",
    "Make a doctor's appointment and say it plainly: \"I haven't felt like myself, and I'd like to talk about my mood.\"",
    "Tell one person how you are really doing."
   ],
   "helps": [
    "Treatment through your doctor: talk therapy, medicine, or both. Your doctor can help you choose.",
    "Bringing your medicine list to the visit, since some medicines can affect mood. Your doctor or pharmacist can check.",
    "Morning daylight, and a little movement each day in ways that fit your body.",
    "A simple daily rhythm: getting up at the same time, a regular meal, one small plan.",
    "Being around people, even without talking much: a standing call, a shared meal, a group."
   ],
   "tell": [
    "“This is an illness talking, not the truth about me or my life.”",
    "“Small steps still count.”",
    "“I don't have to feel like it to take the next step.”"
   ],
   "people": "Try: “I've been feeling low for a while, more than I've let on. Would you check in on me this week?”"
  },
  "helper": {
   "feel": "They may feel like a burden, or think it's just part of getting old. Many pull away from the very people who could help, and some feel ashamed to bring it up.",
   "say": [
    "“I've noticed you haven't seemed like yourself. I care about you.”",
    "“You don't have to explain it. I'm here.”",
    "“Would you like me to come with you to the doctor?”",
    "“Are you thinking about ending your life?” Asking plainly is safe and caring."
   ],
   "avoid": [
    "“Snap out of it.” It is an illness, not a choice.",
    "“It's just old age.” Depression is not normal aging.",
    "“Look on the bright side,” or “Others have it worse.”"
   ],
   "help": [
    "Small, low-pressure invitations: a drive, a short walk, a meal together.",
    "A practical hand with one hard thing: a ride, a call, an appointment.",
    "Help them bring it up with their doctor, and follow up afterward.",
    "Keep inviting them, even when they say no."
   ],
   "you": "Walking beside someone who is depressed is tiring, and their low mood can pull on yours. Keep your own sleep, walks, and people, and share the load with family, friends, and their doctor. You are a companion, not a cure."
  },
  "faith": "If faith is part of your life, lament is one of the oldest ways people have prayed: honest words for sorrow that doesn't lift quickly. A faith leader or a community can carry you on days you can't carry yourself. If faith isn't part of your life, the same steadiness can come from people who keep showing up.",
  "practices": [
   "bark|Talk About Your Mood",
   "fruit|Tiny Next Step",
   "leaves|Morning Daylight",
   "branches|Standing Call",
   "fruit|Three Good Things"
  ],
  "reach": [
   "Low mood, or lost interest in things you usually enjoy, lasting two weeks or more: talk with your doctor.",
   "Thoughts of not wanting to be here, or of ending your life: call or text 988, any time.",
   "Veterans Crisis Line: 988, then press 1, or text 838255.",
   "Danger right now: call 911.",
   "Eldercare Locator: 1-800-677-1116 (call or text), for services near you. In Minnesota, Minnesota Aging Pathways: 1-800-333-2433."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Veterans Crisis Line",
    "https://www.veteranscrisisline.net"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ],
   [
    "Geriatric Depression Scale (Hartford Institute)",
    "https://hign.org/consultgeri/try-this-series/geriatric-depression-scale-gds"
   ]
  ]
 },
 {
  "id": "anxiety",
  "ring": "mind",
  "title": "Worry and anxiety",
  "keys": "anxiety worry worried nervous fear restless cant sleep health worries money worries memory worries family worries fear of falling panic",
  "parts": [
   "bark",
   "leaves",
   "branches"
  ],
  "quick": [
   "Worry is common in later life, often about health, money, memory, and family. Caring about these things is natural.",
   "A worry is a thought, not a fact. Notice it, then come back to what is true right now.",
   "Small steps toward what you fear shrink it. Staying home to avoid it tends to feed it.",
   "Anxiety in later life responds well to help. Tell your doctor if worry fills your days."
  ],
  "feel": "A mind that keeps circling: the test result, the bills, the name you couldn't find, the grandchild far away. Anxiety can also live in the body: trouble sleeping, tight shoulders, an upset stomach, restlessness, or checking things again and again. Some people quietly start staying home more, or stop doing what they enjoy, because worry gets there first.",
  "self": {
   "first": [
    "Breathe out a little longer than you breathe in, five times.",
    "Write the worry down in one plain sentence, so it stops circling.",
    "Ask yourself: is there one small step I can take on this today? If yes, take it. If not, set it down for now."
   ],
   "helps": [
    "A worry window: fifteen minutes a day, not near bedtime, to think worries through. Save other worries for the window.",
    "Moving a little each day, in ways that fit your body.",
    "Going easy on caffeine, especially after noon.",
    "Telling someone you trust. Saying a worry out loud often shrinks it.",
    "Keeping up the things you enjoy, with support if fear of falling or getting lost is part of the worry."
   ],
   "tell": [
    "“This is a worry, not a fact.”",
    "“I have handled hard things before.”",
    "“I only need to take the next small step.”"
   ],
   "people": "Try: “I've been worrying a lot lately, and it helps to say it out loud. Could I tell you about it? I don't need you to fix it.”"
  },
  "helper": {
   "feel": "Their worries are often about real things, and they may feel embarrassed to admit how much worry takes up their day. Many don't want to be a bother, so they keep it to themselves.",
   "say": [
    "“That sounds like a lot to carry.”",
    "“What worries you most about it?”",
    "“What would help right now?”"
   ],
   "avoid": [
    "“Just stop worrying.” Worry doesn't obey orders.",
    "Arguing with each fear point by point.",
    "Taking over tasks so they never face the hard thing. It can shrink their world."
   ],
   "help": [
    "Listen first, then ask what would help.",
    "Take one small step together: a call, an appointment, a short outing.",
    "Offer a steady routine, like a weekly call or walk they can count on.",
    "Encourage a doctor visit if worry fills their days, and offer to go along."
   ],
   "you": "Their worry can stir up yours, especially when you live far away. Keep your own practices, and remember you can be steady without solving everything."
  },
  "faith": "If faith is part of your life, many traditions hold words for anxious hearts: a breath prayer, a psalm or prayer known by heart, a practice of handing over what you can't control. You don't have to feel peaceful to reach for peace. If faith isn't part of your life, a quiet moment with music or nature can do the same steadying work.",
  "practices": [
   "bark|Worry Window",
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Leaves on a Stream",
   "leaves|Fall Confidence",
   "bark|Talk About Your Mood"
  ],
  "reach": [
   "Worry that fills most of your day, keeps you from sleep, or keeps you home for more than a few weeks: talk with your doctor.",
   "Chest pain or trouble breathing: call your doctor or 911, to be sure.",
   "Any thoughts of harming yourself: call or text 988. Veterans: 988, then press 1.",
   "Worry about money pressure from a caller or message: the National Elder Fraud Hotline, 1-833-372-8311, weekdays.",
   "Worry about memory: the Alzheimer's Association Helpline, 1-800-272-3900, any time.",
   "Eldercare Locator: 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways: 1-800-333-2433."
  ],
  "more": [
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ],
   [
    "American Psychological Association",
    "https://www.apa.org/topics"
   ],
   [
    "CDC STEADI: fall prevention for older adults",
    "https://www.cdc.gov/steadi/patient-resources/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "old-memories",
  "ring": "mind",
  "title": "When old memories return",
  "keys": "old memories war memories veteran ptsd flashbacks nightmares trauma past childhood memories coming back combat military service",
  "parts": [
   "bark",
   "roots",
   "branches",
   "trunk"
  ],
  "quick": [
   "Memories set aside for years often return in later life, around retirement, illness, loss, or the deaths of old friends.",
   "For many veterans, war memories come back this way, decades later. It is common, and it makes sense.",
   "You don't have to tell the whole story to get help. You set the pace.",
   "Help works at any age. Veterans Crisis Line: 988, then press 1, or text 838255."
  ],
  "feel": "Memories that come uninvited, by day or in dreams. Feeling on edge, startled by a loud noise, a smell, or something on the news. Strong feelings that seem to come out of nowhere: sadness, anger, guilt, or grief for people long gone. Some people find themselves avoiding reminders, or feeling far away from the people around them.",
  "self": {
   "first": [
    "When a memory comes on strong, press your feet into the floor, breathe out slowly, and remind yourself where you are today.",
    "Tell one person you trust that old memories have been coming back. You don't need to share details.",
    "Mention it to your doctor, who can point you to someone who understands."
   ],
   "helps": [
    "A steady routine: regular sleep, meals, daylight, and a walk.",
    "Easing up on the news or films that stir things up.",
    "Talking with others who were there, like fellow veterans, or a group for people who have been through something similar.",
    "A counselor who understands trauma. Help works at any age, and you choose what to share.",
    "For veterans, reaching out through the VA, or a chaplain or counselor who knows military life."
   ],
   "tell": [
    "“I am here, today, and I am safe right now.”",
    "“This is a memory. It is not happening now.”",
    "“I carried this a long time. I don't have to carry it alone.”"
   ],
   "people": "Try: “Some old memories have been coming back lately. I don't need to talk about the details. I just wanted you to know, and it helps to have you near.”"
  },
  "helper": {
   "feel": "They may feel embarrassed that something so old still has a hold on them, or worried they are losing their grip. Many veterans grew up in a time when no one talked about these things.",
   "say": [
    "“I'm glad you told me.”",
    "“You can tell me as much or as little as you want. I'm here either way.”",
    "“What helps when the memories come?”"
   ],
   "avoid": [
    "Asking what happened, or pushing for details.",
    "“That was so long ago. Let it go.” The feelings are here now.",
    "Taking over, or deciding for them who they should talk to."
   ],
   "help": [
    "Notice what stirs it: anniversaries, fireworks, the news, a hospital stay, a funeral.",
    "Keep days steady, with routine, rest, and time outside.",
    "Help them find support if they want it: the VA, a counselor, or other veterans.",
    "If they have memory loss and an old memory feels like now, comfort first. Reassure them they are safe, without arguing."
   ],
   "you": "What they carry can stir your own memories and worries. Talk with someone you trust, and keep your own routines. You are a steady presence, and that is enough."
  },
  "faith": "For some people, these memories bring spiritual questions: guilt, forgiveness, or where the sacred was in a hard time. If faith is part of your life, a chaplain or faith leader can listen without judging, and many traditions offer ways to set down a burden or make peace. If it isn't, a counselor or trusted friend can hold the same questions with you.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Five Senses Pause",
   "branches|Active Listening",
   "trunk|Peace With the Past",
   "trunk|Moral Repair Letter",
   "branches|Support Group"
  ],
  "reach": [
   "Veterans Crisis Line: 988, then press 1, or text 838255, any time. Chat at VeteransCrisisLine.net.",
   "Anyone: call or text 988, any time, for thoughts of not wanting to live or feeling overwhelmed.",
   "Danger right now: call 911.",
   "Memories, nightmares, or feeling on edge that get in the way of sleep, daily life, or the people you love: talk with your doctor or a counselor.",
   "Eldercare Locator: 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways: 1-800-333-2433."
  ],
  "more": [
   [
    "National Center for PTSD (VA)",
    "https://www.ptsd.va.gov"
   ],
   [
    "Veterans Crisis Line",
    "https://www.veteranscrisisline.net"
   ],
   [
    "VA Mental Health: get help",
    "https://www.mentalhealth.va.gov/get-help/index.asp"
   ],
   [
    "Minnesota Department of Veterans Affairs",
    "https://mn.gov/mdva/"
   ]
  ]
 }
];
window.SEQUOIA_GUIDES = { rings: LC_RINGS, links: L, topics: LC_TOPICS };
})();
