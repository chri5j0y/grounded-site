/* =====================================================================
   WILLOW GUIDES . When Life Changes
   Each guide: { id, title, ring, keys, story, parts: [[label, text], ...] }
   Labels: what (What's happening), say, dont (Don't say), helps (What helps),
   pro (For chaplains and doulas), faith (Faith notes).
   Under all of them: name the feeling first, then talk.
   ===================================================================== */
(function(){
const LABELS = { what: `What's happening`, say: `Say`, dont: `Don't say`, helps: `What helps`, pro: `For chaplains and doulas`, faith: `Faith notes`, know: `What we know`, means: `What it may mean` };
const RINGS = [['spirit', `The spirit and the people`], ['last', `The last days and after`]];
const FOOT = `When you're worried, call your hospice nurse. They're there day and night.`;
const TOOL = `Name the feeling first, then talk. "I wish... I worry... I wonder..." works almost everywhere.`;

const G = [
  { id: 'miracle', ring: 'spirit', title: `"We're hoping for a miracle."`, story: `He Was Praying Too`,
    keys: `miracle, healing, God can heal, don't give up, faith, pray`,
    parts: [
      ['what', `Hope for a miracle often means the family already knows how serious it is. Otherwise they wouldn't need one.`],
      ['say', `"I'm hoping with you." "What would a miracle look like for you?" "I wish it were different, and I worry the body is getting tired."`],
      ['dont', `"There's no chance." "You need to be realistic." Never argue with God's power.`],
      ['helps', `Keep praying for the miracle and preparing for the goodbye. Both can happen in the same room.`],
      ['pro', `Hear which kind of hope it is: a hope with no religious weight, a hope rooted in deep faith, or a hope built on mistrust of the medical system. Johns Hopkins' AMEN approach: affirm the hope, share the wish, keep educating, and promise you'll be there no matter what.`],
      ['faith', `Strong in Pentecostal, Baptist, and many Black church families. Invite their own pastor into the conversation.`]
    ] },
  { id: 'punish', ring: 'spirit', title: `"Is God punishing me?" "Why won't God heal me?"`, story: `Why Is God Doing This to Me?`,
    keys: `God punishing, why me, angry at God, God won't heal, abandoned, unanswered prayer`,
    parts: [
      ['what', `Divine struggle. It's common, it hurts, and left alone it's linked to worse outcomes.`],
      ['say', `"That's a heavy question. Tell me more about you and God right now." "You're allowed to be angry at God. People in the Bible were."`],
      ['dont', `"God has a plan." "Everything happens for a reason." Don't defend God.`],
      ['helps', `Lament. Psalm 13 and Psalm 22 say what they're feeling. Prayer doesn't have to be polite.`],
      ['pro', `Listen for whether it's punishment, abandonment, or anger. Each needs company more than answers.`],
      ['faith', `In Islam, illness can be a test and a purification. In Hindu and Buddhist families, watch that karma doesn't turn into blame.`]
    ] },
  { id: 'comeback', ring: 'spirit', title: `"I've fallen away." "Can I come back?"`, story: `The Atypical Atheist`,
    keys: `left the church, fallen away, lost my faith, come back, prodigal, church hurt, doubt`,
    parts: [
      ['what', `Usually one of three things: hurt by people, doubt, or feeling abandoned by God.`],
      ['say', `"Being hurt by a church is not the same as being far from God." "Questions aren't the opposite of faith." "The door is open. Nobody's keeping score."`],
      ['dont', `"I told you so," or anything close to it. Don't make the return a test.`],
      ['helps', `Finding their kind of clergy fast. A Catholic who left 40 years ago may want Confession today.`],
      ['pro', `Use the struggle-type picker. The church is the people, not the building or the brand.`]
    ] },
  { id: 'afraid', ring: 'spirit', title: `"I'm afraid of hell." "What if there's nothing?"`, story: ``,
    keys: `hell, afraid to die, judgment, nothing after, afterlife, fear of death, purgatory`,
    parts: [
      ['what', `Fear of judgment, or fear of not existing. Both are old human fears.`],
      ['say', `"What do you picture when you're afraid?" Then listen all the way to the end.`],
      ['dont', `"Don't worry about that." Don't argue them out of it.`],
      ['helps', `Their own tradition's word of mercy, from their own clergy if they want. For those who fear nothing after: what continues in the people they loved, and in the earth.`],
      ['pro', `Fear of judgment often sits on top of a specific guilt. Gently ask what it's about.`],
      ['faith', `Catholic: confession, and God's mercy is bigger than a missed priest. Baptist and Evangelical: assurance verses. Buddhist: fear of a hard rebirth, met with calm and chanting. Atheist: no God-language, only honesty and company.`]
    ] },
  { id: 'forgive', ring: 'spirit', title: `"I can't forgive them." "They won't forgive me."`, story: `He Came to Collect`,
    keys: `forgive, forgiveness, sorry, apology, grudge, unfinished business, Four Things`,
    parts: [
      ['what', `Unfinished business. Forgiveness near the end is possible, and it doesn't require reconciling.`],
      ['say', `"Forgiving isn't saying it was okay." "You don't owe anyone a visit." "You can say it in a letter, even one you never send."`],
      ['dont', `"Life's too short to hold grudges." Never push forgiveness toward someone who abused them.`],
      ['helps', `The Four Things, one at a time. A four-week forgiveness program helped elderly terminally ill patients with forgiveness, hope, and anger in a small randomized trial.`],
      ['pro', `Forgiveness is a process. One step counts. Some people need to forgive God, or themselves, first.`]
    ] },
  { id: 'burden', ring: 'spirit', title: `"I'm a burden."`, story: ``,
    keys: `burden, in the way, too much trouble, hate needing help, dependent`,
    parts: [
      ['what', `Most people near the end feel this sometimes, and it rises as death gets closer. It's tied to loss of dignity and a wish to hasten death.`],
      ['say', `"It's hard to be on this side of the caring." "Your family's caring for you because they love you. You let them. That's a gift too."`],
      ['dont', `"You're not a burden" (it argues with their feeling). Don't brush it off.`],
      ['helps', `Family saying one specific thank-you to them. Letting them still give something: a blessing, advice, a story.`],
      ['pro', `Always ask about a wish to hasten death when burden is high.`]
    ] },
  { id: 'end', ring: 'spirit', title: `"I wish it would end." "I'm ready."`, story: `Total Bliss`,
    keys: `want to die, wish it would end, ready to go, done, tired of living, end it`,
    parts: [
      ['what', `Usually not suicide. It's most often relief, exhaustion, readiness, or a cry for help with suffering. Asking about it doesn't cause harm.`],
      ['say', `"Thank you for telling me." "What's making it hardest right now?" "Is it more that you're ready, or that it hurts too much?"`],
      ['dont', `"Don't talk like that." Don't panic.`],
      ['helps', `Tell the hospice nurse. Treat what can be treated. Make room for readiness as peace.`],
      ['pro', `The safety step separates readiness from a plan to end life. Aid in dying is not legal in Minnesota. If asked, stay neutral and loop in the team.`]
    ] },
  { id: 'notready', ring: 'spirit', title: `"I'm not ready."`, story: ``,
    keys: `not ready, too soon, unfinished, scared, so much left`,
    parts: [
      ['say', `"That makes sense. What part feels least ready?" Then sort: affairs, people, or spirit.`],
      ['helps', `One small task today. One message to one person. A What Matters to Me sheet.`],
      ['dont', `"You need to accept this." Readiness comes a little at a time, or not at all, and both are allowed.`]
    ] },
  { id: 'estranged', ring: 'spirit', title: `Estranged family at the end`, story: ``,
    keys: `estranged, haven't talked in years, not speaking, rift, cut off, last chance`,
    parts: [
      ['what', `An old rift, a long silence, and suddenly time is short.`],
      ['say', `"Would you like them to know? You decide." To the estranged person: "You don't have to come. If you want to, you're welcome."`],
      ['dont', `"This is your last chance." Never force a goodbye.`],
      ['helps', `A letter. A message. A visit if both want it. And sometimes, peace with it staying unresolved.`],
      ['pro', `Watch for triangulation: someone asking you to fix a 30-year rift. Your job is to carry the patient's wish, not the family's hope.`]
    ] },
  { id: 'conflict', ring: 'spirit', title: `Family conflict at the bedside`, story: ``,
    keys: `siblings fighting, family fighting, who decides, disagree, health care agent`,
    parts: [
      ['say', `"Everyone here loves her. Let's keep this room about what she wants." "Let's read what she wrote in What Matters to Me."`],
      ['helps', `A family meeting with the social worker or chaplain. Rituals can stack: the priest at 2:00, the grandkids' song at 3:00.`],
      ['pro', `Name the shared love before the disagreement. Center the patient's own words.`]
    ] },
  { id: 'parent', ring: 'spirit', title: `"I wasn't a good parent."`, story: `The Recovery`,
    keys: `guilt, shame, regret, bad parent, bad father, bad mother, mistakes`,
    parts: [
      ['what', `Listen for "I did" (guilt) or "I am" (shame). They need different care.`],
      ['say', `To guilt: "Is there anything you'd still like to say to them?" To shame: "You're not the worst thing you've done. I see more than that."`],
      ['helps', `Guilt moves toward repair. Shame moves toward worth, witness, and blessing.`]
    ] },
  { id: 'signs', ring: 'last', title: `What dying looks like`, story: ``,
    keys: `signs of dying, death rattle, gurgling, mottling, blotchy skin, breathing stops, pauses, Cheyne-Stokes, cold hands, active dying, transitioning, how long, final hours, restless, sleeping all the time`,
    parts: [
      ['what', `Weeks before: more sleep, less eating, less talking, a world that gets smaller. Turning inward is normal. Days before: confusion or restlessness, very little food or drink, longer sleep, cool hands and feet. Hours before: breathing changes, with pauses, then a few quick breaths. A rattling sound from the throat. Blotchy, purplish skin on the knees and feet (mottling). Less response.`],
      ['say', `"These changes are the body slowing down. They usually bother us more than they bother her."`],
      ['helps', `Keep talking to them. Moisten their lips. Play their music. Call the nurse for restlessness, grimacing, or anything that looks like distress.`],
      ['dont', `"Any minute now." Nobody knows the minute.`]
    ] },
  { id: 'starving', ring: 'last', title: `"Are they starving?"`, story: ``,
    keys: `not eating, stopped drinking, starving, dehydrated, thirsty, feeding tube, IV fluids, dry mouth, can't swallow`,
    parts: [
      ['what', `The body can't use food anymore. Not eating is part of dying, not the cause of it. A dying person usually doesn't feel hunger or thirst.`],
      ['say', `"You've fed her your whole life. Now love looks like ice chips and lip balm."`],
      ['dont', `Force food or fluids. It can cause bloating, nausea, choking, and trouble breathing.`],
      ['helps', `Comfort feeding by hand, only what they want. Mouth care. Sitting together at the table, even if they don't eat.`],
      ['faith', `Food is love in almost every culture. Honor that grief. If a feeding tube or IV comes up, bring in the nurse and their clergy.`]
    ] },
  { id: 'hear', ring: 'last', title: `"Can they hear me?"`, story: `Drift Away`,
    keys: `can they hear me, unresponsive, coma, hearing, talk to them`,
    parts: [
      ['know', `Hearing may be one of the last senses to go. In a hospice study, unresponsive patients' brains still responded to sound in their last hours. We can't know how much they understand.`],
      ['say', `"Keep talking to her. Tell her who's here. Say what you want to say."`],
      ['helps', `Speak to them, not about them. Phone calls held to their ear. Their favorite voice reading their favorite words.`]
    ] },
  { id: 'visions', ring: 'last', title: `"They're seeing people who've died."`, story: `Welcome Home`,
    keys: `talking to dead relatives, seeing mom, visions, dreams, reaching up, angels, ghosts`,
    parts: [
      ['what', `Dreams and visions near the end are common, especially of loved ones who've died. They usually bring comfort, and they come more often as death gets closer. They're different from confusion.`],
      ['say', `"Who's here?" "What are they saying?" Ask, don't correct.`],
      ['dont', `"There's no one there." Don't call it crazy.`],
      ['means', `Often that death is getting closer. Say it gently, and in person if you can. "We might be getting close. Can I come by?"`]
    ] },
  { id: 'hanging', ring: 'last', title: `"Why are they hanging on?"`, story: `Please Help My Dad Die`,
    keys: `hanging on, waiting, permission to go, letting go, why so long`,
    parts: [
      ['what', `Some people seem to wait: for a visitor, a date, permission. Bedside workers see it often, though no one can prove why.`],
      ['say', `"Is there anyone they might be waiting for? Anything left unsaid?"`],
      ['helps', `The Four Things. Telling them, once, that they can go when they're ready. A quiet room.`]
    ] },
  { id: 'rally', ring: 'last', title: `The rally`, story: ``,
    keys: `rally, surge, burst of energy, suddenly better, woke up, terminal lucidity`,
    parts: [
      ['what', `Sometimes a person who's been unresponsive wakes up, talks, eats, recognizes everyone. It's real, and it's often brief.`],
      ['say', `"This is a gift. Use it to say what you want to say."`],
      ['dont', `Read it as recovery without talking to the nurse. Gently prepare the family that it may not last.`]
    ] },
  { id: 'kids', ring: 'last', title: `Talking with children`, story: ``,
    keys: `kids, children, grandkids, explain to child, tell my kids`,
    parts: [
      ['say', `"Grandma is dying. Her body is very sick and it's stopping working." Use the word "died," not "sleeping" or "lost." Children take words literally.`],
      ['helps', `Honest, short answers, repeated as often as they ask. Letting them help: drawing, choosing music, telling a story. Letting them choose whether to visit. Dougy Center tip sheets; Maple and Aspen guides for kids.`],
      ['faith', `"Different people believe different things about what happens. In our family, we believe..."`]
    ] },
  { id: 'notthere', ring: 'last', title: `"I wasn't there when they died."`, story: `If She Is Still Here`,
    keys: `wasn't there, died alone, died when I left, missed it, stepped out`,
    parts: [
      ['what', `Guilt that lands hard, often on the person who was there the most.`],
      ['say', `"You were there for so much of it. That's what they knew." "Some people seem to wait until their loved ones step out. Bedside workers see it often."`],
      ['dont', `"You should have stayed."`],
      ['helps', `A ritual of your own goodbye, now. A letter. Sitting with the body if it's still there.`]
    ] },
  { id: 'firsthour', ring: 'last', title: `The first hour after death`, story: ``,
    keys: `what to do after death, who to call, they died, funeral home, first hour`,
    parts: [
      ['helps', `No rush. Nothing has to happen right away. Call the hospice, not 911. Sit. Hold their hand. Say goodbye. Let the kids come in if they want. Do your tradition's ritual: prayers, washing, the Shahada, chanting, keeping the body undisturbed, a shomer. Check the tradition card. The hospice nurse comes to confirm the death and help with the next steps, including the funeral home.`],
      ['say', `"Take all the time you need."`]
    ] },
  { id: 'official', ring: 'last', title: `Making it official in Minnesota`, story: ``,
    keys: `health care directive, advance directive, health care agent, POA, POLST, DNR, Honoring Choices, Go Wish`,
    parts: [
      ['helps', `Health care directive: free forms from Honoring Choices Minnesota, in eight languages, with help available in St. Cloud. Health care agent: the person who speaks for them if they can't. Choose someone who will honor their wishes, not their own. POLST: the medical order about treatments in an emergency, signed with their doctor. Talk tools: The Conversation Project's free guides, and the Go Wish card game.`],
      ['say', `"Writing it down is a gift to your family. They won't have to guess."`]
    ] },
  { id: 'relief', ring: 'last', title: `"Is it okay that I feel relieved?"`, story: `Grief Debt`,
    keys: `relief, relieved, guilty for relief, numb, after`,
    parts: [
      ['say', `"Yes. Relief and grief can live in the same heart. Relief usually means the suffering is over, for both of you."`],
      ['helps', `Naming it out loud. Hospice bereavement support, which runs for about a year after the death.`]
    ] }
];

window.WILLOW_GUIDES = { labels: LABELS, rings: RINGS, foot: FOOT, tool: TOOL, guides: G };
})();
