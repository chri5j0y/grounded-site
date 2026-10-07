/* =====================================================================
   SEQUOIA CHECKIN . the question bank
   Read by Sequoia (/sequoia/) and Sequoia Guide in the Field Guide,
   so both always ask the same thing. Edit questions here, not in index.html.

   Sequoia is the tree for older adults: built for 60 and up, and anyone
   55 or older may choose it. It follows the Grounded tree standard,
   version 1, the same as Oak:
   - Six parts in one order: Roots (What grounds you), Trunk (Purpose),
     Bark (Mind and feelings), Branches (Relationships), Leaves (Body),
     Fruit (Hope). Code names match the tree part: roots, trunk, bark,
     branches, leaves, fruit.
   - Eight questions per part, the same count as Oak.
   - Every question has a tip for the guide and a short "why" line a
     person can tap to read.
   - Four answers plus "Not sure." Scores run 1 to 10 for every tool.
   - Two reverse worded questions in every part.
   - Levels: Strong (8 to 10), Steady (5 to 7), Growing Edge (1 to 4).
   - A safety step fitted to later life, always with 988 and 911.
   - Flagged answers (alone, losing hope, not safe at home) are never
     lost: the person sees help lines, and a guide sees them at goodbye.

   Leaves holds three strands, Move, Rest, and Nourish. One Leaves question
   for each is tagged s: 'move', 'rest', or 'nourish'. The weekly quick
   check-in asks question 1 of every part plus each tagged strand.

   Each question: { t, tip, why } plus r: 1 for reverse questions
   ("Often" is the hard answer), flag: 'alone', 'hope', or 'home', and
   src: ['id'] where the "why" line rests on a study or measure.
   Question 1 of every part is the quick check-in question, so it is never
   a reverse question.

   Questions are written for later life, and they work for a person living
   with a chronic condition, using a cane, walker, or wheelchair, or living
   with hearing or vision changes. Body questions ask about what the body
   allows, never about being healthy.

   Roots asks about experience, never belief or affiliation. It measures
   whether the sacred is a resource or a stressor. Anyone of
   all faith traditions and everything in-between can score Strong.

   home is a positive question ("felt safe..."), so it flags on Rarely,
   Sometimes, or Not sure. It covers being hurt, neglected, or having
   money taken by someone close.

   helper: a set for a helper (an adult child, a spouse or partner, a
   friend, a neighbor) answering about themselves as they help the
   person. Their answers grow their own tree. A helper who answers the
   main set about the person records it with answeredBy (Willow model).

   Questions are written fresh. The FACIT-Sp, the Brief RCOPE, the Ryff
   purpose scale, the GDS, PHQ-2, GAD-2, the three-item loneliness scale,
   STEADI, the Herth Hope Index, and the Satisfaction With Life Scale are
   foundations only. None of their items are copied.

   Sources used (ids from the build's sources.json, for gg-sources.js):
     Roots:    rcope, krause, tornstam
     Trunk:    boyle, retire, anderson, mcadams, erikson
     Bark:     phq2, gds, unutzer, gad2, wolitzky, scd, park
     Branches: carstensen, nasem, murthy, masi, yon, ic3
     Leaves:   niasleep, pag, seated, dga, steadi, nidcd, green, mob, cdcfalls
     Fruit:    herth, killen, savoring, phq2
     Helper:   aarpcg
     Safety:   asq, conwell, cdcsuicide55
   ===================================================================== */
(function(){
const VERSION = 1;

const ANSWERS = [
  ['rarely', 'Rarely', 0],
  ['sometimes', 'Sometimes', 1],
  ['often', 'Often', 2],
  ['always', 'Almost always', 3],
  ['unsure', 'Not sure', null]
];

const LEVELS = [
  ['strong', 'Strong', 8],
  ['steady', 'Steady', 5],
  ['edge', 'Growing Edge', 1]
];

const STEMS = {
  standard: 'In the past two weeks, how often have you...',
  helper: 'In the past two weeks, as you help {name}, how often have you...',
  observed: 'In the past two weeks, from what you have seen, how often has {name}...'
};

// Who answered the main set (Willow model). Used when a helper sits with
// the person or answers from what they see, for example with memory loss.
const ANSWERED_BY = [
  ['self', 'They answered'],
  ['tapped', 'They answered, I tapped'],
  ['observed', 'I\'m answering from what I see']
];

const Q = {
  roots: [
    { t: 'Felt connected to something larger than yourself, like God, the Holy, nature, or love?',
      tip: 'Let them name it in their own words. Use their word for the sacred, not yours.',
      why: 'Feeling part of something larger is one of the strongest roots a person can have.' },
    { t: 'Kept a spiritual practice, of any kind, that still feeds you, even if it looks different than it used to?',
      tip: 'Prayer, music, quiet, worship by phone or TV, a walk, or sitting by a window all count. Ask what has changed, and what would help them keep it.',
      why: 'Practices are how roots get water. They can change shape as life changes and still feed you.' },
    { t: 'Found comfort or strength in your faith or spirit during a hard moment?',
      tip: 'If yes, ask what helped. If no, listen for whether faith has gone quiet or become a weight.',
      why: 'This shows whether the sacred is a resource for you right now, or a weight.',
      src: ['rcope'] },
    { t: 'Felt welcome to bring your honest questions and doubts?',
      tip: 'Doubt is not a problem to fix. Say that questions are welcome here, at any age.',
      why: 'For older adults, questions that are explored, not pushed down, are linked with better health.',
      src: ['krause'] },
    { t: 'Felt a deep inner peace, even for a moment?',
      tip: 'Ask where they were and what was happening. Help them find their way back there.',
      why: 'Moments of peace show where your spirit rests. They are worth finding again.' },
    { t: 'Found quiet time alone restful, a time to reflect rather than a time to feel lonely?',
      tip: 'Many people find solitude grows richer with age. If quiet time feels lonely, listen, and come back to it in Branches.',
      why: 'Some people find later life brings a wider view and more ease with quiet. That ease can feed the spirit.',
      src: ['tornstam'] },
    { t: 'Felt far from God or the sacred, or felt let down by it?', r: 1,
      tip: 'Listen. Do not defend God or correct them. Spiritual struggle is real, and it weighs more during illness, so name it without fixing.',
      why: 'Feeling far from the sacred can weigh on everything else. Naming it is a first step.',
      src: ['rcope'] },
    { t: 'Felt hurt by a faith community, a religious leader, or people of faith?', r: 1,
      tip: 'Take the wound seriously and do not explain it away. Old hurts can surface again late in life. If a person or group is still causing harm, help them get safe.',
      why: 'Religious hurt is common and painful. It matters here, whatever you hold now.',
      src: ['rcope'] }
  ],
  trunk: [
    { t: 'Felt that your life matters?',
      tip: 'If they hesitate, ask who would notice if they were gone. Listen for hopelessness and move to safety if it is there.',
      why: 'Knowing your life matters is the core of the trunk.' },
    { t: 'Had a reason to get up in the morning?',
      tip: 'Ask them to name it. A person, a pet, a garden, a call, a cause, or simply today all count.',
      why: 'In older adults, a strong sense of purpose is linked with living longer.',
      src: ['boyle'] },
    { t: 'Had a role where you are needed, paid or unpaid?',
      tip: 'Grandparent, neighbor, friend, volunteer, mentor, member of a congregation or club, the one who keeps the family stories. Unpaid roles count fully.',
      why: 'Roles give days their shape. After retirement or a loss, finding new ones helps.',
      src: ['retire'] },
    { t: 'Shared what you know, or something you love, with someone younger?',
      tip: 'Teaching a recipe, telling a story, showing a skill, or cheering someone on all count. Ask who they would like to pass something to.',
      why: 'Passing something good to the people who come after you is one of the deepest sources of meaning.',
      src: ['mcadams'] },
    { t: 'Felt at peace with the life you have lived, hard chapters included?',
      tip: 'Invite a little life review if there is time. The Legacy Book can hold what they want to keep.',
      why: 'Making peace with your one life, as it has been, is a quiet strength of later life.',
      src: ['erikson'] },
    { t: 'Lived by what you value most?',
      tip: 'Ask what they value most, then where life lines up with it today and where it does not.',
      why: 'Living by your values brings a steadiness nothing else can.' },
    { t: 'Felt you had no place or use anymore?', r: 1,
      tip: 'Do not hurry to hand them a purpose. Ask what they used to do that mattered, and what part of it could still fit now. Volunteering often helps.',
      why: 'Losing a role can feel like losing your place. Volunteering and new roles are linked with better well-being in later life.',
      src: ['retire', 'anderson'] },
    { t: 'Felt like a burden to the people around you?', r: 1,
      tip: 'Do not argue it away. Ask what being helped is like for them. Feeling like a burden can travel with hopelessness, so listen closely and move to the safety step if you hear it.',
      why: 'Many older adults feel this at times. You matter to people, even when it is hard to see.' }
  ],
  bark: [
    { t: 'Enjoyed the things you usually enjoy?',
      tip: 'Ask what they used to enjoy and whether it still feels good. Losing interest can mean low mood, even without sadness.',
      why: 'In later life, losing interest in what you love is often an early sign that mood needs tending.',
      src: ['phq2', 'gds'] },
    { t: 'Felt calm and settled inside?',
      tip: 'Ask when they feel most settled, and what helps them get back there.',
      why: 'A settled mind gives the rest of your tree room to grow.' },
    { t: 'Been kind to yourself when you struggled, or when your body or memory let you down?',
      tip: 'Ask how they would talk to a friend in the same spot. Then how they talk to themselves.',
      why: 'Self-kindness helps you bounce back. It is a skill, and it can grow at any age.' },
    { t: 'Been able to name a hard feeling and let it pass?',
      tip: 'Help them name the feeling in a word or two. Naming it often takes some of its power.',
      why: 'Feelings you can name are feelings you can ride out.' },
    { t: 'Felt able to handle what the day brought?',
      tip: 'Ask what helps when a day gets hard. Name the strengths you hear.',
      why: 'Feeling up to your days, even barely, protects the rest of your tree.' },
    { t: 'Kept your mind busy with something you enjoy, like reading, puzzles, music, or learning something new?',
      tip: 'Large print, audiobooks, and music all count. Ask what they have always wanted to learn.',
      why: 'Older adults who took up a new, demanding skill for a few months showed better memory.',
      src: ['park'] },
    { t: 'Felt low, down, or empty?', r: 1,
      tip: 'Low mood is not a normal part of aging, and it responds well to help. Encourage a talk with their doctor. Listen for hopelessness.',
      why: 'Low mood is not just part of getting older. In later life it responds well to help.',
      src: ['gds', 'unutzer'] },
    { t: 'Been caught in worry you couldn\'t set down, about health, money, memory, or family?', r: 1,
      tip: 'Ask what they worry about most. If it is memory: many people notice changes, and a doctor can sort out what is normal. Never diagnose.',
      why: 'Worry is common in later life. Many people worry about memory and never mention it to a doctor, and a talk can bring relief.',
      src: ['gad2', 'wolitzky', 'scd'] }
  ],
  branches: [
    { t: 'Had at least one person you can be fully yourself with?',
      tip: 'Ask who it is. If no one comes to mind, gently note that, and come back to it in the growth plan.',
      why: 'Many people choose a smaller, closer circle with age. One close person can carry you through a great deal.',
      src: ['carstensen'] },
    { t: 'Talked with someone who really listened?',
      tip: 'In person, by phone, or by video all count. If hearing makes talking hard, ask about captions or hearing help.',
      why: 'Being truly heard is one of the simplest ways to feel less alone.' },
    { t: 'Felt part of a group or community, like a faith community, a club, neighbors, or a group online?',
      tip: 'Belonging can be a congregation, a senior center, a card group, a class, or a group online. Ask what they miss and what they might try.',
      why: 'For older adults, being cut off from others is linked with poorer health. Belonging protects.',
      src: ['nasem'] },
    { t: 'Asked for help when you needed it?',
      tip: 'Many older adults were raised not to ask. If they are caring for a spouse or partner, ask who helps them.',
      why: 'Asking for help is a strength. It lets other people in.' },
    { t: 'Stayed in touch with people who matter to you, in person, by phone, or online?',
      tip: 'Ask what gets in the way: hearing, driving, distance, or energy. One small, regular call can help.',
      why: 'Staying in touch keeps your branches strong as life changes around you.' },
    { t: 'Felt safe and treated well by the people who live with you or help you, including with your money?', flag: 'home',
      tip: 'If not, ask privately and calmly whether they are safe right now, and whether anyone is taking money, hurting, or neglecting them. Have MAARC ready (1-844-880-1574), and follow your reporting duties for vulnerable adults.',
      why: 'Everyone deserves to feel safe at home and with their money. If you don\'t, help is available.',
      src: ['yon'] },
    { t: 'Felt lonely, or cut off from others?', r: 1, flag: 'alone',
      tip: 'Loneliness is common and painful. Ask when it is worst, and who they wish they could talk to. Expecting to be turned away can keep people apart, so listen for that too.',
      why: 'Loneliness hurts body and spirit. What helps most is often working on lonely thoughts, along with adding contact.',
      src: ['murthy', 'masi'] },
    { t: 'Felt pressured or confused about money by a caller, a message, or someone you know?', r: 1,
      tip: 'No shame: scams fool smart people. Point to the National Elder Fraud Hotline (1-833-372-8311) or the AARP Fraud Watch Helpline (877-908-3360). If the pressure comes from someone close, treat it as safety at home.',
      why: 'Older adults are often targeted by scams. Talking it over with someone you trust helps.',
      src: ['ic3'] }
  ],
  leaves: [
    { t: 'Gotten enough restful sleep?', s: 'rest',
      tip: 'Ask what gets in the way of sleep. Pain, worry, grief, and trips to the bathroom often do. Ask them to review sleep medicines with their doctor.',
      why: 'Older adults need about as much sleep as younger adults. Sleep is the soil everything else grows in.',
      src: ['niasleep'] },
    { t: 'Moved your body in whatever way it allows, sitting, standing, or walking?', s: 'move',
      tip: 'Seated, in-bed, and wheelchair movement all count. Fit it to what their body can do today, and suggest a talk with their doctor before something new.',
      why: 'Any movement helps, by each person\'s own ability. Seated exercise counts too.',
      src: ['pag', 'seated'] },
    { t: 'Had an appetite and eaten regular meals, with enough to drink?', s: 'nourish',
      tip: 'Ask who they eat with and how cooking is going. Weight loss without trying, or no appetite, is worth telling a doctor.',
      why: 'Your body still needs protein, fluids, and steady meals to stay strong.',
      src: ['dga'] },
    { t: 'Felt steady and secure as you get around, with whatever help you use?',
      tip: 'A cane, walker, wheelchair, or grab bar is help, not failure. If they feel unsteady, suggest telling their doctor.',
      why: 'Feeling steady lets you keep doing what you love. Feeling unsteady is worth telling a doctor.',
      src: ['steadi'] },
    { t: 'Been able to hear and see well enough to join in?',
      tip: 'Hearing aids, glasses, captions, and large print all count. Suggest a hearing or eye check if it has been a while.',
      why: 'Hearing changes are common with age, and help is available. Joining in keeps you connected.',
      src: ['nidcd'] },
    { t: 'Spent time outdoors, or by a window in daylight?',
      tip: 'A porch, a window seat, or a few minutes in the sun counts. Mind heat and ice.',
      why: 'Time with green space is linked with better mood in older adults.',
      src: ['green'] },
    { t: 'Held back from things you want to do because of a fear of falling?', r: 1,
      tip: 'Fear of falling is common and can be eased. If they have fallen, suggest telling their doctor and asking about balance programs like A Matter of Balance.',
      why: 'Falls are common in later life, and fear can shrink your world. Both can be eased.',
      src: ['cdcfalls', 'mob'] },
    { t: 'Had pain that kept you from what matters to you?', r: 1,
      tip: 'Honor the pain. Ask what they miss because of it, and whether their doctor knows. Mixing alcohol with medicines can make pain and falls worse.',
      why: 'Pain can crowd out the things you love. Naming it is the first step to easing it.' }
  ],
  fruit: [
    { t: 'Looked forward to something, even something small?',
      tip: 'A visit, a meal, a show, a season, or a call all count. Hope often changes shape with age. It does not disappear.',
      why: 'Hope that holds through illness and age often lives in small things ahead.',
      src: ['herth'] },
    { t: 'Felt grateful for something and let yourself enjoy it?',
      tip: 'Ask for one good thing from this week. Let them linger on it.',
      why: 'For adults 60 and up, a gratitude practice raised well-being, and savoring helped protect life satisfaction when health was poor.',
      src: ['killen', 'savoring'] },
    { t: 'Laughed or felt delight?',
      tip: 'Laughter belongs here, even in hard seasons. Ask what made them laugh lately.',
      why: 'Joy is fruit. Even small moments of it feed the whole tree.' },
    { t: 'Felt that your life has been good, all things considered?',
      tip: 'Let them tell it their way. Listen for both the good and the hard.',
      why: 'How you see your life as a whole shapes how you meet each day.' },
    { t: 'Felt at peace about what lies ahead?',
      tip: 'This may open a talk about dying or end-of-life wishes. Welcome it. The Conversation Project and Honoring Choices Minnesota can help them share their wishes.',
      why: 'Peace about what lies ahead lets you live today more fully.' },
    { t: 'Found a way forward when something got in the way?',
      tip: 'Ask about a time they found another way. Name that strength back to them.',
      why: 'Finding another way when blocked is the working heart of hope.' },
    { t: 'Felt that things will never get better?', r: 1, flag: 'hope',
      tip: 'Take this seriously. Ask gently how long they have felt this way, and listen for thoughts of not wanting to be alive. The safety step comes next.',
      why: 'When hope runs low, you deserve support. You don\'t have to carry it alone.' },
    { t: 'Felt like you had nothing to look forward to?', r: 1,
      tip: 'Help them find one small thing in the next few days, together.',
      why: 'Having nothing to look forward to drains hope. Small things count.',
      src: ['phq2'] }
  ]
};

// For a helper (an adult child, a spouse or partner, a friend, a neighbor),
// answering about themselves as they help the person. Asked with its own
// stem (STEMS.helper). Their answers grow their own tree.
const HELPER = {
  roots: [
    { t: 'Found strength in your faith, your spirit, or what grounds you?',
      tip: 'Use their word for the sacred. Ask what has helped most.',
      why: 'Helping someone you love draws on your roots. They need water too.' },
    { t: 'Had a moment that fed your spirit, like prayer, music, time outdoors, or quiet?',
      tip: 'Even a few minutes in the car counts. Ask where those moments happen.',
      why: 'Small pauses keep the spirit steady through a long season of helping.' },
    { t: 'Felt held by something larger than yourself as you help?',
      tip: 'Let them name it: God, love, family, community, or something else.',
      why: 'Feeling held makes the load easier to carry.' },
    { t: 'Brought your honest questions about what is happening, instead of pushing them down?',
      tip: 'Questions like "why is this happening" are welcome. Do not rush to answers.',
      why: 'Questions that get room are lighter to carry than questions held in.' },
    { t: 'Found meaning in the small acts of helping?',
      tip: 'Ask about one small moment that felt like it mattered.',
      why: 'Meaning in small acts keeps helping from feeling like only tasks.' },
    { t: 'Felt peace, even for a moment, about how things are?',
      tip: 'Ask where they were and what was happening.',
      why: 'Moments of peace show where your spirit rests.' },
    { t: 'Felt angry at God, or far from what you hold sacred?', r: 1,
      tip: 'Do not defend God. Anger and distance are common when someone you love is changing.',
      why: 'Spiritual struggle while helping is real. It deserves room, not hiding.' },
    { t: 'Felt spiritually worn thin or dry?', r: 1,
      tip: 'Dryness is common in long seasons of helping and is not a failure.',
      why: 'Dryness is a sign your roots need water, not that you are failing.' }
  ],
  trunk: [
    { t: 'Felt the help you give has meaning?',
      tip: 'Ask for a recent moment when it clearly mattered.',
      why: 'Knowing your help matters is the trunk of a helping season.' },
    { t: 'Kept a part of your life that is your own, apart from helping?',
      tip: 'Work, a hobby, friends, faith, or a walk all count. Ask what they have set aside.',
      why: 'Keeping something of your own lets you help for the long haul.' },
    { t: 'Helped in a way that fits your values?',
      tip: 'Ask what they value most, and where helping lines up with it.',
      why: 'Helping by your values brings steadiness, even on hard days.' },
    { t: 'Heard {name}\'s stories, or shared memories together?',
      tip: 'Offer the Legacy Book. One story is enough to start.',
      why: 'Stories shared now become a gift for both of you.' },
    { t: 'Seen {name} as the whole person they are, beyond what they need from you?',
      tip: 'Ask what {name} still gives, teaches, or enjoys.',
      why: 'Seeing the whole person protects their dignity and your bond.' },
    { t: 'Felt proud of how you have shown up?',
      tip: 'Name what you hear them do well. Helpers rarely hear it.',
      why: 'Pride in how you show up is a sign the trunk is strong.' },
    { t: 'Felt guilty, like you\'re not doing enough or doing it wrong?', r: 1,
      tip: 'Guilt often means they love the person. Ask what "enough" would look like, and whether it is possible for one person.',
      why: 'Guilt is common in helpers. It often means you care deeply, not that you are failing.' },
    { t: 'Felt your own plans and purpose have been set aside too long?', r: 1,
      tip: 'Listen without judging. Ask what one small piece of their own life they could take back.',
      why: 'Long seasons of helping can crowd out your own purpose. Noticing it helps.' }
  ],
  bark: [
    { t: 'Felt able to handle what helping asks of you?',
      tip: 'Ask what has been heaviest lately.',
      why: 'Feeling able to carry the load protects the rest of your tree.' },
    { t: 'Let yourself feel what you feel, including grief for how things used to be?',
      tip: 'Grief while the person is still here is real. Give it room.',
      why: 'Grief that gets room moves. Grief that does not, piles up.' },
    { t: 'Been kind to yourself after a hard day or a mistake?',
      tip: 'Ask what they told themselves. Helpers are often hardest on themselves.',
      why: 'Self-kindness keeps you going instead of wearing you down.' },
    { t: 'Taken a breath before reacting when things got tense?',
      tip: 'Offer a two-breath pause they can use anywhere.',
      why: 'One pause can change how a hard moment goes.' },
    { t: 'Felt clear-headed enough to make the decisions in front of you?',
      tip: 'If not, ask about sleep and workload first. Ask who could share the decisions.',
      why: 'Clear decisions need rest and support.' },
    { t: 'Made peace with what you can\'t change or fix?',
      tip: 'Help them sort what they can change from what they can only accompany.',
      why: 'Letting go of what you can\'t fix frees energy for what you can.' },
    { t: 'Felt overwhelmed, numb, or unable to settle?', r: 1,
      tip: 'This can be caregiver strain. Normalize it, and point to respite and support groups through the Eldercare Locator or Minnesota Aging Pathways.',
      why: 'Strain is common in helpers. It is a sign you need support, not a failure.' },
    { t: 'Lain awake worried about {name}\'s health, safety, or money?', r: 1,
      tip: 'Ask what the biggest worry is. Some have a next step: a doctor, a plan, or a call.',
      why: 'Worry that keeps you up is worth naming. Some of it has a next step.' }
  ],
  branches: [
    { t: 'Had someone to lean on?',
      tip: 'Ask who. If no one, gently note that, and help them find one person.',
      why: 'One person to lean on can carry you through a great deal.' },
    { t: 'Shared the work of helping with family, friends, or services?',
      tip: 'Ask what could be handed to someone else, even one task a week.',
      why: 'Many family helpers carry most of the load. Sharing it makes it last.',
      src: ['aarpcg'] },
    { t: 'Talked honestly with {name} about what they want?',
      tip: 'Ask what {name} wants for their days, their home, and their care. Their voice comes first.',
      why: 'Knowing what they want makes hard choices clearer for both of you.' },
    { t: 'Kept in touch with friends of your own?',
      tip: 'Ask who they have not seen in a while. One call counts.',
      why: 'Your own branches hold you up while you hold someone else.' },
    { t: 'Respected {name}\'s right to make their own choices, as far as they safely can?',
      tip: 'Dignity and safety can pull against each other. Help them name where the line is.',
      why: 'Choice protects dignity, even when help is needed.' },
    { t: 'Asked for help from aging services, a doctor, or a faith community when you needed it?',
      tip: 'The Eldercare Locator (1-800-677-1116) and Minnesota Aging Pathways (1-800-333-2433) can point to help nearby.',
      why: 'Help exists for helpers. Asking is a strength.' },
    { t: 'Felt alone in this, or at odds with family?', r: 1, flag: 'alone',
      tip: 'Ask who they wish they could talk to. Family conflict over a parent\'s needs is common.',
      why: 'You shouldn\'t carry this alone. Company in it makes it lighter.' },
    { t: 'Felt short-tempered or harsh with {name} in a way that worried you?', r: 1,
      tip: 'Thank them for being honest. This is a sign of strain and a reason for more support now: respite, a support group, or a counselor. If anyone is being hurt, help them get safe.',
      why: 'Strain can show up as a short temper. Noticing it early protects you both.' }
  ],
  leaves: [
    { t: 'Gotten enough sleep to keep going?', s: 'rest',
      tip: 'Ask what wakes them: worry, calls, or nights helping.',
      why: 'Sleep is how your body recovers from helping.' },
    { t: 'Moved your body, even a short walk or a stretch?', s: 'move',
      tip: 'Anything counts. Ask what fits into their day.',
      why: 'Movement helps your body let go of stress.' },
    { t: 'Eaten real meals, not just whatever was handy?', s: 'nourish',
      tip: 'Ask what a usual day of eating looks like.',
      why: 'Real meals give steady energy for hard days.' },
    { t: 'Taken a break without guilt?',
      tip: 'Ask what keeps them from breaks. Many helpers skip them out of guilt.',
      why: 'Breaks keep you able to help for the long haul.' },
    { t: 'Kept up with your own doctor visits and medicines?',
      tip: 'Helpers often put their own health last. Ask what they have put off.',
      why: 'Your health matters too. It is part of how you keep helping.' },
    { t: 'Had time outdoors, or something else that restores you?',
      tip: 'Ask what restored them before this season began.',
      why: 'Restoring time keeps your tree green.' },
    { t: 'Felt worn out in a way rest doesn\'t fix?', r: 1,
      tip: 'Ask how long it has been this way. Point to their doctor if it is new or growing, and to respite.',
      why: 'Deep tiredness is a sign the load is too heavy for one person.' },
    { t: 'Leaned on alcohol, food, or screens to get through?', r: 1,
      tip: 'Ask without judgment. Offer the SAMHSA line (1-800-662-4357) or their doctor if use is growing.',
      why: 'Numbing out helps for a night, then adds its own weight.' }
  ],
  fruit: [
    { t: 'Felt hopeful about something, even something small?',
      tip: 'Ask what they are hoping for now, for {name} and for themselves.',
      why: 'Hope changes shape in hard seasons. It doesn\'t have to disappear.' },
    { t: 'Shared a good moment or a laugh with {name}?',
      tip: 'Ask about the last one. Help them plan one more.',
      why: 'Good moments together are fruit, even in a hard season.' },
    { t: 'Pictured a way through the season ahead?',
      tip: 'Ask for one small next step, not a whole plan.',
      why: 'Seeing a way through pulls you toward it.' },
    { t: 'Felt grateful for something in this time?',
      tip: 'Ask for one good thing from this week.',
      why: 'Gratitude helps you notice what is still working.' },
    { t: 'Looked forward to something for yourself?',
      tip: 'Help them name one small thing in the next few days that is just for them.',
      why: 'Something of your own to look forward to keeps hope alive.' },
    { t: 'Felt you can keep going at this pace, with the help you have?',
      tip: 'Listen without pushing. If not, ask what help would change it.',
      why: 'A pace you can keep is a sign the load fits.' },
    { t: 'Felt hopeless, or like you can\'t go on?', r: 1, flag: 'hope',
      tip: 'Take this seriously. Ask gently whether they have thoughts of not wanting to go on themselves. The helper safety question comes next.',
      why: 'When hope runs low, you deserve support. You don\'t have to carry it alone.' },
    { t: 'Felt trapped by what helping asks of you?', r: 1,
      tip: 'Listen without judging. Feeling trapped is a burnout sign and a reason to bring in more help.',
      why: 'Feeling trapped is a sign you need more support, not a sign you love less.' }
  ]
};

// What a flagged answer means, and which answers flag it.
// alone and hope flag on Often or Almost always; Almost always also opens the calm card.
// home flags on Rarely, Sometimes, or Not sure; Rarely also opens the calm card.
// helperNote is shown when the flag comes from the helper set.
const FLAGS = {
  alone: { on: ['often', 'always'], calm: ['always'], title: 'Feeling alone',
    note: 'You said you have felt lonely often. That is worth tending. Reaching out to one person this week can help. Minnesota Aging Pathways (1-800-333-2433) or the Eldercare Locator (1-800-677-1116) can point you to visits, calls, and groups near you. If it feels heavy, call or text 988.',
    helperNote: 'You said you have felt alone in this. You shouldn\'t carry it alone. Who could you call today? The Eldercare Locator (1-800-677-1116) can point you to support for helpers.',
    guide: 'They named loneliness or isolation. Talk together about one person they could reach toward, and consider a referral to a senior center, a faith community, a friendly visitor program, or grief support.' },
  hope: { on: ['often', 'always'], calm: ['always'], title: 'Losing hope',
    note: 'You said things have felt like they will never get better. You don\'t have to carry that alone. Call or text 988 any time to talk with someone. Veterans, call 988 and press 1.',
    helperNote: 'You said you have felt hopeless. This is one of the hardest things a person does. Call or text 988 any time to talk with someone.',
    guide: 'They named low hope. Make sure the safety step was asked. Share 988, and follow your protocol if they speak of not wanting to be alive. Older men are at the highest risk.' },
  home: { on: ['rarely', 'sometimes', 'unsure'], calm: ['rarely'], title: 'Safety at home',
    note: 'You said you haven\'t always felt safe or treated well by the people around you. You deserve to be safe, at home and with your money. In Minnesota, the Minnesota Adult Abuse Reporting Center takes calls any time: 1-844-880-1574. Outside Minnesota, the Eldercare Locator (1-800-677-1116) can connect you to Adult Protective Services. If someone is taking your money, the National Elder Fraud Hotline is 1-833-372-8311. In danger now, call 911.',
    guide: 'They named not feeling safe or treated well at home, which can include someone taking their money. Ask privately whether they are safe right now. Share MAARC (1-844-880-1574) or Adult Protective Services, and follow your reporting duties for vulnerable adults.' }
};

// The safety step, fitted to later life. Direct wording is the research-informed
// way to ask; vague questions miss people, and asking does not plant the idea.
// The opener is answered on the answer scale; the direct question uses directOpts.
// The app reads opener and direct, as Oak does. The rest fills Sequoia's calm card.
const SAFETY = {
  lead: 'Two last questions. They\'re here because we care, and your answers stay on this device.',
  opener: 'Some seasons bring a lot of loss. In the past two weeks, how often have you felt hopeless, or like a burden to the people around you?',
  directLead: 'Sometimes, when life has brought a lot of loss, people think about not wanting to be here anymore. Many older adults have had that thought. It is safe to say so here.',
  direct: 'In the past two weeks, have you wished you could go to sleep and not wake up, or thought about ending your life?',
  directOpts: [['no', 'No'], ['sometimes', 'Sometimes'], ['often', 'Often'], ['skip', 'I\'d rather not say']],
  yes: 'Thank you for telling me. You matter, and you don\'t have to carry this alone. Please reach out now. Someone will listen.',
  means: 'If there are guns or a large supply of medicine at home, ask someone you trust to keep them for now.',
  burden: 'You matter to people, even when it is hard to see. Many older adults feel like a burden at times. Talking it over can help.',
  title: 'You matter, and you don\'t have to carry this alone.',
  intro: 'If you\'re thinking about suicide, feel unsafe, or someone is hurting you or taking your money, reach out now. Someone will listen.',
  // Crisis and help lines in the order shown. tel and sms are dialable;
  // first: 'home' moves a line to the top when the home flag shows.
  lines: [
    { id: '988', name: '988 Suicide and Crisis Lifeline', show: 'Call or text 988', tel: '988', sms: '988', note: 'Any time, day or night.' },
    { id: 'veterans', name: 'Veterans Crisis Line', show: 'Call 988, then press 1', tel: '988', note: 'Or text 838255. For veterans and the people who love them.' },
    { id: '911', name: 'In immediate danger?', show: 'Call 911', tel: '911' },
    { id: 'maarc', name: 'Minnesota Adult Abuse Reporting Center (MAARC)', show: '1-844-880-1574', tel: '18448801574', first: 'home', note: 'Any time. For a vulnerable adult being hurt, neglected, or exploited in Minnesota.' },
    { id: 'fraud', name: 'National Elder Fraud Hotline', show: '1-833-372-8311', tel: '18333728311', first: 'home', note: 'For people 60 and up who have lost money to a scam or to someone they know. Weekdays, 10 to 6 Eastern.' },
    { id: 'eldercare', name: 'Eldercare Locator', show: '1-800-677-1116', tel: '18006771116', sms: '18006771116', note: 'Help near you anywhere in the US, including Adult Protective Services.' },
    { id: 'aging', name: 'Minnesota Aging Pathways', show: '1-800-333-2433', tel: '18003332433', note: 'Formerly the Senior LinkAge Line. Weekdays, 8 to 4:30.' }
  ],
  // The helper's own safety question (Willow model).
  helper: { ask: 'Helping someone you love through a hard season is one of the hardest things a person does. In the past two weeks, have you had thoughts of not wanting to go on yourself?',
    yes: 'Thank you for telling me. Please reach out now: call or text 988, or call 911 if you are in danger. Veterans, call 988 and press 1.',
    no: 'Thank you. Here\'s one small thing to do for yourself today.' },
  // When a helper answers from what they see (answeredBy 'observed').
  observed: { ask: 'Has {name} said things like wishing they could go to sleep and not wake up, or wanting it all to be over?',
    help: 'Thank you for noticing. Please talk with {name} gently and directly, and let their doctor know. If you are worried about their safety now, call or text 988, or call 911.' },
  src: ['asq', 'conwell', 'cdcsuicide55']
};

window.SEQUOIA_CHECKIN = { version: VERSION, answers: ANSWERS, levels: LEVELS, stems: STEMS, answeredBy: ANSWERED_BY, questions: Q, helper: HELPER, flags: FLAGS, safety: SAFETY };
})();
/* LIFE notes start: Health and Ability notes (GWG BLD 756, HA 1). Like My Season, a note adds only
   ex (an example) and tip, read for the chosen ids. The question, the answers, and the score never change,
   and no safety or flagged question carries a note. Generated by worker A. */
(function () { var C = window.SEQUOIA_CHECKIN; if (!C || !C.questions) return; var N = {"leaves": {"0": {"pain": {"ex": "If pain or treatment breaks up your nights, count rest that leaves you a little restored."}, "serious": {"ex": "If pain or treatment breaks up your nights, count rest that leaves you a little restored."}, "mind": {"ex": "Mood and some medicines can change sleep. Notice what helps you rest."}}, "1": {"moving": {"ex": "Any way your body moves counts: chair exercises, stretching in bed, rolling, or a walk with your walker."}, "pain": {"ex": "On a hard day, a gentle stretch or a few minutes of movement counts.", "tip": "Ask what movement looks like on good days and on hard days."}, "serious": {"ex": "During treatment or recovery, gentle moves in a chair or bed count fully."}}, "2": {"serious": {"ex": "Small meals, favorite foods, and sips of water through the day count."}, "health": {"ex": "Eating in a way that fits your condition and your doctor's advice counts."}}, "3": {"moving": {"ex": "A cane, a walker, a wheelchair, or a helper's arm all count as getting around."}}, "4": {"hearing": {"ex": "Hearing aids, captions, sign, or a pocket talker all count as ways to join in."}, "seeing": {"ex": "Magnifiers, large print, audio, or a helper reading aloud all count as ways to join in."}}, "5": {"moving": {"ex": "Sitting by a bright window or on a porch counts."}}}, "bark": {"2": {"memory": {"ex": "Like being gentle with yourself when a word or a name will not come."}, "pain": {"ex": "Like being gentle with yourself on a hard body day."}}, "5": {"seeing": {"ex": "Audiobooks, radio, music, or talking books count."}, "memory": {"ex": "Familiar songs, simple puzzles, and old photos count."}}}, "branches": {"1": {"hearing": {"ex": "Talking in a quiet room, with captions, or by text counts."}}, "2": {"hearing": {"ex": "Like a hearing loss group, a captioned service, or friends who sign."}, "moving": {"ex": "Like a group online, or a place you can get into easily."}, "close": {"ex": "Like a group for people caring for someone they love."}}, "4": {"hearing": {"ex": "A captioned call, a video call, a letter, or a text all count."}, "seeing": {"ex": "A phone call or a voice message counts."}, "moving": {"ex": "A call, a letter, or a visit at home all count."}}}, "trunk": {"2": {"moving": {"ex": "Roles that have nothing to do with what your body can do count fully: listener, storyteller, the one who prays."}, "serious": {"ex": "Roles you can fill from a chair or a bed count fully."}}}, "fruit": {"0": {"serious": {"ex": "Like a visit, a favorite meal, or the end of a treatment."}, "pain": {"ex": "Like a call, a favorite show, or a good hour."}}}};
  Object.keys(N).forEach(function (p) { Object.keys(N[p]).forEach(function (i) { var q = (C.questions[p] || [])[+i]; if (q && !q.flag && !q.help) q.life = N[p][i]; }); }); })();
/* LIFE notes end */
