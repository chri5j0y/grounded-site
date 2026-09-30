GROUNDED FAMILY GARDENS (Garden part 2, session 3)
Upload every file in this ZIP to the main site repo (growwithgrounded.com), keeping the folders,
replacing what is there. Nothing is new; all six files replace existing ones.

CHANGED
  shared/gg-care.js      Check-in handoffs (real answers) now travel inside the person's own locked
                         profile, never in open browser storage. Check-offs stay in the small open
                         record (practice names and dates only). Adds GGCare.days(who).
                         Any handoffs left in open storage move into the profile the first time it
                         opens, then are erased from open storage.
  garden/index.html      Family tab, family safety alerts, teen shared progress, "Refresh my beds"
                         when a new check-in arrives, and ?who=<profile id> to open a child's garden.
  soul-tree/index.html   "Send to my garden" on results, for the full checkup and the quick check-in.
  sprout/index.html      "Send to my garden" on results. Check-offs count toward days tended.
  sapling/index.html     "Send to my garden" on results. Check-offs count toward days tended.
  privacy.html           Two sentences: handoffs stay locked, and what grown-ups see for teens.
                         PRIVACY_V was not changed, so no one is asked to agree again.

HOW IT WORKS
  Family tab (Garden, "For myself")
    Shows only for an adult profile that agreed for at least one other profile on this device.
    One row per person: picture, name, age group, where they are in the twelve weeks,
    days tended, butterflies, and bed colors.
    Kids and middle schoolers: "Open (name)'s garden" or "Plant (name)'s garden". A strip at the
    top says whose garden you are in, with "Back to my garden". Changes save to the child's profile.
    High schoolers: shared progress only. Answers and journal stay private.

  Safety alerts
    When a child's or teen's planting quiz flags a safety answer, the grown-up sees a banner on
    Today and the full note on the Family tab, with a Calm card button.
    "I checked in" is saved in the grown-up's own locked profile and hides the alert until a newer
    flag appears. For kids and middle schoolers it also clears the banner inside the child's garden.

  Teen shared progress
    Every time a high schooler's garden saves, Garden writes: planted or not, beds, days tended,
    butterflies, week, the date of a safety flag, and the date of the save. Never answers, notes,
    or journal. Teens see a plain note about this on the first page of their planting quiz.

  Send to my garden
    A button on results in Soul Tree, Sprout, and Sapling. It asks for a profile if none is open.
    For a child opened by a grown-up, it reads "Send to (name)'s garden".
    Garden's planting quiz offers "Fill them in" (marked "From your check-in", all editable).
    If the garden is already planted, Today shows "A new check-in from (tool)" with
    "Refresh my beds": matching answers are filled in, the rest take a few minutes, beds are chosen
    again, and days, butterflies, and the journal stay as they are.
    "Not sure" answers, context-only questions, and safety questions are never sent.

  Days tended
    Counts Garden watering days plus any day with a check-off in Garden, Sprout, or Sapling.
    Butterflies still come from Garden days only.

DEVELOPER NOTES
  New vault keys: inbox { list: [...] } (handoffs), family { seen: { profileId: flagDate } }.
  Teen shared record: GGP.shared(id).garden = { planted, beds, days, butterflies, week (13 means
  complete), flag (date or null), updated }.
  Garden: gOwner is the profile whose garden is on screen; gHome is the unlocked profile.

TESTED (Chromium, local server)
  Created an adult, a middle schooler, a kid (picture code), and a teen.
  Sent from real results buttons in Soul Tree, Sprout, and Sapling. Nothing reached open storage.
  Opened a child's garden from the Family tab and from the ?who= link; the check-in prefilled.
  Teen safety flag showed for the grown-up on Today and Family; "I checked in" cleared it.
  Home, Garden, Soul Tree, Sprout, Sapling, Privacy, Tools, and Field Guide pages at 320px and
  1280px: no sideways scrolling. No script errors.

QUESTION MAPPING (check these; send any pairs you want changed)
  Format: the check-in question, then the Garden question it fills in.

SOUL TREE, FULL CHECKUP (26 of 54 questions). Rarely 2, Sometimes 3, Often 4, Almost always 5.

  Felt connected to something larger than yourself, like God, the Holy, nature, or love?
    -> Spirit: I felt connected to something bigger than myself.
  Had a spiritual practice, of any kind, that fed you?
    -> Spirit: I took time for prayer, quiet, or reflection.
  Found comfort or strength in your faith or spirit during a hard moment?
    -> Spirit: My faith, beliefs, or traditions gave me comfort.
  Felt a deep inner peace, even for a moment?
    -> Spirit: I felt at peace.
  Noticed awe or wonder in ordinary life?
    -> Spirit: Nature, beauty, or something sacred filled me with wonder.
  Felt that your life matters?
    -> Creativity and Purpose: My days felt like they mattered.
  Been kind to yourself when you struggled?
    -> Mind: I was kind to myself when I made a mistake.
  Remembered that others struggle too, and you're not alone in it?
    -> Mind: I could name what I was feeling.
  Been able to name a strong feeling and ride it out?
    -> Mind: Worry took up a lot of my day. (reversed)
  Gotten stuck replaying problems over and over?
    -> Mind: I had ways to settle myself when stress climbed.
  Felt able to meet the stress in front of you?
    -> Mind: I could focus on what was in front of me.
  Had at least one person you can be fully yourself with?
    -> Connection: I felt understood by someone.
  Felt lonely?
    -> Connection: I felt lonely. (reversed)
  Felt that you belong to a group or community?
    -> Connection: I felt like I belonged somewhere.
  Asked for help when you needed it?
    -> Connection: I let someone help me.
  Felt strain or conflict in an important relationship?
    -> Connection: Conflict with someone weighed on me. (reversed)
  Gotten enough restful sleep?
    -> Rest: I woke up feeling rested.
  Moved your body in ways you enjoy?
    -> Body: I moved my body on purpose, even a little.
  Eaten in ways that nourish you, without guilt or strict rules?
    -> Nourishment: How I ate left me feeling steady, not sluggish.
  Taken unhurried rest, with nothing to get done?
    -> Rest: I had real downtime, not just collapse time.
  Spent time outdoors or in nature?
    -> Body: I spent time outside in daylight.
  Listened to what your body was telling you?
    -> Body: I noticed what my body needed and gave it that.
  Been able to picture a good future?
    -> Hope: I felt like I had a future worth growing toward.
  Had energy to work toward what you hope for?
    -> Hope: I took a small step toward something I want.
  Expected good things to come?
    -> Hope: I believed things could get better.
  Noticed and savored things you're grateful for?
    -> Hope: I noticed good moments as they happened.

SOUL TREE, QUICK CHECK-IN (all 6).

  Felt connected to something larger than yourself?
    -> Spirit: I felt connected to something bigger than myself.
  Felt that your life matters?
    -> Creativity and Purpose: My days felt like they mattered.
  Been kind to yourself when you struggled?
    -> Mind: I was kind to myself when I made a mistake.
  Felt close to people who care about you?
    -> Connection: I spent real time with people I care about.
  Taken good care of your body?
    -> Body: I noticed what my body needed and gave it that.
  Held on to hope?
    -> Hope: I believed things could get better.

SPROUT (one question per part). Sun 5, cloud 3, rain 1. Skipped parts are not sent.

  Do you feel safe and loved? (Roots)
    -> Spirit: I felt peaceful inside.
  Do you like being you? (Trunk)
    -> Creativity and Purpose: I felt like I mattered.
  Can you calm down when you are upset? (Bark)
    -> Mind: When I got upset, I knew how to calm down.
  Do you have people who love you and play with you? (Branches)
    -> Connection: I played with friends or family.
  Does your body feel good? (Leaves)
    -> Body: My body felt good and strong.
  Are you excited for something? (Fruit)
    -> Hope: I was excited about something coming up.

SAPLING, GRADE 6 (18 of 24). Yeah most of the time 5, Sometimes 3, Not really 1.

  Is there a place where you feel calm and peaceful?
    -> Spirit: I felt at peace.
  Do you ever stop and notice something amazing, like the sky, a song, or an animal?
    -> Spirit: Something in nature or beauty made me stop and notice.
  When you're scared or worried, is there something that helps you feel held, like a prayer, a memory, or a person?
    -> Spirit: My faith, beliefs, or traditions helped me.
  Do you feel like you matter, just for being you?
    -> Creativity and Purpose: My days felt like they mattered.
  Is there something you really love doing?
    -> Creativity and Purpose: I knew what matters most to me.
  Do you get to help other people sometimes?
    -> Creativity and Purpose: I used something I'm good at to help someone.
  When you make a mistake, can you be kind to yourself?
    -> Mind: I was kind to myself when I messed up.
  When you feel upset, do you know something that helps you calm down?
    -> Mind: I had ways to calm down when I got stressed.
  Do you have at least one friend you can be yourself around?
    -> Connection: Someone really got me.
  When you have a rough day, is there someone you can tell?
    -> Connection: There was someone I could talk to when things were hard.
  Do you feel like you belong at your school?
    -> Connection: I felt like I belonged somewhere, like a team, group, or family.
  Do you usually get enough sleep to feel rested?
    -> Rest: I woke up feeling rested.
  Do you move your body in ways you enjoy, like playing, biking, or dancing?
    -> Body: Moving felt good, not like something I had to prove.
  When your body feels tired, tense, or off, do you notice it?
    -> Body: I noticed when my body needed something, like water, a stretch, or a break.
  Do you look forward to things?
    -> Hope: I had something to look forward to.
  When things go wrong, do you believe they can get better?
    -> Hope: I believed things could get better.
  Can you think of something good that happened this week?
    -> Hope: I noticed good moments when they happened.
  Do you have dreams for when you're older?
    -> Hope: I pictured a future I'm excited about.

SAPLING, GRADE 7 (14 of 24). Yeah most of the time 5, Sometimes 3, Not really 1.

  Do you have moments when you feel connected to something bigger than yourself?
    -> Spirit: I felt connected to something bigger than me.
  Is there something, like prayer, worship, time outside, or music, that helps you feel steady?
    -> Spirit: My faith, beliefs, or traditions helped me.
  Do you know what matters most to you?
    -> Creativity and Purpose: I knew what matters most to me.
  When your inner voice gets harsh, can you talk back to it kindly?
    -> Mind: I was kind to myself when I messed up.
  When your feelings get big, can you let them pass without doing something you regret?
    -> Mind: I had ways to calm down when I got stressed.
  Do you have friends who like you for who you really are?
    -> Connection: Someone really got me.
  Is there at least one grown-up you could tell if something was really wrong?
    -> Connection: There was someone I could talk to when things were hard.
  Do you usually get enough sleep to feel rested?
    -> Rest: I woke up feeling rested.
  Do you get to move and be active most days?
    -> Body: I moved my body on purpose, like walking, sports, or dancing.
  Can you feel okay in your body, even while it's changing?
    -> Body: I felt okay in my own body.
  Do you have something you're looking forward to?
    -> Hope: I had something to look forward to.
  When life feels hard, do you believe it can get better?
    -> Hope: I believed things could get better.
  Can you find something to be thankful for, even on a bad day?
    -> Spirit: I noticed things I was thankful for.
  Do you feel good about where your life is heading?
    -> Hope: I pictured a future I'm excited about.

SAPLING, GRADE 8 (14 of 24). Yeah most of the time 5, Sometimes 3, Not really 1.

  When life feels unfair, is there something you trust or hold on to?
    -> Spirit: My faith, beliefs, or traditions helped me.
  Do you have a practice that feels like yours, not just something you're told to do?
    -> Spirit: I took time for quiet, prayer, or reflection.
  Do you sense that your life is part of something holy?
    -> Spirit: I felt connected to something bigger than me.
  Do you have a sense of what you care about most in life?
    -> Creativity and Purpose: I knew what matters most to me.
  Do you have something that gives your life a sense of purpose?
    -> Creativity and Purpose: My days felt like they mattered.
  When you're stressed, do you have healthy ways to handle it?
    -> Mind: I had ways to calm down when I got stressed.
  When you fail at something, can you learn from it instead of giving up on yourself?
    -> Mind: I was kind to myself when I messed up.
  Is there a group where you feel needed, like a team, club, or faith community?
    -> Connection: I felt like I belonged somewhere, like a team, group, or family.
  Do you usually get enough sleep to feel rested?
    -> Rest: I woke up feeling rested.
  Do you take care of your body in ways that help you feel strong?
    -> Body: I noticed when my body needed something, like water, a stretch, or a break.
  Do you feel at home in your body most days?
    -> Body: I felt okay in my own body.
  When you think about high school, do you feel mostly hopeful?
    -> Hope: I had something to look forward to.
  When life feels heavy, do you believe things can get better?
    -> Hope: I believed things could get better.
  Do you feel like you have good things ahead of you?
    -> Hope: I pictured a future I'm excited about.