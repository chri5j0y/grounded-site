/* =====================================================================
   OAK . When Life Changes videos (GWG BLD 719, October 2026)
   Two narrated videos for each Oak guide: For You (the person facing it) and For the Helper
   (the person walking beside them). Played by shared/gg-learn.js, which loads this file the
   first time Oak's Learn opens. So far: Inside Me and Loss and Grief (BLD 719), Health and the End of Life (BLD 720): 32 guides, 64 videos.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld720/source (and bld719/source for the first two rings) in grounded-workshop:
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
}
]
};
})();
