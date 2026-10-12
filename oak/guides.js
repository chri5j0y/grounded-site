/* =====================================================================
   OAK . WHEN LIFE CHANGES
   Guides for 50+ of life's hardest seasons, for the person going
   through it and for the person helping.
   Edit guide words here, not in index.html. Oak and the site-wide
   search on the Tools page both read this file.

   Each guide: id (used in links, like /oak/#life=anxiety), ring,
   title, keys (search words), parts, quick, feel, self {first, helps,
   tell, people}, helper {feel, say, avoid, help, you}, faith,
   practices (must match practice guides in index.html), reach, more,
   and kids (a Maple guide id, optional).
   ===================================================================== */
(function(){
const LC_RINGS = [
  { key: "inside", name: "Inside Me", color: "#8B5E1A", blurb: "The weather inside you." },
  { key: "loss", name: "Loss and Grief", color: "#6B4226", blurb: "When someone or something you love is gone." },
  { key: "health", name: "Health and the End of Life", color: "#A8542E", blurb: "Bodies, illness, caregiving, and the last threshold." },
  { key: "family", name: "Relationships and Family", color: "#B5824A", blurb: "When the people closest to you change." },
  { key: "work", name: "Work and Money", color: "#4A5D3A", blurb: "When the ground under your life shifts." },
  { key: "faith", name: "Faith and Meaning", color: "#6E4A14", blurb: "When the sacred feels far, or the questions get loud." },
  { key: "world", name: "Community, Country, and World", color: "#3F6E7A", blurb: "When the news comes close to home." },
  { key: "safety", name: "Safety", color: "#9C2F2F", blurb: "When someone is in danger. Start here." }
];
const SAP = "https://growwithgrounded.com/maple/#talk=";
const L = {
  lifeline: ["988 Suicide and Crisis Lifeline", "https://988lifeline.org"],
  afsp: ["American Foundation for Suicide Prevention", "https://afsp.org"],
  hope: ["Alliance of Hope for Suicide Loss Survivors", "https://allianceofhope.org"],
  nami: ["NAMI (National Alliance on Mental Illness)", "https://www.nami.org"],
  apa: ["American Psychological Association", "https://www.apa.org/topics"],
  gg: ["Greater Good Science Center (UC Berkeley)", "https://greatergood.berkeley.edu"],
  dougy: ["The Dougy Center", "https://www.dougy.org"],
  wyg: ["What's Your Grief", "https://whatsyourgrief.com"],
  tcf: ["The Compassionate Friends", "https://www.compassionatefriends.org"],
  share: ["Share Pregnancy and Infant Loss Support", "https://nationalshare.org"],
  psi: ["Postpartum Support International", "https://www.postpartum.net"],
  ambiguous: ["Ambiguous Loss (Pauline Boss)", "https://www.ambiguousloss.com"],
  caringinfo: ["CaringInfo: advance directives by state", "https://www.caringinfo.org"],
  convo: ["The Conversation Project", "https://theconversationproject.org"],
  caregiver: ["Family Caregiver Alliance", "https://www.caregiver.org"],
  alz: ["Alzheimer's Association", "https://www.alz.org"],
  samhsa: ["SAMHSA National Helpline", "https://www.samhsa.gov/find-help/national-helpline"],
  resolve: ["RESOLVE: The National Infertility Association", "https://resolve.org"],
  hotline: ["National Domestic Violence Hotline", "https://www.thehotline.org"],
  rainn: ["RAINN", "https://www.rainn.org"],
  nfcc: ["National Foundation for Credit Counseling", "https://www.nfcc.org"],
  career: ["CareerOneStop", "https://www.careeronestop.org"],
  braver: ["Braver Angels", "https://braverangels.org"],
  voa: ["Shay Moral Injury Center (Volunteers of America)", "https://www.voa.org/moral-injury-center"],
  ilrc: ["Immigrant Legal Resource Center: Family Preparedness Plan", "https://www.ilrc.org/resources/step-step-family-preparedness-plan"],
  informed: ["Informed Immigrant", "https://www.informedimmigrant.com"],
  redcross: ["American Red Cross", "https://www.redcross.org"],
  nctsn: ["National Child Traumatic Stress Network", "https://www.nctsn.org"]
  ,ptsd: ["National Center for PTSD (VA)", "https://www.ptsd.va.gov"],
  disabilityhub: ["Disability Hub MN", "https://disabilityhubmn.org"],
  cmsac: ["Central Minnesota Sexual Assault Center, 320-251-4357", "tel:+13202514357"],
  mmh: ["National Maternal Mental Health Hotline, 1-833-852-6262", "tel:+18338526262"],
  mndoc: ["Minnesota Department of Corrections", "https://mn.gov/doc/"],
  m211: ["211, United Way", "https://www.211unitedway.org"],
  vcl: ["Veterans Crisis Line", "https://www.veteranscrisisline.net"],
  mdva: ["Minnesota Department of Veterans Affairs", "https://mn.gov/mdva/"]
};

const LC_TOPICS = [
/* ================= INSIDE ME ================= */
{ id: "anxiety", ring: "inside", title: "Anxiety That Won't Settle", keys: "anxiety worry panic nervous racing thoughts cant sleep dread", parts: ["bark", "leaves"],
  quick: ["Anxiety is your alarm system working too hard, not a flaw in you.", "Calm the body first. The mind follows the body more than the other way around.", "Name the worry, then ask what is true right now, in this room.", "Small, steady steps toward what you fear shrink it. Avoiding it feeds it."],
  feel: "A tight chest, a racing mind, a sense that something bad is coming even when nothing is wrong. Some people feel it as irritability, stomach trouble, or waking at 3am with a list of dreads.",
  self: { first: ["Slow your breath: in for four, out for six, for two minutes.", "Write the worry down so it stops circling.", "Cut back on caffeine and late-night scrolling for a week and notice the difference."],
    helps: ["Daily movement, even a short walk.", "A worry window: fifteen minutes a day to think it through, then set it down.", "Telling one person the truth about how you feel."],
    tell: ["“This is a feeling, not a forecast.”", "“I have handled hard things before.”", "“I only have to do the next small thing.”"],
    people: "You don't need a perfect explanation. Try: “I've been really anxious lately. I don't need you to fix it. It just helps to say it.”" },
  helper: { feel: "They may feel embarrassed, exhausted, and afraid you'll think they are overreacting.",
    say: ["“That sounds really hard to carry. I'm glad you told me.”", "“What helps when it gets like this?”", "“Want to take a walk with me?”"],
    avoid: ["“Just relax” or “Stop worrying.”", "Arguing with every fear point by point.", "Taking over everything so they never face the hard thing."],
    help: ["Breathe slowly with them.", "Offer a steady routine: a walk, a meal, a check-in call.", "Encourage professional help if it's lasting weeks."],
    you: "Their anxiety can stir your own. Keep your own practices, and remember you are a companion, not a cure." },
  faith: "Many traditions hold words for anxious hearts: a breath prayer, a psalm, a practice of handing over what you can't control. You can reach for peace from right where you are.",
  practices: ["leaves|Breathe", "bark|Meditation", "bark|Mindfulness", "leaves|Movement"],
  reach: ["Panic attacks, or anxiety that keeps you from work, sleep, or relationships for more than a few weeks.", "Any thoughts of harming yourself: call or text 988."],
  more: [L.nami, L.apa], kids: "worry" },

{ id: "sadness", ring: "inside", title: "Sadness That Lingers", keys: "depression depressed sad low numb empty hopeless tired down", parts: ["fruit", "leaves", "branches"],
  quick: ["Lingering sadness is common and treatable. It is not a character flaw.", "Lower the bar. On heavy days, small care counts.", "Isolation deepens it. Connection, even brief, helps.", "If hope feels gone, tell someone today."],
  feel: "Heavy, flat, or numb. Things you used to enjoy feel pointless. Sleep, appetite, and energy change. Some people feel irritable more than sad.",
  self: { first: ["Do one small caring thing today: shower, eat something real, step outside.", "Tell one person how you are really doing.", "Book a visit with your doctor or a counselor."],
    helps: ["Morning light and gentle movement.", "Keeping a simple daily rhythm.", "Being around people, even without talking much."],
    tell: ["“This is an illness talking, not the truth about me.”", "“Small steps still count.”", "“I don't have to feel better to take the next step.”"],
    people: "Try: “I've been struggling more than I've let on. Could you check in on me this week?”" },
  helper: { feel: "They may feel like a burden, and may pull away from the very people who can help.",
    say: ["“I've noticed you seem down, and I care about you.”", "“You don't have to explain it. I'm here.”", "“Are you having any thoughts of ending your life?” Asking directly is safe and caring."],
    avoid: ["“Look on the bright side.”", "“Others have it worse.”", "Disappearing because you don't know what to say."],
    help: ["Invite them to small, low-pressure things.", "Help with a practical task: a meal, a ride, a call.", "Help them find a doctor or counselor, and follow up."],
    you: "Supporting someone who is depressed is tiring. Keep your own supports, and share the load with others." },
  faith: "Lament is one of the oldest forms of prayer. Your tradition likely has room for sorrow that doesn't resolve quickly. Being carried by a community on dark days is itself a kind of faith.",
  practices: ["leaves|Sleep", "leaves|Movement", "branches|Friends", "trunk|Get Counseling"],
  reach: ["Sadness lasting more than two weeks, or getting in the way of daily life.", "Thoughts of death or suicide: call or text 988 now."],
  more: [L.nami, L.lifeline], kids: "sadness" },

{ id: "loneliness", ring: "inside", title: "Loneliness", keys: "lonely alone isolated no friends disconnected", parts: ["branches", "fruit"],
  quick: ["Loneliness is a signal, like hunger, telling you that you need connection.", "Start small and repeat: the same coffee shop, the same class, the same walk.", "Reach out first. Most people are waiting for someone else to.", "Being alone and being lonely are different. Both are okay to name."],
  feel: "An ache even in a crowded room. Weekends feel long. You may feel invisible, or tell yourself nobody would want to hear from you.",
  self: { first: ["Text one person today, just to say you thought of them.", "Say yes to one small invitation this week.", "Find one regular group: faith community, class, volunteer shift."],
    helps: ["Showing up to the same place repeatedly so faces become familiar.", "Serving others, which connects without pressure.", "Phone or video calls with people far away."],
    tell: ["“Needing people is human, not needy.”", "“One real connection is a good start.”"],
    people: "Try: “I've been feeling pretty isolated. Want to get coffee next week?”" },
  helper: { feel: "They may feel ashamed to admit it, and may not reach out even when they want to.",
    say: ["“I'd love to see you. Are you free Thursday?”", "“I've missed you.”"],
    avoid: ["“You should get out more.”", "One-time contact, then silence."],
    help: ["Make a regular plan: a weekly walk or call.", "Invite them into your circles.", "Notice people who have recently lost a spouse, moved, or retired."],
    you: "You can't be someone's only connection. Help them build more than one." },
  faith: "Faith communities were built for belonging. If yours feels far, look for small groups, service teams, or a friendly chaplain who can help you find a way in.",
  practices: ["branches|Friends", "branches|Neighbors", "branches|Clubs", "fruit|Volunteer"],
  reach: ["Loneliness that has turned into lasting sadness or hopelessness."],
  more: [L.apa, L.gg] },

{ id: "burnout", ring: "inside", title: "Burnout", keys: "burnout exhausted overwhelmed tired stress work caregiver fatigue compassion fatigue", parts: ["leaves", "trunk", "bark"],
  quick: ["Burnout is what happens when you give more than you refill for too long.", "Rest is not a reward for finishing. It is part of the work.", "Name what drains you and what refills you, then protect one refill every day.", "For helpers, compassion fatigue is real. It is a sign of care, not weakness."],
  feel: "Tired in a way sleep doesn't fix. Cynical, numb, or short with people you love. The things that used to matter feel like chores.",
  self: { first: ["Cancel or delegate one thing this week.", "Protect one full night of sleep.", "Write down what drains you and what refills you."],
    helps: ["Clear stopping points to your day.", "Time outside and away from screens.", "Talking with peers who understand your work."],
    tell: ["“I am allowed to rest before everything is done.”", "“Saying no to this is saying yes to something that matters more.”"],
    people: "Try: “I'm running on empty. I need help with a few things for a while.”" },
  helper: { feel: "They may feel guilty for being tired and afraid of letting people down.",
    say: ["“You've been carrying a lot. What could I take off your plate?”", "“You deserve rest too.”"],
    avoid: ["“Just take a vacation.”", "Adding more requests."],
    help: ["Take a specific task, not a vague offer.", "Cover a shift or a school pickup.", "Encourage real time off."],
    you: "If you work in a caring profession, burnout may be showing up in you too. Check your own tank." },
  faith: "Many traditions practice sabbath: a regular time to stop, rest, and remember you are more than what you produce.",
  practices: ["leaves|Sleep", "leaves|Breathe", "bark|Playing", "roots|Ritual"],
  reach: ["Exhaustion that doesn't improve with rest, or signs of depression.", "Thoughts of escaping your life or not being here: call or text 988."],
  more: [L.apa, L.caregiver] },

{ id: "anger", ring: "inside", title: "Anger That Runs Hot", keys: "anger angry rage irritable temper resentment snapping", parts: ["bark", "branches"],
  quick: ["Anger often guards something softer: hurt, fear, grief, or feeling unheard.", "Cool the body before you use your words.", "Anger can point to something that truly needs to change.", "Repair after a blowup matters more than never having one."],
  feel: "A quick fuse, a clenched jaw, replaying arguments. Sometimes it comes out at the wrong people, like kids or coworkers.",
  self: { first: ["When it rises, step away for twenty minutes before responding.", "Move your body: walk fast, lift, stretch.", "Ask: what is under this anger?"],
    helps: ["Naming the need behind the anger out loud.", "Regular exercise and enough sleep.", "Apologizing specifically after you've hurt someone."],
    tell: ["“My anger is information, not instructions.”", "“I can feel this and still choose what I do.”"],
    people: "Try: “I've been short-tempered lately, and I'm sorry. I'm working on it.”" },
  helper: { feel: "They may feel ashamed afterward, or may not see how their anger lands.",
    say: ["“I can tell you're really upset. I want to understand.”", "“Let's take a break and come back to this.”"],
    avoid: ["Meeting anger with anger.", "Staying in any situation that feels unsafe."],
    help: ["Talk when things are calm.", "Name the impact kindly and clearly.", "Encourage support if anger is damaging relationships."],
    you: "Your safety comes first. If anger turns threatening, see the guide on domestic violence." },
  faith: "Many traditions honor righteous anger at injustice, and also teach that anger held too long poisons the one who carries it.",
  practices: ["leaves|Movement", "leaves|Breathe", "fruit|Make Peace", "trunk|Journal Often"],
  reach: ["Anger that leads to violence, threats, or frightened family members.", "Anger that masks deep depression or trauma."],
  more: [L.apa] },

{ id: "shame", ring: "inside", title: "Shame and Guilt", keys: "shame guilt regret failure mistake unworthy bad person", parts: ["roots", "trunk"],
  quick: ["Guilt says “I did something wrong.” Shame says “I am wrong.” Only one of those is true.", "Guilt can lead to repair. Shame usually leads to hiding.", "Shame shrinks when it is spoken to someone safe.", "You can take responsibility and still treat yourself with kindness."],
  feel: "A heavy sense of being bad, not enough, or beyond forgiving. You may replay mistakes, hide, or overwork to prove your worth.",
  self: { first: ["Write down what happened, plainly, without the story you tell about yourself.", "Ask: is there something I can repair?", "Tell one trusted person."],
    helps: ["Making amends where you can.", "Speaking to yourself the way you would speak to a friend.", "Confession, in whatever form your tradition offers."],
    tell: ["“I made a mistake. I am not a mistake.”", "“I can learn from this and keep going.”"],
    people: "Try: “I've been carrying something heavy, and I'd like to talk about it with someone who won't judge me.”" },
  helper: { feel: "They may expect rejection. Your response will shape whether they ever tell anyone again.",
    say: ["“Thank you for trusting me with that.”", "“That doesn't change how I see you.”"],
    avoid: ["Minimizing real harm they caused.", "Piling on judgment."],
    help: ["Help them think about repair.", "Stay close after they share."],
    you: "Listening to confession is holy work. Keep what you hear confidential unless someone is in danger." },
  faith: "Most traditions have paths of confession, forgiveness, and restoration. Grace doesn't erase responsibility; it makes it possible to carry.",
  practices: ["roots|Prayer", "fruit|Make Peace", "trunk|Get Counseling", "trunk|Journal Often"],
  reach: ["Shame tied to trauma or abuse.", "Thoughts that you'd be better off dead: call or text 988."],
  more: [L.apa, L.gg] },

{ id: "lost", ring: "inside", title: "Feeling Lost or Without Purpose", keys: "purpose meaning lost direction stuck empty why", parts: ["trunk", "fruit"],
  quick: ["Seasons without clear purpose are normal, especially after change.", "Purpose is usually found in doing, not just thinking.", "Start with what breaks your heart or lights you up.", "Serve someone. Meaning often shows up in the act of helping."],
  feel: "Going through the motions. Wondering what it's all for. Restless, flat, or quietly grieving a life you expected to have.",
  self: { first: ["List three moments when you felt most alive.", "Try one new thing this month.", "Give an hour to helping someone."],
    helps: ["Writing about your story and what it has taught you.", "Conversations with people who have walked through similar seasons.", "Small commitments you can keep."],
    tell: ["“This is a season, not a sentence.”", "“I don't need the whole map to take the next step.”"],
    people: "Try: “I feel kind of lost right now. Can I talk it through with you?”" },
  helper: { feel: "They may feel embarrassed not to have it figured out.",
    say: ["“What used to make you come alive?”", "“It's okay to not know yet.”"],
    avoid: ["Handing them your answer for their life."],
    help: ["Invite them into meaningful work.", "Name the strengths you see in them."],
    you: "Accompany the question without rushing the answer." },
  faith: "Many traditions speak of calling, vocation, or a path revealed step by step. Discernment is a practice, not a single moment.",
  practices: ["trunk|Write Your Story", "trunk|Plan the Future", "fruit|Volunteer", "trunk|Keep Learning"],
  reach: ["Emptiness that becomes hopelessness or depression."],
  more: [L.gg] },

/* ================= SAFETY ================= */
{ id: "suicidal-self", ring: "safety", title: "When You're Thinking About Suicide", keys: "suicide suicidal kill myself want to die end my life no reason to live 988", parts: ["fruit", "roots", "branches"],
  quick: ["If you are in danger right now, call 911 or call or text 988.", "These thoughts are a sign of pain, not a plan you have to follow.", "Put distance between you and anything you could use to hurt yourself.", "Tell one person today. Others can help you carry this."],
  feel: "Unbearable pain, exhaustion, or numbness. A belief that things will never change, or that people would be better off without you. That belief is the pain talking, not the truth.",
  self: { first: ["Call or text 988 now, or text HOME to 741741.", "Move medications, firearms, or other dangers out of reach, or ask someone to hold them.", "Go where other people are."],
    helps: ["A written safety plan: warning signs, people to call, places to go.", "Getting care from a doctor or counselor, even if you've tried before.", "Getting through the next hour, then the next."],
    tell: ["“This feeling is real, and it can change.”", "“Reaching out is strength.”", "“I only need to stay safe right now.”"],
    people: "Try: “I'm not okay. I'm having thoughts of ending my life, and I need help.”" },
  helper: { feel: "They may feel hopeless, ashamed, and afraid of being a burden. See the next guide for helping someone.",
    say: ["“Are you thinking about killing yourself?”", "“I'm glad you told me. I'm staying with you.”"],
    avoid: ["Promising secrecy.", "Leaving them alone if they are in danger."],
    help: ["Call or text 988 together.", "Help remove means of harm."],
    you: "See the guide on when someone else is thinking about suicide." },
  faith: "You are loved beyond what you can feel right now. Many people who survived their darkest night describe being carried by grace, by community, and by professional care together.",
  practices: ["branches|Friends", "trunk|Get Counseling", "leaves|Breathe"],
  reach: ["Call or text 988, the Suicide and Crisis Lifeline, any time. Veterans: call 988 and press 1.", "Call 911 if you are in immediate danger.", "Crisis Text Line: text HOME to 741741."],
  more: [L.lifeline, L.afsp] },

{ id: "suicidal-other", ring: "safety", title: "When Someone Else Is Thinking About Suicide", keys: "suicide friend family worried talk about dying warning signs 988", parts: ["branches", "fruit"],
  quick: ["Ask directly: “Are you thinking about killing yourself?” It doesn't plant the idea.", "Listen without arguing or judging.", "Help keep them safe: reduce access to medications and firearms.", "Connect them to help today, and stay with them."],
  feel: "You may feel scared, helpless, or afraid of saying the wrong thing. The fact that you are asking already helps.",
  self: { first: ["Take a breath. Caring is enough to start.", "Call or text 988 yourself for guidance on what to do."],
    helps: ["Knowing the warning signs: talk of death, giving things away, saying goodbye, sudden calm after deep despair."],
    tell: ["“I can lean on others to help with this.”"],
    people: "Bring in other trusted people so you are not the only lifeline." },
  helper: { feel: "They may feel like a burden and may test whether you really want to hear.",
    say: ["“Are you thinking about ending your life?”", "“Thank you for telling me. I want to help you stay safe.”", "“Let's call 988 together.”"],
    avoid: ["“You don't really mean that.”", "Debating whether life is worth living.", "Promising to keep it secret."],
    help: ["Stay with them if they are in danger, and call 911 if needed.", "Help secure medications and firearms.", "Follow up in the days and weeks after."],
    you: "Supporting someone through this is heavy. Get support for yourself, too." },
  faith: "Presence is one of the most sacred things you can offer. Sitting with someone in the dark, and getting them to help, is holy work.",
  practices: ["branches|Friends", "trunk|Get Counseling"],
  reach: ["Call or text 988 any time, including for advice on how to help.", "Call 911 in immediate danger."],
  more: [L.lifeline, L.afsp, L.nami] },

{ id: "escalating", ring: "safety", title: "When Someone Is Escalating", keys: "de-escalate deescalate de-escalation escalating escalation yelling screaming shouting agitated heated confrontation blowup blow up losing it angry person family member staff bedside hospital workplace coworker customer patient visitor", parts: ["bark", "branches"],
  quick: ["Calm yourself first: slow breath, lower voice, relaxed hands. Your body sets the temperature of the room.", "Listen for the feeling under the words: fear, grief, exhaustion, or feeling unheard.", "Say less. Short, respectful sentences. Save the facts for when feelings settle.", "If there is a weapon, a threat, or you feel unsafe, leave and call 911."],
  feel: "A voice rises, a body tightens, someone moves toward you or starts pacing. You may feel your own heart pound, your face get hot, or an urge to fight back, freeze, or fix it fast. It can happen at home, at work, in a store, or at a bedside, where grief and fear often come out as anger at whoever is closest.",
  self: { first: ["Step back to give space, about two arm's lengths, and stand a little to the side, not face to face.", "Take one slow breath before you say anything.", "Lower your volume and slow your pace. People often match you without knowing it."],
    helps: ["Naming what you see: “You're really frustrated. This matters to you.”", "Offering a small choice: “Do you want to sit down, or step outside with me?”", "Setting one clear limit, calmly, if you need to: “I want to help. I can't keep talking while you're yelling at me.”"],
    tell: ["“This is not about me, even if it's aimed at me.”", "“I don't have to win this. I have to keep everyone safe.”", "“I can leave. Leaving is allowed.”"],
    people: "Afterward, tell someone you trust, even if it ended fine. Try: “Something got really heated today, and I'm still shaky. Can I tell you about it?”" },
  helper: { feel: "The person escalating is often scared, grieving, in pain, or feeling powerless. Many feel embarrassed once they come down.",
    say: ["“I can hear how upset you are. I'm listening.”", "“Help me understand what you need right now.”", "“Let's take a minute. I'll stay right here.”", "“Let's figure out the next step together.”"],
    avoid: ["Telling them to calm down, or arguing about who's right.", "Crossed arms, pointing, sudden moves, or standing between them and the door.", "Touching them, or crowding them with more people.", "Promises you can't keep just to end it."],
    help: ["Move the conversation somewhere quieter, with fewer people watching.", "Let one person do the talking.", "Offer something concrete: water, a chair, a phone call, a clear answer to their question.", "Know your way out, and call for help early rather than late."],
    you: "Even when it goes well, your body holds the adrenaline for a while. Walk, drink water, and debrief with a coworker or friend. If it keeps happening where you work, ask for de-escalation training and a safety plan." },
  faith: "An old proverb says a gentle answer turns away wrath, and many traditions call peacemaking holy work. Sometimes the most spiritual thing you can do in a heated room is breathe slowly, lower your voice, and see the frightened person under the anger.",
  practices: ["leaves|Breathe", "bark|Mindfulness", "fruit|Make Peace", "branches|Colleagues"],
  reach: ["Anyone has a weapon, makes a threat, or you feel unsafe: leave and call 911.", "The person talks about hurting themselves or not wanting to be alive: stay with them if it's safe, and call or text 988.", "Blowups keep happening at home and you feel afraid: see the guide “When home isn't safe.”"],
  more: [L.apa, ["Crisis Prevention Institute", "https://www.crisisprevention.com"]], kids: "meltdown" },

{ id: "domestic-violence", ring: "safety", title: "When Home Isn't Safe", keys: "domestic violence abuse partner hitting controlling threatened afraid of partner", parts: ["branches", "roots"],
  quick: ["Abuse is never your fault, and you deserve to be safe.", "Abuse includes control, threats, isolation, and money control, not only hitting.", "Leaving can be the most dangerous time. Plan with an advocate.", "Help is confidential and free, 24 hours a day."],
  feel: "Walking on eggshells, doubting yourself, feeling trapped or ashamed. You may love the person and fear them at the same time.",
  self: { first: ["Call the National Domestic Violence Hotline at 1-800-799-7233, or text START to 88788.", "If you are in danger now, call 911.", "Think about safe people and places you could go."],
    helps: ["A safety plan made with an advocate.", "Keeping important documents and a phone charger somewhere safe.", "Clearing your browser if someone monitors your devices."],
    tell: ["“This is not my fault.”", "“I deserve to be safe.”"],
    people: "Try telling one trusted person: “Things at home aren't safe. I need help thinking this through.”" },
  helper: { feel: "They may feel ashamed, afraid, or not ready to leave. Leaving often takes several attempts.",
    say: ["“I believe you.”", "“It's not your fault.”", "“I'm here, whatever you decide.”"],
    avoid: ["“Why don't you just leave?”", "Confronting the abuser yourself."],
    help: ["Share the hotline number privately.", "Offer a safe place or practical help.", "Stay in touch without judgment."],
    you: "If children are in danger, report it. Your safety matters too." },
  faith: "No tradition requires anyone to stay in danger. Many faith leaders now recognize this clearly. Your safety honors the sacredness of your life.",
  practices: ["branches|Friends", "trunk|Get Counseling"],
  reach: ["National Domestic Violence Hotline: 1-800-799-7233, or text START to 88788.", "Call 911 if you are in immediate danger."],
  more: [L.hotline], kids: "home-conflict" },

{ id: "past-abuse", ring: "safety", title: "Living with Past Abuse", keys: "abuse trauma childhood sexual abuse survivor memories flashbacks", parts: ["roots", "bark", "leaves"],
  quick: ["What happened was not your fault.", "Trauma lives in the body. Healing often involves the body, too.", "You get to decide who you tell, and when.", "Healing is possible, and it often happens with skilled help."],
  feel: "Memories or flashbacks, feeling unsafe in your body, trouble trusting, sudden anger or numbness. Anniversaries, touch, or smells can bring it back.",
  self: { first: ["Find one grounding practice for hard moments: feet on the floor, name five things you can see.", "Consider a trauma-informed counselor.", "RAINN offers confidential support at 1-800-656-4673."],
    helps: ["Safe relationships and routines.", "Body-based practices like walking, breathing, and gentle movement.", "Going at your own pace."],
    tell: ["“I survived. I am more than what happened to me.”", "“My reactions made sense for what I lived through.”"],
    people: "You don't owe anyone your story. When you are ready, try: “Something happened to me a long time ago, and it still affects me.”" },
  helper: { feel: "They may be testing whether it's safe to say more.",
    say: ["“I believe you.”", "“Thank you for trusting me.”", "“It wasn't your fault.”"],
    avoid: ["Asking for details.", "Pushing them to confront anyone or report before they are ready."],
    help: ["Let them lead.", "Help them find trauma-informed care.", "Respect boundaries around touch and privacy."],
    you: "Hearing someone's trauma can affect you. Get support for yourself." },
  faith: "Some survivors were harmed by religious people or leaders. It is okay to heal your faith slowly, or to look for it in new places. The sacred is not the same as the people who misused it.",
  practices: ["leaves|Breathe", "trunk|Get Counseling", "bark|Mindfulness"],
  reach: ["RAINN National Sexual Assault Hotline: 1-800-656-4673.", "If a child is being harmed now, call 911 or child protective services."],
  more: [L.rainn, L.nami] },
/* ================= LOSS AND GRIEF ================= */
{ id: "spouse-death", ring: "loss", title: "Your Spouse or Partner Died", keys: "widow widower husband wife partner died spouse death grief", parts: ["branches", "fruit", "roots"],
  quick: ["Grief for a partner reshapes every part of daily life. Expect it to be hard for a long time.", "Avoid big decisions in the first year when you can.", "Let people help in specific ways, and tell them what you need.", "Grief comes in waves. A good day doesn't mean you're done, and a bad day doesn't mean you're stuck."],
  feel: "The house is too quiet. You reach for your phone to tell them something. Meals, bedtime, and weekends feel strange. You may feel lost, angry, numb, or even relieved after a long illness, and all of it is normal.",
  self: { first: ["Take care of the basics: sleep, water, food, medicines.", "Let one trusted person help you track paperwork and deadlines.", "Say yes to company, even if you don't feel like talking."],
    helps: ["Talking about them by name.", "A grief group with others who have lost a partner.", "Small new routines for the hardest times of day."],
    tell: ["“Grief has its own shape and its own timeline.”", "“Feeling joy again doesn't mean I've forgotten them.”"],
    people: "Try: “What helps most is if you check on me on Sunday evenings. That's the hardest time.”" },
  helper: { feel: "They may be overwhelmed by paperwork and advice, and lonely once the funeral crowds leave.",
    say: ["“I'm so sorry. I loved how he laughed at his own jokes.”", "“I'm bringing dinner Tuesday. Is 5 okay?”"],
    avoid: ["“They're in a better place” unless you know it comforts them.", "“At least you had many years together.”", "Disappearing after the first month."],
    help: ["Show up in month three, six, and twelve.", "Help with specific tasks: yard, car, forms.", "Say their partner's name."],
    you: "Their grief may touch your own losses. Take care of that, too." },
  faith: "Share what your tradition teaches about love and death if it comforts you, and let yourself have the questions that come too. Rituals, prayers for the dead, and remembrance days can hold what words can't.",
  practices: ["branches|Friends", "roots|Ritual", "trunk|Write Your Story", "leaves|Sleep"],
  reach: ["Grief that stays intense or gets worse after many months, or keeps you from daily life.", "Thoughts of wanting to join them: call or text 988."],
  more: [L.wyg, L.dougy], kids: "family-death" },

{ id: "parent-death", ring: "loss", title: "Your Parent Died", keys: "mom dad mother father parent died death grief", parts: ["roots", "branches", "trunk"],
  quick: ["Losing a parent can shake your sense of home, at any age.", "Complicated relationships bring complicated grief. All of it is valid.", "Family roles shift. Expect tension around decisions and belongings.", "Carry forward what you want to keep from them, and set down what you don't."],
  feel: "Sadness, relief, anger, regret, or feeling suddenly like the oldest generation. Small things, like their handwriting or a song, can undo you.",
  self: { first: ["Let yourself grieve even while handling logistics.", "Share the tasks with siblings or family where you can.", "Keep a few meaningful things before sorting everything."],
    helps: ["Telling stories about them.", "Writing a letter to them.", "Marking their birthday or death anniversary."],
    tell: ["“I can love them and still grieve what they couldn't give me.”", "“It makes sense that this hurts, no matter my age.”"],
    people: "Try: “I'm okay most days, but I'd love to talk about my dad sometime. I miss him.”" },
  helper: { feel: "They may be pulled between grief and a long list of tasks, and may feel alone if people assume adults 'expect' this.",
    say: ["“I'm so sorry about your mom. What was she like?”", "“This is a big loss, at any age.”"],
    avoid: ["“She lived a long life” as the first thing you say.", "Taking sides in family conflicts over the estate."],
    help: ["Help sort, clean, or pack.", "Bring food during the busy weeks.", "Remember the anniversary."],
    you: "If you've lost a parent, share gently, but keep the focus on them." },
  faith: "Many traditions honor parents after death through prayer, remembrance, or carrying on their values. You can choose which parts of their legacy you carry.",
  practices: ["trunk|Write Your Story", "roots|Ritual", "branches|Family"],
  reach: ["Grief that doesn't ease, or family conflict that feels unmanageable."],
  more: [L.wyg, L.dougy], kids: "family-death" },

{ id: "child-death", ring: "loss", title: "Your Child Died", keys: "child died son daughter death baby grief parent bereaved", parts: ["roots", "fruit", "branches"],
  quick: ["This is one of the deepest losses a person can face. There is no timeline.", "Your grief and your partner's may look very different. Both are real.", "Surviving siblings need honest words and attention too.", "You will always be their parent."],
  feel: "Unbearable, disorienting, and physically painful. You may feel the world should have stopped. Some parents feel intense guilt, anger at the sacred, or fear for their other children.",
  self: { first: ["Let others carry the practical things.", "Take one hour at a time.", "Ask your hospital, hospice, or funeral home about bereaved parent support."],
    helps: ["Groups with other bereaved parents, who understand without explanation.", "Keeping their memory present: saying their name, photos, rituals.", "Being gentle with your body."],
    tell: ["“My love for my child doesn't end.”", "“I am doing the best I can with an impossible loss.”"],
    people: "Try: “Please say her name. It means so much to hear it.”" },
  helper: { feel: "They may feel people avoid them, or say things that wound. Many bereaved parents say their friends disappear.",
    say: ["“I'm so sorry. I'm thinking of Sam today.”", "“I don't know what to say, but I'm here.”"],
    avoid: ["“Everything happens for a reason.”", "“You can have another child.”", "Comparing losses."],
    help: ["Say the child's name.", "Remember birthdays and anniversaries, for years.", "Care for surviving siblings."],
    you: "Being near this grief is hard. Stay anyway. Get support for yourself." },
  faith: "Many parents wrestle with the sacred after a child dies. Anger and silence can be prayers. Faith communities at their best simply stay, sit, and carry.",
  practices: ["branches|Friends", "roots|Ritual", "trunk|Get Counseling", "trunk|Journal Often"],
  reach: ["The Compassionate Friends supports bereaved parents and siblings.", "Any thoughts of not wanting to live: call or text 988."],
  more: [L.tcf, L.dougy], kids: "family-death" },

{ id: "pregnancy-loss", ring: "loss", title: "Pregnancy or Infant Loss", keys: "miscarriage stillbirth infant loss baby died pregnancy loss", parts: ["roots", "fruit", "leaves"],
  quick: ["This is a real loss of a real child and a hoped-for future.", "Your body may still be healing while your heart is breaking.", "Partners grieve too, sometimes differently.", "It is okay to name your baby, hold rituals, and grieve openly."],
  feel: "Empty arms, a body that still feels pregnant, guilt, jealousy of others' babies, or grief that others don't seem to see.",
  self: { first: ["Rest and follow up with your doctor.", "Ask for keepsakes if available: photos, footprints, a blanket.", "Tell people what you need, including privacy."],
    helps: ["Support groups for pregnancy and infant loss.", "Marking due dates and anniversaries.", "Being honest with yourself about triggers."],
    tell: ["“This was not my fault.”", "“My grief is as big as my love.”"],
    people: "Try: “We lost the baby. We'd love your support, and it helps when people acknowledge it.”" },
  helper: { feel: "They may feel their grief is invisible, and may be hurt by silence.",
    say: ["“I'm so sorry about your baby.”", "“Would you like to tell me about them?”"],
    avoid: ["“At least it was early.”", "“You can try again.”"],
    help: ["Bring meals, handle errands, and remember the due date."],
    you: "Be gentle if you are also expecting or have small children." },
  faith: "Many traditions have blessings, prayers, or naming rituals for babies who died. A faith leader can help create one if yours doesn't.",
  practices: ["roots|Ritual", "leaves|Sleep", "branches|Friends"],
  reach: ["Postpartum Support International helpline: 1-800-944-4773.", "Deep sadness that lingers, or any thoughts of harming yourself: call or text 988."],
  more: [L.share, L.psi], kids: "baby-loss"/* BLD787 pages-pregnancy-loss start */, pages: [["Making Memories with Your Baby", "ok-pg-baby-memories"]] /* BLD787 pages-pregnancy-loss end */ },

{ id: "suicide-loss", ring: "loss", title: "After a Suicide Loss", keys: "suicide loss died by suicide survivor grief why", parts: ["roots", "bark", "branches"],
  quick: ["Suicide grief often includes shock, guilt, anger, and endless “why” questions.", "It was not your fault. Suicide comes from a complex illness, not one thing anyone said or did.", "Speak about it honestly. Silence tends to deepen shame.", "Your own risk may rise. Take care of yourself and reach out."],
  feel: "Replaying the last conversation. Searching for what you missed. Anger at them, then guilt for the anger. Feeling isolated because people don't know what to say.",
  self: { first: ["Find a suicide loss survivors group.", "Tell your doctor what happened.", "Let others help with the tasks."],
    helps: ["Honest words: “died by suicide.”", "Remembering their whole life, not only the end.", "Counseling with someone experienced in suicide loss."],
    tell: ["“I could not have controlled their illness.”", "“It's okay to be angry and still love them.”"],
    people: "Try: “My brother died by suicide. I'd like to be able to talk about him openly.”" },
  helper: { feel: "They may feel judged or avoided. Many survivors say the silence hurts most.",
    say: ["“I'm so sorry. I'd love to hear about him.”", "“You can talk to me about it anytime.”"],
    avoid: ["Asking for details about how they died.", "“Didn't you see signs?”"],
    help: ["Check in often, especially in the first year.", "Remember hard dates.", "Watch for signs of risk in them, and ask directly if you are worried."],
    you: "This grief can stir your own fears. Get support if you need it." },
  faith: "Some families carry fear about faith and suicide. Many traditions today speak of mercy and understand suicide as the result of illness. A trusted faith leader can help.",
  practices: ["branches|Friends", "trunk|Get Counseling", "roots|Prayer"],
  reach: ["If you have thoughts of suicide: call or text 988.", "Alliance of Hope offers support for suicide loss survivors."],
  more: [L.hope, L.afsp], kids: "suicide-loss" },

{ id: "dying-loved", ring: "loss", title: "Someone You Love Is Dying", keys: "dying terminal hospice end of life anticipatory grief goodbye", parts: ["roots", "branches", "fruit"],
  quick: ["Grief often begins before the death. That's called anticipatory grief.", "Say what matters while you can: thank you, I'm sorry, I forgive you, I love you, goodbye.", "Hospice teams care for the whole family, including you. Use them.", "You can't do this perfectly. Presence is enough."],
  feel: "Exhausted, torn between hoping and preparing, guilty for wishing it were over, and afraid of the moment itself.",
  self: { first: ["Ask the care team what to expect in the coming days.", "Take shifts with family so you can sleep.", "Tell them what they mean to you."],
    helps: ["Hospice chaplains, social workers, and volunteers.", "Bringing familiar things: music, photos, scents.", "Letting yourself step out for air."],
    tell: ["“Being here is enough.”", "“I can grieve and hope at the same time.”"],
    people: "Try: “We're in the last weeks with Mom. I'd love help with meals and the kids.”" },
  helper: { feel: "They may be running on no sleep and fear, and may not know what they need.",
    say: ["“I'm thinking of you and your family.”", "“I can sit with him for two hours so you can rest.”"],
    avoid: ["Stories about other deaths.", "Pushing hope or cures they've let go of."],
    help: ["Bring food, handle errands, and care for pets and kids.", "Offer a few hours of company at the bedside."],
    you: "Being near a death is tender. Notice what it stirs in you." },
  faith: "Blessings, prayers, anointing, reading sacred words, or singing familiar songs can be powerful at the end of life. Invite your chaplain or faith leader in.",
  practices: ["roots|Prayer", "branches|Family", "fruit|Provide Care", "fruit|Capture the Moment"],
  reach: ["Ask hospice for chaplain or social work support.", "After the death, see the guide on the first days after a death."],
  more: [L.convo, L.dougy], kids: "dying" },

{ id: "ambiguous-loss", ring: "loss", title: "Ambiguous Loss", keys: "ambiguous loss estranged missing dementia addiction not the same person grief without death", parts: ["roots", "branches", "bark"],
  quick: ["Some losses have no clear ending: dementia, estrangement, addiction, a missing person.", "Grieving someone still living is real grief.", "Hold two truths: they are here, and they are gone in ways that matter.", "Find meaning without waiting for closure."],
  feel: "Stuck, confused, and unsure whether you are allowed to grieve. Others may not understand why you are so sad.",
  self: { first: ["Name it as grief.", "Find people who understand this kind of loss.", "Decide what connection is healthy right now."],
    helps: ["Both/and thinking: “She is still my mom, and I have lost her.”", "Rituals for what has changed.", "Counseling that understands ambiguous loss."],
    tell: ["“My grief makes sense, even without a funeral.”"],
    people: "Try: “I'm grieving my son even though he's alive. It's been hard to explain.”" },
  helper: { feel: "They may feel invisible in their grief.",
    say: ["“That sounds like a real loss.”", "“You don't have to have it resolved.”"],
    avoid: ["“At least they're still alive.”"],
    help: ["Check in regularly, without needing updates."],
    you: "Be patient. This kind of grief can last a long time." },
  faith: "Lament, prayer, and community can hold unresolved grief. Many traditions honor waiting and longing as sacred.",
  practices: ["roots|Prayer", "trunk|Journal Often", "branches|Friends"],
  reach: ["Grief combined with depression or burnout."],
  more: [L.ambiguous], kids: null },

{ id: "grief-days", ring: "loss", title: "Holidays and Anniversaries After a Loss", keys: "holidays anniversary birthday death anniversary christmas first year grief", parts: ["roots", "branches"],
  quick: ["The days before are often harder than the day itself.", "Make a plan, and have a backup plan.", "Keep some traditions, change others, and add one that honors your person.", "Joy and grief can sit at the same table."],
  feel: "Dread as the date approaches, tears at unexpected moments, or numbness. Other people's celebrations may feel hard to be around.",
  self: { first: ["Decide ahead of time how you want to spend the day.", "Tell a few people it's coming.", "Plan something gentle for the day after."],
    helps: ["Saying their name out loud, lighting a candle, visiting a meaningful place.", "Giving to a cause they loved."],
    tell: ["“It's okay if this is hard. It's okay if it isn't.”"],
    people: "Try: “Saturday is a year since Dad died. Would you have lunch with me?”" },
  helper: { feel: "They may notice who remembers and who doesn't.",
    say: ["“I'm thinking of you today and remembering Dad.”"],
    avoid: ["Pretending the date isn't significant."],
    help: ["Send a note, a text, or flowers on the day.", "Invite them to something low-key."],
    you: "Put the date in your calendar, for years." },
  faith: "Many traditions have days and rituals to remember the dead. They can give shape to what you're carrying.",
  practices: ["roots|Ritual", "fruit|Capture the Moment", "branches|Friends"],
  reach: ["Grief that seems to get heavier each year."],
  more: [L.wyg], kids: "grief-days" },

{ id: "pet-death", ring: "loss", title: "Your Pet Died", keys: "pet dog cat died euthanasia animal companion grief", parts: ["branches", "roots"],
  quick: ["Grief for a pet is real grief. You lost a daily companion.", "Deciding on euthanasia is an act of love, even when it feels unbearable.", "Mark the loss with a ritual or memorial.", "Be gentle with the empty routines."],
  feel: "Listening for their steps. Guilt over decisions. People who don't understand how much it hurts.",
  self: { first: ["Let yourself cry.", "Keep a collar or photo nearby.", "Tell someone who loved them too."],
    helps: ["Writing about them, or making a photo album.", "Pet loss support groups."],
    tell: ["“My grief shows how much I loved them.”"],
    people: "Try: “We lost Max this week. It's been really hard.”" },
  helper: { feel: "They may feel embarrassed at how deep the grief is.",
    say: ["“I'm so sorry. He was such a good dog.”"],
    avoid: ["“It was just a dog.”", "“Get another one.”"],
    help: ["Send a card or share a memory."],
    you: "Simple kindness goes a long way here." },
  faith: "A blessing of thanks for an animal's life can be a meaningful goodbye.",
  practices: ["roots|Ritual", "fruit|Capture the Moment"],
  reach: ["Grief that keeps you from daily life for weeks."],
  more: [L.wyg], kids: "pet-death" },
/* ================= HEALTH AND THE END OF LIFE ================= */
{ id: "diagnosis", ring: "health", title: "A Hard Diagnosis", keys: "diagnosis cancer serious illness bad news test results sick", parts: ["leaves", "roots", "fruit"],
  quick: ["The first days after hard news are a blur. You don't have to decide everything at once.", "Bring someone to appointments and write things down.", "Ask: what are my options, what matters most to me, and what are the tradeoffs?", "Hope can change shape. It can stay with you."],
  feel: "Shock, fear, disbelief, or a strange calm. Your mind may race through worst cases, or go blank.",
  self: { first: ["Write your questions before each appointment.", "Bring a trusted person to listen with you.", "Limit late-night internet searching."],
    helps: ["One person who helps you keep track of information.", "Asking your care team about palliative care, which helps with symptoms and stress at any stage.", "Telling people what kind of support you want."],
    tell: ["“I can take this one step at a time.”", "“I'm still me, not just a patient.”"],
    people: "Try: “I got some hard news. I'm not ready to talk about every detail, but I want you to know.”" },
  helper: { feel: "They may be overwhelmed, scared, and tired of repeating updates.",
    say: ["“I'm so sorry. I'm with you.”", "“Do you want to talk about it, or would a distraction help today?”"],
    avoid: ["Cure stories and miracle products.", "“Everything happens for a reason.”"],
    help: ["Drive to appointments.", "Set up a meal train or updates page.", "Keep inviting them to normal life."],
    you: "Your fear for them is real. Find your own place to put it." },
  faith: "Prayers for healing, anointing, and blessings can bring deep comfort. It's also okay to bring fear and anger to the sacred.",
  practices: ["leaves|Medicine", "roots|Prayer", "branches|Family", "leaves|Breathe"],
  reach: ["Ask your care team about counseling, social work, or chaplain support.", "Deep depression or hopelessness: tell your doctor, or call or text 988."],
  more: [L.nami, L.convo], kids: "family-illness" },

{ id: "chronic", ring: "health", title: "Chronic Illness or Pain", keys: "chronic pain illness disability long term autoimmune fatigue", parts: ["leaves", "bark", "trunk"],
  quick: ["Living with ongoing illness brings grief for the life you expected.", "Pacing matters. Plan for energy, not just time.", "Your worth is not measured by your productivity.", "Find people who get it."],
  feel: "Tired of explaining, tired of being tired. Frustration with bodies and systems. Isolation when others don't see your pain.",
  self: { first: ["Track what helps and what makes it worse.", "Plan rest before you need it.", "Find one support group or online community."],
    helps: ["Gentle movement if your care team approves.", "Honest conversations with loved ones about limits.", "Pain psychology or counseling."],
    tell: ["“Rest is part of care, not failure.”", "“My life still has meaning with limits.”"],
    people: "Try: “I want to come, but I may need to leave early. Is that okay?”" },
  helper: { feel: "They may feel like a burden, or not believed.",
    say: ["“I believe you.”", "“What would make this easier today?”"],
    avoid: ["“You don't look sick.”", "Unasked-for cures."],
    help: ["Flexible plans.", "Practical help on bad days."],
    you: "Long illness is a marathon. Pace your own support too." },
  faith: "Many traditions speak of strength in weakness and of presence in suffering. You may find new ways to pray and practice with a body that needs care.",
  practices: ["leaves|Medicine", "leaves|Breathe", "bark|Mindfulness", "trunk|Write Your Story"],
  reach: ["Pain with depression or hopelessness.", "Any thoughts of suicide: call or text 988."],
  more: [L.apa, L.nami], kids: "family-illness" },

{ id: "own-death", ring: "health", title: "Facing Your Own Death", keys: "dying terminal my death end of life hospice prognosis afraid to die", parts: ["roots", "trunk", "fruit"],
  quick: ["It's natural to feel fear, grief, anger, and peace, sometimes all in one day.", "Hospice is not giving up. It is care focused on comfort, meaning, and your family.", "Say what matters: thank you, I'm sorry, I forgive you, I love you, goodbye.", "You still get to choose how you spend your days."],
  feel: "Some people feel terror, some a surprising calm. Many feel grief for the people they'll leave, and worry about being a burden.",
  self: { first: ["Tell your doctor what matters most to you.", "Ask about hospice and palliative care.", "Choose someone to speak for you if you can't."],
    helps: ["Recording stories, letters, or videos for loved ones.", "Time with the people who matter most.", "Talking with a chaplain about fears and faith."],
    tell: ["“My life has mattered.”", "“It's okay to let others care for me.”"],
    people: "Try: “I want to talk about what's ahead. It would help me to know you'll listen.”" },
  helper: { feel: "They may want to talk about dying and sense others changing the subject.",
    say: ["“What's on your mind these days?”", "“What would you like people to know or remember?”"],
    avoid: ["“Don't talk like that.”", "Forcing positivity."],
    help: ["Listen, and follow their lead.", "Help record stories or letters.", "Help them tie up practical and spiritual loose ends."],
    you: "Sitting with someone facing death may raise your own fears. That's holy ground. Get support." },
  faith: "Every tradition has something to say about death. Rituals, prayers, confession, blessing, and simply being accompanied can bring deep peace.",
  practices: ["roots|Prayer", "fruit|Make Peace", "trunk|Write Your Story", "fruit|Capture the Moment"],
  reach: ["Ask your care team for hospice or palliative care, and for a chaplain.", "Unbearable distress: ask your team for help now; it can be eased."],
  more: [L.convo, L.caringinfo], kids: "dying" },

{ id: "eol-plan", ring: "health", title: "Making an End-of-Life Plan", keys: "advance directive living will health care proxy power of attorney plan wishes end of life", parts: ["trunk", "branches"],
  quick: ["Planning ahead is a gift to the people you love.", "Choose a health care agent who will honor your wishes.", "Put your wishes in writing with an advance directive for your state.", "Talk about it. The conversation matters as much as the paperwork."],
  feel: "Uncomfortable, maybe morbid. Many people put it off until a crisis, when it's much harder.",
  self: { first: ["Think about what matters most to you if you were very sick.", "Choose your health care agent and ask them.", "Get your state's advance directive form and complete it."],
    helps: ["Conversation guides from The Conversation Project.", "Sharing copies with your agent and your doctor.", "Revisiting your plan after big life changes."],
    tell: ["“This is an act of love, not giving up.”"],
    people: "Try: “I filled out my advance directive. Can I walk you through what I want, so you're never guessing?”" },
  helper: { feel: "Aging parents or loved ones may resist the topic.",
    say: ["“I want to make sure I honor your wishes someday. Can we talk about them?”"],
    avoid: ["Waiting for a crisis."],
    help: ["Offer to go through a conversation guide together."],
    you: "Model it: complete your own plan too." },
  faith: "Your values and faith can shape your plan: sacraments, rituals, who you want present, and what matters in your final days.",
  practices: ["trunk|Plan the Future", "branches|Family"],
  reach: ["An estate or elder law attorney can help with legal documents like wills and powers of attorney."],
  more: [L.caringinfo, L.convo] },

{ id: "bedside", ring: "health", title: "Sitting with Someone Who Is Dying", keys: "bedside vigil dying signs of dying hospice last days actively dying what to expect", parts: ["roots", "branches"],
  quick: ["Your presence matters more than your words.", "Hearing is thought to last late. Speak to them, not about them.", "Changes in breathing, color, and sleep are common near death. Ask the hospice nurse what you are seeing.", "Take breaks. Some people die when loved ones step out."],
  feel: "Awe, fear, exhaustion, tenderness. Time can feel strange at a bedside.",
  self: { first: ["Ask the nurse what to expect and how to help with comfort.", "Say what you want to say.", "Rotate with others so everyone rests."],
    helps: ["Soft music, familiar voices, gentle touch.", "Moistening lips and adjusting pillows with the nurse's guidance.", "Reading favorite words, prayers, or poems."],
    tell: ["“Good enough is enough.”", "“If I'm not in the room at the end, my love was still there.”"],
    people: "Try: “We're keeping vigil tonight. Would you like to come say goodbye?”" },
  helper: { feel: "Families at a vigil may be exhausted and emotional.",
    say: ["“I'll sit with him so you can shower and eat.”"],
    avoid: ["Crowding the room or sharing hard stories.", "Taking pictures without asking."],
    help: ["Bring food and coffee.", "Take care of calls and pets."],
    you: "Keeping vigil is one of the most sacred things people do. Notice what it stirs in you." },
  faith: "Many traditions have prayers, blessings, or rituals for the dying. A chaplain can help, from all faith traditions and everything in-between.",
  practices: ["roots|Prayer", "fruit|Provide Care", "bark|Music"],
  reach: ["Call the hospice nurse any time you are unsure or worried, day or night.", "Ask for the hospice chaplain or social worker."],
  more: [L.convo, L.dougy], kids: "dying" },

{ id: "after-death", ring: "health", title: "The First Days After a Death", keys: "after death what to do funeral arrangements first days logistics", parts: ["branches", "leaves"],
  quick: ["You don't have to do everything right away.", "If hospice was involved, call them first. Otherwise, call 911 or the doctor.", "Choose a funeral home and ask what they handle for you.", "Let people help with food, calls, and childcare."],
  feel: "Numb, busy, foggy. Many people run on adrenaline for days, then crash after the funeral.",
  self: { first: ["Make a short list of who to tell, and ask someone to help make calls.", "Ask the funeral home to walk you through the steps.", "Eat, drink water, and sleep when you can."],
    helps: ["One point person for logistics.", "Planning a service that reflects the person.", "Saving paperwork for later when possible."],
    tell: ["“I only have to do today.”"],
    people: "Try: “Could you tell the neighbors and set up meals? That would help so much.”" },
  helper: { feel: "They may be swamped by tasks and decisions.",
    say: ["“I'm so sorry. I'm bringing dinner tonight.”"],
    avoid: ["Vague offers like “Let me know if you need anything.”"],
    help: ["Answer the door, walk the dog, pick up relatives at the airport.", "Keep showing up after the funeral."],
    you: "Your steady presence is a gift." },
  faith: "Rituals after death, like washing, prayers, wakes, and funerals, help families begin to grieve. Ask your faith leader or chaplain to walk with you.",
  practices: ["branches|Family", "branches|Faith", "leaves|Sleep"],
  reach: ["Grief support through your hospice or funeral home."],
  more: [L.wyg, L.dougy], kids: "family-death" },

{ id: "addiction", ring: "health", title: "Addiction and Recovery", keys: "addiction alcohol drugs drinking sober recovery relapse substance use", parts: ["leaves", "branches", "roots"], sober: [],
  quick: ["Healing is real. Drinking and using often begin as a way to numb pain, and that pain can heal.", "Recovery is possible, and it often takes more than one try.", "Connection is the opposite of addiction. Others can walk this with you.", "For families: you can't control someone else's recovery, but you can take care of yourself."],
  feel: "Shame, cravings, denial, fear of change, or the exhausting hope and heartbreak of loving someone who uses.",
  self: { first: ["Call the SAMHSA National Helpline at 1-800-662-4357, confidential and open any hour.", "Talk to your doctor honestly, especially before you stop drinking or taking sedatives every day.", "Find the support that fits you: a peer group like AA, NA, SMART Recovery, or Refuge Recovery, a therapist, or a treatment program."],
    helps: ["Treatment matched to your needs.", "Recovery communities and sponsors.", "New routines for high-risk times."],
    tell: ["“One day at a time is enough.”", "“A slip is not the end of my recovery.”"],
    people: "Try: “I need help with my drinking. I'm ready to talk about it.”" },
  helper: { feel: "They may feel ashamed, defensive, or hopeless.",
    say: ["“I love you and I'm worried about you.”", "“I'll help you find treatment when you're ready.”"],
    avoid: ["Shaming, lecturing, or covering for them.", "Enabling with money."],
    help: ["Learn about every kind of help: doctors, treatment, medication, therapy, and peer groups.", "Support groups for families, like Al-Anon or Nar-Anon.", "Set clear, loving boundaries."],
    you: "Your wellbeing matters. Families need recovery too." },
  faith: "Many recovery paths draw on surrender, a higher power, and community. Grace and accountability can go together.",
  practices: ["branches|Friends", "roots|Prayer", "trunk|Get Counseling"],
  reach: ["SAMHSA National Helpline: 1-800-662-4357.", "Daily drinking, or daily sedatives like Xanax or Valium: talk with a doctor before stopping. Stopping suddenly can cause seizures.", "Overdose: call 911. Many states have laws protecting people who call for help. Naloxone (Narcan) reverses an opioid overdose and is sold without a prescription."],
  more: [L.samhsa, L.nami], kids: "addiction" },

{ id: "caregiving", ring: "health", title: "Caring for Someone Who Is Ill", keys: "caregiver caregiving caring for parent spouse sick exhausted respite", parts: ["leaves", "branches", "trunk"],
  quick: ["Caregiving is love in action, and it can drain you.", "You can't pour from an empty cup. Build breaks into the plan.", "Accept help, and ask for it specifically.", "Mixed feelings, like resentment or wishing it were over, are normal."],
  feel: "Tired, isolated, guilty, and on alert. Your own health may be slipping.",
  self: { first: ["List tasks others could do, and hand some out.", "Ask about respite care.", "Keep your own doctor appointments."],
    helps: ["Caregiver support groups.", "A short daily practice just for you.", "Help from hospice, home health, or area aging agencies."],
    tell: ["“Taking care of me helps me take care of them.”", "“My mixed feelings don't cancel my love.”"],
    people: "Try: “Could you sit with Dad on Thursday afternoons so I can have a break?”" },
  helper: { feel: "Caregivers often feel invisible behind the person who is sick.",
    say: ["“How are you doing? Not him, you.”"],
    avoid: ["“You're a saint” without offering help."],
    help: ["Take a regular shift.", "Bring meals, mow the lawn, run errands."],
    you: "Your help can be the thing that keeps a caregiver going." },
  faith: "Many traditions honor care for the sick as sacred work. Sacred work still needs rest.",
  practices: ["leaves|Sleep", "branches|Friends", "fruit|Provide Care", "leaves|Breathe"],
  reach: ["Caregiver burnout, depression, or declining health.", "Family Caregiver Alliance and your local Area Agency on Aging can help."],
  more: [L.caregiver], kids: "family-illness" },

{ id: "dementia-care", ring: "health", title: "Caring for Someone with Dementia", keys: "dementia alzheimers memory loss caregiving parent forgets confused", parts: ["branches", "bark", "roots"],
  quick: ["Dementia is a long goodbye. Grief begins long before death.", "Meet them where they are. Correcting often causes distress.", "Behavior is communication. Look for the need underneath.", "Get support early, not only in crisis."],
  feel: "Heartbroken when they don't recognize you. Frustrated, then guilty. Worn down by repeated questions and safety worries.",
  self: { first: ["Call the Alzheimer's Association 24/7 helpline: 1-800-272-3900.", "Look into adult day programs and respite care.", "Make legal and financial plans while they can participate."],
    helps: ["Music, photos, and familiar routines.", "Joining their reality with kindness.", "Caregiver support groups."],
    tell: ["“They still feel love, even when they can't remember it.”"],
    people: "Try: “Mom doesn't always know people now. Visits still help. Here's what works.”" },
  helper: { feel: "They may be isolated and overwhelmed.",
    say: ["“I'd love to visit. What should I know?”"],
    avoid: ["“She doesn't know who you are anyway.”"],
    help: ["Visit regularly, bring music, give the caregiver a break."],
    you: "Visiting can be hard. It still matters." },
  faith: "Familiar prayers, hymns, and rituals often stay with people with dementia long after other memories fade.",
  practices: ["bark|Music", "roots|Worship", "branches|Family"],
  reach: ["Alzheimer's Association helpline: 1-800-272-3900, 24/7.", "Safety concerns like wandering or driving."],
  more: [L.alz, L.caregiver], kids: "dementia" },
/* ================= RELATIONSHIPS AND FAMILY ================= */
{ id: "divorce", ring: "family", title: "Divorce or a Breakup", keys: "divorce breakup separation ending relationship ex co-parenting", parts: ["branches", "trunk", "fruit"],
  quick: ["The end of a relationship is a real loss, even if it was the right choice.", "Grief, anger, relief, and fear can all show up together.", "If you have kids, keep them out of the middle.", "Rebuild slowly: routines, friendships, and your own identity."],
  feel: "Lonely evenings, second-guessing, anger at the other person or yourself, and a strange mix of freedom and loss.",
  self: { first: ["Lean on friends for the first hard weeks.", "Get good legal and financial advice.", "Keep routines steady, especially for kids."],
    helps: ["Counseling to process what happened.", "Rediscovering interests and friendships.", "A divorce support group."],
    tell: ["“This ending doesn't define my worth.”", "“I can grieve and grow at the same time.”"],
    people: "Try: “We're separating. I could use some company and patience right now.”" },
  helper: { feel: "They may feel judged or embarrassed, and may be exhausted by retelling the story.",
    say: ["“I'm sorry. How are you really doing?”"],
    avoid: ["Trashing the ex, especially near kids.", "“I never liked him anyway.”"],
    help: ["Invite them places.", "Help with moves and practical things."],
    you: "Stay supportive without taking over their story." },
  faith: "Divorce can bring spiritual questions and sometimes community judgment. You still belong. Many traditions offer paths of healing and new beginnings.",
  practices: ["branches|Friends", "trunk|Get Counseling", "trunk|Write Your Story"],
  reach: ["Deep depression, or a situation that isn't safe: see the guide on when home isn't safe."],
  more: [L.apa], kids: "divorce" },

{ id: "marriage-strain", ring: "family", title: "When Your Marriage Is Struggling", keys: "marriage problems fighting distance couples counseling relationship strain", parts: ["branches", "bark"],
  quick: ["Every long relationship has hard seasons.", "Repair matters more than avoiding conflict.", "Talk about needs, not just complaints.", "Get help early. Couples counseling works best before things are broken."],
  feel: "Lonely inside the relationship, stuck in the same argument, or quietly drifting apart.",
  self: { first: ["Pick a calm time to talk, not the heat of an argument.", "Start with what you need, not what they do wrong.", "Look for a couples counselor."],
    helps: ["Regular time together without screens or logistics.", "Small daily kindnesses.", "Owning your part."],
    tell: ["“We can both be hurting and still choose to work on this.”"],
    people: "Try: “I miss us. Can we find a counselor and work on this together?”" },
  helper: { feel: "They may feel embarrassed and want to vent without being told what to do.",
    say: ["“That sounds really hard.”"],
    avoid: ["Taking sides or sharing their private struggles."],
    help: ["Babysit so they can have a date or go to counseling."],
    you: "Support the person, and don't get pulled into the fight." },
  faith: "Many traditions see marriage as a covenant that includes hard seasons, forgiveness, and renewal. Safety always comes first.",
  practices: ["branches|Family", "fruit|Make Peace", "trunk|Get Counseling"],
  reach: ["Any abuse, threats, or fear: see the guide on when home isn't safe."],
  more: [L.apa, L.gg, ["The Grounded Marriage", "https://growwithgrounded.com/the-grounded-marriage.html"]], kids: "home-conflict" },

{ id: "betrayal", ring: "family", title: "Betrayal", keys: "affair cheating betrayal lied trust broken infidelity lying lies liar stealing stole from me", parts: ["branches", "roots", "bark"],
  quick: ["Betrayal can feel like trauma: shock, obsession, and a shaken sense of reality.", "You don't have to decide right away whether to stay or go.", "Take care of your body. Sleep and eat even when you can't think straight.", "Forgiveness, if it comes, takes time and isn't the same as trust."],
  feel: "Replaying details, feeling foolish, rage, and deep grief, sometimes all in an hour.",
  self: { first: ["Tell one trusted person, not everyone.", "Get medical care if needed.", "Find a counselor who works with betrayal."],
    helps: ["Time before big decisions.", "Boundaries with what you seek out and see.", "Support that doesn't push you either way."],
    tell: ["“Their choice is not a measure of my worth.”"],
    people: "Try: “Something painful happened in my marriage. I need a friend who won't judge either way.”" },
  helper: { feel: "They may flip between wanting to leave and wanting to stay.",
    say: ["“That's devastating. I'm here, whatever you decide.”"],
    avoid: ["Telling them what to do.", "Spreading the news."],
    help: ["Listen, keep confidences, and help with practical needs."],
    you: "Their decision is theirs. Keep your friendship steady." },
  faith: "Many traditions hold both justice and forgiveness. Neither needs to be rushed. Anger at being wronged is a holy response.",
  practices: ["trunk|Get Counseling", "fruit|Make Peace", "leaves|Sleep"],
  reach: ["Depression, or thoughts of harming yourself or someone else: call or text 988."],
  more: [L.apa] },

{ id: "infertility", ring: "family", title: "Infertility", keys: "infertility trying to conceive ivf cant get pregnant childless", parts: ["fruit", "roots", "leaves"],
  quick: ["Infertility is a real grief, often hidden and repeated month after month.", "Protect your heart around baby showers and announcements when you need to.", "Partners may cope differently.", "You get to decide what your family's path looks like."],
  feel: "Hope and heartbreak on a monthly cycle. Jealousy and guilt. Feeling left out as friends have children.",
  self: { first: ["Find a support group or community.", "Decide together what you share and with whom.", "Take breaks from treatment when you need them."],
    helps: ["Counseling focused on fertility.", "Honest conversations with your partner.", "Permission to skip events that hurt."],
    tell: ["“My worth isn't measured by this.”"],
    people: "Try: “We're going through infertility. We'd love support, but please don't ask for updates.”" },
  helper: { feel: "They may be hurt by casual questions and advice.",
    say: ["“I'm sorry. I'm here whenever you want to talk, or not talk.”"],
    avoid: ["“Just relax.”", "“Have you thought about adoption?”"],
    help: ["Be thoughtful about how you share your own pregnancy news."],
    you: "Your gentleness matters more than advice." },
  faith: "Many traditions include stories of longing and waiting. Bring your grief and your questions to the sacred.",
  practices: ["roots|Prayer", "trunk|Get Counseling", "branches|Friends"],
  reach: ["Depression or relationship strain."],
  more: [L.resolve] },

{ id: "estrangement", ring: "family", title: "Estrangement", keys: "estranged family cut off not speaking adult child parent sibling estrangement", parts: ["branches", "roots"],
  quick: ["Estrangement is a grief with no funeral.", "Some distance protects; some distance can be repaired. Both are real.", "Holidays and milestones can hurt most.", "Find people who understand this kind of loss."],
  feel: "Grief, guilt, anger, relief, or a longing that won't go away.",
  self: { first: ["Name what you are grieving.", "Decide what contact, if any, is safe and healthy.", "Seek counsel before big steps."],
    helps: ["Support from others living with estrangement.", "Chosen family.", "Counseling."],
    tell: ["“I can love someone and still need distance.”"],
    people: "Try: “I'm not in contact with my family right now. Holidays are hard.”" },
  helper: { feel: "They may be judged by people who don't know the full story.",
    say: ["“That sounds painful.”"],
    avoid: ["“But they're family.”"],
    help: ["Invite them to your holidays."],
    you: "You don't need the whole story to be kind." },
  faith: "Reconciliation is a value in many traditions, and so is protecting yourself from harm. Wisdom holds both.",
  practices: ["branches|Friends", "trunk|Get Counseling", "fruit|Make Peace"],
  reach: ["Grief that becomes depression."],
  more: [L.ambiguous, L.apa] },

{ id: "aging-parents", ring: "family", title: "Aging Parents", keys: "aging parents elderly parent care decisions moving assisted living", parts: ["branches", "trunk"],
  quick: ["Role reversal is emotional for everyone.", "Talk about wishes early, before a crisis.", "Share the load among siblings when possible.", "Respect their dignity and choices where it's safe."],
  feel: "Worry, frustration, grief over their decline, and exhaustion from juggling your own life.",
  self: { first: ["Have the conversation about their wishes.", "Know their doctors, medicines, and documents.", "Call your local Area Agency on Aging."],
    helps: ["Family meetings.", "Professional help from geriatric care managers.", "Your own breaks."],
    tell: ["“I'm doing my best in a hard season.”"],
    people: "Try: “Mom needs more help. Can we meet as a family to plan?”" },
  helper: { feel: "They may be stretched between generations.",
    say: ["“How are you holding up?”"],
    avoid: ["Judging their decisions."],
    help: ["Offer rides, visits, or research."],
    you: "The sandwich generation needs support too." },
  faith: "Many traditions call us to honor our parents, which can include honest limits and asking for help.",
  practices: ["branches|Family", "trunk|Plan the Future", "fruit|Provide Care"],
  reach: ["Safety concerns, or caregiver burnout: see the caregiving guide."],
  more: [L.caregiver, L.convo] },

{ id: "empty-nest", ring: "family", title: "Empty Nest and Big Life Transitions", keys: "empty nest kids leave home transition identity midlife change college graduation leaving home launching dorm senior year moving out", parts: ["trunk", "fruit"],
  quick: ["Transitions include loss, even good ones.", "Let yourself grieve the season that ended.", "Rediscover interests and relationships.", "A new season can be full of meaning."],
  feel: "A quiet house, a lost sense of purpose, or reconnecting (or not) with your partner.",
  self: { first: ["Mark the change with a ritual or trip.", "Try one new thing.", "Reconnect with friends."],
    helps: ["Volunteering, learning, creating.", "Honest talks with your partner."],
    tell: ["“My purpose is changing, not ending.”"],
    people: "Try: “The house is so quiet. Want to get dinner this week?”" },
  helper: { feel: "They may not want to admit how much it hurts.",
    say: ["“That's a big change. How's it going?”"],
    avoid: ["“Now you're free!”"],
    help: ["Invite them into new things."],
    you: "Celebrate and grieve with them." },
  faith: "Many traditions mark transitions with blessings. A new season is also a threshold.",
  practices: ["trunk|Plan the Future", "trunk|Keep Learning", "fruit|Volunteer"],
  reach: ["Transition that becomes lasting sadness."],
  more: [L.gg] },

{ id: "struggling-child", ring: "family", title: "Parenting a Struggling Child", keys: "child struggling teen depression behavior problems parenting worried son daughter lying stealing sneaking adult child", parts: ["branches", "bark", "fruit"],
  quick: ["Your child's struggle is not proof you failed.", "Stay connected, even when they push you away.", "Get help for them, and for you.", "Take care of your marriage and other kids, too."],
  feel: "Scared, helpless, blamed, and exhausted. You may grieve the family life you imagined.",
  self: { first: ["Talk to your child's doctor or school counselor.", "Find a parent support group.", "Ask directly about safety if you are worried."],
    helps: ["Connection over control.", "Consistent, loving boundaries.", "Your own counseling."],
    tell: ["“I can love them well and still not fix this alone.”"],
    people: "Try: “We're going through a hard stretch with our son. Please keep us in your thoughts.”" },
  helper: { feel: "They may feel judged by other parents.",
    say: ["“You're a good parent in a hard season.”"],
    avoid: ["Blame or quick fixes."],
    help: ["Offer rides, meals, and a listening ear."],
    you: "Keep their child's story private." },
  faith: "Many traditions speak of steadfast love that doesn't give up. That love can include professional help and firm limits.",
  practices: ["branches|Family", "trunk|Get Counseling", "roots|Prayer"],
  reach: ["Your child talks about suicide: call or text 988 now.", "Safety threats: call 911."],
  more: [L.nami, L.lifeline] },

/* ================= WORK AND MONEY ================= */
{ id: "job-loss", ring: "work", title: "Losing Your Job", keys: "fired laid off job loss unemployed work career", parts: ["trunk", "fruit", "branches"],
  quick: ["Job loss hits identity, routine, and money all at once.", "It's okay to grieve before you start job hunting.", "Keep a daily structure.", "Reach out to your network. Most jobs come through people."],
  feel: "Shock, shame, fear about money, and a loss of purpose or community.",
  self: { first: ["Apply for unemployment and review benefits.", "Make a simple budget.", "Tell a few people you trust."],
    helps: ["A daily routine with a start time.", "Exercise and time outside.", "Career services like CareerOneStop."],
    tell: ["“I am more than my job.”"],
    people: "Try: “I was laid off. I'm looking for my next role. Do you know anyone I should talk to?”" },
  helper: { feel: "They may feel embarrassed and avoid people.",
    say: ["“I'm sorry. That's a lot to handle.”"],
    avoid: ["“Everything happens for a reason.”"],
    help: ["Make introductions.", "Review a résumé.", "Invite them to low-cost fun."],
    you: "Practical help matters." },
  faith: "Many traditions teach that work has dignity, and that a person's worth isn't measured by a paycheck.",
  practices: ["trunk|Plan the Future", "branches|Colleagues", "leaves|Movement"],
  reach: ["Depression, or money crisis: dial 211 for local help."],
  more: [L.career, L.nfcc], kids: "money" },

{ id: "money-crisis", ring: "work", title: "Money Trouble", keys: "debt bills money problems financial crisis bankruptcy eviction", parts: ["bark", "leaves", "fruit"],
  quick: ["Money stress affects sleep, health, and relationships.", "Face the numbers. Clarity reduces fear.", "Ask for help early: creditors, nonprofits, 211.", "Shame keeps people stuck. Talking helps."],
  feel: "Dread when the phone rings, sleepless nights, arguments at home, and shame.",
  self: { first: ["List what you owe and what's due.", "Call 211 for local assistance.", "Contact a nonprofit credit counselor."],
    helps: ["A simple plan, one bill at a time.", "Honest conversations at home."],
    tell: ["“This is a hard season, not my identity.”"],
    people: "Try: “We're struggling financially. I'm working on a plan, and I'd love someone to talk it through with.”" },
  helper: { feel: "They may be ashamed.",
    say: ["“Thanks for telling me. I'm with you.”"],
    avoid: ["Lectures about past choices."],
    help: ["Groceries, rides, and resources."],
    you: "Be thoughtful about lending money; gifts are often kinder." },
  faith: "Many faith communities have benevolence funds or practical help. Ask.",
  practices: ["trunk|Plan the Future", "leaves|Sleep", "fruit|Be Generous"],
  reach: ["211 for local help with food, housing, and utilities.", "A nonprofit credit counselor through the NFCC."],
  more: [L.nfcc], kids: "money" },

{ id: "retirement", ring: "work", title: "Retirement", keys: "retirement retiring identity purpose after work", parts: ["trunk", "branches"],
  quick: ["Retirement is a threshold that can bring both freedom and loss.", "Structure and purpose matter as much as money.", "Plan for connection, not just leisure.", "Give yourself time to adjust."],
  feel: "Relief, restlessness, or feeling invisible without a work role.",
  self: { first: ["Plan a weekly rhythm.", "Try volunteering or learning.", "Stay connected to former colleagues."],
    helps: ["Mentoring or passing on your skills.", "Movement and health routines."],
    tell: ["“I still have much to give.”"],
    people: "Try: “I'm figuring out this new season. Want to join me for something new?”" },
  helper: { feel: "They may miss their role and routine.",
    say: ["“What are you excited to try?”"],
    avoid: ["“You must be bored.”"],
    help: ["Invite them into meaningful roles."],
    you: "Their wisdom is a gift. Ask for it." },
  faith: "Many traditions honor elders as keepers of wisdom. Retirement can be a season of blessing others.",
  practices: ["roots|Teach", "fruit|Volunteer", "trunk|Keep Learning"],
  reach: ["Loneliness or depression after retirement."],
  more: [L.gg] },

{ id: "career-change", ring: "work", title: "A Career Change", keys: "career change new job starting over calling vocation", parts: ["trunk", "fruit"],
  quick: ["Changing paths is brave, and often scary.", "Start small: talk to people, try a project, take a class.", "Your past experience still counts.", "Expect a season of being new again."],
  feel: "Excitement and doubt, fear of failure, or grief for the path you're leaving.",
  self: { first: ["Talk to three people doing the work you want.", "Make a financial bridge plan.", "Take one concrete step."],
    helps: ["Mentors and community.", "Reflecting on what you've learned."],
    tell: ["“I'm allowed to grow.”"],
    people: "Try: “I'm exploring a new direction. Can I pick your brain?”" },
  helper: { feel: "They may need encouragement more than advice.",
    say: ["“I believe in you.”"],
    avoid: ["Listing everything that could go wrong."],
    help: ["Introductions and practical support."],
    you: "Cheer them on." },
  faith: "Many traditions speak of calling. Discernment often happens by trying and listening.",
  practices: ["trunk|Plan the Future", "trunk|Keep Learning", "roots|Prayer"],
  reach: ["Anxiety or depression during the transition."],
  more: [L.career] },
/* ================= FAITH AND MEANING ================= */
{ id: "faith-crisis", ring: "faith", title: "A Crisis of Faith", keys: "faith crisis doubt questions believe anymore spiritual struggle", parts: ["roots", "trunk"],
  quick: ["Doubt is part of many faith journeys, not the end of them.", "Questions deserve honesty, not quick answers.", "You can hold your questions without deciding everything now.", "Find a guide who can sit with doubt without panic."],
  feel: "Unmoored, anxious, guilty, or strangely free. Old answers no longer fit what you've lived through.",
  self: { first: ["Write your questions down, honestly.", "Talk with a chaplain, spiritual director, or trusted mentor.", "Keep practices that still feel true, and rest from those that don't."],
    helps: ["Reading others who wrestled with doubt.", "Community that allows questions.", "Patience with yourself."],
    tell: ["“My questions are welcome.”", "“I can figure it out over time.”"],
    people: "Try: “I'm wrestling with my faith right now. I'd love to talk with someone who won't try to fix it.”" },
  helper: { feel: "They may fear judgment from faith communities or family.",
    say: ["“Those are real questions. Thanks for sharing them.”"],
    avoid: ["Arguments, pressure, or quick answers."],
    help: ["Stay in relationship, whatever they conclude."],
    you: "A good companion walks with the questions." },
  faith: "Many traditions include deep doubt among their saints and teachers. Wrestling can be a form of faithfulness.",
  practices: ["roots|Scripture", "trunk|Journal Often", "trunk|Get Counseling", "roots|Prayer"],
  reach: ["Doubt tangled with depression or trauma."],
  more: [L.gg] },

{ id: "leaving-faith", ring: "faith", title: "Changing or Leaving a Faith", keys: "leaving church changing religion deconstruction converting family faith differences", parts: ["roots", "branches"],
  quick: ["Changing faith can mean losing community and family closeness, even when it's right for you.", "Grief and relief can coexist.", "Find new sources of meaning and belonging.", "Families can love across different beliefs."],
  feel: "Freedom, loneliness, guilt, anger, or fear about how family will respond.",
  self: { first: ["Find a few people who understand this journey.", "Decide what you want to tell family, and when.", "Keep practices that still give you life."],
    helps: ["New community, spiritual or not.", "Counseling if religion was a source of harm."],
    tell: ["“I'm allowed to grow in my own way.”"],
    people: "Try: “My beliefs are changing. I still love you, and I'd like us to stay close.”" },
  helper: { feel: "They may be bracing for rejection.",
    say: ["“I love you. That doesn't change.”"],
    avoid: ["Ultimatums or guilt."],
    help: ["Stay curious and connected."],
    you: "Your love can outlast your disagreement." },
  faith: "Many people find the sacred in new places after leaving old ones. Faith journeys rarely move in straight lines.",
  practices: ["trunk|Write Your Story", "branches|Friends", "roots|Ritual"],
  reach: ["Isolation or depression during the change."],
  more: [L.apa] },

{ id: "spiritual-dryness", ring: "faith", title: "When the Sacred Feels Far Away", keys: "spiritual dryness dark night prayer feels empty god feels distant numb faith", parts: ["roots"],
  quick: ["Dry seasons are common in every spiritual tradition.", "Showing up still counts, even when you feel nothing.", "Try new ways to pray or practice.", "Dryness is often a season of deepening, not ending."],
  feel: "Prayers feel like talking to the ceiling. Worship feels flat. You wonder if something is wrong with you.",
  self: { first: ["Keep one simple practice.", "Try a new practice: silence, nature, music, service.", "Tell a spiritual companion."],
    helps: ["Reading about others' dry seasons.", "Serving others.", "Being honest in prayer about the dryness."],
    tell: ["“Feeling far away doesn't mean I've been left.”"],
    people: "Try: “My faith feels dry lately. Can you pray with me?”" },
  helper: { feel: "They may feel ashamed.",
    say: ["“Many faithful people have felt this way.”"],
    avoid: ["“You must not be praying enough.”"],
    help: ["Pray with them, or simply sit in silence together."],
    you: "Companionship is the gift." },
  faith: "Many mystics describe dark nights and deserts as places of growth. The sacred may be closer than it feels.",
  practices: ["roots|Worship", "bark|Meditation", "fruit|Volunteer", "roots|Scripture"],
  reach: ["Dryness that comes with depression: talk to a doctor too."],
  more: [L.gg] },

{ id: "moral-injury", ring: "faith", title: "Moral Injury", keys: "moral injury guilt healthcare military first responder betrayed values did wrong", parts: ["roots", "trunk", "bark"],
  quick: ["Moral injury comes from doing, seeing, or failing to prevent something that violates your deepest values.", "It is common among healthcare workers, veterans, and first responders.", "It's a wound to the soul, not a weakness.", "Healing often includes truth-telling, community, and sometimes repair."],
  feel: "Guilt, shame, anger, or betrayal by leaders or systems. Pulling away from faith or people.",
  self: { first: ["Name what happened, honestly, with someone safe.", "Find peers who understand your work.", "Talk with a chaplain or counselor familiar with moral injury."],
    helps: ["Rituals of lament or confession.", "Acts of service and repair.", "Community with others who've been there."],
    tell: ["“I carry this because I care about doing right.”"],
    people: "Try: “Something from work is weighing on me. I need to talk to someone who understands.”" },
  helper: { feel: "They may fear being judged or not understood.",
    say: ["“That sounds like it wounded something deep in you.”"],
    avoid: ["Dismissing it: “You were just doing your job.”"],
    help: ["Listen without rushing to absolve."],
    you: "Hearing these stories can affect you too." },
  faith: "Many traditions offer confession, lament, and restoration. Chaplains are trained to walk with moral injury.",
  practices: ["roots|Prayer", "fruit|Make Peace", "trunk|Get Counseling", "branches|Colleagues"],
  reach: ["Veterans: call 988 and press 1.", "Thoughts of suicide: call or text 988."],
  more: [L.voa, L.lifeline] },

{ id: "forgiveness", ring: "faith", title: "Forgiving Someone, or Yourself", keys: "forgive forgiveness resentment hurt grudge reconcile", parts: ["roots", "branches", "bark"],
  quick: ["Forgiveness is releasing a debt, not excusing harm.", "Forgiveness and reconciliation are different. You can forgive without returning.", "It's usually a process, not a moment.", "Forgiving yourself is often the hardest."],
  feel: "Resentment that keeps replaying, or pressure to forgive before you're ready.",
  self: { first: ["Name the hurt clearly.", "Notice what the resentment costs you.", "Choose a small step toward release."],
    helps: ["Writing an unsent letter.", "Prayer or ritual.", "Counseling for deep wounds."],
    tell: ["“Forgiving is for my freedom.”"],
    people: "Try: “I'm working on forgiving someone. Can I talk it through?”" },
  helper: { feel: "They may feel pushed to forgive too fast.",
    say: ["“Take the time you need.”"],
    avoid: ["“You just need to let it go.”"],
    help: ["Listen and honor the hurt."],
    you: "Let healing take its own time." },
  faith: "Forgiveness is central to many traditions. So is justice. Both matter.",
  practices: ["fruit|Make Peace", "roots|Prayer", "trunk|Journal Often"],
  reach: ["Forgiveness tangled with ongoing abuse: safety comes first."],
  more: [L.gg] },

{ id: "church-hurt", ring: "faith", title: "When Faith Communities Have Hurt You", keys: "church hurt religious trauma spiritual abuse faith community harm", parts: ["roots", "branches"],
  quick: ["Harm done in the name of faith can wound deeply.", "Your hurt is real, and it's not a sign that you lack faith.", "You get to set boundaries with people and places.", "Healing can happen at your own pace, in or out of religious spaces."],
  feel: "Anger, grief, anxiety in religious settings, or feeling spiritually homeless.",
  self: { first: ["Name what happened.", "Find a safe person to talk with.", "Take a break from what triggers you."],
    helps: ["Counseling that understands religious harm.", "New spiritual practices on your terms.", "Community with others who've healed."],
    tell: ["“The sacred is not the same as the people who misused it.”"],
    people: "Try: “I had painful experiences in church. I'm figuring out what faith looks like now.”" },
  helper: { feel: "They may be wary of anyone religious.",
    say: ["“I'm sorry that happened to you.”"],
    avoid: ["Defending the institution."],
    help: ["Respect their pace and boundaries."],
    you: "Listen more than you explain." },
  faith: "Many traditions have prophets who spoke against abuse of power. Your hurt joins a long line of truth-telling.",
  practices: ["trunk|Get Counseling", "roots|Ritual", "branches|Friends"],
  reach: ["Abuse by a religious leader: report it to authorities."],
  more: [L.apa] },

/* ================= COMMUNITY, COUNTRY, WORLD ================= */
{ id: "political-division", ring: "world", title: "Political Division in Families", keys: "politics election family divided argue relatives disagree", parts: ["branches", "bark"],
  quick: ["People who love each other can disagree deeply.", "Relationships can be bigger than any election.", "Set boundaries around topics when needed.", "Listen to understand, not only to answer."],
  feel: "Dread before holidays, anger, grief over relationships that feel strained.",
  self: { first: ["Decide what topics are off the table for now.", "Plan a graceful exit line.", "Remember what you love about the person."],
    helps: ["Curious questions: “What worries you most?”", "Shared activities that aren't about politics."],
    tell: ["“I can hold my values and still love this person.”"],
    people: "Try: “I love you, and I don't want this to come between us. Can we take a break from politics today?”" },
  helper: { feel: "Both sides may feel unheard.",
    say: ["“It sounds like this really matters to you.”"],
    avoid: ["Mocking or name-calling people who disagree."],
    help: ["Model respectful listening."],
    you: "Peacemaking takes patience." },
  faith: "Many traditions call us to love our neighbors, including those we disagree with, and to pray for leaders and peace.",
  practices: ["fruit|Make Peace", "branches|Family", "leaves|Breathe"],
  reach: ["Conflict that becomes threatening or abusive."],
  more: [L.braver], kids: "politics" },

{ id: "immigration", ring: "world", title: "Living with Immigration Fear", keys: "ice immigration raids deportation undocumented family separation fear", parts: ["branches", "bark", "fruit"],
  quick: ["Fear for your family's safety is heavy. Name it and care for your body.", "Make a family preparedness plan: emergency contacts, a caregiver for children, and documents in one place.", "Get accurate information from trusted legal aid, not rumors.", "Stay connected with community support."],
  feel: "Constant vigilance, trouble sleeping, anxiety when leaving home, and worry for children.",
  self: { first: ["Complete a family preparedness plan.", "Contact a trusted immigration legal aid organization.", "Tell your children the basics of your plan in a calm way."],
    helps: ["Community groups, faith communities, and accompaniment programs.", "Routines that help children feel safe."],
    tell: ["“Preparing is a way of caring for my family.”"],
    people: "Try: “I'm worried about my family's safety. Can you be one of our emergency contacts?”" },
  helper: { feel: "They may be afraid to share details.",
    say: ["“I'm here for your family.”"],
    avoid: ["Asking about status or sharing their situation."],
    help: ["Be an emergency contact if asked.", "Offer rides, childcare, or accompaniment."],
    you: "This guide is not legal advice. Point to legal aid." },
  faith: "Many faith traditions speak of welcoming the stranger. Many faith communities offer support and accompaniment.",
  practices: ["branches|Faith", "branches|Neighbors", "leaves|Breathe"],
  reach: ["A trusted immigration legal aid organization for your situation.", "Counseling if fear disrupts daily life."],
  more: [L.ilrc, L.informed], kids: "immigration" },

{ id: "community-violence", ring: "world", title: "Violence in Your Community", keys: "shooting violence community tragedy crime trauma", parts: ["bark", "branches", "leaves"],
  quick: ["After violence nearby, shock and fear are normal.", "Limit graphic images and repeated news.", "Gather with others. Communities heal together.", "Watch for lasting trauma reactions."],
  feel: "Jumpy, sleepless, numb, or angry. Fear in places that used to feel safe.",
  self: { first: ["Reach out to people you love.", "Take a break from the news.", "Keep routines."],
    helps: ["Community vigils or gatherings.", "Helping others, like giving blood or bringing food."],
    tell: ["“My reactions are normal for what happened.”"],
    people: "Try: “I'm shaken by what happened. Can we talk?”" },
  helper: { feel: "Some people are deeply affected, even from a distance.",
    say: ["“How are you doing with everything?”"],
    avoid: ["Graphic details."],
    help: ["Check on those closest to the event."],
    you: "Take care of your own reactions." },
  faith: "Faith communities often gather to lament and pray after tragedy. Grief shared is lighter.",
  practices: ["branches|Neighbors", "roots|Worship", "leaves|Breathe"],
  reach: ["Nightmares, panic, or numbness lasting weeks.", "Disaster Distress Helpline: 1-800-985-5990."],
  more: [L.nctsn, L.apa], kids: "community-tragedy" },

{ id: "disaster", ring: "world", title: "After a Disaster", keys: "disaster flood fire tornado hurricane lost home storm recovery", parts: ["leaves", "branches", "fruit"],
  quick: ["Safety first, then basic needs.", "Recovery is a marathon. Pace yourself.", "Accept help from agencies and neighbors.", "Anniversaries and storms may bring feelings back."],
  feel: "Overwhelmed, displaced, grieving lost things, and exhausted by paperwork.",
  self: { first: ["Contact the Red Cross and local agencies.", "Document damage.", "Rest when you can."],
    helps: ["Community recovery groups.", "Small restored routines."],
    tell: ["“We're rebuilding one step at a time.”"],
    people: "Try: “We lost a lot in the flood. We could use help with cleanup Saturday.”" },
  helper: { feel: "They may be overwhelmed by offers and needs.",
    say: ["“What do you need most this week?”"],
    avoid: ["Assuming what they need."],
    help: ["Specific, practical help."],
    you: "Recovery takes months. Keep showing up." },
  faith: "Faith communities often rally after disasters with practical help and belonging.",
  practices: ["branches|Neighbors", "fruit|Volunteer", "leaves|Sleep"],
  reach: ["Disaster Distress Helpline: 1-800-985-5990.", "The American Red Cross."],
  more: [L.redcross], kids: "disasters" },

{ id: "news-overwhelm", ring: "world", title: "Overwhelmed by the News", keys: "news overwhelm doomscrolling anxiety world events climate war", parts: ["bark", "fruit"],
  quick: ["Staying informed doesn't require constant exposure.", "Set news times and limits.", "Turn worry into one small action.", "Notice the helpers and the good."],
  feel: "Anxious, helpless, angry, or numb after scrolling.",
  self: { first: ["Pick one or two times a day for news.", "Turn off alerts.", "Do one caring action for a cause you care about."],
    helps: ["Time outside and with people.", "Balancing hard news with good news."],
    tell: ["“I can care without carrying everything.”"],
    people: "Try: “The news has been getting to me. Want to take a walk?”" },
  helper: { feel: "They may feel embarrassed at how much it affects them.",
    say: ["“It's a lot to take in.”"],
    avoid: ["Dismissing their concern."],
    help: ["Invite them to act together on something."],
    you: "Protect your own attention too." },
  faith: "Prayer for the world, and acts of service, can turn helplessness into hope.",
  practices: ["bark|Mindfulness", "fruit|Inspire Hope", "fruit|Volunteer"],
  reach: ["Anxiety that interferes with daily life."],
  more: [L.apa], kids: "scary-news" },

{ id: "prejudice", ring: "world", title: "Facing Prejudice", keys: "racism prejudice discrimination hate bias treated unfairly", parts: ["branches", "roots", "trunk"],
  quick: ["Discrimination harms body and spirit.", "Your hurt and anger are valid.", "Find community and allies.", "Care for yourself; you don't have to educate everyone."],
  feel: "Anger, exhaustion, grief, and hypervigilance.",
  self: { first: ["Tell someone who understands.", "Document incidents if needed.", "Rest from people and spaces that harm you."],
    helps: ["Community with shared experience.", "Counselors who understand identity-based stress."],
    tell: ["“My dignity is not up for debate.”"],
    people: "Try: “Something happened today that really hurt. Can I tell you about it?”" },
  helper: { feel: "They may be tired of explaining.",
    say: ["“I believe you. That was wrong.”"],
    avoid: ["“Are you sure that's what they meant?”"],
    help: ["Speak up when you witness it."],
    you: "Listen and learn without making it about you." },
  faith: "Many traditions teach that every person bears dignity and worth. Justice is a sacred value.",
  practices: ["branches|Friends", "trunk|Write Your Story", "fruit|Inspire Hope"],
  reach: ["Harassment, threats, or workplace discrimination may need legal help."],
  more: [L.apa], kids: "prejudice" },
{ id: "trauma", ring: "inside", title: "After Something Traumatic", keys: "trauma ptsd accident assault shock flashbacks nightmares startle numb frightening event", parts: ["bark", "leaves", "roots"],
  quick: ["Strong reactions after a frightening event are common, and for many people they ease over the following weeks.", "Your body may stay on alert for a while. Calming the body is often the first step.", "Safety, rest, and connection help most in the early days.", "If reactions stay strong after a month, trauma-focused therapy works for many people."],
  feel: "You may replay what happened, startle easily, sleep poorly, or feel numb and far away. Some people avoid anything that reminds them of it. Others feel guilty for surviving or for how they reacted.",
  self: { first: ["Get to a safe, quiet place and slow your breathing.", "Eat, drink water, and rest, even if sleep comes in pieces.", "Tell one trusted person what happened, as much as you want to."],
    helps: ["A steady daily routine.", "Gentle movement and time outside.", "Limiting replays of the event on the news or social media."],
    tell: ["“What I'm feeling is a normal reaction to something that wasn't normal.”", "“I'm safe right now, in this room.”"],
    people: "Try: “Something hard happened. I don't need advice, just company for a while.”" },
  helper: { feel: "They may feel jumpy, ashamed, or afraid of being a burden, and may not want to talk yet.",
    say: ["“I'm so glad you're safe.”", "“You can tell me as much or as little as you want.”"],
    avoid: ["Pushing for details.", "“It could have been worse.”", "Telling them how they should feel."],
    help: ["Help with meals, rides, and chores for a few weeks.", "Sit with them. Presence matters more than words.", "Gently mention professional help if things don't ease."],
    you: "Hearing about trauma can stir up your own. Take care of yourself too." },
  faith: "Many sacred texts are full of people crying out after terror and loss. Lament, silence, and simply being held by a community can all be sacred responses.",
  practices: ["bark|Slow Exhale", "bark|Name It", "leaves|Two Hours Outdoors", "roots|Lament"],
  reach: ["Nightmares, flashbacks, or avoidance that last longer than a month, or get in the way of daily life.", "Thoughts of hurting yourself: call or text 988."],
  more: [L.ptsd, L.apa] },
{ id: "disability", ring: "health", title: "Living with a New Disability", keys: "disability injury wheelchair vision hearing loss stroke amputation chronic limitation adapting accessibility", parts: ["leaves", "trunk", "branches"],
  quick: ["Adjusting to a new disability often brings grief, and grief is a healthy response.", "Your worth was never about what your body could do.", "Practical help, like tools, benefits, and accessible spaces, can open up a lot of life.", "Other people living with the same disability are often the best guides."],
  feel: "You may grieve the life you planned, feel frustrated by everyday tasks, or worry about work, money, and relationships. Some days bring hope and some bring anger. Both are normal.",
  self: { first: ["Name one thing you miss, and one thing you can still enjoy.", "Ask your care team about therapy, tools, and adaptations.", "Look up disability resources in your state."],
    helps: ["Connecting with others who share your disability.", "Rebuilding routines around what works now.", "Letting people help without giving up your say."],
    tell: ["“My body changed. My worth didn't.”", "“Adapting is a skill, and I'm learning it.”"],
    people: "Try: “Here's what helps me, and here's what I'd rather do myself.”" },
  helper: { feel: "They may feel grief, frustration, and fear about losing independence.",
    say: ["“What would be most helpful?”", "“I'm here for the long haul.”"],
    avoid: ["Doing everything for them without asking.", "Talking about them instead of to them.", "“At least it wasn't worse.”"],
    help: ["Ask before helping.", "Make gatherings accessible.", "Keep inviting them. Isolation is a real risk."],
    you: "Caring for someone adjusting to disability is a big change for you too." },
  faith: "Many traditions hold that every person carries sacred worth, whatever their body can do. Some communities have learned from disabled members to slow down and make room for everyone.",
  practices: ["bark|Self-Compassion Break", "branches|Support Group", "trunk|Values Sort", "fruit|Tiny Next Step"],
  reach: ["Sadness or hopelessness that doesn't lift.", "Thoughts of not wanting to live: call or text 988."],
  more: [L.disabilityhub, L.nami] },
{ id: "assault", ring: "safety", title: "After a Sexual Assault", keys: "sexual assault rape abuse violated consent attacked harassed survivor", parts: ["bark", "leaves", "branches"],
  quick: ["What happened was not your fault. Nothing you did or wore makes it your fault.", "You get to decide what happens next, including whether to report.", "Free, confidential help is available any time, day or night.", "Healing takes time, and support makes a real difference."],
  feel: "You may feel shock, numbness, fear, shame, or anger. Some people blame themselves, lose sleep, or feel unsafe in their own body. Every reaction is a valid response to harm.",
  self: { first: ["Get somewhere safe.", "Call the RAINN hotline at 1-800-656-4673, or in Central Minnesota call 320-251-4357, any time.", "If you're hurt, or want evidence kept, a hospital can help, even if you don't want to report."],
    helps: ["An advocate who can walk with you through medical care, reporting, or neither.", "A counselor who understands trauma.", "People who believe you."],
    tell: ["“This was not my fault.”", "“I get to choose what happens next.”"],
    people: "Try: “Something happened to me, and I need you to just listen and believe me.”" },
  helper: { feel: "They may feel ashamed, afraid, or unsure whether they'll be believed.",
    say: ["“I believe you.”", "“It's not your fault.”", "“What would help right now?”"],
    avoid: ["Asking what they were wearing or drinking.", "Pressuring them to report or not report.", "Confronting the person who hurt them without their okay."],
    help: ["Offer to call a hotline with them.", "Go with them to a hospital or advocate if they want.", "Respect their choices and their privacy."],
    you: "Hearing this can be very hard. Get support for yourself too, without sharing their story." },
  faith: "Many traditions teach that those who are harmed are beloved and never to blame. If a faith community has minimized abuse, that is a failure of the community, not a judgment from the sacred.",
  practices: ["bark|Soothing Touch", "bark|Slow Exhale", "branches|Ask for Help", "bark|Self-Compassion Break"],
  reach: ["Any time you need to talk: RAINN, 1-800-656-4673, or Central Minnesota, 320-251-4357.", "If you're in danger, call 911. Thoughts of suicide: call or text 988."],
  more: [L.rainn, L.cmsac] },
{ id: "newparent", ring: "family", title: "Becoming a Parent", keys: "new baby parent mother father postpartum depression anxiety newborn adoption exhausted overwhelmed", parts: ["leaves", "branches", "bark"],
  quick: ["Becoming a parent changes everything, and it's normal to feel joy and struggle at the same time.", "Up to one in seven mothers, and many fathers too, face depression or anxiety after a baby arrives. It's common and treatable.", "Sleep, food, and help from others are not luxuries right now.", "Asking for help is part of good parenting."],
  feel: "Love and exhaustion can arrive together. You may feel overwhelmed, anxious, teary, or unlike yourself. Some parents feel numb, or have frightening thoughts they're ashamed of. Those are symptoms, not who you are.",
  self: { first: ["Sleep whenever someone else can watch the baby.", "Accept one offer of help today.", "Tell someone honestly how you're doing."],
    helps: ["A few minutes outside each day.", "Other new parents who get it.", "Sharing night duties when possible."],
    tell: ["“I'm learning, and that's enough for today.”", "“Needing help doesn't make me a bad parent.”"],
    people: "Try: “I'm struggling more than I expected. Could you bring a meal or watch the baby for two hours?”" },
  helper: { feel: "They may feel exhausted, anxious, and afraid to admit they're not okay.",
    say: ["“You're doing a good job.”", "“How are you really doing?”"],
    avoid: ["“Enjoy every moment.”", "Unasked-for advice.", "Visiting without helping."],
    help: ["Bring food, do dishes, or hold the baby so they can sleep.", "Check in often in the first months.", "Encourage them to talk to their doctor if they seem low."],
    you: "Watch for the other parent too. Partners can struggle quietly." },
  faith: "Many traditions welcome a new child with blessing and community. Being carried by others in this season is part of that welcome.",
  practices: ["leaves|Sleep", "branches|Ask for Help", "leaves|Morning Daylight", "bark|Self-Compassion Break"],
  reach: ["Sadness, anxiety, or scary thoughts that last more than two weeks: call the National Maternal Mental Health Hotline, 1-833-852-6262, any time.", "Thoughts of harming yourself or your baby: call or text 988, or call 911 now."],
  more: [L.psi, L.mmh] },
{ id: "incarceration", ring: "family", title: "When Someone You Love Is Incarcerated", keys: "jail prison incarcerated arrested sentence inmate visiting family of prisoner", parts: ["branches", "bark", "fruit"],
  quick: ["Having someone you love in jail or prison is a real loss, even though they're still alive.", "Many families feel shame, but you haven't done anything wrong.", "Staying connected, when it's safe, often helps everyone.", "You deserve support too."],
  feel: "Grief, anger, worry, and loneliness can all come at once. Money, childcare, and phone calls may get harder. People may judge you, or you may keep it secret.",
  self: { first: ["Learn the facility's rules for calls, mail, and visits.", "Tell one trusted person what's happening.", "Make a simple plan for money and childcare."],
    helps: ["Support groups for families of incarcerated people.", "Letters and routines that keep connection steady.", "Taking care of your own health."],
    tell: ["“Their choices are not my shame.”", "“I can love someone and still set limits.”"],
    people: "Try: “My family is going through something hard. I don't need to explain everything, but I could use support.”" },
  helper: { feel: "They may feel ashamed, isolated, or worn out.",
    say: ["“I'm here, and I'm not judging.”", "“How are you and the kids holding up?”"],
    avoid: ["Gossip.", "Asking for details about the case."],
    help: ["Offer rides to visits or help with childcare.", "Include them. Families often get dropped from invitations.", "Help children keep a connection if it's safe."],
    you: "Supporting a family through this can be long. Pace yourself." },
  faith: "Many traditions call people to visit the prisoner and care for their families, and to hold both justice and mercy.",
  practices: ["branches|Support Group", "branches|One Reach-Out a Day", "roots|Lament", "fruit|Tiny Next Step"],
  reach: ["If the stress is affecting your health or your children, reach out to a counselor.", "Thoughts of suicide: call or text 988."],
  more: [L.mndoc, L.nami] },
{ id: "moving", ring: "work", title: "Moving to a New Place", keys: "move moving relocation new town new city homesick starting over no friends", parts: ["branches", "trunk", "leaves"],
  quick: ["Moving is one of life's big stressors, even when it's a good change.", "Homesickness is a form of grief for places and people.", "It usually takes months, not weeks, to feel at home.", "Small, regular routines help a new place become yours."],
  feel: "You may feel excited and lonely at the same time. Familiar comforts are gone, and everything takes more energy. Children and partners may adjust at different speeds.",
  self: { first: ["Unpack one room fully so you have a calm space.", "Find a nearby walk, a coffee shop, or a park.", "Keep one old routine going."],
    helps: ["Joining one group, like a class, team, or faith community.", "Saying yes to invitations, even small ones.", "Staying in touch with old friends while building new ones."],
    tell: ["“Feeling at home takes time.”", "“I can miss the old place and still grow here.”"],
    people: "Try: “We just moved here. Is there a group or place you'd recommend?”" },
  helper: { feel: "They may feel lonely and unsure how to start over.",
    say: ["“Welcome! Want to grab coffee?”", "“How are you settling in?”"],
    avoid: ["Assuming they're fine because it was their choice."],
    help: ["Invite them to something specific.", "Share local tips, like doctors and good parks.", "Introduce them to one person."],
    you: "Being a welcomer is a quiet gift to your whole community." },
  faith: "Many traditions honor the stranger and the traveler. Faith communities are often among the first places newcomers find belonging.",
  practices: ["branches|Clubs", "branches|Neighbors", "roots|Sit Spot", "fruit|Something to Look Forward To"],
  reach: ["Loneliness or low mood that doesn't lift after several months.", "Thoughts of suicide: call or text 988."],
  more: [L.nami, L.m211] },
{ id: "military", ring: "work", title: "Coming Home From Military Service", keys: "veteran military service deployment coming home transition civilian ptsd moral injury va", parts: ["trunk", "branches", "bark"],
  quick: ["Leaving military life is a big transition, even when you're glad to be home.", "Many veterans miss the purpose and closeness of their unit.", "Help built for veterans is free, and it works.", "Veterans Crisis Line: call 988 and press 1, or text 838255."],
  feel: "Civilian life may feel slow, confusing, or lonely. You may miss the structure and the people. Some veterans carry memories, injuries, or moral injury that are hard to talk about.",
  self: { first: ["Connect with your local County Veterans Service Officer, or the Minnesota Department of Veterans Affairs.", "Reach out to one person from your unit.", "Build a simple daily routine."],
    helps: ["Veteran peer groups.", "Finding a new mission, like work, service, or learning.", "Physical activity and good sleep."],
    tell: ["“My service mattered, and so does what comes next.”", "“Asking for help is a strength I already know.”"],
    people: "Try: “I'm finding the transition harder than I expected. Can we talk?”" },
  helper: { feel: "They may feel out of place, or carry things they aren't ready to share.",
    say: ["“I'm glad you're home.”", "“I'm here if you ever want to talk.”"],
    avoid: ["Asking if they killed anyone.", "Assuming every veteran has PTSD."],
    help: ["Invite them into community.", "Help them connect with veteran services.", "Be patient. Adjustment takes time."],
    you: "Families go through the transition too. Veteran family support is available." },
  faith: "Many traditions have rituals for warriors returning home, to honor their service and help them lay down what they carried. Chaplains can help with moral injury.",
  practices: ["trunk|Purpose Statement", "branches|Support Group", "trunk|Moral Repair Letter", "leaves|Walk or Jog"],
  reach: ["Veterans Crisis Line: call 988 and press 1, or text 838255, any time.", "Nightmares, anger, or drinking that keep growing: talk with the VA or a counselor."],
  more: [L.vcl, L.mdva, L.ptsd] },

/* ================= ADDED IN SESSION 7 ================= */
{ id: "self-harm", ring: "safety", title: "Self-Harm", keys: "self harm self-harm self injury selfharm cutting burning hurting myself on purpose scratching my child is cutting teen cutting 988", parts: ["bark", "branches", "fruit"],
  quick: ["If you are badly hurt, call 911. If you are thinking about suicide, call or text 988.", "Self-harm is a sign of pain that needs care, not a character flaw.", "It tends to get harder to stop over time, and it can become more dangerous. You don’t have to stop alone.", "For parents: stay calm, care for wounds, and get your child seen this week."],
  feel: "Overwhelming feelings, numbness, shame, or a need to feel in control. Secrecy, and fear of what people would think if they knew.",
  self: { first: ["Tell one safe person: a friend, a doctor, a counselor, or 988.", "Put distance between you and the things you use, or ask someone to hold them for you.", "Care for any wounds, and get medical care for anything deep or infected."],
    helps: ["A counselor trained in DBT or another skills-based therapy.", "A written plan for hard moments: warning signs, people to call, places to go.", "Ways through a hard moment that do not hurt your body: call or text someone, go where people are, walk, breathe slowly, or write or draw what you feel."],
    tell: ["“This urge will pass, even if it doesn’t feel like it.”", "“I deserve care, not punishment.”", "“Reaching out is the brave thing.”"],
    people: "Try: “I’ve been hurting myself when things get bad. I want help stopping.”" },
  helper: { feel: "They may feel ashamed, afraid you will be angry, or afraid you will take away the only way they know to get through.",
    say: ["“Thank you for telling me. I’m not going anywhere.”", "“Are you thinking about killing yourself?”", "“Let’s find someone who can help with the pain underneath.”"],
    avoid: ["Anger, panic, or ultimatums.", "Demanding a promise to stop.", "Calling it attention-seeking."],
    help: ["Stay calm and help care for wounds.", "Help them get an appointment this week.", "Secure medicines and sharp items at home, calmly.", "For parents: loop in the school counselor if school is part of the picture."],
    you: "It is frightening to love someone who hurts themselves. Get support for yourself too, from a counselor, a parent group, or a trusted friend." },
  faith: "Many traditions teach that we are held and loved in our wounds, not only after they heal. Grace comes first, before getting better.",
  practices: ["bark|Self-Compassion Break", "bark|Slow Exhale", "branches|Ask for Help", "trunk|Get Counseling"],
  reach: ["Call or text 988 any time, or text HOME to 741741.", "Call 911 for a serious injury, or if someone is in danger right now.", "See a doctor or counselor this week if self-harm has happened at all."],
  more: [L.lifeline, L.nami, ['Cornell Self-Injury and Recovery Resources', 'https://selfinjury.bctr.cornell.edu']], kids: "self-harm" },

{ id: "eating", ring: "health", title: "Eating Disorders", keys: "eating disorder eating disorders anorexia bulimia binge eating arfid purging restricting not eating food weight body image obsessed with food", parts: ["leaves", "bark", "roots"],
  quick: ["Eating disorders are serious medical illnesses, not choices or vanity.", "Anyone can have one, at any age, size, or shape.", "Recovery is real. It usually takes a team: a doctor, a therapist, and a dietitian.", "If you are worried, start with a doctor visit."],
  feel: "Thoughts about food, weight, or your body that take up more and more room. Rules, secrecy, guilt after eating, or feeling out of control around food.",
  self: { first: ["Make a doctor’s appointment and tell them honestly what is going on.", "Call the ANAD Helpline at 1-888-375-7767 for support and treatment options.", "Tell one person you trust."],
    helps: ["Treatment with people who specialize in eating disorders.", "Regular meals and snacks, as your care team guides.", "Less time with accounts, apps, or people that push dieting or body comparison."],
    tell: ["“My body deserves to be fed, even when my thoughts say otherwise.”", "“I am more than my body.”", "“Asking for help is part of recovery.”"],
    people: "Try: “I’ve been struggling with food and my body, and I think I need help.”" },
  helper: { feel: "They may feel ashamed, defensive, or afraid of losing control. The illness often argues back.",
    say: ["“I care about you, and I’ve been worried.”", "“I’ve noticed you’re skipping meals and seem stressed at dinner.” Describe what you see, without talking about weight.", "“Will you see a doctor with me?”"],
    avoid: ["Comments about their weight or looks, including praise for weight loss.", "Arguing about food, or policing their plate on your own.", "Waiting for them to hit bottom."],
    help: ["Go with them to the doctor.", "For a child or teen, families are a key part of treatment. Ask about family-based treatment.", "Keep meals calm and together."],
    you: "Loving someone with an eating disorder is exhausting. Caregiver support groups, like ANAD’s, can help." },
  faith: "Many traditions treat the shared table as sacred and the body as a gift. Recovery can be a way of receiving that gift again.",
  practices: ["leaves|Sleep", "bark|Self-Compassion Break", "branches|Support Group", "trunk|Get Counseling"],
  reach: ["See a doctor soon for weight changes, dizziness, fainting, missed periods, or making yourself throw up.", "Call 911 for fainting, chest pain, a racing or uneven heartbeat, or confusion.", "ANAD Eating Disorders Helpline: 1-888-375-7767. National Alliance for Eating Disorders Helpline: 1-866-662-1235. Thoughts of suicide: call or text 988."],
  more: [['ANAD', 'https://anad.org'], ['National Alliance for Eating Disorders', 'https://www.allianceforeatingdisorders.com'], ['The Emily Program (Minnesota)', 'https://emilyprogram.com']], kids: "food-worries" },

{ id: "accident", ring: "health", title: "After a Car Accident or Sudden Injury", keys: "car accident crash wreck collision injured injury hit by a car trauma er icu hospital concussion brain injury at fault guilt insurance", parts: ["leaves", "bark", "branches"],
  quick: ["See a doctor, even if you feel fine. Some injuries show up later.", "Shock, replaying it, and jumpiness are normal in the first weeks.", "If you were at fault, guilt can be heavy. You still deserve care.", "If fear, nightmares, or flashbacks last past a month, ask about trauma therapy."],
  feel: "Shaky, numb, jumpy, or angry. Replaying what happened. Afraid to drive or ride. Pain, and a pile of calls, forms, and appointments on top of it.",
  self: { first: ["See a doctor, and follow up on anything that gets worse, especially head injury signs.", "Let someone else handle calls and paperwork for a few days.", "Rest, and go back to driving in small steps."],
    helps: ["Talking it through with someone who listens.", "A simple notebook for appointments, costs, and calls.", "Trauma-focused therapy, if memories keep intruding."],
    tell: ["“I’m safe now.”", "“My body and mind are still catching up. That’s normal.”"],
    people: "Try: “I’m still shaken up from the accident. Could you help me with rides for a bit?”" },
  helper: { feel: "They may be in pain, embarrassed to need help, or carrying guilt about what happened.",
    say: ["“I’m so glad you’re here.”", "“What would help most this week?”"],
    avoid: ["Asking whose fault it was.", "Stories about other people’s crashes."],
    help: ["Drive them to appointments.", "Bring meals.", "Sit with family at the hospital, or take a night shift at home."],
    you: "If someone you love is badly hurt, you are in a crisis too. Eat, sleep when you can, and let others help." },
  faith: "Many people pray for healing, give thanks for the helpers, or wrestle with why. All of it belongs. A hospital chaplain can sit with you.",
  practices: ["leaves|Sleep", "bark|Slow Exhale", "branches|Ask for Help", "roots|Prayer"],
  reach: ["Go to the ER for a headache that gets worse, repeated vomiting, confusion, slurred speech, weakness, or a seizure.", "Talk with your doctor if fear, nightmares, or flashbacks last more than a month.", "If someone died in the crash, see the grief guides too. Thoughts of suicide: call or text 988."],
  more: [L.ptsd, ['CDC HEADS UP: Concussion', 'https://www.cdc.gov/heads-up/'], ['Brain Injury Alliance of Minnesota', 'https://www.braininjurymn.org']], kids: "accident" },

{ id: "porn", ring: "health", title: "Pornography That’s Hard to Stop", keys: "porn pornography compulsive sexual behavior sex addiction lust partner found porn husband watches porn wife watches porn betrayal shame accountability", parts: ["roots", "bark", "branches"],
  quick: ["Many people struggle with pornography use that feels out of their control. Many people share this.", "Shame tends to feed the cycle. Honesty and support help break it.", "Look for help that fits your values: a counselor, a faith leader, or a support group.", "Anything involving minors is illegal and deeply harmful. Stop, and get help now."],
  feel: "A cycle of urges, use, and regret. Secrecy and shame. For a partner who found out: shock, hurt, and questions about your own worth.",
  self: { first: ["Tell one trusted person the truth.", "Add friction: filters, devices out of the bedroom, and no screens when you are alone and worn out.", "Notice what comes right before the urge: stress, loneliness, boredom, or late nights."],
    helps: ["A counselor experienced with compulsive sexual behavior.", "A support or accountability group, faith-based or not.", "Meeting the need underneath in better ways: rest, connection, movement, purpose."],
    tell: ["“A slip is not a verdict on who I am.”", "“I can choose the next right thing.”"],
    people: "Try: “I’ve been struggling with porn, and I want to be honest with you about it.”" },
  helper: { feel: "A partner’s hurt is real and deserves care of its own. A friend may be afraid you will see them differently.",
    say: ["“Thank you for telling me the truth.”", "For a partner: “This hurts, and I need some time.”", "“What kind of help are you looking for?”"],
    avoid: ["Becoming their full-time monitor.", "Making every big decision in the first days after finding out."],
    help: ["Encourage counseling, and consider couples counseling when you are both ready.", "Get support for yourself, too."],
    you: "If you are the partner, see the Betrayal guide, and find someone safe to talk to." },
  faith: "Many traditions hold clear values about sex and faithfulness, and they also teach mercy, confession, and new beginnings. Both can be true at once.",
  practices: ["roots|Prayer", "branches|Support Group", "trunk|Values Sort", "trunk|Get Counseling"],
  reach: ["If use is harming your relationships, work, or sense of self, see a counselor.", "If you are drawn to sexual images of minors, get confidential help from Stop It Now before anyone is harmed. If you come across child sexual abuse material, report it at report.cybertip.org or 1-800-843-5678.", "Thoughts of suicide: call or text 988."],
  more: [['Stop It Now', 'https://www.stopitnow.org'], L.apa, ['The Gottman Institute', 'https://www.gottman.com']], kids: "saw-porn" },

{ id: "adhd", ring: "inside", title: "ADHD as an Adult, or a Late Diagnosis", keys: "adhd add adult adhd attention focus distracted forgetful late diagnosis diagnosed as an adult executive function procrastination learning disability dyslexia", parts: ["bark", "trunk", "leaves"],
  quick: ["ADHD is real in adults, and many people are not diagnosed until later in life.", "A diagnosis can bring relief, grief, or both.", "Treatment works: medication, coaching, therapy, and tools that fit how your brain works.", "Your struggles were never proof that you were lazy or careless."],
  feel: "Relief at finally having a name for it. Grief for the years you blamed yourself. Frustration with forgetting, starting, or finishing things, even when you care a lot.",
  self: { first: ["Talk with your doctor about an evaluation, and bring examples from school, work, and home.", "Write down what gets in the way most, so you know where to start.", "Pick one tool to try this week, like a visible calendar or reminders on your phone."],
    helps: ["Treatment matched to you, which may include medication, therapy, or coaching.", "Systems outside your head: lists, alarms, and one place for keys.", "Sleep, movement, and time outdoors."],
    tell: ["“My brain works differently. It is not a character flaw.”", "“I can build systems that work for me.”"],
    people: "Try: “I recently learned I have ADHD. It explains a lot, and here is what helps me.”" },
  helper: { feel: "They may feel defensive after years of being called forgetful, or overwhelmed by what they are learning about themselves.",
    say: ["“That makes so much sense.”", "“What would help most?”"],
    avoid: ["“Everybody’s a little ADHD.”", "Nagging instead of building a shared system."],
    help: ["Make shared plans visible, like a family calendar.", "Notice what they do well."],
    you: "Living with ADHD affects partners and families too. Couples and family support can help everyone." },
  faith: "Many traditions teach that each person is made with purpose and gifts. A late diagnosis can be a chance to make peace with who you are, and to stop fighting yourself.",
  practices: ["bark|Self-Compassion Break", "trunk|Values Sort", "leaves|Movement", "fruit|Tiny Next Step"],
  reach: ["See your doctor if focus, mood, or daily life feel out of control.", "Anxiety and depression often come with ADHD. Get help for those too. Thoughts of suicide: call or text 988."],
  more: [['CHADD', 'https://chadd.org'], ['Understood (for adults, too)', 'https://www.understood.org'], L.nami], kids: "attention" },

{ id: "gambling", ring: "health", title: "Gambling That’s Out of Control", keys: "gambling gamble betting sports betting casino lottery scratch tickets slots poker fantasy sports online betting apps debt chasing losses gambling addiction problem gambling", parts: ["leaves", "branches", "fruit"],
  quick: ["Gambling disorder is a real, treatable addiction.", "In Minnesota, treatment is often free for gamblers and their families. Call 1-800-333-4673 (HOPE).", "Put barriers in place: block betting apps and sites, and let someone else hold the money for a while.", "Gambling problems raise the risk of suicide. If you feel hopeless, call or text 988."],
  feel: "Chasing losses. Hiding bets or money. Promising to stop and not being able to. Shame, panic about debt, and a hope that the next win will fix everything.",
  self: { first: ["Call the Minnesota Problem Gambling Helpline at 1-800-333-4673, or text HOPE to 53342.", "Block gambling apps and sites, and ask about self-exclusion at casinos and betting sites.", "Tell one person the full truth about the money."],
    helps: ["Counseling with a gambling treatment provider.", "Gamblers Anonymous or another support group.", "Free financial counseling to face the debt with a plan."],
    tell: ["“The next bet won’t fix this. Getting help will.”", "“One honest step today is enough.”"],
    people: "Try: “I have a gambling problem, and I need help. Here is how bad it is.”" },
  helper: { feel: "They may feel ashamed, defensive, or sure they can win it back.",
    say: ["“I love you, and I’m worried about the gambling.”", "“There is free help in Minnesota. I’ll sit with you while you call.”"],
    avoid: ["Paying off their debts without a plan.", "Lending money “just this once.”"],
    help: ["Protect household money: separate accounts, and limits on shared cards.", "Find support for yourself, like Gam-Anon."],
    you: "You can get free counseling in Minnesota as an affected family member, even if they won’t go." },
  faith: "Many recovery paths draw on surrender, honesty, and community. Grace can meet you in the middle of the mess, and so can people who have been there.",
  practices: ["branches|Support Group", "trunk|Get Counseling", "roots|Prayer", "fruit|Tiny Next Step"],
  reach: ["Minnesota Problem Gambling Helpline: 1-800-333-4673 (HOPE), or text HOPE to 53342. Outside Minnesota: 1-800-GAMBLER.", "Thoughts of suicide: call or text 988. Call 911 if you are in danger."],
  more: [['Minnesota Alliance on Problem Gambling', 'https://mnapg.org'], ['GetGamblingHelp.com (Minnesota)', 'https://getgamblinghelp.com'], ['National Council on Problem Gambling', 'https://www.ncpgambling.org']], kids: "addiction" }
];

window.OAK_GUIDES = { rings: LC_RINGS, links: L, topics: LC_TOPICS, maple: SAP };
})();
/* LIFE tags start: Health and Ability tags (GWG BLD 756, HA 1). life: shared/gg-life.js ids. Generated by worker A. */
(function () { var G = window.OAK_GUIDES; if (!G || !G.topics) return; var L = {"diagnosis": ["health", "serious"], "chronic": ["health", "pain"], "disability": ["moving", "hearing", "seeing", "health"], "caregiving": ["close", "serious"], "dementia-care": ["close", "memory"], "adhd": ["learning"], "addiction": ["sober", "mind", "health"], "accident": ["moving", "pain", "memory"], "anxiety": ["mind"], "ambiguous-loss": ["close", "memory"], "sadness": ["mind"], "own-death": ["serious"], "dying-loved": ["close", "serious"], "trauma": ["mind"], "struggling-child": ["close", "autism", "learning", "mind"], "aging-parents": ["close", "memory"], "eating": ["mind", "health"], "self-harm": ["mind"], "eol-plan": ["serious"], "suicidal-self": ["mind"], "burnout": ["close"]};
  G.topics.forEach(function (t) { if (L[t.id]) t.life = L[t.id].slice(); }); })();
/* LIFE tags end */
/* HA2 guides start: the Health and Ability guides (GWG BLD 757, HA 2). Generated from patches/bld757/source/O in grounded-workshop
   by gen.py: edit the data there and rebuild. Ring 'life' is the Health and Ability ring (shared/gg-life-kit.js); life tags are
   shared/gg-life.js ids, so Picked for You finds them. Each topic has the same shape as the guides above. */
(function () { var G = window.OAK_GUIDES; if (!G || !G.topics) return; var T = [
 {
  "id": "pacing",
  "ring": "life",
  "title": "Fatigue, Flares, and Pacing Your Energy",
  "keys": "fatigue tired exhausted no energy flare flare up flares pacing pace energy spoons spoon theory chronic fatigue chronic pain autoimmune lupus multiple sclerosis ms fibromyalgia long covid arthritis crohns colitis boom and bust crash rest good days bad days canceling plans invisible illness",
  "parts": [
   "leaves",
   "bark",
   "trunk"
  ],
  "life": [
   "pain",
   "health",
   "serious"
  ],
  "quick": [
   "Fatigue from a health condition is real, and it is different from ordinary tiredness. A night of sleep may not fix it.",
   "Pacing means planning for energy, not just time: doing a little less on good days, so the hard days hit less hard.",
   "Flares come and go. A plan made on a good day makes a flare day easier.",
   "Rest is part of living well. You choose the words for what you live with, and how much you share."
  ],
  "feel": "Tired in a way sleep doesn't touch. Guilty for canceling again. Frustrated when one good day turns into three hard ones because you did too much. Unseen, when people say you look fine. Grieving the pace you used to keep, and still hoping for the good days.",
  "self": {
   "first": [
    "For one week, notice when your energy rises and falls, and what costs you the most.",
    "Each evening, pick the three things that matter most for tomorrow, and let the rest wait.",
    "On a good day, write a short flare plan: what can be canceled, who to tell, and what helps your body."
   ],
   "helps": [
    "Breaking big tasks into small pieces, with rest in between.",
    "Resting before you are spent, not after you crash.",
    "A simple way to explain your energy. Many people use spoons: a day holds only so many, and every task uses some.",
    "A self-management workshop led by people who live with a long-term condition too.",
    "Telling your doctor about fatigue as clearly as you tell them about pain."
   ],
   "tell": [
    "“Rest is part of how I live well, not a failure.”",
    "“A good day is for enjoying, not for catching up on everything.”"
   ],
   "people": "Try: “I have a set amount of energy each day. I want to come, and I may need to sit, rest first, or leave early.”"
  },
  "helper": {
   "feel": "They may feel guilty for canceling, worried you will stop asking, or tired of explaining an illness people can't see. Some days they won't know until morning what they can do.",
   "say": [
    "“I believe you.”",
    "“No need to explain. What would make today easier?”",
    "“Come for an hour. Leaving early is fine.”"
   ],
   "avoid": [
    "“But you looked fine yesterday.”",
    "“Just push through.”",
    "Cures or advice they didn't ask for.",
    "Taking a canceled plan personally."
   ],
   "help": [
    "Make plans that can bend: shorter visits, a place to sit, a home option.",
    "On flare days, offer something specific: a meal, an errand, a ride.",
    "Keep inviting them, even after a no."
   ],
   "you": "Living beside someone's fatigue can be tiring and lonely for you too. Keep your own people and your own rest close, and let plans bend for both of you."
  },
  "faith": "If faith is part of your life, a practice that asks little of your body can still hold you: a short prayer, a few words read slowly, a moment of quiet. Many traditions honor rest as holy. If faith isn't part of your life, rest can still be a way of honoring the life you have.",
  "practices": [
   "leaves|Pacing Your Day",
   "leaves|Rest Before You're Spent",
   "bark|Micro-Rest",
   "bark|Hard-Day Plan",
   "branches|Say What You Need"
  ],
  "reach": [
   "Fatigue that is new, getting worse, or comes with new symptoms: tell your doctor.",
   "Sadness or hopelessness that won't lift: talk with your doctor or a counselor.",
   "Thoughts of not wanting to live: call or text 988, any time. In danger right now, call 911."
  ],
  "more": [
   [
    "Self-Management Resource Center: workshops for living with a long-term condition",
    "https://selfmanagementresource.com/"
   ],
   [
    "The Spoon Theory, by Christine Miserandino",
    "https://butyoudontlooksick.com"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ],
  "kids": "family-illness"
 },
 {
  "id": "work-ability",
  "ring": "life",
  "title": "Working with a Disability or Illness, or Stepping Away",
  "keys": "work job career disability illness chronic illness accommodation accommodations reasonable accommodation ada americans with disabilities act telling my boss disclose disclosure hr human resources cutting hours part time leave medical leave stepping away quitting leaving work disability benefits ssdi going back to work return to work coworkers employer workplace",
  "parts": [
   "trunk",
   "leaves",
   "branches"
  ],
  "life": [
   "health",
   "pain",
   "moving",
   "hearing",
   "seeing",
   "learning",
   "autism",
   "mind",
   "serious",
   "memory"
  ],
  "quick": [
   "Many workers living with a disability or health condition can ask for reasonable changes at work, called accommodations: a different schedule, a seat, a quieter space, a tool, or time for appointments.",
   "You decide how much to share at work. Some people name their condition; some describe only what they need.",
   "Cutting hours, taking leave, or stepping away can be a wise choice, not a defeat. Get information before you decide.",
   "Your worth was never only your work. You choose the words for what you live with."
  ],
  "feel": "Worried about being seen as less capable. Tired from working hard to look fine. Afraid of losing income, insurance, or the work you love. Unsure whether to tell your boss, and what happens if you do. If you are stepping away, grief for the role, the people, and the person you were at work.",
  "self": {
   "first": [
    "Write down what makes work hardest right now, and one change that would help most.",
    "Look up accommodation ideas for your situation. The Job Accommodation Network has many.",
    "Before any big decision about leaving or cutting back, talk with someone who knows benefits and work rules, like Disability Hub MN."
   ],
   "helps": [
    "Asking for what you need in plain words, starting with what would help you do the job well.",
    "Keeping simple notes of what you asked for, when, and what was agreed.",
    "Your doctor or care team, who can describe what you need in writing if your employer asks.",
    "Finding others who have worked with the same condition, or stepped away, and asking what helped.",
    "Remembering the things you bring that have nothing to do with a job title."
   ],
   "tell": [
    "“Asking for what I need is part of doing good work.”",
    "“My worth is bigger than my job.”"
   ],
   "people": "Try, at work: “I'd like to talk about a change that would help me do my best work. It would help me to have...”"
  },
  "helper": {
   "feel": "They may feel ashamed to need changes, afraid of being judged, or grieving work that was part of who they are. If they are stepping away, money worry and lost routine can hit hard.",
   "say": [
    "“What would make work easier for you?”",
    "“You're still you, whatever your job looks like.”",
    "“Want help thinking through your options?”"
   ],
   "avoid": [
    "“Just tell them you're sick.” The choice to share is theirs.",
    "“Must be nice to be home all day.”",
    "Pushing them to keep working, or to quit, before they have the facts."
   ],
   "help": [
    "If you are their manager, ask what would help, and keep what they tell you private.",
    "If you are family, help gather information on benefits and options, and let them decide.",
    "Keep inviting them to the people and places that matter to them, at work and beyond."
   ],
   "you": "A change in someone's work can shift money, routines, and roles for the whole household. Find support for yourself, and talk openly about the changes together."
  },
  "faith": "If faith is part of your life, you may find that your calling is bigger than any one job: in how you love, notice, and show up for others. Some traditions speak of every person's gifts as needed. If faith isn't part of your life, the same holds: your worth and purpose go beyond your work.",
  "practices": [
   "trunk|Worth Beyond Doing",
   "trunk|Job Crafting",
   "branches|Say What You Need",
   "trunk|Values Sort",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Questions about work, benefits, and services in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "Ideas for accommodations at work: the Job Accommodation Network, askjan.org.",
   "If you believe you are being treated unfairly at work because of a disability: the U.S. Equal Employment Opportunity Commission, eeoc.gov, or a lawyer.",
   "Sadness or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Job Accommodation Network",
    "https://askjan.org"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ],
   [
    "U.S. Equal Employment Opportunity Commission",
    "https://www.eeoc.gov"
   ]
  ]
 },
 {
  "id": "parenting-ability",
  "ring": "life",
  "title": "Parenting with a Disability or Chronic Illness",
  "keys": "parenting parent mom dad mother father disability chronic illness pain fatigue wheelchair blind deaf mental health condition kids children telling my kids what to tell children good enough parent guilt flare days help with kids young carer kids helping too much judged as a parent adaptive parenting",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "life": [
   "health",
   "pain",
   "moving",
   "hearing",
   "seeing",
   "mind",
   "serious"
  ],
  "quick": [
   "Children need love, safety, and connection. A disability or illness changes how you parent, not whether you are a good parent.",
   "Honest, simple words about your condition, fitted to your child's age, help children feel safe.",
   "Plan for hard days ahead of time, so children know what happens when you need to rest.",
   "Kids can help, as long as it stays a part of family life, not the weight of a grown-up's job. You choose the words for what you live with."
  ],
  "feel": "Worried you are not enough for your kids. Guilty on the days you can't do what other parents do. Tired of people who judge, or who offer help that takes over. Proud of the ways you have found to parent well. Sometimes all of those in one afternoon.",
  "self": {
   "first": [
    "Tell your children about your condition in a few simple, true words, and invite their questions.",
    "Make a hard-day plan with your family: who helps, what the kids can do, what can wait.",
    "Name two or three people you can call for a ride, a meal, or an hour with the kids."
   ],
   "helps": [
    "Doing parenting your way: reading in bed together, games at the table, adapted tools, shorter outings.",
    "Small, steady moments of connection, which matter to children more than big outings.",
    "Letting kids help in ways that fit their age, and thanking them, while grown-ups carry the grown-up jobs.",
    "Letting your child's teacher or coach know, if your child seems worried, with your child's say.",
    "Other parents living with a disability or illness, who know the shortcuts and the feelings."
   ],
   "tell": [
    "“My kids need my love and presence, and I have both to give.”",
    "“Asking for help is part of good parenting.”"
   ],
   "people": "Try, with your kids: “My body needs rest today. That's not because of anything you did. Want to pick a game we can play at the table?”"
  },
  "helper": {
   "feel": "They may feel judged as a parent, worried about their kids, and torn between needing help and wanting to keep their place as the parent.",
   "say": [
    "“You're a good parent.”",
    "“Want me to take the kids Saturday morning so you can rest?”",
    "“What kind of help would feel like help?”"
   ],
   "avoid": [
    "Taking over parenting decisions.",
    "Asking the kids to report on their parent.",
    "“How do you even manage?” said with pity."
   ],
   "help": [
    "Offer specific, regular help: school pickup, a meal, an hour of play.",
    "Support their parenting in front of the children.",
    "Notice if a child seems to carry too much, and gently offer that child some fun and rest too."
   ],
   "you": "Helping a family can be a long, steady commitment. Keep your offers ones you can keep, and care for your own energy too."
  },
  "faith": "If faith is part of your life, a faith community can be a real circle of help: meals, rides, and people who love your kids. Many traditions honor the quiet, daily love of a parent as holy work. If faith isn't part of your life, the same truth holds: steady love is the heart of parenting.",
  "practices": [
   "branches|Ask for Help",
   "branches|Family",
   "bark|Hard-Day Plan",
   "fruit|Capture the Moment",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Help with services, equipment, and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "If your children seem worried, withdrawn, or are carrying a lot at home: talk with their school counselor or doctor.",
   "Sadness or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ],
   [
    "American Association of Caregiving Youth",
    "https://aacy.org/"
   ],
   [
    "NAMI (for parents living with a mental health condition)",
    "https://www.nami.org"
   ]
  ],
  "kids": "disability"
 },
 {
  "id": "child-ability",
  "ring": "life",
  "title": "Raising a Child with a Disability or Serious Illness",
  "keys": "my child has a disability special needs child disabled child autism down syndrome cerebral palsy medically complex child seriously ill child childhood cancer chronic illness in my child diagnosis iep 504 plan school advocacy siblings parent burnout respite chronic sorrow grief milestones therapies appointments hospital stays",
  "parts": [
   "branches",
   "trunk",
   "leaves"
  ],
  "life": [
   "close"
  ],
  "quick": [
   "Love for your child and grief for the plans you had can live side by side. Waves of sadness at milestones are normal, not a problem to fix.",
   "You know your child best. Your voice belongs in every room where decisions are made, at school and in medical care.",
   "Brothers and sisters need their own time, words, and support.",
   "You can't pour from an empty cup. Rest, help, and people who understand are part of raising your child well."
  ],
  "feel": "Fierce love. Exhaustion from appointments, therapies, forms, and phone calls. Sadness that comes in waves, sometimes at a birthday or a first day of school. Joy in moments other people may not notice. Loneliness when friends don't understand. Fear for the future, and pride in your child.",
  "self": {
   "first": [
    "Keep one notebook or folder for your child: diagnoses, medicines, contacts, school plans, and questions.",
    "Find one parent who has walked a similar road, through a parent group, your child's clinic, or PACER Center.",
    "Plan one break for yourself this month, even an hour, and let someone you trust take a turn."
   ],
   "helps": [
    "Asking about school supports, like an IEP or a 504 plan, and bringing a support person to meetings.",
    "Finding others who understand: a parent group, a disability community, or families from your child's clinic.",
    "Time alone with each of your other children, and simple, honest words for them.",
    "Letting your child speak for themselves in every way they can, and teaching others to listen to them.",
    "Counseling for you or your marriage when the strain runs high."
   ],
   "tell": [
    "“My grief and my love can both be true.”",
    "“Others can walk this with me.”"
   ],
   "people": "Try: “Our child has a lot of needs right now, and so do we. Would you be willing to bring a meal on Thursdays, or sit with the kids for an hour?”"
  },
  "helper": {
   "feel": "They may be exhausted, lonely, and tired of explaining. Some days hold grief; most hold love and ordinary life too.",
   "say": [
    "“Tell me about your kid. What do they love?”",
    "“I'm in this with you, for the long haul.”",
    "“Can I take something off your list this week?”"
   ],
   "avoid": [
    "“Special kids are given to special parents.”",
    "“I could never do what you do.”",
    "Comparing their child to other children, or offering cures."
   ],
   "help": [
    "Learn about their child, and include the child by name.",
    "Offer regular, specific help: a meal, an errand, time with the siblings.",
    "Make gatherings work for their child, and ask what that needs."
   ],
   "you": "Supporting a family for the long haul takes steady energy. Keep your help sustainable, and let yourself enjoy their child too."
  },
  "faith": "If faith is part of your life, you may find strength in a community that welcomes your whole family, or you may wrestle with hard questions, and both belong. Many traditions hold that every child carries sacred worth, exactly as they are. If faith isn't part of your life, the same truth holds: your child's worth is whole.",
  "practices": [
   "branches|Support Group",
   "branches|Ask for Help",
   "branches|A Break for the Helper",
   "fruit|Joy List",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "For families of children and young adults with any disability, birth to 21, including school plans: PACER Center, 952-838-9000.",
   "Help finding services and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "Information and peer support if your child has a mental health condition: NAMI HelpLine, 1-800-950-6264, or text \"helpline\" to 62640. Not a crisis line.",
   "Exhaustion, sadness, or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "PACER Center",
    "https://www.pacer.org"
   ],
   [
    "Courageous Parents Network",
    "https://courageousparentsnetwork.org/"
   ],
   [
    "Sibling Support Project",
    "https://siblingsupport.org/"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ],
  "kids": "disability"
 },
 {
  "id": "hearing",
  "ring": "life",
  "title": "Hearing Loss or Deafness as an Adult",
  "keys": "hearing loss hard of hearing deaf deafness going deaf losing my hearing hearing aids cochlear implant tinnitus captions asl american sign language lip reading audiologist listening fatigue noisy restaurants meetings phone calls deaf community hearing loss at work",
  "parts": [
   "branches",
   "bark",
   "leaves"
  ],
  "life": [
   "hearing"
  ],
  "quick": [
   "Hearing loss in adulthood is common, and it can change work, friendships, and how tired you feel at the end of a day.",
   "Listening takes extra effort. Tiredness after conversations is real, and rest helps.",
   "Telling people what helps opens doors: face me, one at a time, captions, a quieter place, or writing it down.",
   "You choose your words. Some say hard of hearing; some say deaf; many in the Deaf community use a capital D for a language and culture they are proud of."
  ],
  "feel": "Tired from working to follow conversations. Embarrassed to ask again. Left out at dinners and meetings, nodding along. Grieving voices, music, or sounds you used to know. Or, for some, relieved to find captions, sign language, or a Deaf community that feels like home.",
  "self": {
   "first": [
    "See an audiologist or your doctor about what is changing, and ask what tools could help.",
    "Name your hardest settings, like restaurants, meetings, or phone calls, and one change for each.",
    "Turn on captions on your phone, TV, and video calls."
   ],
   "helps": [
    "Telling people plainly what helps you follow, and reminding them kindly.",
    "Rest after long conversations, without guilt.",
    "Accommodations at work, like captions, written follow-ups, or a quieter space.",
    "Connecting with others who have hearing loss, or with the Deaf community, through groups and classes.",
    "Learning some sign language, if that interests you and the people close to you."
   ],
   "tell": [
    "“Asking people to face me is fair, not fussy.”",
    "“My way of communicating is worth making room for.”"
   ],
   "people": "Try: “I have hearing loss. It helps a lot if you face me and speak one at a time. If I miss something, I'll ask.”"
  },
  "helper": {
   "feel": "They may feel tired, left out, or embarrassed to keep asking. Some feel grief; some feel ready for a new way of communicating.",
   "say": [
    "“Want me to say that another way, or write it down?”",
    "“Where would be easiest to talk?”",
    "“Tell me what helps, and I'll remember.”"
   ],
   "avoid": [
    "“Never mind, it's not important.”",
    "Talking louder and faster, or from another room.",
    "Speaking to someone else instead of to them."
   ],
   "help": [
    "Face them, get their attention before you speak, and keep your mouth visible.",
    "Choose quieter places and good light, and turn on captions.",
    "Learn a little sign language, if they use it, and keep inviting them."
   ],
   "you": "Changing how you talk takes practice, and you will forget sometimes. Keep at it kindly, and find support if the strain runs high for you both."
  },
  "faith": "If faith is part of your life, you may find a faith community that offers captions, hearing loops, or worship in sign language, or you may need to ask for them. Many traditions honor the many ways people pray and listen. If faith isn't part of your life, the same truth holds: there are many ways to listen and be heard.",
  "practices": [
   "branches|Say What You Need",
   "bark|Quiet the Senses",
   "bark|Micro-Rest",
   "branches|One Reach-Out a Day",
   "branches|Friends"
  ],
  "reach": [
   "Changes in hearing, ringing in the ears, or sudden hearing loss: see a doctor or audiologist soon. Sudden loss needs quick attention.",
   "Help with services and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "988 in ASL: tap ASL Now on the 988 website to reach a counselor who signs, by videophone, or text 988, any time.",
   "Sadness or loneliness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Hearing Loss Association of America",
    "https://www.hearingloss.org"
   ],
   [
    "NIDCD: hearing loss in adults",
    "https://www.nidcd.nih.gov/health/age-related-hearing-loss"
   ],
   [
    "988 Lifeline (ASL Now)",
    "https://988lifeline.org/"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ],
  "kids": "disability"
 },
 {
  "id": "vision",
  "ring": "life",
  "title": "Vision Loss as an Adult",
  "keys": "vision loss losing my sight low vision blind blindness going blind visually impaired glaucoma macular degeneration diabetic retinopathy eye disease eye injury white cane guide dog screen reader magnifier braille vision rehabilitation orientation and mobility can not drive reading print",
  "parts": [
   "leaves",
   "trunk",
   "branches"
  ],
  "life": [
   "seeing"
  ],
  "quick": [
   "Vision loss in adulthood can change reading, driving, work, and moving around. It also opens the door to tools and skills many people never knew existed.",
   "Vision rehabilitation teaches new ways to do daily things: moving safely, reading, cooking, and using a phone or computer.",
   "Grief for what you used to see is real. So is the confidence that comes with each new skill.",
   "You choose your words. Some say low vision; some say visually impaired; many blind people say blind with pride."
  ],
  "feel": "Scared of losing independence. Frustrated with tasks that used to be easy. Grieving faces, print, color, or the freedom of driving. Embarrassed to ask for help. And, over time, often surprised by how much you can still do in new ways.",
  "self": {
   "first": [
    "Keep regular visits with your eye doctor, and ask about vision rehabilitation services.",
    "Turn on the accessibility settings on your phone and computer: larger text, high contrast, and reading aloud.",
    "Name one daily task that has gotten harder, and ask a rehabilitation specialist or another blind person how they do it."
   ],
   "helps": [
    "Learning skills from people trained in vision rehabilitation, including moving safely with a cane or other tools.",
    "Good lighting, contrast, and keeping things in the same place at home.",
    "Connecting with other blind and low vision people, who know the shortcuts and the feelings.",
    "Accommodations at work, like a screen reader, magnification, or materials in a format you can use.",
    "Letting people help in the ways you choose, and saying no to the rest."
   ],
   "tell": [
    "“I'm learning a new way, and new ways take time.”",
    "“Asking for what I need is part of living well.”"
   ],
   "people": "Try: “I don't see well, especially in dim light. It helps if you tell me who you are when you walk up, and describe where things are.”"
  },
  "helper": {
   "feel": "They may feel scared, frustrated, and protective of their independence. Help that takes over can feel worse than no help at all.",
   "say": [
    "“Hi, it's Sam.” Say your name as you greet them.",
    "“Would you like help with that, or are you all set?”",
    "“The chair is to your left, about two steps.”"
   ],
   "avoid": [
    "Grabbing their arm or moving their things without asking.",
    "Speaking to their companion instead of to them.",
    "“You don't look blind.”"
   ],
   "help": [
    "Offer your arm, and let them take it, rather than steering them.",
    "Describe what matters: who is in the room, where things are, what is on the menu.",
    "Offer rides, and keep inviting them."
   ],
   "you": "Learning to help well takes practice, and you will make mistakes. Ask, listen, and keep showing up."
  },
  "faith": "If faith is part of your life, you may find comfort in practices that don't depend on sight: prayer, song, sacred words read aloud or in braille or audio. Some faith communities offer large print and audio. If faith isn't part of your life, the same truth holds: much of what matters most is not seen with the eyes.",
  "practices": [
   "trunk|Keep Learning",
   "branches|Ask for Help",
   "branches|Support Group",
   "bark|Self-Compassion Break",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "Sudden changes in vision, flashes, a curtain over your sight, or eye pain: get medical help right away.",
   "Help with services and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "Sadness or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "National Eye Institute: low vision",
    "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/low-vision"
   ],
   [
    "National Federation of the Blind",
    "https://nfb.org"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ],
  "kids": "disability"
 },
 {
  "id": "autistic",
  "ring": "life",
  "title": "Autistic, or Diagnosed as an Adult",
  "keys": "autism autistic autistic adult late diagnosis diagnosed as an adult asperger asd spectrum neurodivergent masking burnout sensory overload meltdown shutdown routines special interests social differences evaluation am i autistic",
  "parts": [
   "bark",
   "trunk",
   "branches"
  ],
  "life": [
   "autism",
   "learning"
  ],
  "quick": [
   "Many adults learn they are autistic later in life. A diagnosis can bring relief, grief, or both.",
   "Autism is a different way of sensing, thinking, and connecting, with real strengths and real challenges.",
   "Knowing your sensory needs, your energy, and your ways of communicating helps you build a life that fits.",
   "You choose your words. Many people say autistic; some say person with autism. Both are yours to choose."
  ],
  "feel": "Relief at finally having a name for it. Grief for the years you thought something was wrong with you. Tired from working to fit in. Overwhelmed by noise, light, or crowds. Curious about yourself in a new way. Sometimes proud, sometimes unsure who to tell.",
  "self": {
   "first": [
    "If you are wondering, talk with your doctor about an evaluation from someone experienced with adults.",
    "Notice what drains you and what restores you: sounds, light, people, routines, time alone.",
    "Read or listen to autistic adults describing their own lives, and see what fits."
   ],
   "helps": [
    "Building your days around what works: quiet breaks, predictable plans, comfortable clothes, headphones.",
    "Telling people plainly how you communicate best, like in writing or with a heads up before changes.",
    "Making time for the interests that bring you joy.",
    "Accommodations at work, if you choose to ask: a quieter space, written instructions, clear expectations.",
    "Connecting with other autistic adults, who often understand without explanation."
   ],
   "tell": [
    "“My brain works differently, and that is not a flaw.”",
    "“Rest after a busy day is part of taking care of myself.”"
   ],
   "people": "Try: “I'm autistic. I do best with a heads up before plans change, and I may need a quiet break at gatherings. It's not about you.”"
  },
  "helper": {
   "feel": "They may feel relief, grief, or both, and may be re-reading their whole life story. Busy settings can drain them quickly.",
   "say": [
    "“Thank you for telling me. What helps you?”",
    "“Want a heads up before plans change?”",
    "“Take the quiet break you need. I'll be here.”"
   ],
   "avoid": [
    "“You don't seem autistic.”",
    "“Everyone's a little autistic.”",
    "Treating their needs as rudeness or being difficult."
   ],
   "help": [
    "Say what you mean plainly, and ask what they mean rather than guessing.",
    "Plan gatherings with a quiet space and a clear plan.",
    "Take an interest in what they love."
   ],
   "you": "A late diagnosis can reshape a relationship in good ways. Learn alongside them, and find support for yourself if you need it."
  },
  "faith": "If faith is part of your life, you may find that quiet, routine, and deep focus are already part of how you pray or practice. Some faith communities offer sensory-friendly spaces or services. If faith isn't part of your life, the same truth holds: there are many good ways to be a person in the world.",
  "practices": [
   "bark|Quiet the Senses",
   "bark|Hard-Day Plan",
   "trunk|Write Your Story",
   "branches|Say What You Need",
   "fruit|Joy List"
  ],
  "reach": [
   "Questions about an evaluation, or about anxiety, sleep, or mood that often come with autism: talk with your doctor.",
   "Help with services and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "Sadness or exhaustion that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Autism Society",
    "https://autismsociety.org"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ]
 },
 {
  "id": "serious-mi",
  "ring": "life",
  "title": "Living with a Serious Mental Illness",
  "keys": "serious mental illness smi bipolar schizophrenia schizoaffective psychosis major depression ocd severe anxiety mental health condition long term living well recovery relapse warning signs hospital stay psychiatric medication side effects stigma peer support nami family to family",
  "parts": [
   "bark",
   "fruit",
   "branches"
  ],
  "life": [
   "mind",
   "close"
  ],
  "quick": [
   "Many people live full lives with a serious mental illness. Recovery is a process, built on health, a place to live, purpose, and people.",
   "Treatment works best as a partnership: you, your doctor or prescriber, a therapist, and people you trust.",
   "Knowing your early warning signs, and having a plan for them, can keep a hard stretch shorter.",
   "You are a whole person, not a diagnosis. You choose the words for what you live with."
  ],
  "feel": "Tired of explaining, or of being judged. Hopeful on good stretches, scared of the next hard one. Frustrated with side effects, appointments, and systems. Lonely when people pull away. Proud of how far you have come.",
  "self": {
   "first": [
    "Keep your treatment team close, and tell them honestly what is working and what isn't, including side effects.",
    "Write down your early warning signs, like changes in sleep, energy, or thoughts, and what helps when they show up.",
    "Choose one or two people who know your plan and can check in with you."
   ],
   "helps": [
    "Steady routines for sleep, meals, and movement.",
    "Peer support from people who live with a mental health condition too, like NAMI's Peer-to-Peer classes.",
    "Work, study, volunteering, or creative projects that give your days purpose.",
    "Saying no to what drains you, and yes to what steadies you.",
    "A crisis plan, written while you are well, that names who to call and what helps."
   ],
   "tell": [
    "“I am more than my diagnosis.”",
    "“A hard stretch is not the end of my story.”"
   ],
   "people": "Try: “I live with a mental health condition. Most days I do well. If you notice I'm not sleeping or pulling away, it's okay to ask how I'm doing.”"
  },
  "helper": {
   "feel": "They may feel judged, tired of explaining, or worried about the next hard stretch. They want to be treated as a whole person, not a problem to manage.",
   "say": [
    "“I'm glad you told me. I'm not going anywhere.”",
    "“What helps when things get hard?”",
    "“How are you doing, really?”"
   ],
   "avoid": [
    "“Did you take your meds?” as the first thing you say.",
    "Calling them crazy, or their illness a choice.",
    "Making every conversation about the illness."
   ],
   "help": [
    "Learn about their condition, and ask about their plan for hard stretches.",
    "Notice early signs gently, and ask rather than accuse.",
    "Find support for yourself, like NAMI's Family-to-Family classes."
   ],
   "you": "Loving someone with a serious mental illness can be a long road with good stretches and hard ones. You need your own support, rest, and people too."
  },
  "faith": "If faith is part of your life, it may be a steady source of hope, or a place where you have felt misunderstood. Some faith communities welcome people living with mental illness and their families with open arms. If faith isn't part of your life, hope and belonging can still be found in people, purpose, and community.",
  "practices": [
   "bark|Hard-Day Plan",
   "branches|Support Group",
   "leaves|Sleep",
   "trunk|Get Counseling",
   "fruit|Hope Map"
  ],
  "reach": [
   "Thoughts of suicide, or a mental health crisis: call or text 988, any time. Text MN to 741741. In danger right now, call 911.",
   "Information and peer support, for you or your family: NAMI HelpLine, 1-800-950-6264, or text \"helpline\" to 62640, weekdays 10 a.m. to 10 p.m. Eastern. Not a crisis line.",
   "Warning signs returning, or side effects you can't live with: call your prescriber or treatment team soon. Talk with your doctor before stopping a medicine."
  ],
  "more": [
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ],
   [
    "NAMI programs: Peer-to-Peer and Family-to-Family",
    "https://www.nami.org/programs/"
   ],
   [
    "SAMHSA: what recovery means",
    "https://store.samhsa.gov/sites/default/files/d7/priv/pep12-recdef.pdf"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ],
  "kids": "family-mental-health"
 },
 {
  "id": "brain-injury",
  "ring": "life",
  "title": "After a Brain Injury or Stroke",
  "keys": "brain injury traumatic brain injury tbi concussion stroke aphasia speech memory problems attention thinking changes personality change fatigue rehab rehabilitation physical therapy occupational therapy speech therapy not the same person recovery return to work driving after stroke caregiver of stroke survivor",
  "parts": [
   "leaves",
   "trunk",
   "branches"
  ],
  "life": [
   "memory",
   "moving",
   "health"
  ],
  "quick": [
   "A brain injury or stroke can change movement, speech, memory, attention, energy, and feelings. Many changes are invisible to others.",
   "Recovery often continues for a long time. Rehabilitation, rest, and small steps all matter.",
   "Feeling like a different person is common. Many people slowly write a new chapter, not a copy of the old one.",
   "Families change too. Support for everyone helps. You choose the words for what you live with."
  ],
  "feel": "Frustrated when words, memories, or movements won't come. Exhausted by things that used to be easy. Embarrassed in public. Grieving the person you were, the work you did, or driving. Some days hopeful at a new gain, some days discouraged.",
  "self": {
   "first": [
    "Keep going to rehabilitation, and ask your team what to practice at home.",
    "Use tools outside your head: a notebook, phone reminders, labels, one place for keys.",
    "Plan rest into every day. A tired brain needs real breaks."
   ],
   "helps": [
    "Doing one thing at a time, in a quiet place.",
    "Celebrating small gains, and writing them down so you can see them.",
    "Telling people what helps: speaking slowly, giving time to answer, writing things down.",
    "A brain injury or stroke support group, where people understand without explanation.",
    "Talking with your doctor about mood. Sadness and worry after a brain injury are common and treatable."
   ],
   "tell": [
    "“My brain is healing, and healing takes time.”",
    "“I'm still me, learning new ways.”"
   ],
   "people": "Try: “Since my stroke, I need more time to find words. Please give me a moment, and don't finish my sentences unless I ask.”"
  },
  "helper": {
   "feel": "They may feel frustrated, embarrassed, or not like themselves. Some changes, like fatigue or memory, are hard for others to see.",
   "say": [
    "“Take your time. I'll wait.”",
    "“What would help most today?”",
    "“I can see how hard you're working.”"
   ],
   "avoid": [
    "Finishing their sentences or answering for them.",
    "“You seem fine to me.”",
    "Talking about them as if they aren't in the room."
   ],
   "help": [
    "Speak slowly, one idea at a time, and wait for answers.",
    "Help with rides to therapy, and practice at home if they want.",
    "Notice and name their progress."
   ],
   "you": "Caring for someone after a brain injury or stroke can feel like living with a loss that has no clear name. Find support for yourself, like a caregiver group, and take real breaks."
  },
  "faith": "If faith is part of your life, familiar prayers, songs, or sacred words can stay with a person even when other memories are hard to reach, and being present at worship can comfort without asking for words. If faith isn't part of your life, familiar music, places, and people can offer the same steadiness.",
  "practices": [
   "trunk|Write Your Story",
   "leaves|Pacing Your Day",
   "bark|Micro-Rest",
   "leaves|Appointment Prep",
   "fruit|Tiny Next Step"
  ],
  "reach": [
   "New signs of a stroke, like sudden face drooping, arm weakness, or trouble speaking: call 911 right away.",
   "Help with services, work, and support in Minnesota: Disability Hub MN, 1-866-333-2466, and the Brain Injury Alliance of Minnesota.",
   "Sadness, anger, or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Brain Injury Alliance of Minnesota",
    "https://www.braininjurymn.org"
   ],
   [
    "Brain Injury Association of America",
    "https://www.biausa.org"
   ],
   [
    "American Stroke Association",
    "https://www.stroke.org"
   ],
   [
    "Family Caregiver Alliance",
    "https://www.caregiver.org"
   ]
  ],
  "kids": "family-illness"
 },
 {
  "id": "faith-access",
  "ring": "life",
  "title": "Faith and Disability: When Worship Is Hard to Reach",
  "keys": "faith disability worship church synagogue mosque temple congregation accessible accessibility ramp steps hearing loop captions large print sensory friendly service can not get to church homebound left out of my faith community belonging why me healing prayer for healing punishment spiritual struggle disability ministry inclusion",
  "parts": [
   "roots",
   "branches",
   "trunk"
  ],
  "life": [
   "moving",
   "hearing",
   "seeing",
   "autism",
   "health",
   "pain",
   "serious",
   "close"
  ],
  "quick": [
   "When a disability or illness makes worship hard to reach, the loss can be spiritual as well as practical. Both deserve attention.",
   "Many barriers can change: a ramp, a seat, a sound system, captions, large print, a quieter service, a ride, a visit at home.",
   "Belonging means more than getting in the door: being welcomed, known, needed, and loved.",
   "Your questions, your doubts, and your faith all belong. Faith can steady you, or it can hurt; both are worth talking about."
  ],
  "feel": "Missing the people, the music, the rituals, or the place itself. Hurt by steps, sound, or crowds that keep you out. Weary of being told you'd be healed if you believed enough. Wondering, “Why me?” Or quietly finding faith in new forms at home, and wanting your community to come along.",
  "self": {
   "first": [
    "Name what has made worship hard: the building, the sound, the length, the crowd, the attitudes, or your energy.",
    "Tell one leader or trusted member what would help. Many communities want to know and don't.",
    "Keep one practice that fits your body now, at home or online."
   ],
   "helps": [
    "Asking for specific changes: a ramp or seat, a hearing loop or captions, large print or audio, a quiet space, a shorter service, a ride.",
    "Visits, recordings, or livestreams on the days you can't go.",
    "A faith friend who sits with you, or checks in when you're away.",
    "Offering your gifts: many communities need what you bring, in roles that fit your body.",
    "Talking about hard questions with a chaplain, spiritual director, or faith leader who listens without rushing to answers."
   ],
   "tell": [
    "“My place in my faith community is real, whether or not I can be in the building.”",
    "“My questions are welcome.”"
   ],
   "people": "Try, to a faith leader: “I want to keep coming, and the steps (or the sound, or the length) make it hard. Could we talk about what might help?”"
  },
  "helper": {
   "feel": "They may feel left out of a community they love, hurt by comments, or tired of asking. Some carry hard questions about why this happened.",
   "say": [
    "“We miss you. What would help you come, or help us come to you?”",
    "“What would make worship work for you?”",
    "“Your questions are welcome here.”"
   ],
   "avoid": [
    "“If you had more faith, you'd be healed.”",
    "“God gives the hardest battles to the strongest people.”",
    "Praying over someone without asking first."
   ],
   "help": [
    "Walk your building with fresh eyes: entrances, seating, restrooms, sound, lighting, print.",
    "Offer rides, visits, recordings, and a seat saved.",
    "Invite their gifts: reading, greeting, teaching, praying, welcoming, serving in ways that fit."
   ],
   "you": "Making a community more welcoming takes time and many small changes. Start with one, and keep listening to the people who need it."
  },
  "faith": "Many traditions hold that every person carries sacred worth, and that a community is incomplete without each of its members. Some communities have learned from disabled members to slow down and make room for everyone. If your faith has felt more like a hurt than a help, that is worth saying out loud too, to someone who will listen without rushing to answers.",
  "practices": [
   "roots|Breath Prayer",
   "roots|Lament",
   "roots|Worship",
   "branches|Faith",
   "branches|Say What You Need"
  ],
  "reach": [
   "Help with rides, services, and support in Minnesota: Disability Hub MN, 1-866-333-2466.",
   "Hard questions, spiritual struggle, or feeling abandoned: a chaplain, spiritual director, or faith leader you trust.",
   "Sadness or hopelessness that won't lift: talk with your doctor or a counselor. Thoughts of not wanting to live: call or text 988, any time."
  ],
  "more": [
   [
    "Baylor University: Disability, Faith, and Flourishing",
    "https://bcdd.soe.baylor.edu/projects/disability-faith-flourishing-initiative"
   ],
   [
    "Erik Carter on belonging (Vanderbilt Kennedy Center)",
    "https://notables.vkcsites.org/2019/05/carter-explores-facets-of-true-belonging-inclusion-of-people-with-disabilities-in-our-communities/"
   ],
   [
    "Disability Hub MN",
    "https://disabilityhubmn.org"
   ]
  ]
 }
];
  T.forEach(function (t) { if (!G.topics.some(function (x) { return x.id === t.id; })) G.topics.push(t); }); })();
/* HA2 guides end */
/* Living Sober guides start, GWG BLD 789: the Living Sober guides. Generated from patches/bld789/O in grounded-workshop by gen.py:
   edit the data there and rebuild. Ring 'sober' is the low-key Living Sober ring (shared/gg-life.js GGLife.ring): it shows in the
   ring list only when Living Sober is chosen, and search and Picked for You always find these guides. sober: the stages each guide
   fits most ([] for every stage). story: a short moment from Chris's own path, in his words, shown as From Chris's Story. */
(function () { var G = window.OAK_GUIDES; if (!G || !G.topics) return; var T = [
 {
  "id": "sober-change",
  "ring": "sober",
  "title": "Thinking About a Change",
  "keys": "thinking about quitting drinking too much am i drinking too much cut back cutting back stop drinking quit drinking using drugs pills worried about my drinking sober curious sobriety alcohol beer wine hangover blackout ready to change mixed feelings treatment detox rehab aa na smart recovery samhsa helpline",
  "parts": [
   "trunk",
   "leaves",
   "fruit"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "change"
  ],
  "quick": [
   "Wondering about your drinking or using is a strong, honest place to start. You decide what change looks like for you.",
   "Mixed feelings are normal. Part of you wants change, and part of you wants things to stay. Both deserve to be heard.",
   "If you drink every day, or take pills like Xanax or Valium daily, talk with a doctor before you stop. Stopping suddenly can be dangerous.",
   "Healing is real. Small, honest steps grow a healthier tree."
  ],
  "feel": "Curious, uneasy, or tired of the morning after. Hopeful one day and sure you're fine the next. Worried about what people will think, or who you'd be without it. Many people feel relief just from saying it out loud.",
  "self": {
   "first": [
    "For one week, notice when you drink or use, how much, and how you feel before and after. Write it down, kindly, like a scientist.",
    "Tell one person you trust that you're thinking about a change.",
    "Talk honestly with your doctor. If you drink every day, or take sedatives daily, plan any stop with them."
   ],
   "helps": [
    "Listing what you'd gain: sleep, mornings, money, health, time with the people you love.",
    "One small experiment, like a few sober days, and noticing what you learn.",
    "Filling the hour you usually drink with something that tends your body: a walk, a shower, a real meal, a call.",
    "Learning about every kind of help: your doctor, a therapist, treatment programs, and peer groups like AA, NA, SMART Recovery, or Refuge Recovery.",
    "Calling the SAMHSA National Helpline to hear your options, any hour."
   ],
   "tell": [
    "“Wondering is a beginning.”",
    "“I get to choose what my life grows toward.”",
    "“Small, honest steps still count.”"
   ],
   "people": "Try: “I've been thinking about my drinking, and I want to be honest with someone I trust. Can I talk it through with you?”"
  },
  "helper": {
   "feel": "They may feel ashamed, defensive, or relieved to finally say it. Many people go back and forth for a while. Pressure tends to make a person dig in; steady curiosity helps them think.",
   "say": [
    "“Thank you for telling me. That took courage.”",
    "“What would you like to be different?”",
    "“Whatever you decide, I'm on your side.”"
   ],
   "avoid": [
    "Labels, even as a joke. Let them choose their own words.",
    "Lectures, or a list of every bad night.",
    "Deciding for them what their sobriety has to look like."
   ],
   "help": [
    "Ask open questions, and reflect both sides of what you hear.",
    "Offer sober plans you can share: a walk, a meal, a hike, a trip to the lake.",
    "If they want it, help them book a doctor's visit or call the helpline."
   ],
   "you": "Loving someone who is weighing a change takes patience. Their choice is theirs. Keep your own rest, your own people, and your own support, like Al-Anon or Nar-Anon, if their drinking or using has touched your life."
  },
  "faith": "If faith is part of your life, it may hold words for starting again: grace, a new day, being held while you change. Some find a faith community steadies them; others carry hurt from one. What matters is what gives you strength right now. If faith isn't part of your life, meaning and hope grow from your people, your values, and the life you want to build.",
  "practices": [
   "leaves|Sober Week",
   "trunk|Values Sort",
   "fruit|Best Possible Self",
   "bark|Name It",
   "branches|Ask for Help"
  ],
  "reach": [
   "Stopping alcohol, or sedatives like Xanax or Valium, after daily use: talk with a doctor first. Stopping suddenly can cause seizures. Medical detox is there when it's needed.",
   "Help finding treatment or support: SAMHSA National Helpline, 1-800-662-4357, confidential, any hour, every day of the year.",
   "Thoughts of suicide: call or text 988. Someone won't wake up, or danger right now: call 911. Poison Control: 1-800-222-1222."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "FindTreatment.gov (SAMHSA)",
    "https://findtreatment.gov/"
   ],
   [
    "NIAAA Alcohol Treatment Navigator",
    "https://alcoholtreatment.niaaa.nih.gov/"
   ],
   [
    "SMART Recovery",
    "https://smartrecovery.org/"
   ]
  ],
  "story": {
   "title": "18 Years",
   "text": "On April 1, 2008, I quit drinking. I preferred to drink at home, where I could drink much more without being noticed, and I never missed a day of work. I was thirty-eight, and I knew I only had a few years left before I would drink myself to death. When I stopped, it felt like I had been asleep for a few hundred years and just woke up. Getting sober was just the beginning. My story had many more chapters to be written."
  }
 },
 {
  "id": "sober-first-30",
  "ring": "sober",
  "title": "The First 30 Days, Safely",
  "keys": "first 30 days sober first month quit drinking stopped drinking early sobriety detox withdrawal shakes sweats cant sleep insomnia seizure dts delirium tremens xanax valium benzos sedatives opioids naloxone narcan tolerance overdose day one day count cravings alcohol drugs pills newly sober",
  "parts": [
   "leaves",
   "bark",
   "branches"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "early",
   "change"
  ],
  "quick": [
   "Safety first. If you drank every day, or took sedatives like Xanax or Valium, talk with a doctor as you stop. Stopping suddenly can be dangerous.",
   "The first weeks are often hardest on the body. Water, real food, sleep, and a daily walk help it settle.",
   "Plan for the hour you used to drink or use. An hour is easier to fill before it arrives.",
   "Tell one person, and keep them close. Every sober day counts."
  ],
  "feel": "Shaky, tired, restless, or wide awake at 3 a.m. Proud one hour and raw the next. Feelings you used to numb may arrive all at once. Some people feel a flat, gray stretch; others feel a surprising lift. Both are common in the first weeks.",
  "self": {
   "first": [
    "If you drank daily, or took sedatives daily, call your doctor today, or the SAMHSA National Helpline, so you can stop safely.",
    "Clear the house of what you used, if you can, and stock it with water, tea, sparkling water, and real food.",
    "Name the hour you usually drank or used, and plan something for it: a walk, a shower, a meal, a call, a meeting."
   ],
   "helps": [
    "Water through the day, and three simple meals. Your body is doing hard work.",
    "A walk outside every day, even ten minutes.",
    "A steady bedtime, with screens off early. Sleep often takes a few weeks to settle.",
    "One person you can text any hour, and a group if you want one: AA, NA, SMART Recovery, Refuge Recovery, or another that fits.",
    "Counting days, if that helps you. Every one counts."
   ],
   "tell": [
    "“Today counts.”",
    "“This feeling will rise and fall, like a wave.”",
    "“My body is healing right now.”"
   ],
   "people": "Try: “I've stopped drinking, and the first weeks are hard. Could you check on me most days this month?”"
  },
  "helper": {
   "feel": "They may feel shaky, raw, and proud all at once, and unsure they can keep going. Feelings they used to numb may come up fast. Small, steady kindness means a lot right now.",
   "say": [
    "“I'm proud of you.”",
    "“What would help today?”",
    "“Want to take a walk?”"
   ],
   "avoid": [
    "Offering a drink, or keeping it out where they'll see it.",
    "Asking for a promise about forever.",
    "Treating a hard day as a failure."
   ],
   "help": [
    "Know the signs of dangerous withdrawal: confusion, seeing things, a seizure, a racing heart, a high fever. Call 911.",
    "Bring meals, water, and company. Walk with them.",
    "Plan sober things for the evenings and weekends."
   ],
   "you": "The first month can be intense for the whole family. Rest when you can, and lean on your own support, like Al-Anon or Nar-Anon. Their sobriety is theirs; your steadiness is a gift."
  },
  "faith": "If faith is part of your life, these first days may be a time to lean on it: a short prayer in the morning, a psalm at night, a community that knows your name. If faith isn't part of your life, quiet moments, time outdoors, and people who care can steady you just as well.",
  "practices": [
   "leaves|Sober Week",
   "leaves|Sleep",
   "bark|Slow Exhale",
   "leaves|Two Hours Outdoors",
   "branches|One Reach-Out a Day"
  ],
  "reach": [
   "Signs of dangerous withdrawal, like confusion, seeing or hearing things, a seizure, a racing heart, or a high fever: call 911.",
   "Stopping alcohol or sedatives after daily use: talk with a doctor first. Medical detox is there when it's needed. SAMHSA National Helpline: 1-800-662-4357, any hour.",
   "If you used opioids: after even a short break, an old amount can be deadly. Keep naloxone (Narcan) close; it is sold without a prescription. Someone won't wake up: call 911.",
   "Thoughts of suicide: call or text 988. Poison Control: 1-800-222-1222."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "FindTreatment.gov (SAMHSA)",
    "https://findtreatment.gov/"
   ],
   [
    "NIAAA Alcohol Treatment Navigator",
    "https://alcoholtreatment.niaaa.nih.gov/"
   ],
   [
    "CDC: Lifesaving Naloxone",
    "https://www.cdc.gov/overdose-resources/search/pages/Naloxone-Fact-Sheet.html"
   ]
  ],
  "story": {
   "title": "Living Sober",
   "text": "Living sober means that you have decided to face whatever life throws at you, and that you are not going to mask your emotions with alcohol. This means you have to learn how to process emotions and find new ways to change your state of mind when you are in a place you don't want to be. Every person will have their own favorite go-to's, and it is important to have a wide range of tools if you are going to be happy and live sober. Live sober because you are worth it."
  }
 },
 {
  "id": "sober-first-year",
  "ring": "sober",
  "title": "Your First Year Sober",
  "keys": "first year sober first year of sobriety early recovery months sober sober holidays sober birthday sober anniversary sober celebration firsts bored sober identity who am i now new routine new friends staying sober growing sober recovery milestone chip coin aa na smart recovery",
  "parts": [
   "trunk",
   "branches",
   "fruit"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "early",
   "growing"
  ],
  "quick": [
   "The first year is full of firsts: holidays, birthdays, hard days, and good ones, all sober. Plan for them ahead of time.",
   "Grow the whole tree: roots (what you're anchored in), trunk (meaning), bark (your mind and feelings), branches (people), leaves (your body: sleep, food, movement, breath), and fruit (hope).",
   "Many people find life gets brighter in ways they didn't expect. Hard stretches still come, and they pass.",
   "Research finds sobriety tends to grow steadier with time. Every month you keep is part of that."
  ],
  "feel": "Brighter some days, flat or bored on others. Proud, surprised by how much time you have, and unsure who you are now. Some feelings that were numbed for years arrive in this first year. Old friends may drift, and new ones may take a while.",
  "self": {
   "first": [
    "Look at the calendar for the next three months. Circle the firsts: a holiday, a birthday, a wedding, a trip, a hard anniversary. Plan each one ahead.",
    "Build a daily rhythm that tends your leaves, your body: the same wake time, real meals, water, a walk outside.",
    "Keep one person or group close all year, not only in the first weeks."
   ],
   "helps": [
    "A plan for each first: who you'll be with, what you'll drink instead, and how you'll leave if you need to.",
    "Something new to learn or do with your hands, now that evenings are yours again.",
    "Serving someone else: volunteering, mentoring, helping a neighbor.",
    "Marking your milestones the sober way: a favorite meal, sparkling water or tea, a walk, a blessing, people who are proud of you.",
    "Noticing the good on purpose, and saying it out loud."
   ],
   "tell": [
    "“I'm growing, one season at a time.”",
    "“A hard day is one day.”",
    "“Every first I meet sober makes the next one easier.”"
   ],
   "people": "Try: “The holidays are my first ones sober. Could we plan something together that day?”"
  },
  "helper": {
   "feel": "They may swing between bright days and flat ones, and feel unsure who they are without the old habit. Some feelings that were numbed for years may surface now. Your steady, ordinary company helps more than big speeches.",
   "say": [
    "“I love seeing you like this.”",
    "“What would make this holiday easier for you?”",
    "“Want to celebrate your six months? Your choice how.”"
   ],
   "avoid": [
    "Treating them as fragile, or watching every move.",
    "Pressuring them to come to the same old gatherings the same old way.",
    "Bringing up old mistakes when things get tense."
   ],
   "help": [
    "Plan sober holidays and celebrations with them: good food, sparkling drinks, music, a walk, games, time outdoors.",
    "Invite them into new routines: a weekly hike, a class, a shared meal.",
    "Notice their growth out loud."
   ],
   "you": "Living beside someone in their first sober year can stir hope and old worries at once. Keep your own support, like Al-Anon or Nar-Anon, and let yourself enjoy the good days too."
  },
  "faith": "If faith is part of your life, this year may bring it new color: gratitude that feels real, a community that celebrates your milestones, a sense of grace for a fresh start. If faith isn't part of your life, wonder, gratitude, and service can give this year the same deep roots.",
  "practices": [
   "fruit|Three Good Things",
   "fruit|Volunteer",
   "leaves|Morning Daylight",
   "trunk|Keep Learning",
   "branches|Shared Meal"
  ],
  "reach": [
   "Cravings or thoughts of using that keep growing, or a slip: reach out the same day, to your person, your group, your doctor, or the SAMHSA National Helpline, 1-800-662-4357.",
   "Low mood, worry, or old memories that won't settle: a therapist can help with what sits underneath.",
   "Thoughts of suicide: call or text 988. Danger right now, or someone who won't wake up: call 911."
  ],
  "more": [
   [
    "SAMHSA: What Recovery Means",
    "https://store.samhsa.gov/sites/default/files/d7/priv/pep12-recdef.pdf"
   ],
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "SMART Recovery",
    "https://smartrecovery.org/"
   ],
   [
    "Refuge Recovery",
    "https://refugerecovery.org/"
   ]
  ],
  "story": {
   "title": "18 Years",
   "text": "After I got sober, I started to experience life for the first time. I felt like I was asleep for a few hundred years and just woke up. It was things like going to the park and spreading a blanket under the sun. Or that first Fourth of July sober, which I will never forget. I was always blacked out long before the fireworks, so I had not seen the light show since I was a little kid."
  }
 },
 {
  "id": "sober-cravings",
  "ring": "sober",
  "title": "Cravings and Triggers",
  "keys": "cravings craving urge urges triggers triggered want to drink want to use tempted temptation pull urge surfing halt hungry angry lonely tired stress payday friday night bar party pain pills dentist prescription opioids alcohol drinking using staying sober sobriety relapse prevention slip",
  "parts": [
   "bark",
   "leaves",
   "branches"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "early",
   "growing"
  ],
  "quick": [
   "A craving rises, peaks, and passes, like a wave. You can ride it without acting on it.",
   "Know your triggers: people, places, times, feelings, and your body's needs. Check in: hungry, angry, lonely, tired?",
   "Have a plan ready: wait, breathe, drink water, move, call someone, leave.",
   "Every wave you ride makes the next one smaller."
  ],
  "feel": "A sudden pull, out of nowhere or right on schedule. A voice that says just one, or you deserve it. Restless hands, a dry mouth, a memory that feels warm. Sometimes fear: if I want it this much, am I failing? Cravings are common, and they are a signal, never a verdict.",
  "self": {
   "first": [
    "When a craving comes, set a timer for twenty minutes and ride it: breathe, notice it in your body, and let it rise and fall.",
    "Check your basics: are you hungry, angry, lonely, or tired? Tend that need first.",
    "Write down your top three triggers, and one thing you'll do for each."
   ],
   "helps": [
    "Moving your body: a brisk walk, stairs, push-ups, a run at an easy pace.",
    "Cold water on your face, a cold drink, or a shower.",
    "Texting or calling your person, before the wave peaks.",
    "Leaving: the party, the store aisle, the room. You can always leave.",
    "Planning for pain and medical visits: tell your doctor and dentist you're sober, and ask about pain plans that fit."
   ],
   "tell": [
    "“This is a wave. It will pass.”",
    "“A craving is a signal, not a command.”",
    "“I have ridden waves before.”"
   ],
   "people": "Try: “I'm having a strong craving right now. Can you stay on the phone with me for ten minutes?”"
  },
  "helper": {
   "feel": "They may feel embarrassed to admit a craving. Telling you is a strong, honest act. Calm company helps the wave pass.",
   "say": [
    "“Thank you for telling me. Let's ride it out together.”",
    "“Want to take a walk right now?”",
    "“What do you need in the next twenty minutes?”"
   ],
   "avoid": [
    "Panicking, or treating a craving as a slip.",
    "Leaving drinks or pills where they'll see them.",
    "Testing them: “Just see if you can handle being around it.”"
   ],
   "help": [
    "Stay with them, on the phone or in person, for twenty minutes.",
    "Offer something to do: a walk, a meal, a drive somewhere new.",
    "Help them plan ahead for known triggers, like holidays or medical visits."
   ],
   "you": "Hearing about cravings can scare you. Remember that telling you is a good sign. Keep your own support, like Al-Anon or Nar-Anon, so you can stay calm for them."
  },
  "faith": "If faith is part of your life, a breath prayer, a short verse, or a moment of surrender can steady you while a wave passes. If faith isn't part of your life, a word you repeat, a picture of the people you love, or a few steps outside can do the same.",
  "practices": [
   "bark|Slow Exhale",
   "bark|Name It",
   "leaves|Walk or Jog",
   "bark|Hard-Day Plan",
   "branches|One Reach-Out a Day"
  ],
  "reach": [
   "Cravings that feel unmanageable, or keep growing: reach out today, to your doctor, your group, or the SAMHSA National Helpline, 1-800-662-4357. Medication for addiction treatment can ease cravings for some people; ask your doctor.",
   "If you used opioids and are thinking of using again: your tolerance is lower now, and an old amount can be deadly. Keep naloxone (Narcan) close, and reach out first.",
   "Thoughts of suicide: call or text 988. Danger right now, or someone who won't wake up: call 911."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "SMART Recovery",
    "https://smartrecovery.org/"
   ],
   [
    "AA: Find a Meeting",
    "https://www.aa.org/"
   ],
   [
    "NA: Find a Meeting",
    "https://na.org/"
   ]
  ],
  "story": {
   "title": "Norco",
   "text": "\"Have you ever heard of Norco?\" my dentist asked. At that moment, I felt like the world stood still. Hydrocodone was my first real experience with drugs. I almost felt the drug hitting my bloodstream. Then I snapped out of it, came to my senses, and thought of my family who counted on me. I looked him right in the eyes and said, \"No thanks, I'm good.\" And the crazy thing is, I was ready for it. I knew I was going to need a root canal, and I had a plan for the pain before I ever walked in."
  }
 },
 {
  "id": "sober-slip",
  "ring": "sober",
  "title": "After a Slip",
  "keys": "slip slipped relapse relapsed drank again used again started drinking again return to use lost my sobriety lost my days start over reset day count ashamed blew it failed sobriety again alcohol pills opioids overdose risk tolerance naloxone narcan aa na smart recovery",
  "parts": [
   "bark",
   "branches",
   "leaves"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "early",
   "growing",
   "long"
  ],
  "quick": [
   "A slip is a moment, never a verdict. Sobriety is rarely a straight line, and every return to the path counts.",
   "Reach out the same day. Hiding is what turns a slip into a long stretch.",
   "Safety first: after a break from opioids, an old amount can be deadly. After days of heavy drinking, stopping again may need a doctor.",
   "Learn from it kindly: what was happening, what you needed, and what you'll do next time."
  ],
  "feel": "Ashamed, scared, angry at yourself, or numb. A voice that says, I've blown it, so why stop now. Grief for the days you counted. Fear of telling the people who believed in you. Many people feel some relief, too, at being honest again.",
  "self": {
   "first": [
    "Stop where you are, if you can safely, and tell one person today.",
    "If you used opioids, keep naloxone close and stay with someone. If you drank heavily for several days, call your doctor before stopping again.",
    "Tend your body tonight: water, a real meal, a shower, sleep."
   ],
   "helps": [
    "Speaking to yourself the way you'd speak to a friend who slipped.",
    "Looking at the day it happened, like a detective: sleep, food, feelings, people, place.",
    "One change to your plan, based on what you learned.",
    "Your group, your sponsor or peer, your doctor, or your therapist, the same week.",
    "Remembering that your sober days, and what you learned in them, are still yours."
   ],
   "tell": [
    "“A slip is a moment, never a verdict.”",
    "“Everything I learned is still mine.”",
    "“I can begin again today.”"
   ],
   "people": "Try: “I drank last night. I'm telling you because I want to get right back on track. Can we talk today?”"
  },
  "helper": {
   "feel": "They may feel deep shame, and expect your anger or disappointment. Some will hide it to protect you. How you respond in the first few minutes can help them return quickly.",
   "say": [
    "“Thank you for telling me. I'm glad you're here.”",
    "“What do you need today?”",
    "“Your sober days still count.”"
   ],
   "avoid": [
    "“I knew this would happen.”",
    "Counting how many times, or bringing up every past slip.",
    "Punishing with silence."
   ],
   "help": [
    "Check safety first: opioids mean naloxone close by; heavy drinking for days means a doctor.",
    "Help them reach their person, group, or doctor today.",
    "Keep your own boundaries steady and kind."
   ],
   "you": "A slip can bring up your own fear, anger, and grief. Those feelings make sense. Talk them through with your own support, like Al-Anon or Nar-Anon, so you can meet them with steadiness."
  },
  "faith": "If faith is part of your life, a slip may bring fear of having let God down. Many traditions hold that grace meets people right where they fall, and that starting again is holy work. If faith isn't part of your life, the same truth stands: one hard day doesn't erase the person you are becoming.",
  "practices": [
   "bark|Self-Compassion Break",
   "bark|Hard-Day Plan",
   "trunk|Expressive Writing",
   "branches|Ask for Help",
   "leaves|Sleep"
  ],
  "reach": [
   "If opioids were involved: tolerance drops after a break, so an old amount can stop breathing. Keep naloxone (Narcan) close; it is sold without a prescription. Someone won't wake up: call 911.",
   "After several days of heavy drinking, or daily sedatives: talk with a doctor before stopping again. Stopping suddenly can cause seizures.",
   "Help today: SAMHSA National Helpline, 1-800-662-4357, any hour. Thoughts of suicide: call or text 988. Poison Control: 1-800-222-1222."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "FindTreatment.gov (SAMHSA)",
    "https://findtreatment.gov/"
   ],
   [
    "CDC: Lifesaving Naloxone",
    "https://www.cdc.gov/overdose-resources/search/pages/Naloxone-Fact-Sheet.html"
   ],
   [
    "SMART Recovery",
    "https://smartrecovery.org/"
   ]
  ],
  "story": {
   "title": "18 Years",
   "text": "At least for me, sobriety has not been a straight line. I have had a lot of ups and downs. I have been able to completely avoid alcohol for these eighteen years, but I have had a few hard battles with pills. When I broke my hip in a cycling accident, I was lost in an oxy blackout for a few weeks. But I did not give up."
  }
 },
 {
  "id": "sober-healing",
  "ring": "sober",
  "title": "Healing What You Drank Over",
  "keys": "healing why i drank why i used numbing pain painful emotions old hurts trauma childhood aces grief shame anger dis-ease underlying causes root causes dry drunk sober but unhappy still hurting emotional sobriety therapy emdr trauma therapy mind body spirit write it out meditation running healing from drinking",
  "parts": [
   "bark",
   "leaves",
   "trunk"
  ],
  "life": [
   "sober",
   "mind"
  ],
  "sober": [
   "growing",
   "long"
  ],
  "quick": [
   "Drinking and using are often how people numbed painful emotions and old hurts. Stopping is a beginning; healing what's underneath is the path.",
   "You can heal a little at a time. Small parts, honestly faced, add up.",
   "Tend the whole person: mind (breath and attention), body (movement and rest), and spirit (feelings named and felt).",
   "Healing is real. You are growing, never broken for good."
  ],
  "feel": "Sober, and still hurting. Old memories that surface now that nothing numbs them. Anger, grief, or shame that feels bigger than today. Some people feel restless, irritable, or empty, and wonder why sobriety alone hasn't made them happy.",
  "self": {
   "first": [
    "Ask yourself, gently: what was I numbing? Write down whatever comes, without judging it.",
    "Pick one small part to tend this month, not everything at once.",
    "Find a therapist who works with trauma or grief, if old hurts keep surfacing."
   ],
   "helps": [
    "Mind: a few minutes of breath meditation each day, and giving full attention to whatever you're doing.",
    "Body: a daily walk, a longer run or hike each week, sleep, and real food. Stress lives in the body too.",
    "Spirit: writing it out. Putting words to feelings helps you know what you truly feel.",
    "Telling your story to someone safe, a little at a time.",
    "A wide toolbox: music, art, time outdoors, prayer or meditation, people."
   ],
   "tell": [
    "“I can heal one small part at a time.”",
    "“What I feel can move through me.”",
    "“I am growing, and healing is real.”"
   ],
   "people": "Try: “I'm sober, and I'm finding there's old pain underneath. I'm working on it. It would help if you just listened sometimes.”"
  },
  "helper": {
   "feel": "They may be sober and still struggling, and feel confused or ashamed that stopping didn't fix everything. Old hurts may surface now. Patience and listening help more than answers.",
   "say": [
    "“It makes sense that old pain would show up now.”",
    "“I'm here to listen, whenever you want to talk.”",
    "“What helps you most on the heavy days?”"
   ],
   "avoid": [
    "“You're sober now, so you should be happy.”",
    "Digging into their past before they're ready.",
    "Rushing them toward forgiveness or closure."
   ],
   "help": [
    "Join them in the body-level tools: a walk, a hike, a shared meal.",
    "Encourage a therapist, and help with the practical parts if they ask.",
    "Celebrate small signs of healing out loud."
   ],
   "you": "Watching someone heal old hurts can stir your own. Notice what comes up for you, and keep your own support close."
  },
  "faith": "If faith is part of your life, healing may include lament, confession, prayer, or a sense of being loved in your hurt. Some old wounds came from faith communities; those deserve gentle care too. If faith isn't part of your life, the spirit work is still yours: naming feelings, finding meaning, and being kind to the person you were.",
  "practices": [
   "trunk|Expressive Writing",
   "bark|Meditation",
   "bark|Body Scan",
   "leaves|Walk or Jog",
   "trunk|Write Your Story"
  ],
  "reach": [
   "Old trauma, grief, or memories that keep surfacing: a therapist who works with trauma can help. Ask your doctor, or the SAMHSA National Helpline, 1-800-662-4357, for names near you.",
   "Low mood that lasts two weeks or more, or panic that won't settle: talk with your doctor.",
   "Thoughts of suicide: call or text 988. Danger right now: call 911."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "National Child Traumatic Stress Network",
    "https://www.nctsn.org"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ]
  ],
  "story": {
   "title": "Living Sober Is Hard",
   "text": "From my experience, I have come to believe we go through a variety of storms in life, great and small, and we gather hurts that cause us emotional discomfort and eventually suffering. If we do not have healthy ways to process and heal from them, we turn to whatever works best. The only disease we have is the dis-ease of painful emotions. Once you understand this, you can begin to find healthy ways to process the harder emotions. You do not have to heal from all of it at once. I work on small parts of my pain at a time, and as long as I'm moving in the right direction, I am making progress."
  }
 },
 {
  "id": "sober-repair",
  "ring": "sober",
  "title": "Repairing Relationships",
  "keys": "repair relationships amends making amends apologize apology rebuild trust broken trust hurt my family hurt my kids partner spouse marriage parents friends forgive me forgiveness they dont trust me sober now family healing reconcile reconnect estranged living amends",
  "parts": [
   "branches",
   "trunk",
   "bark"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "growing",
   "long"
  ],
  "quick": [
   "Trust grows back the way it left: one action at a time. Steady, sober days speak louder than promises.",
   "A good apology names what you did, how it affected them, and what you'll do now, without excuses.",
   "Let each person heal at their own pace. Their timeline is theirs.",
   "Repair with yourself counts too. Guilt can guide you toward making things right; shame only hides."
  ],
  "feel": "Hopeful, nervous, and heavy with regret. Eager to fix things fast. Hurt when someone keeps their distance, or when old arguments come back. Grief for time lost. Many people feel a quiet joy, too, when a relationship begins to mend.",
  "self": {
   "first": [
    "Start with steadiness. Before big talks, let a few months of sober days speak for you.",
    "Write down the people you'd like to make things right with, and one thing you regret with each.",
    "Choose one relationship to begin with, and one small, reliable action you can keep."
   ],
   "helps": [
    "Apologies that name what you did and how it hurt, and say what you're doing differently now.",
    "Living amends: showing up on time, keeping your word, paying back what you owe, being present.",
    "Asking, then listening: “How did my drinking affect you?”",
    "Patience when someone needs time or distance. Respect their pace.",
    "Support for the hard talks: your group, a therapist, or family therapy."
   ],
   "tell": [
    "“Trust grows back one action at a time.”",
    "“I can own my past without living in it.”",
    "“Their healing has its own pace.”"
   ],
   "people": "Try: “I want to make things right with you. I know I hurt you when I was drinking. I'm not asking you to trust me yet. I'd like to show you, over time.”"
  },
  "helper": {
   "feel": "They may be eager to fix everything quickly, and hurt when trust comes slowly. They may also feel deep regret. You may still carry anger or fear from the past, and both of you can be right at once.",
   "say": [
    "“I see the changes you're making.”",
    "“I need more time, and I'm open to this.”",
    "“Here's one thing that would help me trust again.”"
   ],
   "avoid": [
    "Pretending you're fine to keep the peace.",
    "Using the past as a weapon in every disagreement.",
    "Testing them in secret to see if they'll fail."
   ],
   "help": [
    "Tell them what helps you rebuild trust: specific, doable actions.",
    "Notice and name the steady changes you see.",
    "Consider family therapy, or your own support, like Al-Anon or Nar-Anon."
   ],
   "you": "You're allowed your own pace, your own feelings, and your own boundaries. Healing the relationship includes healing you. Keep your own support close."
  },
  "faith": "If faith is part of your life, repair may include confession, forgiveness, and reconciliation as your tradition teaches them. Many traditions hold that forgiveness is a gift, never a demand, and that it can take time. If faith isn't part of your life, honesty, steady action, and respect for each person's pace carry the same healing.",
  "practices": [
   "branches|Repair a Rupture",
   "branches|Forgiveness Reflection",
   "trunk|Moral Repair Letter",
   "branches|Active Listening",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Hard conversations that keep going badly, or a family stuck in old patterns: a family therapist can help everyone be heard.",
   "Any danger at home, from anyone: National Domestic Violence Hotline, 1-800-799-7233. Danger right now: call 911.",
   "Cravings that grow during hard talks: reach out to your person, your group, or the SAMHSA National Helpline, 1-800-662-4357. Thoughts of suicide: call or text 988."
  ],
  "more": [
   [
    "Al-Anon Family Groups",
    "https://al-anon.org/"
   ],
   [
    "Nar-Anon Family Groups",
    "https://www.nar-anon.org/"
   ],
   [
    "SMART Recovery Family and Friends",
    "https://smartrecovery.org/family/"
   ],
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ]
  ]
 },
 {
  "id": "sober-work-friends",
  "ring": "sober",
  "title": "Sober at Work and with Friends",
  "keys": "sober at work happy hour office party work event conference client dinner coworkers boss tell my boss hr employee assistance program eap friends drink friends stopped calling lonely sober no friends sober friends saying no how to say no i dont drink what to say peer pressure party bar wedding sober social life dating sober drinking culture",
  "parts": [
   "branches",
   "trunk",
   "fruit"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "early",
   "growing"
  ],
  "quick": [
   "You decide what to share, and with whom. A short, friendly “No thanks, I'm good” is a full answer.",
   "Plan events ahead: your own drink in hand, your own ride, a friend who knows, and a time to leave.",
   "Some friendships may drift. New ones grow around what you love: a trail, a class, a team, a group.",
   "Research finds even one new person who supports your sobriety helps you keep it."
  ],
  "feel": "Out of place at a party. Tired of explaining. Hurt when the phone stops ringing or the invitations slow down. Annoyed by little comments. Proud, too, and surprised by how many people quietly respect your choice.",
  "self": {
   "first": [
    "Choose your line ahead of time: “No thanks, I'm good,” “I'm driving,” or “I don't drink.” Say it once, kindly, and change the subject.",
    "Before the next work event, plan your drink, your ride, and your leaving time.",
    "Invite one person to something sober this week: a walk, breakfast, a hike, a game."
   ],
   "helps": [
    "A favorite sober drink in your hand early, so fewer people offer.",
    "Arriving early and leaving early. The best part of most events is the first hour.",
    "One person at the event who knows your plan.",
    "New circles built around what you enjoy: running, climbing, art, music, faith, volunteering, a peer group.",
    "Knowing your workplace's employee assistance program, if you'd like confidential support."
   ],
   "tell": [
    "“My reasons are mine, and they're good ones.”",
    "“No thanks, I'm good.”",
    "“The right people will stay, and new ones will come.”"
   ],
   "people": "Try, with a friend: “I've stopped drinking, and I miss you. Want to get breakfast or take a hike this weekend?”"
  },
  "helper": {
   "feel": "They may feel out of place, lonely, or worn out from explaining. Little comments can sting. Being included, without fuss about the drink, means a lot.",
   "say": [
    "“Want to grab breakfast instead?”",
    "“What would you like to drink? We have plenty.”",
    "“I'm glad you came.”"
   ],
   "avoid": [
    "“Just one won't hurt.”",
    "Asking why, or making their choice the topic.",
    "Leaving them off the invite list because you assume they won't come."
   ],
   "help": [
    "Plan gatherings where good food, music, games, or the outdoors are the center.",
    "Stock sparkling water, juice, and tea, and offer them first.",
    "Back them up if someone pushes: “They said no thanks.”"
   ],
   "you": "If you're a friend or coworker, your ordinary welcome is one of the most powerful things you can offer. Keep inviting."
  },
  "faith": "If faith is part of your life, a faith community can become a place of sober friendship: meals, service, small groups, people who celebrate with you. If faith isn't part of your life, clubs, teams, classes, and volunteering offer the same kind of belonging.",
  "practices": [
   "branches|Say What You Need",
   "branches|Clubs",
   "branches|Shared Meal",
   "leaves|Unplugged Evening",
   "fruit|Volunteer"
  ],
  "reach": [
   "Cravings that spike around work or social events: talk with your person, your group, or the SAMHSA National Helpline, 1-800-662-4357.",
   "Confidential support at work: your employer's employee assistance program, if you have one.",
   "Loneliness that keeps deepening, or thoughts of suicide: call or text 988."
  ],
  "more": [
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "SMART Recovery",
    "https://smartrecovery.org/"
   ],
   [
    "AA: Find a Meeting",
    "https://www.aa.org/"
   ],
   [
    "Refuge Recovery",
    "https://refugerecovery.org/"
   ]
  ],
  "story": {
   "title": "Living Sober Is Hard",
   "text": "If you choose a sober path, you will often feel completely out of place, seeing the world from a different reality. It can feel isolating when the phone stops ringing and the invites stop coming. But nobody knows the real reasons why you chose to live sober except you. No one will ever understand how important your sobriety is except you. The first thing I had to understand to begin my sober life was that sobriety was something I was doing for myself. Live sober because you are worth it."
  }
 },
 {
  "id": "sober-swap",
  "ring": "sober",
  "title": "When Another Habit Takes Its Place",
  "keys": "swapped addiction cross addiction substitute addiction new addiction transfer addiction overeating sugar food weight gain shopping spending debt credit cards gambling screens scrolling phone gaming porn work workaholic busy religion church pride perfectionism sober but still numbing healthy coping change how i feel",
  "parts": [
   "bark",
   "leaves",
   "trunk"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "growing",
   "long"
  ],
  "quick": [
   "Anything that changes how you feel can become a new way to numb: food, spending, screens, work, even religion.",
   "Noticing a swap is a sign of growth. It points back to a feeling that still needs tending.",
   "Build a wide toolbox of healthy ways to change how you feel: movement, breath, time outdoors, writing, music, people.",
   "Healing what's underneath, a little at a time, loosens the pull of every habit."
  ],
  "feel": "Relief that the drinking stopped, and unease that something else is growing in its place. Embarrassed by the weight, the debt, the hours on the phone, or the need to look perfect. Tired of trading one thing for another. Hopeful, too, because you've seen yourself change before.",
  "self": {
   "first": [
    "Make a list of everything you do to change how you feel. Circle the ones that leave you feeling worse later.",
    "Pick one swap to tend first, and name the feeling it covers: boredom, loneliness, stress, shame.",
    "Choose one healthy tool to reach for instead, and keep it close."
   ],
   "helps": [
    "Moving your body: a daily walk, a run at an easy, conversational pace, a bike ride.",
    "A short meditation in the morning. Even five minutes can change a day.",
    "Warmth and rest: a hot bath or sauna, a nap, an early night.",
    "Writing it out, making music or art, time among trees.",
    "Telling someone the truth about the new habit, and getting help where it's needed: a doctor, a dietitian, a financial counselor, a therapist."
   ],
   "tell": [
    "“What am I really reaching for?”",
    "“I have healthy ways to feel better.”",
    "“Noticing is growing.”"
   ],
   "people": "Try: “I've noticed I'm doing with food (or spending, or my phone) what I used to do with drinking. I want to work on it. Can you help me notice?”"
  },
  "helper": {
   "feel": "They may feel embarrassed that a new habit has grown, and worried it means they've failed. Noticing it is a sign of growth. Kindness, without a lecture, helps them look at what's underneath.",
   "say": [
    "“You've changed a lot already. You can change this too.”",
    "“What do you think it's helping you with?”",
    "“Want to take a walk instead?”"
   ],
   "avoid": [
    "“At least it's not drinking.”",
    "Shaming them about weight, money, or screens.",
    "Taking over: hiding cards, counting bites, policing the phone."
   ],
   "help": [
    "Offer healthy swaps you can share: walks, hikes, cooking real food together, unplugged evenings.",
    "Notice and name what's going well.",
    "If money is part of it, help them find a reputable financial counselor."
   ],
   "you": "Watching a new habit grow can bring back old fears. Take them seriously, and keep your own support close. Your calm, kind noticing helps more than worry does."
  },
  "faith": "If faith is part of your life, it can be a deep resource for healing, and, as Chris found, it can also become a place to hide, when it turns into performance or pride. Grace, honesty, and humility keep it life-giving. If faith isn't part of your life, any community or cause can become a stage for image; the same honesty keeps it real.",
  "practices": [
   "leaves|Walk or Jog",
   "bark|Meditation",
   "leaves|Unplugged Evening",
   "trunk|Expressive Writing",
   "trunk|Worth Beyond Doing"
  ],
  "reach": [
   "Eating that feels out of control, or weight changes that worry you: talk with your doctor. Eating disorders are treatable, and help is there.",
   "Spending, debt, or gambling that keeps growing: a reputable nonprofit financial counselor, or the Minnesota problem gambling helpline, 1-800-333-4673.",
   "Feeling pulled back toward drinking or using: your person, your group, or the SAMHSA National Helpline, 1-800-662-4357. Thoughts of suicide: call or text 988."
  ],
  "more": [
   [
    "National Foundation for Credit Counseling",
    "https://www.nfcc.org"
   ],
   [
    "SAMHSA National Helpline",
    "https://www.samhsa.gov/find-help/national-helpline"
   ],
   [
    "NAMI (National Alliance on Mental Illness)",
    "https://www.nami.org"
   ]
  ],
  "story": {
   "title": "Living Sober",
   "text": "In the early years of my sobriety, I turned to three behaviors I had to learn the hard way were causing me damage. Overeating: I went from 140 to over 200 pounds after I quit drinking, as I turned to food to cope with depression and social isolation. Excessive shopping: I built up almost six figures of credit debt, mainly trying to satisfy boredom with new hobbies. And becoming hyper-religious: I rose quickly in my local church, my ego became drunk in the place of leadership, and I lost sight of grace. Just think of everything you do to change how you feel, and know that any of these can become a way to avoid your problems. There are also a lot of healthy ways to feel better."
  }
 },
 {
  "id": "sober-partner",
  "ring": "sober",
  "title": "When Your Partner Drinks or Uses",
  "keys": "partner drinks husband drinks too much wife drinks too much spouse drinking boyfriend girlfriend using drugs pills loved one wont get help how to get them into treatment craft community reinforcement and family training enabling boundaries al-anon nar-anon worried about my partner drunk every night hiding bottles overdose naloxone",
  "parts": [
   "branches",
   "bark",
   "leaves"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "love"
  ],
  "quick": [
   "You can't control their drinking or using, and you have more influence than you think. Calm, warm, steady actions help.",
   "Make sober time rewarding, let natural consequences land, and speak in short, kind, specific sentences.",
   "Watch for windows: moments when they're open to help. Have treatment options ready.",
   "Your own safety and wellbeing come first. You matter here too."
  ],
  "feel": "Worried, angry, lonely, embarrassed, and tired of hoping. Afraid of the next phone call, or of what tonight will bring. Torn between love and protecting yourself. Many partners blame themselves, or feel they should be able to fix it. The truth is kinder: you didn't cause it, and your own care matters.",
  "self": {
   "first": [
    "Check safety: if you ever feel afraid of your partner, call the National Domestic Violence Hotline, 1-800-799-7233, and make a safety plan.",
    "Notice the pattern for a week: when they drink or use, what comes before, and what comes after.",
    "Find your own support this week: Al-Anon, Nar-Anon, SMART Recovery Family and Friends, or a therapist."
   ],
   "helps": [
    "Spending warm, enjoyable time with them when they're sober, and stepping away when they're not.",
    "Short, kind, specific words: “I love you. When you drink, I feel lonely. I'd love to take a walk with you tonight.”",
    "Letting natural consequences land, instead of covering, cleaning up, or making excuses.",
    "Having treatment information ready, and asking at a calm, sober moment: “Would you talk to a doctor with me?”",
    "Tending your own tree: your sleep, your friends, your joys."
   ],
   "tell": [
    "“I didn't cause this, and I can't cure it. I can care for myself.”",
    "“Calm and kind still counts.”",
    "“My life matters too.”"
   ],
   "people": "Try, with a friend you trust: “My partner's drinking has been hard on me. I don't need advice. I just need someone to know.”"
  },
  "helper": {
   "feel": "If you're helping a friend whose partner drinks or uses, they may feel ashamed, protective of their partner, and exhausted. They may defend their partner one minute and break down the next. Steady support, with no judgment, helps.",
   "say": [
    "“That sounds so hard. I'm glad you told me.”",
    "“Are you safe at home?”",
    "“What would help you this week?”"
   ],
   "avoid": [
    "“Just leave.” It's their decision, and leaving can be the most dangerous time.",
    "Criticizing their partner harshly.",
    "Telling them it's their fault, or theirs to fix."
   ],
   "help": [
    "Ask about safety, and know the hotline number.",
    "Help them find their own support group or therapist.",
    "Offer ordinary breaks: a walk, a meal, a night away from the worry."
   ],
   "you": "Supporting a friend through this can take time. Keep your own boundaries, and remember that your steady presence is a gift."
  },
  "faith": "If faith is part of your life, it can steady you: prayer, a community that knows, the hope of healing. Some partners hear pressure to endure anything, or to keep it secret; your safety and wellbeing matter to God and to the people who love you. If faith isn't part of your life, your own people and your own values can hold you just as well.",
  "practices": [
   "branches|Support Group",
   "branches|Say What You Need",
   "branches|A Break for the Helper",
   "bark|Slow Exhale",
   "leaves|Sleep"
  ],
  "reach": [
   "Feeling afraid of your partner, or any violence: National Domestic Violence Hotline, 1-800-799-7233. Danger right now: call 911.",
   "If your partner uses opioids: keep naloxone (Narcan) at home; it is sold without a prescription. Someone won't wake up or is breathing very slowly: call 911 and give naloxone.",
   "Treatment options for your partner, and support for you: SAMHSA National Helpline, 1-800-662-4357, any hour. Thoughts of suicide, theirs or yours: call or text 988."
  ],
  "more": [
   [
    "Al-Anon Family Groups",
    "https://al-anon.org/"
   ],
   [
    "Nar-Anon Family Groups",
    "https://www.nar-anon.org/"
   ],
   [
    "SMART Recovery Family and Friends",
    "https://smartrecovery.org/family/"
   ],
   [
    "National Domestic Violence Hotline",
    "https://www.thehotline.org"
   ]
  ],
  "kids": "sober-grown-up-drinks"
 },
 {
  "id": "sober-overdose-grief",
  "ring": "sober",
  "title": "Grieving an Overdose",
  "keys": "overdose death died of an overdose od fentanyl pills heroin opioids alcohol poisoning lost my son lost my daughter lost my brother lost my sister lost my friend lost my partner drug death grief stigma guilt anger shame could i have saved them grasp grief recovery after a substance passing compassionate friends",
  "parts": [
   "bark",
   "branches",
   "fruit"
  ],
  "life": [
   "sober"
  ],
  "sober": [
   "love"
  ],
  "quick": [
   "Grief after an overdose is real grief, and it deserves the same care as any other loss.",
   "Guilt, anger, relief, and love can all be true at once. None of them makes your grief less.",
   "You choose how to speak about the cause. Honest words can open the door for others; private is okay too.",
   "Find people who understand, like GRASP or The Compassionate Friends. You don't have to carry this alone."
  ],
  "feel": "Shock, numbness, deep sorrow, and questions that circle at night. Guilt over what you said or didn't say. Anger at them, at the drug, at a system. Sometimes relief that the fear has ended, followed by guilt about the relief. Hurt when others go quiet, or judge. Love that has nowhere to go.",
  "self": {
   "first": [
    "Let someone stay close for the first days, and let them help with meals, calls, and rest.",
    "Decide how much you want to share about the cause, and with whom. You can change your mind later.",
    "Find one place to grieve with people who understand: a GRASP group, a grief group, or a therapist."
   ],
   "helps": [
    "Naming them, and telling stories about their whole life, not only the end.",
    "Writing a letter to them: what you miss, what you wish, what you want them to know.",
    "Steady care for your body: water, simple meals, a walk outside, sleep when you can.",
    "Rituals that fit you: lighting a candle, a memory table, a walk on their birthday.",
    "Keeping naloxone at home if others in your circle use opioids. Their life matters too."
   ],
   "tell": [
    "“My grief is real, and so was their life.”",
    "“I did what I knew how to do with what I knew then.”",
    "“Love keeps going.”"
   ],
   "people": "Try: “My brother died of an overdose. I want to talk about him. Will you say his name with me?”"
  },
  "helper": {
   "feel": "They may feel judged, isolated, or ashamed, and wonder if others think the death was deserved. Guilt and what-ifs may be constant. Simple, steady presence, and saying their person's name, helps most.",
   "say": [
    "“I'm so sorry. Tell me about them.”",
    "“Their life mattered. So does your grief.”",
    "“I'll bring dinner Thursday. Is that okay?”"
   ],
   "avoid": [
    "“They made their choices.”",
    "Asking for details about how it happened.",
    "Disappearing because you don't know what to say."
   ],
   "help": [
    "Say their person's name, and share a memory.",
    "Offer practical help: meals, errands, rides, childcare.",
    "Remember the hard dates: birthdays, holidays, the anniversary."
   ],
   "you": "Walking with someone through this grief may stir your own losses or fears. Take care of your own heart, and keep showing up over the long months."
  },
  "faith": "If faith is part of your life, it may hold you with lament, prayer, ritual, and a community that grieves with you. Some feel judged by their community, or wrestle with hard questions about where their loved one is now; a gentle faith leader can help. If faith isn't part of your life, love, memory, and people who understand can carry you.",
  "practices": [
   "roots|Lament",
   "trunk|Legacy Letter",
   "branches|Support Group",
   "leaves|Walk or Jog",
   "bark|Self-Compassion Break"
  ],
  "reach": [
   "Grief that feels unbearable, or thoughts of not wanting to live: call or text 988, any time. Danger right now: call 911.",
   "If you or others in your circle use: keep naloxone (Narcan) at home. Someone won't wake up: call 911 and give naloxone. SAMHSA National Helpline: 1-800-662-4357.",
   "Grief that stays heavy for months, or keeps you from daily life: a grief therapist can help."
  ],
  "more": [
   [
    "GRASP: Grief Recovery After a Substance Passing",
    "https://grasphelp.org"
   ],
   [
    "The Compassionate Friends",
    "https://www.compassionatefriends.org"
   ],
   [
    "The Dougy Center (for grieving children and families)",
    "https://www.dougy.org"
   ],
   [
    "988 Suicide and Crisis Lifeline",
    "https://988lifeline.org"
   ]
  ],
  "kids": "sober-loved-one-dies",
  "story": {
   "title": "Norco",
   "text": "I lost a close friend that I used to take pills with. He is gone now, because of an accidental overdose. I hope my honesty will maybe prevent the next person from an overdose. We need to create a culture where we can be honest about addiction."
  }
 }
];
  T.forEach(function (t) { if (!G.topics.some(function (x) { return x.id === t.id; })) G.topics.push(t); }); })();
/* Living Sober guides end, GWG BLD 789 */
