/* =====================================================================
   PINE . WHEN LIFE CHANGES (DRAFT, NOT LIVE)
   Guides for grown-ups talking with high schoolers, grades 9 to 12.
   Nothing on the site loads or links to this file yet. It waits here
   until Pine launches. When it does, Pine loads this file
   the same way Aspen loads aspen/guides.js, and the site-wide
   search on the Tools page adds it (one line in search.js).

   Same shape as Aspen: quick, talk, say, avoid, help, sources.
   ===================================================================== */
(function(){
const L = (text, url) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;
const CALM = 'If anyone is in danger, or they talk about hurting themselves or not wanting to be alive, stay with them if it is safe and call or text 988, or call 911 in an emergency.';
const T = {};

T.blowup = {
  quick:["Calm yourself first. A slower breath and a lower voice do more than any argument.","Step back and give room. Stand to the side, keep your hands relaxed, and never block the door.","Offer an exit with dignity: \"Go take a walk. We'll talk when you're back.\"","If there is a weapon, a threat, or you feel unsafe, get to safety and call 911."],
  talk:["A high schooler in a blowup may be as big as you and just as loud, and it can feel like a fight between two adults. It isn't. Their brain is still building the brakes that weigh consequences, and under stress the feeling part takes over. Your job in the moment is not to win or to teach. It is to keep everyone safe and lower the temperature so their thinking can come back online.","Teens are fierce about respect and fairness. Commands, threats, and sarcasm almost always make it worse, and so does an audience. Talk to them like the near-adult they want to be: \"I can see this matters a lot to you. I want to hear it when we're both calmer.\" Give space, give time, and let them leave the room if it's safe to. Do not try to physically stop or hold a teenager unless someone is about to be hurt.","Come back to it later, when everyone is calm. Ask what was going on underneath: stress, a breakup, grades, lack of sleep, something online, or something bigger. Make a plan together for next time, in their words, including where they can go to cool off and who they can call. If blowups come with drinking or drugs, driving angry, or talk of hurting someone, get help right away."],
  say:["\"I'm not going to yell. I want to understand.\"","\"You can take a break. I'll be here when you're ready.\"","\"What do you need right now?\"","Later: \"That got big. What was really going on?\""],
  avoid:["Matching their volume, or saying things you'll need to take back.","Consequences announced in the heat of the moment.","Taking the car keys or phone by force, or blocking their way.","Bringing it up in front of siblings or friends."],
  help:[L('Child Mind Institute','https://childmind.org'),L('Crisis Prevention Institute','https://www.crisisprevention.com'),CALM,'Your school counselor or your teen\'s doctor, if blowups keep happening or seem tied to something bigger.'],
  sources:[["Child Mind Institute","https://childmind.org"],["Crisis Prevention Institute","https://www.crisisprevention.com"]]
};

T.selfharm = {
  keys:"self harm self-harm self injury selfharm cutting burning hurting themselves on purpose",
  quick:["Stay calm and skip the lecture. They are watching to see if telling you was a mistake.", "Ask directly about suicide. Asking is safe.", "Get them seen this week, and follow the plan together.", "They are old enough to help shape the plan. Ask what would help."],
  talk:["High schoolers who self-harm often hide it well and may have been doing it for a while before anyone knows. They may be angry you found out, or relieved. Either way, the goal isn't to catch them. It's to stay connected while getting real help.", "Treat it like the health issue it is. Help with wound care calmly, secure medicines and sharp items, and get an appointment with their doctor or a therapist who uses skills-based therapy like DBT. Keep talking about the feelings underneath, not just the behavior.", "Watch for shifts: more secrecy, long sleeves in hot weather, pulling away from friends, or talk about being a burden. Those are reasons to ask about suicide again."],
  say:["\"I'm not mad. I'm here, and I want to understand.\"", "\"Are you thinking about killing yourself?\"", "\"What do you want me to know about what's been going on?\""],
  avoid:["Ultimatums, or making them promise to stop.", "Posting, texting, or telling other parents.", "Treating every hard mood as an emergency. Stay steady."],
  help:['Call or text 988, or chat at '+L('988lifeline.org','https://988lifeline.org/')+'.',L('Crisis Text Line','https://www.crisistextline.org/')+': text HOME to 741741.',L("JED Foundation","https://jedfoundation.org"),L("Cornell Self-Injury and Recovery Resources","https://selfinjury.bctr.cornell.edu"),"Your teen's doctor, or a therapist trained in DBT."],
  sources:[["JED Foundation", "https://jedfoundation.org"], ["Cornell Self-Injury and Recovery Resources", "https://selfinjury.bctr.cornell.edu"]]
};

T.eating = {
  keys:"eating disorder anorexia bulimia binge eating purging restricting weight cutting weight athlete food",
  quick:["Eating disorders are serious medical illnesses, at any body size.", "Watch for skipped meals, rigid food rules, bingeing, purging, or driven exercise, especially in athletes.", "Describe what you see, and go to the doctor together.", "For teens, parents are a key part of treatment."],
  talk:["High school brings sports, weight classes, dance, social media, and a lot of pressure about bodies. Eating disorders often grow quietly inside healthy-sounding goals like eating clean or training hard. A teen can be seriously ill and still look fine and keep their grades up.", "If you are worried, trust it. Book a doctor visit and share what you have seen. Family-based treatment, where parents take the lead at meals with a care team guiding, has the strongest evidence for teens. It is hard work, and it helps.", "Coaches and teammates matter. If your teen is an athlete, talk with the coach about weigh-ins, cutting weight, or comments about bodies."],
  say:["\"I love you, and I'm worried about how stressful eating has gotten.\"", "\"We're going to the doctor to check how your body is doing.\"", "\"This isn't your fault, and you don't have to fight it alone.\""],
  avoid:["Weight comments, including praise for weight loss.", "Arguing about food at every meal. Let the care team guide.", "Waiting until they want help."],
  help:["ANAD Eating Disorders Helpline: 1-888-375-7767, weekdays. National Alliance for Eating Disorders: 1-866-662-1235.",L("ANAD","https://anad.org"),L("The Emily Program (Minnesota)","https://emilyprogram.com"),"Call 911 for fainting, chest pain, or confusion.",CALM],
  sources:[["ANAD", "https://anad.org"], ["National Alliance for Eating Disorders", "https://www.allianceforeatingdisorders.com"]]
};

T.porn = {
  keys:"porn pornography explicit sexual videos nudes compulsive",
  quick:["Most teens have seen pornography. Talk about it anyway.", "Stay calm, keep it short, and share your values.", "Talk about respect, consent, and how porn distorts real relationships.", "If it is taking over, or anyone is pressuring them, get help."],
  talk:["By high school, most teens have seen porn, and some see it often. They may feel curious, guilty, or like it is no big deal. What they need from you isn't panic. It's a trusted adult who will talk honestly about sex, respect, and what healthy relationships actually look like.", "Porn often shows aggression and pressure as normal, and it can shape what teens expect from partners and from their own bodies. Name that plainly. Share your family's and your faith's values warmly, and ask what they think. Teens listen more when they are asked, not lectured.", "Watch for use that feels compulsive, grades or sleep slipping, secrecy that keeps growing, or sharing sexual images. Sharing or keeping sexual images of anyone under 18 can bring serious legal trouble, even between teens."],
  say:["\"I'm not trying to embarrass you. I want you to have better information than the internet gives.\"", "\"What do you think porn gets wrong about real relationships?\"", "\"If you ever feel like you can't stop, you can tell me.\""],
  avoid:["Shame or disgust.", "Relying only on filters and punishments.", "Skipping the talk because they are older."],
  help:[L("Common Sense Media","https://www.commonsensemedia.org"),'Report anyone who sends sexual images to a child or asks a child for them: '+L('CyberTipline','https://report.cybertip.org')+' or 1-800-843-5678.',"A counselor, if use feels out of control."],
  sources:[["Common Sense Media: Teens and Pornography", "https://www.commonsensemedia.org/research/teens-and-pornography"]]
};

T.accident = {
  keys:"car accident crash wreck new driver teen driver license injury concussion totaled friend died",
  quick:["If your teen was in a crash, get them checked, even if they feel fine.", "If they were driving, expect guilt, fear, or defensiveness. Lead with relief that they are alive.", "Handle consequences later, once everyone is calm.", "If a friend was hurt or killed, grief can hit a whole school. Stay close."],
  talk:["Car crashes are one of the biggest risks for teens, and new drivers crash most often in their first year behind the wheel. When it happens, the first job is safety and medical care. Concussions are common and easy to miss.", "If your teen was driving, they may be terrified of what you will say. Say you're glad they're alive first. Talk about what happened and what comes next, like insurance, tickets, or more practice, later, when everyone is calm. Getting back behind the wheel in small, planned steps helps fear shrink.", "If a friend or classmate was badly hurt or died, teens may carry guilt, especially if they were there. Watch for pulling away, reckless behavior, or talk of not wanting to be alive."],
  say:["\"I'm so glad you're okay. Everything else can wait.\"", "\"What was the hardest part?\"", "\"We'll figure out driving again together.\""],
  avoid:["Yelling at the scene or in the ER.", "Taking the keys forever with no plan to rebuild."],
  help:[L("CDC HEADS UP: Concussion","https://www.cdc.gov/heads-up/"),L("National Child Traumatic Stress Network","https://www.nctsn.org"),"Get medical care right away for a worsening headache, vomiting, confusion, or unusual sleepiness.",CALM],
  sources:[["CDC HEADS UP", "https://www.cdc.gov/heads-up/"], ["NHTSA: Teen driving", "https://www.nhtsa.gov/road-safety/teen-driving"]]
};

T.adhd = {
  keys:"adhd add attention focus learning disability dyslexia iep 504 plan transition accommodations college medication",
  quick:["ADHD and learning differences often feel heavier in high school, with more independence and less structure.", "Help your teen understand their own brain and speak up for what they need.", "Start planning early for life after high school, including supports in college or at work.", "Medication, driving, and substances need honest talks, since the stakes rise."],
  talk:["High school hands teens more freedom, more deadlines, and fewer reminders. For teens with ADHD or learning differences, this can mean slipping grades, missed work, and a lot of frustration. It is not a lack of caring.", "Shift from managing for them to coaching them. Ask what helps, let them lead school meetings, and teach them to ask teachers for accommodations. IEP transition planning starts in high school, and colleges and employers have their own supports that do not carry over automatically.", "ADHD raises some risks in the teen years, including car crashes and misuse of stimulant medicine by others. Talk about driving without distractions, and about never sharing or selling medication."],
  say:["\"What do you think would actually help?\"", "\"You know your brain better than anyone. Let's use that.\"", "\"Asking for accommodations is using the tools you are entitled to.\""],
  avoid:["Doing it all for them the night before.", "Treating grades as the only measure of who they are."],
  help:[L("CHADD","https://chadd.org"),L("Understood","https://www.understood.org"),L("PACER Center (Minnesota)","https://www.pacer.org")+": transition planning help."],
  sources:[["CHADD", "https://chadd.org"], ["Understood", "https://www.understood.org"]]
};

T.college = {
  keys:"college graduation leaving home senior year moving out dorm freshman trade school military gap year applications homesick launching future plans",
  quick:["Senior year and leaving home bring excitement and grief, for teens and for parents.", "There is more than one good path: college, trade school, work, service, or a gap year.", "Talk about mental health before they go, and where they will find help.", "Stay connected without hovering. Agree on how often you will talk."],
  talk:["The last year of high school can feel like a countdown. Teens may pull away, argue more, or cling tighter. That is often how people get ready to say goodbye. Parents grieve too, even when they are proud.", "Help them choose a path that fits them, not a script. College is one good road. So are the trades, work, military service, and taking time to figure things out. Pressure about getting in somewhere can crowd out the question of what they want.", "Before they leave, talk about the basics: money, laundry, sleep, alcohol and consent, and what to do if they feel low. Show them where counseling is on campus or at work, and remind them that 988 works anywhere. Many young adults feel homesick or lonely the first months. It usually eases, and reaching out is a sign of strength."],
  say:["\"I'm proud of you, and I'm going to miss you. Both are true.\"", "\"What are you most excited about? Most nervous about?\"", "\"If it gets hard out there, call me. Or call 988. You don't have to tough it out.\""],
  avoid:["Comparing their plans to siblings or friends.", "Treating any path other than college as settling.", "Checking in so often that they can't build their own life there."],
  help:[L("JED Foundation: Set to Go","https://settogo.org"),'Call or text 988, or chat at '+L('988lifeline.org','https://988lifeline.org/')+'.',"Their school counselor, for plans, applications, and financial aid."],
  sources:[["JED Foundation: Set to Go", "https://settogo.org"]]
};

T.lying = {
  keys:"lying lies liar sneaking stealing shoplifting trust money missing honesty sneaking out",
  quick:["Some lying is part of wanting independence. It still matters.", "Say what you know, calmly, instead of setting traps.", "Rebuild trust in steps, with a clear path back.", "Stealing, sneaking out, or lies that keep growing can point to something bigger."],
  talk:["Teens lie to protect privacy, avoid conflict, or cover for friends. Most of it is ordinary. Some of it is a warning, especially when it comes with missing money, new friends, falling grades, or changes in sleep and mood.", "Respond with consequences that fit, and a clear way to earn trust back. Teens need to know the relationship is not over, and that honesty is the fastest way through.", "Shoplifting or stealing can bring legal trouble at this age. It can also be a sign of substance use, gambling, debt to someone, or depression. Ask what is going on, and listen for what they are not saying."],
  say:["\"I know you weren't at Sam's. I want to hear what really happened.\"", "\"Here is how we rebuild trust.\"", "\"Is something going on that you're afraid to tell me?\""],
  avoid:["Snooping as your main strategy. Talk first.", "Consequences so big that they have nothing left to lose."],
  help:[L("Child Mind Institute","https://childmind.org"),"Your teen's school counselor or doctor, if the lying or stealing keeps growing.",CALM],
  sources:[["Child Mind Institute", "https://childmind.org"]]
};

T.gambling = {
  keys:"gambling sports betting betting apps fantasy sports poker online casino loot boxes parlay odds debt",
  quick:["Sports betting apps and ads are everywhere, and some teens bet underage.", "Talk about how betting is designed so the house wins over time.", "Watch for missing money, borrowed accounts, or mood tied to game results.", "Help is free in Minnesota for teens and families: 1-800-333-4673 (HOPE)."],
  talk:["Many high schoolers see betting as part of watching sports. Some use friends' or parents' accounts, offshore sites, or bet with each other through apps. Young people are more likely than adults to develop gambling problems, and it can move fast.", "Talk about odds, ads, and \"chasing losses.\" Ask what their friends are doing. If you gamble, think about what they see at home.", "Signs of trouble include secrecy about money, selling things, borrowing, lying about where money went, or mood swings tied to games. Gambling problems raise the risk of depression and suicide, so check in about that too."],
  say:["\"A lot of kids in your grade bet on games. What have you seen?\"", "\"Those apps make money because most people lose.\"", "\"If you're in over your head, tell me. We'll deal with it together.\""],
  avoid:["Paying off a teen's gambling debt without a plan and help.", "Letting them use your betting accounts."],
  help:["Minnesota Problem Gambling Helpline: 1-800-333-4673 (HOPE), or text HOPE to 53342. Free counseling for gamblers and their families. Outside Minnesota: 1-800-GAMBLER.",L("Minnesota Alliance on Problem Gambling","https://mnapg.org"),CALM],
  sources:[["Minnesota Alliance on Problem Gambling", "https://mnapg.org"], ["National Council on Problem Gambling", "https://www.ncpgambling.org"]]
};

const GROUPS = [
  ["Home and family", [["blowup","In the middle of a blowup"],["accident","Car crashes and new drivers"],["lying","Lying and stealing"]]],
  ["School and the future", [["adhd","ADHD and learning differences"],["college","Graduation, college, and leaving home"]]],
  ["Growing up and online", [["eating","Eating disorders"],["porn","Pornography"],["gambling","Gambling and sports betting"]]],
  ["Safety", [["selfharm","Self-harm"]]]
];
window.PINE_GUIDES = {groups: GROUPS.map(([name, list]) => ({name, topics: list.map(([id, title]) => Object.assign({id, title}, T[id] || {}))}))};
})();
