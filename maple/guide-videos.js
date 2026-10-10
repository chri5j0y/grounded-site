/* =====================================================================
   MAPLE . When Life Changes videos (GWG BLD 727 and 731, October 2026)
   Two narrated videos for each Maple guide: For You (the child, grades K to 5) and For the Grown-up
   (the parent or helper beside them). Played by shared/gg-learn.js, which loads this file the first time
   Maple's Learn opens. Inside Me, Close to Home: Loss, and Safety (BLD 727); the other six groups (BLD 731); Health and Ability (BLD 757): all 68 guides, 136 videos.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld731/source (bld727 source for its groups) in grounded-workshop:
   edit the data there and rebuild. Proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.maple = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, for the child going through it. For the Grown-up, for the parent or helper beside them. Watch at your own pace, and a quiet check marks the ones you have watched.",
"rings": [
[
"mp-inside",
"Inside Me"
],
[
"mp-loss",
"Close to Home: Loss"
],
[
"mp-health",
"Close to Home: Health"
],
[
"mp-family",
"Close to Home: Family Changes"
],
[
"mp-school",
"At School"
],
[
"mp-community",
"In Our Community"
],
[
"mp-country",
"In Our Country"
],
[
"mp-world",
"In the World"
],
[
"mp-safety",
"Safety"
],
[
"mp-life",
"Health and Ability"
]
],
"guides": [
{
"id": "worry",
"ring": "mp-inside",
"title": "Worry That Won't Let Go",
"you": {
"id": "mp-g-worry-you",
"guide": "worry",
"side": "you",
"title": "Worry That Won't Let Go",
"sideName": "For You",
"mins": 2,
"sources": [
"lieberman",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Worry That Won't Let Go",
"sub": "For You",
"say": "If you have a worry that keeps coming back, this is for you. Lots of kids have worries. You can learn to help yours get smaller."
},
{
"k": "words",
"h": "Worry can feel like",
"items": [
"A tummy ache",
"A tight chest",
"Lots of what ifs",
"Hard to fall asleep"
],
"say": "Worry can show up in your body. Your tummy might hurt. Your chest might feel tight. Your head might say, what if, what if, what if. It might be hard to fall asleep. All of that is normal, and it's okay."
},
{
"k": "card",
"title": "Your brain has a smoke alarm.",
"body": "Sometimes it beeps when there is only toast.",
"say": "Your brain has something like a smoke alarm inside. It beeps to keep you safe. Sometimes it beeps when there's only toast! That's your worry talking. You and your grown-up can help it calm down."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Give it a silly name",
"Like Wobbles"
],
[
"Say it out loud",
"I feel worried."
],
[
"Try a small brave step",
"One little step at a time"
]
],
"say": "Here are things you can do. Give your worry a silly name, like Wobbles. Say it out loud: I feel worried. And try a small brave step, one little step at a time. Brave doesn't mean you're not scared. Brave means you try.",
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
"h": "Balloon breath",
"sub": "Breathe in slow. Let it out slow.",
"say": "Let's try a balloon breath together. Put your hands on your tummy. Breathe in slowly, and fill your tummy like a balloon. Now let it out slowly, and do it two more times.",
"beats": [
"Let's try a balloon breath together.",
"Put your hands on your tummy.",
"Breathe in slowly, and fill your tummy like a balloon.",
{
"t": "Now let it out slowly, and do it two more times.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "You don't have to carry a worry by yourself. Tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. They can help you check what's true, and remind you who keeps you safe."
},
{
"k": "big",
"h": "You can be worried and brave.",
"sub": "Little steps make you strong.",
"say": "Worries come and go, like weather. You can feel worried and still be brave. Little steps make you strong."
}
]
},
"helper": {
"id": "mp-g-worry-helper",
"guide": "worry",
"side": "helper",
"title": "Worry That Won't Let Go",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"borkovec",
"lieberman",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Worry That Won't Let Go",
"sub": "For the Grown-up",
"say": "When a child you love has a worry that won't let go, this is for you. Worry is a feeling, not a fact, and you can help it shrink."
},
{
"k": "points",
"h": "What worry looks like",
"items": [
[
"Younger kids",
"Tummy aches, clinging, tears"
],
[
"Older kids",
"Grades, friends, the news"
],
[
"Worry in disguise",
"Tummy aches, trouble sleeping"
]
],
"say": "Worry looks different at different ages. Younger kids often show it in their bodies: tummy aches, clinging, tears at drop-off, or lots of what if questions at bedtime. Older kids may worry about grades, friends, or things they hear on the news. They may hide it, get irritable, or avoid things that used to be easy. Tummy aches and trouble sleeping can be worry in disguise.",
"cue": {
"at": [
1,
2,
4
]
}
},
{
"k": "card",
"title": "Kids borrow our calm.",
"body": "They borrow our fear too.",
"say": "Before you talk, notice your own worry. Kids borrow our calm, and they borrow our fear too. Pick a quiet, unhurried time, not the moment of panic. A calm, brief voice helps more than a long speech."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Sometimes worries make our bodies feel funny.\"",
"\"What has your worry voice been saying?\"",
"\"What do we know for sure?\""
],
"say": "Words that help. I've noticed your tummy hurts a lot in the mornings. Sometimes worries make our bodies feel funny. Can we figure it out together? Or, everybody has a worry voice. What has yours been saying lately? When a what if comes, try: that's your worry talking. Let's check the facts together. What do we know for sure? Then name who keeps them safe."
},
{
"k": "card",
"title": "A smoke alarm that beeps for toast.",
"body": "Your brain is trying to protect you.",
"say": "If they ask why they worry so much, try this. Your brain is trying to protect you, like a smoke alarm. Sometimes it beeps when there's only toast. We can teach it to calm down."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Give it a silly name",
"So it feels smaller"
],
[
"Set a short worry time",
"Then something fun"
],
[
"Take small brave steps",
"A little at a time"
],
[
"Praise brave tries",
"Not just successes"
]
],
"say": "What helps. Give worry a silly name, so it feels smaller and separate from your child. Set a short worry time each day, then move on to something fun. Help them face small fears in small steps. And praise brave tries, not just successes.",
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
"h": "Words that close the door",
"items": [
"\"There's nothing to be scared of.\"",
"Skipping everything scary",
"The same what if, answered again"
],
"say": "Some things help worry grow. There's nothing to be scared of dismisses a real feeling. Letting them skip everything scary makes worry bigger, because avoiding feeds it. And answering the same what if over and over keeps the loop going. Answer once, kindly. Then try: I think that's your worry asking again."
},
{
"k": "big",
"h": "Picture the next worried moment.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture the next time your child's worry shows up. Now say, out loud, the words you'll use: that's your worry talking, let's check the facts together.",
"beats": [
"Take a slow breath.",
"Picture the next time your child's worry shows up.",
{
"t": "Now say, out loud, the words you'll use: that's your worry talking, let's check the facts together.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Weeks of missed school, sleep, or friends. Panic, or rituals.",
"say": "Talk with their pediatrician or the school counselor if worry keeps them from school, sleep, or friends for more than a few weeks, or if there are panic attacks, or worries that come with rituals they must repeat. Many families also find a steady place in a song, a quiet moment together, or a short prayer or blessing at bedtime. And look after your own worry too. You matter."
},
{
"k": "big",
"h": "Calm, brief, and brave.",
"sub": "Small steps, every day.",
"say": "Stay calm and brief, name the worry together, and celebrate small brave steps. That's how worry shrinks."
}
]
}
},
{
"id": "anger",
"ring": "mp-inside",
"title": "Anger and Big Outbursts",
"you": {
"id": "mp-g-anger-you",
"guide": "anger",
"side": "you",
"title": "Anger and Big Outbursts",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Anger and Big Outbursts",
"sub": "For You",
"say": "If you sometimes get really, really mad, this is for you. Everybody gets mad. Grown-ups too. You are a good kid, and you are still learning."
},
{
"k": "big",
"h": "Anger is like an alarm.",
"sub": "It rings when something hurts.",
"say": "Anger is like an alarm inside you. It rings when something feels unfair, or when something hurts. The alarm is okay. We are all learning what to do when it rings."
},
{
"k": "card",
"title": "Mad is okay.",
"body": "Keep hands, feet, and words safe.",
"say": "Feeling mad is okay. Hurting people or things is not. So we keep our hands, our feet, and our words safe, even when we are really mad."
},
{
"k": "points",
"h": "Give your body a job",
"items": [
[
"Stomp",
"Stomp your feet"
],
[
"Squeeze",
"Squeeze a pillow tight"
],
[
"Breathe",
"Slow balloon breaths"
]
],
"say": "When the alarm rings, give your body a job. Stomp your feet on the floor. Squeeze a pillow tight. Or take slow balloon breaths.",
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
"h": "Balloon breaths",
"sub": "Fill your tummy. Let it out slow.",
"say": "Let's try balloon breaths together. Breathe in through your nose, and fill your tummy like a balloon. Now let the air out slowly, slowly, slowly. Do it two more times, nice and slow.",
"beats": [
"Let's try balloon breaths together.",
"Breathe in through your nose, and fill your tummy like a balloon.",
"Now let the air out slowly, slowly, slowly.",
{
"t": "Do it two more times, nice and slow.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, or your school counselor.",
"say": "After the storm, tell a grown-up who takes care of you what happened right before. A parent, a grandparent, a teacher, or your school counselor. Sometimes under the mad is a sad, scared, or tired feeling. Your grown-up can help you sort it out, and help you make things right."
},
{
"k": "big",
"h": "You are loved all the way.",
"sub": "Even on a stormy day.",
"say": "Even on a stormy day, the grown-ups who love you, love you all the way. That never changes."
}
]
},
"helper": {
"id": "mp-g-anger-helper",
"guide": "anger",
"side": "helper",
"title": "Anger and Big Outbursts",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Anger and Big Outbursts",
"sub": "For the Grown-up",
"say": "When a child you love hits, yells, throws, or slams doors, this is for you. Anger is okay. Hurting people or things is not. Your job is to say both, and to stay steady."
},
{
"k": "big",
"h": "Small words, big feelings.",
"sub": "The body speaks first.",
"say": "Young kids, kindergarten to second grade, have small words for big feelings. So anger comes out in hitting, throwing, screaming, or collapsing on the floor. Older kids can say more, but may slam doors, say hurtful things, or explode over something small after holding it in all day."
},
{
"k": "story",
"title": "A Lion-Sized Reset",
"lines": [
"My alarm didn't go off, and the dog got into the trash.",
"A detour added twenty minutes, and I sat in traffic muttering to myself.",
"I parked a little early and decided it was time for a reset."
],
"lesson": "Small things pile up. Reset before you walk in.",
"note": "Names and details changed",
"hold": 2,
"say": "I know how small things pile up. One morning my alarm didn't go off, the dog got into the trash, and I walked out the door in two different shoes. Halfway to my first visit, a detour added twenty minutes, and I sat in traffic muttering to myself. When I pulled up, my head was spinning. I knew I couldn't walk in like that. So I parked a little early, rolled down the window, and decided it was time for a reset."
},
{
"k": "big",
"h": "Check your own temperature.",
"sub": "Your calm is the lighthouse.",
"say": "Kids carry their mornings too. An outburst over a fallen tower may be the last straw of a long day. And the first move is always yours. Check your own temperature. If you are hot, take a breath first. Your calm is the lighthouse."
},
{
"k": "big",
"h": "Try it now.",
"sub": "Jaw soft. Shoulders down. One slow breath.",
"say": "Try it with me now. Let your jaw go soft. Let your shoulders drop. Take one slow breath, longer out than in. Now say it softly: you're really mad, and I'm right here.",
"beats": [
"Try it with me now.",
"Let your jaw go soft.",
"Let your shoulders drop.",
"Take one slow breath, longer out than in.",
{
"t": "Now say it softly: you're really mad, and I'm right here.",
"w": 10
}
]
},
{
"k": "points",
"h": "During the storm",
"items": [
[
"Keep everyone safe",
"Move breakables or siblings"
],
[
"Name it",
"\"You're really mad.\""
],
[
"Breathe together",
"Talk after, not during"
]
],
"say": "During the storm, keep everyone safe. Move breakable things, or move siblings if needed. Name the feeling: you're really mad. I'm right here. Let's breathe together. Save the talking for after the storm. First, help their body calm down.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"Yelling to stop yelling",
"It turns the storm up"
],
[
"Long lectures",
"Words bounce off mid-storm"
],
[
"Shame",
"\"What is wrong with you?\""
]
],
"say": "Leave out yelling to stop yelling. Save the lecture, because long words bounce off in the middle of a storm. And skip shame, like, what is wrong with you? Nothing is wrong with them. They are learning."
},
{
"k": "flow",
"h": "After the storm",
"steps": [
[
"Reconnect",
"I love you all the way"
],
[
"Look underneath",
"Hurt, scared, tired, embarrassed?"
],
[
"Make it right",
"Then let it go"
],
[
"Make a body plan",
"Stomp, squeeze, balloon breaths"
]
],
"say": "After the storm, reconnect first. If they ask, are you mad at me, you can say, I didn't like what happened, but I love you all the way. Then look for the feeling under the anger: hurt, scared, tired, or embarrassed. Ask, what was happening right before it started? Help them make it right, then let it go. And on a calm day, teach a body plan: stomp, squeeze a pillow, or take balloon breaths.",
"cue": {
"at": [
0,
2,
4,
5
]
}
},
{
"k": "big",
"h": "Stay steady. Love them all the way.",
"sub": "The full guide has more, whenever you want it.",
"say": "Look for patterns, like hunger, tiredness, a busy schedule, or big changes, and celebrate the times they use their plan. If outbursts are frequent, dangerous, or getting worse, or seem to cover deep sadness or something that happened to them, talk with your pediatrician or school counselor. Be gentle with yourself too. Stay steady, and love them all the way. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "meltdown",
"ring": "mp-inside",
"title": "In the Middle of a Meltdown",
"you": {
"id": "mp-g-meltdown-you",
"guide": "meltdown",
"side": "you",
"title": "In the Middle of a Meltdown",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "In the Middle of a Meltdown",
"sub": "For You",
"say": "Sometimes feelings get so big that they take over your whole body. You might scream, cry really hard, or want to run. If that happens to you, this is for you. You are a good kid. Your feelings just got really big."
},
{
"k": "big",
"h": "Big feelings can take over.",
"sub": "Your body can learn to calm down.",
"say": "When a feeling gets really big, your body can take over for a while. That happens to lots of kids. And here is good news. With practice, your body can learn to calm down faster."
},
{
"k": "card",
"title": "A grown-up will wait with you.",
"body": "\"I'm here. You're safe. I'll wait.\"",
"say": "When it happens, a grown-up who takes care of you will stay close. They might say, I'm here. You're safe. I'll wait. You don't have to talk. You can just breathe, and let them help."
},
{
"k": "points",
"h": "Give your body a job",
"items": [
[
"Push",
"Push on a wall"
],
[
"Squeeze",
"Hug a pillow tight"
],
[
"Sip",
"Some cold water"
]
],
"say": "It helps to give your body a job. Push hard against a wall. Squeeze a pillow tight. Or sip some cold water.",
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
"h": "Squeeze and let go.",
"sub": "Tight fists. Then floppy hands.",
"say": "Let's practice now, while you're calm. Squeeze your hands into tight fists. Squeeze, squeeze, squeeze. Now let go, and let your hands go floppy. Do it one more time, then take a slow breath.",
"beats": [
"Let's practice now, while you're calm.",
"Squeeze your hands into tight fists.",
"Squeeze, squeeze, squeeze.",
"Now let go, and let your hands go floppy.",
{
"t": "Do it one more time, then take a slow breath.",
"w": 10
}
]
},
{
"k": "card",
"title": "After, you can talk.",
"body": "A drink, a hug, then talk it through.",
"say": "After a meltdown, lots of kids feel tired, or a little embarrassed. That's okay. First, get a drink of water or a hug. Later, you and your grown-up can talk about what happened, and make things right together."
},
{
"k": "big",
"h": "Big feelings pass. Your grown-ups stay.",
"sub": "Every storm ends.",
"say": "Big feelings always pass. And the grown-ups who love you stay right there, the whole time."
}
]
},
"helper": {
"id": "mp-g-meltdown-helper",
"guide": "meltdown",
"side": "helper",
"title": "In the Middle of a Meltdown",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "In the Middle of a Meltdown",
"sub": "For the Grown-up",
"say": "When a child you love is screaming, hitting, kicking, or crying so hard they can't catch their breath, this is for you. What helps most is very few words, and a calm body."
},
{
"k": "big",
"h": "The thinking brain is offline.",
"sub": "Words bounce off. Your calm gets through.",
"say": "In a meltdown, the thinking part of a child's brain is offline for now. Younger kids may scream, drop to the floor, hit, kick, or bolt. Older kids may yell, say cruel things, throw things, or shut down completely. Words bounce off. But your calm body and voice still get through. Kids borrow our calm."
},
{
"k": "points",
"h": "Safety first",
"items": [
[
"Clear the space",
"Move the audience, not the child"
],
[
"Get low",
"A little to the side"
],
[
"Hold only for safety",
"If someone is about to get hurt"
]
],
"say": "Safety first. Move other kids and breakable things away. It's easier to move the audience than the child. Get down low and a little to the side. Hold them only if someone is about to get hurt.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "story",
"title": "A Lion-Sized Reset",
"lines": [
"I parked a little early and rolled down the window.",
"I did Lion's Breath three times, right there in the front seat.",
"My jaw loosened, my shoulders dropped, and I started laughing at myself."
],
"lesson": "Kids borrow our calm.",
"note": "Names and details changed",
"hold": 2,
"say": "Here is a quick way to calm your own body first. One frazzled morning, I pulled up to a home visit with my head spinning. So I parked a little early and rolled down the window. Then I did Lion's Breath, three times, right there in the front seat. I'm sure anyone walking by thought I'd lost my mind. But after the third roar, my jaw loosened, my shoulders dropped, and I actually started laughing at myself. I walked in steady and present."
},
{
"k": "big",
"h": "Try a Lion's Breath.",
"sub": "In through the nose. Out with a long haaa.",
"say": "Try it with me now. Take a deep breath in through your nose. Open your mouth wide, stick out your tongue, and breathe out with a long, loud haaa. Do it once more, and notice your jaw and shoulders.",
"beats": [
"Try it with me now.",
"Take a deep breath in through your nose.",
"Open your mouth wide, stick out your tongue, and breathe out with a long, loud haaa.",
{
"t": "Do it once more, and notice your jaw and shoulders.",
"w": 10
}
]
},
{
"k": "words",
"h": "Few words, the same each time",
"items": [
"\"I'm right here.\"",
"\"You're safe.\"",
"\"I'll wait with you.\""
],
"say": "Then use very few words, the same ones each time. I'm right here. You're safe. I'll wait with you. When they can hear you, offer two choices that are both fine with you: do you want the beanbag, or the spot next to me? Waiting is doing something."
},
{
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"Threats or countdowns",
"They add fuel"
],
[
"Why questions",
"The thinking brain is offline"
],
[
"Apologies on demand",
"Repair comes later"
],
[
"An audience",
"Talk about it privately"
]
],
"say": "Save these for later, or leave them out. Yelling, threats, or counting down while they are flooded. Lectures and why questions. Making them apologize in the moment. And talking about it in front of other kids.",
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
"h": "After the storm",
"steps": [
[
"Reconnect",
"A hug, a snack, quiet time"
],
[
"Talk briefly",
"What happened, what their body felt"
],
[
"Make it right",
"Clean up, a kind word, a redo"
],
[
"Make a plan",
"Practice it while calm"
]
],
"say": "After, reconnect before you correct. A hug, a snack, or quiet time together comes first. If they ask, am I in trouble, you can say, we'll talk about making it right when you're calm. Right now my job is to help you feel safe. Later, talk briefly: what happened, what their body felt, and what might help next time. Make it right together. Then make a calm-down plan while everyone is calm, and practice it.",
"cue": {
"at": [
0,
4,
5,
6
]
}
},
{
"k": "big",
"h": "Kids borrow our calm.",
"sub": "The full guide has more, whenever you want it.",
"say": "If meltdowns happen most days, last a long time, or are getting worse, or seem tied to something that happened, or to trouble with sleep, hearing, or learning, talk with your pediatrician or school counselor. If someone gets hurt, or your child talks about hurting themselves or not wanting to be alive, call or text 988, or call 911 in an emergency. And be kind to yourself. Kids borrow our calm, so keep refilling yours. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sadness",
"ring": "mp-inside",
"title": "Sadness That Lingers",
"you": {
"id": "mp-g-sadness-you",
"guide": "sadness",
"side": "you",
"title": "Sadness That Lingers",
"sideName": "For You",
"mins": 2,
"sources": [
"froh",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Sadness That Lingers",
"sub": "For You",
"say": "If you've been feeling sad for a while, this is for you. Lots of kids feel sad sometimes. People who love you can help you hold it."
},
{
"k": "words",
"h": "Sad can feel",
"items": [
"Heavy",
"Tired",
"Grumpy",
"Like not playing"
],
"say": "Sad can feel heavy. You might feel tired, or grumpy. You might not want to play the things you used to love. Sometimes sad comes even when you don't know why. That's okay. It's not your fault."
},
{
"k": "card",
"title": "Feelings change.",
"body": "Even the heavy ones.",
"say": "Here's something true. Feelings change, even the heavy ones. Your tree might be having some rainy days right now. Rainy days don't last forever, and the grown-ups who love you can help."
},
{
"k": "points",
"h": "Small things that help",
"items": [
[
"Go outside",
"Move and play"
],
[
"Plan something fun",
"To look forward to"
],
[
"See a friend",
"Even just one"
],
[
"Three good things",
"At bedtime"
]
],
"say": "Small things can help. Go outside and move with your grown-up. Plan something fun to look forward to. Spend time with a friend, even just one. And at bedtime, name three good things from your day, big or small.",
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
"h": "Hand on your heart.",
"sub": "Breathe in. Breathe out.",
"say": "Let's try something. Put your hand on your heart. Breathe in slowly, and breathe out slowly. Now picture a grown-up who loves you, sitting right next to you.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Breathe in slowly, and breathe out slowly.",
{
"t": "Now picture a grown-up who loves you, sitting right next to you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "Tell a grown-up how you feel: a parent, a grandparent, a teacher, or your school counselor. You can say, I've been feeling sad. If sad ever feels so big that you think about hurting yourself, or not wanting to be alive, tell a grown-up today. You are not in trouble. They will help you."
},
{
"k": "big",
"h": "You are loved, even on rainy days.",
"sub": "Rainy days add rings too.",
"say": "Rainy days are part of every tree's story. They help it grow strong rings. You are loved, even on rainy days."
}
]
},
"helper": {
"id": "mp-g-sadness-helper",
"guide": "sadness",
"side": "helper",
"title": "Sadness That Lingers",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"dazzi",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Sadness That Lingers",
"sub": "For the Grown-up",
"say": "When a child you love has seemed sad for a while, this is for you. You don't need a perfect answer. Being close matters more than fixing."
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"Cranky, clingy, tired, less play"
],
[
"Older kids",
"Pulling away, seeming flat"
],
[
"Listen for",
"Nobody likes me. I'm bad."
]
],
"say": "Sadness looks different at different ages. Younger kids may seem cranky, clingy, tired, or less interested in play. Older kids may pull away from friends, stop enjoying favorite things, seem flat, or say they are dumb or worthless. Listen for words like, nobody likes me, or, I'm bad.",
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
"h": "Weeks of sadness deserve attention.",
"sub": "Watch sleep, appetite, play, and friends.",
"say": "Sadness is normal. Sadness that lasts for weeks deserves attention. Watch for changes in sleep, appetite, play, and friends. You know your child. Trust what you notice."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"You've seemed sad lately, and I care.\"",
"\"It's not your fault.\"",
"\"Feelings change, even the heavy ones.\""
],
"say": "Clear some unhurried, unplugged time. Then try: you've seemed sad lately, and I care about that. Want to tell me about it? If they ask why they feel sad for no reason: sometimes sadness sneaks in even when we can't name why. It's not your fault. If they ask whether they'll always feel this way: no. Feelings change, even the heavy ones. I'm going to help you."
},
{
"k": "card",
"title": "Ask directly.",
"body": "Asking does not plant the idea. It opens a door.",
"say": "If your child seems very low, ask directly, in words they understand. Sometimes when kids feel really sad, they wish they weren't alive. Do you ever feel that way? Asking does not plant the idea. It opens a door. If they talk about being better off gone, wanting to die, or hurting themselves, call their doctor or 988 right away. For danger right now, call 911. Maple's guide When a Child Talks About Wanting to Die has the next steps."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Plan small good things",
"Something to look forward to"
],
[
"Get outside and move",
"Together"
],
[
"Stay connected",
"To at least one friend"
],
[
"Check in each day",
"Briefly and warmly"
]
],
"say": "What helps. Plan small good things together, so there is something to look forward to. Get outside and move together. Help them stay connected to at least one friend. And check in each day, briefly and warmly.",
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
"h": "Words that close the door",
"items": [
"\"Cheer up.\"",
"\"You have nothing to be sad about.\"",
"Waiting it out for months"
],
"say": "Some words close the door. Cheer up, or, you have nothing to be sad about, tells a child their feeling is wrong. And waiting it out for months leaves them alone with it. If sadness lasts more than two weeks, or gets in the way of daily life, call their pediatrician or the school counselor."
},
{
"k": "big",
"h": "Picture sitting close.",
"sub": "Then say it out loud.",
"say": "Take a breath. Picture your child on a hard day. Picture sitting close to them, taking your time. Now say, out loud: you've seemed sad lately, and I care about that.",
"beats": [
"Take a breath.",
"Picture your child on a hard day.",
"Picture sitting close to them, taking your time.",
{
"t": "Now say, out loud: you've seemed sad lately, and I care about that.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after you, too.",
"body": "Lean on what holds you.",
"say": "Watching a child you love feel sad is heavy. Some families find comfort in lament, prayer, or being carried by a faith community. Others find it in a walk outside, music, or a friend who listens. Lean on what holds you. Your steadiness helps them."
},
{
"k": "big",
"h": "Stay close. Keep noticing. Get help early.",
"say": "Stay close, keep noticing, and get help early. Your presence matters more than the perfect words."
}
]
}
},
{
"id": "bedtime",
"ring": "mp-inside",
"title": "Bedtime Fears and Nightmares",
"you": {
"id": "mp-g-bedtime-you",
"guide": "bedtime",
"side": "you",
"title": "Bedtime Fears and Nightmares",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Bedtime Fears and Nightmares",
"sub": "For You",
"say": "If nighttime feels scary, or you've had bad dreams, this is for you. Lots of kids feel scared at night. You're in good company."
},
{
"k": "words",
"h": "Night can feel scary",
"items": [
"Shadows",
"Strange sounds",
"Bad dreams",
"Big what ifs"
],
"say": "When the lights go off, shadows can look like scary things. Sounds can seem bigger. Bad dreams can feel really real. Feeling scared at night is normal, and it's okay."
},
{
"k": "card",
"title": "Monsters are pretend.",
"body": "Scared feelings are real.",
"say": "Here's something true. Monsters are pretend, but scared feelings are real. The grown-ups who love you know that, and they want to help your brave self at night."
},
{
"k": "card",
"title": "After a bad dream",
"body": "Tell your grown-up. Talk about it in the morning.",
"say": "A bad dream is a story your brain makes up while you sleep. It can feel real, but it isn't happening. When you wake up, you're in your bed. Tell your grown-up, and you can talk about it more in the morning."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"A night light",
"A small, soft glow"
],
[
"A cuddle buddy",
"A stuffed animal or blanket"
],
[
"Draw a new ending",
"You are in charge"
],
[
"A calm bedtime",
"A story, a song, a snuggle"
]
],
"say": "Here are things that help. A small night light. A favorite stuffed animal or blanket to hold. Draw your bad dream, then draw a happy new ending. In your picture, you get to be the one in charge. And a calm bedtime, with a story, a song, or a prayer if your family prays.",
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
"k": "big",
"h": "Smell the flower. Blow out the candle.",
"sub": "Slow in. Slow out.",
"say": "Let's practice for tonight. Pretend to smell a flower: breathe in slowly through your nose. Now pretend to blow out a candle: breathe out slowly. Do it two more times, nice and slow.",
"beats": [
"Let's practice for tonight.",
"Pretend to smell a flower: breathe in slowly through your nose.",
"Now pretend to blow out a candle: breathe out slowly.",
{
"t": "Do it two more times, nice and slow.",
"w": 10
}
]
},
{
"k": "big",
"h": "Night comes. Morning comes after.",
"sub": "You can be brave at night.",
"say": "If something is scaring you in the daytime too, tell a grown-up who takes care of you. Before you sleep tonight, think of one good thing you hope happens tomorrow. Night comes, and morning comes after it. You can be brave at night."
}
]
},
"helper": {
"id": "mp-g-bedtime-helper",
"guide": "bedtime",
"side": "helper",
"title": "Bedtime Fears and Nightmares",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Bedtime Fears and Nightmares",
"sub": "For the Grown-up",
"say": "When a child you love is scared at bedtime, or waking up from nightmares, this is for you. Night fears are very common, and they usually pass with time."
},
{
"k": "points",
"h": "What's going on",
"items": [
[
"Younger kids",
"Pretend and real mix"
],
[
"Older kids",
"Fires, break-ins, the news"
],
[
"The fear is real",
"Even when the danger is not"
]
],
"say": "Younger kids mix pretend and real, so shadows become monsters, and bad dreams feel true. Older kids may fear things they heard about, like fires, break-ins, or news events, and they may be embarrassed to admit it. Either way, the fear is real to them, even when the danger is not.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "card",
"title": "Look at the hour before bed.",
"body": "Shows, news, games, and grown-up talk.",
"say": "Before you talk, look at what they watched, heard, or played before bed. Scary shows and the news can follow a child into the dark. Keep bedtime calm, predictable, and unplugged, and at about the same time every night."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What does your worry tell you when the lights go off?\"",
"\"Monsters are pretend, but scared feelings are real.\"",
"\"Let's think of a new ending together.\""
],
"say": "Words that help. Nighttime can feel scary. What does your worry tell you when the lights go off? If they ask whether monsters are real: monsters are pretend, but scared feelings are real. Let's make a plan to help your brave self at night. If they worry the dream will come back: let's think of a new ending for it together. You get to be the one in charge."
},
{
"k": "flow",
"h": "After a nightmare",
"steps": [
[
"Comfort first",
"\"You're safe. I'm here.\""
],
[
"Keep it short",
"Calm, then back to sleep"
],
[
"Talk in the morning",
"Draw a new ending"
]
],
"say": "After a nightmare, comfort first. That was a scary dream. You're safe. I'm here. Keep it short and calm, and help them settle back to sleep. Then talk about it in the morning, in the daylight. Draw the dream together, then draw a happy new ending.",
"cue": {
"at": [
0,
4,
5
]
}
},
{
"k": "card",
"title": "Take the fear seriously.",
"body": "Without agreeing that monsters are real.",
"say": "Take the fear seriously, without agreeing that monsters are real. Monster spray and checking under the bed can feel kind, but they can tell a child the monsters might be there. A small night light and a favorite comfort item say you're safe much better."
},
{
"k": "points",
"h": "Steady nights",
"items": [
[
"Decide ahead",
"How you handle night visits"
],
[
"Praise settling",
"Nights they stay in bed"
],
[
"Same time",
"Bedtime, every night"
]
],
"say": "Decide ahead of time how you'll handle night visits, so you stay consistent. Praise the nights they stay in bed or settle themselves. And keep bedtime at about the same time every night. Many families add a short bedtime blessing, a prayer, or a gratitude practice, so the day ends feeling held.",
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
"h": "Picture tonight.",
"sub": "Then say your words out loud.",
"say": "Take a breath. Picture bedtime tonight, at your child's door. Now say, out loud, the words you'll use if they wake up scared: you're safe, I'm here.",
"beats": [
"Take a breath.",
"Picture bedtime tonight, at your child's door.",
{
"t": "Now say, out loud, the words you'll use if they wake up scared: you're safe, I'm here.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to call the doctor",
"body": "Nightmares for weeks after a scary event. Sleep trouble at school.",
"say": "Call their pediatrician if nightmares after a frightening event keep happening for weeks, or if sleep problems affect school or health. Their teacher may notice a tired, foggy child first. And protect your own sleep too. A rested grown-up is a calmer one."
},
{
"k": "big",
"h": "Calm nights. Brave mornings.",
"sub": "Comfort first. Talk in the morning.",
"say": "Comfort first, keep it calm, and talk in the morning. Steady nights help a brave self grow."
}
]
}
},
{
"id": "different",
"ring": "mp-inside",
"title": "Feeling Different",
"you": {
"id": "mp-g-different-you",
"guide": "different",
"side": "you",
"title": "Feeling Different",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Feeling Different",
"sub": "For You",
"say": "If you ever feel different from the other kids, this is for you. Lots of kids feel that way sometimes. You're in good company."
},
{
"k": "big",
"h": "Everybody is one of a kind.",
"sub": "Your differences are part of you.",
"say": "Here is something true. Everybody is one of a kind. There is only one you in the whole world. Your differences are part of what makes you, you."
},
{
"k": "words",
"h": "Kids are different in lots of ways",
"items": [
"How they look",
"How they learn",
"Their families",
"What they love"
],
"say": "Kids are different in lots of ways. How they look. How they learn. Their families. What they love to do. All of that is part of being a person."
},
{
"k": "card",
"title": "Words can sting.",
"body": "Tell a grown-up who takes care of you.",
"say": "Sometimes another kid says something about how you look or talk, and it stings. That hurts. You can tell a grown-up who takes care of you, like a parent, a grandparent, a teacher, or your school counselor. Grown-ups can help."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "Say one thing you like about you.",
"say": "Let's try something. Put your hand on your heart. Take a slow breath. Now think of one thing you like about you, and say it out loud.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Take a slow breath.",
{
"t": "Now think of one thing you like about you, and say it out loud.",
"w": 10
}
]
},
{
"k": "points",
"h": "Find your people",
"items": [
[
"One friend",
"Who likes you as you are"
],
[
"One thing",
"Where you shine"
],
[
"One grown-up",
"To talk to"
]
],
"say": "You don't need everyone to like you. You need your people. One friend who likes you just as you are. One thing you love to do, where you can shine. And one grown-up you can talk to when you feel left out.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "big",
"h": "You are wonderfully you.",
"sub": "And you are still growing.",
"say": "You are exactly who you are meant to be, and you are still growing. Wonderfully you."
}
]
},
"helper": {
"id": "mp-g-different-helper",
"guide": "different",
"side": "helper",
"title": "Feeling Different",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Feeling Different",
"sub": "For the Grown-up",
"say": "When a child you love says they feel weird, left out, or not like the other kids, this is for you. Every child wonders if they fit in. Your calm, curious listening matters more than the perfect answer."
},
{
"k": "big",
"h": "Noticing, then comparing.",
"sub": "Young kids notice. Older kids compare.",
"say": "Young kids, kindergarten to second grade, notice differences out loud: skin, clothes, glasses, how someone talks. They may repeat a hurtful comment without knowing it hurts. Older kids, third to fifth grade, compare themselves more, and may feel less than about their looks, learning, family, or interests."
},
{
"k": "card",
"title": "Start with you.",
"body": "What do you model about your own body and abilities?",
"say": "Before the talk, think about what you model. Kids listen to how we talk about our own bodies and abilities. And be ready to hear something that stings. Stay calm and curious."
},
{
"k": "words",
"h": "Words that open the door",
"items": [
"\"Tell me more about that.\"",
"\"What makes you different?\"",
"\"What do you like about it?\""
],
"say": "Then open the door. You said you feel weird. Tell me more about that. What's something about you that you think makes you different? What do you like about it? Listen for where the feeling comes from: a comment, a comparison, or a hard day."
},
{
"k": "words",
"h": "If they ask",
"items": [
"\"Everybody is one of a kind.\"",
"\"You are exactly who you are meant to be.\"",
"\"And you're still growing.\""
],
"say": "If they ask, why am I not like the other kids, you can say, everybody is one of a kind. Your differences are part of what makes you, you, and the right friends will love that. If they ask, is something wrong with me? No. You are exactly who you are meant to be, and you're still growing."
},
{
"k": "big",
"h": "Name one strength.",
"sub": "Real and specific.",
"say": "Try this now. Picture your child doing something they love. Find one real strength in that picture, something specific. Now say it out loud, the way you'll say it to them today.",
"beats": [
"Try this now.",
"Picture your child doing something they love.",
"Find one real strength in that picture, something specific.",
{
"t": "Now say it out loud, the way you'll say it to them today.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Name real strengths",
"Often and specifically"
],
[
"Find kids like them",
"In books and shows"
],
[
"Find where they shine",
"One activity or group"
],
[
"Find their people",
"Not everyone's approval"
]
],
"say": "What helps. Point out real strengths, often and specifically. Find books and shows with kids like them. Find one activity or group where they shine. And help them find their people, not everyone's approval.",
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
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"Weight and dieting talk",
"Or good and bad foods"
],
[
"Comparisons",
"To siblings or classmates"
],
[
"Body kindness",
"What bodies do, not looks"
]
],
"say": "Leave out comments about weight, dieting, or good and bad foods. Skip comparing them to siblings or classmates. And talk about bodies with kindness. Focus on what bodies do, not how they look.",
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
"h": "Cherished kids stand taller.",
"sub": "The full guide has more, whenever you want it.",
"say": "Keep noticing their strengths, and check in on friendships gently. If they say they hate themselves or their body, or stop eating normally, or become very focused on food or weight, talk with your pediatrician or school counselor soon. Look after yourself too. Kids who hear they are cherished just as they are stand taller. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "family-death",
"ring": "mp-loss",
"title": "A Family Member Died",
"you": {
"id": "mp-g-family-death-you",
"guide": "family-death",
"side": "you",
"title": "A Family Member Died",
"sideName": "For You",
"mins": 3,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member Died",
"sub": "For You",
"say": "If someone in your family died, this is for you. A grandma or grandpa, a mom or dad, a brother or sister, an aunt or uncle. I'm so sorry."
},
{
"k": "big",
"h": "Died means their body stopped working.",
"sub": "It is not your fault.",
"say": "When someone dies, their body stops working. They can't breathe, eat, or feel pain anymore. They don't come back, even when we wish they could. It is not your fault. Nothing you thought, said, or did made this happen."
},
{
"k": "words",
"h": "All your feelings are okay",
"items": [
"Sad",
"Mad",
"Mixed up",
"Nothing at all",
"Sad, then playing"
],
"say": "You might feel sad, mad, or mixed up. You might feel nothing at all. You might cry, and then want to play. All of that is okay."
},
{
"k": "story",
"title": "Letting Go. Mike's Story",
"lines": [
"Mike was a dad with a son and a daughter.",
"We recorded messages for his kids on his phone.",
"Now they can hear their dad's voice when life gets heavy."
],
"lesson": "Love keeps showing up.",
"note": "Names and details changed",
"hold": 2,
"say": "Let me tell you about a dad named Mike. He had a son and a daughter. When Mike was very sick, we recorded messages for his kids on his phone. He made letters for big days still to come, like graduation. Now his kids have voice notes from their dad to play when life gets heavy."
},
{
"k": "points",
"h": "Ways to keep them close",
"items": [
[
"Tell stories",
"About your person"
],
[
"Look at pictures",
"Or a video"
],
[
"Make a memory box",
"Things that remind you"
],
[
"Light a candle",
"Or say a prayer"
]
],
"say": "You might not have a recording, and that's okay. There are lots of ways to keep your person close. Tell stories about them. Look at pictures, or a video. Make a memory box with things that remind you of them. Some families light a candle or say a prayer.",
"cue": {
"at": [
2,
3,
4,
5
]
}
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "Think of one thing you loved.",
"say": "Put your hand on your heart. Take a slow breath. Think of one thing you loved about your person. Now think of a grown-up you can tell about it.",
"beats": [
"Put your hand on your heart.",
"Take a slow breath.",
"Think of one thing you loved about your person.",
{
"t": "Now think of a grown-up you can tell about it.",
"w": 10
}
]
},
{
"k": "big",
"h": "Missing them is part of loving them.",
"sub": "Your grown-ups are here with you.",
"say": "Tell a grown-up who takes care of you how you feel: a parent, a grandparent, a teacher, or your school counselor. Missing them is part of loving them."
}
]
},
"helper": {
"id": "mp-g-family-death-helper",
"guide": "family-death",
"side": "helper",
"title": "A Family Member Died",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member Died",
"sub": "For the Grown-up",
"say": "When a child you love is grieving a death in the family, this is for you. You don't need perfect words. Honest, gentle ones are enough."
},
{
"k": "points",
"h": "Grief at this age",
"items": [
[
"K to 2nd grade",
"May ask when they are coming back"
],
[
"Grades 3 to 5",
"Know it is forever, may worry"
],
[
"Every age",
"Sad one minute, playing the next"
]
],
"say": "Grief looks different by age. Younger children may not understand that death is permanent. They may ask when the person is coming back, or seem unbothered, then grieve later. Older children understand that death is forever. They may worry about who else might die, including you. At every age, kids grieve in bursts: sad one minute, playing the next.",
"cue": {
"at": [
1,
3,
5
]
}
},
{
"k": "words",
"h": "Use the real words",
"items": [
"\"Grandpa died today.\"",
"\"His body stopped working.\""
],
"sub": "Not sleeping. Not lost. Not gone away.",
"say": "Use the real words, died and dead. Softer phrases, like he went to sleep, confuse and frighten young children. You might say, Grandpa died today. His body stopped working, and he can't breathe, eat, or feel pain anymore."
},
{
"k": "points",
"h": "Questions they may ask",
"items": [
[
"\"When is he coming back?\"",
"\"When someone dies, they don't come back.\""
],
[
"\"Is it my fault?\"",
"\"No. Nothing you did made this happen.\""
],
[
"\"Are you going to die too?\"",
"\"I plan to be here a long time.\""
]
],
"say": "Answer the same questions every time they come. When is Grandpa coming back? When someone dies, they don't come back. We will always remember him. Is it my fault? No. Nothing you thought, said, or did made this happen. Are you going to die too? Most people live a very, very long time. I plan to be here to take care of you for a long time.",
"cue": {
"at": [
1,
4,
7
]
}
},
{
"k": "story",
"title": "Letting Go. Mike's Story",
"lines": [
"His son and daughter came in one at a time to talk with their dad.",
"He gave his son the torque wrench set they had worked on together.",
"Now they have voice notes from their dad to play when life gets heavy."
],
"lesson": "Give a grieving child something to return to.",
"note": "Names and details changed",
"hold": 2,
"say": "I once sat with a dad named Mike. My boy's fifteen and my girl's thirteen, he told me. They still need their dad. We recorded messages for them on his phone: advice on handling bullies and heartbreak, and how to change the oil in the old truck he was fixing up with his son. His kids came in one at a time to talk with him. Mike died six days later, with both kids around his bed. Now they have voice notes to play when life gets heavy."
},
{
"k": "points",
"h": "Gather what you have",
"items": [
[
"Pictures and videos",
"A saved voicemail, too"
],
[
"A memory box",
"Small things that remind them"
],
[
"Special days",
"A candle, a planted flower"
]
],
"say": "Most families don't have recordings, and that's okay. Gather what you have. Pictures, videos, a saved voicemail. A memory box with small things that remind them. And something for special days, like a candle or a planted flower.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "card",
"title": "Give them some say.",
"body": "Go to the funeral, help plan, or stay with a trusted grown-up.",
"say": "Offer choices about the funeral: go, help plan, or stay with a trusted grown-up. If they go, tell them what they'll see. Keep routines as steady as you can. Share what your family believes about death, simply and honestly. It's also okay to say, I don't know everything, but I know love doesn't end."
},
{
"k": "big",
"h": "Say their name.",
"sub": "Plan one small memory to share.",
"say": "Take a slow breath. Think of one small, happy memory of the person who died. Picture yourself sharing it with your child tonight.",
"beats": [
"Take a slow breath.",
"Think of one small, happy memory of the person who died.",
{
"t": "Picture yourself sharing it with your child tonight.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "It's okay to cry in front of them. You can lean on your own people.",
"say": "You may be grieving too. It's okay to be sad in front of your child. It shows them grief is safe. Tell your child's teacher, so school can be a soft place to land. If grief stays intense for many months, or school and friendships fall apart, talk with their pediatrician or school counselor. If your child ever talks about wanting to die, stay with them and call or text 988."
},
{
"k": "big",
"h": "Honest words. Steady love.",
"sub": "The full guide has more, whenever you want it.",
"say": "Grief comes back on birthdays and holidays. Mark those days together. Honest words and steady love go a long way. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "dying",
"ring": "mp-loss",
"title": "Someone They Love Is Dying",
"you": {
"id": "mp-g-dying-you",
"guide": "dying",
"side": "you",
"title": "Someone They Love Is Dying",
"sideName": "For You",
"mins": 3,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Someone They Love Is Dying",
"sub": "For You",
"say": "If someone you love is very, very sick and is going to die, this is for you. Maybe a grandma or grandpa. I'm so sorry."
},
{
"k": "words",
"h": "Every feeling is allowed",
"items": [
"Sad",
"Scared",
"Mad",
"Mixed up",
"Wanting to play"
],
"say": "You might feel sad, scared, mad, or mixed up. You might want to play and have fun, and that's okay too. And this is not your fault. Nothing you did made them sick."
},
{
"k": "card",
"title": "You can ask anything.",
"body": "Can the doctors fix her? Will it hurt? Can I hug her?",
"say": "You can ask your grown-ups anything. Can the doctors fix her? Will it hurt? Can I still hug her? Ask as many times as you need. Her nurses and doctors are working to keep her comfortable."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan's walls were covered in her grandchildren's crayon drawings.",
"When Drift Away came on, her toes moved right on the beat.",
"Their drawings were there in the room with her."
],
"lesson": "What you make with love can be in the room.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
},
"hold": 2,
"say": "Let me tell you about Suzan. Her walls were covered with her grandkids' crayon drawings and school photos. She had not talked in three days. One afternoon, a song called Drift Away came on. Her toes began to move, right on the beat. Then she smiled the biggest smile I have ever seen. Her grandkids' drawings were there in the room with her."
},
{
"k": "points",
"h": "Things you can give",
"items": [
[
"A drawing",
"Or a card"
],
[
"A song",
"Sung or recorded"
],
[
"Your own words",
"I love you. Goodbye."
]
],
"say": "You can make something to give, too. A drawing or a card. A song, sung out loud or recorded. And you can say I love you, or goodbye, in your own words. You can visit, call, or send something. You can take a break from a visit any time.",
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
"h": "Smell the flower. Blow out the candle.",
"sub": "Then think of a grown-up to stay close to.",
"say": "Let's take a big, slow breath together. Smell the flower. Blow out the candle. Now think of one grown-up you can stay close to.",
"beats": [
"Let's take a big, slow breath together.",
"Smell the flower.",
"Blow out the candle.",
{
"t": "Now think of one grown-up you can stay close to.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your love matters.",
"sub": "Your grown-ups are here with you.",
"say": "Stay close to the grown-ups who take care of you: a parent, a grandparent, a teacher, or your school counselor. Tell them how you feel. Your love matters, now and always."
}
]
},
"helper": {
"id": "mp-g-dying-helper",
"guide": "dying",
"side": "helper",
"title": "Someone They Love Is Dying",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Someone They Love Is Dying",
"sub": "For the Grown-up",
"say": "When someone your child loves is dying, this is for you. You may be stretched very thin right now. Good enough is plenty."
},
{
"k": "big",
"h": "Honest and gentle beats a surprise.",
"sub": "Tell them before, if you can.",
"say": "Kids do better with honest, gentle information than with surprises. If you can, tell them before the death, so they can say goodbye in their own way. Grief can begin now, before anyone has died. Treat it gently."
},
{
"k": "words",
"h": "Plain, gentle words",
"items": [
"\"Grandma is very, very sick.\"",
"\"Her body is getting weaker.\"",
"\"She is going to die, maybe soon.\""
],
"say": "Use plain, gentle words. Grandma is very, very sick. The doctors have tried everything, and her body is getting weaker. She is going to die, maybe soon. Then add, we can still love her and spend time with her. What would you like to do or say? Try not to promise she'll get better."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Simple words, short visits"
],
[
"Grades 3 to 5",
"May want to help, may feel guilty"
],
[
"Every age",
"The same questions, many times"
]
],
"say": "Here's what this can look like. Younger children need simple, concrete words and short visits. They may ask very direct questions at the bedside. Older children can understand more of the illness and may want to help. They may feel scared, angry, or guilty for wanting normal life to keep going. At every age, kids may ask the same things again and again. Answer each time.",
"cue": {
"at": [
1,
3,
5
]
}
},
{
"k": "card",
"title": "Prepare them before a visit.",
"body": "What they will see, hear, and smell. They can leave anytime.",
"say": "Before a visit, prepare them. Ask the hospice team what to expect in the coming days. Tell your child what they'll see, hear, and smell, and that they can leave anytime. Most kids want a chance to say goodbye, so try not to keep them away completely."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan's walls were covered in her grandchildren's crayon drawings.",
"When Drift Away came on, her toes moved right on the beat.",
"Their drawings were there in the room with her."
],
"lesson": "What kids make is part of the goodbye.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
},
"hold": 2,
"say": "I once sat with a grandmother named Suzan. Her walls were covered in crayon drawings and school photos, the gloriously unhinged art that only grandchildren make. She had not spoken in three days. Then a song called Drift Away came on. Her toes began to move, right on the beat. I sang along and held her hand, and she smiled the widest smile I have ever seen. Her grandchildren will never know she danced that afternoon. But their drawings were there in the room when she did."
},
{
"k": "points",
"h": "Help them make something to give",
"items": [
[
"A drawing or a card",
"For the wall or the bedside"
],
[
"A recorded song",
"Or a short voice message"
],
[
"Their own words",
"\"I love you.\" \"Goodbye.\""
]
],
"say": "Like those drawings, what kids make is part of the goodbye. Help your child make something to give. A drawing or a card for the wall. A recorded song, or a short voice message. And let them say I love you and goodbye in their own words. Rituals like prayers, blessings, or songs can give children a way to take part. If your family would like that, ask your chaplain or faith leader to include them.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "big",
"h": "Who else can hold your child?",
"sub": "Picture them. Plan to ask today.",
"say": "Take a slow breath. Think about who else can support your child while you are stretched thin. Picture that person, and plan to ask them today.",
"beats": [
"Take a slow breath.",
"Think about who else can support your child while you are stretched thin.",
{
"t": "Picture that person, and plan to ask them today.",
"w": 10
}
]
},
{
"k": "card",
"title": "Ask the hospice team.",
"body": "Chaplains, social workers, and child life staff help children too.",
"say": "Hospice teams include chaplains and social workers who help children too, and some have child life staff. Ask for them. Tell your child's teacher, so school can offer a quiet place. It's okay to be sad in front of your child. If worry or sadness becomes overwhelming for them, ask about grief support."
},
{
"k": "big",
"h": "Honest, gentle, and close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Honest words, gentle time together, and a chance to say goodbye. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pet-death",
"ring": "mp-loss",
"title": "A Pet Died",
"you": {
"id": "mp-g-pet-death-you",
"guide": "pet-death",
"side": "you",
"title": "A Pet Died",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Pet Died",
"sub": "For You",
"say": "If your pet died, this is for you. A dog, a cat, a hamster, a fish, a bunny. If you loved them, this is a real loss. I'm so sorry."
},
{
"k": "big",
"h": "Died means their body stopped working.",
"sub": "They are not hurting anymore.",
"say": "When a pet dies, their body stops working. They can't eat, play, or feel pain anymore, and they don't come back. Sometimes a vet helps a very old or very sick pet die gently, so they won't hurt. People call that put to sleep, but it is nothing like your sleep at night."
},
{
"k": "words",
"h": "All your feelings are okay",
"items": [
"Sad",
"Lonely",
"Mad",
"Mixed up",
"Okay, then sad again"
],
"say": "You might feel very sad, or lonely when you see their bowl. You might feel mad, or mixed up. You might feel okay, then sad again later. All of that is okay. And it is not your fault. You loved them so well."
},
{
"k": "big",
"h": "Remember one happy time.",
"sub": "Hand on your heart.",
"say": "Put your hand on your heart. Take a slow breath. Picture your pet on a happy day. Remember one silly thing they did.",
"beats": [
"Put your hand on your heart.",
"Take a slow breath.",
"Picture your pet on a happy day.",
{
"t": "Remember one silly thing they did.",
"w": 10
}
]
},
{
"k": "points",
"h": "Ways to say goodbye",
"items": [
[
"Draw a picture",
"Or make a memory page"
],
[
"Keep something",
"A collar, a tag, a toy"
],
[
"Hold a goodbye",
"With your family"
]
],
"say": "Saying goodbye can help. Draw a picture, or make a memory page with photos. Keep something special, like a collar, a tag, or a toy. Hold a small goodbye with your family. Some families bury their pet, light a candle, or say thank you for their pet's life.",
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
"title": "Tell a grown-up how you feel.",
"body": "A parent, a grandparent, a teacher, or your school counselor.",
"say": "Tell a grown-up who takes care of you how you're feeling: a parent, a grandparent, a teacher, or your school counselor. You can ask them questions too, like, where is my pet now? Your family can share what they believe."
},
{
"k": "big",
"h": "You loved them well.",
"sub": "Share a story about them today.",
"say": "You loved your pet, and your pet loved you. Love like that stays with you. Share a favorite story about them with someone today."
}
]
},
"helper": {
"id": "mp-g-pet-death-helper",
"guide": "pet-death",
"side": "helper",
"title": "A Pet Died",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Pet Died",
"sub": "For the Grown-up",
"say": "If you're helping a child whose pet has died, this is for you. A parent, a grandparent, a teacher, anyone who loves them. For many kids, a pet's death is their first big loss. Take it seriously."
},
{
"k": "points",
"h": "Grief at this age",
"items": [
[
"K to 2nd grade",
"Will she come back? Where did she go?"
],
[
"Grades 3 to 5",
"Guilt, or surprising sadness"
],
[
"Pretend play",
"Playing out the death is normal"
]
],
"say": "Here's what it can look like. Younger children may ask if the pet will come back, or where it went. Older children may feel guilty, like, I should have walked him more. Or their sadness may surprise the grown-ups around them. Many young children play out the death in pretend play. That's a healthy way to work it through.",
"cue": {
"at": [
1,
2,
4
]
}
},
{
"k": "words",
"h": "Use the real words",
"items": [
"\"Buddy died today.\"",
"\"His body stopped working.\"",
"\"He isn't hurting anymore.\""
],
"sub": "Not \"put to sleep.\" Not \"ran away.\"",
"say": "Use the real words. I have sad news. Buddy was very old and sick, and he died today. His body stopped working, and he isn't hurting anymore. Avoid put to sleep. It can make young kids afraid of going to sleep. And skip cover stories, like he ran away. Kids usually find out, and then they're grieving and confused."
},
{
"k": "points",
"h": "Questions they may ask",
"items": [
[
"\"Where is Buddy now?\"",
"Share what your family believes"
],
[
"\"Did I do something wrong?\"",
"\"No. You loved him so well.\""
],
[
"\"Will you die too?\"",
"Answer gently and simply"
]
],
"say": "Kids may ask big questions. Where is Buddy now? Share what your family believes, and add, we will always remember him. Did I do something wrong? No. You loved him so well. He was lucky to have you. And expect questions about people dying too. Answer gently and simply.",
"cue": {
"at": [
1,
3,
7
]
}
},
{
"k": "card",
"title": "If a vet visit is planned",
"body": "Decide together whether your child wants to say goodbye first.",
"say": "If a vet visit to end your pet's life is planned, decide together whether your child wants to say goodbye first. Some kids want a last cuddle, some want to make a drawing, and some would rather not. Explain it plainly: the vet will help Buddy die gently, so he won't hurt anymore."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"A small goodbye",
"A drawing, a burial, a candle"
],
[
"A memory page",
"Photos and favorite stories"
],
[
"Something to keep",
"A collar, a tag, a toy"
],
[
"Time",
"A new pet can wait"
]
],
"say": "What helps. Hold a small family goodbye: a drawing, a burial, a candle. Many families give thanks for a pet's life with a simple prayer or blessing. Make a memory page with photos and favorite stories. Let them keep a collar, a tag, or a toy. And give it time. A new pet is not a replacement, so wait until they are ready.",
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
"h": "Bring a story to bedtime.",
"sub": "Then ask for theirs.",
"say": "Take a moment. Think of a funny or sweet story about your pet. Plan to tell it to your child tonight, and then ask for theirs.",
"beats": [
"Take a moment.",
"Think of a funny or sweet story about your pet.",
{
"t": "Plan to tell it to your child tonight, and then ask for theirs.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after you, too.",
"body": "Your sadness shows them grief is safe at home.",
"say": "You may be grieving too. Letting your child see you miss the pet shows them sadness is safe at home. Tell their teacher, so a kind word and a little extra patience can meet them at school. If sadness keeps them from normal life for several weeks, talk with their pediatrician or school counselor."
},
{
"k": "big",
"h": "A first loss, taken seriously.",
"sub": "The full guide has more, whenever you want it.",
"say": "Real words, a small goodbye, and time. Take this loss as seriously as they do. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "suicide-loss",
"ring": "mp-loss",
"title": "Someone Died by Suicide",
"you": {
"id": "mp-g-suicide-loss-you",
"guide": "suicide-loss",
"side": "you",
"title": "Someone Died by Suicide",
"sideName": "For You",
"mins": 3,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Someone Died by Suicide",
"sub": "For You",
"say": "If someone you love died by suicide, this is for you. I am so sorry. You have people with you."
},
{
"k": "card",
"title": "Help is always here.",
"body": "Tell a grown-up. Call or text 988. Danger right now: 911.",
"say": "First, help is always here. If you feel scared or very sad, tell a grown-up. You and your grown-up can call or text 988, any time. If someone is in danger right now, get a grown-up and call 911. These stay on the screen the whole time."
},
{
"k": "big",
"h": "It is not your fault.",
"sub": "Nothing you said or did made this happen.",
"say": "Died by suicide means the person's brain got very sick, and they ended their own life. That is very hard to understand. Here is something true. It is not your fault. Nothing you said or did made it happen."
},
{
"k": "words",
"h": "All your feelings are okay",
"items": [
"Sad",
"Mad",
"Mixed up",
"Scared"
],
"sub": "You can ask any question.",
"say": "You might feel sad, mad, mixed up, or scared. You might feel all of them in one day. All your feelings are okay. You can ask your grown-up any question, as many times as you need."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "Picture a grown-up who loves you.",
"say": "Let's slow down together. Put your hand on your heart. Breathe in slowly, like you are smelling a flower. Blow out slowly, like a birthday candle. Now picture a grown-up who loves you.",
"beats": [
"Let's slow down together.",
"Put your hand on your heart.",
"Breathe in slowly, like you are smelling a flower.",
"Blow out slowly, like a birthday candle.",
{
"t": "Now picture a grown-up who loves you.",
"w": 10
}
]
},
{
"k": "words",
"h": "If you ever feel that sad",
"items": [
"I feel very sad. I need help."
],
"sub": "Tell a grown-up today.",
"say": "If you ever feel so sad that you don't want to be alive, tell a safe grown-up today. A parent, a grandparent, a teacher, or your school counselor. You can say, I feel very sad. I need help. And if a friend ever says they want to die, always tell a grown-up, even if they asked you not to. You are not in trouble."
},
{
"k": "big",
"h": "There is always help.",
"sub": "You are loved.",
"say": "You can remember the person you love, and the happy times too. Keep talking with your grown-ups. There is always help, and you are loved."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
},
"helper": {
"id": "mp-g-suicide-loss-helper",
"guide": "suicide-loss",
"side": "helper",
"title": "Someone Died by Suicide",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"dazzi",
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"American Foundation for Suicide Prevention",
"https://afsp.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Someone Died by Suicide",
"sub": "For the Grown-up",
"say": "If a child you love has lost someone to suicide, this is for you. You may be grieving too, and you can still help them through this."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Danger right now: call 911. Any talk of wanting to die: call or text 988 together.",
"say": "First, help right now. If anyone is in danger right now, call 911. If your child talks about wanting to die, call or text 988 together, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Suicide loss is a heavy, complicated grief, and you may be carrying your own. Steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Suicide loss is a heavy, complicated grief, and you may be carrying your own.",
"Steady yourself first.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "big",
"h": "Tell the truth in simple words.",
"sub": "Kids usually find out.",
"say": "Tell the truth in simple words. Kids usually find out, and secrets add confusion. When a child is told it was only an accident or an illness, they often learn the truth later and feel betrayed. Decide with family what is shared, and keep it honest."
},
{
"k": "words",
"h": "Words that help",
"items": [
"He died by suicide.",
"His mind was very sick.",
"This is not your fault."
],
"say": "You might say, Uncle Ray died. He died by suicide, which means he ended his own life. His mind was very sick. Then, this is not your fault. You can ask me anything. Say died by suicide, not committed. And leave out any details of how."
},
{
"k": "points",
"h": "What you may see",
"items": [
[
"Younger kids",
"The same questions, many times"
],
[
"Older kids",
"Why, anger, guilt"
],
[
"A new worry",
"Could it happen to you?"
]
],
"say": "Young children need simple words, and they may ask the same questions many times. Answer calmly, each time. Older children may ask why, or feel angry or guilty. And many children wonder if this could happen to someone else they love, or to them.",
"cue": {
"at": [
0,
2,
3
]
}
},
{
"k": "card",
"title": "Could that happen to you?",
"body": "\"If I ever feel that sad, I will get help. If you ever do, tell me right away.\"",
"say": "When they ask why, you might say, his brain was very sick, and he was in a lot of pain inside. It made it hard for him to see that people could help. If they ask, could that happen to you, try this. If I ever feel that sad, I will get help. And if you ever feel that way, tell me right away. There is always help."
},
{
"k": "card",
"title": "Ask plainly.",
"body": "\"Are you thinking about hurting yourself or killing yourself?\"",
"say": "Watch for lingering sadness, or talk of wanting to die, and act on it. Ask plainly, in a calm voice. Are you thinking about hurting yourself or killing yourself? Asking is safe. It does not put the idea in their head. If they say yes, stay with them, and call or text 988 together."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"The whole person",
"Not just how they died"
],
[
"Talk anytime",
"Say it often"
],
[
"Hard dates",
"Mark them together"
],
[
"A grief group",
"For kids after suicide loss"
]
],
"say": "Here's what helps. Remember the whole person, not just how they died. Keep saying they can talk about it anytime. Mark hard dates together. And find a grief group for children who lost someone to suicide. If your family carries worries about faith and suicide, many traditions today emphasize mercy, and a faith leader can help.",
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
"h": "Your honest words help.",
"sub": "Get support for yourself too.",
"say": "Find a counselor experienced in suicide loss, for your child and for yourself. Call or text 988 any time, for them or for you. Your honest words and steady love help."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
}
},
{
"id": "baby-loss",
"ring": "mp-loss",
"title": "Losing a Baby in the Family",
"you": {
"id": "mp-g-baby-loss-you",
"guide": "baby-loss",
"side": "you",
"title": "Losing a Baby in the Family",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Share Pregnancy and Infant Loss Support",
"https://nationalshare.org"
],
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Losing a Baby in the Family",
"sub": "For You",
"say": "If a baby in your family died, this is for you. I am so sorry. This is a sad time, and you have people with you."
},
{
"k": "big",
"h": "Nothing you did made this happen.",
"sub": "Nothing you said. Nothing you thought.",
"say": "Sometimes a baby's body does not grow the way it needs to, and the baby dies. Here is something true. Nothing you did made this happen. Nothing you said, and nothing you thought. It is not your fault."
},
{
"k": "words",
"h": "All your feelings are okay",
"items": [
"Sad",
"Mixed up",
"Disappointed",
"Worried"
],
"say": "You might feel sad, even if you never got to meet the baby. You might feel mixed up, or disappointed, or worried about your mom. You might feel fine, and then sad again. All your feelings are okay."
},
{
"k": "card",
"title": "Your grown-ups may be sad too.",
"body": "That is okay. You can be sad together.",
"say": "Your grown-ups may cry, or be quiet for a while. That is okay. They are sad because they love the baby. You don't have to make them feel better. You can be sad together, and you can still have hugs and play."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "Think of a way to remember the baby.",
"say": "Let's take a quiet moment. Put your hand on your heart. Breathe in slowly, like you are smelling a flower. Blow out slowly, like a birthday candle. Now think of one way you would like to remember the baby.",
"beats": [
"Let's take a quiet moment.",
"Put your hand on your heart.",
"Breathe in slowly, like you are smelling a flower.",
"Blow out slowly, like a birthday candle.",
{
"t": "Now think of one way you would like to remember the baby.",
"w": 10
}
]
},
{
"k": "points",
"h": "Ways to remember",
"items": [
[
"A drawing",
"For the baby"
],
[
"A candle",
"Or a star at night"
],
[
"A name",
"If your family wishes"
]
],
"say": "There are lots of ways to remember. You could make a drawing for the baby. Your family might light a candle, or look for a star at night. Some families give the baby a name, or say a prayer. Ask your grown-up what your family would like to do.",
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
"h": "You can ask your grown-up anything.",
"sub": "Your family loves you, and loves the baby.",
"say": "If you have questions, or a sad feeling that stays, tell a grown-up who takes care of you. A parent, a grandparent, a teacher, or your school counselor. You can ask anything. Your family loves you, and loves the baby too."
}
]
},
"helper": {
"id": "mp-g-baby-loss-helper",
"guide": "baby-loss",
"side": "helper",
"title": "Losing a Baby in the Family",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Share Pregnancy and Infant Loss Support",
"https://nationalshare.org"
],
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Losing a Baby in the Family",
"sub": "For the Grown-up",
"say": "If your family has lost a baby, this is for you. I am so sorry. You may be grieving deeply yourself, and you can still help your child through this."
},
{
"k": "big",
"h": "Take care of yourselves first.",
"sub": "Lean on family and friends.",
"say": "Take care of yourselves first. This is a deep loss, and it is okay to need help. Lean on family and friends, for meals, rides, and time with the kids. A grandparent or a trusted friend can be a steady place for a child while you heal."
},
{
"k": "words",
"h": "Tell them simply and truthfully",
"items": [
"The baby died before it was born.",
"Nobody did anything to cause it."
],
"say": "If your child knew about the baby, tell them simply and truthfully. You might say, we have sad news. The baby died before it was born. The baby's body did not grow the way it needed to. Nobody did anything to cause it. Leave out the medical details. Simple, true words are enough."
},
{
"k": "points",
"h": "What you may see",
"items": [
[
"Younger kids",
"Where did the baby go?"
],
[
"Worry",
"Can babies or moms get sick easily?"
],
[
"Older kids",
"Sad, disappointed, worried about Mom"
]
],
"say": "Young children may ask where the baby went, or when it is coming. They may start to worry that babies or moms can easily get sick. Older children may feel sad, disappointed about not being a big sibling yet, or worried about their mom. Some feel confused about grieving someone they never met. All of it is okay.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "card",
"title": "Is Mom going to be okay?",
"body": "\"Mom's body is healing, and the doctors are taking care of her.\"",
"say": "Children often ask, is Mom going to be okay? You might say, Mom's body is healing, and the doctors are taking care of her. She will be sad for a while, and that's okay. If they ask, can we have another baby, it's fine to say, we don't know yet. Right now, we are taking time to be sad and to take care of each other."
},
{
"k": "big",
"h": "It is okay for them to see you sad.",
"say": "Parents grieve too, and it is okay for your child to see you sad. It shows them that sadness is part of love. Pretending nothing happened, when your child knew, can leave them alone with their questions. Say it more than once, too. Nothing they did or thought caused it."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A small way to remember",
"A candle, a star, a drawing"
],
[
"A name",
"If your family wishes"
],
[
"Routines and cuddles",
"Extra of both"
]
],
"say": "Here's what helps. A small way to remember: a candle, a star, a drawing. Naming the baby, if your family wishes. Many traditions have prayers or rituals for babies who died, and including a child can help them feel part of the family's love. And keep routines going, with extra cuddles.",
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
"h": "Questions may come back later.",
"sub": "Due dates. A new pregnancy.",
"say": "Expect questions to come back, sometimes months later. A due date, or a new pregnancy, can bring them up again. Answer simply, each time. Let your child's teacher know, so they can offer a kind word and some extra gentleness."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "Who could help with the kids this week?",
"say": "Take a moment for yourself. Put a hand on your heart, and breathe slowly. Now picture one person you could ask to help with the kids this week.",
"beats": [
"Take a moment for yourself.",
"Put a hand on your heart, and breathe slowly.",
{
"t": "Now picture one person you could ask to help with the kids this week.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your love holds them.",
"sub": "Help is there for whole families.",
"say": "Others can help you walk through this. Share Pregnancy and Infant Loss Support offers help for whole families. If grief or worry stays heavy, talk with your doctor, your child's pediatrician, or a counselor. Your love holds your child, and holds the baby too."
}
]
}
},
{
"id": "grief-days",
"ring": "mp-loss",
"title": "Holidays and Anniversaries After a Loss",
"you": {
"id": "mp-g-grief-days-you",
"guide": "grief-days",
"side": "you",
"title": "Holidays and Anniversaries After a Loss",
"sideName": "For You",
"mins": 2,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Holidays and Anniversaries After a Loss",
"sub": "For You",
"say": "If someone you love has died, and a special day is coming, this is for you. A birthday, a holiday, or the day they died."
},
{
"k": "big",
"h": "Some days feel different.",
"sub": "Birthdays, holidays, special dates.",
"say": "Some days make you miss your person extra. Sometimes the days before feel even harder than the day itself. That happens to lots of kids, and to grown-ups too."
},
{
"k": "words",
"h": "Happy and sad can go together",
"items": [
"Sad",
"Happy",
"Grumpy",
"Tired"
],
"say": "On a special day, you might feel sad, happy, grumpy, or tired. You might laugh and cry on the same day. Missing them and having fun can happen together. All your feelings are okay."
},
{
"k": "card",
"title": "Your grown-ups may be sad too.",
"body": "That is okay. You can sit close and have a hug.",
"say": "Your grown-ups may be sad on these days too, because they remember the person extra. That is okay. You don't have to make them feel better. You can sit close, and have a hug."
},
{
"k": "points",
"h": "You can help decide",
"items": [
[
"Light a candle"
],
[
"Cook their favorite food"
],
[
"Tell a favorite story"
],
[
"Make a drawing"
]
],
"say": "You can help your family decide how to remember. Light a candle. Cook their favorite food. Tell a favorite story about them. Or make a drawing. Some families say a prayer, or visit a special place.",
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
"h": "Picture the special day.",
"sub": "Think of one way to remember.",
"say": "Let's try something. Put your hand on your heart. Breathe in slowly, like you are smelling a flower. Blow out slowly, like a birthday candle. Now picture the special day, and think of one way you would like to remember your person.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Breathe in slowly, like you are smelling a flower.",
"Blow out slowly, like a birthday candle.",
{
"t": "Now picture the special day, and think of one way you would like to remember your person.",
"w": 10
}
]
},
{
"k": "big",
"h": "Missing them is part of loving them.",
"sub": "Tell a grown-up how you feel.",
"say": "If a day feels heavy, tell a grown-up who takes care of you. A parent, a grandparent, a teacher, or your school counselor. Missing your person is part of loving them."
}
]
},
"helper": {
"id": "mp-g-grief-days-helper",
"guide": "grief-days",
"side": "helper",
"title": "Holidays and Anniversaries After a Loss",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"The Dougy Center for Grieving Children and Families",
"https://www.dougy.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Holidays and Anniversaries After a Loss",
"sub": "For the Grown-up",
"say": "If your family is facing a birthday, a holiday, or an anniversary after someone died, this is for you. These days can be hard for grown-ups and kids alike, and a little planning helps."
},
{
"k": "big",
"h": "Hard days are often harder before they arrive.",
"sub": "Plan ahead together.",
"say": "Hard days are often harder before they arrive. The weeks before a birthday, a holiday, or the anniversary of a death can carry a lot of dread. So plan ahead, together. Ask each family member what would help, including the kids. And tell teachers when a hard date is coming."
},
{
"k": "points",
"h": "What you may see",
"items": [
[
"Younger kids",
"They sense your sadness, and may act out"
],
[
"Older kids",
"Dread, or want to skip the day"
],
[
"Or the opposite",
"Want everything to stay the same"
]
],
"say": "Young children may not know why a day feels heavy, but they sense the grown-ups' sadness, and they may act out. Older children may dread the day, or want to skip it. Or they may want everything to stay exactly the same.",
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
"h": "Ask, before the day",
"items": [
"It might feel different this year.",
"How would you like to remember her?"
],
"say": "A simple start helps. Grandma's birthday is next week. It might feel different this year. How would you like to remember her? Then listen. Letting kids help decide gives them a little say in a time that can feel out of their hands."
},
{
"k": "flow",
"h": "Keep, change, add",
"steps": [
[
"Keep",
"Some old traditions"
],
[
"Change",
"Others that feel too hard"
],
[
"Add",
"One that honors the person"
],
[
"Plan the day after",
"Something comforting"
]
],
"say": "Keep some old traditions. Change others that feel too hard right now. Add one that honors the person: set an empty place, share favorite stories, cook their favorite meal, or give to a cause they loved. And plan something comforting for the day after, too.",
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
"title": "Is it okay to have fun?",
"body": "\"Yes. Missing her and having fun can happen together.\"",
"say": "Kids often ask, is it okay to have fun? Yes. Grandma would want you to have fun. Missing her and having fun can happen together. They may also ask, why is everyone sad today? Today makes us remember Grandma extra, and we miss her. It's okay to be sad."
},
{
"k": "big",
"h": "Let feelings be what they are.",
"sub": "Happy and sad on the same day.",
"say": "Try not to pretend the day is normal. And try not to pressure kids to feel a certain way, sad or cheerful. It is okay to feel happy and sad on the same day. Many traditions have ways of remembering the dead on special days, and those rituals can hold a family's grief and love together."
},
{
"k": "big",
"h": "Picture the next hard date.",
"sub": "What would help you, too?",
"say": "Take a moment for yourself. Breathe in slowly, and let it out. Picture the next hard date on your calendar. Now think of one thing that would help you, too, on that day.",
"beats": [
"Take a moment for yourself.",
"Breathe in slowly, and let it out.",
"Picture the next hard date on your calendar.",
{
"t": "Now think of one thing that would help you, too, on that day.",
"w": 10
}
]
},
{
"k": "big",
"h": "Talk afterward about what helped.",
"sub": "So next year is easier.",
"say": "After the day, talk together about what helped, so next year is easier. Grief that seems stuck, or worse each year, may need more support. Talk with your child's pediatrician, the school counselor, or a grief center for children. You are building ways to remember that can last a lifetime."
}
]
}
},
{
"id": "family-illness",
"ring": "mp-health",
"title": "Serious Illness in the Family",
"you": {
"id": "mp-g-family-illness-you",
"guide": "family-illness",
"side": "you",
"title": "Serious Illness in the Family",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Serious Illness in the Family",
"sub": "For You",
"say": "If someone in your family is very sick, this is for you. Maybe your mom or dad, or a grandma or grandpa. I'm really glad you're here."
},
{
"k": "words",
"h": "Every feeling is okay",
"items": [
"Sad",
"Scared",
"Mad",
"Mixed up",
"Still want to play"
],
"say": "When someone you love is very sick, you might feel sad, scared, or mad. You might feel all mixed up. You might still want to play and laugh, and that's okay too. Every feeling is allowed."
},
{
"k": "card",
"title": "It is not your fault.",
"body": "Nothing you did made them sick.",
"say": "Here is something true. Nothing you did made them sick. Not a grumpy word, not a bad day, nothing at all. And making them better is not your job. The doctors and nurses are working on that."
},
{
"k": "card",
"title": "You can ask anything.",
"body": "What is it called? Can I catch it? Who will pick me up?",
"say": "You can ask your grown-ups anything. What is the sickness called? Can I catch it? Who will pick me up from school? Ask as many times as you need."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Make a card",
"Or a drawing"
],
[
"Pick a song",
"To share together"
],
[
"Call or visit",
"If you want to"
]
],
"say": "There are things you can do, if you want to. Make a card or a drawing. Pick a song to share together. Call or visit, if you want to. And you still get to go to school, play with friends, and have fun.",
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
"h": "Hand on your heart.",
"sub": "Think of a grown-up who takes care of you.",
"say": "Let's try something together. Put your hand on your heart. Breathe in slowly, and breathe out slowly. Now think of a grown-up who takes care of you.",
"beats": [
"Let's try something together.",
"Put your hand on your heart.",
"Breathe in slowly, and breathe out slowly.",
{
"t": "Now think of a grown-up who takes care of you.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are loved.",
"sub": "Your grown-ups are here with you.",
"say": "Tell a grown-up who takes care of you how you feel: a parent, a grandparent, a teacher, or your school counselor. You don't have to hold this by yourself. You are loved, all the way through."
}
]
},
"helper": {
"id": "mp-g-family-illness-helper",
"guide": "family-illness",
"side": "helper",
"title": "Serious Illness in the Family",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Serious Illness in the Family",
"sub": "For the Grown-up",
"say": "When someone in your family is seriously ill, this is for you. You may be worried, tired, and stretched thin. Good enough is plenty."
},
{
"k": "big",
"h": "Kids notice. Tell them the truth.",
"sub": "In words they understand.",
"say": "Children notice more than we think. Tell them the truth in words they understand, including the name of the illness. Honest words leave them less alone with their guesses."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"May worry they caused it"
],
[
"When routines change",
"Clinging, acting younger"
],
[
"Grades 3 to 5",
"Want facts, overhear a lot"
],
[
"Some older kids",
"Take on too much"
]
],
"say": "Here's what this can look like. Younger children may worry that they caused the illness, or that they can catch it. They may cling, act younger, or act out when routines change. Older children often want facts. They overhear more than you think, and they may worry quietly about death. Some take on too much responsibility.",
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
"k": "words",
"h": "Plain, gentle words",
"items": [
"\"Mom has an illness called cancer.\"",
"\"You can't catch it.\"",
"\"Nothing you did caused it.\""
],
"say": "Use plain, gentle words, and the real name. Mom has an illness called cancer. The doctors are giving her medicine to fight it. It might make her tired, and her hair might fall out. You can't catch it, and nothing you did caused it."
},
{
"k": "card",
"title": "Is Mom going to die?",
"body": "Honest and hopeful. \"If anything changes, I will tell you.\"",
"say": "They may ask, is Mom going to die? Be honest and hopeful: the doctors are working very hard to help her get better. If anything changes, I will tell you. Try not to promise how it will turn out. If they ask who will take care of them, name real people: Aunt Sara will pick you up on Tuesdays and Thursdays."
},
{
"k": "story",
"title": "Letting Go. Jack's Story",
"lines": [
"Jack's walls were covered in photos of trophy walleye.",
"At first, every conversation circled back to his business.",
"Then he spent his energy holding his grandkids."
],
"lesson": "Let them have time with their person.",
"note": "Names and details changed",
"hold": 2,
"say": "I once met a man named Jack at his home on a lake. His walls were covered in photos of trophy walleye and the boats he had built. Jack had cancer, and his big family, grandkids too, sat around the room, tired and heartbroken. At first, every conversation circled back to his fishing business. Over a few quiet days, we recorded what he knew, and he told his family, I release you from this. Then something shifted. He spent more of his energy holding his grandkids and telling old lake stories. He got to be Dad and Grandpa instead of Captain."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Steady routines",
"Routines feel like safety"
],
[
"Special time",
"Even 10 minutes"
],
[
"Short updates",
"As things change"
],
[
"A way to help",
"A card, a song, a call"
]
],
"say": "Like those grandkids, children need time with their person, and not only news about them. Keep routines as steady as you can, because routines feel like safety. Give special time just for them, even ten minutes. Share short, honest updates as things change. And give them a way to help: a card, a song, a call, or a visit if they want to.",
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
"h": "Who can help keep their days steady?",
"sub": "Picture them. Plan to ask today.",
"say": "Take a slow breath. Think about rides, meals, and bedtime this week. Picture one person who could take one of those, and plan to ask them today.",
"beats": [
"Take a slow breath.",
"Think about rides, meals, and bedtime this week.",
{
"t": "Picture one person who could take one of those, and plan to ask them today.",
"w": 10
}
]
},
{
"k": "card",
"title": "You have people with you in this.",
"body": "The school, a child life specialist, your faith community.",
"say": "Decide who will update the school, so a teacher can offer flexibility on homework. Many hospitals have child life specialists who help children of patients. Ask. If your family prays, praying for the person, or asking your faith community to pray, can help kids feel they are doing something meaningful. And look after yourself too. You matter here as well."
},
{
"k": "big",
"h": "Honest, steady, and close.",
"sub": "Keep checking in as things change.",
"say": "Honest words, steady days, and time together. Keep checking in as treatment changes, because kids' feelings shift over time."
}
]
}
},
{
"id": "own-illness",
"ring": "mp-health",
"title": "Their Own Illness or Hospital Stay",
"you": {
"id": "mp-g-own-illness-you",
"guide": "own-illness",
"side": "you",
"title": "Their Own Illness or Hospital Stay",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Their Own Illness or Hospital Stay",
"sub": "For You",
"say": "If you are sick, or going to the hospital, this is for you. Maybe for a test, a surgery, or lots of doctor visits. I'm really glad you're here."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Mad",
"Bored",
"Missing home",
"Brave and scared at once"
],
"say": "You might feel scared, or mad, or bored. You might miss home, your own bed, or your friends. You might feel brave and scared at the same time. All of that is okay."
},
{
"k": "card",
"title": "Being sick is not a punishment.",
"body": "Bodies sometimes need help. That is what doctors do.",
"say": "Here is something true. Being sick is never a punishment. You didn't do anything bad. Bodies sometimes need help, and that's what doctors and nurses do."
},
{
"k": "card",
"title": "You can ask.",
"body": "What will happen? Will it hurt? Will you stay with me?",
"say": "You can ask your grown-ups and your nurses anything. What will happen? Will it hurt? Will you stay with me? Some things might hurt a little, like a pinch. You can squeeze a hand as hard as you want."
},
{
"k": "points",
"h": "Things that can help",
"items": [
[
"Bring a buddy",
"A stuffed animal or a blanket"
],
[
"Make a choice",
"Which arm, which song"
],
[
"Tell someone",
"When something hurts or feels scary"
]
],
"say": "Some things can help. Bring a buddy from home, like a stuffed animal or a blanket. Make choices when you can, like which arm, or which song. And tell a grown-up when something hurts or feels scary. Telling is brave.",
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
"h": "Squeeze and let go.",
"sub": "Then think of a hand you like to hold.",
"say": "Let's try something you can do anywhere. Make two tight fists, and squeeze. Now let go, and let your hands go soft. Breathe out slowly, and think of the grown-up whose hand you like to hold.",
"beats": [
"Let's try something you can do anywhere.",
"Make two tight fists, and squeeze.",
"Now let go, and let your hands go soft.",
{
"t": "Breathe out slowly, and think of the grown-up whose hand you like to hold.",
"w": 10
}
]
},
{
"k": "big",
"h": "You have a whole team.",
"sub": "Your grown-ups are with you.",
"say": "Your doctors, your nurses, and your grown-ups are all on your team. Some hospitals even have a helper just for kids, called a child life specialist. When you feel scared, tell them. You are loved, sick or well, every single day."
}
]
},
"helper": {
"id": "mp-g-own-illness-helper",
"guide": "own-illness",
"side": "helper",
"title": "Their Own Illness or Hospital Stay",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Their Own Illness or Hospital Stay",
"sub": "For the Grown-up",
"say": "When your child is sick, or headed to the hospital, this is for you. Your own worry is real too. Good enough is plenty."
},
{
"k": "big",
"h": "Honest preparation beats a surprise.",
"sub": "What will happen, and what it will feel like.",
"say": "Children cope better when they know what's coming. Learn what will happen, so you can explain it simply: what they'll see, hear, and feel. Never promise it won't hurt if it might. Honest words now make the next visit easier to trust."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"May think it is a punishment"
],
[
"Their biggest fear",
"Being apart from you"
],
[
"Grades 3 to 5",
"Want to understand their body"
],
[
"Older kids also",
"Missing school, looking different"
]
],
"say": "Here's what this can look like. Younger children may think being sick, or getting shots, is a punishment. What scares them most is being separated from you. Older children want to understand their body and their illness. They may worry about missing school and friends, or looking different.",
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
"h": "Plain, honest words",
"items": [
"\"The doctors are going to fix your tummy.\"",
"\"It might hurt a little, like a pinch.\"",
"\"Squeeze my hand as hard as you want.\""
],
"say": "Use plain, honest words. Tomorrow we are going to the hospital so the doctors can fix your tummy. I will be with you as much as I can. It might hurt a little, like a pinch. You can squeeze my hand as hard as you want."
},
{
"k": "card",
"title": "Did I do something bad?",
"body": "\"No. Being sick is never a punishment.\"",
"say": "If they ask, did I do something bad, say: No. Being sick is never a punishment. Bodies sometimes need help, and that's what doctors do. If they ask, will you stay with me, tell the truth about when you can be there, and when you can't. And keep doctors as helpers, never a threat, like, if you don't behave, you'll get a shot."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Pack comfort",
"A buddy, a blanket, a book"
],
[
"Offer choices",
"Which arm, which toy"
],
[
"Medical play",
"A toy doctor kit at home"
],
[
"A calendar",
"Count down or track days"
]
],
"say": "What helps. Pack comfort items: a stuffed animal, a blanket, a favorite book. Offer choices wherever you can: which arm, which toy, which song. Try medical play at home with a toy doctor kit. And use a calendar to count down, or to track treatment days.",
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
"title": "Ask for the child life specialist.",
"body": "They help children understand and cope, often through play.",
"say": "Ask for the hospital's child life specialist. Their work is helping children understand what is happening and cope with it, often through play. If your family finds strength in faith, prayers for healing, a blessing before a procedure, or a visit from a chaplain can bring deep comfort."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Kids borrow our calm.",
"say": "Take a slow breath. Let your shoulders drop. Picture the next hard moment, a shot, a test, or a goodbye at the door. Now say, quietly, the words you'll use: I'm right here, and you can squeeze my hand.",
"beats": [
"Take a slow breath.",
"Let your shoulders drop.",
"Picture the next hard moment, a shot, a test, or a goodbye at the door.",
{
"t": "Now say, quietly, the words you'll use: I'm right here, and you can squeeze my hand.",
"w": 10
}
]
},
{
"k": "card",
"title": "Keep a seat warm.",
"body": "Cards, videos, and a gentle return to class.",
"say": "Keep them connected with friends and class. Ask the teacher about cards or videos from classmates, and plan a gentle return. Afterward, kids may play out hospital moments for weeks. That is healthy. If fear or nightmares about medical care last long after treatment, talk with your pediatrician. And look after yourself too."
},
{
"k": "big",
"h": "Honest, close, and steady.",
"sub": "You are their safe place.",
"say": "Honest words, comfort from home, and you, as close as you can be. You are their safe place."
}
]
}
},
{
"id": "family-mental-health",
"ring": "mp-health",
"title": "A Family Member's Mental Health Struggle",
"you": {
"id": "mp-g-family-mental-health-you",
"guide": "family-mental-health",
"side": "you",
"title": "A Family Member's Mental Health Struggle",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NAMI (National Alliance on Mental Illness)",
"https://www.nami.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member's Mental Health Struggle",
"sub": "For You",
"say": "If someone in your family is having a hard time with how they think and feel, this is for you. Maybe a mom or dad, a brother or sister, or a grandparent. I'm really glad you're here."
},
{
"k": "card",
"title": "An illness on the inside.",
"body": "In how someone thinks and feels. Doctors can help.",
"say": "Sometimes a person gets an illness in how they think and feel. One kind is called depression. They might seem very tired, very sad, or grumpy, even when good things happen. It's an illness, like other illnesses, and doctors can help."
},
{
"k": "card",
"title": "It is not your fault.",
"body": "And fixing it is not your job.",
"say": "Here is something true. It's not because of anything you did. You don't have to be extra good to make it better. Helping them get better is a job for grown-ups and doctors."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Worried",
"Mad",
"Embarrassed",
"Lonely"
],
"say": "You might feel sad, worried, or mad. You might feel embarrassed, or lonely. You might miss how things used to be. Every feeling is okay."
},
{
"k": "points",
"h": "You still get to be a kid",
"items": [
[
"Play",
"With friends and toys"
],
[
"Talk",
"To a grown-up you trust"
],
[
"Ask",
"Any question you have"
]
],
"say": "You still get to be a kid. Play with your friends and your toys. Talk to a grown-up you trust about how you feel. You don't have to keep it a secret. And you can ask any question you have.",
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
"h": "Count your grown-ups.",
"sub": "One finger for each one you can go to.",
"say": "Let's try something. Hold up your hand. Think of a grown-up you can talk to, and put up one finger. Now think of another, and another, as many as you can.",
"beats": [
"Let's try something.",
"Hold up your hand.",
"Think of a grown-up you can talk to, and put up one finger.",
{
"t": "Now think of another, and another, as many as you can.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are loved.",
"sub": "Your grown-ups are here with you.",
"say": "If you ever feel very sad or worried, tell a grown-up. That's how help starts. If you are ever scared that someone is not safe, tell a grown-up right away. You are loved, and you have grown-ups all around you."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
},
"helper": {
"id": "mp-g-family-mental-health-helper",
"guide": "family-mental-health",
"side": "helper",
"title": "A Family Member's Mental Health Struggle",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NAMI (National Alliance on Mental Illness)",
"https://www.nami.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member's Mental Health Struggle",
"sub": "For the Grown-up",
"say": "When someone in your family is struggling with their mental health, this is for you. Maybe it's your partner, your child's grandparent, or you. Good enough is plenty, and others can walk with you."
},
{
"k": "big",
"h": "Kids notice. Name it simply.",
"sub": "An illness in how someone thinks and feels.",
"say": "Kids notice when a parent is struggling, even when no one says a word. Name it simply: an illness in how someone thinks and feels. Talk about it like any other illness, with hope and kindness."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"May think it is about them"
],
[
"Younger kids also",
"Try hard to be extra good"
],
[
"Grades 3 to 5",
"May take on caregiving"
],
[
"Older kids also",
"Embarrassed, keeping it secret"
]
],
"say": "Here's what this can look like. Younger children may think a parent's sadness or anger is about them. They may try very hard to be extra good. Older children may take on caregiving. They may feel embarrassed, or keep it a secret from friends.",
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
"h": "Plain, hopeful words",
"items": [
"\"Dad has an illness called depression.\"",
"\"He's getting help from a doctor.\"",
"\"You don't have to fix it.\""
],
"say": "Use plain, hopeful words. Dad has an illness called depression. It makes him feel very tired and sad, even when good things happen. He's getting help from a doctor. It's not because of anything you did, and you don't have to fix it."
},
{
"k": "card",
"title": "Will Dad get better? Will I get it?",
"body": "\"With help, many people feel much better.\"",
"say": "They may ask, is Dad going to get better? Try: with help, many people feel much better. He is working on it, and we are helping him. If they ask, will I get it too, try: not necessarily. If you ever feel very sad or worried, tell me, and we'll get help."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Normal kid time",
"Play, friends, practice"
],
[
"A few safe adults",
"Name them out loud"
],
[
"Honest, ongoing talk",
"Many small talks"
],
[
"Let kids stay kids",
"Grown-ups support grown-ups"
]
],
"say": "What helps. Protect time for normal kid things: play, friends, practice. Name a few adults they can go to. Keep explanations honest and ongoing, many small talks instead of one big one. And let your child stay a child. Lean on other grown-ups for support, so your child is never asked to keep the illness a secret or to be a parent's main support.",
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
"h": "Who are their safe grown-ups?",
"sub": "Picture them. Tell your child their names.",
"say": "Take a slow breath. Picture two or three grown-ups your child can go to, besides you. Plan to tell your child their names this week.",
"beats": [
"Take a slow breath.",
"Picture two or three grown-ups your child can go to, besides you.",
{
"t": "Plan to tell your child their names this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "Support for the whole family.",
"body": "NAMI family programs. A compassionate faith community. A steady school day.",
"say": "NAMI offers family programs and a helpline for families like yours. A faith community that meets mental illness with compassion can be a strong support for the whole family. Tell your child's teacher what they need to know. Kids in stressed homes often need school to feel predictable."
},
{
"k": "card",
"title": "If anyone is in crisis",
"body": "Call or text 988. Danger right now: 911.",
"say": "If anyone in your family is in crisis, call or text 988, any time. If there is danger right now, call 911. Keep your child close to a safe grown-up while you get help."
},
{
"k": "big",
"h": "Honest, hopeful, and surrounded.",
"sub": "Look after yourself too.",
"say": "Honest words, hope, and caring grown-ups all around. Check in on your child's feelings regularly, especially during hard stretches. And if the one struggling is you, reaching for help is a gift to your child too."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
}
},
{
"id": "addiction",
"ring": "mp-health",
"title": "A Family Member's Addiction",
"you": {
"id": "mp-g-addiction-you",
"guide": "addiction",
"side": "you",
"title": "A Family Member's Addiction",
"sideName": "For You",
"mins": 3,
"sources": [
[
"SAMHSA National Helpline",
"https://www.samhsa.gov/find-help/national-helpline"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member's Addiction",
"sub": "For You",
"say": "If someone in your family has an illness called addiction, this is for you. Maybe it's a parent, a grandparent, or a big brother or sister."
},
{
"k": "card",
"title": "Addiction is an illness.",
"body": "It makes a body and brain want alcohol or drugs.",
"say": "Addiction is an illness. It makes a person's body and brain want alcohol or drugs, even when it hurts them. It can make them act different, and that can feel scary. People can get better with help."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Mixed up",
"Mad",
"Sad",
"Embarrassed"
],
"say": "You might feel scared, mixed up, mad, sad, or embarrassed. Every feeling is okay. Your grown-up still loves you. The illness is not the same as how they feel about you."
},
{
"k": "big",
"h": "I didn't cause it. I can't control it. I can't cure it.",
"sub": "But I can take care of me.",
"say": "Here are some words to keep. I didn't cause it. I can't control it. I can't cure it. But I can take care of me. Now put your hand on your heart, and say them softly with me.",
"beats": [
"Here are some words to keep.",
"I didn't cause it.",
"I can't control it.",
"I can't cure it.",
"But I can take care of me.",
{
"t": "Now put your hand on your heart, and say them softly with me.",
"w": 12
}
]
},
{
"k": "points",
"h": "Taking care of you",
"items": [
[
"A safe grown-up",
"Someone you can always call"
],
[
"A number you know",
"By heart, like a song"
],
[
"A car rule",
"Ride only with safe drivers"
],
[
"Your own fun",
"Play, friends, and rest"
]
],
"say": "Taking care of you looks like this. Have a safe grown-up you can always call. Learn their phone number by heart, like a song. If a grown-up seems different from drinking or drugs, stay out of their car, and call your safe grown-up. And keep playing, resting, and having fun.",
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
"title": "You can always talk about this.",
"body": "Tell a parent, a grandparent, a teacher, or your school counselor.",
"say": "You never have to keep this a secret, even if someone asks you to. Grown-ups do the watching and the fixing. Your job is to be a kid. Tell a safe grown-up: a parent, a grandparent, a teacher, or your school counselor. If anyone hurts you, tell a safe grown-up, and keep telling until someone helps. It is never your fault."
},
{
"k": "big",
"h": "You are loved.",
"sub": "Grown-ups are here to help.",
"say": "Addiction is a grown-up problem, and grown-ups can get help for it. You are loved, and grown-ups are here to help."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
},
"helper": {
"id": "mp-g-addiction-helper",
"guide": "addiction",
"side": "helper",
"title": "A Family Member's Addiction",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"SAMHSA National Helpline",
"https://www.samhsa.gov/find-help/national-helpline"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Family Member's Addiction",
"sub": "For the Grown-up",
"say": "When someone in your family lives with addiction, this is for the grown-up helping a child through it. Maybe the person is your partner, your child's other parent, a grandparent, or you. Thank you for being here. Kids do best with the truth at their level, and a steady grown-up beside them."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Scared or confused by changes"
],
[
"Grades 3 to 5",
"Angry, embarrassed, protective"
],
[
"Every age",
"May quietly feel at fault"
]
],
"say": "Here's what this can look like. Young children notice when home feels unpredictable. A parent who acts different can leave them scared or confused. Older children may feel angry, embarrassed, or protective. Some feel responsible for keeping the peace. At every age, kids may quietly believe it is their fault.",
"cue": {
"at": [
1,
3,
5
]
}
},
{
"k": "words",
"h": "The truth at their level",
"items": [
"\"Mom has an illness called addiction.\"",
"\"She's getting help.\"",
"\"You didn't cause it.\""
],
"say": "Kids need the truth at their level, and permission to talk about it. Try this. Mom has an illness called addiction. It makes her body and brain want alcohol even when it hurts her. She's getting help. Say only what is true for your family. Then add the words that lift the weight. You didn't cause it, you can't control it, and you can't cure it. But you can take care of you."
},
{
"k": "card",
"title": "Why can't she just stop?",
"body": "Addiction changes how the brain works. People can get better with help.",
"say": "Kids ask hard questions. Why can't she just stop? Try, addiction changes how the brain works, so stopping is really hard. People can get better with help. Does she still love me? Yes. The illness is not the same as how she feels about you."
},
{
"k": "points",
"h": "Make a safety plan",
"items": [
[
"A safe grown-up",
"Someone they can always call"
],
[
"A number by heart",
"Practice it together"
],
[
"A car rule",
"No rides with anyone impaired"
],
[
"A safe place",
"A neighbor or a relative"
]
],
"say": "Make a safety plan together. Name a safe grown-up they can always call. Help them learn that phone number by heart. Make a car rule: no rides with anyone who has been drinking or using, and they call you instead, with no trouble at all. And name a safe place to go if home ever feels scary.",
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
"h": "Too heavy for a child",
"items": [
"Keeping secrets",
"Covering for anyone",
"Watching a parent"
],
"say": "A few things are too heavy for a child. Keeping secrets, or covering for anyone. And being put in charge of watching a parent. Instead, keep the promises you make, because trust may be shaky. Small promises, kept, rebuild it."
},
{
"k": "big",
"h": "Who is their safe grown-up?",
"sub": "Say the name out loud.",
"say": "Take a slow breath. Picture your child. Now say, out loud, the name of one safe grown-up your child could call any time.",
"beats": [
"Take a slow breath.",
"Picture your child.",
{
"t": "Now say, out loud, the name of one safe grown-up your child could call any time.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help for the whole family",
"body": "SAMHSA National Helpline: 1-800-662-4357, 24 hours. Danger right now: 911.",
"say": "You don't carry this alone. The SAMHSA National Helpline can point your family toward treatment and support, any time, at 1 800 662 4357. As kids get older, groups like Alateen can help. Many recovery paths draw on faith and community too, if that fits your family. If anyone is in danger, call 911. And if a child tells you someone hurt them, stay calm, believe them, and get help the same day."
},
{
"k": "big",
"h": "Truth, safety, and kept promises.",
"sub": "The full guide has more, whenever you want it.",
"say": "Relapse can happen. If it does, talk about it honestly, and keep the safety plan current. Celebrate recovery milestones in ways a child can enjoy. And look after yourself too. Truth, safety, and kept promises. The full guide has more, whenever you want it."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
}
},
{
"id": "dementia",
"ring": "mp-health",
"title": "A Grandparent with Dementia",
"you": {
"id": "mp-g-dementia-you",
"guide": "dementia",
"side": "you",
"title": "A Grandparent with Dementia",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Alzheimer's Association",
"https://www.alz.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Grandparent with Dementia",
"sub": "For You",
"say": "If your grandma or grandpa has an illness called dementia, this is for you. Maybe they forget things, or act in ways that seem new. Let's talk about it."
},
{
"k": "card",
"title": "Dementia makes the brain forget.",
"body": "Even names. The love is still there.",
"say": "Dementia is an illness that makes the brain forget things. Grandpa might ask the same question again and again. He might even forget your name. That is the illness. His love for you is still there, even when his memory isn't."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Confused",
"A little scared",
"Frustrated"
],
"say": "You might feel sad, confused, or a little scared. You might feel frustrated when Grandma asks the same thing again. If she seems silly or grumpy, that's the illness too. All your feelings are okay."
},
{
"k": "points",
"h": "Ways to be together",
"items": [
[
"Sing a song",
"Old songs stay the longest"
],
[
"Look at photos",
"Old ones are best"
],
[
"Hold hands",
"Love without words"
],
[
"Play a simple game",
"Like rolling a ball"
]
],
"say": "There are lots of ways to be together. Sing a song Grandma knows. Old songs often stay in the memory the longest. Look at old photos together. Hold hands. Or play a simple game, like rolling a ball back and forth.",
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
"h": "Picture a happy time together.",
"sub": "Then give yourself a gentle hug.",
"say": "Let's try something together. Close your eyes, if you want to. Think of one happy time with your grandma or grandpa. Now give yourself a big, gentle hug, and hold it.",
"beats": [
"Let's try something together.",
"Close your eyes, if you want to.",
"Think of one happy time with your grandma or grandpa.",
{
"t": "Now give yourself a big, gentle hug, and hold it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up how you feel.",
"body": "A parent, a teacher, your school counselor.",
"say": "Before a visit, your grown-up can tell you what might be different. You can ask questions, and you can take a break any time. Tell a grown-up how you feel: a parent, a grandparent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "Love is still there.",
"sub": "In a song, a smile, a hand to hold.",
"say": "Your grandparent's memory may change. Your love can still reach them, in a song, a smile, or a hand to hold. Love is still there."
}
]
},
"helper": {
"id": "mp-g-dementia-helper",
"guide": "dementia",
"side": "helper",
"title": "A Grandparent with Dementia",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"boss",
[
"Alzheimer's Association",
"https://www.alz.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Grandparent with Dementia",
"sub": "For the Grown-up",
"say": "When a grandparent your child loves has dementia, this is for you. You may be grieving too, for your own parent, a little at a time. Good enough is plenty."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Confused, or thinks Grandpa is mean"
],
[
"Grades 3 to 5",
"Embarrassed, sad, unsure how to act"
],
[
"Every age",
"Needs a heads-up before visits"
]
],
"say": "Here's what this can look like. Young children may be confused or scared by the changes. Some think Grandpa is being silly, or mean. Older children may feel embarrassed, sad about losing the grandparent they knew, or unsure how to act. At every age, kids do better when they know ahead of time what might be different.",
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
"h": "Plain, gentle words",
"items": [
"\"Grandpa has an illness called dementia.\"",
"\"It makes his brain forget things.\"",
"\"He still loves you.\""
],
"say": "Use plain, gentle words. Grandpa has an illness called dementia. It makes his brain forget things, even people he loves. He still loves you. Then let your child share their feelings, including frustration and sadness."
},
{
"k": "card",
"title": "Why doesn't Grandpa know my name?",
"body": "His illness hides some memories. His love is still there.",
"say": "Kids ask hard questions. Why doesn't Grandpa know my name? Try, his illness hides some memories. His love for you is still there, even when his memory isn't. Will he get better? Dementia doesn't get better, but we can still make happy moments together."
},
{
"k": "story",
"title": "I Know That One, Silly",
"lines": [
"Ruth had advanced dementia. She forgot my name.",
"I read her the first words she learned as a little girl.",
"\"Oh jeeze,\" she laughed. \"I know that one, silly!\""
],
"lesson": "The oldest memories often stay the longest.",
"note": "Names and details changed",
"hold": 2,
"say": "I visited Ruth for over a year. She had advanced dementia. She was always happy to see me, but when I read Scripture to her, she looked at me with a polite blank expression. One day I read the very first words of the Bible: In the beginning. Her eyes went wide, and she laughed out loud. Oh jeeze, she said, I know that one, silly! These were little girl words, learned so early the disease hadn't found them. She didn't remember my name when I left. But for a few minutes she remembered something better."
},
{
"k": "points",
"h": "Easy ways to connect",
"items": [
[
"Old songs",
"Music memories often last longest"
],
[
"Old photos",
"Look at them together"
],
[
"Familiar words",
"Rhymes, prayers, hymns"
],
[
"Holding hands",
"Love without words"
]
],
"say": "Like Ruth's first words, the oldest memories often stay longest. So give your child easy ways to connect. Sing songs Grandpa knows. Look at old photos together. If your family prays, familiar prayers and hymns often stay too. And holding hands says plenty without words.",
"cue": {
"at": [
2,
3,
4,
5
]
}
},
{
"k": "flow",
"h": "Before a visit",
"steps": [
[
"Tell them ahead",
"What might be different"
],
[
"Keep it short",
"With a simple plan"
],
[
"Let them choose",
"A break any time"
]
],
"say": "Before a visit, tell them what might be different. Keep visits short, with a simple plan, like one song and one game. Let them take a break any time, and never force a visit when a child is frightened. And try not to correct Grandpa over and over in front of your child. Joining his world, gently, teaches your child how.",
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
"h": "Which song could they share?",
"sub": "Picture it. Plan when to try it.",
"say": "Take a slow breath. Think of one song, photo, or game your child and their grandparent could share. Picture that moment, and plan when you'll try it.",
"beats": [
"Take a slow breath.",
"Think of one song, photo, or game your child and their grandparent could share.",
{
"t": "Picture that moment, and plan when you'll try it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Your grief counts too.",
"body": "Alzheimer's Association 24/7 Helpline: 1-800-272-3900.",
"say": "Your parent may be here, and not fully here. That is a real loss, and your grief counts too. The Alzheimer's Association has family resources and a helpline open day and night, at 1 800 272 3900. As the illness changes, keep preparing your child for what's new."
},
{
"k": "big",
"h": "Love is still there.",
"sub": "The full guide has more, whenever you want it.",
"say": "Memories may fade. Love can still reach across, in a song, a photo, or a hand to hold. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "disability",
"ring": "mp-health",
"title": "Disability in the Family",
"you": {
"id": "mp-g-disability-you",
"guide": "disability",
"side": "you",
"title": "Disability in the Family",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Disability in the Family",
"sub": "For You",
"say": "If your brother or sister, or someone else in your family, has a disability, this is for you. Maybe they use a wheelchair, or have autism, or need extra help with some things."
},
{
"k": "card",
"title": "Every brain and body is different.",
"body": "Some things are harder. Some things are easier.",
"say": "A disability means someone's body or brain works in a different way. Some things are harder for them, and some things are easier. A disability isn't like a cold, so you can't catch it. And nothing you did caused it."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Curious",
"Jealous",
"Frustrated",
"Embarrassed"
],
"say": "You might feel proud of them, or curious. Sometimes you might feel jealous, because they get lots of help and attention. Or frustrated, or embarrassed. All of those feelings are okay. You can love someone and still feel mad sometimes."
},
{
"k": "points",
"h": "You matter too",
"items": [
[
"Your own time",
"Just you and a grown-up"
],
[
"Your own fun",
"Your games and friends"
],
[
"Your feelings",
"Tell a grown-up"
]
],
"say": "You matter just as much. You can ask for your own time with a grown-up, just the two of you. You get your own games, friends, and fun. And you can tell a grown-up how you feel, even the mixed-up feelings.",
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
"h": "When kids ask",
"items": [
"\"He has autism. He loves trains.\""
],
"sub": "Say one true, kind thing.",
"say": "Sometimes other kids ask questions. You can have an easy answer ready. Like this: He has autism. He loves trains. Now say one true, kind thing about your brother or sister, out loud.",
"beats": [
"Sometimes other kids ask questions.",
"You can have an easy answer ready.",
"Like this: He has autism.",
"He loves trains.",
{
"t": "Now say one true, kind thing about your brother or sister, out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Grown-ups do the taking care of.",
"body": "Your job is to be a kid.",
"say": "Helping out a little can feel good. The big taking care of is a grown-up job. Your job is to be a kid. If your feelings get big, or stay sad or mad for a long time, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "Everyone in your family matters.",
"sub": "Including you.",
"say": "Every person in your family brings something special. Your brother or sister does. And so do you."
}
]
},
"helper": {
"id": "mp-g-disability-helper",
"guide": "disability",
"side": "helper",
"title": "Disability in the Family",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Disability in the Family",
"sub": "For the Grown-up",
"say": "When someone in your family has a disability, this is for the grown-up helping the other kids, the brothers and sisters. You're juggling a lot. Small, steady things help siblings most."
},
{
"k": "big",
"h": "Kids mirror your tone.",
"sub": "Clear, positive words at home.",
"say": "Start with how you talk about the disability at home. Kids mirror your tone. Clear, positive, matter-of-fact words help a sibling feel steady, and give them words to use with friends."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Curious, jealous, may fear catching it"
],
[
"Grades 3 to 5",
"Protective, embarrassed at times"
],
[
"Some kids",
"Pressure to be the easy child"
]
],
"say": "Here's what this can look like. Young siblings may be curious, worried they can catch it, or jealous of the attention. Older siblings may feel protective, and embarrassed at times. Some feel pressure to be the easy child, the one who never needs anything.",
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
"h": "Clear, positive words",
"items": [
"\"Your brother has autism.\"",
"\"His brain works in a different way.\"",
"\"Some things are harder, some are easier.\""
],
"say": "Try words like these. Your brother has autism. His brain works in a different way, so some things are harder for him and some things are easier. For a young child, add: you can't catch it, like a cold. Use your family's own words for your child's disability."
},
{
"k": "card",
"title": "Why does he get more attention?",
"body": "He needs more help with some things. You matter just as much.",
"say": "Kids ask honest questions. Why does he get more attention? Try, he needs more help with some things. You matter just as much, and I love our time together. Then make that true with time on the calendar."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"One-on-one time",
"Regular, even if short"
],
[
"A ready answer",
"For friends who ask"
],
[
"Sibling groups",
"Kids who understand"
],
[
"Celebrate each child",
"What each one brings"
]
],
"say": "What helps. Regular one-on-one time with each child, even if it's short. A simple answer for friends, practiced together, like: he has autism, he loves trains. Sibling support groups, where kids meet others who understand. And celebrating what each child brings.",
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
"h": "Too heavy for a sibling",
"items": [
"Being a caregiver",
"Shushing honest feelings",
"Being the \"easy\" child"
],
"say": "A few things are too heavy for a sibling. Being expected to be a caregiver. Having honest feelings shushed, even jealousy and frustration. And quiet pressure to be the easy child. A little helping can feel good. Their main job is being a kid."
},
{
"k": "big",
"h": "Plan ten minutes, just the two of you.",
"sub": "Picture it. Put it on the calendar.",
"say": "Take a slow breath. Picture your other child. Now choose ten minutes this week, just the two of you, and what you'll do together.",
"beats": [
"Take a slow breath.",
"Picture your other child.",
{
"t": "Now choose ten minutes this week, just the two of you, and what you'll do together.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Sadness or anger that lasts. Ask the school counselor or pediatrician.",
"say": "Revisit their questions as your kids grow and understand more. If a sibling's sadness or anger lasts, talk with the school counselor or their pediatrician, and look for a sibling support group. Many traditions teach that every person carries dignity and belongs in community. Your family can build on that, in your own way. And look after yourself too."
},
{
"k": "big",
"h": "Every child matters here.",
"sub": "The full guide has more, whenever you want it.",
"say": "Clear words, honest feelings, and time for each child. Every child matters here. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "food-worries",
"ring": "mp-health",
"title": "Worries About Food and Eating",
"you": {
"id": "mp-g-food-worries-you",
"guide": "food-worries",
"side": "you",
"title": "Worries About Food and Eating",
"sideName": "For You",
"mins": 3,
"sources": [
[
"ANAD Eating Disorders Helpline",
"https://anad.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Worries About Food and Eating",
"sub": "For You",
"say": "If eating feels hard for you lately, this is for you. Lots of kids have worries about food. You are not in trouble, and grown-ups can help."
},
{
"k": "words",
"h": "Eating can feel like",
"items": [
"A tight tummy",
"Scary foods",
"Worry about choking",
"Worry about my body"
],
"say": "Sometimes eating feels hard. Your tummy might feel tight at the table. Some foods might feel scary, or you might worry about choking or throwing up. Some kids worry about how their body looks. Those feelings are real, and it's okay to have them."
},
{
"k": "card",
"title": "Food is fuel.",
"body": "For your body and your brain.",
"say": "Food is fuel for your body and your brain. It helps you run, think, grow, and play. All kinds of foods can fit. Food is not good or bad, and you are never bad for how you eat."
},
{
"k": "big",
"h": "Your body helps you play.",
"sub": "Bodies come in all shapes.",
"say": "Bodies come in all shapes and sizes. Your body is the one that lets you hug, jump, sing, and laugh. It's not something you have to fix. It's yours, and it's working hard for you."
},
{
"k": "big",
"h": "Thank your body",
"sub": "Hand on your tummy. One slow breath.",
"say": "Let's try something together. Put a hand on your tummy. Take a slow breath in, and let it out. Now say out loud: Thank you, body, for helping me play.",
"beats": [
"Let's try something together.",
"Put a hand on your tummy.",
"Take a slow breath in, and let it out.",
{
"t": "Now say out loud: Thank you, body, for helping me play.",
"w": 10
}
]
},
{
"k": "points",
"h": "Tell a grown-up",
"items": [
[
"A parent or grandparent",
"Someone who takes care of you"
],
[
"A teacher",
"Or your school counselor"
],
[
"Your doctor",
"A helper for your body"
]
],
"say": "You don't have to fix this by yourself. Tell a grown-up how eating feels for you. It could be a parent or grandparent. It could be a teacher, or your school counselor. Your grown-up and your doctor will help make eating easier, one small step at a time.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "big",
"h": "You are loved, just as you are.",
"sub": "Eating can get easier.",
"say": "Eating can get easier with help. Meals can be a time to be together. You are loved, just as you are."
}
],
"crisis": [
"988: call or text, any time",
"911: fainting, chest pain, or confusion"
]
},
"helper": {
"id": "mp-g-food-worries-helper",
"guide": "food-worries",
"side": "helper",
"title": "Worries About Food and Eating",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"ANAD Eating Disorders Helpline",
"https://anad.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"The Emily Program (Minnesota)",
"https://emilyprogram.com"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Worries About Food and Eating",
"sub": "For the Grown-up",
"say": "If you're worried about how a child you love is eating, this is for you. You can ask for help before you're sure, and others can walk with you."
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"Few foods, gagging, fear of choking"
],
[
"Older kids",
"Good and bad foods, dieting talk"
],
[
"Watch for",
"Skipped meals, hidden food"
],
[
"Then",
"Call their doctor"
]
],
"say": "Picky eating is common. Losing weight, skipping meals, or fear of food is not. Younger children may eat very few foods, gag on textures, or fear choking or throwing up. When that keeps a child from growing, it may be ARFID, an eating disorder that is not about body image. Older children may start talking about good and bad foods, dieting, or their weight. Watch for skipped meals, hidden food, bathroom trips right after eating, or exercise that seems driven. If you see these, call their doctor.",
"cue": {
"at": [
2,
4,
5,
6
]
}
},
{
"k": "card",
"title": "A medical illness, not a choice.",
"body": "Eating disorders can start in grade school.",
"say": "Eating disorders are medical illnesses, not choices, and they can start in grade school. You don't have to be sure. If you're worried, their doctor is the first call."
},
{
"k": "big",
"h": "Notice your own words.",
"sub": "Kids copy how we talk about bodies.",
"say": "Before you talk with your child, notice your own words about food, weight, and bodies, yours and other people's. Kids copy them. Talk about bodies by what they can do, never by how much they weigh."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm not upset. I want to help.\"",
"\"How does your body feel at mealtimes?\"",
"\"What have you been hearing about bodies?\""
],
"say": "Words that help. I've noticed eating seems hard lately. I'm not upset. I want to help. How does your body feel at mealtimes? What have you been hearing about bodies and food? If they ask, am I fat, try: your body is growing just the way it should. What made you wonder that?"
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Regular meals and snacks",
"Together when you can"
],
[
"Food as fuel and fun",
"Not good or bad"
],
[
"Praise who they are",
"Effort, kindness, character"
],
[
"Follow the plan",
"Even when it is hard to watch"
]
],
"say": "What helps. Regular meals and snacks, eaten together when you can. Talk about food as fuel and fun, not good or bad. Praise effort, kindness, and character, not looks. And when their doctor and care team give you a plan, follow it, even when it's hard to watch.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Diets",
"Unless their doctor asks"
],
[
"Weight comments",
"About anyone, even you"
],
[
"Food as reward or punishment"
],
[
"Battles at the table"
]
],
"say": "Leave a few things out. Putting a child on a diet, unless their doctor asks for a specific plan. Comments about anyone's weight, including your own. Using food as a reward or a punishment. And battles at the table. Let the care team guide next steps.",
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
"h": "Picture the next meal.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture the next meal at your table. Now say, out loud, the words you'll use: I've noticed eating seems hard lately, and I want to help.",
"beats": [
"Take a slow breath.",
"Picture the next meal at your table.",
{
"t": "Now say, out loud, the words you'll use: I've noticed eating seems hard lately, and I want to help.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to call",
"body": "Their doctor first. 911 for fainting, chest pain, or confusion.",
"say": "Call their doctor for weight loss, missed growth, dizziness, fainting, throwing up after meals, or a child who eats only a few foods. The ANAD Eating Disorders Helpline is there on weekdays, at 1-888-375-7767. Call 911 for fainting, chest pain, or confusion. And look after yourself too. This is hard to watch, and you matter."
},
{
"k": "big",
"h": "The table is a place to belong.",
"sub": "Not a test.",
"say": "Many families give thanks before meals, or keep a tradition at the table. However your family gathers, a shared meal can be a place of belonging, not a test. Keep meals calm and steady. Recovery takes time, and families are a big part of it."
}
],
"crisis": [
"988: call or text, any time",
"911: fainting, chest pain, or confusion"
]
}
},
{
"id": "accident",
"ring": "mp-health",
"title": "A Car Accident or Sudden Injury",
"you": {
"id": "mp-g-accident-you",
"guide": "accident",
"side": "you",
"title": "A Car Accident or Sudden Injury",
"sideName": "For You",
"mins": 3,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Car Accident or Sudden Injury",
"sub": "For You",
"say": "If you were in a car crash, or someone you love got hurt all of a sudden, this is for you. What happened was scary. Lots of helpers are working hard, and your grown-ups are here."
},
{
"k": "words",
"h": "After a scare, you might",
"items": [
"Feel scared or shaky",
"Want to stay close",
"Have trouble sleeping",
"Play crash with toys"
],
"say": "After something scary, you might feel scared or shaky. You might want to stay close to your grown-up. It might be hard to fall asleep. You might play crash with your toys, over and over. All of that is okay. It's how kids make sense of scary things."
},
{
"k": "big",
"h": "It was not your fault.",
"sub": "Accidents happen.",
"say": "Some kids wonder if it was their fault. It was not. Accidents happen, and it was not because of anything you did or said."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Draw a picture",
"Or make a card"
],
[
"Get a hug",
"From your grown-up"
],
[
"Tell how you feel",
"Say it out loud"
]
],
"say": "Here are things you can do. Draw a picture, or make a card for the person who got hurt. Get a big hug from your grown-up. And tell someone how you feel. If your head hurts, or you feel funny or sleepy, tell a grown-up right away.",
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
"h": "Squeeze and let go",
"sub": "Like squeezing two lemons.",
"say": "Let's help your body feel calmer. Make two tight fists, like you're squeezing lemons. Squeeze, squeeze, squeeze. Now let go, and let your hands go floppy. Do it one more time, and take a slow breath.",
"beats": [
"Let's help your body feel calmer.",
"Make two tight fists, like you're squeezing lemons.",
"Squeeze, squeeze, squeeze.",
"Now let go, and let your hands go floppy.",
{
"t": "Do it one more time, and take a slow breath.",
"w": 10
}
]
},
{
"k": "card",
"title": "Riding in the car again",
"body": "Short rides first. A favorite song.",
"say": "Riding in the car might feel scary for a while. That's okay. You and your grown-up can take short rides first, with a favorite toy or a favorite song. Little by little, it gets easier."
},
{
"k": "big",
"h": "You have people with you.",
"sub": "Your grown-ups are right here.",
"say": "Scary feelings get smaller with time, and with people who love you. Tell a parent, a grandparent, a teacher, or your school counselor how you're doing. You can ask questions any time. You have people with you."
}
]
},
"helper": {
"id": "mp-g-accident-helper",
"guide": "accident",
"side": "helper",
"title": "A Car Accident or Sudden Injury",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"CDC HEADS UP: Concussion",
"https://www.cdc.gov/heads-up/"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Car Accident or Sudden Injury",
"sub": "For the Grown-up",
"say": "If a child you love was in a car crash, or someone in your family was suddenly hurt, this is for you. Your calm, simple, true words help them make sense of it."
},
{
"k": "card",
"title": "Get checked out too.",
"body": "Kids read your calm.",
"say": "If you were in the crash, get checked out yourself. Kids read your calm, and they need you steady. If a loved one is badly hurt, decide ahead of time what to share, and keep it true."
},
{
"k": "points",
"h": "What you may see",
"items": [
[
"Younger kids",
"Crash play, clinging, poor sleep"
],
[
"A secret worry",
"Was it my fault?"
],
[
"Older kids",
"Details, blame, will it happen again?"
],
[
"Later",
"Some seem fine, then struggle"
]
],
"say": "Young children may replay the crash in play, cling to you, have trouble sleeping, or act younger for a while. They may secretly worry it was their fault. Older children may want details, ask about blame, or worry it will happen again. And some seem fine at first, and struggle later.",
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
"h": "Words that help",
"items": [
"\"It was scary. Everyone is getting help now.\"",
"\"It was not because of anything you did.\"",
"\"I will tell you what I learn.\""
],
"say": "Words that help. We were in a car crash. It was scary. Everyone is getting help now. If they ask, is it my fault, say: no. Accidents happen, and it was not because of anything you did or said. If they ask, will they be okay, be honest: the doctors are doing everything they can. I will tell you what I learn."
},
{
"k": "card",
"title": "Watch for head injury signs.",
"body": "Even when a child seems fine.",
"say": "After any crash, watch for head injury signs, even when a child seems fine. Get medical care right away for a headache that gets worse, vomiting, unusual sleepiness, confusion, or acting strange after a bump to the head."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Steady routines",
"As much as you can"
],
[
"Short, calm car rides",
"A favorite toy or song"
],
[
"Prepare them for visits",
"Tell them what they will see"
],
[
"Draw, play, make a card",
"How kids make sense of it"
]
],
"say": "What helps. Keep routines as steady as you can. Expect fear of riding in the car, and go back to it in small steps: short, calm rides with a favorite toy or song. If a family member is hurt, visits or video calls can help when it's okay, after you prepare them for what they will see. And let them draw, play it out, or make a card for the person who got hurt. That's how kids make sense of scary things.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Graphic details or photos"
],
[
"Overheard grown-up talk",
"About blame or injuries"
],
[
"Making them talk",
"Let play do some talking"
]
],
"say": "Leave a few things out. Graphic details or photos. Letting them overhear grown-ups talk about blame or injuries. And forcing them to talk about it. Let play and drawing do some of the talking.",
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
"h": "Picture the next car ride.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture the next time you buckle your child into the car. Now say, out loud, the words you'll use: crashes don't happen very often, and we wear seat belts to stay safe.",
"beats": [
"Take a slow breath.",
"Picture the next time you buckle your child into the car.",
{
"t": "Now say, out loud, the words you'll use: crashes don't happen very often, and we wear seat belts to stay safe.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Fear, nightmares, or crash play past a month.",
"say": "Talk with their doctor if fear, nightmares, or behavior changes last more than a month. The crash site and anniversaries may bring feelings back. Some families pray for the person who got hurt. Others make a card, or give thanks for helpers like EMTs and nurses. Each one gives kids something to do with their worry. And get support for yourself too. You matter."
},
{
"k": "big",
"h": "True words. Close people. Small steps.",
"sub": "Back to ordinary, a little at a time.",
"say": "Tell them the truth in simple words, keep them close, and take small steps back to ordinary days. Your calm helps them find theirs."
}
]
}
},
{
"id": "bedwetting",
"ring": "mp-health",
"title": "Bedwetting",
"you": {
"id": "mp-g-bedwetting-you",
"guide": "bedwetting",
"side": "you",
"title": "Bedwetting",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Bedwetting",
"sub": "For You",
"say": "If you sometimes wake up in a wet bed, this is for you. Lots and lots of kids do. You are not in trouble."
},
{
"k": "big",
"h": "Your body is still learning.",
"sub": "It will get there.",
"say": "At night, your body is learning two big jobs. One is holding your pee all night. The other is waking you up when you need to go. Some bodies learn that later than others. It's not something you're doing wrong, and your body will get there."
},
{
"k": "words",
"h": "Lots of kids wet the bed",
"items": [
"In kindergarten",
"In first grade",
"Older kids too",
"It runs in families"
],
"say": "Lots of kids wet the bed, in kindergarten, in first grade, and older too. It often runs in families. Maybe someone in your family wet the bed when they were little. You're in good company."
},
{
"k": "card",
"title": "It is not your fault.",
"body": "You are not in trouble.",
"say": "Wetting the bed is not your fault. You're not doing it on purpose, and you're not in trouble. If you feel embarrassed, that's okay. Lots of kids feel that way. You are loved, just as you are."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Drinks earlier",
"Fewer right before bed"
],
[
"A bathroom trip",
"Right before sleep"
],
[
"Tell your grown-up",
"They can help, no fuss"
]
],
"say": "Here are things that help. Have your drinks earlier in the day, and fewer right before bed. Go to the bathroom right before you go to sleep. And if you wake up wet, tell your grown-up. They can help you clean up, with no fuss and no blame.",
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
"h": "Hand on your heart",
"sub": "Say: My body is learning.",
"say": "Let's try something. Put your hand on your heart. Take a slow breath in, and let it out. Now say out loud: My body is learning, and I am okay.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Take a slow breath in, and let it out.",
{
"t": "Now say out loud: My body is learning, and I am okay.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are loved, just as you are.",
"sub": "Your body will get there.",
"say": "Worried about a sleepover or camp? Your grown-up can make a quiet plan with you. It's private, and it's yours. Your body will get there. You are loved, just as you are."
}
]
},
"helper": {
"id": "mp-g-bedwetting-helper",
"guide": "bedwetting",
"side": "helper",
"title": "Bedwetting",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Bedwetting",
"sub": "For the Grown-up",
"say": "If a child you love wets the bed, this is for you. It's common, it's usually not a behavior problem, and your calm makes a big difference."
},
{
"k": "points",
"h": "What is going on",
"items": [
[
"Younger kids",
"Bodies still learning at night"
],
[
"Older kids",
"Embarrassment, sleepover worries"
],
[
"Often in families",
"Most kids outgrow it"
]
],
"say": "Many children in kindergarten and first grade still wet the bed. Their bodies are still learning to wake up for a full bladder, or to hold it all night. Older children may feel embarrassed, worry about sleepovers or camp, or hide wet sheets. Bedwetting often runs in families, and most kids outgrow it.",
"cue": {
"at": [
0,
2,
3
]
}
},
{
"k": "card",
"title": "Body development, not willpower.",
"body": "The shame often hurts more than the wetting.",
"say": "Remind yourself this is about body development, not willpower. Kids are not doing it on purpose. For older kids, the shame often hurts more than the wetting. So keep cleanup calm and matter-of-fact."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Your body is still learning, and it will get there.\"",
"\"This isn't your fault, and you're not in trouble.\"",
"\"Not from us. It's private.\""
],
"say": "Words that help. Lots of kids wet the bed. Your body is still learning, and it will get there. This isn't your fault, and you're not in trouble. If they ask, will my friends find out, try: not from us. It's private, and we'll make a plan for sleepovers together. And if you wet the bed as a child, telling them can help a lot."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Drinks earlier",
"Fewer right before bed"
],
[
"Bathroom before sleep",
"Every night"
],
[
"An easy cleanup routine",
"They can help, without blame"
],
[
"Ask their doctor",
"About options for older kids"
]
],
"say": "What helps. Drinks earlier in the day, and fewer right before bed. A bathroom trip right before sleep. Mattress covers, and an easy cleanup routine they can help with, without blame. And for older kids, ask their doctor about bedwetting alarms and other treatments.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Punishing or shaming"
],
[
"Teasing",
"Including from siblings"
],
[
"Sheets as punishment"
],
[
"Talking about it in front of others"
]
],
"say": "Leave a few things out. Punishing or shaming. Teasing, including from brothers and sisters. Making them wash sheets as a punishment. And talking about it in front of others, even family.",
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
"h": "Picture a wet morning.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture the next morning your child wakes up wet. Now say, out loud, the words you'll use: this isn't your fault, and we'll clean it up together.",
"beats": [
"Take a slow breath.",
"Picture the next morning your child wakes up wet.",
{
"t": "Now say, out loud, the words you'll use: this isn't your fault, and we'll clean it up together.",
"w": 10
}
]
},
{
"k": "card",
"title": "Sleepovers and camp",
"body": "A quiet plan: a discreet pull-up, or a trusted adult.",
"say": "Make a quiet plan for sleepovers and camp, together. That might be a discreet pull-up, or a trusted adult who knows. And celebrate effort, not only dry nights."
},
{
"k": "card",
"title": "When to call their doctor",
"body": "Dry for months, then wetting. Pain. Daytime accidents.",
"say": "Talk with their doctor if a child who was dry for months starts wetting again, if there is pain, or if there are daytime accidents too. Stress, constipation, and infections can all play a part. Talk with their doctor about treatment if bedwetting continues past about age seven, or if it's causing a lot of worry."
},
{
"k": "big",
"h": "Loved exactly as they are.",
"sub": "Wet sheets and all.",
"say": "Be patient with growth, and gentle with the body. Your child needs to hear it again and again: you are loved exactly as you are, wet sheets and all."
}
]
}
},
{
"id": "divorce",
"ring": "mp-family",
"title": "Divorce or Separation",
"you": {
"id": "mp-g-divorce-you",
"guide": "divorce",
"side": "you",
"title": "Divorce or Separation",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Divorce or Separation",
"sub": "For You",
"say": "If your parents are splitting up, or living in two different homes, this is for you. Lots of kids go through this. You're in good company."
},
{
"k": "big",
"h": "This is not your fault.",
"sub": "It is a grown-up decision.",
"say": "Here is the most important thing. This is not your fault. Nothing you said or did made it happen. It is a grown-up decision. And fixing it is a grown-up job, not a kid job."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Mad",
"Scared",
"All mixed up"
],
"say": "You might feel sad. You might feel mad, or scared, or all mixed up. You might wish your family could all be together again. Lots of kids wish that. All of those feelings are okay."
},
{
"k": "card",
"title": "You can love them both.",
"body": "You get to love both.",
"say": "Grown-ups can stop living together. They don't stop being your parents. You can love both of them, always. Loving one leaves plenty of love for the other."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"A calendar",
"Which home, which day"
],
[
"A cozy thing",
"In both homes"
],
[
"A grown-up to tell",
"Any time, again and again"
]
],
"say": "Some things can help. A calendar can show which home you'll be in each day. A favorite stuffed animal or blanket can help both homes feel cozy. And you can tell a grown-up who takes care of you how you feel: a mom or dad, a grandparent, a teacher, or your school counselor. You can ask questions as many times as you need.",
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
"h": "Hand on your heart",
"sub": "This is not my fault. I am loved.",
"say": "Let's try something together. Put your hand on your heart. Take a slow breath in, and let it out. Now say it softly: this is not my fault, and I am loved.",
"beats": [
"Let's try something together.",
"Put your hand on your heart.",
"Take a slow breath in, and let it out.",
{
"t": "Now say it softly: this is not my fault, and I am loved.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are loved in every home.",
"sub": "That never changes.",
"say": "Your family is changing shape. The love for you is staying. You are loved in every home."
}
]
},
"helper": {
"id": "mp-g-divorce-helper",
"guide": "divorce",
"side": "helper",
"title": "Divorce or Separation",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Divorce or Separation",
"sub": "For the Grown-up",
"say": "When a child you love is living through a divorce or separation, this is for you. You may be hurting too. A few steady words, said again and again, can carry a child a long way."
},
{
"k": "points",
"h": "What may be going on",
"items": [
[
"Younger kids",
"I caused it. I can fix it."
],
[
"Older kids",
"Angry, taking sides, worried"
],
[
"Hiding it",
"To protect a parent"
]
],
"say": "Here's what may be going on. Young children, kindergarten to second grade, often believe they caused the divorce, or that they can fix it. They may cling, act younger, or struggle at bedtime. Older children, grades three to five, may feel angry, take sides, or worry about practical things, like where their stuff will be. And some children hide their feelings to protect a parent they can see is sad.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "card",
"title": "Tell them together, if you can.",
"body": "One simple, shared message, before anything changes.",
"say": "If you can, tell them together, before anything changes. Agree as parents on one simple, shared message, even if you disagree on much else. It might sound like this. We have decided to live in different houses. This is a grown-up decision. It is not because of anything you did. We will always be your parents, and we will always love you."
},
{
"k": "points",
"h": "Questions they may ask",
"items": [
[
"Can you get back together?",
"It's normal to wish we could."
],
[
"Where will I live?",
"Days, homes, and how they see each"
],
[
"Is it my fault?",
"No, and say it more than once"
]
],
"say": "They may ask, can you get back together? Answer kindly and clearly: this decision is final, and it's normal to wish we could. They may ask, where will I live? Give the concrete plan: which days, which home, and how they'll see each parent. And whether they ask or not, say it more than once: this is not your fault.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"A calendar",
"Which home is which day"
],
[
"Comfort items in both homes",
"A blanket, a stuffed animal"
],
[
"Room to love both",
"Out loud, in both homes"
],
[
"Steady routines",
"Bedtime, meals, school"
]
],
"say": "What helps. A calendar on the wall, showing which home is which day. Comfort items in both homes, like a matching blanket or stuffed animal. Room to love both parents, out loud, in both homes. And routines that stay steady, like bedtime, meals, and school.",
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
"h": "Words that close the door",
"items": [
"Criticizing the other parent",
"Carry this message for me.",
"Who do you want to live with?"
],
"say": "Some things leave a child stuck in the middle. Criticizing the other parent in front of them, because half of who they are comes from that parent. Asking them to carry messages, like tell your dad he's late again. And asking them to choose sides. Keep grown-up conflict, money, and messages between the grown-ups."
},
{
"k": "big",
"h": "Picture the next handoff.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture the next time your child moves from one home to the other. Now say, out loud, the words you want them to hear: you can love us both, and you never have to choose.",
"beats": [
"Take a slow breath.",
"Picture the next time your child moves from one home to the other.",
{
"t": "Now say, out loud, the words you want them to hear: you can love us both, and you never have to choose.",
"w": 10
}
]
},
{
"k": "card",
"title": "Keep talking. Keep watching.",
"body": "School, sleep, and friendships.",
"say": "Keep talking. Feelings change over months and years, and new questions come with each new stage. Watch for changes in school, sleep, and friendships. If your family is part of a faith community, help your child know they still belong there, whatever changes. Talk with their pediatrician or the school counselor if there is ongoing conflict, big changes in behavior, or a child who seems stuck in the middle."
},
{
"k": "big",
"h": "Not your fault. Loved in both homes.",
"sub": "Say it again, and again.",
"say": "Look after your own heart too, with a friend, a counselor, or someone you trust. Your child needs to hear two things, many times: it's not your fault, and you are loved in both homes."
}
]
}
},
{
"id": "new-baby",
"ring": "mp-family",
"title": "A New Baby",
"you": {
"id": "mp-g-new-baby-you",
"guide": "new-baby",
"side": "you",
"title": "A New Baby",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A New Baby",
"sub": "For You",
"say": "If a new baby is coming to your family, or just got here, this is for you. You are becoming a big brother or a big sister. That's a big change."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Excited",
"Proud",
"Grumpy",
"Left out"
],
"say": "You might feel excited and proud. You might also feel grumpy, or left out, when everyone looks at the baby. Some days you might wish the baby would go back. Lots of big kids feel that. All of those feelings are okay."
},
{
"k": "card",
"title": "Love is not like pie.",
"body": "It does not get cut smaller. It grows.",
"say": "Here is something true. Love is not like pie. When a new baby comes, your grown-ups' love doesn't get cut into smaller pieces. It grows. There is room for the baby, and there is still room for you."
},
{
"k": "card",
"title": "Crying is how babies talk.",
"body": "You cried too, and look at you now.",
"say": "Babies cry a lot. That can be loud and annoying! Crying is how babies talk, because they don't have words yet. You cried too when you were a baby, and look at you now. Taking care of the baby is a grown-up job."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Help a little",
"Pick a song, find a toy"
],
[
"Ask for time",
"Just you and your grown-up"
],
[
"Tell how you feel",
"I feel left out."
]
],
"say": "Here are things you can do. You can help a little, if you want to, like picking a song for the baby or finding a toy. You can ask for special time, just you and your grown-up. And you can tell a grown-up who takes care of you how you feel, even the grumpy parts. You can say, I feel left out. Can we have a hug?",
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
"h": "Give yourself a big hug.",
"sub": "There is room for me.",
"say": "Let's try something together. Wrap your arms around yourself, and give a big squeeze. Take a slow breath, and let it go. Now say it out loud: there is room for me.",
"beats": [
"Let's try something together.",
"Wrap your arms around yourself, and give a big squeeze.",
"Take a slow breath, and let it go.",
{
"t": "Now say it out loud: there is room for me.",
"w": 10
}
]
},
{
"k": "big",
"h": "Love grows.",
"sub": "There is always room for you.",
"say": "Your family is growing, and so is the love. There is always room for you."
}
]
},
"helper": {
"id": "mp-g-new-baby-helper",
"guide": "new-baby",
"side": "helper",
"title": "A New Baby",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A New Baby",
"sub": "For the Grown-up",
"say": "When a child you love is about to become a big brother or big sister, this is for you. A new baby is joyful, and it is a real change for the child who was here first."
},
{
"k": "points",
"h": "What may be going on",
"items": [
[
"Younger kids",
"Baby talk, accidents, clinging"
],
[
"Older kids",
"Excited, then frustrated"
],
[
"Underneath",
"Will I be replaced?"
]
],
"say": "Here's what may be going on. Young children, kindergarten to second grade, may act younger for a while, with baby talk, potty accidents, or clinging. Older children, grades three to five, may be excited at first, then frustrated by the crying, less attention, or changed plans. Underneath, many children carry one quiet question: will I be replaced?",
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
"title": "Share the news with time to prepare.",
"body": "Not too early for young kids. Plan who stays with them.",
"say": "Share the news early enough to prepare, but not too early for young children, for whom months feel like forever. Plan who will stay with them during the birth, and tell them ahead of time. You might say: our family is growing. A baby is coming in the spring. You will be a big brother, and you will always be my special boy."
},
{
"k": "points",
"h": "Questions they may ask",
"items": [
[
"Will you still love me?",
"Love isn't like pie. It grows."
],
[
"Why is the baby always crying?",
"Crying is how babies talk."
],
[
"Can the baby go back?",
"Name the feeling. Stay warm."
]
],
"say": "They may ask, will you still love me? Try this. Love isn't like pie. It doesn't get cut into smaller pieces. It grows. They may ask, why is the baby always crying? Crying is how babies talk. You cried too, and look at you now. And some days they may ask, can the baby go back? Name the feeling, and stay warm: you're missing how it used to be. That makes sense.",
"cue": {
"at": [
0,
5,
8
]
}
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Show their baby pictures",
"Tell their own story"
],
[
"Give a real big-kid job",
"Pick the song, fetch the diaper"
],
[
"Protect one-on-one time",
"Even ten minutes"
],
[
"Notice gentle moments",
"And say so out loud"
]
],
"say": "What helps. Read books about new siblings, and show their own baby pictures, with the story of when they were new. Give them a real big-kid job, like picking the bedtime song or fetching a diaper. Protect one-on-one time without the baby, even ten minutes a day. And notice gentle, kind moments with the baby, and say so out loud.",
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
"h": "Save for later, or leave out",
"items": [
"A new bed or room right at the birth",
"Punishing regression",
"\"You're too big for that.\""
],
"say": "Some things make the change harder. Moving them out of their bed, or starting potty training or a new school right when the baby arrives. Space big changes out, before or well after. And punishing regression. Baby talk and accidents are a child asking, am I still yours? Meet it with warmth, not shame."
},
{
"k": "big",
"h": "Picture your child, just the two of you.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture your older child, just the two of you, with the baby asleep in another room. Now say, out loud, the words you want them to hear: there will always be room for you.",
"beats": [
"Take a slow breath.",
"Picture your older child, just the two of you, with the baby asleep in another room.",
{
"t": "Now say, out loud, the words you want them to hear: there will always be room for you.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Aggression toward the baby that doesn't ease.",
"say": "Jealousy is normal. Name it, and love them through it. Gently and firmly keep the baby safe, and stay close by. If aggression toward the baby doesn't ease with support, talk with your pediatrician or the school counselor. If your family has a welcoming ritual for new babies, give the big sibling a meaningful part in it."
},
{
"k": "big",
"h": "Love grows.",
"sub": "There is always room for them.",
"say": "And look after yourself too. Rest when you can, and ask for help. Good enough is plenty. Love grows, and there is always room for the child who was here first."
}
]
}
},
{
"id": "blended",
"ring": "mp-family",
"title": "A New Stepparent or Blended Family",
"you": {
"id": "mp-g-blended-you",
"guide": "blended",
"side": "you",
"title": "A New Stepparent or Blended Family",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A New Stepparent or Blended Family",
"sub": "For You",
"say": "If a new grown-up is joining your family, like a stepmom or a stepdad, or maybe new brothers and sisters too, this is for you. Families come in lots of shapes."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Happy",
"Shy",
"Grumpy",
"Not sure yet"
],
"say": "You might feel happy. You might feel shy, or grumpy, or just not sure yet. You might miss the way your family used to be. All of those feelings are okay, and they can change as time goes by."
},
{
"k": "card",
"title": "Everyone keeps their place.",
"body": "Your parents are still your parents.",
"say": "Here is something important. A new grown-up is not taking anyone's place. Your parents are still your parents. A stepparent is one more person who cares about you."
},
{
"k": "points",
"h": "Good to know",
"items": [
[
"Take your time",
"Getting close can go slow"
],
[
"You choose the name",
"Like their first name"
],
[
"Care about everyone",
"Your heart has room"
]
],
"say": "Here are some things that are good to know. You don't have to love a new grown-up right away. Getting close takes time. You can call them by their name, or whatever feels right to you. And you can care about everyone, your mom, your dad, and new people too. Your heart has room for all of them.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "big",
"h": "Picture your people.",
"sub": "Squeeze your hands, then let go.",
"say": "Let's try something together. Squeeze your hands tight, and then let go. Take a slow breath. Now picture all the people who love you, in every home, and smile at each one.",
"beats": [
"Let's try something together.",
"Squeeze your hands tight, and then let go.",
"Take a slow breath.",
{
"t": "Now picture all the people who love you, in every home, and smile at each one.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "Sometimes it's hard to share a room, or a grown-up, or a parent's time. Tell a grown-up who takes care of you how you feel: your mom or dad, a grandparent, a teacher, or your school counselor. And if something in any home doesn't feel okay, tell a safe grown-up, and keep telling until someone helps."
},
{
"k": "big",
"h": "More people to love you.",
"sub": "Room for everyone.",
"say": "New families grow slowly, a little at a time. There is room in your heart for everyone, and more people to love you."
}
]
},
"helper": {
"id": "mp-g-blended-helper",
"guide": "blended",
"side": "helper",
"title": "A New Stepparent or Blended Family",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A New Stepparent or Blended Family",
"sub": "For the Grown-up",
"say": "When a child you love is getting a new stepparent, or becoming part of a blended family, this is for you. You may be full of hope for this new family. Your child may need more time to get there, and that's okay."
},
{
"k": "points",
"h": "What may be going on",
"items": [
[
"Younger kids",
"May adjust faster"
],
[
"Older kids",
"Testing limits, grieving"
],
[
"Underneath",
"Is my parent being replaced?"
]
],
"say": "Here's what may be going on. Young children, kindergarten to second grade, may adjust faster, but they still need to hear that their parents are not being replaced. Older children, grades three to five, may resist, test limits, or grieve the family they used to have. Underneath, many children feel that liking a new grown-up would be disloyal to their other parent.",
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
"title": "Go slowly. Talk as grown-ups first.",
"body": "Roles, rules, and pace.",
"say": "Before big changes, talk as grown-ups about roles, rules, and pace. Then tell your child plainly. You might say: Jen and I are getting married. She's not replacing Mom. She's one more person who cares about you."
},
{
"k": "points",
"h": "Questions they may ask",
"items": [
[
"Do I have to call her Mom?",
"No. Whatever feels right."
],
[
"Do I have to share my room?",
"Answer honestly"
],
[
"Will you still have time for me?",
"Yes, and show it"
]
],
"say": "They may ask, do I have to call her Mom? Try: no, you can call her Jen, or whatever feels right to you. They may ask, do I have to share my room? Answer honestly, and look for ways to give each child some private space. And many wonder, quietly, will you still have time for me? Answer that one with your time.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Friendship first",
"Discipline stays with the parent"
],
[
"Time alone with each child",
"Just the two of you"
],
[
"Old traditions and new ones",
"Keep both"
],
[
"Family meetings",
"Everyone's voice counts"
]
],
"say": "What helps. The new grown-up builds friendship first, and leaves discipline to the parent at first. Protect time alone with each child, just the two of you. Keep old family traditions, and add new ones together. And hold family meetings where everyone's voice counts, including the youngest.",
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
"h": "Words that close the door",
"items": [
"Expecting instant love",
"Speaking badly about the other parent",
"\"Call him Dad now.\""
],
"say": "Some things slow the blending down. Expecting instant love, from the child or from the new grown-up. Speaking badly about the other parent, because a child hears it as being about them too. And choosing a name for them, like call him Dad now. Let the child lead on names and on closeness."
},
{
"k": "big",
"h": "Picture one small step.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture your child at the table, with everyone in this new family around them. Now say, out loud, the words you want them to hear: you can care about everyone, and you don't have to choose.",
"beats": [
"Take a slow breath.",
"Picture your child at the table, with everyone in this new family around them.",
{
"t": "Now say, out loud, the words you want them to hear: you can care about everyone, and you don't have to choose.",
"w": 10
}
]
},
{
"k": "card",
"title": "Blending often takes years.",
"body": "Celebrate small steps.",
"say": "Blending often takes years, not months. Celebrate small steps, like a shared joke or a game of cards. Some families mark the new beginning with a blessing or a ceremony, and children can have a real part in it, honoring both what was and what's beginning. If there is ongoing conflict, or your child seems very unhappy in either home, talk with the school counselor or your pediatrician."
},
{
"k": "big",
"h": "Go slowly. Room for everyone.",
"sub": "Small steps, over time.",
"say": "And be patient with yourself too. You are building something new. Go slowly, protect time with each child, and make room for everyone."
}
]
}
},
{
"id": "deployed",
"ring": "mp-family",
"title": "A Parent Deployed or Away for Work",
"you": {
"id": "mp-g-deployed-you",
"guide": "deployed",
"side": "you",
"title": "A Parent Deployed or Away for Work",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Military OneSource",
"https://www.militaryonesource.mil"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Parent Deployed or Away for Work",
"sub": "For You",
"say": "If your mom or dad, or another grown-up you love, is away for a long time, this is for you. Maybe they are in the military. Maybe they are away for work. Missing them is a big feeling."
},
{
"k": "words",
"h": "Every feeling is okay",
"items": [
"Sad",
"Mad",
"Worried",
"Proud",
"Lonely"
],
"say": "You might feel sad, or mad, or worried. You might feel proud of them, and lonely too, all on the same day. All of those feelings are okay. And them going away is not because of anything you did."
},
{
"k": "card",
"title": "You can ask.",
"body": "Is Dad safe? When is Mom coming home?",
"say": "You can ask your grown-ups anything. Is Dad safe? When is Mom coming home? Your grown-ups will tell you what they know. Ask as many times as you need."
},
{
"k": "points",
"h": "Ways to feel close",
"items": [
[
"A photo",
"By your bed"
],
[
"A paper chain",
"Tear off one loop each day"
],
[
"Drawings and letters",
"To send to them"
],
[
"Their voice",
"A story they recorded"
]
],
"say": "There are ways to feel close, even far apart. A photo by your bed. A paper chain, where you tear off one loop each day until they come home. Drawings and letters to send. And their voice, reading you a story they recorded.",
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
"h": "Being a kid is your job.",
"sub": "The grown-ups have the rest.",
"say": "While they're away, you don't have to be the grown-up at home. Helping is nice. But being a kid is your job. The grown-ups have the rest."
},
{
"k": "big",
"h": "Hug yourself tight.",
"sub": "Send them a goodnight wish.",
"say": "Let's try something. Wrap your arms around yourself, like a big hug. Squeeze tight. Now think of your grown-up who is away, and send them a goodnight wish.",
"beats": [
"Let's try something.",
"Wrap your arms around yourself, like a big hug.",
"Squeeze tight.",
{
"t": "Now think of your grown-up who is away, and send them a goodnight wish.",
"w": 10
}
]
},
{
"k": "big",
"h": "Love reaches all the way.",
"sub": "Stay close to your grown-ups here.",
"say": "When you miss them, tell a grown-up who is with you: a parent, a grandparent, a teacher, or your school counselor. Some families say a goodnight prayer for the one who is away. Love reaches all the way to where they are."
}
]
},
"helper": {
"id": "mp-g-deployed-helper",
"guide": "deployed",
"side": "helper",
"title": "A Parent Deployed or Away for Work",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Military OneSource",
"https://www.militaryonesource.mil"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Parent Deployed or Away for Work",
"sub": "For the Grown-up",
"say": "When a parent is deployed, or away for work for a long stretch, this is for you. Maybe you're the one at home holding everything together. Maybe you're the one leaving. Either way, your child can do well with steady routines and a way to stay close."
},
{
"k": "big",
"h": "Tell them before, with a calendar.",
"sub": "Something they can see and touch.",
"say": "Tell your child before the parent leaves, in plain words, with a calendar they can see. Dad is going away for work for three months. We'll video call on Sundays, and we can send him drawings. Knowing the plan helps more than a surprise goodbye."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Time is hard to picture"
],
[
"Grades 3 to 5",
"May worry, or try to be the grown-up"
],
[
"Every age",
"Ups and downs at each stage"
]
],
"say": "Young children don't understand time well. Three months means little, so make it something they can see, like a paper chain or a jar of marbles to count down. Older children may worry about the parent's safety, or feel extra responsible at home. Gently hand that job back to the grown-ups. At every age, expect ups and downs at leaving, in the middle, and at coming home.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "points",
"h": "Stay connected",
"items": [
[
"Recorded bedtime stories",
"Made before leaving"
],
[
"Letters and drawings",
"Sent both ways"
],
[
"Calls on a set day",
"Something to count on"
],
[
"A shared journal",
"Added to by both"
]
],
"say": "Plan ways to stay connected, ideally before the leaving day. Record the away parent reading bedtime stories. Send letters and drawings both ways. Set a regular day for calls, so there's something to count on. And try a shared journal you both add to.",
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
"title": "Is Dad safe?",
"body": "Be honest about what you know. Share how he stays safe.",
"say": "Your child may ask, is Dad safe? Be honest and reassuring about what you know, and share how he stays safe. If they ask why he has to go, try this. His job is important, and he's helping people. He misses you already."
},
{
"k": "points",
"h": "What helps at home",
"items": [
[
"Steady routines",
"Same bedtime, same meals"
],
[
"A photo by their bed"
],
[
"Mark the calendar together"
],
[
"Plan the homecoming",
"Something to look forward to"
]
],
"say": "Keep home routines steady. The same bedtime, the same meals, the same small rituals. Put a photo of the away parent by their bed. Mark the calendar together. And plan a homecoming celebration, so there's something good to look forward to. One more thing: keep scary news about where a parent is serving out of sight and earshot.",
"cue": {
"at": [
0,
2,
3,
4
]
}
},
{
"k": "big",
"h": "Who can share the load?",
"sub": "Picture them. Plan to ask.",
"say": "Take a slow breath. Holding a home together alone is a lot. Think of one person who could take one thing off your plate this week. Picture them, and plan to ask.",
"beats": [
"Take a slow breath.",
"Holding a home together alone is a lot.",
"Think of one person who could take one thing off your plate this week.",
{
"t": "Picture them, and plan to ask.",
"w": 10
}
]
},
{
"k": "card",
"title": "Coming home can be bumpy.",
"body": "Give everyone time to readjust.",
"say": "Reunions can be bumpy. A child may cling, or hang back, or test the rules again. Routines changed while the parent was away, and everyone needs time to readjust. Go slowly, and keep it gentle."
},
{
"k": "card",
"title": "You have people with you in this.",
"body": "A teacher. The school counselor. Military OneSource.",
"say": "Let your child's teacher know, so school can watch for stress around news events. Military families can reach Military OneSource for counseling. Some families pray for the away parent each night, and it can give children a way to feel close. And look after yourself too. Your steadiness is a gift to your child."
},
{
"k": "big",
"h": "Steady at home. Close from far away.",
"sub": "The full guide has more, whenever you want it.",
"say": "Steady routines at home, and ways to stay close from far away. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "jail",
"ring": "mp-family",
"title": "A Parent in Jail or Prison",
"you": {
"id": "mp-g-jail-you",
"guide": "jail",
"side": "you",
"title": "A Parent in Jail or Prison",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Sesame Workshop",
"https://sesameworkshop.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Parent in Jail or Prison",
"sub": "For You",
"say": "If your mom or dad, or someone you love, is in jail or prison, this is for you. You might have a lot of feelings about it. That's okay."
},
{
"k": "big",
"h": "They made a bad choice. They still love you.",
"sub": "People are more than their worst choices.",
"say": "When a grown-up breaks a law, sometimes they have to stay in a place called jail or prison for a while. Your grown-up made a bad choice. They still love you. People are more than their worst choices."
},
{
"k": "words",
"h": "Every feeling is okay",
"items": [
"Sad",
"Mad",
"Embarrassed",
"Worried",
"Missing them"
],
"say": "You might feel sad, or mad, or embarrassed. You might worry about them, or miss them a lot. You can love them and still feel mad. All of it is okay. And this is not your fault. You didn't cause it, and fixing it is a grown-up job."
},
{
"k": "points",
"h": "Ways to stay close",
"items": [
[
"A letter or drawing",
"To send"
],
[
"A phone call",
"When your grown-ups say"
],
[
"A visit",
"If it is safe"
]
],
"say": "If your grown-ups say it's okay, there may be ways to stay close. A letter or a drawing to send. A phone call. Or a visit. Your grown-ups will tell you what to expect.",
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
"title": "You choose who to tell.",
"body": "You can hold your head high.",
"say": "You don't have to tell everyone. You can choose who to tell. And you can hold your head high. This is not a secret you have to carry by yourself."
},
{
"k": "big",
"h": "Squeeze and let go.",
"sub": "Think of a grown-up you can talk to.",
"say": "Let's try something. Make two tight fists, and squeeze. Now let go, and let your hands go soft. Think of one grown-up you can talk to about this.",
"beats": [
"Let's try something.",
"Make two tight fists, and squeeze.",
"Now let go, and let your hands go soft.",
{
"t": "Think of one grown-up you can talk to about this.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are loved, just as you are.",
"sub": "Tell a safe grown-up how you feel.",
"say": "Talk to a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. If anyone ever hurts you, tell a safe grown-up, and keep telling until someone helps. It is never your fault. You are loved, just as you are."
}
]
},
"helper": {
"id": "mp-g-jail-helper",
"guide": "jail",
"side": "helper",
"title": "A Parent in Jail or Prison",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Sesame Workshop",
"https://sesameworkshop.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Parent in Jail or Prison",
"sub": "For the Grown-up",
"say": "When a child's parent is in jail or prison, this is for you. You may be carrying a lot: your own feelings, the practical changes, maybe anger or hurt. What your child needs most from you is the truth, told gently."
},
{
"k": "big",
"h": "Tell the truth, simply.",
"sub": "Kids who are lied to often find out.",
"say": "Tell the truth. Kids who are lied to often find out, and trust is harmed. Young children are sometimes told a parent is away at school or working. Simple truth works better. Dad made a choice that broke a law. Now he has to stay in a place called prison for a while. He still loves you."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Simple words, said again"
],
[
"Grades 3 to 5",
"Shame, anger, worry about teasing"
],
[
"Every age",
"Feelings around visits and court"
]
],
"say": "Young children need simple words, and they may need them many times. Older children may feel shame, anger, worry about teasing, or confusion about the parent's choices. At every age, expect feelings around visits, court dates, and release.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "points",
"h": "Separate the person from the choice",
"items": [
[
"Is Dad a bad person?",
"He made a bad choice."
],
[
"Can I see him?",
"Answer honestly about visits"
],
[
"Is it my fault?",
"Never. Say it often."
]
],
"say": "Children will ask hard questions. Is Dad a bad person? Try this. Dad made a bad choice. People are more than their worst choices. Can I see him? Answer honestly about visits, calls, or letters. And say often, this is not your fault.",
"cue": {
"at": [
1,
5,
7
]
}
},
{
"k": "card",
"title": "Privacy, not shame.",
"body": "Decide who knows. Help them choose who to tell.",
"say": "Before you talk, decide what is safe and appropriate to share, and who else knows. Privacy is fine. Shame is a different thing. Help your child choose a few safe people to talk to, so this is never a secret they carry alone."
},
{
"k": "points",
"h": "Before a visit",
"items": [
[
"Security",
"Waiting, and a security check"
],
[
"Rules",
"What they can bring and do"
],
[
"The room",
"What it looks like"
]
],
"say": "If it's safe for your child to stay connected, letters, calls, and visits can help. Prepare them before a visit. Security, and how long the wait may be. The rules, like what they can bring and do. And what the room looks like. Then talk afterward. Visits can stir big feelings.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "big",
"h": "Your feelings are real too.",
"sub": "Then make room for theirs.",
"say": "Take a slow breath. You may feel angry, hurt, or worn out, and that's real. Notice it. Now picture your child, and say quietly, you can love your dad and still feel mad.",
"beats": [
"Take a slow breath.",
"You may feel angry, hurt, or worn out, and that's real.",
"Notice it.",
{
"t": "Now picture your child, and say quietly, you can love your dad and still feel mad.",
"w": 10
}
]
},
{
"k": "points",
"h": "Leave these out",
"items": [
[
"Lying about where they are"
],
[
"Contempt for the parent"
],
[
"Grown-up details",
"Court and money stay with grown-ups"
]
],
"say": "Leave a few things out. Lying about where the parent is. Speaking about the parent with contempt, even when you're hurt, because a child can take it to heart. And grown-up details, like court and money, which belong with the grown-ups.",
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
"title": "Others can walk with you.",
"body": "A teacher. The school counselor. A child counselor.",
"say": "Let your child's teacher know privately, and be ready for Father's Day or Mother's Day projects to sting. If you see big changes in behavior, or signs of shame and withdrawal, reach out to the school counselor or a child counselor. Many traditions speak of mercy and restoration, and a child can hold both love for a parent and the truth about their choices. And find support for yourself too."
},
{
"k": "big",
"h": "The truth, with love.",
"sub": "The full guide has more, whenever you want it.",
"say": "The truth, told gently, and love that stays. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "foster",
"ring": "mp-family",
"title": "Foster Care or Adoption",
"you": {
"id": "mp-g-foster-you",
"guide": "foster",
"side": "you",
"title": "Foster Care or Adoption",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Welfare Information Gateway",
"https://www.childwelfare.gov"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Foster Care or Adoption",
"sub": "For You",
"say": "If you live with a foster family, or you were adopted, or you live with a grandma, an aunt, or other family, this is for you. Families are made in lots of ways."
},
{
"k": "big",
"h": "Your story matters.",
"sub": "You can ask about it anytime.",
"say": "Every family has a story, and so do you. Maybe you remember your birth family. Maybe you don't. Your story is yours, and your grown-ups can help you learn it."
},
{
"k": "words",
"h": "Every feeling is okay",
"items": [
"Happy",
"Sad",
"Mad",
"Mixed up",
"Missing someone"
],
"say": "You might feel happy and sad at the same time. You might miss your birth family, and love your family now. You can love more than one family. You might wonder why. All of those feelings are okay."
},
{
"k": "card",
"title": "It was never about you.",
"body": "Not something you did. Not something you are.",
"say": "If you wonder why you couldn't stay with your birth family, here is something true. Sometimes grown-ups can't take care of a child, for grown-up reasons. It was never because of anything you did, or anything about you."
},
{
"k": "card",
"title": "You can ask.",
"body": "Why? Will I move again? Where is my birth mom?",
"say": "You can ask your grown-ups anything. Why? Will I move again? Where is my birth mom? They will tell you what they know, and tell you more when they can. Birthdays and holidays can bring big feelings too."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "My story matters. I matter.",
"say": "Let's try something. Put your hand on your heart. Feel it beating. Say quietly, my story matters. I matter.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Feel it beating.",
"Say quietly, my story matters.",
{
"t": "I matter.",
"w": 10
}
]
},
{
"k": "big",
"h": "There is room for all of you.",
"sub": "Tell a safe grown-up how you feel.",
"say": "When feelings get big, tell a grown-up who takes care of you: a parent or foster parent, a grandparent, a teacher, or your school counselor. If anyone ever hurts you, tell a safe grown-up, and keep telling until someone helps. It is never your fault. There is room for all of you, and all of your story."
}
]
},
"helper": {
"id": "mp-g-foster-helper",
"guide": "foster",
"side": "helper",
"title": "Foster Care or Adoption",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Welfare Information Gateway",
"https://www.childwelfare.gov"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Foster Care or Adoption",
"sub": "For the Grown-up",
"say": "Whether you are a foster parent, an adoptive parent, a grandparent, or a relative raising a child, this is for you. You are helping a child carry two things at once: loss, and love. Both can live together."
},
{
"k": "big",
"h": "Their story, told truthfully.",
"sub": "At their level, from early on.",
"say": "Share the child's story with them, truthfully and at their level, from early on. A story told early, in small pieces, becomes part of who they are. A story found out later can feel like a secret. Before you talk, know the child's story and what is appropriate to share."
},
{
"k": "words",
"h": "A simple story to return to",
"items": [
"\"You grew in your birth mom's body.\"",
"\"She couldn't take care of any baby then.\"",
"\"We are so glad you did.\""
],
"say": "Young children need a simple, loving story to return to again and again. Something like this. You grew in your birth mom's body. She couldn't take care of any baby then, so you came to live with us. We are so glad you did."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Simple questions, a story to repeat"
],
[
"Grades 3 to 5",
"Wondering why, worry about moving"
],
[
"Every age",
"Birthdays and holidays stir it up"
]
],
"say": "Young children may have simple questions, and want the same story many times. Older children may wonder why, have feelings about birth parents, or worry about moving again. At every age, expect big feelings around birthdays, holidays, and family projects.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "card",
"title": "Two hard questions",
"body": "Why didn't she keep me? Will I have to leave?",
"say": "Two questions come up often. Why didn't she keep me? Answer honestly and without blame, and make clear it was never about the child. Will I have to leave? For a child in foster care, be honest about what you know and what you don't, and promise to tell them what you can. Promise only what you can keep."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A life book",
"Photos and stories"
],
[
"All their feelings",
"Loyalty to birth family too"
],
[
"Respect for birth family",
"Even when the story is hard"
]
],
"say": "Some things help. A life book, with photos and stories from every part of their life. Welcome all their feelings, including loyalty to their birth family. And speak about birth parents with respect, even when the story is hard. A child can hear what you say about where they came from as something about themselves.",
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
"h": "Loss and love can live together.",
"sub": "For them, and for you.",
"say": "Take a slow breath. Picture your child missing their birth family. Notice what you feel. Now say quietly, your love for them takes nothing from me.",
"beats": [
"Take a slow breath.",
"Picture your child missing their birth family.",
"Notice what you feel.",
{
"t": "Now say quietly, your love for them takes nothing from me.",
"w": 10
}
]
},
{
"k": "card",
"title": "Family projects can be hard.",
"body": "Ask teachers for flexible options.",
"say": "Family tree assignments, baby photo days, and Mother's Day projects can be hard. Talk with your child's teacher ahead of time about flexible options. Many traditions speak of adoption and belonging as holy, and if your family has a faith, it may help your child know they are claimed and cherished."
},
{
"k": "card",
"title": "Bring in help.",
"body": "Adoption-competent counselors help with trauma, attachment, and identity.",
"say": "Many children in foster care or adoption have lived through hard things. Adoption-competent counselors help with trauma, attachment, and identity, and your caseworker or agency can help you find one. If your child ever tells you someone hurt them, stay calm, believe them, and get help the same day. And find support for yourself too."
},
{
"k": "big",
"h": "Their story, and room for all of it.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their story, told truthfully, and room for all of it. The story gets retold, and deepened, as they grow. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "money",
"ring": "mp-family",
"title": "Money Worries or a Job Loss",
"you": {
"id": "mp-g-money-you",
"guide": "money",
"side": "you",
"title": "Money Worries or a Job Loss",
"sideName": "For You",
"mins": 2,
"sources": [
"seligman",
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Money Worries or a Job Loss",
"sub": "For You",
"say": "If the grown-ups at your house are worried about money, or someone's job ended, this is for you. You can watch it with your grown-up."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Worried",
"Sad",
"Mixed up",
"Bad about asking"
],
"say": "Kids can tell when grown-ups are worried. You might feel worried too, or sad, or mixed up. You might feel bad about asking for things. All of those feelings are okay."
},
{
"k": "big",
"h": "Money is a grown-up job.",
"sub": "Your job is to be a kid.",
"say": "Here is something important. Money problems are grown-up problems, and grown-ups are working on them. It is not your fault. It is not your job to fix it. Your job is to be a kid."
},
{
"k": "card",
"title": "What you need, and lots of love.",
"body": "Your grown-ups are working on it.",
"say": "Your grown-ups are working hard to make sure you have what you need. And love does not cost anything. Your family has each other."
},
{
"k": "big",
"h": "Squeeze and let go",
"sub": "Tight hands, then soft hands.",
"say": "When a worry feels big, try this with me. Squeeze your hands into tight fists. Hold them tight, tight, tight. Now let go, and let your hands go soft. Do it one more time, slowly.",
"beats": [
"When a worry feels big, try this with me.",
"Squeeze your hands into tight fists.",
"Hold them tight, tight, tight.",
"Now let go, and let your hands go soft.",
{
"t": "Do it one more time, slowly.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Tell a grown-up",
"A parent, a teacher, a counselor"
],
[
"Help in a small way",
"Like setting out spoons"
],
[
"Find three good things",
"At bedtime"
]
],
"say": "Here are things you can do. Tell a grown-up how you feel: a parent, a grandparent, a teacher, or your school counselor. It is always okay to ask questions. You can help in a small way, like setting out spoons. And at bedtime, tell your grown-up three good things from today.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "big",
"h": "Your family has each other.",
"sub": "That's worth a lot.",
"say": "Money can go up and down. Your family has each other, and you are loved. That is worth a lot."
}
]
},
"helper": {
"id": "mp-g-money-helper",
"guide": "money",
"side": "helper",
"title": "Money Worries or a Job Loss",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"seligman",
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Money Worries or a Job Loss",
"sub": "For the Grown-up",
"say": "If your family is in a tight season with money, or a job has ended, this is for you. You can help your child feel safe, even now."
},
{
"k": "points",
"h": "What kids notice",
"items": [
[
"Younger kids",
"Overhear, then ask for less"
],
[
"Older kids",
"Moving, activities, friends"
],
[
"Every age",
"They feel the stress"
]
],
"say": "Kids notice stress, even when we try to hide it. Younger children may overhear grown-ups and start to worry. They may ask for fewer things, or feel guilty asking. Older children may worry about moving or losing an activity, or feel embarrassed next to their friends. Every child feels the stress in the house, so a little honest talk helps.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "card",
"title": "Simple truth, at their level.",
"body": "Decide first what stays between grown-ups.",
"say": "Before you talk, decide what your child needs to know, and what stays between the grown-ups. Kids need simple truth. They don't need the numbers, the bills, or the fear. Then pick a calm moment, not right after a hard phone call."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"We are being careful with money for a while.\"",
"\"We will always make sure you have what you need.\"",
"\"We have each other. We are figuring it out.\""
],
"say": "Words that help. Dad's job ended, so we are being careful with money for a while. We will always make sure you have what you need. If they ask, are we poor, try this. We have less money right now. We have each other, and we are figuring it out together."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Fun that costs nothing",
"Library, parks, game nights"
],
[
"Talk about needs and wants",
"Simple and calm"
],
[
"A small, real job",
"Not the grown-up worry"
],
[
"Three good things",
"At bedtime"
]
],
"say": "What helps. Lean into fun that costs nothing: the library, the park, a game night. Talk simply about needs and wants. Let your child help in a small, real way, like packing lunches, without carrying the grown-up worry. And at bedtime, share three good things from the day, so they notice what is still good.",
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
"h": "Words that close the door",
"items": [
"Money fears in detail",
"\"Do you know what that costs?\"",
"Answers that dodge the question"
],
"say": "Some words close the door. Sharing money fears in detail hands a child a weight they can't lift. Making them feel guilty for asking teaches them to hide their needs. And dodging a hard question leaves them guessing. If soccer has to stop, be honest, and look for something that costs nothing together."
},
{
"k": "big",
"h": "Name one thing your family still has.",
"sub": "Say it out loud.",
"say": "Take one slow breath, and let your shoulders drop. Think of one thing your family still has today. Say it out loud, quietly, to yourself.",
"beats": [
"Take one slow breath, and let your shoulders drop.",
"Think of one thing your family still has today.",
{
"t": "Say it out loud, quietly, to yourself.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help is close by.",
"body": "Dial 211. Ask the school counselor.",
"say": "Others can help you carry this. Dialing 211 connects families with local help for food, rent, and utilities. The school counselor often knows quiet ways to help, like field trip costs. Many faith communities quietly help families in hard seasons too. Talk with the school counselor or your child's pediatrician if worry or sadness lasts for weeks."
},
{
"k": "big",
"h": "Less money. Just as much love.",
"sub": "Keep reassuring them as things change.",
"say": "Look after yourself too. Your steadiness is a gift to your child. Keep reassuring them as things change. Your family may have less money for a while, and just as much love."
}
]
}
},
{
"id": "home-loss",
"ring": "mp-family",
"title": "Losing a Home",
"you": {
"id": "mp-g-home-loss-you",
"guide": "home-loss",
"side": "you",
"title": "Losing a Home",
"sideName": "For You",
"mins": 2,
"sources": [
[
"SchoolHouse Connection",
"https://schoolhouseconnection.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Losing a Home",
"sub": "For You",
"say": "If your family had to leave your home, and you are staying somewhere new for now, this is for you. You can watch it with your grown-up."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Scared",
"Mad",
"Shy about it"
],
"say": "Leaving a home is a big change. You might feel sad, or scared, or mad. You might miss your room and your things. You might not want friends to know. All of those feelings are okay."
},
{
"k": "big",
"h": "It is not your fault.",
"sub": "Grown-ups are working on it.",
"say": "Here is something important. This is not your fault. It is a grown-up problem, and grown-ups are working on it. Lots of families go through hard times like this. It is a hard time, and your family is still your family."
},
{
"k": "points",
"h": "You can ask",
"items": [
[
"Where will I sleep?"
],
[
"Who will be with me?"
],
[
"Can my special things come?"
],
[
"Can I stay at my school?"
]
],
"say": "You can ask your grown-up questions. Where will I sleep? Who will be with me? Can my special things come too? Can I stay at my school? Most of the time, you can keep going to your same school.",
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
"h": "Hold something soft",
"sub": "And think of someone who loves you.",
"say": "Let's try this together. Hold something soft, or put your hand on your heart. Take a slow breath in, and let it out. Think of one person who loves you. Say their name, nice and quiet.",
"beats": [
"Let's try this together.",
"Hold something soft, or put your hand on your heart.",
"Take a slow breath in, and let it out.",
"Think of one person who loves you.",
{
"t": "Say their name, nice and quiet.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "You don't have to keep big feelings inside. Tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. There can be one grown-up at school who knows, and helps."
},
{
"k": "big",
"h": "Home is where your people are.",
"sub": "Your family is together.",
"say": "Your bed might be somewhere new for a while. You still have your people, and you are loved, wherever you sleep tonight."
}
]
},
"helper": {
"id": "mp-g-home-loss-helper",
"guide": "home-loss",
"side": "helper",
"title": "Losing a Home",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"SchoolHouse Connection",
"https://schoolhouseconnection.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Losing a Home",
"sub": "For the Grown-up",
"say": "If your family has lost a home, or is staying somewhere for now, this is for you. This is a hard situation, not a failure, and you can help your child feel steady through it."
},
{
"k": "points",
"h": "What kids need to know",
"items": [
[
"Where they will sleep",
"As clearly as you can"
],
[
"Who will be with them",
"Every night"
],
[
"Their things are coming",
"A pillow, a stuffed animal"
],
[
"Older kids",
"May feel ashamed and hide it"
]
],
"say": "Young children need to know three things, as clearly as you can tell them. Where they will sleep. Who will be with them. And that their comfort things are coming too, like a pillow or a stuffed animal. Older children may feel ashamed, and try to hide it from friends and teachers.",
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
"title": "Call the school first.",
"body": "Every district has a homeless liaison.",
"say": "Before you talk with your child, call the school and ask for the homeless liaison. Every district has one. Children experiencing homelessness have the right to stay in their school, even after a move, and the liaison can help with rides. The liaison knows the details, so you don't have to."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"We will be together.\"",
"\"You will keep going to your school.\"",
"\"This is a grown-up money problem.\""
],
"say": "Words that help. We need to leave our apartment. For now, we will stay with Aunt Mia. We will be together, and you'll keep going to your school. If they ask, is it my fault, say this. No. This is a grown-up money problem, and grown-ups are working on it."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Keep the routines",
"Bedtime and meals, wherever you are"
],
[
"A box of special things",
"Theirs to keep close"
],
[
"One grown-up at school",
"Who knows and helps"
],
[
"Protect their dignity",
"Hard, not a failure"
]
],
"say": "What helps. Keep bedtime and mealtime routines wherever you are. A story, a song, the same goodnight. Give them a small box of their own special things. Instead of a total secret, offer one trusted grown-up at school who knows. And protect their dignity. Let them choose what to tell friends.",
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
"h": "Pick one routine to keep tonight.",
"sub": "Say it out loud.",
"say": "Take a slow breath. Wherever you are sleeping tonight, picture bedtime with your child. Pick one small routine you can keep, a song, a story, or the same goodnight. Say it out loud.",
"beats": [
"Take a slow breath.",
"Wherever you are sleeping tonight, picture bedtime with your child.",
"Pick one small routine you can keep, a song, a story, or the same goodnight.",
{
"t": "Say it out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help is close by.",
"body": "Call 211. Ask for the school liaison.",
"say": "Others can walk with you. Call 211 for local housing help. Faith communities often offer practical help and belonging when a family is between homes. And talk with the school counselor or your child's pediatrician if worry or sadness lasts for weeks."
},
{
"k": "big",
"h": "Together, wherever you are.",
"sub": "Settling in takes time.",
"say": "Settling somewhere new takes time. Keep the routines strong, and look after yourself as best you can. Your child is watching how you carry this. Together, wherever you are, is what they will remember."
}
]
}
},
{
"id": "home-conflict",
"ring": "mp-family",
"title": "Arguing and Tension at Home",
"you": {
"id": "mp-g-home-conflict-you",
"guide": "home-conflict",
"side": "you",
"title": "Arguing and Tension at Home",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Arguing and Tension at Home",
"sub": "For You",
"say": "If the grown-ups at your house have been arguing, or home has felt tense, this is for you. You can watch it with a grown-up you trust."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad",
"Mad",
"Like hiding"
],
"say": "When grown-ups argue, kids can feel scared, or sad, or mad. You might want to hide. You might be extra silly, to make it stop. All of those feelings are okay."
},
{
"k": "big",
"h": "It is not your fault.",
"sub": "And it is not your job to fix.",
"say": "Here is something important. Grown-ups disagree sometimes. When they argue, it is a grown-up problem. It is never because of you. And it is not your job to fix it, or to keep the peace."
},
{
"k": "big",
"h": "Balloon breath",
"sub": "Breathe in slow. Let it out slow.",
"say": "When home feels loud inside, try a balloon breath. Put your hands on your tummy. Breathe in slowly, and fill your tummy like a balloon. Now let it out slowly, and do it two more times.",
"beats": [
"When home feels loud inside, try a balloon breath.",
"Put your hands on your tummy.",
"Breathe in slowly, and fill your tummy like a balloon.",
{
"t": "Now let it out slowly, and do it two more times.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Name your feeling",
"I feel scared."
],
[
"Go somewhere calm",
"A book, a pet, your room"
],
[
"Tell a grown-up",
"A parent, a teacher, a counselor"
]
],
"say": "Here are things you can do. Say your feeling out loud: I feel scared. Go somewhere calm, with a book, a pet, or a soft blanket. And tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor.",
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
"title": "If anyone hurts you, tell.",
"body": "Keep telling until someone helps.",
"say": "If anyone at home hurts you, or you feel afraid, tell a safe grown-up, like a teacher or your school counselor. If the first grown-up doesn't help, tell another. Keep telling until someone helps. It is never your fault. If someone is in danger right now, call 911, or ask a grown-up to."
},
{
"k": "big",
"h": "You are loved.",
"sub": "Grown-ups can make up, too.",
"say": "Grown-ups who argue can also make up. You are loved, and you deserve a home that feels safe and calm."
}
],
"crisis": [
"National DV Hotline: 1-800-799-7233",
"911: danger right now"
]
},
"helper": {
"id": "mp-g-home-conflict-helper",
"guide": "home-conflict",
"side": "helper",
"title": "Arguing and Tension at Home",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"lieberman",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Arguing and Tension at Home",
"sub": "For the Grown-up",
"say": "If there has been arguing or tension in your home, this is for you. Every family has conflict. What your child sees next matters a lot."
},
{
"k": "points",
"h": "What kids notice",
"items": [
[
"Kids notice",
"Even when you think they don't"
],
[
"Younger kids",
"Hide, or act silly or naughty"
],
[
"Older kids",
"Take sides, keep the peace"
]
],
"say": "Kids notice conflict, even when we think they don't. They hear the tone through the wall, and feel the quiet at breakfast. Younger children may feel scared, hide, or try to distract you with silly or naughty behavior. Older children may take sides, worry about divorce, or try to keep the peace.",
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
"h": "If they saw the fight, let them see the repair.",
"say": "Here is the heart of it. If your child saw the fight, let them see the repair too. Making up, in front of them, teaches more than any talk. And when you can, take heated conversations away from the kids."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Grown-ups disagree sometimes.\"",
"\"We worked it out.\"",
"\"It wasn't about you.\""
],
"say": "Words that help. You heard Mom and me arguing last night. Grown-ups disagree sometimes. We worked it out, and it wasn't about you. If they ask, was it because of me, say plainly, no, that was a grown-up problem. If they ask about divorce, answer honestly about what you know."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Show respectful disagreement",
"And making up"
],
[
"Keep home rhythms warm",
"Meals, bedtime, steady"
],
[
"Help them name it",
"I feel scared."
],
[
"Check in afterward",
"After tense stretches"
]
],
"say": "What helps. Show respectful disagreement, and making up. Keep home rhythms warm and steady: meals, bedtime, the same goodnight. Help them name the feeling: I feel scared, I feel mad. Naming a feeling helps it settle. And check in after tense stretches.",
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
"title": "Let them be the child.",
"body": "Keep kids out of the middle.",
"say": "One thing to leave out. Using kids as messengers, or as confidants about the other grown-up. Tell your mom she needs to call me. Or, your dad never listens. It puts a child in the middle of grown-up problems. Bring those to another adult you trust."
},
{
"k": "big",
"h": "Picture the repair.",
"sub": "Then say it out loud.",
"say": "Take a slow breath. Think of the last tense moment your child saw. Picture finding them afterward, calm and kind. Now say it out loud: we worked it out, and it wasn't about you.",
"beats": [
"Take a slow breath.",
"Think of the last tense moment your child saw.",
"Picture finding them afterward, calm and kind.",
{
"t": "Now say it out loud: we worked it out, and it wasn't about you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Safety comes first.",
"body": "Domestic Violence Hotline 1-800-799-7233. In danger, 911.",
"say": "If anyone in your home is being hurt, or is afraid, safety comes first. The National Domestic Violence Hotline is 1-800-799-7233. If anyone is in danger right now, call 911. If your child tells you someone hurt them, stay calm, believe them, and get help the same day."
},
{
"k": "card",
"title": "Look after yourself.",
"body": "Talk with someone you trust.",
"say": "Tension at home wears on grown-ups too. Talk with a friend, a counselor, or a faith leader if that fits your family. Many traditions teach reconciliation, and children learn it best when they see adults practice it. Talk with the school counselor or your child's pediatrician if worry or sleep trouble lasts for weeks."
},
{
"k": "big",
"h": "Disagree. Make up. Keep it steady.",
"sub": "It is never their job to fix it.",
"say": "Grown-ups disagree. Let your child see you make up, and keep home warm and steady. It is never their job to fix it."
}
],
"crisis": [
"National DV Hotline: 1-800-799-7233",
"911: danger right now"
]
}
},
{
"id": "sibling-leaves",
"ring": "mp-family",
"title": "An Older Sibling Leaves Home",
"you": {
"id": "mp-g-sibling-leaves-you",
"guide": "sibling-leaves",
"side": "you",
"title": "An Older Sibling Leaves Home",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "An Older Sibling Leaves Home",
"sub": "For You",
"say": "If your big brother or sister is leaving home, or just left, this is for you. You can watch it with your grown-up."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Sad",
"A little jealous",
"All mixed up"
],
"say": "You might feel proud of them, and sad for you. You might feel a little jealous, or a little glad to have more room. You can feel all of that at once. All of those feelings are okay."
},
{
"k": "big",
"h": "It is not because of you.",
"sub": "They still love you.",
"say": "Here is something important. Your brother or sister is leaving because they are growing up. It is not because of you. Moving away doesn't change love. They will miss you too."
},
{
"k": "points",
"h": "Ways to stay close",
"items": [
[
"A call time",
"The same day each week"
],
[
"Send a drawing",
"Or a letter"
],
[
"Keep something of theirs",
"A photo, a shirt, a note"
]
],
"say": "There are lots of ways to stay close. Pick a call time, the same day each week. Send a drawing or a letter in the mail. And keep something of theirs nearby, like a photo, a shirt, or a note.",
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
"h": "Hand on your heart",
"sub": "I miss you, and I love you.",
"say": "Let's try this together. Picture your brother or sister's face. Put your hand on your heart. Now say, I miss you, and I love you.",
"beats": [
"Let's try this together.",
"Picture your brother or sister's face.",
"Put your hand on your heart.",
{
"t": "Now say, I miss you, and I love you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Count down to the next visit.",
"body": "Mark it on a calendar together.",
"say": "Ask your grown-up when they will come home again, and mark it on a calendar together. You can cross off the days. And when you feel sad, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "Far away, still family.",
"sub": "Love stretches a long way.",
"say": "Love can stretch a long, long way. Even far away, they are still your family, and you are still theirs."
}
]
},
"helper": {
"id": "mp-g-sibling-leaves-helper",
"guide": "sibling-leaves",
"side": "helper",
"title": "An Older Sibling Leaves Home",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "An Older Sibling Leaves Home",
"sub": "For the Grown-up",
"say": "If an older child is leaving home, for college, work, the military, or a place of their own, this is for the younger one who stays. Kids can grieve when a big brother or sister leaves, even for a happy reason."
},
{
"k": "points",
"h": "What kids feel",
"items": [
[
"Younger kids",
"How long is away?"
],
[
"A quiet worry",
"Did they leave because of me?"
],
[
"Older kids",
"Proud, jealous, relieved, sad"
]
],
"say": "Young children may not understand how long away is. They may ask the same questions many times, or feel the sibling left because of them. Older children may feel proud, jealous, relieved, and sad all at once. They may miss the rides, the jokes, or the protection.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "flow",
"h": "Before the goodbye",
"steps": [
[
"Tell them ahead of time",
"Not the week of"
],
[
"Mark the calendar",
"Leaving day and next visit"
],
[
"Plan one special goodbye",
"Just the two of them"
]
],
"say": "Before the goodbye, tell them ahead of time. Mark the calendar with the leaving date and the next visit. And ask the older sibling to plan one special goodbye, just the two of them. Let the younger child help with the goodbye too.",
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
"\"She'll come home for holidays.\"",
"\"Happy for him, and sad for you.\"",
"\"Moving away doesn't change love.\""
],
"say": "Words that help. Your sister is going to college in August. She'll live there, and she'll come home for holidays. It's okay to feel happy for him and sad for you at the same time. If they ask, does she still love me, say yes. Moving away doesn't change that. She'll miss you too."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Something to keep",
"A photo, a shirt, a note"
],
[
"A regular call time",
"Same day each week"
],
[
"Letters and drawings",
"Mailed to them"
],
[
"A new big kid job",
"A place of their own"
]
],
"say": "What helps. Something from the sibling to keep: a photo, a shirt, or a note. A regular call time. Letters, drawings, or a package they can help pack and mail. And a new big kid job at home, so their own place in the family grows too.",
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
"h": "Words that close the door",
"items": [
"\"Why are you sad? It's a good thing!\"",
"A new use for the room, right away"
],
"say": "A couple of things to leave out. Brushing off their sadness because it's a good thing. A happy change can still be a loss. And turning the empty room into something else right away, without asking them. Give it time."
},
{
"k": "big",
"h": "Picture the next call.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture your younger child on the next call with their sibling, or the quiet after it ends. Say, out loud, the words you'll use: it's okay to miss them, and they miss you too.",
"beats": [
"Take a slow breath.",
"Picture your younger child on the next call with their sibling, or the quiet after it ends.",
{
"t": "Say, out loud, the words you'll use: it's okay to miss them, and they miss you too.",
"w": 10
}
]
},
{
"k": "card",
"title": "Sad again after visits.",
"body": "Holidays, visits, and each new goodbye.",
"say": "Expect sadness around holidays and visits, and again when the sibling leaves after a visit. Check in about how home feels now. Many families mark a goodbye with a blessing or a prayer, so the younger child feels part of the sending. Talk with their doctor or school counselor if sadness, worry, or trouble sleeping lasts more than a few weeks."
},
{
"k": "big",
"h": "A new shape for the family.",
"sub": "Give it time.",
"say": "You may be missing your older child too, so be gentle with yourself. Expect the younger one's place in the family to shift, and give it time. Love stretches, and your family is finding its new shape."
}
]
}
},
{
"id": "bullied",
"ring": "mp-school",
"title": "Being Bullied",
"you": {
"id": "mp-g-bullied-you",
"guide": "bullied",
"side": "you",
"title": "Being Bullied",
"sideName": "For You",
"mins": 2,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Being Bullied",
"sub": "For You",
"say": "If someone keeps being mean to you, this is for you. Maybe they call you names, push you, or won't let you play. You matter, and you deserve to feel safe."
},
{
"k": "big",
"h": "It is not your fault.",
"sub": "Nothing about you makes it okay.",
"say": "Here is the most important thing. It is not your fault. Nothing about you makes it okay for someone to be mean to you. Being mean says more about them than about you."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Scared",
"Mad",
"A tummy ache",
"Not wanting to go to school"
],
"say": "You might feel sad, or scared, or mad. Your tummy might hurt. You might not want to go to school. All of those feelings are okay. They are telling you something is wrong."
},
{
"k": "card",
"title": "Tell a safe grown-up.",
"body": "You won't be in trouble for telling.",
"say": "So tell a safe grown-up. A parent, a grandparent, your teacher, or your school counselor. You won't be in trouble for telling. Telling is brave. If anyone hurts you, tell, and keep telling until someone helps. Fixing it is a grown-up job, so others can help you handle it."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Stay with a buddy",
"At recess and lunch"
],
[
"Use a strong voice",
"\"Stop it.\""
],
[
"Walk away",
"To a grown-up"
]
],
"say": "Here are things that help. Stay close to a buddy at recess and lunch. Stand tall and say, stop it, in a strong, calm voice. Then walk away to a grown-up.",
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
"h": "Picture your safe grown-up.",
"sub": "Hand on your heart.",
"say": "Let's try something together. Put your hand on your heart. Take a slow breath in, and let it out. Now picture one safe grown-up you could tell. See their face, and think of what you might say.",
"beats": [
"Let's try something together.",
"Put your hand on your heart.",
"Take a slow breath in, and let it out.",
"Now picture one safe grown-up you could tell.",
{
"t": "See their face, and think of what you might say.",
"w": 10
}
]
},
{
"k": "big",
"h": "You deserve to feel safe.",
"sub": "Others can help you handle it.",
"say": "You deserve to feel safe at school, on the bus, and everywhere you go. And kindness is still strong. Others can help you handle this."
}
]
},
"helper": {
"id": "mp-g-bullied-helper",
"guide": "bullied",
"side": "helper",
"title": "Being Bullied",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Being Bullied",
"sub": "For the Grown-up",
"say": "If a child you love is being bullied, this is for you. Whether you are a parent, a grandparent, or another grown-up in their life, how you answer in the first minute matters most."
},
{
"k": "big",
"h": "It may not sound like bullying.",
"sub": "\"She's mean.\" \"They won't let me play.\"",
"say": "Young kids, kindergarten to second grade, may not use the word bullying. They say, she's mean, or, they won't let me play. They may not want to go to school, or have tummy aches on school mornings. Older kids, grades three to five, often hide it out of embarrassment, especially when it happens online or inside their own friend group."
},
{
"k": "card",
"title": "Stay calm first.",
"body": "A big reaction can make kids stop telling.",
"say": "Before you say a word, stay calm. If you get loud or upset, a child can decide that telling makes things worse, and stop telling. Your steady face says, I can handle this, and so can you."
},
{
"k": "big",
"h": "Try it now.",
"sub": "\"I'm really glad you told me.\"",
"say": "Let's practice. Let your shoulders drop, and take one slow breath. Now say it out loud, the way you would to them. I'm really glad you told me. Can you tell me what happens?",
"beats": [
"Let's practice.",
"Let your shoulders drop, and take one slow breath.",
"Now say it out loud, the way you would to them.",
"I'm really glad you told me.",
{
"t": "Can you tell me what happens?",
"w": 10
}
]
},
{
"k": "words",
"h": "When they ask",
"items": [
"\"You won't be in trouble for telling.\"",
"\"It says more about them than about you.\""
],
"say": "Kids often ask, will I get in more trouble if you tell? You can say, we'll work with your teacher in a way that keeps you safe, and you won't be in trouble for telling. If they ask, why do they pick on me, say, bullying says more about them than about you. Nothing about you makes it okay."
},
{
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"\"Just ignore it\"",
"It leaves them alone with it"
],
[
"\"Hit them back\"",
"It can put them in danger"
],
[
"Calling the other family",
"In anger, it often backfires"
]
],
"say": "Leave out, just ignore it, which leaves a child alone with something too big. Leave out, hit them back, which can put them in danger or in trouble. And hold off on calling the other family yourself in anger. Go through the school instead.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "flow",
"h": "Then act",
"steps": [
[
"Write it down",
"What, when, and who was there"
],
[
"Work with the school",
"Ask what their plan is"
],
[
"Build a safety plan",
"Safe friends, places, people"
],
[
"Check in often",
"It can come back"
]
],
"say": "Then act. Write down what happened, when, and who was there. Work with the school, and ask what their plan is. Help your child build a plan: safe friends, safe places, and who to tell. Practice a calm, confident stop it, and walking away. Build friendships outside school too. And keep checking in, because bullying often comes back when no one is watching.",
"cue": {
"at": [
1,
2,
3,
6
]
}
},
{
"k": "card",
"title": "When to get more help",
"body": "Threats, physical harm, or deep sadness: act today.",
"say": "Reach out for more help if bullying keeps going after the school knows, or includes threats or physical harm. If your child seems very sad or scared, or talks about not wanting to live, take it seriously and talk with them today. Call or text 988 any time, and call 911 if anyone is in danger right now."
},
{
"k": "big",
"h": "They deserve protection.",
"sub": "And kindness is still strong.",
"say": "Children can hold two truths at once: they deserve protection, and kindness is still strong. Help them hold both. And be gentle with yourself. Watching your child get hurt is hard. Lean on a friend, a counselor, or your own people. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "unkind",
"ring": "mp-school",
"title": "When Your Child Is the One Being Unkind",
"you": {
"id": "mp-g-unkind-you",
"guide": "unkind",
"side": "you",
"title": "When Your Child Is the One Being Unkind",
"sideName": "For You",
"mins": 2,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Your Child Is the One Being Unkind",
"sub": "For You",
"say": "If you did or said something that hurt another kid, this is for you. Everybody makes hurtful choices sometimes. Grown-ups too. You can learn, and you can make it right."
},
{
"k": "big",
"h": "You are a good kid.",
"sub": "You made a hurtful choice.",
"say": "Here is something true. You are a good kid who made a hurtful choice. A choice is something you did. It is not who you are. And choices can change."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Embarrassed",
"Worried",
"Mad",
"Sorry"
],
"say": "Right now you might feel embarrassed, or worried you're in trouble. You might feel mad, or sorry, or all of those at once. Those feelings are okay. Feeling sorry means your heart is working."
},
{
"k": "big",
"h": "How did they feel?",
"sub": "Close your eyes and wonder.",
"say": "Let's try something together. Close your eyes, and take a slow breath. Think about the kid who got hurt. Picture their face. Wonder quietly, how did they feel?",
"beats": [
"Let's try something together.",
"Close your eyes, and take a slow breath.",
"Think about the kid who got hurt.",
"Picture their face.",
{
"t": "Wonder quietly, how did they feel?",
"w": 10
}
]
},
{
"k": "points",
"h": "Ways to make it right",
"items": [
[
"Say sorry",
"And mean it"
],
[
"Fix what you can",
"With a grown-up's help"
],
[
"Try a kind thing",
"A smile, a turn, a seat"
]
],
"say": "Here are ways to make it right. Say sorry, and mean it. Your grown-up can help you fix what you can. And try a kind thing, like sharing a turn or saving someone a seat.",
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
"title": "Talk to your grown-up.",
"body": "A parent, a teacher, or your school counselor.",
"say": "If something is making you feel mad or sad inside, or if someone is being mean to you, tell a safe grown-up. A parent, a grandparent, a teacher, or your school counselor. They can help you sort out the big feelings, and help you make things right."
},
{
"k": "big",
"h": "You are still loved.",
"sub": "And kindness is a strong thing.",
"say": "Even after a hurtful choice, the grown-ups who love you still love you. Making things right is a strong, grown-up thing to do. And you can do it."
}
]
},
"helper": {
"id": "mp-g-unkind-helper",
"guide": "unkind",
"side": "helper",
"title": "When Your Child Is the One Being Unkind",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Your Child Is the One Being Unkind",
"sub": "For the Grown-up",
"say": "If the school called to say your child hurt another child, this is for you. It's a hard call to get. You can help your child learn from this, make it right, and grow."
},
{
"k": "card",
"title": "Breathe before you respond.",
"body": "Feeling defensive is natural.",
"say": "It's natural to feel defensive, or embarrassed, or worried about what this says about your child, or about you. Take a breath before you respond to the school. You don't have to decide what it all means in the first five minutes."
},
{
"k": "big",
"h": "Try it now.",
"sub": "\"I want to hear your side.\"",
"say": "Let's practice. Let your jaw go soft, and take one slow breath, longer out than in. Now say it out loud, calm and curious, the way you would to them. Your teacher told me some kids got hurt at recess. I want to hear your side.",
"beats": [
"Let's practice.",
"Let your jaw go soft, and take one slow breath, longer out than in.",
"Now say it out loud, calm and curious, the way you would to them.",
"Your teacher told me some kids got hurt at recess.",
{
"t": "I want to hear your side.",
"w": 10
}
]
},
{
"k": "points",
"h": "What may be going on",
"items": [
[
"Still learning",
"Impulse control and sharing"
],
[
"Going along",
"With a group"
],
[
"Acting out hurt",
"Their own pain"
],
[
"Seeking power",
"Or attention"
]
],
"say": "Young kids, kindergarten to second grade, are still learning impulse control and sharing. Clear, right-away teaching works best. Older kids, grades three to five, may go along with a group, act out their own hurt, or look for power and attention. So stay curious. Look for what is underneath: stress, hurt, or wanting to fit in.",
"cue": {
"at": [
0,
2,
2,
2
]
}
},
{
"k": "big",
"h": "A good kid who made a hurtful choice.",
"say": "Separate the child from the behavior. You are a good kid who made a hurtful choice. If they ask, are you mad at me, you can say, I love you. I'm not happy with what happened, and I'm going to help you make it right."
},
{
"k": "flow",
"h": "Teach empathy and repair",
"steps": [
[
"Ask",
"\"How do you think they felt?\""
],
[
"Repair",
"A real apology, or a fix"
],
[
"Lead with kindness",
"Give them the chance"
],
[
"Notice it",
"Praise kind choices"
]
],
"say": "Focus on empathy and repair, more than punishment. Ask, how do you think they felt? Help them make a real apology, or repair what they can. Then give them chances to lead with kindness, like helping a younger child or including someone new. And when they make a kind choice, notice it out loud.",
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
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"Harsh shaming",
"It feeds the hurt"
],
[
"Calling them a bully",
"Labels stick"
],
[
"Blaming the other child",
"It blocks empathy"
]
],
"say": "Leave out harsh shaming. A child who feels like a bad kid often acts like one. Skip the label, bully, because labels stick. And hold off on blaming the other child, even if there's more to the story. That blocks the empathy you're trying to grow.",
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
"h": "Repair is a strong skill.",
"sub": "Many traditions teach making things right.",
"say": "Many families and faith traditions teach confession, forgiveness, and making things right. Repair is a strong, grown-up skill, and your child can learn it now. If aggression or cruelty keeps going despite support, talk with the school counselor, your pediatrician, or a child therapist."
},
{
"k": "big",
"h": "Love them, and help them grow.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be gentle with yourself too. A hurtful choice doesn't make your child a bad kid, and it doesn't make you a bad parent. Love them, help them make it right, and help them grow. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "friendship",
"ring": "mp-school",
"title": "Friendship Troubles",
"you": {
"id": "mp-g-friendship-you",
"guide": "friendship",
"side": "you",
"title": "Friendship Troubles",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Friendship Troubles",
"sub": "For You",
"say": "If things feel hard with your friends right now, this is for you. Maybe you had a fight, or got left out, or someone said, you're not my friend. Lots of kids go through this."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Lonely",
"Mad",
"Left out"
],
"say": "You might feel sad, or lonely, or mad. You might feel left out, like everyone else has a friend but you. Those feelings are okay. They show how much friends matter to you."
},
{
"k": "card",
"title": "Friendships can change fast.",
"body": "A bad morning can turn into a good lunch.",
"say": "Here is something about friends. They can change fast. Someone who says, you're not my friend, in the morning might want to play by lunch. Friends fight, and friends make up."
},
{
"k": "points",
"h": "Things you can try",
"items": [
[
"Tell your grown-up",
"What happened, and how you felt"
],
[
"Ask to play",
"\"Can I play too?\""
],
[
"Find a shared thing",
"Someone who likes what you like"
]
],
"say": "Here are things you can try. Tell a grown-up who takes care of you what happened, and how it felt. Ask someone, can I play too? And look for a kid who likes what you like, like drawing, soccer, or dinosaurs.",
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
"h": "Say it out loud.",
"sub": "\"Can I play too?\"",
"say": "Let's practice together. Stand up tall, and smell the flower: breathe in slowly. Now blow out the candle. Now say it out loud in a friendly voice. Can I play too?",
"beats": [
"Let's practice together.",
"Stand up tall, and smell the flower: breathe in slowly.",
"Now blow out the candle.",
"Now say it out loud in a friendly voice.",
{
"t": "Can I play too?",
"w": 10
}
]
},
{
"k": "card",
"title": "One good friend is a lot.",
"body": "One good friend is plenty.",
"say": "You don't need to have lots of friends. One good friend is a lot. And if you feel left out day after day, or someone keeps being mean, tell a parent, a teacher, or your school counselor. They can help."
},
{
"k": "big",
"h": "You are a good friend to have.",
"sub": "And friends can find you.",
"say": "You have a lot to share: your ideas, your games, your kindness. You are a good friend to have. And the right friends can find you."
}
]
},
"helper": {
"id": "mp-g-friendship-helper",
"guide": "friendship",
"side": "helper",
"title": "Friendship Troubles",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Friendship Troubles",
"sub": "For the Grown-up",
"say": "If a child you love comes home sad because of friends, this is for you. A fight with a best friend, a game they weren't let into, a lunch table that felt lonely. These hurts are real, and you can help."
},
{
"k": "big",
"h": "Remember your own.",
"sub": "Empathy helps.",
"say": "Before you say anything, remember your own friendship pains. The recess you spent alone, the friend who suddenly had a new best friend. That memory is your empathy. It helps you listen instead of rushing in."
},
{
"k": "points",
"h": "What friendship looks like now",
"items": [
[
"K to 2",
"Fights forgotten by lunch"
],
[
"Grades 3 to 5",
"Groups, inside jokes, exclusion"
],
[
"Hurt that lasts",
"Older kids replay it"
]
],
"say": "For young kids, kindergarten to second grade, friendships change quickly. You're not my friend can be forgotten by lunch. In grades three to five, friend groups get more complex, with inside jokes, exclusion, and hurt feelings that last. An older child may replay the same moment for days.",
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
"h": "Try it now.",
"sub": "\"Did something happen with your friends?\"",
"say": "Let's practice. Take one slow breath, and let your face go soft. Now say it out loud, gently, the way you would after school. You seem down. Did something happen with your friends?",
"beats": [
"Let's practice.",
"Take one slow breath, and let your face go soft.",
"Now say it out loud, gently, the way you would after school.",
"You seem down.",
{
"t": "Did something happen with your friends?",
"w": 10
}
]
},
{
"k": "flow",
"h": "Listen, name, coach",
"steps": [
[
"Listen first",
"Often they just need to vent"
],
[
"Name it",
"What happened, how it felt"
],
[
"Coach, not fix",
"What could you try?"
]
],
"say": "Then listen first. Kids often just need to vent. Help them name what happened, and how they felt. Then coach instead of fixing. Ask, what could you try? Brainstorm together, and let them pick.",
"cue": {
"at": [
0,
2,
3
]
}
},
{
"k": "words",
"h": "When they ask",
"items": [
"\"Why doesn't anyone want to play with me?\"",
"\"That sounds lonely.\""
],
"say": "A child may ask, why doesn't anyone want to play with me? That question can break your heart. You can say, that sounds lonely. Let's think about who might like to play, and how you could ask."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A low-key playdate",
"One friend, your home"
],
[
"Shared interests",
"Clubs, teams, activities"
],
[
"Other circles",
"Neighbors, cousins, community"
]
],
"say": "A few things really help. Invite one friend over for a low-key playdate. Try clubs or activities with shared interests, like art, sports, or scouts. And look for friendships outside school, with neighbors, cousins, or a faith community if your family has one. Remember, one good friend matters more than being popular.",
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
"title": "Hold back a little.",
"body": "Small conflicts are practice.",
"say": "Try not to step in too fast, or call other parents over small conflicts. Small fights are how kids practice making up. Ask about the good moments too, not just the hard ones. But if your child is alone day after day, or you see signs of bullying, talk with their teacher or school counselor."
},
{
"k": "big",
"h": "One good friend matters.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be gentle with yourself as well. It hurts to watch your child feel left out. You can't choose their friends, but you can be a steady place to land while they find them. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "new-school",
"ring": "mp-school",
"title": "Starting or Changing Schools",
"you": {
"id": "mp-g-new-school-you",
"guide": "new-school",
"side": "you",
"title": "Starting or Changing Schools",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Starting or Changing Schools",
"sub": "For You",
"say": "If you are starting a new school, or changing schools, this is for you. Big changes can feel exciting and scary at the same time. Both are okay."
},
{
"k": "words",
"h": "A new school can feel like",
"items": [
"Excited",
"Nervous",
"A tummy flip",
"Very tired after school"
],
"say": "A new school can feel lots of ways. You might feel excited. You might feel nervous, or have a tummy flip in the morning. You might feel very tired after school. All of that is normal, and it's okay."
},
{
"k": "points",
"h": "New and the same",
"items": [
[
"Some things are new",
"A room, a teacher, new kids"
],
[
"Some things stay the same",
"Your family loves you"
],
[
"Friends take time",
"A little at a time"
]
],
"say": "Here's something to remember. Some things will be new: a new room, a new teacher, and new kids. Some things stay the same. Your family still loves you, and they'll be there at the end of the day. And making friends takes time, a little at a time.",
"cue": {
"at": [
1,
2,
4
]
}
},
{
"k": "card",
"title": "Try a friendly hello.",
"body": "Hi, I'm new. Can I play too?",
"say": "Here's a way to start making a friend. Smile, and say hi. You could say, hi, I'm new, can I play too? Some kids will say yes right away. Some kids take a little longer. That's okay."
},
{
"k": "big",
"h": "Squeeze and let go.",
"sub": "Then picture your goodbye hug.",
"say": "Let's try something for school mornings. Make two tight fists, and squeeze. Now let go, and let your hands go soft. Take one slow breath, and picture your goodbye hug at the door.",
"beats": [
"Let's try something for school mornings.",
"Make two tight fists, and squeeze.",
"Now let go, and let your hands go soft.",
{
"t": "Take one slow breath, and picture your goodbye hug at the door.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, your teacher, the school counselor.",
"say": "If school feels hard, tell a grown-up who takes care of you: a parent, a grandparent, your teacher, or your school counselor. They can help. You could ask for a note or a photo in your backpack, so a piece of home comes with you."
},
{
"k": "big",
"h": "New places become your places.",
"sub": "One day at a time.",
"say": "The first days are often the hardest. Every day, your new school gets a little more familiar. One day at a time, new places become your places."
}
]
},
"helper": {
"id": "mp-g-new-school-helper",
"guide": "new-school",
"side": "helper",
"title": "Starting or Changing Schools",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Starting or Changing Schools",
"sub": "For the Grown-up",
"say": "When a child you love is starting a new school, or changing schools, this is for you. Big beginnings take time, for kids and for grown-ups."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Clinging, tears, worn out after"
],
[
"Grades 3 to 5",
"Friends, fitting in, being behind"
],
[
"Every age",
"A few rough weeks is normal"
]
],
"say": "Here's what you might see. Younger children may cling, cry at drop-off, or come home completely worn out. That tiredness is real, because a new place takes a lot of energy. Older children may worry about making friends, fitting in, or being behind in class. At every age, expect a few rough weeks. Adjusting takes time.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "flow",
"h": "Before the first day",
"steps": [
[
"Visit if you can",
"Halls, classroom, teacher"
],
[
"Talk it through",
"What is the same, what is new"
],
[
"Tell the teacher",
"What helps your child"
]
],
"say": "Before the first day, a few things help. Visit ahead of time if you can: walk the halls, see the classroom, and meet the teacher. Talk about what will be the same and what will be new. And share important information with the new teacher, so they know what helps your child.",
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
"h": "Words that help",
"items": [
"\"What are you excited about?\"",
"\"What feels worried?\"",
"\"Making friends takes time.\""
],
"say": "Words that help. Next week you start at your new school. What are you excited about? What feels worried? Let both answers be welcome. If they ask what happens if nobody likes them, try this: making friends takes time. Let's think of a few ways to say hi."
},
{
"k": "card",
"title": "Keep goodbyes short and sure.",
"body": "A simple routine. A hug, a phrase, then go.",
"say": "At drop-off, a simple goodbye routine helps: a hug, a special phrase, and then you go. It can be tempting to sneak out while they're busy, but that tends to make the next morning harder, because they start watching for you to disappear. A short, sure goodbye tells them you trust them, and that you'll be back."
},
{
"k": "points",
"h": "Small things that help",
"items": [
[
"A note in the backpack",
"Or a small photo"
],
[
"A playdate",
"With one classmate"
],
[
"Celebrate week one",
"However it went"
]
],
"say": "Small things help a lot. Tuck a reminder in their backpack: a note, or a small photo. Arrange a playdate with one classmate, because one friend makes a big difference. And celebrate the end of the first week, however it went.",
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
"h": "Picture tomorrow's goodbye.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture tomorrow's goodbye at the door. Now say, out loud, the words you'll use: I love you, have a good day, I'll see you at pickup.",
"beats": [
"Take a slow breath.",
"Picture tomorrow's goodbye at the door.",
{
"t": "Now say, out loud, the words you'll use: I love you, have a good day, I'll see you at pickup.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Refusal or distress that lasts more than a few weeks.",
"say": "Talk with the teacher or the school counselor if refusal or distress lasts more than a few weeks. Many schools can pair a new child with a buddy and check in often in the first weeks, so ask. Some families mark the first day with a blessing, a prayer for courage, or a special breakfast. And notice your own feelings about this change too. You matter."
},
{
"k": "big",
"h": "Short goodbyes. Steady days.",
"sub": "New places become their places.",
"say": "Visit, prepare, keep goodbyes short and sure, and give it time. One day at a time, new places become their places."
}
]
}
},
{
"id": "school-worry",
"ring": "mp-school",
"title": "School and Test Worries",
"you": {
"id": "mp-g-school-worry-you",
"guide": "school-worry",
"side": "you",
"title": "School and Test Worries",
"sideName": "For You",
"mins": 2,
"sources": [
"lieberman",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "School and Test Worries",
"sub": "For You",
"say": "If school feels hard sometimes, or tests make you feel worried, this is for you. Lots of kids feel this way. You're in good company."
},
{
"k": "words",
"h": "Test worry can feel like",
"items": [
"A tummy ache",
"Shaky hands",
"A blank mind",
"Thinking I'm not smart"
],
"say": "Test worry can show up in your body. Your tummy might hurt, or your hands might feel shaky. Your mind might go blank, even when you practiced. You might even think, I'm not smart. That's the worry talking. It's normal, and it's okay."
},
{
"k": "card",
"title": "Mistakes help your brain grow.",
"body": "A mistake shows what to practice next.",
"say": "Here's something true. Mistakes are how brains grow. When you get something wrong, your brain learns what to practice next. Every mistake is part of learning."
},
{
"k": "card",
"title": "Try the word yet.",
"body": "I don't know it yet.",
"say": "Try a little word with a lot of power: yet. Instead of, I can't do this, say, I can't do this yet. Instead of, I don't know it, say, I don't know it yet. Yet means you're still learning."
},
{
"k": "big",
"h": "Hand on heart. Slow breath.",
"sub": "Say: I can try my best.",
"say": "Let's try this for test time. Put one hand on your heart. Breathe in slowly, and let it out slowly. Now say it out loud: I can try my best.",
"beats": [
"Let's try this for test time.",
"Put one hand on your heart.",
"Breathe in slowly, and let it out slowly.",
{
"t": "Now say it out loud: I can try my best.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Tell a grown-up",
"A parent or your teacher"
],
[
"One small step",
"Then the next one"
],
[
"Rest and play",
"Sleep, food, and fun"
]
],
"say": "Here are things that help. Tell a grown-up how you feel: a parent, a grandparent, your teacher, or your school counselor. Do big work in small steps, one at a time. And get good sleep, eat well, and play, because that helps your brain learn too.",
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
"h": "You are more than one test.",
"sub": "Trying and learning is what counts.",
"say": "You are more than one test. You are loved for who you are, not for your grades. Keep trying, keep learning, and keep telling your grown-ups how you feel."
}
]
},
"helper": {
"id": "mp-g-school-worry-helper",
"guide": "school-worry",
"side": "helper",
"title": "School and Test Worries",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "School and Test Worries",
"sub": "For the Grown-up",
"say": "When a child you love is worried about school, tests, or grades, this is for you. Your calm and your words can help them try without fear."
},
{
"k": "points",
"h": "What school worry looks like",
"items": [
[
"K to 2nd grade",
"I'm dumb. Avoiding reading or math"
],
[
"Grades 3 to 5",
"Freezing, comparing, skipping homework"
],
[
"In disguise",
"Tummy aches on test days"
]
],
"say": "Here's what school worry can look like. Younger children may say, I'm dumb, or avoid reading or math. Older children may freeze on tests, compare grades, or avoid homework. Watch for worry in disguise too: tummy aches or headaches on test mornings.",
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
"title": "Check your own pressure.",
"body": "Kids feel it, even when we say nothing.",
"say": "Before you talk, check your own pressure. Kids feel it, even when we don't say a word. A sigh at a report card, or a tight voice at homework time, can land heavily. Your calm gives them room to try."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What part feels hardest?\"",
"\"You don't know it yet.\"",
"\"You are more than one test.\""
],
"say": "Words that help. You seem stressed about the spelling test. What part feels hardest? Use the word yet: you don't know it yet. And if they ask what happens if they fail, try this: then we learn what to practice next. You are more than one test."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Praise effort",
"Not just grades"
],
[
"Small steps",
"Break big tasks down"
],
[
"A calm routine",
"Same time, same place"
],
[
"Sleep, food, play",
"More than cramming"
]
],
"say": "What helps. Praise effort, not just grades: I saw how hard you worked on that. Break big tasks into small steps. Keep a calm homework routine, same time, same place. And remember that sleep, food, and play help learning more than cramming does.",
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
"h": "Words that close the door",
"items": [
"Punishing grades",
"Comparing to siblings",
"\"You just need to try harder.\""
],
"say": "Some things make school worry grow. Punishing grades teaches a child that mistakes are dangerous, so they stop trying. Comparing them to a brother or sister turns learning into a contest they can lose. And you just need to try harder can sting when they are already trying. Mistakes are how brains grow. Say it often."
},
{
"k": "big",
"h": "Picture homework time tonight.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture homework time tonight, when the worry shows up. Now say, out loud, the words you'll use: you don't know it yet, and that's okay.",
"beats": [
"Take a slow breath.",
"Picture homework time tonight, when the worry shows up.",
{
"t": "Now say, out loud, the words you'll use: you don't know it yet, and that's okay.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Worry that makes them sick. A possible learning difference.",
"say": "Talk to the teacher early if your child is struggling. And talk with the school counselor or their pediatrician if worry makes them sick, or if the struggle could be a learning difference. Finding out opens the door to the right help. Many traditions teach that a person's worth isn't earned, and many families find that truth steadying. And notice your own worry about their future too. You matter."
},
{
"k": "big",
"h": "Effort counts most.",
"sub": "Celebrate progress, however small.",
"say": "Praise effort, use the word yet, and keep your own pressure low. Celebrate progress, however small. That's how kids learn to try without fear."
}
]
}
},
{
"id": "lockdown",
"ring": "mp-school",
"title": "Lockdown Drills",
"you": {
"id": "mp-g-lockdown-you",
"guide": "lockdown",
"side": "you",
"title": "Lockdown Drills",
"sideName": "For You",
"mins": 2,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Lockdown Drills",
"sub": "For You",
"say": "If your school had a lockdown drill, or you have one coming up, this is for you. Drills can feel strange. Let's talk about them."
},
{
"k": "card",
"title": "A drill is practice.",
"body": "Like a fire drill. Everyone learns what to do.",
"say": "A lockdown drill is practice, just like a fire drill. Your class practices being very quiet and staying together, so everyone knows what to do. We practice even though it almost never happens for real."
},
{
"k": "words",
"h": "During a drill, you might feel",
"items": [
"Fine",
"Wiggly",
"Scared of the dark or the quiet",
"Full of questions"
],
"say": "During a drill, you might feel fine. You might feel wiggly, or scared of the dark or the quiet. Afterward, you might have lots of questions. Every one of those feelings is okay."
},
{
"k": "points",
"h": "Grown-ups looking out for you",
"items": [
[
"Your teacher",
"Knows the plan"
],
[
"Your principal",
"And the school staff"
],
[
"Your family",
"Every single day"
]
],
"say": "Lots of grown-ups work every day to keep your school safe. Your teacher knows the plan, and stays right with you. Your principal and the school staff are there too. And your family is looking out for you, every single day.",
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
"h": "Hand on heart. Slow breath.",
"sub": "Picture a grown-up who keeps you safe.",
"say": "Here's something you can do when it's very quiet. Put one hand on your heart. Breathe in slowly, and let it out slowly, like a sleepy turtle. Now picture a grown-up at school who keeps you safe.",
"beats": [
"Here's something you can do when it's very quiet.",
"Put one hand on your heart.",
"Breathe in slowly, and let it out slowly, like a sleepy turtle.",
{
"t": "Now picture a grown-up at school who keeps you safe.",
"w": 10
}
]
},
{
"k": "card",
"title": "Talk about it.",
"body": "A parent, your teacher, the school counselor.",
"say": "After a drill, you can talk about it with a grown-up who takes care of you: a parent, a grandparent, your teacher, or your school counselor. You can ask any question. If you keep feeling scared about school, tell them, so they can help."
},
{
"k": "big",
"h": "Lots of grown-ups keep you safe.",
"sub": "Practice helps everyone know what to do.",
"say": "Drills are practice. Lots of grown-ups are working to keep you safe. And you can always bring your feelings to someone who loves you."
}
]
},
"helper": {
"id": "mp-g-lockdown-helper",
"guide": "lockdown",
"side": "helper",
"title": "Lockdown Drills",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Lockdown Drills",
"sub": "For the Grown-up",
"say": "When a child you love has lockdown drills at school, this is for you. Your calm voice helps more than any perfect words."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Hiding, the dark, the quiet"
],
[
"Grades 3 to 5",
"Know the reason, may feel scared"
],
[
"Every age",
"Questions come later"
]
],
"say": "Here's what you might see. Young children may not understand why they are hiding, and the dark or the quiet can feel scary. Older children often understand what the drill is for, and may feel scared, especially after news events. At every age, questions may come later, at bedtime or in the car.",
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
"title": "Frame it like a fire drill.",
"body": "Practice, so everyone knows what to do.",
"say": "Frame drills like fire drills. We practice so everyone knows what to do, even though it almost never happens. Keep it simple and calm. Kids take their cue from you."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"You had a drill today. How did it feel?\"",
"\"We practice so everyone knows what to do.\"",
"\"That is very, very unlikely.\""
],
"say": "Words that help. You had a lockdown drill today. How did it feel? Drills are like practicing a fire drill. We practice so everyone knows what to do. If they ask whether a bad guy is going to come, try this: that is very, very unlikely. Schools are among the safest places for kids. The drill is just practice."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Ask the school",
"When drills happen, how they explain"
],
[
"Listen after",
"Feelings and questions"
],
[
"Keep routines normal",
"Dinner, play, bedtime"
],
[
"Name the helpers",
"Who keeps them safe"
]
],
"say": "What helps. Ask the school when drills happen and how they are explained, so your words match. After a drill, let them share feelings and questions. Keep their routine normal afterward: dinner, play, and bedtime as usual. And name the adults at school who keep them safe.",
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
"title": "Simple and true. Then stop.",
"body": "Answer what they ask. Limit news and replays.",
"say": "Simple, true answers help a child feel safe. Answer what they ask, and stop there, because extra details tend to make the fear bigger. Keep news and grown-up talk about frightening events away from young ears, and limit replays for older kids. If they heard something, find out what, and gently correct what isn't true."
},
{
"k": "big",
"h": "Picture the next drill day.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture picking up your child on the next drill day. Now say, out loud, the words you'll use: you had a drill today, how did it feel?",
"beats": [
"Take a slow breath.",
"Picture picking up your child on the next drill day.",
{
"t": "Now say, out loud, the words you'll use: you had a drill today, how did it feel?",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Ongoing fear of school after drills.",
"say": "Check in after drills, especially with sensitive kids. Talk with the school counselor or a child therapist if fear of school keeps going after drills, or shows up as nightmares or not wanting to go. Some families say a prayer for safety and for the helpers, which can give a worried child a way to hand over their fear. And notice your own fear too. You matter."
},
{
"k": "big",
"h": "Calm, simple, and close.",
"sub": "Lots of grown-ups keep them safe.",
"say": "Keep it calm and simple, listen afterward, and name the helpers. Lots of grown-ups are working to keep your child safe, and you are one of them."
}
]
}
},
{
"id": "online-trouble",
"ring": "mp-school",
"title": "Trouble Online",
"you": {
"id": "mp-g-online-trouble-you",
"guide": "online-trouble",
"side": "you",
"title": "Trouble Online",
"sideName": "For You",
"mins": 3,
"sources": [
"lieberman",
[
"Common Sense Media",
"https://www.commonsensemedia.org"
],
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Trouble Online",
"sub": "For You",
"say": "If something online made you feel bad or scared, this is for you. Lots of kids see or hear things online that upset them. Telling a grown-up is always a good choice."
},
{
"k": "words",
"h": "Online trouble can look like",
"items": [
"A scary video",
"A mean message",
"Being left out of a chat",
"A game that turns mean"
],
"say": "Online trouble can look like a lot of things. A scary video you didn't mean to see. A mean message, or a mean picture. Being left out of a group chat. A game where other players turn mean. If any of that happened, it's not your fault."
},
{
"k": "card",
"title": "Your feelings make sense.",
"body": "Sad, mad, scared, or yucky are all okay.",
"say": "You might feel sad, mad, scared, or just yucky inside. Those feelings make sense. It can help to say it out loud: I feel scared. Saying a feeling out loud helps it get smaller."
},
{
"k": "points",
"h": "What you can do",
"items": [
[
"Stop",
"Close it, or turn it over"
],
[
"Tell",
"Find a safe grown-up"
],
[
"Show",
"Let them see what happened"
]
],
"say": "Here's what you can do. Stop: close it, or turn the screen over. Tell: find a safe grown-up right away. Show: let them see what happened, and they will help with the rest.",
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
"h": "Squeeze and let go",
"sub": "Then picture your grown-up.",
"say": "Let's help your body feel calm. Squeeze your hands into tight fists. Hold, hold, hold. Now let go, and let your hands go soft. Picture the grown-up you would tell, and say their name out loud.",
"beats": [
"Let's help your body feel calm.",
"Squeeze your hands into tight fists.",
"Hold, hold, hold.",
"Now let go, and let your hands go soft.",
{
"t": "Picture the grown-up you would tell, and say their name out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Telling is brave.",
"body": "A parent, a teacher, or your school counselor.",
"say": "Telling is brave. Tell a parent, a grandparent, a teacher, or your school counselor. They will be glad you told them. Fixing it is a grown-up job. And if anyone online asks you for secrets or pictures, tell a grown-up right away, and keep telling until someone helps."
},
{
"k": "big",
"h": "Telling makes it smaller.",
"sub": "Your grown-ups are on your side.",
"say": "Online or anywhere, you can always bring the hard stuff to a grown-up. Telling makes it smaller. Your grown-ups are on your side."
}
]
},
"helper": {
"id": "mp-g-online-trouble-helper",
"guide": "online-trouble",
"side": "helper",
"title": "Trouble Online",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Common Sense Media",
"https://www.commonsensemedia.org"
],
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Trouble Online",
"sub": "For the Grown-up",
"say": "When something online has hurt or scared a child you love, this is for you. The most important thing you can do is make it safe for them to tell you."
},
{
"k": "points",
"h": "What it looks like",
"items": [
[
"Younger kids",
"A scary video or game"
],
[
"Older kids",
"Group chats, games, apps"
],
[
"Clues",
"Hidden screens, moods after"
]
],
"say": "Online trouble looks different by age. Younger kids, kindergarten to second grade, may stumble onto a scary video or game, often by tapping one thing after another. Older kids, grades three to five, may be in group chats, games, or apps where teasing and drama spread fast. Watch for clues: a child who hides the screen, goes quiet after being online, or suddenly drops a favorite game.",
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
"title": "Keep the door open.",
"body": "Talk about online life casually and often.",
"say": "Start before anything goes wrong. Know which apps and games they use, and check the privacy settings together. Then talk about online life casually and often, the way you'd ask about recess. Try: has anything online made you feel bad lately?"
},
{
"k": "card",
"title": "Will you take my tablet?",
"body": "\"No. I'm glad you told me. We'll figure it out together.\"",
"say": "Here's the question most kids are really asking: will you take my tablet? If telling means losing the device, many kids stop telling. So say it before they ask: you won't lose your device for telling me. And when they do tell, try: I'm glad you told me. We'll figure it out together."
},
{
"k": "flow",
"h": "When they tell you",
"steps": [
[
"Thank them",
"Telling took courage"
],
[
"Stay calm",
"Breathe before you react"
],
[
"Save, block, report",
"For mean messages"
],
[
"Talk it through",
"What they saw and felt"
]
],
"say": "When they tell you, thank them first. Telling took courage. Stay calm, and breathe before you react, because your reaction teaches them whether to tell next time. For cyberbullying, take screenshots, then block the account and report it in the app or game. If they saw something upsetting, help them talk it through: what did you see, and how did it make you feel?",
"cue": {
"at": [
0,
2,
3,
4
]
}
},
{
"k": "card",
"title": "Some things need more.",
"body": "Threats, sexual messages, or requests for pictures.",
"say": "Some things need more than blocking. If there are threats, sexual messages, or requests for pictures, see the Maple guide When Someone Online Asks for Secrets. If a picture of a child's body is involved, skip the screenshot, and follow that guide's steps."
},
{
"k": "big",
"h": "Say it before they ask.",
"sub": "You won't lose your device for telling me.",
"say": "Take one slow breath. Picture your child's face the next time something goes wrong online. Now say it out loud, the way you'll say it to them: you won't lose your device for telling me.",
"beats": [
"Take one slow breath.",
"Picture your child's face the next time something goes wrong online.",
{
"t": "Now say it out loud, the way you'll say it to them: you won't lose your device for telling me.",
"w": 10
}
]
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A family tech plan",
"Made together"
],
[
"Unplugged bedtime",
"Chargers outside bedrooms"
],
[
"Keep checking in",
"Online life is real life"
]
],
"say": "What helps most over time. Make a family tech plan together, so everyone knows the rules ahead of time. Keep bedtime unplugged, with chargers outside the bedrooms. And keep checking in about online life, because for kids, online life is real life. Families can talk about living their values everywhere: kindness online is still kindness.",
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
"h": "Stay the safe place to tell.",
"sub": "Your calm keeps the door open.",
"say": "If online trouble keeps a child from school, sleep, or friends, talk with the school counselor or their pediatrician. And be gentle with yourself. The online world changes fast, and none of us has all the answers. Stay the safe place to tell. That matters most."
}
]
}
},
{
"id": "attention",
"ring": "mp-school",
"title": "Attention and Learning Differences",
"you": {
"id": "mp-g-attention-you",
"guide": "attention",
"side": "you",
"title": "Attention and Learning Differences",
"sideName": "For You",
"mins": 3,
"sources": [
[
"CHADD",
"https://chadd.org"
],
[
"Understood",
"https://www.understood.org"
],
[
"PACER Center (Minnesota)",
"https://www.pacer.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Attention and Learning Differences",
"sub": "For You",
"say": "If school feels extra hard for you sometimes, this is for you. Maybe sitting still is hard, or reading, or math. Every brain learns in its own way."
},
{
"k": "words",
"h": "Maybe for you",
"items": [
"Sitting still is hard",
"Letters get mixed up",
"Math takes a long time",
"Your mind wanders off"
],
"say": "Maybe sitting still feels really hard. Maybe letters and sounds get mixed up. Maybe math or homework takes a long, long time. Maybe your mind wanders off when you're trying to listen. Lots and lots of kids feel this way. Feeling frustrated about it is okay."
},
{
"k": "card",
"title": "Your brain is smart in its own way.",
"body": "Good at some things. Working harder at others.",
"say": "Your brain is really good at some things, and it has to work harder at others. That's true for everybody, kids and grown-ups. Lots of very smart people have brains like yours. And a hard time focusing or reading is not the same as not trying."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Move your body",
"Wiggle, stretch, take a break"
],
[
"One step at a time",
"Small pieces are easier"
],
[
"Ask for help",
"A smart thing to do"
]
],
"say": "Here are things that can help. Move your body: wiggle, stretch, or take a quick break. Do one step at a time, because small pieces are easier. And ask for help when you need it. Asking is a smart thing to do.",
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
"h": "Wiggle, then settle",
"sub": "Shake it out. Then breathe slow.",
"say": "Let's try it now. Shake your hands, and wiggle your shoulders. Now let your body get still. Breathe in slowly, and let it out slowly. Say out loud one thing you are good at.",
"beats": [
"Let's try it now.",
"Shake your hands, and wiggle your shoulders.",
"Now let your body get still.",
"Breathe in slowly, and let it out slowly.",
{
"t": "Say out loud one thing you are good at.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up how school feels.",
"body": "A parent, a teacher, or your school counselor.",
"say": "Tell a grown-up how school feels for you: a parent, a grandparent, a teacher, or your school counselor. Grown-ups can find tools that make school easier. Some kids get extra help, and that's fair. Everybody needs different things to learn."
},
{
"k": "big",
"h": "Different is not less.",
"sub": "You have gifts to share.",
"say": "Every brain learns in its own way. Different is not less. You have gifts to share, just the way you are."
}
]
},
"helper": {
"id": "mp-g-attention-helper",
"guide": "attention",
"side": "helper",
"title": "Attention and Learning Differences",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"CHADD",
"https://chadd.org"
],
[
"Understood",
"https://www.understood.org"
],
[
"PACER Center (Minnesota)",
"https://www.pacer.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Attention and Learning Differences",
"sub": "For the Grown-up",
"say": "When a child you love struggles to focus, sit still, read, or keep up at school, this is for you. Every brain learns differently. A hard time focusing or reading is not laziness."
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"Struggling much more than peers"
],
[
"Early reading",
"Trouble with letters and sounds"
],
[
"Older kids",
"Feeling dumb or different"
]
],
"say": "Young children are wiggly and distractible by nature, so ADHD can be hard to tell apart from being five. What stands out is a child who struggles much more than peers, in more than one place, for months. Trouble learning letters and sounds can be an early sign of dyslexia. Older kids may start to feel dumb or different, especially when reading, math, or homework takes them much longer. Some act out to cover it. Others go quiet.",
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
"title": "This is nobody's fault.",
"body": "Your child did not choose their brain, and neither did you.",
"say": "First, a word for you. Your child did not choose their brain, and neither did you. This is nobody's fault. Then get the facts. Talk with their teacher and their doctor about what they see, at school and at home."
},
{
"k": "card",
"title": "You can ask for an evaluation.",
"body": "Ask the school in writing.",
"say": "If school is a daily struggle, you can ask the school for a special education evaluation. Put the request in writing. Public schools evaluate at no cost to families, and reading, writing, or math that stays far behind is a good reason to ask."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Your brain is good at some things.\"",
"\"Lots of very smart people have brains like yours.\"",
"\"Extra help is fair.\""
],
"say": "Tell them the truth in kind words. Your brain is really good at some things and has to work harder at others. That's true for everybody. If they ask, am I stupid, say: no. Your brain learns in its own way. Lots of very smart people have brains like yours. If they ask why they get extra help, try: everybody needs different things to learn. Extra help is fair when it gives you what you need."
},
{
"k": "card",
"title": "If medicine is part of the plan",
"body": "\"It's like glasses for your attention.\"",
"say": "If their doctor makes medicine part of the plan, and your child asks why, you can say: it's like glasses for your attention. It helps your brain focus, and it doesn't change who you are. Questions about medicine belong with their doctor."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Short tasks, clear steps",
"One thing at a time"
],
[
"Pictures and checklists",
"For everyday routines"
],
[
"Movement breaks",
"Wiggles are welcome"
],
[
"Praise effort",
"And progress, not just grades"
]
],
"say": "What helps at home. Keep tasks short, with clear steps, one thing at a time. Use routines with pictures or checklists. Build in movement breaks. And praise effort and progress, not just grades. At school, supports like an IEP or a 504 plan, and a plan from their doctor, can make a big difference.",
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
"h": "Words that close the door",
"items": [
"Lazy, careless, \"not trying\"",
"Comparing to siblings or classmates",
"No recess as a punishment"
],
"say": "Some things make it harder. Calling them lazy, careless, or not trying. Comparing them to siblings or classmates. And taking away recess or movement as a punishment, when movement is often what helps them focus."
},
{
"k": "big",
"h": "Name one strength.",
"sub": "Then say it to them today.",
"say": "Kids with ADHD or learning differences hear a lot of correction. Take a slow breath. Think of one real strength your child has. Now say it out loud, the way you'll say it to them today.",
"beats": [
"Kids with ADHD or learning differences hear a lot of correction.",
"Take a slow breath.",
"Think of one real strength your child has.",
{
"t": "Now say it out loud, the way you'll say it to them today.",
"w": 10
}
]
},
{
"k": "big",
"h": "Different is not less.",
"sub": "Notice their strengths, often.",
"say": "Check in often about how school feels, not only how it's going. Plans change as kids grow, so meet with the school at least once a year. Talk with their doctor if your child seems very sad, anxious, or says they hate themselves. Look after yourself too. Different is not less. Notice their strengths, often."
}
]
}
},
{
"id": "lying",
"ring": "mp-school",
"title": "Lying and Taking Things",
"you": {
"id": "mp-g-lying-you",
"guide": "lying",
"side": "you",
"title": "Lying and Taking Things",
"sideName": "For You",
"mins": 3,
"sources": [
"tangney",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Lying and Taking Things",
"sub": "For You",
"say": "If you told a lie, or took something that wasn't yours, this is for you. Lots of kids do this sometimes. You are a good kid, and you are still learning."
},
{
"k": "big",
"h": "Everybody makes mistakes.",
"sub": "Even grown-ups.",
"say": "Sometimes a lie pops out because we're scared of getting in trouble. Sometimes we take something because we really, really want it. Everybody makes mistakes, even grown-ups. A mistake is something you did. It is not who you are."
},
{
"k": "card",
"title": "The truth brings you closer.",
"body": "Grown-ups who love you are glad you told.",
"say": "Telling the truth can feel scary. But the truth brings you closer to the people who love you. Your grown-up might feel upset for a minute, and they still love you all the way. Grown-ups who love you are glad when you tell the truth."
},
{
"k": "flow",
"h": "Making it right",
"steps": [
[
"Tell the truth",
"Even when it is hard"
],
[
"Give it back",
"Your grown-up comes too"
],
[
"Say sorry",
"Think how they felt"
]
],
"say": "Here's how we make it right. Tell the truth, even when it's hard. If you took something, give it back. Your grown-up will help, and go with you. And say sorry. Think about how the other person felt.",
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
"h": "Hand on your heart",
"sub": "Say: I can tell the truth.",
"say": "Let's try something brave together. Put your hand on your heart. Take a slow breath in, and let it out slowly. Now say it out loud: I can tell the truth.",
"beats": [
"Let's try something brave together.",
"Put your hand on your heart.",
"Take a slow breath in, and let it out slowly.",
{
"t": "Now say it out loud: I can tell the truth.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, or your school counselor.",
"say": "If something is on your mind, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. They will help you make it right. And if you are ever hungry, or need something for school, tell a grown-up. Grown-ups can help with that."
},
{
"k": "big",
"h": "The truth makes a new start.",
"sub": "You are loved all the way.",
"say": "Once it's made right, it's over. Telling the truth helps you start fresh. You are a good kid, still learning, and you are loved all the way."
}
]
},
"helper": {
"id": "mp-g-lying-helper",
"guide": "lying",
"side": "helper",
"title": "Lying and Taking Things",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"tangney",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Lying and Taking Things",
"sub": "For the Grown-up",
"say": "When a child you love lies or takes something that isn't theirs, this is for you. It's common in young kids, and it's part of learning right from wrong. How you respond teaches more than the mistake does."
},
{
"k": "points",
"h": "What it means by age",
"items": [
[
"Younger kids",
"Wishes and facts mix"
],
[
"Older kids",
"Avoiding trouble, fitting in"
],
[
"Taking things",
"Wanting, or a bigger feeling"
]
],
"say": "Young children, kindergarten to second grade, mix wishes and facts, and may not fully understand that things belong to other people. A child who says the dog ate the cookies is often testing, not scheming. Older kids know the difference. They usually lie to avoid trouble, to fit in, or to protect someone. Taking things may be about wanting something they can't have, or about a bigger feeling.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "card",
"title": "Big reactions teach better lying.",
"body": "Stay calm. Make the truth safe.",
"say": "Stay calm. Big reactions teach kids to lie better, not less. Before you talk, ask yourself what the lie or the taking might be protecting them from. And make telling the truth safe: a smaller consequence when they own up."
},
{
"k": "card",
"title": "Skip the trap question.",
"body": "If you know the truth, say what you know.",
"say": "If you already know the truth, skip the trap question. Asking, did you take that, when you know they did, invites a lie. Say what you know instead: I know the toy came from your friend's house. Let's talk about it. You're not in big trouble."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I love you no matter what.\"",
"\"I will always be glad you told me the truth.\"",
"\"When we take something, we make it right.\""
],
"say": "Words that help. I love you no matter what. I want us to be able to tell each other the truth. If they ask, are you going to be mad, try: I might feel upset for a minute, but I will always love you, and I will always be glad you told me the truth. If they ask, do I have to give it back: yes. When we take something, we make it right. I will come with you."
},
{
"k": "words",
"h": "Words that close the door",
"items": [
"Liar. Thief.",
"Trap questions",
"Harsh punishments"
],
"say": "Some things close the door. Calling them a liar or a thief: a child hears, I am bad, instead of, I did something wrong. Trap questions, when you already know the answer. And harsh punishments, which teach hiding, not honesty."
},
{
"k": "flow",
"h": "Making it right",
"steps": [
[
"Fit the mistake",
"Return, pay back, or say sorry"
],
[
"Talk about feelings",
"How did they feel?"
],
[
"Praise honesty",
"Right away, especially when hard"
],
[
"Let it be over",
"Once it is made right"
]
],
"say": "Help them make it right in a way that fits the mistake: return it, pay it back, or say sorry. Talk about how the other person felt. Praise honesty right away, especially when it's hard. And once it's been made right, let the mistake be over. Many families, and many faith traditions, teach that honesty and making amends go together, and that forgiveness makes a new start possible.",
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
"h": "Picture the next time.",
"sub": "Say it calmly, out loud.",
"say": "Take a slow breath. Picture the next time you catch a fib, or find something that isn't theirs. Now say it out loud, calm and warm: I love you no matter what, and we're going to make this right.",
"beats": [
"Take a slow breath.",
"Picture the next time you catch a fib, or find something that isn't theirs.",
{
"t": "Now say it out loud, calm and warm: I love you no matter what, and we're going to make this right.",
"w": 10
}
]
},
{
"k": "big",
"h": "Make the truth safe.",
"sub": "And tell it yourself, too.",
"say": "Tell the truth yourself, even about small things. Kids learn honesty by watching. Talk with their doctor or school counselor if lying or stealing is frequent, getting worse, or comes with fighting, cruelty, or big changes in mood. If a child is taking food or basics, it may point to a need, and 211 can connect you with local resources. Be gentle with yourself too. Make the truth safe, and love them all the way."
}
]
}
},
{
"id": "moving",
"ring": "mp-community",
"title": "Moving",
"you": {
"id": "mp-g-moving-you",
"guide": "moving",
"side": "you",
"title": "Moving",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Moving",
"sub": "For You",
"say": "If your family is moving to a new home, this is for you. Moving is a big change. You can have big feelings about it, and that's okay."
},
{
"k": "words",
"h": "Moving can feel",
"items": [
"Sad",
"Excited",
"Worried",
"Mad",
"All at once"
],
"say": "Moving can bring lots of feelings. You might feel sad to leave your friends. You might feel excited about a new room. You might feel worried, or even mad. You can feel all of them at once. Every feeling is okay."
},
{
"k": "card",
"title": "Ask what comes along.",
"body": "Your grown-up can tell you.",
"say": "Some kids wonder if their toys, their pets, or their family will come too. That's a good question! Your grown-up can tell you what's coming along. And lots of things stay the same, like the people who love you."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Say goodbye",
"To friends and favorite places"
],
[
"Help pack",
"Your own special things"
],
[
"Plan your room",
"Where will your bed go?"
],
[
"Keep in touch",
"Calls, pictures, letters"
]
],
"say": "Here are things you can do. Say goodbye to your friends and your favorite places. Help pack your own special things. Plan your new room. Where will your bed go? And make a plan with your grown-up to keep in touch with friends.",
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
"k": "big",
"h": "Hand on your heart",
"sub": "Think of someone you will miss.",
"say": "Let's try something. Put your hand on your heart. Think of a friend or a place you'll miss. Now take a slow breath, and say, I'll remember you.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Think of a friend or a place you'll miss.",
{
"t": "Now take a slow breath, and say, I'll remember you.",
"w": 10
}
]
},
{
"k": "card",
"title": "New places take time.",
"body": "One friend. One favorite spot.",
"say": "At first, a new place can feel strange. That's normal, and it takes time. Your grown-up can help you find one new friend and one favorite spot, like a swing. And tell a grown-up how it's going: a parent, a grandparent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "You bring your heart with you.",
"sub": "Old friends and new friends both count.",
"say": "You bring your whole self to your new home: your laugh, your ideas, and your memories. Old friends and new friends both count. There's room in your heart for all of them."
}
]
},
"helper": {
"id": "mp-g-moving-helper",
"guide": "moving",
"side": "helper",
"title": "Moving",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Moving",
"sub": "For the Grown-up",
"say": "When a child you love is moving to a new home, this is for you. A move is a big change for a child, even a happy one, and you can help them through it."
},
{
"k": "points",
"h": "What a move can stir up",
"items": [
[
"Younger kids",
"Will my things and pets come?"
],
[
"Older kids",
"Missing friends, school, teams"
],
[
"Anger is common",
"They did not choose this"
]
],
"say": "Children feel a move differently at different ages. Younger children, kindergarten to second grade, may worry that their toys, their pets, or even their family won't come along. Older children, grades three to five, may grieve friends, their school, and their teams. They may also feel angry about a change they didn't choose. That anger usually comes from loss, and it makes sense.",
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
"title": "Give as much notice as you can.",
"body": "Then talk about what stays the same.",
"say": "Give them as much notice as you can. Pick a calm moment and keep it simple: we're going to move to a new house this summer. Let's talk about what that will be like. Then talk about what stays the same, not just what changes: the people who love them, the routines you'll keep, and the things that are coming along."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Yes. It takes some time, and I'll help you.\"",
"\"We'll keep their numbers and plan calls.\"",
"\"It makes sense to be sad about leaving.\""
],
"say": "Words that help. When they ask, will I have friends there? Try: yes. It takes some time, and I'll help you. When they ask, can I still talk to my friends here? Try: yes. We'll keep their numbers and plan calls. And when they're sad, try: it makes sense to be sad about leaving. What will you miss most?"
},
{
"k": "flow",
"h": "Say goodbye well",
"steps": [
[
"Visit favorite places",
"One more time, together"
],
[
"Take pictures",
"Friends, their room, the yard"
],
[
"Make a memory book",
"Or have a goodbye party"
],
[
"Trade addresses",
"And plan the first call"
]
],
"say": "Help them say goodbye well. Visit favorite places together one more time. Take pictures of friends, their room, and the yard. Make a memory book, or have a small goodbye party. And trade addresses, and plan the first call before you leave.",
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
"k": "points",
"h": "Give them a part to play",
"items": [
[
"Pack their own things",
"A box that is theirs"
],
[
"Plan the new room",
"Where the bed goes, a color"
],
[
"Unpack their room first",
"So home starts there"
]
],
"say": "A little say in a big change goes a long way. Let them pack their own special things. Let them help plan their new room. And when you arrive, unpack their room first, so home starts there. Keep favorite bedtime routines going from the very first night. Some families also mark the new home with a house blessing or a first-night tradition, a simple way to say this is a fresh start.",
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
"title": "Their grief is real.",
"body": "Listen first. The bright side can wait.",
"say": "Make room for their grief about leaving. Lines like, you'll make new friends in no time, or, there's nothing to be sad about, can teach a child to hide their feelings. Listen first. Name what they're missing. The bright side can wait until they're ready."
},
{
"k": "big",
"h": "What will stay the same?",
"sub": "Name three things out loud.",
"say": "Take a slow breath. Think about your child and this move. Now name, out loud, three things that will stay the same for them.",
"beats": [
"Take a slow breath.",
"Think about your child and this move.",
{
"t": "Now name, out loud, three things that will stay the same for them.",
"w": 10
}
]
},
{
"k": "card",
"title": "Give it a few months.",
"body": "One friend. One favorite spot.",
"say": "In the new place, help them find one friend and one favorite spot: a park, a library corner, a swing. Expect a few months of adjustment. If sadness or pulling away is still strong months after the move, talk with the school counselor or their pediatrician. And be gentle with yourself. Moving is a lot for grown-ups too."
},
{
"k": "big",
"h": "Roots travel with us.",
"sub": "Old friends and new ones both count.",
"say": "Say goodbye well, keep what stays the same close, and give it time. Old friends and new ones both count, and roots travel with us."
}
]
}
},
{
"id": "community-tragedy",
"ring": "mp-community",
"title": "A Tragedy in the Community",
"you": {
"id": "mp-g-community-tragedy-you",
"guide": "community-tragedy",
"side": "you",
"title": "A Tragedy in the Community",
"sideName": "For You",
"mins": 3,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"National Association of School Psychologists",
"https://www.nasponline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Tragedy in the Community",
"sub": "For You",
"say": "If something sad happened in your town, this is for you. When sad news happens close to home, kids can have lots of feelings. Every one of them is okay."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Scared",
"Mixed up",
"Full of questions"
],
"say": "You might feel sad. You might feel scared, or mixed up. You might have lots of questions. Some kids feel fine, and that's okay too. Your feelings might come and go for a while."
},
{
"k": "card",
"title": "Helpers come.",
"body": "Lots of grown-ups are working to keep you safe.",
"say": "When something sad happens, helpers come. Firefighters, police officers, doctors, nurses, and neighbors come to help. Things like this are very rare. And lots of grown-ups are working to keep you safe."
},
{
"k": "card",
"title": "Ask your grown-up.",
"body": "They can help you know what is true.",
"say": "You might hear kids at school talking about it. Some of what they say might not be true. If you hear something that worries you, ask a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. They can help you know what's true. And if a video or the news feels scary, it's okay to look away and find your grown-up."
},
{
"k": "big",
"h": "Squeeze and let go",
"sub": "Squeeze your hands. Then let them go soft.",
"say": "Let's try something together. Make two tight fists, and squeeze. Now let your hands go soft and floppy. Take a slow breath, and do it one more time.",
"beats": [
"Let's try something together.",
"Make two tight fists, and squeeze.",
"Now let your hands go soft and floppy.",
{
"t": "Take a slow breath, and do it one more time.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Make a card",
"For the helpers or a family"
],
[
"Draw your feelings",
"Then show your grown-up"
],
[
"Do something kind",
"With your family"
]
],
"say": "When you feel sad, you can do something. Make a card for the helpers, or for a family who is sad. Draw how you feel, and show your grown-up. Or do something kind with your family. Some families light a candle or say a prayer together too.",
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
"h": "You have people with you.",
"sub": "Your grown-ups are right here.",
"say": "Sad things can happen, and helpers come. Your grown-ups are right here with you. You have people with you."
}
]
},
"helper": {
"id": "mp-g-community-tragedy-helper",
"guide": "community-tragedy",
"side": "helper",
"title": "A Tragedy in the Community",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Tragedy in the Community",
"sub": "For the Grown-up",
"say": "When something sad happens in your community and a child you love hears about it, this is for you. You can help them feel safe, even when the news is hard."
},
{
"k": "card",
"title": "Get the facts first.",
"body": "Then share simple facts before the rumors.",
"say": "Before you talk, get the facts from reliable sources. Notice your own feelings too, because kids borrow our calm. Then share simple facts before they hear rumors at school or online. Try: something sad happened in our town. You might hear kids talking about it. Can I tell you what I know?"
},
{
"k": "points",
"h": "What it looks like by age",
"items": [
[
"Younger kids",
"Short facts, lots of reassurance"
],
[
"Older kids",
"Details, why, and could it be us?"
],
[
"Later on",
"Feelings can show up weeks after"
]
],
"say": "Children take this in differently by age. Younger children, kindergarten to second grade, need short, simple facts and lots of reassurance. Older children, grades three to five, may want details, ask why, and worry it could happen to them. And reactions can come later, days or even weeks after, in sleep, play, or questions.",
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
"h": "Words that help",
"items": [
"\"It's very rare.\"",
"\"Many people are working to keep us safe.\"",
"\"What have you heard?\""
],
"say": "When they ask, could that happen to us? Try: it's very rare. There are many people working to keep us safe. Ask what they've heard, so you can gently correct what's wrong. Keep answers short and true, and leave out graphic detail. And when they ask why, it's okay to say: I don't know. I wonder about that too."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Find the helpers",
"Name them together"
],
[
"Keep routines steady",
"Meals, school, bedtime"
],
[
"Let them do something",
"A card, a donation, a prayer"
],
[
"Watch for later feelings",
"Sleep, play, questions"
]
],
"say": "What helps. Find the helpers together: the firefighters, nurses, teachers, and neighbors who showed up. Keep routines steady, because ordinary days feel safe. Let them do something: a card, a donation, or a prayer, if your family prays. Communities often gather to grieve together, and kids can take part in age-right ways. And watch for delayed reactions in sleep, play, or questions.",
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
"title": "Turn the news off.",
"body": "Especially videos. Keep screens in grown-up hands.",
"say": "Keep the news out of the background. Limit news and social media, especially videos. A young child may think a replayed clip is happening again. If older kids see something online, ask what they saw, and talk it through together."
},
{
"k": "big",
"h": "Who are the helpers?",
"sub": "Name three out loud.",
"say": "Take a slow breath. Think of the helpers in your own town. Now say three of them out loud, the way you'd name them for your child.",
"beats": [
"Take a slow breath.",
"Think of the helpers in your own town.",
{
"t": "Now say three of them out loud, the way you'd name them for your child.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Nightmares or fears that last for weeks.",
"say": "Talk with the school counselor or their pediatrician if nightmares or fears last for weeks, especially for children close to the event, like a friend, a neighbor, or a classmate of someone involved. And look after your own heart. Sad news close to home touches grown-ups too. Lean on the people around you."
},
{
"k": "big",
"h": "Simple facts. Steady routines. Helpers.",
"sub": "Your calm is their safe place.",
"say": "Share simple facts, keep routines steady, and find the helpers together. Your calm becomes their safe place."
}
]
}
},
{
"id": "fire",
"ring": "mp-community",
"title": "A House Fire",
"you": {
"id": "mp-g-fire-you",
"guide": "fire",
"side": "you",
"title": "A House Fire",
"sideName": "For You",
"mins": 3,
"sources": [
[
"American Red Cross",
"https://www.redcross.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A House Fire",
"sub": "For You",
"say": "If your family had a fire at home, this is for you. A fire is scary. You might have lots of feelings about it, and that's okay."
},
{
"k": "big",
"h": "The fire is over.",
"sub": "Grown-ups are helping your family.",
"say": "The fire was scary. Now the fire is over. Lots of grown-ups are helping your family, and they will keep helping."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad",
"Mad",
"Worried"
],
"say": "After a fire, you might feel scared. You might feel sad about your room, your toys, or something special that got lost. You might feel mad, or worried that it could happen again. Every one of those feelings is okay. It's okay to be sad about things, even small things."
},
{
"k": "card",
"title": "Smells and sirens",
"body": "They might bring the scary feeling back.",
"say": "Sometimes a smoky smell or a siren might bring the scary feeling back. That's your body remembering. Find a grown-up who takes care of you, like a parent, a grandparent, a teacher, or your school counselor. You can say: I'm feeling scared again. Tell them about bad dreams too."
},
{
"k": "big",
"h": "Balloon breath",
"sub": "Breathe in slow. Let it out slow.",
"say": "Let's try a balloon breath together. Put your hands on your tummy. Breathe in slowly, and fill your tummy up like a big balloon. Now let the air out slowly, and do it two more times.",
"beats": [
"Let's try a balloon breath together.",
"Put your hands on your tummy.",
"Breathe in slowly, and fill your tummy up like a big balloon.",
{
"t": "Now let the air out slowly, and do it two more times.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Hold something cozy",
"A blanket or a stuffed animal"
],
[
"Draw or play",
"Then show your grown-up"
],
[
"Practice a fire plan",
"With your family"
]
],
"say": "Here are things that help. Hold something cozy, like a soft blanket or a stuffed animal. Draw a picture or play with your toys, and show your grown-up. And practice a fire plan with your family, so everyone knows what to do. Your grown-ups lead the plan, and you can help.",
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
"h": "You have people with you.",
"sub": "Lots of people are helping.",
"say": "Things can be lost in a fire, and your feelings matter. Your grown-ups are right here, and lots of people are helping. You have people with you."
}
]
},
"helper": {
"id": "mp-g-fire-helper",
"guide": "fire",
"side": "helper",
"title": "A House Fire",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"American Red Cross",
"https://www.redcross.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A House Fire",
"sub": "For the Grown-up",
"say": "When a child you love has been through a house fire, this is for you. You're carrying a lot right now. Here's how to help your child, and yourself."
},
{
"k": "big",
"h": "Safe, and allowed to be sad.",
"sub": "Both can be true.",
"say": "Start with what's true and steady. Try: the fire was scary, and we're safe. We can be sad about the things we lost. Safety comes first, and then room for grief."
},
{
"k": "points",
"h": "What it looks like by age",
"items": [
[
"Younger kids",
"Nightmares, playing out the fire"
],
[
"Older kids",
"Will it happen again?"
],
[
"Grief for things",
"Toys, rooms, pets"
]
],
"say": "Children show it differently by age. Younger children, kindergarten to second grade, may have nightmares or play out the fire with their toys. That play is how they make sense of it. Older children, grades three to five, may worry it will happen again. They may grieve lost belongings or pets, even small things.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "card",
"title": "They are more than things.",
"body": "A lost toy can be a real loss.",
"say": "Let them grieve lost things, even small ones. Telling a child not to be sad because they're just things can teach them to hide it. To a child, a blanket or a stuffed animal is part of home. Name it with them: you really loved that bear. Of course you miss it."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"The fire was scary, and we're safe.\"",
"\"Fires are rare.\"",
"\"We'll practice our fire plan.\""
],
"say": "When they ask, will it happen again? Try: fires are rare. We'll practice our fire plan so we all know what to do. Answer once, kindly, and come back to what's steady."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Replace a comfort item",
"As soon as you can"
],
[
"Keep routines going",
"Wherever you are staying"
],
[
"Practice a fire plan",
"Calm, short, together"
],
[
"Expect reminders",
"Smoke smells, sirens"
]
],
"say": "What helps. Replace a comfort item as quickly as you can. Keep routines and comfort items going wherever you're staying, even in a hotel or a relative's home. Practice a family fire plan together, calm and short, to rebuild a sense of control. And expect reminders, like smoke smells or sirens, to bring feelings back. When that happens, name it and stay close.",
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
"title": "Accept help.",
"body": "Friends, faith communities, agencies.",
"say": "Accept help from friends, faith communities, and agencies. Faith communities often rally around families after a fire, offering help and a place to belong, if that's part of your life. The American Red Cross helps families after home fires. Let the school know too, so teachers can be flexible with materials and homework."
},
{
"k": "big",
"h": "Who can you lean on this week?",
"sub": "Say one name out loud.",
"say": "Take a slow breath. You've been holding a lot. Now say, out loud, one person or one place you can lean on this week.",
"beats": [
"Take a slow breath.",
"You've been holding a lot.",
{
"t": "Now say, out loud, one person or one place you can lean on this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Nightmares or fears that keep going for weeks.",
"say": "If nightmares, fears, or fire play keep going for weeks, or grow stronger, talk with their pediatrician or the school counselor. And look after yourself. A fire turns grown-up life upside down too. Your steadiness matters, so let others help carry the load."
},
{
"k": "big",
"h": "Safe together, with room to grieve.",
"sub": "Your steady presence is home.",
"say": "You're safe together, and there's room to grieve what was lost. Wherever you're staying, your steady presence is home."
}
]
}
},
{
"id": "crime",
"ring": "mp-community",
"title": "Crime in the Neighborhood",
"you": {
"id": "mp-g-crime-you",
"guide": "crime",
"side": "you",
"title": "Crime in the Neighborhood",
"sideName": "For You",
"mins": 2,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Crime in the Neighborhood",
"sub": "For You",
"say": "If something scary happened in your neighborhood, this is for you. Maybe you heard about a break-in, or saw police cars and heard sirens. Let's talk about it together."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Jumpy at night",
"Full of questions",
"Okay, then scared again"
],
"say": "You might feel scared. You might feel jumpy at night, and listen hard for every little sound. You might have lots of questions. You might feel okay, and then scared again. All of those feelings are normal, and it's okay to have them."
},
{
"k": "points",
"h": "Who keeps you safe",
"items": [
[
"Your grown-ups",
"They lock the doors"
],
[
"Neighbors",
"They watch out for each other"
],
[
"Helpers",
"Police officers come to help"
]
],
"say": "Lots of people work to keep you safe. Your grown-ups lock the doors at night. Neighbors watch out for each other. And helpers, like police officers, come when someone needs help. Keeping you safe is a grown-up job, and the grown-ups are doing it.",
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
"h": "Squeeze and let go",
"sub": "Like squeezing two lemons.",
"say": "Let's help your body feel calm. Make two tight fists, like you're squeezing lemons. Squeeze, squeeze, squeeze. Now let go, and let your hands go soft and floppy.",
"beats": [
"Let's help your body feel calm.",
"Make two tight fists, like you're squeezing lemons.",
"Squeeze, squeeze, squeeze.",
{
"t": "Now let go, and let your hands go soft and floppy.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "If scary thoughts come, especially at bedtime, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. You can ask them anything. Scary thoughts often get smaller when you share them."
},
{
"k": "card",
"title": "If anyone hurts you, tell.",
"body": "Keep telling until someone helps.",
"say": "Here's something important. If anyone ever hurts you, tell a safe grown-up. If they don't help, tell another one. Keep telling until someone helps. It is never your fault."
},
{
"k": "big",
"h": "You have people with you.",
"sub": "Lots of people help keep you safe.",
"say": "You have people with you in this. Lots of people are helping to keep you safe, and the grown-ups who love you are right here."
}
]
},
"helper": {
"id": "mp-g-crime-helper",
"guide": "crime",
"side": "helper",
"title": "Crime in the Neighborhood",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Crime in the Neighborhood",
"sub": "For the Grown-up",
"say": "When something happens in your neighborhood, like a break-in or a robbery, and a child you love is scared, this is for you. Calm, simple words can help them feel safe again."
},
{
"k": "points",
"h": "What fits their age",
"items": [
[
"Kindergarten to grade 2",
"Fear of someone coming in"
],
[
"Grades 3 to 5",
"More questions, wary outside"
],
[
"Any age",
"Bedtime fears, clinging"
]
],
"say": "Fear looks different by age. Younger children may fear that bad people will come into their home. Older children may want more details, or feel unsafe walking or playing outside. At any age, fear often shows up at bedtime, or as clinging, or as the same question again and again.",
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
"title": "Check your own fear first.",
"body": "Kids borrow our calm.",
"say": "Before you talk, check your own fear. It makes sense if you're shaken too. Kids borrow our calm, so take a breath first, and find another grown-up to talk with about your own worries, away from the kids."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Let's talk about what happened.\"",
"\"Neighbors watch out for each other.\"",
"\"What questions do you have?\""
],
"say": "Words that help. You heard about the break-in down the street. Let's talk about what happened and how we stay safe. Share age-right facts, then focus on safety. If they ask whether someone will break into your house, try: we lock our doors, and neighbors watch out for each other. It's very unlikely. Then ask, what questions do you have?"
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"A simple family safety plan",
"Locked doors, who to call"
],
[
"Get to know neighbors",
"Friendly faces nearby"
],
[
"Name the helpers",
"Neighbors, police, community"
],
[
"Keep routines steady",
"Meals, school, bedtime"
]
],
"say": "What helps. Make a simple family safety plan together: we lock the doors, and here's who we call. Get to know your neighbors, so kids see friendly faces nearby. Name the helpers: neighbors, police, and people in the community. And keep routines steady, especially bedtime.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Grown-up talk within earshot"
],
[
"Scary news on replay"
],
[
"Promises no one can keep"
]
],
"say": "Leave a few things out. Grown-up conversations about crime within earshot. Kids hear more than we think. Scary news and videos playing over and over. And promises like, nothing bad will ever happen. Name who keeps them safe instead.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "big",
"h": "Picture bedtime tonight.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture bedtime tonight, and your child asking if the house is safe. Now say, out loud, the words you'll use: we lock our doors, and I'm right here.",
"beats": [
"Take a slow breath.",
"Picture bedtime tonight, and your child asking if the house is safe.",
{
"t": "Now say, out loud, the words you'll use: we lock our doors, and I'm right here.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to get more help",
"body": "Fear that lasts. A child who saw it, or was hurt.",
"say": "Watch for fears that keep coming back at bedtime. If fear lasts for weeks, or your child saw a crime happen, talk with their pediatrician or school counselor about a child therapist. If anyone hurt your child, stay calm, believe them, and get help the same day. For danger right now, call 911."
},
{
"k": "big",
"h": "Calm, true, and close.",
"sub": "Safe grown-ups all around.",
"say": "Look after your own fear too, and lean on people you trust. Many families find comfort in a quiet moment together, a walk to wave at neighbors, or a prayer for peace in the neighborhood. Stay calm, keep it simple and true, and stay close."
}
]
}
},
{
"id": "immigration",
"ring": "mp-community",
"title": "Immigration Raids and Fear of Family Separation",
"you": {
"id": "mp-g-immigration-you",
"guide": "immigration",
"side": "you",
"title": "Immigration Raids and Fear of Family Separation",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org: Talking with Children About Immigration Enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Immigration Raids and Fear of Family Separation",
"sub": "For You",
"say": "If you've heard grown-ups talking about immigration, or about families having to be apart, and it makes you scared, this is for you. Lots of kids feel this way."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Extra clingy",
"Hard to sleep",
"Worried at school"
],
"say": "You might feel scared. You might want to stay extra close to your grown-ups. It might be hard to sleep, or hard to think at school. Those feelings make sense, and it's okay to have them."
},
{
"k": "card",
"title": "You did nothing wrong.",
"body": "Grown-ups are working on these big problems.",
"say": "Here's something important. You did nothing wrong. These are big grown-up problems, and grown-ups are working on them. Your job is to be a kid: to learn, to play, and to be loved."
},
{
"k": "points",
"h": "Ask about the plan",
"items": [
[
"Who picks me up?",
"If plans change"
],
[
"A number to know",
"By heart"
],
[
"Who can I go to?",
"At school, too"
]
],
"say": "Lots of families make a plan, so a child always has someone to take care of them. Ask a grown-up at home. Who would pick me up if plans changed? What phone number should I know by heart? Who can I go to at school?",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "big",
"h": "Hand on your heart",
"sub": "Picture someone who loves you.",
"say": "Let's try something together. Put your hand on your heart. Breathe in slowly, and let it out slowly. Now picture someone who loves you, and say their name.",
"beats": [
"Let's try something together.",
"Put your hand on your heart.",
"Breathe in slowly, and let it out slowly.",
{
"t": "Now picture someone who loves you, and say their name.",
"w": 10
}
]
},
{
"k": "points",
"h": "Who you can tell",
"items": [
[
"A grown-up at home",
"Who takes care of you"
],
[
"A teacher",
"At school"
],
[
"The school counselor",
"A calm place to talk"
]
],
"say": "You don't have to keep scared feelings inside. Tell a grown-up at home who takes care of you. Tell a teacher you like. Or tell your school counselor. You can ask them anything, as many times as you need.",
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
"h": "You are loved, and you belong.",
"sub": "Lots of people care about you.",
"say": "You are loved, and you belong. Lots of people care about you, at home, at school, and in your community."
}
]
},
"helper": {
"id": "mp-g-immigration-helper",
"guide": "immigration",
"side": "helper",
"title": "Immigration Raids and Fear of Family Separation",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org: Talking with Children About Immigration Enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
],
[
"Immigrant Legal Resource Center: Family Preparedness Plan",
"https://www.ilrc.org/resources/step-step-family-preparedness-plan"
],
[
"Informed Immigrant",
"https://www.informedimmigrant.com"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Immigration Raids and Fear of Family Separation",
"sub": "For the Grown-up",
"say": "When a child you love is scared about immigration raids, or about a parent being taken away, this is for you. Their fear is real, whatever your family's situation. You can help them feel safe, prepared, and loved."
},
{
"k": "points",
"h": "What fits their age",
"items": [
[
"Kindergarten to grade 2",
"Clinging, trouble sleeping"
],
[
"Grades 3 to 5",
"Worry at school, protecting family"
],
[
"Any age",
"Fear rises with news or rumors"
]
],
"say": "Young children may cling, have trouble sleeping, or ask, will they take you away? They need simple, steady answers about who takes care of them. Older children may know more from classmates and the news. They may worry at school, or feel they must protect their parents or siblings. At any age, fear can rise with each new rumor.",
"cue": {
"at": [
0,
2,
4
]
}
},
{
"k": "card",
"title": "Decide how you want them to feel.",
"body": "Safe, prepared, and loved.",
"say": "Before you talk, decide how you want your child to feel afterward: safe, prepared, and loved. And find another adult to share your own worries with, away from the kids. Your calm is something they can lean on."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What have you heard?\"",
"\"It's okay to feel scared.\"",
"\"You will always have someone to take care of you.\""
],
"say": "Words that help. Start by asking, what have you heard about immigration at school or online? Then, it's okay to feel scared. We have a plan so you will always be taken care of. If they ask, will they take you away, be honest without overwhelming. Our family has a plan. If I ever couldn't pick you up, Aunt Rosa would come. You will always have someone to take care of you."
},
{
"k": "card",
"title": "Did we do something wrong?",
"body": "No. You did nothing wrong.",
"say": "Some children ask, did we do something wrong? Answer plainly. No. You did nothing wrong. Grown-ups are working on these big problems. Keep children out of the grown-up parts, like papers, legal talks, and money worries."
},
{
"k": "flow",
"h": "A family preparedness plan",
"steps": [
[
"Emergency contacts",
"Up to date at school"
],
[
"A trusted caregiver",
"Who would come for them"
],
[
"Documents in one place",
"Easy to find"
],
[
"A number by heart",
"Practiced together"
]
],
"say": "Every family, of any status, can benefit from a family preparedness plan. Name emergency contacts, and keep them up to date at school. Choose a trusted caregiver who would come for your child. Keep important documents in one place. And help your child learn a phone number by heart, practiced like a game.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Detailed talk within earshot"
],
[
"News and videos on replay"
],
[
"Promising nothing will happen"
]
],
"say": "Leave a few things out. Talking about raids or fears in detail within earshot. News and videos on replay. And promising that nothing will ever happen. Honest, steady words are easier to trust.",
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
"h": "Say it once, out loud.",
"sub": "So it is ready when they ask.",
"say": "Take a slow breath. Picture your child asking, will they take you away? Now say, out loud, the words you'll use: you will always have someone to take care of you.",
"beats": [
"Take a slow breath.",
"Picture your child asking, will they take you away?",
{
"t": "Now say, out loud, the words you'll use: you will always have someone to take care of you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Trusted help",
"body": "Legal aid for your situation. Counseling if fear stays.",
"say": "This video is not legal advice. For your family's situation, a trusted immigration legal aid organization is the right helper. If fear disrupts sleep, school, or daily life, talk with the school counselor or your child's pediatrician about counseling. Many faith communities also offer support, accompaniment, and prayer, so children know they belong and are held."
},
{
"k": "big",
"h": "Safe, prepared, and loved.",
"sub": "Check in often.",
"say": "Check in often, because fear can rise with news or rumors. Keep routines, and make home feel calm. And look after yourself too. Your child needs to feel safe, prepared, and loved, and so do you."
}
]
}
},
{
"id": "deported-classmate",
"ring": "mp-community",
"title": "When a Classmate's Family Is Deported",
"you": {
"id": "mp-g-deported-classmate-you",
"guide": "deported-classmate",
"side": "you",
"title": "When a Classmate's Family Is Deported",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org: Talking with Children About Immigration Enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Classmate's Family Is Deported",
"sub": "For You",
"say": "If a friend from your class had to move away very fast with their family, this is for you. It can feel confusing and sad when someone is suddenly gone."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Confused",
"Scared",
"Mad"
],
"say": "You might feel sad. You might feel confused, or scared, or even mad. You might feel all of those in one day. Every one of those feelings is okay. Missing your friend shows how much you care."
},
{
"k": "card",
"title": "You did nothing wrong.",
"body": "Your friend did nothing wrong either.",
"say": "Sometimes families have to move away because of big grown-up problems. Your friend did nothing wrong, and you did nothing wrong. Grown-up problems are for grown-ups to work on."
},
{
"k": "points",
"h": "Ways to keep caring",
"items": [
[
"Draw a picture",
"Of a happy time together"
],
[
"Make a card",
"With kind words"
],
[
"Send kind wishes",
"Or say a prayer"
]
],
"say": "You can still care about your friend. Draw a picture of a happy time you had together. Make a card with kind words. Think kind wishes for them, or say a prayer, if your family prays.",
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
"h": "Smell the flower. Blow out the candle.",
"sub": "Slow and gentle.",
"say": "Let's take a calm breath together. Pretend you're holding a flower, and smell it slowly. Now pretend it's a candle, and blow it out gently. Do it two more times.",
"beats": [
"Let's take a calm breath together.",
"Pretend you're holding a flower, and smell it slowly.",
"Now pretend it's a candle, and blow it out gently.",
{
"t": "Do it two more times.",
"w": 10
}
]
},
{
"k": "card",
"title": "Ask your questions.",
"body": "A parent, a teacher, your school counselor.",
"say": "You might wonder, will my friend come back? Could that happen to my family? Those are good questions to ask a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. They can help you know what is true for your family."
},
{
"k": "big",
"h": "You can keep them in your heart.",
"sub": "And wish them well.",
"say": "Even when a friend is far away, you can keep thinking of them and wishing them well. Your days here keep going, with school, and play, and the people who love you."
}
]
},
"helper": {
"id": "mp-g-deported-classmate-helper",
"guide": "deported-classmate",
"side": "helper",
"title": "When a Classmate's Family Is Deported",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org: Talking with Children About Immigration Enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Classmate's Family Is Deported",
"sub": "For the Grown-up",
"say": "When a child you love has a classmate whose family was deported, this is for you. Maybe the friend just stopped coming to school. You can help your child name what they feel, and find a way to keep caring."
},
{
"k": "points",
"h": "What fits their age",
"items": [
[
"Kindergarten to grade 2",
"Missing their friend"
],
[
"Grades 3 to 5",
"Could it happen to us?"
],
[
"Any age",
"Sad, confused, scared, or angry"
]
],
"say": "Younger children may simply miss their friend, and wonder where they went. Older children may worry that it could happen to their own family, or to other friends. At any age, kids may feel sad, confused, scared, or angry, sometimes all in one day.",
"cue": {
"at": [
0,
1,
2
]
}
},
{
"k": "card",
"title": "Share what you can, simply.",
"body": "No guessing. Respect the family's privacy.",
"say": "Share what you can, simply and without guessing. Respect the family's privacy, and share only what is appropriate. You may know very little, and that's okay. Try: Maria's family had to move away very quickly. We miss her. How are you feeling about it?"
},
{
"k": "words",
"h": "When they ask",
"items": [
"\"Will she come back?\"",
"\"We don't know. We can still think of her.\"",
"\"Could that happen to me?\""
],
"say": "Kids will ask questions. If they ask, will she come back, try: we don't know. We can still think of her and wish her well. If they ask, could that happen to me, answer honestly for your family, and name the plan that keeps them taken care of. Short, true answers help more than long ones."
},
{
"k": "flow",
"h": "Ways to keep caring",
"steps": [
[
"A card or a drawing",
"For their friend"
],
[
"A class card or memory book",
"If the school thinks it fits"
],
[
"Kind wishes or a prayer",
"If your family prays"
],
[
"Steady routines",
"School, play, bedtime"
]
],
"say": "Give them a way to keep caring. A card or a drawing for their friend. A class card or memory book, if the school thinks it's appropriate. Kind wishes, or a prayer, if your family prays. And keep routines steady, so the rest of their world feels the same.",
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
"k": "points",
"h": "Leave these out",
"items": [
[
"Guessing about the family"
],
[
"Political arguments nearby"
],
[
"Brushing off the sadness"
]
],
"say": "Leave a few things out. Guessing about the family's situation. Rumors grow fast, and the family deserves privacy. Political arguments in front of children, whatever your views. And brushing off the sadness. Missing a friend is a real loss.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "big",
"h": "Picture their question.",
"sub": "Then say your answer out loud.",
"say": "Take a slow breath. Picture your child asking, will she come back? Now say, out loud, the words you'll use: we don't know, and we can still think of her and wish her well.",
"beats": [
"Take a slow breath.",
"Picture your child asking, will she come back?",
{
"t": "Now say, out loud, the words you'll use: we don't know, and we can still think of her and wish her well.",
"w": 10
}
]
},
{
"k": "card",
"title": "Watch over the weeks",
"body": "Close friends, and fear or grief that stays.",
"say": "Check in over the next few weeks, especially if your child was a close friend. If fear or grief keeps going, and gets in the way of sleep, school, or play, talk with the school counselor or your child's pediatrician about more support."
},
{
"k": "big",
"h": "Name it. Keep caring. Stay steady.",
"sub": "Look after yourself too.",
"say": "This may stir your own feelings too. Talk with another grown-up, away from the kids. Then help your child name what they feel, find a way to keep caring, and know they are safe and loved."
}
]
}
},
{
"id": "politics",
"ring": "mp-country",
"title": "Elections and Political Disagreement",
"you": {
"id": "mp-g-politics-you",
"guide": "politics",
"side": "you",
"title": "Elections and Political Disagreement",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Elections and Political Disagreement",
"sub": "For You",
"say": "If you've heard grown-ups talking about voting, or leaders, or who should win, this is for you. Maybe you heard it at home, at school, or on TV. Let's talk about it together."
},
{
"k": "card",
"title": "Voting is how we choose leaders.",
"body": "Each grown-up picks. Then the votes are counted.",
"say": "In our country, people vote to choose leaders. Each grown-up picks the person they think will do the best job. Then all the votes are counted. People have different ideas, and that's okay."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Curious",
"Mixed up",
"Worried",
"Upset when people argue"
],
"say": "You might feel curious. You might feel mixed up, or worried about a scary word you heard. It can feel upsetting when people you love argue. All of those feelings are okay."
},
{
"k": "card",
"title": "People who love each other can disagree.",
"body": "They can see things differently and still love each other.",
"say": "Here's something important. People who love each other can disagree. Grandpa and Dad might see some things differently, and they still love each other. People who vote differently usually want good things too. They just have different ideas about how to get there."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Ask a grown-up",
"What does that word mean?"
],
[
"Share ideas kindly",
"No name-calling"
],
[
"Listen to a friend",
"Even if you see it differently"
]
],
"say": "Here are things you can do. If you hear a word you don't understand, ask a grown-up what it means. Share your ideas kindly, without calling anyone names. And listen to a friend, even when you see things differently.",
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
"h": "Hand on your heart.",
"sub": "Say: I can listen, and I can be kind.",
"say": "Let's try something together. Put your hand on your heart. Breathe in slowly, and let it out slowly. Now say it out loud: I can listen, and I can be kind.",
"beats": [
"Let's try something together.",
"Put your hand on your heart.",
"Breathe in slowly, and let it out slowly.",
{
"t": "Now say it out loud: I can listen, and I can be kind.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your grown-ups keep taking care of you.",
"sub": "Whoever wins.",
"say": "If you feel worried, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. Whatever happens in an election, the grown-ups in your life will keep taking care of you. Different ideas, kind hearts."
}
]
},
"helper": {
"id": "mp-g-politics-helper",
"guide": "politics",
"side": "helper",
"title": "Elections and Political Disagreement",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"PBS KIDS for Parents",
"https://www.pbs.org/parents"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Elections and Political Disagreement",
"sub": "For the Grown-up",
"say": "When a child you love hears election talk, or watches people they love disagree about politics, this is for you. Kids hear political talk everywhere. You can help them understand it calmly, and show them what respectful disagreement looks like."
},
{
"k": "points",
"h": "What kids take in",
"items": [
[
"Younger kids",
"Repeat words, fear a \"bad\" person"
],
[
"Older kids",
"Notice conflict, feel pulled"
],
[
"Every age",
"Your tone, more than the facts"
]
],
"say": "Kids take in politics differently by age. Young children may repeat what they hear, worry about scary words, or think someone bad is going to hurt them. Older children notice conflict among relatives, classmates, and online, and may feel pressure to pick a side. And at every age, children take in your tone, and the names you use for others, more than any fact.",
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
"title": "Notice your own tone first.",
"body": "Share your values. Leave out the enemies.",
"say": "Before you talk, notice how you speak about politics in front of your child: your tone, and the names you use for people who see things differently. You can share your family's values without teaching a child to see others as enemies."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What did you hear? How does it make you feel?\"",
"\"People have different ideas, and that's okay.\"",
"\"They still love each other.\""
],
"say": "Words that help. You heard people talking about the election. What did you hear? How does it make you feel? Then explain simply. In our country, people vote to choose leaders. People have different ideas, and that's okay. If they ask whether the other side is bad, try: people who vote differently usually want good things too. They just have different ideas about how to get there. And if relatives argue: they see some things differently. They still love each other, and they're learning to listen."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Explain how voting works",
"Simple and calm"
],
[
"Model listening",
"Even when you disagree"
],
[
"Practice kind words",
"For school and friends"
],
[
"Check in on big days",
"Elections and news days"
]
],
"say": "What helps. Explain how voting works, simply and calmly. Let your child see you listen to someone you disagree with. Practice sharing ideas kindly, so they can do it at school. And check in around elections and big news days.",
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
"h": "Words that close the door",
"items": [
"Name-calling or mocking",
"Heated news left on",
"Guessing what will happen"
],
"say": "Some things close the door. Name-calling or mocking people with other views teaches a child that neighbors are enemies. Leaving heated news or debates on lets fear in with no one to sort it out. And when your child asks whether something bad will happen, skip the guesses. Steady them with what is true: whatever happens, the grown-ups in your life will keep taking care of you."
},
{
"k": "big",
"h": "Picture the question at dinner.",
"sub": "Then say your answer out loud.",
"say": "Take a slow breath. Picture your child at dinner, asking: is the other side bad? Now say, out loud: people who vote differently usually want good things too.",
"beats": [
"Take a slow breath.",
"Picture your child at dinner, asking: is the other side bad?",
{
"t": "Now say, out loud: people who vote differently usually want good things too.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Fear or conflict that keeps them from school or sleep.",
"say": "Talk with the school counselor or your child's pediatrician if fear or conflict keeps your child from school or sleep. Many traditions teach love of neighbor, including neighbors who see things differently, and some families pray for leaders and for peace. And look after yourself too. Election seasons can be heavy for grown-ups, so take breaks from the news."
},
{
"k": "big",
"h": "Different ideas. Kind hearts. Safe kids.",
"sub": "Share your values. Model respect.",
"say": "Share your values, listen with respect, and remind your child they are safe. That's how children learn to disagree with love."
}
]
}
},
{
"id": "school-violence",
"ring": "mp-country",
"title": "School Shootings in the News",
"you": {
"id": "mp-g-school-violence-you",
"guide": "school-violence",
"side": "you",
"title": "School Shootings in the News",
"sideName": "For You",
"mins": 2,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "School Shootings in the News",
"sub": "For You",
"say": "If you heard about something scary that happened at a school, this is for you. Maybe a friend told you, or you saw it on the news. I'm glad you're here."
},
{
"k": "card",
"title": "You are safe.",
"body": "Your grown-ups work every day to keep you safe.",
"say": "Here is the most important thing. You are safe. Your teachers and your grown-ups work every day to keep you safe. Scary things like that are very, very rare."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad",
"Mixed up",
"Full of questions"
],
"say": "When you hear scary news, you might feel scared, sad, or mixed up. Your tummy might feel funny, or it might be hard to fall asleep. You might have lots of questions. All of those feelings are okay."
},
{
"k": "points",
"h": "Look for the helpers",
"items": [
[
"Your teachers",
"They watch out for you"
],
[
"Your school has plans",
"Practice helps everyone know"
],
[
"Your grown-ups at home",
"They are here for you"
]
],
"say": "Look for the helpers. Your teachers watch out for you. Your school has plans, and practices, so everyone knows what to do. And your grown-ups at home are here for you.",
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
"h": "Balloon breath",
"sub": "Fill it up slow. Let it out slow.",
"say": "Let's do a balloon breath together. Put both hands on your tummy. Breathe in slowly, and fill your tummy up like a big balloon. Now let the air out slowly, and try it two more times.",
"beats": [
"Let's do a balloon breath together.",
"Put both hands on your tummy.",
"Breathe in slowly, and fill your tummy up like a big balloon.",
{
"t": "Now let the air out slowly, and try it two more times.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "Your feelings, your questions, and anything you hear.",
"say": "Tell a grown-up who takes care of you how you feel: a parent, a grandparent, a teacher, or your school counselor. You can ask them anything. And if you ever hear someone talk about hurting people, tell a grown-up right away. Telling is always the right thing to do."
},
{
"k": "big",
"h": "You are safe. You are loved.",
"sub": "Lots of grown-ups watch out for you.",
"say": "It's okay to turn off the news and go play. You are safe, you are loved, and lots of grown-ups are watching out for you."
}
]
},
"helper": {
"id": "mp-g-school-violence-helper",
"guide": "school-violence",
"side": "helper",
"title": "School Shootings in the News",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "School Shootings in the News",
"sub": "For the Grown-up",
"say": "When a child you love hears about a school shooting in the news, this is for you. You can help them feel safe, let their questions lead, and keep it brief."
},
{
"k": "card",
"title": "Check your own feelings first.",
"body": "Kids read your face. Then find out what they heard.",
"say": "Before you talk, check your own feelings first. Kids read your face. Then find out what they already heard. Young children need short, simple answers and lots of reassurance. Older children often hear from classmates or online, and may ask more about safety and why it happened."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What did you hear?\"",
"\"You're safe.\"",
"\"That's very, very rare.\""
],
"say": "Words that help. You may have heard about something scary at a school. What did you hear? Then: you're safe. Your teachers and I work every day to keep you safe. If they ask whether it could happen at their school, try: that's very, very rare. Your school has plans and practices, and grown-ups there watch out for you. If they ask why someone would do that: sometimes people are very sick or angry and make terrible choices. It's never okay, and many people are working to stop it."
},
{
"k": "story",
"title": "A Day at the Fair",
"lines": [
"A sudden pop, and everyone yelled, Run.",
"My oldest ran until he was four blocks away, alone.",
"I stayed on the phone, and we walked toward each other."
],
"lesson": "A steady voice helps a scared kid find their way back.",
"note": "Names and details changed",
"hold": 2,
"say": "Here is a day from my own family. It includes a scary moment, and everyone in it was safe. My wife, our four boys, and I were at a fair. Then a sudden pop, and everyone yelled, Run. My boys were scattered. One son ran beside me. Another found us near the gates. My wife and our youngest took shelter in a building. My oldest ran four blocks away, alone, not sure which direction was safe. He called me, his voice shaking. I stayed on the phone, and we walked toward each other, block by block, until I saw him. I held him for a long time."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Keep routines steady",
"Meals, sleep, school"
],
[
"Find the helpers",
"In every story"
],
[
"Limit the news",
"Especially images and video"
],
[
"Telling is always right",
"If someone talks about hurting"
]
],
"say": "What brought my son back was a steady voice, and walking toward each other one block at a time. Your child needs the same. Keep routines steady. Find the helpers in the story together. Limit news and social media, especially images and video. And remind them to tell a grown-up if anyone talks about hurting people.",
"cue": {
"at": [
2,
3,
4,
5
]
}
},
{
"k": "words",
"h": "Words that close the door",
"items": [
"Graphic coverage",
"Your fears in detail",
"\"Nothing bad will ever happen.\""
],
"say": "Some things close the door. Letting kids watch graphic coverage. Sharing your own fears in detail, which belong with another grown-up. And nothing bad will ever happen is a promise no one can keep. Name who keeps them safe instead."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Then say it out loud.",
"say": "Take a slow breath. Let your shoulders drop. Picture your child's face as they ask you about the news. Now say out loud: you're safe, and you can always ask me anything.",
"beats": [
"Take a slow breath.",
"Let your shoulders drop.",
"Picture your child's face as they ask you about the news.",
{
"t": "Now say out loud: you're safe, and you can always ask me anything.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Ongoing fear, nightmares, or not wanting to go to school.",
"say": "Watch for sleep trouble, clinginess, or fear of school. Talk with the school counselor or your child's pediatrician if there is ongoing fear, nightmares, or refusal to go to school. Some families pray for families who are hurting, and for peace, and that can give children a way to respond with love. And look after yourself. News like this shakes grown-ups too."
},
{
"k": "big",
"h": "Brief, calm, and close.",
"sub": "You are their steady voice.",
"say": "Keep it brief, keep it calm, and stay close. Your steady voice helps them find their way back to feeling safe."
}
]
}
},
{
"id": "protests",
"ring": "mp-country",
"title": "Protests and Unrest",
"you": {
"id": "mp-g-protests-you",
"guide": "protests",
"side": "you",
"title": "Protests and Unrest",
"sideName": "For You",
"mins": 2,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Protests and Unrest",
"sub": "For You",
"say": "If you saw people marching on the news, or heard grown-ups talking about protests, this is for you. Maybe you saw big crowds on TV. Let's talk about it together."
},
{
"k": "card",
"title": "A protest is people showing they care.",
"body": "They gather and ask leaders to listen.",
"say": "A protest is when people gather together to show they care a lot about something. They might march, hold signs, or sing. They want leaders to listen. It's one way people speak up."
},
{
"k": "card",
"title": "Speaking up kindly is okay.",
"body": "Hurting people is never okay.",
"say": "Sometimes the news shows something scary, like a fire, or people pushing. Speaking up in a peaceful way is okay. Hurting people or breaking things is never okay. Lots of helpers work to keep people safe."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Confused",
"Curious",
"Full of questions"
],
"say": "Seeing crowds, fire, or police on TV can feel scary. You might feel scared, confused, or curious. You might have lots of questions. Every one of those feelings is okay."
},
{
"k": "big",
"h": "Picture your safe grown-up.",
"sub": "Then say their name out loud.",
"say": "Let's try something together. Look at something calm, or close your eyes. Picture a grown-up who keeps you safe. Take a slow breath, and say their name out loud.",
"beats": [
"Let's try something together.",
"Look at something calm, or close your eyes.",
"Picture a grown-up who keeps you safe.",
{
"t": "Take a slow breath, and say their name out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Ask your grown-up: are we safe?",
"body": "A parent, a teacher, your school counselor.",
"say": "What you see on TV is often far away. If you feel scared, ask a grown-up who takes care of you: are we safe? A parent, a grandparent, a teacher, or your school counselor can tell you what is true. And it's okay to turn the news off and go play."
},
{
"k": "big",
"h": "You can care, and be kind.",
"sub": "Your grown-ups keep you safe.",
"say": "People care about lots of things. You can care about things too, and speak up kindly. Your grown-ups are here to keep you safe."
}
]
},
"helper": {
"id": "mp-g-protests-helper",
"guide": "protests",
"side": "helper",
"title": "Protests and Unrest",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Association of School Psychologists",
"https://www.nasponline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Protests and Unrest",
"sub": "For the Grown-up",
"say": "When a child you love sees protests or unrest on the news, this is for you. You can explain it simply, calmly, and truthfully, and help them feel safe."
},
{
"k": "points",
"h": "What kids take in",
"items": [
[
"Younger kids",
"Crowds, fire, police"
],
[
"Older kids",
"What is it about?"
],
[
"Every age",
"Your face and your voice"
]
],
"say": "Kids take it in differently by age. Young children may be frightened by images of crowds, fire, or police. Older children may want to know what people are protesting, and may start to form their own opinions. And at every age, children read your face and your voice.",
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
"title": "Explain it simply.",
"body": "People gathering to show they care about something.",
"say": "Explain protests simply: people gathering to show they care about something, and asking leaders to listen. Then separate peaceful protest from violence. Hurting people or breaking things is never okay. Share facts calmly, and keep it short for younger kids."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Do you know what a protest is?\"",
"\"They care a lot about something.\"",
"\"We are safe at home.\""
],
"say": "Words that help. You saw people marching on the news. Do you know what a protest is? If they ask why people are so angry, try: they care a lot about something and want leaders to listen. And when they ask, are we safe, answer plainly and truthfully. What you saw on TV is not happening at our house, and we are safe at home."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Turn off live coverage",
"Especially video"
],
[
"Talk about fairness",
"And listening"
],
[
"Speak up kindly",
"Show them how"
],
[
"Check in",
"If events continue nearby"
]
],
"say": "What helps. Turn off live coverage, especially video that plays again and again. Talk about fairness and listening. Show what speaking up kindly looks like at home. And check in if events continue nearby.",
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
"h": "Words that close the door",
"items": [
"Live coverage left on",
"Hate for either side",
"\"Don't worry about it.\""
],
"say": "Some things close the door. Leaving live coverage on lets the scariest pictures play again and again. Teaching kids to hate people on either side plants fear where you want kindness. And don't worry about it leaves a child alone with a real feeling. You can share your family's values while respecting that others see it differently."
},
{
"k": "big",
"h": "Picture the question: are we safe?",
"sub": "Then answer out loud.",
"say": "Take a slow breath. Feel your feet on the floor. Picture your child asking you: are we safe? Now say out loud, calm and plain: we are safe at home, and I'm right here.",
"beats": [
"Take a slow breath.",
"Feel your feet on the floor.",
"Picture your child asking you: are we safe?",
{
"t": "Now say out loud, calm and plain: we are safe at home, and I'm right here.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Fears that don't ease, or unrest they saw firsthand.",
"say": "Talk with the school counselor or your child's pediatrician if fears don't ease, especially if your child saw unrest firsthand. Many traditions speak about justice, peace, and caring for neighbors, and families can talk about those values in their own way. And look after yourself. Take breaks from the news, and talk with someone you trust."
},
{
"k": "big",
"h": "Simple, calm, and true.",
"sub": "Safe at home. Kind to everyone.",
"say": "Explain it simply, turn off the replays, and remind your child they are safe. That's how children learn that people can care deeply and still be kind."
}
]
}
},
{
"id": "prejudice",
"ring": "mp-country",
"title": "When a Child Faces or Sees Prejudice",
"you": {
"id": "mp-g-prejudice-you",
"guide": "prejudice",
"side": "you",
"title": "When a Child Faces or Sees Prejudice",
"sideName": "For You",
"mins": 2,
"sources": [
[
"EmbraceRace",
"https://www.embracerace.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Faces or Sees Prejudice",
"sub": "For You",
"say": "If someone said or did something unfair to you because of who you are, or you saw it happen to someone else, this is for you. You have people with you."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Hurt",
"Mad",
"Mixed up",
"Like hiding"
],
"say": "When someone is unkind about your skin, your hair, your language, or your family, it can hurt a lot. You might feel hurt, or mad, or mixed up. You might want to hide. All of those feelings are okay."
},
{
"k": "big",
"h": "Those words were wrong.",
"sub": "They say nothing true about you.",
"say": "Here is something true. When someone says hurtful things about who you are, they are wrong. Sometimes people learn wrong ideas. Their words say nothing true about you. You matter, just as you are."
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "Keep telling until someone helps.",
"say": "Tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. Tell them what happened and how it felt. If it keeps happening, keep telling until someone helps. Fixing it is a grown-up job."
},
{
"k": "points",
"h": "If you see it happen",
"items": [
[
"Tell a grown-up",
"Right away"
],
[
"Be a friend",
"If it is safe"
],
[
"Say a kind word",
"I'm on your side."
]
],
"say": "What if you see it happen to someone else? Tell a grown-up. If it's safe, be a friend to the kid who was hurt. Sit with them, or play with them. You can say, that wasn't okay, and I'm on your side.",
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
"h": "Hand on your heart.",
"sub": "Say: I matter, just as I am.",
"say": "Let's try something. Put your hand on your heart. Take a slow breath in, and let it out. Now say it out loud: I matter, just as I am.",
"beats": [
"Let's try something.",
"Put your hand on your heart.",
"Take a slow breath in, and let it out.",
{
"t": "Now say it out loud: I matter, just as I am.",
"w": 10
}
]
},
{
"k": "big",
"h": "Every person matters.",
"sub": "Including you.",
"say": "Every person matters. Every color, every language, every family. That includes you, and the friend beside you."
}
]
},
"helper": {
"id": "mp-g-prejudice-helper",
"guide": "prejudice",
"side": "helper",
"title": "When a Child Faces or Sees Prejudice",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"EmbraceRace",
"https://www.embracerace.org"
],
[
"Sesame Workshop",
"https://sesameworkshop.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Faces or Sees Prejudice",
"sub": "For the Grown-up",
"say": "When a child you love has been hurt by prejudice, or has seen it happen to someone else, this is for you. Your calm, clear response teaches them more than any lesson."
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"Hurt by comments on skin or hair"
],
[
"Older kids",
"Slurs, exclusion, unfair treatment"
],
[
"Big feelings",
"Angry, ashamed, or confused"
]
],
"say": "It looks different by age. Young children, kindergarten to second grade, notice differences, and they can be deeply hurt by comments about their skin, hair, language, faith, or family. Children in grades three to five may hear slurs, be left out, or be treated unfairly, or watch it happen to a friend. They may feel angry, ashamed, or confused, and some go quiet or ask to stay home.",
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
"title": "Start with yourself.",
"body": "Your own story shapes how you respond.",
"say": "Before you talk, notice what this stirs up in you. You may remember times you were treated unfairly, or times you wish you had spoken up. Your own story shapes how you respond. Take a breath first, so your child gets your steadiness."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What happened today wasn't okay.\"",
"\"I'm really glad you told me.\"",
"\"It says nothing true about you.\""
],
"say": "Believe them first, and say it plainly. What happened today wasn't okay. I'm really glad you told me. Then help them name what happened and how it felt. If they ask why someone said that, try: sometimes people say hurtful things because they learned wrong ideas. It says nothing true about you."
},
{
"k": "words",
"h": "Words that close the door",
"items": [
"\"They were just joking.\"",
"\"Just ignore it.\"",
"\"Are you sure that's what they meant?\""
],
"say": "Some words close the door. They were just joking tells a child their hurt doesn't count. Just ignore it leaves them alone with it. And are you sure that's what they meant can sound like doubt. Believe first. The details can come later."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Practice what to say",
"And who to tell"
],
[
"Work with the school",
"When it happens there"
],
[
"Fill your shelves",
"Stories of many cultures and faiths"
],
[
"Keep talking",
"Not just after hard days"
]
],
"say": "What helps. Practice what to say and who to tell: a short line like, that's not okay, and then walking to a grown-up. When it happens at school, tell the teacher or principal, and ask what they will do and when. Fill your shelves with books and stories that celebrate many cultures and faiths. And keep the conversation going, not just after something hurtful happens.",
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
"title": "If they see it happen",
"body": "Tell a grown-up. If it is safe, be a friend.",
"say": "Kids often ask, what should I do if I see it happen? Tell a grown-up, and if it's safe, be a friend to the person who was hurt. Many traditions teach that every person carries dignity. Children can learn to see it, and honor it, in everyone."
},
{
"k": "big",
"h": "Picture your child telling you.",
"sub": "Then say your first words out loud.",
"say": "Take a slow breath. Picture your child coming to you after a hard day at school. Now say, out loud, the first words you'll use: that wasn't okay, and I'm really glad you told me.",
"beats": [
"Take a slow breath.",
"Picture your child coming to you after a hard day at school.",
{
"t": "Now say, out loud, the first words you'll use: that wasn't okay, and I'm really glad you told me.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "It keeps happening, or your child feels unsafe.",
"say": "Reach out to the school counselor or principal if it keeps happening, or if your child feels unsafe going to school. A child therapist can help with worry, sadness, or shame that lingers. If anyone threatens or hurts your child, call 911. And look after your own heart too. This can hurt grown-ups deeply."
},
{
"k": "big",
"h": "Every person matters.",
"sub": "Say it often, and show it.",
"say": "Believe them, name it as wrong, and keep the conversation going. Every person matters, and your child needs to hear that they do too."
}
]
}
},
{
"id": "scary-news",
"ring": "mp-country",
"title": "Scary News in General",
"you": {
"id": "mp-g-scary-news-you",
"guide": "scary-news",
"side": "you",
"title": "Scary News in General",
"sideName": "For You",
"mins": 2,
"sources": [
"froh",
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Scary News in General",
"sub": "For You",
"say": "If you saw or heard something scary in the news, on TV, or on a phone or tablet, this is for you. Lots of kids feel that way. You can feel steady again."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad",
"Worried",
"Full of questions"
],
"say": "Scary news can stick in your head. You might feel scared, or sad, or worried. You might keep thinking about it at bedtime. Those feelings are okay. They show that you care about people."
},
{
"k": "card",
"title": "Is it near? Is it over?",
"body": "Ask a grown-up. A lot of news is far away.",
"say": "Here is something that helps. The news shows things from all over the world. A lot of what you see is far away, or already over. A video can show the same thing again and again, but it happened once. Ask a grown-up: is this near us? Is it over?"
},
{
"k": "big",
"h": "Spot the helpers.",
"sub": "Many people rush to help.",
"say": "When something scary happens, many people rush to help. Firefighters, doctors, neighbors, and lots of kind people. See if you can spot the helpers."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Turn it off",
"Walk away from the screen"
],
[
"Tell a grown-up",
"What you saw and heard"
],
[
"Think of good things",
"Three good things today"
]
],
"say": "Here are things you can do. If the news is scary, you can turn it off, or walk away from the screen. Tell a grown-up what you saw and heard, and ask your questions. And think of good things too, like three good things from today.",
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
"h": "Squeeze and let go.",
"sub": "Tight like a lemon. Then soft.",
"say": "Let's try something. Squeeze your hands tight, like you're squeezing a lemon. Hold it. Now let go, and let your hands go soft and floppy.",
"beats": [
"Let's try something.",
"Squeeze your hands tight, like you're squeezing a lemon.",
"Hold it.",
{
"t": "Now let go, and let your hands go soft and floppy.",
"w": 10
}
]
},
{
"k": "big",
"h": "You can put the news down.",
"sub": "Your grown-ups will help carry it.",
"say": "You don't have to carry the news by yourself. You can put it down, and let the grown-ups who take care of you help carry it."
}
]
},
"helper": {
"id": "mp-g-scary-news-helper",
"guide": "scary-news",
"side": "helper",
"title": "Scary News in General",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Scary News in General",
"sub": "For the Grown-up",
"say": "When a child you love has seen or heard scary news, this is for you. You can't always keep the news away, but you can help them feel steady with it."
},
{
"k": "points",
"h": "What kids take in",
"items": [
[
"Younger kids",
"May think it's near, or still happening"
],
[
"Replays",
"One event can look like many"
],
[
"Older kids",
"Scroll and see more than you know"
]
],
"say": "Kids take in news differently by age. Young children, kindergarten to second grade, may not know the news is far away, or already over. A replay can look like it's happening again. Children in grades three to five may scroll on their own, or hear things from friends, and see more than you realize.",
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
"title": "Ask first.",
"body": "Find out what they heard before you explain.",
"say": "Start by asking what they've heard. Try: you looked worried when that came on TV. What did you see? Listen all the way through. Then you know what to correct, and you won't add scary details they hadn't heard."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"That happened far from here.\"",
"\"You are safe here with me.\"",
"\"Look at all the people helping.\""
],
"say": "Give short, true answers. If they ask, is that happening here, be clear about where it is, and that they are safe. That happened far from here. You are safe here with me. Name who keeps them safe: you, their teachers, and helpers in your town. And point out the people who came to help."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Turn off background news",
"So it is not on all day"
],
[
"Watch together",
"Or watch it first yourself"
],
[
"Balance it",
"With some good news"
],
[
"Return to routine",
"Meals, play, and bedtime"
]
],
"say": "What helps. Turn off background news, so it isn't playing all day. Watch recorded news first, or watch together, and be careful with phones and tablets. Balance scary news with good news, like a kind thing someone did. Then return to routines: meals, play, and bedtime.",
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
"h": "Words that close the door",
"items": [
"\"Don't worry about it.\"",
"A long, detailed explanation",
"\"That could happen anywhere.\""
],
"say": "Some things make worry bigger. Don't worry about it tells a child their feelings aren't welcome. A long, detailed explanation can add scary pictures. And a guess like, that could happen anywhere, plants a fear that wasn't there. Keep it short, true, and calm."
},
{
"k": "card",
"title": "Your news habits matter.",
"body": "Kids borrow our calm.",
"say": "Take care of your own news intake. Kids notice when we check our phones with a worried face. Choose a time to catch up on news away from little ears. Many families pray for the people in the news, or send kind thoughts their way. It can turn a helpless feeling into care."
},
{
"k": "big",
"h": "Picture one screens-off hour.",
"sub": "Then say your plan out loud.",
"say": "Take a slow breath. Picture an hour tonight with the screens off and your child beside you. Now say out loud what you'll do together in that hour.",
"beats": [
"Take a slow breath.",
"Picture an hour tonight with the screens off and your child beside you.",
{
"t": "Now say out loud what you'll do together in that hour.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Fears that get in the way of sleep or school.",
"say": "Check in after big news days. Talk with the school counselor, their pediatrician, or a child therapist if fears get in the way of sleep or school, or keep coming back for weeks. And look after yourself. You need a break from the news too."
},
{
"k": "big",
"h": "Short, true, and calm.",
"sub": "Then back to the everyday.",
"say": "Ask first, answer short and true, point out the helpers, and return to the everyday. That's how kids find their footing again."
}
]
}
},
{
"id": "war",
"ring": "mp-world",
"title": "War and Conflict",
"you": {
"id": "mp-g-war-you",
"guide": "war",
"side": "you",
"title": "War and Conflict",
"sideName": "For You",
"mins": 3,
"sources": [
[
"UNICEF Parenting",
"https://www.unicef.org/parenting"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "War and Conflict",
"sub": "For You",
"say": "If you heard about a war, or saw pictures of fighting, this is for you. Lots of kids have big feelings about war. You can talk about them."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad for people there",
"Full of questions",
"Worried about home"
],
"say": "You might feel scared. You might feel sad for the people there. You might have lots of questions, like, why do people fight? You might wonder if war could come to your home. All of those feelings and questions are okay."
},
{
"k": "big",
"h": "Where is it?",
"sub": "Find it on a map with a grown-up.",
"say": "Ask a grown-up where the fighting is. You can find it together on a map. Most of the time, it's very far from your home. And right here, the grown-ups who take care of you are keeping you safe."
},
{
"k": "card",
"title": "Some kids have family there.",
"body": "Their worry makes sense. Be a kind friend.",
"say": "Some kids have family or friends where the fighting is. If that's you, your worry makes sense, and you can tell a grown-up how you feel. If it's a kid in your class, be a kind friend. A war is never a kid's fault."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Look away",
"From scary pictures"
],
[
"Ask your questions",
"A grown-up can help"
],
[
"Do something kind",
"A card or a drawing"
]
],
"say": "Here are things you can do. If pictures are scary, you can look away, or turn them off. Ask a grown-up your questions. And do something kind, like make a card or a drawing for someone. Some families say a prayer for peace, or send kind thoughts to people far away.",
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
"h": "Smell the flower. Blow out the candle.",
"sub": "Slow in. Slow out.",
"say": "Let's breathe together. Pretend you're holding a flower, and smell it slowly. Now pretend it's a candle, and blow it out slowly. Do it two more times, nice and slow.",
"beats": [
"Let's breathe together.",
"Pretend you're holding a flower, and smell it slowly.",
"Now pretend it's a candle, and blow it out slowly.",
{
"t": "Do it two more times, nice and slow.",
"w": 10
}
]
},
{
"k": "big",
"h": "Many people are working for peace.",
"sub": "And your grown-ups are right here.",
"say": "All over the world, many people are working for peace, and helpers are helping. And right here, your grown-ups are with you."
}
]
},
"helper": {
"id": "mp-g-war-helper",
"guide": "war",
"side": "helper",
"title": "War and Conflict",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"UNICEF Parenting",
"https://www.unicef.org/parenting"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
],
"rogers"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "War and Conflict",
"sub": "For the Grown-up",
"say": "When a child you love hears about war, this is for you. You don't need every answer. Your calm and your honesty help them feel safe."
},
{
"k": "points",
"h": "What kids wonder",
"items": [
[
"Younger kids",
"Will it come to my house?"
],
[
"Older kids",
"Why do people fight?"
],
[
"Some classmates",
"Have family in those places"
]
],
"say": "Children take in war differently by age. Young children, kindergarten to second grade, often worry that war will come to their home. Children in grades three to five may want to know why. And some children in your child's class may have family in the places in the news.",
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
"title": "Ask what they have heard first.",
"body": "Then share simple facts.",
"say": "Ask what they've heard first. Try: there's fighting happening in another country. It's far from here. What have you heard? Listen for what feels scary to them, and correct what's wrong in simple words. And keep graphic pictures and video away from young eyes."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"We are safe here.\"",
"\"Many helpers are working for peace.\"",
"\"Sometimes countries disagree.\""
],
"say": "If they ask, will war come here, try: we are safe here. Leaders and many helpers are working toward peace. If they ask why people fight, try: sometimes countries disagree and don't find peaceful ways to solve it. Many people are working for peace. Short and calm is enough."
},
{
"k": "words",
"h": "Words that close the door",
"items": [
"Blaming whole groups of people",
"Graphic pictures or video",
"Your own fears, said out loud"
],
"say": "Some things close the door. Blaming whole groups of people teaches fear, and can hurt a classmate whose family comes from there. Graphic pictures and video stay with young children long after the screen is off. And grown-up fears, said in front of a child, become the child's fears. Talk those over with another grown-up."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Look for the helpers",
"Together"
],
[
"Find a way to give",
"A card, a drive, a donation"
],
[
"Limit the news",
"Especially video"
],
[
"Keep routines steady",
"Meals, play, and bedtime"
]
],
"say": "What helps. Look for the helpers together: medics, volunteers, neighbors sharing food. Find a way to give or help, like writing a card, joining a school drive, or giving to a group that helps families. Limit the news, especially video. And keep routines steady, so home feels like home.",
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
"title": "A way to respond",
"body": "A prayer, a candle, a quiet moment, a kind act.",
"say": "Many families pray for peace, and for families caught in war. Others light a candle, share a quiet moment, or do one kind thing. Each gives a child a way to respond with compassion, not only fear."
},
{
"k": "big",
"h": "Picture the question.",
"sub": "Then say your answer out loud.",
"say": "Take a slow breath. Picture your child asking you, will war come here? Now say, out loud, your calm answer: we are safe here, and many people are working for peace.",
"beats": [
"Take a slow breath.",
"Picture your child asking you, will war come here?",
{
"t": "Now say, out loud, your calm answer: we are safe here, and many people are working for peace.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Ongoing fear, or family where the fighting is.",
"say": "Watch for ongoing worry. Reach out to the school counselor, their pediatrician, or a child therapist if fear keeps coming back, especially for a child with family where the fighting is. And look after your own heart. News of war is heavy for grown-ups too."
},
{
"k": "big",
"h": "Calm, true, and kind.",
"sub": "Fear can turn into compassion.",
"say": "Ask first, keep it simple and true, keep graphic images away, and help your child do something kind. That's how fear can turn into compassion."
}
]
}
},
{
"id": "disasters",
"ring": "mp-world",
"title": "Natural Disasters and Climate Worries",
"you": {
"id": "mp-g-disasters-you",
"guide": "disasters",
"side": "you",
"title": "Natural Disasters and Climate Worries",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Ready.gov for kids",
"https://www.ready.gov/kids"
],
[
"American Red Cross",
"https://www.redcross.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Natural Disasters and Climate Worries",
"sub": "For You",
"say": "If you've been thinking about big storms, fires, floods, or the earth, this is for you. Maybe you saw it on the news. Maybe it happened near you. Lots of kids feel this way."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Jumpy when it thunders",
"Worried about the earth",
"Like staying close"
],
"say": "You might feel scared. You might jump when the thunder booms or the wind gets loud. You might worry about the earth. You might want to stay close to your grown-up. All of those feelings are normal, and it's okay."
},
{
"k": "card",
"title": "Grown-ups make the plan.",
"body": "Keeping you safe is their job.",
"say": "Here's something true. Keeping you safe is your grown-up's job. Grown-ups make plans for big storms. Firefighters and lots of other helpers get ready too. You can ask your grown-up, what is our family's plan?"
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Help make a kit",
"A flashlight, a snack, a toy"
],
[
"Tell how you feel",
"I feel scared."
],
[
"Help the earth",
"Turn off a light"
]
],
"say": "Here are things you can do. Help your family make a safety kit, with a flashlight, a snack, and a favorite toy. Tell a grown-up how you feel: I feel scared. And do one small thing for the earth, like turning off a light. Lots of grown-ups are caring for the earth too.",
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
"h": "Smell the flower. Blow out the candle.",
"sub": "Breathe in slow. Breathe out slow.",
"say": "Let's do something together. Pretend you're holding a flower. Smell it slowly through your nose. Now pretend it's a candle, and blow it out slowly. Do that two more times.",
"beats": [
"Let's do something together.",
"Pretend you're holding a flower.",
"Smell it slowly through your nose.",
"Now pretend it's a candle, and blow it out slowly.",
{
"t": "Do that two more times.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a safe grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "If scary thoughts come back, at bedtime or when the sky gets dark, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. You don't have to hold big worries by yourself."
},
{
"k": "big",
"h": "When storms come, helpers come too.",
"sub": "You are loved, and you are held.",
"say": "When big storms come, helpers come too. Lots of people are working to keep kids safe. You are loved, and you are held."
}
]
},
"helper": {
"id": "mp-g-disasters-helper",
"guide": "disasters",
"side": "helper",
"title": "Natural Disasters and Climate Worries",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Ready.gov for kids",
"https://www.ready.gov/kids"
],
[
"American Red Cross",
"https://www.redcross.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Natural Disasters and Climate Worries",
"sub": "For the Grown-up",
"say": "When a child you love is scared of storms, fires, floods, or the future of the planet, this is for you. Calm, true words and a family plan can help a child feel safe again."
},
{
"k": "points",
"h": "What it looks like by age",
"items": [
[
"Younger kids",
"Fear of storms, wind, the dark"
],
[
"Older kids",
"Climate and the future"
],
[
"After a disaster",
"The same storm in play"
]
],
"say": "Fear looks different by age. Younger children may fear storms, especially after seeing news or living through one. They may cling, jump at thunder, or ask to sleep near you. Older children, grades three to five, may worry about climate change and the future. And children who lived through a disaster may play it out again and again with toys or drawings. That play is how they make sense of it.",
"cue": {
"at": [
1,
3,
4
]
}
},
{
"k": "card",
"title": "Get steady first.",
"body": "Know your area's risks and your family plan.",
"say": "Before you talk, get steady yourself. Know your area's real risks and your family's plan, so your answers come out calm and true. Then turn off the news when kids are near. Replays of scary pictures can make it feel like it is happening again and again."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Let's talk about what happened.\"",
"\"Here is how our family stays safe.\"",
"\"Lots of smart people are working on it.\""
],
"say": "Words that help. You heard about the hurricane. Let's talk about what happened and how our family stays safe. If they ask, could that happen here, answer honestly for where you live, and then describe your plan. If they ask, is the earth going to be okay, try: lots of smart people are working on it, and we can help too, like saving energy and caring for nature."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Make a plan together",
"Where we meet, who we call"
],
[
"Build a kit together",
"With one comfort item"
],
[
"Keep routines steady",
"Meals, school, bedtime"
],
[
"One action for the earth",
"Small and doable"
]
],
"say": "What helps. Make a family emergency plan together: where you meet, and who you call. Build a kit together, and let your child pack one comfort item. Preparing turns fear into something small hands can do. Keep routines steady: meals, school, bedtime. And take one small action for the earth together, like planting something or turning off lights.",
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
"k": "words",
"h": "Words that close the door",
"items": [
"Big talk about a scary future",
"\"Nothing bad will ever happen.\"",
"News playing all day"
],
"say": "Some things make fear bigger. Catastrophic talk about the future, even between grown-ups in the next room, lands on small ears. Nothing bad will ever happen is a promise no one can keep. And news playing all day replays the scariest moments. Promise what you can: we have a plan, and I am right here."
},
{
"k": "big",
"h": "Picture the next loud storm.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture your child's face the next time thunder rolls or the news turns scary. Now say, out loud, the words you'll use: we have a plan, and I'm right here.",
"beats": [
"Take a slow breath.",
"Picture your child's face the next time thunder rolls or the news turns scary.",
{
"t": "Now say, out loud, the words you'll use: we have a plan, and I'm right here.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Fear that keeps going after a disaster they lived through.",
"say": "Expect storms and anniversaries to bring worries back. That's normal. If fear keeps going for weeks after a disaster your child lived through, and gets in the way of sleep, school, or play, talk with their pediatrician or the school counselor, and ask about a child therapist. Many traditions teach care for creation, and some families find hope in a prayer, a song, or time outside together. And look after yourself too. Your calm is the shelter they borrow."
},
{
"k": "big",
"h": "Calm, true, and ready together.",
"sub": "Helpers are everywhere.",
"say": "Stay calm, tell the truth simply, and get ready together. That's how a child feels safe again."
}
]
}
},
{
"id": "outbreaks",
"ring": "mp-world",
"title": "Illness Outbreaks",
"you": {
"id": "mp-g-outbreaks-you",
"guide": "outbreaks",
"side": "you",
"title": "Illness Outbreaks",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Illness Outbreaks",
"sub": "For You",
"say": "If you've heard about people getting sick from a germ that's going around, this is for you. Lots of kids have worries and questions about it."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Worried about germs",
"Worried about Grandma",
"Sad about missing things",
"Full of questions"
],
"say": "You might feel worried about germs. You might worry about someone you love, like Grandma or Grandpa. You might feel sad if school or plans change. You might have lots of questions. All of those feelings are normal, and it's okay."
},
{
"k": "card",
"title": "Lots of helpers are working hard.",
"body": "Doctors, nurses, and scientists.",
"say": "Here's something true. Doctors, nurses, and scientists are working hard to help people get better and stay well. And the grown-ups who take care of you are working to keep your family healthy. That's their job."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Wash your hands",
"Sing a song while you scrub"
],
[
"Rest and play",
"Sleep, eat, and move"
],
[
"Ask your questions",
"A grown-up can help"
]
],
"say": "Here are things you can do. Wash your hands with soap, and sing a song while you scrub. Get good sleep, eat your meals, and move your body. And ask your grown-up your questions. It's okay to ask more than once.",
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
"h": "Squeeze and let go.",
"sub": "Tight fists, then soft hands.",
"say": "Let's try something together. Squeeze your hands into tight fists. Squeeze, squeeze, squeeze. Now let them go, soft and floppy. Take a slow breath, and do it one more time.",
"beats": [
"Let's try something together.",
"Squeeze your hands into tight fists.",
"Squeeze, squeeze, squeeze.",
"Now let them go, soft and floppy.",
{
"t": "Take a slow breath, and do it one more time.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a safe grown-up.",
"body": "A parent, a teacher, your school counselor.",
"say": "If a worry about germs or someone you love keeps coming back, tell a grown-up who takes care of you: a parent, a grandparent, a teacher, or your school counselor. If you feel sick, tell a grown-up too. They'll know what to do."
},
{
"k": "big",
"h": "Helpers are working hard.",
"sub": "You are loved, and you are held.",
"say": "Lots of people are working to help everyone stay well. You can wash your hands and ask your questions, and your grown-ups will take care of the rest. You are loved, and you are held."
}
]
},
"helper": {
"id": "mp-g-outbreaks-helper",
"guide": "outbreaks",
"side": "helper",
"title": "Illness Outbreaks",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Illness Outbreaks",
"sub": "For the Grown-up",
"say": "When an illness is going around and a child you love is worried, this is for you. Simple facts, steady routines, and a calm voice help a child feel safe."
},
{
"k": "points",
"h": "What it looks like by age",
"items": [
[
"Younger kids",
"Germs, loved ones getting sick"
],
[
"Older kids",
"School closures, grandparents"
],
[
"In disguise",
"Tummy aches, sleep, clinging"
]
],
"say": "Worry looks different by age. Younger children may worry about germs, or about someone they love getting sick. Older children, grades three to five, may want to know more, and may worry about school closing or about their grandparents. Watch for worry in disguise too: tummy aches, trouble sleeping, clinging, or handwashing that goes on and on.",
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
"title": "Get your facts first.",
"body": "From trusted health sources and your child's doctor.",
"say": "Before you talk, get your facts from trusted health sources and your child's doctor. Then keep the news low and away from little ears. Constant updates keep a child's worry switched on. A few calm facts help more than a lot of information."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Let's talk about what's happening.\"",
"\"Here is how we stay healthy.\"",
"\"Doctors know how to help people.\""
],
"say": "Words that help. You've heard about people getting sick. Let's talk about what's happening and how we stay healthy. If they ask, will Grandma get sick, try: we're taking good care of her, and doctors know how to help people. Then give them something to do, like drawing Grandma a picture or calling to say hello."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Healthy routines",
"Sleep, meals, and play"
],
[
"Handwashing songs",
"Something real to do"
],
[
"Stay connected",
"Calls and cards to loved ones"
],
[
"Check in as news changes",
"Short and calm"
]
],
"say": "What helps. Keep healthy routines steady: sleep, meals, and time to play. Make handwashing a song, so your child has something real they can do. Help them stay connected to the people they worry about, with calls, cards, or drawings. And check in as news changes, briefly and calmly.",
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
"h": "Words that close the door",
"items": [
"Constant updates",
"\"Germs are everywhere!\"",
"\"No one we love will get sick.\""
],
"say": "Some things make worry bigger. Constant updates keep the alarm ringing. Fear-based talk, like germs are everywhere, can turn a careful child into a frightened one. And no one we love will get sick is a promise no one can keep. Try instead: I don't know everything yet, and here's what we're doing."
},
{
"k": "big",
"h": "Picture the next hard question.",
"sub": "Then say your words out loud.",
"say": "Take a slow breath. Picture your child asking, will Grandma get sick? Now say, out loud, the words you'll use: we're taking good care of her, and doctors know how to help people.",
"beats": [
"Take a slow breath.",
"Picture your child asking, will Grandma get sick?",
{
"t": "Now say, out loud, the words you'll use: we're taking good care of her, and doctors know how to help people.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Worry that grows intense or hard to stop.",
"say": "Talk with your child's pediatrician or the school counselor if worry becomes intense or obsessive: handwashing they can't stop, fear that keeps them from school or friends, or questions that never settle. Bring every health question about your child to their doctor. Some families say a prayer for people who are sick and for health workers, and that can help a child turn worry into care. And look after yourself too. Your calm is what your child borrows."
},
{
"k": "big",
"h": "Calm facts, steady routines.",
"sub": "Small hands with something to do.",
"say": "Share calm facts, keep routines steady, and give small hands something to do. That's how worry turns into care."
}
]
}
},
{
"id": "hurt-disclosure",
"ring": "mp-safety",
"title": "When a Child Tells You Someone Hurt Them",
"you": {
"id": "mp-g-hurt-disclosure-you",
"guide": "hurt-disclosure",
"side": "you",
"title": "When a Child Tells You Someone Hurt Them",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Childhelp National Child Abuse Hotline",
"https://www.childhelphotline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Tells You Someone Hurt Them",
"sub": "For You",
"say": "If someone hurt you, or touched you in a way that is not okay, this is for you. You are not in trouble, and you have people with you."
},
{
"k": "big",
"h": "It is never your fault.",
"sub": "You are not in trouble.",
"say": "Here is the most important thing. It is never your fault. Not even if the person said it was. Not even if you kept it a secret for a long time. You are not in trouble."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Mixed up",
"Sad",
"Mad"
],
"say": "You might feel scared, mixed up, sad, or mad. You might feel all of them at once. You might even still love the person. Every one of those feelings is okay."
},
{
"k": "big",
"h": "Breathe with me.",
"sub": "Hand on your heart.",
"say": "Let's take a slow breath together. Put your hand on your heart. Smell the flower, slowly. Now blow out the candle. Feel your hand there, warm and steady.",
"beats": [
"Let's take a slow breath together.",
"Put your hand on your heart.",
"Smell the flower, slowly.",
"Now blow out the candle.",
{
"t": "Feel your hand there, warm and steady.",
"w": 10
}
]
},
{
"k": "points",
"h": "Tell a safe grown-up",
"items": [
[
"A grown-up at home",
"Who keeps you safe"
],
[
"A teacher",
"At school"
],
[
"The school counselor",
"A helper at school"
],
[
"A doctor or nurse",
"When you visit"
]
],
"say": "Tell a safe grown-up. A grown-up at home who keeps you safe. A teacher. The school counselor. A doctor or a nurse. You can say a little, or you can draw it.",
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
"h": "You can say",
"items": [
"Someone hurt me. I need help."
],
"sub": "Keep telling until someone helps.",
"say": "You can borrow these words. Someone hurt me. I need help. Secrets about hurting or touching are never yours to keep. If one grown-up doesn't help, tell another. Keep telling until someone helps."
},
{
"k": "big",
"h": "Telling is brave.",
"sub": "You are loved.",
"say": "Your grown-up may tell other helpers whose job is to keep kids safe. That is how help works. Telling is brave. You deserve to be safe. You are loved."
}
]
},
"helper": {
"id": "mp-g-hurt-disclosure-helper",
"guide": "hurt-disclosure",
"side": "helper",
"title": "When a Child Tells You Someone Hurt Them",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Childhelp National Child Abuse Hotline",
"https://www.childhelphotline.org"
],
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Tells You Someone Hurt Them",
"sub": "For the Grown-up",
"say": "If a child has told you someone hurt them, or you think they're trying to, this is for you. What you do in the next few minutes matters, and you can do it."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Your face and voice tell a child whether it was safe to tell. So steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Your face and voice tell a child whether it was safe to tell.",
"So steady yourself first.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "points",
"h": "How children tell",
"items": [
[
"Bits and pieces",
"And sometimes take it back"
],
[
"In play or a drawing",
"Or a comment that seems odd"
],
[
"A small piece first",
"To see how you react"
],
[
"About a friend",
"Worried about trouble"
]
],
"say": "Children rarely tell all at once. Younger children may tell in bits and pieces, and may take it back. Some tell in play, in a drawing, or with a comment that seems odd. Older children may share a small piece first, to see how you react. Some say it happened to a friend, because they worry about getting someone in trouble.",
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
"h": "Words that help",
"items": [
"Thank you for telling me. I believe you.",
"This is not your fault.",
"I'm going to help."
],
"say": "Then give them the words they need. Thank you for telling me. I believe you. This is not your fault. You did the right thing by telling. I'm going to help. If they ask, will I get in trouble, say, no, you are not in trouble. You were brave to tell."
},
{
"k": "points",
"h": "Listen, then get help",
"items": [
[
"Let them use their words",
"Listen more than you talk"
],
[
"Save the questions",
"Trained interviewers ask"
],
[
"Keep your face calm",
"Even if you feel shock"
],
[
"Leave the person named",
"Helpers handle that"
]
],
"say": "Listen more than you talk, and let them use their own words. Save the questions. Asking a lot, or suggesting what happened, can make it harder later. Trained interviewers will ask. Keep your face calm, even if you feel shock or anger inside. And leave the person they named to the helpers. Confronting them can put the child at risk.",
"cue": {
"at": [
0,
1,
4,
5
]
}
},
{
"k": "card",
"title": "Honest about who you tell",
"body": "\"I need to tell people whose job is to keep you safe. I will stay with you.\"",
"say": "They may ask you to keep it a secret. Be honest and kind. I need to tell some people whose job is to help keep you safe. I will stay with you and help you. Never promise to keep it a secret."
},
{
"k": "flow",
"h": "Get help today",
"steps": [
[
"Write down their words",
"As soon as you can"
],
[
"Call child protection",
"In your county, today"
],
[
"Or call Childhelp",
"1-800-422-4453, call or text"
],
[
"Danger right now",
"Call 911"
]
],
"say": "Then get help the same day. Write down what they said, in their own words, as soon as you can. Report it to child protective services in your county. You can also call or text the Childhelp hotline at 1-800-422-4453, any time. If the child is in danger right now, call 911. You don't have to be sure it happened. Reasonable concern is enough.",
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
"h": "Their safety comes first.",
"sub": "Every time.",
"say": "Sometimes the person a child names is someone you know and trust. A relative, a family friend, a coach, or a leader in your faith community. The child's safety still comes first, every time. If you're a teacher, follow your school's process and make the report yourself."
},
{
"k": "points",
"h": "In the days after",
"items": [
[
"Keep routines steady",
"Meals, bedtime, school"
],
[
"Say it often",
"You are loved. Not your fault."
],
[
"A trauma counselor",
"Trained to help children"
]
],
"say": "In the days after, keep routines steady. Remind them often that they are loved, and that it was not their fault. And connect them with a counselor trained in child trauma.",
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
"h": "Calm. Believe. Get help.",
"sub": "Get support for yourself too.",
"say": "Hearing this is hard, and your feelings matter too. Tell someone you trust, and get support for yourself. When you stay calm, believe them, and get help, you give a child what they need most."
}
]
}
},
{
"id": "wanting-die",
"ring": "mp-safety",
"title": "When a Child Talks About Wanting to Die",
"you": {
"id": "mp-g-wanting-die-you",
"guide": "wanting-die",
"side": "you",
"title": "When a Child Talks About Wanting to Die",
"sideName": "For You",
"mins": 3,
"sources": [
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Talks About Wanting to Die",
"sub": "For You",
"say": "This is for you if you have ever had a feeling so heavy that you wished you could go away forever, or wished you were not alive. I'm really glad you are here."
},
{
"k": "card",
"title": "Help is here.",
"body": "Tell a grown-up today. A grown-up can call or text 988 with you.",
"say": "First, where to find help. Tell a safe grown-up today. A grown-up can call or text 988 with you, any time. If you are in danger right now, a grown-up calls 911. These numbers stay on the screen the whole time."
},
{
"k": "big",
"h": "You are not in trouble.",
"sub": "Heavy feelings are not your fault.",
"say": "Some kids have feelings that big. It does not mean you are bad, and you are not in trouble. Heavy feelings can get lighter, and grown-ups know how to help."
},
{
"k": "big",
"h": "Feet down. Slow breath.",
"sub": "Hand on your heart.",
"say": "Let's slow down together. Put your feet flat on the floor. Smell the flower, slow and deep. Now blow out the candle, slow and long. Put your hand on your heart, and feel it beat.",
"beats": [
"Let's slow down together.",
"Put your feet flat on the floor.",
"Smell the flower, slow and deep.",
"Now blow out the candle, slow and long.",
{
"t": "Put your hand on your heart, and feel it beat.",
"w": 10
}
]
},
{
"k": "words",
"h": "Tell a safe grown-up today",
"items": [
"I have a really heavy feeling.",
"Sometimes I wish I was not here.",
"I need help."
],
"sub": "A parent, a teacher, a school counselor.",
"say": "Tell a safe grown-up today. A mom or dad, a grandparent, a teacher, your school counselor, or someone who takes care of you. You can borrow these words. I have a really heavy feeling. Sometimes I wish I was not here. I need help. If the first grown-up doesn't help, tell another one."
},
{
"k": "big",
"h": "Always tell about a friend.",
"sub": "Even if they asked you not to.",
"say": "And if a friend ever says they want to die, or want to hurt themselves, you always tell a grown-up, even if your friend asked you not to. You are not in trouble. That is how a real friend helps."
},
{
"k": "big",
"h": "You matter so much.",
"sub": "Tell a safe grown-up today.",
"say": "You matter so much. The grown-ups who love you want to know how you feel, even the heaviest feelings. Tell a safe grown-up today."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
},
"helper": {
"id": "mp-g-wanting-die-helper",
"guide": "wanting-die",
"side": "helper",
"title": "When a Child Talks About Wanting to Die",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"dazzi",
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
],
[
"American Foundation for Suicide Prevention",
"https://afsp.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Talks About Wanting to Die",
"sub": "For the Grown-up",
"say": "If a child you love has said they want to die, this is for you. Take it seriously every time, even from a young child. You do not have to be an expert. Your job is to listen, keep them safe, and connect them to help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Danger right now: call 911. Call or text 988, and call their doctor today.",
"say": "First, help right now. If your child has hurt themselves or is in danger right now, call 911. Any time, call or text 988 together, or text HOME to 741741. And call their doctor today. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "A calm grown-up makes a child more likely to keep talking. So steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"A calm grown-up makes a child more likely to keep talking.",
"So steady yourself first.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "points",
"h": "What it can sound like",
"items": [
[
"Younger kids",
"I want to go away forever."
],
[
"Older kids",
"Said, written, drawn, or searched"
],
[
"Either way",
"A calm response, and a call"
]
],
"say": "Here's what it can sound like. Younger children may say, I wish I was dead, or I want to go away forever, often when they are overwhelmed. Older children may say it, write it, draw it, or search it, or say, everyone would be better off without me. Either way, it deserves a calm, caring response and a call to their doctor.",
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
"h": "Words that help",
"items": [
"I'm really glad you told me.",
"Can you tell me more?",
"Are you thinking about killing yourself?"
],
"say": "Start here. I heard you say you want to die. I'm really glad you told me. Can you tell me more? Then ask plainly, in a calm voice. Are you thinking about hurting yourself or killing yourself?"
},
{
"k": "big",
"h": "Asking is safe.",
"sub": "It does not put the idea in their head.",
"say": "Asking directly is safe. It does not put the idea in their head. It tells your child you can hear the hardest thing. If they say yes, stay with them, and call or text 988 together, right then. Call 911 if they are in danger."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Promising to keep it secret"
],
[
"You don't mean that.",
"Or, you have so much to live for."
],
[
"Leaving them alone in danger"
]
],
"say": "Some things close the door. Promising to keep it secret. Saying, you don't mean that, or, you have so much to live for. And leaving them alone if they are in danger. Listen without arguing about whether their feelings make sense.",
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
"Lock up dangerous things",
"Medicines, firearms, and more"
],
[
"Call today",
"988 together, or their doctor"
],
[
"Stay close",
"Check in every day"
],
[
"Keep the safety plan",
"From their doctor or counselor"
]
],
"say": "Here's what helps. Keep medicines, firearms, and other dangerous items locked up or out of the home, for the long term. This saves lives. Call or text 988 together, or call their doctor today. Stay close, and check in every day. And keep the safety plan their doctor or counselor gives you.",
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
"k": "card",
"title": "If they ask",
"body": "Are you mad at me? Not at all. I love you, and I'm going to help.",
"say": "Your child may ask, are you mad at me? You can say, not at all. I'm so glad you told me. I love you, and I'm going to help. Or, will I go to the hospital? We're going to talk to people who help kids feel better. Whatever happens, I'll be with you."
},
{
"k": "big",
"h": "Your calm love holds them.",
"sub": "Get support for yourself too.",
"say": "This is a lot to carry. Get support for yourself too, from a counselor or a trusted friend, and let the school counselor know. If your family draws on faith, remind your child they are loved beyond measure, and get professional help too. Call or text 988 any time, for them or for you. Your calm love holds them."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
}
},
{
"id": "body-safety",
"ring": "mp-safety",
"title": "Teaching Body Safety",
"you": {
"id": "mp-g-body-safety-you",
"guide": "body-safety",
"side": "you",
"title": "Teaching Body Safety",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Stop It Now",
"https://www.stopitnow.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Teaching Body Safety",
"sub": "For You",
"say": "This is for you, because your body is yours. Let's learn a few ways to keep it safe. You can watch this with your grown-up."
},
{
"k": "big",
"h": "Your body belongs to you.",
"sub": "You can say no.",
"say": "Your body belongs to you. You get to choose how you say hi. You can wave, give a high five, or give a hug. And if a touch feels not okay, you can say no."
},
{
"k": "big",
"h": "Private parts are private.",
"sub": "The parts your swimsuit covers.",
"say": "Some parts of your body are private. Private parts are the parts your swimsuit covers. A grown-up who takes care of you may help you wash, or a doctor may check you while your grown-up is right there. That keeps you healthy. Other than that, nobody touches your private parts, or asks you to touch theirs."
},
{
"k": "points",
"h": "Surprises and secrets",
"items": [
[
"A surprise is fun",
"Like a birthday present"
],
[
"A surprise is short",
"Everyone finds out soon"
],
[
"No secrets about touching",
"Always tell"
]
],
"say": "Surprises and secrets are different. A surprise is fun, like a birthday present. A surprise is short, and everyone finds out soon. But a secret that feels bad gets told. And there are no secrets about touching, ever.",
"cue": {
"at": [
1,
2,
4
]
}
},
{
"k": "words",
"h": "Say it out loud",
"items": [
"No! I'm going to tell."
],
"say": "Let's practice in a strong voice. If a touch feels not okay, you can say no, and then tell. Say it with me. No! I'm going to tell. Now you try it, nice and strong.",
"beats": [
"Let's practice in a strong voice.",
"If a touch feels not okay, you can say no, and then tell.",
"Say it with me.",
"No!",
"I'm going to tell.",
{
"t": "Now you try it, nice and strong.",
"w": 8
}
]
},
{
"k": "points",
"h": "Who you can tell",
"items": [
[
"A grown-up at home",
"Who takes care of you"
],
[
"A teacher",
"At school"
],
[
"The school counselor",
"A helper at school"
],
[
"Someone else you trust",
"A grandparent or coach"
]
],
"say": "Who could you tell? A grown-up at home who takes care of you. A teacher. The school counselor. A grandparent, an aunt, or a coach. If one grown-up doesn't help, tell another. Keep telling until someone helps.",
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
"h": "You are never in trouble for telling.",
"sub": "Even if it is someone you know.",
"say": "Even if it is someone you know and love, you can say no and tell. You will never be in trouble for telling. Your body is yours, and you are loved."
}
]
},
"helper": {
"id": "mp-g-body-safety-helper",
"guide": "body-safety",
"side": "helper",
"title": "Teaching Body Safety",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Stop It Now",
"https://www.stopitnow.org"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Teaching Body Safety",
"sub": "For the Grown-up",
"say": "If you want to teach a child body safety, this is for you. It can feel awkward at first, and you can keep it calm, simple, and ordinary."
},
{
"k": "big",
"h": "Like teaching them to cross the street.",
"say": "Teach body safety the way you teach crossing the street. Calm and matter of fact. You don't need one big talk. You need many small ones, over the years."
},
{
"k": "points",
"h": "What fits their age",
"items": [
[
"Kindergarten to grade 2",
"Short, simple, and often"
],
[
"Tie it to daily life",
"Bath, doctor, getting dressed"
],
[
"Grades 3 to 5",
"People they know, online too"
],
[
"Every age",
"Never in trouble for telling"
]
],
"say": "For younger kids, keep it short, simple, and often. Tie it to bath time, doctor visits, or getting dressed. Older kids can understand that people they know, in person or online, may not always be safe. And every child needs to hear that they will never be in trouble for telling.",
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
"h": "Words to use",
"items": [
"Your body belongs to you.",
"The parts your swimsuit covers are private.",
"You will never be in trouble for telling me."
],
"say": "Here are words to use. Your body belongs to you. The parts your swimsuit covers are private. If anyone ever makes you feel yucky, or asks you to keep a secret about your body, tell me. You will never be in trouble."
},
{
"k": "card",
"title": "Use the real names",
"body": "Correct names for body parts help kids speak up clearly.",
"say": "Use the correct names for body parts, the same way you name an elbow or a knee. It may feel awkward at first. Real names help kids speak up clearly if something ever happens."
},
{
"k": "big",
"h": "Practice it once.",
"sub": "So it feels natural.",
"say": "Practice what you'll say, so it feels natural. Take a breath. Picture your child at bath time. Now say it out loud, calmly. Your body belongs to you.",
"beats": [
"Practice what you'll say, so it feels natural.",
"Take a breath.",
"Picture your child at bath time.",
"Now say it out loud, calmly.",
{
"t": "Your body belongs to you.",
"w": 9
}
]
},
{
"k": "points",
"h": "What helps it stick",
"items": [
[
"Let them choose greetings",
"Wave, high five, or hug"
],
[
"Play \"What if\"",
"Calm and playful"
],
[
"Surprises, not secrets",
"Bad secrets get told"
],
[
"Name safe grown-ups",
"Several, not just one"
]
],
"say": "Some things help it stick. Let kids choose how to greet relatives: a wave, a high five, or a hug. Play what if, calmly and playfully. What if someone asks you to keep a secret about your body? Teach that surprises are fun and short, and secrets that feel bad get told. And name several safe grown-ups they can go to.",
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
"h": "Leave these out",
"items": [
[
"Forcing hugs or kisses"
],
[
"Talks about strangers only"
],
[
"Scary stories"
]
],
"say": "Leave a few things out. Forcing hugs or kisses, even with family. Talks about strangers only, since most harm to children comes from someone they know. And scary stories. Calm teaches better than fear.",
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
"title": "If they tell you something",
"body": "Stay calm. Believe them. Get help the same day.",
"say": "Sometimes a body safety talk opens a door, and a child tells you something worrying. Stay calm, believe them, and get help the same day. The Maple guide called When a Child Tells You Someone Hurt Them walks you through it. And if you're worried about a grown-up's behavior around a child, Stop It Now helps worried adults, at 1-888-773-8368."
},
{
"k": "big",
"h": "Keep talking, over the years.",
"sub": "Your body is yours. You can always tell me.",
"say": "Revisit the talk every few months. Notice and praise them when they speak up for themselves. Every small talk tells your child the same thing. Your body is yours, and you can always tell me."
}
]
}
},
{
"id": "online-secrets",
"ring": "mp-safety",
"title": "When Someone Online Asks for Secrets",
"you": {
"id": "mp-g-online-secrets-you",
"guide": "online-secrets",
"side": "you",
"title": "When Someone Online Asks for Secrets",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Someone Online Asks for Secrets",
"sub": "For You",
"say": "If you play games, watch videos, or chat online, this is for you. Being online can be a lot of fun. Here are a few things that help you stay safe."
},
{
"k": "big",
"h": "Some people pretend.",
"sub": "A friendly player can be a stranger.",
"say": "Some people online pretend to be kids, or pretend to be your friend. A friendly player in a game can really be a grown-up stranger. You can't always tell from a name or a picture."
},
{
"k": "points",
"h": "Tell a grown-up if someone",
"items": [
[
"Asks for a picture",
"Of you"
],
[
"Asks for a secret",
"From your family"
],
[
"Asks where you live",
"Or where you go to school"
],
[
"Wants to meet you",
"Anywhere"
]
],
"say": "Tell a grown-up right away if someone online does any of these things. Asks for a picture of you. Asks you to keep a secret from your family. Asks where you live, or where you go to school. Or wants to meet you. A safe person never asks you to keep secrets from your family.",
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
"h": "Yucky or confusing? Tell.",
"sub": "You are not in trouble.",
"say": "If you see something online that feels yucky or confusing, tell a grown-up. You are not in trouble. Even if someone said they would be mad. Even if you clicked something by mistake. A safe person never threatens you."
},
{
"k": "big",
"h": "Who could you tell?",
"sub": "Picture their faces.",
"say": "Let's think about who you could tell. Take a slow breath. Picture a safe grown-up's face. Now hold up one finger for every safe grown-up you can think of.",
"beats": [
"Let's think about who you could tell.",
"Take a slow breath.",
"Picture a safe grown-up's face.",
{
"t": "Now hold up one finger for every safe grown-up you can think of.",
"w": 10
}
]
},
{
"k": "words",
"h": "You can say",
"items": [
"Someone online asked me for a secret."
],
"sub": "Then show your grown-up.",
"say": "You can borrow these words. Someone online asked me for a secret. Then show your grown-up. You don't have to answer that person. Your grown-up will help with the rest."
},
{
"k": "big",
"h": "Telling is always right.",
"sub": "You are loved.",
"say": "Telling is always the right choice. Ask your grown-up to promise that you won't lose your game or tablet for telling. Telling keeps you safe, and you are loved."
}
]
},
"helper": {
"id": "mp-g-online-secrets-helper",
"guide": "online-secrets",
"side": "helper",
"title": "When Someone Online Asks for Secrets",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
],
[
"Common Sense Media",
"https://www.commonsensemedia.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Someone Online Asks for Secrets",
"sub": "For the Grown-up",
"say": "If your child games, chats, or watches videos online, this is for you. And if someone online has already asked your child for a secret or a picture, you can help, calmly, today."
},
{
"k": "points",
"h": "What is going on for kids",
"items": [
[
"Younger kids trust easily",
"A character can be a stranger"
],
[
"Older kids chat",
"In games and apps"
],
[
"Flattered or scared",
"Afraid to lose their device"
]
],
"say": "Young kids trust easily. They may not know that a friendly game character can be a real stranger. Older kids chat in games and apps. They may feel flattered by the attention, or scared they'll lose their device if they tell.",
"cue": {
"at": [
0,
2,
3
]
}
},
{
"k": "words",
"h": "Words to use",
"items": [
"Some people online pretend to be kids.",
"If anyone asks for a picture or a secret, tell me.",
"You will never be in trouble for telling me."
],
"say": "Say it plainly. Some people online pretend to be kids. If anyone ever asks you for a picture or a secret, come tell me. You will never be in trouble for telling me about something weird online."
},
{
"k": "card",
"title": "The promise that matters most",
"body": "\"You will never lose your tablet for telling me something scary.\"",
"say": "Then make the promise that matters most, and keep it. You will never lose your tablet for telling me something scary. Kids stay quiet when they fear losing their device. If they ask, will you take my game away, say, no. Telling me keeps you safe, and I'm proud of you for it."
},
{
"k": "big",
"h": "Say the promise out loud.",
"sub": "So it is ready when you need it.",
"say": "Say it out loud now, so it's ready. Take a breath. Picture your child coming to you with something scary. Now say it. You will never lose your tablet for telling me.",
"beats": [
"Say it out loud now, so it's ready.",
"Take a breath.",
"Picture your child coming to you with something scary.",
"Now say it.",
{
"t": "You will never lose your tablet for telling me.",
"w": 9
}
]
},
{
"k": "points",
"h": "Teach them to tell you",
"items": [
[
"A request for pictures"
],
[
"A secret from family"
],
[
"Questions about home or school"
],
[
"A plan to meet"
]
],
"say": "Teach them what to tell you about. Anyone asking for pictures. Anyone asking for a secret from family. Anyone asking where they live or go to school. And anyone asking to meet. A safe person never asks a child to keep secrets from their family, and never threatens them.",
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
"h": "If it happens",
"steps": [
[
"Stay calm",
"Thank them for telling"
],
[
"Save the chat",
"Usernames and messages"
],
[
"Report it",
"CyberTipline: 1-800-843-5678"
],
[
"Threats or meeting",
"Call the police"
]
],
"say": "If it happens, stay calm, and thank them for telling. Save the chat and the usernames, and report the account. Report online exploitation to the CyberTipline, at report dot cybertip dot org, or 1-800-843-5678. If someone threatens your child or asks to meet, call the police. If your child is in danger right now, call 911.",
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
"title": "Leave pictures to the police",
"body": "Never save, copy, or forward a picture of a child, even as evidence.",
"say": "One firm line. If a picture of a child is involved, never save, copy, or forward it, even as evidence. Leave pictures to law enforcement. Save the messages and usernames, and let the helpers do the rest."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"A family tech plan",
"Made together"
],
[
"Play their games",
"With them, sometimes"
],
[
"Devices in shared spaces",
"Where you can see"
],
[
"Controls plus talking",
"Controls support trust"
]
],
"say": "Here's what helps every day. Make a family tech plan together. Play their games with them sometimes, and learn the apps they use. Keep devices in shared spaces. And set up parent controls, while you keep talking. Controls support trust. They never replace it.",
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
"h": "Trust grows in the light.",
"sub": "Check in, casually and often.",
"say": "Any child can be targeted, so stay curious, never punishing. Check in about online friends, casually and often. Who did you play with today? Every calm talk makes the next one easier. Trust grows in the light."
}
]
}
},
{
"id": "self-harm",
"ring": "mp-safety",
"title": "Self-Harm: When a Child Hurts Themselves",
"you": {
"id": "mp-g-self-harm-you",
"guide": "self-harm",
"side": "you",
"title": "Self-Harm: When a Child Hurts Themselves",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Self-Harm: When a Child Hurts Themselves",
"sub": "For You",
"say": "If you have been hurting your own body on purpose when feelings get too big, this is for you. You are not in trouble, and you have people with you."
},
{
"k": "card",
"title": "Help is here.",
"body": "Tell a grown-up today. A grown-up can call or text 988 with you.",
"say": "First, where to find help. Tell a safe grown-up today. If you are badly hurt, a grown-up calls 911 right away. A grown-up can call or text 988 with you, any time. These numbers stay on the screen the whole time."
},
{
"k": "big",
"h": "You are not bad.",
"sub": "Big feelings need a gentle place to go.",
"say": "Sometimes a feeling inside gets so big that a kid hurts their own body. You are not bad, and you are not in trouble. You deserve help, and gentle ways through."
},
{
"k": "big",
"h": "Squeeze and let go.",
"sub": "Smell the flower. Blow out the candle.",
"say": "Let's try one together right now. Make two tight fists, and squeeze. Now let go, and let your hands go soft. Breathe in slowly, like smelling a flower. Now breathe out slowly, like blowing out a candle.",
"beats": [
"Let's try one together right now.",
"Make two tight fists, and squeeze.",
"Now let go, and let your hands go soft.",
"Breathe in slowly, like smelling a flower.",
{
"t": "Now breathe out slowly, like blowing out a candle.",
"w": 9
}
]
},
{
"k": "points",
"h": "Try this instead",
"items": [
[
"Find a safe grown-up",
"Go where people are"
],
[
"A cozy spot",
"Somewhere soft and calm"
],
[
"Slow breaths",
"Flower in, candle out"
],
[
"Draw or move",
"Scribble it, or stomp it out"
]
],
"say": "When a feeling gets big, try one of these. Find a safe grown-up, or go where people are. Go to a cozy spot. Take slow breaths. Or draw the feeling, or move your body until it gets smaller.",
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
"h": "Tell a safe grown-up today",
"items": [
"I have been hurting myself.",
"I need help."
],
"sub": "A parent, a teacher, a school counselor.",
"say": "Tell a safe grown-up today. A mom or dad, a grandparent, a teacher, your school counselor, or someone who takes care of you. You can borrow these words. I have been hurting myself. I need help. You don't have to stop all by yourself."
},
{
"k": "big",
"h": "Telling is brave.",
"sub": "For you, and for a friend.",
"say": "And if a friend ever says they want to hurt themselves, or want to die, you always tell a grown-up, even if your friend asked you not to. You are not in trouble. Telling is brave, and so are you."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
},
"helper": {
"id": "mp-g-self-harm-helper",
"guide": "self-harm",
"side": "helper",
"title": "Self-Harm: When a Child Hurts Themselves",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"dazzi",
[
"Child Mind Institute",
"https://childmind.org"
],
[
"988 Suicide and Crisis Lifeline",
"https://988lifeline.org"
],
[
"Cornell Self-Injury and Recovery Resources",
"https://selfinjury.bctr.cornell.edu"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Self-Harm: When a Child Hurts Themselves",
"sub": "For the Grown-up",
"say": "If you have just learned that a child you love is hurting themselves, this is for you. It is frightening, and you can help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Serious injury or danger right now: call 911. Thoughts of suicide: call or text 988.",
"say": "First, help right now. For a serious injury, or if your child is in danger right now, call 911. If they are thinking about suicide, call or text 988 together, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "How you react decides whether they tell you again. Shock, anger, or tears can teach a child to hide it. So steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"How you react decides whether they tell you again.",
"Shock, anger, or tears can teach a child to hide it.",
"So steady yourself first.",
"Feet on the floor.",
{
"t": "Breathe in slowly, and let it out even slower.",
"w": 9
}
]
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"Hitting, biting, pulling hair"
],
[
"Older kids",
"Often hidden by sleeves"
],
[
"Underneath",
"Pain without words yet"
]
],
"say": "Here's what it can look like. Younger children may hit themselves, bite, bang their head, or pull their hair when they are overwhelmed. Some of this is common in very young kids. If it happens often, causes injury, or comes with sadness, talk with their doctor. Older children may hurt their skin in places they can hide with sleeves or bandages. Underneath, it is usually pain a child doesn't have words for yet. It is rarely about getting attention, and a child who needs attention that badly still needs it.",
"cue": {
"at": [
1,
4,
5
]
}
},
{
"k": "words",
"h": "Words that help",
"items": [
"You are not in trouble.",
"I want to understand.",
"Can you tell me about it?"
],
"say": "Start gently. I saw the marks on your arm. You are not in trouble. I want to understand. It looks like something has been really hard. Can you tell me about it?"
},
{
"k": "big",
"h": "Ask about dying too.",
"sub": "Are you thinking about killing yourself?",
"say": "Hurting themselves is not the same as wanting to die, but the two can overlap. That's why you ask, gently and plainly. Are you thinking about killing yourself? Asking is safe. It does not put the idea in their head. If they say yes, stay with them, and call or text 988 together, right then."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Punishing or yelling"
],
[
"Why would you do that?"
],
[
"Promise you will never do it again."
],
[
"Watching every minute"
]
],
"say": "Some things close the door. Punishing or yelling. Asking, why would you do that? Making them promise never to do it again. A promise they can't keep adds shame. And watching them so closely that it feels like punishment.",
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
"k": "points",
"h": "What helps",
"items": [
[
"Care for wounds calmly",
"Like a scrape"
],
[
"Name the feeling",
"What came right before?"
],
[
"A calm-down list",
"A person, a cozy spot, a breath"
],
[
"Put things away calmly",
"Safety, not punishment"
]
],
"say": "Here's what helps. Care for any wounds calmly, the same way you would care for a scrape. Help them name the feeling that came right before. Make a short calm-down list together: a trusted person to find, a cozy spot, slow breaths, drawing, or moving their body. And put away sharp items and medicines calmly, as a safety step, not a punishment.",
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
"title": "Call their doctor",
"body": "This week, or today if it keeps happening.",
"say": "Call their doctor or a child mental health professional this week, or today if it keeps happening. Self-harm in a child always deserves a professional look. If your child asks, are you going to tell people, you can say, I will only tell people whose job is to help kids feel better. I won't tell your friends."
},
{
"k": "big",
"h": "Your steady love helps.",
"sub": "Get support for yourself too.",
"say": "Check in every day with one simple question about feelings. Keep going to appointments, even when things seem better. Expect setbacks, and respond the same calm way each time. Get support for yourself too, and call or text 988 any time, for them or for you. Your steady love helps."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
}
},
{
"id": "saw-porn",
"ring": "mp-safety",
"title": "When a Child Sees Pornography",
"you": {
"id": "mp-g-saw-porn-you",
"guide": "saw-porn",
"side": "you",
"title": "When a Child Sees Pornography",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
],
[
"Common Sense Media",
"https://www.commonsensemedia.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Sees Pornography",
"sub": "For You",
"say": "This is for you if you saw pictures or videos of people without clothes on, maybe on a tablet or a phone, maybe by accident. You are not in trouble."
},
{
"k": "big",
"h": "You did nothing wrong.",
"sub": "Lots of kids see it by accident.",
"say": "Lots of kids see things like that by accident, from a search, a video that played by itself, or someone else's tablet. Those pictures show private parts, the parts your swimsuit covers. They are made for grown-ups, and they are not healthy for kids. Seeing them does not make you bad."
},
{
"k": "words",
"h": "It can feel weird",
"items": [
"Confused",
"Giggly",
"Yucky",
"Curious"
],
"say": "You might feel confused, or giggly, or yucky, or curious. All of those feelings are okay. That weird feeling is your body and brain telling you it wasn't right for kids. That feeling is worth listening to."
},
{
"k": "flow",
"h": "Turn it off, flip it, tell",
"steps": [
[
"Turn it off",
"Close it or shut it"
],
[
"Flip it over",
"Screen side down"
],
[
"Tell a grown-up",
"Right away"
]
],
"say": "Here's a plan to remember. Turn it off. Flip it over. And tell a grown-up. You can do it every time something on a screen feels yucky or confusing.",
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
"h": "Say the plan out loud.",
"sub": "Turn it off. Flip it. Tell.",
"say": "Let's practice together. Take a slow breath, like smelling a flower. Now say the plan out loud, in your own voice. Turn it off, flip it over, and tell a grown-up.",
"beats": [
"Let's practice together.",
"Take a slow breath, like smelling a flower.",
"Now say the plan out loud, in your own voice.",
{
"t": "Turn it off, flip it over, and tell a grown-up.",
"w": 9
}
]
},
{
"k": "words",
"h": "Tell a safe grown-up",
"items": [
"I saw something online that felt yucky."
],
"sub": "A parent, a teacher, a school counselor.",
"say": "Tell a safe grown-up. A mom or dad, a grandparent, a teacher, your school counselor, or someone who takes care of you. You can say, I saw something online that felt yucky. And if anyone ever shows you pictures like that, or asks for pictures of you, tell a grown-up right away. That is never a secret to keep."
},
{
"k": "big",
"h": "Telling is always okay.",
"sub": "You are not in trouble.",
"say": "Telling is always okay, and you are not in trouble. The grown-ups who love you want to help with anything you see."
}
]
},
"helper": {
"id": "mp-g-saw-porn-helper",
"guide": "saw-porn",
"side": "helper",
"title": "When a Child Sees Pornography",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NetSmartz (National Center for Missing and Exploited Children)",
"https://www.missingkids.org/netsmartz"
],
[
"Common Sense Media",
"https://www.commonsensemedia.org"
],
[
"Stop It Now",
"https://www.stopitnow.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When a Child Sees Pornography",
"sub": "For the Grown-up",
"say": "If your child has seen pornography, this is for you. Most kids find it by accident. How you respond teaches them whether they can tell you next time."
},
{
"k": "big",
"h": "Calm and warm.",
"sub": "Decide it ahead of time.",
"say": "Decide ahead of time how you will react. Calm, and warm. Picture your child's face as they tell you. Now picture yourself saying, thank you for telling me.",
"beats": [
"Decide ahead of time how you will react.",
"Calm, and warm.",
"Picture your child's face as they tell you.",
{
"t": "Now picture yourself saying, thank you for telling me.",
"w": 10
}
]
},
{
"k": "points",
"h": "What it can look like",
"items": [
[
"Younger kids",
"A search, autoplay, an older kid's device"
],
[
"Older kids",
"Curious, ashamed, or scared"
],
[
"Looking again",
"Normal, and still a reason to talk"
]
],
"say": "Here's what it can look like. Younger children often stumble on it through a search, an autoplay video, or an older child's device. They may feel confused, giggly, or yucky, without words for it. Older children may feel curious, ashamed, or scared they are in trouble. Some go looking again out of curiosity. That is normal, and it is still a reason to talk.",
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
"h": "Words that help",
"items": [
"Thank you for telling me.",
"You did exactly the right thing.",
"You are not in trouble."
],
"say": "Start here. Thank you for telling me. You did exactly the right thing. You are not in trouble. Then name it simply. Those pictures show private parts. They are made for grown-ups and are not healthy for kids."
},
{
"k": "card",
"title": "If they ask",
"body": "Why do people make that? Some grown-ups make it to sell. It isn't meant for kids.",
"say": "Kids often ask questions. Why do people make that? Some grown-ups make it to sell. It doesn't show how real love and bodies work, and it isn't meant for kids. Why did it make me feel weird? Your body and brain were telling you it wasn't right for kids. That feeling is worth listening to."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Shaming or punishing"
],
[
"Taking every device away"
],
[
"Lots of questions",
"About exactly what they saw"
]
],
"say": "Some things close the door. Shaming or punishing. Taking every device away. That teaches kids not to tell. And asking lots of questions about exactly what they saw.",
"cue": {
"at": [
1,
2,
4
]
}
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Turn it off, flip it, tell",
"Practice the plan"
],
[
"Shared rooms",
"Devices where you are"
],
[
"Parental controls",
"No filter catches everything"
],
[
"Keep talking",
"Bodies, privacy, and safe touch"
]
],
"say": "Here's what helps. Teach a simple plan: turn it off, flip it over, and tell a grown-up. Keep devices in shared rooms. Use parental controls, and know that no filter catches everything. Keep talking about bodies, privacy, and safe touch in simple, calm words, and share your family's values about love and bodies warmly.",
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
"title": "When it is more than an accident",
"body": "Someone showed it, or asked for pictures: county child protection, or the CyberTipline, 1-800-843-5678.",
"say": "Sometimes it's more than an accident. If an adult or older child showed it to your child, or asked for pictures of them, report it. Call county child protection, or the CyberTipline at 1-800-843-5678. Call 911 if your child is in danger. Never view, save, or forward an image of a child, even as evidence. Leave that to law enforcement."
},
{
"k": "big",
"h": "Calm and warm keeps them telling.",
"sub": "Check in again in a few days.",
"say": "If your child seems troubled by it, or keeps looking for it, talk with their doctor or a counselor. Check in again in a few days, and practice the plan now and then. Calm and warm keeps them telling."
}
]
}
},
{
"id": "health-condition",
"ring": "mp-life",
"title": "A Health Condition Every Day",
"you": {
"id": "mp-g-health-condition-you",
"guide": "health-condition",
"side": "you",
"title": "A Health Condition Every Day",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Health Condition Every Day",
"sub": "For You",
"say": "Some kids have a health condition, like asthma, allergies, diabetes, or seizures. It means their body needs a little extra help, every day or some days. If that's you, this is for you."
},
{
"k": "card",
"title": "It is not your fault.",
"body": "Lots of kids have one.",
"say": "You didn't do anything to cause it. A health condition is not a punishment. Bodies are all different, and lots and lots of kids have one."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Mad",
"Scared",
"Tired",
"Brave",
"Okay"
],
"say": "You might feel mad about medicine. Or scared before the doctor. Or tired of it all. You might feel brave, or just okay. Every feeling is allowed."
},
{
"k": "points",
"h": "Your helpers",
"items": [
[
"Your grown-ups",
"At home"
],
[
"The school nurse",
"At school"
],
[
"Your doctor",
"At the clinic"
]
],
"say": "You have a whole team of helpers. Your grown-ups at home. The school nurse at school. And your doctor. Their job is to help your body. Your job is to tell them how you feel.",
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
"h": "Squeeze, and let go.",
"sub": "Like a lemon in your hands.",
"say": "When something is hard, like a shot or a medicine you don't like, your hands can help. Squeeze your hands tight, like you're squeezing a lemon. Now let them go soft, and take a slow breath.",
"beats": [
"When something is hard, like a shot or a medicine you don't like, your hands can help.",
"Squeeze your hands tight, like you're squeezing a lemon.",
{
"t": "Now let them go soft, and take a slow breath.",
"w": 8
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "If your body feels different, or you feel sad a long time.",
"say": "If your body feels different, or something hurts, tell a grown-up right away. And if you feel sad or worried for a long time, tell them that too. Telling is brave."
},
{
"k": "big",
"h": "You are a kid first.",
"sub": "Your health is just one part of you.",
"say": "You can play, learn, laugh, and have friends. Your health condition is one part of you. You are a kid first, and you are loved."
}
]
},
"helper": {
"id": "mp-g-health-condition-helper",
"guide": "health-condition",
"side": "helper",
"title": "A Health Condition Every Day",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"CDC Healthy Schools: How Schools Can Support Students with Chronic Health Conditions",
"https://www.cdc.gov/healthyschools/chronic_conditions/pdfs/2017_02_15-How-Schools-Can-Students-with-CHC_Final_508.pdf"
],
[
"PACER Center",
"https://www.pacer.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Health Condition Every Day",
"sub": "For the Grown-up",
"say": "When your child lives with a health condition, like asthma, allergies, diabetes, or epilepsy, this is for you, the grown-up beside them. The medical plan comes from their doctor. This is about the rest: the words, the feelings, and the everyday."
},
{
"k": "big",
"h": "They learn it from you.",
"sub": "Calm, simple, true words.",
"say": "Young children learn what their condition means from how the grown-ups around them talk about it. Calm, simple, true words help them feel steady. Use the same few words each time, and let your child choose the words they like for their own body."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"May think it is a punishment"
],
[
"Grades 3 to 5",
"Notice they are different"
],
[
"Every age",
"Want you close"
]
],
"say": "Here's what this can look like. Young children may think their condition is a punishment, or fight medicine they don't understand. Older children notice they're different from friends, and some hide symptoms so they don't miss out. At every age, they want to know you'll stay close.",
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
"h": "Words that help",
"items": [
"\"Nothing you did made this happen.\"",
"\"Lots of kids have it.\"",
"\"We take care of it together.\""
],
"say": "Try words like these. Nothing you did made this happen. Lots of kids have it. We know how to take care of it, together. When they ask if it will go away, tell the truth as you know it, and say you'll learn as you go."
},
{
"k": "points",
"h": "Give them a real job",
"items": [
[
"Hold it",
"The inhaler or the snack"
],
[
"Choose",
"Which arm, which bandage"
],
[
"Remind you",
"Of the next step"
]
],
"say": "Children feel steadier when they have a small, real part. They can hold the inhaler or the snack. They can choose which arm, or which bandage. Older kids can remind you of the next step. Add one more job as they grow.",
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
"h": "School that feels safe",
"steps": [
[
"Meet the nurse",
"Make a written plan"
],
[
"Tell the teacher",
"What helps, kept private"
],
[
"Visit together",
"Where to go"
],
[
"Plan for missed days",
"A way to catch up"
]
],
"say": "School matters a lot here. Meet with the school nurse and make a written plan. Tell the teacher what helps, and ask that it stay private from classmates. Visit together so your child knows where to go. And plan for missed days, so catching up feels doable.",
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
"title": "Plan for a yes.",
"body": "Parties, sports, and sleepovers, with a plan.",
"say": "Worry can make us say no to everything. Try planning instead. A safe snack for the party. A coach who knows the plan. A sleepover with a call at bedtime. Ordinary days of play and friends are part of growing well."
},
{
"k": "big",
"h": "One ordinary joy this week.",
"sub": "Picture it. Plan it.",
"say": "Take a slow breath. Think of one thing your child loves that has nothing to do with their health. Now pick a time this week to do it together.",
"beats": [
"Take a slow breath.",
"Think of one thing your child loves that has nothing to do with their health.",
{
"t": "Now pick a time this week to do it together.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "New symptoms: their doctor. Worry that lasts: the school counselor.",
"say": "Call their doctor about any new or worsening symptoms, and ask about a child life specialist for hard procedures. If worry, sadness, or fear of medical care lasts more than a couple of weeks, talk with their doctor or the school counselor. And look after yourself too. You're carrying a lot."
},
{
"k": "big",
"h": "A kid first.",
"sub": "The full guide has more, whenever you want it.",
"say": "Calm words, a small real job, and plenty of ordinary days. Your child is a kid first. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "moving-differently",
"ring": "mp-life",
"title": "Moving Differently: Wheels, Braces, and Joining In",
"you": {
"id": "mp-g-moving-differently-you",
"guide": "moving-differently",
"side": "you",
"title": "Moving Differently: Wheels, Braces, and Joining In",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Moving Differently: Wheels, Braces, and Joining In",
"sub": "For You",
"say": "Some kids move with a wheelchair. Some use braces, crutches, or a walker. Some bodies just move in their own way. If that's you, this is for you."
},
{
"k": "card",
"title": "Your way is a real way.",
"body": "Rolling, walking, scooting, all of it.",
"say": "Rolling is moving. Walking with braces is moving. Scooting, crawling, and dancing in a chair are moving too. Your way of getting around is a real way, and it works."
},
{
"k": "card",
"title": "The stairs are the problem.",
"body": "Not you.",
"say": "Sometimes a place has only stairs, or a game doesn't fit. That isn't your fault. The problem is the stairs, or the game. Grown-ups can help change it, so everyone can come in and play."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Strong",
"Left out",
"Frustrated",
"Happy"
],
"say": "You might feel proud and strong. Sometimes you might feel left out, or frustrated when your body or a place won't let you do what you want. And lots of times, you just feel happy. Every feeling is okay."
},
{
"k": "words",
"h": "You can say",
"items": [
"\"Can you wait for me?\"",
"\"Can we play a game I can join?\"",
"\"Please ask before you push.\""
],
"say": "You can say what you need. Try one of these out loud, in a strong voice. Can you wait for me? Can we play a game I can join? Please ask before you push my chair.",
"beats": [
"You can say what you need.",
"Try one of these out loud, in a strong voice.",
"Can you wait for me?",
"Can we play a game I can join?",
{
"t": "Please ask before you push my chair.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "If something hurts, or you keep getting left out.",
"say": "If your body hurts, or your chair or braces don't fit right, tell a grown-up. And if kids keep leaving you out, tell a grown-up you trust, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "There is a place for you.",
"sub": "Just as you are.",
"say": "You belong on the playground, in the classroom, and in every game. There is a place for you, just as you are."
}
]
},
"helper": {
"id": "mp-g-moving-differently-helper",
"guide": "moving-differently",
"side": "helper",
"title": "Moving Differently: Wheels, Braces, and Joining In",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PACER Center",
"https://www.pacer.org/"
],
"socialmodel"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Moving Differently: Wheels, Braces, and Joining In",
"sub": "For the Grown-up",
"say": "When your child moves with a wheelchair, braces, crutches, or in their own way, this is for you, the grown-up beside them. Their doctors and therapists guide the body. This is about belonging, words, and joining in."
},
{
"k": "big",
"h": "Look for what can change.",
"sub": "Often the barrier is the stairs, not the child.",
"say": "Here's a helpful way to see it. Often the barrier isn't your child's body. It's the stairs, the game, or the plan that left them out. When you look for what can change around your child, you both have more to work with."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Joy, curiosity, wheels and all"
],
[
"Grades 3 to 5",
"Notice being left out"
],
[
"Every age",
"Proud of their own way"
]
],
"say": "Here's what this can look like. Young children move through the world with joy and curiosity, and may not notice a difference until someone points it out. Older children notice being left out: the game that never fits, the friend who forgets to wait. At every age, many are proud of their own way of moving.",
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
"h": "Words that fit",
"items": [
"\"You use a wheelchair.\"",
"\"Your body moves its own way.\"",
"\"The stairs are the problem.\""
],
"say": "Your words shape theirs. Say, you use a wheelchair, rather than stuck in a chair. Say, your body moves its own way. And when a place leaves them out, say, the stairs are the problem. Ask what words your child likes. Each person chooses their own words."
},
{
"k": "points",
"h": "Joining in",
"items": [
[
"Talk to teachers",
"Adapt the games"
],
[
"Practice asking",
"Can you wait for me?"
],
[
"Find places",
"Built for every body"
]
],
"say": "Joining in takes a little planning. Talk with the teacher and the physical education teacher about adapting games, so your child plays instead of watching. Practice asking with your child: can you wait for me? And find adapted sports, swim times, and playgrounds built for every body.",
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
"title": "Their equipment is their space.",
"body": "Ask before touching or pushing.",
"say": "A wheelchair, walker, or crutches are part of your child's space. Teach siblings, friends, and even helpful grown-ups to ask before touching or pushing. It tells your child their body and their choices are theirs."
},
{
"k": "words",
"h": "Too heavy to carry",
"items": [
"Pity",
"Praise for ordinary things",
"Sitting out by default"
],
"say": "A few things weigh a child down. Pity, which tells them their life is smaller. Praise for ordinary things, as if eating lunch were a wonder. And sitting out by default, when a little planning would let them join."
},
{
"k": "big",
"h": "One place that welcomes every body.",
"sub": "Picture it. Plan a visit.",
"say": "Take a slow breath. Think of one place your child would love to go, a park, a pool, or a friend's house. Now picture one thing you could ask or plan so they can join in there.",
"beats": [
"Take a slow breath.",
"Think of one place your child would love to go, a park, a pool, or a friend's house.",
{
"t": "Now picture one thing you could ask or plan so they can join in there.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Pain or new changes: their doctor. Sadness that lasts: the school counselor.",
"say": "Talk with their doctor or therapist about pain, new changes in movement, or equipment that no longer fits. If your child seems sad, left out, or worried for more than a couple of weeks, talk with their doctor or the school counselor. And save a little rest for yourself."
},
{
"k": "big",
"h": "There is a place for them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Plain words, joining in, and an eye on what can change. There is a place for your child, just as they are. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "hearing-differently",
"ring": "mp-life",
"title": "Hearing Differently",
"you": {
"id": "mp-g-hearing-differently-you",
"guide": "hearing-differently",
"side": "you",
"title": "Hearing Differently",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Hearing Differently",
"sub": "For You",
"say": "Some kids hear a little. Some hear a lot with hearing aids. Some don't hear with their ears at all, and talk with their hands. If you hear in your own way, this is for you."
},
{
"k": "card",
"title": "Your way is a real way.",
"body": "Eyes, hands, ears, and words.",
"say": "You can understand people with your eyes, your hands, your hearing aids, and the words on the screen. Signing is talking. Reading lips is listening. Your way works."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Tired",
"Left out",
"Curious",
"Happy"
],
"say": "You might feel proud of how you talk. You might feel tired after a noisy day. Sometimes you might feel left out, when everyone laughs and you don't know why. Every feeling is okay."
},
{
"k": "words",
"h": "You can say",
"items": [
"\"Can you face me?\"",
"\"What did you say?\"",
"\"What's funny?\""
],
"say": "You can always ask. You can say, or sign: can you face me? What did you say? What's funny? Asking is smart, and good friends are glad to help."
},
{
"k": "big",
"h": "Tap a beat.",
"sub": "Feel it with your hands.",
"say": "Here's something fun. Put your hand flat on a table or the floor. Tap a beat, slow, then fast, and feel it in your fingers.",
"beats": [
"Here's something fun.",
"Put your hand flat on a table or the floor.",
{
"t": "Tap a beat, slow, then fast, and feel it in your fingers.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "If your ears hurt, or you feel left out a lot.",
"say": "If your ears hurt, or your hearing aids feel wrong, tell a grown-up. And if you feel left out a lot, tell a grown-up you trust, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "You belong here.",
"sub": "Just as you are.",
"say": "There are lots of kids and grown-ups who hear like you do. You belong with your friends, your family, and your class, just as you are."
}
]
},
"helper": {
"id": "mp-g-hearing-differently-helper",
"guide": "hearing-differently",
"side": "helper",
"title": "Hearing Differently",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PACER Center",
"https://www.pacer.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Hearing Differently",
"sub": "For the Grown-up",
"say": "When your child is Deaf, hard of hearing, or hears in their own way, this is for you, the grown-up beside them. Their audiologist and doctors guide the hearing side. This is about belonging, words, and everyday life."
},
{
"k": "big",
"h": "Your family chooses.",
"sub": "The words, and the way you talk.",
"say": "Families choose their own words, like Deaf, hard of hearing, or hearing differently. Many Deaf people see Deafness as a community and a culture with its own language. Families also choose how they talk: signing, speaking, or both. Choose with your child and their team, and use those words every time."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Tired in noisy places"
],
[
"Grades 3 to 5",
"Missing jokes and group talk"
],
[
"Every age",
"Want to belong"
]
],
"say": "Here's what this can look like. Young children may get tired or upset in noisy places, and not know why. Older children notice missing jokes, group talk, and announcements. At every age, what they want most is to belong.",
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
"h": "Everyday things that help",
"items": [
[
"Attention first",
"A tap, a wave, the lights"
],
[
"Face them",
"Good light, mouth and hands clear"
],
[
"Captions on",
"Every show and video"
]
],
"say": "A few everyday things help a lot. Get their attention first, with a tap, a wave, or a flick of the lights. Face them when you talk, in good light, with your mouth and hands easy to see. And turn captions on for every show and video.",
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
"title": "Always say it again.",
"body": "Repeat it, or write it. They deserve the whole joke.",
"say": "When your child misses something, it's tempting to say never mind, it doesn't matter. To a child, that says they don't matter. Repeat it, sign it, or write it down. They deserve the whole joke, and the whole conversation."
},
{
"k": "flow",
"h": "At school",
"steps": [
[
"Where they sit",
"See the teacher and friends"
],
[
"Captions and notes",
"On every video"
],
[
"The right helpers",
"Interpreter or teacher of the Deaf"
]
],
"say": "School matters a lot here. Ask where your child sits, so they can see the teacher, an interpreter, and their friends. Ask for captions on every video, and written directions. And ask who can help, like an interpreter, or a teacher for the Deaf and hard of hearing.",
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
"title": "Friends who share their way.",
"body": "Other kids, and grown-ups, who hear like them.",
"say": "Belonging grows when a child knows others who share their way of talking. Look for other kids who sign or use hearing aids, and, if your family wants, Deaf grown-ups your child can look up to. Learning some sign language together, if your family uses it, says this is all of ours."
},
{
"k": "big",
"h": "One moment they missed.",
"sub": "Picture it. Plan to share it.",
"say": "Take a slow breath. Think of one place where your child often misses out, like dinner or the car. Now picture one small change, like facing each other or writing it down, so they can be part of it.",
"beats": [
"Take a slow breath.",
"Think of one place where your child often misses out, like dinner or the car.",
{
"t": "Now picture one small change, like facing each other or writing it down, so they can be part of it.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Hearing changes: their audiologist. Loneliness that lasts: the school team.",
"say": "Talk with their audiologist or doctor about any change in hearing, ear pain, or trouble with hearing aids or implants. If your child seems lonely, left out, or worried for more than a couple of weeks, talk with their school team or the school counselor. And care for yourself too."
},
{
"k": "big",
"h": "They belong here.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their words, their way of talking, and a place where they belong. Your child is the expert on their own day. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "seeing-differently",
"ring": "mp-life",
"title": "Seeing Differently",
"you": {
"id": "mp-g-seeing-differently-you",
"guide": "seeing-differently",
"side": "you",
"title": "Seeing Differently",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Seeing Differently",
"sub": "For You",
"say": "Some kids see a little. Some see things only up close. Some don't see with their eyes at all. Glasses don't change it. If you see in your own way, this is for you."
},
{
"k": "card",
"title": "Your way is a real way.",
"body": "Hands, ears, nose, and eyes.",
"say": "You learn about the world with your hands, your ears, your nose, and the part your eyes can see. Reading braille is reading. Using a cane is walking. Listening to a book is reading too. Your way works."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Curious",
"Unsure",
"Left out",
"Happy"
],
"say": "You might feel proud of how you read or get around. You might feel unsure in a new room, or when someone moves your things. Sometimes you might feel left out. Every feeling is okay."
},
{
"k": "words",
"h": "You can say",
"items": [
"\"Who's there?\"",
"\"Please say my name.\"",
"\"Where is it?\""
],
"say": "You can always ask. You can say: who's there? Please say my name when you talk to me. Where is it? Asking is smart, and good friends are glad to help."
},
{
"k": "big",
"h": "Listen close.",
"sub": "Find three sounds.",
"say": "Let's try something. Sit still, and listen close. Find three sounds you can hear right now, near or far.",
"beats": [
"Let's try something.",
"Sit still, and listen close.",
{
"t": "Find three sounds you can hear right now, near or far.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "If your eyes hurt, or you feel left out a lot.",
"say": "If your eyes hurt, or seeing changes, tell a grown-up. And if you feel left out a lot, tell a grown-up you trust, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "You belong here.",
"sub": "Just as you are.",
"say": "There are lots of kids and grown-ups who see like you do. You belong with your friends, your family, and your class, just as you are."
}
]
},
"helper": {
"id": "mp-g-seeing-differently-helper",
"guide": "seeing-differently",
"side": "helper",
"title": "Seeing Differently",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"PACER Center",
"https://www.pacer.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Seeing Differently",
"sub": "For the Grown-up",
"say": "When your child is blind, has low vision, or sees in their own way, this is for you, the grown-up beside them. Their eye doctors guide the vision side. This is about belonging, words, and everyday life."
},
{
"k": "big",
"h": "Your family chooses the words.",
"sub": "Blind, low vision, or seeing differently.",
"say": "Families choose their own words, like blind, low vision, or seeing differently. Many blind people use the word blind with pride, as part of who they are. Choose with your child, and use those words every time."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Explore by touch and sound"
],
[
"Grades 3 to 5",
"Notice what they miss"
],
[
"Every age",
"Want to belong"
]
],
"say": "Here's what this can look like. Young children explore by touch, sound, and smell, and may feel unsure in new or crowded places. Older children notice what they miss, like a wave across the room or a picture on the board. At every age, they want to belong.",
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
"h": "Everyday things that help",
"items": [
[
"Say your name",
"Coming and going"
],
[
"Use words for where",
"Not over there"
],
[
"Keep things in place",
"Tell them when they move"
]
],
"say": "A few everyday things help a lot. Say your name when you come close, and say when you leave. Use words for where things are: your cup is by your right hand, not over there. And keep things in the same place, and tell them when something moves.",
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
"title": "Offer your arm.",
"body": "Never grab or steer.",
"say": "When your child needs a guide, offer your arm and let them take it. Never grab their arm or steer them from behind. Teach friends and family to do the same. It tells your child their body and their choices are theirs."
},
{
"k": "flow",
"h": "At school",
"steps": [
[
"A vision teacher",
"Braille, large print, tools"
],
[
"Safe travel",
"A mobility instructor"
],
[
"Materials early",
"Start with the class"
]
],
"say": "School matters a lot here. Ask about a teacher for students who are blind or have low vision, who can help with braille, large print, and tools. Ask about an orientation and mobility instructor, who teaches safe travel with a cane. And ask that materials come early, so your child starts with the class.",
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
"title": "Their tools are theirs.",
"body": "A cane, braille, a magnifier, a screen reader.",
"say": "A cane, braille, a magnifier, or a screen reader are your child's tools for learning and getting around. Treat them with respect, keep them within reach, and celebrate their skill with them. Some kids feel shy using them around friends. That's normal, and it often eases with friends who understand."
},
{
"k": "big",
"h": "Describe one moment.",
"sub": "Picture it. Put it into words.",
"say": "Take a slow breath. Think of one moment your child might miss, like a sunset, a smile, or a funny face. Now picture how you could describe it in words, so they can share it with you.",
"beats": [
"Take a slow breath.",
"Think of one moment your child might miss, like a sunset, a smile, or a funny face.",
{
"t": "Now picture how you could describe it in words, so they can share it with you.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Vision changes: their eye doctor. Loneliness that lasts: the school team.",
"say": "Talk with their eye doctor about any change in vision, eye pain, or headaches. If your child seems lonely, left out, or worried for more than a couple of weeks, talk with their school team or the school counselor. And care for yourself too."
},
{
"k": "big",
"h": "They belong here.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their words, their tools, and a world described out loud. Your child is the expert on their own day. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "autism-brain",
"ring": "mp-life",
"title": "Autism: How My Brain Works",
"you": {
"id": "mp-g-autism-brain-you",
"guide": "autism-brain",
"side": "you",
"title": "Autism: How My Brain Works",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Autism: How My Brain Works",
"sub": "For You",
"say": "Some kids are autistic. That means their brain works in its own way. If you're autistic, or you have autism, this is for you."
},
{
"k": "points",
"h": "An autistic brain can",
"items": [
[
"Notice details",
"Things others miss"
],
[
"Love things a lot",
"Trains, animals, maps"
],
[
"Feel things big",
"Sounds, lights, changes"
]
],
"say": "An autistic brain is a real way to be. It can notice details other people miss. It can love some things a whole lot, like trains, animals, or maps. And it can feel sounds, lights, and changes in a really big way.",
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
"title": "Nothing is wrong with you.",
"body": "Some things are harder. Some are easier.",
"say": "Nothing is wrong with you. Some things are harder for your brain, like loud rooms or surprises. Some things are easier, like remembering facts about what you love. Lots of kids and grown-ups are autistic too."
},
{
"k": "words",
"h": "Things that can help",
"items": [
"Headphones",
"A quiet spot",
"A picture schedule",
"Moving my body"
],
"say": "When things feel too big, some things can help. Headphones. A quiet spot. A picture schedule, so you know what's next. Moving your body in ways that calm you, like rocking or flapping. You can ask for what helps."
},
{
"k": "big",
"h": "Press, and let go.",
"sub": "Palms together. Count to five.",
"say": "Here's something that helps lots of kids. Press your hands together, hard, and count to five. Now let go, and feel your hands relax.",
"beats": [
"Here's something that helps lots of kids.",
"Press your hands together, hard, and count to five.",
{
"t": "Now let go, and feel your hands relax.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up.",
"body": "What helps, and what feels too big.",
"say": "You can tell a grown-up what helps you and what feels too big. If you feel sad, scared, or alone a lot, tell a grown-up you trust, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "Your brain is a good brain.",
"sub": "Just the way it works.",
"say": "Your brain is a good brain, just the way it works. You are loved, all of you."
}
]
},
"helper": {
"id": "mp-g-autism-brain-helper",
"guide": "autism-brain",
"side": "helper",
"title": "Autism: How My Brain Works",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
[
"PACER Center",
"https://www.pacer.org/"
],
"kenny16"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Autism: How My Brain Works",
"sub": "For the Grown-up",
"say": "When your child is autistic, this is for you, the grown-up beside them, and maybe getting ready to talk with them about it. Their doctors and therapists guide the clinical side. This is about words, belonging, and everyday life."
},
{
"k": "big",
"h": "Knowing can bring relief.",
"sub": "There is a reason, and nothing is wrong with them.",
"say": "Many children feel relief when they learn they're autistic, in kind words. There is a reason some things feel so big, and nothing is wrong with them. Many families tell their child early, in small pieces, and keep adding as the child grows."
},
{
"k": "words",
"h": "Your family chooses the words",
"items": [
"\"You are autistic.\"",
"\"You have autism.\"",
"\"Your brain works its own way.\""
],
"say": "Families choose their own words. Many autistic people prefer to say, I am autistic, because it's part of who they are. Others say, I have autism. Some children like, my brain works its own way. Ask your child what fits, and use it."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Big feelings, few words"
],
[
"Grades 3 to 5",
"Notice they are different"
],
[
"Every age",
"Want to be understood"
]
],
"say": "Here's what this can look like. Young children may not have words for why some sounds or changes feel so big. Older children notice they think differently, and friendships and unwritten rules can be confusing. At every age, they want to be understood.",
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
"A calm spot",
"Senses can settle"
],
[
"A heads-up",
"Before changes"
],
[
"Their interests",
"A doorway in"
],
[
"Calming movement",
"When it is safe"
]
],
"say": "A few things help a lot. A calm spot, where their senses can settle. A heads-up before changes, or a picture schedule. Their interests, which are a strength and a doorway in. And room for movement that calms them, like rocking or flapping, when it's safe.",
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
"title": "Join them in what they love.",
"body": "Trains, dinosaurs, maps, or music.",
"say": "Your child's deep interests aren't a problem to manage. They're a place to meet. Ten minutes on the floor talking trains, maps, or dinosaurs says, I like how your brain works. It also builds the trust that helps on hard days."
},
{
"k": "words",
"h": "Too heavy to carry",
"items": [
"Talk of autism as sad",
"Stopping harmless movement",
"Constant surprises"
],
"say": "A few things weigh a child down. Hearing autism talked about as sad or scary. Being stopped from calming movements that hurt no one. And constant surprises and rushed changes. Small shifts here make a big difference."
},
{
"k": "big",
"h": "Three things you love about their brain.",
"sub": "Picture them. Say one this week.",
"say": "Take a slow breath. Think of three things you love about how your child's brain works. Now pick one to tell them this week, in words they'll understand.",
"beats": [
"Take a slow breath.",
"Think of three things you love about how your child's brain works.",
{
"t": "Now pick one to tell them this week, in words they'll understand.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Therapy questions: their care team. Sadness that lasts: the school counselor.",
"say": "Talk with their doctor or care team about sleep, eating, or new worries, and any therapy questions. If your child seems sad, very worried, or left out for more than a couple of weeks, talk with the school counselor or their doctor. And find people who get it, for you too."
},
{
"k": "big",
"h": "A good brain.",
"sub": "The full guide has more, whenever you want it.",
"say": "Kind words, their own words, and room for how their brain works. Your child has a good brain. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sibling-health",
"ring": "mp-life",
"title": "A Brother or Sister with a Disability or Illness",
"you": {
"id": "mp-g-sibling-health-you",
"guide": "sibling-health",
"side": "you",
"title": "A Brother or Sister with a Disability or Illness",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Sibling Support Project",
"https://siblingsupport.org/"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Brother or Sister with a Disability or Illness",
"sub": "For You",
"say": "Maybe your brother or sister has a disability, or gets sick a lot, or is in the hospital. If that's your family, this is for you, the brother or sister."
},
{
"k": "card",
"title": "It is not your fault.",
"body": "And you can't catch it.",
"say": "Nothing you did, said, or thought made it happen. A disability isn't something you can catch. Most illnesses aren't either. Your grown-ups and the doctors are taking care of your brother or sister."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Worried",
"Jealous",
"Lonely",
"Mixed up"
],
"say": "You might feel proud of them. You might feel worried. Sometimes you might feel jealous, or lonely, when grown-ups are busy. You might feel all of it at once. Every feeling is okay. You can love someone and still feel mad."
},
{
"k": "big",
"h": "Hand on your heart.",
"sub": "My feelings matter too.",
"say": "Put your hand on your heart. Feel it beating. Now say, out loud or inside: My feelings matter too.",
"beats": [
"Put your hand on your heart.",
"Feel it beating.",
{
"t": "Now say, out loud or inside: My feelings matter too.",
"w": 8
}
]
},
{
"k": "points",
"h": "You can ask for",
"items": [
[
"Your own time",
"Just you and a grown-up"
],
[
"The truth",
"What is happening"
],
[
"A break",
"To just be a kid"
]
],
"say": "You can ask for things too. Your own time with a grown-up, just the two of you. The truth about what's happening, in words you understand. And a break, to just play and be a kid.",
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
"title": "Grown-ups do the big taking care of.",
"body": "Your job is to be a kid.",
"say": "Helping a little can feel good, like making a card. The big taking care of is a grown-up job. If you feel sad, worried, or mad for a long time, tell a grown-up you trust, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "You matter just as much.",
"sub": "Always.",
"say": "Your brother or sister matters so much. And so do you. You matter just as much, always."
}
]
},
"helper": {
"id": "mp-g-sibling-health-helper",
"guide": "sibling-health",
"side": "helper",
"title": "A Brother or Sister with a Disability or Illness",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Sibling Support Project",
"https://siblingsupport.org/"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
],
"sibsupport"
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "A Brother or Sister with a Disability or Illness",
"sub": "For the Grown-up",
"say": "When one of your children has a disability or a long or serious illness, this is for you, about the brothers and sisters. You're stretched thin. Small, steady things help siblings most."
},
{
"k": "big",
"h": "Siblings carry a quiet share.",
"sub": "Love, worry, and needs of their own.",
"say": "Brothers and sisters carry a quiet share. They love fiercely, and they notice everything: the hospital bag, the extra appointments, the tired faces. Many decide not to add to the load, and keep their own needs to themselves."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Fear they caused it"
],
[
"Grades 3 to 5",
"Guilt, jealousy, pride"
],
[
"Some kids",
"Become the easy child"
]
],
"say": "Here's what this can look like. Young siblings may worry they caused it or can catch it, and may act younger to get close again. Older siblings can feel proud, jealous, and guilty for being healthy, all at once. And some become the easy child, who never asks for anything.",
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
"h": "Simple, true words",
"items": [
"\"Nothing you did caused it.\"",
"\"You can't catch it.\"",
"\"I miss you. Let's make time.\""
],
"say": "Silence fills with worry, so give simple, true updates. Nothing you did caused it. You can't catch it. When you've been gone a lot, say so: I've been busy with your brother. I miss you. Let's make some time that's just ours."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Their own time",
"On the calendar, protected"
],
[
"A plan for hospital days",
"Who is with them"
],
[
"A sibling group",
"Kids who understand"
],
[
"Their teacher",
"Someone who notices"
]
],
"say": "What helps. Regular time that's just theirs, on the calendar, and protected. A plan for hospital days, so they know who will be with them. A sibling group, like a Sibshop, where they meet kids who understand. And telling their teacher, so someone at school notices how they are.",
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
"h": "Too heavy for a sibling",
"items": [
"Being a caregiver",
"Being the easy child",
"Being left out \"to protect them\""
],
"say": "A few things are too heavy for a sibling. Being expected to be a caregiver. Being praised for needing nothing, which can become pressure. And being left out of what's happening, to protect them. Most kids imagine worse than the truth."
},
{
"k": "big",
"h": "A note just for them.",
"sub": "Picture it. Write it this week.",
"say": "Take a slow breath. Picture your other child, the one who waits. Now think of one sentence you could write in a note for their lunch or pillow, just for them.",
"beats": [
"Take a slow breath.",
"Picture your other child, the one who waits.",
{
"t": "Now think of one sentence you could write in a note for their lunch or pillow, just for them.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Sadness or worry that lasts: their doctor or school counselor.",
"say": "If a sibling's sadness, worry, anger, or trouble sleeping lasts more than a couple of weeks, talk with their doctor or school counselor. Ask the hospital whether a child life specialist or social worker supports siblings. And let others carry some of the load, so you can rest too."
},
{
"k": "big",
"h": "Every child matters here.",
"sub": "The full guide has more, whenever you want it.",
"say": "True words, protected time, and a place with kids who understand. Every child matters here. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "ask-stare-tease",
"ring": "mp-life",
"title": "When Other Kids Ask, Stare, or Tease",
"you": {
"id": "mp-g-ask-stare-tease-you",
"guide": "ask-stare-tease",
"side": "you",
"title": "When Other Kids Ask, Stare, or Tease",
"sideName": "For You",
"mins": 2,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Other Kids Ask, Stare, or Tease",
"sub": "For You",
"say": "Sometimes kids ask about your wheelchair, your hearing aids, your medicine, or how you do things. Sometimes they stare. Sometimes they tease. If that happens to you, this is for you."
},
{
"k": "points",
"h": "Three different things",
"items": [
[
"Asking",
"Kids are curious"
],
[
"Staring",
"They saw something new"
],
[
"Teasing",
"Unkind, and not okay"
]
],
"say": "These are three different things. Asking is when kids are curious. Staring is when they see something new. Teasing is when someone is unkind on purpose, and that is not okay.",
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
"h": "If they ask",
"items": [
"\"I use hearing aids. They help me hear.\"",
"\"I don't want to talk about it.\""
],
"say": "If they ask, you can give an easy answer. Like, I use hearing aids, they help me hear. Or you can say, I don't want to talk about it. Both are okay. You never have to explain your body."
},
{
"k": "big",
"h": "Sit tall. Say it strong.",
"sub": "\"That's just how I do it.\"",
"say": "Let's practice. Sit or stand tall, and take a big breath. Now say it out loud, in a strong voice: That's just how I do it.",
"beats": [
"Let's practice.",
"Sit or stand tall, and take a big breath.",
{
"t": "Now say it out loud, in a strong voice: That's just how I do it.",
"w": 8
}
]
},
{
"k": "card",
"title": "If they tease, tell.",
"body": "Grown-ups will help it stop.",
"say": "If someone teases you about your body or your brain, it isn't your fault. Tell a grown-up you trust, like a parent, a teacher, or your school counselor. Tell again if it doesn't stop. Grown-ups will help."
},
{
"k": "card",
"title": "Find your people.",
"body": "Friends who like you just as you are.",
"say": "Some kids will ask, and then want to play. Look for the friends who like you just as you are. They're out there, and you deserve them."
},
{
"k": "big",
"h": "Nothing is wrong with you.",
"sub": "You belong here.",
"say": "Being different isn't something wrong. You belong in your class, on the playground, and with your friends, just as you are."
}
]
},
"helper": {
"id": "mp-g-ask-stare-tease-helper",
"guide": "ask-stare-tease",
"side": "helper",
"title": "When Other Kids Ask, Stare, or Tease",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"StopBullying.gov",
"https://www.stopbullying.gov"
],
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"National Association of School Psychologists",
"https://www.nasponline.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "When Other Kids Ask, Stare, or Tease",
"sub": "For the Grown-up",
"say": "When your child gets asked about, stared at, or teased because of how they move, hear, see, learn, or live with a health condition, this is for you, the grown-up beside them."
},
{
"k": "points",
"h": "Three different moments",
"items": [
[
"A question",
"A ready answer"
],
[
"A stare",
"A choice"
],
[
"Teasing",
"Grown-ups act"
]
],
"say": "It helps to sort three different moments. A curious question, which a ready answer can handle. A stare, where your child gets to choose: smile, wave, or look away. And teasing, which is bullying, where grown-ups step in.",
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
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Curious classmates, blunt questions"
],
[
"Grades 3 to 5",
"Stares and whispers sting more"
],
[
"Some kids",
"Hide to fit in"
]
],
"say": "Here's what this can look like. Young children and their classmates are curious and blunt, and a child may feel fine one day and hurt the next. Older children feel stares and whispers more. And some begin hiding their equipment, or skipping activities, to fit in.",
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
"h": "Practice two lines",
"items": [
"\"I use a wheelchair. It's how I get around.\"",
"\"I don't want to talk about it.\""
],
"say": "Practice two lines together. An easy answer, in your child's own words, like, I use a wheelchair, it's how I get around. And a not-now line, like, I don't want to talk about it. Your child never owes anyone an explanation."
},
{
"k": "card",
"title": "Teasing is bullying.",
"body": "Act quickly. Keep notes. Follow up.",
"say": "Teasing about a disability or a condition is bullying, and it isn't your child's job to fix it. Tell the teacher and the school, keep notes on what happened and when, and follow up until it stops. Ignore it rarely works when it keeps happening."
},
{
"k": "flow",
"h": "Working with school",
"steps": [
[
"Ask your child",
"What helps, what to share"
],
[
"Talk to the teacher",
"Questions and teasing"
],
[
"Plan together",
"A kind class, a safe adult"
]
],
"say": "Work with the school. First ask your child what they'd like shared, and what helps. Then talk with the teacher about the questions kids ask, and about any teasing. Plan together, so the class learns kindly and your child has a safe grown-up to go to.",
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
"title": "Friends who get them.",
"body": "Places where your child is known and welcome.",
"say": "The best protection is belonging. Help your child find a friend or two, and places where they're known and wanted, like a club, a team, or a group of kids who share their experience. One good friend changes how a hard day feels."
},
{
"k": "big",
"h": "Rehearse it together.",
"sub": "Picture the question. Hear their answer.",
"say": "Take a slow breath. Picture a classmate asking your child a question about their body. Now picture your child giving their easy answer, calm and strong, and you smiling at them after.",
"beats": [
"Take a slow breath.",
"Picture a classmate asking your child a question about their body.",
{
"t": "Now picture your child giving their easy answer, calm and strong, and you smiling at them after.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Teasing that continues: the school, right away.",
"say": "Talk with the school right away if teasing keeps happening, gets physical, or spreads online. If your child seems sad, scared to go to school, or withdrawn for more than a couple of weeks, talk with their doctor or the school counselor. And take care of yourself. This one can hurt a parent's heart too."
},
{
"k": "big",
"h": "They belong here.",
"sub": "The full guide has more, whenever you want it.",
"say": "A ready answer, a right to say not now, and grown-ups who act. Your child belongs here, just as they are. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "why-happen",
"ring": "mp-life",
"title": "Big Questions: Why Did This Happen?",
"you": {
"id": "mp-g-why-happen-you",
"guide": "why-happen",
"side": "you",
"title": "Big Questions: Why Did This Happen?",
"sideName": "For You",
"mins": 2,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Big Questions: Why Did This Happen?",
"sub": "For You",
"say": "Maybe you live with a health condition or a disability, or someone in your family does. Maybe you've wondered, why did this happen? This is for you."
},
{
"k": "card",
"title": "Big questions are okay.",
"body": "Asking is a good thing.",
"say": "Why me? Why my family? Is it fair? Those are big questions. Kids ask them, and grown-ups ask them too. Asking is a good thing. You can always bring your questions to a grown-up who loves you."
},
{
"k": "big",
"h": "It is not your fault.",
"sub": "It is not a punishment.",
"say": "Here's something true. It is not your fault. Nothing you did, said, or thought made it happen. And it is not a punishment. Bodies and brains come in lots of different ways, and sometimes people get sick."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Curious",
"Sad",
"Mad",
"Mixed up",
"Okay"
],
"say": "You might feel curious, or sad, or mad that it isn't fair. You might feel mixed up. Or you might feel okay today. Every feeling is allowed, even the mad ones."
},
{
"k": "points",
"h": "Ways families find comfort",
"items": [
[
"Talking",
"With someone who loves you"
],
[
"Quiet",
"Outside, or a cozy spot"
],
[
"Together",
"A song, a prayer, a hug"
]
],
"say": "Families find comfort in lots of ways. Some talk with someone who loves them. Some find a quiet spot, or go outside and look at the sky. Some sing, some pray, and some just hug. You can ask your grown-up what helps your family.",
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
"h": "Hug yourself.",
"sub": "You are loved, just as you are.",
"say": "Let's try something. Wrap your arms around yourself, in a big, gentle hug. Now say, out loud or inside: I am loved, just as I am.",
"beats": [
"Let's try something.",
"Wrap your arms around yourself, in a big, gentle hug.",
{
"t": "Now say, out loud or inside: I am loved, just as I am.",
"w": 8
}
]
},
{
"k": "big",
"h": "You have people with you.",
"sub": "Bring your questions any time.",
"say": "Nobody knows every answer. But you have people to wonder with. Bring them to a grown-up who loves you, any time."
}
]
},
"helper": {
"id": "mp-g-why-happen-helper",
"guide": "why-happen",
"side": "helper",
"title": "Big Questions: Why Did This Happen?",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org (American Academy of Pediatrics)",
"https://www.healthychildren.org"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "maple",
"eyebrow": "When Life Changes",
"h": "Big Questions: Why Did This Happen?",
"sub": "For the Grown-up",
"say": "When a child living with a health condition or disability, or their brother or sister, asks why did this happen, this is for you. It's one of the biggest questions a child can ask, and you don't need every answer to help."
},
{
"k": "big",
"h": "Listen first.",
"sub": "\"What do you think?\"",
"say": "Start by listening. Ask, what do you think? A child's answer often shows what they're really asking. Some are asking, did I cause this? Some are asking, will it get better? Some are asking, does God still love me? Each needs something different."
},
{
"k": "points",
"h": "What this looks like by age",
"items": [
[
"K to 2nd grade",
"Think they caused it"
],
[
"Grades 3 to 5",
"Ask why, and is it fair"
],
[
"Every age",
"Need to hear they are loved"
]
],
"say": "Here's what this can look like. Young children often think they caused what happens around them, and may decide it's a punishment. Older children ask why it happened to them and not others, and whether it's fair. At every age, they need to hear they are loved.",
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
"title": "Say it more than once.",
"body": "Not your fault. Not a punishment.",
"say": "Say this clearly, and more than once, over weeks. It is not your fault. It is not a punishment. Nothing you did, said, or thought made it happen. Young children need to hear it many times before it settles."
},
{
"k": "card",
"title": "\"I don't know. I wonder too.\"",
"body": "Honest, and close.",
"say": "It's okay not to have the answer. I don't know all the answers, I wonder that too sometimes, is honest. Follow it with what you do know: you are loved, and we're in this together. Children can hold not knowing, when they're held."
},
{
"k": "points",
"h": "Faith, if your family has it",
"items": [
[
"A comfort",
"You are loved, you are held"
],
[
"A weight",
"Blame, a test, a punishment"
],
[
"Your words",
"Your tradition, with gentleness"
]
],
"say": "If your family has faith, it can be a deep comfort here, when it says you are loved and you are held. It weighs on a child when it sounds like blame, a test, or a punishment. Answer in your own tradition's words, with gentleness, and never present God as the judge of a child's body.",
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
"h": "Ways to find steadiness",
"items": [
"A prayer or blessing",
"A walk outside",
"A song or a candle",
"Quiet, together"
],
"say": "Offer your family's ways of finding steadiness as an invitation. For some families, a prayer or a blessing. For others, a walk outside, a song, a candle, or quiet time together. A faith leader, a hospital chaplain, or a counselor can help you find words too."
},
{
"k": "big",
"h": "Your own big question.",
"sub": "Notice it. Breathe with it.",
"say": "Take a slow breath. Notice your own big question about your child, the one you carry quietly. Breathe with it for a moment, and let yourself not have to answer it right now.",
"beats": [
"Take a slow breath.",
"Notice your own big question about your child, the one you carry quietly.",
{
"t": "Breathe with it for a moment, and let yourself not have to answer it right now.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to reach out",
"body": "Self-blame or sadness that lasts: their doctor or school counselor.",
"say": "If your child keeps blaming themselves, or sadness or worry lasts more than a couple of weeks, talk with their doctor or the school counselor. A faith leader, chaplain, or child life specialist can help with the big questions too. And bring your own questions to someone you trust."
},
{
"k": "big",
"h": "Loved, and held.",
"sub": "The full guide has more, whenever you want it.",
"say": "Listen first, say it isn't their fault, and stay close in the not knowing. Your child is loved, and held. The full guide has more, whenever you want it."
}
]
}
}
]
};
})();
