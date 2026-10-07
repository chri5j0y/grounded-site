/* =====================================================================
   THE GROUNDED MARRIAGE: Your Tree, Then Your Grove (marriage/together.js)   GWG BLD 755, October 2026
   Each partner plants their own Tree (Birch 18 to 26, Oak 25 to 60), then the two of them plant a Grove
   together, with family practices in a Plain and a Faith version.
   Shape: window.GM_TOGETHER = {title, lead, steps: [{id, title, text, link, links?}],
     practices: [{id, title, when, plain, faith, time, faithBy?}], sources: ['id', ...]}.
   link is '' when a step has no single link; links (optional) lists more than one.
   faithBy (optional) holds the Faith line by group in marriage/faith.js (christian, faiths, open, land);
   use it when both partners' backgrounds share that group, otherwise use faith. The paths and none
   groups use the Plain version.
   Sources are ids in shared/gg-sources.js.
   Generated from data by P/C/gen.py (BLD 755); edit the data, not this file.
   ===================================================================== */
window.GM_TOGETHER = {
 "title": "Your Tree, Then Your Grove",
 "lead": "A strong marriage grows from two people who each keep growing. Each of you plants your own Tree in Grounded and tends it in your own way. Then the two of you plant a Grove together, with a few family practices that make your home feel like yours. Pick the Faith or Plain version of each practice, built to your faith, and keep the ones that fit.",
 "steps": [
  {
   "id": "tree-plant",
   "title": "Each of You Plants a Tree",
   "text": "Each partner opens their own Tree: Birch for ages 18 to 26, or Oak for ages 25 to 60. Six parts make you whole, and your Tree helps you tend them all with check-ins, practices, and a growth plan. Your Tree stays on your own device, and you share only what you choose.",
   "link": "",
   "links": [
    {
     "label": "Birch (18 to 26)",
     "href": "/birch/"
    },
    {
     "label": "Oak (25 to 60)",
     "href": "/oak/"
    }
   ]
  },
  {
   "id": "tree-tend",
   "title": "Tend Your Own Roots",
   "text": "Take a check-in on your own Tree once a week. Then bring your partner one thing you learned about how you are growing. Knowing yourself well is one of the best gifts you bring to a marriage.",
   "link": ""
  },
  {
   "id": "grove-plant",
   "title": "Plant Your Grove Together",
   "text": "Open The Grove together, where your two trees stand side by side. It has a family wall to cheer each other on and practices to do together. As your family grows, your Grove grows with it.",
   "link": "/grove/"
  },
  {
   "id": "grove-choose",
   "title": "Choose Your Family Practices",
   "text": "Read the practices below and choose two or three to begin. Each has a Plain version and a Faith version. Choose the one that fits your home, or each keep your own when your backgrounds differ.",
   "link": ""
  },
  {
   "id": "grove-tend",
   "title": "Tend Your Grove Season by Season",
   "text": "At your Monthly Check-in for Two, look at your practices together. Keep what brings you close, rest what has gone stale, and try something new each season.",
   "link": ""
  }
 ],
 "practices": [
  {
   "id": "fam-pause",
   "title": "A Quiet Moment Together",
   "when": "Every evening",
   "time": "5 minutes",
   "plain": "Sit together at the end of the day. Share one minute of quiet, then each name one thing you are grateful for and one hope for tomorrow.",
   "faith": "If prayer is part of your home, pray for each other by name, in your own words or a prayer your tradition knows by heart.",
   "faithBy": {
    "christian": "If prayer is part of your home, hold hands and pray for each other by name, or say the Lord's Prayer together.",
    "faiths": "If prayer is part of your home, close the day with a prayer or blessing from your own tradition, in the words your family knows.",
    "open": "Close by naming one value you hope your home lived by today, and one you hope to live by tomorrow.",
    "land": "If it fits your ways, step outside for a few breaths and give thanks for the day, the land, and each other."
   }
  },
  {
   "id": "fam-still",
   "title": "Sitting in Stillness",
   "when": "A few mornings a week",
   "time": "10 minutes",
   "plain": "Sit side by side and breathe slowly. Let thoughts come and go without following them. Ring a soft bell or timer to begin and to end.",
   "faith": "If your tradition has a practice of silent prayer or meditation, sit with it together: a sacred word, a short verse, or simply resting in quiet.",
   "faithBy": {
    "christian": "If it fits your faith, sit in silent prayer together: rest with one short verse or a single word, such as peace or grace, and let it settle.",
    "faiths": "If your tradition keeps a practice of meditation, silent prayer, or remembrance, sit with it together in the way you were taught."
   }
  },
  {
   "id": "fam-walk",
   "title": "The Evening Walk",
   "when": "Once a week",
   "time": "30 minutes",
   "plain": "Walk together with phones put away. Let the first few minutes be quiet, then share the best part of your week and one thing on your mind.",
   "faith": "If it fits your faith, let the walk become a prayer: give thanks for what you see as you go."
  },
  {
   "id": "fam-table",
   "title": "The Shared Table",
   "when": "Once a week",
   "time": "One meal",
   "plain": "Choose one meal each week with screens put away. Cook together if you can, light a candle, and each share a high point and a hard point from the week.",
   "faith": "If blessing a meal is part of your home, begin with grace or a blessing from your tradition.",
   "faithBy": {
    "christian": "If saying grace is part of your home, begin by giving thanks together, in your own words or a grace your family knows.",
    "faiths": "If blessing a meal is part of your home, begin with the blessing your tradition says over food, and let the meal keep any customs your family loves.",
    "land": "If it fits your ways, begin by giving thanks for the food, the land it came from, and the hands that brought it."
   }
  },
  {
   "id": "fam-rest",
   "title": "A Day of Rest",
   "when": "Once a week",
   "time": "Half a day or more",
   "plain": "Set aside part of one day each week for rest: no chores, no work email, and plans that refill you both. Decide ahead what rest looks like for each of you.",
   "faith": "If your faith keeps a holy day, keep it together as your tradition keeps it: worship, rest, and time for each other.",
   "faithBy": {
    "christian": "If your church keeps a Sabbath or the Lord's Day, keep it together the way your church keeps it: worship, rest, and a slow meal.",
    "faiths": "If your tradition keeps a holy day or a day of rest, plan your week around it together, the way your family keeps it."
   }
  },
  {
   "id": "fam-camp",
   "title": "A Night Under the Sky",
   "when": "Once a season",
   "time": "One night",
   "plain": "Camp at a park, by a lake, or in your own backyard. Cook over a fire or a camp stove, look at the stars, and talk about where you hope to be a year from now.",
   "faith": "If it fits your faith, close the night by giving thanks for creation and for the life you are building."
  },
  {
   "id": "fam-serve",
   "title": "Serving Side by Side",
   "when": "Once a month",
   "time": "Two hours",
   "plain": "Choose one way to help others together: a food shelf, a neighbor's yard, a meal for a new parent. Talk on the way home about what you saw and felt.",
   "faith": "If you belong to a faith community, serve together through it, and let your service be part of how you practice your faith."
  },
  {
   "id": "fam-read",
   "title": "Reading Aloud",
   "when": "Once a week",
   "time": "15 minutes",
   "plain": "Take turns reading a few pages aloud from a book you both enjoy, a poem, or a story. Stop to talk about any line that stays with you.",
   "faith": "If sacred reading is part of your home, read a short passage from your tradition's scripture together and share one line that speaks to you.",
   "faithBy": {
    "christian": "If reading scripture is part of your home, read a short passage together, slowly, and each share one line that speaks to you.",
    "faiths": "If sacred reading is part of your home, read a short passage from your tradition's texts together, in the translation your family uses.",
    "open": "Read a poem or reading you choose together, and talk about the value it calls you toward."
   }
  },
  {
   "id": "fam-gather",
   "title": "Gathering Your People",
   "when": "Once a month",
   "time": "One evening",
   "plain": "Invite family or friends for a simple meal or game night. A home that opens its door builds the circle of support every marriage needs.",
   "faith": "If you belong to a faith community, gather with them too, at worship or around a shared table."
  },
  {
   "id": "fam-seasons",
   "title": "Marking the Seasons",
   "when": "Through the year",
   "time": "As it comes",
   "plain": "Choose a small ritual for the days that matter to you: the first snow, your anniversary, a birthday breakfast. Write them on your calendar so they become yours.",
   "faith": "If your faith keeps holy days and seasons, choose how you will keep them in your home, and add one new family custom of your own.",
   "faithBy": {
    "christian": "If your church keeps seasons such as Advent, Lent, and Easter, choose how you will keep them at home, and add one new family custom of your own.",
    "faiths": "Choose how you will keep your tradition's holy days and seasons in your home, and add one new family custom of your own.",
    "land": "If it fits your ways, mark the turning seasons with the ceremonies and gatherings your families keep, as your elders guide you."
   }
  },
  {
   "id": "fam-send",
   "title": "Words for the Day",
   "when": "Every morning",
   "time": "1 minute",
   "plain": "Before you part in the morning, say one kind wish for your partner's day and mean it: I hope your meeting goes well, I will be thinking of you.",
   "faith": "If blessing is part of your home, send each other out with a short blessing or prayer for the day ahead."
  }
 ],
 "sources": [
  "fiese02",
  "mahoney10"
 ]
};
