/* =====================================================================
   PINE . WHEN LIFE CHANGES
   Guides for the changes high school brings, for the student going through it and for the grown-up beside them.
   Read by Pine (/pine/), the site-wide search, and Pine Guide in the Field Guide. Each topic has Oak and Sequoia's
   shape: id, ring, title, keys, parts, quick, feel, self {first, helps, tell, people}, helper {feel, say, avoid, help,
   you}, faith, practices ("part|Name", matching pine/practices.js), reach, more. Generated from patches/bld740/source
   in grounded-workshop: edit the data there and rebuild. Kids' faith rules apply.
   ===================================================================== */
(function(){
const LC_RINGS = [
 {
  "key": "pn-school",
  "name": "School and the Future",
  "color": "#2F6B5A",
  "blurb": "Starting high school, pressure, sports, and what comes after."
 },
 {
  "key": "pn-friends",
  "name": "Friends and Dating",
  "color": "#7A4A6A",
  "blurb": "Friend groups, feeling left out, bullying, and first relationships."
 },
 {
  "key": "pn-home",
  "name": "Home and Family",
  "color": "#5A6B2F",
  "blurb": "Divorce, new families, moves, and the hard days at home."
 },
 {
  "key": "pn-loss",
  "name": "Loss and Grief",
  "color": "#6B4A2E",
  "blurb": "When someone dies or is very sick, and when a crash changes everything."
 },
 {
  "key": "pn-body",
  "name": "Body and Health",
  "color": "#3A6B35",
  "blurb": "Sleep, body image, eating, injuries, illness, and substances."
 },
 {
  "key": "pn-mind",
  "name": "Mind and Mood",
  "color": "#3F5A7A",
  "blurb": "Anxiety, depression, self-harm, and getting counseling."
 },
 {
  "key": "pn-online",
  "name": "Safety and Online Life",
  "color": "#8A4A2C",
  "blurb": "Phones, pictures, pressure online, gambling, and staying safe."
 },
 {
  "key": "pn-meaning",
  "name": "Work, Money, Faith, and Meaning",
  "color": "#5E4A7A",
  "blurb": "A first job, money, faith questions, and finding purpose."
 }
];
const L = {};
const LC_TOPICS = [
 {
  "id": "start-hs",
  "ring": "pn-school",
  "title": "Starting high school",
  "keys": "starting high school ninth grade 9th grade freshman first year new school bigger school lost nervous first day lunch who to sit with no friends friends split up new schedule more homework harder classes lockers getting lost transition from middle school fitting in clubs teams where do i belong",
  "parts": [
   "branches",
   "bark",
   "trunk"
  ],
  "quick": [
   "Ninth grade is a real turning point. Feeling nervous, lost, or excited (or all three) is normal.",
   "Belonging protects you. One club, team, or group, and one adult at school you could go to, make a big difference.",
   "Brains grow with challenge. A hard class means you're learning, not that you're behind.",
   "Give it a season. Most students find their footing by winter, especially once they find their people."
  ],
  "feel": "The building is bigger, the hallways are louder, and nobody walks you to class. Friends from middle school may land in different lunches, or drift toward new people. Classes move faster, and the grades start to feel like they count. Some days you might feel grown up and on your own, and other days small and invisible. You may miss how easy it was to know where you fit. Some students feel excited and nervous in the same hour. If you came from a different town or a small school, or you're the first in your family here, it can feel like everyone else got a map you didn't. All of it is common, and it does get easier.",
  "self": {
   "first": [
    "Learn the map early: walk your schedule once, find the counseling office, the nurse, and a quiet spot you like.",
    "Pick one club, team, or group to try three times before you decide. Belonging usually takes a few visits.",
    "Name one adult at school you could go to: a teacher, coach, counselor, or anyone who's kind to you. Say hello on purpose this week."
   ],
   "helps": [
    "A simple weekly plan: one place where you write every assignment, and one time each week to look at what's due.",
    "Asking the teacher early when a class feels confusing. Teachers notice students who ask, and it's what office hours are for.",
    "Remembering that a hard class means your brain is building something. Struggle is part of learning, not proof you can't do it.",
    "Sleep. Teens need about 8 to 10 hours. Charging your phone outside your room helps more than almost anything.",
    "Saying yes to small invitations, and offering a few: sit with someone new, ask a classmate to study."
   ],
   "tell": [
    "“Everyone here is figuring it out, not just me.”",
    "“Hard means I'm learning.”",
    "“I don't need to find my people this week. I just need to keep showing up.”"
   ],
   "people": "Try, with a classmate: “Want to sit together?” or “Do you get this assignment? I'm stuck on number three.” With a teacher: “Can I come in before school to ask about this?” At home: “Can I tell you about my day without it turning into a talk about grades?”"
  },
  "helper": {
   "feel": "They may be thrilled and scared at once, and may show you only one of those. Many ninth graders go quiet at home while they work out where they fit at school. Grades can dip in the first term as the pace and the freedom jump. Some lose old friends, or worry they will. Underneath, most are asking, “Do I belong here, and can I handle this?”",
   "say": [
    "“What's one thing that surprised you this week?”",
    "“Who do you sit with at lunch? Who seems kind?”",
    "“Hard classes mean your brain is growing. What helped you get through the last hard thing?”",
    "“Is there an adult at school you'd go to if you needed something?”"
   ],
   "avoid": [
    "“These are the best years of your life.” It can make a hard week feel like failure.",
    "Making every conversation about grades.",
    "Emailing teachers for them before they've had a chance to ask themselves.",
    "Comparing them to a sibling, a cousin, or yourself at that age."
   ],
   "help": [
    "Help them find one club, team, or group, and drive them there the first few times if that's what it takes.",
    "Keep sleep protected: phones charge outside the bedroom, and a steady wake time, even on weekends.",
    "Ask what would help before you step in. Coach them to email or talk with a teacher themselves, and offer to read the email first.",
    "Expect a bumpy first term. Praise effort, strategy, and asking for help more than the grade.",
    "Get to know one adult at school yourself: their counselor, a coach, or an advisor."
   ],
   "you": "Your job shifts this year from managing to coaching. Stay curious, keep the door open, and let them tell you about their life in their own time. If they use Pine, you will never see their answers; if they ever seem unsafe, you'll get only a quiet “Please check in” alert. What you know about their life will mostly come from what they choose to tell you, and they tell more when it feels safe to."
  },
  "faith": "Some students find belonging in a youth group, a faith community, or a quiet minute of prayer before a hard day. Others find it in a walk, music, or a few slow breaths. If faith is part of your life, it can be one steady place while everything else is new. If it isn't, the same need points to whatever helps you feel grounded and not alone.",
  "practices": [
   "branches|Clubs",
   "branches|Name Your Trusted Adult",
   "trunk|My Brain Grows",
   "trunk|Study Sprints",
   "leaves|Phone Outside the Bedroom",
   "bark|Before the Big Moment"
  ],
  "reach": [
   "Feeling lost, lonely, or not like yourself for two weeks or more: talk with your school counselor, your doctor, or an adult you trust. You don't need a big reason to ask.",
   "Someone bullying, threatening, or hurting you, at school, online, or anywhere: tell an adult at school you trust. Childhelp, 1-800-422-4453 (call or text, any time). In Minnesota: Day One, 1-866-223-1111.",
   "Feeling like there's no point, or thinking about not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Want to talk with someone your age? Teen Line: call 800-852-8336 (8 p.m. to midnight Central), or text TEEN to 839863.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "The Jed Foundation",
    "https://jedfoundation.org"
   ]
  ]
 },
 {
  "id": "grades-pressure",
  "ring": "pn-school",
  "title": "Grades, pressure, and perfectionism",
  "keys": "grades pressure perfectionism perfectionist gpa stress school stress test anxiety bad grade failing a class not good enough never enough ap classes honors class rank college applications parents expectations disappoint my parents all nighter staying up late studying burnout overwhelmed too much homework procrastination afraid to fail comparing grades",
  "parts": [
   "bark",
   "trunk",
   "leaves"
  ],
  "quick": [
   "Caring about school is a strength. Pressure turns harmful when your worth starts riding on every grade.",
   "Perfectionism has been rising among young people. You're not weak for feeling it, and it can loosen.",
   "Aim for excellent and finished, not flawless. Good work handed in beats perfect work that never gets done.",
   "Sleep, rest, and people you love are part of doing well, not a reward for it."
  ],
  "feel": "Maybe one grade can ruin your whole week. Maybe you reread an assignment ten times, or put it off because it can't be perfect yet. You might stay up past midnight, then feel foggy all day. A B can feel like a failure, and an A just feels like relief, not joy. Some students feel the pressure from parents, coaches, or college talk; others put it on themselves, and some can't tell the difference anymore. You may be afraid of letting people down, or of finding out you're not as smart as people think. Underneath, it can feel like you are only as good as your last score. That feeling is common, and it is not the truth about you.",
  "self": {
   "first": [
    "Tonight, set a stopping time for homework, and protect at least 8 hours for sleep. Teens need about 8 to 10.",
    "Pick one assignment this week to make good and finished, not perfect. Hand it in on time and notice what happens.",
    "When a grade stings, use three lines: What happened. What I can control. One next step this week."
   ],
   "helps": [
    "Short work blocks with real breaks. Twenty-five focused minutes, phone in another room, beats three distracted hours.",
    "Talking to yourself the way you'd talk to a good friend who got the same grade.",
    "Asking the teacher what “good” looks like on an assignment, so you know when you're done.",
    "Doing something every week that isn't graded: a sport, music, art, time with friends, time outside.",
    "Remembering that mistakes are how brains learn. Every expert you admire got a lot of things wrong first.",
    "Telling one adult the truth about how much pressure you feel. You don't need to carry it alone."
   ],
   "tell": [
    "“I'm more than my GPA.”",
    "“Done is a skill too.”",
    "“A hard grade is information, not a verdict.”",
    "“I can care a lot and still rest.”"
   ],
   "people": "Try, at home: “I'm putting so much pressure on myself that I can't sleep. Can we talk about what really matters?” With a teacher: “Can you show me what a strong answer looks like here?” With a friend: “Want to study together and then actually take a break?”"
  },
  "helper": {
   "feel": "A high-pressure student may look fine, even impressive, from the outside. Inside, many feel their worth rides on every score, dread disappointing the people they love, and can't stop working even when they're exhausted. Some freeze and procrastinate because starting means risking imperfect work. They may not tell you, especially if they think you expect top grades.",
   "say": [
    "“I love you the same with any grade.”",
    "“Tell me about it. What happened?” (before any advice)",
    "“What would you choose if no one else's expectations counted?”",
    "“What's the smallest step that would make tomorrow easier?”",
    "“You look tired. What could you set down this week?”"
   ],
   "avoid": [
    "Asking about grades first, every day.",
    "“Just do your best,” said while reacting strongly to every grade below an A.",
    "Comparing them to siblings, classmates, or what you did at their age.",
    "Praising only results, like “You're so smart.” Praise effort, strategy, and courage to try hard things instead.",
    "Treating all nighters as dedication."
   ],
   "help": [
    "Protect sleep as firmly as homework: a stopping time, and phones charging outside the bedroom.",
    "Notice and name things you value in them that have nothing to do with school.",
    "Help them sort what truly matters this week from what can be good enough.",
    "If they seem stuck, ask if they'd like to talk with the school counselor, and offer to help set it up.",
    "Look at your own pressure, too. Ask yourself whose goal this is, and talk about it together."
   ],
   "you": "Warmth plus clear, reasonable expectations is what helps teens do well. Your steady love, shown on a bad-grade day, teaches more than any lecture. If they use Pine, their answers stay private to them; if they ever might not be safe, you'll get only a quiet “Please check in” alert."
  },
  "faith": "Some people find that faith loosens the grip of perfectionism: the sense that they are loved and worthy before they achieve anything. For some, that comes through prayer, a faith community, or words from scripture; for others, through people who love them as they are, or quiet time outside. If faith is part of your life, you might bring the pressure there honestly. If it isn't, the same truth stands: your worth isn't something you earn with grades.",
  "practices": [
   "bark|Self-Compassion Break",
   "bark|Slow Exhale",
   "bark|Bounce Back From a Setback",
   "trunk|Study Sprints",
   "trunk|My Brain Grows",
   "leaves|Sleep"
  ],
  "reach": [
   "Stress, worry, or low mood that lasts two weeks or more, or gets in the way of sleep, eating, or friends: talk with your school counselor or doctor.",
   "Feeling like you'll never be enough, or like there's no point: tell an adult you trust today. Call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Want to talk with someone your age? Teen Line: call 800-852-8336 (8 p.m. to midnight Central), or text TEEN to 839863.",
   "For grown-ups looking for guidance and support: NAMI HelpLine, 1-800-950-6264, weekdays.",
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
  "id": "adhd",
  "ring": "pn-school",
  "title": "ADHD and learning differences",
  "keys": "adhd add attention focus can't focus distracted forgetful lose things missing assignments late work procrastination learning disability learning difference dyslexia dyscalculia slow reader processing iep 504 plan accommodations extra time testing transition planning special education medication meds driving with adhd college disability services my brain works differently",
  "parts": [
   "trunk",
   "bark",
   "branches"
  ],
  "quick": [
   "ADHD and learning differences are about how a brain works, not how hard you try or how smart you are.",
   "High school brings more freedom and fewer reminders, so things that used to work may stop working. That's a signal to change the system, not to blame yourself.",
   "Knowing your own brain, and asking for what helps, is a skill you can build now and use for life.",
   "Plan for after high school early. In Minnesota, IEP transition planning starts by ninth grade, and supports in college or at work have to be asked for."
  ],
  "feel": "High school hands you more freedom, more deadlines, and fewer reminders. If you have ADHD or a learning difference, that can mean missing assignments you actually did, losing track of time, rereading the same page, or freezing in front of a big project. People may say you're lazy or not trying, when you're working harder than they know. You might feel frustrated, embarrassed to use accommodations, or tired of being different. Some students hide it; some get labeled before anyone asks how their brain works. You might also notice real strengths: creativity, energy, noticing things others miss, or going deep on what you care about. All of it can be true at once.",
  "self": {
   "first": [
    "Write one sentence that starts “It helps me when...” (more time, directions in writing, a seat near the front, breaks). That sentence is the start of speaking up for yourself.",
    "Make one place for every assignment, and look at it at the same time every day. Let your phone remind you; that's using a tool, not cheating.",
    "If you have an IEP or 504 plan, ask to see it, and ask to come to the next meeting. It's about you, and your voice counts there."
   ],
   "helps": [
    "Short work blocks with a timer and real breaks. Starting is often the hardest part, so make the first step tiny.",
    "Breaking big projects into small, dated steps, and putting the dates where you'll see them.",
    "Moving your body: a walk, a sport, a stretch break between work blocks. Many people focus better after they move.",
    "Talking with a teacher early, before you're behind: “This is what helps me learn. Can we try it?”",
    "Learning what your plan includes, and using it without apology. Accommodations level the field so you can show what you know.",
    "Finding people who get it: a counselor, a coach, a friend with a similar brain, a group for students with learning differences."
   ],
   "tell": [
    "“My brain works differently, not worse.”",
    "“Asking for what I need is a skill.”",
    "“Missing something doesn't mean I didn't care.”"
   ],
   "people": "Try, with a teacher: “I have a plan that includes extra time. Can we set that up for the test on Friday?” Or: “I learn better when I can see the directions written down. Could you post them?” At home: “I'd like to try handling this myself first. Can you check in with me Thursday instead of every night?”"
  },
  "helper": {
   "feel": "Many teens with ADHD or learning differences have heard for years that they could do better if they tried harder. By high school, some are worn out, ashamed, or done asking for help. The jump in independence can make grades slip even when effort goes up. Underneath, many want two things at once: more freedom, and more support that doesn't feel like being managed.",
   "say": [
    "“What do you think would actually help?”",
    "“You know your brain better than anyone. Let's use that.”",
    "“Using your accommodations is using the tools you have a right to.”",
    "“I noticed how you kept going on that. That took real effort.”"
   ],
   "avoid": [
    "“You're just not trying.” or “You'd do fine if you cared.”",
    "Doing the work for them the night before it's due.",
    "Talking about them, instead of with them, at school meetings.",
    "Treating grades as the only measure of who they are."
   ],
   "help": [
    "Shift from managing to coaching: ask what helps, build the system together, then step back a little at a time.",
    "Bring them to IEP or 504 meetings, and let them lead part of it. In Minnesota, IEP transition planning starts by ninth grade.",
    "Plan early for after high school. IEPs and 504 plans end at graduation; colleges and employers have their own process, and the student must ask for supports themselves, usually with recent paperwork.",
    "Talk honestly about driving. Teens with ADHD have a somewhat higher crash risk, so practice extra hours together and keep the phone out of reach while driving.",
    "If they take medicine for ADHD, talk about keeping it safe and never sharing or selling it. Questions about medicine go to their doctor or pharmacist.",
    "Notice and name their strengths often. Many teens with ADHD hear far more about what went wrong than what went right."
   ],
   "you": "Your patience matters, and so does your rest. If you also have ADHD or a learning difference, your story can help: tell them what worked for you, and what you wish someone had told you. A support group for parents can help you carry this too."
  },
  "faith": "Some families find that faith speaks to this directly: each person made with their own gifts, and loved before they accomplish anything. If faith is part of your life, that can be a steady place on a hard school day. If it isn't, the same truth holds: your worth isn't measured in assignments turned in.",
  "practices": [
   "trunk|Study Sprints",
   "trunk|Name Your Gifts",
   "branches|Ask for Help",
   "leaves|Stretch Break",
   "bark|Bounce Back From a Setback",
   "trunk|Life Skill of the Month"
  ],
  "reach": [
   "Questions about ADHD, learning differences, or medicine: talk with your doctor. For an evaluation or a school plan, ask your school counselor or the school's special education team.",
   "In Minnesota, PACER Center helps families and students with IEPs, 504 plans, and planning for life after high school.",
   "Feeling hopeless, worn out, or like you'll never measure up, for two weeks or more: tell an adult you trust or your counselor. Thinking about not wanting to be alive: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "For grown-ups looking for guidance and support: NAMI HelpLine, 1-800-950-6264, weekdays.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "CHADD (ADHD)",
    "https://chadd.org"
   ],
   [
    "Understood (learning and thinking differences)",
    "https://www.understood.org"
   ],
   [
    "PACER Center: transition to life after high school",
    "https://www.pacer.org/transition/"
   ],
   [
    "Minnesota Rules 3525.2900: transition planning",
    "https://www.revisor.mn.gov/rules/3525.2900/"
   ]
  ]
 },
 {
  "id": "sports-cut",
  "ring": "pn-school",
  "title": "Sports: getting cut, injury, and burnout",
  "keys": "sports got cut cut from the team didn't make varsity tryouts bench playing time injury injured torn acl broken out for the season concussion overuse burnout don't love it anymore want to quit quitting a sport one sport all year club team travel team scholarship pressure coach yells athlete identity who am i without my sport",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "Getting cut, getting hurt, or losing your love for a sport can feel like losing part of who you are. That grief is real.",
   "You are more than your position. The discipline, teamwork, and grit you built come with you.",
   "Rest is part of training. Pediatric sports doctors advise at least one or two days off a week, and breaks from your main sport during the year.",
   "After any hit to the head, stop and get checked. Return only when a health care provider clears you."
  ],
  "feel": "You checked the list and your name wasn't there. Or you heard the pop in your knee, and the season ended in a second. Or nothing happened at all, except the sport you used to love started to feel like a job. Any of these can hit hard. Your sport may be where your friends are, how you handle stress, how people know you, and maybe part of your plan for the future. You might feel embarrassed, angry at a coach, jealous of teammates, or lost about what to do after school now. If you're hurt, you might feel cut off from the team while everyone else keeps going. If you want to quit, you might feel guilty about the time and money your family put in. All of it makes sense.",
  "self": {
   "first": [
    "Let yourself be upset. Talk to one person you trust before you decide anything big, like quitting everything.",
    "Write three lines: What happened. What I can control. One next step this week.",
    "If you're hurt, follow your recovery plan exactly, and ask your coach how you can stay part of the team while you heal."
   ],
   "helps": [
    "Keeping your body moving in ways your doctor or trainer okays. Moving still helps your mood, even when you can't play.",
    "Asking the coach, calmly and in person, what to work on. “What would make me a stronger player next season?”",
    "Trying a different sport, a different level (club, intramural, community), or a different role: manager, stats, coaching younger kids.",
    "Taking a real rest day each week, and real breaks from your main sport during the year. Bodies get stronger during rest.",
    "Remembering who you are off the field: a friend, a sibling, a student, a person with other gifts worth growing.",
    "Spending time with people who know you outside your sport."
   ],
   "tell": [
    "“I'm more than my position.”",
    "“What I built in this sport comes with me.”",
    "“Resting is part of getting stronger.”",
    "“I'm allowed to love a sport, and I'm allowed to stop.”"
   ],
   "people": "Try, with a coach: “Can we talk about what I can work on?” With a parent: “I don't think I love this anymore. Can we talk about it without deciding tonight?” With a teammate who made it when you didn't: “Congrats. It stings for me, but I'm glad for you.”"
  },
  "helper": {
   "feel": "For many teens, a sport is their friends, their schedule, their stress relief, and their sense of who they are. Getting cut or injured can feel like all of that vanishing at once. Burnout often looks like irritability, dread before practice, nagging injuries, or grades slipping, and some teens won't say they want to stop because they don't want to disappoint you.",
   "say": [
    "“I love watching you play.” (not a review of the game)",
    "“That's a real loss. I'm sorry.”",
    "“Do you still enjoy it? It's okay to tell me either way.”",
    "“Who are you, besides an athlete? I'd like to know that person more, too.”"
   ],
   "avoid": [
    "Replaying every mistake in the car on the way home.",
    "“You'll make it next year,” before they've had a chance to be sad.",
    "Talking about the time and money spent when they're thinking about stopping.",
    "Pushing them back to play before a health care provider clears them, especially after a hit to the head."
   ],
   "help": [
    "Let them grieve first. Plans and pep talks can come later.",
    "Protect rest: at least one or two days off from organized sport each week, and breaks from their main sport during the year.",
    "Encourage more than one sport or activity while they're still growing. Doing one sport all year raises the risk of overuse injury and burnout.",
    "After any hit to the head, keep them out until a health care provider clears them, and watch for headaches, fogginess, or mood changes in the days after.",
    "Help them stay connected to friends and a team, even in a new role.",
    "Notice and name who they are off the field."
   ],
   "you": "It's natural to grieve their sport too, especially if it was part of your life together. Find your own place to say that. Your love, shown the same way whether they start, sit, or stop, is the thing they'll remember."
  },
  "faith": "Some athletes find steadiness in a short prayer before a game, or in a faith community that knows them apart from their sport. Others find it in quiet time, music, or a long walk. If faith is part of your life, you can bring this loss there honestly. If it isn't, the same truth holds: you are worth far more than what you do on the field.",
  "practices": [
   "bark|Bounce Back From a Setback",
   "leaves|Rest Day",
   "bark|Before the Big Moment",
   "trunk|Name Your Gifts",
   "leaves|Stretch Break",
   "branches|Clubs"
  ],
  "reach": [
   "Any hit to the head: stop playing and get checked. Watch for headache, dizziness, confusion, or mood changes, and see a health care provider before returning.",
   "Pain that won't go away, or an injury that keeps coming back: tell your coach, athletic trainer, or doctor.",
   "A coach, teammate, or anyone in your sport hurting you, threatening you, touching you in a way that feels wrong, or hazing: tell an adult you trust outside the team. Childhelp, 1-800-422-4453 (call or text, any time). In Minnesota: Day One, 1-866-223-1111. Danger right now: 911.",
   "Low mood that lasts two weeks or more, or feeling like there's no point: tell an adult you trust, or call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "If food, weight, or training starts to feel like rules you can't break, tell someone you trust. ANAD Helpline: 1-888-375-7767, weekdays."
  ],
  "more": [
   [
    "CDC HEADS UP (concussion)",
    "https://www.cdc.gov/heads-up/"
   ],
   [
    "AAP: sports specialization in young athletes",
    "https://publications.aap.org/pediatrics/article-pdf/138/3/e20162148/1344770/peds_20162148.pdf"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ]
  ]
 },
 {
  "id": "path-after",
  "ring": "pn-school",
  "title": "Choosing a path after high school",
  "keys": "what should i do after high school future plans no idea what i want to do career college or not trade school apprenticeship community college four year college military enlist service americorps gap year work full time stay home live at home major undecided pressure to go to college fafsa financial aid cost of college everyone else knows",
  "parts": [
   "trunk",
   "fruit",
   "branches"
  ],
  "quick": [
   "There's more than one good path: college, community college, a trade or apprenticeship, work, the military, service, a gap year, or staying close to home.",
   "You don't need your whole life figured out. You need a next step that fits who you are right now.",
   "Purpose grows through the high school years. It has three parts: what matters to you, what you're working toward, and who it helps.",
   "Paths can change. Many people try one road, learn from it, and turn."
  ],
  "feel": "Everyone keeps asking, “So what's the plan?” Some classmates seem to know exactly what they're doing, and you might not have a clue. Or you have an idea, but it isn't the one your family expects. You might feel pressure to pick a college because everyone else is, or guilt about the cost, or worry about leaving people who need you at home. Maybe you love working with your hands, or you want to serve, or you just need time to figure things out. Not knowing yet is normal. So is changing your mind.",
  "self": {
   "first": [
    "Write three short lists: what I care about, what I'm good at or getting good at, and who I'd like to help.",
    "Pick one path you're curious about, and one person who's on it. Ask them how they got there and what a normal day is like.",
    "Meet with your school counselor this term, even if you have no idea yet. That's exactly what they're there for."
   ],
   "helps": [
    "Trying things before you decide: a job shadow, a summer job, a class at a community college, volunteering, a career fair.",
    "Looking at the real costs and real supports of each path: financial aid, apprenticeships that pay while you learn, service programs that help with school costs later.",
    "Thinking about what kind of days you want: indoors or outside, with people or with tools, the same each day or always different.",
    "Remembering that a job during school is fine, and most students do well at 20 hours a week or less. More than that tends to crowd out school and sleep.",
    "Keeping a page for your ideas, and adding one thing at a time."
   ],
   "tell": [
    "“I don't need a whole plan. I need a next step.”",
    "“My path doesn't have to look like anyone else's.”",
    "“I can change my mind. That's how people find their way.”"
   ],
   "people": "Try, at home: “I'm still figuring this out, and I want to talk about what I care about before we talk about schools.” With an adult whose work interests you: “Could I ask you a few questions about how you got where you are?” With your counselor: “Can you help me look at a few different kinds of paths?”"
  },
  "helper": {
   "feel": "Teens can feel crushed by the question “What's next?”, especially when friends seem sure or family expects one road. Some quietly carry worries about money, a family that needs them nearby, or being the first in their family to go beyond high school. Others know what they want and fear you'll be disappointed. Many simply need more time.",
   "say": [
    "“What do you care about? Let's start there.”",
    "“There's more than one good path. I want to help you find yours.”",
    "“What kind of days do you want to have?”",
    "“Who do you know who's doing something interesting? Want to ask them about it?”"
   ],
   "avoid": [
    "Treating any path other than a four-year college as settling.",
    "Comparing their plans to siblings, cousins, or friends.",
    "Asking “So what's the plan?” at every family gathering.",
    "Choosing the path for them, or quietly steering every conversation back to your preference."
   ],
   "help": [
    "Start from their values and interests, then look at paths that fit, not the other way around.",
    "Help them try things: job shadows, summer jobs, a college class, a tour of a training center, a talk with a recruiter and with someone who served.",
    "Sit down together with real numbers: costs, financial aid, paid apprenticeships, and what each path asks of them.",
    "Introduce them to adults whose work or path interests them.",
    "Keep work during the school year at about 20 hours a week or less when you can."
   ],
   "you": "Their path may not be the one you pictured, and that can bring its own grief. Name that to someone else, not to them. What they need from you most is belief that they can find their way, and a home base while they do."
  },
  "faith": "For some students, faith shapes this question deeply: what they feel called toward, or how they want to serve. Prayer, a mentor in their faith community, or quiet time can help them listen. For others, the same question points to their values and the people they want to help. Either way, the question is less “What will impress people?” and more “What is mine to do next?”",
  "practices": [
   "trunk|Purpose Reflection",
   "trunk|Ask Someone About Their Path",
   "trunk|Next Steps Page",
   "trunk|Values Sort",
   "trunk|Name Your Gifts",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Feeling stuck, hopeless, or like you have no future, for two weeks or more: talk with your school counselor or an adult you trust.",
   "Feeling like there's no point, or thinking about not wanting to be alive: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Military families with questions about service or military life: Military OneSource, 800-342-9647, any time.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Federal Student Aid (FAFSA)",
    "https://studentaid.gov"
   ],
   [
    "Minnesota Office of Higher Education",
    "https://www.ohe.state.mn.us"
   ],
   [
    "Apprenticeship.gov: find an apprenticeship",
    "https://www.apprenticeship.gov"
   ],
   [
    "AmeriCorps: ways to serve",
    "https://americorps.gov/serve"
   ]
  ]
 },
 {
  "id": "graduation",
  "ring": "pn-school",
  "title": "Graduation, college, and leaving home",
  "keys": "graduation graduating senior year last year of high school leaving home moving out going to college dorm roommate freshman year first year homesick lonely at college miss home miss my friends saying goodbye starting a job moving away basic training trade school turning 18 adult now parents letting go empty nest",
  "parts": [
   "branches",
   "fruit",
   "bark"
  ],
  "quick": [
   "Senior year and leaving home bring excitement and grief together, for teens and for the people who love them. Both are real.",
   "Whatever comes next, college, work, training, service, or a gap year, the first months are a big adjustment. Homesickness and loneliness are common, and they usually ease.",
   "Get ready in more ways than one: life skills, money basics, and knowing where to find help when you feel low.",
   "Stay connected without hovering. Agree together on how and how often you'll talk."
  ],
  "feel": "Senior year can feel like a countdown. Every game, concert, and ordinary Tuesday might be one of the last. You may be counting the days until you're on your own, and also wondering who you'll be without your friends, your room, and the people who know you. Some seniors pull away from family and argue more; others hold on tighter. Both are ways of getting ready to say goodbye. After you leave, the first weeks can bring a rush of freedom and a wave of homesickness, sometimes in the same night. If you're staying home while friends leave, that can bring its own kind of loss. All of it is normal.",
  "self": {
   "first": [
    "Before you go, learn three life skills you don't have yet: laundry, a simple meal, a budget, scheduling your own doctor visit.",
    "Find out where help lives in your next place: the campus counseling center, a health clinic, a resident advisor, or the people program at work or in training. Save 988 in your phone; it works anywhere in the country.",
    "Make a plan with home: how and how often you'll talk, decided together."
   ],
   "helps": [
    "Saying goodbye on purpose: a last walk, a thank you note to a teacher or coach, a photo with the people who shaped you.",
    "Joining one thing in the first two weeks: a club, an intramural team, a faith or service group, a study group. Go three times before you decide.",
    "Keeping your sleep, meals, and movement steady. They're the first things to slip, and they hold up your mood.",
    "Leaving your door open in the first weeks, and saying yes to small invitations.",
    "Telling someone early if you feel low, instead of waiting until it's heavy."
   ],
   "tell": [
    "“I can be excited and sad at the same time.”",
    "“Homesick means I have people worth missing.”",
    "“Asking for help is part of being on my own.”"
   ],
   "people": "Try, at home: “I'm excited, and I'm going to miss you. Can we figure out how we'll stay in touch?” In a new place: “Want to grab food?” or “Where do people go to study here?” If you're struggling: “I'm having a harder time adjusting than I thought. Can we talk?”"
  },
  "helper": {
   "feel": "The last year of high school can feel like a countdown for everyone. Teens may pull away, argue more, or cling tighter, often all in the same month. That is usually how people get ready to say goodbye. Underneath, many are excited and scared, eager to go and afraid to lose what they have. You may be proud and grieving at the same time.",
   "say": [
    "“I'm proud of you, and I'm going to miss you. Both are true.”",
    "“What are you most excited about? Most nervous about?”",
    "“If it gets hard out there, call me. Or call or text 988. You don't need to tough it out alone.”",
    "“How often would you like to talk? Let's decide together.”"
   ],
   "avoid": [
    "Comparing their plans to siblings or friends.",
    "Treating any path other than college as second best.",
    "Checking in so often that they can't build their own life where they are.",
    "Saying “These will be the best years of your life.” A hard first semester can then feel like failure."
   ],
   "help": [
    "Teach the basics before they go: money, laundry, cooking, making appointments, and handling a roommate conflict.",
    "Talk about mental health before they leave: what low feels like for them, where counseling is, and that 988 works anywhere.",
    "Talk honestly about alcohol, parties, and consent, with respect, as you would with an adult.",
    "Once they turn 18, or start college, many school records and health information become theirs to share. Talk together about what, if anything, they'd like you to be able to see, and which forms that takes.",
    "Agree on a rhythm for staying in touch, and let them lead it.",
    "Expect a wobble in the first months. Listen first, and let them try their own solutions before you offer yours."
   ],
   "you": "Letting go is its own grief, even when you're proud. Name it with a friend, a partner, or your own support. Fill some of the new space at home with things that feed you. The way you say goodbye, warmly and with trust, will stay with them."
  },
  "faith": "Many traditions mark big leavings with a blessing, a prayer, or a meal together. If faith is part of your family's life, you might bless them before they go, or help them find a faith community in their new place. If it isn't, a goodbye meal, a letter, or a few words of trust can carry the same love. Either way, the message is the same: you go with our love.",
  "practices": [
   "fruit|Future Me Letter",
   "branches|Gratitude Letter",
   "trunk|Life Skill of the Month",
   "branches|Clubs",
   "branches|One Reach-Out a Day",
   "leaves|Steady Wake Time"
  ],
  "reach": [
   "Homesick, lonely, or low for more than a few weeks, or it's getting in the way of classes, work, sleep, or eating: go to your campus counseling center, a doctor, or a trusted adult.",
   "Feeling hopeless, or thinking about not wanting to be alive: call, text, or chat 988, any time, anywhere in the country. Or text HOME to 741741.",
   "Someone hurting you, pressuring you, or controlling you, including someone you're dating: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522. Sexual assault: RAINN, 1-800-656-4673. In Minnesota: Day One, 1-866-223-1111.",
   "Drinking or drug use getting out of hand: SAMHSA National Helpline, 1-800-662-4357, any time.",
   "Military families: Military OneSource, 800-342-9647, any time.",
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
    "FERPA: when records become the student's",
    "https://studentprivacy.ed.gov/content/eligible-student"
   ]
  ]
 },
 {
  "id": "friend-changes",
  "ring": "pn-friends",
  "title": "Friendship changes and losing a friend group",
  "keys": "friends friend group lost my friends friend breakup best friend dropped me ghosted grew apart new friend group sit alone at lunch no one to sit with group chat left out of the chat friends changed drama fight with best friend friends moved on starting over making new friends lonely at school",
  "parts": [
   "branches",
   "bark",
   "trunk"
  ],
  "quick": [
   "Friend groups shift a lot in high school. Losing one can hurt as much as any breakup.",
   "Growing apart is common and often nobody's fault. People change as they figure out who they are.",
   "Belonging protects you. Look for it in more than one place: a team, a club, a job, a class, a youth group.",
   "New friendships grow from small, repeated time together. Give it a season, not a weekend."
  ],
  "feel": "One week you had a group, a lunch table, a group chat that never stopped. Then something shifted. Maybe there was a fight. Maybe they just started hanging out without you, and you found out from a story post. Maybe you're the one who changed, and you feel guilty about it. It can feel embarrassing, lonely, and confusing all at once. Walking into the cafeteria can feel like a test. You might replay every conversation looking for what went wrong, or tell yourself it doesn't matter when it really does. Some people feel angry, some feel flat, some feel relieved and then sad. All of it makes sense. Friends are a huge part of life at this age, and losing them is a real loss.",
  "self": {
   "first": [
    "Give yourself permission to be sad about it. This is a real loss, even if no one else calls it one.",
    "Mute the group chat or the stories that keep stinging, for now. You can always unmute later.",
    "Plan your hardest moments: where you'll sit at lunch, who you'll walk with, what you'll do on Friday night. A plan beats a dread.",
    "Send one low-pressure message to someone outside the old group: a teammate, a lab partner, a cousin, a neighbor."
   ],
   "helps": [
    "Having more than one place you belong, so one group never holds everything: a team, a club, band, theater, a job, a youth group, a volunteer shift.",
    "Saying yes to small things: studying together, a ride home, a pickup game. Friendships grow from repeated, ordinary time.",
    "If there was a fight, owning your part, once, without groveling. Then letting them decide what comes next.",
    "Keeping your story kind. Skip posting about them or venting in public. It almost always comes back around.",
    "Talking with someone who knows you outside school: a sibling, a cousin, a coach, a grown-up you trust.",
    "Moving your body, sleeping enough, and getting outside. A hurting mood is heavier when you're running on empty."
   ],
   "tell": [
    "“Losing a friend group doesn't mean something is wrong with me.”",
    "“People grow in different directions. That's part of growing up.”",
    "“I'm allowed to miss them and still move forward.”",
    "“My people are out there. Some of them I haven't met yet.”"
   ],
   "people": "To someone new, try: “Want to work on this together?” or “Are you going to the game Friday?” Simple beats clever. To an old friend, if you want to try: “I miss how we used to be. Can we talk?” And to a grown-up you trust: “My friends and I kind of fell apart, and it's been hard. Can I talk to you about it?”"
  },
  "helper": {
   "feel": "They may act like it's nothing, or they may be crushed and hiding it. Teens often feel embarrassed about losing friends, as if it says something about their worth. They may spend more time in their room, skip events, or check their phone constantly to see what they're missing. They also may not want you to fix it. They want to feel understood, and to stay in charge of their own social life.",
   "say": [
    "“That sounds really hard. I'm sorry.”",
    "“Do you want ideas, or do you want me to just listen?”",
    "“Friend groups change a lot in high school. It doesn't mean something's wrong with you.”",
    "“Who do you like being around lately, even a little?”"
   ],
   "avoid": [
    "“They weren't real friends anyway.” They may still love those friends, and it can feel like a judgment on their choices.",
    "Calling the other teens' parents, unless there is bullying or safety involved.",
    "“You'll make new friends in no time.” It may take a while, and that's normal.",
    "Pushing them into activities they don't want, or listing what they should change about themselves."
   ],
   "help": [
    "Listen first, and longer than feels natural. Ask before you advise.",
    "Make it easy to have people over: drive, feed, keep the house welcoming.",
    "Support a side door into belonging: a team, a club, a job, a youth group, volunteering. Offer, then let them choose.",
    "Watch for signs it's more than sadness: pulling away from everyone, skipping school, sleep or eating changes, losing interest in things for two weeks or more. If you see that, gently bring in a school counselor or doctor.",
    "If it turns into repeated meanness, threats, or embarrassing posts, treat it as bullying, not drama. See the bullying guide."
   ],
   "you": "You can't hand your teen a new friend group, and that's okay. Your part is to be one steady place they belong while the rest gets sorted out, and to keep the door open. Teens tell more when they feel safe to, so warmth now makes it more likely they'll come to you later."
  },
  "faith": "If faith is part of your life, a youth group, a choir, a service project, or a faith camp can be one more place to belong, with people who aren't part of the school drama. Some teens find it helps to pray for the friends they lost, or simply to hold them kindly in mind. If faith isn't part of your life, the same idea fits: look for a group built around something you care about, where people show up for each other.",
  "practices": [
   "branches|Friends",
   "branches|Clubs",
   "branches|One Reach-Out a Day",
   "branches|Friendship Repair",
   "bark|Name It",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Sad, flat, or pulling away from everyone for two weeks or more: talk with a parent, your school counselor, or your doctor. You can ask for help yourself.",
   "If it's turned into repeated meanness, threats, or someone sharing things about you online: tell a trusted adult and see the bullying guide.",
   "Teen Line, teens answering teens: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "Feeling like no one would care if you were gone, or thoughts of not wanting to be here: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ],
   [
    "CDC: school connectedness and teen mental health",
    "https://www.cdc.gov/mmwr/volumes/73/su/su7304a9.htm"
   ]
  ]
 },
 {
  "id": "left-out",
  "ring": "pn-friends",
  "title": "Feeling lonely or left out",
  "keys": "lonely loneliness left out no friends nobody likes me not invited everyone hangs out without me alone at lunch eat alone weekends alone feel invisible don't fit in no one gets me lonely in a crowd lonely even with friends everyone else has plans fomo saw it on their story",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Loneliness is common in the teen years, far more common than it looks from the outside.",
   "You can feel lonely with people all around you. Loneliness is about feeling known, not just having company.",
   "It is a signal, like hunger: a need for connection, not a verdict on your worth.",
   "Small, repeated steps toward people help most: one conversation, one group, one adult you trust."
  ],
  "feel": "Everyone seems to have plans, and you find out from a photo. You sit with people at lunch but still feel like you're on the outside of the joke. Weekends stretch long. You might feel invisible at school, or like no one really gets you, even in your own family. Loneliness can show up as boredom, irritation, too much scrolling, or a heavy tiredness. It can whisper that something is wrong with you, or that reaching out will just get you rejected again. That whisper is loud, and it's usually wrong. Feeling left out stings more in the teen years than almost any other time, because belonging matters so much right now. That's not weakness. It's how people are built.",
  "self": {
   "first": [
    "Name it to yourself: “I'm feeling lonely right now.” Naming a feeling helps it settle.",
    "Do one small kind thing for yourself: a walk outside, a shower, a song, real food.",
    "Reach out to one person with one small message. A meme, a question about homework, a “how was the game?”",
    "Put down the scroll for a while if it's making the feeling worse. Seeing everyone else's best moments feeds the ache."
   ],
   "helps": [
    "Joining something built around an activity you like: a team, a club, band, theater, robotics, a job, a youth group. Doing things side by side makes talking easier.",
    "Being the one who asks. Most people are waiting for someone else to make the plan.",
    "Giving your time: tutoring, coaching younger kids, a food shelf. Helping others connects you fast.",
    "Having at least one adult you can go to besides a parent: a coach, teacher, counselor, youth leader, relative, or boss.",
    "Planning one thing to look forward to each week, even small.",
    "Getting enough sleep. Everything, people included, feels harder when you're running on empty."
   ],
   "tell": [
    "“Feeling lonely means I need connection. It doesn't mean I'm unlikable.”",
    "“Lots of people feel this way. They just don't post it.”",
    "“One small step today is enough.”",
    "“I can be kind to myself while I wait for my people.”"
   ],
   "people": "Try: “Want to grab food after practice?” or “I'm going to the game Friday. Want to come?” To an adult you trust: “I've been feeling kind of alone lately. Can we talk?” Your Pine check-in also helps here: if it shows you've been feeling alone a lot, a grown-up you chose may get a quiet note to check in with you. They never see your answers."
  },
  "helper": {
   "feel": "They may not use the word lonely. They may say they're bored, that school is fine, or that they don't care about the party. They may scroll for hours, sleep a lot, or snap at you. Underneath, many lonely teens feel ashamed, as if being left out proves something about them. They may also be afraid that telling you will make it a big deal.",
   "say": [
    "“That hurts. I'm really glad you told me.”",
    "“Being left out doesn't mean you're not worth including.”",
    "“Where do you feel most like yourself?”",
    "“Is there anything you'd like to try, even something small?”"
   ],
   "avoid": [
    "“Just put yourself out there.” It skips the part that's hard.",
    "Listing what they should change about themselves to fit in.",
    "Making popularity the goal. One or two real friends matter more than a crowd.",
    "Comparing them with a sibling or another kid who seems to have lots of friends."
   ],
   "help": [
    "Name the feeling with them without rushing to fix it.",
    "Help find a side door into belonging: a team, club, class, job, youth group, or volunteer role built around something they like. Offer to drive.",
    "Make sure they have at least one trusted adult outside the family, and help them connect with that person.",
    "Plan time together that isn't about the problem: a meal, a drive, a game, an errand.",
    "If you get a “Please check in” alert from Pine, you won't see their answers. Simply check in warmly: “Hey, how are you really doing?” and listen.",
    "Watch for loneliness that comes with hopelessness, talk of being a burden, or not wanting to be here. That needs help right away: call, text, or chat 988 together."
   ],
   "you": "You can't make friends for them, and you don't need to. Your steady warmth is a real connection, and one trusted adult can change a whole year. Keep inviting, keep listening, and keep the bar low for what counts as a good step."
  },
  "faith": "If faith is part of your life, a youth group, a choir, a service project, or simply sitting with a faith community can be a place where you belong without having to earn it. Some teens find comfort in prayer when no one else is around, or in the sense that they are known and loved even on a lonely day. If faith isn't part of your life, a group built around a shared purpose, like serving others, can offer that same kind of welcome.",
  "practices": [
   "bark|Self-Compassion Break",
   "branches|Clubs",
   "branches|Name Your Trusted Adult",
   "branches|One Reach-Out a Day",
   "trunk|Volunteer",
   "fruit|Something to Look Forward To"
  ],
  "reach": [
   "Lonely most days for two weeks or more, or feeling down, numb, or not caring about things you used to enjoy: talk with a parent, your school counselor, or your doctor.",
   "Teen Line, teens answering teens: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "NAMI HelpLine, for information and support (not a crisis line): 1-800-950-6264, weekdays.",
   "Feeling like a burden, or thoughts of not wanting to be here: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ],
   [
    "US Surgeon General: Our Epidemic of Loneliness and Isolation",
    "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "bullying",
  "ring": "pn-friends",
  "title": "Bullying, in person and online",
  "keys": "bullying bullied bully cyberbullying cyber bullying mean messages harassed harassment rumors spreading rumors they post about me fake account group chat roast threatened threats pushed shoved made fun of teased mocked for how i look excluded on purpose screenshots shared embarrassing video posted private picture shared report bullying school won't do anything upstander",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Bullying is repeated meanness with a power imbalance: someone using size, status, numbers, or a screen to hurt you on purpose.",
   "It's common. About 1 in 5 high schoolers is bullied at school in a year, and much of it now happens online too.",
   "It is never your fault, and you don't have to handle it alone.",
   "Save the proof, block and report, and tell an adult who can act. Threats of violence go to 911."
  ],
  "feel": "Maybe it's a group chat where you're the joke. A fake account. A rumor that spread before lunch. Someone shoving you in the hall, or a group that goes quiet when you walk up. Maybe a picture or video of you got passed around. Bullying can make school feel like a place you have to survive. You might dread opening your phone, stop going to things you love, or replay every word at night. Many teens feel ashamed, as if they somehow earned it, or they worry telling will make it worse or cost them their phone. Some feel angry enough to want to hit back. All of that is a normal response to being treated badly. None of it means you deserve it.",
  "self": {
   "first": [
    "If you're in danger or someone threatens to hurt you, get to a safe place and call 911 or tell an adult right away.",
    "Save the proof before anything disappears: screenshots with names, dates, and times. Write down what happened in person and who saw it.",
    "Don't answer back online. Block the account, then report it to the app. Most apps let you report without the person knowing.",
    "Tell one adult who can act: a parent, school counselor, coach, teacher, or principal. If the first one doesn't help, tell another."
   ],
   "helps": [
    "Staying near people you trust in the places it tends to happen: hallways, the bus, the locker room.",
    "Asking the school, in writing, what its bullying policy is and what it will do. Keep copies of what you send.",
    "Tightening your privacy settings and muting or restricting accounts that keep coming at you.",
    "Spending time where you're valued: a team, a job, a club, a youth group, friends outside school.",
    "Talking to yourself the way a good friend would. Bullying puts a cruel voice in your head; you get to answer it.",
    "Calming your body before you decide what to do next: a slow breath out, or noticing what you see and hear around you."
   ],
   "tell": [
    "“This is about their choices, not my worth.”",
    "“Telling isn't snitching. It's getting help for something wrong.”",
    "“I don't have to handle this alone.”",
    "“I'm more than what they say about me.”"
   ],
   "people": "To an adult: “Something's been happening at school and online, and I need help with it. Here's what I've saved.” If you're worried about your phone: “I'm telling you because I need help, not so I'll lose my phone.” If a private picture of you was shared, you are not in trouble: tell a trusted adult, and use Take It Down to help get it removed. If you're answering your Pine check-in and say someone is hurting you, Pine shows you outside help right away. It doesn't send an alert to your family."
  },
  "helper": {
   "feel": "They may have waited a long time to tell you, or they may not tell you at all. Many teens fear that telling will make it worse, that adults will overreact or do nothing, or that they'll lose their phone. They may feel humiliated, and some feel they deserve it. You might notice them dreading school, avoiding the bus or a certain class, flinching at their phone, losing sleep, or pulling away from things they used to love.",
   "say": [
    "“Thank you for telling me. This is not your fault.”",
    "“You won't lose your phone for telling me.”",
    "“We'll figure out the next step together. I won't do anything without talking with you first, unless you're in danger.”",
    "“What would help most right now?”"
   ],
   "avoid": [
    "“Just ignore it.” It usually doesn't stop, and it tells them you won't help.",
    "Taking their phone away because they were bullied. It punishes the one who told.",
    "Telling them to fight back, or confronting the other teen or their parents yourself.",
    "Asking what they did to cause it."
   ],
   "help": [
    "Believe them, and stay calm. Your steadiness tells them it was safe to tell you.",
    "Help them save evidence: screenshots, dates, times, names of people who saw.",
    "Contact the school in writing, ask for the bullying policy and a plan, and follow up until something changes. Include your teen in what you share.",
    "Help them block, report, and tighten privacy settings on each app.",
    "If there are threats of violence, sharing of sexual images, or stalking, contact the police. For a shared sexual image of anyone under 18, use Take It Down and the CyberTipline.",
    "Watch their mood. Bullying is linked with sadness and suicide risk. If they seem hopeless, talk with them directly and reach out to 988 together."
   ],
   "you": "It's natural to feel furious, or to want to march into the school. Breathe first. Your teen needs a calm ally more than an avenger. Act steadily, keep them in the loop, and keep at it until it stops."
  },
  "faith": "If faith is part of your life, you may find strength in prayer, in a youth group, or in a mentor who reminds you who you are. Many traditions teach that every person has worth that no one can take away, and that standing up for someone being hurt is a good and brave thing. If faith isn't part of your life, the same truths hold: your worth isn't up for a vote, and being an upstander for others matters.",
  "practices": [
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Kind Voice Letter",
   "branches|Name Your Trusted Adult",
   "branches|Look Out for a Friend",
   "bark|Phone Check"
  ],
  "reach": [
   "Danger right now, or threats of violence: call 911.",
   "Tell a trusted adult at school who can act: your counselor, a teacher, a coach, or the principal.",
   "A private or sexual picture of you, taken when you were under 18, shared or threatened: Take It Down (takeitdown.ncmec.org) can help remove it, and the CyberTipline takes reports at report.cybertip.org or 1-800-843-5678. You are not in trouble.",
   "If an adult is the one hurting or threatening you: Childhelp, 1-800-422-4453 (call or text), any time.",
   "Feeling hopeless, or thoughts of not wanting to be here: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "PACER's National Bullying Prevention Center, in Minneapolis, has help for students and families."
  ],
  "more": [
   [
    "StopBullying.gov",
    "https://www.stopbullying.gov/cyberbullying/what-is-it"
   ],
   [
    "PACER National Bullying Prevention Center",
    "https://www.pacer.org/bullying/"
   ],
   [
    "Take It Down (NCMEC)",
    "https://takeitdown.ncmec.org"
   ],
   [
    "NCMEC CyberTipline",
    "https://report.cybertip.org"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "first-relationship",
  "ring": "pn-friends",
  "title": "First relationships and what healthy looks like",
  "keys": "first relationship dating going out boyfriend girlfriend partner crush talking stage healthy relationship is this normal red flags green flags jealous checks my phone wants to know where i am pressure boundaries consent saying no pictures nudes asked for pics too fast older person age gap how do i know if they like me parents won't let me date not dating yet",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "quick": [
   "There's no right age or timeline. Dating now, later, or not in high school at all are all normal.",
   "Healthy looks like respect, trust, honesty, and room to be yourself, with your own friends, interests, and goals.",
   "You always get to say no, and to change your mind. So do they. Pressure is never part of love.",
   "Asking for pictures, checking your phone, or controlling who you see are red flags, not proof of caring."
  ],
  "feel": "Maybe you're excited and can't stop checking your phone. Maybe you're nervous, unsure what you're supposed to do or say. Maybe you're happy, and also a little scared of how much you care. Or maybe everyone around you seems to be dating and you're not, and you're not sure you even want to yet. First relationships bring big feelings, fast. They can make you feel seen and special, and they can also bring jealousy, confusion, and pressure you didn't expect. It's normal not to know what's normal. The good news is that healthy relationships have clear signs, and you can learn them before you need them.",
  "self": {
   "first": [
    "Know your own values before someone else tests them: what matters to you, what you're comfortable with, and what's a no.",
    "Keep your own life going: your friends, your activities, your goals. A good relationship adds to your life; it doesn't shrink it.",
    "Notice how you feel around them. More like yourself, or less? Relaxed, or walking on eggshells?",
    "Pick one trusted adult you could talk with if something ever feels off."
   ],
   "helps": [
    "Green flags: they respect your no, support your friends and goals, are honest, apologize when they're wrong, and you can disagree without fear.",
    "Talking about boundaries out loud, early and often. A boundary is just telling someone what's okay for you.",
    "Remembering that a yes has to be freely given, and anyone can change their mind at any time, about anything.",
    "Practicing what you'll say to get out of a situation before you need it: “I'm heading home,” “Not tonight,” or a code text to someone who'll pick you up.",
    "Keeping private pictures private. Anyone who asks for one, or pressures you, is showing you who they are.",
    "Knowing the red flags: checking your phone, telling you who you can see, constant texts demanding where you are, jealousy as “proof” of love, threats, or making you feel crazy for having feelings."
   ],
   "tell": [
    "“My no is a full sentence.”",
    "“Love doesn't need me to give up my friends.”",
    "“There's no deadline. I can go at my own pace.”",
    "“I deserve to feel safe and respected, always.”"
   ],
   "people": "To someone you're dating: “I really like this. I also want to keep time for my friends.” Or, “I'm not comfortable with that. Let's do something else.” To a parent or trusted adult, whenever you want to: “Can I ask you something about relationships without it being a big deal?” If an adult, or someone much older, is pursuing you romantically or asking for pictures, that is never okay: tell a trusted adult right away."
  },
  "helper": {
   "feel": "Your teen may be thrilled, nervous, or embarrassed to talk about it at all, especially with you. They may worry you'll tease them, panic, or forbid it. Some teens aren't interested in dating yet and feel pressure from friends or media. Others may be in a relationship you don't know about. Either way, they are learning what love and respect feel like, and many are figuring it out with no map.",
   "say": [
    "“Whenever you want to talk about relationships, I'm here, and I won't freak out.”",
    "“What do you think makes a relationship good?”",
    "“Anyone who really cares about you will respect your no.”",
    "“If anything ever feels off, you can call me for a ride, no questions that night.”"
   ],
   "avoid": [
    "Teasing, or telling the whole family.",
    "Prying for names and details, or reading their messages. Teens share more when they feel safe to, not when they're tracked.",
    "Forbidding all talk about dating. It usually moves the relationship out of your sight.",
    "Lecturing. Share your family's values in a sentence or two, then ask what they think."
   ],
   "help": [
    "Talk about healthy relationships before there's a specific person: in the car, about a show, about friends.",
    "Name the green flags and the red flags plainly. Love Is Respect has clear lists for teens and for parents.",
    "Make a ride plan: they can text you a code word anytime and you'll come, no lecture that night.",
    "Be clear that any adult or much older person pursuing a teen romantically, or asking for pictures, is never okay, and they should tell you right away.",
    "If you see warning signs of control or abuse, stay calm and close. See the dating abuse guide.",
    "Pine never shows you your teen's answers. If they tell their check-in that someone is hurting them, Pine shows them outside help. Being a calm, safe adult makes it more likely they'll come to you too."
   ],
   "you": "You don't need to know who they like or whether they're dating. Your part is to be the calm, warm adult they can come to, with clear values and no drama. Warmth plus room to grow is what helps teens most."
  },
  "faith": "Many families have values about dating that come from their faith, and talking about them together can be a real gift: what love looks like, how to treat each other, and why. If faith is part of your life, you might pray or reflect about what kind of person you want to be in a relationship. A youth leader or faith mentor can also be a good, calm adult to talk with. If faith isn't part of your life, your family's values and your own sense of right and wrong are just as good a place to start.",
  "practices": [
   "branches|Respect Check",
   "trunk|What I Stand For",
   "branches|Easy Ways Out",
   "branches|Active Listening",
   "branches|Friends",
   "branches|Name Your Trusted Adult"
  ],
  "reach": [
   "Questions about whether something is healthy, or worry about a relationship: Love Is Respect, call 1-866-331-9474, text LOVEIS to 22522, or chat at loveisrespect.org, any time.",
   "Someone pressuring or threatening you with a picture: you are not in trouble. Take It Down (takeitdown.ncmec.org) and the CyberTipline (report.cybertip.org or 1-800-843-5678).",
   "An adult or much older person pursuing you romantically, or someone hurting you: tell a trusted adult, or call or text Childhelp, 1-800-422-4453.",
   "In Minnesota, Day One, for anyone being hurt by someone close to them: 1-866-223-1111, or text 612-399-9995.",
   "Forced or pressured into anything sexual: RAINN, 1-800-656-4673, any time.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/"
   ],
   [
    "Take It Down (NCMEC)",
    "https://takeitdown.ncmec.org"
   ],
   [
    "Day One",
    "https://dayoneservices.org/domestic-violence/help-now/"
   ],
   [
    "Childhelp",
    "https://childhelphotline.org/"
   ]
  ]
 },
 {
  "id": "breakup",
  "ring": "pn-friends",
  "title": "Breakups",
  "keys": "breakup break up broke up dumped got dumped heartbroken heartbreak ex my ex moved on they're dating someone else can't stop thinking about them miss them should i text them we broke up and go to the same school seeing my ex in the hall i broke up with them guilt cheated on me first love ended unfollow block my ex they said they'd hurt themselves if i leave",
  "parts": [
   "bark",
   "branches",
   "fruit"
  ],
  "quick": [
   "A breakup can be one of the hardest things that happens in the teen years. The pain is real, whatever anyone says about “puppy love.”",
   "Grief after a breakup comes in waves: sadness, anger, missing them, relief, and back again.",
   "Space helps healing. Muting, unfollowing, or a pause from contact is looking after yourself, not drama.",
   "Most heartbreak eases with time, people, and small daily steps. If it turns into weeks of heavy low mood, get help."
  ],
  "feel": "Whether you were the one who ended it or not, a breakup can knock the wind out of you. You might cry at random moments, lose your appetite, or lie awake replaying conversations. You might check their stories a hundred times, or feel sick seeing them in the hall. If you ended it, you might feel guilty, relieved, and sad all at once. If they ended it, you might feel rejected and confused, or like you'll never feel this way about anyone again. Friend groups can split and rumors can fly. Adults may call it “just a high school thing,” which can make you feel more alone. Your feelings are real. This is a loss, and grief is the right word for it.",
  "self": {
   "first": [
    "Let yourself feel it. Cry, write, listen to the sad songs. Feelings move through faster when you don't fight them.",
    "Take some space online: mute, unfollow, or archive the photos for now. You can decide later what to keep.",
    "Plan for the hard moments: the hallway, the class you share, lunch, the first weekend.",
    "Tell one friend or adult what happened, so you're not carrying it alone."
   ],
   "helps": [
    "Keeping the basics going: sleep, food, moving your body, time outside. Heartbreak hits harder on an empty tank.",
    "Leaning on friends and family, and doing ordinary things with them.",
    "Writing it out: what you miss, what you don't, what you learned about what you want.",
    "Pausing before you text them, especially late at night. Ask: will this help me heal, or keep the hurt open?",
    "Spending time on things that are yours: a sport, music, a job, a goal, a new skill.",
    "Being kind in how you talk about them. You'll be glad later, and it keeps the drama down."
   ],
   "tell": [
    "“This hurts because it mattered. That's okay.”",
    "“I can miss them and still know it's over.”",
    "“I was me before this relationship, and I'm still me.”",
    "“It won't always feel this heavy.”"
   ],
   "people": "To a friend: “I'm having a rough day about the breakup. Can we just hang out?” To a parent or trusted adult: “I don't need advice right now. I just need you to know it's been hard.” To your ex, if you need to: “I need some space for a while. Please don't text me for now.” If an ex threatens to hurt themselves if you don't come back, take it seriously and tell a trusted adult right away, but it is not your job to stay. Call or text 988 for them, or for you."
  },
  "helper": {
   "feel": "They may be devastated, numb, angry, or embarrassed, and may not want to talk about it with you at all. A first breakup can feel like the end of the world, partly because they have never been through one before and have no proof yet that it gets better. They may hole up in their room, stop eating, or look at their phone constantly. Comments like “you'll find someone else” can make them feel unseen.",
   "say": [
    "“I'm so sorry. That really hurts.”",
    "“Do you want to talk, or do you want company and no talking?”",
    "“It makes sense you're this sad. It mattered.”",
    "“I'm here, whenever.”"
   ],
   "avoid": [
    "“It was just puppy love,” or “You're young, you'll get over it.”",
    "“I never liked them anyway.” They may still care, or get back together.",
    "“There are plenty of fish in the sea.” It rushes past the grief.",
    "Grilling them for details, or contacting the ex or their family."
   ],
   "help": [
    "Take the pain seriously. Research links a recent breakup with a higher chance of a first depression in the teen years.",
    "Offer company without pressure: a drive, a favorite meal, a walk, a show together.",
    "Keep routines gently going: sleep, meals, school, practice. Allow a few soft days, then lean back toward normal.",
    "Watch for two weeks or more of low mood, pulling away from everyone, sleep or eating changes, or talk of hopelessness. If you see that, bring in a counselor or doctor.",
    "If the ex is harassing, threatening, or sharing pictures, or was controlling during the relationship, see the dating abuse guide.",
    "If they talk about not wanting to be here, ask directly, stay with them, and call, text, or chat 988 together."
   ],
   "you": "Watching your teen hurt is hard, and you can't speed it up. Your part is to take it seriously, keep them company, and keep the everyday rhythms gently going. Your steady presence is proof that love can be safe and lasting."
  },
  "faith": "If faith is part of your life, you might bring your heartbreak to God in prayer, honestly, sadness and anger included. Many people find comfort in sacred music, in a youth group, or in a mentor who has been through heartbreak too. If faith isn't part of your life, music, writing, and the people who love you can hold you through this in the same way.",
  "practices": [
   "bark|Name It",
   "bark|Self-Compassion Break",
   "trunk|Expressive Writing",
   "fruit|Hope Playlist",
   "leaves|Movement",
   "branches|Shared Meal"
  ],
  "reach": [
   "Low mood, numbness, or losing interest in things for two weeks or more: talk with a parent, your school counselor, or your doctor.",
   "Teen Line, teens answering teens: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "An ex who is harassing, threatening, stalking, or sharing pictures: Love Is Respect, 1-866-331-9474 or text LOVEIS to 22522. A private picture of you shared or threatened: Take It Down and the CyberTipline (report.cybertip.org or 1-800-843-5678).",
   "Thoughts of not wanting to be here, for you or your ex: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Take It Down (NCMEC)",
    "https://takeitdown.ncmec.org"
   ]
  ]
 },
 {
  "id": "dating-abuse",
  "ring": "pn-friends",
  "title": "Dating abuse and controlling partners",
  "keys": "dating abuse dating violence abusive relationship controlling partner controlling boyfriend controlling girlfriend checks my phone tracks my location wants my passwords jealous won't let me see friends tells me what to wear yells at me calls me names threatens me hits me pushed me grabbed me pressured me forced me says they'll hurt themselves if i leave scared of my partner walking on eggshells is this abuse how do i break up safely friend in an abusive relationship",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Dating abuse is a pattern of control: someone using fear, guilt, pressure, or force to have power over you.",
   "It's more common than people think. About 1 in 10 high schoolers who date were physically hurt on purpose by a partner in the past year.",
   "It is never your fault, and you never have to earn kindness. Love doesn't come with fear.",
   "You don't have to figure it out alone. Love Is Respect is there by call, text, or chat, any time. Danger right now: 911."
  ],
  "feel": "It might not have started out this way. At first the attention felt amazing: the constant texts, wanting to be with you all the time. Then it shifted. Now they check your phone, want your passwords, or track your location. They get angry if you see certain friends, tell you what to wear, or put you down and call it a joke. Maybe they've pushed or grabbed you, pressured you into things you didn't want, or threatened to hurt themselves if you leave. You might feel confused, because they can also be sweet and say they're sorry. You might feel embarrassed, or protective of them, or scared of what happens if you tell. Many people in your place wonder if it's really “that bad.” If you feel afraid, or like you're walking on eggshells, that feeling is worth listening to.",
  "self": {
   "first": [
    "If you're in danger right now, get to a safe place and call 911.",
    "Tell one adult you trust: a parent, school counselor, coach, teacher, youth leader, or a relative. If the first one doesn't help, tell another.",
    "Reach out to Love Is Respect by call, text, or chat. They talk with teens about exactly this, any time, and you don't have to give your name.",
    "Save what you can safely: screenshots of threats, dates and times, somewhere your partner can't see."
   ],
   "helps": [
    "Knowing the signs: checking your phone, controlling who you see or what you wear, constant put-downs, extreme jealousy, threats, pressure about sex or pictures, pushing, grabbing, or hitting.",
    "Remembering that abuse can be emotional, digital, sexual, or physical. Any of these counts.",
    "Making a safety plan before you take a big step, especially before a breakup: who knows, where you'll be, how you'll get home. Love Is Respect and Day One can help you make one.",
    "Asking your school counselor about changes that keep you safer: a different class, locker, or route.",
    "Staying close to your friends and family, even if your partner tries to pull you away. They're part of your safety.",
    "Being gentle with yourself. Caring about someone who hurts you doesn't make you foolish. It makes you human."
   ],
   "tell": [
    "“This is not my fault.”",
    "“Love doesn't come with fear.”",
    "“I deserve to feel safe, all the time.”",
    "“Asking for help is strong.”"
   ],
   "people": "To a trusted adult: “Something's been going on in my relationship, and I'm scared. Can you help me figure out what to do?” For a friend you're worried about: “I've noticed some things, and I care about you. I'm here, no matter what you decide.” If you tell your Pine check-in that someone is hurting you, Pine shows you outside help right away, like Love Is Respect, Childhelp, Day One, and 911. It doesn't send an alert to your family, so you stay in charge of who you tell."
  },
  "helper": {
   "feel": "They may feel confused, ashamed, scared, or loyal to the person hurting them. Many teens don't call it abuse. They may defend the partner, minimize what happened, or go back after a breakup. They may be afraid you'll overreact, forbid the relationship, or blame them. Control often works by cutting a teen off from the adults who love them, so pulling away from you may be part of the pattern, not a rejection of you.",
   "say": [
    "“I believe you. Thank you for telling me.”",
    "“This is not your fault. No one deserves to be treated that way.”",
    "“You don't have to decide anything right now. I'm with you.”",
    "“What would help you feel safer?”"
   ],
   "avoid": [
    "“Why don't you just leave?” Leaving is complicated and can be the riskiest time without a plan.",
    "Ultimatums or forbidding the relationship. It can push them closer to the partner and away from you.",
    "Blaming questions: “Why did you go there?” “What did you do?”",
    "Confronting the partner or their family yourself, or posting about it."
   ],
   "help": [
    "Stay calm and keep the relationship with your teen strong. Your connection is protection.",
    "Learn the warning signs and talk about them in general terms, so your teen can recognize their own situation.",
    "Help them make a safety plan with Love Is Respect or Day One, especially before a breakup.",
    "Work with the school counselor on schedule, route, or locker changes if they share a school.",
    "Help save evidence, and know that Day One can explain options like protective orders. If there's physical or sexual violence, threats, or stalking, involve the police, with your teen as much as you safely can.",
    "If your teen is being pushed into sexual acts or pictures, use RAINN, Take It Down, and the CyberTipline, and remind them they are not in trouble.",
    "Watch their mood. Abuse can lead to hopelessness. If they talk about not wanting to be here, call, text, or chat 988 together."
   ],
   "you": "It's natural to feel furious, scared, or helpless. Get support for yourself too: Love Is Respect and Day One talk with parents and other caring adults. Your steady, non-judging presence is often the thing that helps a teen find their way out."
  },
  "faith": "If faith is part of your life, it can be a source of strength, hope, and people who help. Being hurt is never something you have to accept to be a good person or a faithful one. If someone uses God, forgiveness, or “being a good partner” to keep you in place, that is part of the control. A trusted youth leader or faith mentor can be one of the adults who helps you. If faith isn't part of your life, the same is true: you deserve safety and respect, and asking for help is right.",
  "practices": [
   "branches|Respect Check",
   "branches|Name Your Trusted Adult",
   "bark|My Safety Plan",
   "branches|Ask for Help",
   "bark|Self-Compassion Break",
   "roots|What Holds Me Up"
  ],
  "reach": [
   "Danger right now: call 911.",
   "Love Is Respect, for teens and young adults, and for the adults who care about them: call 1-866-331-9474, text LOVEIS to 22522, or chat at loveisrespect.org, any time.",
   "In Minnesota, Day One, for anyone being hurt by someone close to them: 1-866-223-1111, or text 612-399-9995, any time.",
   "Forced or pressured into anything sexual: RAINN, 1-800-656-4673, any time.",
   "A private picture of you shared or threatened: Take It Down (takeitdown.ncmec.org) and the CyberTipline (report.cybertip.org or 1-800-843-5678). You are not in trouble.",
   "If an adult is the one hurting you: Childhelp, 1-800-422-4453 (call or text), any time.",
   "Feeling hopeless, or thoughts of not wanting to be here: call, text, or chat 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone."
  ],
  "more": [
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/get-relationship-help-24-7-365/"
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
    "Take It Down (NCMEC)",
    "https://takeitdown.ncmec.org"
   ],
   [
    "Childhelp",
    "https://childhelphotline.org/"
   ]
  ]
 },
 {
  "id": "divorce",
  "ring": "pn-home",
  "title": "Parents' divorce or separation",
  "keys": "divorce divorced separation separated parents splitting up parents fighting two homes two houses custody parenting time switching houses every other weekend dad moved out mom moved out caught in the middle pick a side messenger new house new school my fault parents yelling court lawyer stepparent dating again holidays two christmases",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Your parents' split is about their relationship. It is not your fault, and it is not yours to fix.",
   "You can love both of your parents out loud. You never have to pick a side.",
   "Being kept out of the middle helps more than almost anything else. You are allowed to ask for that.",
   "Many teens find their footing again within a couple of years, especially when home feels steady and calm."
  ],
  "feel": "Maybe you saw it coming for years. Maybe it landed out of nowhere on an ordinary night. You might feel relieved that the fighting may finally stop, and then guilty for feeling relieved. You might be angry at one parent, or both, or at yourself for not noticing. Some teens go quiet and act fine so no one worries. Some get pulled into adult stuff: carrying messages, hearing about money, comforting a parent who is falling apart. Switching houses can mean living out of a backpack, forgetting your charger, and missing things with friends. Holidays and big moments, like games, concerts, and graduation, can suddenly feel complicated. And it can be strange to watch your parents become different people: dating, moving, starting over. Every one of these feelings makes sense. You are not overreacting.",
  "self": {
   "first": [
    "Say it to yourself plainly: “This is about them. It's not my fault, and it's not my job to fix.”",
    "Ask for the practical answers you need: where you'll live, which days, what happens with school, your room, your pet, your stuff.",
    "Keep one copy of the basics at each house: a charger, a toothbrush, a hoodie. Less packing means less stress.",
    "Put the schedule in your phone so you always know which house you're at, and share it with a friend or coach if that helps."
   ],
   "helps": [
    "Telling each parent, calmly and once, that you want to stay out of the middle: no messages, no reports about the other house, no adult details.",
    "Keeping your own life going: your team, your job, your friends, your plans. Your life doesn't have to pause while theirs changes.",
    "Having a say in the schedule as you get older. At your age, it's fair to ask that your voice be heard, even if the adults make the final call.",
    "One adult outside the house you can be honest with: a coach, a counselor, a relative, a youth leader, a friend's parent.",
    "Writing it out when your head is loud. A few lines in a journal can untangle what you can't yet say.",
    "Letting good moments be good. Laughing at one house doesn't betray the other."
   ],
   "tell": [
    "“This is their decision, not my failure.”",
    "“I can love both of them.”",
    "“I'm allowed to have my own feelings about this, and my own life.”"
   ],
   "people": "Try, to a parent: “I love you both. Please don't ask me to carry messages or pick a side.” Or: “Can we talk about the schedule? I want my voice in it.” To a friend: “My parents are splitting up. I don't need advice, I just might be off for a while.”"
  },
  "helper": {
   "feel": "They may act fine and still be carrying a lot: guilt they can't name, worry about you or the other parent, embarrassment with friends, and the hassle of two homes. Teens often protect the adults around them by staying quiet. Some show it as anger, slipping grades, or pulling away, and some as being suddenly very responsible.",
   "say": [
    "“This is about our marriage, not about you. You did nothing to cause it.”",
    "“You can love both of us. You never have to choose.”",
    "“What are you most wondering about right now?”",
    "“I want your voice in the schedule. What matters most to you?”"
   ],
   "avoid": [
    "Criticizing the other parent where they can hear, or in texts they might see.",
    "Using them to carry messages, or asking what happens at the other house.",
    "Leaning on them as your main support, or sharing adult details about money, court, or blame.",
    "Making them choose a home, a holiday, or a side."
   ],
   "help": [
    "Keep conflict away from them. Talk with the other parent by text, email, or a co-parenting app, at times your teen isn't around.",
    "Keep routines and rules as steady as you can in both homes, and share one calendar.",
    "Ask their view on the schedule and take it seriously, especially around school, work, sports, and friends.",
    "Tell a school counselor or coach, with your teen's okay, so someone at school is watching out for them.",
    "Check in again in a few months. Questions and feelings come in waves as things change."
   ],
   "you": "Your own grief and stress are real. Get your support from adults: friends, family, a counselor, a support group. A calmer you is one of the best gifts you can give your teen right now. If you use Pine together, their answers stay private; you may get a quiet “Please check in” alert, never their answers."
  },
  "faith": "Some families lean on their faith community during a divorce, and it can be a place of welcome and steady people. For others, faith teachings or comments from people at church, temple, or mosque can add guilt or shame. If faith is part of your life, you can bring your honest feelings to God in prayer, or to a youth leader or pastor you trust. If it isn't, quiet time and the people who steady you can hold the same weight. Either way, your parents' choices are never a judgment on you.",
  "practices": [
   "bark|Name It",
   "bark|Slow Exhale",
   "branches|Family",
   "branches|Name Your Trusted Adult",
   "trunk|Journal",
   "roots|What Holds Me Up"
  ],
  "reach": [
   "Low mood, trouble sleeping, or losing interest in things you used to enjoy, lasting two weeks or more: tell a parent, school counselor, or doctor. In Minnesota, at 16 you can ask for counseling yourself.",
   "Feeling like you can't go on, or thinking about not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Fighting at home that turns physical, or anyone hurting you: Childhelp, call or text 1-800-422-4453, any time. In Minnesota: Day One, 1-866-223-1111. Danger right now: call 911. In Pine, this help goes to you directly, not to a family alert.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings.",
   "In Minnesota, a mental health crisis: call **CRISIS (274747) from a cell phone, any time."
  ],
  "more": [
   [
    "HealthyChildren.org (American Academy of Pediatrics)",
    "https://www.healthychildren.org/"
   ],
   [
    "Child Mind Institute",
    "https://childmind.org/"
   ],
   [
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "stepfamily",
  "ring": "pn-home",
  "title": "A new stepfamily",
  "keys": "stepfamily step family blended family stepparent stepmom stepdad step mom step dad stepsiblings step siblings half sibling new baby parent remarried parent getting married parent dating new partner moving in sharing a room new rules not my real parent what do i call them feel replaced jealous holidays two families",
  "parts": [
   "branches",
   "bark",
   "trunk"
  ],
  "quick": [
   "A stepfamily can bring a gain and a loss at the same time. Both feelings are fair.",
   "Close stepfamily relationships take time, often years. Slow is normal, not failure.",
   "You don't have to love a stepparent or stepsiblings right away. Respect and kindness are a good start.",
   "Time alone with your own parent still matters, and it's okay to ask for it."
  ],
  "feel": "Maybe your parent is happy for the first time in a long while, and you want to be glad for them. And still, there's a new person at the table, new rules, maybe new kids in your space or your room. You might like your stepparent and feel disloyal to your other parent for liking them. You might not like them at all and feel guilty about that too. It can feel like your parent picked someone over you, or like your old family is being written over. Inside jokes you're not part of, a different way of doing dinner, holidays split three ways. Some teens feel like a guest in their own home. Others feel squeezed, quietly expected to be the easy one. All of this is common in a new stepfamily, and none of it means something is wrong with you.",
  "self": {
   "first": [
    "Give it time. Think in seasons and years, not weeks.",
    "Ask your parent for regular time with just the two of you, even a short drive or a meal each week.",
    "Decide what you want to call your stepparent, and say so. A first name is fine.",
    "Claim a little space that is yours: a shelf, a corner, a door that closes, a time that's yours."
   ],
   "helps": [
    "Starting with respect and small kindness, and letting closeness grow on its own schedule.",
    "Keeping a few old traditions with your parent, and trying one new one with the whole household.",
    "Bringing rules questions to your own parent first, especially early on.",
    "Finding one easy thing to share with a stepparent or stepsibling: a show, a sport, a game, a recipe.",
    "Saying what you need calmly, at a calm time, instead of letting it build until it explodes.",
    "Keeping your friends, your activities, and your own plans going. You're allowed a life outside the new household."
   ],
   "tell": [
    "“I can be kind without being close yet.”",
    "“Liking them doesn't take anything away from my other parent.”",
    "“It's okay that this is taking time.”"
   ],
   "people": "Try, to your parent: “Can we keep one thing that's just us, like Saturday breakfast?” Or: “I'm trying. I just need this to go slower.” To a stepparent: “I'm not ready for a lot yet, but I'm glad you make my mom happy.”"
  },
  "helper": {
   "feel": "They may feel pushed aside, outnumbered, or caught between loyalty to a parent who isn't there and a new household they didn't choose. Many teens keep it to themselves so they won't hurt their parent's happiness. Some show it as eye rolls, a closed door, or extra time away.",
   "say": [
    "“You don't have to love them. Being respectful is enough for now.”",
    "“Our time together still matters to me. Let's keep it.”",
    "“What's been the hardest part so far?”",
    "“What would you like to keep the same?”"
   ],
   "avoid": [
    "Expecting instant closeness, or calling everyone one big happy family before it is.",
    "Asking them to call a stepparent Mom or Dad.",
    "Letting a new stepparent be the main rule enforcer early on.",
    "Speaking badly about the other parent, or asking them to choose between homes."
   ],
   "help": [
    "Go slowly. Fewer changes at once makes it easier on a teen.",
    "Protect one-on-one time between the teen and their own parent, every week.",
    "Early on, let the parent handle discipline while the stepparent builds a warm, steady connection.",
    "Give each teen some private space, especially when kids share rooms or switch homes.",
    "Build one or two new traditions together, and keep a few of the old ones."
   ],
   "you": "Stepparents often give a lot and get little back at first. That's normal, not a verdict. Find support for yourself with other stepparents or a counselor. Couples who stay a team and stay patient give their teens the steadiest ground."
  },
  "faith": "In some families, a wedding or blessing marks the new start, and a faith community can welcome a blended family well. For others, shared worship or different traditions in each home can feel awkward. If faith is part of your life, you can bring your mixed feelings honestly to God in prayer, and ask a youth leader you trust about it. If it isn't, quiet time and the people who know you best can help you sort it out.",
  "practices": [
   "branches|Family",
   "bark|Slow Exhale",
   "branches|Active Listening",
   "roots|Quiet Time",
   "branches|Friends",
   "trunk|Journal"
  ],
  "reach": [
   "Feeling low, left out, or angry most days for two weeks or more: talk with a school counselor or another adult you trust.",
   "Thoughts of not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Anyone in the home who makes you feel unsafe, touches you in a way that isn't okay, or hurts you: call or text Childhelp, 1-800-422-4453, any time. In Minnesota: Day One, 1-866-223-1111. Danger right now: call 911. Tell an adult outside your home, like a school counselor, coach, or teacher. In Pine, this help goes to you directly, not to a family alert.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings."
  ],
  "more": [
   [
    "HealthyChildren.org (American Academy of Pediatrics)",
    "https://www.healthychildren.org/"
   ],
   [
    "Search Institute: developmental relationships",
    "https://searchinstitute.org/developmental-relationships"
   ],
   [
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ]
  ]
 },
 {
  "id": "moving",
  "ring": "pn-home",
  "title": "Moving or changing schools",
  "keys": "moving move new town new city new state new school changing schools transfer new kid don't know anyone eat lunch alone miss my friends long distance friends left my team homesick starting over senior year move military move lost our house eviction staying with relatives open enrollment new credits",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "A move means real loss: friends, places, teams, and the version of you that people there knew. Missing it is grief.",
   "Feeling at home in a new place usually takes months, not weeks. Give it a season.",
   "Belonging at school is one of the strongest supports for your mood. One club, team, job, or group is a great start.",
   "Keep your old friends and build new ones. You don't have to choose."
  ],
  "feel": "Maybe you had years with the same people, and now you walk into a building where nobody knows your name. Maybe you're the new kid for the third time and tired of starting over. You might feel excited and lonely in the same hour. Lunch can be the hardest part of the day. Your old group chat keeps going without you, and you see the photos. If the move happened because of a divorce, a job loss, losing a home, or a family crisis, you may be carrying that too. Some teens throw themselves into the new place. Some shut down and count the days until graduation. Some feel angry that no one asked them. All of it makes sense. You lost a lot at once.",
  "self": {
   "first": [
    "Say real goodbyes if you can: one last time at your favorite place, a photo, a plan to stay in touch.",
    "Ask for a tour, a schedule, and one name at the new school before day one, often the counselor.",
    "Plan your lunch and your first week, so the hardest moments have a plan.",
    "Pick one club, team, job, or group to try in the first month."
   ],
   "helps": [
    "Saying yes to small invitations, even awkward ones. Friendships grow from repeated, ordinary time together.",
    "Keeping one or two old friendships going with a standing call, a game night online, or a visit.",
    "Making the new place yours: setting up your room the way you want, finding a spot outside, a coffee shop, a trail, a court.",
    "Checking your credits and classes early with the counselor, especially if you're an upperclassman.",
    "Keeping your routines steady: sleep, movement, meals. They hold you up while everything else is new.",
    "Being patient with yourself. Feeling lonely in month one doesn't mean you'll feel that way in month six."
   ],
   "tell": [
    "“It makes sense to miss what I left.”",
    "“New places take time. I'm giving this a season.”",
    "“I can be the new kid and still be myself.”"
   ],
   "people": "Try, to someone new: “I just moved here. What's worth doing around here?” To an old friend: “Want to keep a standing call on Sundays?” To a parent: “I need some say in how this goes. Can we talk about it?”"
  },
  "helper": {
   "feel": "They may be grieving friends, teams, and a place, even if the move is good news for the family. Many teens keep it to themselves so they don't add to the stress. Some act fine on the surface and feel very alone at school, especially at lunch and on weekends.",
   "say": [
    "“It's okay to be sad and excited at the same time.”",
    "“Who do you most want to stay close to? Let's make a plan.”",
    "“What would make the first week easier?”",
    "“How is lunch going? Honestly?”"
   ],
   "avoid": [
    "“You'll make friends in no time.” It can make a slow start feel like failure.",
    "Keeping the move secret until the last minute.",
    "Deciding everything for them: their room, their classes, which old friends they can visit.",
    "Comparing them to a sibling who is adjusting faster."
   ],
   "help": [
    "Tell them as early as you can, and give them real choices about goodbyes, their room, and how to stay in touch.",
    "Contact the new school early: a tour, the counselor, a student buddy, the coach or club leader.",
    "Check credits, graduation requirements, and course placement right away, especially in grades 11 and 12.",
    "Help them find one place to belong in the first month: a team, a club, a job, a youth group.",
    "Make a visit back, or a visit from an old friend, possible if you can."
   ],
   "you": "Moves are hard on grown-ups too: new routines, new work, missing your own people. Look after yourself and find your own one or two connections. Your teen will watch how you settle in."
  },
  "faith": "For some teens, a faith community or youth group in a new town becomes a quick place to belong, with people who show up week after week. For others, leaving a faith community behind is one more loss. If faith is part of your life, it's worth visiting a youth group or service in the new place, and praying honestly about what you miss. If it isn't, any group built around something you care about can be that landing place.",
  "practices": [
   "branches|One Reach-Out a Day",
   "branches|Clubs",
   "fruit|Something to Look Forward To",
   "roots|Sit Spot",
   "branches|Name Your Trusted Adult",
   "leaves|Movement"
  ],
  "reach": [
   "Loneliness or low mood that doesn't lift after a couple of months, or that keeps you from school or sleep: talk with the school counselor, a doctor, or another adult you trust.",
   "Thoughts of not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911.",
   "If your family has lost its housing, you may have the right to stay at your old school, with rides, if that is best for you. Ask either school for its homeless liaison.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings.",
   "Military family on the move: Military OneSource, 800-342-9647, any time."
  ],
  "more": [
   [
    "Military Child Education Coalition (help with school moves, for any family)",
    "https://www.militarychild.org/"
   ],
   [
    "HealthyChildren.org (American Academy of Pediatrics)",
    "https://www.healthychildren.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "deployed",
  "ring": "pn-home",
  "title": "A parent deployed, and military family life",
  "keys": "deployed deployment parent deployed dad deployed mom deployed military family military kid national guard reserves army navy air force marines coast guard space force base pcs move moving again homecoming reintegration parent coming home worried about my parent news war training away tdy extra chores man of the house miss my dad miss my mom",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Worry, pride, anger, and missing them can all be true at once. Every one of those feelings is fair.",
   "Steady routines, regular contact, and someone to talk to help teens most through a deployment.",
   "Helping more at home is a strength. Carrying an adult's whole job is too much, and you can say so.",
   "Homecoming is a change too. It often takes a while for everyone to find a new normal."
  ],
  "feel": "Maybe you've done this before and know the rhythm. Maybe it's the first time, and the house suddenly feels too quiet. You might feel proud of your parent and angry at the same time that they're missing your season, your concert, or your birthday. News about the part of the world they're in can make your stomach drop. A missed call can send your mind to the worst place. You might be helping a lot more at home, with younger siblings, chores, or a parent who is stretched thin, and feel both grown-up and tired. If your family is in the National Guard or Reserves, you might be the only military kid in your school, and people may not get it. If you've moved a lot, you may be tired of starting over. And when your parent comes home, it can be wonderful and awkward together. Every bit of this is part of military family life.",
  "self": {
   "first": [
    "Talk with your parent before they leave about how you'll stay in touch: calls, messages, videos, letters.",
    "Tell one teacher or coach what's going on, so someone at school understands a rough day.",
    "Keep your own routines going: practice, work, friends, sleep. They hold you up.",
    "Set a limit on war news. Check once, from a reliable source, and then put it down."
   ],
   "helps": [
    "A shared countdown or project: a playlist you both add to, a book you both read, a photo a week.",
    "Other military teens. Many bases, Guard units, and Minnesota communities have youth programs and camps.",
    "Taking on real help at home while saying out loud when it's too much.",
    "Writing down what you want to tell your parent, so you have things to share when the call comes.",
    "Talking about homecoming before it happens: what each person hopes for, and what might feel strange.",
    "Asking about your rights at school when you move: military families have help with enrollment, classes, and graduation."
   ],
   "tell": [
    "“I can miss them and still have a good day.”",
    "“I can help without carrying it all.”",
    "“Worry is normal. Most days, no news is just no news.”"
   ],
   "people": "Try, to your parent before they go: “Can we pick a way to stay connected that's ours?” To the parent at home: “I want to help, but I need some time that's just mine too.” To a friend: “My dad's deployed. Some days are rough. You don't have to fix it, just know.”"
  },
  "helper": {
   "feel": "They may feel proud, worried, angry, and lonely, sometimes in one afternoon. Many teens step up at home and hide how much it's costing them. Some act out, some go quiet, and some get very busy. Homecoming can bring its own stress as roles shift again.",
   "say": [
    "“It's okay to miss them and still have fun.”",
    "“What would you like to send them this week?”",
    "“You're helping a lot. What do you need from me?”",
    "“What are you hoping for when they get home? What feels strange about it?”"
   ],
   "avoid": [
    "“You're the man of the house now,” or any role that hands a teen an adult's job.",
    "Leaving the news on in the background without talking about it.",
    "Promising nothing bad will happen.",
    "Waiting until the night before to tell them about a deployment or a move."
   ],
   "help": [
    "Tell teachers, coaches, and the school counselor before the deployment, with your teen's okay.",
    "Keep routines, rules, and family traditions steady while one parent is away.",
    "Give your teen real help to offer, with limits, and protect their time for school, sports, work, and friends.",
    "Connect them with other military-connected teens through youth programs, camps, or a school group.",
    "Talk about homecoming ahead of time, and expect a few weeks or months of adjusting."
   ],
   "you": "The parent at home carries a heavy load. Look after your own sleep and support, and reach out to Military OneSource or your unit's family programs. If you or the returning parent are struggling, getting help early is a strength your teen will notice."
  },
  "faith": "Many military families lean on faith during a deployment: praying for a parent far away, a chaplain on base, or a faith community that brings meals and rides. For others, worry can shake faith, or it can be hard to pray at all. If faith is part of your life, holding your parent in prayer each day can be a steady habit. If it isn't, picturing them and sending them a good wish can do the same.",
  "practices": [
   "roots|Hold Someone in Light",
   "bark|Five Senses Pause",
   "branches|One Reach-Out a Day",
   "fruit|Something to Look Forward To",
   "bark|Phone Check",
   "bark|Slow Exhale"
  ],
  "reach": [
   "Military OneSource: 800-342-9647, any time, for service members and families, teens included. They can connect you with someone to talk to.",
   "Worry, low mood, or trouble sleeping that lasts two weeks or more: tell a counselor, a doctor, or another adult you trust.",
   "Thoughts of not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911.",
   "If anyone at home is hurting you: call or text Childhelp, 1-800-422-4453, any time. In Pine, this help goes to you directly, not to a family alert.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings."
  ],
  "more": [
   [
    "Military OneSource: Helping Teens Deal With Deployment",
    "https://www.militaryonesource.mil/resources/millife-guides/military-deployment-support-for-teens/"
   ],
   [
    "Military Child Education Coalition",
    "https://www.militarychild.org/"
   ],
   [
    "Military Interstate Children's Compact Commission (school moves)",
    "https://mic3.net/"
   ],
   [
    "Beyond the Yellow Ribbon, Minnesota National Guard",
    "https://mn.gov/mnng/resources/beyond-the-yellow-ribbon/"
   ]
  ]
 },
 {
  "id": "family-substance",
  "ring": "pn-home",
  "title": "A family member's drinking or drug use",
  "keys": "parent drinks too much mom drinks dad drinks alcoholic parent addiction in my family drug use parent high parent drunk sibling using brother using sister using pills opioids meth weed every day relapse rehab treatment recovery cover for them keep it a secret embarrassed bring friends home drunk driving overdose mood swings broken promises",
  "parts": [
   "bark",
   "branches",
   "leaves"
  ],
  "quick": [
   "You didn't cause it, you can't control it, and you can't cure it. You can look after yourself.",
   "You are far from alone. About 1 in 4 kids in the US lives with a parent who has a drinking or drug problem.",
   "Keeping the family secret isn't your job. Talking with one safe adult is allowed, and it helps.",
   "Have a safety plan: who you'll call, where you'll go, and never riding with someone who has been drinking or using."
  ],
  "feel": "Maybe it's been this way as long as you can remember. Maybe it started after a loss, an injury, or a job ending, and the person you knew slowly changed. You might never know which version of them you'll get when you walk in the door. You might cover for them, call in sick for them, look after younger siblings, or check whether they're breathing. You might feel angry, embarrassed, scared, protective, or numb, sometimes all in one night. Some teens stop bringing friends home. Some become the responsible one who holds everything together. Some feel guilty, as if being better would make it stop. And many love the person deeply while hating what the drinking or drugs do. All of it makes sense. None of it is your fault.",
  "self": {
   "first": [
    "Say it to yourself: “I didn't cause it. I can't control it. I can't cure it.”",
    "Pick one safe adult you can be honest with: a relative, a coach, a school counselor, a friend's parent, a youth leader.",
    "Make a ride plan: you never get in a car with someone who has been drinking or using. Know who you'll call instead.",
    "Know where you can go if home gets scary: a relative's, a friend's, a neighbor's."
   ],
   "helps": [
    "Talking with other teens who get it. Alateen meetings are for teens affected by someone else's drinking, and many groups welcome teens affected by drug use too.",
    "Protecting your own routines: sleep, school, practice, work, friends. You're allowed a life of your own.",
    "Writing down your feelings when you can't say them out loud yet.",
    "Letting go of the job of fixing them. Their recovery belongs to them and the adults helping them.",
    "Knowing your own family story as you make your own choices. Practicing an easy way out of a party, a ride, a vape, or a drink before you need it."
   ],
   "tell": [
    "“This is their illness, not my failure.”",
    "“I can love them and still keep myself safe.”",
    "“I'm allowed to have a good life even when they're struggling.”"
   ],
   "people": "Try, to a safe adult: “Things at home are hard because of drinking. Can I talk to you about it?” To the person, at a calm and sober time, if it feels safe: “I love you. I'm scared when you drink.” To a friend: “I'd rather hang out at your place, if that's okay.”"
  },
  "helper": {
   "feel": "Teens in homes with drinking or drug use often carry secrets, guilt, and grown-up jobs. They may look extra responsible, or angry, or checked out. Many love the person and are furious at them at the same time. They may be quietly watching for safety every day.",
   "say": [
    "“This is not your fault, and it's not your job to fix.”",
    "“You can always call me, any time, and you won't be in trouble.”",
    "“If you ever don't feel safe getting in a car, call me instead.”",
    "“What's the hardest part for you right now?”"
   ],
   "avoid": [
    "Asking them to keep it secret or to cover for the adult.",
    "Making them the family peacekeeper, babysitter, or the one who checks on the person.",
    "Speaking about the person with contempt. They likely still love them.",
    "Promising that this time treatment will fix everything."
   ],
   "help": [
    "Name one or more safe adults they can always call, and make sure they have the numbers.",
    "Make a clear safety plan together: rides, where to go, and calling 911 if someone can't wake up or is in danger.",
    "Help them find Alateen, a school support group, or a counselor.",
    "Protect normal teen life: sleep, school, sports, work, friends.",
    "If you're the parent who uses, getting help is one of the strongest things you can do for your teen. Tell them honestly, in a calm and sober moment, that it's not their fault."
   ],
   "you": "Loving someone who drinks or uses is exhausting. Al-Anon and similar family groups exist for adults, and the SAMHSA National Helpline can point you to treatment and support. Your own steadiness is a gift to your teen. If they use Pine, their answers stay private; you may get a quiet “Please check in” alert, never their answers."
  },
  "faith": "For some families, a faith community, a pastor, or a recovery group with a spiritual side becomes a real source of strength. For others, faith can add shame, or pressure to forgive and forget. If faith is part of your life, you can be honest with God about your anger and fear, and ask a youth leader you trust for support. If it isn't, saying what hurts out loud to someone safe matters just as much. Either way, your worth doesn't depend on anyone else's choices.",
  "practices": [
   "bark|Self-Compassion Break",
   "branches|Name Your Trusted Adult",
   "branches|Ask for Help",
   "bark|My Safety Plan",
   "leaves|Sleep",
   "branches|Easy Ways Out"
  ],
  "reach": [
   "Someone can't wake up, isn't breathing well, or there is danger right now: call 911.",
   "Anyone hurting you, or you're being left without food, safety, or a way to get help: call or text Childhelp, 1-800-422-4453, any time. In Minnesota: Day One, 1-866-223-1111. In Pine, this help goes to you directly, not to a family alert.",
   "Thoughts of not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "SAMHSA National Helpline: 1-800-662-4357, any time, for treatment and support for the person using, or for your family.",
   "Alateen, for teens affected by someone else's drinking: find a meeting through Al-Anon's Teen Corner.",
   "Low mood or worry that lasts two weeks or more: talk with a school counselor or doctor. In Minnesota, at 16 you can ask for counseling yourself.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings."
  ],
  "more": [
   [
    "Alateen, Al-Anon Teen Corner",
    "https://al-anon.org/newcomers/teen-corner-alateen/"
   ],
   [
    "NACoA: the Seven Cs",
    "https://nacoa.org/the-seven-cs/"
   ],
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/helplines/national-helpline"
   ],
   [
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ]
  ]
 },
 {
  "id": "parent-jail",
  "ring": "pn-home",
  "title": "A parent in jail or prison",
  "keys": "parent in jail parent in prison dad in jail mom in prison arrested incarcerated locked up sentenced court trial probation release coming home reentry visiting prison video visit phone calls letters embarrassed secret what do i tell people kids at school know news about my parent miss my dad miss my mom angry at my parent living with grandparents",
  "parts": [
   "branches",
   "bark",
   "fruit"
  ],
  "quick": [
   "Your parent's choices are not your choices. You are not what happened.",
   "You can love your parent and be angry at them. Both can be true.",
   "You decide who you tell, and how much. Your story is yours.",
   "More than 5 million kids in the US have had a parent in jail or prison. You are not the only one."
  ],
  "feel": "Maybe you saw the arrest. Maybe you found out from someone else, or online, before anyone told you. You might feel embarrassed, angry, worried about your parent's safety, or relieved if home had been scary. You might miss them so much it hurts, and then be furious that they put you here. Visits can be long drives, metal detectors, and an hour that goes too fast. Calls can be short and expensive. You might have moved, changed schools, or be living with a grandparent or relative now. People at school or church might whisper, or just not know what to say. And when a release date comes, that brings its own mix of hope and worry. Whatever you feel is allowed. You didn't do anything wrong.",
  "self": {
   "first": [
    "Ask the adult caring for you for the plain facts: where your parent is, how long, how you can call, write, or visit.",
    "Decide who you want to tell. One trusted friend or adult is a great start. You don't owe anyone the whole story.",
    "Have a short answer ready for nosy questions: “My dad's away right now. I don't really want to talk about it.”",
    "Tell one adult at school, like a counselor or coach, if you want someone there to understand a rough day."
   ],
   "helps": [
    "Staying in touch in a way that fits you: letters, calls, video visits, or in-person visits, if it's safe and you want to.",
    "Taking a break from contact if you need one. That's your choice too, especially if your parent hurt you or your family.",
    "Writing what you can't say yet: a journal, a letter you may never send, a song.",
    "Keeping your own goals in front of you. Your future is yours to build.",
    "Spending time with adults who believe in you: a coach, a mentor, a relative, a youth leader, a boss."
   ],
   "tell": [
    "“My parent's choices don't decide who I am.”",
    "“I can love them and still be angry.”",
    "“My story is mine to share, when and with whom I choose.”"
   ],
   "people": "Try, to the adult you live with: “Can you tell me what's actually happening? I'd rather know.” To your parent, in a letter or call: “I miss you. I'm also really mad. I need you to hear both.” To a friend: “My mom's in prison. I don't need advice. I just wanted you to know.”"
  },
  "helper": {
   "feel": "They may feel shame, anger, grief, and worry, sometimes with relief mixed in. Many teens keep it secret and feel very alone. Some take on adult roles, some act out, some throw themselves into school or sports. News, court dates, visits, and release dates can stir everything up again.",
   "say": [
    "“You didn't do anything wrong. This is not your fault.”",
    "“It's okay to love them and be mad at them.”",
    "“You get to decide who you tell.”",
    "“What do you want to know? I'll tell you the truth.”"
   ],
   "avoid": [
    "Lying about where the parent is, or saying they're “away at work.”",
    "Speaking badly about the parent where your teen can hear.",
    "Saying things like “You're going to end up just like him.”",
    "Pushing visits or contact your teen isn't ready for, or blocking contact they want when it's safe."
   ],
   "help": [
    "Give honest, simple facts: where, how long, and how contact works.",
    "Help with letters, calls, and visits when it's safe and your teen wants them. Learn the facility's visiting rules ahead of time.",
    "With your teen's okay, tell a school counselor so someone is watching out for them.",
    "Help them find a mentor or a group with other teens who understand.",
    "Prepare together for release: what might change, and what your teen wants."
   ],
   "you": "If you're the caregiver, you may be carrying a heavy load of your own: money, schedules, grief, and judgment from others. Get support for yourself too. If you're the parent who is incarcerated, letters, calls, and showing up for your teen in the ways you can still matter a great deal."
  },
  "faith": "Some families find support in a faith community, a prison chaplain, or a mentoring program run by a faith group. For others, judgment from a faith community can add to the shame. If faith is part of your life, you can bring all of it to God in prayer, the love, the anger, and the worry. If it isn't, writing it down or talking with someone who listens well can carry the same weight. No one else's choices change your worth.",
  "practices": [
   "trunk|What I Stand For",
   "bark|Name It",
   "trunk|Journal",
   "branches|Name Your Trusted Adult",
   "fruit|Future Me Letter",
   "bark|Kind Voice Letter"
  ],
  "reach": [
   "Feeling low, angry, or alone most days for two weeks or more: talk with a school counselor or doctor. In Minnesota, at 16 you can ask for counseling yourself.",
   "Thoughts of not wanting to be alive: call or text 988, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "If anyone is hurting you, at home or anywhere: call or text Childhelp, 1-800-422-4453, any time. In Minnesota: Day One, 1-866-223-1111. Danger right now: call 911. In Pine, this help goes to you directly, not to a family alert.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 or text TEEN to 839863, evenings.",
   "Visiting a Minnesota state prison: the Department of Corrections explains how to apply and schedule visits. Applications can take weeks, so start early."
  ],
  "more": [
   [
    "Minnesota Department of Corrections: visiting information",
    "https://mn.gov/doc/family-visitor/visiting-information/"
   ],
   [
    "Annie E. Casey Foundation: children of incarcerated parents",
    "https://www.aecf.org/resources/a-shared-sentence"
   ],
   [
    "Sesame Street in Communities: incarceration (for younger siblings)",
    "https://www.sesamestreetincommunities.org/topics/incarceration/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "blowup",
  "ring": "pn-home",
  "title": "In the middle of a blowup",
  "keys": "blowup blow up fight with my parents fight with my mom fight with my dad yelling screaming argument lost my temper so angry rage slammed the door punched a wall can't calm down they always yell family fight house is loud said things i regret grounded again temper anger",
  "parts": [
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "When a fight gets big, the first job is to cool down, not to win.",
   "A longer breath out, a lower voice, and a little distance help everyone think again.",
   "Taking a break is a strong move. Say where you're going and that you'll come back.",
   "Talk it through later, when everyone is calm. If anyone is hurting you or threatening you, that is more than a fight: reach out for help outside the family."
  ],
  "feel": "One second it's a question about your phone or your grades, and the next everyone is yelling. Your heart pounds, your face gets hot, and words come out faster than you can stop them. Maybe you slammed a door or said something you didn't mean. Afterward you might feel embarrassed, still furious, misunderstood, or just wiped out. If the blowups are between the grown-ups in your house, you might feel scared, stuck in the middle, or like it's on you to keep the peace. All of it makes sense. Strong feelings are part of being human, and you can learn to steer them.",
  "self": {
   "first": [
    "Notice the early signs in your body: a tight jaw, hot face, fast heart, clenched hands. That's your cue.",
    "Breathe out slower than you breathe in, a few times. It tells your body it's safe to come down.",
    "Take a break with a plan: “I need ten minutes. I'll come back and talk.” Then go somewhere calm: your room, a walk outside, a shower.",
    "If you're not safe, leave and go to a neighbor, a friend's house, or any safe place, and call 911 if there's danger right now."
   ],
   "helps": [
    "A cool-down spot and a cool-down list you made ahead of time: music, a walk, a shower, shooting hoops, drawing, texting a friend.",
    "Naming the feeling under the anger: embarrassed, worried, left out, exhausted, treated unfairly.",
    "Coming back to it later with one sentence that starts with “I”: “I felt like you didn't trust me.”",
    "Owning your part, even if it's a small part. It makes it easier for the other person to own theirs.",
    "Sleep, food, and movement. Almost everyone blows up faster when they're tired or hungry.",
    "A trusted adult outside the house to talk to: a coach, a counselor, a relative, a youth leader."
   ],
   "tell": [
    "“I can feel this without saying everything I feel.”",
    "“Walking away to cool down is a strong choice.”",
    "“One bad fight doesn't mean we're a bad family.”"
   ],
   "people": "Later, when things are calm, try: “I didn't like how that went. Can we figure out what to do next time it gets that big?” If it's the grown-ups fighting, you can tell a trusted adult: “Things are loud at home, and I need someone to talk to.”"
  },
  "helper": {
   "feel": "A high schooler in a blowup can be as big as you and just as loud, and it can feel like a fight between two adults. Under stress, their feelings can run ahead of their judgment. Underneath the heat there is often something else: stress, a breakup, grades, too little sleep, something online, or feeling disrespected. Teens care a great deal about respect and fairness, and they often feel ashamed afterward, even when they don't show it.",
   "say": [
    "“I'm not going to yell. I want to understand.”",
    "“You can take a break. I'll be here when you're ready.”",
    "“What do you need right now?”",
    "Later: “That got big. What was really going on?”"
   ],
   "avoid": [
    "Matching their volume, or saying things you'll need to take back.",
    "Consequences announced in the heat of the moment.",
    "Taking the keys or phone by force, blocking a doorway, or physically holding them, unless someone is about to be hurt.",
    "An audience: siblings, friends, or a phone recording.",
    "Bringing up every past mistake at once."
   ],
   "help": [
    "Calm yourself first. A slower breath, a lower voice, and relaxed hands do more than any argument.",
    "Stand to the side, give room, and leave the door clear. Offer an exit with dignity: “Go take a walk. We'll talk when you're back.”",
    "Talk it through later, when everyone is calm. Ask what was underneath, and make a plan together in their words: where they can cool off and who they can call.",
    "Own your part out loud when you've crossed a line. It teaches more than any lecture.",
    "Get help early if blowups keep happening, come with drinking or drugs, driving angry, talk of hurting someone or themselves, or seem tied to something bigger: their doctor or the school counselor.",
    "Pine keeps your teen's check-in private. You never see their answers. If something they share raises a concern, you'll see a quiet “Please check in” alert, and that's your cue to reach out gently."
   ],
   "you": "Blowups can stir up your own history: how fights went in the home you grew up in. If you feel your own temper rising, it's okay to say “I need a break too” and step away. If the blowups at home are between adults, or you feel unsafe, reach out for support for yourself as well. Day One (1-866-223-1111) talks with anyone in Minnesota facing violence at home."
  },
  "faith": "For some families, faith offers ways back after a fight: a prayer for patience, the practice of forgiving, a youth leader or faith mentor to talk with. For others, a walk, a quiet minute, or a family tradition of making up does the same work. What matters is coming back to each other.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Name It",
   "bark|Five Senses Pause",
   "branches|Friendship Repair",
   "branches|Name Your Trusted Adult",
   "leaves|Walk or Jog"
  ],
  "reach": [
   "Danger right now, a weapon, or someone threatening to hurt someone: get to safety and call 911.",
   "If someone at home is hurting you or threatening you: Childhelp, 1-800-422-4453 (call or text, any time). In Minnesota, Day One, 1-866-223-1111 (or text 612-399-9995). Tell a trusted adult at school, too.",
   "If you're thinking about hurting yourself or not wanting to be alive: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team that can come to you during a mental health crisis at home.",
   "Teen Line, teens answering teens: call 800-852-8336 or text TEEN to 839863 in the evening.",
   "If blowups keep happening, your school counselor or doctor can help you figure out what's underneath."
  ],
  "more": [
   [
    "Child Mind Institute",
    "https://childmind.org"
   ],
   [
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "Minnesota mental health crisis lines",
    "https://www.mnmhaccess.com/Home/Crisis"
   ]
  ]
 },
 {
  "id": "lying",
  "ring": "pn-home",
  "title": "Lying, sneaking out, and stealing",
  "keys": "lying lies liar lied to my parents caught lying sneaking out snuck out stealing stole shoplifting shoplifted took money trust broken they don't trust me grounded honesty secret cover for a friend got caught in trouble rebuild trust missing money",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "quick": [
   "Wanting privacy and more freedom is a normal part of growing up. Lying to get it usually costs more than it buys.",
   "Trust gets rebuilt in steps, with a clear path back. The relationship is bigger than one mistake.",
   "Telling the truth first, before you get caught, is the fastest way through.",
   "Stealing, sneaking out, or lies that keep growing can point to something bigger. Talking with someone helps."
  ],
  "feel": "Maybe it started small: where you were, who you were with, a grade you didn't mention. Then one lie needed another to hold it up. Maybe you got caught, and now there's a long silence at dinner, or a phone that got taken away. You might feel relieved that it's out, angry that they don't trust you, ashamed, or all three. Some lies come from wanting room to grow up, some from fear of how a parent will react, and some from covering for a friend. Sometimes there's something heavier underneath: pressure from someone, money you owe, or a hard stretch you haven't told anyone about. Whatever got you here, there's a way back.",
  "self": {
   "first": [
    "If you're living with a lie that's getting heavy, think about telling the truth first, before it comes out on its own. It almost always goes better.",
    "Pick a calm moment and start small: “There's something I need to tell you, and it's hard to say.”",
    "If you've been caught, skip the next excuse. “You're right. I wasn't where I said I was” starts the rebuilding.",
    "If someone is pressuring you to steal, lie, or keep a secret, or is threatening you, that's on them. Tell a trusted adult or use the help lines below."
   ],
   "helps": [
    "Asking for what you actually want, out loud: a later curfew, more privacy, a trip with friends. Bring a plan and a way to stay reachable.",
    "Agreeing on clear steps to earn trust back, and checking them off.",
    "Making it right where you can: returning what you took, paying it back, saying sorry to the person it affected.",
    "Noticing what's underneath. Stress, money worries, a friend group pulling you somewhere, or a mood that's been low can all push toward secrets.",
    "A trusted adult outside the family, like a coach, counselor, or youth leader, to think it through with."
   ],
   "tell": [
    "“One mistake isn't who I am.”",
    "“Telling the truth is hard, and I can do hard things.”",
    "“Trust grows back when I keep showing up.”"
   ],
   "people": "Try: “I know I broke your trust. What would it take for me to earn it back?” Or: “I want more freedom. Can we talk about what that could look like?”"
  },
  "helper": {
   "feel": "Teens lie to protect their privacy, to avoid conflict, to cover for friends, or because they're afraid of how you'll react. Most of it is ordinary growing up. After getting caught, many teens feel ashamed and defensive at the same time, and they may test whether the relationship still holds. Sometimes a lie, stealing, or sneaking out is the visible part of something bigger: substance use, gambling or debt, a relationship that's pressuring them, someone threatening them online, or depression.",
   "say": [
    "“I know you weren't at Sam's. I want to hear what really happened.”",
    "“I'm upset, and I still love you. Here's how we rebuild trust.”",
    "“Is something going on that you're afraid to tell me?”",
    "“Thank you for telling me. That took courage.”"
   ],
   "avoid": [
    "Setting traps or asking questions you already know the answer to. Say what you know, calmly.",
    "Snooping as your main strategy. Talk first.",
    "Consequences so big or so long that they have nothing left to lose.",
    "Treating one lie as proof of who they are: “You're a liar.”",
    "Punishing the truth harder than the mistake when they come to you first."
   ],
   "help": [
    "Respond with consequences that fit and have an end, and a clear way to earn trust back, step by step.",
    "Make honesty the easiest road: when they tell you something hard, thank them first and react second.",
    "Say yes where you can. Teens who have real room to grow have less reason to sneak.",
    "Ask what's underneath, and listen for what they're not saying, especially with missing money, new friends, falling grades, or changes in sleep and mood.",
    "For stealing or shoplifting, help them make it right. If there's legal trouble, talk with a lawyer about next steps.",
    "Bring in their doctor or school counselor if the lying or stealing keeps growing."
   ],
   "you": "Being lied to stings, and it can stir up fear about where your teen is headed. That's human. Talk with another adult you trust before you decide on consequences, and remember that the goal is a teen who tells you things, not a teen who's afraid of you."
  },
  "faith": "Many faith traditions have deep ways of making things right: confessing, forgiving, and starting over. For some teens, a faith mentor or youth leader is a safe person to tell first. For others, it's a coach or counselor. Either way, forgiveness and a fresh start are open to everyone.",
  "practices": [
   "branches|Friendship Repair",
   "branches|Active Listening",
   "branches|Name Your Trusted Adult",
   "trunk|What I Stand For",
   "bark|Self-Compassion Break",
   "bark|Speak Up About Your Mood"
  ],
  "reach": [
   "If someone is hurting you, threatening you, or pressuring you to steal or lie: Childhelp, 1-800-422-4453 (call or text, any time). In Minnesota, Day One, 1-866-223-1111 (or text 612-399-9995).",
   "If someone online is threatening to share a picture of you, or demanding money: you are not in trouble. Report it to the CyberTipline, 1-800-843-5678 or report.cybertip.org, and use Take It Down at takeitdown.ncmec.org.",
   "If you owe money from betting or gambling: in Minnesota, the problem gambling helpline, 1-800-333-4673 (or text HOPE to 53342), any time.",
   "If you're feeling hopeless or thinking about not wanting to be alive: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: 911.",
   "Your school counselor or doctor, if the lying, sneaking, or stealing keeps growing."
  ],
  "more": [
   [
    "Child Mind Institute",
    "https://childmind.org"
   ],
   [
    "Take It Down",
    "https://takeitdown.ncmec.org"
   ],
   [
    "Minnesota Alliance on Problem Gambling",
    "https://mnapg.org"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "parent-death",
  "ring": "pn-loss",
  "title": "When a parent or sibling dies",
  "keys": "my mom died my dad died my mother died my father died parent died my brother died my sister died sibling died death in the family grief grieving funeral lost my mom lost my dad lost my brother lost my sister miss them so much can't focus at school anniversary of their death bereaved teen",
  "parts": [
   "branches",
   "bark",
   "roots",
   "fruit"
  ],
  "quick": [
   "When a parent or sibling dies, your whole world shifts. There's no right way to grieve, and no deadline.",
   "Grief in the teen years often comes in waves: fine one hour, flattened the next. Both are normal.",
   "You can still laugh, hang out, and make plans. That's not forgetting. It's living, and they'd want that for you.",
   "You don't have to carry this alone. A grief group, a counselor, or one trusted adult can make a real difference."
  ],
  "feel": "Everything changed, and yet the bell still rings and the homework still comes. You might feel crushed, numb, angry, guilty, or strangely okay, sometimes all in one day. Maybe you replay the last thing you said to them, or the things you never got to say. Friends might not know what to say, so they say nothing, or the wrong thing. You may be taking on more at home, or trying to stay strong for the parent who's still here. If the death was sudden, it may not feel real yet. If it came after a long illness, you may feel relief too, and that's normal. All of it is part of grief.",
  "self": {
   "first": [
    "Let yourself feel what you feel. Crying, not crying, laughing at a memory: all of it is okay.",
    "Tell your school counselor what happened. Ask about a pass to step out of class when a wave hits, and more time on work for a while.",
    "Eat something, drink water, and try to sleep at regular times. Grief is exhausting for the body.",
    "Pick one or two people you can text when it's bad, even at night."
   ],
   "helps": [
    "Saying their name, telling stories, and keeping a few of their things close: a hoodie, a playlist, a photo on your phone.",
    "A grief group with other teens who've lost someone. Many hospices and grief centers host them, and some offer grief camps. It's a relief to be with people who get it.",
    "Writing to them, or about them: a letter, a journal page, a note in your phone.",
    "Moving your body: a run, shooting hoops, a long walk. Grief lives in the body too.",
    "Planning ahead for the hard days, like their birthday, the anniversary, holidays, and big moments like games, prom, and graduation.",
    "Letting someone know if you're taking on too much at home."
   ],
   "tell": [
    "“There's no right way to grieve.”",
    "“I can miss them and still have a good day.”",
    "“My love for them keeps going.”"
   ],
   "people": "You can tell friends what helps. Try: “You don't have to say the perfect thing. Just keep inviting me, and it's okay to say their name.” At home, try: “I miss them too. Can we talk about them sometimes?”"
  },
  "helper": {
   "feel": "A teen who has lost a parent or sibling may look fine one minute and fall apart the next. Many hide their grief to protect the parent who's still here, or because they don't want to stand out at school. Some feel guilt, some anger, some numbness. After a sibling dies, teens often feel forgotten while the adults grieve. Grief can come back in new ways at each milestone, years later.",
   "say": [
    "“I'm so sorry. Tell me about her, if you want to.”",
    "“There's no right way to feel. Whatever you're feeling is okay with me.”",
    "“What's the hardest time of day right now?”",
    "“I'm here, and I'm not going anywhere.”"
   ],
   "avoid": [
    "“He's in a better place,” or “Everything happens for a reason.” They can shut down a teen's real feelings.",
    "“You're the man of the house now,” or any role that asks them to replace the one who died.",
    "Comparing their grief with yours, or with a sibling's.",
    "Deciding for them whether they'll see the body, go to the funeral, or keep something. Offer choices, and explain what to expect.",
    "Disappearing after the first month."
   ],
   "help": [
    "Tell the truth in plain words, and answer their questions honestly, even the hard ones.",
    "Keep routines and gentle limits. Steady days are comforting, even in grief.",
    "Let the school know, with the teen's okay, and ask for a plan: a person to go to, a pass, flexibility on work.",
    "Say the name of the person who died, and mark the anniversary and birthday together, in a way the teen helps choose.",
    "Look for a teen grief group or grief camp nearby. Hospices and grief centers often host them.",
    "Watch gently for signs that grief is getting stuck: pulling away for weeks, grades sliding hard, drinking or drugs, reckless driving, or talk of wanting to be with the person who died. Bring in a counselor, and call or text 988 if they talk about not wanting to be alive.",
    "Pine keeps a teen's check-in private. If their answers raise a concern, you'll see only a quiet “Please check in” alert."
   ],
   "you": "If you're the surviving parent, you're grieving too, maybe while handling everything else. Your teen doesn't need you to be fine. It's okay to cry in front of them and say, “I miss him too.” Find your own support, a group, a counselor, or friends, so you're not carrying it alone, and let other trusted adults share the load."
  },
  "faith": "For some families, faith is one door through grief: prayers, a funeral or memorial, a community that keeps showing up, a sense that love goes on. Others find comfort in family traditions, nature, music, or memories. A death can also stir big questions about God, fairness, and why, and those questions belong here too. A faith leader, youth leader, or counselor can sit with them without needing quick answers.",
  "practices": [
   "bark|Name It",
   "trunk|Expressive Writing",
   "roots|Lament",
   "branches|Ask for Help",
   "leaves|Walk or Jog",
   "fruit|Capture the Moment"
  ],
  "reach": [
   "If you think about wanting to be with them, or not wanting to be alive: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: 911.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team.",
   "Teen Line, teens answering teens: call 800-852-8336 or text TEEN to 839863 in the evening.",
   "Your school counselor, for a plan at school and to find a teen grief group.",
   "If hospice cared for the person who died, ask about its grief support for teens.",
   "A grief counselor, if grief stays heavy for months or keeps you from daily life."
  ],
  "more": [
   [
    "The Dougy Center for Grieving Children and Families",
    "https://www.dougy.org/"
   ],
   [
    "Judi's House: Childhood Grief in America",
    "https://judishouse.org/childhood-grief-in-america/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "friend-death",
  "ring": "pn-loss",
  "title": "When a friend or classmate dies",
  "keys": "my friend died best friend died classmate died student died someone at school died friend died by suicide friend killed in a crash overdose friend died of cancer memorial vigil school grief whole school is sad i should have known it's my fault i didn't even know them that well guilt rumors posts about them",
  "parts": [
   "branches",
   "bark",
   "fruit",
   "roots"
  ],
  "quick": [
   "Losing a friend or classmate is a real loss, whether you were best friends or barely knew them.",
   "Grief at this age often shakes your sense that young people are safe. That makes it extra hard.",
   "If your friend died by suicide, it is not your fault. Suicide has many causes, and no single person causes it or could have stopped it alone.",
   "Check on each other, and bring in a trusted adult when a friend seems really low."
  ],
  "feel": "The news spreads fast, through texts, posts, and the hallway, sometimes before anyone official says a word. You might feel shocked, numb, or sick to your stomach. Some people cry for days. Some feel nothing yet and wonder what's wrong with them. If you were close, you might feel like your grief gets less room than their family's. If you barely knew them, you might feel like you don't have a right to be sad, and you do. Guilt is common: the last message you didn't answer, the fight you never fixed, the sign you think you missed. If the death was by suicide or an overdose, rumors and questions can make it even harder. All of these feelings are part of grief.",
  "self": {
   "first": [
    "Let yourself be sad, or shaken, however close you were.",
    "Find a trusted adult today: a parent, coach, school counselor, youth leader. Schools often bring in extra counselors after a death; you can go, even more than once.",
    "Take breaks from the posts, group chats, and rumors when they get to be too much.",
    "Stick close to friends, and check on each other, especially the ones who are quiet."
   ],
   "helps": [
    "Going to the funeral, memorial, or vigil if you can, or making your own goodbye: a letter, a song, a walk to a place you shared.",
    "Telling the good stories about them, the funny ones and the real ones.",
    "Doing something in their honor: wearing their color at a game, raising money for something they cared about, helping their family in a small way.",
    "Sleep, food, and moving your body, even when you don't feel like it.",
    "Talking with a counselor if guilt keeps circling, or if the shock doesn't ease after a few weeks."
   ],
   "tell": [
    "“My grief counts, however close we were.”",
    "“It is not my fault.”",
    "“I can honor them by looking after myself and my friends.”"
   ],
   "people": "If a friend seems really low, you can say: “I've been worried about you since we found out. How are you really doing?” If they say something that scares you, you don't have to keep it a secret. Tell a trusted adult, today."
  },
  "helper": {
   "feel": "When a young person dies, a teen's sense that their own life is safe and long can crack. Teens may feel shock, guilt, fear, or anger, and their grief is often overlooked if they were “just” a friend or classmate. After a suicide, close friends and those already struggling may be at higher risk themselves. Social media can make everything faster and louder: rumors, memorial posts, and graphic details.",
   "say": [
    "“I heard about Jordan. I'm so sorry. How are you doing with it?”",
    "“Tell me about him.”",
    "“Whatever you're feeling, sad, angry, numb, it all makes sense.”",
    "If you're worried: “Are you thinking about suicide?” Asking directly doesn't put the idea in their head."
   ],
   "avoid": [
    "“You didn't even know her that well.”",
    "“Don't think about it,” or changing the subject fast.",
    "Talking about how someone died in detail, or describing a suicide as peaceful, brave, or a way out.",
    "Blaming the person who died, or anyone else.",
    "Promising to keep it a secret if a teen tells you a friend is in danger."
   ],
   "help": [
    "Tell them what happened in plain words, before rumors do, and answer what you can.",
    "Let them go to the funeral, memorial, or vigil if they want to, and go with them.",
    "Help them limit time with the posts, rumors, and pictures, without taking away the friends who are grieving with them.",
    "Watch for warning signs: pulling away, talk of not wanting to be alive or of joining their friend, giving things away, sudden calm after being very low, more drinking or drugs, or reckless driving. Ask directly, and call or text 988 together.",
    "If there are guns or a lot of medicine at home, lock them up or keep them somewhere else for now.",
    "Pine keeps a teen's check-in private. If their answers raise a concern, you'll see only a quiet “Please check in” alert."
   ],
   "you": "The death of a young person shakes adults too, and it may stir fear for your own teen. Talk with another adult about that fear, so your teen gets your steadiness. You don't need the right words; staying close and keeping the door open is what helps."
  },
  "faith": "For some teens, faith is one door through a friend's death: a prayer, a vigil, a youth group that gathers, a sense that their friend is held. Others find comfort in music, nature, or being together. A young person's death often brings big questions about fairness and why, and those are welcome. A faith leader, youth leader, or counselor can sit with those questions without needing quick answers.",
  "practices": [
   "branches|Look Out for a Friend",
   "branches|Friends",
   "bark|Five Senses Pause",
   "bark|Phone Check",
   "trunk|Expressive Writing",
   "roots|Hold Someone in Light"
  ],
  "reach": [
   "If you're thinking about not wanting to be alive, or about joining your friend: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: 911.",
   "If you're worried about a friend: you can call or text 988 to talk about how to help them, and tell a trusted adult today.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team.",
   "Teen Line, teens answering teens: call 800-852-8336 or text TEEN to 839863 in the evening.",
   "Your school counselor, for support at school and help finding a teen grief group.",
   "A grief counselor, if guilt or shock stays heavy for weeks or keeps you from daily life."
  ],
  "more": [
   [
    "The Dougy Center for Grieving Children and Families",
    "https://www.dougy.org/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "grandparent-death",
  "ring": "pn-loss",
  "title": "When a grandparent dies",
  "keys": "grandma died grandpa died grandmother died grandfather died grandparent died lost my grandma lost my grandpa nana papa great grandma funeral hospice grief first death raised by my grandparents lived with my grandma mom is so sad dad is grieving wish i had visited more",
  "parts": [
   "branches",
   "roots",
   "bark",
   "fruit"
  ],
  "quick": [
   "Losing a grandparent can be a big loss, especially if they helped raise you, lived with you, or were your person.",
   "It may be the first time you've grieved someone close. There's no right way to do it.",
   "Your parent may be grieving their own mom or dad. You can look out for each other.",
   "Their stories, traditions, and love keep going through you."
  ],
  "feel": "Maybe you saw it coming after a long illness or time in hospice, or maybe it was sudden. You might feel deeply sad, or not as sad as you expected, and wonder if something's wrong with that. Nothing is. If they lived with you, raised you, or were the one you went to, it may feel like losing a parent. You may wish you'd visited more, called more, or put your phone down when you were together. You might be watching your mom or dad cry for the first time, and not know what to do. Some people feel relief that a grandparent isn't suffering anymore, and that's normal too.",
  "self": {
   "first": [
    "Let it be as big as it is for you. Grief for a grandparent counts fully.",
    "Ask what's happening next, like the visitation, funeral, or memorial, and what you'd like your part to be.",
    "Tell a teacher, coach, or your counselor, especially if it's affecting school or practice.",
    "Check on your parent with something simple: a hug, sitting together, “I miss her too.”"
   ],
   "helps": [
    "Saying goodbye your way: reading something at the funeral, writing a letter, choosing a song, carrying a photo.",
    "Collecting their stories from your parents, aunts, uncles, and their friends. Write them down or record them.",
    "Keeping something of theirs: a recipe, a tool, a sweater, a phrase they always said.",
    "Carrying on a tradition they started, like a holiday dish, a fishing trip, or a card game.",
    "If you wish you'd done more, writing them a letter that says what you wanted to say. Regret is a form of love."
   ],
   "tell": [
    "“There's no right amount of sad.”",
    "“They're part of who I am.”",
    "“I can carry their stories forward.”"
   ],
   "people": "Try, with your parent or another relative: “Tell me a story about Grandpa when he was my age.” Or with friends: “My grandma died. I'm okay at school, but I might be quiet for a while.”"
  },
  "helper": {
   "feel": "For many teens, a grandparent's death is the first close loss. Some feel it deeply, especially if the grandparent raised them, lived with them, or was a steady adult in their life. Others feel less than they expected and quietly worry about that. Teens often notice a parent's grief and may hide their own so they won't add to it. If they missed visits or felt awkward during a long illness, guilt may come later.",
   "say": [
    "“I'm so sorry about Grandma. What do you remember most about her?”",
    "“There's no right way to feel. Whatever you feel is okay.”",
    "“Would you like to have a part in the service? It's okay if you don't.”",
    "“I miss him too. Can we talk about him sometimes?”"
   ],
   "avoid": [
    "“She lived a long life” as the first or only thing you say.",
    "“You need to be strong for your mom.” Teens shouldn't have to hold the family up.",
    "Telling them how much to feel, either way.",
    "Leaving them out of the plans and rituals, or pushing them to do a part they don't want."
   ],
   "help": [
    "Explain what to expect at the visitation, funeral, or burial, and let them choose how close to be.",
    "Invite them into the stories: look through photos together, ask relatives to share memories, and let the teen ask questions.",
    "Let them see you grieve, and tell them it's okay, so they don't have to hide theirs.",
    "If the grandparent raised them or lived with them, treat it like the loss of a parent: tell the school, look for a teen grief group, and watch for grief that gets stuck.",
    "Mark the birthday and the anniversary in a way your teen helps choose.",
    "Pine keeps a teen's check-in private. If their answers raise a concern, you'll see only a quiet “Please check in” alert."
   ],
   "you": "If the one who died was your own parent, you're grieving while you parent. You don't have to hide it or hold it all together. Lean on your own people, let other adults help your teen too, and give yourself the same patience you're giving them."
  },
  "faith": "For many families, a grandparent's faith is part of their legacy: the hymns they sang, the prayers they said, the place they worshiped. A teen may find comfort in those traditions, or simply in a quiet place outside, music, or family stories. A death can also bring up questions about God and what happens after, and those belong here too. A faith leader, youth leader, or trusted relative can explore them with your teen, with no pressure for answers.",
  "practices": [
   "branches|Ask an Elder",
   "fruit|Capture the Moment",
   "branches|Family",
   "trunk|Expressive Writing",
   "roots|Hold Someone in Light",
   "branches|Shared Meal"
  ],
  "reach": [
   "If grief brings thoughts of not wanting to be alive: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: 911.",
   "Teen Line, teens answering teens: call 800-852-8336 or text TEEN to 839863 in the evening.",
   "If hospice cared for your grandparent, ask about its grief support for teens and families.",
   "Your school counselor, if grief is affecting school, or to find a teen grief group.",
   "A grief counselor, if grief stays heavy for months, especially if your grandparent raised you."
  ],
  "more": [
   [
    "The Dougy Center for Grieving Children and Families",
    "https://www.dougy.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "car-crash",
  "ring": "pn-loss",
  "title": "Car crashes and new drivers",
  "keys": "car accident crash wreck totaled the car i crashed got in an accident fender bender new driver teen driver permit license scared to drive driving anxiety friend hurt in a crash friend killed in a crash passenger concussion whiplash insurance ticket guilt it was my fault can't stop replaying it",
  "parts": [
   "leaves",
   "bark",
   "branches"
  ],
  "quick": [
   "After any crash, get checked by a doctor, even if you feel fine. Some injuries, like concussions, show up later.",
   "Feeling shaky, jumpy, or replaying it for days or weeks afterward is a common reaction, and it usually eases with time and support.",
   "If you were driving, the first thing that matters is that you're alive. Insurance, tickets, and what comes next can be sorted out later, with help.",
   "Getting back in the car in small, planned steps helps fear shrink. If a friend was hurt or killed, lean on people; you don't have to carry it alone."
  ],
  "feel": "It happened in seconds, and now it replays in slow motion. Maybe it was a fender bender, maybe the car was totaled, maybe someone got hurt. You might feel shaky, jumpy at every brake light, or not feel much at all yet. If you were driving, you may be scared of what your parents will say, or flooded with guilt, even if it wasn't your fault. If you were a passenger, you might feel nervous getting into any car. If a friend was badly hurt or died, you might feel guilt for being okay, anger, or a heaviness that won't lift. Some people can't stop thinking about it; others can't remember parts of it. All of these are common reactions to something scary.",
  "self": {
   "first": [
    "Get checked by a doctor, even if you feel fine.",
    "Know the warning signs after a hit to the head: a headache that gets worse, vomiting, confusion, being very sleepy or hard to wake, slurred speech, or one pupil bigger than the other. Any of these: go to the emergency room or call 911.",
    "Rest your brain and body for a few days if you're sore or have a concussion, and follow your doctor's plan for school, screens, sports, and driving.",
    "Tell someone how you're actually doing, not just “I'm fine.”"
   ],
   "helps": [
    "Talking about what happened with someone you trust, as much or as little as you want.",
    "Keeping normal routines: sleep, meals, school, practice, friends, as your doctor allows.",
    "Getting back behind the wheel in small steps: a parking lot, then a quiet street, then daylight drives on familiar roads, with a calm adult beside you.",
    "A calm routine before every drive: phone away and silenced, seat belt on, a slow breath, and leaving a little early.",
    "Setting your own rules as a driver: no phone, few or no passengers at first, extra caution at night. Most teen crashes come from inexperience, speed, distraction, and friends in the car.",
    "If a friend was hurt, a text, a visit, or helping their family in a small way. If a friend died, the guide on when a friend or classmate dies has more."
   ],
   "tell": [
    "“I'm alive, and that matters most.”",
    "“A mistake isn't who I am.”",
    "“Fear shrinks when I take small steps.”"
   ],
   "people": "Try: “I'm not okay about the crash yet. Can we talk about it?” Or, when you're ready to drive again: “Can you ride with me on a short, easy drive this weekend?”"
  },
  "helper": {
   "feel": "A teen after a crash may be shaken, sore, ashamed, defensive, or scared of your reaction, especially if they were driving. Some act like nothing happened. Concussion signs can be easy to miss in the first hours and days. If someone else was hurt or killed, they may carry heavy guilt, even when the crash wasn't their fault, and grief can spread across a whole school.",
   "say": [
    "“I'm so glad you're okay. Everything else can wait.”",
    "“What was the hardest part?”",
    "“We'll figure out driving again together.”",
    "“If you ever need a ride, call me, any time. We'll talk tomorrow, not tonight.”"
   ],
   "avoid": [
    "Yelling at the scene, in the emergency room, or on the drive home.",
    "Deciding consequences in the first hours.",
    "Taking the keys forever with no plan to rebuild.",
    "“It's just a car,” if they're grieving the scare, or a friend who was hurt."
   ],
   "help": [
    "Get them checked by a doctor, even if they feel fine, and watch for concussion warning signs for the next few days.",
    "Lead with relief that they're alive. Talk about what happened, insurance, tickets, and what comes next later, when everyone is calm.",
    "Rebuild driving in small, planned steps, with you or another calm adult riding along, and a clear path back to driving on their own.",
    "Set driving agreements together: phone away, few or no passengers at first, limits on night driving, seat belts every time, and a ride home with no questions that night if they need one.",
    "Watch for stress that lasts: nightmares, avoiding cars completely, jumpiness, or pulling away for more than a few weeks. A counselor can help.",
    "If a friend was hurt or killed, watch for guilt, reckless behavior, or talk of not wanting to be alive. Call or text 988 together if you're worried.",
    "If there are charges or legal questions, talk with a lawyer about next steps."
   ],
   "you": "A call about a crash is one of a parent's worst fears. Your own body may stay on high alert for days. Give yourself time to calm down before the big talks, and talk with another adult about your fear, so your teen gets your relief first."
  },
  "faith": "For some families, gratitude after a close call finds its way into prayer, a blessing, or a quiet moment of thanks. If someone was badly hurt or died, faith can be one door through grief and hard questions, alongside family, friends, and a counselor.",
  "practices": [
   "leaves|Driving Calm",
   "bark|Slow Exhale",
   "bark|Five Senses Pause",
   "branches|Easy Ways Out",
   "leaves|Rest Day",
   "bark|Speak Up About Your Mood"
  ],
  "reach": [
   "Emergency, or any concussion warning sign (a headache that gets worse, vomiting, confusion, hard to wake, slurred speech): call 911 or go to the emergency room.",
   "Your doctor, after any crash, even if you feel fine.",
   "If guilt or grief brings thoughts of not wanting to be alive: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Teen Line, teens answering teens: call 800-852-8336 or text TEEN to 839863 in the evening.",
   "A counselor, if fear, nightmares, or replaying it last more than a few weeks, or keep you out of cars.",
   "Your school counselor, if a classmate was hurt or killed and school feels heavy."
  ],
  "more": [
   [
    "CDC HEADS UP: Concussion",
    "https://www.cdc.gov/heads-up/"
   ],
   [
    "CDC: Teen drivers",
    "https://cdc.gov/teen-drivers/risk-factors/index.html"
   ],
   [
    "NHTSA: Teen driving",
    "https://www.nhtsa.gov/road-safety/teen-driving"
   ],
   [
    "National Child Traumatic Stress Network",
    "https://www.nctsn.org"
   ]
  ]
 },
 {
  "id": "loved-one-ill",
  "ring": "pn-loss",
  "title": "When someone you love is seriously ill",
  "keys": "sick parent mom has cancer dad has cancer cancer chemo hospital hospice parent sick sibling sick grandparent sick serious illness dying terminal stroke heart attack surgery icu scared they will die helping take care caregiver can't focus at school nobody gets it guilty for having fun",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "When someone you love is very sick, your whole life can tilt. Fear, sadness, anger, and even normal boredom can all show up in one day.",
   "You're allowed to ask real questions and get honest answers.",
   "Keeping parts of your own life going, like school, friends, practice, and fun, is healthy. It is not selfish.",
   "Helping out matters, and so does having one adult who looks out for you."
  ],
  "feel": "Maybe it started with a phone call, a word like cancer, or a parent sitting you down at the kitchen table. Now there are appointments, a different mood at home, and grown-ups talking quietly in the next room. You might feel scared one minute and numb the next. You might feel angry at the illness, at the person, or at everyone who keeps asking how they're doing and never asks about you. Some teens throw themselves into helping. Some can't stand being home. Some laugh with friends and then feel guilty for it. If you're doing more at home, like cooking, driving siblings, or helping with care, you may feel proud and worn out at the same time. All of it is normal.",
  "self": {
   "first": [
    "Ask one adult you trust for the plain truth: what the illness is, what the next few weeks look like, and what might change for you.",
    "Pick one friend who gets to know what's going on, so you aren't carrying it alone at school.",
    "Keep one thing that is just yours this week: a practice, a game, a show, a walk, time with friends."
   ],
   "helps": [
    "Writing your questions down and asking them, even the scary ones. Not knowing is often harder than knowing.",
    "Letting a teacher or counselor know. They can give you extra time or a quiet place when a day is too heavy.",
    "Finding small ways to connect with the person who is sick: a playlist, a show you watch together, a text, sitting nearby while they rest.",
    "Saying yes when someone offers a ride, a meal, or a night out. Help for your family includes help for you.",
    "Moving your body and sleeping when you can. Stress lives in the body too."
   ],
   "tell": [
    "“I can love them and still need a break.”",
    "“Having fun is not the same as not caring.”",
    "“I don't have to be the strong one all the time.”"
   ],
   "people": "Try, with a parent or another adult: “Can you tell me what's really going on? I'd rather know.” With a friend: “My mom is really sick. I don't need you to fix it. I just wanted you to know.”"
  },
  "helper": {
   "feel": "Teens often look fine on the outside while they carry a great deal inside. Many hold back questions to protect the adults around them. Some take on adult jobs at home without being asked. Others pull away, stay out late, or bury themselves in their phones, because home feels too heavy. Expect mood swings, trouble focusing, and sudden tears or anger over small things. These are normal responses to fear and loss, not signs that something is wrong with them.",
   "say": [
    "“You can ask me anything about this. If I don't know, I'll tell you that, and we'll find out.”",
    "“What's the hardest part for you right now?”",
    "“It's okay to go to the game. They want your life to keep going.”",
    "“You've been carrying a lot at home. Thank you. Let's make sure someone is looking out for you too.”"
   ],
   "avoid": [
    "Keeping the illness a secret. Teens usually sense it, and silence leaves them alone with worse guesses.",
    "“Be strong for your mom.” It asks them to hide what they feel.",
    "Leaning on them as your main emotional support. Find adults for that.",
    "Handing them adult-sized jobs without asking how they're doing with it."
   ],
   "help": [
    "Give honest, plain information in small pieces, and come back to it often. Let them choose how much detail they want.",
    "Tell the school: a counselor and one or two teachers. Ask for flexibility on deadlines during the hardest weeks.",
    "Protect parts of their normal life: practice, friends, a job, a regular meal together.",
    "Name one steady adult they can go to: an aunt, a coach, a youth leader, a family friend.",
    "If the illness may lead to death, let them choose whether and how to be part of the last weeks, and prepare them for what they may see."
   ],
   "you": "You may be the one caring for the sick person, or the one who is sick. Either way you can't do it all. Ask for help with rides, meals, and time with your teen, and find someone to talk to yourself. Pine keeps your teen's answers private; if a check-in shows they are losing hope or feeling alone, you'll see a quiet “Please check in.”"
  },
  "faith": "When someone is seriously ill, big questions come up: why this is happening, what happens after we die, whether anyone is listening. For some teens, prayer, a faith community, worship, or a favorite verse or song is a real comfort. For others, quiet time, nature, music, or a family tradition holds them. Some feel closer to God, and some feel far away or even angry. All of these are honest. Faith can be a comfort, and it can also be hard for a while. A pastor, chaplain, youth leader, or any wise adult can listen without needing you to have answers.",
  "practices": [
   "bark|Name It",
   "bark|Slow Exhale",
   "bark|Speak Up About Your Mood",
   "branches|Name Your Trusted Adult",
   "branches|Ask for Help",
   "fruit|Something to Look Forward To",
   "roots|Quiet Time"
  ],
  "reach": [
   "Feeling down, numb, or not caring about things for two weeks or more: tell a parent, a school counselor, or your doctor.",
   "Feeling like you can't go on, or thinking about not wanting to be here: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Teen Line, teens answering teens: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863.",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911.",
   "If the illness is cancer, the National Cancer Institute has a guide written and tested with teens: When Your Parent Has Cancer.",
   "If you help care for someone at home, the American Association of Caregiving Youth has programs for teens who do."
  ],
  "more": [
   [
    "When Your Parent Has Cancer: A Guide for Teens (National Cancer Institute)",
    "https://www.cancer.gov/publications/patient-education/when-your-parent-has-cancer"
   ],
   [
    "The Dougy Center for Grieving Children and Families",
    "https://www.dougy.org/"
   ],
   [
    "American Association of Caregiving Youth",
    "https://aacy.org/"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org/"
   ]
  ]
 },
 {
  "id": "sleep",
  "ring": "pn-body",
  "title": "Sleep and the teen body clock",
  "keys": "sleep tired exhausted can't fall asleep can't sleep up late night owl insomnia staying up on my phone waking up early school starts too early sleepy in class naps weekends sleep in body clock how much sleep do teens need drowsy driving caffeine energy drinks",
  "parts": [
   "leaves",
   "bark",
   "fruit"
  ],
  "quick": [
   "Teens need about 8 to 10 hours of sleep a night. Most high schoolers get less.",
   "Around puberty, your body clock shifts later. Feeling wide awake at 11 p.m. is biology, not laziness.",
   "A steady wake time, morning light, and a phone that charges outside your room help the most.",
   "Sleep feeds mood, focus, sports, and patience. It is part of tending your whole self."
  ],
  "feel": "You're exhausted all day, then wide awake at night. You lie there scrolling because sleep won't come, then the alarm goes off way too early. Mornings feel like a fight, first hour feels like fog, and weekends turn into catch-up. Maybe practice, a job, homework, and friends all want the same evening hours. Maybe adults call you lazy, when you're actually running on empty. If you feel cranky, foggy, anxious, or down, short sleep may be part of it.",
  "self": {
   "first": [
    "Pick one wake time you can keep most days, weekends included, within about an hour.",
    "Tonight, charge your phone outside your bedroom, or at least across the room.",
    "Get outside, or near a bright window, in the first hour after you wake up."
   ],
   "helps": [
    "A wind-down hour before bed: dimmer lights, something calm, and screens set aside or turned way down.",
    "Keeping caffeine and energy drinks to the morning, or skipping them. Their effect lasts many hours.",
    "A short nap, 20 to 30 minutes, early in the afternoon, when you need one. Long or late naps push bedtime later.",
    "Moving your body during the day. It helps you fall asleep faster at night.",
    "Writing worries or tomorrow's to-do list on paper before bed, so your brain can let go of them."
   ],
   "tell": [
    "“My body clock is real. I'm not lazy.”",
    "“Sleep is part of training, studying, and feeling okay.”",
    "“Tonight is a new night. I can start again.”"
   ],
   "people": "Try, at home: “Can we all charge our phones in the kitchen at night? I'll do it if you will.” With a coach or boss: “I need to be done by 9 on school nights so I can sleep.”"
  },
  "helper": {
   "feel": "Teens aren't being difficult when they can't fall asleep at 10. Around puberty, the body releases its sleep signal later in the evening, by up to two hours. Early school start times, homework, sports, jobs, and phones then squeeze the night from both ends. A short-sleeping teen can look moody, unmotivated, or forgetful, when they are actually tired.",
   "say": [
    "“You're not lazy. Teen body clocks really do run later.”",
    "“What gets in the way of sleep most nights?”",
    "“Want to try an hour with no phones before bed, together, this week?”",
    "“What's one thing on your schedule we could move?”"
   ],
   "avoid": [
    "Calling them lazy, or treating sleeping in as a character flaw.",
    "Taking the phone as a punishment. Set a family charging spot as a shared rule instead.",
    "Letting weekend sleep-ins run until afternoon. It shifts the clock even later.",
    "Scheduling them so full that sleep is the only thing left to cut."
   ],
   "help": [
    "Make a family charging station outside bedrooms, and use it yourself.",
    "Help them keep a steady wake time, with daylight and breakfast soon after.",
    "Look at the whole week together: practices, shifts, homework, and screens. Protect the hours for sleep first.",
    "Never let them drive drowsy. Offer a ride or a pickup, no questions asked.",
    "Loud snoring, gasping in sleep, or deep sleepiness even after enough hours: talk with their doctor."
   ],
   "you": "You can't make anyone fall asleep, but you can shape a home where sleep is easier: dimmer evenings, a shared charging spot, and calm mornings. Your own habits teach more than any rule."
  },
  "faith": "Many faith traditions honor rest. Some families end the day with a prayer, a blessing, or a few quiet words of thanks, and some teens find that a short evening prayer or a quiet moment of gratitude helps them let go of the day. If faith isn't part of your evening, a few minutes of quiet, music, or writing down one good thing can do the same work.",
  "practices": [
   "leaves|Sleep",
   "leaves|Steady Wake Time",
   "leaves|Phone Outside the Bedroom",
   "leaves|Morning Daylight",
   "leaves|Smart Nap",
   "bark|Worry Window",
   "fruit|Three Good Things"
  ],
  "reach": [
   "Trouble sleeping most nights for weeks, loud snoring or gasping, or deep sleepiness even after enough sleep: talk with your doctor.",
   "Lying awake with worries that won't stop, or feeling down for two weeks or more: tell a parent, a school counselor, or your doctor.",
   "Too sleepy to drive: don't. Call someone for a ride.",
   "Feeling like you can't go on: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "How much sleep teens need, American Academy of Sleep Medicine",
    "https://aasm.org/resources/pdf/pediatricsleepdurationconsensus.pdf"
   ],
   [
    "School start times for adolescents, American Academy of Pediatrics",
    "https://publications.aap.org/pediatrics/article/134/3/642/74175/School-Start-Times-for-Adolescents"
   ],
   [
    "Teen sleep, CDC Youth Risk Behavior Survey",
    "https://www.cdc.gov/yrbs/dstr/dietary-physical-sleep-behaviors.html"
   ]
  ]
 },
 {
  "id": "body-image",
  "ring": "pn-body",
  "title": "Body image and comparison",
  "keys": "body image hate my body ugly fat too skinny too short not muscular enough acne skin looks appearance comparing myself comparison instagram tiktok filters edited photos mirror weight comments puberty changes locker room embarrassed self-conscious selfies want to look like",
  "parts": [
   "leaves",
   "bark",
   "roots"
  ],
  "quick": [
   "Almost everyone your age feels unsure about their body sometimes. Your body is changing fast, and feeds show edited, filtered, chosen images all day.",
   "Nearly half of teens say social media makes them feel worse about their bodies. Your feed is something you can change.",
   "Talking to yourself like you would to a good friend lowers distress. Harshness rarely helps.",
   "Your body is how you live your life: how you move, laugh, play, hug, and create. It's more than how it looks."
  ],
  "feel": "Maybe you catch your reflection and start picking it apart. Maybe you scroll past someone who looks the way you wish you did, and your mood drops before you even notice. Puberty may have come early, late, or all at once. Someone might have made a comment, even a joke, that you still replay. Some days you'd rather skip the pool, the locker room, or the photo. If you spend a lot of time checking, comparing, hiding, or trying to fix how you look, you aren't shallow. You're carrying something heavy that a lot of people carry quietly.",
  "self": {
   "first": [
    "Go through your feed and mute or unfollow three accounts that leave you feeling worse about yourself.",
    "Once a day, name one thing your body let you do: a laugh, a run, a hug, a song, a good meal.",
    "When the mean voice starts, ask: would I say this to a friend? Then say what you would say to them."
   ],
   "helps": [
    "Following people who make you feel inspired, curious, or like yourself, instead of people you measure yourself against.",
    "Moving for fun, strength, or energy, not to change how you look.",
    "Remembering that most images online are posed, filtered, edited, or chosen from many tries.",
    "Spending time with people and in places where looks aren't the point: a team, a band, a job, a club, a youth group.",
    "Wearing clothes that fit the body you have today."
   ],
   "tell": [
    "“My body is how I live, not just how I look.”",
    "“I'm comparing my everyday to someone's best picture.”",
    "“I can be kind to myself today.”"
   ],
   "people": "Try, with a friend: “Can we make a deal not to trash-talk our bodies around each other?” At home: “It helps me when we don't talk about weight or diets.”"
  },
  "helper": {
   "feel": "Teens notice every comment about bodies, including the ones adults make about their own. Puberty brings fast changes that can feel out of their control. Feeds show a constant stream of edited images, and comparison can happen dozens of times an hour. A teen who seems vain may actually be anxious; one who hides in big clothes may be ashamed. Most worries about looks are a normal part of this age, and some grow into something heavier.",
   "say": [
    "“I love how you laugh with your brother.” Praise who they are and what they do.",
    "“A lot of what you see online is edited. It's hard not to compare anyway.”",
    "“How do you feel after you scroll? Better, worse, or about the same?”",
    "“Your body is doing a lot of growing right now. That's a lot to get used to.”"
   ],
   "avoid": [
    "Any comments on weight, size, or shape, including praise for weight loss.",
    "Talking about your own body or diet in harsh terms. Teens learn from it.",
    "Teasing about puberty, skin, height, or changes, even in fun.",
    "Taking away the phone as the first answer. Help them shape what they see."
   ],
   "help": [
    "Make home a place where bodies aren't graded: no diet talk, no weight jokes, no comments about other people's looks.",
    "Talk about strength, energy, sleep, and health, not appearance.",
    "Sit with them and look at their feed together, if they are willing. Ask which accounts leave them feeling better and which worse.",
    "Notice skipped meals, rigid food rules, hours of exercise, or hiding the body. These may point to an eating disorder: talk with their doctor soon.",
    "Coaches: avoid weigh-ins and comments about bodies, and talk about fuel and recovery instead."
   ],
   "you": "Your own words about bodies, yours included, teach more than any lecture. Pine keeps your teen's answers private; if a check-in shows they are losing hope or feeling alone, you'll see a quiet “Please check in.”"
  },
  "faith": "For some teens, faith is a real help here. Many traditions teach that every person has worth far beyond how they look, and a short prayer, a favorite verse, or a quiet moment with God can soften a harsh day. For others, the same truth comes through family, friends, music, or time outside: your worth is in who you are, how you treat people, and what you love.",
  "practices": [
   "bark|Self-Compassion Break",
   "bark|Kind Voice Letter",
   "bark|Phone Check",
   "leaves|Movement",
   "leaves|Food",
   "fruit|Joy List",
   "trunk|Name Your Gifts"
  ],
  "reach": [
   "If food, weight, or exercise starts to feel like rules you can't break: tell someone you trust, and see the Eating Disorders guide. ANAD Eating Disorders Helpline: 1-888-375-7767, Monday to Friday, 9 a.m. to 9 p.m. Central.",
   "Feeling down or anxious about your body most days for two weeks or more: tell a parent, a school counselor, or your doctor.",
   "NAMI HelpLine, for questions and support: 1-800-950-6264, weekdays (not a crisis line).",
   "Feeling like you can't go on: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "Social Media and Youth Mental Health, US Surgeon General",
    "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf"
   ],
   [
    "ANAD Eating Disorders Helpline",
    "https://anad.org/get-support/eating-disorders-helpline/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "eating",
  "ring": "pn-body",
  "title": "Eating disorders",
  "keys": "eating disorder anorexia bulimia binge eating arfid restricting not eating skipping meals food rules calories counting calories cutting weight making weight wrestling dance running athlete over exercising purging throwing up guilt after eating scared to eat friend not eating worried about my friend",
  "parts": [
   "leaves",
   "bark",
   "branches"
  ],
  "quick": [
   "Eating disorders are serious illnesses, and they can happen at any body size, to anyone.",
   "They often start inside goals that sound healthy, like eating clean, training hard, or making weight.",
   "Recovery is real. The earlier someone gets help, the better it usually goes.",
   "For teens, research supports family-centered treatment most, with parents helping at meals and a team guiding."
  ],
  "feel": "It might not feel like a problem at first. Maybe it started with a goal: eating cleaner, getting faster, making weight, looking a certain way for a photo or a dance. Then the rules got stricter. Now food might be on your mind most of the day. You might feel calm when you follow the rules and panicked or guilty when you don't. Maybe you eat a lot at once and feel out of control, then ashamed. You might hide it, or feel annoyed when people notice. Or maybe this is about a friend, and you've seen them skip lunch, disappear after meals, or run every day no matter what. Whatever brought you here, it's a sign of strength that you're looking.",
  "self": {
   "first": [
    "If food, weight, or exercise feels like rules you can't break, tell one person you trust this week: a parent, a school counselor, a coach, a doctor.",
    "Keep eating regular meals and snacks while you get help. Your body and brain need steady fuel.",
    "If you're worried about a friend, tell a trusted adult. You don't have to fix it yourself."
   ],
   "helps": [
    "Knowing that an eating disorder is an illness, not a choice or a failure of willpower.",
    "Seeing a doctor who can check how your body is doing. Some dangers don't show on the outside.",
    "Letting your family be part of the plan. For teens, that often helps most.",
    "Muting accounts about dieting, “what I eat in a day,” or body checking.",
    "Moving for fun and strength, not to earn or burn food."
   ],
   "tell": [
    "“This is an illness. It's not my fault, and I don't have to fight it alone.”",
    "“The rules feel safe, but they aren't keeping me safe.”",
    "“My body needs fuel to do the things I love.”"
   ],
   "people": "Try: “I've been having a really hard time with food, and I think I need help.” Or, about a friend: “I'm worried about someone. Can I tell you what I've noticed?”"
  },
  "helper": {
   "feel": "High school brings sports, weight classes, dance, social media, and a lot of talk about bodies. Eating disorders often grow quietly inside healthy-sounding goals. A teen can be seriously ill and still look fine, keep their grades up, and say everything is okay. Many feel deep shame, or truly don't see that anything is wrong. Pushback or anger when you raise it is part of the illness, not a verdict on you.",
   "say": [
    "“I love you, and I'm worried about how stressful eating has gotten.”",
    "“We're going to the doctor to check how your body is doing.”",
    "“This isn't your fault, and you don't have to fight it alone.”",
    "“I'm on your side, even when it doesn't feel like it.”"
   ],
   "avoid": [
    "Any comments about weight, size, or shape, including praise for weight loss.",
    "Arguing about food at every meal. Let the treatment team guide how meals go.",
    "Waiting until they want help. With eating disorders, wanting help often comes later.",
    "Blaming yourself or them. Eating disorders have many causes, and blame slows recovery."
   ],
   "help": [
    "If you're worried, trust it. Book a doctor visit and share specific things you have seen.",
    "Ask about family-based treatment, where parents take the lead at meals with a treatment team guiding. Research supports it most for teens. It is hard work, and it helps.",
    "Keep meals regular and calm, and eat together when you can.",
    "If your teen is an athlete or dancer, talk with the coach about weigh-ins, cutting weight, and comments about bodies.",
    "Get emergency help for fainting, chest pain, confusion, or a racing or very slow heartbeat."
   ],
   "you": "Supporting recovery is exhausting. Find support for yourself too, through ANAD, a parent group, or a counselor. Pine keeps your teen's answers private; if a check-in shows they are losing hope or feeling alone, you'll see a quiet “Please check in.”"
  },
  "faith": "Some teens find comfort in prayer, a faith community, or a felt sense of being loved by God just as they are, apart from how they eat or look. Others find it in family, friends, music, or nature. If a faith practice, like fasting, ever starts to feel tied up with food rules, talk with a trusted faith leader and your treatment team; many traditions excuse people who are unwell from fasting.",
  "practices": [
   "leaves|Food",
   "leaves|Fuel Up",
   "leaves|Rest Day",
   "bark|Self-Compassion Break",
   "bark|Speak Up About Your Mood",
   "branches|Name Your Trusted Adult",
   "branches|Shared Meal"
  ],
  "reach": [
   "ANAD Eating Disorders Helpline: 1-888-375-7767, Monday to Friday, 9 a.m. to 9 p.m. Central. For teens, families, and friends.",
   "Your doctor or school nurse can check how your body is doing and help you find treatment.",
   "In Minnesota, The Emily Program offers eating disorder treatment for teens and families.",
   "Fainting, chest pain, confusion, or a racing or very slow heartbeat: call 911.",
   "Feeling like you can't go on: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "NAMI HelpLine, for families looking for help: 1-800-950-6264, weekdays (not a crisis line)."
  ],
  "more": [
   [
    "ANAD Eating Disorders Helpline",
    "https://anad.org/get-support/eating-disorders-helpline/"
   ],
   [
    "The Emily Program (Minnesota)",
    "https://emilyprogram.com/"
   ],
   [
    "National Alliance for Eating Disorders",
    "https://www.allianceforeatingdisorders.com"
   ],
   [
    "Eating disorders in children and teens, American Academy of Pediatrics",
    "https://doi.org/10.1542/peds.2020-040279"
   ]
  ]
 },
 {
  "id": "concussion",
  "ring": "pn-body",
  "title": "Concussion and sports injuries",
  "keys": "concussion hit my head head injury headache after a hit dizzy blurry vision sports injury torn acl broken bone sprain out for the season can't play sitting out return to play return to learn injured athlete football hockey soccer volleyball wrestling crash fall screens hurt my head foggy",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "quick": [
   "After any hit to the head, stop, sit out, and get checked. When in doubt, sit it out.",
   "In Minnesota, a coach must pull a player with signs of a concussion, and the player needs written permission from a trained provider to return.",
   "Most teens feel better within a few weeks. Return to school and sports step by step.",
   "Being hurt can feel like losing a piece of who you are. That grief is real, and your place on the team is still yours."
  ],
  "feel": "One second you were playing, and the next you were on the ground, or on the bench with a headache that wouldn't go away. Maybe it was a hit to the head, a torn ligament, a broken bone, or pain that kept building. Now you're sitting out, maybe for a week, maybe for the season. Headaches, light, noise, and screens might bother you. School might feel harder, and your mood might be shorter. You might feel left out of your team, worried about your spot, or frustrated that you can't just push through. If sports are a big part of who you are, being hurt can feel like losing that part for a while.",
  "self": {
   "first": [
    "After any hit to the head, tell your coach, athletic trainer, or a parent right away, even if you feel fine. Symptoms can show up hours later.",
    "Follow your doctor's plan for rest, school, and getting back to play, one step at a time.",
    "Stay part of the team in a new way: go to practices or games when you can, keep stats, cheer, text your teammates."
   ],
   "helps": [
    "A day or two of quieter activity after a concussion, then easing back into daily life as your symptoms allow.",
    "Asking your school for help while you heal: shorter days, breaks, extra time, or fewer screens.",
    "Doing what you can for the rest of your body, as your doctor allows.",
    "Setting goals that aren't about the scoreboard: healing, strength, learning the game from the sidelines.",
    "Talking about the frustration. It's real, and it's easier to carry with someone."
   ],
   "tell": [
    "“Sitting out today keeps me playing later.”",
    "“I'm still part of this team.”",
    "“Healing is training too.”"
   ],
   "people": "Try, with a coach: “I got hit and I don't feel right. I need to sit out and get checked.” With a teacher: “I'm healing from a concussion. Can I have extra time and a break when my head hurts?”"
  },
  "helper": {
   "feel": "Many teens want to hide symptoms so they can keep playing, or so they don't let the team down. After an injury, they may feel cut off from friends, unsure about their spot, and impatient with healing. A concussion can bring headaches, trouble focusing, sensitivity to light and noise, sleep changes, and mood swings for a while. If sports are a big part of who they are, an injury can feel like a real loss.",
   "say": [
    "“Thank you for telling me. You did the right thing.”",
    "“Your spot on this team doesn't depend on playing hurt.”",
    "“What's the hardest part about sitting out?”",
    "“How can you stay part of the team while you heal?”"
   ],
   "avoid": [
    "“Shake it off,” or any pressure to play through a possible head injury.",
    "Sending them back to sports before a trained provider gives written permission.",
    "Treating sitting out as weakness, or leaving them out of team life while they heal.",
    "Long stretches in a dark room with no activity. Gradual return works better than total rest."
   ],
   "help": [
    "Learn the danger signs and act on them: a headache that gets worse, repeated vomiting, unusual sleepiness or can't be woken, one pupil larger than the other, slurred speech, weakness or numbness, a seizure, or growing confusion. Get emergency care right away.",
    "Tell the school, so teachers can offer shorter days, breaks, extra time, or fewer screens while symptoms last.",
    "Follow a step-by-step return to sports, guided by their doctor or athletic trainer.",
    "Keep them connected: rides to practice, team dinners, a role on the sideline.",
    "If symptoms or low mood last more than a few weeks, go back to the doctor."
   ],
   "you": "Coaches and parents set the tone. Teens watch how adults react. When speaking up is praised, telling gets easier. Stay calm, stay curious, and keep their whole life, not just their sport, in view."
  },
  "faith": "An injury can raise questions about who you are when you can't do the thing you love. For some teens, prayer, a faith community, or a youth group gives them a place to belong while they heal. For others, it's family, friends, music, or time outside. Either way, your worth was never about how you play.",
  "practices": [
   "leaves|Rest Day",
   "leaves|Sleep",
   "leaves|Stretch Break",
   "bark|Five Senses Pause",
   "bark|Bounce Back From a Setback",
   "trunk|Name Your Gifts",
   "branches|Clubs"
  ],
  "reach": [
   "Danger signs after a head injury: a headache that gets worse, repeated vomiting, unusual sleepiness or can't be woken, one pupil larger than the other, slurred speech, weakness or numbness, a seizure, or growing confusion. Call 911 or go to the emergency room right away.",
   "Any hit to the head with symptoms: stop playing and see a doctor or athletic trainer.",
   "Symptoms that last more than a few weeks, or trouble keeping up at school: go back to your doctor.",
   "Feeling down or hopeless for two weeks or more: tell a parent, a school counselor, or your doctor.",
   "Feeling like you can't go on: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "CDC HEADS UP: Concussion",
    "https://www.cdc.gov/heads-up/"
   ],
   [
    "CDC HEADS UP guidelines, including returning to school",
    "https://www.cdc.gov/heads-up/guidelines/index.html"
   ],
   [
    "Minnesota law on concussions in youth sports",
    "https://www.revisor.mn.gov/statutes/cite/121A.37"
   ]
  ]
 },
 {
  "id": "chronic-illness",
  "ring": "pn-body",
  "title": "Living with a chronic illness or disability",
  "keys": "chronic illness disability diabetes type 1 asthma epilepsy seizures crohn's colitis arthritis chronic pain migraines heart condition cancer survivor wheelchair hearing loss vision loss new diagnosis different from friends missing school 504 plan iep accommodations doctor appointments managing my own meds tired of being sick nobody understands",
  "parts": [
   "leaves",
   "trunk",
   "branches"
  ],
  "quick": [
   "You are a whole person, not a diagnosis. Your condition is one part of your life.",
   "Feeling frustrated, tired, or different some days is normal. So is having great days.",
   "High school is the time to start running more of your own health, one skill at a time.",
   "School supports like a 504 plan or an IEP are your right, not a favor."
  ],
  "feel": "Maybe you were born with it, or maybe the diagnosis came recently and changed everything. Either way, you're doing things your friends never think about: counting, checking, taking medicine, skipping things, explaining. Some days you're tired of being the one who's different, or tired of people asking. Some days your body doesn't cooperate and you miss school, practice, or plans. You might feel angry, sad, or invisible, and also proud of how much you handle. You might want more independence and also want someone to just take care of it for a day. All of that is real, and you're not alone in it.",
  "self": {
   "first": [
    "Pick one health task you could take over this month: ordering a refill, booking an appointment, or talking first at your next visit.",
    "Write down one question for your next doctor visit, and ask it yourself.",
    "Decide who at school you want to know about your condition, and what you want them to know. Who you tell is your choice."
   ],
   "helps": [
    "Learning your own condition well enough to explain it in a sentence or two.",
    "Asking your school about a 504 plan or an IEP if your condition affects class, tests, attendance, or getting around.",
    "Finding activities that fit your body: adapted sports, music, art, a job, a club. Movement in any form counts.",
    "Connecting with other teens who live with the same condition, through a clinic, camp, or group.",
    "Spending some time with your doctor on your own. Many clinics offer this to teens."
   ],
   "tell": [
    "“I'm a whole person. This is one part of my life.”",
    "“Asking for what I need is a skill, not a weakness.”",
    "“I can have a hard day and still have a good life.”"
   ],
   "people": "Try, with a friend: “I have diabetes. If I ever seem off, here's what to do.” With a teacher: “My condition sometimes keeps me out. Can we plan ahead for how I'll catch up?”"
  },
  "helper": {
   "feel": "Teens with a chronic condition carry a lot that their friends never see. Many want to be treated like everyone else. They may push back on rules, skip treatment around friends, or hide symptoms to fit in. At the same time, they are moving toward adulthood, when they will run their own health. Frustration, sadness, and worry are common, and so are courage and humor.",
   "say": [
    "“What part of managing this would you like to take over next?”",
    "“What do you want your friends and teachers to know, and what's private?”",
    "“That sounds exhausting. Tell me about it.”",
    "“You're so much more than this.”"
   ],
   "avoid": [
    "Talking about them, instead of with them, at appointments.",
    "Using their condition to explain every mood or problem.",
    "Saying no to things automatically. Ask what it would take to make it work.",
    "Treating a missed dose or a slip as a moral failure. Problem-solve together instead."
   ],
   "help": [
    "Move from manager to coach: hand over one task at a time, and stay close while they learn it.",
    "Give them time alone with their doctor at visits, and let them ask questions first.",
    "Work with the school on a 504 plan or an IEP if needed. In Minnesota, PACER Center helps families with both.",
    "Help them plan ahead for trips, parties, practices, and overnights, so they can say yes.",
    "Watch for low mood or worry that lasts. Teens with ongoing health conditions benefit from someone to talk to, and at 16 in Minnesota, they can ask for counseling themselves."
   ],
   "you": "Caring for a teen with a chronic condition is a long road, and your own rest and support matter. Pine keeps your teen's answers private; if a check-in shows they are losing hope or feeling alone, you'll see a quiet “Please check in.”"
  },
  "faith": "Living with an illness or disability can raise hard questions: why me, and what does this mean for my life. Some teens find strength in prayer, a faith community, or a felt sense that God is with them in it. Others find it in family, friends, nature, or music. Some feel angry or far from God for a while. All of these are honest. A youth leader, chaplain, or any wise adult can listen without needing to explain it away.",
  "practices": [
   "trunk|Life Skill of the Month",
   "trunk|Name Your Gifts",
   "trunk|Next Steps Page",
   "leaves|Movement",
   "leaves|Rest Day",
   "bark|Self-Compassion Break",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Feeling down, numb, or anxious for two weeks or more: tell a parent, your doctor, or a school counselor. In Minnesota, at 16 you can ask for outpatient counseling on your own.",
   "Feeling like you can't go on: call or text 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a county crisis team: call **CRISIS (274747) from a cell phone.",
   "NAMI HelpLine, for questions and support: 1-800-950-6264, weekdays (not a crisis line).",
   "Danger right now, or a medical emergency: call 911.",
   "School supports and transition planning in Minnesota: PACER Center.",
   "Taking over your own health care: Got Transition has checklists for teens and families."
  ],
  "more": [
   [
    "PACER Center (Minnesota)",
    "https://www.pacer.org/"
   ],
   [
    "Got Transition: moving to adult health care",
    "https://gottransition.org/six-core-elements"
   ],
   [
    "Minor consent in Minnesota, Minnesota Department of Health",
    "https://www.health.state.mn.us/people/adolescent/youth/minorconsent.pdf"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "substances",
  "ring": "pn-body",
  "title": "Vaping, drinking, and drugs",
  "keys": "vaping vape nicotine juul e cig drinking alcohol beer party weed marijuana thc edibles pills fentanyl drugs high drunk peer pressure offered something everyone does it how to say no getting out of a party friend passed out overdose stress coping",
  "parts": [
   "leaves",
   "branches",
   "bark",
   "trunk"
  ],
  "quick": [
   "Most high schoolers aren't using. In a 2024 national survey, about two in three 12th graders hadn't used alcohol, nicotine, or marijuana in the past month.",
   "Deciding ahead of time, with a line you'd really say, makes no easier in the moment.",
   "A pill from a friend, a dealer, or social media can be fake and hold fentanyl, even when it looks real.",
   "If someone can't wake up or is having trouble breathing, call 911 right away and stay with them."
  ],
  "feel": "Maybe it's offered at a party, in a car, or in a bathroom at school, and everyone seems to be watching. Maybe friends make it sound normal, or you're curious, or you just want the pressure to stop. Some people reach for something because they're stressed, can't sleep, or want a hard feeling to go quiet for a while. You might feel left out when you say no, or worried about a friend who seems to be using more. All of that is common, and you get to decide what's right for you.",
  "self": {
   "first": [
    "Pick two lines you'd actually say: “I'm good, I've got practice,” “My parents check,” or simply “No thanks.”",
    "Set up a code word with a parent or trusted adult: you text it, they come get you, no questions that night.",
    "Know your exits before you go: who's driving, who you can call, and when you'll leave."
   ],
   "helps": [
    "Going places with a friend who has your back, and agreeing to leave together.",
    "Keeping a drink of your own in your hand. Fewer people offer.",
    "Noticing when you want something to change how you feel, and trying another way first: a walk, music, a shower, a text to a friend.",
    "Sleep, food, and movement. Being tired and hungry makes pressure louder.",
    "Talking with a doctor or counselor if vaping or anything else has started to feel hard to stop. Quitting nicotine is easier with help."
   ],
   "tell": [
    "“I don't owe anyone an explanation.”",
    "“Leaving is always an option.”",
    "“If I'm using something to cope, I can find a better tool, and I can ask for help finding it.”"
   ],
   "people": "Try: “Can we set up a code word? If I ever text it, come get me, and we'll talk the next day.” Or, about a friend: “I'm worried about someone. Can I tell you without saying who?”"
  },
  "helper": {
   "feel": "They may be offered something long before you think, and they may feel stuck between fitting in and doing what they believe is right. Many teens are curious, some are stressed, and some are already using something to cope. Most want a way out that doesn't cost them their friends. They're watching whether talking to you leads to help or to a fight.",
   "say": [
    "“Most kids your age aren't using. If you ever want out of a situation, I'll come get you. No questions that night.”",
    "“What would you say if someone offered you something?”",
    "“If a friend is ever in trouble, call 911 first. We'll sort out the rest later.”",
    "“What do people at school say helps with stress? What actually helps you?”"
   ],
   "avoid": [
    "Asking them to confess what they've tried. Talk about readiness and choices, not a list of what they've done.",
    "Scare stories or a long lecture. They tune out quickly.",
    "Assuming every bad mood means drugs.",
    "Searching their room or phone as a first step. Talk first, unless there's a safety emergency."
   ],
   "help": [
    "Set up a code word, and keep your promise when they use it.",
    "Know where they're going and who's driving, the same way every time, without drama.",
    "Keep alcohol and medicines, especially leftover pain pills, locked or out of the house.",
    "Ask their doctor to talk with them privately at their yearly visit. Teens often tell a doctor more.",
    "If you're worried about regular use, call the SAMHSA National Helpline for next steps, or ask their doctor."
   ],
   "you": "What you do with alcohol, nicotine, and medicine teaches more than any talk. Be honest with yourself about that, without shame. If someone in your family struggles with drinking or drugs, support is there for you too."
  },
  "faith": "If faith is part of your life, it can be one place to find people who've got your back, and a reason to choose what you believe is right when it's hard. Some people pray for courage before a party, or ask a youth leader to be one of their code word adults. If faith isn't part of your life, your values and the people who care about you can do the same work.",
  "practices": [
   "branches|Easy Ways Out",
   "branches|Look Out for a Friend",
   "branches|Name Your Trusted Adult",
   "bark|Name It",
   "bark|Slow Exhale",
   "trunk|What I Stand For"
  ],
  "reach": [
   "Someone can't wake up, is breathing slowly or strangely, or seems very confused: call 911 right away and stay with them.",
   "Feeling like you can't stop vaping, drinking, or using something: tell a doctor, school counselor, or trusted adult. The SAMHSA National Helpline, 1-800-662-4357, answers any time, in English and Spanish.",
   "If using something is how you're getting through thoughts of not wanting to be alive: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "A family member's drinking or drug use is weighing on you: Alateen, for teens.",
   "Pressure from someone you're dating to drink or use: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/helplines/national-helpline"
   ],
   [
    "DEA: One Pill Can Kill",
    "https://www.dea.gov/onepill"
   ],
   [
    "Alateen, Teen Corner (Al-Anon)",
    "https://al-anon.org/newcomers/teen-corner-alateen/"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "anxiety",
  "ring": "pn-mind",
  "title": "Anxiety and panic",
  "keys": "anxiety anxious worry worried nervous stress stressed panic attack panicking cant breathe heart racing chest tight overthinking cant stop thinking test anxiety social anxiety scared to talk in class stomach ache before school avoiding things freaking out",
  "parts": [
   "bark",
   "leaves",
   "branches",
   "fruit"
  ],
  "quick": [
   "Anxiety is your body's alarm system. It's built to protect you, and sometimes it goes off when there's no real danger.",
   "A panic attack feels terrible, and it rises and then passes. Slow breathing out helps it pass.",
   "Avoiding what scares you shrinks your world. Small steps toward it shrink the fear.",
   "Anxiety is common in high school and it gets better with help. Doctors now check for it in kids and teens as part of regular visits."
  ],
  "feel": "A mind that won't stop running the worst case: the test, the group chat, the thing you said, the future. Your body joins in: a racing heart, a tight chest, a stomachache before school, shaky hands, trouble falling asleep. A panic attack can come out of nowhere and feel like you can't breathe or something is really wrong. You might start skipping things, staying quiet in class, or saying no to plans, just to keep the feeling away. Lots of people your age feel this, even the ones who look calm.",
  "self": {
   "first": [
    "Breathe out longer than you breathe in. In for four, out for six, five times.",
    "Ground yourself: name three things you can see, two you can hear, and one you can feel.",
    "Say it to yourself: “This is my alarm going off. It will pass.”"
   ],
   "helps": [
    "A worry window: fifteen minutes a day, not near bedtime, to write worries down. Save the rest for the window.",
    "Small steps toward what you've been avoiding, one at a time: raise your hand once, send the text, walk into the room.",
    "Sleep, movement, and going easy on caffeine and energy drinks, which can make a racing heart feel worse.",
    "A routine before big moments, like two slow breaths and a cue word, practiced on small moments first.",
    "Phone off before bed, and fewer notifications during the day.",
    "Talking with a school counselor or doctor if anxiety keeps you from things you care about. Therapy that teaches skills for anxiety works well for teens."
   ],
   "tell": [
    "“This is a feeling, not a fact.”",
    "“My body is trying to protect me. I can calm it down.”",
    "“I can do hard things nervous.”"
   ],
   "people": "Try: “I've been really anxious lately, more than I've let on. Can I tell you about it? I don't need you to fix it.” Or to a doctor: “Worry has been getting in the way of school and sleep.”"
  },
  "helper": {
   "feel": "They may feel embarrassed, or afraid that anxiety means something is wrong with them. A panic attack can be truly frightening. Many teens hide anxiety well, and some show it as irritability, stomachaches, or wanting to stay home.",
   "say": [
    "“That sounds really hard. I'm right here.”",
    "“What would help right now?”",
    "“You don't have to feel ready to take one small step.”",
    "“Let's breathe out slowly together.”"
   ],
   "avoid": [
    "“Just calm down,” or “There's nothing to worry about.”",
    "Arguing with every worry point by point.",
    "Letting them skip everything that scares them. It brings short relief, and the fear grows.",
    "Pushing them into the hardest thing all at once."
   ],
   "help": [
    "Stay calm yourself. Your steady breathing helps theirs.",
    "Help them break a feared thing into small steps, and notice each one they take.",
    "Protect sleep: a regular wake time, phones out of the bedroom at night.",
    "Talk with their doctor, who can check for anxiety and rule out other causes. Ask about therapy that teaches skills for anxiety.",
    "If panic includes chest pain or trouble breathing and you aren't sure what's happening, get medical help to be safe."
   ],
   "you": "Watching your teen struggle can stir up your own worry. Take care of your own sleep and stress, so you can be the calm in the room. You don't need to fix every fear. Steady company helps more than answers."
  },
  "faith": "If faith is part of your life, some people carry a short prayer or a verse for anxious moments, or use a breath prayer: one phrase on the breath in, one on the breath out. You don't need to feel peaceful to reach for peace. If faith isn't part of your life, music, nature, or a few slow breaths can do the same steadying work.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Five Senses Pause",
   "bark|Worry Window",
   "bark|Before the Big Moment",
   "leaves|Breathe",
   "leaves|Phone Outside the Bedroom"
  ],
  "reach": [
   "Anxiety that keeps you from school, friends, or sleep for more than a few weeks: talk with a school counselor or your doctor.",
   "Chest pain, fainting, or trouble breathing and you're not sure why: get medical help, or call 911.",
   "Feeling overwhelmed and needing someone now: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Teen Line, other teens who listen: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "NAMI HelpLine, for information and next steps (not a crisis line): 1-800-950-6264, weekdays."
  ],
  "more": [
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ],
   [
    "Crisis Text Line",
    "https://www.crisistextline.org/text-us/"
   ]
  ]
 },
 {
  "id": "depression",
  "ring": "pn-mind",
  "title": "Depression and feeling numb",
  "keys": "depression depressed sad numb empty flat nothing matters dont care anymore tired all the time cant get out of bed no motivation hopeless crying sleeping too much cant sleep lost interest quit everything alone not myself whats the point",
  "parts": [
   "bark",
   "fruit",
   "branches",
   "leaves"
  ],
  "quick": [
   "Depression can feel like sadness, or like nothing at all: numb, flat, or tired in a way sleep doesn't fix.",
   "It's common. In a 2023 national survey, about 4 in 10 high schoolers said they'd felt sad or hopeless almost every day for two weeks or more.",
   "It's not weakness or laziness, and it gets better with help. Tell one adult, and talk with a doctor or counselor.",
   "If you're thinking about not wanting to be alive, call or text 988, or text HOME to 741741, today."
  ],
  "feel": "Maybe things you used to love feel like nothing now. Getting out of bed takes everything. You sleep too much or can't sleep, eat more or barely eat. School feels pointless, friends feel far away, and texts sit unanswered. Some people feel sad and cry a lot. Others feel numb, empty, or irritable, and snap at people they love. You might tell yourself you're just lazy or that nobody would get it. Depression says things like that. They aren't the truth about you.",
  "self": {
   "first": [
    "Notice how long it's been. If you've felt low, numb, or uninterested in most things for two weeks or more, that's worth telling someone.",
    "Write one or two sentences about how you've really been. Pick one adult you could show them to.",
    "Do one small thing today: a shower, a walk outside, a text back to a friend. Small counts."
   ],
   "helps": [
    "Telling a parent, school counselor, coach, or doctor. A doctor can check for depression with a few short questions.",
    "Talk therapy, and sometimes medicine. Your doctor or counselor can help you and your family choose.",
    "Moving your body most days. Research on teens shows exercise eases low mood, even when you don't feel like it.",
    "Morning daylight and a steady wake time, even on weekends.",
    "Being around people, even if you don't talk much: eating with family, sitting with a friend, staying on the team.",
    "Doing one thing you used to enjoy, for ten minutes, before you feel like it. Feeling often follows doing."
   ],
   "tell": [
    "“This is depression talking, not the truth about me.”",
    "“Small steps still count.”",
    "“I don't have to feel like it to do the next thing.”"
   ],
   "people": "Try: “I haven't felt like myself for a while, and I think I need help.” If saying it is too hard, show someone this guide, or text it."
  },
  "helper": {
   "feel": "They may feel ashamed, like a burden, or convinced nothing will help. Many teens hide it well, and some show it as anger or shutting their door rather than tears. They may not have words for it yet.",
   "say": [
    "“I've noticed you haven't seemed like yourself. I'm not upset. I'm here.”",
    "“You don't have to explain it all. What's it been like?”",
    "“Let's talk with your doctor together. You're not in trouble.”",
    "“Are you thinking about killing yourself?” Asking plainly is safe, and it doesn't put the idea in their head."
   ],
   "avoid": [
    "“Snap out of it,” or “You have nothing to be sad about.”",
    "Calling it laziness or attitude.",
    "Taking away the activities and friends that still help, as a punishment for slipping grades.",
    "Waiting to see if it passes when it has lasted weeks."
   ],
   "help": [
    "Get them seen by their doctor or a counselor. Offer to make the call, and let them talk privately with the doctor too.",
    "Small invitations: a drive, a walk, a meal together. Keep inviting, even when they say no.",
    "Protect sleep and morning light, gently, without a fight.",
    "Lock up or remove guns, and lock up medicines, while things are hard. It's a simple step that saves lives.",
    "Let school know, if your teen agrees, so a counselor can check in during the day."
   ],
   "you": "Living beside a depressed teen is tiring and scary, and their mood can pull on yours. Keep your own sleep, walks, and people. Share the load with their doctor, the school, and family. You are a companion, not a cure."
  },
  "faith": "If faith is part of your life, honest sorrow has a long history there. Many traditions have words for feeling far away or empty, like the lament psalms. Some people find a youth leader or faith mentor a safe person to tell. Feeling numb doesn't mean you've failed at faith. If faith isn't part of your life, the same steadiness can come from people who keep showing up for you.",
  "practices": [
   "bark|Speak Up About Your Mood",
   "fruit|Tiny Next Step",
   "leaves|Walk or Jog",
   "leaves|Morning Daylight",
   "branches|One Reach-Out a Day",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Feeling low, numb, or uninterested in most things for two weeks or more: tell a trusted adult, and talk with your doctor or school counselor.",
   "Thoughts of not wanting to be alive, or of killing yourself: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911.",
   "Teen Line, other teens who listen: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "NAMI HelpLine, for information and next steps (not a crisis line): 1-800-950-6264, weekdays."
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
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "NAMI HelpLine",
    "https://www.nami.org/nami-helpline/"
   ]
  ]
 },
 {
  "id": "selfharm",
  "ring": "pn-mind",
  "title": "Self-harm",
  "keys": "self harm self-harm selfharm self injury cutting hurting myself on purpose hurting yourself urge to hurt myself scars hiding marks long sleeves relapse friend hurts themselves numb release punish myself",
  "parts": [
   "bark",
   "branches",
   "fruit",
   "roots"
  ],
  "quick": [
   "If you're hurting yourself to get through feelings that feel too big, you're not alone, you're not bad, and you deserve help.",
   "Help is here any time: call or text 988, or text HOME to 741741. Badly hurt or in danger: call 911.",
   "Self-harm is usually a way to cope, not a wish to die. It still deserves real help, and it can turn into more danger over time.",
   "Many people learn other ways through hard feelings and stop. Setbacks are part of it, not a reason to give up."
  ],
  "feel": "Maybe a feeling builds until it's too much: anger, panic, shame, emptiness, or numbness. Hurting yourself brings relief for a moment, and then the shame shows up, and the secret gets heavier. You might hide it, feel scared someone will find out, or feel relieved and terrified at once when someone does. Some people feel like they deserve it. Some just want to feel something. None of that makes you broken. It means you've been carrying a lot, mostly alone.",
  "self": {
   "first": [
    "If you're badly hurt or in danger, get an adult and call 911.",
    "When the urge comes, put some distance between you and it: go where other people are, and reach out. Call or text 988, or text HOME to 741741.",
    "Tell one trusted adult. You can borrow these words: “I've been hurting myself, and I need help.”"
   ],
   "helps": [
    "Naming the feeling underneath, and noticing what was happening right before the urge.",
    "Riding the wave: urges rise and fall. Breathing out slowly, moving your body, or holding on for ten minutes lets the peak pass.",
    "Being around people when the urge is strong. Leave the room you're in.",
    "Writing, drawing, music, or a walk to let the feeling out another way.",
    "A plan for hard moments, made on an okay day: your warning signs, what you can do instead, who you can reach, and help lines.",
    "A counselor or therapist. Therapies that teach skills for big feelings, like DBT, are built for exactly this."
   ],
   "tell": [
    "“I deserve help, not punishment.”",
    "“This feeling will pass, even if it doesn't feel like it.”",
    "“A setback isn't the end. I can start again today.”"
   ],
   "people": "Try: “I've been hurting myself when things get too big, and I need help.” If saying it is too hard, write it down or text it. If a friend tells you they're hurting themselves, don't keep it secret. Tell a trusted adult. That's how a real friend helps."
  },
  "helper": {
   "feel": "High schoolers who self-harm often hide it well and may have been doing it for a while before anyone knows. They may feel ashamed, angry that you found out, or relieved. Most are trying to get through feelings that feel too big. They're watching to see whether telling you was a mistake.",
   "say": [
    "“I'm not mad. I'm here, and I want to understand.”",
    "“What was happening right before?”",
    "“You don't have to stop alone. We'll get help together.”",
    "“Are you thinking about killing yourself?” Asking plainly is safe, and it doesn't put the idea in their head."
   ],
   "avoid": [
    "Yelling, punishing, or a shocked face. Breathe first.",
    "“Promise me you'll stop.” A promise they can't keep adds shame.",
    "Calling it attention-seeking. Reaching out is brave.",
    "Asking to see wounds out of curiosity, or about details. Ask only what you need for safety.",
    "Telling other parents, siblings, or friends, or posting about it."
   ],
   "help": [
    "Ask calmly whether any wounds need care, and get medical help when they do. For a serious injury, call 911.",
    "Get them seen this week by their doctor or a therapist, ideally one trained in DBT or another skills-based therapy. They're old enough to help choose.",
    "Put away sharp things and medicines, and lock up or remove guns, calmly, as safety and not punishment.",
    "Make a plan for hard moments together, in their words, and keep check-ins short, warm, and regular.",
    "Expect setbacks. Thank them every time they tell you."
   ],
   "you": "It's frightening to learn a teen you love is hurting themselves, and it can stir fear, guilt, or anger. Get support for yourself from a counselor or a trusted friend, and call 988 for guidance if you need it. Your steady love helps."
  },
  "faith": "If faith is part of your life, it may feel like a comfort, or like one more place you're afraid to disappoint. God, if you speak with God, is not waiting for you to stop before you're loved. Some people find a youth leader or faith mentor a safe person to tell. If faith isn't part of your life, worth and belonging come from the same place: people who stay with you through the hard parts.",
  "practices": [
   "bark|My Safety Plan",
   "bark|Name It",
   "bark|Slow Exhale",
   "bark|Kind Voice Letter",
   "branches|Name Your Trusted Adult",
   "bark|Speak Up About Your Mood"
  ],
  "reach": [
   "Badly hurt, or in danger right now: call 911.",
   "Urges to hurt yourself, or thoughts of not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "Teen Line, other teens who listen: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "Someone is hurting you: Childhelp, 1-800-422-4453 (call or text), or in Minnesota, Day One, 1-866-223-1111.",
   "A doctor, school counselor, or a therapist trained in DBT or another skills-based therapy."
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
    "JED Foundation",
    "https://jedfoundation.org"
   ]
  ]
 },
 {
  "id": "suicide-thoughts",
  "ring": "pn-mind",
  "title": "Thoughts of suicide, and making a safety plan",
  "keys": "suicide suicidal thoughts of suicide want to die wish i was dead dont want to be here dont want to be alive kill myself end it all everyone would be better off without me burden no way out hopeless safety plan crisis plan friend suicidal worried about a friend 988",
  "parts": [
   "fruit",
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "If you're thinking about suicide, reach out now: call or text 988, or text HOME to 741741. In danger right now: call 911.",
   "Thoughts of suicide are a sign of pain, not weakness. Many people have had them and found their way through with help.",
   "These thoughts usually come in waves. A safety plan, made on an okay day, helps you get through the hardest moments.",
   "Telling someone is one of the strongest things you can do. Asking about suicide doesn't put the idea in anyone's head."
  ],
  "feel": "Maybe the pain feels like it will never end, and you can't see a way out. You might feel like a burden, like everyone would be better off without you, or just so tired of feeling this way. The thoughts can come and go, or crowd in at night. You might feel scared of them, ashamed of them, or strangely calm. Whatever you're feeling, you deserve someone in it with you. The pain is real, and so is the chance that it gets better.",
  "self": {
   "first": [
    "If you might act on these thoughts, call 911 or go to an emergency room now. Or call or text 988.",
    "Tell one person today: a parent, school counselor, coach, relative, or friend who will get an adult. You can say, “I've been having thoughts of suicide, and I need help.”",
    "Put distance between you and anything you could use to hurt yourself. If there are guns or a lot of medicine at home, ask a grown-up to lock them up or keep them somewhere else for now."
   ],
   "helps": [
    "A safety plan, written on an okay day: your warning signs; what you can do on your own to get through a wave; people and places that help; adults you can ask for help; help lines; and how to make your space safer.",
    "Keeping your plan where you can find it fast: in your phone, your Pine journal, or on paper.",
    "Sharing your plan with one trusted adult, so they know how to help.",
    "A counselor or therapist, and your doctor. Thoughts of suicide respond to treatment, and you don't have to wait for things to get worse.",
    "Your reasons, big or small: a person, a pet, a song you want to hear again, something you want to see.",
    "Getting through the next hour, then the next. Waves pass, even very big ones."
   ],
   "tell": [
    "“This feeling is real, and it isn't permanent.”",
    "“I'm not a burden. I'm a person who needs help right now.”",
    "“Reaching out is strength.”"
   ],
   "people": "Try: “I've been having thoughts of suicide, and I need help.” If saying it is too hard, text it, write it down, or show someone this guide. If a friend tells you they're thinking about suicide, don't keep it secret, even if they ask. Stay with them, and tell a trusted adult right away."
  },
  "helper": {
   "feel": "They may feel like a burden, trapped, or too tired to keep going. Many are afraid to tell, because they worry about scaring you, getting in trouble, or being locked up. Some are relieved the moment someone finally asks.",
   "say": [
    "“Are you thinking about killing yourself?” Ask plainly and calmly. Asking is safe, and it doesn't put the idea in their head.",
    "“Thank you for telling me. I'm glad you did.”",
    "“You matter to me, and this can get better with help. We'll get it together.”",
    "“Let's make a plan for the hard moments, together.”"
   ],
   "avoid": [
    "“You have so much to live for.” It can make them feel unheard.",
    "“Promise me you won't.” A promise isn't a plan.",
    "Promising to keep it secret. Safety comes first, and you can say so kindly.",
    "Shock, anger, or a lecture. Keep your face and voice steady."
   ],
   "help": [
    "If they may act on it now, stay with them and call 911 or 988, or go to an emergency room.",
    "Remove guns from the home or lock them unloaded with ammunition locked separately, and lock up medicines, including over-the-counter ones. Safer storage goes with fewer youth suicides.",
    "Get them seen soon by a doctor or mental health professional, and go with them.",
    "Help them write a safety plan, in their words, and keep a copy where you can both find it.",
    "Check in often, warmly and briefly. Watch for warning signs: talk of being a burden, giving things away, saying goodbye, or a sudden calm after a hard stretch."
   ],
   "you": "Hearing that someone you love has thought about suicide is terrifying. You don't have to carry it alone. Call or text 988 for guidance any time, for them or for yourself, and lean on your own people. You are a lifeline, not a therapist, and getting them to help is the work."
  },
  "faith": "If faith is part of your life, it may hold comfort, or hard questions, or both. God, if you speak with God, is not a judge waiting for you to be stronger. Many people have prayed honest words from the bottom of a pit, and you can too. A faith leader you trust can be one of the people on your plan. If faith isn't part of your life, your reasons and your people are what you hold on to.",
  "practices": [
   "bark|My Safety Plan",
   "branches|Name Your Trusted Adult",
   "branches|Look Out for a Friend",
   "bark|Speak Up About Your Mood",
   "fruit|Hope Playlist",
   "bark|Slow Exhale"
  ],
  "reach": [
   "Thoughts of suicide, or not wanting to be alive: call or text 988, or chat at 988lifeline.org, any time.",
   "Text HOME to 741741, any time (in Minnesota, text MN to 741741).",
   "In danger right now, or might act on these thoughts: call 911, or go to an emergency room.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone. A county team can come to you.",
   "Teen Line, other teens who listen: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863. Other times, 988.",
   "Someone is hurting you: Childhelp, 1-800-422-4453 (call or text); someone you're dating, Love Is Respect, 1-866-331-9474 or text LOVEIS to 22522; in Minnesota, Day One, 1-866-223-1111.",
   "Someone is threatening you with a picture: you are not in trouble. Take It Down and the CyberTipline, 1-800-843-5678."
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
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ],
   [
    "Minnesota mobile crisis (**CRISIS)",
    "https://www.mnmhaccess.com/Home/Crisis"
   ],
   [
    "Means Matter (Harvard)",
    "https://hsph.harvard.edu/research/means-matter/resources/safe-storage-bibliography"
   ]
  ]
 },
 {
  "id": "counseling",
  "ring": "pn-mind",
  "title": "Getting counseling, and your rights at 16 in Minnesota",
  "keys": "counseling counselor therapy therapist see someone talk to someone mental health help how do i get help can i get therapy without my parents 16 consent minnesota confidential private will they tell my parents school counselor psychologist psychiatrist first appointment what to say insurance cost",
  "parts": [
   "bark",
   "branches",
   "trunk",
   "fruit"
  ],
  "quick": [
   "Asking for counseling is a strong, smart move, the same as seeing a doctor for an injury.",
   "In Minnesota, if you're 16 or older, you can agree to outpatient mental health care, like counseling and therapy, on your own, without a parent's permission.",
   "At any age, you can talk with your school counselor, and you can call or text 988 or text HOME to 741741.",
   "What you say in counseling mostly stays private. The main limit is safety, so ask at the start what would have to be shared."
  ],
  "feel": "Maybe you've been carrying something for a while and you think talking to someone might help, but you don't know where to start. You might worry about what your parents would think, whether it costs money, whether the counselor will tell anyone, or whether your problems are \"bad enough.\" Some teens have a parent who's all for it. Some have a parent who isn't sure, or a home where it's hard to bring up. Wanting help is a good sign. It means part of you is looking after you.",
  "self": {
   "first": [
    "Write one or two sentences about what's been going on and how long. That's enough to start.",
    "Pick your first door: your school counselor, your doctor, a parent or trusted adult, or a clinic.",
    "Use a simple opener: “I haven't felt like myself for a while, and I'd like to talk with someone.”"
   ],
   "helps": [
    "Knowing your options: a school counselor for a first talk; a therapist or counselor for regular sessions; your doctor, who can check your mood and refer you; a psychiatrist if medicine might help.",
    "Knowing the Minnesota rule: at 16 or 17, you can agree to outpatient counseling and therapy on your own. Under 16, a parent or guardian usually needs to agree, and your school counselor can help you figure out how to ask.",
    "Asking at the first visit: “What stays private, and what would you have to share?” Counselors share when someone's safety is at risk, and the law lets them tell a parent if keeping it from them would put your health in serious danger.",
    "Asking how billing works. If a parent's insurance pays, a statement may go home. Many schools also have counselors or mental health staff on site, so ask what's available.",
    "Giving it a few sessions. Fit matters. If a counselor isn't right for you, it's okay to ask for someone else.",
    "Including a parent when you're ready, if it's safe. Many teens find it helps, and you can decide together with your counselor how."
   ],
   "tell": [
    "“My problems don't have to be big to deserve help.”",
    "“Asking for help is me taking care of myself.”",
    "“I can go at my own pace.”"
   ],
   "people": "Try, with a parent: “I think talking to a counselor would help me. Would you help me find one?” Or with a school counselor: “I'd like to talk to someone, and I don't know where to start.”"
  },
  "helper": {
   "feel": "They may have been thinking about it for a while before saying anything. Some worry you'll be hurt, angry, or embarrassed, or that asking means something is badly wrong. Some want help but also want privacy, and that's a normal part of growing up, not a sign of a problem with you.",
   "say": [
    "“Thank you for telling me. I'm proud of you for asking.”",
    "“Let's find someone who's a good fit for you.”",
    "“What you talk about there can be yours. I just want you to have support.”",
    "“If the first person isn't right, we'll try someone else.”"
   ],
   "avoid": [
    "“Why can't you just talk to me?” Wanting another person to talk to is normal and healthy.",
    "Asking the counselor, or your teen, to tell you everything that's said.",
    "“You're fine. Other kids have it worse.”",
    "Waiting for things to get worse before acting."
   ],
   "help": [
    "Start with their doctor or the school counselor, who can refer you and check insurance.",
    "Let your teen help choose, and let them talk with the counselor privately.",
    "Respect their privacy. Counselors share with parents when safety is at stake, and Minnesota law lets them tell a parent when keeping it back would seriously risk your teen's health.",
    "Know the Minnesota rule: at 16 and older, your teen can agree to outpatient mental health care on their own. Your support still matters a great deal.",
    "Ask how billing and statements work, so there are no surprises for anyone.",
    "Keep life steady: meals, sleep, rides to appointments, and no pressure to report back."
   ],
   "you": "It can sting when your teen wants to talk to someone else. That's not a verdict on you. Teens who have more than one trusted adult are better off, and you are still one of them. If you're carrying a lot, counseling for yourself is a good step too."
  },
  "faith": "If faith is part of your life, a faith leader or youth leader can be one more person to talk with, and many work alongside counselors. Some families wonder whether needing counseling means faith isn't enough. Many traditions welcome every good kind of help, and caring for your mind is part of caring for your whole self. If faith isn't part of your life, the same is true: help is a strength.",
  "practices": [
   "bark|Speak Up About Your Mood",
   "branches|Ask for Help",
   "branches|Name Your Trusted Adult",
   "bark|Name It",
   "trunk|Journal",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Thoughts of not wanting to be alive, or you need someone right now: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741). No permission needed at any age.",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone.",
   "Danger right now: call 911.",
   "Teen Line, other teens who listen: call 800-852-8336 (evenings, 8 p.m. to midnight Central) or text TEEN to 839863.",
   "NAMI HelpLine, for help finding counseling and next steps (not a crisis line): 1-800-950-6264, weekdays.",
   "Someone is hurting you, at home or anywhere: Childhelp, 1-800-422-4453 (call or text), or in Minnesota, Day One, 1-866-223-1111. A school counselor can help too.",
   "This guide is general information, not legal advice. Your clinic or school counselor can tell you what applies to you."
  ],
  "more": [
   [
    "Minnesota Department of Health: minor consent summary",
    "https://www.health.state.mn.us/people/adolescent/youth/minorconsent.pdf"
   ],
   [
    "Minnesota Statutes 144.3431",
    "https://www.revisor.mn.gov/statutes/2024/cite/144.3431/pdf"
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
  "id": "sextortion",
  "ring": "pn-online",
  "title": "Sextortion and threats with a picture",
  "keys": "sextortion someone threatening me picture nude nudes pic photo sent a picture they want money pay or they post it blackmail threatening to share my pictures catfished fake account fake ai picture deepfake leaked screenshot scared to tell parents take it down cybertip report",
  "parts": [
   "bark",
   "branches",
   "fruit"
  ],
  "quick": [
   "If someone is threatening to share a picture of you, real or fake, you are not in trouble. The person threatening you is the one doing wrong.",
   "Stop replying. Don't pay, and don't send anything more. Paying almost never makes it stop.",
   "Save the messages and the username, then block and report the account.",
   "Tell one trusted adult today, and use Take It Down to help get pictures removed. This can be fixed, and you don't have to fix it alone."
  ],
  "feel": "It can start with a friendly stranger, often someone who seems your age, who flirts, compliments you, and moves fast. Then it flips: pay, or send more, or everyone you know sees this. Sometimes there was never a real picture at all, only a fake made with AI. Your heart may be pounding. You may feel trapped, stupid, ashamed, or sure your life is over. Those feelings are exactly what the person threatening you is counting on, so you'll keep quiet and pay. Thousands of teens go through this every year, many of them boys. It is a crime done to you, and there is a way through it.",
  "self": {
   "first": [
    "Stop replying. Don't argue, don't plead, and don't pay. Paying usually brings more demands, not fewer.",
    "Before you block, take screenshots: the messages, the username, the profile, and any payment details they sent.",
    "Block and report the account on the app or game.",
    "Tell one adult you trust, today: a parent, a relative, a coach, a counselor, or a youth leader. Say: “Someone online is threatening me with a picture, and I need help.”"
   ],
   "helps": [
    "Take It Down (takeitdown.ncmec.org): it helps get nude or sexual pictures taken when you were under 18 removed from many sites. The picture itself stays on your phone; only a digital fingerprint is shared.",
    "Reporting to the CyberTipline (report.cybertip.org, or 1-800-843-5678). The people there handle this every day, and they know you are the one who was harmed.",
    "Remembering that the threat is the scariest part. Many of these accounts move on when someone stops replying and reports.",
    "Getting your body out of alarm: a few slow breaths out, a glass of water, a walk, a friend sitting beside you.",
    "Talking it through later with a counselor, if the shame or fear stays loud."
   ],
   "tell": [
    "“I am not in trouble. I am being targeted.”",
    "“The shame belongs to the person threatening me, not to me.”",
    "“One bad night online does not get to decide my life.”"
   ],
   "people": "Try: “Something happened online and I'm scared. I need you to stay calm and help me.” If the first adult doesn't respond well, tell another one."
  },
  "helper": {
   "feel": "They may be terrified, ashamed, and sure you will be angry. Some teens hide this for days and quietly pay, hoping it ends. Boys are targeted often, and many feel they can't tell anyone. The hours after a threat can be dangerous, because shame and panic can make a teen feel there is no way out.",
   "say": [
    "Before anything happens: “If anyone ever threatens you with a picture, real or fake, come to me. You won't be in trouble.”",
    "“You did the right thing telling me. We'll handle this together.”",
    "“We don't pay, and we don't reply. We report.”",
    "“This happens to a lot of people, and it can be fixed.”"
   ],
   "avoid": [
    "Yelling, shaming, or asking “What were you thinking?”",
    "Taking their phone in the moment, which feels like punishment for telling.",
    "Deleting the messages before you have saved and reported them.",
    "Paying, or contacting the person yourself."
   ],
   "help": [
    "Stay calm on the outside, even if you are furious inside. Your teen is watching your face.",
    "Help save the evidence, then report to the CyberTipline (report.cybertip.org, 1-800-843-5678) and use Take It Down together.",
    "Stay close for the next few days. Check in at night, when it often feels worst.",
    "If anything points to thoughts of not wanting to be alive, stay with them and call or text 988 together. Danger right now: 911."
   ],
   "you": "You may feel rage at the person who did this, fear, or even a flash of anger at your teen. Let those feelings out with another adult, away from your teen. What your teen will remember is that you stayed steady and on their side."
  },
  "faith": "If faith is part of your life, you may worry that God or your faith community will see you differently now. Many people find that faith is a place of mercy, not judgment, especially when someone has been tricked and threatened. A youth leader, pastor, or faith mentor you trust can be one more adult in your corner. If faith isn't part of your life, the same truth holds: you are worth protecting, and what someone did to you does not define you.",
  "practices": [
   "branches|Name Your Trusted Adult",
   "branches|Ask for Help",
   "bark|Slow Exhale",
   "bark|Name It",
   "bark|Self-Compassion Break",
   "bark|My Safety Plan"
  ],
  "reach": [
   "Someone threatening you with a picture: Take It Down (takeitdown.ncmec.org) to help remove images, and the CyberTipline (report.cybertip.org, or 1-800-843-5678) to report. You are not in trouble.",
   "If it feels so heavy you don't want to be alive: call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team, any time.",
   "Teen Line, teens answering teens: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863.",
   "If the person threatening you is someone you know or are dating: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522.",
   "If an adult in your life is pressuring you for pictures: Childhelp, call or text 1-800-422-4453, any time."
  ],
  "more": [
   [
    "Take It Down",
    "https://takeitdown.ncmec.org"
   ],
   [
    "NCMEC CyberTipline",
    "https://report.cybertip.org"
   ],
   [
    "NCMEC: Sextortion",
    "https://www.missingkids.org/theissues/sextortion"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "porn",
  "ring": "pn-online",
  "title": "Pornography",
  "keys": "porn pornography explicit videos sexual videos saw something i didn't want to see popped up can't stop watching watching too much guilty ashamed curious is it normal compulsive habit nudes how do i talk to my teen about porn found porn on my kid's phone",
  "parts": [
   "bark",
   "branches",
   "trunk"
  ],
  "quick": [
   "Most teens have seen pornography by high school, and many came across it by accident. Curiosity is normal, and shame doesn't help anyone.",
   "Porn is made to sell, not to teach. It often shows pressure and aggression as normal, which real relationships are not.",
   "Respect, consent, and care are what real closeness is built on. You get to decide what you want your life to look like.",
   "If it starts to feel hard to stop, or someone is pressuring you to watch or share, talk with an adult you trust."
  ],
  "feel": "Maybe it popped up on a phone, in a group chat, or on a friend's screen before you were ready. Maybe you went looking because you were curious. You might feel curious, embarrassed, guilty, unbothered, or all of those in one week. Some teens feel it's no big deal; others feel it's taking more of their time or attention than they want. Some feel confused about what's real, about their own body, or about what a partner will expect. All of these are common. None of them make you a bad person.",
  "self": {
   "first": [
    "If something shows up you didn't want to see: close it, and give yourself a moment. Seeing it is not something you did wrong.",
    "Notice how you feel afterward, not just during. Your own reaction is useful information.",
    "If you want to cut back, make it easier on yourself: phone charging outside your room at night, and filters or settings you choose."
   ],
   "helps": [
    "Knowing that porn is a product, made to keep people watching. The bodies, reactions, and pressure in it are staged.",
    "Real information about bodies, sex, and respect from trusted sources: a parent, a doctor, a health class, or a counselor.",
    "Thinking through what you want in a real relationship someday: kindness, trust, laughing together, both people truly saying yes.",
    "Filling the late-night, bored, or lonely times with something else that works for you: a friend, music, a walk, sleep.",
    "If it feels hard to stop, talking with a counselor. That's a skill to build, not a character flaw."
   ],
   "tell": [
    "“Curiosity is normal. I get to choose what I let shape me.”",
    "“Real closeness is built on respect, and on both people saying yes.”",
    "“If something feels out of my control, asking for help is strong.”"
   ],
   "people": "You don't owe anyone details. If you want to talk, try: “Can I ask you something kind of awkward? I want real information, not whatever the internet says.”"
  },
  "helper": {
   "feel": "By high school, most teens have seen pornography, often by accident, with a first look around age twelve on average. They may feel curious, guilty, defensive, or like it's no big deal. What they need from you isn't panic or a search of their phone. It's an adult who will talk honestly and calmly about bodies, respect, consent, and what healthy relationships actually look like.",
   "say": [
    "“I'm not trying to embarrass you. I want you to have better information than the internet gives.”",
    "“What do you think porn gets wrong about real relationships?”",
    "“You don't have to tell me anything. I just want you to know you can ask me anything.”",
    "“If something ever feels hard to stop, or someone pressures you, you can come to me.”"
   ],
   "avoid": [
    "Shame, disgust, or treating them as dirty or broken.",
    "Asking them to confess what they've watched or how often.",
    "Relying only on filters and punishments. Filters help, and they don't replace talking.",
    "Skipping the talk because they're older, or because it's awkward for you."
   ],
   "help": [
    "Keep it short and calm, and come back to it more than once. Side by side, like in the car, is often easier.",
    "Name plainly that porn often shows aggression and pressure as normal, and that real intimacy rests on respect and a clear yes.",
    "Share your family's values warmly, and ask what they think. Teens listen more when they're asked than when they're lectured.",
    "Explain that sharing or keeping sexual images of anyone under 18 can bring serious legal trouble, even between teens.",
    "Watch for signs it's taking over: sleep or grades slipping, secrecy that keeps growing, pulling away from friends. A counselor can help."
   ],
   "you": "This talk may stir up your own discomfort, your own history, or worry that you've waited too long. It isn't too late. One calm, honest conversation does more than a perfect one you never have."
  },
  "faith": "For many families, faith shapes how they think about sex, bodies, and relationships, and those values are worth sharing warmly. Faith at its best is a place of mercy and growth, not shame. If guilt feels heavy, a youth leader, pastor, or faith mentor you trust can help you sort out what you believe and what you want. In Plain terms: your values are yours to grow into, and a mistake or a hard habit does not define you.",
  "practices": [
   "trunk|What I Stand For",
   "branches|Respect Check",
   "leaves|Phone Outside the Bedroom",
   "bark|Phone Check",
   "bark|Self-Compassion Break",
   "branches|Name Your Trusted Adult"
  ],
  "reach": [
   "If watching feels out of your control, or it's crowding out sleep, school, or friends: talk with a school counselor, your doctor, or a counselor you trust.",
   "If anyone sends you sexual images, asks you for them, or threatens you with a picture: report it to the CyberTipline (report.cybertip.org, or 1-800-843-5678). Take It Down (takeitdown.ncmec.org) can help remove pictures taken when you were under 18. You are not in trouble.",
   "If an adult is showing you porn or pressuring you sexually: Childhelp, call or text 1-800-422-4453, any time. In Minnesota, Day One, 1-866-223-1111.",
   "If someone you're dating is pressuring you to watch or do things you don't want to: Love Is Respect, 1-866-331-9474, or text LOVEIS to 22522.",
   "If you feel so low you don't want to be alive: call or text 988, any time. Danger right now: 911."
  ],
  "more": [
   [
    "Common Sense Media: Teens and Pornography",
    "https://www.commonsensemedia.org/press-releases/new-report-reveals-truths-about-how-teens-engage-with-pornography"
   ],
   [
    "Love Is Respect",
    "https://www.loveisrespect.org/"
   ],
   [
    "Take It Down",
    "https://takeitdown.ncmec.org"
   ],
   [
    "NCMEC CyberTipline",
    "https://report.cybertip.org"
   ]
  ]
 },
 {
  "id": "social-media",
  "ring": "pn-online",
  "title": "Social media, comparison, and phone balance",
  "keys": "social media phone addiction screen time too much time on my phone scrolling doomscrolling instagram tiktok snapchat streaks comparison everyone else's life looks better feel bad about my body likes followers fomo left out group chat drama can't put my phone down sleep phone at night screen time rules",
  "parts": [
   "bark",
   "leaves",
   "branches"
  ],
  "quick": [
   "Your phone is how you keep up with friends, and that's real. It can also pull at your sleep, your focus, and how you feel about yourself.",
   "Feeds are built to keep you scrolling. Struggling to stop is a design result, not a personal failure.",
   "Comparison hits hardest when you see everyone's highlights next to your ordinary day.",
   "Small changes work: notifications off, the phone out of your room at night, and a check of how you feel after an app."
  ],
  "feel": "Some days your phone is the best part of the day: inside jokes, a friend who gets you, a video that makes you laugh. Other days you look up and an hour is gone, and you feel worse than when you started. You might see a party you weren't invited to, a body you wish you had, or someone's perfect life, and feel smaller. You might want to put it down and still keep scrolling. Most teens feel some of this. It isn't a weakness. These apps are built by very smart people to hold attention.",
  "self": {
   "first": [
    "Turn off notifications for everything except the people who matter most.",
    "Charge your phone outside your bedroom tonight, or at least across the room.",
    "After you close an app, ask: do I feel better, the same, or worse? Notice the pattern for a week."
   ],
   "helps": [
    "Moving one app you lose time on off your home screen, or into a folder.",
    "Following accounts that make you laugh, learn, or feel good, and muting the ones that leave you feeling small.",
    "A set off time each night, an hour before you want to sleep.",
    "Doing one thing a day with your hands, your body, or a person in the same room: a walk, practice, cooking, a game.",
    "Remembering that a feed shows highlights. Everyone's ordinary days and hard days are mostly off camera."
   ],
   "tell": [
    "“I'm comparing my everyday to someone else's best moment.”",
    "“I can be connected without being on call.”",
    "“My worth isn't a number of likes.”"
   ],
   "people": "Try, with a friend: “Want to both put our phones away while we hang out?” Or, at home: “Can we make phone rules that apply to everyone, adults too?”"
  },
  "helper": {
   "feel": "For most teens, the phone is where friendships live, so taking it away can feel like being cut off from their people. Many say they spend too much time on it and wish they could cut back. Teens who already feel low or left out can feel worse after scrolling, and the hours can crowd out sleep.",
   "say": [
    "“What do you like most about it? What do you like least?”",
    "“Which apps leave you feeling better, and which leave you feeling worse?”",
    "“Let's make the rules together, and they'll apply to me too.”"
   ],
   "avoid": [
    "“You're addicted to that thing.”",
    "Taking the phone as a punishment when they come to you with a problem online.",
    "Rules for them that you don't follow yourself.",
    "Reading their messages in secret. It costs trust, and teens tell more when they feel safe to."
   ],
   "help": [
    "Make a family plan together: phone-free meals, phones charging outside bedrooms overnight, and an off time for everyone.",
    "Ask about their online life the way you'd ask about school: with interest, not suspicion.",
    "Watch for sleep loss, pulling away from people in person, or mood dropping after time online. Talk about it calmly.",
    "Notice and talk about body comparison. Keep your own comments about bodies on strength, energy, and health, never weight or looks."
   ],
   "you": "Most adults struggle with their phones too. Your own habits teach more than your rules do. Try the plan yourself first, and say out loud when it's hard for you."
  },
  "faith": "Many faith traditions practice a rhythm of rest, like a sabbath or a quiet hour, and a phone-free time can be one way to live it. If faith is part of your life, setting the phone down to pray, reflect, or simply be present can be a real way to rest. In Plain terms: a regular unplugged hour, outside or with people you love, is a gift to yourself.",
  "practices": [
   "bark|Phone Check",
   "leaves|Phone Outside the Bedroom",
   "leaves|Two Hours Outdoors",
   "branches|One Reach-Out a Day",
   "fruit|Three Good Things",
   "roots|Sabbath Hour"
  ],
  "reach": [
   "Feeling worse about your body after scrolling, or food and exercise starting to feel like rules you can't break: tell someone you trust. ANAD Eating Disorders Helpline, 1-888-375-7767, weekdays.",
   "Someone bullying, threatening, or embarrassing you online: save it, block, report it on the app, and tell a trusted adult. If it involves a picture of you: Take It Down (takeitdown.ncmec.org) and the CyberTipline, 1-800-843-5678. You are not in trouble.",
   "Low mood or worry that has lasted two weeks or more: tell a parent, a school counselor, or your doctor.",
   "Teen Line, teens answering teens: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863.",
   "If you feel so low you don't want to be alive: call or text 988, or text HOME to 741741 (in Minnesota, MN to 741741). Danger right now: 911."
  ],
  "more": [
   [
    "US Surgeon General: Social Media and Youth Mental Health",
    "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf"
   ],
   [
    "AAP Family Media Plan",
    "https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx"
   ],
   [
    "Common Sense Media",
    "https://www.commonsensemedia.org/"
   ]
  ]
 },
 {
  "id": "ai-companions",
  "ring": "pn-online",
  "title": "AI chatbots and companions",
  "keys": "ai chatbot companion ai friend ai girlfriend ai boyfriend character ai talking to ai instead of people chatgpt replika is it bad to talk to ai ai gave me advice lonely attached to a chatbot my teen talks to ai all the time ai said something weird ai and mental health",
  "parts": [
   "branches",
   "bark",
   "roots"
  ],
  "quick": [
   "Lots of teens use AI chatbots, for homework, for fun, and sometimes to talk about feelings. Using one doesn't mean something is wrong with you.",
   "A chatbot can sound caring, but it can't know you, notice you, or show up for you. It can also be wrong, and it tends to agree with you.",
   "For anything serious, like your safety, your health, or a big decision, bring in a real person.",
   "Use AI as a tool, and let people be your people."
  ],
  "feel": "Talking to a chatbot can feel easy. It's there at 2 a.m., it never gets tired of you, it never judges, and it always answers. If you're lonely, anxious, or just bored, that can feel like a relief. Some teens feel a little attached, or a little embarrassed about how much they talk to one. Some have had a chatbot say something that felt off, too personal, or wrong. All of that is common. Wanting someone to talk to is human, and it says something good about you.",
  "self": {
   "first": [
    "Notice what you're using it for: homework, fun, practice, or getting through a hard feeling. Each one is a different thing.",
    "Keep private details private: your full name, school, address, photos, and passwords.",
    "If you've been telling a chatbot something heavy, pick one real person to tell too."
   ],
   "helps": [
    "Using AI for what it's good at: brainstorming, practicing a hard conversation, explaining a concept a different way.",
    "Checking what it tells you, especially about health, money, the law, or anything risky. It can sound sure and still be wrong.",
    "Noticing when it agrees with everything. Real friends sometimes say “Are you sure?”, and that's part of what makes them useful.",
    "Setting a limit, like no chatbot after a certain hour, if it's cutting into sleep or time with people.",
    "Using a chatbot as practice, then saying the real thing to a real person."
   ],
   "tell": [
    "“A tool can help me. People are who I lean on.”",
    "“If it's serious, a real person needs to know.”",
    "“It's okay to want someone to talk to. I deserve someone who can show up.”"
   ],
   "people": "Try: “I've been working through something, and I think I need to talk to an actual person about it. Do you have a few minutes?”"
  },
  "helper": {
   "feel": "Many teens use AI chatbots, and about a third have talked with one about something serious instead of a person. For a teen who feels lonely, anxious, or misunderstood, a chatbot that always answers can feel safer than people. Many teens also say they don't fully trust what it tells them. They may feel defensive if they sense judgment.",
   "say": [
    "“What do you use it for? What do you like about it?”",
    "“Has it ever said something that felt off or wrong?”",
    "“If something's ever heavy, I'd really like to be one of the people you tell.”"
   ],
   "avoid": [
    "Mocking them for talking to a chatbot.",
    "Banning it without understanding what need it's meeting.",
    "Assuming it's only about school, or only about loneliness. Ask."
   ],
   "help": [
    "Get curious. Try the tool yourself, with them if they're willing.",
    "Talk about what AI can and can't do: it predicts words, it can be confidently wrong, and it tends to agree.",
    "Talk about privacy: what the app keeps, and what never to share.",
    "Notice if it's replacing people, sleep, or help. If so, help them build one real connection: a club, a team, a mentor, a counselor.",
    "Make sure they know real help lines: 988 and the Crisis Text Line are staffed by people, any time."
   ],
   "you": "It may feel strange, or even sad, that a teen would rather talk to a machine. Try not to take it personally. Often it means they want to be heard without risk. Your steady, unhurried attention is the thing a chatbot can't give."
  },
  "faith": "If faith is part of your life, you may notice that prayer, a faith mentor, or a community gives something no chatbot can: being known and held over time. Questions about meaning, right and wrong, and who you are deserve real conversations. In Plain terms: big questions are best carried with people who know you, like a mentor, a family member, or a good friend.",
  "practices": [
   "branches|One Reach-Out a Day",
   "branches|Name Your Trusted Adult",
   "branches|Friends",
   "branches|Clubs",
   "bark|Name It",
   "bark|Phone Check"
  ],
  "reach": [
   "Thoughts of not wanting to be alive, or of hurting yourself: talk to a person, now. Call or text 988, or chat at 988lifeline.org, any time. Or text HOME to 741741 (in Minnesota, text MN to 741741). These are real people.",
   "Danger right now: call 911.",
   "In Minnesota, call **CRISIS (274747) from a cell phone for a county crisis team, any time.",
   "Teen Line, teens answering teens: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863.",
   "If a chatbot, or someone pretending to be one, asks for pictures or sexual talk: stop, save it, and report it to the CyberTipline, 1-800-843-5678. You are not in trouble.",
   "Feeling lonely or low for two weeks or more: tell a parent, a school counselor, or your doctor. The NAMI HelpLine, 1-800-950-6264, can help families find support (weekdays; not a crisis line)."
  ],
  "more": [
   [
    "Common Sense Media: Teens and AI Companions",
    "https://www.commonsensemedia.org/press-releases/nearly-3-in-4-teens-have-used-ai-companions-new-national-survey-finds"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ],
   [
    "Teen Line",
    "https://didihirsch.org/teenline/hotline-support/"
   ]
  ]
 },
 {
  "id": "gambling",
  "ring": "pn-online",
  "title": "Gambling and sports betting",
  "keys": "gambling sports betting bet betting apps parlay odds fantasy sports poker online casino loot boxes skins crypto lost money chasing losses owe money debt borrowed money can't stop betting my teen is betting using my account friends bet on games",
  "parts": [
   "trunk",
   "bark",
   "branches"
  ],
  "quick": [
   "Betting ads are everywhere, and some teens bet on games, play online casino games, or buy loot boxes. Talking about it openly is the first step.",
   "Betting is built so the house wins over time. Most people who keep betting lose money.",
   "Watch for chasing losses, borrowing, secrecy about money, and moods that rise and fall with results.",
   "Help is ready in Minnesota for teens and families: call 1-800-333-4673, or text HOPE to 53342, any time."
  ],
  "feel": "It can start as a fun way to make a game more exciting, a parlay with friends, or a few dollars on a fantasy team. A win feels amazing, and it's easy to think you've figured something out. Then a loss stings, and the urge is to win it back. Some teens end up using a parent's or friend's account, borrowing, selling things, or hiding how much they've lost. If that's happening, you might feel anxious, ashamed, or stuck. It can move fast, and it happens to smart people. Getting help early makes it much easier to turn around.",
  "self": {
   "first": [
    "Take a real look: how much have you put in, and how much have you gotten back, over the last month? Write the numbers down.",
    "Delete betting apps and unfollow betting accounts, at least for a while. Ads and notifications are built to pull you back.",
    "Don't try to win back what you lost. Chasing losses is how small losses become big ones.",
    "If you owe money or you're hiding losses, tell one adult you trust."
   ],
   "helps": [
    "Knowing how betting works: the odds are set so the house earns money over time, no matter how much you know about the sport.",
    "Watching games for the game, with friends, without money on them.",
    "Having another way to get that rush: a sport, a competition, a hard workout, a new skill.",
    "Practicing what to say when friends want you in on a bet.",
    "Calling or texting the Minnesota helpline. It's for teens and families too, and you don't have to be in deep to call."
   ],
   "tell": [
    "“The apps make money because most people lose.”",
    "“I don't need to win it back. I need to stop the losing.”",
    "“Telling someone is the fastest way out.”"
   ],
   "people": "Try: “I've been betting more than I meant to, and I'm in a hole. I need help figuring out what to do.” Or, with friends: “I'm sitting this one out. I'll just watch.”"
  },
  "helper": {
   "feel": "Many high schoolers see betting as part of watching sports. Betting apps and sites are for adults, so teens who bet are often using someone else's account, an unlicensed site, or apps between friends, with no protections. A teen in trouble may feel ashamed, anxious, and sure you'll be furious. Gambling problems can come with depression and thoughts of suicide, so check in about how they're doing, not only the money.",
   "say": [
    "“A lot of people your age bet on games. What have you seen?”",
    "“Those apps make money because most people lose.”",
    "“If you're ever in over your head, tell me. We'll deal with it together.”"
   ],
   "avoid": [
    "Paying off a teen's gambling debt without a plan and outside help.",
    "Letting them use your betting accounts, or betting with them.",
    "Lecturing before you've asked and listened.",
    "Shaming. It drives the losses underground."
   ],
   "help": [
    "Talk about odds, ads, and chasing losses, ideally while watching a game together.",
    "If you bet, think about what your teen sees at home, and keep your accounts and cards secure.",
    "Watch for signs of trouble: missing money, borrowing, selling things, lying about where money went, or mood swings tied to results.",
    "If you see signs, call the Minnesota Problem Gambling Helpline together: 1-800-333-4673, or text HOPE to 53342.",
    "Ask directly about mood and safety. If they talk about not wanting to be alive, call or text 988 together."
   ],
   "you": "Finding out a teen has lost money gambling can bring up anger, fear, and even guilt about your own habits. Get support for yourself too: the Minnesota helpline is there for families. Your calm matters more than having every answer."
  },
  "faith": "If faith is part of your life, your tradition may have something to say about money, luck, and what we chase. Shame is never the goal; many people find their faith community a place to be honest and start again. In Plain terms: what you value, and where you want your time and money to go, can guide you more than the next bet.",
  "practices": [
   "branches|Easy Ways Out",
   "trunk|Life Skill of the Month",
   "trunk|What I Stand For",
   "bark|Phone Check",
   "bark|Slow Exhale",
   "branches|Ask for Help"
  ],
  "reach": [
   "Minnesota Problem Gambling Helpline: 1-800-333-4673 (HOPE), or text HOPE to 53342, any time. For teens, adults, and families.",
   "Outside Minnesota: the National Council on Problem Gambling lists help in every state (ncpgambling.org).",
   "Owing money to someone who is threatening you: tell a trusted adult right away. Danger right now: call 911.",
   "If gambling losses leave you feeling hopeless or not wanting to be alive: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741), any time.",
   "If drinking or drugs are part of it too: SAMHSA National Helpline, 1-800-662-4357, any time."
  ],
  "more": [
   [
    "Minnesota Alliance on Problem Gambling",
    "https://mnapg.org"
   ],
   [
    "National Council on Problem Gambling",
    "https://www.ncpgambling.org"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ]
 },
 {
  "id": "sexual-assault",
  "ring": "pn-online",
  "title": "Sexual assault and unwanted touching",
  "keys": "sexual assault rape unwanted touching touched me without asking groped forced pressured into sex didn't say yes i froze my fault was drinking party date someone i know family member coach assaulted abused molested harassed is it assault what do i do after my teen was assaulted rainn day one",
  "parts": [
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "Any sexual touching or act without your clear, willing yes is not okay. It is not your fault, no matter what you wore, drank, or said before.",
   "Freezing is one of the most common ways a body reacts to a threat. Not fighting back does not mean you agreed.",
   "You get to decide your next step. You can talk with someone confidentially before deciding anything else.",
   "Help is there any time: RAINN 1-800-656-4673; in Minnesota, Day One 1-866-223-1111; if an adult in your life is hurting you, Childhelp 1-800-422-4453 (call or text)."
  ],
  "feel": "Afterward, many people feel numb, confused, or like it didn't really happen. Some feel ashamed, dirty, angry, or scared to be near certain people or places. You might replay it, or not be able to remember parts. You might blame yourself for going there, for drinking, for not leaving, or for freezing. You might worry no one will believe you, especially if the person is popular, older, someone you dated, or someone in your family. Every one of those reactions is common. None of them means it was your fault.",
  "self": {
   "first": [
    "If you're in danger right now, get to a safe place and call 911.",
    "Reach out to someone trained for this: RAINN (call 1-800-656-4673, or text HOPE to 64673) or, in Minnesota, Day One (1-866-223-1111, or text 612-399-9995). They can talk you through your options, at your pace.",
    "If it happened in the last few days, an advocate can explain the choice of a medical exam and go with you. You can decide about reporting later.",
    "Tell one person you trust. If the first person doesn't respond well, tell another."
   ],
   "helps": [
    "Hearing, from someone you trust, “I believe you. It's not your fault.”",
    "Getting your body back to calm in small ways: slow breaths out, warm water, a blanket, feet on the floor, naming what you see around you.",
    "Keeping simple routines: meals, sleep, school, time with safe people.",
    "Talking with a counselor who knows trauma. Healing is real, and it's not a straight line.",
    "Choosing what to share, and with whom. Your story is yours."
   ],
   "tell": [
    "“What happened to me was not my fault.”",
    "“Freezing was my body trying to keep me safe.”",
    "“I get to heal at my own pace.”"
   ],
   "people": "Try: “Something happened that I didn't want, and I need help. Can you just listen first?” If the person hurting you is at home, tell an adult outside your home, like a school counselor, coach, or teacher, or call Childhelp."
  },
  "helper": {
   "feel": "A teen who tells you may be testing whether it's safe to say more. They may seem calm, flat, or even laugh, which is a common shock response. They may fear getting someone in trouble, being blamed, losing their phone or freedom, or not being believed. Often the person who hurt them is someone they know.",
   "say": [
    "“I believe you.”",
    "“It's not your fault.”",
    "“Thank you for telling me. You're not in trouble.”",
    "“You don't have to tell me everything. What would help right now?”"
   ],
   "avoid": [
    "Questions that sound like blame: “Why did you go there?” “Were you drinking?” “Why didn't you leave?”",
    "Pressing for details. Trained people can gather what's needed later.",
    "Confronting the person who did it yourself.",
    "Promising to keep it a secret, or taking all the choices out of their hands."
   ],
   "help": [
    "Stay calm, and make sure they're safe right now. If they're in danger or hurt, call 911.",
    "Call RAINN (1-800-656-4673) or, in Minnesota, Day One (1-866-223-1111) together. An advocate can explain options, including a medical exam if it was recent.",
    "If the person hurting them is a family member or a caregiver, or you're not sure they're safe at home: call Childhelp (1-800-422-4453) or your county child protection agency. If you work with youth, follow your organization's reporting steps.",
    "Let them make as many choices as they safely can: who knows, what happens next, when to talk.",
    "Stay close in the weeks after. Watch for sleep trouble, pulling away, or talk of not wanting to be alive, and call or text 988 together if it comes."
   ],
   "you": "Hearing this can bring up rage, grief, guilt, or memories of your own. Those are real. Find your own support, through RAINN, Day One, or a counselor, so you can stay steady for them. You don't need perfect words. Believing them is the most important thing you'll do."
  },
  "faith": "If faith is part of your life, it may feel like a comfort, or it may feel complicated. Some people hear messages that leave them feeling ashamed or blamed; what happened to you was done to you, and no faith tradition rightly places the blame on you. Many people find prayer, a trusted faith leader, or their community a real source of strength while they heal. In Plain terms: you deserve people and places that help you feel safe, whole, and worth caring about.",
  "practices": [
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Self-Compassion Break",
   "branches|Name Your Trusted Adult",
   "branches|Ask for Help",
   "leaves|Steady Wake Time"
  ],
  "reach": [
   "Danger right now: call 911.",
   "RAINN National Sexual Assault Hotline: call 1-800-656-4673, or text HOPE to 64673, any time.",
   "In Minnesota, Day One: 1-866-223-1111, or text 612-399-9995, any time.",
   "If an adult in your life (a family member, caregiver, coach, or anyone older) is hurting you: Childhelp, call or text 1-800-422-4453, any time. You can also tell a trusted adult outside your home, like a school counselor or teacher.",
   "If it was someone you're dating: Love Is Respect, call 1-866-331-9474, or text LOVEIS to 22522.",
   "If pictures were taken or shared: Take It Down (takeitdown.ncmec.org) and the CyberTipline (1-800-843-5678). You are not in trouble.",
   "If you feel so low you don't want to be alive: call or text 988, or text HOME to 741741 (in Minnesota, text MN to 741741), any time.",
   "In Pine, if you answer that someone is hurting you, Pine shows you outside help right away. That answer never goes to your family alert."
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
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ],
   [
    "Minnesota DCYF: Report Abuse",
    "https://dcyf.mn.gov/individuals-and-families/report-abuse"
   ]
  ]
 },
 {
  "id": "school-threats",
  "ring": "pn-online",
  "title": "School threats, lockdowns, and scary news",
  "keys": "school threat threats lockdown lockdown drill active shooter drill school shooting shooting news scared to go to school rumor on snapchat someone said they would shoot bomb threat evacuation hiding in the classroom scary news world news war news anxious about the news can't stop scrolling doomscrolling report a threat tell someone see it say it send it friend made a threat joke threat can't sleep after lockdown",
  "parts": [
   "bark",
   "branches",
   "roots"
  ],
  "quick": [
   "Feeling scared after a threat, a lockdown, or hard news makes sense. Your body is trying to keep you safe.",
   "If you see or hear about a threat, telling a trusted adult is one of the most powerful things anyone can do. Studies of school attacks that were stopped found that someone noticing and telling often made the difference.",
   "Hours of news and videos can raise stress a lot. Get the facts from one trusted source, then step away.",
   "Calm comes back in small steps: your breath, your routine, and the people you trust."
  ],
  "feel": "Maybe your school just had a lockdown, real or a drill, and you sat in the dark trying to stay quiet. Maybe a threat went around on someone's story, and no one knows if it's real. Maybe it's the news: another shooting somewhere, a war, a disaster, played on repeat. You might feel jumpy, numb, angry, or fine at first and shaky later. Some people can't sleep. Some don't want to go back to school. Some joke about it, because that's easier. If you were close to something real, the feelings can be stronger and last longer. All of it is a normal response to something that isn't normal.",
  "self": {
   "first": [
    "If you're in danger right now, follow your school's plan, and call 911 when it's safe to.",
    "If you see or hear a threat, in person or online, tell a trusted adult right away, or call 911. Screenshot it if you can, and don't pass it around. In Minnesota you can also send a tip, even without your name, through the See It, Say It, Send It app.",
    "After a scare, do one thing that tells your body you're safe now: a slow breath out, a snack and some water, a text to someone you love.",
    "Get the facts from your school or one trusted source. Then put the phone down for a while."
   ],
   "helps": [
    "Talking with someone who stays calm: a parent, a coach, a teacher, a counselor, a friend.",
    "Your normal routine: sleep, food, class, practice. Routine tells your body the world is steady again.",
    "Less news and fewer videos, especially before bed. Turning off news alerts for a few days is allowed.",
    "Doing something with your body or your hands: a walk, the gym, music, drawing, cooking.",
    "Knowing the plan. Ask what your school does in a lockdown, so it feels less like a surprise.",
    "Helping in a small way: checking on a younger sibling or a friend who seems shaken."
   ],
   "tell": [
    "“I'm safe right now, in this room.”",
    "“Telling isn't snitching. It's how people stay safe.”",
    "“I can care about the world and still turn off the news.”"
   ],
   "people": "Try: “That lockdown today got to me more than I expected. Can we talk?” Or to a friend: “Are you okay after today? I'm kind of shaky.”"
  },
  "helper": {
   "feel": "They may seem fine, joke about it, or say nothing, and then struggle with sleep, headaches, or not wanting to go to school. Teens often hear about threats before adults do, in group chats and stories, and may worry about being called a snitch or getting a friend in trouble. Some feel angry that they have to practice hiding at school. If they were close to a real event, the reactions can be bigger and last longer.",
   "say": [
    "“What have you been hearing at school or online?”",
    "“How did the lockdown feel for you?”",
    "“If you ever hear about a threat, you can tell me, and I'll help you figure out what to do. You won't be in trouble.”",
    "“What would help you feel steadier this week?”"
   ],
   "avoid": [
    "“That would never happen here.” Teens know it can, and a promise you can't keep breaks trust.",
    "Pressing for every detail, or asking them to relive what happened.",
    "Leaving the news on in the background all evening.",
    "Brushing off a threat they tell you about as “probably just a joke.”"
   ],
   "help": [
    "Steady yourself first. Teens read your face before your words.",
    "Share the plain facts you have, and say what adults are doing to keep them safe.",
    "If they tell you about a threat, thank them, take it seriously, and report it the same day: to the school, the police, or the See It, Say It, Send It app in Minnesota. Call 911 if there's danger right now.",
    "Keep routines steady, and watch their sleep.",
    "Set a news limit for the whole house, and keep phones out of bedrooms at night for a while.",
    "If fear, bad sleep, or not wanting to go to school lasts more than a few weeks, or they were close to a real event, talk with the school counselor or a doctor about a counselor who works with trauma."
   ],
   "you": "Threats and hard news shake grown-ups too. Talk with another adult about your own fear, so you can bring a steady presence to them. You don't need perfect words. Calm, honest, and close is enough."
  },
  "faith": "Many families turn to prayer, a faith community, or a vigil after frightening news, and that can be a real comfort. Others find steadiness in quiet, nature, music, or time with people they love. Whatever grounds you, lean on it now.",
  "practices": [
   "bark|Five Senses Pause",
   "bark|Slow Exhale",
   "bark|Name It",
   "bark|Phone Check",
   "branches|Name Your Trusted Adult",
   "roots|What Holds Me Up"
  ],
  "reach": [
   "Danger right now, or a threat that sounds real: call 911.",
   "If you see or hear about a threat: tell a trusted adult or a school staff member right away. In Minnesota, you can also send a tip, even without your name, through the BCA's See It, Say It, Send It app.",
   "Fear, bad sleep, or not wanting to go to school that lasts more than a few weeks: talk with your school counselor or a doctor.",
   "Feeling overwhelmed, or thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "In Minnesota, for a mental health crisis: call **CRISIS (274747) from a cell phone to reach your county crisis team.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863."
  ],
  "more": [
   [
    "The National Child Traumatic Stress Network: school shooting resources",
    "https://www.nctsn.org/what-is-child-trauma/trauma-types/terrorism-and-violence/school-shooting-resources"
   ],
   [
    "Minnesota BCA: See It, Say It, Send It app",
    "https://dps.mn.gov/divisions/bca/Pages/bca-tip-app.aspx"
   ],
   [
    "US Secret Service, Averting Targeted School Violence (research)",
    "https://www.secretservice.gov/sites/default/files/reports/2021-03/USSS%20Averting%20Targeted%20School%20Violence.2021.03.pdf"
   ],
   [
    "Holman, Garfin, and Silver, media exposure and acute stress (research)",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC3890785/"
   ]
  ]
 },
 {
  "id": "first-job",
  "ring": "pn-meaning",
  "title": "A first job, and balancing work with school",
  "keys": "first job part time job working while in school job and school too many hours boss manager schedule shifts can't keep up homework tired from work no time paycheck how many hours can i work closing shift late shift school night work permit quit my job got fired job interview harassment at work boss yells unsafe job hurt at work coworkers help my family pay bills",
  "parts": [
   "trunk",
   "leaves",
   "bark"
  ],
  "quick": [
   "A job can build skills, confidence, money, and friendships. That's real growth.",
   "Research on high schoolers found that working 20 hours a week or less had little effect on school, while more than 20 went with lower school engagement and more problems. Keep an eye on your number.",
   "Sleep is usually the first thing a job squeezes. Protect it: teens need 8 to 10 hours.",
   "You have rights at work, including limits on late hours on school nights and a safe workplace. If something feels wrong, tell a trusted adult."
  ],
  "feel": "Your first paycheck can feel amazing. So can being trusted with real work: learning the register, closing up, being the one a manager counts on. Then the schedule gets heavy. A closing shift the night before a test. Homework at midnight. A manager texting to ask you to cover. You might feel proud and exhausted in the same week. Some teens work because they want to; some work because their family needs the money, and that can carry extra weight. Some have a boss or coworker who yells, pressures, or makes them uncomfortable, and they aren't sure if that's normal. Mixed feelings about a job are common.",
  "self": {
   "first": [
    "Write your week: school, work, practice, homework, and sleep. Count your work hours.",
    "If you're over 20 hours, or sleep keeps getting cut, ask your manager for fewer or earlier shifts on school nights.",
    "Tell your manager about tests and big school events ahead of time.",
    "Keep your schedules and pay stubs, so you can check that your hours and pay match."
   ],
   "helps": [
    "Saying yes to shifts that fit your week, and a clear, polite no to ones that don't.",
    "Asking questions while you learn. Every good worker was new once.",
    "Asking for training before you use any equipment, and following the safety steps.",
    "Noticing what work is teaching you: showing up on time, talking with customers, solving problems. Those skills last.",
    "Keeping something just for you each week: friends, rest, a sport, faith, or fun."
   ],
   "tell": [
    "“My school and my sleep come first.”",
    "“I can say no to a shift and still be a good worker.”",
    "“I'm learning things here that will last.”"
   ],
   "people": "Try, with a manager: “I can work Tuesday and Saturday, but I need to be done by nine on school nights.” Or at home: “Work is getting to be a lot. Can we look at my week together?”"
  },
  "helper": {
   "feel": "They may be proud of their job and worn down by it at the same time. Many teens feel they can't say no to a manager, especially when a shift is offered at the last minute. If the family counts on their paycheck, they may hide how tired they are. Some face unsafe tasks, missing pay, or a boss or coworker who crosses a line, and don't know it's okay to speak up.",
   "say": [
    "“What do you like about your job? What's hard?”",
    "“How many hours did you work this week? How's your sleep?”",
    "“Want to practice what you'll say to your manager?”",
    "“If anything at work ever feels wrong or unsafe, you can tell me.”"
   ],
   "avoid": [
    "“You're lucky to have a job. Just deal with it.”",
    "Pushing for more hours than school and sleep can hold.",
    "Taking over every conversation with their boss. Step in for safety and fair pay; let them practice the rest.",
    "Treating a hard first job as a sign they're not cut out for work."
   ],
   "help": [
    "Look at their weekly schedule together, and help them keep it at 20 hours or less during the school year when you can.",
    "Know that Minnesota limits teen work hours: 16 and 17 year olds may not work after 11 p.m. on school nights or before 5 a.m. on school days (11:30 p.m. and 4:30 a.m. with a parent's written permission), and stricter rules apply under 16. The Minnesota Department of Labor and Industry lists the rules.",
    "Help them read a pay stub and keep their schedules.",
    "Ask what safety training they got. Young workers get hurt on the job more often than older workers, often because they're new.",
    "If they're hurt, harassed, unpaid, or asked to do something unsafe, help them report it, and contact the Minnesota Department of Labor and Industry.",
    "Celebrate what they're learning, not only what they're earning."
   ],
   "you": "A first job is a step toward their own life. Guide from beside them: help them speak up for themselves, and step in when safety or fairness is at stake."
  },
  "faith": "Many faith traditions and families honor good work and a day of rest. Whether through faith, family values, or your own sense of what matters, it's worth asking what kind of worker and person you want to be, and keeping one unhurried time each week.",
  "practices": [
   "trunk|First Job Balance",
   "leaves|Sleep",
   "trunk|Study Sprints",
   "trunk|Life Skill of the Month",
   "trunk|Ask Someone About Their Path",
   "bark|Bounce Back From a Setback"
  ],
  "reach": [
   "Hurt at work: tell your manager and get medical help. Danger right now: call 911.",
   "Unsafe tasks, missing pay, or hours that break the rules: tell a parent or trusted adult, and contact the Minnesota Department of Labor and Industry (dli.mn.gov).",
   "Someone at work touches you, pressures you, or makes sexual comments: that's not okay, and it's not your fault. Tell a trusted adult. RAINN: 1-800-656-4673, any time. In Minnesota, Day One: 1-866-223-1111.",
   "Stress or low mood that won't lift: talk with your school counselor. Feeling overwhelmed, or thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "Minnesota Department of Labor and Industry: age and hours limits for working teens",
    "https://www.dli.mn.gov/business/employment-practices/age-restrictions-working-teens"
   ],
   [
    "Minnesota Department of Labor and Industry: child labor FAQs",
    "https://www.dli.mn.gov/business/employment-practices/child-labor-faqs"
   ],
   [
    "NIOSH: keeping teens safe and healthy at work",
    "https://www.cdc.gov/niosh/bulletin/2019/working-teens.html"
   ],
   [
    "Monahan, Lee, and Steinberg, part-time work and teens (research)",
    "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8624.2010.01543.x"
   ]
  ]
 },
 {
  "id": "money",
  "ring": "pn-meaning",
  "title": "Money: paychecks, saving, and debt",
  "keys": "money paycheck pay stub taxes taken out why is my check so small saving budget bank account savings account debit card credit card credit score debt owe money borrowed money buy now pay later loans student loans can't afford spending too much broke money stress family money problems scam cash app venmo someone asked for money gift cards fake job check saving for a car",
  "parts": [
   "trunk",
   "bark",
   "fruit"
  ],
  "quick": [
   "Money is a skill, and skills are learned. Nobody is born knowing how.",
   "Your paycheck is smaller than your hours times your pay because taxes and other deductions come out first. Your pay stub shows where it goes.",
   "A simple plan works: save some, spend some, and give some if that fits your values. Saving first, even a little, builds the habit.",
   "Borrowed money costs extra. Be careful with credit cards, buy now pay later, and loans, and never send money, gift cards, or codes to someone you only know online."
  ],
  "feel": "Getting your own money can feel like freedom. You get to choose. Then the paycheck is smaller than you expected, the money disappears faster than you thought, or a friend always seems to have more. Some teens worry about their family's money: rent, bills, a parent out of work. Some feel pressure to pay for friends or to help at home. Some owe someone and feel stuck, or got caught by a scam and feel embarrassed. Money can bring up pride, stress, and hope all at once. You're not bad with money. You're learning.",
  "self": {
   "first": [
    "Look at your last pay stub. Find your gross pay (what you earned), what was taken out, and your net pay (what you keep).",
    "Pick one thing you're saving for, and write down how much it costs.",
    "Choose an amount to save from each paycheck before you spend anything, even a few dollars.",
    "If someone online asks you for money, gift cards, a code sent to your phone, or your bank login, stop. Tell a trusted adult before you do anything."
   ],
   "helps": [
    "A simple plan for each paycheck: save, spend, and give, in amounts that fit you.",
    "A savings account, opened with a parent or guardian. Compare fees at a bank or credit union before you choose.",
    "Waiting a day before buying anything big. If you still want it tomorrow, it's a better choice.",
    "Learning how credit works before you turn 18: interest, credit scores, and why paying only the minimum keeps you in debt longer.",
    "Talking about money with an adult you trust, even when it feels awkward."
   ],
   "tell": [
    "“Money is a skill I'm learning.”",
    "“My worth isn't my wallet.”",
    "“Small amounts add up.”"
   ],
   "people": "Try: “Can you show me how you plan your money each month?” Or with a friend: “I'm saving for something, so I'll skip this one. Want to do something that doesn't cost anything?”"
  },
  "helper": {
   "feel": "They may feel proud of earning and embarrassed about not knowing how money works. They may feel the pull of keeping up with friends, or worry quietly about your family's finances even if no one talks about it. If they've borrowed money, overspent, or been scammed, shame can keep them from telling you.",
   "say": [
    "“Want to look at your pay stub together? Mine confused me at first too.”",
    "“What are you saving for?”",
    "“Here's a money mistake I made at your age, and what I learned.”",
    "“If you ever owe someone or get caught in a scam, tell me. We'll figure it out together.”"
   ],
   "avoid": [
    "“You'll just waste it.”",
    "Shaming them for one bad purchase.",
    "Putting adult money worries on their shoulders, or asking them to cover family bills without an open conversation about it.",
    "Keeping all money talk secret. Teens learn money by watching and asking."
   ],
   "help": [
    "Share plain facts about how your household plans money, at whatever level feels right.",
    "Help them open a savings account and set aside an amount from each paycheck.",
    "Teach one money skill a month: reading a pay stub, making a budget, how interest works, spotting a scam.",
    "If they help with family costs, talk openly about what's fair, and leave room for school and savings.",
    "If they're scammed or in debt, stay calm, help them stop paying, save the messages, report it, and focus on next steps."
   ],
   "you": "You don't have to be a money expert. Honesty about your own learning, mistakes included, teaches more than a lecture."
  },
  "faith": "Many faith traditions and families teach generosity and gratitude, and some practice giving a set share of what comes in. Whatever your values are, they can help shape how you earn, save, spend, and give.",
  "practices": [
   "trunk|Life Skill of the Month",
   "fruit|Tiny Next Step",
   "trunk|Values Sort",
   "fruit|Be Generous",
   "trunk|Next Steps Page",
   "bark|Worry Window"
  ],
  "reach": [
   "Someone online asking for money, gift cards, codes, or your bank login: stop, don't pay, and tell a trusted adult. Report scams to the Federal Trade Commission at reportfraud.ftc.gov.",
   "Someone threatening to share a picture of you unless you pay: you are not in trouble. Tell a trusted adult, and contact the CyberTipline, 1-800-843-5678. Take It Down (takeitdown.ncmec.org) can help remove images. The guide Sextortion and Threats With a Picture has more.",
   "Betting or gambling to win money back: Minnesota problem gambling helpline, 1-800-333-4673, or text HOPE to 53342, any time.",
   "Money worry that keeps you up at night, or feels hopeless: talk with your school counselor or a trusted adult. If it turns into not wanting to be here, call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741).",
   "Danger right now: call 911."
  ],
  "more": [
   [
    "CFPB Money as You Grow: teenagers and young adults",
    "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/teen-young-adult/"
   ],
   [
    "Federal Trade Commission: report fraud",
    "https://reportfraud.ftc.gov"
   ],
   [
    "Minnesota Alliance on Problem Gambling",
    "https://mnapg.org"
   ]
  ]
 },
 {
  "id": "faith-doubt",
  "ring": "pn-meaning",
  "title": "Faith questions and doubt",
  "keys": "faith questions doubt doubts doubting god is god real not sure what i believe questions about religion my faith or my parents' faith different from my family church youth group feels fake prayer doesn't work prayer feels empty god feels far away science and faith why do bad things happen afraid to ask questions confused about faith spiritual but not religious losing my faith finding my faith friends believe different things",
  "parts": [
   "roots",
   "bark",
   "branches"
  ],
  "quick": [
   "Questions about God, faith, and meaning are a normal part of growing up. Many people with deep faith went through seasons of questions.",
   "You don't have to sort it all out now. Questions can stay open while you live your life.",
   "What matters most is how faith works in your life right now: is it a help, a weight, or both?",
   "Bring your questions to someone who listens without pushing. Grounded welcomes all faith traditions and everything in-between."
  ],
  "feel": "Maybe prayer used to feel close and now it feels quiet. Maybe something hard happened, and you're asking why. Maybe something you learned in class seems to clash with what you were taught, or you've noticed people at your place of worship who don't live what they say. Maybe your friends see things differently, and you're wondering what's true for you. Some teens feel guilty for having questions, or nervous to tell their family. Some feel curious, relieved, or closer to God or something bigger than before. Questions can feel lonely, but they're one of the most common parts of growing up, in every tradition.",
  "self": {
   "first": [
    "Write down one question you carry. You don't have to answer it today.",
    "Notice, without judging yourself, whether faith feels like a help to you right now, a weight, or both.",
    "Keep the practices that still feel real to you, and give yourself room with the ones that don't, for now.",
    "Tell one person you trust what you're wondering about."
   ],
   "helps": [
    "Someone who listens without rushing to answers: a parent, a youth leader, a chaplain, a faith mentor, a wise relative, a school counselor.",
    "Reading, asking, and learning. Most traditions have a long history of people who asked hard questions.",
    "Honest words, in whatever way fits you: prayer, journaling, talking it through on a walk. Many traditions include prayers of lament, where people say exactly what hurts.",
    "Quiet time in nature, music, or helping others, where many people feel connected to something bigger.",
    "Respect both ways: your questions matter, and so do the beliefs of the people you love."
   ],
   "tell": [
    "“My questions are welcome.”",
    "“I don't have to settle everything today.”",
    "“Questions and faith can live side by side.”"
   ],
   "people": "Try: “I've been thinking a lot about faith lately. I'm not trying to start an argument. Can I tell you what I'm wondering?” Or: “I don't need answers right now. Would you just listen?”"
  },
  "helper": {
   "feel": "They may be afraid of disappointing you, or of being judged by their faith community. They may try out ideas out loud that sound bigger than they feel. Some are hurting because of a loss or something unfair, and the questions are how the hurt comes out. Some are finding their faith growing in new ways and want to talk about it more than you expect. Their questions may stir worry in you, or old questions of your own.",
   "say": [
    "“What are you wondering about these days?”",
    "“I had questions at your age too. Here's one I carried.”",
    "“You can always bring your questions to me. I'd rather hear them than have you carry them alone.”",
    "“Is there someone you'd like to talk with about this, like a youth leader or a mentor?”"
   ],
   "avoid": [
    "“You just need more faith,” or “Just pray more.”",
    "Arguing, quizzing, or trying to win the conversation.",
    "Telling them God is angry with them for asking.",
    "Punishing or shaming them for questions, or sharing what they told you with others without their okay."
   ],
   "help": [
    "Listen first. Ask gently what's behind the question: a loss, a class, a friend, a hurt?",
    "Share your own experience and what has helped you, as one person's path, not a test they must pass.",
    "Help them find a mentor they choose, someone who welcomes questions.",
    "Keep family traditions open to them in a way that invites.",
    "Watch for signs the questions sit on top of something heavier, like grief, low mood, or hurt from someone in a faith community, and get support for that."
   ],
   "you": "You don't have to have every answer, and their questions don't mean you failed. Staying close and curious keeps the door open, and that matters more than any one conversation. In Pine, their check-in answers, faith answers included, stay private to them, and that privacy helps them be honest with themselves."
  },
  "faith": "This guide's topic is faith, so it sits at the center here, offered as one door among several. Many traditions have stories of people who wrestled with God, questioned, waited, and still belonged. For many, questions are part of a living faith, not the end of it. If faith hasn't been part of your life, the same questions of meaning, purpose, and what holds you up are yours too, and you can explore them in your own words. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "roots|Carry Your Questions",
   "roots|Talk With a Faith Mentor",
   "roots|Lament",
   "roots|Quiet Time",
   "roots|What Holds Me Up",
   "roots|Awe Walk"
  ],
  "reach": [
   "A trusted adult who welcomes questions: a parent, a youth leader, a chaplain, a faith mentor, or your school counselor.",
   "Questions that come with low mood, numbness, or losing interest in things for two weeks or more: talk with your school counselor or a doctor.",
   "If faith or a faith community leaves you feeling scared, ashamed, or pushed out, see the guide Hurt by a Faith Community.",
   "Thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: call 911.",
   "Want to talk with another teen? Teen Line: call 800-852-8336 (8 p.m. to midnight Central) or text TEEN to 839863."
  ],
  "more": [
   [
    "The National Study of Youth and Religion: Soul Searching (research)",
    "https://youthandreligion.nd.edu/announcements/book-announcements/paperback-publication-of-soul-searching/"
   ],
   [
    "Religious experiences and depressive symptoms in teens (research)",
    "https://www.sciencedirect.com/science/article/abs/pii/S0165032709001827"
   ],
   [
    "Exline and colleagues, religious and spiritual struggles (research)",
    "https://doi.org/10.1037/a0036465"
   ]
  ]
 },
 {
  "id": "faith-hurt",
  "ring": "pn-meaning",
  "title": "Hurt by a faith community",
  "keys": "hurt by church hurt by my faith community youth group hurt me youth pastor leader made me uncomfortable judged at church shamed at church embarrassed in front of everyone gossip kicked out left out at youth group people at church are fake hypocrites scared of god told i'm going to hell not good enough can't go back to church don't want to go to church spiritual abuse leader asked me to keep a secret pastor touched me mosque temple synagogue church hurt religious hurt",
  "parts": [
   "roots",
   "bark",
   "branches"
  ],
  "quick": [
   "A faith community can be a place of real belonging, and people in it can still hurt you. Your hurt is real, and it's not your fault.",
   "If a leader or anyone there touches you, threatens you, or asks you to keep a secret, that is never okay. Tell a trusted adult outside that group, or call or text Childhelp at 1-800-422-4453.",
   "What people did and what you hold sacred can be two different things. You can sort them out in your own time.",
   "Healing can mean going back once things are made right, finding a new community, or taking a break. Support is here whichever way you go."
  ],
  "feel": "Maybe someone at your place of worship shamed you in front of others, or said your questions meant something was wrong with you. Maybe you were told something hard in your life was a punishment. Maybe a group you belonged to turned cold after a family change, a mistake, or a rumor. Maybe a leader you trusted crossed a line. You might feel angry, embarrassed, scared, or numb. Some teens feel afraid of God after being hurt by people who spoke in God's name. Some still love their faith and miss their community. Some want nothing to do with it right now. Mixed feelings make sense when a place meant to be safe hurt you.",
  "self": {
   "first": [
    "If anyone is hurting you, touching you, threatening you, or asking you to keep a secret: tell a trusted adult outside that group, like a parent, a school counselor, a coach, or a teacher. You can also call or text Childhelp, 1-800-422-4453, any time. Danger right now: call 911.",
    "Name what happened, even just to yourself. Write one plain sentence about what hurt.",
    "Remember that the person who hurt you doesn't get the last word on who you are.",
    "Give yourself permission to take some space while you sort out how you feel."
   ],
   "helps": [
    "Talking it through with someone outside the situation who believes you and listens.",
    "Separating what people did from what you value. You can look at each one in your own time.",
    "Honest words for what hurts: writing, talking out loud, or, if it fits you, a prayer of lament. Many traditions have these for exactly this.",
    "A trusted adult from your tradition who is outside the group that hurt you, if you want a faith voice.",
    "Other places that ground you: family, friends, nature, music, helping others.",
    "If you live with family who attend, a calm talk about what happened and what you need."
   ],
   "tell": [
    "“What happened to me was not my fault.”",
    "“My hurt is real, and so is my worth.”",
    "“I can take my time.”"
   ],
   "people": "Try, with a parent: “Something happened at youth group that's been bothering me. Can I tell you about it?” Or: “I need a break from going for a while. Can we talk about it?”"
  },
  "helper": {
   "feel": "They may feel caught between their own hurt and your love for the community. They may worry you'll take the other person's side, especially if it's a leader you respect. Some hide it because they're ashamed, or because they were told to keep quiet. Some go quiet about faith altogether. If someone hurt them physically or sexually, they may tell only a small piece at first, to see how you react.",
   "say": [
    "“Thank you for telling me. I believe you.”",
    "“It's not your fault.”",
    "“What do you need from me right now?”",
    "“You don't have to decide anything about your faith today.”"
   ],
   "avoid": [
    "Defending the person or the group before you've listened.",
    "“They didn't mean it,” or “Just forgive and move on.”",
    "Making them keep going to the same group, or face the person, while they're still hurting.",
    "Telling them the hurt means they're losing their faith, or that God is disappointed in them."
   ],
   "help": [
    "Listen first, all the way through. Hold off on defending, explaining, or correcting.",
    "If someone touched them, threatened them, or asked them to keep a secret, act: keep them away from that person, report it to your county or Tribal child protection agency in Minnesota, and call 911 if there's danger. Childhelp, 1-800-422-4453 (call or text), can talk you through it.",
    "Talk with them before you talk with the group's leaders, and tell them what you'll do and why.",
    "Give them room. A break, a new community, or going back once things are made right can each be okay. Let their pace lead.",
    "If they want a faith voice, help them find one outside the situation: a chaplain, a different leader, a wise relative.",
    "If fear, shame, or low mood hang on, find a counselor who respects your family's faith."
   ],
   "you": "This may hurt you too, especially if it's your community. Find someone of your own to talk with. Most of all, your teen needs to know you're on their side."
  },
  "faith": "This guide's topic is faith, so it sits at the center here, offered as one door among several. Many traditions name the harm people can do in sacred places, and call for truth, justice, and repair. Many teens find that what people did and what they hold sacred are two different things, and they come back to faith in their own time, sometimes in a new community. Others find meaning and peace in family, nature, music, or service. Both paths are welcome. Grounded welcomes all faith traditions and everything in-between.",
  "practices": [
   "roots|Lament",
   "bark|Name It",
   "bark|Self-Compassion Break",
   "roots|What Holds Me Up",
   "roots|Talk With a Faith Mentor",
   "branches|Name Your Trusted Adult"
  ],
  "reach": [
   "Someone touching you, threatening you, or making you feel unsafe: tell a trusted adult outside that group. Childhelp: 1-800-422-4453, call or text, any time. Danger right now: call 911.",
   "In Minnesota, abuse of a minor can be reported to the county or Tribal child protection agency where the child lives.",
   "Sexual abuse or assault: RAINN, 1-800-656-4673, any time. In Minnesota, Day One: 1-866-223-1111, or text 612-399-9995.",
   "Fear, shame, or low mood that lasts two weeks or more: talk with your school counselor or a doctor.",
   "Thoughts of not wanting to be here: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741)."
  ],
  "more": [
   [
    "Childhelp National Child Abuse Hotline",
    "https://childhelphotline.org/"
   ],
   [
    "Minnesota DCYF: report abuse",
    "https://dcyf.mn.gov/individuals-and-families/report-abuse"
   ],
   [
    "Religious experiences and depressive symptoms in teens (research)",
    "https://www.sciencedirect.com/science/article/abs/pii/S0165032709001827"
   ],
   [
    "Exline and colleagues, religious and spiritual struggles (research)",
    "https://doi.org/10.1037/a0036465"
   ]
  ]
 },
 {
  "id": "purpose-service",
  "ring": "pn-meaning",
  "title": "Finding purpose, and serving others",
  "keys": "purpose what is my purpose meaning what should i do with my life no direction don't know what i care about don't know what i want to be bored lost passion calling make a difference volunteer volunteering community service service hours helping others mission trip service trip mentor tutoring coaching younger kids giving back feel useless want to matter",
  "parts": [
   "trunk",
   "fruit",
   "branches"
  ],
  "quick": [
   "Purpose grows over time. Most people don't have it figured out in high school, and that's normal.",
   "Purpose often has three parts: something you care about, something you're working toward, and a way it reaches beyond you.",
   "Helping others is one of the surest ways to find it. In one study, high schoolers who volunteered weekly with younger kids even had better heart-health markers afterward.",
   "Start small. One thing you care about and one small step is enough."
  ],
  "feel": "Adults keep asking what you want to do with your life, and you might not know. Maybe your friends seem to have a passion and you're still looking. Maybe you have service hours to finish and they feel like a box to check. Or maybe you care about something a lot, like animals, younger kids, fairness, your neighborhood, or the outdoors, and you're not sure how to act on it. Some days it can feel like nothing you do matters. Those feelings are common, and they're a starting point, not a final answer.",
  "self": {
   "first": [
    "Answer three questions in a few lines each: What do I care about? What am I working toward? Who could it help?",
    "Notice what makes you lose track of time, and what makes you upset about the world. Both point to what you care about.",
    "Try one act of service this week, small enough to actually do."
   ],
   "helps": [
    "Doing, not just thinking. Purpose usually shows up while you're trying things.",
    "A regular role where people count on you: coaching younger kids, tutoring, a food shelf, a job, helping a sibling or grandparent.",
    "Going with a friend. Serving side by side makes it easier to start and more fun to keep going.",
    "Asking adults you admire how they found their path. Most of them took detours.",
    "Writing what you learn in Next Steps, so your ideas can grow over time."
   ],
   "tell": [
    "“I don't have to have it all figured out.”",
    "“Small things I do matter.”",
    "“I'm allowed to try things and change my mind.”"
   ],
   "people": "Try: “I want to help with something, but I don't know where to start. Can I come with you sometime?” Or: “How did you figure out what you wanted to do?”"
  },
  "helper": {
   "feel": "They may feel pressure to have a big plan, and embarrassed that they don't. Being asked “What do you want to be?” again and again can make it worse. Some feel their daily life doesn't matter. Others care deeply about something and need a way to act on it. Teens want real roles and real respect, not busywork.",
   "say": [
    "“What's something you care about, even a little?”",
    "“When do you feel most like yourself?”",
    "“I noticed how you helped with that. You're good at it.”",
    "“Want to try something together?”"
   ],
   "avoid": [
    "“What are you going to do with your life?” asked again and again.",
    "Picking their cause for them.",
    "Treating service hours as only a requirement to finish.",
    "Comparing them with a sibling or friend who seems to have it figured out."
   ],
   "help": [
    "Notice their strengths out loud, and be specific.",
    "Offer real roles with real responsibility: at home, at work, in your community, or in a faith community.",
    "Serve alongside them. Your example says more than a lecture.",
    "Connect them with adults who do things they're curious about.",
    "Celebrate effort and growth, not only big results."
   ],
   "you": "Purpose grows a little at a time, often in ways no one can plan. Your part is to notice, invite, and believe in who they're becoming."
  },
  "faith": "For many people, faith is a source of purpose and a call to serve: helping neighbors, welcoming strangers, caring for the earth. Many teens find real roles in a faith community, like teaching younger kids, serving meals, or joining a service project. If faith isn't part of your life, the same questions point to your values and the people you want to help.",
  "practices": [
   "trunk|Purpose Reflection",
   "trunk|Volunteer",
   "trunk|Name Your Gifts",
   "trunk|Mentor Someone",
   "trunk|Next Steps Page",
   "fruit|Be Generous"
  ],
  "reach": [
   "Feeling like nothing you do matters for two weeks or more, or losing interest in things you used to enjoy: talk with your school counselor or a doctor.",
   "If it turns into feeling there's no point in living: call, text, or chat 988, any time, or text HOME to 741741 (in Minnesota, text MN to 741741). Danger right now: call 911.",
   "Ways to serve: ask your school counselor, a coach, a youth leader, or your library. Minnesota 4-H, VolunteerMatch, and DoSomething list projects for teens."
  ],
  "more": [
   [
    "Minnesota 4-H: youth leadership",
    "https://extension.umn.edu/4-h-member-resources/youth-leadership-4-h"
   ],
   [
    "VolunteerMatch",
    "https://www.volunteermatch.org"
   ],
   [
    "DoSomething.org",
    "https://www.dosomething.org"
   ],
   [
    "Damon, Menon, and Bronk, the development of purpose during adolescence (research)",
    "https://www.semanticscholar.org/paper/The-Development-of-Purpose-During-Adolescence-Damon-Menon/691e52b9ae789d27c4ae40fdcd9476d971037737"
   ]
  ]
 }
];
window.PINE_GUIDES = { rings: LC_RINGS, links: L, topics: LC_TOPICS };
})();
