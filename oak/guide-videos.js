/* =====================================================================
   OAK . When Life Changes videos (GWG BLD 719, October 2026)
   Two narrated videos for each Oak guide: For You (the person facing it) and For the Helper
   (the person walking beside them). Played by shared/gg-learn.js, which loads this file the
   first time Oak's Learn opens. So far: Inside Me and Loss and Grief (BLD 719), Health and the End of Life (BLD 720), Relationships and Family and Safety (BLD 721), Work and Money, Faith and Meaning, and Community, Country, and World (BLD 722): 67 guides, 134 videos, every ring.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld722/source (bld719, bld720, and bld721 source for the earlier rings) in grounded-workshop:
   edit the data there and rebuild. Proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.oak = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, if this is what you are facing. For the Helper, if you are walking beside someone who is. Nothing to finish, and a quiet check marks the ones you have watched.",
"rings": [
[
"inside",
"Inside Me"
],
[
"loss",
"Loss and Grief"
],
[
"health",
"Health and the End of Life"
],
[
"family",
"Relationships and Family"
],
[
"work",
"Work and Money"
],
[
"faith",
"Faith and Meaning"
],
[
"world",
"Community, Country, and World"
],
[
"safety",
"Safety"
]
],
"guides": [
{
"id": "anxiety",
"ring": "inside",
"title": "Anxiety That Won't Settle",
"you": {
"id": "ok-g-anxiety-you",
"guide": "anxiety",
"side": "you",
"title": "Anxiety That Won't Settle",
"sideName": "For You",
"mins": 4,
"sources": [
"lieberman",
"borkovec"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Anxiety That Won't Settle",
"sub": "For You",
"say": "If your mind won't stop racing, or dread keeps showing up even when nothing is wrong, this is for you. You are not overreacting, and you are not alone."
},
{
"k": "big",
"h": "Your alarm is working too hard.",
"sub": "Not a flaw in you.",
"say": "Anxiety is your body's alarm system working too hard. It was built to keep you safe, and sometimes it rings when there is no fire. That is not a flaw in you. It is a system that needs some help settling."
},
{
"k": "points",
"h": "How it can show up",
"items": [
[
"A tight chest",
"Or a mind that keeps racing"
],
[
"Waking at 3am",
"With a list of dreads"
],
[
"Stomach trouble",
"Or snapping at people you love"
],
[
"A sense of something coming",
"Even when nothing is wrong"
]
],
"say": "It shows up in different ways. A tight chest, or a mind that keeps racing. Waking at three in the morning with a list of dreads. Stomach trouble, or snapping at the people you love. Or a sense that something bad is coming, even when nothing is wrong."
},
{
"k": "breathe",
"h": "Calm the body first",
"sub": "In for four. Out for six.",
"hold": 18,
"say": "Start with the body. The mind follows the body more than the other way around. Breathe in for four. And out for six. Let the out-breath be the longer one."
},
{
"k": "card",
"title": "Name it. Then ask what is true right now.",
"body": "Not next week. Right now, in this room.",
"say": "Next, name the worry, in plain words. Putting a feeling into words can turn down the alarm. Then ask a second question. What is true right now, in this room? Not next week. Right now. Most of the time, the room is safer than the worry."
},
{
"k": "words",
"h": "A line to keep",
"items": [
"This is a feeling, not a forecast."
],
"sub": "Say it out loud, slowly.",
"say": "Here is a line to keep. This is a feeling, not a forecast. Say it out loud now, slowly, and let it land.",
"beats": [
"Here is a line to keep.",
"This is a feeling, not a forecast.",
{
"t": "Say it out loud now, slowly, and let it land.",
"w": 10
}
]
},
{
"k": "flow",
"h": "A worry window",
"steps": [
[
"Pick fifteen minutes",
"The same time each day"
],
[
"Write the worries down",
"So they stop circling"
],
[
"Then set them down",
"Until tomorrow’s window"
]
],
"say": "Some people find a worry window helps. Pick fifteen minutes, at the same time each day. Write the worries down, so they stop circling. Think them through. Then set them down until tomorrow's window. When a worry shows up at another hour, tell it, not now, I have a time for you."
},
{
"k": "big",
"h": "Small steps toward it shrink it.",
"sub": "Avoiding it feeds it.",
"say": "Here is the hard part, said gently. Avoiding what you fear tends to feed it. Small, steady steps toward it shrink it. One phone call. One short drive. One honest sentence to someone you trust: I've been really anxious lately. I don't need you to fix it. It just helps to say it."
},
{
"k": "card",
"title": "Weeks of it? Reach out.",
"body": "A doctor or counselor can help. Thoughts of harming yourself: call or text 988.",
"say": "If panic attacks come, or anxiety keeps you from work, sleep, or the people you love for more than a few weeks, talk with your doctor or a counselor. Anxiety is very treatable. And if you have any thoughts of harming yourself, call or text nine eight eight."
},
{
"k": "big",
"h": "A feeling, not a forecast.",
"sub": "You only have to do the next small thing.",
"say": "You have handled hard things before. You only have to do the next small thing. This is a feeling, not a forecast."
}
]
},
"helper": {
"id": "ok-g-anxiety-helper",
"guide": "anxiety",
"side": "helper",
"title": "Anxiety That Won't Settle",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Anxiety That Won't Settle",
"sub": "For the Helper",
"say": "This is for the friend or family member walking beside someone whose anxiety won't settle. You don't need the perfect words. Your steadiness says a lot."
},
{
"k": "big",
"h": "They may be afraid you think they are overreacting.",
"sub": "Embarrassed, exhausted, and still trying.",
"say": "Start with what they may be feeling. Embarrassed. Exhausted. Afraid you'll think they are overreacting. Many anxious people already know the fear is bigger than the facts. Knowing it doesn't make it stop."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That sounds really hard to carry. I’m glad you told me.",
"What helps when it gets like this?",
"Want to take a walk with me?"
],
"say": "Here are words that help. That sounds really hard to carry. I'm glad you told me. What helps when it gets like this? And, want to take a walk with me?"
},
{
"k": "points",
"h": "Trade these",
"items": [
[
"Instead of just relax",
"Breathe slowly with them"
],
[
"Instead of arguing each fear",
"Ask what helps"
],
[
"Instead of doing it all for them",
"Walk beside them toward it"
]
],
"say": "A few trades make a big difference. Instead of just relax, or stop worrying, breathe slowly with them. Instead of arguing with every fear point by point, ask what helps. The fear usually finds a new door anyway. And instead of taking over everything so they never face the hard thing, walk beside them toward it, one small step at a time."
},
{
"k": "big",
"h": "Breathe so they can follow you.",
"sub": "In for four. Out for six.",
"say": "Let's practice. Picture the person you are walking with, on a hard day. Picture sitting beside them. Now breathe in for four, and out for six, slowly enough that they could follow you.",
"beats": [
"Let's practice.",
"Picture the person you are walking with, on a hard day.",
"Picture sitting beside them.",
{
"t": "Now breathe in for four, and out for six, slowly enough that they could follow you.",
"w": 12
}
]
},
{
"k": "points",
"h": "A steady routine",
"items": [
[
"A walk",
"Same day, same time"
],
[
"A meal",
"Shared, without a big agenda"
],
[
"A check-in call",
"Short and predictable"
]
],
"say": "Anxiety settles best around things it can count on. Offer a steady routine. A walk, the same day each week. A shared meal, without a big agenda. A short check-in call they can expect. Predictable kindness is calming."
},
{
"k": "card",
"title": "When it lasts for weeks",
"body": "Encourage a doctor or counselor. Thoughts of self-harm: call or text 988. Danger right now: 911.",
"say": "If it has lasted for weeks, or panic is getting in the way of work, sleep, or relationships, encourage them to see a doctor or a counselor, and offer to help make the call. If they ever talk about harming themselves, call or text nine eight eight together. If there is danger right now, call nine one one."
},
{
"k": "big",
"h": "A companion, not a cure.",
"sub": "Keep your own practices.",
"say": "Their anxiety can stir your own. That's normal. Keep your own practices, your own sleep, your own people. You are a companion, not a cure."
},
{
"k": "big",
"h": "Steady, kind, and close by.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to make the fear go away. Be steady, be kind, and stay close by. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sadness",
"ring": "inside",
"title": "Sadness That Lingers",
"you": {
"id": "ok-g-sadness-you",
"guide": "sadness",
"side": "you",
"title": "Sadness That Lingers",
"sideName": "For You",
"mins": 4,
"sources": [
"noetel"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Sadness That Lingers",
"sub": "For You",
"say": "If sadness has settled in and won't lift, or the things you used to love feel flat, this is for you. You don't have to feel better to watch it."
},
{
"k": "big",
"h": "Common. Treatable. Not a flaw.",
"sub": "Not laziness, and not weakness.",
"say": "Sadness that lingers is common, and it is treatable. It is not a character flaw. It is not laziness, and it is not weakness. It is something happening to you, and it can ease."
},
{
"k": "points",
"h": "How it can feel",
"items": [
[
"Heavy, flat, or numb",
"Even on good days"
],
[
"Old joys feel pointless",
"Things you used to love"
],
[
"Sleep and appetite change",
"Energy too"
],
[
"Irritable",
"More than sad, for some"
]
],
"say": "It can feel heavy, flat, or numb. Things you used to enjoy can feel pointless. Sleep, appetite, and energy change. And for some people, it shows up as irritable more than sad."
},
{
"k": "big",
"h": "Lower the bar.",
"sub": "On heavy days, small care counts.",
"say": "So lower the bar. On heavy days, small care counts as much as big plans. A shower counts. Eating something real counts. Stepping outside for five minutes counts."
},
{
"k": "words",
"h": "One small thing for today",
"items": [
"A shower",
"Something real to eat",
"A few minutes outside",
"A text to one person"
],
"sub": "Pick the one that feels most possible.",
"say": "Look at this short list. Pick the one that feels most possible today. Say it out loud, or picture yourself doing it.",
"beats": [
"Look at this short list.",
"Pick the one that feels most possible today.",
{
"t": "Say it out loud, or picture yourself doing it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Light and gentle movement",
"body": "Morning light. A short walk. A simple daily rhythm.",
"say": "Two things help more than people expect. Morning light, and gentle movement. Research finds that movement, even walking, can ease low mood. Keep a simple daily rhythm too: up at the same time, one meal at the same time, one walk."
},
{
"k": "big",
"h": "Isolation deepens it. Connection helps.",
"sub": "Even brief. Even quiet.",
"say": "Sadness tells you to pull away. Pulling away tends to deepen it. Being around people helps, even without talking much. And telling one person the truth helps most. Try this: I've been struggling more than I've let on. Could you check in on me this week?"
},
{
"k": "words",
"h": "Things to tell yourself",
"items": [
"This is an illness talking, not the truth about me.",
"Small steps still count.",
"I don't have to feel better to take the next step."
],
"say": "Here are some things to tell yourself. This is an illness talking, not the truth about me. Small steps still count. I don't have to feel better to take the next step."
},
{
"k": "card",
"title": "Two weeks or more? Tell someone.",
"body": "Book a visit with your doctor or a counselor. If hope feels gone: call or text 988 today.",
"say": "If the sadness has lasted more than two weeks, or it is getting in the way of daily life, book a visit with your doctor or a counselor. That is a strong thing to do. If hope feels gone, or you have thoughts of death or suicide, call or text nine eight eight today. If you are in danger right now, call nine one one."
},
{
"k": "big",
"h": "Small steps still count.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to fix all of it today. One small caring thing is enough for now. Small steps still count."
}
]
},
"helper": {
"id": "ok-g-sadness-helper",
"guide": "sadness",
"side": "helper",
"title": "Sadness That Lingers",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Sadness That Lingers",
"sub": "For the Helper",
"say": "This is for the friend or family member walking beside someone whose sadness lingers. You don't need to fix it. Your steady presence matters more than you think."
},
{
"k": "big",
"h": "They may feel like a burden.",
"sub": "So you may need to be the one who reaches.",
"say": "People who are depressed often feel like a burden. So they pull away from the very people who could help. That means you may need to be the one who reaches, again and again."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I’ve noticed you seem down, and I care about you.",
"You don’t have to explain it. I’m here."
],
"say": "Here are words that help. I've noticed you seem down, and I care about you. And, you don't have to explain it. I'm here."
},
{
"k": "card",
"title": "Asking directly is safe and caring.",
"body": "\"Are you having any thoughts of ending your life?\"",
"say": "If you are worried, ask directly. Are you having any thoughts of ending your life? Asking directly is safe and caring. If the answer is yes, stay with them, and call or text nine eight eight together. If there is danger right now, call nine one one."
},
{
"k": "words",
"h": "Practice the question",
"items": [
"Are you having any thoughts of ending your life?"
],
"sub": "Out loud, in your own calm voice.",
"say": "The question is easier to ask the second time. Here it is. Are you having any thoughts of ending your life? Now say it out loud yourself, in your own calm voice.",
"beats": [
"The question is easier to ask the second time.",
"Here it is.",
"Are you having any thoughts of ending your life?",
{
"t": "Now say it out loud yourself, in your own calm voice.",
"w": 10
}
]
},
{
"k": "points",
"h": "Trade these",
"items": [
[
"Instead of the bright side",
"Sit with them in it"
],
[
"Instead of others have it worse",
"Let their pain count"
],
[
"Instead of disappearing",
"Show up, even quietly"
]
],
"say": "A few trades help. Instead of look on the bright side, sit with them in it. Instead of others have it worse, let their pain count. And instead of disappearing because you don't know what to say, show up anyway, even quietly."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Small invitations",
"Low pressure, easy to say yes to"
],
[
"A practical task",
"A meal, a ride, a call"
],
[
"Finding help",
"A doctor or counselor, then follow up"
]
],
"say": "Here is what helps. Small, low-pressure invitations, like a short walk or sitting together. A practical task: a meal, a ride, a phone call they've been putting off. And help finding a doctor or counselor. Then follow up, because the first step is often the hardest one to take alone."
},
{
"k": "big",
"h": "Share the load.",
"sub": "Keep your own supports.",
"say": "Supporting someone who is depressed is tiring. That's normal. Keep your own supports, and share the load with others, so no one carries it alone, including you."
},
{
"k": "big",
"h": "Keep showing up.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to say the perfect thing. Keep reaching, keep asking, and keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "loneliness",
"ring": "inside",
"title": "Loneliness",
"you": {
"id": "ok-g-loneliness-you",
"guide": "loneliness",
"side": "you",
"title": "Loneliness",
"sideName": "For You",
"mins": 4,
"sources": [
"holt"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Loneliness",
"sub": "For You",
"say": "If you feel alone, even in a crowded room, or the weekends feel long, this is for you. Needing people is human."
},
{
"k": "big",
"h": "Loneliness is a signal, like hunger.",
"sub": "It tells you that you need connection.",
"say": "Loneliness isn't a verdict on you. It is a signal, like hunger, telling you that you need connection. Research links strong social connection with better health and a longer life. So this signal is worth listening to."
},
{
"k": "points",
"h": "How it can feel",
"items": [
[
"An ache",
"Even in a crowded room"
],
[
"Long weekends",
"And quiet evenings"
],
[
"Feeling invisible",
"Like no one would notice"
],
[
"A story in your head",
"Nobody would want to hear from me"
]
],
"say": "It can feel like an ache, even in a crowded room. Weekends and evenings feel long. You may feel invisible. And you may tell yourself a story: nobody would want to hear from me. That story is the loneliness talking."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"Walter spent thirty five years as a probation officer. He never married. Never had kids.",
"The more I learned to stand alone, he told me, the more I found out I was never truly alone.",
"The best preparation for the end of life is learning how to be alone without being lonely."
],
"lesson": "Alone and lonely are different.",
"note": "Names and details changed",
"hold": 2,
"say": "I once sat with a man named Walter, in a room with no photographs on the walls. He had spent thirty five years as a probation officer. He never married, and never had kids. Being alone, he said, taught him something he didn't expect. The more I learned to stand alone, he told me, the more I found out I was never truly alone. Then he looked straight at me. Turns out the best preparation for the end of life is learning how to be alone without being lonely."
},
{
"k": "big",
"h": "Alone and lonely are different.",
"sub": "Both are okay to name.",
"say": "Being alone and being lonely are different. You can be alone and at peace. You can be surrounded and lonely. Both are okay to name. Naming which one you're feeling is a good first step."
},
{
"k": "big",
"h": "Think of one person.",
"sub": "Just to say you thought of them.",
"say": "Let's try something now. Think of one person you haven't talked to in a while. Picture their face. Now say out loud the text you could send them today, just to say you thought of them.",
"beats": [
"Let's try something now.",
"Think of one person you haven't talked to in a while.",
"Picture their face.",
{
"t": "Now say out loud the text you could send them today, just to say you thought of them.",
"w": 12
}
]
},
{
"k": "points",
"h": "Start small, and repeat",
"items": [
[
"The same coffee shop",
"At the same time"
],
[
"The same class or group",
"Week after week"
],
[
"The same walk",
"Past the same neighbors"
]
],
"say": "Then start small, and repeat. The same coffee shop, at the same time. The same class, group, or volunteer shift, week after week. The same walk, past the same neighbors. Faces become familiar, and familiar faces become friends."
},
{
"k": "card",
"title": "Reach out first.",
"body": "Most people are waiting for someone else to.",
"say": "Reach out first. Most people are waiting for someone else to. Try: I've been feeling pretty isolated. Want to get coffee next week? Serving others helps too. It connects you without pressure."
},
{
"k": "card",
"title": "When it turns heavy",
"body": "Talk with your doctor or a counselor. Thoughts of suicide: call or text 988.",
"say": "If loneliness has turned into lasting sadness or hopelessness, talk with your doctor or a counselor. And if you have any thoughts of suicide, call or text nine eight eight. Someone is there, day and night."
},
{
"k": "big",
"h": "Needing people is human, not needy.",
"sub": "One real connection is a good start.",
"say": "Needing people is human, not needy. One real connection is a good start. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-loneliness-helper",
"guide": "loneliness",
"side": "helper",
"title": "Loneliness",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Loneliness",
"sub": "For the Helper",
"say": "This is for anyone who has noticed someone pulling into themselves, or who knows someone living alone in a long, quiet stretch. You can be a thread back to people."
},
{
"k": "big",
"h": "They may not reach out, even when they want to.",
"sub": "Many feel ashamed to admit it.",
"say": "People who are lonely often feel ashamed to admit it. So they may not reach out, even when they want to. That's why your invitation matters so much. It does the hard part for them."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I’d love to see you. Are you free Thursday?",
"I’ve missed you."
],
"say": "Here are words that help. I'd love to see you. Are you free Thursday? And, simply, I've missed you."
},
{
"k": "points",
"h": "Trade these",
"items": [
[
"Instead of get out more",
"Offer a specific plan"
],
[
"Instead of one visit, then silence",
"Make it regular"
]
],
"say": "Two trades help. Instead of you should get out more, offer a specific plan, with a day and a time in it. And instead of one visit, then silence, make it regular. The second invitation tells them the first one was real."
},
{
"k": "points",
"h": "Who to notice",
"items": [
[
"Recently widowed",
"Or lost a partner"
],
[
"Recently moved",
"New town, no one yet"
],
[
"Recently retired",
"The daily faces are gone"
]
],
"say": "Notice the people whose world just got smaller. Someone who recently lost a spouse or partner. Someone who recently moved, and doesn't know anyone yet. Someone who recently retired, and lost the faces they saw every day."
},
{
"k": "big",
"h": "Say the invitation out loud.",
"sub": "With a day and a time in it.",
"say": "Let's practice. Think of someone who may be lonely right now. Pick a day and a time. Now say the invitation out loud, the way you would say it to them.",
"beats": [
"Let's practice.",
"Think of someone who may be lonely right now.",
"Pick a day and a time.",
{
"t": "Now say the invitation out loud, the way you would say it to them.",
"w": 12
}
]
},
{
"k": "points",
"h": "Make it regular",
"items": [
[
"A weekly walk or call",
"Same day, same time"
],
[
"Invite them in",
"To your circles and groups"
],
[
"Help build more threads",
"Not only you"
]
],
"say": "Make it regular. A weekly walk or a call, on the same day. Invite them into your circles, your table, your groups. And help them build more than one thread, so their world grows wider than one person."
},
{
"k": "card",
"title": "When it turns heavy",
"body": "Encourage a doctor or counselor. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "If loneliness has turned into lasting sadness or hopelessness, encourage them to see a doctor or a counselor. If they talk about not wanting to be alive, call or text nine eight eight together. If there is danger right now, call nine one one."
},
{
"k": "big",
"h": "You can't be anyone's only connection.",
"sub": "Help them build more than one.",
"say": "You can't be someone's only connection, and you don't have to be. Keep your own people and your own rest. Sharing them is part of what helps."
},
{
"k": "big",
"h": "Show up again.",
"sub": "The full guide has more, whenever you want it.",
"say": "One visit is kind. Showing up again is what heals. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "burnout",
"ring": "inside",
"title": "Burnout",
"you": {
"id": "ok-g-burnout-you",
"guide": "burnout",
"side": "you",
"title": "Burnout",
"sideName": "For You",
"mins": 4,
"sources": [
"maslach"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Burnout",
"sub": "For You",
"say": "If you are running on empty, from work, from caregiving, or from raising a family, this is for you. You can watch it in a few quiet minutes."
},
{
"k": "big",
"h": "Tired in a way sleep doesn't fix.",
"sub": "That has a name.",
"say": "Burnout can feel like being tired in a way sleep doesn't fix. You might be short with people you love. The things that used to matter feel like chores. If that sounds familiar, it has a name, and it makes sense."
},
{
"k": "points",
"h": "Three signs that travel together",
"items": [
[
"Exhaustion",
"Empty, even after rest"
],
[
"Distance",
"Numb, cynical, or short with people"
],
[
"Doubt",
"Wondering if any of it matters"
]
],
"say": "Burnout tends to show up in three ways. Exhaustion: empty, even after rest. Distance: numb, cynical, or short with people. And doubt: wondering whether anything you do makes a difference. You might feel one of these, or all three."
},
{
"k": "big",
"h": "You gave more than you refilled, for too long.",
"sub": "Often a sign of how much you care.",
"say": "Burnout is what happens when you give more than you refill, for too long. It isn't weakness. Often it means you have cared a great deal, for a long time, with too little coming back in."
},
{
"k": "big",
"h": "What drains you? What refills you?",
"sub": "Name one of each.",
"say": "Let's take stock. Think of one thing that drains you most right now. Then one thing that refills you, even a little. Name them both, out loud or on paper.",
"beats": [
"Let's take stock.",
"Think of one thing that drains you most right now.",
"Then one thing that refills you, even a little.",
{
"t": "Name them both, out loud or on paper.",
"w": 12
}
]
},
{
"k": "points",
"h": "Small refills count",
"items": [
[
"Sleep",
"Protect one full night"
],
[
"A stopping point",
"A clear end to your day"
],
[
"Time outside",
"Away from screens"
],
[
"People who get it",
"Peers who know your load"
]
],
"say": "Small refills count. Protect one full night of sleep. Give your day a clear stopping point. Spend some time outside, away from screens. And talk with people who understand what you carry, at work or at home."
},
{
"k": "words",
"h": "Things you can tell yourself",
"items": [
"I am allowed to rest before everything is done.",
"Saying no to this is saying yes to something that matters more."
],
"say": "Here are two things you can tell yourself. I am allowed to rest before everything is done. And, saying no to this is saying yes to something that matters more."
},
{
"k": "flow",
"h": "This week, three steps",
"steps": [
[
"Cancel or hand off one thing",
"Make a little room"
],
[
"Protect one refill a day",
"Put it on the calendar"
],
[
"Ask for help",
"\"I'm running on empty.\""
]
],
"say": "This week, try three steps. Cancel or hand off one thing, to make a little room. Protect one refill every day, and put it on the calendar. And ask for help. You could say, I'm running on empty. I need help with a few things for a while."
},
{
"k": "card",
"title": "If it's more than tired",
"body": "Exhaustion that rest doesn't touch, or signs of depression: talk with your doctor or a counselor. Thoughts of escaping your life or not being here: call or text 988. Danger right now: 911.",
"say": "If the exhaustion doesn't improve with rest, or you notice signs of depression, talk with your doctor or a counselor. If you have thoughts of escaping your life or not being here, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Rest is part of the work.",
"sub": "The full guide has more, whenever you want it.",
"say": "Rest isn't a reward for finishing. It is part of the work. You are more than what you produce. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-burnout-helper",
"guide": "burnout",
"side": "helper",
"title": "Burnout",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Burnout",
"sub": "For the Helper",
"say": "If someone you love is worn down, by a job, by caregiving, or by raising a family, this is for you. You can help lighten the load."
},
{
"k": "big",
"h": "They may feel guilty for being tired.",
"sub": "So they may not ask.",
"say": "People who burn out are often the ones who carry the most. They may feel guilty for being tired, and afraid of letting people down. So they may not ask for help. Your offer may need to come first."
},
{
"k": "words",
"h": "Words that lighten the load",
"items": [
"You've been carrying a lot.",
"What could I take off your plate?",
"You deserve rest too."
],
"say": "Here are words that lighten the load. You've been carrying a lot. What could I take off your plate? And, you deserve rest too."
},
{
"k": "points",
"h": "Words that add weight",
"items": [
[
"\"Just take a vacation.\"",
"It hands them one more task"
],
[
"New requests",
"Even small ones add up"
],
[
"A vague offer",
"It leaves the asking to them"
]
],
"say": "Some words add weight, even when they're kind. Just take a vacation hands them one more thing to plan. New requests, even small ones, add up. And a vague offer leaves all the asking to them."
},
{
"k": "flow",
"h": "Help that lands",
"steps": [
[
"Take a specific task",
"A meal, an errand, the laundry"
],
[
"Cover a shift or a pickup",
"Give real hours back"
],
[
"Encourage real time off",
"And help make it possible"
]
],
"say": "Here is help that lands. Take a specific task, like a meal, an errand, or the laundry. Cover a shift, or a school pickup, so they get real hours back. And encourage real time off, then help make it possible."
},
{
"k": "big",
"h": "What is one thing you could take?",
"sub": "Something specific, this week.",
"say": "Think of the person you're worried about. Picture one ordinary day in their life. Name one specific thing you could take off their plate this week.",
"beats": [
"Think of the person you're worried about.",
"Picture one ordinary day in their life.",
{
"t": "Name one specific thing you could take off their plate this week.",
"w": 12
}
]
},
{
"k": "card",
"title": "Stay steady, and watch",
"body": "Exhaustion that doesn't lift with rest, or signs of depression: encourage a doctor or counselor. Talk of escaping their life or not being here: call or text 988 together.",
"say": "You don't have to fix their job or their whole life. Stay steady, and check in more than once. If the exhaustion doesn't lift with rest, or you see signs of depression, encourage them to talk with a doctor or a counselor. If they talk about escaping their life or not being here, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Check your own tank.",
"sub": "Your rest matters too.",
"say": "And check your own tank. If you work in a caring field, or you're helping while you're tired yourself, burnout may be showing up in you too. Your rest matters as much as theirs."
},
{
"k": "big",
"h": "You deserve rest too.",
"sub": "The full guide has more, whenever you want it.",
"say": "You deserve rest too. Say it to them, and say it to yourself. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "anger",
"ring": "inside",
"title": "Anger That Runs Hot",
"you": {
"id": "ok-g-anger-you",
"guide": "anger",
"side": "you",
"title": "Anger That Runs Hot",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Anger That Runs Hot",
"sub": "For You",
"say": "If your anger has been running hot, with a quick fuse, a clenched jaw, or words you wish you could take back, this is for you."
},
{
"k": "points",
"h": "How it can show up",
"items": [
[
"A quick fuse",
"Small things set it off"
],
[
"A clenched jaw",
"The body braced for a fight"
],
[
"Replaying arguments",
"Over and over"
],
[
"The wrong target",
"Kids, a partner, coworkers"
]
],
"say": "Anger that runs hot can look like a quick fuse, where small things set it off. A clenched jaw. Replaying arguments over and over. And sometimes it comes out at the wrong people, like kids or coworkers, who weren't the reason at all."
},
{
"k": "big",
"h": "Anger often guards something softer.",
"sub": "Hurt, fear, grief, or feeling unheard.",
"say": "Anger often stands guard over something softer. Hurt. Fear. Grief. Feeling unheard. And sometimes anger points to something that truly needs to change. Either way, it is worth listening to."
},
{
"k": "story",
"title": "Grounded in Coffee",
"lines": [
"A reckless driver cut me off. My coffee went flying, and at the red light he yelled at me.",
"My whole body was shaking. I pulled over by a corn field and named what I could see, feel, hear, smell, and taste.",
"Most of it was coffee. But I was no longer shaking."
],
"lesson": "Cool the body before you use your words.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/grounded-in-coffee",
"label": "Read the Full Story: Grounded in Coffee"
},
"hold": 2,
"say": "One morning a reckless driver raced in front of me, and I had to slam on my brakes. My coffee went flying. At the red light I gave him my best stink eye, and he rolled down his window and started yelling at me. I kept my window up. But my whole body was shaking. So I pulled over by a corn field, took a deep breath, and named what I could see, feel, hear, smell, and taste. Most of it was coffee. But I was no longer shaking."
},
{
"k": "breathe",
"h": "Cool the body first",
"sub": "A long breath out, slower than the breath in.",
"hold": 16,
"say": "Let's cool the body first. Breathe in through your nose. And let a long breath out, slower than the breath in. Again, at your own pace."
},
{
"k": "flow",
"h": "When it rises",
"steps": [
[
"Step away",
"Twenty minutes before you respond"
],
[
"Move your body",
"Walk fast, lift, stretch"
],
[
"Ask what is under it",
"Hurt, fear, grief, or unheard?"
]
],
"say": "When anger rises, try three steps. Step away for twenty minutes before you respond. Move your body. Walk fast, lift something, stretch. Then ask, what is under this anger?"
},
{
"k": "words",
"h": "What is under this anger?",
"items": [
"I'm angry because...",
"Underneath, I feel...",
"What I need is..."
],
"sub": "Out loud, quietly, or on paper.",
"say": "Try finishing three sentences. I'm angry because. Underneath, I feel. What I need is. Say them quietly, or write them down.",
"beats": [
"Try finishing three sentences.",
"I'm angry because.",
"Underneath, I feel.",
"What I need is.",
{
"t": "Say them quietly, or write them down.",
"w": 14
}
]
},
{
"k": "words",
"h": "Things you can tell yourself",
"items": [
"My anger is information, not instructions.",
"I can feel this and still choose what I do."
],
"say": "Here are two things you can tell yourself. My anger is information, not instructions. And, I can feel this and still choose what I do."
},
{
"k": "card",
"title": "After a blowup",
"body": "\"I've been short-tempered lately, and I'm sorry. I'm working on it.\"",
"say": "Repair after a blowup matters more than never having one. Apologize specifically, for what you said or did. You could say, I've been short-tempered lately, and I'm sorry. I'm working on it."
},
{
"k": "big",
"h": "Information, not instructions.",
"sub": "The full guide has more, whenever you want it.",
"say": "If your anger leads to threats or violence, or the people you live with are frightened, reach out to a counselor or your doctor now. If anyone is in danger, call 911. If you have thoughts of ending your life, call or text 988. Your anger is information, not instructions. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-anger-helper",
"guide": "anger",
"side": "helper",
"title": "Anger That Runs Hot",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Anger That Runs Hot",
"sub": "For the Helper",
"say": "If someone you love has a quick temper, or anger that keeps landing on the people around them, this is for you."
},
{
"k": "big",
"h": "Your safety comes first.",
"sub": "Danger right now: 911.",
"say": "Before anything else, your safety comes first. If their anger ever turns threatening, or you or the children feel afraid, step away and get help. If anyone is in danger right now, call 911. Oak's guide on domestic violence has more."
},
{
"k": "big",
"h": "Underneath, anger is often something softer.",
"sub": "Hurt, fear, grief, or feeling unheard.",
"say": "Underneath, anger is often something softer. Hurt, fear, grief, or feeling unheard. Afterward, they may feel ashamed. Or they may not see how their anger lands on you at all."
},
{
"k": "words",
"h": "Words that steady",
"items": [
"I can tell you're really upset. I want to understand.",
"Let's take a break and come back to this."
],
"say": "Here are words that steady a hot moment. I can tell you're really upset. I want to understand. And, let's take a break and come back to this."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Stay calmer than the moment",
"Anger met with anger adds fuel"
],
[
"Talk when things are calm",
"Not in the middle of it"
],
[
"Name the impact",
"Kindly and clearly"
]
],
"say": "A few things help. Stay calmer than the moment, because meeting anger with anger only adds fuel. Save the real talk for when things are calm. Then name the impact, kindly and clearly."
},
{
"k": "words",
"h": "Name how it landed",
"items": [
"When you yelled, I felt scared.",
"I want us to be okay."
],
"sub": "One kind, clear sentence.",
"say": "Let's try it. Think of a time their anger landed on you. Now picture a calm moment, later. Say how it landed, in one kind, clear sentence.",
"beats": [
"Let's try it.",
"Think of a time their anger landed on you.",
"Now picture a calm moment, later.",
{
"t": "Say how it landed, in one kind, clear sentence.",
"w": 12
}
]
},
{
"k": "points",
"h": "When to encourage more support",
"items": [
[
"Relationships are suffering",
"Family, friends, or work"
],
[
"Threats or violence",
"Get help, and stay safe"
],
[
"Something deeper underneath",
"Depression or old trauma"
]
],
"say": "Encourage more support when anger is damaging their relationships. When it turns to threats or violence, get help, and keep yourself safe. And when it may be covering something deeper, like depression or old trauma. A counselor or their doctor is a good place to start."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Hot anger leaves a mark on the people near it.",
"say": "Living near hot anger wears on you. Notice your own body. Take your own breaks. Talk with someone you trust, so you aren't carrying it alone. If you find yourself walking on eggshells at home, that is worth saying out loud, to a friend, a counselor, or someone who can help."
},
{
"k": "big",
"h": "Calm, clear, and safe.",
"sub": "The full guide has more, whenever you want it.",
"say": "Calm, clear, and safe. That is how you stay beside someone whose anger runs hot. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "shame",
"ring": "inside",
"title": "Shame and Guilt",
"you": {
"id": "ok-g-shame-you",
"guide": "shame",
"side": "you",
"title": "Shame and Guilt",
"sideName": "For You",
"mins": 3,
"sources": [
"tangney",
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Shame and Guilt",
"sub": "For You",
"say": "If you've been carrying something heavy, a sense of being bad, not enough, or beyond forgiving, this is for you."
},
{
"k": "points",
"h": "How it can feel",
"items": [
[
"Replaying it",
"The same mistake, over and over"
],
[
"Hiding",
"Keeping people at a distance"
],
[
"Overworking",
"Trying to prove your worth"
]
],
"say": "Shame can feel like a heavy sense of being bad. You may replay a mistake over and over. You may hide, and keep people at a distance. Or you may overwork, trying to prove your worth."
},
{
"k": "big",
"h": "Guilt and shame are different.",
"sub": "Guilt: I did something wrong. Shame: I am wrong.",
"say": "It helps to know the difference. Guilt says, I did something wrong. Shame says, I am wrong. Only one of those is true. Guilt can lead you toward repair. Shame usually leads you toward hiding."
},
{
"k": "big",
"h": "Say what happened, plainly.",
"sub": "Without the story you tell about yourself.",
"say": "Here's something to try. Think of what happened, and say it plainly, the way a fair witness would. Leave out the story you tell about yourself. Say it, or write it, in one or two sentences.",
"beats": [
"Here's something to try.",
"Think of what happened, and say it plainly, the way a fair witness would.",
"Leave out the story you tell about yourself.",
{
"t": "Say it, or write it, in one or two sentences.",
"w": 14
}
]
},
{
"k": "big",
"h": "Is there something I can repair?",
"sub": "Make amends where you can.",
"say": "Now ask, is there something I can repair? Sometimes repair is an apology, or making something right with someone. Sometimes it is a change in how you live today. Make amends where you can."
},
{
"k": "words",
"h": "Speak to yourself like a friend",
"items": [
"I made a mistake. I am not a mistake.",
"I can learn from this and keep going."
],
"say": "Try speaking to yourself the way you would speak to a friend. I made a mistake. I am not a mistake. And, I can learn from this and keep going. You can take responsibility and still treat yourself with kindness."
},
{
"k": "big",
"h": "Shame shrinks when it is spoken.",
"sub": "To someone safe.",
"say": "Shame grows in hiding, and shrinks when it is spoken to someone safe. Tell one trusted person. You could say, I've been carrying something heavy, and I'd like to talk about it with someone who won't judge me."
},
{
"k": "card",
"title": "If it's too heavy to carry",
"body": "Shame tied to trauma or abuse: a counselor can help. Thoughts that you would be better off dead: call or text 988. Danger right now: 911.",
"say": "If your shame is tied to trauma or abuse, a counselor can help you carry it. If you have thoughts that you'd be better off dead, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "I made a mistake. I am not a mistake.",
"sub": "The full guide has more, whenever you want it.",
"say": "You made a mistake. You are not a mistake. You can learn from this and keep going. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-shame-helper",
"guide": "shame",
"side": "helper",
"title": "Shame and Guilt",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Shame and Guilt",
"sub": "For the Helper",
"say": "If someone has trusted you with something they're ashamed of, or you can tell they're carrying something heavy, this is for you."
},
{
"k": "big",
"h": "Your response shapes what happens next.",
"sub": "They may be expecting rejection.",
"say": "When someone shares something they're ashamed of, they may be bracing for rejection. Your response will shape whether they ever tell anyone again. That's a lot of weight, and it's also a gift you can give."
},
{
"k": "words",
"h": "Words that keep the door open",
"items": [
"Thank you for trusting me with that.",
"That doesn't change how I see you."
],
"say": "Here are words that keep the door open. Thank you for trusting me with that. And, that doesn't change how I see you."
},
{
"k": "points",
"h": "Hold both",
"items": [
[
"Take real harm seriously",
"Without shrinking what happened"
],
[
"Hold on to their worth",
"Without piling on judgment"
],
[
"Stay close after",
"Check in the next day"
]
],
"say": "Hold two things at once. Take any real harm seriously, without shrinking what happened. And hold on to their worth, without piling on judgment. Then stay close after they share. A text or a call the next day says, I'm still here."
},
{
"k": "words",
"h": "Practice saying it",
"items": [
"Thank you for trusting me with that."
],
"sub": "Slowly, like you mean it.",
"say": "Let's practice. Picture someone you love telling you the thing they're most ashamed of. Now say, out loud, thank you for trusting me with that. Say it slowly, like you mean it.",
"beats": [
"Let's practice.",
"Picture someone you love telling you the thing they're most ashamed of.",
"Now say, out loud, thank you for trusting me with that.",
{
"t": "Say it slowly, like you mean it.",
"w": 10
}
]
},
{
"k": "flow",
"h": "Help them think about repair",
"steps": [
[
"What happened",
"Plainly, without the verdict"
],
[
"Who was affected",
"Including them"
],
[
"What could make it right",
"An apology, an amend, a change"
],
[
"What to do today",
"One small step"
]
],
"say": "When they're ready, help them think about repair. What happened, said plainly, without the verdict about themselves. Who was affected, including them. What could make it right, an apology, an amend, or a change in how they live. And one small step they could take today."
},
{
"k": "card",
"title": "Keep it close",
"body": "Keep what you hear confidential unless someone is in danger. Thoughts of being better off dead: 988. Danger right now: 911. Harm to a vulnerable adult in Minnesota: MAARC 1-844-880-1574.",
"say": "Keep what you hear confidential, unless someone is in danger. If they say they'd be better off dead, call or text 988 together. If anyone is in danger right now, call 911. If what they share involves harm to a vulnerable adult in Minnesota, call MAARC."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Heavy things stay with you.",
"say": "Hearing something heavy can stay with you. Take a walk afterward, and notice what it stirred in you. If you need to talk it through, find someone you trust, while keeping their story private."
},
{
"k": "big",
"h": "Stay close after they share.",
"sub": "The full guide has more, whenever you want it.",
"say": "Thank them for trusting you, and stay close after they share. That may be the moment they learn shame can be spoken. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "lost",
"ring": "inside",
"title": "Feeling Lost or Without Purpose",
"you": {
"id": "ok-g-lost-you",
"guide": "lost",
"side": "you",
"title": "Feeling Lost or Without Purpose",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Feeling Lost or Without Purpose",
"sub": "For You",
"say": "If you feel lost right now, or you are wondering what it is all for, this is for you. You don't need to have it figured out to watch it."
},
{
"k": "big",
"h": "This is a season, not a sentence.",
"sub": "Seasons without clear purpose are normal.",
"say": "Here is the first thing to hold onto. This is a season, not a sentence. Seasons without clear purpose are normal, especially after a big change. A job ends. Children grow up. A body changes. A role you loved comes to a close. Feeling lost is often how a person grieves the life they expected to have."
},
{
"k": "points",
"h": "What lost can feel like",
"items": [
[
"Going through the motions",
"Days that feel flat"
],
[
"Wondering what it is for",
"The big why gets loud"
],
[
"Restless or numb",
"Sometimes both in one day"
],
[
"Quietly grieving",
"The life you expected"
]
],
"say": "Lost can feel like going through the motions, with days that feel flat. It can feel like wondering what it is all for. You might feel restless, or numb, sometimes both in one day. And underneath, you may be quietly grieving the life you expected. All of that is part of a season like this."
},
{
"k": "big",
"h": "Purpose is found in doing.",
"sub": "Not only in thinking.",
"say": "Here is what helps many people. Purpose is usually found in doing, more than in thinking. You may not be able to think your way to it. You can take one small step, and notice what comes alive in you."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"I once met Sarah, a teacher who kept teaching third grade through four years of cancer.",
"Those kids gave me a reason to get out of bed on the hardest mornings, she told me.",
"My classroom gave me purpose when everything else felt like it was falling apart."
],
"lesson": "Purpose often lives in ordinary days.",
"note": "Names and details changed",
"hold": 2,
"say": "I once met a young teacher named Sarah. She had taught third grade for twelve years, and for the last four she had been fighting cancer. Every day she could, she kept teaching. She told me, those kids gave me a reason to get out of bed on the hardest mornings. My classroom gave me purpose when everything else felt like it was falling apart."
},
{
"k": "points",
"h": "Small places to start",
"items": [
[
"Three alive moments",
"When did you feel most alive?"
],
[
"One new thing",
"Try it this month"
],
[
"One hour for someone",
"Meaning shows up in helping"
],
[
"Write your story",
"And what it has taught you"
]
],
"say": "Here are small places to start. List three moments when you felt most alive. Try one new thing this month. Give an hour to helping someone, because meaning often shows up in the act of helping. And write about your story, and what it has taught you."
},
{
"k": "big",
"h": "When did you feel most alive?",
"sub": "Picture it for a moment.",
"say": "Let's try one now. Think of a moment when you felt most alive. Picture where you were, what you were doing, and who was with you.",
"beats": [
"Let's try one now.",
"Think of a moment when you felt most alive.",
{
"t": "Picture where you were, what you were doing, and who was with you.",
"w": 12
}
]
},
{
"k": "words",
"h": "Words to keep",
"items": [
"This is a season, not a sentence.",
"I don't need the whole map to take the next step.",
"I feel kind of lost right now. Can I talk it through with you?"
],
"say": "Here are words to keep. This is a season, not a sentence. I don't need the whole map to take the next step. And one to say to someone you trust. I feel kind of lost right now. Can I talk it through with you?"
},
{
"k": "card",
"title": "Heavy for weeks? Reach out.",
"body": "Talk with your doctor or a counselor. Thoughts of ending your life: call or text 988. Danger right now: 911.",
"say": "Sometimes emptiness slides into hopelessness or depression. If it stays heavy for weeks, talk with your doctor or a counselor. That is a strong step. If you have thoughts of ending your life, call or text nine eight eight. If you are in danger right now, call nine one one."
},
{
"k": "big",
"h": "One small step is enough for today.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the whole map. One small step is enough for today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-lost-helper",
"guide": "lost",
"side": "helper",
"title": "Feeling Lost or Without Purpose",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Feeling Lost or Without Purpose",
"sub": "For the Helper",
"say": "This is for the friend or family member walking beside someone who feels lost or without purpose. You can help a great deal without having the answer."
},
{
"k": "big",
"h": "Walk with the question.",
"sub": "Let the answer come in its own time.",
"say": "They may feel embarrassed that they haven't figured it out. Many people do. Your part isn't to hand them a purpose. It is to walk with the question, and let the answer come in its own time."
},
{
"k": "words",
"h": "Words that open the door",
"items": [
"What used to make you come alive?",
"It's okay not to know yet.",
"Want to talk it through?"
],
"say": "Here are words that open the door. What used to make you come alive? It's okay not to know yet. Want to talk it through? Then listen more than you speak."
},
{
"k": "points",
"h": "What keeps the door open",
"items": [
[
"Let the answer be theirs",
"Ask more than you advise"
],
[
"Name strengths you see",
"Specific is best"
],
[
"Invite them in",
"Meaningful work, side by side"
],
[
"Keep showing up",
"A walk, a call, a meal"
]
],
"say": "A few things keep the door open. Let the answer be theirs. Even a good plan from you can crowd out the one that fits them, so ask more than you advise. Name the strengths you see in them, as specifically as you can. Invite them into meaningful work, side by side. And keep showing up, with a walk, a call, or a meal."
},
{
"k": "big",
"h": "What strength do you see in them?",
"sub": "Say it the way you would say it to them.",
"say": "Take a moment. Think of the person you are walking beside. Name one strength you see in them, out loud, the way you would say it to them.",
"beats": [
"Take a moment.",
"Think of the person you are walking beside.",
{
"t": "Name one strength you see in them, out loud, the way you would say it to them.",
"w": 12
}
]
},
{
"k": "flow",
"h": "Doing it together",
"steps": [
[
"Notice",
"What lights them up, even a little"
],
[
"Invite",
"Come do this with me"
],
[
"Ask after",
"How did that feel?"
]
],
"say": "Purpose is usually found in doing, and doing is easier with company. Notice what lights them up, even a little. Invite them: come do this with me. Then ask after, how did that feel? Small things count. Helping a neighbor counts. A class counts."
},
{
"k": "card",
"title": "Watch for hopelessness.",
"body": "Encourage a doctor or counselor. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "Stay alert to one thing. If emptiness turns into hopelessness, or they lose interest in almost everything, gently encourage them to talk with their doctor or a counselor. Offer to help make the call. If they talk about ending their life, call or text nine eight eight together. If they are in danger right now, call nine one one."
},
{
"k": "big",
"h": "You don't have to fix their life.",
"sub": "Keep your own roots watered too.",
"say": "Walking beside someone who feels lost can wear on you, especially when you love them. You don't have to fix their life to be a good friend. Keep your own roots watered: rest, your own people, and someone to talk to."
},
{
"k": "big",
"h": "Walk with the question.",
"sub": "The full guide has more, whenever you want it.",
"say": "Walk with the question, and keep showing up. That is how many people find their way. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "trauma",
"ring": "inside",
"title": "After Something Traumatic",
"you": {
"id": "ok-g-trauma-you",
"guide": "trauma",
"side": "you",
"title": "After Something Traumatic",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After Something Traumatic",
"sub": "For You",
"say": "If something frightening happened to you, recently or a while ago, this is for you. Watch as much or as little as you want. You can stop any time."
},
{
"k": "big",
"h": "A normal reaction to something that wasn't normal.",
"sub": "For many people, it eases over the following weeks.",
"say": "Here is the first thing to know. What you are feeling is a normal reaction to something that wasn't normal. Strong reactions after a frightening event are common. For many people, they ease over the following weeks."
},
{
"k": "points",
"h": "What you may notice",
"items": [
[
"Replaying it",
"Pictures or sounds that come back"
],
[
"Startling easily",
"Your body stays on alert"
],
[
"Sleeping poorly",
"Rest comes in pieces"
],
[
"Feeling numb or far away",
"Or guilty for how you reacted"
]
],
"say": "You may notice some of these. Replaying it, with pictures or sounds that come back. Startling easily, because your body is still on alert. Sleeping poorly, so rest comes in pieces. Feeling numb or far away. Some people feel guilty for surviving, or for how they reacted. All of it is common."
},
{
"k": "big",
"h": "Calm the body first.",
"sub": "Safety, rest, and connection help most early on.",
"say": "Your body may stay on alert for a while. That is your body trying to protect you. Calming the body is often the first step, before making sense of anything. Safety, rest, and connection help most in the early days."
},
{
"k": "big",
"h": "Breathe out longer than you breathe in.",
"sub": "Feet on the floor. Slow exhale.",
"say": "Let's try it now. Feel your feet on the floor. Breathe in through your nose for a count of four. Breathe out slowly for a count of six. Keep going at your own pace, and let your shoulders drop.",
"beats": [
"Let's try it now.",
"Feel your feet on the floor.",
"Breathe in through your nose for a count of four.",
"Breathe out slowly for a count of six.",
{
"t": "Keep going at your own pace, and let your shoulders drop.",
"w": 14
}
]
},
{
"k": "words",
"h": "Words to tell yourself",
"items": [
"What I'm feeling is a normal reaction to something that wasn't normal.",
"I'm safe right now, in this room."
],
"say": "Here are words to tell yourself. What I'm feeling is a normal reaction to something that wasn't normal. And, when it's true, I'm safe right now, in this room."
},
{
"k": "points",
"h": "What helps in the early days",
"items": [
[
"A safe, quiet place",
"And slower breathing"
],
[
"Food, water, and rest",
"Even if sleep comes in pieces"
],
[
"A steady routine",
"And time outside"
],
[
"Fewer replays",
"Less news and social media"
]
],
"say": "Here is what helps in the early days. A safe, quiet place, and slower breathing. Food, water, and rest, even if sleep comes in pieces. A steady daily routine, with gentle movement and time outside. And fewer replays of the event on the news or social media."
},
{
"k": "card",
"title": "You choose how much to tell.",
"body": "Try: \"Something hard happened. I don't need advice, just company for a while.\"",
"say": "It can help to tell one trusted person what happened, as much as you want to, and no more. You choose. You might say, something hard happened. I don't need advice, just company for a while."
},
{
"k": "card",
"title": "Still strong after a month? Reach out.",
"body": "A trauma-informed counselor or your doctor. Thoughts of hurting yourself: call or text 988. Danger right now: 911.",
"say": "If nightmares, flashbacks, or avoidance last longer than a month, or get in the way of daily life, talk with your doctor or a trauma-informed counselor. Trauma-focused therapy works for many people. If you have thoughts of hurting yourself, call or text nine eight eight. If you are in danger right now, call nine one one."
},
{
"k": "big",
"h": "One breath at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "Go gently. Your body is finding its way back to solid ground, one breath at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-trauma-helper",
"guide": "trauma",
"side": "helper",
"title": "After Something Traumatic",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After Something Traumatic",
"sub": "For the Helper",
"say": "This is for the friend or family member walking beside someone who has been through something frightening. Your steady presence matters more than finding the perfect words."
},
{
"k": "big",
"h": "Safety first. Their pace.",
"sub": "Let them lead.",
"say": "Two things guide everything here. Safety first, and their pace. After something frightening, a person may feel jumpy, ashamed, or afraid of being a burden. They may not want to talk yet. That's okay. Let them lead."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so glad you're safe.",
"You can tell me as much or as little as you want.",
"You don't have to talk. I'll be right here."
],
"say": "Here are words that help. I'm so glad you're safe. You can tell me as much or as little as you want. You don't have to talk. I'll be right here."
},
{
"k": "points",
"h": "What keeps them feeling safe",
"items": [
[
"Let them choose the details",
"Never press for more"
],
[
"Let their feelings be theirs",
"No shoulds"
],
[
"Skip comparisons",
"It could have been worse stings"
],
[
"Ask before touch",
"Would a hug help?"
]
],
"say": "A few things keep them feeling safe with you. Let them choose the details, and never press for more. Let their feelings be theirs, without telling them how they should feel. Skip comparisons. It could have been worse usually stings. And ask before touch. Would a hug help, or would you rather not?"
},
{
"k": "points",
"h": "Practical help",
"items": [
[
"Meals, rides, and chores",
"For a few weeks"
],
[
"Sit with them",
"Presence matters more than words"
],
[
"A walk outside",
"Gentle movement, together"
]
],
"say": "Practical help goes a long way. Help with meals, rides, and chores for a few weeks. Sit with them. Presence matters more than words. And invite them on a slow walk outside, together."
},
{
"k": "big",
"h": "Picture sitting with them.",
"sub": "Nothing to fix.",
"say": "Take a moment. Picture yourself sitting beside them, with nothing to fix. Now say it softly: you can tell me as much or as little as you want.",
"beats": [
"Take a moment.",
"Picture yourself sitting beside them, with nothing to fix.",
{
"t": "Now say it softly: you can tell me as much or as little as you want.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it doesn't ease, help them find support.",
"body": "A trauma-informed counselor or their doctor. Thoughts of self-harm: call or text 988. Danger right now: 911.",
"say": "If nightmares, flashbacks, or avoidance last longer than a month, gently mention professional help. A trauma-informed counselor, or their doctor. Offer to help find one, and let them choose. If they talk about hurting themselves, call or text nine eight eight together. If anyone is in danger right now, call nine one one."
},
{
"k": "big",
"h": "Hearing it can stir your own.",
"sub": "Take care of yourself too.",
"say": "Hearing about something frightening can stir up your own hard memories, or leave you jumpy and tired. That is common. Take care of yourself too. Rest, move your body, and talk with someone you trust."
},
{
"k": "big",
"h": "Steady presence is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the right words. Steady presence is enough, and it matters more than you know. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "adhd",
"ring": "inside",
"title": "ADHD as an Adult, or a Late Diagnosis",
"you": {
"id": "ok-g-adhd-you",
"guide": "adhd",
"side": "you",
"title": "ADHD as an Adult, or a Late Diagnosis",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "ADHD as an Adult, or a Late Diagnosis",
"sub": "For You",
"say": "If you are living with ADHD as an adult, or you just got a diagnosis later in life, or you are wondering whether it fits you, this is for you."
},
{
"k": "big",
"h": "Your brain works differently. It is not a character flaw.",
"say": "Here is the heart of it. ADHD is real in adults, and many people aren't diagnosed until later in life. Your brain works differently. It is not a character flaw. Your struggles were never proof that you were lazy or careless."
},
{
"k": "points",
"h": "A late diagnosis can bring",
"items": [
[
"Relief",
"Finally, a name for it"
],
[
"Grief",
"For the years you blamed yourself"
],
[
"Frustration",
"Forgetting, starting, finishing"
],
[
"All of it at once",
"Every one is normal"
]
],
"say": "A late diagnosis can bring relief, at finally having a name for it. Grief, for the years you blamed yourself. Frustration with forgetting, starting, or finishing things, even when you care a lot. Often it brings all of these at once. Every one of them is normal."
},
{
"k": "card",
"title": "Wondering? Talk with your doctor.",
"body": "Ask about an evaluation. Bring examples from school, work, and home.",
"say": "If you are wondering whether this fits you, talk with your doctor about an evaluation. Bring examples from school, work, and home. A doctor or qualified clinician is the one who can sort out what is going on. And if you already have a diagnosis, treatment works, and it can be matched to you. Your doctor is the person to talk with about what fits."
},
{
"k": "points",
"h": "Systems outside your head",
"items": [
[
"A visible calendar",
"Where you will see it"
],
[
"Reminders on your phone",
"Let them do the remembering"
],
[
"One place for keys",
"Every single time"
],
[
"Sleep, movement, outdoors",
"They help too"
]
],
"say": "Many people find it helps to build systems outside their head. A visible calendar, where you will actually see it. Reminders on your phone, so they do the remembering. One place for your keys, every single time. And sleep, movement, and time outdoors help too. Pick one tool to try this week. Just one."
},
{
"k": "words",
"h": "A kinder way to talk to yourself",
"items": [
"My brain works differently.",
"It is not a character flaw."
],
"sub": "Hand on your heart, if that feels okay.",
"say": "Let's try something now. Put a hand on your heart, if that feels okay. Say it slowly, out loud or inside: my brain works differently. It is not a character flaw.",
"beats": [
"Let's try something now.",
"Put a hand on your heart, if that feels okay.",
"Say it slowly, out loud or inside: my brain works differently.",
{
"t": "It is not a character flaw.",
"w": 10
}
]
},
{
"k": "big",
"h": "What do you do well?",
"sub": "Strengths sit beside the struggles.",
"say": "Strengths sit beside the struggles. Maybe it's the way you solve problems, your energy for what you love, or how you show up when someone needs you. Name yours. They are just as real as the hard parts."
},
{
"k": "card",
"title": "Try telling someone.",
"body": "\"I recently learned I have ADHD. It explains a lot, and here is what helps me.\"",
"say": "When you're ready, it can help to tell the people close to you. You might say, I recently learned I have ADHD. It explains a lot, and here is what helps me."
},
{
"k": "card",
"title": "Take care of your mood too.",
"body": "Anxiety and depression often come along. Talk with your doctor. Thoughts of suicide: call or text 988.",
"say": "Anxiety and depression often come along with ADHD. If focus, mood, or daily life feel out of control, see your doctor. Getting help for those is a strong step too. If you have thoughts of suicide, call or text nine eight eight. If you are in danger right now, call nine one one."
},
{
"k": "big",
"h": "Build systems that work for you.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can stop fighting yourself, and start building systems that work for you, one tool at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-adhd-helper",
"guide": "adhd",
"side": "helper",
"title": "ADHD as an Adult, or a Late Diagnosis",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "ADHD as an Adult, or a Late Diagnosis",
"sub": "For the Helper",
"say": "This is for the partner, friend, or family member of someone living with ADHD as an adult, or someone who just learned they have it later in life."
},
{
"k": "big",
"h": "That makes so much sense.",
"sub": "Some of the kindest words you can say.",
"say": "One of the kindest things you can say after a late diagnosis is, that makes so much sense. They may feel relief, grief, or both. They may feel defensive after years of being called forgetful. Your words can help them stop fighting themselves."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That makes so much sense.",
"What would help most?",
"Here is something you do really well."
],
"say": "Here are words that help. That makes so much sense. What would help most? And, here is something you do really well. Then name it."
},
{
"k": "points",
"h": "What helps most",
"items": [
[
"Take it seriously",
"It is real in adults"
],
[
"Build a shared system",
"Plans everyone can see"
],
[
"Notice what they do well",
"Out loud"
],
[
"Ask before you help",
"Their way may differ from yours"
]
],
"say": "A few things help most. Take it seriously. Everybody's a little ADHD can sting, because this is real in adults. Build a shared system, like a family calendar everyone can see, instead of reminders that turn into nagging. Notice what they do well, and say it out loud. And ask before you help. Their way may be different from yours, and still work."
},
{
"k": "big",
"h": "Name one thing they do well.",
"sub": "The way you would say it to them.",
"say": "Take a moment. Picture the person you are walking beside. Name one thing they do really well, the way you would say it to them.",
"beats": [
"Take a moment.",
"Picture the person you are walking beside.",
{
"t": "Name one thing they do really well, the way you would say it to them.",
"w": 10
}
]
},
{
"k": "card",
"title": "Leave the diagnosis to the doctor.",
"body": "Encourage an evaluation. Questions about treatment belong there too.",
"say": "If you wonder whether someone you love has ADHD, you can gently encourage them to talk with their doctor about an evaluation. A doctor or qualified clinician is the one to say. Questions about treatment belong there too."
},
{
"k": "card",
"title": "Watch their mood.",
"body": "Anxiety and depression often come along. Thoughts of suicide: call or text 988.",
"say": "Anxiety and depression often come along with ADHD. If they seem very low for weeks, encourage them to see their doctor. If they talk about ending their life, call or text nine eight eight together. If anyone is in danger right now, call nine one one."
},
{
"k": "big",
"h": "It affects the whole family.",
"sub": "Couples and family support can help everyone.",
"say": "Living with ADHD affects partners and families too. If you feel tired of reminding, or like you've become the one who holds everything, that is worth naming. Couples and family support can help everyone. Take care of yourself too."
},
{
"k": "big",
"h": "Work with how their brain works.",
"sub": "The full guide has more, whenever you want it.",
"say": "Work with how their brain works, not against it, and keep noticing what they do well. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "spouse-death",
"ring": "loss",
"title": "Your Spouse or Partner Died",
"you": {
"id": "ok-g-spouse-death-you",
"guide": "spouse-death",
"side": "you",
"title": "Your Spouse or Partner Died",
"sideName": "For You",
"mins": 5,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Spouse or Partner Died",
"sub": "For You",
"say": "If your husband, wife, or partner has died, this is for you. Go at your own pace, and stop whenever you need to."
},
{
"k": "big",
"h": "The whole day changed.",
"sub": "Not just one part of it.",
"say": "When a partner dies, it isn't one loss. It's the morning coffee, the voice in the next room, the person you told about your day. Meals, bedtime, and weekends can all feel strange. That is part of why this is so hard, and why it takes so long."
},
{
"k": "words",
"h": "All of it is normal",
"items": [
"Lost",
"Angry",
"Numb",
"Relieved, after a long illness"
],
"say": "You may feel lost, angry, or numb. After a long illness, you may even feel relieved. Many people reach for the phone to tell them something, and then remember. All of it is normal. None of it means you loved them less. Grief comes in waves. A good day doesn't mean you're done, and a bad day doesn't mean you're stuck."
},
{
"k": "story",
"title": "Total Bliss",
"lines": [
"Jane had been a young widow, left to raise two children alone.",
"She never remarried. I have never stopped loving my Gary, she told me.",
"She smiled. I made a promise til death, and I have not died yet."
],
"lesson": "Love keeps its own shape.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/total-bliss",
"label": "Read the Full Story: Total Bliss"
},
"hold": 2,
"say": "I once sat with a woman named Jane, a few days before she died. She had been a young widow, left to raise two children alone. I asked if she ever remarried. No, she said. I have never stopped loving my Gary. He has a place in my heart forever. Then she smiled. I made a promise til death, and I have not died yet."
},
{
"k": "big",
"h": "Your love keeps its own shape.",
"sub": "Feeling joy again does not erase them.",
"say": "Your love keeps its own shape, too. For some, it is a promise kept for life. For others, it makes room to laugh again, and even to love again. Both honor the one who died. Feeling joy again doesn't mean you've forgotten them."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"The basics",
"Sleep, water, food, medicines"
],
[
"One helper for paperwork",
"Someone you trust tracks deadlines"
],
[
"Say yes to company",
"Even when you don't feel like talking"
],
[
"Hold off on big decisions",
"In the first year, when you can"
]
],
"say": "Here is what helps. The basics first: sleep, water, food, and your medicines. Let one trusted person help you track the paperwork and deadlines. Say yes to company, even when you don't feel like talking. And when you can, hold off on big decisions in the first year."
},
{
"k": "big",
"h": "Say their name.",
"say": "Take a moment. Say their name, out loud or softly. Then say one thing you miss about them. Let yourself miss them.",
"beats": [
"Take a moment.",
"Say their name, out loud or softly.",
"Then say one thing you miss about them.",
{
"t": "Let yourself miss them.",
"w": 12
}
]
},
{
"k": "words",
"h": "Ask for something specific",
"items": [
"Check on me Sunday evenings. That's the hardest time."
],
"say": "People want to help, and often don't know how. Tell them something specific. What helps most is if you check on me on Sunday evenings. That's the hardest time. And try one small new routine for your hardest hour: a walk, a call, a song. A grief group with others who have lost a partner can help too."
},
{
"k": "big",
"h": "If you think about joining them",
"sub": "Call or text 988, any time.",
"say": "In deep grief, some people think about wanting to be with the one who died. If that turns into thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911. And if your grief stays intense, or grows heavier after many months, a grief counselor can walk with you."
},
{
"k": "big",
"h": "Your love comes with you.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your love doesn't end. It comes with you, into every new day. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-spouse-death-helper",
"guide": "spouse-death",
"side": "helper",
"title": "Your Spouse or Partner Died",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Spouse or Partner Died",
"sub": "For the Helper",
"say": "When someone you know has lost their husband, wife, or partner, this is for you. You don't need perfect words. You need to keep showing up."
},
{
"k": "big",
"h": "The crowd leaves. Stay.",
"sub": "Month three, six, and twelve.",
"say": "In the first weeks, people bring food and fill the house. Then the funeral ends, and the crowd goes home. That's often when the loneliness really starts. One of the kindest things you can do is still be there in month three, month six, and month twelve."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry. I loved how he laughed at his own jokes.",
"I'm bringing dinner Tuesday. Is 5 okay?",
"Tell me about her."
],
"say": "Here are words that help. I'm so sorry. I loved how he laughed at his own jokes. A real memory tells them their person mattered to you too. I'm bringing dinner Tuesday. Is 5 okay? A specific offer is easy to say yes to. And simply, tell me about her."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"They're in a better place.",
"At least you had many years.",
"Let me know if you need anything."
],
"say": "Some words, meant kindly, can land hard. They're in a better place, unless you know it comforts them. At least you had many years together, because at least shrinks the loss. And let me know if you need anything, because it leaves the asking to them. Offer something specific instead."
},
{
"k": "points",
"h": "Help with something specific",
"items": [
[
"The yard and the car",
"Things their partner used to do"
],
[
"Forms and deadlines",
"Sit beside them while they sort"
],
[
"The hardest hours",
"Sunday evenings, holidays, anniversaries"
]
],
"say": "Help with something specific. The yard and the car, the things their partner used to handle. Forms and deadlines: sit beside them while they sort. And the hardest hours, like Sunday evenings, holidays, and the anniversary. Those are the times to call."
},
{
"k": "big",
"h": "Say their partner's name.",
"sub": "It tells them their person still matters.",
"say": "Say their partner's name. When everyone stops mentioning the person who died, the silence can feel like a second loss. Hearing the name, and a memory, tells them their person still matters."
},
{
"k": "big",
"h": "Put it on the calendar.",
"say": "Take a moment. Think of the person you're supporting. Pick a day about three months from now. Put a call or a visit on your calendar now.",
"beats": [
"Take a moment.",
"Think of the person you're supporting.",
"Pick a day about three months from now.",
{
"t": "Put a call or a visit on your calendar now.",
"w": 10
}
]
},
{
"k": "big",
"h": "When to help them reach out",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "Watch, gently, for grief that stays intense or gets worse after many months, or keeps them from daily life. You can help them find a grief group or a counselor. If they ever talk about wanting to join their partner, or not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Their grief may touch yours.",
"sub": "Look after that, too.",
"say": "Their grief may touch your own losses, or your fear of losing your own partner. That's human. Talk with someone you trust, and look after yourself, too."
},
{
"k": "big",
"h": "Keep showing up.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep showing up, long after the funeral. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "parent-death",
"ring": "loss",
"title": "Your Parent Died",
"you": {
"id": "ok-g-parent-death-you",
"guide": "parent-death",
"side": "you",
"title": "Your Parent Died",
"sideName": "For You",
"mins": 4,
"sources": [
"pennebaker"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Parent Died",
"sub": "For You",
"say": "If your mom or dad has died, this is for you, whatever your age, and whatever your relationship with them was like."
},
{
"k": "big",
"h": "This is a big loss, at any age.",
"sub": "Expected doesn't mean small.",
"say": "Losing a parent can shake your sense of home, at any age. People may treat it as expected, because you're grown. Expected doesn't make it small. It makes sense that this hurts."
},
{
"k": "words",
"h": "All of it is valid",
"items": [
"Sadness",
"Relief",
"Anger",
"Regret",
"Suddenly the oldest generation"
],
"say": "You may feel sadness, relief, anger, or regret. You may feel, all at once, like the oldest generation. Small things, like their handwriting or a song, can undo you. All of it is normal."
},
{
"k": "big",
"h": "Complicated love, complicated grief.",
"sub": "You can grieve what they couldn't give you.",
"say": "If your relationship was hard, your grief may be hard too. You can love them and still grieve what they couldn't give you. You get to carry forward what you want to keep from them, and set down what you don't."
},
{
"k": "points",
"h": "While the tasks pile up",
"items": [
[
"Grieve along the way",
"Not only after the list is done"
],
[
"Share the tasks",
"With siblings or family"
],
[
"Keep a few things first",
"Before sorting everything"
],
[
"Expect some tension",
"Family roles shift"
]
],
"say": "There may be a long list of tasks. Let yourself grieve along the way, not only after the list is done. Share the tasks with siblings or family where you can. Keep a few meaningful things before you sort everything. And expect some tension. Family roles shift, and decisions about belongings can stir things up."
},
{
"k": "big",
"h": "Start a letter.",
"say": "Take a moment. Picture your mom or dad. In your mind, or on paper, begin with Dear Mom, or Dear Dad. Then say or write one thing you want them to know.",
"beats": [
"Take a moment.",
"Picture your mom or dad.",
"In your mind, or on paper, begin with Dear Mom, or Dear Dad.",
{
"t": "Then say or write one thing you want them to know.",
"w": 14
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Telling stories about them",
"With people who knew them"
],
[
"Writing to them",
"A letter you can keep adding to"
],
[
"Marking the days",
"Their birthday, the anniversary"
]
],
"say": "Here is what helps many people. Telling stories about them, with people who knew them. Writing to them, in a letter you can keep adding to. And marking the days that matter, like their birthday and the anniversary of their death."
},
{
"k": "words",
"h": "Ask for what you need",
"items": [
"I'm okay most days, but I'd love to talk about my dad sometime."
],
"say": "The people around you may not know you still want to talk about them. You can tell them. I'm okay most days, but I'd love to talk about my dad sometime. I miss him."
},
{
"k": "big",
"h": "When to reach out",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "If your grief doesn't ease, or family conflict starts to feel unmanageable, a counselor can help you sort it out. If you ever have thoughts of not wanting to live, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You are still their child.",
"sub": "The full guide has more, whenever you want it.",
"say": "However old you are, you are still their child. Carry what you choose. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-parent-death-helper",
"guide": "parent-death",
"side": "helper",
"title": "Your Parent Died",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Parent Died",
"sub": "For the Helper",
"say": "When a friend or family member has lost a parent, this is for you, whatever their age."
},
{
"k": "big",
"h": "It's a big loss, at any age.",
"sub": "Treat it like one.",
"say": "People sometimes assume grown children expect this. Because of that, they may feel alone in their grief. They may also be pulled between grief and a long list of tasks. Treat it as the big loss it is."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry about your mom. What was she like?",
"This is a big loss, at any age."
],
"say": "Here are words that help. I'm so sorry about your mom. What was she like? Then listen. And, this is a big loss, at any age."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"She lived a long life.",
"Taking sides over the estate"
],
"say": "She lived a long life may be true. As the first thing you say, it can close the door. Let them tell you about the life first. And if the family disagrees about decisions or belongings, stay out of the sides. Be there for the person, not the dispute."
},
{
"k": "big",
"h": "Complicated is normal.",
"sub": "Let all of it be okay.",
"say": "If their relationship with their parent was hard, they may feel relief, anger, or something they can't name. Let all of it be okay. They can love a parent and still grieve what that parent couldn't give."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Sort, clean, or pack",
"Working beside them"
],
[
"Bring food",
"During the busy weeks"
],
[
"Remember the anniversary",
"And their parent's birthday"
]
],
"say": "Here is what helps. Sort, clean, or pack, working beside them. Bring food during the busy weeks. And remember the anniversary, and their parent's birthday. A short message that day means a lot."
},
{
"k": "big",
"h": "Ask about the parent.",
"say": "Take a moment. Think of the person you're supporting. Picture asking them about their mom or dad. Now say it out loud, the way you would: What was your mom like?",
"beats": [
"Take a moment.",
"Think of the person you're supporting.",
"Picture asking them about their mom or dad.",
{
"t": "Now say it out loud, the way you would: What was your mom like?",
"w": 10
}
]
},
{
"k": "big",
"h": "If you've lost a parent too",
"sub": "Share gently, then turn back to them.",
"say": "If you've lost a parent, your story can help them feel less alone. Share it gently and briefly, then turn the focus back to them. And look after your own grief, if this stirs it."
},
{
"k": "big",
"h": "When to help them reach out",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "If their grief doesn't ease, or family conflict feels unmanageable, you can help them find a counselor. If they ever talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Remember the day.",
"sub": "The full guide has more, whenever you want it.",
"say": "Remember the day, next year and the year after. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "child-death",
"ring": "loss",
"title": "Your Child Died",
"you": {
"id": "ok-g-child-death-you",
"guide": "child-death",
"side": "you",
"title": "Your Child Died",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Child Died",
"sub": "For You",
"say": "If your child has died, whether they were a baby, a young child, or grown, this is for you. Go slowly. You can stop, and come back any time."
},
{
"k": "big",
"h": "You will always be their parent.",
"sub": "Your love for your child doesn't end.",
"say": "You will always be their parent. Your love for your child doesn't end. Nothing that has happened changes that."
},
{
"k": "big",
"h": "There is no timeline.",
"sub": "One hour at a time is enough.",
"say": "This is one of the deepest losses a person can face. It can feel unbearable, disorienting, even physically painful. You may feel the whole world should have stopped. There is no timeline for this, and no right way through it. One hour at a time is enough."
},
{
"k": "words",
"h": "Feelings many parents have",
"items": [
"Guilt",
"Anger",
"Fear for your other children",
"Numbness"
],
"say": "Many parents feel intense guilt, even when nothing could have changed what happened. Some feel anger, at the world, at people, even at the sacred. Some feel fear for their other children. Some feel a numbness that worries them. All of this is part of grief."
},
{
"k": "points",
"h": "For right now",
"items": [
[
"Let others carry the practical things",
"Meals, calls, errands"
],
[
"Be gentle with your body",
"Water, food, rest when it comes"
],
[
"Ask about bereaved parent support",
"Hospital, hospice, or funeral home"
]
],
"say": "For right now, let others carry the practical things: meals, calls, and errands. Be gentle with your body. Water, food, and rest when it comes. And ask your hospital, hospice, or funeral home about support for bereaved parents."
},
{
"k": "big",
"h": "Say their name.",
"say": "Take a moment. If you want to, say your child's name. Out loud, or in a whisper. Let it be said.",
"beats": [
"Take a moment.",
"If you want to, say your child's name.",
"Out loud, or in a whisper.",
{
"t": "Let it be said.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps many parents",
"items": [
[
"Other bereaved parents",
"They understand without explanation"
],
[
"Keeping their memory present",
"Their name, photos, rituals"
],
[
"Asking to hear their name",
"Please say her name."
]
],
"say": "Here is what helps many parents. Other bereaved parents, who understand without explanation. Groups like The Compassionate Friends support bereaved parents and siblings. Keeping your child's memory present: their name, their photos, rituals of your own. And telling people what you need. Please say her name. It means so much to hear it."
},
{
"k": "big",
"h": "Two parents, two griefs.",
"sub": "Both are real.",
"say": "If you have a partner, your grief may look very different from theirs. One may need to talk, and one may need to work, or be alone. Both are real. Your other children need honest words and attention too, and it's okay to let people you trust help with that."
},
{
"k": "big",
"h": "If you don't want to live",
"sub": "Call or text 988, any time.",
"say": "Some parents feel they can't go on without their child. If you have thoughts of not wanting to live, call or text 988, any time, day or night. If you are in danger right now, call 911. A grief counselor can walk with you, too."
},
{
"k": "big",
"h": "You are doing the best you can.",
"sub": "The full guide has more, whenever you want it.",
"say": "Here is something you can tell yourself. I am doing the best I can with an impossible loss. It's true. Your love for your child doesn't end. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-child-death-helper",
"guide": "child-death",
"side": "helper",
"title": "Your Child Died",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Child Died",
"sub": "For the Helper",
"say": "When someone you know has lost a child, this is for you. Being near this grief is hard. This is about how to stay."
},
{
"k": "big",
"h": "Stay.",
"sub": "Your presence matters more than your words.",
"say": "Many bereaved parents say their friends disappear. Often it's out of fear of saying the wrong thing. The most important thing you can do is stay. Your presence matters more than your words."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry. I'm thinking of Sam today.",
"I don't know what to say, but I'm here."
],
"say": "Here are words that help. I'm so sorry. I'm thinking of Sam today. Use the child's name. Most parents long to hear it. And, I don't know what to say, but I'm here. That's honest, and it's enough."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Everything happens for a reason.",
"You can have another child.",
"Comparing losses"
],
"say": "Some words wound, even when meant kindly. Everything happens for a reason. You can have another child. And comparing losses, even your own hardest one. Let their loss stand on its own."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Say the child's name",
"Again and again"
],
[
"Remember the dates",
"Birthdays and anniversaries, for years"
],
[
"Look after the siblings",
"A ride, an outing, your attention"
],
[
"Take on practical things",
"Meals, errands, phone calls"
]
],
"say": "Here is what helps. Say the child's name, again and again. Remember birthdays and anniversaries, for years. Look after surviving brothers and sisters, with a ride, an outing, your attention. And take on practical things, like meals, errands, and phone calls."
},
{
"k": "big",
"h": "Let them say anything.",
"sub": "Listening is the gift.",
"say": "Let them say the hardest things: guilt, anger, even anger at the sacred. You don't need to correct it or fix it. Listening is the gift."
},
{
"k": "big",
"h": "Practice their child's name.",
"say": "Take a moment. Think of the parent you're supporting. Say their child's name out loud, the way you would to them. Then picture the next time you'll say it to them.",
"beats": [
"Take a moment.",
"Think of the parent you're supporting.",
"Say their child's name out loud, the way you would to them.",
{
"t": "Then picture the next time you'll say it to them.",
"w": 12
}
]
},
{
"k": "big",
"h": "If they say they can't go on",
"sub": "Call or text 988 together.",
"say": "If a parent talks about not wanting to live without their child, take it seriously and stay with them. Call or text 988 together. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Get support for yourself.",
"sub": "Stay anyway.",
"say": "Being near this grief is hard. It may stir fear for your own children, or your own losses. Stay anyway, and get support for yourself, so you can keep staying."
},
{
"k": "big",
"h": "Say the name. For years.",
"sub": "The full guide has more, whenever you want it.",
"say": "Say the name, for years. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pregnancy-loss",
"ring": "loss",
"title": "Pregnancy or Infant Loss",
"you": {
"id": "ok-g-pregnancy-loss-you",
"guide": "pregnancy-loss",
"side": "you",
"title": "Pregnancy or Infant Loss",
"sideName": "For You",
"mins": 4,
"sources": [
"doka"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Pregnancy or Infant Loss",
"sub": "For You",
"say": "If you have lost a pregnancy or a baby, this is for you. However early or late, however long ago, your grief belongs here."
},
{
"k": "big",
"h": "This was a real loss.",
"sub": "A real child. A hoped-for future.",
"say": "This was a real loss. A real child, and a whole future you had already started to picture. Your grief is as big as your love, and it deserves room."
},
{
"k": "points",
"h": "What you may be carrying",
"items": [
[
"Empty arms",
"A body that may still feel pregnant"
],
[
"Guilt",
"Searching for what you did wrong"
],
[
"Jealousy",
"Other people's babies can sting"
],
[
"Loneliness",
"Grief others don't seem to see"
]
],
"say": "You may be carrying a lot at once. Empty arms, and a body that may still feel pregnant. Guilt, and a mind that keeps searching for what you did wrong. Jealousy when you see other people's babies. And loneliness, when the people around you don't seem to see how big this is. All of it is grief."
},
{
"k": "big",
"h": "This was not my fault.",
"sub": "Say it softly, in your own voice.",
"say": "Here is something worth saying out loud, even if you don't believe it yet. This was not my fault. Try it now, softly, in your own voice. Say it once more, and let it rest there.",
"beats": [
"Here is something worth saying out loud, even if you don't believe it yet.",
"This was not my fault.",
"Try it now, softly, in your own voice.",
{
"t": "Say it once more, and let it rest there.",
"w": 10
}
]
},
{
"k": "points",
"h": "Your body is healing too",
"items": [
[
"Rest",
"As much as you can"
],
[
"See your doctor or midwife",
"Bring every question"
],
[
"Sleep when it comes",
"Grief is tiring work"
]
],
"say": "Your body may still be healing while your heart is breaking. Rest as much as you can. Follow up with your doctor or midwife, and bring every question, even the ones that feel small. And let yourself sleep when it comes. Grief is tiring work."
},
{
"k": "points",
"h": "Ways to honor your baby",
"items": [
[
"A name",
"If you want one"
],
[
"Keepsakes",
"Photos, footprints, a blanket"
],
[
"A small ritual",
"A candle, a tree, a letter"
],
[
"The hard dates",
"The due date, the anniversary"
]
],
"say": "Many parents find it helps to honor their baby in a way that fits them. Giving a name, if you want to. Keeping what you have: photos, footprints, a blanket. A small ritual, like lighting a candle or planting something. And marking the due date and the anniversary, which often arrive heavier than people expect. If you have a faith, many traditions have blessings or naming rituals, and a faith leader can help you create one."
},
{
"k": "card",
"title": "Partners grieve too, sometimes differently.",
"body": "One may want to talk. One may want to stay busy. Both are grief.",
"say": "If you have a partner, they are grieving too, sometimes differently. One of you may want to talk about it. The other may want to stay busy, or go back to work. Both are grief. Try asking each other, what is the hardest part for you today?"
},
{
"k": "words",
"h": "Words for the people around you",
"items": [
"We lost the baby.",
"We'd love your support.",
"It helps when people acknowledge it."
],
"say": "People often go quiet because they don't know what to say. You can help them. Try this. We lost the baby. We'd love your support, and it helps when people acknowledge it. You can also ask for privacy. Both are okay."
},
{
"k": "card",
"title": "If the sadness stays heavy",
"body": "Postpartum Support International: 1-800-944-4773. Any thoughts of harming yourself: call or text 988. Danger right now: 911.",
"say": "If deep sadness lingers, or the days stay heavy for weeks, Postpartum Support International has a helpline at 1-800-944-4773. If you have any thoughts of harming yourself, call or text 988, any hour. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your grief is as big as your love.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your grief is as big as your love. Let it be that big. Be gentle with yourself today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-pregnancy-loss-helper",
"guide": "pregnancy-loss",
"side": "helper",
"title": "Pregnancy or Infant Loss",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"doka"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Pregnancy or Infant Loss",
"sub": "For the Helper",
"say": "When someone you love has lost a pregnancy or a baby, it can be hard to know what to say. This is for anyone walking beside them."
},
{
"k": "big",
"h": "Their grief is real, even when it's quiet.",
"say": "Their grief may be invisible to most of the people around them. Few people met the baby, and the world moves on fast. They may be hurt by silence. You don't need perfect words. Your part is to notice, and to say so."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry about your baby.",
"Would you like to tell me about them?",
"Their name, if they gave one"
],
"say": "Here are words that help. I'm so sorry about your baby. Would you like to tell me about them? And if they gave their baby a name, use it."
},
{
"k": "words",
"h": "Words that hurt",
"items": [
"At least it was early.",
"You can try again.",
"Everything happens for a reason."
],
"say": "And words that hurt, even when they're meant kindly. At least it was early makes the loss smaller than it is. You can try again treats this baby as replaceable. Everything happens for a reason asks them to make sense of something that may never make sense. Skip the at least. Just be sorry with them."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Meals and errands",
"Offer something specific"
],
[
"The due date",
"Put it on your calendar"
],
[
"Both parents",
"Partners grieve too"
],
[
"Keep showing up",
"Weeks and months later"
]
],
"say": "What helps most is often practical. Bring meals and handle errands. Offer something specific instead of asking what they need. Remember the due date, and reach out that day. Remember both parents, because partners grieve too, sometimes differently. And keep showing up, weeks and months later, when everyone else has gone quiet."
},
{
"k": "big",
"h": "Put the date where you'll see it.",
"say": "Take a moment right now. If you know their due date, or the day they lost their baby, put it in your calendar. Picture the short note you could send them that day.",
"beats": [
"Take a moment right now.",
"If you know their due date, or the day they lost their baby, put it in your calendar.",
{
"t": "Picture the short note you could send them that day.",
"w": 10
}
]
},
{
"k": "card",
"title": "If you are expecting too",
"body": "Be gentle. Let them set the distance, and keep the door open.",
"say": "Be gentle if you are also expecting or have small children. Your news may be hard for them to be near right now, and that's not about you. Let them set the distance, and keep the door open. A simple note can say, I love you, and there's no need to answer."
},
{
"k": "card",
"title": "If you're worried about them",
"body": "Deep sadness that lingers: their doctor. Any thoughts of harming themselves: call or text 988. Danger right now: 911.",
"say": "Watch gently over the weeks. If deep sadness lingers, encourage them to talk with their doctor. Postpartum Support International has a helpline too. If they mention any thoughts of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Remember with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "This can stir your own losses, too. Be gentle with your own heart, and lean on someone you trust. Then keep remembering with them. That is the gift. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "suicide-loss",
"ring": "loss",
"title": "After a Suicide Loss",
"you": {
"id": "ok-g-suicide-loss-you",
"guide": "suicide-loss",
"side": "you",
"title": "After a Suicide Loss",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Suicide Loss",
"sub": "For You",
"say": "If someone you love has died by suicide, this is for you. Whatever you are feeling right now, you belong here."
},
{
"k": "big",
"h": "It was not your fault.",
"sub": "Suicide comes from a complex illness, not one thing anyone said or did.",
"say": "Let's start with the most important thing. It was not your fault. Suicide comes from a complex illness, not one thing anyone said or did. Your mind may argue with that for a long time. It is still true."
},
{
"k": "points",
"h": "What this grief can hold",
"items": [
[
"Shock",
"It doesn't feel real"
],
[
"Why",
"Questions that circle all night"
],
[
"Guilt",
"Replaying the last conversation"
],
[
"Anger",
"Then guilt for the anger"
]
],
"say": "Suicide grief often holds a lot at once. Shock, so it doesn't feel real. Why questions that circle all night. Guilt, replaying the last conversation and searching for what you missed. And anger at them, then guilt for the anger. All of this is grief. None of it means you loved them less."
},
{
"k": "big",
"h": "Some whys have no full answer.",
"say": "The why questions are some of the hardest. Often there is no single answer, because there was no single cause. You can keep asking, and you can also let yourself rest from asking. Both are allowed."
},
{
"k": "big",
"h": "I could not have controlled their illness.",
"sub": "Out loud, or in your heart.",
"say": "Here is a line you can say to yourself, even before you believe it. I could not have controlled their illness. Say it now, out loud or in your heart. Then, if it fits, add this one: it's okay to be angry and still love them.",
"beats": [
"Here is a line you can say to yourself, even before you believe it.",
"I could not have controlled their illness.",
"Say it now, out loud or in your heart.",
{
"t": "Then, if it fits, add this one: it's okay to be angry and still love them.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Honest words",
"They died by suicide."
],
[
"A survivors group",
"People who understand"
],
[
"A counselor",
"Experienced in suicide loss"
],
[
"Their whole life",
"Not only the end"
]
],
"say": "Here is what many survivors find helps. Honest words. Saying they died by suicide can ease the shame that silence tends to deepen. A suicide loss survivors group, with people who truly understand. A counselor experienced in suicide loss. And remembering their whole life, not only the end."
},
{
"k": "words",
"h": "If you want words for others",
"items": [
"My brother died by suicide.",
"I'd like to be able to talk about him openly."
],
"say": "People often go quiet because they don't know what to say. You can open the door for them. My brother died by suicide. I'd like to be able to talk about him openly. Use your own words, and their name."
},
{
"k": "card",
"title": "If your faith brings fear",
"body": "Many traditions today speak of mercy. A trusted faith leader can help.",
"say": "If your faith brings fear about what this death means, you are not alone. Many traditions today speak of mercy, and understand suicide as the result of illness. A trusted faith leader can sit with that question with you."
},
{
"k": "card",
"title": "Your safety matters too.",
"body": "Thoughts of suicide: call or text 988, any hour. Danger right now: 911.",
"say": "Grief after a suicide can raise your own risk, so please take good care of yourself and reach out. Tell your doctor what happened. Let others help with the tasks. If you have any thoughts of suicide, call or text 988, any hour. If you are in danger right now, call 911. Reaching out is strength."
},
{
"k": "big",
"h": "You can grieve them and love them.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can grieve them, be angry with them, and love them, all at once. Let others walk with you, one day at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-suicide-loss-helper",
"guide": "suicide-loss",
"side": "helper",
"title": "After a Suicide Loss",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Suicide Loss",
"sub": "For the Helper",
"say": "When someone you care about has lost a person to suicide, it can be hard to know what to say. This is for anyone walking beside them."
},
{
"k": "big",
"h": "Many survivors say the silence hurts most.",
"say": "Many survivors say the silence hurts most. People avoid them, or avoid the name, because they don't know what to say. You don't need perfect words. Your part is to show up, and stay."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry. I'd love to hear about him.",
"You can talk to me about it anytime.",
"Their name, often"
],
"say": "Here are words that help. I'm so sorry. I'd love to hear about him, or her. You can talk to me about it anytime. And say their name. It tells your friend the person still matters."
},
{
"k": "points",
"h": "What to leave unsaid",
"items": [
[
"Questions about how",
"Let them share what they choose"
],
[
"Didn't you see signs?",
"It feeds the guilt"
],
[
"Committed",
"Say died by suicide"
],
[
"At least they're at peace",
"It can sound like suicide solved something"
]
],
"say": "Some things are better left unsaid. Questions about how they died. Let them share only what they choose. Didn't you see signs? It feeds a guilt they already carry. The word committed, which sounds like a crime. Say died by suicide instead. And at least they're at peace now. It can sound as if suicide solved something."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Check in often",
"Especially the first year"
],
[
"Remember hard dates",
"Birthdays, holidays, the anniversary"
],
[
"Practical help",
"Meals, calls, paperwork"
],
[
"Their whole life",
"Not only the end"
]
],
"say": "What helps is steady and practical. Check in often, especially in the first year, long after others have stopped. Remember the hard dates: birthdays, holidays, and the anniversary. Help with meals, calls, and paperwork. And talk about their whole life, not only the end."
},
{
"k": "card",
"title": "If you're worried, ask directly.",
"body": "\"Are you having thoughts of suicide?\" If yes: call or text 988 together. Danger right now: 911.",
"say": "Grief after a suicide can raise a survivor's own risk. Watch for signs of risk, and if you're worried, ask directly and kindly. Are you having thoughts of suicide? A plain question shows them they can tell you the truth. If the answer is yes, call or text 988 together. If they are in danger right now, call 911."
},
{
"k": "big",
"h": "Picture your next message.",
"say": "Take a moment. Think of the person you are walking beside. Picture the message you could send them this week, with their loved one's name in it.",
"beats": [
"Take a moment.",
"Think of the person you are walking beside.",
{
"t": "Picture the message you could send them this week, with their loved one's name in it.",
"w": 10
}
]
},
{
"k": "card",
"title": "This can stir your own fears.",
"body": "Get support if you need it. 988 is there for you too.",
"say": "This grief can stir your own fears, and your own losses. Get support if you need it, from a friend, a counselor, or a group of your own. And 988 is there for you too, anytime, call or text."
},
{
"k": "big",
"h": "Show up. Say their name. Stay.",
"sub": "The full guide has more, whenever you want it.",
"say": "Show up, say their name, and stay. That steady presence means more than any words. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "dying-loved",
"ring": "loss",
"title": "Someone You Love Is Dying",
"you": {
"id": "ok-g-dying-loved-you",
"guide": "dying-loved",
"side": "you",
"title": "Someone You Love Is Dying",
"sideName": "For You",
"mins": 4,
"sources": [
"byock4",
"blundon"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Someone You Love Is Dying",
"sub": "For You",
"say": "If someone you love is dying, this is for you. Whether you are at the bedside every day or far away, you belong here."
},
{
"k": "big",
"h": "Grief can begin before the death.",
"sub": "It has a name: anticipatory grief.",
"say": "Grief often begins before the death. It even has a name: anticipatory grief. You may find yourself grieving someone who is still here. That isn't giving up. It's love, already feeling the loss."
},
{
"k": "points",
"h": "What you may be feeling",
"items": [
[
"Exhausted",
"Running on little sleep"
],
[
"Torn",
"Between hoping and preparing"
],
[
"Guilty",
"For wishing it were over"
],
[
"Afraid",
"Of the moment itself"
]
],
"say": "You may feel exhausted. Torn between hoping and preparing. Guilty for wishing it were over, which many people in your place feel at some point. And afraid of the moment itself. All of it belongs to loving someone at the end."
},
{
"k": "words",
"h": "Say what matters while you can",
"items": [
"Thank you.",
"I'm sorry.",
"I forgive you.",
"I love you.",
"Goodbye."
],
"say": "Say what matters while you can. Thank you. I'm sorry. I forgive you. I love you. And, when it's time, goodbye. You don't need perfect words. Even one of these, said plainly, can mean everything."
},
{
"k": "big",
"h": "What do you want them to hear?",
"say": "Take a moment. Picture the person you love. Which of those words do you most want them to hear from you?",
"beats": [
"Take a moment.",
"Picture the person you love.",
{
"t": "Which of those words do you most want them to hear from you?",
"w": 12
}
]
},
{
"k": "big",
"h": "Keep talking to them.",
"sub": "Hearing may continue near the end.",
"say": "Even when they can no longer answer, keep talking to them. Research suggests hearing may continue near the end of life, even after other responses fade. Tell them who is in the room. Tell them a story. Hold their hand, if that feels right."
},
{
"k": "points",
"h": "A few things that help",
"items": [
[
"Ask what to expect",
"The hospice team can tell you"
],
[
"Take shifts",
"So you can sleep"
],
[
"Bring familiar things",
"Music, photos, scents"
],
[
"Step out for air",
"You are allowed"
]
],
"say": "A few things help. Ask the hospice team what to expect in the coming days, so less catches you off guard. Take shifts with family so you can sleep. Bring familiar things: their music, photos, a favorite scent. And let yourself step out for air. Sometimes a person dies in the minutes when family has stepped away. If that happens, it is not a failure of love."
},
{
"k": "card",
"title": "The hospice team is there for you too.",
"body": "Chaplains, social workers, and volunteers. Ask for them.",
"say": "Hospice teams support the whole family, including you. Chaplains, social workers, and volunteers are there for you, not only for the person in the bed. Ask for them. If you have a faith, blessings, prayers, sacred words, or familiar songs can mean a great deal now, and a chaplain or your own faith leader can help."
},
{
"k": "big",
"h": "Being here is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can't do this perfectly. Nobody can. You can grieve and hope at the same time. Being here is enough. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-dying-loved-helper",
"guide": "dying-loved",
"side": "helper",
"title": "Someone You Love Is Dying",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Someone You Love Is Dying",
"sub": "For the Helper",
"say": "When someone you care about has a loved one who is dying, it can be hard to know how to help. This is for anyone walking beside them."
},
{
"k": "big",
"h": "They may not know what they need.",
"say": "The family may be running on no sleep and fear. They may not know what they need, and deciding one more thing can be too much. So offer something specific."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm thinking of you and your family.",
"I can sit with him for two hours so you can rest.",
"I'm bringing dinner Tuesday. Is that okay?"
],
"say": "Here are words that help. I'm thinking of you and your family. I can sit with him for two hours so you can rest. I'm bringing dinner Tuesday. Is that okay? A specific offer is easier to say yes to."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Stories about other deaths",
"Let this one be theirs"
],
[
"Pushing hope or cures",
"They may have let those go"
],
[
"How they should feel",
"Every family is different"
]
],
"say": "Some things are better left out. Stories about other deaths, even kind ones. Let this one be theirs. Pushing hope or cures they've let go of. And telling them how they should feel. Every family does this differently."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Food and errands",
"Without being asked"
],
[
"Pets and kids",
"A walk, a ride, an afternoon"
],
[
"Company at the bedside",
"So they can rest"
],
[
"After, too",
"The weeks after the funeral"
]
],
"say": "What helps is often practical. Bring food and handle errands. Look after pets and kids. Offer a few hours of company at the bedside, so they can sleep or step out. And keep showing up after the death, in the weeks when everyone else has gone home."
},
{
"k": "story",
"title": "Letting Go. Mike's Story",
"lines": [
"Mike was forty-six, with a son of fifteen and a daughter of thirteen.",
"His ex-wife, Sarah, brought in his phone, and we recorded messages for the kids.",
"\"I'm not abandoning you. I'm counting on you to carry the best parts of me forward.\""
],
"lesson": "Sometimes helping means bringing the phone.",
"note": "Names and details changed",
"hold": 2,
"say": "Mike was forty-six, a dad with a son of fifteen and a daughter of thirteen. His ex-wife, Sarah, brought in his phone, and we recorded messages for the kids: stories from the crane cabs, advice on bullies and heartbreak. He dictated letters for driver's license day, prom, and graduation. Then he told his kids, I'm not abandoning you. I'm counting on you to carry the best parts of me forward."
},
{
"k": "big",
"h": "What could you offer this week?",
"say": "Take a moment. Think of the family you are walking beside. What is one specific thing you could offer them this week?",
"beats": [
"Take a moment.",
"Think of the family you are walking beside.",
{
"t": "What is one specific thing you could offer them this week?",
"w": 10
}
]
},
{
"k": "card",
"title": "Being near a death is tender.",
"body": "Notice what it stirs in you, and talk with someone you trust.",
"say": "Being near a death is tender, even from the edges. It can stir your own losses, or your fears about the people you love. Notice what it stirs in you, and talk with someone you trust. You can keep showing up longer when you rest too."
},
{
"k": "big",
"h": "Show up. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need to fix anything. Show up, stay close, and keep coming back. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "ambiguous-loss",
"ring": "loss",
"title": "Ambiguous Loss",
"you": {
"id": "ok-g-ambiguous-loss-you",
"guide": "ambiguous-loss",
"side": "you",
"title": "Ambiguous Loss",
"sideName": "For You",
"mins": 4,
"sources": [
"boss"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Ambiguous Loss",
"sub": "For You",
"say": "If you are grieving someone who is still here, this is for you. Maybe dementia has changed them, or addiction, or distance, or you don't know where they are. Your grief is real."
},
{
"k": "big",
"h": "Here, and gone in ways that matter.",
"sub": "Grief without a clear ending.",
"say": "This kind of loss has a name: ambiguous loss. The person is here, and they are gone in ways that matter. Or they are gone, and you can't be sure of anything. There is no funeral and no clear ending. That is why it can feel so confusing."
},
{
"k": "points",
"h": "It can look like",
"items": [
[
"A parent with dementia",
"Here in body, changing in mind"
],
[
"A child in addiction",
"Loved, and hard to reach"
],
[
"Someone who cut ties",
"Alive, and out of reach"
],
[
"Someone missing",
"No answers yet"
]
],
"say": "It can look like a parent with dementia, here in body and changing in mind. A son or daughter in addiction, loved and hard to reach. A family member who has cut ties. Or someone missing, with no answers yet. Each one is a real loss."
},
{
"k": "big",
"h": "Stuck is not failing.",
"sub": "The loss itself is unclear.",
"say": "Many people feel stuck, and blame themselves for it. The stuckness comes from the loss, not from you. When a loss has no clear edges, grief doesn't know where to go. Others may not understand why you are so sad. Your grief makes sense, even without a funeral."
},
{
"k": "words",
"h": "Both are true.",
"items": [
"She is still my mom, and I have lost her.",
"He is my son, and I miss who he was.",
"I can hope, and I can grieve."
],
"sub": "And, not but.",
"say": "Here is a way of thinking that helps. Hold two truths at once, joined by the word and. She is still my mom, and I have lost her. He is my son, and I miss who he was. Now make your own and sentence, and say it quietly.",
"beats": [
"Here is a way of thinking that helps.",
"Hold two truths at once, joined by the word and.",
"She is still my mom, and I have lost her.",
"He is my son, and I miss who he was.",
{
"t": "Now make your own and sentence, and say it quietly.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Name it as grief",
"Out loud, to someone you trust"
],
[
"Find people who understand",
"A group, or a counselor who knows it"
],
[
"Mark what has changed",
"A small ritual counts"
],
[
"Choose healthy connection",
"For now, not forever"
]
],
"say": "A few things help. Name it as grief, out loud, to someone you trust. Find people who understand this kind of loss, a support group or a counselor who knows it. Mark what has changed with a small ritual: a candle, a letter, a walk to a place you shared. And decide what kind of connection is healthy for you right now. That can change later."
},
{
"k": "card",
"title": "Meaning without closure",
"body": "You can build a good life while some questions stay open.",
"say": "You may be waiting for closure. With this kind of loss, closure may not come. You can still find meaning. Ask yourself what this person gave you that you still carry, and what you want your life to hold now. You can build a good life while some questions stay open."
},
{
"k": "card",
"title": "If it gets heavy",
"body": "Grief with depression or burnout: a counselor or your doctor. Thoughts of ending your life: call or text 988. Danger right now: 911.",
"say": "If grief is mixing with depression or burnout, talk with a counselor or your doctor. If you have thoughts of ending your life, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Your grief makes sense.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your grief makes sense, even without a funeral. Be patient with yourself. This kind of loss can last a long time, and so can your love. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-ambiguous-loss-helper",
"guide": "ambiguous-loss",
"side": "helper",
"title": "Ambiguous Loss",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"boss"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Ambiguous Loss",
"sub": "For the Helper",
"say": "When someone you love is grieving a person who is still alive, this is for you. A parent with dementia, a child in addiction, a family member who cut ties. Their grief is real, and they may feel invisible in it."
},
{
"k": "big",
"h": "No funeral. Still a loss.",
"sub": "People forget to ask.",
"say": "With this kind of loss, there is no funeral and no sympathy card. People forget to ask. So the person you love may be carrying it mostly alone. Your part is to notice, and to stay."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That sounds like a real loss.",
"You don't have to have it resolved.",
"How is it with your mom these days?"
],
"say": "Here are words that help. That sounds like a real loss. You don't have to have it resolved. And a simple question, asked again in a few weeks: how is it with your mom these days?"
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"At least they are still alive.",
"Just move on.",
"Quick advice"
],
"say": "Some words close the door, even when they are meant kindly. At least they are still alive makes the grief sound wrong. Just move on asks for an ending that hasn't come. And quick advice can leave them feeling unheard. Listening first goes further."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Check in regularly",
"Without needing updates"
],
[
"Remember the hard dates",
"Birthdays, the day of a diagnosis"
],
[
"Respect their choices",
"About contact and distance"
],
[
"Offer a real hour",
"A walk, a meal, a visit"
]
],
"say": "Check in regularly, without needing updates. They may not have news, and that is okay. Remember the hard dates, a birthday, the day of a diagnosis. Respect their choices about contact and distance, even ones you would make differently. And offer a real hour: a walk, a meal, or company on a visit."
},
{
"k": "big",
"h": "Who do you know carrying this?",
"sub": "A few words can reach them.",
"say": "Take a moment. Think of one person you know who is grieving someone still living. Picture the short message you could send them today.",
"beats": [
"Take a moment.",
"Think of one person you know who is grieving someone still living.",
{
"t": "Picture the short message you could send them today.",
"w": 12
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"You can't fix it",
"Company is the gift"
],
[
"It may last years",
"Patience is a kindness"
],
[
"Notice what it stirs",
"Your own losses may wake"
]
],
"say": "Stay steady by remembering a few things. You can't fix this, and you don't need to. Company is the gift. This kind of grief can last years, so patience is a kindness. And notice what it stirs in you. Your own losses may wake up. Talk with someone you trust, too."
},
{
"k": "card",
"title": "If you are worried",
"body": "Talk of not wanting to live: call or text 988. Danger right now: 911. Harm to a vulnerable adult in Minnesota: MAARC, 1-844-880-1574.",
"say": "If you notice deep depression, or hear talk of not wanting to live, call or text 988, together if you can. If anyone is in danger right now, call 911. And if you think a vulnerable adult in Minnesota is being harmed or taken advantage of, you can call MAARC at 1 844 880 1574."
},
{
"k": "big",
"h": "Be patient. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be patient, and stay close. You don't need the right words. You only need to keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "grief-days",
"ring": "loss",
"title": "Holidays and Anniversaries After a Loss",
"you": {
"id": "ok-g-grief-days-you",
"guide": "grief-days",
"side": "you",
"title": "Holidays and Anniversaries After a Loss",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Holidays and Anniversaries After a Loss",
"sub": "For You",
"say": "If a hard date is coming, a birthday, an anniversary, a holiday, or a first without them, this is for you. You can plan for it, and you can be gentle with yourself."
},
{
"k": "big",
"h": "The days before are often harder.",
"sub": "Dread is common.",
"say": "Many people find the days before are harder than the day itself. The dread builds as the date comes closer. Then the day arrives, and it may be hard, or quieter than you feared. Either way is okay."
},
{
"k": "points",
"h": "Hard days come in many shapes",
"items": [
[
"Firsts",
"The first birthday, the first holiday"
],
[
"The date they died",
"It comes back every year"
],
[
"Birthdays",
"Theirs, and yours without them"
],
[
"Unexpected days",
"A song, a season, a smell"
]
],
"say": "Hard days come in many shapes. Firsts, like the first birthday or the first holiday without them. The date they died, which comes back every year. Their birthday, and yours. And unexpected days, when a song or a season or a smell brings it all back."
},
{
"k": "flow",
"h": "Make a plan, and a backup",
"steps": [
[
"Decide ahead",
"How you want to spend it"
],
[
"Tell a few people",
"So you aren't alone with it"
],
[
"Have a backup",
"An easy way out if it gets hard"
],
[
"Plan the day after",
"Something gentle"
]
],
"say": "It helps to make a plan, and a backup plan. Decide ahead of time how you want to spend the day. Tell a few people it's coming, so you aren't alone with it. Have a backup, an easy way to leave early or change course. And plan something gentle for the day after."
},
{
"k": "points",
"h": "Keep, change, add",
"items": [
[
"Keep some traditions",
"The ones that still feel right"
],
[
"Change others",
"It's okay to do it differently"
],
[
"Add one for them",
"A candle, their recipe, their name"
]
],
"say": "With traditions, think keep, change, and add. Keep the ones that still feel right. Change others. It's okay to do it differently this year. And add one that honors your person: a candle, their favorite recipe, their name said out loud at the table."
},
{
"k": "words",
"h": "Say their name",
"items": [
"Today I remember you.",
"I miss you, and I carry you with me."
],
"sub": "Out loud or in your heart.",
"say": "Let's try one now. Saying their name out loud is a small, strong way to remember. Say their name, and then one thing you remember about them. Take your time.",
"beats": [
"Let's try one now.",
"Saying their name out loud is a small, strong way to remember.",
"Say their name, and then one thing you remember about them.",
{
"t": "Take your time.",
"w": 12
}
]
},
{
"k": "big",
"h": "Joy and grief can sit at the same table.",
"sub": "It's okay if this is hard. It's okay if it isn't.",
"say": "If laughter comes on a hard day, let it. Joy and grief can sit at the same table. It's okay if this is hard. It's okay if it isn't. Neither one measures your love."
},
{
"k": "card",
"title": "If it gets heavier",
"body": "Grief that grows heavier each year: a grief counselor or your doctor. Thoughts of ending your life: call or text 988. Danger right now: 911.",
"say": "If grief seems to get heavier each year instead of softer, talk with a grief counselor or your doctor. You deserve that support. If you have thoughts of ending your life, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Be gentle with yourself on the hard days.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be gentle with yourself on the hard days, and the days around them. Your love is still here. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-grief-days-helper",
"guide": "grief-days",
"side": "helper",
"title": "Holidays and Anniversaries After a Loss",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Holidays and Anniversaries After a Loss",
"sub": "For the Helper",
"say": "When someone you love has a hard date coming after a loss, an anniversary, a birthday, a holiday, this is for you. A small act of remembering can mean more than you know."
},
{
"k": "big",
"h": "They notice who remembers.",
"sub": "Fewer people remember as time goes on.",
"say": "People who are grieving often notice who remembers the date, and who doesn't. As time passes, fewer people remember. A short note on the right day tells them their person isn't forgotten."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm thinking of you today.",
"I'm remembering your dad today.",
"What was he like on this day?"
],
"say": "Here are words that help. I'm thinking of you today. I'm remembering your dad today. Use their person's name if you can. And if they want to talk, ask, what was he like on this day? Then listen."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A note on the day",
"A text, a card, or flowers"
],
[
"A low-key invitation",
"Lunch, a walk, a quiet evening"
],
[
"Say their person's name",
"Most are glad to hear it"
],
[
"Let them choose",
"Join in, or skip it"
]
],
"say": "A note on the day helps, by text, card, or flowers. So does a low-key invitation, like lunch or a walk. Say their person's name. Most grieving people are glad to hear it. And let them choose. They may want to join the gathering, or skip it this year. Either is okay."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Acting like the date is ordinary",
"It has been a year already.",
"They would want you to be happy."
],
"say": "Some things close the door. Acting like the date is ordinary can feel like forgetting. It has been a year already, suggests a timeline grief doesn't follow. And they would want you to be happy, can feel like pressure. Simple remembering goes further."
},
{
"k": "big",
"h": "Put the date in your calendar.",
"sub": "For years.",
"say": "Here is one thing you can do right now. Think of someone who lost a person they love. Open your calendar, and add the date that will be hard for them, with a reminder.",
"beats": [
"Here is one thing you can do right now.",
"Think of someone who lost a person they love.",
{
"t": "Open your calendar, and add the date that will be hard for them, with a reminder.",
"w": 12
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"You can't fix the day",
"Being there is enough"
],
[
"Tears are okay",
"You gave them a safe place"
],
[
"Notice your own grief",
"Hard dates may stir it"
]
],
"say": "Stay steady with a few reminders. You can't fix the day, and you don't need to. Being there is enough. If they cry when you mention their person, you didn't cause the pain. You gave it a safe place to land. And notice your own grief. Hard dates may stir your losses too."
},
{
"k": "card",
"title": "If you are worried",
"body": "Grief that grows heavier each year: a grief counselor or their doctor. Talk of not wanting to live: call or text 988. Danger right now: 911.",
"say": "If their grief seems to grow heavier each year, gently encourage a grief counselor or their doctor. If you hear talk of not wanting to live, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Remember with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Remember with them, on the day and for years after. Put the date in your calendar, for years. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pet-death",
"ring": "loss",
"title": "Your Pet Died",
"you": {
"id": "ok-g-pet-death-you",
"guide": "pet-death",
"side": "you",
"title": "Your Pet Died",
"sideName": "For You",
"mins": 4,
"sources": [
"doka"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Pet Died",
"sub": "For You",
"say": "If your pet has died, a dog, a cat, a horse, any animal who shared your days, this is for you. Your grief is real grief."
},
{
"k": "big",
"h": "You lost a daily companion.",
"sub": "The bond was real. So is the grief.",
"say": "You lost a daily companion. Someone who greeted you, followed you from room to room, and knew your routines better than most people do. The bond was real, and so is the grief."
},
{
"k": "points",
"h": "Grief for a pet can look like",
"items": [
[
"Listening for their steps",
"At the door, on the stairs"
],
[
"Empty routines",
"Walks, meals, bedtime"
],
[
"Guilt over decisions",
"Too soon? Too late?"
],
[
"Embarrassment",
"At how deep it goes"
]
],
"say": "It can look like listening for their steps at the door. Reaching for the leash, or the food bowl, at the usual time. Guilt over decisions: did I wait too long, or not long enough? And embarrassment at how deep it goes. All of this is common."
},
{
"k": "big",
"h": "Choosing a peaceful death is an act of love.",
"sub": "Even when it feels unbearable.",
"say": "If you chose euthanasia, you may be carrying that choice. Deciding to end their suffering is an act of love, even when it feels unbearable. You took on the hardest part so they wouldn't have to hurt."
},
{
"k": "big",
"h": "Not everyone will understand.",
"sub": "Your grief still counts.",
"say": "Some people may not understand how much this hurts. When others don't recognize a grief, it can feel lonely, even a little embarrassing. Your grief still counts. Find the people who knew your pet, or who have loved an animal the same way."
},
{
"k": "words",
"h": "Say their name",
"items": [
"My grief shows how much I loved them."
],
"sub": "Out loud or quietly.",
"say": "Let's take a moment for them. Say your pet's name, out loud or quietly. Then say one thing you'll always remember about them.",
"beats": [
"Let's take a moment for them.",
"Say your pet's name, out loud or quietly.",
{
"t": "Then say one thing you'll always remember about them.",
"w": 12
}
]
},
{
"k": "points",
"h": "Ways to mark the loss",
"items": [
[
"Keep something close",
"A collar, a photo, a tag"
],
[
"Make a memorial",
"A photo album, a planted tree"
],
[
"Write to them",
"A letter, or your favorite days"
],
[
"Find a support group",
"People who understand"
]
],
"say": "Marking the loss can help. Keep something close, a collar, a photo, a tag. Make a small memorial, a photo album or a tree you plant. Write to them, a letter or a list of your favorite days together. And pet loss support groups, in person, by phone, or online, are full of people who understand."
},
{
"k": "big",
"h": "Be gentle with the empty routines.",
"sub": "Walk the old route, or a new one.",
"say": "Be gentle with the empty routines. The quiet morning, the time you used to walk. Some people keep the walk, and some find a new one. Either is fine. There is no deadline for deciding about another pet. If grief keeps you from daily life for weeks, talk with a counselor or your doctor. If you have thoughts of ending your life, call or text 988."
},
{
"k": "big",
"h": "Your grief shows how much you loved them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your grief shows how much you loved them. Let it be as big as it is. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-pet-death-helper",
"guide": "pet-death",
"side": "helper",
"title": "Your Pet Died",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"doka",
"dougy"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Your Pet Died",
"sub": "For the Helper",
"say": "When someone you know has lost a pet, this is for you. A few kind words can mean a great deal, because many people don't say anything at all."
},
{
"k": "big",
"h": "It was a real loss.",
"sub": "They lost a daily companion.",
"say": "They lost a daily companion, part of every morning and every evening. They may feel embarrassed at how deep the grief goes. Your kindness tells them it makes sense."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry. He was such a good dog.",
"What was she like?",
"I remember how he greeted me at the door."
],
"say": "Here are words that help. I'm so sorry. He was such a good dog. Use the pet's name if you know it. Ask, what was she like? Or share a memory of your own: I remember how he greeted me at the door."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"It was just a dog.",
"Get another one.",
"At least it wasn't a person."
],
"say": "Some words close the door. It was just a dog tells them their love doesn't count. Get another one suggests the bond can be replaced. And at least it wasn't a person compares a grief that doesn't need comparing."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Send a card",
"Or a text with the pet's name"
],
[
"Share a photo or memory",
"It shows you saw the bond"
],
[
"Remember later",
"A note a month on"
],
[
"Be gentle about decisions",
"Euthanasia guilt is common"
]
],
"say": "Send a card, or a text that uses the pet's name. Share a photo or a memory, which shows you saw the bond. Send a note a month later, when most people have forgotten. And be gentle about decisions. If they chose euthanasia, they may feel guilty. You can say, you chose to end their pain. That was love."
},
{
"k": "card",
"title": "Children and pets",
"body": "Use real words: died, not put to sleep. Let them help say goodbye.",
"say": "If there are children in the family, a pet's death may be their first loss. Encourage the grown-ups to use real words, like died, rather than put to sleep, which can confuse a child. Let children help say goodbye, with a drawing, a story, or a place in the yard."
},
{
"k": "big",
"h": "Who do you know?",
"sub": "A few words go a long way.",
"say": "Take a moment. Think of someone you know whose pet has died, lately or long ago. Picture the short message you could send them, with the pet's name in it.",
"beats": [
"Take a moment.",
"Think of someone you know whose pet has died, lately or long ago.",
{
"t": "Picture the short message you could send them, with the pet's name in it.",
"w": 12
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"You don't need to understand",
"Kindness is enough"
],
[
"Let them talk",
"Stories keep the bond close"
],
[
"Notice your own losses",
"Old pets may come to mind"
]
],
"say": "A few reminders keep you steady. You don't need to fully understand their bond to honor it. Kindness is enough. Let them talk and tell stories. And notice your own losses. Old pets may come to mind, and that is okay. If their grief keeps them from daily life for weeks, encourage a counselor. If you hear talk of not wanting to live, call or text 988 together."
},
{
"k": "big",
"h": "Simple kindness goes a long way.",
"sub": "The full guide has more, whenever you want it.",
"say": "Simple kindness goes a long way here. Say the name, share a memory, and remember them later. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "diagnosis",
"ring": "health",
"title": "A Hard Diagnosis",
"you": {
"id": "ok-g-diagnosis-you",
"guide": "diagnosis",
"side": "you",
"title": "A Hard Diagnosis",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Hard Diagnosis",
"sub": "For You",
"say": "If you've just had hard news about your health, this is for you. You don't have to take it all in at once. Go at your own pace."
},
{
"k": "big",
"h": "The first days are a blur.",
"sub": "You don't have to decide everything at once.",
"say": "The first days after hard news can feel like a blur. You may hear one word and lose everything that came after it. That is how a mind handles shock. You don't have to decide everything at once. Many decisions can wait a day while you catch your breath."
},
{
"k": "words",
"h": "All of it is normal",
"items": [
"Shock",
"Fear",
"Disbelief",
"A strange calm"
],
"say": "You may feel shock, fear, or disbelief. Some people feel a strange calm. Your mind may race through worst cases at night, or go completely blank. All of it is normal. None of it means you're doing this wrong."
},
{
"k": "points",
"h": "Before your next appointment",
"items": [
[
"Write your questions",
"Before you walk in"
],
[
"Bring someone",
"A second set of ears"
],
[
"Write things down",
"Or have your person do it"
],
[
"Ask what words mean",
"Until it makes sense to you"
]
],
"say": "Before your next appointment, write your questions down. Bring a trusted person to listen with you, a second set of ears. Write things down, or let your person do it. And ask what a word means, as many times as you need, until it makes sense to you."
},
{
"k": "card",
"title": "Three questions worth asking",
"body": "What are my options? What matters most to me? What are the tradeoffs?",
"say": "Three questions can steady the conversation. What are my options? What matters most to me? And what are the tradeoffs of each choice? You are still you, not just a patient. What matters to you belongs in the room."
},
{
"k": "big",
"h": "What matters most to you?",
"say": "Take a moment. Put a hand on your chest, and take one slow breath. Then say one thing that matters most to you right now, out loud or on paper.",
"beats": [
"Take a moment.",
"Put a hand on your chest, and take one slow breath.",
{
"t": "Then say one thing that matters most to you right now, out loud or on paper.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"One person to keep track",
"Of information and updates"
],
[
"Ask about palliative care",
"For symptoms and stress, at any stage"
],
[
"Less late-night searching",
"Save the questions for your team"
],
[
"Say what support you want",
"People want to know"
]
],
"say": "Here is what helps. One person who keeps track of information, so you don't have to hold it all. Ask your care team about palliative care, which helps with symptoms and stress at any stage. Go easy on late-night internet searching, and bring those questions to your team instead. And tell people what kind of support you want. You might say, I got some hard news. I'm not ready to talk about every detail, but I want you to know."
},
{
"k": "big",
"h": "Hope can change shape.",
"sub": "It doesn't have to disappear.",
"say": "Hope can change shape. At first, it may be all about the test results. Over time, it can grow to hold other things too: a good day, time with the people you love, comfort, something you still want to do. Hope doesn't have to disappear."
},
{
"k": "big",
"h": "If it feels too heavy",
"sub": "Tell your doctor, or call or text 988.",
"say": "If the fear turns into deep depression or hopelessness, tell your doctor, and ask your care team about counseling, social work, or a chaplain. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "One step at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can take this one step at a time. You are still you. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-diagnosis-helper",
"guide": "diagnosis",
"side": "helper",
"title": "A Hard Diagnosis",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Hard Diagnosis",
"sub": "For the Helper",
"say": "When someone you care about has had a hard diagnosis, this is for you. You don't need the right words. You need to stay close."
},
{
"k": "big",
"h": "They may be tired of updates.",
"sub": "And scared, and overwhelmed.",
"say": "They may be overwhelmed and scared. They may also be tired of repeating the same updates to everyone who asks. One of the kindest things you can do is make that part easier."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so sorry. I'm with you.",
"Do you want to talk about it, or would a distraction help today?",
"Can I drive you on Thursday?"
],
"say": "Here are words that help. I'm so sorry. I'm with you. Do you want to talk about it, or would a distraction help today? And a specific offer, like, can I drive you on Thursday? Specific offers are easy to say yes to."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Cure stories and miracle products",
"Everything happens for a reason.",
"Stories about someone else's illness"
],
"say": "Some things, meant kindly, land hard. Cure stories and miracle products, even shared with love, can leave a person defending their own choices. Everything happens for a reason. And stories about someone else who had the same illness. Let this one be theirs."
},
{
"k": "points",
"h": "Help with something specific",
"items": [
[
"Drive to appointments",
"And take notes"
],
[
"Set up updates",
"A meal train or an updates page"
],
[
"Keep inviting them",
"To normal life"
]
],
"say": "Help with something specific. Drive them to appointments, and offer to take notes. Set up a meal train or an updates page, so they can tell everyone at once. And keep inviting them to normal life: the game, the coffee, the walk. Let them decide."
},
{
"k": "big",
"h": "Follow their lead.",
"sub": "Their illness. Their choices.",
"say": "Follow their lead. Some days they will want to talk about the illness, and some days about anything else. The treatment choices are theirs to make with their doctors. Your part is to listen, and to stay."
},
{
"k": "big",
"h": "Pick one thing for this week.",
"say": "Take a moment. Think of the person you care about. Pick one specific thing you could do for them this week. Say it out loud, the way you would offer it.",
"beats": [
"Take a moment.",
"Think of the person you care about.",
"Pick one specific thing you could do for them this week.",
{
"t": "Say it out loud, the way you would offer it.",
"w": 10
}
]
},
{
"k": "big",
"h": "When to help them reach out",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "Watch, gently, for deep depression or hopelessness that doesn't lift. Encourage them to tell their doctor, or to ask their care team for counseling or a chaplain. If they ever talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Your fear is real too.",
"sub": "Find your own place to put it.",
"say": "Your fear for them is real too. Find your own place to put it: a friend, a counselor, a long walk. Then you can bring them steady company."
},
{
"k": "big",
"h": "Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to fix this. Stay close, and keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "chronic",
"ring": "health",
"title": "Chronic Illness or Pain",
"you": {
"id": "ok-g-chronic-you",
"guide": "chronic",
"side": "you",
"title": "Chronic Illness or Pain",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Chronic Illness or Pain",
"sub": "For You",
"say": "If you live with an illness or pain that doesn't go away, this is for you. You don't have to explain yourself here."
},
{
"k": "big",
"h": "Grief for the life you expected.",
"sub": "It can come back with each new limit.",
"say": "Living with ongoing illness or pain often brings grief: for the body you had, the plans you made, the life you expected. That grief can come back again with each new limit. It makes sense. It's a sign of how much those things mattered."
},
{
"k": "words",
"h": "You may be tired of",
"items": [
"Explaining",
"Being tired",
"Fighting the system",
"Not being seen"
],
"say": "You may be tired of explaining. Tired of being tired. Frustrated with your body, and with the systems that are supposed to help. And lonely, when the people around you can't see your pain. All of that is real, and you are not alone in it."
},
{
"k": "points",
"h": "Plan for energy, not just time",
"items": [
[
"Track it",
"What helps, what makes it worse"
],
[
"Rest before you need it",
"Not after you crash"
],
[
"Spend energy on what matters",
"Choose one thing first"
],
[
"Gentle movement",
"If your care team approves"
]
],
"say": "Pacing matters. Plan for energy, not just time. Track what helps and what makes it worse, and bring those notes to your care team. Plan rest before you need it, not after you crash. Spend your best energy on what matters most to you. And try gentle movement, if your care team approves."
},
{
"k": "card",
"title": "Your worth is not your productivity.",
"body": "You matter on the days you get nothing done.",
"say": "Your worth is not measured by what you get done. You matter on the good days, and you matter on the days you spend in bed. Try speaking to yourself the way you would speak to a friend in your place: kindly, and without a list."
},
{
"k": "big",
"h": "Say it to yourself.",
"say": "Take a moment. Let your shoulders drop, and take one slow breath. Then say this, out loud or softly. My life still has meaning with limits.",
"beats": [
"Take a moment.",
"Let your shoulders drop, and take one slow breath.",
"Then say this, out loud or softly.",
{
"t": "My life still has meaning with limits.",
"w": 10
}
]
},
{
"k": "words",
"h": "Telling people what you need",
"items": [
"I want to come, but I may need to leave early. Is that okay?"
],
"say": "Honest words with the people you love can make room for you. You might say, I want to come, but I may need to leave early. Is that okay? Most people would rather have you for an hour than not at all."
},
{
"k": "points",
"h": "Find people who get it",
"items": [
[
"A support group",
"In person or online"
],
[
"Pain psychology or counseling",
"Skills for living with pain"
],
[
"Your care team",
"Share what you track"
]
],
"say": "Find people who get it. A support group or an online community of people living with the same thing. Pain psychology or counseling, which can teach skills for living with pain and the stress that comes with it. And your care team, with the notes you have been keeping."
},
{
"k": "big",
"h": "When it gets too heavy",
"sub": "Thoughts of suicide: call or text 988.",
"say": "Pain and depression often travel together, and both deserve attention. If your pain comes with depression or hopelessness, tell your doctor. If you have any thoughts of suicide, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Rest is part of the work.",
"sub": "The full guide has more, whenever you want it.",
"say": "Rest is part of living well with this, not a failure. Your life still has meaning. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-chronic-helper",
"guide": "chronic",
"side": "helper",
"title": "Chronic Illness or Pain",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Chronic Illness or Pain",
"sub": "For the Helper",
"say": "When someone you care about lives with an illness or pain that doesn't go away, this is for you. Your belief and your patience matter more than you know."
},
{
"k": "big",
"h": "Believe them.",
"sub": "Pain you can't see is still real.",
"say": "Many people with chronic illness feel they aren't believed. Their pain may not show on their face, and it can change from day to day. The simplest gift you can give is this: I believe you."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I believe you.",
"What would make this easier today?",
"Come for as long as you can."
],
"say": "Here are words that help. I believe you. What would make this easier today? And when you invite them, come for as long as you can. Leaving early is fine."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"You don't look sick.",
"Unasked-for cures",
"But you were fine last week."
],
"say": "Some words, meant kindly, can land hard. You don't look sick asks them to prove their pain. Unasked-for cures, diets, and products can feel like blame. And, but you were fine last week. Good days don't cancel the hard ones."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Flexible plans",
"Easy to change or cancel"
],
[
"Practical help on bad days",
"Meals, rides, errands"
],
[
"Keep inviting",
"Even after a no"
]
],
"say": "What helps is often simple. Flexible plans that are easy to change or cancel. Practical help on bad days: a meal, a ride, an errand. And keep inviting them, even after a no. The invitation itself says they still belong."
},
{
"k": "big",
"h": "They may feel like a burden.",
"sub": "Your steady presence answers that.",
"say": "Many people with long illness worry that they are a burden. You can't talk that feeling away, but you can answer it over time: by staying, by asking, and by letting them give back in the ways they can."
},
{
"k": "big",
"h": "Plan for a hard day.",
"say": "Take a moment. Think of the person you care about. Picture one of their hard days. Name one practical thing you could offer on a day like that.",
"beats": [
"Take a moment.",
"Think of the person you care about.",
"Picture one of their hard days.",
{
"t": "Name one practical thing you could offer on a day like that.",
"w": 10
}
]
},
{
"k": "big",
"h": "When to help them reach out",
"sub": "Thoughts of suicide: call or text 988.",
"say": "Watch, gently, for pain that comes with depression or hopelessness. Encourage them to tell their doctor, or to find a counselor who works with pain. If they ever talk about suicide, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Pace yourself too.",
"sub": "Long illness is a marathon.",
"say": "Long illness is a marathon, for them and for you. Pace your own support. Share the load with others, rest when you can, and talk with someone you trust about what this asks of you."
},
{
"k": "big",
"h": "Believe them. Stay.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can't take the pain away. You can believe them, and stay. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "own-death",
"ring": "health",
"title": "Facing Your Own Death",
"you": {
"id": "ok-g-own-death-you",
"guide": "own-death",
"side": "you",
"title": "Facing Your Own Death",
"sideName": "For You",
"mins": 4,
"sources": [
"byock4",
"chochinovdt"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Facing Your Own Death",
"sub": "For You",
"say": "If you are facing your own death, this is for you. Go gently. Stop whenever you need to, and come back whenever you want."
},
{
"k": "words",
"h": "Sometimes all in one day",
"items": [
"Fear",
"Grief",
"Anger",
"Peace"
],
"say": "It's natural to feel fear, grief, anger, and peace, sometimes all in one day. Some people feel terror. Some feel a surprising calm. Many grieve for the people they will leave, and worry about being a burden. All of it belongs."
},
{
"k": "points",
"h": "You still get to choose",
"items": [
[
"Tell your doctor what matters",
"Your hopes and your worries"
],
[
"Ask about hospice and palliative care",
"Comfort, meaning, and family"
],
[
"Choose someone to speak for you",
"If you can't speak for yourself"
]
],
"say": "You still get to choose how you spend your days. Tell your doctor what matters most to you, your hopes and your worries. Ask about hospice and palliative care, which focus on comfort, meaning, and your family. Choosing hospice is a way of living your days well. And choose someone to speak for you, if a day comes when you can't speak for yourself."
},
{
"k": "card",
"title": "It's okay to let others care for you.",
"body": "Letting them help is a way to let them love you.",
"say": "Many people worry about being a burden. Here is another way to see it. Letting the people who love you help you gives them a way to love you now. It's okay to let others care for you."
},
{
"k": "words",
"h": "Say what matters",
"items": [
"Thank you.",
"I'm sorry.",
"I forgive you.",
"I love you.",
"Goodbye."
],
"say": "Say what matters while you can. Thank you. I'm sorry. I forgive you. I love you. And, when it's time, goodbye. You don't need perfect words. Even one of these, said plainly, can mean everything."
},
{
"k": "story",
"title": "Letting Go. Eleanor's Story",
"lines": [
"Eleanor was seventy-one, with days left. Her first grandchild was due in three months.",
"She recorded messages, and we wrote letters to be opened at the birth and the first birthday.",
"\"I guess my arms won't hold this baby, but maybe my words will.\""
],
"lesson": "Love can travel ahead of you.",
"note": "Names and details changed",
"hold": 2,
"say": "I once sat with a woman named Eleanor. She was seventy-one, and the doctors said days, maybe a week or two. But her heart was fixed three months down the road, on the due date of her first grandchild. So she recorded messages: stories about her own mother, advice for sleepless nights. We wrote letters to be opened at the birth and the first birthday. One day she said, I guess my arms won't hold this baby, but maybe my words will."
},
{
"k": "big",
"h": "Who needs to hear from you?",
"say": "Take a moment. Think of one person you love. Which of those words do you most want them to hear from you? Say it now, softly, as if they were here.",
"beats": [
"Take a moment.",
"Think of one person you love.",
"Which of those words do you most want them to hear from you?",
{
"t": "Say it now, softly, as if they were here.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Record your stories",
"Letters, videos, or voice"
],
[
"Time with your people",
"The ones who matter most"
],
[
"Someone to talk with",
"About fears, and faith if you want"
]
],
"say": "A few things help. Recording stories, letters, or videos for the people you love. Time with the ones who matter most. And someone to talk with about your fears. A chaplain can listen to your fears and your faith, if you would like that."
},
{
"k": "big",
"h": "When distress is too much",
"sub": "Ask your care team for help now.",
"say": "If fear, pain, or distress becomes unbearable, ask your care team for help now. It can be eased. If you are on hospice, call their line, day or night. If you have thoughts of ending your life, call or text 988. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your life has mattered.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your life has mattered, and it still does. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-own-death-helper",
"guide": "own-death",
"side": "helper",
"title": "Facing Your Own Death",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Facing Your Own Death",
"sub": "For the Helper",
"say": "When someone you love is facing their own death, this is for you. You don't need answers. You need to listen."
},
{
"k": "big",
"h": "Follow their lead.",
"sub": "Many want to talk about dying.",
"say": "Many people who are dying want to talk about it, and notice everyone around them changing the subject. Let them lead. If they want to talk about dying today, talk about dying. If they want to talk about the ballgame, that's fine too."
},
{
"k": "words",
"h": "Words that help",
"items": [
"What's on your mind these days?",
"What would you like people to know or remember?",
"I'm listening."
],
"say": "Here are words that help. What's on your mind these days? What would you like people to know or remember? And simply, I'm listening. Then let the silence be part of the conversation."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Don't talk like that.",
"Forcing positivity",
"Changing the subject"
],
"say": "Some words, meant kindly, close the door. Don't talk like that ends the one conversation they may need most. Forcing positivity asks them to hide what they feel. And changing the subject leaves them alone with it."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listen",
"And follow their lead"
],
[
"Record stories or letters",
"Their voice, for later"
],
[
"Tie up loose ends",
"Practical and spiritual"
]
],
"say": "What helps? Listen, and follow their lead. Help them record stories or letters, so their voice can reach people later. And help them tie up loose ends, practical and spiritual: the papers, the phone calls, the person they want to see."
},
{
"k": "big",
"h": "Ask: What's on your mind?",
"say": "Take a moment. Picture the person you love. Imagine sitting beside them, with nowhere else to be. Say it softly, the way you would say it to them. What's on your mind these days?",
"beats": [
"Take a moment.",
"Picture the person you love.",
"Imagine sitting beside them, with nowhere else to be.",
"Say it softly, the way you would say it to them.",
{
"t": "What's on your mind these days?",
"w": 10
}
]
},
{
"k": "big",
"h": "When to call the team",
"sub": "Unbearable distress can be eased.",
"say": "If fear, pain, or distress becomes unbearable, help them ask their care team for help now. It can be eased. If they are on hospice, call the hospice line, day or night. If they talk about ending their life, call or text 988 together. If there is danger right now, call 911."
},
{
"k": "big",
"h": "This may stir your own fears.",
"sub": "Get support for yourself.",
"say": "Sitting with someone facing death may raise your own fears about dying. That's human, and it's tender ground. Talk with someone you trust, and get support for yourself too."
},
{
"k": "big",
"h": "Listen. Follow. Stay.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to make this easier. Listen, follow their lead, and stay. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "eol-plan",
"ring": "health",
"title": "Making an End-of-Life Plan",
"you": {
"id": "ok-g-eol-plan-you",
"guide": "eol-plan",
"side": "you",
"title": "Making an End-of-Life Plan",
"sideName": "For You",
"mins": 5,
"sources": [
"sicg",
"convo"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Making an End-of-Life Plan",
"sub": "For You",
"say": "If you've been meaning to make an end-of-life plan and keep putting it off, this is for you. Most people put it off. You're in good company, and you can start today."
},
{
"k": "big",
"h": "Planning ahead is an act of love.",
"sub": "It is not giving up.",
"say": "Planning ahead is an act of love, not giving up. When your wishes are clear, the people you love don't have to guess in the hardest hours of their lives. Many people wait for a crisis, when it's much harder. You can give this gift now, while it's calm."
},
{
"k": "points",
"h": "Three pieces",
"items": [
[
"Think",
"What matters most to you"
],
[
"Choose",
"Your health care agent"
],
[
"Write it down",
"Your state's advance directive"
]
],
"say": "There are three pieces. First, think about what matters most to you if you were very sick. Second, choose a health care agent: the person who would speak for you if you couldn't speak for yourself. Third, put your wishes in writing, on your state's advance directive form. The full guide links to forms by state."
},
{
"k": "points",
"h": "Questions to start with",
"items": [
[
"What matters most?",
"If time were short"
],
[
"What worries you most?",
"About getting very sick"
],
[
"What would you go through?",
"For a chance at more time"
],
[
"Who and what nearby?",
"People, music, traditions"
]
],
"say": "Start with a few questions. If time were short, what would matter most to you? What worries you most about getting very sick? What would you be willing to go through for a chance at more time, and what wouldn't you? And who and what do you want near you? People, music, a place, your faith or traditions, if those matter to you. Your answers are your values, and your plan grows from them."
},
{
"k": "card",
"title": "Choose your agent with care.",
"body": "Someone who will honor your wishes, even when it is hard.",
"say": "Choose your agent with care. It may not be the person closest to you. It's the person who will speak your wishes clearly, even when they're hard to hear, and even when family disagrees. Then ask them. Don't assume they know."
},
{
"k": "big",
"h": "Who could speak for you?",
"say": "Take a moment. Who could speak for you, if you couldn't speak for yourself? Say their name out loud, or write it down.",
"beats": [
"Take a moment.",
"Who could speak for you, if you couldn't speak for yourself?",
{
"t": "Say their name out loud, or write it down.",
"w": 10
}
]
},
{
"k": "words",
"h": "Then talk about it",
"items": [
"\"I filled out my advance directive.\"",
"\"Can I walk you through what I want?\"",
"\"So you're never guessing.\""
],
"sub": "The conversation matters as much as the paper.",
"say": "The conversation matters as much as the paperwork. A form in a drawer can't explain itself. Try something like this. I filled out my advance directive. Can I walk you through what I want, so you're never guessing? Doing your own first can open the door for others, too. You might say to a parent, I finally sat down and did mine. It felt good to get it done. Have you thought about yours?"
},
{
"k": "points",
"h": "Keep it alive",
"items": [
[
"Share copies",
"With your agent and your doctor"
],
[
"Say where it is",
"So people can find it"
],
[
"Revisit it",
"After big life changes"
],
[
"Legal questions",
"An estate or elder law attorney"
]
],
"say": "Then keep it alive. Share copies with your agent and your doctor. Tell your people where it is, so they can find it when it matters. Revisit it after big life changes, like a marriage, a divorce, a new diagnosis, or a move. And for legal documents like a will or a power of attorney, an estate or elder law attorney can help."
},
{
"k": "big",
"h": "One honest conversation is a good start.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to finish it all today. One honest conversation, or one page, is a good start. It's a gift to the people you love, and a kind of peace for you. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-eol-plan-helper",
"guide": "eol-plan",
"side": "helper",
"title": "Making an End-of-Life Plan",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"convo"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Making an End-of-Life Plan",
"sub": "For the Helper",
"say": "If you want to help a parent, a spouse, or someone you love make an end-of-life plan, this is for you. It's one of the kindest conversations a family can have."
},
{
"k": "big",
"h": "Start before the crisis.",
"say": "The best time to talk is before anyone needs the answers. In a crisis, families make these choices tired, scared, and guessing. Starting while things are calm is a kindness to everyone, including you."
},
{
"k": "card",
"title": "Expect a little resistance.",
"body": "It may feel morbid to them. Go gently, and keep the door open.",
"say": "Expect a little resistance. To an aging parent, the topic can feel morbid, or like you're expecting them to die. That's normal. Go gently, and keep the door open. A no today can become a yes next month."
},
{
"k": "words",
"h": "Words that open it",
"items": [
"\"I want to make sure I honor your wishes someday.\"",
"\"Can we talk about them?\"",
"\"I just did mine. Have you thought about yours?\""
],
"say": "Here are words that open it. I want to make sure I honor your wishes someday. Can we talk about them? Or start with yourself. I just did mine. Have you thought about yours?"
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Model it",
"Complete your own plan too"
],
[
"Use a conversation guide",
"The questions do the work"
],
[
"Listen more than you talk",
"It is their plan"
],
[
"Write down what you hear",
"Then check it with them"
]
],
"say": "A few things help. Model it, by completing your own plan too. Offer to go through a conversation guide together, so the questions do the heavy lifting. Listen more than you talk. And write down what you hear, then read it back and ask, did I get that right?"
},
{
"k": "card",
"title": "Their plan, in their words.",
"body": "Even when you would choose differently.",
"say": "This part takes courage. They may want less treatment than you'd want for them, or more. Your part is to understand their wishes and honor them, not to steer. If they choose you as their agent, you're promising to speak for them, in their words, even when you would choose differently."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Waiting for a crisis",
"It only gets harder"
],
[
"Arguing their choices",
"Ask what matters to them"
],
[
"Rushing it",
"Several short talks are fine"
]
],
"say": "Some things are better left out. Waiting for a crisis. Arguing with their choices. If something surprises you, ask what matters to them about it. And rushing. Several short talks over a few weeks often go better than one big one."
},
{
"k": "big",
"h": "How could you begin?",
"say": "Take a moment. Think of the person you want to talk with. Say the first sentence you could use, out loud.",
"beats": [
"Take a moment.",
"Think of the person you want to talk with.",
{
"t": "Say the first sentence you could use, out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "This can stir things in you, too.",
"body": "Talk with someone you trust.",
"say": "Talking about someone's death, even years away, can stir early grief, or your own fears. That's normal. Notice it, and talk with someone you trust."
},
{
"k": "big",
"h": "Ask now, so you never have to guess.",
"sub": "The full guide has more, whenever you want it.",
"say": "Ask now, so you never have to guess. Listening to their wishes today is a way of loving them later. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "bedside",
"ring": "health",
"title": "Sitting with Someone Who Is Dying",
"you": {
"id": "ok-g-bedside-you",
"guide": "bedside",
"side": "you",
"title": "Sitting with Someone Who Is Dying",
"sideName": "For You",
"mins": 4,
"sources": [
"blundon",
"kerr"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Sitting with Someone Who Is Dying",
"sub": "For You",
"say": "If you're sitting with someone who is dying, keeping watch through these hours or days, this is for you. You don't have to know what you're doing. You're already doing the most important part."
},
{
"k": "big",
"h": "Your presence matters more than your words.",
"say": "Your presence matters more than your words. You don't need a speech. A hand to hold, a familiar voice, someone nearby. That's what you bring, and it's enough."
},
{
"k": "big",
"h": "Time can feel strange here.",
"sub": "Awe, fear, exhaustion, tenderness.",
"say": "Time can feel strange at a bedside. Hours stretch, then vanish. You may feel awe, fear, exhaustion, and tenderness, sometimes all in the same minute. All of it belongs."
},
{
"k": "points",
"h": "What you may notice",
"items": [
[
"Breathing changes",
"Pauses, then quicker breaths"
],
[
"Cool hands and feet",
"Skin color may change"
],
[
"More sleep",
"Little food or drink"
],
[
"Ask the nurse",
"About anything you see"
]
],
"say": "The body changes near death. Breathing may change, with long pauses and then a few quicker breaths. Hands and feet may feel cool, and skin color may change. They may sleep more, and take very little food or drink. These changes are common. Ask the hospice nurse what you're seeing, any time, day or night."
},
{
"k": "big",
"h": "Speak to them, not about them.",
"sub": "Hearing is thought to last late.",
"say": "Speak to them, not about them. Hearing is thought to last late, and research suggests it may continue even after a person can no longer respond. Tell them who is here. Tell them a story. Say what you want to say."
},
{
"k": "big",
"h": "What do you want them to hear?",
"say": "Take a moment. Look at them, or picture them. Softly, say one thing you want them to hear.",
"beats": [
"Take a moment.",
"Look at them, or picture them.",
{
"t": "Softly, say one thing you want them to hear.",
"w": 12
}
]
},
{
"k": "card",
"title": "They may see someone you can't.",
"body": "Visions near the end usually bring comfort. Ask who is there.",
"say": "Some people near the end see or speak to loved ones who have died. It's common, and it usually brings comfort. You don't have to explain it or correct it. You can gently ask, who's here? And listen."
},
{
"k": "points",
"h": "Small comforts",
"items": [
[
"Soft music",
"The songs they love"
],
[
"Familiar voices",
"Yours counts"
],
[
"Gentle touch",
"A hand, a smoothed blanket"
],
[
"Lips and pillows",
"With the nurse's guidance"
]
],
"say": "Small comforts help. Soft music, the songs they love. Familiar voices, and yours counts. Gentle touch: a hand held, a blanket smoothed. Moistening their lips and adjusting pillows, with the nurse's guidance. Some families read favorite words, poems, or prayers, whatever was theirs."
},
{
"k": "card",
"title": "Take turns. Rest.",
"body": "\"If I'm not in the room at the end, my love was still there.\"",
"say": "Take turns, so everyone rests. Eat something. Sleep when you can. Some people die in the minutes when loved ones have stepped out. If that happens, tell yourself this. If I'm not in the room at the end, my love was still there."
},
{
"k": "big",
"h": "I don't have to do this perfectly.",
"sub": "The full guide has more, whenever you want it.",
"say": "No one does this perfectly. You don't have to either. Being here is enough. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-bedside-helper",
"guide": "bedside",
"side": "helper",
"title": "Sitting with Someone Who Is Dying",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Sitting with Someone Who Is Dying",
"sub": "For the Helper",
"say": "If someone you care about is keeping vigil at a loved one's bedside, and you want to help, this is for you."
},
{
"k": "big",
"h": "The family is running on empty.",
"say": "A family keeping vigil is often exhausted and emotional. They may not have eaten, showered, or slept in days. They may not know what they need. So offer something specific."
},
{
"k": "words",
"h": "Offers that help",
"items": [
"\"I'll sit with him so you can shower and eat.\"",
"\"I'm bringing food and coffee.\"",
"\"I can take care of the dog tonight.\""
],
"say": "Here are offers that help. I'll sit with him so you can shower and eat. I'm bringing food and coffee. I can take care of the dog tonight. A specific offer is easy to say yes to."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Crowding the room",
"Keep visits short and quiet"
],
[
"Hard stories",
"Let this one be theirs"
],
[
"Pictures without asking",
"Always ask first"
],
[
"Explaining the body",
"Leave that to the nurse"
]
],
"say": "Some things are better left out. Crowding the room. Keep visits short and quiet. Hard stories about other deaths. Taking pictures without asking. And explaining what's happening in the body. Questions about that belong with the hospice nurse."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan hadn't opened her eyes or answered me in days.",
"A song played softly on a small speaker. Under the sheet, her toes moved with the beat.",
"She smiled a big open smile, and her shoulders began to dance."
],
"lesson": "Music can reach a person when words cannot.",
"note": "From a Grounded story by Chris Joy",
"hold": 2,
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
},
"say": "I once sat with Suzan, in her last days. She hadn't opened her eyes or answered me in days. A song played softly on a small speaker: Drift Away. Under the sheet, her toes began to move with the beat. I held her hand and sang along. She lifted her chin and smiled a big open smile, and her shoulders danced, right on the beat. She never woke again."
},
{
"k": "points",
"h": "Ways to be useful",
"items": [
[
"Food and coffee",
"For the people keeping watch"
],
[
"Calls and pets",
"So they can stay put"
],
[
"Their music",
"Ask what they love"
],
[
"A shift",
"So someone can sleep"
]
],
"say": "So bring what helps. Food and coffee for the people keeping watch. Take care of calls and pets, so they can stay put. Ask about the music their loved one loves, and offer to set it up. And take a shift, so someone can sleep."
},
{
"k": "big",
"h": "What could you take off their plate?",
"say": "Take a moment. Think of the family keeping watch. Name one thing you could take off their plate today.",
"beats": [
"Take a moment.",
"Think of the family keeping watch.",
{
"t": "Name one thing you could take off their plate today.",
"w": 10
}
]
},
{
"k": "card",
"title": "Notice what it stirs in you.",
"body": "Keeping vigil is one of the most sacred things people do.",
"say": "Keeping vigil is one of the most sacred things people do, and being near it can stir your own losses or fears. Notice what it stirs in you. Talk with someone you trust, and rest when you get home."
},
{
"k": "big",
"h": "Quiet, steady, and close.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the right words. Be quiet, steady, and close, and keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "after-death",
"ring": "health",
"title": "The First Days After a Death",
"you": {
"id": "ok-g-after-death-you",
"guide": "after-death",
"side": "you",
"title": "The First Days After a Death",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "The First Days After a Death",
"sub": "For You",
"say": "If someone you love has just died, and you're facing the first hours and days after, this is for you. I'm so sorry."
},
{
"k": "big",
"h": "There is no rush.",
"sub": "You only have to do today.",
"say": "First, take a breath. There is no rush. You don't have to do everything right away. You only have to do today."
},
{
"k": "points",
"h": "The first calls",
"items": [
[
"Hospice involved?",
"Call the hospice first, not 911"
],
[
"No hospice?",
"Call 911 or the doctor"
],
[
"Then a funeral home",
"Ask what they handle for you"
]
],
"say": "If hospice was involved, call the hospice first, not 911. They will guide you, and a nurse will come to help with the next steps, including the funeral home. If there was no hospice, call 911 or the person's doctor. Then choose a funeral home and ask them to walk you through what they handle for you. They do this every day."
},
{
"k": "big",
"h": "You can take your time with them.",
"sub": "Sit with them. Say goodbye.",
"say": "If you're with them, you can take your time. Sit with them as long as you need. Hold their hand. Say goodbye. Invite others in, children too, if they want to come. If your family has a tradition for this time, like prayers, washing, or keeping watch, there is room for it now."
},
{
"k": "points",
"h": "What can wait",
"items": [
[
"Most paperwork",
"Set it aside for now"
],
[
"Big decisions",
"The house, their things"
],
[
"Thank-you notes",
"Weeks from now, or not at all"
],
[
"Explaining yourself",
"To anyone"
]
],
"say": "A lot can wait. Most paperwork can be set aside for now. Big decisions, like the house or their things, can wait. Thank-you notes can come weeks from now, or not at all. And you don't owe anyone an explanation for how you're grieving."
},
{
"k": "big",
"h": "Who could help make the calls?",
"say": "Take a moment. Think of the people who need to know. Name one person who could make some of those calls for you.",
"beats": [
"Take a moment.",
"Think of the people who need to know.",
{
"t": "Name one person who could make some of those calls for you.",
"w": 10
}
]
},
{
"k": "words",
"h": "Let people help",
"items": [
"\"Could you tell the neighbors?\"",
"\"Could you set up meals?\"",
"\"Could you be our point person?\""
],
"sub": "Specific asks are easier to say yes to.",
"say": "People will want to help. Give them something specific. Could you tell the neighbors? Could you set up meals? Could you be our point person for the funeral details? One person handling logistics can lift a lot off you."
},
{
"k": "points",
"h": "Your body is grieving too",
"items": [
[
"Eat something",
"Even something small"
],
[
"Drink water",
"Right now, if you can"
],
[
"Sleep when you can",
"Even a short rest"
],
[
"Expect fog",
"Numb, busy, forgetful"
]
],
"say": "Your body is grieving too. Eat something, even something small. Drink water. Sleep when you can. And expect fog. Many people feel numb, busy, and forgetful, running on adrenaline for days. That's normal."
},
{
"k": "card",
"title": "After the funeral, the crash can come.",
"body": "Grief support through your hospice or funeral home. Thoughts of not wanting to live: call or text 988.",
"say": "Many people crash after the funeral, when the house gets quiet. That's normal too. Ask your hospice or funeral home about grief support. And if grief ever brings thoughts of not wanting to live, call or text 988. Danger right now: 911."
},
{
"k": "big",
"h": "I only have to do today.",
"sub": "The full guide has more, whenever you want it.",
"say": "Say it to yourself as often as you need to. I only have to do today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-after-death-helper",
"guide": "after-death",
"side": "helper",
"title": "The First Days After a Death",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "The First Days After a Death",
"sub": "For the Helper",
"say": "If someone you care about has just lost a person they love, and you want to help in these first days, this is for you."
},
{
"k": "big",
"h": "They are swamped.",
"say": "In the first days after a death, people are swamped by tasks and decisions, often while numb and exhausted. Every question you ask is one more decision. So make it easy."
},
{
"k": "words",
"h": "Say less, offer something specific",
"items": [
"\"I'm so sorry.\"",
"\"I'm bringing dinner tonight.\"",
"\"I'll walk the dog this week.\""
],
"say": "Say less, and offer something specific. I'm so sorry. I'm bringing dinner tonight. I'll walk the dog this week. Those are complete sentences."
},
{
"k": "card",
"title": "Skip the vague offer.",
"body": "\"Let me know if you need anything\" hands them one more task.",
"say": "Skip the vague offer. Let me know if you need anything sounds kind, but it hands them one more task: figuring out what to ask you for. Choose something and do it."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Answer the door",
"And the phone"
],
[
"Walk the dog",
"Feed the pets"
],
[
"Airport runs",
"For relatives coming in"
],
[
"Keep a list",
"Who brought what"
]
],
"say": "What helps is practical. Answer the door and the phone. Walk the dog. Pick up relatives at the airport. Keep a list of who brought what, so thank-yous can wait without being lost. And if you're close, offer to sit with them while they make the hard calls."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Explaining why",
"Let the questions stay theirs"
],
[
"\"At least...\"",
"It shrinks the loss"
],
[
"Your own loss stories",
"Not yet"
],
[
"Rushing decisions",
"Their things can wait"
]
],
"say": "Some things are better left out. Explaining why it happened. Anything that starts with at least, because it shrinks the loss. Your own loss stories, at least for now. And rushing decisions about their things. Those can wait."
},
{
"k": "big",
"h": "What could you do this week?",
"say": "Take a moment. Picture the person you're helping. Name one specific thing you could do for them this week.",
"beats": [
"Take a moment.",
"Picture the person you're helping.",
{
"t": "Name one specific thing you could do for them this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "Keep showing up after the funeral.",
"body": "Talk of not wanting to live: call or text 988. Danger right now: 911.",
"say": "Keep showing up after the funeral, when the casseroles stop and the house gets quiet. That's often when grief lands hardest. If they talk about not wanting to live, call or text 988 together. Danger right now: 911."
},
{
"k": "card",
"title": "Take care of yourself too.",
"body": "Being close to a loss can stir your own.",
"say": "Being close to someone's loss can stir your own. Rest, eat, and talk with someone you trust. You'll be able to keep showing up longer."
},
{
"k": "big",
"h": "Your steady presence is a gift.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can't fix this. You don't need to. Your steady presence is a gift. Show up, then keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "addiction",
"ring": "health",
"title": "Addiction and Recovery",
"you": {
"id": "ok-g-addiction-you",
"guide": "addiction",
"side": "you",
"title": "Addiction and Recovery",
"sideName": "For You",
"mins": 5,
"sources": [
"tangney"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Addiction and Recovery",
"sub": "For You",
"say": "If you are worried about your drinking or drug use, or you are in recovery and finding your way, this is for you. Watch as much as you want, at your own pace."
},
{
"k": "big",
"h": "A treatable illness, not a moral failure.",
"sub": "Recovery is possible, and it often takes more than one try.",
"say": "Here is the first thing to know. Addiction is a treatable illness, not a moral failure. A person with a substance use disorder is still a whole person, with worth and a future. Recovery is possible. For many people, it takes more than one try."
},
{
"k": "points",
"h": "What you may be carrying",
"items": [
[
"Shame",
"Feeling like you are the problem"
],
[
"Cravings",
"Strong pulls at certain times"
],
[
"Fear of change",
"Who am I without it?"
],
[
"Mixed feelings",
"Wanting to stop, and not wanting to"
]
],
"say": "You may be carrying some of these. Shame, a feeling that you are the problem. Cravings, strong pulls at certain times of day or in certain places. Fear of change, and the question, who am I without it? And mixed feelings, wanting to stop and not wanting to, both at once. All of that is common."
},
{
"k": "big",
"h": "Guilt points toward repair. Shame pulls toward hiding.",
"sub": "You are worth helping, today.",
"say": "It helps to know the difference between guilt and shame. Guilt says, I did something I regret, and I can work to make it right. Shame says, I am the problem. Guilt can point you toward repair. Shame tends to pull people into hiding, and hiding feeds the illness. You are worth helping, today, just as you are."
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Call the SAMHSA Helpline",
"1-800-662-4357, confidential"
],
[
"Talk with your doctor",
"Honestly, about what is going on"
],
[
"Find a recovery meeting",
"In person or online"
],
[
"Tell one person",
"Someone safe and steady"
]
],
"say": "Here are some first steps. Call the SAMHSA National Helpline, at one eight hundred, six six two, four three five seven. It's confidential, and they can point you to help nearby. Talk with your doctor honestly about what is going on. Find a recovery meeting or support group, in person or online. And tell one person who is safe and steady. You might say, I need help with my drinking. I'm ready to talk about it."
},
{
"k": "big",
"h": "One day at a time is enough.",
"sub": "Breathe, then say it.",
"say": "Let's try something now. Breathe in slowly, and let the breath out a little longer. Think about just today, nothing past tonight. Now say it, out loud or quietly: one day at a time is enough.",
"beats": [
"Let's try something now.",
"Breathe in slowly, and let the breath out a little longer.",
"Think about just today, nothing past tonight.",
{
"t": "Now say it, out loud or quietly: one day at a time is enough.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps recovery hold",
"items": [
[
"Treatment that fits you",
"Matched to your needs"
],
[
"A recovery community",
"Meetings, sponsors, peers"
],
[
"A plan for high-risk times",
"Evenings, payday, hard days"
],
[
"Connection",
"Recovery grows with others"
]
],
"say": "Here is what helps recovery hold. Treatment matched to your needs, which a doctor or treatment provider can help you find. A recovery community, with meetings, sponsors, and peers who understand. A plan for your high-risk times, like evenings, payday, or a hard day, with new routines ready. And connection. Recovery grows with other people around you."
},
{
"k": "card",
"title": "A slip is not the end of recovery.",
"body": "Return to use is part of many recoveries. Reach out the same day.",
"say": "If you slip, or return to use, you are not starting from nothing. Relapse is part of many recoveries. What you learned is still yours. Reach out the same day, to your sponsor, your group, your doctor, or the helpline, and take the next step. You can tell yourself, a slip is not the end of my recovery."
},
{
"k": "card",
"title": "Overdose is a 911 call.",
"body": "Thoughts of suicide: call or text 988. SAMHSA Helpline: 1-800-662-4357.",
"say": "If someone may be overdosing, call nine one one right away. Many states have laws that protect people who call for help. If you have thoughts of suicide, call or text nine eight eight. And the SAMHSA National Helpline is there any time you need it."
},
{
"k": "big",
"h": "You belong in recovery.",
"sub": "The full guide has more, whenever you want it.",
"say": "Connection is the opposite of addiction. You belong in recovery, one day at a time, with people beside you. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-addiction-helper",
"guide": "addiction",
"side": "helper",
"title": "Addiction and Recovery",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Addiction and Recovery",
"sub": "For the Helper",
"say": "This is for the family member or friend who loves someone with a substance use disorder. The worry, the hope, and the heartbreak are real. You matter here too."
},
{
"k": "big",
"h": "Love them. Look after yourself.",
"sub": "Their recovery is theirs. Your wellbeing is yours.",
"say": "Two things are true at once. You can't control someone else's recovery. And you can look after yourself while you love them. Families need recovery too."
},
{
"k": "points",
"h": "What they may feel",
"items": [
[
"Ashamed",
"Even when they look defiant"
],
[
"Defensive",
"Bracing for a lecture"
],
[
"Hopeless",
"After tries that slipped"
],
[
"Afraid",
"Of life without it"
]
],
"say": "The person you love may feel ashamed, even when they look defiant. They may be defensive, bracing for a lecture. They may feel hopeless after tries that slipped. And they may be afraid of what life looks like without it."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I love you, and I'm worried about you.",
"I'll help you find treatment when you're ready.",
"I see how hard you're working."
],
"say": "Here are words that help. I love you, and I'm worried about you. I'll help you find treatment when you're ready. And, once they start, I see how hard you're working. Choose a calm, sober moment to talk."
},
{
"k": "points",
"h": "What helps more than it seems",
"items": [
[
"Skip shame and lectures",
"They push people into hiding"
],
[
"Let consequences land",
"Instead of covering for them"
],
[
"Help in other ways",
"Rather than with money"
],
[
"Learn about recovery",
"So you know the options"
]
],
"say": "A few things help more than they seem to. Skip shaming and lecturing, which push people into hiding. Let natural consequences land, instead of covering for them. Help in other ways, like a ride to a meeting, rather than with money that can feed the illness. And learn about recovery options, so you're ready when they are."
},
{
"k": "flow",
"h": "Clear, loving boundaries",
"steps": [
[
"Decide what you will do",
"Not what they must do"
],
[
"Say it calmly",
"Once, with love"
],
[
"Follow through",
"Kindly and steadily"
]
],
"say": "Clear, loving boundaries protect you both. First, decide what you will do, not what they must do. For example, I won't give money, but I'll drive you to treatment. Then say it calmly, once, with love. And follow through, kindly and steadily."
},
{
"k": "big",
"h": "Practice one boundary.",
"sub": "Start with love.",
"say": "Take a moment. Think of one boundary that would protect you, or your home. Now say it softly, starting with the words, I love you, and I will.",
"beats": [
"Take a moment.",
"Think of one boundary that would protect you, or your home.",
{
"t": "Now say it softly, starting with the words, I love you, and I will.",
"w": 12
}
]
},
{
"k": "points",
"h": "Support for you",
"items": [
[
"A family support group",
"Like Al-Anon"
],
[
"A counselor of your own",
"For the weight you carry"
],
[
"Rest and friends",
"A life beyond the worry"
]
],
"say": "Your wellbeing matters. A support group for families, like Al-Anon, can help you feel less alone. A counselor of your own can help with the weight you carry. And keep rest and friends in your week, a life beyond the worry."
},
{
"k": "card",
"title": "Overdose is a 911 call.",
"body": "Thoughts of suicide: call or text 988. SAMHSA Helpline: 1-800-662-4357, for families too.",
"say": "If someone may be overdosing, call nine one one right away. If they talk about suicide, call or text nine eight eight together. The SAMHSA National Helpline is there for families too, at one eight hundred, six six two, four three five seven."
},
{
"k": "big",
"h": "Families need recovery too.",
"sub": "The full guide has more, whenever you want it.",
"say": "Love them, keep your boundaries, and let others hold you up too. Families need recovery too. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "caregiving",
"ring": "health",
"title": "Caring for Someone Who Is Ill",
"you": {
"id": "ok-g-caregiving-you",
"guide": "caregiving",
"side": "you",
"title": "Caring for Someone Who Is Ill",
"sideName": "For You",
"mins": 5,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Caring for Someone Who Is Ill",
"sub": "For You",
"say": "If you are caring for someone who is ill, a spouse, a parent, a child, or a friend, this is for you. Watch it in pieces if that's all the time you have."
},
{
"k": "big",
"h": "Love in action. And it drains you.",
"sub": "Both are true.",
"say": "Caregiving is love in action. It is also work: the medicines, the appointments, the nights you sleep with one ear open. It can drain you, slowly, until your own life feels far away. Both are true, and saying so takes nothing away from your love."
},
{
"k": "words",
"h": "Feelings caregivers carry",
"items": [
"Tired",
"Alone",
"Always on alert",
"Resentful, then guilty",
"Wishing it were over"
],
"say": "You may feel tired in a way sleep doesn't fix. Alone, even in a full house. Always on alert. Some days you may feel resentful, and then guilty for feeling it. Some days you may wish it were over. These mixed feelings are normal. They come from being stretched past your limits. They don't cancel your love."
},
{
"k": "points",
"h": "Your health counts too",
"items": [
[
"Keep your own appointments",
"Your doctor, your medicines"
],
[
"Sleep when you can",
"Even a short rest helps"
],
[
"Eat something real",
"Not only what is left over"
]
],
"say": "Your own health counts too. Caregivers often let it slip without noticing. Keep your own doctor appointments, and take your own medicines. Sleep when you can, even a short rest. Eat something real, not only what is left on their plate. Taking care of you is part of taking care of them."
},
{
"k": "flow",
"h": "Hand some of it out",
"steps": [
[
"List the tasks",
"Everything you do in a week"
],
[
"Mark what others could do",
"Errands, meals, rides, the lawn"
],
[
"Ask one person, specifically",
"A day, a time, a task"
]
],
"say": "Here is a way to share the load. First, list the tasks: everything you do in a week. Then mark the ones someone else could do: errands, meals, rides, the lawn. Then ask one person for one thing, with a day and a time. People often want to help and don't know how. A clear ask is a gift to them, too."
},
{
"k": "words",
"h": "Try asking like this",
"items": [
"\"Could you sit with Dad on Thursday afternoons so I can have a break?\""
],
"say": "Try asking like this. Could you sit with Dad on Thursday afternoons so I can have a break? Ask about respite, too: short breaks where someone else steps in for a few hours or a few days. A hospice, home health, or your local Area Agency on Aging can tell you what's near you."
},
{
"k": "big",
"h": "Taking care of me helps me take care of them.",
"say": "Let's take a moment, just for you. Breathe in slowly, and let the breath out longer. Now say it, out loud or inside. Taking care of me helps me take care of them.",
"beats": [
"Let's take a moment, just for you.",
"Breathe in slowly, and let the breath out longer.",
"Now say it, out loud or inside.",
{
"t": "Taking care of me helps me take care of them.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A caregiver support group",
"People who already understand"
],
[
"A short daily practice",
"Ten minutes that are only yours"
],
[
"The team around them",
"Hospice, home health, aging agencies"
]
],
"say": "Here's what helps many caregivers. A support group, with people who already understand. A short daily practice that is only yours: a walk, a song, a quiet cup of coffee. And the team around the one you love: hospice, home health, and aging agencies. You were never meant to do this alone."
},
{
"k": "big",
"h": "When you are running on empty",
"sub": "Thoughts of ending your life: call or text 988.",
"say": "If you feel worn down for weeks, or your own health is slipping, tell your doctor. If you ever feel close to losing control with the person you care for, step away and call for help. If you have thoughts of ending your life, call or text 988, any time. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "You matter here too.",
"sub": "The full guide has more, whenever you want it.",
"say": "You matter here too, not only the one you care for. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-caregiving-helper",
"guide": "caregiving",
"side": "helper",
"title": "Caring for Someone Who Is Ill",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Caring for Someone Who Is Ill",
"sub": "For the Helper",
"say": "If someone you know is caring for a person who is ill, this is for you. Your help can be the thing that keeps a caregiver going."
},
{
"k": "big",
"h": "Caregivers often feel invisible.",
"sub": "Everyone asks about the one who is sick.",
"say": "Caregivers often feel invisible. Everyone asks about the one who is sick, and the caregiver answers, again and again, while their own tiredness goes unseen. You can be the person who sees them."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How are you doing? Not him, you.\"",
"\"I can sit with her Thursday afternoon.\"",
"\"You can tell me the hard parts.\""
],
"say": "Here are words that help. How are you doing? Not him, you. I can sit with her Thursday afternoon, so you can have a break. And you can tell me the hard parts. Caregivers often carry feelings they can't say at home, like resentment or wishing it were over. Hearing them without shock is a kindness."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"You're a saint,\" with no help offered.",
"\"Let me know if you need anything.\"",
"\"You need to take better care of yourself.\""
],
"say": "Some words, meant kindly, leave them more alone. You're a saint, with no help offered, can sound like the job is theirs forever. Let me know if you need anything puts the asking back on them. And you need to take better care of yourself, without a way to do it, adds one more task. Pair your words with help."
},
{
"k": "points",
"h": "Help that lasts",
"items": [
[
"Take a regular shift",
"Same day, same time, every week"
],
[
"Meals, lawn, errands",
"The tasks that pile up"
],
[
"A ride, a phone call",
"Appointments and long evenings"
]
],
"say": "Help that lasts is regular. Take a shift: the same afternoon, every week, so they can count on it. Bring meals, mow the lawn, run the errands that pile up. Drive to an appointment. Call on the long evenings. Small, steady help often means more than one big gesture."
},
{
"k": "big",
"h": "Pick a shift.",
"say": "Take a moment. Picture the caregiver you know. Choose one task and one time you could offer, every week. Then write the text you'll send them today.",
"beats": [
"Take a moment.",
"Picture the caregiver you know.",
"Choose one task and one time you could offer, every week.",
{
"t": "Then write the text you'll send them today.",
"w": 12
}
]
},
{
"k": "big",
"h": "Watch for empty",
"sub": "Thoughts of ending their life: call or text 988.",
"say": "Watch, gently, for signs a caregiver is running on empty: health slipping, deep tiredness that doesn't lift, losing their temper in ways that scare them. Help them talk with their doctor or a caregiver support group. If they speak of ending their life, help them call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Keep your help steady, too.",
"sub": "Offer what you can keep giving.",
"say": "Offer what you can keep giving, not more. A small shift you show up for every week helps more than a big promise you can't keep. And if their situation stirs your own worries about someone you love, talk with someone you trust."
},
{
"k": "big",
"h": "See the caregiver.",
"sub": "The full guide has more, whenever you want it.",
"say": "See the caregiver, and keep showing up. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "dementia-care",
"ring": "health",
"title": "Caring for Someone with Dementia",
"you": {
"id": "ok-g-dementia-care-you",
"guide": "dementia-care",
"side": "you",
"title": "Caring for Someone with Dementia",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Caring for Someone with Dementia",
"sub": "For You",
"say": "If someone you love has dementia, and you are the one caring for them, this is for you. Take what helps today, and leave the rest for later."
},
{
"k": "big",
"h": "A long goodbye.",
"sub": "Grief begins long before death.",
"say": "Dementia is often called a long goodbye. The person is here, and also slipping away, a little at a time. So grief can begin years before a death. If you find yourself grieving someone who is still alive, that is not strange. It is one of the hardest kinds of loss there is."
},
{
"k": "words",
"h": "All of it makes sense",
"items": [
"Heartbroken",
"Frustrated, then guilty",
"Worn down",
"Worried about safety"
],
"say": "You may feel heartbroken when they don't know your name. Frustrated by the same question for the tenth time, and then guilty for feeling frustrated. Worn down. Worried about wandering, the stove, the car keys. All of it makes sense. It comes from loving someone through something very hard."
},
{
"k": "points",
"h": "Meet them where they are",
"items": [
[
"Join their world",
"Correcting often causes distress"
],
[
"Look for the need",
"Behavior is communication"
],
[
"Keep it familiar",
"Music, photos, routines"
]
],
"say": "Here is what often helps. Meet them where they are. If Mom is waiting for a husband who died years ago, correcting her may make her grieve him all over again. Join her world with kindness instead. Look for the need underneath behavior: pain, hunger, fear, a full bladder, too much noise. And keep things familiar. Music, photos, and routines often reach them when words don't."
},
{
"k": "big",
"h": "What might they need?",
"say": "Let's try this. Think of one hard moment from this week. Maybe they were upset, or said something that hurt. Now ask yourself gently: what might they have needed right then?",
"beats": [
"Let's try this.",
"Think of one hard moment from this week.",
"Maybe they were upset, or said something that hurt.",
{
"t": "Now ask yourself gently: what might they have needed right then?",
"w": 12
}
]
},
{
"k": "big",
"h": "They still feel love.",
"sub": "Even when they can't remember it.",
"say": "They may not remember your visit an hour later. The feeling often stays longer than the memory. They still feel love, even when they can't remember it. What you give them still matters."
},
{
"k": "points",
"h": "Get support early",
"items": [
[
"Alzheimer's Association, 24/7",
"1-800-272-3900"
],
[
"Adult day programs, respite",
"So you can rest"
],
[
"Legal and money plans",
"While they can still take part"
]
],
"say": "Get support early, not only in a crisis. The Alzheimer's Association helpline is open every hour of every day: 1-800-272-3900. Look into adult day programs and respite, so you can rest. And make legal and financial plans while your person can still take part. A caregiver support group can help you carry all of it."
},
{
"k": "big",
"h": "When it gets to be too much",
"sub": "Call the helpline, any hour: 1-800-272-3900.",
"say": "If you feel at the end of your rope, call the helpline, any hour. If wandering, driving, or safety at home worries you, talk with their doctor soon. If you have thoughts of ending your life, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Love still reaches them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your love still reaches them, even on the days it doesn't seem to. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-dementia-care-helper",
"guide": "dementia-care",
"side": "helper",
"title": "Caring for Someone with Dementia",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Caring for Someone with Dementia",
"sub": "For the Helper",
"say": "If someone you know has dementia, or is caring for someone who does, this is for you. Visiting can be hard. It still matters."
},
{
"k": "big",
"h": "Caregivers get lonely.",
"sub": "Often friends stop coming.",
"say": "Families caring for someone with dementia are often isolated and overwhelmed. Friends stop coming, sometimes because they don't know what to say, or they're afraid the person won't know them. Your visit can break that loneliness, for both of them."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'd love to visit. What should I know?\"",
"\"Can I take a shift so you can rest?\"",
"\"Tell me what she used to love.\""
],
"say": "Here are words that help. I'd love to visit. What should I know? The caregiver knows what works, and asking honors that. Can I take a shift so you can rest? And tell me what she used to love. It gives you songs, stories, and photos to bring."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"She doesn't know who you are anyway.\"",
"\"Don't you remember me?\"",
"\"You already told me that.\""
],
"say": "Some words close the door. She doesn't know who you are anyway, because the visit still matters, to her and to the family. Don't you remember me? It puts the person on a test they can't pass. And you already told me that. Just answer again, kindly, as if for the first time."
},
{
"k": "story",
"title": "Love.",
"lines": [
"Kathy's dementia has taken most of her words. The charts call what's left word salad.",
"I listen for the one real word hiding inside the scatter.",
"When I catch it, I say it back to her. She knows she's been heard."
],
"lesson": "Listen for the one real word.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/love",
"label": "Read the Full Story: Love."
},
"hold": 2,
"say": "I've been visiting a woman named Kathy for over a year. Her dementia has taken most of her words. What's left, the charts call word salad. I've never liked that term. Most people would hear nonsense. I listen for the one real word hiding inside the scatter. When I catch it, I say it back to her. She knows she's been heard."
},
{
"k": "points",
"h": "On the visit",
"items": [
[
"Say your name",
"\"Hi, Mom, it's Anna.\""
],
[
"Bring music",
"Songs from their younger years"
],
[
"Follow their lead",
"Join their world, gently"
]
],
"say": "On the visit, say your name as you greet them, so they don't have to search for it. Bring music, especially songs from their younger years. Follow their lead. If they talk about something from long ago as if it were today, go there with them. Listen for one real word, and say it back."
},
{
"k": "big",
"h": "Say it back.",
"say": "Let's try it. Picture the person you visit. Think of one word they still say, or a song they still know. Say it softly now, the way you'll say it back to them.",
"beats": [
"Let's try it.",
"Picture the person you visit.",
"Think of one word they still say, or a song they still know.",
{
"t": "Say it softly now, the way you'll say it back to them.",
"w": 10
}
]
},
{
"k": "points",
"h": "Help the caregiver",
"items": [
[
"Visit regularly",
"Same day each week"
],
[
"Give them a break",
"Stay so they can leave"
],
[
"Know the helpline",
"1-800-272-3900, any hour"
]
],
"say": "Help the caregiver, too. Visit regularly, the same day each week if you can. Stay with your friend so the caregiver can leave the house. And know the Alzheimer's Association helpline, open any hour: 1-800-272-3900. If you ever worry someone is being harmed or neglected, in Minnesota call MAARC at 1-844-880-1574. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Visits can stir grief.",
"sub": "Yours counts too.",
"say": "Visits can stir your own grief for who they were. Let yourself feel it on the drive home, and talk with someone you trust. It doesn't mean the visit failed."
},
{
"k": "big",
"h": "Your visit still matters.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your visit still matters, even if they don't remember it. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "disability",
"ring": "health",
"title": "Living with a New Disability",
"you": {
"id": "ok-g-disability-you",
"guide": "disability",
"side": "you",
"title": "Living with a New Disability",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with a New Disability",
"sub": "For You",
"say": "If you are living with a new disability, from an injury, a stroke, an illness, or a change in your sight, hearing, or movement, this is for you. Go at your own pace."
},
{
"k": "big",
"h": "Grief is a healthy response.",
"sub": "For the life you planned.",
"say": "Adjusting to a new disability often brings grief. You may grieve the life you planned, the way you moved through a day, the things you did without thinking. That grief is a healthy response to a real change. It doesn't mean you are giving up."
},
{
"k": "words",
"h": "Some days bring",
"items": [
"Hope",
"Anger",
"Frustration",
"Worry about work and money",
"Pride in small wins"
],
"say": "Some days bring hope, and some bring anger. Everyday tasks can be frustrating. You may worry about work, money, and relationships. And some days bring real pride in a small win. All of it is normal. Both kinds of days belong to adjusting."
},
{
"k": "big",
"h": "My body changed. My worth didn't.",
"say": "Here's something to hold onto. Your worth was never about what your body could do. Put a hand on your heart, if that feels okay. Say it slowly, out loud or inside. My body changed. My worth didn't.",
"beats": [
"Here's something to hold onto.",
"Your worth was never about what your body could do.",
"Put a hand on your heart, if that feels okay.",
"Say it slowly, out loud or inside.",
{
"t": "My body changed. My worth didn't.",
"w": 12
}
]
},
{
"k": "points",
"h": "Practical help opens up life",
"items": [
[
"Therapy and tools",
"Ask your care team"
],
[
"Adaptations at home and work",
"Small changes, big difference"
],
[
"Benefits and resources",
"Look up what your state offers"
]
],
"say": "Practical help can open up a lot of life. Ask your care team about therapy, tools, and devices that fit how you live. Small adaptations at home and at work can make a big difference. And look up disability resources in your state, for benefits, transportation, and job help. In Minnesota, the Disability Hub is a good place to start."
},
{
"k": "big",
"h": "Adapting is a skill.",
"sub": "And you're learning it.",
"say": "Adapting is a skill, and you're learning it. Rebuild your routines around what works now, not around what used to. Some things will take longer. Some will be done a new way. And some you'll let others help with, while you keep your say."
},
{
"k": "words",
"h": "Try saying",
"items": [
"\"Here's what helps me, and here's what I'd rather do myself.\""
],
"say": "People may jump in to help, or hold back, not sure what to do. You can teach them. Try saying: here's what helps me, and here's what I'd rather do myself. Letting people help doesn't mean giving up your say."
},
{
"k": "big",
"h": "Others have walked this road.",
"sub": "They are often the best guides.",
"say": "Other people living with the same disability are often the best guides. They know the tools, the shortcuts, the hard days, and the good ones. A support group, in person or online, can be a place where you don't have to explain."
},
{
"k": "big",
"h": "If the sadness won't lift",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "If sadness or hopelessness doesn't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your life still has room to grow.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your life still has room to grow, in new ways. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-disability-helper",
"guide": "disability",
"side": "helper",
"title": "Living with a New Disability",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with a New Disability",
"sub": "For the Helper",
"say": "If someone you love is adjusting to a new disability, this is for you. Your steady presence matters, for the long haul."
},
{
"k": "big",
"h": "They are still the expert on their life.",
"say": "They may feel grief, frustration, and fear about losing independence. One of the most helpful things you can do is remember they are still the expert on their own life. Your job is to stand beside them, not to take over."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What would be most helpful?\"",
"\"I'm here for the long haul.\"",
"\"Want help with that, or should I wait?\""
],
"say": "Here are words that help. What would be most helpful? I'm here for the long haul. And in the moment: want help with that, or should I wait? Asking first lets them keep their say."
},
{
"k": "points",
"h": "What to set aside",
"items": [
[
"Doing everything for them",
"Without asking first"
],
[
"Talking about them",
"Instead of to them"
],
[
"\"At least it wasn't worse.\"",
"It shrinks the loss"
]
],
"say": "Some things, meant kindly, hurt. Doing everything for them without asking can take away the independence they're working to rebuild. Talking about them instead of to them, especially with doctors or strangers. And at least it wasn't worse, which shrinks what they've lost."
},
{
"k": "points",
"h": "Keep inviting them",
"items": [
[
"Make gatherings accessible",
"Steps, seating, sound, lighting"
],
[
"Ask what works",
"Before you plan"
],
[
"Keep the invitations coming",
"Isolation is a real risk"
]
],
"say": "Keep inviting them. Isolation is a real risk, and it often grows quietly when friends aren't sure what to do. Make gatherings accessible: think about steps, seating, bathrooms, noise, and lighting. Ask what works before you plan. And keep the invitations coming, even if they sometimes say no."
},
{
"k": "big",
"h": "Ask before helping.",
"say": "Let's try it. Picture the person you're walking beside. Think of one thing you usually do for them. Now say the question you'll ask next time: want help with that, or should I wait?",
"beats": [
"Let's try it.",
"Picture the person you're walking beside.",
"Think of one thing you usually do for them.",
{
"t": "Now say the question you'll ask next time: want help with that, or should I wait?",
"w": 10
}
]
},
{
"k": "big",
"h": "When to help them reach out",
"sub": "Thoughts of not wanting to live: call or text 988.",
"say": "Watch, gently, for sadness or hopelessness that doesn't lift. You can help them talk with their doctor or a counselor. If they speak of not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "This changes your life too.",
"sub": "Your feelings count.",
"say": "Caring for someone adjusting to disability is a big change for you too. Your routines, your plans, and your worries shift with theirs. You may grieve as well. Talk with someone you trust, and find support of your own."
},
{
"k": "big",
"h": "Stay for the long haul.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay for the long haul, and keep asking what helps. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "eating",
"ring": "health",
"title": "Eating Disorders",
"you": {
"id": "ok-g-eating-you",
"guide": "eating",
"side": "you",
"title": "Eating Disorders",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Eating Disorders",
"sub": "For You",
"say": "If thoughts about food, eating, or your body have been taking up more and more room, this is for you. Watch as much as you want, at your own pace."
},
{
"k": "big",
"h": "A real illness, not a choice.",
"sub": "Anyone can have one, at any age, in any body.",
"say": "Here is the first thing to know. Eating disorders are serious medical illnesses, not choices and not vanity. Anyone can have one, at any age, in any body. And recovery is real."
},
{
"k": "points",
"h": "What it can feel like",
"items": [
[
"Rules",
"About what, when, and how"
],
[
"Secrecy",
"Hiding meals or habits"
],
[
"Guilt after eating",
"Or a voice that argues back"
],
[
"Out of control",
"Around food, or afraid of it"
]
],
"say": "It can feel like rules about what, when, and how you eat. Secrecy, hiding meals or habits from the people around you. Guilt after eating, or a voice in your head that argues back whenever you try to change. Or feeling out of control around food. If any of that sounds familiar, you deserve help."
},
{
"k": "big",
"h": "Start with a doctor visit.",
"sub": "Tell them honestly what is going on.",
"say": "If you are worried, start with a doctor visit. Tell them honestly what is going on, even the parts that feel embarrassing. You might say, I've been struggling with food and my body, and I think I need help. That one sentence is a strong first step."
},
{
"k": "points",
"h": "What helps recovery",
"items": [
[
"A team",
"Doctor, therapist, dietitian"
],
[
"Eating disorder specialists",
"People who know this illness"
],
[
"Regular meals",
"As your team guides"
],
[
"Less comparison",
"Fewer accounts that push dieting"
]
],
"say": "Recovery usually takes a team: a doctor, a therapist, and a dietitian, ideally people who specialize in eating disorders. Regular meals and snacks, as your team guides. And less time with accounts, apps, or people that push dieting or body comparison. You get to protect your recovery."
},
{
"k": "card",
"title": "Tell one person you trust.",
"body": "ANAD Helpline: 1-888-375-7767, for support and treatment options.",
"say": "Tell one person you trust. Secrecy gives the illness room to grow, and telling someone takes some of that room back. You can also call the ANAD Helpline, at one eight eight eight, three seven five, seven seven six seven, for support and treatment options."
},
{
"k": "words",
"h": "Words to tell yourself",
"items": [
"My body deserves to be fed, even when my thoughts say otherwise.",
"I am more than my body.",
"Asking for help is part of recovery."
],
"say": "Hand on your chest, if you like. Take one slow breath. Now say these words to yourself, quietly or out loud. My body deserves to be fed, even when my thoughts say otherwise. I am more than my body. Asking for help is part of recovery.",
"beats": [
"Hand on your chest, if you like.",
"Take one slow breath.",
"Now say these words to yourself, quietly or out loud.",
"My body deserves to be fed, even when my thoughts say otherwise.",
"I am more than my body.",
{
"t": "Asking for help is part of recovery.",
"w": 10
}
]
},
{
"k": "card",
"title": "Fainting or chest pain? Call 911.",
"body": "Also a racing or uneven heartbeat, or confusion. Thoughts of suicide: call or text 988.",
"say": "Some signs need help right away. Call nine one one for fainting, chest pain, a racing or uneven heartbeat, or confusion. If you have thoughts of suicide, call or text nine eight eight. You deserve help the moment you need it."
},
{
"k": "big",
"h": "Recovery is real.",
"sub": "The full guide has more, whenever you want it.",
"say": "Recovery is real, and it is yours to claim, one meal and one honest conversation at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-eating-helper",
"guide": "eating",
"side": "helper",
"title": "Eating Disorders",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Eating Disorders",
"sub": "For the Helper",
"say": "This is for the family member or friend who is worried about someone and food, or walking beside them in recovery. Your calm, steady presence matters."
},
{
"k": "big",
"h": "The illness often argues back.",
"sub": "Speak to the person underneath it.",
"say": "The person you love may feel ashamed, defensive, or afraid of losing control. The illness often argues back. When it does, remember you are speaking to the person underneath it, and they are still there."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I care about you, and I've been worried.",
"I've noticed you're skipping meals and seem stressed at dinner.",
"Will you see a doctor with me?"
],
"say": "Here are words that help. I care about you, and I've been worried. Then describe what you see, without talking about weight. I've noticed you're skipping meals and seem stressed at dinner. And, will you see a doctor with me?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Comments on weight or looks",
"Including praise"
],
[
"Arguing about food",
"Or policing their plate"
],
[
"Waiting for the bottom",
"Earlier help is better"
]
],
"say": "A few things are best left out. Comments about their weight or looks, including praise, even when you mean it kindly. Arguing about food, or policing their plate on your own. And waiting for them to hit bottom. Earlier help is better help."
},
{
"k": "big",
"h": "Practice the opening line.",
"sub": "Calm and kind.",
"say": "Take a moment. Picture a calm, private time with them. Now say it softly: I care about you, and I've been worried.",
"beats": [
"Take a moment.",
"Picture a calm, private time with them.",
{
"t": "Now say it softly: I care about you, and I've been worried.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Go with them",
"To the doctor"
],
[
"Calm meals together",
"Talk about other things"
],
[
"For a child or teen",
"Ask about family-based treatment"
]
],
"say": "Here is what helps. Go with them to the doctor. Keep meals calm and together, and talk about other things at the table. And for a child or teen, families are a key part of treatment. Ask the doctor about family-based treatment."
},
{
"k": "card",
"title": "If they push back, stay steady.",
"body": "Try: \"I love you. I'm not going anywhere. Let's ask the doctor together.\"",
"say": "If they get angry or deny it, that is common. The illness often argues back. Skip the debate, and stay steady. You might say, I love you. I'm not going anywhere. Let's ask the doctor together. Then try again another calm day."
},
{
"k": "card",
"title": "Fainting or chest pain? Call 911.",
"body": "Also a racing or uneven heartbeat, or confusion. Thoughts of suicide: call or text 988.",
"say": "Some signs need help right away. Call nine one one for fainting, chest pain, a racing or uneven heartbeat, or confusion. If they talk about suicide, call or text nine eight eight together."
},
{
"k": "big",
"h": "This is exhausting. Get support too.",
"sub": "Caregiver groups, like ANAD's, can help.",
"say": "Loving someone with an eating disorder is exhausting. Caregiver support groups, like the ones ANAD offers, can help you feel less alone. Rest, eat well yourself, and talk with someone you trust."
},
{
"k": "big",
"h": "Steady, calm, and close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Recovery is real. Stay steady, calm, and close, and let the team carry the medical part. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "accident",
"ring": "health",
"title": "After a Car Accident or Sudden Injury",
"you": {
"id": "ok-g-accident-you",
"guide": "accident",
"side": "you",
"title": "After a Car Accident or Sudden Injury",
"sideName": "For You",
"mins": 4,
"sources": [
"tangney"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Car Accident or Sudden Injury",
"sub": "For You",
"say": "If you've been in a car accident, or hurt suddenly, this is for you. Watch as much or as little as you want. You can stop any time."
},
{
"k": "big",
"h": "Your body and mind are still catching up.",
"sub": "Shock and jumpiness are normal in the first weeks.",
"say": "Here is the first thing to know. Your body and mind are still catching up. Shaking, numbness, replaying it, and jumpiness are normal in the first weeks. Your body's alarm went off, and it takes a while to settle."
},
{
"k": "points",
"h": "What you may notice",
"items": [
[
"Shaky or numb",
"Or suddenly angry"
],
[
"Replaying it",
"Sounds and moments that come back"
],
[
"Poor sleep",
"Rest in pieces"
],
[
"Fear of the road",
"Driving or riding feels hard"
]
],
"say": "You may notice some of these. Feeling shaky, numb, or suddenly angry. Replaying it, with sounds or moments that come back. Poor sleep, with rest coming in pieces. And fear of the road, where driving or even riding in a car feels hard. All of it is common."
},
{
"k": "card",
"title": "See a doctor, even if you feel fine.",
"body": "Some injuries show up later. Go to the ER for head injury signs that get worse.",
"say": "See a doctor, even if you feel fine, because some injuries show up later. Follow up on anything that gets worse. If you have a headache that gets worse, repeated vomiting, confusion, slurred speech, weakness, or a seizure, go to the emergency room."
},
{
"k": "big",
"h": "Breathe out longer than you breathe in.",
"sub": "I'm safe now.",
"say": "Let's settle the alarm a little, right now. Feel your feet on the floor, or your back against the chair. Breathe in for a count of four. Breathe out slowly for a count of six. Then, when it's true, say quietly: I'm safe now.",
"beats": [
"Let's settle the alarm a little, right now.",
"Feel your feet on the floor, or your back against the chair.",
"Breathe in for a count of four.",
"Breathe out slowly for a count of six.",
{
"t": "Then, when it's true, say quietly: I'm safe now.",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Rest and sleep",
"Your body is healing"
],
[
"Hand off the paperwork",
"Let someone help with calls"
],
[
"A simple notebook",
"Appointments, costs, calls"
],
[
"Small steps back",
"To driving, at your pace"
]
],
"say": "Here is what helps. Rest, and sleep when you can, because your body is healing. Let someone else handle calls and paperwork for a few days. The insurance and the forms can be handled by the right people. Keep a simple notebook for appointments, costs, and calls. And go back to driving in small steps, at your own pace."
},
{
"k": "card",
"title": "If you were driving",
"body": "Guilt can be heavy. You still deserve support and healing.",
"say": "If you were driving, or think it was your fault, guilt can be heavy. Guilt about something that happened is different from deciding you are a bad person. You still deserve support, rest, and healing. Questions of fault belong with the people whose job it is to sort them out."
},
{
"k": "card",
"title": "You choose how much to tell.",
"body": "Try: \"I'm still shaken up. Could you help me with rides for a bit?\"",
"say": "You don't owe anyone the story. Tell what you want, when you want. Talking it through with someone who listens can help. And it's okay to ask for practical help. You might say, I'm still shaken up from the accident. Could you help me with rides for a bit?"
},
{
"k": "card",
"title": "Still strong after a month? Reach out.",
"body": "Talk with your doctor about trauma therapy. Thoughts of suicide: call or text 988. Danger now: 911.",
"say": "If fear, nightmares, or flashbacks last more than a month, talk with your doctor and ask about trauma-focused therapy. It helps many people. If you have thoughts of suicide, call or text nine eight eight. If you are in danger right now, call nine one one."
},
{
"k": "big",
"h": "I'm safe now.",
"sub": "The full guide has more, whenever you want it.",
"say": "Go gently. Your body and mind are still catching up, and that's normal. You're safe now. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-accident-helper",
"guide": "accident",
"side": "helper",
"title": "After a Car Accident or Sudden Injury",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Car Accident or Sudden Injury",
"sub": "For the Helper",
"say": "This is for the family member or friend beside someone after a car accident or a sudden injury. At the hospital or at home, your steady presence helps."
},
{
"k": "big",
"h": "I'm so glad you're here.",
"sub": "Start there.",
"say": "Start with the simplest words. I'm so glad you're here. They may be in pain, embarrassed to need help, or carrying guilt about what happened. Gladness comes first."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm so glad you're here.",
"What would help most this week?",
"You can tell me about it, or not. Your choice."
],
"say": "Here are words that help. I'm so glad you're here. What would help most this week? And, you can tell me about it, or not. Your choice."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Whose fault was it?",
"Leave that to the right people"
],
[
"Other crash stories",
"They stir up the alarm"
],
[
"Pressing for details",
"Let them choose"
]
],
"say": "A few things are best left out. Asking whose fault it was. Leave that to the people whose job it is. Stories about other people's crashes, which can stir up the alarm again. And pressing for details. Let them choose what to tell."
},
{
"k": "points",
"h": "Practical help",
"items": [
[
"Drive them",
"To appointments"
],
[
"Bring meals",
"Easy to reheat"
],
[
"Calls and forms",
"With their permission"
],
[
"A night shift",
"At home or the hospital"
]
],
"say": "Practical help means a lot. Drive them to appointments. Bring meals. Help with calls and forms, with their permission, and keep a notebook of who said what. Sit with family at the hospital, or take a night shift at home so others can sleep."
},
{
"k": "big",
"h": "Picture sitting with them.",
"sub": "Nothing to fix.",
"say": "Take a moment. Picture yourself sitting beside them, with nothing to fix. Now say it softly: what would help most this week?",
"beats": [
"Take a moment.",
"Picture yourself sitting beside them, with nothing to fix.",
{
"t": "Now say it softly: what would help most this week?",
"w": 10
}
]
},
{
"k": "card",
"title": "Back to the road, in small steps.",
"body": "Ride along. Short, easy drives first. Their pace.",
"say": "Fear of driving or riding is common. Offer to ride along on short, easy drives first, at their pace. Small steps work better than a push. If the fear stays strong past a month, encourage them to ask their doctor about trauma-focused therapy."
},
{
"k": "card",
"title": "Watch for warning signs.",
"body": "Head injury signs that get worse: the ER. Thoughts of suicide: call or text 988. Danger now: 911.",
"say": "Watch for head injury signs that get worse, like a headache that grows, repeated vomiting, or confusion. That means the emergency room. If they talk about suicide, call or text nine eight eight together. If anyone is in danger right now, call nine one one."
},
{
"k": "big",
"h": "You are in a crisis too.",
"sub": "Eat, sleep when you can, and let others help.",
"say": "If someone you love is badly hurt, you are in a crisis too. Eat, sleep when you can, and let others help you. You can't pour from an empty cup."
},
{
"k": "big",
"h": "Steady presence is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the right words. Gladness, practical help, and steady presence are enough. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "porn",
"ring": "health",
"title": "Pornography That's Hard to Stop",
"you": {
"id": "ok-g-porn-you",
"guide": "porn",
"side": "you",
"title": "Pornography That's Hard to Stop",
"sideName": "For You",
"mins": 4,
"sources": [
"tangney",
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Pornography That's Hard to Stop",
"sub": "For You",
"say": "If you've been caught in a cycle with pornography, wanting to stop and finding it hard to, this is for you. You are not alone, and you can find a way forward."
},
{
"k": "points",
"h": "How the cycle can feel",
"items": [
[
"An urge",
"Often when tired, alone, or stressed"
],
[
"Use",
"Longer than you meant"
],
[
"Regret",
"And a promise to stop"
],
[
"Secrecy",
"Which makes the next round easier"
]
],
"say": "Many people know this cycle. An urge, often when you're tired, alone, or stressed. Use, often longer than you meant. Then regret, and a promise that this was the last time. And secrecy, which quietly makes the next round easier."
},
{
"k": "big",
"h": "Shame feeds the cycle.",
"sub": "Honesty and support help break it.",
"say": "Here's something important. Shame tends to feed the cycle. When you feel like a bad person, you hide, and hiding is where the cycle grows. It helps to hold this instead. I did something I want to change. That points you toward a next step, not toward hiding."
},
{
"k": "flow",
"h": "Notice what comes right before",
"steps": [
[
"Stress",
"A hard day, a hard conversation"
],
[
"Loneliness",
"Feeling unseen or far from people"
],
[
"Boredom",
"Nothing to reach for"
],
[
"Late nights",
"Worn out, alone with a screen"
]
],
"say": "Start by noticing what comes right before the urge. Stress, after a hard day. Loneliness, feeling unseen or far from people. Boredom. Or late nights, when you're worn out and alone with a screen. The urge is often a signal of a real need underneath."
},
{
"k": "big",
"h": "What do I really need right now?",
"sub": "Rest, connection, movement, or purpose.",
"say": "Let's try something. Think of the last time the urge came. Picture where you were, and what kind of day it had been. Now ask, what did I really need in that moment? Name it to yourself: rest, connection, movement, or purpose.",
"beats": [
"Let's try something.",
"Think of the last time the urge came.",
"Picture where you were, and what kind of day it had been.",
"Now ask, what did I really need in that moment?",
{
"t": "Name it to yourself: rest, connection, movement, or purpose.",
"w": 12
}
]
},
{
"k": "points",
"h": "Add some friction",
"items": [
[
"Filters",
"On the devices you use most"
],
[
"Devices out of the bedroom",
"Charge them in another room"
],
[
"A plan for worn-out nights",
"A call, a walk, or sleep"
]
],
"say": "Then make the cycle a little harder to start. Add filters on the devices you use most. Keep devices out of the bedroom, and charge them in another room. And have a plan for the nights when you're alone and worn out: a call, a walk, or simply going to sleep."
},
{
"k": "words",
"h": "Tell one trusted person",
"items": [
"I've been struggling with porn, and I want to be honest with you about it."
],
"say": "Secrecy loses its grip when you tell one trusted person the truth. You could say, I've been struggling with porn, and I want to be honest with you about it. A counselor who knows this struggle, a support or accountability group, faith-based or not, or a faith leader you trust can all walk with you."
},
{
"k": "words",
"h": "When you slip",
"items": [
"A slip is not a verdict on who I am.",
"I can choose the next right thing."
],
"sub": "Speak to yourself like a friend.",
"say": "Slips can happen. When they do, speak to yourself like you would to a friend. A slip is not a verdict on who I am. I can choose the next right thing. Kindness toward yourself makes it easier to keep going, and to keep being honest."
},
{
"k": "card",
"title": "If it goes further",
"body": "Drawn to images of anyone under 18: get confidential help from Stop It Now before anyone is harmed. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "Two more things. If you are ever drawn to sexual images of anyone under eighteen, stop, and get confidential help from Stop It Now before anyone is harmed. And if the shame gets so heavy you have thoughts of suicide, call or text 988. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "A slip is not a verdict on who you are.",
"sub": "The full guide has more, whenever you want it.",
"say": "A slip is not a verdict on who you are. Honesty and support help break the cycle, one next right thing at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-porn-helper",
"guide": "porn",
"side": "helper",
"title": "Pornography That's Hard to Stop",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Pornography That's Hard to Stop",
"sub": "For the Helper",
"say": "If someone has told you they're struggling with pornography, or you're a partner who has just found out, this is for you."
},
{
"k": "big",
"h": "Two different places to stand.",
"sub": "A friend, or a partner.",
"say": "Where you stand makes a difference. A friend or family member may be the first person they've ever told. A partner has been hurt, and is now being asked to help. Both are real. Both deserve support."
},
{
"k": "words",
"h": "If a friend tells you",
"items": [
"Thank you for telling me the truth.",
"What kind of help are you looking for?"
],
"say": "If a friend tells you, they may be afraid you'll see them differently. Start here. Thank you for telling me the truth. Then ask, what kind of help are you looking for? Let them lead. Some want a listener. Some want help finding a counselor or a group."
},
{
"k": "words",
"h": "If you are the partner",
"items": [
"This hurts, and I need some time."
],
"sub": "Your hurt is real.",
"say": "If you're the partner, your hurt is real. Shock, anger, and questions about your own worth are common. You can say, this hurts, and I need some time. That's honest, and it's enough for now. Try not to make every big decision in the first days after finding out."
},
{
"k": "words",
"h": "Practice saying it",
"items": [
"Thank you for telling me the truth."
],
"sub": "Slowly, and steady.",
"say": "Let's practice. Picture the person who told you, sitting across from you. Take one slow breath. Now say, out loud, thank you for telling me the truth.",
"beats": [
"Let's practice.",
"Picture the person who told you, sitting across from you.",
"Take one slow breath.",
{
"t": "Now say, out loud, thank you for telling me the truth.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Encourage counseling",
"With someone who knows this"
],
[
"Couples counseling",
"When you are both ready"
],
[
"Skip the full-time monitor role",
"It wears you both down"
]
],
"say": "What helps? Encourage counseling with someone experienced in this struggle. Consider couples counseling when you're both ready. And step out of the role of full-time monitor. Checking their phone every night wears you both down, and recovery needs to be theirs."
},
{
"k": "card",
"title": "Keep safety close",
"body": "Anything involving minors: get help now. Report abuse material at report.cybertip.org. Thoughts of suicide: 988. Danger right now: 911.",
"say": "Keep safety close. If anything involves minors, that is illegal and deeply harmful: stop, and get help now. Abuse material can be reported at report dot cybertip dot org. If they talk about suicide, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Get support for yourself, too.",
"sub": "Someone safe to talk to.",
"say": "Get support for yourself, too. If you're the partner, see the Betrayal guide, and find someone safe to talk to, a counselor, a friend, or a group of your own. If you're a friend, notice what this stirred in you, and keep their story private."
},
{
"k": "big",
"h": "Thank you for telling me the truth.",
"sub": "The full guide has more, whenever you want it.",
"say": "Thank them for the truth, tend to your own hurt, and let the next step be theirs to take. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "gambling",
"ring": "health",
"title": "Gambling That's Out of Control",
"you": {
"id": "ok-g-gambling-you",
"guide": "gambling",
"side": "you",
"title": "Gambling That's Out of Control",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Gambling That's Out of Control",
"sub": "For You",
"say": "If gambling has gotten bigger than you, the betting, the losses, or the secrets, this is for you. Gambling disorder is a real addiction, and it can be treated."
},
{
"k": "points",
"h": "How it can feel",
"items": [
[
"Chasing losses",
"One more bet to win it back"
],
[
"Hiding",
"Bets, accounts, or money"
],
[
"Broken promises",
"To stop, and not being able to"
],
[
"Panic",
"About the debt"
]
],
"say": "It can look like this. Chasing losses, sure that one more bet will win it back. Hiding bets, accounts, or money. Promising to stop, and not being able to. And panic about the debt, with shame sitting right under it."
},
{
"k": "big",
"h": "The next bet won't fix this.",
"sub": "Getting help will.",
"say": "Here's the hardest truth, and the most hopeful one. The next bet won't fix this. The hope of one big win is part of how gambling keeps its hold. Getting help will fix more than any win could."
},
{
"k": "points",
"h": "Put barriers in place",
"items": [
[
"Block apps and sites",
"On every device"
],
[
"Self-exclusion",
"At casinos and betting sites"
],
[
"Hand over the cards",
"Let someone hold the money"
]
],
"say": "Make gambling harder to reach. Block gambling apps and sites on every device. Ask about self-exclusion at casinos and betting sites, which lets you ban yourself from playing. And let someone you trust hold the money for a while: hand over the cards, and set limits on shared accounts. Barriers do the work when willpower is tired."
},
{
"k": "card",
"title": "Help in Minnesota",
"body": "Minnesota Problem Gambling Helpline: 1-800-333-4673, or text HOPE to 53342. Outside Minnesota: 1-800-GAMBLER.",
"say": "In Minnesota, call the Problem Gambling Helpline at 1-800-333-4673, or text HOPE to 53342. Treatment is often at no cost for gamblers and their families. Outside Minnesota, call 1-800-GAMBLER."
},
{
"k": "words",
"h": "Tell one person the whole truth",
"items": [
"I have a gambling problem, and I need help.",
"Here is how bad it is."
],
"say": "Secrets keep gambling going. Tell one person the full truth about the money. You could say, I have a gambling problem, and I need help. Here is how bad it is. Then let them help you face the debt with a plan, alongside a financial counselor."
},
{
"k": "big",
"h": "One honest step today is enough.",
"sub": "Say it, then choose your step.",
"say": "Let's try it. Take one slow breath. Say out loud, one honest step today is enough. Now choose your one step: a call, a block, or a conversation.",
"beats": [
"Let's try it.",
"Take one slow breath.",
"Say out loud, one honest step today is enough.",
{
"t": "Now choose your one step: a call, a block, or a conversation.",
"w": 12
}
]
},
{
"k": "card",
"title": "If it feels hopeless",
"body": "Gambling problems raise the risk of suicide. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "Gambling debt can make things feel hopeless, and gambling problems raise the risk of suicide. If you have thoughts of ending your life, call or text 988. If you're in danger right now, call 911. No amount of money is worth your life."
},
{
"k": "big",
"h": "The next bet won't fix this. Getting help will.",
"sub": "The full guide has more, whenever you want it.",
"say": "The next bet won't fix this. Getting help will. One honest step today is enough. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-gambling-helper",
"guide": "gambling",
"side": "helper",
"title": "Gambling That's Out of Control",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Gambling That's Out of Control",
"sub": "For the Helper",
"say": "If someone you love is gambling more than they can afford, or you've just found out about the debt or the secrets, this is for you."
},
{
"k": "big",
"h": "They may be sure they can win it back.",
"sub": "Ashamed, defensive, or both.",
"say": "They may feel ashamed. They may be defensive. They may still be sure they can win it back. None of that means they don't love you. It's how gambling keeps its hold."
},
{
"k": "words",
"h": "What to say",
"items": [
"I love you, and I'm worried about the gambling.",
"There is help in Minnesota. I'll sit with you while you call."
],
"say": "Lead with love and with the plain truth. You could say, I love you, and I'm worried about the gambling. Then offer something concrete. There is help in Minnesota. I'll sit with you while you call. The helpline is 1-800-333-4673."
},
{
"k": "words",
"h": "Practice saying it",
"items": [
"I love you, and I'm worried about the gambling."
],
"sub": "Calm and steady.",
"say": "Let's practice. Picture them sitting across from you. Take one slow breath. Now say, out loud, I love you, and I'm worried about the gambling.",
"beats": [
"Let's practice.",
"Picture them sitting across from you.",
"Take one slow breath.",
{
"t": "Now say, out loud, I love you, and I'm worried about the gambling.",
"w": 10
}
]
},
{
"k": "points",
"h": "Protect the household",
"items": [
[
"Separate accounts",
"Keep essentials safe"
],
[
"Limits on shared cards",
"Or take their name off"
],
[
"No loans, just this once",
"It feeds the chase"
]
],
"say": "Protect the household money. Set up separate accounts so the rent and groceries are safe. Put limits on shared cards. Try not to pay off their debts without a plan, and don't lend money just this once. Bailouts can feed the chase. Help with the debt works best as part of treatment and a plan."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"The helpline",
"Call or text together"
],
[
"Treatment",
"A gambling counselor"
],
[
"Support groups",
"Gamblers Anonymous"
],
[
"A money plan",
"With a financial counselor"
]
],
"say": "What helps? Calling or texting the helpline, together if they want. Counseling with a gambling treatment provider. Gamblers Anonymous or another support group. And financial counseling, to face the debt with a plan."
},
{
"k": "card",
"title": "Watch for hopelessness",
"body": "Gambling problems raise the risk of suicide. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "Gambling problems raise the risk of suicide, especially when the debt comes to light. If they sound hopeless, ask them directly whether they're thinking about suicide. If they are, call or text 988 together. If they're in danger right now, call 911."
},
{
"k": "big",
"h": "Find support for yourself.",
"sub": "Even if they won't go.",
"say": "This hurts you too, in money, in trust, and in sleep. Find support for yourself, like Gam-Anon. In Minnesota, you can get counseling as an affected family member, even if they won't go."
},
{
"k": "big",
"h": "I love you, and I'm worried.",
"sub": "The full guide has more, whenever you want it.",
"say": "Lead with love, protect what you need to, and keep the door to help open. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "divorce",
"ring": "family",
"title": "Divorce or a Breakup",
"you": {
"id": "ok-g-divorce-you",
"guide": "divorce",
"side": "you",
"title": "Divorce or a Breakup",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Divorce or a Breakup",
"sub": "For You",
"say": "If your marriage or relationship has ended, or is ending, this is for you. Whether you chose it, they did, or it simply came apart, you belong here."
},
{
"k": "big",
"h": "This is a real loss.",
"sub": "Even if it was the right choice.",
"say": "The end of a relationship is a real loss, even if it was the right choice. You may be losing a partner, a home, a daily rhythm, and a future you pictured. Sometimes friends or family go with it too. It makes sense that this hurts."
},
{
"k": "words",
"h": "It can all show up together",
"items": [
"Grief",
"Anger",
"Relief",
"Fear",
"A strange freedom"
],
"say": "Grief, anger, relief, and fear can all show up together, sometimes in the same hour. You may second-guess everything, feel angry at them or at yourself, and find the evenings lonely. There may even be a strange mix of freedom and loss. None of it means you're doing this wrong."
},
{
"k": "points",
"h": "For the first hard weeks",
"items": [
[
"Lean on friends",
"Say yes when they call"
],
[
"Get good advice",
"Legal and financial, early"
],
[
"Keep routines steady",
"Meals, sleep, mornings"
]
],
"say": "For the first hard weeks, lean on friends. Say yes when they call, and tell them plainly: we're separating, and I could use some company and patience right now. Get good legal and financial advice early, so fear doesn't make the big decisions. And keep your routines steady. Meals, sleep, and mornings are small anchors."
},
{
"k": "card",
"title": "Keep the kids out of the middle.",
"body": "Let them love both parents. Keep adult details between adults.",
"say": "If you have kids, keep them out of the middle. Let them love both parents. Carry adult messages yourself, and keep the adult details between adults. Keep their routines as steady as you can. Kids often wonder if it's their fault, so tell them plainly that it isn't, and tell them more than once."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"This ending doesn't define my worth.",
"I can grieve and grow at the same time."
],
"sub": "Out loud, or quietly.",
"say": "Here are two things you can tell yourself. This ending doesn't define my worth. I can grieve and grow at the same time. Pick the one you need most, and say it now, out loud or quietly.",
"beats": [
"Here are two things you can tell yourself.",
"This ending doesn't define my worth.",
"I can grieve and grow at the same time.",
{
"t": "Pick the one you need most, and say it now, out loud or quietly.",
"w": 10
}
]
},
{
"k": "points",
"h": "Rebuild slowly",
"items": [
[
"Your routines",
"Small anchors for each day"
],
[
"Your friendships",
"Old ones and new ones"
],
[
"Your interests",
"The things you set aside"
],
[
"Your support",
"A counselor or a group"
]
],
"say": "Then rebuild slowly. Your routines. Your friendships, old ones and new ones. The interests you set aside along the way. And your support: counseling can help you sort through what happened, and a divorce support group can remind you that you aren't the only one. If your faith community feels uncertain right now, you still belong."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Danger right now: 911.",
"say": "If the sadness turns very deep, or you have thoughts of ending your life, call or text 988, any time. If home isn't safe for you or your kids, Oak's guide When Home Isn't Safe can help you take the next step. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You are more than this ending.",
"sub": "The full guide has more, whenever you want it.",
"say": "This chapter ended. You didn't. You are more than this ending. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-divorce-helper",
"guide": "divorce",
"side": "helper",
"title": "Divorce or a Breakup",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Divorce or a Breakup",
"sub": "For the Helper",
"say": "When someone you care about is going through a divorce or a breakup, this is for you. You don't need the right words. You need to keep showing up."
},
{
"k": "big",
"h": "They may be tired of the story.",
"sub": "You need the person, not the details.",
"say": "They may feel judged or embarrassed. They may be worn out from telling the story again and again. You don't need the details. You need the person."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm sorry. How are you really doing?",
"You don't have to explain anything to me.",
"Want to grab dinner Thursday?"
],
"say": "Here are words that help. I'm sorry. How are you really doing? You don't have to explain anything to me. And a plain invitation: want to grab dinner Thursday? Keep inviting them, even after a no."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Trashing the ex",
"Especially near the kids"
],
[
"\"I never liked him anyway\"",
"It reopens the wound"
],
[
"Taking over their story",
"It is still theirs to tell"
]
],
"say": "Some things are better left out. Trashing the ex, especially anywhere near the kids. Lines like, I never liked him anyway. It can leave them feeling foolish for every year they spent. And taking over their story. Let them tell it, and let them change their mind about how they feel."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Invitations",
"Keep them coming"
],
[
"Moves and boxes",
"Practical help counts"
],
[
"The lonely hours",
"Evenings and weekends"
],
[
"Their kids",
"A steady, kind adult"
]
],
"say": "What helps is often practical. Keep the invitations coming. Help with the move, the boxes, the new apartment. Check in during the lonely hours, like evenings and the weekends without the kids. And if there are kids, be a steady, kind adult who speaks well of both parents."
},
{
"k": "big",
"h": "Who could you invite this week?",
"say": "Take a moment. Think of the person going through this. Picture one place you could invite them this week. Send that text today.",
"beats": [
"Take a moment.",
"Think of the person going through this.",
"Picture one place you could invite them this week.",
{
"t": "Send that text today.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Deep depression or thoughts of suicide: 988. Not safe at home: When Home Isn't Safe. Danger now: 911.",
"say": "Watch, gently, for sadness that gets very deep or doesn't lift. You can help them find a counselor or a support group. If they talk about not wanting to live, help them call or text 988. If home isn't safe, Oak's guide When Home Isn't Safe has next steps. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Stay steady. Look after you.",
"sub": "Their ending may stir your own.",
"say": "If you're close to both people, you don't have to choose sides in front of them. Stay supportive without taking over. And notice what this stirs in you, about your own relationship or an old breakup. Talk with someone you trust."
},
{
"k": "big",
"h": "Keep inviting them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep inviting them, long after the papers are signed. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "marriage-strain",
"ring": "family",
"title": "When Your Marriage Is Struggling",
"you": {
"id": "ok-g-marriage-strain-you",
"guide": "marriage-strain",
"side": "you",
"title": "When Your Marriage Is Struggling",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Your Marriage Is Struggling",
"sub": "For You",
"say": "If your marriage is struggling, this is for you. Maybe you're stuck in the same argument, lonely inside the relationship, or quietly drifting apart. You belong here."
},
{
"k": "big",
"h": "Every long relationship has hard seasons.",
"sub": "A hard season is part of the story, not the end of it.",
"say": "Every long relationship has hard seasons. A new baby, an illness, money worries, a loss, or just years of busy days can pull two people apart. A hard season is part of the story. It doesn't have to be the end of it."
},
{
"k": "points",
"h": "How it can feel",
"items": [
[
"The same argument",
"Again and again"
],
[
"Lonely together",
"Side by side, far apart"
],
[
"Drifting",
"More like roommates"
]
],
"say": "It can feel like the same argument, again and again, about the dishes, the money, or the kids, when it's really about something deeper. It can feel lonely, even sitting side by side. Or it can feel like quiet drifting, more like roommates than partners."
},
{
"k": "big",
"h": "Repair matters more than never fighting.",
"sub": "A small repair counts.",
"say": "Every couple fights. What matters more is repair: coming back afterward, owning your part, and trying again. A small repair counts. I was short with you, and I'm sorry. Can we start over?"
},
{
"k": "flow",
"h": "When you talk",
"steps": [
[
"Pick a calm time",
"Not the heat of an argument"
],
[
"Start with your need",
"Not what they do wrong"
],
[
"Own your part",
"Even a small one"
]
],
"say": "When you want to talk, pick a calm time, not the heat of an argument. Start with what you need, not with what they do wrong. And own your part, even a small one. It makes room for them to own theirs."
},
{
"k": "words",
"h": "Turn a complaint into a need",
"items": [
"\"You never help.\"",
"\"I need help with dinner on weeknights.\""
],
"sub": "Start with \"I need.\"",
"say": "Let's try it. Think of one complaint you keep making. Now turn it into a need. Start with, I need. Say it quietly, the way you would want to hear it.",
"beats": [
"Let's try it.",
"Think of one complaint you keep making.",
"Now turn it into a need.",
"Start with, I need.",
{
"t": "Say it quietly, the way you would want to hear it.",
"w": 12
}
]
},
{
"k": "points",
"h": "Small things that help",
"items": [
[
"Time together",
"No screens, no logistics"
],
[
"Daily kindnesses",
"A coffee, a thank you"
],
[
"Help, early",
"A couples counselor"
]
],
"say": "Small things help. Regular time together, without screens or logistics. Small daily kindnesses, like a coffee made the way they like it, or a thank you. And help, early. Couples counseling works best before things are broken. You could say, I miss us. Can we find a counselor and work on this together?"
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"We can both be hurting and still choose to work on this."
],
"say": "Here's something you can tell yourself. We can both be hurting, and still choose to work on this."
},
{
"k": "big",
"h": "Safety comes first.",
"sub": "Abuse, threats, or fear: When Home Isn't Safe. Danger now: 911.",
"say": "A hard season is different from harm. If there is abuse, threats, or you feel afraid, safety comes first. Oak's guide When Home Isn't Safe can help you take the next step. If you are in danger right now, call 911. If you have thoughts of ending your life, call or text 988."
},
{
"k": "big",
"h": "Hard seasons can turn.",
"sub": "The full guide has more, whenever you want it.",
"say": "Hard seasons can turn, one repair at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-marriage-strain-helper",
"guide": "marriage-strain",
"side": "helper",
"title": "When Your Marriage Is Struggling",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Your Marriage Is Struggling",
"sub": "For the Helper",
"say": "When a friend or family member tells you their marriage is struggling, this is for you. They chose to trust you with something tender."
},
{
"k": "big",
"h": "They may want to vent, not be told what to do.",
"say": "They may feel embarrassed to say it out loud. Often they want to vent, and to be heard, without being told what to do. Sometimes saying it out loud to someone safe is the first step. Your steady listening is the gift."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That sounds really hard.",
"I'm glad you told me.",
"What would help this week?"
],
"say": "Here are words that help. That sounds really hard. I'm glad you told me. And, what would help this week?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Taking sides",
"You are hearing one side"
],
[
"Sharing their struggle",
"Keep their confidence"
],
[
"Quick verdicts",
"\"Just leave,\" or \"just try harder\""
]
],
"say": "Some things are better left out. Taking sides, since you are hearing one side of a long story. Sharing their struggle with others. Keep their confidence. And quick verdicts, like just leave, or just try harder. Those decisions belong to them."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Babysit",
"For a date or a counseling session"
],
[
"Listen",
"Without a verdict"
],
[
"Encourage help early",
"A couples counselor"
]
],
"say": "What helps is often practical. Babysit, so they can have a date or get to counseling. Listen, without handing down a verdict. And gently encourage help early. Couples counseling works best before things are broken. Keep inviting them, as a couple and on their own, the way you always have."
},
{
"k": "big",
"h": "Offer one specific thing.",
"say": "Take a moment. Think of the couple you care about. Say one specific offer out loud, like, I can watch the kids Friday night so you two can go out.",
"beats": [
"Take a moment.",
"Think of the couple you care about.",
{
"t": "Say one specific offer out loud, like, I can watch the kids Friday night so you two can go out.",
"w": 10
}
]
},
{
"k": "card",
"title": "If you are worried about safety",
"body": "Abuse, threats, or fear: When Home Isn't Safe. Danger now: 911.",
"say": "A hard season is different from harm. If they describe abuse, threats, or being afraid at home, believe them, and stay close. Oak's guide When Home Isn't Safe has the next steps. If there is danger right now, call 911. If they talk about not wanting to live, help them call or text 988."
},
{
"k": "big",
"h": "Support the person. Stay out of the fight.",
"sub": "Look after yourself too.",
"say": "Support the person, and stay out of the fight. You can care about both of them. And if their struggle stirs things in your own relationship, that's human. Talk with someone you trust."
},
{
"k": "big",
"h": "Steady and kind.",
"sub": "The full guide has more, whenever you want it.",
"say": "Steady, kind, and on no one's side but theirs. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "betrayal",
"ring": "family",
"title": "Betrayal",
"you": {
"id": "ok-g-betrayal-you",
"guide": "betrayal",
"side": "you",
"title": "Betrayal",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Betrayal",
"sub": "For You",
"say": "If someone you trusted has betrayed you, through an affair, a lie, or something taken from you, this is for you. Go at your own pace."
},
{
"k": "big",
"h": "Betrayal can feel like trauma.",
"sub": "Shock, replaying, and a shaken sense of what's real.",
"say": "Betrayal can feel like trauma. There's the shock. Then the replaying, and a shaken sense of what's real. You may look back over months or years and wonder what was true. That is a normal reaction to a deep injury."
},
{
"k": "words",
"h": "Sometimes all in an hour",
"items": [
"Replaying details",
"Feeling foolish",
"Rage",
"Deep grief"
],
"say": "You may replay the details over and over. You may feel foolish, then full of rage, then flooded with grief, sometimes all in one hour. None of it means you're falling apart. It means something mattered, and it was broken."
},
{
"k": "big",
"h": "You don't have to decide right away.",
"sub": "Stay or go can wait.",
"say": "You don't have to decide right away whether to stay or go, or what this relationship will become. Give yourself time before big decisions. Right now, the job is to get through the days."
},
{
"k": "points",
"h": "Look after your body",
"items": [
[
"Sleep",
"Even a little, even badly"
],
[
"Eat",
"Something simple, on a schedule"
],
[
"Move",
"A walk to clear your head"
],
[
"See a doctor",
"If you need medical care"
]
],
"say": "Look after your body, even when you can't think straight. Sleep, even a little. Eat something simple, on a schedule. Take a walk to clear your head. And if you need medical care, or the betrayal raises health questions, see your doctor."
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Tell one trusted person",
"Not everyone"
],
[
"Set limits",
"On what you seek out and see"
],
[
"Find a counselor",
"One who works with betrayal"
]
],
"say": "A few first steps help. Tell one trusted person, not everyone. You can say, something painful happened, and I need a friend who won't judge either way. Set limits on what you seek out and see. Checking, searching, and rereading can keep the wound open. And find a counselor who works with betrayal."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"Their choice is not a measure of my worth."
],
"sub": "Quietly, or out loud.",
"say": "Put a hand on your chest, if that feels right. Take one slow breath. Speak to yourself the way you would to a friend this happened to. Now say it, quietly or out loud: their choice is not a measure of my worth.",
"beats": [
"Put a hand on your chest, if that feels right.",
"Take one slow breath.",
"Speak to yourself the way you would to a friend this happened to.",
{
"t": "Now say it, quietly or out loud: their choice is not a measure of my worth.",
"w": 10
}
]
},
{
"k": "card",
"title": "Forgiveness is not the same as trust.",
"body": "Forgiveness, if it comes, takes time. Trust is rebuilt by actions.",
"say": "Forgiveness, if it comes, takes time, and it isn't the same as trust. You can forgive someone and still need time, or distance, or proof. Trust is rebuilt slowly, by actions. Neither one needs to be rushed."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Danger right now: 911.",
"say": "Betrayal can bring very dark thoughts. If you have thoughts of harming yourself or someone else, call or text 988, any time. If what you've found comes with threats, control, or fear at home, Oak's guide When Home Isn't Safe can help. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "What they did does not define you.",
"sub": "The full guide has more, whenever you want it.",
"say": "What they did does not define you. You can heal from this, at your own pace. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-betrayal-helper",
"guide": "betrayal",
"side": "helper",
"title": "Betrayal",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Betrayal",
"sub": "For the Helper",
"say": "When someone you care about has been betrayed, by a partner, a friend, or family, this is for you. They trusted you with something painful."
},
{
"k": "big",
"h": "They may flip between staying and leaving.",
"sub": "Some days, some hours.",
"say": "They may flip between wanting to leave and wanting to stay, from one day to the next, even one hour to the next. They may replay the same details every time you talk. That's normal. Their decision is theirs, and it may take a long time."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That's devastating. I'm here, whatever you decide.",
"You don't have to figure it out today.",
"I'll keep this between us."
],
"say": "Here are words that help. That's devastating. I'm here, whatever you decide. You don't have to figure it out today. And, I'll keep this between us."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Telling them what to do",
"Stay or go is theirs"
],
[
"Spreading the news",
"Their story, their timing"
],
[
"Tearing down the other person",
"They may still love them"
]
],
"say": "Some things are better left out. Telling them what to do. Stay or go is their choice. Spreading the news, even to people who care. It's their story to tell, in their own time. And tearing down the other person. They may stay, or still love them, and then feel they can't come back to you."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listen",
"Even to the same story again"
],
[
"Keep confidences",
"Every time"
],
[
"Practical help",
"Meals, kids, a place to stay"
]
],
"say": "What helps is steady and practical. Listen, even to the same story again. Keep their confidences, every time. And help with practical needs: a meal, an afternoon with the kids, a place to stay for a few nights."
},
{
"k": "big",
"h": "Practice the steady line.",
"say": "Take a moment. Picture your friend telling you, again, that they still don't know what to do. Say it out loud: I'm here, whatever you decide.",
"beats": [
"Take a moment.",
"Picture your friend telling you, again, that they still don't know what to do.",
{
"t": "Say it out loud: I'm here, whatever you decide.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Thoughts of harm: call or text 988. Threats or fear at home: When Home Isn't Safe. Danger now: 911.",
"say": "Watch, gently, for sadness that won't lift, or for rage that worries you. Help them find a counselor who works with betrayal. If they talk about harming themselves or someone else, help them call or text 988. If there are threats or fear at home, Oak's guide When Home Isn't Safe has next steps. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Keep your friendship steady.",
"sub": "And look after yourself too.",
"say": "Their decision is theirs. If they choose something you wouldn't, keep your friendship steady anyway. Their hurt may stir your own memories of being let down. Talk about your feelings with someone you trust, and keep their story private while you do."
},
{
"k": "big",
"h": "I'm here, whatever you decide.",
"sub": "The full guide has more, whenever you want it.",
"say": "I'm here, whatever you decide. Those five words can carry a friend a long way. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "infertility",
"ring": "family",
"title": "Infertility",
"you": {
"id": "ok-g-infertility-you",
"guide": "infertility",
"side": "you",
"title": "Infertility",
"sideName": "For You",
"mins": 4,
"sources": [
"doka"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Infertility",
"sub": "For You",
"say": "If you are trying to have a child, and it isn't happening, this is for you. Months in or years in, in treatment or taking a break, your grief belongs here."
},
{
"k": "big",
"h": "A real grief, often hidden.",
"sub": "And it can come back every month.",
"say": "Infertility is a real grief. It is often hidden, and it can repeat month after month: hope, then waiting, then heartbreak, then hope again. Many people around you may not even know. That doesn't make it smaller. It can make it lonelier."
},
{
"k": "words",
"h": "All of it makes sense",
"items": [
"Hope, then heartbreak",
"Jealousy, then guilt",
"Left out",
"Tired of trying"
],
"say": "You may feel hope and heartbreak on the same cycle. Jealousy when someone shares their news, and then guilt for feeling it. Left out, as the people around you build their families. And tired, in body and spirit, from trying. All of it makes sense. It comes from wanting something with your whole heart."
},
{
"k": "points",
"h": "Protect your heart",
"items": [
[
"You can skip events",
"Showers, parties, some holidays"
],
[
"You choose what to share",
"And with whom"
],
[
"You can take breaks",
"From treatment, from trying"
]
],
"say": "You are allowed to protect your heart. You can skip a baby shower or a party when you need to, and send a kind note instead. You and your partner can decide together what you share, and with whom. And you can take a break, from treatment or from trying, when you need one. Rest is part of the road."
},
{
"k": "card",
"title": "Partners may cope differently.",
"body": "One may want to talk. One may want a plan. Both are love.",
"say": "If you have a partner, the two of you may cope differently. One may want to talk about it every day. The other may want a plan, or a night off from it. One may be ready to stop before the other. Neither of you is doing it wrong. Try asking each other: what is the hardest part for you right now?"
},
{
"k": "big",
"h": "My worth isn't measured by this.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence worth keeping close. My worth isn't measured by this. Say it now, softly, in your own voice. Then say it once more, and let it settle.",
"beats": [
"Here is a sentence worth keeping close.",
"My worth isn't measured by this.",
"Say it now, softly, in your own voice.",
{
"t": "Then say it once more, and let it settle.",
"w": 10
}
]
},
{
"k": "words",
"h": "Words for the people around you",
"items": [
"We're going through infertility.",
"We'd love support.",
"Please don't ask for updates."
],
"say": "People may ask questions that sting, without meaning to. You can give them words. Try this. We're going through infertility. We'd love support, but please don't ask for updates. You get to decide what your family's path looks like, and who hears about it."
},
{
"k": "card",
"title": "If the heaviness stays",
"body": "A counselor who knows fertility can help. Thoughts of harming yourself: call or text 988. Danger right now: 911.",
"say": "Lean on what steadies you. A support group, or a counselor who focuses on fertility, can carry some of this with you. If the sadness stays heavy for weeks, or strain builds between you and your partner, talk with your doctor or a counselor. If you have any thoughts of harming yourself, call or text 988. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your heart deserves gentleness.",
"sub": "The full guide has more, whenever you want it.",
"say": "Whatever your path looks like from here, your heart deserves gentleness today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-infertility-helper",
"guide": "infertility",
"side": "helper",
"title": "Infertility",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"doka"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Infertility",
"sub": "For the Helper",
"say": "When someone you love is facing infertility, it can be hard to know what to say. This is for anyone walking beside them."
},
{
"k": "big",
"h": "Their grief is real, and often quiet.",
"say": "Infertility is a grief that often stays hidden. It can come back every month, with every test and every announcement. Your friend may be hurt by casual questions and well-meant advice. You don't need the right answer. Your gentleness matters more than advice."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm sorry. I'm here.\"",
"\"Talk, or not talk. Either is okay.\"",
"\"How are you doing, really?\""
],
"say": "Here are words that help. I'm sorry. I'm here whenever you want to talk, or not talk. And now and then, how are you doing, really? Then let them choose how much to say."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"Just relax.\"",
"\"Have you thought about adoption?\"",
"\"At least you have each other.\""
],
"say": "And words to set aside, even when they're meant kindly. Just relax suggests they are causing this. Have you thought about adoption? They almost certainly have, and their path is theirs to choose. And any sentence that starts with at least makes the loss smaller. Asking for updates can hurt too. Let them bring the news, when they want to."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Follow their lead",
"Their pace, their words"
],
[
"Remember the hard days",
"Holidays, test days, showers"
],
[
"Ask before you assume",
"Invitations, plans, news"
],
[
"Keep including them",
"In all kinds of plans"
]
],
"say": "What helps is often simple. Follow their lead, at their pace, in their words. Remember the hard days: Mother's Day, Father's Day, a test day, a shower they may skip. Ask before you assume, about invitations and plans. And keep including them, in all kinds of plans, so they never feel left out of your life."
},
{
"k": "card",
"title": "If you are expecting",
"body": "Tell them privately, first, with room to feel what they feel.",
"say": "If you are expecting, be thoughtful about how you share. Tell them privately, before a group, or in a message they can read alone. That gives them room to feel what they feel. They can love you and still grieve. Let them set the distance, and keep the door open."
},
{
"k": "big",
"h": "A note that needs no answer.",
"say": "Take a moment right now. Think of your friend, and one hard day coming up for them. Maybe a holiday, a test day, or a shower they'll skip. Picture the short note you'll send that day, one that needs no answer.",
"beats": [
"Take a moment right now.",
"Think of your friend, and one hard day coming up for them.",
"Maybe a holiday, a test day, or a shower they'll skip.",
{
"t": "Picture the short note you'll send that day, one that needs no answer.",
"w": 10
}
]
},
{
"k": "big",
"h": "Steady yourself, too.",
"sub": "Your heart counts too.",
"say": "Walking beside someone's longing can stir your own: a child you hoped for, or worry about saying the wrong thing. Talk with someone you trust. If your friend ever speaks of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Your gentleness matters.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your gentleness matters more than any advice. Keep showing up, quietly and kindly. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "estrangement",
"ring": "family",
"title": "Estrangement",
"you": {
"id": "ok-g-estrangement-you",
"guide": "estrangement",
"side": "you",
"title": "Estrangement",
"sideName": "For You",
"mins": 4,
"sources": [
"boss"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Estrangement",
"sub": "For You",
"say": "If you are estranged from someone in your family, a parent, a child, a sibling, this is for you. Whether you chose the distance or it was chosen for you, your grief belongs here."
},
{
"k": "big",
"h": "A grief with no funeral.",
"sub": "Still living, and still missing.",
"say": "Estrangement is a grief with no funeral. The person is still living, and still missing from your life. There's no card, no casserole, no day when people gather. And the loss can stay open for years, with no clear ending. It makes sense if it's hard to set down."
},
{
"k": "words",
"h": "All of it can be true",
"items": [
"Grief",
"Guilt",
"Anger",
"Relief",
"Longing"
],
"say": "You may feel grief, guilt, anger, relief, or a longing that won't go away. Sometimes all of them in the same afternoon. Relief and longing can live side by side. None of it cancels your love, or your reasons."
},
{
"k": "big",
"h": "Some distance protects.",
"sub": "Some distance can be repaired. Both are real.",
"say": "Some distance protects. Some distance can be repaired. Both are real. You can take your time deciding which one yours is. And you get to choose who hears the story."
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Name what you're grieving",
"The person, the hopes, the holidays"
],
[
"Decide what contact is safe",
"If any, and on what terms"
],
[
"Seek counsel before big steps",
"Reaching out, or stepping back"
]
],
"say": "Here are a few first steps. Name what you are grieving: the person, the relationship you hoped for, the holidays that used to be. Decide what contact, if any, is safe and healthy for you, and on what terms. And seek counsel before big steps, whether that's reaching out or stepping back."
},
{
"k": "big",
"h": "I can love someone and still need distance.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence many people find steadying. I can love someone and still need distance. Say it now, softly, in your own voice. Say it once more, and notice what it feels like to mean it.",
"beats": [
"Here is a sentence many people find steadying.",
"I can love someone and still need distance.",
"Say it now, softly, in your own voice.",
{
"t": "Say it once more, and notice what it feels like to mean it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Holidays and milestones",
"body": "\"I'm not in contact with my family right now. Holidays are hard.\"",
"say": "Holidays, birthdays, weddings, and funerals can hurt most. Plan ahead for them. Decide where you'll be, and who you'll be with. Chosen family counts. And give people simple words: I'm not in contact with my family right now. Holidays are hard."
},
{
"k": "card",
"title": "If the weight gets heavy",
"body": "A counselor can help. Thoughts of harming yourself: call or text 988. Danger right now: 911.",
"say": "Support from others who live with estrangement can help, and so can a counselor. If grief turns into a heaviness that won't lift, talk with your doctor or a counselor. If you have any thoughts of harming yourself, call or text 988. If you are in danger right now, including from family, call 911."
},
{
"k": "big",
"h": "You deserve people who understand.",
"sub": "The full guide has more, whenever you want it.",
"say": "You deserve people who understand this kind of loss. Let them find you, and let yourself be found. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-estrangement-helper",
"guide": "estrangement",
"side": "helper",
"title": "Estrangement",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Estrangement",
"sub": "For the Helper",
"say": "When someone you know is estranged from family, it can be hard to know what to say. This is for anyone walking beside them."
},
{
"k": "big",
"h": "You don't need the whole story.",
"sub": "To be kind.",
"say": "People living with estrangement are often judged by those who don't know the full story. Many have been asked to explain, again and again. You don't need the whole story to be kind."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"That sounds painful.\"",
"\"I'm glad you told me.\"",
"\"Come spend the holiday with us.\""
],
"say": "Here are words that help. That sounds painful. I'm glad you told me. And when the season comes, come spend the holiday with us. Then let them tell as much or as little as they choose."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"But they're family.\"",
"\"Life is short. Just call them.\"",
"\"What happened between you?\""
],
"say": "And words to set aside. But they're family. They know that better than anyone. Life is short, just call them. It pushes a decision that is theirs to make, and that may not be safe. And what happened between you? Asking for the story can feel like a trial. Let them share what they choose."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Invite them",
"Holidays, birthdays, Sundays"
],
[
"Remember the hard days",
"Mother's Day, Father's Day"
],
[
"Respect their choices",
"About contact and timing"
],
[
"Keep their confidence",
"Even with shared family"
]
],
"say": "What helps is steady and simple. Invite them, to holidays, birthdays, or an ordinary Sunday dinner. Remember the hard days, like Mother's Day and Father's Day, and check in. Respect their choices about contact and timing. And keep their confidence, even with family you both know."
},
{
"k": "big",
"h": "An open seat at your table.",
"say": "Take a moment right now. Think of the next holiday or gathering on your calendar. Picture inviting your friend, and the simple words you'll use.",
"beats": [
"Take a moment right now.",
"Think of the next holiday or gathering on your calendar.",
{
"t": "Picture inviting your friend, and the simple words you'll use.",
"w": 10
}
]
},
{
"k": "card",
"title": "If they ask what you think",
"body": "Listen first. Their decision, and their timing.",
"say": "If they ask your opinion about reaching out, listen first. Ask what they hope for, and what they worry about. For big steps, suggest a counselor. The decision is theirs, and so is the timing."
},
{
"k": "big",
"h": "Steady yourself, too.",
"sub": "Your own family story counts.",
"say": "This may stir your own family story. Notice it, and talk with someone you trust. If your friend ever speaks of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Keep a seat open.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the whole story to be kind. Keep a seat open for them. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "aging-parents",
"ring": "family",
"title": "Aging Parents",
"you": {
"id": "ok-g-aging-parents-you",
"guide": "aging-parents",
"side": "you",
"title": "Aging Parents",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Aging Parents",
"sub": "For You",
"say": "If your mom or dad is getting older and needs more help, and you're the one figuring it out, this is for you. Take what helps today, and leave the rest for later."
},
{
"k": "big",
"h": "The roles are shifting.",
"sub": "That is emotional for everyone.",
"say": "The parent who once looked after you may now need you to look after them. Rides, medicines, bills, a fall, a move. Role reversal is emotional for everyone, including your parent. If it feels strange and heavy, that makes sense."
},
{
"k": "words",
"h": "All of it makes sense",
"items": [
"Worry",
"Frustration, then guilt",
"Grief for who they were",
"Exhaustion"
],
"say": "You may feel worry about their safety. Frustration, when they won't accept help, and then guilt for feeling it. Grief for the parent they used to be. And exhaustion, from juggling your own work, family, and life. You may be stretched between generations. All of it makes sense."
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Have the conversation",
"About their wishes, before a crisis"
],
[
"Know the basics",
"Doctors, medicines, documents"
],
[
"Call for local help",
"Your Area Agency on Aging"
]
],
"say": "Here are a few first steps. Have the conversation about their wishes now, before a crisis decides for you. Know their doctors, their medicines, and where their documents are. And call your local Area Agency on Aging. They can point you to services near your parent."
},
{
"k": "big",
"h": "Their dignity, where it's safe.",
"sub": "Ask before you decide.",
"say": "Your parent is still an adult, with a lifetime of choices behind them. Respect their dignity and their choices wherever it's safe. Ask before you decide. Even small choices, like what to wear or when to eat, help them stay themselves."
},
{
"k": "card",
"title": "Share the load",
"body": "\"Mom needs more help. Can we meet as a family to plan?\"",
"say": "You can share this. Spread the load among siblings when you can, even if the shares aren't equal. Try saying: Mom needs more help. Can we meet as a family to plan? A geriatric care manager can help a family build a plan, too."
},
{
"k": "big",
"h": "I'm doing my best in a hard season.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence to keep close. I'm doing my best in a hard season. Say it now, softly, in your own voice. Then take one slow breath, and let it be true.",
"beats": [
"Here is a sentence to keep close.",
"I'm doing my best in a hard season.",
"Say it now, softly, in your own voice.",
{
"t": "Then take one slow breath, and let it be true.",
"w": 10
}
]
},
{
"k": "card",
"title": "Your own breaks count",
"body": "Safety worries: their doctor. Harm to a vulnerable adult in Minnesota: MAARC 1-844-880-1574. 988 and 911.",
"say": "Your own breaks are part of the plan, not a reward for finishing it. If you're worried about your parent's safety at home, talk with their doctor. If you're running on empty, the caregiving guide has more. If you believe your parent is being harmed or taken advantage of, in Minnesota call MAARC at 1-844-880-1574. If you have thoughts of harming yourself, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "You are doing a hard, loving thing.",
"sub": "The full guide has more, whenever you want it.",
"say": "You are doing a hard, loving thing. Be as patient with yourself as you are trying to be with them. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-aging-parents-helper",
"guide": "aging-parents",
"side": "helper",
"title": "Aging Parents",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Aging Parents",
"sub": "For the Helper",
"say": "If someone you know is helping an aging parent, this is for you. They may be stretched between generations. Your support counts."
},
{
"k": "big",
"h": "The sandwich generation needs support too.",
"say": "Many people helping an aging parent are also raising kids, working, and keeping a household going. They may not ask for help. They may not even notice how tired they are. The sandwich generation needs support too."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How are you holding up?\"",
"\"Can I drive her Thursday?\"",
"\"You're doing a hard thing well.\""
],
"say": "Here are words that help. How are you holding up? Then wait for the real answer. Offer something specific: can I drive her to her appointment Thursday? And, you're doing a hard thing well."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"I could never put my mom in a home.\"",
"\"Why don't you just move her in?\"",
"\"At least you still have her.\""
],
"say": "Some words close the door. I could never put my mom in a home judges a choice made with love and hard facts. Why don't you just move her in? They've likely weighed it many times. And at least you still have her skips past the grief that's already here. Trust that they know things you don't."
},
{
"k": "story",
"title": "A Betrayal of the Mind",
"lines": [
"A woman in memory care told anyone who would listen that her children had stolen everything and dumped her there.",
"They had tried home health, day programs, and live-in help first. They visited almost every day.",
"Her accusations were symptoms of the illness, not their failure."
],
"lesson": "You may not see the whole story.",
"note": "Names and details changed",
"hold": 2,
"say": "Our hospice team had a patient in memory care who told anyone who would listen that her children had stolen everything she owned and dumped her there. The chart told a different story. She'd been found outside, lost, more than once. Her family had tried home health, day programs, and live-in help first. They visited almost every day. My team and I sat with them. Her accusations were symptoms of the illness, not their failure as children."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Rides, visits, research",
"Offer one, specifically"
],
[
"Visit their parent",
"A familiar face matters"
],
[
"Give them a break",
"Stay so they can go"
]
],
"say": "What helps is often practical. Offer rides, visits, or research, and name one specifically. Visit their parent, too. And give them a break. Stay for an afternoon so they can nap, see a friend, or just sit somewhere quiet alone."
},
{
"k": "big",
"h": "Offer one specific thing.",
"say": "Take a moment right now. Think of someone you know who is helping an aging parent. Picture one specific thing you could offer them this week, and the words you'll use.",
"beats": [
"Take a moment right now.",
"Think of someone you know who is helping an aging parent.",
{
"t": "Picture one specific thing you could offer them this week, and the words you'll use.",
"w": 10
}
]
},
{
"k": "big",
"h": "Steady yourself, too.",
"sub": "Your own parents count too.",
"say": "This may stir thoughts about your own parents, or your own aging. That's natural. Talk with someone you trust. If you worry an older adult is being harmed or taken advantage of, in Minnesota call MAARC at 1-844-880-1574. If your friend speaks of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Ask, and then help.",
"sub": "The full guide has more, whenever you want it.",
"say": "How are you holding up? Ask it, mean it, and then help. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "empty-nest",
"ring": "family",
"title": "Empty Nest and Big Life Transitions",
"you": {
"id": "ok-g-empty-nest-you",
"guide": "empty-nest",
"side": "you",
"title": "Empty Nest and Big Life Transitions",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Empty Nest and Big Life Transitions",
"sub": "For You",
"say": "If your kids have left home, or a big season of your life has just ended, this is for you. A child off to college, a last one moving out, a retirement, a move. Even good changes can ache."
},
{
"k": "big",
"h": "Even good changes hold loss.",
"sub": "Pride and missing them, together.",
"say": "Transitions include loss, even the ones you hoped for. You can be proud of your child and miss them terribly in the same breath. You can be glad to retire and still miss the work. Both are true, and both belong."
},
{
"k": "points",
"h": "What you may notice",
"items": [
[
"A quiet house",
"Hardest at the old times"
],
[
"A shift in purpose",
"Who am I now?"
],
[
"Your partnership",
"Closer, or more distant"
],
[
"Mixed feelings",
"Pride, relief, and grief"
]
],
"say": "You may notice a quiet house, and it may land hardest at the old times: dinner, the drive home, bedtime. You may feel your sense of purpose shift, and wonder who you are now. If you have a partner, you may find each other again, or notice how much distance the busy years covered. And you may feel pride, relief, and grief all at once. All of it is normal."
},
{
"k": "big",
"h": "My purpose is changing, not ending.",
"sub": "Say it in your own voice.",
"say": "Here is a sentence worth trying on. My purpose is changing, not ending. Say it softly, out loud. Then say it once more, slowly, and notice how it lands.",
"beats": [
"Here is a sentence worth trying on.",
"My purpose is changing, not ending.",
"Say it softly, out loud.",
{
"t": "Then say it once more, slowly, and notice how it lands.",
"w": 10
}
]
},
{
"k": "card",
"title": "Mark the change.",
"body": "A trip, a dinner, a letter to the season you are leaving.",
"say": "Let yourself grieve the season that ended. It can help to mark it. Take a trip, plan a special dinner, or write a letter to the season you're leaving. Many traditions mark thresholds like this with a blessing, if that fits you. An ending that is marked is easier to step past."
},
{
"k": "points",
"h": "Small steps into what is next",
"items": [
[
"Try one new thing",
"A class, a craft, a trail"
],
[
"Reconnect with friends",
"The ones you lost track of"
],
[
"Volunteer, learn, create",
"Purpose often grows from giving"
],
[
"Talk with your partner",
"Honestly, about this season"
]
],
"say": "Then take small steps into what is next. Try one new thing: a class, a craft, a trail you have never walked. Reconnect with friends you lost track of during the busy years. Volunteer, learn, or create something. Purpose often grows from giving. And if you have a partner, talk honestly about this season, and what you each want from it."
},
{
"k": "words",
"h": "A line for the people around you",
"items": [
"The house is so quiet.",
"Want to get dinner this week?"
],
"say": "People may not guess that you're struggling, especially when it looks like a happy milestone. You can tell them, simply. Try this. The house is so quiet. Want to get dinner this week?"
},
{
"k": "card",
"title": "If the sadness stays",
"body": "Sadness that lasts or deepens: talk with your doctor or a counselor. Thoughts of ending your life: call or text 988. Danger right now: 911.",
"say": "Sometimes a transition turns into lasting sadness. If the low days stretch into weeks, talk with your doctor or a counselor. That is a strong step, and it helps. If you have thoughts of ending your life, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "A new season can be full of meaning.",
"sub": "The full guide has more, whenever you want it.",
"say": "Grieve the season that ended, and give the next one time. A new season can be full of meaning, even if you can't see its shape yet. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-empty-nest-helper",
"guide": "empty-nest",
"side": "helper",
"title": "Empty Nest and Big Life Transitions",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Empty Nest and Big Life Transitions",
"sub": "For the Helper",
"say": "When someone you love is facing an empty nest, or another big life transition, this is for you. They may not want to admit how much it hurts."
},
{
"k": "big",
"h": "Celebrate and grieve with them.",
"say": "Most people will only see the celebration: the graduation, the move-in day, the retirement party. Your part is to hold both. Celebrate with them, and make room for the grief that comes with every ending."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That's a big change. How's it going?",
"What do you miss most?",
"What are you curious about now?"
],
"say": "Here are words that help. That's a big change. How's it going? What do you miss most? And later, when they're ready, what are you curious about now?"
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Now you can finally do whatever you want!",
"At least they're doing well.",
"You'll get used to it."
],
"say": "Some words close the door, even when they're meant kindly. Now you can finally do whatever you want skips right past the loss. At least they're doing well is true, and still not the point. And you'll get used to it rushes something that takes months. Listening first goes further."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Invite them into new things",
"A class, a walk, a project"
],
[
"Make a real plan",
"Dinner Thursday, not someday"
],
[
"Remember the hard days",
"Move-in day, the first holiday"
],
[
"Keep inviting",
"Even after a no"
]
],
"say": "What helps most is often simple. Invite them into new things: a class, a walk, a project you could do together. Make a real plan, like dinner on Thursday, instead of someday. Remember the hard days, like move-in day or the first holiday when the kids come and go again. And keep inviting, even after a no."
},
{
"k": "big",
"h": "Whose season just changed?",
"say": "Take a moment. Think of someone you know whose house just got quieter, or whose season just changed. Picture one thing you could invite them to this week.",
"beats": [
"Take a moment.",
"Think of someone you know whose house just got quieter, or whose season just changed.",
{
"t": "Picture one thing you could invite them to this week.",
"w": 10
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"You can't hurry it",
"New seasons take months"
],
[
"Notice what it stirs",
"Your own changes may wake"
],
[
"Steady beats big",
"Small, regular contact"
]
],
"say": "Stay steady by remembering a few things. You can't hurry a transition. New seasons take months to feel like home. Notice what it stirs in you, because your own changes may wake up too. And steady beats big. Small, regular contact helps more than one grand gesture."
},
{
"k": "card",
"title": "If you are worried",
"body": "Lasting sadness: their doctor or a counselor. Talk of not wanting to live: call or text 988. Danger right now: 911.",
"say": "If the sadness lasts for weeks, or they seem to lose interest in everything, gently encourage them to talk with their doctor or a counselor. If you hear talk of not wanting to live, call or text 988, together if you can. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Celebrate and grieve with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Celebrate and grieve with them, and keep showing up while the new season takes shape. You don't need the right words. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "struggling-child",
"ring": "family",
"title": "Parenting a Struggling Child",
"you": {
"id": "ok-g-struggling-child-you",
"guide": "struggling-child",
"side": "you",
"title": "Parenting a Struggling Child",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Parenting a Struggling Child",
"sub": "For You",
"say": "If you are parenting a child who is struggling, this is for you. A teen who is depressed or angry, a child in trouble at school, a grown son or daughter caught in something hard. Whatever their age, your worry is real."
},
{
"k": "big",
"h": "Their struggle is not proof you failed.",
"sub": "Many loving parents walk this road.",
"say": "Start with this. Your child's struggle is not proof that you failed. Many loving, careful parents walk this road. Blame, from yourself or anyone else, won't help your child. Your steadiness will."
},
{
"k": "points",
"h": "What you may feel",
"items": [
[
"Scared",
"For their safety and their future"
],
[
"Helpless",
"Nothing you try seems to work"
],
[
"Judged",
"By other parents, or by yourself"
],
[
"Grief",
"For the family life you imagined"
]
],
"say": "You may feel scared, for their safety and their future. Helpless, because nothing you try seems to work. Judged, by other parents, or by the voice in your own head. And exhausted. You may even grieve the family life you imagined. That grief is real, and it makes sense."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Connection over control",
"Stay close, even when pushed away"
],
[
"Loving, steady limits",
"Clear and consistent"
],
[
"Help for them",
"Their doctor, the school counselor"
],
[
"Help for you",
"A parent group, your own counselor"
]
],
"say": "A few things help. Connection over control. Stay connected, even when they push you away: a short text, a ride, a meal together. Loving limits, clear and consistent. Help for them: talk with their doctor or the school counselor. And help for you: a parent support group, or a counselor of your own."
},
{
"k": "card",
"title": "If you are worried about safety, ask.",
"body": "Talk of suicide: call or text 988 now. Safety threats or danger right now: 911.",
"say": "If you're worried about their safety, ask them directly, in plain words. Are you thinking about ending your life? If your child talks about suicide, call or text 988 now, together if you can. If there are safety threats, or anyone is in danger right now, call 911."
},
{
"k": "card",
"title": "When your child is grown",
"body": "You choose what you give, what you allow, and what you protect.",
"say": "If your child is grown, the road can look different. An adult makes their own choices. You still choose what you give, what you allow in your home, and what you protect. Loving them and protecting yourself can go together."
},
{
"k": "big",
"h": "I can love them well and still not fix this alone.",
"sub": "Say it softly, out loud.",
"say": "Here is a sentence to carry. I can love them well, and still not fix this alone. Say it softly, out loud. Now say it once more, and let your shoulders drop.",
"beats": [
"Here is a sentence to carry.",
"I can love them well, and still not fix this alone.",
"Say it softly, out loud.",
{
"t": "Now say it once more, and let your shoulders drop.",
"w": 10
}
]
},
{
"k": "points",
"h": "Tend the rest of the family",
"items": [
[
"Your partner",
"Keep talking, as a team"
],
[
"Your other kids",
"They need you too"
],
[
"Yourself",
"Sleep, food, a walk"
]
],
"say": "Tend the rest of the family, too. If you have a partner, keep talking, and try to stay on the same team. Your other kids need you, even when one child takes most of your energy. And you need sleep, food, and a walk. You can't stay steady on empty."
},
{
"k": "words",
"h": "Asking for support",
"items": [
"We're going through a hard stretch with our son.",
"Please keep us in your thoughts."
],
"say": "You don't have to share the whole story to get support. Try this. We're going through a hard stretch with our son. Please keep us in your thoughts. Your child's story stays theirs, and you still get to lean on people."
},
{
"k": "big",
"h": "Stay close. Get help. Keep going.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay close, get help for them and for you, and keep going. You are a good parent in a hard season. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-struggling-child-helper",
"guide": "struggling-child",
"side": "helper",
"title": "Parenting a Struggling Child",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Parenting a Struggling Child",
"sub": "For the Helper",
"say": "When someone you love is parenting a struggling child, this is for you. The child might be six, sixteen, or forty. Their parent may feel judged by other parents, and very alone."
},
{
"k": "big",
"h": "A good parent in a hard season.",
"say": "The parent you know may be quietly sure this is their fault. Your steadiness can help. Remind them of what is true: they are a good parent in a hard season."
},
{
"k": "words",
"h": "Words that help",
"items": [
"You're a good parent in a hard season.",
"How are you holding up?",
"I'm not going anywhere."
],
"say": "Here are words that help. You're a good parent in a hard season. How are you holding up? And, I'm not going anywhere."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"What they need is more discipline.",
"Have you tried...?",
"My kid would never."
],
"say": "Some words close the door. Blame, even gentle blame, like what they need is more discipline. Quick fixes, like have you tried this one thing? And comparisons with your own kids. The parent has likely heard them all, and each one lands as judgment. Listening goes further."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Rides",
"To appointments, to school"
],
[
"Meals",
"On the hardest weeks"
],
[
"A listening ear",
"Without advice"
],
[
"Time with their other kids",
"A fun afternoon"
]
],
"say": "What helps is often practical. Offer rides to appointments or school. Bring a meal on the hardest weeks. Offer a listening ear, without advice. And give their other kids a fun afternoon, so the whole family gets a breath."
},
{
"k": "card",
"title": "Keep their child's story private.",
"body": "The story belongs to the child. Share only what the family shares, with their okay.",
"say": "Keep their child's story private. It belongs to the child, and the family. Share nothing without asking. When others ask you for news, you can say, they're in a hard stretch, and I'm walking with them."
},
{
"k": "big",
"h": "Who is carrying this quietly?",
"say": "Take a moment. Think of one parent you know who is in a hard stretch with a child. Picture one practical thing you could offer them this week.",
"beats": [
"Take a moment.",
"Think of one parent you know who is in a hard stretch with a child.",
{
"t": "Picture one practical thing you could offer them this week.",
"w": 10
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"You can't fix it",
"Steady company is the gift"
],
[
"It may be long",
"Pace yourself"
],
[
"Notice what it stirs",
"Your own kids, your own past"
]
],
"say": "Stay steady by remembering a few things. You can't fix this, and you don't need to. Steady company is the gift. This may be a long road, so pace yourself. And notice what it stirs in you, about your own kids or your own growing up. Talk with someone you trust, too."
},
{
"k": "card",
"title": "If you are worried",
"body": "A child who talks about suicide: call or text 988 now. Danger right now: 911. Harm to a vulnerable adult in Minnesota: MAARC, 1-844-880-1574.",
"say": "If you hear that their child is talking about suicide, encourage them to call or text 988 now. If anyone is in danger right now, call 911. And if a grown child is harming or taking from a vulnerable adult in Minnesota, you can call MAARC at 1 844 880 1574."
},
{
"k": "big",
"h": "Steady company is the gift.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need answers. Keep showing up, keep their story private, and keep reminding them who they are. Steady company is the gift. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "newparent",
"ring": "family",
"title": "Becoming a Parent",
"you": {
"id": "ok-g-newparent-you",
"guide": "newparent",
"side": "you",
"title": "Becoming a Parent",
"sideName": "For You",
"mins": 4,
"sources": [
"neff"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Becoming a Parent",
"sub": "For You",
"say": "If you've just become a parent, by birth, adoption, or any road, this is for you. And if you're the other parent in the house, this is for you too."
},
{
"k": "big",
"h": "Joy and struggle can arrive together.",
"say": "Becoming a parent changes everything. It's normal to feel joy and struggle at the same time. Love and exhaustion often arrive in the same hour. Feeling both means you're a new parent, doing something very big."
},
{
"k": "points",
"h": "You may feel",
"items": [
[
"Overwhelmed",
"So much, all at once"
],
[
"Anxious or teary",
"More than you expected"
],
[
"Unlike yourself",
"Or numb"
],
[
"Afraid to say so",
"When everyone expects joy"
]
],
"say": "You may feel overwhelmed, anxious, or teary. You may feel unlike yourself, or numb. Some parents have frightening thoughts they're ashamed of. Those are symptoms, not who you are. And it can be hard to say any of it out loud when everyone expects you to be glowing."
},
{
"k": "points",
"h": "Not luxuries right now",
"items": [
[
"Sleep",
"Whenever someone can watch the baby"
],
[
"Food",
"Simple, often, and offered by others"
],
[
"Help",
"Accept one offer today"
],
[
"Daylight",
"A few minutes outside"
]
],
"say": "Sleep, food, and help from others are not luxuries right now. Sleep whenever someone else can watch the baby. Eat simple food, often, and let others bring it. Accept one offer of help today. And step outside for a few minutes each day. A little morning daylight helps many people feel steadier."
},
{
"k": "big",
"h": "I'm learning, and that's enough for today.",
"sub": "Hand on your chest. Say it softly.",
"say": "Put a hand on your chest, and take one slow breath. Here is a line to say quietly. I'm learning, and that's enough for today. Say it once more, in your own voice.",
"beats": [
"Put a hand on your chest, and take one slow breath.",
"Here is a line to say quietly.",
"I'm learning, and that's enough for today.",
{
"t": "Say it once more, in your own voice.",
"w": 10
}
]
},
{
"k": "card",
"title": "Asking for help is good parenting.",
"body": "Try: \"I'm struggling more than I expected. Could you bring a meal or watch the baby for two hours?\"",
"say": "Asking for help is part of good parenting. Needing help doesn't make you a bad parent. Tell one person honestly how you're doing. You could say, I'm struggling more than I expected. Could you bring a meal, or watch the baby for two hours?"
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Other new parents",
"People who get it"
],
[
"Sharing the nights",
"When you can"
],
[
"Honest talks",
"With your partner, if you have one"
],
[
"Your doctor",
"About you, not only the baby"
]
],
"say": "Other new parents who get it can be a lifeline. Share night duties when you can. If you have a partner, talk honestly about how each of you is doing. And at appointments, talk with your doctor about how you are feeling, not only about the baby."
},
{
"k": "card",
"title": "If it lasts more than two weeks",
"body": "Sadness, anxiety, or scary thoughts: talk with your doctor. National Maternal Mental Health Hotline: 1-833-852-6262, any time.",
"say": "If sadness, anxiety, or scary thoughts last more than two weeks, talk with your doctor. It's common, and it's treatable. You can call the National Maternal Mental Health Hotline any time, at 1 833 852 6262. Postpartum Support International is there for parents too."
},
{
"k": "card",
"title": "Right away",
"body": "Thoughts of harming yourself or your baby: call or text 988, or call 911 now.",
"say": "If you have thoughts of harming yourself or your baby, reach out right away. Call or text 988, or call 911 now. Reaching out is how you keep you both safe."
},
{
"k": "big",
"h": "Needing help doesn't make me a bad parent.",
"sub": "The full guide has more, whenever you want it.",
"say": "Needing help doesn't make you a bad parent. It makes you a parent. Be gentle with yourself today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-newparent-helper",
"guide": "newparent",
"side": "helper",
"title": "Becoming a Parent",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Becoming a Parent",
"sub": "For the Helper",
"say": "When someone you love has just become a parent, this is for you. They may be exhausted, anxious, and afraid to admit they're not okay."
},
{
"k": "big",
"h": "Come to help, not only to hold the baby.",
"say": "Everyone wants to see the baby. What new parents often need most is someone who sees them. Come to help, not only to visit."
},
{
"k": "words",
"h": "Words that help",
"items": [
"You're doing a good job.",
"How are you really doing?",
"What would help most today?"
],
"say": "Here are words that help. You're doing a good job. How are you really doing? Ask it twice if you need to, and wait through the pause. And, what would help most today?"
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Enjoy every moment.",
"Unasked-for advice",
"Visiting without helping"
],
"say": "Some things close the door, even when they're meant kindly. Enjoy every moment adds guilt to every hard one. Unasked-for advice about feeding or sleep tells them they're doing it wrong. And visiting without helping leaves them hosting when they need rest."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Bring food",
"Or do the dishes"
],
[
"Hold the baby",
"So they can sleep"
],
[
"Check in often",
"Through the first months"
],
[
"Run one errand",
"Without being asked"
]
],
"say": "What helps most is practical. Bring food, or do the dishes. Hold the baby so they can sleep. Check in often through the first months, not only the first week. And run one errand without being asked."
},
{
"k": "card",
"title": "Watch for the other parent too.",
"body": "Partners can struggle quietly.",
"say": "Watch for the other parent too. Partners, fathers, and adoptive parents can struggle quietly, and many people forget to ask them. Ask them directly, how are you really doing?"
},
{
"k": "big",
"h": "Who just brought a baby home?",
"say": "Take a moment. Think of someone you know who has a new baby, or will soon. Picture one practical thing you could bring or do for them this week.",
"beats": [
"Take a moment.",
"Think of someone you know who has a new baby, or will soon.",
{
"t": "Picture one practical thing you could bring or do for them this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "If they seem low",
"body": "Encourage their doctor. National Maternal Mental Health Hotline: 1-833-852-6262. Thoughts of harming themselves or the baby: 988, or 911 now.",
"say": "If they seem low, anxious, or unlike themselves for more than two weeks, encourage them to talk to their doctor. The National Maternal Mental Health Hotline is open any time, at 1 833 852 6262. If they have thoughts of harming themselves or the baby, call or text 988 together, or call 911 now."
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"Pace yourself",
"The first months are long"
],
[
"Keep it simple",
"Small help, often"
],
[
"Notice what it stirs",
"Your own early days"
]
],
"say": "Stay steady by pacing yourself. The first months are long, and small help, often, goes further than one big day. And notice what it stirs in you: your own early days, or a baby you hoped for. Talk with someone you trust, too."
},
{
"k": "big",
"h": "You're part of the welcome.",
"sub": "The full guide has more, whenever you want it.",
"say": "Many families welcome a child with a whole circle around them. Being carried by others is part of that welcome, and you're part of it. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "incarceration",
"ring": "family",
"title": "When Someone You Love Is Incarcerated",
"you": {
"id": "ok-g-incarceration-you",
"guide": "incarceration",
"side": "you",
"title": "When Someone You Love Is Incarcerated",
"sideName": "For You",
"mins": 4,
"sources": [
"boss"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone You Love Is Incarcerated",
"sub": "For You",
"say": "If someone you love is in jail or prison, this is for you. A partner, a parent, a son or daughter, a brother or sister. Whatever happened, you are carrying a lot."
},
{
"k": "big",
"h": "A real loss, while they are still alive.",
"sub": "An empty chair, and no ending in sight.",
"say": "Having someone you love in jail or prison is a real loss, even though they're still alive. Their chair is empty. Holidays change. There may be no ending in sight. Grief, anger, worry, and loneliness can all come at once. All of it makes sense."
},
{
"k": "big",
"h": "You have done nothing wrong.",
"sub": "You get to hold your head up.",
"say": "Many families feel shame, and some keep it a secret. People may judge you. But you haven't done anything wrong. You get to hold your head up, and you deserve support too."
},
{
"k": "words",
"h": "Two lines to carry",
"items": [
"Their choices are not my shame.",
"I can love someone and still set limits."
],
"say": "Here are two lines to carry. Their choices are not my shame. I can love someone and still set limits. Choose the one you need most today, and say it quietly, out loud.",
"beats": [
"Here are two lines to carry.",
"Their choices are not my shame.",
"I can love someone and still set limits.",
{
"t": "Choose the one you need most today, and say it quietly, out loud.",
"w": 10
}
]
},
{
"k": "flow",
"h": "First steps",
"steps": [
[
"Learn the rules",
"For calls, mail, and visits"
],
[
"Tell one person",
"Someone you trust"
],
[
"Make a simple plan",
"For money and childcare"
]
],
"say": "A few first steps help. Learn the facility's rules for calls, mail, and visits, so you know what to expect. Tell one trusted person what is happening. And make a simple plan for money and childcare, because both often get harder."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A support group",
"Families who understand"
],
[
"Steady routines",
"Letters, calls, set days"
],
[
"Your own health",
"Sleep, food, a walk"
],
[
"Connection, when safe",
"For you and the kids"
]
],
"say": "A support group for families of incarcerated people can ease the loneliness. Steady routines help: letters, calls, and visits on set days. Keep up your own health, with sleep, food, and a walk. And when it's safe, staying connected often helps everyone, including the children."
},
{
"k": "card",
"title": "You decide what is safe.",
"body": "Closeness or distance. Love can include limits.",
"say": "You decide what is safe for you and your children. Some families stay close. Some need distance, especially after harm at home. Both can be loving choices. Children may need help understanding, in words that fit their age, and a school counselor can help."
},
{
"k": "words",
"h": "Asking for support",
"items": [
"My family is going through something hard.",
"I don't need to explain everything, but I could use support."
],
"say": "You don't have to tell the whole story to get support. Try this. My family is going through something hard. I don't need to explain everything, but I could use support."
},
{
"k": "card",
"title": "If it gets heavy",
"body": "Stress affecting your health or your kids: a counselor. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "If the stress is affecting your health or your children, reach out to a counselor. If you have thoughts of suicide, call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "You deserve support too.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their choices are not your shame, and you deserve support too. Take one small step today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-incarceration-helper",
"guide": "incarceration",
"side": "helper",
"title": "When Someone You Love Is Incarcerated",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone You Love Is Incarcerated",
"sub": "For the Helper",
"say": "When someone you know has a family member in jail or prison, this is for you. They may feel ashamed, isolated, or worn out."
},
{
"k": "big",
"h": "Stay close. Leave the case alone.",
"say": "Families of people who are incarcerated often get quietly dropped from invitations and conversations. Your part is simple. Stay close, and leave the case alone."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm here, and I'm not judging.",
"How are you and the kids holding up?",
"Want company on the drive?"
],
"say": "Here are words that help. I'm here, and I'm not judging. How are you and the kids holding up? And a practical one: want company on the drive?"
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"What did he do?",
"Questions about the case",
"Passing the news along"
],
"say": "Some things close the door. What did he do? Any question about the case. And passing the news along, which is gossip, even when it's kindly meant. Let them choose what to share. Your curiosity can wait."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Rides to visits",
"Long drives are lonely"
],
[
"Help with childcare",
"On visit days and hard weeks"
],
[
"Keep inviting them",
"Birthdays, dinners, holidays"
],
[
"Help kids stay connected",
"When it is safe"
]
],
"say": "What helps is often practical. Offer rides to visits, because long drives are lonely. Help with childcare on visit days and hard weeks. Keep including them in birthdays, dinners, and holidays. Families often get dropped from invitations. And when it's safe, help children keep a connection with the parent they miss."
},
{
"k": "big",
"h": "Who is missing someone inside?",
"say": "Take a moment. Think of a family you know with someone in jail or prison. Picture one invitation, or one ride, you could offer them this month.",
"beats": [
"Take a moment.",
"Think of a family you know with someone in jail or prison.",
{
"t": "Picture one invitation, or one ride, you could offer them this month.",
"w": 10
}
]
},
{
"k": "points",
"h": "Staying steady",
"items": [
[
"It can be long",
"Pace yourself"
],
[
"You don't need to fix it",
"Company is the gift"
],
[
"Notice your own views",
"Set them down to listen"
]
],
"say": "Stay steady by remembering a few things. Supporting a family through this can be long, so pace yourself. You don't need to fix it. Company is the gift. And notice your own views about crime and justice. Set them down while you listen, and talk them through with someone else later."
},
{
"k": "card",
"title": "If you are worried",
"body": "Stress hurting their health or kids: a counselor. Thoughts of suicide: call or text 988. Danger right now: 911.",
"say": "If the stress seems to be hurting their health or their children, encourage them to see a counselor. If you hear talk of suicide, call or text 988, together if you can. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Keep them in the circle.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep them in the circle. An invitation, a ride, a quiet I'm here, can carry a family a long way. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "job-loss",
"ring": "work",
"title": "Losing Your Job",
"you": {
"id": "ok-g-job-loss-you",
"guide": "job-loss",
"side": "you",
"title": "Losing Your Job",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Losing Your Job",
"sub": "For You",
"say": "If you've lost your job, whether you were laid off, let go, or your work simply ended, this is for you. Take a breath. You belong here."
},
{
"k": "big",
"h": "It hits three places at once.",
"sub": "Who you are, your days, and your money.",
"say": "Losing a job hits three places at once. Who you are, because work is often part of how we answer that question. Your days, because the routine is suddenly gone. And your money, which can bring real fear. It makes sense that this feels so big."
},
{
"k": "words",
"h": "What may show up",
"items": [
"Shock",
"Shame",
"Fear about money",
"Missing your people",
"A loss of purpose"
],
"say": "You may feel shock, even if you saw it coming. Shame, as if it says something about you. Fear about money. You may miss the people you worked beside, and the feeling of being needed. All of this is a normal response to a real loss."
},
{
"k": "big",
"h": "Grieve first. Then search.",
"sub": "It's okay to let it land.",
"say": "It's okay to grieve before you start job hunting. Give yourself a few days to let it land. Talk about it, walk it off, let yourself be sad or angry. A little time now can help you show up as yourself later."
},
{
"k": "points",
"h": "The first practical steps",
"items": [
[
"Apply for unemployment",
"And review your benefits"
],
[
"Make a simple budget",
"What comes in, what goes out"
],
[
"Tell a few people",
"People you trust"
]
],
"say": "Then take the first practical steps. Apply for unemployment, and review any benefits from your job. Make a simple budget: what comes in, and what has to go out. And tell a few people you trust. Most jobs come through people, and so does most support."
},
{
"k": "points",
"h": "Give your days a shape",
"items": [
[
"A start time",
"Up, dressed, and going"
],
[
"Move your body",
"A walk outside counts"
],
[
"Search hours",
"Then stop for the day"
],
[
"One good thing",
"Something that is just yours"
]
],
"say": "Give your days a shape. Pick a start time, and get up and dressed as if the day matters, because it does. Move your body. A walk outside counts. Set hours for the job search, and then stop for the day. And keep one good thing that has nothing to do with work."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"I am more than my job."
],
"sub": "Out loud, or quietly.",
"say": "Here is something to tell yourself. I am more than my job. Say it now, out loud or quietly, and let it be true for a moment.",
"beats": [
"Here is something to tell yourself.",
"I am more than my job.",
{
"t": "Say it now, out loud or quietly, and let it be true for a moment.",
"w": 10
}
]
},
{
"k": "card",
"title": "One line you can send",
"body": "\"I was laid off. Do you know anyone I should talk to?\"",
"say": "When you're ready, here's one line you can send to people you know. I was laid off. I'm looking for my next role. Do you know anyone I should talk to? Career services like CareerOneStop can help too, with job listings, training, and résumés."
},
{
"k": "big",
"h": "If it gets heavy",
"sub": "Local help: 211. Thoughts of suicide: 988.",
"say": "If money gets tight, dial 211 for local help with food, housing, and bills. If sadness settles in and won't lift, talk with your doctor or a counselor. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You are more than your job.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your work was something you did. It was never all of who you are. You are more than your job. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-job-loss-helper",
"guide": "job-loss",
"side": "helper",
"title": "Losing Your Job",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Losing Your Job",
"sub": "For the Helper",
"say": "When someone you care about has lost their job, this is for you. You can't fix the job market. You can help them feel less alone in it."
},
{
"k": "big",
"h": "They may pull away.",
"sub": "Embarrassment keeps people quiet.",
"say": "People who lose a job often feel embarrassed, and they may avoid people for a while. They may skip the gatherings where someone will ask, so what are you up to these days? Keep reaching out anyway, gently."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I'm sorry. That's a lot to handle.",
"How are you doing, really?",
"Want to take a walk this week?"
],
"say": "Here are words that help. I'm sorry. That's a lot to handle. How are you doing, really? And a simple, low-cost invitation: want to take a walk this week?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"Everything happens for a reason.\"",
"It skips past the loss"
],
[
"Advice they did not ask for",
"Lists of places to apply"
],
[
"\"So, any leads?\"",
"Every time you see them"
]
],
"say": "Some things are better left out. Everything happens for a reason. It skips right past the loss. Advice they didn't ask for, like a list of places they should apply. And asking, so, any leads, every single time you see them. Let them bring it up."
},
{
"k": "points",
"h": "Practical help matters",
"items": [
[
"Make introductions",
"One person they should meet"
],
[
"Review a résumé",
"If they want that"
],
[
"Invite them out",
"Low-cost fun counts"
],
[
"Help with the basics",
"Groceries or a ride"
]
],
"say": "Practical help matters. Make introductions. Most jobs come through people, and you may know one person they should meet. Offer to review a résumé, if they want that. Invite them to low-cost fun, so their week has something to look forward to. And if money is tight, groceries or a ride can say a lot."
},
{
"k": "big",
"h": "Who could they meet?",
"say": "Take a moment. Think of the person who lost their job. Picture one person you know who they should meet. Plan to make that introduction this week.",
"beats": [
"Take a moment.",
"Think of the person who lost their job.",
"Picture one person you know who they should meet.",
{
"t": "Plan to make that introduction this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "Remind them who they are",
"body": "Name what they are good at. It has nothing to do with a job title.",
"say": "Job loss can shake how someone sees themselves. You can help by reminding them who they are. Name something they're good at, something that has nothing to do with a job title. You're a great problem solver. People trust you. Words like that can carry them through a hard week."
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Local help: 211. Lasting low mood: a doctor or counselor. Thoughts of suicide: 988.",
"say": "Watch, gently, for sadness that settles in and doesn't lift, more drinking, or pulling away for weeks. You can help them talk with their doctor or a counselor. For help with food, housing, and bills, they can dial 211. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Stay steady. Look after you.",
"sub": "Their loss may stir your own worries.",
"say": "Their job loss may stir worries of your own, about your work or your family's money. Notice that, and talk with someone you trust. You don't have to carry their search for them. Being steady and kind is enough."
},
{
"k": "big",
"h": "Keep showing up.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep showing up, through the whole search and after the new job comes. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "money-crisis",
"ring": "work",
"title": "Money Trouble",
"you": {
"id": "ok-g-money-crisis-you",
"guide": "money-crisis",
"side": "you",
"title": "Money Trouble",
"sideName": "For You",
"mins": 4,
"sources": [
"borkovec"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Money Trouble",
"sub": "For You",
"say": "If money trouble is pressing on you right now, whether it's bills, debt, a shutoff notice, or the fear of losing your home, this is for you. You belong here, just as you are."
},
{
"k": "big",
"h": "Money stress reaches everything.",
"sub": "Sleep, health, and the people at home.",
"say": "Money stress reaches into everything. Your sleep, your body, and the people at home. Dread when the phone rings. Lying awake doing the math. Short tempers at the kitchen table. If that's you, you're having a normal response to real pressure."
},
{
"k": "card",
"title": "A hard season, not who you are.",
"body": "Shame keeps people stuck. Talking helps.",
"say": "Money trouble often comes with shame, the feeling that it says something about who you are. Hard seasons come from job loss, illness, divorce, rising costs, or one bad break. Shame keeps people stuck and quiet. Talking helps."
},
{
"k": "big",
"h": "Face the numbers.",
"sub": "Clarity reduces fear.",
"say": "It can help to face the numbers. It sounds backward, but fear grows in the dark. At a calm time of day, sit down with a pen and list what you owe and when it's due. Clarity reduces fear, even when the numbers are hard."
},
{
"k": "flow",
"h": "One step at a time",
"steps": [
[
"List it",
"What you owe, and when"
],
[
"Dial 211",
"Food, housing, utilities"
],
[
"A credit counselor",
"A nonprofit one, through the NFCC"
],
[
"One next step",
"Just one, this week"
]
],
"say": "Then take it one step at a time. List what you owe and what's due. Dial 211 for local help with food, housing, and utilities. Contact a nonprofit credit counselor. The NFCC can help you find one. And pick one next step for this week. Just one.",
"cue": {
"at": [
1,
2,
3,
5
]
}
},
{
"k": "card",
"title": "Give worry a window",
"body": "Fifteen minutes a day. Night worries wait for tomorrow.",
"say": "If worry keeps you up at night, try giving it a window. Pick fifteen minutes at the same time each day to write your money worries down. When a worry shows up at night, jot it on a note by the bed and save it for tomorrow's window. Your nights can be for rest."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"This is a hard season, not my identity."
],
"sub": "Out loud, or quietly.",
"say": "Here is something to tell yourself. This is a hard season, not my identity. Say it now, out loud or quietly. Then take one slow breath.",
"beats": [
"Here is something to tell yourself.",
"This is a hard season, not my identity.",
"Say it now, out loud or quietly.",
{
"t": "Then take one slow breath.",
"w": 10
}
]
},
{
"k": "points",
"h": "Talk at home",
"items": [
[
"Pick a calm time",
"Before the next bill arrives"
],
[
"Share the plan",
"Along with the problem"
],
[
"Simple words for kids",
"The grown-ups have a plan."
]
],
"say": "Honest conversations at home help. Pick a calm time, before the next bill arrives. Share the plan along with the problem. And if you have kids, give them simple, calm words: things are tight right now, the grown-ups have a plan, and you are safe. Keep the adult worries with the adults."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Danger right now: 911.",
"say": "Money pressure can feel crushing. If it turns into thoughts of ending your life, call or text 988, any time. You deserve help with the weight, and people are ready to help carry it. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "One bill at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to fix it all tonight. One honest look, one call, one bill at a time. This is a hard season, and seasons change. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-money-crisis-helper",
"guide": "money-crisis",
"side": "helper",
"title": "Money Trouble",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Money Trouble",
"sub": "For the Helper",
"say": "When someone you care about is in money trouble, this is for you. Your calm, kind presence can help more than you might think."
},
{
"k": "big",
"h": "They may be ashamed.",
"sub": "It took courage to tell you.",
"say": "Money trouble often carries shame. If they told you, it took courage. Some people keep it hidden for months, even from the people closest to them. How you respond in the first minute matters."
},
{
"k": "words",
"h": "Words that help",
"items": [
"Thanks for telling me.",
"You're not alone in this.",
"What would help most this week?"
],
"say": "Here are words that help. Thanks for telling me. You're not alone in this. And later, what would help most this week?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Lectures about past choices",
"They have replayed them already"
],
[
"\"Just budget better.\"",
"It shrinks a real problem"
],
[
"Telling others",
"Their story stays private"
]
],
"say": "Some things are better left out. Lectures about past choices. They have likely replayed those choices many times already. Quick fixes like, just budget better. Money trouble often comes from job loss, illness, or rising costs. And telling others. Their story is theirs to share."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Groceries and rides",
"Practical help counts"
],
[
"Resources",
"211 and the NFCC"
],
[
"Company",
"A walk, a meal at home"
],
[
"Low-cost fun",
"So life holds some joy"
]
],
"say": "What helps is often practical. Groceries, a ride, or a meal you bring over. Resources: you can sit with them while they dial 211, or look up a nonprofit credit counselor through the NFCC. Company, like a walk or a meal at home. And low-cost fun, so their life holds some joy too."
},
{
"k": "card",
"title": "About lending money",
"body": "Be thoughtful. A gift you can let go of is often kinder.",
"say": "If you're thinking about lending money, be thoughtful. A loan between friends or family can strain the relationship when repaying it is hard. A gift you can truly let go of, even a small one, is often kinder. Give only what you can give without strings or worry."
},
{
"k": "big",
"h": "What could you offer this week?",
"say": "Take a moment. Think of the person carrying this. Picture one practical thing you could offer: a meal, a ride, or an hour of company. Decide when you will offer it.",
"beats": [
"Take a moment.",
"Think of the person carrying this.",
"Picture one practical thing you could offer: a meal, a ride, or an hour of company.",
{
"t": "Decide when you will offer it.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Local help: 211. Thoughts of suicide: 988. Danger right now: 911.",
"say": "Watch, gently, for signs the weight is getting too heavy: weeks of poor sleep, more drinking, or talk of being a burden. Help them talk with their doctor or a counselor. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Stay steady. Look after you.",
"sub": "Set limits you can keep.",
"say": "Their trouble may stir worries about your own money, or memories of hard years. Notice that, and talk with someone you trust. Set limits you can keep, so you can keep showing up. Being steady and kind is a real gift."
},
{
"k": "big",
"h": "You're not alone in this.",
"sub": "The full guide has more, whenever you want it.",
"say": "Thanks for telling me. You're not alone in this. Those words can open the door to everything else. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "retirement",
"ring": "work",
"title": "Retirement",
"you": {
"id": "ok-g-retirement-you",
"guide": "retirement",
"side": "you",
"title": "Retirement",
"sideName": "For You",
"mins": 5,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Retirement",
"sub": "For You",
"say": "If you've retired, or you're about to, this is for you. Whether you counted down the days or never wanted the work to end, this new season deserves your attention."
},
{
"k": "big",
"h": "A threshold, not a finish line.",
"sub": "Freedom and loss can come together.",
"say": "Retirement is a threshold, not a finish line. It can bring freedom and loss in the same week. No alarm clock, and no one waiting on you at work. More time, and fewer reasons to get out of the house. Both can be true at once."
},
{
"k": "words",
"h": "It can all show up",
"items": [
"Relief",
"Restlessness",
"Feeling invisible",
"Who am I now?"
],
"say": "You may feel relief, and then restlessness. You may feel invisible without a work role, as if people stopped asking what you think. And under it all, a quiet question: who am I now? None of it means you retired wrong. It means the work mattered."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"Walter told me about his thirty five years as an adult probation officer. His hands moved while he talked.",
"Every day, sitting across from people who had made serious mistakes. Trying to help them find a better road.",
"\"The best preparation for the end of life is learning how to be alone without being lonely.\""
],
"lesson": "The work shaped you. It is not all of you.",
"note": "Names and details changed",
"hold": 2,
"say": "I sat with a man named Walter soon after he enrolled in hospice. I asked him to tell me about his life, and he started with his work. Thirty five years, he said, as an adult probation officer. His hands moved while he talked. Every day, sitting across from people who had made serious mistakes, trying to help them find a better road. He never married, and never had kids. Then he looked straight at me. Turns out the best preparation for the end of life is learning how to be alone without being lonely."
},
{
"k": "big",
"h": "Plan for connection, not just leisure.",
"sub": "Structure and purpose matter as much as money.",
"say": "When the job ends, so do the daily faces, the shared jokes, and the reasons to show up. So plan for connection, not just leisure. Structure and purpose matter as much as money. Being alone can be peaceful. Being lonely is something to tend."
},
{
"k": "points",
"h": "Build a weekly rhythm",
"items": [
[
"A few anchors",
"Things that happen every week"
],
[
"Something to learn",
"A class, a skill, a craft"
],
[
"Somewhere to give",
"Volunteer, mentor, teach"
],
[
"Your people",
"Old colleagues and new friends"
]
],
"say": "Try building a simple weekly rhythm. A few anchors, like a morning walk or a standing coffee, that happen every week. Something to learn, like a class or a skill you never had time for. Somewhere to give: volunteering, mentoring, or passing on what you know. And your people. Stay in touch with former colleagues, and make room for new friends. Movement and health routines belong in the rhythm, too."
},
{
"k": "card",
"title": "Try saying this",
"body": "\"I'm figuring out this new season. Want to join me for something new?\"",
"say": "You don't have to figure this out alone. Try saying to a friend: I'm figuring out this new season. Want to join me for something new? Most people are glad to be asked."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"I still have much to give."
],
"sub": "Out loud, or quietly.",
"say": "Here is something to tell yourself. I still have much to give. Say it now, out loud or quietly. Then picture one person who could use what you know.",
"beats": [
"Here is something to tell yourself.",
"I still have much to give.",
"Say it now, out loud or quietly.",
{
"t": "Then picture one person who could use what you know.",
"w": 10
}
]
},
{
"k": "big",
"h": "If it gets heavy",
"sub": "Your doctor or a counselor. 988. Danger now: 911.",
"say": "Give yourself time to adjust. If loneliness settles in, or a low mood doesn't lift for weeks, talk with your doctor or a counselor. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You still have much to give.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your work shaped you, and it was never all of you. You still have much to give. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-retirement-helper",
"guide": "retirement",
"side": "helper",
"title": "Retirement",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Retirement",
"sub": "For the Helper",
"say": "When someone you care about has retired, this is for you. Their wisdom is a gift. You can help them find where it fits now."
},
{
"k": "big",
"h": "They may miss their role.",
"sub": "And the rhythm of the day.",
"say": "They may miss their role, their routine, and the people they saw every day. Some feel relief and restlessness at once. Some feel invisible, as if no one asks what they think anymore. That can be true even when they were glad to retire."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What are you excited to try?\"",
"\"What did you love most about your work?\"",
"\"Would you show me how you do that?\""
],
"say": "Here are words that help. What are you excited to try? What did you love most about your work? And, would you show me how you do that? Asking for their skill says, you still matter here."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"You must be bored.\"",
"It can sting"
],
[
"\"Must be nice.\"",
"It skips past the loss"
],
[
"Filling their calendar",
"Let them choose"
]
],
"say": "Some things are better left out. You must be bored can sting, even said as a joke. Must be nice skips past the loss they may be feeling. And filling their calendar for them. Open hours aren't everyone's hours. Let them choose what they say yes to."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Meaningful roles",
"Invite them in"
],
[
"Their wisdom",
"Ask for it"
],
[
"Something new together",
"A class, a walk, a project"
],
[
"The quiet hours",
"A call, a standing coffee"
]
],
"say": "What helps is often simple. Invite them into meaningful roles, in a club, in the neighborhood, or in your family's life. Ask for their wisdom. Try something new together, like a class, a walk, or a project. And check in during the quiet hours, with a call or a standing coffee."
},
{
"k": "big",
"h": "What could they teach you?",
"say": "Take a moment. Think of the person who retired. Picture one thing they know how to do that you'd like to learn. Plan to ask them this week.",
"beats": [
"Take a moment.",
"Think of the person who retired.",
"Picture one thing they know how to do that you'd like to learn.",
{
"t": "Plan to ask them this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Loneliness or a low mood that lingers: their doctor or a counselor. Thoughts of suicide: 988. Danger now: 911.",
"say": "Watch, gently, for loneliness or a low mood that lingers for weeks. You can help them talk with their doctor or a counselor. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Stay steady. Look after you.",
"sub": "Their new season changes yours.",
"say": "If you share a home, their retirement changes your days too. Talk openly about time together and time apart. And notice what this stirs in you, about your own work, or your own future. Talk with someone you trust."
},
{
"k": "big",
"h": "Ask for their wisdom.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their wisdom is a gift. Ask for it, and keep asking. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "career-change",
"ring": "work",
"title": "A Career Change",
"you": {
"id": "ok-g-career-change-you",
"guide": "career-change",
"side": "you",
"title": "A Career Change",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Career Change",
"sub": "For You",
"say": "If you're changing careers, whether you chose it or life changed the path for you, this is for you. Changing paths is brave, and often scary."
},
{
"k": "big",
"h": "Brave, and often scary.",
"sub": "Excitement and doubt can share a day.",
"say": "A career change can feel like a door opening and a floor tilting at the same time. One morning you feel excited. By evening you wonder what you were thinking. Both belong to a real change."
},
{
"k": "words",
"h": "It can all show up",
"items": [
"Excitement",
"Doubt",
"Fear of failure",
"Grief for the old path"
],
"say": "You may feel excitement, and doubt right behind it. Fear of failure, or of looking foolish. And grief for the path you're leaving, even if you chose to leave it. The old work held part of who you were. Missing it makes sense."
},
{
"k": "story",
"title": "Finding a New Purpose. Sophia's Story",
"lines": [
"Sophia was twenty-eight, with a small training clientele and big dreams, when a rare bone disease changed everything.",
"I asked her, \"Even if your body changes, what parts of you, the real you, can still show up to help and strengthen others?\"",
"\"I can't train people to run marathons anymore. But maybe I can help them run their own race.\""
],
"lesson": "Your gifts can find a new shape.",
"note": "Names and details changed",
"hold": 2,
"say": "I met Sophia in her small apartment, full of motivational posters and resistance bands. She was twenty-eight, building a life as a physical trainer, when a rare progressive bone disease took that future off the table. Everything I worked for is gone, she told me. Later, I asked her, even if your body changes, what parts of you, the real you, can still show up to help and strengthen others? She had always been a natural encourager. One afternoon she said, I can't train people to run marathons anymore. But maybe I can help them run their own race."
},
{
"k": "big",
"h": "Your past experience still counts.",
"sub": "What you learned comes with you.",
"say": "Whatever is changing for you, your past experience still counts. The skills, the people you know, and the hard lessons all come with you. They may simply find a new shape."
},
{
"k": "points",
"h": "Start small",
"items": [
[
"Talk to three people",
"Who do the work you want"
],
[
"Try a project",
"A small taste first"
],
[
"Take a class",
"Learn as you go"
],
[
"Make a bridge plan",
"For money, while you change"
]
],
"say": "Start small. Talk to three people who do the work you want. Try a project, a small taste before the big leap. Take a class. And make a financial bridge plan for the in-between months. If money is tight, call or text 211, or a nonprofit credit counselor, for help sorting it out."
},
{
"k": "card",
"title": "Try saying this",
"body": "\"I'm exploring a new direction. Can I pick your brain?\"",
"say": "Most people like talking about their work. Try saying: I'm exploring a new direction. Can I pick your brain? Mentors and community make the road less lonely."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"I'm allowed to grow."
],
"sub": "Then name one small step.",
"say": "Here is something to tell yourself. I'm allowed to grow. Say it now, out loud or quietly. Then name one small step you could take this week.",
"beats": [
"Here is something to tell yourself.",
"I'm allowed to grow.",
"Say it now, out loud or quietly.",
{
"t": "Then name one small step you could take this week.",
"w": 10
}
]
},
{
"k": "big",
"h": "Expect a season of being new again.",
"sub": "A counselor can help. 988. Danger now: 911.",
"say": "Expect a season of being new again. It's humbling, and it passes. If anxiety or a low mood takes hold during the change, talk with your doctor or a counselor. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You're allowed to grow.",
"sub": "The full guide has more, whenever you want it.",
"say": "You're allowed to grow, and to take it one step at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-career-change-helper",
"guide": "career-change",
"side": "helper",
"title": "A Career Change",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Career Change",
"sub": "For the Helper",
"say": "When someone you care about is changing careers, this is for you. They may need encouragement more than advice."
},
{
"k": "big",
"h": "Encouragement more than advice.",
"sub": "They have likely heard the risks already.",
"say": "They have probably already listed every risk, many times, often at night. What they need from you is someone who believes they can do the hard, new thing."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I believe in you.\"",
"\"What's drawing you to it?\"",
"\"Who could I introduce you to?\""
],
"say": "Here are words that help. I believe in you. What's drawing you to it? And a practical one: who could I introduce you to? Then follow through."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Listing what could go wrong",
"They know the risks"
],
[
"\"Are you sure?\" again",
"Once is plenty"
],
[
"\"Why leave a good job?\"",
"It skips their reasons"
]
],
"say": "Some things are better left out. Listing everything that could go wrong. They already know. Asking are you sure, again and again. Once is plenty. And why would you leave a good job? It skips past the reasons they've thought through."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Introductions",
"People in the new field"
],
[
"Practical support",
"Rides, meals, a quiet room"
],
[
"Patience",
"Being new takes time"
],
[
"Small wins",
"Celebrate them"
]
],
"say": "What helps is practical. Introductions to people in the new field. Practical support during classes or long days, like a meal, a ride, or a quiet room to study. Patience, because being new again takes time. And celebrate the small wins along the way."
},
{
"k": "big",
"h": "Who could you introduce them to?",
"say": "Take a moment. Think of the person making this change. Picture one person you know who could help them. Plan to make that introduction this week.",
"beats": [
"Take a moment.",
"Think of the person making this change.",
"Picture one person you know who could help them.",
{
"t": "Plan to make that introduction this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "When the change wasn't chosen",
"body": "Grief first. Anxiety or a low mood: a counselor. Thoughts of suicide: 988. Danger now: 911.",
"say": "Sometimes the change wasn't chosen, after a layoff, an injury, or an illness. Then grief comes first, and the plan can wait. Watch, gently, for anxiety or a low mood that won't lift, and help them find a counselor. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Stay steady. Look after you.",
"sub": "Their change may touch your life too.",
"say": "If you share a home or a budget, their change touches your life too. Say your own worries plainly, at a calm time, and keep cheering. Notice what this stirs in you, about your own work or a dream you set aside. Talk with someone you trust."
},
{
"k": "big",
"h": "Cheer them on.",
"sub": "The full guide has more, whenever you want it.",
"say": "Cheer them on, through the first steps and the slow middle. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "moving",
"ring": "work",
"title": "Moving to a New Place",
"you": {
"id": "ok-g-moving-you",
"guide": "moving",
"side": "you",
"title": "Moving to a New Place",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Moving to a New Place",
"sub": "For You",
"say": "If you've just moved, or you're about to, whether across town or across the country, this is for you. Even a good move can be hard."
},
{
"k": "big",
"h": "Even a good move is a big one.",
"sub": "One of life's big stressors.",
"say": "Moving is one of life's big stressors, even when it's a change you wanted. Everything takes more energy. Finding groceries, a doctor, the right road home. The familiar comforts are gone, and you're building new ones from scratch."
},
{
"k": "words",
"h": "You may feel it all at once",
"items": [
"Excited",
"Lonely",
"Tired",
"Homesick",
"Unsure"
],
"say": "You may feel excited and lonely at the same time. Tired, from a hundred small decisions. Homesick, for people and places you didn't know you'd miss this much. Homesickness is a form of grief. It makes sense to grieve what you left, even when you chose to go."
},
{
"k": "card",
"title": "It takes months, not weeks.",
"body": "Give yourself time to feel at home.",
"say": "Feeling at home usually takes months, not weeks. If you're a few weeks in and it still feels strange, you're right on time. Be patient with yourself, and with anyone who moved with you. Kids and partners often adjust at different speeds."
},
{
"k": "points",
"h": "Make a small home base",
"items": [
[
"Unpack one room",
"A calm space that is yours"
],
[
"Find a nearby place",
"A walk, a park, a coffee shop"
],
[
"Keep one old routine",
"Something that moves with you"
]
],
"say": "Start small. Unpack one room fully, so you have one calm space. Find one nearby place you can return to: a walk, a park, or a coffee shop. And keep one old routine going, like Saturday pancakes or an evening walk. Small, regular routines help a new place become yours."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"I can miss the old place and still grow here."
],
"sub": "Out loud, or quietly.",
"say": "Here is something to tell yourself. I can miss the old place and still grow here. Say it now, out loud or quietly, and let both parts be true.",
"beats": [
"Here is something to tell yourself.",
"I can miss the old place and still grow here.",
{
"t": "Say it now, out loud or quietly, and let both parts be true.",
"w": 10
}
]
},
{
"k": "points",
"h": "Find your people",
"items": [
[
"Join one group",
"A class, a team, a club"
],
[
"Say yes",
"Even to small invitations"
],
[
"Ask a neighbor",
"Where would you recommend?"
],
[
"Keep old friends",
"While you build new ones"
]
],
"say": "Then start finding your people. Join one group, like a class, a team, or a club. Say yes to invitations, even small ones. Ask a neighbor or a coworker: we just moved here. Is there a group or place you'd recommend? And stay in touch with old friends while you build new ones."
},
{
"k": "big",
"h": "If the lonely doesn't lift",
"sub": "A doctor or counselor. Thoughts of suicide: 988.",
"say": "If loneliness or low mood doesn't lift after several months, talk with a doctor or a counselor in your new town. That's a strong next step. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Feeling at home takes time.",
"sub": "The full guide has more, whenever you want it.",
"say": "One room, one walk, one new face at a time, this place can become yours. Feeling at home takes time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-moving-helper",
"guide": "moving",
"side": "helper",
"title": "Moving to a New Place",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Moving to a New Place",
"sub": "For the Helper",
"say": "When someone new has moved near you, or someone you love has moved away, this is for you. You can help a new place start to feel like home."
},
{
"k": "big",
"h": "Chosen can still be lonely.",
"sub": "Even a wanted move takes a lot.",
"say": "It's easy to assume someone is fine because the move was their choice, or a good opportunity. Even a wanted move can be lonely. They may feel unsure how to start over, and too tired to try."
},
{
"k": "words",
"h": "Words that help",
"items": [
"Welcome! Want to grab coffee?",
"How are you settling in?",
"What do you miss most?"
],
"say": "Here are words that help. Welcome! Want to grab coffee? How are you settling in? And, once you know each other a little, what do you miss most about home?"
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Something specific",
"A day, a time, a place"
],
[
"Local tips",
"Doctors, parks, the good bakery"
],
[
"One introduction",
"Just one person"
],
[
"Keep inviting",
"Even after a no"
]
],
"say": "What helps is simple and specific. Invite them to something with a day, a time, and a place. Share local tips: a good doctor, the parks, the bakery everyone loves. Introduce them to one person. And keep inviting, even after a no. Settling in is tiring, and the next invitation may be the one they say yes to."
},
{
"k": "card",
"title": "Everyone who moved",
"body": "Kids and partners adjust at their own speed.",
"say": "Remember everyone who moved. Kids and partners often adjust at different speeds. A teenager may be grieving a whole circle of friends. A partner who moved for someone else's job may be the loneliest one in the house. Include them in your welcome."
},
{
"k": "big",
"h": "Who could you welcome?",
"say": "Take a moment. Think of someone new in your neighborhood, your workplace, or your school. Picture one simple invitation you could offer them. Decide when you will ask.",
"beats": [
"Take a moment.",
"Think of someone new in your neighborhood, your workplace, or your school.",
"Picture one simple invitation you could offer them.",
{
"t": "Decide when you will ask.",
"w": 10
}
]
},
{
"k": "card",
"title": "If you are the one far away",
"body": "Call on the hard days. Ask about the new place. Listen.",
"say": "If you're the one they left behind, you matter here too. Call on the hard days, like the first holidays and birthdays. Ask about the new place, and listen for the lonely parts too. Let them miss home, and let them grow where they are."
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Low mood after several months: a doctor or counselor. Thoughts of suicide: 988.",
"say": "Watch, gently, for loneliness or low mood that doesn't lift after several months. Help them find a doctor or a counselor in their new town. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Being a welcomer is a quiet gift.",
"sub": "To them, and to your whole community.",
"say": "You don't have to become their best friend. Being a welcomer is a quiet gift, to them and to your whole community. Welcome at a pace you can keep. And notice what it stirs in you. Maybe you remember your own first lonely months somewhere new."
},
{
"k": "big",
"h": "One invitation at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "One coffee, one introduction, one invitation at a time, you can help a new place start to feel like home. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "military",
"ring": "work",
"title": "Coming Home From Military Service",
"you": {
"id": "ok-g-military-you",
"guide": "military",
"side": "you",
"title": "Coming Home From Military Service",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Coming Home From Military Service",
"sub": "For You",
"say": "If you've come home from military service, whether last month or many years ago, this is for you. Thank you for being here."
},
{
"k": "big",
"h": "A big transition, even when you are glad to be home.",
"say": "Leaving military life is a big transition, even when you're glad to be home. The mission, the structure, and the people who had your back all change at once. Civilian life may feel slow, confusing, or lonely. That makes sense."
},
{
"k": "words",
"h": "It can all show up",
"items": [
"Missing your unit",
"Feeling out of place",
"Restlessness",
"Things that are hard to say"
],
"say": "You may miss your unit, and the closeness you had there. You may feel out of place in rooms full of people who seem to worry about small things. You may feel restless without a mission. And some veterans carry memories, injuries, or moral injury that are hard to talk about. Many veterans feel some of this. You are not the only one."
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Your County Veterans Service Officer",
"Or the Minnesota Dept. of Veterans Affairs"
],
[
"One person from your unit",
"Reach out this week"
],
[
"A simple daily routine",
"Wake, move, eat, sleep"
]
],
"say": "Here are a few first steps. Connect with your local County Veterans Service Officer, or the Minnesota Department of Veterans Affairs. They can help you find the benefits and services you've earned. Reach out to one person from your unit this week. And build a simple daily routine: a set time to wake, to move, to eat, and to sleep."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Veteran peer groups",
"People who get it"
],
[
"A new mission",
"Work, service, or learning"
],
[
"Movement and sleep",
"Your body was trained for both"
]
],
"say": "What helps many veterans is a few things together. Veteran peer groups, with people who get it without a long explanation. A new mission, like work, service, or learning something new. And physical activity and good sleep, which steady the body and the mind."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"My service mattered, and so does what comes next.",
"Asking for help is a strength I already know."
],
"sub": "Out loud, or quietly.",
"say": "Here are two things you can tell yourself. My service mattered, and so does what comes next. Asking for help is a strength I already know. Pick the one you need most, and say it now, out loud or quietly.",
"beats": [
"Here are two things you can tell yourself.",
"My service mattered, and so does what comes next.",
"Asking for help is a strength I already know.",
{
"t": "Pick the one you need most, and say it now, out loud or quietly.",
"w": 10
}
]
},
{
"k": "card",
"title": "Try saying this",
"body": "\"I'm finding the transition harder than I expected. Can we talk?\"",
"say": "You don't have to explain everything to reach out. Try saying to someone you trust: I'm finding the transition harder than I expected. Can we talk?"
},
{
"k": "big",
"h": "Help built for veterans works.",
"sub": "The VA or a counselor, when things keep growing.",
"say": "Help built for veterans is there, and it works. If nightmares, anger, or drinking keep growing, talk with the VA or a counselor. Using that help is part of the mission now."
},
{
"k": "big",
"h": "Veterans Crisis Line",
"sub": "Call 988 and press 1, or text 838255. Danger now: 911.",
"say": "If you have thoughts of ending your life, call the Veterans Crisis Line any time. Call 988 and press 1, or text 838255. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your service mattered. So does what comes next.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your service mattered, and so does what comes next. The full guide has more, whenever you want it."
}
],
"crisis": [
"988, then press 1: Veterans Crisis Line",
"Text 838255: Veterans Crisis Line",
"911: danger right now"
]
},
"helper": {
"id": "ok-g-military-helper",
"guide": "military",
"side": "helper",
"title": "Coming Home From Military Service",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Coming Home From Military Service",
"sub": "For the Helper",
"say": "When someone you care about has come home from military service, this is for you. Families go through the transition too."
},
{
"k": "big",
"h": "They may feel out of place.",
"sub": "Some things they may not be ready to share.",
"say": "They may feel out of place, or miss the structure and the people they served with. They may carry things they aren't ready to share. That isn't a wall against you. It's part of coming home."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm glad you're home.\"",
"\"I'm here if you ever want to talk.\"",
"\"Want to come along Saturday?\""
],
"say": "Here are words that help. I'm glad you're home. I'm here if you ever want to talk. And a plain invitation: want to come along Saturday? Then let them set the pace."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Asking if they killed anyone",
"Let them choose what to share"
],
[
"Assuming every veteran has PTSD",
"Each person is different"
],
[
"Pushing for the stories",
"They may come in time"
]
],
"say": "Some things are better left out. Asking if they killed anyone. Let them choose what to share. Assuming every veteran has PTSD. Each person is different. And pushing for the stories. If they come, they'll come in their own time."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Invite them into community",
"And keep inviting"
],
[
"Veteran services",
"Help them connect"
],
[
"Patience",
"Adjustment takes time"
]
],
"say": "What helps is steady and practical. Invite them into community, and keep inviting. Help them connect with veteran services, like their County Veterans Service Officer. And be patient. Adjustment takes time, sometimes a long time."
},
{
"k": "big",
"h": "What could you invite them to?",
"say": "Take a moment. Think of the person who came home. Picture one thing you could invite them to this week, something side by side. Send that text today.",
"beats": [
"Take a moment.",
"Think of the person who came home.",
"Picture one thing you could invite them to this week, something side by side.",
{
"t": "Send that text today.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Nightmares, anger, or drinking that keep growing: the VA or a counselor. Crisis: 988, press 1. Danger now: 911.",
"say": "Watch, gently, for nightmares, anger, or drinking that keep growing. You can help them talk with the VA or a counselor. If they talk about not wanting to live, help them call 988 and press 1 for the Veterans Crisis Line, or text 838255. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Look after you, too.",
"sub": "Support for families is out there.",
"say": "Families go through the transition too. Roles at home shift, and you may feel shut out or worn thin. Ask their County Veterans Service Officer about support for families, and talk with someone you trust."
},
{
"k": "big",
"h": "I'm glad you're home.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be patient. Adjustment takes time. Keep saying it, in words and in showing up: I'm glad you're home. The full guide has more, whenever you want it."
}
],
"crisis": [
"988, then press 1: Veterans Crisis Line",
"Text 838255: Veterans Crisis Line",
"911: danger right now"
]
}
},
{
"id": "faith-crisis",
"ring": "faith",
"title": "A Crisis of Faith",
"you": {
"id": "ok-g-faith-crisis-you",
"guide": "faith-crisis",
"side": "you",
"title": "A Crisis of Faith",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Crisis of Faith",
"sub": "For You",
"say": "If your faith has been shaken, and the old answers no longer fit what you've lived through, this is for you. Whatever your tradition, or if you're somewhere in-between, you belong here."
},
{
"k": "big",
"h": "Doubt is part of many faith journeys.",
"sub": "Not the end of them.",
"say": "Doubt is part of many faith journeys, not the end of them. Many traditions count people who wrestled with deep doubt among their saints and teachers. Wrestling can be a form of faithfulness. Your questions don't mean you've failed."
},
{
"k": "words",
"h": "It can feel like",
"items": [
"Unmoored",
"Anxious",
"Guilty",
"Strangely free"
],
"say": "A crisis of faith can leave you feeling unmoored, anxious, or guilty. Some people feel strangely free, and then guilty about the freedom. Old answers may no longer fit what you've been through. All of that makes sense."
},
{
"k": "story",
"title": "Why Is God Doing This to Me?",
"lines": [
"Mary's arms were thrashing with Parkinson's tremors when she asked me, why is God doing this to me?",
"I was careful not to rush. I said, Mary, anyone in your shoes would be asking the same thing.",
"Later she said, \"He has never left me. God has been the one who got me through this.\""
],
"lesson": "Her questions were welcome. Yours are too.",
"note": "Names and details changed",
"hold": 2,
"say": "I sat with a woman named Mary whose arms were thrashing with Parkinson's tremors. She asked me, why is God doing this to me? I was careful not to rush an answer. I said, Mary, anyone in your shoes would be asking the same thing. I told her the Bible is full of people shaking their fist at God, and I shook mine over my head. She almost smiled. Later she said, he has never left me. That was Mary's way through. Yours may look different."
},
{
"k": "points",
"h": "Hold your questions gently",
"items": [
[
"Write them down",
"Honestly, in your own words"
],
[
"Talk with someone",
"Who can sit with doubt"
],
[
"Keep what feels true",
"Rest from what doesn't, for now"
]
],
"say": "You can hold your questions without deciding everything now. Write them down, honestly, in your own words. Talk with a chaplain, a spiritual director, or a trusted mentor who can sit with doubt without panic. Keep the practices that still feel true, and rest from the ones that don't, for now."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"My questions are welcome.",
"I don't have to have it figured out today."
],
"sub": "Out loud, or quietly.",
"say": "Here are two things you can tell yourself. My questions are welcome. I don't have to have it figured out today. Pick the one you need most, and say it now, out loud or quietly.",
"beats": [
"Here are two things you can tell yourself.",
"My questions are welcome.",
"I don't have to have it figured out today.",
{
"t": "Pick the one you need most, and say it now, out loud or quietly.",
"w": 10
}
]
},
{
"k": "card",
"title": "Start with one safe person.",
"body": "\"I'm wrestling with my faith right now. I'd love to talk with someone who won't try to fix it.\"",
"say": "If you're afraid of judgment from your family or your faith community, start with one safe person. You could say, I'm wrestling with my faith right now. I'd love to talk with someone who won't try to fix it. Look for a community that allows questions. Many do."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Danger right now: 911.",
"say": "Sometimes doubt gets tangled with depression or old trauma. If the heaviness won't lift, talk with a counselor or your doctor. If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "Your questions are welcome here.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be patient with yourself. Wherever your questions lead, they are welcome here. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-faith-crisis-helper",
"guide": "faith-crisis",
"side": "helper",
"title": "A Crisis of Faith",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "A Crisis of Faith",
"sub": "For the Helper",
"say": "When someone you care about is wrestling with their faith, this is for you. You don't have to resolve their questions to be a good companion."
},
{
"k": "big",
"h": "They may be bracing for judgment.",
"sub": "From family, or from their faith community.",
"say": "Someone in a crisis of faith may fear judgment from their faith community, from their family, or from you. They may feel guilty for even asking. What they need most is someone who stays, whatever they conclude."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Those are real questions.\"",
"\"Thanks for trusting me with them.\"",
"\"Tell me more.\""
],
"say": "Words that help. Those are real questions. Thanks for trusting me with them. And, tell me more. Then listen a little longer than feels natural."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Arguments",
"Even gentle ones"
],
[
"Pressure",
"To hold on, or to let go"
],
[
"Quick answers",
"They close the door"
],
[
"Your own fear",
"Notice it, and set it down"
]
],
"say": "Some things are better left out. Arguments, even gentle ones. Pressure, in either direction, to hold on or to let go. And quick answers. Everything happens for a reason ends a conversation they've only just started. If their questions frighten you, notice that, and set it down for now."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Staying close",
"Whatever they conclude"
],
[
"Ordinary time",
"Meals, walks, the usual"
],
[
"A good guide",
"Someone who can sit with doubt"
],
[
"Patience",
"This can take a long time"
]
],
"say": "What helps is staying close, whatever they conclude. Keep ordinary time together, meals, walks, the usual things, so the relationship isn't only about this. If they'd like, help them find a chaplain, a spiritual director, or a counselor who can sit with doubt without panic. And be patient. Faith journeys rarely move in straight lines."
},
{
"k": "big",
"h": "Say it once, so it's ready.",
"say": "Take a moment. Picture the person who is wrestling. Imagine saying to them, those are real questions, and I'm not going anywhere. Say it once now, quietly, so it's ready.",
"beats": [
"Take a moment.",
"Picture the person who is wrestling.",
"Imagine saying to them, those are real questions, and I'm not going anywhere.",
{
"t": "Say it once now, quietly, so it's ready.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Heaviness that won't lift: a counselor or doctor. Thoughts of suicide: 988. Danger now: 911.",
"say": "Watch, gently, for doubt tangled with depression or trauma: sadness that won't lift, or pulling away from everyone. You can help them find a counselor or talk with their doctor. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Look after you, too.",
"sub": "Their questions may stir your own.",
"say": "Their questions may stir your own, or worry you if you share their faith. That's human. Talk with someone you trust, and keep tending whatever steadies you."
},
{
"k": "big",
"h": "Stay close. That is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't need the answers. Stay in relationship. That is enough. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "leaving-faith",
"ring": "faith",
"title": "Changing or Leaving a Faith",
"you": {
"id": "ok-g-leaving-faith-you",
"guide": "leaving-faith",
"side": "you",
"title": "Changing or Leaving a Faith",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Changing or Leaving a Faith",
"sub": "For You",
"say": "If your beliefs are changing, or you're leaving a faith, or finding a new one, this is for you. Wherever you're headed, and wherever you've come from, you belong here."
},
{
"k": "big",
"h": "Grief and relief can sit together.",
"sub": "Even when the change is right for you.",
"say": "Changing faith can mean losing community and closeness with family, even when the change is right for you. So grief and relief can sit side by side. You may feel freedom, loneliness, guilt, anger, or fear about how your family will respond. All of it makes sense."
},
{
"k": "story",
"title": "A Presence That Cannot Be Boxed",
"lines": [
"A man in his fifties was on hospice. His wife and two adult children sat waiting, arms crossed.",
"His wife said, \"We are not religious. But we are deeply spiritual.\"",
"\"We kept what felt true from each tradition and let the rest go. It is not neat or tidy. But it is ours.\""
],
"lesson": "Their path was their own. Yours can be too.",
"note": "Names and details changed",
"hold": 2,
"say": "On one hospice visit, the patient was a man in his fifties. His wife and two adult children sat waiting, arms crossed. His son said, we are just not religious. We are not really sure why you are here. Then his wife leaned forward. We are not religious, she said. But we are deeply spiritual. They had tried different churches, and kept running into judgment, rigid rules, and politics dressed up as faith. So they built something of their own. It is not neat or tidy, she said. But it is ours."
},
{
"k": "big",
"h": "Staying and leaving are both honored.",
"say": "That was one family's way. Some people leave a faith. Some change traditions. Some stay and grow in new ways inside the one they have. Some find their way back. You're allowed to grow in your own way, at your own pace."
},
{
"k": "points",
"h": "For this season of change",
"items": [
[
"Find your people",
"A few who understand"
],
[
"Choose your timing",
"What to tell family, and when"
],
[
"Keep what gives life",
"Practices that still feel true"
]
],
"say": "For this season, find a few people who understand this journey. Decide what you want to tell your family, and when. You get to choose the timing. And keep the practices that still give you life: a ritual, a walk, music, quiet, whatever still feels true."
},
{
"k": "words",
"h": "Something you could say",
"items": [
"My beliefs are changing.",
"I still love you, and I'd like us to stay close."
],
"sub": "In your own voice.",
"say": "If you want words for your family, here are some. My beliefs are changing. I still love you, and I'd like us to stay close. Try saying it now, quietly, in your own voice.",
"beats": [
"If you want words for your family, here are some.",
"My beliefs are changing.",
"I still love you, and I'd like us to stay close.",
{
"t": "Try saying it now, quietly, in your own voice.",
"w": 10
}
]
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"I'm allowed to grow in my own way.",
"Grief and relief can both be true."
],
"say": "And two things to tell yourself. I'm allowed to grow in my own way. Grief and relief can both be true. Families can love across different beliefs, and many do."
},
{
"k": "card",
"title": "If religion hurt you",
"body": "A counselor can help. Abuse by a religious leader: report it to authorities.",
"say": "If religion was a source of harm for you, counseling can help, and Oak's guide When Faith Communities Have Hurt You is there too. Abuse by a religious leader should be reported to authorities. If the change leaves you isolated or very low, reach out to a counselor or your doctor. For thoughts of ending your life, call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Your path can be your own.",
"sub": "The full guide has more, whenever you want it.",
"say": "Many people find the sacred in new places after leaving old ones, and many find meaning in their own words. Your path can be your own. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-leaving-faith-helper",
"guide": "leaving-faith",
"side": "helper",
"title": "Changing or Leaving a Faith",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Changing or Leaving a Faith",
"sub": "For the Helper",
"say": "When someone you love is changing or leaving a faith, especially one you share, this is for you. Your love can outlast your disagreement."
},
{
"k": "big",
"h": "They may be bracing for rejection.",
"sub": "Your first words matter most.",
"say": "They may be bracing for rejection, maybe from you. They may have rehearsed this conversation for months. Your first words carry a lot of weight. Lead with love."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I love you. That doesn't change.\"",
"\"Thank you for telling me.\"",
"\"What has this been like for you?\""
],
"say": "Words that help. I love you. That doesn't change. Thank you for telling me. And, when they're ready, what has this been like for you? Then stay curious, and listen."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Ultimatums",
"Love with conditions closes doors"
],
[
"Guilt",
"About family, tradition, or God"
],
[
"Debate",
"It turns family into opponents"
],
[
"Recruiting",
"Others to pressure them"
]
],
"say": "Some things close doors. Ultimatums, like come back or don't come home. Guilt, about the family, the tradition, or God. Debate, which turns family into opponents. And recruiting relatives to pressure them. If you hold this faith dearly, your grief about their change is real. Bring that grief to someone else, not to them."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Ordinary closeness",
"Holidays, meals, phone calls"
],
[
"Curiosity",
"Ask, then listen"
],
[
"Room at gatherings",
"To join in, or sit quietly"
],
[
"Patience",
"Faith rarely moves in straight lines"
]
],
"say": "What helps is ordinary closeness. Keep the holidays, the meals, and the phone calls. Stay curious about what they're finding, with no agenda. At gatherings with prayer or worship, make room for them to join in or sit quietly, with no comment. And be patient. Faith journeys rarely move in straight lines."
},
{
"k": "big",
"h": "Picture your next conversation.",
"say": "Take a moment. Picture the person who is changing. Imagine saying, I love you, and that doesn't change. Say it once now, quietly, so it's ready.",
"beats": [
"Take a moment.",
"Picture the person who is changing.",
"Imagine saying, I love you, and that doesn't change.",
{
"t": "Say it once now, quietly, so it's ready.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Isolation or deep sadness: a counselor. Thoughts of suicide: 988. Danger now: 911.",
"say": "Changing faith can mean losing a whole community at once. Watch, gently, for isolation or sadness that deepens. Help them find new community, spiritual or not, or a counselor, especially if religion was a source of harm. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Look after you, too.",
"sub": "Your grief is real. So is your love.",
"say": "If you share the faith they're leaving, you may feel grief, fear, or even a sense of failure. That's human. Talk with a friend, a counselor, or your own faith leader. Your grief is real, and so is your love."
},
{
"k": "big",
"h": "Your love can outlast this.",
"sub": "The full guide has more, whenever you want it.",
"say": "Families can love across different beliefs. Your love can outlast your disagreement. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "spiritual-dryness",
"ring": "faith",
"title": "When the Sacred Feels Far Away",
"you": {
"id": "ok-g-spiritual-dryness-you",
"guide": "spiritual-dryness",
"side": "you",
"title": "When the Sacred Feels Far Away",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When the Sacred Feels Far Away",
"sub": "For You",
"say": "If prayer, worship, or your sense of the sacred has gone quiet, this is for you. Whether you call it God, the sacred, or simply meaning, and whatever your tradition, you belong here."
},
{
"k": "words",
"h": "It can feel like",
"items": [
"Talking to the ceiling",
"Flat worship",
"Numb",
"Something wrong with me"
],
"say": "Maybe your prayers feel like talking to the ceiling. Worship feels flat. The practices and places that used to move you feel empty. And you may wonder if something is wrong with you."
},
{
"k": "big",
"h": "Dry seasons are common.",
"sub": "In every spiritual tradition.",
"say": "Dry seasons are common in every spiritual tradition. Many mystics describe deserts and dark nights as places of growth. Dryness is often a season of deepening, not an ending. Feeling far away doesn't mean you've been left."
},
{
"k": "points",
"h": "Ways through a dry season",
"items": [
[
"Keep one simple practice",
"Showing up still counts"
],
[
"Try a new way",
"Silence, nature, music, service"
],
[
"Be honest",
"Say the dryness out loud"
],
[
"Tell a companion",
"You don't have to hide it"
]
],
"say": "Here are a few ways through. Keep one simple practice. Showing up still counts, even when you feel nothing. Try a new way to pray or practice: silence, time in nature, music, or serving someone. Be honest about the dryness, in prayer or out loud. And tell a spiritual companion. You don't have to hide it."
},
{
"k": "story",
"title": "The Impossible Dance of Particles",
"lines": [
"A physicist in a nursing home told me, \"I believe in God actually. Just not the church version.\"",
"One ordinary day, peering through a microscope at the impossible dance of particles, she found God again.",
"She began to pray in her own quiet way."
],
"lesson": "The sacred may come through a new door.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/the-impossible-dance-of-particles",
"label": "Read the Full Story: The Impossible Dance of Particles"
},
"hold": 2,
"say": "A physicist in a nursing home had waved off the chaplain at first. Not religious, she said. When we met, she told me, I believe in God actually. Just not the church version. The church she grew up in had left scars, and science became her refuge. Then one ordinary day, peering through a microscope at the impossible dance of particles, she found God again, not in stained glass but in the mystery of creation. She began to pray in her own quiet way. For her, the sacred came through a new door."
},
{
"k": "big",
"h": "Where did you last feel it?",
"say": "Take a slow breath. Think back to a moment you felt close to something sacred, or simply at peace. Maybe it was a place, a song, a person, or a quiet morning. Picture it now, and stay there for a few breaths.",
"beats": [
"Take a slow breath.",
"Think back to a moment you felt close to something sacred, or simply at peace.",
"Maybe it was a place, a song, a person, or a quiet morning.",
{
"t": "Picture it now, and stay there for a few breaths.",
"w": 12
}
]
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"Feeling far away doesn't mean I've been left.",
"Showing up still counts."
],
"say": "Here are two things you can tell yourself. Feeling far away doesn't mean I've been left. And, showing up still counts."
},
{
"k": "card",
"title": "When it might be more",
"body": "Dryness with deep sadness: talk to a doctor too. Thoughts of suicide: 988.",
"say": "Sometimes spiritual dryness comes with depression. If you've lost interest in most things, if sleep or appetite have changed, or the heaviness won't lift, talk to a doctor or counselor too. If you have thoughts of ending your life, call or text 988, any time. For danger right now, call 911."
},
{
"k": "big",
"h": "The sacred may be closer than it feels.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep showing up, gently. The sacred may be closer than it feels. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-spiritual-dryness-helper",
"guide": "spiritual-dryness",
"side": "helper",
"title": "When the Sacred Feels Far Away",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When the Sacred Feels Far Away",
"sub": "For the Helper",
"say": "When someone you love says their faith feels dry, or that the sacred feels far away, this is for you. You don't have to fix it. Companionship is the gift."
},
{
"k": "big",
"h": "They may feel ashamed.",
"sub": "As if they are failing at faith.",
"say": "They may feel ashamed, as if they're failing at faith, or as if something is wrong with them. Telling you took courage. Receive it gently. Dry seasons are common in every tradition, and many describe them as a season of deepening, not ending."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Many faithful people have felt this way.\"",
"\"Thank you for telling me.\"",
"\"Would you like company in it?\""
],
"say": "Words that help. Many faithful people have felt this way. Thank you for telling me. Would you like company in it?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"Not praying enough\"",
"It adds shame"
],
[
"Quick fixes",
"Before you have listened"
],
[
"Alarm",
"Dry seasons are common"
]
],
"say": "Some things are better left out. You must not be praying enough. It adds shame to a heavy season. Quick fixes, like a book, a verse, or a program, before you've listened. And alarm. Dry seasons are common in every tradition, and your calm helps."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Pray with them",
"If they want that"
],
[
"Sit in silence",
"Together, with nothing to fix"
],
[
"Go somewhere new",
"A walk, music, serving"
],
[
"Keep showing up",
"Ordinary time counts"
]
],
"say": "What helps is simple. Pray with them, if they want that. Or simply sit in silence together, with nothing to fix. Invite them somewhere new: a walk outside, a concert, an afternoon serving others. And keep showing up for ordinary time."
},
{
"k": "big",
"h": "Practice a shared silence.",
"say": "Try it now, as practice. Picture sitting beside them, saying nothing at all. Let the quiet be enough. Take three slow breaths, and stay with the silence.",
"beats": [
"Try it now, as practice.",
"Picture sitting beside them, saying nothing at all.",
"Let the quiet be enough.",
{
"t": "Take three slow breaths, and stay with the silence.",
"w": 12
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Dryness with depression: a doctor too. Thoughts of suicide: 988. Danger now: 911.",
"say": "Sometimes dryness travels with depression. Watch, gently, for lost interest in most things, changes in sleep or appetite, or heaviness that won't lift. Encourage them to talk to a doctor too. If they talk about not wanting to live, help them call or text 988. If there is danger right now, call 911."
},
{
"k": "big",
"h": "Look after you, too.",
"sub": "Their dryness may stir your own.",
"say": "Their dryness may stir your own questions, or worry you. That's human. And if you're in a dry season yourself, you can still keep them good company. Keep tending whatever steadies you, and talk with someone you trust."
},
{
"k": "big",
"h": "Companionship is the gift.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to bring the sacred close again. Sit with them. Companionship is the gift. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "moral-injury",
"ring": "faith",
"title": "Moral Injury",
"you": {
"id": "ok-g-moral-injury-you",
"guide": "moral-injury",
"side": "you",
"title": "Moral Injury",
"sideName": "For You",
"mins": 5,
"sources": [
"litz",
"tangney"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Moral Injury",
"sub": "For You",
"say": "If you carry something from your work, your service, or your life that goes against your deepest values, this is for you. Veterans, nurses, doctors, first responders, and many others carry this. You are not alone with it."
},
{
"k": "big",
"h": "A wound to the conscience.",
"sub": "Not a weakness.",
"say": "Moral injury is a wound to the conscience, a wound to the soul. It is not a weakness, and it is not a flaw in who you are. It comes from caring deeply about doing right, and then living through something that broke that."
},
{
"k": "points",
"h": "How it can happen",
"items": [
[
"Something you did",
"Or were ordered to do"
],
[
"Something you saw",
"And could not forget"
],
[
"Something you could not stop",
"Though you wanted to"
],
[
"Being let down",
"By leaders or a system"
]
],
"say": "It can come from something you did, or were ordered to do. Something you saw. Something you couldn't stop, though you wanted to. Or being let down by the leaders or the system you trusted to do right.",
"cue": {
"at": [
0,
1,
2,
3
]
}
},
{
"k": "words",
"h": "It can show up as",
"items": [
"Guilt",
"Shame",
"Anger",
"Betrayal",
"Pulling away"
],
"say": "It can show up as guilt that won't settle. Shame. Anger at yourself, or at the people in charge. A sense of betrayal. And pulling away, from people, from work you loved, or from your faith. These make sense. They are signs of a conscience that still works."
},
{
"k": "card",
"title": "Guilt and shame are different.",
"body": "Guilt: I did something wrong. Shame: I am wrong.",
"say": "It helps to know that guilt and shame are different. Guilt says, I did something wrong. Shame says, I am wrong. Guilt can lead toward repair. Shame tends to make people hide. You are more than the worst thing you did, or saw."
},
{
"k": "big",
"h": "I carry this because I care.",
"sub": "Out loud, or quietly.",
"say": "Here is something you can tell yourself. I carry this because I care about doing right. Take a slow breath. Now say it, out loud or quietly, and let it be true for a moment.",
"beats": [
"Here is something you can tell yourself.",
"I carry this because I care about doing right.",
"Take a slow breath.",
{
"t": "Now say it, out loud or quietly, and let it be true for a moment.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps it heal",
"items": [
[
"Tell it to someone safe",
"Honestly, all of it"
],
[
"Find people who understand",
"Peers who have been there"
],
[
"Repair and service",
"One act at a time"
],
[
"Lament or confession",
"If your tradition holds it"
]
],
"say": "Healing usually comes slowly, and it often comes through a few things. Name what happened, honestly, with someone safe. Find peers who understand your work. Over time, look for repair and service, one act at a time. And if your tradition holds rituals of lament or confession, they can help you set something down. Try: something from work is weighing on me, and I need to talk to someone who understands.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "card",
"title": "Your faith may feel far away.",
"body": "Or it may be where you turn. A chaplain can walk with you, whatever you believe.",
"say": "Moral injury can shake faith, or send you looking for it. Your faith may feel far away right now, or it may be where you turn. Many traditions offer confession, lament, and restoration. Chaplains are trained to walk with moral injury, with people of every faith tradition and everything in-between, including none. A counselor who knows moral injury can help too."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Veterans, press 1. Danger right now: 911.",
"say": "If the weight turns into thoughts of ending your life, call or text 988, any time. Veterans, call 988 and press 1, or text 838255. If you are in danger right now, call 911. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "This hurts because you care.",
"sub": "The full guide has more, whenever you want it.",
"say": "This hurts because you care about doing right. That caring is still in you, and it can help you heal. The full guide has more, whenever you want it."
}
],
"crisis": [
"988, then press 1: Veterans Crisis Line",
"Text 838255: Veterans Crisis Line",
"911: danger right now"
]
},
"helper": {
"id": "ok-g-moral-injury-helper",
"guide": "moral-injury",
"side": "helper",
"title": "Moral Injury",
"sideName": "For the Helper",
"mins": 4,
"sources": [
"litz"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Moral Injury",
"sub": "For the Helper",
"say": "If someone you love carries something from their work, their service, or their life that goes against their deepest values, this is for you. You don't need to fix it. You can be someone safe to tell."
},
{
"k": "big",
"h": "They may fear being judged.",
"sub": "Or not being understood.",
"say": "People with a moral injury often go quiet. They may fear you'll judge them. They may fear you won't understand. Or they may want to protect you from what they carry. When they finally speak, how you listen matters a great deal."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"That sounds like it wounded something deep in you.\"",
"\"Take your time. I'm listening.\"",
"\"I'm not going anywhere.\""
],
"say": "Here are words that help. That sounds like it wounded something deep in you. Take your time. I'm listening. And, I'm not going anywhere. Then let the quiet be there. You don't have to fill it."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"You were just doing your job.\"",
"It dismisses what was hurt"
],
[
"Rushing to absolve",
"\"You had no choice.\""
],
[
"Asking for details",
"Let them choose what to share"
],
[
"Judging",
"It confirms their worst fear"
]
],
"say": "Some things are better left out. You were just doing your job. It sounds kind, and it dismisses the very values that were hurt. Rushing to absolve, like, you had no choice. Even when it's true, said too fast it skips the part they need to tell. Asking for graphic details, or whether they killed anyone. Let them choose what to share. And judging. It confirms their worst fear.",
"cue": {
"at": [
1,
3,
6,
8
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listen all the way",
"Without rushing"
],
[
"Let them set the pace",
"Today, or months from now"
],
[
"Help them find peers",
"People who have been there"
],
[
"Help them find support",
"A chaplain or counselor"
]
],
"say": "What helps is steady and simple. Listen all the way through, without rushing to a verdict either way. Let them set the pace, whether they talk today or months from now. Help them find peers who understand their work. And help them find a chaplain or a counselor familiar with moral injury."
},
{
"k": "big",
"h": "Practice the words.",
"say": "Take a moment. Picture the person you're worried about. Picture them finally telling you. Now say it, the way you'd say it to them: that sounds like it wounded something deep in you.",
"beats": [
"Take a moment.",
"Picture the person you're worried about.",
"Picture them finally telling you.",
{
"t": "Now say it, the way you'd say it to them: that sounds like it wounded something deep in you.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Thoughts of suicide: 988. Veterans: 988, press 1, or text 838255. Danger now: 911.",
"say": "Watch, gently, for a weight that keeps growing: drinking more, pulling away from everyone, or talk of being better off gone. If they talk about ending their life, help them call or text 988. Veterans can call 988 and press 1, or text 838255. If there is danger right now, call 911."
},
{
"k": "big",
"h": "These stories can weigh on you too.",
"sub": "Talk with someone you trust.",
"say": "Hearing these stories can affect you too. You may feel shaken, angry for them, or unsure what to do with what you heard. Keep their story in confidence, and still get support for yourself. Talk with someone you trust, a counselor, or a chaplain."
},
{
"k": "big",
"h": "Be someone safe to tell.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can't take this away from them. You can be someone safe to tell, again and again. The full guide has more, whenever you want it."
}
],
"crisis": [
"988, then press 1: Veterans Crisis Line",
"Text 838255: Veterans Crisis Line",
"911: danger right now"
]
}
},
{
"id": "forgiveness",
"ring": "faith",
"title": "Forgiving Someone, or Yourself",
"you": {
"id": "ok-g-forgiveness-you",
"guide": "forgiveness",
"side": "you",
"title": "Forgiving Someone, or Yourself",
"sideName": "For You",
"mins": 4,
"sources": [
"tangney"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Forgiving Someone, or Yourself",
"sub": "For You",
"say": "If someone hurt you and you're wondering about forgiveness, or you're finding it hard to forgive yourself, this is for you. You set the pace here."
},
{
"k": "big",
"h": "Forgiveness is releasing a debt.",
"sub": "Not saying the harm was okay.",
"say": "Forgiveness is releasing a debt. It doesn't mean saying the harm was okay, and it doesn't erase what happened. It means choosing, over time, to stop letting the hurt hold all of you."
},
{
"k": "points",
"h": "What forgiveness can be",
"items": [
[
"Your choice",
"On your timeline"
],
[
"A process",
"Usually not one moment"
],
[
"Separate from going back",
"You can forgive from a distance"
],
[
"For your freedom",
"Not their comfort"
]
],
"say": "Forgiveness is your choice, on your timeline. It's usually a process, not one moment. It's separate from reconciliation: you can forgive someone and never go back. And it's for your freedom, not for their comfort.",
"cue": {
"at": [
0,
1,
2,
3
]
}
},
{
"k": "card",
"title": "Safety comes first.",
"body": "If the harm is still happening, safety comes before forgiveness. Danger right now: 911.",
"say": "If the harm is still happening, safety comes first, before any talk of forgiveness. Forgiving someone never means staying where you are being hurt. Oak's guide When Home Isn't Safe can help you take the next step. If you are in danger right now, call 911."
},
{
"k": "words",
"h": "It can feel like",
"items": [
"Resentment that replays",
"Pressure to forgive too soon",
"Anger",
"Guilt that won't let go"
],
"say": "It can feel like resentment that keeps replaying. Pressure from others to forgive before you're ready. Anger, which is a natural response to being wronged. Or, if the hurt is one you caused, guilt that won't let go. All of it makes sense."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"Marcus told me, most people don't want to hear my story. I spent twenty eight years in prison.",
"I pulled up a chair and told him I was there to listen, not to judge.",
"Don't waste what's left hating yourself for yesterday. Just try to do better today."
],
"lesson": "Owning what you did is different from hating yourself.",
"note": "Names and details changed",
"hold": 2,
"say": "I was called to see a man named Marcus in his final days. He told me, most people don't want to hear my story. I spent twenty eight years in prison. I pulled up a chair and told him I was there to listen, not to judge. Later his voice dropped. Real strength is owning what you did, he said. Asking forgiveness. And, don't waste what's left hating yourself for yesterday. Just try to do better today."
},
{
"k": "card",
"title": "Forgiving yourself",
"body": "Guilt: I did something wrong. Shame: I am wrong.",
"say": "Forgiving yourself is often the hardest. It helps to know that guilt and shame are different. Guilt says, I did something wrong, and it can lead to repair. Shame says, I am wrong, and it keeps you stuck. Owning what you did is different from hating who you are."
},
{
"k": "big",
"h": "Name the hurt.",
"sub": "Then notice what it costs you.",
"say": "Let's try something. Think of the hurt you're carrying. Name it, plainly, in one sentence. Then notice what holding it is costing you. Say to yourself: I can take the time I need.",
"beats": [
"Let's try something.",
"Think of the hurt you're carrying.",
"Name it, plainly, in one sentence.",
"Then notice what holding it is costing you.",
{
"t": "Say to yourself: I can take the time I need.",
"w": 12
}
]
},
{
"k": "points",
"h": "Small steps that help",
"items": [
[
"An unsent letter",
"Say it all. Keep it."
],
[
"Prayer or ritual",
"If your tradition holds it"
],
[
"Someone to talk it through",
"A friend, a chaplain, a counselor"
]
],
"say": "A few small steps can help. Write an unsent letter. Say all of it, and keep it. If you have a faith, prayer or ritual may help. Forgiveness is central to many traditions, and so is justice. Both matter. And talk it through with someone you trust. Try: I'm working on forgiving someone. Can I talk it through? For deep wounds, a counselor can help.",
"cue": {
"at": [
1,
3,
7
]
}
},
{
"k": "big",
"h": "Forgiving is for your freedom.",
"sub": "The full guide has more, whenever you want it.",
"say": "Forgiving is for your freedom, and it can take the time it takes. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-forgiveness-helper",
"guide": "forgiveness",
"side": "helper",
"title": "Forgiving Someone, or Yourself",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Forgiving Someone, or Yourself",
"sub": "For the Helper",
"say": "When someone you care about is working through forgiveness, of someone who hurt them or of themselves, this is for you. Your patience is one of the best gifts you can give."
},
{
"k": "big",
"h": "They may feel pushed to forgive too fast.",
"sub": "By family, by friends, even by faith.",
"say": "Many people feel pushed to forgive too fast, by family, by friends, sometimes by their faith community. That pressure can add shame on top of the hurt. You can be the person who lets them take their time."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Take the time you need.\"",
"\"That hurt you. It matters.\"",
"\"Forgiving doesn't mean going back.\""
],
"say": "Here are words that help. Take the time you need. That hurt you. It matters. And, forgiving doesn't mean going back. Then listen, and honor the hurt before anything else."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"You just need to let it go.\"",
"It skips the hurt"
],
[
"\"Forgive and forget.\"",
"Forgetting may not be safe"
],
[
"\"They didn't mean it.\"",
"It defends the one who hurt them"
],
[
"\"A good person would forgive.\"",
"It adds shame"
]
],
"say": "Some things are better left out. You just need to let it go. It skips right past the hurt. Forgive and forget. Remembering can be what keeps them safe. They didn't mean it. It defends the person who caused the harm. And, a good person would forgive by now. It adds shame to pain.",
"cue": {
"at": [
1,
3,
5,
7
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listen and honor the hurt",
"Before anything else"
],
[
"Respect their boundaries",
"Distance can be wise"
],
[
"Let them set the pace",
"Weeks, months, or years"
],
[
"If they can't forgive themselves",
"Remind them who they are"
]
],
"say": "What helps is steady. Listen, and honor the hurt before anything else. Respect their boundaries. Forgiving someone and keeping distance can go together. Let them set the pace, whether it takes weeks, months, or years. And if they can't forgive themselves, remind them they are more than the worst thing they did.",
"cue": {
"at": [
1,
2,
4,
5
]
}
},
{
"k": "card",
"title": "Safety comes first.",
"body": "Ongoing harm: When Home Isn't Safe. Danger now: 911. Thoughts of suicide: 988.",
"say": "If the harm is still happening, safety comes first, and forgiveness can wait. Oak's guide When Home Isn't Safe has next steps, and 911 is for danger right now. If self-blame turns into thoughts of ending their life, help them call or text 988."
},
{
"k": "big",
"h": "Practice the words.",
"say": "Take a moment. Picture the person you're walking beside. Picture them telling you what they still can't forgive. Now say it, the way you'd say it to them: take the time you need.",
"beats": [
"Take a moment.",
"Picture the person you're walking beside.",
"Picture them telling you what they still can't forgive.",
{
"t": "Now say it, the way you'd say it to them: take the time you need.",
"w": 10
}
]
},
{
"k": "big",
"h": "Notice what it stirs in you.",
"sub": "You may have your own unfinished hurt.",
"say": "Their story may stir your own unfinished hurt. You may even know the person who hurt them. Notice your own feelings, and keep from making their forgiveness about yours. Talk with someone you trust."
},
{
"k": "big",
"h": "Don't rush someone's healing.",
"sub": "The full guide has more, whenever you want it.",
"say": "Healing takes the time it takes. Don't rush someone's healing. Walk beside it. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "church-hurt",
"ring": "faith",
"title": "When Faith Communities Have Hurt You",
"you": {
"id": "ok-g-church-hurt-you",
"guide": "church-hurt",
"side": "you",
"title": "When Faith Communities Have Hurt You",
"sideName": "For You",
"mins": 5,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Faith Communities Have Hurt You",
"sub": "For You",
"say": "If you were hurt by people in a church, or in any faith community, this is for you. Whatever you believe now, or don't, you are welcome here."
},
{
"k": "big",
"h": "Your hurt is real.",
"sub": "It's not a sign that you lack faith.",
"say": "Harm done in the name of faith can wound deeply, because it reaches the places that were supposed to be safe. Your hurt is real. It's not a sign that you lack faith, and it's not a sign that you did something wrong."
},
{
"k": "points",
"h": "How it can happen",
"items": [
[
"Judgment or shame",
"For who you are, or what you asked"
],
[
"Being pushed out",
"When you needed people most"
],
[
"Leaders who protected themselves",
"Instead of protecting people"
],
[
"Abuse of power",
"By someone you trusted"
]
],
"say": "It can happen in many ways. Judgment or shame, for who you are or for the questions you asked. Being pushed out, or left alone, when you needed people most. Leaders who protected themselves instead of protecting people. Or abuse of power, by someone you trusted.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "words",
"h": "It can feel like",
"items": [
"Anger",
"Grief",
"Anxiety in religious places",
"Spiritually homeless"
],
"say": "It can feel like anger, and grief for the community you lost. Your body may tense up at certain songs, buildings, or words. You may feel spiritually homeless. All of that makes sense."
},
{
"k": "story",
"title": "The Atypical Atheist",
"lines": [
"A man in a group home took one look at my badge. He didn't want a chaplain.",
"A pastor had visited his father in the hospital, said a quick prayer, and left without ever asking his father's name.",
"I didn't defend the institution. I asked what he believed in, and I listened."
],
"lesson": "The hurt came from people. It deserved to be heard.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/the-atypical-atheist",
"label": "Read the Full Story: The Atypical Atheist"
},
"hold": 2,
"say": "I once walked into a group home, and a man took one look at my chaplain badge and exploded. He didn't want a chaplain. So I asked him what he did believe in. Later, he told me why. Years ago, a pastor visited his father in the hospital, said a quick prayer, and left without ever asking his father's name. That was the moment, he said. I decided the whole thing was a performance. I didn't defend the institution. I listened."
},
{
"k": "big",
"h": "Your way through is yours.",
"sub": "In a faith community, a new one, or none.",
"say": "That conversation opened something for him, in his own way. Your way through may look very different. Some people heal inside a faith community, some find a new one, and some step away. Each of those can be right. You get to choose."
},
{
"k": "words",
"h": "Something to tell yourself",
"items": [
"The sacred is not the same as the people who misused it."
],
"sub": "Out loud, or quietly.",
"say": "Here is something you can tell yourself. The sacred is not the same as the people who misused it. Take a slow breath. Now say it, out loud or quietly, in your own words if you like.",
"beats": [
"Here is something you can tell yourself.",
"The sacred is not the same as the people who misused it.",
"Take a slow breath.",
{
"t": "Now say it, out loud or quietly, in your own words if you like.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Name what happened",
"Plainly, to yourself first"
],
[
"Find a safe person",
"Someone who will believe you"
],
[
"Take a break",
"From what triggers you"
],
[
"Set boundaries",
"With people and places"
]
],
"say": "A few things help. Name what happened, plainly. Find a safe person to talk with, someone who will believe you. Take a break from what triggers you, for as long as you need. And set boundaries with people and places. Counseling that understands religious harm can help too. Try: I had painful experiences in church, and I'm figuring out what faith looks like now.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "card",
"title": "Abuse by a religious leader",
"body": "Report it to authorities. Danger right now: 911.",
"say": "If a religious leader abused you or someone else, you deserve to be believed, and it should be reported to the authorities, not only to the church. If a vulnerable adult in Minnesota is being harmed, call MAARC at 1-844-880-1574. If you are in danger right now, call 911. If the pain turns into thoughts of ending your life, call or text 988."
},
{
"k": "big",
"h": "You can heal at your own pace.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can heal at your own pace, in or out of religious spaces. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-church-hurt-helper",
"guide": "church-hurt",
"side": "helper",
"title": "When Faith Communities Have Hurt You",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Faith Communities Have Hurt You",
"sub": "For the Helper",
"say": "When someone you care about has been hurt by a church or any faith community, this is for you. Whatever your own beliefs, you can be a safe place for them."
},
{
"k": "big",
"h": "They may be wary of anyone religious.",
"sub": "Even you, if faith matters to you.",
"say": "They may be wary of anyone religious, even you, if faith matters to you. That's not about you. It's about what happened. Trust may come back slowly, and only as they see that you'll respect their pace."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm sorry that happened to you.\"",
"\"I believe you.\"",
"\"You get to set the pace.\""
],
"say": "Here are words that help. I'm sorry that happened to you. I believe you. And, you get to set the pace. Then listen more than you explain."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Defending the institution",
"Even gently"
],
[
"\"Not all churches are like that.\"",
"It moves the focus off them"
],
[
"Pushing them to return",
"Or to leave"
],
[
"\"Have you forgiven them?\"",
"Forgiveness can wait"
]
],
"say": "Some things are better left out. Defending the institution, even gently. Not all churches are like that. It may be true, and it moves the focus off their hurt. Pushing them to return, or pushing them to leave. And, have you forgiven them? That can wait.",
"cue": {
"at": [
1,
2,
4,
5
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Respect their boundaries",
"Places, words, and timing"
],
[
"Keep inviting them",
"To ordinary things"
],
[
"Honor their path",
"Staying, changing, or leaving"
],
[
"Help them find support",
"Counseling that understands"
]
],
"say": "What helps is steady. Respect their boundaries around places, words, and timing. Keep inviting them to ordinary things, like a meal or a walk. Honor their path, whether they stay, find a new community, or step away. And help them find counseling that understands religious harm."
},
{
"k": "big",
"h": "Practice the words.",
"say": "Take a moment. Picture the person you care about. Picture them telling you what happened. Now say it, the way you'd say it to them: I believe you.",
"beats": [
"Take a moment.",
"Picture the person you care about.",
"Picture them telling you what happened.",
{
"t": "Now say it, the way you'd say it to them: I believe you.",
"w": 10
}
]
},
{
"k": "card",
"title": "If there was abuse",
"body": "Believe them. Help them report it to authorities. Danger now: 911.",
"say": "If a religious leader abused them, believe them, and help them report it to the authorities. If a vulnerable adult in Minnesota is being harmed, call MAARC at 1-844-880-1574. If there is danger right now, call 911. If they talk about not wanting to live, help them call or text 988."
},
{
"k": "big",
"h": "It may touch your own faith.",
"sub": "Talk with someone you trust.",
"say": "If it was your own faith community, or one like it, this may be hard to hear. You may feel defensive, sad, or shaken. Notice it, and set it aside while you listen. Then talk with someone you trust about what it stirred."
},
{
"k": "big",
"h": "Listen more than you explain.",
"sub": "The full guide has more, whenever you want it.",
"say": "Listen more than you explain, and let them lead. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "political-division",
"ring": "world",
"title": "Political Division in Families",
"you": {
"id": "ok-g-political-division-you",
"guide": "political-division",
"side": "you",
"title": "Political Division in Families",
"sideName": "For You",
"mins": 4,
"sources": [
"lieberman"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Political Division in Families",
"sub": "For You",
"say": "If politics has come between you and someone in your family, a parent, a sibling, a grown child, this is for you. Whatever your views, and whatever theirs, you belong here."
},
{
"k": "big",
"h": "People who love each other can disagree deeply.",
"say": "People who love each other can disagree deeply. That's true in many families. A disagreement doesn't have to mean the love is gone. Often it means both of you care a great deal about what kind of world you want."
},
{
"k": "words",
"h": "What you might feel",
"items": [
"Dread before holidays",
"Anger",
"Grief for what was easy",
"Tired of trying"
],
"say": "You might feel dread before a holiday, or before a phone call. Anger that flares fast. Grief for a closeness that used to feel easy. Or just tired of trying. All of it makes sense. Putting a feeling into words can help it settle a little, so name it, to yourself or someone you trust."
},
{
"k": "points",
"h": "Before you gather",
"items": [
[
"Decide what is off the table",
"Some topics can wait"
],
[
"Plan a graceful exit line",
"So you can step away kindly"
],
[
"Remember what you love",
"About this person"
]
],
"say": "A little planning helps. Decide which topics are off the table for now. Some conversations can wait for a better day. Plan a graceful exit line, so you can step away kindly when it gets heated. And before you walk in, remember what you love about this person: their laugh, their cooking, the way they showed up for you."
},
{
"k": "card",
"title": "Words you can use",
"body": "\"I love you, and I don't want this to come between us. Can we take a break from politics today?\"",
"say": "Here are words you can use. I love you, and I don't want this to come between us. Can we take a break from politics today? You can say it warmly. A boundary around a topic is a way of protecting the relationship."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Curious questions",
"\"What worries you most?\""
],
[
"Listen to understand",
"Not only to answer"
],
[
"Do things together",
"Cards, a walk, a meal, a game"
]
],
"say": "When you do talk, curious questions help. What worries you most? Listen to understand, not only to answer. You may still disagree, and you may hear the fear or hope underneath. And spend time on things you share that have nothing to do with politics: cards, a walk, a meal, a game."
},
{
"k": "big",
"h": "I can hold my values and still love this person.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence worth keeping close. I can hold my values and still love this person. Say it now, softly, in your own voice. Then take one slow breath, and say it once more.",
"beats": [
"Here is a sentence worth keeping close.",
"I can hold my values and still love this person.",
"Say it now, softly, in your own voice.",
{
"t": "Then take one slow breath, and say it once more.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it turns hurtful",
"body": "Threats or abuse are a safety matter. Danger right now: 911. Thoughts of harming yourself: call or text 988.",
"say": "Disagreement is one thing. Threats, abuse, or cruelty are another, and you can step away from them. A counselor can help you sort out what is safe. If you are in danger right now, call 911. If you have any thoughts of harming yourself, call or text 988."
},
{
"k": "big",
"h": "Your relationships can be bigger than any election.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your relationships can be bigger than any election. Take it one gathering at a time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-political-division-helper",
"guide": "political-division",
"side": "helper",
"title": "Political Division in Families",
"sideName": "For the Helper",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Political Division in Families",
"sub": "For the Helper",
"say": "When someone you love is hurting over political division in their family, it can be hard to know what to say. This is for anyone walking beside them, including the one caught in the middle."
},
{
"k": "big",
"h": "Both sides may feel unheard.",
"say": "In a divided family, both sides may feel unheard. Each one may be sure the other isn't listening. Your part isn't to settle who is right. Your part is to help the people you love feel heard, and stay connected."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"It sounds like this really matters to you.\"",
"\"What worries you most?\"",
"\"I'm glad we can still talk.\""
],
"say": "Here are words that help. It sounds like this really matters to you. What worries you most? And when a hard talk ends well, I'm glad we can still talk. Then listen more than you speak."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Mocking people who disagree",
"Name-calling",
"\"How can you believe that?\""
],
"say": "And some things to set aside. Mocking or name-calling people who disagree, even when they aren't in the room. It tells your friend that disagreement isn't safe with you either. And how can you believe that? It sounds like a question, and it lands like a verdict."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Model respectful listening",
"Calm voice, real questions"
],
[
"Change the subject kindly",
"When the heat rises"
],
[
"Plan shared time",
"Not about politics"
],
[
"Keep confidences",
"On every side"
]
],
"say": "What helps is steady and simple. Model respectful listening, with a calm voice and real questions. Change the subject kindly when the heat rises. Plan shared time that isn't about politics at all. And keep confidences on every side, so each person can trust you."
},
{
"k": "big",
"h": "One thing you can do together.",
"say": "Take a moment right now. Think of the next time your family will be together. Picture one thing you could suggest that everyone can enjoy, a walk, a game, or a meal you make side by side.",
"beats": [
"Take a moment right now.",
"Think of the next time your family will be together.",
{
"t": "Picture one thing you could suggest that everyone can enjoy, a walk, a game, or a meal you make side by side.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it turns threatening",
"body": "Step in for safety. Danger right now: 911.",
"say": "If a disagreement turns threatening or abusive, it is no longer a debate. It's a safety matter. Help the person step away, and encourage a counselor. If anyone is in danger right now, call 911. If your friend speaks of harming themselves, call or text 988 together."
},
{
"k": "big",
"h": "Steady yourself, too.",
"sub": "Your views count too.",
"say": "You have your own views, and they may pull at you. Notice when they do. Take a break from the topic yourself when you need one, and talk with someone you trust. Peacemaking takes patience, and rest."
},
{
"k": "big",
"h": "Peacemaking takes patience.",
"sub": "The full guide has more, whenever you want it.",
"say": "Peacemaking takes patience. Keep listening, keep inviting, and keep the door open. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "immigration",
"ring": "world",
"title": "Living with Immigration Fear",
"you": {
"id": "ok-g-immigration-you",
"guide": "immigration",
"side": "you",
"title": "Living with Immigration Fear",
"sideName": "For You",
"mins": 4,
"sources": [
"lieberman"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with Immigration Fear",
"sub": "For You",
"say": "If you live with fear about immigration, for yourself, your family, or someone you love, this is for you. You don't need to share any details to be here."
},
{
"k": "big",
"h": "Fear for your family is heavy.",
"sub": "Name it, and tend your body.",
"say": "Fear for your family's safety is heavy. It can sit in your body all day. You may stay on alert, sleep poorly, or feel your heart race when you leave home. You may worry most about your children. All of this makes sense. Fear like this is a sign of how much you love."
},
{
"k": "words",
"h": "What you might feel",
"items": [
"Always on alert",
"Trouble sleeping",
"Afraid to leave home",
"Worried for the children"
],
"say": "Putting fear into words can help it settle a little. You might say: I'm always on alert. I can't sleep. I'm afraid when I leave home. I'm worried for my children. Name it to yourself, or to someone you trust."
},
{
"k": "points",
"h": "A family preparedness plan",
"items": [
[
"Emergency contacts",
"People you trust, written down"
],
[
"A caregiver for the children",
"Chosen and asked ahead"
],
[
"Documents in one place",
"Safe, and easy to find"
]
],
"say": "One of the most steadying things you can do is make a family preparedness plan. Choose emergency contacts you trust, and write them down. Choose a caregiver for your children, and ask them ahead of time. And keep important documents together in one safe place. Planning doesn't invite trouble. It gives your family a path."
},
{
"k": "big",
"h": "Preparing is a way of caring for my family.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence worth keeping close. Preparing is a way of caring for my family. Say it now, softly, in your own voice. Then take one slow breath, and say it once more.",
"beats": [
"Here is a sentence worth keeping close.",
"Preparing is a way of caring for my family.",
"Say it now, softly, in your own voice.",
{
"t": "Then take one slow breath, and say it once more.",
"w": 10
}
]
},
{
"k": "card",
"title": "Trusted information",
"body": "A trusted immigration legal aid organization, not rumors. This video is not legal advice.",
"say": "Rumors travel fast, and they can make fear worse. For your own situation, contact a trusted immigration legal aid organization. They can give you accurate information. This video is not legal advice. It's here to help you stay steady while you get the help you need."
},
{
"k": "points",
"h": "For the children",
"items": [
[
"Tell them the basics",
"Calmly, at their level"
],
[
"Keep routines",
"Meals, bedtime, school"
],
[
"Let them ask",
"And answer simply"
]
],
"say": "Children notice fear, even when no one says a word. Tell them the basics of your plan, calmly and at their level. Who would pick them up, and that they would be cared for. Keep routines steady: meals, bedtime, school. And let them ask questions. Simple, honest answers help children feel safe."
},
{
"k": "card",
"title": "You are not alone",
"body": "\"I'm worried about my family's safety. Can you be one of our emergency contacts?\"",
"say": "Stay connected. Community groups and accompaniment programs can walk with you. And you can ask someone you trust: I'm worried about my family's safety. Can you be one of our emergency contacts? If the fear begins to take over your days, a counselor can help. If you have any thoughts of harming yourself, call or text 988. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You are caring for your family.",
"sub": "The full guide has more, whenever you want it.",
"say": "Every step you take to prepare is a way of caring for your family. Take the next one when you're ready. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-immigration-helper",
"guide": "immigration",
"side": "helper",
"title": "Living with Immigration Fear",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with Immigration Fear",
"sub": "For the Helper",
"say": "When someone you know is living with fear about immigration, it can be hard to know how to help. This is for anyone walking beside them."
},
{
"k": "big",
"h": "They may be afraid to share details.",
"sub": "You can help without knowing them.",
"say": "Your friend may be afraid to share details, even with you. That's wise, and it isn't about trust in you. You can help without knowing their story. Your steadiness, and your discretion, matter most."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm here for your family.\"",
"\"What would help this week?\"",
"\"You can count on me.\""
],
"say": "Here are words that help. I'm here for your family. What would help this week? And, you can count on me. Then follow their lead."
},
{
"k": "words",
"h": "What to set aside",
"items": [
"Asking about status",
"Sharing their situation",
"Passing on rumors"
],
"say": "And some things to set aside. Asking about anyone's status. It isn't needed for you to help. Sharing their situation with others, even kindly. Their privacy can protect them. And passing on rumors, which can feed fear. Point them to trusted legal aid instead."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Be an emergency contact",
"If they ask"
],
[
"Offer rides and childcare",
"Specific, practical help"
],
[
"Offer to go with them",
"To appointments, if they want"
],
[
"Keep their confidence",
"Always"
]
],
"say": "What helps is practical. Be an emergency contact, if they ask you. Offer rides, or childcare, in specific ways: I can take the kids Tuesday. Offer to go with them to appointments, if they want company. And keep their confidence, always."
},
{
"k": "big",
"h": "One specific offer.",
"say": "Take a moment right now. Think of your friend, and their week ahead. Picture one specific offer you could make, a ride, a meal, or an hour with the kids, and the simple words you'll use.",
"beats": [
"Take a moment right now.",
"Think of your friend, and their week ahead.",
{
"t": "Picture one specific offer you could make, a ride, a meal, or an hour with the kids, and the simple words you'll use.",
"w": 10
}
]
},
{
"k": "card",
"title": "Point to legal aid",
"body": "For their situation: a trusted immigration legal aid organization.",
"say": "You don't need to know the law to help. This video is not legal advice. For questions about their situation, point them to a trusted immigration legal aid organization. You can help them find one, or offer to go along."
},
{
"k": "big",
"h": "Steady yourself, too.",
"sub": "Your feelings count too.",
"say": "Walking beside this fear can stir your own: worry, anger, or helplessness. Talk with someone you trust, without sharing your friend's details. If your friend ever speaks of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "I'm here for your family.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your presence and your discretion are a real gift. Keep showing up, quietly and faithfully. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "community-violence",
"ring": "world",
"title": "Violence in Your Community",
"you": {
"id": "ok-g-community-violence-you",
"guide": "community-violence",
"side": "you",
"title": "Violence in Your Community",
"sideName": "For You",
"mins": 3,
"sources": [
"lieberman"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Violence in Your Community",
"sub": "For You",
"say": "If violence has happened in your community, this is for you. Whether it happened down the street or reached someone you love, you belong here."
},
{
"k": "big",
"h": "Shock and fear are normal.",
"sub": "Your body is trying to keep you safe.",
"say": "After violence nearby, shock and fear are normal. You may feel jumpy, sleepless, numb, or angry. Places that used to feel safe may feel different right now. Your body is working hard to keep you safe. These reactions are normal for what happened."
},
{
"k": "big",
"h": "Let your body settle for a moment.",
"sub": "Feet on the floor. A longer breath out.",
"say": "Let's slow down together. Feel your feet on the floor, and notice what is holding you up. Look around, and name three things you can see. Now breathe in slowly, and let a longer breath out, as many times as you need.",
"beats": [
"Let's slow down together.",
"Feel your feet on the floor, and notice what is holding you up.",
"Look around, and name three things you can see.",
{
"t": "Now breathe in slowly, and let a longer breath out, as many times as you need.",
"w": 12
}
]
},
{
"k": "points",
"h": "Small steps for the first days",
"items": [
[
"Reach out",
"To the people you love"
],
[
"Step back from the news",
"Fewer images, fewer replays"
],
[
"Keep your routines",
"Meals, sleep, a short walk"
]
],
"say": "For the first days, reach out to the people you love. Take a break from the news, especially graphic images and the same clips played again and again. And keep your routines: meals, sleep, a short walk. Small, ordinary things help the day hold steady."
},
{
"k": "card",
"title": "Communities heal together.",
"body": "A gathering. Giving blood. Bringing food. Small acts of help count.",
"say": "Communities heal together. You might go to a vigil or a community gathering, give blood, or bring food to a family who is hurting. Helping someone else can ease the feeling that there is nothing you can do. Small acts count."
},
{
"k": "card",
"title": "Tell one person.",
"body": "Try: \"I'm shaken by what happened. Can we talk?\"",
"say": "You don't have to carry this alone. Try saying this to someone you trust. I'm shaken by what happened. Can we talk? Putting what you feel into words can help it settle a little."
},
{
"k": "points",
"h": "When to reach for more help",
"items": [
[
"Nightmares or panic",
"Lasting for weeks"
],
[
"Numbness",
"That doesn't lift"
],
[
"Fear",
"That keeps you from daily life"
]
],
"say": "For many people, these reactions ease over the following weeks. Reach for more help if nightmares, panic, or numbness last for weeks, or if fear keeps you from daily life. A counselor can help. The Disaster Distress Helpline is there any time, by call or text, at 1-800-985-5990. Oak's guide After Something Traumatic has more."
},
{
"k": "big",
"h": "If it gets very dark",
"sub": "Call or text 988. Danger right now: 911.",
"say": "If you have thoughts of ending your life, call or text 988, any time. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "My reactions are normal for what happened.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be gentle with yourself in the days ahead. My reactions are normal for what happened. Let that be true for you, too. The full guide has more, whenever you want it."
}
],
"crisis": [
"1-800-985-5990: Disaster Distress Helpline, call or text",
"988: call or text, any time",
"911: danger right now"
]
},
"helper": {
"id": "ok-g-community-violence-helper",
"guide": "community-violence",
"side": "helper",
"title": "Violence in Your Community",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Violence in Your Community",
"sub": "For the Helper",
"say": "This is for anyone checking on someone shaken by violence in their community. You don't need the right words. You need to be steady, and to show up."
},
{
"k": "big",
"h": "Some are deeply affected, even from a distance.",
"sub": "Check first on those closest.",
"say": "Some people are deeply affected, even from a distance. Check first on those closest to what happened: people who were there, who lost someone, or who live and work nearby. And remember people who have lived through violence before. This may bring it close again."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Feet on the floor. A longer breath out.",
"say": "News like this can shake you too. Feel your feet on the floor. Let your shoulders drop. Take one slow breath in, and a longer breath out.",
"beats": [
"News like this can shake you too.",
"Feel your feet on the floor.",
"Let your shoulders drop.",
{
"t": "Take one slow breath in, and a longer breath out.",
"w": 10
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How are you doing with everything?\"",
"\"Your reactions make sense.\"",
"\"I'm here. We can just sit.\""
],
"say": "Here are words that help. How are you doing with everything? Your reactions make sense. I'm here. We can just sit."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Graphic details",
"And images or clips"
],
[
"Arguments about why",
"Not in the first days"
],
[
"Telling their story",
"It is theirs to tell"
]
],
"say": "Some things are better left out. Graphic details, and sending images or clips. Arguments about why it happened; there will be other days for that. And telling their story for them. Let them say as much or as little as they want, and let them say it more than once."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Show up",
"A visit, a call, a meal"
],
[
"Keep routines going",
"Rides, errands, the kids"
],
[
"Go together",
"To a gathering, if they want"
],
[
"Keep checking in",
"Weeks later, too"
]
],
"say": "What helps is often simple. Show up with a visit, a call, or a meal. Help keep routines going: rides, errands, time with the kids. Offer to go together to a community gathering, if they want to. And keep checking in, weeks later too, when others have moved on."
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Weeks of nightmares, panic, or numbness: a counselor. Helpline: 1-800-985-5990.",
"say": "Watch gently for nightmares, panic, or numbness that last for weeks, and help them find a counselor. The Disaster Distress Helpline takes calls and texts any time at 1-800-985-5990. If they talk about not wanting to live, help them call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Take care of your own reactions.",
"sub": "Talk with someone you trust.",
"say": "Take care of your own reactions too. Set limits on the news for yourself. Talk with someone you trust, and get some rest."
},
{
"k": "big",
"h": "Stay close. Keep checking in.",
"sub": "The full guide has more, whenever you want it.",
"say": "Communities heal together, and you are part of that. Stay close, and keep checking in. The full guide has more, whenever you want it."
}
],
"crisis": [
"1-800-985-5990: Disaster Distress Helpline, call or text",
"988: call or text, any time",
"911: danger right now"
]
}
},
{
"id": "disaster",
"ring": "world",
"title": "After a Disaster",
"you": {
"id": "ok-g-disaster-you",
"guide": "disaster",
"side": "you",
"title": "After a Disaster",
"sideName": "For You",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Disaster",
"sub": "For You",
"say": "If a disaster has hit your life, a flood, a fire, a tornado, or a storm, this is for you. Take what helps today, and leave the rest for later."
},
{
"k": "card",
"title": "Safety first, then basic needs.",
"body": "Danger now: 911. The American Red Cross and local agencies can help.",
"say": "First things first. If you are in danger right now, call 911. Then come basic needs: a safe place to sleep, water, food, medicine, and a way to stay in touch. The American Red Cross and local agencies can help with those. You don't have to figure it out alone."
},
{
"k": "big",
"h": "Take one steady minute.",
"sub": "Feet on the ground. A longer breath out.",
"say": "There is a lot to do, and it can wait one minute. Feel your feet on the ground, wherever you are. Put a hand on your chest, and feel it rise and fall. Now breathe in slowly, and let a longer breath out, three times.",
"beats": [
"There is a lot to do, and it can wait one minute.",
"Feel your feet on the ground, wherever you are.",
"Put a hand on your chest, and feel it rise and fall.",
{
"t": "Now breathe in slowly, and let a longer breath out, three times.",
"w": 12
}
]
},
{
"k": "words",
"h": "It can all show up",
"items": [
"Overwhelmed",
"Grief for what was lost",
"Exhausted",
"Numb, or on edge"
],
"say": "You may feel overwhelmed, displaced, and exhausted by the paperwork alone. You may grieve things other people call just stuff: photos, a garden, a home that held your family's life. Grief for lost things is real grief. Some days you may feel numb, and other days on edge. All of it makes sense."
},
{
"k": "points",
"h": "One step at a time",
"items": [
[
"Contact the Red Cross",
"And local agencies"
],
[
"Document the damage",
"Photos and a simple list"
],
[
"Rest when you can",
"Recovery is a marathon"
]
],
"say": "Take recovery one step at a time. Contact the Red Cross and local agencies. Document the damage, with photos and a simple list. And rest when you can. Recovery is a marathon, not a sprint, so pace yourself."
},
{
"k": "card",
"title": "Let people help.",
"body": "Try: \"We lost a lot in the flood. We could use help with cleanup Saturday.\"",
"say": "Let people help. Agencies, neighbors, and friends want to, and it goes better when you can be specific. Try something like this. We lost a lot in the flood. We could use help with cleanup Saturday."
},
{
"k": "big",
"h": "Small routines bring back steady ground.",
"sub": "Coffee, a walk, a bedtime.",
"say": "Even in a borrowed room, small routines can steady you: morning coffee, a short walk, a regular bedtime for the kids. And community recovery groups can help you feel less alone in the long middle, when the trucks and the cameras have gone."
},
{
"k": "card",
"title": "Feelings may come back.",
"body": "Anniversaries and storms can stir it up. Helpline: 1-800-985-5990.",
"say": "Months later, an anniversary or a storm warning may bring the feelings back. That is common. The Disaster Distress Helpline is there any time, by call or text, at 1-800-985-5990. If you have thoughts of ending your life, call or text 988. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "We're rebuilding one step at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "Say it to yourself when the list feels endless. We're rebuilding one step at a time. The full guide has more, whenever you want it."
}
],
"crisis": [
"1-800-985-5990: Disaster Distress Helpline, call or text",
"988: call or text, any time",
"911: danger right now"
]
},
"helper": {
"id": "ok-g-disaster-helper",
"guide": "disaster",
"side": "helper",
"title": "After a Disaster",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Disaster",
"sub": "For the Helper",
"say": "This is for anyone helping a friend, family member, or neighbor after a disaster. Your help matters most when it is specific, and when it lasts."
},
{
"k": "big",
"h": "They may be overwhelmed by offers and needs.",
"sub": "Ask before you assume.",
"say": "After a disaster, people are often overwhelmed, by needs and by offers. Forms, calls, cleanup, and kind questions can all pile up at once. So ask before you assume what they need."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Feet on the ground. A longer breath out.",
"say": "Seeing someone's loss up close can shake you. Feel your feet on the ground. Let your shoulders drop. Breathe in slowly, and let a longer breath out.",
"beats": [
"Seeing someone's loss up close can shake you.",
"Feel your feet on the ground.",
"Let your shoulders drop.",
{
"t": "Breathe in slowly, and let a longer breath out.",
"w": 10
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What do you need most this week?\"",
"\"I can come Saturday morning. Where should I start?\"",
"\"I'm sorry you lost so much.\""
],
"say": "Here are words that help. What do you need most this week? I can come Saturday morning. Where should I start? And simply, I'm sorry you lost so much."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Assuming what they need",
"Ask first"
],
[
"\"At least you're all safe\"",
"Let them grieve what was lost"
],
[
"Surprise donations",
"Check before you drop off"
]
],
"say": "Some things are better left out. Assuming what they need. Lines like, at least you're all safe. They know that, and they still get to grieve what was lost. And surprise donations. Check before you drop things off, because they may have nowhere to put them."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Specific, practical help",
"Meals, laundry, a ride"
],
[
"Company for paperwork",
"Sit with them through forms"
],
[
"Kids and pets",
"An afternoon off for them"
],
[
"Months of showing up",
"After the crowds leave"
]
],
"say": "What helps is specific and practical. Meals, laundry, a ride. Company for the paperwork: sit with them through the forms and the phone calls. An afternoon with the kids or the pets, so they get a break. And months of showing up, long after the crowds leave."
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Helpline: 1-800-985-5990, call or text. Thoughts of suicide: 988. Danger now: 911.",
"say": "Watch gently for exhaustion or sadness that doesn't lift, or fear that grows with every storm. The Disaster Distress Helpline takes calls and texts any time at 1-800-985-5990. A counselor can help, too. If they talk about not wanting to live, help them call or text 988. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Pace yourself too.",
"sub": "Recovery takes months.",
"say": "Recovery takes months, and you can't carry all of it. Pace yourself too. Rest, and talk with someone you trust about what you've seen."
},
{
"k": "big",
"h": "Keep showing up.",
"sub": "The full guide has more, whenever you want it.",
"say": "The first week brings a crowd. The months after need a friend. Keep showing up. The full guide has more, whenever you want it."
}
],
"crisis": [
"1-800-985-5990: Disaster Distress Helpline, call or text",
"988: call or text, any time",
"911: danger right now"
]
}
},
{
"id": "news-overwhelm",
"ring": "world",
"title": "Overwhelmed by the News",
"you": {
"id": "ok-g-news-overwhelm-you",
"guide": "news-overwhelm",
"side": "you",
"title": "Overwhelmed by the News",
"sideName": "For You",
"mins": 4,
"sources": [
"borkovec"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Overwhelmed by the News",
"sub": "For You",
"say": "If the news has been getting to you, if you scroll late at night and feel worse when you stop, this is for you. Caring about the world is a good thing. This is about carrying it well."
},
{
"k": "words",
"h": "What you might feel",
"items": [
"Anxious",
"Helpless",
"Angry",
"Numb"
],
"say": "After the news, you might feel anxious, or helpless. Angry, or strangely numb. Sometimes all of them in one evening. These are normal reactions to taking in more hard news than any one person was built to hold."
},
{
"k": "big",
"h": "Staying informed doesn't require constant exposure.",
"say": "Here is something that may help. Staying informed doesn't require constant exposure. You can know what matters without watching every update. Your attention is worth protecting."
},
{
"k": "points",
"h": "Set some limits",
"items": [
[
"Pick one or two news times",
"And let the rest of the day rest"
],
[
"Turn off alerts",
"You choose when to look"
],
[
"Not right before bed",
"Give sleep a head start"
]
],
"say": "A few limits can help a lot. Pick one or two times a day for news, and let the rest of the day rest. Setting a time for worry, and keeping to it, can help a busy mind settle. Turn off alerts, so you choose when to look. And try to stop well before bed, to give sleep a head start."
},
{
"k": "big",
"h": "Turn worry into one small action.",
"say": "When the news leaves you helpless, turn worry into one small action. Give to a cause you care about. Write a note. Volunteer an hour. Check on a neighbor. A small act won't fix everything. It reminds you that you can still do something good."
},
{
"k": "big",
"h": "I can care without carrying everything.",
"sub": "Say it softly, in your own voice.",
"say": "Here is a sentence worth keeping close. I can care without carrying everything. Put your phone down for a moment, and say it softly, in your own voice. Then take one slow breath, and say it once more.",
"beats": [
"Here is a sentence worth keeping close.",
"I can care without carrying everything.",
"Put your phone down for a moment, and say it softly, in your own voice.",
{
"t": "Then take one slow breath, and say it once more.",
"w": 10
}
]
},
{
"k": "points",
"h": "Balance the weight",
"items": [
[
"Notice the helpers",
"They are in every story"
],
[
"Look for good news too",
"It is real news"
],
[
"Get outside, and with people",
"A walk counts"
]
],
"say": "Balance the hard with the good. Notice the helpers. They are in almost every story. Look for good news too. It's just as real. And spend time outside and with people. You could say: the news has been getting to me. Want to take a walk?"
},
{
"k": "card",
"title": "If it starts to take over",
"body": "Anxiety that gets in the way of daily life: talk with a counselor or your doctor. Thoughts of harming yourself: call or text 988.",
"say": "If anxiety starts getting in the way of sleep, work, or daily life, talk with your doctor or a counselor. That's a wise step. If you have any thoughts of harming yourself, call or text 988. If you are in danger right now, call 911."
},
{
"k": "big",
"h": "You can care without carrying everything.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can care about the world without carrying all of it. Set it down for tonight. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-news-overwhelm-helper",
"guide": "news-overwhelm",
"side": "helper",
"title": "Overwhelmed by the News",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Overwhelmed by the News",
"sub": "For the Helper",
"say": "When someone you love is overwhelmed by the news, it can be hard to know how to help. This is for anyone walking beside them."
},
{
"k": "big",
"h": "They may feel embarrassed.",
"sub": "At how much it affects them.",
"say": "Your friend may feel embarrassed at how much the news affects them. They may think they should be able to handle it. Often the people most shaken are the people who care the most. That care is worth honoring."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"It's a lot to take in.\"",
"\"What's weighing on you most?\"",
"\"Want to take a walk?\""
],
"say": "Here are words that help. It's a lot to take in. What's weighing on you most? And sometimes, simply, want to take a walk? Then listen more than you talk."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"\"Just stop watching.\"",
"\"You're overreacting.\"",
"\"Did you see the latest?\""
],
"say": "And some words to set aside. Just stop watching. It sounds simple, and it skips how hard it is to look away. You're overreacting. It dismisses their concern. And did you see the latest? Sharing every new story can add to the weight. Let them choose when to look."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Act together on something",
"Small and real"
],
[
"Plan time away from screens",
"Outside, with people"
],
[
"Share good news too",
"And the helpers"
]
],
"say": "What helps is often simple. Invite them to act together on something they care about, small and real. Plan time away from screens: a walk, a meal, a game. And share good news too, and stories of the helpers, so the hard isn't all they see."
},
{
"k": "big",
"h": "One thing to do together.",
"say": "Take a moment right now. Think of your friend, and what they care about most. Picture one small thing the two of you could do together this week, and how you'll invite them.",
"beats": [
"Take a moment right now.",
"Think of your friend, and what they care about most.",
{
"t": "Picture one small thing the two of you could do together this week, and how you'll invite them.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it starts to take over",
"body": "Encourage a counselor or doctor. Thoughts of harming themselves: call or text 988 together.",
"say": "If anxiety starts getting in the way of their sleep, work, or daily life, gently encourage them to talk with a doctor or a counselor. If they ever speak of harming themselves, call or text 988 together. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Protect your own attention, too.",
"sub": "You count too.",
"say": "The news reaches you too. Protect your own attention. Set your own limits, and keep doing the things that steady you. You'll be a better companion for it."
},
{
"k": "big",
"h": "Care, without carrying it all.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help them care without carrying it all, and do the same for yourself. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "prejudice",
"ring": "world",
"title": "Facing Prejudice",
"you": {
"id": "ok-g-prejudice-you",
"guide": "prejudice",
"side": "you",
"title": "Facing Prejudice",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Facing Prejudice",
"sub": "For You",
"say": "If you've been treated unfairly because of who you are, this is for you. What happened was real, and your hurt makes sense."
},
{
"k": "big",
"h": "Discrimination harms body and spirit.",
"sub": "Your hurt and anger are valid.",
"say": "Prejudice can come as a slur, a threat, or a cruel joke. It can also come as a door quietly closed, being watched, being passed over, or not being believed. It harms body and spirit, and it often adds up over time. Your hurt and anger are valid."
},
{
"k": "words",
"h": "It can all show up",
"items": [
"Anger",
"Exhaustion",
"Grief",
"Always on guard"
],
"say": "You may feel anger, and exhaustion from carrying it. Grief, for what you lost or what you were kept from. And a constant watchfulness: always on guard, reading a room before you walk in. All of it makes sense."
},
{
"k": "big",
"h": "My dignity is not up for debate.",
"sub": "Out loud, or quietly.",
"say": "Here is a sentence to keep close. My dignity is not up for debate. Put a hand on your chest, and say it now, out loud or quietly. Then take one slow breath, and let it be true.",
"beats": [
"Here is a sentence to keep close.",
"My dignity is not up for debate.",
"Put a hand on your chest, and say it now, out loud or quietly.",
{
"t": "Then take one slow breath, and let it be true.",
"w": 10
}
]
},
{
"k": "points",
"h": "First steps",
"items": [
[
"Tell someone who understands",
"Shared experience helps"
],
[
"Write it down",
"Date, place, what was said"
],
[
"Rest",
"From people and spaces that harm you"
]
],
"say": "A few first steps. Tell someone who understands, ideally someone who has been there too. Write down what happened, in case you need it later: the date, the place, what was said, and who saw it. And rest, when you can, from people and spaces that harm you."
},
{
"k": "card",
"title": "Tell one person.",
"body": "Try: \"Something happened today that really hurt. Can I tell you about it?\"",
"say": "You don't have to carry this alone. Try saying this to someone you trust. Something happened today that really hurt. Can I tell you about it?"
},
{
"k": "big",
"h": "You don't have to educate everyone.",
"sub": "Your energy is yours to spend.",
"say": "You don't have to educate everyone. Some days you may choose to explain, and some days you may choose to walk away and rest. Both are fine. Your energy is yours to spend. Find community and allies who can carry some of the weight with you."
},
{
"k": "card",
"title": "When to reach for more help",
"body": "Harassment, threats, or workplace discrimination: legal help. Danger now: 911.",
"say": "Harassment, threats, or workplace discrimination may need legal help. A counselor who understands identity-based stress can help too. If you are in danger right now, call 911. If the weight ever turns into thoughts of ending your life, call or text 988, any time."
},
{
"k": "big",
"h": "Your dignity is not up for debate.",
"sub": "The full guide has more, whenever you want it.",
"say": "What happened was wrong, and you are worth protecting. Your dignity is not up for debate. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "ok-g-prejudice-helper",
"guide": "prejudice",
"side": "helper",
"title": "Facing Prejudice",
"sideName": "For the Helper",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Facing Prejudice",
"sub": "For the Helper",
"say": "This is for anyone standing beside someone who has faced prejudice. You don't need perfect words. You need to believe them."
},
{
"k": "big",
"h": "They may be tired of explaining.",
"sub": "Believe them first.",
"say": "They may be tired of explaining, and tired of being doubted. Many people stay quiet because they expect to be questioned. When they tell you, believe them first. Telling you may have taken courage. Your first response teaches them whether it is safe to tell you again."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I believe you.\"",
"\"That was wrong.\"",
"\"What do you need right now?\""
],
"say": "Here are words that help. I believe you. That was wrong. What do you need right now?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"Are you sure that's what they meant?\"",
"It puts them on trial"
],
[
"Explaining it away",
"They know what they lived"
],
[
"Making it about you",
"Your guilt, your story"
]
],
"say": "Some things are better left out. Are you sure that's what they meant? It puts them on trial. Explaining it away, or offering the other side. They know what they lived. And making it about you: your guilt, your story, or how upset you are."
},
{
"k": "big",
"h": "Practice the first words.",
"sub": "Soft face. Steady voice.",
"say": "Picture them telling you what happened. Let your face stay soft, and your shoulders drop. Now say it out loud, slowly. I believe you. That was wrong.",
"beats": [
"Picture them telling you what happened.",
"Let your face stay soft, and your shoulders drop.",
"Now say it out loud, slowly.",
"I believe you.",
{
"t": "That was wrong.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Speak up",
"When you witness it"
],
[
"Go with them",
"To report it, if they want"
],
[
"Listen and learn",
"Without making it about you"
],
[
"Keep showing up",
"After the moment passes"
]
],
"say": "What helps is steady and practical. Speak up when you witness it, even with a simple, that's not okay. Offer to go with them to report it, if they want to. Listen and learn without making it about you. And keep showing up, after the moment passes."
},
{
"k": "card",
"title": "When to help them reach out",
"body": "Harassment, threats, or workplace discrimination: legal help. Danger now: 911.",
"say": "If there is harassment, threats, or workplace discrimination, help them find legal help, if they want it. A counselor who understands identity-based stress can help too. If anyone is in danger right now, call 911. If they talk about not wanting to live, help them call or text 988."
},
{
"k": "big",
"h": "Listen and learn.",
"sub": "Take your own feelings to someone else.",
"say": "If what you hear stirs guilt, anger, or confusion in you, that's human. Take it to someone else you trust, keep learning, and come back steady. They need you steady more than they need you perfect."
},
{
"k": "big",
"h": "I believe you. That was wrong.",
"sub": "The full guide has more, whenever you want it.",
"say": "Five words can change how alone someone feels. I believe you. That was wrong. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "suicidal-self",
"ring": "safety",
"title": "When You're Thinking About Suicide",
"you": {
"id": "ok-g-suicidal-self-you",
"guide": "suicidal-self",
"side": "you",
"title": "When You're Thinking About Suicide",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When You're Thinking About Suicide",
"sub": "For You",
"say": "If you are having thoughts of suicide, this is for you. Thank you for being here."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Call or text 988, any time. Danger right now: 911. Or text HOME to 741741.",
"say": "First, help is here right now. Call or text 988, any time, day or night. If you are in danger right now, call 911. You can also text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "These thoughts are a sign of pain.",
"sub": "Not a plan you have to follow.",
"say": "These thoughts are a sign of pain, not a plan you have to follow. Pain this heavy can tell you nothing will change. It can tell you people would be better off without you. That is the pain talking, not the truth."
},
{
"k": "big",
"h": "Feet on the floor. One slow breath.",
"say": "Let's slow down together. Put your feet flat on the floor. Feel the ground under you. Breathe in slowly, and let it out even slower.",
"beats": [
"Let's slow down together.",
"Put your feet flat on the floor.",
"Feel the ground under you.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 10
}
]
},
{
"k": "points",
"h": "Just the next hour",
"items": [
[
"Put distance",
"Between you and anything that could hurt you"
],
[
"Ask someone to hold it",
"Medications or other dangers"
],
[
"Go where people are",
"You don't have to be alone"
],
[
"Tell one person today",
"A friend, a doctor, or 988"
]
],
"say": "You only need to get through the next hour. Put distance between you and anything you could use to hurt yourself. Move it out of reach, or ask someone to hold it for you. Go where other people are. And tell one person today."
},
{
"k": "words",
"h": "Words you can borrow",
"items": [
"I'm not okay.",
"I'm having thoughts of ending my life, and I need help."
],
"say": "If you don't know what to say, borrow these words. I'm not okay. I'm having thoughts of ending my life, and I need help. Reaching out is strength."
},
{
"k": "big",
"h": "This feeling is real, and it can change.",
"sub": "988: call or text, any time. Danger right now: 911.",
"say": "This feeling is real, and it can change. When you're ready, a doctor or counselor can help, even if you've tried before. Right now, you only need to stay safe. Call or text 988, any time. If you are in danger right now, call 911. You don't have to carry this alone."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now",
"Text HOME to 741741"
],
"music": "safety"
},
"helper": {
"id": "ok-g-suicidal-self-helper",
"guide": "suicidal-self",
"side": "helper",
"title": "When You're Thinking About Suicide",
"sideName": "For the Helper",
"mins": 2,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When You're Thinking About Suicide",
"sub": "For the Helper",
"say": "This is for anyone beside someone who is thinking about suicide. You don't need to be an expert to help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Danger right now: call 911. Call or text 988 together, any time.",
"say": "First, if they are in danger right now, call 911, and stay with them. Any time, you can call or text 988 together. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Steady yourself first.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "words",
"h": "Ask plainly",
"items": [
"Are you thinking about killing yourself?",
"I'm glad you told me. I'm staying with you."
],
"say": "Ask plainly. Are you thinking about killing yourself? Asking directly does not put the idea in their head. It tells them they can tell you the truth. If they say yes, say this. I'm glad you told me. I'm staying with you."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listen",
"They may feel like a burden"
],
[
"Call or text 988 together",
"Right then"
],
[
"Put distance",
"Help move dangers out of reach"
],
[
"Stay with them",
"If they are in danger"
]
],
"say": "They may feel hopeless, ashamed, and afraid of being a burden. Listen without arguing. Call or text 988 together, right then. Help move medications, firearms, or other dangers out of reach. And stay with them if they are in danger."
},
{
"k": "card",
"title": "Keep safety ahead of secrecy.",
"body": "Bring in help, and tell them you will.",
"say": "Keep safety ahead of secrecy. Promising to keep it secret can leave you both alone with it. Tell them gently that you will bring in help."
},
{
"k": "big",
"h": "You are not the only lifeline.",
"sub": "988 is there for you too.",
"say": "You are not the only lifeline. Bring in other people you both trust, and get support for yourself too. 988 is there for you as well, call or text, any time. If there is danger right now, call 911."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now",
"Text HOME to 741741"
],
"music": "safety"
}
},
{
"id": "suicidal-other",
"ring": "safety",
"title": "When Someone Else Is Thinking About Suicide",
"you": {
"id": "ok-g-suicidal-other-you",
"guide": "suicidal-other",
"side": "you",
"title": "When Someone Else Is Thinking About Suicide",
"sideName": "For You",
"mins": 3,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone Else Is Thinking About Suicide",
"sub": "For You",
"say": "If you are worried that someone you love is thinking about suicide, this is for you. The fact that you are here already helps."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Immediate danger: call 911. Call or text 988 any time, including for advice on how to help.",
"say": "First, where to get help right now. If they are in immediate danger, call 911. Any time, you can call or text 988, including just for advice on how to help. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "You don't need to be an expert.",
"say": "You may feel scared, helpless, or afraid of saying the wrong thing. Take a breath. You don't need to be an expert. Put your feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"You may feel scared, helpless, or afraid of saying the wrong thing.",
"Take a breath.",
"You don't need to be an expert.",
"Put your feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "points",
"h": "Warning signs",
"items": [
[
"Talk of death",
"Or of not being here"
],
[
"Giving things away",
"Things that matter to them"
],
[
"Saying goodbye",
"In ways that feel final"
],
[
"Sudden calm",
"After deep despair"
]
],
"say": "It helps to know the warning signs. Talk of death. Giving things away. Saying goodbye. And a sudden calm after deep despair. If you notice any of these, it's time to ask.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "flow",
"h": "Four steps",
"steps": [
[
"Ask directly",
"It does not plant the idea"
],
[
"Listen",
"Without arguing or judging"
],
[
"Help keep them safe",
"Medications and firearms"
],
[
"Connect them today",
"And stay with them"
]
],
"say": "Here are four steps. Ask directly, are you thinking about killing yourself? It does not plant the idea. Listen without arguing or judging. Help keep them safe by putting distance between them and medications and firearms. And connect them to help today, and stay with them. The For the Helper video walks through each one.",
"cue": {
"at": [
1,
3,
4,
5
]
}
},
{
"k": "big",
"h": "I can't fix this alone, and I don't have to.",
"say": "Bring in other trusted people, so you are not the only lifeline. Say it to yourself now. I can't fix this alone, and I don't have to."
},
{
"k": "big",
"h": "Your care helps. So does help for you.",
"sub": "Call or text 988 any time. Immediate danger: 911.",
"say": "Supporting someone through this is heavy. Get support for yourself, too. Call or text 988 any time, for them or for you. If there is immediate danger, call 911. Your care helps."
}
],
"crisis": [
"988: call or text, any time",
"Call or text 988 for how to help",
"911: immediate danger"
],
"music": "safety"
},
"helper": {
"id": "ok-g-suicidal-other-helper",
"guide": "suicidal-other",
"side": "helper",
"title": "When Someone Else Is Thinking About Suicide",
"sideName": "For the Helper",
"mins": 2,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone Else Is Thinking About Suicide",
"sub": "For the Helper",
"say": "This is for anyone about to sit down with someone they are worried about. It walks through what to say and what to do."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Immediate danger: call 911 and stay with them. Call or text 988 together, any time.",
"say": "First, if they are in immediate danger, call 911, and stay with them. Any time, you can call or text 988 together. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Steady yourself before you start. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Steady yourself before you start.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "words",
"h": "Ask directly",
"items": [
"Are you thinking about ending your life?",
"Thank you for telling me. I want to help you stay safe."
],
"say": "Ask directly, in plain words. Are you thinking about ending your life? Asking does not put the idea in their head. They may test whether you really want to hear. Stay. If they say yes, say this. Thank you for telling me. I want to help you stay safe."
},
{
"k": "points",
"h": "What to leave unsaid",
"items": [
[
"You don't really mean that.",
"It tells them you can't hear it"
],
[
"Debating life",
"Listen to the pain instead"
],
[
"Promising secrecy",
"Safety comes first"
]
],
"say": "Some things are better left unsaid. You don't really mean that. Debating whether life is worth living. And promising to keep it secret. Keep safety ahead of secrecy, and tell them kindly that you will bring in help.",
"cue": {
"at": [
1,
2,
3
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Let's call 988 together.",
"Right then"
],
[
"Secure medications and firearms",
"Or ask someone to hold them"
],
[
"Stay if they are in danger",
"Call 911 if needed"
],
[
"Follow up",
"In the days and weeks after"
]
],
"say": "Then, what helps. Say, let's call 988 together, and do it right then. Help secure medications and firearms, or ask someone to hold them for a while. Stay with them if they are in danger, and call 911 if needed. And follow up in the days and weeks after.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "big",
"h": "Sitting with them in the dark matters.",
"sub": "988 is there for you too.",
"say": "Sitting with someone in the dark, and getting them to help, matters more than perfect words. Get support for yourself, too. Call or text 988 any time. If there is immediate danger, call 911."
}
],
"crisis": [
"988: call or text, any time",
"Call or text 988 for how to help",
"911: immediate danger"
],
"music": "safety"
}
},
{
"id": "escalating",
"ring": "safety",
"title": "When Someone Is Escalating",
"you": {
"id": "ok-g-escalating-you",
"guide": "escalating",
"side": "you",
"title": "When Someone Is Escalating",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone Is Escalating",
"sub": "For You",
"say": "If someone near you is getting louder, angrier, or harder to reach, this is for you. It's short. Watch it now, or come back later."
},
{
"k": "card",
"title": "Unsafe? Leave and call 911.",
"body": "A weapon, a threat, or you feel unsafe: leave, then call 911. Talk of not wanting to be alive: call or text 988.",
"say": "First, your safety. If there is a weapon, a threat, or you feel unsafe, leave and call 911. Leaving is allowed. If the person talks about hurting themselves or not wanting to be alive, stay with them if it's safe, and call or text 988."
},
{
"k": "big",
"h": "Calm yourself first.",
"sub": "Your body sets the temperature of the room.",
"say": "Calm yourself first. Your body sets the temperature of the room. Feel your feet on the floor. Let your hands relax. Take one slow breath, and let it out longer than it came in.",
"beats": [
"Calm yourself first.",
"Your body sets the temperature of the room.",
"Feel your feet on the floor.",
"Let your hands relax.",
{
"t": "Take one slow breath, and let it out longer than it came in.",
"w": 9
}
]
},
{
"k": "points",
"h": "What helps right now",
"items": [
[
"Step back",
"About two arm's lengths, a little to the side"
],
[
"Lower your voice",
"People often match you"
],
[
"Say less",
"Short, respectful sentences"
],
[
"Know your way out",
"Keep the door within reach"
]
],
"say": "Step back, about two arm's lengths, a little to the side. Lower your voice. People often match you without knowing it. Say less, in short, respectful sentences. And know your way out."
},
{
"k": "words",
"h": "Words that often help",
"items": [
"\"You're really frustrated. This matters to you.\"",
"\"Do you want to sit down, or step outside with me?\"",
"\"I want to help. I can't keep talking while you're yelling at me.\""
],
"say": "Under anger there is often fear or grief. Name what you see. You're really frustrated. This matters to you. Offer a small choice. Do you want to sit down, or step outside with me? If you need a limit, say it calmly. I want to help. I can't keep talking while you're yelling at me."
},
{
"k": "words",
"h": "Tell yourself",
"items": [
"This is not about me, even if it's aimed at me.",
"I don't have to win this. I have to keep everyone safe.",
"I can leave. Leaving is allowed."
],
"say": "And tell yourself this. This is not about me, even if it's aimed at me. I don't have to win this. I have to keep everyone safe. I can leave. Leaving is allowed."
},
{
"k": "card",
"title": "Afterward, tell someone.",
"body": "Try: \"Something got really heated today, and I'm still shaky. Can I tell you about it?\"",
"say": "Afterward, tell someone you trust, even if it ended fine. If blowups keep happening at home and you feel afraid, see the guide When Home Isn't Safe."
},
{
"k": "big",
"h": "You don't have to win. Keep everyone safe.",
"sub": "Unsafe: leave and call 911. Thoughts of suicide: 988.",
"say": "You don't have to win. Keep everyone safe, you included. If you feel unsafe, leave and call 911. For thoughts of suicide, call or text 988."
}
],
"crisis": [
"Unsafe or a threat: leave, call 911",
"Thoughts of suicide: call or text 988"
],
"music": "safety"
},
"helper": {
"id": "ok-g-escalating-helper",
"guide": "escalating",
"side": "helper",
"title": "When Someone Is Escalating",
"sideName": "For the Helper",
"mins": 3,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Someone Is Escalating",
"sub": "For the Helper",
"say": "This is for you if you are stepping in when someone is escalating, at home, at work, or at a bedside. It's short, and you can come back to it any time."
},
{
"k": "card",
"title": "Unsafe? Leave and call 911.",
"body": "Call for help early rather than late. Talk of not wanting to be alive: call or text 988.",
"say": "Safety comes first, for everyone, you included. If there is a weapon, a threat, or you feel unsafe, leave and call 911. Call for help early rather than late. If they talk about not wanting to be alive, ask plainly. Are you thinking about suicide? Asking does not put the idea in their head. Stay with them if it's safe, and call or text 988."
},
{
"k": "big",
"h": "Breathe first. Then speak.",
"sub": "Slow and low.",
"say": "Before you step in, steady yourself. Feet on the floor. Shoulders down. Breathe in slowly, and let a longer breath out.",
"beats": [
"Before you step in, steady yourself.",
"Feet on the floor.",
"Shoulders down.",
{
"t": "Breathe in slowly, and let a longer breath out.",
"w": 9
}
]
},
{
"k": "big",
"h": "Under the anger, often fear.",
"sub": "Scared, grieving, in pain, or powerless.",
"say": "The person escalating is often scared, grieving, in pain, or feeling powerless. Many feel embarrassed once they come down. Seeing that helps you stay kind and steady."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I can hear how upset you are. I'm listening.\"",
"\"Help me understand what you need right now.\"",
"\"Let's take a minute. I'll stay right here.\""
],
"say": "Here are words that help. I can hear how upset you are. I'm listening. Help me understand what you need right now. Let's take a minute. I'll stay right here."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A quieter place",
"Fewer people watching"
],
[
"One voice",
"One person does the talking"
],
[
"Something concrete",
"Water, a chair, a clear answer"
],
[
"Space and a clear door",
"For them and for you"
]
],
"say": "Move somewhere quieter, with fewer people watching. Let one person do the talking. Offer something concrete: water, a chair, a clear answer to their question. Give space instead of touch, and keep the door clear for both of you. Skip telling them to calm down, and make only promises you can keep."
},
{
"k": "big",
"h": "Your body holds it afterward.",
"sub": "Walk, drink water, talk it through.",
"say": "Even when it goes well, your body holds the adrenaline for a while. Walk, drink water, and talk it through with a coworker or friend."
},
{
"k": "big",
"h": "Your calm is the strongest thing in the room.",
"sub": "Unsafe: leave and call 911. Thoughts of suicide: 988.",
"say": "Your calm is the strongest thing in the room. If anyone is unsafe, leave and call 911. For thoughts of suicide, call or text 988."
}
],
"crisis": [
"Unsafe or a threat: leave, call 911",
"Thoughts of suicide: call or text 988"
],
"music": "safety"
}
},
{
"id": "domestic-violence",
"ring": "safety",
"title": "When Home Isn't Safe",
"you": {
"id": "ok-g-domestic-violence-you",
"guide": "domestic-violence",
"side": "you",
"title": "When Home Isn't Safe",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Home Isn't Safe",
"sub": "For You",
"say": "If home doesn't feel safe, this is for you. It's short, and you can stop any time."
},
{
"k": "card",
"title": "Help is here, day or night.",
"body": "National Domestic Violence Hotline: 1-800-799-7233, or text START to 88788. In danger now: 911.",
"say": "First, where to get help right now. If you are in danger now, call 911. The National Domestic Violence Hotline is confidential, 24 hours a day. Call 1-800-799-7233, or text START to 88788."
},
{
"k": "big",
"h": "This is not your fault.",
"sub": "Feet on the floor. One slow breath.",
"say": "Let's slow down for a moment. Feel your feet on the floor. Breathe in, and let it out slowly, as many times as you need.",
"beats": [
"Let's slow down for a moment.",
"Feel your feet on the floor.",
{
"t": "Breathe in, and let it out slowly, as many times as you need.",
"w": 9
}
]
},
{
"k": "points",
"h": "Abuse is more than hitting",
"items": [
[
"Control",
"Of where you go and who you see"
],
[
"Threats",
"Words meant to make you afraid"
],
[
"Isolation",
"Cut off from friends and family"
],
[
"Money control",
"Your own money kept from you"
]
],
"say": "Abuse is never your fault. It includes control, threats, isolation, and control of money, not only hitting. You may feel like you're walking on eggshells, or doubt yourself. You may love the person and fear them at the same time. That makes sense."
},
{
"k": "big",
"h": "Leaving can be the most dangerous time.",
"sub": "Plan with an advocate.",
"say": "You get to decide what happens next, and when. Leaving can be the most dangerous time, so plan with an advocate. The hotline can help you make a safety plan that fits your life."
},
{
"k": "points",
"h": "Small steps toward safety",
"items": [
[
"Safe people and places",
"Where you could go if you need to"
],
[
"Documents and a charger",
"Kept somewhere safe"
],
[
"Your browser",
"Clear it if someone checks your devices"
]
],
"say": "A few small steps can help. Think about safe people and places you could go. Keep important documents and a phone charger somewhere safe. And if someone monitors your devices, clearing your browser can help keep this private."
},
{
"k": "card",
"title": "Tell one trusted person.",
"body": "Try: \"Things at home aren't safe. I need help thinking this through.\"",
"say": "You don't have to figure this out alone. Try telling one trusted person. Things at home aren't safe. I need help thinking this through."
},
{
"k": "big",
"h": "You deserve to be safe.",
"sub": "Hotline: 1-800-799-7233. Danger now: 911.",
"say": "This is not your fault, and you deserve to be safe. Help is here, any time. Call the hotline at 1-800-799-7233, or text START to 88788. If you are in danger now, call 911."
}
],
"crisis": [
"National DV Hotline: 1-800-799-7233",
"Or text START to 88788",
"Immediate danger: call 911"
],
"music": "safety"
},
"helper": {
"id": "ok-g-domestic-violence-helper",
"guide": "domestic-violence",
"side": "helper",
"title": "When Home Isn't Safe",
"sideName": "For the Helper",
"mins": 2,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "When Home Isn't Safe",
"sub": "For the Helper",
"say": "This is for the friend or family member who is worried that home isn't safe for someone they love. It's short."
},
{
"k": "card",
"title": "Danger right now? Call 911.",
"body": "Share the hotline privately: 1-800-799-7233, or text START to 88788.",
"say": "First, if anyone is in danger right now, call 911. The National Domestic Violence Hotline is confidential, 24 hours a day. Call 1-800-799-7233, or text START to 88788. Share the number with them privately."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Feet on the floor. A longer breath out.",
"say": "Hearing this can stir up fear and anger. Feel your feet on the floor. Take one slow breath in, and a longer breath out.",
"beats": [
"Hearing this can stir up fear and anger.",
"Feel your feet on the floor.",
{
"t": "Take one slow breath in, and a longer breath out.",
"w": 9
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I believe you.\"",
"\"It's not your fault.\"",
"\"I'm here, whatever you decide.\""
],
"say": "Here are words that help. I believe you. It's not your fault. I'm here, whatever you decide."
},
{
"k": "big",
"h": "Leaving can be the most dangerous time.",
"sub": "An advocate can help them plan.",
"say": "They may feel ashamed, afraid, or not ready to leave. Leaving often takes several attempts, and it can be the most dangerous time. So trust that they know their situation. Instead of asking why they don't just leave, point them to an advocate who can help them plan."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Share the hotline",
"Privately"
],
[
"Offer a safe place",
"Or practical help"
],
[
"Stay in touch",
"Without judgment"
],
[
"Let advocates handle the abuser",
"Their safety comes first"
]
],
"say": "Share the hotline number privately. Offer a safe place, or practical help. Stay in touch without judgment, even when they go back. And leave the abuser to the advocates and the police, rather than confronting them yourself."
},
{
"k": "big",
"h": "Children in danger? Report it.",
"sub": "Your safety matters too.",
"say": "If children are in danger, report it. Your safety matters too. Get support for yourself from someone you trust."
},
{
"k": "big",
"h": "I'm here, whatever you decide.",
"sub": "Hotline: 1-800-799-7233. Danger now: 911.",
"say": "You can't make them safe by yourself. You can be the steady person who believes them and stays. I'm here, whatever you decide. The hotline is 1-800-799-7233. If anyone is in danger now, call 911."
}
],
"crisis": [
"National DV Hotline: 1-800-799-7233",
"Or text START to 88788",
"Immediate danger: call 911"
],
"music": "safety"
}
},
{
"id": "past-abuse",
"ring": "safety",
"title": "Living with Past Abuse",
"you": {
"id": "ok-g-past-abuse-you",
"guide": "past-abuse",
"side": "you",
"title": "Living with Past Abuse",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with Past Abuse",
"sub": "For You",
"say": "If you are living with abuse from the past, this is for you. You don't have to share anything to watch. You can stop any time."
},
{
"k": "card",
"title": "Support, any time.",
"body": "RAINN: 1-800-656-4673. A child being harmed now: 911 or child protective services.",
"say": "First, where to find support right now. RAINN offers confidential support at 1-800-656-4673. If a child is being harmed now, call 911 or child protective services. If you have thoughts of hurting yourself, call or text 988."
},
{
"k": "big",
"h": "Feet on the floor.",
"sub": "Name five things you can see.",
"say": "Let's ground for a moment. Feel your feet on the floor. Look around and name five things you can see. Breathe out slowly, and let your shoulders drop.",
"beats": [
"Let's ground for a moment.",
"Feel your feet on the floor.",
"Look around and name five things you can see.",
{
"t": "Breathe out slowly, and let your shoulders drop.",
"w": 10
}
]
},
{
"k": "big",
"h": "What happened was not your fault.",
"sub": "Many reactions are common.",
"say": "What happened was not your fault. Memories, flashbacks, feeling unsafe in your body, trouble trusting, sudden anger or numbness: these are common. Anniversaries, touch, or smells can bring it back."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Safe people and routines",
"Steady things you can count on"
],
[
"Body-based practices",
"Walking, breathing, gentle movement"
],
[
"Your own pace",
"No deadline for healing"
],
[
"A trauma-informed counselor",
"Skilled help makes a difference"
]
],
"say": "Trauma lives in the body, and healing often involves the body, too. Safe relationships and routines help. So do walking, breathing, and gentle movement. Go at your own pace. And consider a trauma-informed counselor. Healing is possible, and it often happens with skilled help."
},
{
"k": "card",
"title": "You decide who you tell, and when.",
"body": "When you're ready: \"Something happened to me a long time ago, and it still affects me.\"",
"say": "You don't owe anyone your story. You get to decide who you tell, and when. When you're ready, you might say, something happened to me a long time ago, and it still affects me."
},
{
"k": "words",
"h": "Words to tell yourself",
"items": [
"I survived. I am more than what happened to me.",
"My reactions made sense for what I lived through."
],
"say": "Here are words to tell yourself. I survived. I am more than what happened to me. My reactions made sense for what I lived through."
},
{
"k": "big",
"h": "Healing is possible.",
"sub": "RAINN: 1-800-656-4673.",
"say": "Go gently. Healing is possible, at your own pace. RAINN is there at 1-800-656-4673. If a child is being harmed now, call 911."
}
],
"crisis": [
"RAINN: 1-800-656-4673",
"Child harmed now: 911 or CPS"
],
"music": "safety"
},
"helper": {
"id": "ok-g-past-abuse-helper",
"guide": "past-abuse",
"side": "helper",
"title": "Living with Past Abuse",
"sideName": "For the Helper",
"mins": 2,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Living with Past Abuse",
"sub": "For the Helper",
"say": "This is for the friend or family member of someone living with past abuse. Maybe they've just told you. Thank you for listening."
},
{
"k": "card",
"title": "Support, any time.",
"body": "RAINN: 1-800-656-4673. A child being harmed now: 911 or child protective services.",
"say": "First, where to find support. RAINN offers confidential support at 1-800-656-4673. If a child is being harmed now, call 911 or child protective services."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "A calm face says it is safe to talk.",
"say": "What you hear may shake you. Feel your feet on the floor. Let one slow breath out, so your face and voice can stay calm.",
"beats": [
"What you hear may shake you.",
"Feel your feet on the floor.",
{
"t": "Let one slow breath out, so your face and voice can stay calm.",
"w": 9
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I believe you.\"",
"\"Thank you for trusting me.\"",
"\"It wasn't your fault.\""
],
"say": "They may be testing whether it's safe to say more. Here are words that help. I believe you. Thank you for trusting me. It wasn't your fault."
},
{
"k": "points",
"h": "Let them lead",
"items": [
[
"Let them choose what to share",
"No questions about details"
],
[
"Their timing",
"To confront or report, or not"
],
[
"Touch and privacy",
"Ask first, keep it private"
]
],
"say": "Let them lead. Let them choose what to share, without asking for details. Let them decide if and when to confront anyone or report. And respect their boundaries around touch and privacy."
},
{
"k": "big",
"h": "Help them find trauma-informed support.",
"sub": "Offer, and let them choose.",
"say": "If they want it, help them find a trauma-informed counselor. Offer, and let them choose. If they talk about not wanting to be alive, ask plainly. Are you thinking about suicide? Asking does not put the idea in their head. Call or text 988 together."
},
{
"k": "big",
"h": "Hearing this can affect you.",
"sub": "Get support for yourself too.",
"say": "Hearing someone's trauma can affect you. Get support for yourself too, from someone you trust."
},
{
"k": "big",
"h": "I believe you.",
"sub": "RAINN: 1-800-656-4673.",
"say": "You don't need perfect words. I believe you is a strong place to start. RAINN is there at 1-800-656-4673. If a child is being harmed now, call 911."
}
],
"crisis": [
"RAINN: 1-800-656-4673",
"Child harmed now: 911 or CPS"
],
"music": "safety"
}
},
{
"id": "assault",
"ring": "safety",
"title": "After a Sexual Assault",
"you": {
"id": "ok-g-assault-you",
"guide": "assault",
"side": "you",
"title": "After a Sexual Assault",
"sideName": "For You",
"mins": 2,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Sexual Assault",
"sub": "For You",
"say": "If you have been sexually assaulted, this is for you. It's short, and you can stop any time."
},
{
"k": "card",
"title": "Help, any time, day or night.",
"body": "RAINN: 1-800-656-4673. Central Minnesota: 320-251-4357. In danger: 911.",
"say": "First, where to get help right now. If you're in danger, call 911. Any time you need to talk, call RAINN at 1-800-656-4673, or in Central Minnesota, 320-251-4357. It's confidential. If you have thoughts of suicide, call or text 988."
},
{
"k": "big",
"h": "Somewhere safe. One slow breath.",
"sub": "Feet on the floor.",
"say": "If you can, get somewhere safe. Feel your feet on the floor. Breathe in slowly, and let a long breath out.",
"beats": [
"If you can, get somewhere safe.",
"Feel your feet on the floor.",
{
"t": "Breathe in slowly, and let a long breath out.",
"w": 9
}
]
},
{
"k": "big",
"h": "This was not your fault.",
"sub": "Nothing you did or wore makes it your fault.",
"say": "What happened was not your fault. Nothing you did or wore makes it your fault. You may feel shock, numbness, fear, shame, or anger. Some people lose sleep or feel unsafe in their own body. Every reaction is a valid response to harm."
},
{
"k": "card",
"title": "You choose what happens next.",
"body": "Including whether to report. If you're hurt, or want evidence kept, a hospital can help, even if you don't want to report.",
"say": "You get to decide what happens next, including whether to report. If you're hurt, or want evidence kept, a hospital can help, even if you don't want to report. An advocate can walk with you through medical care, reporting, or neither."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"An advocate",
"Beside you, whatever you choose"
],
[
"A counselor",
"One who understands trauma"
],
[
"People who believe you",
"Even one is enough to start"
]
],
"say": "Support makes a real difference. An advocate, beside you whatever you choose. A counselor who understands trauma. And people who believe you."
},
{
"k": "card",
"title": "Tell someone safe.",
"body": "Try: \"Something happened to me, and I need you to just listen and believe me.\"",
"say": "When you're ready, you might tell someone safe. Something happened to me, and I need you to just listen and believe me."
},
{
"k": "big",
"h": "I get to choose what happens next.",
"sub": "RAINN: 1-800-656-4673, any time.",
"say": "Healing takes time. Say it to yourself. This was not my fault. I get to choose what happens next. RAINN is there any time, at 1-800-656-4673. If you're in danger, call 911."
}
],
"crisis": [
"RAINN: 1-800-656-4673",
"Central Minnesota: 320-251-4357",
"Danger: 911. Thoughts of suicide: 988"
],
"music": "safety"
},
"helper": {
"id": "ok-g-assault-helper",
"guide": "assault",
"side": "helper",
"title": "After a Sexual Assault",
"sideName": "For the Helper",
"mins": 2,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "After a Sexual Assault",
"sub": "For the Helper",
"say": "This is for the friend or family member of someone who has been sexually assaulted. If they told you, they trust you."
},
{
"k": "card",
"title": "In danger? Call 911.",
"body": "RAINN: 1-800-656-4673. Central Minnesota: 320-251-4357. Offer to call together.",
"say": "First, where to get help right now. If they're in danger, call 911. RAINN is there any time, at 1-800-656-4673, or in Central Minnesota, 320-251-4357. Offer to call a hotline with them."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Feet on the floor. A longer breath out.",
"say": "Hearing this can shake you. Feel your feet on the floor. Breathe in slowly, and let a longer breath out.",
"beats": [
"Hearing this can shake you.",
"Feel your feet on the floor.",
{
"t": "Breathe in slowly, and let a longer breath out.",
"w": 9
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I believe you.\"",
"\"It's not your fault.\"",
"\"What would help right now?\""
],
"say": "They may feel ashamed, afraid, or unsure whether they'll be believed. Here are words that help. I believe you. It's not your fault. What would help right now?"
},
{
"k": "points",
"h": "Let them choose",
"items": [
[
"Reporting is their choice",
"No pressure either way"
],
[
"Questions about blame",
"Never what they wore or drank"
],
[
"Ask before acting",
"Even toward the person who hurt them"
]
],
"say": "Let them choose. Reporting is their choice, with no pressure either way. Leave out any question about what they were wearing or drinking. And ask before you act, even toward the person who hurt them."
},
{
"k": "points",
"h": "Practical help",
"items": [
[
"Call a hotline together"
],
[
"Go with them",
"To a hospital or advocate, if they want"
],
[
"Keep it private",
"Their story is theirs"
]
],
"say": "Offer to call a hotline with them. Go with them to a hospital or an advocate, if they want. And respect their choices and their privacy."
},
{
"k": "big",
"h": "Worried? Ask plainly.",
"sub": "\"Are you thinking about suicide?\"",
"say": "If you're worried, ask plainly. Are you thinking about suicide? Asking does not put the idea in their head. If they say yes, stay with them, and call or text 988 together."
},
{
"k": "big",
"h": "I believe you.",
"sub": "RAINN: 1-800-656-4673, any time.",
"say": "Hearing this can be very hard. Get support for yourself too, without sharing their story. You don't need perfect words. I believe you is the place to start. RAINN is there any time, at 1-800-656-4673."
}
],
"crisis": [
"RAINN: 1-800-656-4673",
"Central Minnesota: 320-251-4357",
"Danger: 911. Thoughts of suicide: 988"
],
"music": "safety"
}
},
{
"id": "self-harm",
"ring": "safety",
"title": "Self-Harm",
"you": {
"id": "ok-g-self-harm-you",
"guide": "self-harm",
"side": "you",
"title": "Self-Harm",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Self-Harm",
"sub": "For You",
"say": "If you hurt yourself on purpose when things get bad, this is for you. You are welcome here, just as you are."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Badly hurt: call 911. Thinking about suicide: call or text 988. Or text HOME to 741741.",
"say": "First, help right now. If you are badly hurt, call 911. If you are thinking about suicide, call or text 988, any time. You can also text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "You deserve care, not punishment.",
"sub": "Self-harm is a sign of pain, not a character flaw.",
"say": "Self-harm is a sign of pain that needs care, not a character flaw. Maybe it helps you get through feelings that are too big, or too numb. You deserve care, not punishment."
},
{
"k": "big",
"h": "This urge will pass.",
"say": "If an urge is here right now, let's slow down together. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. This urge will pass, even if it doesn't feel like it.",
"beats": [
"If an urge is here right now, let's slow down together.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "This urge will pass, even if it doesn't feel like it.",
"w": 9
}
]
},
{
"k": "points",
"h": "Ways through a hard moment",
"items": [
[
"Call or text someone",
"A friend, or 988"
],
[
"Go where people are",
"Out of the room you are in"
],
[
"Walk, or breathe slowly",
"Let your body move"
],
[
"Write or draw it",
"Put the feeling on paper"
]
],
"say": "Here are ways through a hard moment that don't hurt your body. Call or text someone. Go where people are. Walk, or breathe slowly. Write or draw what you feel.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "words",
"h": "Tell one safe person",
"items": [
"I've been hurting myself when things get bad.",
"I want help stopping."
],
"say": "It tends to get harder to stop over time, and you don't have to stop alone. Tell one safe person: a friend, a doctor, or a counselor. You can borrow these words. I've been hurting myself when things get bad. I want help stopping."
},
{
"k": "big",
"h": "Reaching out is the brave thing.",
"sub": "988: call or text. Badly hurt or in danger: 911.",
"say": "Reaching out is the brave thing. Care for any wounds, and see a doctor this week. Call or text 988 any time, or text HOME to 741741. If you are badly hurt or in danger right now, call 911."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: serious injury or danger now"
],
"music": "safety"
},
"helper": {
"id": "ok-g-self-harm-helper",
"guide": "self-harm",
"side": "helper",
"title": "Self-Harm",
"sideName": "For the Helper",
"mins": 2,
"sources": [
"dazzi"
],
"scenes": [
{
"k": "title",
"hero": "oak",
"eyebrow": "When Life Changes",
"h": "Self-Harm",
"sub": "For the Helper",
"say": "If someone you love is hurting themselves on purpose, this is for you. It is frightening, and you can help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Serious injury or danger right now: call 911. Thoughts of suicide: call or text 988.",
"say": "First, help right now. For a serious injury, or if someone is in danger right now, call 911. If they are thinking about suicide, call or text 988 together. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Your calm matters most. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Your calm matters most.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"Thank you for telling me. I'm not going anywhere.",
"Are you thinking about killing yourself?",
"Let's find someone who can help with the pain underneath."
],
"say": "They may feel ashamed, or afraid you will be angry. Start here. Thank you for telling me. I'm not going anywhere. Then ask plainly. Are you thinking about killing yourself? Asking does not plant the idea. Then, let's find someone who can help with the pain underneath."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Anger, panic, or ultimatums"
],
[
"Demanding a promise to stop"
],
[
"Calling it attention-seeking"
]
],
"say": "Some things make it harder. Anger, panic, or ultimatums. Demanding a promise to stop. Calling it attention-seeking. They may fear you will take away the only way they know to get through. Patience keeps the door open.",
"cue": {
"at": [
1,
2,
3
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Help care for wounds",
"Calmly"
],
[
"An appointment this week",
"A doctor or counselor"
],
[
"Secure medicines and sharp items",
"Calmly, at home"
],
[
"Parents: the school counselor",
"If school is part of it"
]
],
"say": "Here's what helps. Stay calm and help care for wounds. Help them get an appointment this week. Secure medicines and sharp items at home, calmly. And parents, loop in the school counselor if school is part of the picture.",
"cue": {
"at": [
1,
2,
3,
4
]
}
},
{
"k": "big",
"h": "Your steady love helps.",
"sub": "Get support for yourself too.",
"say": "It is frightening to love someone who hurts themselves. Get support for yourself too, from a counselor, a parent group, or a trusted friend. Call or text 988 any time. For a serious injury or danger right now, call 911. Your steady love helps."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: serious injury or danger now"
],
"music": "safety"
}
}
]
};
})();
/* HA2 videos start: For You and For the Helper videos for the ten Health and Ability guides (GWG BLD 757, HA 2),
   in their own ring. Generated from patches/bld757/source/O in grounded-workshop by gen.py. */
(function () { var O = window.GG_LEARN_GUIDES && window.GG_LEARN_GUIDES.oak; if (!O) return;
  if (!O.rings.some(function (r) { return r[0] === 'life'; })) O.rings.push(['life', 'Health and Ability']);
  var V = [
 {
  "id": "pacing",
  "ring": "life",
  "title": "Fatigue, Flares, and Pacing Your Energy",
  "you": {
   "id": "ok-g-pacing-you",
   "guide": "pacing",
   "side": "you",
   "title": "Fatigue, Flares, and Pacing Your Energy",
   "sideName": "For You",
   "mins": 4,
   "sources": [
    "miserandino",
    "cdsmp"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Fatigue, Flares, and Pacing Your Energy",
     "sub": "For You",
     "say": "If fatigue shapes your days, from a long-term health condition, a flare, or treatment, this is for you. Get comfortable, sitting or lying down. There's nothing to keep up with here."
    },
    {
     "k": "big",
     "h": "This tired is real.",
     "sub": "Sleep may not fix it.",
     "say": "The fatigue that comes with a health condition is different from ordinary tiredness. A full night's sleep may not touch it. It can come with pain, with fog, or with a heavy body. It is real, even when no one can see it."
    },
    {
     "k": "flow",
     "h": "The boom and bust cycle",
     "steps": [
      [
       "A good day",
       "You do it all"
      ],
      [
       "The crash",
       "Days to recover"
      ],
      [
       "The guilt",
       "And it starts again"
      ]
     ],
     "say": "Many people know this cycle. A good day comes, and you do everything you've been putting off. Then comes the crash, and it takes days to recover. Then guilt, and the next good day starts it all again. Pacing is a way out of that cycle.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Plan for energy, not just time.",
     "sub": "A day holds only so many spoons.",
     "say": "Pacing means planning for energy, not just time. Some people picture a day as holding a set number of spoons. Getting dressed takes one. A shower might take two. A hard conversation might take three. When the spoons are gone, the day is done. That isn't failure. It's information."
    },
    {
     "k": "points",
     "h": "Ways to pace",
     "items": [
      [
       "Break it up",
       "Small pieces, rest between"
      ],
      [
       "Rest before you are spent",
       "Not after you crash"
      ],
      [
       "Keep a little in reserve",
       "Even on good days"
      ]
     ],
     "say": "Here are a few ways to pace. Break big tasks into small pieces, with rest in between. Rest before you're spent, not after you crash. And on good days, keep a little in reserve, so tomorrow isn't paying for today.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Choose three.",
     "sub": "Let the rest wait.",
     "say": "Let's try it now. Think about tomorrow. Of everything you could do, which three things matter most? Name those three, out loud or inside, and let the rest wait.",
     "beats": [
      "Let's try it now.",
      "Think about tomorrow.",
      "Of everything you could do, which three things matter most?",
      {
       "t": "Name those three, out loud or inside, and let the rest wait.",
       "w": 12
      }
     ]
    },
    {
     "k": "words",
     "h": "Try saying",
     "items": [
      "\"I want to come. I may need to leave early.\""
     ],
     "say": "Other people may not see your fatigue. You can help them understand without explaining everything. Try saying: I want to come, and I may need to sit, rest first, or leave early. You choose the words for what you live with, and how much you share.",
     "cue": {
      "at": [
       2
      ]
     }
    },
    {
     "k": "big",
     "h": "A plan for flare days",
     "sub": "Written on a good day.",
     "say": "Flares come and go. On a good day, write a short flare plan: what can be canceled, who to tell, what helps your body, and what you'll eat. When a flare comes, you won't have to think it through. You just follow the plan."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "Tell your doctor about fatigue as clearly as you tell them about pain, especially if it's new or getting worse. A workshop led by people living with a long-term condition can teach pacing too. If sadness or hopelessness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "Rest is part of living well.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Rest is part of living well, never a failure. Go gently with the body you have today. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-pacing-helper",
   "guide": "pacing",
   "side": "helper",
   "title": "Fatigue, Flares, and Pacing Your Energy",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [
    "miserandino"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Fatigue, Flares, and Pacing Your Energy",
     "sub": "For the Helper",
     "say": "This is for anyone walking beside someone whose days are shaped by fatigue or flares: a partner, a friend, a grown child, a coworker. Your understanding can make their days lighter."
    },
    {
     "k": "big",
     "h": "Believe what you can't see.",
     "say": "Fatigue from a health condition is often invisible. They may look fine and still be running on empty. Some people describe a day as holding only so many spoons of energy, and every task uses some. The most helpful thing you can say is often the simplest: I believe you."
    },
    {
     "k": "points",
     "h": "What they may carry",
     "items": [
      [
       "Guilt",
       "For canceling again"
      ],
      [
       "Worry",
       "That you will stop asking"
      ],
      [
       "Grief",
       "For the pace they used to keep"
      ]
     ],
     "say": "They may carry guilt for canceling again. They may worry that you'll stop asking. And they may grieve the pace they used to keep: the job, the hobbies, the full days. Naming those gently can help.",
     "cue": {
      "at": [
       0,
       1,
       2
      ]
     }
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"I believe you.\"",
      "\"What would make today easier?\"",
      "\"Come for an hour. Leaving early is fine.\""
     ],
     "say": "Here are words that help. I believe you. What would make today easier? And, come for an hour, leaving early is fine. Each one says they are welcome as they are.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"But you looked fine yesterday.\"",
      "\"Just push through.\"",
      "Cures they didn't ask for"
     ],
     "say": "Some words, meant kindly, close the door. But you looked fine yesterday. Just push through. And cures or advice they didn't ask for. Good days and hard days are both part of the same condition.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Make one plan that bends.",
     "say": "Let's try something. Think of one plan you have with them coming up. Ask yourself how it could bend: shorter, closer to home, or with a place to sit. Picture saying it to them: we can make this work for your energy.",
     "beats": [
      "Let's try something.",
      "Think of one plan you have with them coming up.",
      "Ask yourself how it could bend: shorter, closer to home, or with a place to sit.",
      {
       "t": "Picture saying it to them: we can make this work for your energy.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Practical ways to help",
     "items": [
      [
       "Plans that bend",
       "Shorter, closer, seated"
      ],
      [
       "Flare-day help",
       "A meal, an errand, a ride"
      ],
      [
       "Keep inviting",
       "Even after a no"
      ]
     ],
     "say": "Practical help matters most. Make plans that can bend. On flare days, offer something specific: a meal, an errand, a ride. And keep inviting them, even after a no. Being asked still matters, even on days they can't come.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Pace yourself, too.",
     "sub": "Your rest matters.",
     "say": "Living beside someone's fatigue can be tiring and lonely for you too. Keep your own people close, and your own rest. If they ever speak of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Steady and flexible.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Steady and flexible is a gift you can keep giving. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "work-ability",
  "ring": "life",
  "title": "Working With a Disability or Illness, or Stepping Away",
  "you": {
   "id": "ok-g-work-ability-you",
   "guide": "work-ability",
   "side": "you",
   "title": "Working With a Disability or Illness, or Stepping Away",
   "sideName": "For You",
   "mins": 4,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Working With a Disability or Illness, or Stepping Away",
     "sub": "For You",
     "say": "If you're working with a disability or a health condition, or wondering whether to cut back or step away, this is for you. Whatever you decide, you can decide it with good information and without shame."
    },
    {
     "k": "big",
     "h": "Asking is part of good work.",
     "sub": "Changes that help are called accommodations.",
     "say": "Many workers living with a disability or health condition can ask for reasonable changes at work. They're called accommodations. A different schedule. A seat. A quieter space. A tool, or time for appointments. Asking isn't asking for a favor. It's part of doing good work."
    },
    {
     "k": "points",
     "h": "What makes work hard",
     "items": [
      [
       "Energy",
       "Pain, fatigue, flares"
      ],
      [
       "The setting",
       "Noise, stairs, screens"
      ],
      [
       "The schedule",
       "Appointments, mornings"
      ],
      [
       "Looking fine",
       "Tiring all on its own"
      ]
     ],
     "say": "Notice what makes work hardest right now. For some it's energy: pain, fatigue, or flares. For some it's the setting: noise, stairs, light, or screens. For some it's the schedule, with appointments or hard mornings. And for many, working to look fine is tiring all on its own.",
     "cue": {
      "at": [
       1,
       2,
       3,
       4
      ]
     }
    },
    {
     "k": "big",
     "h": "Name what would help.",
     "sub": "It would help me to...",
     "say": "Let's try it now. Think of the hardest part of your work. Picture one change that would help. Say it in one sentence, out loud or inside, starting with: it would help me to.",
     "beats": [
      "Let's try it now.",
      "Think of the hardest part of your work.",
      "Picture one change that would help.",
      {
       "t": "Say it in one sentence, out loud or inside, starting with: it would help me to.",
       "w": 12
      }
     ]
    },
    {
     "k": "big",
     "h": "You decide how much to share.",
     "say": "You decide how much to share at work. Some people name their condition. Some describe only what they need. Your doctor can often put what you need in writing if your employer asks. And you choose the words for what you live with. Keep simple notes of what you asked for, and what was agreed."
    },
    {
     "k": "flow",
     "h": "Before a big decision",
     "steps": [
      [
       "Get the facts",
       "Benefits, insurance, leave"
      ],
      [
       "Talk it through",
       "With people who know"
      ],
      [
       "Then decide",
       "Your choice, your pace"
      ]
     ],
     "say": "Cutting hours, taking leave, or stepping away can be a wise choice. Before you decide, get the facts about benefits, insurance, and leave. Talk it through with people who know the rules. In Minnesota, Disability Hub MN can help. Then decide, at your own pace.",
     "cue": {
      "at": [
       1,
       2,
       4
      ]
     }
    },
    {
     "k": "big",
     "h": "Your worth is bigger than your job.",
     "sub": "Grief for work is real.",
     "say": "If you step away, you may grieve the role, the people, and the person you were at work. That grief is real. And your worth was never only your work. The way you notice people, your humor, your care, and your hard-won wisdom all go with you."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "If sadness or hopelessness won't lift, talk with your doctor or a counselor. If you believe you're being treated unfairly at work because of a disability, there are people whose job it is to help, and the full guide lists them. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "You can decide well.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Whatever your work looks like next, you can decide it well, with good information and people beside you. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-work-ability-helper",
   "guide": "work-ability",
   "side": "helper",
   "title": "Working With a Disability or Illness, or Stepping Away",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Working With a Disability or Illness, or Stepping Away",
     "sub": "For the Helper",
     "say": "This is for the partner, family member, friend, coworker, or manager of someone working with a disability or illness, or stepping away from work. You can make a hard choice feel less lonely."
    },
    {
     "k": "big",
     "h": "Their choices. Their story.",
     "say": "Work is often part of who a person is. Needing changes at work, or leaving it, can bring shame, fear about money, and grief. Your part isn't to decide for them. It's to help them see their options, and to stand beside whatever they choose."
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"What would make work easier for you?\"",
      "\"You're still you.\"",
      "\"Want help thinking it through?\""
     ],
     "say": "Here are words that help. What would make work easier for you? You're still you, whatever your job looks like. And, want help thinking through your options?",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"Just tell them you're sick.\"",
      "\"Must be nice to be home.\"",
      "Pushing a decision"
     ],
     "say": "Some words close the door. Just tell them you're sick, when sharing is their choice to make. Must be nice to be home all day, when stepping away is often a loss. And pushing them to keep working, or to quit, before they have the facts.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "points",
     "h": "If you are their manager",
     "items": [
      [
       "Ask what helps",
       "Then listen"
      ],
      [
       "Keep it private",
       "Share only what they agree to"
      ],
      [
       "Look at the work",
       "Not the diagnosis"
      ]
     ],
     "say": "If you're their manager, ask what would help, and then listen. Keep what they tell you private, and share only what they agree to. Focus on the work and how to make it doable, not on the diagnosis. Small changes often make a big difference.",
     "cue": {
      "at": [
       0,
       1,
       2
      ]
     }
    },
    {
     "k": "big",
     "h": "Name their worth.",
     "sub": "Beyond any job.",
     "say": "Let's try something. Think of the person you're helping. Think of one thing you value in them that has nothing to do with work. Say it out loud now, as if they were right here.",
     "beats": [
      "Let's try something.",
      "Think of the person you're helping.",
      "Think of one thing you value in them that has nothing to do with work.",
      {
       "t": "Say it out loud now, as if they were right here.",
       "w": 10
      }
     ]
    },
    {
     "k": "points",
     "h": "If you are family",
     "items": [
      [
       "Gather information",
       "Benefits, insurance, options"
      ],
      [
       "Let them decide",
       "Their pace"
      ],
      [
       "Talk about changes",
       "Money and roles, together"
      ]
     ],
     "say": "If you're family, help gather information on benefits, insurance, and options. In Minnesota, Disability Hub MN can help. Then let them decide, at their pace. And talk openly about what changes for the household, like money and roles, together.",
     "cue": {
      "at": [
       0,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Find support for yourself too.",
     "sub": "Changes touch the whole household.",
     "say": "A change in someone's work can shift money, routines, and roles for everyone. Find support for yourself too. If they speak of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Stand beside their choice.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Stand beside their choice, and keep reminding them of their worth. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "parenting-ability",
  "ring": "life",
  "title": "Parenting With a Disability or Chronic Illness",
  "you": {
   "id": "ok-g-parenting-ability-you",
   "guide": "parenting-ability",
   "side": "you",
   "title": "Parenting With a Disability or Chronic Illness",
   "sideName": "For You",
   "mins": 4,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Parenting With a Disability or Chronic Illness",
     "sub": "For You",
     "say": "If you're raising children while living with a disability or a long-term illness, this is for you. Whatever your parenting looks like today, you belong here."
    },
    {
     "k": "big",
     "h": "Love, safety, and connection.",
     "sub": "That is what children need most.",
     "say": "Children need love, safety, and connection. A disability or illness may change how you parent. It doesn't change whether you're a good parent. Many parents find their own ways: reading in bed together, games at the table, adapted tools, and shorter outings."
    },
    {
     "k": "points",
     "h": "What parents often carry",
     "items": [
      [
       "Worry",
       "Am I enough?"
      ],
      [
       "Guilt",
       "For the hard days"
      ],
      [
       "Judgment",
       "From other people"
      ],
      [
       "Pride",
       "In the ways you found"
      ]
     ],
     "say": "Parents living with a condition often carry a mix. Worry: am I enough for my kids? Guilt, for the days you can't do what other parents do. Judgment from people who don't understand. And real pride, in the ways you've found to parent well. All of these can be true in one afternoon.",
     "cue": {
      "at": [
       1,
       2,
       3,
       4
      ]
     }
    },
    {
     "k": "big",
     "h": "Hold one small moment.",
     "sub": "It counts.",
     "say": "Let's pause here. Think of your child, or your children. Remember one ordinary moment of connection from this week, as small as it was. Hold it for a few breaths, and let it count, because it does.",
     "beats": [
      "Let's pause here.",
      "Think of your child, or your children.",
      "Remember one ordinary moment of connection from this week, as small as it was.",
      {
       "t": "Hold it for a few breaths, and let it count, because it does.",
       "w": 12
      }
     ]
    },
    {
     "k": "words",
     "h": "Honest, simple words",
     "items": [
      "\"My body needs rest today.\"",
      "\"It's not because of anything you did.\"",
      "\"You can always ask me about it.\""
     ],
     "say": "Children feel safer with honest, simple words fitted to their age. My body needs rest today. It's not because of anything you did. You can always ask me about it. You choose the words for what you live with, and how much to share.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "flow",
     "h": "A hard-day plan",
     "steps": [
      [
       "Who helps",
       "Two or three people"
      ],
      [
       "What kids can do",
       "Fitted to their age"
      ],
      [
       "What can wait",
       "Most things can"
      ]
     ],
     "say": "Make a hard-day plan with your family, before you need it. Who helps: name two or three people you can call. What the kids can do, fitted to their age. And what can wait, which is most things. When a hard day comes, everyone knows what happens.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Kids can help. Grown-ups carry the grown-up jobs.",
     "say": "Kids can help, and helping can grow kindness and confidence. Keep it fitted to their age, and thank them. If a child starts carrying grown-up worries or grown-up jobs, bring in more help, and make room for their own fun and rest. Their teacher or counselor can help too, with your child's say."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "Asking for help is part of good parenting. If sadness or hopelessness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "Your love is the heart of it.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your love and presence are the heart of parenting, and you have both to give. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-parenting-ability-helper",
   "guide": "parenting-ability",
   "side": "helper",
   "title": "Parenting With a Disability or Chronic Illness",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Parenting With a Disability or Chronic Illness",
     "sub": "For the Helper",
     "say": "This is for the partner, grandparent, friend, neighbor, or teacher beside a parent living with a disability or chronic illness. Your help can lighten a family's load, and keep the parent in their place as the parent."
    },
    {
     "k": "big",
     "h": "They are the parent.",
     "say": "Parents living with a condition often feel judged, and worry that others see them as less of a parent. The most helpful thing you can do is support their parenting, not replace it. Follow their lead on what their children need. They know their kids, and they've usually found clever ways to parent that you may never have thought of."
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"You're a good parent.\"",
      "\"Can I take the kids Saturday?\"",
      "\"What help would feel like help?\""
     ],
     "say": "Here are words that help. You're a good parent. Want me to take the kids Saturday morning so you can rest? And, what kind of help would feel like help?",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "Taking over decisions",
      "Asking the kids to report",
      "\"How do you even manage?\""
     ],
     "say": "Some things, meant kindly, take something away. Taking over parenting decisions. Asking the kids to report on their parent. And, how do you even manage, said with pity. Respect is the kind of help that lasts.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Make one specific offer.",
     "say": "Let's try something. Think of one kind of help you could give this week that doesn't take over: a ride, a meal, or an hour with the kids. Say your offer out loud, the way you'd text it.",
     "beats": [
      "Let's try something.",
      "Think of one kind of help you could give this week that doesn't take over: a ride, a meal, or an hour with the kids.",
      {
       "t": "Say your offer out loud, the way you'd text it.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Practical ways to help",
     "items": [
      [
       "Regular, specific help",
       "Pickups, meals, play"
      ],
      [
       "Back them up",
       "In front of the kids"
      ],
      [
       "Watch for the helper child",
       "Offer fun and rest"
      ]
     ],
     "say": "Help that's regular and specific is easiest to accept: a school pickup every Tuesday, a meal, an hour of play. Back up their parenting in front of the children. And notice if a child seems to carry too much at home. Gently offer that child some fun and rest too.",
     "cue": {
      "at": [
       0,
       1,
       2
      ]
     }
    },
    {
     "k": "big",
     "h": "Keep the offers you can keep.",
     "sub": "Care for your own energy too.",
     "say": "Helping a family can be a long, steady commitment. Make offers you can keep, and care for your own energy too. If the parent ever speaks of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Steady help, real respect.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Steady help and real respect let a parent keep being the parent. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "child-ability",
  "ring": "life",
  "title": "Raising a Child With a Disability or Serious Illness",
  "you": {
   "id": "ok-g-child-ability-you",
   "guide": "child-ability",
   "side": "you",
   "title": "Raising a Child With a Disability or Serious Illness",
   "sideName": "For You",
   "mins": 3,
   "sources": [
    "olshansky62"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Raising a Child With a Disability or Serious Illness",
     "sub": "For You",
     "say": "If you're raising a child with a disability or a serious illness, this is for you. Take a breath. For the next few minutes, nothing on your list needs you."
    },
    {
     "k": "big",
     "h": "Love and grief can live side by side.",
     "sub": "Waves at milestones are normal.",
     "say": "Love for your child and grief for the plans you had can live side by side. Many parents feel sadness come in waves, at a birthday, a first day of school, or when a younger child passes an older one. That's a normal response, not a problem to fix. It doesn't take away from your love."
    },
    {
     "k": "points",
     "h": "What parents often carry",
     "items": [
      [
       "Fierce love",
       "And pride"
      ],
      [
       "Exhaustion",
       "Forms, calls, appointments"
      ],
      [
       "Loneliness",
       "When others don't understand"
      ],
      [
       "Joy",
       "In moments others miss"
      ]
     ],
     "say": "Parents often carry fierce love, and real pride. Exhaustion, from forms, calls, therapies, and appointments. Loneliness, when friends don't understand. And joy, in moments other people may never notice. All of it belongs.",
     "cue": {
      "at": [
       0,
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "You know your child best.",
     "sub": "Your voice belongs in the room.",
     "say": "You know your child best. Your voice belongs in every room where decisions are made, at school and in medical care. Ask about supports like an IEP or a 504 plan. Bring a support person to meetings. And let your child speak for themselves in every way they can."
    },
    {
     "k": "big",
     "h": "One thing your child taught you.",
     "say": "Let's pause here. Put a hand on your chest, if that feels okay, and breathe in slowly. Breathe out. Bring to mind one thing your child taught you, or delighted you with, this month, and let yourself smile at it.",
     "beats": [
      "Let's pause here.",
      "Put a hand on your chest, if that feels okay, and breathe in slowly.",
      "Breathe out.",
      {
       "t": "Bring to mind one thing your child taught you, or delighted you with, this month, and let yourself smile at it.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Brothers and sisters",
     "items": [
      [
       "Their own time",
       "Just with you"
      ],
      [
       "Honest words",
       "Fitted to their age"
      ],
      [
       "Their own people",
       "Other siblings who get it"
      ]
     ],
     "say": "Brothers and sisters need care too. Give them their own time, just with you, even a little. Give them honest words, fitted to their age, and room for every feeling. And help them find other siblings who understand.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "You don't have to do this alone.",
     "say": "Find one parent who has walked a similar road. In Minnesota, PACER Center helps families of children with any disability. Plan one break for yourself this month, even an hour. Rest and help are part of raising your child well."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "If exhaustion, sadness, or hopelessness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "Your child is whole. So are you.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your child's worth is whole, and so is yours. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-child-ability-helper",
   "guide": "child-ability",
   "side": "helper",
   "title": "Raising a Child With a Disability or Serious Illness",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Raising a Child With a Disability or Serious Illness",
     "sub": "For the Helper",
     "say": "This is for the grandparent, friend, neighbor, coworker, or community member beside a family raising a child with a disability or serious illness. Steady friendship can mean more than you know."
    },
    {
     "k": "big",
     "h": "Know the child.",
     "say": "One of the kindest things you can do is know their child. Learn their name, what they love, and how they communicate. Include them by name. Parents notice who sees their child as a whole person. Ask the parent what helps their child feel welcome, and then do it, without making a fuss."
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"What does your kid love?\"",
      "\"I'm in this with you.\"",
      "\"Can I take something off your list?\""
     ],
     "say": "Here are words that help. Tell me about your kid. What do they love? I'm in this with you, for the long haul. And, can I take something off your list this week?",
     "cue": {
      "at": [
       1,
       3,
       4
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"Special kids for special parents.\"",
      "\"I could never do what you do.\"",
      "Comparisons and cures"
     ],
     "say": "Some words, meant kindly, close the door. Saying special children are given to special parents. I could never do what you do, which can leave them feeling alone. And comparing their child to others, or offering cures.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Send a message that asks nothing.",
     "say": "Let's try something. Think of the parent you know. Picture a short message you could send them today that asks nothing back. Say it out loud now, something like: thinking of you and your kid, no need to reply.",
     "beats": [
      "Let's try something.",
      "Think of the parent you know.",
      "Picture a short message you could send them today that asks nothing back.",
      {
       "t": "Say it out loud now, something like: thinking of you and your kid, no need to reply.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Practical ways to help",
     "items": [
      [
       "Regular help",
       "Meals, errands, rides"
      ],
      [
       "The siblings",
       "An outing just for them"
      ],
      [
       "Gatherings that work",
       "Ask what they need"
      ]
     ],
     "say": "Practical help matters. Offer something regular: a meal, an errand, a ride to an appointment. Remember the siblings, with an outing just for them. And make gatherings work for their child, by asking what that needs: a quiet room, a ramp, a schedule, or a snack.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Make it last.",
     "sub": "Steady beats big.",
     "say": "Supporting a family is a long road. Steady, small help beats one big gesture. Keep your help sustainable, and let yourself enjoy their child too. If a parent ever speaks of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Be the friend who stays.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Be the friend who stays. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "hearing",
  "ring": "life",
  "title": "Hearing Loss or Deafness as an Adult",
  "you": {
   "id": "ok-g-hearing-you",
   "guide": "hearing",
   "side": "you",
   "title": "Hearing Loss or Deafness as an Adult",
   "sideName": "For You",
   "mins": 4,
   "sources": [
    "apadisability",
    "asl988"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Hearing Loss or Deafness as an Adult",
     "sub": "For You",
     "say": "If you're living with hearing loss or deafness as an adult, whether it came slowly or all at once, this is for you. The words on screen go with every sentence."
    },
    {
     "k": "big",
     "h": "Listening takes extra effort.",
     "sub": "Tired after talking is real.",
     "say": "Hearing loss in adulthood is common. It can change work, friendships, and how tired you feel at the end of a day. Following a conversation takes extra effort, and that effort adds up. Feeling worn out after a dinner or a meeting is real, and rest helps."
    },
    {
     "k": "points",
     "h": "What many people feel",
     "items": [
      [
       "Tired",
       "From working to follow"
      ],
      [
       "Left out",
       "Nodding along"
      ],
      [
       "Grief",
       "For voices and music"
      ],
      [
       "Relief",
       "In new ways to connect"
      ]
     ],
     "say": "Many people feel tired, from working so hard to follow. Left out, nodding along at dinners and meetings. Grief, for voices, music, or sounds they used to know. And for some, relief, in captions, sign language, or a community that feels like home.",
     "cue": {
      "at": [
       0,
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Rest your ears.",
     "say": "Let's take a listening rest right now. Close your eyes, or lower your gaze. Let all the effort of listening stop. Notice three things you can feel instead: your feet, your hands, the air on your face.",
     "beats": [
      "Let's take a listening rest right now.",
      "Close your eyes, or lower your gaze.",
      "Let all the effort of listening stop.",
      {
       "t": "Notice three things you can feel instead: your feet, your hands, the air on your face.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Tell people what helps",
     "items": [
      [
       "Face me",
       "Mouth visible, good light"
      ],
      [
       "One at a time",
       "Quieter places"
      ],
      [
       "Captions or writing",
       "When it matters most"
      ]
     ],
     "say": "Telling people what helps opens doors. Face me, with your mouth visible and good light. One at a time, in quieter places. And captions or writing it down, especially when it matters most. Asking is fair, not fussy.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Your words, your way.",
     "sub": "Hard of hearing, deaf, or Deaf.",
     "say": "You choose your words. Some people say hard of hearing. Some say deaf. Many in the Deaf community use a capital D for a language and a culture they are proud of. Some use hearing aids or implants, some use sign language, many use a mix. Each is a real way to connect."
    },
    {
     "k": "flow",
     "h": "First steps",
     "steps": [
      [
       "See an audiologist",
       "Ask what could help"
      ],
      [
       "Name hard settings",
       "One change for each"
      ],
      [
       "Turn on captions",
       "Phone, TV, calls"
      ]
     ],
     "say": "A few first steps. See an audiologist or your doctor about what's changing, and ask what tools could help. Name your hardest settings, and one change for each. And turn on captions, on your phone, your TV, and your video calls.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Text 988, or ASL by videophone.",
     "say": "Sudden hearing loss needs quick attention from a doctor. If sadness or loneliness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time. Deaf and hard of hearing callers can reach a counselor who signs, through the ASL Now button on the 988 website."
    },
    {
     "k": "big",
     "h": "There are many ways to be heard.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "There are many ways to listen, and many ways to be heard. Yours is worth making room for. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-hearing-helper",
   "guide": "hearing",
   "side": "helper",
   "title": "Hearing Loss or Deafness as an Adult",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [
    "asl988"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Hearing Loss or Deafness as an Adult",
     "sub": "For the Helper",
     "say": "This is for the partner, family member, friend, or coworker of an adult living with hearing loss or deafness. Small changes in how you talk can bring someone back into the room."
    },
    {
     "k": "big",
     "h": "Listening takes them extra effort.",
     "say": "Following a conversation can take a lot of effort for someone with hearing loss. By evening, they may be worn out. They may nod along rather than ask again. The more you make communication easy, the more of them you get to enjoy."
    },
    {
     "k": "points",
     "h": "Ways to talk that help",
     "items": [
      [
       "Face them",
       "Get their attention first"
      ],
      [
       "Mouth visible",
       "Good light, no hands"
      ],
      [
       "Rephrase",
       "Not just repeat louder"
      ]
     ],
     "say": "Here are ways to talk that help. Face them, and get their attention before you start. Keep your mouth visible, in good light, without hands or food in the way. And if they miss something, say it another way, rather than just louder.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Practice the offer.",
     "say": "Let's practice. Turn toward an imaginary listener, as if they were sitting across from you. Let your shoulders drop. Say slowly and clearly: want me to say that another way, or write it down?",
     "beats": [
      "Let's practice.",
      "Turn toward an imaginary listener, as if they were sitting across from you.",
      "Let your shoulders drop.",
      {
       "t": "Say slowly and clearly: want me to say that another way, or write it down?",
       "w": 10
      }
     ]
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"Never mind, it's not important.\"",
      "Talking from another room",
      "Speaking to someone else"
     ],
     "say": "Some habits shut people out. Never mind, it's not important, which tells them they're not worth repeating for. Talking from another room, or with your back turned. And speaking to someone else instead of to them.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "points",
     "h": "Make room for their way",
     "items": [
      [
       "Quieter places",
       "Good light, captions on"
      ],
      [
       "Their language",
       "Learn some sign, if they use it"
      ],
      [
       "Keep inviting",
       "And plan for access"
      ]
     ],
     "say": "Make room for their way of communicating. Choose quieter places, with good light and captions on. If they use sign language, learn some yourself. And keep inviting them, planning ahead for what makes a gathering work. They choose the words for who they are: hard of hearing, deaf, or Deaf.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "You'll forget sometimes.",
     "sub": "Keep at it kindly.",
     "say": "Changing how you talk takes practice, and you'll forget sometimes. Keep at it kindly. If the strain runs high for you both, find support together. And if they ever speak of not wanting to live, help them reach 988, by text or by videophone in sign language."
    },
    {
     "k": "big",
     "h": "Bring them back into the room.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Small changes bring someone back into the room. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "vision",
  "ring": "life",
  "title": "Vision Loss as an Adult",
  "you": {
   "id": "ok-g-vision-you",
   "guide": "vision",
   "side": "you",
   "title": "Vision Loss as an Adult",
   "sideName": "For You",
   "mins": 4,
   "sources": [
    "apadisability"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Vision Loss as an Adult",
     "sub": "For You",
     "say": "If your vision has changed as an adult, a little or a lot, slowly or suddenly, this is for you. You can listen with your eyes closed. Everything here is spoken aloud."
    },
    {
     "k": "big",
     "h": "Grief and new skills, side by side.",
     "say": "Vision loss can change reading, driving, work, and moving around. It's normal to grieve what you used to see: faces, print, color, the freedom of the open road. It's also true that many people find new skills and tools they never knew existed, and a confidence that grows with each one."
    },
    {
     "k": "points",
     "h": "What vision rehabilitation teaches",
     "items": [
      [
       "Moving safely",
       "A cane and other tools"
      ],
      [
       "Daily living",
       "Cooking, labeling, organizing"
      ],
      [
       "Technology",
       "Phones that read aloud"
      ]
     ],
     "say": "Vision rehabilitation teaches new ways to do daily things. Moving safely, with a cane and other tools. Daily living, like cooking, labeling, and organizing your home. And technology, like phones and computers that read aloud. Ask your eye doctor how to find these services.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Feel what is in your hand.",
     "say": "Let's try something now. Reach for something near you, like a cup, a phone, or a pen. Notice its weight, its edges, and whether it feels warm or cool. Name one word for how it feels, out loud or inside.",
     "beats": [
      "Let's try something now.",
      "Reach for something near you, like a cup, a phone, or a pen.",
      "Notice its weight, its edges, and whether it feels warm or cool.",
      {
       "t": "Name one word for how it feels, out loud or inside.",
       "w": 12
      }
     ]
    },
    {
     "k": "big",
     "h": "Your words, your way.",
     "sub": "Low vision, visually impaired, or blind.",
     "say": "You choose your words. Some people say low vision. Some say visually impaired. Many blind people say blind, plainly and with pride. Whatever words you choose, other blind and low vision people often know the best shortcuts, and the feelings too."
    },
    {
     "k": "words",
     "h": "Try saying",
     "items": [
      "\"Tell me who you are when you walk up.\"",
      "\"Describe where things are.\""
     ],
     "say": "People often want to help, and don't know how. You can teach them. Try saying: it helps if you tell me who you are when you walk up. And, describe where things are, rather than pointing. Letting people help in the ways you choose keeps your say.",
     "cue": {
      "at": [
       2,
       3
      ]
     }
    },
    {
     "k": "flow",
     "h": "First steps",
     "steps": [
      [
       "Your eye doctor",
       "Ask about rehabilitation"
      ],
      [
       "Your phone",
       "Larger text, reading aloud"
      ],
      [
       "One hard task",
       "Ask how others do it"
      ]
     ],
     "say": "A few first steps. Keep regular visits with your eye doctor, and ask about vision rehabilitation. Turn on your phone's accessibility settings: larger text, high contrast, and reading aloud. And pick one daily task that's gotten harder, and ask how others do it.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "Sudden changes in vision, flashes, or a curtain over your sight need medical help right away. If sadness or hopelessness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "You can learn a new way.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "New ways take time, and you can learn them. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-vision-helper",
   "guide": "vision",
   "side": "helper",
   "title": "Vision Loss as an Adult",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Vision Loss as an Adult",
     "sub": "For the Helper",
     "say": "This is for the partner, family member, friend, or coworker of an adult living with vision loss. The right kind of help keeps them in charge of their own life."
    },
    {
     "k": "big",
     "h": "Ask first. Let them lead.",
     "say": "Many people with vision loss work hard to keep their independence. Help that takes over can feel worse than no help at all. So ask first, and let them lead. Most blind and low vision people will tell you exactly what helps. A simple question, like would you like help with that, or are you all set, goes a long way."
    },
    {
     "k": "points",
     "h": "Small habits that help",
     "items": [
      [
       "Say your name",
       "When you greet them"
      ],
      [
       "Describe",
       "Who is here, where things are"
      ],
      [
       "Offer your arm",
       "Let them take it"
      ]
     ],
     "say": "A few small habits help a lot. Say your name when you greet them. Describe what matters: who's in the room, where things are, what's on the menu. And when walking together, offer your arm and let them take it, rather than steering them.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Describe the room.",
     "say": "Let's practice. Notice the room you're in right now. Describe it out loud in two sentences, as if to a friend who can't see it: where the door is, and where they could sit.",
     "beats": [
      "Let's practice.",
      "Notice the room you're in right now.",
      {
       "t": "Describe it out loud in two sentences, as if to a friend who can't see it: where the door is, and where they could sit.",
       "w": 12
      }
     ]
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "Grabbing or steering",
      "Moving their things",
      "\"You don't look blind.\""
     ],
     "say": "Some things, meant kindly, take something away. Grabbing their arm or steering them. Moving their things without asking, which can leave them searching. And, you don't look blind, when vision loss takes many forms.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "points",
     "h": "Keep them in the circle",
     "items": [
      [
       "Offer rides",
       "Without making it a favor"
      ],
      [
       "Share information",
       "In a format they can use"
      ],
      [
       "Keep inviting",
       "Every time"
      ]
     ],
     "say": "Keep them in the circle. Offer rides, without making it a favor. Share plans and information in a format they can use, like a text instead of a flyer. And keep inviting them, every time. They choose the words for what they live with, so follow their lead.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "You'll make mistakes.",
     "sub": "Ask, listen, keep showing up.",
     "say": "Learning to help well takes practice, and you'll make mistakes. Ask, listen, and keep showing up. If they ever speak of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Help that keeps them in charge.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "The best help keeps them in charge of their own life. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "autistic",
  "ring": "life",
  "title": "Autistic, or Diagnosed as an Adult",
  "you": {
   "id": "ok-g-autistic-you",
   "guide": "autistic",
   "side": "you",
   "title": "Autistic, or Diagnosed as an Adult",
   "sideName": "For You",
   "mins": 3,
   "sources": [
    "kenny16"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Autistic, or Diagnosed as an Adult",
     "sub": "For You",
     "say": "If you're autistic, or you've recently learned you might be, this is for you. Watch however you like: with the sound low, with your eyes closed, or moving around."
    },
    {
     "k": "big",
     "h": "Relief, grief, or both.",
     "say": "Many adults learn they're autistic later in life. A diagnosis can bring relief, at finally having a name for it. It can bring grief, for the years you thought something was wrong with you. Often it brings both. All of that makes sense."
    },
    {
     "k": "big",
     "h": "A different way of sensing and thinking.",
     "sub": "Real strengths, real challenges.",
     "say": "Autism is a different way of sensing, thinking, and connecting. It comes with real strengths, like deep focus, honesty, and noticing what others miss. It comes with real challenges too, like noise, crowds, sudden changes, or social rules no one explains. Many barriers sit in the world around you, not in you."
    },
    {
     "k": "points",
     "h": "Notice what drains and restores",
     "items": [
      [
       "Senses",
       "Sound, light, texture"
      ],
      [
       "People",
       "How much, how long"
      ],
      [
       "Routines",
       "Predictable plans"
      ],
      [
       "Alone time",
       "To recover"
      ]
     ],
     "say": "Start by noticing what drains you and what restores you. Your senses: sound, light, smell, and texture. People: how much time with others, and how long. Routines, and how much predictability helps. And alone time, to recover after a busy day.",
     "cue": {
      "at": [
       1,
       2,
       3,
       4
      ]
     }
    },
    {
     "k": "big",
     "h": "Name something you love.",
     "say": "Let's pause for something good. Think of a subject or an activity you love, something you could talk about or do for hours. Name it, out loud or inside, and one thing it gives you.",
     "beats": [
      "Let's pause for something good.",
      "Think of a subject or an activity you love, something you could talk about or do for hours.",
      {
       "t": "Name it, out loud or inside, and one thing it gives you.",
       "w": 12
      }
     ]
    },
    {
     "k": "big",
     "h": "Your words, your way.",
     "sub": "Autistic, or person with autism.",
     "say": "You choose your words. Many autistic adults say autistic, and prefer it. Some say person with autism. Both are yours to choose. And you choose who to tell, and when."
    },
    {
     "k": "words",
     "h": "Try saying",
     "items": [
      "\"I do best with a heads up before plans change.\"",
      "\"I may need a quiet break. It's not about you.\""
     ],
     "say": "It can help to tell people plainly what works for you. Try saying: I do best with a heads up before plans change. And, I may need a quiet break at gatherings. It's not about you.",
     "cue": {
      "at": [
       1,
       2
      ]
     }
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "Anxiety, low mood, and exhaustion often come along with being autistic in a world built for other brains. If they won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "There are many good ways to be a person.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "There are many good ways to be a person, and yours is one of them. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-autistic-helper",
   "guide": "autistic",
   "side": "helper",
   "title": "Autistic, or Diagnosed as an Adult",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Autistic, or Diagnosed as an Adult",
     "sub": "For the Helper",
     "say": "This is for the partner, family member, friend, or coworker of an adult who is autistic, or who was recently diagnosed. Your openness can make their world easier to live in."
    },
    {
     "k": "big",
     "h": "Same person. New understanding.",
     "say": "If someone you know was recently diagnosed, they're the same person they were yesterday. What's new is understanding. They may be re-reading their whole life story. Many autistic adults spent years working hard to fit in, and that is tiring. If they start to relax around you, take it as a compliment. Your curiosity and respect help more than you know."
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"Thank you for telling me.\"",
      "\"Want a heads up before changes?\"",
      "\"Take the quiet break you need.\""
     ],
     "say": "Here are words that help. Thank you for telling me. What helps you? Want a heads up before plans change? And, take the quiet break you need, I'll be here.",
     "cue": {
      "at": [
       1,
       3,
       4
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"You don't seem autistic.\"",
      "\"Everyone's a little autistic.\"",
      "Calling their needs rude"
     ],
     "say": "Some words, meant kindly, close the door. You don't seem autistic, which can erase years of effort. Everyone's a little autistic, which shrinks their experience. And treating their needs as rudeness, or being difficult.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Change one thing for their senses.",
     "say": "Let's try something. Picture a place where you often spend time with them. Notice the light, the sound, and how busy it is. Name one change you could make next time, like dimmer light, quieter music, or a smaller group.",
     "beats": [
      "Let's try something.",
      "Picture a place where you often spend time with them.",
      "Notice the light, the sound, and how busy it is.",
      {
       "t": "Name one change you could make next time, like dimmer light, quieter music, or a smaller group.",
       "w": 12
      }
     ]
    },
    {
     "k": "points",
     "h": "Ways to help",
     "items": [
      [
       "Say it plainly",
       "And ask, don't guess"
      ],
      [
       "Plan for quiet",
       "A space, a clear plan"
      ],
      [
       "Share their joy",
       "Ask about what they love"
      ]
     ],
     "say": "A few ways to help. Say what you mean plainly, and ask what they mean rather than guessing. Plan gatherings with a quiet space and a clear plan. And take an interest in what they love. They choose the words for who they are, so follow their lead.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Learn alongside them.",
     "sub": "Support for you counts too.",
     "say": "A diagnosis can reshape a relationship in good ways. Learn alongside them, and find support for yourself if you need it. If they ever speak of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Curiosity and respect.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Curiosity and respect make a world easier to live in. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "serious-mi",
  "ring": "life",
  "title": "Living With a Serious Mental Illness",
  "you": {
   "id": "ok-g-serious-mi-you",
   "guide": "serious-mi",
   "side": "you",
   "title": "Living With a Serious Mental Illness",
   "sideName": "For You",
   "mins": 3,
   "sources": [
    "samhsarecovery"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Living With a Serious Mental Illness",
     "sub": "For You",
     "say": "If you're living with a serious mental illness, like bipolar disorder, schizophrenia, major depression, or another long-term condition, this is for you. You're a whole person, and this is about living well."
    },
    {
     "k": "big",
     "h": "Recovery is a process.",
     "sub": "Health, home, purpose, and people.",
     "say": "Many people live full lives with a serious mental illness. Recovery is a process, not a finish line. It's often described as building four things: your health, a safe place to live, purpose in your days, and people around you. Each one counts."
    },
    {
     "k": "points",
     "h": "A team, not a solo act",
     "items": [
      [
       "Your prescriber",
       "Honest about what works"
      ],
      [
       "A therapist",
       "Skills and support"
      ],
      [
       "People you trust",
       "Who know your plan"
      ]
     ],
     "say": "Treatment works best as a partnership. Your doctor or prescriber, who needs to hear honestly what's working and what isn't, including side effects. A therapist, for skills and support. And people you trust, who know your plan.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Know your early signs.",
     "say": "Let's try this now. Think of one early sign that tells you you're starting to struggle, like a change in sleep, energy, or your thoughts. Then name one person you'd tell when you notice it.",
     "beats": [
      "Let's try this now.",
      "Think of one early sign that tells you you're starting to struggle, like a change in sleep, energy, or your thoughts.",
      {
       "t": "Then name one person you'd tell when you notice it.",
       "w": 12
      }
     ]
    },
    {
     "k": "flow",
     "h": "A plan made while you are well",
     "steps": [
      [
       "Early signs",
       "Sleep, energy, thoughts"
      ],
      [
       "What helps",
       "And who to call"
      ],
      [
       "A crisis plan",
       "Written ahead"
      ]
     ],
     "say": "Write a plan while you're well. List your early signs. List what helps, and who to call. Then a crisis plan, written ahead, so the people around you know what to do. Catching a hard stretch early can keep it shorter.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "You are more than a diagnosis.",
     "sub": "Your words, your story.",
     "say": "You are more than a diagnosis. You choose the words for what you live with, and who to tell. Peer support, from people who live with a mental health condition too, can be a place where you don't have to explain. Purpose matters too: work, study, volunteering, or a creative project can give your days shape."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of suicide or a crisis: call or text 988.",
     "say": "If warning signs return, or side effects are hard to live with, call your treatment team soon, and don't stop a medicine on your own. If you have thoughts of suicide, or you're in a crisis, call or text 988, any time. If you're in danger right now, call 911."
    },
    {
     "k": "big",
     "h": "A hard stretch is not the end of your story.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "A hard stretch is not the end of your story. Keep building, one piece at a time. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-serious-mi-helper",
   "guide": "serious-mi",
   "side": "helper",
   "title": "Living With a Serious Mental Illness",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [
    "namiprog"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Living With a Serious Mental Illness",
     "sub": "For the Helper",
     "say": "This is for the partner, parent, grown child, sibling, or friend of someone living with a serious mental illness. Your steady presence matters, through good stretches and hard ones."
    },
    {
     "k": "big",
     "h": "A whole person, not a problem.",
     "say": "People living with a serious mental illness often feel judged, watched, or managed. What helps most is being treated as a whole person: someone with interests, humor, and a life, who also lives with a condition. Talk about the rest of life too. Stigma can push people away from the very relationships that help, so staying close, and keeping ordinary plans, says more than any speech."
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"I'm not going anywhere.\"",
      "\"What helps when things get hard?\"",
      "\"How are you doing, really?\""
     ],
     "say": "Here are words that help. I'm glad you told me. I'm not going anywhere. What helps when things get hard? And, how are you doing, really?",
     "cue": {
      "at": [
       2,
       3,
       4
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"Did you take your meds?\"",
      "Crazy, or a choice",
      "Only talking about the illness"
     ],
     "say": "Some words close the door. Did you take your meds, as the first thing you say. Calling them crazy, or their illness a choice. And making every conversation about the illness.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "points",
     "h": "Ways to help",
     "items": [
      [
       "Learn",
       "About their condition"
      ],
      [
       "Know the plan",
       "For hard stretches"
      ],
      [
       "Ask, don't accuse",
       "When you notice signs"
      ]
     ],
     "say": "A few ways to help. Learn about their condition, from good sources. Ask about their plan for hard stretches, and your part in it. And when you notice early signs, ask gently rather than accuse. I've noticed you're not sleeping. How are you doing?",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Breathe, then say it.",
     "say": "Let's take a moment for you. Breathe in slowly for four counts. Breathe out for six. Then say quietly: I can love them, and still take care of myself.",
     "beats": [
      "Let's take a moment for you.",
      "Breathe in slowly for four counts.",
      "Breathe out for six.",
      {
       "t": "Then say quietly: I can love them, and still take care of myself.",
       "w": 12
      }
     ]
    },
    {
     "k": "big",
     "h": "Support for you, too.",
     "sub": "Families need their own people.",
     "say": "Families need support too. Classes for family members, taught by people who've been there, can help you understand and cope. Rest, your own friends, and time away are part of staying steady. If they ever speak of suicide, or you see a crisis, call or text 988 together. If there's danger right now, call 911."
    },
    {
     "k": "big",
     "h": "Steady through every stretch.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Steady love through good stretches and hard ones is a gift. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "brain-injury",
  "ring": "life",
  "title": "After a Brain Injury or Stroke",
  "you": {
   "id": "ok-g-brain-injury-you",
   "guide": "brain-injury",
   "side": "you",
   "title": "After a Brain Injury or Stroke",
   "sideName": "For You",
   "mins": 3,
   "sources": [
    "sqhafast"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "After a Brain Injury or Stroke",
     "sub": "For You",
     "say": "If you're living with the changes of a brain injury or a stroke, this is for you. Go slowly. You can pause, or watch again, any time."
    },
    {
     "k": "big",
     "h": "Many changes are invisible.",
     "say": "A brain injury or stroke can change movement, speech, memory, attention, energy, and feelings. Some changes others can see. Many they can't, like deep tiredness, or needing more time to think. All of them are real."
    },
    {
     "k": "points",
     "h": "What helps a healing brain",
     "items": [
      [
       "One thing at a time",
       "In a quiet place"
      ],
      [
       "Tools outside your head",
       "Notes, reminders, labels"
      ],
      [
       "Real rest",
       "Planned into every day"
      ]
     ],
     "say": "A few things help a healing brain. One thing at a time, in a quiet place. Tools outside your head, like a notebook, phone reminders, and labels. And real rest, planned into every day. A tired brain needs real breaks.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Name one gain.",
     "sub": "Small gains count.",
     "say": "Let's notice progress. Think back to the first weeks after your injury or stroke. Name one thing you can do now that you couldn't do then, out loud or inside. Small gains count.",
     "beats": [
      "Let's notice progress.",
      "Think back to the first weeks after your injury or stroke.",
      "Name one thing you can do now that you couldn't do then, out loud or inside.",
      {
       "t": "Small gains count.",
       "w": 12
      }
     ]
    },
    {
     "k": "big",
     "h": "Recovery often takes a long time.",
     "say": "Recovery often continues for a long time. Keep going to rehabilitation, and ask your team what to practice at home. Write your gains down, so on discouraging days you can see how far you've come."
    },
    {
     "k": "words",
     "h": "Try saying",
     "items": [
      "\"Please give me a moment.\"",
      "\"Don't finish my sentences unless I ask.\""
     ],
     "say": "You can teach people what helps. Try saying: I need more time to find words. Please give me a moment. And, please don't finish my sentences unless I ask. You choose the words for what you live with.",
     "cue": {
      "at": [
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Still you, learning new ways.",
     "say": "Many people say they feel like a different person after a brain injury or stroke. That's common, and it can bring grief. Over time, many slowly write a new chapter, not a copy of the old one. You're still you, learning new ways."
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "New stroke signs: call 911.",
     "say": "Sadness and worry are common after a brain injury or stroke, and they can be treated, so tell your doctor. If you have thoughts of not wanting to live, call or text 988, any time. And for new signs of a stroke, like sudden face drooping, arm weakness, or trouble speaking, call 911 right away."
    },
    {
     "k": "big",
     "h": "Healing takes time.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your brain is healing, and healing takes time. Go gently. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-brain-injury-helper",
   "guide": "brain-injury",
   "side": "helper",
   "title": "After a Brain Injury or Stroke",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [
    "boss",
    "sqhafast"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "After a Brain Injury or Stroke",
     "sub": "For the Helper",
     "say": "This is for the partner, family member, or friend of someone recovering from a brain injury or a stroke. Your patience is part of their healing."
    },
    {
     "k": "big",
     "h": "Slow down. Wait.",
     "say": "After a brain injury or stroke, thinking, speaking, and moving can take more time and more energy. One of the kindest things you can do is slow down. Speak one idea at a time. Then wait for an answer, longer than feels natural. A quiet room, with the TV off and one conversation at a time, makes everything easier."
    },
    {
     "k": "big",
     "h": "Practice the pause.",
     "say": "Let's practice. Say one short, friendly question out loud, like: what was the best part of your day? Now stay quiet, and count to five in your head, the way you'd wait for their answer.",
     "beats": [
      "Let's practice.",
      "Say one short, friendly question out loud, like: what was the best part of your day?",
      {
       "t": "Now stay quiet, and count to five in your head, the way you'd wait for their answer.",
       "w": 10
      }
     ]
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"Take your time. I'll wait.\"",
      "\"What would help most today?\"",
      "\"I can see how hard you're working.\""
     ],
     "say": "Here are words that help. Take your time. I'll wait. What would help most today? And, I can see how hard you're working.",
     "cue": {
      "at": [
       1,
       3,
       4
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "Finishing their sentences",
      "\"You seem fine to me.\"",
      "Talking about them"
     ],
     "say": "Some habits, meant kindly, take something away. Finishing their sentences, or answering for them. You seem fine to me, when many changes are invisible. And talking about them as if they aren't in the room.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "card",
     "title": "A loss with no clear name.",
     "body": "Here, and changed. Your grief is real too.",
     "say": "Many families describe a loss with no clear name. The person is here, and also changed. That kind of loss can leave you grieving and caring at the same time, often without anyone noticing. Your grief is real too, and it deserves support."
    },
    {
     "k": "points",
     "h": "Ways to help",
     "items": [
      [
       "Rides and practice",
       "To therapy, at home"
      ],
      [
       "Name the progress",
       "Out loud"
      ],
      [
       "Your own support",
       "A caregiver group, real breaks"
      ]
     ],
     "say": "Practical help matters. Offer rides to therapy, and practice at home if they want. Notice their progress, and name it out loud. And get support for yourself, like a caregiver group, with real breaks.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Know when to call.",
     "sub": "New stroke signs: call 911.",
     "say": "Watch, gently, for sadness or anger that won't lift, and help them talk with their doctor. If they speak of not wanting to live, help them call or text 988. For new signs of a stroke, call 911 right away."
    },
    {
     "k": "big",
     "h": "Your patience helps them heal.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your patience is part of their healing. The full guide has more, whenever you want it."
    }
   ]
  }
 },
 {
  "id": "faith-access",
  "ring": "life",
  "title": "Faith and Disability: When Worship Is Hard to Reach",
  "you": {
   "id": "ok-g-faith-access-you",
   "guide": "faith-access",
   "side": "you",
   "title": "Faith and Disability: When Worship Is Hard to Reach",
   "sideName": "For You",
   "mins": 4,
   "sources": [
    "carter19"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Faith and Disability: When Worship Is Hard to Reach",
     "sub": "For You",
     "say": "If a disability or illness has made worship hard to reach, this is for you, whatever your faith tradition, and whatever your questions. Your place is real, wherever you are listening from."
    },
    {
     "k": "big",
     "h": "A spiritual loss, and a practical one.",
     "say": "When you can't get to worship, the loss can be spiritual as well as practical. You may miss the people, the music, the rituals, or the place itself. You may feel forgotten. Both the practical part and the spiritual part deserve attention."
    },
    {
     "k": "points",
     "h": "Barriers that can change",
     "items": [
      [
       "The building",
       "Steps, seats, restrooms"
      ],
      [
       "Sound and sight",
       "Loops, captions, large print"
      ],
      [
       "The service",
       "Length, crowds, noise"
      ],
      [
       "Getting there",
       "Rides, visits, recordings"
      ]
     ],
     "say": "Many barriers can change. The building: steps, seating, and restrooms. Sound and sight: a hearing loop, captions, large print, or audio. The service itself: its length, the crowd, the noise. And getting there: rides, visits at home, or recordings on the days you can't go.",
     "cue": {
      "at": [
       1,
       2,
       3,
       4
      ]
     }
    },
    {
     "k": "big",
     "h": "Belonging is more than getting in the door.",
     "say": "Belonging means more than getting in the door. It means being welcomed, known, and needed. Many communities need what you bring, in roles that fit your body now. And many want to know what would help, and simply haven't been told."
    },
    {
     "k": "big",
     "h": "A word that carries you.",
     "say": "Let's pause. Place a hand somewhere that feels steady, if that's comfortable. Breathe in slowly. As you breathe out, say a word or a short line that has carried you: a prayer, a sacred phrase, or simply, I am here.",
     "beats": [
      "Let's pause.",
      "Place a hand somewhere that feels steady, if that's comfortable.",
      "Breathe in slowly.",
      {
       "t": "As you breathe out, say a word or a short line that has carried you: a prayer, a sacred phrase, or simply, I am here.",
       "w": 12
      }
     ]
    },
    {
     "k": "card",
     "title": "Hard questions belong too.",
     "body": "Why me? Is this a punishment? Where are you?",
     "say": "Hard questions belong too. Why me? Is this a punishment? Where are you, God, or where is the meaning in this? Many people of faith have asked the same things. If you've been told you'd be healed if you only believed enough, and it hurt, that's worth saying out loud, to someone who will listen without rushing to answers."
    },
    {
     "k": "words",
     "h": "Try saying",
     "items": [
      "\"I want to keep coming. Could we talk about what would help?\""
     ],
     "say": "You can ask. Try saying, to a leader or a trusted member: I want to keep coming, and some things make it hard. Could we talk about what would help? You choose the words for what you live with, and how much you share.",
     "cue": {
      "at": [
       1
      ]
     }
    },
    {
     "k": "big",
     "h": "When to reach out",
     "sub": "Thoughts of not wanting to live: call or text 988.",
     "say": "If spiritual struggle feels heavy, a chaplain, spiritual director, or faith leader you trust can sit with it. If sadness or hopelessness won't lift, talk with your doctor or a counselor. If you have thoughts of not wanting to live, call or text 988, any time."
    },
    {
     "k": "big",
     "h": "Your place is real.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your place in your faith, and in your community, is real, wherever you are. The full guide has more, whenever you want it."
    }
   ]
  },
  "helper": {
   "id": "ok-g-faith-access-helper",
   "guide": "faith-access",
   "side": "helper",
   "title": "Faith and Disability: When Worship Is Hard to Reach",
   "sideName": "For the Helper",
   "mins": 3,
   "sources": [
    "carter19"
   ],
   "scenes": [
    {
     "k": "title",
     "hero": "oak",
     "eyebrow": "When Life Changes",
     "h": "Faith and Disability: When Worship Is Hard to Reach",
     "sub": "For the Helper",
     "say": "This is for faith leaders, members of a faith community, and family or friends of someone for whom worship has become hard to reach because of a disability or illness. Your welcome can make a sacred place truly open."
    },
    {
     "k": "big",
     "h": "Present, welcomed, known, needed.",
     "say": "Belonging has many layers. Being present. Being invited and welcomed. Being known and accepted. Being needed, and loved. A ramp gets someone in the door. Friendship, and a real role, help them belong. Ask the person what belonging would look like for them, then listen closely, because their answer may surprise you."
    },
    {
     "k": "big",
     "h": "Walk your building.",
     "sub": "With fresh eyes.",
     "say": "Let's try something. Picture the entrance to your place of worship, or one you know. Walk through it in your mind as someone using a wheelchair, or someone who can't hear well. Name one barrier you'd notice.",
     "beats": [
      "Let's try something.",
      "Picture the entrance to your place of worship, or one you know.",
      "Walk through it in your mind as someone using a wheelchair, or someone who can't hear well.",
      {
       "t": "Name one barrier you'd notice.",
       "w": 12
      }
     ]
    },
    {
     "k": "words",
     "h": "Words that help",
     "items": [
      "\"We miss you.\"",
      "\"What would make worship work for you?\"",
      "\"Your questions are welcome here.\""
     ],
     "say": "Here are words that help. We miss you. What would help you come, or help us come to you? What would make worship work for you? And, your questions are welcome here.",
     "cue": {
      "at": [
       1,
       3,
       4
      ]
     }
    },
    {
     "k": "words",
     "h": "Gently set these aside",
     "items": [
      "\"More faith, and you'd be healed.\"",
      "\"The hardest battles for the strongest.\"",
      "Praying over them without asking"
     ],
     "say": "Some words, meant kindly, wound. If you had more faith, you'd be healed. God gives the hardest battles to the strongest people. And praying over someone without asking first. Ask what they would like, and follow their lead.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "points",
     "h": "Practical ways to welcome",
     "items": [
      [
       "Access",
       "Entrances, seats, sound, print"
      ],
      [
       "Bridges",
       "Rides, visits, recordings"
      ],
      [
       "Roles",
       "Invite their gifts"
      ]
     ],
     "say": "Practical welcome matters. Access: check entrances, seating, restrooms, sound, lighting, and print. Bridges, for days they can't come: rides, visits, recordings, and a seat saved. And roles: invite their gifts, in reading, greeting, teaching, praying, or welcoming others.",
     "cue": {
      "at": [
       1,
       2,
       3
      ]
     }
    },
    {
     "k": "big",
     "h": "Start with one change.",
     "sub": "And keep listening.",
     "say": "Making a community more welcoming takes time and many small changes. Start with one, and keep listening to the people who need it most. They are the experts. If someone ever speaks of not wanting to live, help them call or text 988."
    },
    {
     "k": "big",
     "h": "Make the sacred place open.",
     "sub": "The full guide has more, whenever you want it.",
     "say": "Your welcome can make a sacred place truly open. The full guide has more, whenever you want it."
    }
   ]
  }
 }
];
  V.forEach(function (g) { if (!O.guides.some(function (x) { return x.id === g.id; })) O.guides.push(g); }); })();
/* HA2 videos end */
