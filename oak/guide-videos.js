/* =====================================================================
   OAK . When Life Changes videos (GWG BLD 719, October 2026)
   Two narrated videos for each Oak guide: For You (the person facing it) and For the Helper
   (the person walking beside them). Played by shared/gg-learn.js, which loads this file the
   first time Oak's Learn opens. So far: Inside Me and Loss and Grief (18 guides, 36 videos).
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld719/source in grounded-workshop:
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
}
]
};
})();
