/* =====================================================================
   ASPEN . When Life Changes videos (GWG BLD 724 to 726, October 2026)
   Two narrated videos for each Aspen guide: For You (the student, grades 6 to 8) and For the Grown-up
   (the parent or helper beside them). Played by shared/gg-learn.js, which loads this file the first time
   Aspen's Learn opens. So far: Home and Family and Safety (BLD 724), Friends and School and Big World, Hard News (BLD 725), Growing Up and Online (BLD 726): all 49 guides, 98 videos. Health and Ability (GWG BLD 757, HA 2, from patches/bld757/source/A): 9 guides, 18 videos, 58 guides in all.
   Each video: {id, guide, side, title, sideName, mins, sources, scenes}. Scene kinds and cue timing are
   the same as shared/learn-lessons.js. Generated from patches/bld726/source (bld724 and bld725 source for the earlier groups) in grounded-workshop:
   edit the data there and rebuild. Proofreading lines are in the Founder library.
   ===================================================================== */
(function(){
window.GG_LEARN_GUIDES = window.GG_LEARN_GUIDES || {};
window.GG_LEARN_GUIDES.aspen = {
"title": "When Life Changes",
"intro": "Two short videos for every guide. For You, for the student going through it. For the Grown-up, for the parent or helper beside them. Watch at your own pace, and a quiet check marks the ones you have watched.",
"rings": [
[
"as-home",
"Home and Family"
],
[
"as-school",
"Friends and School"
],
[
"as-growing",
"Growing Up and Online"
],
[
"as-world",
"Big World, Hard News"
],
[
"as-safety",
"Safety"
],
[
"life",
"Health and Ability"
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
"h": "Every feeling is welcome",
"items": [
"Sad",
"Angry",
"Numb",
"Fine, then not fine"
],
"say": "Every feeling is welcome. You might be sad, angry, or numb. You might feel fine one minute and flattened the next. Trouble focusing or sleeping is normal for a while."
},
{
"k": "card",
"title": "You can be real with your feelings.",
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
"say": "Kids this age understand that death is permanent. They often grieve in bursts: fine one minute, flattened the next. Many hide it to protect the grown-ups, or quietly take on grown-up jobs, like watching younger siblings. Let them know others can help carry that."
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
"\"Every feeling is welcome.\"",
"\"You don't have to be strong for me.\"",
"\"We can be sad together.\""
],
"say": "Words that help. Every feeling is welcome. Whatever you feel is okay with me. You don't have to be strong for me. We can be sad together. And say the person's name, and share memories. It tells them it's okay to talk. Then let them choose when, without pushing."
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
"say": "If your parent or grandparent is very sick, this is for you. It's a lot to carry. Others can help you carry it."
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
"h": "You have people with you in this.",
"sub": "The full guide has more, whenever you want it.",
"say": "Some days will be harder than others. You have people with you in this. The full guide has more, whenever you want it."
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
"say": "You're safe now. The shaky feeling eases, one day at a time, and others can help you carry it."
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
"sub": "You get to love both.",
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
"\"You get to love both.\"",
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
"title": "Love can grow slowly.",
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
"say": "If money is tight in your family right now, this is for you. Lots of families go through seasons like this, and you have people with you in it."
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
"say": "A few things can help. If you're worried, ask a grown-up at home your question. They can give you a simple, honest answer. Find fun that costs little or nothing: a park, the library, a game night, a walk with a friend. And if kids at school say something that stings, tell a grown-up at home or the school counselor. Others can help you handle it."
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
"h": "Your worth is in who you are.",
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
"say": "If your mom or dad is deployed, or living and working far away for a while, this is for you. Lots of kids your age go through this. Others have been here too."
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
"say": "Pick a grown-up you trust: the parent at home, a school counselor, a coach, a teacher, or a relative. Tell them how it's going, the good days and the hard ones. If the news scares you, talk with them about it. Others can help you figure this out."
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
"say": "You still matter just as much. If you miss time with your parent, say so. Try this. Can we do something, just us, this week? A walk, a game, a bike ride. Lots of grown-ups are glad when you ask."
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
"title": "You can always talk about this.",
"body": "Tell a parent, a school counselor, a coach, a teacher, a relative. You are not in trouble.",
"say": "You never have to keep this a secret, even if someone asks you to. Telling a grown-up you trust is taking care of yourself, and you are not in trouble. Try the other parent, a relative, a school counselor, a teacher, or a coach. There are groups, like Alateen, for kids exactly like you."
},
{
"k": "card",
"title": "Staying safe",
"body": "Danger right now: call 911. Need to talk: call or text 988, any time.",
"say": "If you ever feel unsafe at home, or someone is hurt, call 911. If you feel really low and need to talk, call or text 988, any time, day or night."
},
{
"k": "big",
"h": "You deserve to feel safe.",
"sub": "Others can help you carry this.",
"say": "You deserve to feel safe, and you deserve a life of your own. You didn't cause this, and others can help you carry it."
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
"id": "startms",
"ring": "as-school",
"title": "Starting Middle School",
"you": {
"id": "as-g-startms-you",
"guide": "startms",
"side": "you",
"title": "Starting Middle School",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Starting Middle School",
"sub": "For You",
"say": "If you're about to start middle school, or you just started, this is for you. It's a big jump, and you're allowed to feel all kinds of ways about it."
},
{
"k": "big",
"h": "Nervous is normal.",
"sub": "Almost everyone feels it.",
"say": "More teachers. More hallways. A locker, a new schedule, and friend groups that might shift. It makes sense to feel nervous, excited, or both. Almost everyone in that building felt the same way on their first day, even the kids who look calm."
},
{
"k": "points",
"h": "Practice what you can",
"items": [
[
"Your locker",
"Try the lock a few times"
],
[
"Your schedule",
"Walk the route if you can"
],
[
"Where lunch is",
"And where to go after"
],
[
"Who to ask",
"One grown-up at school"
]
],
"say": "You can practice some of it ahead of time. Open your lock a few times until it feels easy. Walk your schedule if the school lets you. Find out where lunch is. The rest you'll figure out as you go, and that's okay."
},
{
"k": "big",
"h": "Picture one grown-up at school.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Now think of one grown-up at school you could go to: a teacher, a counselor, a coach, or someone at the front office. Picture their face.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Now think of one grown-up at school you could go to: a teacher, a counselor, a coach, or someone at the front office.",
{
"t": "Picture their face.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look for one place to belong.",
"body": "A club, a team, a lunch table, or one teacher.",
"say": "You don't need a big group right away. Look for one place to belong. A club, a team, a band or a choir, a lunch table, or one teacher whose room feels good to walk into. One place is enough to start."
},
{
"k": "card",
"title": "The first weeks can be bumpy.",
"body": "Getting lost or feeling awkward happens to everyone.",
"say": "The first few weeks can be bumpy. You might get lost, or forget your locker combination, or feel awkward at lunch. That happens to everyone. It doesn't mean you're bad at middle school. It means you're new, and new gets easier."
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
"That is their job"
],
[
"A teacher or coach",
"Someone you trust"
]
],
"say": "Tell a grown-up how it's really going, the good parts and the hard parts. A parent, a relative, a teacher, a coach, or the school counselor. Helping new students is part of their job, and they're glad when you come."
},
{
"k": "big",
"h": "New gets easier.",
"sub": "You are growing into this.",
"say": "New gets easier, a little at a time. You're growing into this, one hallway at a time."
}
]
},
"helper": {
"id": "as-g-startms-helper",
"guide": "startms",
"side": "helper",
"title": "Starting Middle School",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Minnesota Department of Health: 2025 Minnesota Student Survey",
"https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"
],
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
"h": "Starting Middle School",
"sub": "For the Grown-up",
"say": "If a kid you love is starting middle school, this is for you. It's a big jump for them, and often for you too."
},
{
"k": "big",
"h": "A big jump, all at once.",
"sub": "Nerves are normal.",
"say": "Middle school brings more teachers, more hallways, shifting friend groups, and more freedom than they've had before, all at once. Nerves are normal. So is excitement. Many kids feel both in the same morning."
},
{
"k": "points",
"h": "Before the first day",
"items": [
[
"Practice the logistics",
"Lock, schedule, lunch"
],
[
"Name one adult",
"Someone they can go to"
],
[
"Keep the calendar light",
"Room to settle in"
],
[
"Expect a bumpy start",
"It usually smooths out"
]
],
"say": "Before the first day, practice what you can. Let them work a combination lock at the kitchen table. Walk the schedule if the school offers a tour. Find where lunch is. Help them name one adult at school they could go to. Keep the first weeks light, without piling on new activities. And expect a bumpy start. It usually smooths out."
},
{
"k": "big",
"h": "Belonging comes first.",
"sub": "One place is enough to start.",
"say": "Belonging matters most. Kids learn better when they feel known and cared for at school. Help them find one place to belong: a club, a team, a lunch table, or one teacher they connect with. One place is enough to start."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Lots of kids feel nervous. It gets easier.\"",
"\"Who's one adult at school you could go to?\"",
"\"What surprised you today?\""
],
"say": "Here are words that help. Lots of kids feel nervous. It gets easier. Who's one adult at school you could go to? And instead of, how was school, try, what surprised you today? Or, what was the best part of today, even if it was small?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Brushing off worries",
"\"You'll be fine.\""
],
[
"A packed calendar",
"In the first weeks"
],
[
"Your own old dread",
"Their story is new"
]
],
"say": "Some things are better left out. Brushing off worries with, you'll be fine, tells them to stop telling you. A packed calendar in the first weeks leaves no room to settle. And if middle school was hard for you, hold that story gently. Their story is new, and it may go differently."
},
{
"k": "big",
"h": "Picture the after-school moment.",
"say": "Take a moment. Picture your kid coming home after the first day. What is one question you want to ask, and one thing you want to leave unsaid? Hold that, and bring it with you.",
"beats": [
"Take a moment.",
"Picture your kid coming home after the first day.",
"What is one question you want to ask, and one thing you want to leave unsaid?",
{
"t": "Hold that, and bring it with you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Watch the first months.",
"body": "If worry keeps them from school, call the counselor.",
"say": "Watch the first couple of months. Tired and cranky after school is common while they adjust. If worry starts keeping them home, stomachaches show up every morning, or they seem alone week after week, talk with the school counselor or their doctor."
},
{
"k": "big",
"h": "This is a change for you too.",
"sub": "Less in view, still close.",
"say": "This is a change for you too. You'll see less of their day, and hear about it in smaller pieces. That's part of them growing. Talk with a friend about your side of it, and stay close in the car, at dinner, and at bedtime."
},
{
"k": "big",
"h": "One place to belong. One adult to go to.",
"sub": "The full guide has more, whenever you want it.",
"say": "One place to belong, and one adult to go to. Help them find those, and the rest usually follows. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "friends",
"ring": "as-school",
"title": "Friendship Breakups and Drama",
"you": {
"id": "as-g-friends-you",
"guide": "friends",
"side": "you",
"title": "Friendship Breakups and Drama",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Friendship Breakups and Drama",
"sub": "For You",
"say": "If a friendship just ended, or your friend group is full of drama right now, this is for you. This kind of hurt is real."
},
{
"k": "big",
"h": "Losing a friend is a real loss.",
"sub": "It makes sense that it hurts.",
"say": "Losing a friend can hurt as much as any loss. Maybe you had a fight. Maybe they just drifted to a new group. Maybe you're stuck in the middle of someone else's drama. You might feel sad, angry, embarrassed, or confused. All of that makes sense."
},
{
"k": "card",
"title": "Friend groups shift a lot.",
"body": "It happens to almost everyone in middle school.",
"say": "Friend groups shift a lot in middle school. People change, interests change, and groups break apart and come back together. It happens to almost everyone. It doesn't mean something is wrong with you."
},
{
"k": "big",
"h": "What do you want to happen?",
"say": "Let's slow down for a moment. Breathe in slowly, and let it out even slower. Now ask yourself one question. What do you want to happen next?",
"beats": [
"Let's slow down for a moment.",
"Breathe in slowly, and let it out even slower.",
"Now ask yourself one question.",
{
"t": "What do you want to happen next?",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Wait before you post",
"Let the hot feelings cool"
],
[
"Practice a calm message",
"Say it out loud first"
],
[
"Keep friends in other places",
"Team, club, neighborhood"
]
],
"say": "Here are a few things you can do. Wait before you post or text anything when you're upset. Let the hot feelings cool first. If you want to talk to your friend, practice a calm message with a grown-up, out loud. And keep friends in more than one place: a team, a club, a youth group, or the neighborhood. Then one breakup doesn't take everything."
},
{
"k": "points",
"h": "Talk it through with someone",
"items": [
[
"A parent or relative",
"At home"
],
[
"The school counselor",
"They know friend drama"
],
[
"A teacher or coach",
"Someone you trust"
]
],
"say": "Talk it through with a grown-up you trust: a parent, a relative, a teacher, a coach, or the school counselor. Counselors help with friend stuff all the time. And if it turns into someone being mean to you again and again, that's not just drama. Tell a grown-up right away."
},
{
"k": "big",
"h": "You are still worth being friends with.",
"sub": "Your people are out there.",
"say": "One friendship ending doesn't decide who you are. You're still worth being friends with, and your people are out there."
}
]
},
"helper": {
"id": "as-g-friends-helper",
"guide": "friends",
"side": "helper",
"title": "Friendship Breakups and Drama",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Search Institute: Developmental relationships framework",
"https://searchinstitute.org/resources-hub/developmental-relationships-framework"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Friendship Breakups and Drama",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is going through a friendship breakup or a stretch of friend drama, this is for you. What looks small from the outside can feel huge from the inside."
},
{
"k": "big",
"h": "It can feel as big as any loss.",
"sub": "Take it seriously.",
"say": "Friend groups shift a lot between sixth and eighth grade. At this age, friends are a big part of who a kid thinks they are. So losing a friend can feel as big as any loss. Take it seriously, even when it changes again by Friday."
},
{
"k": "flow",
"h": "Coach, and let them lead",
"steps": [
[
"Listen first",
"What happened, in their words"
],
[
"Ask what they want",
"Before any advice"
],
[
"Practice a calm message",
"Out loud, together"
],
[
"Let them try",
"Then talk about how it went"
]
],
"say": "Coaching works better than rescuing. Listen first, and ask what happened before you give advice. Ask, what do you want to happen? Help them practice a calm message, out loud. Then let them try, and talk about how it went. They build skills they'll use for the rest of their lives.",
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
"\"That sounds like it really hurt.\"",
"\"What do you want to happen next?\"",
"\"Want to practice what you might say?\""
],
"say": "Here are words that help. That sounds like it really hurt. What do you want to happen next? And, want to practice what you might say?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"It's just drama.\"",
"It shrinks a real hurt"
],
[
"Calling the other parent",
"At the first sign of trouble"
],
[
"Picking a side loudly",
"Friendships often mend"
]
],
"say": "Some things are better left out. Calling it just drama shrinks a real hurt, and teaches them not to bring it to you. Calling the other kid's parent at the first sign of trouble takes the problem out of their hands. And saying harsh things about the other kid can backfire. Friendships at this age often mend."
},
{
"k": "card",
"title": "Friends in more than one place",
"body": "A team, a club, church, the neighborhood.",
"say": "Help them keep friends in more than one place: school, a team, a club, a youth group or church if your family has one, cousins, or the neighborhood. When friends come from different places, one breakup can't take everything."
},
{
"k": "card",
"title": "When drama becomes meanness",
"body": "Repeated meanness is bullying. Act on it.",
"say": "Know the line. Drama goes both ways and shifts. When one kid is targeted again and again, in person or online, that's bullying. Then you step in: save what was said, and work with the school. Aspen's bullying guide can help with the next steps."
},
{
"k": "big",
"h": "Remember your own.",
"say": "Take a moment. Think back to a friendship you lost when you were about their age. Remember how big it felt. Let that memory help you listen.",
"beats": [
"Take a moment.",
"Think back to a friendship you lost when you were about their age.",
"Remember how big it felt.",
{
"t": "Let that memory help you listen.",
"w": 10
}
]
},
{
"k": "big",
"h": "It is hard to watch.",
"sub": "Your steadiness helps.",
"say": "It's hard to watch your kid get hurt and not fix it. It may stir your own memories. Talk with a friend about your side of it. Your steady presence matters more than the perfect answer."
},
{
"k": "big",
"h": "Listen first. Coach, then let them try.",
"sub": "The full guide has more, whenever you want it.",
"say": "Listen first. Coach, then let them try. They're learning how to be a friend, and how to get through losing one. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "leftout",
"ring": "as-school",
"title": "Being Left Out",
"you": {
"id": "as-g-leftout-you",
"guide": "leftout",
"side": "you",
"title": "Being Left Out",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Being Left Out",
"sub": "For You",
"say": "If you've been left out, of a party, a group chat, a lunch table, or a group of friends, this is for you. That sting is real."
},
{
"k": "big",
"h": "Being left out hurts.",
"sub": "Your feelings make sense.",
"say": "Being left out can hurt more than almost anything at this age. Maybe you saw the photos online. Maybe the seat got saved for someone else. You might feel sad, embarrassed, angry, or lonely. Those feelings make sense."
},
{
"k": "card",
"title": "It does not define you.",
"body": "Being left out does not mean you are not worth including.",
"say": "Here's something important. Being left out happens to everyone at some point, even the kids who seem popular. It can feel like proof that something's wrong with you. It isn't. Being left out doesn't mean you're not worth including."
},
{
"k": "big",
"h": "Where do you feel like yourself?",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Now think of one place where you feel most like yourself. Maybe it's on a team, in the art room, with a cousin, or outside. Picture yourself there.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Now think of one place where you feel most like yourself.",
"Maybe it's on a team, in the art room, with a cousin, or outside.",
{
"t": "Picture yourself there.",
"w": 10
}
]
},
{
"k": "points",
"h": "Find a side door",
"items": [
[
"Try a club or team",
"Shared interests help"
],
[
"Help out somewhere",
"Volunteering counts"
],
[
"One good friend",
"Is enough to start"
]
],
"say": "You don't have to get into the group that left you out. Look for a side door instead. Try a club or team where people like what you like. Help out somewhere, like volunteering. One good friend is enough to start, even if it takes a few tries to find them."
},
{
"k": "points",
"h": "Tell someone you trust",
"items": [
[
"A parent or relative",
"At home"
],
[
"The school counselor",
"They can help"
],
[
"A teacher or coach",
"Someone you trust"
]
],
"say": "Tell a grown-up you trust how you're feeling: a parent, a relative, a teacher, a coach, or the school counselor. And if kids are being mean to you on purpose, again and again, that's bullying. Tell a grown-up right away."
},
{
"k": "big",
"h": "Your people are out there.",
"sub": "You are worth including.",
"say": "You are worth including, just as you are. Your people are out there, and you can find them."
}
]
},
"helper": {
"id": "as-g-leftout-helper",
"guide": "leftout",
"side": "helper",
"title": "Being Left Out",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Search Institute: Developmental relationships framework",
"https://searchinstitute.org/resources-hub/developmental-relationships-framework"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Being Left Out",
"sub": "For the Grown-up",
"say": "If a middle schooler you love has been left out, of a party, a group, or a lunch table, this is for you. Your steadiness matters more than you know."
},
{
"k": "big",
"h": "They may read it as proof.",
"sub": "Your calm tells them otherwise.",
"say": "Being left out stings more at this age than almost any other. Kids often read it as proof something is wrong with them. Your calm, steady presence tells them otherwise."
},
{
"k": "flow",
"h": "What helps",
"steps": [
[
"Name the feeling",
"Before fixing anything"
],
[
"Put it in perspective",
"It happens to everyone"
],
[
"Find a side door",
"A club, a team, volunteering"
],
[
"Keep watching",
"Notice if it becomes a pattern"
]
],
"say": "Here's what helps. Name the feeling without rushing to fix it. Remind them it happens to everyone, and it doesn't define them. Help them find a side door into belonging, like a club, a team, or volunteering. And keep an eye out in case it becomes a pattern.",
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
"\"That hurts. I'm really glad you told me.\"",
"\"Being left out doesn't mean you're not worth including.\"",
"\"Where do you feel most like yourself?\""
],
"say": "Here are words that help. That hurts. I'm really glad you told me. Being left out doesn't mean you're not worth including. And, where do you feel most like yourself?"
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Listing what to change",
"About themselves"
],
[
"Popularity as the goal",
"Look for their people"
],
[
"Rushing to fix it",
"Let the feeling land"
]
],
"say": "Some things are better left out. Listing things they should change about themselves confirms their worst fear. Pushing popularity as the goal sends them chasing the wrong thing. Help them find their people instead. And rushing to fix it skips the part where they feel heard."
},
{
"k": "card",
"title": "One good friend can change a year.",
"body": "Or one caring adult. Help them find their people.",
"say": "Strong relationships make young people more resilient. One good friend, or one caring adult, can change a whole year. Help them find their people, even if it takes a few tries. Shared interests are often the way in."
},
{
"k": "big",
"h": "Picture where they shine.",
"say": "Take a moment. Picture your kid somewhere they light up, doing something they love. Who else might love that too? Hold that picture as a place to start.",
"beats": [
"Take a moment.",
"Picture your kid somewhere they light up, doing something they love.",
"Who else might love that too?",
{
"t": "Hold that picture as a place to start.",
"w": 10
}
]
},
{
"k": "card",
"title": "When it becomes a pattern",
"body": "Meanness on purpose is bullying. Lasting sadness needs help.",
"say": "Watch for patterns. If they're left out on purpose again and again, or targeted online, that's bullying, and it's time to work with the school. If sadness lasts for weeks, they stop wanting to go to school, or they pull away from everything, talk with the school counselor or their doctor."
},
{
"k": "big",
"h": "It hurts to watch.",
"sub": "Your own feelings count.",
"say": "It hurts to watch your kid be left out. It may wake up your own memories, or make you angry at the other kids. Let a friend hear your side of it, so you can bring your calm to your kid."
},
{
"k": "big",
"h": "Name it. Stay steady. Help them find their people.",
"sub": "The full guide has more, whenever you want it.",
"say": "Name the feeling, stay steady, and help them find their people. You're one of those people already. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "bullying",
"ring": "as-school",
"title": "Bullying, in Person and Online",
"you": {
"id": "as-g-bullying-you",
"guide": "bullying",
"side": "you",
"title": "Bullying, in Person and Online",
"sideName": "For You",
"mins": 3,
"sources": [
[
"StopBullying.gov: Facts about bullying",
"https://www.stopbullying.gov/resources/facts"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Bullying, in Person and Online",
"sub": "For You",
"say": "If someone keeps being mean to you, at school, on the bus, or online, this is for you. What's happening to you matters."
},
{
"k": "big",
"h": "This is not your fault.",
"sub": "Nothing about you earned this.",
"say": "First, the most important thing. Being bullied is not your fault. Nothing about you earned it. The person doing the bullying is making a choice, and that choice is theirs."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Embarrassed",
"Scared",
"Angry",
"Alone",
"Tired of school"
],
"say": "You might feel embarrassed, scared, or angry. You might feel alone, or dread going to school in the morning. Those feelings make sense. They're telling you something is wrong, and it's worth telling someone."
},
{
"k": "big",
"h": "Telling a grown-up is smart.",
"sub": "You won't be in trouble for telling.",
"say": "Lots of kids keep bullying to themselves. They worry it'll get worse, or that they'll lose their phone. Here's the truth. Telling a trusted grown-up is a smart, brave move. You won't be in trouble for telling. And getting help with this is a grown-up job, so others can help you fix it."
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Save it",
"Take screenshots"
],
[
"Block and report",
"On the app or game"
],
[
"Stay near friends",
"On the bus, at lunch"
]
],
"say": "Here are a few things you can do. Save it. Take screenshots of mean messages before they disappear. Block and report the person on the app or game. And stay near friends or a grown-up in the places it tends to happen, like the bus or the lunchroom.",
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
"h": "Who will you tell?",
"sub": "Picture them now.",
"say": "Let's take a moment. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Now picture one grown-up you could tell: a parent, a teacher, a coach, or your school counselor. Think of the first words you might say.",
"beats": [
"Let's take a moment.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
"Now picture one grown-up you could tell: a parent, a teacher, a coach, or your school counselor.",
{
"t": "Think of the first words you might say.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it feels like too much",
"body": "Tell a grown-up today. Not wanting to be alive: call or text 988. Danger now: 911.",
"say": "If someone hurts you or threatens you, or if it gets so heavy you don't want to be alive, tell a grown-up you trust today. You can call or text 988 any time. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "You deserve to feel safe.",
"sub": "At school, and online.",
"say": "You deserve to feel safe at school and online. You don't have to carry this by yourself. And when you see it happen to someone else, standing next to them, or telling a grown-up, helps more than you know."
}
]
},
"helper": {
"id": "as-g-bullying-helper",
"guide": "bullying",
"side": "helper",
"title": "Bullying, in Person and Online",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"StopBullying.gov: Facts about bullying",
"https://www.stopbullying.gov/resources/facts"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Bullying, in Person and Online",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is being bullied, at school or online, this is for you. Whether you're a parent, a grandparent, or another grown-up in their life, you can help them feel safe again."
},
{
"k": "big",
"h": "Bullying is common, and it still matters.",
"say": "Bullying is common. About one in five high school students says they were bullied at school in the past year, and girls are almost twice as likely as boys to be bullied online. Common doesn't mean harmless. Repeated meanness wears a kid down."
},
{
"k": "card",
"title": "Why they often keep it quiet",
"body": "Fear it'll get worse. Fear of losing their phone.",
"say": "Middle schoolers often don't tell. They're afraid it will get worse if a grown-up steps in. And many are afraid they'll lose their phone. So when your child does tell you, that took courage. How you respond in the first minute decides whether they'll tell you next time."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"This is not your fault.\"",
"\"You won't lose your phone for telling me.\"",
"\"We'll figure out the next step together.\""
],
"say": "Here are words that help. Thank you for telling me. This is not your fault. You won't lose your phone for telling me. And, we'll figure out the next step together. Then listen to the whole story before you plan anything."
},
{
"k": "big",
"h": "Say it the way you would to them.",
"say": "Let's practice. Take a breath, and say it out loud, the way you would to them. Thank you for telling me. You won't lose your phone for telling me.",
"beats": [
"Let's practice.",
"Take a breath, and say it out loud, the way you would to them.",
"Thank you for telling me.",
{
"t": "You won't lose your phone for telling me.",
"w": 10
}
]
},
{
"k": "flow",
"h": "Then act",
"steps": [
[
"Document",
"Screenshots, dates, what happened"
],
[
"Block and report",
"On the app or game"
],
[
"Tell the school in writing",
"And ask for a plan"
],
[
"Follow up",
"Until it stops"
]
],
"say": "Then act. Save screenshots and write down what happened, with dates. Block and report online. Tell the school in writing, and ask what their plan is. Then follow up, and keep following up, until it stops. Let your child know each step before you take it.",
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
"h": "What to leave out",
"items": [
[
"\"Just ignore it.\"",
"It leaves them alone with it"
],
[
"\"Fight back.\"",
"It can get them hurt or in trouble"
],
[
"Taking the phone",
"It punishes them for telling"
]
],
"say": "Some things are better left out. Just ignore it, because it leaves them alone with the problem. Telling them to fight back, which can get them hurt, or in trouble themselves. And taking away their phone, which feels like punishment for being bullied.",
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
"h": "Help them be an upstander too.",
"sub": "Stand near. Speak up. Tell a grown-up.",
"say": "Over time, talk about being an upstander for others too. Standing next to a kid who's being picked on, inviting them to sit at lunch, or telling a grown-up. Kids who've been bullied often become the kindest upstanders."
},
{
"k": "card",
"title": "If you are worried about safety",
"body": "Not wanting to be alive: stay with them, call or text 988. Danger right now: 911.",
"say": "Watch for changes: not wanting to go to school, stomachaches, slipping grades, or pulling away. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988. Call 911 in an emergency."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "A steady grown-up helps them most.",
"say": "It's hard to watch someone hurt your kid. You may feel furious, or helpless. Let yourself feel it with a friend or a partner, away from your child, so they see you steady. A calm, steady grown-up is what they need most. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "grades",
"ring": "as-school",
"title": "Grades and Pressure",
"you": {
"id": "as-g-grades-you",
"guide": "grades",
"side": "you",
"title": "Grades and Pressure",
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
"h": "Grades and Pressure",
"sub": "For You",
"say": "If grades have started to feel like a big deal, or a bad one is sitting heavy on you, this is for you."
},
{
"k": "big",
"h": "A grade is information.",
"sub": "Not a verdict on you.",
"say": "Here's something worth remembering. A grade is information, not a verdict. It tells you what to work on next. It doesn't tell you who you are, or how much you're worth."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Stressed",
"Behind",
"Embarrassed",
"Worried about disappointing someone"
],
"say": "Middle school brings more teachers, more homework, and grades that start to feel permanent. You might feel stressed, behind, or embarrassed. You might worry about letting someone down. Lots of kids your age feel this. It means you care."
},
{
"k": "flow",
"h": "Big jobs, small steps",
"steps": [
[
"Pick one assignment",
"The one due first"
],
[
"Break it down",
"Into small steps"
],
[
"Do one step tonight",
"Just one"
]
],
"say": "When everything feels like too much, try this. Pick one assignment, the one due first. Break it into small steps. Then do just one step tonight. Small steps add up faster than you think.",
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
"h": "Sleep is part of studying.",
"say": "And protect your sleep. A tired brain learns less and remembers less. Going to bed on time before a test is part of studying, not a break from it."
},
{
"k": "big",
"h": "One good thing today",
"sub": "Name it to yourself.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Now think of one good thing from today, even a small one. A friend who made you laugh. A question you got right. Hold it in your mind.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Now think of one good thing from today, even a small one.",
"A friend who made you laugh.",
"A question you got right.",
{
"t": "Hold it in your mind.",
"w": 10
}
]
},
{
"k": "card",
"title": "Ask for help early.",
"body": "A teacher, your school counselor, or a parent.",
"say": "If you're stuck, ask for help early. Teachers would rather help before the test than after. Your school counselor can help you make a plan. And tell a parent or another grown-up you trust how it's really going. If the stress ever gets so heavy you don't want to be alive, tell a grown-up today, and call or text 988."
},
{
"k": "big",
"h": "You are more than a report card.",
"sub": "The people who love you know it.",
"say": "You are more than a report card. Your kindness, your humor, and the way you keep trying all count. The people who love you know that. Take it one small step at a time."
}
]
},
"helper": {
"id": "as-g-grades-helper",
"guide": "grades",
"side": "helper",
"title": "Grades and Pressure",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Search Institute: Developmental relationships",
"https://searchinstitute.org/developmental-relationships"
],
[
"Greater Good in Education",
"https://ggie.berkeley.edu/student-well-being/gratitude-for-students/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Grades and Pressure",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is feeling the weight of grades, or you're feeling it for them, this is for you. You can help them grow without adding to the pressure."
},
{
"k": "big",
"h": "Grades start to feel permanent.",
"say": "Pressure climbs in middle school. There are more teachers, more homework, and grades start to feel permanent. Some kids push harder and harder. Others quietly give up on a class. Both are often signs of a kid who cares and feels stuck."
},
{
"k": "points",
"h": "What helps most",
"items": [
[
"High expectations",
"With real support"
],
[
"Praise effort and strategy",
"Not just results"
],
[
"Plan, not just perform",
"Small steps, written down"
],
[
"Protect sleep",
"Tired brains learn less"
]
],
"say": "High expectations help kids grow when they come with real support. Praise effort and strategy, not just the result. Help them plan, not just perform, by breaking big assignments into small steps. And protect sleep, because tired brains learn less.",
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
"\"I care more about how hard you tried than the grade.\"",
"\"What's one small step we could do tonight?\"",
"\"A bad grade is information, not a verdict.\""
],
"say": "Here are words that help. I care more about how hard you tried than the grade. What's one small step we could do tonight? And, a bad grade is information, not a verdict. Then ask what happened, and listen before you plan."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Comparing",
"To siblings or other kids"
],
[
"Tying approval to grades",
"Love stays the same"
],
[
"Taking over",
"Build their skills instead"
]
],
"say": "Some things are better left out. Comparing them to siblings or other kids. Tying your approval to grades, because kids need to know your love doesn't rise and fall with a report card. And taking over the work, when they need to build the skill a step at a time.",
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
"h": "Keep love separate from report cards.",
"say": "Let's practice. Picture the moment a hard grade comes home. Take a breath, and say it out loud, the way you would to them. A bad grade is information, not a verdict. What's one small step we could do tonight?",
"beats": [
"Let's practice.",
"Picture the moment a hard grade comes home.",
"Take a breath, and say it out loud, the way you would to them.",
"A bad grade is information, not a verdict.",
{
"t": "What's one small step we could do tonight?",
"w": 10
}
]
},
{
"k": "card",
"title": "Gratitude helps too.",
"body": "One good thing at dinner, or on the drive home.",
"say": "Gratitude helps too. Gratitude practices for students are linked with better well-being, and even better grades. Keep it simple. At dinner or on the drive home, each person names one good thing from the day. It shifts the conversation away from scores."
},
{
"k": "card",
"title": "If the pressure is too much",
"body": "Their teachers and school counselor. Not wanting to be alive: 988. Danger now: 911.",
"say": "Watch for signs the pressure is too much: trouble sleeping, stomachaches, hiding grades, tears over small mistakes, or giving up. Talk with their teachers and the school counselor. If your child ever says they don't want to be alive, stay with them and call or text 988. Call 911 in an emergency."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Your calm sets the tone.",
"say": "Your own worries about their future are real. Notice them, and talk them through with a partner or a friend, so your kid feels your calm and not your fear. Your steady love sets the tone. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "adhd",
"ring": "as-school",
"title": "ADHD and Learning Differences",
"you": {
"id": "as-g-adhd-you",
"guide": "adhd",
"side": "you",
"title": "ADHD and Learning Differences",
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
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "ADHD and Learning Differences",
"sub": "For You",
"say": "If you have ADHD or a learning difference, or school has started to feel a lot harder than it used to, this is for you."
},
{
"k": "big",
"h": "Your brain works its own way.",
"sub": "That is not about trying hard enough.",
"say": "Here's something true. ADHD and learning differences are about how a brain works, not how hard a kid tries. Lots of kids with them are trying harder than anyone can see."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Frustrated",
"Behind",
"Different",
"Tired of being corrected"
],
"say": "Middle school means more teachers, more homework, and more to keep track of. You might feel frustrated, or behind. You might feel different from your friends, or tired of hearing what you did wrong. Those feelings make sense. You're not lazy, and you have people with you."
},
{
"k": "points",
"h": "Your brain is great at some things",
"items": [
[
"Name one strength",
"Out loud"
],
[
"Name one hard part",
"Just one"
],
[
"Find a tool for it",
"With a grown-up"
]
],
"say": "Every brain is great at some things and works harder at others. Name one thing you're good at. Maybe it's drawing, building, a sport, or making people laugh. Then name one part of school that feels hardest. That hard part is where a tool can help, like a checklist, a timer, or extra time on tests.",
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
"h": "Name one strength.",
"sub": "Say it to yourself.",
"say": "Let's try it now. Breathe in slowly, and let it out. Think of one thing your brain is great at. Say it to yourself, or quietly out loud.",
"beats": [
"Let's try it now.",
"Breathe in slowly, and let it out.",
"Think of one thing your brain is great at.",
{
"t": "Say it to yourself, or quietly out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Tell a grown-up what feels hard.",
"body": "A parent, a teacher, or your school counselor.",
"say": "Others can help you figure this out. Tell a parent, a teacher, or your school counselor which part of school feels hardest. Grown-ups can set up help at school, and you get to be part of the plan. You're old enough to learn what helps your brain."
},
{
"k": "card",
"title": "If it feels really heavy",
"body": "Tell a grown-up today. Not wanting to be alive: call or text 988.",
"say": "If you feel down most days, or so heavy that you don't want to be alive, tell a grown-up you trust today. You can call or text 988 any time."
},
{
"k": "big",
"h": "Your brain is not a problem.",
"sub": "It's yours. Let's find the right tools.",
"say": "Your brain is not a problem to fix. It's yours, with real strengths. The right tools can make the hard parts easier. Keep going, one step at a time."
}
]
},
"helper": {
"id": "as-g-adhd-helper",
"guide": "adhd",
"side": "helper",
"title": "ADHD and Learning Differences",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"CHADD",
"https://chadd.org"
],
[
"Understood",
"https://www.understood.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "ADHD and Learning Differences",
"sub": "For the Grown-up",
"say": "If a middle schooler you love has ADHD or a learning difference, or you're starting to wonder, this is for you. You can help them understand their brain and get the right support."
},
{
"k": "big",
"h": "Middle school is often when it shows.",
"say": "Middle school means more teachers, more homework, and more to keep track of. For kids with ADHD or learning differences, this is often when things get hard, even if they did fine before. What looks like laziness is usually a brain working overtime to keep up."
},
{
"k": "flow",
"h": "Getting support",
"steps": [
[
"Ask in writing",
"For a school evaluation"
],
[
"Talk with their doctor",
"About what they notice"
],
[
"Use school supports",
"Like an IEP or 504 plan"
]
],
"say": "Here's where to start. You can ask the school for a special education evaluation, in writing. Talk with their doctor about what you're seeing, and let the doctor guide any questions about diagnosis and treatment. And use school supports, like an IEP or a 504 plan, if your child qualifies.",
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
"h": "Include them in the plan.",
"say": "Include your child in the plan. A middle schooler is old enough to learn what helps their brain: a checklist, a timer, a quiet place to work, or extra time on tests. Kids who understand their own brain can start to ask for what they need."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Let's find tools for the hard parts.\"",
"\"What part of school feels hardest right now?\"",
"\"I'm proud of how hard you worked on that.\""
],
"say": "Here are words that help. Your brain is great at some things and works harder at others. Let's find tools for the hard parts. What part of school feels hardest right now? And, I'm proud of how hard you worked on that."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"Just try harder.\"",
"They already are"
],
[
"Taking away activities",
"The ones where they feel capable"
],
[
"Doing it all for them",
"Build skills a step at a time"
]
],
"say": "Some things are better left out. You just need to try harder, because they usually already are. Taking away sports or activities that help them feel capable. And doing everything for them. Build skills a step at a time instead.",
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
"h": "Catch them doing well.",
"sub": "Say it out loud.",
"say": "Watch their heart as well as their grades. Kids with ADHD hear a lot of correction, and they're more likely to feel anxious or down. So catch them doing well, and say it. Let's practice. Think of one thing your child did well this week. Say it out loud, the way you would to them.",
"beats": [
"Watch their heart as well as their grades.",
"Kids with ADHD hear a lot of correction, and they're more likely to feel anxious or down.",
"So catch them doing well, and say it.",
"Let's practice.",
"Think of one thing your child did well this week.",
{
"t": "Say it out loud, the way you would to them.",
"w": 10
}
]
},
{
"k": "card",
"title": "If sadness or worry stays",
"body": "Talk with their doctor. Not wanting to be alive: 988. Danger now: 911.",
"say": "If sadness or worry stays for weeks, talk with their doctor and the school counselor. If your child ever says they don't want to be alive, stay with them and call or text 988. Call 911 in an emergency."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "You are learning alongside them.",
"say": "This takes patience, paperwork, and a lot of meetings. You're learning alongside your child. Find other parents who understand, and take breaks when you need them. Your steady belief in your child is what they need most. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "cut",
"ring": "as-school",
"title": "Cut From a Team or Tryout",
"you": {
"id": "as-g-cut-you",
"guide": "cut",
"side": "you",
"title": "Cut From a Team or Tryout",
"sideName": "For You",
"mins": 2,
"sources": [
[
"Aspen Institute Project Play",
"https://projectplay.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Cut From a Team or Tryout",
"sub": "For You",
"say": "If you just got cut from a team, a play, a band, or anything you tried out for, this is for you. I'm sorry. I know how much you wanted it."
},
{
"k": "words",
"h": "All of this makes sense",
"items": [
"Sad",
"Embarrassed",
"Angry",
"Jealous"
],
"say": "Getting cut can feel like being told you're not good enough. You might feel sad, embarrassed, or angry. You might feel jealous of a friend who made it, and still be happy for them. All of that makes sense."
},
{
"k": "card",
"title": "You can be sad first.",
"body": "Plans can wait. Today you can just feel it.",
"say": "You don't have to make a plan tonight. You don't have to act like it doesn't matter, either. It mattered, because you cared. Let yourself be sad first. Plans can wait."
},
{
"k": "big",
"h": "Name it, then breathe.",
"say": "Let's take a moment. Put your feet on the floor. Breathe in slowly, and let it out even slower. Now name the feeling that's biggest right now, quietly or out loud.",
"beats": [
"Let's take a moment.",
"Put your feet on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now name the feeling that's biggest right now, quietly or out loud.",
"w": 10
}
]
},
{
"k": "points",
"h": "When you are ready",
"items": [
[
"Another team",
"Or a rec league"
],
[
"Practice for next year",
"Ask what to work on"
],
[
"Try something new",
"A club, a sport, a stage"
]
],
"say": "Later, when you're ready, there are other ways to keep going. Another team or a rec league. Practicing for next year, maybe asking the coach what to work on. Or trying something new. Staying active and with people you like matters more than any one team."
},
{
"k": "points",
"h": "Tell a grown-up you trust",
"items": [
[
"A parent or relative",
"At home"
],
[
"A coach or teacher",
"Someone who knows you"
],
[
"The school counselor",
"Any day"
]
],
"say": "Tell a grown-up how it really feels: a parent, a relative, a coach, a teacher, or the school counselor. You don't have to pretend you're fine."
},
{
"k": "big",
"h": "You tried out. That took guts.",
"sub": "One list is not the whole story of you.",
"say": "You tried out, and that took guts. One list is not the whole story of you. You get to decide what comes next."
}
]
},
"helper": {
"id": "as-g-cut-helper",
"guide": "cut",
"side": "helper",
"title": "Cut From a Team or Tryout",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Aspen Institute Project Play",
"https://projectplay.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Cut From a Team or Tryout",
"sub": "For the Grown-up",
"say": "If a middle schooler you love just got cut from a team or a tryout, this is for you. It can sting more than it looks from the outside."
},
{
"k": "big",
"h": "It can feel like \"not good enough.\"",
"sub": "Start with the feelings, not the fix.",
"say": "Getting cut can feel like being told you're not good enough. At this age, a team can be where their friends are, where they sit at lunch, and part of how they see themselves. So the loss can be bigger than one season. Start with the feelings, not the fix."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm sorry. I know how much you wanted this.\"",
"\"I'm proud you tried out.\"",
"\"Want to think about what's next, or just be sad for now?\""
],
"say": "Here are words that help. I'm sorry. I know how much you wanted this. I'm proud you tried out. And, do you want to think about what's next, or just be sad for now? Then let them choose."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Rushing to solutions",
"Plans can wait"
],
[
"Trashing the coach",
"Or the players who made it"
],
[
"\"It's just a game.\"",
"It shrinks what they lost"
]
],
"say": "Some things are better left out. Rushing to solutions, even good ones. Trashing the coach or the kids who made it, at least in front of them. It can feel like loyalty, but it teaches them to blame instead of grow. And, it's just a game, which shrinks something that mattered to them."
},
{
"k": "card",
"title": "Friends who made it",
"body": "They can be happy for a friend and hurt at the same time.",
"say": "Watch for the friend piece. Their friends may have made the team. Practices, rides, and inside jokes can suddenly leave them out. They can be happy for a friend and hurt at the same time. Help them keep those friendships going off the field."
},
{
"k": "big",
"h": "Picture their face at the list.",
"say": "Take a moment. Picture your kid's face when they heard the news. Breathe in slowly. Now say the first words you want them to hear from you.",
"beats": [
"Take a moment.",
"Picture your kid's face when they heard the news.",
"Breathe in slowly.",
{
"t": "Now say the first words you want them to hear from you.",
"w": 10
}
]
},
{
"k": "flow",
"h": "Later, look at options",
"steps": [
[
"Another team",
"A rec league or club"
],
[
"Next year",
"Ask the coach what to work on"
],
[
"Something new",
"A different sport or activity"
]
],
"say": "Later, when they're ready, talk about options. Another team, a rec league, or a club. Practicing for next year, maybe with a simple question to the coach: what should I work on? Or trying something new. Staying active and connected matters more than the specific team.",
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
"title": "Notice your own sting.",
"body": "Your hopes count too. Keep them out of their way.",
"say": "Notice your own feelings too. Maybe you hoped for this as much as they did, or it brings back a cut of your own. That's normal. Share it with another grown-up, so your child can have their own feelings. If sadness hangs on for weeks, or they pull back from everything, talk with the school counselor or their doctor."
},
{
"k": "big",
"h": "Proud of the try. Close for the sad.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be proud of the try, and stay close for the sad part. Getting back up is a lesson they learn with you beside them. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "crush",
"ring": "as-school",
"title": "A First Crush",
"you": {
"id": "as-g-crush-you",
"guide": "crush",
"side": "you",
"title": "A First Crush",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A First Crush",
"sub": "For You",
"say": "If you have a crush on someone, or your friends are all talking about crushes, this is for you. Crushes are a normal part of growing up."
},
{
"k": "words",
"h": "A crush can feel like a lot",
"items": [
"Excited",
"Nervous",
"Awkward",
"Confused"
],
"say": "A crush can make you feel excited, nervous, awkward, or confused, sometimes all in one class period. You might think about them a lot. You might not have a crush at all yet, and that's normal too. Everyone grows on their own timeline."
},
{
"k": "card",
"title": "Your feelings are yours.",
"body": "You get to choose who you tell, and when.",
"say": "Your feelings are yours. You don't have to act on a crush, and you don't have to tell the whole group chat. You get to choose who you tell, and when. And if your crush doesn't like you back, that hurts, and it doesn't change what you're worth."
},
{
"k": "points",
"h": "Good relationships feel",
"items": [
[
"Kind",
"They treat you well"
],
[
"Safe",
"You can be yourself"
],
[
"Never pushy",
"No pressure, ever"
]
],
"say": "Here's something to keep. Good relationships, of any kind, feel kind and safe. You can be yourself. They are never pushy. If someone makes you feel pressured, scared, or bad about yourself, that's not okay."
},
{
"k": "card",
"title": "Pictures or secrets? Tell.",
"body": "You will not be in trouble for telling.",
"say": "If anyone ever asks you for pictures, or asks you to keep a secret from your grown-ups, tell a trusted grown-up right away. That goes for someone you met online, too. And if any adult ever acts like they have a crush on you, that is never okay. Tell. You will not be in trouble for telling."
},
{
"k": "big",
"h": "Picture one grown-up you could tell.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Now picture one grown-up you could tell almost anything. See their face.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Now picture one grown-up you could tell almost anything.",
{
"t": "See their face.",
"w": 10
}
]
},
{
"k": "points",
"h": "Grown-ups you can talk to",
"items": [
[
"A parent or relative",
"They were your age once"
],
[
"The school counselor",
"Any day"
],
[
"A teacher or coach",
"Someone you trust"
]
],
"say": "You can talk to a parent, a relative, the school counselor, or a teacher or coach you trust. Your family may have its own ideas about dating, so ask them. They were your age once, and they might surprise you."
},
{
"k": "big",
"h": "You deserve kind and safe.",
"sub": "Always.",
"say": "Whatever your heart is doing right now, you deserve people who are kind and safe. Always."
}
]
},
"helper": {
"id": "as-g-crush-helper",
"guide": "crush",
"side": "helper",
"title": "A First Crush",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A First Crush",
"sub": "For the Grown-up",
"say": "If a middle schooler you love has a first crush, this is for you. It's a normal part of growing up, and how you react matters more than you might think."
},
{
"k": "big",
"h": "Your reaction keeps the door open.",
"sub": "Calm curiosity works best.",
"say": "How you react to a first crush decides whether they keep talking to you, about this and about the bigger things later. Calm curiosity keeps the door open. Teasing or panic tends to close it."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What do you like about them?\"",
"\"Good relationships feel kind and safe, never pushy.\"",
"\"If anyone ever asks you for pictures or secrets, tell me.\""
],
"say": "Here are words that help. What do you like about them? Good relationships feel kind and safe, never pushy. And, if anyone ever asks you for pictures or secrets, tell me. You can say that last one more than once."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Mocking or teasing",
"Even gently"
],
[
"Telling the whole family",
"It was told to you"
],
[
"Panicking or forbidding",
"All talk about it"
]
],
"say": "Some things are better left out. Mocking or teasing, even the gentle, loving kind. Sharing it with the whole family at dinner. And panicking, or forbidding all talk about it. Each one teaches them to stop telling you things."
},
{
"k": "card",
"title": "Share your values without a lecture.",
"body": "Short, clear, and more than once.",
"say": "Your family's values about dating matter, and this is a good age to share them. Keep it short and clear, and come back to it over time. A car ride or a walk often works better than a sit-down talk. Ask what they think, too."
},
{
"k": "big",
"h": "Practice the first question.",
"say": "Take a moment. Picture your kid telling you about a crush. Notice your first reaction, and let it pass. Now say this out loud: What do you like about them?",
"beats": [
"Take a moment.",
"Picture your kid telling you about a crush.",
"Notice your first reaction, and let it pass.",
{
"t": "Now say this out loud: What do you like about them?",
"w": 10
}
]
},
{
"k": "flow",
"h": "Keep them safe",
"steps": [
[
"Kind and safe",
"Never pushy or pressured"
],
[
"Pictures or secrets",
"Tell me right away"
],
[
"An adult with a crush",
"Never okay. Tell me."
]
],
"say": "This is a good age to talk about healthy relationships. Good ones are kind and safe, and never pushy. Anyone asking for pictures, or for secrets from you, is not safe, whether they are at school or online. And any adult who shows romantic interest in a child is never okay. Make it clear they should tell you right away, and that they will never be in trouble for telling.",
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
"title": "If something is wrong",
"body": "Stay calm. Believe them. Childhelp: 1-800-422-4453. Danger: 911.",
"say": "If your child tells you an adult has shown romantic interest, or someone is asking for pictures, stay calm and believe them. Get help the same day. You can call Childhelp at 1-800-422-4453, or report online exploitation to the NCMEC CyberTipline. Call 911 if anyone is in danger right now."
},
{
"k": "card",
"title": "Your own feelings count too.",
"body": "Watching them grow up can stir a lot.",
"say": "Watching your kid have a first crush can stir a lot: sweet memories, old embarrassment, or worry about how fast they're growing. That's normal. Talk it through with another grown-up, so you can stay calm and curious with them."
},
{
"k": "big",
"h": "Calm and curious. Kind and safe.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay calm and curious, and keep teaching kind and safe. That's how you stay the person they tell. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "teacher",
"ring": "as-school",
"title": "A Teacher or Coach Leaves",
"you": {
"id": "as-g-teacher-you",
"guide": "teacher",
"side": "you",
"title": "A Teacher or Coach Leaves",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Search Institute: Developmental relationships",
"https://searchinstitute.org/developmental-relationships"
],
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
"h": "A Teacher or Coach Leaves",
"sub": "For You",
"say": "If a teacher or coach you care about is leaving, or already left, this is for you. Some grown-ups really matter to us, and it's hard when they go."
},
{
"k": "words",
"h": "It makes sense to miss them",
"items": [
"Sad",
"Mad",
"Worried",
"Mixed up"
],
"say": "It makes sense to miss them. You might feel sad, or mad that they're going. You might worry about who comes next. You might not even know why they left. All of that is okay. Missing someone means they mattered."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"Sarah taught third grade, and kept teaching through cancer.",
"Her students' drawings covered her wall: crooked suns, stick figure families.",
"One said MRS. K WE MISS YOU, in careful crayon letters."
],
"lesson": "Missing a teacher means they mattered.",
"note": "Names and details changed",
"hold": 2,
"say": "Let me tell you about a teacher named Sarah. Her third grade class knew her as Mrs. K. She was very sick for four years, and every day she could, she kept teaching. She never told her students. She wanted to be their teacher. When I met her, she was sitting up in bed, and her wall was covered in her students' drawings. Crooked suns. Stick figure families. One said, MRS. K WE MISS YOU."
},
{
"k": "points",
"h": "Ways to say goodbye",
"items": [
[
"Make a card",
"Or a drawing"
],
[
"Say thank you",
"Out loud or in a note"
],
[
"Ask a grown-up",
"To help send it"
]
],
"say": "Those kids found a way to say they missed her. You can too. Make a card or a drawing. Say thank you, out loud or in a note. If they're already gone, ask a grown-up to help you send it.",
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
"h": "What did they teach you?",
"say": "Let's take a moment. Picture that teacher or coach. Think of one thing they taught you, or one thing they did that you liked. Now say thank you, quietly or out loud.",
"beats": [
"Let's take a moment.",
"Picture that teacher or coach.",
"Think of one thing they taught you, or one thing they did that you liked.",
{
"t": "Now say thank you, quietly or out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "The new grown-up wants to know you too.",
"body": "You can miss the old one and still give them a chance.",
"say": "The new teacher or coach wants to get to know you too. You can miss the old one and still give the new one a chance. Both can be true."
},
{
"k": "points",
"h": "Tell someone how it feels",
"items": [
[
"A parent or relative",
"At home"
],
[
"The school counselor",
"Any day"
],
[
"Another teacher or coach",
"Someone you trust"
]
],
"say": "Tell a grown-up how you feel: a parent, a relative, the school counselor, or another teacher or coach you trust. And if any grown-up ever made you feel unsafe, tell someone you trust. You will not be in trouble for telling."
},
{
"k": "big",
"h": "What they gave you stays with you.",
"sub": "Some grown-ups we remember for a long time.",
"say": "What a good teacher or coach gave you stays with you. Somewhere out there tonight, a classroom of grown-ups still remembers Mrs. K."
}
]
},
"helper": {
"id": "as-g-teacher-helper",
"guide": "teacher",
"side": "helper",
"title": "A Teacher or Coach Leaves",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Search Institute: Developmental relationships",
"https://searchinstitute.org/developmental-relationships"
],
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
"h": "A Teacher or Coach Leaves",
"sub": "For the Grown-up",
"say": "If a middle schooler you love just lost a teacher or coach who mattered to them, this is for you. It's a real loss, even when it's for a good reason."
},
{
"k": "big",
"h": "Some of the most important adults they have.",
"say": "Teachers and coaches can be some of the most important adults in a middle schooler's life. They may be the person who noticed them, pushed them, or made a hard class feel possible. When one leaves, expect some real sadness."
},
{
"k": "story",
"title": "The Wisdom They Share",
"lines": [
"Sarah taught third grade, and kept teaching through cancer.",
"Her students' drawings covered her wall: crooked suns, stick figure families.",
"One said MRS. K WE MISS YOU, in careful crayon letters."
],
"lesson": "Kids need a way to say what a teacher meant.",
"note": "Names and details changed",
"hold": 2,
"say": "I once met a teacher named Sarah. She had taught for twelve years, and every day she could, she kept teaching her third grade class through cancer. She never told her students. I wanted to be their teacher, she told me. When I met her, she was sitting up in bed, surrounded by drawings taped to the wall. Crooked suns. Stick figure families. One said MRS. K WE MISS YOU, in careful, uneven crayon letters. Sarah died a few days later. I don't know what happened to that wall of drawings. I hope somebody kept them."
},
{
"k": "points",
"h": "Make room for a goodbye",
"items": [
[
"Give notice when you can",
"Time to get ready"
],
[
"A card or a last talk",
"Something they make or say"
],
[
"Keep what they made",
"It matters later"
]
],
"say": "Those drawings were how her students said they missed her. Make room for a goodbye. Give notice when you can, so they have time. Help them make a card or have a last conversation. And keep the things they make. They matter later.",
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
"h": "Words that help",
"items": [
"\"It makes sense you'll miss them.\"",
"\"What did you like most about them?\"",
"\"The new teacher wants to get to know you too.\""
],
"say": "Here are words that help. It makes sense you'll miss them. What did you like most about them? And later, the new teacher wants to get to know you too."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"You'll get over it.\"",
"It shrinks the loss"
],
[
"Adult details",
"About why they left"
],
[
"Comparing out loud",
"Old teacher versus new"
]
],
"say": "Some things are better left out. You'll get over it, which shrinks a real loss. Adult details about why someone left. And comparing the old teacher and the new one out loud, which makes it harder to give the new one a chance."
},
{
"k": "card",
"title": "If they left for a hard reason",
"body": "Keep it simple. Watch for any kid who needs to talk.",
"say": "Sometimes a teacher or coach leaves for a hard reason. If it was misconduct, follow the school's steps and keep it simple: they are no longer working here. Watch for any kid who might need to talk. If your child shares that they were harmed, stay calm, believe them, and get help that day. Childhelp is at 1-800-422-4453, and 911 is there for danger right now."
},
{
"k": "big",
"h": "Picture the grown-up who mattered.",
"say": "Take a moment. Think of a teacher or coach who mattered to you when you were young. Picture their face. Now say one thing they gave you, out loud.",
"beats": [
"Take a moment.",
"Think of a teacher or coach who mattered to you when you were young.",
"Picture their face.",
{
"t": "Now say one thing they gave you, out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help them meet the new one.",
"body": "Introduce the new adult warmly. Your feelings count too.",
"say": "When you can, introduce the new adult warmly, and give it time. You may miss that teacher or coach too, or worry about the change. That's okay. Share it with another grown-up. If sadness hangs on for weeks, talk with the school counselor."
},
{
"k": "big",
"h": "Make room for the goodbye.",
"sub": "The full guide has more, whenever you want it.",
"say": "Make room for the goodbye, and stay close through the change. The grown-ups who matter stay with kids for a long time. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "body",
"ring": "as-growing",
"title": "A Changing Body",
"you": {
"id": "as-g-body-you",
"guide": "body",
"side": "you",
"title": "A Changing Body",
"sideName": "For You",
"mins": 3,
"sources": [
[
"American Academy of Pediatrics: Puberty",
"https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/default.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Changing Body",
"sub": "For You",
"say": "If your body is changing, or you're wondering when it will, this is for you. Growing up happens to everyone, and it can still feel strange."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Curious",
"Embarrassed",
"Proud",
"Impatient",
"All of it"
],
"say": "You might feel curious, embarrassed, proud, or impatient. Some days you might feel all of those before lunch. That's normal. Your body and your feelings are both growing up."
},
{
"k": "big",
"h": "Every body has its own schedule.",
"sub": "Early, late, or in the middle.",
"say": "Here's something worth remembering. Every body changes on its own schedule. Some kids start early, some start later, and lots are somewhere in the middle. Being different from your friends doesn't mean something is wrong. You're right on your own schedule."
},
{
"k": "points",
"h": "Things that might change",
"items": [
[
"Growing",
"Sometimes fast, feet first"
],
[
"Voice and skin",
"Cracks, pimples, more sweat"
],
[
"Feelings",
"Bigger, and quicker"
]
],
"say": "Lots of things can change. You might grow fast, sometimes feet first. Your voice might crack, your skin might break out, and you might sweat more. Feelings can get bigger and change quicker too. All of that is your body doing its job.",
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
"title": "Every question is welcome.",
"body": "Ask a parent, a relative, your doctor, or the school nurse.",
"say": "You'll probably have questions. Every question is welcome. Ask a parent or a relative you trust, your doctor, or the school nurse or counselor. They've heard it all before, and they're glad when you ask."
},
{
"k": "big",
"h": "Who could you ask?",
"sub": "Picture them now.",
"say": "Let's try something. Take one slow breath. Picture a grown-up you could ask about your body. Now think of one question you might ask them.",
"beats": [
"Let's try something.",
"Take one slow breath.",
"Picture a grown-up you could ask about your body.",
{
"t": "Now think of one question you might ask them.",
"w": 10
}
]
},
{
"k": "card",
"title": "Your body belongs to you.",
"body": "If anyone makes you feel unsafe, tell a grown-up you trust.",
"say": "Your body belongs to you. If anyone ever touches you in a way that feels wrong, tell a grown-up you trust right away. You will not be in trouble for telling. And if someone teases you about your body, you can tell a grown-up about that too."
},
{
"k": "big",
"h": "You're growing right on time.",
"sub": "Your time, not anyone else's.",
"say": "Growing up is a lot. Be kind to your body while it does its work. You're growing right on your own time. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-body-helper",
"guide": "body",
"side": "helper",
"title": "A Changing Body",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"American Academy of Pediatrics: Puberty",
"https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/default.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Changing Body",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is going through puberty, or is about to, this is for you. You don't need one perfect talk. You need lots of small, kind ones."
},
{
"k": "big",
"h": "Many small talks beat one big one.",
"say": "Many small talks beat one big one. Kids need to understand the changes before they happen. Knowing what's coming makes it less scary and less embarrassing. So start early, keep it short, and come back to it often."
},
{
"k": "points",
"h": "Good times to talk",
"items": [
[
"Car rides",
"Side by side feels easier"
],
[
"Side by side",
"Cooking, walking, folding laundry"
],
[
"When they ask",
"Answer what they asked"
]
],
"say": "Some of the best talks happen side by side. Car rides are great, because no one has to make eye contact. So is cooking, walking the dog, or folding laundry. And when they ask something, answer what they asked, simply and kindly, and let them come back for more.",
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
"\"You're right on your own schedule.\"",
"\"You can ask me anything, and I won't laugh.\"",
"\"Want me to leave some supplies in your bathroom?\""
],
"say": "Words that help. Everyone's body changes at a different time. You're right on your own schedule. You can ask me anything, and I won't laugh. And, want me to leave some supplies in your bathroom?"
},
{
"k": "card",
"title": "Keep supplies ready before they're needed.",
"body": "Deodorant, pads, face wash, whatever fits your child.",
"say": "Keep supplies ready before they're needed. Deodorant, pads, face wash, whatever fits your child. Put them where they can find them without asking. It quietly says, this is normal, and I've got you."
},
{
"k": "big",
"h": "Try the first line out loud.",
"sub": "The way you would in the car.",
"say": "Let's practice. Take a breath. Picture your middle schooler beside you in the car. Now say this out loud. You can ask me anything, and I won't laugh.",
"beats": [
"Let's practice.",
"Take a breath.",
"Picture your middle schooler beside you in the car.",
"Now say this out loud.",
{
"t": "You can ask me anything, and I won't laugh.",
"w": 10
}
]
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Comments on size or shape",
"They stick"
],
[
"Teasing",
"About voice, skin, or growth"
],
[
"One big talk",
"And then silence"
]
],
"say": "Some things are better left out. Comments about their size or shape, because they stick at this age. Teasing about their voice, skin, or growth, from anyone in the family. And one big talk, followed by silence.",
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
"title": "Facts, and your family's values.",
"body": "Matter-of-fact and kind. Their doctor is a good partner.",
"say": "Keep it matter-of-fact and kind. Share the facts, and share your family's values too. If you don't know an answer, say so, and look it up together or ask their doctor. Their doctor is a good partner for questions about growth, skin, periods, or anything that worries either of you."
},
{
"k": "card",
"title": "Their body belongs to them.",
"body": "They can tell you anything, and they will not be in trouble.",
"say": "Teach them that their body belongs to them. If anyone ever touches them in a way that feels wrong, they can tell you, and they won't be in trouble. If they do tell you, stay calm, believe them, and get help the same day. Call 911 if they're in danger right now."
},
{
"k": "big",
"h": "Every body has its own schedule.",
"sub": "Say it often.",
"say": "If nobody talked with you when you were growing up, you get to do it differently now. Be patient with yourself, and laugh with them, never at them. Say it often: every body changes on its own schedule. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "bedwetting",
"ring": "as-growing",
"title": "Bedwetting",
"you": {
"id": "as-g-bedwetting-you",
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
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Bedwetting",
"sub": "For You",
"say": "If you sometimes wet the bed, this is for you. It might feel like the most private thing in the world. Let's talk about it, calmly."
},
{
"k": "big",
"h": "Lots of kids your age deal with this.",
"sub": "It's not your fault.",
"say": "First, the most important thing. Lots of kids your age deal with this. Nobody talks about it, so it can feel like you're the only one. You're not. It's not your fault, and it's not a choice. It often runs in families."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Embarrassed",
"Frustrated",
"Worried",
"Tired of it"
],
"say": "You might feel embarrassed, frustrated, or worried that someone will find out. You might just be tired of it. Those feelings make sense. They don't mean anything is wrong with you."
},
{
"k": "card",
"title": "There are things that really help.",
"body": "Doctors talk with kids about this all the time.",
"say": "Here's some good news. There are things that really help, and a doctor knows them. Doctors talk with kids about this all the time. Ask a parent or a grown-up you trust to set up a visit. You can even ask them to do the talking."
},
{
"k": "points",
"h": "A quiet plan",
"items": [
[
"Easy supplies",
"Ready near your bed"
],
[
"Private cleanup",
"Your way, no fuss"
],
[
"Sleepovers and camp",
"A plan, so you can still go"
]
],
"say": "You and a grown-up can make a quiet plan. Keep easy supplies ready near your bed. Handle cleanup your own way, without a fuss. And make a plan for sleepovers and camp, so you can still go and have fun.",
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
"h": "Who could you tell?",
"sub": "Picture them now.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Picture the grown-up you'd feel okay telling. Now think of the first words you could say, like, can we talk about something private?",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Picture the grown-up you'd feel okay telling.",
{
"t": "Now think of the first words you could say, like, can we talk about something private?",
"w": 10
}
]
},
{
"k": "card",
"title": "If someone teases you",
"body": "Tell a grown-up. You deserve privacy.",
"say": "If a brother, a sister, or anyone else teases you about it, tell a grown-up. Teasing about this is never okay, and a grown-up can help make it stop. You deserve privacy."
},
{
"k": "big",
"h": "This is not who you are.",
"sub": "It's one thing your body is working on.",
"say": "This is not who you are. It's one thing your body is still working on, and others can help you handle it. Be gentle with yourself. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-bedwetting-helper",
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
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Bedwetting",
"sub": "For the Grown-up",
"say": "If a middle schooler you love still wets the bed, this is for you. Your calm can make this much lighter for them."
},
{
"k": "big",
"h": "A medical issue, not a choice.",
"say": "Bedwetting is a medical issue, not a choice. It's less common by middle school, but plenty of kids still deal with it, and it often runs in families. Nobody is doing anything wrong here, not your child, and not you."
},
{
"k": "card",
"title": "At this age, the embarrassment is heavy.",
"body": "Kids may start avoiding sleepovers, camp, or team trips.",
"say": "At this age, the embarrassment can be heavy. Kids may start avoiding sleepovers, camp, or team trips, and they may not tell you why. So keep it private, with no shame. How you respond tells them whether this is something they can bring to you."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Lots of kids your age deal with this.\"",
"\"There are things that really help.\"",
"\"We'll make a plan so you can still go.\""
],
"say": "Words that help. Lots of kids your age deal with this. It's not your fault. Let's talk with the doctor. There are things that really help. And, we'll make a plan so you can still go to the sleepover."
},
{
"k": "card",
"title": "See their doctor.",
"body": "Treatments work well at this age.",
"say": "See their doctor. The doctor can check for causes, like constipation or an infection, and talk through treatments. Alarms and medicine can both help, and the doctor will help you decide what fits. If a child who was dry starts wetting again, call the doctor, since stress and health changes can play a part."
},
{
"k": "points",
"h": "At home, protect their dignity",
"items": [
[
"Easy supplies",
"Ready, and private"
],
[
"Their own cleanup",
"For dignity, never as a consequence"
],
[
"No teasing",
"From anyone, every time"
]
],
"say": "At home, protect their dignity. Keep easy supplies ready, like a mattress cover and extra sheets. Let them manage cleanup privately, as a way to keep their dignity, never as a consequence. And protect them from siblings' teasing, firmly and every time.",
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
"h": "Try the line out loud.",
"sub": "The way you would at bedtime.",
"say": "Let's practice. Take a breath. Picture your middle schooler, quietly worried about a sleepover this weekend. Say this out loud. We'll make a plan so you can still go to the sleepover.",
"beats": [
"Let's practice.",
"Take a breath.",
"Picture your middle schooler, quietly worried about a sleepover this weekend.",
"Say this out loud.",
{
"t": "We'll make a plan so you can still go to the sleepover.",
"w": 10
}
]
},
{
"k": "flow",
"h": "A quiet plan for overnights",
"steps": [
[
"Ask the doctor",
"Ahead of time"
],
[
"Pack it privately",
"A bag like any other"
],
[
"One trusted adult",
"Only with their okay"
],
[
"A way to reach you",
"Just in case"
]
],
"say": "Make a quiet plan together for sleepovers and camp. Ask the doctor about it ahead of time. Pack supplies privately, in a bag that looks like any other. With your child's okay, let one trusted adult know, like the camp nurse. And make sure they can reach you.",
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
"h": "What to leave out",
"items": [
[
"Teasing",
"Even gently"
],
[
"Punishment",
"Or washing sheets as a consequence"
],
[
"Mentioning it",
"In front of anyone"
]
],
"say": "Some things are better left out. Teasing, even gently, or letting siblings tease. Punishment, or making them wash sheets as a consequence. And mentioning it in front of anyone, even family.",
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
"h": "Calm and private.",
"sub": "Your steadiness helps most.",
"say": "Changing sheets in the middle of the night can wear anyone down. It's okay to feel tired. Let it out with another grown-up, away from your child, and keep your voice gentle with them. Calm and private is the whole plan. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "compare",
"ring": "as-growing",
"title": "Comparing Yourself to Others",
"you": {
"id": "as-g-compare-you",
"guide": "compare",
"side": "you",
"title": "Comparing Yourself to Others",
"sideName": "For You",
"mins": 3,
"sources": [
[
"APA: Health advisory on social media use in adolescence",
"https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Comparing Yourself to Others",
"sub": "For You",
"say": "If scrolling sometimes leaves you feeling like everyone else is better looking, more fun, or just more, this is for you. Lots of people your age feel that way."
},
{
"k": "words",
"h": "Comparing can leave you feeling",
"items": [
"Not enough",
"Left out",
"Behind",
"Jealous"
],
"say": "Almost everyone compares, especially in middle school. It can leave you feeling not enough, left out, behind, or jealous. Those feelings are normal. They don't mean anything is wrong with you."
},
{
"k": "big",
"h": "You're seeing their highlight reel.",
"sub": "Not their whole life.",
"say": "Here's something worth remembering. Most of what people post is their highlight reel. The best photo out of thirty. The good day, not the hard one. Filters, angles, and edits. So you end up comparing your whole life to their best moments."
},
{
"k": "points",
"h": "Things to try",
"items": [
[
"Notice",
"How do I feel after scrolling?"
],
[
"Clean up your feed",
"Unfollow or mute what drags you down"
],
[
"Follow what lifts you",
"Hobbies, funny stuff, real people"
]
],
"say": "Here are a few things to try. Notice how you feel after scrolling. Better, or worse? If an account usually makes you feel worse, unfollow it or mute it. You get to choose your feed. And follow things that lift you up: your hobbies, funny stuff, and real people being real.",
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
"h": "Name one thing no picture shows.",
"say": "Let's take a moment. Take a slow breath. Think of one thing you like about yourself that has nothing to do with looks. Say it quietly to yourself, or out loud.",
"beats": [
"Let's take a moment.",
"Take a slow breath.",
"Think of one thing you like about yourself that has nothing to do with looks.",
{
"t": "Say it quietly to yourself, or out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Talk to someone you trust.",
"body": "A parent, a relative, a coach, a teacher, your school counselor.",
"say": "If comparing is making you feel bad most days, talk to a grown-up you trust: a parent, a relative, a coach, a teacher, or your school counselor. Others can help you sort it out."
},
{
"k": "card",
"title": "If it gets really heavy",
"body": "Tell a grown-up today. Not wanting to be alive: call or text 988.",
"say": "If you find yourself worrying about your body or food all the time, or feeling so low you don't want to be alive, tell a grown-up you trust today. You can call or text 988 any time. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "Only you get to be you.",
"sub": "And that isn't a contest.",
"say": "There's only one you, with your own laugh, your own interests, and your own way of seeing things. Nobody else gets to be you. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-compare-helper",
"guide": "compare",
"side": "helper",
"title": "Comparing Yourself to Others",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"APA: Health advisory on social media use in adolescence",
"https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Comparing Yourself to Others",
"sub": "For the Grown-up",
"say": "If a middle schooler you love keeps comparing themselves to others, and coming up short, this is for you. You can't take comparison away, but you can help them notice it."
},
{
"k": "big",
"h": "Built into middle school. Supercharged by phones.",
"say": "Comparing is built into middle school, and phones supercharge it. Kids this age are working out who they are, and a feed hands them endless people to measure themselves against. Experts advise that kids limit social media used for comparison, especially around looks."
},
{
"k": "card",
"title": "Help them notice it.",
"body": "\"How do you feel after scrolling that?\"",
"say": "So help them notice it. Ask, how do you feel after scrolling that? Asking how content makes them feel teaches them to curate their own feed. That's a skill they'll use for life, on any app."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Most of what people post is their highlight reel.\"",
"\"Which accounts make you feel good?\"",
"\"Here's something I love about you that no picture shows.\""
],
"say": "Words that help. Most of what people post is their highlight reel. Which accounts make you feel good? Which ones don't? And, here's something I love about you that no picture shows."
},
{
"k": "flow",
"h": "Clean up feeds together",
"steps": [
[
"Scroll side by side",
"No judging"
],
[
"Notice",
"Better, or worse?"
],
[
"Unfollow or mute",
"What makes them feel worse"
],
[
"Add what lifts",
"Hobbies, humor, real people"
]
],
"say": "Try cleaning up feeds together. Scroll side by side, with curiosity. Notice which accounts leave them feeling better or worse. Unfollow or mute the ones that make them feel worse. And add accounts tied to their hobbies, humor, and real people. Make it part of your family's media agreement, and clean up your own feed too.",
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
"h": "Say what no picture shows.",
"sub": "Out loud, the way you would tell them.",
"say": "Let's practice. Think of one thing you love about your middle schooler that has nothing to do with looks. Now say it out loud, the way you would tell them. Here's something I love about you that no picture shows.",
"beats": [
"Let's practice.",
"Think of one thing you love about your middle schooler that has nothing to do with looks.",
"Now say it out loud, the way you would tell them.",
{
"t": "Here's something I love about you that no picture shows.",
"w": 10
}
]
},
{
"k": "points",
"h": "Name strengths beyond looks",
"items": [
[
"Kindness",
"How they treat people"
],
[
"Effort",
"How they keep going"
],
[
"Curiosity",
"What lights them up"
]
],
"say": "Name strengths that have nothing to do with looks, often and out loud. How kind they are with people. How they keep going when something is hard. What they're curious about, and what lights them up.",
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
"h": "What to leave out",
"items": [
[
"Comparing them",
"To siblings or friends"
],
[
"Comments on bodies",
"Anyone's, on screen or in person"
],
[
"Your own comparing",
"Out loud, in front of them"
]
],
"say": "Some things are better left out. Comparing them to siblings or friends, even to motivate them. Commenting on other people's bodies, on screen or in person. And watch your own comparing out loud, like sighing over someone else's house, vacation, or looks. Kids learn a lot from how you talk about yourself.",
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
"title": "If you are worried",
"body": "Talk with their doctor. Not wanting to be alive: 988. Emergency: 911.",
"say": "Watch for changes: pulling away from friends, skipping meals, hiding their body, or seeming down most days. Talk with their doctor or school counselor. If anything points to thoughts of not wanting to be alive, stay with them and call or text 988. Call 911 in an emergency."
},
{
"k": "big",
"h": "Help them see what no picture shows.",
"sub": "The full guide has more, whenever you want it.",
"say": "Plenty of us grown-ups still compare, too. Be gentle with yourself, and let your kid see you choose what you scroll. Help them see what no picture shows. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "phone",
"ring": "as-growing",
"title": "First Phone and Group Chats",
"you": {
"id": "as-g-phone-you",
"guide": "phone",
"side": "you",
"title": "First Phone and Group Chats",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org: How to make a family media plan",
"https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "First Phone and Group Chats",
"sub": "For You",
"say": "If you just got your first phone, or you're new to group chats, this is for you. A phone can be a lot of fun, and a lot to handle."
},
{
"k": "words",
"h": "A phone can bring",
"items": [
"Fun",
"Friends",
"Pressure",
"Drama"
],
"say": "A phone can bring fun, friends, and inside jokes. It can also bring pressure and drama. A group chat can be great one minute and mean the next. Feeling both ways about it is normal."
},
{
"k": "points",
"h": "Group chat skills",
"items": [
[
"Mute it",
"When it gets to be a lot"
],
[
"Leave it",
"When it makes you feel bad"
],
[
"Don't forward it",
"Mean stuff stops with you"
],
[
"Screenshot and report",
"Then tell a grown-up"
]
],
"say": "Here are some group chat skills. Mute a chat when it gets to be a lot. You can always leave a chat that makes you feel bad. Don't forward mean stuff. It can stop with you. And if something feels wrong, screenshot it, report it, and tell a grown-up.",
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
"h": "Telling a grown-up is smart.",
"sub": "Seeing something scary is not your fault.",
"say": "Sometimes you'll see something scary or upsetting online. That's not your fault. Lots of kids keep quiet because they're afraid of losing their phone. Telling a grown-up you trust is a smart, brave move. Sorting it out is their job, so others can help you handle it."
},
{
"k": "card",
"title": "Make a phone agreement together.",
"body": "Unplugged times. Charging outside your room. Rules for the grown-ups too.",
"say": "Ask your family to make a phone agreement together. You can pick unplugged times, like dinner and homework. Phones can charge outside your bedroom at night, so you sleep better. Rules for the grown-ups belong in it too. And ask for one promise: telling them about something scary won't cost you your phone."
},
{
"k": "big",
"h": "Who would you show?",
"sub": "Picture them now.",
"say": "Let's take a moment. Take a slow breath in, and let it out even slower. Picture one grown-up you could show if something online felt wrong: a parent, a relative, a coach, or your school counselor. Think of the first words you might say.",
"beats": [
"Let's take a moment.",
"Take a slow breath in, and let it out even slower.",
"Picture one grown-up you could show if something online felt wrong: a parent, a relative, a coach, or your school counselor.",
{
"t": "Think of the first words you might say.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your phone works best when it works for you.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your phone works best when it works for you. You're still learning how to handle it, and so is everyone else. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-phone-helper",
"guide": "phone",
"side": "helper",
"title": "First Phone and Group Chats",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"HealthyChildren.org: How to make a family media plan",
"https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "First Phone and Group Chats",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is getting a first phone, or living in group chats, this is for you. You don't need to be a tech expert. You need to stay in the conversation."
},
{
"k": "big",
"h": "Fun, and sometimes brutal.",
"sub": "Being in the chat can feel like being in the group.",
"say": "A first phone opens up friends, jokes, and belonging. For a middle schooler, being in the group chat can feel like being in the group. Group chats can be fun, and they can be brutal. They learn to handle both best with you beside them."
},
{
"k": "flow",
"h": "Make a phone agreement together",
"steps": [
[
"Unplugged times",
"Dinner, homework, bedtime"
],
[
"Charge outside the bedroom",
"Every night"
],
[
"Turn off the pull",
"Autoplay and notifications"
],
[
"Rules for you too",
"Everyone keeps them"
]
],
"say": "Make a phone agreement together. Plans made together work better than rules handed down. Choose unplugged times, like dinner, homework, and bedtime. Charge phones outside the bedroom at night. Turn off autoplay and the notifications that keep pulling them back. And write in rules for yourself too.",
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
"k": "story",
"title": "Boundaries and Presence",
"lines": [
"At my son's band concert, I silenced my personal phone and my work phone.",
"My son spotted us and flashed a big smile.",
"I unclipped my badge and arrived fully in that moment."
],
"lesson": "Kids learn the phone habit they see.",
"note": "Names and details changed",
"hold": 2,
"say": "After work one day, I rushed straight to my son's middle school band concert. I slipped into the gym just as it began, found my wife in the bleachers, and silenced my personal phone and my work phone. My son spotted us and flashed a big smile. As the band launched into the Star Wars theme, I realized I was still half at work. So I unclipped my badge, tucked it into my pocket, and took a few deep breaths. For the rest of the concert, I was truly present, laughing, clapping, and soaking in my son's excitement."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Let's make the rules together, including rules for me.\"",
"\"You can always leave a chat that makes you feel bad.\"",
"\"If you see something scary, tell me. You won't lose your phone.\""
],
"say": "Kids learn the phone habit they see. So let them see you put yours away. Let's make the rules together, including rules for me. You can always leave a chat that makes you feel bad. If you see something scary, tell me. You won't lose your phone."
},
{
"k": "points",
"h": "Teach the skills",
"items": [
[
"Mute and leave",
"When a chat turns"
],
[
"Don't forward mean stuff",
"It can stop with them"
],
[
"Screenshot and report",
"Then come to you"
]
],
"say": "Teach the practical skills. How to mute a chat, and how to leave one. Not forwarding mean stuff, so it stops with them. How to screenshot and report, and then come to you when something feels wrong. Monitoring apps can't replace those talks.",
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
"body": "Telling you never costs them their phone.",
"say": "Two habits quietly close the door. Using monitoring apps instead of conversations. And taking the phone as punishment when they report a problem. If telling costs them their phone, they'll stop telling. So keep the promise. Telling you never costs them their phone."
},
{
"k": "big",
"h": "Say the promise out loud.",
"sub": "The way you would to them.",
"say": "Let's practice. Take a breath. Say it out loud, the way you would to them. If you see something scary, tell me. You won't lose your phone.",
"beats": [
"Let's practice.",
"Take a breath.",
"Say it out loud, the way you would to them.",
"If you see something scary, tell me.",
{
"t": "You won't lose your phone.",
"w": 10
}
]
},
{
"k": "card",
"title": "If a chat turns serious",
"body": "Threats or pressure for pictures: act together, today. Not wanting to be alive: 988. Emergency: 911.",
"say": "If a chat ever turns to threats, pressure for pictures, or someone hurting them, stay calm and act together, the same day. Aspen's guides on bullying and on online pressure and pictures have the next steps. If anything points to thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Stay in the conversation.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be patient with yourself, because this is new for every family. Your own phone habits will teach more than any rule. Stay in the conversation. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pictures",
"ring": "as-growing",
"title": "Online Pressure and Pictures",
"you": {
"id": "as-g-pictures-you",
"guide": "pictures",
"side": "you",
"title": "Online Pressure and Pictures",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NCMEC: Sextortion",
"https://www.missingkids.org/theissues/sextortion"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Online Pressure and Pictures",
"sub": "For You",
"say": "If someone online is pressuring you for pictures, or threatening to share a picture of you, this is for you. You won't be in trouble. You can get help today."
},
{
"k": "big",
"h": "This is not your fault.",
"sub": "The person threatening you is to blame.",
"say": "First, the most important thing. This is not your fault. The person threatening you is to blame, every time. It doesn't matter whether you sent a picture or not. Sometimes they make fake pictures with AI. Either way, you can get help."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Embarrassed",
"Trapped",
"Panicked"
],
"say": "You might feel scared, embarrassed, or trapped. Your heart might be racing. The person threatening you wants you to feel that way, so you'll keep quiet. This happens to a lot of kids, and it can be fixed."
},
{
"k": "flow",
"h": "What to do",
"steps": [
[
"Stop replying",
"Don't pay. Don't send more."
],
[
"Save it",
"Screenshots and their username"
],
[
"Block and report",
"On the app or game"
],
[
"Tell a grown-up",
"Today"
]
],
"say": "Here's what to do. Stop replying. Don't pay, and don't send anything more, even if they promise to stop. Save it: take screenshots of the messages and write down their username. Then block and report them on the app or game. And tell a trusted grown-up today.",
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
"h": "You won't be in trouble.",
"sub": "Picture who you will tell today.",
"say": "Let's take a breath together. Breathe in slowly, and let it out even slower. Picture one grown-up you trust: a parent, a relative, a coach, or your school counselor. Now say this out loud: someone online is scaring me, and I need help.",
"beats": [
"Let's take a breath together.",
"Breathe in slowly, and let it out even slower.",
"Picture one grown-up you trust: a parent, a relative, a coach, or your school counselor.",
{
"t": "Now say this out loud: someone online is scaring me, and I need help.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help is here",
"body": "Take It Down can help remove pictures. Not wanting to be alive: call or text 988. Danger right now: 911.",
"say": "A grown-up can help you report it. A tool called Take It Down can help get pictures taken off the internet. If it ever feels so heavy you don't want to be alive, call or text 988, any time. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "You have people with you in this.",
"sub": "The full guide has more, whenever you want it.",
"say": "You have people with you, and you are not in trouble. Telling a grown-up is the bravest, smartest move. The full guide has more, whenever you want it."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
},
"helper": {
"id": "as-g-pictures-helper",
"guide": "pictures",
"side": "helper",
"title": "Online Pressure and Pictures",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NCMEC: New sextortion data, 2025",
"https://www.missingkids.org/blog/2026/ncmec-releases-new-sextortion-data-2025"
],
[
"FBI: National alert on financial sextortion",
"https://www.fbi.gov/news/press-releases/fbi-and-partners-issue-national-public-safety-alert-on-financial-sextortion-schemes"
],
[
"NCMEC: Sextortion",
"https://www.missingkids.org/theissues/sextortion"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Online Pressure and Pictures",
"sub": "For the Grown-up",
"say": "If a middle schooler you love is being pressured or threatened over pictures online, this is for you. It's for you, too, if you want to get ahead of it. Your first words matter most."
},
{
"k": "card",
"title": "Say it before anything happens.",
"body": "\"If anyone threatens you with a picture, real or fake, come to me. You won't be in trouble.\"",
"say": "Say it before anything happens. If anyone threatens you with a picture, real or fake, come to me. You won't be in trouble. Say it more than once, in a calm voice, so they believe it."
},
{
"k": "big",
"h": "It has a name: sextortion.",
"sub": "And it is growing fast.",
"say": "This is called sextortion, and it's growing fast. In 2025 there were more than 50,000 reports of money-driven sextortion, about 137 a day. Offenders often pose as a girl the child's age. Boys are targeted most, and victims can be as young as 10. Fake AI images mean a child may never have sent a real photo."
},
{
"k": "card",
"title": "Shame is what they count on.",
"body": "Your calm first words help keep your child safe.",
"say": "Shame is what these criminals count on, and it can be dangerous. Kids have died by suicide after being threatened. That's why your first words matter most. Stay calm. Say they're not in trouble. Then act together."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"You are not in trouble. You did the right thing telling me.\"",
"\"We don't pay, and we don't reply. We report.\"",
"\"This happens to a lot of kids, and it can be fixed.\""
],
"say": "Words that help. You are not in trouble. You did the right thing telling me. We don't pay, and we don't reply. We report. And, this happens to a lot of kids, and it can be fixed."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "Calm and slow.",
"say": "Let's practice. Take a breath, and let your shoulders drop. Say it out loud, the way you would to them. You are not in trouble. You did the right thing telling me.",
"beats": [
"Let's practice.",
"Take a breath, and let your shoulders drop.",
"Say it out loud, the way you would to them.",
"You are not in trouble.",
{
"t": "You did the right thing telling me.",
"w": 10
}
]
},
{
"k": "flow",
"h": "Then act together",
"steps": [
[
"Stop replying",
"And never pay"
],
[
"Save the evidence",
"Messages, usernames, links"
],
[
"Report",
"CyberTipline and the FBI"
],
[
"Take It Down",
"To help remove images"
]
],
"say": "Then act together. Stop replying, and never pay. Save the evidence: messages, usernames, and account links, before anything is deleted. Report it to the CyberTipline at 1-800-843-5678, and to the FBI at 1-800-CALL-FBI. Then use Take It Down to help remove images.",
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
"h": "What to leave out",
"items": [
[
"Yelling or shaming",
"It teaches them to hide"
],
[
"Taking devices right then",
"It feels like punishment"
],
[
"Deleting first",
"Report before anything is gone"
],
[
"Paying",
"We report instead"
]
],
"say": "Some things are better left out. Yelling or shaming, which teaches them to hide. Taking devices in the moment, which feels like punishment for telling. Deleting messages before reporting. And paying the person threatening them. We report instead.",
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
"title": "If you are worried about safety",
"body": "Stay with them. Not wanting to be alive: call or text 988. Emergency: 911.",
"say": "Stay close in the days after. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency. The person threatening them is to blame, never your child."
},
{
"k": "big",
"h": "Stay calm. Act together.",
"sub": "The full guide has more, whenever you want it.",
"say": "You may feel furious or frightened. Let that out with another grown-up, away from your child, so they see you steady. Stay calm, and act together. The full guide has more, whenever you want it."
}
],
"crisis": [
"988: call or text, any time",
"911: danger right now"
]
}
},
{
"id": "porn",
"ring": "as-growing",
"title": "Pornography",
"you": {
"id": "as-g-porn-you",
"guide": "porn",
"side": "you",
"title": "Pornography",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Common Sense Media: Teens and Pornography",
"https://www.commonsensemedia.org/research/teens-and-pornography"
],
[
"NetSmartz",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Pornography",
"sub": "For You",
"say": "If you've seen porn online, by accident or because you were curious, this is for you. You're not in trouble, and you're not a bad kid."
},
{
"k": "big",
"h": "Lots of kids see it.",
"sub": "Often by accident.",
"say": "Porn means videos or pictures of people naked or having sex. It's easy to find on phones, games, and social media. Many kids see it by age 12, often by accident. Being curious about bodies and sex is a normal part of growing up."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Curious",
"Confused",
"Grossed out",
"Embarrassed"
],
"say": "Seeing it might leave you curious, confused, grossed out, or embarrassed. Maybe a mix of all of those. Those feelings make sense. Seeing it doesn't make you a bad person."
},
{
"k": "card",
"title": "Porn is a performance.",
"body": "Real love is kind, and nobody gets pressured.",
"say": "Here's something true. Porn is made to sell. It's a performance, not how real love, respect, or bodies work. Real love is kind, and nobody gets pressured."
},
{
"k": "points",
"h": "What you can do",
"items": [
[
"Close it",
"Look away, put the screen down"
],
[
"Talk to a grown-up",
"A parent, a relative, a counselor"
],
[
"Tell today",
"If someone sends it or asks for pictures"
]
],
"say": "Here's what you can do. If something pops up, close it and look away. Talk to a grown-up you trust, like a parent, a relative, or your school counselor. If anyone sends you porn, or asks you for pictures, that's not okay, and it's not your fault. Tell a grown-up today, so they can help. And if you keep going back to it and it's hard to stop, a grown-up can help with that too.",
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
"h": "Who could you tell?",
"sub": "Picture them now.",
"say": "Let's take a breath together. Breathe in slowly, and let it out even slower. Picture one grown-up you trust. Now say this out loud: I saw something online that bothered me.",
"beats": [
"Let's take a breath together.",
"Breathe in slowly, and let it out even slower.",
"Picture one grown-up you trust.",
{
"t": "Now say this out loud: I saw something online that bothered me.",
"w": 10
}
]
},
{
"k": "big",
"h": "Your questions are normal.",
"sub": "The full guide has more, whenever you want it.",
"say": "Questions about bodies, love, and sex are normal. A grown-up you trust is a much better place to ask them than the internet. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-porn-helper",
"guide": "porn",
"side": "helper",
"title": "Pornography",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Common Sense Media: Teens and Pornography",
"https://www.commonsensemedia.org/research/teens-and-pornography"
],
[
"NetSmartz",
"https://www.missingkids.org/netsmartz"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Pornography",
"sub": "For the Grown-up",
"say": "If you're wondering how to talk with a middle schooler about pornography, or you just found out they've seen it, this is for you. Take a breath. Kids come back to a grown-up who stays calm."
},
{
"k": "big",
"h": "Many kids see it by age 12.",
"sub": "Often by accident.",
"say": "Pornography is easy to find on phones, games, and social media, and middle schoolers are curious about sex. Many kids see it by age 12, often by accident. Seeing it doesn't make your child bad, and curiosity is normal. So talk before it happens, or right after."
},
{
"k": "points",
"h": "What porn teaches",
"items": [
[
"Sex is about using people"
],
[
"Pressure is normal"
],
[
"Bodies should look a certain way"
]
],
"say": "But porn teaches things you probably don't want them learning. That sex is about using people. That pressure is normal. And that bodies should look a certain way. Your voice can teach something truer.",
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
"\"Have you ever seen videos or pictures of people having sex online? You're not in trouble.\"",
"\"Porn is made to sell. Real love is kind, and nobody gets pressured.\"",
"\"If you ever see something that bothers you, come to me. I won't freak out.\""
],
"say": "Words that help. Have you ever seen videos or pictures of people having sex online? You're not in trouble. Porn is made to sell. Real love is kind, and nobody gets pressured. If you ever see something that bothers you, come to me. I won't freak out."
},
{
"k": "card",
"title": "Short, calm, and true to your values.",
"body": "Talk early, and more than once.",
"say": "Talk early, and more than once. Keep it short, calm, and true to your values. Many families and faith traditions hold clear beliefs about sex, love, and faithfulness. Share yours warmly. Many short talks do more than one big one."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "Calm and warm.",
"say": "Let's practice. Take a breath, and let your face soften. Say it out loud, the way you would to them. If you ever see something that bothers you, come to me. I won't freak out.",
"beats": [
"Let's practice.",
"Take a breath, and let your face soften.",
"Say it out loud, the way you would to them.",
"If you ever see something that bothers you, come to me.",
{
"t": "I won't freak out.",
"w": 10
}
]
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Taking every device forever",
"Kids learn to hide, not to tell"
],
[
"Shaming",
"Bodies and curiosity are normal"
],
[
"Counting on filters alone",
"Filters still need your talks"
]
],
"say": "Some things are better left out. Taking every device forever, because kids learn to hide, not to tell. Shaming them, or calling their body or curiosity dirty. And assuming filters are enough. Filters help, and they still need your talks.",
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
"title": "When to get more help",
"body": "Can't seem to stop: their doctor or a counselor. Someone sending it or showing it: report it.",
"say": "Get help if your child keeps going back to it and can't seem to stop. Their doctor or a counselor is a good place to start. If someone is showing it to them, that's serious. An adult or older kid showing porn to a child can be a form of abuse. If your child tells you, stay calm, believe them, and get help the same day. Report anyone who sends sexual images to a child, or asks a child for them, to the CyberTipline at 1-800-843-5678."
},
{
"k": "big",
"h": "Stay calm. Keep talking.",
"sub": "The full guide has more, whenever you want it.",
"say": "This talk can stir up your own discomfort, or your own history. That's okay. Talk it through with another grown-up first if that helps. Stay calm, and keep talking. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "vaping",
"ring": "as-growing",
"title": "Vaping, Nicotine Pouches, and Being Offered Things",
"you": {
"id": "as-g-vaping-you",
"guide": "vaping",
"side": "you",
"title": "Vaping, Nicotine Pouches, and Being Offered Things",
"sideName": "For You",
"mins": 3,
"sources": [
[
"CDC: Protecting youth",
"https://www.cdc.gov/tobacco/e-cigarettes/protecting-youth.html"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Vaping, Nicotine Pouches, and Being Offered Things",
"sub": "For You",
"say": "If someone has offered you a vape, a nicotine pouch, or something else, this is for you. Or maybe you've just wondered about it. Lots of kids your age have been there."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Curious",
"Pressured",
"Worried about fitting in",
"Not sure what to say"
],
"say": "Maybe a friend or an older kid offered you something. Maybe you saw it at school, or in a video. You might feel curious, or pressured. You might worry about fitting in, or not know what to say. All of that is normal."
},
{
"k": "card",
"title": "Your brain is still growing.",
"body": "Nicotine hooks a growing brain fast.",
"say": "Here's something true. Your brain keeps growing until you're about twenty-five. Nicotine hooks a growing brain fast. Sweet flavors can make it seem harmless, and pouches have nicotine too. Knowing that helps you choose."
},
{
"k": "points",
"h": "Easy ways to say no",
"items": [
[
"\"No thanks, I'm good.\"",
"Short and calm"
],
[
"\"My mom would kill me.\"",
"Blame a grown-up"
],
[
"Change the subject",
"Or walk away"
]
],
"say": "You don't need a big speech to say no. Try, no thanks, I'm good. You can always blame a grown-up: my mom would kill me. Or change the subject, or walk away. You can say no and still belong.",
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
"h": "Pick your line.",
"sub": "Say it out loud.",
"say": "Let's practice. Take a slow breath. Pick the line that sounds most like you. Now say it out loud, like you mean it.",
"beats": [
"Let's practice.",
"Take a slow breath.",
"Pick the line that sounds most like you.",
{
"t": "Now say it out loud, like you mean it.",
"w": 10
}
]
},
{
"k": "card",
"title": "If you already tried it",
"body": "Tell a grown-up you trust. Teens can text DITCHVAPE to 88709.",
"say": "If you've already tried something, or you're finding it hard to stop, you're still a good kid. Tell a grown-up you trust: a parent, a coach, a teacher, or your school counselor. Asking for help to quit is brave. Teens can also text DITCHVAPE to 88709 for help quitting."
},
{
"k": "big",
"h": "You get to choose.",
"sub": "The full guide has more, whenever you want it.",
"say": "It's your body and your brain, and you get to choose. Keep a few good grown-ups close. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-vaping-helper",
"guide": "vaping",
"side": "helper",
"title": "Vaping, Nicotine Pouches, and Being Offered Things",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"FDA: 2025 National Youth Tobacco Survey findings",
"https://www.fda.gov/tobacco-products/ctp-newsroom/national-youth-tobacco-survey-fda-publishes-peer-reviewed-journal-article-releases-2025-findings"
],
[
"CDC: Protecting youth",
"https://www.cdc.gov/tobacco/e-cigarettes/protecting-youth.html"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Vaping, Nicotine Pouches, and Being Offered Things",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is being offered vapes, nicotine pouches, or other things, this is for you. You don't need a speech. You need a good question, and a calm voice."
},
{
"k": "big",
"h": "Offered by friends.",
"sub": "Often older kids. Often sweet flavors.",
"say": "Middle schoolers are often offered these things by older kids or by friends. Youth tobacco use keeps falling overall, which is good news. But nicotine pouches have doubled in just a few years. Flavors are a big draw."
},
{
"k": "card",
"title": "Start with a question.",
"body": "\"What have you seen at school?\"",
"say": "Skip the we need to talk opener. Start with something you see together, like an ad or a news story, and ask what they think. What have you seen at school? What do kids at your school use? Then stay curious, and listen more than you talk."
},
{
"k": "card",
"title": "Short and true",
"body": "The brain keeps developing until about 25.",
"say": "When you explain, keep it short and true. The brain keeps developing until about age twenty-five, and nicotine hooks a growing brain fast. Name the pouches too, not just vapes. Scare tactics and long lectures tend to shut kids down. Plain facts and a calm voice keep them talking."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What do kids at your school use?\"",
"\"You can always blame me.\"",
"\"If you ever want to quit, I'll help, not punish.\""
],
"say": "Words that help. What do kids at your school use? You can always blame me: just say, my mom would kill me. And, if you ever want to quit something, I'll help, not punish."
},
{
"k": "flow",
"h": "Practice saying no",
"steps": [
[
"Pick a line",
"Short and easy"
],
[
"Say it out loud",
"Together, a few times"
],
[
"Plan a way out",
"A text, a code word, a ride"
]
],
"say": "Practice a few easy no lines they can use without losing face. Let them pick the line. Say it out loud together a few times, even if it feels silly. And plan a way out: a text to you, or a code word that means come get me.",
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
"h": "Try it now.",
"sub": "Your calm is the message.",
"say": "Take a slow breath. Picture your middle schooler beside you. Now say this out loud: if you ever want to quit something, I'll help, not punish.",
"beats": [
"Take a slow breath.",
"Picture your middle schooler beside you.",
{
"t": "Now say this out loud: if you ever want to quit something, I'll help, not punish.",
"w": 10
}
]
},
{
"k": "card",
"title": "If they already use",
"body": "Stay calm. Talk with their doctor. Teens can text DITCHVAPE to 88709.",
"say": "If you learn they're already using, stay calm and keep the door open. Nicotine is hard to quit, and needing help is no failure. Talk with their doctor about quitting. Teens can text DITCHVAPE to 88709 for support. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency."
},
{
"k": "card",
"title": "They watch you too.",
"body": "Be honest about your own habits.",
"say": "Kids watch what we do more than what we say. If you vape or smoke, be honest about how hard quitting is, and let them see you try. And look after yourself too. Talk with another grown-up you trust."
},
{
"k": "big",
"h": "Ask. Listen. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Ask good questions, listen more than you lecture, and stay close. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "gambling",
"ring": "as-growing",
"title": "Gambling, Betting, and Loot Boxes",
"you": {
"id": "as-g-gambling-you",
"guide": "gambling",
"side": "you",
"title": "Gambling, Betting, and Loot Boxes",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Minnesota Alliance on Problem Gambling",
"https://mnapg.org"
],
[
"National Council on Problem Gambling",
"https://www.ncpgambling.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Gambling, Betting, and Loot Boxes",
"sub": "For You",
"say": "If you've bought a loot box, bet game skins, played a casino-style game, or watched friends bet on sports, this is for you. Lots of kids your age have."
},
{
"k": "words",
"h": "It might not feel like gambling",
"items": [
"Loot boxes",
"Skin betting",
"Casino-style games",
"Sports bets"
],
"say": "It might not feel like gambling. It feels like part of the game. But when you pay real money for a chance to win something, that's gambling. Lots of kids do it without calling it that."
},
{
"k": "card",
"title": "The game is built to win.",
"body": "Near-misses are designed to keep you playing.",
"say": "Here's how it works. These games and apps are built so the house wins over time. That's how they make money. And that almost-won feeling? Near-misses are designed on purpose, to keep you playing."
},
{
"k": "points",
"h": "Notice the signs",
"items": [
[
"Spending more than you planned",
"Money or gift cards"
],
[
"Trying to win it back",
"One more try"
],
[
"Big moods",
"Tied to a game or a score"
]
],
"say": "Notice the signs in yourself. Spending more than you planned, or using gift cards that weren't meant for this. Trying to win back what you lost. Big moods that ride on a game or a score.",
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
"h": "Who could you tell?",
"sub": "Picture them now.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Think about how games and money feel for you right now. Now picture one grown-up you could talk to about it.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Think about how games and money feel for you right now.",
{
"t": "Now picture one grown-up you could talk to about it.",
"w": 10
}
]
},
{
"k": "card",
"title": "If it's hard to stop",
"body": "Tell a grown-up you trust. Gambling problems are treatable.",
"say": "If it's hard to stop, or money is gone that you can't pay back, you're not a bad kid. Tell a grown-up you trust: a parent, a coach, a teacher, or your school counselor. Gambling problems are treatable, and helping with the money part is a grown-up job."
},
{
"k": "big",
"h": "Play for fun. Keep your money.",
"sub": "The full guide has more, whenever you want it.",
"say": "Games are for fun, and you can enjoy them without betting. Talk with a grown-up whenever it stops feeling fun. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-gambling-helper",
"guide": "gambling",
"side": "helper",
"title": "Gambling, Betting, and Loot Boxes",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Minnesota Alliance on Problem Gambling",
"https://mnapg.org"
],
[
"National Council on Problem Gambling",
"https://www.ncpgambling.org"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Gambling, Betting, and Loot Boxes",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is buying loot boxes, betting game skins, or watching sports betting ads, this is for you. You don't need to know every game. You need curiosity, and a calm voice."
},
{
"k": "big",
"h": "Gambling lives in games now.",
"sub": "Often without anyone calling it that.",
"say": "Many middle schoolers have already tried something like gambling, often without calling it that. Paying for loot boxes. Trading or betting game skins. Playing casino-style games. And sports betting ads are everywhere during the games they watch."
},
{
"k": "card",
"title": "Start with a question.",
"body": "\"Have you ever bought a loot box or bet on anything in a game?\"",
"say": "Start with a question, not a warning. Have you ever bought a loot box or bet on anything in a game? Ask what they see their friends doing. Then listen. Kids talk more when they don't expect a lecture."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Those games are designed so you lose more than you win.\"",
"\"What do the ads leave out?\"",
"\"If you can't stop, tell me. We'll figure it out.\""
],
"say": "Words that help. Those games are designed so you lose more than you win. That's how they make money. When an ad comes on, ask what it leaves out. And, if you ever feel like you can't stop, tell me. We'll figure it out."
},
{
"k": "points",
"h": "Set it up at home",
"items": [
[
"Spending limits",
"On every device"
],
[
"Check purchases",
"And gift cards"
],
[
"Gifts without bets",
"Lottery tickets stay grown-up"
]
],
"say": "Set things up at home. Turn on spending limits on every device. Check purchases and gift cards together. And keep bets and lottery tickets out of gifts and treats for kids. It teaches that gambling is a normal treat.",
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
"title": "Warning signs",
"body": "Missing money. Secret spending. Moods tied to scores. Chasing losses.",
"say": "Know the warning signs. Missing money or gift cards. Secrecy about spending. Big mood swings tied to games or scores. Trying to win back losses. Kids who gamble young are more likely to have gambling problems later, so take it seriously, and calmly."
},
{
"k": "big",
"h": "Try it now.",
"sub": "Calm makes it safe to tell you.",
"say": "Take a slow breath. Picture your middle schooler, maybe with a game in their hands. Now say this out loud: if you ever feel like you can't stop, tell me.",
"beats": [
"Take a slow breath.",
"Picture your middle schooler, maybe with a game in their hands.",
{
"t": "Now say this out loud: if you ever feel like you can't stop, tell me.",
"w": 10
}
]
},
{
"k": "card",
"title": "If money is missing",
"body": "Minnesota: 1-800-333-4673 or text HOPE to 53342. Elsewhere: 1-800-GAMBLER.",
"say": "If money is missing, or they can't stop, get help. Gambling problems are treatable. In Minnesota, call the Problem Gambling Helpline at 1-800-333-4673, or text HOPE to 53342. Outside Minnesota, call 1-800-GAMBLER. Help is there for families too. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency."
},
{
"k": "card",
"title": "They watch you too.",
"body": "How you talk about bets and luck teaches them.",
"say": "Kids watch how we talk about bets, games, and luck. If you bet, be honest about the house winning over time. And if a child's gambling has cost your family money, it's okay to be upset. Get support for yourself, and keep the money worries between the grown-ups."
},
{
"k": "big",
"h": "Curious, calm, and clear.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay curious, stay calm, and be clear about how these games work. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "ai",
"ring": "as-growing",
"title": "AI Chatbots and Companions",
"you": {
"id": "as-g-ai-you",
"guide": "ai",
"side": "you",
"title": "AI Chatbots and Companions",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Common Sense Media: How and why teens use AI companions",
"https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions"
],
[
"Common Sense Media: 2026 census on AI use by tweens and teens",
"https://www.commonsensemedia.org/press-releases/common-sense-media-releases-inaugural-annual-study-on-ai-use-by-tweens-and-teens"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "AI Chatbots and Companions",
"sub": "For You",
"say": "If you use AI for homework, for fun, or just to talk, this is for you. Most kids your age use it. Let's talk about how to use it well."
},
{
"k": "points",
"h": "What AI is",
"items": [
[
"It can be helpful",
"For ideas and questions"
],
[
"It can be wrong",
"Even when it sounds sure"
],
[
"It is not a person",
"Even when it sounds caring"
]
],
"say": "AI can be really helpful, for ideas and questions. It can also be wrong, even when it sounds sure. And it can sound caring, but it isn't a person. It doesn't know you or love you the way people do.",
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
"title": "It's built to keep you chatting.",
"body": "That is how the app wins. You get to choose.",
"say": "Here's something to know. Many chatbots are built to keep you chatting as long as possible. Companion apps, the ones that act like a friend or a boyfriend or girlfriend, are best kept for grown-ups, not kids. You get to choose when to close the app."
},
{
"k": "big",
"h": "Real feelings go to a real person first.",
"sub": "Feelings, health, and body questions.",
"say": "Here's a good rule. Questions about your feelings, your health, or your body go to a real person first. A parent, a relative, a coach, a teacher, your school counselor, or your doctor. People can know you, and help in ways a chatbot can't."
},
{
"k": "big",
"h": "Who is your person?",
"sub": "Picture them now.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Think of one thing you might ask a chatbot. Now picture the grown-up you could ask instead.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Think of one thing you might ask a chatbot.",
{
"t": "Now picture the grown-up you could ask instead.",
"w": 10
}
]
},
{
"k": "card",
"title": "A chatbot is not a crisis line.",
"body": "Call or text 988. Danger right now: 911.",
"say": "If you ever feel like you don't want to be alive, or someone is hurting you, a chatbot is the wrong place to go. Tell a grown-up you trust today. You can call or text 988 any time. If you're in danger right now, call 911."
},
{
"k": "big",
"h": "Use the tool. Keep your people.",
"sub": "The full guide has more, whenever you want it.",
"say": "AI is a tool, and you can use it well. Keep your people close for the things that matter most. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-ai-helper",
"guide": "ai",
"side": "helper",
"title": "AI Chatbots and Companions",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Common Sense Media: How and why teens use AI companions",
"https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions"
],
[
"Common Sense Media: 2026 census on AI use by tweens and teens",
"https://www.commonsensemedia.org/press-releases/common-sense-media-releases-inaugural-annual-study-on-ai-use-by-tweens-and-teens"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "AI Chatbots and Companions",
"sub": "For the Grown-up",
"say": "When a middle schooler you love uses AI chatbots, for school, for fun, or to talk about their life, this is for you. You don't need to be a tech expert. You need to ask, and keep talking."
},
{
"k": "big",
"h": "AI is everywhere for kids now.",
"sub": "For homework, health questions, and feelings.",
"say": "AI is everywhere for kids now. Most kids ages nine to seventeen use it. Many ask it about their health or their body, and many talk to it about feelings. Younger teens tend to trust its advice more than older teens do. And nearly half say no parent has talked with them about using it safely."
},
{
"k": "card",
"title": "Start with curiosity.",
"body": "\"Which AI do you use? What do you ask it?\"",
"say": "Start with curiosity, not a ban. Which AI do you use? What do you ask it? Show me what you like using it for. Let them teach you. You'll learn a lot, and they'll keep talking."
},
{
"k": "points",
"h": "What to explain",
"items": [
[
"It is not a person",
"Even when it sounds caring"
],
[
"It can be wrong",
"Even when it sounds sure"
],
[
"It wants your time",
"Built to keep you chatting"
]
],
"say": "Then explain three things. AI can sound caring, but it isn't a person. It can be wrong, even when it sounds sure. And it's built to keep you chatting.",
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
"title": "Companion apps",
"body": "Apps built to act like a friend or partner are best kept for grown-ups.",
"say": "Companion apps are different. They're built to act like a friend or a partner, and experts recommend no one under eighteen use them. You don't need to ban all AI, since it's built into school tools and search. Talk about it the way you'd talk about any new friend. Who is this? What do they want? Do they have your best interest at heart?"
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"AI can be helpful, but it doesn't love you, and it can be wrong.\"",
"\"I want to hear it before a chatbot does.\""
],
"say": "Words that help. AI can be helpful, but it doesn't love you, and it can be wrong. And, if something is bothering you, I want to hear it before a chatbot does. Skip the mocking. Kids who feel judged for using AI just stop telling you."
},
{
"k": "flow",
"h": "A family agreement",
"steps": [
[
"People first",
"For feelings, health, and body"
],
[
"Where it lives",
"Shared spaces, not late at night"
],
[
"Check in",
"Look at it together sometimes"
]
],
"say": "Make a family agreement together. Feelings, health, and body questions go to a person first. Decide where AI gets used, like shared spaces, and not late at night. And check in by looking at it together sometimes. Follow the agreement yourself too, because they're watching.",
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
"h": "Try it now.",
"sub": "Warm, and out loud.",
"say": "Take a slow breath. Picture your middle schooler, phone in hand. Now say this out loud: if something is bothering you, I want to hear it before a chatbot does.",
"beats": [
"Take a slow breath.",
"Picture your middle schooler, phone in hand.",
{
"t": "Now say this out loud: if something is bothering you, I want to hear it before a chatbot does.",
"w": 10
}
]
},
{
"k": "card",
"title": "A chatbot is not a crisis line.",
"body": "Not wanting to be alive: call or text 988. Emergency: 911.",
"say": "Make sure they know a chatbot is not a crisis line. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency. Look after yourself too. This is new for every parent, and it's okay to learn as you go."
},
{
"k": "big",
"h": "Ask, explain, and stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Ask what they use, explain how it works, and stay close enough to hear it first. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sleep",
"ring": "as-growing",
"title": "Sleep, Screens, and Gaming",
"you": {
"id": "as-g-sleep-you",
"guide": "sleep",
"side": "you",
"title": "Sleep, Screens, and Gaming",
"sideName": "For You",
"mins": 3,
"sources": [
[
"HealthyChildren.org: Healthy sleep habits",
"https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx"
],
[
"Minnesota Department of Health: 2025 Minnesota Student Survey",
"https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Sleep, Screens, and Gaming",
"sub": "For You",
"say": "If you're tired a lot, or it's hard to put the screen down at night, this is for you. Lots of kids your age feel the same way."
},
{
"k": "words",
"h": "Tired is real",
"items": [
"Grumpy",
"Foggy in class",
"Wired at night",
"Wiped out all day"
],
"say": "Being tired is real. You might feel grumpy, or foggy in class. You might feel wired at night and wiped out all day. Your body and brain are growing fast right now, and growing takes a lot of sleep."
},
{
"k": "points",
"h": "How much sleep?",
"items": [
[
"Up to age 12",
"9 to 12 hours a night"
],
[
"Age 13 and up",
"8 to 10 hours a night"
],
[
"Teens",
"Need more sleep, not less"
]
],
"say": "So how much sleep do you need? Up to age 12, about 9 to 12 hours a night. From 13 on, about 8 to 10. Teens need more sleep, not less.",
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
"title": "Screens are built to keep you going.",
"body": "One more video. One more round. That part is on purpose.",
"say": "Screens can be great. Games are fun, and group chats keep you close to friends. But apps and games are built to keep you going: one more video, one more round. That part is on purpose. So it helps to have a plan."
},
{
"k": "points",
"h": "Things that help",
"items": [
[
"Charge it outside your room",
"Kitchen, hallway, anywhere"
],
[
"Pick a screens-off time",
"Together with your family"
],
[
"Use the built-in timer",
"Let the timer say when"
],
[
"Wind down",
"Music, a book, a shower"
]
],
"say": "Here are things that help. Charge your phone outside your bedroom, like in the kitchen or the hallway. Pick a screens-off time for school nights, with your family. Use the timer built into your game or phone, and let the timer say when. And wind down with something calm, like music, a book, or a warm shower.",
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
"h": "What time could work?",
"sub": "Pick it. Then picture who you could tell.",
"say": "Let's try something. Breathe in slowly, and let it out even slower. Think of a screens-off time that could really work for you on school nights. Now picture the grown-up you could talk it over with.",
"beats": [
"Let's try something.",
"Breathe in slowly, and let it out even slower.",
"Think of a screens-off time that could really work for you on school nights.",
{
"t": "Now picture the grown-up you could talk it over with.",
"w": 10
}
]
},
{
"k": "card",
"title": "Who to talk to",
"body": "A parent, a relative, a coach, your school counselor, your doctor.",
"say": "Talk it over with a grown-up you trust: a parent, a relative, a coach, or your school counselor. If you're tired most days, even after a full night in bed, or you lie awake worrying night after night, tell a parent and see your doctor."
},
{
"k": "big",
"h": "Rest helps you grow.",
"sub": "The full guide has more, whenever you want it.",
"say": "Sleep is when your body and brain grow and get ready for tomorrow. Rest helps you grow. Be gentle with yourself tonight. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-sleep-helper",
"guide": "sleep",
"side": "helper",
"title": "Sleep, Screens, and Gaming",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"HealthyChildren.org: Healthy sleep habits",
"https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx"
],
[
"Minnesota Department of Health: 2025 Minnesota Student Survey",
"https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Sleep, Screens, and Gaming",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is up too late, glued to a screen, or tired all the time, this is for you. You don't need to win every argument. A plan you make together goes further."
},
{
"k": "big",
"h": "Teens need more sleep.",
"sub": "9 to 12 hours up to age 12. 8 to 10 from 13 on.",
"say": "Kids need 9 to 12 hours of sleep a night up to age 12, and 8 to 10 hours from 13 on. Teens need more sleep, not less, even as their body clocks start to run later. A tired middle schooler can look moody, foggy, or anxious, when what they really need is rest."
},
{
"k": "card",
"title": "Late-night screens are sleep thieves.",
"body": "Plenty of teens are online after midnight on school nights.",
"say": "Late-night screens are one of the biggest sleep thieves. Plenty of teens are on their phones between midnight and five in the morning on school nights. A phone in the bedroom makes that easy: one more video, one more message, one more round."
},
{
"k": "big",
"h": "Look at what gaming replaces.",
"sub": "Look at what it pushes out.",
"say": "Look at what gaming replaces: sleep, homework, meals, movement, and time with family. That turns a fight about gaming into a plan for what matters."
},
{
"k": "flow",
"h": "Make a plan together",
"steps": [
[
"A charging station",
"Outside bedrooms, for everyone"
],
[
"A screens-off time",
"They help choose it"
],
[
"Built-in timers",
"Let the timer say when"
],
[
"Steady weekends",
"Close to weekdays"
]
],
"say": "Make a plan together. Set up a family charging station outside the bedrooms, for everyone. Agree on a screens-off time for school nights, and let them help choose it. Use the timers built into games and phones, so the timer says when, not you. And keep weekends fairly close to weekdays. Wildly different schedules make Monday mornings harder.",
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
"\"Let's all charge our phones in the kitchen, me too.\"",
"\"What time do you want screens off on school nights?\"",
"\"How do you feel on days you sleep more?\""
],
"say": "Words that help. Let's all charge our phones in the kitchen, me too. What time do you want screens off on school nights? How do you feel on days you sleep more? Questions like these help them notice for themselves."
},
{
"k": "card",
"title": "You go first.",
"body": "If your phone sleeps in the kitchen, theirs can too.",
"say": "Kids watch what we do more than what we say. If your phone sleeps in the kitchen, theirs can too. Put yours down at dinner, and let them see you wind down at night. That does more than any lecture."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "Try the first line now.",
"say": "Take a breath. Picture your middle schooler at the end of a long day. Now say this out loud, the way you would to them: what time do you want screens off on school nights?",
"beats": [
"Take a breath.",
"Picture your middle schooler at the end of a long day.",
{
"t": "Now say this out loud, the way you would to them: what time do you want screens off on school nights?",
"w": 10
}
]
},
{
"k": "card",
"title": "When to call the doctor",
"body": "Tired most days, or awake with worry night after night.",
"say": "If they're tired most days even after a full night in bed, or they lie awake worrying night after night, talk with their doctor. If worry or low mood is keeping them up, the school counselor can help too. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency. And get some rest yourself. You matter too."
},
{
"k": "big",
"h": "Rest is a family thing.",
"sub": "The full guide has more, whenever you want it.",
"say": "Rest is something a family does together. Make the plan, keep it kind, and go first. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "looks",
"ring": "as-growing",
"title": "Not Liking How You Look",
"you": {
"id": "as-g-looks-you",
"guide": "looks",
"side": "you",
"title": "Not Liking How You Look",
"sideName": "For You",
"mins": 3,
"sources": [
[
"AAP: Concerning eating disorder content",
"https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/concerning-eating-disorder-content/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Not Liking How You Look",
"sub": "For You",
"say": "If you don't like how you look, or you've been picking yourself apart in the mirror, this is for you. Lots of kids your age feel this way."
},
{
"k": "words",
"h": "Lots of kids feel this",
"items": [
"Embarrassed",
"Self-conscious",
"Not good enough",
"Worried what others think"
],
"say": "You might feel embarrassed, or self-conscious. You might feel like you're not good enough, or worry about what everyone else thinks. Middle school puts a spotlight on looks, and bodies change on their own schedule. Those feelings are common, and they make sense."
},
{
"k": "card",
"title": "Your feed is a highlight reel.",
"body": "Filters, angles, and best shots. Not real life.",
"say": "A lot of what you see online is filtered, posed, or edited. People share their best angle on their best day. When you compare your real life to that, anyone would come up short. Your feed is not a mirror."
},
{
"k": "points",
"h": "Notice how it feels",
"items": [
[
"After scrolling",
"Better, or worse?"
],
[
"Unfollow or mute",
"What makes you feel worse"
],
[
"Follow more",
"Things you love to do"
]
],
"say": "Try noticing how you feel after scrolling. Better, or worse? If an account makes you feel worse about yourself, unfollow it or mute it. And fill your feed with things you love: music, art, sports, animals, funny stuff.",
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
"h": "Your body is your home.",
"sub": "Not a project.",
"say": "Here's something worth remembering. Your body is not a project. It's your home. It carries you through your day, and lets you laugh, run, hug, make things, and be with the people you love."
},
{
"k": "big",
"h": "What can your body do?",
"sub": "Name one thing. Then one thing about you.",
"say": "Let's try something. Take a slow breath in, and let it out. Name one thing your body helped you do this week. Now name one thing you like about who you are, something no picture shows.",
"beats": [
"Let's try something.",
"Take a slow breath in, and let it out.",
"Name one thing your body helped you do this week.",
{
"t": "Now name one thing you like about who you are, something no picture shows.",
"w": 10
}
]
},
{
"k": "card",
"title": "Who to talk to",
"body": "A parent, a relative, a coach, your school counselor, your doctor.",
"say": "Talk to a grown-up you trust: a parent, a relative, a coach, or your school counselor. If thoughts about your looks or food are taking up a lot of your day, tell a grown-up and see your doctor. If you ever have thoughts of not wanting to be alive, call or text 988, any time."
},
{
"k": "big",
"h": "You are more than how you look.",
"sub": "The full guide has more, whenever you want it.",
"say": "You are so much more than how you look. Your kindness, your effort, your humor, the way you show up for people. Be gentle with yourself today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-looks-helper",
"guide": "looks",
"side": "helper",
"title": "Not Liking How You Look",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"AAP: Concerning eating disorder content",
"https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/concerning-eating-disorder-content/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Not Liking How You Look",
"sub": "For the Grown-up",
"say": "When a middle schooler you love doesn't like how they look, this is for you. You can't take away every hard feeling. You can make home a place where bodies are spoken about kindly."
},
{
"k": "big",
"h": "Looks matter a lot right now.",
"sub": "Changing bodies under a big spotlight.",
"say": "In middle school, bodies change fast and on different schedules, and looks suddenly matter a lot. Kids compare themselves to friends, to classmates, and to everyone on their screens. Not liking how they look is common at this age. How the grown-ups talk about bodies makes a real difference."
},
{
"k": "card",
"title": "Kids learn body talk from us.",
"body": "Including how we talk about our own bodies.",
"say": "Kids pick up how adults talk about bodies, including our own. Comments about size or shape, food rules, and calling foods good or bad teach them to judge. So does teasing, even playful teasing. Speak kindly about your own body out loud. They're listening."
},
{
"k": "points",
"h": "Praise what lasts",
"items": [
[
"Character",
"Kind, honest, brave, funny"
],
[
"Effort",
"How hard they tried"
],
[
"What bodies can do",
"Run, build, dance, hug"
]
],
"say": "Praise what lasts. Their character: kind, honest, brave, funny. Their effort: how hard they tried, and how they kept going. And what their body can do: run, build, dance, play music, hug a little brother. Praise like that says far more than any comment on looks.",
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
"\"Your body is not a project. It's your home.\"",
"\"I love how strong you are when you play.\"",
"\"Where did that idea about your body come from?\""
],
"say": "Words that help. Your body is not a project. It's your home. I love how strong you are when you play. And when they say something harsh about themselves, get curious. Where did that idea about your body come from? What did you see that made you feel that way?"
},
{
"k": "words",
"h": "Leave these out",
"items": [
"Comments on size or shape",
"Praising weight loss",
"Calling foods good or bad"
],
"say": "And try not to comment on size or shape, even kindly. Never praise weight loss, theirs or anyone's. Skip calling foods good or bad. Those habits teach kids that their worth depends on their body."
},
{
"k": "card",
"title": "Help them shape their feed.",
"body": "\"Which accounts make you feel good? Which ones don't?\"",
"say": "Content that pushes an ideal body is linked with worse body image. You don't have to take their phone. Sit with them, ask how certain accounts make them feel, and help them unfollow what drags them down. Then fill their world with other reasons they're valued: their friends, their talents, their kindness."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "Something no picture shows.",
"say": "Take a breath. Think of one thing you love about your middle schooler that has nothing to do with looks. Now say it out loud, the way you would to them.",
"beats": [
"Take a breath.",
"Think of one thing you love about your middle schooler that has nothing to do with looks.",
{
"t": "Now say it out loud, the way you would to them.",
"w": 10
}
]
},
{
"k": "card",
"title": "When to call the doctor",
"body": "Skipped meals, hidden food, or worry that takes over.",
"say": "If you notice skipped meals, hidden food, exercise that seems driven, or worry about looks that takes over their day, talk with their doctor this week. Aspen's guide Eating, Food, and Weight Worries has more. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency. And be gentle with your own body too."
},
{
"k": "big",
"h": "Loved as they are.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your child is loved as they are, and they need to hear it. Praise who they are, speak kindly about bodies, and keep the door open. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "eating",
"ring": "as-growing",
"title": "Eating, Food, and Weight Worries",
"you": {
"id": "as-g-eating-you",
"guide": "eating",
"side": "you",
"title": "Eating, Food, and Weight Worries",
"sideName": "For You",
"mins": 3,
"sources": [
[
"ANAD",
"https://anad.org"
],
[
"National Alliance for Eating Disorders",
"https://www.allianceforeatingdisorders.com"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Eating, Food, and Weight Worries",
"sub": "For You",
"say": "If food, eating, or how your body looks has been on your mind a lot lately, this is for you. You are not in trouble, and you have people with you."
},
{
"k": "big",
"h": "Your body is supposed to change right now.",
"sub": "Every body grows on its own schedule.",
"say": "Middle school brings a lot of body changes, and a lot of messages about bodies, online and at school. Your body is supposed to grow and change right now. Every body grows on its own schedule."
},
{
"k": "points",
"h": "Signs to tell someone",
"items": [
[
"Food rules",
"That feel hard to break"
],
[
"Skipping meals",
"Or hiding food"
],
[
"Worry or guilt",
"Before or after eating"
],
[
"Thoughts that won't quit",
"About food or your body"
]
],
"say": "Sometimes worries about food grow bigger than they should. You might have food rules that feel hard to break. You might skip meals, or hide food. You might feel worried or guilty before or after eating. Or thoughts about food and your body might not quit. If any of that sounds familiar, it's a sign to tell someone.",
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
"title": "This is not your fault.",
"body": "It can happen to anyone, in any kind of body. Help works.",
"say": "If that's you, it is not your fault, and it is not a choice you made. Problems with eating can happen to anyone, in any kind of body. They are real health problems, and help works. The sooner you get help, the easier it is."
},
{
"k": "points",
"h": "Tell a grown-up you trust",
"items": [
[
"A parent or relative",
"At home"
],
[
"The school counselor",
"Any day"
],
[
"A teacher or coach",
"Someone you trust"
],
[
"Your doctor",
"Who helps your body be okay"
]
],
"say": "Tell a grown-up you trust. A parent or relative. The school counselor. A teacher or coach. Or your doctor, whose job is to make sure your body is okay. You can be honest with them.",
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
"h": "Practice the words",
"items": [
"I've been having a hard time with food, and I need help."
],
"sub": "Quietly or out loud.",
"say": "Let's practice. Picture that grown-up's face. Take a slow breath. Now say this, quietly or out loud. I've been having a hard time with food, and I need help.",
"beats": [
"Let's practice.",
"Picture that grown-up's face.",
"Take a slow breath.",
"Now say this, quietly or out loud.",
{
"t": "I've been having a hard time with food, and I need help.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help right now",
"body": "Fainting, chest pain, or confusion: get a grown-up and call 911. Thoughts of not wanting to be alive: call or text 988.",
"say": "If you ever faint, have chest pain, or feel confused, get a grown-up and call 911. And if you have thoughts of hurting yourself, or of not wanting to be alive, call or text 988 any time, and tell a grown-up right away."
},
{
"k": "big",
"h": "You are so much more than a body.",
"sub": "Telling someone is a strong first step.",
"say": "You are so much more than a body. You are a whole person, with things you love and people who love you. Telling someone is a strong first step."
}
],
"crisis": [
"988: call or text, any time",
"911: fainting, chest pain, or confusion"
]
},
"helper": {
"id": "as-g-eating-helper",
"guide": "eating",
"side": "helper",
"title": "Eating, Food, and Weight Worries",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"ANAD",
"https://anad.org"
],
[
"National Alliance for Eating Disorders",
"https://www.allianceforeatingdisorders.com"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Eating, Food, and Weight Worries",
"sub": "For the Grown-up",
"say": "If you're worried about a middle schooler and food, eating, or weight, this is for you. You don't need to be sure before you act, and you are part of the solution."
},
{
"k": "big",
"h": "A medical illness, not a choice.",
"sub": "It can happen at any body size.",
"say": "Middle school brings a changing body, new comparisons, and a flood of food and body messages online. Most kids come through it okay. Some slide into restricting food, bingeing, purging, or rigid food rules. Eating disorders are medical illnesses, not choices. They can happen at any body size, and a child can be very sick and still look healthy."
},
{
"k": "points",
"h": "Watch for",
"items": [
[
"Skipped meals",
"Or \"I already ate\""
],
[
"Hidden food",
"Or food that goes missing"
],
[
"Bathroom trips",
"Right after eating"
],
[
"Exercise that looks driven",
"Hard to skip"
]
],
"say": "Watch for patterns. Skipped meals, or always having eaten already. Hidden food, or food that goes missing. Trips to the bathroom right after eating. And exercise that looks driven, hard to skip even when they're tired or sick.",
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
"h": "Start with their doctor this week.",
"sub": "Tell the doctor what you have seen.",
"say": "If you're worried, you don't need to be sure. Book a doctor visit this week, and tell the doctor what you have seen. For kids and teens, the strongest treatment puts parents at the center, with a team guiding. You did not cause this, and you can be a big part of the way through."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm not mad. I'm worried, and I love you.\"",
"\"Let's see the doctor and make sure your body is okay.\"",
"\"All kinds of food can fit.\""
],
"say": "Describe what you see, not their weight. Here are words that help. I've noticed dinner seems stressful. I'm not mad. I'm worried, and I love you. Then, let's see the doctor and make sure your body is okay. And at the table, all kinds of food can fit."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Weight comments",
"Even praise for losing it"
],
[
"Family diets",
"Or good and bad foods"
],
[
"Food fights at the table",
"On your own"
]
],
"say": "Some things are best left out. Comments about weight, even praise for losing it. Family diets, or calling foods good and bad. And fighting about food at the table on your own. Let the team guide that part.",
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
"h": "Practice the opening line.",
"sub": "Calm, private, and kind.",
"say": "Take a moment. Picture a calm, private time with your child. Breathe in slowly, and let it out. Now say it softly. I'm not mad. I'm worried, and I love you.",
"beats": [
"Take a moment.",
"Picture a calm, private time with your child.",
"Breathe in slowly, and let it out.",
"Now say it softly.",
"I'm not mad.",
{
"t": "I'm worried, and I love you.",
"w": 10
}
]
},
{
"k": "points",
"h": "At home",
"items": [
[
"Regular meals together",
"Neutral food talk"
],
[
"Drop diet talk",
"About anyone, yourself included"
],
[
"Praise who they are",
"Not how they look"
]
],
"say": "At home, keep meals regular and together, and keep food talk neutral. Drop diet talk and weight comments, including about yourself and other people. Kids hear all of it. Praise who they are, not how they look: their kindness, their humor, their effort.",
"cue": {
"at": [
0,
1,
3
]
}
},
{
"k": "card",
"title": "Fainting, chest pain, or confusion? Call 911.",
"body": "Thoughts of not wanting to be alive: stay with them and call or text 988.",
"say": "Some signs need help right away. Call 911 for fainting, chest pain, or confusion. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988. For support and treatment options, the ANAD Helpline is there on weekdays, and the full guide has the number."
},
{
"k": "big",
"h": "Who they are matters most.",
"sub": "Get support for yourself too.",
"say": "This can be frightening and exhausting. Get support for yourself too, from a friend, a counselor, or a parent support group. Stay calm, stay close, and let the team guide the medical part. The full guide has more, whenever you want it."
}
],
"crisis": [
"988: call or text, any time",
"911: fainting, chest pain, or confusion"
]
}
},
{
"id": "wholike",
"ring": "as-growing",
"title": "Crushes, Feelings, and Who You Like",
"you": {
"id": "as-g-wholike-you",
"guide": "wholike",
"side": "you",
"title": "Crushes, Feelings, and Who You Like",
"sideName": "For You",
"mins": 3,
"sources": [
[
"American Academy of Pediatrics: Your Child's First Crush",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Pages/Your-Childs-First-Crush.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Crushes, Feelings, and Who You Like",
"sub": "For You",
"say": "If you have a crush, or big feelings about someone, this is for you. Or maybe everyone around you seems to have one, and you're wondering what the fuss is about. Either way, you're normal."
},
{
"k": "words",
"h": "Crushes can feel like a lot",
"items": [
"Exciting",
"Awkward",
"Confusing",
"Not sure yet"
],
"say": "Crushes often start in middle school. They can feel exciting, awkward, or confusing, sometimes all in one day. Some kids have lots of crushes. Some have none yet. Your feelings are real, even if they pass quickly. And nothing needs to be decided or labeled now."
},
{
"k": "points",
"h": "What healthy love looks like",
"items": [
[
"Kindness",
"In words and actions"
],
[
"Honesty",
"No games"
],
[
"Trust",
"You feel safe"
],
[
"No pressure",
"Ever"
]
],
"say": "Here's what healthy love looks like, at any age. Kindness. Honesty. Trust. And never pressure. Someone who really likes you will respect your no.",
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
"title": "Your family has a why.",
"body": "Ask about your family's beliefs and rules about love and dating.",
"say": "Every family has its own beliefs and rules about love and dating. If you're not sure why yours has the rules it does, ask. Most grown-ups are glad to explain the why."
},
{
"k": "card",
"title": "Some things always call for help.",
"body": "An adult who flirts with you. Anyone asking for photos or secrets. Tell a grown-up.",
"say": "Some things are never okay. An adult who shows romantic interest in you. Anyone who asks you for photos, or asks you to keep a secret. If that happens, tell a grown-up you trust. You won't be in trouble for telling."
},
{
"k": "big",
"h": "Who could you talk to?",
"sub": "Picture one grown-up.",
"say": "Take a slow breath. Picture one grown-up you could talk to about this stuff. Maybe a parent, a relative, your school counselor, or a mentor. Think of how you might start: can I ask you something?",
"beats": [
"Take a slow breath.",
"Picture one grown-up you could talk to about this stuff.",
"Maybe a parent, a relative, your school counselor, or a mentor.",
{
"t": "Think of how you might start: can I ask you something?",
"w": 10
}
]
},
{
"k": "card",
"title": "Talk to someone you trust",
"body": "A parent, a relative, your school counselor, a mentor. Not wanting to be alive: 988.",
"say": "Talk with a grown-up you trust, any time you have questions. If you ever feel unsafe, or have thoughts of not wanting to be alive, call or text 988, any time."
},
{
"k": "big",
"h": "You are loved as you are.",
"sub": "The full guide has more, whenever you want it.",
"say": "Whatever you're feeling, or not feeling yet, you're not behind and you're not weird. You are loved as you are. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-wholike-helper",
"guide": "wholike",
"side": "helper",
"title": "Crushes, Feelings, and Who You Like",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"American Academy of Pediatrics: Your Child's First Crush",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Pages/Your-Childs-First-Crush.aspx"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Crushes, Feelings, and Who You Like",
"sub": "For the Grown-up",
"say": "When a middle schooler you love starts having crushes, this is for you. You don't need a perfect speech. Staying calm and curious does more than any lecture."
},
{
"k": "big",
"h": "Real feelings, even when they pass.",
"sub": "Crushes often begin in these years.",
"say": "Crushes often begin in these years. To a middle schooler, those feelings are real, even when they pass in a week. Teasing, or brushing it off as nothing, teaches them to stop telling you things."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Having a crush is normal. Thanks for telling me.\"",
"\"What do you like about them?\""
],
"say": "Words that help. Having a crush is normal. Thanks for telling me. What do you like about them? Then listen more than you talk. Calm and curious keeps the door open, so your child brings questions to you, and not to the internet."
},
{
"k": "points",
"h": "What closes the door",
"items": [
[
"Teasing",
"Even the gentle kind"
],
[
"Shaming or threats",
"Kids stop telling"
],
[
"Sharing their crush",
"Without their okay"
]
],
"say": "Three things close the door fast. Teasing, even the gentle kind. Shaming or threatening, which only teaches kids to stop telling you things. And sharing their crush with others without their okay. Their trust matters more than the story.",
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
"title": "Share your family's values.",
"body": "About love, commitment, and marriage, in your own words. With warmth, not fear.",
"say": "This is a good time to share what your family believes about love, commitment, and marriage, in your own words. Many traditions see love as something sacred, worth patience, respect, and waiting until you're ready. Say it with warmth, not fear. Rules about dating are yours to set as a family, and it helps to explain the why behind them."
},
{
"k": "points",
"h": "What healthy love looks like",
"items": [
[
"Kindness"
],
[
"Honesty"
],
[
"Trust"
],
[
"Never pressure"
]
],
"say": "Talk about what healthy love looks like. Kindness. Honesty. Trust. And never pressure. Middle schoolers are still figuring out their feelings, and nothing needs to be decided or labeled now.",
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
"title": "Keep them safe.",
"body": "An adult showing romantic interest in a child is never okay. Photos or secrets: tell me.",
"say": "Keep them safe. Any adult who shows romantic interest in a child is never okay. Anyone asking for photos or secrets is not safe. Say it plainly: if anyone ever asks you for photos or to keep a secret, you can always tell me. You won't be in trouble."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "\"Thanks for telling me.\"",
"say": "Take a breath. Picture your middle schooler telling you about a crush. Notice what your face wants to do, and soften it. Now say it out loud: having a crush is normal, thanks for telling me.",
"beats": [
"Take a breath.",
"Picture your middle schooler telling you about a crush.",
"Notice what your face wants to do, and soften it.",
{
"t": "Now say it out loud: having a crush is normal, thanks for telling me.",
"w": 10
}
]
},
{
"k": "card",
"title": "If someone crosses lines",
"body": "Childhelp: 1-800-422-4453. A photo shared: Take It Down. Not wanting to be alive: 988. Emergency: 911.",
"say": "If an adult is crossing lines, the Childhelp National Child Abuse Hotline is there any time, at 1-800-422-4453. If a photo has been shared, Take It Down can help. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Calm and curious keeps them talking.",
"sub": "The full guide has more, whenever you want it.",
"say": "Look after yourself too. These talks can stir up your own middle school memories, so laugh about them with someone you trust. Stay calm, stay curious, and keep the door open. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "faith",
"ring": "as-growing",
"title": "Big Questions About Faith",
"you": {
"id": "as-g-faith-you",
"guide": "faith",
"side": "you",
"title": "Big Questions About Faith",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Lisa Miller, Teachers College, Columbia University",
"https://www.tc.columbia.edu/faculty/lfm14/"
],
[
"Miller: Spiritual awakening in adolescents (PubMed)",
"https://pubmed.ncbi.nlm.nih.gov/24354605/"
],
[
"Fuller Youth Institute: Why doubt",
"https://fulleryouthinstitute.org/blog/why-doubt"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Big Questions About Faith",
"sub": "For You",
"say": "If you've got big questions about faith, God, or what matters most, this is for you. Asking big questions is a normal part of growing up."
},
{
"k": "words",
"h": "Real questions",
"items": [
"Why do bad things happen?",
"What happens when we die?",
"Where do I fit?"
],
"say": "Maybe you've wondered why bad things happen. Or what happens when we die. Or where you fit in all of it. These are real questions. People have asked them for thousands of years."
},
{
"k": "card",
"title": "Questions are welcome.",
"body": "Doubt said out loud is healthier than doubt kept silent.",
"say": "Having questions doesn't mean you're doing something wrong. Doubt spoken out loud is healthier than doubt kept silent. Lots of kids your age wonder about these things, and most keep it to themselves. You don't have to."
},
{
"k": "story",
"title": "The Beautiful Hodgepodge",
"lines": [
"Three generations talking over each other, and a grandchild underfoot.",
"A crucifix, sage, and a church directory on the shelves. A medicine wheel in the window.",
"\"We are all related anyway, right? As long as you believe in something.\""
],
"lesson": "One family can hold many doors, and still love each other well.",
"note": "Names and details changed",
"hold": 2,
"say": "I once visited a family in their small apartment. Three generations talking over each other, something good on the stove, and a grandchild underfoot. On the shelves sat a small crucifix, a bundle of dried sage, and a church directory. A beaded medicine wheel hung in the window. Linda laughed and said, We are a hodgepodge. We are all related anyway, right? As long as you believe in something."
},
{
"k": "points",
"h": "Ways people feel steady",
"items": [
[
"Prayer or worship",
"In a family tradition"
],
[
"Quiet",
"Or time in nature"
],
[
"Family traditions",
"Meals, songs, stories"
]
],
"say": "People find what steadies them in lots of ways. Some pray, or go to worship. Some find it in quiet, or outside in nature. Some find it in family traditions: meals, songs, and stories. You can notice what helps you.",
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
"h": "Who could you ask?",
"sub": "Picture one grown-up.",
"say": "Take a slow breath. Think of one big question you've wondered about. Now picture one grown-up you could ask. Picture how you might start: I've been wondering about something.",
"beats": [
"Take a slow breath.",
"Think of one big question you've wondered about.",
"Now picture one grown-up you could ask.",
{
"t": "Picture how you might start: I've been wondering about something.",
"w": 10
}
]
},
{
"k": "card",
"title": "Who to talk to",
"body": "A parent, a grandparent, your school counselor, or a pastor, imam, rabbi, elder, or mentor.",
"say": "Talk with a grown-up you trust: a parent, a grandparent, your school counselor, or a pastor, imam, rabbi, elder, or mentor. It's okay if they don't have every answer. Wondering together still helps."
},
{
"k": "big",
"h": "Your questions are welcome.",
"sub": "The full guide has more, whenever you want it.",
"say": "Your questions are welcome. Keep asking, and keep wondering. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-faith-helper",
"guide": "faith",
"side": "helper",
"title": "Big Questions About Faith",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"Lisa Miller, Teachers College, Columbia University",
"https://www.tc.columbia.edu/faculty/lfm14/"
],
[
"Miller: Spiritual awakening in adolescents (PubMed)",
"https://pubmed.ncbi.nlm.nih.gov/24354605/"
],
[
"Fuller Youth Institute: Why doubt",
"https://fulleryouthinstitute.org/blog/why-doubt"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Big Questions About Faith",
"sub": "For the Grown-up",
"say": "When a middle schooler you love starts asking big questions about faith, this is for you. You don't need every answer. Your welcome matters more than your answers."
},
{
"k": "big",
"h": "Spiritual life often wakes up now.",
"sub": "A normal part of growing up.",
"say": "Early adolescence is when spiritual life often wakes up. Big questions come with it: why bad things happen, what happens when we die, what's true. This awakening is a normal part of growing up. Research finds that a lived spiritual life is one of the strongest protections young people have."
},
{
"k": "card",
"title": "Silence harms faith more than doubt.",
"body": "Questions spoken out loud have room to grow.",
"say": "Most young people in youth groups have serious doubts, but only about a quarter ever talk with anyone about them. It's silence, not doubt, that harms faith. When kids can bring their questions to you, faith has room to grow up with them."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"I'm so glad you asked me that.\"",
"\"That's a real question.\"",
"\"I've wondered about that too.\"",
"\"Who else could we ask?\""
],
"say": "Words that help. I'm so glad you asked me that. That's a real question. People of faith have asked it for thousands of years. I've wondered about that too. Here's what helps me. And, who else could we ask?"
},
{
"k": "points",
"h": "What closes the door",
"items": [
[
"Treating questions as rebellion",
"They are part of growing"
],
[
"Shutting it down",
"Silence sends questions elsewhere"
],
[
"Rushing to answers",
"Wonder with them first"
]
],
"say": "A few things close the door. Treating questions as rebellion, when they're part of growing. Shutting the conversation down, which sends questions somewhere else. And rushing to answers. Wonder with them first.",
"cue": {
"at": [
1,
2,
3
]
}
},
{
"k": "story",
"title": "The Beautiful Hodgepodge",
"lines": [
"Three generations talking over each other, and a grandchild underfoot.",
"A crucifix, sage, and a church directory on the shelves. A medicine wheel in the window.",
"\"We are all related anyway, right? As long as you believe in something.\""
],
"lesson": "Love is what holds the many doors together.",
"note": "Names and details changed",
"hold": 2,
"say": "I once visited Rose, who was on hospice, in a small apartment full of her family. Three generations talking over each other, something good on the stove, a grandchild underfoot. On the shelves sat a small crucifix, a bundle of dried sage, and a Lutheran church directory from 1987. A beaded medicine wheel hung in the window. Her daughter Linda laughed. We are a hodgepodge, she said. We are all related anyway, right? As long as you believe in something. Nobody was defending anything. Then Linda said, We just want to love her well."
},
{
"k": "card",
"title": "Share what helps you.",
"body": "Your own story, your tradition, and trusted mentors.",
"say": "Kids in every kind of family meet big questions. Share your own story, and what helps you, in your family's own words. Point them to trusted mentors in your tradition: a pastor, imam, rabbi, elder, or mentor. Many families also find steadiness in quiet, nature, and family traditions."
},
{
"k": "big",
"h": "Say it out loud.",
"sub": "\"I'm so glad you asked me that.\"",
"say": "Take a breath. Picture your middle schooler asking you a question you can't fully answer. Notice the urge to rush. Now say it out loud: I'm so glad you asked me that.",
"beats": [
"Take a breath.",
"Picture your middle schooler asking you a question you can't fully answer.",
"Notice the urge to rush.",
{
"t": "Now say it out loud: I'm so glad you asked me that.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Their questions may stir your own. That is okay.",
"say": "Their questions may stir your own, and that's okay. Bring them to someone you trust. If your child's questions come with heavy sadness or worry that lasts, talk with the school counselor. If anything points to thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Wonder with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Wonder with them, and keep the door open. Questions spoken out loud have room to grow. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "identity",
"ring": "as-growing",
"title": "Figuring Out Who You Are",
"you": {
"id": "as-g-identity-you",
"guide": "identity",
"side": "you",
"title": "Figuring Out Who You Are",
"sideName": "For You",
"mins": 3,
"sources": [
[
"Search Institute: Developmental relationships framework",
"https://www.ctclearinghouse.org/Customer-Content/www/topics/The_Developmental_Relationships_Framework_.pdf"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Figuring Out Who You Are",
"sub": "For You",
"say": "If you've been wondering who you really are, this is for you. Lots of kids your age start asking that question for real, maybe for the first time."
},
{
"k": "words",
"h": "Trying things on is healthy",
"items": [
"New styles",
"New interests",
"New friend groups",
"Changing your mind"
],
"say": "Middle school is a time for trying things on. New styles. New interests. New friend groups. Changing your mind. That's not being fake. It's how people find out what fits."
},
{
"k": "card",
"title": "It's okay to still be figuring it out.",
"body": "Nobody your age does. Most grown-ups are still learning too.",
"say": "You don't have to have it all figured out. Nobody your age does. Honestly, most grown-ups are still figuring out some of it too."
},
{
"k": "words",
"h": "More than one word",
"items": [
"The smart one",
"The athlete",
"The funny one",
"The quiet one"
],
"sub": "You are more than any label.",
"say": "Sometimes people give you a label. The smart one. The athlete. The funny one. The quiet one. A label can start to feel like a box. You are more than any one word, and you're allowed to grow."
},
{
"k": "big",
"h": "When do you feel most like yourself?",
"sub": "Name it.",
"say": "Let's try something. Take a slow breath. Think of a time you felt most like yourself. Where were you, and who was there? Now name it, quietly or out loud.",
"beats": [
"Let's try something.",
"Take a slow breath.",
"Think of a time you felt most like yourself.",
"Where were you, and who was there?",
{
"t": "Now name it, quietly or out loud.",
"w": 10
}
]
},
{
"k": "points",
"h": "People who help you grow",
"items": [
[
"A parent or relative",
"Who knows your story"
],
[
"A teacher or coach",
"Who sees your strengths"
],
[
"A counselor or mentor",
"Who listens"
]
],
"say": "Good relationships help you discover who you are. Look for grown-ups who see the good in you. A parent or relative who knows your story. A teacher or coach who notices your strengths. A school counselor or mentor who really listens.",
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
"title": "If it feels heavy",
"body": "Talk with a grown-up you trust. Not wanting to be alive: 988.",
"say": "If you ever feel really down about who you are, talk with a grown-up you trust. And if you have thoughts of not wanting to be alive, call or text 988, any time."
},
{
"k": "big",
"h": "You are still becoming, and that is good.",
"sub": "The full guide has more, whenever you want it.",
"say": "You are loved as you are, and you're still becoming. That's a good thing. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-identity-helper",
"guide": "identity",
"side": "helper",
"title": "Figuring Out Who You Are",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"Search Institute: Developmental relationships framework",
"https://www.ctclearinghouse.org/Customer-Content/www/topics/The_Developmental_Relationships_Framework_.pdf"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Figuring Out Who You Are",
"sub": "For the Grown-up",
"say": "When a middle schooler you love starts asking who they are, this is for you. Your job isn't to decide who they become. It's to be steady while they figure it out."
},
{
"k": "big",
"h": "\"Who am I?\" for real.",
"sub": "Styles, interests, friend groups.",
"say": "Middle school is when kids start asking, who am I, for real. They try on styles, interests, and friend groups. One month it's basketball, the next it's drawing, or a new table at lunch. That's healthy. It's how they find what fits."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"It's okay to still be figuring it out.\"",
"\"I love watching you discover what you're into.\"",
"\"Here's something I've always admired about you.\""
],
"say": "Words that help. You don't have to have it all figured out. I love watching you discover what you're into. Here's something I've always admired about you. Then name something real, like their kindness to a little brother, or how they keep at hard things."
},
{
"k": "card",
"title": "Ask one good question.",
"body": "\"When do you feel most like yourself?\"",
"say": "One question opens a lot of doors. When do you feel most like yourself? Ask it in the car, or over a snack, and let the answer be whatever it is. Then share your own middle school story. The awkward haircut. The phase you're glad you tried. It tells them growing is normal."
},
{
"k": "points",
"h": "What closes the door",
"items": [
[
"Labels",
"The smart one. The athlete."
],
[
"Mocking new interests",
"Even as a joke"
],
[
"Deciding for them",
"Who they should become"
]
],
"say": "A few things close the door. Labels like the smart one or the athlete, which can start to feel like a box. Mocking new interests, even as a joke. And deciding for them who they should become. Let them try things, and change their minds.",
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
"h": "Relationships are where they find themselves.",
"sub": "You, and the other good grown-ups.",
"say": "Strong relationships are where young people discover who they are. That's you, and the other good grown-ups around them: a coach, a teacher, a relative, a mentor, a faith community if your family has one. You don't have to be the only voice. Welcome the others."
},
{
"k": "big",
"h": "Name the good you see.",
"sub": "Say it out loud.",
"say": "Take a breath. Picture your middle schooler. Think of one thing you've always admired about them. Say it out loud now, the way you'd tell them.",
"beats": [
"Take a breath.",
"Picture your middle schooler.",
"Think of one thing you've always admired about them.",
{
"t": "Say it out loud now, the way you'd tell them.",
"w": 10
}
]
},
{
"k": "card",
"title": "Notice big changes that last.",
"body": "Talk with the school counselor or their doctor. Not wanting to be alive: 988. Emergency: 911.",
"say": "Trying things on is normal. If you notice big changes that last, in mood, sleep, eating, or friends, talk with the school counselor or their doctor. If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency."
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Pride, and a little grief for the younger kid. Both are normal.",
"say": "Watching your child change can stir up a lot in you: pride, worry, and a little grief for the younger kid who used to want to do everything with you. That's normal. Talk it over with someone you trust."
},
{
"k": "big",
"h": "Be steady. Keep naming the good.",
"sub": "The full guide has more, whenever you want it.",
"say": "Be steady while they figure it out, and keep reminding them of the good you see. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "illness",
"ring": "as-growing",
"title": "Living with an Illness or Disability",
"you": {
"id": "as-g-illness-you",
"guide": "illness",
"side": "you",
"title": "Living with an Illness or Disability",
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
"h": "Living with an Illness or Disability",
"sub": "For You",
"say": "If you live with an illness or a disability, this is for you. Maybe you've had it your whole life, or maybe it's new. Either way, you are so much more than it."
},
{
"k": "big",
"h": "Part of your story, not the whole story.",
"say": "Here's something to keep. Your illness or disability is part of your story, not the whole story. You are also what you love, what makes you laugh, and the people you care about."
},
{
"k": "words",
"h": "Feelings that make sense",
"items": [
"Tired of it",
"Different",
"Frustrated",
"Proud, some days"
],
"say": "You might feel tired of it, or different from other kids. You might feel frustrated when your body or your brain won't cooperate. Some days you might feel proud of how much you handle. All of that makes sense."
},
{
"k": "points",
"h": "You get a say",
"items": [
[
"What to share",
"And who you tell"
],
[
"Meetings about you",
"Ask to be there"
],
[
"What teachers should know",
"In your own words"
]
],
"say": "You get a say. You can choose what to share about your condition, and who to tell. You can ask to be part of meetings about your health and your help at school. And you can tell your teachers what you'd want them to know.",
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
"h": "What would you want them to know?",
"sub": "One thing, in your own words.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Think of one thing you'd want a teacher to know about you. It can be about your condition, or about anything else. Now say it, quietly or out loud.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Think of one thing you'd want a teacher to know about you.",
"It can be about your condition, or about anything else.",
{
"t": "Now say it, quietly or out loud.",
"w": 10
}
]
},
{
"k": "card",
"title": "Find people who get it.",
"body": "Ask a grown-up to help you find a group, a camp, or a club.",
"say": "It helps to know other kids who get it. Ask a grown-up to help you find a group, a camp, or a club for kids living with something like yours. You don't have to explain everything to people who already understand."
},
{
"k": "points",
"h": "If someone is mean about it",
"items": [
[
"A parent or relative"
],
[
"The school counselor"
],
[
"A teacher or coach"
]
],
"say": "If anyone teases you, leaves you out, or is mean about your condition, it is not your fault. Tell a grown-up you trust, the same day. A parent or relative. The school counselor. A teacher or coach. You will not be in trouble for telling.",
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
"h": "You are a whole person.",
"sub": "Your voice matters.",
"say": "You are a whole person, with a voice that matters. Your condition is part of your story, not the whole story. The rest is still being written."
}
]
},
"helper": {
"id": "as-g-illness-helper",
"guide": "illness",
"side": "helper",
"title": "Living with an Illness or Disability",
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
"h": "Living with an Illness or Disability",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler who lives with an illness or a disability, this is for you. You already know how much they carry. You can help them carry it with more say."
},
{
"k": "big",
"h": "They want to be known as whole people.",
"say": "Kids living with an illness or disability want to be known as whole people. Middle school is the age of growing independence, and that's true for your child too. Giving them a real voice in their health and their school supports builds confidence. That's exactly the growth middle school is for."
},
{
"k": "points",
"h": "Give them a real voice",
"items": [
[
"What to share",
"And with whom"
],
[
"A seat at the meeting",
"Doctor visits and school plans"
],
[
"Their own words",
"For teachers and friends"
]
],
"say": "Give them a real voice. Let them choose what to share about their condition, and with whom. Include them in doctor visits and in meetings about school supports, like a 504 plan or an IEP. And help them find their own words for teachers and friends.",
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
"\"You get a say in this.\"",
"\"What would you want your teachers to know?\"",
"\"This is part of your story, not the whole story.\""
],
"say": "Here are words that help. You get a say in this. What would you want your teachers to know? And this one, for the hard days. This is part of your story, not the whole story."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Talking over them",
"As if they aren't in the room"
],
[
"Letting it define them",
"They are more than a diagnosis"
],
[
"Deciding for them",
"When they could choose"
]
],
"say": "Some things are best left out. Talking about them as if they aren't in the room, with doctors, teachers, or relatives. Letting the condition define them. And deciding for them what they could decide themselves. Each one quietly tells them their voice doesn't count.",
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
"h": "Picture the whole kid.",
"say": "Take a moment. Picture your child doing something they love, something that has nothing to do with their condition. Breathe in slowly, and let it out. Now say out loud one thing you love about who they are.",
"beats": [
"Take a moment.",
"Picture your child doing something they love, something that has nothing to do with their condition.",
"Breathe in slowly, and let it out.",
{
"t": "Now say out loud one thing you love about who they are.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help them find peers who get it.",
"body": "A group, a camp, a club, or one friend living with something similar.",
"say": "Help them find peers who get it. A group, a camp, a club, or one friend living with something similar can help them feel less alone. Your child's doctor, the school, or a parent center can point you to options near you."
},
{
"k": "card",
"title": "Watch for bullying, and act fast.",
"body": "Kids with disabilities are bullied more often.",
"say": "Kids with disabilities are bullied more often, so watch for it. Teasing, being left out, or a sudden wish to skip school can be signs. If it happens, act fast. Write down what happened, tell the school, and stay with it until it stops. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "points",
"h": "Support for you",
"items": [
[
"A parent center",
"Like PACER, in Minneapolis"
],
[
"Other parents",
"Who have been there"
],
[
"Your own rest",
"You count too"
]
],
"say": "You need support too. Parent centers, like PACER in Minneapolis, help families understand school supports and speak up for their kids. Other parents who have been there can be a lifeline. And your own rest counts. Loving a child through this is a long road, and you deserve company on it.",
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
"h": "See the whole kid.",
"sub": "The full guide has more, whenever you want it.",
"say": "See the whole kid, and help everyone else see them too. Their condition is part of their story, not the whole story. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "lockdown",
"ring": "as-world",
"title": "Lockdowns and School Violence",
"you": {
"id": "as-g-lockdown-you",
"guide": "lockdown",
"side": "you",
"title": "Lockdowns and School Violence",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NCTSN: Talking to children about the shooting",
"https://www.nctsn.org/sites/default/files/resources/tip-sheet/talking_to_children_about_the_shooting.pdf"
],
[
"NCTSN: Parent guidelines after a shooting",
"https://www.nctsn.org/resources/parent-guidelines-helping-youth-after-recent-shooting"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Lockdowns and School Violence",
"sub": "For You",
"say": "If lockdown drills, or news about a school, have left you feeling scared or on edge, this is for you. Lots of kids your age feel this way."
},
{
"k": "words",
"h": "Every feeling here makes sense",
"items": [
"Scared",
"Jumpy",
"Angry",
"Fine, then not fine"
],
"say": "You might feel scared, jumpy, or angry. You might feel fine, and then not fine when a door slams or an alarm goes off. Trouble sleeping or focusing for a while is normal. Every one of those feelings makes sense."
},
{
"k": "card",
"title": "Drills are practice.",
"body": "Your teachers practice so everyone knows what to do.",
"say": "Drills can feel strange, or even scary. Here's what they are: practice. Your teachers and school staff practice so everyone knows exactly what to do. Lots of grown-ups are working to keep you safe, every single day."
},
{
"k": "flow",
"h": "Your simple plan",
"steps": [
[
"Listen to your teacher",
"They know the plan"
],
[
"Stay with your class",
"Quiet and close"
],
[
"Breathe slowly",
"In, then out even slower"
],
[
"Talk about it after",
"With a grown-up you trust"
]
],
"say": "Here's a simple plan to hold onto. Listen to your teacher, because they know the plan. Stay with your class, quiet and close. Breathe slowly while you wait. And afterward, talk about it with a grown-up you trust.",
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
"h": "Feet down. One slow breath.",
"sub": "Then picture a grown-up you trust.",
"say": "Let's try it now. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Notice three things you can see around you. Now picture one grown-up you could talk to about this.",
"beats": [
"Let's try it now.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
"Notice three things you can see around you.",
{
"t": "Now picture one grown-up you could talk to about this.",
"w": 10
}
]
},
{
"k": "points",
"h": "When you hear something scary",
"items": [
[
"Ask what is true",
"Rumors spread fast"
],
[
"Take a break from videos",
"Your mind needs rest"
],
[
"Tell a grown-up",
"Any time, about anything"
]
],
"say": "Sometimes scary stories spread fast at school or online, and lots of them aren't true. Ask a grown-up what's really true. Take breaks from videos and posts about it, because your mind needs rest. And you can always bring your questions to a parent, a teacher, a coach, or your school counselor. If the scared feeling stays for weeks, tell them, so they can help."
},
{
"k": "big",
"h": "You have people with you in this.",
"sub": "The full guide has more, whenever you want it.",
"say": "Others can help you carry this feeling. Lots of people are looking out for you. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-lockdown-helper",
"guide": "lockdown",
"side": "helper",
"title": "Lockdowns and School Violence",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
[
"NCTSN: Talking to children about the shooting",
"https://www.nctsn.org/sites/default/files/resources/tip-sheet/talking_to_children_about_the_shooting.pdf"
],
[
"NCTSN: Parent guidelines after a shooting",
"https://www.nctsn.org/resources/parent-guidelines-helping-youth-after-recent-shooting"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Lockdowns and School Violence",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is shaken by a lockdown, a drill, or news of violence at a school, this is for you. You don't need perfect words. Your calm and your honesty go a long way."
},
{
"k": "big",
"h": "Silence can make it scarier.",
"sub": "Start the conversation.",
"say": "Start the conversation, even if they seem fine. When grown-ups stay quiet, kids fill the silence with their own worst guesses. Ask what they've heard, and help them sort out what's true from what's rumor."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"What have you heard? Let's sort out what's true.\"",
"\"Your teachers practice drills so everyone knows what to do.\"",
"\"You can always talk to me about this.\""
],
"say": "Words that help. What have you heard? Let's sort out what's true. Your teachers practice drills so everyone knows what to do. And, you can always talk to me about this."
},
{
"k": "card",
"title": "Could it happen here?",
"body": "Often they are asking: is it likely? It is rare.",
"say": "When kids ask, could it happen here, they're often really asking whether it's likely. You can be honest. It's rare, and many grown-ups are working every day to keep them safe. Tell them what those grown-ups do."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Graphic videos",
"Including your own news"
],
[
"\"It will never happen here.\"",
"A promise no one can keep"
],
[
"The person who did it",
"Keep the focus on helpers"
]
],
"say": "Some things are better left out. Graphic videos, including the news you have running. Promising it will never happen here, because that's a promise no one can keep. And focusing on the person who did it. Keep the focus on the helpers and the plan."
},
{
"k": "story",
"title": "A Day at the Fair",
"lines": [
"A sudden pop, and a crowd shouting to run.",
"My family was scattered, and we found each other one by one.",
"My oldest and I stayed on the phone and walked toward each other."
],
"lesson": "A steady voice helps a scared kid find their way back.",
"note": "Names and details changed",
"hold": 2,
"say": "I want to tell you about a day with my own family. It includes a scary moment, and everyone in it was safe. We were at a fair when we heard a sudden pop. People shouted, Run, and my family was scattered. I grabbed the son beside me and ran. Another of my boys found us near the gates. My wife had taken shelter with our youngest. Then my oldest called, his voice shaking. He had run four blocks away, alone. I stayed on the phone, and we walked toward each other, block by block, until I saw him. I held him for a long time."
},
{
"k": "points",
"h": "After a scare",
"items": [
[
"Stay close",
"Reconnect first"
],
[
"Keep routines",
"Meals, sleep, school"
],
[
"Limit the news",
"Especially video"
]
],
"say": "A steady voice and a way back to their people is what kids need after any scare. Stay close. Keep meals, sleep, and school routines steady. Limit the news, especially video. Expect worse sleep and focus for a while. If problems last more than about six weeks, talk with a counselor or their doctor.",
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
"h": "Steady yourself first.",
"sub": "Your calm is contagious.",
"say": "Your calm helps them feel safe. Feet on the floor. Breathe in slowly, and let it out even slower. Now say this out loud: you can always talk to me about this.",
"beats": [
"Your calm helps them feel safe.",
"Feet on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now say this out loud: you can always talk to me about this.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Disaster Distress Helpline: call or text 1-800-985-5990. Not wanting to be alive: 988. Emergency: 911.",
"say": "News like this can shake grown-ups too. Talk with someone you trust, and take breaks from the news yourself. To talk with someone about the stress, call or text the Disaster Distress Helpline at 1-800-985-5990. If anything points to thoughts of not wanting to be alive, call or text 988. In an emergency, call 911."
},
{
"k": "big",
"h": "Start the talk. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Start the talk, tell the truth gently, and stay close. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "news",
"ring": "as-world",
"title": "Scary News and Politics",
"you": {
"id": "as-g-news-you",
"guide": "news",
"side": "you",
"title": "Scary News and Politics",
"sideName": "For You",
"mins": 3,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Scary News and Politics",
"sub": "For You",
"say": "If the news has you worried, or arguments about politics feel big and loud, this is for you. Lots of kids your age feel the same way."
},
{
"k": "words",
"h": "It makes sense to feel a lot",
"items": [
"Worried",
"Confused",
"Angry",
"Tired of it all"
],
"say": "You might feel worried, confused, or angry. You might feel tired of hearing about it at all. News can follow you everywhere: on phones, at school, at the dinner table. It makes sense to feel a lot."
},
{
"k": "points",
"h": "Sort it out",
"items": [
[
"What did I hear?",
"Say it plainly"
],
[
"Is it true?",
"Check with a grown-up"
],
[
"Is it close to me?",
"Or far from home?"
]
],
"say": "When you hear something scary, it helps to sort it out. What did I actually hear? Is it true, or is it a rumor? Check with a grown-up you trust. And is it close to me, or far from home? Scary news can feel close even when it isn't.",
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
"title": "People can disagree and still be good neighbors.",
"body": "You can care about what you believe and still be kind.",
"say": "Grown-ups disagree about big things, sometimes loudly. People can disagree and still be good neighbors. You can care about what you believe, listen to someone who sees it differently, and still be kind. That's a real skill, and you can practice it."
},
{
"k": "big",
"h": "What part worries you most?",
"sub": "Name it. Then picture who you could tell.",
"say": "Let's take a moment. Breathe in slowly, and let it out even slower. Think of the part of the news that worries you most, and give it a name. Now picture one grown-up you could tell about it.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out even slower.",
"Think of the part of the news that worries you most, and give it a name.",
{
"t": "Now picture one grown-up you could tell about it.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can do",
"items": [
[
"Take news breaks",
"Phone down, go outside"
],
[
"Do one small thing",
"A letter, a kind act"
],
[
"Talk it through",
"With a grown-up you trust"
]
],
"say": "Here are things you can do. Take breaks from the news. Put the phone down, and go outside or do something you love. Find one small way to help, like writing a letter or doing something kind nearby. And talk it through with a parent, a teacher, a coach, or your school counselor. Fixing the big problems is a grown-up job."
},
{
"k": "big",
"h": "You can care without carrying it all.",
"sub": "The full guide has more, whenever you want it.",
"say": "You can care about the world without carrying all of it. The grown-ups are working on the big things. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-news-helper",
"guide": "news",
"side": "helper",
"title": "Scary News and Politics",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"National Child Traumatic Stress Network",
"https://www.nctsn.org/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Scary News and Politics",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is worried by the news, or caught in the heat of politics, this is for you. You don't need every answer. Calm, honest, and kind goes a long way."
},
{
"k": "big",
"h": "They soak it up.",
"sub": "Even when they seem busy with something else.",
"say": "Kids soak up news even when they seem busy with something else. A headline on a phone, a video at lunch, a tense talk at the dinner table. Middle schoolers notice more than they say, and they're starting to form views of their own."
},
{
"k": "flow",
"h": "Three steps",
"steps": [
[
"Ask",
"What have you heard?"
],
[
"Sort",
"Facts from rumors"
],
[
"Help",
"One small action"
]
],
"say": "Three steps help. Ask what they've heard. Then sort out facts from rumors together, at their level. And find one small way to help, because action turns worry into something they can do.",
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
"\"It's okay to feel worried. What part worries you most?\"",
"\"People can disagree and still be good neighbors.\"",
"\"What's one thing we could do to help?\""
],
"say": "Words that help. It's okay to feel worried. What part worries you most? People can disagree and still be good neighbors. And, what's one thing we could do to help?"
},
{
"k": "card",
"title": "Share your values. Model respect.",
"body": "Kids learn most from how you talk about people.",
"say": "Politics can feel personal and scary. You can share your family's values, and still show respect for neighbors who see things differently. Kids learn more from how you talk about people than from what you say about issues. Calling people who disagree evil teaches fear. Kind words about people, even in disagreement, teach steadiness."
},
{
"k": "points",
"h": "Lower the volume",
"items": [
[
"Turn off the all-day news",
"Check in at set times"
],
[
"Watch your own reactions",
"They are watching you"
],
[
"Talk about phones",
"What they see, and when"
]
],
"say": "Lower the volume at home. Leaving the news running all day keeps everyone on edge, so check in at set times instead. Watch your own reactions, because they're watching you. And talk about what they see on their phones, and when. Late night scrolling makes worry bigger.",
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
"title": "Keep them out of grown-up problems.",
"body": "They can care. The grown-ups carry the weight.",
"say": "Some news touches a family directly: a job, a neighbor, a worry about what comes next. Kids can care, and still be kept out of grown-up problems. Tell them the grown-ups are handling the big things, and save your own heaviest worries for other grown-ups."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Your calm is contagious.",
"say": "Before you talk, steady yourself. Breathe in slowly, and let it out even slower. Now say this out loud: it's okay to feel worried. What part worries you most?",
"beats": [
"Before you talk, steady yourself.",
"Breathe in slowly, and let it out even slower.",
"Now say this out loud: it's okay to feel worried.",
{
"t": "What part worries you most?",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Take news breaks. Heavy worry for weeks: the school counselor or their doctor.",
"say": "Grown-ups get worn down by the news too. Take your own breaks, and talk with people you trust. If your child's worry stays heavy for weeks, or gets in the way of sleep, school, or friends, talk with the school counselor or their doctor. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Calm, honest, and kind.",
"sub": "The full guide has more, whenever you want it.",
"say": "Stay calm, be honest, and stay kind. That's what they'll remember. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "immigration",
"ring": "as-world",
"title": "Immigration Raids",
"you": {
"id": "as-g-immigration-you",
"guide": "immigration",
"side": "you",
"title": "Immigration Raids",
"sideName": "For You",
"mins": 3,
"sources": [
[
"AAP: Talking with children about immigration enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
],
[
"Education Minnesota: Immigration resources for educators",
"https://educationminnesota.org/immigration/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Immigration Raids",
"sub": "For You",
"say": "If immigration raids in your community have you scared, for your family, your friends, or your neighbors, this is for you. What you're feeling makes sense."
},
{
"k": "words",
"h": "Every feeling here makes sense",
"items": [
"Scared",
"Sad",
"Angry",
"Hard to focus"
],
"say": "You might feel scared, sad, or angry. You might have trouble sleeping, or find it hard to focus at school. You might worry every time you're apart from your family. Those feelings make sense, and lots of kids are feeling them too."
},
{
"k": "card",
"title": "This is not yours to fix.",
"body": "The grown-ups are handling the grown-up parts.",
"say": "Here's something important. This is not your job to fix. The grown-ups in your family, and people whose job is helping families, are working on it. You don't have to carry their worries or solve grown-up problems. Your job is to be a kid."
},
{
"k": "points",
"h": "Ask about the plan",
"items": [
[
"Who will pick me up?",
"If plans change"
],
[
"How do I reach you?",
"Numbers to know"
],
[
"Who can I go to?",
"At school and nearby"
]
],
"say": "It can help to know your family's plan. Ask a grown-up at home. Who will pick me up if plans change? How do I reach you? Who can I go to at school, or nearby? Knowing the plan can make the worry a little smaller.",
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
"h": "Feet down. One slow breath.",
"sub": "Then picture a grown-up you trust.",
"say": "Let's take a breath together. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Now picture one grown-up you trust, and say their name.",
"beats": [
"Let's take a breath together.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now picture one grown-up you trust, and say their name.",
"w": 10
}
]
},
{
"k": "points",
"h": "You can talk about it",
"items": [
[
"A parent or relative",
"At home"
],
[
"A teacher or coach",
"Someone you trust"
],
[
"Your school counselor",
"A calm place to talk"
]
],
"say": "You don't have to keep this inside. Talk to a grown-up you trust: a parent, a relative, a teacher, a coach, or your school counselor. You can ask your grown-ups anything. And if a friend seems scared or stops coming to school, be kind, and tell a grown-up you're worried about them."
},
{
"k": "big",
"h": "You are loved, and you belong.",
"sub": "The full guide has more, whenever you want it.",
"say": "You are loved, and you belong. Be gentle with yourself today. The full guide has more, whenever you want it."
}
]
},
"helper": {
"id": "as-g-immigration-helper",
"guide": "immigration",
"side": "helper",
"title": "Immigration Raids",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"AAP: Talking with children about immigration enforcement",
"https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"
],
[
"Education Minnesota: Immigration resources for educators",
"https://educationminnesota.org/immigration/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Immigration Raids",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is scared by immigration raids, this is for you. Maybe your own family is affected, or a friend's, or your neighbors'. You don't need perfect words. Listening first goes a long way."
},
{
"k": "big",
"h": "Listen first.",
"sub": "What do they already know and fear?",
"say": "Start by listening. Find out what they already know, and what they're afraid of. Kids this age hear a lot from friends and phones, and some of it is rumor. Let them tell you, then answer what they're really asking."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"You are safe right now, and we have a plan.\"",
"\"If anything ever happens, here's who will pick you up.\"",
"\"You can ask me anything.\""
],
"say": "Words that help. You are safe right now, and we have a plan. If anything ever happens, here's who will pick you up. And, you can ask me anything."
},
{
"k": "flow",
"h": "Make a family plan",
"steps": [
[
"Name a trusted adult",
"Who would pick them up"
],
[
"Update school contacts",
"Emergency contacts on file"
],
[
"Share key numbers",
"Kept somewhere safe"
],
[
"Talk it through calmly",
"So the plan feels steady"
]
],
"say": "If your family could be affected, make a preparedness plan together. Name a trusted adult who would pick them up. Update the emergency contacts at school. Make sure they know the numbers to call, kept somewhere safe. And talk it through calmly, so the plan feels steady, not scary.",
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
"title": "Keep them out of the grown-up parts.",
"body": "Grown-ups handle papers, legal talks, and the big worries.",
"say": "Kids need to hear that they are not responsible for fixing this. Keep them out of grown-up problems. Even if they speak English best in the family, they shouldn't translate legal conversations or official papers. Ask for an interpreter, or ask a legal aid organization to help you find one."
},
{
"k": "points",
"h": "Get trusted help",
"items": [
[
"A legal aid organization",
"For trusted, up-to-date guidance"
],
[
"The school counselor",
"Support during the day"
],
[
"Their doctor",
"If sleep or worry stays hard"
]
],
"say": "Rules change quickly, and every family's situation is different, so talk with a trusted immigration legal aid organization. The full guide lists some. Let the school counselor know your child is carrying a lot, so they have support during the day. If sleep, appetite, or worry stay hard, talk with their doctor.",
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
"title": "Reassure them, honestly.",
"body": "Say what the grown-ups are doing. Leave out promises about outcomes.",
"say": "Reassure them that the grown-ups are handling this, and tell them what you're doing. Be careful with promises about how things will turn out, because no one can know that. Honest, steady words are easier to trust."
},
{
"k": "big",
"h": "Steady yourself first.",
"sub": "Your calm is contagious.",
"say": "Your calm helps them feel safe. Feet on the floor. Breathe in slowly, and let it out even slower. Now say this out loud: you can ask me anything.",
"beats": [
"Your calm helps them feel safe.",
"Feet on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now say this out loud: you can ask me anything.",
"w": 10
}
]
},
{
"k": "card",
"title": "Look after yourself too.",
"body": "Lean on your people. Not wanting to be alive: 988. Emergency: 911.",
"say": "This may be weighing heavily on you too. Lean on people you trust and on your community. Take breaks from the news and the rumors. If anything points to thoughts of not wanting to be alive, call or text 988, or call 911 in an emergency."
},
{
"k": "big",
"h": "Listen. Plan. Stay close.",
"sub": "The full guide has more, whenever you want it.",
"say": "Listen first, make a plan, and stay close. You have people with you in this. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "unfair",
"ring": "as-world",
"title": "Being Treated Unfairly",
"you": {
"id": "as-g-unfair-you",
"guide": "unfair",
"side": "you",
"title": "Being Treated Unfairly",
"sideName": "For You",
"mins": 3,
"sources": [
[
"City of Minneapolis: Mental health",
"https://www.minneapolismn.gov/government/departments/health/current-concerns/mental-health/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Being Treated Unfairly",
"sub": "For You",
"say": "If someone treated you badly because of who you are, this is for you. Maybe it was about your skin, your family, your faith, your culture, or how you talk. Maybe it was a kid, or maybe it was a grown-up."
},
{
"k": "big",
"h": "That was wrong.",
"sub": "And it was not your fault.",
"say": "Here is the first thing to know. What happened to you was wrong. It was not your fault. Nothing about who you are made it okay."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Angry",
"Hurt",
"Embarrassed",
"Confused",
"Really tired"
],
"say": "You might feel angry, hurt, or embarrassed. You might feel confused, or just really tired. You might keep replaying it in your head. All of that makes sense. Your sense of fair is strong right now, and this broke it."
},
{
"k": "points",
"h": "What you can do",
"items": [
[
"Write it down",
"What, when, and who saw"
],
[
"Tell a grown-up",
"Today, if you can"
],
[
"Stay near your people",
"Friends who have your back"
]
],
"say": "Here are a few things you can do. Write down what happened: what was said or done, when, and who saw it. Tell a grown-up you trust, today if you can. And stay close to friends who have your back. Fixing it is a grown-up job. Your job is to tell.",
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
"h": "Who will you tell?",
"sub": "Picture them now.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Picture one grown-up you can tell: a parent, a relative, a teacher, a coach, or your school counselor. Now say this quietly, like you're talking to them. Something happened at school, and it wasn't okay.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Picture one grown-up you can tell: a parent, a relative, a teacher, a coach, or your school counselor.",
"Now say this quietly, like you're talking to them.",
{
"t": "Something happened at school, and it wasn't okay.",
"w": 10
}
]
},
{
"k": "card",
"title": "Who you are is something to be proud of.",
"body": "Your family, your culture, your community, and your faith, if that is part of your family.",
"say": "Who you are is something to be proud of. Lots of kids find strength in their family, their culture, and their community. For some, it's their faith, too. Ask a grown-up in your family to tell you about someone who stood up to unfairness."
},
{
"k": "card",
"title": "If you feel unsafe",
"body": "Tell a grown-up right away. Danger right now: 911.",
"say": "If someone threatens to hurt you, or you feel unsafe, tell a grown-up right away. You won't be in trouble for telling. If someone is in danger right now, call 911."
},
{
"k": "big",
"h": "You deserve to be treated fairly.",
"sub": "Every day, everywhere.",
"say": "You deserve to be treated fairly, every day, everywhere. Telling a grown-up is a strong thing to do. Others can help you carry this."
}
]
},
"helper": {
"id": "as-g-unfair-helper",
"guide": "unfair",
"side": "helper",
"title": "Being Treated Unfairly",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"City of Minneapolis: Mental health",
"https://www.minneapolismn.gov/government/departments/health/current-concerns/mental-health/"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Being Treated Unfairly",
"sub": "For the Grown-up",
"say": "When a middle schooler you love has been treated badly because of race, faith, culture, or who they are, this is for you. Whether you're a parent, a grandparent, or another grown-up in their life, you can help them feel steady and seen."
},
{
"k": "big",
"h": "Believe them first.",
"sub": "Being believed is protective.",
"say": "Start by believing them. Being believed by a trusted adult is one of the most protective things a kid can have. Listen to the whole story before you ask questions. Their experience is real, even if you weren't there to see it."
},
{
"k": "big",
"h": "Middle schoolers feel fairness sharply.",
"say": "Kids this age have a sharp sense of fairness. Being treated badly for who they are cuts deep, because it touches the question they're already asking: who am I, and where do I belong? Some get angry. Some go quiet. Some stop wanting to go to school."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"That was wrong, and it was not your fault.\"",
"\"Thank you for telling me.\"",
"\"We're going to do something about it.\""
],
"say": "Here are words that help. That was wrong, and it was not your fault. Thank you for telling me. We're going to do something about it. Name it plainly as unfair. Kids need to hear a grown-up say it out loud."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"\"They didn't mean it.\"",
"It asks them to doubt what happened"
],
[
"\"Just ignore it.\"",
"It leaves them alone with it"
],
[
"Both sides",
"Their hurt is the starting point"
]
],
"say": "Some words close the door. They didn't mean it. That asks your kid to doubt what happened. Just ignore it. That leaves them alone with it. And skip the both sides talk. Start with their hurt.",
"cue": {
"at": [
1,
3,
5
]
}
},
{
"k": "flow",
"h": "Then act on it",
"steps": [
[
"Write it down",
"Date, words, who saw, screenshots"
],
[
"Report it",
"To the school, in writing"
],
[
"Follow up",
"Ask what happened next"
]
],
"say": "Then act on it. Write down what happened: the date, the words used, who saw it, and screenshots if it happened online. Report it to the school, in writing. Then follow up, and ask what was done. Your kid watching you act tells them they matter. Keep them out of the grown-up meetings unless they want to be there.",
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
"say": "Let's practice. Say it out loud, the way you would to them. That was wrong, and it was not your fault. We're going to do something about it.",
"beats": [
"Let's practice.",
"Say it out loud, the way you would to them.",
"That was wrong, and it was not your fault.",
{
"t": "We're going to do something about it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help them find strength",
"body": "Family, faith, culture, community, and people who stood up.",
"say": "Then help them find strength. Share stories of people who stood up to unfairness, from your family, your community, or history. Lean on what your family already has: culture, traditions, faith if that is part of your home, and people who love them. Check in again in a few days. If sleep, school, or mood stays rough for weeks, talk with their doctor or the school counselor."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "A steady grown-up helps them most.",
"say": "This may stir up your own anger, or old hurts of your own. That makes sense. Find a friend or someone you trust where you can say the hard things, so you can stay steady for your kid. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "suicide",
"ring": "as-world",
"title": "A Death by Suicide in the Community",
"you": {
"id": "as-g-suicide-you",
"guide": "suicide",
"side": "you",
"title": "A Death by Suicide in the Community",
"sideName": "For You",
"mins": 3,
"sources": [
[
"AFSP and SPRC: After a Suicide, A Toolkit for Schools",
"https://sprc.org/resources/after-suicide-toolkit-schools"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Death by Suicide in the Community",
"sub": "For You",
"say": "If someone in your school or community has died by suicide, this is for you. Whatever you are feeling right now, you have people with you."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Call or text 988, or text HOME to 741741. Danger right now: get a grown-up and call 911.",
"say": "First, where to get help right now. Any time, you can call or text 988, or text HOME to 741741. If anyone is in danger right now, get a grown-up and call 911. These lines stay on the screen the whole time."
},
{
"k": "words",
"h": "All of it is okay to feel",
"items": [
"Shocked",
"Sad",
"Angry",
"Numb"
],
"sub": "And it is not your fault.",
"say": "A death like this can hit hard, even if you didn't know the person well. You might feel shocked, sad, angry, or numb. All of it is okay to feel. And it is not your fault."
},
{
"k": "big",
"h": "Let's slow down together.",
"say": "Let's slow down together. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Now name one feeling you have right now.",
"beats": [
"Let's slow down together.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
{
"t": "Now name one feeling you have right now.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things that can help",
"items": [
[
"Talk about them",
"Share a memory"
],
[
"Tell a grown-up how you feel",
"A parent, counselor, or coach"
],
[
"Do what steadies you",
"Sleep, music, outside, family"
],
[
"Ask your questions",
"There are no wrong ones"
]
],
"say": "Here are things that can help. You can talk about the person, and share a memory. Tell a trusted grown-up how you're feeling: a parent, a school counselor, a teacher, a coach, or a relative. Do what steadies you, like sleep, music, time outside, a family tradition, or prayer. And ask your questions. There are no wrong ones.",
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
"h": "If you ever have thoughts of suicide",
"items": [
"I've been having thoughts of suicide, and I need help."
],
"sub": "Tell a trusted grown-up today.",
"say": "Sometimes, after a death like this, a kid starts having thoughts of suicide too. If that ever happens to you, tell a trusted grown-up today. You can borrow these words. I've been having thoughts of suicide, and I need help."
},
{
"k": "big",
"h": "Always tell a grown-up.",
"sub": "Telling gets someone help.",
"say": "And if a friend ever tells you they are thinking about suicide, never keep that secret. Tell a grown-up right away. Telling gets someone help."
},
{
"k": "big",
"h": "There is always help.",
"sub": "988: call or text. Danger right now: 911.",
"say": "Suicide is complicated, and no one person causes it. Pain can be treated, and help works. Call or text 988 any time, or text HOME to 741741. If anyone is in danger, call 911. You matter, and there is always help."
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
"id": "as-g-suicide-helper",
"guide": "suicide",
"side": "helper",
"title": "A Death by Suicide in the Community",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"dazzi",
[
"AFSP and SPRC: After a Suicide, A Toolkit for Schools",
"https://sprc.org/resources/after-suicide-toolkit-schools"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Death by Suicide in the Community",
"sub": "For the Grown-up",
"say": "If someone in your child's school or community has died by suicide, this is for you. How grown-ups talk about it matters, and you can help."
},
{
"k": "card",
"title": "Help is here right now.",
"body": "Danger right now: call 911. Thoughts of suicide: call or text 988 together.",
"say": "First, help right now. If anyone is in danger right now, call 911. If your child is having thoughts of suicide, call or text 988 together, or text HOME to 741741. These lines stay on the screen the whole time."
},
{
"k": "big",
"h": "Steady yourself first.",
"say": "News like this can shake you too. Steady yourself first. Feet on the floor. Breathe in slowly, and let it out even slower.",
"beats": [
"News like this can shake you too.",
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
"h": "How grown-ups talk about it matters.",
"say": "Young people are especially affected by a suicide in their community. Schools follow a careful approach after a death like this, and families can use the same one. Tell the truth simply. Talk about the person in a balanced way. And never describe how they died."
},
{
"k": "words",
"h": "Words that help",
"items": [
"She died by suicide.",
"We may never fully understand why.",
"It's not anyone's fault, including yours."
],
"say": "If the family allows it to be shared, say it simply. She died by suicide. We may never fully understand why. Then say, it's not anyone's fault, including yours. Use the words died by suicide, and leave out the word committed."
},
{
"k": "big",
"h": "Let them feel all of it.",
"sub": "Confusion, anger, guilt, sadness.",
"say": "Grief after a suicide is often mixed with confusion, anger, or guilt. Let your child feel all of it. Let them talk about the person, and share memories. Remind them that no one person caused it. Answer questions honestly, and it's okay to say, I don't know."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"How or where it happened"
],
[
"A choice, a solution, an escape"
],
[
"Memorials that glorify the death"
],
[
"Blame, of anyone"
]
],
"say": "Some things to leave out. How or where it happened. Calling it a choice, a solution, or an escape. Suicide is complicated, and pain can be treated. Memorials that glorify the death. And blame, of anyone.",
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
"k": "big",
"h": "Ask directly.",
"sub": "Are you thinking about suicide?",
"say": "Watch closely over the person's friends and teammates, and over your own child. Notice pulling away, changes in sleep, or talk of feeling hopeless. Then ask plainly, in a calm voice. Are you thinking about suicide? Asking is safe. It does not put the idea in their head. If they say yes, call or text 988 together, right then."
},
{
"k": "words",
"h": "Keep the door open",
"items": [
"If you ever feel like things are hopeless, please tell me.",
"There is always help."
],
"say": "Keep the door open. If you ever feel like things are hopeless, please tell me. There is always help. Let the school counselor know how your child is doing. A grief group for kids can help too."
},
{
"k": "big",
"h": "Your steady love helps.",
"sub": "Get support for yourself too.",
"say": "This may stir your own grief or fear. Get support for yourself too, from a counselor or a trusted friend. Call or text 988 any time, for your child or for you. Your steady love helps."
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
"id": "disaster",
"ring": "as-world",
"title": "Disasters and Storms",
"you": {
"id": "as-g-disaster-you",
"guide": "disaster",
"side": "you",
"title": "Disasters and Storms",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NCTSN: Parent guidelines after a hurricane",
"https://www.nctsn.org/resources/parent-guidelines-helping-children-after-hurricane"
],
[
"SAMHSA: Disaster Distress Helpline",
"https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Disasters and Storms",
"sub": "For You",
"say": "If a storm, a tornado, a flood, or a fire has you worried, or one has already touched your town, this is for you."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Jumpy",
"Sad",
"Fine, then not fine"
],
"say": "You might feel scared when the sky turns dark, or jumpy when the wind picks up. You might feel sad about what was lost, or fine one day and not the next. All of that is normal. For a while, sleeping and focusing can be harder too."
},
{
"k": "big",
"h": "We have a plan.",
"sub": "Grown-ups make the plan. You help.",
"say": "Here is something that helps. Your family can have a plan. Making the plan is a grown-up job, and you can help. Knowing the plan helps your body feel safer."
},
{
"k": "points",
"h": "Your part of the plan",
"items": [
[
"Know the safe spot",
"At home and at school"
],
[
"Pack a go bag",
"Your own things, your way"
],
[
"Know where to meet",
"And who will pick you up"
]
],
"say": "Here's your part. Know the safe spot, at home and at school. Your teachers practice drills so everyone knows what to do. Pack your own go bag: a flashlight, a snack, a charger, something that comforts you. And know where your family will meet, and who will pick you up.",
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
"h": "Feet on the floor.",
"sub": "Breathe in. Breathe out slower.",
"say": "Let's practice staying steady. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Look around and name three things you can see. Now think of one thing you'd put in your go bag.",
"beats": [
"Let's practice staying steady.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
"Look around and name three things you can see.",
{
"t": "Now think of one thing you'd put in your go bag.",
"w": 10
}
]
},
{
"k": "card",
"title": "Take a break from the videos.",
"body": "Watching it again and again keeps the worry going.",
"say": "If there are videos of storm damage everywhere, it's okay to look away. Watching it again and again keeps your worry going. Talk to a grown-up instead: a parent, a relative, a teacher, a coach, or your school counselor."
},
{
"k": "points",
"h": "Ways to help",
"items": [
[
"Make a card",
"For a family who lost a lot"
],
[
"Help collect",
"Food, clothes, or supplies"
],
[
"Help at home",
"With your family's plan"
]
],
"say": "Helping can turn worry into something good. You could make a card for a family who lost a lot. You could help your school or community collect food or supplies. Or you could help at home, checking the go bag with your family.",
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
"h": "Storms pass.",
"sub": "And people help each other rebuild.",
"say": "Storms pass. When they do, people help each other clean up and rebuild. You're part of a family and a town that looks out for each other."
}
]
},
"helper": {
"id": "as-g-disaster-helper",
"guide": "disaster",
"side": "helper",
"title": "Disasters and Storms",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NCTSN: Parent guidelines after a hurricane",
"https://www.nctsn.org/resources/parent-guidelines-helping-children-after-hurricane"
],
[
"SAMHSA: Disaster Distress Helpline",
"https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Disasters and Storms",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is worried about storms, or has lived through a tornado, a flood, a fire, or a blizzard, this is for you. You can help them feel safer and more in control."
},
{
"k": "big",
"h": "Helping turns fear into action.",
"say": "Kids cope better when they feel they're helping. Preparing together turns fear into action. A middle schooler wants a real part to play, and the plan gives them one."
},
{
"k": "flow",
"h": "Make a family plan together",
"steps": [
[
"A safe spot",
"Where we go in a storm"
],
[
"A go bag",
"They pack their own"
],
[
"A meeting spot",
"If we get separated"
],
[
"Who picks them up",
"If you can't"
]
],
"say": "Make a family plan together. Pick the safe spot in your home for a storm. Let them pack their own go bag. Choose a meeting spot in case you get separated. And tell them who will pick them up if you can't. Then talk calmly about tornado and blizzard drills, at home and at school.",
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
"\"We have a plan, and here it is.\"",
"\"What would you want in your go bag?\"",
"\"How could we help people who got hurt?\""
],
"say": "Here are words that help. We have a plan, and here it is. What would you want in your go bag? And, how could we help people who got hurt? Then listen. Their worry may be bigger, or smaller, than you'd guess."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Replaying the footage",
"Including on your own phone"
],
[
"Dismissing their fear",
"\"It's nothing\" leaves them alone"
],
[
"Grown-up worry out loud",
"Insurance, money, or blame"
]
],
"say": "Some things are better left out. Replaying disaster video, including on your own phone, when they're nearby. Dismissing their fear, because brushing it off leaves them alone with it. And talking through grown-up worries in front of them, like insurance or money. Those conversations can happen later, between adults.",
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
"say": "Let's practice. Take a slow breath first. Then say it out loud, the way you would to them. We have a plan, and here it is.",
"beats": [
"Let's practice.",
"Take a slow breath first.",
"Then say it out loud, the way you would to them.",
{
"t": "We have a plan, and here it is.",
"w": 10
}
]
},
{
"k": "card",
"title": "After a disaster",
"body": "Sleep and focus may be off. Longer than six weeks: check in with a counselor or doctor.",
"say": "After a disaster, expect some trouble with sleep and focus for a while. Keep routines as steady as you can, and give them a way to help, like a card or a supply drive. If problems last longer than about six weeks, check in with the school counselor or their doctor."
},
{
"k": "card",
"title": "Disaster Distress Helpline",
"body": "Call or text 1-800-985-5990, any time.",
"say": "Others can help you carry this. The Disaster Distress Helpline is there for kids and grown-ups, any time. Call or text 1-800-985-5990. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Your calm is their safe spot.",
"say": "A storm can shake you too, especially if you lost something. Lean on your own people. Kids take their cues from the grown-ups around them, so your calm becomes their safe spot. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "war",
"ring": "as-world",
"title": "War in the News",
"you": {
"id": "as-g-war-you",
"guide": "war",
"side": "you",
"title": "War in the News",
"sideName": "For You",
"mins": 3,
"sources": [
[
"NCTSN: Talking to children about war",
"https://www.nctsn.org/sites/default/files/resources/fact-sheet/talking-to-children-about-war.pdf"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "War in the News",
"sub": "For You",
"say": "If you've seen news about a war, on TV, online, or in a video someone shared, and it's stuck in your head, this is for you."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Scared",
"Sad",
"Angry",
"Confused",
"Not much at all"
],
"say": "You might feel scared, or sad for the people there. You might feel angry, or confused about why it's happening. Some days you might not feel much at all. Every one of those is okay. Caring about people far away is a good thing."
},
{
"k": "big",
"h": "Look at a map.",
"sub": "How far away is it, really?",
"say": "Here's something that helps. Look at a map with a grown-up. Find where you live, and find where the war is. Most of the time, it's very far from here. Right where you are, you are safe."
},
{
"k": "card",
"title": "If your family has people there",
"body": "Your worry makes sense. Tell a grown-up how you feel.",
"say": "Some kids have family or friends in a place at war. If that's you, your worry makes sense. The grown-ups in your family will handle the hard parts. Tell a grown-up how you're feeling, so you don't hold it alone."
},
{
"k": "points",
"h": "What you can do",
"items": [
[
"Take a break",
"From videos and scary posts"
],
[
"Talk it over",
"With a grown-up you trust"
],
[
"Find a way to help",
"A card, a drive, a kind word"
]
],
"say": "Here are a few things you can do. Take a break from videos and scary posts. Your mind needs rest from them. Talk it over with a grown-up you trust. And find a small way to help, like making a card or joining a school drive.",
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
"h": "Feet on the floor.",
"sub": "You are here. You are safe.",
"say": "Let's take a moment. Put your feet flat on the floor. Breathe in slowly, and let it out even slower. Look around and name three things you can see. Now picture one grown-up you can talk to about the news.",
"beats": [
"Let's take a moment.",
"Put your feet flat on the floor.",
"Breathe in slowly, and let it out even slower.",
"Look around and name three things you can see.",
{
"t": "Now picture one grown-up you can talk to about the news.",
"w": 10
}
]
},
{
"k": "card",
"title": "People are people.",
"body": "War is never the fault of a kid in your class.",
"say": "Sometimes people talk about a whole group as enemies. But people are people, everywhere. A war is never the fault of a kid in your class, or their family. You can be the one who is kind."
},
{
"k": "big",
"h": "There are helpers everywhere.",
"sub": "You can be one of them.",
"say": "All over the world, people are helping: doctors, neighbors, and volunteers. You can be a helper too, right where you are. Talk to a parent, a teacher, a coach, or your school counselor whenever the news feels heavy."
}
]
},
"helper": {
"id": "as-g-war-helper",
"guide": "war",
"side": "helper",
"title": "War in the News",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
[
"NCTSN: Talking to children about war",
"https://www.nctsn.org/sites/default/files/resources/fact-sheet/talking-to-children-about-war.pdf"
]
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "War in the News",
"sub": "For the Grown-up",
"say": "When a middle schooler you love is seeing war in the news, this is for you. They may have seen more than you know. You can help them feel safe and steady."
},
{
"k": "big",
"h": "Ask, validate, stay calm.",
"say": "Start by asking how they feel about what they've seen. Then let those feelings be okay. And stay as calm as you can. Your calm tells them more than any fact."
},
{
"k": "big",
"h": "Middle schoolers see a lot.",
"sub": "Ask what they have seen.",
"say": "Kids this age often see war on their phones before a grown-up brings it up: videos, posts, and rumors from friends. Some act like it doesn't bother them. Ask what they've seen and heard, and gently sort out what's true."
},
{
"k": "card",
"title": "Use a map.",
"body": "Kids often don't know how far away a war is.",
"say": "A map helps a lot. Kids often don't know how far away a war is. Find your home, and find the place in the news. Seeing the distance helps them feel safer where they are."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"This is far from here, and you are safe.\"",
"\"It's okay to feel sad or scared for people there.\"",
"\"What would you like to do to help?\""
],
"say": "Here are words that help. This is far from here, and you are safe. It's okay to feel sad or scared about people there. And, what would you like to do to help? Helping turns worry into something they can do."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Graphic images",
"Including on your own phone"
],
[
"Whole groups as enemies",
"People are people"
],
[
"Grown-up jobs",
"Even a helpful kid needs to be a kid"
]
],
"say": "Some things are better left out. Graphic images, including on your own phone when they're nearby. Talking about whole groups of people as enemies. Kids learn how to see people from how we talk. And grown-up jobs. Even a helpful kid needs to stay a kid.",
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
"title": "If your family has people there",
"body": "Be gentle. Watch for anyone who needs extra support.",
"say": "Many Minnesota families came here from places at war, and some still have loved ones there. If that's your family, your kid may carry your worry too. Be gentle, and keep grown-up news and decisions among the adults. If you know a family like this, watch for anyone who needs extra support."
},
{
"k": "big",
"h": "Say it the way you would to them.",
"say": "Let's practice. Take a slow breath. Then say it out loud, the way you would to them. It's okay to feel sad or scared about people there. What would you like to do to help?",
"beats": [
"Let's practice.",
"Take a slow breath.",
"Then say it out loud, the way you would to them.",
"It's okay to feel sad or scared about people there.",
{
"t": "What would you like to do to help?",
"w": 10
}
]
},
{
"k": "card",
"title": "Help is there",
"body": "Disaster Distress Helpline: 1-800-985-5990. And the school counselor.",
"say": "If worry, sleep, or school stays rough for weeks, talk with the school counselor or their doctor. The Disaster Distress Helpline is there too, at 1-800-985-5990. If anyone is in danger right now, call 911."
},
{
"k": "big",
"h": "Look after yourself too.",
"sub": "Your calm is their shelter.",
"say": "War news is heavy for grown-ups too. Take your own breaks from it, and talk with people you trust. A calm grown-up is one of the best shelters a kid can have. The full guide has more, whenever you want it."
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
"say": "If you have been hurting yourself on purpose when feelings get too big, this is for you. You are not in trouble, and you have people with you."
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
"say": "Tell a trusted grown-up, today. A parent, a school counselor, a teacher, a coach, or a relative. You can borrow these words. I've been hurting myself, and I need help. Stopping can take a while, and others can walk with you."
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
"Others can help you stop."
],
"say": "Start gently. I noticed the marks. You're not in trouble. I want to understand. Later, ask, what was happening right before? And tell them, I'll help you stop. We'll get help together."
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
"say": "When you tell, you are not in trouble. You did the right thing. Now let the grown-ups help. Keeping your friend safe is a grown-up job, and others can help you carry it."
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
},
{
"id": "school-health",
"ring": "life",
"title": "A Health Condition at School: The Nurse, a 504 Plan, and Missed Days",
"you": {
"id": "as-g-school-health-you",
"guide": "school-health",
"side": "you",
"title": "A Health Condition at School: The Nurse, a 504 Plan, and Missed Days",
"sideName": "For You",
"mins": 3,
"sources": [
"cdcschoolchc"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Health Condition at School: The Nurse, a 504 Plan, and Missed Days",
"sub": "For You",
"say": "If you have a health condition and you're figuring out how to handle it at school, this is for you. Asthma, diabetes, seizures, allergies, headaches, a stomach that acts up. Lots of kids in your school are handling something too."
},
{
"k": "big",
"h": "School can work for your body.",
"sub": "There are people whose job is to help.",
"say": "Here's the main thing. School can work for your body. Some grown-ups at school are there to help with this. Others can help you figure it out."
},
{
"k": "points",
"h": "Your school team",
"items": [
[
"The school nurse",
"For your body, during the day"
],
[
"A teacher you trust",
"For class and catching up"
],
[
"The school counselor",
"For the feelings part"
]
],
"say": "Here's your team. The school nurse, for what your body needs during the day. A teacher you trust, for class and catching up after missed days. And the school counselor, for the feelings part, like being tired of it, or worried, or left out.",
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
"title": "A plan can help.",
"body": "Like rest breaks, water in class, or extra time.",
"say": "Some kids have a plan at school, sometimes called a 504 plan. It lists the things that help you learn with your condition. Like rest breaks, water or a snack in class, or extra time after a sick day. You can help write it."
},
{
"k": "words",
"h": "Hiding it is common",
"items": [
"Skipping the nurse",
"Not saying you feel sick",
"Pretending you're fine"
],
"say": "A lot of kids hide their condition to fit in. They skip the nurse, or don't say they feel sick, or pretend they're fine. That makes sense. Tell a grown-up you want more privacy. There's usually a quieter way."
},
{
"k": "big",
"h": "One thing to tell the nurse.",
"sub": "Practice it now.",
"say": "Let's practice. Picture walking into the nurse's office. Think of one thing you'd want the nurse to know about your body. Maybe it's what a bad day feels like, or what helps. Now say it out loud, in your own words.",
"beats": [
"Let's practice.",
"Picture walking into the nurse's office.",
"Think of one thing you'd want the nurse to know about your body.",
"Maybe it's what a bad day feels like, or what helps.",
{
"t": "Now say it out loud, in your own words.",
"w": 10
}
]
},
{
"k": "card",
"title": "Missed days are not your fault.",
"body": "Ask for a plan to catch up, one step at a time.",
"say": "If you miss school because of your health, that is not your fault. Ask your grown-up and your teachers for a plan to catch up, one step at a time. And if you start feeling down a lot, tell someone. That's common, and help is there."
},
{
"k": "big",
"h": "You are a student first.",
"sub": "Your voice belongs in the plan.",
"say": "You are a student first, with a body that needs some extra things. Your voice belongs in the plan. Each time you speak up, it gets a little easier."
}
]
},
"helper": {
"id": "as-g-school-health-helper",
"guide": "school-health",
"side": "helper",
"title": "A Health Condition at School: The Nurse, a 504 Plan, and Missed Days",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"cdcschoolchc",
"gottransition",
"pinquartshen11"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Health Condition at School: The Nurse, a 504 Plan, and Missed Days",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler manage a health condition at school, this is for you. Asthma, diabetes, epilepsy, allergies, migraines, a gut or joint condition."
},
{
"k": "big",
"h": "One team around one student.",
"say": "Things go better when the student, the family, the school nurse, the doctor, and teachers work as one team. That kind of teamwork is linked to fewer missed days. Your job is to build the team, and to keep your child at the center of it."
},
{
"k": "flow",
"h": "Three doors at school",
"steps": [
[
"The school nurse",
"A health plan for days and emergencies"
],
[
"A 504 plan",
"Changes so they can take part"
],
[
"An IEP",
"If learning itself is affected"
]
],
"say": "There are three doors to know. The school nurse can write a health plan with you, for daily needs and emergencies. A 504 plan lists the changes your child needs to take part fully, like rest breaks, water in class, an elevator pass, or a plan for makeup work. And if the condition affects learning itself, ask about an evaluation for an IEP. Put every request in writing, and keep copies.",
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
"h": "Plan for missed days",
"items": [
[
"Who sends the work",
"One person, one place"
],
[
"What really matters",
"Not every worksheet"
],
[
"A way back in",
"A quiet first day back"
]
],
"say": "Plan for missed days before they happen. Decide who sends the work, so it comes from one person to one place. Ask teachers what really matters, so your child isn't buried under every worksheet. And plan a way back in, like a quiet check-in with a teacher on the first day back.",
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
"title": "Hand over a little at a time.",
"body": "Middle school is when kids start taking over.",
"say": "Middle school is when kids start taking over their own health, a little at a time. Health teams often begin that planning around ages 12 to 14. Start small. Your child tells the nurse what they need. They answer the doctor's first question at the next visit. Stay close, and let them lead."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"Who do you want to know, and what?\"",
"\"What would make a hard day easier?\"",
"\"You can be part of the meeting.\""
],
"say": "Here are words that help. Who at school do you want to know, and what do you want them to know? What would make a hard health day at school easier? And this one. You can be part of the meeting. It's about you, so your ideas count."
},
{
"k": "card",
"title": "If they hide it, get curious.",
"body": "Skipping the nurse is often about fitting in.",
"say": "Many kids hide a condition to fit in. They skip the nurse, or a dose, or say they feel fine when they don't. Get curious instead of angry. Ask what makes it hard, and look for a more private way with the nurse. And whenever skipping something could be risky, bring the doctor in right away."
},
{
"k": "big",
"h": "Watch their mood, too.",
"say": "Kids with a long-term illness are more likely to feel low than other kids. Watch their mood as closely as their health. Bring in the school counselor early. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Write their first line.",
"sub": "For the next school meeting.",
"say": "Try this now. Think about your child's next school meeting. Picture them sitting at the table with you. Now say out loud the first sentence you will use to invite their voice. Something like, what do you want your teachers to know?",
"beats": [
"Try this now.",
"Think about your child's next school meeting.",
"Picture them sitting at the table with you.",
"Now say out loud the first sentence you will use to invite their voice.",
{
"t": "Something like, what do you want your teachers to know?",
"w": 10
}
]
},
{
"k": "big",
"h": "Build the team. Keep them at the center.",
"sub": "The full guide has more, whenever you want it.",
"say": "Build the team, and keep your child at the center of it. You're doing a lot, so lean on a parent center or another family who has been there. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "pain-headaches",
"ring": "life",
"title": "Pain or Headaches That Keep Coming Back",
"you": {
"id": "as-g-pain-headaches-you",
"guide": "pain-headaches",
"side": "you",
"title": "Pain or Headaches That Keep Coming Back",
"sideName": "For You",
"mins": 3,
"sources": [
"miserandino"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Pain or Headaches That Keep Coming Back",
"sub": "For You",
"say": "If you get headaches, stomachaches, or other pain that keeps coming back, this is for you. Pain that nobody can see is still real. You're not making it up."
},
{
"k": "words",
"h": "It can feel like",
"items": [
"Tired of hurting",
"Left out",
"Doubted",
"Worried it won't stop"
],
"say": "Living with pain can make you tired of hurting. It can leave you out of things you love. Sometimes people doubt you. And sometimes you worry it won't stop. All of that makes sense."
},
{
"k": "card",
"title": "Picture your energy as spoons.",
"body": "Each thing you do costs one. Hard days have fewer.",
"say": "Here's a picture some people use. Imagine your energy for the day is a handful of spoons. Getting ready costs one. A class costs one. Practice might cost two. On a hard day, you start with fewer. That's not lazy. That's just today."
},
{
"k": "big",
"h": "How many spoons today?",
"sub": "Count them on your fingers.",
"say": "Let's try it. Hold up your hands. Think about how much energy you have right now. Count your spoons for today on your fingers, from one to ten. Now pick one thing you could skip or shrink today, to save a spoon.",
"beats": [
"Let's try it.",
"Hold up your hands.",
"Think about how much energy you have right now.",
"Count your spoons for today on your fingers, from one to ten.",
{
"t": "Now pick one thing you could skip or shrink today, to save a spoon.",
"w": 10
}
]
},
{
"k": "points",
"h": "On a hard day",
"items": [
[
"Tell a grown-up",
"Early, not at empty"
],
[
"Spend spoons on what matters",
"Friends count too"
],
[
"Rest is a plan",
"Not quitting"
]
],
"say": "On a hard day, tell a grown-up early, before you're at empty. Spend your spoons on what matters most, and friends count. And remember, rest is a plan, not quitting.",
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
"title": "Help the doctor help you.",
"body": "When it comes, how long, what helps.",
"say": "You can help the doctor help you. With your grown-up, keep simple notes. When the pain comes, how long it lasts, and what helps. Then at the visit, try telling the doctor one thing yourself."
},
{
"k": "card",
"title": "If you feel down a lot, say so.",
"body": "A counselor or a grown-up you trust.",
"say": "Pain can make you feel down. If you feel down a lot, or stop wanting to do things you love, tell a grown-up you trust or the school counselor. That's a smart, strong move."
},
{
"k": "big",
"h": "Your pain is real. So are you.",
"sub": "More than a bad day.",
"say": "Your pain is real. And so are you, with what you love, what you're good at, and what makes you laugh. You are more than a bad day."
}
]
},
"helper": {
"id": "as-g-pain-headaches-helper",
"guide": "pain-headaches",
"side": "helper",
"title": "Pain or Headaches That Keep Coming Back",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"miserandino",
"pinquartshen11",
"cdcschoolchc"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Pain or Headaches That Keep Coming Back",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler with headaches, migraines, stomach pain, or joint pain that keeps coming back, this is for you. It's hard to watch a child hurt, especially when no one else can see it."
},
{
"k": "big",
"h": "Believe them first.",
"say": "The first gift is simple. Believe them. Kids with pain that keeps coming back often hear that they're faking, or trying to skip something. Being believed at home makes everything else easier, including telling you the truth on good days and bad ones."
},
{
"k": "flow",
"h": "Take it to the doctor, with notes",
"steps": [
[
"When it comes",
"Time of day, what was happening"
],
[
"How long it lasts",
"Minutes, hours, days"
],
[
"What helps",
"And what makes it worse"
]
],
"say": "Take it to the doctor, and bring notes you keep together. When the pain comes, and what was happening. How long it lasts. And what helps, and what seems to make it worse. Every question about the cause, treatment, or medicine belongs with the doctor.",
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
"title": "Spoons: a way to talk about energy",
"body": "Each task costs one. Hard days start with fewer.",
"say": "Some people living with long-term illness picture a day's energy as a handful of spoons. Each task costs one, and a hard day starts with fewer. It gives your child words to plan, to say no without guilt, and to explain to friends why they bailed. Ask, how many spoons do you have today?"
},
{
"k": "points",
"h": "On flare days",
"items": [
[
"Choose what matters",
"Not everything"
],
[
"Rest before empty",
"Not after"
],
[
"Keep a little going",
"Friends, school, what they love"
]
],
"say": "On flare days, help them choose what matters most, not everything. Rest before they hit empty, not after. And keep a little of friends, school, and what they love going, even in a smaller form. Canceling everything can feel safe, and it can also shrink a kid's world.",
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
"\"How many spoons today?\"",
"\"Resting isn't quitting. It's planning.\""
],
"say": "Here are words that help. I believe you. Tell me what it feels like today. How many spoons do you have? And this one. Resting on a hard day isn't quitting. It's planning."
},
{
"k": "words",
"h": "Words to leave out",
"items": [
"\"You were fine yesterday.\"",
"\"It's probably just stress.\"",
"\"Push through it.\""
],
"say": "Try not to say, you were fine yesterday. Pain comes and goes, and that's part of it. Try not to guess, it's probably just stress. Let the doctor sort out causes. And try not to say, push through it."
},
{
"k": "big",
"h": "Soften your own shoulders.",
"sub": "Then say the words.",
"say": "Try this now. Let your shoulders drop, and breathe out slowly. Picture your child on a hard pain day, curled up on the couch. Now say out loud, in your own voice, I believe you.",
"beats": [
"Try this now.",
"Let your shoulders drop, and breathe out slowly.",
"Picture your child on a hard pain day, curled up on the couch.",
{
"t": "Now say out loud, in your own voice, I believe you.",
"w": 10
}
]
},
{
"k": "card",
"title": "Watch their mood, and plan for school.",
"body": "The counselor. A 504 plan for flare days.",
"say": "Kids living with a long-term condition are more likely to feel low. Watch for giving up on things they love, or pulling away. Bring in the school counselor, and ask the school about a 504 plan for flare days and makeup work. If your child talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Believe them. Pace with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Believe them, and pace with them. Your own rest counts too, on this long road. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "moving-included",
"ring": "life",
"title": "Moving Differently and Being Included",
"you": {
"id": "as-g-moving-included-you",
"guide": "moving-included",
"side": "you",
"title": "Moving Differently and Being Included",
"sideName": "For You",
"mins": 3,
"sources": [
"barnessocial"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Moving Differently and Being Included",
"sub": "For You",
"say": "If you use a wheelchair, crutches, braces, or a walker, or your body just moves its own way, this is for you. You belong in the middle of things, not on the edge."
},
{
"k": "big",
"h": "The problem is often the stairs, not you.",
"say": "Here's something a lot of disabled people say. The hardest part often isn't your body. It's the world around it. Stairs with no ramp. A trip nobody planned for you. A game with no place for you. Those things can change."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Left out",
"Tired of explaining",
"Stared at",
"Proud of what you do"
],
"say": "You might feel left out, or tired of explaining. You might feel stared at. And some days, you might feel proud of everything you do. Every one of those makes sense."
},
{
"k": "points",
"h": "You can speak up",
"items": [
[
"What works for you",
"You know your body best"
],
[
"What keeps you out",
"Tell a grown-up"
],
[
"The words you like",
"You choose them"
]
],
"say": "You can speak up. You know what works for your body better than anyone. If something at school keeps you out, tell a grown-up, because that's a problem with the plan, not with you. And you get to choose the words people use about you.",
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
"h": "Name one place you want in.",
"sub": "A team, a trip, a table.",
"say": "Let's try something. Take a slow breath. Think of one place you want to be part of. A team, a club, a field trip, or a lunch table. Now say it out loud, and add, I want in.",
"beats": [
"Let's try something.",
"Take a slow breath.",
"Think of one place you want to be part of.",
"A team, a club, a field trip, or a lunch table.",
{
"t": "Now say it out loud, and add, I want in.",
"w": 10
}
]
},
{
"k": "card",
"title": "Bring that to a grown-up.",
"body": "Plans work best when they start early.",
"say": "Bring that to a grown-up you trust, a parent, the counselor, or a teacher. Plans work best when they start early, so you're in it from the start, not added at the end. Adaptive sports and clubs are worth asking about too."
},
{
"k": "card",
"title": "If someone is mean about it",
"body": "It is not your fault. Tell a grown-up the same day.",
"say": "If anyone teases you, copies how you move, or touches your chair or crutches without asking, it's not your fault. Tell a grown-up you trust the same day. You won't be in trouble for telling."
},
{
"k": "big",
"h": "You belong in the middle of things.",
"sub": "Your voice helps make room.",
"say": "You belong in the middle of things. Your voice helps make room, for you and for the next kid too."
}
]
},
"helper": {
"id": "as-g-moving-included-helper",
"guide": "moving-included",
"side": "helper",
"title": "Moving Differently and Being Included",
"sideName": "For the Grown-up",
"mins": 5,
"sources": [
"barnessocial",
"carterbelong",
"apadisability"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Moving Differently and Being Included",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler who uses a wheelchair, crutches, braces, or a walker, or whose body moves its own way, this is for you. They want what every middle schooler wants: friends, a place, and a say."
},
{
"k": "big",
"h": "Look for the barrier, not the problem.",
"say": "Many disabled people put it this way. The hardest part is often not the body, but the world around it. Steps with no ramp. A field trip that never thought about access. A gym class with no role for them. When something goes wrong, look for the barrier in the plan, not the problem in the kid."
},
{
"k": "points",
"h": "Belonging has layers",
"items": [
[
"Present",
"In the room"
],
[
"Invited",
"Asked to come"
],
[
"Known",
"Seen as themselves"
],
[
"Needed",
"With a real role"
]
],
"say": "Belonging has layers. Being present, in the room. Being invited. Being known, for who they really are. And being needed, with a real role. A student can be present every day and never be invited to the lunch table or the team.",
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
"h": "Plan ahead, together",
"steps": [
[
"Field trips and events",
"Ask early about access"
],
[
"Gym class and recess",
"A real role, not a bench"
],
[
"Drills and emergencies",
"A clear plan"
]
],
"say": "Plan ahead with the school, and bring your child into the planning. Ask early about field trips, assemblies, and events. Ask how gym class and recess will give them a real role, not a seat on the bench. And make sure fire drills and emergencies have a clear plan for them. If your child has a 504 plan or an IEP, that's where these belong.",
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
"\"What works best for you here?\"",
"\"Let's plan it so you're in from the start.\"",
"\"Which words do you like?\""
],
"say": "Here are words that help. What works best for you here? Let's plan this so you're in it from the start. And, which words do you like people to use? Some people like person-first words. Others say disabled, with pride. Your child gets to choose."
},
{
"k": "points",
"h": "What to leave out",
"items": [
[
"Deciding for them",
"Ask first"
],
[
"\"You're an inspiration\"",
"For ordinary things"
],
[
"\"Sit this one out\"",
"As the whole plan"
]
],
"say": "Some things are best left out. Deciding for them what they can or can't do. Ask, and check with the doctor about activity. Calling them an inspiration for ordinary things. And accepting, they can sit this one out, as the whole plan.",
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
"h": "Walk the route in your mind.",
"say": "Try this now. Think of one place your child will go this month, a trip, a game, or a party. Walk the route in your mind, from the car to the door to the room. Now say out loud the one barrier you will check on before that day.",
"beats": [
"Try this now.",
"Think of one place your child will go this month, a trip, a game, or a party.",
"Walk the route in your mind, from the car to the door to the room.",
{
"t": "Now say out loud the one barrier you will check on before that day.",
"w": 10
}
]
},
{
"k": "card",
"title": "Their space, their equipment",
"body": "Never touch or push a wheelchair without asking.",
"say": "Teach the people around your child that a wheelchair, crutches, or a walker are part of their personal space. Nobody touches or pushes them without asking. Watch for teasing or copying how they move, and act the same day if it happens."
},
{
"k": "card",
"title": "Find places where they are the athlete.",
"body": "Adaptive sports, clubs, and camps.",
"say": "Look for places where your child is the athlete, not the exception. Adaptive sports, clubs, and camps can give them teammates who get it. Their therapists, the school, or your parks and recreation office can point you to options. And find other parents too. You deserve company on this road."
},
{
"k": "big",
"h": "Plan them in, from the start.",
"sub": "The full guide has more, whenever you want it.",
"say": "Plan them in, from the start, and let them lead where they can. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "deaf-hoh",
"ring": "life",
"title": "Deaf or Hard of Hearing",
"you": {
"id": "as-g-deaf-hoh-you",
"guide": "deaf-hoh",
"side": "you",
"title": "Deaf or Hard of Hearing",
"sideName": "For You",
"mins": 3,
"sources": [
"apadisability"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Deaf or Hard of Hearing",
"sub": "For You",
"say": "If you're Deaf or hard of hearing, this is for you. Maybe you sign, maybe you speak, maybe you do both. However you communicate, you deserve to be part of the conversation."
},
{
"k": "big",
"h": "Your words. Your way.",
"sub": "Deaf, hard of hearing, or your own word.",
"say": "You get to choose your words. Some people say Deaf, with a capital D, with pride in Deaf culture and sign language. Some say hard of hearing. Some use other words. Your way is the right way for you."
},
{
"k": "words",
"h": "Hard moments",
"items": [
"Fast group talk",
"Videos with no captions",
"\"Never mind\"",
"Feeling left out"
],
"say": "Some moments are hard. A table where everyone talks at once. A video with no captions. Someone saying, never mind. Feeling left out of the joke. Those moments are about how people communicate. They're not about you being less."
},
{
"k": "points",
"h": "Things you can ask for",
"items": [
[
"Face me when you talk",
"So I can see you"
],
[
"Captions on, please",
"Every video"
],
[
"Say it again, or write it",
"Not \"never mind\""
]
],
"say": "Here are things you can ask for. Face me when you talk. Captions on, please. And say it again, or write it down, instead of never mind. Asking isn't being difficult. It's how you get in.",
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
"h": "Pick your request.",
"sub": "Sign it, say it, or type it.",
"say": "Let's practice. Pick the request you need most. Picture the person you'd ask, a teacher, a coach, or a friend. Now sign it, say it, or type it, right now.",
"beats": [
"Let's practice.",
"Pick the request you need most.",
"Picture the person you'd ask, a teacher, a coach, or a friend.",
{
"t": "Now sign it, say it, or type it, right now.",
"w": 10
}
]
},
{
"k": "card",
"title": "Find people who get it.",
"body": "Deaf and hard of hearing friends, groups, and camps.",
"say": "It helps to have friends who get it without explaining. Ask a grown-up to help you find Deaf and hard of hearing groups, camps, or events. Being understood without effort feels good."
},
{
"k": "card",
"title": "Help in your language",
"body": "988 has counselors who sign. You can also text 988.",
"say": "If you ever feel really low, or don't want to be alive, help is there in your language. The 988 Lifeline has counselors who sign, by videophone, through ASL Now on the 988 website. You can also text 988. And tell a grown-up you trust."
},
{
"k": "big",
"h": "You belong in the conversation.",
"sub": "Your way of talking counts.",
"say": "You belong in the conversation. Your language, your way of talking, and your voice all count."
}
]
},
"helper": {
"id": "as-g-deaf-hoh-helper",
"guide": "deaf-hoh",
"side": "helper",
"title": "Deaf or Hard of Hearing",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"apadisability",
"kbia988asl",
"carterbelong"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Deaf or Hard of Hearing",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler who is Deaf or hard of hearing, this is for you. Your child may sign, speak, use hearing aids or a cochlear implant, or none of these. Whatever their way, they deserve to be in the conversation."
},
{
"k": "big",
"h": "Follow their lead on words.",
"say": "Many Deaf people see Deafness as a culture and a language community, and write Deaf with a capital D. Others say hard of hearing, or have a hearing loss. Each person chooses their own words. Ask your child which they like, and use them, even if they're different from yours."
},
{
"k": "points",
"h": "Where it gets hard",
"items": [
[
"Fast talk",
"Lunch tables and group chats"
],
[
"No captions",
"Videos and announcements"
],
[
"Faces turned away",
"Teachers at the board"
],
[
"\"Never mind\"",
"Left out of the moment"
]
],
"say": "Much of what's hard is how the world communicates. Fast group talk, at lunch and in group chats. Videos and announcements with no captions. Teachers talking while facing the board. And people saying, never mind.",
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
"h": "What school can provide",
"steps": [
[
"An interpreter",
"Qualified, for every class"
],
[
"Captions",
"On every video"
],
[
"Listening tools and seating",
"Faces in view"
]
],
"say": "Work with the school, often through an IEP or a 504 plan, for what your child needs. A qualified interpreter. Captions on every video, every time. An assistive listening system, and seating where they can see faces. Questions about hearing, devices, or treatment belong with the family, the audiologist, and the doctor.",
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
"title": "Make home the easy place.",
"body": "One voice at a time. Faces in view. No \"never mind.\"",
"say": "Make home the place where communication is easy. One person talks at a time. Faces stay in view, and the lights stay on. If your child signs, the family learns to sign too, as much as you can. And nobody says never mind."
},
{
"k": "big",
"h": "One change at your table.",
"say": "Try this now. Picture your family at dinner, everyone talking at once. Notice where your child sits, and what they can see. Now say out loud one change you will make at your table this week.",
"beats": [
"Try this now.",
"Picture your family at dinner, everyone talking at once.",
"Notice where your child sits, and what they can see.",
{
"t": "Now say out loud one change you will make at your table this week.",
"w": 10
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How do you want to talk about this?\"",
"\"Which words do you like?\"",
"\"I'll say it again, or write it.\""
],
"say": "Here are words that help. How do you want to talk about this, sign, speech, text, or all three? Which words do you like? And, if you miss something, I'll say it again or write it."
},
{
"k": "card",
"title": "Peers who get it",
"body": "Deaf and hard of hearing groups, camps, and events.",
"say": "Help your child find Deaf and hard of hearing peers, through school programs, camps, or community events. Middle school friendships run on fast talk, and being understood without effort can be a deep relief. The audiologist or the school's Deaf and hard of hearing teacher can point you to options."
},
{
"k": "card",
"title": "Crisis help in ASL",
"body": "988: ASL Now on the website, or text 988.",
"say": "Know this, just in case. The 988 Lifeline has counselors who sign, by videophone, through ASL Now on the 988 website, and anyone can text 988. If your child ever talks about not wanting to be alive, stay with them and reach out together. For danger right now, call 911."
},
{
"k": "big",
"h": "Their language. Their way. In the conversation.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their language, their way, in the conversation. That's the goal. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "blind-low-vision",
"ring": "life",
"title": "Blind or Low Vision",
"you": {
"id": "as-g-blind-low-vision-you",
"guide": "blind-low-vision",
"side": "you",
"title": "Blind or Low Vision",
"sideName": "For You",
"mins": 3,
"sources": [
"apadisability"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Blind or Low Vision",
"sub": "For You",
"say": "If you're blind or have low vision, this is for you. Maybe you read braille, use a screen reader, or zoom way in. However you do it, your way works."
},
{
"k": "big",
"h": "Your way works.",
"sub": "And your words are yours.",
"say": "You get to choose your words. Lots of people say blind, plainly and proudly. Some say low vision. Some use other words. You're the expert on how you see and how you get around."
},
{
"k": "words",
"h": "Things that get in the way",
"items": [
"Small print",
"Late materials",
"People pointing",
"Being grabbed"
],
"say": "Some things get in the way. Small print. Materials that come late. People who point and say, over there. People who grab your arm to help. Those are about how the world does things. They're not about you being less."
},
{
"k": "points",
"h": "Things you can say",
"items": [
[
"Please say your name",
"When you walk up"
],
[
"Use words, not pointing",
"On my left, by the door"
],
[
"I've got it, thanks",
"Or, can I take your elbow?"
]
],
"say": "Here are things you can say. Please say your name when you walk up. Use words, not pointing, like on my left, by the door. And, I've got it, thanks. Or, can I take your elbow? You decide what help you want.",
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
"h": "Pick one and say it.",
"sub": "Like you mean it.",
"say": "Let's practice. Pick the line you need most. Picture someone at school who needs to hear it. Take a breath. Now say it out loud, calm and clear.",
"beats": [
"Let's practice.",
"Pick the line you need most.",
"Picture someone at school who needs to hear it.",
"Take a breath.",
{
"t": "Now say it out loud, calm and clear.",
"w": 10
}
]
},
{
"k": "card",
"title": "Find people who get it.",
"body": "Blind and low vision friends, camps, and programs.",
"say": "It helps to know other kids who are blind or have low vision. Ask a grown-up to help you find groups, camps, or summer programs. You can trade tips, and nobody needs anything explained."
},
{
"k": "card",
"title": "Tell a grown-up you trust.",
"body": "If someone is mean, or you feel down a lot.",
"say": "If someone teases you, moves your things on purpose, or leaves you out, it's not your fault. Tell a grown-up you trust the same day. And if you feel down a lot, tell someone. That's a strong move."
},
{
"k": "big",
"h": "You know your way.",
"sub": "Your independence matters.",
"say": "You know your way, and your independence matters. Keep speaking up for the way that works for you."
}
]
},
"helper": {
"id": "as-g-blind-low-vision-helper",
"guide": "blind-low-vision",
"side": "helper",
"title": "Blind or Low Vision",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"apadisability",
"barnessocial",
"carterbelong"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Blind or Low Vision",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler who is blind or has low vision, this is for you. Your child may read braille, use a screen reader, use large print or magnification, travel with a cane, or use a mix. Their way works."
},
{
"k": "big",
"h": "Their words, their way.",
"say": "Many blind people say blind plainly, as a fact and sometimes with pride. Others say low vision or visually impaired. Each person chooses their own words. Ask your child, and use theirs, even if they're different from yours."
},
{
"k": "points",
"h": "Where school gets hard",
"items": [
[
"Small print",
"Handouts and tests"
],
[
"Late formats",
"Braille after the unit ends"
],
[
"Unread slides",
"And silent videos"
],
[
"Busy halls",
"Backpacks and crowds"
]
],
"say": "Much of what makes school hard is format. Handouts and tests in small print. Braille books that arrive after the unit is over. Slides no one reads aloud. And hallways full of backpacks and crowds.",
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
"h": "The team at school",
"steps": [
[
"A vision teacher",
"Formats and technology"
],
[
"Orientation and mobility",
"Traveling with independence"
],
[
"An IEP or 504 plan",
"Materials on time, every time"
]
],
"say": "Get to know the team. A teacher of students with visual impairments, for braille, formats, and technology. An orientation and mobility specialist, for traveling with independence. And an IEP or a 504 plan that says materials come in your child's format on time, every time. Questions about their eyes belong with the family and the eye doctor.",
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
"title": "Teach a few habits.",
"body": "Say your name. Describe. Offer an elbow. Say goodbye.",
"say": "Teach friends, relatives, and teachers a few habits. Say your name when you walk up. Describe what's happening out loud. Offer an elbow instead of steering. And say when you're leaving, so no one talks to an empty room."
},
{
"k": "big",
"h": "Describe the room you are in.",
"say": "Try this now. Look around the room you're in. Imagine your child just walked in beside you. Now describe the room out loud, in words, the way you would for them: where things are, and who is here.",
"beats": [
"Try this now.",
"Look around the room you're in.",
"Imagine your child just walked in beside you.",
{
"t": "Now describe the room out loud, in words, the way you would for them: where things are, and who is here.",
"w": 12
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How do you like to read this?\"",
"\"Want my elbow, or are you good?\"",
"\"Which words do you like?\""
],
"say": "Here are words that help. How do you like to read this, braille, audio, or large print? Want my elbow, or are you good? And, which words do you like?"
},
{
"k": "card",
"title": "Let them do it their way.",
"body": "Independence is the goal at this age.",
"say": "Independence is a big goal in middle school. Let your child do things their own way, even when it takes longer. Doing it for them can feel kind, and it can also tell them you don't think they can. Help them find blind and low vision peers too, through camps and programs."
},
{
"k": "card",
"title": "Watch the heart too.",
"body": "Social life is visual at this age.",
"say": "Middle school social life is very visual, with glances and phones held up to share. Watch for being left out, and for low mood. Bring in the school counselor if it hangs on. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Their way works.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their way works. Help the world catch up, and let them lead. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "autistic-ms",
"ring": "life",
"title": "Autistic in Middle School",
"you": {
"id": "as-g-autistic-ms-you",
"guide": "autistic-ms",
"side": "you",
"title": "Autistic in Middle School",
"sideName": "For You",
"mins": 3,
"sources": [
"kenny16"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Autistic in Middle School",
"sub": "For You",
"say": "If you're autistic, or you're figuring out that you might be, this is for you. Your brain works in its own way. That's not broken. It's you."
},
{
"k": "big",
"h": "Your brain works its own way.",
"sub": "Your words are yours.",
"say": "Lots of people say autistic, the way someone might say left-handed. Some say they have autism. Some use other words. You get to choose. And whatever word you use, your brain has real strengths."
},
{
"k": "words",
"h": "Middle school can be a lot",
"items": [
"Loud halls",
"Bright lights",
"Changes",
"Unspoken rules"
],
"say": "Middle school can be a lot. Loud halls. Bright lights. Changes in the schedule. And social rules nobody explains. If you come home wiped out, that makes total sense. You've been working hard all day."
},
{
"k": "points",
"h": "Things that can help",
"items": [
[
"A quiet place",
"To reset"
],
[
"A heads-up",
"Before changes"
],
[
"Moving or fidgeting",
"If it calms you"
]
],
"say": "Here are things that can help. A quiet place to reset. A heads-up before changes. And moving or fidgeting in ways that calm you. You can ask for these. A grown-up can help put them in your school plan.",
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
"h": "What is your best reset?",
"sub": "Headphones, a walk, a fidget, quiet.",
"say": "Let's figure out yours. Think about a time you felt overloaded, and then felt better. What helped you reset? Headphones, a walk, a fidget, quiet, or something else. Now say your best reset out loud, so you remember it.",
"beats": [
"Let's figure out yours.",
"Think about a time you felt overloaded, and then felt better.",
"What helped you reset?",
"Headphones, a walk, a fidget, quiet, or something else.",
{
"t": "Now say your best reset out loud, so you remember it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Find your people.",
"body": "Friends who love what you love.",
"say": "Friends can start with what you love. A club, a team, a game, or a group built around your interest. You don't have to be friends with everyone. A few good ones who get you is plenty."
},
{
"k": "card",
"title": "If someone is mean, tell a grown-up.",
"body": "The same day. It is not your fault.",
"say": "If someone teases you, tricks you, or leaves you out on purpose, it's not your fault. Tell a grown-up you trust the same day. And if you feel down or worried a lot, tell someone. Help is there."
},
{
"k": "big",
"h": "You are just right as you are.",
"sub": "You are you.",
"say": "You are not too much, and you are not too little. You are you, with a brain that notices things others miss."
}
]
},
"helper": {
"id": "as-g-autistic-ms-helper",
"guide": "autistic-ms",
"side": "helper",
"title": "Autistic in Middle School",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"kenny16",
"apadisability",
"carterbelong"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Autistic in Middle School",
"sub": "For the Grown-up",
"say": "If you're helping an autistic middle schooler, this is for you. Your child may notice details others miss, love some things deeply, and find much of middle school loud, fast, and confusing. All of that can be true at once."
},
{
"k": "big",
"h": "Ask them which words they like.",
"say": "Many autistic people, and many families, prefer the word autistic, because autism is part of how their brain works. Others prefer a person with autism. Each person chooses their own words. Ask your child, and use theirs."
},
{
"k": "points",
"h": "The load of middle school",
"items": [
[
"Senses",
"Noise, lights, crowds"
],
[
"Change",
"A new class every hour"
],
[
"Unspoken rules",
"Social codes no one explains"
],
[
"Masking",
"Hiding what feels natural"
]
],
"say": "Middle school carries a heavy load. The senses: noise, lights, and crowds. Change, with a new class every hour. Unspoken social rules. And masking, which means copying others and hiding what feels natural, all day long. Many autistic kids come home exhausted.",
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
"title": "A meltdown is overload.",
"body": "Calm and space first. Talk later.",
"say": "A meltdown or a shutdown is usually overload, not a choice to misbehave. In the moment, lower the load. Fewer words, less noise, more space. Keep everyone safe, and wait. Talk about it later, when they're calm, and look for what filled the cup."
},
{
"k": "flow",
"h": "Build supports into the day",
"steps": [
[
"A quiet place",
"And permission to use it"
],
[
"A heads-up",
"Before changes"
],
[
"Clear instructions",
"Written down"
],
[
"Room to move",
"Fidget, pace, or stim"
]
],
"say": "Work with the school, often through an IEP or a 504 plan, to build supports into the day. A quiet place, and permission to use it. A heads-up before changes. Clear instructions, written down. And room to move, fidget, or stim in ways that calm. Questions about evaluations, therapies, or medicine belong with the family and the doctor.",
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
"\"What was hardest, and what helped?\"",
"\"You don't have to look at me.\"",
"\"Tell me about the thing you love.\""
],
"say": "Here are words that help. What was the hardest part of today, and what helped? You don't have to look at me to talk. And, tell me about the thing you love. I want to understand it."
},
{
"k": "big",
"h": "Ask about their world.",
"say": "Try this now. Think about the thing your child loves most right now. A game, an animal, a show, a system, a fact. Now say out loud one real question you could ask them about it tonight, and mean it.",
"beats": [
"Try this now.",
"Think about the thing your child loves most right now.",
"A game, an animal, a show, a system, a fact.",
{
"t": "Now say out loud one real question you could ask them about it tonight, and mean it.",
"w": 10
}
]
},
{
"k": "card",
"title": "Friendship can look different.",
"body": "Shared interests, small groups, online.",
"say": "Friendship can look different. Many autistic kids connect best around a shared interest, in smaller groups, or online. Help your child find clubs, teams, and groups built around what they love, and autistic peers when you can."
},
{
"k": "card",
"title": "Watch for bullying and worry.",
"body": "Act the same day. Keep the counselor close.",
"say": "Autistic students are bullied more often, so watch for it, and act the same day. Kids who mask a lot can also carry more worry and low mood. Keep the counselor close. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Lower the load. Honor who they are.",
"sub": "The full guide has more, whenever you want it.",
"say": "Lower the load, and honor who they are. Rest for you counts too. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "sibling-disability",
"ring": "life",
"title": "A Sibling With a Disability or Illness",
"you": {
"id": "as-g-sibling-disability-you",
"guide": "sibling-disability",
"side": "you",
"title": "A Sibling With a Disability or Illness",
"sideName": "For You",
"mins": 3,
"sources": [
"sibsupport"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Sibling With a Disability or Illness",
"sub": "For You",
"say": "If your brother or sister lives with a disability or an illness, this is for you. You matter too, and so do your feelings."
},
{
"k": "words",
"h": "You might feel",
"items": [
"Proud",
"Jealous",
"Embarrassed",
"Worried",
"Guilty"
],
"say": "You might feel proud of them. You might feel jealous of the time they get. Sometimes embarrassed, sometimes worried, sometimes guilty for feeling any of it. All of these can be true on the same day. None of them make you a bad brother or sister."
},
{
"k": "big",
"h": "You can love them and still be mad.",
"sub": "Both can be true.",
"say": "Here's something to keep. You can love your sibling and still be mad about how things are. You can be glad you're healthy and also sad for them. Both can be true."
},
{
"k": "big",
"h": "Say one thing you usually keep inside.",
"sub": "Quietly, just for you.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Think of one feeling about your sibling that you usually keep inside. You don't have to share it with anyone. Just say it quietly to yourself, in a whisper.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Think of one feeling about your sibling that you usually keep inside.",
"You don't have to share it with anyone.",
{
"t": "Just say it quietly to yourself, in a whisper.",
"w": 10
}
]
},
{
"k": "points",
"h": "Things you can ask for",
"items": [
[
"Time just for you",
"Even a little"
],
[
"Answers",
"About their condition"
],
[
"A break",
"From helping, sometimes"
]
],
"say": "You can ask your grown-up for things too. Time just for you, even a little. Answers to your questions about your sibling's condition. And a break from helping, sometimes. Helping is kind. But the grown-up jobs belong to the grown-ups.",
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
"title": "Other kids get it.",
"body": "Groups for brothers and sisters, like Sibshops.",
"say": "There are groups just for brothers and sisters of kids with disabilities or illness. They're fun, and nobody needs anything explained. Ask your grown-up to help you look for one."
},
{
"k": "card",
"title": "If it gets heavy, tell someone.",
"body": "A parent, the counselor, or a teacher.",
"say": "If you feel worried all the time, or really down, tell a grown-up you trust. A parent, the school counselor, or a teacher. Your feelings deserve a place to go."
},
{
"k": "big",
"h": "You matter too.",
"sub": "Your story counts.",
"say": "You matter too. Your story counts, and you deserve care and attention of your own."
}
]
},
"helper": {
"id": "as-g-sibling-disability-helper",
"guide": "sibling-disability",
"side": "helper",
"title": "A Sibling With a Disability or Illness",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"sibsupport",
"aacy",
"carterbelong"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "A Sibling With a Disability or Illness",
"sub": "For the Grown-up",
"say": "If you're raising or helping a middle schooler whose brother or sister lives with a disability or an illness, this is for you. You're carrying a lot. This video is about the child who sometimes gets less of you."
},
{
"k": "big",
"h": "Siblings carry a quiet share.",
"say": "Brothers and sisters carry a quiet share of family life. Many feel deep love and pride. And also jealousy, embarrassment, worry, guilt for being healthy, or anger about the time their sibling needs. Programs for siblings grew from the discovery that they had real needs and few places to meet them."
},
{
"k": "card",
"title": "They may hide it to protect you.",
"body": "Say out loud that every feeling is welcome.",
"say": "A middle schooler may hide hard feelings to avoid adding to your load. So say it out loud. Every feeling is welcome here, the hard ones too. You can love your brother and be mad about how things are. Both can be true."
},
{
"k": "points",
"h": "What helps",
"items": [
[
"Time just for them",
"Even fifteen minutes"
],
[
"Honest information",
"Simple and true"
],
[
"Words for friends",
"And a say about visits"
]
],
"say": "Here's what helps. Time that belongs only to this child, even fifteen minutes a week. Honest, simple information about their sibling's condition, because silence grows into worry. And words for questions from friends, plus a say in when friends come over.",
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
"title": "Helping, or carrying?",
"body": "Keep the grown-up jobs with grown-ups.",
"say": "Many siblings help at home, and helping can grow kindness and skill. Watch for the line where helping turns into carrying. Missing school, losing friends, staying up worried, or feeling responsible for their sibling's safety. Keep the adult jobs with adults."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"How are you doing? Not your sister. You.\"",
"\"Both can be true.\"",
"\"This time is just for you.\""
],
"say": "Here are words that help. How are you doing? Not your sister. You. It's okay to love him and be mad about how things are. Both can be true. And, this time is just for you."
},
{
"k": "words",
"h": "Words to leave out",
"items": [
"\"You're the easy one.\"",
"\"At least you're healthy.\"",
"Only sibling talk"
],
"say": "Try not to say, you're the easy one, or at least you're healthy. Both can make their needs feel smaller. And try not to make every conversation about their sibling."
},
{
"k": "big",
"h": "Name their time.",
"say": "Try this now. Picture your week, day by day. Find fifteen minutes that could belong only to this child. Now say out loud the day and the time, and one thing you could do together.",
"beats": [
"Try this now.",
"Picture your week, day by day.",
"Find fifteen minutes that could belong only to this child.",
{
"t": "Now say out loud the day and the time, and one thing you could do together.",
"w": 10
}
]
},
{
"k": "card",
"title": "Groups for siblings, and for you",
"body": "Sibshops. Other parents. The counselor.",
"say": "Look for a sibling group, like a Sibshop, where your child can meet other kids who get it. Keep the school counselor in the loop if worry or sadness hangs on. And find support for yourself too. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Every child in the family counts.",
"sub": "The full guide has more, whenever you want it.",
"say": "Every child in the family counts, and so do you. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "telling-friends",
"ring": "life",
"title": "Telling Friends, or Not",
"you": {
"id": "as-g-telling-friends-you",
"guide": "telling-friends",
"side": "you",
"title": "Telling Friends, or Not",
"sideName": "For You",
"mins": 3,
"sources": [],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Telling Friends, or Not",
"sub": "For You",
"say": "If you live with a health condition, a disability, or something about your mind or body that friends might ask about, this is for you. Who knows is mostly up to you."
},
{
"k": "big",
"h": "It's your story.",
"sub": "You decide who hears it.",
"say": "Here's the big idea. It's your story. You decide who hears it, and how much. Some kids tell everyone. Some tell one close friend. Some keep it private. All of those can be good choices."
},
{
"k": "points",
"h": "Three answers to have ready",
"items": [
[
"A short one",
"For anyone who asks"
],
[
"A longer one",
"For close friends"
],
[
"\"I'd rather not say\"",
"Kind and firm"
]
],
"say": "It helps to have three answers ready. A short one, for anyone who asks. A longer one, for close friends who've earned it. And, I'd rather not talk about it. That one is kind, firm, and always allowed.",
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
"h": "Make your short answer.",
"sub": "One sentence, in your words.",
"say": "Let's make your short answer. Think about what friends might ask. Pick one simple, true sentence you'd be okay saying to anyone. Now say it out loud, like you're answering a friend at lunch.",
"beats": [
"Let's make your short answer.",
"Think about what friends might ask.",
"Pick one simple, true sentence you'd be okay saying to anyone.",
{
"t": "Now say it out loud, like you're answering a friend at lunch.",
"w": 10
}
]
},
{
"k": "card",
"title": "A few grown-ups may need to know.",
"body": "Like the nurse or a coach, for safety.",
"say": "A few grown-ups may need to know, to keep you safe. Like the school nurse, a coach, or a friend's parent at a sleepover. You can help decide what they hear, and how."
},
{
"k": "card",
"title": "Keep up what keeps you well.",
"body": "Ask a grown-up for a more private way.",
"say": "Sometimes kids skip medicine or the nurse so nobody asks questions. That can make your body pay. Tell a grown-up you want more privacy. There's usually a quieter way."
},
{
"k": "card",
"title": "If someone spreads it or teases",
"body": "Not your fault. Tell a grown-up the same day.",
"say": "If someone shares your story without asking, or teases you about it, that's on them, not you. Tell a grown-up you trust the same day. And remember, posts and screenshots last, so think before you share online."
},
{
"k": "big",
"h": "Your story, your choice.",
"sub": "You can change your mind anytime.",
"say": "Your story, your choice. And you can change your mind anytime."
}
]
},
"helper": {
"id": "as-g-telling-friends-helper",
"guide": "telling-friends",
"side": "helper",
"title": "Telling Friends, or Not",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"carterbelong",
"apadisability"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Telling Friends, or Not",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler decide whether to tell friends about a health condition, a disability, or a mental health condition, this is for you. The question comes up again and again, with every new friend, team, and sleepover."
},
{
"k": "big",
"h": "It is their choice, whenever safety allows.",
"say": "Who knows is your child's choice, whenever safety allows. Some kids want everyone to know so they can stop explaining. Some tell one or two friends. Some keep it private. Each can be a good choice. What matters is that it's theirs, made with your help, and that they can change their mind."
},
{
"k": "points",
"h": "Help them build three answers",
"items": [
[
"A short version",
"For anyone"
],
[
"A longer version",
"For close friends"
],
[
"\"I'd rather not say\"",
"Always allowed"
]
],
"say": "Help them build three answers. A short version for anyone, like, I have diabetes, so sometimes I check my blood sugar. A longer version for close friends. And a kind, firm, I'd rather not talk about it. Practice them together, out loud.",
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
"title": "Some adults need to know for safety.",
"body": "Explain why. Decide together how much.",
"say": "A few adults may need to know for safety. The school nurse, a coach, a friend's parent at a sleepover. Explain why, and let your child help decide what those adults hear and how. Being part of that decision builds trust."
},
{
"k": "card",
"title": "When hiding turns risky",
"body": "Skipping medicine or the nurse to avoid questions.",
"say": "Hiding can turn risky when it means skipping medicine, the nurse, or an inhaler to avoid questions. If that's happening, get curious instead of angry. Ask what makes it hard, and look for a more private way with the nurse and the doctor."
},
{
"k": "big",
"h": "Remember your own choice.",
"say": "Try this now. Think of a time you chose not to tell someone something personal about you. Notice how much that choice mattered to you. Now say out loud, the way you'll say it to your child, it's your story to tell.",
"beats": [
"Try this now.",
"Think of a time you chose not to tell someone something personal about you.",
"Notice how much that choice mattered to you.",
{
"t": "Now say out loud, the way you'll say it to your child, it's your story to tell.",
"w": 10
}
]
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"It's your story.\"",
"\"Want to practice what you'd say?\"",
"\"If someone is unkind, I want to know.\""
],
"say": "Here are words that help. It's your story. You decide who hears it. Want to practice what you'd say? And, if someone is unkind about it, I want to know."
},
{
"k": "points",
"h": "Leave these out",
"items": [
[
"Tell for them",
"Without asking first"
],
[
"Push either way",
"\"Be open,\" or \"keep it quiet\""
],
[
"Post about it",
"Without their yes"
]
],
"say": "Try not to tell other parents, teachers, or relatives without asking first, unless safety requires it. Try not to push them either way, toward be open, or toward keep it quiet. And never post about their condition online without their yes.",
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
"title": "If someone spreads it",
"body": "Unkind, and sometimes bullying. Act the same day.",
"say": "If a friend shares their story without permission or teases them about it, that's unkind, and sometimes it's bullying. Help them tell a trusted adult at school the same day. If your child ever talks about not wanting to be alive, stay with them and call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Their story. Their choice. Your help.",
"sub": "The full guide has more, whenever you want it.",
"say": "Their story, their choice, with your help. The full guide has more, whenever you want it."
}
]
}
},
{
"id": "why-me",
"ring": "life",
"title": "Why Me? Faith and a Body That's Different",
"you": {
"id": "as-g-why-me-you",
"guide": "why-me",
"side": "you",
"title": "Why Me? Faith and a Body That's Different",
"sideName": "For You",
"mins": 3,
"sources": [
"uabspirit"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Why Me? Faith and a Body That's Different",
"sub": "For You",
"say": "If you live with an illness or a disability, and you've ever wondered, why me, this is for you. Big questions are welcome here."
},
{
"k": "big",
"h": "Why me? is a real question.",
"sub": "People have asked it for thousands of years.",
"say": "Why me? Is this fair? Did I do something wrong? These are real questions. People have asked them for thousands of years. You're allowed to ask them too, out loud."
},
{
"k": "big",
"h": "It is not a punishment.",
"sub": "No one caused this by being bad.",
"say": "Here's something true. Your illness or disability is not a punishment. No one caused it by being bad. Not you, and not your family."
},
{
"k": "words",
"h": "Places people find help",
"items": [
"Prayer or worship",
"A faith leader",
"Quiet or nature",
"Family traditions"
],
"say": "People find help with big questions in different places. Some pray, or go to worship, or talk with a faith leader. Some find it in quiet, in nature, in music, or in their family's traditions. Start with what your family does, and notice what helps you."
},
{
"k": "big",
"h": "Ask your big question.",
"sub": "Out loud, or in a whisper.",
"say": "Let's take a moment. Breathe in slowly, and let it out. Think of the biggest question you have about your body or your life. You don't need an answer right now. Just ask it, out loud or in a whisper.",
"beats": [
"Let's take a moment.",
"Breathe in slowly, and let it out.",
"Think of the biggest question you have about your body or your life.",
"You don't need an answer right now.",
{
"t": "Just ask it, out loud or in a whisper.",
"w": 10
}
]
},
{
"k": "card",
"title": "Bring it to someone you trust.",
"body": "A parent, a faith leader, or the counselor.",
"say": "Bring your question to someone you trust. A parent, a grandparent, a faith leader, or the school counselor. They might not have every answer. Wondering together still helps."
},
{
"k": "card",
"title": "If someone said something that hurt",
"body": "Tell a grown-up. You can feel how you feel.",
"say": "Some kids hear that they'd be healed if they believed more, or get prayed over without being asked. If something like that hurt or confused you, tell a grown-up you trust. You're allowed to feel how you feel."
},
{
"k": "big",
"h": "You are loved, just as you are.",
"sub": "Questions and all.",
"say": "You are loved, just as you are, questions and all. Your big questions don't push anyone away. They invite people closer."
}
]
},
"helper": {
"id": "as-g-why-me-helper",
"guide": "why-me",
"side": "helper",
"title": "Why Me? Faith and a Body That's Different",
"sideName": "For the Grown-up",
"mins": 4,
"sources": [
"uabspirit",
"carterbelong"
],
"scenes": [
{
"k": "title",
"hero": "aspen",
"eyebrow": "When Life Changes",
"h": "Why Me? Faith and a Body That's Different",
"sub": "For the Grown-up",
"say": "If you're helping a middle schooler with an illness or a disability who is asking big questions, about why, about fairness, about God, this is for you. You don't need perfect answers."
},
{
"k": "big",
"h": "Let the question be asked.",
"say": "Why me? Is this fair? Did I do something wrong? Middle schoolers living with an illness or a disability often ask the biggest questions there are. The first gift is simple. Let the question be asked out loud, and take your time settling it."
},
{
"k": "card",
"title": "Start from your own family.",
"body": "Faith and prayer, or quiet, nature, and tradition.",
"say": "Start from your own family. For many families, these questions live in prayer, in a congregation, in sacred stories, or in a grandparent's steady trust. For others, they live in quiet, nature, art, and family traditions. Both are doors to meaning. Walk through the ones your family knows."
},
{
"k": "points",
"h": "Resource, or weight?",
"items": [
[
"Strength",
"Faith that holds them up"
],
[
"Weight",
"Feeling punished or abandoned"
],
[
"Both",
"On the same day"
]
],
"say": "Faith can be a resource or a weight. For teens living with a chronic illness, finding strength in faith tends to go with doing better, and feeling punished or abandoned by God tends to go with a harder time. So listen for both. And know they can show up on the same day.",
"cue": {
"at": [
1,
1,
3
]
}
},
{
"k": "card",
"title": "Say it plainly: not a punishment.",
"body": "No one caused this by being bad.",
"say": "Some kids have heard that illness is a punishment, or that enough faith would heal them, or have been prayed over without being asked. Say it plainly. No one caused this by being bad. Then let them tell you how those moments felt, without defending anyone."
},
{
"k": "words",
"h": "Words that help",
"items": [
"\"That's a real question.\"",
"\"It's not a punishment.\"",
"\"I'm not going anywhere.\""
],
"say": "Here are words that help. That's a real question. People have asked it for thousands of years. No one caused this by being bad. And, I don't know all the answers. I'm not going anywhere."
},
{
"k": "words",
"h": "Words to leave out",
"items": [
"\"Everything happens for a reason.\"",
"\"God only gives you what you can handle.\"",
"\"Pray harder.\""
],
"say": "Try not to say, everything happens for a reason, or, God only gives you what you can handle. Kids can hear blame in these. And try not to promise that enough faith or prayer will make it go away."
},
{
"k": "big",
"h": "Practice the steady answer.",
"say": "Try this now. Picture your child asking you, why me, with tears in their eyes. Let your shoulders soften. Now say out loud, slowly, I don't know all the answers, and I'm not going anywhere.",
"beats": [
"Try this now.",
"Picture your child asking you, why me, with tears in their eyes.",
"Let your shoulders soften.",
{
"t": "Now say out loud, slowly, I don't know all the answers, and I'm not going anywhere.",
"w": 10
}
]
},
{
"k": "card",
"title": "Help them belong.",
"body": "Talk with your faith leader about taking part.",
"say": "A faith community can be a place where your child is fully welcome, or a place with steps, long services, loud rooms, or no role for them. Talk with your faith leader about what would help your child take part. And if questions turn into deep hopelessness, bring in the counselor. If your child talks about not wanting to be alive, call or text 988. For danger right now, call 911."
},
{
"k": "big",
"h": "Wonder with them. Stay with them.",
"sub": "The full guide has more, whenever you want it.",
"say": "Wonder with them, and stay with them. That is often the most faithful answer there is. The full guide has more, whenever you want it."
}
]
}
}
]
};
})();
