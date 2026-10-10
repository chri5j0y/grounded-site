/* =====================================================================
   WILLOW PRACTICES . growth plan, bedside, helper care, care plans
   Each practice: [id, name, how, time, evidence]
   Evidence: well (Well studied), growing (Growing evidence),
             clinical (Clinical consensus), wisdom (Traditional wisdom)
   Every practice works lying down and can be done with a helper.
   Willow offers one a day, never a streak.
   ===================================================================== */
(function(){
const EVIDENCE = { well: `Well studied`, growing: `Growing evidence`, clinical: `Clinical consensus`, wisdom: `Traditional wisdom` };

const INTRO = `Growth at the end looks different. It's not about getting stronger. It's about peace, love said out loud, and being yourself to the last.`;

const PERSON = {
  roots: [
    ['wr-prayer', `Your Prayer, Your Way`, `Pray, or have someone read, a prayer you've always known. Rosary, Jesus Prayer, dhikr, the Shema, chanting God's name, loving-kindness, or silence all count.`, `2 to 10 min`, 'wisdom'],
    ['wr-breath', `Breath Prayer`, `Breathe in on a short phrase, out on another. "Be still / and know." "Lord Jesus / have mercy." "Allah / is near." "I am held / I am loved."`, `1 to 3 min`, 'growing'],
    ['wr-read', `A Reading Aloud`, `Pick one from the Readings library. A helper reads it slowly, twice.`, `3 min`, 'wisdom'],
    ['wr-rite', `A Rite From Your Tradition`, `Ask for the sacrament, blessing, or ritual your faith offers. Willow helps call the right person.`, `Varies`, 'wisdom'],
    ['wr-honest', `Honest Prayer`, `Tell God, or the silence, what's really true, even if it's angry. The Psalms do this.`, `2 min`, 'growing'],
    ['wr-bless', `Receive a Blessing`, `Ask a chaplain, clergy, or family member to bless you, in words that fit your faith, or wherever you are in-between.`, `2 min`, 'wisdom'],
    ['wr-awe', `Awe at the Window`, `Notice something vast or beautiful: the sky, a tree, a grandchild's hand. Stay with it.`, `3 min`, 'growing']
  ],
  trunk: [
    ['wt-story', `One Story`, `Tell one story you want remembered. A helper writes or records it into Cuttings.`, `5 min`, 'well'],
    ['wt-learned', `Three Things I Learned`, `Say three things life taught you, for the people you love.`, `5 min`, 'well'],
    ['wt-photos', `Photo Time`, `Look at old photos with someone. Let the stories come.`, `10 min`, 'growing'],
    ['wt-gave', `What I Gave`, `Name what you gave: to your kids, your work, your town, your faith.`, `3 min`, 'well'],
    ['wt-facing', `How I'm Facing This`, `Say how you want to carry this time. "With humor." "With my eyes open." "Holding my wife's hand."`, `2 min`, 'well'],
    ['wt-give', `Something Still to Give`, `Choose one gift: a blessing, a recipe, a piece of advice, a keepsake for someone.`, `5 min`, 'wisdom']
  ],
  bark: [
    ['wb-exhale', `Long Out-Breath`, `Breathe in gently. Let the breath out slower and longer. Never force it. Stop if breathing feels hard.`, `1 to 3 min`, 'growing'],
    ['wb-name', `Say It Out Loud`, `Name the feeling to someone: "I'm scared." Naming a feeling helps settle it.`, `1 min`, 'growing'],
    ['wb-54321', `5-4-3-2-1`, `Five things you see, four you feel, three you hear, two you smell, one you taste. (Grounded in Coffee)`, `2 min`, 'wisdom'],
    ['wb-kind', `Kindness for Me`, `Say slowly: "May I be at peace. May I be gentle with myself. May I be held."`, `2 min`, 'well'],
    ['wb-settle', `Settle the Body`, `Let attention rest, part by part, from feet to head, wherever it's comfortable.`, `3 min`, 'well'],
    ['wb-handoff', `Hand Off a Worry`, `Give one practical worry to someone else to carry. Tell the team about the rest.`, `2 min`, 'wisdom']
  ],
  branches: [
    ['wbr-four', `One of the Four Things`, `Pick one person and one of the four: please forgive me, I forgive you, thank you, I love you. Say it, write it, or record it.`, `5 min`, 'wisdom'],
    ['wbr-letter', `A Letter to Keep`, `Write or dictate a letter to someone, now or for later. It goes into Cuttings.`, `10 min`, 'well'],
    ['wbr-forgive', `One Step Toward Forgiveness`, `Name the hurt. Decide if you want to forgive. Forgiving is not the same as reconciling, and it's never owed to someone unsafe.`, `5 min`, 'growing'],
    ['wbr-thanks', `Thank-You List`, `Name the people you're grateful for, one at a time. A helper writes them down.`, `3 min`, 'growing'],
    ['wbr-receive', `Let Them Help`, `When someone helps, say "Thank you for this." Receiving care is part of love too.`, `1 min`, 'wisdom'],
    ['wbr-visit', `The Call or Visit I Want`, `Name someone you'd like to see or hear. A helper makes it happen.`, `Varies`, 'wisdom']
  ],
  leaves: [
    ['wl-music', `Music I Love`, `Play favorite songs or hymns. Make a playlist for the last days too.`, `10 min`, 'growing'],
    ['wl-touch', `Gentle Touch`, `Hand massage with lotion, brushing hair, feet rubbed, if you want touch.`, `5 min`, 'growing'],
    ['wl-mouth', `Mouth Comfort`, `Sips, ice chips, a moist swab, lip balm. Better than forcing food.`, `2 min`, 'clinical'],
    ['wl-taste', `One Small Taste`, `A favorite flavor: a spoon of ice cream, the smell of coffee.`, `2 min`, 'wisdom'],
    ['wl-light', `Air and Light`, `Window open, curtains back, sun on your hands.`, `5 min`, 'growing'],
    ['wl-rest', `Rest Without Guilt`, `Sleep is allowed. Rest is part of comfort.`, `Any`, 'wisdom']
  ],
  fruit: [
    ['wf-hope', `What I'm Hoping for Today`, `Say one hope for today, however small.`, `1 min`, 'growing'],
    ['wf-matters', `What Matters to Me`, `Fill in the What Matters to Me sheet with someone. Make it official with an Honoring Choices Minnesota directive.`, `15 min`, 'well'],
    ['wf-good', `Plan One Good Thing`, `Plan one good thing for tomorrow.`, `2 min`, 'wisdom'],
    ['wf-welcome', `Picture the Welcome`, `In your own faith, picture what comes after. Or picture the people and the earth you return to.`, `3 min`, 'wisdom'],
    ['wf-giveaway', `Give Something Away`, `Give a meaningful object to someone while you can watch them receive it.`, `5 min`, 'wisdom'],
    ['wf-talk', `Talk About Dying, Once`, `Say out loud what you think and feel about dying, to someone who can hear it. Asking about it doesn't cause harm.`, `10 min`, 'growing']
  ]
};

const BEDSIDE = [
  ['wh-talk', `Keep Talking`, `Talk to them, not about them, even when they don't answer. Dying, unresponsive patients' brains have responded to sound up to the last hours.`, 'growing'],
  ['wh-sing', `Read or Sing`, `Read their favorite reading, or sing the song they love. Off-key counts.`, 'wisdom'],
  ['wh-hand', `Hold a Hand`, `Rest your hand on theirs. Let them pull away if they want.`, 'wisdom'],
  ['wh-comfort', `Comfort, Not Calories`, `Offer sips, ice chips, swabs, lip balm. The body is slowing down. Not eating doesn't mean starving.`, 'clinical'],
  ['wh-playlist', `The Vigil Playlist`, `Play the music they chose, softly.`, 'growing'],
  ['wh-permission', `Give Permission`, `"You can go when you're ready. We'll miss you, and we'll be okay." Say it once. You don't have to mean every word yet.`, 'wisdom'],
  ['wh-prayer', `A One-Minute Prayer`, `A prayer from their tradition, or a few words of your own, by the bed.`, 'wisdom'],
  ['wh-visitors', `Listen to the Visitors`, `When they see people who died, ask gently, "Who's here?" Dreams of loved ones near the end are usually a comfort.`, 'growing'],
  ['wh-restless', `When They're Restless`, `Soft voice, low light, familiar music. Call the hospice nurse.`, 'clinical'],
  ['wh-handoff', `Shift Handoff`, `Before you leave, add one line to "What helped today."`, 'wisdom'],
  ['wh-kids', `Kids Can Help`, `Let children draw, choose music, or tell a story to them.`, 'growing'],
  ['wh-after', `The First Hour After`, `Take your time. Sit. Say goodbye. Do your tradition's ritual. Call the hospice, not 911.`, 'clinical']
];

const SELFCARE = [
  ['ws-54321', `5-4-3-2-1 in the Car`, `Five things you see, four you feel, three you hear, two you smell, one you taste.`, 'wisdom'],
  ['ws-exhale', `Long Out-Breath`, `One minute of slow, long out-breaths before you walk in.`, 'well'],
  ['ws-compassion', `Compassion, Not Drowning`, `"May you be at peace. May I be at peace too." Compassion protects you better than absorbing their pain.`, 'growing'],
  ['ws-debt', `Grief Debt Check`, `Name one loss you haven't let yourself feel yet. Give it ten minutes. (Grief Debt)`, 'wisdom'],
  ['ws-gates', `Gates, Not Walls`, `Tag out for an hour. Someone else is on. (My Boundaries Have Gates)`, 'wisdom'],
  ['ws-eat', `Eat Something Real`, `One real meal today.`, 'wisdom'],
  ['ws-guilt', `Set Guilt Down`, `Write the guilt down. Then write: "I'm doing what love can do today."`, 'growing']
];

// Care plan builder: Goal (why), Approach (how), Action (what).
// Structure follows the Chaplaincy Taxonomy's intended effects, methods, and
// interventions. The taxonomy's own item list stays out until permission is granted.
const PLANS = [
  [`"God feels far."`, `Feel less alone in the struggle`, `Explore their faith story; companion the lament`, `Pray a lament psalm together; offer their own clergy`],
  [`"The priest didn't come."`, `Peace about the sacrament`, `Bring their tradition's resources`, `Call the parish; pray commendation prayers now`],
  [`"I'm a burden."`, `Restore self-worth`, `Affirm receiving care as part of love`, `Family says one thank-you to them; Four Things`],
  [`"I can't forgive him."`, `Freedom from the weight`, `Explore the hurt without pushing`, `One step toward forgiveness; a letter not sent`],
  [`"What was it all for?"`, `A sense that life mattered`, `Life review; meaning-centered prompts`, `One story into Cuttings; three things I learned`],
  [`"I'm scared of dying."`, `Less fear`, `Name the specific fear`, `Nurse for symptoms; what to expect guide; breath practice`],
  [`"I want it to be over."`, `Relief from suffering`, `Explore the wish; screen safely`, `Safety step; tell the nurse; presence`],
  [`"The family is fighting."`, `A calmer room`, `Facilitate communication; center the patient's wishes`, `Family meeting; What Matters to Me read aloud`],
  [`"I'm not ready."`, `Readiness, one piece at a time`, `Sort affairs, people, spirit`, `One task for today; one Four Things message`],
  [`Doula: vigil planning`, `The death they want`, `Plan the room, people, words, touch`, `Vigil plan written and shared with helpers`]
];
const PLAN_END = `The plan's last line is always What changed: in their words, at the next visit.`;

window.WILLOW_PRACTICES = { evidence: EVIDENCE, intro: INTRO, person: PERSON, bedside: BEDSIDE, selfcare: SELFCARE, plans: PLANS, planEnd: PLAN_END };
})();
