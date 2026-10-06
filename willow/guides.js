/* =====================================================================
   WILLOW GUIDES . When Life Changes
   Each guide: { id, title, ring, keys, story, parts: [[label, text], ...] }
   Labels: what (What's happening), say, dont (Don't say), helps (What helps),
   pro (For chaplains and doulas), faith (Faith notes), plus you (For You) or helper (For the
   Helper): the side each guide was missing (Build B1, October 2026), so every guide speaks to
   the person facing it and to the person beside them. Two videos per guide: willow/guide-videos.js.
   Every guide has a short pro note (W1, GWG BLD 714). The full For Guides section and video for each guide are sealed
   in Willow Guide (Field library), never in this public file.
   Under all of them: name the feeling first, then talk.
   ===================================================================== */
(function(){
const LABELS = { you: `For You`, helper: `For the Helper`, what: `What's happening`, say: `Say`, dont: `Don't say`, helps: `What helps`, pro: `For chaplains and doulas`, faith: `Faith notes`, know: `What we know`, means: `What it may mean` };
const RINGS = [['spirit', `The Spirit and the People`], ['last', `The Last Days and After`]];
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
      ['you', `If you're the one hoping for a miracle: keep praying, out loud and together, as often as you want. You can pray for the miracle and still prepare for the goodbye; both can happen in the same room, and preparing makes sure nothing important goes unsaid. Invite your own pastor or faith leader, ask the nurse what to watch for, and say what matters now.`],
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
      ['you', `If you're the one asking: people all through scripture asked God why, and asking is a way of being honest with God. Prayer doesn't have to be polite. Try your own words: "God, I'm angry. I don't understand. Stay with me." Tell someone you trust, ask your hospice to help reach your own faith leader, and let others pray for you on the days you can't.`],
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
      ['you', `If you're the one who stepped away: the door is open, and nobody is keeping score. Being hurt by a church is different from being far from God. Ask your hospice to help find the kind of clergy you trust, ask for the rite you remember (confession, communion, a blessing), or start with one prayer in your own words. You're welcome just as you are.`],
      ['pro', `Use the struggle-type picker. The church is the people, not the building or the brand.`]
    ] },
  { id: 'afraid', ring: 'spirit', title: `"I'm afraid of hell." "What if there's nothing?"`, story: ``,
    keys: `hell, afraid to die, judgment, nothing after, afterlife, fear of death, purgatory`,
    parts: [
      ['what', `Fear of judgment, or fear of not existing. Both are old human fears.`],
      ['say', `"What do you picture when you're afraid?" Then listen all the way to the end.`],
      ['dont', `"Don't worry about that." Don't argue them out of it.`],
      ['helps', `Their own tradition's word of mercy, from their own clergy if they want. For those who fear nothing after: what continues in the people they loved, and in the earth.`],
      ['you', `If you're the one who is afraid: fear near the end is human, and it isn't a lack of faith. Notice what you picture when you're afraid, and tell someone you trust. If a specific regret sits underneath, saying it out loud often brings relief. Ask for your own tradition's word of mercy, a rite of your faith, or simply company; and breathe slowly, in for four and out for six.`],
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
      ['you', `If you're the one holding it: forgiving isn't saying it was okay, and it doesn't require making up or a visit. One step counts. Start with the Four Things that are true for you (please forgive me, I forgive you, thank you, I love you), in a letter you may never send, a message, or a visit if you both want one. Some people forgive themselves, or God, first.`],
      ['pro', `Forgiveness is a process. One step counts. Some people need to forgive God, or themselves, first.`]
    ] },
  { id: 'burden', ring: 'spirit', title: `"I'm a burden."`, story: ``,
    keys: `burden, in the way, too much trouble, hate needing help, dependent`,
    parts: [
      ['what', `Most people near the end feel this sometimes, and it rises as death gets closer. It's tied to loss of dignity and a wish to hasten death.`],
      ['say', `"It's hard to be on this side of the caring." "Your family's caring for you because they love you. You let them. That's a gift too."`],
      ['dont', `"You're not a burden" (it argues with their feeling). Don't brush it off.`],
      ['helps', `Family saying one specific thank-you to them. Letting them still give something: a blessing, advice, a story.`],
      ['you', `If you feel like a burden: it's hard to be on this side of the caring, and that loss is real. When you let people care for you, you give them a way to love you back. You still have much to give: words for each person, a story from your life, your advice, one specific thank-you. If the feeling gets heavy, tell your hospice team.`],
      ['pro', `Always ask about a wish to hasten death when burden is high.`]
    ] },
  { id: 'end', ring: 'spirit', title: `"I wish it would end." "I'm ready."`, story: `Total Bliss`,
    keys: `want to die, wish it would end, ready to go, done, tired of living, end it`,
    parts: [
      ['what', `Usually not suicide. It's most often relief, exhaustion, readiness, or a cry for help with suffering. Asking about it doesn't cause harm.`],
      ['say', `"Thank you for telling me." "What's making it hardest right now?" "Is it more that you're ready, or that it hurts too much?"`],
      ['dont', `"Don't talk like that." Don't panic.`],
      ['helps', `Tell the hospice nurse. Treat what can be treated. Make room for readiness as peace.`],
      ['you', `If you're the one feeling it: you can say it, and it deserves to be heard. Ask yourself whether it's closer to ready, tired, or hurting, and tell your hospice nurse; pain, breathlessness, and worry can often be eased. Readiness can be peace. If you're thinking about ending your life yourself, tell your hospice team right away or call or text 988. In danger now, call 911.`],
      ['pro', `The safety step separates readiness from a plan to end life. Aid in dying is not legal in Minnesota. If asked, stay neutral and loop in the team.`]
    ] },
  { id: 'notready', ring: 'spirit', title: `"I'm not ready."`, story: ``,
    keys: `not ready, too soon, unfinished, scared, so much left`,
    parts: [
      ['say', `"That makes sense. What part feels least ready?" Then sort: affairs, people, or spirit.`],
      ['helps', `One small task today. One message to one person. A What Matters to Me sheet.`],
      ['dont', `"You need to accept this." Readiness comes a little at a time, or not at all, and both are allowed.`],
      ['you', `If you're the one who isn't ready: that makes sense, and nobody needs you to accept this on a schedule. Sort what feels least ready: your affairs, your people, or your heart. Then take one small step today: one task, one message, or a few lines in What Matters to Me.`],
      ['pro', `"Not ready" can mean unfinished business, fear of what's next, or love that won't let go. Ask which before offering peace, and never push acceptance.`]
    ] },
  { id: 'estranged', ring: 'spirit', title: `Estranged family at the end`, story: ``,
    keys: `estranged, haven't talked in years, not speaking, rift, cut off, last chance`,
    parts: [
      ['what', `An old rift, a long silence, and suddenly time is short.`],
      ['say', `"Would you like them to know? You decide." To the estranged person: "You don't have to come. If you want to, you're welcome."`],
      ['dont', `"This is your last chance." Never force a goodbye.`],
      ['helps', `A letter. A message. A visit if both want it. And sometimes, peace with it staying unresolved.`],
      ['you', `If you're in the rift, as the one who is dying or the one who has been away: you decide what happens next. A letter, a message, a visit if both want it, or peace with it as it is all count. Ask yourself what one sentence you'd want them to know. A chaplain or social worker can carry a message gently.`],
      ['pro', `Watch for triangulation: someone asking you to fix a 30-year rift. Your job is to carry the patient's wish, not the family's hope.`]
    ] },
  { id: 'conflict', ring: 'spirit', title: `Family conflict at the bedside`, story: ``,
    keys: `siblings fighting, family fighting, who decides, disagree, health care agent`,
    parts: [
      ['say', `"Everyone here loves her. Let's keep this room about what she wants." "Let's read what she wrote in What Matters to Me."`],
      ['helps', `A family meeting with the social worker or chaplain. Rituals can stack: the priest at 2:00, the grandkids' song at 3:00.`],
      ['you', `If you're in the family: conflict near the end usually comes from love pulled in different directions. Keep the room about what your loved one wants, not who is right. Read their own words together (a directive, What Matters to Me), ask for a family meeting with the social worker or chaplain, and let visits and goodbyes take turns.`],
      ['pro', `Name the shared love before the disagreement. Center the patient's own words.`]
    ] },
  { id: 'parent', ring: 'spirit', title: `"I wasn't a good parent."`, story: `The Recovery`,
    keys: `guilt, shame, regret, bad parent, bad father, bad mother, mistakes`,
    parts: [
      ['what', `Listen for "I did" (guilt) or "I am" (shame). They need different care.`],
      ['say', `To guilt: "Is there anything you'd still like to say to them?" To shame: "You're not the worst thing you've done. I see more than that."`],
      ['helps', `Guilt moves toward repair. Shame moves toward worth, witness, and blessing.`],
      ['you', `If you're the one looking back: ask whether it's "I did" (guilt) or "I am" (shame). Guilt moves toward repair: a letter, a call, an apology, even one sentence. Shame moves toward worth: you are more than the worst thing you've done. A chaplain can help you find the words, and it isn't too late to say them.`],
      ['pro', `Guilt about parenting usually wants to be heard before it's eased. Ask what they wish they'd done, then whether there's anyone they'd still like to say it to.`]
    ] },
  { id: 'signs', ring: 'last', title: `What dying looks like`, story: ``,
    keys: `signs of dying, death rattle, gurgling, mottling, blotchy skin, breathing stops, pauses, Cheyne-Stokes, cold hands, active dying, transitioning, how long, final hours, restless, sleeping all the time`,
    parts: [
      ['what', `Weeks before: more sleep, less eating, less talking, a world that gets smaller. Turning inward is normal. Days before: confusion or restlessness, very little food or drink, longer sleep, cool hands and feet. Hours before: breathing changes, with pauses, then a few quick breaths. A rattling sound from the throat. Blotchy, purplish skin on the knees and feet (mottling). Less response.`],
      ['say', `"These changes are the body slowing down. They usually bother us more than they bother her."`],
      ['helps', `Keep talking to them. Moisten their lips. Play their music. Call the nurse for restlessness, grimacing, or anything that looks like distress.`],
      ['dont', `"Any minute now." Nobody knows the minute.`],
      ['helper', `If you're helping the family: explain the changes in calm, simple words ("The body is slowing down"). Give them ways to help: keep talking, moisten lips, play music softly. Leave the timing alone; guesses like "any minute now" lead to exhausting vigils. Look after the watchers: who hasn't eaten, slept, or stepped outside? Call the nurse for anything that looks like distress.`],
      ['pro', `Name what you see in plain words before anyone has to ask, and say what the nurse will check. A calm voice tells the family what is expected and what is not.`]
    ] },
  { id: 'starving', ring: 'last', title: `"Are they starving?"`, story: ``,
    keys: `not eating, stopped drinking, starving, dehydrated, thirsty, feeding tube, IV fluids, dry mouth, can't swallow`,
    parts: [
      ['what', `The body can't use food anymore. Not eating is part of dying, not the cause of it. A dying person usually doesn't feel hunger or thirst.`],
      ['say', `"You've fed her your whole life. Now love looks like ice chips and lip balm."`],
      ['dont', `Force food or fluids. It can cause bloating, nausea, choking, and trouble breathing.`],
      ['helps', `Comfort feeding by hand, only what they want. Mouth care. Sitting together at the table, even if they don't eat.`],
      ['helper', `If you're helping the family: explain simply that the body can no longer use food, and that not eating is part of dying, not the cause. Show them mouth care and comfort feeding, only what the person wants. Honor the grief; food is love in almost every family. Bring the family a meal, and bring in the nurse if a feeding tube or IV comes up.`],
      ['pro', `Honor the grief under the question before giving facts: for many families, feeding is how they say I love you. Offer new ways to give it, like mouth care or a favorite taste, and bring in the nurse for any talk of tubes or IV fluids.`],
      ['faith', `Food is love in almost every culture. Honor that grief. If a feeding tube or IV comes up, bring in the nurse and their clergy.`]
    ] },
  { id: 'hear', ring: 'last', title: `"Can they hear me?"`, story: `Drift Away`,
    keys: `can they hear me, unresponsive, coma, hearing, talk to them`,
    parts: [
      ['know', `Hearing may be one of the last senses to go. In a hospice study, unresponsive patients' brains still responded to sound in their last hours. We can't know how much they understand.`],
      ['say', `"Keep talking to her. Tell her who's here. Say what you want to say."`],
      ['helps', `Speak to them, not about them. Phone calls held to their ear. Their favorite voice reading their favorite words.`],
      ['helper', `If you're helping the family: model it. Say the person's name, tell them who you are, and speak to them, not about them, even with others in the room. Help hold a phone to their ear for family far away. Families often follow your lead.`],
      ['pro', `Show the family how: greet the person by name, say who is in the room, and speak to them, not about them. Families often follow your lead.`]
    ] },
  { id: 'visions', ring: 'last', title: `"They're seeing people who've died."`, story: `Welcome Home`,
    keys: `talking to dead relatives, seeing mom, visions, dreams, reaching up, angels, ghosts`,
    parts: [
      ['what', `Dreams and visions near the end are common, especially of loved ones who've died. They usually bring comfort, and they come more often as death gets closer. They're different from confusion.`],
      ['say', `"Who's here?" "What are they saying?" Ask, don't correct.`],
      ['dont', `"There's no one there." Don't call it crazy.`],
      ['means', `Often that death is getting closer. Say it gently, and in person if you can. "We might be getting close. Can I come by?"`],
      ['helper', `If you're helping the family: encourage them to ask, not correct ("Who's here? What are they saying?"). Visions usually bring comfort. If you need to share that death may be getting closer, say it gently and in person if you can: "We might be getting close. Can I come by?"`],
      ['pro', `Ask what they're seeing and how it feels to them before anyone explains it. Let the nurse know, and call right away when a vision brings fear or agitation.`]
    ] },
  { id: 'hanging', ring: 'last', title: `"Why are they hanging on?"`, story: `Please Help My Dad Die`,
    keys: `hanging on, waiting, permission to go, letting go, why so long`,
    parts: [
      ['what', `Some people seem to wait: for a visitor, a date, permission. Bedside workers see it often, though no one can prove why.`],
      ['say', `"Is there anyone they might be waiting for? Anything left unsaid?"`],
      ['helps', `The Four Things. Telling them, once, that they can go when they're ready. A quiet room.`],
      ['helper', `If you're helping the family: offer the two questions (anyone they might be waiting for? anything left unsaid?), the Four Things, and a quiet room. Look after the people who have been waiting the longest; take a shift so they can sleep.`],
      ['pro', `Gently explore what may still be held: someone to see, something to say, permission to go. Carry the person's wish, not anyone's timeline, yours included.`]
    ] },
  { id: 'rally', ring: 'last', title: `The rally`, story: ``,
    keys: `rally, surge, burst of energy, suddenly better, woke up, terminal lucidity`,
    parts: [
      ['what', `Sometimes a person who's been unresponsive wakes up, talks, eats, recognizes everyone. It's real, and it's often brief.`],
      ['say', `"This is a gift. Use it to say what you want to say."`],
      ['dont', `Read it as recovery without talking to the nurse. Gently prepare the family that it may not last.`],
      ['helper', `If you're helping the family: celebrate the gift, and gently prepare them that it may not last. Help them call family who want to come, take a photo or recording if they want one, and say the important words today. Encourage a talk with the nurse before reading it as recovery.`],
      ['pro', `Help the family use the rally for what matters, a few words, a call, a photo, without reading it as recovery. Check in afterward, since the decline that follows can feel like losing them twice.`]
    ] },
  { id: 'kids', ring: 'last', title: `Talking with children`, story: ``,
    keys: `kids, children, grandkids, explain to child, tell my kids`,
    parts: [
      ['say', `"Grandma is dying. Her body is very sick and it's stopping working." Use the word "died," not "sleeping" or "lost." Children take words literally.`],
      ['helps', `Honest, short answers, repeated as often as they ask. Letting them help: drawing, choosing music, telling a story. Letting them choose whether to visit. Dougy Center tip sheets; Maple and Aspen guides for kids.`],
      ['helper', `If you're helping the grown-up who has to tell the kids: remind them that short and honest is enough, and "I don't know" is okay. Be there for the talk if they want you. Give the kids a job (drawing, music, a story), and expect the same questions again and again; that is how kids understand.`],
      ['pro', `Ask the grown-ups what the children already know and what words their family uses, then help them say "died" plainly. Offer each child a small job at the bedside and a real choice about being there.`],
      ['faith', `"Different people believe different things about what happens. In our family, we believe..."`]
    ] },
  { id: 'notthere', ring: 'last', title: `"I wasn't there when they died."`, story: `If She Is Still Here`,
    keys: `wasn't there, died alone, died when I left, missed it, stepped out`,
    parts: [
      ['what', `Guilt that lands hard, often on the person who was there the most.`],
      ['say', `"You were there for so much of it. That's what they knew." "Some people seem to wait until their loved ones step out. Bedside workers see it often."`],
      ['dont', `"You should have stayed."`],
      ['helps', `A ritual of your own goodbye, now. A letter. Sitting with the body if it's still there.`],
      ['helper', `If you're comforting someone who missed it: name everything they did do, specifically: the meals, the nights, the hand they held. Share that some people seem to wait until loved ones step out. Help them find their own goodbye: a letter, a ritual, a quiet moment.`],
      ['pro', `Guilt often lands on the one who was there the most. Name how much of the journey they were present for, offer a goodbye ritual now, and let bereavement know if the guilt holds on.`]
    ] },
  { id: 'firsthour', ring: 'last', title: `The first hour after death`, story: ``,
    keys: `what to do after death, who to call, they died, funeral home, first hour`,
    parts: [
      ['helps', `No rush. Nothing has to happen right away. Call the hospice, not 911. Sit. Hold their hand. Say goodbye. Let the kids come in if they want. Do your tradition's ritual: prayers, washing, the Shahada, chanting, keeping the body undisturbed, a shomer. Check the tradition card. The hospice nurse comes to confirm the death and help with the next steps, including the funeral home.`],
      ['say', `"Take all the time you need."`],
      ['helper', `If you're with the family: tell them there is no rush. Make the call to the hospice, not 911. Ask what matters to them in this hour, welcome the kids if they want to come in, and keep the room calm. Water, a chair, and a hug go a long way.`],
      ['pro', `Slow the room down: there is no rush, and the family can sit, touch, wash, or pray as their tradition asks. Check the tradition card, and offer to stay until the nurse arrives.`]
    ] },
  { id: 'official', ring: 'last', title: `Making it official in Minnesota`, story: ``,
    keys: `health care directive, advance directive, health care agent, POA, POLST, DNR, Honoring Choices, Go Wish`,
    parts: [
      ['helps', `Health care directive: free forms from Honoring Choices Minnesota, in eight languages, with help available in St. Cloud. Health care agent: the person who speaks for them if they can't. Choose someone who will honor their wishes, not their own. POLST: the medical order about treatments in an emergency, signed with their doctor. Talk tools: The Conversation Project's free guides, and the Go Wish card game.`],
      ['say', `"Writing it down is a gift to your family. They won't have to guess."`],
      ['helper', `If you're helping someone with their papers: keep their wishes in their own words. Help them choose an agent who will honor their wishes, even if that isn't you. Know where the papers are, and ask the hospice social worker for help with any step.`],
      ['pro', `Help them name who should speak for them and say what matters most out loud before any form is signed. The forms come easier once the conversation has happened.`]
    ] },
  { id: 'relief', ring: 'last', title: `"Is it okay that I feel relieved?"`, story: `Grief Debt`,
    keys: `relief, relieved, guilty for relief, numb, after`,
    parts: [
      ['say', `"Yes. Relief and grief can live in the same heart. Relief usually means the suffering is over, for both of you."`],
      ['helps', `Naming it out loud. Hospice bereavement support, which runs for about a year after the death.`],
      ['helper', `If you're supporting someone who feels relieved: say yes, out loud. Listen without flinching, point them to hospice bereavement support (about a year), and check in later, weeks and months after, when others have moved on.`],
      ['pro', `Give relief permission before anyone has to defend it, especially after a long stretch of caregiving. Mention bereavement support early, and notice who seems to carry the most guilt about feeling relieved.`]
    ] }
];

window.WILLOW_GUIDES = { labels: LABELS, rings: RINGS, foot: FOOT, tool: TOOL, guides: G };
})();
