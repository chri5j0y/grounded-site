/* =====================================================================
   HEARTWOOD . WHEN LIFE CHANGES (DRAFT, NOT LIVE)
   Guides for grown-ups talking with high schoolers, grades 9 to 12.
   Nothing on the site loads or links to this file yet. It waits here
   until Heartwood launches. When it does, Heartwood loads this file
   the same way Sapling loads sapling/guides.js, and the site-wide
   search on the Tools page adds it (one line in search.js).

   Same shape as Sapling: quick, talk, say, avoid, help, sources.
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

const GROUPS = [
  ["Home and family", [["blowup","In the middle of a blowup"]]]
];
window.HEARTWOOD_GUIDES = {groups: GROUPS.map(([name, list]) => ({name, topics: list.map(([id, title]) => Object.assign({id, title}, T[id] || {}))}))};
})();
