/* =====================================================================
   WILLOW . When Life Changes videos (Oak and Willow Build B1, October 2026)
   Two narrated videos for every Willow guide: For You (the person facing it) and
   For the Helper (the person walking beside them). Played by shared/gg-learn.js,
   which loads this file the first time Willow's Learn opens.
   Each video: {id, guide, side, title, sideName, mins, scenes}. Scene kinds and cue
   timing are the same as shared/learn-lessons.js (beats with w = a pause-and-do ring).
   Rules for these scripts: faith only in the faith-centered guides (miracle, punish,
   comeback, afraid, forgive); at least one pause-and-do in every video; facts match
   willow/guides.js. Edit words here; proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.willow = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, if this is what you are facing. For the Helper, if you are walking beside someone who is. Nothing to finish, and a quiet check marks the ones you have watched.",
"rings": [
[
"spirit",
"The Spirit and the People"
],
[
"last",
"The Last Days and After"
]
],
"guides": [
{
"id": "miracle",
"ring": "spirit",
"title": "Hoping for a Miracle",
"you": {
"id": "wl-g-miracle-you",
"guide": "miracle",
"side": "you",
"title": "Hoping for a Miracle",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Hoping for a Miracle",
"sub": "For You",
"say": "If you are praying for a miracle for someone you love, this is for you. You don't have to stop hoping to watch it."
},
{
"k": "big",
"h": "Hoping for a miracle is love.",
"say": "Hoping for a miracle is love. It is faith holding on with both hands. Many families who pray for a miracle already sense how serious things are. That is part of why the prayer is so strong.",
"sub": "Faith, holding on with both hands."
},
{
"k": "big",
"h": "You can hold both.",
"say": "Here is something many families discover. You can keep praying for the miracle, and still prepare for the goodbye. Both can happen in the same room. Preparing is not giving up on God. It makes sure nothing important goes unsaid.",
"sub": "Praying for the miracle. Preparing for the goodbye."
},
{
"k": "points",
"h": "Ways to hold both",
"items": [
[
"Keep praying",
"Out loud, together, as often as you want"
],
[
"Say what matters now",
"Thank you. I love you. Tell me a story."
],
[
"Invite your own pastor",
"Or the faith leader you trust"
],
[
"Ask the nurse what to watch for",
"So nothing catches you off guard"
]
],
"say": "Here are ways families hold both. Keep praying, out loud and together, as often as you want. Say what matters now, while they can hear it. Invite your own pastor, or the faith leader you trust. And ask the hospice nurse what to watch for, so nothing catches you off guard."
},
{
"k": "big",
"h": "What would a miracle look like to you?",
"say": "Here is a question a chaplain might ask you. What would a miracle look like to you? Take a moment with that question.",
"beats": [
"Here is a question a chaplain might ask you.",
"What would a miracle look like to you?",
{
"t": "Take a moment with that question.",
"w": 12
}
],
"sub": "Take a moment with that question."
},
{
"k": "big",
"h": "Miracles come in more than one shape.",
"say": "For some families, the miracle they pray for is healing. Along the way, many also notice other gifts. A peaceful hour. A son who finally comes home. A hand that squeezes back. Hoping for one doesn't stop you from receiving the others."
},
{
"k": "words",
"h": "Words you can pray",
"items": [
"We are asking for healing.",
"Whatever comes, hold them close.",
"Give us time to say what matters.",
"We trust you with the one we love."
],
"say": "If you want words to pray, here are a few. We are asking for healing. Whatever comes, hold them close. Give us time to say what matters. We trust you with the one we love."
},
{
"k": "big",
"h": "Keep hoping. Keep loving.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep hoping, and keep loving. Your hospice team is with you, day or night, and so is your chaplain. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-miracle-helper",
"guide": "miracle",
"side": "helper",
"title": "Hoping for a Miracle",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Hoping for a Miracle",
"sub": "For the Helper",
"say": "When a family tells you they are hoping for a miracle, it can be hard to know what to say. This is for anyone walking beside them."
},
{
"k": "big",
"h": "Hope for a miracle often means they already know.",
"say": "Hope for a miracle often means the family already knows how serious it is. Otherwise they would not need one. So you don't need to convince anyone of anything. Your part is to stay close."
},
{
"k": "words",
"h": "Words that stay close",
"items": [
"I'm hoping with you.",
"What would a miracle look like for you?",
"I wish it were different, and I worry the body is getting tired."
],
"say": "Here are words that stay close. I'm hoping with you. What would a miracle look like for you? And, when the time is right, I wish it were different, and I worry the body is getting tired."
},
{
"k": "points",
"h": "What keeps their trust",
"items": [
[
"Let the hope stand",
"Nobody needs to be talked out of it"
],
[
"Leave God's power to God",
"Your part is presence"
],
[
"Stay close",
"Hope and closeness go together"
]
],
"say": "A few things keep their trust. Let the hope stand. Nobody needs to be talked out of it, and words like be realistic usually close the door. Leave God's power to God. Your part is presence. And stay close. Hope and closeness go together."
},
{
"k": "big",
"h": "What are they hoping for, underneath?",
"say": "Take a moment. Think of the family you are walking with. What are they hoping for, underneath the miracle? More time, maybe, or peace, or not being alone.",
"beats": [
"Take a moment.",
"Think of the family you are walking with.",
{
"t": "What are they hoping for, underneath the miracle?",
"w": 10
},
"More time, maybe, or peace, or not being alone."
]
},
{
"k": "big",
"h": "Pray for the miracle. Prepare for the goodbye.",
"say": "When the family is ready, you can help them hold both. Keep praying for the miracle, and prepare for the goodbye, side by side. Ask whether they would like their own pastor to come. Many families find deep comfort in that."
},
{
"k": "big",
"h": "Hope with them. Stay with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Hope with them, and stay with them, whatever comes. When the family has questions about what is happening in the body, bring in the hospice nurse. The full guide has more."
}
]
}
},
{
"id": "punish",
"ring": "spirit",
"title": "Is God Punishing Me?",
"you": {
"id": "wl-g-punish-you",
"guide": "punish",
"side": "you",
"title": "Is God Punishing Me?",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Is God Punishing Me?",
"sub": "For You",
"say": "If you have been asking whether God is punishing you, or why God won't heal you, this is for you. You are allowed to ask."
},
{
"k": "big",
"h": "This question is as old as faith.",
"say": "This question is as old as faith itself. People all through scripture asked God why. Asking doesn't mean your faith is failing. It means you are being honest with God.",
"sub": "You are in good company."
},
{
"k": "story",
"title": "Why Is God Doing This to Me?",
"lines": [
"A woman with Parkinson’s shook with tremors and asked me, Why is God doing this to me?",
"I told her anyone in her shoes would ask the same thing, and that people all through scripture had asked it too.",
"Something shifted. She nodded and said, He has never left me."
],
"lesson": "You can honor the question without rushing to answer it.",
"note": "From a Grounded story by Chris Joy",
"say": "I sat with a woman with Parkinson’s whose arms shook with tremors as she asked me, why is God doing this to me? I told her anyone in her shoes would be asking the same thing, and that the Bible is full of people asking it too. Something shifted in her, and she said, he has never left me."
},
{
"k": "big",
"h": "Prayer doesn't have to be polite.",
"say": "Prayer doesn't have to be polite. Psalm 13 asks God, how long will you forget me? Psalm 22 cries out, why have you forsaken me? These are prayers too. They are called lament, and they were kept for people who feel exactly like you.",
"sub": "Psalm 13. Psalm 22."
},
{
"k": "words",
"h": "Say it in your own words",
"say": "Try it now, out loud or in your heart. God, I'm angry. I don't understand. I need you to stay with me. Take a moment, and say what is true for you.",
"beats": [
"Try it now, out loud or in your heart.",
"God, I'm angry.",
"I don't understand.",
"I need you to stay with me.",
{
"t": "Take a moment, and say what is true for you.",
"w": 12
}
],
"items": [
"God, I'm angry.",
"I don't understand.",
"I need you to stay with me."
]
},
{
"k": "points",
"h": "What can help",
"items": [
[
"Tell someone you trust",
"A chaplain, your pastor, a friend"
],
[
"Ask for your own faith leader",
"Your hospice can help reach them"
],
[
"Let others pray for you",
"On the days you can't find the words"
]
],
"say": "Some things help. Tell someone you trust, a chaplain, your own pastor, or a friend. Ask your hospice to help reach your own faith leader. And let others pray for you, on the days you can't find the words."
},
{
"k": "big",
"h": "Bring every question. You are still held.",
"sub": "The full guide has more, whenever you want it.",
"say": "Many people of faith have found that their hardest questions did not drive God away. You can bring every question, and still be held. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-punish-helper",
"guide": "punish",
"side": "helper",
"title": "Is God Punishing Me?",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Is God Punishing Me?",
"sub": "For the Helper",
"say": "When someone asks you, is God punishing me, it can stop you in your tracks. This is for anyone sitting with that question."
},
{
"k": "big",
"h": "It's called divine struggle.",
"say": "Chaplains call this divine struggle. It is common, and it hurts. Left alone, it can make the hardest days even harder. Company makes a real difference.",
"sub": "It's common, and it hurts."
},
{
"k": "words",
"h": "Words that open the door",
"items": [
"That's a heavy question.",
"Tell me more about you and God right now.",
"You're allowed to be angry at God. People in the Bible were."
],
"say": "Here are words that open the door. That's a heavy question. Tell me more about you and God right now. You're allowed to be angry at God. People in the Bible were."
},
{
"k": "big",
"h": "Company matters more than answers.",
"say": "You don't need an answer. Listen instead. Do they feel punished? Abandoned? Angry? Each one needs company more than an explanation. Ready answers like God has a plan can close the door, so let them rest, and keep listening.",
"sub": "Listen for punishment, abandonment, or anger."
},
{
"k": "big",
"h": "Sit with the question",
"say": "Before your next visit, try this. Imagine them asking, why is God doing this to me. Notice the urge to fix it, and let it settle. Then picture yourself simply staying.",
"beats": [
"Before your next visit, try this.",
"Imagine them asking, why is God doing this to me.",
{
"t": "Notice the urge to fix it, and let it settle.",
"w": 10
},
"Then picture yourself simply staying."
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Lament",
"Psalm 13 and Psalm 22 give the feelings words"
],
[
"Their own faith leader",
"Offer to help reach them"
],
[
"Their own tradition",
"Ask how it understands suffering"
]
],
"say": "Some things help. Lament, the honest prayers of the Psalms, gives their feelings words. Offer to help reach their own faith leader. And ask how their faith understands suffering. In some traditions, illness can be a test. In others, karma comes up. Listening helps their own tradition bring comfort instead of blame."
},
{
"k": "big",
"h": "Stay. That is what they need most.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay, and keep listening. If the struggle grows heavy, let the hospice chaplain know. The full guide has more."
}
]
}
},
{
"id": "comeback",
"ring": "spirit",
"title": "Can I Come Back?",
"you": {
"id": "wl-g-comeback-you",
"guide": "comeback",
"side": "you",
"title": "Can I Come Back?",
"sideName": "For You",
"mins": 5,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Can I Come Back?",
"sub": "For You",
"say": "If you have been away from your faith for a while, and you are wondering whether you can come back, this is for you."
},
{
"k": "big",
"h": "The door is open.",
"say": "Here is the first thing to know. The door is open. Nobody is keeping score. Many people return to faith near the end of life, and many faith leaders count it among the most beautiful parts of their work.",
"sub": "Nobody is keeping score."
},
{
"k": "points",
"h": "People step away for different reasons",
"items": [
[
"Hurt by people",
"Church hurt is real"
],
[
"Doubt",
"Questions aren't the opposite of faith"
],
[
"Feeling far from God",
"After a loss, or a long silence"
]
],
"say": "People step away for different reasons. Some were hurt by people in a church, and that hurt is real. Some had doubts, and questions are not the opposite of faith. Some felt far from God, after a loss or a long silence. Whatever your reason, you are welcome."
},
{
"k": "story",
"title": "The Atypical Atheist",
"lines": [
"A man in a group home took one look at my badge and exploded: I don’t want a chaplain. I don’t believe in any of that.",
"Then he dropped the act. I tell people I’m an atheist to keep the religious people away. I believe in God, or something. I just can’t stand the church part.",
"I told him I take the Bible seriously when it says we are the church. Not the building. Not the brand. The people."
],
"lesson": "Being hurt by a church is different from being far from God.",
"note": "From a Grounded story by Chris Joy",
"say": "I once walked into a group home, and a man took one look at my chaplain badge and told me he did not want a chaplain, and did not believe in any of it. I smiled and asked, so tell me, what do you believe in? Later he dropped the act. He said, I tell people I am an atheist to keep the religious people away. I believe in God, or something. I just cannot stand the church part. I told him I take the Bible seriously when it says we are the church. Not the building, not the brand. The people.",
"link": {
"href": "https://chri5j0y.substack.com/p/the-atypical-atheist",
"label": "Read the Full Story: The Atypical Atheist"
}
},
{
"k": "big",
"h": "Hurt by a church is different from far from God.",
"say": "If a church hurt you, this is worth hearing. Being hurt by a church is different from being far from God. The church is the people, not the building or the brand. You get to choose who walks with you now."
},
{
"k": "big",
"h": "What would coming back look like for you?",
"say": "Take a moment with this question. What would coming back look like for you? A prayer, a priest, a hymn, a quiet word with God? Every answer is welcome.",
"beats": [
"Take a moment with this question.",
"What would coming back look like for you?",
{
"t": "A prayer, a priest, a hymn, a quiet word with God?",
"w": 12
},
"Every answer is welcome."
]
},
{
"k": "points",
"h": "Ways back",
"items": [
[
"Ask for your kind of clergy",
"Your hospice can help find them"
],
[
"Ask for the rite you remember",
"Confession, communion, a blessing"
],
[
"Start with one prayer",
"In your own words"
]
],
"say": "Here are ways back. Ask your hospice to help find the kind of clergy you trust. Ask for the rite you remember, like confession, communion, or a blessing. Or start with one prayer, in your own words."
},
{
"k": "big",
"h": "You are welcome, just as you are.",
"sub": "The full guide has more, whenever you want it.",
"say": "You are welcome, just as you are. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-comeback-helper",
"guide": "comeback",
"side": "helper",
"title": "Can I Come Back?",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Can I Come Back?",
"sub": "For the Helper",
"say": "When someone you love tells you they have fallen away from their faith, and asks whether they can come back, this is for you."
},
{
"k": "points",
"h": "Usually one of three things",
"items": [
[
"Hurt by people",
"Often in a church"
],
[
"Doubt",
"Questions that grew over time"
],
[
"Feeling abandoned by God",
"After a loss, or a long silence"
]
],
"say": "Usually it is one of three things. Hurt by people, often in a church. Doubt. Or feeling abandoned by God. Listening for which one it is helps you know what they need."
},
{
"k": "words",
"h": "Words that welcome",
"items": [
"Being hurt by a church is not the same as being far from God.",
"Questions aren't the opposite of faith.",
"The door is open. Nobody's keeping score."
],
"say": "Here are words that welcome. Being hurt by a church is not the same as being far from God. Questions aren't the opposite of faith. The door is open. Nobody's keeping score."
},
{
"k": "big",
"h": "Make the return easy.",
"say": "Make the return easy. Coming back isn't a test to pass, and even a gentle I told you so can close a door that took years to open. Welcome them the way you would want to be welcomed.",
"sub": "Open arms, no tests."
},
{
"k": "story",
"title": "A Presence That Cannot Be Boxed",
"lines": [
"The nurse warned me: not religious. The family sat with their arms crossed, ready to get through my visit politely.",
"Then the wife leaned forward. We are not religious, she said. But we are deeply spiritual. We believe in a presence that cannot be boxed or labeled or fully described.",
"We kept what felt true from each tradition and let the rest go. It is not neat or tidy. But it is ours."
],
"lesson": "Faith doesn’t have to fit a box to hold someone up.",
"note": "From a Grounded story by Chris Joy",
"say": "On one visit, the nurse warned me, not religious. The family sat with their arms crossed. Then the wife leaned forward and said, we are not religious, but we are deeply spiritual. We believe in a presence that cannot be boxed, or labeled, or fully described. We kept what felt true from each tradition, and let the rest go. It is not neat or tidy. But it is ours."
},
{
"k": "big",
"h": "Who could you call for them?",
"say": "Take a moment and think. If they asked today, who could you call? Their old parish, a pastor, an imam, a rabbi, a teacher they trusted? Write down one name.",
"beats": [
"Take a moment and think.",
"If they asked today, who could you call?",
"Their old parish, a pastor, an imam, a rabbi, a teacher they trusted?",
{
"t": "Write down one name.",
"w": 10
}
]
},
{
"k": "big",
"h": "Find their kind of clergy, fast.",
"say": "Then move quickly. Find their kind of clergy, fast. A Catholic who left forty years ago may want Confession today. Your hospice chaplain can help make the call.",
"sub": "Time matters here."
},
{
"k": "big",
"h": "Open the door. Walk through it with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Open the door, and walk through it with them. The full guide has more."
}
]
}
},
{
"id": "afraid",
"ring": "spirit",
"title": "Afraid of What Comes After",
"you": {
"id": "wl-g-afraid-you",
"guide": "afraid",
"side": "you",
"title": "Afraid of What Comes After",
"sideName": "For You",
"mins": 5,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Afraid of What Comes After",
"sub": "For You",
"say": "If you are afraid of what comes after death, of judgment, or of nothing at all, this is for you. These are some of the oldest fears people carry, and you don't have to carry them alone."
},
{
"k": "big",
"h": "Fear near the end is human.",
"say": "Fear near the end is human. Brave people feel it. Faithful people feel it. Feeling afraid is not a lack of faith, and it isn't a failure.",
"sub": "It is not a lack of faith."
},
{
"k": "points",
"h": "Two old fears",
"items": [
[
"Fear of judgment",
"Of hell, or of not being forgiven"
],
[
"Fear of nothing",
"Of simply not being anymore"
]
],
"say": "Most fears about what comes after are one of two. Fear of judgment, of hell, or of not being forgiven. Or fear of nothing, of simply not being anymore. You might feel one, or both, or something in between."
},
{
"k": "big",
"h": "What do you picture when you are afraid?",
"say": "Here is a gentle question. What do you picture when you are afraid? You don't have to say it out loud. Just notice it.",
"beats": [
"Here is a gentle question.",
"What do you picture when you are afraid?",
"You don't have to say it out loud.",
{
"t": "Just notice it.",
"w": 10
}
]
},
{
"k": "big",
"h": "Fear sometimes has something underneath it.",
"say": "Sometimes fear of judgment sits on top of something specific, a regret, or something you would like to set right. If that is true for you, it can help to say it to someone you trust. Many people feel lighter after.",
"sub": "Something you would like to set right."
},
{
"k": "points",
"h": "What can help",
"items": [
[
"Your tradition's word of mercy",
"From your own clergy, if you want"
],
[
"A rite of your faith",
"Confession, prayer, chanting"
],
[
"What continues",
"In the people you love, and in the earth"
]
],
"say": "Here is what helps many people. Your own tradition's word of mercy, from your own clergy if you want it. A rite of your faith, like confession, prayer, or chanting. And if your fear is of nothing at all, many find peace in what continues, in the people they loved, and in the earth."
},
{
"k": "breathe",
"h": "Breathe with the fear",
"sub": "It can be here, and you can be okay.",
"say": "Let's breathe for a moment. In for four. And out for six. The fear can be here, and you can still be held.",
"hold": 24
},
{
"k": "big",
"h": "You don't have to face this alone.",
"sub": "The full guide has more, whenever you want it.",
"say": "Tell someone what you are afraid of, a chaplain, your faith leader, or someone you love. You don't have to face this alone. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-afraid-helper",
"guide": "afraid",
"side": "helper",
"title": "Afraid of What Comes After",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Afraid of What Comes After",
"sub": "For the Helper",
"say": "When someone you love tells you they are afraid of hell, or afraid there is nothing after death, this is for you."
},
{
"k": "big",
"h": "Listen all the way to the end.",
"say": "The most helpful thing you can do is ask, what do you picture when you're afraid? Then listen all the way to the end. Being heard is the first comfort.",
"sub": "Being heard is the first comfort."
},
{
"k": "points",
"h": "What keeps the door open",
"items": [
[
"Let the fear be real",
"It needs room, not reassurance"
],
[
"Let the debate rest",
"Nobody gets argued out of fear"
],
[
"Gently ask what it's about",
"Fear of judgment often sits on a specific guilt"
]
],
"say": "A few things keep the door open. Let the fear be real. Quick reassurance, like don't worry about that, tends to close the door. Let the debate rest. Nobody gets argued out of fear. And gently ask what it's about. Fear of judgment often sits on top of a specific guilt."
},
{
"k": "points",
"h": "Comfort from their own tradition",
"items": [
[
"Catholic",
"Confession, and a mercy bigger than a missed priest"
],
[
"Baptist and Evangelical",
"Words of assurance from scripture"
],
[
"Buddhist",
"Calm and chanting for a peaceful passage"
],
[
"No faith",
"Honesty and company, no God-language"
]
],
"say": "Comfort sounds different in different traditions. For a Catholic, confession, and a mercy bigger than a missed priest. For Baptists and Evangelicals, words of assurance from scripture. For a Buddhist afraid of a hard rebirth, calm and chanting. And for someone without faith, honesty and company, without God language."
},
{
"k": "big",
"h": "Picture yourself just listening.",
"say": "Take a breath. Picture them telling you what they're afraid of. Notice the urge to fix it. Let it go, and picture yourself just listening.",
"beats": [
"Take a breath.",
"Picture them telling you what they're afraid of.",
"Notice the urge to fix it.",
{
"t": "Let it go, and picture yourself just listening.",
"w": 10
}
]
},
{
"k": "big",
"h": "Bring in their own clergy.",
"say": "If they want it, help them reach their own clergy. Your hospice chaplain can help. A word of mercy from someone in their own tradition can carry a weight nothing else can."
},
{
"k": "big",
"h": "Stay with them in it.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay with them in the fear, and keep listening. The full guide has more."
}
]
}
},
{
"id": "forgive",
"ring": "spirit",
"title": "Forgiveness Near the End",
"you": {
"id": "wl-g-forgive-you",
"guide": "forgive",
"side": "you",
"title": "Forgiveness Near the End",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Forgiveness Near the End",
"sub": "For You",
"say": "If there is someone you can't forgive, or someone who won't forgive you, and time feels short, this is for you."
},
{
"k": "big",
"h": "Forgiving isn't saying it was okay.",
"say": "Two things to know first. Forgiving isn't saying it was okay. And it doesn't require making up, or even a visit. Forgiveness near the end is possible, and it can happen inside you, without the other person ever knowing.",
"sub": "And it does not require making up."
},
{
"k": "big",
"h": "One step counts.",
"say": "Forgiveness is a process, not one big moment. One step counts. For some people, the first step is forgiving themselves, or forgiving God."
},
{
"k": "words",
"h": "The Four Things",
"items": [
"Please forgive me.",
"I forgive you.",
"Thank you.",
"I love you."
],
"say": "Many hospice teams teach four things people often want to say. Please forgive me. I forgive you. Thank you. I love you. You can say them one at a time, and only the ones that are true for you.",
"sub": "Say only the ones that are true."
},
{
"k": "big",
"h": "Which one is true for you today?",
"say": "Take a moment. Of those four, which one is true for you today? Just one is enough.",
"beats": [
"Take a moment.",
"Of those four, which one is true for you today?",
{
"t": "Just one is enough.",
"w": 12
}
]
},
{
"k": "points",
"h": "Ways to say it",
"items": [
[
"A letter",
"Even one you never send"
],
[
"A message",
"Recorded or written"
],
[
"A visit",
"Only if you want one"
]
],
"say": "You can say it in different ways. A letter, even one you never send. A message, recorded or written. Or a visit, only if you want one. You don't owe anyone a visit."
},
{
"k": "big",
"h": "You decide how far to go.",
"sub": "The full guide has more, whenever you want it.",
"say": "You decide how far to go, and when. A chaplain can walk with you through it, and help you find the words. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-forgive-helper",
"guide": "forgive",
"side": "helper",
"title": "Forgiveness Near the End",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Forgiveness Near the End",
"sub": "For the Helper",
"say": "When someone you love is carrying an old hurt near the end of life, you may feel pulled to fix it. This is for you."
},
{
"k": "big",
"h": "Forgiveness near the end is possible.",
"say": "Forgiveness near the end is possible, and it doesn't require reconciling. Your part is to make room for it, not to make it happen.",
"sub": "It does not require reconciling."
},
{
"k": "words",
"h": "Words that make room",
"items": [
"Forgiving isn't saying it was okay.",
"You don't owe anyone a visit.",
"You can say it in a letter, even one you never send."
],
"say": "Here are words that make room. Forgiving isn't saying it was okay. You don't owe anyone a visit. You can say it in a letter, even one you never send."
},
{
"k": "big",
"h": "Protect the space.",
"say": "Well-meant words like life's too short can add pressure. And when someone abused them, forgiveness is theirs alone to choose, never something to push. Your job is to protect the space, so whatever comes is truly theirs.",
"sub": "Whatever comes should be theirs."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"The Four Things",
"Please forgive me. I forgive you. Thank you. I love you."
],
[
"One step at a time",
"One step counts"
],
[
"Forgiving God, or themselves",
"Some people start there"
]
],
"say": "Here is what helps. The Four Things, one at a time. Please forgive me. I forgive you. Thank you. I love you. Remember that one step counts. And some people need to forgive God, or themselves, first. In one small study, a four week forgiveness program helped people near the end of life with forgiveness, hope, and anger."
},
{
"k": "big",
"h": "Is there something you want to say too?",
"say": "Take a moment for yourself. Is there anything you want to say to them, before the end? You can say it today.",
"beats": [
"Take a moment for yourself.",
{
"t": "Is there anything you want to say to them, before the end?",
"w": 12
},
"You can say it today."
]
},
{
"k": "big",
"h": "Make room. Let them lead.",
"sub": "The full guide has more, whenever you want it.",
"say": "Make room, and let them lead. The full guide has more."
}
]
}
},
{
"id": "burden",
"ring": "spirit",
"title": "I'm a Burden",
"you": {
"id": "wl-g-burden-you",
"guide": "burden",
"side": "you",
"title": "I'm a Burden",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I'm a Burden",
"sub": "For You",
"say": "If you feel like a burden to the people caring for you, this is for you. Many people near the end feel this way, and it makes sense."
},
{
"k": "big",
"h": "It's hard to be on this side of the caring.",
"say": "It's hard to be on this side of the caring. Maybe you were always the one who helped. Now you need help with things you never imagined. That loss is real, and you are allowed to grieve it."
},
{
"k": "big",
"h": "Letting them care for you is a gift too.",
"say": "Here is another way to see it. Your family cares for you because they love you. When you let them, you give them something precious. A way to love you back. Many families say later that these were some of the most meaningful days of their lives."
},
{
"k": "points",
"h": "Ways you still give",
"items": [
[
"Words for each person",
"What you see in them, and hope for them"
],
[
"A story",
"From your life, for them to keep"
],
[
"Advice",
"What you know that they need"
],
[
"Thanks",
"One specific thank you"
]
],
"say": "And you still have so much to give. Words for each person, what you see in them and hope for them. A story from your life, for them to keep. Advice, what you know that they need. Or one specific thank you."
},
{
"k": "big",
"h": "What could you give today?",
"say": "Take a moment. Think of one person who cares for you. What could you give them today? A thank you, a memory, a word of pride.",
"beats": [
"Take a moment.",
"Think of one person who cares for you.",
"What could you give them today?",
{
"t": "A thank you, a memory, a word of pride.",
"w": 12
}
]
},
{
"k": "story",
"title": "Passing It On",
"lines": [
"A man who had built a business from almost nothing told me, I can’t die right now. It will fall apart without me.",
"Over a few days, we turned toward legacy. He recorded what he knew, told his best stories, and made a message for each person who worked for him.",
"Then he told his family: I release you. Run it, sell it, or close the doors. Don’t let it own you."
],
"lesson": "What you pass on keeps growing after you.",
"note": "Names and details changed",
"say": "A man who had built a business from almost nothing once told the chaplain, I cannot die right now, it will fall apart without me. Over a few days, he turned toward legacy. He recorded what he knew, told his best stories, and made a message for each person who worked for him. In his last days, his worry softened into pride and peace. What you pass on keeps growing after you."
},
{
"k": "big",
"h": "Tell someone if it feels heavy.",
"sub": "The full guide has more, whenever you want it.",
"say": "If feeling like a burden gets heavy, or you find yourself wishing it would all end, tell someone on your hospice team. They want to know, and they can help. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-burden-helper",
"guide": "burden",
"side": "helper",
"title": "I'm a Burden",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I'm a Burden",
"sub": "For the Helper",
"say": "When someone you love says, I'm a burden, it can break your heart. This is for anyone caring for them."
},
{
"k": "big",
"h": "Most people near the end feel this sometimes.",
"say": "Most people near the end feel this sometimes, and it often grows as death gets closer. It is tied to losing independence and dignity. It says nothing about how well you are caring for them."
},
{
"k": "big",
"h": "Name the feeling.",
"say": "It's natural to say, you're not a burden. But it argues with their feeling, and they may stop telling you. Naming the feeling works better. It tells them you heard.",
"sub": "It tells them you heard."
},
{
"k": "words",
"h": "Words that honor them",
"items": [
"It's hard to be on this side of the caring.",
"You let us care for you. That's a gift too.",
"Thank you for..."
],
"say": "Here are words that honor them. It's hard to be on this side of the caring. You let us care for you, and that's a gift too. And then, one specific thank you."
},
{
"k": "big",
"h": "One specific thank-you",
"say": "Take a moment. Think of one specific thing they did for you. Something small and real. Now you have something to say tomorrow.",
"beats": [
"Take a moment.",
"Think of one specific thing they did for you.",
{
"t": "Something small and real.",
"w": 12
},
"Now you have something to say tomorrow."
]
},
{
"k": "points",
"h": "Let them still give",
"items": [
[
"Ask for their words",
"For you, or for the kids"
],
[
"Ask for advice",
"On something real"
],
[
"Ask for a story",
"One you want to keep"
]
],
"say": "Let them still give. Ask for their words, for you or for the kids. Ask for their advice on something real. Ask for a story you want to keep."
},
{
"k": "big",
"h": "Tell the team when it runs deep.",
"sub": "The full guide has more, whenever you want it.",
"say": "If they say it often, or seem to wish it would end sooner, let the hospice team know. Feeling like a burden can go along with wanting to hasten death, and the team will want to ask about it gently. The full guide has more."
}
]
}
},
{
"id": "end",
"ring": "spirit",
"title": "I Wish It Would End",
"you": {
"id": "wl-g-end-you",
"guide": "end",
"side": "you",
"title": "I Wish It Would End",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wish It Would End",
"sub": "For You",
"say": "If you have been thinking, I wish it would end, or I'm ready, this is for you. You can say these things. They deserve to be heard."
},
{
"k": "big",
"h": "Saying it out loud is okay.",
"say": "Many people near the end feel this way. It can mean relief, or exhaustion, or a deep readiness. It can also mean something hurts too much. Saying it out loud is okay. Talking about it helps your team help you.",
"sub": "It helps your team help you."
},
{
"k": "points",
"h": "What it can mean",
"items": [
[
"I'm ready",
"Peace with what is coming"
],
[
"I'm so tired",
"Exhaustion, body and heart"
],
[
"It hurts too much",
"Pain or suffering that needs care"
]
],
"say": "What does it mean for you? It might mean I'm ready, a peace with what is coming. It might mean I'm so tired. Or it might mean it hurts too much, and something needs care."
},
{
"k": "big",
"h": "Which is closest for you?",
"say": "Take a moment. Which one is closest for you right now? Ready, tired, or hurting? Any answer is okay.",
"beats": [
"Take a moment.",
"Which one is closest for you right now?",
{
"t": "Ready, tired, or hurting?",
"w": 10
},
"Any answer is okay."
]
},
{
"k": "big",
"h": "Tell your hospice nurse.",
"say": "Whatever your answer, tell your hospice nurse. Pain, trouble breathing, worry, and restlessness can often be eased. You deserve comfort, and your team wants to help.",
"sub": "Comfort can often be improved."
},
{
"k": "story",
"title": "Total Bliss",
"lines": [
"Jane had been a young widow, and never stopped loving her husband.",
"A few days before she died, she told me she could feel her death getting close.",
"She smiled and said she felt nothing but peace and joy. Almost bliss."
],
"lesson": "Readiness can be peace.",
"note": "From a Grounded story by Chris Joy",
"say": "I met Jane a few days before she died, and she told me she could feel her death getting close. And she smiled, and said she felt nothing but peace and joy. Almost bliss. Readiness can be peace.",
"link": {
"href": "https://chri5j0y.substack.com/p/total-bliss",
"label": "Read the Full Story: Total Bliss"
}
},
{
"k": "big",
"h": "If you are thinking of ending your life yourself",
"say": "If you are thinking about ending your life yourself, please tell your hospice team right away, or call or text 988, any time. If you are in danger now, call 911. You deserve care, and you can share this with someone today.",
"sub": "Tell your hospice team now, or call or text 988."
},
{
"k": "big",
"h": "Readiness can be peace.",
"sub": "The full guide has more, whenever you want it.",
"say": "And if what you feel is readiness, that can be peace. Let the people who love you know. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-end-helper",
"guide": "end",
"side": "helper",
"title": "I Wish It Would End",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wish It Would End",
"sub": "For the Helper",
"say": "When someone you love says, I wish it would end, or I'm ready, it can be frightening. This is for you."
},
{
"k": "big",
"h": "Usually, it isn't about suicide.",
"say": "It is usually not about suicide. Most often it means relief, exhaustion, readiness, or a cry for help with suffering. Asking about it doesn't cause harm. Asking is how you find out what they need."
},
{
"k": "words",
"h": "Words that keep them talking",
"items": [
"Thank you for telling me.",
"What's making it hardest right now?",
"Is it more that you're ready, or that it hurts too much?"
],
"say": "Here are words that keep them talking. Thank you for telling me. What's making it hardest right now? Is it more that you're ready, or that it hurts too much?"
},
{
"k": "big",
"h": "Stay calm. Stay close.",
"say": "Stay calm, and stay close. A calm, steady question keeps the door open. Reactions like don't talk like that, or visible panic, can close it."
},
{
"k": "big",
"h": "Practice the question once.",
"say": "Try it now, quietly. Is it more that you're ready, or that it hurts too much? Say it once, so it is ready when you need it.",
"beats": [
"Try it now, quietly.",
"Is it more that you're ready, or that it hurts too much?",
{
"t": "Say it once, so it is ready when you need it.",
"w": 8
}
]
},
{
"k": "points",
"h": "What to do next",
"items": [
[
"Tell the hospice nurse",
"Comfort can often be improved"
],
[
"Treat what can be treated",
"Pain, breathlessness, fear"
],
[
"Make room for readiness",
"It can be peace"
]
],
"say": "Then tell the hospice nurse. Treat what can be treated. Pain, trouble breathing, and fear can often be eased. And make room for readiness as peace."
},
{
"k": "big",
"h": "If they talk about ending their life themselves",
"say": "If they talk about ending their life themselves, call your hospice line first, any time, day or night. You can also call or text 988. If anyone is in danger now, call 911. Medical aid in dying is not legal in Minnesota. If they ask about it, stay calm, listen, and bring in the hospice team.",
"sub": "Hospice line first. Then 988. In danger now, 911."
},
{
"k": "big",
"h": "Thank you for listening.",
"sub": "The full guide has more, whenever you want it.",
"say": "Thank you for listening to something so hard. The full guide has more."
}
]
}
},
{
"id": "notready",
"ring": "spirit",
"title": "I'm Not Ready",
"you": {
"id": "wl-g-notready-you",
"guide": "notready",
"side": "you",
"title": "I'm Not Ready",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I'm Not Ready",
"sub": "For You",
"say": "If you're not ready, for any of this, this is for you. That makes sense."
},
{
"k": "big",
"h": "Not ready makes sense.",
"say": "Not being ready makes sense. Readiness comes a little at a time for some people, and not at all for others. Both are allowed. Nobody needs you to accept this on a schedule.",
"sub": "Readiness comes a little at a time, or not at all. Both are allowed."
},
{
"k": "points",
"h": "Sort what feels unfinished",
"items": [
[
"Your affairs",
"Papers, plans, who speaks for you"
],
[
"Your people",
"What you want to say, and to whom"
],
[
"Your heart",
"What you want to make peace with"
]
],
"say": "It can help to sort what feels least ready. Your affairs, like papers, plans, and who speaks for you. Your people, what you want to say, and to whom. Or your heart, what you want to make peace with."
},
{
"k": "big",
"h": "Which part feels least ready?",
"say": "Take a moment. Which part feels least ready for you? Your affairs, your people, or your heart?",
"beats": [
"Take a moment.",
{
"t": "Which part feels least ready for you?",
"w": 12
},
"Your affairs, your people, or your heart?"
]
},
{
"k": "points",
"h": "One small step",
"items": [
[
"One small task today",
"A call, a form, a drawer"
],
[
"One message to one person",
"Short is fine"
],
[
"What Matters to Me",
"Right here in Willow"
]
],
"say": "Then take one small step. One small task today. One message to one person. Or fill in a little of What Matters to Me, right here in Willow. One step is enough for today."
},
{
"k": "big",
"h": "You are still fully you.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can be not ready, and still be loved, and still be fully you. Tell someone you trust how you feel. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-notready-helper",
"guide": "notready",
"side": "helper",
"title": "I'm Not Ready",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I'm Not Ready",
"sub": "For the Helper",
"say": "When someone you love says, I'm not ready, you may not know what to do with it. This is for you."
},
{
"k": "big",
"h": "Not ready makes sense.",
"say": "First, it makes sense. Readiness comes a little at a time, or not at all, and both are allowed. Pushing for acceptance tends to push people away. Patience keeps them close.",
"sub": "Patience keeps them close."
},
{
"k": "words",
"h": "Words that help",
"items": [
"That makes sense.",
"What part feels least ready?"
],
"say": "Here are words that help. That makes sense. What part feels least ready?"
},
{
"k": "points",
"h": "Then sort it together",
"items": [
[
"Affairs",
"Papers, plans, a health care agent"
],
[
"People",
"Who they want to talk to"
],
[
"Heart",
"What they want to make peace with"
]
],
"say": "Then sort it together. Affairs, like papers, plans, and a health care agent. People, who they want to talk to. Or the heart, what they want to make peace with."
},
{
"k": "big",
"h": "What could you help with this week?",
"say": "Take a moment. Think of one thing you could help with this week. A phone call, a form, a visit.",
"beats": [
"Take a moment.",
{
"t": "Think of one thing you could help with this week.",
"w": 10
},
"A phone call, a form, a visit."
]
},
{
"k": "big",
"h": "One small step at a time.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help with one small step at a time. Willow's What Matters to Me can help you both see what is left. The full guide has more."
}
]
}
},
{
"id": "estranged",
"ring": "spirit",
"title": "Estranged Family at the End",
"you": {
"id": "wl-g-estranged-you",
"guide": "estranged",
"side": "you",
"title": "Estranged Family at the End",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Estranged Family at the End",
"sub": "For You",
"say": "If there is a long silence between you and someone in your family, and suddenly time is short, this is for you. Whether you are the one who is dying, or the one who has been away."
},
{
"k": "big",
"h": "You decide.",
"say": "First, you decide what happens next. Not your siblings, not the clock, not anyone else. Pressure like this is your last chance usually makes it harder. Your own choice is the one that counts.",
"sub": "Your choice is the one that counts."
},
{
"k": "points",
"h": "Choices you have",
"items": [
[
"A letter",
"Say it on paper"
],
[
"A message",
"Short, recorded, or carried by someone"
],
[
"A visit",
"If both of you want it"
],
[
"Peace with it as it is",
"That counts too"
]
],
"say": "Here are choices you have. A letter. A message, short, recorded, or carried by someone you trust. A visit, if both of you want it. Or peace with it as it is. That counts too."
},
{
"k": "big",
"h": "What would you want them to know?",
"say": "Take a moment. If they could hear one sentence from you, what would it be? You don't have to send it. Just let yourself know it.",
"beats": [
"Take a moment.",
{
"t": "If they could hear one sentence from you, what would it be?",
"w": 12
},
"You don't have to send it.",
"Just let yourself know it."
]
},
{
"k": "big",
"h": "Peace can come without fixing everything.",
"say": "Sometimes a rift heals. Sometimes it stays, and people still find peace. Both are real. You are allowed to want what you want."
},
{
"k": "story",
"title": "Please Help My Dad Die",
"lines": [
"A man was struggling to let go. One of his sons could not bring himself to come.",
"I told him his children would be okay, and that his son loved him even from afar.",
"He died peacefully the next day. Love had reached him, even across the distance."
],
"lesson": "Love can reach across a distance, even one that never closed.",
"note": "From a Grounded story by Chris Joy",
"say": "I was called to the bedside of a man near the end whose son could not bring himself to come. I told the man that his children would be okay, and that his son loved him, even from afar. He died peacefully the next day. Love can reach across a distance, even one that never closed.",
"link": {
"href": "https://chri5j0y.substack.com/p/please-help-my-dad-die",
"label": "Read the Full Story: Please Help My Dad Die"
}
},
{
"k": "big",
"h": "Your wish is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "Tell the people helping you what you want. A chaplain or social worker can carry a message, gently. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-estranged-helper",
"guide": "estranged",
"side": "helper",
"title": "Estranged Family at the End",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Estranged Family at the End",
"sub": "For the Helper",
"say": "When someone you love has an old family rift and time is short, you may feel the pull to fix it. This is for anyone in the middle."
},
{
"k": "big",
"h": "Carry their wish, not the family's hope.",
"say": "Your job is to carry the person's own wish, not the family's hope. That can be hard when everyone around you wants a reunion."
},
{
"k": "words",
"h": "Words that leave room",
"items": [
"Would you like them to know? You decide.",
"You don't have to come. If you want to, you're welcome."
],
"say": "To the person who is dying, you might say, would you like them to know? You decide. And to the one who has been away, you don't have to come. If you want to, you're welcome."
},
{
"k": "points",
"h": "Ways it can go",
"items": [
[
"A letter",
"Said on paper"
],
[
"A message",
"Carried gently"
],
[
"A visit",
"If both want it"
],
[
"Peace with it unresolved",
"Also a real ending"
]
],
"say": "There are many ways it can go. A letter. A message, carried gently. A visit, if both want it. Or peace with it staying unresolved, which is also a real ending."
},
{
"k": "big",
"h": "Whose wish are you holding?",
"say": "Take a moment. Ask yourself honestly. Whose wish am I carrying right now? Theirs, mine, or the family’s?",
"beats": [
"Take a moment.",
"Ask yourself honestly.",
{
"t": "Whose wish am I carrying right now?",
"w": 10
},
"Theirs, mine, or the family’s?"
]
},
{
"k": "big",
"h": "You don't have to fix thirty years.",
"sub": "The full guide has more, whenever you want it.",
"say": "A rift that took thirty years to grow is not yours to fix. If someone asks you to make it happen, it's okay to say, I'll share their wish, and the rest is up to them. A chaplain or social worker can help. The full guide has more."
}
]
}
},
{
"id": "conflict",
"ring": "spirit",
"title": "Family Conflict at the Bedside",
"you": {
"id": "wl-g-conflict-you",
"guide": "conflict",
"side": "you",
"title": "Family Conflict at the Bedside",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Family Conflict at the Bedside",
"sub": "For You",
"say": "If your family is struggling to agree near the end of someone's life, this is for you. It happens in many loving families."
},
{
"k": "big",
"h": "Conflict often comes from love.",
"say": "Conflict at the bedside often comes from love, pulled in different directions. Each person is grieving, and each one wants to do right."
},
{
"k": "big",
"h": "Keep the room about what they want.",
"say": "One thing can bring a family back together. Keep the room about what your loved one wants. Not who is right. What they want.",
"sub": "Not who is right. What they want."
},
{
"k": "words",
"h": "Words that bring it back",
"items": [
"Everyone here loves her.",
"Let's keep this room about what she wants.",
"Let's read what she wrote in What Matters to Me."
],
"say": "Here are words that bring it back. Everyone here loves her. Let's keep this room about what she wants. Let's read what she wrote in What Matters to Me."
},
{
"k": "big",
"h": "What would they want for all of you?",
"say": "Take a breath. Picture your loved one hearing all of this. What would they want for all of you?",
"beats": [
"Take a breath.",
"Picture your loved one hearing all of this.",
{
"t": "What would they want for all of you?",
"w": 12
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A family meeting",
"With the social worker or chaplain"
],
[
"Their own words",
"A directive, What Matters to Me"
],
[
"Room for everyone",
"Visits can take turns"
]
],
"say": "Here is what helps. A family meeting, with the hospice social worker or chaplain. Your loved one's own words, in a health care directive or What Matters to Me. And room for everyone. Visits and goodbyes can take turns, one family at two o'clock, the grandkids at three."
},
{
"k": "story",
"title": "Listening Beneath the Words",
"lines": [
"In a family meeting, a daughter’s words said one thing while her eyes and her tightly folded arms said another.",
"Instead of rushing to fill the space, I slowed down, met her gaze, and asked softly: What is this moment asking of you right now?",
"The room shifted. Tears came. Real connection followed."
],
"lesson": "Slow down and listen beneath the words.",
"note": "From a Grounded reflection by Chris Joy",
"say": "I once walked into a family meeting where a daughter’s words said one thing, and her folded arms said another. Instead of rushing to fill the space, I slowed down and asked softly, what is this moment asking of you right now? The room shifted. Tears came. Real connection followed."
},
{
"k": "big",
"h": "Name the love first.",
"sub": "The full guide has more, whenever you want it.",
"say": "Name the love you share first, then the disagreement. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-conflict-helper",
"guide": "conflict",
"side": "helper",
"title": "Family Conflict at the Bedside",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Family Conflict at the Bedside",
"sub": "For the Helper",
"say": "When a family is in conflict at the bedside, and you are the one trying to help, this is for you."
},
{
"k": "big",
"h": "Name the shared love first.",
"say": "Start by naming what everyone shares. Everyone here loves him. It reminds the room why they came."
},
{
"k": "big",
"h": "Center the person's own words.",
"say": "Then bring the room back to the person's own words. What they said, what they wrote, what they asked for. Their wishes are the common ground.",
"sub": "Their wishes are the common ground."
},
{
"k": "words",
"h": "Words that calm a room",
"items": [
"Everyone here loves him.",
"What did he tell you he wanted?",
"Let's take ten minutes and come back."
],
"say": "Here are words that calm a room. Everyone here loves him. What did he tell you he wanted? Let's take ten minutes and come back."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A family meeting",
"With the social worker or chaplain"
],
[
"The health care agent",
"Who speaks for him, if he can't"
],
[
"Taking turns",
"Visits and goodbyes can stack"
]
],
"say": "Here is what helps. A family meeting, with the hospice social worker or chaplain. The health care agent, the person who speaks for him if he can't. And taking turns, so every visit and goodbye has its time."
},
{
"k": "big",
"h": "Stand at the foot of the bed.",
"say": "Take a moment. Notice whether you've taken a side. That's human. Now picture standing at the foot of the bed, beside everyone.",
"beats": [
"Take a moment.",
"Notice whether you've taken a side.",
"That's human.",
{
"t": "Now picture standing at the foot of the bed, beside everyone.",
"w": 10
}
]
},
{
"k": "big",
"h": "You don't have to solve it alone.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to solve it alone. Ask the hospice social worker or chaplain for a family meeting. The full guide has more."
}
]
}
},
{
"id": "parent",
"ring": "spirit",
"title": "I Wasn't a Good Parent",
"you": {
"id": "wl-g-parent-you",
"guide": "parent",
"side": "you",
"title": "I Wasn't a Good Parent",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wasn't a Good Parent",
"sub": "For You",
"say": "If you are looking back and thinking, I wasn't a good parent, this is for you."
},
{
"k": "big",
"h": "Guilt, or shame?",
"say": "There are two kinds of hard feelings here. Guilt says, I did something wrong. Shame says, I am something wrong. They feel alike, but they need different things.",
"sub": "I did, or I am."
},
{
"k": "points",
"h": "What each one needs",
"items": [
[
"Guilt moves toward repair",
"Something you can still say or do"
],
[
"Shame moves toward worth",
"Being seen as more than your worst"
]
],
"say": "Guilt moves toward repair, something you can still say or do. Shame moves toward worth, being seen as more than your worst moments."
},
{
"k": "big",
"h": "You are more than the worst thing you've done.",
"say": "If shame is what you feel, hear this. You are more than the worst thing you have done. The people who sit with you can see more than that, and so can the ones you raised, often more than they say."
},
{
"k": "story",
"title": "The Recovery",
"lines": [
"I broke a dying woman’s saucer. Antique china. She had just shown it to me, the one good thing in her hard day.",
"I dropped to my knees and said how sorry I was. Instead of anger, I got grace. Someone broke a special one on me once, she said. Didn’t even say sorry. At least you did.",
"That night I glued what I could, and found a nearly identical saucer. Not the mistake. The recovery."
],
"lesson": "What happens after a break matters most.",
"note": "From a Grounded story by Chris Joy",
"say": "Let me tell you about Gail, who keeps her whole life in a china cabinet. One day she showed me a new cup and saucer, and as I lifted it, the saucer let go and shattered. I dropped to my knees and told her how sorry I was. And instead of anger, she gave me grace. Someone broke a special one on me once, she said. Did not even say sorry. At least you did. That night I glued what I could, and found a nearly identical saucer to bring back. What stays, I have come to believe, is not the mistake. It is the recovery.",
"link": {
"href": "https://chri5j0y.substack.com/p/the-recovery",
"label": "Read the Full Story: The Recovery"
}
},
{
"k": "words",
"h": "Something you could still say",
"say": "Take a moment. Think of one of your children. Is there anything you would still like to say to them? Even one sentence.",
"beats": [
"Take a moment.",
"Think of one of your children.",
"Is there anything you would still like to say to them?",
{
"t": "Even one sentence.",
"w": 12
}
],
"items": [
"I'm sorry for...",
"I'm proud of you.",
"I see who you've become."
]
},
{
"k": "big",
"h": "It's not too late to say it.",
"sub": "The full guide has more, whenever you want it.",
"say": "A letter, a call, a recorded message. It is not too late to say it. A chaplain can help you find the words. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-parent-helper",
"guide": "parent",
"side": "helper",
"title": "I Wasn't a Good Parent",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wasn't a Good Parent",
"sub": "For the Helper",
"say": "When someone you love says, I wasn't a good parent, this is for you."
},
{
"k": "big",
"h": "Listen for I did, or I am.",
"say": "Listen closely. I did, is guilt. I am, is shame. They need different care.",
"sub": "Guilt and shame need different care."
},
{
"k": "words",
"h": "Words for each",
"items": [
"To guilt: Is there anything you'd still like to say to them?",
"To shame: You're more than the worst thing you've done. I see more than that."
],
"say": "To guilt, you might say, is there anything you'd still like to say to them? To shame, you're more than the worst thing you've done. I see more than that."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Repair, for guilt",
"A letter, a call, an apology"
],
[
"Worth, for shame",
"Someone who sees them, and says so"
],
[
"Their children's words",
"If their children are willing"
]
],
"say": "Guilt moves toward repair, a letter, a call, an apology. Shame moves toward worth, someone who sees them and says so. And if their children are willing, words from them can do what nothing else can."
},
{
"k": "big",
"h": "If you are their child",
"say": "If you are their child, take a moment. Is there anything you want them to hear before the end? You don't have to say it today. Just know it's there.",
"beats": [
"If you are their child, take a moment.",
{
"t": "Is there anything you want them to hear before the end?",
"w": 12
},
"You don't have to say it today.",
"Just know it's there."
]
},
{
"k": "big",
"h": "Help them be seen.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help them be seen as more than their mistakes. The full guide has more."
}
]
}
},
{
"id": "signs",
"ring": "last",
"title": "What Dying Looks Like",
"you": {
"id": "wl-g-signs-you",
"guide": "signs",
"side": "you",
"title": "What Dying Looks Like",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "What Dying Looks Like",
"sub": "For You",
"say": "If someone you love is near the end, and you want to know what to expect, this is for you. Knowing ahead of time can make it less frightening."
},
{
"k": "big",
"h": "The body slows down, a little at a time.",
"say": "Dying is usually gradual. The body slows down, a little at a time. Most of these changes bother us, watching, more than they bother the person.",
"sub": "Most changes bother us more than them."
},
{
"k": "flow",
"h": "What you may see",
"steps": [
[
"Weeks before",
"More sleep, less eating, a smaller world"
],
[
"Days before",
"Confusion or restlessness, cool hands and feet"
],
[
"Hours before",
"Breathing changes, a rattle, blotchy skin"
]
],
"say": "Weeks before, more sleep, less eating, and less talking. Their world gets smaller, and turning inward is normal. Days before, there may be confusion or restlessness, very little food or drink, and cool hands and feet. Hours before, breathing changes, with pauses, then a few quick breaths. There may be a rattling sound from the throat, and blotchy, purplish skin on the knees and feet."
},
{
"k": "big",
"h": "Pauses and rattling are common.",
"say": "The rattling sound comes from moisture the body can no longer clear. It is hard to hear, but it usually doesn't bother the person. Pauses in breathing can last a while, then breathing starts again. Both are common near the end.",
"sub": "Hard to hear. Usually not hard for them."
},
{
"k": "points",
"h": "What you can do",
"items": [
[
"Keep talking to them",
"They may hear you"
],
[
"Moisten their lips",
"A swab, or lip balm"
],
[
"Play their music",
"Softly"
],
[
"Call the nurse",
"For restlessness, grimacing, or distress"
]
],
"say": "Here is what you can do. Keep talking to them. They may hear you. Moisten their lips with a swab, or lip balm. Play their music, softly. And call the hospice nurse for restlessness, grimacing, or anything that looks like distress."
},
{
"k": "big",
"h": "Rest your hand on theirs.",
"say": "Take a moment now. If you are beside them, rest your hand on theirs. If you are not, picture it. Notice your own breathing.",
"beats": [
"Take a moment now.",
"If you are beside them, rest your hand on theirs.",
"If you are not, picture it.",
{
"t": "Notice your own breathing.",
"w": 10
}
]
},
{
"k": "big",
"h": "Nobody knows the minute.",
"sub": "The full guide has more, whenever you want it.",
"say": "Nobody knows the exact minute, not even the nurse. So say what you want to say now, and rest when you can. Call your hospice nurse any time, day or night. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-signs-helper",
"guide": "signs",
"side": "helper",
"title": "What Dying Looks Like",
"sideName": "For the Helper",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "What Dying Looks Like",
"sub": "For the Helper",
"say": "When a family is watching someone they love die, they will often look to you. This is for anyone supporting them."
},
{
"k": "big",
"h": "Explain the changes gently.",
"say": "Families are often frightened by what they see. A calm, simple explanation helps. These changes are the body slowing down. They usually bother us more than they bother her.",
"sub": "Calm, simple words help."
},
{
"k": "flow",
"h": "What the family may see",
"steps": [
[
"Weeks before",
"More sleep, less eating, turning inward"
],
[
"Days before",
"Restlessness, cool hands and feet"
],
[
"Hours before",
"Breathing pauses, a rattle, mottled skin"
]
],
"say": "It helps to know the usual path. Weeks before, more sleep, less eating, and turning inward. Days before, restlessness, very little food or drink, cool hands and feet. Hours before, breathing pauses, a rattling sound, and blotchy, purplish skin on the knees and feet."
},
{
"k": "points",
"h": "Help them help",
"items": [
[
"Keep talking to her",
"Hearing may last"
],
[
"Moisten her lips",
"Show them how"
],
[
"Play her music",
"Softly"
],
[
"Call the nurse for distress",
"Day or night"
]
],
"say": "Then give the family ways to help. Keep talking to her, since hearing may last. Show them how to moisten her lips. Play her music, softly. And call the nurse for anything that looks like distress, day or night."
},
{
"k": "big",
"h": "Leave the minute alone.",
"say": "Families often ask, how long? Nobody knows the minute. A guess like any minute now can turn into a long, exhausting vigil. Honest uncertainty is kinder.",
"sub": "Honest uncertainty is kinder."
},
{
"k": "story",
"title": "The Blanket That Didn't Need Smoothing",
"lines": [
"A husband sat beside his wife in her final hours, his chair so close his knee nearly touched the bed rail.",
"He told me about their life together. Then he reached over and adjusted her blanket. It had not slipped.",
"He kept holding her hand, like it was the only job left for him to do."
],
"lesson": "Sometimes love just needs somewhere to put its hands.",
"note": "Names and details changed",
"say": "A husband once sat beside his wife in her final hours, his chair so close his knee nearly touched the bed rail. He told me about their life, and then he reached over and adjusted her blanket. It had not slipped. Sometimes love just needs somewhere to put its hands."
},
{
"k": "big",
"h": "Look after the watchers.",
"say": "Take a moment. Look around the room, or picture it. Who hasn't eaten, or slept, or stepped outside? That's someone you can help next.",
"beats": [
"Take a moment.",
"Look around the room, or picture it.",
{
"t": "Who hasn't eaten, or slept, or stepped outside?",
"w": 10
},
"That's someone you can help next."
]
},
{
"k": "big",
"h": "Steady presence helps everyone.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your steady presence helps the whole room. Call the hospice nurse any time something looks like distress. The full guide has more."
}
]
}
},
{
"id": "starving",
"ring": "last",
"title": "Are They Starving?",
"you": {
"id": "wl-g-starving-you",
"guide": "starving",
"side": "you",
"title": "Are They Starving?",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Are They Starving?",
"sub": "For You",
"say": "If the person you love has stopped eating or drinking, and you are worried they are starving, this is for you."
},
{
"k": "big",
"h": "Not eating is part of dying.",
"say": "Here is the most important thing to know. Near the end, the body can no longer use food. Not eating is part of dying, not the cause of it. A dying person usually doesn't feel hunger or thirst the way we do.",
"sub": "Not the cause of it."
},
{
"k": "big",
"h": "Letting the body lead is a kindness.",
"say": "It is hard to watch. But forcing food or fluids can cause bloating, nausea, choking, and trouble breathing. Letting the body lead is a kindness.",
"sub": "Forcing food can cause real discomfort."
},
{
"k": "big",
"h": "Now love looks like ice chips and lip balm.",
"say": "You have fed them your whole life. Now love looks different. It looks like ice chips, lip balm, and a wet swab on dry lips."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Comfort feeding",
"By hand, only what they want"
],
[
"Mouth care",
"Swabs, lip balm, ice chips"
],
[
"Sitting together at the table",
"Even if they don't eat"
]
],
"say": "Here is what helps. Comfort feeding, by hand, only what they want. Mouth care, with swabs, lip balm, and ice chips. And sitting together at the table, even if they don't eat."
},
{
"k": "big",
"h": "Feel what you are missing.",
"say": "Food is love in almost every family. So when eating stops, it can feel like a loss of its own. Take a moment to notice what you miss. A favorite meal. A kitchen. A table.",
"beats": [
"Food is love in almost every family.",
"So when eating stops, it can feel like a loss of its own.",
{
"t": "Take a moment to notice what you miss.",
"w": 10
},
"A favorite meal. A kitchen. A table."
],
"sub": "It's okay to miss it."
},
{
"k": "big",
"h": "Love finds new ways.",
"sub": "The full guide has more, whenever you want it.",
"say": "Love finds new ways. If questions about a feeding tube or IV come up, talk with the hospice nurse. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-starving-helper",
"guide": "starving",
"side": "helper",
"title": "Are They Starving?",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Are They Starving?",
"sub": "For the Helper",
"say": "When a family is frightened that their loved one is starving, this is for anyone helping them through it."
},
{
"k": "big",
"h": "Explain it simply.",
"say": "Explain it simply. Near the end, the body can no longer use food. Not eating is part of dying, not the cause of it. A dying person usually doesn't feel hunger or thirst the way we do.",
"sub": "Not eating is part of dying, not the cause of it."
},
{
"k": "words",
"h": "Words that help",
"items": [
"You've fed her your whole life. Now love looks like ice chips and lip balm.",
"Her body can't use food anymore.",
"She isn't hungry the way we would be."
],
"say": "Here are words that help. You've fed her your whole life. Now love looks like ice chips and lip balm. Her body can't use food anymore. She isn't hungry the way we would be."
},
{
"k": "points",
"h": "Give their love somewhere to go",
"items": [
[
"Mouth care",
"Show them how to swab and moisten lips"
],
[
"Comfort feeding",
"Only what she wants"
],
[
"Meals together",
"At the table, or at the bedside"
]
],
"say": "Then give their love somewhere to go. Show them mouth care, how to swab and moisten her lips. Comfort feeding, only what she wants. And meals together, at the table or the bedside. Forcing food can cause bloating, nausea, and choking, so gentle comfort is the way."
},
{
"k": "big",
"h": "Honor the grief.",
"say": "Food is love in almost every culture. When eating stops, families often grieve something deep. Name it. It makes sense that this is hard."
},
{
"k": "big",
"h": "Who is feeding the family?",
"say": "Take a moment. Think of the family you are helping. Who is feeding everyone else? Maybe a meal for them is the next kind thing.",
"beats": [
"Take a moment.",
"Think of the family you are helping.",
{
"t": "Who is feeding everyone else?",
"w": 10
},
"Maybe a meal for them is the next kind thing."
]
},
{
"k": "big",
"h": "Gentle comfort is the way.",
"sub": "The full guide has more, whenever you want it.",
"say": "If a feeding tube or IV comes up, bring in the hospice nurse. The full guide has more."
}
]
}
},
{
"id": "hear",
"ring": "last",
"title": "Can They Hear Me?",
"you": {
"id": "wl-g-hear-you",
"guide": "hear",
"side": "you",
"title": "Can They Hear Me?",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Can They Hear Me?",
"sub": "For You",
"say": "If the person you love can no longer answer, and you wonder whether they can hear you, this is for you."
},
{
"k": "big",
"h": "Hearing may be one of the last senses to go.",
"say": "Hearing may be one of the last senses to go. In a hospice study, the brains of unresponsive patients still responded to sound in their last hours. We can't know how much they understand. But they may hear you.",
"sub": "They may hear you."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan had not spoken or opened her eyes in three days.",
"Then an old song came on, Drift Away. She knew every word. Under the sheet, her toes moved to the beat, and she smiled wider than I had ever seen a dying person smile.",
"She never woke again. She drifted away peacefully a short time later."
],
"lesson": "Music can reach a person when words cannot.",
"note": "From a Grounded story by Chris Joy",
"say": "Let me tell you about Suzan, who had not spoken in three days. Then an old song came on, Drift Away, and under the sheet, her toes began to move to the beat. She lifted her chin and smiled. She drifted away peacefully a short time later. Music can reach a person when words cannot.",
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
}
},
{
"k": "points",
"h": "Ways to reach them",
"items": [
[
"Talk to them, not about them",
"Even when others are in the room"
],
[
"Tell them who is here",
"Names and voices"
],
[
"Hold a phone to their ear",
"For family far away"
],
[
"A favorite voice",
"Reading their favorite words"
]
],
"say": "Here are ways to reach them. Talk to them, not about them, even when others are in the room. Tell them who is here. Hold a phone to their ear for family far away. And let a favorite voice read their favorite words."
},
{
"k": "words",
"h": "Try a sentence now",
"say": "Try it now, out loud if you are with them, or quietly if you are not. It's me. I'm here. Thank you for something only you know. I love you.",
"beats": [
"Try it now, out loud if you are with them, or quietly if you are not.",
"It's me. I'm here.",
"Thank you for something only you know.",
{
"t": "I love you.",
"w": 12
}
],
"items": [
"It's me. I'm here.",
"Thank you for...",
"I love you."
]
},
{
"k": "big",
"h": "Keep talking.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep talking. Say what you want to say. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-hear-helper",
"guide": "hear",
"side": "helper",
"title": "Can They Hear Me?",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Can They Hear Me?",
"sub": "For the Helper",
"say": "When a family asks, can they hear me, this is for anyone helping them answer."
},
{
"k": "big",
"h": "Hearing may be one of the last senses to go.",
"say": "Here is what we know. Hearing may be one of the last senses to go. In a hospice study, unresponsive patients' brains still responded to sound in their last hours. We can't know how much they understand.",
"sub": "We can’t know how much they understand."
},
{
"k": "words",
"h": "Words that help",
"items": [
"Keep talking to her.",
"Tell her who's here.",
"Say what you want to say."
],
"say": "Here are words that help. Keep talking to her. Tell her who's here. Say what you want to say."
},
{
"k": "points",
"h": "Help them do it",
"items": [
[
"Talk to, not about",
"Even with the nurse in the room"
],
[
"A phone to the ear",
"For family who can't come"
],
[
"A favorite voice",
"Reading favorite words"
],
[
"Music",
"Softly"
]
],
"say": "Gently remind everyone to speak to the person, not about them, even with the nurse in the room. Hold a phone to their ear for family who can't come. Invite a favorite voice to read favorite words. And play their music, softly."
},
{
"k": "big",
"h": "Practice it once.",
"say": "Take a moment and practice. Say their name, and then, it's me, I'm here. Families often follow your lead.",
"beats": [
"Take a moment and practice.",
{
"t": "Say their name, and then, it's me, I'm here.",
"w": 8
},
"Families often follow your lead."
]
},
{
"k": "big",
"h": "Your example gives permission.",
"sub": "The full guide has more, whenever you want it.",
"say": "When a family sees you talk to their loved one, it gives them permission to do it too. The full guide has more."
}
]
}
},
{
"id": "visions",
"ring": "last",
"title": "Seeing People Who've Died",
"you": {
"id": "wl-g-visions-you",
"guide": "visions",
"side": "you",
"title": "Seeing People Who've Died",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Seeing People Who've Died",
"sub": "For You",
"say": "If the person you love is talking to someone you can't see, maybe a mother or a husband who has died, this is for you."
},
{
"k": "big",
"h": "Visions near the end are common.",
"say": "Dreams and visions near the end are common, especially of loved ones who have died. They usually bring comfort, and they come more often as death gets closer. They are different from confusion.",
"sub": "They usually bring comfort."
},
{
"k": "story",
"title": "Welcome Home",
"lines": [
"A daughter texted me early one morning: Dad is seeing ghosts. What does this mean?",
"When I arrived, her father turned toward something we could not see and raised both arms. Very quietly, he said, I love you. I love you. I love you.",
"That evening, he died peacefully, just as we had seen him: arms open."
],
"lesson": "Visions near the end usually bring comfort. Ask who is there.",
"note": "From a Grounded story by Chris Joy",
"say": "A daughter texted me early one morning: Dad is seeing ghosts. When I arrived, her father turned toward something we could not see, raised both arms, and quietly said, I love you, I love you, I love you. That evening he died peacefully, arms open.",
"link": {
"href": "https://chri5j0y.substack.com/p/welcome-home",
"label": "Read the Full Story: Welcome Home"
}
},
{
"k": "words",
"h": "Ask, and go gently.",
"items": [
"Who's here?",
"What are they saying?",
"Are they kind to you?"
],
"say": "Ask, rather than correct. Who's here? What are they saying? Are they kind to you?"
},
{
"k": "big",
"h": "What would you ask?",
"say": "Take a moment. Picture them reaching toward someone you can't see. What would you want to ask them?",
"beats": [
"Take a moment.",
"Picture them reaching toward someone you can't see.",
{
"t": "What would you want to ask them?",
"w": 10
}
]
},
{
"k": "big",
"h": "It may mean death is getting closer.",
"say": "Visions often mean death is getting closer. If you notice them, it may be a good time to call family, and to say what you want to say."
},
{
"k": "big",
"h": "Tell your hospice nurse.",
"sub": "The full guide has more, whenever you want it.",
"say": "Tell your hospice nurse what you are seeing, so the team knows. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-visions-helper",
"guide": "visions",
"side": "helper",
"title": "Seeing People Who've Died",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Seeing People Who've Died",
"sub": "For the Helper",
"say": "When a family tells you their loved one is seeing people who have died, this is for anyone helping them."
},
{
"k": "big",
"h": "Common, comforting, and different from confusion.",
"say": "Dreams and visions near the end are common, especially of loved ones who have died. They usually bring comfort, and they come more often as death gets closer. They are different from confusion."
},
{
"k": "words",
"h": "Help the family ask",
"items": [
"Who's here?",
"What are they saying?"
],
"say": "Encourage the family to ask, not correct. Who's here? What are they saying? Telling them there's no one there can take away a real comfort."
},
{
"k": "big",
"h": "Share what it may mean, gently.",
"say": "Visions often mean death is getting closer. If you need to say that, say it gently, and in person if you can. We might be getting close. Can I come by?",
"sub": "In person, if you can."
},
{
"k": "big",
"h": "Practice the gentle sentence.",
"say": "Try it now, quietly. We might be getting close. Can I come by? Say it slowly, so it's ready when you need it.",
"beats": [
"Try it now, quietly.",
"We might be getting close.",
"Can I come by?",
{
"t": "Say it slowly, so it's ready when you need it.",
"w": 8
}
]
},
{
"k": "big",
"h": "Let the comfort stay.",
"sub": "The full guide has more, whenever you want it.",
"say": "Let the comfort stay, and walk with the family toward what's coming. The full guide has more."
}
]
}
},
{
"id": "hanging",
"ring": "last",
"title": "Why Are They Hanging On?",
"you": {
"id": "wl-g-hanging-you",
"guide": "hanging",
"side": "you",
"title": "Why Are They Hanging On?",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Why Are They Hanging On?",
"sub": "For You",
"say": "If the person you love seems to be holding on, and you are tired, and you wonder why, this is for you."
},
{
"k": "big",
"h": "Some people seem to wait.",
"say": "Bedside workers often see it. Some people seem to wait. For a visitor, a date, or permission. No one can prove why, but it happens often enough to notice.",
"sub": "For a visitor, a date, or permission."
},
{
"k": "big",
"h": "Is anyone missing? Anything unsaid?",
"say": "Take a moment. Is there anyone they might be waiting for? Anything left unsaid?",
"beats": [
"Take a moment.",
"Is there anyone they might be waiting for?",
{
"t": "Anything left unsaid?",
"w": 12
}
]
},
{
"k": "words",
"h": "The Four Things",
"items": [
"Please forgive me.",
"I forgive you.",
"Thank you.",
"I love you."
],
"say": "Many families say the Four Things. Please forgive me. I forgive you. Thank you. I love you. Say the ones that are true for you."
},
{
"k": "story",
"title": "Please Help My Dad Die",
"lines": [
"A man was struggling to let go. His son could not bring himself to come.",
"I told him his children would be okay, that his son loved him even from afar, and that he was free to go.",
"His arm lifted, as if reaching for something. His daughter cried, Dad, I am here. You can go. He died peacefully the next day, with her at his side."
],
"lesson": "Telling someone, once, that they can go when they are ready can be a gift.",
"note": "From a Grounded story by Chris Joy",
"say": "Let me tell you about a man who seemed to be holding on, while one of his sons could not bring himself to come. I told him his children would be okay, that his son loved him even from afar, and that he was free to go. His arm lifted, as if reaching for something, and his daughter said, Dad, I am here, you can go. He died peacefully the next day, with her at his side.",
"link": {
"href": "https://chri5j0y.substack.com/p/please-help-my-dad-die",
"label": "Read the Full Story: Please Help My Dad Die"
}
},
{
"k": "big",
"h": "You can tell them, once, that they can go.",
"say": "If it feels right, you can tell them, once, that they can go when they're ready. That you will be okay. That you will take care of each other. Then let the room be quiet."
},
{
"k": "big",
"h": "Rest when you can.",
"sub": "The full guide has more, whenever you want it.",
"say": "Waiting is exhausting. Rest when you can, and let others sit for a while. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-hanging-helper",
"guide": "hanging",
"side": "helper",
"title": "Why Are They Hanging On?",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Why Are They Hanging On?",
"sub": "For the Helper",
"say": "When a family asks, why are they hanging on, this is for anyone helping them."
},
{
"k": "big",
"h": "Some people seem to wait.",
"say": "Bedside workers often see it. Some people seem to wait. For a visitor, a date, or permission. No one can prove why."
},
{
"k": "words",
"h": "Questions that help",
"items": [
"Is there anyone they might be waiting for?",
"Anything left unsaid?"
],
"say": "Two questions can help the family. Is there anyone they might be waiting for? Anything left unsaid?"
},
{
"k": "points",
"h": "What helps",
"items": [
[
"The Four Things",
"Please forgive me, I forgive you, thank you, I love you"
],
[
"Permission, once",
"You can go when you're ready"
],
[
"A quiet room",
"Fewer voices, softer light"
]
],
"say": "Here is what helps. The Four Things. Please forgive me. I forgive you. Thank you. I love you. Permission, said once. You can go when you're ready. And a quiet room, with fewer voices and softer light."
},
{
"k": "big",
"h": "Look after the ones waiting.",
"say": "Take a moment. Think of who has been sitting the longest. Could you take a shift, so they can sleep?",
"beats": [
"Take a moment.",
"Think of who has been sitting the longest.",
{
"t": "Could you take a shift, so they can sleep?",
"w": 10
}
]
},
{
"k": "big",
"h": "Help the waiting be gentle.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help the waiting be gentle, for everyone. The full guide has more."
}
]
}
},
{
"id": "rally",
"ring": "last",
"title": "The Rally",
"you": {
"id": "wl-g-rally-you",
"guide": "rally",
"side": "you",
"title": "The Rally",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "The Rally",
"sub": "For You",
"say": "If the person you love suddenly woke up, talked, ate, and knew everyone, after days of being unresponsive, this is for you."
},
{
"k": "big",
"h": "It's real, and it's often brief.",
"say": "This is sometimes called a rally. It's real, and it is often brief. It may last minutes, hours, or a day or two.",
"sub": "Minutes, hours, or a day or two."
},
{
"k": "big",
"h": "This is a gift.",
"say": "This is a gift. Use it to say what you want to say. Call the people who would want to be here.",
"sub": "Use it to say what you want to say."
},
{
"k": "words",
"h": "If you had ten minutes",
"say": "Take a moment. If they woke for ten minutes, what would you want to say? Hold onto it.",
"beats": [
"Take a moment.",
{
"t": "If they woke for ten minutes, what would you want to say?",
"w": 12
},
"Hold onto it."
],
"items": [
"I love you.",
"Thank you for...",
"Tell me about..."
]
},
{
"k": "big",
"h": "Talk with the nurse before reading it as recovery.",
"say": "Before reading it as recovery, talk with your hospice nurse. A rally is often a gift along the way, rather than a turn back. You can enjoy it fully, and prepare at the same time."
},
{
"k": "big",
"h": "Enjoy it fully.",
"sub": "The full guide has more, whenever you want it.",
"say": "Enjoy every minute of it. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-rally-helper",
"guide": "rally",
"side": "helper",
"title": "The Rally",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "The Rally",
"sub": "For the Helper",
"say": "When someone suddenly rallies near the end, the family may hope they are getting better. This is for anyone helping them."
},
{
"k": "big",
"h": "It's real, and it's often brief.",
"say": "A rally is real, and it is often brief. Someone who has been unresponsive may wake, talk, eat, and recognize everyone."
},
{
"k": "words",
"h": "Words that help",
"items": [
"This is a gift.",
"Use it to say what you want to say."
],
"say": "Here are words that help. This is a gift. Use it to say what you want to say."
},
{
"k": "big",
"h": "Gently prepare the family.",
"say": "Gently help the family understand it may not last. Encourage them to talk with the nurse before reading it as recovery.",
"sub": "Joy and preparation, together."
},
{
"k": "points",
"h": "Help them use it",
"items": [
[
"Call family who want to come",
"Right away"
],
[
"A photo or recording",
"If the family wants one"
],
[
"The important words",
"Said today"
]
],
"say": "Help them use the time. Call family who want to come, right away. Take a photo or a recording, if the family wants one. And help them say the important words today."
},
{
"k": "big",
"h": "Who would you call first?",
"say": "Take a moment. If a rally happened today, who would you call first? Have that number ready.",
"beats": [
"Take a moment.",
{
"t": "If a rally happened today, who would you call first?",
"w": 10
},
"Have that number ready."
]
},
{
"k": "big",
"h": "Help them treasure it.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help them treasure it. The full guide has more."
}
]
}
},
{
"id": "kids",
"ring": "last",
"title": "Talking with Children",
"you": {
"id": "wl-g-kids-you",
"guide": "kids",
"side": "you",
"title": "Talking with Children",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Talking with Children",
"sub": "For You",
"say": "If you need to tell children that someone they love is dying, this is for you."
},
{
"k": "big",
"h": "Use real words.",
"say": "Children take words literally. Use the word dying, and later, died. Gentle words like sleeping or lost can confuse or frighten them. Real words, said kindly, are easier for children to understand.",
"sub": "Children take words literally."
},
{
"k": "words",
"h": "Words you can use",
"items": [
"Grandma is dying.",
"Her body is very sick, and it's stopping working.",
"Nothing you did caused this.",
"You can ask me anything."
],
"say": "Here are words you can use. Grandma is dying. Her body is very sick, and it's stopping working. Nothing you did caused this. You can ask me anything."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Short, honest answers",
"Repeated as often as they ask"
],
[
"Ways to help",
"Drawing, choosing music, telling a story"
],
[
"A choice about visiting",
"Let them decide"
]
],
"say": "Here is what helps. Short, honest answers, repeated as often as they ask. Ways to help, like drawing, choosing music, or telling a story. And a choice about visiting. Let them decide."
},
{
"k": "big",
"h": "Practice the first sentence.",
"say": "Take a moment. Say the first sentence you'll use, out loud or quietly. Grandma is dying. Her body is stopping working. Hearing yourself say it once makes it easier.",
"beats": [
"Take a moment.",
"Say the first sentence you'll use, out loud or quietly.",
{
"t": "Grandma is dying. Her body is stopping working.",
"w": 8
},
"Hearing yourself say it once makes it easier."
]
},
{
"k": "big",
"h": "There are guides for kids too.",
"sub": "The full guide has more, whenever you want it.",
"say": "Maple and Aspen have guides written for kids and middle schoolers, and the Dougy Center has helpful tip sheets. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-kids-helper",
"guide": "kids",
"side": "helper",
"title": "Talking with Children",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Talking with Children",
"sub": "For the Helper",
"say": "When a parent or grandparent has to tell children that someone is dying, this is for anyone helping them."
},
{
"k": "big",
"h": "Real words help children most.",
"say": "Children take words literally. The word dying, and later died, is clearer than sleeping or lost. You can help the grown-ups find those words.",
"sub": "Clear and kind."
},
{
"k": "words",
"h": "Words for the grown-up",
"items": [
"You don't have to have all the answers.",
"Short and honest is enough.",
"You can say, I don't know."
],
"say": "Here are words for the grown-up. You don't have to have all the answers. Short and honest is enough. You can say, I don't know."
},
{
"k": "points",
"h": "Ways you can help",
"items": [
[
"Be there for the talk",
"If they want you there"
],
[
"Give kids a job",
"Drawing, music, a story"
],
[
"Expect questions again",
"Kids ask many times"
]
],
"say": "Here are ways you can help. Be there for the talk, if they want you there. Give the kids a job, like drawing, choosing music, or telling a story. And expect the same questions again and again. That is how kids understand."
},
{
"k": "big",
"h": "Think of one child.",
"say": "Take a moment. Think of one child in this family. What could they do to help that would feel good to them?",
"beats": [
"Take a moment.",
"Think of one child in this family.",
{
"t": "What could they do to help that would feel good to them?",
"w": 10
}
]
},
{
"k": "big",
"h": "Help the kids belong.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help the kids belong in this, too. Maple and Aspen have guides for kids, and the Dougy Center has tip sheets. The full guide has more."
}
]
}
},
{
"id": "notthere",
"ring": "last",
"title": "I Wasn't There",
"you": {
"id": "wl-g-notthere-you",
"guide": "notthere",
"side": "you",
"title": "I Wasn't There",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wasn't There",
"sub": "For You",
"say": "If you weren't there when the person you love died, and the guilt won't leave you, this is for you."
},
{
"k": "big",
"h": "You were there for so much of it.",
"say": "Guilt like this often lands hardest on the person who was there the most. You were there for so much of it. That is what they knew.",
"sub": "That's what they knew."
},
{
"k": "big",
"h": "Some people seem to wait until loved ones step out.",
"say": "Bedside workers see it often. Some people seem to wait until the people they love step out of the room. It may be easier for them to go that way. Many families find comfort in knowing it."
},
{
"k": "points",
"h": "Your own goodbye, now",
"items": [
[
"A letter",
"To them, today"
],
[
"A ritual of your own",
"A candle, a walk, a song"
],
[
"Time with them",
"If their body is still there"
]
],
"say": "You can still have your own goodbye, now. A letter, to them, today. A ritual of your own, like a candle, a walk, or a song. Or time with them, if their body is still there."
},
{
"k": "words",
"h": "Say your goodbye now.",
"say": "Take a moment. Say your goodbye now, out loud or in your heart. I was with you so many days. I love you.",
"beats": [
"Take a moment.",
"Say your goodbye now, out loud or in your heart.",
{
"t": "I was with you so many days. I love you.",
"w": 12
}
],
"items": [
"I was with you so many days.",
"Thank you.",
"I love you."
]
},
{
"k": "big",
"h": "Be gentle with yourself.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be gentle with yourself. Hospice bereavement support is there for you for about a year. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-notthere-helper",
"guide": "notthere",
"side": "helper",
"title": "I Wasn't There",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "I Wasn't There",
"sub": "For the Helper",
"say": "When someone tells you, I wasn't there when they died, this is for anyone comforting them."
},
{
"k": "big",
"h": "Guilt lands hardest on those who were there most.",
"say": "This guilt often lands hardest on the person who was there the most. It can feel like they failed at the one moment that mattered."
},
{
"k": "words",
"h": "Words that help",
"items": [
"You were there for so much of it. That's what they knew.",
"Some people seem to wait until loved ones step out."
],
"say": "Here are words that help. You were there for so much of it. That's what they knew. And, some people seem to wait until loved ones step out. Bedside workers see it often."
},
{
"k": "big",
"h": "Name everything they did.",
"say": "Steer toward everything they did. The meals, the nights, the hand they held. Even a gentle hint of you should have stayed lands hard. Specific memories of their love land gently.",
"sub": "Specific memories land gently."
},
{
"k": "big",
"h": "Remember one specific thing.",
"say": "Take a moment. Think of one specific thing you saw them do for the person who died. Tell them about it next time you talk.",
"beats": [
"Take a moment.",
{
"t": "Think of one specific thing you saw them do for the person who died.",
"w": 10
},
"Tell them about it next time you talk."
]
},
{
"k": "big",
"h": "Help them say goodbye their own way.",
"sub": "The full guide has more, whenever you want it.",
"say": "Help them find their own goodbye, a letter, a ritual, a quiet moment. The full guide has more."
}
]
}
},
{
"id": "firsthour",
"ring": "last",
"title": "The First Hour After Death",
"you": {
"id": "wl-g-firsthour-you",
"guide": "firsthour",
"side": "you",
"title": "The First Hour After Death",
"sideName": "For You",
"mins": 4,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "The First Hour After Death",
"sub": "For You",
"say": "If the person you love has just died, or you want to know what that hour will be like, this is for you."
},
{
"k": "big",
"h": "Take your time.",
"say": "Take your time. Nothing has to happen right away. You can take all the time you need.",
"sub": "Nothing has to happen right away."
},
{
"k": "breathe",
"h": "One breath before anything else",
"sub": "In for four. Out for six.",
"say": "Before anything else, take one slow breath. In for four. And out for six.",
"hold": 18
},
{
"k": "points",
"h": "What to do",
"items": [
[
"Call the hospice",
"Not 911"
],
[
"Sit with them",
"Hold their hand. Say goodbye."
],
[
"Let the kids come in",
"If they want to"
],
[
"What matters to your family",
"There is time for it"
]
],
"say": "Here is what to do. Call your hospice, not 911. Sit with them. Hold their hand, and say goodbye. Let the kids come in, if they want to. And do whatever matters to your family in this hour. There is time for it."
},
{
"k": "big",
"h": "Take all the time you need.",
"say": "Take a moment now, or when the time comes. Sit with them. Hold their hand. Say whatever you want to say.",
"beats": [
"Take a moment now, or when the time comes.",
"Sit with them.",
"Hold their hand.",
{
"t": "Say whatever you want to say.",
"w": 15
}
]
},
{
"k": "big",
"h": "The nurse comes to help.",
"say": "The hospice nurse comes to confirm the death, and to help with the next steps, including calling the funeral home. You don't have to know how to do any of it.",
"sub": "You don't have to know how."
},
{
"k": "big",
"h": "Take all the time you need.",
"sub": "The full guide has more, whenever you want it.",
"say": "Take all the time you need. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-firsthour-helper",
"guide": "firsthour",
"side": "helper",
"title": "The First Hour After Death",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "The First Hour After Death",
"sub": "For the Helper",
"say": "When someone has just died, and you are with the family, this is for you."
},
{
"k": "big",
"h": "Take your time.",
"say": "Help the family know they can take their time. Nothing has to happen right away. The hour is theirs."
},
{
"k": "words",
"h": "Words for the hour",
"items": [
"Take all the time you need.",
"Take your time.",
"Would you like to sit with her?"
],
"say": "Here are words for the hour. Take all the time you need. Take your time. Would you like to sit with her?"
},
{
"k": "points",
"h": "How you can help",
"items": [
[
"Make the call",
"To the hospice, not 911"
],
[
"Ask what matters to them",
"Anything their family does now"
],
[
"Welcome the kids",
"If they want to come in"
],
[
"Keep the room calm",
"Fewer phones, softer voices"
]
],
"say": "Here is how you can help. Make the call, to the hospice, not 911. Ask what matters to the family in this hour. Welcome the kids, if they want to come in. And keep the room calm, with fewer phones and softer voices."
},
{
"k": "big",
"h": "Picture the room.",
"say": "Take a moment. Picture the room. Who will need a glass of water, a chair, or a hug?",
"beats": [
"Take a moment.",
"Picture the room.",
{
"t": "Who will need a glass of water, a chair, or a hug?",
"w": 10
}
]
},
{
"k": "big",
"h": "Hold the hour gently.",
"sub": "The full guide has more, whenever you want it.",
"say": "The hospice nurse will come to confirm the death and help with the next steps. Until then, hold the hour gently. The full guide has more."
}
]
}
},
{
"id": "official",
"ring": "last",
"title": "Making It Official in Minnesota",
"you": {
"id": "wl-g-official-you",
"guide": "official",
"side": "you",
"title": "Making It Official in Minnesota",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Making It Official in Minnesota",
"sub": "For You",
"say": "If you want to put your wishes in writing, or help someone you love do it, this is for you."
},
{
"k": "big",
"h": "Writing it down is a gift to your family.",
"say": "Writing your wishes down is a gift to your family. They won't have to guess.",
"sub": "They won't have to guess."
},
{
"k": "points",
"h": "Three things to know",
"items": [
[
"Health care directive",
"Your wishes, in writing"
],
[
"Health care agent",
"Who speaks for you if you can't"
],
[
"POLST",
"A medical order, signed with your doctor"
]
],
"say": "Here are three things to know. A health care directive puts your wishes in writing. Free forms come from Honoring Choices Minnesota, in eight languages, with help available in St. Cloud. A health care agent is the person who speaks for you if you can't. And a POLST is a medical order about treatments in an emergency, signed with your doctor."
},
{
"k": "big",
"h": "Choose an agent who will honor your wishes.",
"say": "Choose someone who will honor your wishes, not their own. That may not be the person closest to you. It is the person who will speak for you clearly."
},
{
"k": "big",
"h": "Who could speak for you?",
"say": "Take a moment. Who could speak for you, if you couldn't? Picture them saying your wishes out loud.",
"beats": [
"Take a moment.",
"Who could speak for you, if you couldn't?",
{
"t": "Picture them saying your wishes out loud.",
"w": 12
}
]
},
{
"k": "points",
"h": "Tools to start the talk",
"items": [
[
"The Conversation Project",
"Free starter guides"
],
[
"Go Wish",
"A card game about what matters"
],
[
"What Matters to Me",
"Right here in Willow"
]
],
"say": "Some tools make it easier to start. The Conversation Project has free guides. Go Wish is a card game about what matters most. And What Matters to Me is right here in Willow."
},
{
"k": "big",
"h": "One page is a good start.",
"sub": "The full guide has more, whenever you want it.",
"say": "One page is a good start. Your hospice social worker can help with any of this. The full guide has more."
}
]
},
"helper": {
"id": "wl-g-official-helper",
"guide": "official",
"side": "helper",
"title": "Making It Official in Minnesota",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Making It Official in Minnesota",
"sub": "For the Helper",
"say": "When you are helping someone put their wishes in writing, this is for you."
},
{
"k": "big",
"h": "Their wishes, in their words.",
"say": "Your part is to help their wishes land on paper in their own words. Writing it down is a gift to the whole family. No one will have to guess."
},
{
"k": "points",
"h": "Three things to know",
"items": [
[
"Health care directive",
"Free from Honoring Choices Minnesota"
],
[
"Health care agent",
"Who speaks for them if they can't"
],
[
"POLST",
"A medical order, signed with their doctor"
]
],
"say": "Here are three things to know. A health care directive, with free forms from Honoring Choices Minnesota, in eight languages. A health care agent, the person who speaks for them if they can't. And a POLST, a medical order about emergency treatments, signed with their doctor."
},
{
"k": "big",
"h": "Help them choose freely.",
"say": "Help them choose an agent who will honor their wishes, even if that isn't you. Keep your own hopes out of their pen.",
"sub": "Even if the agent isn’t you."
},
{
"k": "big",
"h": "Where are the papers?",
"say": "Take a moment. Do you know where their papers are? If not, make a note to ask.",
"beats": [
"Take a moment.",
{
"t": "Do you know where their papers are?",
"w": 10
},
"If not, make a note to ask."
]
},
{
"k": "big",
"h": "The social worker can help.",
"sub": "The full guide has more, whenever you want it.",
"say": "The hospice social worker can help with every step. The full guide has more."
}
]
}
},
{
"id": "relief",
"ring": "last",
"title": "Is It Okay That I Feel Relieved?",
"you": {
"id": "wl-g-relief-you",
"guide": "relief",
"side": "you",
"title": "Is It Okay That I Feel Relieved?",
"sideName": "For You",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Is It Okay That I Feel Relieved?",
"sub": "For You",
"say": "If the person you love has died, and part of what you feel is relief, this is for you."
},
{
"k": "big",
"h": "Yes.",
"say": "Yes. Relief and grief can live in the same heart. Relief usually means the suffering is over, for both of you. It doesn't mean you loved them any less.",
"sub": "Relief and grief can live in the same heart."
},
{
"k": "story",
"title": "Grief Debt",
"lines": [
"One week I caught myself walking around numb. Not sad, not angry. Just numb.",
"A few losses had stacked up quietly, and I kept telling myself I would feel them later.",
"Grief we put off piles up, like laundry we swear we will fold."
],
"lesson": "Pay grief down a little at a time.",
"note": "From a Grounded story by Chris Joy",
"say": "One week I caught myself walking around numb. Not sad, not angry, just numb. A few losses had stacked up quietly while I kept telling myself I would feel them later. I call it grief debt. It piles up, like laundry we swear we will fold. The kindness is paying it down a little at a time, and every feeling counts, relief included.",
"link": {
"href": "https://chri5j0y.substack.com/p/grief-debt",
"label": "Read the Full Story: Grief Debt"
}
},
{
"k": "big",
"h": "Name it.",
"say": "Take a moment. Say it, quietly or out loud. I'm relieved, and I miss them. Both are true.",
"beats": [
"Take a moment.",
"Say it, quietly or out loud.",
"I'm relieved, and I miss them.",
{
"t": "Both are true.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Naming it out loud",
"To someone you trust"
],
[
"Hospice bereavement support",
"For about a year after the death"
],
[
"Rest",
"Your body carried a lot"
]
],
"say": "Here is what helps. Naming it out loud, to someone you trust. Hospice bereavement support, which runs for about a year after the death. And rest. Your body carried a lot."
},
{
"k": "big",
"h": "Both are true.",
"sub": "The full guide has more, whenever you want it.",
"say": "Relief and love, both true, both yours. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "wl-g-relief-helper",
"guide": "relief",
"side": "helper",
"title": "Is It Okay That I Feel Relieved?",
"sideName": "For the Helper",
"mins": 3,
"scenes": [
{
"k": "title",
"hero": "willow",
"eyebrow": "When Life Changes",
"h": "Is It Okay That I Feel Relieved?",
"sub": "For the Helper",
"say": "When someone tells you they feel relieved after a death, this is for you."
},
{
"k": "words",
"h": "Words that help",
"items": [
"Yes. Relief and grief can live in the same heart.",
"Relief usually means the suffering is over, for both of you."
],
"say": "Here are words that help. Yes. Relief and grief can live in the same heart. Relief usually means the suffering is over, for both of you."
},
{
"k": "big",
"h": "Relief often comes with guilt.",
"say": "Many people feel guilty about relief. Saying it out loud, and hearing yes, can lift a real weight.",
"sub": "Hearing yes can lift a weight."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Listening without flinching",
"Let them say all of it"
],
[
"Hospice bereavement support",
"For about a year"
],
[
"Checking in later",
"Weeks and months after"
]
],
"say": "Here is what helps. Listening without flinching. Let them say all of it. Hospice bereavement support, for about a year. And checking in later, weeks and months after, when others have moved on."
},
{
"k": "big",
"h": "Grief may arrive later.",
"say": "Relief often comes first, and grief can arrive later, sometimes weeks or months after. Let them know that is normal too. Both can come and go for a long time, and you'll still be around.",
"sub": "Both can come and go."
},
{
"k": "big",
"h": "When will you check in?",
"say": "Take a moment. Think of the person you are supporting. When could you check on them next? Put it on your calendar.",
"beats": [
"Take a moment.",
"Think of the person you are supporting.",
"When could you check on them next?",
{
"t": "Put it on your calendar.",
"w": 8
}
]
},
{
"k": "big",
"h": "Keep showing up.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep showing up, long after the funeral. The full guide has more."
}
]
}
}
]
};
})();
