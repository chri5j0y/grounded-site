/* =====================================================================
   MAPLE . When Life Changes videos (GWG BLD 727, October 2026)
   Two narrated videos for each Maple guide: For You (the child, grades K to 5) and For the Grown-up
   (the parent or helper beside them). Played by shared/gg-learn.js, which loads this file the first time
   Maple's Learn opens. So far: Inside Me, Close to Home: Loss, and Safety (BLD 727): 18 guides, 36 videos.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld727/source in grounded-workshop:
   edit the data there and rebuild. Proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.maple = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, for the child going through it. For the Grown-up, for the parent or helper beside them. Nothing to finish, and a quiet check marks the ones you have watched.",
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
"mp-safety",
"Safety"
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
"say": "If you've been feeling sad for a while, this is for you. Lots of kids feel sad sometimes. You don't have to feel it all alone."
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
"say": "Clear some time with no rush and no phones. Then try: you've seemed sad lately, and I care about that. Want to tell me about it? If they ask why they feel sad for no reason: sometimes sadness sneaks in even when we can't name why. It's not your fault. If they ask whether they'll always feel this way: no. Feelings change, even the heavy ones. I'm going to help you."
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
"say": "Take a breath. Picture your child on a hard day. Picture sitting close to them, with no rush. Now say, out loud: you've seemed sad lately, and I care about that.",
"beats": [
"Take a breath.",
"Picture your child on a hard day.",
"Picture sitting close to them, with no rush.",
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
"say": "If nighttime feels scary, or you've had bad dreams, this is for you. Lots of kids feel scared at night. You are not the only one."
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
"say": "Before you talk, look at what they watched, heard, or played before bed. Scary shows and the news can follow a child into the dark. Keep bedtime calm, predictable, and screen-free, and at about the same time every night."
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
"say": "If you ever feel different from the other kids, this is for you. Lots of kids feel that way sometimes. You are not alone."
},
{
"k": "big",
"h": "Nobody is exactly like anybody else.",
"sub": "Your differences are part of you.",
"say": "Here is something true. Nobody is exactly like anybody else. Not one person in the whole world. Your differences are part of what makes you, you."
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
"\"Nobody is exactly like anybody else.\"",
"\"You are exactly who you are meant to be.\"",
"\"And you're still growing.\""
],
"say": "If they ask, why am I not like the other kids, you can say, nobody is exactly like anybody else. Your differences are part of what makes you, you, and the right friends will love that. If they ask, is something wrong with me? No. You are exactly who you are meant to be, and you're still growing."
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
"say": "When someone your child loves is dying, this is for you. You may be stretched very thin right now. You don't have to do this perfectly."
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
"say": "If someone you love died by suicide, this is for you. I am so sorry. You are not alone."
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
"say": "If a baby in your family died, this is for you. I am so sorry. This is a sad time, and you are not alone."
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
"say": "You don't have to walk through this alone. Share Pregnancy and Infant Loss Support offers help for whole families. If grief or worry stays heavy, talk with your doctor, your child's pediatrician, or a counselor. Your love holds your child, and holds the baby too."
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
"say": "If someone hurt you, or touched you in a way that is not okay, this is for you. You are not in trouble, and you are not alone."
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
"say": "If you have been hurting your own body on purpose when feelings get too big, this is for you. You are not in trouble, and you are not alone."
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
}
]
};
})();
