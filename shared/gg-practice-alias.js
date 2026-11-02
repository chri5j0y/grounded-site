/* =====================================================================
   GROUNDED . PRACTICE NAMES, OLD TO NEW (GWG BLD 885)
   A Growth Plan saves each practice by its part and name ('part|Name'), in the plan's
   selected lists and in each day's marks. When a practice is renamed, merged, or moved to
   another part, this map brings a saved record forward, on this device only, so an old
   pick shows and counts as the practice it became. Nothing is lost: a mark for an old name
   becomes a mark for the new one, and two picks that became one stay one.
   gg-profiles.js calls GGPracticeAlias.fixVault(vault) each time a profile opens, so every
   page that loads this file before gg-profiles.js reads the new names.
     GGPracticeAlias.MAP[tree]['part|Old Name'] = 'part|New Name'
     (Aspen also maps places, 'grade:part:index'; BLD 907 moved every Trunk and Fruit practice to one of
      the four parts a person tends, made by grounded-workshop patches/bld907/b-refile/refile.mjs)
     GGPracticeAlias.key(tree, 'part|Name')    the current key for a saved key
     GGPracticeAlias.fix(tree, record)         bring one tree record forward; true if it changed
     GGPracticeAlias.fixVault(vault)           the same for every tree in a profile
   To rename a practice later: add a line here, keep the old key in shared/practice-rhythm.js,
   and bump ?v= everywhere this file loads.
   ===================================================================== */
(function () {
  if (window.GGPracticeAlias) return;
  var MAP = {
    oak: {
      "trunk|Get Counseling": "bark|Talk With a Therapist",
      "leaves|Chakras": "leaves|Body Awareness",
      "leaves|Unplugged Evening": "leaves|Evening Wind Down",
      "trunk|Create Stuff": "bark|Create Something",
      "trunk|Journal Often": "bark|Journal",
      "branches|Faith": "branches|Faith Community",
      "leaves|Medicine": "leaves|See the Doctor Early",
      "trunk|Journal": "bark|Journal",
      "trunk|Create Something": "bark|Create Something",
      "trunk|Plan the Future": "bark|Plan the Future",
      "trunk|Talk With a Therapist": "bark|Talk With a Therapist",
      "trunk|Keep Learning": "bark|Keep Learning",
      "trunk|Write Your Story": "bark|Write Your Story",
      "fruit|Volunteer": "branches|Volunteer",
      "fruit|Pay It Forward": "branches|Pay It Forward",
      "fruit|Be Generous": "branches|Be Generous",
      "fruit|Provide Care": "branches|Provide Care",
      "fruit|Inspire Hope": "branches|Inspire Hope",
      "fruit|Make Peace": "branches|Make Peace",
      "fruit|Capture the Moment": "bark|Capture the Moment",
      "trunk|Values Sort": "bark|Values Sort",
      "trunk|Legacy Letter": "branches|Legacy Letter",
      "trunk|Purpose Statement": "bark|Purpose Statement",
      "trunk|Mentor Someone": "branches|Mentor Someone",
      "trunk|Job Crafting": "bark|Job Crafting",
      "trunk|Moral Repair Letter": "roots|Moral Repair Letter",
      "trunk|Stand-For Card": "bark|Stand-For Card",
      "trunk|Meaning Walk": "bark|Meaning Walk",
      "trunk|Expressive Writing": "bark|Expressive Writing",
      "fruit|Three Good Things": "roots|Three Good Things",
      "fruit|Best Possible Self": "bark|Best Possible Self",
      "fruit|Hope Map": "bark|Hope Map",
      "fruit|Savoring Walk": "bark|Savoring Walk",
      "fruit|Joy List": "bark|Joy List",
      "fruit|Tiny Next Step": "bark|Tiny Next Step",
      "fruit|Growth Reflection": "bark|Growth Reflection",
      "fruit|Something to Look Forward To": "bark|Something to Look Forward To",
      "trunk|Worth Beyond Doing": "bark|Worth Beyond Doing",
      "fruit|Celebration Plan": "branches|Celebration Plan",
      "fruit|Let the Good Sink In": "bark|Let the Good Sink In",
      "bark|Three Good Things": "roots|Three Good Things"
    },
    birch: {
      "trunk|Values Sort": "bark|Values Sort",
      "trunk|Purpose Reflection": "bark|Purpose Reflection",
      "trunk|Serve Someone": "branches|Serve Someone",
      "trunk|Create Something": "bark|Create Something",
      "trunk|Mentor Someone": "branches|Mentor Someone",
      "trunk|Weekly Reset": "bark|Weekly Reset",
      "trunk|Name Your Gifts": "bark|Name Your Gifts",
      "trunk|Journal": "bark|Journal",
      "trunk|Study Sprints": "bark|Study Sprints",
      "trunk|Start Strong at a New Job": "bark|Start Strong at a New Job",
      "trunk|Big Choice Map": "bark|Big Choice Map",
      "trunk|One Thing That Matters": "bark|One Thing That Matters",
      "trunk|Ask Someone About Their Path": "branches|Ask Someone About Their Path",
      "trunk|Life Skill of the Month": "bark|Life Skill of the Month",
      "trunk|Wins File": "bark|Wins File",
      "trunk|Groundwork Page": "bark|Groundwork Page",
      "fruit|Three Good Things": "roots|Three Good Things",
      "fruit|Something to Look Forward To": "bark|Something to Look Forward To",
      "fruit|Pay It Forward": "branches|Pay It Forward",
      "fruit|Best Possible Self": "bark|Best Possible Self",
      "fruit|Hope Map": "bark|Hope Map",
      "fruit|Tiny Next Step": "bark|Tiny Next Step",
      "fruit|Joy List": "bark|Joy List",
      "fruit|Savoring Walk": "bark|Savoring Walk",
      "fruit|Capture the Moment": "bark|Capture the Moment",
      "fruit|Starter Cushion": "bark|Starter Cushion",
      "fruit|Celebrate a Win": "bark|Celebrate a Win",
      "fruit|Future Me Letter": "bark|Future Me Letter",
      "fruit|Be Generous": "branches|Be Generous",
      "fruit|Watch Something Grow": "roots|Watch Something Grow",
      "fruit|Inspire Hope": "branches|Inspire Hope",
      "fruit|Your Own Timeline": "bark|Your Own Timeline",
      "trunk|Worth Beyond Doing": "bark|Worth Beyond Doing",
      "fruit|Celebration Plan": "branches|Celebration Plan",
      "fruit|Let the Good Sink In": "bark|Let the Good Sink In",
      "bark|Three Good Things": "roots|Three Good Things"
    },
    sequoia: {
      "leaves|Wind-Down Hour": "leaves|Evening Wind Down",
      "trunk|Make Something": "bark|Create Something",
      "branches|Faith": "branches|Faith Community",
      "leaves|Medicine": "leaves|My Medicines",
      "trunk|Write Your Story": "bark|Write Your Story",
      "trunk|Legacy Letter": "branches|Legacy Letter",
      "trunk|Keep Learning": "bark|Keep Learning",
      "trunk|Mentor Someone": "branches|Mentor Someone",
      "trunk|Create Something": "bark|Create Something",
      "trunk|Volunteer": "branches|Volunteer",
      "trunk|Life Review": "roots|Life Review",
      "trunk|Record a Story": "branches|Record a Story",
      "trunk|What I Want Remembered": "branches|What I Want Remembered",
      "trunk|Values Sort": "bark|Values Sort",
      "trunk|Reason to Get Up": "bark|Reason to Get Up",
      "trunk|Find Your Role": "branches|Find Your Role",
      "trunk|Name Your Gifts": "bark|Name Your Gifts",
      "trunk|Peace with the Past": "roots|Peace with the Past",
      "trunk|Life Lessons": "branches|Life Lessons",
      "trunk|Moral Repair Letter": "roots|Moral Repair Letter",
      "trunk|Read with a Child": "branches|Read with a Child",
      "trunk|Pass On a Skill": "branches|Pass On a Skill",
      "fruit|Pay It Forward": "branches|Pay It Forward",
      "fruit|Be Generous": "branches|Be Generous",
      "fruit|Inspire Hope": "branches|Inspire Hope",
      "fruit|Make Peace": "branches|Make Peace",
      "fruit|Capture the Moment": "bark|Capture the Moment",
      "fruit|Something to Look Forward To": "bark|Something to Look Forward To",
      "fruit|Three Good Things": "roots|Three Good Things",
      "fruit|Two-Week Gratitude": "roots|Two-Week Gratitude",
      "fruit|Savoring Walk": "bark|Savoring Walk",
      "fruit|Joy List": "bark|Joy List",
      "fruit|Tiny Next Step": "bark|Tiny Next Step",
      "fruit|Hope Map": "bark|Hope Map",
      "fruit|Best Possible Year": "bark|Best Possible Year",
      "fruit|Something Funny": "bark|Something Funny",
      "fruit|Hopes Big and Small": "bark|Hopes Big and Small",
      "fruit|Make Your Wishes Known": "branches|Make Your Wishes Known",
      "fruit|Blessing for Those You Love": "roots|Blessing for Those You Love",
      "fruit|Watch Something Grow": "roots|Watch Something Grow",
      "fruit|Worth Living": "roots|Worth Living",
      "trunk|Worth Beyond Doing": "bark|Worth Beyond Doing",
      "fruit|Comfort Within Reach": "leaves|Comfort Within Reach",
      "fruit|Celebration Plan": "branches|Celebration Plan",
      "fruit|Let the Good Sink In": "bark|Let the Good Sink In",
      "bark|Three Good Things": "roots|Three Good Things",
      "bark|Two-Week Gratitude": "roots|Two-Week Gratitude"
    },
    pine: {
      "branches|Faith": "branches|Faith Community",
      "trunk|Values Sort": "bark|Values Sort",
      "trunk|Purpose Reflection": "bark|Purpose Reflection",
      "trunk|Volunteer": "branches|Volunteer",
      "trunk|My Brain Grows": "bark|My Brain Grows",
      "trunk|Create Something": "bark|Create Something",
      "trunk|Mentor Someone": "branches|Mentor Someone",
      "trunk|Name Your Gifts": "bark|Name Your Gifts",
      "trunk|Journal": "bark|Journal",
      "trunk|Study Sprints": "bark|Study Sprints",
      "trunk|First Job Balance": "bark|First Job Balance",
      "trunk|One Thing That Matters": "bark|One Thing That Matters",
      "trunk|Expressive Writing": "bark|Expressive Writing",
      "trunk|Ask Someone About Their Path": "branches|Ask Someone About Their Path",
      "trunk|Life Skill of the Month": "bark|Life Skill of the Month",
      "trunk|What I Stand For": "bark|What I Stand For",
      "trunk|Next Steps Page": "bark|Next Steps Page",
      "fruit|Three Good Things": "roots|Three Good Things",
      "fruit|Something to Look Forward To": "bark|Something to Look Forward To",
      "fruit|Pay It Forward": "branches|Pay It Forward",
      "fruit|Best Possible Self": "bark|Best Possible Self",
      "fruit|Hope Map": "bark|Hope Map",
      "fruit|Tiny Next Step": "bark|Tiny Next Step",
      "fruit|Joy List": "bark|Joy List",
      "fruit|Savoring Walk": "bark|Savoring Walk",
      "fruit|Capture the Moment": "bark|Capture the Moment",
      "fruit|Something Funny": "bark|Something Funny",
      "fruit|Hope Playlist": "bark|Hope Playlist",
      "fruit|Future Me Letter": "bark|Future Me Letter",
      "fruit|Be Generous": "branches|Be Generous",
      "fruit|Watch Something Grow": "roots|Watch Something Grow",
      "fruit|Inspire Hope": "branches|Inspire Hope",
      "fruit|Celebrate a Win": "bark|Celebrate a Win",
      "trunk|My Own Appointment": "leaves|My Own Appointment",
      "fruit|Good Day List": "bark|Good Day List",
      "bark|Three Good Things": "roots|Three Good Things"
    },
    maple: {
      "trunk|Strength Detective": "bark|Strength Detective",
      "trunk|All About Me": "bark|All About Me",
      "trunk|Helper Job": "branches|Helper Job",
      "trunk|Proud Jar": "bark|Proud Jar",
      "trunk|Try It Again": "bark|Try It Again",
      "trunk|Big Question": "bark|Big Question",
      "trunk|Make Something": "bark|Make Something",
      "trunk|How Can I Help?": "branches|How Can I Help?",
      "fruit|Hope Map": "bark|Hope Map",
      "fruit|Looking Forward": "bark|Looking Forward",
      "fruit|Tomorrow Wish": "bark|Tomorrow Wish",
      "fruit|Good News": "branches|Good News",
      "fruit|Brave Step": "bark|Brave Step",
      "fruit|Hope Story": "branches|Hope Story",
      "fruit|Smile Maker": "branches|Smile Maker",
      "fruit|Plant a Seed": "roots|Plant a Seed",
      "trunk|My Own Way": "bark|My Own Way",
      "fruit|Good Day Plan": "bark|Good Day Plan"
    },
    aspen: {
      "trunk|Spend ten minutes doing something you love, just for fun.": "bark|Spend ten minutes doing something you love, just for fun.",
      "trunk|Teach someone a move, trick, or game you're good at.": "branches|Teach someone a move, trick, or game you're good at.",
      "trunk|Make a list of five things you're good at. Ask someone to add one.": "bark|Make a list of five things you're good at. Ask someone to add one.",
      "trunk|Write about a time you helped someone. How did it feel?": "bark|Write about a time you helped someone. How did it feel?",
      "trunk|Think about one person who needs you, and why.": "branches|Think about one person who needs you, and why.",
      "trunk|Picture yourself doing something you love. Notice how it feels.": "bark|Picture yourself doing something you love. Notice how it feels.",
      "trunk|Do one small job at home without being asked.": "branches|Do one small job at home without being asked.",
      "trunk|Tell someone thank you for something they do for you.": "roots|Tell someone thank you for something they do for you.",
      "fruit|Take a walk and think about something you're looking forward to.": "bark|Take a walk and think about something you're looking forward to.",
      "fruit|Plant a seed or care for a plant, and check on it each day.": "roots|Plant a seed or care for a plant, and check on it each day.",
      "fruit|Write three good things that happened today.": "roots|Write three good things that happened today.",
      "fruit|Draw a picture of something you hope for.": "bark|Draw a picture of something you hope for.",
      "fruit|Close your eyes and picture a good day you're looking forward to.": "bark|Close your eyes and picture a good day you're looking forward to.",
      "fruit|Before bed, name one thing you're thankful for.": "roots|Before bed, name one thing you're thankful for.",
      "fruit|Tell someone about something you're excited about.": "branches|Tell someone about something you're excited about.",
      "fruit|Ask a grown-up what they hoped for when they were your age.": "branches|Ask a grown-up what they hoped for when they were your age.",
      "trunk|Before an appointment, write two questions you want to ask, and ask one yourself.": "leaves|Before an appointment, write two questions you want to ask, and ask one yourself.",
      "fruit|On a good day, write what helped, so you can read it on a hard day.": "bark|On a good day, write what helped, so you can read it on a hard day.",
      "trunk|Spend ten minutes on a hobby you care about, with your phone away.": "bark|Spend ten minutes on a hobby you care about, with your phone away.",
      "trunk|Practice a skill you want to get better at.": "bark|Practice a skill you want to get better at.",
      "trunk|Write your top three values, the things that matter most to you.": "bark|Write your top three values, the things that matter most to you.",
      "trunk|Write about who you want to be a year from now.": "bark|Write about who you want to be a year from now.",
      "trunk|Think about one choice today that matched who you want to be.": "bark|Think about one choice today that matched who you want to be.",
      "trunk|Picture someone you look up to. What do you admire about them?": "bark|Picture someone you look up to. What do you admire about them?",
      "trunk|Help someone without being asked, and don't tell anyone.": "branches|Help someone without being asked, and don't tell anyone.",
      "trunk|Ask a grown-up what gave their life meaning when they were your age.": "branches|Ask a grown-up what gave their life meaning when they were your age.",
      "fruit|Take a walk and notice three things that are growing or changing.": "roots|Take a walk and notice three things that are growing or changing.",
      "fruit|Clean up one small space and notice how it feels after.": "bark|Clean up one small space and notice how it feels after.",
      "fruit|Write three good things from today and why they happened.": "roots|Write three good things from today and why they happened.",
      "fruit|Write a letter to yourself one year from now.": "bark|Write a letter to yourself one year from now.",
      "fruit|Think of one thing you're thankful for, even on a hard day.": "roots|Think of one thing you're thankful for, even on a hard day.",
      "fruit|Picture something good that could happen this week.": "bark|Picture something good that could happen this week.",
      "fruit|Tell someone about something you're looking forward to.": "branches|Tell someone about something you're looking forward to.",
      "fruit|Encourage a friend who's having a hard week.": "branches|Encourage a friend who's having a hard week.",
      "trunk|Spend time on something you might want to do in the future.": "bark|Spend time on something you might want to do in the future.",
      "trunk|Help with a project in your neighborhood, school, or faith community.": "branches|Help with a project in your neighborhood, school, or faith community.",
      "trunk|Help with a project in your neighborhood, school, or community.": "branches|Help with a project in your neighborhood, school, or community.",
      "trunk|Write what kind of person you want to be in high school.": "bark|Write what kind of person you want to be in high school.",
      "trunk|Write about a gift you have and how it could help others.": "bark|Write about a gift you have and how it could help others.",
      "trunk|Think about a hard choice you made. What did it show about you?": "bark|Think about a hard choice you made. What did it show about you?",
      "trunk|Ask yourself: what matters most to me today?": "bark|Ask yourself: what matters most to me today?",
      "trunk|Ask a grown-up about their work and what makes it meaningful.": "branches|Ask a grown-up about their work and what makes it meaningful.",
      "trunk|Help someone younger with something you're good at.": "branches|Help someone younger with something you're good at.",
      "fruit|Take a walk and imagine one good thing about next year.": "bark|Take a walk and imagine one good thing about next year.",
      "fruit|Do one small thing today that your future self will thank you for.": "bark|Do one small thing today that your future self will thank you for.",
      "fruit|Write three ways you've grown this year.": "bark|Write three ways you've grown this year.",
      "fruit|Write about a hope you have for your life.": "bark|Write about a hope you have for your life.",
      "fruit|Name one thing you're thankful for before you fall asleep.": "roots|Name one thing you're thankful for before you fall asleep.",
      "fruit|Think of a hard time you got through, and remember that you made it.": "bark|Think of a hard time you got through, and remember that you made it.",
      "fruit|Tell someone about a goal you have.": "branches|Tell someone about a goal you have.",
      "fruit|Ask a grown-up about a time things got better for them.": "branches|Ask a grown-up about a time things got better for them.",
      "6:trunk:0": "6:bark:10",
      "6:trunk:1": "6:branches:10",
      "6:trunk:2": "6:bark:11",
      "6:trunk:3": "6:bark:12",
      "6:trunk:4": "6:branches:11",
      "6:trunk:5": "6:bark:13",
      "6:trunk:6": "6:branches:12",
      "6:trunk:7": "6:roots:9",
      "6:fruit:0": "6:bark:14",
      "6:fruit:1": "6:roots:10",
      "6:fruit:2": "6:roots:11",
      "6:fruit:3": "6:bark:15",
      "6:fruit:4": "6:bark:16",
      "6:fruit:5": "6:roots:12",
      "6:fruit:6": "6:branches:13",
      "6:fruit:7": "6:branches:14",
      "6:trunk:8": "6:leaves:10",
      "6:fruit:8": "6:bark:9",
      "7:trunk:0": "7:bark:10",
      "7:trunk:1": "7:bark:11",
      "7:trunk:2": "7:bark:12",
      "7:trunk:3": "7:bark:13",
      "7:trunk:4": "7:bark:14",
      "7:trunk:5": "7:bark:15",
      "7:trunk:6": "7:branches:10",
      "7:trunk:7": "7:branches:11",
      "7:fruit:0": "7:roots:9",
      "7:fruit:1": "7:bark:16",
      "7:fruit:2": "7:roots:10",
      "7:fruit:3": "7:bark:17",
      "7:fruit:4": "7:roots:11",
      "7:fruit:5": "7:bark:18",
      "7:fruit:6": "7:branches:12",
      "7:fruit:7": "7:branches:13",
      "7:trunk:8": "7:leaves:10",
      "7:fruit:8": "7:bark:9",
      "8:trunk:0": "8:bark:10",
      "8:trunk:1": "8:branches:10",
      "8:trunk:2": "8:bark:11",
      "8:trunk:3": "8:bark:12",
      "8:trunk:4": "8:bark:13",
      "8:trunk:5": "8:bark:14",
      "8:trunk:6": "8:branches:11",
      "8:trunk:7": "8:branches:12",
      "8:fruit:0": "8:bark:15",
      "8:fruit:1": "8:bark:16",
      "8:fruit:2": "8:bark:17",
      "8:fruit:3": "8:bark:18",
      "8:fruit:4": "8:roots:9",
      "8:fruit:5": "8:bark:19",
      "8:fruit:6": "8:branches:13",
      "8:fruit:7": "8:branches:14",
      "8:trunk:8": "8:leaves:10",
      "8:fruit:8": "8:bark:9",
      "branches|Tell someone thank you for something they do for you.": "roots|Tell someone thank you for something they do for you.",
      "bark|Write three good things that happened today.": "roots|Write three good things that happened today.",
      "bark|Before bed, name one thing you're thankful for.": "roots|Before bed, name one thing you're thankful for.",
      "bark|Write three good things from today and why they happened.": "roots|Write three good things from today and why they happened.",
      "bark|Think of one thing you're thankful for, even on a hard day.": "roots|Think of one thing you're thankful for, even on a hard day.",
      "bark|Name one thing you're thankful for before you fall asleep.": "roots|Name one thing you're thankful for before you fall asleep."
    },
    willow: {
      "trunk|One Story": "branches|One Story",
      "trunk|Three Things I Learned": "branches|Three Things I Learned",
      "trunk|Photo Time": "branches|Photo Time",
      "trunk|What I Gave": "roots|What I Gave",
      "trunk|How I'm Facing This": "bark|How I'm Facing This",
      "trunk|Something Still to Give": "branches|Something Still to Give",
      "fruit|What I'm Hoping for Today": "bark|What I'm Hoping for Today",
      "fruit|What Matters to Me": "branches|What Matters to Me",
      "fruit|Plan One Good Thing": "bark|Plan One Good Thing",
      "fruit|Picture the Welcome": "roots|Picture the Welcome",
      "fruit|Give Something Away": "branches|Give Something Away",
      "fruit|Talk About Dying, Once": "bark|Talk About Dying, Once"
    }
  };
  // BLD 907: library picks (plan[part].lib) follow their practice to its new part (Trunk and Fruit grow from tending).
  var LIB = {
    "g:trunk:0": "bark",
    "g:create:0": "bark",
    "g:trunk:1": "bark",
    "g:create:1": "bark",
    "g:trunk:2": "bark",
    "g:create:2": "bark",
    "g:trunk:3": "bark",
    "g:create:3": "bark",
    "g:trunk:4": "bark",
    "g:create:4": "bark",
    "g:trunk:5": "bark",
    "g:create:5": "bark",
    "g:trunk:6": "bark",
    "g:create:6": "bark",
    "g:trunk:7": "branches",
    "g:create:7": "branches",
    "g:trunk:8": "bark",
    "g:create:8": "bark",
    "g:trunk:9": "bark",
    "g:create:9": "bark",
    "g:trunk:10": "branches",
    "g:create:10": "branches",
    "g:trunk:11": "bark",
    "g:create:11": "bark",
    "g:fruit:0": "roots",
    "g:hope:0": "roots",
    "g:fruit:1": "bark",
    "g:hope:1": "bark",
    "g:fruit:2": "bark",
    "g:hope:2": "bark",
    "g:fruit:3": "bark",
    "g:hope:3": "bark",
    "g:fruit:4": "bark",
    "g:hope:4": "bark",
    "g:fruit:5": "bark",
    "g:hope:5": "bark",
    "g:fruit:6": "bark",
    "g:hope:6": "bark",
    "g:fruit:7": "branches",
    "g:hope:7": "branches",
    "g:fruit:8": "bark",
    "g:hope:8": "bark",
    "g:fruit:9": "branches",
    "g:hope:9": "branches",
    "g:fruit:10": "branches",
    "g:hope:10": "branches",
    "g:fruit:11": "bark",
    "g:hope:11": "bark",
    "n:strength-spotting": "bark",
    "n:helper-job": "branches",
    "n:who-counts-on-me": "branches",
    "n:values-in-action": "bark",
    "n:someone-i-admire": "bark",
    "n:meaning-interview": "branches",
    "n:tomorrow-wish": "bark",
    "n:share-good-news": "branches",
    "n:hope-story": "branches",
    "n:made-it-through": "bark",
    "n:clear-one-space": "bark",
    "n:the-real-you": "bark",
    "n:one-woodpecker": "bark",
    "n:sq-life-review": "roots",
    "n:sq-record-a-story": "branches",
    "n:sq-what-i-want-remembered": "branches",
    "n:sq-reason-to-get-up": "bark",
    "n:sq-find-your-role": "branches",
    "n:sq-peace-with-the-past": "roots",
    "n:sq-read-with-a-child": "branches",
    "n:sq-pass-on-a-skill": "branches",
    "n:sq-two-week-gratitude": "roots",
    "n:sq-hopes-big-and-small": "bark",
    "n:sq-make-your-wishes-known": "branches",
    "n:sq-watch-something-grow": "roots",
    "n:pn-study-sprints": "bark",
    "n:pn-first-job-balance": "bark",
    "n:pn-my-brain-grows": "bark",
    "n:pn-purpose-reflection": "bark",
    "n:pn-ask-someone-about-their-path": "branches",
    "n:pn-life-skill-of-the-month": "bark",
    "n:pn-future-me-letter": "bark",
    "n:pn-hope-playlist": "bark",
    "n:pn-celebrate-a-win": "bark",
    "n:br-starter-cushion": "bark",
    "n:br-weekly-reset": "bark",
    "n:br-big-choice-map": "bark",
    "n:br-wins-file": "bark",
    "n:br-start-strong-at-a-new-job": "bark",
    "n:br-your-own-timeline": "bark",
    "n:memory-box": "bark",
    "n:find-your-why": "bark",
    "n:life-asking": "roots",
    "n:take-in-good": "bark",
    "n:reason-to-rise": "bark",
    "n:elder-within": "roots"
  };
  var PARTS = ['roots', 'trunk', 'bark', 'branches', 'leaves', 'fruit'];
  var has = function (o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); };
  function key(tree, k) { var m = MAP[tree]; return has(m, k) ? m[k] : k; }

  // A plan: {part: {selected: [names], own: [names], custom, lib}}. Old picks move to the new part and name;
  // library picks (lib keys) move to the part their practice is filed under now.
  function isPlan(x) { return PARTS.some(function (p) { var v = x[p]; return v && typeof v === 'object' && Array.isArray(v.selected); }); }
  function fixPlan(m, plan) {
    var moves = [], libs = [];
    PARTS.forEach(function (p) {
      var x = plan[p]; if (!x || typeof x !== 'object') return;
      ['selected', 'own'].forEach(function (f) {
        if (!Array.isArray(x[f])) return;
        x[f] = x[f].filter(function (n) {
          if (!has(m, p + '|' + n)) return true;
          moves.push(m[p + '|' + n]); return false;
        });
      });
      if (typeof x.custom === 'string' && has(m, p + '|' + x.custom.trim())) { moves.push(m[p + '|' + x.custom.trim()]); x.custom = ''; }
      if (Array.isArray(x.lib)) x.lib = x.lib.filter(function (k) { if (!has(LIB, k) || LIB[k] === p) return true; libs.push([LIB[k], k]); return false; });
    });
    // Each old pick lands once under its new part and name, after the lists are filtered.
    moves.forEach(function (nk) {
      var j = nk.indexOf('|'), np = nk.slice(0, j), nn = nk.slice(j + 1);
      var t = plan[np] && typeof plan[np] === 'object' ? plan[np] : (plan[np] = { selected: [], custom: '', own: [] });
      if (!Array.isArray(t.selected)) t.selected = [];
      if (t.selected.indexOf(nn) < 0) t.selected.push(nn);
    });
    libs.forEach(function (a) {
      var t = plan[a[0]] && typeof plan[a[0]] === 'object' ? plan[a[0]] : (plan[a[0]] = { selected: [], custom: '', own: [] });
      if (!Array.isArray(t.lib)) t.lib = [];
      if (t.lib.indexOf(a[1]) < 0) t.lib.push(a[1]);
    });
    return moves.length > 0 || libs.length > 0;
  }
  // Walks a tree record: plans, day marks ('part|Name' in lists), notes keyed by 'part|Name',
  // and any other string that is exactly an old key.
  function walk(m, x, depth) {
    if (!x || typeof x !== 'object' || depth > 40) return false;
    var ch = false;
    if (Array.isArray(x)) {
      var seen = {}, out = [], hit = false;
      for (var i = 0; i < x.length; i++) {
        var v = x[i];
        if (typeof v === 'string' && has(m, v)) { v = m[v]; hit = true; }
        else if (v && typeof v === 'object') { if (walk(m, v, depth + 1)) ch = true; }
        if (typeof v === 'string') { if (hit && seen[v]) continue; seen[v] = 1; }
        out.push(v);
      }
      if (hit) { x.length = 0; Array.prototype.push.apply(x, out); ch = true; }
      return ch;
    }
    if (isPlan(x) && fixPlan(m, x)) ch = true;
    // Aspen saves a pick by place: {grade, part, idx}. A moved place moves with it ('6:trunk:0' to '6:bark:10').
    if (!x.own && x.grade != null && typeof x.part === 'string' && typeof x.idx === 'number' && has(m, x.grade + ':' + x.part + ':' + x.idx)) {
      var to = m[x.grade + ':' + x.part + ':' + x.idx].split(':'); x.part = to[1]; x.idx = +to[2]; ch = true;
    }
    Object.keys(x).forEach(function (k) {
      var v = x[k];
      if (typeof v === 'string' && has(m, v)) { x[k] = m[v]; ch = true; }
      else if (v && typeof v === 'object' && walk(m, v, depth + 1)) ch = true;
      if (has(m, k)) { var nk = m[k]; if (x[nk] == null) x[nk] = x[k]; delete x[k]; ch = true; }
    });
    return ch;
  }
  function fix(tree, rec) { var m = MAP[tree]; return !!(m && rec && typeof rec === 'object' && walk(m, rec, 0)); }
  function fixVault(v) {
    var ch = false; if (!v || typeof v !== 'object') return false;
    Object.keys(MAP).forEach(function (t) { if (v[t] && typeof v[t] === 'object' && fix(t, v[t])) ch = true; });
    return ch;
  }
  window.GGPracticeAlias = { MAP: MAP, key: key, fix: fix, fixVault: fixVault };
})();
