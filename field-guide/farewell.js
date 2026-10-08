// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Farewell Planning Session (GWG BLD 766).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tool in the Ceremonies tab, built for eye contact: short Say
// prompts, big tap chips and checkboxes, quick notes to tidy later, a Family View in
// its own window to share on Zoom, Teams, or FaceTime (or tilt the laptop), and a
// Phone Mode with words to read aloud. Nine steps, then printouts, live sessions in
// Start a Session, and a One-Year Follow-Up plan for each family.
// The order of service is the Service Builder's (ceremonies.js): the plan holds the
// service's id, so parts, readings, Bible versions, Faith or Plain, and times stay one source.
// Words: the Staff library's farewellPlanning key, filled from the built-in words
// below wherever a piece is missing, so the tool works before that update is applied.
// Plans live in DATA.fwp.plans: encrypted with the rest of this device's records and
// carried in backups (merged by GGFw.merge). Nothing is sent anywhere.
// GWG BLD 768: the Eulogy Helper and the Obituary Helper run inside Their Story (drafts saved in the plan, printed in the
// Officiant Script, the Family Copy, and the Helpers' Checklist); Readings, Music, and Rituals in The Service; Follow My Scroll.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGFw.init: data(), lib(), tier(), save(), render(), go(), toast(), esc(), icon(), sheet(), ph(), pf()
const S = {on: false, id: null, step: 1, mode: 'chris', other: null, fuOpen: null, qr: null, scan: null, sub: null, eSec: 0, oSec: 0, follow: true,
  lb: {type: 'scripture', q: '', faith: 'all', moment: 'all', tag: '', mine: false, open: null, place: 'best', by: '', more: 0}};
const SITE = 'https://growwithgrounded.com/';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const arr = x => Array.isArray(x) ? x : [];
const toast = m => C.toast ? C.toast(m) : null;
const D = () => (C.data && C.data()) || null;
const isStaff = () => { const t = C.tier && C.tier(); return t === 'staff' || t === 'founder'; };

// ---------- dates ----------
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => isoOf(new Date());
const dOf = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const addDays = (s, n) => { const d = dOf(s); if (!d) return ''; d.setDate(d.getDate() + n); return isoOf(d); };
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const short = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() : (s || ''); };
const tm = t => { const m = /^(\d\d?):(\d\d)/.exec(t || ''); if (!m) return t || ''; let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; };
// A date typed or sent as words ("March 4, 1941") becomes 1941-03-04 when it reads cleanly.
function parseDay(t){
  t = String(t || '').trim(); if (!t) return '';
  if (/^\d{4}-\d\d-\d\d$/.test(t)) return t;
  let m = /^(\d\d?)\/(\d\d?)\/(\d{4})$/.exec(t); if (m) return m[3] + '-' + pad(m[1]) + '-' + pad(m[2]);
  m = /^([A-Za-z]+)\.?\s+(\d\d?),?\s+(\d{4})$/.exec(t);
  if (m){ const i = MON.findIndex(x => x.toLowerCase().startsWith(m[1].toLowerCase().slice(0, 3))); if (i >= 0) return m[3] + '-' + pad(i + 1) + '-' + pad(m[2]); }
  return '';
}

// ---------- the built-in words (the Staff library's farewellPlanning key replaces any piece) ----------
const L2 = (...a) => a.map(([id, t, q]) => q ? {id, t, q} : {id, t});
const DEF = {
  v: 0,
  steps: [
    {id: 'welcome', title: 'Welcome', say: 'Before we start, tell me who is here with us today, and what everyone called [Person].', sub: 'Names first. Take your time here.',
      phoneLines: [['Who is with us', 'I would love to know who is on the call with you today.'], ['Their name', 'What did everyone call them? And how should I say the full name so it sounds right?']],
      lists: {who: {title: 'Who Is Here', sub: 'Tap everyone in the room or on the call.', items: L2(['spouse', 'Spouse'], ['children', 'Children'], ['grandchildren', 'Grandchildren'], ['siblings', 'Siblings'], ['friends', 'Friends'])}}},
    {id: 'story', title: 'Their Story', say: 'Tell me about [Person]. What did they love, and who were they to all of you?', sub: 'Tap a prompt, jot a few words, and keep your eyes on the family.',
      phoneLines: [['What they loved', 'Tell me a few things [Person] loved, big or small.'], ['Who they were', 'Who were they to all of you, and to their friends?'], ['A saying', 'Was there something they always said?'], ['The eulogy', 'I can write the eulogy, you can write it, or we can do it together.']],
      lists: {story: {title: 'Tap a Prompt, Jot a Few Words', items: L2(['loved', 'What They Loved', 'What did [Person] love, big or small?'], ['who', 'Who They Were to People', 'Who was [Person] to all of you, and to their friends?'], ['saying', 'A Saying They Had', 'Was there something [Person] always said?'], ['memory', 'A Favorite Memory', 'Is there one memory you would like people to hear?'], ['work', 'Their Work', 'What did [Person] do with their days and their working life?'], ['values', 'Their Faith or Values', 'What mattered most to [Person]?'])},
        eulogy: {title: 'Who Is Writing the Eulogy?', single: true, items: L2(['chris', 'Chris'], ['family', 'The Family'], ['both', 'Both'])}}},
    {id: 'faith', title: 'Faith and Traditions', say: 'Some families want faith at the center, some want it plain, and many want a bit of both. What feels right for [Person]?', sub: 'All faith traditions and everything in-between. The family chooses.',
      phoneLines: [['Faith or plain', 'Some families want faith at the center, some want plain words, and many want a blend. Any of these is right.'], ['Tradition', 'Was there a church or tradition that mattered to [Person]?'], ['Customs', 'Are there customs you would like to honor: a hymn, a candle, a prayer from your family?']],
      lists: {faithway: {title: 'Faith or Plain', single: true, items: L2(['faith', 'Faith'], ['plain', 'Plain'], ['blend', 'A Blend'])},
        tradition: {title: "The Family's Tradition", items: L2(['lutheran', 'Lutheran'], ['catholic', 'Catholic'], ['methodist', 'Methodist'], ['baptist', 'Baptist'], ['nondenominational', 'Nondenominational'], ['jewish', 'Jewish'], ['spiritual', 'Spiritual, No Tradition'])},
        customs: {title: 'Customs to Honor', items: L2(['hymns', 'Hymn Singing'], ['candle', 'Lighting a Candle'], ['memories', 'Sharing Memories Aloud'], ['flowers', 'Flowers on the Casket'], ['silence', 'A Moment of Silence'])}}},
    {id: 'gatherings', title: 'What Gatherings', say: 'Let us talk about when and where everyone will gather. What are you picturing?', sub: 'Tap each one. The details open below.',
      phoneLines: [['The main gathering', 'A funeral, a memorial, or a celebration of life. Which feels most like [Person]?'], ['Before', 'A visitation or wake, or a prayer service the evening before.'], ['At the end', 'A graveside committal, burial or cremation, a scattering of ashes.'], ['After', 'A reception, so people can stay and talk.']], lists: {}},
    {id: 'service', title: 'The Service', say: 'Here is a simple shape for the service. Let us walk through it and change anything that does not feel like [Person].', sub: 'The order of service lives in the Service Builder, so it stays one plan.',
      phoneLines: [['The shape', 'I will read the parts of the service in order. Stop me anywhere.'], ['Readings', 'Is there a reading [Person] loved, or one you would like?'], ['Length', 'As we have it, the service runs about [Minutes] minutes.'], ['Honors', 'If [Person] served, military honors can be part of the day.']],
      lists: {honors: {title: 'Honors', items: L2(['military', 'Military Honors'], ['flag', 'Flag Folding'], ['taps', 'Taps'], ['fraternal', 'Fraternal or Service Group'])}}},
    {id: 'arrangements', title: 'Arrangements', say: 'Here is the list of things that need a person. Who would like to take each one?', sub: 'Tap who handles each one. Each helper gets their own short list.',
      phoneLines: [['Who does what', 'I will read a short list. Just tell me who would like to take each one: the family, the funeral home, the church, or me.'], ['Rehearsal', 'Let us pick a time for a short rehearsal, usually the day before.']], lists: {}},
    {id: 'review', title: 'Review Together', say: 'Let us look at the whole plan together. Tell me if anything feels off.', sub: '',
      phoneLines: [['Reading it back', 'I will read the plan back to you slowly. Stop me anywhere.'], ['Next steps', 'I will send your copy by email, and it can be printed.']], lists: {}},
    {id: 'outputs', title: "What You'll Get", say: 'When we are done, here is what you will have in hand, and what I will carry for you on the day.', sub: '',
      phoneLines: [['What you will have', 'An order of service, a rehearsal plan, the graveside words, a copy for the family, and a short list for each helper.'], ['On the day', 'I will have the whole service in front of me, so you will not need to keep track of anything.']], lists: {}},
    {id: 'followup', title: 'One-Year Follow-Up', say: 'I will stay in touch through the year. Would it be all right if I check in by email and phone now and then?', sub: '',
      phoneLines: [['Staying in touch', 'I will check in a few days after, at two weeks, a month, three months, six months, at the holidays, on the birthday, and at one year.'], ['If it gets heavy', 'If anyone is ever in crisis, call or text 988, any time.']], lists: {}}
  ],
  checklist: [{id: 'funeral_home', t: 'Funeral home contact', who: 'Family'}, {id: 'obituary', t: 'Obituary to the paper', who: 'Family'}, {id: 'programs', t: 'Programs printed', who: 'Funeral Home'}, {id: 'music_files', t: 'Music files to the funeral home', who: 'Family'}, {id: 'readers', t: 'Readers confirmed', who: 'Chris'}, {id: 'ushers', t: 'Ushers', who: 'Church'}, {id: 'pallbearers', t: 'Pallbearers', who: 'Family'}, {id: 'flowers', t: 'Flowers', who: 'Family'}, {id: 'photos', t: 'Photo board', who: 'Family'}, {id: 'livestream', t: 'Livestream', who: 'Church'}, {id: 'reception_food', t: 'Reception food', who: 'Church'}, {id: 'rehearsal', t: 'Rehearsal date', who: 'Chris'}],
  whoTags: ['Funeral Home', 'Family', 'Chris', 'Church', 'Cemetery'],
  gatheringTypes: [{id: 'funeral', t: 'Funeral', main: true}, {id: 'memorial', t: 'Memorial', main: true}, {id: 'celebration', t: 'Celebration of Life', main: true, script: 'celebration'}, {id: 'visitation', t: 'Visitation or Wake', script: 'visitation'}, {id: 'prayer', t: 'Prayer Service', script: 'prayer'}, {id: 'graveside', t: 'Graveside Committal', script: 'committal'}, {id: 'burial', t: 'Burial'}, {id: 'cremation', t: 'Cremation'}, {id: 'scattering', t: 'Scattering of Ashes', script: 'scattering'}, {id: 'reception', t: 'Reception', script: 'reception'}],
  outputs: [
    {id: 'order', title: 'Order of Service and Officiant Script', lead: 'Every part in order with the words to say, who speaks, and the timing. Faith or plain wording, as the family chose.'},
    {id: 'rehearsal', title: 'Rehearsal Plan', lead: 'Who stands where, when each person moves, the cues, and the timing, on one page.'},
    {id: 'committal', title: 'Graveside Committal Script', lead: 'Short words for the graveside, faith or plain, with any honors placed in.'},
    {id: 'family', title: 'Family Copy', lead: 'A calm, plain copy of the whole plan for the family to keep, by email or print.'},
    {id: 'helpers', title: "Helpers' Checklist", lead: "Each person's part on their own short list."},
    {id: 'other', title: 'Other Gatherings Plans', lead: 'A simple plan for each other gathering: timing, who greets, and what happens when.'}],
  scripts: {
    committalFaith: [{h: 'Gathering', t: 'We gather here to lay [Person] to rest, and to give thanks for a life that touched every one of us.'}, {h: 'Scripture', t: 'Jesus said, "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live." (John 11:25)'}, {h: 'Committal', t: 'Into God\'s keeping we commend [Full], and we commit this body to the ground: earth to earth, ashes to ashes, dust to dust, in sure and certain hope.'}, {h: 'Prayer', t: 'Gracious God, hold this family in your peace. Be near them in the days ahead. Amen.'}, {h: 'Blessing', t: 'Go in peace, and carry [Person] with you in the love you shared.'}],
    committalPlain: [{h: 'Gathering', t: 'We gather here for our last goodbye to [Person], and to give thanks for a life that touched every one of us.'}, {h: 'Words of Return', t: 'We return [Full] to the earth with love. What [Person] gave us stays with us: in our stories, our habits, and the way we love one another.'}, {h: 'A Moment of Quiet', t: 'Let us take a quiet moment together, each of us holding [Person] in our own way.'}, {h: 'Sending', t: 'Go gently. Hold one another close in the days ahead.'}],
    sources: {committalFaith: 'Adapted from The Book of Common Prayer (1979), public domain. Scripture: John 11:25, King James Version (public domain).'},
    closingWords: {faith: 'Go now in peace. May the God of all comfort hold you, today and in the days to come.', plain: 'Go now in peace. Carry [Person] with you in the love you shared, and hold one another close.'},
    rehearsal: [{h: 'Welcome and Walk-Through', t: 'Thank everyone for coming. Walk the room once, front to back, so everyone sees where they will be.', min: 5}, {h: 'Who Stands Where', t: 'Readers sit near the aisle in the front row. Speakers come to the lectern in order. Pallbearers gather at the back with the funeral director.', min: 5}, {h: 'Cues', t: 'Each speaker stands when the person before them sits. A nod from the officiant starts the music.', min: 5}, {h: 'Practice the Hard Parts', t: 'Readers read their first lines aloud at the lectern. Speakers practice walking up and back.', min: 10}, {h: 'Questions and a Breath', t: 'Answer questions, then close with a quiet moment together.', min: 5}],
    visitation: {title: 'Visitation or Wake', lead: 'A time for people to come, share a word with the family, and say goodbye.', blocks: [{h: 'Before Doors Open', t: 'The family gathers a few minutes early for a quiet moment together.', min: 15, who: 'Funeral Home'}, {h: 'Greeting', t: 'Family members greet guests near the entrance. A guest book sits nearby.', min: 60, who: 'Family'}, {h: 'Words of Comfort', faith: 'A short prayer and a reading, then a moment of silence.', plain: 'A few words of remembrance and a moment of silence.', min: 10, who: 'Chris'}, {h: 'Closing', t: 'Thank everyone and share the details for the service.', min: 5, who: 'Chris'}]},
    prayer: {title: 'Prayer Service', lead: 'A short service of prayer and readings the evening before.', blocks: [{h: 'Welcome', t: 'A few words of welcome and why we gather.', min: 3, who: 'Chris'}, {h: 'Reading', t: 'A reading the family chooses.', min: 5, who: 'Family'}, {h: 'Prayers', faith: 'Prayers for [Person] and for the family.', plain: 'Words of comfort and remembrance.', min: 10, who: 'Chris'}, {h: 'Blessing', t: 'A closing blessing.', min: 2, who: 'Chris'}]},
    scattering: {title: 'Scattering of Ashes', lead: 'A small, quiet gathering in a place that mattered to [Person].', blocks: [{h: 'Gathering', t: 'Everyone gathers in a circle at the place.', min: 5, who: 'Family'}, {h: 'Words', faith: 'A short reading and a prayer of thanks.', plain: 'A few words about why this place mattered to [Person].', min: 5, who: 'Chris'}, {h: 'Scattering', t: 'Family members scatter the ashes in turn, in silence or with a word each.', min: 10, who: 'Family'}, {h: 'Closing', t: 'A closing word and a moment of quiet.', min: 3, who: 'Chris'}]},
    celebration: {title: 'Celebration of Life', lead: 'A gathering full of stories, music, and the things [Person] loved.', blocks: [{h: 'Welcome', t: 'Welcome everyone and set a warm tone.', min: 5, who: 'Chris'}, {h: 'Stories', t: 'Family and friends share stories.', min: 20, who: 'Family'}, {h: 'Music', t: 'A song [Person] loved.', min: 5, who: 'Family'}, {h: 'Closing Words', t: 'A closing word and a toast or a moment together.', min: 5, who: 'Chris'}]},
    reception: {title: 'Reception', lead: 'Time to stay, eat together, and talk.', blocks: [{h: 'Setting Up', t: 'Tables, food, and the photo board ready before guests arrive.', min: 30, who: 'Church'}, {h: 'Blessing the Meal', faith: 'A short table prayer.', plain: 'A word of thanks for the food and the people.', min: 2, who: 'Chris'}, {h: 'Time Together', t: 'Guests share food and stories.', min: 60, who: 'Family'}]}
  },
  followUp: [
    {id: 'days', title: 'A Few Days After', offsetDays: 3, email: {subject: 'Thinking of you', body: 'Dear [Name],\n\nI have been thinking of you since the service. It was so full of [Person]. You do not need to write back. I am here whenever you would like to talk.\n\nWith you,\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I am just calling to see how you are doing.', questions: ['How has the house felt this week?', 'Are you getting some sleep and a meal or two?', 'Who has been around with you?'], listenFor: 'Being alone most of the day, skipping meals, feeling buried in paperwork.', moreSupport: 'If the days feel too heavy to get through, or no one is checking in.'}, resource: ''},
    {id: 'twoweeks', title: 'About Two Weeks', offsetDays: 14, email: {subject: 'Checking in', body: 'Dear [Name],\n\nTwo weeks can feel like a long time and no time at all. I am thinking of you and your family.\n\nWarmly,\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I wanted to check in now that the house is quieter.', questions: ['What has the quiet been like?', 'What is one thing that has helped, even a little?'], listenFor: 'Guilt, second-guessing the last weeks, trouble with daily routines.', moreSupport: 'If sleep or eating has not returned at all, or worry is growing.'}, resource: 'When Life Changes: Grief'},
    {id: 'month', title: 'One Month', offsetDays: 30, email: {subject: 'A month', body: 'Dear [Name],\n\nIt has been a month since we said goodbye to [Person]. They are still on my mind, and so are you.\n\nWarmly,\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. A month already. How are you, really?', questions: ['What are the evenings like now?', 'Has anything made you smile lately?'], listenFor: 'Pulling away from friends, not leaving the house.', moreSupport: 'If they say they feel stuck or hopeless, or the family is worried.'}, resource: 'The Willow app'},
    {id: 'three', title: 'Three Months', offsetDays: 91, email: {subject: 'Thinking of you', body: 'Dear [Name],\n\nThree months is often when people stop calling, and the missing gets louder. I have not forgotten. I would love to hear how you are doing.\n\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I have been thinking about you and [Person] this week.', questions: ['Who do you talk to most these days?', 'What has been hardest lately?'], listenFor: 'Loneliness, losing interest in things they loved.', moreSupport: 'If grief seems to be growing rather than softening.'}, resource: 'When Life Changes: Grief'},
    {id: 'six', title: 'Six Months', offsetDays: 182, email: {subject: 'Half a year', body: 'Dear [Name],\n\nHalf a year. I am still here, any time you would like to talk.\n\nWith you,\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I wanted to hear how you are doing.', questions: ['What has been different lately?', 'Is there a day coming up that you are dreading?'], listenFor: 'Signs of new routines, or signs of feeling frozen in place.', moreSupport: 'If daily life still feels unmanageable.'}, resource: ''},
    {id: 'holidays', title: 'First Holidays', anchor: 'holidays', email: {subject: 'The holidays', body: 'Dear [Name],\n\nThe first holidays without [Person] will be tender. It is all right to keep their traditions, change them, or skip a few this year. I am thinking of you.\n\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. The holidays are close. How are you feeling about them?', questions: ['What are you planning, or not planning?', 'Is there a way you would like to remember [Person] at the table?'], listenFor: 'Dread, isolation, tension about how to mark the day.', moreSupport: 'If the season feels unbearable.'}, resource: 'When Life Changes: Grief'},
    {id: 'birthday', title: "[Person]'s Birthday", anchor: 'birthday', email: {subject: 'Remembering [Person] today', body: 'Dear [Name],\n\nToday is [Person]\'s birthday. I am remembering them with you.\n\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I know today is [Person]\'s birthday. How are you doing with it?', questions: ['How are you spending the day?', 'What is a birthday of theirs you remember?'], listenFor: 'Whether they have company today.', moreSupport: 'If the day has brought back the hardest feelings and they are staying.'}, resource: ''},
    {id: 'year', title: 'One-Year Anniversary', anchor: 'anniversary', email: {subject: 'One year', body: 'Dear [Name],\n\nA year ago we lost [Person]. I am so grateful I got to know them through all of you. If you would like to mark the day together, I would be glad to be there.\n\nWith love,\n[Chris]'}, call: {open: 'Hi [Name], it is [Chris]. I know what today is. I am thinking of you.', questions: ['How are you marking the day?', 'Looking back on this year, what carried you?'], listenFor: 'Readiness for a remembrance gathering; how the whole family is doing.', moreSupport: 'If the year has not eased at all, a counselor or a support group could help.'}, resource: 'The Willow app'}],
  shareWords: {
    eulogy: 'Here is the Eulogy Helper for [Person]\'s service. It walks you through a few questions at your own pace, and when you are ready it sends what you wrote back to me. Take your time. [Chris]',
    obituary: 'Here is the Obituary Helper for [Person]. It gives you a simple outline and a few gentle questions, so the words come easier. Send it back whenever it feels ready. [Chris]',
    familyStart: 'Here is Planning a Farewell. Fill in whatever you know at your own pace, then tap Send to Your Officiant and send it to me. We will finish the plan together. [Chris]'},
  familyCopyLead: 'Here is the plan we made together. Nothing here is set in stone: tell me anything you would like to change.',
  crisis: 'In a crisis, call or text 988 any time. In an emergency, call 911.'
};

// ---------- the Eulogy Helper and the Obituary Helper, inside the session (GWG BLD 768) ----------
// The same prompts, steps, and drafting rules as eulogy-helper.html and obituary-helper.html, fed by the story notes.
const PRON = {he: {they: 'he', them: 'him', their: 'his', theirs: 'his', themself: 'himself'}, she: {they: 'she', them: 'her', their: 'her', theirs: 'hers', themself: 'herself'}, they: {they: 'they', them: 'them', their: 'their', theirs: 'theirs', themself: 'themself'}};
const EU = {
  secs: [
    {id: 'who', title: 'Who They Were', qs: [
      {id: 'name', l: 'Their name', h: 'The name everyone will hear in the room.', input: 1, ph: 'Grandpa Joe'},
      {id: 'me', l: 'Who is speaking', h: 'One line to open with, so everyone knows who is speaking.', input: 1, ph: 'I am his oldest granddaughter'},
      {id: 'who', l: 'Who they were, in one sentence', h: 'If you had only one sentence. It can be funny, plain, or both.', ph: 'the kind of man who fixed your car and then made you stay for supper'}]},
    {id: 'stories', title: 'Three Stories', sub: 'Small and true is better than big and general. A story that shows who they were does more than a list of good qualities. One honest, human detail helps people recognize them.', qs: [
      {id: 's1', l: 'Story One', h: 'A story that makes you smile or laugh.', rows: 4},
      {id: 's2', l: 'Story Two', h: 'A time they showed up for someone, or a habit everyone knew.', rows: 4},
      {id: 's3', l: 'Story Three', h: 'A moment between the two of you, or something they always said.', rows: 4}]},
    {id: 'gave', title: 'What They Gave Us', qs: [
      {id: 'taught', l: 'What they taught you', h: 'A lesson, a way of doing things, a way of loving people.', ph: 'that you finish what you start, and you always leave room at the table'},
      {id: 'carry', l: 'What we carry forward', h: 'What the people in this room will keep doing because of them.'},
      {id: 'close', l: 'A closing line', h: 'A goodbye, a thank you, a line they loved, or what you want to say to them now.', ph: 'Thank you for everything. We will keep a seat for you.'}]}],
  tips: ['Print it in large type, double spaced, and mark a slash where you want to stop and breathe.', 'Give a copy to someone you trust, and ask them to stand nearby. If you cannot go on, they can read the rest.', 'Keep water and tissues within reach.', 'Read it out loud a few times before the day. The hard lines get a little easier each time.', 'Slow down. A pause feels longer to you than it does to the room.', 'If tears come, stop, breathe, and wait. Everyone there is on your side.', 'At an easy pace, five minutes is about 650 words.']
};
const OB = {
  secs: [
    {id: 'basics', title: 'The Basics', qs: [
      {id: 'name', l: 'Full name', h: 'As the family wants it printed. A nickname in quotes is welcome.', ph: 'First, middle, and last name', input: 1},
      {id: 'first', l: 'The name {they} went by', h: 'Used all through the drafts. Leave it blank to use the first name.', ph: 'The name friends used', input: 1},
      {id: 'age', l: 'Age', h: 'A number is enough.', ph: '82', input: 1},
      {id: 'city', l: 'City where {they} lived', h: 'City only. Leave out the street address.', ph: 'St. Cloud', input: 1},
      {id: 'death', l: 'Date and place of death', h: 'Cause only if the family wants it.', ph: 'October 2, 2026, at home, surrounded by family'},
      {id: 'born', l: 'Born where, and the year', h: 'Start with "in." A year, or a month and year, is safer than the full birth date. Parents\' first names are enough.', ph: 'in Little Falls, Minnesota, in 1944'}]},
    {id: 'life', title: 'Their Life', qs: [
      {id: 'early', l: 'Growing up and school', h: 'Hometown, siblings, school, a childhood story. A sentence or two, in your own words.'},
      {id: 'work', l: 'Work, service, and military', h: 'Jobs, the one {they} loved most, military branch and years. A sentence or two.'},
      {id: 'married', l: 'Marriage and partnership', h: 'Who {they} married, where, and the year. A sentence.'},
      {id: 'loved', l: 'What {they} loved', h: 'Hobbies, places, teams, food, music, sayings. A list is fine.', ph: 'fishing on Mille Lacs, polka music, and Sunday dinners'},
      {id: 'remembered', l: 'What {they} will be remembered for', h: 'The family\'s own words. One honest, warm detail.'},
      {id: 'faith', l: 'Faith community (only if the family wants it)', h: 'A church, synagogue, mosque, temple, or meeting, if they want it named. A sentence, or leave it blank.'}]},
    {id: 'family', title: 'Family', qs: [
      {id: 'survived', l: 'Survived by', h: 'Spouse, children and their spouses, grandchildren, siblings. Partners named as the family wishes.', ph: 'a husband of 52 years; three children and their spouses; seven grandchildren'},
      {id: 'preceded', l: 'Preceded in death by', h: 'Parents, spouse, siblings, children.', ph: 'parents and a brother'}]},
    {id: 'service', title: 'The Service', qs: [
      {id: 'service', l: 'Service details', h: 'Day, date, time, and place; visitation; burial.', ph: 'Saturday, October 10, at 11 a.m. at the funeral home, with visitation one hour before'},
      {id: 'memorials', l: 'Memorials or donations', h: 'A charity, the hospice, or a cause {they} loved.', ph: 'the hospice team that walked with the family'},
      {id: 'thanks', l: 'Thanks', h: 'Hospice team, caregivers, a care home, neighbors.', ph: 'the hospice nurses and the neighbors who brought meals'}]}],
  shapes: [
    {id: 'notice', name: 'Death Notice', words: 80, about: 'Short and factual: the death, the service, and memorials. Newspapers usually charge by length.', outline: ['{Name}, {age}, of {city}, died {death}.', '{First} was born {born}.', '{First} is survived by {survived}.', 'A service will be held {service}.', 'Memorials preferred to {memorials}.']},
    {id: 'newspaper', name: 'Newspaper Obituary', words: 200, about: 'The life in a few short paragraphs, for the paper or the funeral home\'s page.', outline: ['{Name}, {age}, of {city}, died {death}.', '{First} was born {born}. {early}', '{work}', '{married}', '{First} loved {loved}.', '{remembered}', '{First} is survived by {survived}, and was preceded in death by {preceded}.', 'A service will be held {service}.', 'Memorials preferred to {memorials}.', 'The family thanks {thanks}.']},
    {id: 'online', name: 'Online Obituary', words: 500, about: 'Room for the whole story, for an online memorial page.', outline: ['{Name}, {age}, of {city}, died {death}.', '{First} was born {born}. {early}', '{work}', '{married}', '{First} loved {loved}.', '{remembered}', '{faith}', '{First} is survived by {survived}.', '{Their} family remembers {them} with love, along with those who went before: {preceded}.', 'A service will be held {service}.', 'Memorials preferred to {memorials}.', 'The family thanks {thanks}.']}],
  tips: ['Leave out the home address. The city is enough.', 'Leave out the full birth date. The year, or the month and year, is enough.', 'Leave out the mother\'s maiden name; it is a common security question.', 'Ask a friend or neighbor to stay at the home during the visitation and the service.', 'Death notices are usually paid by length; the funeral home can place them and tell you the cost.', 'Read the draft out loud with the family before it goes anywhere, and check every name and date.']
};
const WPM = 130;
const wordsIn = t => (String(t || '').trim().match(/\S+/g) || []).length;
function readTime(t){
  const w = wordsIn(String(t || '').replace(/\[[^\]]*\]/g, ' ')), halves = Math.round(w / WPM * 2), m = Math.floor(halves / 2), half = halves % 2;
  return w + ' words, about ' + (halves < 2 ? 'under a minute' : m + (half ? ' and a half' : '') + (m === 1 && !half ? ' minute' : ' minutes')) + ' at an easy pace';
}

// The library's key over the built-in words, piece by piece.
let CF = null, CFsrc;
function cfg(){
  const lib = (C.lib && C.lib()) || null, L = (lib && lib.farewellPlanning) || null;
  if (CF && CFsrc === L) return CF;
  const A = (k) => L && Array.isArray(L[k]) && L[k].length ? L[k] : DEF[k];
  const steps = DEF.steps.map(d => { const l = L && arr(L.steps).find(x => x && x.id === d.id);
    if (!l) return d; const lists = Object.assign({}, d.lists);
    Object.entries(l.lists || {}).forEach(([k, v]) => { if (v && arr(v.items).length) lists[k] = Object.assign({}, d.lists[k] || {}, v); });
    return Object.assign({}, d, l, {lists, phoneLines: arr(l.phoneLines).length ? l.phoneLines : d.phoneLines}); });
  CF = {
    full: !!L, steps, checklist: A('checklist'), whoTags: A('whoTags'), gatheringTypes: A('gatheringTypes'), outputs: A('outputs'), followUp: A('followUp'),
    scripts: Object.assign({}, DEF.scripts, (L && L.scripts) || {}, {sources: L && L.scripts ? (L.scripts.sources || {}) : DEF.scripts.sources}),
    shareWords: Object.assign({}, DEF.shareWords, (L && L.shareWords) || {}),
    familyCopyLead: (L && L.familyCopyLead) || DEF.familyCopyLead, crisis: (L && L.crisis) || DEF.crisis
  };
  CFsrc = L;
  return CF;
}
const STEP = n => cfg().steps[n - 1];
const SID = n => STEP(n).id;

// ---------- plans ----------
function store(){ const d = D(); if (!d) return {plans: []}; d.fwp = d.fwp || {plans: []}; d.fwp.plans = d.fwp.plans || []; d.fwp.me = d.fwp.me || {}; return d.fwp; }
const plans = () => store().plans;
const plan = () => plans().find(p => p.id === S.id) || null;
function touch(p){ if (p) p.u = Date.now(); C.save && C.save(); pushFam(); if (p) svcPush(p); }
function newPlan(){
  return {id: 'fw' + uid(), u: Date.now(), made: today(), person: {}, contact: {}, sel: {}, own: {}, notes: {}, tidy: {}, custom: {}, stars: {}, tags: {}, story: {}, eDraft: '',
    writings: [], speakers: [], clergy: [], gd: {}, svc: null, reh: {}, next: [], fu: {}, fuOwn: [], ses: [], famChecked: [],
    tasks: cfg().checklist.map(x => ({id: x.id, t: x.t, who: x.who || '', done: false, d: ''}))};
}
const me = () => { const n = String(((D() || {}).settings || {}).name || '').trim(); return n.split(/\s+/)[0] || 'Chris'; };
const called = p => (p.person.called || '').trim() || (p.person.full || '').trim().split(/\s+/)[0] || '';
const pName = p => called(p) || 'your loved one';
const pTitle = p => (p.person.full || p.person.called || '').trim() || 'A New Plan';
function fill(t, p, x){
  x = x || {};
  const v = {Person: p ? pName(p) : 'your loved one', Full: p ? ((p.person.full || '').trim() || pName(p)) : '', Name: p ? ((p.contact.name || '').trim().split(/\s+/)[0] || 'family') : 'family', Chris: me()};
  return String(t || '').replace(/\[(Person|Full|Name|Chris|Place|Link|Minutes)\]/g, (m, k) => x[k] != null ? x[k] : v[k] != null ? v[k] : m);
}
const faithOf = p => (p.sel.faithway || [])[0] || '';
// Faith words only when the family chose Faith or A Blend; otherwise the plain words.
const plainOf = p => !['faith', 'blend'].includes(faithOf(p));

// Lists: the library's items, then the family's own.
function list(id){
  if (id === 'gatherings') return {title: 'Gatherings', items: cfg().gatheringTypes};
  for (const s of cfg().steps) if (s.lists && s.lists[id]) return s.lists[id];
  return {title: '', items: []};
}
const items = (p, id) => arr(list(id).items).concat(arr(p.own[id]));
const isOn = (p, id, v) => arr(p.sel[id]).includes(v);
const label = (p, id, v) => (items(p, id).find(x => x.id === v) || {}).t || v;
const picked = (p, id) => arr(p.sel[id]).map(v => label(p, id, v));
const gType = (p, id) => items(p, 'gatherings').find(x => x.id === id) || {id, t: id};
const gSel = p => arr(p.sel.gatherings).map(id => gType(p, id));
// The main service date: the first main gathering with a date, else any gathering with a date.
function mainDate(p){
  const g = gSel(p), d = id => (p.gd[id] || {}).date;
  const m = g.find(x => x.main && d(x.id)) || g.find(x => d(x.id));
  return m ? d(m.id) : '';
}
const whoList = p => { const base = cfg().whoTags.map(w => w === 'Chris' ? me() : w), more = Object.values(p.tags).concat(p.tasks.map(t => t.who)).filter(w => w && !base.includes(w)); return base.concat([...new Set(more)]); };

// ---------- follow-ups ----------
function fuDate(p, f){
  const base = mainDate(p) || p.made || today();
  if (f.anchor === 'holidays'){ const y = +base.slice(0, 4), after = addDays(base, 10); return [y + '-11-20', y + '-12-15', (y + 1) + '-11-20'].find(x => x >= after); }
  if (f.anchor === 'birthday'){ const b = parseDay(p.person.born); if (!b) return ''; const y = +base.slice(0, 4); let c = y + b.slice(4); if (c <= base) c = (y + 1) + b.slice(4); return c; }
  if (f.anchor === 'anniversary'){ const d = parseDay(p.person.died) || base; return (+d.slice(0, 4) + 1) + d.slice(4); }
  return addDays(base, +f.offsetDays || 0);
}
function touches(p){
  const L = cfg().followUp.map(f => ({f, id: f.id, title: fill(f.title, p), date: fuDate(p, f)}));
  arr(p.fuOwn).forEach(o => L.push({f: {id: o.id, title: o.title}, id: o.id, own: true, title: o.title || 'My Own Check-In', date: o.date || ''}));
  return L.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
}
function dueSoon(){
  const out = [], until = addDays(today(), 7);
  plans().forEach(p => { if (!mainDate(p)) return; touches(p).forEach(t => { const st = p.fu[t.id] || {}; if (!st.done && t.date && t.date <= until) out.push({p, t}); }); });
  return out.sort((a, b) => a.t.date.localeCompare(b.t.date));
}

// ---------- small builders ----------
const fk = k => ` data-fk="${esc(k)}"`;
function chips(p, id, single){
  return `<div class="fw-chips" role="group" aria-label="${esc(list(id).title || id)}">${items(p, id).map(o => `<button type="button" class="chip" data-fwa="chip" data-fwv="${esc(id + '|' + o.id)}"${single ? ' data-fws="1"' : ''} aria-pressed="${isOn(p, id, o.id)}"${fk('c|' + id + '|' + o.id)}>${esc(fill(o.t, p))}</button>`).join('')}</div>`;
}
function addOwn(id, ph){
  return `<div class="fw-add"><input type="text" data-fwown="${esc(id)}" aria-label="Add your own" placeholder="${esc(ph || 'Something else? Type it here')}" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-fwa="own" data-fwv="${esc(id)}"${fk('own|' + id)}>Add Your Own</button></div>`;
}
function note(p, sid){
  const t = !!p.tidy[sid];
  return `<div class="fw-note"><label class="f" for="fw-n-${sid}">Quick Note</label><textarea id="fw-n-${sid}" rows="2" data-fwi="notes.${sid}" placeholder="A few words. Tidy them later.">${esc(p.notes[sid] || '')}</textarea>
    <button type="button" class="fw-tidy" data-fwa="tidy" data-fwv="${sid}" aria-pressed="${t}"${fk('td|' + sid)}>${t ? 'Tidy Up Later: Marked' : 'Tidy Up Later'}</button></div>`;
}
function custom(p, sid){
  return `<details class="fw-custom"${p.custom[sid] ? ' open' : ''}><summary>Your Custom Details</summary><textarea rows="3" aria-label="Your custom details" data-fwi="custom.${sid}" placeholder="Anything else for this step, in your own words.">${esc(p.custom[sid] || '')}</textarea></details>`;
}
function star(p, key, lab){
  const on = !!p.stars[key];
  return `<button type="button" class="fw-star" data-fwa="star" data-fwv="${esc(key)}" data-fwl="${esc(lab)}" aria-pressed="${on}"${fk('st|' + key)}><span aria-hidden="true">${on ? '&#9733;' : '&#9734;'}</span> Come Back To This</button>`;
}
function who(p, key, lab){
  const cur = key.startsWith('task.') ? (p.tasks[+key.slice(5)] || {}).who : p.tags[key];
  const open = S.other === key;
  return `<div class="fw-who" role="group" aria-label="${esc(lab || 'Who handles this?')}"><span class="fw-lbl">Who handles this?</span>${whoList(p).map(w => `<button type="button" class="chip fw-sm" data-fwa="tag" data-fwv="${esc(key + '|' + w)}" aria-pressed="${cur === w}"${fk('tg|' + key + '|' + w)}>${esc(w)}</button>`).join('')}<button type="button" class="chip fw-sm" data-fwa="tagother" data-fwv="${esc(key)}" aria-pressed="${open}"${fk('to|' + key)}>Other</button>
    ${open ? `<span class="fw-other"><input type="text" data-fwtag="${esc(key)}" aria-label="Another name" placeholder="A name" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-fwa="tagset" data-fwv="${esc(key)}">Set</button></span>` : ''}</div>`;
}
function blk(p, title, key, inner, sub){
  return `<section class="fw-blk" data-fwanc="${esc(key)}"><div class="fw-blk-h"><h3>${esc(title)}</h3>${star(p, key, title)}</div>${sub ? `<p class="fw-sub">${esc(sub)}</p>` : ''}${inner}</section>`;
}
function fld(path, lab, val, type, ph){
  const id = 'fw-' + path.replace(/[^a-z0-9]+/gi, '-');
  return `<div class="fw-fld"><label class="f" for="${id}">${esc(lab)}</label><input id="${id}" type="${type || 'text'}" data-fwi="${esc(path)}" value="${esc(val || '')}"${ph ? ` placeholder="${esc(ph)}"` : ''} autocomplete="off"></div>`;
}
const sayBox = (p, t) => t ? `<div class="fw-say"><b>Say</b><q>${esc(fill(t, p, {Minutes: svcTotal(p)}))}</q></div>` : '';

// ---------- the order of service (the Service Builder's) ----------
const CER = () => window.GGCer && GGCer.fw ? GGCer.fw : null;
function cerBind(){ const c = CER(); if (c) c.bind({lib: C.lib && C.lib(), data: D(), save: C.save}); return c; }
const hasSvc = p => { const c = cerBind(); return !!(c && p.svc && c.get(p.svc)); };
const svcTotal = p => hasSvc(p) ? CER().total(p.svc) : 0;
function cerFaith(p){
  const f = faithOf(p); if (f === 'plain') return 'plain'; if (f === 'blend') return 'mixed'; if (f !== 'faith') return null;
  const fs = CER().faiths(), lab = picked(p, 'tradition').map(x => x.toLowerCase());
  for (const l of lab){ const m = fs.find(x => x.name.toLowerCase() === l) || fs.find(x => x.name.toLowerCase().includes(l) || l.includes(x.name.toLowerCase())); if (m) return m.id; }
  return null;
}
function svcSync(p){
  const c = cerBind(); if (!c) return {};
  const hs = c.honors().map(h => h.id), mainG = gSel(p).find(x => x.main) || gSel(p)[0], gd = mainG ? (p.gd[mainG.id] || {}) : {};
  const o = {name: (p.person.full || '').trim() || called(p), first: called(p), born: nice(parseDay(p.person.born) || p.person.born), died: nice(parseDay(p.person.died) || p.person.died),
    date: gd.date || '', time: tm(gd.time), place: gd.place || '', honors: arr(p.sel.honors).filter(h => hs.includes(h))};
  const f = cerFaith(p); if (f) o.faith = f;
  return o;
}
function svcType(p){
  const g = arr(p.sel.gatherings), ts = (CER() ? CER().types() : []).map(t => t.id);
  const want = g.includes('celebration') ? 'celebration' : g.includes('memorial') && !g.includes('funeral') ? 'memorial' : g.includes('funeral') ? 'funeral' : g.includes('graveside') ? 'graveside' : 'funeral';
  return ts.includes(want) ? want : 'funeral';
}
function leaders(p){ return [me()].concat(arr(p.speakers).map(s => s.name), arr(p.clergy).map(c => c.name), ['Family', 'Musician']).filter(Boolean); }
function svcBlock(p){
  const c = cerBind();
  if (!c) return '<p class="muted">The Service Builder did not load. Reload the Field Guide to plan the order of service.</p>';
  if (!hasSvc(p)) return `<p class="fw-sub" style="margin-top:0">Start the order of service from the Service Builder's parts and readings, shaped by the family's choices so far.</p>
    <div class="fw-chips">${c.types().map(t => `<button type="button" class="chip" data-fwa="svc-new" data-fwv="${esc(t.id)}"${fk('sn|' + t.id)} aria-pressed="${svcType(p) === t.id}">${esc(t.name)}</button>`).join('')}</div>
    <p class="fw-sub">Tap the kind of service to begin.</p>`;
  const rows = c.rows(p.svc), on = rows.filter(r => r.on), off = rows.filter(r => !r.on), L = leaders(p);
  return `<datalist id="fw-leaders">${L.map(l => `<option value="${esc(l)}">`).join('')}</datalist>
    <div class="fw-svc">${on.map((r, i) => `<div class="fw-srow"><div class="fw-snm"><b>${esc(r.name)}</b>${r.rd.length ? `<small>${esc(r.rd.join('; '))}</small>` : r.readings ? '<small>No reading chosen yet</small>' : ''}</div>
      <label class="fw-mini"><span>Minutes</span><input type="number" min="0" max="120" data-fwsvc="${esc(r.k)}|mins" value="${esc(r.mins)}" aria-label="Minutes for ${esc(r.name)}"></label>
      <label class="fw-mini fw-lead"><span>Who leads</span><input type="text" list="fw-leaders" data-fwsvc="${esc(r.k)}|by" value="${esc(r.by)}" placeholder="${esc(me())}" aria-label="Who leads ${esc(r.name)}" autocomplete="off"></label>
      ${r.options.length ? `<label class="fw-mini fw-ch"><span>Choice</span><select data-fwsvc="${esc(r.k)}|option" aria-label="Choice for ${esc(r.name)}">${r.options.map(o => `<option value="${esc(o[0])}"${o[0] === r.option ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>` : '<span class="fw-ch"></span>'}
      <span class="fw-mv"><button type="button" class="btn btn-line btn-sm" data-fwa="svc-up" data-fwv="${esc(r.k)}" aria-label="Move ${esc(r.name)} up"${i ? '' : ' disabled'}${fk('su|' + r.k)}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-fwa="svc-down" data-fwv="${esc(r.k)}" aria-label="Move ${esc(r.name)} down"${i < on.length - 1 ? '' : ' disabled'}${fk('sd|' + r.k)}>&darr;</button><button type="button" class="btn btn-line btn-sm" data-fwa="svc-off" data-fwv="${esc(r.k)}" aria-label="Take out ${esc(r.name)}"${fk('so|' + r.k)}>Take Out</button></span></div>`).join('')}</div>
    <div class="fw-total"><span>Running total</span><b id="fw-tot">${c.total(p.svc)} minutes</b></div>
    ${off.length ? `<details class="fw-custom"><summary>More Parts to Add (${off.length})</summary><div class="fw-chips" style="margin-top:8px">${off.map(r => `<button type="button" class="chip" data-fwa="svc-on" data-fwv="${esc(r.k)}"${fk('sa|' + r.k)}>${esc(r.name)}</button>`).join('')}</div></details>` : ''}
    ${addOwn('svcpart', 'Add a part: a slideshow, a second reading...')}
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-fwa="svc-open">Readings and Words in the Service Builder</button><button type="button" class="btn btn-line btn-sm" data-fwa="svc-sync">Match the Family's Choices Again</button></div>
    <p class="fw-sub">Readings with Bible versions, the words for each part, Faith or Plain, and the printouts live in the Service Builder. This is the same service.</p>`;
}

// ---------- share cards (Eulogy Helper, Obituary Helper, Planning a Farewell) ----------
function shareURL(p, kind){
  const m = store().me, q = ['to=' + encodeURIComponent(me())];
  if (m.em) q.push('em=' + encodeURIComponent(m.em)); if (m.ph) q.push('ph=' + encodeURIComponent(String(m.ph).replace(/\D/g, '')));
  if (kind === 'familyStart') return SITE + 'planning-a-farewell.html#send&' + q.join('&');
  const nm = kind === 'obituary' ? ((p.person.full || '').trim() || called(p)) : called(p);
  if (nm) q.push('for=' + encodeURIComponent(nm));
  return SITE + (kind === 'obituary' ? 'obituary-helper.html' : 'eulogy-helper.html') + '#' + q.join('&');
}
const SHARE_T = {eulogy: 'Eulogy Helper', obituary: 'Obituary Helper', familyStart: 'Planning a Farewell'};
function shareWords(p, kind){ const u = shareURL(p, kind), w = fill(cfg().shareWords[kind] || '', p, {Link: u}); return w.includes(u) ? w : w + '\n\n' + u; }
function shareCard(p, kind){
  const u = shareURL(p, kind), qr = window.GGQR && GGQR.svg ? GGQR.svg(u, {label: 'QR code for the ' + SHARE_T[kind]}) : '';
  return `<div class="fw-share"><div class="fw-qr">${qr}</div><div class="fw-share-m"><h4>${esc(SHARE_T[kind])}</h4><div class="fw-lbl">Ready-to-send words</div><div class="fw-words">${esc(shareWords(p, kind))}</div>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-fwa="share-copy" data-fwv="${kind}">Copy Link</button><a class="btn btn-line btn-sm" href="${esc(smsHref(p.contact.ph, shareWords(p, kind)))}">Text It</a><a class="btn btn-line btn-sm" href="${esc(mailHref(p.contact.em, SHARE_T[kind] + ' for ' + pName(p), shareWords(p, kind)))}">Email It</a></div>
    <p class="fw-sub">The family scans the code with a phone camera, or opens the link. What they write stays on their phone until they send it to you.</p></div></div>`;
}
const smsHref = (ph, body) => 'sms:' + String(ph || '').replace(/[^\d+]/g, '') + '?&body=' + encodeURIComponent(body);
const mailHref = (em, sub, body) => 'mailto:' + encodeURIComponent(String(em || '').trim()).replace(/%40/g, '@') + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body);
async function copyText(t, msg){
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;left:-9999px;'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); }
  API.lastCopy = t; toast(msg || 'Copied.');
}

// ---------- loading what the family sends (FP format GGFW1, and Eulogy or Obituary text) ----------
// Reads Planning a Farewell's "Send to Your Officiant" start and the helpers' "Send to" text. Plain text only.
const FWRE = /\[GGFW1(?: (\d+)\/(\d+))?\]([\s\S]*?)\[\/GGFW1\]/g;
function fwJSON(p){ const a = String(p).replace(/[\r\n]+/g, ''); try { return JSON.parse(a); } catch (e) {} try { return JSON.parse(a.replace(/\s+(?=[,:}\]"])|(?=[,:{\[])\s+/g, '')); } catch (e) {} return undefined; }
function readStart(text, st){
  let m, whole = null; st = st || {p: {}, of: 0}; text = String(text || ''); FWRE.lastIndex = 0;
  while ((m = FWRE.exec(text))){ if (!m[1]){ whole = m[3]; break; } st.of = +m[2]; st.p[+m[1]] = m[3]; }
  let pay = whole;
  if (pay == null){ if (!st.of) return null; const need = []; let s = ''; for (let i = 1; i <= st.of; i++){ if (st.p[i] == null) need.push(i); else s += String(st.p[i]).replace(/[\r\n]+/g, ''); }
    if (need.length) return {ok: false, need, have: st.of - need.length, of: st.of}; pay = s; }
  const d = fwJSON(pay);
  if (!d || typeof d !== 'object' || d.kind !== 'farewell-start') return {ok: false, err: "This start could not be read. Ask the family to copy the whole message again."};
  if (+d.v > 1) return {ok: false, err: 'This start was made by a newer version of the tool.'};
  return {ok: true, data: d};
}
const SECRE = /^(Death Notice|Newspaper Obituary|Online Obituary)\s*$/;
function readWriting(text){
  const t = String(text || '').replace(/\r\n?/g, '\n').trim(); if (!t) return null;
  const m = /^(Eulogy|Obituary) for (.+)$/.exec(t.split('\n')[0]), out = {kind: '', name: '', from: '', body: t, sections: []};
  if (m){ out.kind = m[1].toLowerCase(); out.name = m[2].trim(); const cut = t.search(/\n[ \t]*\n/), head = cut < 0 ? t : t.slice(0, cut);
    out.body = cut < 0 ? '' : t.slice(cut).replace(/^\s+/, ''); head.split('\n').forEach(l => { const f = /^From:\s*(.+)$/.exec(l); if (f) out.from = f[1].trim(); }); }
  if (out.kind === 'obituary' || (!out.kind && SECRE.test(out.body.split('\n')[0]))){
    let cur = null; out.body.split('\n').forEach(l => { if (SECRE.test(l)){ cur = {h: l.trim(), t: ''}; out.sections.push(cur); } else if (cur) cur.t += (cur.t ? '\n' : '') + l; });
    out.sections.forEach(s => { s.t = s.t.trim(); }); if (!out.kind && out.sections.length) out.kind = 'obituary';
  }
  return out;
}
// Match the family's ids to this list by id, then by label; anything else comes in as Add Your Own.
function pickInto(p, id, val, single){
  const v = String(val || '').trim(); if (!v || v === 'unsure') return false;
  const its = items(p, id), lo = v.toLowerCase();
  let it = its.find(x => x.id === v) || its.find(x => String(x.t).toLowerCase() === lo) || its.find(x => String(x.t).toLowerCase().includes(lo) || lo.includes(String(x.t).toLowerCase()));
  if (!it){ it = {id: 'own_' + uid(), t: v.replace(/^./, c => c.toUpperCase())}; (p.own[id] = p.own[id] || []).push(it); }
  if (single) p.sel[id] = [it.id]; else { p.sel[id] = p.sel[id] || []; if (!p.sel[id].includes(it.id)) p.sel[id].push(it.id); }
  return true;
}
const addTo = (o, k, t) => { t = String(t || '').trim(); if (!t) return; o[k] = o[k] ? o[k] + '\n' + t : t; };
const HERE_L = {spouse: 'Spouse', children: 'Children', grandchildren: 'Grandchildren', siblings: 'Siblings', friends: 'Friends'};
const CUST_L = {hymns: 'Hymn Singing', candle: 'Lighting a Candle', memories: 'Sharing Memories Aloud', flowers: 'Flowers on the Casket', silence: 'A Moment of Silence'};
const HON_L = {military: 'Military Honors', flag: 'Flag Folding', taps: 'Taps', fraternal: 'Fraternal or Service Group'};
const GATH_L = {funeral: 'Funeral', memorial: 'Memorial', celebration: 'Celebration of Life', visitation: 'Visitation or Wake', prayer: 'Prayer Service', graveside: 'Graveside Committal', burial: 'Burial', cremation: 'Cremation', scattering: 'Scattering of Ashes', reception: 'Reception'};
function byIdOrLabel(p, list, id, labels){ const its = items(p, list); return its.some(x => x.id === id) ? id : (labels[id] || id); }
function applyStart(p, d){
  let n = 0; const P = d.person || {}, F = d.from || {};
  ['called', 'full', 'say'].forEach(k => { if (P[k] && !p.person[k]){ p.person[k] = String(P[k]); n++; } });
  ['born', 'died'].forEach(k => { if (P[k] && !p.person[k]){ p.person[k] = parseDay(P[k]) || String(P[k]); n++; } });
  if (F.name && !p.contact.name){ p.contact.name = F.name; n++; } if (F.rel && !p.contact.rel) p.contact.rel = F.rel; if (F.phone && !p.contact.ph) p.contact.ph = F.phone; if (F.email && !p.contact.em) p.contact.em = F.email;
  arr(d.here).forEach(x => { if (pickInto(p, 'who', byIdOrLabel(p, 'who', x, HERE_L))) n++; });
  if (d.hereOther){ String(d.hereOther).split(/[,;\n]+/).forEach(x => { if (pickInto(p, 'who', x)) n++; }); }
  const st = d.story || {}; Object.keys(st).forEach(k => { if (!st[k]) return; const its = items(p, 'story'), it = its.find(x => x.id === k); const key = it ? it.id : k; if (!p.story[key]){ p.story[key] = String(st[k]); n++; } p.sel.story = p.sel.story || []; if (it && !p.sel.story.includes(key)) p.sel.story.push(key); });
  if (d.eulogy && d.eulogy !== 'unsure'){ const e = d.eulogy === 'officiant' ? 'chris' : d.eulogy; if (items(p, 'eulogy').some(x => x.id === e)){ p.sel.eulogy = [e]; n++; } }
  arr(d.speakers).forEach(s => { const nm = String((s && s.name) || s || '').trim(); if (nm && !p.speakers.some(x => x.name === nm)){ p.speakers.push({name: nm, min: 3}); n++; } });
  if (d.faithway && d.faithway !== 'unsure' && pickInto(p, 'faithway', d.faithway, true)) n++;
  if (d.tradition && pickInto(p, 'tradition', d.tradition)) n++;
  if (d.clergy){ p.clergy.push({name: String(d.clergy), role: ''}); n++; }
  arr(d.customs).forEach(x => { if (pickInto(p, 'customs', byIdOrLabel(p, 'customs', x, CUST_L))) n++; });
  if (d.customsOther){ String(d.customsOther).split(/[;\n]+/).forEach(x => { if (pickInto(p, 'customs', x)) n++; }); }
  arr(d.gatherings).forEach(x => { if (x !== 'unsure' && pickInto(p, 'gatherings', byIdOrLabel(p, 'gatherings', x, GATH_L))) n++; });
  if (d.when){ addTo(p.custom, 'gatherings', 'From the family, dates and places so far: ' + d.when); n++; }
  arr(d.honors).forEach(x => { if (pickInto(p, 'honors', byIdOrLabel(p, 'honors', x, HON_L))) n++; });
  if (d.readings){ addTo(p.custom, 'service', 'Readings the family hopes for: ' + d.readings); n++; }
  if (d.music){ addTo(p.custom, 'service', 'Music the family hopes for: ' + d.music); n++; }
  if (d.funeralHome){ const t = p.tasks.find(x => x.id === 'funeral_home') || p.tasks[0]; if (t && !t.d){ t.d = String(d.funeralHome); n++; } else addTo(p.custom, 'arrangements', 'Funeral home: ' + d.funeralHome); }
  if (d.notes){ addTo(p.custom, 'welcome', 'From the family: ' + d.notes); n++; }
  if (arr(d.checked).length){ p.famChecked = [...new Set(arr(p.famChecked).concat(d.checked))]; n++; }
  p.famStart = {at: Date.now(), made: d.made || ''};
  return n;
}
// One paste box for everything: the family's start (whole or in QR parts), a eulogy, or an obituary.
function loadText(p, text){
  const st = readStart(text, S.qr || (S.qr = {p: {}, of: 0}));
  if (st){
    if (!st.ok && st.need){ toast('Part ' + st.have + ' of ' + st.of + ' is in. Add part ' + st.need.join(', ') + ' next.'); return 'part'; }
    if (!st.ok){ toast(st.err); return false; }
    S.qr = null; const n = applyStart(p, st.data); touch(p); toast(n ? "The family's start is in: " + n + (n === 1 ? ' answer.' : ' answers.') : "The family's start is in. Everything in it was already here."); return 'start';
  }
  const w = readWriting(text); if (!w || !(w.body || '').trim()){ toast('Nothing to add. Paste the whole message the family sent.'); return false; }
  p.writings.push({id: uid(), kind: w.kind || 'writing', name: w.name, from: w.from, body: w.body, sections: w.sections, at: Date.now()}); touch(p);
  toast(w.kind === 'eulogy' ? 'The eulogy is in.' : w.kind === 'obituary' ? 'The obituary is in.' : 'Added to the family\'s writing.'); return 'writing';
}
function loadBox(p, where){
  return `<details class="fw-load"${where === 'open' ? ' open' : ''}><summary>Paste or Load From the Family</summary>
    <p class="fw-sub">Paste the message the family sent from Planning a Farewell, the Eulogy Helper, or the Obituary Helper. A file they sent works too, and so does the text a phone camera reads from their QR code.</p>
    <textarea rows="3" id="fw-paste" aria-label="Paste what the family sent" placeholder="Paste the whole message here"></textarea>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-fwa="load-paste">Add It</button><label class="btn btn-line btn-sm" style="cursor:pointer">Load a File<input type="file" accept=".txt,.json,text/plain,application/json" data-fwfile="1" hidden></label>${'BarcodeDetector' in window ? '<button type="button" class="btn btn-line btn-sm" data-fwa="scan">Scan Their QR Code</button>' : ''}</div>
    ${S.qr && S.qr.of ? `<p class="fw-sub">Part ${Object.keys(S.qr.p).length} of ${S.qr.of} is in. Add the next part.</p>` : ''}</details>`;
}
async function scanQR(){
  const p = plan(); if (!p || !('BarcodeDetector' in window)) return;
  let st; try { st = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}); } catch (e){ toast('The camera is not available. Paste the text instead.'); return; }
  const box = document.createElement('div'); box.className = 'fw-scan'; box.innerHTML = '<div class="fw-scan-in"><video playsinline muted></video><p>Hold the family\'s QR code in the frame.</p><button type="button" class="btn btn-line btn-sm">Done</button></div>';
  document.body.appendChild(box); const v = box.querySelector('video'); v.srcObject = st; await v.play().catch(() => {});
  const det = new BarcodeDetector({formats: ['qr_code']}), seen = new Set();
  const stop = () => { clearInterval(S.scan); S.scan = null; st.getTracks().forEach(t => t.stop()); box.remove(); rerender(true); };
  box.querySelector('button').onclick = stop;
  S.scan = setInterval(async () => { try { const r = await det.detect(v); for (const c of r){ if (seen.has(c.rawValue)) continue; seen.add(c.rawValue); const out = loadText(p, c.rawValue); if (out && out !== 'part') return stop(); } } catch (e) {} }, 350);
}

// ---------- the helpers' state, drafts, and what feeds the printouts (GWG BLD 768) ----------
const pronOf = p => PRON[p.person.pron] ? p.person.pron : 'they';
const euA = p => { p.eu = p.eu || {a: {}}; p.eu.a = p.eu.a || {}; return p.eu.a; };
const obS = p => { p.ob = p.ob || {}; p.ob.a = p.ob.a || {}; p.ob.d = p.ob.d || {}; p.ob.e = p.ob.e || {}; return p.ob; };
const clean = t => String(t || '').trim().replace(/[ \t]+/g, ' ');
const sent = t => { t = clean(t); if (!t) return ''; t = t.charAt(0).toUpperCase() + t.slice(1); return /[.!?"\u201D]$/.test(t) ? t : t + '.'; };
const low = t => clean(t).replace(/[.]+$/, '');
// Fill only what is still empty, from the story notes and the plan.
function euFill(p){
  const a = euA(p), st = p.story || {}, P = called(p), n = 0;
  const put = (k, v) => { v = clean(v); if (v && !clean(a[k])){ a[k] = v; return 1; } return 0; };
  let c = put('name', P) + put('who', st.who) + put('s1', st.memory) + put('s2', st.loved) + put('taught', st.values);
  if (clean(st.saying) && !clean(a.s3)){ a.s3 = (P || 'They') + ' always said, "' + low(st.saying).replace(/^["']|["']$/g, '') + '."'; c++; }
  if (clean(st.work) && !clean(a.s2) ){ a.s2 = clean(st.work); c++; }
  return c + n;
}
function euBuild(p){
  const a = euA(p), n = clean(a.name) || '[Name]', pr = PRON[pronOf(p)];
  const open = [a.me ? sent(a.me) : '[Who you are to them.]', a.who ? n + ' was ' + low(a.who) + '.' : n + ' was [one sentence that captures ' + pr.them + '].'];
  const stories = ['s1', 's2', 's3'].map((k, i) => clean(a[k]) ? sent(a[k]) : '[' + ['First', 'Second', 'Third'][i] + ' story]');
  const gave = [a.taught ? n + ' taught me ' + low(a.taught) + '.' : 'What ' + n + ' taught me was [what ' + pr.they + ' taught you].', a.carry ? 'And what we carry forward is ' + low(a.carry) + '.' : 'And what we carry forward is [what we carry].'];
  return [open.join(' '), stories.join('\n\n'), gave.join(' '), a.close ? sent(a.close) : '[A closing line.]'].join('\n\n');
}
function ageOf(p){ const b = parseDay(p.person.born), d = parseDay(p.person.died); if (!b || !d) return ''; let y = +d.slice(0, 4) - +b.slice(0, 4); if (d.slice(5) < b.slice(5)) y--; return y > 0 && y < 130 ? String(y) : ''; }
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function svcLine(p){
  const g = gSel(p).find(x => x.main && (p.gd[x.id] || {}).date) || gSel(p).find(x => (p.gd[x.id] || {}).date); if (!g) return '';
  const d = p.gd[g.id] || {}, dt = dOf(d.date);
  return [dt ? WD[dt.getDay()] + ', ' + nice(d.date) : '', d.time ? 'at ' + tm(d.time) : '', d.place ? 'at ' + d.place : ''].filter(Boolean).join(', ').replace(/, at (\d)/, ', at $1');
}
function obFill(p){
  const o = obS(p), a = o.a, st = p.story || {}, b = parseDay(p.person.born), d = parseDay(p.person.died);
  const put = (k, v) => { v = clean(v); if (v && !clean(a[k])){ a[k] = v; return 1; } return 0; };
  return put('name', p.person.full) + put('first', called(p) !== String(p.person.full || '').trim().split(/\s+/)[0] ? called(p) : '') + put('age', ageOf(p)) + put('death', d ? nice(d) : p.person.died)
    + put('born', b ? 'in ' + b.slice(0, 4) : '') + put('work', st.work) + put('loved', st.loved) + put('remembered', st.who) + put('service', svcLine(p));
}
// The Obituary Helper's drafting rules: a sentence drops out when its answers are empty, and a clause drops out when only its own answer is empty.
function obDraft(p, shape){
  const a = obS(p).a, pr = PRON[pronOf(p)], name = clean(a.name), first = clean(a.first) || name.replace(/["\u201C\u201D].*?["\u201C\u201D]/g, ' ').trim().split(/\s+/)[0] || '';
  const v = Object.assign({Name: name || '[Name]', First: first || '[Name]'}, pr);
  const QIDS = []; OB.secs.forEach(g => g.qs.forEach(q => QIDS.push(q.id)));
  const ans = {}; QIDS.forEach(id => { ans[id] = clean(a[id]).replace(/\s*\n+\s*/g, ' ').replace(/[.;,]\s*$/, ''); });
  ['early', 'work', 'married', 'remembered', 'faith'].forEach(id => { if (ans[id] && !/[.!?"\u201D]$/.test(ans[id])) ans[id] += '.'; if (ans[id]) ans[id] = ans[id].charAt(0).toUpperCase() + ans[id].slice(1); });
  const fillT = t => String(t || '').replace(/\{([A-Za-z]+)\}/g, (m, k) => { if (Object.prototype.hasOwnProperty.call(ans, k)) return ans[k] || ''; if (Object.prototype.hasOwnProperty.call(v, k)) return v[k]; const lo = k.charAt(0).toLowerCase() + k.slice(1); if (lo !== k && v[lo]) return v[lo].charAt(0).toUpperCase() + v[lo].slice(1); return m; });
  const toks = t => (t.match(/\{([A-Za-z]+)\}/g) || []).map(x => x.slice(1, -1)).filter(k => QIDS.includes(k));
  const tidy = t => fillT(t).replace(/\s+([.,;:])/g, '$1').replace(/([.!?]["\u201D]?)\./g, '$1').replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ').trim();
  const sentence = t => { const used = toks(t); if (!used.length) return tidy(t); if (used.every(k => !ans[k])) return ''; if (used.every(k => ans[k])) return tidy(t);
    const parts = t.replace(/[.!?]\s*$/, '').split(/,\s+/).filter(c => toks(c).every(k => ans[k])); if (!parts.length) return '';
    let out = tidy(parts.join(', ')).replace(/^and\s+/i, ''); return out.charAt(0).toUpperCase() + out.slice(1) + '.'; };
  const item = t => t.split(/(?<=[.!?])\s+(?=[{A-Z])/).map(sentence).filter(Boolean).join(' ');
  const paras = shape.words > 120 ? shape.outline.map(item) : [shape.outline.map(item).filter(Boolean).join(' ')];
  return paras.filter(Boolean).join('\n\n');
}
const fillQ = (p, t) => String(t || '').replace(/\{(they|them|their)\}/g, (m, k) => PRON[pronOf(p)][k]);
// What prints: the session's eulogy draft, else the family's own eulogy they sent back.
function eulogyText(p){
  const d = String(p.eDraft || '').trim(); if (d) return d;
  const w = arr(p.writings).filter(x => x.kind === 'eulogy').pop(); return w ? String(w.body || '').trim() : '';
}
// The obituary for the family copy and the funeral home: the newspaper draft first, else the online, else the notice; else the family's own.
function obitText(p){
  const o = p.ob && p.ob.d || {}; for (const sh of ['newspaper', 'online', 'notice']){ if (String(o[sh] || '').trim()) return {name: OB.shapes.find(x => x.id === sh).name, text: String(o[sh]).trim()}; }
  const w = arr(p.writings).filter(x => x.kind === 'obituary').pop(); if (!w) return null;
  const sec = arr(w.sections).find(x => /Newspaper/.test(x.h)) || arr(w.sections).find(x => x.t) ; return sec ? {name: sec.h, text: sec.t} : (String(w.body || '').trim() ? {name: 'Obituary', text: String(w.body).trim()} : null);
}
function obitDrafts(p){
  const o = p.ob && p.ob.d || {}, out = {}; ['notice', 'newspaper', 'online'].forEach(k => { if (String(o[k] || '').trim()) out[k] = String(o[k]).trim(); });
  if (!Object.keys(out).length){ const w = arr(p.writings).filter(x => x.kind === 'obituary').pop(); if (w) arr(w.sections).forEach(x => { const k = /Death Notice/.test(x.h) ? 'notice' : /Newspaper/.test(x.h) ? 'newspaper' : /Online/.test(x.h) ? 'online' : ''; if (k && x.t) out[k] = x.t; }); }
  return out;
}
// The eulogy and the obituary follow into the Service Builder's service, so its printouts carry them.
let svcT = null;
function svcPush(p){ clearTimeout(svcT); svcT = setTimeout(() => { if (!p || !hasSvc(p)) return; const c = CER(); c.eulogy(p.svc, eulogyText(p)); c.obit(p.svc, obitDrafts(p)); }, 300); }

// ---------- Chris's View, one function per step ----------
const V = {};
V[1] = p => sayBox(p, STEP(1).say) + loadBox(p) +
  blk(p, list('who').title || 'Who Is Here', 'who', chips(p, 'who') + addOwn('who', 'Neighbor, pastor, a dear friend...'), list('who').sub) +
  blk(p, 'Their Name', 'name', `<div class="fw-g2">${fld('person.called', 'Name as they were called', p.person.called)}${fld('person.full', 'Full name', p.person.full)}${fld('person.born', 'Born', parseDay(p.person.born) || '', 'date')}${fld('person.died', 'Died', parseDay(p.person.died) || '', 'date')}</div>
    ${['born', 'died'].filter(k => p.person[k] && !parseDay(p.person[k])).map(k => `<p class="fw-sub">From the family, ${k}: ${esc(p.person[k])}</p>`).join('')}
    ${fld('person.say', 'How to say the name', p.person.say, 'text', 'PEG LAR-sun')}`) +
  blk(p, 'Family Contact', 'contact', `<div class="fw-g2">${fld('contact.name', 'Name', p.contact.name)}${fld('contact.rel', 'Relationship', p.contact.rel)}${fld('contact.ph', 'Phone', p.contact.ph, 'tel')}${fld('contact.em', 'Email', p.contact.em, 'email')}</div>`, 'For the family copy, the share links, and the follow-ups.') +
  `<details class="fw-custom"><summary>Send the Family Planning a Farewell</summary>${shareCard(p, 'familyStart')}</details>` +
  custom(p, 'welcome') + note(p, 'welcome');

V[2] = p => {
  const e = (p.sel.eulogy || [])[0], fam = e === 'family' || e === 'both', mine = e === 'chris' || e === 'both' || !e;
  const S2 = list('story');
  return sayBox(p, STEP(2).say) +
  blk(p, S2.title || 'Their Story', 'story', `<div class="fw-prompts">${items(p, 'story').map(it => `<div class="fw-pcard"><button type="button" class="chip" data-fwa="chip" data-fwv="${esc('story|' + it.id)}" aria-pressed="${isOn(p, 'story', it.id)}"${fk('c|story|' + it.id)}>${esc(fill(it.t, p))}</button>${it.q ? `<small>${esc(fill(it.q, p))}</small>` : ''}<textarea rows="2" data-fwi="story.${esc(it.id)}" aria-label="Note for ${esc(it.t)}" placeholder="A few words">${esc(p.story[it.id] || '')}</textarea></div>`).join('')}</div>` + addOwn('story', 'Another prompt: their cooking, their hands, their laugh...'), STEP(2).sub) +
  blk(p, list('eulogy').title || 'Who Is Writing the Eulogy?', 'eulogy', chips(p, 'eulogy', true) + who(p, 'eulogy') +
    helperCard(p, 'eulogy', mine) +
    (fam ? `<details class="fw-custom" style="margin-top:12px"${mine ? '' : ' open'}><summary>Send the Eulogy Helper to Write at Home</summary>${shareCard(p, 'eulogy')}</details>` : '')) +
  blk(p, 'Obituary', 'obit', who(p, 'obit') + helperCard(p, 'obit', true) + `<details class="fw-custom" style="margin-top:12px"><summary>Send the Obituary Helper to Write at Home</summary>${shareCard(p, 'obituary')}</details>`, 'Write it together now, or send the Obituary Helper to whoever is writing it.') +
  blk(p, "The Family's Writing", 'writing', (p.writings.length ? p.writings.map((w, i) => `<details class="fw-wr"><summary><b>${esc(w.kind === 'eulogy' ? 'Eulogy' : w.kind === 'obituary' ? 'Obituary' : 'Writing')}</b>${w.from ? ' from ' + esc(w.from) : ''} <small>${esc(new Date(w.at).toLocaleDateString())}</small></summary><div class="fw-words">${esc(w.sections && w.sections.length ? w.sections.map(s => s.h + '\n\n' + s.t).join('\n\n') : w.body)}</div><div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-fwa="wr-copy" data-fwv="${i}">Copy</button><button type="button" class="btn btn-line btn-sm" data-fwa="wr-del" data-fwv="${i}">Remove</button></div></details>`).join('') : '<p class="fw-sub" style="margin-top:0">When the family sends their eulogy or obituary, paste it here.</p>') + loadBox(p)) +
  blk(p, 'Family Speakers', 'speakers', `<div class="fw-lines">${p.speakers.map((s, i) => `<div class="fw-line"><input type="text" data-fwi="speakers.${i}.name" value="${esc(s.name)}" aria-label="Speaker name" autocomplete="off"><input type="number" min="1" max="30" data-fwi="speakers.${i}.min" value="${esc(s.min)}" aria-label="Minutes"><button type="button" class="btn btn-line btn-sm" data-fwa="spk-del" data-fwv="${i}" aria-label="Remove ${esc(s.name)}">Remove</button></div>`).join('')}</div>${p.speakers.length ? '<p class="fw-sub">Name, then minutes.</p>' : ''}` + addOwn('speakers', "Add a speaker's name")) +
  custom(p, 'story') + note(p, 'story');
};

// The card in Their Story that opens a helper inside the session.
function helperCard(p, k, lead){
  if (k === 'eulogy'){ const d = String(p.eDraft || '').trim(), n = Object.values(euA(p)).filter(x => clean(x)).length;
    return `<div class="fw-helper"><div class="spread"><div style="min-width:0;flex:1 1 240px"><b>Eulogy Helper</b><p class="fw-sub" style="margin:2px 0 0">${d ? esc(readTime(d)) + '. Change it any time.' : n ? n + ' of 9 answers so far.' : 'Write it together right here: three short sections, then a real draft you can edit. The story notes fill in first.'}</p></div>
      <button type="button" class="btn ${lead ? 'btn-gold' : 'btn-line'} btn-sm" data-fwa="sub" data-fwv="eulogy"${fk('sb|eulogy')}>${d || n ? 'Open the Eulogy Helper' : 'Write It Together Now'}</button></div></div>`; }
  const o = obS(p), have = OB.shapes.filter(sh => String(o.d[sh.id] || '').trim()).length, n = Object.values(o.a).filter(x => clean(x)).length;
  return `<div class="fw-helper"><div class="spread"><div style="min-width:0;flex:1 1 240px"><b>Obituary Helper</b><p class="fw-sub" style="margin:2px 0 0">${have ? have + ' of 3 drafts ready: Death Notice, Newspaper Obituary, Online Obituary.' : n ? n + ' answers so far.' : 'A few questions, then three drafts: a Death Notice, a Newspaper Obituary, and an Online Obituary.'}</p></div>
    <button type="button" class="btn btn-line btn-sm" data-fwa="sub" data-fwv="obit"${fk('sb|obit')}>${have || n ? 'Open the Obituary Helper' : 'Write It Together Now'}</button></div></div>`;
}
// The Eulogy Helper inside the session: Who They Were, Three Stories, What They Gave Us, then the draft.
const EUSECS = () => EU.secs.map(x => x.title).concat(['The Draft']);
const OBSECS = () => OB.secs.map(x => x.title).concat(['The Drafts']);
function secNav(cur, L, act){ return `<div class="fw-chips fw-secnav" role="group" aria-label="Sections">${L.map((t, i) => `<button type="button" class="chip" data-fwa="${act}" data-fwv="${i}" aria-pressed="${cur === i}"${fk(act + '|' + i)}><span class="fw-n">${i + 1}</span> ${esc(t)}</button>`).join('')}</div>`; }
function qField(p, base, q, val){
  const id = 'fw-' + base.replace(/\./g, '-') + '-' + q.id, lab = fillQ(p, q.l), path = base + '.' + q.id;
  return `<section class="fw-blk fw-q" data-fwanc="${esc(base.split('.')[0] + '-' + q.id)}"><label class="f" for="${id}" style="margin-top:0">${esc(lab)}</label>${q.h ? `<p class="fw-sub" style="margin:2px 0 6px">${esc(fillQ(p, q.h))}</p>` : ''}
    ${q.input ? `<input type="text" id="${id}" data-fwi="${esc(path)}" value="${esc(val || '')}"${q.ph ? ` placeholder="${esc(q.ph)}"` : ''} autocomplete="off">` : `<textarea id="${id}" rows="${q.rows || 2}" data-fwi="${esc(path)}"${q.ph ? ` placeholder="${esc(q.ph)}"` : ''}>${esc(val || '')}</textarea>`}</section>`;
}
const pronChips = p => `<div class="fw-chips" role="group" aria-label="Words for them" style="margin-top:6px">${[['he', 'He, him, his'], ['she', 'She, her, hers'], ['they', 'They, them, their']].map(([k, l]) => `<button type="button" class="chip" data-fwa="pron" data-fwv="${k}" aria-pressed="${pronOf(p) === k}"${fk('pr|' + k)}>${l}</button>`).join('')}</div>`;
function storyRef(p){
  const its = items(p, 'story').filter(it => clean(p.story[it.id]));
  return its.length ? `<details class="fw-custom"><summary>The Story Notes</summary><ul class="fw-ref">${its.map(it => `<li><b>${esc(fill(it.t, p))}:</b> ${esc(p.story[it.id])}</li>`).join('')}</ul></details>` : '';
}
function vEu(p){
  const a = euA(p), n = S.eSec, last = EU.secs.length;
  let body = '';
  if (n < last){ const sec = EU.secs[n];
    body = (n === 0 ? `<section class="fw-blk" data-fwanc="eu-pron"><span class="fw-lbl">Words for them</span>${pronChips(p)}</section>` : '') + (sec.sub ? `<p class="fw-sub">${esc(sec.sub)}</p>` : '') + sec.qs.map(q => qField(p, 'eu.a', q, a[q.id])).join('');
  } else {
    const d = String(p.eDraft || '');
    body = `<section class="fw-blk" data-fwanc="eu-draft"><div class="fw-blk-h"><h3>The Eulogy</h3><span class="fw-sub" id="fw-eu-time" style="margin:0">${esc(d.trim() ? readTime(d) : 'Not built yet')}</span></div>
      <p class="fw-sub">The outline: an opening, the stories, what ${esc(clean(a.name) || pName(p))} gave us, and a closing. Words in [brackets] are spots still waiting. Change anything; it prints in the Officiant Script under the eulogy.</p>
      <div class="row"><button type="button" class="btn btn-gold btn-sm" data-fwa="eu-build">${d.trim() ? 'Build It Again From the Answers' : 'Build the Draft'}</button></div>
      <textarea rows="16" class="fw-bigta" data-fwi="eDraft" aria-label="The eulogy" placeholder="Tap Build the Draft, or write here." style="margin-top:10px">${esc(d)}</textarea>
      <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-fwa="eu-copy">Copy</button><button type="button" class="btn btn-line btn-sm" data-fwa="eu-print">Print in Large Type</button></div></section>
      <details class="fw-custom"><summary>Speaking Through Tears</summary><ul class="fw-ref">${EU.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>`;
  }
  return sayBox(p, n < last ? 'Let us write it together. I will ask, and you answer in your own words. Short and true is plenty.' : 'Here is the eulogy as we have it. Let us read it through together.') +
    secNav(n, EUSECS(), 'eu-sec') + (n < last ? `<div class="row" style="margin:6px 0 12px"><button type="button" class="btn btn-line btn-sm" data-fwa="eu-fill">Fill In From the Story Notes</button></div>` : '') + body + storyRef(p) +
    `<div class="fw-nav"><button type="button" class="btn btn-line" data-fwa="eu-sec" data-fwv="${Math.max(0, n - 1)}"${n === 0 ? ' disabled' : ''}>&larr; Back</button><button type="button" class="btn btn-line" data-fwa="sub" data-fwv="">Back to Their Story</button>${n < last ? `<button type="button" class="btn btn-gold" data-fwa="eu-sec" data-fwv="${n + 1}">${n === last - 1 ? 'Build the Draft' : 'Next'} &rarr;</button>` : ''}</div>`;
}
// The Obituary Helper inside the session: the four groups of questions, then the three drafts.
function vOb(p){
  const o = obS(p), n = S.oSec, last = OB.secs.length;
  let body = '';
  if (n < last){ const sec = OB.secs[n];
    body = (n === 0 ? `<section class="fw-blk" data-fwanc="ob-pron"><span class="fw-lbl">Words for them</span>${pronChips(p)}</section>` : '') + sec.qs.map(q => qField(p, 'ob.a', q, o.a[q.id])).join('');
  } else {
    body = `<div class="row" style="margin-bottom:12px"><button type="button" class="btn btn-gold btn-sm" data-fwa="ob-make">${OB.shapes.some(sh => o.d[sh.id]) ? 'Make the Drafts Again' : 'Make the Drafts'}</button><button type="button" class="btn btn-line btn-sm" data-fwa="ob-print">Print All Three</button></div>` +
      OB.shapes.map(sh => { const t = o.d[sh.id] || '', w = wordsIn(t);
        return `<section class="fw-blk" data-fwanc="ob-${sh.id}"><div class="fw-blk-h"><h3>${esc(sh.name)}</h3><span class="fw-sub" id="fw-obn-${sh.id}" style="margin:0">${w} words, aim for about ${sh.words}</span></div><p class="fw-sub">${esc(sh.about)}</p>
        <textarea rows="${sh.words > 300 ? 12 : sh.words > 100 ? 8 : 5}" class="fw-bigta" data-fwi="ob.d.${sh.id}" aria-label="${esc(sh.name)}" placeholder="Tap Make the Drafts.">${esc(t)}</textarea>
        <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-fwa="ob-copy" data-fwv="${sh.id}">Copy</button></div></section>`; }).join('') +
      `<p class="fw-sub">The newspaper draft prints in the Family Copy and goes on the Helpers' Checklist as "to the funeral home." All three fill the Service Builder's Obituary and the Program.</p>
      <details class="fw-custom"><summary>Before You Share It</summary><ul class="fw-ref">${OB.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>`;
  }
  return sayBox(p, n < last ? 'Let us put the obituary together. Answer what you know; we can skip anything and come back.' : 'Here are the drafts. Let us read the newspaper one out loud and check every name and date.') +
    secNav(n, OBSECS(), 'ob-sec') + (n < last ? `<div class="row" style="margin:6px 0 12px"><button type="button" class="btn btn-line btn-sm" data-fwa="ob-fill">Fill In From the Plan</button></div>` : '') + body + storyRef(p) +
    `<div class="fw-nav"><button type="button" class="btn btn-line" data-fwa="ob-sec" data-fwv="${Math.max(0, n - 1)}"${n === 0 ? ' disabled' : ''}>&larr; Back</button><button type="button" class="btn btn-line" data-fwa="sub" data-fwv="">Back to Their Story</button>${n < last ? `<button type="button" class="btn btn-gold" data-fwa="ob-sec" data-fwv="${n + 1}">${n === last - 1 ? 'The Drafts' : 'Next'} &rarr;</button>` : ''}</div>`;
}

V[3] = p => sayBox(p, STEP(3).say) +
  blk(p, list('faithway').title || 'Faith or Plain', 'faithway', chips(p, 'faithway', true), STEP(3).sub) +
  blk(p, list('tradition').title || "The Family's Tradition", 'tradition', chips(p, 'tradition') + addOwn('tradition', 'Another tradition'), list('tradition').sub) +
  blk(p, 'Other Clergy Taking Part', 'clergy', `<div class="fw-lines">${p.clergy.map((c, i) => `<div class="fw-line"><input type="text" data-fwi="clergy.${i}.name" value="${esc(c.name)}" aria-label="Name" placeholder="Name" autocomplete="off"><input type="text" data-fwi="clergy.${i}.role" value="${esc(c.role)}" aria-label="Part they take" placeholder="Part they take" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-fwa="cl-del" data-fwv="${i}">Remove</button></div>`).join('')}</div>` + who(p, 'clergy') + addOwn('clergy', 'Another clergy name')) +
  blk(p, list('customs').title || 'Customs to Honor', 'customs', chips(p, 'customs') + addOwn('customs', 'A custom from their family or church'), list('customs').sub) +
  custom(p, 'faith') + note(p, 'faith');

V[4] = p => sayBox(p, STEP(4).say) +
  blk(p, 'Gatherings', 'gatherings', chips(p, 'gatherings') + addOwn('gatherings', 'Another gathering'), STEP(4).sub) +
  gSel(p).map(g => { const d = p.gd[g.id] || {};
    return `<div class="fw-gath" data-fwanc="g-${esc(g.id)}"><div class="fw-blk-h"><h4>${esc(g.t)}</h4>${star(p, 'g-' + g.id, g.t + ' details')}</div><div class="fw-g3">${fld('gd.' + g.id + '.date', 'Date', d.date, 'date')}${fld('gd.' + g.id + '.time', 'Time', d.time, 'time')}${fld('gd.' + g.id + '.place', 'Place', d.place)}</div>${who(p, 'g-' + g.id)}</div>`; }).join('') +
  custom(p, 'gatherings') + note(p, 'gatherings');

// ---------- Readings, Music, and Rituals (GWG BLD 768): browse, preview, and add to the service in one tap ----------
const LBT = [['scripture', 'Scripture'], ['poem', 'Poems'], ['reading', 'Readings'], ['prayer', 'Prayers'], ['blessing', 'Blessings'], ['music', 'Music'], ['ritual', 'Rituals']];
const MOMS = [['gathering', 'Gathering'], ['during', 'During'], ['reflection', 'Reflection'], ['closing', 'Closing'], ['recessional', 'Recessional'], ['graveside', 'Graveside']];
const FAITHS = ['christian', 'jewish', 'muslim', 'hindu', 'buddhist', 'bahai', 'mixed'], PLAINS = ['plain', 'any', 'spiritual', 'nature', 'uu'];
const lbKind = t => t === 'music' || t === 'ritual' ? t : 'reading';
function faithKind(k, x){
  if (k !== 'reading') return x.faith === 'faith' || x.faith === 'plain' ? x.faith : 'either';
  const f = arr((x.tags || {}).faith), fa = x.kind === 'scripture' || f.some(v => FAITHS.includes(v)), pl = x.kind !== 'scripture' && f.some(v => PLAINS.includes(v));
  return fa && pl ? 'either' : fa ? 'faith' : pl ? 'plain' : 'either';
}
function momentsOf(k, x){
  if (arr(x.moments).length) return arr(x.moments);
  if (k !== 'reading') return [];
  const ty = arr((x.tags || {}).types);
  if (x.kind === 'blessing') return ['closing', 'graveside'];
  if (x.kind === 'prayer') return ['gathering', 'during', 'closing'];
  return ['during', 'reflection'].concat(ty.includes('graveside') ? ['graveside'] : []);
}
function tagsOf(k, x){ if (k !== 'reading') return arr(x.tags).map(String); const t = x.tags || {}; return arr(t.words).concat(arr(t.types).map(v => String(v).replace(/-/g, ' '))); }
const isWed = x => { const f = (x.tags || {}).for; return f === 'wedding'; };
const rTitle = x => x.kind === 'scripture' ? (x.ref || x.title) : x.title;
function rBody(x, ver){ if (x.versions){ const v = x.versions[ver] ? ver : x.versions.kjv ? 'kjv' : Object.keys(x.versions)[0]; return {text: x.versions[v] || '', ver: v}; } return {text: x.text || '', ver: ''}; }
const snip = (t, n) => { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '...' : t; };
function lbAll(p){
  const c = cerBind(); if (!c) return [];
  const cat = c.catalog(hasSvc(p) ? p.svc : null), t = S.lb.type, k = lbKind(t);
  return (k === 'music' ? cat.music : k === 'ritual' ? cat.rituals : cat.readings.filter(r => (r.kind || 'reading') === t && !isWed(r))).map(x => ({k, x}));
}
function lbList(p){
  const q = S.lb.q.trim().toLowerCase(), L = S.lb;
  const pref = plainOf(p) ? (faithOf(p) ? 'plain' : '') : 'faith';
  return lbAll(p).filter(({k, x}) => {
    const fw = faithKind(k, x);
    if (L.faith === 'faith' && fw === 'plain') return false;
    if (L.faith === 'plain' && fw === 'faith') return false;
    if (L.moment !== 'all' && !momentsOf(k, x).includes(L.moment)) return false;
    if (L.tag && !tagsOf(k, x).includes(L.tag)) return false;
    if (L.mine && !x.mine) return false;
    if (q && ![x.title, x.ref, x.by, x.about, x.source, x.text, x.versions && x.versions.kjv, tagsOf(k, x).join(' ')].join(' ').toLowerCase().includes(q)) return false;
    return true;
  }).map(o => Object.assign(o, {fit: (pref && faithKind(o.k, o.x) === pref ? 2 : faithKind(o.k, o.x) === 'either' ? 1 : 0) + (o.x.mine ? 1 : 0)}))
    .sort((a, b) => b.fit - a.fit || String(rTitle(a.x)).localeCompare(String(rTitle(b.x))));
}
const lbKey = (k, id) => k + '|' + id;
function inSvc(p){ const c = cerBind(); return c && hasSvc(p) ? c.inService(p.svc) : []; }
function lbPrev(p, k, x){
  const bible = (CER() && hasSvc(p) && CER().get(p.svc) || {}).bible || 'kjv';
  if (k === 'reading'){ const b = rBody(x, bible);
    return `<div class="fw-prev">${x.bring ? `<p class="fw-note2"><b>Text not included.</b> Bring your own copy; it prints with this credit line.</p>` : `<div class="fw-words fw-read">${esc(b.text)}</div>`}${x.source ? `<p class="fw-src">${esc(x.source)}</p>` : ''}${x.note && !x.bring ? `<p class="fw-sub">${esc(x.note)}</p>` : ''}</div>`; }
  return `<div class="fw-prev">${x.by ? `<p><b>${esc(x.by)}</b></p>` : ''}${x.about ? `<p>${esc(rfill(x.about, p))}</p>` : ''}${arr(x.how).length ? `<div class="fw-lbl">How it goes</div><ol>${x.how.map(h => `<li>${esc(rfill(h, p))}</li>`).join('')}</ol>` : ''}${arr(x.needs).length ? `<div class="fw-lbl">What to bring</div><ul>${x.needs.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
    <p class="fw-sub">${[x.minutes ? 'About ' + x.minutes + ' minutes' : '', momentsOf(k, x).length ? 'Fits: ' + momentsOf(k, x).map(m => (MOMS.find(z => z[0] === m) || [m, m])[1]).join(', ') : '', faithKind(k, x) === 'faith' ? 'Faith' : faithKind(k, x) === 'plain' ? 'Plain' : 'Faith or plain'].filter(Boolean).join(' · ')}</p>${x.source ? `<p class="fw-src">${esc(x.source)}</p>` : ''}</div>`;
}
// In a song's or ritual's words, [Name] is the person being remembered.
const rfill = (t, p) => String(t || '').replace(/\[Name\]/g, called(p) || '[Name]');
function lbRows(p){
  const L = lbList(p), n = 25 + S.lb.more, have = new Set(inSvc(p).map(x => lbKey(x.kind, x.id)));
  if (!L.length) return `<p class="muted">Nothing matches. Try another word or filter, or add your own below.</p>`;
  return L.slice(0, n).map(({k, x}) => { const key = lbKey(k, x.id), on = have.has(key), open = S.lb.open === key;
    const sub = k === 'reading' ? [x.kind === 'scripture' && x.title !== x.ref ? x.title : x.by, x.bring ? '' : snip(rBody(x, 'kjv').text, 90)].filter(Boolean).join(' · ') : [x.by, snip(x.about, 90)].filter(Boolean).join(' · ');
    return `<div class="fw-lbr${on ? ' on' : ''}" data-fwanc="lb-${esc(x.id)}"><div class="fw-lbm"><b>${esc(rTitle(x))}</b>${x.mine ? ' <span class="fw-tag">Mine</span>' : ''}${x.bring ? ' <span class="fw-tag">Text Not Included</span>' : ''}${on ? ' <span class="fw-tag on">In the Service</span>' : ''}<br><small>${esc(sub)}</small></div>
      <div class="fw-lbb"><button type="button" class="btn btn-line btn-sm" data-fwa="lb-prev" data-fwv="${esc(key)}" aria-expanded="${open}"${fk('lp|' + key)}>${open ? 'Close' : 'Preview'}</button>${on ? `<button type="button" class="btn btn-line btn-sm" data-fwa="lb-rm" data-fwv="${esc(key)}"${fk('lr|' + key)}>Take Out</button>` : `<button type="button" class="btn btn-gold btn-sm" data-fwa="lb-add" data-fwv="${esc(key)}"${fk('la|' + key)}>Add to the Service</button>`}</div>
      ${open ? lbPrev(p, k, x) : ''}</div>`; }).join('') + (L.length > n ? `<button type="button" class="btn btn-line btn-sm" data-fwa="lb-more" style="margin-top:8px">Show More (${L.length - n})</button>` : '');
}
function lbTags(p){ const c = {}; lbAll(p).forEach(({k, x}) => tagsOf(k, x).forEach(t => { if (t) c[t] = (c[t] || 0) + 1; })); return Object.keys(c).sort((a, b) => c[b] - c[a] || a.localeCompare(b)).slice(0, 30); }
function lbOwnForm(p){
  const t = S.lb.type, k = lbKind(t), R = k === 'reading';
  return `<details class="fw-custom" id="fw-lb-own"${S.lb.own ? ' open' : ''}><summary>Add Your Own ${esc((LBT.find(x => x[0] === t) || [t, t])[1].replace(/s$/, ''))}</summary>
    <div class="fw-g2">${`<div class="fw-fld"><label class="f" for="fw-lo-title">Title</label><input id="fw-lo-title" type="text" autocomplete="off" placeholder="${k === 'music' ? 'A song they loved' : k === 'ritual' ? 'Lighting a candle for each grandchild' : 'A title'}"></div>`}${t === 'scripture' ? `<div class="fw-fld"><label class="f" for="fw-lo-ref">Reference</label><input id="fw-lo-ref" type="text" autocomplete="off" placeholder="John 14:1 to 3"></div>` : `<div class="fw-fld"><label class="f" for="fw-lo-by">${k === 'music' ? 'Artist or Composer' : 'By'}</label><input id="fw-lo-by" type="text" autocomplete="off" placeholder="${k === 'ritual' ? 'A family custom' : 'Their name, or Traditional'}"></div>`}</div>
    <label class="f" for="fw-lo-text">${R ? 'The Words' : 'About'}</label><textarea id="fw-lo-text" rows="${R ? 6 : 2}" placeholder="${R ? 'Type or paste the words. Leave empty if it is under copyright; it then prints as bring your own copy.' : k === 'music' ? 'When it plays and who sings or plays it. Titles only, never the lyrics.' : 'One or two plain sentences.'}"></textarea>
    ${k === 'ritual' ? `<label class="f" for="fw-lo-how">Steps, One Per Line</label><textarea id="fw-lo-how" rows="4"></textarea><label class="f" for="fw-lo-needs">What to Bring, One Per Line</label><textarea id="fw-lo-needs" rows="2"></textarea>` : ''}
    <label class="f" for="fw-lo-src">Source Line</label><input id="fw-lo-src" type="text" autocomplete="off" placeholder="Author, book, year, or Source unknown">
    <label class="fw-ck" style="margin-top:8px"><input type="checkbox" id="fw-lo-keep"> Keep It in My Pieces for Other Services</label>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-fwa="lb-own">Add It to the Service</button></div></details>`;
}
function piecesPanel(p){
  const L = S.lb, lead = leaders(p), chosen = inSvc(p);
  const chip = (a, v, lab, on) => `<button type="button" class="chip fw-sm" data-fwa="${a}" data-fwv="${esc(v)}" aria-pressed="${on}"${fk(a + '|' + v)}>${esc(lab)}</button>`;
  return `${chosen.length ? `<div class="fw-chosen" data-fwanc="pieces-in"><div class="fw-lbl">In the Service</div><ul class="fw-flist">${chosen.map(x => `<li><span><b>${esc(x.title)}</b>${x.by ? ', ' + esc(x.by) : ''}<br><small class="muted">${esc(x.part)}${x.lead ? ', led by ' + esc(x.lead) : ''}</small></span><span><button type="button" class="linkbtn" data-fwa="lb-rm" data-fwv="${esc(lbKey(x.kind, x.id))}">Take Out</button></span></li>`).join('')}</ul></div>` : ''}
    <div class="fw-chips fw-lbt" role="group" aria-label="Type">${LBT.map(([v, l]) => `<button type="button" class="chip" data-fwa="lb-type" data-fwv="${v}" aria-pressed="${L.type === v}"${fk('lt|' + v)}>${esc(l)}</button>`).join('')}</div>
    <div class="fw-lbf"><div class="fw-fld"><label class="f" for="fw-lbq">Search</label><input id="fw-lbq" type="search" data-fwlq="1" value="${esc(L.q)}" placeholder="A word, a title, a name, or a verse" autocomplete="off"></div>
      <div class="fw-fld"><label class="f" for="fw-lbtag">Tag</label><select id="fw-lbtag" data-fwlt="1"><option value="">Any tag</option>${lbTags(p).map(t => `<option value="${esc(t)}"${t === L.tag ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></div></div>
    <div class="fw-who"><span class="fw-lbl">Faith or plain</span>${[['all', 'All'], ['faith', 'Faith'], ['plain', 'Plain']].map(([v, l]) => chip('lb-faith', v, l, L.faith === v)).join('')}${chip('lb-mine', '1', 'My Pieces Only', L.mine)}</div>
    <div class="fw-who"><span class="fw-lbl">Moment</span>${[['all', 'Any']].concat(MOMS).map(([v, l]) => chip('lb-mom', v, l, L.moment === v)).join('')}</div>
    <div class="fw-place"><div class="fw-who" style="margin-top:0"><span class="fw-lbl">Add it at</span>${[['best', 'Best Fit']].concat(MOMS).map(([v, l]) => chip('lb-place', v, l, L.place === v)).join('')}</div>
      <div class="fw-fld" style="max-width:340px"><label class="f" for="fw-lbby">Who leads</label><input id="fw-lbby" type="text" list="fw-lbleaders" data-fwlby="1" value="${esc(L.by)}" placeholder="${esc(me())}" autocomplete="off"><datalist id="fw-lbleaders">${lead.map(l => `<option value="${esc(l)}">`).join('')}</datalist></div></div>
    <div class="fw-lbl-list" id="fw-lb-list">${lbRows(p)}</div>
    ${lbOwnForm(p)}
    <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-fwa="lb-mypieces">Open My Pieces</button></div>`;
}

V[5] = p => sayBox(p, STEP(5).say) +
  blk(p, 'Order of Service', 'order', svcBlock(p), STEP(5).sub) +
  blk(p, 'Readings, Music, and Rituals', 'pieces', piecesPanel(p), 'Browse together, preview the words, and add any piece to the service in one tap. It goes to the right moment in the order.') +
  blk(p, list('honors').title || 'Honors', 'honors', chips(p, 'honors') + addOwn('honors', 'Another honor') + who(p, 'honors')) +
  custom(p, 'service') + note(p, 'service');

V[6] = p => sayBox(p, STEP(6).say) +
  blk(p, 'Arrangements Checklist', 'tasks', p.tasks.map((k, i) => `<div class="fw-task${k.done ? ' done' : ''}"><label class="fw-ck"><input type="checkbox" data-fwc="tasks.${i}.done"${k.done ? ' checked' : ''}${fk('tk|' + i)}><b>${esc(k.t)}</b></label>
    <input type="text" class="fw-td" data-fwi="tasks.${i}.d" value="${esc(k.d || '')}" aria-label="Details for ${esc(k.t)}" placeholder="Details: names, times, phone numbers" autocomplete="off">${who(p, 'task.' + i, 'Who handles ' + k.t)}</div>`).join('') +
    addOwn('tasks', 'Add a task: guest book, parking, a flight...') +
    (arr(p.famChecked).length ? `<p class="fw-sub">The family already marked ${p.famChecked.length} ${p.famChecked.length === 1 ? 'item' : 'items'} on their own checklist at home.</p>` : ''), STEP(6).sub) +
  blk(p, 'Rehearsal', 'reh', `<div class="fw-g3">${fld('reh.date', 'Date', p.reh.date, 'date')}${fld('reh.time', 'Time', p.reh.time, 'time')}${fld('reh.place', 'Place', p.reh.place)}</div>`) +
  custom(p, 'arrangements') + note(p, 'arrangements');

V[7] = p => sayBox(p, STEP(7).say) +
  `<div class="fw-fam fw-inline"><h2>${esc(pName(p))}'s Farewell</h2><p class="fw-fsub">The plan so far</p>${summary(p)}</div>` +
  blk(p, 'Next Steps', 'next', p.next.map((k, i) => `<div class="fw-task${k.done ? ' done' : ''}"><label class="fw-ck"><input type="checkbox" data-fwc="next.${i}.done"${k.done ? ' checked' : ''}><span>${esc(k.t)}</span></label><button type="button" class="linkbtn" data-fwa="next-del" data-fwv="${i}">Remove</button></div>`).join('') + addOwn('next', 'Add a next step')) +
  blk(p, "The Family's Copy", 'copy', `<p class="fw-sub" style="margin-top:0">${esc(fill(cfg().familyCopyLead, p))}</p><div class="row"><button type="button" class="btn btn-gold btn-sm" data-fwa="out" data-fwv="family">Print the Family Copy</button><button type="button" class="btn btn-line btn-sm" data-fwa="fam-copy">Copy</button><a class="btn btn-line btn-sm" href="${esc(mailHref(p.contact.em, pName(p) + "'s Farewell: the plan", famText(p)))}">Email</a></div>`) +
  custom(p, 'review') + note(p, 'review');

V[8] = p => sayBox(p, STEP(8).say) +
  `<div class="fw-cards">${cfg().outputs.map(o => `<div class="fw-ocard"><h4>${esc(o.title)}</h4><p>${esc(fill(o.lead, p))}</p><div class="row">${o.id === 'order'
    ? (hasSvc(p) ? `<button type="button" class="btn btn-gold btn-sm" data-fwa="cer-print" data-fwv="script">Officiant Script</button><button type="button" class="btn btn-line btn-sm" data-fwa="cer-print" data-fwv="order">Order of Service</button>` : `<button type="button" class="btn btn-line btn-sm" data-fwa="step" data-fwv="5">Set Up the Order of Service</button>`)
    : `<button type="button" class="btn btn-gold btn-sm" data-fwa="out" data-fwv="${esc(o.id)}">Print or Save as PDF</button>${o.id === 'family' ? '<button type="button" class="btn btn-line btn-sm" data-fwa="fam-copy">Copy</button>' : ''}`}</div></div>`).join('')}</div>` +
  blk(p, 'Live in Start a Session', 'sessions', `<p class="fw-sub" style="margin-top:0">Each gathering becomes one of your sessions in Start a Session, to run live on a tablet or phone: the words to say, the next cue, who is speaking, and a quiet timer.</p>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-fwa="make-ses">${arr(p.ses).length ? 'Update the Sessions' : 'Create Sessions'}</button></div>
    ${sesList(p)}`) +
  custom(p, 'outputs') + note(p, 'outputs');

V[9] = p => {
  const T = touches(p), base = mainDate(p);
  const nextT = (T.find(t => !(p.fu[t.id] || {}).done) || {}).id;
  return sayBox(p, STEP(9).say) + (base ? '' : '<p class="fw-sub">Add the date of the main gathering in What Gatherings, and the dates here follow it.</p>') +
  `<div class="fw-tl">${T.map(t => { const f = t.f, st = p.fu[t.id] || {}, em = f.email || {}, cl = f.call || {}, open = S.fuOpen ? S.fuOpen === t.id : t.id === nextT;
    const body = fill(em.body || '', p), sub = fill(em.subject || t.title, p);
    return `<details class="fw-fu${st.done ? ' done' : ''}" data-fwfu="${esc(t.id)}"${open ? ' open' : ''}><summary><span class="fw-dot" aria-hidden="true"></span><b>${esc(t.title)}</b><span class="fw-when">${t.date ? esc(nice(t.date)) : f.anchor === 'birthday' ? 'Add the birth date in Welcome' : ''}${st.done ? ' &middot; Done' : ''}</span></summary><div class="fw-fu-in">
      ${t.own ? '' : `<div class="fw-box"><h4>Ready-to-Send Email</h4><div class="fw-words">${esc(body)}</div><div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-fwa="fu-copy" data-fwv="${esc(t.id)}">Copy</button><a class="btn btn-line btn-sm" href="${esc(mailHref(p.contact.em, sub, body))}">Open in Mail</a></div></div>
      <div class="fw-box"><h4>Phone Call</h4>${cl.open ? `<div class="fw-lbl">Opening</div><p>"${esc(fill(cl.open, p))}"</p>` : ''}${arr(cl.questions).length ? `<div class="fw-lbl">Gentle questions</div><ul>${cl.questions.map(q => `<li>${esc(fill(q, p))}</li>`).join('')}</ul>` : ''}${cl.listenFor ? `<div class="fw-lbl">Listen for</div><p>${esc(fill(cl.listenFor, p))}</p>` : ''}${cl.moreSupport ? `<div class="fw-lbl">When to suggest more support</div><p>${esc(fill(cl.moreSupport, p))}</p>` : ''}<div class="fw-crisis">${esc(cfg().crisis)}</div></div>
      ${f.resource ? `<div class="fw-box fw-full"><h4>Resource to Share</h4><p>${esc(fill(f.resource, p))}</p></div>` : ''}`}
      <div class="fw-box fw-full"><label class="fw-ck"><input type="checkbox" data-fwc="fu.${esc(t.id)}.done"${st.done ? ' checked' : ''}> Done</label><textarea rows="2" data-fwi="fu.${esc(t.id)}.note" aria-label="Note for ${esc(t.title)}" placeholder="How it went, a few words">${esc(st.note || '')}</textarea>${t.own ? `<button type="button" class="linkbtn" data-fwa="fu-del" data-fwv="${esc(t.id)}">Remove This Check-In</button>` : ''}</div>
    </div></details>`; }).join('')}</div>
  <section class="fw-blk"><h3>Add Your Own Check-In</h3><div class="fw-g3"><div class="fw-fld"><label class="f" for="fw-fuo-t">What</label><input type="text" id="fw-fuo-t" placeholder="A hard date, a grandchild's graduation..." autocomplete="off"></div><div class="fw-fld"><label class="f" for="fw-fuo-d">Date</label><input type="date" id="fw-fuo-d"></div><div class="fw-fld" style="align-self:end"><button type="button" class="btn btn-line btn-sm" data-fwa="fu-add">Add Your Own</button></div></div></section>` +
  custom(p, 'followup') + note(p, 'followup');
};

function vTidy(p){
  const ns = cfg().steps.map((s, i) => ({s, n: i + 1})).filter(x => (p.notes[x.s.id] || '').trim());
  const marked = ns.filter(x => p.tidy[x.s.id]), rest = ns.filter(x => !p.tidy[x.s.id]);
  const row = x => `<section class="fw-blk"><div class="fw-blk-h"><h3>${esc(x.s.title)}</h3><span class="row"><button type="button" class="btn btn-line btn-sm" data-fwa="step" data-fwv="${x.n}">Go to Step ${x.n}</button>${p.tidy[x.s.id] ? `<button type="button" class="btn btn-gold btn-sm" data-fwa="tidy" data-fwv="${x.s.id}">Tidied</button>` : ''}</span></div><textarea rows="3" data-fwi="notes.${x.s.id}" aria-label="Note for ${esc(x.s.title)}">${esc(p.notes[x.s.id])}</textarea></section>`;
  return `<p class="fw-sub" style="margin-top:0">After the meeting: the quick notes you marked Tidy Up Later, then every other note.</p>` +
    (marked.length ? marked.map(row).join('') : '<p class="muted">Nothing marked to tidy. Every note is below.</p>') +
    (rest.length ? `<h3 style="margin-top:18px">Other Notes</h3>${rest.map(row).join('')}` : '');
}

// ---------- the plan as words: summary, family copy ----------
function gLine(p, g){ const d = p.gd[g.id] || {}; return [short(d.date), tm(d.time)].filter(Boolean).join(', ') + (d.place ? ' · ' + d.place : ''); }
function order(p){ return hasSvc(p) ? CER().words(p.svc) : []; }
function lifeLine(p){ const b = parseDay(p.person.born), d = parseDay(p.person.died); return [b ? nice(b) : p.person.born, d ? nice(d) : p.person.died].filter(Boolean).join(' to '); }
function summary(p){
  const fs = (h, x) => `<div class="fw-fsec" data-fwanc="sum-${esc(h.toLowerCase().replace(/[^a-z]+/g, '-'))}"><h3>${esc(h)}</h3>${x}</div>`, ul = a => `<ul class="fw-flist">${a.join('')}</ul>`, li = (a, b) => `<li><span>${a}</span><span>${b || ''}</span></li>`;
  const o = order(p), fw = picked(p, 'faithway').concat(picked(p, 'tradition'));
  return fs('Remembering', `<p class="fw-big">${esc(p.person.full || called(p) || 'Name to come')}${called(p) && p.person.full ? `<br>"${esc(called(p))}"` : ''}${lifeLine(p) ? `<br><span class="fw-soft">${esc(lifeLine(p))}</span>` : ''}</p>`) +
    (fw.length ? fs('The Service Will Be', `<p class="fw-big">${esc(fw.join(', '))}</p>`) : '') +
    (gSel(p).length ? fs('Gatherings', ul(gSel(p).map(g => li(esc(g.t), esc(gLine(p, g)))))) : '') +
    (o.length ? fs('Order of Service', ul(o.map(r => li(esc(r.name) + (r.rd.length ? ': <em>' + esc(r.rd.map(x => x.head).join('; ')) + '</em>' : ''), r.mins + ' min')).concat(li('<b>About</b>', '<b>' + svcTotal(p) + ' min</b>')))) : '') +
    (p.speakers.length ? fs('Family Speakers', ul(p.speakers.map(s => li(esc(s.name), (+s.min || 0) + ' min')))) : '') +
    (picked(p, 'honors').length ? fs('Honors', `<p class="fw-big">${esc(picked(p, 'honors').join(', '))}</p>`) : '') +
    (picked(p, 'customs').length ? fs('Customs to Honor', `<p class="fw-big">${esc(picked(p, 'customs').join(', '))}</p>`) : '') +
    (p.reh.date || p.reh.place ? fs('Rehearsal', `<p class="fw-big">${esc([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', '))}${p.reh.place ? `<br><span class="fw-soft">${esc(p.reh.place)}</span>` : ''}</p>`) : '');
}
// Who sends the obituary: the person tagged on the Obituary, else the one on the "Obituary to the paper" task, else the family.
function obWho(p){ const t = p.tasks.find(x => x.id === 'obituary'); return p.tags.obit || (t && t.who) || 'Family'; }
function famText(p){
  const o = order(p), out = [fill(cfg().familyCopyLead, p), '', 'REMEMBERING', (p.person.full || called(p)) + (called(p) && p.person.full ? ' ("' + called(p) + '")' : ''), lifeLine(p)];
  const fw = picked(p, 'faithway').concat(picked(p, 'tradition')); if (fw.length) out.push('', 'THE SERVICE WILL BE', fw.join(', '));
  if (gSel(p).length) out.push('', 'GATHERINGS', ...gSel(p).map(g => g.t + (gLine(p, g) ? ': ' + gLine(p, g) : '')));
  if (o.length) out.push('', 'ORDER OF SERVICE (about ' + svcTotal(p) + ' minutes)', ...o.map((r, i) => (i + 1) + '. ' + r.name + (r.by ? ', ' + r.by : '') + (r.rd.length ? ' (' + r.rd.map(x => x.head).join('; ') + ')' : '')));
  if (p.speakers.length) out.push('', 'FAMILY SPEAKERS', ...p.speakers.map(s => s.name + ', about ' + (+s.min || 0) + ' minutes'));
  if (picked(p, 'honors').length) out.push('', 'HONORS', picked(p, 'honors').join(', '));
  if (p.reh.date || p.reh.place) out.push('', 'REHEARSAL', [nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', '));
  const nx = p.next.filter(x => !x.done); if (nx.length) out.push('', 'NEXT STEPS', ...nx.map(x => '* ' + x.t));
  const ob = obitText(p); if (ob) out.push('', 'THE OBITUARY: ' + ob.name.toUpperCase(), ob.text);
  out.push('', 'With you,', me());
  return out.filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ---------- Family View (its own window, or here to tilt the laptop) ----------
const fChips = (p, id) => `<div class="fw-fchips">${items(p, id).map(o => `<span class="fw-fchip${isOn(p, id, o.id) ? ' on' : ''}">${isOn(p, id, o.id) ? '&#10003; ' : ''}${esc(fill(o.t, p))}</span>`).join('')}</div>`;
const fsec = (h, x, k) => `<div class="fw-fsec"${k ? ` data-fwanc="${esc(k)}"` : ''}><h3>${esc(h)}</h3>${x}</div>`;
const FV = {};
FV[1] = p => fsec(list('who').title || 'Who Is Here', fChips(p, 'who'), 'who') + fsec('Remembering', `<p class="fw-big">${esc(p.person.full || called(p) || '')}${called(p) && p.person.full ? `<br>"${esc(called(p))}"` : ''}${lifeLine(p) ? `<br><span class="fw-soft">${esc(lifeLine(p))}</span>` : ''}</p>`, 'name');
FV[2] = p => fsec('Their Story', fChips(p, 'story'), 'story') + fsec('The Eulogy', fChips(p, 'eulogy') + (String(p.eDraft || '').trim() ? `<p class="fw-soft" style="margin-top:8px">${esc(readTime(p.eDraft))}</p>` : ''), 'eulogy') + (obitText(p) ? fsec('The Obituary', `<p class="fw-big">${esc(obitText(p).name)}, ready to read together</p>`, 'obit') : '') + (p.speakers.length ? fsec('Family Speakers', `<ul class="fw-flist">${p.speakers.map(s => `<li><span>${esc(s.name)}</span><span>${+s.min || 0} min</span></li>`).join('')}</ul>`, 'speakers') : '');
FV[3] = p => fsec('Faith or Plain', fChips(p, 'faithway'), 'faithway') + fsec('Tradition', fChips(p, 'tradition'), 'tradition') + fsec('Customs to Honor', fChips(p, 'customs'), 'customs');
FV[4] = p => fsec('Gatherings', fChips(p, 'gatherings'), 'gatherings') + gSel(p).map(g => fsec(g.t, `<p class="fw-big">${esc(gLine(p, g) || 'Date and place to come')}</p>`, 'g-' + g.id)).join('');
FV[5] = p => { const o = order(p), ch = inSvc(p), L = lbList(p).slice(0, 12), op = S.lb.open;
  const openX = op ? lbAll(p).find(({k, x}) => lbKey(k, x.id) === op) : null;
  return (o.length ? fsec('Order of Service', `<ul class="fw-flist">${o.map(r => `<li><span>${esc(r.name)}${r.rd.length ? ': <em>' + esc(r.rd.map(x => x.head).join('; ')) + '</em>' : ''}</span><span>${r.mins} min</span></li>`).join('')}<li><span><b>About</b></span><span><b>${svcTotal(p)} min</b></span></li></ul>`, 'order') : fsec('Order of Service', '<p class="fw-big fw-soft">Coming together now.</p>', 'order')) + fsec('Honors', fChips(p, 'honors'), 'honors') +
    fsec('Readings, Music, and Rituals', (ch.length ? `<ul class="fw-flist">${ch.map(x => `<li><span>&#10003; <b>${esc(x.title)}</b>${x.by ? ', ' + esc(x.by) : ''}</span><span>${esc(x.part)}</span></li>`).join('')}</ul>` : '<p class="fw-big fw-soft">Nothing chosen yet.</p>') +
      `<h3 style="margin-top:16px">${esc((LBT.find(t => t[0] === S.lb.type) || ['', ''])[1])} to Choose From</h3><ul class="fw-flist">${L.map(({k, x}) => `<li class="${S.lb.open === lbKey(k, x.id) ? 'fw-cur' : ''}"><span><b>${esc(rTitle(x))}</b>${x.by && k !== 'reading' ? '<br><span class="fw-soft">' + esc(x.by) + '</span>' : x.by ? ', ' + esc(x.by) : ''}</span><span>${ch.some(c => c.kind === k && c.id === x.id) ? '&#10003; Chosen' : ''}</span></li>`).join('')}</ul>`, 'pieces') +
    (openX ? fsec(rTitle(openX.x), lbPrev(p, openX.k, openX.x), 'lb-' + openX.x.id) : ''); };
FV[6] = p => fsec('Getting Ready', `<ul class="fw-flist">${p.tasks.map(k => `<li><span>${k.done ? '&#10003; ' : ''}${esc(k.t)}</span><span>${k.done ? 'Done' : ''}</span></li>`).join('')}</ul>`, 'tasks') + (p.reh.date ? fsec('Rehearsal', `<p class="fw-big">${esc([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', '))}</p>`, 'reh') : '');
FV[7] = p => summary(p);
FV[8] = p => fsec("What You'll Receive", `<ul class="fw-flist">${cfg().outputs.map(o => `<li><span>${esc(o.title)}</span><span></span></li>`).join('')}</ul>`);
FV[9] = p => fsec('Staying in Touch This Year', `<ul class="fw-flist">${touches(p).filter(t => !t.own).map(t => `<li><span>${esc(t.title)}</span><span>${esc(short(t.date))}</span></li>`).join('')}</ul>`);
// The helpers in the Family View: the prompts large, with what has been said so far, so the family can answer together.
function famHelper(p, k){
  const H = k === 'eulogy' ? EU : OB, n = k === 'eulogy' ? S.eSec : S.oSec, a = k === 'eulogy' ? euA(p) : obS(p).a, base = k === 'eulogy' ? 'eu' : 'ob';
  if (n < H.secs.length){ const sec = H.secs[n];
    return `<p class="fw-fsub">${esc(k === 'eulogy' ? 'The Eulogy' : 'The Obituary')} &middot; Part ${n + 1} of ${H.secs.length + 1}</p><h2>${esc(sec.title)}</h2>${sec.sub ? `<p class="fw-soft" style="font-size:.8em;margin:0 0 14px">${esc(sec.sub)}</p>` : ''}` +
      sec.qs.map(q => fsec(fillQ(p, q.l), `${q.h ? `<p class="fw-soft" style="margin:0 0 8px">${esc(fillQ(p, q.h))}</p>` : ''}<p class="fw-big fw-ans">${clean(a[q.id]) ? esc(a[q.id]).replace(/\n/g, '<br>') : '<span class="fw-soft">&hellip;</span>'}</p>`, base + '-' + q.id)).join(''); }
  if (k === 'eulogy') return `<p class="fw-fsub">The Eulogy</p><h2>The Draft</h2>` + fsec(String(p.eDraft || '').trim() ? readTime(p.eDraft) : 'Coming together now', `<div class="fw-read">${paras(p.eDraft || '')}</div>`, 'eu-draft');
  const o = obS(p); return `<p class="fw-fsub">The Obituary</p><h2>The Drafts</h2>` + OB.shapes.map(sh => fsec(sh.name, String(o.d[sh.id] || '').trim() ? `<div class="fw-read">${paras(o.d[sh.id])}</div>` : '<p class="fw-big fw-soft">Coming together now.</p>', 'ob-' + sh.id)).join('');
}
function famBody(p){
  const n = typeof S.step === 'number' ? S.step : 7, st = STEP(n);
  if (n === 2 && S.sub) return `<div class="fw-fam"><p class="fw-fsub">For ${esc(pName(p))}</p>${famHelper(p, S.sub)}</div>`;
  return `<div class="fw-fam"><p class="fw-fsub">For ${esc(pName(p))}</p><h2>${esc(st.title)}</h2>${FV[n](p)}</div>`;
}
const FCSS = `:root{--bg:#F6F0E4;--card:#FFFCF6;--ink:#2A1C12;--soft:#6B5A4D;--line:#DDD0B8;--gold:#8B5E1A;--on:#2E2118;--onink:#F4EBDA;}
@media (prefers-color-scheme: dark){:root{--bg:#18120D;--card:#231A13;--ink:#F2EADC;--soft:#BFB09A;--line:#3A2E23;--gold:#D9A847;--on:#D9A847;--onink:#1A130D;}}
*{box-sizing:border-box;}html,body{margin:0;}body{background:var(--bg);color:var(--ink);font-family:Barlow,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.45;}
main{max-width:980px;margin:0 auto;padding:36px 28px 60px;}
.fw-fam h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:2.4em;line-height:1.1;margin:.1em 0 .5em;}
.fw-fsub{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:.8em;}
.fw-fsec{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 22px;margin:0 0 16px;}
.fw-fsec h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}
.fw-fchips{display:flex;flex-wrap:wrap;gap:10px;}.fw-fchip{border:1.5px solid var(--line);border-radius:30px;padding:10px 18px;color:var(--soft);}
.fw-fchip.on{background:var(--on);border-color:var(--on);color:var(--onink);font-weight:600;}
.fw-flist{list-style:none;margin:0;padding:0;}.fw-flist li{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:9px 0;}.fw-flist li:first-child{border-top:0;}
.fw-flist li span:last-child{color:var(--soft);text-align:right;white-space:nowrap;}
.fw-big{font-size:1.2em;margin:0;}.fw-soft{color:var(--soft);font-size:.8em;}
.fw-top{display:flex;justify-content:space-between;align-items:center;gap:12px;color:var(--soft);font-size:.7em;border-bottom:1px solid var(--line);padding:10px 28px;}
.fw-fsec h3 + .fw-flist{margin-top:0;}.fw-read{white-space:pre-wrap;font-family:"Cormorant Garamond",Georgia,serif;font-size:1.15em;line-height:1.5;}.fw-read p{margin:0 0 .7em;}
.fw-prev p{margin:.2em 0 .5em;}.fw-prev ol,.fw-prev ul{margin:.2em 0 .6em;padding-left:1.2em;}.fw-src{font-style:italic;color:var(--soft);font-size:.75em;}.fw-lbl{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--soft);font-size:.65em;margin-top:.6em;}
.fw-flist li.fw-cur{background:color-mix(in srgb,var(--gold) 16%,transparent);border-radius:10px;padding-left:10px;padding-right:10px;}.fw-ans{overflow-wrap:anywhere;}.fw-words{white-space:pre-wrap;}
.fw-top label{display:flex;gap:6px;align-items:center;}
@media(max-width:600px){body{font-size:18px;}main{padding:20px 16px 40px;}.fw-flist li{flex-wrap:wrap;}.fw-flist li span:last-child{white-space:normal;}}`;
let famWin = null, famT = null;
function famPage(p){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Family View</title><link rel="stylesheet" href="${fonts}"><style>${FCSS}</style></head><body><div class="fw-top"><span>Grow With Grounded</span><span>Family View</span></div><main id="fv">${famBody(p)}</main></body></html>`;
}
function openFam(){
  const p = plan(); if (!p) return;
  let w = null; try { w = window.open('', 'gg-fw-family', 'width=1100,height=820'); } catch (e) { w = null; }
  if (!w){ toast('Your browser kept the window from opening. Showing the Family View here instead.'); S.mode = 'family'; rerender(); return; }
  famWin = w;
  try { if (!w.document.getElementById('fv')){ w.document.open(); w.document.write(famPage(p)); w.document.close(); } else pushFam(true); w.focus(); } catch (e) {}
  API.famWin = w; setTimeout(syncFam, 120);
}
function pushFam(now){
  clearTimeout(famT);
  const go = () => { const p = plan(); if (!p || !famWin || famWin.closed) return; try { const el = famWin.document.getElementById('fv'); if (el){ el.innerHTML = famBody(p); syncFam(); } } catch (e) {} };
  if (now) go(); else famT = setTimeout(go, 200);
}
// Follow My Scroll (GWG BLD 768): the family window follows this window's place by section, so it lines up even though
// the Family View is larger. The section at the top of this window is found in the family window, at the same share of the way through it.
function syncFam(){
  if (!S.follow || !famWin || famWin.closed || !S.on || !S.id) return;
  let fd, fw = famWin; try { fd = fw.document; if (!fd || !fd.getElementById('fv')) return; } catch (e){ return; }
  const main = document.getElementById('fw-main'); if (!main) return;
  const de = document.documentElement, top = ((document.querySelector('header.bar') || {}).offsetHeight || 0) + 12;
  const fmax = Math.max(0, fd.documentElement.scrollHeight - fw.innerHeight), myMax = Math.max(0, de.scrollHeight - window.innerHeight);
  const F = {}; fd.querySelectorAll('[data-fwanc]').forEach(el => { if (!F[el.dataset.fwanc]) F[el.dataset.fwanc] = el; });
  const A = [...main.querySelectorAll('[data-fwanc]')];
  let i = -1; A.forEach((a, j) => { if (a.getBoundingClientRect().top <= top) i = j; });
  let target = null;
  for (let j = i; j >= 0; j--){ const a = A[j], f = F[a.dataset.fwanc]; if (!f) continue;
    const r = a.getBoundingClientRect(), frac = Math.max(0, Math.min(1, (top - r.top) / Math.max(1, r.height)));
    target = f.getBoundingClientRect().top + fw.scrollY + frac * f.offsetHeight - 16; break; }
  if (target == null) target = myMax ? window.scrollY / myMax * fmax : 0;
  if (window.scrollY <= 2) target = 0; else if (myMax && window.scrollY >= myMax - 2) target = fmax;
  target = Math.max(0, Math.min(fmax, Math.round(target)));
  try { fw.scrollTo(0, target); } catch (e) {}
  API.lastSync = {target, i, key: i >= 0 ? A[i].dataset.fwanc : null};
}
let syncRaf = 0;
window.addEventListener('scroll', () => { if (!famWin || famWin.closed || !S.follow) return; if (syncRaf) return; syncRaf = requestAnimationFrame(() => { syncRaf = 0; syncFam(); }); }, {passive: true});

// ---------- Phone Mode ----------
function vPhone(p){
  const n = typeof S.step === 'number' ? S.step : 1, L = arr(STEP(n).phoneLines);
  if (n === 2 && S.sub){ const H = S.sub === 'eulogy' ? EU : OB, i = S.sub === 'eulogy' ? S.eSec : S.oSec, sec = H.secs[i];
    return `<div class="fw-phone"><div class="fw-ph-h"><span aria-hidden="true">&#9742;</span> Read each question aloud and type what they say in ${esc(me())}'s View.</div>${sec ? `<h3>${esc(sec.title)}</h3><ol>${sec.qs.map(q => `<li><h3>${esc(fillQ(p, q.l))}</h3><p>${esc(fillQ(p, q.h || ''))}</p></li>`).join('')}</ol>` : `<p>${esc(S.sub === 'eulogy' ? 'Read the draft aloud slowly, and ask what they would change.' : 'Read the newspaper draft aloud slowly, and check every name and date.')}</p>`}</div>`; }
  const pick = n === 5 ? lbList(p).slice(0, 8) : [];
  return `<div class="fw-phone"><div class="fw-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, one at a time. Pause after each.</div><ol>${L.map(x => `<li><h3>${esc(fill(x[0], p))}</h3><p>${esc(fill(x[1], p, {Minutes: svcTotal(p) || 'thirty to forty'}))}</p></li>`).join('')}</ol>
    ${pick.length ? `<h3 style="margin-top:6px">${esc((LBT.find(t => t[0] === S.lb.type) || ['', ''])[1])} to Read Aloud</h3><p class="fw-sub">A few choices with a short line each. Change the list in ${esc(me())}'s View.</p><ol>${pick.map(({k, x}) => `<li><h3>${esc(rTitle(x))}${x.by && x.kind !== 'scripture' ? ', ' + esc(x.by) : ''}</h3><p>${esc(snip(k === 'reading' ? (x.about && x.kind === 'scripture' ? x.about : (x.bring ? 'Text not included; we would bring a copy.' : rBody(x, 'kjv').text)) : x.about, 140))}</p></li>`).join('')}</ol>` : ''}
    ${n === 9 ? `<div class="fw-crisis">${esc(cfg().crisis)}</div>` : ''}</div>`;
}

// ---------- printouts (the Field Guide's own print path: fgSheet) ----------
const H = s => esc(s);
const paras = t => String(t || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean).map(x => `<p>${esc(x).replace(/\n/g, '<br>')}</p>`).join('');
function sheet(html, title, file){
  const body = (C.ph ? C.ph('Farewell Planning Session') : '') + html + (C.pf ? C.pf() : '');
  API.last = {title, html: body};
  if (C.sheet) C.sheet(body, title, {file});
}
const blkT = (p, b) => fill(b.t != null ? b.t : (plainOf(p) ? b.plain : b.faith) || (plainOf(p) ? '' : b.plain) || '', p);
const headLine = p => [p.person.full || called(p), lifeLine(p)].filter(Boolean).join(', ');
function gFor(p, id){ const g = gSel(p).find(x => x.id === id); return g ? Object.assign({}, g, p.gd[g.id] || {}) : null; }
function committalBlocks(p){
  const sc = cfg().scripts, faith = !plainOf(p), B = arr(faith ? sc.committalFaith : sc.committalPlain).slice();
  const hon = picked(p, 'honors'); if (hon.length && B.length) B.splice(B.length - 1, 0, {h: 'Honors', t: hon.join(', ') + '. The honor guard leads; the officiant steps back and waits.', cue: true});
  return {B, src: faith ? (sc.sources || {}).committalFaith : (sc.sources || {}).committalPlain};
}
function outHTML(p, k){
  const o = order(p), gs = gFor(p, 'graveside') || gFor(p, 'burial');
  const meta = (g) => g ? `<p><b>${H([nice(g.date), tm(g.time)].filter(Boolean).join(', '))}</b>${g.place ? ' · ' + H(g.place) : ''}</p>` : '';
  if (k === 'committal'){ const {B, src} = committalBlocks(p);
    return [`<h1>Graveside Committal</h1><p>${H(headLine(p))}</p>${meta(gs)}` + B.map(b => `<h2>${H(b.h)}</h2>${paras(b.cue ? b.t : blkT(p, b))}`).join('') + (src ? `<p style="font-style:italic;font-size:9pt;margin-top:4mm">${H(src)}</p>` : ''), 'Graveside Committal Script', 'graveside-committal'];
  }
  if (k === 'rehearsal'){
    const cues = o.map((r, i) => `<tr><td>${i + 1}</td><td>${H(r.name)}</td><td>${H(r.by || me())}</td><td>${r.mins}</td><td>${H(o[i + 1] ? 'Next: ' + o[i + 1].name + (o[i + 1].by ? ', ' + o[i + 1].by : '') : 'The end of the service')}</td></tr>`).join('');
    const tk = id => (p.tasks.find(t => t.id === id) || {}).d || '';
    return [`<h1>Rehearsal Plan</h1><p>${H(headLine(p))}</p><p><b>${H([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', ') || 'Date to set')}</b>${p.reh.place ? ' · ' + H(p.reh.place) : ''}</p>` +
      `<div class="fw-2c">${arr(cfg().scripts.rehearsal).map(b => `<div class="fw-ps"><h3>${H(b.h)}${b.min ? ` <small>(${b.min} min)</small>` : ''}</h3>${paras(blkT(p, b))}</div>`).join('')}</div>` +
      (o.length ? `<h2>Cues, in Order</h2><table class="fw-pt"><tr><th>#</th><th>Part</th><th>Who</th><th>Min</th><th>Cue</th></tr>${cues}</table>` : '') +
      (p.speakers.length ? `<p><b>Speakers:</b> ${p.speakers.map(s => H(s.name) + ', about ' + (+s.min || 0) + ' minutes').join('; ')}</p>` : '') +
      ([['readers', 'Readers'], ['ushers', 'Ushers'], ['pallbearers', 'Pallbearers']].filter(x => tk(x[0])).map(x => `<p><b>${x[1]}:</b> ${H(tk(x[0]))}</p>`).join('')), 'Rehearsal Plan', 'rehearsal-plan'];
  }
  if (k === 'family'){
    const sec = (h, x) => x ? `<div class="fw-ps"><h3>${H(h)}</h3>${x}</div>` : '', ln = a => a.filter(Boolean).map(x => `<p>${x}</p>`).join('');
    const fw = picked(p, 'faithway').concat(picked(p, 'tradition')), nx = p.next.filter(x => !x.done), ob = obitText(p);
    return [`<h1>${H(pName(p))}'s Farewell</h1><p><i>${H(fill(cfg().familyCopyLead, p))}</i></p><div class="fw-2c">` +
      sec('Remembering', ln([H((p.person.full || called(p)) + (called(p) && p.person.full ? ' ("' + called(p) + '")' : '')), H(lifeLine(p))])) +
      sec('The Service Will Be', fw.length ? ln([H(fw.join(', '))]) : '') +
      sec('Gatherings', ln(gSel(p).map(g => '<b>' + H(g.t) + '</b>' + (gLine(p, g) ? ': ' + H(gLine(p, g)) : '')))) +
      sec('Order of Service, About ' + svcTotal(p) + ' Minutes', o.length ? `<ol>${o.map(r => `<li>${H(r.name)}${r.by ? ', ' + H(r.by) : ''}${r.rd.length ? ' <i>(' + H(r.rd.map(x => x.head).join('; ')) + ')</i>' : ''}</li>`).join('')}</ol>` : '') +
      sec('Family Speakers', ln(p.speakers.map(x => H(x.name) + ', about ' + (+x.min || 0) + ' minutes'))) +
      sec('Honors', ln([H(picked(p, 'honors').join(', '))])) + sec('Customs to Honor', ln([H(picked(p, 'customs').join(', '))])) +
      sec('Rehearsal', (p.reh.date || p.reh.place) ? ln([H([nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', '))]) : '') +
      sec('Next Steps', nx.length ? `<ul>${nx.map(x => `<li>${H(x.t)}</li>`).join('')}</ul>` : '') +
      `</div>` + (ob ? `<div class="fw-ps" style="margin-top:3mm"><h3>The Obituary: ${H(ob.name)}</h3><p style="font-size:9pt;font-style:italic">${H(obWho(p))} sends this to the funeral home. Read it aloud together first and check every name and date.</p>${paras(ob.text)}</div>` : '') + `<p>With you,<br>${H(me())}</p>`, 'Family Copy', 'family-copy'];
  }
  if (k === 'helpers'){
    const by = {}; p.tasks.forEach(t => { const w = t.who || 'Not yet assigned'; (by[w] = by[w] || []).push((t.done ? '[x] ' : '[ ] ') + t.t + (t.d ? ': ' + t.d : '')); });
    gSel(p).forEach(g => { const w = p.tags['g-' + g.id]; if (w) (by[w] = by[w] || []).push('[ ] ' + g.t + (gLine(p, g) ? ': ' + gLine(p, g) : '')); });
    const ob = obitText(p);
    [['eulogy', 'The eulogy'], ['obit', ob ? '' : 'The obituary'], ['honors', 'Honors: ' + picked(p, 'honors').join(', ')], ['clergy', 'Other clergy']].forEach(([key, t]) => { const w = p.tags[key]; if (w && t) (by[w] = by[w] || []).push('[ ] ' + t); });
    if (ob){ const w = obWho(p); (by[w] = by[w] || []).push('[ ] The obituary to the funeral home: the ' + ob.name + ', about ' + wordsIn(ob.text) + ' words (the full text is in the Family Copy)'); }
    return [`<h1>Helpers' Checklist</h1><p>${H(headLine(p))}</p>` + `<div class="fw-2c">${Object.keys(by).map(w => `<div class="fw-ps"><h3>${H(w)}</h3><ul>${by[w].map(x => `<li>${H(x)}</li>`).join('')}</ul></div>`).join('')}</div>`, "Helpers' Checklist", 'helpers-checklist'];
  }
  if (k === 'other'){
    const sc = cfg().scripts, G = gSel(p).filter(g => g.script && g.script !== 'committal' && !g.main && sc[g.script]);
    return [`<h1>Other Gatherings</h1><p>${H(headLine(p))}</p>` + (G.length ? G.map(g => { const x = sc[g.script], d = p.gd[g.id] || {};
      return `<h2>${H(g.t)}</h2>${meta(Object.assign({}, d))}${x.lead ? `<p><i>${H(fill(x.lead, p))}</i></p>` : ''}${p.tags['g-' + g.id] ? `<p>Handled by: ${H(p.tags['g-' + g.id])}</p>` : ''}<ul>${arr(x.blocks).map(b => `<li><b>${H(b.h)}</b>${b.min ? ` (${b.min} min${b.who ? ', ' + H(b.who === 'Chris' ? me() : b.who) : ''})` : ''}: ${H(blkT(p, b))}</li>`).join('')}</ul>`; }).join('') : '<p>Choose a visitation, prayer service, scattering, celebration of life, or reception in What Gatherings.</p>'), 'Other Gatherings Plans', 'other-gatherings'];
  }
  return null;
}
const PCSS = `<style>.fw-pt{border-collapse:collapse;width:100%;font-size:9pt;}.fw-pt td,.fw-pt th{border-bottom:.5pt solid #DDD0B8;padding:.6mm 1.5mm;text-align:left;vertical-align:top;}
.fw-2c{columns:2;column-gap:7mm;}.fw-ps{break-inside:avoid;margin:0 0 2.5mm;}.fw-ps h3{margin:0 0 .8mm !important;}.fw-ps p,.fw-ps li{margin:0 0 .6mm !important;}.fw-ps ol,.fw-ps ul{margin:0;padding-left:5mm;}</style>`;
function printOut(k){ const p = plan(); if (!p) return; const r = outHTML(p, k); if (r) sheet(PCSS + r[0], r[1], r[2]); }

// ---------- Start a Session: each gathering becomes one of your sessions (DATA.ses.list, sessions.js shape) ----------
const DEBRIEF = 'Take five minutes for the After-Session Debrief.';
const sesId = (p, k) => 'fw-' + p.id + '-' + k;
const splitSay = t => String(t || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
function sesGuides(p){
  const out = [], P = pName(p), sc = cfg().scripts, cueOf = (L, i) => L[i + 1] ? 'Next cue: ' + L[i + 1].t + (L[i + 1].by ? ', ' + L[i + 1].by : '') + '.' : 'Next cue: the end. Thank everyone and close.';
  const mk = (key, t, g, steps, purpose, prep) => { const mins = steps.reduce((a, s) => a + (+s.m || 0), 0);
    out.push({id: sesId(p, key), cat: 'ceremony', service: 'officiant', title: P + ': ' + t, length: 'About ' + mins + ' minutes', purpose, prep: prep || [], bring: ['This plan, printed, as a backup'],
      steps: steps.map((s, i) => { const o = {t: s.t, m: s.m || 0}; if (s.say && s.say.length) o.say = s.say; o.do = [s.by ? 'Speaking: ' + s.by : 'Speaking: ' + me()].concat(s.do || []); o.tip = cueOf(steps, i); return o; }),
      after: [DEBRIEF], debrief: true}); };
  const when = g => [nice(g.date), tm(g.time), g.place].filter(Boolean).join(', ');
  gSel(p).forEach(g0 => { const g = Object.assign({}, g0, p.gd[g0.id] || {});
    if (g.main && hasSvc(p)){
      const W = CER().words(p.svc), ed = eulogyText(p);
      const steps = W.map(r => { let say = splitSay(r.words); r.rd.forEach(x => { say = say.concat([x.head], splitSay(x.text)); });
        if (ed && /eulogy|life story|the life/i.test(r.name)) say = say.concat(splitSay(ed));
        return {t: r.name, m: r.mins, by: r.by, say, do: r.dos.concat(r.note ? ['Notes: ' + r.note] : [])}; });
      const cw = (cfg().scripts.closingWords || {})[plainOf(p) ? 'plain' : 'faith'];
      if (steps.length && !steps[steps.length - 1].say.length && cw) steps[steps.length - 1].say = splitSay(fill(cw, p));
      mk(g.id, g.t, g, steps, [g.t + ' for ' + (p.person.full || P), when(g)].filter(Boolean).join('. ') + '.', ['Print the Officiant Script as a backup.', 'Check in with the funeral director and the musicians.']);
    } else if (g.script === 'committal'){
      const {B} = committalBlocks(p);
      mk(g.id, g.t, g, B.map(b => ({t: b.h, m: 2, by: b.cue ? 'Honor guard' : '', say: b.cue ? [] : splitSay(blkT(p, b)), do: b.cue ? [b.t] : []})), [g.t, when(g)].filter(Boolean).join('. ') + '.', []);
    } else if (g.script && sc[g.script]){
      const x = sc[g.script];
      mk(g.id, g.t, g, arr(x.blocks).map(b => ({t: b.h, m: +b.min || 0, by: b.who === 'Chris' ? me() : b.who || '', say: splitSay(blkT(p, b))})), [fill(x.lead || g.t, p), when(g)].filter(Boolean).join(' ') , []);
    }
  });
  if (p.reh.date || hasSvc(p)){
    const o = order(p), R = arr(sc.rehearsal).map(b => ({t: b.h, m: +b.min || 0, say: splitSay(blkT(p, b))}));
    if (o.length) R.splice(Math.min(3, R.length), 0, {t: 'Walk the Order', m: 10, say: o.map((r, i) => (i + 1) + '. ' + r.name + (r.by ? ', ' + r.by : '') + ' (' + r.mins + ' min)')});
    mk('rehearsal', 'Rehearsal', null, R, ['Rehearsal', [nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', ')].filter(Boolean).join('. ') + '.', []);
  }
  return out;
}
function makeSessions(){
  const p = plan(), d = D(); if (!p || !d) return;
  const G = sesGuides(p);
  if (!G.length){ toast('Choose a gathering in What Gatherings first, and set up the order of service for the main one.'); return; }
  d.ses = d.ses || {list: []}; d.ses.list = d.ses.list || []; d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.ses = d.deleted.ses || {};
  const now = Date.now(), ids = G.map(g => g.id);
  arr(p.ses).filter(id => !ids.includes(id)).forEach(id => { d.ses.list = d.ses.list.filter(x => x.id !== id); d.deleted.ses[id] = now; });
  G.forEach(g => { const i = d.ses.list.findIndex(x => x.id === g.id), rec = {id: g.id, base: null, u: now, made: i < 0 ? now : (d.ses.list[i].made || now), g}; if (i < 0) d.ses.list.push(rec); else d.ses.list[i] = rec; delete d.deleted.ses[g.id]; });
  p.ses = ids; touch(p); rerender(true);
  toast(G.length + (G.length === 1 ? ' session is' : ' sessions are') + ' ready in Start a Session.');
}
function sesList(p){
  const d = D(), L = arr(p.ses).map(id => ((d && d.ses && d.ses.list) || []).find(x => x.id === id)).filter(Boolean);
  return L.length ? `<div class="fw-ses">${L.map(r => `<div class="fw-ses-r"><div><b>${esc(r.g.title)}</b><br><small class="muted">${esc(r.g.length)}, ${(r.g.steps || []).length} steps</small></div><button type="button" class="btn btn-line btn-sm" data-act="start" data-v="${esc(r.id)}">Run It</button></div>`).join('')}</div>` : '';
}

// ---------- the page ----------
const CSS = `
#fw-root{min-width:0;}
#fw-root input[type=time],#fw-root input[type=tel],#fw-root input[type=email]{width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg);font-size:calc(17px * var(--scale));color:var(--ink);font-family:inherit;}
.fw-head{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;justify-content:space-between;margin-top:10px;}
.fw-head h1{overflow-wrap:anywhere;}
.fw-modes{display:flex;flex-wrap:wrap;gap:6px;}
.fw-modes .chip{min-height:44px;}
.fw-lay{display:grid;grid-template-columns:230px minmax(0,1fr);gap:22px;align-items:start;margin-top:14px;}
.fw-rail{position:sticky;top:calc(var(--fw-top,110px) + 8px);min-width:0;}
.fw-rail ol{list-style:none;margin:0;padding:0;}
.fw-rail li button{display:flex;gap:10px;align-items:center;width:100%;text-align:left;background:none;border:0;border-radius:12px;padding:9px 10px;color:var(--ink-soft);font:inherit;font-weight:600;cursor:pointer;min-height:44px;}
.fw-rail li button .n{flex:none;display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--line);font-size:14px;}
.fw-rail li button[aria-current="step"]{background:var(--card);color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--gold);}
.fw-rail li button[aria-current="step"] .n{background:var(--gold);border-color:var(--gold);color:var(--card);}
.fw-sep{border-top:1px dashed var(--line);margin:6px 8px;}
.fw-cbt{margin-top:14px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 14px;}
.fw-cbt h2{font-size:calc(20px * var(--scale));margin:0 0 6px;}
.fw-cbt ul{list-style:none;margin:0;padding:0;}.fw-cbt li button{background:none;border:0;padding:6px 0;text-align:left;color:var(--ink);font:inherit;cursor:pointer;overflow-wrap:anywhere;}
.fw-cbt .empty{color:var(--ink-soft);font-size:15px;margin:0;}
.fw-cbt.mob{display:none;}
@media(max-width:900px){.fw-lay{grid-template-columns:minmax(0,1fr);}.fw-rail{position:static;}.fw-rail ol{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;}.fw-rail li{flex:none;}.fw-rail li button{white-space:nowrap;}.fw-sep{display:none;}.fw-rail .fw-cbt{display:none;}.fw-cbt.mob{display:block;}}
.fw-kick{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);font-size:14px;}
.fw-say{background:var(--bg-deep);border-left:4px solid var(--gold);border-radius:12px;padding:14px 16px;margin:10px 0 14px;font-size:calc(21px * var(--scale));line-height:1.4;}
.fw-say b{display:block;font-family:'Barlow Condensed',sans-serif;letter-spacing:1.5px;text-transform:uppercase;font-size:13px;color:var(--gold);}
.fw-say q{quotes:none;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;}
.fw-blk{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:0 0 14px;min-width:0;}
.fw-blk-h{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;}
.fw-blk-h h3,.fw-blk-h h4{margin:0;overflow-wrap:anywhere;}
.fw-sub{color:var(--ink-soft);font-size:15px;margin:6px 0 10px;}
.fw-chips{display:flex;flex-wrap:wrap;gap:8px;}
.fw-chips .chip{min-height:48px;font-size:calc(17px * var(--scale));padding:10px 18px;}
.chip.fw-sm{min-height:40px;padding:7px 12px;font-size:14px;}
.fw-star{background:none;border:1px solid var(--line);border-radius:20px;padding:6px 12px;color:var(--ink-soft);font:inherit;font-size:14px;font-weight:600;cursor:pointer;min-height:40px;}
.fw-star[aria-pressed="true"]{color:var(--gold);border-color:var(--gold);}
.fw-who{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:10px;}
.fw-lbl{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink-soft);margin-right:4px;}
.fw-other{display:flex;gap:6px;align-items:center;flex:1 1 220px;min-width:0;}.fw-other input{min-width:0;}
.fw-add{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}.fw-add input{flex:1 1 200px;min-width:0;}
.fw-note{margin-top:4px;}.fw-note textarea{min-height:70px;}
.fw-tidy{margin-top:6px;background:none;border:1px dashed var(--line);border-radius:20px;padding:6px 12px;color:var(--ink-soft);font:inherit;font-size:14px;font-weight:600;cursor:pointer;min-height:40px;}
.fw-tidy[aria-pressed="true"]{border-style:solid;border-color:var(--gold);color:var(--gold);}
.fw-custom{margin:0 0 12px;border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--card);}
.fw-custom summary,.fw-load summary{cursor:pointer;font-weight:600;min-height:32px;}
.fw-custom textarea{margin-top:8px;min-height:80px;}
.fw-load{margin:0 0 14px;border:1.5px dashed var(--gold);border-radius:14px;padding:10px 14px;}
.fw-load textarea{min-height:80px;}
.fw-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
.fw-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 14px;}
@media(max-width:700px){.fw-g2,.fw-g3{grid-template-columns:minmax(0,1fr);}}
.fw-fld{min-width:0;}
.fw-prompts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
@media(max-width:700px){.fw-prompts{grid-template-columns:minmax(0,1fr);}}
.fw-pcard{display:flex;flex-direction:column;gap:6px;min-width:0;}.fw-pcard .chip{align-self:flex-start;min-height:44px;}
.fw-pcard small{color:var(--ink-soft);font-size:14px;}.fw-pcard textarea{min-height:64px;}
.fw-draft{margin-top:12px;}.fw-draft textarea{margin-top:8px;}
.fw-share{display:grid;grid-template-columns:150px minmax(0,1fr);gap:14px;margin-top:12px;border:1px solid var(--line);border-radius:14px;padding:12px;background:var(--bg);}
.fw-qr svg{width:150px;height:150px;display:block;background:#fff;border-radius:8px;}
.fw-share h4{margin:0 0 6px;}.fw-share-m{min-width:0;}
@media(max-width:560px){.fw-share{grid-template-columns:minmax(0,1fr);}.fw-qr svg{margin:0 auto;}}
.fw-words{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:16px;}
.fw-wr{border-top:1px solid var(--line);padding:8px 0;}.fw-wr summary{cursor:pointer;}
.fw-lines{display:flex;flex-direction:column;gap:8px;}
.fw-line{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,120px) auto;gap:8px;align-items:center;}
@media(max-width:560px){.fw-line{grid-template-columns:minmax(0,1fr) minmax(0,90px);}.fw-line .btn{grid-column:1 / -1;justify-self:start;}}
.fw-gath{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:12px 16px;margin:0 0 12px;}
.fw-svc{display:flex;flex-direction:column;gap:8px;}
.fw-srow{display:grid;grid-template-columns:minmax(0,1.3fr) 90px minmax(0,1fr) minmax(0,1fr) auto;gap:8px;align-items:end;border-top:1px solid var(--line);padding-top:8px;}
.fw-srow:first-child{border-top:0;}
.fw-snm{align-self:center;min-width:0;}.fw-snm b{display:block;overflow-wrap:anywhere;}.fw-snm small{color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.fw-mini{display:flex;flex-direction:column;gap:2px;min-width:0;}.fw-mini span{font-size:12px;color:var(--ink-soft);font-weight:600;}
.fw-mini input,.fw-mini select{padding:8px 10px;}
.fw-mv{display:flex;gap:4px;flex-wrap:wrap;}.fw-mv .btn{min-width:44px;padding:8px 10px;}
@media(max-width:860px){.fw-srow{grid-template-columns:minmax(0,1fr) 90px;}.fw-snm{grid-column:1 / -1;}.fw-lead,.fw-ch{grid-column:1 / -1;}.fw-mv{grid-column:1 / -1;}}
.fw-total{display:flex;justify-content:space-between;margin-top:12px;padding:10px 12px;background:var(--bg-deep);border-radius:10px;font-weight:600;}
.fw-task{border-top:1px solid var(--line);padding:10px 0;}.fw-task:first-child{border-top:0;}
.fw-task.done b,.fw-task.done span{color:var(--ink-soft);}
.fw-ck{display:flex;gap:12px;align-items:center;cursor:pointer;min-height:44px;font-size:calc(18px * var(--scale));}
.fw-ck input{width:28px;height:28px;flex:none;accent-color:var(--gold);}
.fw-td{margin-top:6px;}
.fw-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:14px;}
@media(max-width:700px){.fw-cards{grid-template-columns:minmax(0,1fr);}}
.fw-ocard{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;min-width:0;}.fw-ocard h4{margin:0 0 4px;}.fw-ocard p{color:var(--ink-soft);font-size:15px;margin:0 0 10px;}
.fw-ses{margin-top:12px;}.fw-ses-r{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:10px 0;}
.fw-tl{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
.fw-fu{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:0;}
.fw-fu summary{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 16px;cursor:pointer;min-height:48px;}
.fw-fu .fw-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--gold);flex:none;}
.fw-fu.done .fw-dot{background:var(--gold);}
.fw-when{margin-left:auto;color:var(--ink-soft);font-size:15px;}
.fw-fu-in{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:0 16px 16px;}
@media(max-width:760px){.fw-fu-in{grid-template-columns:minmax(0,1fr);}}
.fw-box{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;min-width:0;}.fw-box h4{margin:0 0 6px;}.fw-box p{margin:2px 0 8px;}.fw-box ul{margin:2px 0 8px;padding-left:20px;}
.fw-full{grid-column:1 / -1;}
.fw-crisis{margin-top:8px;padding:8px 10px;border-left:3px solid var(--danger);background:color-mix(in srgb,var(--danger) 8%,transparent);border-radius:8px;font-weight:600;font-size:15px;}
.fw-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px;flex-wrap:wrap;}
.fw-phone{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 20px;}
.fw-ph-h{color:var(--ink-soft);font-weight:600;margin-bottom:8px;}
.fw-phone ol{margin:0;padding-left:22px;}.fw-phone li{margin:0 0 14px;}.fw-phone h3{margin:0 0 4px;}.fw-phone p{font-size:calc(21px * var(--scale));line-height:1.45;margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;}
.fw-famwrap{background:var(--bg-deep);border-radius:18px;padding:18px;}
.fw-fam h2{font-size:calc(34px * var(--scale));margin:.1em 0 .4em;}
.fw-fsub{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:14px;}
.fw-fsec{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 18px;margin:0 0 12px;}
.fw-fsec h3{margin:0 0 8px;}
.fw-fchips{display:flex;flex-wrap:wrap;gap:8px;}.fw-fchip{border:1.5px solid var(--line);border-radius:30px;padding:8px 16px;color:var(--ink-soft);font-size:calc(18px * var(--scale));}
.fw-fchip.on{background:var(--umber);border-color:var(--umber);color:#F4EBDA;font-weight:600;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .fw-fchip.on{background:var(--gold);border-color:var(--gold);color:#1A130D;}}:root[data-theme="dark"] .fw-fchip.on{background:var(--gold);border-color:var(--gold);color:#1A130D;}
.fw-flist{list-style:none;margin:0;padding:0;}.fw-flist li{display:flex;justify-content:space-between;gap:14px;border-top:1px solid var(--line);padding:8px 0;font-size:calc(18px * var(--scale));}.fw-flist li:first-child{border-top:0;}
.fw-flist li span:last-child{color:var(--ink-soft);text-align:right;}
.fw-big{font-size:calc(20px * var(--scale));margin:0;}.fw-soft{color:var(--ink-soft);font-size:.8em;}
.fw-inline{background:var(--bg-deep);border-radius:16px;padding:14px;margin-bottom:14px;}
.fw-list-r{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:12px 0;}.fw-list-r:first-child{border-top:0;}
.fw-list-r .m{min-width:0;flex:1 1 220px;}.fw-list-r b{overflow-wrap:anywhere;}
.fw-home .fw-list-r{padding:8px 0;}
/* BLD 768: the helpers in the session, Readings, Music, and Rituals, Follow My Scroll */
.fw-helper{margin-top:12px;border:1.5px solid var(--gold);border-radius:14px;padding:12px 14px;background:var(--bg);}
.fw-secnav{margin:4px 0 10px;}.fw-secnav .chip{min-height:44px;font-size:calc(16px * var(--scale));}.fw-n{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1.5px solid currentColor;font-size:12px;margin-right:4px;}
.fw-q textarea{min-height:90px;font-size:calc(18px * var(--scale));}.fw-q input{font-size:calc(18px * var(--scale));}
.fw-bigta{min-height:300px;font-size:calc(18px * var(--scale));line-height:1.5;}
.fw-ref{margin:8px 0 0;padding-left:20px;}.fw-ref li{margin:0 0 6px;overflow-wrap:anywhere;}
.fw-lbt{margin-bottom:6px;}.fw-lbt .chip{min-height:44px;}
.fw-lbf{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:0 12px;}@media(max-width:700px){.fw-lbf{grid-template-columns:minmax(0,1fr);}}
.fw-lbf select{width:100%;}
.fw-place{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--bg-deep);}
.fw-lbl-list{margin-top:12px;}
.fw-lbr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:start;border-top:1px solid var(--line);padding:10px 0;}.fw-lbr:first-child{border-top:0;}
.fw-lbr.on .fw-lbm b{color:var(--gold);}
.fw-lbm{min-width:0;}.fw-lbm b{overflow-wrap:anywhere;font-size:calc(17px * var(--scale));}.fw-lbm small{color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.fw-lbb{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;}
@media(max-width:560px){.fw-lbr{grid-template-columns:minmax(0,1fr);}.fw-lbb{justify-content:flex-start;}}
.fw-prev{grid-column:1 / -1;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;min-width:0;}
.fw-prev ol,.fw-prev ul{margin:4px 0 8px;padding-left:20px;}.fw-prev p{margin:2px 0 8px;overflow-wrap:anywhere;}
.fw-read{white-space:pre-wrap;font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(19px * var(--scale));line-height:1.5;overflow-wrap:anywhere;}
.fw-src{font-style:italic;color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.fw-note2{background:color-mix(in srgb,var(--gold) 12%,transparent);border-radius:8px;padding:8px 10px;}
.fw-tag{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:12px;background:color-mix(in srgb,var(--gold) 16%,transparent);color:var(--gold);vertical-align:middle;}
.fw-tag.on{background:var(--gold);color:var(--card);}
.fw-chosen{margin-bottom:12px;padding:10px 12px;border-radius:12px;background:var(--bg-deep);}.fw-chosen .fw-flist li span:first-child{min-width:0;overflow-wrap:anywhere;}.fw-chosen .fw-flist li span:last-child{white-space:nowrap;}
.fw-flist li.fw-cur{background:color-mix(in srgb,var(--gold) 16%,transparent);border-radius:10px;padding-left:10px;padding-right:10px;}
.fw-fam .fw-prev{background:var(--card);}.fw-ans{overflow-wrap:anywhere;}
.fw-scan{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);display:grid;place-items:center;padding:16px;}
.fw-scan-in{background:var(--card);border-radius:16px;padding:14px;max-width:420px;width:100%;text-align:center;}.fw-scan video{width:100%;border-radius:10px;background:#000;}
`;
(function(){ const s = document.createElement('style'); s.id = 'fw-css'; s.textContent = CSS; document.head.appendChild(s); })();

const CNT = 9;
function rail(p){
  const ks = Object.keys(p.stars), nt = cfg().steps.filter(s => p.tidy[s.id] && (p.notes[s.id] || '').trim()).length;
  return `<ol>${cfg().steps.map((s, i) => `${i === 7 ? '<li aria-hidden="true"><div class="fw-sep"></div></li>' : ''}<li><button type="button" data-fwa="step" data-fwv="${i + 1}"${S.step === i + 1 ? ' aria-current="step"' : ''}${fk('rs|' + (i + 1))}><span class="n">${i + 1}</span><span>${esc(s.title)}</span></button></li>`).join('')}
    <li><button type="button" data-fwa="step" data-fwv="tidy"${S.step === 'tidy' ? ' aria-current="step"' : ''}${fk('rs|tidy')}><span class="n">&#10003;</span><span>Tidy Up${nt ? ' (' + nt + ')' : ''}</span></button></li></ol>
    <div class="fw-cbt">${cbt(p)}</div>`;
}
function cbt(p){
  const ks = Object.keys(p.stars);
  return `<h2>Come Back To This</h2>${ks.length ? `<ul>${ks.map(k => `<li><button type="button" data-fwa="step" data-fwv="${p.stars[k].step}">&#9733; ${esc(p.stars[k].label)} <span class="muted">(Step ${p.stars[k].step})</span></button></li>`).join('')}</ul>` : '<p class="empty">Tap a star on any step to save it here.</p>'}`;
}
function vPlan(p){
  const n = S.step, st = typeof n === 'number' ? STEP(n) : {title: 'Tidy Up'}, mode = S.mode;
  let body;
  if (n === 'tidy') body = vTidy(p);
  else if (mode === 'family') body = `<div class="fw-famwrap">${famBody(p)}</div>`;
  else if (mode === 'phone') body = vPhone(p);
  else if (n === 2 && S.sub === 'eulogy') body = vEu(p);
  else if (n === 2 && S.sub === 'obit') body = vOb(p);
  else body = V[n](p);
  return `<button type="button" class="linkbtn" data-fwa="plans">&larr; All Farewell Plans</button>
  <div class="fw-head"><div style="min-width:0"><div class="eyebrow">Farewell Planning Session</div><h1>${esc(pTitle(p))}</h1>${lifeLine(p) ? `<p class="muted">${esc(lifeLine(p))}</p>` : ''}${p.cli && window.GGCli ? GGCli.link(p.cli) : ''}</div>
    <div class="fw-modes" role="group" aria-label="View">${[['chris', me() + "'s View"], ['family', 'Family View Here'], ['phone', 'Phone Mode']].map(([k, l]) => `<button type="button" class="chip" data-fwa="mode" data-fwv="${k}" aria-pressed="${mode === k}"${fk('md|' + k)}>${esc(l)}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-fwa="famwin">Open Family View Window</button><button type="button" class="chip" data-fwa="follow" aria-pressed="${!!S.follow}"${fk('fl')} title="The Family View Window follows your place on the page">Follow My Scroll</button></div></div>
  <div class="fw-lay"><nav class="fw-rail" aria-label="Steps">${rail(p)}</nav>
  <div id="fw-main" style="min-width:0"><div class="fw-kick">${typeof n === 'number' ? 'Step ' + n + ' of ' + CNT : 'After the Meeting'}${n === 2 && S.sub ? ' &middot; ' + (S.sub === 'eulogy' ? 'Eulogy Helper' : 'Obituary Helper') : ''}${mode === 'family' && n !== 'tidy' ? ' &middot; Family View' : mode === 'phone' && n !== 'tidy' ? ' &middot; Phone Mode' : ''}</div><h2 style="margin:2px 0 6px">${esc(n === 2 && S.sub ? (S.sub === 'eulogy' ? 'The Eulogy' : 'The Obituary') : st.title)}</h2>
    ${mode === 'family' && n !== 'tidy' ? '<p class="fw-sub">This is what the family sees. For a call, open the Family View Window and share that window by itself on Zoom, Teams, or FaceTime. It follows your taps.</p>' : ''}
    ${body}
    <div class="fw-cbt mob" style="margin-top:16px">${cbt(p)}</div>
    ${n === 2 && S.sub && mode === 'chris' ? '' : `<div class="fw-nav"><button type="button" class="btn btn-line" data-fwa="nav" data-fwv="-1"${n === 1 ? ' disabled' : ''}${fk('nb')}>&larr; Back</button><button type="button" class="btn btn-gold" data-fwa="nav" data-fwv="1"${n === 'tidy' ? ' disabled' : ''}${fk('nn')}>${n === CNT ? 'Tidy Up' : 'Next'} &rarr;</button></div>`}</div></div>`;
}
function vList(){
  const L = plans().slice().sort((a, b) => (b.u || 0) - (a.u || 0)), due = dueSoon();
  return `<button type="button" class="linkbtn" data-fwa="close">&larr; Service Builder</button>
  <div class="page-head" style="margin-top:10px"><div class="eyebrow">Ceremonies</div><h1>Farewell Planning Session</h1><p>Plan a funeral, memorial, or celebration of life with the family, live together or by phone. Tap more than you type, and keep your eyes on them.</p></div>
  <div class="card"><div class="row"><button type="button" class="btn btn-gold" data-fwa="new">Start a New Plan</button><button type="button" class="btn btn-line" data-fwa="new-load">Start From the Family's Start</button></div>
    <p class="muted" style="font-size:15px;margin-top:10px">Plans stay on this device, encrypted with your records, and travel in your backups.</p></div>
  ${due.length ? `<div class="card"><h3>Follow-Ups Due This Week</h3>${due.map(x => `<div class="fw-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">${esc(pName(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}</small></div><button type="button" class="btn btn-line btn-sm" data-fwa="fu-open" data-fwv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('')}</div>` : ''}
  <div class="card"><h2 style="margin-bottom:4px">Plans</h2>${L.length ? L.map(p => `<div class="fw-list-r"><div class="m"><b>${esc(pTitle(p))}</b><br><small class="muted">${esc([lifeLine(p), mainDate(p) ? 'Service ' + nice(mainDate(p)) : 'Started ' + nice(p.made)].filter(Boolean).join(' · '))}</small></div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-fwa="open" data-fwv="${esc(p.id)}">Open</button><button type="button" class="btn btn-line btn-sm" data-fwa="del" data-fwv="${esc(p.id)}">Delete</button></div></div>`).join('') : '<p class="muted">Plans you start show here, one for each family.</p>'}</div>
  <div class="card"><h3>Your Contact for Send-Back</h3><p class="muted" style="font-size:15px">Optional. When the family taps Send in the Eulogy Helper, Obituary Helper, or Planning a Farewell, these fill in the text and email for them.</p>
    <div class="fw-g2">${fld('me.em', 'Your email', store().me.em, 'email')}${fld('me.ph', 'Your mobile number', store().me.ph, 'tel')}</div></div>`;
}
function view(){ setTimeout(headTop, 0); const p = plan(); return `<div id="fw-root">${S.id && p ? vPlan(p) : vList()}</div>`; }
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('fw-root'); if (h && r) r.style.setProperty('--fw-top', h.offsetHeight + 'px'); }
function rerender(keepScroll){
  const r = document.getElementById('fw-root'); if (!r){ if (C.render) C.render(); return; }
  const ae = document.activeElement, k = ae && ae.getAttribute && ae.getAttribute('data-fk'), y = window.scrollY;
  r.outerHTML = view(); if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (k){ const el = document.querySelector('#fw-root [data-fk="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); if (el) try { el.focus({preventScroll: true}); } catch (e) {} }
  pushFam();
}
function goStep(n){ S.step = n; S.other = null; S.sub = null; rerender(false); const m = document.getElementById('fw-main'); if (m && window.matchMedia && matchMedia('(max-width: 900px)').matches){ const c = document.querySelector('.fw-rail [aria-current="step"]'); if (c && c.scrollIntoView) c.scrollIntoView({block: 'nearest', inline: 'center'}); } }
function openPlan(id, step){ S.on = true; S.id = id; S.step = step || 1; S.mode = 'chris'; S.other = null; S.qr = null; S.sub = null; S.eSec = 0; S.oSec = 0; S.lb.open = null; if (C.go) C.go('ceremonies'); }

// ---------- actions ----------
function setPath(o, path, v){
  const ks = path.split('.'); let x = o;
  for (let i = 0; i < ks.length - 1; i++){ const k = ks[i]; if (x[k] == null) x[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
// The helpers' and the picker's actions (GWG BLD 768).
function ensureSvc(p){ if (hasSvc(p)) return true; const c = cerBind(); if (!c) return false; const o = svcSync(p); o.type = svcType(p); o.fwp = p.id; p.svc = c.make(o); return true; }
function findPiece(p, key){ const i = key.indexOf('|'), k = key.slice(0, i), id = key.slice(i + 1); const c = cerBind(); return c ? {k, id, x: c.pieceOf(k, id)} : {k, id, x: null}; }
function lbRedraw(p){ const l = document.getElementById('fw-lb-list'); if (l) l.innerHTML = lbRows(p); pushFam(); }
function helperPrint(p, k){
  if (k === 'eulogy'){ const d = String(p.eDraft || '').trim(); if (!d) return toast('Build the draft first.');
    return sheet(`<style>.fw-eu p{font-size:16pt;line-height:2;margin:0 0 5mm;}</style><h1>Eulogy for ${H(clean(euA(p).name) || pName(p))}</h1><p><i>${H(readTime(d))}</i></p><div class="fw-eu">${paras(d)}</div>`, 'Eulogy', 'eulogy'); }
  const o = obS(p), sh = OB.shapes.filter(x => String(o.d[x.id] || '').trim()); if (!sh.length) return toast('Make the drafts first.');
  sheet(sh.map(x => `<h2>${H(x.name)}</h2>${paras(o.d[x.id])}`).join(''), 'Obituary Drafts', 'obituary-drafts');
}
function addOwnItem(p, id, t){
  t = String(t || '').trim(); if (!t) return false;
  if (id === 'speakers'){ p.speakers.push({name: t, min: 3}); return true; }
  if (id === 'clergy'){ p.clergy.push({name: t, role: ''}); return true; }
  if (id === 'tasks'){ p.tasks.push({id: 'own_' + uid(), t, who: '', done: false, d: ''}); return true; }
  if (id === 'next'){ p.next.push({t, done: false}); return true; }
  if (id === 'svcpart'){ if (hasSvc(p)) CER().add(p.svc, t); return true; }
  const it = {id: 'own_' + uid(), t}; (p.own[id] = p.own[id] || []).push(it);
  const single = !!list(id).single; if (single) p.sel[id] = [it.id]; else (p.sel[id] = p.sel[id] || []).push(it.id);
  return true;
}
function act(a, v, el){
  const p = plan();
  switch (a){
    case 'close': S.on = false; S.id = null; if (C.go) C.go('ceremonies'); return;
    case 'plans': S.id = null; S.on = true; rerender(false); return;
    case 'new': case 'new-load': { const n = newPlan(); plans().push(n); const d = D(); if (d && d.deleted && d.deleted.fwp) delete d.deleted.fwp[n.id]; touch(n); S.id = n.id; S.step = 1; S.mode = 'chris'; rerender(false);
      if (a === 'new-load') setTimeout(() => { const l = document.querySelector('#fw-root .fw-load'); if (l){ l.open = true; const t = l.querySelector('textarea'); if (t) t.focus(); } }, 30); return; }
    case 'open': openPlan(v, el.closest('#cer-root') && S.id === v ? (S.step || 5) : el.closest('#cer-root') ? 5 : 1); return;
    case 'del': { const x = plans().find(q => q.id === v); if (!x || !confirm('Delete the plan for ' + pTitle(x) + '? Its sessions in Start a Session stay until you delete them.')) return;
      const d = D(); d.fwp.plans = plans().filter(q => q.id !== v); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.fwp = d.deleted.fwp || {}; d.deleted.fwp[v] = Date.now(); C.save(); rerender(true); return; }
    case 'fu-open': { const [pid, tid] = v.split('|'); S.fuOpen = tid; openPlan(pid, 9); return; }
  }
  if (!p) return;
  switch (a){
    case 'step': goStep(v === 'tidy' ? 'tidy' : +v); return;
    case 'nav': { const n = S.step === 'tidy' ? CNT + 1 : S.step, m = n + (+v); if (m < 1) return; goStep(m > CNT ? 'tidy' : m); return; }
    case 'mode': S.mode = v; rerender(true); return;
    case 'famwin': openFam(); return;
    case 'chip': { const [id, val] = v.split('|'), single = !!list(id).single || el.dataset.fws === '1'; const cur = p.sel[id] = arr(p.sel[id]);
      if (single) p.sel[id] = cur.includes(val) ? [] : [val]; else p.sel[id] = cur.includes(val) ? cur.filter(x => x !== val) : cur.concat(val);
      touch(p); rerender(true); return; }
    case 'own': { const inp = document.querySelector(`#fw-root [data-fwown="${v}"]`); if (inp && addOwnItem(p, v, inp.value)){ touch(p); rerender(true); const n = document.querySelector(`#fw-root [data-fwown="${v}"]`); if (n) n.focus(); } return; }
    case 'tidy': p.tidy[v] = !p.tidy[v]; touch(p); rerender(true); return;
    case 'star': if (p.stars[v]) delete p.stars[v]; else p.stars[v] = {label: el.dataset.fwl || v, step: typeof S.step === 'number' ? S.step : 1}; touch(p); rerender(true); return;
    case 'tag': { const i = v.indexOf('|'), key = v.slice(0, i), w = v.slice(i + 1); S.other = null;
      if (key.startsWith('task.')){ const t = p.tasks[+key.slice(5)]; if (t) t.who = t.who === w ? '' : w; } else { if (p.tags[key] === w) delete p.tags[key]; else p.tags[key] = w; }
      touch(p); rerender(true); return; }
    case 'tagother': S.other = S.other === v ? null : v; rerender(true); setTimeout(() => { const i = document.querySelector(`#fw-root [data-fwtag="${v}"]`); if (i) i.focus(); }, 0); return;
    case 'tagset': { const i = document.querySelector(`#fw-root [data-fwtag="${v}"]`), w = i ? i.value.trim() : ''; if (!w) return; S.other = null;
      if (v.startsWith('task.')){ const t = p.tasks[+v.slice(5)]; if (t) t.who = w; } else p.tags[v] = w; touch(p); rerender(true); return; }
    case 'spk-del': p.speakers.splice(+v, 1); touch(p); rerender(true); return;
    case 'cl-del': p.clergy.splice(+v, 1); touch(p); rerender(true); return;
    case 'next-del': p.next.splice(+v, 1); touch(p); rerender(true); return;
    case 'wr-del': if (!confirm('Remove this writing from the plan?')) return; p.writings.splice(+v, 1); touch(p); rerender(true); return;
    case 'wr-copy': { const w = p.writings[+v]; if (w) copyText(w.sections && w.sections.length ? w.sections.map(s => s.h + '\n\n' + s.t).join('\n\n') : w.body); return; }
    case 'sub': S.sub = v || null; if (v === 'eulogy' && !Object.values(euA(p)).some(x => clean(x))){ euFill(p); touch(p); } if (v === 'obit' && !Object.values(obS(p).a).some(x => clean(x))){ obFill(p); touch(p); } rerender(false); return;
    case 'eu-sec': S.eSec = Math.max(0, Math.min(EU.secs.length, +v || 0)); if (S.eSec === EU.secs.length && !String(p.eDraft || '').trim()){ p.eDraft = euBuild(p); p.eu.built = Date.now(); touch(p); } rerender(false); return;
    case 'ob-sec': S.oSec = Math.max(0, Math.min(OB.secs.length, +v || 0)); if (S.oSec === OB.secs.length && !OB.shapes.some(sh => String(obS(p).d[sh.id] || '').trim())){ OB.shapes.forEach(sh => { obS(p).d[sh.id] = obDraft(p, sh); }); p.ob.e = {}; touch(p); } rerender(false); return;
    case 'eu-fill': { const n = euFill(p); touch(p); rerender(true); toast(n ? 'Filled in ' + n + (n === 1 ? ' answer' : ' answers') + ' from the story notes.' : 'Every answer the notes can give is already in.'); return; }
    case 'ob-fill': { const n = obFill(p); touch(p); rerender(true); toast(n ? 'Filled in ' + n + (n === 1 ? ' answer' : ' answers') + ' from the plan.' : 'Every answer the plan can give is already in.'); return; }
    case 'eu-build': if (String(p.eDraft || '').trim() && p.eu && p.eu.edited && !confirm('Build the draft again from the answers? Changes you typed into the draft are replaced.')) return; p.eDraft = euBuild(p); euA(p); p.eu.edited = false; touch(p); rerender(true); toast('The draft is ready.'); return;
    case 'eu-copy': copyText(String(p.eDraft || ''), 'The eulogy is copied.'); return;
    case 'eu-print': helperPrint(p, 'eulogy'); return;
    case 'ob-make': { const o = obS(p); if (OB.shapes.some(sh => o.e[sh.id] && o.d[sh.id]) && !confirm('Make new drafts? Changes you typed into the drafts are replaced.')) return; OB.shapes.forEach(sh => { o.d[sh.id] = obDraft(p, sh); }); o.e = {}; touch(p); rerender(true); toast('The drafts are ready.'); return; }
    case 'ob-copy': copyText(String(obS(p).d[v] || ''), 'Copied.'); return;
    case 'ob-print': helperPrint(p, 'obit'); return;
    case 'pron': p.person.pron = v; touch(p); rerender(true); return;
    case 'follow': S.follow = !S.follow; rerender(true); if (S.follow) syncFam(); toast(S.follow ? 'The Family View Window follows your scroll.' : 'The Family View Window stays where it is.'); return;
    case 'lb-type': S.lb.type = v; S.lb.tag = ''; S.lb.open = null; S.lb.more = 0; rerender(true); return;
    case 'lb-faith': S.lb.faith = v; S.lb.more = 0; rerender(true); return;
    case 'lb-mom': S.lb.moment = v; S.lb.more = 0; rerender(true); return;
    case 'lb-mine': S.lb.mine = !S.lb.mine; S.lb.more = 0; rerender(true); return;
    case 'lb-place': S.lb.place = v; rerender(true); return;
    case 'lb-more': S.lb.more += 25; lbRedraw(p); return;
    case 'lb-prev': S.lb.open = S.lb.open === v ? null : v; lbRedraw(p); { const b = document.querySelector(`#fw-root [data-fwa="lb-prev"][data-fwv="${window.CSS && CSS.escape ? CSS.escape(v) : v}"]`); if (b) try { b.focus({preventScroll: true}); } catch (e) {} } return;
    case 'lb-add': { const f = findPiece(p, v); if (!f.x) return; if (!ensureSvc(p)) return toast('The Service Builder did not load. Reload the Field Guide.');
      const r = CER().addPiece(p.svc, {kind: f.k, id: f.id, moment: S.lb.place === 'best' ? null : S.lb.place, by: S.lb.by});
      if (!r) return toast('That piece could not be added.');
      if (f.k === 'ritual' && arr(f.x.needs).length && !p.tasks.some(t => t.id === 'rit_' + f.id)) p.tasks.push({id: 'rit_' + f.id, t: f.x.title + ': ' + f.x.needs.join('; '), who: 'Family', done: false, d: ''});
      touch(p); rerender(true); toast('Added to ' + r.part + '.'); return; }
    case 'lb-rm': { const f = findPiece(p, v); if (!hasSvc(p)) return; CER().removePiece(p.svc, f.k, f.id); const i = p.tasks.findIndex(t => t.id === 'rit_' + f.id && !t.done && !t.d); if (i >= 0) p.tasks.splice(i, 1); touch(p); rerender(true); toast('Taken out of the service.'); return; }
    case 'lb-own': { const g = id => { const e = document.getElementById(id); return e ? (e.type === 'checkbox' ? e.checked : e.value) : ''; }, t = S.lb.type, k = lbKind(t);
      const title = String(g('fw-lo-title')).trim(); if (!title) return toast('Give it a title first.');
      if (!ensureSvc(p)) return; const c = CER();
      const m = {kind: k === 'reading' ? t : k, title, by: g('fw-lo-by'), ref: g('fw-lo-ref'), text: g('fw-lo-text'), how: g('fw-lo-how'), needs: g('fw-lo-needs'), source: g('fw-lo-src'), faith: plainOf(p) ? 'plain' : 'faith', moments: S.lb.place !== 'best' ? [S.lb.place] : []};
      const id = c.savePiece(m, p.svc, !!g('fw-lo-keep')); if (!id) return;
      const r = c.addPiece(p.svc, {kind: k, id, moment: S.lb.place === 'best' ? null : S.lb.place, by: S.lb.by});
      S.lb.own = false; touch(p); rerender(true); toast(r ? 'Added to ' + r.part + '.' : 'Saved.'); return; }
    case 'lb-mypieces': { const c = cerBind(); if (!c) return; c.openMine(p.id); S.on = false; if (C.go) C.go('ceremonies'); return; }
    case 'share-copy': copyText(shareURL(p, v), 'Link copied.'); return;
    case 'load-paste': { const t = document.getElementById('fw-paste'); const r = loadText(p, t ? t.value : ''); if (r) rerender(true); return; }
    case 'scan': scanQR(); return;
    case 'svc-new': { const c = cerBind(); if (!c) return; const o = svcSync(p); o.type = v; o.fwp = p.id; p.svc = c.make(o); touch(p); rerender(true); toast('The order of service is ready. Change anything that does not fit.'); return; }
    case 'svc-sync': { const c = cerBind(); if (!c || !hasSvc(p)) return; c.sync(p.svc, svcSync(p)); touch(p); rerender(true); toast('Matched to the family\'s choices.'); return; }
    case 'svc-open': { const c = cerBind(); if (!c || !hasSvc(p)) return; c.sync(p.svc, svcSync(p)); c.open(p.svc, 'check'); S.on = false; if (C.go) C.go('ceremonies'); return; }
    case 'svc-up': case 'svc-down': CER().move(p.svc, v, a === 'svc-up' ? -1 : 1); touch(p); rerender(true); return;
    case 'svc-off': CER().set(p.svc, v, 'on', false); touch(p); rerender(true); return;
    case 'svc-on': CER().set(p.svc, v, 'on', true); touch(p); rerender(true); return;
    case 'cer-print': if (hasSvc(p)){ cerBind(); CER().print(p.svc, v); } return;
    case 'out': printOut(v); return;
    case 'fam-copy': copyText(famText(p), 'The family copy is copied.'); return;
    case 'make-ses': makeSessions(); return;
    case 'fu-copy': { const t = touches(p).find(x => x.id === v); if (t) copyText(fill((t.f.email || {}).body || '', p)); return; }
    case 'fu-add': { const t = document.getElementById('fw-fuo-t'), d = document.getElementById('fw-fuo-d'); if (!t || !t.value.trim()) return toast('Name the check-in first.'); p.fuOwn.push({id: 'own_' + uid(), title: t.value.trim(), date: d ? d.value : ''}); touch(p); rerender(true); return; }
    case 'fu-del': p.fuOwn = p.fuOwn.filter(x => x.id !== v); delete p.fu[v]; touch(p); rerender(true); return;
  }
}
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-fwa]'); if (!t || !D()) return;
  if (t.disabled) return;
  e.preventDefault(); act(t.dataset.fwa, t.dataset.fwv || '', t);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.closest) return;
  const o = e.target.closest('#fw-root [data-fwown]'); if (o){ e.preventDefault(); act('own', o.dataset.fwown, o); return; }
  const g = e.target.closest('#fw-root [data-fwtag]'); if (g){ e.preventDefault(); act('tagset', g.dataset.fwtag, g); }
});
// Typing saves as it goes, with no redraw, so the next tap always lands; the name at the top follows along.
function headSync(p){ const h = document.querySelector('#fw-root .fw-head h1'); if (h) h.textContent = pTitle(p); }
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#fw-root') || !D()) return;
  if (t.dataset.fwi){
    if (t.dataset.fwi.startsWith('me.')){ store().me[t.dataset.fwi.slice(3)] = t.value; C.save(); return; }
    const p = plan(); if (!p) return; let v = t.value; if (t.type === 'number') v = v === '' ? '' : +v;
    setPath(p, t.dataset.fwi, v);
    if (t.dataset.fwi === 'eDraft'){ euA(p); p.eu.edited = true; const tm2 = document.getElementById('fw-eu-time'); if (tm2) tm2.textContent = v.trim() ? readTime(v) : 'Not built yet'; }
    const om = /^ob\.d\.(\w+)$/.exec(t.dataset.fwi); if (om){ obS(p).e[om[1]] = 1; const c = document.getElementById('fw-obn-' + om[1]), sh = OB.shapes.find(x => x.id === om[1]); if (c && sh) c.textContent = wordsIn(v) + ' words, aim for about ' + sh.words; }
    touch(p); if (/^person\./.test(t.dataset.fwi)) headSync(p); return;
  }
  if (t.dataset.fwlq){ const p = plan(); if (!p) return; S.lb.q = t.value; S.lb.more = 0; lbRedraw(p); return; }
  if (t.dataset.fwlby){ S.lb.by = t.value; return; }
  if (t.dataset.fwsvc){ const p = plan(); if (!p || !hasSvc(p)) return; const [k, f] = t.dataset.fwsvc.split('|'); if (f === 'option') return; CER().set(p.svc, k, f, t.value); const tot = document.getElementById('fw-tot'); if (tot) tot.textContent = CER().total(p.svc) + ' minutes'; touch(p); }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#fw-root') || !D()) return;
  const p = plan();
  if (t.dataset.fwfile && t.files && t.files[0]){ const f = t.files[0]; t.value = ''; const r = new FileReader(); r.onload = () => { if (p && loadText(p, String(r.result || ''))) rerender(true); }; r.readAsText(f); return; }
  if (!p) return;
  if (t.dataset.fwc){ setPath(p, t.dataset.fwc, !!t.checked); touch(p); rerender(true); return; }
  if (t.dataset.fwlt){ S.lb.tag = t.value; S.lb.more = 0; lbRedraw(p); return; }
  if (t.dataset.fwsvc){ const [k, f] = t.dataset.fwsvc.split('|'); if (f === 'option'){ CER().set(p.svc, k, 'option', t.value); touch(p); rerender(true); } return; }
  if (t.dataset.fwi && t.type === 'date' && /^(person\.|gd\.)/.test(t.dataset.fwi)){ setPath(p, t.dataset.fwi, t.value); touch(p); }
});
document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.fwfu && d.open) S.fuOpen = d.dataset.fwfu; }, true);

// ---------- the API ----------
const API = window.GGFw = {
  init(ctx){ C = ctx || {}; },
  on: () => S.on && isStaff() && !!D(),
  view,
  // The card at the top of the Service Builder's home (Ceremonies tab).
  card(){
    if (!isStaff() || !D()) return '';
    const n = plans().length, due = dueSoon().length;
    return `<div class="card" style="border-left:4px solid var(--gold)"><div class="spread"><div style="min-width:0;flex:1 1 260px"><div class="eyebrow">With the Family</div><h2 style="margin:2px 0 4px">Farewell Planning Session</h2><p class="muted" style="margin:0">Plan a funeral, memorial, or celebration of life together: tap choices, a Family View to share, a phone mode, every printout, live sessions, and a year of follow-ups.${n ? ' ' + n + (n === 1 ? ' plan' : ' plans') + (due ? ', ' + due + ' follow-up' + (due === 1 ? '' : 's') + ' due this week' : '') + '.' : ''}</p></div>
      <button type="button" class="btn btn-gold" data-fwa="plans-open">Open</button></div></div>`;
  },
  // The Follow-Ups Due card on the Staff and Founder Home.
  homeCard(){
    if (!isStaff() || !D() || !plans().length) return '';
    const due = dueSoon();
    return `<div class="card fw-home" style="margin-top:14px"><div class="spread"><h3>Follow-Ups Due</h3><button type="button" class="linkbtn" data-fwa="plans-open">Farewell Plans</button></div>
      ${due.length ? due.map(x => `<div class="fw-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">for ${esc(pName(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}${x.t.date < today() ? ' <span class="pill warn">Overdue</span>' : ''}</small></div><button type="button" class="btn btn-line btn-sm" data-fwa="fu-open" data-fwv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('') : '<p class="muted" style="margin-top:8px">Nothing due this week.</p>'}</div>`;
  },
  // Backups: plans combine like saved services; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.fwp = out.deleted.fwp || {};
    Object.entries((inc.deleted || {}).fwp || {}).forEach(([id, ts]) => { out.deleted.fwp[id] = Math.max(out.deleted.fwp[id] || 0, ts); });
    out.fwp = out.fwp || {plans: []}; out.fwp.plans = out.fwp.plans || []; let added = 0, updated = 0;
    ((inc.fwp || {}).plans || []).forEach(x => { const i = out.fwp.plans.findIndex(y => y.id === x.id); if (i < 0){ out.fwp.plans.push(x); added++; } else if ((x.u || 0) > (out.fwp.plans[i].u || 0)){ out.fwp.plans[i] = x; updated++; } });
    out.fwp.plans = out.fwp.plans.filter(x => !(out.deleted.fwp[x.id] && out.deleted.fwp[x.id] >= (x.u || 0)));
    if (inc.fwp && inc.fwp.me && !(out.fwp.me && (out.fwp.me.em || out.fwp.me.ph))) out.fwp.me = Object.assign({}, inc.fwp.me);
    return {added, updated};
  },
  // Clients and Intake (BLD 767, clients.js): a plan started from a client file carries cli, the file's id.
  create(o){ o = o || {}; const n = newPlan(); if (o.cli) n.cli = o.cli; Object.assign(n.contact, o.contact || {}); Object.assign(n.person, o.person || {});
    plans().push(n); const d = D(); if (d && d.deleted && d.deleted.fwp) delete d.deleted.fwp[n.id]; touch(n); return n.id; },
  open(id){ openPlan(id, 1); },
  // For tests and the lead.
  state: S, cfg, plan, plans, touches, dueSoon, famText, famBody, outHTML, sesGuides, loadText, readStart, readWriting, fill, DEF,
  famWin: null, last: null, lastCopy: null
};
// The Ceremonies card and the Home card open the plans list.
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-fwa="plans-open"]'); if (!t || !D()) return; S.on = true; S.id = null; if (C.go) C.go('ceremonies'); }, true);
})();
