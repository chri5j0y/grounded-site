/* =====================================================================
   THE GROVE . TOGETHER (Rebrand Session 5)
   Family practices: things a household does together. Edit words here,
   not in app.js. About 5 per part to start; add as many as you like.
   Suggestions only, never a limit.

   Each practice: id (never change it once live), part, strand (Leaves
   only: move, rest, or nourish), name, text (what to do), kid (the same
   idea in words for little ones), steps ("step|step|step").

   FEATURED: one practice for each of the twelve weekly themes, in order.
   The Grove shows the featured one for the family's week up top.
   ===================================================================== */
window.GROVE_TOGETHER = (function () {
const P = [
// ---------- Roots (What grounds you) ----------
{ id:"gratitude-round", part:"roots", name:"Gratitude Round",
  text:"At dinner or bedtime, everyone names one thing they're thankful for today.",
  kid:"Everyone says one thing they're thankful for.",
  steps:"Pick a time you're already together, like dinner or bedtime.|Go around once. Each person names one thing from today.|Small counts: a warm sock, a funny moment, a good sandwich.|No one has to explain. Just listen." },
{ id:"quiet-minute", part:"roots", name:"One Quiet Minute",
  text:"Set a timer and sit in silence together for one minute. Then each person shares one sound they heard.",
  kid:"Be very quiet for one minute, then share a sound you heard.",
  steps:"Sit together and set a timer for one minute.|Close your eyes or look at the floor.|Listen for every sound you can.|When the timer ends, each person shares one sound." },
{ id:"bedtime-blessing", part:"roots", name:"Bedtime Blessing",
  text:"Say a short blessing or kind wish over each person before sleep, in whatever words fit your family.",
  kid:"Say a kind wish for each person at bedtime.",
  steps:"Choose words that fit your family: a prayer, a wish, or \"I'm glad you're mine.\"|Say it to each person by name.|Keep it short so it lasts for years." },
{ id:"family-awe-walk", part:"roots", name:"Family Awe Walk",
  text:"Walk together and each find one thing that makes you say wow.",
  kid:"Go for a walk and find something that makes you say wow.",
  steps:"Head out with phones in pockets.|Everyone looks for something amazing: sky, bugs, light, clouds.|When someone finds one, everyone stops to look.|Share your favorite on the way home." },
{ id:"family-spot", part:"roots", name:"A Family Spot",
  text:"Choose one place, inside or out, that's your family's calm spot, and spend five minutes there together.",
  kid:"Pick a calm spot for your family and sit there together.",
  steps:"Choose the spot together: a porch step, a blanket, a corner by a window.|Go there for five quiet minutes.|Come back to it when things feel loud." },

// ---------- Trunk (Purpose) ----------
{ id:"make-together", part:"trunk", name:"Make Something Together",
  text:"Build, bake, draw, or plant one thing together, start to finish.",
  kid:"Make something with your family from start to finish.",
  steps:"Pick something small enough to finish today.|Give everyone a job.|Finish it, even if it's messy.|Put it somewhere everyone can see it." },
{ id:"family-words", part:"trunk", name:"Our Family Words",
  text:"Choose three words for what your family stands for, and put them where everyone sees them.",
  kid:"Pick three words that tell what your family is about.",
  steps:"Everyone suggests words: kind, brave, honest, fun, faithful, curious.|Talk about why each one matters.|Choose three together.|Write them big and hang them up." },
{ id:"help-someone", part:"trunk", name:"Help Someone Together",
  text:"Do one kind thing for a neighbor, friend, or stranger as a family.",
  kid:"Do something kind for someone, together.",
  steps:"Think of someone who could use a hand.|Choose one thing: a meal, a card, raking leaves, a visit.|Do it together.|Talk afterward about how it felt." },
{ id:"dream-out-loud", part:"trunk", name:"Dream Out Loud",
  text:"Each person shares one thing they hope to do or become, big or small.",
  kid:"Tell your family something you hope to do someday.",
  steps:"Ask: \"What's one thing you hope to do someday?\"|Let every answer be welcome, from astronaut to a new bike trick.|Ask one curious question about each dream." },
{ id:"job-that-matters", part:"trunk", name:"A Job That Matters",
  text:"Pick a household job to do together, and talk about who it helps.",
  kid:"Do a home job together and talk about who it helps.",
  steps:"Choose a job: dishes, laundry, the yard.|Do it side by side.|Name who it helps, even if it's \"all of us.\"" },

// ---------- Bark (Mind and feelings) ----------
{ id:"feelings-weather", part:"bark", name:"Feelings Weather Report",
  text:"Everyone names their inside weather today: sunny, cloudy, rainy, or stormy. No fixing, just listening.",
  kid:"Say your inside weather: sunny, cloudy, rainy, or stormy.",
  steps:"Go around once. Each person names their weather.|If someone says rainy or stormy, just say \"Thanks for telling us.\"|No fixing and no advice unless they ask." },
{ id:"breathe-together", part:"bark", name:"Breathe Together",
  text:"Five slow breaths together, in through the nose and out like blowing on soup.",
  kid:"Take five slow breaths together, like blowing on hot soup.",
  steps:"Sit or stand together.|Breathe in through your nose for a count of four.|Breathe out slowly, like cooling hot soup.|Do it five times." },
{ id:"worry-jar", part:"bark", name:"Worry Jar",
  text:"Write or draw worries, put them in a jar, and talk about one together.",
  kid:"Draw a worry, put it in the jar, and talk about it.",
  steps:"Find a jar or box.|Everyone writes or draws a worry and drops it in.|Pull one out and talk about it together.|Close the lid. The rest can wait." },
{ id:"family-reset", part:"bark", name:"Family Reset",
  text:"When things get loud, everyone pauses, takes three breaths, and starts again. No blame.",
  kid:"When it gets loud, stop, breathe three times, and start again.",
  steps:"Agree on a reset word together, like \"pause.\"|When anyone says it, everyone stops.|Three slow breaths.|Start again, kinder." },
{ id:"unplugged-hour", part:"bark", name:"Unplugged Hour",
  text:"One hour with every screen put away, together.",
  kid:"Put all screens away for one hour and do something together.",
  steps:"Pick the hour.|Put every screen in one basket, grown-ups too.|Do anything together: read, play, cook, talk.|Notice how the hour felt." },

// ---------- Branches (Relationships) ----------
{ id:"phones-down-dinner", part:"branches", name:"Phones-Down Dinner",
  text:"Eat one meal together with phones in another room.",
  kid:"Eat together with no phones at the table.",
  steps:"Choose the meal.|Phones go in another room, grown-ups too.|Ask one good question, like \"What made you laugh today?\"" },
{ id:"rose-and-thorn", part:"branches", name:"Rose and Thorn",
  text:"Each person shares the best part (rose) and the hardest part (thorn) of their day.",
  kid:"Tell the best and hardest part of your day.",
  steps:"Go around once.|Each person shares a rose and a thorn.|Listen without fixing.|Thank each person for sharing." },
{ id:"reach-out-together", part:"branches", name:"Reach Out Together",
  text:"Call, text, or write to someone your family misses.",
  kid:"Call or draw a card for someone your family misses.",
  steps:"Name someone you haven't seen in a while.|Choose how to reach them: a call, a video, a card.|Everyone adds something.|Send it today." },
{ id:"game-night", part:"branches", name:"Game Night",
  text:"Play one game together, and let the youngest pick.",
  kid:"Play a game together. The youngest picks!",
  steps:"The youngest picks the game.|Everyone plays, grown-ups included.|Laugh at the mistakes, especially your own." },
{ id:"thank-you-notes", part:"branches", name:"Thank-You Notes",
  text:"Each person writes or draws a thank-you for someone in the family.",
  kid:"Draw a thank-you for someone in your family.",
  steps:"Everyone draws a name.|Write or draw a thank-you for that person.|Hide it where they'll find it, or hand it over." },

// ---------- Leaves (Body) ----------
{ id:"family-walk", part:"leaves", strand:"move", name:"Family Walk",
  text:"Walk together for fifteen minutes, at a pace that works for the slowest walker.",
  kid:"Go for a walk together.",
  steps:"Head out together for fifteen minutes.|Let the slowest walker set the pace.|Count something along the way: dogs, red cars, birds." },
{ id:"kitchen-dance", part:"leaves", strand:"move", name:"Kitchen Dance Party",
  text:"One song, everyone dances.",
  kid:"Dance to one song with your family!",
  steps:"Someone picks a song.|Everyone dances, any way at all.|Take turns picking next time." },
{ id:"early-night", part:"leaves", strand:"rest", name:"Early Night",
  text:"Everyone winds down together thirty minutes earlier, with lights low.",
  kid:"Get cozy and go to bed a little early.",
  steps:"Pick a night this week.|Lights low and screens off thirty minutes earlier than usual.|Read, talk quietly, or just rest." },
{ id:"cook-together", part:"leaves", strand:"nourish", name:"Cook Together",
  text:"Make a meal together, and give everyone a job.",
  kid:"Help make a meal. Everyone gets a job!",
  steps:"Choose something simple.|Give every person a job: wash, stir, set the table.|Eat it together and thank the cooks, which is everyone." },
{ id:"stretch-together", part:"leaves", strand:"move", name:"Stretch Together",
  text:"Five minutes of easy stretching together, morning or night.",
  kid:"Stretch like a cat, a tree, and a star.",
  steps:"Reach up tall like a tree.|Fold over slowly like a rag doll.|Stretch out wide like a star.|Finish with three slow breaths." },

// ---------- Fruit (Hope) ----------
{ id:"look-forward", part:"fruit", name:"Something to Look Forward To",
  text:"Plan one small thing to look forward to this week, together.",
  kid:"Plan something fun to look forward to.",
  steps:"Everyone suggests one small thing: a picnic, a board game, pancakes.|Choose one together.|Put it on the calendar where everyone can see it." },
{ id:"good-news-round", part:"fruit", name:"Good News Round",
  text:"Each person shares one good thing that happened this week.",
  kid:"Tell one good thing that happened this week.",
  steps:"Go around once.|Each person shares one good thing.|Cheer for each one." },
{ id:"secret-kindness", part:"fruit", name:"Secret Kindness",
  text:"Each person does one secret kind thing for someone in the family.",
  kid:"Do a secret kind thing for someone in your family.",
  steps:"Everyone picks someone.|Do one kind thing without telling: make their bed, leave a note, pick them a flower.|At the end of the week, guess who did what." },
{ id:"remember-together", part:"fruit", name:"Remember Together",
  text:"Look at old photos and tell the story of a good day.",
  kid:"Look at old pictures and tell a happy story.",
  steps:"Pull out photos, on paper or on a screen.|Pick one good day.|Each person adds what they remember.|Notice what you're still carrying with you." },
{ id:"plant-a-seed", part:"fruit", name:"Plant a Seed",
  text:"Plant a seed, bulb, or tree together, and check on it.",
  kid:"Plant a seed together and watch it grow.",
  steps:"Choose a seed, a bulb, or a small plant.|Plant it together.|Check on it each week. Growth takes time." }
];
// One per weekly theme, in order: 1 Start where you are ... 12 Holding on and letting go.
/* LIFE start: ways everyone can join (GWG BLD 756). id: [life tags, adapt line]. "Show Ways Everyone Can Join First"
   puts gentle and seated ways first, with their adapt line. Generated by worker A. */
const LIFE_T = {"gratitude-round": [["gentle"], "Anyone can share by voice, by sign, by pointing, or by drawing."], "quiet-minute": [["autism", "gentle"], "Seated or lying down. Anyone can feel for a vibration instead of a sound."], "bedtime-blessing": [["gentle"], null], "family-awe-walk": [["moving", "seeing", "gentle"], "Roll, walk slowly, or sit by a window together and look and listen for a wow."], "family-spot": [["moving", "gentle"], "Choose a spot everyone can reach and sit in."], "make-together": [["moving"], "Give everyone a part they can do seated: sorting, painting, or choosing colors."], "dream-out-loud": [["gentle"], null], "job-that-matters": [["moving"], "Choose jobs every body can do: folding, sorting, or watering from a chair."], "feelings-weather": [["hearing", "autism", "gentle"], "Point to a weather picture, or show it in sign."], "breathe-together": [["gentle"], "Seated or lying down works fully."], "worry-jar": [["gentle"], "Draw it or say it if writing is hard."], "phones-down-dinner": [["hearing"], "Good light helps everyone see faces and hands."], "rose-and-thorn": [["gentle"], null], "game-night": [["moving", "seeing", "hearing"], "Pick games everyone can play: large print cards, seated games, or games with pictures."], "thank-you-notes": [["learning", "moving"], "Draw it, say it, or record it instead of writing."], "family-walk": [["moving", "gentle"], "Go at the pace of the slowest walker or roller, on smooth paths."], "kitchen-dance": [["moving", "hearing", "gentle"], "Dance seated with arms and shoulders, and turn the bass up so everyone feels the beat."], "early-night": [["gentle"], null], "cook-together": [["moving"], "Give seated jobs: stirring, tearing lettuce, and tasting."], "stretch-together": [["moving", "gentle"], "Stretch seated or lying down together."], "look-forward": [["gentle"], null], "good-news-round": [["gentle"], null], "remember-together": [["memory", "gentle"], "Old photos and familiar songs help everyone join in."], "plant-a-seed": [["moving"], "Pots on a table work for every height and every chair."]};
P.forEach(p => { const b = LIFE_T[p.id]; if (b) { p.life = b[0].slice(); if (b[1]) p.adapt = b[1]; } });
/* LIFE end */
const FEATURED = ["gratitude-round", "early-night", "family-walk", "family-reset", "feelings-weather", "reach-out-together",
  "quiet-minute", "phones-down-dinner", "family-words", "rose-and-thorn", "look-forward", "remember-together"];
const THEMES = ["Start where you are", "Rest and limits", "The body knows", "When you miss a day", "What you carry", "Reach toward people",
  "Spirit, any way you come", "Practices that hold", "You get a say", "Love between us", "Hope that shows up", "Holding on and letting go"];
return { practices: P, featured: FEATURED, themes: THEMES };
})();
