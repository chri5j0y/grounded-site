/* =====================================================================
   ASPEN . When Life Changes videos (GWG BLD 724, October 2026)
   Two narrated videos for each Aspen guide: For You (the student, grades 6 to 8) and For the Grown-up
   (the parent or helper beside them). Played by shared/gg-learn.js, which loads this file the first time
   Aspen's Learn opens. So far: Home and Family and Safety (BLD 724): 17 guides, 34 videos.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld724/source in grounded-workshop:
   edit the data there and rebuild. Proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.aspen = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, for the student going through it. For the Grown-up, for the parent or helper beside them. Nothing to finish, and a quiet check marks the ones you have watched.",
"rings": [
[
"as-home",
"Home and Family"
],
[
"as-safety",
"Safety"
]
],
"guides": [
{
"id": "blowup",
"ring": "as-home",
"title": "In the Middle of a Blowup",
"you": {
"id": "as-g-blowup-you",
"guide": "blowup",
"side": "you",
"title": "In the Middle of a Blowup",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Crisis Prevention Institute",
"https://www.crisisprevention.com"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "In the Middle of a Blowup",
"sub": "For You",
"say": "If your anger sometimes gets so big it takes over, this is for you. Maybe you yelled, slammed a door, or said things you didn't mean. You are not a bad kid."
},
{
"k": "big",
"h": "Big feelings can take the wheel.",
"sub": "Part of growing up, not a flaw in you.",
"say": "When a feeling gets really big, it can take the wheel. The part of your brain that slows down and thinks it through goes quiet for a while. That's part of growing up, not a flaw in you."
},
{
"k": "points",
"h": "Notice it building",
"items": [
[
"Your body",
"Hot face, tight fists, fast heart"
],
[
"Your voice",
"Louder and faster"
],
[
"Your thoughts",
"Nobody gets it!"
]
],
"say": "Anger usually builds before it blows. Notice your body: a hot face, tight fists, a fast heart. Notice your voice getting louder and faster. Notice thoughts like, nobody gets it. Those are your early signals."
},
{
"k": "points",
"h": "When you feel it building",
"items": [
[
"Step away",
"Somewhere quieter"
],
[
"Say it",
"\"I need a minute.\""
],
[
"Breathe slow",
"Longer out than in"
]
],
"say": "When you feel it building, step away to somewhere quieter. It's okay to say, I need a minute. Walking away to cool down is a strong move. Then breathe slowly, with your breath out longer than your breath in."
},
{
"k": "big",
"h": "Try it now.",
"sub": "In through your nose. Out slower.",
"say": "Let's try it now. Breathe in through your nose, slowly. Now let it out through your mouth, even slower. Do that two more times, at your own pace.",
"beats": [
"Let's try it now.",
"Breathe in through your nose, slowly.",
"Now let it out through your mouth, even slower.",
{
"t": "Do that two more times, at your own pace.",
"w": 10
}
]
},
{
"k": "card",
"title": "After the storm",
"body": "Come back. Make it right. Make a plan with a grown-up.",
"say": "Later, when you're calm, it's normal to feel embarrassed. Come back anyway, and make it right. Then make a plan with a grown-up you trust, like a parent, a teacher, a coach, or your school counselor: a signal, a place to cool off, and who you can go to."
},
{
"k": "card",
"title": "If it feels like more",
"body": "Tell a grown-up you trust. Not wanting to be alive: call or text 988. Danger now: 911.",
"say": "If something bigger is underneath, like trouble at home or at school, tell a grown-up you trust. If someone is hurting you, or you have thoughts of not wanting to be alive, call or text 988, any time. If someone is in danger right now, call 911."
},
{
"k": "big",
"h": "A blowup is a moment, not who you are.",
"sub": "The full guide has more, whenever you want it.",
"say": "A blowup is a moment. It is not who you are. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-blowup-helper",
"guide": "blowup",
"side": "helper",
"title": "In the Middle of a Blowup",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"Crisis Prevention Institute",
"https://www.crisisprevention.com"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "In the Middle of a Blowup",
"sub": "For the Grown-up",
"say": "When a middle schooler blows up, at home, in class, or on the field, this is for you. Your calm is the most useful tool in the room."
},
{
"k": "big",
"h": "Feeling mode, not a flaw.",
"sub": "Logic lands later. Calm lands now.",
"say": "In a blowup, the feeling part of a young teen's brain is running the show, and the part that weighs consequences has gone quiet. That's normal development, not a character flaw. Logic, threats, and lectures don't land right now. A calm adult does."
},
{
"k": "points",
"h": "Your first move",
"items": [
[
"Slower breath",
"Calm is contagious"
],
[
"Lower voice",
"So is panic"
],
[
"Fewer words",
"One line, then wait"
]
],
"say": "Calm is contagious, and so is panic. So the first move is always your own. Slower breath. Lower voice. Fewer words.",
"cue": {
"at": [
2,
3,
4
]
}
},
{
"k": "story",
"title": "A Lion-Sized Reset",
"lines": [
"My alarm didn't go off, the dog got into the trash, and I left in two different shoes.",
"I parked a little early, rolled down the window, and did Lion's Breath three times.",
"My jaw loosened, my shoulders dropped, and I walked in steady."
],
"lesson": "Reset yourself before you walk in.",
"note": "Names and details changed",
"hold": 2,
"say": "I learned this on a messy morning. My alarm didn't go off, the dog got into the trash, and I walked out the door in two different shoes. A detour added twenty minutes. When I pulled up to my first home visit, my head was spinning. So I parked a little early, rolled down the window, and did Lion's Breath, three times, right there in the front seat. After the third, my jaw loosened, my shoulders dropped, and I started laughing at myself. I walked into that visit steady."
},
{
"k": "big",
"h": "Try a Lion's Breath.",
"sub": "In through the nose. Out with a long haaa.",
"say": "Try it with me now. Take a deep breath in through your nose. Then open your mouth wide, stick out your tongue, and breathe out with a long, loud haaa. Do it once more, and notice your shoulders.",
"beats": [
"Try it with me now.",
"Take a deep breath in through your nose.",
"Then open your mouth wide, stick out your tongue, and breathe out with a long, loud haaa.",
{
"t": "Do it once more, and notice your shoulders.",
"w": 10
}
]
},
{
"k": "points",
"h": "In the moment",
"items": [
[
"Lose the audience",
"Move the others, not them"
],
[
"Stand to the side",
"Hands relaxed, door clear"
],
[
"Two good choices",
"\"Walk with me, or sit here?\""
],
[
"Wait",
"Waiting is doing something"
]
],
"say": "Then lose the audience. Nobody backs down in front of friends, so move the other kids, not the one who is upset. Stand a little to the side, hands relaxed, door clear, and don't touch them unless someone could get hurt. Offer two choices that are both fine with you: want to walk with me, or sit here for a few minutes? Then wait. Waiting is doing something.",
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
"k": "words",
"h": "Words that help",
"items": [
"\"I can see you're really upset.\"",
"\"Take a minute. I'll be right here.\"",
"\"We'll figure this out when things are calmer.\""
],
"say": "Words that help. I can see you're really upset. I'm not going anywhere. Take a minute. I'll be right here. We'll figure this out when things are calmer."
},
{
"k": "points",
"h": "Save for later, or leave out",
"items": [
[
"Matching their volume",
"Or sarcasm"
],
[
"Ultimatums",
"Consequences can wait"
],
[
"An audience",
"No rehashing in front of others"
]
],
"say": "Leave out raising your voice to match theirs, and sarcasm. Save consequences for later, when everyone is calm. And skip rehashing it in front of friends or siblings."
},
{
"k": "flow",
"h": "Later, when they are calm",
"steps": [
[
"Reconnect",
"The relationship still holds"
],
[
"Talk it through",
"What happened right before?"
],
[
"Make it right",
"Repair, together"
],
[
"Plan for next time",
"A signal, a place, a person"
]
],
"say": "Later, maybe an hour or a day, come back to it. Reconnect first. Most kids this age are embarrassed, and repair goes better when they know you're still solid. Ask, that got big. What was going on for you right before it happened? Then make it right together. If blowups are frequent, make a plan: a signal, a place to cool off, and who they can go to.",
"cue": {
"at": [
1,
3,
5,
6
]
}
},
{
"k": "big",
"h": "Your calm is the gift.",
"sub": "The full guide has more, whenever you want it.",
"say": "If blowups keep happening, or seem to be about something bigger, talk with the school counselor. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency. And look after yourself too. Your calm is the gift. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "death",
"ring": "as-home",
"title": "When Someone Dies",
"you": {
"id": "as-g-death-you",
"guide": "death",
"side": "you",
"title": "When Someone Dies",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Dougy Center: Tips for supporting teens who are grieving",
"https://www.dougy.org/assets/uploads/Dougy-Center-Tips-for-Supporting-Teens-Who-are-Grieving.pdf"
],
[
"Dougy Center: Back to school and grief",
"https://www.dougy.org/articles/back-to-school-and-grief-tips-for-parents-caregivers-and-educators"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "When Someone Dies",
"sub": "For You",
"say": "If someone you love has died, this is for you. A grandparent, a parent, a friend, anyone who mattered. I'm so sorry."
},
{
"k": "words",
"h": "There is no right way to feel",
"items": [
"Sad",
"Angry",
"Numb",
"Fine, then not fine"
],
"say": "There's no right way to feel. You might be sad, angry, or numb. You might feel fine one minute and flattened the next. Trouble focusing or sleeping is normal for a while."
},
{
"k": "card",
"title": "You don't have to be strong for anyone.",
"body": "The grown-ups can carry the grown-up jobs.",
"say": "Lots of kids your age hide their sadness to protect the grown-ups, or take on grown-up jobs. You don't have to carry that. You can be sad together."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan's walls were covered in her grandchildren's crayon drawings and school photos.",
"When Drift Away came on, her toes moved on the beat, and she smiled the widest smile.",
"Their drawings were there in the room when she danced."
],
"lesson": "What you make with love is part of the goodbye.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
},
"hold": 2,
"say": "Let me tell you about Suzan. Her walls were covered in crayon drawings and school photos from her grandchildren. More love than skill. Near the end of her life, she hadn't spoken in three days. Then a song called Drift Away came on. Under the sheet, her toes began to move, right on the beat. I sang along and held her hand, and she smiled the widest smile I have ever seen. Her grandchildren's drawings were there in the room with her."
},
{
"k": "points",
"h": "Ways to remember",
"items": [
[
"Say their name",
"And tell stories about them"
],
[
"Make something",
"A drawing, a letter, a playlist"
],
[
"A family way",
"A candle, a prayer, a place outside"
]
],
"say": "There are lots of ways to remember. Say their name, and tell stories about them. Make something: a drawing, a letter, a playlist. Some families light a candle, say a prayer, or visit a special place outside. You get some say in how you remember."
},
{
"k": "big",
"h": "Picture your person.",
"sub": "Then picture who you could tell.",
"say": "Take a slow breath. Picture the person who died. Think of one thing you loved about them. Now picture one grown-up you could tell about it this week.",
"beats": [
"Take a slow breath.",
"Picture the person who died.",
"Think of one thing you loved about them.",
{
"t": "Now picture one grown-up you could tell about it this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "Who to talk to",
"body": "A parent, a relative, a teacher, a coach, your school counselor. Not wanting to be alive: 988.",
"say": "Talk to a grown-up you trust: a parent, a relative, a teacher, a coach, or your school counselor. Laughing with friends again isn't disloyal. If you ever have thoughts of not wanting to be alive, call or text 988, any time."
},
{
"k": "big",
"h": "Missing them is part of loving them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Missing them is part of loving them. Be gentle with yourself today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-death-helper",
"guide": "death",
"side": "helper",
"title": "When Someone Dies",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Dougy Center: Tips for supporting teens who are grieving",
"https://www.dougy.org/assets/uploads/Dougy-Center-Tips-for-Supporting-Teens-Who-are-Grieving.pdf"
],
[
"Dougy Center: Back to school and grief",
"https://www.dougy.org/articles/back-to-school-and-grief-tips-for-parents-caregivers-and-educators"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "When Someone Dies",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is grieving, this is for you. A parent, a grandparent, a friend, a classmate. You don't need perfect words. You need honest ones, and time."
},
{
"k": "big",
"h": "Permanent, and in bursts.",
"sub": "Fine one minute, flattened the next.",
"say": "Kids this age understand that death is permanent. They often grieve in bursts: fine one minute, flattened the next. Many hide it to protect the grown-ups, or quietly take on grown-up jobs, like watching younger siblings. Let them know they don't have to carry that."
},
{
"k": "words",
"h": "Use the real words",
"items": [
"\"Grandma died last night.\"",
"\"Her body stopped working, and it can't start again.\""
],
"sub": "Not sleeping. Not lost.",
"say": "Use the real words: died, and death. Soft words like sleeping or lost confuse kids this age. You might say, Grandma died last night. Her body stopped working, and it can't start again. Then stay, and let them react however they react."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"There's no right way to feel.\"",
"\"You don't have to be strong for me.\"",
"\"We can be sad together.\""
],
"say": "Words that help. There's no right way to feel. Whatever you feel is okay with me. You don't have to be strong for me. We can be sad together. And say the person's name, and share memories. It tells them it's okay to talk. Then let them choose when, without pushing."
},
{
"k": "story",
"title": "Drift Away",
"lines": [
"Suzan's walls were covered in her grandchildren's crayon drawings and school photos.",
"When Drift Away came on, her toes moved on the beat, and she smiled the widest smile.",
"Their drawings were there in the room when she danced."
],
"lesson": "What kids make and give is part of the goodbye.",
"note": "From a Grounded story by Chris Joy",
"link": {
"href": "https://chri5j0y.substack.com/p/drift-away",
"label": "Read the Full Story: Drift Away"
},
"hold": 2,
"say": "I once sat with a woman named Suzan. She hadn't spoken in three days. Her walls were covered in crayon drawings and school photos, the gloriously unhinged art that only grandchildren make. When a song called Drift Away came on, her toes began to move, right on the beat. I sang along and held her hand. She lifted her chin and smiled the widest smile I have ever seen. Her grandchildren will never know she danced that afternoon. But their drawings were there in the room when she did."
},
{
"k": "points",
"h": "Give them some say",
"items": [
[
"The funeral",
"Whether to go, with someone beside them"
],
[
"School",
"What to share, and with whom"
],
[
"Remembering",
"A drawing, a letter, a ritual"
]
],
"say": "Like those drawings, what kids make and give is part of the goodbye. So give them some say. Whether to go to the funeral, with a trusted grown-up beside them. What to share at school. And how to remember: a drawing, a letter, a candle, a prayer if your family prays, or a special place.",
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
"title": "Tell the school counselor.",
"body": "Make a hard day plan together, like a pass to step out of class.",
"say": "Tell the school counselor, and make a simple hard day plan together, like a pass to step out of class. Keep routines, play, and time with friends going. After a friend dies, what teens say they need most is time together with other friends. Joy is not disloyal to the person who died."
},
{
"k": "big",
"h": "Say their name.",
"sub": "Try the first line out loud.",
"say": "Take a breath. Think of the person who died, and one small memory of them. Picture yourself telling that memory to your middle schooler. Try the first line out loud now.",
"beats": [
"Take a breath.",
"Think of the person who died, and one small memory of them.",
"Picture yourself telling that memory to your middle schooler.",
{
"t": "Try the first line out loud now.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Not wanting to be alive: call or text 988. Emergency: 911.",
"say": "You may be grieving the same person, and that's okay. Kids learn how to grieve by watching you, so let them see some of your sadness, and how you lean on your own people. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Stay close. Keep saying their name.",
"sub": "The full guide has more, whenever you want it.",
"say": "Grief comes and goes for a long time. Stay close, keep saying their name, and keep the door open. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sick",
"ring": "as-home",
"title": "A Parent or Grandparent Is Very Sick",
"you": {
"id": "as-g-sick-you",
"guide": "sick",
"side": "you",
"title": "A Parent or Grandparent Is Very Sick",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Dougy Center",
"https://www.dougy.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent or Grandparent Is Very Sick",
"sub": "For You",
"say": "If your parent or grandparent is very sick, this is for you. It's a lot to carry. You don't have to carry it alone."
},
{
"k": "words",
"h": "All of this is normal",
"items": [
"Worried",
"Scared",
"Angry",
"Left out",
"Guilty for having fun"
],
"say": "You might feel worried, scared, or angry. You might feel left out when grown-ups whisper, or guilty for having fun. All of that is normal when someone you love is sick."
},
{
"k": "card",
"title": "You can ask anything.",
"body": "Is it serious? What happens next? What changes at home?",
"say": "You can ask anything, even the scary questions. Is it serious? What happens next? What will change at home? Sometimes the honest answer is, I don't know yet. A good grown-up will tell you when they do."
},
{
"k": "card",
"title": "Your job is still to be a kid.",
"body": "The grown-ups have the hard jobs.",
"say": "Your job is still to be a kid. The grown-ups have the hard jobs. You can still go to practice, hang out with friends, and laugh. If you're being asked to do grown-up jobs, it's okay to tell someone."
},
{
"k": "story",
"title": "Letting Go. Mike's Story",
"lines": [
"Mike's daughter was thirteen. His son was fifteen.",
"We recorded messages for them: advice on bullies, heartbreak, and the old truck.",
"Now they have their dad's voice to play when life gets heavy."
],
"lesson": "Time together counts, in any form.",
"note": "Names and details changed",
"hold": 2,
"say": "Let me tell you about Mike. He was a dad to a girl who was thirteen and a boy who was fifteen. When he was very sick, we recorded messages for them on his phone: advice on bullies and heartbreak, and how to change the oil in the old truck he was fixing up with his son. His kids came in one at a time to talk with him. Now they have voice notes from their dad to play when life gets heavy."
},
{
"k": "points",
"h": "Ways to help, if you want to",
"items": [
[
"Make a card",
"Or a drawing"
],
[
"Visit",
"Or call, or video chat"
],
[
"Record something",
"A voice note or a video"
]
],
"say": "You can choose how to help, if you want to. Make a card or a drawing. Visit, or call, or video chat. Record a voice note, or ask them to record one for you. Small things count."
},
{
"k": "big",
"h": "Picture your grown-up.",
"sub": "Someone you can tell how you really feel.",
"say": "Take a slow breath in, and a long breath out. Picture one grown-up you trust: a parent, a relative, a teacher, a coach, or your school counselor. Now think of one thing you could tell them about how you really feel.",
"beats": [
"Take a slow breath in, and a long breath out.",
"Picture one grown-up you trust: a parent, a relative, a teacher, a coach, or your school counselor.",
{
"t": "Now think of one thing you could tell them about how you really feel.",
"w": 10
}
]
},
{
"k": "big",
"h": "You are not alone in this.",
"sub": "The full guide has more, whenever you want it.",
"say": "Some days will be harder than others. You are not alone in this. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-sick-helper",
"guide": "sick",
"side": "helper",
"title": "A Parent or Grandparent Is Very Sick",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Dougy Center",
"https://www.dougy.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent or Grandparent Is Very Sick",
"sub": "For the Grown-up",
"say": "When a middle schooler's parent or grandparent is very sick, this is for you. You may be the one who is sick, or the one holding things together."
},
{
"k": "big",
"h": "Left out means more worried.",
"sub": "Short, honest updates help.",
"say": "Kids this age can tell when something is wrong. Being left out usually makes them more worried, not less. Short, honest updates help them feel steady: what the illness is, what the doctors are doing, and what will change at home."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"We don't know yet how it will go.\"",
"\"You can ask me anything.\"",
"\"Your job is still to be a kid.\""
],
"say": "Words that help. Grandpa is very sick. The doctors are working hard, and we don't know yet how it will go. You can ask me anything, even the scary questions. And, your job is still to be a kid. The grown-ups have the hard jobs. When you don't know, say so: I don't know yet, and I'll tell you when I do."
},
{
"k": "points",
"h": "Say what stays the same",
"items": [
[
"Who drives them",
"To school and practice"
],
[
"Dinner and bedtime",
"The usual rhythm"
],
[
"Their own life",
"Friends, sports, fun"
]
],
"say": "Say what's staying the same. Who takes them to school and practice. Dinner, and bedtime. Their friends, their sports, and their fun. Keeping some normal life going gives them ground to stand on.",
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
"title": "Helping is good. Caregiving is a grown-up job.",
"body": "Let them choose how to help: a card, a visit, a message.",
"say": "Watch that they don't slide into a caregiver role that belongs to adults. Helping out is good. Being a main caregiver is a grown-up job. Let them choose how to help, like making a card, visiting, or recording a message. And keep the hard surprises out: tell them about big changes before they find out on their own."
},
{
"k": "story",
"title": "Letting Go. Mike's Story",
"lines": [
"\"My boy's fifteen and my girl's thirteen. They still need their dad.\"",
"The kids came in one at a time for private talks with him.",
"Now they have voice notes from their dad to play when life gets heavy."
],
"lesson": "Kids can be part of it, in ways they choose.",
"note": "Names and details changed",
"hold": 2,
"say": "I once sat with a dad named Mike. My boy's fifteen and my girl's thirteen, he told me. They still need their dad. His ex-wife, Sarah, brought in his phone, and we recorded messages together: advice on bullies and heartbreak, and how to change the oil in the old truck he was restoring with his son. We arranged for the kids to come in one at a time for private talks. He told them, I'm not abandoning you. Now his kids have voice notes to play when life gets heavy."
},
{
"k": "big",
"h": "What might they want to make or say?",
"say": "Take a breath. Think of your middle schooler. Picture one way they might want to be part of this, like a card, a visit, or a recorded message. Plan to offer it to them this week.",
"beats": [
"Take a breath.",
"Think of your middle schooler.",
"Picture one way they might want to be part of this, like a card, a visit, or a recorded message.",
{
"t": "Plan to offer it to them this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell the school.",
"body": "Teachers can give some grace. The counselor can be a safe person.",
"say": "Tell the school, so teachers can give some grace. The school counselor can be a safe person during the day. Your hospital or hospice social worker or chaplain can help you find the words. If the illness moves toward dying, Aspen's guide When Someone Dies can help you include them in saying goodbye, in ways they choose."
},
{
"k": "big",
"h": "Look after you, too.",
"say": "You're carrying a lot. Lean on your own people, and take help when it's offered. Your kids are watching how you handle hard things, and that includes asking for help."
},
{
"k": "big",
"h": "Honest words. Steady days. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Honest words, steady routines, and staying close. That's what helps. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "accident",
"ring": "as-home",
"title": "A Car Accident or Sudden Injury",
"you": {
"id": "as-g-accident-you",
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
"CDC HEADS UP",
"https://www.cdc.gov/heads-up/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Car Accident or Sudden Injury",
"sub": "For You",
"say": "If you were in a crash, or someone you love got hurt all of a sudden, this is for you. What you're feeling makes sense."
},
{
"k": "big",
"h": "Your body remembers the scare.",
"sub": "Shaky is normal.",
"say": "A crash or a sudden injury is a big scare, and your body remembers it. You might jump at loud sounds, sleep badly, or keep replaying it. You might feel fine for days, and then suddenly not. All of that is normal, and it usually eases in a few weeks."
},
{
"k": "words",
"h": "Feelings that can show up",
"items": [
"Scared",
"Shaky",
"Angry",
"Numb",
"Worried"
],
"say": "You might feel scared, shaky, angry, or numb. You might worry about the person who got hurt. These feelings don't mean something is wrong with you. They mean something hard happened."
},
{
"k": "card",
"title": "It wasn't your fault.",
"body": "Figuring out what happened is a job for the grown-ups.",
"say": "If your mind keeps asking whose fault it was, here is something true. It wasn't your fault. Figuring out what happened, and everything that comes after, is a job for the grown-ups. Your job is to rest, heal, and let people help you."
},
{
"k": "big",
"h": "Feet on the floor.",
"sub": "Breathe, and look around.",
"say": "Let's try something right now. Put both feet flat on the floor. Breathe in slowly, and let it out even slower. Now look around and name three things you can see.",
"beats": [
"Let's try something right now.",
"Put both feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now look around and name three things you can see.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Keep your routine",
"Meals, sleep, and school"
],
[
"Ask your questions",
"A grown-up can answer honestly"
],
[
"Make something",
"A card or a drawing for them"
],
[
"Ride in small steps",
"Short rides first"
]
],
"say": "A few things can help. Keep your normal routine as much as you can: meals, sleep, and school. Ask your questions. A grown-up you trust can answer them honestly. If someone you love is in the hospital, make something for them, like a card or a drawing. And if riding in a car feels scary, build back in small steps, with short rides first.",
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
"title": "Tell a grown-up you trust.",
"body": "A parent, a coach, a teacher, or your school counselor.",
"say": "Tell a parent or another grown-up you trust if your head hurts more and more, if you throw up, or if you feel confused or very sleepy. Those need a doctor right away. And if the fear or the bad dreams are still strong after a month, tell them too. Your school counselor can help too."
},
{
"k": "big",
"h": "You're safe now.",
"sub": "The shaky feeling eases, one day at a time.",
"say": "You're safe now. The shaky feeling eases, one day at a time, and you don't have to carry it alone."
}
]
},
"helper": {
"id": "as-g-accident-helper",
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
"CDC HEADS UP",
"https://www.cdc.gov/heads-up/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Car Accident or Sudden Injury",
"sub": "For the Grown-up",
"say": "When a middle schooler has been through a crash, or has watched someone they love get suddenly hurt, this is for you. You don't need perfect words. Steady and honest goes a long way."
},
{
"k": "big",
"h": "Fine for days, then not.",
"sub": "Both are normal.",
"say": "Kids this age react in different ways. Some replay the crash, ask detailed questions, or get stuck on who was to blame. Some act fine for days, then fall apart. Both are normal. Jumpiness, sleep trouble, and fear of riding usually ease in a few weeks."
},
{
"k": "points",
"h": "Tell it simply",
"items": [
[
"What happened",
"Plain and honest"
],
[
"Who is helping",
"Doctors, nurses, and family"
],
[
"What happens next",
"Today and this week"
]
],
"say": "Tell them what happened simply and honestly, without graphic details. Tell them who is caring for the person who was hurt. And tell them what happens next, today and this week. Middle schoolers fill silence with worst cases, so plain facts are a kindness.",
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
"\"You're safe now. It makes sense to feel shaky.\"",
"\"It wasn't your fault.\"",
"\"Want to make something for Grandma?\""
],
"say": "Here are words that help. You're safe now. It makes sense to feel shaky. It wasn't your fault. Say that one more than once, because kids this age often blame themselves quietly. And give them a way to help: want to make something for Grandma while she's in the hospital?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Graphic details",
"They replay what they hear"
],
[
"Fault and insurance talk",
"Keep it out of earshot"
],
[
"Pushing them to ride",
"Build back in small steps"
]
],
"say": "Some things are better left out. Graphic details, because kids replay what they hear. Arguments about fault or insurance, so keep those out of earshot. And pushing them to ride right away if they're panicked. Build back in small steps: sit in the parked car, then a drive around the block, then a longer trip.",
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
"title": "Before a hospital visit",
"body": "Describe the room, the machines, and how they may look. Let them choose.",
"say": "If a family member is badly hurt, prepare them before a hospital visit. Describe what the room looks like, the machines and their sounds, and how the person might look. Then let them choose whether to go in. A card at the bedside counts too. If someone died, Aspen's guide When Someone Dies can help with what comes next."
},
{
"k": "card",
"title": "Watch their head and their heart.",
"body": "Worsening headache, vomiting, confusion, or unusual sleepiness: get medical care now.",
"say": "After any crash, watch for concussion signs, even if they seem fine. A worsening headache, vomiting, confusion, or unusual sleepiness needs medical care right away. If fear, nightmares, or avoiding cars lasts more than a month, talk with their doctor. Trauma-focused therapy works well for kids. And let the school counselor know, so teachers can give extra grace."
},
{
"k": "big",
"h": "Say it the way you would to them.",
"say": "Take a moment. Picture the middle schooler you're helping, in the moment it hits them, maybe at bedtime or in the back seat. Now say it quietly, the way you would to them: you're safe now, and it makes sense to feel shaky.",
"beats": [
"Take a moment.",
"Picture the middle schooler you're helping, in the moment it hits them, maybe at bedtime or in the back seat.",
{
"t": "Now say it quietly, the way you would to them: you're safe now, and it makes sense to feel shaky.",
"w": 10
}
]
},
{
"k": "big",
"h": "Steady yourself too.",
"sub": "The scare may still be in you.",
"say": "You may have been in the crash too, or spent long nights at the hospital. The scare can live in your body as well. Rest when you can, say yes to help, and talk with someone you trust. A steady grown-up is one of the best things a shaken kid can have."
},
{
"k": "big",
"h": "Plain facts. Steady routines. Small steps.",
"sub": "The full guide has more, whenever you want it.",
"say": "Plain facts, steady routines, and small steps back. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "divorce",
"ring": "as-home",
"title": "Divorce and Two Homes",
"you": {
"id": "as-g-divorce-you",
"guide": "divorce",
"side": "you",
"title": "Divorce and Two Homes",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org",
"https://www.healthychildren.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Divorce and Two Homes",
"sub": "For You",
"say": "If your parents are divorcing or splitting up, and life is starting to happen in two homes, this is for you."
},
{
"k": "big",
"h": "This is not your fault.",
"sub": "And it's not yours to fix.",
"say": "First, the most important thing. Your parents' divorce is not your fault. It's not yours to fix, either. That's a grown-up job. Nothing you did caused it, and nothing you do needs to repair it."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Sad",
"Angry",
"Relieved",
"Worried",
"All of it"
],
"say": "You might feel sad, angry, or even relieved. You might feel all of it in the same day. Some kids feel embarrassed and aren't sure what to tell their friends. Every one of those feelings makes sense."
},
{
"k": "big",
"h": "You can love both of them.",
"sub": "You never have to pick.",
"say": "You can love both of your parents, out loud. You never have to pick a side or a home. If you get stuck in the middle, like carrying a message, it's okay to say, I'd rather not be in the middle. Can you tell them yourself?"
},
{
"k": "points",
"h": "Good questions to ask",
"items": [
[
"Where will my stuff be?"
],
[
"Will I change schools?"
],
[
"Which home am I in this week?"
]
],
"say": "Lots of kids your age wonder about practical things. Where will my stuff be? Will I change schools? Which home am I in this week? Those are good questions, so ask them. A calendar that shows where you'll be can help. And ask again later, because new questions come up as things change.",
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
"h": "Who can you talk to?",
"sub": "Picture them now.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Now picture one grown-up you can talk to about this: a parent, a grandparent, a coach, or your school counselor. Hold them in your mind, and think of one thing you'd like to ask them.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Now picture one grown-up you can talk to about this: a parent, a grandparent, a coach, or your school counselor.",
{
"t": "Hold them in your mind, and think of one thing you'd like to ask them.",
"w": 10
}
]
},
{
"k": "card",
"title": "If home ever feels scary",
"body": "Tell a grown-up you trust today. Danger right now: 911.",
"say": "If the yelling ever scares you, or someone at home is getting hurt, tell a grown-up you trust today, like a teacher or your school counselor. You won't be in trouble for telling. If someone is in danger right now, call 911."
},
{
"k": "big",
"h": "Your family is changing shape.",
"sub": "Their love for you stays.",
"say": "Your family is changing shape. How you live is changing. How much you're loved is not. You can take this one week at a time."
}
]
},
"helper": {
"id": "as-g-divorce-helper",
"guide": "divorce",
"side": "helper",
"title": "Divorce and Two Homes",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org",
"https://www.healthychildren.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Divorce and Two Homes",
"sub": "For the Grown-up",
"say": "When a middle schooler's parents are divorcing, and life is moving into two homes, this is for you. Whether you're a parent, a grandparent, or another grown-up who loves them, you can help them feel steady."
},
{
"k": "big",
"h": "Changing how we live, not how much we love you.",
"say": "If it's safe, tell them together. Say it plainly: we're changing how our family lives, not how much we love you. And say this too: this is not your fault, and it's not yours to fix."
},
{
"k": "points",
"h": "What helps most",
"items": [
[
"Keep conflict away",
"Out of sight and earshot"
],
[
"Steady routines",
"In both homes"
],
[
"A shared calendar",
"So they know where they'll be"
]
],
"say": "Kids handle divorce best when two things are true. The grown-ups keep conflict away from them. And routines stay steady in both homes. A shared calendar helps a lot, so they always know which home they're in, and where their game, their practice, and their stuff will be.",
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
"h": "Middle schoolers think practically.",
"sub": "Answer the practical questions plainly.",
"say": "Middle schoolers often worry about practical things first. Where will my stuff be? Will I change schools? What do I tell my friends? Answer those plainly. Practical answers are how a kid this age feels safe again."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"You can love both of us.\"",
"\"You never have to pick.\"",
"\"What are you most wondering about?\""
],
"say": "Here are words that help. You can love both of us. You never have to pick. And, what are you most wondering about? Then listen. They may feel angry, relieved, sad, or all three. Let them love both parents out loud."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Carrying messages",
"Talk parent to parent"
],
[
"Criticizing the other parent",
"They hear it as half of them"
],
[
"Choosing a side or a home",
"That choice belongs to adults"
]
],
"say": "Some things are better left out. Using them to carry messages. Talk parent to parent, even when it's hard. Criticizing the other parent in front of them, because kids hear it as being about half of themselves. And asking them to choose a side or a home. That choice belongs to the adults.",
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
"h": "Say it the way you would to them.",
"say": "Let's practice. Say it out loud, the way you would to them. You can love both of us. You never have to pick.",
"beats": [
"Let's practice.",
"Say it out loud, the way you would to them.",
"You can love both of us.",
{
"t": "You never have to pick.",
"w": 10
}
]
},
{
"k": "card",
"title": "Questions come in waves.",
"body": "A move, a new school year, a new partner. Check in again.",
"say": "Check in again later. Questions come in waves as things change: a move, a new school year, a new partner, a holiday split between homes. A short check-in in the car, or over a snack, often opens more than a big talk. If sadness, sleep, or school stays rough for weeks, talk with their doctor or the school counselor."
},
{
"k": "card",
"title": "If there is violence at home",
"body": "National Domestic Violence Hotline: 1-800-799-7233. Danger now: 911.",
"say": "If there is violence at home, safety comes first, for you and for them. The National Domestic Violence Hotline is there at 1-800-799-7233. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "A steady grown-up helps them most.",
"say": "This is your loss too, and it's a lot to carry. Find a friend, a counselor, or a group where you can say the hard things, so your kid doesn't have to hear them. A steady grown-up is what they need most. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "stepfamily",
"ring": "as-home",
"title": "A New Stepfamily",
"you": {
"id": "as-g-stepfamily-you",
"guide": "stepfamily",
"side": "you",
"title": "A New Stepfamily",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Search Institute: Developmental relationships",
"https://searchinstitute.org/developmental-relationships"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A New Stepfamily",
"sub": "For You",
"say": "If your parent has a new partner, or you're suddenly sharing a home with a stepparent or stepsiblings, this is for you."
},
{
"k": "big",
"h": "A win and a loss at the same time.",
"sub": "Both feelings make sense.",
"say": "A new stepfamily can feel like a win and a loss at the same time. You might like the new person and still miss the family you had before. You can feel both. That's normal."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Excited",
"Awkward",
"Left out",
"Annoyed",
"Missing before"
],
"say": "You might feel excited, awkward, or left out. You might be annoyed about sharing a room, or a bathroom, or your parent. You might miss the way things used to be. Every one of those feelings is allowed."
},
{
"k": "card",
"title": "You don't have to love them right away.",
"body": "Being kind is enough for now.",
"say": "Here's something true. You don't have to love them right away. Being kind is enough for now. Families like this grow close over years, not weeks. And you get a say in what you call a stepparent. Talk it over with your parent."
},
{
"k": "points",
"h": "Things that can help",
"items": [
[
"Time with your parent",
"Ask for one-on-one time"
],
[
"An old tradition",
"Keep one you love"
],
[
"Something new",
"Try one thing together"
],
[
"A grown-up to talk to",
"Someone you trust"
]
],
"say": "A few things can help. Ask for one-on-one time with your parent. Your time together still matters. Keep an old tradition you love. Try one new thing together, even something small. And find a grown-up you can talk to about how it's going, like a grandparent, a coach, or your school counselor.",
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
"h": "What do you want to keep?",
"sub": "Picture it.",
"say": "Let's pause. Breathe in slowly, and let it out. Think of one thing from your family before that you'd like to keep, like a meal, a joke, or a Saturday ritual. Now picture telling your parent about it, in your own words.",
"beats": [
"Let's pause.",
"Breathe in slowly, and let it out.",
"Think of one thing from your family before that you'd like to keep, like a meal, a joke, or a Saturday ritual.",
{
"t": "Now picture telling your parent about it, in your own words.",
"w": 10
}
]
},
{
"k": "card",
"title": "If you ever feel unsafe",
"body": "Tell a grown-up you trust today. Childhelp: 1-800-422-4453.",
"say": "If you ever feel unsafe with any adult at home, tell a grown-up you trust today, like a teacher or your school counselor. You can also call Childhelp at 1-800-422-4453. You won't be in trouble for telling. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "Room to grow, one week at a time.",
"sub": "Kind is enough for now.",
"say": "Your family is growing, and so are you. There is room for the old and the new. Kind is enough for now, one week at a time."
}
]
},
"helper": {
"id": "as-g-stepfamily-helper",
"guide": "stepfamily",
"side": "helper",
"title": "A New Stepfamily",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Search Institute: Developmental relationships",
"https://searchinstitute.org/developmental-relationships"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A New Stepfamily",
"sub": "For the Grown-up",
"say": "When a middle schooler is part of a new stepfamily, this is for you, whether you're their parent, their new stepparent, or another grown-up who loves them."
},
{
"k": "big",
"h": "Go slowly.",
"sub": "Blended family bonds grow over years.",
"say": "Go slowly. Blended family bonds grow over years, not weeks. A new stepfamily can feel like a win and a loss at the same time. A child may like the new person and still grieve the family they had. Both feelings are normal."
},
{
"k": "points",
"h": "What helps most",
"items": [
[
"One-on-one time",
"With their own parent"
],
[
"Their choice of names",
"What to call a stepparent"
],
[
"Rules from their parent",
"Early on, at least"
],
[
"Old and new traditions",
"Keep some, build some"
]
],
"say": "A few things help most. Protect one-on-one time between the child and their own parent. Let the child choose what to call a stepparent. Early on, let the biological parent handle discipline. And build a few new traditions together, while you keep a few old ones.",
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
"title": "For the stepparent",
"body": "Start as a friendly, steady adult, not an instant parent.",
"say": "If you're the stepparent, start as a friendly, steady adult, not an instant parent. Show up to the game. Learn what they're into. Ask about it, and remember the answer next time. Trust is built in small, ordinary moments, and a middle schooler notices every one."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Being kind is enough for now.\"",
"\"Our time together still matters to me.\"",
"\"What's been the hardest part?\""
],
"say": "Here are words that help. You don't have to love them right away. Being kind is enough for now. Our time together still matters to me. And, what's been the hardest part? Then listen, even if the answer is hard to hear."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Expecting instant closeness",
"Bonds take years"
],
[
"Forcing family labels",
"Let them choose"
],
[
"Stepparent as main enforcer",
"Not at first"
]
],
"say": "Some things are better left out. Expecting instant closeness, because these bonds take years. Forcing family labels, like brother or Mom, before they're ready. And letting the new stepparent be the main rule enforcer at first. That role can come later, once trust is there.",
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
"h": "Say it the way you would to them.",
"say": "Let's practice. Picture your middle schooler at the end of a long day. Say it out loud, the way you would to them. Our time together still matters to me.",
"beats": [
"Let's practice.",
"Picture your middle schooler at the end of a long day.",
"Say it out loud, the way you would to them.",
{
"t": "Our time together still matters to me.",
"w": 10
}
]
},
{
"k": "card",
"title": "A private place to talk",
"body": "A grandparent, a counselor, or a coach they trust.",
"say": "Give your child a private place to talk about how it's going, someone outside the new household, like a grandparent, the school counselor, or a coach. They may need to say things they can't say at home yet, and that's okay. If sadness, anger, or school trouble lasts, talk with their doctor or a family counselor."
},
{
"k": "card",
"title": "If a child feels unsafe",
"body": "Childhelp: 1-800-422-4453. Danger right now: 911.",
"say": "If a child ever feels unsafe with any adult at home, believe them and act the same day. Childhelp is there at 1-800-422-4453. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Patience is the work.",
"say": "Blending a family is hard work for the grown-ups too. Give yourself the same patience you give them, and talk with a friend or counselor when it gets heavy. Go slowly. Kind is enough for now. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "moving",
"ring": "as-home",
"title": "Moving Away",
"you": {
"id": "as-g-moving-you",
"guide": "moving",
"side": "you",
"title": "Moving Away",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Moving Away",
"sub": "For You",
"say": "If your family is moving, or you just moved, this is for you. Moving is a big change, and you're allowed to have big feelings about it."
},
{
"k": "big",
"h": "Sad and excited can both be true.",
"sub": "Every feeling here makes sense.",
"say": "A move can mean leaving friends, your school, your room, and the places that know you. Even if the move is good news for your family, you might feel sad, nervous, angry, or a little excited. Sometimes all of that shows up in one day. Every one of those feelings makes sense."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Plan your goodbyes",
"Who, where, and how"
],
[
"Make a keep-in-touch plan",
"Calls, messages, visits"
],
[
"Ask for a say",
"Like how to set up your room"
],
[
"Ask about a buddy",
"Someone at the new school"
]
],
"say": "Here are a few things you can do. Plan your goodbyes: who you want to see, and how. Make a plan with your closest friends for staying in touch. Ask for a say in the things that can be yours, like how to set up your new room. And ask if the new school can pair you with a buddy for the first days."
},
{
"k": "big",
"h": "Who do you want to stay close to?",
"say": "Let's take a moment. Think of one friend you most want to stay close to. Picture their face. Now say their name, quietly or out loud, and think of one way you'll stay in touch.",
"beats": [
"Let's take a moment.",
"Think of one friend you most want to stay close to.",
"Picture their face.",
{
"t": "Now say their name, quietly or out loud, and think of one way you'll stay in touch.",
"w": 10
}
]
},
{
"k": "card",
"title": "The first weeks can be hard.",
"body": "That is normal. It usually gets easier, a little at a time.",
"say": "The first weeks in a new place can feel lonely. Lunch might be hard. Weekends might feel too quiet. That's normal, and it usually gets easier a little at a time. Try saying yes to one club, team, or activity, even if you feel shy. That's often where friends start."
},
{
"k": "points",
"h": "Tell someone how it's going",
"items": [
[
"A parent or relative",
"At home"
],
[
"The school counselor",
"At your new school"
],
[
"A teacher or coach",
"Someone you trust"
]
],
"say": "You don't have to carry this by yourself. Tell a grown-up how it's really going: a parent, a relative, a teacher, a coach, or the counselor at your new school. Counselors help new students all the time."
},
{
"k": "big",
"h": "You bring your whole self with you.",
"sub": "Old friends and new ones both count.",
"say": "You're not leaving who you are behind. You bring your whole self with you, and there's room for old friends and new ones."
}
]
},
"helper": {
"id": "as-g-moving-helper",
"guide": "moving",
"side": "helper",
"title": "Moving Away",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Moving Away",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is moving, or just moved, this is for you. A move can be good news for the family and still be a real loss for them."
},
{
"k": "big",
"h": "At this age, friends are everything.",
"sub": "Let them be sad.",
"say": "At this age, friends are everything. A move can mean losing friends, places, teams, and the version of themselves those places knew. Even when the move is good news, the sadness is real. Let them be sad, without rushing to fix it."
},
{
"k": "points",
"h": "Before the move",
"items": [
[
"Tell them early",
"Time to say goodbye"
],
[
"Give real choices",
"Room, goodbyes, keeping in touch"
],
[
"Call the new school",
"Ask about a buddy"
],
[
"Keep routines steady",
"Meals, sleep, family time"
]
],
"say": "Before the move, tell them early, so they have time to say goodbye. Give them real choices: how to set up their room, which goodbye they want, how they'll keep in touch. Call the new school early and ask about a buddy, so someone is watching out for them. And keep routines as steady as you can through the boxes and the chaos."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"It's okay to be sad and excited at the same time.\"",
"\"Who do you most want to stay close to?\"",
"\"What would make the first week easier?\""
],
"say": "Here are words that help. It's okay to be sad and excited at the same time. Who do you most want to stay close to? Let's make a plan. And, what would make the first week easier?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"You'll make new friends fast.\"",
"It skips over the loss"
],
[
"Keeping it secret",
"Until the last minute"
],
[
"Arguing them out of it",
"Let the feeling be there"
]
],
"say": "Some things are better left out. You'll make new friends fast. You may hope so, but it skips over the friends they're losing. Keeping the move a secret until the last minute takes away their goodbyes. And arguing them out of being upset usually makes them hold on tighter."
},
{
"k": "card",
"title": "Watch the first months.",
"body": "Ask about lunch and weekends. Help them find one place to belong.",
"say": "After the move, watch the first few months. Ask about lunch and the weekends, the lonely spots. Help them find one club, team, or activity where they can meet people. If sadness, worry, or anger don't ease with time, or they stop wanting to do much at all, talk with the new school counselor or their doctor."
},
{
"k": "big",
"h": "Picture their first week.",
"say": "Take a moment. Picture your kid walking into the new school on the first day. What is one thing you could do to make that week a little easier? Hold that idea, and plan to do it.",
"beats": [
"Take a moment.",
"Picture your kid walking into the new school on the first day.",
"What is one thing you could do to make that week a little easier?",
{
"t": "Hold that idea, and plan to do it.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your move counts too.",
"sub": "Your own goodbyes matter.",
"say": "You're moving too. You may be leaving friends, work, or a place you loved, all while carrying the plans for everyone. Your goodbyes count. Let a friend help, and talk with someone you trust about your side of it."
},
{
"k": "big",
"h": "Let them be sad. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Let them be sad, and stay close. Home is where they're known, and you help make that true wherever you land. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "money",
"ring": "as-home",
"title": "Money Is Tight",
"you": {
"id": "as-g-money-you",
"guide": "money",
"side": "you",
"title": "Money Is Tight",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Money Is Tight",
"sub": "For You",
"say": "If money is tight in your family right now, this is for you. Lots of families go through seasons like this, and you're not alone in it."
},
{
"k": "big",
"h": "You might notice more than anyone says.",
"sub": "That makes sense.",
"say": "Kids often notice money stress before anyone talks about it. Grown-ups seem tense. Plans change. You might feel worried, embarrassed, frustrated, or even guilty for wanting things. All of that is normal."
},
{
"k": "card",
"title": "Fixing it is not your job.",
"body": "The grown-ups carry the money problems. Your job is to be a kid.",
"say": "Here's something important. Fixing money problems is not your job. That belongs to the grown-ups. Your job is to go to school, see your friends, rest, and be a kid. You can still want things, and it's okay to ask. Sometimes the answer will be not right now, and that isn't about you."
},
{
"k": "points",
"h": "Things that can help",
"items": [
[
"Ask your question",
"A grown-up can answer simply"
],
[
"Find fun that costs little",
"Parks, library, game nights"
],
[
"Tell someone",
"If kids at school say something"
]
],
"say": "A few things can help. If you're worried, ask a grown-up at home your question. They can give you a simple, honest answer. Find fun that costs little or nothing: a park, the library, a game night, a walk with a friend. And if kids at school say something that stings, tell a grown-up at home or the school counselor. You don't have to handle it alone."
},
{
"k": "big",
"h": "One thing you love doing",
"say": "Let's pause for a moment. Take one slow breath in, and let it out. Now think of one thing you love doing that costs little or nothing. Picture yourself doing it this week.",
"beats": [
"Let's pause for a moment.",
"Take one slow breath in, and let it out.",
"Now think of one thing you love doing that costs little or nothing.",
{
"t": "Picture yourself doing it this week.",
"w": 10
}
]
},
{
"k": "points",
"h": "Who you can talk to",
"items": [
[
"A parent or caregiver",
"At home"
],
[
"The school counselor",
"Help that stays kind and quiet"
],
[
"A teacher, coach, or relative",
"Someone you trust"
]
],
"say": "If the worry gets big, talk to someone. A parent or caregiver. The school counselor, who can help in quiet, kind ways. Or a teacher, coach, or relative you trust. Talking about it isn't complaining. It's looking after yourself."
},
{
"k": "big",
"h": "Your worth was never about money.",
"sub": "You are more than what your family has.",
"say": "Families go through tight seasons, and many come out the other side. Your worth was never about money. You are so much more than what your family has."
}
]
},
"helper": {
"id": "as-g-money-helper",
"guide": "money",
"side": "helper",
"title": "Money Is Tight",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Money Is Tight",
"sub": "For the Grown-up",
"say": "If money is tight in your family, and you're helping a middle schooler through it, this is for you. You don't need it all figured out to help them feel steady."
},
{
"k": "big",
"h": "They notice, even when no one says it.",
"sub": "A calm, honest sentence helps more than silence.",
"say": "Kids notice money stress even when grown-ups don't talk about it. They hear the tone of a phone call. They see plans change. Silence leaves them to fill in the blanks, often with something scarier than the truth. A calm, honest sentence helps more."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"We're being careful with money right now.\"",
"\"You're not in trouble, and we're okay.\"",
"\"If kids at school say something, tell me.\""
],
"say": "Here are words that help. We're being careful with money right now. You're not in trouble, and we're okay. Then add what will stay the same, like their school, their friends, and family dinners. And, if kids at school say something, you can come tell me."
},
{
"k": "points",
"h": "Keep these between grown-ups",
"items": [
[
"Debt details",
"And the bills"
],
[
"Your biggest worries",
"Talk them through with adults"
],
[
"Money arguments",
"Out of their earshot"
]
],
"say": "Some things belong between grown-ups. Debt details and bills. Your biggest worries, which deserve a friend, a partner, or a counselor to talk them through. And arguments about money. Keep those out of the kids' earshot when you can. Kids who overhear often start to feel responsible."
},
{
"k": "card",
"title": "It is not their job to fix it.",
"body": "Thank them for their kind heart. Hand the weight back to the grown-ups.",
"say": "Middle schoolers may try to help in ways that cost them. Watch for a kid who stops asking for anything, hides a note about a field trip fee, skips activities they love, or offers you their birthday money. Thank them for their kind heart, and tell them plainly: this is a grown-up job, and we've got it."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Say what stays the same",
"Home, school, people"
],
[
"Make room for fun",
"Parks, library, game nights"
],
[
"Use the help that's there",
"Call or text 211"
],
[
"Talk with the school",
"Quietly, about meals and fees"
]
],
"say": "What helps is often simple. Say what will stay the same. Make room for fun that costs little or nothing: parks, the library, a game night at home. Use the help that's there for food, housing, and bills. You can call or text 211 to find it near you. Using help is wise, not shameful, and you can tell your kid so. And talk quietly with the school counselor about meals, fees, and supplies. Many schools have help ready."
},
{
"k": "words",
"h": "Say it out loud",
"items": [
"\"We're being careful with money right now, and we're okay.\""
],
"sub": "Calm and simple.",
"say": "Let's practice. Picture your kid in front of you. Say this out loud, calmly. We're being careful with money right now, and we're okay.",
"beats": [
"Let's practice.",
"Picture your kid in front of you.",
"Say this out loud, calmly.",
{
"t": "We're being careful with money right now, and we're okay.",
"w": 10
}
]
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Money stress is heavy.",
"say": "Money stress is heavy, and it can bring shame you don't deserve. Talk with someone you trust. Use the help that's there for you, too. When you're steadier, your kid feels it."
},
{
"k": "big",
"h": "Calm and honest is enough.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to hide everything or explain everything. Calm and honest is enough. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "lying",
"ring": "as-home",
"title": "Lying, Sneaking, and Stealing",
"you": {
"id": "as-g-lying-you",
"guide": "lying",
"side": "you",
"title": "Lying, Sneaking, and Stealing",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Lying, Sneaking, and Stealing",
"sub": "For You",
"say": "If you've told a lie, sneaked around, or taken something that wasn't yours, and it's sitting heavy on you, this is for you. You can come back from this."
},
{
"k": "big",
"h": "You are more than one mistake.",
"sub": "A lie is something you did, not who you are.",
"say": "Lots of people your age lie sometimes. Maybe you wanted more privacy. Maybe you were scared of getting in trouble, or of letting someone down. It still matters. And a lie is something you did, not who you are."
},
{
"k": "words",
"h": "It can feel like",
"items": [
"A knot in your stomach",
"Scared of getting caught",
"Embarrassed",
"Stuck"
],
"say": "Keeping a secret like this can feel like a knot in your stomach. You might feel scared, embarrassed, or stuck. Telling the truth is hard, and it often brings real relief."
},
{
"k": "flow",
"h": "How to make it right",
"steps": [
[
"Tell the truth",
"To a grown-up you trust"
],
[
"Own it",
"Plainly, without blaming"
],
[
"Make it right",
"Give back, pay back, or apologize"
],
[
"Rebuild trust",
"Step by step"
]
],
"say": "Here's how to make it right. Tell the truth to a grown-up you trust. Own what you did, plainly. Then make it right: give back what you took, pay it back, or say sorry. Trust comes back step by step, as you keep your word."
},
{
"k": "words",
"h": "Say the first sentence",
"items": [
"\"I need to tell you something, and it's hard to say.\""
],
"sub": "Quietly or out loud.",
"say": "Let's practice the hardest part, the first sentence. Picture a grown-up you trust. Now say this, quietly or out loud. I need to tell you something, and it's hard to say.",
"beats": [
"Let's practice the hardest part, the first sentence.",
"Picture a grown-up you trust.",
"Now say this, quietly or out loud.",
{
"t": "I need to tell you something, and it's hard to say.",
"w": 10
}
]
},
{
"k": "card",
"title": "If something bigger is going on",
"body": "Pressure, a threat, or a secret someone asked you to keep. Tell a grown-up.",
"say": "Sometimes a lie is covering something bigger. Maybe someone is pressuring you, threatening you online, or asking you to keep a secret from your family. Maybe you're worried about money, vaping, or something you're scared to say. Tell a trusted grown-up: a parent, a school counselor, a teacher, or a coach. Telling them about something like that is always the right call."
},
{
"k": "big",
"h": "Honesty is a fresh start.",
"sub": "You can begin again today.",
"say": "Everyone gets things wrong sometimes. Telling the truth is how you start fresh. You can begin again today."
}
]
},
"helper": {
"id": "as-g-lying-helper",
"guide": "lying",
"side": "helper",
"title": "Lying, Sneaking, and Stealing",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Mind Institute",
"https://childmind.org"
],
[
"HealthyChildren.org (AAP)",
"https://www.healthychildren.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Lying, Sneaking, and Stealing",
"sub": "For the Grown-up",
"say": "If you've caught a middle schooler lying, sneaking, or taking something, this is for you. It can feel like a betrayal. It's also very common, and it can be repaired."
},
{
"k": "big",
"h": "Common, and it still matters.",
"sub": "How you respond shapes the next truth.",
"say": "Middle schoolers want more privacy and independence, and lying can be a clumsy way to get it. They also lie to avoid disappointing you. Both are common at this age. It still matters, and how you respond shapes whether they'll be honest next time."
},
{
"k": "flow",
"h": "When you catch a lie",
"steps": [
[
"Calm yourself first",
"Your breath, then your words"
],
[
"Say what you know",
"No trap questions"
],
[
"Lead with the relationship",
"I want us to be honest"
],
[
"A fair consequence",
"And a path back"
]
],
"say": "When you catch a lie, calm yourself first. Then say what you know, instead of setting a trap. Lead with the relationship: I know what happened, and I want us to be able to be honest with each other. Give a fair consequence, and a clear path to rebuild trust, step by step."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm not going to yell. Let's talk about it.\"",
"\"Telling the truth now makes this easier.\"",
"\"How can you make this right?\""
],
"say": "Here are words that help. I know the money was taken. I'm not going to yell. Let's talk about it. Telling the truth now makes this a lot easier. And, how can you make this right?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"Liar\" or \"thief\"",
"Labels stick"
],
[
"Trap questions",
"When you already know"
],
[
"Huge punishments",
"They make lying worth the risk"
]
],
"say": "Some things are better left out. Calling them a liar or a thief. Labels stick, and kids can start to live up to them. Trap questions when you already know the answer. And punishments so big that lying seems worth the risk next time. Make honesty worth it, with a smaller consequence when they tell the truth."
},
{
"k": "card",
"title": "Stealing needs to be made right.",
"body": "Returned, repaid, or apologized for, with you beside them.",
"say": "Stealing needs to be made right. That might mean returning it, paying it back, or apologizing face to face. Go with them if they need you. Making it right teaches more than any lecture, and it lets them set the weight down."
},
{
"k": "points",
"h": "Look underneath",
"items": [
[
"Peer pressure",
"Or covering for a friend"
],
[
"Vaping or drugs",
"Money or things going missing"
],
[
"Online trouble",
"Threats, games, spending"
],
[
"A worry they can't say",
"At home or at school"
]
],
"say": "Then look underneath. Lying, sneaking, or stealing can be tied to peer pressure, vaping or drugs, online trouble, money worries, or a problem they're afraid to tell you about. If money or things go missing along with changes in friends, mood, or sleep, look closer, and see Aspen's guides on vaping and drinking too. Ask, and listen."
},
{
"k": "big",
"h": "Picture the next talk.",
"say": "Take a moment. Picture the next time you talk with your kid about this. Take one slow breath, and hear your voice staying calm. Say the first words to yourself. I'm not going to yell. Let's talk about it.",
"beats": [
"Take a moment.",
"Picture the next time you talk with your kid about this.",
"Take one slow breath, and hear your voice staying calm.",
"Say the first words to yourself.",
"I'm not going to yell.",
{
"t": "Let's talk about it.",
"w": 10
}
]
},
{
"k": "card",
"title": "When it keeps happening",
"body": "Talk with the school counselor or your child's doctor.",
"say": "If lying or stealing keeps happening, talk with the school counselor or your child's doctor. And if what they've been hiding is someone hurting them, stay calm, believe them, and get help that same day. If there's danger right now, call 911."
},
{
"k": "big",
"h": "Trust can be rebuilt.",
"sub": "The full guide has more, whenever you want it.",
"say": "Catching a lie can hurt. Give yourself a moment before you respond, and talk with someone you trust. Trust can be rebuilt, one honest day at a time. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "deployed",
"ring": "as-home",
"title": "A Parent Is Deployed or Far Away",
"you": {
"id": "as-g-deployed-you",
"guide": "deployed",
"side": "you",
"title": "A Parent Is Deployed or Far Away",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Military OneSource: Supporting military children through deployment",
"https://www.militaryonesource.mil/parenting/new-parents/supporting-your-military-children-through-the-deployment-cycle/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent Is Deployed or Far Away",
"sub": "For You",
"say": "If your mom or dad is deployed, or living and working far away for a while, this is for you. Lots of kids your age go through this. You're not the only one."
},
{
"k": "big",
"h": "Missing them is normal.",
"sub": "Feelings can mix.",
"say": "When a parent is far away, you might feel a lot of things at once. All of that is normal. Feelings can mix, and none of them are wrong."
},
{
"k": "points",
"h": "You might feel",
"items": [
[
"Worried",
"About where they are"
],
[
"Proud",
"Of what they do"
],
[
"Angry",
"That they had to go"
],
[
"Fine",
"And that is okay too"
]
],
"say": "You might worry about where they are, and whether they're safe. You might feel proud of them. You might be angry that they had to go, and then feel bad about being angry. And some days you might feel totally fine, and have fun with your friends. It's okay to miss them and still have fun."
},
{
"k": "big",
"h": "Name one feeling.",
"sub": "Hand on your chest. One slow breath.",
"say": "Let's try something. Put a hand on your chest, and take one slow breath. Now name one feeling you've had about your parent being away. Say it quietly, or just in your head.",
"beats": [
"Let's try something.",
"Put a hand on your chest, and take one slow breath.",
"Now name one feeling you've had about your parent being away.",
{
"t": "Say it quietly, or just in your head.",
"w": 10
}
]
},
{
"k": "points",
"h": "Ways to stay close",
"items": [
[
"Send something",
"A photo, a drawing, a note"
],
[
"Keep a list",
"Things to tell them"
],
[
"Keep your routines",
"Practice, homework, dinner"
]
],
"say": "Here are a few ways to stay close. Send them something: a photo, a drawing, or a short message about your day. Keep a list of things you want to tell them, so the next call is easier. And keep your routines going, like practice, homework, and dinner."
},
{
"k": "card",
"title": "You're still the kid.",
"body": "Helping out is kind. Running the house is a grown-up job.",
"say": "You might want to help more around the house, and that's kind. But you are not the man or woman of the house. You're still the kid. The grown-ups handle the grown-up jobs. If it ever feels like it's all on you, tell someone."
},
{
"k": "card",
"title": "Tell a grown-up you trust.",
"body": "A parent, a school counselor, a coach, a teacher, a relative.",
"say": "Pick a grown-up you trust: the parent at home, a school counselor, a coach, a teacher, or a relative. Tell them how it's going, the good days and the hard ones. If the news scares you, talk with them about it. You don't have to figure this out alone."
},
{
"k": "big",
"h": "Missing them shows how much you love them.",
"sub": "One day at a time.",
"say": "Missing them shows how much you love them. Homecoming can take some getting used to, and that's normal too. You can get through this, one day at a time."
}
]
},
"helper": {
"id": "as-g-deployed-helper",
"guide": "deployed",
"side": "helper",
"title": "A Parent Is Deployed or Far Away",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Military OneSource: Supporting military children through deployment",
"https://www.militaryonesource.mil/parenting/new-parents/supporting-your-military-children-through-the-deployment-cycle/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent Is Deployed or Far Away",
"sub": "For the Grown-up",
"say": "When a parent is deployed or working far away, this is for the grown-up at home. Maybe that's you, the parent holding things together, or a grandparent, aunt, or friend helping out. Middle schoolers often feel this more than they show."
},
{
"k": "big",
"h": "Steady days are the gift.",
"say": "Having a parent far away brings worry, pride, and sometimes anger. Some kids take on extra responsibility. Some act out. Both are common. What helps most is a home that stays as predictable as you can make it."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Tell the school",
"Teachers and coaches, ahead of time"
],
[
"Keep routines",
"Meals, bedtimes, practice"
],
[
"Set a rhythm",
"Calls, messages, or letters"
],
[
"A real role",
"Meaningful, not adult"
]
],
"say": "A few things help. Tell teachers and coaches before the deployment starts, so they can watch for a hard week. Keep routines steady: meals, bedtimes, practice. Set a regular rhythm of calls, messages, or letters, whatever the distance allows. And give your kid a meaningful role, like packing a care package, but not an adult one."
},
{
"k": "words",
"h": "Words that help",
"items": [
"It's okay to miss them and still have fun.",
"What would you like to send them this week?",
"You're not the man or woman of the house. You're our kid."
],
"say": "Here are words that help. It's okay to miss them and still have fun. What would you like to send them this week? And this one matters. You are not the man or woman of the house. You're our kid."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Handing them adult jobs",
"War news with no talk",
"\"Be strong for your mom.\""
],
"say": "A few things are best set aside. Handing them adult jobs, even quietly, like being the one who keeps everyone calm. Watching war news together without talking about it. If the news is on, turn toward them and ask what they think. And, be strong for your mom, or your dad. It sounds kind, and it can teach them to hide what they feel."
},
{
"k": "card",
"title": "Homecoming can be bumpy.",
"body": "Everyone has changed a little. Name it ahead of time.",
"say": "Talk about the homecoming before it happens. It's joyful, and it can be bumpy, as everyone adjusts. Your kid has grown. Routines have shifted. The parent coming home has changed too. Naming that ahead of time helps everyone be patient."
},
{
"k": "big",
"h": "What can you keep steady this week?",
"say": "Take a moment. Picture your middle schooler this week. Think of one small, ordinary thing you can keep steady for them, like a Friday dinner or a ride to practice.",
"beats": [
"Take a moment.",
"Picture your middle schooler this week.",
{
"t": "Think of one small, ordinary thing you can keep steady for them, like a Friday dinner or a ride to practice.",
"w": 10
}
]
},
{
"k": "card",
"title": "Watch for more than missing them",
"body": "Lasting sadness, falling grades, pulling away: the school counselor or their doctor. Military OneSource: 800-342-9647, any time.",
"say": "Missing a parent comes and goes. If sadness lasts, grades fall, or your kid pulls away from friends, talk with the school counselor or their doctor. Military families can call Military OneSource any time, at 800 342 9647. If your kid ever talks about not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "points",
"h": "Caring for yourself too",
"items": [
[
"Ask for help",
"Rides, meals, a night off"
],
[
"Find your people",
"Other families who get it"
],
[
"Rest",
"You set the tone at home"
]
],
"say": "Caring for yourself matters too. You may be running the house alone, and worrying at the same time. Ask for help with rides, meals, or a night off. Find other families who understand. And rest when you can. Your steadiness sets the tone at home."
},
{
"k": "big",
"h": "Steady days, honest words.",
"sub": "The full guide has more, whenever you want it.",
"say": "You don't have to make this easy. Steady days and honest words are enough. Your kid is watching how you carry it, and you're doing more than you know. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "baby",
"ring": "as-home",
"title": "A New Baby or Sibling",
"you": {
"id": "as-g-baby-you",
"guide": "baby",
"side": "you",
"title": "A New Baby or Sibling",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org",
"https://www.healthychildren.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A New Baby or Sibling",
"sub": "For You",
"say": "If there's a new baby in your family, or a new brother or sister by adoption, foster care, or a new stepfamily, this is for you. Lots of feelings come with that. Every one of them is allowed."
},
{
"k": "big",
"h": "You can love the baby and still feel left out.",
"say": "You might love the baby and still feel invisible some days. Proud one minute, annoyed the next. Both are normal. Feeling left out doesn't make you a bad big sibling. It means you're noticing a big change."
},
{
"k": "points",
"h": "You might feel",
"items": [
[
"Proud",
"A big sibling now"
],
[
"Annoyed",
"Noise, crying, less sleep"
],
[
"Left out",
"Everyone looks at the baby"
],
[
"Mixed up",
"All of it in one day"
]
],
"say": "You might feel proud. You might feel annoyed by the noise, the crying, or the lost sleep. You might feel left out, when every visitor looks at the baby. And you might feel all of that in one day. It's okay if the baby gets on your nerves."
},
{
"k": "big",
"h": "Name one feeling.",
"sub": "One slow breath first.",
"say": "Let's try something. Take one slow breath in, and let it out slowly. Now name one feeling you've had about the new baby. Say it quietly, or just in your head.",
"beats": [
"Let's try something.",
"Take one slow breath in, and let it out slowly.",
"Now name one feeling you've had about the new baby.",
{
"t": "Say it quietly, or just in your head.",
"w": 10
}
]
},
{
"k": "points",
"h": "Be a big sibling your way",
"items": [
[
"Your own way",
"Jokes, music, reading"
],
[
"Help when you want",
"Saying no is okay too"
],
[
"You're still the kid",
"Grown-ups have the baby"
]
],
"say": "There's no one right way to be a big sibling. You can be the one who makes the baby laugh, plays music, or reads stories. You can help when you want to, and it's okay to say no sometimes. Taking care of the baby is a grown-up job. You can help, and you're still the kid."
},
{
"k": "card",
"title": "Ask for time together.",
"body": "Try: \"Can we do something, just us, this week?\"",
"say": "You still matter just as much. If you miss time with your parent, say so. Try this. Can we do something, just us, this week? A walk, a game, a snack run. Lots of grown-ups are glad when you ask."
},
{
"k": "card",
"title": "Tell a grown-up you trust.",
"body": "A parent, a school counselor, a coach, a teacher, a relative.",
"say": "If you feel sad or invisible for a long time, tell a grown-up you trust: a parent, a relative, a school counselor, a coach, or a teacher. You don't have to keep big feelings to yourself."
},
{
"k": "big",
"h": "There is room for you too.",
"sub": "Your place in your family is still yours.",
"say": "Families can grow, and your place in yours is still yours. There's room for the baby, and there's room for you too."
}
]
},
"helper": {
"id": "as-g-baby-helper",
"guide": "baby",
"side": "helper",
"title": "A New Baby or Sibling",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org",
"https://www.healthychildren.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A New Baby or Sibling",
"sub": "For the Grown-up",
"say": "When a new baby or sibling joins the family, this is for the grown-up helping a middle schooler through it. Maybe you're the parent, a grandparent, or a relative close to the family."
},
{
"k": "big",
"h": "Both feelings are normal.",
"say": "A new baby shifts attention fast. A middle schooler might love the baby and still feel invisible. Name both feelings as normal. They may not say a word about it, and still feel it every day."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"One-on-one time",
"On the calendar, protected"
],
[
"An invitation",
"To help, with room to say no"
],
[
"Their own way",
"To be a big sibling"
],
[
"Their own world",
"Practice, friends, their space"
]
],
"say": "A few things help. Keep one-on-one time on the calendar, and protect it. Even twenty minutes tells them they still matter. Invite them to help with the baby, and let them say no. Let them choose a way to be a big sibling that fits who they are. And keep their own world going: practice, friends, their own space."
},
{
"k": "words",
"h": "Words that help",
"items": [
"You'll always be my first kid in this spot.",
"It's okay if the baby gets on your nerves.",
"Want to pick something we do together this week?"
],
"say": "Here are words that help. You'll always be my first kid in this spot. It's okay if the baby gets on your nerves. And, want to pick something we do together this week?"
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Assuming they will babysit",
"Comparing them to the baby",
"Comparing them to siblings"
],
"say": "A few things are best set aside. Assuming they'll babysit. Helping is a gift when it's offered, and a weight when it's expected. And comparing them, to the baby or to other siblings. Even a joke, like the baby's easier than you, can land hard at this age."
},
{
"k": "story",
"title": "Boundaries and Presence",
"lines": [
"My son spotted us in the bleachers at his band concert and flashed a big smile.",
"I was still half at work. So I unclipped my badge and tucked it into my pocket.",
"For the rest of the concert, I was laughing, clapping, and soaking in his excitement."
],
"lesson": "Being all the way there tells them they matter.",
"note": "Names and details changed",
"hold": 2,
"say": "Here's a moment from my own family. After a full day of work, I rushed straight to my son's middle school band concert. I slipped into the gym as it began, found my wife in the bleachers, and silenced both my phones. My son spotted us and flashed a big smile. As the band launched into the Star Wars theme, I realized I was still half at work. So I unclipped my badge, tucked it into my pocket, took a few deep breaths, and arrived. For the rest of the concert, I was laughing, clapping, and soaking in my son's excitement."
},
{
"k": "big",
"h": "Plan one moment, just the two of you.",
"say": "Take a moment. Picture your middle schooler. Think of one thing, just the two of you, that you could do this week.",
"beats": [
"Take a moment.",
"Picture your middle schooler.",
{
"t": "Think of one thing, just the two of you, that you could do this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "If the hard feelings last",
"body": "Long sadness, pulling away, slipping grades: the school counselor or their doctor.",
"say": "Some grumpiness is normal for a while. If sadness lasts, grades slip, or your kid pulls away from friends, talk with the school counselor or their doctor. If they ever talk about not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "points",
"h": "Caring for yourself too",
"items": [
[
"Rest when you can",
"Short nights, full house"
],
[
"Accept help",
"Meals, rides, a night off"
],
[
"Go easy on yourself",
"Nobody splits time perfectly"
]
],
"say": "Caring for yourself matters too. A new baby means short nights and a full house. Rest when you can, and accept help with meals and rides. Go easy on yourself. Nobody splits their time perfectly. If you feel low for more than a couple of weeks, talk with your doctor."
},
{
"k": "big",
"h": "There is room for them too.",
"sub": "The full guide has more, whenever you want it.",
"say": "A middle schooler with a new baby at home needs moments like that concert: a grown-up who puts the phone away and is all the way there, just for them. Small, steady time says there's room for them too. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "drinking",
"ring": "as-home",
"title": "Someone at Home Drinks or Uses Too Much",
"you": {
"id": "as-g-drinking-you",
"guide": "drinking",
"side": "you",
"title": "Someone at Home Drinks or Uses Too Much",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NACoA: Understanding the Seven Cs",
"https://nacoa.org/understanding-the-seven-cs/"
],
[
"NACoA: Help for teens",
"https://nacoa.org/families/just-4-teens/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Someone at Home Drinks or Uses Too Much",
"sub": "For You",
"say": "If someone at home drinks too much, or uses drugs, this is for you. Maybe it's a parent, a stepparent, a grandparent, or an older brother or sister. You are not the only kid living with this. Not even close."
},
{
"k": "big",
"h": "It's not your fault.",
"sub": "This is a grown-up problem.",
"say": "Here's the most important thing. It's not your fault. Nothing you did caused it. This is a grown-up problem, and it's not your job to fix it."
},
{
"k": "points",
"h": "You might feel",
"items": [
[
"Worried",
"About them, and about home"
],
[
"Embarrassed",
"Around friends"
],
[
"Angry",
"At them, or at everyone"
],
[
"Mixed up",
"Love and hurt together"
]
],
"say": "You might feel worried, about them, and about what home will be like tonight. Embarrassed around friends. Angry. Or mixed up, because you love them and you're hurt at the same time. All of that makes sense."
},
{
"k": "big",
"h": "I didn't cause it. I can't control it. I can't cure it.",
"sub": "But I can take care of myself.",
"say": "Here are words to hold onto. I didn't cause it. I can't control it. I can't cure it. But I can take care of myself. Now say them quietly, in your own voice.",
"beats": [
"Here are words to hold onto.",
"I didn't cause it.",
"I can't control it.",
"I can't cure it.",
"But I can take care of myself.",
{
"t": "Now say them quietly, in your own voice.",
"w": 12
}
]
},
{
"k": "points",
"h": "Taking care of yourself",
"items": [
[
"A safe adult",
"Someone you can always call"
],
[
"A car plan",
"Call instead of riding"
],
[
"Your own life",
"Friends, sports, music"
]
],
"say": "Taking care of yourself looks like this. Know one safe adult you can always call. Have a car plan: if you ever don't feel safe getting in the car with someone, call your safe adult instead. And keep doing your own things, like friends, sports, and music. Your life matters too."
},
{
"k": "card",
"title": "You never have to keep this secret.",
"body": "Tell a parent, a school counselor, a coach, a teacher, a relative. You are not in trouble.",
"say": "You never have to keep this a secret, even if someone asks you to. Telling a grown-up you trust is taking care of yourself, and you are not in trouble. Try the other parent, a relative, a school counselor, a teacher, or a coach. There are groups, like Alateen, for kids exactly like you."
},
{
"k": "card",
"title": "If you are ever not safe",
"body": "Danger right now: call 911. Need to talk: call or text 988, any time.",
"say": "If you ever feel unsafe at home, or someone is hurt, call 911. If you feel really low and need to talk, call or text 988, any time, day or night."
},
{
"k": "big",
"h": "You deserve to feel safe.",
"sub": "You don't have to carry this alone.",
"say": "You deserve to feel safe, and you deserve a life of your own. You didn't cause this, and you don't have to carry it alone."
}
]
},
"helper": {
"id": "as-g-drinking-helper",
"guide": "drinking",
"side": "helper",
"title": "Someone at Home Drinks or Uses Too Much",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NACoA: Understanding the Seven Cs",
"https://nacoa.org/understanding-the-seven-cs/"
],
[
"NACoA: Help for teens",
"https://nacoa.org/families/just-4-teens/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Someone at Home Drinks or Uses Too Much",
"sub": "For the Grown-up",
"say": "When someone at home drinks or uses too much, this is for the grown-up helping a middle schooler through it. Maybe the person drinking is your partner, your ex, or your own parent. Maybe it's you. Wherever you stand, you're here, and that matters."
},
{
"k": "big",
"h": "Not their fault. Not their job.",
"say": "Kids in homes with drinking or drug use often think it's their fault, or their job to fix it. It isn't. Hearing that plainly, from you, is a relief. Say it more than once."
},
{
"k": "words",
"h": "Words that help",
"items": [
"This is a grown-up problem. It's not your fault.",
"You can always call me, any time, and you won't be in trouble.",
"If you ever don't feel safe getting in the car, call me instead."
],
"say": "Here are words that help. This is a grown-up problem. It's not your fault. You can always call me, any time, and you won't be in trouble. And, if you ever don't feel safe getting in the car, call me instead."
},
{
"k": "points",
"h": "Words to hold onto",
"items": [
[
"I didn't cause it."
],
[
"I can't control it."
],
[
"I can't cure it."
],
[
"I can take care of myself."
]
],
"say": "There are simple words kids can hold onto, and they help. I didn't cause it. I can't control it. I can't cure it. But I can take care of myself. Say them together, and let your kid keep them.",
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
"h": "Make a simple plan",
"items": [
[
"One safe adult",
"They can always call"
],
[
"A car plan",
"Call instead of riding"
],
[
"A safe place",
"If home ever feels scary"
]
],
"say": "Make a simple plan together. Name one safe adult they can always call. Make a car plan: if an adult has been drinking or using and is about to drive, they call you instead, and they won't be in trouble. And name a safe place to go, like a neighbor or relative, if home ever feels scary."
},
{
"k": "words",
"h": "Words to set aside",
"items": [
"Covering for an adult",
"Being the peacekeeper",
"Keeping it a secret"
],
"say": "A few things are best set aside. Asking a child to cover for an adult, with an excuse to school or to family. Making them the family peacekeeper, the one who keeps everyone calm. And asking them to keep it a secret. A secret this big is too heavy for a kid."
},
{
"k": "card",
"title": "If it's you",
"body": "Getting help is a gift to your kid. SAMHSA National Helpline: 1-800-662-4357, any time.",
"say": "If you're the one drinking or using, thank you for being here. Getting help is one of the most loving things you can do for your kid. The SAMHSA National Helpline is open any time, at 1 800 662 4357. Your doctor can help too."
},
{
"k": "big",
"h": "Who is their safe adult?",
"say": "Take a moment. Picture your middle schooler. Think of one safe adult they could call any time, and when you'll tell them that person's name.",
"beats": [
"Take a moment.",
"Picture your middle schooler.",
{
"t": "Think of one safe adult they could call any time, and when you'll tell them that person's name.",
"w": 10
}
]
},
{
"k": "card",
"title": "If a child is unsafe",
"body": "Childhelp: 1-800-422-4453. Danger right now: 911.",
"say": "If your kid tells you something hard, stay calm, believe them, and get help the same day. If a child is unsafe or neglected, call Childhelp at 1 800 422 4453, or call 911. And if they ever talk about not wanting to be alive, stay with them and call or text 988."
},
{
"k": "big",
"h": "Not their fault. Not their job.",
"sub": "The full guide has more, whenever you want it.",
"say": "Caring for yourself matters too. Al-Anon is there for grown-ups who love someone who drinks, and Alateen is there for kids. You don't have to fix this today. Keep telling your kid the truth. It's not your fault, and it's not your job. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "jail",
"ring": "as-home",
"title": "A Parent in Jail",
"you": {
"id": "as-g-jail-you",
"guide": "jail",
"side": "you",
"title": "A Parent in Jail",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent in Jail",
"sub": "For You",
"say": "If your mom or dad, or another grown-up who raises you, is in jail or prison, this is for you. Whatever happened, you belong here."
},
{
"k": "words",
"h": "All of this can be true at once",
"items": [
"I miss them.",
"I'm mad at them.",
"I'm embarrassed.",
"I'm worried.",
"I feel relieved."
],
"say": "When a parent goes to jail, kids feel a lot of things, sometimes all in the same day. You might miss them so much it hurts. You might be mad at them. You might feel embarrassed, or worried about what kids at school will think. Some kids even feel relieved. Every one of those feelings is normal."
},
{
"k": "card",
"title": "This is not your fault.",
"body": "Your parent made a grown-up choice. It says nothing about who you are.",
"say": "Here is something true. Your parent made a choice that broke a law. That was a grown-up choice. It is not your fault, and it says nothing about who you are. You can love your parent and be mad at what they did. Both can be true."
},
{
"k": "points",
"h": "Things you get to decide",
"items": [
[
"Who you tell",
"Your story is yours"
],
[
"What you say",
"\"I'd rather not talk about it\" works"
],
[
"How you stay in touch",
"Letters, drawings, calls, visits"
]
],
"say": "You get to decide some things. You decide who you tell. Your story is yours. If someone asks and you'd rather not talk about it, you can say exactly that. And with a grown-up's help, you can stay in touch with letters, drawings, calls, or visits, when they're allowed and safe."
},
{
"k": "big",
"h": "Picture one grown-up you trust.",
"sub": "A parent, a grandparent, a coach, a counselor.",
"say": "Take a slow breath. Now picture one grown-up you trust. It could be a parent, a grandparent, a teacher, a coach, or your school counselor. See their face. Think of one thing you could tell them this week.",
"beats": [
"Take a slow breath.",
"Now picture one grown-up you trust.",
"It could be a parent, a grandparent, a teacher, a coach, or your school counselor.",
"See their face.",
{
"t": "Think of one thing you could tell them this week.",
"w": 10
}
]
},
{
"k": "card",
"title": "The grown-ups have the hard jobs.",
"body": "Court, money, and plans belong to grown-ups. Your job is to be a kid.",
"say": "Home might feel different now. Court, money, and plans are grown-up jobs. Helping out at home is kind, and your main job is still to be a kid: school, friends, sleep, and the things you love. If anyone is hurting you, or you ever feel like you don't want to be alive, tell a grown-up right away. You can call or text 988, any time."
},
{
"k": "big",
"h": "You are still you.",
"sub": "Share this with a grown-up you trust.",
"say": "Your parent's choice is part of your story. It is not the whole of you. You are still you. Share this with a grown-up you trust, so you have company in it."
}
]
},
"helper": {
"id": "as-g-jail-helper",
"guide": "jail",
"side": "helper",
"title": "A Parent in Jail",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Youth.gov: Tip sheet for teachers",
"https://youth.gov/youth-topics/children-of-incarcerated-parents/federal-tools-resources/tip-sheet-teachers"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Parent in Jail",
"sub": "For the Grown-up",
"say": "If you're raising or helping a middle schooler whose parent is in jail or prison, this is for you. You might be a parent, a grandparent, a foster parent, or a teacher. You don't need perfect words. You need honest ones."
},
{
"k": "big",
"h": "Honest and simple helps most.",
"sub": "Secrets make it heavier.",
"say": "Millions of kids have a parent in jail or prison, and many feel it's a secret they aren't allowed to talk about. The secret makes it heavier. Middle schoolers can tell when something is wrong, and cover stories cost trust. Honest, simple words help most: where their parent is, when they can talk, and what happens next."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Dad made a choice that broke a law.\"",
"\"It's okay to love him and be mad at him.\"",
"\"You get to decide who you tell.\""
],
"say": "Here are words that help. Dad made a choice that broke a law, and now he has to be in jail for a while. It's okay to love him and be mad at him. And, you get to decide who you tell. Keep it short, use the name your kid uses for their parent, and add more as they ask."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"He's away at work\"",
"Kids find out, and trust breaks"
],
[
"Putting their parent down",
"Kids hear it as about them"
],
[
"Adult details",
"Charges, court, and money worries"
]
],
"say": "Some things are better left out. Cover stories, like he's away at work. Kids usually find out, and then they wonder what else isn't true. Putting their parent down in front of them. Kids often hear it as being about half of themselves. And adult details: charges, court dates, and money worries belong in grown-up conversations, out of earshot."
},
{
"k": "points",
"h": "What a kid this age may carry",
"items": [
[
"Love and anger",
"Often in the same hour"
],
[
"Worry about school",
"What will friends think?"
],
[
"Extra jobs at home",
"Helping, not parenting"
],
[
"Questions in waves",
"Around visits and holidays"
]
],
"say": "Here's what a middle schooler may be carrying. Love and anger, often in the same hour. Worry about what friends will think, because fitting in matters so much at this age. Extra jobs at home. Helping out is good, and raising younger siblings is too heavy for a kid. And questions that come in waves, around visits, holidays, and court dates. Check in again, even when they seem fine."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Keep routines steady",
"Same bedtime, same rides"
],
[
"Help them stay in touch",
"When it is allowed and safe"
],
[
"Let them choose",
"Who at school knows"
],
[
"Add one steady grown-up",
"A coach, mentor, or relative"
]
],
"say": "What helps. Keep routines steady, like the same bedtime and the same rides to practice. Help them stay in touch when it's allowed and safe, and tell them ahead of time what a visit will be like, including that goodbyes can be hard. Let them choose whether a teacher or the school counselor knows. And help them find one more steady grown-up, like a coach, a mentor, or a relative."
},
{
"k": "big",
"h": "Say your first honest sentence.",
"sub": "Short, true, and kind.",
"say": "Take a moment. Think of the next time this kid asks about their parent. Say your first honest sentence out loud now, in your own words, short and kind.",
"beats": [
"Take a moment.",
"Think of the next time this kid asks about their parent.",
{
"t": "Say your first honest sentence out loud now, in your own words, short and kind.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after you, too.",
"body": "Your grief, anger, and worry deserve support. Thoughts of not wanting to live: 988.",
"say": "This may be heavy for you, too. You may be angry, grieving, or carrying the money and the rides on your own. Talk with someone you trust, or a counselor, so your kid doesn't have to hold your worry. If your kid ever talks about not wanting to be alive, or someone is hurting them, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Honest words. Steady love.",
"sub": "The full guide has more, whenever you want it.",
"say": "Honest words, steady love, and a kid who knows none of this is their fault. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "foster",
"ring": "as-home",
"title": "Foster Care or Adoption",
"you": {
"id": "as-g-foster-you",
"guide": "foster",
"side": "you",
"title": "Foster Care or Adoption",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Foster Care or Adoption",
"sub": "For You",
"say": "If you're in foster care, living with relatives, or you were adopted, this is for you. Families come in a lot of shapes, and yours counts."
},
{
"k": "words",
"h": "Feelings that can show up",
"items": [
"Curious",
"Sad",
"Mad",
"Thankful",
"Mixed up"
],
"say": "Kids in foster care and adoptive families can feel a lot of things. Curious about where you came from. Sad about people you miss. Mad about how things happened. Thankful for the people who love you now. Sometimes all of it at once. Every one of those feelings is normal."
},
{
"k": "card",
"title": "Your story is yours.",
"body": "You decide what to share, and who gets to hear it.",
"say": "Your story is yours. You decide what to share, and who gets to hear it. If a class project asks for baby pictures or a family tree, you can ask your teacher for another way to do it. That's a fair thing to ask."
},
{
"k": "big",
"h": "Big questions are part of growing up.",
"sub": "Who am I? Where did I come from?",
"say": "At your age, lots of kids start wondering who they are. If you're adopted or in foster care, that can bring big questions. Where did I come from? Why did this happen? Do they think about me? Asking is normal and healthy. And you can love more than one family."
},
{
"k": "big",
"h": "Name one feeling.",
"sub": "Quietly, in one word.",
"say": "Let's take a slow breath together. In, and out. Now notice what you're feeling right now. Name it, quietly, in one word.",
"beats": [
"Let's take a slow breath together.",
"In, and out.",
"Now notice what you're feeling right now.",
{
"t": "Name it, quietly, in one word.",
"w": 10
}
]
},
{
"k": "points",
"h": "Who you can talk to",
"items": [
[
"A parent or caregiver",
"The grown-ups you live with"
],
[
"Your caseworker",
"If you are in foster care"
],
[
"Your school counselor",
"Someone right at school"
]
],
"say": "You can bring your questions and feelings to a grown-up. A parent or caregiver you live with. Your caseworker, if you're in foster care. Or your school counselor. If anyone is ever hurting you, tell one of them right away. You won't be in trouble for telling. And if you ever feel like you don't want to be alive, call or text 988, any time."
},
{
"k": "big",
"h": "Your story is still being written.",
"sub": "Share it with a grown-up you trust.",
"say": "Where you started is part of your story. It isn't all of it. Your story is still being written. Share it with a grown-up you trust, a little at a time."
}
]
},
"helper": {
"id": "as-g-foster-helper",
"guide": "foster",
"side": "helper",
"title": "Foster Care or Adoption",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Child Welfare Information Gateway: The impact of adoption",
"https://www.childwelfare.gov/resources/impact-adoption"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Foster Care or Adoption",
"sub": "For the Grown-up",
"say": "If you're a foster parent, an adoptive parent, a relative raising a child, or a teacher, and you're helping a middle schooler in foster care or adoption, this is for you."
},
{
"k": "big",
"h": "New questions are growth.",
"sub": "Not rejection.",
"say": "Adoption and foster care carry lifelong themes, like loss and identity. They often come back in middle school, when kids start asking who they are. A kid who seemed settled about their story at eight may have hard questions at twelve. New questions are not rejection. They're growth."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Your story is yours.\"",
"\"You can ask me anything about where you came from.\"",
"\"Loving your birth family takes nothing from us.\""
],
"say": "Here are words that help. Your story is yours. You decide what to share. You can ask me anything about where you came from. And, loving your birth family doesn't take anything away from us. Answer honestly, at their level, and it's okay to say, I don't know, and I'll help you find out."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Putting down birth parents",
"Kids hear it as about them"
],
[
"Sharing their story",
"It is theirs to tell"
],
[
"\"You should be grateful\"",
"Thanks and grief can live together"
]
],
"say": "Some things are better left out. Putting down birth parents. Kids often hear it as being about themselves. Sharing their story with other grown-ups without asking them first. And lines like, you should be grateful. A kid can be thankful and grieving at the same time."
},
{
"k": "points",
"h": "What a kid this age may carry",
"items": [
[
"Loss",
"Even of people they barely knew"
],
[
"Loyalty",
"Love for more than one family"
],
[
"Testing",
"Will you still be here?"
],
[
"Big reactions",
"Old hurts can echo"
]
],
"say": "Here's what a middle schooler may be carrying. Loss, even of people they barely knew. Loyalty to more than one family. Some testing, as if to ask, will you still be here? And big reactions. Many kids in foster care have lived through hard things, so a small stress today can echo an old hurt. Steady routines and patient grown-ups help a lot."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Keep routines steady",
"Meals, bedtime, rides"
],
[
"Keep safe connections",
"To birth family, when possible"
],
[
"Talk with the school",
"Projects and privacy"
],
[
"Get support",
"Families who understand"
]
],
"say": "What helps. Keep routines steady and predictable. Keep safe connections to birth family when possible, like letters, photos, or visits. Talk with the school about projects that assume one kind of family, like a family tree or baby photos, and about who needs to know. And find support for yourself, from other foster, adoptive, and kinship families."
},
{
"k": "big",
"h": "Say the welcome out loud.",
"sub": "You can ask me anything.",
"say": "Take a moment. Picture this kid asking about their birth family. Say out loud, you can ask me anything about where you came from.",
"beats": [
"Take a moment.",
"Picture this kid asking about their birth family.",
{
"t": "Say out loud, you can ask me anything about where you came from.",
"w": 10
}
]
},
{
"k": "card",
"title": "If they tell you something hard",
"body": "Stay calm. Believe them. Get help the same day. Not wanting to live: 988.",
"say": "If they tell you someone hurt them, stay calm, believe them, and get help the same day, through their caseworker or child protection, or 911 if they're in danger. If they talk about not wanting to be alive, stay with them and call or text 988. And look after yourself too. Patience runs on rest and support."
},
{
"k": "big",
"h": "Steady through every question.",
"sub": "The full guide has more, whenever you want it.",
"say": "Steady through every question, and room for every family they love. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pet",
"ring": "as-home",
"title": "A Pet Dies",
"you": {
"id": "as-g-pet-you",
"guide": "pet",
"side": "you",
"title": "A Pet Dies",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Pet Dies",
"sub": "For You",
"say": "If your pet died, this is for you. A dog, a cat, a horse, a hamster, a lizard. If you loved them, this loss is real."
},
{
"k": "big",
"h": "Missing them this much makes sense.",
"sub": "They were family.",
"say": "For a lot of kids, a pet is a best friend. They were there every day, and they were always glad to see you. So when a pet dies, it can be your first big loss. It makes sense to miss them this much. What they meant to you is real."
},
{
"k": "words",
"h": "Feelings that can show up",
"items": [
"Sad",
"Lonely",
"Mad",
"Guilty",
"Numb"
],
"say": "You might feel sad, or lonely when you walk in the door. You might feel mad, or guilty, wondering if you should have noticed something sooner. Pets get sick and old, and it is not your fault. Some kids feel numb at first. Grief comes and goes. You can cry in the morning and laugh at lunch. All of that is normal."
},
{
"k": "card",
"title": "If the vet helped them die",
"body": "A vet can help a very sick pet die gently, without pain.",
"say": "If the vet helped your pet die, here's what that means. When a pet is very sick or hurting, a vet can help them die gently, without pain. People sometimes call it put to sleep, but it isn't like your sleep at all. It was gentle, and the hurting stopped."
},
{
"k": "big",
"h": "Remember one good moment.",
"sub": "Something that made you smile.",
"say": "Close your eyes if you want to. Take a slow breath. Picture your pet on a really good day. Remember one thing they did that made you smile.",
"beats": [
"Close your eyes if you want to.",
"Take a slow breath.",
"Picture your pet on a really good day.",
{
"t": "Remember one thing they did that made you smile.",
"w": 10
}
]
},
{
"k": "points",
"h": "Ways to say goodbye",
"items": [
[
"Draw or write",
"A picture, or a letter to them"
],
[
"Make a memory box",
"A collar, a photo, a toy"
],
[
"Hold a goodbye",
"A burial, a candle, a story"
]
],
"say": "Saying goodbye can help. Draw a picture, or write a letter to them. Make a memory box with a collar, a photo, or a favorite toy. Hold a small goodbye with your family, like a burial, a candle, a prayer, a flower, or telling stories. And tell a grown-up how you're doing, like a parent, a teacher, or your school counselor."
},
{
"k": "big",
"h": "Love like that stays with you.",
"sub": "Share a story about them today.",
"say": "You loved them, and they loved you. Love like that stays with you. Share a favorite story about them with someone today."
}
]
},
"helper": {
"id": "as-g-pet-helper",
"guide": "pet",
"side": "helper",
"title": "A Pet Dies",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"dougy"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Pet Dies",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler whose pet has died, this is for you. You might be a parent, a grandparent, a teacher, or a coach. Take this loss as seriously as they do."
},
{
"k": "big",
"h": "Often a first real grief.",
"sub": "Honest words, memories, and time.",
"say": "For many kids, a pet is a best friend, and its death is their first real grief. A middle schooler may shrug it off in front of friends, then fall apart at bedtime. Take it seriously. The same things help as with any loss: honest words, memories, and time."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"The vet helped Max die peacefully.\"",
"\"What's your favorite memory of her?\"",
"\"It makes sense to miss him this much.\""
],
"say": "Here are words that help. The vet helped Max die peacefully so he wouldn't hurt anymore. What's your favorite memory of her? It makes sense to miss him this much. Use the real words, died and death. Put to sleep can make some kids afraid of sleep."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"It was just a dog\"",
"It shrinks a real loss"
],
[
"Replacing the pet right away",
"Grief needs its own time"
],
[
"Cover stories",
"Like \"he went to a farm\""
]
],
"say": "Some things are better left out. Saying it was just a dog. To them, it was family. Replacing the pet right away. A new pet can be wonderful later, and grief needs its own time first. And cover stories, like he went to live on a farm. Kids this age usually find out, and then they're grieving and confused."
},
{
"k": "points",
"h": "What grief can look like",
"items": [
[
"Quiet",
"Fine in public, sad at home"
],
[
"Guilt",
"Should I have noticed?"
],
[
"Big questions",
"Where is she now?"
],
[
"Older losses",
"A pet can stir earlier grief"
]
],
"say": "Grief at this age can look like a lot of things. Quiet: fine in public, sad at home. Guilt: should I have noticed sooner? Tell them plainly that it isn't their fault. Big questions, like where is she now? Start from what your family believes, and ask what they imagine. And sometimes a pet's death stirs up an earlier loss, like a grandparent who died."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Hold a small goodbye",
"A drawing, a story, a burial"
],
[
"Keep memories in view",
"A photo, the collar"
],
[
"Tell the school",
"If your kid is okay with it"
],
[
"Give it time",
"Grief comes in waves"
]
],
"say": "What helps. Hold a small goodbye together: a drawing, a story, a burial, a candle, or a prayer if that fits your family. Keep memories in view, like a photo or the collar. Let a teacher or the school counselor know, if your kid is okay with it. And give it time. Grief comes in waves, sometimes weeks later."
},
{
"k": "big",
"h": "Bring a story to dinner.",
"sub": "Then ask for theirs.",
"say": "Take a moment. Think of a story about this pet that makes you smile. Plan to tell it to your kid tonight, and then ask for theirs.",
"beats": [
"Take a moment.",
"Think of a story about this pet that makes you smile.",
{
"t": "Plan to tell it to your kid tonight, and then ask for theirs.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after you, too.",
"body": "You may be grieving too. Letting them see it shows sadness is safe.",
"say": "You may be grieving too, and that's okay. Letting your kid see you miss the pet shows them sadness is safe in your home. If their sadness doesn't lift, or gets in the way of school, sleep, or friends, talk with their doctor or the school counselor. If they ever talk about not wanting to be alive, stay with them and call or text 988."
},
{
"k": "big",
"h": "Take this loss seriously.",
"sub": "The full guide has more, whenever you want it.",
"say": "Honest words, a small goodbye, and time. Take this loss as seriously as they do. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "selfharm",
"ring": "as-safety",
"title": "Self-Harm and Cutting",
"you": {
"id": "as-g-selfharm-you",
"guide": "selfharm",
"side": "you",
"title": "Self-Harm and Cutting",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Cornell Self-Injury and Recovery Resources",
"https://selfinjury.bctr.cornell.edu"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Self-Harm and Cutting",
"sub": "For You",
"say": "If you have been hurting yourself on purpose when feelings get too big, this is for you. You are not in trouble, and you are not alone."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Badly hurt or in danger: call 911. Call or text 988, or text HOME to 741741.",
"say": "First, where to get help right now. If you are badly hurt or in danger, get a grown-up and call 911. Any time, you can call or text 988, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "You are not in trouble.",
"sub": "You deserve help, not punishment.",
"say": "A lot of kids your age hurt themselves to get through feelings that feel too big. It usually happens in secret, with a lot of shame. You are not bad, and you are not in trouble. You deserve help."
},
{
"k": "big",
"h": "This feeling will pass.",
"say": "If a hard feeling is here right now, let's slow down together. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. This feeling will pass, even if it doesn't feel like it.",
"beats": [
"If a hard feeling is here right now, let's slow down together.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "This feeling will pass, even if it doesn't feel like it.",
"w": 9
}
]
},
{
"k": "points",
"h": "Try this instead",
"items": [
[
"Go where people are",
"Leave the room you are in"
],
[
"Call or text someone",
"A grown-up, or 988"
],
[
"Move or breathe",
"Walk, stretch, breathe slow"
],
[
"Write or draw it",
"Put the feeling on paper"
]
],
"say": "Try these when a feeling gets big. Go where people are. Call or text someone. Move your body, or breathe slowly. Write or draw what you feel.",
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
"h": "Tell a trusted grown-up today",
"items": [
"I've been hurting myself, and I need help."
],
"sub": "A parent, a counselor, a teacher, a coach.",
"say": "Tell a trusted grown-up, today. A parent, a school counselor, a teacher, a coach, or a relative. You can borrow these words. I've been hurting myself, and I need help. Stopping can take a while, and you don't have to do it alone."
},
{
"k": "big",
"h": "Telling is how friends help.",
"sub": "Tell a grown-up, every time.",
"say": "And if a friend ever tells you they might hurt themselves, you never keep that secret. Tell a grown-up right away. That is how a real friend helps."
},
{
"k": "big",
"h": "Reaching out is brave.",
"sub": "988: call or text. Danger right now: 911.",
"say": "Reaching out is brave. Tell someone today. Call or text 988 any time, or text HOME to 741741. If you are badly hurt or in danger, call 911. You matter."
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
"id": "as-g-selfharm-helper",
"guide": "selfharm",
"side": "helper",
"title": "Self-Harm and Cutting",
"sideName": "For the Grown-up",
"mins": 3,
"sources": [
"dazzi",
[
"Cornell Self-Injury and Recovery Resources",
"https://selfinjury.bctr.cornell.edu"
],
[
"Child Mind Institute",
"https://childmind.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Self-Harm and Cutting",
"sub": "For the Grown-up",
"say": "If you have just learned that a middle schooler you love is hurting themselves, this is for you. It is frightening, and you can help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Serious injury or danger right now: call 911. Thoughts of suicide: call or text 988 together.",
"say": "First, help right now. For a serious injury, or if your child is in danger right now, call 911. If they are thinking about suicide, call or text 988 together, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "How you react decides whether they tell you again. Steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"How you react decides whether they tell you again.",
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
"h": "A way through feelings too big to hold.",
"say": "Self-harm often starts in the middle school years. Most kids describe it as a way to get through feelings that feel too big. It usually happens in secret, with a lot of shame. Self-harm and suicide are different, but they can overlap."
},
{
"k": "words",
"h": "Words that help",
"items": [
"I noticed the marks. You're not in trouble.",
"What was happening right before?",
"You don't have to stop alone."
],
"say": "Start gently. I noticed the marks. You're not in trouble. I want to understand. Later, ask, what was happening right before? And tell them, you don't have to stop alone. We'll get help together."
},
{
"k": "big",
"h": "Ask directly.",
"sub": "Are you thinking about killing yourself?",
"say": "Then ask plainly, in a calm voice. Are you thinking about killing yourself? Asking is safe. It does not put the idea in their head. If they say yes, call or text 988 together, right then."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Yelling or punishing"
],
[
"Demanding a promise to stop"
],
[
"Calling it attention-seeking"
],
[
"Telling friends or siblings"
]
],
"say": "Some things close the door. Yelling or punishing. Demanding a promise to stop. Calling it attention-seeking. Telling their friends or siblings. Patience keeps the door open.",
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
"h": "What helps",
"items": [
[
"Care for wounds calmly",
"Without a fuss"
],
[
"A doctor or counselor",
"Seen this week"
],
[
"Put away sharp things, medicines",
"Calmly, as safety"
],
[
"Short, steady check-ins",
"And time together"
]
],
"say": "Here's what helps. Help care for wounds without a fuss. Get them seen this week by their doctor or a counselor. Put away sharp things and medicines calmly, as safety, not punishment. And keep the door open with short check-ins and time together. Stopping often takes a while, and setbacks are part of it.",
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
"say": "This is a lot to carry. Get support for yourself too, from a counselor or a trusted friend, and let the school counselor know. Call or text 988 any time, for them or for you. Your steady love helps."
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
"id": "friendhurting",
"ring": "as-safety",
"title": "When a Friend Is Hurting",
"you": {
"id": "as-g-friendhurting-you",
"guide": "friendhurting",
"side": "you",
"title": "When a Friend Is Hurting",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "When a Friend Is Hurting",
"sub": "For You",
"say": "If a friend has told you they are hurting, or that they might hurt themselves, this is for you. You did a kind thing by listening."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Friend in danger right now: get a grown-up and call 911. Call or text 988, or text HOME to 741741.",
"say": "First, help right now. If your friend is in danger right now, get a grown-up and call 911. Any time, you or your friend can call or text 988, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Telling gets someone help.",
"sub": "Snitching gets someone in trouble.",
"say": "Maybe your friend asked you to keep it a secret. Maybe you're afraid they'll be mad at you. Here's the truth. Snitching gets someone in trouble. Telling gets someone help. If a friend tells you they might hurt themselves, you never keep that secret."
},
{
"k": "big",
"h": "Picture one grown-up you trust.",
"say": "This is a lot to hold. Let's take a breath together. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Now picture one grown-up you trust.",
"beats": [
"This is a lot to hold.",
"Let's take a breath together.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now picture one grown-up you trust.",
"w": 10
}
]
},
{
"k": "flow",
"h": "Three steps",
"steps": [
[
"Listen",
"You don't have to fix it"
],
[
"No secret promises",
"Say you care too much"
],
[
"Tell a grown-up today",
"A parent, counselor, or teacher"
]
],
"say": "Here are three steps. Listen. You don't have to fix it or find perfect words. Don't promise to keep it secret. You can say, I care about you too much to keep this to myself. And tell a trusted grown-up today. A parent, a school counselor, a teacher, or a coach.",
"cue": {
"at": [
1,
3,
5
]
}
},
{
"k": "big",
"h": "You are not in trouble.",
"sub": "You did the right thing.",
"say": "When you tell, you are not in trouble. You did the right thing. Now let the grown-ups help. Keeping your friend safe is a grown-up job, and you don't have to carry it alone."
},
{
"k": "big",
"h": "A real friend tells.",
"sub": "988: call or text. Danger right now: 911.",
"say": "It's okay to feel scared, sad, or worried about your friend. Tell your grown-up how you're feeling too. A real friend tells. Call or text 988 any time, or text HOME to 741741. If someone is in danger, call 911."
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
"id": "as-g-friendhurting-helper",
"guide": "friendhurting",
"side": "helper",
"title": "When a Friend Is Hurting",
"sideName": "For the Grown-up",
"mins": 3,
"sources": [
"dazzi",
[
"NIMH: Ask Suicide-Screening Questions toolkit",
"https://sprc.org/wp-content/uploads/2022/12/asQToolkit_0-1.pdf"
],
[
"AAP: Screening for suicide risk",
"https://www.aap.org/en/patient-care/blueprint-for-youth-suicide-prevention/strategies-for-clinical-settings-for-youth-suicide-prevention/screening-for-suicide-risk-in-clinical-practice/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "When a Friend Is Hurting",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is carrying a friend's heavy secret, or might someday, this is for you. You can help both of them."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Danger right now: call 911. If it's urgent, call or text 988 together.",
"say": "First, help right now. If anyone is in danger right now, call 911. If it's urgent, call or text 988 together with your child. You can also text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "Your calm makes it safe for your child to keep telling you things. Steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"Your calm makes it safe for your child to keep telling you things.",
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
"h": "Kids carry heavy secrets.",
"say": "Middle schoolers often carry friends' secrets, including self-harm or thoughts of dying. They're afraid of betraying a friend. Carrying that alone is too heavy for any kid."
},
{
"k": "words",
"h": "Give them clear words",
"items": [
"Snitching gets someone in trouble.",
"Telling gets someone help.",
"Telling a grown-up is being a good friend."
],
"say": "Give your child clear words and permission, before they ever need them. Snitching gets someone in trouble. Telling gets someone help. Telling a grown-up is being a good friend. Say it at dinner, or in the car, so it's familiar when it counts."
},
{
"k": "flow",
"h": "Teach three steps",
"steps": [
[
"Listen",
"No need to fix it"
],
[
"No secret promises",
"Safety comes first"
],
[
"Tell a grown-up today",
"You, or another they trust"
]
],
"say": "Then teach three steps. Listen. Don't promise secrecy. Tell a trusted grown-up today. And if it's urgent, call or text 988 together. Practice the words, too. I care about you too much to keep this to myself.",
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
"h": "Asking directly is safe.",
"sub": "Are you thinking about killing yourself?",
"say": "If you talk with the friend, or your own child seems weighed down, ask plainly. Are you thinking about killing yourself? Asking kids about suicide is safe and important. Talking about it doesn't put the idea in their head."
},
{
"k": "words",
"h": "When your child tells you",
"items": [
"You did the right thing.",
"Now let the grown-ups help.",
"How are you doing with all of this?"
],
"say": "When your child tells you, say, you did the right thing. Now let the grown-ups help. Then reach the friend's parents or the school counselor that same day. Keep your child out of trouble for telling, always. Later, ask, how are you doing with all of this?"
},
{
"k": "big",
"h": "Not the only support.",
"sub": "That job belongs to grown-ups.",
"say": "Make sure your child isn't their friend's only support. That job belongs to grown-ups. Look after yourself too. Call or text 988 any time, for any of you. Your calm helps two kids at once."
}
],
"crisis": [
"988: call or text, any time",
"Text HOME to 741741",
"911: danger right now"
],
"music": "safety"
}
}
]
};
})();
