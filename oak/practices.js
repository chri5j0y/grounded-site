/* =====================================================================
   OAK PRACTICES . the growth plan library (moved out of oak/index.html in GWG BLD 756)
   Same shapes as Sequoia's practices.js (and Birch's and Pine's), so Oak's code reads
   these exactly as it read its inline library. Every name, line, and guide is the same
   as before the move, so every saved plan and every check-off keeps working.
     DOMAIN_DEFS  six parts: key, name, color, group, prompt, restore
                  [[name, line]], strength_msg, growth_steps
     GUIDES       "part|Name": {why, today, build, hard, vary?, story?} (restore practices)
     G            the same, for the NEW practices (Oak runs Object.assign(GUIDES, G))
     META         part: {Name: [discipline, time, evidence, source url or '']}
     NEW          part: [[name, line]], appended to restore by Oak's code
     EV, DISC     evidence and discipline codes
     SRC          source urls used in META
     SHELF        part: [[title, url or '', line]] (Resource shelf)
   New in BLD 756:
     FLAGS        "part|Name": {life: [Health and Ability ids, plus gentle], adapt: 'one plain line'}
                  (shared/gg-life.js ids). Oak shows "Fits You" and the adapt line on
                  practices that fit the person's choice; nothing is ever hidden.
   Edit words in the tables below. No dashes; Title Case for practice names.
   ===================================================================== */
(function () {
  if (window.OAK_PRACTICES) return;

  const DOMAIN_DEFS = [
    {
      key: 'roots', name: 'What grounds you', color: 'var(--p-roots)', group: 'root',
      prompt: "What or who is set apart, or set above, anything else in your life? Where do you put your faith? What faith practices, if any, do you keep? What is your sacred text, whether scripture, poetry, or philosophy?",
      restore: [
        ['Prayer', 'Talk to the sacred as you would the most loving, understanding presence you can imagine. Speak it or write it.'],
        ['Ritual', 'Create a sacred experience with water, breath, fire, or scent. You do not need to be a professional, only intentional.'],
        ['Teach', 'Pass on what you have learned, one on one or in a group. Mentorship deepens your own connection to what is sacred.'],
        ['Tithe', 'Give a portion of what you have toward something larger than yourself.'],
        ['Worship', 'Build personal worship, not only corporate. At home, at the beach, in a hotel room. Invite the sacred into ordinary life.'],
        ['Scripture', 'Study your sacred text deeply enough to teach it. Studying to learn and to share is where the power lives.']
      ],
      strength_msg: "When your roots are strong, you have a real anchor outside yourself, something steady to return to when life is not. That anchor is worth tending deliberately, not just relying on by default.",
      growth_steps: [
        "Name one specific question about your faith or sense of the sacred and sit with it for a week rather than rushing to answer it.",
        "Try a single new practice this month, prayer, ritual, or study, even if it feels unfamiliar.",
        "Find one person you trust to talk with honestly about where you stand spiritually right now."
      ]
    },
    {
      key: 'bark', name: 'Mind and feelings', color: 'var(--p-bark)', group: 'root',
      prompt: "When you are stressed, how do you calm down? What are your tools for anxiety and hard emotions? Have you tried counseling, meditation, or mindfulness? Name your resources honestly, even the imperfect ones you currently rely on.",
      restore: [
        ['Music', 'Use sound deliberately to shift your nervous system state, energizing or calming as needed.'],
        ['Meditation', 'Begin with short, nonjudgmental awareness of the breath. You can calm your heart rate within 30 seconds once you have the tool.'],
        ['Playing', 'Do something with no purpose but joy. Play like a child, not just with one.'],
        ['Mindfulness', 'Bring full attention to one ordinary task today. Notice without narrating.'],
        ['Reading', 'Let a book occupy your mind fully enough to rest it from its usual loops.'],
        ['Thinking', 'Give yourself unstructured time to think without a screen or a task pulling your attention.']
      ],
      strength_msg: "Strong bark means you already have real tools to self-regulate. That is a genuine skill, not luck, and it is worth naming clearly so you keep reaching for it on purpose.",
      growth_steps: [
        "Pick one calming practice and use it daily for two weeks, even on days you do not feel stressed, so it becomes automatic before you need it.",
        "If you have never tried counseling or are not currently in it, consider one consultation simply to have an outside perspective.",
        "Notice and write down what actually triggers your stress this week. Naming the pattern is the first step to interrupting it."
      ]
    },
    {
      key: 'trunk', name: 'Purpose', color: 'var(--p-trunk)', group: 'root',
      prompt: "What gives your life purpose and direction? Where do you find significance, the sense that your existence matters and is going somewhere? This is different from hope, which looks for light in dark moments. Purpose is the larger story you are living inside of.",
      restore: [
        ['Journal Often', 'Write regularly, not to produce something polished, but to discover what you actually believe and feel as you go.'],
        ['Create Stuff', 'Make something with your hands or your imagination. Creation is one of the most direct ways humans generate meaning.'],
        ['Plan the Future', 'Give yourself something real to move toward. Meaning often lives in anticipation as much as memory.'],
        ['Get Counseling', 'Work with a therapist or counselor to examine the stories you are telling yourself about your life.'],
        ['Keep Learning', 'Stay a student of something. Curiosity is a renewable source of purpose.'],
        ['Write Your Story', 'Put your own life into words, the hard parts and the redemptive parts.']
      ],
      strength_msg: "A strong sense of purpose gives every hard day somewhere to belong inside a bigger story. This is a deep resource, and it tends to be the one that carries people through seasons nothing else can fix.",
      growth_steps: [
        "Write one page answering simply: what do I want my life to have been about? Just write, and edit later.",
        "Identify one project, however small, that you could begin this month that connects to something larger than your daily routine.",
        "Talk to someone older than you, or further along a path you respect, about how they found their sense of purpose."
      ]
    },
    {
      key: 'fruit', name: 'Hope', color: 'var(--p-fruit)', group: 'branch',
      prompt: "How do you define hope? Where do you find it outside of your faith, your mind, your body, your sense of meaning, or your community? Most people's hope lives in only a few places, often out of their grasp. Name what is actually yours.",
      restore: [
        ['Volunteer', 'Serve where you can witness change. Hope grows from experience, not theory.'],
        ['Pay It Forward', 'A small unearned kindness, given without expectation of return.'],
        ['Be Generous', 'Give something, time, money, attention, before you feel ready to.'],
        ['Provide Care', 'Tend to someone or something. Caregiving is a hope practice.'],
        ['Inspire Hope', 'Find a way to be the reason someone else feels hope today.'],
        ['Make Peace', 'Repair one strained relationship. Reconciliation is a hope-building act.'],
        ['Capture the Moment', 'When you notice a hopeful moment, document it. Build a journal of hope you can return to.']
      ],
      strength_msg: "Strong hope means you can find light even in genuinely hard seasons. That capacity is contagious, people around you likely draw on it more than you realize.",
      growth_steps: [
        "This week, actively look for one moment that gives you hope and write down exactly what it was and why it landed.",
        "Volunteer or serve somewhere, even briefly, where you can witness change happening.",
        "Start a simple hope journal, even three lines a week, that you can return to when things feel dark."
      ]
    },
    {
      key: 'leaves', name: 'Body', color: 'var(--p-leaves)', group: 'branch',
      prompt: "How does your body feel? Strong and energetic, or depleted? Do you see a doctor regularly? Do you exercise, and how often? How much time do you spend active versus sedentary? Be honest, not aspirational.",
      restore: [
        ['Breathe', 'Practice slow, intentional breathing daily. It is the fastest lever you have on your nervous system.'],
        ['Food', 'Eat real, whole foods that nourish rather than numb.'],
        ['Sleep', 'Protect 8 hours. Make your bedroom for sleep only: no screens, no late eating, a real nightly routine.'],
        ['Medicine', 'Use medical care, prescriptions, and supplements as real tools, not last resorts or sources of shame.'],
        ['Movement', 'Move your body daily, even imperfectly. Walking counts.'],
        ['Chakras', 'If energy work resonates with you, explore practices that address the body as an energetic system.']
      ],
      strength_msg: "Strong leaves mean you are already treating your physical self with real respect. That foundation makes everything else in this check-in easier to sustain.",
      growth_steps: [
        "Schedule one overdue check-in or appointment this month, even if it feels inconvenient.",
        "Add one 20 minute walk on three days this week and notice how it affects your other domains.",
        "Pick one sleep habit to change this week: a consistent bedtime, screens out of the bedroom, or no late eating."
      ]
    },
    {
      key: 'branches', name: 'Relationships', color: 'var(--p-branches)', group: 'branch',
      prompt: "Who shows up for you? Who do you show up for? Name the actual people and groups who form your support system. Remember the one rule: if someone already appears on another domain, like a spouse who is also your source of hope, they belong here under Branches, not duplicated elsewhere.",
      restore: [
        ['Family', 'Invest deliberately in the family relationships that are healthy and life-giving, even if imperfect.'],
        ['Friends', 'Make and keep friendships that do not depend on convenience. Reach out first sometimes.'],
        ['Neighbors', 'Know the people who live near you. Proximity is an underused form of community.'],
        ['Clubs', 'Join something organized around a shared interest. Structure makes belonging easier to access.'],
        ['Colleagues', 'Build real, human relationships at work, not only transactional ones.'],
        ['Faith', 'If you have a faith community, treat it as a support system. It is conditional and can end abruptly, unlike your personal connection to the Holy, so build both.']
      ],
      strength_msg: "Strong branches mean you are not carrying life alone, and that other people can count on you too. This is one of the most protective resources a person can have.",
      growth_steps: [
        "Reach out first to one person you have been meaning to reconnect with this week.",
        "Join one group, club, or recurring gathering organized around a shared interest, even if it feels small.",
        "Identify one relationship that currently takes more than it gives, and consider what a healthier balance would look like."
      ]
    }
  ];

  // =====================================================================
  // PRACTICE GUIDES: how to actually do each practice
  // =====================================================================
  const GUIDES = {
   "roots|Prayer": {
    "why": "Prayer is honest conversation with the sacred. Simple words are enough. Saying the true thing out loud loosens its grip on you.",
    "today": "Find two quiet minutes. Say, or write, three sentences: what you're thankful for, what you're carrying, and what you need. That's a whole prayer.",
    "build": "Pick one anchor in your day, like your first coffee or the drive home, and pray there daily for two weeks. Keep a short list of what you pray for, and notice what changes.",
    "hard": "If you don't know who you're talking to anymore, say so. \"I don't know if you're there, but here's what's true\" is a real prayer. Silence counts too.",
    "story": "Prayer."
   },
   "roots|Ritual": {
    "why": "Ritual gives the sacred a shape your body can feel. Lighting a candle or washing your hands with intention tells your whole self: this moment matters.",
    "today": "Light a candle, or pour a glass of water. Before you begin, name one thing you're setting down and one thing you're inviting in. Sit with it for one minute.",
    "build": "Create one weekly ritual, like Sunday evening or the first morning of the month. Use the same object each time so it gathers meaning. Keep it simple enough to never skip.",
    "hard": "If ritual feels fake or too churchy, borrow from ordinary life: a slow walk to the mailbox, a deliberate cup of tea. Intention is what makes it sacred, not the props."
   },
   "roots|Teach": {
    "why": "Teaching deepens what you believe. You understand something differently once you've tried to pass it on, and the person you teach becomes part of your roots.",
    "today": "Think of one thing that has held you up in a hard season. Write down how you'd explain it to someone younger or newer to the path.",
    "build": "Offer to mentor one person, lead one small group, or share one reflection a month with someone who's asking. Show up regularly rather than perfectly.",
    "hard": "Caring is enough to start. Most people want a fellow traveler who's a few steps ahead, not someone with every answer."
   },
   "roots|Tithe": {
    "why": "Giving away part of what you have loosens money's grip and connects you to something larger than your own needs. It's trust you can practice with your hands.",
    "today": "Choose one cause, church, or person that reflects what you hold sacred. Give something small today, even five dollars, and notice how it feels.",
    "build": "Set a regular amount or percentage that fits your real budget, and automate it so it happens without a fresh decision each time. Review it once a year.",
    "hard": "If money is tight, give time, skills, or attention instead. Generosity is about the posture of your heart, not the size of the gift."
   },
   "roots|Worship": {
    "why": "Worship turns your attention from your worries to what is bigger and more beautiful than them. It can happen anywhere, not only in a building.",
    "today": "Put on one song that stirs something sacred in you, and give it your full attention. Or step outside and take in the sky for two minutes without your phone.",
    "build": "Make a small space for personal worship at home: a chair, a playlist, a view. Go there a few times a week. Let it be yours, whatever shape it takes.",
    "hard": "If corporate worship has hurt you, you're allowed to start private and small. Worship is attention and gratitude, and nobody can take that from you.",
    "story": "Love."
   },
   "roots|Scripture": {
    "why": "Sacred texts hold words people have leaned on for centuries. Reading slowly, the same passage more than once, lets them find you where you are.",
    "today": "Choose one short passage, like Psalm 23, a favorite poem, or a line from your tradition. Read it three times slowly. Underline the word that catches you.",
    "build": "Read a little every day from one book or collection, rather than jumping around. Keep a notebook for the lines that stay with you. Share one with someone each week.",
    "hard": "If your old text feels loaded or painful, start with the Psalms, a poet, or a teacher you trust. Read for comfort before you read for answers."
   },
   "trunk|Journal Often": {
    "why": "Writing helps you find out what you actually think and feel. Meaning often shows up on the page before it shows up in your head.",
    "today": "Set a timer for five minutes and finish this sentence as many ways as you can: \"What matters to me right now is...\" Don't edit. Just keep the pen moving.",
    "build": "Write three times a week, same time, same notebook. Every Sunday, reread the week and circle anything that surprises you.",
    "hard": "If a blank page freezes you, use prompts: What drained me today? What gave me life? What am I avoiding? Bullet points count. Voice notes count.",
    "story": "Grief Debt"
   },
   "trunk|Create Stuff": {
    "why": "Making something with your hands or imagination is one of the most direct ways humans make meaning. It says: I was here, and this came from me.",
    "today": "Make one small thing in twenty minutes: a sketch, a meal from scratch, a short poem, a repaired chair. Finish it, even if it's rough.",
    "build": "Choose one creative outlet and give it a regular slot each week. Keep your materials visible so starting takes no effort. Share something now and then.",
    "hard": "Perfectionism kills creativity. Aim for finished, not good. The meaning is in the making, not in how it turns out."
   },
   "trunk|Plan the Future": {
    "why": "Having something real to move toward gives today a direction. Meaning lives in anticipation as much as in memory.",
    "today": "Write down one thing you'd like to happen in the next three months. Then write the smallest first step toward it, and do that step this week.",
    "build": "Keep a short list of near goals and far hopes. Look at it at the start of each month, and let it change as you change.",
    "hard": "If the future feels too uncertain to plan, make it small: a visit, a meal, a walk next Saturday. Even a short horizon gives your days shape.",
    "story": "Birth Plan"
   },
   "trunk|Get Counseling": {
    "why": "A counselor helps you look at the stories you tell yourself about your life, and gently rewrite the ones that are hurting you. It's strength, not weakness.",
    "today": "Look up one counselor, chaplain, or pastoral counselor near you or online, and read their page. That's the whole task for today.",
    "build": "Schedule one consultation. Give it three sessions before you decide if the fit is right. It's normal to try more than one person before you find yours.",
    "hard": "If cost is a barrier, ask about sliding scale fees, community clinics, or an employee assistance program. If you're in crisis, call or text 988 any time.",
    "story": "My Boundaries Have Gates"
   },
   "trunk|Keep Learning": {
    "why": "Curiosity keeps a life growing. Learning something new reminds you that your story isn't finished yet.",
    "today": "Pick one question you've always wondered about. Spend fifteen minutes finding out, through a book, a video, or asking someone who knows.",
    "build": "Choose one subject for a season. Take a class, read a series, or learn a skill alongside a friend. Keep a list of what you've learned.",
    "hard": "If you're tired, learn in small bites, like a podcast on a walk or one chapter a week. Learning should feed you, not drain you.",
    "story": "The Impossible Dance of Particles"
   },
   "trunk|Write Your Story": {
    "why": "Putting your life into words, the hard parts and the redemptive parts, helps you see the thread that runs through it. You're more than your worst chapter.",
    "today": "Write one memory from your life in a single paragraph. Start with where you were and what you could see.",
    "build": "Write one story a week. Group them into chapters of your life. Consider sharing them with family, since your story is also their inheritance.",
    "hard": "If painful memories come up, go slowly and write only what you can. Some chapters are best written with a counselor or trusted friend nearby."
   },
   "bark|Music": {
    "why": "Music reaches the nervous system faster than words. The right song can calm you down, lift you up, or let you finally cry.",
    "today": "Make two short playlists: one for calm, one for energy. Play the one you need for the next ten minutes, and really listen.",
    "build": "Use music on purpose at your hardest times of day, like the commute home or before bed. Notice which songs actually shift your state, and keep them close.",
    "hard": "If music brings up grief, that's not a failure. Sometimes the song opens a door that needed opening. Give yourself permission to feel it, then choose something gentler.",
    "story": "Drift Away"
   },
   "bark|Meditation": {
    "why": "Slow breathing tells your body the danger has passed. It's the fastest calming tool you carry, and it goes everywhere you go.",
    "today": "Sit where you are. Breathe in through your nose for a count of four, out through your mouth for a count of six. Do this ten times. When your mind wanders, notice it and come back to the count.",
    "build": "Attach it to something you already do, like right after your morning coffee. Two minutes the first week, five the second. Use a simple timer so your phone doesn't pull you somewhere else.",
    "hard": "If sitting still makes you more anxious, walk slowly and match your breath to your steps. A wandering mind isn't failure. Coming back is the practice.",
    "story": "Grounded in Coffee"
   },
   "bark|Playing": {
    "why": "Play has no purpose but joy, and that's exactly why it heals. It moves your mind out of its worry loops and reminds you that you're more than your problems.",
    "today": "Do one thing just for fun for fifteen minutes: a card game, a puzzle, throwing a ball for the dog, dancing in the kitchen.",
    "build": "Put play on your calendar like anything else that matters. Find a friend or grandkid who plays well and follow their lead.",
    "hard": "If play feels silly or undeserved, start with something low stakes and private. Laughter is medicine, not a reward you have to earn.",
    "story": "The Recovery"
   },
   "bark|Mindfulness": {
    "why": "Mindfulness is simply paying full attention to what's in front of you. It pulls you out of tomorrow's fears and yesterday's replays and back into now.",
    "today": "Try 5-4-3-2-1: name five things you can see, four you can feel, three you can hear, two you can smell, and one you can taste.",
    "build": "Pick one daily task, like washing dishes, brushing your teeth, or walking to the car, and do it with full attention every time. Notice without narrating.",
    "hard": "Your mind will drift constantly. That's normal. Each time you notice and come back, you're strengthening the muscle.",
    "story": "Grounded in Coffee"
   },
   "bark|Reading": {
    "why": "A good book can hold your mind fully enough to give it rest from its usual loops. It's a vacation your thoughts can take anywhere.",
    "today": "Read ten pages of something you enjoy, on paper if you can, in a comfortable spot with your phone in another room.",
    "build": "Keep a book by your bed and one in your bag. Read a little every day, and replace some evening scrolling with pages.",
    "hard": "If focus is hard right now, try short stories, poetry, audiobooks, or rereading an old favorite. Comfort reading counts."
   },
   "bark|Thinking": {
    "why": "Unhurried thinking time, without a screen or task pulling at you, lets your mind sort itself out. Many problems loosen when you give them room.",
    "today": "Take a fifteen minute walk or sit on the porch with no phone, no podcast, no task. Let your thoughts go wherever they want.",
    "build": "Schedule one unplugged block a week. Keep a small notebook handy for the ideas that show up.",
    "hard": "If silence fills with worry, give your mind a gentle question to hold, like \"What do I need this week?\", and come back to it when you drift."
   },
   "branches|Family": {
    "why": "Healthy family relationships are some of the strongest branches a person can have. Investing in them on purpose keeps them from wearing thin.",
    "today": "Send one family member a message that has nothing to do with logistics. Tell them something you appreciate about them.",
    "build": "Set one simple recurring connection, like a weekly call, a monthly meal, or a shared text thread. Protect it like an appointment.",
    "hard": "Not every family relationship is safe or healthy. Invest where there's life, and it's okay to hold boundaries where there isn't.",
    "story": "Please Help My Dad Die"
   },
   "branches|Friends": {
    "why": "Friendships that don't depend on convenience are the ones that hold when life gets hard. They need tending, especially as we get older.",
    "today": "Text one friend you haven't talked to in a while. Keep it simple: \"Thinking of you. How are you really doing?\"",
    "build": "Reach out first sometimes. Put a standing coffee or walk on the calendar with one friend. Show up for their hard days too.",
    "hard": "If you feel like you have no friends right now, start with one acquaintance and one shared activity. Friendships grow from repeated small moments.",
    "story": "My Boundaries Have Gates"
   },
   "branches|Neighbors": {
    "why": "The people who live near you are an underused form of community. Proximity makes it easy to help and be helped.",
    "today": "Learn one neighbor's name, or wave and say hello to someone you usually just nod at.",
    "build": "Offer a small help, like bringing in a trash can or sharing garden extras. Invite one neighbor over for coffee in the next month.",
    "hard": "If you're shy, start with kindness that doesn't require conversation, like shoveling a walk or leaving a note. Connection can build slowly."
   },
   "branches|Clubs": {
    "why": "Groups built around a shared interest make belonging easier, because the activity carries the conversation until friendships form.",
    "today": "Search for one group near you that matches something you enjoy: a choir, book club, walking group, woodshop, or support group.",
    "build": "Commit to attending three times before you decide. Arrive a few minutes early and stay a few minutes late. That's where connection happens.",
    "hard": "Walking into a new room alone is hard. Bring a friend the first time, or email the organizer ahead so someone expects you."
   },
   "branches|Colleagues": {
    "why": "You spend much of your life at work. Real, human relationships there make hard days lighter and good days better.",
    "today": "Ask one coworker a question that isn't about work, and listen to the answer.",
    "build": "Eat lunch with someone once a week. Notice and name good work when you see it. Check on the colleague who seems to be struggling.",
    "hard": "If your workplace is tense or lonely, find one safe person. One real connection can change how a whole job feels."
   },
   "branches|Faith": {
    "why": "A faith community can be a real support system: people who pray for you, bring meals, and sit with you. It's different from your personal connection to the holy, and both matter.",
    "today": "If you have a faith community, reach out to one person there this week. If you don't, write down what you'd want from one.",
    "build": "Join something small inside the larger group, like a study group, prayer circle, or service team. Belonging happens in small circles.",
    "hard": "If church has wounded you, you don't have to go back to the same place. Look for communities known for welcome, or gather a few people who share your values.",
    "story": "The Atypical Atheist"
   },
   "leaves|Breathe": {
    "why": "Your breath is the fastest lever you have on your nervous system. Slow breathing lowers your heart rate and tells your body it's safe.",
    "today": "Try box breathing: in for four, hold for four, out for four, hold for four. Repeat four times.",
    "build": "Pair slow breathing with daily moments, like stoplights, before meals, or before you walk into a hard conversation. Small doses add up.",
    "hard": "If holding your breath feels uncomfortable, skip the holds. Just make the exhale longer than the inhale.",
    "story": "Grounded in Coffee"
   },
   "leaves|Food": {
    "why": "Food can nourish or numb. Eating real food with some attention gives your body steady fuel and your mind a steadier mood.",
    "today": "Eat one meal sitting down, without a screen, and notice the taste and texture. Add one fruit or vegetable to one meal.",
    "build": "Plan a few simple meals for the week so you're not deciding when you're exhausted. Keep easy, nourishing snacks within reach.",
    "hard": "This isn't about dieting or rules. If your relationship with food feels painful or out of control, talking with your doctor or a counselor is a strong first step."
   },
   "leaves|Sleep": {
    "why": "Sleep is when your body and mind repair themselves. Almost everything else in this check-in gets harder without it.",
    "today": "Pick a bedtime tonight and start winding down thirty minutes before: lights low, screens away, something calm to read.",
    "build": "Keep the same wake time every day, even weekends. Make your bedroom for sleep only: dark, cool, and quiet. Save late snacks and news for earlier.",
    "hard": "If worry keeps you awake, keep a notepad by the bed to write it down and set it aside. If sleep problems last weeks, talk with your doctor."
   },
   "leaves|Medicine": {
    "why": "Medical care, prescriptions, and supplements are real tools, not last resorts or signs of weakness. Using them well is part of caring for your body.",
    "today": "Write down any check-in, refill, or symptom you've been putting off. Make one call or send one message about it.",
    "build": "Keep a simple list of your medications and questions for your next appointment. Set reminders so doses don't slip.",
    "hard": "If shame or fear keeps you from the doctor, bring a trusted person with you. Your body deserves care, not judgment."
   },
   "leaves|Movement": {
    "why": "Moving your body clears your head, lifts your mood, and helps you sleep. Walking counts. Gentle counts. Imperfect counts.",
    "today": "Take a ten minute walk, inside or out. Notice your feet, your breath, and what you see.",
    "build": "Aim for movement most days. Choose something you actually enjoy, like walking, stretching, dancing, gardening, or swimming, and add a few minutes each week.",
    "hard": "If your body has limits right now, move what you can: chair exercises, stretching in bed, slow steps. Check with your doctor before starting something new.",
    "story": "Grief Debt"
   },
   "leaves|Chakras": {
    "why": "Some people find it helpful to think of the body as an energy system. Practices built on this idea often bring together breath, attention, and gentle movement.",
    "today": "If this resonates with you, try a short guided body scan: move your attention slowly from your feet to the top of your head, noticing where you feel tight or open.",
    "build": "Explore a gentle yoga, tai chi, or energy-based class with a teacher you trust. Pay attention to what actually helps you feel more at home in your body.",
    "hard": "If this doesn't fit your beliefs, skip it. Any practice that helps you notice and care for your body serves the same purpose."
   },
   "fruit|Volunteer": {
    "why": "Hope grows from seeing change happen with your own eyes. Serving somewhere lets you witness it, and be part of it.",
    "today": "Look up one place near you that needs help: a food shelf, a school, a hospice, an animal shelter. Read about what they need.",
    "build": "Commit to a regular shift, even monthly. Consistency lets you see change over time and build friendships with the people you serve alongside.",
    "hard": "If your energy is low, start small and short. One afternoon is enough to begin. Serving should feed your hope, not empty it."
   },
   "fruit|Pay It Forward": {
    "why": "A small, unearned kindness breaks the idea that the world only takes. Giving one reminds you there's still good moving around out there.",
    "today": "Do one anonymous kindness: pay for the coffee behind you, leave a generous tip, or write an encouraging note.",
    "build": "Make it a weekly habit. Keep a small list of ideas so you're ready when the moment comes.",
    "hard": "It doesn't need to cost money. Holding a door, letting someone merge, or listening fully all count."
   },
   "fruit|Be Generous": {
    "why": "Generosity is hope in action. Giving before you feel ready trains your heart to trust there will be enough.",
    "today": "Give one thing away: time, money, an item you don't need, or your full attention for a conversation.",
    "build": "Decide what generosity looks like for you this season, and plan for it so it happens even on tired days.",
    "hard": "If you're depleted, generosity toward yourself counts too. Rest is sometimes the most generous thing you can give the people around you."
   },
   "fruit|Provide Care": {
    "why": "Tending someone or something, like a person, a pet, or a garden, is a quiet hope practice. Care assumes there's a tomorrow worth preparing for.",
    "today": "Care for one living thing on purpose today: water a plant, walk the dog slowly, check on someone who's alone.",
    "build": "Take on one small, regular act of care, like a weekly call to an elder or a garden bed of your own.",
    "hard": "If you're already a caregiver and running on empty, this practice is a reminder to receive care too. Ask for one specific kind of help this week.",
    "story": "If She Is Still Here"
   },
   "fruit|Inspire Hope": {
    "why": "Being the reason someone else feels hope has a way of refilling your own. Hope multiplies when it's shared.",
    "today": "Tell one person something specific you believe about their future, or share a story of something that turned out better than expected.",
    "build": "Look for one chance each week to encourage someone who's struggling. Share good news as readily as bad.",
    "hard": "You can offer hope even on a heavy day. Sometimes speaking it out loud is how it comes back to you.",
    "story": "He Was Praying Too"
   },
   "fruit|Make Peace": {
    "why": "An unresolved conflict quietly drains hope. Repairing even one relationship can make the future feel open again.",
    "today": "Think of one strained relationship. Write down what you'd want to say if you knew it would be received well. You don't have to send it.",
    "build": "When you're ready, reach out with a small step: an apology, a question, an invitation. Let it take time. Peace is often built in stages.",
    "hard": "Some relationships aren't safe to repair. Making peace can also mean letting go inside yourself, with or without the other person.",
    "story": "He Came to Collect"
   },
   "fruit|Capture the Moment": {
    "why": "Hopeful moments are easy to forget when life gets dark. Writing them down builds a record you can return to when you need it most.",
    "today": "Write down one moment from today that gave you even a small lift, and why it landed.",
    "build": "Keep a hope journal, or a note on your phone. Add three lines a week. Reread it on hard days.",
    "hard": "If nothing felt hopeful today, write something that was simply okay. Small counts. Ordinary counts.",
    "story": "Total Bliss"
   }
  };
  /* Oak growth plan library, 2026.
     META: [name] -> [discipline, time, evidence, source url or ''] for every practice.
     NEW: new practices per part: [name, one-line description].
     G: Learn more guides for new practices: why, today, build, hard, vary (optional). */
  const EV = { W: 'Well studied', S: 'Some evidence', E: 'Early research', T: 'Rooted in tradition' };
  const DISC = { C: 'Contemplative and prayer', B: 'Body and breath', R: 'Relationships', W: 'Writing and creativity', S: 'Service and generosity', L: 'Study and learning', N: 'Nature', Z: 'Rest and sabbath' };
  const SRC = {
    awe: 'https://ggia.berkeley.edu/practice/awe_walk',
    cp: 'https://www.contemplativeoutreach.org/centering-prayer-method/',
    lectio: 'https://www.contemplativeoutreach.org/lectio-divina-contemplation/',
    examen: 'https://www.jesuits.org/spirituality/the-ignatian-examen/',
    sc: 'https://self-compassion.org/',
    lk: 'https://pubmed.ncbi.nlm.nih.gov/26579061/',
    tgt: 'https://greatergood.berkeley.edu/article/item/four_great_gratitude_strategies',
    gl: 'https://ggia.berkeley.edu/practice/gratitude_letter',
    bps: 'https://www.tandfonline.com/doi/abs/10.1080/17439760.2020.1716052',
    ex: 'https://bmj.com/content/384/bmj-2023-075847',
    nat: 'https://www.nature.com/articles/s41598-019-44097-3',
    sleep: 'https://aasm.org/cdc-publishes-new-estimates-of-u-s-adult-sleep-duration/',
    val: 'https://www.va.gov/WHOLEHEALTHLIBRARY/docs/Values.pdf',
    act: 'https://psychwire.com/free-resources/clinical-tools/resource-1gm0b9r/act-made-simple-extra-bits',
    ew: 'https://www.researchgate.net/publication/349908406_Effects_of_expressive_writing_on_depressive_symptoms-A_meta-analysis',
    meaning: 'http://www.michaelfsteger.com/?page_id=13',
    conn: 'https://committoconnect.org/the-surgeon-generals-advisory/',
    proqol: 'https://proqol.org/'
  };
  const META = {
    roots: {
      'Prayer': ['C', '5 min', 'T', ''], 'Centering Prayer': ['C', '20+ min', 'T', SRC.cp], 'Examen': ['C', '10 min', 'T', SRC.examen],
      'Scripture': ['L', '15 min', 'T', SRC.lectio], 'Awe Walk': ['N', '15 min', 'E', SRC.awe], 'Breath Prayer': ['C', '2 min', 'T', ''],
      'Lament': ['W', '10 min', 'T', ''], 'Ritual': ['C', '10 min', 'T', ''], 'Worship': ['C', 'Varies', 'T', ''],
      'Sabbath Hour': ['Z', '60 min', 'T', ''], 'Sit Spot': ['N', '10 min', 'T', ''], 'Mealtime Blessing': ['C', '2 min', 'T', ''],
      'Spiritual Direction': ['R', '60 min', 'T', ''], 'Teach': ['S', 'Varies', 'T', ''], 'Tithe': ['S', 'Varies', 'T', '']
    },
    trunk: {
      'Journal Often': ['W', '10 min', 'S', ''], 'Create Stuff': ['W', '20+ min', 'E', ''], 'Plan the Future': ['W', '15 min', 'S', SRC.bps],
      'Get Counseling': ['R', '60 min', 'W', ''], 'Keep Learning': ['L', '20+ min', 'E', ''], 'Write Your Story': ['W', '20+ min', 'E', ''],
      'Values Sort': ['W', '15 min', 'S', SRC.val], 'Legacy Letter': ['W', '20+ min', 'E', ''], 'Purpose Statement': ['W', '15 min', 'E', SRC.meaning],
      'Mentor Someone': ['S', 'Varies', 'E', ''], 'Job Crafting': ['L', '10 min', 'E', ''], 'Moral Repair Letter': ['W', '20+ min', 'E', ''],
      'Stand-For Card': ['W', '10 min', 'E', SRC.act], 'Meaning Walk': ['N', '20+ min', 'E', ''], 'Expressive Writing': ['W', '20+ min', 'S', SRC.ew]
    },
    bark: {
      'Music': ['B', '10 min', 'S', ''], 'Meditation': ['B', '10 min', 'W', ''], 'Playing': ['Z', '20+ min', 'E', ''],
      'Mindfulness': ['B', '5 min', 'W', ''], 'Reading': ['L', '20+ min', 'E', ''], 'Thinking': ['W', '10 min', 'E', ''],
      'Self-Compassion Break': ['C', '5 min', 'S', SRC.sc], 'Soothing Touch': ['B', '2 min', 'E', SRC.sc], 'Slow Exhale': ['B', '2 min', 'S', ''],
      'Body Scan': ['B', '10 min', 'S', ''], 'Leaves on a Stream': ['C', '5 min', 'S', SRC.act], 'Worry Window': ['W', '15 min', 'E', ''],
      'Kind Voice Letter': ['W', '10 min', 'S', SRC.sc], 'Name It': ['B', '2 min', 'E', ''], 'Micro-Rest': ['Z', '2 min', 'E', SRC.proqol]
    },
    branches: {
      'Family': ['R', 'Varies', 'W', SRC.conn], 'Friends': ['R', 'Varies', 'W', SRC.conn], 'Neighbors': ['R', 'Varies', 'S', ''],
      'Clubs': ['R', 'Varies', 'S', ''], 'Colleagues': ['R', 'Varies', 'S', ''], 'Faith': ['R', 'Varies', 'S', ''],
      'Loving-Kindness': ['C', '10 min', 'S', SRC.lk], 'Gratitude Letter': ['W', '20+ min', 'E', SRC.gl], 'One Reach-Out a Day': ['R', '2 min', 'E', ''],
      'Shared Meal': ['R', '60 min', 'E', ''], 'Ask for Help': ['R', '5 min', 'E', ''], 'Active Listening': ['R', '10 min', 'E', ''],
      'Forgiveness Reflection': ['W', '15 min', 'S', ''], 'Repair a Rupture': ['R', 'Varies', 'E', ''], 'Support Group': ['R', '60 min', 'S', '']
    },
    leaves: {
      'Breathe': ['B', '2 min', 'S', ''], 'Food': ['B', 'Varies', 'S', ''], 'Sleep': ['Z', 'Nightly', 'W', SRC.sleep],
      'Medicine': ['B', 'Varies', 'W', ''], 'Movement': ['B', '20+ min', 'W', SRC.ex], 'Chakras': ['C', '10 min', 'T', ''],
      'Walk or Jog': ['B', '20+ min', 'W', SRC.ex], 'Yoga': ['B', '20+ min', 'W', SRC.ex], 'Strength Training': ['B', '20+ min', 'W', SRC.ex],
      'Two Hours Outdoors': ['N', 'Weekly', 'S', SRC.nat], 'Stretch Break': ['B', '5 min', 'E', ''], 'Tai Chi': ['B', '20+ min', 'S', ''],
      'Unplugged Evening': ['Z', 'Evening', 'E', ''], 'Sober Week': ['B', '1 week', 'E', ''], 'Morning Daylight': ['N', '10 min', 'E', '']
    },
    fruit: {
      'Volunteer': ['S', 'Varies', 'S', ''], 'Pay It Forward': ['S', '5 min', 'E', ''], 'Be Generous': ['S', 'Varies', 'S', ''],
      'Provide Care': ['S', 'Varies', 'E', ''], 'Inspire Hope': ['R', 'Varies', 'E', ''], 'Make Peace': ['R', 'Varies', 'E', ''],
      'Capture the Moment': ['W', '5 min', 'E', ''], 'Three Good Things': ['W', '5 min', 'S', SRC.tgt], 'Best Possible Self': ['W', '20+ min', 'S', SRC.bps],
      'Hope Map': ['W', '15 min', 'E', ''], 'Savoring Walk': ['N', '10 min', 'E', ''], 'Joy List': ['W', '5 min', 'E', ''],
      'Tiny Next Step': ['W', '5 min', 'E', ''], 'Growth Reflection': ['W', '15 min', 'E', ''], 'Something to Look Forward To': ['Z', '5 min', 'E', '']
    }
  };
  const NEW = {
    roots: [
      ['Centering Prayer', 'Sit in silence with one sacred word, returning to it whenever your mind wanders.'],
      ['Examen', 'At day\'s end, look back for where you felt most alive and most drained.'],
      ['Awe Walk', 'A slow walk looking for something vast, beautiful, or surprising.'],
      ['Breath Prayer', 'A short phrase prayed on the in-breath and the out-breath.'],
      ['Lament', 'Tell the sacred honestly what hurts, even your anger. That is prayer too.'],
      ['Sabbath Hour', 'One hour a week with nothing to produce and nothing to fix.'],
      ['Sit Spot', 'Return to the same outdoor spot and simply notice what changes.'],
      ['Mealtime Blessing', 'Pause before eating to give thanks for the food and the hands behind it.'],
      ['Spiritual Direction', 'Meet with a spiritual director or chaplain to listen for the sacred in your life.']
    ],
    trunk: [
      ['Values Sort', 'Choose the handful of values that matter most to you right now.'],
      ['Legacy Letter', 'Write the people you love about what you hope they carry forward.'],
      ['Purpose Statement', 'Draft one or two sentences about what you\'re living for.'],
      ['Mentor Someone', 'Pass on something you know to someone coming up behind you.'],
      ['Job Crafting', 'Reshape one part of your work or daily role toward what matters to you.'],
      ['Moral Repair Letter', 'Write about something that still weighs on your conscience, ideally with a counselor or chaplain.'],
      ['Stand-For Card', 'Write what you stand for on a small card and keep it with you.'],
      ['Meaning Walk', 'Walk with one question: what am I living for right now?'],
      ['Expressive Writing', 'Write your deepest thoughts about a hard experience, 15 minutes a day for a few days.']
    ],
    bark: [
      ['Self-Compassion Break', 'Name the pain, remember others feel this too, and offer yourself kindness.'],
      ['Soothing Touch', 'A hand on your heart or cheek, the way you\'d comfort a friend.'],
      ['Slow Exhale', 'Breathe out longer than you breathe in, a few times, to settle your body.'],
      ['Body Scan', 'Move your attention slowly from head to toe, noticing without fixing.'],
      ['Leaves on a Stream', 'Picture each thought on a leaf floating by, and let it go.'],
      ['Worry Window', 'Give worries a set 15 minutes a day, and postpone them outside it.'],
      ['Kind Voice Letter', 'Write to yourself about a struggle, the way a wise friend would.'],
      ['Name It', 'Put a feeling into one word. Naming it helps it settle.'],
      ['Micro-Rest', 'Two quiet minutes between tasks or visits, before carrying the next thing.']
    ],
    branches: [
      ['Loving-Kindness', 'Silently wish well to yourself, someone you love, and gradually wider.'],
      ['Gratitude Letter', 'Write a letter to someone you never properly thanked, and consider reading it to them.'],
      ['One Reach-Out a Day', 'A short text, call, or note to someone each day.'],
      ['Shared Meal', 'Eat with someone once a week, with phones away.'],
      ['Ask for Help', 'Ask one person for one specific kind of help.'],
      ['Active Listening', 'Listen to understand, not to fix, and reflect back what you heard.'],
      ['Forgiveness Reflection', 'Loosen resentment\'s grip on you, without excusing harm or reopening a door.'],
      ['Repair a Rupture', 'Take one honest step toward mending a strained relationship, if it\'s safe.'],
      ['Support Group', 'Join a group of people walking through something similar.']
    ],
    leaves: [
      ['Walk or Jog', 'Twenty minutes or more, at a pace that feels good.'],
      ['Yoga', 'Gentle movement and breath, from a class, a video, or your living room floor.'],
      ['Strength Training', 'Simple strength work, like squats or bands, a few times a week.'],
      ['Two Hours Outdoors', 'About two hours a week outside, in one visit or many short ones.'],
      ['Stretch Break', 'Five minutes of gentle stretching, anywhere.'],
      ['Tai Chi', 'Slow, flowing movements that calm the body and steady balance.'],
      ['Unplugged Evening', 'Put screens away an hour before bed.'],
      ['Sober Week', 'Try one sober week, and notice how you feel.'],
      ['Morning Daylight', 'Ten minutes of morning daylight to steady your body\'s clock.']
    ],
    fruit: [
      ['Three Good Things', 'Each night, write three things that went well and why.'],
      ['Best Possible Self', 'Write about your life going as well as it realistically could.'],
      ['Hope Map', 'Map a goal, a few paths to it, the obstacles, and what gives you energy.'],
      ['Savoring Walk', 'A walk where you slow down and soak in every good thing you notice.'],
      ['Joy List', 'A running list of small things that bring you joy.'],
      ['Tiny Next Step', 'Name the smallest possible step toward something you hope for, and take it.'],
      ['Growth Reflection', 'Ask gently what strength a hard season has shown you, if you\'re ready.'],
      ['Something to Look Forward To', 'Plan one small good thing to look forward to this week.']
    ]
  };
  const G = {
    'roots|Centering Prayer': { why: 'Sitting in silence with a single word trains your attention to rest in the sacred instead of chasing every thought. People have practiced it for centuries.', today: 'Choose a short sacred word, like peace, love, or a name for God. Sit comfortably for five minutes, eyes closed. When thoughts come, gently return to the word.', build: 'Work up to 20 minutes, once or twice a day. Same time and place helps it become a home you return to.', hard: 'A wandering mind is not failure. Each gentle return is the practice itself.', vary: 'If God language doesn\'t fit, use a word like stillness, breath, or here.' },
    'roots|Examen': { why: 'Looking back over your day with gratitude helps you notice where life and love showed up, and where you drifted from them.', today: 'Tonight, take ten minutes. Recall one moment you felt most alive and one you felt most drained. Give thanks for the first, and ask what the second is teaching you.', build: 'Make it a nightly habit, perhaps in bed. Over weeks, patterns will show you what to do more of and less of.', hard: 'If a day felt empty, start with one small thing you\'re thankful for, like warm water or a kind word.', vary: 'This comes from Ignatian spirituality, and it works as a simple reflection without prayer language too.' },
    'roots|Awe Walk': { why: 'Awe, the feeling of being in the presence of something vast, quiets worry and helps you feel part of something larger. In one study, weekly awe walks lifted joy and lowered daily distress.', today: 'Take a 15-minute walk somewhere with sky, trees, or water. Walk slowly and look for one thing that makes you say wow.', build: 'Walk once a week, in new places or familiar ones seen with fresh eyes. Notice small wonders too: frost, birdsong, light.', hard: 'If you can\'t get outside, look up at the sky from a window, or watch a nature film with full attention.' },
    'roots|Breath Prayer': { why: 'Short prayers matched to the breath carry the sacred into ordinary moments, and slow breathing calms the body at the same time.', today: 'Choose a phrase with two halves, like "Be still / and know," or "Here I am / held by love." Say the first half breathing in, the second breathing out. Repeat for two minutes.', build: 'Use it at red lights, before hard conversations, or at a bedside.', hard: 'If words feel empty today, simply breathe and let the breath be the prayer.', vary: 'Any two-part phrase works, like "I am / here" or "Let go / let be."' },
    'roots|Lament': { why: 'Sacred traditions are full of honest complaint. Bringing hurt and anger to the sacred, instead of hiding them, can keep a relationship with the holy alive through hard seasons.', today: 'Write or speak a lament: what hurts, what you\'re angry about, what you wish were different. End with whatever you can honestly say, even "I\'m still here."', build: 'Read a lament psalm or poem, and write your own in its shape.', hard: 'If you fear your anger is wrong, remember that honesty is a form of trust.', vary: 'Without faith language, write a letter to life, or to the universe.' },
    'roots|Sabbath Hour': { why: 'Rest with no productivity is an ancient rhythm, and it gives the soul room to catch up with the body.', today: 'Choose one hour this week. Put away work, chores, and screens. Do only restful, life-giving things: a walk, a nap, a long meal, music.', build: 'Grow it toward a half day or a full day of rest each week, with a simple opening and closing ritual, like lighting a candle.', hard: 'If an hour feels impossible, start with 15 minutes. Rest is a skill you build.' },
    'roots|Sit Spot': { why: 'Returning to one place in nature over time helps you notice slow changes and feel rooted in the world around you.', today: 'Find a spot outside, or by a window, where you can sit. Spend ten minutes noticing sounds, light, and small movements.', build: 'Return weekly through the seasons. Keep a line or two in a notebook about what you notice.', hard: 'In Minnesota winters, a window seat counts. So does a warm coat and five minutes.' },
    'roots|Mealtime Blessing': { why: 'A moment of thanks before eating turns an ordinary meal into a small ritual of gratitude and connection.', today: 'Before your next meal, pause. Give thanks for the food, the earth, and the hands that brought it to you.', build: 'Make it part of shared meals. Let others take turns offering the blessing.', hard: 'If praying aloud feels awkward, a silent breath of thanks is enough.', vary: 'A simple "We\'re grateful for this food and for each other" works for any table.' },
    'roots|Spiritual Direction': { why: 'A spiritual director or chaplain listens with you for the sacred in your life, without an agenda, which helps you hear what you can\'t hear alone.', today: 'Ask a pastor, chaplain, or local retreat center about spiritual directors near you, including ones who welcome all faith traditions and everything in-between.', build: 'Many people meet monthly. Bring whatever is alive or heavy in you.', hard: 'If cost is a barrier, ask about sliding scales. Many directors offer them.' },
    'trunk|Values Sort': { why: 'Knowing your values gives you a compass for choices, big and small. Values work is at the heart of acceptance and commitment therapy.', today: 'Read a values list and circle ten that matter most. Narrow them to your top three.', build: 'Each week, pick one value and do one small thing that honors it.', hard: 'If you can\'t choose, ask: what makes me angry when it\'s missing? That often points to a value.' },
    'trunk|Legacy Letter': { why: 'Writing what you hope to pass on clarifies what matters most, and gives the people you love something precious.', today: 'Write a few lines to someone you love about a lesson, a hope, or a blessing you want them to carry.', build: 'Add to it over time. Some people write one for each person they love.', hard: 'If it feels heavy or final, remember a legacy letter is about living, and it can be written at any age.' },
    'trunk|Purpose Statement': { why: 'A clear sense of purpose is one of the strongest supports for well-being, and naming it makes it easier to live.', today: 'Finish this sentence a few ways: "I\'m here to..." Keep the version that feels most true.', build: 'Read it each morning and let it shape one choice that day.', hard: 'If nothing comes, you may be in a season of searching. That\'s normal and healthy. Try again in a month.' },
    'trunk|Mentor Someone': { why: 'Giving to the next generation builds meaning and a sense that your life reaches beyond you.', today: 'Think of someone younger or newer who could use what you know. Offer an hour, a coffee, or a phone call.', build: 'Meet regularly, or join a mentoring program through work, a school, or a faith community.', hard: 'If you doubt you have anything to offer, remember that listening well is a gift in itself.' },
    'trunk|Job Crafting': { why: 'Small changes in how you do your work can make it more meaningful, even when the job itself doesn\'t change.', today: 'Name one task you do that helps someone. Spend ten minutes doing it with that person in mind.', build: 'Shift a little time toward the parts of your work that matter most to you.', hard: 'If work feels meaningless right now, look for meaning in the people beside you.' },
    'trunk|Moral Repair Letter': { why: 'Moral injury, carrying something that goes against your values, heals slowly through honest telling, making amends where possible, and being heard.', today: 'Write what happened and what you wish had been different. Keep it private.', build: 'Share it with a chaplain, counselor, or trusted person. Consider one act of repair or service.', hard: 'This can stir up deep pain. Go slowly, and please don\'t carry it alone. A chaplain or counselor can walk with you.' },
    'trunk|Stand-For Card': { why: 'A small reminder of what you stand for helps you act on your values when life gets noisy.', today: 'On a card, write three things you stand for. Keep it in your wallet or on your mirror.', build: 'When a hard choice comes, pull out the card and ask which choice honors it.', hard: 'Your card can change as you grow.' },
    'trunk|Meaning Walk': { why: 'Walking helps the mind wander toward big questions, and movement lifts mood.', today: 'Walk for 20 minutes with one question: what am I living for right now?', build: 'Walk with a new question each week, and jot down what comes.', hard: 'If no answers come, that\'s fine. The question itself is doing its work.' },
    'trunk|Expressive Writing': { why: 'Writing honestly about a hard experience can help you make sense of it. Research shows modest, short-term benefits for some people.', today: 'Write for 15 minutes about your deepest thoughts and feelings about something hard. Don\'t worry about spelling or grammar.', build: 'Write three or four days in a row, then stop and see how you feel.', hard: 'It\'s common to feel a bit worse at first. If it becomes overwhelming, stop, and consider writing with a counselor\'s support instead.' },
    'bark|Self-Compassion Break': { why: 'Treating yourself with the kindness you\'d offer a friend is linked to less anxiety and more resilience. Self-compassion programs show solid benefits in studies.', today: 'When something hurts, say to yourself: "This is hard. Everyone struggles sometimes. May I be kind to myself right now."', build: 'Use it every time you notice your inner critic. It gets more natural with practice.', hard: 'If kindness toward yourself feels strange at first, that\'s common. Keep going gently.' },
    'bark|Soothing Touch': { why: 'Gentle touch, even your own, can calm the body\'s stress response.', today: 'Place a hand on your heart, or cup your cheek, and breathe slowly for a minute.', build: 'Pair it with the self-compassion break when stress rises.', hard: 'If touch feels uncomfortable, try holding a warm mug or a soft blanket instead.' },
    'bark|Slow Exhale': { why: 'Breathing out longer than you breathe in tells your nervous system it\'s safe to settle.', today: 'Breathe in for a count of four, out for six. Do it five times.', build: 'Use it before sleep, before hard conversations, or in the car.', hard: 'If counting feels stressful, simply make each breath out a little slower than the last.' },
    'bark|Body Scan': { why: 'Moving attention through the body helps you notice and release tension, and it can help with sleep.', today: 'Lie down. Slowly move your attention from your head to your toes, noticing each part without trying to change it.', build: 'Try it at bedtime for a week. Guided recordings can help.', hard: 'If attention to the body brings up distress or pain, keep your eyes open, or focus only on your hands and feet.' },
    'bark|Leaves on a Stream': { why: 'This exercise from acceptance and commitment therapy helps you step back from thoughts instead of getting caught in them.', today: 'Picture a stream with leaves floating by. For five minutes, place each thought on a leaf and watch it drift away.', build: 'Use it when a thought keeps looping, like a worry or a harsh judgment.', hard: 'If you get swept away by a thought, that\'s normal. Just notice, and set it on the next leaf.' },
    'bark|Worry Window': { why: 'Setting aside a time to worry can shrink how much worry spills into the rest of your day.', today: 'Choose a 15-minute window. When worries come outside it, jot them down and save them for the window.', build: 'During the window, sort worries into ones you can act on and ones you can release.', hard: 'If worries feel urgent, act on what you can, and ask for help with the rest.' },
    'bark|Kind Voice Letter': { why: 'Writing to yourself in a kind, wise voice helps quiet the inner critic.', today: 'Think of a struggle. Write yourself a short letter as a loving friend would: understanding, honest, and warm.', build: 'Reread it when the critic gets loud.', hard: 'If kind words feel false, start with what you\'d say to someone you love in the same spot.' },
    'bark|Name It': { why: 'Putting a feeling into words can help it settle. Researchers sometimes call it affect labeling.', today: 'When a strong feeling comes, pause and name it in one word: sad, afraid, angry, lonely, tired.', build: 'Check in with yourself three times a day by naming what you feel.', hard: 'If you\'re not sure what you feel, "a lot" or "mixed" counts.' },
    'bark|Micro-Rest': { why: 'Short pauses between demands help prevent burnout, especially for caregivers and helping professionals.', today: 'Between two tasks or visits, take two minutes: breathe, stretch, or look out a window.', build: 'Build micro-rests into your day, like after each patient, class, or meeting.', hard: 'If there\'s truly no time, even three slow breaths count.' },
    'branches|Loving-Kindness': { why: 'Wishing others well, silently, is linked to more positive emotions and connection.', today: 'Sit quietly. Wish well to yourself, then someone you love, then someone neutral: "May you be safe, may you be well."', build: 'Slowly widen the circle to someone difficult, and eventually to all people.', hard: 'If wishing a difficult person well feels too hard, stay with people you love for now.' },
    'branches|Gratitude Letter': { why: 'Writing to thank someone meaningfully brought one of the biggest short-term boosts in happiness in early research.', today: 'Write to someone who made a difference in your life and never got a proper thank you. Be specific.', build: 'If you can, read it to them in person or on a call.', hard: 'If the person has died, write it anyway. Read it at their grave, or keep it close.' },
    'branches|One Reach-Out a Day': { why: 'Small, regular contact keeps relationships alive and eases loneliness over time.', today: 'Send one short message to someone: "Thinking of you."', build: 'Keep a list of people to reach out to, and work through it.', hard: 'If reaching out feels scary, start with someone who you know will be glad to hear from you.' },
    'branches|Shared Meal': { why: 'Eating together is one of the oldest ways humans build closeness.', today: 'Invite someone to share a meal this week, even something simple.', build: 'Make it a weekly rhythm with family, friends, or neighbors.', hard: 'If hosting feels like too much, a potluck or coffee counts.' },
    'branches|Ask for Help': { why: 'Accepting support is a strength. It also lets others show they care.', today: 'Name one specific thing you need help with, and ask one person.', build: 'Keep a short list of what others can do for you, so when people offer, you can answer.', hard: 'If asking feels like being a burden, remember how good it feels when you help someone.' },
    'branches|Active Listening': { why: 'Feeling truly heard is one of the deepest human needs, and listening well strengthens every relationship.', today: 'In one conversation today, listen without planning your reply. Reflect back what you heard.', build: 'Ask one more question than usual in your conversations.', hard: 'If you find yourself fixing, pause and ask, "Do you want advice, or just someone to listen?"' },
    'branches|Forgiveness Reflection': { why: 'Letting go of resentment can lift a heavy burden from you. Forgiveness never requires excusing harm or reconnecting with someone unsafe.', today: 'Write about a hurt you carry, and what holding it costs you. Then write what you might release, just for you.', build: 'Forgiveness often happens in layers. Return to this as you\'re ready.', hard: 'If someone hurt you badly, forgiveness can wait. Your safety comes first. A counselor or chaplain can help.' },
    'branches|Repair a Rupture': { why: 'Relationships grow stronger when people repair after hard moments.', today: 'Think of one strained relationship. Consider a small step, like an honest apology or a kind message.', build: 'Repair is a process. Keep taking small steps if it\'s safe and mutual.', hard: 'Repair isn\'t right when a relationship is unsafe. Protect yourself first.' },
    'branches|Support Group': { why: 'Being with people who understand your experience eases loneliness and offers practical wisdom.', today: 'Look for a local or online group for what you\'re walking through: grief, caregiving, recovery, or a diagnosis.', build: 'Try a group three times before deciding if it fits.', hard: 'If groups feel intimidating, start by listening. You don\'t have to share.' },
    'leaves|Walk or Jog': { why: 'Walking or jogging showed one of the strongest effects on low mood in a large 2024 review of exercise studies.', today: 'Walk for 20 minutes at a pace that feels good.', build: 'Aim for most days of the week, adding intensity if it feels right.', hard: 'If your body limits you, a short, slow walk still counts. Check with your doctor about what\'s safe for you.' },
    'leaves|Yoga': { why: 'Yoga combines movement, breath, and attention, and it showed strong benefits for mood in recent research.', today: 'Try a 15-minute gentle yoga video.', build: 'Practice two or three times a week, or join a class.', hard: 'Choose chair or gentle yoga if you have limits. Stop any pose that hurts.' },
    'leaves|Strength Training': { why: 'Strength training supports mood, bones, and independence as we age.', today: 'Do a few squats, wall push-ups, or band exercises.', build: 'Two or three sessions a week, gradually adding challenge.', hard: 'Start light, and ask a professional if you have injuries or health concerns.' },
    'leaves|Two Hours Outdoors': { why: 'People who spent about two hours a week in nature reported better health and well-being in a large study.', today: 'Spend 20 minutes outside today, at a park, trail, or even your yard.', build: 'Add it up across the week toward two hours, in whatever pieces work.', hard: 'In bad weather or with limited mobility, a porch, a window, or a garden bed can help.' },
    'leaves|Stretch Break': { why: 'Gentle stretching eases tension and reminds your body it\'s cared for.', today: 'Stand up and stretch for five minutes: arms, neck, back, legs.', build: 'Set a reminder to stretch every few hours.', hard: 'Stretch gently. It should never hurt.' },
    'leaves|Tai Chi': { why: 'Tai chi\'s slow movements calm the mind and help with balance, especially as we age.', today: 'Try a beginner tai chi video for 15 minutes.', build: 'Practice a few times a week, or find a local class.', hard: 'Tai chi can be done seated if balance is a concern.' },
    'leaves|Unplugged Evening': { why: 'Screens before bed make it harder to fall asleep, and a calmer evening supports rest.', today: 'Put screens away an hour before bed. Read, talk, or stretch instead.', build: 'Charge your phone outside the bedroom.', hard: 'If an hour feels impossible, start with 20 minutes.' },
    'leaves|Sober Week': { why: 'A sober week shows you how alcohol affects your sleep, mood, and stress.', today: 'Choose a week to go sober, and plan something good for the times you usually drink: a walk, a call, sparkling water, or tea.', build: 'Notice how you sleep and feel. Let that guide your next choice.', hard: 'If stopping is harder than expected, that\'s important to know. The SAMHSA Helpline, 1-800-662-4357, is free and confidential.' },
    'leaves|Morning Daylight': { why: 'Morning light helps set your body\'s clock, which supports sleep and energy.', today: 'Spend ten minutes in morning daylight, outside or by a bright window.', build: 'Make it part of your morning routine.', hard: 'In dark Minnesota winters, the brightest window you have still helps.' },
    'fruit|Three Good Things': { why: 'Writing down three good things and why they happened is one of the most tested gratitude practices.', today: 'Tonight, write three things that went well today and why.', build: 'Keep it up for a week, then see how you feel.', hard: 'On hard days, the good things can be tiny: a warm drink, a kind word.' },
    'fruit|Best Possible Self': { why: 'Imagining a future where things go well lifts mood and optimism, with small but real effects in research.', today: 'Write for 15 minutes about your life a few years from now, going as well as it realistically could.', build: 'Return to it every few weeks and let it guide one small step.', hard: 'If it makes your present feel worse, write about a best possible next month instead.' },
    'fruit|Hope Map': { why: 'Hope grows from having a goal, paths toward it, and the energy to keep going.', today: 'Write one goal. Draw three paths to it, one obstacle for each, and one thing that gives you energy.', build: 'Update your map as paths open or close.', hard: 'If every path feels blocked, ask someone to brainstorm with you.' },
    'fruit|Savoring Walk': { why: 'Slowing down to notice good things strengthens positive feelings.', today: 'Take a ten-minute walk and notice as many good things as you can: a smell, a color, a sound.', build: 'Try it weekly, in different places.', hard: 'If nothing feels good, notice what is neutral and calm.' },
    'fruit|Joy List': { why: 'A list of small joys makes them easier to find again on hard days.', today: 'Write five small things that bring you joy.', build: 'Add to it whenever you notice joy. Read it when you need a lift.', hard: 'If joy feels far away, list things you used to enjoy.' },
    'fruit|Tiny Next Step': { why: 'Small steps build momentum, and momentum builds hope.', today: 'Pick something you hope for. Name the smallest step toward it, and take it today.', build: 'Take one tiny step each day or week.', hard: 'If even a small step feels like too much, make it smaller.' },
    'fruit|Growth Reflection': { why: 'Many people find new strength or meaning after hardship. Noticing it can help, but it\'s never required.', today: 'If you\'re ready, write about one strength a hard season has shown you.', build: 'Return to it as time passes. Growth often shows up later.', hard: 'Not yet is a valid answer. Growth isn\'t owed to anyone, and grief is not a lesson.' },
    'fruit|Something to Look Forward To': { why: 'Having something good ahead of you lifts mood now.', today: 'Plan one small good thing this week: a coffee, a walk, a call.', build: 'Keep one thing on the calendar to look forward to each week.', hard: 'If planning feels hard, ask someone to plan something with you.' }
  };
  const SHELF = {
    roots: [
      ['Contemplative Outreach', 'https://www.contemplativeoutreach.org/', 'Centering prayer and lectio divina, with free guides.'],
      ['The Ignatian Examen', 'https://www.jesuits.org/spirituality/the-ignatian-examen/', 'The five steps of the daily examen.'],
      ['Awe Walk, Greater Good in Action', 'https://ggia.berkeley.edu/practice/awe_walk', 'A free, research-based awe practice.'],
      ['Awe, by Dacher Keltner', '', 'A book on the science of wonder.'],
      ['The Awakened Brain, by Lisa Miller', '', 'A book on spirituality and resilience.'],
      ['A chaplain or spiritual director', '', 'Ask a local hospital, hospice, or retreat center.']
    ],
    trunk: [
      ['Values handout, VA Whole Health', 'https://www.va.gov/WHOLEHEALTHLIBRARY/docs/Values.pdf', 'A free guide to naming your values.'],
      ['Free ACT resources, Russ Harris', 'https://psychwire.com/free-resources/clinical-tools/resource-1gm0b9r/act-made-simple-extra-bits', 'Worksheets on values and meaning.'],
      ['Michael Steger on meaning', 'http://www.michaelfsteger.com/?page_id=13', 'Research on meaning and purpose.'],
      ["Man's Search for Meaning, by Viktor Frankl", '', 'A classic on meaning through suffering.']
    ],
    bark: [
      ['Self-compassion practices', 'https://self-compassion.org/', 'Free guided practices from Kristin Neff.'],
      ['Self-Compassion, by Kristin Neff', '', 'A book on being kind to yourself.'],
      ['ProQOL', 'https://proqol.org/', 'A free self-check for helpers and caregivers.'],
      ['NAMI Minnesota', 'https://namimn.org/', 'Mental health education and support groups.']
    ],
    branches: [
      ['Commit to Connect', 'https://committoconnect.org/the-surgeon-generals-advisory/', 'Resources on loneliness and connection.'],
      ['NAMI Minnesota support groups', 'https://namimn.org/', 'Free groups for people and families.'],
      ['Minnesota 211', 'https://www.211unitedway.org/', 'Call 211 to find local groups and help.'],
      ['National Domestic Violence Hotline', 'https://www.thehotline.org/', '1-800-799-7233, or text START to 88788.']
    ],
    leaves: [
      ['Sleep guidance, CDC and AASM', 'https://aasm.org/cdc-publishes-new-estimates-of-u-s-adult-sleep-duration/', 'How much sleep adults need.'],
      ['Exercise and mood, BMJ 2024', 'https://bmj.com/content/384/bmj-2023-075847', 'The large review behind the movement practices.'],
      ['Two hours in nature', 'https://www.nature.com/articles/s41598-019-44097-3', 'The study behind the two-hours-outdoors goal.'],
      ['SAMHSA National Helpline', 'https://www.samhsa.gov/find-help/helplines/national-helpline', '1-800-662-4357, free and confidential.']
    ],
    fruit: [
      ['Greater Good in Action', 'https://ggia.berkeley.edu/', 'Free gratitude, hope, and savoring practices.'],
      ['Gratitude Letter', 'https://ggia.berkeley.edu/practice/gratitude_letter', 'Step-by-step instructions.'],
      ['988 Suicide and Crisis Lifeline', 'https://988lifeline.org/', 'Call or text 988, any time.']
    ]
  };

  // ---------------- BLD 756: practices that fit Health and Ability ----------------
  const LIFE_NEW = {"NEW": {"leaves": [["Pacing Your Day", "Plan today's energy like a budget: one must, one want, and rest in between."], ["Rest Before You're Spent", "Take a planned rest break before you run out, not after."], ["Appointment Prep", "Before a visit, write what has changed, three questions, and what matters most to you."]], "bark": [["Hard-Day Plan", "Write a short plan for hard days: what can wait, who to tell, and what comforts you."], ["Body Kindness Scan", "Thank each part of your body for what it does today, skipping any part you choose."], ["Quiet the Senses", "Lower the light and sound for a few minutes: headphones, a dim room, or a soft blanket."]], "branches": [["Say What You Need", "Ask for one thing that helps, in one clear sentence: a seat, captions, a slower pace, or a quiet room."], ["A Break for the Helper", "If you help care for someone, plan one real break this week and let someone else cover."]], "trunk": [["Worth Beyond Doing", "Name three ways you matter that have nothing to do with what you can do today."]]}, "G": {"leaves|Pacing Your Day": {"why": "When energy is limited, spending it on purpose helps you do what matters most and leaves room to recover. Planning rest before you need it keeps good days from turning into hard ones.", "today": "Write three lines: one thing you must do, one thing you want to do, and when you will rest. Do them in that order, resting between.", "build": "Notice which times of day you have the most energy, and put what matters most there. Keep a short list of what can wait.", "hard": "If even one thing feels like too much, the plan for today is rest. That counts as tending."}, "leaves|Rest Before You're Spent": {"why": "Resting only after you crash makes recovery longer. Short planned breaks spread through the day can keep energy steadier.", "today": "Pick two times today for a ten minute rest, and set a gentle reminder. Rest even if you feel fine.", "build": "Keep the same rest times for two weeks and notice how your evenings feel.", "hard": "If rest brings guilt, say it plainly: resting is part of caring for my body. Rest is tending too."}, "bark|Hard-Day Plan": {"why": "Hard days come with less energy for decisions. A plan made on a better day does the thinking for you.", "today": "Write three short lists: what can wait, who to tell and how, and three things that comfort you, like a show, a blanket, or a voice you love.", "build": "Share the plan with one person who helps you, and update it after a hard day with what helped.", "hard": "If writing is hard, say it aloud and let someone write it down, or record it on your phone."}, "leaves|Appointment Prep": {"why": "Appointments go fast. Coming with your questions and what matters to you helps you leave with what you came for.", "today": "Write what has changed since your last visit, the three questions that matter most, and one thing you want your care team to know about your life.", "build": "Bring the list to every visit, and write down the answers or ask someone to. Ask what to watch for and who to call.", "hard": "If you forget a question, it is fine to call or message after. You can also ask for the visit notes."}, "bark|Body Kindness Scan": {"why": "When a body hurts or works differently, it is easy to notice only what is hard. Kind attention to what still serves you can soften the day.", "today": "Start at your hands or your breath. Name one thing each part did for you today, and say thank you. Skip any part you choose.", "build": "Try it at the same time each day, like before sleep, for two weeks.", "hard": "If any part brings up pain or hard feelings, move on, or stop and rest. Your choice is the practice."}, "branches|Say What You Need": {"why": "People often want to help but do not know how. One clear sentence makes it easy for them to say yes.", "today": "Finish this sentence for one place you go this week: It helps me when you... Say it, show it, or send it.", "build": "Keep a short list of what helps you, ready to share with a new teacher, boss, doctor, or friend.", "hard": "If asking feels hard, start with someone safe. Asking for what helps is a strength, and you never owe anyone your whole story."}, "bark|Quiet the Senses": {"why": "Bright light, noise, and crowds can wear a body and mind down fast. A few quiet minutes give your senses a rest.", "today": "Find the quietest spot you can. Dim the light, put on headphones or earplugs, and breathe slowly for five minutes.", "build": "Plan a quiet reset after busy times, like after work, class, or a family gathering.", "hard": "If you cannot leave the room, close your eyes, look at one still thing, or step into a hallway for a minute."}, "trunk|Worth Beyond Doing": {"why": "When illness or a disability changes what you can do, it can feel like your worth changes too. It does not. Naming what you are, not only what you do, steadies that.", "today": "Write or say three ways you matter: how you love, what you notice, what you carry, who you are to someone.", "build": "Keep the list where you will see it, and add to it when someone tells you what you mean to them.", "hard": "If you cannot think of any today, ask someone who loves you. Their answer counts."}, "branches|A Break for the Helper": {"why": "People who care for someone they love often go a long time without a real break. Rest helps you keep going, and helps the person you love too.", "today": "Name one hour this week and one person who could cover. Ask them today.", "build": "Make it a standing break, the same time each week.", "hard": "If no one can cover, ask your clinic, a faith community, or a local caregiver program about respite."}}, "META": {"leaves": {"Pacing Your Day": ["Z", "10 min", "S", ""], "Rest Before You're Spent": ["Z", "10 min", "S", ""], "Appointment Prep": ["L", "10 min", "S", ""]}, "bark": {"Hard-Day Plan": ["W", "15 min", "E", ""], "Body Kindness Scan": ["B", "5 min", "S", ""], "Quiet the Senses": ["Z", "5 min", "E", ""]}, "branches": {"Say What You Need": ["R", "5 min", "E", ""], "A Break for the Helper": ["Z", "60 min", "S", ""]}, "trunk": {"Worth Beyond Doing": ["W", "5 min", "E", ""]}}, "FLAGS": {"leaves|Pacing Your Day": {"life": ["health", "pain", "serious", "moving", "mind", "memory", "gentle"], "adapt": "On a hard day, choose one thing and let the rest wait. That is a full plan."}, "leaves|Rest Before You're Spent": {"life": ["pain", "health", "serious", "mind", "close", "gentle"], "adapt": "Lying down, eyes closed, or sitting with your feet up all count."}, "bark|Hard-Day Plan": {"life": ["health", "pain", "serious", "mind", "memory", "close", "gentle"], "adapt": "Make it on a good day, keep it where you rest, and let someone read it to you when you need it."}, "leaves|Appointment Prep": {"life": ["health", "serious", "pain", "memory", "hearing", "seeing", "learning", "mind", "moving"], "adapt": "Record it on your phone, ask for an interpreter or large print, or bring someone to take notes."}, "bark|Body Kindness Scan": {"life": ["pain", "moving", "health", "serious", "mind", "gentle"], "adapt": "Lying down or seated. Skip any part, and stay with the parts that feel neutral or good."}, "branches|Say What You Need": {"life": ["hearing", "seeing", "moving", "autism", "learning", "health", "pain", "mind"], "adapt": "Write it on a card or in your phone notes to show, or ask someone you trust to say it with you."}, "bark|Quiet the Senses": {"life": ["autism", "mind", "pain", "learning", "serious", "gentle"], "adapt": "Keep a small kit ready: headphones, sunglasses, and something soft to hold."}, "trunk|Worth Beyond Doing": {"life": ["health", "pain", "serious", "moving", "close", "mind", "memory", "gentle"], "adapt": "Say them aloud, or ask someone who loves you to name one with you."}, "branches|A Break for the Helper": {"life": ["close"], "adapt": "Even twenty minutes counts. A walk, a nap, or a coffee with a friend."}}};
  const FLAGS = {};
  Object.keys(LIFE_NEW.NEW).forEach(p => { NEW[p] = (NEW[p] || []).concat(LIFE_NEW.NEW[p]); });
  Object.assign(G, LIFE_NEW.G);
  Object.keys(LIFE_NEW.META).forEach(p => { META[p] = Object.assign(META[p] || {}, LIFE_NEW.META[p]); });
  Object.assign(FLAGS, LIFE_NEW.FLAGS);

  /* LIFE start: Health and Ability (GWG BLD 756, HA 1). Generated by worker A; edit the words in the tables.
     LIFE_BASE  practice name: [life ids, adapt line or null] (shared/gg-life.js ids, plus gentle)
     FLAGS[id].life and FLAGS[id].adapt are what the app reads. */
  const LIFE_BASE = {"Breathe": [["health", "pain", "mind", "serious", "gentle"], "Seated or lying down works fully. Breathe out a little longer than you breathe in."], "Slow Exhale": [["pain", "mind", "serious", "health", "gentle"], "Lying down, seated, or in a waiting room. No one needs to notice."], "Body Scan": [["pain", "mind", "serious", "gentle"], "Skip any part that hurts or that you would rather not notice. Lying down works well."], "Breath Prayer": [["serious", "pain", "gentle"], "In bed or in a waiting room, one breath at a time. Whispered or silent counts."], "Prayer": [["serious", "gentle"], "From bed or a chair, silent or aloud. One honest sentence is enough on a hard day."], "Self-Compassion Break": [["mind", "pain", "health", "serious", "close"], "On a hard body day, say it to the part of you that hurts: this is hard, and I am held."], "Name It": [["mind", "autism", "learning"], "Point to a word on a feelings list if words are hard to find."], "Leaves on a Stream": [["mind", "pain", "gentle"], "Eyes open or closed, seated or lying down. Picture the leaves, or simply say: let it float."], "Worry Window": [["mind", "health", "serious"], "Health worries can go in the window too. Write them as questions for your next appointment."], "Five Senses Pause": [["autism", "mind", "pain", "seeing", "hearing", "gentle"], "Use the senses that work for you, in any order, and skip any that feel like too much."], "Music": [["mind", "pain", "hearing", "serious", "memory", "gentle"], "Feel the beat through the floor or a speaker you hold, or read along with the words. Listening from bed counts."], "Meditation": [["mind", "pain", "gentle"], "Seated or lying down, and eyes open is fine. Two minutes counts."], "Mindfulness": [["mind", "autism", "gentle"], "Choose a task your body does easily today, like holding a warm cup."], "Reading": [["seeing", "learning", "serious", "gentle"], "Audiobooks, large print, braille, or text to speech count fully."], "Kind Voice Letter": [["mind", "pain", "health", "close"], "Say it aloud or record a voice memo if writing is hard today."], "Expressive Writing": [["mind", "serious"], "Speak it into a voice memo, or type with dictation, if writing by hand is hard."], "Journal": [["learning", "seeing"], "A voice memo or dictation counts as a journal."], "Journal Often": [["learning", "seeing"], "A voice memo or dictation counts as a journal."], "Micro-Rest": [["pain", "health", "close", "gentle"], "Rest before you are spent: two minutes lying down or with your eyes closed counts."], "Sabbath Hour": [["pain", "health", "serious", "close", "gentle"], "On a hard week, an hour of rest in bed counts fully."], "Quiet Time": [["autism", "mind", "gentle"], "A dim, quiet spot with headphones counts. Lying down is fine."], "Welcome Solitude": [["autism", "gentle"], null], "Sit Spot": [["moving", "seeing", "autism", "gentle"], "A window seat counts. Notice sounds and the air if seeing is hard."], "Awe Walk": [["moving", "seeing", "mind", "gentle"], "Roll, walk, or sit by a window. Listen for something wonderful, too."], "Savoring Walk": [["moving", "seeing", "gentle"], "Roll, walk with a cane, or sit outside and savor what you hear and feel."], "Movement": [["moving", "pain", "health", "mind", "gentle"], "Any way your body moves counts: chair moves, arm circles, rolling, or stretching in bed."], "Walk or Jog": [["moving", "pain", "health", "gentle"], "Roll, use a cane or walker, or march in place from a chair."], "Walk Your Way": [["moving", "pain", "health", "gentle"], null], "Strength Training": [["moving", "health", "gentle"], "From a chair: seated leg lifts, wall push ups, or band pulls with your arms."], "Stretch Break": [["moving", "pain", "gentle"], "Seated or lying down: roll your shoulders, turn your neck gently, and stretch your fingers."], "Yoga": [["moving", "pain", "gentle"], "Chair yoga counts. Skip any pose that hurts."], "Tai Chi": [["moving", "pain", "memory", "gentle"], "Seated tai chi works, moving only your arms and upper body."], "Two Hours Outdoors": [["moving", "mind", "gentle"], "A porch, a balcony, or an open window in daylight counts."], "Morning Daylight": [["mind", "moving", "gentle"], "Sit by a bright window if going out is hard today."], "Sleep": [["health", "pain", "mind", "serious"], "If pain or treatment breaks up your nights, rest in the day without guilt."], "Food": [["health", "serious"], "On a low energy day, easy foods count: something ready to eat, and water within reach."], "Medicine": [["health", "serious", "mind", "memory"], "A pill box, a phone alarm, or a helper's reminder makes this easier."], "Steady Wake Time": [["mind", "autism", "memory"], "A steady routine helps. On a hard day, rest is part of the routine."], "Smart Nap": [["pain", "health", "serious", "gentle"], "On a treatment or hard day, rest as long as you need. That is tending too."], "Ask for Help": [["close", "health", "moving", "hearing", "seeing", "serious", "memory", "mind"], "Ask in the way that works for you: a text, a note, in sign, or a call."], "Support Group": [["close", "health", "mind", "serious", "hearing", "autism"], "Groups online, groups for people living with the same thing, and Deaf led groups all count."], "Active Listening": [["hearing", "close", "autism"], "In sign, by text, or with captions on. Face each other in good light."], "One Reach-Out a Day": [["close", "hearing", "moving", "serious", "gentle"], "A text, a video call in sign, or a card counts. From bed counts too."], "Shared Meal": [["hearing", "close"], "Pick a quiet spot with good light, so everyone can see faces and hands."], "Loving-Kindness": [["close", "serious", "pain", "gentle"], "Include the person you care for, and yourself. Lying down works."], "Capture the Moment": [["seeing", "serious", "gentle"], "A voice note works as well as a photo."], "Three Good Things": [["memory", "seeing", "mind", "gentle"], "Say them aloud to someone, or record them, if writing is hard."], "Joy List": [["serious", "pain", "mind", "gentle"], "Keep the list where you rest, so it is close on hard days."], "Something to Look Forward To": [["serious", "pain", "mind", "gentle"], "Choose something that fits a low energy day: a show, a call, a favorite food."], "Tiny Next Step": [["learning", "mind", "pain", "health"], "Make it small enough for a hard day. One step counts."], "Celebrate a Win": [["learning", "autism", "health"], "A win on a hard body day counts double."], "Name Your Gifts": [["learning", "autism", "moving", "health"], "Gifts that have nothing to do with what your body can do today count fully."], "Weekly Reset": [["learning", "autism"], "Use a checklist or a reminder, and keep the same steps each week."], "Study Sprints": [["learning"], "Short blocks with a timer you can see, and a movement break between, help a busy brain."], "Before the Big Moment": [["autism", "mind", "learning"], "Write a short script of what you will say, and practice it once."], "Plan Your Answer": [["autism"], "A ready script helps. Say it the same way every time."], "Join and Go Three Times": [["autism", "hearing", "moving"], "Check the place for access and quiet spaces first, or try a group built around something you love."], "Clubs": [["autism", "hearing", "moving"], "Check the place for access and quiet spaces first, or try a group built around something you love."], "Memory Helpers": [["memory"], null], "Prayers You Know by Heart": [["memory", "serious", "gentle"], "Words learned long ago stay close. Say them with someone if remembering is hard."], "Sacred Music": [["memory", "serious", "gentle"], null], "Record a Story": [["serious", "memory"], "Tell it aloud and let someone write it down or record it."], "Life Review": [["serious", "memory"], "Tell it aloud and let someone write it down or record it."], "Write Your Story": [["serious", "memory"], "Tell it aloud and let someone write it down or record it."], "Legacy Letter": [["serious", "memory"], "Tell it aloud and let someone write it down or record it."], "Hold Someone in Light": [["close", "serious", "gentle"], null], "Caregiver Pause": [["close"], null], "Lament": [["serious", "pain", "health"], "Pray it or write it from bed. Honest is enough."], "Worship": [["moving", "hearing", "seeing", "serious"], "Online, by radio or TV, with an interpreter, or in large print. Worship from home counts fully."], "Faith": [["moving", "hearing"], "Ask about rides, ramps, interpreters, or large print. A visit at home counts."], "Faith Community": [["moving", "hearing"], "Ask about rides, ramps, interpreters, or large print. Joining online counts."], "Scripture": [["seeing"], "Audio, large print, or braille editions count."], "Garden Time": [["moving"], null], "Dance in the Kitchen": [["moving", "hearing", "gentle"], null], "Chair Stretch": [["moving", "pain", "serious", "gentle"], null], "In-Bed Movement": [["moving", "pain", "serious", "gentle"], null], "Sit to Stand": [["moving"], null], "Balance Practice": [["moving"], null], "Fall Confidence": [["moving"], null], "Hearing and Vision Check": [["hearing", "seeing"], null], "Water Within Reach": [["health", "serious", "gentle"], null], "Easy Meals Plan": [["health", "serious", "pain"], null], "Appetite Helpers": [["health", "serious"], null], "Protein at Every Meal": [["health"], null], "Talk About Your Mood": [["mind", "health"], null], "Speak Up About Your Mood": [["mind", "health"], null], "My Safety Plan": [["mind"], null], "Health Basics": [["health", "serious"], null], "Make Your Wishes Known": [["serious", "health"], null], "Reason to Get Up": [["serious", "memory"], null], "Watch Something Grow": [["moving", "serious", "gentle"], null], "Something Funny": [["serious"], null], "Get Counseling": [["mind"], null], "Spiritual Direction": [["serious"], null], "Family": [["close"], null], "Grandchildren": [["moving"], null], "Standing Call": [["hearing", "seeing", "moving", "close"], "A video call in sign, a phone call, or a standing visit all count."], "Neighbors": [["moving"], null], "Friends": [["hearing", "autism"], "Friendships by text, online, or in sign count fully."], "Mealtime Blessing": [["memory"], null], "Volunteer": [["moving"], "Many roles work seated or from home: calls, cards, mentoring by video."], "Mentor Someone": [["learning", "autism"], null], "Teach": [["moving"], null]};
  const MAP = () => [];
  // Every practice gets its life tags and adapt line from LIFE_BASE (by name), plus the
  // tree's own flags (MAP). A practice with an adapt line, here or in its guide, also fits
  // Show Gentler Ways First. Tags only order and add; nothing is ever hidden.
  Object.keys(META).forEach(part => Object.keys(META[part]).forEach(name => {
    const id = part + '|' + name, b = LIFE_BASE[name], f0 = FLAGS[id] || {}, life = (f0.life || []).slice();
    const add = x => { if (life.indexOf(x) < 0) life.push(x); };
    if (b) b[0].forEach(add);
    MAP(f0, part).forEach(add);
    const adapt = f0.adapt || (b && b[1]) || '';
    if (adapt || ((GUIDES[id] || G[id] || {}).adapt)) add('gentle');
    if (!life.length && !adapt) return;
    FLAGS[id] = Object.assign(f0, { life: life });
    if (adapt) FLAGS[id].adapt = adapt;
  }));
  /* LIFE end */

  window.OAK_PRACTICES = { DOMAIN_DEFS, GUIDES, G, META, NEW, EV, DISC, SRC, SHELF, FLAGS };
})();
