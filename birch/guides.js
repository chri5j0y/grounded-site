/* =====================================================================
   BIRCH . WHEN LIFE CHANGES
   Guides for the changes of the young adult years, for the person going through it and for the helper beside them.
   Read by Birch (/birch/), the site-wide search, and the Field Guide. Each topic has Oak and Sequoia's
   shape: id, ring, title, keys, parts, quick, feel, self {first, helps, tell, people}, helper {feel, say, avoid, help,
   you}, faith, practices ("part|Name", matching birch/practices.js), reach, more. Generated from patches/bld743/source
   in grounded-workshop: edit the data there and rebuild. Kids' faith rules apply.
   ===================================================================== */
(function(){
const LC_RINGS = [
 {
  "key": "br-school",
  "name": "School and First Paths",
  "color": "#7F6610",
  "blurb": "College, trades, changing plans, pressure, and the what now season."
 },
 {
  "key": "br-work",
  "name": "Work and Money",
  "color": "#5A6B2F",
  "blurb": "A first job, losing one, changing careers, money basics, debt, and betting."
 },
 {
  "key": "br-home",
  "name": "Home and Living on Your Own",
  "color": "#6B4A2E",
  "blurb": "Moving out, roommates, a first apartment, moving back, and housing."
 },
 {
  "key": "br-people",
  "name": "Friends, Dating, and Marriage",
  "color": "#7A4A6A",
  "blurb": "Making friends, loneliness, dating, breakups, control, and getting married."
 },
 {
  "key": "br-family",
  "name": "Family and Early Parenthood",
  "color": "#8A4A2C",
  "blurb": "Parents as adults, hard family ties, pregnancy, and a new baby."
 },
 {
  "key": "br-mind",
  "name": "Mind and Body",
  "color": "#3F5A7A",
  "blurb": "Anxiety, depression, first signs, substances, eating, and your own health."
 },
 {
  "key": "br-safety",
  "name": "Safety",
  "color": "#5D3A3A",
  "blurb": "Thoughts of suicide, self-harm, assault, images, and pornography."
 },
 {
  "key": "br-meaning",
  "name": "Service, Loss, Faith, and Meaning",
  "color": "#5E4A7A",
  "blurb": "The military, grief, faith on your own, and finding purpose."
 }
];
const L = {};
const LC_TOPICS = [
 {
  "id": "first-year",
  "ring": "br-school",
  "title": "College: the first year",
  "keys": "college first year freshman first semester new student community college university commuter student living on campus dorm roommate homesick lonely at college no friends at college hard classes failing a class first exam financial aid working while in school first generation college student going back to school older student transfer student orientation counseling center ra parents calling too much grades dropping should i drop out overwhelmed at college",
  "parts": [
   "branches",
   "bark",
   "leaves"
  ],
  "quick": [
   "The first year of college is a big adjustment for almost everyone, whether you live on campus, commute, work, or started later than your classmates.",
   "Feeling lonely, homesick, or behind in the first months is common, and it usually eases. Among college students, about one in four reported feeling isolated in a recent national survey, and mental health has improved three years in a row.",
   "Belonging gets built on purpose: one group, one class friend, one place you return to. Give it a few weeks before you decide it isn't working.",
   "Find where help lives early: advising, tutoring, the counseling center, a clinic, financial aid. Using them is part of doing college well."
  ],
  "feel": "The first year can feel like freedom and a test at the same time. Nobody tells you when to sleep, eat, or study, and the first exam can land harder than anything in high school. Some people feel homesick for people and places they couldn't wait to leave. Others are commuting, working a job, raising a child, or starting at 22 or 25, and wonder if they fit at all. You might be the first in your family to do this, carrying hopes that aren't only yours. You might also love it, and feel guilty that you don't miss home more. Excitement, loneliness, pride, and doubt can all show up in the same week. That mix is normal, and it doesn't mean you chose wrong.",
  "self": {
   "first": [
    "This week, find three places on a map or a website: the counseling center, tutoring or the writing center, and your advisor's office. Save 988 in your phone too; it works anywhere in the country.",
    "Pick one group, class, team, faith community, or club, and go three times before you decide.",
    "Set a steady wake time and protect 7 to 9 hours of sleep most nights. It holds up your mood, your memory, and your grades."
   ],
   "helps": [
    "Talking to one person in each class: “Want to compare notes before the exam?”",
    "Going to office hours early, before you're behind. Instructors expect it and often remember the students who come.",
    "A weekly reset: look at every deadline for the week ahead, and put them where you'll see them.",
    "Eating real meals and moving your body, especially during exams, when they slip first.",
    "If you commute or work, finding one spot on campus that's yours between classes, and one person you see there.",
    "Telling someone early if you feel low or stuck, instead of waiting until it's heavy."
   ],
   "tell": [
    "“Everyone here is figuring it out, including the ones who look sure.”",
    "“Homesick means I have people worth missing.”",
    "“Asking for help is part of doing this well.”",
    "“One hard exam is information, not a verdict.”"
   ],
   "people": "Try, in class: “Do you want to study together before the exam?” With an instructor: “I'm not sure I understand what you're looking for on this paper. Can you show me an example?” With home: “I'm doing okay, and some weeks are hard. Can we talk Sundays?” If it's heavy: “I'm having a harder time adjusting than I expected. Can I talk with someone?”"
  },
  "helper": {
   "feel": "A first-year student may sound fine on the phone and feel lost at night. Many feel pressure to prove they belong, especially if they're the first in the family to go, paying their own way, or older than their classmates. They're also adults now, building a life you can't see from the outside. Some pull back from home to find their footing; others call every day for a while. Both can be healthy.",
   "say": [
    "“How are you really doing? I'm asking because I want to know, not to check up.”",
    "“What's been good so far? What's been harder than you expected?”",
    "“A rough first semester happens to a lot of people. It doesn't decide the rest.”",
    "“If it ever gets heavy, you can call me, or call or text 988. Both, even.”"
   ],
   "avoid": [
    "Opening every call with grades or money.",
    "“These are the best years of your life.” A hard first year can then feel like failure.",
    "Solving problems they haven't asked you to solve, or calling the school on their behalf.",
    "Comparing them with a sibling, a cousin, or yourself at their age."
   ],
   "help": [
    "Agree on a rhythm for staying in touch, and let them lead it.",
    "Listen first. Ask, “Do you want ideas, or do you want me to listen?” and follow their answer.",
    "Point to campus help without taking over: advising, tutoring, counseling, financial aid, the clinic.",
    "At 18, school records and most health information belong to them. If they'd like you to see something, they can choose that; ask rather than assume.",
    "If they sound low for more than a few weeks, stop eating, sleeping, or going to class, or talk about not wanting to live, encourage the counseling center or a doctor, and call or text 988 together if it's urgent.",
    "Send something small from home: a card, a photo, a favorite snack. It says you're thinking of them without asking anything back."
   ],
   "you": "Their first year can be a hard year for you too: a quieter house, worry you can't fix, pride you don't always get to share with them. Name that to someone in your own life. If they use Birch, their answers stay on their own device; you'll see only what they choose to share, never their safety answers, and Birch sends no alert to anyone. Your trust is part of what helps them find their footing."
  },
  "faith": "For some students, faith steadies the first year: a campus ministry, a congregation near school, or a practice from home that still fits. For others, college is where faith questions get louder, and that's a normal part of these years. If faith is part of your life, you might look for one place to bring both your gratitude and your questions. If it isn't, the same need is real: a few people who share what matters most to you, and a quiet habit that steadies you on a hard day.",
  "practices": [
   "branches|Join and Go Three Times",
   "leaves|Steady Wake Time",
   "trunk|Study Sprints",
   "trunk|Weekly Reset",
   "branches|Call Home",
   "bark|Speak Up About Your Mood"
  ],
  "reach": [
   "Low, anxious, or lonely for more than a few weeks, or it's getting in the way of classes, sleep, or eating: go to your campus counseling center, a health clinic, or a doctor.",
   "Feeling hopeless, or thinking about not wanting to be alive: call, text, or chat 988, any time, anywhere in the country. Or text HOME to 741741 (in Minnesota, text MN to 741741). In Minnesota, you can also call **CRISIS (274747) from a cell phone.",
   "Someone you're dating or with is controlling, threatening, or hurting you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. Sexual assault: RAINN, 1-800-656-4673. In Minnesota: Day One, 1-866-223-1111.",
   "Drinking or drug use getting out of hand: SAMHSA National Helpline, 1-800-662-4357, any time.",
   "Questions about federal financial aid or student loans: Federal Student Aid Information Center, 1-800-433-3243, weekdays. Your school's financial aid office can help too.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "JED Foundation: Set to Go",
    "https://jedfoundation.org/set2go"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ],
   [
    "Federal Student Aid",
    "https://studentaid.gov"
   ],
   [
    "FERPA: when records become the student's",
    "https://studentprivacy.ed.gov/content/eligible-student"
   ]
  ]
 },
 {
  "id": "not-college",
  "ring": "br-school",
  "title": "Not college, or not yet: work, trades, and apprenticeships",
  "keys": "not going to college didn't go to college no degree skip college college isn't for me not yet gap year trade school trades apprenticeship electrician plumber welder carpenter hvac lineworker cosmetology cdl truck driving certificate program technical college community college later working full time first real job earn while you learn union apprenticeship military service americorps family expects college everyone else went to college feel behind no plan figuring it out",
  "parts": [
   "trunk",
   "fruit",
   "branches"
  ],
  "quick": [
   "There are many good roads after high school: a trade, an apprenticeship, a certificate, work, service, the military, starting something of your own, or college later. Not college, or not yet, is a real choice.",
   "Purpose doesn't depend on a degree. Research on adults finds people with and without college have similar levels of purpose; education shapes what that purpose is about.",
   "Many apprenticeships pay you while you learn. Look at the real costs, pay, and training time of each road before you decide.",
   "A next step is enough. Roads can change, and nothing you try is wasted."
  ],
  "feel": "Maybe everyone around you went to college, and you're answering the same question at every gathering. Maybe you love working with your hands, or you want to earn now, or school never fit how you learn. Maybe money, family needs, or timing made the choice for you, and you're making peace with it. You might feel proud of your path one day and behind the next, especially when friends post about campus life. You might also feel relief: real work, real pay, and skills people need. Not knowing your long-term plan yet is normal at this age. So is changing your mind later.",
  "self": {
   "first": [
    "Write three short lists: what I care about, what I'm good at or getting good at, and the kind of days I want (indoors or out, with people or tools, the same or always different).",
    "Pick one road you're curious about and one person on it. Ask them three questions: how they got started, what a normal day is like, and what they wish they'd known.",
    "Look up one apprenticeship or training program near you, and write down three facts: what it pays during training, how long it takes, and how to apply."
   ],
   "helps": [
    "Trying before you commit: a job shadow, a short course, a summer on a crew, volunteering, a career fair, or a tour of a training center.",
    "Comparing roads with real numbers: cost, pay during training, time to finish, and what work looks like after.",
    "Treating your first jobs as data. Notice what you like, what drains you, and what you're good at.",
    "Keeping a running list of skills and wins, for your résumé and for your own confidence.",
    "Finding a mentor in your field: a foreman, a journeyworker, a manager, an older coworker.",
    "Remembering that college stays open. Many people start, or return, when the reason is clear."
   ],
   "tell": [
    "“My road doesn't have to look like anyone else's.”",
    "“I don't need a whole plan. I need a next step.”",
    "“Skilled work is real work, and it matters.”"
   ],
   "people": "Try, at home: “I'm not going to college right now. Here's what I'm looking at, and why.” With someone in a trade: “Could I ask you a few questions about how you got started?” If someone asks “So what's the plan?”: “I'm working and figuring out my next step. Right now I'm looking at an apprenticeship.”"
  },
  "helper": {
   "feel": "A young adult who isn't in college may feel judged at every family gathering, even when they're working hard and learning a lot. Some chose this road with clear eyes. Others are still figuring it out, or carrying worry about money, family needs, or not measuring up to friends. Many need two things from you: respect for their choice, and someone who believes they can build a good life from here.",
   "say": [
    "“I'm proud of how hard you're working.”",
    "“What do you like about it? What would you change?”",
    "“There's more than one good road. I want to hear about yours.”",
    "“Who do you know in that work? Want help meeting someone?”"
   ],
   "avoid": [
    "Treating college as the only real road, or calling their path a backup plan.",
    "“So when are you going back to school?” at every visit.",
    "Comparing them with siblings, cousins, or friends.",
    "Choosing the road for them, or quietly steering every talk back to your preference."
   ],
   "help": [
    "Start from what they care about and what they're good at, then look at roads that fit.",
    "Help them meet people: someone in a trade, a union hall, an employer you know, a veteran, someone who did a service year.",
    "Look at real numbers together if they'd like: costs, pay during training, and time to finish.",
    "Name the strengths you see that have nothing to do with school: reliability, skill with their hands, how they treat people.",
    "If they're between things for a while and seem low, stuck, or hopeless, ask how they're really doing, and point to a doctor or counselor."
   ],
   "you": "Their road may not be the one you pictured, and that can bring its own grief. Name that to someone else, not to them. If they use Birch, their answers stay on their own device; you see only what they choose to share. What helps most is belief that they can find their way, and a steady place to come back to."
  },
  "faith": "For some, faith shapes this question: work as a calling, a way to serve, or a gift to use well. Prayer, a mentor in a faith community, or quiet time can help someone listen for what's theirs to do. For others, the same question points to their values and the people they want to help. Either way, good work done with care for others carries its own dignity.",
  "practices": [
   "trunk|Ask Someone About Their Path",
   "trunk|Name Your Gifts",
   "trunk|Big Choice Map",
   "trunk|Start Strong at a New Job",
   "trunk|Wins File",
   "fruit|Your Own Timeline"
  ],
  "reach": [
   "Feeling stuck, hopeless, or like you have no future, for two weeks or more: talk with a doctor, a counselor, or someone you trust.",
   "Feeling like there's no point, or thinking about not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Questions about military service or military life: Military OneSource, 800-342-9647, any time.",
   "Between jobs and need help with housing, food, or bills in Minnesota: dial 211, or call 1-800-543-7709.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Apprenticeship.gov: find an apprenticeship",
    "https://www.apprenticeship.gov"
   ],
   [
    "CareerOneStop (U.S. Department of Labor)",
    "https://www.careeronestop.org"
   ],
   [
    "AmeriCorps: ways to serve",
    "https://americorps.gov/serve"
   ],
   [
    "Federal Student Aid, for training programs and college later",
    "https://studentaid.gov"
   ]
  ]
 },
 {
  "id": "changing-plans",
  "ring": "br-school",
  "title": "Changing plans: stopping out, switching majors, starting over",
  "keys": "changing my major switch majors wrong major dropping out drop out stopping out taking a break from college leave of absence withdraw from classes medical leave failing out academic probation transfer schools changing programs quit my apprenticeship quit training start over starting over wasted time wasted money disappointed my parents going back to school returning student plans fell apart don't know what to do now",
  "parts": [
   "trunk",
   "fruit",
   "bark"
  ],
  "quick": [
   "Changing plans is common. About a third of students in bachelor's programs change their major within three years, and over a million adults went back to college in a single recent year.",
   "Stopping out, switching, or starting over is a decision, not a verdict on you. Many people find their way by trying a road and turning.",
   "Before you withdraw or switch, ask the people who know the details: an advisor, the registrar, and financial aid. Timing can affect aid, loans, housing, and insurance.",
   "Nothing you learned is wasted. Name what this road taught you, and carry it into the next one."
  ],
  "feel": "Maybe the major you picked at 18 doesn't fit who you are now. Maybe classes, money, health, family, or a hard year made it impossible to keep going. Maybe you left an apprenticeship or a program and wonder what people will think. You might feel relief and shame at the same time, or grief for the version of your life you pictured. You might worry about wasted time or money, or about disappointing people who believed in you. Some people feel lost; others feel more like themselves than they have in months. All of it makes sense. Changing course takes honesty, and that's a strength.",
  "self": {
   "first": [
    "Before you withdraw, drop, or switch, meet with an advisor, and ask the registrar and financial aid office what it means for your aid, loans, housing, and health insurance. Deadlines matter, so ask early.",
    "If health or a crisis is behind the change, ask about a medical or personal leave. Many schools and programs have one, and it can keep doors open.",
    "Write down what this road taught you: what you liked, what drained you, and what you're good at. That list points toward the next road."
   ],
   "helps": [
    "Separating the decision from the feeling. Big feelings are real; the choice still deserves a calm day and real information.",
    "A big choice map: your options, what matters most to you, and one small test for each.",
    "Talking with someone who changed course and came out well. Most people know more of them than they think.",
    "Telling the people who matter in your own words, on your own timing.",
    "Keeping a routine while you're between things: a wake time, movement, one plan with a person each week.",
    "Remembering that you can go back. Credits, skills, and experience often carry forward."
   ],
   "tell": [
    "“Changing my mind is how I find my way.”",
    "“This road taught me something real.”",
    "“A decision isn't a verdict on me.”"
   ],
   "people": "Try, with family: “I've decided to change my plan. I'd like to tell you why, and I'd like you to hear me out before we talk about what's next.” With an advisor: “I'm thinking about switching, or taking time off. What would that mean for my aid and my credits?” With a friend: “I'm leaving the program. I feel relieved and kind of embarrassed. Can I talk it through?”"
  },
  "helper": {
   "feel": "When a young adult changes plans, they're often bracing for disappointment, especially from the people who helped pay or believed in the first plan. Many have thought about it far longer than you know. Underneath, some feel shame, some feel relief, and many feel both. What they need first is to be heard, not managed.",
   "say": [
    "“Tell me what you're weighing. I want to understand.”",
    "“I'm on your side, whatever you decide.”",
    "“What have you learned about yourself from this?”",
    "“Is there something practical I can help you find out?”"
   ],
   "avoid": [
    "“After all we spent?” or any talk of wasted money in the first conversation.",
    "“You're just quitting.”",
    "Making the decision for them, or calling the school on their behalf.",
    "Treating a pause as the end of their education or their future."
   ],
   "help": [
    "Listen to the whole story before you share your view.",
    "Encourage them to check the details before they withdraw: an advisor, the registrar, and financial aid, about aid, loans, housing, and insurance.",
    "If health, mental health, or a crisis is behind the change, ask gently how they're doing, and encourage a doctor or counselor. If they talk about not wanting to live, call or text 988 together.",
    "Help them keep a routine while they're between things, and invite them to things that have nothing to do with the decision.",
    "Notice what they're learning and how they're growing, out loud."
   ],
   "you": "You may feel your own disappointment, worry about money, or fear for their future. Those are real; bring them to a friend, a partner, or your own support first. If they use Birch, their answers stay on their own device, and you see only what they choose to share. Your calm can help them make a clear decision."
  },
  "faith": "For some, faith speaks into a change of plans: a sense of being led, a calling that gets clearer by trying, or comfort that their worth doesn't rest on finishing one road. For others, meaning comes through values and the people they want to serve. If faith is part of your life, you might bring the decision there honestly, uncertainty and all. Either way, changing course can be part of finding what's truly yours to do.",
  "practices": [
   "trunk|Big Choice Map",
   "bark|Bounce Back From a Setback",
   "trunk|Values Sort",
   "trunk|Ask Someone About Their Path",
   "fruit|Your Own Timeline",
   "leaves|Steady Wake Time"
  ],
  "reach": [
   "Questions about federal financial aid or student loans when you change plans: Federal Student Aid Information Center, 1-800-433-3243, weekdays. Your school's financial aid office can help too.",
   "Feeling low, stuck, or anxious for two weeks or more: talk with a doctor or counselor. NAMI HelpLine, 1-800-950-6264, or text NAMI to 62640, weekdays, for information and support.",
   "Feeling hopeless, or thinking about not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Between things and need help with housing, food, or bills in Minnesota: dial 211, or call 1-800-543-7709.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Federal Student Aid",
    "https://studentaid.gov"
   ],
   [
    "National Student Clearinghouse: Some College, No Credential",
    "https://nscresearchcenter.org/some-college-no-credential/"
   ],
   [
    "Apprenticeship.gov: find an apprenticeship",
    "https://www.apprenticeship.gov"
   ]
  ]
 },
 {
  "id": "pressure-burnout",
  "ring": "br-school",
  "title": "Pressure, grades, and burnout",
  "keys": "pressure stress grades gpa perfectionism perfectionist burnout burned out burnt out exhausted tired all the time can't keep up overwhelmed too much on my plate working and going to school two jobs all nighter no sleep failing a class not good enough never enough imposter syndrome don't care anymore numb about school dread work procrastination afraid to fail comparing myself scholarship pressure family expectations",
  "parts": [
   "bark",
   "leaves",
   "trunk"
  ],
  "quick": [
   "Caring about your work is a strength. Pressure turns harmful when your worth rides on every grade, review, or paycheck.",
   "Perfectionism has risen among young people for decades. Feeling it is common, and it can loosen.",
   "Burnout, as it's described for work, has three signs: exhaustion, pulling away or growing cynical, and feeling you can't do anything well anymore. School strain can look much the same.",
   "Sleep, rest, and people are part of doing well, not a reward for it. Most adults your age need 7 to 9 hours of sleep."
  ],
  "feel": "Maybe you're carrying a full class load and a job, or two jobs, or school and a family. Maybe one grade or one comment from a boss can wreck your week. You might reread a paper ten times, or put it off because it can't be perfect yet. Some people run on caffeine and late nights until they hit a wall: exhausted, numb, snapping at people, unable to care about things that used to matter. You might be afraid of letting down a family that sacrificed for you, or of finding out you're not as capable as people think. Underneath, it can feel like you're only as good as your last score. That feeling is common, and it isn't the truth about you.",
  "self": {
   "first": [
    "Tonight, set a stopping time for school or work, and protect 7 to 9 hours for sleep.",
    "Write down everything on your plate. Mark what truly matters this week, what can be good enough, and one thing you can drop, delay, or ask for help with.",
    "When a grade or review stings, use three lines: what happened, what I can control, and one next step this week."
   ],
   "helps": [
    "Short work blocks with real breaks. Twenty-five focused minutes with the phone in another room often beats three distracted hours.",
    "Aiming for good and finished. Work handed in on time beats perfect work that never gets done.",
    "Talking to yourself the way you'd talk to a good friend in the same spot.",
    "Asking what “good” looks like: an example from the instructor, or clear expectations from a manager.",
    "One thing every week that isn't graded or paid: a game, music, time outside, a meal with people you like.",
    "If you're working long hours while in school, looking honestly at the load with an advisor or manager. Something may need to give, and you get to choose what.",
    "Telling one person the truth about how much pressure you feel."
   ],
   "tell": [
    "“I'm more than my GPA or my job title.”",
    "“Done is a skill too.”",
    "“A hard grade is information, not a verdict.”",
    "“Rest is part of the work.”"
   ],
   "people": "Try, with an instructor: “Can you show me what a strong answer looks like here?” With a manager: “I want to do this well. Which of these matters most this week?” With family: “I'm putting so much pressure on myself that I can't sleep. Can we talk about what really matters?” With a friend: “Want to study together, and then actually take a break?”"
  },
  "helper": {
   "feel": "A young adult under pressure may look impressive from the outside and feel close to empty inside. Many feel their worth rides on every score or review, dread disappointing people who sacrificed for them, and keep going long after they're exhausted. Burnout can look like laziness or not caring, when it's often the result of caring too hard for too long.",
   "say": [
    "“I'm proud of you whatever the grade or the review.”",
    "“Tell me about it. What happened?” (before any advice)",
    "“You look tired. What could you set down this week?”",
    "“What would you choose if no one else's expectations counted?”"
   ],
   "avoid": [
    "Asking about grades or work first, every time.",
    "“Just do your best,” while reacting strongly to anything less than top marks.",
    "Comparing them with siblings, friends, or what you did at their age.",
    "Treating all nighters and overtime as proof of dedication.",
    "“You're just lazy,” when what you're seeing may be exhaustion."
   ],
   "help": [
    "Name what you value in them that has nothing to do with school or work.",
    "Help them sort what truly matters this week from what can be good enough, if they'd like that.",
    "Protect rest when they're with you: a meal, a quiet evening, no questions about grades.",
    "If they're working to pay for school, talk honestly about the load, and whether any practical help is possible.",
    "If low mood, numbness, or exhaustion lasts two weeks or more, encourage a doctor or counselor. If they talk about not wanting to live, call or text 988 together."
   ],
   "you": "Look gently at your own expectations too, and ask whose goal this is. Warmth plus clear, reasonable expectations helps young adults do well. If they use Birch, their answers stay on their own device, and you see only what they choose to share. Your steady love on a bad-grade day teaches more than any lecture."
  },
  "faith": "Some people find that faith loosens the grip of perfectionism: the sense of being loved and worthy before achieving anything, or a rhythm of rest like a Sabbath. If faith is part of your life, you might bring the pressure there honestly, or take one hour a week to set the work down. If it isn't, the same truth stands: your worth isn't something you earn with grades or hours.",
  "practices": [
   "bark|Self-Compassion Break",
   "bark|Slow Exhale",
   "bark|Bounce Back From a Setback",
   "trunk|Study Sprints",
   "trunk|Weekly Reset",
   "leaves|Sleep"
  ],
  "reach": [
   "Stress, exhaustion, numbness, or low mood that lasts two weeks or more, or gets in the way of sleep, eating, or people: talk with a doctor, your campus counseling center, or a counselor. Many workplaces offer an employee assistance program too.",
   "For information and support: NAMI HelpLine, 1-800-950-6264, or text NAMI to 62640, weekdays.",
   "Feeling like you'll never be enough, or like there's no point: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Using alcohol, cannabis, or other drugs to get through the pressure: SAMHSA National Helpline, 1-800-662-4357, any time.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ],
   [
    "The Jed Foundation",
    "https://jedfoundation.org"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "first-job",
  "ring": "br-work",
  "title": "A first full-time job",
  "keys": "first job first full time job new job started a job just hired first real job onboarding training new boss manager coworkers benefits health insurance 401k retirement match pay stub paycheck taxes w-4 direct deposit sick time pto vacation schedule shift work night shift overtime hate my job imposter syndrome don't know what i'm doing exhausted after work no time no friends at work harassment at work boss yells unsafe job hurt at work quit too soon how long should i stay my kid started a job",
  "parts": [
   "trunk",
   "leaves",
   "branches"
  ],
  "quick": [
   "The first months of any job are a learning season. Feeling new, slow, or unsure is normal, and asking questions is part of doing it well.",
   "Look at the paperwork early: your first pay stub, your tax form, and any benefits. Benefits often have a short window to sign up after you start.",
   "Protect your sleep and one piece of life outside work. Adults 18 to 25 need about 7 to 9 hours of sleep.",
   "You have rights at work: correct pay, a safe workplace, and freedom from harassment. In Minnesota, most workers also earn sick and safe time."
  ],
  "feel": "A first full-time job can feel like a door opening. Your own money, a title, people who count on you. It can also feel like a lot at once. The days are long, the work is new, and nobody hands you a syllabus. Some people feel like everyone else knows what they're doing, and they're waiting to be found out. Some miss the friends and rhythm of school, or feel lonely in a new place. Some love the work and hate the schedule, or the reverse. Some took the job they could get, not the one they wanted, and wonder if they made a mistake. All of that is common in the first year, and most of it eases as you learn the work and the people.",
  "self": {
   "first": [
    "Ask your manager what a good first 90 days looks like, and write the answer down.",
    "Read your first pay stub: gross pay, what was taken out, and net pay. If something looks wrong, ask payroll or HR.",
    "Find out the deadline to sign up for benefits like health insurance or a retirement plan, and put it in your calendar.",
    "Pick one time each week that stays yours: rest, friends, faith, a sport, or something you make."
   ],
   "helps": [
    "Asking questions early. A question in week two is easier than a mistake in month six.",
    "Keeping a short wins file: things you learned, problems you solved, kind words from a customer or coworker. It helps on hard days and at review time.",
    "Learning one or two coworkers' names and stories. A work friend makes the hard days lighter.",
    "A steady wake time and a wind-down after late or night shifts, so sleep keeps up with the schedule.",
    "If your job offers a retirement match, learning how it works. A match is part of your pay.",
    "Giving a new job a fair season before deciding it's wrong, and leaving well if it truly is."
   ],
   "tell": [
    "“Everyone was new once. Asking is part of learning.”",
    "“I'm building skills that go with me to every job after this one.”",
    "“My life is bigger than my job.”"
   ],
   "people": "Try, with a manager: “Can we take ten minutes this week so I can check I'm on the right track?” Or with a friend: “The new job is good, but I'm wiped out. Can we do something easy this weekend?”"
  },
  "helper": {
   "feel": "They may be proud and exhausted in the same week. Many young adults feel they have to look like they know everything, and quietly worry they're behind. Some are stuck in a job that pays the bills and fits nothing else, and feel judged for it. Some are working shifts that scramble sleep and friendships. If something at work feels wrong, like missing pay, unsafe tasks, or a boss or coworker crossing a line, they may not be sure it's okay to speak up. They're an adult now, and they want to be treated like one.",
   "say": [
    "“What's the best part of the job so far? What's the hardest?”",
    "“You don't have to have it figured out in the first month.”",
    "“Want to think through how to ask your manager about that?”",
    "“If anything at work ever feels wrong or unsafe, I'm here to talk it through.”"
   ],
   "avoid": [
    "“You're lucky to have a job. Just deal with it.”",
    "Calling or contacting their employer for them.",
    "Comparing their job or pay to a sibling's or a friend's.",
    "Pushing them to quit, or to stay, before you've listened."
   ],
   "help": [
    "Ask about the work and the people, not only the pay.",
    "Offer to look at a pay stub, a benefits form, or a retirement plan with them, if they want that.",
    "Help them practice a hard conversation: asking for training, a schedule change, or a raise.",
    "If they're hurt, harassed, unpaid, or asked to do something unsafe, help them find the right place to report it.",
    "Respect their choices about the job. Your support matters more than your opinion of it.",
    "If you're a Birch helper, you see only what they choose to share."
   ],
   "you": "Watching someone start their working life can bring back your own first job, and your own worries about theirs. Share what you learned if they ask, and trust that they're building their own way."
  },
  "faith": "Many people find meaning in good work and in a day of rest. If faith is part of your life, it may shape how you think about work, rest, and the people you serve on the job. Whether through faith or your own values, it's worth asking what kind of worker and person you want to be.",
  "practices": [
   "trunk|Start Strong at a New Job",
   "branches|Work Friend",
   "trunk|Wins File",
   "leaves|Steady Wake Time",
   "leaves|Shift Worker's Rest Plan",
   "bark|Bounce Back From a Setback"
  ],
  "reach": [
   "Pay that's wrong or missing, unsafe tasks, or sick and safe time questions in Minnesota: Minnesota Department of Labor and Industry (dli.mn.gov).",
   "Harassment or unfair treatment at work: tell HR or a manager you trust, keep notes, and see the U.S. Equal Employment Opportunity Commission (eeoc.gov).",
   "Someone at work touches you or pressures you sexually: it's not your fault. RAINN: 1-800-656-4673, or text HOPE to 64673, any time. In Minnesota, Day One: 1-866-223-1111.",
   "Hurt at work: get medical help and tell your employer. Danger right now: call 911.",
   "Stress or low mood that won't lift: NAMI HelpLine, 1-800-950-6264 (weekdays). Thoughts of not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "Minnesota Department of Labor and Industry: earned sick and safe time",
    "https://www.dli.mn.gov/sick-leave"
   ],
   [
    "U.S. Equal Employment Opportunity Commission",
    "https://www.eeoc.gov"
   ],
   [
    "CareerOneStop",
    "https://www.careeronestop.org"
   ],
   [
    "CFPB: money tools for young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ]
  ]
 },
 {
  "id": "job-loss",
  "ring": "br-work",
  "title": "Losing a job, or not finding one",
  "keys": "lost my job fired let go laid off layoff hours cut quit job loss unemployed unemployment benefits can't find a job no one is hiring applied everywhere no callbacks rejected ghosted after interview job search no experience entry level needs experience graduated and no job living at home again behind my friends embarrassed out of work health insurance lost coverage resume interview networking temp work gig work my son lost his job my daughter can't find work",
  "parts": [
   "trunk",
   "fruit",
   "bark"
  ],
  "quick": [
   "Losing a job, or searching for months, hits money, routine, and how you see yourself all at once. Feeling shaken is normal.",
   "In Minnesota, apply for unemployment benefits the week you lose your job or your hours are cut. Waiting can cost you benefits.",
   "Research across hundreds of studies found that being out of work raises stress and low mood, and that finding work again brings it back down. This season is hard, and it is usually a season.",
   "Most jobs come through people. Tell a few people what you're looking for, and keep a simple daily rhythm."
  ],
  "feel": "Maybe you were let go with no warning. Maybe a layoff swept up your whole team, or your hours were cut until the job barely paid. Or maybe you've applied to dozens of jobs and heard nothing back, while every entry level posting asks for experience you can't get without a job. Any of these can bring shock, anger, embarrassment, and fear about money. It's easy to compare yourself with friends who seem settled, or to feel you let someone down. Some people stop answering texts. Some sleep late and lose the shape of the day. None of that means something is wrong with you. Losing a job, or not finding one yet, happens to capable people all the time, especially early on.",
  "self": {
   "first": [
    "If you lost a job in Minnesota, apply for unemployment benefits right away at uimn.org. If you're not sure you qualify, apply and let them decide.",
    "Make a bare bones budget for the next two months: rent, food, phone, transportation, and minimum payments.",
    "If you lost health insurance with the job, look at your options soon. Losing coverage opens a window to get a plan through MNsure or HealthCare.gov, and if you're under 26 you may be able to join a parent's plan.",
    "Tell three people what kind of work you're looking for."
   ],
   "helps": [
    "A daily rhythm: the same wake time, a set search block, and something that gets you outside.",
    "Treating the search like a project with small goals: a few strong applications a week, not a hundred rushed ones.",
    "Asking people for a short conversation about their work, not for a job. Doors often open from there.",
    "Open time used on purpose: a short course, a certificate, volunteering, or temp work that builds skills and references.",
    "CareerOneStop and your local workforce center for job listings, resume help, and training.",
    "Remembering that rejection in a job search is mostly about numbers and timing, not your worth."
   ],
   "tell": [
    "“I'm more than my job, and more than this search.”",
    "“This is a hard season, not a verdict on me.”",
    "“One good step today is enough.”"
   ],
   "people": "Try: “I'm between jobs right now and looking for work in this area. Do you know anyone I could talk to?” Or with family: “I need you to know I'm trying. What helps most is not asking every day how the search is going.”"
  },
  "helper": {
   "feel": "They may feel embarrassed, angry, or scared, and may avoid people who ask how the search is going. If they moved back home or need help with money, they may feel they've failed at being an adult. Months of rejection can wear down even very capable people, and a quiet job search can slide into low mood. Being out of work can be a heavy time, so notice how they're doing, not only what they're doing.",
   "say": [
    "“I'm sorry. That's a lot to handle at once.”",
    "“This happens to good people all the time. It says nothing about what you're worth.”",
    "“How can I help this week, if at all?”",
    "“Want company for anything, or just a break from talking about it?”"
   ],
   "avoid": [
    "“Everything happens for a reason.”",
    "Asking every day how many applications they sent.",
    "Comparing them with a sibling or friend who has a job.",
    "Taking over the search for them."
   ],
   "help": [
    "Offer one practical thing: a resume read, a practice interview, a ride, or an introduction to someone in a field they're curious about.",
    "Invite them to low-cost things that have nothing to do with work.",
    "If you're helping with money or a place to live, agree on clear, kind terms together so no one is guessing.",
    "Watch for signs of depression: sleeping all day, pulling away, or talk of being a burden. Ask directly how they're doing.",
    "If you're a Birch helper, you see only what they choose to share, and never their safety answers."
   ],
   "you": "It can be hard to watch someone you love struggle to get started or start over, and easy to worry out loud. Your steady belief in them, said plainly, is one of the most useful things you can give."
  },
  "faith": "Many traditions teach that a person's worth isn't measured by a paycheck or a title. If faith is part of your life, your community may offer practical help, connections, or simply people who will sit with you. In Plain terms: what you value and who you are stay with you between jobs.",
  "practices": [
   "fruit|Tiny Next Step",
   "leaves|Steady Wake Time",
   "trunk|Ask Someone About Their Path",
   "branches|Make One Plan",
   "bark|Bounce Back From a Setback",
   "bark|Money Check-in"
  ],
  "reach": [
   "Unemployment benefits in Minnesota: apply at uimn.org the week you lose your job or your hours are cut.",
   "Job search, resume help, and training: CareerOneStop (careeronestop.org) or your local workforce center.",
   "Help with rent, food, bills, and other local help in Minnesota: dial 211, or call 1-800-543-7709; you can also text your ZIP code to 898-211.",
   "Low mood that won't lift: NAMI HelpLine, 1-800-950-6264 (weekdays). If it turns into hopelessness or thoughts of not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: call 911."
  ],
  "more": [
   [
    "Unemployment Insurance Minnesota",
    "https://www.uimn.org"
   ],
   [
    "CareerOneStop",
    "https://www.careeronestop.org"
   ],
   [
    "MNsure",
    "https://www.mnsure.org"
   ],
   [
    "HealthCare.gov",
    "https://www.healthcare.gov"
   ],
   [
    "Paul and Moser, unemployment and mental health (research)",
    "https://cris.fau.de/publications/117729304"
   ]
  ]
 },
 {
  "id": "career-change",
  "ring": "br-work",
  "title": "Changing careers early",
  "keys": "career change change careers wrong career wrong major hate my job not what i thought switch fields start over new direction quit to go back to school trade school career switch is it too late wasted my degree wasted time what should i do with my life burned out already second career try something new job hopping parents disappointed calling vocation bootcamp certificate apprenticeship",
  "parts": [
   "trunk",
   "fruit",
   "bark"
  ],
  "quick": [
   "Changing direction in your twenties is common. People born in the early 1980s held an average of 5 jobs from 18 to 23, and 9 by 36.",
   "Nothing you learned is wasted. Skills, people, and knowing what you don't want all count.",
   "Test before you leap: talk with people who do the work, try a project, take one class, or shadow someone.",
   "Plan a money bridge, so the change has room to work."
  ],
  "feel": "Maybe you studied one thing and found out you don't like the work. Maybe the job you worked hard to get leaves you empty, or the field you pictured looks nothing like the real thing. Maybe something new keeps pulling at you. Changing course can bring excitement and relief, and also fear: of wasting time or money, of starting over while friends move ahead, of letting down the people who helped you get here. Some people feel they should have known sooner. Most people didn't. The early twenties are made for trying things, and finding out what fits often means finding out what doesn't.",
  "self": {
   "first": [
    "Write down what you want to keep from your current path, and what you want to leave behind.",
    "Name three things you want your next work to have: a kind of task, a kind of team, a kind of difference you make.",
    "Talk with three people who do the work you're curious about. Ask what a normal week looks like, and what they wish they'd known.",
    "Before you quit or enroll, make a money bridge: what you need each month, how long your savings or income can cover it, and what you'll cut."
   ],
   "helps": [
    "Small tests before big moves: a weekend class, a volunteer shift, a side project, a day shadowing someone.",
    "Counting what carries over. Customer service, writing, showing up, solving problems, and leading a team go with you.",
    "Looking at many routes in: apprenticeships, certificates, community college, on the job training, or a lateral move inside your company.",
    "Talking costs through before you take on new school debt, including what the field really pays.",
    "Giving yourself a season of being new again, and expecting it to feel awkward at first."
   ],
   "tell": [
    "“I'm allowed to grow and change direction.”",
    "“Nothing I've learned is wasted.”",
    "“I can try this one step at a time.”"
   ],
   "people": "Try: “I'm thinking about a move into your kind of work. Could I ask you a few questions about it?” Or at home: “I know this is a change from the plan. I'd like to tell you why, and what I've figured out so far.”"
  },
  "helper": {
   "feel": "They may feel excited and scared at once, and worried about disappointing you, especially if you helped pay for school or cheered on the first path. Some feel ashamed of “wasting” time or money. Some have been unhappy for a while and only now feel able to say so. They usually need a thinking partner more than a verdict, and they're the one who will live with the choice.",
   "say": [
    "“Tell me what's pulling you toward this.”",
    "“What would a small first step look like?”",
    "“Nothing you've learned is wasted.”",
    "“I'm on your side, whatever you decide.”"
   ],
   "avoid": [
    "Listing everything that could go wrong before you've listened.",
    "“After everything we spent on school?”",
    "Deciding for them, or making your support depend on the choice.",
    "Treating a change as quitting."
   ],
   "help": [
    "Ask good questions: what they want to keep, what they want to leave, and what they've learned about themselves.",
    "Introduce them to someone in a field they're curious about.",
    "Help them think through a money bridge, if they want that.",
    "Celebrate the small tests, not only the big decision.",
    "If you're a Birch helper, you see only what they choose to share."
   ],
   "you": "It's natural to have hopes for someone's path. Holding those hopes loosely, and trusting them to find their own work, is one of the strongest ways to back them up."
  },
  "faith": "Many traditions speak of calling or vocation, and of discernment: listening over time for what fits. If faith is part of your life, it may help to bring this question to prayer, quiet, or a trusted guide in your community. In Plain terms: noticing what gives you energy and what drains it is a good way to listen.",
  "practices": [
   "trunk|Values Sort",
   "trunk|Big Choice Map",
   "trunk|Ask Someone About Their Path",
   "trunk|Name Your Gifts",
   "fruit|Best Possible Self",
   "bark|Money Check-in"
  ],
  "reach": [
   "Career exploration, training, and apprenticeships: CareerOneStop (careeronestop.org) or your local workforce center.",
   "Questions about federal student aid before going back to school: Federal Student Aid Information Center, 1-800-433-3243 (weekdays), or studentaid.gov.",
   "Stress or low mood that won't lift: NAMI HelpLine, 1-800-950-6264 (weekdays). Thoughts of not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "CareerOneStop",
    "https://www.careeronestop.org"
   ],
   [
    "Apprenticeship.gov",
    "https://www.apprenticeship.gov"
   ],
   [
    "Federal Student Aid",
    "https://studentaid.gov"
   ],
   [
    "U.S. Bureau of Labor Statistics, jobs held from age 18 (2024)",
    "https://www.bls.gov/news.release/archives/nlsyth_04022024.pdf"
   ]
  ]
 },
 {
  "id": "money-basics",
  "ring": "br-work",
  "title": "Money basics: paychecks, budgets, and credit",
  "keys": "money budget budgeting paycheck pay stub taxes withholding w-4 why is my check so small bank account checking savings overdraft fees credit card credit score credit report build credit first credit card interest apr minimum payment buy now pay later afterpay klarna emergency fund saving rent bills splitting bills venmo cash app broke living paycheck to paycheck money stress can't afford spending too much scam fake check identity theft my kid is bad with money",
  "parts": [
   "trunk",
   "bark",
   "fruit"
  ],
  "quick": [
   "Money is a set of skills, and skills are learned. Nobody starts out knowing how.",
   "A simple budget has three parts: what you must pay, what you're saving for, and what's left to spend. Writing it down is most of the work.",
   "A small cushion matters. In a 2024 national survey, 63 percent of adults said they could cover a $400 emergency with cash or its equivalent. Even a little set aside each payday moves you toward that.",
   "Credit is built by paying on time and keeping balances low. You can check your credit reports at AnnualCreditReport.com, the official site."
  ],
  "feel": "Having your own money can feel like freedom, and like pressure. Rent is due, the paycheck is smaller than you expected, and somehow the account is low again before the next one. Some people feel behind friends who seem to have more. Some send money home, or carry bills nobody else knows about. Some opened a credit card or a buy now pay later plan and now feel stuck. Some grew up with money stress, or never talked about money at all, and feel embarrassed not to know the basics. Money can bring up pride, worry, and shame all in one week. You're not bad with money. You're learning it, the way everyone does.",
  "self": {
   "first": [
    "Look at your last pay stub: gross pay, what was taken out, and net pay. Check that your hours and rate are right.",
    "Write down what comes in each month and what must go out: rent, phone, transportation, food, minimum payments.",
    "Set up a small automatic transfer to savings on payday, even a few dollars, and let it grow into a starter cushion.",
    "Check your credit reports at AnnualCreditReport.com, and look for anything you don't recognize."
   ],
   "helps": [
    "A ten-minute money check-in once a week: look at the account, one bill, and one goal.",
    "Paying every bill on time. Autopay for at least the minimum helps you never miss one.",
    "Using a credit card like a debit card: only what you can pay off in full each month.",
    "Comparing bank and credit union fees, and turning off overdraft coverage if it keeps costing you.",
    "Waiting a day before any big purchase or new payment plan.",
    "Talking money through with someone you trust, even when it feels awkward."
   ],
   "tell": [
    "“Money is a skill I'm learning.”",
    "“My worth isn't my balance.”",
    "“Small amounts, on time, add up.”"
   ],
   "people": "Try, with a roommate: “Can we set a day each month to settle up on bills?” Or with someone you trust: “Can you show me how you plan your money each month? I'm trying to get a system.”"
  },
  "helper": {
   "feel": "They may feel proud of earning and embarrassed about what they don't know. Many young adults quietly carry bills, debt, or money they send to family, and feel behind friends who seem settled. If they've overdrawn, missed a payment, or been scammed, shame can keep them quiet. They're an adult managing their own money now, and they want to be treated that way.",
   "say": [
    "“Money confused me at first too. Want to compare notes?”",
    "“What are you working toward right now?”",
    "“Here's a money mistake I made at your age, and what I learned.”",
    "“If you ever get in a bind or caught in a scam, you can tell me. No lecture.”"
   ],
   "avoid": [
    "Lecturing about one purchase.",
    "Asking to see their accounts, or checking up without being asked.",
    "Giving or lending money with unclear terms. Agree on them out loud.",
    "Talking about your own money worries in a way that puts them on their shoulders."
   ],
   "help": [
    "Offer one skill at a time, when they want it: reading a lease, comparing bank fees, how interest works, spotting a scam.",
    "Share how you plan money, mistakes included.",
    "If they share a phone plan, insurance, or an account with you, talk about how to separate them when they're ready.",
    "If they're scammed, help them stop paying, save the messages, report it at reportfraud.ftc.gov, and contact their bank.",
    "If you're a Birch helper, you see only what they choose to share."
   ],
   "you": "You don't need to be a money expert. Honest talk about your own learning teaches more than advice, and respecting their choices keeps the door open."
  },
  "faith": "Many faith traditions and families teach generosity, gratitude, and contentment, and some practice giving a set share of what comes in. Whatever your values are, they can shape how you earn, save, spend, and give.",
  "practices": [
   "bark|Money Check-in",
   "fruit|Starter Cushion",
   "trunk|Life Skill of the Month",
   "trunk|Values Sort",
   "leaves|Cook on a Budget",
   "fruit|Be Generous"
  ],
  "reach": [
   "Scams, fake checks, or identity theft: report at reportfraud.ftc.gov, or identitytheft.gov for identity theft, and call your bank right away.",
   "Credit reports: AnnualCreditReport.com, the official site for all three credit bureaus.",
   "Help with rent, food, utilities, and other local help in Minnesota: dial 211, or call 1-800-543-7709; you can also text your ZIP code to 898-211.",
   "Betting or gambling to make money back: Minnesota Problem Gambling Helpline, 1-800-333-4673, or text HOPE to 53342; National Problem Gambling Helpline, 1-800-MY-RESET (1-800-697-3738). Both any time.",
   "Money stress that turns hopeless: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "CFPB: money tools for young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ],
   [
    "AnnualCreditReport.com",
    "https://www.annualcreditreport.com"
   ],
   [
    "Federal Trade Commission: report fraud",
    "https://reportfraud.ftc.gov"
   ],
   [
    "Federal Reserve, Economic Well-Being of U.S. Households in 2024",
    "https://www.federalreserve.gov/publications/2025-economic-well-being-of-us-households-in-2024-executive-summary.htm"
   ]
  ]
 },
 {
  "id": "moving-out",
  "ring": "br-home",
  "title": "Moving out for the first time",
  "keys": "moving out first apartment leaving home first place on my own living alone dorm leaving my parents house independence homesick miss home lonely after moving out can't afford it cooking for myself first time paying rent adulting scared to move out excited to move out parents upset I moved out moving out of a hard home moving in with a partner moving in with friends",
  "parts": [
   "roots",
   "branches",
   "leaves"
  ],
  "quick": [
   "Moving out is a big change, even when you've wanted it for years. Excited and homesick in the same week is normal.",
   "There's no right age or right way. More than half of 18 to 24 year olds still live with a parent, and many people move out, back, and out again.",
   "The first months are full of small skills: groceries, bills, laundry, quiet nights. Each one gets easier with practice.",
   "Keep your people close on purpose. A move is a common time for loneliness to sneak in."
  ],
  "feel": "Maybe you've counted down to this day for a long time. Maybe it came fast, because of school, a job, a partner, or a home that wasn't working. The first night can feel like freedom and like the quietest room in the world at once. You get to choose when you eat, sleep, and come home, and then you realize no one else is buying the toilet paper. Some people feel proud and a little lost. Some miss family more than they expected, or feel guilty for leaving someone behind. If home was hard, moving out can bring relief and grief together. All of it makes sense. You're building a life that's yours.",
  "self": {
   "first": [
    "Make your first night easy: sheets on the bed, a towel, a phone charger, something simple to eat, and toilet paper.",
    "Write down your new basics in one note on your phone: your address, rent due date, who to call for repairs, and where the nearest grocery store, pharmacy, and urgent care are.",
    "Set one small routine in the first week, like a set wake time, a Sunday grocery run, or a walk after work.",
    "Plan one call or visit with someone you'll miss, and one way to meet someone new."
   ],
   "helps": [
    "A simple money plan for the month: rent, bills, food, getting around, and a small cushion for surprises.",
    "Learning a few cheap, filling meals you can make without a recipe.",
    "Making the place yours: one thing on the wall, a plant, a corner that feels calm.",
    "Keeping sleep, meals, and movement steady while everything else is new.",
    "Staying in touch with family on your terms: a regular call, a topic you choose, a visit you plan.",
    "Saying yes to small invitations, and joining one group you go to more than once.",
    "Being patient with yourself. Feeling unsettled in month one says nothing about month six."
   ],
   "tell": [
    "“I'm allowed to be excited and homesick at the same time.”",
    "“Every adult learned this one skill at a time.”",
    "“Moving out is a step, and steps can be adjusted.”"
   ],
   "people": "Try, to family: “I'd like a call on Sundays. Can we make that our time?” To a friend nearby: “I just moved in. Want to come see the place and grab food?” To someone who has done this: “What do you wish you'd known your first month on your own?”"
  },
  "helper": {
   "feel": "They may feel proud, nervous, and homesick in the same week, and they may not tell you about the hard parts because they want to show they can do this. If they left a hard home, they may feel relief and guilt together. They are an adult making their own choices, and they still benefit from people who stay close without taking over.",
   "say": [
    "“I'm proud of you for doing this.”",
    "“Call me any time, about anything, even a weird bill or a broken faucet.”",
    "“What would make your first week easier?”",
    "“Want a standing call? You pick the day.”"
   ],
   "avoid": [
    "“You'll be back home in a month.”",
    "Showing up unannounced, or checking on them more than they want.",
    "Fixing every problem for them, or paying every bill without a conversation about what's fair and what's next.",
    "Taking their excitement as a rejection of you."
   ],
   "help": [
    "Offer practical help they can say yes or no to: a ride on moving day, a starter box of kitchen basics, a first grocery run.",
    "Teach one skill when they ask: reading a lease, setting up a bill, cooking a few meals, a basic repair.",
    "Agree on how you'll stay in touch, and let them set the pace.",
    "If you help with money, be clear about what, for how long, and any expectations, so no one is guessing.",
    "If they use Birch and turn you on as a helper, you'll see only what they choose to share. Their answers stay on their own device."
   ],
   "you": "Watching someone you love move out can bring pride and an empty space at the same time. Let yourself feel both, and fill some of that space with your own people and plans. Your steady support from a little farther away is one of the best gifts you can give."
  },
  "faith": "For some people, a faith community is one of the first places that feels like home in a new place, with people who notice when you're there. For others, moving out is the first time faith is fully their own choice, which can bring questions, freedom, or both. If faith is part of your life, it can steady you through a big change. If it isn't, any community built around what you care about can do the same.",
  "practices": [
   "roots|What Holds Me Up",
   "leaves|Cook on a Budget",
   "fruit|Starter Cushion",
   "branches|Call Home",
   "branches|Join and Go Three Times",
   "leaves|Health Basics"
  ],
  "reach": [
   "Homesickness, loneliness, or a low mood that hasn't lifted after a couple of months, or that keeps you from sleep, work, or school: talk with a doctor, a counselor, or campus counseling if you're a student.",
   "Thoughts of not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Someone you live with is hurting or controlling you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. National Domestic Violence Hotline, 1-800-799-7233. In Minnesota, Day One, 1-866-223-1111.",
   "Short on rent, food, or bills in Minnesota: dial 211, or text your ZIP code to 898-211, any time.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "CFPB Money as You Grow: teenagers and young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ],
   [
    "211, United Way",
    "https://www.211unitedway.org"
   ],
   [
    "Minnesota Attorney General: Landlords and Tenants, Rights and Responsibilities",
    "https://ag.state.mn.us/Brochures/pubLandlordTenants.pdf"
   ]
  ]
 },
 {
  "id": "roommates",
  "ring": "br-home",
  "title": "Roommates",
  "keys": "roommate roommates roomie dorm roommate college roommate random roommate living with friends roommate problems messy roommate dishes cleaning chores guests boyfriend girlfriend partner always over noise loud music quiet hours splitting rent splitting bills roommate won't pay venmo roommate agreement roommate contract passive aggressive conflict fight with roommate moving out from roommate roommate stealing food roommate drinking roommate scary unsafe roommate feel like a stranger in my own home",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Most roommate trouble starts small: dishes, noise, guests, money. Talking early, before it builds, is the best way to keep the peace.",
   "A short roommate agreement in the first week, even an informal one, saves a lot of tension later.",
   "Good roommates don't have to be best friends. Respect, fairness, and clear expectations are enough.",
   "If a roommate makes you feel unsafe, that's different from a disagreement. Your safety comes first, and help is available any time."
  ],
  "feel": "Sharing a home with someone can be one of the best parts of these years, or one of the hardest. Maybe you moved in with a close friend and it's straining the friendship. Maybe a stranger was assigned to you and you don't have much in common. Maybe the dishes pile up, a partner is always over, the music goes late, or someone is always short on their half of the bills. It's easy to let things go, then feel resentful, then say something sharp. Some people feel like a guest in their own home. Some dread walking through the door. Wanting a calm place to come home to is reasonable.",
  "self": {
   "first": [
    "Talk about the basics early, ideally in the first week: cleaning, guests and overnight visitors, quiet hours, shared food, and how bills get split and paid.",
    "Write down what you agree on, even as a shared note, and set a date to check in on how it's going.",
    "When something bothers you, bring it up soon and in private, about one thing at a time.",
    "Keep money clear: who pays what, when, and how, with records you can both see."
   ],
   "helps": [
    "Starting with “can we figure out” instead of “you always”.",
    "Picking a calm time to talk, not right after the thing happened, and not over text when you're upset.",
    "Listening for what matters to them. A clean kitchen may mean respect to one person and control to another.",
    "Being willing to bend on small things so you can hold firm on what matters most to you.",
    "A short monthly check-in: what's working, what isn't, anything coming up.",
    "Having a few places outside your room where you can feel at ease: a library, a park, a friend's place.",
    "If you live in campus housing, your resident advisor or housing office can help mediate."
   ],
   "tell": [
    "“I can ask for what I need and still be a good roommate.”",
    "“A hard conversation now is easier than a hard month later.”",
    "“It's okay not to be best friends.”"
   ],
   "people": "Try: “Can we figure out a plan for the dishes that works for both of us?” Or: “I need quiet after eleven on weeknights for work. What do you need from me?” Or, about money: “Can we set up a way to split bills so neither of us has to chase the other?”"
  },
  "helper": {
   "feel": "They may feel stuck in their own home, embarrassed that a friendship is souring, or worried about money if a roommate doesn't pay. They may call you to vent and not want advice. They are an adult handling an adult relationship, and they'll do better with someone who listens first and helps them think, not someone who steps in.",
   "say": [
    "“That sounds frustrating. What do you want to happen?”",
    "“Do you want ideas, or do you just need to vent?”",
    "“What would you say to them if you knew it would go okay?”",
    "“Do you feel safe there?”"
   ],
   "avoid": [
    "Calling the roommate, or their parents, yourself.",
    "“Just move out” as the first answer, when leases and money make that hard.",
    "Taking sides so strongly they feel they can't make peace later.",
    "Brushing off a story that sounds like fear, not just annoyance."
   ],
   "help": [
    "Listen first. Ask what they want before you offer ideas.",
    "Help them practice a calm first sentence for the conversation.",
    "If money is the problem, help them look at the lease and a written plan for splitting bills.",
    "If they're in campus housing, remind them that a resident advisor or housing office can mediate.",
    "If something sounds unsafe, take it seriously: help them make a plan to stay somewhere else, and share the help lines."
   ],
   "you": "It can be hard to hear someone you love is miserable at home and not fix it. Trust that listening well is real help. Most roommate problems get better with one honest conversation, and you can help them get ready for it."
  },
  "faith": "Many faith traditions teach patience, forgiveness, and treating others as you'd want to be treated, along with honesty about what's wrong. If faith is part of your life, it may help you stay kind and still speak up. If it isn't, your own values can guide how you share a home well.",
  "practices": [
   "branches|Roommate Talk",
   "branches|Active Listening",
   "branches|Friendship Repair",
   "bark|Slow Exhale",
   "bark|Name It",
   "branches|Respect Check"
  ],
  "reach": [
   "A roommate threatens you, hurts you, controls you, or makes you afraid to go home: call 911 if you're in danger right now. In Minnesota, Day One, 1-866-223-1111, or text 612-399-9995, any time. National Domestic Violence Hotline, 1-800-799-7233.",
   "A roommate you're dating is hurting or controlling you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522, any time.",
   "A roommate seems really low, or talks about not wanting to be alive: call or text 988 with them, any time. The guide When a Friend Is Thinking About Suicide has more.",
   "Stress at home that keeps you from sleep, work, or school: talk with a counselor, campus counseling, or a doctor.",
   "In campus housing: your resident advisor, hall director, or housing office."
  ],
  "more": [
   [
    "Love Is Respect: healthy relationships",
    "https://www.loveisrespect.org"
   ],
   [
    "Minnesota Attorney General: Landlords and Tenants, Rights and Responsibilities",
    "https://ag.state.mn.us/Brochures/pubLandlordTenants.pdf"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ]
  ]
 },
 {
  "id": "first-apartment",
  "ring": "br-home",
  "title": "A first apartment: leases, bills, and repairs",
  "keys": "first apartment lease signing a lease rental application security deposit deposit back rent due late fee landlord property manager repairs maintenance request broken heat no hot water mold bugs pests renters insurance utilities electric bill internet setup move in checklist move out cleaning breaking a lease co-signer guarantor credit check rental scam fake listing apartment hunting can't afford rent eviction notice tenant rights home line",
  "parts": [
   "trunk",
   "bark",
   "fruit"
  ],
  "quick": [
   "A lease is a contract. Read the whole thing before you sign, ask about anything unclear, and keep a copy.",
   "Photos on move-in day, and repair requests in writing, protect you and your deposit.",
   "Rent is only part of the cost. Plan for utilities, internet, renters insurance, and a cushion for surprises.",
   "Never send money for a place you haven't seen or a lease you haven't signed. Scammers copy real listings."
  ],
  "feel": "Getting your first apartment can feel like a real milestone: your name on the lease, your key, your place. It can also feel like walking into a room full of words no one explained: deposits, application fees, co-signers, utilities, late fees. Maybe you're worried about whether you can afford it, or whether you'll get approved without much credit. Maybe the heat broke and you don't know whether to call, text, or just wait. Maybe you're scared to ask the landlord for anything. Almost everyone feels unsure the first time. These are skills, and you can learn them.",
  "self": {
   "first": [
    "Before you sign: read the whole lease. Look for the rent, the due date, late fees, the deposit, how long the lease lasts, who handles which repairs, and the rules about guests, pets, and ending the lease early.",
    "Before you pay anything: see the place in person, or have someone you trust see it, and confirm the landlord or company is real.",
    "On move-in day: take dated photos and video of every room, including anything already damaged, and send a copy to the landlord.",
    "Make one note with your rent due date, how you pay, who to call for repairs, the emergency maintenance number, and your lease end date."
   ],
   "helps": [
    "A monthly plan that includes rent, utilities, internet, renters insurance, food, getting around, and a cushion for surprises.",
    "Setting up rent and bills to pay on time, with reminders a few days before.",
    "Asking for repairs in writing, by email, text, or the landlord's portal, and keeping a copy. Call right away for emergencies like no heat in winter, a gas smell, or flooding.",
    "Renters insurance, which is often a small monthly cost and can cover your things after a fire, theft, or water damage. Ask your landlord whether it's required.",
    "Learning the rules where you live. In Minnesota, the Attorney General's tenant handbook explains rights and duties for renters and landlords.",
    "Planning your move-out early: give notice the way your lease says, clean well, take photos again, and leave a forwarding address for your deposit."
   ],
   "tell": [
    "“Asking questions is part of signing smart.”",
    "“I can learn this one bill at a time.”",
    "“Asking for a repair is a normal part of renting.”"
   ],
   "people": "Try, to a landlord: “Can you walk me through what's included in the rent and who handles repairs?” In writing: “The bathroom sink has been leaking since Monday. Can you let me know when someone can fix it?” To someone who has rented: “Would you read this lease with me before I sign?”"
  },
  "helper": {
   "feel": "They may feel proud and overwhelmed at the same time. Many young adults sign a first lease without anyone explaining it, and they may not want to admit what they don't know. A surprise bill, a repair that isn't happening, or a deposit that doesn't come back can feel like a personal failure instead of a normal problem with a normal fix.",
   "say": [
    "“Want a second pair of eyes on the lease before you sign?”",
    "“Rent is just one piece. Want to sketch out the rest of the monthly costs together?”",
    "“Did you get photos on move-in day? Let's do it now if not.”",
    "“If something breaks or a bill confuses you, call me, and we'll figure it out together.”"
   ],
   "avoid": [
    "Signing for them, or taking over the search.",
    "“You should have read the lease.” after something goes wrong.",
    "Co-signing without a clear talk about what it means for both of you.",
    "Telling them to stop paying rent or withhold it as a way to force repairs. That has rules and risks; a tenant hotline or legal aid can explain them."
   ],
   "help": [
    "Offer to read a lease with them, and point out the due date, fees, deposit, repairs, and how to end it early.",
    "Help them build a simple monthly plan that includes more than rent.",
    "Show them how to make a written repair request and keep records.",
    "Help them spot scams: never pay before seeing the place and signing a lease, and be careful of a price far below others nearby.",
    "If there's a real dispute, point them to the right helper: a tenant hotline, legal aid, or in Minnesota, the Attorney General's tenant handbook and HOME Line."
   ],
   "you": "You don't have to know housing law to help. Your experience, including your mistakes, is useful. Share it as information, and let them make the calls on their own place."
  },
  "faith": "For some people, a first home feels like something to be grateful for, or to bless in their own tradition's way. Whatever your values, they can shape how you treat your neighbors and your space. If faith is part of your life, it can be part of making this place home.",
  "practices": [
   "trunk|Life Skill of the Month",
   "bark|Money Check-in",
   "fruit|Starter Cushion",
   "trunk|Weekly Reset",
   "branches|Ask for Help",
   "bark|Before the Big Moment"
  ],
  "reach": [
   "A lease, deposit, or repair problem you can't solve with the landlord: in Minnesota, HOME Line answers renters' legal questions (homelinemn.org), and LawHelpMN lists legal aid (lawhelpmn.org). Elsewhere, look for your state's tenant hotline or legal aid.",
   "Short on rent, utilities, or food: in Minnesota, dial 211, or text your ZIP code to 898-211, any time.",
   "A rental listing that might be a scam: don't pay, and report it to the Federal Trade Commission at reportfraud.ftc.gov.",
   "A gas smell, fire, or danger right now: leave, and call 911.",
   "Money stress that turns into hopelessness or not wanting to be alive: call, text, or chat 988, any time."
  ],
  "more": [
   [
    "Minnesota Attorney General: Landlords and Tenants, Rights and Responsibilities",
    "https://ag.state.mn.us/Brochures/pubLandlordTenants.pdf"
   ],
   [
    "HOME Line: Minnesota tenant hotline",
    "https://homelinemn.org/hotline-services/"
   ],
   [
    "LawHelpMN: legal help for renters",
    "https://www.lawhelpmn.org/"
   ],
   [
    "Federal Trade Commission: rental listing scams",
    "https://consumer.ftc.gov/articles/rental-listing-scams"
   ],
   [
    "CFPB Money as You Grow: teenagers and young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ]
  ]
 },
 {
  "id": "moving-back",
  "ring": "br-home",
  "title": "Moving back home",
  "keys": "moving back home moved back in with my parents living with parents again boomerang back in my childhood bedroom after college lost my job couldn't afford rent saving money paying rent to parents house rules curfew as an adult treated like a kid embarrassed to live at home feel like a failure living at home after a breakup after a hard year mental health break parents fighting siblings privacy how long can I stay plan to move out again",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "quick": [
   "Moving back home is common. More than half of 18 to 24 year olds live with a parent, and many people move out and back more than once.",
   "It can be a smart move: to save, heal, change direction, or help family. It says nothing bad about you.",
   "Living together as adults works best with clear agreements about money, chores, guests, privacy, and how long.",
   "A plan for this season, even a loose one, helps it feel like a step forward."
  ],
  "feel": "Maybe you moved back to save money, after school ended, after a job fell through, after a breakup, or after a hard stretch with your health. Maybe you came home to help a parent. Your old room can feel comforting and strange at once. You might feel relief, gratitude, embarrassment, or like you're going backward, especially when friends post their new apartments. Old family patterns can show up fast: someone asks where you're going, or treats you like you're sixteen. You may slip into old roles too. All of this is common. You're an adult living with family, and that's a new relationship to build.",
  "self": {
   "first": [
    "Name your reason for being home, at least to yourself: saving, healing, a job search, school, family, or a mix.",
    "Have one honest talk early about the basics: money or rent, chores, guests, quiet hours, privacy, the car, and roughly how long.",
    "Set a loose plan: what you're working toward, and how you'll know it's time for the next step.",
    "Keep your own rhythm: work or a search, movement, sleep, and time with friends outside the house."
   ],
   "helps": [
    "Contributing in a way that fits your situation: rent, groceries, chores, rides, cooking dinner, or helping a younger sibling.",
    "Talking about expectations as adults, before they turn into arguments.",
    "Having places of your own: a gym, a library, a job, a friend's house, a trail.",
    "Saving on purpose, with a goal and an amount, if saving is part of why you're home.",
    "Noticing old roles and choosing new ones. You can be kind and still be an adult here.",
    "Comparing yourself to your own past, not to someone else's highlight reel."
   ],
   "tell": [
    "“This is a season, not a verdict.”",
    "“Lots of adults live with family. I'm using this time well.”",
    "“I can be grateful and still want my own space.”"
   ],
   "people": "Try, to a parent: “Can we sit down and agree on how this works for both of us, money, chores, and how long?” Or: “I know it's your house. I'd like to be treated as an adult here, and I'll act like one.” To a friend: “I'm living at home for a bit to save. Want to come over, or get out somewhere?”"
  },
  "helper": {
   "feel": "They may feel relieved to be home and embarrassed about it at the same time, especially if a job, school, health, or a relationship didn't go as planned. They may worry you see them as a failure. Small things, like being asked where they're going, can feel like being treated as a child. They are an adult, and this works best as two adults sharing a home.",
   "say": [
    "“We're glad you're here.”",
    "“Let's figure out how this works for all of us.”",
    "“What are you hoping this time at home gives you?”",
    "“You don't owe me a schedule. A heads-up if you'll be late is enough.”"
   ],
   "avoid": [
    "“When are you going to get your life together?”",
    "House rules from high school, unchanged, without a conversation.",
    "Comparing them to a sibling, a cousin, or a friend's kid.",
    "Never talking about money, chores, or a timeline, and letting resentment build."
   ],
   "help": [
    "Sit down early and agree on the basics together: money, chores, guests, privacy, the car, quiet hours, and a rough timeline.",
    "Ask about their plan, and let it be theirs. Offer help with a résumé, a budget, or a ride if they want it.",
    "Treat contributions as real, whether that's rent, groceries, cooking, or helping with a sibling or a grandparent.",
    "Keep adult boundaries on both sides: knock, ask before planning their time, and expect the same respect back.",
    "If they came home after a hard stretch with mood, substances, or safety, help them connect with a doctor or counselor, and keep the help lines close."
   ],
   "you": "Having an adult child or relative move back can bring joy, stress, and old patterns all at once. Your space, money, and routines matter too. Say so kindly and clearly, and take care of your own energy."
  },
  "faith": "Many faith traditions honor both family and the step into adulthood, and some speak of returning home as a time of welcome and renewal. If faith is part of your family, it may offer shared ways to begin this chapter with grace. If it isn't, your family's own values can guide how you live together now.",
  "practices": [
   "trunk|Big Choice Map",
   "fruit|Your Own Timeline",
   "fruit|Starter Cushion",
   "fruit|Three Good Things",
   "branches|Make One Plan",
   "trunk|Groundwork Page"
  ],
  "reach": [
   "A low mood, anxiety, or substance use that came home with you, or that hasn't lifted: talk with a doctor or counselor. NAMI HelpLine, 1-800-950-6264, or text NAMI to 62640, weekdays. SAMHSA National Helpline, 1-800-662-4357, any time.",
   "Thoughts of not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Someone at home is hurting, threatening, or controlling you: in Minnesota, Day One, 1-866-223-1111, any time. National Domestic Violence Hotline, 1-800-799-7233.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "CFPB Money as You Grow: teenagers and young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ],
   [
    "CareerOneStop (US Department of Labor)",
    "https://www.careeronestop.org/"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ]
  ]
 },
 {
  "id": "friends",
  "ring": "br-people",
  "title": "Making friends after school",
  "keys": "making friends after school how to make friends as an adult no friends after graduation friends moved away new job no friends new city no friends lost touch with high school friends friend group fell apart everyone has their own life adult friendships hard to make friends awkward starting conversations how to ask someone to hang out work friends where to meet people clubs groups teams friend breakup drifting apart lonely weekends",
  "parts": [
   "branches",
   "fruit",
   "roots"
  ],
  "quick": [
   "School hands you friends by putting the same people in the same rooms every day. After school, friendship has to be made on purpose, and that is normal, not a sign something is wrong with you.",
   "Friendship grows from time together. One study estimated about 50 hours together to become casual friends and more than 200 hours to become close friends.",
   "Repeat beats new. Going back to the same group, class, team, crew, or place again and again is how strangers turn into friends.",
   "Someone has to make the plan. Most people are glad to be asked, and they are waiting for someone else to go first."
  ],
  "feel": "After school ends, the built-in friends can scatter fast. People move, start jobs on different schedules, join the military, have kids, or just get busy. The group chat goes quiet. You might be working long shifts with people you like but never see outside work, or living somewhere new where you know almost no one. Weekends can feel long, and scrolling past other people's plans can sting. You might wonder if everyone else figured this out and you missed it. You might feel awkward asking someone to hang out, as if it were a date, or worry about seeming needy. All of this is common in these years. Making friends as an adult takes more intention than it used to, and it is a skill you can grow.",
  "self": {
   "first": [
    "Pick one place to keep showing up: a class, a team, a gym, a faith community, a volunteer shift, a game night, a running club, a trade group.",
    "Go at least three times before you decide whether it fits. First visits are always the most awkward.",
    "Reach out to one person you already like a little: a coworker, a neighbor, a classmate, an old friend you lost touch with.",
    "Make one specific plan: a what and a when. “Want to grab tacos Thursday after work?” is easier to say yes to than “we should hang out sometime.”"
   ],
   "helps": [
    "Doing something side by side. Shared activities take the pressure off talking.",
    "Saying yes to small invitations, even when you're tired, at least some of the time.",
    "Turning a work or class friend into a friend outside of it: one coffee, one walk, one lunch somewhere else.",
    "Keeping old friendships alive with low-effort contact: a voice memo, a photo, a quick call on your commute.",
    "Being the one who follows up. A second plan matters more than a perfect first one.",
    "Being patient with the pace. Close friendship takes many hours, and that is time well spent, not time wasted."
   ],
   "tell": [
    "“Making friends now takes effort for almost everyone. It isn't just me.”",
    "“Asking someone to hang out is a gift, not a burden.”",
    "“One good friend is a real start.”",
    "“I can be the one who goes first.”"
   ],
   "people": "To a coworker or classmate: “A few of us are getting food after. Want to come?” To an old friend: “I miss you. Can we get a call on the calendar?” To someone new at a group: “I'm new here too. How long have you been coming?” If you'd like company on this, you can turn on a helper in Birch, like a roommate, friend, or family member. A helper sees only what you choose to share, and your answers stay on your device."
  },
  "helper": {
   "feel": "They may say they're fine, that they're just busy, or that they like being alone. Some do, and that's okay. Others feel embarrassed that they don't have many friends after school, especially when everyone online seems to have a crowd. They may worry that asking people to hang out looks desperate. They are an adult building a new social life, often in a new job, schedule, or place, and they may not want to be managed.",
   "say": [
    "“It's harder to make friends after school. That's true for most people.”",
    "“What's something you'd like to do more of? Maybe there's a group for it.”",
    "“I'm going to this Thursday. Want to come along?”",
    "“How's it going with the people at work?”"
   ],
   "avoid": [
    "“You just need to put yourself out there.” It skips the hard part.",
    "Setting up meetings or friendships for them without asking.",
    "Comparing them with a sibling, roommate, or someone with a big friend group.",
    "Treating time alone as a problem when they say it suits them."
   ],
   "help": [
    "Invite them into what you already do: a game night, a team, a volunteer shift, a faith community, a family dinner with friends.",
    "Introduce them to one person you think they'd click with, and let it grow from there.",
    "Offer a ride, a reminder, or company for the first visit to a new group.",
    "Keep your own contact steady: a regular call, a standing meal, a walk.",
    "If friendship talk comes with hopelessness, talk of being a burden, or pulling away from everyone, that's more than a social season. Encourage a doctor or counselor, and if they talk about not wanting to be alive, call or text 988 together."
   ],
   "you": "You can't make friends for them, and you don't need to. A standing invitation, a warm introduction, and your own steady contact are real help. Respect their pace and their choices; they're building their own life."
  },
  "faith": "If faith is part of your life, a faith community can be one of the easiest places to make friends after school: a young adult group, a serving team, a choir, a study group, or simply staying for coffee after a service. Going back week after week is exactly how friendship grows. If faith isn't part of your life, any group built around something you care about, like a cause, a craft, or a sport, offers the same kind of steady welcome.",
  "practices": [
   "branches|Join and Go Three Times",
   "branches|Make One Plan",
   "branches|Work Friend",
   "branches|One Reach-Out a Day",
   "branches|Shared Meal",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Loneliness that has turned into weeks of low mood, or feeling like there's no point: talk with a doctor or counselor. The NAMI HelpLine can help you find support: call 1-800-950-6264 or text NAMI to 62640, weekdays.",
   "In Minnesota, for help finding local groups, services, and more: dial 211, or call 1-800-543-7709.",
   "Thoughts of not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "US Surgeon General, Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ],
   [
    "How many hours does it take to make a friend? (University of Kansas)",
    "https://news.ku.edu/news/article/2018/03/06/study-reveals-number-hours-it-takes-make-friend"
   ],
   [
    "Making Caring Common, Loneliness in America 2024",
    "https://mcc.gse.harvard.edu/reports/loneliness-in-america-2024"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "loneliness",
  "ring": "br-people",
  "title": "Loneliness",
  "keys": "lonely loneliness alone isolated no one to call no friends feel invisible lonely in a crowd lonely even with people around lonely in my relationship lonely at college lonely after moving lonely at work remote work alone all day nobody texts me weekends alone holidays alone no one would notice disconnected empty scrolling alone at night feel like a burden",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Loneliness is most common in the young adult years. In one national survey, 61 percent of young adults reported serious loneliness, compared with 36 percent of all adults.",
   "Loneliness is a signal, like hunger or thirst: a need for connection, not a verdict on your worth.",
   "You can be lonely with people all around you. Loneliness is about feeling known, not only about having company.",
   "Small, repeated steps toward people help most: one message, one regular place, one plan."
  ],
  "feel": "Loneliness can sound like a quiet apartment after a long shift, a dorm full of people who all seem to know each other, or a group chat that never mentions you. It can show up in a relationship, at a family dinner, or in a city of millions. It can feel like boredom, restlessness, too much scrolling, staying up late, or a heavy tiredness. It often whispers that something is wrong with you, that people wouldn't want to hear from you, or that reaching out will only prove it. That whisper is loud, and it's usually wrong. These years bring more moves, new jobs, changing friend groups, and changing family roles than almost any other time, so many young adults feel this, even if few post about it.",
  "self": {
   "first": [
    "Name it to yourself: “I'm feeling lonely right now.” Naming it helps it settle.",
    "Do one kind thing for your body: a walk in daylight, a shower, real food, an earlier night.",
    "Send one small message to one person: a photo, a voice memo, a “thinking of you.”",
    "Put the scroll down for a while if it's making the ache worse. Other people's highlights feed loneliness."
   ],
   "helps": [
    "Reaching out a little every day. In a 2024 national survey, it was the step people most often said helps, lonely adults included.",
    "Showing up to the same place again and again: a class, a team, a gym, a shift, a group, a faith community.",
    "Helping others: a volunteer shift, tutoring, a food shelf, helping a neighbor. Giving connects without pressure.",
    "Calls and video with people far away, on a regular day you can count on.",
    "Being kind to yourself. Loneliness can make a slow reply feel like rejection, when it's usually just a busy day.",
    "Getting enough sleep and daylight. Everything, people included, feels harder when you're running on empty."
   ],
   "tell": [
    "“Lonely means I need connection. It doesn't mean I'm unlikable.”",
    "“Lots of people feel this way. They just don't post it.”",
    "“One small reach-out today is enough.”",
    "“I can be good company to myself while I build my people.”"
   ],
   "people": "To a friend or family member: “I've been feeling pretty isolated lately. Could we talk this week?” To someone you'd like to know better: “Want to grab coffee Saturday?” To a doctor or counselor: “I've been lonely for a while, and it's starting to weigh on my mood.” If your Birch check-in shows you've been feeling alone a lot, Birch offers ideas and help lines on your own screen. It sends no alert to anyone, and a helper sees only what you choose to share."
  },
  "helper": {
   "feel": "They may not use the word lonely. They may say they're tired, busy, or fine, or that they like being home. Many lonely young adults feel ashamed, as if being alone proves something about them, especially when everyone else seems to have a crowd. They may pull back from you too, not because they don't want you, but because reaching out feels hard. They are an adult, and they'll want to be treated as one.",
   "say": [
    "“I've missed you. Are you free Thursday?”",
    "“That sounds lonely. I'm really glad you told me.”",
    "“Lots of people feel this in these years. It doesn't mean something's wrong with you.”",
    "“Want company for that? I'm in.”"
   ],
   "avoid": [
    "“You should get out more.” It skips the hard part.",
    "One big burst of contact, then silence.",
    "Listing what they should change about themselves.",
    "Comparing them with someone who seems to have lots of friends."
   ],
   "help": [
    "Keep a regular rhythm: a weekly call, a standing meal, a walk on the same day.",
    "Invite them into your circles: a game night, a team, a volunteer shift, a faith community if that's part of their life.",
    "Listen to understand, not to fix. Say back what you heard.",
    "Notice the seasons that bring loneliness: a move, a new job, a breakup, a graduation, coming home from service, a new baby.",
    "Watch for loneliness that comes with hopelessness, talk of being a burden, or not wanting to be alive. That needs help now: call or text 988 together, or chat at 988lifeline.org."
   ],
   "you": "You can't be someone's only connection, and you don't have to be. Your steady contact is real connection, and helping them build more than one is the goal. Keep reaching out even when they're slow to answer."
  },
  "faith": "If faith is part of your life, a faith community can be a place to belong without having to earn it: a young adult group, a serving team, a small group, or simply showing up each week. Some people find comfort in prayer on a lonely night, or in feeling known and loved by God when no one else seems to notice. If a faith community feels far or has hurt you, a chaplain or a different congregation may be a better door. If faith isn't part of your life, a group built around a shared purpose can offer the same welcome.",
  "practices": [
   "branches|One Reach-Out a Day",
   "bark|Self-Compassion Break",
   "branches|Join and Go Three Times",
   "branches|Make One Plan",
   "trunk|Serve Someone",
   "leaves|Morning Daylight"
  ],
  "reach": [
   "Loneliness that has turned into weeks of low mood, or feeling like there's no point: talk with a doctor or counselor. The NAMI HelpLine can help you find support: call 1-800-950-6264 or text NAMI to 62640, weekdays.",
   "In Minnesota, for help finding local groups and services: dial 211, or call 1-800-543-7709.",
   "Feeling hopeless, like a burden, or thoughts of not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time. Veterans and service members: dial 988, then press 1. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "US Surgeon General, Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ],
   [
    "Making Caring Common, Loneliness in America",
    "https://mcc.gse.harvard.edu/reports/loneliness-in-america"
   ],
   [
    "Making Caring Common, Loneliness in America 2024",
    "https://mcc.gse.harvard.edu/reports/loneliness-in-america-2024"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "dating",
  "ring": "br-people",
  "title": "Dating and finding someone",
  "keys": "dating how to date dating apps swiping matches no matches ghosted ghosting first date nervous before a date talking stage situationship what are we define the relationship single everyone is in a relationship but me never been in a relationship will i ever find someone rejection getting rejected asked someone out how to ask someone out meeting someone from an app safely red flags green flags moving too fast pressure going slow what do i want in a partner dating with faith dating and my parents dont like who im dating",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Most people now date longer before settling down than people did a generation ago. Years of meeting people, trying, and starting over are a normal part of this stage.",
   "There is no deadline. Being single, dating a lot, or taking a break are all fine ways to spend these years.",
   "Knowing what you value helps you choose well: how you want to feel with someone, not only what they look like on a screen.",
   "Healthy dating feels safe, honest, and respectful, at your own pace. Love Is Respect helps people 13 to 26 with questions about any relationship, any time."
  ],
  "feel": "Dating can be exciting, hopeful, and fun. It can also be tiring and confusing. You might swipe for weeks with little to show for it, get ghosted after a great conversation, or end up in a “talking stage” that never turns into anything clear. You might be nervous before a first date, unsure how to ask someone out, or wondering why everyone else seems to pair up so easily. Some people feel pressure from friends, family, or their own timeline to find someone soon. Others feel pressure to move faster than they want to. And some have never dated at all and wonder if something is wrong with them. Nothing is. People find each other at every age, in every way, and at their own pace.",
  "self": {
   "first": [
    "Get clear on what matters to you: how you want to be treated, what you're looking for right now, and what you won't accept.",
    "Choose ways of meeting people that fit you: friends of friends, a class, a team, a group, a faith community, work events, or an app you feel good using.",
    "For a first meet with someone new: a public place, your own ride, and a friend who knows where you are.",
    "Decide your own pace ahead of time, so you're not deciding under pressure."
   ],
   "helps": [
    "Treating early dates as getting to know someone, not a test you pass or fail.",
    "Taking breaks from apps when they start to drain you. Your worth isn't your match count.",
    "Noticing how you feel around someone: relaxed and yourself, or anxious and on edge.",
    "Watching for green flags: they respect a no, keep their word, are kind to others, and are curious about your life.",
    "Watching for red flags: pushing past your no, checking your phone, rushing commitment, jealousy about friends, or put-downs called jokes.",
    "Keeping your own friends, routines, and goals while you date. A good partner adds to your life without shrinking it."
   ],
   "tell": [
    "“There's no deadline on finding someone.”",
    "“A no from someone else isn't a verdict on me.”",
    "“I get to go at my own pace.”",
    "“I'm looking for someone who's good to me, and good for me.”"
   ],
   "people": "To ask someone out: “I've really liked talking with you. Want to get coffee Saturday?” To slow things down: “I like you, and I want to take this slower.” To end it kindly: “I've enjoyed getting to know you, but I don't feel a match. I wish you well.” To a friend: “Can you be my check-in person for a first date Friday?” If something feels off in a relationship and you want to talk it through, Love Is Respect is there by call, text, or chat, any time."
  },
  "helper": {
   "feel": "They may be hopeful, discouraged, or tired of the whole thing. They may feel pressure, including from family, to find someone, or embarrassed if they never have. They may not want to talk about dating with you at all, and as an adult, that's their choice. If you have opinions about who they're seeing, they may already sense it.",
   "say": [
    "“How are you feeling about dating these days?”",
    "“There's no rush. Your timeline is yours.”",
    "“What do you like about them?”",
    "“If anything ever feels off, I'm here, no judgment.”"
   ],
   "avoid": [
    "“So when are you going to settle down?” or questions about marriage and kids at every visit.",
    "“You're too picky.” Knowing what you want is healthy.",
    "Criticizing someone they're seeing in a way that makes them stop telling you things.",
    "Setting them up without asking first."
   ],
   "help": [
    "Be curious, not judging. Ask what they like about the person and how they feel around them.",
    "Respect their choices and their privacy. They decide what to share.",
    "Offer to be a safety contact for a first date with someone new.",
    "Talk about healthy relationships in general terms, so signs of control are easier to spot: checking a phone, isolating from friends, threats, or pressure.",
    "Know that most people who are ever hurt by a partner are first hurt before 25. If you see signs of control or fear, stay close, and share Love Is Respect.",
    "Keep your own relationship with them steady, whatever happens in their dating life."
   ],
   "you": "Your part isn't to choose for them. It's to be someone they can talk to without being judged, so that if anything ever goes wrong, you're one of the first people they call."
  },
  "faith": "If faith is part of your life, it may shape what you're looking for in a partner, how you date, and what pace feels right. Some people find meeting someone through a faith community or a shared practice meaningful. Some feel tension between their family's expectations and their own choices, and talking with a trusted mentor or faith leader can help. If faith isn't part of your life, your own values can guide you in the same way.",
  "practices": [
   "trunk|Values Sort",
   "branches|Respect Check",
   "bark|Self-Compassion Break",
   "branches|Active Listening",
   "fruit|Something to Look Forward To",
   "bark|Name It"
  ],
  "reach": [
   "Questions about a relationship, or something that feels off: Love Is Respect, for people 13 to 26: call 1-866-331-9474, text LOVEIS to 22522, or chat at loveisrespect.org, any time.",
   "In Minnesota, Day One, for anyone being hurt by someone close to them: call 1-866-223-1111, or text 612-399-9995, any time.",
   "Anything sexual that was forced or pressured: RAINN, 1-800-656-4673, or text HOPE to 64673, any time.",
   "Someone sharing or threatening to share an intimate image of you: stopncii.org. If it was taken before you were 18, use takeitdown.ncmec.org.",
   "Feeling hopeless, or thoughts of not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/"
   ],
   [
    "Day One",
    "https://dayoneservices.org/domestic-violence/help-now/"
   ],
   [
    "RAINN",
    "https://rainn.org/help-and-healing/hotline/"
   ],
   [
    "StopNCII",
    "https://stopncii.org"
   ]
  ]
 },
 {
  "id": "breakup",
  "ring": "br-people",
  "title": "Breakups",
  "keys": "breakup break up broke up dumped got dumped heartbroken heartbreak ex my ex can't stop thinking about them miss my ex should i text my ex they're dating someone else we lived together moving out after a breakup shared lease shared apartment our pet our friends broken engagement called off the engagement i ended it guilt cheated on me situationship ended no closure block unfollow ex keeps texting ex threatening ex says they'll hurt themselves if i leave",
  "parts": [
   "bark",
   "branches",
   "fruit"
  ],
  "quick": [
   "A breakup is a real loss, whether you ended it or they did. Grief is the right word for it.",
   "In a study of unmarried adults 18 to 35, more than a third went through a breakup in under two years, and breakups brought more distress and less life satisfaction.",
   "If you lived together or planned to marry, it makes sense if it hits harder. There's more to untangle: a home, money, friends, and a future you pictured.",
   "Most heartbreak eases with time, people, and small daily steps. If it turns into weeks of heavy low mood, get help."
  ],
  "feel": "A breakup can knock the wind out of you. You might cry at random moments, lose your appetite, or lie awake replaying conversations. You might check their profile far too often, or feel sick when you see them with someone new. If you ended it, you might feel guilty, relieved, and sad all at once. If they ended it, you might feel rejected and confused. If you shared a lease, a pet, a car, or a friend group, the practical side can pile on: who moves, who keeps what, how to split the bills, what to tell people. And if it was a situationship with no clear label, you might feel you're not even allowed to grieve. You are. It mattered.",
  "self": {
   "first": [
    "Let yourself feel it. Cry, write, walk, listen to the sad songs. Feelings move through faster when you don't fight them.",
    "Take some space online: mute, unfollow, or archive the photos for now. You can decide later what to keep.",
    "If you lived together, make a short list of the practical steps: the lease, shared bills, belongings, a place to stay. Take them one at a time, and in writing where you can.",
    "Tell one friend or family member what happened, so you're not carrying it alone."
   ],
   "helps": [
    "Keeping the basics going: sleep, food, moving your body, daylight. Heartbreak hits harder on an empty tank.",
    "Leaning on friends and doing ordinary things together.",
    "Writing it out: what you miss, what you don't, what you learned about what you want.",
    "Pausing before you text them, especially late at night. Ask: will this help me heal, or keep the hurt open?",
    "Spending time on things that are yours: work, a goal, a team, music, a new skill.",
    "Being kind in how you talk about them. You'll be glad later, especially with shared friends."
   ],
   "tell": [
    "“This hurts because it mattered. That's okay.”",
    "“I can miss them and still know it's over.”",
    "“I was me before this relationship, and I'm still me.”",
    "“It won't always feel this heavy.”"
   ],
   "people": "To a friend: “I'm having a rough day about the breakup. Can we just hang out?” To family: “I don't need advice right now. I just need you to know it's been hard.” To your ex, if you need to: “I need some space for a while. Please don't contact me for now.” If an ex threatens to hurt themselves unless you come back, take it seriously: call or text 988 for them, and if they're in danger right now, call 911. It is not your job to stay."
  },
  "helper": {
   "feel": "They may be devastated, numb, angry, relieved, or embarrassed, and they may not want to talk about it. If they lived together or planned a future, they may also be facing a move, money stress, and a split friend group at the same time. Comments like “you'll find someone better” can make them feel unseen. They are an adult who gets to make their own choices, including whether to get back together.",
   "say": [
    "“I'm so sorry. That really hurts.”",
    "“Do you want to talk, or do you want company and no talking?”",
    "“It makes sense you're this sad. It mattered.”",
    "“Is there anything practical I can help with, like the move?”"
   ],
   "avoid": [
    "“I never liked them anyway.” They may still care, or get back together.",
    "“There are plenty of fish in the sea.” It rushes past the grief.",
    "Grilling them for details, or contacting the ex yourself.",
    "Telling them what they should do about the lease, the pet, or the friends, unless they ask."
   ],
   "help": [
    "Take the pain seriously. A breakup is a real loss at any age.",
    "Offer company without pressure: a meal, a drive, a walk, a show together.",
    "Offer practical help if they want it: a truck for the move, a spare room for a few nights, help sorting a lease.",
    "Watch for two weeks or more of low mood, pulling away from everyone, sleep or eating changes, or heavier drinking or use. If you see that, encourage a doctor or counselor.",
    "If the ex is harassing, threatening, or sharing pictures, or was controlling during the relationship, see the guide on controlling or abusive relationships.",
    "If they talk about not wanting to be alive, ask directly, stay with them, and call or text 988 together."
   ],
   "you": "Watching someone you love hurt is hard, and you can't speed it up. Your part is to take it seriously, keep them company, and help with the practical pieces when asked. Your steady presence is a reminder that love can be safe and lasting."
  },
  "faith": "If faith is part of your life, you might bring your heartbreak to God honestly, sadness and anger included. Some people find comfort in sacred music, a faith community, or a mentor who has been through heartbreak too. If a broken engagement brings judgment from a community, you still belong. If faith isn't part of your life, music, writing, and the people who love you can hold you through this in the same way.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Expressive Writing",
   "bark|Self-Compassion Break",
   "branches|Shared Meal",
   "leaves|Movement",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Low mood, numbness, or losing interest in things for two weeks or more: talk with a doctor or counselor. The NAMI HelpLine can help you find support: call 1-800-950-6264 or text NAMI to 62640, weekdays.",
   "An ex who is harassing, threatening, or stalking you: Love Is Respect, for people 13 to 26: call 1-866-331-9474 or text LOVEIS to 22522, any time. In Minnesota, Day One: 1-866-223-1111, or text 612-399-9995.",
   "An intimate image of you shared or threatened: stopncii.org. If it was taken before you were 18, use takeitdown.ncmec.org.",
   "Need a place to stay, or help with bills, in Minnesota: dial 211, or call 1-800-543-7709.",
   "Thoughts of not wanting to be alive, for you or your ex: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/"
   ],
   [
    "StopNCII",
    "https://stopncii.org"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Minnesota 211",
    "https://211unitedway.org/about-211"
   ]
  ]
 },
 {
  "id": "parents-adult",
  "ring": "br-family",
  "title": "You and your parents, as adults",
  "keys": "parents mom dad relationship with my parents adult child grown child parents treat me like a kid boundaries with parents parents too involved helicopter parents parents giving advice parents disagree with my choices money from parents financial help living at home moving out parents worry calling home how often to call parents guilt trip parents fighting different values politics religion parents divorce parents health insurance on parents plan becoming independent adult relationship with parents my son is an adult my daughter is an adult letting go",
  "parts": [
   "branches",
   "roots",
   "trunk"
  ],
  "quick": [
   "Becoming an adult doesn't end your relationship with your parents. It changes its shape, and the new shape gets built by both of you, one conversation at a time.",
   "Leaning on family for a while is normal. Only about 1 in 6 people 18 to 24 say they are completely financially independent from their parents, and most young adults say they are satisfied with their relationship with their parents.",
   "You get to make your own choices, and you can still welcome advice. Asking for help and deciding for yourself fit together.",
   "Clear, kind words about what you need work better than silence or a blowup. If a parent's words or actions hurt you or scare you, see Hard Family Ties and Estrangement, and reach out for support."
  ],
  "feel": "One day you're making your own choices about work, school, money, faith, and who you spend time with. The next, you're home for a weekend and somehow fifteen again. A parent texts five times a day, or hardly at all. They give advice you didn't ask for, worry out loud, or question a choice you've already made. Maybe you still need their help with rent, a phone bill, insurance, or a place to land, and that makes it harder to say what you want. Maybe you're the one checking on them now: a parent who is sick, struggling, or going through a divorce. You might feel grateful and frustrated in the same hour. You might miss being taken care of and also want to be treated like the adult you are. All of that is part of the shift, and it's common.",
  "self": {
   "first": [
    "Pick one area where you'd like more say: money, visits, how often you talk, a decision you've made. Start there, not with everything at once.",
    "Say what you need in one or two calm sentences, at a calm time. “I'd like to make this call myself, and I'd love to hear what you think first.”",
    "If you get help with money or housing, talk about the terms out loud: what it covers, for how long, and what's expected. Clear terms protect the relationship."
   ],
   "helps": [
    "Choosing how often you'll talk, and keeping it. A regular call can feel better to both of you than constant check-ins or long silences.",
    "Sharing pieces of your life on purpose: a win at work, a meal you learned to cook, a question you're thinking about. Parents often worry less when they know a little more.",
    "Asking for advice when you want it, and saying “thanks, I'll think about it” when you've heard enough.",
    "Letting some things go. Not every comment needs a response. Save your energy for the things that really matter to you.",
    "Spending time together as adults: a meal you cook, a walk, a project, a game. New memories help a new relationship grow.",
    "Talking with someone outside the family, a friend, a mentor, or a counselor, when it gets tangled."
   ],
   "tell": [
    "“I can love them and still make my own choices.”",
    "“Their worry is about love. My life is still mine to steer.”",
    "“We are both learning how to do this.”"
   ],
   "people": "Try: “I know you worry because you care. I've thought this through, and I'm going to try it. I'll tell you how it goes.” Or: “I'd love your help with this, and I'd like to make the final call.” Or, about money: “Can we write down what you're helping with and for how long, so we're both clear?” If you're on a parent's health plan, statements may be mailed to them; you can call the plan and ask how to keep your information private. In Birch, your answers stay on this device, and a helper sees only what you choose to share."
  },
  "helper": {
   "feel": "Young adults want two things at once: to be trusted to run their own lives, and to stay close to the people who raised them. Many still need practical help, and needing it can make them feel smaller, or quick to bristle. When they push back, they're usually not rejecting you. They're practicing being an adult with you, which is a sign the relationship matters to them.",
   "say": [
    "“What do you think you'll do?”",
    "“Do you want my ideas, or would it help more if I just listened?”",
    "“I trust you to figure this out. I'm here if you want me.”",
    "“I'm proud of how you're handling this.”"
   ],
   "avoid": [
    "Deciding for them, or making your help depend on them choosing your way.",
    "Bringing up old mistakes, or “I told you so.”",
    "Long lectures by text, or sharing their news with others before they do.",
    "Treating a different choice about faith, work, or where to live as a judgment on you."
   ],
   "help": [
    "Move from manager to mentor: ask first, offer ideas when invited, then step back and let them choose.",
    "If you help with money or housing, agree on clear terms together, write them down, and keep your side of them.",
    "Let them set some of the rhythm: how often you talk, when they visit, what they share.",
    "Notice and name what they're doing well. Young adults often hear far more about what's left to do.",
    "When values differ, stay curious. Ask what led them there, and share what matters to you without pressure.",
    "If you're worried about their safety or mood, say so plainly and kindly, and share 988 (call, text, or chat). Helpers in Birch see only what the young adult chooses to share, and never safety answers, so asking directly matters."
   ],
   "you": "Letting a grown child steer their own life is a real loss and a real gift at the same time. It's okay to grieve the old closeness while you build a new one. Find your own people to talk with: a friend, your partner, a support group, or a counselor."
  },
  "faith": "For some young adults, faith is one of the places where they and their parents differ most, and for others it's one of the deepest things they share. If faith is part of your life, it may give you words for honoring your parents while also growing into your own person. If it isn't, the same idea holds: respect can run both ways, and you can be close without being the same. Parents, if your child's faith or practice looks different from yours, staying curious and connected usually keeps the door open longer than pressure does.",
  "practices": [
   "branches|Call Home",
   "branches|Active Listening",
   "branches|Gratitude Letter",
   "trunk|Values Sort",
   "fruit|Starter Cushion",
   "bark|Name It"
  ],
  "reach": [
   "If talking with your family has turned into fear, threats, or harm: in Minnesota, Day One, 1-866-223-1111, or text 612-399-9995, any time. Anywhere in the U.S.: the National Domestic Violence Hotline, 1-800-799-7233, or text START to 88788.",
   "Feeling low, stuck, or hopeless for two weeks or more: talk with a doctor or counselor. Thoughts of not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Need help with housing, food, or bills while you get on your feet: in Minnesota, dial 211 (1-800-543-7709), or text your ZIP code to 898-211.",
   "For parents looking for guidance and support: NAMI HelpLine, 1-800-950-6264, weekdays.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Pew Research Center: parents, young adult children, and the transition to adulthood (2024)",
    "https://www.pewresearch.org/wp-content/uploads/sites/20/2024/01/ST_2024.01.25_Parents-Young-Adults_Report.pdf"
   ],
   [
    "Pew Research Center: financial help and independence in young adulthood",
    "https://www.pewresearch.org/social-trends/2024/01/25/financial-help-and-independence-in-young-adulthood/"
   ],
   [
    "211, United Way",
    "https://www.211unitedway.org"
   ]
  ]
 },
 {
  "id": "estrangement",
  "ring": "br-family",
  "title": "Hard family ties and estrangement",
  "keys": "estranged estrangement cut off from my family not speaking to my parents no contact low contact my parents cut me off my family disowned me kicked out toxic family hurtful parents abusive parent family conflict sibling estrangement distance from family holidays without family chosen family should i reconnect reconciliation boundaries with family guilt about cutting off family grief family financial aid without parents fafsa independent student no family support",
  "parts": [
   "branches",
   "roots",
   "bark"
  ],
  "quick": [
   "You're not alone in this. In one national survey, about 1 in 4 American adults said they had cut off contact with a family member.",
   "Some distance protects you, and some distance can be repaired. Both are real, and you get to take your time figuring out which this is.",
   "Estrangement is a grief with no funeral. Holidays, birthdays, and milestones can hurt the most, so plan for them.",
   "If family has hurt or threatened you, your safety comes first. Help is there any time: Day One in Minnesota, the National Domestic Violence Hotline, and 911 in danger."
  ],
  "feel": "Maybe you stepped back from a parent or sibling because being close kept hurting you. Maybe they stepped back from you, over a choice you made, a disagreement, or something you still don't understand. Maybe it's not a full break, just a tie so strained that every call leaves you shaken. You might feel relief and grief in the same week. Guilt, when someone says “but they're family.” Anger at what happened. Longing for the parent or family you wish you'd had. Worry about money, a place to stay, or who you'd call in an emergency. It can feel lonely when friends head home for the holidays. None of these feelings means you're doing it wrong.",
  "self": {
   "first": [
    "If you're in danger, or someone in your family is threatening you, get to a safe place and call 911. In Minnesota, Day One can help you plan for safety any time.",
    "Name what you're grieving: the relationship as it is, the one you hoped for, or both.",
    "Decide what contact, if any, feels safe and healthy right now. No contact, less contact, or contact with limits are all real options, and you can change your mind later.",
    "If you were relying on family for housing, money, or insurance, make a short list of what you need covered, and ask for help with it (211 in Minnesota, a school's financial aid office, a counselor)."
   ],
   "helps": [
    "Building chosen family: friends, mentors, a roommate, a coworker, a faith community, people who show up.",
    "Planning holidays ahead: who you'll be with, what you'll do, and one thing to look forward to.",
    "Writing what happened, plainly, for yourself. It helps you see it clearly when others question you.",
    "A counselor who understands family conflict, especially before a big step like reaching out or cutting contact.",
    "Keeping boundaries simple and steady: a set time for calls, leaving when it turns cruel, not answering every message.",
    "If you're in school and cut off from parents, asking your financial aid office about unusual circumstances. The Federal Student Aid Information Center (1-800-433-3243, weekdays) can explain how it works."
   ],
   "tell": [
    "“I can love someone and still need distance.”",
    "“Protecting myself is not the same as hating them.”",
    "“I get to take my time.”",
    "“My people can include the people I choose.”"
   ],
   "people": "To a friend or partner: “I'm not in contact with my family right now. Holidays are hard. It would mean a lot to be included.” To someone who pushes: “It's more complicated than it looks, and I've thought hard about it. I'd rather not talk about it today.” If you decide to reach out to family someday, a short, low-pressure message works best: “I've been thinking about you. I'm open to talking if you are.” In Birch, a helper sees only what you choose to share, so you decide who knows."
  },
  "helper": {
   "feel": "They may feel judged by people who don't know the full story, and tired of explaining. Many young adults in this place carry guilt, anger, and grief all at once, along with very practical worries: rent, insurance, school aid, a place to go for the holidays. Some are protecting themselves from real harm. Some are hoping for a repair someday. Most aren't sure yet.",
   "say": [
    "“That sounds really painful. I'm glad you told me.”",
    "“You don't owe me the whole story.”",
    "“Do you want to be with us for the holiday?”",
    "“Whatever you decide about contact, I'm on your side.”"
   ],
   "avoid": [
    "“But they're family.” or “You only get one mom.”",
    "Pushing them to reconcile, or carrying messages between them and their family.",
    "Taking sides loudly, or speaking badly of their family. They may still love them.",
    "Asking for details they haven't offered."
   ],
   "help": [
    "Invite them in: holidays, birthdays, Sunday dinners, ordinary weeknights. Belonging is the gift.",
    "Help with the practical things family might have covered: a ride, a reference, a couch for a week, a hand with forms.",
    "Remember the hard days: the anniversary of the break, Mother's Day or Father's Day, their birthday.",
    "If there was abuse, believe them, and point them to Day One or the National Domestic Violence Hotline for safety planning.",
    "If you're the parent on the other side of the distance, a counselor can help you understand what happened. A short, respectful message that asks for nothing often keeps the door open better than pressure does.",
    "Watch for signs of depression. If they seem hopeless, call, text, or chat 988 with them."
   ],
   "you": "You don't need the whole story to be kind. Being one steady person in their life can matter more than you'll ever know. Take care of yourself too, especially if their story stirs up your own family history."
  },
  "faith": "Many faith traditions value reconciliation, and many also value protecting yourself and others from harm. Wisdom holds both. If faith is part of your life, it may be a comfort here, or a source of pressure, especially if you've been told forgiveness means going back to something unsafe. Forgiveness, where people practice it, can happen at a distance, and it never requires putting yourself in harm's way. A chaplain, faith leader, or counselor you trust can help you sort out what you believe you owe and what you don't. If faith isn't part of your life, the same is true: you can work toward peace inside yourself without returning to harm.",
  "practices": [
   "bark|Name It",
   "branches|Shared Meal",
   "roots|What Holds Me Up",
   "bark|Expressive Writing",
   "branches|Make One Plan",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Danger right now: call 911.",
   "Family threatening or hurting you: in Minnesota, Day One, 1-866-223-1111, or text 612-399-9995, any time. Anywhere in the U.S.: the National Domestic Violence Hotline, 1-800-799-7233, or text START to 88788.",
   "No safe place to stay, ages 12 to 24: the National Runaway Safeline, 1-800-786-2929 (1-800-RUNAWAY), any time. In Minnesota, dial 211 (1-800-543-7709) for housing, food, and bills.",
   "In school and cut off from parents: ask your financial aid office about unusual circumstances, or call the Federal Student Aid Information Center, 1-800-433-3243, weekdays.",
   "Grief that turns into lasting sadness, or thoughts of not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "Karl Pillemer, Fault Lines: family estrangement (Cornell)",
    "https://news.cornell.edu/stories/2020/09/pillemer-family-estrangement-problem-hiding-plain-sight"
   ],
   [
    "National Domestic Violence Hotline",
    "https://www.thehotline.org"
   ],
   [
    "Day One",
    "https://dayoneservices.org/domestic-violence/help-now/"
   ],
   [
    "National Runaway Safeline",
    "https://www.1800runaway.org"
   ],
   [
    "211, United Way",
    "https://www.211unitedway.org"
   ],
   [
    "Federal Student Aid Information Center",
    "https://fsapartners.ed.gov/help-center/fsa-customer-service-center/service-centers-for-students/federal-student-aid-information-center-fsaic"
   ]
  ]
 },
 {
  "id": "anxiety",
  "ring": "br-mind",
  "title": "Anxiety and panic",
  "keys": "anxiety anxious worry worried nervous stress stressed panic attack panicking cant breathe heart racing chest tight overthinking racing thoughts cant sleep dread 3am social anxiety work anxiety job interview calling in sick avoiding things shaky nauseous on edge always waiting for something bad my roommate has panic attacks my partner is anxious",
  "parts": [
   "bark",
   "leaves",
   "branches",
   "fruit"
  ],
  "quick": [
   "Anxiety is your body's alarm system working too hard. It's built to protect you, and sometimes it goes off when nothing is wrong.",
   "A panic attack feels awful, and it rises, peaks, and passes. Breathing out slowly helps it pass sooner.",
   "Avoiding what you fear brings quick relief, and then the fear grows. Small steps toward it shrink it.",
   "Anxiety is common in these years and it responds well to help. In a 2024 to 2025 national survey, about 1 in 3 college students reported moderate to severe anxiety."
  ],
  "feel": "A mind that keeps running the worst case: the shift tomorrow, the text you sent, the rent, the future. Your body joins in with a racing heart, a tight chest, an upset stomach, or waking at 3 a.m. with a list of dreads. A panic attack can come out of nowhere and feel like you can't breathe or like something is badly wrong. Maybe you've started saying no to plans, letting calls go to voicemail, or putting off the appointment, just to keep the feeling away. These years bring a lot of firsts at once, often without the people and routines that used to steady you. Feeling anxious in the middle of all that makes sense, and it can get better.",
  "self": {
   "first": [
    "Breathe out longer than you breathe in: in for four, out for six, five times.",
    "Ground yourself: name three things you can see, two you can hear, and one you can feel.",
    "Say it plainly to yourself: “This is my alarm going off. It will pass.”"
   ],
   "helps": [
    "A worry window: fifteen minutes a day, away from bedtime, to write worries down and think them through. When a worry shows up at another time, jot it down for the window.",
    "Small, planned steps toward what you've been avoiding: make the call, go to the store at a busy time, stay five minutes longer.",
    "Steady sleep, daily movement, and going easy on caffeine and energy drinks, which can make a racing heart feel worse.",
    "Noticing what you're using to quiet the feeling. If alcohol, cannabis, or scrolling has become the main way through, that's worth a look.",
    "A short routine before hard moments, like an interview or a first day: two slow breaths and a cue word, practiced on small moments first.",
    "Talking with a doctor, a counselor, or your school or workplace counseling service if anxiety is getting in the way of work, school, sleep, or people. Therapy that teaches skills for anxiety works well, and a doctor can check for other causes."
   ],
   "tell": [
    "“This is a feeling, not a forecast.”",
    "“My body is trying to protect me. I can help it settle.”",
    "“I can do hard things while I'm nervous.”"
   ],
   "people": "You don't need a perfect explanation. Try: “I've been a lot more anxious lately than I've let on. I don't need you to fix it. It just helps to say it.” Or to a doctor: “Worry has been getting in the way of my sleep and my work, and I'd like help with it.”"
  },
  "helper": {
   "feel": "Whether you're a parent, a partner, a friend, or a roommate, you may see only part of it: canceled plans, a short temper, a lot of time in their room, or a sudden panic that scares you both. They may feel embarrassed, worn out, and afraid you'll think they're overreacting. They're an adult, and they're also running on a nervous system that won't settle.",
   "say": [
    "“That sounds really hard to carry. I'm glad you told me.”",
    "“What helps when it gets like this?”",
    "“Want to breathe out slowly with me for a minute?”",
    "“You don't have to feel ready to take one small step.”"
   ],
   "avoid": [
    "“Just relax,” or “There's nothing to worry about.”",
    "Arguing with every worry point by point.",
    "Taking over every hard call, errand, or conversation so they never face it. It brings short relief, and the fear grows.",
    "Pushing them into the hardest thing all at once."
   ],
   "help": [
    "Stay steady yourself. A slow voice and slow breathing help theirs.",
    "Ask what they'd like from you, and follow their lead. They decide; you offer.",
    "Help them break a feared thing into small steps if they ask, and notice each step they take.",
    "Offer a steady rhythm together: a walk, a shared meal, a regular call.",
    "Encourage a doctor or counselor if it has lasted weeks or is blocking work, school, or sleep. Offer to help find one, and let them make the call.",
    "If panic comes with chest pain, fainting, or trouble breathing and no one is sure what's happening, get medical help to be safe."
   ],
   "you": "Their anxiety can stir up your own. Keep your own sleep, movement, and people. You are a companion, not a cure. If they use Birch, they choose what to share with you; their answers stay on their own device."
  },
  "faith": "If faith is part of your life, you may find steadiness in a breath prayer, a psalm or sacred text, or a practice of handing over what you can't control. You don't have to feel peaceful to reach for peace. If faith isn't part of your life, music, time outside, or a few slow breaths can do the same steadying work.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Five Senses Pause",
   "bark|Worry Window",
   "bark|Before the Big Moment",
   "leaves|Breathe",
   "bark|Phone Check"
  ],
  "reach": [
   "Anxiety or panic that keeps you from work, school, people, or sleep for more than a few weeks: talk with a doctor or counselor.",
   "Chest pain, fainting, or trouble breathing and you're not sure why: get medical help, or call 911.",
   "Feeling overwhelmed and needing someone now: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "NAMI HelpLine, for information and next steps (not a crisis line): 1-800-950-6264, or text NAMI to 62640, weekdays."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "depression",
  "ring": "br-mind",
  "title": "Depression and feeling stuck",
  "keys": "depression depressed sad low numb empty flat stuck behind everyone else is ahead nothing matters dont care anymore tired all the time cant get out of bed no motivation hopeless crying sleeping too much cant sleep lost interest stopped going quit everything not myself whats the point failing at adulting falling behind at work my friend is depressed my partner is depressed my son seems depressed",
  "parts": [
   "bark",
   "fruit",
   "branches",
   "leaves"
  ],
  "quick": [
   "Depression can feel like sadness, or like nothing at all: numb, flat, stuck, or tired in a way sleep doesn't fix.",
   "It's common in these years. In a 2024 to 2025 national survey of college students, about 37 percent reported moderate to severe depressive symptoms.",
   "It's an illness, not laziness or a character flaw, and it gets better with help. Lower the bar, take one small step, and tell one person.",
   "If you're thinking about not wanting to be alive, call or text 988, or text HOME to 741741, today."
  ],
  "feel": "Maybe things you used to love feel like nothing now. Getting out of bed takes everything, and the dishes, the email, and the bill all sit there. You sleep too much or can't sleep, eat more or barely eat. Texts go unanswered. You might look around and feel like everyone your age is moving forward while you're stuck in place. Some people feel sad and cry a lot. Others feel numb, empty, or irritable, and snap at people they love. You might tell yourself you're just lazy, or that you should be able to handle this on your own. Depression says things like that. They aren't the truth about you.",
  "self": {
   "first": [
    "Notice how long it's been. If you've felt low, numb, or uninterested in most things for two weeks or more, that's worth telling someone.",
    "Do one small caring thing today: shower, eat something real, step outside, answer one text. Small counts.",
    "Book a visit with a doctor, a clinic, or a counselor, or ask someone you trust to sit with you while you make the call."
   ],
   "helps": [
    "Talk therapy, and sometimes medicine. A doctor or counselor can help you choose what fits you.",
    "Moving your body most days, even a short walk. Exercise eases depression in adults, even when you don't feel like it.",
    "Morning daylight and a steady wake time, even on days off.",
    "Being around people, even without talking much: a meal with a roommate, sitting with a friend, staying on the team or in the group.",
    "Doing one thing you used to enjoy, for ten minutes, before you feel like it. Feeling often follows doing.",
    "Going easy on alcohol and cannabis. They can feel like relief and then deepen the low.",
    "Comparing yourself with your own last month, not with someone else's highlights. Everyone's timeline is different."
   ],
   "tell": [
    "“This is depression talking, not the truth about me.”",
    "“Small steps still count.”",
    "“I don't have to feel like it to do the next small thing.”"
   ],
   "people": "Try: “I haven't felt like myself for a while, and I think I need help. Could you check in on me this week?” If saying it is too hard, send it as a text, or show someone this guide."
  },
  "helper": {
   "feel": "They may feel like a burden, or be sure nothing will help, and they may pull away from the very people who could. Some young adults hide it well and keep going to work or class; others stop answering, stay in bed, or come across as angry or flat. They're an adult, and depression can make even small decisions feel impossible.",
   "say": [
    "“I've noticed you haven't seemed like yourself. I care about you, and I'm here.”",
    "“You don't have to explain it all. What's it been like?”",
    "“Would it help if I sat with you while you call a doctor?”",
    "“Are you having thoughts of ending your life?” Asking plainly is safe, and it doesn't put the idea in their head."
   ],
   "avoid": [
    "“Look on the bright side,” or “Others have it worse.”",
    "Calling it laziness, or comparing them with siblings or friends who seem further along.",
    "Disappearing because you don't know what to say.",
    "Waiting to see if it passes when it has lasted weeks."
   ],
   "help": [
    "Keep inviting, gently: a walk, a drive, a meal, a show together. Keep inviting even when they say no.",
    "Help with one practical thing: groceries, a ride, a form, a phone call they've been dreading.",
    "Offer to help them find a doctor or counselor, and follow up kindly. Let them lead the visit.",
    "If they mention guns or a lot of medicine where they live, ask whether someone they trust could hold them for now.",
    "If you're worried they may be thinking about suicide, ask directly, stay with them, and call or text 988 together."
   ],
   "you": "Supporting someone who is depressed is tiring, and their mood can pull on yours. Keep your own sleep, walks, and people, and share the load with others who love them. If they use Birch, they choose what you see; safety answers are never shown to a helper, and no alert goes to anyone, so your own checking in matters."
  },
  "faith": "If faith is part of your life, honest sorrow has a long history there. Many traditions hold lament, words for feeling far away or empty, and the comfort of being carried by a community on dark days. Feeling numb doesn't mean you've failed at faith. If faith isn't part of your life, the same steadiness can come from people who keep showing up for you.",
  "practices": [
   "bark|Speak Up About Your Mood",
   "fruit|Tiny Next Step",
   "leaves|Walk or Jog",
   "leaves|Morning Daylight",
   "branches|One Reach-Out a Day",
   "bark|Self-Compassion Break",
   "fruit|Your Own Timeline"
  ],
  "reach": [
   "Feeling low, numb, or uninterested in most things for two weeks or more: talk with a doctor, a clinic, or a counselor, and tell someone you trust.",
   "Thoughts of not wanting to be alive, or of killing yourself: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741). Veterans and service members: call 988, then press 1.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911.",
   "NAMI HelpLine, for information and next steps (not a crisis line): 1-800-950-6264, or text NAMI to 62640, weekdays."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "first-signs",
  "ring": "br-mind",
  "title": "First signs of a serious mental illness",
  "keys": "something is wrong with my mind not myself scared of my own thoughts hearing voices seeing things paranoid people are watching me suspicious thoughts racing not sleeping and not tired manic mania bipolar psychosis schizophrenia first episode breakdown losing touch with reality confused cant think straight strange ideas my friend is acting strange my son is not making sense my roommate stopped sleeping my partner thinks people are following them weed made me paranoid",
  "parts": [
   "bark",
   "leaves",
   "branches",
   "fruit"
  ],
  "quick": [
   "Serious mental illnesses, like psychosis, bipolar disorder, and severe depression, often first show up between the late teens and the mid twenties. About three quarters of lifetime mental health conditions have begun by age 24.",
   "First signs are often quiet changes: sleep, thinking, mood, and pulling away, more than any one dramatic moment.",
   "Early help changes the course. People who get treatment soon after first signs tend to do better, and there are programs built for exactly this.",
   "You don't have to know what it is. Noticing and telling a doctor or counselor is enough of a first step."
  ],
  "feel": "Something feels off and it's hard to name. Maybe your thoughts are moving too fast, or too slowly, or don't line up the way they used to. Maybe you've barely slept for days and don't feel tired, or you feel like your mind is on fire with ideas. Maybe sounds seem louder, people seem to be watching or talking about you, or you've heard or seen things others don't seem to notice. You might be pulling away from people, missing shifts or classes, or finding it hard to keep up with things that used to be easy. It can be frightening, or it can feel like everyone else is the one who's changed. Either way, you're not alone, and help works best early.",
  "self": {
   "first": [
    "Write down what you've noticed and roughly when it started: sleep, thoughts, mood, anything that seems different. A few lines in your phone is enough.",
    "Tell one person you trust what you wrote. You don't need to know what it means.",
    "Make an appointment with a doctor, a clinic, or a counselor, and bring your notes. You can say: “Something has changed in how my mind is working, and I want it checked.”"
   ],
   "helps": [
    "Protecting sleep. Losing sleep can make symptoms stronger, and steady sleep helps your mind settle.",
    "Stepping back from cannabis, especially high-potency or daily use, and from other drugs. Heavy high-potency cannabis use is linked with a higher risk of psychosis.",
    "Asking about early treatment. Many areas have first-episode programs that bring a team together: therapy, medicine if you choose it, help with work or school, and support for family.",
    "Keeping a simple daily rhythm: meals, daylight, a little movement, one person you talk with.",
    "Choosing who you'd like involved. As an adult, you decide whether your treatment team can talk with family or anyone else.",
    "Being patient with yourself. Recovery is common, and many people go on to work, study, and build the lives they want."
   ],
   "tell": [
    "“Noticing early is a strength.”",
    "“I don't have to figure out what this is by myself.”",
    "“Getting help now is how I protect my future.”"
   ],
   "people": "Try: “Something's been off with me lately: my sleep, my thoughts, how I'm feeling. Can I show you what I've noticed? I'd like help getting it checked.”"
  },
  "helper": {
   "feel": "You may be the first to notice: a young adult who stopped sleeping, says things that don't add up, seems suspicious of people they used to trust, or has pulled away from everything. It can be confusing and frightening. They may not see the change, or may feel that others are the problem. They're an adult with the right to make their own choices, and your calm, steady presence can help them choose help.",
   "say": [
    "“I've noticed you haven't been sleeping much, and you seem really stressed. I'm worried, and I'm on your side.”",
    "“Would you be willing to get checked out? I'll go with you if you want.”",
    "“That sounds frightening. You're safe with me right now.”",
    "“What would help you feel calmer tonight?”"
   ],
   "avoid": [
    "Arguing about whether a voice or a suspicious belief is real. Talk about the feelings and the stress instead.",
    "Labels or diagnoses: “You're crazy,” “You're bipolar,” “You're psychotic.”",
    "Crowding, shouting, or sudden moves when they're upset.",
    "Waiting months to see whether it passes."
   ],
   "help": [
    "Describe what you've seen in plain, specific words, with dates: “You've slept about three hours a night since Sunday.”",
    "Encourage a doctor or counselor visit soon, and offer a ride or company. Ask about first-episode or early psychosis programs.",
    "Keep things calm and simple: a quiet room, a short sentence, one choice at a time.",
    "Ask whether they'd sign a release so their treatment team can talk with you. It's their choice.",
    "If they talk about harming themselves or someone else, or seem in danger: call or text 988, call **CRISIS (274747) from a cell phone in Minnesota for a mobile crisis team, or call 911.",
    "Learn about it. NAMI offers classes and support groups for families and friends."
   ],
   "you": "This can be one of the most frightening things to watch in someone you love. You don't have to understand it all to be helpful. Get support for yourself, through NAMI's family programs, a counselor, or people you trust. If they use Birch, they choose what you see; safety answers are never shown, and no alert goes to anyone."
  },
  "faith": "If faith is part of your life, a faith leader or community can be one more steady presence, and a source of comfort while you get checked out. Strong spiritual experiences can be meaningful, and they can also overlap with symptoms when sleep and stress are way off, so it helps to talk with both a trusted faith leader and a doctor. If faith isn't part of your life, the same steadiness can come from people who know you well.",
  "practices": [
   "bark|Speak Up About Your Mood",
   "bark|Name It",
   "leaves|Steady Wake Time",
   "leaves|Sleep",
   "branches|Ask for Help",
   "leaves|Health Basics"
  ],
  "reach": [
   "Noticing changes in sleep, thinking, or mood that last more than a week or two: see a doctor, a clinic, or a counselor, and ask about early treatment or a first-episode program.",
   "Thoughts of not wanting to be alive, or of harming someone: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone. A mobile crisis team can talk with you or come to you.",
   "Danger right now: call 911.",
   "NAMI HelpLine, for information, next steps, and programs for families (not a crisis line): 1-800-950-6264, or text NAMI to 62640, weekdays.",
   "SAMHSA National Helpline, for help finding treatment for mental health or substance use: 1-800-662-4357, any time, in English and Spanish."
  ],
  "more": [
   [
    "NIMH: Understanding Psychosis",
    "https://www.nimh.nih.gov/sites/default/files/documents/health/publications/understanding-psychosis/23-MH-8110-Understanding-Psychosis.pdf"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ],
   [
    "NAMI: Time Is Ticking on Early Psychosis",
    "https://www.nami.org/blog/time-is-ticking-on-early-psychosis/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "suicide-thoughts",
  "ring": "br-safety",
  "title": "Thoughts of suicide, and a safety plan",
  "keys": "suicide suicidal thoughts of suicide want to die wish i was dead dont want to be here dont want to be alive kill myself end my life end it all no point everyone would be better off without me burden no way out hopeless tired of living safety plan crisis plan 988 crisis line veteran",
  "parts": [
   "fruit",
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "If you're thinking about suicide, reach out now: call or text 988, or text HOME to 741741. Veterans and service members: 988, then press 1. In danger right now: call 911.",
   "Thoughts of suicide are a sign of deep pain, not weakness and not a plan you have to follow. Serious thoughts of suicide are most common between 18 and 25, and many people find their way through with help.",
   "These thoughts usually come in waves. A safety plan, written on an okay day, helps you get through the hardest hours.",
   "Telling one person is one of the strongest things you can do. Asking about suicide doesn't put the idea in anyone's head."
  ],
  "feel": "Maybe the pain feels like it will never end, and you can't see a way out. A breakup, a job or a class that fell apart, money trouble, a move away from everyone, or a long stretch of feeling empty can pile up until it feels like too much. You might feel like a burden, like people would be better off without you, or just so tired of trying. You might feel scared of these thoughts, ashamed of them, or strangely calm. That belief that nothing will change is the pain talking. The pain is real, and so is the chance that it gets better.",
  "self": {
   "first": [
    "If you might act on these thoughts, call 911 or go to an emergency room now. Or call or text 988.",
    "If there are guns or a lot of medicine where you live, ask someone you trust to hold them for now.",
    "Go where other people are, and tell one person today: a friend, a roommate, someone in your family, a coworker, a doctor, or a counselor. You can say, “I'm not okay. I'm having thoughts of ending my life, and I need help.”"
   ],
   "helps": [
    "A safety plan, written on an okay day: your warning signs; what you can do on your own to ride out a wave; people and places that help; who you can ask for help; help lines; and how to make where you live safer. Birch has a practice for it, My Safety Plan.",
    "Keeping your plan where you can find it fast: in your phone, in Birch, or on paper in your wallet.",
    "Sharing your plan with one person you trust, so they know what helps and how to reach you.",
    "A counselor, therapist, or doctor. Thoughts of suicide respond to treatment, even if you've tried before. If you're in school, campus counseling is a good place to start.",
    "Less alcohol and other drugs on hard nights. They make waves bigger and choices faster.",
    "Your reasons, big or small: a person, a pet, a plan for next month, a song you want to hear again.",
    "Getting through the next hour, then the next. Waves pass, even very big ones."
   ],
   "tell": [
    "“This feeling is real, and it can change.”",
    "“I'm not a burden. I'm a person who needs help right now.”",
    "“I only need to stay safe right now.”",
    "“Reaching out is strength.”"
   ],
   "people": "Try: “I'm not okay. I'm having thoughts of ending my life, and I need help.” If saying it is too hard, text it, write it down, or show someone this guide. If the first person doesn't respond well, tell another. If a friend tells you they're thinking about suicide, see the guide When a Friend Is Thinking About Suicide."
  },
  "helper": {
   "feel": "They may feel hopeless, ashamed, or like a burden to you. Many young adults hide it because they don't want to worry anyone, or because they're afraid of losing their independence, their job, their place in school, or your respect. Some are relieved the moment someone finally asks.",
   "say": [
    "“Are you thinking about killing yourself?” Ask plainly and calmly. Asking is safe, and it doesn't put the idea in their head.",
    "“Thank you for telling me. I'm glad you did, and I'm staying with you.”",
    "“You matter to me, and this can get better with help.”",
    "“Can we make a plan for the hard moments, together?”"
   ],
   "avoid": [
    "“You have so much to live for.” It can make them feel unheard.",
    "“Promise me you won't.” A promise isn't a plan.",
    "Promising to keep it secret. Safety comes first, and you can say so kindly.",
    "Shock, anger, a lecture, or a debate about whether life is worth living. Keep your face and voice steady."
   ],
   "help": [
    "If they may act on it now, stay with them and call 911 or 988, or go to an emergency room together.",
    "If there are guns or a lot of medicine where they live, offer to hold them for now, or help find someone who can. Safer storage goes with lower suicide risk.",
    "Help them get seen soon by a doctor, counselor, or campus counseling center, and offer to go along. They're an adult, so let them lead the choices they can.",
    "Help them write a safety plan, in their words, and ask whether they'd like you to keep a copy.",
    "Check in often, warmly and briefly, by text or in person. Watch for warning signs: talk of being a burden, giving things away, saying goodbye, heavy drinking or drug use, or a sudden calm after a hard stretch."
   ],
   "you": "Hearing that someone you love has thought about suicide is frightening. You don't have to carry it alone. Call or text 988 for guidance any time, for them or for yourself, and lean on your own people. You are a lifeline, not a therapist, and getting them to help is the work."
  },
  "faith": "If faith is part of your life, notice what it's like for you right now: a comfort, a source of hard questions, or both. Some people find honest words with God, or whatever they hold sacred, help them hold on. Others carry fear of being judged, and that weight deserves a kind listener too. A faith leader you trust can be one of the people on your plan. If faith isn't part of your life, your reasons and your people are what you hold on to.",
  "practices": [
   "bark|My Safety Plan",
   "bark|Speak Up About Your Mood",
   "branches|Ask for Help",
   "branches|One Reach-Out a Day",
   "fruit|Tiny Next Step",
   "bark|Slow Exhale"
  ],
  "reach": [
   "Thoughts of suicide, or not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time.",
   "Veterans, service members, the Guard and Reserve, and their families: call 988, then press 1, or text 838255.",
   "Text HOME to 741741, any time (in Minnesota, text MN to 741741).",
   "In danger right now, or might act on these thoughts: call 911, or go to an emergency room.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone. A county team can come to you.",
   "Someone you're dating or with is hurting you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. In Minnesota, Day One, 1-866-223-1111.",
   "Someone is threatening you with an intimate image: stopncii.org (adults), or takeitdown.ncmec.org for an image from before you were 18.",
   "Drinking or drug use is part of it: SAMHSA National Helpline, 1-800-662-4357, any time."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "Minnesota mobile crisis (**CRISIS)",
    "https://www.mnmhaccess.com/Home/Crisis"
   ],
   [
    "American Foundation for Suicide Prevention",
    "https://afsp.org"
   ],
   [
    "Means Matter (Harvard)",
    "https://hsph.harvard.edu/research/means-matter/resources/safe-storage-bibliography"
   ]
  ]
 },
 {
  "id": "friend-suicide",
  "ring": "br-safety",
  "title": "When a friend is thinking about suicide",
  "keys": "friend suicidal my friend wants to die worried about my friend roommate suicidal partner suicidal boyfriend girlfriend talking about suicide said they want to kill themselves posted goodbye message group chat warning signs how to help a friend what do i say should i tell someone keep it secret 988",
  "parts": [
   "branches",
   "fruit",
   "bark"
  ],
  "quick": [
   "If your friend may act on it now, stay with them if it's safe and call 911. Any time, call or text 988 together, or call 988 yourself for guidance on how to help.",
   "Ask directly: “Are you thinking about killing yourself?” Asking doesn't put the idea in their head, and it often brings relief.",
   "Listen more than you talk, and connect them with help today. You're a bridge to help, not their only lifeline.",
   "A friend's safety comes before a promise to keep a secret. And carrying this is heavy, so bring in support for yourself, too."
  ],
  "feel": "Maybe a friend said something that stuck: a joke about not being around, a late-night message that sounded like goodbye, a post that worried you. Maybe it was a roommate, a partner, a coworker, or someone you mostly know online. You might feel scared, helpless, unsure whether you're overreacting, or afraid that saying the wrong thing will make it worse. You might feel the weight of being the one they told. Noticing and caring is already a lot. You don't need to be an expert to help.",
  "self": {
   "first": [
    "If they may act on it right now, stay with them if it's safe, and call 911. If they're somewhere else, call 911 and say where they are.",
    "Call or text 988 yourself any time for guidance on what to do. They help people who are worried about someone, too.",
    "Ask plainly: “Are you thinking about killing yourself?” Then listen."
   ],
   "helps": [
    "Knowing the warning signs: talk of being a burden or of wanting to die, pulling away from people, giving things away, saying goodbye, heavier drinking or drug use, or a sudden calm after a hard stretch.",
    "Listening without arguing, fixing, or judging. Let them finish.",
    "Helping them connect today: calling or texting 988 together, going with them to campus counseling, a clinic, or a doctor, or helping them reach someone in their family they trust.",
    "If there are guns or a lot of medicine where they live, asking whether someone they trust can hold them for now.",
    "Bringing in other people, like a family member, a resident advisor, a supervisor, or a faith leader they trust, so you're not the only one.",
    "Following up in the days and weeks after. A short text counts."
   ],
   "tell": [
    "“I can't fix this alone, and I don't have to.”",
    "“Getting them to help is what a good friend does.”",
    "“Their choices are not my fault. Caring and acting is my part.”"
   ],
   "people": "Try: “I'm worried about a friend who's talking about suicide, and I need help knowing what to do.” Say it to 988, a counselor, a family member, or someone else you trust. If your friend asks you to keep it secret, you can say kindly, “I care about you too much to keep this to myself.”"
  },
  "helper": {
   "feel": "A young adult carrying a friend's crisis may be scared, exhausted, and unsure whether they did enough. They may feel bound by a promise of secrecy, or guilty for telling. If they've lost someone to suicide before, or have had hard thoughts themselves, it can hit close to home. They're an adult, and they're also carrying something heavy.",
   "say": [
    "“Thank you for telling me. You did the right thing.”",
    "“You don't have to carry this by yourself. Let's figure out the next step together.”",
    "“How are you doing with all of this?”",
    "“Their safety matters more than a secret, and so does yours.”"
   ],
   "avoid": [
    "“Stay out of it,” or “That's not your problem.”",
    "Taking over completely. Help them act, and let them lead where they safely can.",
    "Blaming them if things got worse. They did what they could.",
    "Promising them nothing bad will happen."
   ],
   "help": [
    "If the friend may be in danger now, help call 911 or 988 right away.",
    "Help them think through who else can be part of the friend's support: the friend's family, a counselor, a resident advisor, or a supervisor.",
    "Check on them in the days after, and notice their own sleep, mood, and drinking. Carrying a friend's crisis can bring on hard feelings of their own.",
    "Ask them plainly, too, if you're worried: “Are you having any thoughts like that yourself?”",
    "Call or text 988 together for guidance if you're both unsure."
   ],
   "you": "Watching someone you love carry a friend's crisis is hard. You may feel protective, or wish they didn't have to. Get support for yourself, too, and remember that steady presence is most of what helps."
  },
  "faith": "If faith is part of your life, you may find yourself praying for your friend, or wondering what your faith asks of you. Many traditions treat staying beside someone in the dark as sacred work. Prayer and a call to 988 go well together. If faith isn't part of your life, showing up for a friend is its own kind of meaning.",
  "practices": [
   "branches|Look Out for a Friend",
   "branches|Active Listening",
   "branches|Ask for Help",
   "bark|My Safety Plan",
   "bark|Slow Exhale",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Worried about someone, or thinking about suicide yourself: call or text 988, or chat at 988lifeline.org, any time.",
   "Veterans, service members, and their families: call 988, then press 1, or text 838255.",
   "Text HOME to 741741, any time (in Minnesota, text MN to 741741).",
   "Someone is in danger right now: call 911.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone. A county team can come to the person.",
   "If your friend is being hurt by someone they're dating or with: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "American Foundation for Suicide Prevention",
    "https://afsp.org"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ],
   [
    "JED Foundation",
    "https://jedfoundation.org"
   ]
  ]
 },
 {
  "id": "selfharm",
  "ring": "br-safety",
  "title": "Self-harm",
  "keys": "self harm self-harm selfharm self injury cutting hurting myself on purpose urge to hurt myself scars hiding marks long sleeves relapse started again after years numb release punish myself my partner hurts themselves roommate hurting themselves friend cutting 988",
  "parts": [
   "bark",
   "branches",
   "fruit",
   "roots"
  ],
  "quick": [
   "If you're badly hurt, call 911. If you're thinking about suicide, call or text 988, or text HOME to 741741.",
   "Self-harm is usually a way to get through feelings that feel too big, not a character flaw. You deserve help, not punishment.",
   "It tends to get harder to stop over time, and it can become more dangerous. Skills-based therapy helps many people find other ways through.",
   "Some people stop for years and start again during a hard season. A setback is part of it, not proof that nothing works."
  ],
  "feel": "Maybe a feeling builds until it's too much: anger, panic, shame, loneliness, or numbness. Hurting yourself brings relief for a moment, and then the shame shows up, and the secret gets heavier. You might hide it from a roommate, a partner, or coworkers, plan around sleeves and summers, or feel scared a doctor will notice. Maybe it started years ago and came back with a breakup, a move, or a hard semester or job. Some people feel they deserve it. Some just want to feel something. None of that makes you broken. It means you've been carrying a lot, mostly alone.",
  "self": {
   "first": [
    "If you're badly hurt or in danger, call 911 or go to an emergency room. Get medical care for any wound that is deep or looks infected.",
    "When the urge comes, put some distance between you and it: leave the room, go where other people are, and reach out. Call or text 988, or text HOME to 741741.",
    "Tell one person you trust: a friend, a partner, someone in your family, a doctor, or a counselor. You can borrow these words: “I've been hurting myself when things get bad, and I want help.”"
   ],
   "helps": [
    "Naming the feeling underneath, and noticing what was happening right before the urge.",
    "Riding the wave: urges rise and fall. Breathing out slowly, moving your body, or waiting ten minutes with someone lets the peak pass.",
    "Ways through a hard moment that don't hurt your body: call or text someone, walk, write, draw, or play music loud.",
    "A plan for hard moments, made on an okay day: your warning signs, what you can do instead, who you can reach, and help lines. Birch has one, My Safety Plan.",
    "A counselor or therapist. Therapies that teach skills for big feelings, like DBT, are built for exactly this. Campus counseling, a clinic, or your doctor can help you find one.",
    "Less alcohol and other drugs on hard nights. They lower the brakes when urges are strong.",
    "Being kind to yourself after a setback. You can start again the same day."
   ],
   "tell": [
    "“This urge will pass, even if it doesn't feel like it.”",
    "“I deserve care, not punishment.”",
    "“A setback isn't the end. I can start again today.”"
   ],
   "people": "Try: “I've been hurting myself when things get bad. I want help stopping.” If saying it is too hard, text it or write it down. You get to choose who you tell and how much. If a friend tells you they're hurting themselves, listen, and help them reach someone who can help. If they may be in danger, call 988 or 911."
  },
  "helper": {
   "feel": "A young adult who self-harms may have hidden it for a long time, from family, roommates, or a partner. They may feel ashamed, angry that you noticed, or relieved. Most are trying to get through feelings that feel too big. They're watching to see whether telling you was a mistake.",
   "say": [
    "“Thank you for telling me. I'm not going anywhere.”",
    "“I'm not upset with you. I want to understand.”",
    "“What was happening right before?”",
    "“Are you thinking about killing yourself?” Asking plainly is safe, and it doesn't put the idea in their head."
   ],
   "avoid": [
    "Panic, anger, ultimatums, or a shocked face. Breathe first.",
    "Demanding a promise to stop. A promise they can't keep adds shame.",
    "Calling it attention-seeking. Reaching out is brave.",
    "Asking to see wounds out of curiosity, or about details. Ask only what you need for safety.",
    "Telling other people without their okay, unless their life is in danger."
   ],
   "help": [
    "Ask calmly whether any wounds need care, and help them get medical care when they do. For a serious injury, call 911.",
    "Offer to help them find a doctor or a therapist trained in DBT or another skills-based therapy this week, and let them choose. They're an adult, and the choice is theirs.",
    "If you share a home, ask what would help make it safer during hard stretches, and do it calmly, as support, not punishment.",
    "Offer to help make a plan for hard moments, in their words, and keep check-ins short, warm, and regular.",
    "Expect setbacks. Thank them every time they tell you."
   ],
   "you": "It's frightening to love someone who hurts themselves, and it can stir fear, guilt, or anger. Get support for yourself from a counselor or someone you trust, and call 988 for guidance if you need it. Your steady presence helps."
  },
  "faith": "If faith is part of your life, notice what it's like for you right now. For some, it's a comfort: being held and loved in your wounds, not only after they heal. For others, it's one more place they're afraid to disappoint, and that fear deserves a kind listener too. A faith leader you trust can be a safe person to tell. If faith isn't part of your life, worth and belonging come from the same place: people who stay with you through the hard parts.",
  "practices": [
   "bark|My Safety Plan",
   "bark|Name It",
   "bark|Slow Exhale",
   "bark|Kind Voice Letter",
   "branches|Ask for Help",
   "bark|Speak Up About Your Mood"
  ],
  "reach": [
   "Badly hurt, or in danger right now: call 911, or go to an emergency room.",
   "Urges to hurt yourself, or thoughts of not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Veterans and service members: call 988, then press 1, or text 838255.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "Someone you're dating or with is hurting you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. In Minnesota, Day One, 1-866-223-1111.",
   "Information and support finding help (not a crisis line): NAMI HelpLine, 1-800-950-6264, or text NAMI to 62640, weekdays.",
   "A doctor, campus counseling, or a therapist trained in DBT or another skills-based therapy."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "Cornell Self-Injury and Recovery Resources",
    "https://selfinjury.bctr.cornell.edu"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ],
   [
    "JED Foundation",
    "https://jedfoundation.org"
   ]
  ]
 },
 {
  "id": "sexual-assault",
  "ring": "br-safety",
  "title": "After a sexual assault",
  "keys": "sexual assault rape raped unwanted touching groped forced pressured into sex didn't say yes i froze my fault was drinking was drunk party date someone i know ex partner coworker boss roommate campus assault title ix i think i was drugged is it assault what do i do after survivor rainn day one report or not",
  "parts": [
   "bark",
   "branches",
   "leaves",
   "roots"
  ],
  "quick": [
   "Any sexual act without your clear, willing yes is not okay. It was not your fault, no matter what you wore, drank, or said, and no matter whether you knew them or dated them.",
   "Freezing is one of the most common ways a body reacts to a threat. Not fighting back does not mean you agreed.",
   "You get to decide what happens next, including whether to report. You can talk with a trained advocate confidentially before deciding anything.",
   "Help is there any time: RAINN, 1-800-656-4673, or text HOPE to 64673; in Minnesota, Day One, 1-866-223-1111. In danger right now: 911."
  ],
  "feel": "Afterward, many people feel numb, confused, or like it didn't really happen. Some feel ashamed, dirty, angry, or scared to be near certain people or places. You might replay it, or not be able to remember parts. You might blame yourself for going, for drinking, for not leaving, or for freezing. You might worry no one will believe you, especially if the person is a friend, a partner or an ex, a coworker, or someone people like. Every one of those reactions is common. None of them means it was your fault.",
  "self": {
   "first": [
    "If you're in danger right now, get to a safe place and call 911.",
    "Reach out to someone trained for this: RAINN (call 1-800-656-4673, or text HOPE to 64673) or, in Minnesota, Day One (1-866-223-1111, or text 612-399-9995). They can talk you through your options, at your pace.",
    "If it happened in the last few days, or you think you were drugged, a hospital can check on you, and an advocate can explain the choice of a medical exam and go with you. You can decide about reporting later.",
    "Tell one person you trust. If the first person doesn't respond well, tell another."
   ],
   "helps": [
    "Hearing, from someone you trust, “I believe you. It's not your fault.”",
    "An advocate who can walk with you through medical care, reporting, school or work questions, or none of those.",
    "If it involved your school, the school's Title IX office or a campus advocate can explain your options, including changes to classes or housing.",
    "Getting your body back to calm in small ways: slow breaths out, warm water, a blanket, feet on the floor, naming what you see around you.",
    "Keeping simple routines: meals, sleep, work or classes, and time with safe people.",
    "Talking with a counselor who knows trauma. Healing is real, and it's not a straight line.",
    "Choosing what to share, and with whom. Your story is yours."
   ],
   "tell": [
    "“What happened to me was not my fault.”",
    "“Freezing was my body trying to keep me safe.”",
    "“I get to choose what happens next, and I get to heal at my own pace.”"
   ],
   "people": "Try: “Something happened to me that I didn't want, and I need you to just listen and believe me.” If the person who hurt you is someone you live with, date, or work with, an advocate at RAINN or Day One can help you plan for safety. If it's someone you're dating or with, Love Is Respect can help too."
  },
  "helper": {
   "feel": "A young adult who tells you may share a small piece first, to see how you react. They may seem calm, flat, or even laugh, which is a common shock response. They may fear not being believed, being blamed for drinking or for where they were, losing friends, or what happens at school or work. Often the person who hurt them is someone they know.",
   "say": [
    "“I believe you.”",
    "“It's not your fault.”",
    "“Thank you for telling me.”",
    "“You don't have to tell me everything. What would help right now?”"
   ],
   "avoid": [
    "Questions that sound like blame: “Why did you go there?” “Were you drinking?” “Why didn't you leave?”",
    "Pressing for details. Trained people can gather what's needed later.",
    "Pressuring them to report, or not to report. The choice is theirs.",
    "Confronting the person who did it without their okay.",
    "Telling others without their okay."
   ],
   "help": [
    "Stay calm, and make sure they're safe right now. If they're in danger or hurt, call 911.",
    "Offer to call RAINN (1-800-656-4673) or, in Minnesota, Day One (1-866-223-1111) with them. An advocate can explain options, including a medical exam if it was recent.",
    "Offer to go with them to a hospital, an advocate, or a counselor, if they want you there.",
    "Let them make the choices: who knows, what happens next, and when to talk. They're an adult, and having choices back is part of healing.",
    "Stay close in the weeks after. Watch for sleep trouble, pulling away, heavier drinking, or talk of not wanting to be alive, and call or text 988 together if it comes."
   ],
   "you": "Hearing this can bring up rage, grief, guilt, or memories of your own. Those are real. Find your own support, through RAINN, Day One, or a counselor, without sharing their story. You don't need perfect words. Believing them is the most important thing you'll do."
  },
  "faith": "If faith is part of your life, notice what it's like for you now: a comfort, a complication, or both. Some people hear messages that leave them feeling ashamed or blamed. What happened was done to you, and many traditions teach that those who are harmed are beloved and never to blame. If a faith community has minimized harm, that is a failure of the community. Some people find prayer, a trusted faith leader, or their community a real source of strength while they heal. If faith isn't part of your life, you still deserve people and places that help you feel safe and whole.",
  "practices": [
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Self-Compassion Break",
   "branches|Ask for Help",
   "leaves|Steady Wake Time",
   "bark|Body Scan"
  ],
  "reach": [
   "Danger right now: call 911.",
   "RAINN National Sexual Assault Hotline: call 1-800-656-4673, or text HOPE to 64673, any time.",
   "In Minnesota, Day One: 1-866-223-1111, or text 612-399-9995, any time.",
   "If it was someone you're dating or with: Love Is Respect, call 1-866-331-9474, or text LOVEIS to 22522, any time. Or the National Domestic Violence Hotline, 1-800-799-7233, or text START to 88788.",
   "If intimate images were taken or shared: StopNCII (stopncii.org) for adults, or Take It Down (takeitdown.ncmec.org) for images from before you were 18.",
   "If you feel so low you don't want to be alive: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741), any time.",
   "In Birch, if you answer that someone is hurting you, Birch shows you outside help right away. Nothing is sent to anyone, and a helper never sees that answer."
  ],
  "more": [
   [
    "RAINN",
    "https://rainn.org/help-and-healing/hotline/"
   ],
   [
    "Day One: Help after sexual violence",
    "https://dayoneservices.org/sexual-violence/help-after/"
   ],
   [
    "Love Is Respect",
    "https://www.loveisrespect.org"
   ],
   [
    "National Domestic Violence Hotline",
    "https://www.thehotline.org"
   ]
  ]
 },
 {
  "id": "military",
  "ring": "br-meaning",
  "title": "Joining the military, and military life",
  "keys": "military joining the military enlist enlisting recruiter talking to a recruiter army navy air force marines coast guard space force national guard reserves rotc basic training boot camp meps asvab contract signing bonus first duty station deployment pcs moving bases away from home homesick barracks military life new soldier sailor airman marine guardian my kid is enlisting my partner joined my friend enlisted military spouse young service member",
  "parts": [
   "trunk",
   "branches",
   "bark"
  ],
  "quick": [
   "Joining is a big choice with real rewards and real costs. Taking time to ask questions is part of choosing well.",
   "Before you sign, understand what you're agreeing to, and ask for anything important to you, like a job or a training path, in writing.",
   "The first year brings a new schedule, new rules, new people, and often a new place. Feeling homesick or unsure is common and passes for many.",
   "Help is built in for service members and families, any time: Military OneSource at 800-342-9647, and 988 then press 1 for the Veterans and Military Crisis Line."
  ],
  "feel": "Maybe you're thinking about joining and weighing it against school, work, or staying near home. Maybe you've signed and you're counting down to training, part excited, part nervous. Maybe you're already in, at your first duty station, in the Guard or Reserve with a drill weekend coming, or getting ready for a deployment. You might feel proud, scared, homesick, restless, or all of it in one day. People back home may be proud of you, worried about you, or not sure what to say. Some people find exactly the structure, purpose, and friendships they hoped for. Some find it harder than they expected, at least for a while. Both happen, and both are worth talking about.",
  "self": {
   "first": [
    "If you're deciding: talk with more than one person who has served, not only a recruiter, and bring someone you trust to the recruiter meetings if you like.",
    "Before you sign, read what you're agreeing to: the length of service, the job, any bonus, and what happens if plans change. Ask for anything important to you in writing.",
    "If you're in: learn where your support is on day one: your chain of command, a chaplain (for anyone, of any faith or none), and Military OneSource, 800-342-9647, any time.",
    "Set up a simple way to stay in touch with your people back home, and tell them how often to expect to hear from you."
   ],
   "helps": [
    "Knowing your why. A clear reason you chose this steadies you on the hard days.",
    "Learning the basics early: your pay, your leave, your benefits, and a small savings cushion.",
    "Steady sleep where you can, and a rest plan for shift work, watches, or field time.",
    "Friends in your unit, and at least one person outside it you can be honest with.",
    "Asking about education benefits, training, and credentials, so your service builds toward what comes after.",
    "Speaking up early when something feels off: mood, drinking, money, or a relationship. Asking for help is a strength the military trains."
   ],
   "tell": [
    "“I can be proud of this and still miss home.”",
    "“Asking questions is part of doing this well.”",
    "“Hard weeks pass. I don't have to judge the whole thing by one of them.”"
   ],
   "people": "Try, while you're deciding: “I'm thinking about enlisting. Would you help me think through the questions to ask?” Once you're in: “It might be a while between calls. Here's how to reach me, and here's how I'm doing for real.”"
  },
  "helper": {
   "feel": "They may feel proud, excited, nervous, and a little lost, sometimes in one phone call. They're making an adult choice and may be bracing for your reaction. Once they're in, they may not be able to share much about their schedule or where they are, and they may sound different when they call. Some feel homesick and don't want to admit it. Some struggle quietly with a hard leader, money, or a relationship.",
   "say": [
    "“Tell me what draws you to this.”",
    "“What questions do you still have? Want to work through them together?”",
    "“I'm proud of you, and I'm here, whatever the day is like.”",
    "“You can tell me the hard parts too.”"
   ],
   "avoid": [
    "Trying to talk them in or out of it. It's their choice to make.",
    "Treating every quiet stretch as bad news. Schedules and access to phones change often.",
    "Making them feel guilty for leaving, or for missing a holiday.",
    "Pressing for details they can't share."
   ],
   "help": [
    "If they're deciding, help them gather questions and, if they want, go with them to meet a recruiter.",
    "Learn the basics yourself: how to send mail, what their training schedule looks like, and who to contact in an emergency.",
    "Keep your messages warm and steady, with news from home and room for theirs.",
    "If they seem low, keep in touch and ask directly how they're doing. Military OneSource, 800-342-9647, also helps families, any time.",
    "If they ever talk about not wanting to be here, stay with them and help them call 988 and press 1."
   ],
   "you": "Letting someone you love go into service stirs a lot. Find your own people: other military families, Guard and Reserve family programs, or friends who will listen. Military OneSource serves families too."
  },
  "faith": "Some service members lean on faith in military life: a chaplain, a service on base, or a practice they carry from home. Others find meaning in their unit, their oath, and the people they serve beside. Chaplains serve everyone, of any faith or none. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "trunk|Values Sort",
   "trunk|Big Choice Map",
   "trunk|Ask Someone About Their Path",
   "leaves|Shift Worker's Rest Plan",
   "bark|Money Check-in",
   "branches|Call Home"
  ],
  "reach": [
   "Military OneSource: 800-342-9647, any time, for service members, the Guard and Reserve, and families. They can connect you with someone to talk to.",
   "Veterans and Military Crisis Line: call 988, then press 1, or text 838255, any time.",
   "Thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Someone you're with is controlling or hurting you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Military OneSource: New to the Military",
    "https://www.militaryonesource.mil/military-life-cycle/new-to-the-military/"
   ],
   [
    "Military OneSource",
    "https://www.militaryonesource.mil/"
   ],
   [
    "Veterans Crisis Line",
    "https://www.veteranscrisisline.net"
   ],
   [
    "Beyond the Yellow Ribbon, Minnesota National Guard",
    "https://mn.gov/mnng/resources/beyond-the-yellow-ribbon/"
   ]
  ]
 },
 {
  "id": "coming-home",
  "ring": "br-meaning",
  "title": "Coming home from service",
  "keys": "coming home from service getting out of the military separating discharge ets eas leaving the army leaving the navy leaving the marines leaving the air force back from deployment home from deployment veteran young veteran guard reserve drill civilian life miss my unit miss my friends don't fit in no purpose bored angry can't sleep nightmares drinking more moral injury ptsd tap transition va benefits gi bill county veterans service officer cvso my son is home my daughter is home my partner came home",
  "parts": [
   "trunk",
   "branches",
   "bark"
  ],
  "quick": [
   "Coming home is a big change, even when you're glad to be back. Many young veterans find it harder than they expected, and it gets easier with time and support.",
   "Missing the purpose, structure, and closeness of your unit is common. It makes sense to look for a new mission and new people on purpose.",
   "Benefits and support are there for you to use: a County Veterans Service Officer, the VA, and Military OneSource can help you sort them out.",
   "Veterans and Military Crisis Line: call 988 and press 1, or text 838255, any time."
  ],
  "feel": "Maybe you finished your contract and you're out. Maybe you're back from a deployment and returning to the Guard or Reserve, a job, or school. Civilian life can feel slow, loose, or strangely quiet after the pace and purpose of service. You might miss your unit like family. You might feel older than your friends, or like people your age are worried about things that seem small. Some young veterans sleep badly, feel on edge in crowds, or notice they're drinking more. Some carry memories or choices they made, or saw, that sit heavy and are hard to talk about. Some feel proud, relieved, and lost all at once. Every one of these is part of coming home, and none of it means you're broken.",
  "self": {
   "first": [
    "Build a simple daily rhythm: a wake time, some movement, one thing you'll get done.",
    "Connect with a County Veterans Service Officer, or the Minnesota Department of Veterans Affairs, to learn the benefits and health care you've earned.",
    "Reach out to one person from your unit this week.",
    "If nights are hard, anger flares, or drinking keeps growing, talk with the VA, a Vet Center, or a counselor early. Veterans and Military Crisis Line: 988, then press 1."
   ],
   "helps": [
    "A new mission: school, training, a trade, a job, or service in your community.",
    "Other veterans your age, through a peer group, a veterans group at school, or service projects.",
    "Telling your story, at your pace, to someone who can hear it.",
    "Physical activity and steady sleep, which often help more than people expect.",
    "Naming what you carry. If something you did, saw, or failed to stop weighs on you, that has a name, moral injury, and help exists for it.",
    "Patience. For many people, finding a new normal takes months, not weeks."
   ],
   "tell": [
    "“My service mattered, and so does what comes next.”",
    "“Asking for help is a skill I already have.”",
    "“I'm not behind. I'm on a different road.”"
   ],
   "people": "Try: “I'm finding coming home harder than I expected. I don't need you to fix it, but can I talk it through with you?” To a friend from your unit: “Been thinking about you. How's the outside treating you?”"
  },
  "helper": {
   "feel": "They may feel out of place in the life they left, even with people who love them. They may miss their unit and feel no one at home understands. Some get very busy, some go quiet, and some get irritable over small things. They may carry memories they aren't ready to share. Many want to be treated as the capable adult they became, not as the person who left.",
   "say": [
    "“I'm glad you're home. Take your time.”",
    "“What do you miss about it?”",
    "“I'm here if you ever want to talk, and it's okay if you don't.”",
    "“What would help this week?”"
   ],
   "avoid": [
    "Asking if they killed anyone, or pressing for stories.",
    "Assuming every veteran has PTSD, or that they're fine because they look fine.",
    "Rushing them toward a job or school before they've landed.",
    "Treating them as the person they were before they left."
   ],
   "help": [
    "Make room. Let them set the pace for crowds, gatherings, and big plans.",
    "Help them connect with a County Veterans Service Officer, if they want help sorting out benefits.",
    "Invite them into community and activity, without pushing.",
    "Notice changes: sleep, drinking, anger, pulling away. Ask directly and kindly how they're doing.",
    "If they talk about not wanting to be here, stay with them and help them call 988 and press 1."
   ],
   "you": "Families come home too. Roles shift, routines change, and you may feel shut out or worried. Military OneSource, 800-342-9647, serves families for a period after service; find your own people to talk with as well."
  },
  "faith": "Many traditions have rituals for warriors returning home, to honor their service and help them lay down what they carried. For some veterans, faith is a steady anchor; for others, what they saw shook it. Chaplains, including VA chaplains, serve people of any faith or none, and many are trained to help with moral injury. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "trunk|Purpose Reflection",
   "branches|One Reach-Out a Day",
   "bark|Expressive Writing",
   "leaves|Walk or Jog",
   "leaves|Steady Wake Time",
   "bark|Five Senses Pause"
  ],
  "reach": [
   "Veterans and Military Crisis Line: call 988, then press 1, or text 838255, any time.",
   "Military OneSource: 800-342-9647, any time, for service members and families.",
   "Nightmares, anger, or drinking that keep growing: talk with the VA, a Vet Center, or a counselor. SAMHSA's helpline, 1-800-662-4357, can point you to local help, any time.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team, any time.",
   "Danger right now: call 911."
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
    "National Center for PTSD (VA)",
    "https://www.ptsd.va.gov"
   ],
   [
    "Shay Moral Injury Center (Volunteers of America)",
    "https://www.voa.org/moral-injury-center"
   ],
   [
    "Military OneSource",
    "https://www.militaryonesource.mil/"
   ]
  ]
 },
 {
  "id": "grief-young",
  "ring": "br-meaning",
  "title": "Grief when you're young: a parent, a friend, or a peer dies",
  "keys": "grief grieving my mom died my dad died parent died lost my mother lost my father friend died best friend died classmate died coworker died roommate died someone my age died overdose car crash accident suicide loss died by suicide sudden death funeral can't focus can't stop crying numb angry guilty why didn't i see it no one gets it my friends don't understand anniversary first holidays without them how to help a grieving friend my friend's parent died",
  "parts": [
   "roots",
   "branches",
   "bark"
  ],
  "quick": [
   "Losing a parent, a friend, or someone your age can shake your whole sense of how the world works. There's no right way or right timeline to grieve.",
   "Grief can look like sadness, anger, numbness, guilt, relief, trouble focusing, or getting very busy. All of it is normal.",
   "Many people your age haven't been through a big loss yet, so friends may not know what to say. Look for at least one person who can sit with it.",
   "After a death by suicide or overdose, grief often carries extra questions and guilt. It was not your fault. If you start having thoughts of not wanting to be here, call or text 988."
  ],
  "feel": "Maybe your mom or dad died, suddenly or after a long illness, and you're trying to grieve while handling things no one taught you how to do. Maybe a friend, a roommate, a coworker, or someone you went to school with died, and it feels impossible that someone your age is just gone. You might feel crushing sadness, or nothing at all. You might be angry, at them, at a doctor, at the world. You might replay the last conversation or search for what you missed. Some people feel relief after a long illness, then guilt for the relief. School, work, and friends may expect you to bounce back fast, and people your age may avoid the subject because they don't know what to say. Grief can come in waves for years, sparked by a song, a date, or a milestone they won't be there for.",
  "self": {
   "first": [
    "Let yourself grieve, even while you handle what has to be handled.",
    "Tell your school, your job, or your supervisor what happened, and ask about bereavement leave, extensions, or time off.",
    "Keep some basics going: eating, sleeping, and moving a little each day, even when it's hard.",
    "Find one person who can sit with you in it without trying to fix it."
   ],
   "helps": [
    "Talking about them, telling stories, and saying their name.",
    "A grief group, on campus, through a hospice, a grief center, or online, with people who get it.",
    "Writing to them, or about them, when the feelings pile up.",
    "Marking hard days, like their birthday or the anniversary, in a way that fits you.",
    "Carrying forward what you want to keep from them, and setting down what you don't.",
    "After a suicide loss, a group for suicide loss survivors, and saying it plainly when you're ready: they died by suicide."
   ],
   "tell": [
    "“There's no deadline on this.”",
    "“I can love them and still be angry, or relieved.”",
    "“It was not my fault.”"
   ],
   "people": "Try: “My friend died last month. I'm not okay yet, and I don't need advice. Can I just talk about her sometimes?” To a boss or teacher: “My dad died. I may need some flexibility for a while. Can we talk about what that could look like?”"
  },
  "helper": {
   "feel": "They may feel alone, especially if most of their friends haven't lost someone yet. They may look fine at a party and fall apart at home. Some throw themselves into school or work. Some feel guilty, angry, or numb. After a suicide or an overdose, they may be carrying questions and shame they don't say out loud.",
   "say": [
    "“I'm so sorry. What was he like?”",
    "“I don't know what to say, but I'm here.”",
    "“You can talk about her with me any time.”",
    "“How are you doing today, not overall, just today?”"
   ],
   "avoid": [
    "“Everything happens for a reason,” or “They're in a better place,” unless they say it first.",
    "Asking for details about how they died.",
    "Disappearing after the funeral. The weeks and months after are often hardest.",
    "Expecting them to be over it by a certain time."
   ],
   "help": [
    "Show up with something concrete: food, a ride, help with a task, a walk.",
    "Say the name of the person who died. Most grieving people want to hear it.",
    "Remember hard dates: the birthday, the anniversary, the first holidays.",
    "Watch for signs of deeper trouble: drinking more, not eating or sleeping, or talk of not wanting to be here. Ask directly and kindly. Asking about suicide does not put the idea in someone's head.",
    "If they talk about not wanting to be here, stay with them and call, text, or chat 988 together."
   ],
   "you": "If you knew the person too, you're grieving as well. Let yourself. Being beside someone's grief can stir your own losses; find someone of your own to talk with."
  },
  "faith": "For some people, faith is a deep comfort after a death: prayer, ritual, a community that shows up with food and presence. For others, a young death shakes faith hard, and anger or silence toward God can be part of grief. Many traditions make room for lament. If faith is part of your life, a chaplain or faith leader can sit with your questions without rushing you. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "bark|Name It",
   "bark|Expressive Writing",
   "branches|Ask for Help",
   "branches|Make One Plan",
   "roots|What Holds Me Up",
   "leaves|Sleep"
  ],
  "reach": [
   "Thoughts of not wanting to be here, or of joining the person who died: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Grief that makes daily life hard for weeks on end, or that's tangled with drinking or drugs: talk with a doctor, a counselor, or your campus counseling center. SAMHSA's helpline, 1-800-662-4357, can point you to local help.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team, any time.",
   "Veterans and service members: call 988, then press 1.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "The Dougy Center",
    "https://www.dougy.org"
   ],
   [
    "What's Your Grief",
    "https://whatsyourgrief.com"
   ],
   [
    "Alliance of Hope for Suicide Loss Survivors",
    "https://allianceofhope.org"
   ],
   [
    "American Foundation for Suicide Prevention",
    "https://afsp.org"
   ]
  ]
 },
 {
  "id": "faith-own",
  "ring": "br-meaning",
  "title": "Faith on your own: questions, doubt, and finding a community",
  "keys": "faith on my own my own faith questions about faith doubt doubting god not sure what i believe anymore believe anymore stopped going to church going to church on my own finding a church finding a faith community mosque temple synagogue new to town no faith community deconstructing deconstruction exploring faith spiritual not religious faith in college faith away from home parents' faith different from mine converting changing religion coming back to faith prayer feels empty my kid stopped going to church my kid's faith is changing",
  "parts": [
   "roots",
   "trunk",
   "branches"
  ],
  "quick": [
   "For many people, the years after home are when faith becomes their own. Some grow closer, some step back, some change, and many do a little of each.",
   "Questions and doubt are part of many faith journeys. You can carry them honestly, without deciding everything now.",
   "Finding a community as an adult takes trying. Visit a few, more than once, and notice where you're welcomed with your questions.",
   "However your faith takes shape, you're welcome at Grounded, and so are your questions."
  ],
  "feel": "Maybe you grew up with faith at home, and now no one wakes you for services, and you're noticing what you'd choose on your own. Maybe questions have gotten loud: about suffering, about what you were taught, about whether it fits the life you're living. Maybe you're curious about faith for the first time, or coming back to it after years away. You might feel free, anxious, guilty, lonely, or hopeful, sometimes all at once. You might worry how your family will react if your faith changes, or feel a little lost without the community you grew up in. If you've moved, finding a place to belong can feel like starting from zero. All of this is a normal part of making faith your own.",
  "self": {
   "first": [
    "Write your questions down, honestly, just as they are.",
    "Keep the practices that still feel true, and rest from the ones that don't, for now.",
    "Talk with someone who can sit with questions without panic: a chaplain, a campus minister, a spiritual director, a wise friend.",
    "If you want a community, pick two or three to visit, and give each one more than one try."
   ],
   "helps": [
    "Reading people, from your own tradition or others, who wrestled with the same questions.",
    "A community that welcomes questions and lets you belong before you have it all figured out.",
    "Small, honest practices: a few quiet minutes, a prayer in your own words, a walk outside, a sabbath hour.",
    "Signs of a healthy community: questions are welcome, your boundaries are respected, leaders are accountable, and no one pressures you to give more than you choose.",
    "Patience. Faith rarely moves in a straight line.",
    "If your faith is changing and your family's isn't, talking about the relationship, not just the beliefs."
   ],
   "tell": [
    "“My questions are welcome.”",
    "“I don't have to have it figured out today.”",
    "“I can choose this for myself, at my own pace.”"
   ],
   "people": "Try, to a friend: “I've been thinking a lot about faith lately. Can I talk it through with you, without either of us trying to win?” To family: “My faith is changing in some ways. I still love you, and I want us to stay close.”"
  },
  "helper": {
   "feel": "They may be excited, unsettled, guilty, or relieved, and wary of how you'll react. If your faith matters to you, they may be bracing for disappointment or pressure. Some are exploring faith for the first time and feel shy about it. Most want to be taken seriously as an adult working things out for themselves.",
   "say": [
    "“Those are real questions. Thanks for telling me.”",
    "“What's that been like for you?”",
    "“I love you, wherever this goes.”",
    "“Want to hear how I've wrestled with that, or would you rather I just listen?”"
   ],
   "avoid": [
    "Arguments, ultimatums, or guilt.",
    "Treating their questions as rebellion or a phase.",
    "Asking whether they still believe in God. Ask what their experience has been instead.",
    "Pushing your own faith, or your own lack of it, onto them."
   ],
   "help": [
    "Listen to understand, and say back what you heard before you share your view.",
    "Stay in relationship, whatever they conclude. Keep inviting them to family time that doesn't hinge on agreeing.",
    "If they ask, share your own story honestly, doubts included.",
    "If they want a faith voice, help them find one who can sit with questions: a chaplain, a campus minister, a spiritual director.",
    "If faith questions come tangled with deep sadness, fear, or hopelessness, encourage a counselor who respects faith."
   ],
   "you": "Watching someone you love take a different path than you hoped can stir grief or fear. You don't have to settle their questions to be a good companion. Your love can outlast any disagreement."
  },
  "faith": "This guide's topic is faith, so it sits at the center here. Many traditions include deep doubt among their saints and teachers, and see wrestling as a form of faithfulness. Many young adults find faith grows stronger, changes shape, or rests for a while, and some find it again later in a new community. What matters most is whether faith is a resource for you or a source of stress, and what helps you live well. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "roots|Carry Your Questions",
   "roots|Find Your People for Faith",
   "roots|Spiritual Direction",
   "roots|Sabbath Hour",
   "branches|Active Listening",
   "trunk|Journal"
  ],
  "reach": [
   "Questions tangled with depression, anxiety, or past harm: a counselor who respects faith can help. NAMI HelpLine: 1-800-950-6264, or text NAMI to 62640 (weekdays; not a crisis line).",
   "A group or leader pressuring, controlling, or frightening you: talk with someone you trust outside that group. The guide Hurt by a Faith Community has more.",
   "Thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Souls in Transition: the religious and spiritual lives of emerging adults (Smith with Snell)",
    "https://youthandreligion.nd.edu/announcements/book-announcements/souls-in-transition/"
   ],
   [
    "Pew Research Center, Religious Landscape Study, ages 18 to 29",
    "https://www.pewresearch.org/religious-landscape-study/age-distribution/18-29/"
   ],
   [
    "Exline and colleagues, religious and spiritual struggles (research)",
    "https://doi.org/10.1037/a0036465"
   ]
  ]
 },
 {
  "id": "faith-hurt",
  "ring": "br-meaning",
  "title": "Hurt by a faith community",
  "keys": "hurt by church church hurt religious hurt religious trauma spiritual abuse hurt by my faith community pastor hurt me leader hurt me youth pastor campus ministry judged shamed kicked out shunned gossip controlling church high control group cult pressured to give money pressured to volunteer told i'm going to hell told my doubts were sin leader crossed a line leader touched me covered up abuse hypocrites can't go back to church scared of god anxious in church mosque temple synagogue church hurt my friend was hurt at church",
  "parts": [
   "roots",
   "branches",
   "bark"
  ],
  "quick": [
   "Harm done in the name of faith can wound deeply. Your hurt is real, and it isn't a sign that something is wrong with you or your faith.",
   "If a leader or anyone in a faith group touched you, threatened you, or pressured you sexually, that is never okay, and you can report it. RAINN: 1-800-656-4673. In Minnesota, Day One: 1-866-223-1111.",
   "What people did and what you hold sacred can be two different things. You can sort them out at your own pace.",
   "Healing can mean going back once things are made right, finding a new community, or stepping away. Each can be a healthy choice."
  ],
  "feel": "Maybe a leader shamed you in front of others, or told you your questions were sin. Maybe a group turned cold when your life changed, or when you made a choice they didn't like. Maybe you were pressured to give more money, time, or obedience than you could. Maybe you saw harm covered up, or a leader you trusted crossed a line with you. You might feel angry, grieved, anxious in religious places, or spiritually homeless. Some people feel afraid of God after being hurt by people who spoke in God's name. Some still love their faith and miss their community. Some want nothing to do with it right now. All of that makes sense when a place meant to be safe hurt you.",
  "self": {
   "first": [
    "If anyone hurt you sexually or physically, or is threatening you: you can report it to the police, and get support from RAINN, 1-800-656-4673, or in Minnesota, Day One, 1-866-223-1111. Danger right now: call 911.",
    "Name what happened, even just to yourself, in a few plain sentences.",
    "Find one safe person outside the group to talk with.",
    "Give yourself permission to take space from people and places that stir the hurt."
   ],
   "helps": [
    "Counseling with someone who understands religious harm and respects faith.",
    "Separating what people did from what you value, one piece at a time.",
    "Honest words for the hurt: writing, talking out loud, or, if it fits you, a prayer of lament. Many traditions have these for exactly this.",
    "Boundaries with people and places, including how much you share and with whom.",
    "Other people who've healed from similar hurt, in a group or one on one.",
    "If you want a faith voice, someone from outside the community that hurt you."
   ],
   "tell": [
    "“What happened was not my fault.”",
    "“The sacred is not the same as the people who misused it.”",
    "“I get to set my own pace and my own boundaries.”"
   ],
   "people": "Try: “I had some painful experiences in my faith community. I'm still figuring out what faith looks like for me now. Can I talk with you about it?” To family who still attend: “I'm not ready to go back right now. It's not about you, and I'd like us to stay close.”"
  },
  "helper": {
   "feel": "They may be wary of anyone religious, including you if your faith matters to you. They may worry you'll defend the community or the leader. Some tell only a small piece at first, to see how you react. Some feel shame, as if the hurt were their fault. If a leader hurt them sexually, they may have been told to keep quiet, or may doubt anyone will believe them.",
   "say": [
    "“Thank you for telling me. I believe you.”",
    "“I'm sorry that happened to you.”",
    "“What do you need from me right now?”",
    "“You don't have to decide anything about faith today.”"
   ],
   "avoid": [
    "Defending the community or the leader before you've listened.",
    "“They didn't mean it,” or “Just forgive and move on.”",
    "Pressing them to go back, or to face the person who hurt them.",
    "Telling them the hurt means they're losing their faith."
   ],
   "help": [
    "Listen all the way through. Hold off on explaining or correcting.",
    "If someone hurt them sexually or physically, support their choices about reporting and help them reach RAINN, Day One in Minnesota, or the police.",
    "Respect their pace and boundaries about faith, services, and family events.",
    "If they want a faith voice, help them find one outside the situation: a chaplain, a different leader, a wise friend.",
    "If fear, shame, or low mood hang on, encourage a counselor who understands religious harm."
   ],
   "you": "This may hurt you too, especially if it's your community. You may feel torn. Find someone of your own to talk with, and let them know you're on their side first."
  },
  "faith": "This guide's topic is faith, so it sits at the center here. Many traditions have prophets and teachers who spoke against the abuse of power and called for truth, justice, and repair. Many people find that what people did and what they hold sacred are two different things, and come back to faith in their own time, sometimes in a new community. Others find meaning and peace in other places. Every path is welcome. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "roots|Lament",
   "bark|Self-Compassion Break",
   "bark|Name It",
   "bark|Expressive Writing",
   "roots|What Holds Me Up",
   "branches|Ask for Help"
  ],
  "reach": [
   "Sexual abuse or assault, by a leader or anyone: RAINN, 1-800-656-4673, or text HOPE to 64673, any time. In Minnesota, Day One: 1-866-223-1111, or text 612-399-9995.",
   "Someone you're with controlling or hurting you: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. National Domestic Violence Hotline: 1-800-799-7233.",
   "Fear, shame, or low mood that lasts two weeks or more: talk with a counselor or a doctor. NAMI HelpLine: 1-800-950-6264 (weekdays; not a crisis line).",
   "Thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "RAINN",
    "https://www.rainn.org"
   ],
   [
    "Day One, Minnesota",
    "https://dayoneservices.org/domestic-violence/help-now/"
   ],
   [
    "Exline and colleagues, religious and spiritual struggles (research)",
    "https://doi.org/10.1037/a0036465"
   ]
  ]
 }
];
window.BIRCH_GUIDES = { rings: LC_RINGS, links: L, topics: LC_TOPICS };
})();
