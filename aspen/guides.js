/* Aspen by Grow With Grounded: When Life Changes guides for grown-ups talking with middle schoolers.
   Each guide: quick card, talking it through, words to use, try not to, where to get help, sources. */
(function(){
const L = (text, url) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;
const CALM = 'If anything points to someone hurting them, or thoughts of not wanting to be alive, stay with them and call or text 988, or call 911 in an emergency.';
const T = {};

/* ---------------- Home and family ---------------- */
T.blowup = {
  quick:["Lower the temperature first: slow your breathing, soften your voice, and talk less.","Lose the audience. Move other kids away or step somewhere quieter. Nobody backs down in front of friends.","Give space and a way out that saves face: \"Take a minute. I'll be right here.\"","No consequences, lectures, or debates until everyone is calm. The real talk comes later."],
  talk:["When a middle schooler blows up, the feeling part of the brain is running the show and the part that weighs consequences has gone quiet. That's normal brain development, not a character flaw. Logic, threats, and lectures don't land in that moment. What does land is a calm adult who isn't escalating back. Calm is contagious, and so is panic, so the first move is always your own: slower breath, lower voice, fewer words.","Middle schoolers care intensely about how they look to peers, so a blowup in front of others is partly about pride. Stand a little to the side instead of face to face, keep your hands relaxed and where they can see them, don't block the door, and don't touch them unless someone could get hurt. In a classroom, it is usually easier to move the other students, or send for another adult, than to move the student who is upset. Offer small choices that are both fine with you: \"Do you want to walk with me, or sit here for a few minutes?\" Silence is okay. Waiting is doing something.","When they're calm, and that might be an hour later or the next day, come back to it. Reconnect first, then talk about what happened, how to make it right, and what could help next time. Most kids this age are embarrassed after a blowup. Repair goes better when they know the relationship is still solid. If blowups are frequent, make a plan together while things are calm: a signal, a place to cool off, and who they can go to."],
  say:["\"I can see you're really upset. I'm not going anywhere.\"","\"You don't have to talk right now. Take a minute.\"","\"Want to walk, or sit here?\"","\"We'll figure this out when things are calmer.\"","Later: \"That got big. What was going on for you right before it happened?\""],
  avoid:["Raising your voice to match theirs, or sarcasm.","Ultimatums and consequences in the heat of the moment.","Standing over them, cornering them, or grabbing their phone or arm.","Rehashing it in front of friends or siblings."],
  help:[L('Child Mind Institute','https://childmind.org'),L('Crisis Prevention Institute','https://www.crisisprevention.com'),CALM,'Your school counselor, if blowups keep happening or seem to be about something bigger.'],
  sources:[["Child Mind Institute","https://childmind.org"],["Crisis Prevention Institute","https://www.crisisprevention.com"]]
};

T.death = {
  quick:["Use the real words: \"died\" and \"death.\" Soft words confuse kids this age.","Say the person's name and share memories. It tells them it's okay to talk.","Expect grief to come and go. Trouble focusing, sleeping, or getting along is normal for a while.","Give them some say: whether to go to the funeral, what to share at school, how to remember."],
  talk:["Middle schoolers understand death as permanent, and they often grieve in bursts: fine one minute, flattened the next. Many hide it to protect the adults around them, or take on grown-up jobs like watching younger siblings. Let them know they don't have to carry that.","Tell the school counselor, and make a simple \"hard day plan\" together, like a pass to step out of class. After a friend dies, what teens say they need most is time together with other friends, so make room for that. Keep regular routines, play, and time with friends. Joy is not disloyal to the person who died."],
  say:["\"Grandma died last night. Her body stopped working and it can't start again.\"","\"There's no right way to feel. Whatever you feel is okay with me.\"","\"You don't have to be strong for me. We can be sad together.\""],
  avoid:["Saying someone is \"sleeping\" or \"lost.\"","Pushing them to talk before they're ready.","Telling them to be strong for someone else."],
  help:[L('Dougy Center resources for teens','https://www.dougy.org/resources/audience/teens'),'Your school counselor, and your faith community if you have one.',CALM],
  sources:[["Dougy Center: Tips for supporting teens who are grieving","https://www.dougy.org/assets/uploads/Dougy-Center-Tips-for-Supporting-Teens-Who-are-Grieving.pdf"],["Dougy Center: Back to school and grief","https://www.dougy.org/articles/back-to-school-and-grief-tips-for-parents-caregivers-and-educators"]]
};
T.sick = {
  quick:["Give short, honest updates. Kids this age can tell when something is wrong.","Say what's staying the same: who takes them to school, dinner, bedtime.","Let them choose how to help, like making a card or visiting.","Tell the school so teachers can give some grace."],
  talk:["Being left out usually makes a middle schooler more worried, not less. Simple, true facts help them feel steady: what the illness is, what the doctors are doing, and what will change at home. You don't need every answer. \"I don't know yet, and I'll tell you when I do\" is honest and calming.","Watch that they don't slide into a caregiver role that belongs to adults. Keep some normal life going for them. If the illness moves toward dying, move to the \"When someone dies\" guide and include them in saying goodbye in ways they choose."],
  say:["\"Grandpa is very sick. The doctors are working hard, and we don't know yet how it will go.\"","\"You can ask me anything, even the scary questions.\"","\"Your job is still to be a kid. The grown-ups have the hard jobs.\""],
  avoid:["Promising \"everything will be fine.\"","Making a child a main caregiver.","Hiding big changes until they find out on their own."],
  help:[L('Dougy Center','https://www.dougy.org/'),'Your hospital or hospice social worker or chaplain.','Your school counselor.'],
  sources:[["Dougy Center","https://www.dougy.org/"]]
};
T.divorce = {
  quick:["If it's safe, tell them together.","Say clearly: \"This is not your fault, and it's not yours to fix.\"","Share a calendar so they always know which home they're in.","Keep them out of adult conflict."],
  talk:["Kids handle divorce best when adults keep conflict away from them and routines steady in both homes. Middle schoolers often worry about practical things: where their stuff will be, whether they'll change schools, what to tell friends. Answer those plainly.","They may feel angry, relieved, sad, or all three. Let them love both parents out loud. Check in again later, because questions come in waves as things change."],
  say:["\"We're changing how our family lives, not how much we love you.\"","\"You can love both of us. You never have to pick.\"","\"What are you most wondering about?\""],
  avoid:["Using them to carry messages.","Criticizing the other parent in front of them.","Asking them to choose a side or a home."],
  help:[L('HealthyChildren.org from the American Academy of Pediatrics','https://www.healthychildren.org/'),L('Child Mind Institute','https://childmind.org/'),'If there is violence at home: '+L('National Domestic Violence Hotline','https://www.thehotline.org/')+', 1-800-799-7233.'],
  sources:[["HealthyChildren.org","https://www.healthychildren.org/"]]
};
T.stepfamily = {
  quick:["Go slowly. Blended family bonds grow over years, not weeks.","Protect one-on-one time with their parent.","Let the child choose what to call a stepparent.","Early on, the biological parent handles discipline."],
  talk:["A new stepfamily can feel like a win and a loss at the same time. A child may like the new person and still grieve the family they had. Both feelings are normal. Stepparents do best starting as a friendly, steady adult, not an instant parent.","Build a few new traditions together, and keep a few old ones. Give the child a private place to talk about how it's going."],
  say:["\"You don't have to love them right away. Being kind is enough for now.\"","\"Our time together still matters to me.\"","\"What's been the hardest part?\""],
  avoid:["Expecting instant closeness.","Forcing family labels.","Letting the new stepparent be the main rule enforcer at first."],
  help:[L('HealthyChildren.org','https://www.healthychildren.org/'),L('Search Institute on strong relationships','https://searchinstitute.org/developmental-relationships'),'If a child feels unsafe with any adult at home: Childhelp, 1-800-422-4453.'],
  sources:[["Search Institute: Developmental relationships","https://searchinstitute.org/developmental-relationships"]]
};
T.moving = {
  quick:["Tell them early so they have time to say goodbye.","Plan how they'll stay in touch with friends.","Visit the new school early and ask about a buddy.","Keep routines steady during the move."],
  talk:["A move means losing friends, places, and the version of themselves those places knew. For a middle schooler, friends are everything, so the sadness is real even if the move is good news for the family. Let them be sad.","Give them some choices: how to set up their room, which goodbye they want, how to keep in touch. Tell the new school early so someone is watching out for them."],
  say:["\"It's okay to be sad and excited at the same time.\"","\"Who do you most want to stay close to? Let's make a plan.\"","\"What would make the first week easier?\""],
  avoid:["Saying \"you'll make new friends fast.\"","Keeping the move a secret until the last minute."],
  help:[L('Military OneSource (helpful for any move)','https://www.militaryonesource.mil/'),'The new school counselor.'],
  sources:[["Military OneSource: Deployment support for teens","https://www.militaryonesource.mil/resources/millife-guides/military-deployment-support-for-teens/"]]
};
T.money = {
  quick:["Be calm and simple: \"Things are tighter, and the grown-ups have a plan.\"","Don't share debt details or adult worries.","Point out free fun nearby.","Let them know it's not their job to fix it."],
  talk:["Kids notice money stress even when adults don't talk about it. A calm, honest sentence helps more than silence. Middle schoolers may feel embarrassed at school or worry about the family, so tell them what will stay the same.","Help is out there for food, housing, and bills. Using it is wise, not shameful, and you can say so."],
  say:["\"We're being careful with money right now. You're not in trouble, and we're okay.\"","\"If kids at school say something, you can come tell me.\"","\"What free things do you like doing?\""],
  avoid:["Making them feel responsible for adult money decisions.","Arguing about money in front of them."],
  help:['Call or text 211, or visit '+L('211.org','https://www.211.org/')+', for food, housing, and utility help.',L('Money as You Grow from the CFPB','https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/')],
  sources:[["Minnesota Department of Health: 2025 Minnesota Student Survey","https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"]]
};
T.deployed = {
  quick:["Tell teachers and coaches before the deployment.","Keep routines steady. Teens find comfort in them.","Set regular calls, messages, or letters.","Talk about the homecoming before it happens."],
  talk:["Having a parent far away brings worry, pride, and sometimes anger. Middle schoolers may take on extra responsibility or act out. Both are common. Keep life as predictable as you can.","Give them a meaningful role, but not an adult one. Homecomings can be bumpy too, as everyone adjusts, so name that ahead of time."],
  say:["\"It's okay to miss them and still have fun.\"","\"What would you like to send them this week?\"","\"You are not the man or woman of the house. You're our kid.\""],
  avoid:["Handing them adult responsibilities.","Watching war news together without talking about it."],
  help:[L('Military OneSource','https://www.militaryonesource.mil/parenting/new-parents/supporting-your-military-children-through-the-deployment-cycle/')+', 800-342-9647, any time.',L('Sesame Street for Military Families (for younger siblings)','https://sesamestreetformilitaryfamilies.org/topic/deployments/')],
  sources:[["Military OneSource: Supporting military children through deployment","https://www.militaryonesource.mil/parenting/new-parents/supporting-your-military-children-through-the-deployment-cycle/"]]
};
T.baby = {
  quick:["Keep one-on-one time on the calendar.","Invite them to help, and let them say no.","Expect mixed feelings: proud and pushed aside.","Don't make them the default babysitter."],
  talk:["A new baby shifts attention fast. A middle schooler might love the baby and still feel invisible. Name both feelings as normal.","Small, protected time together tells them they still matter. Let them choose a way to be a big sibling that fits who they are."],
  say:["\"You'll always be my first kid in this spot.\"","\"It's okay if the baby gets on your nerves.\"","\"Want to pick something we do together this week?\""],
  avoid:["Assuming they'll babysit.","Comparing them to the baby or other siblings."],
  help:[L('HealthyChildren.org','https://www.healthychildren.org/')],
  sources:[["HealthyChildren.org","https://www.healthychildren.org/"]]
};
T.drinking = {
  quick:["Teach the Seven Cs: I didn't cause it, I can't control it, I can't cure it, but I can take care of myself.","Name one safe adult they can always call.","Make a plan for what to do if an adult drives after drinking or using.","Never ask them to keep it a secret."],
  talk:["Kids in homes with drinking or drug use often think it's their fault or their job to fix it. It isn't, and hearing that plainly is a relief. The Seven Cs from NACoA give them simple words to hold onto.","They are far from alone. A 2025 national study found about 1 in 4 US children lives with a parent or caregiver who has a substance use problem. Alateen and support groups exist for kids exactly like them."],
  say:["\"This is a grown-up problem. It's not your fault.\"","\"You can always call me, any time, and you won't be in trouble.\"","\"If you ever don't feel safe getting in the car, call me instead.\""],
  avoid:["Asking a child to cover for an adult.","Making them the family peacekeeper."],
  help:[L('NACoA: Just for teens','https://nacoa.org/families/just-4-teens/'),L('Al-Anon and Alateen','https://al-anon.org/'),'SAMHSA National Helpline: 1-800-662-4357.','If a child is unsafe or neglected: Childhelp, 1-800-422-4453, or call 911.'],
  sources:[["NACoA: Understanding the Seven Cs","https://nacoa.org/understanding-the-seven-cs/"],["NACoA: Help for teens","https://nacoa.org/families/just-4-teens/"]]
};
T.jail = {
  quick:["Tell the truth simply. Don't say they're \"away at work.\"","Let the child love their parent.","Help with letters, calls, or visits when it's safe.","Tell a trusted teacher or counselor if the child wants."],
  talk:["Millions of US children have a parent in jail or prison, but it can feel like a secret they're not allowed to talk about. Shame makes it heavier. Honest, simple words help: where the parent is, when they can talk, what happens next.","Kids who've lived this say it plainly: they love their parents, even when those parents have made mistakes. Let the child hold both. Keep the adult's choices separate from who the child is."],
  say:["\"Dad made a choice that broke a law, and now he has to be in jail for a while.\"","\"It's okay to love him and be mad at him.\"","\"You get to decide who you tell.\""],
  avoid:["Lying about where the parent is.","Speaking badly about the parent in front of the child."],
  help:[L('Youth.gov: Children of incarcerated parents','https://youth.gov/youth-topics/children-of-incarcerated-parents'),'Your school counselor.'],
  sources:[["Youth.gov: Tip sheet for teachers","https://youth.gov/youth-topics/children-of-incarcerated-parents/federal-tools-resources/tip-sheet-teachers"]]
};
T.foster = {
  quick:["Treat their story as theirs to share.","Answer questions honestly, at their level.","Expect new questions as identity grows at this age.","Teachers: give options on family tree or baby photo projects."],
  talk:["Adoption and foster care carry lifelong themes like loss and identity, and they often come up again in early adolescence, when kids start asking who they are. New questions are not rejection. They're growth.","Keep safe connections to birth family when possible. Many kids in foster care have lived through hard things, so steady routines and patient adults matter a lot."],
  say:["\"Your story is yours. You decide what to share.\"","\"You can ask me anything about where you came from.\"","\"Loving your birth family doesn't take anything away from us.\""],
  avoid:["Speaking badly about birth parents.","Assigning school projects that assume one kind of family."],
  help:[L('Child Welfare Information Gateway','https://www.childwelfare.gov/resources/impact-adoption'),L('Families Rising (Minnesota adoptive, foster, and kinship families)','https://wearefamiliesrising.org/'),L('National Child Traumatic Stress Network','https://www.nctsn.org/')],
  sources:[["Child Welfare Information Gateway: The impact of adoption","https://www.childwelfare.gov/resources/impact-adoption"]]
};
T.pet = {
  quick:["Use honest words. Avoid \"put to sleep.\"","Hold a small goodbye: a drawing, a story, a burial.","Let them grieve. A pet is often a first big loss.","Don't rush to get a new pet."],
  talk:["For many kids, a pet is a best friend, and its death is their first real grief. Take it seriously. The same things help as with any loss: honest words, memories, and time.","If the vet helped the pet die, explain it gently: the vet helped them die without pain. \"Put to sleep\" can make kids afraid of sleep."],
  say:["\"The vet helped Max die peacefully so he wouldn't hurt anymore.\"","\"What's your favorite memory of her?\"","\"It makes sense to miss him this much.\""],
  avoid:["Saying \"it was just a dog.\"","Replacing the pet right away."],
  help:[L('ASPCA pet loss support','https://www.aspca.org/'),L('Dougy Center','https://www.dougy.org/')],
  sources:[["Dougy Center","https://www.dougy.org/"]]
};

/* ---------------- Friends and school ---------------- */
T.startms = {
  quick:["Practice the logistics: locker, schedule, where lunch is.","Name one adult at school they can go to.","Ask \"What surprised you today?\" instead of \"How was school?\"","Expect a bumpy first few weeks."],
  talk:["Middle school is a big jump: more teachers, more hallways, shifting friend groups, and more freedom than they've had before. Nerves are normal. Practice what you can, like opening a combination lock, and let the rest unfold.","Belonging matters most. Minnesota's 2025 student survey found more students reported feeling cared for by teachers, and the state's education commissioner summed it up as \"belonging drives learning.\" Help them find one place to belong: a club, a team, a lunch table, or one teacher."],
  say:["\"Lots of kids feel nervous. It gets easier.\"","\"Who's one adult at school you could go to?\"","\"What was the best part of today, even if it was small?\""],
  avoid:["Loading up the first weeks with activities.","Brushing off worries."],
  help:[L('Search Institute','https://searchinstitute.org/developmental-relationships'),'Your school counselor.'],
  sources:[["Minnesota Department of Health: 2025 Minnesota Student Survey","https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"],["Search Institute: Developmental relationships","https://searchinstitute.org/developmental-relationships"]]
};
T.friends = {
  quick:["Listen first. Ask what happened before giving advice.","Ask: \"What do you want to happen?\"","Help them practice a calm message.","Encourage friends in more than one place."],
  talk:["Friend groups shift a lot between sixth and eighth grade. Losing a friend can feel as big as any loss. Coaching works better than rescuing: help them think it through, then let them try.","Friends in different places, like school, a team, church, or the neighborhood, keep one breakup from taking everything."],
  say:["\"That sounds like it really hurt.\"","\"What do you want to happen next?\"","\"Want to practice what you might say?\""],
  avoid:["Calling the other kid's parent at the first sign of trouble.","Calling it \"just drama.\""],
  help:[L('Search Institute','https://searchinstitute.org/developmental-relationships'),'If it turns into repeated meanness, see the bullying guide.'],
  sources:[["Search Institute: Developmental relationships framework","https://searchinstitute.org/resources-hub/developmental-relationships-framework"]]
};
T.leftout = {
  quick:["Name the feeling without fixing it right away.","Remind them it happens to everyone, and it doesn't define them.","Help find one side door into belonging, like a club or volunteering.","Keep an eye out if it becomes a pattern."],
  talk:["Being left out stings more at this age than almost any other. Kids read it as proof something's wrong with them. Your calm, steady presence tells them otherwise.","Search Institute finds that strong relationships make young people more resilient. One good friend or one caring adult can change a whole year. Help them find their people, even if it takes a few tries."],
  say:["\"That hurts. I'm really glad you told me.\"","\"Being left out doesn't mean you're not worth including.\"","\"Where do you feel most like yourself?\""],
  avoid:["Listing things they should change about themselves.","Pushing popularity as the goal."],
  help:[L('PACER National Bullying Prevention Center','https://www.pacer.org/bullying/'),L('Search Institute','https://searchinstitute.org/')],
  sources:[["Search Institute: Developmental relationships framework","https://searchinstitute.org/resources-hub/developmental-relationships-framework"]]
};
T.bullying = {
  quick:["Believe them, and thank them for telling you.","Save screenshots and write down what happened.","Block and report online. Work with the school in writing.","Don't take their phone away for being bullied."],
  talk:["Bullying is common. In a 2023 national survey, about 1 in 5 high school students was bullied at school, and girls were almost twice as likely as boys to be bullied online. Middle schoolers often don't tell because they fear it'll get worse or they'll lose their phone.","Make it clear that telling you never leads to punishment. Then act: document it, report it to the school, and follow up. Teach them to be an upstander for others too."],
  say:["\"This is not your fault.\"","\"You won't lose your phone for telling me.\"","\"We'll figure out the next step together.\""],
  avoid:["Telling them to fight back.","Taking away their phone.","Saying \"just ignore it.\""],
  help:[L('StopBullying.gov','https://www.stopbullying.gov/cyberbullying/what-is-it'),L('PACER National Bullying Prevention Center (Minneapolis)','https://www.pacer.org/bullying/'),CALM],
  sources:[["StopBullying.gov: Facts about bullying","https://www.stopbullying.gov/resources/facts"]]
};
T.grades = {
  quick:["Praise effort and strategy, not just results.","Break big assignments into small steps.","Protect sleep. Tired brains learn less.","Keep love separate from report cards."],
  talk:["Pressure climbs in middle school as grades start to feel permanent. High expectations help kids grow when they come with real support. Help them plan, not just perform.","Gratitude helps too. Research on students links gratitude practices with better well-being and even better grades."],
  say:["\"I care more about how hard you tried than the grade.\"","\"What's one small step we could do tonight?\"","\"A bad grade is information, not a verdict.\""],
  avoid:["Comparing them to siblings or other kids.","Tying your approval to grades."],
  help:[L('Greater Good in Education: Gratitude for students','https://ggie.berkeley.edu/student-well-being/gratitude-for-students/'),'Their teachers and school counselor.'],
  sources:[["Search Institute: Developmental relationships","https://searchinstitute.org/developmental-relationships"],["Greater Good in Education","https://ggie.berkeley.edu/student-well-being/gratitude-for-students/"]]
};
T.cut = {
  quick:["Let them be sad first. Plans can wait.","Don't blame the coach in front of them.","Later, ask what they want to do next.","Look for other ways to keep playing."],
  talk:["Getting cut can feel like being told you're not good enough. Handled with support, it becomes a lesson in getting back up. Start with the feelings, not the fix.","When they're ready, talk about options: another team, a rec league, practicing for next year, or trying something new. Staying active and connected matters more than the specific team."],
  say:["\"I'm sorry. I know how much you wanted this.\"","\"I'm proud you tried out.\"","\"Want to think about what's next, or just be sad for now?\""],
  avoid:["Rushing to solutions.","Trashing the coach or other players."],
  help:[L('Aspen Institute Project Play','https://projectplay.org/')],
  sources:[["Aspen Institute Project Play","https://projectplay.org/"]]
};
T.crush = {
  quick:["Stay curious and calm. Crushes are normal at this age.","Don't tease or share it with the whole family.","Share your family's values without a lecture.","Teach that anyone pushing for photos or secrets is not safe."],
  talk:["First crushes are a normal part of growing up. How you react decides whether they keep talking to you. Calm curiosity keeps the door open.","This is a good age to start talking about healthy relationships: kindness, respect, and never feeling pressured. Make it clear that any adult showing romantic interest in a child is never okay, and they should tell you right away."],
  say:["\"What do you like about them?\"","\"Good relationships feel kind and safe, never pushy.\"","\"If anyone ever asks you for pictures or secrets, tell me.\""],
  avoid:["Mocking or teasing.","Panicking or forbidding all talk about it."],
  help:[L('Love Is Respect','https://www.loveisrespect.org/'),'If an adult shows romantic interest in a child: Childhelp, 1-800-422-4453, or '+L('NCMEC CyberTipline','https://report.cybertip.org')+'.'],
  sources:[["Minnesota Department of Health: 2025 Minnesota Student Survey","https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"]]
};
T.teacher = {
  quick:["Give notice when you can.","Make room for a goodbye, like a card or a last conversation.","Introduce the new adult warmly.","Expect some real sadness."],
  talk:["Teachers and coaches can be some of the most important adults in a middle schooler's life. When one leaves, it's a real loss, even if it's for a good reason.","If the adult left because of misconduct, follow your school's steps, keep it simple (\"They are no longer working here\"), and watch for any student who might need to talk."],
  say:["\"It makes sense you'll miss them.\"","\"What did you like most about them?\"","\"The new teacher wants to get to know you too.\""],
  avoid:["Saying \"you'll get over it.\"","Sharing adult details about why someone left."],
  help:['Your school counselor.','If any student shares that they were harmed: Childhelp, 1-800-422-4453.'],
  sources:[["Search Institute: Developmental relationships","https://searchinstitute.org/developmental-relationships"],["Dougy Center","https://www.dougy.org/"]]
};

/* ---------------- Growing up and online ---------------- */
T.body = {
  quick:["Start early and keep it short. Many small talks beat one big one.","Car rides are great for this. No eye contact needed.","Keep supplies ready before they're needed.","Say it often: every body changes on its own schedule."],
  talk:["The American Academy of Pediatrics says kids need to understand the changes coming before they happen. Being ready makes it less scary and less embarrassing.","Keep it matter-of-fact and kind. Answer what they ask, share your family's values, and let them know no question is too weird to bring to you."],
  say:["\"Everyone's body changes at a different time. You're right on your own schedule.\"","\"You can ask me anything, and I won't laugh.\"","\"Want me to leave some supplies in your bathroom?\""],
  avoid:["Commenting on their size or shape.","Teasing about voice, skin, or growth.","Relying on one big talk."],
  help:[L('HealthyChildren.org: Puberty','https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/default.aspx'),L('AACAP: Talking to your kids','https://www.aacap.org/AACAP/Families_and_Youth/Facts_for_Families/FFF-Guide/Talking-To-Your-Kids-About-Sex-062.aspx'),'Your child\'s doctor.'],
  sources:[["American Academy of Pediatrics: Puberty","https://www.healthychildren.org/English/ages-stages/gradeschool/puberty/Pages/default.aspx"]]
};
T.compare = {
  quick:["Ask: \"How do you feel after scrolling that?\"","Clean up feeds together. Unfollow what makes them feel worse.","Name strengths that have nothing to do with looks.","Watch your own comparing out loud."],
  talk:["Comparing is built into middle school and supercharged by phones. The APA advises that kids limit social media used for comparison, especially around looks. The AAP notes that \"ideal body\" and fitness content is linked with worse body image.","You can't take comparison away, but you can help them notice it. Asking how content makes them feel teaches them to curate their own feed."],
  say:["\"Most of what people post is their highlight reel.\"","\"Which accounts make you feel good? Which ones don't?\"","\"Here's something I love about you that no picture shows.\""],
  avoid:["Comparing them to siblings or friends.","Commenting on other people's bodies."],
  help:[L('American Academy of Pediatrics Center of Excellence on Social Media','https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/'),L('Common Sense Media','https://www.commonsensemedia.org/')],
  sources:[["APA: Health advisory on social media use in adolescence","https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use"],["Minnesota Department of Health: 2025 Minnesota Student Survey","https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"]]
};
T.phone = {
  quick:["Write a phone agreement together.","Charge phones outside the bedroom at night.","Teach them how to leave a group chat, screenshot, and report.","Promise: telling you about something scary never costs them their phone."],
  talk:["The AAP's Family Media Plan helps families set screen-free zones and times, like dinner, homework, and bedtime, and turn off autoplay and notifications. Making the plan together works better than rules handed down.","Group chats can be fun and brutal. Teach practical skills: muting, leaving, not forwarding cruel stuff, and coming to you when something feels wrong. Monitoring apps can't replace those talks."],
  say:["\"Let's make the rules together, including rules for me.\"","\"You can always leave a chat that makes you feel bad.\"","\"If you see something scary, tell me. You won't lose your phone.\""],
  avoid:["Using monitoring apps instead of conversations.","Taking the phone as punishment when they report a problem."],
  help:[L('AAP Family Media Plan','https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx'),L('Common Sense Media','https://www.commonsensemedia.org/')],
  sources:[["HealthyChildren.org: How to make a family media plan","https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx"]]
};
T.pictures = {
  quick:["Say it before anything happens: \"If anyone threatens you with a picture, real or fake, come to me. You won't be in trouble.\"","If it happens: stop replying, don't pay, save evidence, and report.","Use Take It Down to help remove images.","The person threatening them is to blame, never your child."],
  talk:["This is called sextortion, and it's growing fast. The National Center for Missing and Exploited Children received more than 50,000 reports of money-driven sextortion in 2025, about 137 a day. Offenders often pose as a girl the child's age, and boys are targeted most. Victims can be as young as 10. Fake AI images mean a child may never have sent a real photo.","Shame is what these criminals count on, and it can be dangerous. Kids have died by suicide after being threatened. That's why your first words matter most: stay calm, say they're not in trouble, and act together."],
  say:["\"You are not in trouble. You did the right thing telling me.\"","\"We don't pay, and we don't reply. We report.\"","\"This happens to a lot of kids, and it can be fixed.\""],
  avoid:["Yelling, shaming, or taking devices in the moment.","Deleting messages before reporting.","Paying the person threatening them."],
  help:[L('Take It Down','https://takeitdown.ncmec.org'),L('NCMEC CyberTipline','https://report.cybertip.org')+', 1-800-843-5678.','FBI: 1-800-CALL-FBI or '+L('tips.fbi.gov','https://tips.fbi.gov'),CALM],
  sources:[["NCMEC: New sextortion data, 2025","https://www.missingkids.org/blog/2026/ncmec-releases-new-sextortion-data-2025"],["FBI: National alert on financial sextortion","https://www.fbi.gov/news/press-releases/fbi-and-partners-issue-national-public-safety-alert-on-financial-sextortion-schemes"],["NCMEC: Sextortion","https://www.missingkids.org/theissues/sextortion"]]
};
T.vaping = {
  quick:["Start with a question, not a lecture: \"What have you seen at school?\"","Explain the brain keeps developing until about age 25, and nicotine hooks it fast.","Name nicotine pouches too, like ZYN. They're rising.","Practice ways to say no."],
  talk:["In the 2025 National Youth Tobacco Survey, youth tobacco use kept falling overall, but nicotine pouches doubled from 2021 to 2025. Flavors are a big draw. Middle schoolers are often offered these things by older kids or friends.","The CDC suggests skipping \"we need to talk\" and asking what they think about something you see together, like an ad or a news story. Stay curious. Practice a few easy no lines they can use without losing face."],
  say:["\"What do kids at your school use?\"","\"You can always blame me: 'My mom would kill me.'\"","\"If you ever want to quit something, I'll help, not punish.\""],
  avoid:["Scare tactics.","Long lectures."],
  help:[L('Truth Initiative: This is Quitting','https://truthinitiative.org/thisisquitting')+'. Teens text DITCHVAPE to 88709.',L('CDC: Protecting youth from e-cigarettes','https://www.cdc.gov/tobacco/e-cigarettes/protecting-youth.html')],
  sources:[["FDA: 2025 National Youth Tobacco Survey findings","https://www.fda.gov/tobacco-products/ctp-newsroom/national-youth-tobacco-survey-fda-publishes-peer-reviewed-journal-article-releases-2025-findings"],["CDC: Protecting youth","https://www.cdc.gov/tobacco/e-cigarettes/protecting-youth.html"]]
};
T.ai = {
  quick:["Ask: \"Which AI do you use? What do you ask it?\"","Explain: AI can sound caring, but it isn't a person, can be wrong, and is built to keep you chatting.","Family rule: feelings, health, and body questions go to a person first.","A chatbot is not a crisis line. Use 988 or a grown-up."],
  talk:["AI is everywhere for kids now. Common Sense Media's 2026 study found 86 percent of kids ages 9 to 17 use AI, many ask it about health or their body, and many talk to it about feelings. Younger teens tend to trust AI advice more than older teens. Nearly half say no parent has talked with them about AI safety.","Common Sense recommends no one under 18 use AI companion apps, the ones built to act like a friend or partner. You don't need to ban all AI, since it's built into school tools and search. Talk about it the way you'd talk about any new friend: who is this, what do they want, and do they have your best interest at heart?"],
  say:["\"AI can be helpful, but it doesn't love you, and it can be wrong.\"","\"If something is bothering you, I want to hear it before a chatbot does.\"","\"Show me what you like using it for.\""],
  avoid:["Mocking them for using AI.","Assuming a ban solves it."],
  help:[L('Common Sense Media: Teens and AI','https://www.commonsensemedia.org/research/a-comprehensive-report-on-teens-tweens-and-ai'),CALM],
  sources:[["Common Sense Media: How and why teens use AI companions","https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions"],["Common Sense Media: 2026 census on AI use by tweens and teens","https://www.commonsensemedia.org/press-releases/common-sense-media-releases-inaugural-annual-study-on-ai-use-by-tweens-and-teens"]]
};
T.sleep = {
  quick:["Ages 6 to 12 need 9 to 12 hours. Ages 13 to 18 need 8 to 10.","Charge devices outside the bedroom.","Agree on a screens-off time together.","Focus on what gaming pushes out, not gaming itself."],
  talk:["The American Academy of Pediatrics backs these sleep ranges and reminds parents that teens need more sleep, not less. Late-night screens are one of the biggest sleep thieves. In Minnesota, nearly 1 in 5 high schoolers use technology between midnight and 5 a.m. every school night.","Gaming isn't the enemy. Look at what it replaces: sleep, homework, meals, movement, time with family. Built-in timers and a family charging station do more than arguing."],
  say:["\"Let's all charge our phones in the kitchen, me too.\"","\"What time do you want screens off on school nights?\"","\"How do you feel on days you sleep more?\""],
  avoid:["Treating all gaming as bad.","Weekend schedules that are wildly different from weekdays."],
  help:[L('HealthyChildren.org: How much sleep kids need','https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx'),L('AAP Family Media Plan','https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx')],
  sources:[["HealthyChildren.org: Healthy sleep habits","https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx"],["Minnesota Department of Health: 2025 Minnesota Student Survey","https://www.health.state.mn.us/news/pressrel/2025/survey120925.html"]]
};
T.looks = {
  quick:["Praise character, effort, and what bodies can do.","Speak kindly about your own body out loud.","Ask: \"What did you see that made you feel that way?\"","Never mention weight, sizes, or food rules."],
  talk:["The AAP advises families to avoid talk about weight and calories at meals, weight teasing, diet talk, and labeling foods good or bad. Kids pick up how adults talk about bodies, including their own.","Social media content that pushes an \"ideal\" body is linked with worse body image. Help them notice how it makes them feel, and fill their world with other reasons they're valued."],
  say:["\"Your body is not a project. It's your home.\"","\"I love how strong you are when you play.\"","\"Where did that idea about your body come from?\""],
  avoid:["Any comments about weight, size, or shape.","Praising weight loss.","Calling foods good or bad."],
  help:[L('National Alliance for Eating Disorders','https://www.allianceforeatingdisorders.com/')+' helpline: 866-662-1235, weekdays.','Your child\'s doctor.',CALM],
  sources:[["AAP: Concerning eating disorder content","https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/concerning-eating-disorder-content/"]]
};
T.wholike = {
  quick:["Crushes and big feelings are a normal part of growing up. Stay calm and curious.","Keep the door open, so your child brings questions to you, not the internet.","Share your family's values about love, commitment, and marriage, in your own words.","Never shame or threaten. A child who feels safe keeps talking."],
  talk:["Pediatricians say crushes often begin in these years, and that it matters not to tease a child or brush off their feelings. To a middle schooler, those feelings are real, even when they pass quickly.","Many traditions see love as something sacred, worth patience, respect, and waiting until you're ready. Middle schoolers are still figuring out their feelings, and nothing needs to be decided or labeled now. Talk about what healthy love looks like: kindness, honesty, trust, and never pressure.","This is a good time to share what your family believes about love, commitment, and marriage between a man and a woman as something sacred to grow toward. Say it with warmth, not fear. Rules about dating are yours to set as a family, and it helps to explain the why behind them.","Keep them safe. Any adult who shows romantic interest in a child is never okay. Anyone asking for photos or secrets is not safe, and your child should know they can tell you without getting in trouble."],
  say:["\"Having a crush is normal. Thanks for telling me.\"","\"What do you like about them?\"","\"In our family, we believe love is worth waiting for, and here's why.\"","\"If anyone ever asks you for photos or to keep a secret, you can always tell me.\""],
  avoid:["Teasing, or telling them their feelings aren't real.","Shaming or threatening, which only teaches kids to stop telling you things.","Sharing their crush with others without their okay."],
  help:[L('Childhelp National Child Abuse Hotline','https://www.childhelphotline.org/')+': 1-800-422-4453, any time, if an adult is crossing lines.',L('Take It Down','https://takeitdown.ncmec.org/')+', from the National Center for Missing and Exploited Children, if a photo has been shared.','Your faith leader, or a mentor you trust.',CALM],
  sources:[["American Academy of Pediatrics: Your Child's First Crush","https://www.healthychildren.org/English/healthy-living/emotional-wellness/Pages/Your-Childs-First-Crush.aspx"]]
};
T.faith = {
  quick:["Say: \"That's a real question. People of faith have asked it for thousands of years.\"","Wonder with them instead of rushing to answers.","Point them to trusted mentors in your tradition.","Doubt spoken out loud is healthier than doubt kept silent."],
  talk:["Early adolescence is when spiritual life often wakes up. Lisa Miller at Columbia University finds a lived spiritual life is one of the strongest protections young people have, and that this awakening is a normal part of growing up.","The Fuller Youth Institute found most youth group students had serious doubts, but only about a quarter talked with anyone, and concluded it's silence, not doubt, that harms faith. When kids can bring their questions to you, faith has room to grow up with them."],
  say:["\"I'm so glad you asked me that.\"","\"I've wondered about that too. Here's what helps me.\"","\"Who else could we ask?\""],
  avoid:["Treating questions as rebellion.","Shutting down the conversation."],
  help:[L('Fuller Youth Institute: Talking about doubt','https://fulleryouthinstitute.org/blog/talk-about-doubt'),'A pastor, imam, rabbi, elder, or mentor you trust.'],
  sources:[["Lisa Miller, Teachers College, Columbia University","https://www.tc.columbia.edu/faculty/lfm14/"],["Miller: Spiritual awakening in adolescents (PubMed)","https://pubmed.ncbi.nlm.nih.gov/24354605/"],["Fuller Youth Institute: Why doubt","https://fulleryouthinstitute.org/blog/why-doubt"]]
};
T.identity = {
  quick:["Ask: \"When do you feel most like yourself?\"","Let them try things and change their minds.","Share your own middle school story.","Avoid locking them into labels."],
  talk:["Middle school is when kids start asking \"Who am I?\" for real. They'll try on styles, interests, and friend groups. That's healthy. Search Institute describes strong relationships as the ones where young people discover who they are.","Your job isn't to decide who they become. It's to be steady while they figure it out, and to keep reminding them of the good you see."],
  say:["\"You don't have to have it all figured out.\"","\"I love watching you discover what you're into.\"","\"Here's something I've always admired about you.\""],
  avoid:["Labels like \"the smart one\" or \"the athlete.\"","Mocking new interests."],
  help:[L('Search Institute','https://searchinstitute.org/developmental-relationships'),L('Fuller Youth Institute','https://fulleryouthinstitute.org/blog/a-new-look-at-todays-teenagers')],
  sources:[["Search Institute: Developmental relationships framework","https://www.ctclearinghouse.org/Customer-Content/www/topics/The_Developmental_Relationships_Framework_.pdf"]]
};
T.illness = {
  quick:["Let them choose what to share and with whom.","Include them in meetings about their care and school supports.","Help them find peers who get it.","See the whole kid, not just the condition."],
  talk:["Kids living with an illness or disability want to be known as whole people. Giving them a real voice in their care builds confidence and independence, which is exactly the growth middle school is for.","Kids with disabilities are bullied more often, so watch for that and act fast if it happens."],
  say:["\"You get a say in this.\"","\"What would you want your teachers to know?\"","\"This is part of your story, not the whole story.\""],
  avoid:["Talking about them as if they aren't in the room.","Letting the condition define them."],
  help:[L('PACER Center (Minneapolis)','https://www.pacer.org/'),L('Center for Parent Information and Resources','https://www.parentcenterhub.org/')],
  sources:[["Search Institute: Developmental relationships","https://searchinstitute.org/developmental-relationships"]]
};

/* ---------------- Big world, hard news ---------------- */
T.lockdown = {
  quick:["Start the conversation. Silence can make it scarier.","Ask what they've heard, and correct rumors.","Tell them what adults do to keep them safe.","Limit news, especially video, including your own."],
  talk:["The National Child Traumatic Stress Network advises starting the conversation, because not talking about it can make an event feel even more threatening. When kids ask \"could it happen here,\" they're often really asking whether it's likely. You can be honest that it's rare and that many adults are working to keep them safe.","Expect worse sleep and focus for a while. If problems last more than about six weeks, talk with a counselor or doctor."],
  say:["\"What have you heard? Let's sort out what's true.\"","\"Your teachers practice drills so everyone knows what to do.\"","\"You can always talk to me about this.\""],
  avoid:["Showing graphic videos.","Promising \"it will never happen here.\"","Focusing on the person who did it."],
  help:[L('NCTSN: School shooting resources','https://www.nctsn.org/what-is-child-trauma/trauma-types/terrorism-and-violence/school-shooting-resources'),'SAMHSA Disaster Distress Helpline: call or text 1-800-985-5990.',CALM],
  sources:[["NCTSN: Talking to children about the shooting","https://www.nctsn.org/sites/default/files/resources/tip-sheet/talking_to_children_about_the_shooting.pdf"],["NCTSN: Parent guidelines after a shooting","https://www.nctsn.org/resources/parent-guidelines-helping-youth-after-recent-shooting"]]
};
T.news = {
  quick:["Ask: \"What have you heard?\"","Separate facts from rumors together.","Talk about respecting people who disagree.","Find a way to help, even a small one."],
  talk:["Kids soak up news even when they seem busy with something else. Calm adults, limited exposure, and honest facts at their level help the most.","Politics can feel personal and scary. You can share your values and still model respect for neighbors who see things differently. Helping, like donating or writing a letter, turns worry into action."],
  say:["\"It's okay to feel worried. What part worries you most?\"","\"People can disagree and still be good neighbors.\"","\"What's one thing we could do to help?\""],
  avoid:["Leaving the news running all day.","Calling people who disagree evil."],
  help:[L('National Child Traumatic Stress Network','https://www.nctsn.org/'),L('Common Sense Media','https://www.commonsensemedia.org/')],
  sources:[["National Child Traumatic Stress Network","https://www.nctsn.org/"]]
};
T.immigration = {
  quick:["Listen first. Find out what they already know and fear.","Make a family preparedness plan that names a trusted adult.","Update emergency contacts at school.","Reassure them the grown-ups are handling this."],
  talk:["Immigration enforcement has touched many Minnesota communities, including large operations in the Twin Cities in 2026. The American Academy of Pediatrics advises starting by listening to kids' concerns and what they already know. Kids need to hear that they are not responsible for fixing this.","Schools may not ask about immigration status, and teachers shouldn't give legal advice. Families can get free legal help and planning tools from trusted organizations. Rules change quickly, so check the resources below for the latest."],
  say:["\"You are safe right now, and we have a plan.\"","\"If anything ever happens, here's who will pick you up.\"","\"You can ask me anything.\""],
  avoid:["Asking students about their status (teachers).","Giving legal advice or promising outcomes."],
  help:[L('Immigrant Law Center of Minnesota','https://www.ilcm.org/')+': 612-441-2881.',L('Informed Immigrant: Prepare your family','https://www.informedimmigrant.com/resources/know-your-rights/steps-take-prepare-family/'),L('Families Rising: Resources for Minnesota families','https://wearefamiliesrising.org/resources-for-mn-families-during-immigration-enforcement-operations/')],
  sources:[["AAP: Talking with children about immigration enforcement","https://www.healthychildren.org/English/healthy-living/emotional-wellness/Building-Resilience/Pages/talking-with-children-about-immigration-enforcement.aspx"],["Education Minnesota: Immigration resources for educators","https://educationminnesota.org/immigration/"]]
};
T.unfair = {
  quick:["Believe them.","Name it plainly as unfair.","Write down what happened and report it to the school.","Share stories of people who stood up to unfairness."],
  talk:["Middle schoolers have a sharp sense of fairness, and being treated badly because of race, faith, culture, or who they are cuts deep. Being believed by a trusted adult is protective.","Act on it. Document, report, and follow up. Then help them find strength in their family, faith, culture, and community."],
  say:["\"That was wrong, and it was not your fault.\"","\"Thank you for telling me. We're going to do something about it.\"","\"Who you are is something to be proud of.\""],
  avoid:["Saying \"they didn't mean it.\"","Saying \"just ignore it.\""],
  help:[L('EmbraceRace','https://www.embracerace.org/'),L('Minnesota Department of Human Rights','https://mn.gov/mdhr/')],
  sources:[["City of Minneapolis: Mental health","https://www.minneapolismn.gov/government/departments/health/current-concerns/mental-health/"]]
};
T.friendhurting = {
  quick:["Teach them: \"Snitching gets someone in trouble. Telling gets someone help.\"","Steps: listen, don't promise secrecy, tell a trusted adult today.","If it's urgent, call or text 988 together.","Never punish the kid who tells."],
  talk:["Middle schoolers often carry friends' secrets, including self-harm or thoughts of dying, because they're afraid of betraying them. Research from the National Institute of Mental Health says asking kids about suicide is safe and important. Talking about it doesn't put the idea in their head.","Give your child clear words and permission: a real friend tells a grown-up. Then make sure they're not the only support their friend has. Carrying that alone is too heavy for any kid."],
  say:["\"Telling a grown-up is being a good friend.\"","\"You did the right thing. Now let the grown-ups help.\"","\"How are you doing with all of this?\""],
  avoid:["Letting your child be a friend's only support.","Punishing the child who told."],
  help:['Call or text 988, or chat at '+L('988lifeline.org','https://988lifeline.org/')+'.',L('Crisis Text Line','https://www.crisistextline.org/')+': text HOME to 741741.',L('Teen Line','https://didihirsch.org/teenline/support-line/')],
  sources:[["NIMH: Ask Suicide-Screening Questions toolkit","https://sprc.org/wp-content/uploads/2022/12/asQToolkit_0-1.pdf"],["AAP: Screening for suicide risk","https://www.aap.org/en/patient-care/blueprint-for-youth-suicide-prevention/strategies-for-clinical-settings-for-youth-suicide-prevention/screening-for-suicide-risk-in-clinical-practice/"]]
};
T.suicide = {
  quick:["Say simply that the person died by suicide, if the family allows it to be shared.","Say that suicide is complicated, that pain can be treated, and help works.","Watch closely over friends and teammates.","Point to help every time: 988 by call or text."],
  talk:["Schools follow a toolkit from the American Foundation for Suicide Prevention and the Suicide Prevention Resource Center, and families can use the same approach. Young people are especially affected by suicide in their community, so how adults talk about it matters. Talk about the person in a balanced way, and never describe how they died.","Grief after a suicide is often mixed with confusion, anger, or guilt. Let kids feel all of it. Remind them that no one person caused it, and that if they ever feel hopeless, help is always there."],
  say:["\"She died by suicide. We may never fully understand why.\"","\"If you ever feel like things are hopeless, please tell me. There is always help.\"","\"It's not anyone's fault, including yours.\""],
  avoid:["Describing method or place.","Calling it a choice, a solution, or an escape.","Memorials that glorify the death."],
  help:['Call or text 988, any time.',L('Crisis Text Line','https://www.crisistextline.org/')+': text HOME to 741741.',L('Dougy Center','https://www.dougy.org/'),'In an emergency, call 911.'],
  sources:[["AFSP and SPRC: After a Suicide, A Toolkit for Schools","https://sprc.org/resources/after-suicide-toolkit-schools"]]
};
T.disaster = {
  quick:["Make a family plan and let them pack their own go bag.","Talk calmly about tornado and blizzard drills.","Limit replays of damage footage.","Give them a way to help."],
  talk:["The National Child Traumatic Stress Network notes that kids cope better when they feel they're helping. Preparing together, like a go bag or a family meeting spot, turns fear into action.","After a disaster, expect some trouble with sleep and focus. If it lasts longer than about six weeks, check in with a counselor or doctor."],
  say:["\"We have a plan, and here it is.\"","\"What would you want in your go bag?\"","\"How could we help people who got hurt?\""],
  avoid:["Replaying disaster video.","Dismissing their fear."],
  help:[L('NCTSN: Tornado resources','https://www.nctsn.org/what-is-child-trauma/trauma-types/disasters/tornado-resources'),'SAMHSA Disaster Distress Helpline: call or text 1-800-985-5990.',L('Ready.gov Kids','https://www.ready.gov/kids')],
  sources:[["NCTSN: Parent guidelines after a hurricane","https://www.nctsn.org/resources/parent-guidelines-helping-children-after-hurricane"],["SAMHSA: Disaster Distress Helpline","https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline"]]
};
T.war = {
  quick:["Ask how they feel about what they've seen.","Stay calm when you talk about it.","Use a map to show distance and safety.","Channel worry into helping."],
  talk:["The National Child Traumatic Stress Network advises asking kids how they feel about the war, validating those feelings, and staying as calm as you can. A map helps: kids often don't know how far away a war is.","Minnesota is home to many families who came here from war zones. Be gentle with kids who have family in the news, and watch for anyone who needs extra support."],
  say:["\"This is far from here, and you are safe.\"","\"It's okay to feel sad or scared about people there.\"","\"What would you like to do to help?\""],
  avoid:["Showing graphic images.","Talking about whole groups of people as enemies."],
  help:[L('NCTSN: Talking to children about war','https://www.nctsn.org/resources/talking-to-children-about-war'),'SAMHSA Disaster Distress Helpline: 1-800-985-5990.','Your school counselor.'],
  sources:[["NCTSN: Talking to children about war","https://www.nctsn.org/sites/default/files/resources/fact-sheet/talking-to-children-about-war.pdf"]]
};

/* ---------------- Added in session 7 ---------------- */
T.selfharm = {
  keys:"self harm self-harm self injury selfharm cutting scratching burning hurting themselves on purpose",
  quick:["Stay calm. How you react decides whether they tell you again.", "Check for wounds that need care. Call 911 for anything serious.", "Ask directly: \"Are you thinking about killing yourself?\" Asking is safe.", "Get them seen this week by their doctor or a counselor."],
  talk:["Self-harm means hurting yourself on purpose, and it often starts in the middle school years. Most kids who do it describe it as a way to get through feelings that feel too big, not a way to get attention. It usually happens in secret, and kids carry a lot of shame about it.", "Self-harm and suicide are different, but they can overlap, and self-harm raises the risk over time. That is why you ask about suicide directly, and why every case deserves a professional look. The good news: kids can learn other ways through hard feelings, and therapies like DBT are built for exactly this.", "At home, stay steady. Help care for wounds without a fuss. Put away sharp things and medicines calmly, as safety, not punishment. Then keep the door open with short check-ins, time together, and patience. Stopping often takes a while, and setbacks are part of it."],
  say:["\"I noticed the marks. You're not in trouble. I want to understand.\"", "\"What was happening right before?\"", "\"You don't have to stop alone. We'll get help together.\"", "\"Are you thinking about killing yourself?\""],
  avoid:["Yelling, punishing, or demanding a promise to stop.", "Calling it attention-seeking.", "Telling their friends or siblings.", "Checking on them so constantly that it feels like punishment."],
  help:['Call or text 988, or chat at '+L('988lifeline.org','https://988lifeline.org/')+'.',L('Crisis Text Line','https://www.crisistextline.org/')+': text HOME to 741741.',L("Cornell Self-Injury and Recovery Resources","https://selfinjury.bctr.cornell.edu"),L("Child Mind Institute","https://childmind.org"),"Your child's doctor, and your school counselor."],
  sources:[["Cornell Self-Injury and Recovery Resources", "https://selfinjury.bctr.cornell.edu"], ["Child Mind Institute", "https://childmind.org"]]
};
T.eating = {
  keys:"eating disorder eating disorders anorexia bulimia binge eating arfid purging not eating skipping meals dieting weight food",
  quick:["Eating disorders often begin in the preteen and teen years. They are medical illnesses, not choices.", "Watch for skipped meals, hidden food, bathroom trips after eating, or exercise that looks driven.", "Describe what you see, not their weight.", "Worried? Start with their doctor this week."],
  talk:["Middle school brings a changing body, new comparisons, and a flood of food and body messages online. Most kids come through it okay. Some slide into restricting food, bingeing, purging, or rigid food rules, and it can happen at any body size. A child can be very sick and still look healthy.", "If you are worried, you don't need to be sure. Book a doctor visit and tell the doctor what you have seen. For kids and teens, the treatment with the strongest evidence puts parents at the center, with a care team guiding. You are part of the solution, not the cause.", "At home, keep meals regular and together, and keep food talk neutral. Drop diet talk and weight comments, including about yourself and other people. Praise who they are, not how they look."],
  say:["\"I've noticed dinner seems stressful. I'm not mad. I'm worried, and I love you.\"", "\"Let's see the doctor and make sure your body is okay.\"", "\"All kinds of food can fit.\""],
  avoid:["Comments about weight, even praise for losing it.", "Family diets, or calling foods good and bad.", "Fighting about food at the table on your own. Let the care team guide."],
  help:["ANAD Eating Disorders Helpline: 1-888-375-7767, weekdays. National Alliance for Eating Disorders: 1-866-662-1235.",L("ANAD","https://anad.org"),L("The Emily Program (Minnesota)","https://emilyprogram.com"),"Call 911 for fainting, chest pain, or confusion.",CALM],
  sources:[["ANAD", "https://anad.org"], ["National Alliance for Eating Disorders", "https://www.allianceforeatingdisorders.com"]]
};
T.porn = {
  keys:"porn pornography explicit sexual videos naked pictures online watching looking at",
  quick:["Many kids see pornography by age 12, often by accident. Talk before it happens, or right after.", "Stay calm and curious. Shame makes kids hide.", "Explain that porn is a performance, not how real love, respect, or bodies work.", "If anyone sent it to them or asked them for pictures, see Online pressure and pictures, and report it."],
  talk:["Pornography is easy to find on phones, games, and social media, and middle schoolers are curious about sex. Seeing it doesn't make your child bad, and curiosity is normal. But porn teaches things you probably don't want them learning: that sex is about using people, that pressure is normal, and that bodies should look a certain way.", "Talk early and more than once. Keep it short, calm, and true to your values. Many families and faith traditions hold clear beliefs about sex, love, and faithfulness. Share yours warmly. Kids come back to a parent who stays calm.", "If your child keeps going back to it, can't seem to stop, or someone is showing it to them, get help. An adult or older kid showing porn to a child can be a form of abuse."],
  say:["\"Have you ever seen videos or pictures of people having sex online? You're not in trouble.\"", "\"Porn is made to sell. Real love is kind, and nobody gets pressured.\"", "\"If you ever see something that bothers you, come to me. I won't freak out.\""],
  avoid:["Taking every device forever. Kids learn to hide, not to tell.", "Shaming them, or calling their body or curiosity dirty.", "Assuming filters are enough."],
  help:[L("Common Sense Media","https://www.commonsensemedia.org"),L("NetSmartz","https://www.missingkids.org/netsmartz"),'Report anyone who sends sexual images to a child or asks a child for them: '+L('CyberTipline','https://report.cybertip.org')+' or 1-800-843-5678.',"Your child's doctor or a counselor, if they can't seem to stop."],
  sources:[["Common Sense Media: Teens and Pornography", "https://www.commonsensemedia.org/research/teens-and-pornography"], ["NetSmartz", "https://www.missingkids.org/netsmartz"]]
};
T.accident = {
  keys:"car accident crash wreck collision injury injured hospital concussion head injury er icu sudden",
  quick:["Tell them what happened simply and honestly, and who is caring for the person.", "Watch for concussion signs after any crash, even if they seem fine.", "Expect jumpiness, sleep trouble, or fear of riding. It usually eases in a few weeks.", "Let them help: cards, meals, and visits when they are ready."],
  talk:["After a crash, kids this age often replay it, ask detailed questions, or get stuck on who was to blame. Some act fine for days, then fall apart. Both are normal. What helps most is a steady routine and grown-ups who answer honestly without graphic details.", "If a family member is badly hurt, prepare them before a hospital visit: what the room looks like, the machines, and how the person might look. Let them choose whether to go in. If someone died, see When someone dies.", "If fear, nightmares, or avoiding cars lasts more than a month, talk with their doctor. Trauma-focused therapy works well for kids."],
  say:["\"You're safe now. It makes sense to feel shaky.\"", "\"It wasn't your fault.\"", "\"Want to make something for Grandma while she's in the hospital?\""],
  avoid:["Graphic details, or letting them overhear arguments about fault or insurance.", "Pushing them to ride right away if they are panicked. Build back in small steps."],
  help:[L("National Child Traumatic Stress Network","https://www.nctsn.org"),L("CDC HEADS UP: Concussion","https://www.cdc.gov/heads-up/"),"Get medical care right away for a worsening headache, vomiting, confusion, or unusual sleepiness.","Your school counselor, so teachers can give extra grace."],
  sources:[["National Child Traumatic Stress Network", "https://www.nctsn.org"], ["CDC HEADS UP", "https://www.cdc.gov/heads-up/"]]
};

T.adhd = {
  keys:"adhd add attention focus distracted hyperactive impulsive learning disability learning differences dyslexia iep 504 plan homework organization",
  quick:["ADHD and learning differences are about how a brain works, not how hard a kid tries.", "Middle school piles on organization and homework, so struggles often show up now.", "Ask for an evaluation in writing, and use supports like an IEP or 504 plan.", "Name their strengths out loud, often."],
  talk:["Middle school means more teachers, more homework, and more to keep track of. For kids with ADHD or learning differences, this is often when things get hard, even if they did fine before. What looks like laziness is usually a brain working overtime to keep up.", "You can ask the school for a special education evaluation in writing, and talk with their doctor. Medication, behavior strategies, and school supports all have good evidence behind them. Include your child in the plan. They are old enough to learn what helps their brain.", "Watch their heart as well as their grades. Kids with ADHD hear a lot of correction and are more likely to feel anxious or down. Catch them doing well, and say it."],
  say:["\"Your brain is great at some things and works harder at others. Let's find tools for the hard parts.\"", "\"What part of school feels hardest right now?\"", "\"I'm proud of how hard you worked on that.\""],
  avoid:["\"You just need to try harder.\"", "Taking away sports or activities that help them feel capable.", "Doing everything for them. Build skills a step at a time."],
  help:[L("CHADD","https://chadd.org"),L("Understood","https://www.understood.org"),L("PACER Center (Minnesota)","https://www.pacer.org")+": free help with IEPs and 504 plans.","Your child's doctor, and your school counselor or case manager."],
  sources:[["CHADD", "https://chadd.org"], ["Understood", "https://www.understood.org"]]
};
T.lying = {
  keys:"lying lies liar sneaking stealing stole shoplifting taking things money missing trust honesty",
  quick:["Some lying is normal at this age, often to avoid trouble or protect privacy.", "Stay calm, and say what you know instead of setting a trap.", "Make honesty worth it: a smaller consequence when they tell the truth.", "Stealing or sneaking that keeps happening is a sign to look deeper."],
  talk:["Middle schoolers want more privacy and independence, and lying can be a clumsy way to get it. They also lie to avoid disappointing you. It still matters, and it is still very common.", "When you catch a lie, lead with the relationship: \"I know what happened. I want us to be able to be honest with each other.\" Give a fair consequence, and a path to rebuild trust step by step. Stealing needs to be made right: returned, repaid, or apologized for.", "Look underneath. Lying, sneaking, or stealing can be tied to peer pressure, vaping or drugs, online trouble, money worries, or a problem they are afraid to tell you about. Ask, and listen."],
  say:["\"I know the money was taken. I'm not going to yell. Let's talk about it.\"", "\"Telling the truth now makes this a lot easier.\"", "\"How can you make this right?\""],
  avoid:["Calling them a liar or a thief.", "Trap questions when you already know the answer.", "Punishments so big that lying seems worth the risk next time."],
  help:[L("Child Mind Institute","https://childmind.org"),"Your school counselor, if lying or stealing keeps happening.","If money or items are missing along with changes in friends, mood, or sleep, see the vaping and drinking guides too."],
  sources:[["Child Mind Institute", "https://childmind.org"], ["HealthyChildren.org (AAP)", "https://www.healthychildren.org"]]
};
T.gambling = {
  keys:"gambling gamble betting bets sports betting loot boxes skins skin betting casino games fantasy sports online casino social casino",
  quick:["Gambling now shows up in games: loot boxes, skin betting, and casino-style apps.", "Sports betting ads target young fans. Talk about what the ads leave out.", "Check purchases and gift cards, and turn on spending limits on devices.", "If money is missing or they can't stop, get help. Gambling problems are treatable."],
  talk:["Many middle schoolers have already tried something like gambling, often without calling it that: paying for loot boxes, trading or betting game skins, or playing casino-style games. Sports betting ads are everywhere during games they watch.", "Explain how it works: these games and apps are built so the house wins over time, and near-misses are designed to keep you playing. Ask what they see their friends doing.", "Warning signs include missing money or gift cards, secrecy about spending, big mood swings tied to games or scores, or trying to win back losses. Kids who gamble young are more likely to have gambling problems later, so take it seriously and calmly."],
  say:["\"Have you ever bought a loot box or bet on anything in a game?\"", "\"Those games are designed so you lose more than you win. That's how they make money.\"", "\"If you ever feel like you can't stop, tell me. We'll figure it out.\""],
  avoid:["Buying lottery tickets or placing bets as a gift or treat for kids.", "Shrugging it off as \"just a game\" when real money is involved."],
  help:["Minnesota Problem Gambling Helpline: 1-800-333-4673 (HOPE), or text HOPE to 53342. Free counseling for gamblers and their families. Outside Minnesota: 1-800-GAMBLER.",L("Minnesota Alliance on Problem Gambling","https://mnapg.org"),L("Common Sense Media","https://www.commonsensemedia.org")],
  sources:[["Minnesota Alliance on Problem Gambling", "https://mnapg.org"], ["National Council on Problem Gambling", "https://www.ncpgambling.org"]]
};
T.bedwetting = {
  keys:"bedwetting wetting the bed wet the bed nighttime accidents enuresis sleepover camp overnight",
  quick:["Some middle schoolers still wet the bed. It is a medical issue, not a choice.", "Keep it private and shame-free.", "See their doctor. Alarms and other treatments work well at this age.", "Make a quiet plan together for sleepovers and camp."],
  talk:["Bedwetting is less common by middle school, but plenty of kids still deal with it, and it often runs in families. At this age the embarrassment can be heavy, and kids may start avoiding sleepovers, camp, or team trips.", "Their doctor can check for causes like constipation or infection and talk through treatments. Bedwetting alarms and medicine can both help. A child who was dry and starts wetting again should see the doctor, since stress and health changes can play a part.", "At home, let them manage cleanup privately with easy supplies, so they keep their dignity. Protect them from siblings' teasing."],
  say:["\"Lots of kids your age deal with this. It's not your fault.\"", "\"Let's talk with the doctor. There are things that really help.\"", "\"We'll make a plan so you can still go to the sleepover.\""],
  avoid:["Teasing, even gently, or letting siblings tease.", "Punishment, or making them wash sheets as a consequence.", "Mentioning it in front of anyone."],
  help:[L("HealthyChildren.org (AAP): Bedwetting","https://www.healthychildren.org"),"Your child's doctor."],
  sources:[["HealthyChildren.org (American Academy of Pediatrics)", "https://www.healthychildren.org"]]
};

/* HA2 guides start */
/* ---------------- Health and Ability (GWG BLD 757, HA 2) ----------------
   Generated from patches/bld757/source/A in grounded-workshop: edit the data there and rebuild.
   life: the Health and Ability choice ids (shared/gg-life.js) each guide fits, for Picked for You. */
T["school-health"] = {
  keys:"health condition school nurse 504 plan section 504 iep health plan asthma diabetes epilepsy seizures allergies epipen inhaler chronic illness missed school absences makeup work medicine at school",
  life:["health", "pain"],
  quick:["Meet with the school nurse before the year starts, or as soon as something changes.", "Ask the school, in writing, whether a 504 plan fits. It lists the supports your child needs to learn.", "Plan for missed days: who sends the work, and how your child catches up without drowning.", "Give your child a growing voice: what to tell the nurse, the teacher, and, a little at a time, the doctor."],
  talk:["Asthma, diabetes, epilepsy, food allergies, migraines, Crohn's disease, arthritis: many middle schoolers manage a long-term health condition at school every day. School can be where it goes best, because it is where most kids are, every weekday. Things go better when the student, the family, the nurse, the doctor, and teachers work as one team, and that teamwork is linked to fewer missed days.", "Most supports come through a few doors. The school nurse can write a health plan with you for daily needs and emergencies. A 504 plan, under a federal civil rights law, lists the changes a student needs to take part fully: rest breaks, water or snacks in class, an elevator pass, extra time, a plan for makeup work, or permission to go to the nurse without a fuss. If the condition affects learning itself, ask about an evaluation for special education and an IEP. Put requests in writing, keep copies, and ask for a meeting that includes your child.", "Middle school is also when kids start taking over. Health care teams often begin planning the move toward adult health care around ages 12 to 14. That can start small: your child tells the nurse what they need, carries what the doctor says they can carry, or answers the doctor's first question at the next visit. Many kids hide a condition to fit in, by skipping the nurse or a dose. Talk about that openly, without blame, and look for private ways to get what they need. Kids with a long-term illness are more likely than other kids to feel low, so keep an eye on their mood as well as their health, and bring in the school counselor early."],
  say:["\"Who at school do you want to know, and what do you want them to know?\"", "\"What would make a hard health day at school easier?\"", "\"You can be part of the meeting. It's about you, so your ideas count.\"", "\"Let's figure out a way to go to the nurse that feels private enough.\""],
  avoid:["Making the plan without your child, or reading it to them afterward.", "Treating missed days as a discipline problem, or letting the makeup work pile up.", "Announcing the condition to a class or team without your child's yes."],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with 504 plans, IEPs, and school health needs.", L("Center for Parent Information and Resources","https://www.parentcenterhub.org/")+": find the parent center in your state.", L("Got Transition","https://gottransition.org/six-core-elements")+": steps toward managing their own health, a little at a time.", "Your child's doctor, the school nurse, and the school counselor.", CALM],
  sources:["cdcschoolchc", "gottransition", "pinquartshen11"]
};

T["pain-headaches"] = {
  keys:"chronic pain headaches migraine migraines stomachaches stomach pain belly aches joint pain arthritis tired fatigue spoons spoon theory pacing energy missing school pain that keeps coming back",
  life:["pain", "health"],
  quick:["Believe the pain. Pain no one can see is still real.", "Take it to the doctor, and bring notes: when it comes, how long, what helps, what makes it worse.", "Help them pace their energy on hard days instead of pushing through.", "Keep school and friends going in some form, with a plan for flare days."],
  talk:["Headaches, migraines, stomach pain, and joint pain that keep coming back are common in middle school, and they are hard to live with partly because no one else can see them. Kids with pain that keeps returning often hear that they are faking, exaggerating, or trying to skip something. The first gift you can give is to believe them. Then take it to their doctor, with simple notes you keep together: when it comes, how long it lasts, what helps, and what seems to make it worse. Every question about the cause, the treatment, or medicine belongs with the doctor.", "Living with pain is also about energy. Some people with long-term illness picture each day's energy as a handful of spoons: each task costs a spoon, and on a hard day there are fewer. That picture helps a middle schooler plan, say no without guilt, and explain to friends why they bailed. Help your child choose what matters most on a flare day, rest before they hit empty, and keep a little of school, friends, and the things they love going, even in a smaller form.", "Pain that keeps coming back wears on the heart too, and kids living with a long-term condition are more likely to feel low. Watch for giving up on things they love, pulling away from friends, or saying they are a burden. Talk with the school counselor, ask the school about a 504 plan for flare days, and keep the doctor in the loop about mood as well as pain."],
  say:["\"I believe you. Tell me what it feels like today.\"", "\"How many spoons do you have today? Let's spend them on what matters most.\"", "\"Resting on a hard day isn't quitting. It's planning.\"", "\"What would help at school on a flare day?\""],
  avoid:["\"You were fine yesterday.\" Pain comes and goes, and that is part of it.", "\"It's probably just stress.\" Let the doctor sort out causes.", "Canceling everything they love. Shrink it instead, if you can."],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with 504 plans for flare days and missed school.", L("HealthyChildren.org (AAP)","https://www.healthychildren.org"), "Your child's doctor, for every question about the pain and what helps.", "Your school nurse and school counselor.", CALM],
  sources:["miserandino", "pinquartshen11", "cdcschoolchc"]
};

T["moving-included"] = {
  keys:"wheelchair crutches braces walker cane cerebral palsy spina bifida muscular dystrophy amputation prosthetic limb physical disability mobility moving differently included left out field trip gym class pe adaptive sports accessible ramp elevator",
  life:["moving"],
  quick:["Ask your child what works for them. They are the expert on their own body.", "Look for the barrier in the plan, not the problem in the kid: steps, distance, time, or a game with no place for them.", "Plan ahead with the school for field trips, gym class, and events, so they are in it from the start.", "Let them choose their words, and follow their lead on what to share."],
  talk:["Middle schoolers who move differently, using a wheelchair, crutches, braces, a walker, or a body that moves its own way, want what every middle schooler wants: friends, a place in the group, and a say in their own life. Many disabled people describe it this way: the hardest part is often not the body but the world around it. Steps with no ramp, a field trip that never thought about access, a gym class with no role for them. Those barriers can change, and you can help change them.", "Belonging is more than being present. Research with people with disabilities and their families describes it in layers: being present, invited, welcomed, known, accepted, supported, befriended, needed, and loved. A student can sit in a classroom every day and still not be invited to the lunch table or the team. Ask the school to plan ahead with you, through a 504 plan or an IEP if your child has one, for field trips, gym class, assemblies, fire drills, and after-school activities, and include your child in that planning. Adaptive sports, clubs, and camps can be a place where they are the athlete, not the exception.", "Words matter. Most people say \"uses a wheelchair\" or \"a wheelchair user,\" never words that make it sound like a prison, and many prefer person-first words while others say \"disabled\" with pride. Ask your child which words they like, and use them. Never touch or push someone's wheelchair or mobility aid without asking; it is part of their personal space."],
  say:["\"What works best for you here?\"", "\"Let's plan this so you're in it from the start.\"", "\"If something at school keeps you out, I want to know. That's a problem with the plan, not with you.\"", "\"Which words do you like people to use?\""],
  avoid:["Deciding for them what they can or can't do. Ask, and check with the doctor about activity.", "Praising them as an \"inspiration\" for ordinary things.", "Accepting \"they can sit this one out\" as the plan."],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with 504 plans, IEPs, and including your child.", L("Center for Parent Information and Resources","https://www.parentcenterhub.org/")+": find the parent center in your state.", "Your child's doctor and therapists, for every question about activity.", "Ask the school, your parks and recreation office, or your child's therapists about adaptive sports and clubs nearby.", CALM],
  sources:["barnessocial", "carterbelong", "apadisability"]
};

T["deaf-hoh"] = {
  keys:"deaf hard of hearing hearing loss hoh asl american sign language sign language interpreter captions hearing aids cochlear implant lip reading deaf community deaf culture audiologist",
  life:["hearing"],
  quick:["Ask how your child likes to communicate, and follow their lead: sign, speech, text, captions, or a mix.", "Make sure school has what they need: an interpreter, captions, an assistive listening system, good seating.", "Help them find Deaf and hard of hearing peers. Being understood without effort matters.", "Let them choose their words. Many say \"Deaf\" with a capital D, and that is a source of pride."],
  talk:["Middle schoolers who are Deaf or hard of hearing live in many different ways. Some sign, some speak, some do both, some use hearing aids or cochlear implants, and some do not. Many Deaf people see Deafness as a culture and a language community, not a loss, and write Deaf with a capital D. Others say hard of hearing or have a hearing loss. Each person chooses their own words. Ask your child which they like, and use them.", "Much of what makes the day hard is how the world communicates: a teacher who talks while facing the board, a video with no captions, a lunch table where everyone talks at once, a group chat that moves faster than lipreading ever could. Work with the school, often through an IEP or a 504 plan, for what your child needs: a qualified interpreter, captions on every video, an assistive listening system, seating where they can see faces, notes or slides ahead of time. Questions about hearing, devices, or treatment belong with the family, the audiologist, and the doctor.", "Middle school friendships run on fast talk and inside jokes, so being left out can creep in quietly. Make home a place where communication is easy: one person talks at a time, faces stay visible, and no one says \"never mind.\" Help your child find Deaf and hard of hearing peers, through school programs, camps, or community events. If your child ever needs crisis help, the 988 Lifeline offers counselors who sign, by videophone, through ASL Now on the 988 website, and anyone can text 988."],
  say:["\"How do you want to talk about this: sign, speech, text, or all three?\"", "\"Which words do you like: Deaf, hard of hearing, or something else?\"", "\"If you miss something, I'll say it again or write it. Never 'never mind.'\"", "\"What would make class easier to follow?\""],
  avoid:["\"Never mind\" or \"I'll tell you later.\" It leaves them out of the moment.", "Talking louder, slower, or with exaggerated lips. Face them and speak clearly.", "Treating their language or their identity as something to fix."],
  help:[L("988 Lifeline","https://988lifeline.org/")+": ASL Now on the website reaches a counselor who signs, by videophone. Or text 988, any time.", L("PACER Center (Minnesota)","https://www.pacer.org")+": help with IEPs, 504 plans, interpreters, and captions.", "Your child's audiologist, doctor, and the school's teacher for Deaf and hard of hearing students.", "Ask them about Deaf and hard of hearing groups, camps, and events for kids near you.", CALM],
  sources:["apadisability", "kbia988asl", "carterbelong"]
};

T["blind-low-vision"] = {
  keys:"blind blindness low vision visual impairment visually impaired braille screen reader large print magnifier white cane orientation and mobility guide dog seeing differently eyesight vision",
  life:["seeing"],
  quick:["Ask how your child reads and gets around best, and follow their lead: braille, a screen reader, large print, magnification, a cane.", "Make sure materials come in their format on time, every time, not a week late.", "Teach the people around them a few habits: say your name, describe out loud, offer an elbow instead of grabbing.", "Let them choose their words. Many people say \"blind\" plainly and with pride."],
  talk:["Middle schoolers who are blind or have low vision see in many different ways. Some see nothing, some see light and shapes, some read large print with a magnifier, and many use a mix of braille, a screen reader, and their remaining sight. Many blind people use the word \"blind\" plainly, as a fact about them and sometimes as a point of pride, and others say low vision or visually impaired. Each person chooses their own words. Ask your child, and use theirs.", "Much of what makes school hard is the format of the world: a worksheet handed out in small print, a slide no one reads aloud, a textbook that arrives in braille after the unit is over, a hallway full of backpacks. Through an IEP or a 504 plan, a teacher of students with visual impairments, and an orientation and mobility specialist, your child can get materials in their format on time, technology that fits, and training to travel with independence. Questions about their eyes, their vision, or treatment belong with the family and the eye doctor.", "Middle school social life is very visual: glances, gestures, phones held up to share a picture. Help friends and teachers learn simple habits: say your name when you walk up, describe what is happening, offer an elbow instead of steering, and say when you are leaving. Independence is a big goal at this age, so let your child do things their own way, even when it takes longer. Help them find blind and low vision peers, through school programs, camps, or summer programs, where they are not the only one."],
  say:["\"How do you like to read this: braille, audio, or large print?\"", "\"Want my elbow, or are you good?\"", "\"Which words do you like: blind, low vision, or something else?\"", "\"What would make getting around school easier?\""],
  avoid:["Grabbing their arm, cane, or backpack to steer them.", "Doing things for them that they can do their own way.", "Pointing and saying \"over there.\" Use words: \"on your left, by the door.\""],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with IEPs, 504 plans, and accessible materials.", L("Center for Parent Information and Resources","https://www.parentcenterhub.org/")+": find the parent center in your state.", "Your child's eye doctor, and the school's teacher of students with visual impairments and orientation and mobility specialist.", "Ask them about blind and low vision groups, camps, and summer programs for kids near you.", CALM],
  sources:["apadisability", "barnessocial", "carterbelong"]
};

T["autistic-ms"] = {
  keys:"autism autistic asperger spectrum asd sensory overload meltdown shutdown stimming special interests routines change social rules masking neurodivergent different ways of thinking iep 504",
  life:["autism"],
  quick:["Learn how your child's brain works from them: what is hard, what is easy, what helps them reset.", "Plan for the sensory load of middle school: noise, lights, crowds, and changes in routine.", "Treat a meltdown or a shutdown as overload, not misbehavior. Calm and space come first.", "Honor their interests and their ways of moving and talking. Help them find friends who get them."],
  talk:["Many autistic people, and many families, prefer the word \"autistic,\" the way someone might say \"left-handed,\" because autism is part of how their brain works, not something separate from them. Others prefer \"a person with autism.\" Each person chooses their own words, so ask your child. Autistic middle schoolers often notice details others miss, think deeply about what they love, and are honest and loyal friends. They also meet a world built for other kinds of brains.", "Middle school can be a lot: loud hallways, bright lights, crowded lunchrooms, changing classes every hour, and social rules nobody says out loud. Many autistic kids spend the day masking, copying what others do and hiding what feels natural, and come home exhausted. A meltdown or a shutdown is usually overload, not a choice to misbehave. What helps is lowering the load: a quiet place, headphones, a heads-up before changes, clear instructions, and permission to move, fidget, or stim in ways that calm them. Through an IEP or a 504 plan, the school can build these in. Questions about evaluations, therapies, or medicine belong with the family and the doctor.", "Friendships matter, and they can look different. Many autistic kids connect best around a shared interest, in smaller groups, or online. Help your child find those places: clubs, teams, and groups built around what they love, and autistic peers when you can. Autistic students are bullied more often, so watch for it and act the same day. Kids who mask a lot can also carry more anxiety and low mood, so keep the counselor close."],
  say:["\"What was the hardest part of today, and what helped?\"", "\"You don't have to look at me to talk. Whatever helps you think.\"", "\"Tell me about the thing you love. I want to understand it.\"", "\"Which words do you like: autistic, or something else?\""],
  avoid:["Punishing a meltdown, or demanding eye contact.", "Stopping harmless stimming because it looks different.", "Talking about autism only as a problem in front of them."],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with IEPs, 504 plans, and autism at school.", L("Center for Parent Information and Resources","https://www.parentcenterhub.org/")+": find the parent center in your state.", "Your child's doctor, and the school's special education team.", "Ask about clubs, groups, and camps where autistic kids connect around shared interests.", CALM],
  sources:["kenny16", "apadisability", "carterbelong"]
};

T["sibling-disability"] = {
  keys:"sibling brother sister disability illness special needs chronic illness sick sibling autism down syndrome cerebral palsy cancer sibshops jealous embarrassed left out young carer caregiving youth",
  life:["close"],
  quick:["Make time that is only for this child, even fifteen minutes a week.", "Let them say the hard feelings: jealous, embarrassed, angry, worried, guilty. All of them are normal.", "Give them simple, true information about their sibling's condition, and room to ask anything.", "Let them help, but keep the grown-up jobs with the grown-ups."],
  talk:["Brothers and sisters of kids with a disability or illness carry a quiet share of family life. Many feel deep love and pride, and also jealousy, embarrassment, worry, guilt for being healthy, or anger about the time and attention that goes to their sibling. All of these can be true on the same day. The program called Sibshops grew from the discovery that siblings had real needs and few places to meet them. A middle schooler may hide their feelings to avoid adding to your load. Tell them out loud that their feelings are welcome, the hard ones too.", "Kids this age want to be ordinary, so a sibling's differences can feel exposing in front of friends. Help them find words for questions from friends (\"My brother is autistic. He's really into trains.\") and let them choose when friends come over. Give honest, simple information about their sibling's condition and plans; uncertainty without information grows into worry. Ask what questions they have, and if you don't know, say so.", "Many siblings help at home, and helping can grow kindness and skill. Watch for the line where helping turns into carrying: missing school, losing friends, staying up worried, or feeling responsible for their sibling's safety. Millions of kids help care for someone in their family. Keep the adult jobs with adults, and make sure this child has their own time, activities, and people. Fifteen minutes that belong only to them can mean a great deal."],
  say:["\"How are you doing? Not your sister. You.\"", "\"It's okay to love him and be mad about how things are. Both can be true.\"", "\"What questions do you have about her condition?\"", "\"This time is just for you.\""],
  avoid:["\"You're the easy one,\" or \"At least you're healthy.\" It can make their needs feel smaller.", "Giving them adult jobs, like being responsible for their sibling's safety.", "Only talking with them about their sibling."],
  help:[L("Sibling Support Project","https://siblingsupport.org/")+": Sibshops and support for brothers and sisters.", L("American Association of Caregiving Youth","https://aacy.org/")+": for kids who help care for someone at home.", "The school counselor, and your child's own doctor if worry or sadness hangs on.", CALM],
  sources:["sibsupport", "aacy", "carterbelong"]
};

T["telling-friends"] = {
  keys:"telling friends disclosure keep it private secret health condition disability diagnosis what to say questions friends ask hiding medicine nurse privacy mental health adhd autism diabetes epilepsy",
  life:["health", "pain", "moving", "hearing", "seeing", "learning", "autism", "mind"],
  quick:["Who knows about a condition is your child's choice, whenever safety allows.", "Help them build three answers: a short one for anyone, a longer one for close friends, and \"I'd rather not talk about it.\"", "A few adults may need to know for safety, like the nurse or a coach. Explain why, and decide together how much.", "Remind them that what goes online is hard to take back."],
  talk:["For a middle schooler living with a health condition, a disability, or a mental health condition, the question \"Who should know?\" comes up again and again: a new friend, a sleepover, a team, a group chat. Some kids want everyone to know so they can stop explaining. Some tell one or two close friends. Some keep it private. Each of those can be a good choice. What matters is that it is their choice, made with your help, and that they can change their mind.", "Help your child practice. A short version for anyone (\"I have diabetes, so sometimes I check my blood sugar\"), a longer version for close friends, and a kind, firm \"I'd rather not talk about it.\" Talk about who has earned the longer version, and what to do if someone reacts badly or spreads it. Some information has to reach a few adults for safety: the school nurse, a coach, a friend's parent at a sleepover. Explain why, and let your child help decide what those adults hear and how.", "Hiding a condition can turn risky when it means skipping medicine, the nurse, or an inhaler to avoid questions. If that is happening, get curious instead of angry, and look for more private ways. Online, remind them that posts and screenshots last. If a friend shares their story without permission, or teases them about it, that is unkind and sometimes bullying; help them tell a trusted adult the same day."],
  say:["\"It's your story. You decide who hears it.\"", "\"Want to practice what you'd say?\"", "\"The nurse needs to know for safety. What do you want her to know, and how?\"", "\"If someone is unkind about it, I want to know.\""],
  avoid:["Telling other parents, teachers, or relatives without asking your child first, unless safety requires it.", "Pushing them to \"be open\" or to \"keep it quiet.\"", "Posting about their condition online without their yes."],
  help:[L("PACER Center (Minnesota)","https://www.pacer.org")+": help with school plans and bullying.", "Your child's doctor and the school nurse, for what adults need to know for safety.", "The school counselor, if telling or not telling is weighing on them.", CALM],
  sources:["carterbelong", "apadisability"]
};

T["why-me"] = {
  keys:"why me faith god prayer punishment fair unfair meaning big questions disability illness chronic condition body different healing church mosque synagogue temple spiritual belief doubt hope",
  life:["health", "pain", "moving", "hearing", "seeing", "learning", "autism"],
  quick:["\"Why me?\" is a real question. Let it be asked out loud, and don't rush to answer it.", "Say plainly: no one caused this by being bad. It is not a punishment.", "Start from your family's own traditions: faith, prayer, and worship, or quiet, nature, and family rituals.", "Ask what helps and what weighs on them, and bring in a faith leader you trust if your family has one."],
  talk:["Middle schoolers living with an illness or a disability often ask the biggest questions there are. Why me? Is this fair? Did I do something wrong? Will it ever get better? For many families, faith is one of the places these questions live: in prayer, in a congregation, in sacred stories, or in a grandparent's steady trust. For others, the same questions live in quiet, nature, art, and family traditions. Both are doors to meaning. Start from your own family, and let your child wonder out loud.", "Faith can be a strong resource or a real weight, and sometimes both. In research with teens living with a chronic illness, those who found strength in their faith and used it in their decisions tended to do better emotionally, while those who felt punished or abandoned by God had a harder time. So listen for both: what steadies your child, and what makes it heavier. Some kids have heard that illness is a punishment, that enough faith would heal them, or have been prayed over without being asked. Say clearly that no one caused this by being bad, and let them tell you how those moments felt.", "Belonging matters too. A faith community can be a place where your child is fully welcome, with a role to play, or a place with steps, long services, loud rooms, or no place for them. Talk with your faith leader about what would help your child take part, and follow your child's lead. You don't need perfect answers. \"I don't know, and I'm not going anywhere\" is often the most faithful thing a grown-up can say."],
  say:["\"That's a real question. People have asked it for thousands of years.\"", "\"No one caused this by being bad. It's not a punishment.\"", "\"I don't know all the answers. I'm not going anywhere.\"", "\"What helps you feel close to God, or to what matters most to you?\""],
  avoid:["Rushing to explain why it happened.", "\"Everything happens for a reason,\" or \"God only gives you what you can handle.\" Kids can hear blame in these.", "Telling them enough faith or prayer will make it go away."],
  help:["A pastor, priest, imam, rabbi, elder, or other faith leader you trust, from your own tradition.", "The school counselor, or a hospital chaplain if your child is in the hospital.", L("PACER Center (Minnesota)","https://www.pacer.org")+": help with school plans and belonging.", CALM],
  sources:["uabspirit", "carterbelong"]
};
/* HA2 guides end */

const GROUPS = [
  ["Home and Family", [["blowup","In the middle of a blowup"],["death","When someone dies"],["sick","A parent or grandparent is very sick"],["accident","A car accident or sudden injury"],["divorce","Divorce and two homes"],["stepfamily","A new stepfamily"],["moving","Moving away"],["money","Money is tight"],["lying","Lying, sneaking, and stealing"],["deployed","A parent is deployed or far away"],["baby","A new baby or sibling"],["drinking","Someone at home drinks or uses too much"],["jail","A parent in jail"],["foster","Foster care or adoption"],["pet","A pet dies"]]],
  ["Friends and School", [["startms","Starting middle school"],["friends","Friendship breakups and drama"],["leftout","Being left out"],["bullying","Bullying, in person and online"],["grades","Grades and pressure"],["adhd","ADHD and learning differences"],["cut","Cut from a team or tryout"],["crush","A first crush"],["teacher","A teacher or coach leaves"]]],
  ["Growing Up and Online", [["body","A changing body"],["bedwetting","Bedwetting"],["compare","Comparing yourself to others"],["phone","First phone and group chats"],["pictures","Online pressure and pictures"],["porn","Pornography"],["vaping","Vaping, nicotine pouches, and being offered things"],["gambling","Gambling, betting, and loot boxes"],["ai","AI chatbots and companions"],["sleep","Sleep, screens, and gaming"],["looks","Not liking how you look"],["eating","Eating, food, and weight worries"],["wholike","Crushes, feelings, and who you like"],["faith","Big questions about faith"],["identity","Figuring out who you are"],["illness","Living with an illness or disability"]]],
  ["Big World, Hard News", [["lockdown","Lockdowns and school violence"],["news","Scary news and politics"],["immigration","Immigration raids"],["unfair","Being treated unfairly"],["suicide","A death by suicide in the community"],["disaster","Disasters and storms"],["war","War in the news"]]],
  ["Safety", [["selfharm","Self-harm and cutting"],["friendhurting","When a friend is hurting"]]],
  ["Health and Ability", [["school-health","A health condition at school: the nurse, a 504 plan, and missed days"],["pain-headaches","Pain or headaches that keep coming back"],["moving-included","Moving differently and being included"],["deaf-hoh","Deaf or hard of hearing"],["blind-low-vision","Blind or low vision"],["autistic-ms","Autistic in middle school"],["sibling-disability","A sibling with a disability or illness"],["telling-friends","Telling friends, or not"],["why-me","Why me? Faith and a body that's different"]]]
];
window.ASPEN_GUIDES = {groups: GROUPS.map(([name, list]) => ({name, topics: list.map(([id, title]) => Object.assign({id, title}, T[id] || {}))}))};
})();
