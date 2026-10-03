/* =====================================================================
   THE GROVE . CONTENT
   Everything people read lives here: the six parts of the tree, the
   planting quiz, the teen weekly check-in, the practices, and the twelve
   weeks. Edit words here, not in index.html.
   ===================================================================== */

// ---------- THE SIX PARTS ----------
// The same six parts as every Grounded check-in tool. Leaves holds three
// strands (Move, Rest, Nourish) so The Grove can aim at the one that needs it.
const PARTS = [
 { id:"roots", name:"Roots", sub:"What grounds you", color:"#8E5A2B", strands:["spirit"],
   blurb:"What's sacred to you, and what holds you up. All faith traditions and everything in-between.",
   kid:"Quiet, wonder, and feeling thankful." },
 { id:"trunk", name:"Trunk", sub:"Purpose", color:"#C27A1E", strands:["create"],
   blurb:"What you live for, and the things you make along the way.",
   kid:"Making, building, and what you love to do." },
 { id:"bark", name:"Bark", sub:"Mind and feelings", color:"#6E5BB5", strands:["mind"],
   blurb:"Settling your thoughts and caring for your emotional health.",
   kid:"Big feelings, calm breaths, and kind thoughts." },
 { id:"branches", name:"Branches", sub:"Relationships", color:"#1F8A8F", strands:["connect"],
   blurb:"Reaching toward people, and letting them reach you.",
   kid:"Family, friends, and people who care about you." },
 { id:"leaves", name:"Leaves", sub:"Body", color:"#3A9B58", strands:["body","rest","nourish"],
   blurb:"Moving, resting, and eating in ways that care for your body.",
   kid:"Moving, sleeping, and good food." },
 { id:"fruit", name:"Fruit", sub:"Hope", color:"#D9483F", strands:["hope"],
   blurb:"Looking forward, noticing the good, and growing toward it.",
   kid:"Happy moments, kind acts, and looking forward." }
];
const PART = Object.fromEntries(PARTS.map(p => [p.id, p]));
const partName = id => PART[id] ? PART[id].name : id;

// ---------- THE EIGHT STRANDS ----------
// Each practice list and quiz page belongs to one strand. Five parts have one
// strand each; Leaves has three.
const STRANDS = [
 { id:"body", part:"leaves", name:"Move", color:"#3A9B58", slot:"morning",
   blurb:"Moving the body you have, at the pace it can go.",
   kid:"Moving, playing, and taking care of your body.",
   why:"Movement is how the body tells itself it's alive and cared for. It lifts mood, steadies sleep, and gives stress somewhere to go. You don't have to be an athlete. You just have to move a little, on purpose." },
 { id:"rest", part:"leaves", name:"Rest", color:"#4E8C74", slot:"evening",
   blurb:"Sleep, recovery, and time when nothing is asked of you.",
   kid:"Sleep, quiet time, and cozy breaks.",
   why:"Rest is where everything you tend becomes growth. Tired people make hard days harder. Protecting sleep and real downtime is not lazy. It's the soil everything else grows in." },
 { id:"nourish", part:"leaves", name:"Nourish", color:"#6E9E45", slot:"midday",
   blurb:"Food as care, not as a test you pass or fail.",
   kid:"Good food, water, and meals together.",
   why:"How you eat shapes your energy, your mood, and how you feel in your own skin. Nourish is about real food, eaten slowly, with a little attention. No rules to break. Just care." },
 { id:"mind", part:"bark", name:"Bark", color:"#6E5BB5", slot:"morning",
   blurb:"Settling your thoughts and tending your emotional health.",
   kid:"Big feelings, calm breaths, and kind thoughts.",
   why:"A mind that never gets quiet wears you down. A few minutes of stillness each day trains your attention and gives your nervous system a place to rest. Like a fern, it unfolds slowly." },
 { id:"connect", part:"branches", name:"Branches", color:"#1F8A8F", slot:"midday",
   blurb:"Reaching toward people, and letting them reach you.",
   kid:"Family, friends, and people who care about you.",
   why:"We are not built to grow alone. Isolation quietly drains every other part of health. Like a sweet pea, we grow by holding onto something. Branches are about the people you hold onto." },
 { id:"spirit", part:"roots", name:"Roots", color:"#8E5A2B", slot:"morning",
   blurb:"Meaning, gratitude, and what's sacred to you. All faith traditions and everything in-between.",
   kid:"Quiet, wonder, and feeling thankful.",
   why:"Everyone has an inner life, whether they call it faith or not. Gratitude, quiet, and holding others in mind give your days a center. You don't need the right words. You just need to show up." },
 { id:"create", part:"trunk", name:"Trunk", color:"#C27A1E", slot:"midday",
   blurb:"Making things, and living toward what matters to you.",
   kid:"Making, building, and what you love to do.",
   why:"Making something, even a few lines on a page, helps you work through what you've seen and felt. And knowing what you're living for gives the rest of your days a spine. No audience required." },
 { id:"hope", part:"fruit", name:"Fruit", color:"#D9483F", slot:"evening",
   blurb:"Looking forward, noticing the good, and growing toward it.",
   kid:"Happy moments, kind acts, and looking forward.",
   why:"Hope isn't only a feeling you wait for. It's a practice: noticing what's good, taking the next small step, and giving to others. Like a fruit tree, it takes a few seasons, and then it feeds people." }
];
const STRAND = Object.fromEntries(STRANDS.map(b => [b.id, b]));
const partOf = id => STRAND[id] ? STRAND[id].part : id;
// "Roots", or "Leaves: Rest" for the three strands inside Leaves.
const strandName = id => { const b = STRAND[id]; if (!b) return id; return b.part === 'leaves' ? 'Leaves: ' + b.name : b.name; };

// ---------- AGE MODES ----------
// Wording: maple uses kid words; aspen and pine use teen words.
const AGES = [
 { id:"adult", name:"Adult", who:"Me, or another adult", w:0 },
 { id:"pine", name:"High school", who:"Grades 9 to 12", w:1 },
 { id:"aspen", name:"Middle school", who:"Grades 6 to 8", w:1 },
 { id:"maple", name:"Kids", who:"Kindergarten to grade 5", w:2 }
];
const AGE = Object.fromEntries(AGES.map(a => [a.id, a]));
const wordIdx = age => (AGE[age] || AGE.adult).w;
const isKid = age => age === 'maple';

// ---------- ANSWER SCALES ----------
const SCALE5 = [["Never",1],["Rarely",2],["Sometimes",3],["Often",4],["Almost always",5]];
const SCALE3 = [["Not yet",1],["Sometimes",3],["A lot",5]];
const QSTEM = [
 "In the past two weeks, how often was this true for you?",
 "In the past two weeks, how often was this true for you?",
 "Lately, how often is this true for you?"
];

// ---------- PLANTING QUIZ: 64 questions, 8 per strand ----------
// [adult, teen, kid, reverse]. Reverse items: "often" means more care needed.
const QS = {
 body:[
  ["I moved my body on purpose, even a little.","I moved my body on purpose, like walking, sports, or dancing.","I ran, jumped, danced, or played hard."],
  ["My body had the energy my day asked of it.","I had enough energy to get through my day.","I had lots of energy to play."],
  ["I felt at home in my body.","I felt okay in my own body.","My body felt good and strong."],
  ["I spent time outside in daylight.","I got outside for a while during the day.","I played outside."],
  ["I sat for long stretches without getting up.","I sat or scrolled for hours without moving.","I sat still for a really long time, like with screens.",1],
  ["I noticed what my body needed and gave it that.","I noticed when my body needed something, like water, a stretch, or a break.","I noticed when my body was tired, thirsty, or hungry."],
  ["Aches, pain, or tension got in the way of my day.","My body hurt or felt tense.","My body hurt, like my tummy or my head.",1],
  ["Moving my body felt like care, not punishment.","Moving felt good, not like something I had to prove.","Moving my body was fun."]
 ],
 rest:[
  ["I woke up feeling rested.","I woke up feeling rested.","I woke up feeling ready for the day."],
  ["I went to bed around the same time most nights.","I went to bed around the same time most nights.","I went to bed at my bedtime."],
  ["I was on a screen right up until I fell asleep.","I was on my phone right up until I fell asleep.","I watched a screen right before sleep.",1],
  ["I had real downtime, not just collapse time.","I had time to just chill with nothing I had to do.","I had quiet time to just rest."],
  ["I felt worn out, even after sleep.","I felt tired all day, even after sleeping.","I felt too tired to play.",1],
  ["I took real breaks during the day.","I took real breaks during the day.","I took a break when I needed one."],
  ["My mind was too busy to fall asleep.","My mind was too busy to fall asleep.","It was hard to fall asleep.",1],
  ["I let myself rest without feeling guilty.","I let myself rest without feeling lazy.","I felt calm and cozy at bedtime."]
 ],
 nourish:[
  ["I ate regular meals, not just whatever was around.","I ate real meals, not just snacks.","I ate breakfast, lunch, and dinner."],
  ["I drank enough water.","I drank enough water.","I drank water during the day."],
  ["I ate sitting down, without rushing.","I ate without rushing.","I sat down to eat."],
  ["I ate vegetables or fruit.","I ate fruits or vegetables.","I ate fruits or veggies."],
  ["I skipped meals because I was busy or stressed.","I skipped meals.","I skipped a meal.",1],
  ["I shared a meal with other people.","I ate a meal with family or friends.","I ate a meal with my family."],
  ["How I ate left me feeling steady, not sluggish.","Food gave me energy that lasted.","Food gave me energy to learn and play."],
  ["I felt stressed, guilty, or upset about food.","I felt stressed or upset about food or eating.","I felt worried or upset about food.",1]
 ],
 mind:[
  ["I had ways to settle myself when stress climbed.","I had ways to calm down when I got stressed.","When I got upset, I knew how to calm down."],
  ["My thoughts gave me some quiet during the day.","My mind got some quiet during the day.","My mind felt calm."],
  ["Worry took up a lot of my day.","I worried a lot.","I felt worried.",1],
  ["I could name what I was feeling.","I could name what I was feeling.","I could say how I was feeling."],
  ["I felt overwhelmed.","I felt like everything was too much.","I felt like things were too much.",1],
  ["I was kind to myself when I made a mistake.","I was kind to myself when I messed up.","When I made a mistake, I was kind to myself."],
  ["I could focus on what was in front of me.","I could focus in class or on what I was doing.","I could pay attention at school."],
  ["I felt irritable or on edge.","I felt cranky or on edge.","I felt grumpy or mad.",1]
 ],
 connect:[
  ["There was someone I could call when things were hard.","There was someone I could talk to when things were hard.","There was a grown-up I could talk to."],
  ["I spent real time with people I care about.","I spent real time with people I care about, not just online.","I played with friends or family."],
  ["I felt lonely.","I felt lonely or left out.","I felt left out or lonely.",1],
  ["I felt understood by someone.","Someone really got me.","Someone listened to me."],
  ["I reached out to someone first.","I reached out to someone first.","I was kind to someone."],
  ["I let someone help me.","I let someone help me.","I asked for help when I needed it."],
  ["Conflict with someone weighed on me.","Drama or a fight with someone weighed on me.","I had a fight with someone that made me sad.",1],
  ["I felt like I belonged somewhere.","I felt like I belonged somewhere, like a team, group, or family.","I felt like I belonged."]
 ],
 spirit:[
  ["I took time for prayer, quiet, or reflection.","I took time for quiet, prayer, or reflection.","I had a quiet moment to think or pray."],
  ["I felt connected to something bigger than myself.","I felt connected to something bigger than me.","I felt part of something big and good."],
  ["I noticed things I was grateful for.","I noticed things I was thankful for.","I said thank you for good things."],
  ["Nature, beauty, or something sacred filled me with wonder.","Something in nature or beauty made me stop and notice.","I saw something amazing in nature."],
  ["I felt empty inside, like something was missing.","I felt empty inside.","I felt sad inside and didn't know why.",1],
  ["My faith, beliefs, or traditions gave me comfort.","My faith, beliefs, or traditions helped me.","Something I believe in helped me feel better."],
  ["I felt at peace.","I felt at peace.","I felt peaceful inside."],
  ["I was able to forgive, or to feel forgiven.","I was able to let go of something someone did to me.","I was able to forgive someone."]
 ],
 create:[
  ["I made or wrote something just for me.","I made, wrote, drew, or built something just for me.","I drew, built, or made something."],
  ["I had an outlet for what I carry.","I had a way to get my feelings out, like music, art, or writing.","I had a way to show my feelings, like drawing or singing."],
  ["My days felt like they mattered.","My days felt like they mattered.","I felt like I mattered."],
  ["I knew what I care about most.","I knew what matters most to me.","I knew what I love to do."],
  ["I lost track of time doing something I love.","I got so into something that I lost track of time.","I played so hard I forgot about time."],
  ["I felt like I was just going through the motions.","I felt like I was just going through the motions.","I felt bored with nothing to do.",1],
  ["I used my gifts to help someone.","I used something I'm good at to help someone.","I helped someone with something I'm good at."],
  ["I learned or tried something new.","I learned or tried something new.","I tried something new."]
 ],
 hope:[
  ["I looked forward to something.","I had something to look forward to.","I was excited about something coming up."],
  ["I believed things could get better.","I believed things could get better.","I thought tomorrow could be a good day."],
  ["I noticed good moments as they happened.","I noticed good moments when they happened.","I had a happy moment."],
  ["I felt stuck, like nothing would change.","I felt stuck, like nothing would change.","I felt like things would never get better.",1],
  ["I took a small step toward something I want.","I took a small step toward a goal.","I worked on something I want to get better at."],
  ["I did something kind or generous for someone.","I did something kind for someone.","I did something kind for someone."],
  ["I felt like I had a future worth growing toward.","I pictured a future I'm excited about.","I thought about something fun I want to do someday."],
  ["I laughed.","I laughed hard.","I laughed."]
 ]
};

// ---------- TEEN WEEKLY CHECK-IN: 8 questions, one per strand ----------
// Only high schoolers use this, until Pine is ready. Everyone else checks
// in with Maple, Aspen, or Oak.
const WEEKLY_STEM = ["This past week, how often was this true?","This past week, how often was this true?","This week, how often?"];
const WEEKLY = {
 body:["I moved my body on purpose.","I moved my body on purpose.","I played and moved a lot."],
 rest:["I woke up rested.","I got enough sleep.","I slept well."],
 nourish:["I ate in a way that left me steady.","I ate real meals.","I ate good food that gave me energy."],
 mind:["I could settle myself when stress climbed.","I could calm down when I got stressed.","I could calm down when I was upset."],
 connect:["I felt close to someone.","I felt close to someone.","I felt close to someone."],
 spirit:["I felt at peace.","I felt at peace.","I felt peaceful inside."],
 create:["My days felt like they mattered.","I made or did something that mattered to me.","I made or built something."],
 hope:["I looked forward to something.","I had something to look forward to.","I felt excited about tomorrow."]
};

// ---------- SAFETY STEP ----------
const SAFETY = {
 grown:{
  lead:"Two last questions. They're here because we care, and your answers stay on this device.",
  opener:"Some seasons are heavy. In the past two weeks, how often have you felt hopeless, or like a burden to others?",
  direct:"In the past two weeks, have you had thoughts of ending your life or hurting yourself?"
 },
 teen:{
  lead:"Two last questions. They're here because we care.",
  opener:"In the past two weeks, how often have you felt hopeless, or like things won't get better?",
  direct:"In the past two weeks, have you had thoughts of ending your life or hurting yourself?"
 },
 kid:{
  lead:"Two last questions. There are no wrong answers.",
  opener:"Do you feel safe at home and at school?",
  direct:"Do you ever feel so sad that you want to hurt yourself, or not be alive?"
 }
};

// ---------- BODY LEVELS (adults and teens) ----------
const LEVELS = [
 { id:"gentle", name:"Gentle", desc:"Starting slow, recovering, caring around the clock, or moving with limits. Includes seated and in-bed options." },
 { id:"moderate", name:"Moderate", desc:"You move some already and want steady, realistic growth. Walking, jogging, and simple strength work." },
 { id:"athletic", name:"Athletic", desc:"You train regularly and want a real 12-week build. Strength, running, and a long run each week." }
];
const LEVEL_MOVE = {
 gentle:{
  planting:{t:"Ten minutes of gentle movement",b:"A slow walk, or seated stretches if walking isn't possible today. Roll your shoulders, lift your arms overhead, circle your ankles, march in place from a chair. <strong>Moving at all is the win.</strong>"},
  rooting:{t:"Fifteen to twenty minutes",b:"Walk a little longer, or add standing work: sit to stand from a sturdy chair, wall push ups, heel raises holding the counter. Two rounds of ten. In bed? Squeeze and release each muscle group from feet to shoulders."},
  blooming:{t:"Twenty to thirty minutes",b:"A walk outside with a few stretches at the end, or a longer chair routine. Add one thing you enjoy. Dancing in the kitchen counts."}},
 moderate:{
  planting:{t:"Twenty to thirty minutes, most days",b:"A brisk walk or easy jog, plus a simple strength round three days a week: squats, push ups (wall or knees are fine), glute bridges, a short plank. Two rounds of ten. <strong>Warm up first, every time.</strong>"},
  rooting:{t:"Thirty to forty minutes",b:"Walk or jog intervals, and three rounds of strength three days a week. Add one longer walk on the weekend."},
  blooming:{t:"Forty minutes, four to five days",b:"Build one longer session each week, add light weights if you have them, and keep one full rest day. Notice what your body can do now that it couldn't in Week 1."}},
 athletic:{
  planting:{t:"Five training days",b:"Upper body and lower body strength days, two easy runs, and a weekend long run of 25 to 35 minutes. Moderate weight, 3 sets of 10 to 12. <strong>Dynamic warm up before every session.</strong>"},
  rooting:{t:"Supersets and longer runs",b:"Strength moves to supersets, four rounds. Runs build to 35 to 40 minutes, the long run to 40 to 50. Add a core circuit after one run each week."},
  blooming:{t:"Heavier circuits, peak long run",b:"Heavier compound circuits, one interval run a week, and a long run that peaks at 55 to 65 minutes. Keep one full rest day. No more than 10 percent more each week."}}
};
const BODY_REST = "No training today. A slow walk or a gentle stretch is plenty. Rest is part of how bodies grow.";
const BODY_REST_KID = "Rest day. A slow walk or a big stretch is plenty.";

// ---------- PRACTICES: 12 per strand ----------
// Four per season, in order: Planting (1 to 4), Rooting (5 to 8), Blooming (9 to 12).
// [name, what to do, busy day version, kid name, kid what to do, kid busy day]
// Names that match Oak's library count in both tools.
// "LV" means the Body level text is used for adults and teens.
const PRACTICES = {
 body:[
  ["Movement","LV","Five minutes counts. Walk while you're on the phone, take the stairs, or do ten sit to stands before you sit down.",
   "Move and Play","Run, jump, dance, or ride your bike for twenty minutes. Playing hard counts!","Do twenty jumping jacks."],
  ["Morning Daylight","Step outside within an hour of waking, even for five minutes. Morning light helps set your body clock for better sleep.","Open the blinds and stand in the light for one minute.",
   "Morning Sunshine","Go outside or stand by a sunny window in the morning. Say good morning to the sky.","Look out the window at the sky."],
  ["Stretch Break","Twice a day, stand and stretch for two minutes: reach up, fold forward, roll your shoulders and neck.","One long reach to the ceiling and three slow breaths.",
   "Stretch Like a Tree","Stand tall, reach your branches up high, then sway in the wind. Do it three times.","Reach up high one time."],
  ["Body Check","Three times today, pause and ask: what does my body need right now? Water, food, rest, movement? Then give it one thing.","One pause: what does my body need? Give it that.",
   "Body Check","Ask your body: am I tired, hungry, thirsty, or wiggly? Then take care of it.","Ask your body what it needs."],
  ["Movement","LV","Five minutes counts. A walk around the block or ten squats while the coffee brews.",
   "Move and Play","Play a game that keeps you moving: tag, soccer, hopscotch, or a bike ride.","Hop on one foot ten times."],
  ["Two Hours Outdoors","Aim for two hours outside across the week: walks, yard work, a park bench. Break it up however you like.","Eat lunch or take a call outside.",
   "Outside Adventure","Spend time outside every day this week. Look for bugs, clouds, and birds.","Go outside for five minutes."],
  ["Strength Training","Two or three days this week, do a short strength round: squats, push ups (the wall is fine), bridges, and a plank. Strong muscles protect joints and mood.","Ten sit to stands from a chair.",
   "Strong Like an Animal","Do bear crawls, frog jumps, and crab walks across the room.","Do five frog jumps."],
  ["Move Every Hour","When you've been sitting an hour, stand up and move for two minutes. Set a gentle timer if it helps.","Stand up every time you finish a task.",
   "Wiggle Breaks","After screen time or homework, get up and wiggle, hop, or dance for one song.","Wiggle for ten seconds."],
  ["Movement","LV","Five minutes counts. Put on one song and move until it ends.",
   "Move and Play","Try a new way to move: jump rope, a hula hoop, or an obstacle course you build.","Race someone to the door."],
  ["Yoga","Try a gentle yoga or stretching session, fifteen to twenty minutes, two times this week. Free videos are fine. Go at the pace your body allows.","Child's pose for one minute, breathing slowly.",
   "Animal Yoga","Try cat, cow, dog, and cobra poses. Make the animal sounds too.","Do one animal pose."],
  ["Move With Someone","Invite someone to move with you: a walk, a bike ride, a game of catch. Movement shared is easier to keep.","Walk to a neighbor's door and back with someone.",
   "Family Move","Play a game that makes everyone move: tag, catch, or a dance party.","Dance to one song with someone."],
  ["Thank Your Body","Write down three things your body did for you this week. Thank it, the way you'd thank a friend.","Thank your body for one thing before bed.",
   "Thank You, Body","Tell your body thank you for something it did today, like running or hugging.","Say thank you to your legs or arms."]
 ],
 rest:[
  ["Sleep","Pick a bedtime and treat it like an appointment. Dim the lights and wind down before it. Wake at the same time every day, even weekends.","Tonight, go to bed fifteen minutes earlier.",
   "Bedtime on Time","Go to bed at the same time every night. Pick your pajamas and a book.","Get in bed on time tonight."],
  ["Screen-Free Evening","Screens off thirty to sixty minutes before bed. Charge your phone outside the bedroom.","Put your phone across the room at bedtime.",
   "Screens Sleep First","Turn off screens before bath and books. Tuck the tablet in its own bed to charge.","Turn off screens before bedtime."],
  ["Micro-Rest","Three times today, stop for two minutes. Close your eyes, drop your shoulders, and let the breath slow.","One two minute pause with your eyes closed.",
   "Turtle Time","Pull into your shell like a turtle. Close your eyes and rest for two minutes.","Be a quiet turtle for ten breaths."],
  ["Same Wake Time","Get up at the same time every day this week, even the weekend. It steadies sleep more than almost anything else.","Keep your alarm the same tomorrow.",
   "Rise and Shine","Wake up at the same time each morning and open the curtains.","Open the curtains when you wake up."],
  ["Wind Down","A warm shower, a paper book, a slow stretch. Keep the room dark and cool. Do it the same way each night so your body learns the signal.","A warm shower and the lights low.",
   "Cozy Wind Down","Bath, pajamas, teeth, book, snuggle. Do it the same way every night.","Read one short book in bed."],
  ["Sleep Body Scan","In bed, move your attention slowly from your toes to your head, letting each part grow heavy.","Let your feet, hands, and jaw go heavy.",
   "Melting Snowman","In bed, let your body melt like a snowman in the sun, from your toes to your head.","Melt your arms and legs into the bed."],
  ["Worry Window","Before evening, spend ten minutes writing what's on your mind and one next step for each. Then close the notebook for the night.","Write tomorrow's top three on a sticky note.",
   "Worry Jar","Tell a grown-up one worry, then put it in a pretend jar for the night. It can wait until morning.","Tell a grown-up one worry."],
  ["Take a Real Break","Once a day, step away from work, screens, and caregiving for fifteen minutes. Not errands. Rest.","Five minutes with something warm to drink and no phone.",
   "Quiet Corner","Make a cozy corner with a pillow and blanket. Rest there when you need a break.","Sit in your cozy spot for a few minutes."],
  ["Sabbath Hour","One hour a week with nothing to produce and nothing to fix. Put it on the calendar so it happens.","Fifteen minutes of doing nothing, on purpose.",
   "Snuggle and Read","Have one slow hour this week with no rushing: cuddle up and read together.","Read one page with someone."],
  ["Slow Morning","Not collapse. Rest. One slow morning or unhurried afternoon this week where nothing is required of you.","Let one thing wait until tomorrow.",
   "Pajama Morning","Stay in pajamas a little longer one morning this week and take it slow.","Take three slow breaths before you get up."],
  ["Rest Outside","Sit or lie outside for twenty minutes: a porch, a park, a blanket in the grass. Let the day slow down around you.","Five minutes by an open window.",
   "Cloud Watching","Lie on the grass and find shapes in the clouds.","Find one cloud shape."],
  ["Guard Your Rest","Say no to one thing this week so you can rest. Protecting rest is a way of protecting everything else.","Leave one small thing for tomorrow.",
   "I Need a Rest","When you feel tired, say, \"I need a rest.\" That's a strong thing to say.","Tell someone when you feel tired."]
 ],
 nourish:[
  ["One Slow Meal","Eat one meal a day sitting down, at a table, without a screen. That's the whole practice.","Sit down for the five minutes it takes to eat.",
   "Sit Down to Eat","Eat at the table, not in front of a screen. Chew slowly and taste your food.","Sit down for your snack."],
  ["Water First","Drink a glass of water when you wake up and before each meal.","Carry a water bottle today.",
   "Water Buddy","Fill your own water bottle and drink from it all day.","Drink a cup of water now."],
  ["Mealtime Blessing","Pause before eating to give thanks for the food and the hands behind it. Any words, or silence.","One breath and a quiet thank you before you eat.",
   "Thank You for Food","Before you eat, say thanks for the food and the people who made it.","Say thank you before you eat."],
  ["Regular Meals","Eat something within a couple hours of waking, then about every four to five hours. Steady fuel, steady mood.","Pack one snack so you don't run on empty.",
   "Breakfast Power","Eat breakfast every morning. It's fuel for learning and playing.","Eat something before school."],
  ["Build a Real Plate","Protein, vegetables, a healthy fat. Notice which meals leave you steady and which leave you crashing.","Add one vegetable to whatever you're eating.",
   "Rainbow Plate","Try to eat three colors at dinner from real food: red, green, orange, purple, any colors!","Eat one color from a fruit or veggie."],
  ["Cook One Meal","Cook one meal from scratch this week. Simple counts: eggs and toast, soup, a pan of roasted vegetables.","Make one simple thing yourself.",
   "Little Chef","Help a grown-up cook one meal. Wash, stir, or set the table.","Help set the table."],
  ["Notice How Food Feels","After meals this week, notice how you feel an hour later. Just notice. No rules.","Ask once today: how did that meal leave me feeling?",
   "Tummy Check","After you eat, ask your tummy: still hungry, full, or just right?","Ask your tummy how it feels."],
  ["Keep Real Food Close","Put fruit, nuts, or cut vegetables where you'll see them first.","Grab something whole: fruit, nuts, eggs, or yogurt.",
   "Snack Detective","Find a snack that grew somewhere: an apple, carrots, or grapes.","Pick a fruit for your snack."],
  ["Shared Meal","Share a meal with someone this week. Put phones away and linger at the table.","Eat one snack with someone.",
   "Family Table","Eat one meal with your family this week. Everyone shares a good part of their day.","Tell someone your favorite food."],
  ["A Dish That Means Something","Make or eat a dish that carries a memory, maybe one someone used to make for you. Tell its story.","Ask someone about a food they grew up with.",
   "Family Recipe","Ask a grown-up about a food from when they were little. Help make it.","Ask a grown-up about their favorite food."],
  ["Grow or Gather","Grow herbs on a windowsill, visit a farmers market, or pick something fresh. Get close to where food comes from.","Buy one fresh thing you've never tried.",
   "Plant a Seed","Plant a seed in a cup of dirt. Water it and watch it grow.","Water a plant."],
  ["Feed Someone","Once this week, cook or bring food to someone who could use it. Feeding people is one of the oldest ways to love them.","Share a snack with someone.",
   "Share a Snack","Share a snack with a friend or someone in your family.","Offer someone a bite of your snack."]
 ],
 mind:[
  ["Meditation","Sit, close your eyes, and follow your breath for ten minutes. When your mind wanders, and it will, come back. <strong>That returning is the practice.</strong>","One minute of breathing, eyes closed.",
   "Balloon Breathing","Breathe in slowly and fill your belly like a balloon. Breathe out slowly and let it go. Do it five times.","Three balloon breaths."],
  ["Name It","When a strong feeling shows up, name it quietly: \"This is worry.\" \"This is anger.\" Naming a feeling helps settle it.","Name one feeling out loud today.",
   "Feelings Weather","What's your feeling weather today? Sunny, cloudy, stormy, or rainy? Tell someone.","Say your feeling weather."],
  ["Slow Exhale","When stress climbs, breathe in for four and out for six, ten times. A long exhale tells your body it's safe.","Breathe in for four, out for six. Five times.",
   "Blow Out the Candles","Hold up five fingers like birthday candles. Blow each one out slowly.","Blow out three pretend candles."],
  ["Self-Compassion Break","When you're hard on yourself, put a hand on your heart and say: \"This is hard. Others feel this too. May I be kind to myself.\"","Hand on heart, one kind sentence to yourself.",
   "Kind Words for Me","When you make a mistake, say, \"It's okay. I'm still learning.\"","Say one kind thing to yourself."],
  ["Body Scan","Fifteen minutes. First half breath awareness, second half a slow scan from your feet to your head. Notice tension without trying to fix it.","Scan from head to toe in one slow minute.",
   "Body Flashlight","Shine a pretend flashlight from your toes to your head. What does each part feel?","Shine your flashlight on your hands."],
  ["Worry Window","Give worry a set time: fifteen minutes in the afternoon to write it down. When it shows up at other times, tell it to wait for its window.","Write the worry down and close the notebook.",
   "Worry Monster","Draw your worry as a silly monster. Then tell a grown-up about it.","Tell a grown-up one worry."],
  ["Leaves on a Stream","Picture a stream with leaves floating by. Place each thought on a leaf and watch it drift away. Five minutes.","Let one thought float away on a leaf.",
   "Thought Bubbles","Pretend each thought is a bubble. Watch it float up and pop.","Pop three thought bubbles."],
  ["Walking Meditation","When your mind is too loud to sit, walk slowly for ten minutes with your attention on each footfall. No destination.","Ten slow steps, feeling each one.",
   "Quiet Feet Walk","Walk super slow and feel each foot touch the ground.","Take five quiet steps."],
  ["Breathwork and Stillness","Four rounds of 4-7-8 breathing (in for 4, hold for 7, out for 8), then fifteen minutes of sitting.","One round of 4-7-8 breathing.",
   "Still Like a Pond","Sit very still like a calm pond for two minutes. Notice what you hear.","Be still for ten breaths."],
  ["Mindfulness","Do one ordinary thing fully: wash the dishes, drink your coffee, fold the laundry. Just that, nothing else.","Take one sip slowly and really taste it.",
   "Five Senses","Find 5 things you see, 4 you hear, 3 you can touch, 2 you smell, and 1 you taste.","Find three things you can see."],
  ["Kind Voice Letter","Write yourself a short letter in the voice of someone who loves you. What would they say about the week you've had?","Write one kind line to yourself.",
   "Note From a Friend","Draw a picture or write a note to yourself, like your best friend would.","Draw a smiley face for yourself."],
  ["Sound and Silence","Strike a bowl or chime, or play one long note, and listen until it fades. Then sit in the silence for two minutes.","Listen to one song with your eyes closed.",
   "Listen Until It's Gone","Ring a bell or tap a glass. Listen until the sound disappears.","Listen for the quietest sound you can hear."]
 ],
 connect:[
  ["One Reach-Out a Day","A text, a call, a note. Keep it simple: \"Thinking of you today.\" Small reaches keep the vine growing.","Send one message to someone you love.",
   "Hello Heart","Draw a picture or say something nice to one person each day.","Give someone a high five."],
  ["Active Listening","In one conversation today, listen without planning your reply. Ask one follow-up question.","Ask someone, \"How are you, really?\" and wait.",
   "Listening Ears","When someone talks, look at them and listen all the way to the end.","Listen to one whole story."],
  ["Phone-Free Time","Spend twenty minutes with someone with phones out of sight.","Put your phone face down during one conversation.",
   "Screen-Free Play","Play a game with someone with no screens at all.","Play one quick game with someone."],
  ["Ask for Help","Ask someone for help with one thing this week, even something small. Letting people in is part of connection.","Say yes to one offer of help.",
   "Ask for Help","When something is hard, ask a grown-up or friend, \"Can you help me?\"","Ask for help with one thing."],
  ["Real Time Together","Once this week, spend unhurried time with someone, in person or on a call. Put the phone away. Ask one question you actually want the answer to.","Ten minutes of real attention for someone.",
   "Special Time","Spend fifteen minutes with a grown-up doing something you choose.","Show a grown-up something you made."],
  ["Gratitude Letter","Write a letter to someone who made a difference in your life. Read it to them if you can.","Text someone one line about why you're grateful for them.",
   "Thank You Card","Make a thank you card for someone who helps you.","Say thank you to someone who helps you."],
  ["Loving-Kindness","Sit quietly and wish others well: \"May you be safe. May you be well. May you be at peace.\" Start with someone you love, then widen the circle.","Wish one person well, silently.",
   "Kind Wishes","Think of someone and wish them a happy day in your heart.","Send one kind wish."],
  ["Show Up","Go to one group this week: a club, a class, a service, a game night. Belonging grows by showing up.","Say hello to a neighbor.",
   "Make a New Friend","Say hi to someone new and ask them to play.","Smile at someone new."],
  ["Give and Receive","Do one thing for someone without being asked. Then let someone do something for you. Receiving is part of connection too.","Hold the door, carry a bag, or say yes to help.",
   "Helper Day","Do something helpful without being asked. Then let someone help you too.","Help with one small chore."],
  ["Repair a Rupture","If there's a strained relationship you want to mend, take one small step: a note, an apology, a first hello. Only where it's safe.","Write down one relationship you'd like to tend.",
   "Make Up","If you had a fight, say sorry or tell them how you feel.","Say sorry for one thing."],
  ["Friends","Plan something with a friend: a walk, a meal, a game. Put a date on it.","Text a friend to plan a time.",
   "Playdate","Plan a time to play with a friend.","Tell a grown-up who you want to play with."],
  ["Tell Them","Tell someone what they mean to you, in person if you can.","Send a short \"I'm glad you're in my life.\"",
   "I Love You Because","Tell someone in your family one reason you love them.","Give someone a hug, if they want one."]
 ],
 spirit:[
  ["Gratitude and Intention","Each morning, name three specific things you're thankful for and one intention for the day. Not a goal. A way you want to be. In your own words, from your own tradition, or in quiet.","Before you start the car or open the door: one breath, one thank you.",
   "Three Thank Yous","Every morning, name three things you're thankful for.","Name one thing you're thankful for."],
  ["Breath Prayer","Choose a short phrase, like \"Here I am\" or \"Peace, be still,\" and pray or repeat it on the in-breath and the out-breath.","Three breaths with your phrase.",
   "Breathing Words","Breathe in and think, \"I am.\" Breathe out and think, \"loved.\" Do it five times.","Two breaths with your words."],
  ["Sit Spot","Return to the same outdoor spot a few times this week and simply notice what changes.","Look out one window for a full minute.",
   "Secret Sit Spot","Pick a special spot outside. Sit there quietly and notice what you see and hear.","Look out the window and listen."],
  ["Prayer","Pray, or speak what's on your heart to whatever is sacred to you, in your own words. Five minutes.","One sentence of prayer or hope.",
   "Heart Talk","Talk quietly about what's in your heart, in prayer or in your own words.","Say one hope out loud."],
  ["Quiet With No Agenda","Ten minutes of silence, prayer, or contemplation. No request, no performance. Just presence with whatever is sacred to you.","One minute of silence.",
   "Quiet Minute","Sit quietly for one minute and listen to the quiet.","Listen to the quiet for five breaths."],
  ["Examen","At day's end, look back: where did I feel most alive, and where most drained? Give thanks, and let the rest go.","Name one best moment and one hard moment from today.",
   "Best and Hardest","At bedtime, share your best part and your hardest part of the day.","Tell someone your best part of today."],
  ["Awe Walk","A slow walk looking for something vast, beautiful, or surprising. Let yourself be amazed.","Look up at the sky for one minute.",
   "Wonder Walk","Go on a walk and look for the most amazing thing you can find.","Find one amazing thing outside."],
  ["Lament","Tell the sacred honestly what hurts, even your anger. Write it or speak it. That is prayer too.","Name one thing that hurts, out loud or on paper.",
   "Sad Is Okay","Tell someone something that makes you sad. Sad feelings are okay to share.","Tell someone how you feel."],
  ["Hold Someone in Light","Each day, bring one person to mind: someone you love, someone struggling, someone you'll never meet. Hold them there for a moment.","Think of one person and wish them peace.",
   "Sending Love","Think of someone who needs help and send them love from your heart.","Send love to one person."],
  ["Ritual","Join your community of faith or practice this week, or make a small ritual of your own: light a candle, walk a path, read something sacred.","Light a candle for one minute of quiet.",
   "Special Tradition","Share a family tradition, prayer, or song that feels special to you.","Sing or say something special to you."],
  ["Forgiveness Reflection","Write about a hurt you're ready to begin releasing. Forgiveness is a process, and it can start small.","Name one thing you're ready to set down.",
   "Letting Go","Is there something someone did that still bugs you? Draw it, then fold the paper and put it away.","Fold up one bad feeling and put it away."],
  ["Wise Company","Talk with a spiritual director, chaplain, pastor, or wise friend about where you sense the sacred in your life.","Read one page from something sacred or wise.",
   "Big Questions","Ask a grown-up a big question you wonder about, like \"Why are we here?\"","Ask one big question."]
 ],
 create:[
  ["Journal Often","Ten minutes of writing. No editing. No audience. Start with a moment, not a theme: a hand, a word someone said, the light in a room.","Write one sentence about today that you don't want to forget.",
   "Draw Your Day","Draw one picture of something that happened today.","Draw one small thing."],
  ["Values Sort","Pick the five values that matter most to you right now, like honesty, family, faith, courage, or play.","Write down one value you want to live today.",
   "What I Love","Draw or list five things you love most.","Name one thing you love."],
  ["Create Stuff","Make something with your hands: sketch, cook, knit, build, play music. Twenty minutes, no audience.","Doodle for two minutes.",
   "Make Something","Build, color, or craft something just for fun.","Color for five minutes."],
  ["Playing","Do something just for fun this week, with no goal: a puzzle, an instrument, a game.","Five minutes of something playful.",
   "Pretend Play","Make up a story or a pretend game and act it out.","Make up a silly story."],
  ["Expressive Writing","Twenty minutes, most days. Write what you witnessed, what it cost you, what surprised you. The point is to process, not to perform.","Write three lines about how you're really doing.",
   "Feelings Art","Draw how you feel with colors and shapes. There's no wrong way.","Pick a color for how you feel."],
  ["Purpose Statement","Write one or two sentences about what you're living for right now. Keep it where you'll see it.","Finish this: \"Today I want to be someone who...\"",
   "I Am Someone Who","Finish this sentence: \"I am someone who...\" Draw a picture to go with it.","Say one thing you're good at."],
  ["Keep Learning","Spend twenty minutes learning something you're curious about: a book, a video, a skill.","Look up one thing you've wondered about.",
   "Curious Question","Pick something you wonder about and find out one new fact.","Ask one why question."],
  ["Use Your Gifts","Offer something you're good at to someone who needs it: fix, teach, cook, listen.","Help one person with something you know how to do.",
   "Teach Someone","Teach someone how to do something you're good at.","Show someone a trick you know."],
  ["Make Something to Keep","Finish one thing: a letter, a page, a song, a small project. Give it to someone if you want to. What you made is proof of what grew.","Add one piece to something you're making.",
   "Finish a Project","Finish something you started and show it to someone.","Work on your project for five minutes."],
  ["Write Your Story","Write about a turning point in your life, what happened, and who you became because of it.","Write one sentence about a moment that shaped you.",
   "My Story Book","Make a little book about you: where you live, who you love, and what you like.","Draw one page about you."],
  ["Legacy Letter","Write to the people you love about what you hope they carry forward.","Write one line you want someone to remember.",
   "Time Capsule","Draw or write something for future you to open next year.","Draw what you like right now."],
  ["Stand-For Card","Write what you stand for on a small card and keep it with you.","Read your card, or write one word you stand for.",
   "Superpower Card","Make a card that names your superpower, like kindness or bravery. Keep it in your pocket.","Say your superpower out loud."]
 ],
 hope:[
  ["Three Good Things","Before bed, write three good things from today and why they happened.","Name one good thing from today.",
   "Three Good Things","At bedtime, tell someone three good things from today.","Tell someone one good thing."],
  ["Something to Look Forward To","Put one small thing on the calendar you can look forward to this week.","Name one thing you're looking forward to.",
   "Countdown","Pick something fun coming up and make a countdown.","Name one fun thing coming up."],
  ["Capture the Moment","Write down one moment from today that gave you even a small lift, and why it landed.","Snap a photo of one good moment.",
   "Happy Snapshot","When something makes you smile, take a pretend picture in your mind. Tell someone about it.","Take one pretend happy picture."],
  ["Joy List","Start a list of small things that bring you joy. Add to it every day.","Add one thing to your joy list.",
   "Joy Jar","Write or draw happy things on little papers and put them in a jar.","Add one happy thing to your jar."],
  ["Tiny Next Step","Pick one thing you'd like to be different. Name the smallest possible next step, and take it.","Do the tiniest step, even two minutes.",
   "Tiny Step","Pick something you want to get better at. Practice it for five minutes.","Practice for one minute."],
  ["Hope Map","Write a goal in the middle of a page. Around it, list paths toward it and what might block each one. Hope grows with a plan.","Write one path toward something you want.",
   "Dream Map","Draw something you hope for, and three steps to get there.","Draw one thing you hope for."],
  ["Savoring Walk","Take a ten minute walk and look for good things: a smell, a color, a sound. Linger on each one.","Pause for thirty seconds and enjoy something good.",
   "Treasure Hunt Walk","Go on a walk and find three beautiful things.","Find one beautiful thing."],
  ["Pay It Forward","Do something generous for someone who can't pay you back.","Leave a kind note for someone.",
   "Secret Kindness","Do something kind in secret, like leaving a nice note.","Do one kind thing."],
  ["Best Possible Self","Write about your life a year from now, if things go as well as they reasonably could. What does it look like?","Picture one good thing about next year.",
   "When I'm Bigger","Draw yourself doing something you love when you're bigger.","Say one thing you want to do someday."],
  ["Volunteer","Give an hour to something bigger than you: a food shelf, a neighbor, a cause you care about.","Give one small thing to someone who needs it.",
   "Helping Hands","Help at home, at school, or in your neighborhood with a grown-up.","Help with one thing at home."],
  ["Inspire Hope","Tell someone going through a hard time that you believe in them, and why.","Send one encouraging message.",
   "Cheer Someone On","Tell someone, \"You can do it!\" when things are hard for them.","Cheer for someone."],
  ["Growth Reflection","Look back over these weeks. What grew? What surprised you? What are you carrying forward?","Name one way you've grown.",
   "Look How I Grew","Tell a grown-up one way you've grown this season.","Say one thing you can do now."]
 ]
};
const SEASON_ORDER = ['planting','rooting','blooming'];

// ---------- DAILY ANCHORS, SEASONS, AND THE TWELVE WEEKS ----------
// Moved here from index.html in session 11 so the Grove Guide in the Grounded
// Field Guide reads the same words. Each week: theme, intro, reflection
// question, and a story from Grounded.
const GROVE_STORY = slug => "https://chri5j0y.substack.com/p/" + slug;
const ANCHORS = {
 morning:{t:"Arrive",b:"Before coffee, before your phone, sit for one minute. Just arrive in your body and the day. This one habit changes everything after it.",s:"Before anything else, one full breath where you are."},
 evening:{t:"Close the day",b:"Three specific graces from today. One thing you won't carry into sleep. One word for tomorrow. See the Guide for the full evening examen.",s:"One thing you're grateful for. One thing you're setting down."}
};

// =====================================================================
// TWELVE WEEKS + STORIES
// =====================================================================
const SEASONS = {
 planting:{name:"Planting", weeks:"Weeks 1 to 4", line:"Breaking ground. Small practices, every day, nothing forced."},
 rooting:{name:"Rooting", weeks:"Weeks 5 to 8", line:"Going deeper. The roots grow where no one can see them."},
 blooming:{name:"Blooming", weeks:"Weeks 9 to 12", line:"Full flower. What you've tended starts to show."}
};
const WEEKS = [
 {theme:"Start where you are", intro:"Nothing has to be ready. Not you, not your schedule, not your kitchen. This week you plant, and planting is small. Tend your tree once a day and let that be enough.", q:"What made you want to start, and what are you hoping grows?",
  story:{title:"Grounded in Coffee", url:GROVE_STORY("grounded-in-coffee"), line:"Sometimes the mess itself becomes part of the medicine."}},
 {theme:"Rest and limits", intro:"You can't pour from a dry well, and you already know it. This week, notice where your day leaks. Protect one small boundary like it matters, because it does.", q:"Where did you say yes this week when you needed to say no?",
  story:{title:"My Boundaries Have Gates", url:GROVE_STORY("my-boundaries-have-gates"), line:"It's okay to care deeply. The harder part is caring for yourself just as deeply afterward."}},
 {theme:"The body knows", intro:"Your body keeps its own record. It knows you're tired before you admit it. This week, listen to it the way you'd listen to a friend.", q:"What did your body tell you this week?",
  story:{title:"Drift Away", url:GROVE_STORY("drift-away"), line:"Some people don't say goodbye. They sing it."}},
 {theme:"When you miss a day", intro:"Somewhere around now, most people miss a day. Then two. That isn't the end of the practice. Coming back is the practice.", q:"What helped you come back when you drifted?",
  story:{title:"The Recovery", url:GROVE_STORY("the-recovery"), line:"Not the mistake. The recovery."}},
 {theme:"What you carry", intro:"Rooting is quiet work. Above ground, it can look like nothing is happening. Below, everything is. This week, notice what you've been carrying and haven't named.", q:"What are you carrying that you haven't said out loud?",
  story:{title:"Grief Debt", url:GROVE_STORY("grief-debt"), line:"Turns out my heart was keeping better count than my head was."}},
 {theme:"Don't wait on people", intro:"The call you keep meaning to make. The visit you keep putting off. This week, make it.", q:"Who did you reach toward this week, and how did it feel?",
  story:{title:"If She Is Still Here", url:GROVE_STORY("if-she-is-still-here"), line:"I almost said tomorrow. She didn't have a tomorrow."}},
 {theme:"Spirit, any way you come", intro:"You don't need a church or the right words. You need a little quiet and a willingness to notice what's bigger than you.", q:"Where did you feel something bigger than yourself this week?",
  story:{title:"The Atypical Atheist", url:GROVE_STORY("the-atypical-atheist"), line:"I believe in God, or something. I just cannot stand the church crap."}},
 {theme:"Practices that hold", intro:"Eight weeks in, some of this is becoming yours. The practices you keep on tired days are your roots. They hold when other things give way.", q:"Which practice has started to hold you?",
  story:{title:"Prayer.", url:GROVE_STORY("thank-god-for-sending-you"), line:"The prayer stayed whole long after everything else had come apart."}},
 {theme:"You get a say", intro:"Blooming begins with a choice. You don't control everything, but you get a say in how your life goes. Use it this week.", q:"What do you want more of in the life you're growing?",
  story:{title:"Birth Plan", url:GROVE_STORY("birth-plan"), line:"You don't just have to get ready to die. No one can, really. But you get a say in how it goes."}},
 {theme:"Love between us", intro:"Everything in a grove grows toward something. This week, grow toward the people you love.", q:"Where did you give or receive love this week?",
  story:{title:"Love.", url:GROVE_STORY("love"), line:"Love between us, right here, right now, is God loving us through each other."}},
 {theme:"Hope that shows up", intro:"Hope isn't a feeling you wait for. Sometimes it's something you do, and the feeling catches up with you.", q:"What gives you hope right now?",
  story:{title:"He Was Praying Too", url:GROVE_STORY("he-was-praying-too"), line:"When you were praying for me, I was praying too."}},
 {theme:"Holding on and letting go", intro:"Look at what grew. Some of it you'll keep. Some of it was only for this season. Both are good.", q:"What grew in these twelve weeks, and what are you ready to let go?",
  story:{title:"Enlightenment", url:GROVE_STORY("enlightenment"), line:"I have spent my whole life learning how to hold on well. Perhaps I only have one more thing left to learn."}}
];

// ---------- KID WEEK QUESTIONS ----------
const KID_WEEK = [
 {theme:"Start where you are", q:"What do you want to grow on your tree?"},
 {theme:"Rest and slowing down", q:"When do you feel tired? What helps you rest?"},
 {theme:"Listening to your body", q:"What did your body do this week that made you proud?"},
 {theme:"Trying again", q:"When did you try again after something didn't work?"},
 {theme:"Big feelings", q:"What is a big feeling you had this week?"},
 {theme:"Reaching out", q:"Who made you smile this week?"},
 {theme:"Wonder", q:"What amazing thing did you notice this week?"},
 {theme:"Things that help", q:"Which practice is your favorite so far?"},
 {theme:"You get a say", q:"What do you want more of?"},
 {theme:"Love", q:"Who do you love, and how did you show it?"},
 {theme:"Hope", q:"What are you hoping for?"},
 {theme:"Look how you grew", q:"How did you grow this season?"}
];

// ---------- VISITORS ----------
// Critters arrive as days are tended in The Grove, for every age.
const CRITTERS = [
 { id:"ladybug",   name:"Ladybug",   days:1,  line:"Your first day tended." },
 { id:"butterfly", name:"Butterfly", days:7,  line:"A week of tending." },
 { id:"bird",      name:"Bluebird",  days:14, line:"Two weeks of tending." },
 { id:"butterfly2",name:"Butterfly", days:21, line:"Three weeks of tending." },
 { id:"bunny",     name:"Bunny",     days:35, line:"Five weeks of tending." },
 { id:"butterfly3",name:"Butterfly", days:50, line:"Fifty days of tending." }
];

// ---------- UNLOCKS ----------
// Days tended unlock tree kinds and scenery. The kind you choose shows on
// your tree in The Grove and in Aspen.
const TREE_KINDS = [
 { id:"grove", name:"Grove tree", days:0 },
 { id:"birch", name:"Birch", days:15 },
 { id:"maple", name:"Maple", days:35 },
 { id:"pine",  name:"Pine",  days:60 }
];
const SCENERY = [
 { id:"forest", name:"Forest", days:0 },
 { id:"lake",   name:"Lake",   days:10 },
 { id:"autumn", name:"Autumn", days:25 },
 { id:"winter", name:"Winter", days:45 },
 { id:"dusk",   name:"Dusk",   days:70 }
];

// ---------- CHECK-IN TOOLS ----------
// Where each age checks on their tree. The Grove nudges at the end of each
// season and after twelve weeks. Pine is coming soon, so high schoolers
// keep The Grove's short weekly check-in until then.
const CHECKIN = {
 maple:   { tool:"Maple",    href:"/maple/",    season:"/maple/",            full:"/maple/" },
 aspen:  { tool:"Aspen",   href:"/aspen/",   season:"/aspen/",           full:"/aspen/" },
 pine:{ tool:"The Grove", href:null,          season:null,                  full:null },
 adult:    { tool:"Oak", href:"/oak/", season:"/oak/#quick",   full:"/oak/#checkin" }
};
