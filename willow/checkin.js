/* =====================================================================
   WILLOW CHECKIN . the question bank
   Read by Willow (/willow/) and Willow Guide in the Field Guide,
   so both always ask the same thing. Edit questions here, not in index.html.

   Willow follows the Grounded tree standard, fitted to the end of life:
   - Six parts: roots, trunk, bark, branches, leaves, fruit.
   - Three questions per part. Question 1 of each part is the quick check-in.
   - Two anchors backed by validation research: roots 1 (strength and comfort)
     and bark 1 (at peace). Helpers' anchor is bark 1 (prepared).
   - Four answers plus "Not sure." Scores run 1 to 10, the same as Oak, but
     the person only ever sees gentle words. Scores show in Willow Guide.
   - One reverse question per part (r: 1), where "Almost always" is hard.
   - Leaves holds three strands: comfort, rest, senses (s).
   - Every answer records who answered (by).
   - Questions are written fresh. FICA, HOPE, the PC-6, the struggles scale,
     Dignity Therapy, and the Serious Illness Conversation Guide are
     foundations only. None of their items are copied.
   ===================================================================== */
(function(){
const VERSION = 1;

const ANSWERS = [
  ['rarely', `Rarely`, 0],
  ['sometimes', `Sometimes`, 1],
  ['often', `Often`, 2],
  ['always', `Almost always`, 3],
  ['unsure', `Not sure`, null]
];

const LEVELS = [
  ['strong', `Strong`, 8],
  ['steady', `Steady`, 5],
  ['care', `Needs care`, 1]
];

// The words the person sees instead of a level.
const WORDS = {
  strong: `This part of your tree feels well tended right now.`,
  steady: `This part of your tree is holding. A little care could help.`,
  care: `This part of your tree could use some care. You don't have to do it alone.`
};

const STEMS = {
  standard: `Lately, how often have you...`,
  helper: `Lately, as you care for {name}, how often have you...`
};

const ANSWERED_BY = [
  ['self', `They answered`],
  ['tapped', `They answered, I tapped`],
  ['observed', `I'm answering from what I see`]
];

const Q = {
  roots: [
    { t: `Felt that your faith, your spirit, or what grounds you gave you the strength and comfort you need?`,
      why: `This is one of the best single questions for noticing when the spirit needs care.`,
      tip: `If rarely, ask gently: has it gone quiet, become a weight, or never been a source? Don't assume which.`,
      anchor: 1,
      none: `Felt that what grounds you (love, nature, your values) gave you the strength and comfort you need?` },
    { t: `Found comfort in a prayer, ritual, song, or practice that matters to you?`,
      why: `Practices are how roots drink. Small ones count.`,
      tip: `Ask what it is. Offer to help: read it, play it, call their clergy.` },
    { t: `Felt far from God or what you hold sacred, or afraid of what comes after?`, r: 1, flag: 'struggle',
      why: `Feeling far, or afraid, is common near the end. It can be eased.`,
      tip: `Listen for which kind: hurt by people, doubt, or feeling abandoned or punished. Don't defend God. Name it and stay.`,
      none: `Felt that nothing holds you up, or afraid of what comes after?` }
  ],
  trunk: [
    { t: `Felt that your life has mattered?`,
      why: `Knowing your life mattered is one of the strongest buffers against despair near the end.`,
      tip: `Ask for a story. Meaning hides in specifics.` },
    { t: `Had the chance to tell your stories, or pass on what you know?`,
      why: `Leaving something behind helps the one leaving and the ones staying.`,
      tip: `Offer Cuttings. One story is enough to start.` },
    { t: `Felt weighed down by regrets or things left undone?`, r: 1, flag: 'regret',
      why: `Regret is human. Some of it can still be repaired, and some can be set down.`,
      tip: `Sort gently: repairable now (the Four Things), or to be grieved and set down. Listen for shame underneath.` }
  ],
  bark: [
    { t: `Felt at peace, even for a moment?`,
      why: `Feeling at peace is one of the clearest signs of how the spirit is doing near the end.`,
      tip: `If not, ask: "What would help you be more at peace?" Then listen.`,
      anchor: 1 },
    { t: `Felt like yourself, more than your illness?`,
      why: `You are still you. Dignity starts there.`,
      tip: `Ask what they want people to know about who they are.` },
    { t: `Felt afraid, worried, or restless inside?`, r: 1,
      why: `Fear is normal, and so is getting help with it.`,
      tip: `Ask what the fear is about: pain, the process, after, or leaving people. Each has its own help. Tell the nurse about restlessness.` }
  ],
  branches: [
    { t: `Felt loved and cared for?`,
      why: `Love is the main thing, at the end more than ever.`,
      tip: `Ask who. Help them say thank you.` },
    { t: `Said what you want to say to the people who matter? Like please forgive me, I forgive you, thank you, I love you, or goodbye.`,
      why: `These words, from Ira Byock's The Four Things That Matter Most, are never too late.`,
      tip: `Offer help writing or recording them. Forgiveness is never forced, and never toward someone unsafe.` },
    { t: `Felt like a burden to the people caring for you?`, r: 1, flag: 'burden',
      why: `Most people near the end feel this sometimes. Your family usually sees it differently.`,
      tip: `Don't argue it away. Ask what being cared for is like. Name receiving care as part of love. Listen for a wish to hasten death.` }
  ],
  leaves: [
    { t: `Felt comfortable enough in your body to rest?`, s: 'comfort',
      why: `Comfort matters, and your hospice team can do a lot.`,
      tip: `If rarely, ask about pain or breath, and tell the hospice nurse today.` },
    { t: `Rested or slept in a way that helped?`, s: 'rest',
      why: `Rest is part of comfort, not laziness.`,
      tip: `Ask what helps them settle: a voice, a light, a song.` },
    { t: `Enjoyed something small: a taste, a sound, a touch, the light?`, s: 'senses',
      why: `Small joys are still joys.`,
      tip: `Help the family plan one small joy a day.` }
  ],
  fruit: [
    { t: `Felt hopeful about something, even something small?`,
      why: `Hope changes shape near the end. It doesn't have to disappear.`,
      tip: `Ask what they're hoping for now: peace, a visit, a good day, what comes after.` },
    { t: `Felt ready, or getting ready, for what's ahead?`,
      why: `Readiness grows a little at a time.`,
      tip: `Ask which part feels unready: affairs, people, or spirit.` },
    { t: `Felt hopeless, or wished it would all end soon?`, r: 1, flag: 'end',
      why: `Many people near the end feel this. You can say it out loud here.`,
      tip: `Don't panic and don't argue. Explore what it means: relief, suffering, readiness, or thoughts of ending life. The safety step follows.` }
  ]
};

// Helpers answer about themselves. Their answers grow their own tree.
const HELPER = {
  roots: [
    { t: `Found strength in your faith, your spirit, or what grounds you?` },
    { t: `Had a moment that fed your spirit: prayer, outdoors, music, quiet?` },
    { t: `Felt angry at God, or far from what you hold sacred?`, r: 1 }
  ],
  trunk: [
    { t: `Felt the care you give has meaning?` },
    { t: `Had time to remember and share stories with them?` },
    { t: `Felt guilty, like you're not doing enough or doing it wrong?`, r: 1, flag: 'guilt' }
  ],
  bark: [
    { t: `Felt prepared for what's ahead?`, anchor: 1 },
    { t: `Let yourself feel what you feel?` },
    { t: `Felt overwhelmed, numb, or unable to settle?`, r: 1 }
  ],
  branches: [
    { t: `Had someone to lean on?` },
    { t: `Said what you want to say to them?` },
    { t: `Felt alone in this, or at odds with family?`, r: 1, flag: 'alone' }
  ],
  leaves: [
    { t: `Eaten, slept, and moved enough to keep going?` },
    { t: `Taken a break without guilt?` },
    { t: `Felt worn out in a way rest doesn't fix?`, r: 1 }
  ],
  fruit: [
    { t: `Felt hopeful about something, even something small?` },
    { t: `Pictured yourself getting through what comes after?` },
    { t: `Felt hopeless, or like you can't go on?`, r: 1, flag: 'hope' }
  ]
};

// Flags are never lost. The person sees help right away; a guide sees the flag.
const FLAGS = {
  struggle: { who: 'person', on: ['often', 'always'], title: `Spiritual struggle`,
    note: `Feeling far from what you hold sacred is common, and you don't have to sort it out alone. A chaplain can sit with this.`,
    guide: `Spiritual struggle. Use the struggle-type picker.` },
  regret: { who: 'person', on: ['often', 'always'], title: `Regret`,
    note: `Some regrets can still be repaired. Some can be set down. Both are possible here.`,
    guide: `Regret. Sort repairable from grievable. Listen for shame.` },
  burden: { who: 'person', on: ['often', 'always'], title: `Feeling like a burden`,
    note: `Most people feel this sometimes. Receiving care is part of love too.`,
    guide: `Self-perceived burden. Ask about a wish to hasten death.` },
  end: { who: 'person', on: ['sometimes', 'often', 'always'], title: `Wishing it would end`,
    note: `Thank you for being honest. Let's take one more gentle question.`,
    guide: `Wish to die. Read the safety step answer before visiting.` },
  guilt: { who: 'helper', on: ['often', 'always'], title: `Caregiver guilt`,
    note: `Guilt usually means you love them. You are doing enough.`,
    guide: `Caregiver guilt. Watch for complicated grief risk.` },
  alone: { who: 'helper', on: ['often', 'always'], title: `Alone or at odds`,
    note: `You shouldn't carry this alone. Who could you call today?`,
    guide: `Isolation or family conflict.` },
  hope: { who: 'helper', on: ['often', 'always'], title: `Caregiver hopelessness`,
    note: `This is one of the hardest things a person does. Let's take one more gentle question.`,
    guide: `Caregiver hopelessness. Follow up within a day.` }
};

// The Willow safety step. A wish to die near the end is usually not suicidal,
// so it separates readiness from a plan to end life.
const SAFETY = {
  ask: `When you think about dying, which is closest for you right now?`,
  options: [
    ['notready', `I'm not ready yet.`, `That makes sense. Let's talk about what you're hoping for.`],
    ['ready', `I'm ready when it comes.`, `Thank you for telling me. That kind of peace is a gift.`],
    ['sooner', `I wish it would come sooner.`, `Thank you for trusting me with that. Many people feel this. Your hospice team should know, so they can help with whatever is making it hard.`],
    ['self', `I've thought about ending my life myself.`, `Thank you for telling me. Please tell someone right now.`],
    ['skip', `I'd rather not say.`, ``]
  ],
  urgent: ['self'],
  tellTeam: ['sooner'],
  lines: [`Your hospice's 24/7 line`, `988 (call or text)`, `911 if you are in danger now`],
  home: { ask: `Do you feel safe where you are, and with the people caring for you?`,
    options: [['yes', `Yes`], ['notalways', `Not always`], ['no', `No`]],
    help: `You deserve to be safe. Your hospice social worker can help. The Minnesota Adult Abuse Reporting Center takes reports any time. In danger now, call 911.` },
  observed: { ask: `Have they said things like wanting it to be over?`,
    help: `This is common near the end, and worth talking about. Let the hospice nurse and chaplain know.` },
  helper: { ask: `Caring for someone you love through this is one of the hardest things a person does. Are you having thoughts of not wanting to go on yourself?`,
    yes: `Please reach out now: 988 (call or text), or 911 if you are in danger. Your hospice social worker and bereavement team are there for you too.`,
    no: `Thank you. Here's one small thing to do for yourself today.` }
};

// Willow Guide: open prompts for chaplains and doulas. Pick three or four.
const GUIDE = {
  opening: {
    chaplain: `I'm {me}, one of the chaplains. I'm here for whatever's on your mind, faith or not. Is now an okay time?`,
    doula: `I'm {me}, your doula. My job is to help this time go the way you want it to. Can we talk about what matters to you?`,
    person: `What should I know about you as a person, so I can care for you well?`,
    faith: `Faith, spirit, or something else. What has mattered to you over the years? And now?`
  },
  prompts: {
    roots: [`Where do you find strength right now?`, `Is your faith giving you what you need these days, or has it gone quiet?`, `When you pray, or sit quietly, what happens?`, `Is there a ritual, a prayer, or a person from your tradition you're missing?`, `What do you imagine comes after? Does that bring you peace, or worry?`],
    trunk: [`When you look back, what are you proudest of?`, `What did life teach you that you want the people you love to know?`, `What would be left undone if today were your last day?`, `What's been hardest to let go of: the things you used to do, or who you used to be?`, `How do you want to be remembered?`],
    bark: [`Are you at peace? What would help you be more at peace?`, `What scares you most, if you're willing to say?`, `What's the hardest part about this for you?`, `When do you feel most like yourself these days?`],
    branches: [`Who do you want close right now? Who do you wish were here?`, `Is there anything you want to say to someone, or hear from someone?`, `Is there anyone you need to forgive, or ask forgiveness from?`, `How is it for you, being cared for by your family?`],
    leaves: [`What makes a good day for you now?`, `What small thing would bring you joy this week?`, `Is your comfort being taken care of? Want me to tell the nurse anything?`],
    fruit: [`What are you hoping for now?`, `What worries you most about what's ahead?`, `Does your family know what matters most to you? Have you talked about it?`, `When you think about dying, what feels ready, and what doesn't?`]
  },
  pc6: { roots: `Religious or spiritual struggle`, trunk: `Meaning in suffering; integrity and legacy`, bark: `Fear about dying or death`, branches: `Relationships`, fruit: `Treatment decisions` },
  struggles: [
    ['divine', `Divine`, `"God abandoned me." "Why is God punishing me?"`, `Tell me about you and God these days.`, `Don't defend God. Lament is prayer. The Psalms yell at God too.`],
    ['doubt', `Doubt`, `"I don't know what I believe anymore."`, `What are the questions that won't let go?`, `Welcome questions. Don't rush to answers.`],
    ['interpersonal', `Interpersonal`, `"The church hurt me."`, `What happened, if you want to tell me?`, `The church is not God. Believe them. Protect them from more harm.`],
    ['moral', `Moral`, `"I've done things I can't take back."`, `What do you carry that feels heaviest?`, `Sort guilt (repair) from shame (worth). Offer confession or blessing in their tradition.`],
    ['meaning', `Ultimate meaning`, `"What was it all for?"`, `Where has your life mattered, even in small ways?`, `Meaning-centered work: what you gave, how you face this, what you create, what you still love.`],
    ['evil', `Fear of evil or judgment`, `"I'm afraid of hell."`, `What do you picture when you're afraid?`, `Find their tradition's word of mercy. Bring their own clergy if they want.`]
  ],
  guiltShame: [
    [`Guilt: "I did..."`, `Repair. A letter, a call, the Four Things, confession in their tradition.`],
    [`Shame: "I am..."`, `Worth. Empathy is the antidote to shame. Be the witness who stays. Offer blessing, not advice.`],
    [`Free-floating guilt, or guilt over what they couldn't control`, `Name it gently as not theirs to carry.`]
  ],
  vigil: [
    [`The room`, `What do you want to see, hear, and smell? Light or dark? Window open?`],
    [`The people`, `Who should be there? Who shouldn't? Is it okay to be alone at the very end?`],
    [`The words`, `What do you want said, read, prayed, or sung?`],
    [`Touch`, `Hand held? Feet rubbed? Hair brushed? Or space?`],
    [`After`, `What should happen in the first hour? Who washes or dresses you, if anyone?`]
  ],
  closing: [`What I heard is that {x} matters most, and you're worried about {y}. Did I get that right?`, `Would you like a prayer, a blessing, or a few quiet minutes before I go?`],
  hope: { asked: [['no', `Not yet`], ['yes', `Yes, and we talked`], ['declined', `Yes, but they declined`]] }
};

window.WILLOW_CHECKIN = { version: VERSION, answers: ANSWERS, levels: LEVELS, words: WORDS, stems: STEMS, answeredBy: ANSWERED_BY, questions: Q, helper: HELPER, flags: FLAGS, safety: SAFETY, guide: GUIDE };
})();
