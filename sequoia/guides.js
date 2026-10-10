/* =====================================================================
   SEQUOIA . WHEN LIFE CHANGES
   Guides for the changes a long life brings, for the person going through it and for the helper beside them.
   Read by Sequoia (/sequoia/) and the site-wide search. Each topic has Oak's shape: id, ring, title, keys, parts, quick,
   feel, self {first, helps, tell, people}, helper {feel, say, avoid, help, you}, faith, practices ("part|Name", matching
   sequoia/practices.js), reach, more. Generated from patches/bld734/source (and later builds) in grounded-workshop:
   edit the data there and rebuild. Groups A to D: BLD 734. Groups E to H: BLD 735. Health and Ability guides
   (ring 'life', with life tags): BLD 757, patches/bld757 in grounded-workshop.
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
   "trunk|Read with a Child",
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
    "“Grief has its own shape and its own timeline.”",
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
   "trunk|Peace with the Past",
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
   "Take all the time you need to decide about another animal. You choose what fits your life now."
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
    "“Take your time. I have all the time you need.”",
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
   "trunk|Peace with the Past",
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
 },
 {
  "id": "moving-home",
  "ring": "home",
  "title": "Moving from the family home",
  "keys": "moving leaving the house selling the house family home moving out where we raised our kids leaving home relocating moving closer to family apartment condo smaller place grief for a house saying goodbye to a home homesick",
  "parts": [
   "roots",
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Grief for a home is real grief. A house holds years of your life, and it makes sense to mourn it.",
   "The more say you have in the move, the easier it tends to go. Take part in each choice you can.",
   "Plan the move in small steps, with help, and give yourself more time than you think you need.",
   "Say goodbye on purpose: walk the rooms, tell the stories, take pictures.",
   "Bring home with you. Set up your chair, your pictures, and your routines first in the new place."
  ],
  "feel": "You may feel sad, unsettled, or even guilty for leaving. The kitchen where the kids did homework, the doorframe marked with their heights, the garden you planted, the neighbors who knew you. Some people feel relief, too: fewer stairs, less upkeep, more help close by. Many feel both on the same day. If the move came sooner than you wanted, after a fall, an illness, or a loss, you may also feel angry, or as if life is happening to you. All of it is normal.",
  "self": {
   "first": [
    "Name what matters most to you in the next place: close to family, near your church or club, one floor, a garden, a bus line.",
    "Ask for one person you trust to help plan, and keep the choices in your hands.",
    "Make a simple timeline with small steps. One room, one week.",
    "Keep your doctor visits and your routines going through the move. Moves are tiring for the body too."
   ],
   "helps": [
    "A goodbye walk through the house, alone or with family, telling the stories each room holds.",
    "Photos or a short video of each room, and a few small keepsakes: a doorknob, a cutting from the garden, the height marks traced on paper.",
    "Visiting the new place before the move, more than once, and choosing where your favorite things will go.",
    "Setting up your chair, your bed, and your pictures first, so the new place feels like yours on night one.",
    "Keeping one old routine going right away: the morning coffee, the evening walk, the Sunday call.",
    "Meeting one neighbor in the first week, and finding the nearest place to belong: a church, a senior center, a library group."
   ],
   "tell": [
    "“The love in that house comes with me.”",
    "“I can grieve this place and still make a good home in the next one.”",
    "“It's okay to take this one room at a time.”"
   ],
   "people": "Try: “I want to be part of every choice about the move. Would you help me make a plan we can go through together?”"
  },
  "helper": {
   "feel": "They may be grieving the house, their independence, their neighborhood, and the life they lived there. They may also feel rushed, talked over, or afraid that this move is the first of many. Their pace may seem slow to you. For them, each room may be a goodbye.",
   "say": [
    "“What do you most want to bring with you?”",
    "“Tell me about this room.”",
    "“What would help the new place feel like home?”",
    "“Take your time today. We can do one room.”"
   ],
   "avoid": [
    "“It's just a house.”",
    "Making choices about their home or their things without them.",
    "Talking about the move with others in front of them, as if they aren't there.",
    "Rushing the last weeks to fit your schedule."
   ],
   "help": [
    "Keep them at the center of every choice, even when it takes longer.",
    "Help them visit the new place before the move, and plan where the favorite things will go.",
    "Set up their bed, chair, and pictures first on moving day.",
    "Visit often in the first weeks, and help them find one new place to belong.",
    "Watch gently for sleep, appetite, and mood in the months after. Moves can take a toll."
   ],
   "you": "You may be grieving the house too, especially if it was your childhood home. It's okay to have your own goodbye. Take turns with siblings so no one carries the whole move, and rest when you can."
  },
  "faith": "For many people, a home has been a holy place in its own way: blessings at the table, prayers at bedtime, holidays and wakes. Some find comfort in a blessing or a simple ritual for leaving one home and entering the next, alone or with a faith leader. Others find meaning in the people and memories the house held. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "bark|Name It",
   "branches|Gratitude Letter",
   "trunk|Record a Story",
   "branches|One Reach-Out a Day",
   "leaves|Steady Wake Time",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Help planning a move, rides, meals, and services in a new area anywhere in the US: Eldercare Locator, 1-800-677-1116 (call or text), or your local Area Agency on Aging.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays, for help weighing housing options.",
   "Your doctor, if sleep, appetite, or mood change in the months after the move.",
   "If someone is pressuring you to sell, move, or sign papers, in Minnesota call MAARC, 1-844-880-1574, any time. Elsewhere, call the Eldercare Locator to reach Adult Protective Services.",
   "If a move stirs thoughts of not wanting to live, call or text 988 any time. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "National Institute on Aging, health information for older adults",
    "https://www.nia.nih.gov/health"
   ],
   [
    "National Association of Senior and Specialty Move Managers",
    "https://www.nasmm.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "downsizing",
  "ring": "home",
  "title": "Downsizing and letting go of things",
  "keys": "downsizing decluttering too much stuff sorting belongings letting go of things what to keep heirlooms who gets what the kids dont want it estate sale donate giving away cleaning out the house attic basement keepsakes",
  "parts": [
   "trunk",
   "branches",
   "bark"
  ],
  "quick": [
   "Sorting a lifetime of belongings is emotional work, not only physical work. Expect it to stir memories.",
   "Go in short sessions: one drawer, one shelf, one closet. Stop while you still have energy.",
   "Sort into four: keep, pass on, give away, and let go. A small maybe box is fine too.",
   "The story matters more than the object. Tell it, write it, or record it, and the memory stays.",
   "Many people feel lighter and proud once it's done."
  ],
  "feel": "You may feel overwhelmed by the amount, or frozen at the first box. Each thing can open a memory: a child's drawing, your mother's dishes, the tools in the garage. It can hurt when the family doesn't want what you saved for them. Some people feel guilty letting go of a gift, or afraid that letting go of the thing means letting go of the person. Others feel a surprising lightness. Most feel a mix.",
  "self": {
   "first": [
    "Start with the easy places: a linen closet, the garage, extra dishes. Save photos and letters for later.",
    "Set a short time, like an hour, and a small space, like one drawer.",
    "Ask family which few things truly matter to them, and when they can pick them up.",
    "Ask for help with lifting, hauling, and the drive to the donation drop-off."
   ],
   "helps": [
    "Telling the story of a special thing before it goes, and writing it on a card that travels with it.",
    "Taking a photo of things you love but can't keep, and making a small book of them.",
    "Choosing where things go: a grandchild, a friend, a church sale, a shelter, a school.",
    "Keeping a few of the best pieces, instead of all of them: one teacup from the set, a handful of the drawings.",
    "Writing the stories of your heirlooms in Sequoia's Legacy Book.",
    "Hiring a senior move manager, if it's in reach, for planning, sorting, and the sale."
   ],
   "tell": [
    "“The memories are in me, not in the boxes.”",
    "“Passing this on is a gift, not a loss.”",
    "“One drawer is enough for today.”"
   ],
   "people": "Try: “I'm starting to sort the house. Would you come Saturday for two hours? I'll decide, and I'd love your company and your arms.”"
  },
  "helper": {
   "feel": "They may be tired, flooded with memories, and worried about wasting things or hurting feelings. A full house can feel like proof of a life well lived. When you hurry them, or show no interest in what they saved, it can feel like their life is being thrown away.",
   "say": [
    "“Tell me about this one.”",
    "“Where would you like it to go?”",
    "“Let's stop while you still have energy.”",
    "“I'd love to have that, and here's why.”"
   ],
   "avoid": [
    "“This is all junk.”",
    "Throwing things out when they aren't looking.",
    "Arguing with siblings in front of them about who gets what.",
    "Turning a sorting day into a race."
   ],
   "help": [
    "Offer short sessions with a clear end, and let them decide each thing.",
    "Do the lifting, hauling, and drop-offs.",
    "Say yes, honestly, to the few things you'd treasure, and say why.",
    "Help them photograph or record the stories that go with special things.",
    "Celebrate each finished space."
   ],
   "you": "Sorting a parent's home can stir your own childhood, old family tensions, and fears about their aging. Notice what's yours to carry. Keep sessions short for your sake too, and talk with someone you trust if it gets heavy."
  },
  "faith": "Many faith traditions teach about holding things lightly, giving generously, and treasures that last longer than possessions. Some people find meaning in giving things to a congregation's sale, a shelter, or a family that needs them. Others feel letting go as a blessing passed on. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "trunk|What I Want Remembered",
   "trunk|Record a Story",
   "trunk|Pass On a Skill",
   "branches|Ask for Help",
   "bark|Name It",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Help finding sorting help, movers, donation pickups, and services in your area anywhere in the US: Eldercare Locator, 1-800-677-1116 (call or text), or your local Area Agency on Aging.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Senior move managers help with planning, sorting, and sales: find one through the National Association of Senior and Specialty Move Managers.",
   "If someone is pressuring you to give them money or things, in Minnesota call MAARC, 1-844-880-1574, any time."
  ],
  "more": [
   [
    "Downsizing: Confronting Our Possessions in Later Life, by David Ekerdt",
    "https://news.ku.edu/news/article/2020/05/18/downsizing-book-encourages-older-people-confront-their-possessions"
   ],
   [
    "National Association of Senior and Specialty Move Managers",
    "https://www.nasmm.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "care-move",
  "ring": "home",
  "title": "Moving to assisted living or a nursing home",
  "keys": "assisted living nursing home memory care long term care facility moving into a home putting mom in a home cant live alone anymore residents rights ombudsman first weeks adjusting new room transitional care rehab stay",
  "parts": [
   "branches",
   "bark",
   "trunk",
   "roots"
  ],
  "quick": [
   "This is one of the biggest moves of a life. Grief, anger, and relief can all come with it.",
   "Be part of the decision as much as you can: visit, ask questions, and choose what comes with you.",
   "The first weeks are often the hardest. Many people settle in over the first months.",
   "Make the room yours, and keep one old routine and one old friendship going.",
   "You keep your rights in your new home. A long-term care ombudsman can help with any concern."
  ],
  "feel": "You may feel sad, scared, or angry that it came to this. Some people feel they've lost their home, their privacy, and their say all at once. Some feel relief: help at night, meals ready, people nearby. Many feel guilty for being a burden, or worry they'll be forgotten. In the first weeks it's common to feel lost, homesick, tired, or a little confused, especially at night. Those feelings usually ease as the new place becomes familiar.",
  "self": {
   "first": [
    "Ask to visit before the move, more than once, and at a mealtime if you can.",
    "Make a short list of what matters most to you: your chair, your faith, your routines, your pets, your visitors.",
    "Choose the things that will make your room yours: photos, a quilt, a lamp, your own pillow.",
    "Ask who to talk to when something isn't right, and write their name down."
   ],
   "helps": [
    "Telling the staff about you: your routines, what you like to be called, what calms you, the life you've lived.",
    "Keeping one old routine from the first day, like coffee at seven or the evening news.",
    "Saying yes to one activity or one meal with others each day, even when you'd rather not.",
    "Finding one person to sit with. Many friendships start at the dining table.",
    "Keeping ties to your old life: calls, visits, your faith community, your club.",
    "Giving it time. Many people find the first weeks hardest and feel more settled after a few months."
   ],
   "tell": [
    "“This is still my life, and I still have a say in it.”",
    "“It's okay to grieve the home I left.”",
    "“I can make this place mine, one thing at a time.”"
   ],
   "people": "Try: “The evenings here are the hardest for me. Would you call me after supper for the first few weeks?”"
  },
  "helper": {
   "feel": "They may feel moved rather than moving, and grieve their home, their privacy, and their independence. They may be angry with you, even if the move was the safest choice. Fear of being forgotten is common. So is feeling like a burden. Confusion and low mood can rise in the first weeks, and often ease with time and steady visits.",
   "say": [
    "“What would make your room feel more like you?”",
    "“Tell me how the days are going.”",
    "“I'll be here Wednesday after lunch.”",
    "“You can tell me when something isn't right. I'll listen.”"
   ],
   "avoid": [
    "“You'll love it here,” before they've had a chance to feel anything.",
    "Making the decision about them without them, when they can take part.",
    "Talking to staff over their head while they're in the room.",
    "Staying away in the first weeks so they can adjust. Steady visits help them settle."
   ],
   "help": [
    "Involve them in every choice they can make: visits, the room, what comes along.",
    "Bring the familiar: photos, a favorite blanket, their music, their own clothes.",
    "Tell the staff who they are, with them, and keep in touch with the staff yourself.",
    "Visit often and predictably at first, and help old friends visit too.",
    "If something seems wrong, speak up kindly, and call the long-term care ombudsman if it isn't resolved."
   ],
   "you": "Guilt is common, even when the move was right and loving. So is relief, and relief doesn't mean you love them less. Your role changes from doing everything to advocating and visiting, and that role matters. Let others share the visits, and get support for yourself."
  },
  "faith": "For many people, faith is a thread of continuity through a move like this: a familiar prayer, a hymn, a visit from their faith community, worship offered in the residence, or a chaplain. Ask whether the residence offers spiritual support, and let their faith leader know about the move. For others, meaning comes through family, music, nature, or the view from a window. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "fruit|Joy List",
   "branches|Standing Call",
   "branches|Shared Meal",
   "bark|Name It",
   "roots|Prayers You Know by Heart",
   "trunk|Find Your Role"
  ],
  "reach": [
   "Minnesota Office of Ombudsman for Long-Term Care, 1-800-657-3591 (weekdays, 8 to 4): help with concerns and your rights in a nursing home or assisted living. Outside Minnesota, find your state's ombudsman through the National Consumer Voice for Quality Long-Term Care.",
   "Help weighing options and finding services: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "If someone is being hurt, neglected, or taken advantage of, in Minnesota call MAARC, 1-844-880-1574, any time. Call 911 if there is danger right now.",
   "If low mood, confusion, or not eating lasts beyond the first weeks: tell the nurse and the doctor.",
   "If the move stirs thoughts of not wanting to live, call or text 988 any time. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "National Institute on Aging, how to choose a nursing home or other long-term care facility",
    "https://www.nia.nih.gov/health/assisted-living-and-nursing-homes/how-choose-nursing-home-or-other-long-term-care-facility"
   ],
   [
    "Minnesota Office of Ombudsman for Long-Term Care",
    "https://mn.gov/ooltc/contactus/"
   ],
   [
    "The Consumer Voice, about the long-term care ombudsman program",
    "https://theconsumervoice.org/about-ombudsman-program/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "fixed-income",
  "ring": "home",
  "title": "Money worries on a fixed income",
  "keys": "money worries fixed income social security not enough money cant pay bills rent prices going up running out of money savings gone debt medicine costs food costs heating bill ashamed about money benefits help paying",
  "parts": [
   "bark",
   "branches",
   "leaves"
  ],
  "quick": [
   "Money worry is common in later life, and it is nothing to be ashamed of. Many households with older adults are stretched thin.",
   "Money strain weighs on sleep, mood, and health. Your worry is real, and it deserves help.",
   "There is help most people never hear about: programs for food, heat, medicine, and Medicare costs.",
   "Start with one call: the Eldercare Locator, or Minnesota Aging Pathways in Minnesota.",
   "Before anyone asks for money or account details, pause and check with someone you trust."
  ],
  "feel": "You may lie awake doing sums, or open bills with a knot in your stomach. You may skip a meal, a medicine, or the heat to make it last, and tell no one. Many people feel ashamed, as if needing help means they failed, even after a lifetime of hard work and careful saving. Some feel afraid of becoming a burden, or of losing their home. Others feel angry at prices that keep climbing while the check stays the same.",
  "self": {
   "first": [
    "Call the Eldercare Locator or, in Minnesota, Minnesota Aging Pathways, and ask what help you might qualify for.",
    "Tell your doctor or pharmacist if medicine costs are hard. Ask whether there's a lower cost option.",
    "Keep eating, keep taking your medicines, and keep the heat on. Ask for help before you go without.",
    "Pause before any money talk on the phone or online, and check with someone you trust."
   ],
   "helps": [
    "A benefits check: a short set of questions that shows programs you may qualify for, online or with a counselor.",
    "Medicare counseling through your state's SHIP, which can help with plan costs and programs that lower them.",
    "Community meals, food shelves, and home-delivered meals. Many were built for exactly this.",
    "One trusted person who knows your situation, so you're not carrying it alone.",
    "A simple list of what comes in and what goes out each month, made with a helper if you like.",
    "For advice on your own money choices, a trusted, licensed professional, or a nonprofit counselor your Area Agency on Aging can point you to."
   ],
   "tell": [
    "“Asking for help is wise, not weak.”",
    "“My worth was never measured in dollars.”",
    "“These programs exist for people exactly like me.”"
   ],
   "people": "Try: “Money has been tight lately, and I'd like a hand looking into what help is out there. Would you sit with me while I make a call?”"
  },
  "helper": {
   "feel": "They may be embarrassed, proud, or afraid. Many older adults hide money trouble from family to protect them, or to protect their own independence. They may go without food, medicine, or heat rather than ask. Questions about money can feel like questions about whether they can still run their own life.",
   "say": [
    "“Lots of people are stretched right now. How are things for you?”",
    "“Would you like company while you call about benefits?”",
    "“You decide. I'm here to help you find out what's out there.”"
   ],
   "avoid": [
    "“How did you let it get this bad?”",
    "Taking over their accounts or their mail without being asked.",
    "Talking about their money with others in front of them, as if they aren't there.",
    "Lecturing about past choices."
   ],
   "help": [
    "Help them find programs: a benefits check online, the Eldercare Locator, or Minnesota Aging Pathways.",
    "Offer rides, a shared meal, or help with forms, side by side, while they decide.",
    "Watch gently for skipped meals or medicines, a cold house, or unopened bills.",
    "Watch for anyone pressuring them about money, including people they know."
   ],
   "you": "Worry about their money can stir your own money fears, or old family patterns. If you're helping pay, set limits you can keep, and talk about it openly. Look after your own footing too."
  },
  "faith": "For many people, money worry stirs deep questions about worth, security, and trust. Faith communities often offer practical help, like meals, a benevolence fund, or a ride, along with friendship. Some find strength in prayer or in traditions of shared provision. Sequoia welcomes all faith traditions and everything in-between, and your worth never depended on any of it.",
  "practices": [
   "bark|Kind Voice Letter",
   "bark|Worry Window",
   "branches|Ask for Help",
   "branches|Scam Pause",
   "branches|Shared Meal",
   "leaves|Easy Meals Plan"
  ],
  "reach": [
   "Eldercare Locator, 1-800-677-1116 (call or text): help finding programs for food, heat, medicine, housing, and more anywhere in the US.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays, for benefits and Medicare questions.",
   "Your state's SHIP, for unbiased Medicare counseling, including programs that help with Medicare costs.",
   "NCOA's BenefitsCheckUp, an online check for programs you may qualify for.",
   "If someone is pressuring you about money, in Minnesota call MAARC, 1-844-880-1574, any time. For fraud, the National Elder Fraud Hotline, 1-833-372-8311, weekdays.",
   "If money worry brings thoughts of not wanting to live, call or text 988 any time. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "NCOA BenefitsCheckUp",
    "https://www.ncoa.org/article/what-is-benefitscheckup-and-how-does-it-help-people-find-benefits-assistance/"
   ],
   [
    "SHIP, Medicare counseling in every state",
    "https://www.shiphelp.org/what-we-do/"
   ],
   [
    "NCOA, older adults and financial insecurity (Elder Index)",
    "https://www.ncoa.org/article/80-percent-of-older-adults-face-financial-insecurity/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "scams",
  "ring": "home",
  "title": "Scams and fraud",
  "keys": "scam scammed fraud conned tricked lost money gift cards wire transfer grandparent scam grandchild in jail romance scam irs call medicare scam tech support pop up lottery prize sweepstakes phishing identity theft ashamed i was scammed report fraud",
  "parts": [
   "branches",
   "bark"
  ],
  "quick": [
   "Scammers are skilled professionals. Being targeted, or tricked, can happen to anyone, at any age.",
   "Warning signs: hurry, secrecy, a scare or a prize, and a request for gift cards, wire transfers, cash, or crypto.",
   "Pause. Hang up. Call back on a number you already know, or check with someone you trust.",
   "If it already happened: call your bank right away, then report it. Help is ready for you.",
   "You did nothing shameful. The shame belongs to the person who lied to you."
  ],
  "feel": "If you've been scammed, you may feel embarrassed, foolish, angry, or sick with worry. Many people tell no one, afraid family will think they can't manage anymore. Some keep going back, hoping to win the money back. If the scam was a romance or a friendship, you may also be grieving a person who never really existed. All of this is a normal response to a crime, and none of it is your fault.",
  "self": {
   "first": [
    "If money is gone or going: call your bank or card company right away, using the number on your card.",
    "Stop all contact with the scammer. Don't send more money, even to get money back.",
    "Call the National Elder Fraud Hotline, 1-833-372-8311, weekdays, for help with next steps and reporting.",
    "Tell one person you trust. You don't have to sort it out alone."
   ],
   "helps": [
    "A rule you keep every time: no money talk on a call you didn't make. Hang up, and call back on a number you know.",
    "A family code word, so you can tell a real emergency call from a fake one.",
    "Never paying anyone with gift cards, wire transfers, or crypto. Real agencies and companies don't ask for those.",
    "Reporting it at reportfraud.ftc.gov, even when the money is gone. Reports help stop scammers.",
    "The AARP Fraud Watch Network Helpline, 877-908-3360, for anyone, members or not, to talk it through.",
    "Talking with others it's happened to. You'll find you're in good company."
   ],
   "tell": [
    "“I was lied to by a professional. That's on them, not me.”",
    "“Hanging up is always allowed.”",
    "“Telling someone is how I protect myself and others.”"
   ],
   "people": "Try: “Something happened with a phone call, and I'm embarrassed, but I want to tell you. Would you help me figure out what to do next?”"
  },
  "helper": {
   "feel": "They may feel ashamed, foolish, and afraid that telling you will cost them their independence or their accounts. Many older adults hide a scam for that reason. If it was a romance or a friendship scam, they may defend the scammer, or grieve them. Your calm, kind response decides whether they'll tell you next time.",
   "say": [
    "“Thank you for telling me. This happens to smart, careful people.”",
    "“These are professionals. They fool people every day.”",
    "“Let's call the bank together. You lead, and I'll help.”"
   ],
   "avoid": [
    "“How could you fall for that?”",
    "Taking away their phone, their accounts, or their say without talking it through.",
    "Telling the whole family before they're ready.",
    "Bringing it up again and again."
   ],
   "help": [
    "Help them call the bank right away, then report it together.",
    "Agree on a family code word, and a simple rule: hang up, call back on a known number.",
    "Help them set up call blocking, and offer to be the one they check with before any payment.",
    "Watch gently for new secrecy, new 'friends', gift card purchases, or unusual withdrawals.",
    "If someone they know is taking advantage of them, call MAARC in Minnesota, 1-844-880-1574."
   ],
   "you": "Anger at the scammer, and fear for them, are natural. You may also feel guilt for not catching it. Scammers are good at what they do. Talk with someone you trust, and keep your focus on keeping them safe and keeping their trust."
  },
  "faith": "Some scams use faith itself: a fake charity, a stranger asking for prayer and money, a message claiming to be from a church. A trusted faith leader can help you check. For many people, a faith community is also a place of friendship and support after a loss like this. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "branches|Scam Pause",
   "branches|Ask for Help",
   "bark|Self-Compassion Break",
   "bark|Slow Exhale",
   "branches|Standing Call"
  ],
  "reach": [
   "National Elder Fraud Hotline (US Department of Justice), 1-833-372-8311, weekdays 10 to 6 Eastern, for people 60 and older: help with next steps and reporting.",
   "AARP Fraud Watch Network Helpline, 877-908-3360, weekdays 8 to 8 Eastern, members and nonmembers.",
   "Report fraud to the Federal Trade Commission at reportfraud.ftc.gov.",
   "Your bank or card company, right away, using the number on your card or statement.",
   "If someone you know is taking advantage of you, in Minnesota call MAARC, 1-844-880-1574, any time. Elsewhere, find your state's Adult Protective Services through NAPSA. Call 911 if there is danger right now.",
   "If the loss brings thoughts of not wanting to live, call or text 988 any time. Veterans: 988, then press 1."
  ],
  "more": [
   [
    "US Department of Justice, find help or report elder abuse and fraud",
    "https://www.justice.gov/elderjustice/find-help-or-report-abuse"
   ],
   [
    "AARP Fraud Watch Network Helpline",
    "https://www.aarp.org/money/scams-fraud/helpline/"
   ],
   [
    "FTC, report fraud",
    "https://reportfraud.ftc.gov"
   ],
   [
    "FBI, the grandparent scam",
    "https://www.fbi.gov/news/stories/the-grandparent-scam"
   ],
   [
    "NAPSA, Adult Protective Services in your area",
    "https://www.napsa-now.org/help-in-your-area/"
   ]
  ]
 },
 {
  "id": "affairs",
  "ring": "home",
  "title": "Getting your affairs in order",
  "keys": "affairs in order will power of attorney health care directive advance directive living will health care agent health care proxy where are my papers important documents funeral wishes estate planning passwords accounts beneficiaries what happens when i die planning ahead",
  "parts": [
   "fruit",
   "branches",
   "trunk"
  ],
  "quick": [
   "Putting your affairs in order is a gift to yourself and to the people who love you. It's wise at any age, in good health or in illness.",
   "Name a health care agent: someone you trust to speak for you if you can't. Tell them what matters to you.",
   "Common papers include a will, a financial power of attorney, and a health care directive. An attorney or legal aid can help with the legal side.",
   "Keep your important papers in one place, and tell one trusted person where.",
   "Do it one step at a time. One conversation or one paper is a real start."
  ],
  "feel": "You may feel it's morbid, or that it means giving up. You may feel overwhelmed by the paperwork, or unsure where to start. Some people put it off for years, then feel a deep relief once it's done. It can stir feelings about dying, and about the people you'll leave behind. It can also bring peace: knowing your wishes are clear, and your family won't have to guess.",
  "self": {
   "first": [
    "Choose your health care agent, and ask them if they're willing.",
    "Gather your important papers in one folder, drawer, or box.",
    "Tell one trusted person where that folder is.",
    "Make a list of who to call: your doctor, your attorney if you have one, your bank, your faith leader."
   ],
   "helps": [
    "Using the National Institute on Aging's checklist to see what papers people commonly prepare.",
    "Talking about what matters most to you in your health care, before a crisis: what a good day looks like, what you'd want and not want.",
    "A health care directive. In Minnesota, Honoring Choices Minnesota has forms and guidance.",
    "Meeting with an attorney or legal aid for a will, a power of attorney, and anything about property.",
    "Writing down where things are: accounts, insurance, the deed, the car title, and how to reach the people who help you.",
    "Writing the personal side too, your stories, values, and blessings, in Sequoia's Legacy Book."
   ],
   "tell": [
    "“Planning ahead is an act of love.”",
    "“One paper at a time is enough.”",
    "“My wishes deserve to be known.”"
   ],
   "people": "Try: “I've been thinking about my wishes, and I'd like you to know them. Could we sit down together one afternoon?”"
  },
  "helper": {
   "feel": "They may feel that planning means admitting the end is near, or that you're after their money. They may worry about losing control of their own decisions. Some are relieved when someone finally asks. Others need time. It's their plan, their papers, and their choices.",
   "say": [
    "“When you're ready, I'd love to hear what matters most to you.”",
    "“If something happened, who would you want to speak for you?”",
    "“Is there anything you'd like me to know where to find?”"
   ],
   "avoid": [
    "Pushing them to sign papers they don't understand, or haven't chosen.",
    "Making it about who gets what.",
    "Raising it for the first time during a crisis or a holiday gathering.",
    "Talking about their plans with others, in front of them, as if they aren't there."
   ],
   "help": [
    "Offer to sit with them while they read the NIA checklist, or fill in a health care directive.",
    "Offer rides to an attorney or legal aid appointment, and let them meet privately.",
    "Help them make one folder for important papers, and write down where it is.",
    "If you're named their agent, ask them to tell you their wishes in their own words, and listen.",
    "Watch for anyone pressuring them to change a will or a power of attorney."
   ],
   "you": "These talks can stir your own fears about losing them, and your own unfinished planning. If you're named as their agent, it's an honor and a responsibility. Ask questions, and consider doing your own planning too."
  },
  "faith": "For many people, getting affairs in order touches faith: wishes for prayers, sacraments, or rituals at the end of life, a funeral in a place of worship, or a blessing passed on. If faith is part of your life, write those wishes down and tell your faith leader. For others, the meaning is in leaving things clear and kind for the people they love. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "fruit|Make Your Wishes Known",
   "trunk|What I Want Remembered",
   "trunk|Life Lessons",
   "fruit|Blessing for Those You Love",
   "branches|Ask for Help",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Legal help for older adults, and planning services in your area: Eldercare Locator, 1-800-677-1116 (call or text). An attorney or legal aid can help with wills and powers of attorney.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays, and Honoring Choices Minnesota for health care directive forms.",
   "Your doctor, to talk through your health care wishes and add your directive to your records.",
   "If someone is pressuring you to sign papers or change your will, in Minnesota call MAARC, 1-844-880-1574, any time. For fraud, the National Elder Fraud Hotline, 1-833-372-8311, weekdays."
  ],
  "more": [
   [
    "National Institute on Aging, Getting Your Affairs in Order Checklist",
    "https://www.nia.nih.gov/health/advance-care-planning/getting-your-affairs-order-checklist-documents-prepare-future"
   ],
   [
    "National Institute on Aging, advance care planning",
    "https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care"
   ],
   [
    "Honoring Choices Minnesota",
    "https://www.honoringchoices.org/"
   ],
   [
    "The Conversation Project",
    "https://theconversationproject.org"
   ],
   [
    "PREPARE for Your Care",
    "https://prepareforyourcare.org"
   ],
   [
    "Sequoia's Legacy Book",
    "/sequoia/#legacy"
   ]
  ]
 },
 {
  "id": "spouse-caregiving",
  "ring": "family",
  "title": "Caring for a spouse or partner",
  "keys": "caregiver caregiving caring for my husband caring for my wife spouse partner sick taking care of him taking care of her exhausted worn out respite break help at home dementia stroke parkinsons cancer tired resentful lonely marriage changed",
  "parts": [
   "branches",
   "leaves",
   "bark",
   "roots"
  ],
  "quick": [
   "Caring for the one you married, or the one you chose, is love at its most practical. It can also wear you down.",
   "Your marriage is still here, even when it has changed shape. So is the grief for the life you had.",
   "Strain, not caregiving itself, is what wears on health. Breaks and help make a real difference.",
   "You matter too. Keep your own doctor visits, sleep, and one thing each week that is just yours."
  ],
  "feel": "Some days you are a nurse, a driver, a bookkeeper, and a night watch, all before lunch. You may love them as much as ever and still feel tired, lonely, short tempered, or trapped, and then guilty for feeling it. You may miss the partner who used to share the load, the talks, the trips you planned. Friends may call less. Your own health may slip down the list. All of this is common, and none of it means you love them less.",
  "self": {
   "first": [
    "Write down what you do in a week. Seeing it on paper helps you, and it shows others where they could help.",
    "Ask one person for one regular, specific break, even two hours.",
    "Keep your own doctor, dental, and eye visits, and tell your doctor you are a caregiver.",
    "Call the Eldercare Locator or, in Minnesota, Minnesota Aging Pathways, and ask about respite, adult day programs, and help at home."
   ],
   "helps": [
    "Respite: a few hours or a few days when someone else takes a turn, through family, friends, a faith community, an adult day program, or a respite service.",
    "A caregiver support group, in person, by phone, or online, with people who understand without explaining.",
    "Keeping a thread of your marriage: a song you both love, an old photo album, holding hands during the news.",
    "Sleep, simple meals, and a short walk or stretch, even on the hard days.",
    "Letting your partner do what they still can, at their own pace, so you are both still partners."
   ],
   "tell": [
    "“Taking care of me is part of taking care of us.”",
    "“I can love them and still miss the life we had.”",
    "“Accepting help is not giving up. It is how we keep going.”"
   ],
   "people": "Try: “Could you stay with Jim on Thursday afternoons, from one to four? I need a few hours to rest.”"
  },
  "helper": {
   "feel": "The caregiving spouse may be running on empty while telling everyone they are fine. They may feel invisible, since everyone asks about the one who is sick. They may grieve the partner they still have, and feel guilty about it.",
   "say": [
    "“How are you doing? Not him. You.”",
    "“I'll stay with Mom Saturday from one to five. What would you like to do with that time?”",
    "“You're doing so much. What is the hardest part of the week?”"
   ],
   "avoid": [
    "“You're a saint,” with no offer of help.",
    "“Just put her in a home,” or any big choice made for them.",
    "“Let me know if you need anything.” They rarely will.",
    "Taking over, or talking about the two of them as if they aren't in the room."
   ],
   "help": [
    "Take a regular shift, the same time each week, so they can count on it.",
    "Cover the jobs that pile up: the lawn, the groceries, a meal, a ride to their own appointments.",
    "Help them look into respite, adult day programs, and help at home, and let them decide.",
    "Visit the couple, not only the patient. Treat them both as the grown-ups they are."
   ],
   "you": "Watching a parent or a friend wear thin can stir worry, guilt, or old family roles. Do what you can, steadily, and let siblings and others share the load. Rest is part of helping for you too."
  },
  "faith": "Many traditions honor care for a sick spouse as sacred work, and many also teach rest, sabbath, and letting others carry part of the load. If faith is part of your life, a faith community can offer visits, meals, rides, and prayer, and a chaplain can listen to the hard feelings without judging. If it isn't, meaning can come from the vows you kept in your own way, and from love that keeps showing up.",
  "practices": [
   "branches|Caregiver Pause",
   "branches|Ask for Help",
   "branches|Support Group",
   "branches|Loving-Kindness",
   "bark|Self-Compassion Break",
   "leaves|Sleep",
   "roots|Sabbath Hour"
  ],
  "reach": [
   "Call or text 988 any time if you feel hopeless or think about ending your life. Veterans: 988, then press 1.",
   "Call 911 if anyone is in danger right now, including if your partner becomes aggressive and you can't stay safe.",
   "Eldercare Locator, 1-800-677-1116 (call or text): respite, adult day programs, meals, and help at home. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "If your partner has memory loss: the Alzheimer's Association 24/7 Helpline, 1-800-272-3900.",
   "If you or your partner are being hurt, neglected, or taken advantage of, or you fear the caregiving has gone past what you can safely give: in Minnesota, MAARC, 1-844-880-1574, any time.",
   "Your own doctor, if sleep, mood, or your health is slipping. Caregiver strain is real and worth naming."
  ],
  "more": [
   [
    "Family Caregiver Alliance",
    "https://www.caregiver.org/caregiver-resources/all-resources/"
   ],
   [
    "ARCH National Respite Network: find respite",
    "https://archrespite.org/caregiver-resources/respitelocator/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Caregiving in the US 2025 (AARP and NAC)",
    "https://www.aarp.org/pri/topics/ltss/family-caregiving/caregiving-in-the-us-2025/"
   ]
  ]
 },
 {
  "id": "grandparenting",
  "ring": "family",
  "title": "Grandparenting",
  "keys": "grandparent grandparenting grandchildren grandkids grandma grandpa nana papa far away long distance video call miss my grandkids new grandbaby different rules disagree with my kids parenting step grandchildren teenagers grown grandchildren",
  "parts": [
   "branches",
   "trunk",
   "fruit"
  ],
  "quick": [
   "Grandparenting can be one of the great joys of later life, and it changes as the grandchildren grow.",
   "What matters most is feeling close, more than how often you see each other.",
   "Distance can be bridged with calls, letters, shared projects, and steady small rituals.",
   "The parents set the rules. Your steady love, and your respect for them, is the gift."
  ],
  "feel": "Joy at a first smile, a phone call, a drawing in the mail. Longing when they live far away, or grow busy with school and friends. You may disagree with how they are being raised, and bite your tongue, or not. You may feel left out after a divorce, a move, or a change in the family. You may wonder what role you have now, especially as they grow up. All of this is part of loving across generations.",
  "self": {
   "first": [
    "Ask the parents what kind of contact works for their family, and when.",
    "Choose one small ritual you can keep, like a weekly call, a monthly card, or a story at bedtime by video.",
    "Learn one way to stay in touch that suits you: the phone, letters, video, or a shared photo album."
   ],
   "helps": [
    "Being interested in their world: their games, their music, their worries, even when it is new to you.",
    "Sharing yours: family stories, a recipe, a card game, a skill with your hands.",
    "Shared projects across the miles: reading the same book, a long running letter, a puzzle by mail.",
    "Being a steady, calm place to land, especially when home is hard.",
    "Giving and receiving both. Let them teach you something too."
   ],
   "tell": [
    "“I don't have to be there every week to matter to them.”",
    "“I can support the parents and still love the children my own way.”",
    "“My stories are part of their roots.”"
   ],
   "people": "Try, to your grown child: “I'd love to be part of their week. What would work for your family? A Sunday call, letters, a visit each season?”"
  },
  "helper": {
   "feel": "A grandparent may long for more time, worry about being in the way, or feel hurt when plans change. They may disagree with parenting choices and not know how to say so. If they live far away, or the family has changed, they may feel left out.",
   "say": [
    "“The kids light up when you call.”",
    "“Would you tell them the story about the farm? They'd love it.”",
    "“Here is what works for us. Can we find a rhythm together?”"
   ],
   "avoid": [
    "Using the grandchildren as leverage in an adult conflict.",
    "“You don't know how it's done now,” said to shut them out.",
    "Letting plans with them drop with no word."
   ],
   "help": [
    "Set up the technology with them, and stay for the first few calls.",
    "Send photos, school art, and small updates without waiting to be asked.",
    "Make a regular time for calls or visits, and keep it.",
    "Talk through differences privately, grown-up to grown-up, and kindly."
   ],
   "you": "If you are the parent in the middle, you hold two loves at once. Your rules for your children stand. Respect for your parent can stand beside them. Say both plainly."
  },
  "faith": "For many families, grandparents pass on faith and tradition: prayers at bedtime, holiday rituals, songs, a place at worship. If that is part of your life, share it as a gift, and follow the parents' lead on what fits their home. Families of all faith traditions and everything in-between pass on values through stories, kindness, and how they live.",
  "practices": [
   "branches|Grandchildren",
   "branches|Grandparent From a Distance",
   "trunk|Record a Story",
   "trunk|Pass On a Skill",
   "trunk|Read with a Child",
   "fruit|Blessing for Those You Love",
   "roots|Teach"
  ],
  "reach": [
   "If you are worried that a grandchild is being hurt or neglected, call 911 for danger right now, or your county's child protection line.",
   "If someone in the family is pressuring you for money or frightening you: in Minnesota, MAARC, 1-844-880-1574, any time.",
   "Eldercare Locator, 1-800-677-1116 (call or text): local programs, including help with technology and rides. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Call or text 988 any time if being cut off from grandchildren leaves you hopeless, or thinking about ending your life."
  ],
  "more": [
   [
    "Generations United",
    "https://www.gu.org/explore-our-topics/grandfamilies/"
   ],
   [
    "AmeriCorps Seniors: Foster Grandparents",
    "https://americorps.gov/serve/americorps-seniors"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ]
  ]
 },
 {
  "id": "raising-grandkids",
  "ring": "family",
  "title": "Raising grandchildren",
  "keys": "raising grandchildren grandfamily grandfamilies kinship care kinship caregiver custody guardianship grandkids live with me raising my grandson raising my granddaughter parent addiction parent in prison parent died foster care relative caregiver tired second time parenting",
  "parts": [
   "branches",
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "About 2.5 million grandparents in the US are responsible for grandchildren who live with them. You are far from alone.",
   "The reasons often carry grief: a parent's addiction, illness, prison, or death. Your feelings, and the children's, make sense.",
   "Love and exhaustion can sit side by side. Support makes the strain lighter.",
   "Kinship navigator programs, your Area Agency on Aging, and grandfamily support groups can help with the practical side."
  ],
  "feel": "You may have said yes in a single phone call, and your whole life changed. You may feel love, purpose, and fierce protectiveness, and also exhaustion, worry about money, and grief for the retirement you planned. You may grieve for your own grown child, angry and heartbroken at once. Friends your age may be traveling while you are at the school pickup. The children may carry hurt that shows up as anger, clinginess, or trouble at school. All of this is real, and you are doing something remarkable.",
  "self": {
   "first": [
    "Call a kinship navigator program or your Area Agency on Aging (through the Eldercare Locator) and ask what help exists for grandparents raising grandchildren.",
    "Keep your own doctor visits, and tell your doctor you are raising grandchildren.",
    "Before any legal step about custody or guardianship, talk with a legal aid office or an attorney who knows family law.",
    "Find one other grandparent raising grandchildren, in a group or online."
   ],
   "helps": [
    "A grandfamily support group, where no one needs the backstory explained.",
    "Respite: a few hours when someone else takes the children.",
    "Simple routines for meals, homework, and bedtime. Children feel safer with a rhythm.",
    "Help for the children's hurt: a school counselor, a children's grief group, or a counselor who understands kinship families.",
    "Letting your own grief have a place, apart from the children."
   ],
   "tell": [
    "“I'm giving them a home. That matters more than doing it perfectly.”",
    "“I can love my child and grieve what happened.”",
    "“Asking for help is part of raising them well.”"
   ],
   "people": "Try: “I'm raising my grandkids now, and I'm tired. Could you take them to the park Saturday morning, so I can rest?”"
  },
  "helper": {
   "feel": "A grandparent raising grandchildren may be exhausted, worried about money and their own health, and grieving for their own grown child, all at once. They may feel judged, or ashamed of how the family got here. They may not ask for help, because they are used to being the one who helps.",
   "say": [
    "“You're giving them a home. I see how much that takes.”",
    "“I can do school pickup on Tuesdays. Would that help?”",
    "“How are you doing, apart from the kids?”"
   ],
   "avoid": [
    "“At least you're young enough to do it,” said as if it settles everything.",
    "Blaming their grown child, or them, in front of the children.",
    "Questions about the backstory they haven't offered."
   ],
   "help": [
    "Take a regular shift with the children, the same time each week.",
    "Help them find a kinship navigator, a grandfamily group, and their Area Agency on Aging, and let them choose.",
    "Bring a meal, help with forms, or drive to appointments.",
    "Treat the children's parent with respect when they come up, whatever has happened."
   ],
   "you": "If the grandchildren's parent is your sibling or your friend's child, you may carry grief and anger too. Find your own place to say it, away from the children and away from the grandparent's hardest days."
  },
  "faith": "Many traditions honor taking in a child as sacred. If faith is part of your life, a faith community can be a village: rides, meals, a Sunday school teacher who knows the story, people who pray for you. If it isn't, the same village can come from neighbors, a school, and other grandfamilies. Some grandparents also carry hard questions about why this happened. Those questions are welcome too.",
  "practices": [
   "branches|Support Group",
   "branches|Ask for Help",
   "branches|Caregiver Pause",
   "bark|Self-Compassion Break",
   "leaves|Smart Nap",
   "leaves|Easy Meals Plan",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Call 911 if a child or anyone is in danger right now.",
   "Call or text 988 any time if you, or the children, feel hopeless or think about ending a life. Veterans: 988, then press 1.",
   "Eldercare Locator, 1-800-677-1116 (call or text), to reach your Area Agency on Aging. Many support grandparents 55 and older raising grandchildren. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "A kinship navigator program in your state: Grandfamilies.org and the Grandfamilies and Kinship Support Network list them.",
   "If anyone pressures you for money, threatens you, or takes advantage of you: in Minnesota, MAARC, 1-844-880-1574, any time.",
   "A legal aid office or family law attorney, before any custody or guardianship step."
  ],
  "more": [
   [
    "Generations United: grandfamilies and kinship care",
    "https://www.gu.org/explore-our-topics/grandfamilies/"
   ],
   [
    "Grandfamilies.org: kinship navigator programs",
    "https://www.grandfamilies.org/Topic-Library/Kinship-Navigator-Programs"
   ],
   [
    "Grandfamilies and Kinship Support Network",
    "https://www.gksnetwork.org/"
   ],
   [
    "Grandfamilies fact sheet (Generations United)",
    "https://www.gu.org/app/uploads/2022/05/General-Grandfamilies-Fact-Sheet-2022.pdf"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "estrangement",
  "ring": "family",
  "title": "Estrangement from an adult child",
  "keys": "estranged estrangement adult child not speaking no contact cut off my son wont talk to me my daughter wont talk to me cut me off grandchildren kept from me family rift falling out reconcile reconciliation repair hurt silence",
  "parts": [
   "branches",
   "bark",
   "roots",
   "fruit"
  ],
  "quick": [
   "Estrangement from a grown child is a quiet grief, with no funeral and often no one who knows.",
   "It is more common than most people think: about one in four Americans is estranged from a family member.",
   "Estrangement often shifts over time. Many people who reconcile let go of needing agreement about the past, and build from now.",
   "You can leave a door open, care for yourself, and still have a full life while you wait."
  ],
  "feel": "A birthday with no call. A holiday table with an empty chair. Grandchildren you may not see. You may feel grief, shame, anger, confusion, or a longing that won't let go. You may replay the past, wondering what you did, or what they misunderstood. People may ask how your son or daughter is doing, and you may not know what to say. This grief is real, even when no one around you sees it.",
  "self": {
   "first": [
    "Name what you are grieving: the relationship, the holidays, the grandchildren, the future you pictured.",
    "Choose one or two people you can talk with honestly about it.",
    "Before reaching out, take time to think, or talk with a counselor, about what you hope for and what you can offer."
   ],
   "helps": [
    "A counselor or support group for parents living with estrangement.",
    "Listening for their side, even when it doesn't match yours. Your memories and theirs can both be honest.",
    "A short, warm, low-pressure message on a birthday or holiday, if they haven't asked for no contact, with no demands and no list of grievances.",
    "Respecting a request for space, which can itself be a step toward repair.",
    "Filling your days with people and purposes that are life-giving now, so waiting doesn't become your whole life."
   ],
   "tell": [
    "“I can grieve this and still live a full life.”",
    "“The door can stay open without me standing in it all day.”",
    "“I can take responsibility for my part without carrying all of it.”"
   ],
   "people": "Try: “My daughter and I aren't in touch right now. It's hard to talk about, but I'd rather you know. Holidays are tender.”"
  },
  "helper": {
   "feel": "They may feel shame and stay quiet about it, or tell the story over and over. They may fear being judged. You may know only one side, and that is fine. Your role is to be kind to the person in front of you, not to judge the case.",
   "say": [
    "“That sounds painful. I'm sorry.”",
    "“You don't have to explain. I'm here.”",
    "“The holidays must be hard. Would you like to join us?”"
   ],
   "avoid": [
    "“They'll come around.” No one knows that.",
    "“What did you do?” or “Your kid is ungrateful.” Both take a side.",
    "Carrying messages between them, or pressing for reconciliation.",
    "Bringing it up at every visit, or never at all."
   ],
   "help": [
    "Remember the hard days: the child's birthday, holidays, Mother's Day or Father's Day.",
    "Include them in your gatherings and traditions.",
    "Listen without choosing a side. Ask what they need from you.",
    "If they want help, help them find a counselor or support group."
   ],
   "you": "If you are part of the family, you may be caught between two people you love. You can love both and stay out of the middle. Say so kindly, and protect your own ties with each of them."
  },
  "faith": "Many traditions treasure reconciliation, and many also teach patience, humility, and that forgiveness and reunion are not the same thing. If faith is part of your life, you might bring this grief to prayer or lament, hold your child in prayer each day, or talk with a chaplain or faith leader you trust. If it isn't, you can still hold your child in your heart, wish them well, and keep your own peace.",
  "practices": [
   "fruit|Make Peace",
   "roots|Hold Someone in Light",
   "roots|Lament",
   "roots|Breath Prayer",
   "bark|Grief Time",
   "branches|Friends",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Call or text 988 any time if the grief turns into hopelessness, or thoughts of ending your life. Veterans: 988, then press 1.",
   "Call 911 if anyone is in danger right now.",
   "A counselor or therapist who works with families, for you, or for both of you if your child is ever willing.",
   "If contact with family includes threats, pressure about money, or someone taking advantage of you: in Minnesota, MAARC, 1-844-880-1574, any time.",
   "Eldercare Locator, 1-800-677-1116 (call or text): local counseling and support. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "Cornell Family Estrangement and Reconciliation Project",
    "https://www.familyreconciliation.org/resources"
   ],
   [
    "Family estrangement, a problem hiding in plain sight (Cornell)",
    "https://news.cornell.edu/stories/2020/09/pillemer-family-estrangement-problem-hiding-plain-sight"
   ],
   [
    "American Psychological Association: healing the pain of estrangement",
    "https://www.apa.org/monitor/2024/04/healing-pain-estrangement"
   ]
  ]
 },
 {
  "id": "worry-adult-children",
  "ring": "family",
  "title": "Worry about adult children",
  "keys": "worried about my son worried about my daughter adult child grown children struggling addiction drinking drugs money problems borrowing money divorce marriage trouble lost job mental illness cant sleep worrying about my kids never stop being a parent",
  "parts": [
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "You never stop being a parent. Worry about grown children is common, and it can weigh on your own well-being.",
   "Their struggles, like addiction, money trouble, or a hard marriage, are real, and so are your limits.",
   "Sort what you can carry from what is theirs to carry. Love can stay while the load goes back.",
   "If a grown child pressures you for money or frightens you, that is not something to carry alone. Help is there."
  ],
  "feel": "Lying awake at 3 a.m. replaying a phone call. Checking your phone for a text. Wondering if you should have done something differently years ago. Wanting to fix it, and knowing you can't. You may feel helpless, guilty, angry, or ashamed to tell friends whose children seem fine. If they ask for money, you may feel torn between love and your own security. Worry this deep is a sign of love, and it can still wear you out.",
  "self": {
   "first": [
    "Write down what you are worried about, then sort it: what can I do, and what is theirs to carry?",
    "Choose one person you can talk with honestly.",
    "Before giving or lending money you may need, pause and talk with someone you trust, or a financial counselor.",
    "If you can't sleep or eat well because of the worry, tell your doctor."
   ],
   "helps": [
    "Saying out loud what you will do and what you won't, kindly and calmly.",
    "Listening more than advising, when they call. Grown children often want to be heard first.",
    "A group for families of people with addiction, if that is part of the picture, like Al-Anon or Families Anonymous.",
    "A set worry time, so worry has a place to go and doesn't take the whole day.",
    "Keeping your own life full: friends, rest, faith or meaning, and things you enjoy."
   ],
   "tell": [
    "“I can love them without fixing them.”",
    "“Their choices are theirs. My peace is mine to tend.”",
    "“Taking care of myself is not turning my back on them.”"
   ],
   "people": "Try, to your grown child: “I love you, and I want to help. I can drive you to the meeting Thursday. I can't give money right now.”"
  },
  "helper": {
   "feel": "They may be losing sleep, keeping secrets to protect their child, or giving money they can't spare. They may feel ashamed, or judged as a parent. If you are another of their children, or their child's spouse, you may have your own feelings about it all.",
   "say": [
    "“You love them so much. That's a lot to carry.”",
    "“What is keeping you up at night?”",
    "“What would help you, this week?”"
   ],
   "avoid": [
    "“You need to cut them off,” or “You're enabling them.” Choices like these are theirs.",
    "Criticizing their child, or taking a side in a family quarrel.",
    "“They're an adult, stop worrying.” Worry doesn't stop on command."
   ],
   "help": [
    "Listen, and help them sort what is theirs to do and what isn't.",
    "Help them find a family support group or counselor, if they want one.",
    "Gently watch for money pressure, and remind them help is there.",
    "Plan things together that have nothing to do with the worry."
   ],
   "you": "If the struggling one is your sibling, your spouse, or your own child, you are inside this too. Find your own place to talk, and keep your love for each person apart from any one person's crisis."
  },
  "faith": "For many parents, faith is where worry goes when there is nowhere else: prayers for a child by name, a candle, a congregation that prays too. Many traditions speak of entrusting loved ones to a care larger than our own. If faith is part of your life, that can lighten the load. If it isn't, you can still hold your child in your heart, wish them well, and set the worry down for a while.",
  "practices": [
   "bark|Worry Window",
   "roots|Hold Someone in Light",
   "bark|Leaves on a Stream",
   "branches|Active Listening",
   "branches|Support Group",
   "bark|Self-Compassion Break",
   "leaves|Sleep"
  ],
  "reach": [
   "If your grown child is in crisis or talks about ending their life, call or text 988 any time. You can call for them, or with them. Call 911 if anyone is in danger right now.",
   "Call or text 988 any time if your own worry turns into hopelessness. Veterans: 988, then press 1.",
   "If a grown child, or anyone, pressures you for money, takes it without asking, or frightens you: in Minnesota, MAARC, 1-844-880-1574, any time. It is confidential, and it is not a betrayal to ask for help.",
   "Families of people with addiction: Al-Anon, Families Anonymous, and SAMHSA's National Helpline can point you to support.",
   "Eldercare Locator, 1-800-677-1116 (call or text): local counseling and help. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Your doctor, if worry keeps you from sleeping or eating."
  ],
  "more": [
   [
    "Al-Anon Family Groups",
    "https://al-anon.org/newcomers/faq/"
   ],
   [
    "SAMHSA: helping families cope",
    "https://www.samhsa.gov/mental-health/children-and-families/coping-resources"
   ],
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/helplines/national-helpline"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ]
  ]
 },
 {
  "id": "kids-deciding",
  "ring": "family",
  "title": "When your children start deciding for you",
  "keys": "kids deciding for me children taking over my son my daughter treat me like a child talking over me not listened to independence choices my say health care agent health care proxy power of attorney dignity respect bossy family making decisions",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "When grown children worry, they can slip into deciding for you. It usually comes from love, and your voice still matters.",
   "Say clearly what matters most to you, and ask for a real talk, sitting down.",
   "Name a health care agent now, while things are calm, so the person you choose speaks for you if you ever can't.",
   "Pressure to sign papers, hand over money, or move against your wishes is different from worry. In Minnesota, call MAARC, 1-844-880-1574."
  ],
  "feel": "A suggestion about the car becomes a plan. A talk with the doctor turns into your daughter answering for you. Your son fixes the bills before you ask. It may come from love, and still leave you feeling small, unheard, or treated like a child in your own home. You may feel hurt, angry, grateful, and quietly afraid you really are slipping, all at once. After a lifetime of running a household, a job, or a family, losing your say can hurt more than the problem everyone is trying to solve.",
  "self": {
   "first": [
    "Get clear on what matters most to you: your home, your routines, your friends, your faith, your garden, your money.",
    "Ask for a sit-down talk: “I want to hear your worries, and I want you to hear what matters to me.”",
    "Agree together on what help they'll give, and what stays yours to decide.",
    "Name a health care agent, sometimes called a health care proxy, and write down your wishes. Your doctor can help with the details, and a lawyer can help with the forms."
   ],
   "helps": [
    "Asking what exactly worries them. A specific worry, like a fall or a missed bill, often has a specific answer.",
    "Looking for a choice you can both live with: a ride service, a daily check-in call, help a few days a week.",
    "Bringing in a neutral voice when talks go in circles: your doctor, a social worker, a chaplain, or a family meeting with a counselor.",
    "Keeping your own people close: friends, neighbors, a faith community, so your children aren't your only voice."
   ],
   "tell": [
    "“Needing some help doesn't mean giving up my say.”",
    "“I can listen to their worry and still make my own choice.”",
    "“My life is still mine to shape.”"
   ],
   "people": "Try: “I know you worry because you love me. I'd like us to decide this together. Can we sit down Sunday and talk it through?”"
  },
  "helper": {
   "feel": "They may feel erased, embarrassed, or angry, especially when people talk about them in front of them. Some go quiet to keep the peace. Some dig in harder on small things because the big things feel taken. Underneath, many are afraid of losing who they are.",
   "say": [
    "“What matters most to you here?”",
    "“What worries you about this?”",
    "“What would you like me to do, and what would you rather handle yourself?”",
    "“Here's what I noticed. What do you make of it?”"
   ],
   "avoid": [
    "“We've decided.” Decide with them, not about them.",
    "“You can't do that anymore,” said as a verdict.",
    "Talking about them in front of them, to a doctor or a sibling, as if they weren't there.",
    "Fixing things quietly and telling them later."
   ],
   "help": [
    "Help them decide, rather than deciding for them: share the facts, lay out two or three options, and let them choose. This is sometimes called supported decision making.",
    "Start small, try a change for a few weeks, then check in together.",
    "Speak to them directly at the doctor's office, and let them answer first.",
    "Encourage them to name a health care agent of their own choosing, and to write down their wishes. It may not be you, and that's okay.",
    "If someone else is pushing them about money, papers, or where they live, report it: in Minnesota, MAARC, 1-844-880-1574; any state, Adult Protective Services."
   ],
   "you": "Worry for a parent is heavy, and siblings often disagree about what's best. Share the load, talk with someone you trust, and take real breaks. When you're not sure what to do, come back to one question: what do they want?"
  },
  "faith": "Many faith traditions teach honoring your elders, and part of honoring is listening. If faith is part of your life, a faith leader or chaplain can help a family talk about hard choices with respect on all sides. If it isn't, the same respect holds: a long life earns a real say in what comes next.",
  "practices": [
   "fruit|Make Your Wishes Known",
   "trunk|Values Sort",
   "branches|Active Listening",
   "branches|Ask for Help",
   "branches|Friends"
  ],
  "reach": [
   "Your doctor, to talk through any health worry your family has raised, with you at the center.",
   "To name a health care agent: the National Institute on Aging's page on choosing a health care proxy, and your doctor or a lawyer for the forms. In Minnesota, Honoring Choices Minnesota offers planning guides.",
   "If anyone pressures you to sign papers, give money, or move against your wishes: in Minnesota, MAARC, 1-844-880-1574, any time. In any state, Adult Protective Services (find your state's line through NAPSA).",
   "Call 911 if you are in danger right now.",
   "Eldercare Locator, 1-800-677-1116 (call or text): rides, meals, help at home, and legal help near you. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "NIA: Choosing a Health Care Proxy",
    "https://www.nia.nih.gov/health/advance-care-planning/choosing-health-care-proxy"
   ],
   [
    "NIA: Advance Care Planning",
    "https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care"
   ],
   [
    "ACL: Supported Decision Making",
    "https://acl.gov/programs/consumer-control/supported-decision-making-program"
   ],
   [
    "Honoring Choices Minnesota",
    "https://www.honoringchoices.org/"
   ],
   [
    "The Conversation Project",
    "https://theconversationproject.org/"
   ]
  ]
 },
 {
  "id": "new-love",
  "ring": "family",
  "title": "New love late in life",
  "keys": "dating again new love boyfriend girlfriend companion romance remarry remarriage falling in love after my wife died after my husband died after divorce widow dating online dating guilt kids dont approve living apart together moving in together second marriage lonely",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Love can come again at any age, after a death, a divorce, or many years alone.",
   "New love doesn't erase old love. Joy and grief can live in the same heart.",
   "Your grown children may have feelings about it. Listen, and then make your own choice.",
   "Someone you haven't met in person who asks for money or gift cards is a scam sign. Stop, and check with someone you trust."
  ],
  "feel": "A spark you didn't expect. Butterflies before a phone call, like a teenager again. Shyness about dating rules that have changed. If your spouse died, guilt can arrive right beside the joy, as if smiling at someone new were a betrayal. You may worry what your children, your friends, or your faith community will think, or about money, health, and who would care for whom. Many people feel more alive than they have in years, and a little afraid of that, too.",
  "self": {
   "first": [
    "Go at your own pace. Coffee, a walk, or a phone call is a fine start.",
    "Meet in public places at first, and tell a friend where you'll be.",
    "Never send money, gift cards, or bank details to someone you haven't met in person, however kind they seem.",
    "Tell your doctor about a new partner if it affects your health, your medicines, or your plans."
   ],
   "helps": [
    "Letting new love and old love sit side by side: keeping photos, telling stories, marking anniversaries.",
    "Talking about what you each want: companionship, living apart together, living together, or marrying again. Many couples in later life choose to stay close with two homes.",
    "Telling your grown children yourself, listening to their worries, and giving them time to adjust.",
    "Getting your own advice about money, property, and inheritance before moving in or marrying, from a lawyer or financial planner you trust."
   ],
   "tell": [
    "“Loving again doesn't take away the love I had.”",
    "“I'm allowed to be happy.”",
    "“My heart is still growing.”"
   ],
   "people": "Try: “I've met someone who makes me happy. I wanted you to hear it from me. I'd love for you to meet them when you're ready.”"
  },
  "helper": {
   "feel": "They may feel happy, nervous, and guilty all at once, especially if their spouse died. Many worry about what their children will think, and some hide a new relationship for that reason. They may also feel more like themselves than they have in years.",
   "say": [
    "“I'm glad you're happy.”",
    "“Tell me about them.”",
    "“I'd love to meet them.”",
    "“I'm still getting used to this, and I'm glad for you.”"
   ],
   "avoid": [
    "“What about Mom?” or “What about Dad?” as if loving again were a betrayal.",
    "“At your age?” Love has no cutoff.",
    "“They're just after your money,” said as an accusation, with nothing specific behind it.",
    "Going around them to quiz their new partner."
   ],
   "help": [
    "Make room in the family: invite them both to a meal or a holiday.",
    "Keep telling stories about the parent who died, if that's your loss, and let the new person hear them.",
    "Raise a real worry privately and specifically: requests for money or gift cards, being cut off from friends, or seeming afraid or controlled.",
    "If you believe they're being taken advantage of: in Minnesota, MAARC, 1-844-880-1574; any state, Adult Protective Services."
   ],
   "you": "Seeing a parent with someone new can stir fresh grief for the parent who died, or old hurts from a divorce. Talk with someone you trust about your own feelings, so they don't land on your parent. Your support counts for a lot."
  },
  "faith": "For many people, faith shapes how they think about remarriage, commitment, and living together, and a faith leader can be a good person to talk it through with. Some find that new love feels like a blessing, a grace in a later season. If faith isn't part of your life, love can still feel like a gift you didn't expect.",
  "practices": [
   "bark|Savor a Moment",
   "bark|Name It",
   "branches|Shared Meal",
   "branches|Scam Pause",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "If someone you met online or by phone asks for money, gift cards, or an investment: stop, and call the National Elder Fraud Hotline, 1-833-372-8311, weekdays. Report it to the FTC at ReportFraud.ftc.gov.",
   "If a partner hurts, scares, or controls you, or takes your money: call 911 if you are in danger right now. In Minnesota, MAARC, 1-844-880-1574, any time. In any state, Adult Protective Services.",
   "Your doctor, for health questions about a new relationship, including intimacy and medicines.",
   "Eldercare Locator, 1-800-677-1116 (call or text): community programs, clubs, and community centers near you, good places to meet people. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "FTC: What to Know About Romance Scams",
    "https://consumer.ftc.gov/articles/what-know-about-romance-scams"
   ],
   [
    "ASU: Romance and Dating in Later Life",
    "https://thesanfordschool.asu.edu/research/centers-initiatives/romance-dating-later-life"
   ],
   [
    "Utah State University Extension: Dating in Later Life",
    "https://extension.usu.edu/relationships/research/dating-in-later-life"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "gray-divorce",
  "ring": "family",
  "title": "Divorce late in life",
  "keys": "divorce gray divorce grey divorce separated separation after 50 years of marriage husband left wife left ending my marriage alone again starting over who am I money after divorce my parents are divorcing kids taking sides",
  "parts": [
   "bark",
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "Divorce after fifty has become far more common. If this is your story, you have a lot of company.",
   "Even when it was the right choice, it is a real loss. Grieve it at your own pace.",
   "Money worry is common. Get your own advice from a lawyer or financial planner before signing anything.",
   "Keep your grown children out of the middle, and keep the door open to each of them."
  ],
  "feel": "The house sounds different. A name on the mailbox changes. Friends who knew you as a couple may not know what to say, or whose side to be on. You may grieve the life you planned, even if the marriage was hard, and feel relief, anger, shame, or fear about money all in the same week. After decades as part of a pair, a big question can rise: who am I now? If you didn't choose this, it can feel like the ground gave way. If you did, you may still be surprised by how much it hurts.",
  "self": {
   "first": [
    "Keep steady days: a set wake time, regular meals, and time outside.",
    "Tell your doctor what's happening, especially if sleep, appetite, or mood change.",
    "Get your own advice from a lawyer and a financial planner you trust before signing anything.",
    "Make a simple list of your accounts, bills, insurance, and important papers."
   ],
   "helps": [
    "One call or visit a day with someone who's on your side.",
    "A divorce support group, a counselor, or a faith community, so you're not carrying it alone.",
    "Small new routines that are fully yours: a class, a walking group, a new way to spend Sunday.",
    "Waiting on big choices, like selling the house, until you're steadier, when you can."
   ],
   "tell": [
    "“This is a loss, and I'm allowed to grieve it.”",
    "“My story is still being written.”",
    "“I can be on my own and still be connected.”"
   ],
   "people": "Try: “The divorce is harder than I let on. Could we get together once a week for a while?”"
  },
  "helper": {
   "feel": "They may feel grief, relief, shame, or fear about money and the future. Some feel judged by family, friends, or their faith community. Many wonder who they are now, after decades as part of a couple. If you're their grown child, they may worry about losing you, too.",
   "say": [
    "“How are you doing, really?”",
    "“I love you, and I'm not going anywhere.”",
    "“Want to get lunch this week?”",
    "“What would help most right now?”"
   ],
   "avoid": [
    "“I saw this coming.”",
    "“What did he do?” or “What did she do?” It asks them to take sides out loud.",
    "“At your age, why bother?”",
    "Carrying messages between two parents, or taking sides you don't want to take."
   ],
   "help": [
    "Keep inviting them: Sunday dinners, holidays, grandkids' games.",
    "Help with one practical task at a time: forms, a move, setting up a new routine.",
    "Point them to the right experts for money and legal questions, and let them decide.",
    "If you're their child, keep a relationship with each parent, and say plainly that you won't be the go-between."
   ],
   "you": "A parent's divorce can stir your own grief, rewrite family memories, and raise questions about your own marriage. You don't have to choose a side. Set kind limits on what you'll hear about the other parent, and talk with someone you trust."
  },
  "faith": "For some, divorce brings hard questions about vows, faith, and belonging in a faith community. Many faith leaders today walk gently with people through divorce, and some traditions offer prayers or rituals for endings and new beginnings. If faith is part of your life, a chaplain or faith leader can listen without judgment. If it isn't, meaning can come through friends, nature, and the life you're building next.",
  "practices": [
   "fruit|Best Possible Year",
   "bark|Slow Exhale",
   "bark|Grief Time",
   "branches|Support Group",
   "trunk|Values Sort",
   "leaves|Steady Wake Time"
  ],
  "reach": [
   "Call or text 988 any time if the weight of this turns into thoughts of not wanting to live. Veterans: 988, then press 1.",
   "Call 911 if you are in danger right now. If a spouse or ex is hurting, scaring, or taking from you: in Minnesota, MAARC, 1-844-880-1574, any time; any state, Adult Protective Services.",
   "Your doctor, if low mood, poor sleep, or appetite changes last two weeks or more.",
   "A lawyer and a financial planner of your own for money and legal questions. The Eldercare Locator can point you to legal help near you: 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "A counselor or divorce support group, through your doctor, a faith community, or a community center."
  ],
  "more": [
   [
    "BGSU: Gray Divorce Research",
    "https://www.bgsu.edu/arts-and-sciences/sociology/Research/Gray-Divorce.html"
   ],
   [
    "NIA: Getting Your Affairs in Order",
    "https://www.nia.nih.gov/health/advance-care-planning/getting-your-affairs-order-checklist-documents-prepare-future"
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
  "id": "elder-abuse",
  "ring": "family",
  "title": "Abuse or being taken advantage of",
  "keys": "elder abuse abused hurting me hit pushed yelled at threatened scared of my son scared of my daughter caregiver neglect left alone not fed money taken stealing from me financial abuse exploitation power of attorney misuse pressured to sign taken advantage of afraid at home adult protective services report abuse MAARC",
  "parts": [
   "branches",
   "roots",
   "bark"
  ],
  "quick": [
   "Abuse can be physical, emotional, sexual, financial, or neglect. It is often by someone close.",
   "It is not your fault. No one deserves to be hurt, frightened, or taken from.",
   "Danger right now: call 911. In Minnesota, call MAARC any time at 1-844-880-1574. In any state, call Adult Protective Services.",
   "Tell one safe person: your doctor, a friend, a neighbor, or a faith leader."
  ],
  "feel": "Fear when a certain car pulls in. Bruises you explain away. A grown child who keeps asking for money, or a helper who says you'll be put in a home if you tell. Bills unpaid while someone else holds the checkbook. Being yelled at, ignored, or left without food or medicine. Many people feel ashamed, confused, or loyal to the very person hurting them, especially when it's family, and some worry that speaking up will leave them alone or get someone in trouble. You may wonder whether it is \"bad enough\" to count. If it frightens you or takes from you, it counts.",
  "self": {
   "first": [
    "If you are in danger right now, call 911.",
    "In Minnesota, call MAARC, 1-844-880-1574, any time. In any state, call Adult Protective Services (find your state's line through NAPSA).",
    "Tell one safe person: your doctor, a nurse, a friend, a neighbor, or a faith leader.",
    "If money is being taken or you're pressured to sign papers, call the National Elder Fraud Hotline, 1-833-372-8311, weekdays, and talk with your bank."
   ],
   "helps": [
    "Keeping a phone and important numbers where you can reach them.",
    "Keeping friends, neighbors, and your faith community close. People who see you often notice when something changes.",
    "Asking your bank about alerts and a trusted contact on your accounts.",
    "Choosing your own health care agent and power of attorney, someone you truly trust, with a lawyer's help."
   ],
   "tell": [
    "“This is not my fault.”",
    "“I deserve to be safe and respected.”",
    "“Asking for help is brave.”"
   ],
   "people": "Try: “Something is happening at home, and I need help. Can I tell you about it?”"
  },
  "helper": {
   "feel": "They may feel ashamed, afraid, or protective of the person hurting them, especially a son, a daughter, or a spouse. Some depend on that person for rides, meals, or a place to live, and fear being left alone. Some don't call it abuse, or wonder whether it's bad enough to count.",
   "say": [
    "“I believe you.”",
    "“It's not your fault.”",
    "“I'm here, whatever you decide.”",
    "In private: “Is anyone hurting you, scaring you, or taking from you?”"
   ],
   "avoid": [
    "Asking in front of the person you're worried about.",
    "“Why didn't you tell me sooner?”",
    "Confronting the person you suspect yourself. It can make things more dangerous.",
    "Promising to keep it secret if they're in danger."
   ],
   "help": [
    "Notice signs: unexplained injuries, fear or withdrawal, missing money or new names on accounts, weight loss, missed medicines, unclean living conditions, a helper who won't let you talk alone.",
    "Find a private moment and ask plainly and gently. Then listen, believe them, and let them lead where you can.",
    "Report it. You don't need proof. In Minnesota, MAARC, 1-844-880-1574, any time; a reporter's identity is kept confidential. In any state, Adult Protective Services. Danger right now: 911.",
    "Keep visiting and calling. Staying close is one of the best protections there is."
   ],
   "you": "Suspecting abuse is frightening, especially when it's someone in your own family. You don't have to sort it out alone: the people who take reports are trained to look into it. Talk with someone you trust, and call or text 988 if it all becomes too much."
  },
  "faith": "No faith tradition asks anyone to accept being hurt or taken from. Honoring family never means hiding harm. If faith is part of your life, a chaplain or faith leader can be a safe person to tell, and many are trained to help you report. Your safety honors the sacredness of your life.",
  "practices": [
   "branches|Ask for Help",
   "branches|Active Listening",
   "branches|Scam Pause",
   "branches|Friends",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Call 911 if you are in danger right now.",
   "Minnesota Adult Abuse Reporting Center (MAARC): 1-844-880-1574, any time, for an adult being hurt, neglected, or taken advantage of.",
   "In any state, Adult Protective Services: find your state's line at NAPSA's Help in Your Area page.",
   "National Elder Fraud Hotline (US Department of Justice): 1-833-372-8311, weekdays, for people 60 and older when money is taken or scammed.",
   "Call or text 988 any time if you feel hopeless or think about ending your life. Veterans: 988, then press 1.",
   "Eldercare Locator, 1-800-677-1116 (call or text): local help, including legal help. In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "NAPSA: Help in Your Area",
    "https://www.napsa-now.org/help-in-your-area/"
   ],
   [
    "Minnesota DHS: Adult Protection",
    "https://mn.gov/dhs/people-we-serve/adults/services/adult-protection/index.jsp"
   ],
   [
    "NIA: Elder Abuse",
    "https://www.nia.nih.gov/health/elder-abuse"
   ],
   [
    "National Center on Elder Abuse",
    "https://ncea.acl.gov/home"
   ],
   [
    "DOJ Elder Justice: Find Help or Report Abuse",
    "https://www.justice.gov/elderjustice/find-help-or-report-abuse"
   ]
  ]
 },
 {
  "id": "loneliness",
  "ring": "belong",
  "title": "Loneliness and living alone",
  "keys": "lonely loneliness alone living alone by myself isolated isolation no one to talk to no friends left quiet house empty house widow widower nobody calls nobody visits weekends long evenings long miss company",
  "parts": [
   "branches",
   "bark",
   "fruit",
   "roots"
  ],
  "quick": [
   "Loneliness is common in later life, and it is a signal, like hunger, that you need people. It is not a failing.",
   "Living alone and feeling lonely are different. Many people live alone well, with a good web of people around them.",
   "Lonely thoughts, like \"no one wants to hear from me,\" can keep people apart. Gently testing those thoughts is one of the most helpful steps.",
   "Small and steady works best: one call a day, one standing date a week, one group you return to."
  ],
  "feel": "A quiet house that feels too quiet. Long evenings and long weekends. Meals eaten alone, or skipped. Wishing the phone would ring, then not calling anyone yourself. You may feel forgotten, or embarrassed to say you're lonely, as if it says something about you. It doesn't. It says you are human, and that life has changed: a spouse or friends have died, family lives far away, driving or hearing has gotten harder.",
  "self": {
   "first": [
    "Make one short call or send one note today, just to say, \"I was thinking of you.\"",
    "Set one standing date: the same call, the same coffee, or the same walk, every week.",
    "Notice one lonely thought, like \"they're too busy for me,\" and ask: is that really true?"
   ],
   "helps": [
    "Going back to the same place again and again, a class, a coffee hour, a library group, so faces become familiar.",
    "Serving others: a volunteer shift, a faith community team, reading to children. It connects without pressure.",
    "Making your home a place you enjoy: music, light, a plant or a pet, a chair by the window.",
    "Some quiet time on purpose. Solitude you choose can feel full, not empty.",
    "Asking your doctor to check your hearing and vision. Both can quietly pull people back from company.",
    "Calling the Eldercare Locator to find senior centers, meal programs, rides, and visiting programs near you."
   ],
   "tell": [
    "“Needing people is part of being human.”",
    "“Reaching out first is a gift, not a bother.”",
    "“One real connection is a good start.”"
   ],
   "people": "Try: “It's been quieter around here than I'd like. Would you call me Sunday afternoons?” Or: “I'd love some company. Could we have coffee this week?”"
  },
  "helper": {
   "feel": "They may not say they're lonely. Many older adults feel embarrassed, or don't want to be a bother. Some say \"I'm fine\" and mean \"please keep calling.\"",
   "say": [
    "“I've missed you. Can I come by Thursday?”",
    "“I'd love to hear about your week.”",
    "“Would you come with me? I'd enjoy the company.”"
   ],
   "avoid": [
    "“You should get out more.” It sounds like blame.",
    "One visit, then silence for months.",
    "Signing them up for things without asking."
   ],
   "help": [
    "Make it regular: the same day, the same time, every week.",
    "Invite them into your own circles: a meal, a game, an outing.",
    "Ask for their help or their advice. Being needed is part of belonging.",
    "Help with what makes going out hard: a ride, a hearing check, setting up video calls.",
    "Notice the moments that raise the risk: losing a spouse, giving up driving, a move, a hospital stay."
   ],
   "you": "You can't be someone's only connection, and you don't need to be. Help them build more than one thread, and share the calls and visits with others. Your steady presence matters more than any single grand plan."
  },
  "faith": "For many people, a faith community is a ready circle of belonging: a coffee hour, a small group, a choir, a prayer chain, a visit from a chaplain. Many congregations offer rides or bring worship home for those who can't travel. If faith isn't part of your life, clubs, classes, and volunteer teams offer the same steady faces.",
  "practices": [
   "branches|Lonely Thoughts Check",
   "branches|One Reach-Out a Day",
   "branches|Standing Call",
   "branches|Clubs",
   "branches|Neighbors",
   "trunk|Volunteer",
   "roots|Welcome Solitude"
  ],
  "reach": [
   "Loneliness that has turned into lasting sadness, little interest in things, or poor sleep: talk with your doctor. Depression is common in later life, and help works.",
   "Senior centers, meal programs, rides, and visiting programs near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: call 988, then press 1.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "NIA: Loneliness and Social Isolation, Tips for Staying Connected",
    "https://www.nia.nih.gov/health/loneliness-and-social-isolation/loneliness-and-social-isolation-tips-staying-connected"
   ],
   [
    "National Academies: Social Isolation and Loneliness in Older Adults",
    "https://www.nationalacademies.org/read/25663"
   ],
   [
    "US Surgeon General: Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways"
   ]
  ]
 },
 {
  "id": "friendship",
  "ring": "belong",
  "title": "Friendship in later life",
  "keys": "friends friendship old friends new friends make friends making friends best friend keep in touch stay in touch friend moved far away friend is sick friend in hospital friend with dementia drifting apart close friend circle of friends company companionship visit a friend call a friend",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Friendship matters as much in later life as at any age, and research links it closely with health and happiness.",
   "Many people grow choosier with age, putting their time into fewer, closer friends. That is a strength of a long life.",
   "New friends still come late in life. They grow from seeing the same faces again and again, often while doing something together.",
   "When health, distance, or a move changes things, a friendship can change shape and still stay close."
  ],
  "feel": "You may treasure a few old friends more than ever, and notice the ones you have drifted from. A friend moves to be near family, or into assisted living across town. Another is ill, and visits feel different, or harder to start. You may want new friends and wonder how people even make them at this age, or feel shy about being the one to call first. Some friendships feel easy and warm; one or two may feel heavy. All of this is part of friendship in a long life, and much of it can be tended.",
  "self": {
   "first": [
    "Call or write to one friend today, just to say, \"You were on my mind.\" People usually appreciate it more than we expect.",
    "Ask one friend a question you have never asked, like, \"What was the best year of your life?\"",
    "Say yes to one invitation this month, or be the one who invites."
   ],
   "helps": [
    "Keeping old friends when things change: a weekly call, letters or cards, a video visit, or meeting halfway for lunch.",
    "Shorter visits when energy is low. Twenty good minutes is a real visit.",
    "Making new friends by returning to the same place, a class, a walking group, a choir, a volunteer shift, until faces become friends.",
    "Doing things side by side: cards, gardening, a puzzle, a project. Many friendships grow while hands are busy.",
    "Deepening a friendship: tell a story you have never told, ask for advice, and offer help as well as receive it.",
    "Being a good friend to someone who is ill: keep showing up, ask what they would enjoy, and talk about ordinary life, not only the illness.",
    "Letting a draining friendship rest a while. Spending your time where there is warmth is wise, not unkind."
   ],
   "tell": [
    "“A friendship can change shape and still be close.”",
    "“It is never too late for a new friend.”",
    "“Reaching out first is a gift.”"
   ],
   "people": "Try: “I miss our lunches. Since you moved, could we talk every Sunday afternoon?” Or, to someone new: “I enjoy talking with you after class. Would you like to get coffee next week?”"
  },
  "helper": {
   "feel": "They may miss friends who have moved, become ill, or drifted, and feel shy about starting again. Some feel embarrassed to need help getting to a friend's house. Their friendships belong to them, and they want them to stay that way.",
   "say": [
    "“Tell me about your friend Marge. How did you two meet?”",
    "“Who would you love to see more often? How can I help?”",
    "“Would a ride to Helen's on Thursday make it easier?”"
   ],
   "avoid": [
    "Setting up friendships or activities for them without asking.",
    "Treating friends as less important than family.",
    "Sitting in on every visit, or talking for them when a friend calls."
   ],
   "help": [
    "Clear the path: rides, a phone with big buttons, a video call set up and left in their hands.",
    "Make room for friends: invite their friends to the birthday, the holiday, the hospital room.",
    "Help them stay close after a move: addresses, phone numbers, stamped cards, a visit together.",
    "Ask about their friends by name, and remember the news.",
    "When their friend is ill, offer to drive them for a visit, and let them decide how long to stay."
   ],
   "you": "You can't be their friend circle, and you don't need to be. Supporting their friendships takes some weight off you. Keep your own friends close too: they steady you for the long road."
  },
  "faith": "For many people, a faith community is where friendships grow: a small group, a choir, a coffee hour, a visiting team. Many traditions honor visiting the sick and the homebound as a sacred act, and a friend's visit can be one of the most faithful things in a week. If faith isn't part of your life, any group that meets often and shares a purpose can hold the same kind of friendship.",
  "practices": [
   "branches|Friends",
   "branches|Standing Call",
   "branches|Clubs",
   "branches|Active Listening",
   "branches|Shared Meal",
   "branches|Gratitude Letter",
   "roots|Hold Someone in Light",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Groups, classes, senior centers, volunteer programs, and rides near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays.",
   "Pulling back from friends and things you used to enjoy, with low mood that lasts two weeks or more: talk with your doctor. Depression is common in later life, and help works.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: call 988, then press 1.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "NIH: Social Wellness Toolkit",
    "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
   ],
   [
    "NIA: Loneliness and Social Isolation, Tips for Staying Connected",
    "https://www.nia.nih.gov/health/loneliness-and-social-isolation/loneliness-and-social-isolation-tips-staying-connected"
   ],
   [
    "US Surgeon General: Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways"
   ]
  ]
 },
 {
  "id": "veterans",
  "ring": "belong",
  "title": "Growing older as a veteran",
  "keys": "veteran veterans military service army navy air force marines coast guard national guard vietnam korea gulf war cold war va benefits agent orange service memories war memories buddies reunion legion vfw cvso pride proud of my service",
  "parts": [
   "trunk",
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Military service shapes a whole life. In later life, many veterans feel it more, not less: pride, gratitude, grief, and sometimes old pain.",
   "Service memories often return in later life, around retirement, illness, or the deaths of the people you served with. It is common, and it makes sense.",
   "Other veterans understand without needing to be told. Veteran groups and peer support are worth seeking out at any age.",
   "VA health care and benefits have grown in recent years. A County Veterans Service Officer can help you check what you may qualify for. Veterans Crisis Line: 988, then press 1."
  ],
  "feel": "Pride in what you did and who you served with. Missing the closeness of your unit, and the clear sense of purpose. Grief as the people you served with pass away. Old memories, good and hard, coming back with more quiet time. Some veterans feel unseen, as if their service is forgotten. Some carry injuries, illnesses linked to their service, or things they have never told anyone. Many feel all of these at once.",
  "self": {
   "first": [
    "Reach out to one person you served with, or one veteran near you.",
    "Contact your County Veterans Service Officer to check your VA health care and benefits.",
    "Tell your doctor that you served, where, and when. It can matter for your health."
   ],
   "helps": [
    "Joining a veterans group: an American Legion or VFW post, a coffee group, a reunion, or a VA or Vet Center group.",
    "Telling your story, in your own words and at your own pace, for your family or for the Veterans History Project at the Library of Congress.",
    "Serving again: mentoring a younger veteran, honor guard, or helping other veterans find their benefits.",
    "Keeping steady days: routine, sleep, daylight, and time with people.",
    "A counselor who knows military life, if memories or feelings get heavy. Help works at any age, and you set the pace."
   ],
   "tell": [
    "“My service mattered, and so does who I am now.”",
    "“I can hold the pride and the pain together.”",
    "“Asking for help is something I already know how to do.”"
   ],
   "people": "Try: “I've been thinking about my service more lately. Some of it I'm proud of, some of it is hard. I'd like you to know that.” Or, to an old friend: “It's been too long. Let's talk this week.”"
  },
  "helper": {
   "feel": "They may be proud and private at once. Many veterans grew up in a time when no one talked about service, and some still find it easier to talk with another veteran than with family.",
   "say": [
    "“What was it like to serve?” Then let them choose what to share.",
    "“Who were the people you served with?”",
    "“Thank you for your service. I'd love to hear more someday, if you'd like.”"
   ],
   "avoid": [
    "Asking whether they killed anyone, or pushing for hard details.",
    "Assuming every veteran is troubled, or that none are.",
    "Deciding for them which help they need."
   ],
   "help": [
    "Help them connect with a County Veterans Service Officer, and go along if they'd like.",
    "Offer rides to veteran groups, reunions, or the VA.",
    "Mark the dates that matter to them: Veterans Day, Memorial Day, unit anniversaries.",
    "Help them record or write their story, if they want to.",
    "Keep the Veterans Crisis Line close: 988, then press 1."
   ],
   "you": "What they carry can stir your own feelings. Veteran families can reach out for support too, through the VA, Vet Centers, and veteran family groups. Your steady interest and respect matter more than having the right words."
  },
  "faith": "Many traditions honor those who served and offer ways to set down what a warrior carried: prayers, blessings, rituals of remembrance, and chaplains who know military life. If faith is part of your life, a chaplain or faith leader can listen to the hardest parts without judging. If it isn't, fellow veterans, a counselor, or a Veterans Day gathering can hold the same honor and remembering.",
  "practices": [
   "trunk|Life Lessons",
   "trunk|Record a Story",
   "branches|Support Group",
   "trunk|Mentor Someone",
   "trunk|Peace with the Past",
   "roots|Ritual"
  ],
  "reach": [
   "Veterans Crisis Line: call 988, then press 1, or text 838255, any time. Chat at VeteransCrisisLine.net. You don't need to be enrolled in VA care to call. Families can call too.",
   "Anyone: call or text 988, any time, for thoughts of not wanting to live or feeling overwhelmed.",
   "Danger right now: call 911.",
   "VA health care and benefits: your County Veterans Service Officer, or the Minnesota Department of Veterans Affairs.",
   "Memories, sleep, or mood that get in the way of daily life: talk with your doctor, the VA, or a Vet Center.",
   "Eldercare Locator: 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways: 1-800-333-2433."
  ],
  "more": [
   [
    "Veterans Crisis Line",
    "https://www.veteranscrisisline.net"
   ],
   [
    "Minnesota Department of Veterans Affairs",
    "https://mn.gov/mdva/"
   ],
   [
    "Find your Minnesota County Veterans Service Officer (MACVSO)",
    "https://www.macvso.org/find-a-cvso.html"
   ],
   [
    "VA Vet Centers",
    "https://www.vetcenter.va.gov/About_US.asp"
   ],
   [
    "National Center for PTSD (VA)",
    "https://www.ptsd.va.gov"
   ],
   [
    "Veterans History Project, Library of Congress",
    "https://www.loc.gov/programs/veterans-history-project/how-to-participate/"
   ]
  ]
 },
 {
  "id": "invisible",
  "ring": "belong",
  "title": "Feeling invisible or written off because of age",
  "keys": "invisible ignored overlooked written off talked over talked down to talked about ageism age discrimination too old patronized treated like a child elderspeak honey sweetie doctor talks to my kids not me no one listens not taken seriously old age jokes left out",
  "parts": [
   "trunk",
   "bark",
   "branches",
   "fruit"
  ],
  "quick": [
   "Being talked over, talked down to, or overlooked because of age is common. It is called ageism, and it is not your fault.",
   "Most older adults meet it in everyday life: a doctor speaking to a grown child instead of you, a clerk calling you \"sweetie,\" jokes about getting old.",
   "How you see your own aging matters. Research links kinder views of aging with better health and a longer life, and those views can change.",
   "You can speak up, simply and calmly, and you can choose people and places that see you."
  ],
  "feel": "Stung when someone talks to the person beside you instead of you. Tired of being called \"young lady\" or \"sweetie.\" Left out of decisions about your own life. Unsure whether to speak up or let it go. Over time you may start to believe it, and wonder if you still have much to offer. You do. Feeling unseen is painful, and the pain makes sense.",
  "self": {
   "first": [
    "Notice when it happens, and name it to yourself: that was ageism, not the truth about me.",
    "Practice one calm line to use when you're overlooked, like: \"Please speak to me directly.\"",
    "Spend time this week with someone who values what you think."
   ],
   "helps": [
    "Bringing a written list of questions to appointments, and asking the doctor to talk with you first.",
    "Telling a trusted family member ahead of time: \"At the appointment, please let me speak for myself.\"",
    "Catching your own old-age put-downs, like \"I'm just too old for that,\" and trying a kinder, truer sentence.",
    "Staying in roles where you are needed: mentoring, volunteering, teaching a skill, sharing your story.",
    "Spending time with people of all ages, where your experience is welcome."
   ],
   "tell": [
    "“My age is not a reason to overlook me.”",
    "“I still have a lot to offer, and I am still growing.”",
    "“I can speak up kindly and clearly.”"
   ],
   "people": "Try: “I'd like to be part of this decision. Please ask me first.” Or, at the doctor: “I'd like you to explain this to me, and my daughter can listen too.”"
  },
  "helper": {
   "feel": "They may notice every time someone looks past them, even if they don't say so. Being overlooked can wear away confidence over time.",
   "say": [
    "“What do you think?” And then wait for the answer.",
    "“Let's ask her. She can tell you herself.”",
    "“I'd love your advice on something.”"
   ],
   "avoid": [
    "Answering questions meant for them, or speaking for them.",
    "\"Sweetie,\" \"young lady,\" or a sing-song voice.",
    "Making decisions about their life without them in the room."
   ],
   "help": [
    "At appointments, sit beside them, not in front, and turn questions back to them.",
    "Ask for their advice, and use it.",
    "Notice and gently correct ageist jokes and remarks, including your own.",
    "If hearing or vision makes it harder to join in, help them get a check, so they can take part fully."
   ],
   "you": "Most of us carry age stereotypes we never chose. Noticing them in yourself is part of the work, and it helps you, too, for your own later years. Your respect is a model for everyone around them."
  },
  "faith": "Many faith traditions honor elders as carriers of wisdom and blessing, and many communities lean on older members as teachers, prayer partners, and keepers of memory. If faith is part of your life, that can be a place where you are seen and needed. If it isn't, any community that values experience can offer the same.",
  "practices": [
   "trunk|Name Your Gifts",
   "trunk|Mentor Someone",
   "trunk|Pass On a Skill",
   "bark|Kind Voice Letter",
   "trunk|Find Your Role",
   "branches|Clubs"
  ],
  "reach": [
   "Feeling worthless, or that life isn't worth living: call or text 988, any time. Veterans: call 988, then press 1. Danger right now: call 911.",
   "Low mood that lasts, or losing interest in things: talk with your doctor. Depression is common in later life, and help works.",
   "In Minnesota, if someone is hurting, neglecting, or taking advantage of you: MAARC, 1-844-880-1574, any time.",
   "Roles, groups, and services near you: Eldercare Locator, 1-800-677-1116 (call or text). In Minnesota, Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "WHO: Ageism Is a Global Challenge (Global Report on Ageism)",
    "https://www.who.int/news/item/18-03-2021-ageism-is-a-global-challenge-un"
   ],
   [
    "University of Michigan National Poll on Healthy Aging: Everyday Ageism and Health",
    "https://ihpi.umich.edu/national-poll-healthy-aging/national-findings/everyday-ageism-and-health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Minnesota Aging Pathways",
    "https://mn.gov/aging-pathways"
   ]
  ]
 },
 {
  "id": "faith-questions",
  "ring": "meaning",
  "title": "Faith questions late in life",
  "keys": "faith questions doubt doubts late in life god feels far away where is god why did this happen afraid of what comes after heaven afterlife lost my faith left the church never religious spiritual struggle angry at god prayer feels empty faith deeper now religion old age meaning of my life guilt judgment forgiveness worship can't get to church",
  "parts": [
   "roots",
   "trunk",
   "fruit"
  ],
  "quick": [
   "Big questions often come close in later life. That is a natural part of a long life, not a sign that something is wrong.",
   "Doubt and spiritual struggle are common, and they can sit beside faith for years.",
   "What matters most is whether faith is a help to you right now, a weight, or both.",
   "Every path belongs here: faith that has deepened, faith full of questions, faith set down, and a life without a faith."
  ],
  "feel": "The questions may arrive with a diagnosis, the death of a spouse, or simply the quiet of more time. What has my life meant? Where was the sacred in the hard years? What happens when I die? Some people find their faith growing deeper and simpler. Some feel the sacred has gone quiet, or feel guilt, fear of judgment, or anger they never expected. Some set faith down long ago and now wonder about it again, or feel pressure from family to come back. Some never had a faith and want meaning in their own words. All of it is common, and all of it is welcome.",
  "self": {
   "first": [
    "Notice, without judging, whether faith is a help to you right now, a weight, or both.",
    "Write down one question you carry. You do not need to answer it today.",
    "Keep the practices that still feel true, and rest from the ones that don't, for now.",
    "Tell one person you trust what you are wondering about."
   ],
   "helps": [
    "A listener who can sit with questions without rushing to answers: a chaplain, a spiritual director, a faith leader, or a wise friend.",
    "Honest words to the sacred, including lament. Telling the truth about what hurts is a form of prayer in many traditions.",
    "Prayers, songs, or readings you learned long ago, if they still bring comfort.",
    "Ways to join a faith community that fit your body now: by phone, radio, TV, online, or a visit at home.",
    "Meaning in other places too: nature, music, service, the people you love, and a long look back at your life."
   ],
   "tell": [
    "“My questions are welcome.”",
    "“I don't have to settle everything today.”",
    "“Doubt and faith can live in the same heart.”"
   ],
   "people": "Try: “I've been thinking a lot about faith lately. I don't need answers. Would you just listen?”"
  },
  "helper": {
   "feel": "They may feel embarrassed by doubt after a lifetime of faith, or afraid you will judge them. They may feel far from the sacred and blame themselves. If they set faith down long ago, they may feel pressure from family to return. If their faith has deepened, they may want to talk about it more than you expect.",
   "say": [
    "“What has helped you through hard times before?”",
    "“What are you wondering about these days?”",
    "“Would you like me to call someone from your faith community, or a chaplain?”"
   ],
   "avoid": [
    "“You just need more faith,” or “Just pray more.”",
    "“Everything happens for a reason.”",
    "Pressing your own beliefs, or arguing them out of theirs, especially near illness or the end of life.",
    "Assuming what their faith is, or that they have one."
   ],
   "help": [
    "Follow their lead, and use their words for the sacred.",
    "Help them reach worship or a community in ways that fit their body: rides, phone, radio, online, home visits.",
    "Bring what comforts them: music, readings, a candle, a familiar object.",
    "If guilt, fear, or a sense of being punished weighs on them, offer to find a chaplain or counselor."
   ],
   "you": "Their questions may stir your own. You don't have to share their beliefs or have answers to be a good companion. Listening is the gift."
  },
  "faith": "This guide's topic is faith, so it sits at the center here, offered as one door among many. Every tradition has people who wrestled with doubt and still belonged, and many keep words for lament, for waiting, and for peace near the end. A chaplain or spiritual director can walk with you whatever you believe or don't. If faith has never been part of your life, the same questions of meaning, love, and peace are yours too, and they can be explored in your own words.",
  "practices": [
   "roots|Bring Your Questions",
   "roots|Lament",
   "roots|Spiritual Direction",
   "roots|Prayers You Know by Heart",
   "roots|Welcome Solitude",
   "roots|Awe Walk"
  ],
  "reach": [
   "A chaplain, spiritual director, or faith leader, when questions, guilt, or fear weigh heavily. Hospitals, hospices, and many care homes have chaplains for people of any faith or none.",
   "Your doctor, if low mood, poor sleep, or losing interest in almost everything lasts two weeks or more.",
   "Call or text 988 any time if you think about ending your life. Veterans: 988, then press 1. Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for rides and local help, including getting to worship. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "Spiritual Directors International: find a spiritual companion",
    "https://www.sdicompanions.org/find-a-spiritual-director-companion/"
   ],
   [
    "Krause and Ellison, religious doubt in older adults (research)",
    "https://doi.org/10.1111/j.1468-5906.2009.01448.x"
   ],
   [
    "Exline and colleagues, religious and spiritual struggles (research)",
    "https://doi.org/10.1037/a0036465"
   ],
   [
    "National Institute on Aging",
    "https://www.nia.nih.gov/health"
   ]
  ]
 },
 {
  "id": "facing-death",
  "ring": "meaning",
  "title": "Facing death and sharing your wishes",
  "keys": "dying my own death thinking about death afraid to die fear of dying end of life wishes advance directive health care directive living will health care agent health care proxy power of attorney for health care who will speak for me talk with my family about dying hospice palliative care what i want at the end conversation project honoring choices peace about dying",
  "parts": [
   "fruit",
   "branches",
   "roots",
   "trunk"
  ],
  "quick": [
   "Thinking about your own death is a natural part of a long life. It is not giving up.",
   "Fear and peace can share the same day. Both are normal.",
   "Choose someone to speak for you if you can't, and tell them what matters most to you.",
   "Put your wishes in writing, share copies, and look at them again when life changes."
  ],
  "feel": "Many older adults think about death more often now: after friends die, after a diagnosis, or on a quiet evening. You may feel fear of pain, of being a burden, or of the unknown. You may worry about the people you will leave. You may also feel calm, even relief, or a clearer sense of what matters. Family may change the subject when you bring it up, and that can feel lonely.",
  "self": {
   "first": [
    "Think about what matters most to you if you become very ill: comfort, time, being at home, being able to talk with family, or something else.",
    "Choose a health care agent: someone who knows you well, can stay calm, and will follow your wishes even if they differ from their own.",
    "Tell that person, and your doctor, what you would want.",
    "Ask your doctor, nurse, or clinic about an advance directive for your state, and give copies to your agent and your doctor."
   ],
   "helps": [
    "Starting small: one conversation, one question, one page.",
    "Step-by-step guides made for this, like The Conversation Project, PREPARE for Your Care, and Honoring Choices Minnesota.",
    "Asking your doctor about palliative care, which focuses on comfort at any stage of a serious illness, and about hospice when the time comes.",
    "Talking with a chaplain, counselor, or faith leader about fear, peace, and what comes after.",
    "Saying what matters while you can: thank you, I love you, I forgive you, please forgive me."
   ],
   "tell": [
    "“Thinking about my death is part of living well.”",
    "“My wishes matter, and I can say them.”",
    "“I can feel afraid and still find peace.”"
   ],
   "people": "Try: “I'd like to tell you what matters to me, in case you ever need to speak for me. Is now a good time, or could we set a time?”"
  },
  "helper": {
   "feel": "They may want to talk about dying and sense others changing the subject. They may worry about being a burden, about pain, or about the family after they are gone. Some feel calm and ready to plan, and wait for someone to ask.",
   "say": [
    "“What matters most to you, if you get sicker?”",
    "“Who would you want to speak for you?”",
    "“What worries you most? What gives you peace?”"
   ],
   "avoid": [
    "“Don't talk like that,” or “You'll outlive us all.”",
    "Deciding for them, or steering them toward the choice you would make.",
    "Talking about their wishes with others while they sit there, as if they were not in the room."
   ],
   "help": [
    "Listen first, and let them set the pace.",
    "Offer to sit in on a talk with their doctor, if they want you there.",
    "Help them find the forms for their state, and keep copies where they can be found.",
    "If you are asked to be their health care agent, ask questions until you truly understand what they would want."
   ],
   "you": "Talking about a parent's or partner's death can bring up grief before the loss. That is normal. Talk with someone you trust, and remember that honoring their wishes is a deep form of love."
  },
  "faith": "Every tradition has something to say about death: prayers, rituals, blessing, confession, and the gift of being accompanied. If faith is part of your life, a faith leader or chaplain can help you include it in your wishes, from last rites to music to who you want nearby. If it isn't, peace can come through the people you love, nature, and knowing your life has mattered. Chaplains walk with people of every faith and none.",
  "practices": [
   "fruit|Make Your Wishes Known",
   "branches|The Four Things",
   "trunk|What I Want Remembered",
   "fruit|Worth Living",
   "branches|Ask for Help"
  ],
  "reach": [
   "Your doctor or nurse: for questions about your health, your treatment choices, palliative care, and hospice.",
   "A lawyer, for legal questions about documents. Your clinic can help with the health care directive itself.",
   "A chaplain, counselor, or faith leader, for fear, grief, and peace.",
   "Call or text 988 any time if you think about ending your life. Veterans: 988, then press 1. Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for local help. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "Honoring Choices Minnesota: health care directive forms and guides",
    "https://www.honoringchoices.org/"
   ],
   [
    "The Conversation Project: starter guides for the talk",
    "https://theconversationproject.org/"
   ],
   [
    "PREPARE for Your Care",
    "https://prepareforyourcare.org"
   ],
   [
    "National Institute on Aging: advance care planning",
    "https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care"
   ],
   [
    "National Institute on Aging: choosing a health care proxy",
    "https://www.nia.nih.gov/health/advance-care-planning/choosing-health-care-proxy"
   ],
   [
    "CaringInfo: advance directives by state",
    "https://www.caringinfo.org"
   ]
  ]
 },
 {
  "id": "regrets",
  "ring": "meaning",
  "title": "Making peace with regrets",
  "keys": "regret regrets i wish i had should have shouldn't have mistakes my past guilt looking back life review make amends apologize apology say sorry forgive myself self-forgiveness can't undo it too late missed chances bad parent what i did lying awake at night old mistakes estranged ashamed",
  "parts": [
   "trunk",
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "Looking back is a natural part of later life. It can bring peace, and it can stir regret too.",
   "Sort each regret gently: what can still be mended, what can be mended in part, and what can only be set down.",
   "Make amends where it is safe and wise. Where it is not, a letter you keep or a kindness to someone else can carry them.",
   "Letting go of what cannot be undone, and turning toward what is still in reach, helps peace grow."
  ],
  "feel": "Old moments come back in the quiet hours: words said or never said, a choice that hurt someone, a child you wish you had parented differently, a chance you didn't take, time lost to work, drinking, or anger. Some regrets feel hot and sharp. Others feel like a long ache for a road not taken. You may feel guilt, shame, sadness, or a sense that it is too late. Many people feel this. Many people carry something as they look back on a long life.",
  "self": {
   "first": [
    "Write the regret down in a sentence or two. Naming it plainly often makes it smaller.",
    "Ask: can this still be mended, mended in part, or only set down?",
    "Tell one person you trust, or a chaplain or counselor, what you are carrying.",
    "Look at the whole chapter, not only the worst moment: what you knew then, what you were facing, and who helped or didn't."
   ],
   "helps": [
    "Making amends where it is safe and wise: a call, a letter, an apology without excuses, or repaying what you can.",
    "Where contact would hurt the other person or you, a letter you never send, a gift to a cause they cared about, or a kindness to someone in a similar place.",
    "Looking back over your whole life with a good listener, so the hard chapters sit beside the good ones.",
    "Turning toward what is still in reach: being the grandparent, friend, or neighbor you want to be now.",
    "A chaplain, counselor, or faith practice of confession or repair, for the things that weigh on your conscience."
   ],
   "tell": [
    "“I did the best I could with what I knew then, and I know more now.”",
    "“I can own what I did and still be worth kindness.”",
    "“What I cannot fix, I can set down.”"
   ],
   "people": "Try: “Something from years ago has been on my mind. Would you listen while I talk it through? I'm not asking you to fix it.”"
  },
  "helper": {
   "feel": "They may bring up the same regret again and again, or speak of it only once, quietly. They may feel shame, fear that it is too late, or worry that you will think less of them. If the regret involves you, they may be working up to an apology.",
   "say": [
    "“That still weighs on you. Tell me about it.”",
    "“What do you wish you could do about it now?”",
    "“I see how much you've grown since then.”"
   ],
   "avoid": [
    "“Oh, that was nothing,” before they've finished. Quick reassurance can leave them alone with it.",
    "“You should have known better,” or piling on.",
    "Pushing them to contact someone before it is safe and wise, or arranging it for them.",
    "Changing the subject every time it comes up."
   ],
   "help": [
    "Listen to the whole story before you respond.",
    "If they want to make amends, help with the practical part: finding an address, writing a letter, a ride, and check together that contact is safe for everyone.",
    "Remind them of the good they have done, specifically and truthfully.",
    "If guilt grows into hopelessness, help them reach a chaplain, counselor, or their doctor, and know when to call 988."
   ],
   "you": "Their regrets may stir your own, or touch old hurts between you. If they apologize to you, you can take time before you answer. Get support for yourself, too."
  },
  "faith": "Many traditions offer a path through regret: confession, repentance, making amends, a day of atonement, rituals of release, and the promise of mercy. If faith is part of your life, a faith leader or chaplain can walk with you through it. If it isn't, the same steps of honesty, repair, and kindness toward yourself are open to you, and a counselor can help.",
  "practices": [
   "trunk|Peace with the Past",
   "trunk|Life Review",
   "trunk|Moral Repair Letter",
   "bark|Self-Compassion Break",
   "fruit|Make Peace",
   "branches|The Four Things"
  ],
  "reach": [
   "A chaplain, counselor, or spiritual director, when a regret weighs on your conscience or keeps you up at night.",
   "Your doctor, if low mood, guilt, or poor sleep lasts two weeks or more. Depression is very treatable in later life.",
   "Call or text 988 any time if regret turns to hopelessness or thoughts of ending your life. Veterans, including those carrying memories from service: 988, then press 1. Danger right now: call 911.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for local counseling and support. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "Sequoia Legacy Book: look back at your life, chapter by chapter",
    "/sequoia/#legacy"
   ],
   [
    "Wrosch and colleagues, regret and quality of life (research)",
    "https://pubmed.ncbi.nlm.nih.gov/16420140/"
   ],
   [
    "Shay Moral Injury Center (Volunteers of America)",
    "https://www.voa.org/moral-injury-center"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "legacy",
  "ring": "meaning",
  "title": "Leaving a legacy",
  "keys": "legacy what will i leave behind be remembered how will they remember me my story life story write my memories record my stories ethical will legacy letter letter to my grandchildren pass on values blessing family history memoir what matters most no children who will remember me meaning of my life wisdom to pass on",
  "parts": [
   "trunk",
   "fruit",
   "branches"
  ],
  "quick": [
   "A legacy is more than money or things. It is your values, your stories, your lessons, and your love.",
   "You are already leaving one, every day, in small ways: how you greet people, a recipe, a saying, a kindness.",
   "A legacy letter, sometimes called an ethical will, passes on values and blessings rather than things.",
   "Start small. One story, one lesson, or one blessing is enough for today."
  ],
  "feel": "Later life can bring the question: what will I leave behind? Some people feel a quiet urge to tell their stories before they are lost. Some worry their life was too ordinary to matter, or that no one will want to hear it. Some have no children and wonder who will remember them. Others feel ready to put into words what they have learned, and simply need a place to start.",
  "self": {
   "first": [
    "Name three values you hope live on after you, in a word each.",
    "Choose one story only you can tell, and tell it to someone, or record it on your phone.",
    "Write one short blessing for someone you love, and give it to them now, or keep it for later.",
    "Try Sequoia's Legacy Book, one prompt at a time. Every prompt can be skipped."
   ],
   "helps": [
    "A legacy letter to one person or to the family: values, lessons, thanks, hopes, and if you want, words of forgiveness asked or given.",
    "Telling stories to a grandchild, a niece or nephew, or a friend who writes or records them.",
    "Passing on a skill, a recipe, a garden, a tool, with the story behind it.",
    "Noticing the small daily legacies you already give: the way you listen, encourage, or make people laugh.",
    "A legacy beyond family: students, neighbors, a congregation or club, a cause you have served."
   ],
   "tell": [
    "“An ordinary life, well loved, is worth passing on.”",
    "“My stories matter because they are mine.”",
    "“I am leaving a legacy today, in small ways.”"
   ],
   "people": "Try: “I'd like to tell you some stories from my life, while I remember them well. Would you help me write them down?”"
  },
  "helper": {
   "feel": "They may want to share their stories and wonder whether anyone is interested. They may feel shy, or worry their life was too ordinary. If memory is changing, they may feel urgency, or frustration at forgotten details. Some memories may stir grief or old hurts.",
   "say": [
    "“What do you hope we remember about you?”",
    "“Who shaped you most when you were young?”",
    "“Would you teach me how you make that?”"
   ],
   "avoid": [
    "Polishing or rewriting their words. Their voice is the gift.",
    "Rushing them, or treating it as a task to finish “before it's too late.”",
    "Pushing into hard chapters they haven't chosen to open.",
    "Sharing what they've written without asking them first."
   ],
   "help": [
    "Be the scribe: write, type, or record their words exactly as they say them.",
    "Bring prompts: an old photo, a song, a recipe card, a map of where they grew up.",
    "Let them decide what to share, and with whom.",
    "If memory is changing, write it as a “told to” entry, and enjoy the telling more than the details."
   ],
   "you": "Listening to their stories can be tender, especially when time feels short. Keep what they give you somewhere safe, and let yourself feel what it stirs."
  },
  "faith": "For some people, faith is part of the legacy: a blessing, a prayer, a favorite passage, or the story of what has held them up. Many traditions have long practices of blessing the next generation and passing on values in writing. If faith is part of your life, include it in your own words. If it isn't, your values, love, and lessons carry just as much.",
  "practices": [
   "trunk|Legacy Letter",
   "trunk|Record a Story",
   "trunk|What I Want Remembered",
   "trunk|Life Lessons",
   "trunk|Values Sort",
   "fruit|Blessing for Those You Love",
   "trunk|Pass On a Skill"
  ],
  "reach": [
   "If looking back brings up more than you want to carry alone, stop and call someone you trust, or call or text 988, any time. Veterans, especially if memories from service return: 988, then press 1.",
   "If you are in hospice or palliative care, ask whether a chaplain, social worker, or volunteer can help with legacy or life story work.",
   "Eldercare Locator, 1-800-677-1116 (call or text), for local programs, classes, and volunteer roles where your know-how is welcome. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, weekdays."
  ],
  "more": [
   [
    "Sequoia's Legacy Book",
    "/sequoia/#legacy"
   ],
   [
    "Dignity in Care: dignity therapy at the end of life",
    "https://dignityincare.ca/en/dignity-therapy-at-end-of-life.html"
   ],
   [
    "Legacy of values writing with older adults (The Gerontologist, 2023)",
    "https://academic.oup.com/gerontologist/article/63/9/1488/7058504"
   ],
   [
    "Allen and colleagues, legacy activities near the end of life (research)",
    "https://doi.org/10.1089/jpm.2007.0294"
   ]
  ]
 },
 {
  "id": "several-conditions",
  "ring": "life",
  "title": "Living with several conditions at once",
  "life": [
   "health",
   "pain",
   "serious"
  ],
  "keys": "several conditions many conditions multiple chronic conditions multimorbidity too many doctors too many appointments too many pills medicines list specialists diabetes heart arthritis copd kidney blood pressure overwhelmed health conditions juggling",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "Living with more than one long-term condition is the most common way to grow older. You are in good company.",
   "Your doctors know your conditions. You know your life. Tell them what matters most to you.",
   "Keep one up-to-date list of every medicine, vitamin, and supplement, and bring it to every visit.",
   "Ask one person on your care team to help you see the whole picture, not only one part.",
   "You choose the words for what you live with. You are a whole person, not a list of diagnoses."
  ],
  "feel": "Tired of appointments, tired of pills, tired of being a patient. Some days it can feel like your calendar belongs to your conditions. You may feel confused when one doctor's advice seems to pull against another's, or worried that something is being missed. Some people feel guilty for not keeping up with every instruction. Others feel a quiet grief for the body and the freedom they had before.",
  "self": {
   "first": [
    "Make one list of every condition, every medicine, vitamin, and supplement (with the dose), and every doctor. Keep a copy in your wallet or purse.",
    "Before your next visit, write down what matters most to you right now: a walk with a friend, gardening, church or temple, time with the grandchildren, staying in your home.",
    "Ask your main doctor or nurse: Who can help me see the whole picture? Is there anything I could stop or simplify?",
    "Bring someone along, or ask for the visit notes, so you don't have to remember everything."
   ],
   "helps": [
    "Telling your care team what you want your days to be for, so the plan can be built around it.",
    "Asking your pharmacist to look over all your medicines together once a year, or after any hospital stay.",
    "A simple weekly page: appointments, refills, and one thing you are looking forward to.",
    "A pill organizer, a phone alarm, or a helper's reminder.",
    "A workshop for living well with long-term conditions, led by people who live with them too.",
    "Leaving room in the week for rest and for things that have nothing to do with health."
   ],
   "tell": [
    "“I am more than my conditions.”",
    "“It's fine to ask what matters most, and to say what matters to me.”",
    "“One day, one list, one step.”"
   ],
   "people": "Try: “I have a lot of appointments right now. Could you help me with rides on Tuesdays?” or “I'd love a visit that isn't about my health.”"
  },
  "helper": {
   "feel": "They may feel worn out by appointments and medicines, and frustrated when advice from different doctors doesn't fit together. Many older adults keep quiet about how hard it is, so they won't seem ungrateful or like a burden.",
   "say": [
    "“What matters most to you right now?”",
    "“Which appointment or medicine feels hardest?”",
    "“Would it help if I came along and took notes?”",
    "“Let's plan something this week that has nothing to do with doctors.”"
   ],
   "avoid": [
    "Talking about them only as their conditions, or speaking to the doctor over them.",
    "Changing or stopping any medicine yourself. Questions about medicines belong with their doctor or pharmacist.",
    "Comparing them with someone else who “has the same thing.”",
    "Taking over the whole calendar without asking."
   ],
   "help": [
    "Help keep the medicine and doctor list up to date, with their say on every line.",
    "Offer rides, or help them find rides, to the appointments that matter most.",
    "Before a visit, help them write down their questions and what matters most to them.",
    "Keep the rest of life going: a meal, a game, a drive, a visit with no health talk."
   ],
   "you": "Keeping track of many conditions is real work, and it can fill your own week too. Share the load with others, keep your own appointments, and keep your own rest. Your steady presence matters more than knowing every detail."
  },
  "faith": "For some people, faith steadies them when the body feels like a long list of problems: a prayer before appointments, a community that brings meals and rides, a sense of being known as a whole person. For others, many illnesses at once can raise hard questions or make worship hard to reach. Both belong. A chaplain or faith leader can visit, or bring worship home, if you'd like. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "leaves|Appointment Prep",
   "leaves|Medicine",
   "leaves|Pacing Your Day",
   "trunk|Values Sort",
   "trunk|Worth Beyond Doing",
   "bark|Hard-Day Plan"
  ],
  "reach": [
   "Questions about your medicines, or how they mix with each other or with alcohol: ask your pharmacist or doctor.",
   "Feeling overwhelmed by many doctors and plans: ask your main doctor or nurse who can help you see the whole picture, such as a care coordinator or social worker.",
   "Chest pain, trouble breathing, or a sudden change: call 911.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Rides, meals, and help at home anywhere in the US: Eldercare Locator, 1-800-677-1116.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, for help at home and planning ahead.",
   "Workshops for living well with long-term conditions: the Self-Management Resource Center can help you find one."
  ],
  "more": [
   [
    "Self-Management Resource Center",
    "https://selfmanagementresource.com/"
   ],
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "energy-pacing",
  "ring": "life",
  "title": "Energy, fatigue, and pacing",
  "life": [
   "pain",
   "health",
   "serious",
   "moving"
  ],
  "keys": "energy fatigue tired exhausted worn out no energy pacing spoons spoon theory rest naps flare bad days good days boom and bust overdoing it tired all the time chronic fatigue low energy",
  "parts": [
   "leaves",
   "bark",
   "fruit"
  ],
  "quick": [
   "Fatigue that comes with a condition is real. It is not laziness, and rest alone may not fix it.",
   "Pacing means spending your energy on purpose: a little, then rest, before you're spent.",
   "Some people picture a day's energy as a handful of spoons. Spend them on what matters most first.",
   "Fatigue that is new, or much worse, deserves a talk with your doctor or nurse.",
   "Rest is part of tending yourself, not a failure."
  ],
  "feel": "Tired in a way sleep doesn't fix. Frustrated that a small task can take a whole morning, or that a good day can cost you the next two. Some people feel guilty resting while others work, or embarrassed to cancel plans again. Many feel a quiet grief for the energy they used to have.",
  "self": {
   "first": [
    "For one week, jot down your energy morning, midday, and evening, from 0 to 10, and what you did. Look for your best hours.",
    "Each morning, name one thing you must do, one thing you want to do, and when you will rest.",
    "Tell your doctor or nurse if fatigue is new, much worse, or keeping you from what matters. Bring your notes.",
    "Pick two short rest times today, and rest even if you feel fine."
   ],
   "helps": [
    "Saving your best hours for what matters most to you.",
    "Breaking big jobs into small pieces across the week, with rest in between.",
    "Sitting to do what you can: a stool at the sink, a chair in the shower, a seat while you cook.",
    "Saying no, or not today, without a long explanation.",
    "Keeping one spoon back for the unexpected.",
    "Letting someone else carry the heavy things, so you can spend your energy on the good ones."
   ],
   "tell": [
    "“Rest is part of how I take care of myself.”",
    "“A smaller day is still a good day.”",
    "“I spend my energy on what matters.”"
   ],
   "people": "Try: “I'd love to come. Can we make it an hour, and somewhere I can sit?” or “I have energy for one thing today. I'd like it to be time with you.”"
  },
  "helper": {
   "feel": "They may feel tired in a way that's hard to explain, and worried you'll think they aren't trying. Many older adults push through on good days, then pay for it for days after.",
   "say": [
    "“How much energy do you have today?”",
    "“What would you most like to spend it on?”",
    "“Would it help if I did this part, so you can save your energy for that?”",
    "“Let's keep it short. I'd rather see you rested.”"
   ],
   "avoid": [
    "“You just need more exercise,” or “You slept all afternoon.”",
    "Planning long days without rest built in.",
    "Doing everything for them without asking. Choosing where to spend their energy is theirs.",
    "Treating a canceled plan as a sign they don't care."
   ],
   "help": [
    "Ask what time of day is best, and plan visits then.",
    "Offer to carry, lift, drive, or shop, as a choice they can turn down.",
    "Make plans that can shrink: shorter visits, closer places, a chair waiting.",
    "Help them tell their doctor if fatigue is new or getting worse."
   ],
   "you": "Watching someone run out of energy can stir worry and impatience. Both are human. Pacing your own help matters too: share the load, rest yourself, and remember that a short, warm visit is a real gift."
  },
  "faith": "Many traditions honor rest: a sabbath, a day set apart, prayer that asks nothing but stillness. For some people, that permission to rest is a deep comfort when energy is low. For others, being unable to serve or attend worship as before brings sadness. Both belong. Shorter prayers, worship by phone or video, or a visit from a faith leader can fit a smaller day. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "leaves|Pacing Your Day",
   "leaves|Rest Before You're Spent",
   "leaves|Smart Nap",
   "fruit|Comfort Within Reach",
   "bark|Self-Compassion Break",
   "branches|Ask for Help"
  ],
  "reach": [
   "Fatigue that is new, much worse, or comes with other changes: tell your doctor or nurse. Bring a week of energy notes.",
   "Questions about whether a medicine adds to your tiredness: ask your pharmacist or doctor.",
   "Feeling hopeless, or so worn down you think about ending your life: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Help at home, meals, and rides anywhere in the US: Eldercare Locator, 1-800-677-1116.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433.",
   "Workshops for living well with long-term conditions and fatigue: the Self-Management Resource Center can help you find one."
  ],
  "more": [
   [
    "Christine Miserandino, The Spoon Theory",
    "https://butyoudontlooksick.com"
   ],
   [
    "Self-Management Resource Center",
    "https://selfmanagementresource.com/"
   ],
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ]
  ]
 },
 {
  "id": "lifelong-disability",
  "ring": "life",
  "title": "Growing older with a lifelong disability",
  "life": [
   "autism",
   "moving",
   "hearing",
   "seeing"
  ],
  "keys": "lifelong disability disabled since birth since childhood aging with a disability polio cerebral palsy spina bifida intellectual disability developmental disability autistic deaf blind wheelchair growing older new changes post polio losing helpers independent living",
  "parts": [
   "trunk",
   "branches",
   "leaves"
  ],
  "quick": [
   "You bring decades of knowing what works for you. You are the expert on your own life.",
   "Growing older can bring new changes on top of familiar ones. Both deserve attention.",
   "Not every new symptom is your disability, and not every one is age. Ask your doctor to look.",
   "Many barriers are in the world around you: steps, forms, rushed visits. Asking for what works is your right.",
   "You choose your own words. Many people say Deaf, blind, or autistic; many say a person with a disability. Both are welcome here."
  ],
  "feel": "Proud of a life built your own way, and maybe tired of explaining it again. Some people notice their body changing in new ways: more pain, less energy, a wheelchair or cane needed more often. Others are losing the people who knew them best, like parents, siblings, or long-time helpers. You may feel frustrated when a new doctor sees only the disability, or only your age, and not you.",
  "self": {
   "first": [
    "Write down what has changed in the last year: energy, pain, strength, hearing, sight, or mood. Bring it to your doctor.",
    "Make a short list of what helps you, ready to hand to a new doctor, nurse, or helper.",
    "Ask your doctor: Could this be something new, and not only my disability or my age?",
    "Name the people you count on now, and one or two you'd like to add."
   ],
   "helps": [
    "Your own know-how: the routines, tools, and ways of doing things you have built over a lifetime.",
    "Equipment that fits your body now, even if it's different from before.",
    "People who share your experience: a disability community, a Deaf club, a peer group, an independent living center.",
    "Planning ahead for help at home, so the choices stay yours.",
    "Rest and pacing, as energy changes.",
    "Time with people who know you as you, not as a patient."
   ],
   "tell": [
    "“I know what works for me.”",
    "“Changing how I do things is still doing them.”",
    "“My life has been my own, and it still is.”"
   ],
   "people": "Try: “It helps me when you face me and speak clearly,” or “Please ask me, not the person with me.”"
  },
  "helper": {
   "feel": "They have lived a whole life with a disability and know a great deal about what works. Growing older can add new changes, and the loss of helpers who knew them well. Many are tired of being spoken about instead of spoken to.",
   "say": [
    "“What works best for you?”",
    "“What has changed lately, and what would help?”",
    "“Do you want me to say anything, or will you?”",
    "“Tell me how you like to do this.”"
   ],
   "avoid": [
    "Speaking to the doctor, the server, or anyone else over them.",
    "Calling them an inspiration, or brave for doing ordinary things.",
    "Assuming every new problem is “just the disability” or “just age.”",
    "Taking over a task they have done their own way for years."
   ],
   "help": [
    "Ask how they like things done, and do it that way.",
    "Help them bring a list of changes and needs to the doctor, if they want help.",
    "Notice barriers around them, like steps, poor lighting, or noisy rooms, and help change those.",
    "Help them plan ahead for support at home, with their choices at the center."
   ],
   "you": "You may be one of the people they count on most, and you may be growing older too. Talk with them early about the future, and build a wider circle of help together, so no one person carries it all."
  },
  "faith": "For some people, faith has been a steady companion through a lifetime of living with a disability. For others, faith communities have been places of welcome, or of barriers: steps, sound systems, or people who prayed for a cure they never asked for. Both experiences are real. You decide what you want from a faith community, and a faith leader who listens can help make worship easier to reach. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "branches|Say What You Need",
   "trunk|Name Your Gifts",
   "leaves|Appointment Prep",
   "bark|Quiet the Senses",
   "branches|Ask for Help",
   "leaves|Rest Before You're Spent"
  ],
  "reach": [
   "New pain, weakness, tiredness, or changes in hearing, sight, or thinking: tell your doctor or nurse, and ask whether it could be something new.",
   "In Minnesota: Disability Hub MN, 1-866-333-2466, for help with health, housing, independent living, and money resources.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433, for help at home and planning ahead.",
   "Anywhere in the US: Eldercare Locator, 1-800-677-1116, for local services.",
   "If someone is hurting you, neglecting you, or taking your money in Minnesota: MAARC, 1-844-880-1574. Danger right now: call 911.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Deaf and hard of hearing callers can reach a counselor in ASL through the 988 website. Veterans: dial 988, then press 1."
  ],
  "more": [
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ],
   [
    "Aging well with a lifelong disability (research review, 2024)",
    "https://doi.org/10.1093/geront/gnae092"
   ]
  ]
 },
 {
  "id": "adult-child-disability",
  "ring": "life",
  "title": "Who will help my adult child? Aging parents of adults with disabilities",
  "life": [
   "close",
   "autism"
  ],
  "keys": "adult child with a disability son daughter intellectual disability developmental disability autism down syndrome aging parent who will care for my child when im gone future planning guardianship supported decision making special needs trust group home siblings letter of intent worry",
  "parts": [
   "branches",
   "fruit",
   "bark"
  ],
  "quick": [
   "“Who will help my child when I can't?” is one of the heaviest questions a parent can carry. You don't have to answer it alone, or all at once.",
   "Plan with your son or daughter, not only for them. Their wishes, likes, and voice come first.",
   "Write down what you know: routines, health, likes, fears, and the people who matter to them.",
   "Ask about planning help: The Arc's Center for Future Planning, your county case manager, and a lawyer who knows disability planning.",
   "Many families have no plan yet. Starting with one small step counts."
  ],
  "feel": "Love and worry, often in the same breath. Some parents have cared for their son or daughter for fifty years or more and can't picture anyone else doing it. You may feel tired, afraid of what happens if you get sick, guilty about leaning on your other children, or overwhelmed by words like guardianship, trusts, and waiting lists. Some feel a deep pride in the life your family has built together.",
  "self": {
   "first": [
    "Start a letter about your son or daughter: daily routines, health and medicines, what they love, what upsets them, how they communicate, and who matters to them.",
    "Ask your son or daughter, in the way that works for them, what they want: where to live, who to see, what they enjoy doing.",
    "Call your county case manager, or Disability Hub MN in Minnesota, and ask what planning help is available.",
    "Make an appointment with a lawyer who knows disability planning to ask about the choices that fit your family."
   ],
   "helps": [
    "Planning in small steps, one conversation or one page at a time.",
    "Widening your adult child's circle now: friends, neighbors, a day program, a faith community, people who know them well.",
    "Talking early with siblings or other family about what they can and can't do, without assuming.",
    "Letting other people learn your child's routines while you are here to teach them.",
    "Meeting other parents in the same season, through The Arc or a parent group.",
    "Caring for your own health. Your son or daughter needs you well, too."
   ],
   "tell": [
    "“I don't have to solve the whole future today.”",
    "“My child's voice belongs in this plan.”",
    "“Asking for help is part of loving them well.”"
   ],
   "people": "Try: “I want to start planning for the future. Would you sit down with me and help me think it through?”"
  },
  "helper": {
   "feel": "They may carry a lifetime of caring and a deep fear about what comes after them. Many parents have heard “someone will step in” for years without a real plan, and the question can feel too big to start.",
   "say": [
    "“What do you most hope for him or her?”",
    "“What would help you start?”",
    "“Could I sit with you while you write some of it down?”",
    "“What does your son or daughter want?”"
   ],
   "avoid": [
    "“Don't worry, it'll all work out.”",
    "Promising to take over care you can't truly give.",
    "Making decisions about the adult child without asking them.",
    "Giving legal or money advice. Point them to a lawyer, The Arc, or the county."
   ],
   "help": [
    "Offer to help gather papers, make calls, or sit in on a planning meeting.",
    "Get to know their son or daughter yourself, so the circle grows.",
    "Learn one routine, so you could step in for a day.",
    "Give the parent real breaks, and help them keep their own appointments."
   ],
   "you": "Being asked to be part of someone's future can be an honor and a weight. Be honest about what you can give, and help build a wider circle so no one person carries it all, including you."
  },
  "faith": "For some families, faith has been a steady support through a lifetime of caring, and a faith community can become part of the circle that surrounds your son or daughter. For others, faith communities have not always made room, and that hurt is real. If you want, a faith leader can help you think through the future, or help your congregation welcome your adult child more fully. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "trunk|Legacy Letter",
   "fruit|Make Your Wishes Known",
   "bark|Worry Window",
   "branches|Ask for Help",
   "branches|Caregiver Pause",
   "branches|Active Listening"
  ],
  "reach": [
   "Future planning for families of adults with intellectual and developmental disabilities: The Arc's Center for Future Planning, or your local Arc chapter.",
   "In Minnesota: Disability Hub MN, 1-866-333-2466, for help with services, housing, and planning.",
   "Your county case manager or social worker, for services, waiting lists, and support at home.",
   "A lawyer who knows disability planning, for questions about guardianship, supported decision-making, wills, and trusts.",
   "Help for you as a caregiver: Eldercare Locator, 1-800-677-1116, or in Minnesota, Minnesota Aging Pathways, 1-800-333-2433.",
   "If you believe a vulnerable adult is being hurt, neglected, or taken advantage of in Minnesota: MAARC, 1-844-880-1574. Danger right now: call 911.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: dial 988, then press 1."
  ],
  "more": [
   [
    "The Arc, Center for Future Planning",
    "https://futureplanning.thearc.org/"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org/"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "stroke",
  "ring": "life",
  "title": "After a stroke",
  "life": [
   "memory",
   "moving",
   "health"
  ],
  "keys": "stroke after a stroke tia mini stroke brain attack aphasia speech words weakness one side paralysis rehab therapy recovery balance memory fatigue depression after stroke be fast warning signs",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "A new stroke is an emergency. Sudden balance loss, eye changes, a drooping face, arm weakness, or trouble speaking: call 911 right away.",
   "Recovery often continues for months. Your rehab team can tell you what to work on next.",
   "Words, movement, memory, and mood can all change. You are still you.",
   "Low mood after a stroke is common, and help works. Tell your doctor or nurse.",
   "You choose what to call what you live with, and you set the pace of the conversation."
  ],
  "feel": "Shaken, frustrated, or frightened. A stroke can change things overnight: how you walk, how you speak, how you remember, how tired you feel. Some people feel embarrassed when words come out wrong, or angry at a hand that won't do what it used to. Many feel sad or flat for a while. Some feel grateful to be here and grieving at the same time.",
  "self": {
   "first": [
    "Learn the warning signs of a new stroke with your family, and keep 911 close.",
    "Ask your rehab team: What should I work on now? What can I do at home? When will we check progress?",
    "Bring someone to appointments, or ask for written notes, so you don't have to remember everything.",
    "Tell your doctor or nurse if you feel low, flat, or worried most days."
   ],
   "helps": [
    "Practice in small, regular pieces, with rest in between.",
    "Asking people to slow down, give you time, and ask one question at a time.",
    "Tools that help you talk: writing, pictures, a word board, yes and no questions.",
    "Doing things seated, and setting up your home so what you need is within reach.",
    "Counting what you can do this week, not only what you used to do.",
    "Time with people who make you laugh."
   ],
   "tell": [
    "“I am still me.”",
    "“Slow progress is still progress.”",
    "“I can take my time.”"
   ],
   "people": "Try: “Please give me time to answer. I know what I want to say; the words take longer now.”"
  },
  "helper": {
   "feel": "They may feel frustrated, frightened, or embarrassed by changes in speech, movement, or memory. Many feel sad or flat for a while after a stroke, and some are too tired to explain.",
   "say": [
    "“Take your time. I'm listening.”",
    "“Do you want help, or would you like to try?”",
    "“What did you work on in therapy this week?”",
    "“You're still you to me.”"
   ],
   "avoid": [
    "Finishing their sentences, or speaking to others as if they can't understand.",
    "Talking louder. Slower and simpler usually helps more.",
    "Doing everything for them. Practice is part of recovery.",
    "“At least it wasn't worse,” as the first thing you say."
   ],
   "help": [
    "Learn the warning signs of a new stroke, and call 911 right away if you see them.",
    "Help them practice what their therapists suggest, at their pace.",
    "Ask one question at a time, and wait for the answer.",
    "Watch for low mood that lasts, and help them tell their doctor."
   ],
   "you": "Life can change for you overnight too, and caring after a stroke can be tiring. Ask the rehab team what you can do, accept help with rides and meals, and keep your own rest and your own people."
  },
  "faith": "For some people, faith becomes a steady place after a stroke: familiar prayers known by heart, music, a community that visits. For others, a stroke can raise hard questions, or make worship hard to reach. Both belong. Prayers and songs learned long ago often stay even when other words are hard to find. A chaplain or faith leader can visit if you'd like. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "bark|Body Kindness Scan",
   "leaves|Rest Before You're Spent",
   "leaves|Chair Stretch",
   "leaves|Appointment Prep",
   "trunk|Worth Beyond Doing",
   "branches|Say What You Need"
  ],
  "reach": [
   "Signs of a new stroke, even if they go away: sudden loss of balance, trouble seeing, a drooping face, arm weakness, or trouble speaking. Call 911 right away and note the time.",
   "Questions about recovery, therapy, and what to practice at home: ask your doctor and your rehab team.",
   "Low mood, flatness, or worry most days: tell your doctor or nurse. Help works.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Help at home, rides, and meals anywhere in the US: Eldercare Locator, 1-800-677-1116.",
   "In Minnesota: Minnesota Aging Pathways, 1-800-333-2433. Disability Hub MN, 1-866-333-2466, for equipment, housing, and independent living resources."
  ],
  "more": [
   [
    "American Stroke Association, stroke symptoms and warning signs",
    "https://www.stroke.org/en/about-stroke/stroke-symptoms"
   ],
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 },
 {
  "id": "heart-lung",
  "ring": "life",
  "title": "Living with heart or lung disease, and oxygen",
  "life": [
   "health",
   "serious"
  ],
  "keys": "heart disease heart failure lung disease copd emphysema pulmonary fibrosis oxygen tank concentrator cannula short of breath breathless breathing trouble cardiac rehab pulmonary rehab afraid to breathe swelling tired heart attack",
  "parts": [
   "leaves",
   "bark",
   "branches"
  ],
  "quick": [
   "Chest pain, severe breathlessness, or breathing that suddenly gets much worse: call 911.",
   "Ask your care team for a written plan: what to watch for, what to do, and who to call.",
   "Ask whether cardiac or pulmonary rehab fits you. Many people find it helps them do more with less fear.",
   "Oxygen is a tool that helps you live your life. Use it as your doctor prescribes, and keep it away from smoking and open flames.",
   "Feeling short of breath can be frightening. Fear and breath affect each other, and calm can be practiced."
  ],
  "feel": "Worried about the next breath, or the next spell. Some people feel tied to the oxygen tubing, or self-conscious using it in public. Many feel tired, frustrated that stairs or a walk to the mailbox take so much, and afraid of a trip back to the hospital. Some quietly stop going places. Some feel grateful for every good day.",
  "self": {
   "first": [
    "Ask your doctor or nurse for a written plan: what changes to watch for, what to do, and who to call.",
    "Ask whether cardiac rehab or pulmonary rehab would fit you.",
    "If you use oxygen, ask your supplier to show you, and whoever helps you, how to use and store it safely.",
    "Keep your medicine list and your plan where helpers and emergency workers can find them."
   ],
   "helps": [
    "Pacing: doing a little, then resting, and sitting to do what you can.",
    "Calm breathing your care team has taught you, never forced.",
    "Planning outings: a seat near the door, a spare oxygen supply, a shorter visit.",
    "A support group of people living with heart or lung disease.",
    "Keeping one good thing on the calendar each week.",
    "Telling your doctor about worry or low mood. It's common, and help works."
   ],
   "tell": [
    "“One breath at a time.”",
    "“My oxygen helps me live my life.”",
    "“Rest is part of the plan.”"
   ],
   "people": "Try: “I'd love to come. Could we sit near the door, and keep it to an hour?” or “I may need to stop and catch my breath. Just wait with me.”"
  },
  "helper": {
   "feel": "They may feel frightened when breath runs short, embarrassed about oxygen in public, and tired of how much effort small things take. Many play down symptoms so no one will worry.",
   "say": [
    "“I'm here. Take your time.”",
    "“What does your plan say to do?”",
    "“Would a shorter visit work better today?”",
    "“Is there anything you've stopped doing that you miss?”"
   ],
   "avoid": [
    "Rushing them, or talking quickly while they catch their breath.",
    "Lecturing about past habits, like smoking.",
    "Adjusting oxygen or medicines yourself. Those belong with their care team.",
    "Smoking, or using open flames, near their oxygen."
   ],
   "help": [
    "Learn their written plan, and know when to call 911.",
    "Help keep their home safe for oxygen: no smoking, flames kept away, tubing out of walkways.",
    "Plan outings around breath: closer parking, seats, rest stops, spare oxygen.",
    "Offer rides to rehab or a support group."
   ],
   "you": "Watching someone struggle to breathe can be frightening, and it's natural to hover. Learn the plan, so you know what to do, and then let calm be your gift. Keep your own rest, and talk with someone about your own worry."
  },
  "faith": "For some people, faith shows up in the breath itself: a short prayer with each breath, psalms or chants known by heart, a sense of being held when breathing is hard. For others, illness raises hard questions, or makes worship hard to reach. Both belong. Worship by phone or video, or a visit from a faith leader, can bring community close. Sequoia welcomes all faith traditions and everything in-between.",
  "practices": [
   "leaves|Breathe",
   "bark|Slow Exhale",
   "leaves|Pacing Your Day",
   "leaves|Appointment Prep",
   "branches|Support Group",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Chest pain, severe breathlessness, lips or fingers turning blue, or a sudden change: call 911.",
   "Symptoms that are slowly getting worse, like more swelling or more breathlessness: follow your written plan and call your doctor or nurse.",
   "Questions about oxygen equipment, supplies, and safe use: call your oxygen supplier.",
   "Questions about medicines: ask your pharmacist or doctor.",
   "Feeling hopeless, or thoughts of ending your life: call or text 988, any time. Veterans: dial 988, then press 1.",
   "Help at home, rides, and meals anywhere in the US: Eldercare Locator, 1-800-677-1116. In Minnesota: Minnesota Aging Pathways, 1-800-333-2433."
  ],
  "more": [
   [
    "American Lung Association, Better Breathers Club support groups",
    "https://www.lung.org/help-support/better-breathers-club"
   ],
   [
    "National Institute on Aging, health information",
    "https://www.nia.nih.gov/health"
   ],
   [
    "Eldercare Locator",
    "https://eldercare.acl.gov/home"
   ]
  ]
 }
];
window.SEQUOIA_GUIDES = { rings: LC_RINGS, links: L, topics: LC_TOPICS };
})();
/* LIFE tags start: Health and Ability tags (GWG BLD 756, HA 1). life: shared/gg-life.js ids. Generated by worker A. */
(function () { var G = window.SEQUOIA_GUIDES; if (!G || !G.topics) return; var L = {"new-diagnosis": ["health", "serious"], "pain": ["pain", "health"], "falls": ["moving"], "hearing": ["hearing"], "vision": ["seeing"], "driving": ["seeing", "moving", "memory"], "hospital": ["serious", "health"], "memory-worry": ["memory"], "dementia": ["memory", "close"], "depression": ["mind"], "anxiety": ["mind"], "spouse-caregiving": ["close", "memory"], "burden": ["health", "moving", "serious", "close"], "faith-questions": ["serious", "health"], "appetite": ["health", "serious"], "care-move": ["moving", "memory", "health"], "kids-deciding": ["memory", "moving"], "old-memories": ["mind"], "worry-adult-children": ["close"]};
  G.topics.forEach(function (t) { if (L[t.id]) t.life = L[t.id].slice(); }); })();
/* LIFE tags end */
