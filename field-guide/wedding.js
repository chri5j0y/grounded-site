// =====================================================================
// GROUNDED FIELD GUIDE (TM): the Wedding Planning Session (GWG BLD 770).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// A Staff and Founder tool in the Ceremonies tab, built to the Farewell Planning Session's standard and for eye contact:
// short Say prompts, big tap chips, quick notes to tidy later, Your Custom Details and Add Your Own everywhere, Come Back To
// This stars, a Family View in its own window to share on Zoom, Teams, or FaceTime (with Follow My Scroll), and a Phone Mode.
// The plan grows across meetings: a meeting log with dates, and a Since Last Time list of what is done and what is open.
// Twelve steps, then a Finish screen: Welcome the Couple, Their Story, Faith and Traditions, The Day, The License, The Ceremony,
// The People (the processional and recessional builder), Vows (the Vows Helper inside the session), Rehearsal, Review Together,
// What You'll Get, and Since Last Time and Next Meeting (with the first-anniversary follow-up).
// The order of service is the Service Builder's (ceremonies.js GGCer.wd): the plan holds the service's id, so parts, readings,
// Faith or Plain, and times stay one source. Words: the Staff library's weddingPlanning key, filled from the built-in words below
// wherever a piece is missing, so the tool works before that update is applied. The license checklist is the Staff library's
// ceremonies.wedding.license, the same list the Service Builder shows.
// Plans live in DATA.wdp.plans: encrypted with the rest of this device's records and carried in backups (merged by GGWed.merge;
// deletions in deleted.wdp). Nothing is sent anywhere.
// =====================================================================
(function(){
'use strict';

let C = {}; // GGWed.init: data(), lib(), tier(), save(), render(), go(), toast(), sheet(), ph(), pf()
const S = {on: false, id: null, step: 1, mode: 'chris', other: null, sub: null, vSec: 0, follow: true, fuOpen: null, scan: null,
  lb: {type: 'music', q: '', faith: 'all', moment: 'all', tag: '', mine: false, open: null, place: 'best', by: '', more: 0}};
const SITE = 'https://growwithgrounded.com/';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
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
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const nice = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : (s || ''); };
const short = s => { const d = dOf(s); return d ? MON[d.getMonth()] + ' ' + d.getDate() : (s || ''); };
const tm = t => { const m = /^(\d\d?):(\d\d)/.exec(t || ''); if (!m) return t || ''; let h = +m[1]; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; };
function clockAdd(t, m){ const r = /^(\d\d?):(\d\d)/.exec(t || ''); if (!r) return ''; const n = ((+r[1] * 60 + +r[2] + m) % 1440 + 1440) % 1440; return tm(pad(Math.floor(n / 60)) + ':' + pad(n % 60)); }
const clean = t => String(t || '').trim().replace(/[ \t]+/g, ' ');
const sent = t => { t = clean(t); if (!t) return ''; t = t.charAt(0).toUpperCase() + t.slice(1); return /[.!?"”]$/.test(t) ? t : t + '.'; };
const snip = (t, n) => { t = String(t || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '...' : t; };
const WPM = 130;
const wordsIn = t => (String(t || '').trim().match(/\S+/g) || []).length;
function readTime(t){
  const w = wordsIn(String(t || '').replace(/\[[^\]]*\]/g, ' ')), halves = Math.round(w / WPM * 2), m = Math.floor(halves / 2), half = halves % 2;
  return w + ' words, about ' + (halves < 2 ? 'under a minute' : m + (half ? ' and a half' : '') + (m === 1 && !half ? ' minute' : ' minutes')) + ' at an easy pace';
}

// ---------- the built-in words (the Staff library's weddingPlanning key replaces any piece) ----------
const L2 = (...a) => a.map(([id, t, q]) => q ? {id, t, q} : {id, t});
const DEF = {
  v: 0,
  steps: [
    {id: 'welcome', title: 'Welcome the Couple', say: 'Welcome, both of you. Before anything else, tell me how you like to be called, and who is here with us today.', sub: 'Names first, and how to say them.',
      phoneLines: [['Welcome', 'It is so good to be with you both. This is your day, and we will build it together.'], ['Your names', 'How do you like to be called, and how should I say your full names so they sound right?'], ['Who is here', 'Is anyone else with us today?']],
      lists: {who: {title: 'Who Is Here', sub: 'Tap everyone in the room or on the call.', items: L2(['couple', 'The Couple'], ['parents', 'Parents'], ['family', 'Family'], ['party', 'Wedding Party'], ['friends', 'Friends'])}}},
    {id: 'story', title: 'Their Story', say: 'Tell me about the two of you. How did you meet?', sub: 'Tap a prompt, jot a few words, and keep your eyes on the couple.',
      phoneLines: [['How you met', 'Tell me how the two of you met.'], ['When you knew', 'When did you know this was the one?'], ['What you love', 'What do you love most about each other?'], ['Your hopes', 'What do you hope your marriage will be?']],
      lists: {story: {title: 'Tap a Prompt, Jot a Few Words', items: L2(['met', 'How You Met', 'How did the two of you meet?'], ['knew', 'When You Knew', 'When did you know?'], ['love', 'What You Love About Each Other', 'What do you love most about each other?'], ['laugh', 'A Time You Laughed', 'Tell me about a time you laughed until it hurt.'], ['hard', 'A Hard Season You Came Through', 'Was there a hard season you came through together?'], ['home', 'What Home Feels Like', 'What does home feel like with the two of you?'], ['hope', 'What You Hope For', 'What do you hope your marriage will be?'], ['friends', 'What Your Friends Say', 'What do your friends say about the two of you?'])}}},
    {id: 'faith', title: 'Faith and Traditions', say: 'Some couples want faith at the center, some want it plain, and many want a bit of both. What feels right for the two of you?', sub: 'All faith traditions and everything in-between. The couple chooses.',
      phoneLines: [['Faith or plain', 'Some couples want faith at the center, some want plain words, and many want a blend. Any of these is right.'], ['Traditions', 'Is there a church, a tradition, or a family custom you would like to honor?']],
      lists: {faithway: {title: 'Faith or Plain', single: true, items: L2(['faith', 'Faith'], ['plain', 'Plain'], ['blend', 'A Blend'])},
        tradition: {title: 'Their Traditions', items: L2(['lutheran', 'Lutheran'], ['catholic', 'Catholic'], ['methodist', 'Methodist'], ['baptist', 'Baptist'], ['nondenominational', 'Nondenominational'], ['jewish', 'Jewish'], ['spiritual', 'Spiritual, No Tradition'], ['two', 'Two Traditions Together'], ['allfaiths', 'All Faith Traditions and Everything In-Between'])},
        customs: {title: 'Customs to Honor', items: L2(['parents', 'A Blessing From Parents'], ['remember', 'Remembering Loved Ones'], ['unity', 'A Unity Ritual'], ['candle', 'Lighting a Candle'], ['family', 'A Family Tradition'])}}},
    {id: 'day', title: 'The Day', say: 'Let us picture the day. When and where are you hoping to say your vows?', sub: 'Date, place, time, size, what to wear, and a plan for the weather.',
      phoneLines: [['The date and place', 'Tell me the date, the place, and the time you are picturing.'], ['How many', 'About how many people do you think will be there?'], ['Weather', 'If the weather does not cooperate, what would you like to do?']],
      lists: {wtype: {title: 'Kind of Ceremony', single: true, items: L2(['wedding', 'Wedding'], ['elopement', 'Elopement'], ['renewal', 'Vow Renewal'])},
        size: {title: 'How Many Guests', single: true, items: L2(['two', 'Just Us and Two Witnesses'], ['small', 'Under 30'], ['mid', '30 to 100'], ['large', '100 to 200'], ['xl', 'Over 200'])},
        venue: {title: 'Kind of Place', single: true, items: L2(['church', 'A Church or Chapel'], ['outdoor', 'Outdoors'], ['barn', 'A Barn or Farm'], ['hall', 'A Hall or Event Center'], ['home', 'At Home'], ['lake', 'By the Lake'])},
        timeofday: {title: 'Time of Day', single: true, items: L2(['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening'], ['sunset', 'Sunset'])},
        weather: {title: 'Weather Plan', items: L2(['inside', 'An Indoor Backup Room'], ['tent', 'A Tent'], ['umbrellas', 'Umbrellas Ready'], ['time', 'Move the Time'], ['rainorshine', 'Go Ahead, Rain or Shine'])}}},
    {id: 'license', title: 'The License', say: 'Let us walk through the marriage license together, so nothing surprises you.', sub: 'The Minnesota checklist. Tap each one as it is done.',
      phoneLines: [['The license', 'You will apply at a Minnesota county office, and the license is good anywhere in Minnesota.'], ['Bring it to me', 'Please bring the license to the rehearsal, or hand it to me before the ceremony.'], ['Witnesses', 'You will need two witnesses to sign after the ceremony.']], lists: {}},
    {id: 'ceremony', title: 'The Ceremony', say: 'Here is a simple shape for the ceremony. Let us walk through it and change anything that does not feel like the two of you.', sub: 'The order lives in the Service Builder, so it stays one plan.',
      phoneLines: [['The shape', 'I will read the parts of the ceremony in order. Stop me anywhere.'], ['Readings and music', 'Is there a reading or a song that means something to you?'], ['Length', 'As we have it, the ceremony runs about [Minutes] minutes.']], lists: {}},
    {id: 'people', title: 'The People', say: 'Tell me who is standing with you, and who is walking in. We will set the order together.', sub: 'The wedding party, the processional and recessional, readers, musicians, and the coordinator.',
      phoneLines: [['Who stands with you', 'Who would you like standing up with you?'], ['Walking in', 'Who walks in, and in what order? We can keep it simple.'], ['Readers and music', 'Is anyone reading, singing, or playing?']],
      lists: {roles: {title: 'Roles', items: []}}},
    {id: 'vows', title: 'Vows', say: 'Your vows are the heart of the day. Would you like to repeat after me, write your own, or a bit of both?', sub: 'The Vows Helper for each of you, right here or at home.',
      phoneLines: [['Your vows', 'You can repeat after me, write your own, or a bit of both.'], ['Writing at home', 'I can send each of you a few questions to answer on your own, and you can send them back to me.']],
      lists: {vowstyle: {title: 'How Will You Say Your Vows?', single: true, items: L2(['repeat', 'Repeat After Me'], ['own', 'Write Our Own'], ['mix', 'A Mix of Both'])}}},
    {id: 'rehearsal', title: 'Rehearsal', say: 'The rehearsal is short and calm. We will walk it twice, and everyone will know where to stand.', sub: 'Who stands where, the cues, and the timing.',
      phoneLines: [['When', 'Let us pick a time for the rehearsal, usually the day before.'], ['Who comes', 'Everyone walking in or standing up, the readers, and the musicians if they can.']], lists: {}},
    {id: 'review', title: 'Review Together', say: 'Let us look at the whole plan together. Tell me if anything feels off.', sub: '',
      phoneLines: [['Reading it back', 'I will read the plan back to you slowly. Stop me anywhere.'], ['Your copy', 'I will send your copy by email, and it can be printed.']], lists: {}},
    {id: 'outputs', title: "What You'll Get", say: 'When we are done, here is what you will have in hand, and what I will carry for you on the day.', sub: '',
      phoneLines: [['What you will have', 'A copy of the whole plan, the rehearsal plan, a sheet for your wedding party, the license checklist, and a packet for your venue.'], ['On the day', 'I will have the whole ceremony in front of me, so you can simply be present.']], lists: {}},
    {id: 'meetings', title: 'Since Last Time and Next Meeting', say: 'Here is what we finished since we last met, and what is still open. Let us set our next time together.', sub: '',
      phoneLines: [['Since last time', 'Here is what is done since we last met, and what is still open.'], ['Next time', 'When would you like to meet next?']], lists: {}}
  ],
  roles: [{id: 'p1parents', t: "[Partner 1]'s Parents", side: 'p1', many: true}, {id: 'p2parents', t: "[Partner 2]'s Parents", side: 'p2', many: true}, {id: 'grandparents', t: 'Grandparents', many: true},
    {id: 'honor1', t: "[Partner 1]'s Honor Attendant", side: 'p1'}, {id: 'honor2', t: "[Partner 2]'s Honor Attendant", side: 'p2'}, {id: 'att1', t: "[Partner 1]'s Attendants", side: 'p1', many: true}, {id: 'att2', t: "[Partner 2]'s Attendants", side: 'p2', many: true},
    {id: 'flower', t: 'Flower Girl', many: true}, {id: 'ring', t: 'Ring Bearer', many: true}, {id: 'readers', t: 'Reader', many: true}, {id: 'musicians', t: 'Musician', many: true}, {id: 'ushers', t: 'Usher', many: true},
    {id: 'witness', t: 'Witness', many: true}, {id: 'coordinator', t: 'Coordinator'}, {id: 'photographer', t: 'Photographer'}, {id: 'other', t: 'Other', many: true}],
  processional: [
    {id: 'traditional', t: 'Traditional', lead: 'Family is seated, the officiant and [Partner 2] wait at the front, the attendants walk in, and [Partner 1] comes last.', order: ['grandparents', 'p2parents', 'p1parents', 'officiant', 'p2', 'att2', 'att1', 'honor2', 'honor1', 'ring', 'flower', 'p1'], recessional: ['p1', 'p2', 'flower', 'ring', 'honor1', 'honor2', 'att1', 'att2', 'p1parents', 'p2parents', 'grandparents']},
    {id: 'together', t: 'Walking In Together', lead: 'The two of you walk in side by side, after everyone else.', order: ['grandparents', 'p1parents', 'p2parents', 'officiant', 'att1', 'att2', 'honor1', 'honor2', 'ring', 'flower', 'p1'], recessional: ['p1', 'p2', 'flower', 'ring', 'honor1', 'honor2', 'att1', 'att2', 'p1parents', 'p2parents', 'grandparents']},
    {id: 'parents', t: 'Each With Parents', lead: 'Each of you walks in with your parents, one after the other.', order: ['grandparents', 'officiant', 'att1', 'att2', 'honor1', 'honor2', 'ring', 'flower', 'p2', 'p1'], recessional: ['p1', 'p2', 'flower', 'ring', 'honor1', 'honor2', 'att1', 'att2', 'p1parents', 'p2parents', 'grandparents']},
    {id: 'small', t: 'Small and Simple', lead: 'Just the officiant, your two witnesses or honor attendants, and the two of you.', order: ['officiant', 'honor1', 'honor2', 'witness', 'p1'], recessional: ['p1', 'p2', 'honor1', 'honor2', 'witness']}],
  license: {title: 'The License', say: 'Let us walk through the marriage license together, so nothing surprises you.', intro: 'Apply at any Minnesota county office. Each line below has its source. Anything marked Check with the County is worth a quick call.',
    countyLine: 'Stearns County serves St. Cloud; any Minnesota county can issue the license.', phoneLine: ['The license', 'Apply at any Minnesota county office together, and bring the license to me before the ceremony.']},
  vowsHelper: {title: 'Vows Helper', say: 'Let us write your vows together. I will ask, and you answer in your own words. Short and true is plenty.', sub: 'A few questions, then a real draft you can change.',
    prompts: [{id: 'first', t: 'When I First Knew', q: 'When did you first know?'}, {id: 'love', t: 'What I Love About You', q: 'What do you love most about them?'}, {id: 'laugh', t: 'A Moment That Makes Me Smile', q: 'A small moment with them that makes you smile.'},
      {id: 'learned', t: 'What You Have Taught Me', q: 'What have they taught you?'}, {id: 'promise', t: 'What I Promise', q: 'What do you promise them? One or two real promises.'}, {id: 'always', t: 'What I Will Always Do', q: 'Something small you will always do for them.'}, {id: 'hope', t: 'My Hope for Us', q: 'What do you hope your life together will be?'}],
    shareWords: 'Hi [Partner], here are a few questions to help you write your vows. Answer them on your own, in your own words, at your own pace. Short and true is plenty. [Chris]',
    sendBack: 'When you are ready, reply to this message with your answers or your finished vows. I will keep them private until the day.'},
  vowsProse: {
    openings: [
      {id: 'w1', tone: 'warm', faith: 'either', t: '{Other}, I knew {first}.'},
      {id: 'w2', tone: 'warm', faith: 'faith', t: '{Other}, I thank God for the day I knew {first}.'},
      {id: 'w3', tone: 'warm', faith: 'plain', t: '{Other}, I still remember when I knew: {first}.'},
      {id: 'p1', tone: 'plain', faith: 'either', t: '{Other}, I knew {first}.'},
      {id: 'p2', tone: 'plain', faith: 'faith', t: '{Other}, before God and these people we love, I choose you.'},
      {id: 'p3', tone: 'plain', faith: 'plain', t: '{Other}, today I choose you.'}],
    middle: {warm: ['I love {love}.', 'I smile every time I think of {laugh}.', 'You have taught me {learned}.'], plain: ['I love {love}.', 'You have taught me {learned}.']},
    promises: {warm: ['I promise {promise}.', 'I will always {always}.'], plain: ['I promise {promise}.', 'I will always {always}.']},
    closings: [
      {id: 'w1', tone: 'warm', faith: 'either', t: 'My hope for us is {hope}. I am yours, today and every day after.'},
      {id: 'w2', tone: 'warm', faith: 'faith', t: 'My hope for us is {hope}. With God\'s help, I am yours, today and every day after.'},
      {id: 'w3', tone: 'warm', faith: 'plain', t: 'My hope for us is {hope}. I choose you, today and every day after.'},
      {id: 'p1', tone: 'plain', faith: 'either', t: 'I hope for {hope}. I am yours.'},
      {id: 'p2', tone: 'plain', faith: 'faith', t: 'I hope for {hope}. So help me God, I am yours.'},
      {id: 'p3', tone: 'plain', faith: 'plain', t: 'I hope for {hope}. I am yours.'}],
    missing: '[ask {Me}: {what}]',
    polish: ['Read it aloud once, slowly, start to finish.', 'Say their name the way you say it at home.', 'Keep every promise one you can keep.', 'Fill every spot in [brackets], or take it out.', 'Aim for about one to two minutes.', 'Print it in large type for the day.'],
    targetMinutes: 1.5},
  repeatVows: {faith: 'In the Name of God, I, [Partner 1 Full], take you, [Partner 2 Full], to be my partner in marriage, to have and to hold from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until we are parted by death. This is my solemn vow.',
    plain: 'I, [Partner 1 Full], choose you, [Partner 2 Full], to be my partner in life. I promise to love you, to be honest with you, to stand by you in good times and hard ones, and to keep choosing you, every day.'},
  attire: {title: 'What to Wear', say: 'Some couples love a formal day, and some want everyone relaxed and comfortable. What feels right for the two of you?', sub: 'Tap one for the guests, one for the wedding party, and one for what I will wear.',
    guests: {title: 'How Will Guests Dress?', items: L2(['formal', 'Formal'], ['cocktail', 'Semi-Formal'], ['dressy', 'Dress Casual'], ['relaxed', 'Relaxed and Comfortable'], ['outdoor', 'Ready for Outdoors'])},
    party: {title: 'The Wedding Party', items: L2(['matching', 'Matching'], ['color', 'One Color, Their Own Style'], ['own', 'Their Own Choice'])},
    chris: {title: 'What I Will Wear', items: L2(['suit', 'A Suit'], ['dresscasual', 'Dress Casual'], ['chaplain', 'My Normal Chaplain Clothes'])},
    chrisLine: '[Chris] will wear [Wear].', guestLine: 'Guests: [Dress].', partyLine: 'Wedding party: [Party].',
    phoneLine: ['What to Wear', 'How would you like guests to dress, and what feels right for your wedding party? I will match the feel you choose.']},
  rehearsal: {say: 'The rehearsal is short and calm. We will walk it twice, and everyone will know where to stand.',
    blocks: [{h: 'Welcome', t: 'Thank everyone for coming. Introduce yourself and the coordinator, and say the plan: we walk it twice.', min: 5}, {h: 'Places', t: 'Everyone stands where they will stand at the end of the processional, so they see the picture first.', min: 5},
      {h: 'The Processional', t: 'Walk the processional in order, with the music if it is here. Space each person about halfway down the aisle from the one before.', min: 10}, {h: 'The Ceremony, Walked Through', t: 'Walk through each part in order: who moves, who hands the rings, where the readers stand, and the unity ritual.', min: 10},
      {h: 'The Recessional', t: 'Walk out in pairs, in order, after the kiss and the presentation.', min: 5}, {h: 'Once More', t: 'Run it once more from the top, start to finish, without stopping.', min: 15}, {h: 'Last Notes', t: 'Arrival times for the day, where the license and the rings go, and who holds the bouquet.', min: 5}],
    places: L2(['front', 'At the Front With the Officiant'], ['p1side', "[Partner 1]'s Side"], ['p2side', "[Partner 2]'s Side"], ['row1p1', "Front Row, [Partner 1]'s Side"], ['row1p2', "Front Row, [Partner 2]'s Side"], ['aisle', 'Aisle Seat'], ['back', 'At the Back']),
    cues: L2(['music', 'Music Starts'], ['doors', 'Doors Open'], ['stand', 'Everyone Stands'], ['nod', 'The Officiant Nods'], ['kiss', 'After the Kiss'], ['recmusic', 'Recessional Music'])},
  checklist: [{id: 'license', t: 'Marriage license appointment', who: 'Couple'}, {id: 'witnesses', t: 'Two witnesses chosen', who: 'Couple'}, {id: 'rings', t: 'Rings', who: 'Couple'}, {id: 'vows', t: 'Vows written', who: 'Couple'},
    {id: 'music_files', t: 'Music to the musician or DJ', who: 'Couple'}, {id: 'unity', t: 'Unity ritual supplies', who: 'Couple'}, {id: 'programs', t: 'Programs printed', who: 'Family'}, {id: 'rehearsal_dinner', t: 'Rehearsal dinner place', who: 'Family'},
    {id: 'headcount', t: 'Final headcount to the venue', who: 'Couple'}, {id: 'sound', t: 'Microphone and sound', who: 'Venue'}, {id: 'chairs', t: 'Chairs and the aisle set up', who: 'Venue'}, {id: 'license_bring', t: 'License to the officiant before the ceremony', who: 'Couple'}],
  whoTags: ['Couple', 'Chris', 'Venue', 'Coordinator', 'Family', 'Wedding Party'],
  outputs: [
    {id: 'script', title: 'Officiant Script', lead: 'Every part in order with the words to say, who speaks, the vows, and the timing. Faith or plain wording, as the couple chose.'},
    {id: 'rehearsal', title: 'Rehearsal Plan', lead: 'Who stands where, the processional and recessional in order, the cues, and the timing, on one page.'},
    {id: 'couple', title: 'Couple Copy', lead: 'A calm, plain copy of the whole plan for the two of you, by email or print.'},
    {id: 'venue', title: 'Venue Coordinator Packet', lead: 'Everything the venue needs: the order and timeline, music, the people, setup, the weather plan, and contacts.'},
    {id: 'venueQ', title: 'Questions for the Venue', lead: 'A short list of what we need to know from the venue, to send or ask on the phone.'},
    {id: 'party', title: 'Wedding Party Sheet', lead: 'One page for the wedding party: where to be, when, the order, and what to bring and wear.'},
    {id: 'license', title: 'License Checklist', lead: 'The Minnesota marriage license, step by step, with sources.'}],
  venuePacket: {title: 'Venue Coordinator Packet', lead: 'Everything the venue coordinator needs before the day: the order and timeline, music, the people, setup, rituals, attire, the weather plan, the license signing, and contacts.', intro: 'Here is the plan for the ceremony. Please call or email with any question.',
    sections: [{id: 'order', h: 'Order of the Ceremony'}, {id: 'timeline', h: 'Timeline'}, {id: 'music', h: 'Music'}, {id: 'people', h: 'The People'}, {id: 'setup', h: 'Setup'}, {id: 'rituals', h: 'Rituals and Supplies'}, {id: 'attire', h: 'Attire'}, {id: 'weather', h: 'Weather Plan'}, {id: 'license', h: 'Signing the License'}, {id: 'contacts', h: 'Contacts'}, {id: 'notes', h: 'Notes'}],
    subject: 'The ceremony plan for [Couple]', sendWords: 'Hi [Coordinator],\n\nHere is the plan for [Couple]\'s ceremony: the order, the timeline, music, the people, setup, and contacts. Please let me know anything you need from me.\n\nThank you,\n[Chris]'},
  venueQuestions: {title: 'Questions for the Venue', lead: 'A short list of what we need from the venue, to send or to ask on the phone.', intro: 'A few details help the day go smoothly. Thank you for your help.',
    items: [{id: 'arrive', q: 'What time can the couple, the wedding party, and I arrive?'}, {id: 'stand', q: 'Where will the ceremony be, and where should the officiant stand?'}, {id: 'sound', q: 'Is there a microphone and sound system, and who runs it?'}, {id: 'power', q: 'Is there power for the musicians or a speaker?'},
      {id: 'flame', q: 'Are candles or open flames allowed?'}, {id: 'throw', q: 'Are petals, sand, or anything tossed allowed?'}, {id: 'rain', q: 'What is the rain plan, and when is the call made?'}, {id: 'rehearsal', q: 'When can we hold the rehearsal, and in which space?'},
      {id: 'photo', q: 'Are there limits for the photographer during the ceremony?'}, {id: 'timeline', q: 'What does the venue timeline look like from arrival to the reception?'}, {id: 'parking', q: 'Where do guests and the wedding party park?'}, {id: 'access', q: 'Is the space easy to reach for guests who use a wheelchair or walker?'}, {id: 'table', q: 'Is there a small table for the license signing and a unity ritual?'}, {id: 'contact', q: 'Who is my contact on the day, and the best number to reach them?'}],
    subject: 'A few questions for [Couple]\'s ceremony', sendWords: 'Hi [Coordinator],\n\nI am the officiant for [Couple]\'s ceremony. A few details will help the day go smoothly. Could you answer these when you have a moment?\n\nThank you,\n[Chris]'},
  partySheet: {title: 'Wedding Party Sheet', lead: 'One page for everyone standing up or walking in.', intro: 'Thank you for standing with [Couple]. Here is where to be, when, and what to bring.', subject: 'Your wedding party sheet for [Couple]', sendWords: 'Hi everyone,\n\nHere is the wedding party sheet for [Couple]\'s wedding: where to be, when, the order, and what to bring. See you at the rehearsal!\n\n[Chris]'},
  meetings: {say: 'Here is what we finished since we last met, and what is still open.', sinceTitle: 'Since Last Time', doneTitle: 'Done Since Last Time', openTitle: 'Still Open', nextTitle: 'Next Meeting', nextSay: 'When would you like to meet next, and what should we cover?',
    agenda: L2(['story', 'Their Story'], ['ceremony', 'The Ceremony'], ['vows', 'Vows'], ['people', 'The People'], ['license', 'The License'], ['rehearsal', 'The Rehearsal'], ['review', 'Review the Whole Plan'])},
  approval: {title: 'Couple Approval', say: 'Take a look at the whole plan. When it feels right, you can approve it here, or I can send it to you to read at home.', lead: 'Read it through. When it feels right, type your name and tap I Approve.', typed: 'Type your full name', button: 'I Approve',
    subject: 'Your wedding plan, for your approval', sendWords: 'Hi [Couple],\n\nHere is the plan we made together. Read it at your own pace. When it feels right, reply "I approve" with your full names. Anything you would like changed, just tell me.\n\n[Chris]',
    done: 'Approved by [Who] on [Date].', changed: 'The plan changed after it was approved. Show it again or send it again for a fresh approval.'},
  finish: {title: 'Finish', say: 'Thank you for trusting me with your day. Here is everything we made, and what happens next.', thanks: 'Thank you for letting me be part of your day. It will be full of love, and you can simply be present for it.', familyLine: 'Thank you. Your plan is ready.',
    next: ['I will send the venue the packet and our questions.', 'I will check in a few days before the rehearsal.', 'Bring the marriage license to the rehearsal.', 'Call or text me any time something changes.']},
  bundle: {title: 'Send Everything', lead: 'Every page in one printable packet, and one email or text to go with it.', subject: 'Your wedding: the full plan', sendWords: 'Hi [Couple],\n\nHere is everything we made together: your copy of the plan, the officiant script, the rehearsal plan, the wedding party sheet, the license checklist, and the venue packet. Save it, print it, and tell me anything you would like changed.\n\n[Chris]'},
  writingHelp: {ask: 'I sometimes use a secure writing assistant to help draft words. Is that all right with you?', reminder: 'The couple has not said yes to writing help yet. Ask in Welcome the Couple before you copy.',
    header: 'You are helping a wedding officiant write words for a ceremony.\nWrite in his warm, plain, first-person voice: short sentences, easy to read aloud.\nKeep every [placeholder] in square brackets exactly as written. Never replace one with a name.\nNever invent facts. Where something is missing, write [ask the couple].\nUse no em dashes or en dashes.',
    pieces: [{id: 'vows1', t: "Partner 1's Vows", ask: "Vows for [Partner 1] to say to [Partner 2], about one to two minutes, in [Partner 1]'s own words from the answers below."},
      {id: 'vows2', t: "Partner 2's Vows", ask: "Vows for [Partner 2] to say to [Partner 1], about one to two minutes, in [Partner 2]'s own words from the answers below."},
      {id: 'address', t: "The Couple's Story", ask: "The officiant's words about the couple, about three to four minutes: how they met, when they knew, and what they hope for."},
      {id: 'welcome', t: 'Welcome', ask: 'A warm welcome of about one minute.'}, {id: 'program', t: 'Program Text', ask: 'A few warm lines for the program.'}, {id: 'other', t: 'Other Pieces', ask: 'Any other piece asked for below.'}],
    labels: {partner1: 'Partner 1', partner1Full: 'Partner 1 Full', partner2: 'Partner 2', partner2Full: 'Partner 2 Full', parent: 'Parent', attendant: 'Attendant', reader: 'Reader', musician: 'Musician', clergy: 'Clergy', venue: 'Venue', coordinator: 'Coordinator', church: 'Church', city: 'City', place: 'Place', other: 'Name'},
    pasteHelp: 'Paste everything the writing assistant gave back. The names come back in, and each piece goes to its place.'},
  followUp: [
    {id: 'thanks', title: 'About a Week After', offsetDays: 7, email: {subject: 'Thinking of you two', body: 'Dear [Couple],\n\nIt was a joy to stand with you last week. I hope the days since have been full of rest and good memories.\n\nWith joy,\n[Chris]'},
      call: {open: 'Hi, it is [Chris]. I wanted to say congratulations again, and see how you are doing.', questions: ['What was your favorite moment of the day?', 'How has the first week been?'], listenFor: 'Joy, tiredness, and anything that felt hard about the day.'}},
    {id: 'anniversary', title: 'First Anniversary', anchor: 'anniversary', invite: true, email: {subject: 'Happy first anniversary', body: 'Dear [Couple],\n\nA year ago today you made your promises. I hope this year has been full of good mornings, honest talks, and plenty of laughter. Happy anniversary!\n\nWith joy,\n[Chris]'},
      call: {open: 'Hi, it is [Chris]. Happy anniversary! I have been thinking of your wedding day.', questions: ['What has surprised you most about this first year?', 'What has helped the two of you most?'], listenFor: 'How they are doing together, and any wish for support.'}}],
  gmInvite: 'If you would like a gentle way to keep growing together, The Grounded Marriage has Practices for Two and a Monthly Check-in for Two. Here is the link: [Link]',
  shareWords: {gm: 'Here is The Grounded Marriage, an app for the two of you: a check-in for two, practices, and conversations worth having. [Link]'},
  coupleCopyLead: 'Here is the plan we made together. Nothing here is set in stone: tell me anything you would like to change.',
  crisis: 'In a crisis, call or text 988 any time. In an emergency, call 911.'
};
// The license, before the Staff library's checklist arrives: the plain shape only, each marked to check with the county.
const LIC0 = [{id: 'where', who: 'couple', confirmed: false, text: 'Apply at a Minnesota county office. Confirm with the county.'}, {id: 'bring', who: 'couple', confirmed: false, text: 'Both of you bring a photo ID. Confirm with the county.'},
  {id: 'fee', who: 'couple', confirmed: false, text: 'Ask the county about the fee and the reduced fee with premarital education. Confirm with the county.'}, {id: 'witnesses', who: 'couple', confirmed: false, text: 'Two witnesses sign after the ceremony. Confirm with the county.'},
  {id: 'return', who: 'officiant', confirmed: false, text: 'The officiant returns the completed license to the county. Confirm the days with the county.'}];

// The library's key over the built-in words, piece by piece.
let CF = null, CFsrc;
function cfg(){
  const lib = (C.lib && C.lib()) || null, L = (lib && lib.weddingPlanning) || null;
  if (CF && CFsrc === L) return CF;
  const A = (k) => L && Array.isArray(L[k]) && L[k].length ? L[k] : DEF[k];
  const steps = DEF.steps.map(d => { const l = L && arr(L.steps).find(x => x && x.id === d.id);
    if (!l) return d; const lists = Object.assign({}, d.lists);
    Object.entries(l.lists || {}).forEach(([k, v]) => { if (v && arr(v.items).length) lists[k] = Object.assign({}, d.lists[k] || {}, v); });
    return Object.assign({}, d, l, {lists, phoneLines: arr(l.phoneLines).length ? l.phoneLines : d.phoneLines}); });
  CF = {full: !!L, steps, checklist: A('checklist'), whoTags: A('whoTags'), outputs: A('outputs'), followUp: A('followUp'), roles: A('roles'), processional: A('processional'),
    shareWords: Object.assign({}, DEF.shareWords, (L && L.shareWords) || {}), coupleCopyLead: (L && L.coupleCopyLead) || DEF.coupleCopyLead, crisis: (L && L.crisis) || DEF.crisis, gmInvite: (L && L.gmInvite) || DEF.gmInvite};
  const O = k => { const l = L && L[k] && typeof L[k] === 'object' && !Array.isArray(L[k]) ? L[k] : {}, o = Object.assign({}, DEF[k]);
    Object.keys(l).forEach(f => { const v = l[f]; if (v == null || (Array.isArray(v) && !v.length) || v === '') return; o[f] = v && typeof v === 'object' && !Array.isArray(v) && DEF[k][f] && typeof DEF[k][f] === 'object' && !Array.isArray(DEF[k][f]) ? Object.assign({}, DEF[k][f], v) : v; });
    return o; };
  ['license', 'vowsHelper', 'vowsProse', 'repeatVows', 'attire', 'rehearsal', 'venuePacket', 'venueQuestions', 'partySheet', 'meetings', 'approval', 'finish', 'bundle', 'writingHelp'].forEach(k => { CF[k] = O(k); });
  ['guests', 'party', 'chris'].forEach(k => { if (!arr(CF.attire[k] && CF.attire[k].items).length) CF.attire[k] = DEF.attire[k]; });
  CFsrc = L;
  return CF;
}
const CNT = 12;
const STEP = n => cfg().steps[n - 1];
const SNUM = id => cfg().steps.findIndex(s => s.id === id) + 1;

// ---------- plans ----------
function store(){ const d = D(); if (!d) return {plans: [], me: {}}; d.wdp = d.wdp || {plans: []}; d.wdp.plans = d.wdp.plans || []; d.wdp.me = d.wdp.me || {}; return d.wdp; }
const plans = () => store().plans;
const plan = () => plans().find(p => p.id === S.id) || null;
let endT = null;
function touch(p){ if (p) p.u = Date.now(); C.save && C.save(); pushFam(); if (p){ svcPush(p); clearTimeout(endT); endT = setTimeout(() => meetEnd(p), 600); } }
const blankV = () => ({a: {}, d: '', tone: 'warm', oi: 0, ci: 0, edited: false, ready: '', marks: '', pol: {}, show: false});
function newPlan(){
  return {id: 'wd' + uid(), u: Date.now(), made: today(), c: {p1: {}, p2: {}}, sel: {}, own: {}, notes: {}, tidy: {}, custom: {}, stars: {}, tags: {}, story: {},
    day: {}, svc: null, people: [], proc: {pattern: '', order: [], rec: []}, vows: {p1: blankV(), p2: blankV()}, reh: {pos: {}}, clergy: [],
    tasks: cfg().checklist.map(x => ({id: x.id, t: x.t, who: x.who || '', done: false, d: ''})), next: [], lic: {}, licD: {}, venue: {}, vq: {},
    mt: [], nextMt: {agenda: []}, fu: {}, fuOwn: [], ses: [], writings: [], appr: []};
}
const me = () => { const n = String(((D() || {}).settings || {}).name || '').trim(); return n.split(/\s+/)[0] || 'Chris'; };
const pc = (p, k) => (p.c && p.c[k]) || {};
const firstOf = o => (o.called || '').trim() || (o.full || '').trim().split(/\s+/)[0] || '';
const P1 = p => firstOf(pc(p, 'p1')) || 'Partner 1';
const P2 = p => firstOf(pc(p, 'p2')) || 'Partner 2';
const fullOf = (p, k) => (pc(p, k).full || '').trim() || firstOf(pc(p, k)) || (k === 'p1' ? 'Partner 1' : 'Partner 2');
const couple = p => P1(p) + ' and ' + P2(p);
const pTitle = p => (firstOf(pc(p, 'p1')) || firstOf(pc(p, 'p2'))) ? couple(p) : 'A New Wedding Plan';
const venueName = p => clean(p.day.place) || '';
function fill(t, p, x){
  x = x || {};
  const v = p ? {'Partner 1': P1(p), 'Partner 2': P2(p), 'Partner 1 Full': fullOf(p, 'p1'), 'Partner 2 Full': fullOf(p, 'p2'), Couple: couple(p), Chris: me(), Venue: venueName(p) || 'the venue', Date: nice(p.day.date) || 'the day', Time: tm(p.day.time), Coordinator: (clean((p.venue || {}).coord).split(/\s+/)[0]) || 'there', Name: P1(p) + ' and ' + P2(p)} : {Chris: me()};
  return String(t || '').replace(/\[(Partner 1 Full|Partner 2 Full|Partner 1|Partner 2|Partner|Couple|Chris|Venue|Date|Time|Minutes|Coordinator|Link|Name)\]/g, (m, k) => x[k] != null ? x[k] : v[k] != null ? v[k] : m);
}
const W = (t, p, x) => fill(t, p, x);
const faithOf = p => (p.sel.faithway || [])[0] || '';
// Faith words only when the couple chose Faith or A Blend; otherwise the plain words.
const plainOf = p => !['faith', 'blend'].includes(faithOf(p));

// Lists: the library's items, then the couple's own.
function list(id){
  const A = cfg().attire, R = cfg().rehearsal;
  if (id === 'attire') return Object.assign({single: true}, A.guests);
  if (id === 'partyWears') return Object.assign({single: true}, A.party);
  if (id === 'chrisWears') return Object.assign({single: true}, A.chris);
  if (id === 'places') return {title: 'Where They Stand', single: true, items: R.places};
  if (id === 'cues') return {title: 'Cues', items: R.cues};
  if (id === 'agenda') return {title: 'Next Time', items: cfg().meetings.agenda};
  if (id === 'roles') return {title: (STEP(SNUM('people')).lists.roles || {}).title || 'Roles', items: cfg().roles};
  for (const s of cfg().steps) if (s.lists && s.lists[id]) return s.lists[id];
  return {title: '', items: []};
}
const items = (p, id) => arr(list(id).items).concat(arr(p.own[id]));
const isOn = (p, id, v) => arr(p.sel[id]).includes(v);
const label = (p, id, v) => fill((items(p, id).find(x => x.id === v) || {}).t || v, p);
const picked = (p, id) => arr(p.sel[id]).map(v => label(p, id, v));
const whoList = p => { const base = cfg().whoTags.map(w => w === 'Chris' ? me() : w), more = Object.values(p.tags).concat(p.tasks.map(t => t.who)).filter(w => w && !base.includes(w)); return base.concat([...new Set(more)]); };
const wDate = p => p.day.date || '';

// ---------- the people and the processional ----------
const roleOf = id => cfg().roles.find(r => r.id === id) || {id, t: id};
const roleName = (p, id) => fill(roleOf(id).t, p);
const VP = {_p1: 1, _p2: 1, _off: 1};
function person(p, id){
  if (id === '_p1') return {id, name: P1(p), role: 'p1'};
  if (id === '_p2') return {id, name: P2(p), role: 'p2'};
  if (id === '_off') return {id, name: me(), role: 'officiant'};
  return arr(p.people).find(x => x.id === id) || null;
}
const pName = (p, id) => { const x = person(p, id); return x ? (clean(x.name) || roleName(p, x.role)) : ''; };
const pLabel = (p, id) => { const x = person(p, id); if (!x) return ''; if (id === '_off') return me() + ', officiant'; if (VP[id]) return x.name; return (clean(x.name) || 'Someone') + ' (' + roleName(p, x.role) + ')'; };
const byRole = (p, r) => r === 'p1' ? ['_p1'] : r === 'p2' ? ['_p2'] : r === 'officiant' ? ['_off'] : arr(p.people).filter(x => x.role === r).map(x => x.id);
const PAIRS = [['p1', 'p2'], ['honor1', 'honor2'], ['att1', 'att2'], ['flower', 'ring'], ['p1parents', 'p2parents'], ['readers', 'readers']];
function buildOrder(p, pat){
  const P = cfg().processional.find(x => x.id === pat) || cfg().processional[0]; if (!P) return;
  const order = [], used = new Set();
  arr(P.order).forEach(r => byRole(p, r).forEach(id => { if (!used.has(id)){ used.add(id); order.push({id, with: ''}); } }));
  const row = id => order.find(x => x.id === id);
  if (pat === 'together' || pat === 'small'){ const a = row('_p1'); if (a){ a.with = '_p2'; } }
  if (pat === 'parents'){ const a = row('_p1'), b = row('_p2'), m1 = byRole(p, 'p1parents')[0], m2 = byRole(p, 'p2parents')[0]; if (a && m1) a.with = m1; if (b && m2) b.with = m2; }
  const withs = new Set(order.map(x => x.with).filter(Boolean));
  p.proc.order = order.filter(x => !withs.has(x.id));
  if (!p.proc.order.some(x => x.id === '_p2' || x.with === '_p2') && pat !== 'traditional') p.proc.order.push({id: '_p2', with: ''});
  const rec = [], ru = new Set(), toks = arr(P.recessional);
  toks.forEach((r, i) => { if (ru.has('t' + r)) return; const A = byRole(p, r).filter(id => !ru.has(id)); const pr0 = PAIRS.find(x => x[0] !== x[1] && (x[0] === r || x[1] === r) && toks.indexOf(x[0] === r ? x[1] : x[0]) > i), mate = pr0 ? (pr0[0] === r ? pr0[1] : pr0[0]) : null;
    const B = mate ? byRole(p, mate).filter(id => !ru.has(id)) : []; if (mate) ru.add('t' + mate);
    const n = Math.max(A.length, B.length); for (let j = 0; j < n; j++){ const a = A[j], b = B[j]; if (a){ ru.add(a); if (b) ru.add(b); rec.push({id: a, with: b || ''}); } else if (b){ ru.add(b); rec.push({id: b, with: ''}); } } });
  p.proc.rec = rec; p.proc.pattern = P.id;
}
const walkLine = (p, r) => pLabel(p, r.id) + (r.with ? ', with ' + pLabel(p, r.with) : '');
const procLines = p => arr(p.proc.order).filter(r => person(p, r.id)).map(walkLine.bind(null, p));
const recLines = p => arr(p.proc.rec).filter(r => person(p, r.id)).map(walkLine.bind(null, p));

// ---------- the order of service (the Service Builder's) ----------
const CER = () => window.GGCer && GGCer.wd ? GGCer.wd : null;
function cerBind(){ const c = CER(); if (c) c.bind({lib: C.lib && C.lib(), data: D(), save: C.save}); return c; }
const hasSvc = p => { const c = cerBind(); return !!(c && p.svc && c.get(p.svc)); };
const svcTotal = p => hasSvc(p) ? CER().total(p.svc) : 0;
function cerFaith(p){
  const f = faithOf(p); if (f === 'plain') return 'plain'; if (f === 'blend') return 'mixed'; if (f !== 'faith') return null;
  const fs = CER().faiths(), lab = picked(p, 'tradition').map(x => x.toLowerCase());
  for (const l of lab){ const m = fs.find(x => x.name.toLowerCase() === l) || fs.find(x => x.name.toLowerCase().includes(l) || l.includes(x.name.toLowerCase())); if (m) return m.id; }
  return 'christian';
}
function svcType(p){ const w = (p.sel.wtype || [])[0], ts = (CER() ? CER().types() : []).map(t => t.id); return ts.includes(w) ? w : ts.includes('wedding') ? 'wedding' : (ts[0] || 'wedding'); }
function svcSync(p){
  const o = {p1: fullOf(p, 'p1'), p2: fullOf(p, 'p2'), first1: P1(p), first2: P2(p), date: p.day.date || '', time: tm(p.day.time), place: venueName(p)};
  const f = cerBind() ? cerFaith(p) : null; if (f) o.faith = f; if (+p.day.length) o.length = +p.day.length;
  return o;
}
function leaders(p){ return [me(), P1(p), P2(p), couple(p)].concat(arr(p.people).filter(x => clean(x.name)).map(x => x.name), arr(p.clergy).map(c => c.name)).filter(Boolean).filter((x, i, a) => a.indexOf(x) === i); }
function order(p){ return hasSvc(p) ? CER().words(p.svc) : []; }
const pcHead = x => x ? x.title + (x.kind === 'music' && x.by ? ', ' + x.by : '') : '';
const holds = r => [r.piece && pcHead(r.piece)].concat(arr(r.rd).map(x => x.head || x)).filter(Boolean);
function timedOrder(p){ const o = order(p), t0 = p.day.time; let m = 0; return o.map(r => { const at = t0 ? clockAdd(t0, m) : ''; m += +r.mins || 0; return Object.assign({}, r, {at}); }); }
function inSvc(p){ const c = cerBind(); return c && hasSvc(p) ? c.inService(p.svc) : []; }
// The session's words follow into the Service Builder's script: the vows, the couple's story, and the welcome.
let svcT = null;
function svcPush(p, now){ clearTimeout(svcT); const go = () => { if (!p || !hasSvc(p)) return; const c = CER(), m = {};
  const vw = vowsBlock(p); if (vw) m.vows = {h: "The Couple's Vows", t: vw};
  if (clean(p.address)) m.story = {h: 'Words About the Couple', t: p.address};
  if (clean(p.welcomeText)) m['w-welcome'] = {h: 'Welcome, as Written', t: p.welcomeText};
  c.words2(p.svc, m); c.lic(p.svc, p.lic || {}); }; if (now) go(); else svcT = setTimeout(go, 300); }
function ensureSvc(p){ if (hasSvc(p)) return true; const c = cerBind(); if (!c) return false; const o = svcSync(p); o.type = svcType(p); o.wdp = p.id; p.svc = c.make(o); return true; }

// ---------- the license (the Staff library's ceremonies.wedding.license) ----------
function licItems(){ const c = cerBind(); const L = c && c.license ? c.license() : []; return L.length ? L : LIC0.map(x => Object.assign({}, x)); }
const licOpen = p => licItems().filter(x => !(p.lic || {})[x.id]);

// ---------- vows ----------
const VK = ['p1', 'p2'];
const vS = (p, k) => { p.vows = p.vows || {}; const v = p.vows[k] = p.vows[k] || {}, b = blankV(); Object.keys(b).forEach(f => { if (v[f] == null) v[f] = b[f]; }); return v; };
const vName = (p, k) => k === 'p1' ? P1(p) : P2(p);
const vOther = (p, k) => k === 'p1' ? P2(p) : P1(p);
const vStyle = p => (p.sel.vowstyle || [])[0] || '';
function vVariants(p, k, kind){
  const P = cfg().vowsProse, tone = vS(p, k).tone === 'plain' ? 'plain' : 'warm', fw = plainOf(p) ? 'plain' : 'faith';
  const ok = x => x && x.t && (!x.faith || x.faith === 'either' || x.faith === fw);
  let L = arr(P[kind]).filter(x => ok(x) && (x.tone || 'warm') === tone); if (!L.length) L = arr(P[kind]).filter(ok); if (!L.length) L = DEF.vowsProse[kind].filter(ok);
  return L.length ? L : DEF.vowsProse[kind];
}
function vowsProse(p, k){
  const V = vS(p, k), a = V.a, P = cfg().vowsProse, tone = V.tone === 'plain' ? 'plain' : 'warm', Q = arr(cfg().vowsHelper.prompts);
  const bare = x => clean(x).replace(/[\s.,;:!?]+$/, '');
  const v = {Other: vOther(p, k), Me: vName(p, k)}; Q.forEach(q => { v[q.id] = bare(a[q.id]); });
  const lab = id => { const q = Q.find(x => x.id === id); return q ? String(q.t || id).toLowerCase() : id; };
  const miss = id => String(P.missing || DEF.vowsProse.missing).replace('{Me}', vName(p, k)).replace('{what}', lab(id));
  const toks = t => (String(t).match(/\{([A-Za-z0-9]+)\}/g) || []).map(x => x.slice(1, -1)).filter(x => Q.some(q => q.id === x));
  const line = t => { const u = toks(t); if (u.length && u.every(id => !v[id])) return ''; return String(t).replace(/\{([A-Za-z0-9]+)\}/g, (m, id) => Object.prototype.hasOwnProperty.call(v, id) ? (v[id] || miss(id)) : m).replace(/\s+([.,;:!?])/g, '$1').replace(/\s{2,}/g, ' ').trim(); };
  const lineKeep = t => String(t).replace(/\{([A-Za-z0-9]+)\}/g, (m, id) => Object.prototype.hasOwnProperty.call(v, id) ? (v[id] || miss(id)) : m).replace(/\s+([.,;:!?])/g, '$1').trim();
  const O = vVariants(p, k, 'openings'), Cl = vVariants(p, k, 'closings');
  const mid = (P.middle && arr(P.middle[tone]).length ? P.middle[tone] : DEF.vowsProse.middle[tone]).map(line).filter(Boolean).join(' ');
  const pro = (P.promises && arr(P.promises[tone]).length ? P.promises[tone] : DEF.vowsProse.promises[tone]).map(line).filter(Boolean).join(' ');
  return [lineKeep(O[(+V.oi || 0) % O.length].t), mid, pro, lineKeep(Cl[(+V.ci || 0) % Cl.length].t)].filter(Boolean).join('\n\n');
}
const vText = (p, k) => String(vS(p, k).d || '').trim();
const repeatWords = (p, k) => { const R = cfg().repeatVows, t = plainOf(p) ? R.plain : R.faith; const sw = k === 'p2' ? {'Partner 1 Full': fullOf(p, 'p2'), 'Partner 2 Full': fullOf(p, 'p1'), 'Partner 1': P2(p), 'Partner 2': P1(p)} : {}; return fill(t, p, sw); };
// The vows as they print under the Vows part: each partner's own words, or the repeat-after-me words.
function vowsBlock(p){
  const st = vStyle(p), out = [];
  VK.forEach(k => { const own = vText(p, k); if (own && st !== 'repeat') out.push(vName(p, k) + ' to ' + vOther(p, k) + ':\n' + own); else if (st === 'repeat' || (st === 'mix' && !own)) out.push(vName(p, k) + ', repeat after me:\n' + repeatWords(p, k)); });
  return out.join('\n\n');
}

// ---------- meetings: Since Last Time ----------
function trackables(p){
  const out = [], add = (key, t, done) => out.push({key, t, done: !!done});
  p.tasks.forEach(t => add('t|' + t.id, t.t + (t.who ? ' (' + t.who + ')' : ''), t.done));
  licItems().forEach(x => add('l|' + x.id, 'License: ' + snip(x.text, 70), (p.lic || {})[x.id]));
  if (vStyle(p) !== 'repeat') VK.forEach(k => add('v|' + k, vName(p, k) + "'s vows ready", vS(p, k).ready));
  add('svc', 'The order of the ceremony started', hasSvc(p));
  add('proc', 'The processional set', arr(p.proc.order).length);
  add('reh', 'The rehearsal date set', p.reh.date);
  add('vp', 'The Venue Coordinator Packet sent', p.vpSent);
  add('vq', 'The Questions for the Venue sent', p.vqSent);
  add('ap', 'The couple approved the plan', lastAppr(p) && lastAppr(p).ver === verOf(p));
  add('ses', 'Live sessions created', arr(p.ses).length);
  arr(p.next).forEach((x, i) => add('n|' + x.t, x.t, x.done));
  return out;
}
const snapOf = p => { const o = {}; trackables(p).forEach(x => { o[x.key] = x.done; }); return o; };
const curMeet = p => arr(p.mt).find(m => m.date === today()) || null;
function meetEnd(p){ const m = curMeet(p); if (!m || !plans().includes(p)) return; m.end = snapOf(p); }
function prevMeet(p){ const L = arr(p.mt).filter(m => m.date < today()).sort((a, b) => (a.at || 0) - (b.at || 0)); return L[L.length - 1] || null; }
function sinceLast(p){
  const prev = prevMeet(p), T = trackables(p); if (!prev) return {prev: null, done: [], open: T.filter(x => !x.done)};
  const was = prev.end || prev.snap || {};
  return {prev, done: T.filter(x => x.done && !was[x.key]), open: T.filter(x => !x.done)};
}
function startMeet(p){ if (curMeet(p)) return false; p.mt = arr(p.mt); p.mt.push({id: 'mt' + uid(), date: today(), at: Date.now(), steps: [], snap: snapOf(p), end: null, note: ''}); return true; }

// ---------- follow-ups ----------
function fuDate(p, f){
  const base = wDate(p) || '';
  if (f.anchor === 'anniversary'){ if (!base) return ''; return (+base.slice(0, 4) + 1) + base.slice(4); }
  return base ? addDays(base, +f.offsetDays || 0) : '';
}
function touches(p){
  const L = cfg().followUp.map(f => ({f, id: f.id, title: fill(f.title, p), date: fuDate(p, f)}));
  arr(p.fuOwn).forEach(o => L.push({f: {id: o.id, title: o.title}, id: o.id, own: true, title: o.title || 'My Own Check-In', date: o.date || ''}));
  return L.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
}
function dueSoon(){
  const out = [], until = addDays(today(), 7);
  plans().forEach(p => { if (!wDate(p)) return; touches(p).forEach(t => { const st = p.fu[t.id] || {}; if (!st.done && t.date && t.date <= until) out.push({p, t}); }); });
  return out.sort((a, b) => a.t.date.localeCompare(b.t.date));
}
const gmURL = () => SITE + 'the-grounded-marriage.html';

// ---------- small builders ----------
const fk = k => ` data-fk="${esc(k)}"`;
function chips(p, id, single){
  return `<div class="wd-chips" role="group" aria-label="${esc(list(id).title || id)}">${items(p, id).map(o => `<button type="button" class="chip" data-wda="chip" data-wdv="${esc(id + '|' + o.id)}"${single ? ' data-wds="1"' : ''} aria-pressed="${isOn(p, id, o.id)}"${fk('c|' + id + '|' + o.id)}>${esc(fill(o.t, p))}</button>`).join('')}</div>`;
}
function addOwn(id, ph){
  return `<div class="wd-add"><input type="text" data-wdown="${esc(id)}" aria-label="Add your own" placeholder="${esc(ph || 'Something else? Type it here')}" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-wda="own" data-wdv="${esc(id)}"${fk('own|' + id)}>Add Your Own</button></div>`;
}
function note(p, sid){
  const t = !!p.tidy[sid];
  return `<div class="wd-note"><label class="f" for="wd-n-${sid}">Quick Note</label><textarea id="wd-n-${sid}" rows="2" data-wdi="notes.${sid}" placeholder="A few words. Tidy them later.">${esc(p.notes[sid] || '')}</textarea>
    <button type="button" class="wd-tidy" data-wda="tidy" data-wdv="${sid}" aria-pressed="${t}"${fk('td|' + sid)}>${t ? 'Tidy Up Later: Marked' : 'Tidy Up Later'}</button></div>`;
}
function custom(p, sid){
  return `<details class="wd-custom"${p.custom[sid] ? ' open' : ''}><summary>Your Custom Details</summary><textarea rows="3" aria-label="Your custom details" data-wdi="custom.${sid}" placeholder="Anything else for this step, in your own words.">${esc(p.custom[sid] || '')}</textarea></details>`;
}
function star(p, key, lab){
  const on = !!p.stars[key];
  return `<button type="button" class="wd-star" data-wda="star" data-wdv="${esc(key)}" data-wdl="${esc(lab)}" aria-pressed="${on}"${fk('st|' + key)}><span aria-hidden="true">${on ? '&#9733;' : '&#9734;'}</span> Come Back To This</button>`;
}
function who(p, key, lab){
  const cur = key.startsWith('task.') ? (p.tasks[+key.slice(5)] || {}).who : p.tags[key];
  const open = S.other === key;
  return `<div class="wd-who" role="group" aria-label="${esc(lab || 'Who handles this?')}"><span class="wd-lbl">Who handles this?</span>${whoList(p).map(w => `<button type="button" class="chip wd-sm" data-wda="tag" data-wdv="${esc(key + '|' + w)}" aria-pressed="${cur === w}"${fk('tg|' + key + '|' + w)}>${esc(w)}</button>`).join('')}<button type="button" class="chip wd-sm" data-wda="tagother" data-wdv="${esc(key)}" aria-pressed="${open}"${fk('to|' + key)}>Other</button>
    ${open ? `<span class="wd-other"><input type="text" data-wdtag="${esc(key)}" aria-label="Another name" placeholder="A name" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-wda="tagset" data-wdv="${esc(key)}">Set</button></span>` : ''}</div>`;
}
function blk(p, title, key, inner, sub){
  return `<section class="wd-blk" data-wdanc="${esc(key)}"><div class="wd-blk-h"><h3>${esc(title)}</h3>${key ? star(p, key, title) : ''}</div>${sub ? `<p class="wd-sub">${esc(sub)}</p>` : ''}${inner}</section>`;
}
function fld(path, lab, val, type, ph){
  const id = 'wd-' + path.replace(/[^a-z0-9]+/gi, '-');
  return `<div class="wd-fld"><label class="f" for="${id}">${esc(lab)}</label><input id="${id}" type="${type || 'text'}" data-wdi="${esc(path)}" value="${esc(val == null ? '' : val)}"${ph ? ` placeholder="${esc(ph)}"` : ''} autocomplete="off"></div>`;
}
const sayBox = (p, t) => t ? `<div class="wd-say"><b>Say</b><q>${esc(fill(t, p, {Minutes: svcTotal(p) || 'about thirty'}))}</q></div>` : '';
const smsHref = (ph, body) => 'sms:' + String(ph || '').replace(/[^\d+]/g, '') + '?&body=' + encodeURIComponent(body);
const mailHref = (em, sub, body) => 'mailto:' + String(em || '').split(/[,;\s]+/).filter(Boolean).map(e => encodeURIComponent(e).replace(/%40/g, '@')).join(',') + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(body);
const cEm = p => [pc(p, 'p1').em, pc(p, 'p2').em].filter(x => clean(x)).join(',');
const cPh = p => clean(pc(p, 'p1').ph) || clean(pc(p, 'p2').ph) || '';
async function copyText(t, msg){
  try { await navigator.clipboard.writeText(t); }
  catch (e){ const a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;left:-9999px;'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (x) {} a.remove(); }
  API.lastCopy = t; toast(msg || 'Copied.');
}
function saveFile(name, text, type){ try { const b = new Blob([text], {type: type || 'text/plain'}); if (window.GGApp && GGApp.download) GGApp.download(b, name); else { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800); } API.lastFile = {name, text}; } catch (e) { toast('The file could not be saved.'); } }
function openLink(u){ API.lastLink = u; if (API.noOpen) return; try { window.location.href = u; } catch (e) {} }

// ---------- loading what the couple sends back (their vows, by text, email, file, or a QR a phone reads) ----------
function loadVows(p, k, text){
  const t = String(text || '').replace(/\r\n?/g, '\n').trim(); if (!t){ toast('Paste what they sent first.'); return false; }
  const V = vS(p, k); p.writings = arr(p.writings); p.writings.push({id: uid(), kind: 'vows', who: k, name: vName(p, k), body: t, at: Date.now()});
  // Answers to the prompts ("When I First Knew: ...") fill the helper; anything else becomes the draft.
  const Q = arr(cfg().vowsHelper.prompts); let n = 0;
  t.split('\n').forEach(l => { const m = /^\s*(?:\d+[.)]\s*)?([^:]{3,60}):\s*(.+)$/.exec(l); if (!m) return; const lo = m[1].toLowerCase().trim(); const q = Q.find(x => String(x.t).toLowerCase() === lo || String(x.q || '').toLowerCase().replace(/[?.]$/, '') === lo.replace(/[?.]$/, '')); if (q && !clean(V.a[q.id])){ V.a[q.id] = m[2].trim(); n++; } });
  if (n >= 2){ if (!clean(V.d) || !V.edited){ V.d = vowsProse(p, k); V.edited = false; } toast(n + ' answers are in, and the draft is built. Read it together.'); }
  else { if (clean(V.d) && V.edited && !confirm('Replace the vows draft for ' + vName(p, k) + ' with what they sent?')){ touch(p); return true; } V.d = t; V.edited = true; toast(vName(p, k) + "'s vows are in."); }
  touch(p); return true;
}
function vShareText(p, k){
  const H = cfg().vowsHelper, Q = arr(H.prompts);
  return fill(H.shareWords, p, {Partner: vName(p, k)}) + '\n\n' + Q.map((q, i) => (i + 1) + '. ' + fill(q.t, p) + ': ' + fill(q.q || '', p)).join('\n') + '\n\n' + fill(H.sendBack, p, {Partner: vName(p, k)});
}
function vShareCard(p, k){
  const t = vShareText(p, k), o = pc(p, k);
  let qr = ''; try { qr = window.GGQR && GGQR.svg ? GGQR.svg(t, {label: 'QR code with the vows questions for ' + vName(p, k)}) : ''; } catch (e) { qr = ''; }
  return `<div class="wd-share"><div class="wd-qr">${qr}</div><div class="wd-share-m"><h4>Vows Questions for ${esc(vName(p, k))}</h4><div class="wd-lbl">Ready-to-send words</div><div class="wd-words">${esc(t)}</div>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-wda="v-share-copy" data-wdv="${k}">Copy</button><a class="btn btn-line btn-sm" href="${esc(smsHref(o.ph, t))}">Text It</a><a class="btn btn-line btn-sm" href="${esc(mailHref(o.em, 'Questions for your vows', t))}">Email It</a></div>
    <p class="wd-sub">They scan the code with a phone camera to see the questions, or open the text or email. What they write stays with them until they send it back to you.</p></div></div>`;
}
function vLoadBox(p, k){
  return `<details class="wd-load"><summary>Paste or Load ${esc(vName(p, k))}'s Vows</summary><p class="wd-sub">Paste the reply ${esc(vName(p, k))} sent: their answers or their finished vows. A file works too.</p>
    <textarea rows="3" id="wd-vpaste-${k}" aria-label="Paste what ${esc(vName(p, k))} sent" placeholder="Paste the whole message here"></textarea>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-wda="v-load" data-wdv="${k}">Add It</button><label class="btn btn-line btn-sm" style="cursor:pointer">Load a File<input type="file" accept=".txt,.md,text/plain" data-wdvfile="${k}" hidden></label>${'BarcodeDetector' in window ? `<button type="button" class="btn btn-line btn-sm" data-wda="scan" data-wdv="${k}">Scan a QR Code</button>` : ''}</div></details>`;
}
async function scanQR(k){
  const p = plan(); if (!p || !('BarcodeDetector' in window)) return;
  let st; try { st = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}); } catch (e){ toast('The camera is not available. Paste the text instead.'); return; }
  const box = document.createElement('div'); box.className = 'wd-scan'; box.innerHTML = '<div class="wd-scan-in"><video playsinline muted></video><p>Hold the QR code in the frame.</p><button type="button" class="btn btn-line btn-sm">Done</button></div>';
  document.body.appendChild(box); const v = box.querySelector('video'); v.srcObject = st; await v.play().catch(() => {});
  const det = new BarcodeDetector({formats: ['qr_code']});
  const stop = () => { clearInterval(S.scan); S.scan = null; st.getTracks().forEach(t => t.stop()); box.remove(); rerender(true); };
  box.querySelector('button').onclick = stop;
  S.scan = setInterval(async () => { try { const r = await det.detect(v); if (r[0] && r[0].rawValue){ loadVows(p, k, r[0].rawValue); stop(); } } catch (e) {} }, 350);
}

// ---------- Chris's View, one function per step ----------
const V = {};
function coupleFlds(p, k, lab){ const o = pc(p, k), b = 'c.' + k + '.';
  return `<div class="wd-gath" data-wdanc="c-${k}"><h4>${esc(lab)}</h4><div class="wd-g2">${fld(b + 'called', 'Name they go by', o.called)}${fld(b + 'full', 'Full name', o.full)}${fld(b + 'say', 'How to say it', o.say, 'text', 'MAH-ree-ah')}${fld(b + 'ph', 'Phone', o.ph, 'tel')}${fld(b + 'em', 'Email', o.em, 'email')}</div></div>`; }
function sinceCard(p, big){
  const M = cfg().meetings, s = sinceLast(p), cm = curMeet(p);
  const li = x => `<li><span>${x.done ? '&#10003; ' : ''}${esc(x.t)}</span><span></span></li>`;
  return blk(p, M.sinceTitle || 'Since Last Time', 'since', (s.prev ? `<p class="wd-sub" style="margin-top:0">Last time: ${esc(nice(s.prev.date))}${arr(s.prev.steps).length ? ', we worked on ' + esc(s.prev.steps.map(n => (STEP(n) || {}).title).filter(Boolean).join(', ')) : ''}.${s.prev.note ? ' ' + esc(s.prev.note) : ''}</p>` : '<p class="wd-sub" style="margin-top:0">This is your first meeting together. Everything open shows here, and next time you will see what got done in between.</p>') +
    (s.prev ? `<div class="wd-lbl">${esc(M.doneTitle || 'Done Since Last Time')} (${s.done.length})</div>${s.done.length ? `<ul class="wd-flist">${s.done.map(li).join('')}</ul>` : '<p class="wd-sub">Nothing new yet.</p>'}` : '') +
    `<div class="wd-lbl" style="margin-top:10px">${esc(M.openTitle || 'Still Open')} (${s.open.length})</div>${s.open.length ? `<ul class="wd-flist">${s.open.slice(0, big ? 60 : 8).map(li).join('')}</ul>${!big && s.open.length > 8 ? `<p class="wd-sub">And ${s.open.length - 8} more. <button type="button" class="linkbtn" data-wda="step" data-wdv="12">See them all</button></p>` : ''}` : '<p class="wd-sub">Everything is done.</p>'}` +
    (s.prev && arr((p.nextMt || {}).agenda).length && p.nextMt.date && p.nextMt.date <= today() ? `<div class="wd-lbl" style="margin-top:10px">Planned for Today</div><p class="wd-big">${esc(picked(p, 'agenda').join(', '))}</p>` : '') +
    `<div class="row" style="margin-top:10px">${cm ? `<span class="wd-ok">Today's meeting started ${esc(nice(cm.date))}.</span>` : `<button type="button" class="btn btn-gold btn-sm" data-wda="meet-start"${fk('ms')}>Start Today's Meeting</button>`}</div>`); }
function gmCard(p){
  const L = window.GGPm && GGPm.data ? arr(((D() || {}).pm || {}).couples) : [], x = p.pm ? L.find(c => c.id === p.pm) : null;
  return `<div class="wd-helper"><div class="spread"><div style="min-width:0;flex:1 1 240px"><b>The Grounded Marriage</b><p class="wd-sub" style="margin:2px 0 0">${x ? 'Linked: ' + esc([x.p1 && x.p1.name, x.p2 && x.p2.name].filter(Boolean).join(' and ')) + '.' : '12 hours of premarital sessions for the two of you, and the reduced license fee with the Educator\'s Statement.'}</p></div>
    ${x ? `<button type="button" class="btn btn-line btn-sm" data-wda="gm-open">Open The Grounded Marriage</button>` : `<button type="button" class="btn btn-line btn-sm" data-wda="gm-new">Start The Grounded Marriage</button>`}</div></div>`;
}
V[1] = p => sayBox(p, STEP(1).say) + (arr(p.mt).length ? sinceCard(p) : '') +
  blk(p, list('who').title || 'Who Is Here', 'who', chips(p, 'who') + addOwn('who', 'A parent, a friend, the planner...'), list('who').sub) +
  blk(p, 'The Couple', 'couple', coupleFlds(p, 'p1', 'Partner 1') + coupleFlds(p, 'p2', 'Partner 2'), 'For the ceremony, the copies, the vows questions, and the follow-ups.') +
  (arr(p.mt).length ? '' : `<div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-gold btn-sm" data-wda="meet-start"${fk('ms')}>Start Today's Meeting</button></div>`) +
  gmCard(p) + waBlk(p) + custom(p, 'welcome') + note(p, 'welcome');

V[2] = p => { const S2 = list('story');
  return sayBox(p, STEP(2).say) +
  blk(p, S2.title || 'Their Story', 'story', `<div class="wd-prompts">${items(p, 'story').map(it => `<div class="wd-pcard"><button type="button" class="chip" data-wda="chip" data-wdv="${esc('story|' + it.id)}" aria-pressed="${isOn(p, 'story', it.id)}"${fk('c|story|' + it.id)}>${esc(fill(it.t, p))}</button>${it.q ? `<small>${esc(fill(it.q, p))}</small>` : ''}<textarea rows="2" data-wdi="story.${esc(it.id)}" aria-label="Note for ${esc(fill(it.t, p))}" placeholder="A few words">${esc(p.story[it.id] || '')}</textarea></div>`).join('')}</div>` + addOwn('story', 'Another prompt: their first trip, their dog...'), STEP(2).sub) +
  blk(p, "The Couple's Story, as I Will Tell It", 'address', `<p class="wd-sub" style="margin-top:0">Your words about them for the ceremony. It prints under The Couple's Story in the Officiant Script. Writing help can draft it from the notes.</p><textarea rows="8" class="wd-bigta" data-wdi="address" aria-label="The couple's story, as you will tell it" placeholder="Write it here, or paste it back from Writing Help.">${esc(p.address || '')}</textarea><p class="wd-sub" id="wd-addr-time">${esc(clean(p.address) ? readTime(p.address) : '')}</p>
    <div class="row"><button type="button" class="btn btn-line btn-sm" data-wda="go-wh">Open Writing Help</button></div>`) +
  custom(p, 'story') + note(p, 'story'); };

V[3] = p => sayBox(p, STEP(3).say) +
  blk(p, list('faithway').title || 'Faith or Plain', 'faithway', chips(p, 'faithway', true), STEP(3).sub) +
  blk(p, list('tradition').title || 'Their Traditions', 'tradition', chips(p, 'tradition') + addOwn('tradition', 'Another tradition'), list('tradition').sub) +
  blk(p, 'Other Clergy Taking Part', 'clergy', `<div class="wd-lines">${arr(p.clergy).map((c, i) => `<div class="wd-line"><input type="text" data-wdi="clergy.${i}.name" value="${esc(c.name)}" aria-label="Name" placeholder="Name" autocomplete="off"><input type="text" data-wdi="clergy.${i}.role" value="${esc(c.role)}" aria-label="Part they take" placeholder="Part they take" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-wda="cl-del" data-wdv="${i}">Remove</button></div>`).join('')}</div>` + addOwn('clergy', 'A co-officiant or their pastor')) +
  blk(p, list('customs').title || 'Customs to Honor', 'customs', chips(p, 'customs') + addOwn('customs', 'A custom from their family or culture'), list('customs').sub) +
  custom(p, 'faith') + note(p, 'faith');

V[4] = p => { const d = p.day;
  return sayBox(p, STEP(4).say) +
  blk(p, list('wtype').title || 'Kind of Ceremony', 'wtype', chips(p, 'wtype', true)) +
  blk(p, 'When and Where', 'when', `<div class="wd-g3">${fld('day.date', 'Date', d.date, 'date')}${fld('day.time', 'Ceremony time', d.time, 'time')}${fld('day.arrive', 'Couple arrives', d.arrive, 'time')}</div><div class="wd-g2">${fld('day.place', 'Venue', d.place, 'text', 'Riverside Pavilion')}${fld('day.city', 'City', d.city, 'text', 'St. Cloud')}${fld('day.recep', 'Reception', d.recep, 'text', 'Same place, the hall')}${fld('day.length', 'Ceremony minutes', d.length, 'number', '30')}</div>`) +
  blk(p, list('size').title || 'How Many Guests', 'size', chips(p, 'size', true)) +
  blk(p, list('venue').title || 'Kind of Place', 'venue', chips(p, 'venue', true) + addOwn('venue', 'Another kind of place')) +
  blk(p, list('timeofday').title || 'Time of Day', 'timeofday', chips(p, 'timeofday', true)) +
  attireBlk(p) +
  blk(p, list('weather').title || 'Weather Plan', 'weather', chips(p, 'weather') + addOwn('weather', 'Another plan') + fld('day.rain', 'If it rains, we go to', d.rain, 'text', 'The barn, the church basement') + who(p, 'weather', 'Who makes the weather call')) +
  custom(p, 'day') + note(p, 'day'); };
function attireBlk(p){ const A = cfg().attire;
  return blk(p, A.title || 'What to Wear', 'attire', (A.say ? `<div class="wd-say" style="margin-top:0"><b>Say</b><q>${esc(fill(A.say, p))}</q></div>` : '') +
    `<div class="wd-lbl">${esc(list('attire').title)}</div>` + chips(p, 'attire', true) + addOwn('attire', 'Another idea: boots welcome, their colors...') +
    `<div class="wd-lbl" style="margin-top:12px">${esc(list('partyWears').title)}</div>` + chips(p, 'partyWears', true) +
    `<div class="wd-lbl" style="margin-top:12px">${esc(list('chrisWears').title)}</div>` + chips(p, 'chrisWears', true) +
    fld('attireNote', 'A note on what to wear', p.attireNote, 'text', 'Comfortable shoes for the grass'), A.sub); }
function attireLines(p){ const A = cfg().attire, g = picked(p, 'attire')[0], w = picked(p, 'partyWears')[0], c = picked(p, 'chrisWears')[0], out = [];
  if (g) out.push(fill(A.guestLine || 'Guests: [Dress].', p).replace('[Dress]', g));
  if (w) out.push(fill(A.partyLine || 'Wedding party: [Party].', p).replace('[Party]', w));
  if (c) out.push(fill(A.chrisLine || '[Chris] will wear [Wear].', p).replace('[Wear]', String(c).charAt(0).toLowerCase() + String(c).slice(1)));
  if (clean(p.attireNote)) out.push(sent(p.attireNote)); return out; }

V[5] = p => { const Lc = cfg().license, L = licItems(), WH = {couple: 'The Couple', officiant: 'The Officiant'};
  return sayBox(p, Lc.say || STEP(5).say) +
  blk(p, 'Minnesota Marriage License', 'lic', `<p class="wd-sub" style="margin-top:0">${esc(fill(Lc.intro, p))}</p>${Lc.countyLine ? `<p class="wd-sub">${esc(fill(Lc.countyLine, p))}</p>` : ''}
    <div class="wd-g3">${fld('licD.county', 'County', p.licD.county, 'text', 'Stearns')}${fld('licD.appt', 'Appointment', p.licD.appt, 'date')}${fld('licD.got', 'License issued', p.licD.got, 'date')}</div>
    <ul class="wd-lic">${L.map(x => `<li><label class="wd-ck"><input type="checkbox" data-wdc="lic.${esc(x.id)}"${(p.lic || {})[x.id] ? ' checked' : ''}${fk('lic|' + x.id)}><span>${x.who ? `<span class="wd-tag">${esc(WH[x.who] || x.who)}</span> ` : ''}${esc(fill(x.text, p))}</span></label>${x.confirmed === false ? '<span class="wd-tag wd-warn2">Check with the County</span>' : ''}${x.note ? `<p class="wd-sub" style="margin:2px 0 0 40px">${esc(x.note)}</p>` : ''}${x.source ? `<p class="wd-src" style="margin:2px 0 0 40px">Source: ${esc(x.source)}</p>` : ''}${x.link ? `<p style="margin:2px 0 6px 40px"><a href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">${esc(x.linkLabel || 'Learn more')}</a></p>` : ''}</li>`).join('')}</ul>
    <p class="wd-sub">${licOpen(p).length ? licOpen(p).length + ' of ' + L.length + ' still open.' : 'Every step is done.'}</p>`) +
  blk(p, 'The Witnesses', 'witnesses', `<p class="wd-sub" style="margin-top:0">${esc(byRole(p, wRole()).map(id => pName(p, id)).join(', ') || 'Add two witnesses in The People.')}</p><div class="row"><button type="button" class="btn btn-line btn-sm" data-wda="step" data-wdv="7">Go to The People</button></div>`) +
  gmCard(p) +
  `<div class="row" style="margin:0 0 14px"><button type="button" class="btn btn-line btn-sm" data-wda="out" data-wdv="license">Print the License Checklist</button></div>` +
  custom(p, 'license') + note(p, 'license'); };
const wRole = () => cfg().roles.some(r => r.id === 'witnesses') ? 'witnesses' : 'witness';

// ---------- The Ceremony: the Service Builder's order, and Readings, Music, and Rituals ----------
function svcBlock(p){
  const c = cerBind();
  if (!c) return '<p class="muted">The Service Builder did not load. Reload the Field Guide to plan the ceremony.</p>';
  if (!hasSvc(p)) return `<p class="wd-sub" style="margin-top:0">Start the order from the Service Builder's parts and readings, shaped by the couple's choices so far.</p>
    <div class="wd-chips">${c.types().map(t => `<button type="button" class="chip" data-wda="svc-new" data-wdv="${esc(t.id)}"${fk('sn|' + t.id)} aria-pressed="${svcType(p) === t.id}">${esc(t.name)}</button>`).join('')}</div>
    <p class="wd-sub">Tap the kind of ceremony to begin.</p>`;
  const rows = c.rows(p.svc), on = rows.filter(r => r.on), off = rows.filter(r => !r.on), L = leaders(p);
  return `<datalist id="wd-leaders">${L.map(l => `<option value="${esc(l)}">`).join('')}</datalist>
    <div class="wd-svc">${on.map((r, i) => `<div class="wd-srow"><div class="wd-snm"><b>${esc(r.name)}${r.piece && r.piece.title !== r.name ? ': ' + esc(pcHead(r.piece)) : ''}</b>${r.rd.length ? `<small>${esc(r.rd.join('; '))}</small>` : r.readings ? '<small>No reading chosen yet</small>' : ''}</div>
      <label class="wd-mini"><span>Minutes</span><input type="number" min="0" max="120" data-wdsvc="${esc(r.k)}|mins" value="${esc(r.mins)}" aria-label="Minutes for ${esc(r.name)}"></label>
      <label class="wd-mini wd-lead"><span>Who leads</span><input type="text" list="wd-leaders" data-wdsvc="${esc(r.k)}|by" value="${esc(r.by)}" placeholder="${esc(me())}" aria-label="Who leads ${esc(r.name)}" autocomplete="off"></label>
      ${r.options.length ? `<label class="wd-mini wd-ch"><span>Choice</span><select data-wdsvc="${esc(r.k)}|option" aria-label="Choice for ${esc(r.name)}">${r.options.map(o => `<option value="${esc(o[0])}"${o[0] === r.option ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>` : '<span class="wd-ch"></span>'}
      <span class="wd-mv"><button type="button" class="btn btn-line btn-sm" data-wda="svc-up" data-wdv="${esc(r.k)}" aria-label="Move ${esc(r.name)} up"${i ? '' : ' disabled'}${fk('su|' + r.k)}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-wda="svc-down" data-wdv="${esc(r.k)}" aria-label="Move ${esc(r.name)} down"${i < on.length - 1 ? '' : ' disabled'}${fk('sd|' + r.k)}>&darr;</button><button type="button" class="btn btn-line btn-sm" data-wda="svc-off" data-wdv="${esc(r.k)}" aria-label="Take out ${esc(r.name)}"${fk('so|' + r.k)}>Take Out</button></span></div>`).join('')}</div>
    <div class="wd-total"><span>Running total</span><b id="wd-tot">${c.total(p.svc)} minutes</b></div>
    ${off.length ? `<details class="wd-custom"><summary>More Parts to Add (${off.length})</summary><div class="wd-chips" style="margin-top:8px">${off.map(r => `<button type="button" class="chip" data-wda="svc-on" data-wdv="${esc(r.k)}"${fk('sa|' + r.k)}>${esc(r.name)}</button>`).join('')}</div></details>` : ''}
    ${addOwn('svcpart', 'Add a part: a sign of peace, a toast...')}
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-wda="svc-open">Readings and Words in the Service Builder</button><button type="button" class="btn btn-line btn-sm" data-wda="svc-sync">Match the Couple's Choices Again</button></div>
    <p class="wd-sub">The vows, the declaration, the ring exchange, the kiss, and the pronouncement are parts here: choose the wording for each. The words for every part, Faith or Plain, and the printouts live in the Service Builder. This is the same ceremony.</p>`;
}
const LBT = [['music', 'Music'], ['ritual', 'Unity and Rituals'], ['scripture', 'Scripture'], ['poem', 'Poems'], ['reading', 'Readings'], ['prayer', 'Prayers'], ['blessing', 'Blessings']];
const MOMS0 = [['prelude', 'Prelude'], ['processional', 'Processional'], ['entrance', 'Bride or Couple Entrance'], ['during', 'During'], ['unity', 'Unity'], ['recessional', 'Recessional'], ['postlude', 'Postlude']];
const MOMS = () => { const c = CER(); const m = c && c.moments ? c.moments() : []; return m.length ? m : MOMS0; };
const momName = m => (MOMS().find(z => z[0] === m) || [m, m])[1];
const FAITHS = ['christian', 'jewish', 'muslim', 'hindu', 'buddhist', 'bahai', 'mixed'], PLAINS = ['plain', 'any', 'spiritual', 'nature', 'uu'];
const lbKind = t => t === 'music' || t === 'ritual' ? t : 'reading';
function faithKind(k, x){
  if (k !== 'reading') return x.faith === 'faith' || x.faith === 'plain' ? x.faith : 'either';
  const f = arr((x.tags || {}).faith), fa = x.kind === 'scripture' || f.some(v => FAITHS.includes(v)), pl = x.kind !== 'scripture' && f.some(v => PLAINS.includes(v));
  return fa && pl ? 'either' : fa ? 'faith' : pl ? 'plain' : 'either';
}
const forOf = x => x.for || (x.tags || {}).for || '';
// A wedding piece: marked for weddings or both, one of My Pieces, or a reading tagged for a wedding type.
const isW = (k, x) => { const f = forOf(x); if (x.mine) return true; if (f === 'wedding' || f === 'both') return true; if (k === 'reading') return arr((x.tags || {}).types).some(t => ['wedding', 'elopement', 'renewal'].includes(t)) && f !== 'funeral'; return false; };
function momentsOf(k, x){
  const m = arr(x.moments).filter(v => MOMS().some(z => z[0] === v)); if (m.length) return m;
  if (k === 'ritual') return ['unity']; if (k === 'music') return ['during'];
  return x.kind === 'blessing' ? ['recessional'] : ['during'];
}
function tagsOf(k, x){ if (k !== 'reading') return arr(x.tags).map(String); const t = x.tags || {}; return arr(t.words).concat(arr(t.types).map(v => String(v).replace(/-/g, ' '))); }
const rTitle = x => x.kind === 'scripture' ? (x.ref || x.title) : x.title;
function rBody(x, ver){ if (x.versions){ const v = x.versions[ver] ? ver : x.versions.kjv ? 'kjv' : Object.keys(x.versions)[0]; return {text: x.versions[v] || '', ver: v}; } return {text: x.text || '', ver: ''}; }
function lbAll(p){
  const c = cerBind(); if (!c) return [];
  const cat = c.catalog(hasSvc(p) ? p.svc : null), t = S.lb.type, k = lbKind(t);
  return (k === 'music' ? cat.music : k === 'ritual' ? cat.rituals : cat.readings.filter(r => (r.kind || 'reading') === t)).filter(x => isW(k, x)).map(x => ({k, x}));
}
function lbList(p){
  const q = S.lb.q.trim().toLowerCase(), L = S.lb, pref = plainOf(p) ? (faithOf(p) ? 'plain' : '') : 'faith';
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
const rfill = (t, p) => fill(String(t || '').replace(/\[Name\]/g, '[Couple]'), p);
function lbPrev(p, k, x){
  const bible = (CER() && hasSvc(p) && CER().get(p.svc) || {}).bible || 'kjv';
  if (k === 'reading'){ const b = rBody(x, bible);
    return `<div class="wd-prev">${x.bring ? `<p class="wd-note2"><b>Bring your own copy.</b> It prints with this credit line.</p>` : `<div class="wd-words wd-read">${esc(b.text)}</div>`}${x.source ? `<p class="wd-src">${esc(x.source)}</p>` : ''}${x.note && !x.bring ? `<p class="wd-sub">${esc(x.note)}</p>` : ''}</div>`; }
  return `<div class="wd-prev">${x.by ? `<p><b>${esc(x.by)}</b></p>` : ''}${x.about ? `<p>${esc(rfill(x.about, p))}</p>` : ''}${arr(x.how).length ? `<div class="wd-lbl">How it goes</div><ol>${x.how.map(h => `<li>${esc(rfill(h, p))}</li>`).join('')}</ol>` : ''}${arr(x.needs).length ? `<div class="wd-lbl">What to bring</div><ul>${x.needs.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
    <p class="wd-sub">${[x.minutes ? 'About ' + x.minutes + ' minutes' : '', momentsOf(k, x).length ? 'Fits: ' + momentsOf(k, x).map(momName).join(', ') : '', faithKind(k, x) === 'faith' ? 'Faith' : faithKind(k, x) === 'plain' ? 'Plain' : 'Faith or plain'].filter(Boolean).join(' · ')}</p>${x.note ? `<p class="wd-sub">${esc(x.note)}</p>` : ''}${x.source ? `<p class="wd-src">${esc(x.source)}</p>` : ''}</div>`;
}
function lbRows(p){
  const L = lbList(p), n = 25 + S.lb.more, have = new Set(inSvc(p).map(x => lbKey(x.kind, x.id)));
  if (!L.length) return `<p class="muted">Nothing matches. Try another word or filter, or add your own below.</p>`;
  return L.slice(0, n).map(({k, x}) => { const key = lbKey(k, x.id), on = have.has(key), open = S.lb.open === key;
    const sub = k === 'reading' ? [x.kind === 'scripture' && x.title !== x.ref ? x.title : x.by, x.bring ? '' : snip(rBody(x, 'kjv').text, 90)].filter(Boolean).join(' · ') : [x.by, snip(x.about, 90)].filter(Boolean).join(' · ');
    return `<div class="wd-lbr${on ? ' on' : ''}" data-wdanc="lb-${esc(x.id)}"><div class="wd-lbm"><b>${esc(rTitle(x))}</b>${x.mine ? ' <span class="wd-tag">Mine</span>' : ''}${x.bring ? ' <span class="wd-tag">Text Not Included</span>' : ''}${on ? ' <span class="wd-tag on">In the Ceremony</span>' : ''}<br><small>${esc(sub)}</small></div>
      <div class="wd-lbb"><button type="button" class="btn btn-line btn-sm" data-wda="lb-prev" data-wdv="${esc(key)}" aria-expanded="${open}"${fk('lp|' + key)}>${open ? 'Close' : 'Preview'}</button>${on ? `<button type="button" class="btn btn-line btn-sm" data-wda="lb-rm" data-wdv="${esc(key)}"${fk('lr|' + key)}>Take Out</button>` : `<button type="button" class="btn btn-gold btn-sm" data-wda="lb-add" data-wdv="${esc(key)}"${fk('la|' + key)}>Add to the Ceremony</button>`}</div>
      ${open ? lbPrev(p, k, x) : ''}</div>`; }).join('') + (L.length > n ? `<button type="button" class="btn btn-line btn-sm" data-wda="lb-more" style="margin-top:8px">Show More (${L.length - n})</button>` : '');
}
function lbTags(p){ const c = {}; lbAll(p).forEach(({k, x}) => tagsOf(k, x).forEach(t => { if (t) c[t] = (c[t] || 0) + 1; })); return Object.keys(c).sort((a, b) => c[b] - c[a] || a.localeCompare(b)).slice(0, 30); }
function lbOwnForm(p){
  const t = S.lb.type, k = lbKind(t), R = k === 'reading';
  return `<details class="wd-custom" id="wd-lb-own"${S.lb.own ? ' open' : ''}><summary>Add Your Own ${esc(k === 'ritual' ? 'Ritual' : (LBT.find(x => x[0] === t) || [t, t])[1].replace(/s$/, ''))}</summary>
    <div class="wd-g2"><div class="wd-fld"><label class="f" for="wd-lo-title">Title</label><input id="wd-lo-title" type="text" autocomplete="off" placeholder="${k === 'music' ? 'Their song' : k === 'ritual' ? 'Pouring two waters together' : 'A title'}"></div>${t === 'scripture' ? `<div class="wd-fld"><label class="f" for="wd-lo-ref">Reference</label><input id="wd-lo-ref" type="text" autocomplete="off" placeholder="Ruth 1:16 to 17"></div>` : `<div class="wd-fld"><label class="f" for="wd-lo-by">${k === 'music' ? 'Artist or Composer' : 'By'}</label><input id="wd-lo-by" type="text" autocomplete="off" placeholder="${k === 'ritual' ? 'A family custom' : 'Their name, or Traditional'}"></div>`}</div>
    <label class="f" for="wd-lo-text">${R ? 'The Words' : 'About'}</label><textarea id="wd-lo-text" rows="${R ? 6 : 2}" placeholder="${R ? 'Type or paste the words. Leave empty if it is under copyright; it then prints as bring your own copy.' : k === 'music' ? 'When it plays and who sings or plays it. Titles only, never the lyrics.' : 'One or two plain sentences.'}"></textarea>
    ${k === 'ritual' ? `<label class="f" for="wd-lo-how">Steps, One Per Line</label><textarea id="wd-lo-how" rows="4"></textarea><label class="f" for="wd-lo-needs">What to Bring, One Per Line</label><textarea id="wd-lo-needs" rows="2"></textarea>` : ''}
    <label class="f" for="wd-lo-src">Source Line</label><input id="wd-lo-src" type="text" autocomplete="off" placeholder="Author, book, year, or Source unknown">
    <label class="wd-ck" style="margin-top:8px"><input type="checkbox" id="wd-lo-keep"> Keep It in My Pieces for Other Services</label>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-wda="lb-own">Add It to the Ceremony</button></div></details>`;
}
function piecesPanel(p){
  const L = S.lb, lead = leaders(p), chosen = inSvc(p), onKeys = hasSvc(p) ? CER().rows(p.svc).filter(r => r.on).map(r => r.k) : [];
  const chip = (a, v, lab, on) => `<button type="button" class="chip wd-sm" data-wda="${a}" data-wdv="${esc(v)}" aria-pressed="${on}"${fk(a + '|' + v)}>${esc(lab)}</button>`;
  return `${chosen.length ? `<div class="wd-chosen" data-wdanc="pieces-in"><div class="wd-lbl">In the Ceremony</div><ul class="wd-flist">${chosen.map((x, i) => `<li><span><b>${esc(x.title)}</b>${x.by ? ', ' + esc(x.by) : ''}<br><small class="muted">${esc(x.part)}, number ${onKeys.indexOf(x.k) + 1} in the order${x.lead ? ', led by ' + esc(x.lead) : ''}</small></span><span class="wd-mv"><button type="button" class="btn btn-line btn-sm" data-wda="svc-up" data-wdv="${esc(x.k)}" aria-label="Move ${esc(x.title)} earlier"${onKeys.indexOf(x.k) > 0 ? '' : ' disabled'}${fk('cu|' + x.k + i)}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-wda="svc-down" data-wdv="${esc(x.k)}" aria-label="Move ${esc(x.title)} later"${onKeys.indexOf(x.k) < onKeys.length - 1 ? '' : ' disabled'}${fk('cd|' + x.k + i)}>&darr;</button><button type="button" class="linkbtn" data-wda="lb-rm" data-wdv="${esc(lbKey(x.kind, x.id))}">Take Out</button></span></li>`).join('')}</ul><p class="wd-sub" style="margin-bottom:0">Each piece shows by name in the order. Move it up or down into place.</p></div>` : ''}
    <div class="wd-chips wd-lbt" role="group" aria-label="Type">${LBT.map(([v, l]) => `<button type="button" class="chip" data-wda="lb-type" data-wdv="${v}" aria-pressed="${L.type === v}"${fk('lt|' + v)}>${esc(l)}</button>`).join('')}</div>
    <div class="wd-lbf"><div class="wd-fld"><label class="f" for="wd-lbq">Search</label><input id="wd-lbq" type="search" data-wdlq="1" value="${esc(L.q)}" placeholder="A word, a title, a name, or a verse" autocomplete="off"></div>
      <div class="wd-fld"><label class="f" for="wd-lbtag">Tag</label><select id="wd-lbtag" data-wdlt="1"><option value="">Any tag</option>${lbTags(p).map(t => `<option value="${esc(t)}"${t === L.tag ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></div></div>
    <div class="wd-who"><span class="wd-lbl">Faith or plain</span>${[['all', 'All'], ['faith', 'Faith'], ['plain', 'Plain']].map(([v, l]) => chip('lb-faith', v, l, L.faith === v)).join('')}${chip('lb-mine', '1', 'My Pieces Only', L.mine)}</div>
    <div class="wd-who"><span class="wd-lbl">Moment</span>${[['all', 'Any']].concat(MOMS()).map(([v, l]) => chip('lb-mom', v, l, L.moment === v)).join('')}</div>
    <div class="wd-place"><div class="wd-who" style="margin-top:0"><span class="wd-lbl">Add it at</span>${[['best', 'Best Fit']].concat(MOMS()).map(([v, l]) => chip('lb-place', v, l, L.place === v)).join('')}</div>
      <div class="wd-fld" style="max-width:340px"><label class="f" for="wd-lbby">Who leads</label><input id="wd-lbby" type="text" list="wd-lbleaders" data-wdlby="1" value="${esc(L.by)}" placeholder="${esc(me())}" autocomplete="off"><datalist id="wd-lbleaders">${lead.map(l => `<option value="${esc(l)}">`).join('')}</datalist></div></div>
    <div class="wd-lbl-list" id="wd-lb-list">${lbRows(p)}</div>
    ${lbOwnForm(p)}
    <div class="row" style="margin-top:6px"><button type="button" class="btn btn-line btn-sm" data-wda="lb-mypieces">Open My Pieces</button></div>`;
}
// Music by moment: what plays when, from the pieces in the ceremony.
function musicByMoment(p){ const M = inSvc(p).filter(x => x.kind === 'music'); return M.map(x => ({x, when: x.part})); }
V[6] = p => { const mm = musicByMoment(p);
  return sayBox(p, STEP(6).say) +
  blk(p, 'Order of the Ceremony', 'order', svcBlock(p), STEP(6).sub) +
  blk(p, 'Readings, Music, and Rituals', 'pieces', piecesPanel(p), 'Browse together, preview, and add any piece in one tap. Music goes to its moment: the prelude, the processional, the entrance, during, the unity ritual, the recessional, or the postlude.') +
  blk(p, 'Music by Moment', 'music', mm.length ? `<ul class="wd-flist">${mm.map(m => `<li><span><b>${esc(m.x.title)}</b>${m.x.by ? ', ' + esc(m.x.by) : ''}</span><span>${esc(m.when)}</span></li>`).join('')}</ul>` + `<div class="wd-lbl" style="margin-top:10px">Who Plays or Brings Each One</div>${mm.map(m => `<div class="wd-task"><b>${esc(m.x.title)}</b><div class="wd-who" style="margin-top:4px">${['Musician', 'DJ', 'Couple', 'Venue', 'Live'].concat(byRole(p, 'musicians').map(id => pName(p, id))).filter((x, i, a) => x && a.indexOf(x) === i).map(w2 => `<button type="button" class="chip wd-sm" data-wda="mus-who" data-wdv="${esc(m.x.id + '|' + w2)}" aria-pressed="${musWho(p, m.x.id) === w2}"${fk('mw|' + m.x.id + '|' + w2)}>${esc(w2)}</button>`).join('')}</div></div>`).join('')}` : '<p class="wd-sub" style="margin-top:0">Add songs above, and they show here by moment.</p>') +
  custom(p, 'ceremony') + note(p, 'ceremony'); };
const musWho = (p, id) => ((p.mus || {})[id] || {}).who || '';

// ---------- The People: the wedding party and the processional and recessional builder ----------
const peopleRoles = () => cfg().roles.filter(r => !['p1', 'p2', 'officiant'].includes(r.id));
function procList(p, key, title){
  const L = arr(p.proc[key]).filter(r => person(p, r.id)), all = ['_p1', '_p2', '_off'].concat(arr(p.people).map(x => x.id)), inL = new Set(L.map(r => r.id).concat(L.map(r => r.with).filter(Boolean)));
  return `<div class="wd-proc" data-wdanc="${key}"><div class="wd-lbl">${esc(title)}</div>${L.length ? `<ol class="wd-plist">${L.map((r, i) => `<li><span class="wd-pn"><b>${esc(pLabel(p, r.id))}</b></span>
      <label class="wd-mini"><span>Walks with</span><select data-wdproc="${key}|${i}" aria-label="Who walks with ${esc(pName(p, r.id))}"><option value="">Alone</option>${all.filter(id => id !== r.id && (!inL.has(id) || id === r.with)).map(id => `<option value="${esc(id)}"${id === r.with ? ' selected' : ''}>${esc(pLabel(p, id))}</option>`).join('')}</select></label>
      <span class="wd-mv"><button type="button" class="btn btn-line btn-sm" data-wda="pr-up" data-wdv="${key}|${i}" aria-label="Earlier"${i ? '' : ' disabled'}>&uarr;</button><button type="button" class="btn btn-line btn-sm" data-wda="pr-down" data-wdv="${key}|${i}" aria-label="Later"${i < L.length - 1 ? '' : ' disabled'}>&darr;</button><button type="button" class="btn btn-line btn-sm" data-wda="pr-del" data-wdv="${key}|${i}">Take Out</button></span></li>`).join('')}</ol>` : '<p class="wd-sub">Build it from a pattern, or add people one by one.</p>'}
    ${all.filter(id => !inL.has(id)).length ? `<div class="wd-add"><select id="wd-padd-${key}" aria-label="Add someone to the ${esc(title)}">${all.filter(id => !inL.has(id)).map(id => `<option value="${esc(id)}">${esc(pLabel(p, id))}</option>`).join('')}</select><button type="button" class="btn btn-line btn-sm" data-wda="pr-add" data-wdv="${key}">Add</button></div>` : ''}</div>`;
}
V[7] = p => { const R = peopleRoles(), PP = cfg().processional;
  return sayBox(p, STEP(7).say) +
  blk(p, 'The Wedding Party and Helpers', 'people', `${arr(p.people).length ? `<div class="wd-lines">${p.people.map((x, i) => `<div class="wd-pline"><input type="text" data-wdi="people.${i}.name" value="${esc(x.name)}" aria-label="Name" placeholder="Name" autocomplete="off"><select data-wdpr="${i}" aria-label="Role for ${esc(x.name)}">${R.map(r => `<option value="${esc(r.id)}"${r.id === x.role ? ' selected' : ''}>${esc(fill(r.t, p))}</option>`).join('')}</select><input type="text" data-wdi="people.${i}.ph" value="${esc(x.ph || '')}" aria-label="Phone or email for ${esc(x.name)}" placeholder="Phone or email" autocomplete="off"><button type="button" class="btn btn-line btn-sm" data-wda="pp-del" data-wdv="${i}">Remove</button></div>`).join('')}</div>` : ''}
    <div class="wd-lbl" style="margin-top:12px">Add Someone: Tap Their Role</div><div class="wd-add"><input type="text" id="wd-pnew" aria-label="Their name" placeholder="Their name" autocomplete="off"></div>
    <div class="wd-chips" style="margin-top:8px">${R.map(r => `<button type="button" class="chip wd-sm" data-wda="pp-add" data-wdv="${esc(r.id)}"${fk('pa|' + r.id)}>${esc(fill(r.t, p))}</button>`).join('')}</div>`, STEP(7).sub) +
  blk(p, 'Processional and Recessional', 'proc', `<div class="wd-lbl">Start From a Pattern</div><div class="wd-chips">${PP.map(x => `<button type="button" class="chip" data-wda="pr-pat" data-wdv="${esc(x.id)}" aria-pressed="${p.proc.pattern === x.id}"${fk('pp|' + x.id)}>${esc(fill(x.t, p))}</button>`).join('')}</div>
    ${p.proc.pattern ? `<p class="wd-sub">${esc(fill((PP.find(x => x.id === p.proc.pattern) || {}).lead || '', p))}</p>` : '<p class="wd-sub">Tap a pattern to fill the order from the people above. Then change anything: move people, pair them, or add someone.</p>'}
    ${procList(p, 'order', 'Processional, First to Last')}${procList(p, 'rec', 'Recessional, First to Last')}`) +
  blk(p, 'Readers, Musicians, and the Coordinator', 'helpers', `<ul class="wd-flist">${['readers', 'musicians', 'coordinator', 'photographer', wRole()].map(r => `<li><span>${esc(roleName(p, r))}</span><span>${esc(byRole(p, r).map(id => pName(p, id)).join(', ') || 'Not yet')}</span></li>`).join('')}</ul>
    <div class="wd-g2" style="margin-top:8px">${fld('venue.coord', 'Venue coordinator', (p.venue || {}).coord)}${fld('venue.cph', 'Coordinator phone', (p.venue || {}).cph, 'tel')}${fld('venue.cem', 'Coordinator email', (p.venue || {}).cem, 'email')}${fld('venue.name', 'Venue (as the coordinator calls it)', (p.venue || {}).name || p.day.place)}</div>`) +
  custom(p, 'people') + note(p, 'people'); };

// ---------- Vows: the Vows Helper inside the session, for each partner ----------
V[8] = p => { const st = vStyle(p);
  return sayBox(p, STEP(8).say) +
  blk(p, list('vowstyle').title || 'How Will You Say Your Vows?', 'vowstyle', chips(p, 'vowstyle', true)) +
  (st === 'repeat' || st === 'mix' ? blk(p, 'Repeat After Me', 'repeat', VK.map(k => `<p class="wd-sub" style="margin:4px 0 2px"><b>${esc(vName(p, k))}</b></p><div class="wd-read">${esc(repeatWords(p, k))}</div>`).join(''), plainOf(p) ? 'Plain words, as the couple chose.' : 'Faith words, as the couple chose.') : '') +
  VK.map(k => { const v = vS(p, k), n = Object.values(v.a).filter(x => clean(x)).length;
    return blk(p, vName(p, k) + "'s Vows", 'vows-' + k, `<div class="wd-helper" style="margin-top:0"><div class="spread"><div style="min-width:0;flex:1 1 240px"><b>${esc(cfg().vowsHelper.title || 'Vows Helper')}</b><p class="wd-sub" style="margin:2px 0 0">${vText(p, k) ? esc(readTime(vText(p, k))) + (v.ready ? '. Ready.' : '. Change it any time.') : n ? n + ' answers so far.' : 'Write them together right here: a few questions, then a real draft.'}</p></div>
      <button type="button" class="btn ${vText(p, k) || n ? 'btn-line' : 'btn-gold'} btn-sm" data-wda="sub" data-wdv="${k}"${fk('sb|' + k)}>${vText(p, k) || n ? 'Open the Vows Helper' : 'Write Them Together Now'}</button></div></div>
      <label class="wd-ck" style="margin-top:8px"><input type="checkbox" data-wdc="vows.${k}.show"${v.show ? ' checked' : ''}> Show these vows in the Family View</label>
      <details class="wd-custom" style="margin-top:10px"><summary>Send the Questions to Write at Home</summary>${vShareCard(p, k)}</details>${vLoadBox(p, k)}`); }).join('') +
  custom(p, 'vows') + note(p, 'vows'); };
// The Vows Helper: the prompts, then the draft, then Polish It.
function vHelper(p, k){
  const H = cfg().vowsHelper, Q = arr(H.prompts), v = vS(p, k), n = S.vSec, d = v.d || '';
  const secs = ['The Questions', 'The Draft', 'Polish It'];
  let body = '';
  if (n === 0) body = Q.map(q => `<section class="wd-blk wd-q" data-wdanc="v-${k}-${esc(q.id)}"><label class="f" for="wd-v-${k}-${esc(q.id)}" style="margin-top:0">${esc(fill(q.t, p))}</label>${q.q ? `<p class="wd-sub" style="margin:2px 0 6px">${esc(fill(q.q, p))}</p>` : ''}<textarea id="wd-v-${k}-${esc(q.id)}" rows="2" data-wdi="vows.${k}.a.${esc(q.id)}">${esc(v.a[q.id] || '')}</textarea></section>`).join('');
  else if (n === 1) body = `<section class="wd-blk" data-wdanc="v-${k}-draft"><div class="wd-blk-h"><h3>${esc(vName(p, k))} to ${esc(vOther(p, k))}</h3><span class="wd-sub" id="wd-v-time" style="margin:0">${esc(d.trim() ? readTime(d) : 'Not built yet')}</span></div>
      <p class="wd-sub">Words in [brackets] are spots still waiting. The vows print under the Vows part of the Officiant Script.</p>
      <div class="wd-who" style="margin-top:0"><span class="wd-lbl">Voice</span>${[['warm', 'Warm'], ['plain', 'Plain']].map(([t, l]) => `<button type="button" class="chip wd-sm" data-wda="v-tone" data-wdv="${t}" aria-pressed="${(v.tone || 'warm') === t}"${fk('vt|' + t)}>${l}</button>`).join('')}</div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-wda="v-build">${d.trim() ? 'Build It Again From the Answers' : 'Build the Draft'}</button><button type="button" class="btn btn-line btn-sm" data-wda="v-var" data-wdv="oi">Try Another Opening</button><button type="button" class="btn btn-line btn-sm" data-wda="v-var" data-wdv="ci">Try Another Closing</button></div>
      <textarea rows="12" class="wd-bigta" data-wdi="vows.${k}.d" aria-label="The vows" placeholder="Tap Build the Draft, or write here." style="margin-top:10px">${esc(d)}</textarea>
      <div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-wda="v-copy">Copy</button><button type="button" class="btn btn-line btn-sm" data-wda="v-print">Print in Large Type</button></div></section>`;
  else { const P = cfg().vowsProse, tg = v.target || P.targetMinutes || 1.5, B = [...new Set(String(d).match(/\[[^\]\n]{1,120}\]/g) || [])];
    body = `<section class="wd-blk" data-wdanc="v-${k}-time"><div class="wd-blk-h"><h3>Timing</h3><span class="wd-sub" style="margin:0">${esc(d.trim() ? readTime(d) : 'Build the draft first')}</span></div>
      <div class="wd-g3"><div class="wd-fld"><label class="f" for="wd-v-target">Minutes to aim for</label><input id="wd-v-target" type="number" min="0.5" max="10" step="0.5" data-wdi="vows.${k}.target" value="${esc(tg)}"></div></div>
      <p class="wd-big" id="wd-v-fit" style="margin:6px 0 8px">${esc(fitLine(d, tg))}</p></section>
      <section class="wd-blk" data-wdanc="v-${k}-aloud"><h3 style="margin:0 0 6px">Read It Aloud</h3><div class="row"><button type="button" class="btn btn-line btn-sm" data-wda="speak">${canSpeak() ? 'Read It to Me, or Stop' : 'Read It Aloud Yourself'}</button><button type="button" class="btn btn-line btn-sm" data-wda="v-print">Print in Large Type</button></div>
        ${B.length ? `<div class="wd-lbl" style="margin-top:10px">Still to Fill In</div><div class="wd-chips">${B.map(x => `<span class="wd-tag">${esc(x)}</span>`).join(' ')}</div>` : (d.trim() ? '<p class="wd-sub">Every spot is filled in.</p>' : '')}
        <div class="wd-read wd-polread">${paras(d)}</div></section>
      <section class="wd-blk" data-wdanc="v-${k}-polish"><h3 style="margin:0 0 6px">Polish It</h3><ul class="wd-pol">${arr(P.polish).map((t, i) => `<li><label class="wd-ck"><input type="checkbox" data-wdc="vows.${k}.pol.${i}"${v.pol[i] ? ' checked' : ''}> <span>${esc(t)}</span></label></li>`).join('')}</ul>
        <label class="f" for="wd-v-marks">Changes to Make</label><textarea id="wd-v-marks" rows="3" data-wdi="vows.${k}.marks" placeholder="Mark what to change as you read it aloud.">${esc(v.marks || '')}</textarea>
        <div class="row" style="margin-top:10px"><button type="button" class="btn ${v.ready ? 'btn-line' : 'btn-gold'} btn-sm" data-wda="v-ready">${v.ready ? 'Ready: ' + esc(nice(v.ready)) + '. Tap to Reopen' : 'Mark It Ready'}</button></div></section>`; }
  return sayBox(p, n === 0 ? H.say : n === 1 ? 'Here are your vows as we have them. Let us read them through together.' : 'Let us read them aloud, slowly, and mark anything to change.') +
    `<div class="wd-chips wd-secnav" role="group" aria-label="Sections">${secs.map((t, i) => `<button type="button" class="chip" data-wda="v-sec" data-wdv="${i}" aria-pressed="${n === i}"${fk('vs|' + i)}><span class="wd-n">${i + 1}</span> ${esc(t)}</button>`).join('')}</div>` + body +
    `<div class="wd-nav"><button type="button" class="btn btn-line" data-wda="v-sec" data-wdv="${Math.max(0, n - 1)}"${n === 0 ? ' disabled' : ''}>&larr; Back</button><button type="button" class="btn btn-line" data-wda="sub" data-wdv="">Back to Vows</button>${n < 2 ? `<button type="button" class="btn btn-gold" data-wda="v-sec" data-wdv="${n + 1}">${n === 0 ? 'Build the Draft' : 'Polish It'} &rarr;</button>` : ''}</div>`;
}
const minsOfT = t => Math.round(wordsIn(String(t || '').replace(/\[[^\]]*\]/g, ' ')) / WPM * 10) / 10;
function fitLine(t, target){ const m = minsOfT(t), g = +target || 0; if (!g || !String(t || '').trim()) return ''; const d = Math.round((m - g) * 10) / 10;
  return Math.abs(d) < 0.3 ? 'Right on time for ' + g + ' minutes.' : d > 0 ? 'About ' + d + ' minutes over your ' + g + ' minutes. Trim a line or two.' : 'About ' + Math.abs(d) + ' minutes under your ' + g + ' minutes. Room for one more promise.'; }
const canSpeak = () => 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';
function speak(t){
  if (!canSpeak()) return toast('This device cannot read aloud. Read it yourself, slowly.');
  try { if (speechSynthesis.speaking){ speechSynthesis.cancel(); return; } } catch (e) {}
  String(t || '').replace(/\[[^\]]*\]/g, ' ').split(/\n{2,}/).map(x => x.trim()).filter(Boolean).forEach(x => { const u = new SpeechSynthesisUtterance(x); u.rate = 0.9; try { speechSynthesis.speak(u); } catch (e) {} });
}
const paras = t => String(t || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean).map(x => `<p>${esc(x).replace(/\n/g, '<br>')}</p>`).join('');

// ---------- Rehearsal ----------
const standers = p => ['_p1', '_p2', '_off'].concat(arr(p.people).filter(x => !['photographer', 'coordinator', 'musicians'].includes(x.role)).map(x => x.id));
const posOf = (p, id) => (p.reh.pos || {})[id] || '';
V[9] = p => { const R = cfg().rehearsal, PL = items(p, 'places');
  return sayBox(p, R.say || STEP(9).say) +
  blk(p, 'When and Where', 'reh', `<div class="wd-g3">${fld('reh.date', 'Date', p.reh.date, 'date')}${fld('reh.time', 'Time', p.reh.time, 'time')}${fld('reh.place', 'Place', p.reh.place)}</div>${who(p, 'reh', 'Who runs the rehearsal')}`) +
  blk(p, 'Who Stands Where', 'pos', standers(p).map(id => `<div class="wd-task"><b>${esc(pLabel(p, id))}</b><div class="wd-who" style="margin-top:4px">${PL.map(o => `<button type="button" class="chip wd-sm" data-wda="pos" data-wdv="${esc(id + '|' + o.id)}" aria-pressed="${posOf(p, id) === o.id}"${fk('po|' + id + '|' + o.id)}>${esc(fill(o.t, p))}</button>`).join('')}</div></div>`).join('') + addOwn('places', 'Another place: under the arch, by the piano'), 'Tap where each person stands once everyone is in.') +
  blk(p, list('cues').title || 'Cues', 'cues', chips(p, 'cues') + addOwn('cues', 'Another cue') + fld('reh.cueNote', 'Cue notes', p.reh.cueNote, 'text', 'The pianist starts the entrance when the doors open'), 'Tap the cues you will use. They print in the Rehearsal Plan.') +
  blk(p, 'The Rehearsal, Step by Step', 'rblocks', `<ol class="wd-ref">${arr(R.blocks).map(b => `<li><b>${esc(fill(b.h, p))}</b>${b.min ? ' (' + b.min + ' min)' : ''}: ${esc(fill(b.t, p))}</li>`).join('')}</ol>`) +
  custom(p, 'rehearsal') + note(p, 'rehearsal'); };

// ---------- Review Together ----------
function summary(p){
  const fs = (h, x) => `<div class="wd-fsec" data-wdanc="sum-${esc(h.toLowerCase().replace(/[^a-z]+/g, '-'))}"><h3>${esc(h)}</h3>${x}</div>`, ul = a => `<ul class="wd-flist">${a.join('')}</ul>`, li = (a, b) => `<li><span>${a}</span><span>${b || ''}</span></li>`;
  const o = order(p), fw = picked(p, 'faithway').concat(picked(p, 'tradition')), d = p.day, pl = procLines(p);
  return fs('The Couple', `<p class="wd-big">${esc(fullOf(p, 'p1'))}<br>${esc(fullOf(p, 'p2'))}</p>`) +
    (d.date || d.place ? fs('The Day', `<p class="wd-big">${esc([d.date ? WD[dOf(d.date).getDay()] + ', ' + nice(d.date) : '', tm(d.time)].filter(Boolean).join(', '))}${d.place ? `<br><span class="wd-soft">${esc([d.place, d.city].filter(Boolean).join(', '))}</span>` : ''}</p>`) : '') +
    (fw.length ? fs('The Ceremony Will Be', `<p class="wd-big">${esc(fw.join(', '))}</p>`) : '') +
    (o.length ? fs('Order of the Ceremony', ul(o.map(r => li(esc(r.name) + (holds(r).length ? ': <em>' + esc(holds(r).join('; ')) + '</em>' : ''), r.mins + ' min')).concat(li('<b>About</b>', '<b>' + svcTotal(p) + ' min</b>')))) : '') +
    (pl.length ? fs('Processional', `<ol class="wd-olist">${pl.map(x => `<li>${esc(x)}</li>`).join('')}</ol>`) : '') +
    (vStyle(p) ? fs('Vows', `<p class="wd-big">${esc(picked(p, 'vowstyle').join(''))}${VK.map(k => vText(p, k) ? '<br><span class="wd-soft">' + esc(vName(p, k)) + ': ' + (vS(p, k).ready ? 'ready' : 'in progress') + '</span>' : '').join('')}</p>`) : '') +
    (attireLines(p).length ? fs(cfg().attire.title || 'What to Wear', `<p class="wd-big">${attireLines(p).map(esc).join('<br>')}</p>`) : '') +
    (p.reh.date || p.reh.place ? fs('Rehearsal', `<p class="wd-big">${esc([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', '))}${p.reh.place ? `<br><span class="wd-soft">${esc(p.reh.place)}</span>` : ''}</p>`) : '') +
    fs('The License', `<p class="wd-big">${licOpen(p).length ? licOpen(p).length + ' steps still open' : 'Every step is done'}</p>`);
}
V[10] = p => sayBox(p, STEP(10).say) +
  `<div class="wd-fam wd-inline"><h2>${esc(couple(p))}</h2><p class="wd-fsub">The plan so far</p>${summary(p)}</div>` +
  blk(p, 'Getting Ready', 'tasks', p.tasks.map((k, i) => `<div class="wd-task${k.done ? ' done' : ''}"><label class="wd-ck"><input type="checkbox" data-wdc="tasks.${i}.done"${k.done ? ' checked' : ''}${fk('tk|' + i)}><b>${esc(k.t)}</b></label>
    <input type="text" class="wd-td" data-wdi="tasks.${i}.d" value="${esc(k.d || '')}" aria-label="Details for ${esc(k.t)}" placeholder="Details: names, times" autocomplete="off">${who(p, 'task.' + i, 'Who handles ' + k.t)}</div>`).join('') + addOwn('tasks', 'Add a task: the guest book, a shuttle...')) +
  blk(p, 'Next Steps', 'next', p.next.map((k, i) => `<div class="wd-task${k.done ? ' done' : ''}"><label class="wd-ck"><input type="checkbox" data-wdc="next.${i}.done"${k.done ? ' checked' : ''}><span>${esc(k.t)}</span></label><button type="button" class="linkbtn" data-wda="next-del" data-wdv="${i}">Remove</button></div>`).join('') + addOwn('next', 'Add a next step')) +
  blk(p, "The Couple's Copy", 'copy', `<p class="wd-sub" style="margin-top:0">${esc(fill(cfg().coupleCopyLead, p))}</p><div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="out" data-wdv="couple">Print the Couple Copy</button><button type="button" class="btn btn-line btn-sm" data-wda="cc-copy">Copy</button><a class="btn btn-line btn-sm" href="${esc(mailHref(cEm(p), 'Your wedding plan', coupleText(p)))}">Email</a></div>`) +
  vApprove(p) + custom(p, 'review') + note(p, 'review');

// ---------- What You'll Get ----------
V[11] = p => sayBox(p, STEP(11).say) + vSend(p) +
  `<div class="wd-cards">${cfg().outputs.map(o => `<div class="wd-ocard"><h4>${esc(o.title)}</h4><p>${esc(fill(o.lead, p))}</p><div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="out" data-wdv="${esc(o.id)}">Print or Save as PDF</button>${o.id === 'couple' ? '<button type="button" class="btn btn-line btn-sm" data-wda="cc-copy">Copy</button>' : ''}${o.id === 'script' && hasSvc(p) ? '<button type="button" class="btn btn-line btn-sm" data-wda="cer-print" data-wdv="script">Service Builder Version</button>' : ''}</div></div>`).join('')}</div>` +
  blk(p, 'Live in Start a Session', 'sessions', `<p class="wd-sub" style="margin-top:0">The rehearsal and the ceremony become your sessions in Start a Session, to run live on a tablet or phone: the words to say, the next cue, who is speaking, and a quiet timer.</p>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="make-ses">${arr(p.ses).length ? 'Update the Sessions' : 'Create Sessions'}</button></div>${sesList(p)}`) +
  vWriting(p) + custom(p, 'outputs') + note(p, 'outputs');

// ---------- Since Last Time and Next Meeting, and the follow-ups ----------
V[12] = p => { const M = cfg().meetings, n = p.nextMt || (p.nextMt = {agenda: []});
  return sayBox(p, M.say || STEP(12).say) + sinceCard(p, true) +
  blk(p, 'Meeting Log', 'mlog', arr(p.mt).length ? `<ul class="wd-flist">${p.mt.slice().reverse().map(m => { const i = p.mt.indexOf(m); return `<li><span><b>${esc(nice(m.date))}</b>${arr(m.steps).length ? '<br><small class="muted">' + esc(m.steps.map(s => (STEP(s) || {}).title).filter(Boolean).join(', ')) + '</small>' : ''}<input type="text" data-wdi="mt.${i}.note" value="${esc(m.note || '')}" aria-label="Note for the meeting on ${esc(nice(m.date))}" placeholder="What we did" autocomplete="off" style="margin-top:6px"></span><span></span></li>`; }).join('')}</ul>` : '<p class="wd-sub" style="margin-top:0">Tap Start Today\'s Meeting to begin the log.</p>') +
  blk(p, M.nextTitle || 'Next Meeting', 'nextmt', (M.nextSay ? `<div class="wd-say" style="margin-top:0"><b>Say</b><q>${esc(fill(M.nextSay, p))}</q></div>` : '') + `<div class="wd-g3">${fld('nextMt.date', 'Date', n.date, 'date')}${fld('nextMt.time', 'Time', n.time, 'time')}${fld('nextMt.place', 'Where', n.place, 'text', 'Zoom, or the coffee shop')}</div>
    <div class="wd-lbl" style="margin-top:8px">What We Will Cover</div>${chips(p, 'agenda')}${addOwn('agenda', 'Another topic')}
    ${n.date ? `<div class="row" style="margin-top:10px"><a class="btn btn-line btn-sm" href="${esc(mailHref(cEm(p), 'Our next meeting', fill('Hi [Couple],\n\nLooking forward to our next meeting on ' + nice(n.date) + (n.time ? ' at ' + tm(n.time) : '') + (n.place ? ', ' + n.place : '') + '.' + (picked(p, 'agenda').length ? ' We will cover: ' + picked(p, 'agenda').join(', ') + '.' : '') + '\n\n[Chris]', p)))}">Email the Couple</a><a class="btn btn-line btn-sm" href="${esc(smsHref(cPh(p), fill('Hi [Couple], see you ' + nice(n.date) + (n.time ? ' at ' + tm(n.time) : '') + '. [Chris]', p)))}">Text the Couple</a></div>` : ''}`) +
  vFollow(p) + custom(p, 'meetings') + note(p, 'meetings'); };
function vFollow(p){
  const T = touches(p), nextT = (T.find(t => !(p.fu[t.id] || {}).done) || {}).id;
  return blk(p, 'After the Wedding', 'followup', (wDate(p) ? '' : '<p class="wd-sub" style="margin-top:0">Add the wedding date in The Day, and the dates here follow it.</p>') +
  `<div class="wd-tl">${T.map(t => { const f = t.f, st = p.fu[t.id] || {}, em = f.email || {}, cl = f.call || {}, open = S.fuOpen ? S.fuOpen === t.id : t.id === nextT;
    const body = fill(em.body || '', p) + (f.invite ? '\n\n' + fill(cfg().gmInvite, p, {Link: gmURL()}) : ''), sub = fill(em.subject || t.title, p);
    return `<details class="wd-fu${st.done ? ' done' : ''}" data-wdfu="${esc(t.id)}"${open ? ' open' : ''}><summary><span class="wd-dot" aria-hidden="true"></span><b>${esc(t.title)}</b><span class="wd-when">${t.date ? esc(nice(t.date)) : ''}${st.done ? ' &middot; Done' : ''}</span></summary><div class="wd-fu-in">
      ${t.own ? '' : `<div class="wd-box"><h4>Ready-to-Send Email</h4><div class="wd-words">${esc(body)}</div><div class="row" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-wda="fu-copy" data-wdv="${esc(t.id)}">Copy</button><a class="btn btn-line btn-sm" href="${esc(mailHref(cEm(p), sub, body))}">Open in Mail</a></div></div>
      <div class="wd-box"><h4>Phone Call</h4>${cl.open ? `<div class="wd-lbl">Opening</div><p>"${esc(fill(cl.open, p))}"</p>` : ''}${arr(cl.questions).length ? `<div class="wd-lbl">Gentle questions</div><ul>${cl.questions.map(q => `<li>${esc(fill(q, p))}</li>`).join('')}</ul>` : ''}${cl.listenFor ? `<div class="wd-lbl">Listen for</div><p>${esc(fill(cl.listenFor, p))}</p>` : ''}${f.invite ? `<div class="wd-lbl">The Grounded Marriage</div><p>${esc(fill(cfg().gmInvite, p, {Link: gmURL()}))}</p>` : ''}<div class="wd-crisis">${esc(cfg().crisis)}</div></div>`}
      <div class="wd-box wd-full"><label class="wd-ck"><input type="checkbox" data-wdc="fu.${esc(t.id)}.done"${st.done ? ' checked' : ''}> Done</label><textarea rows="2" data-wdi="fu.${esc(t.id)}.note" aria-label="Note for ${esc(t.title)}" placeholder="How it went, a few words">${esc(st.note || '')}</textarea>${t.own ? `<button type="button" class="linkbtn" data-wda="fu-del" data-wdv="${esc(t.id)}">Remove This Check-In</button>` : ''}</div>
    </div></details>`; }).join('')}</div>
  <div class="wd-g3"><div class="wd-fld"><label class="f" for="wd-fuo-t">Add Your Own Check-In</label><input type="text" id="wd-fuo-t" placeholder="Their first home, a new baby..." autocomplete="off"></div><div class="wd-fld"><label class="f" for="wd-fuo-d">Date</label><input type="date" id="wd-fuo-d"></div><div class="wd-fld" style="align-self:end"><button type="button" class="btn btn-line btn-sm" data-wda="fu-add">Add Your Own</button></div></div>`, 'A thank-you a week after, and the first anniversary with an invitation to The Grounded Marriage.');
}
function vTidy(p){
  const ns = cfg().steps.map((s, i) => ({s, n: i + 1})).filter(x => (p.notes[x.s.id] || '').trim());
  const marked = ns.filter(x => p.tidy[x.s.id]), rest = ns.filter(x => !p.tidy[x.s.id]);
  const row = x => `<section class="wd-blk"><div class="wd-blk-h"><h3>${esc(x.s.title)}</h3><span class="row"><button type="button" class="btn btn-line btn-sm" data-wda="step" data-wdv="${x.n}">Go to Step ${x.n}</button>${p.tidy[x.s.id] ? `<button type="button" class="btn btn-gold btn-sm" data-wda="tidy" data-wdv="${x.s.id}">Tidied</button>` : ''}</span></div><textarea rows="3" data-wdi="notes.${x.s.id}" aria-label="Note for ${esc(x.s.title)}">${esc(p.notes[x.s.id])}</textarea></section>`;
  return `<p class="wd-sub" style="margin-top:0">After the meeting: the quick notes you marked Tidy Up Later, then every other note.</p>` +
    (marked.length ? marked.map(row).join('') : '<p class="muted">Nothing marked to tidy. Every note is below.</p>') + (rest.length ? `<h3 style="margin-top:18px">Other Notes</h3>${rest.map(row).join('')}` : '');
}

// ---------- the plan as words: the couple copy ----------
function coupleText(p){
  const o = order(p), d = p.day, out = [fill(cfg().coupleCopyLead, p), '', 'THE COUPLE', fullOf(p, 'p1'), fullOf(p, 'p2')];
  if (d.date || d.place) out.push('', 'THE DAY', [nice(d.date), tm(d.time)].filter(Boolean).join(', '), [d.place, d.city].filter(Boolean).join(', '), d.arrive ? 'Please arrive by ' + tm(d.arrive) + '.' : '');
  const fw = picked(p, 'faithway').concat(picked(p, 'tradition')); if (fw.length) out.push('', 'THE CEREMONY WILL BE', fw.join(', '));
  if (o.length) out.push('', 'ORDER OF THE CEREMONY (about ' + svcTotal(p) + ' minutes)', ...o.map((r, i) => (i + 1) + '. ' + r.name + (r.by ? ', ' + r.by : '') + (holds(r).length ? ' (' + holds(r).join('; ') + ')' : '')));
  if (procLines(p).length) out.push('', 'PROCESSIONAL', ...procLines(p).map((x, i) => (i + 1) + '. ' + x));
  if (recLines(p).length) out.push('', 'RECESSIONAL', ...recLines(p).map((x, i) => (i + 1) + '. ' + x));
  if (vStyle(p)) out.push('', 'VOWS', picked(p, 'vowstyle').join(''));
  if (attireLines(p).length) out.push('', String(cfg().attire.title || 'What to Wear').toUpperCase(), ...attireLines(p));
  if (picked(p, 'weather').length || d.rain) out.push('', 'WEATHER PLAN', [picked(p, 'weather').join(', '), d.rain ? 'If it rains: ' + d.rain : ''].filter(Boolean).join('. '));
  if (p.reh.date || p.reh.place) out.push('', 'REHEARSAL', [nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', '));
  const lo = licOpen(p); if (lo.length) out.push('', 'THE LICENSE: STILL TO DO', ...lo.map(x => '* ' + fill(x.text, p)));
  const nx = p.next.filter(x => !x.done); if (nx.length) out.push('', 'NEXT STEPS', ...nx.map(x => '* ' + x.t));
  if ((p.nextMt || {}).date) out.push('', 'OUR NEXT MEETING', [nice(p.nextMt.date), tm(p.nextMt.time), p.nextMt.place].filter(Boolean).join(', '));
  out.push('', 'With joy,', me());
  return out.filter(x => x != null).filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ---------- Family View (its own window, or here to tilt the laptop) ----------
const fChips = (p, id) => `<div class="wd-fchips">${items(p, id).map(o => `<span class="wd-fchip${isOn(p, id, o.id) ? ' on' : ''}">${isOn(p, id, o.id) ? '&#10003; ' : ''}${esc(fill(o.t, p))}</span>`).join('')}</div>`;
const fsec = (h, x, k) => `<div class="wd-fsec"${k ? ` data-wdanc="${esc(k)}"` : ''}><h3>${esc(h)}</h3>${x}</div>`;
const flist = a => `<ul class="wd-flist">${a.join('')}</ul>`, fli = (a, b) => `<li><span>${a}</span><span>${b || ''}</span></li>`;
const FV = {};
FV[1] = p => (arr(p.mt).length ? (() => { const s = sinceLast(p); return s.prev ? fsec(cfg().meetings.sinceTitle || 'Since Last Time', (s.done.length ? flist(s.done.map(x => fli('&#10003; ' + esc(x.t)))) : '<p class="wd-big wd-soft">Picking up where we left off.</p>') + `<p class="wd-soft" style="margin-top:8px">${s.open.length} still open</p>`, 'since') : ''; })() : '') +
  fsec(list('who').title || 'Who Is Here', fChips(p, 'who'), 'who') + fsec('The Couple', `<p class="wd-big">${esc(fullOf(p, 'p1'))}${pc(p, 'p1').say ? ' <span class="wd-soft">(' + esc(pc(p, 'p1').say) + ')</span>' : ''}<br>${esc(fullOf(p, 'p2'))}${pc(p, 'p2').say ? ' <span class="wd-soft">(' + esc(pc(p, 'p2').say) + ')</span>' : ''}</p>`, 'couple');
FV[2] = p => fsec('Your Story', `<ul class="wd-flist">${items(p, 'story').map(it => fli((isOn(p, 'story', it.id) || clean(p.story[it.id]) ? '&#10003; ' : '') + '<b>' + esc(fill(it.t, p)) + '</b>' + (clean(p.story[it.id]) ? '<br><span class="wd-soft">' + esc(p.story[it.id]) + '</span>' : ''))).join('')}</ul>`, 'story') + (clean(p.address) ? fsec("The Couple's Story, as I Will Tell It", `<div class="wd-read">${paras(p.address)}</div>`, 'address') : '');
FV[3] = p => fsec('Faith or Plain', fChips(p, 'faithway'), 'faithway') + fsec('Traditions', fChips(p, 'tradition'), 'tradition') + fsec('Customs to Honor', fChips(p, 'customs'), 'customs');
FV[4] = p => { const d = p.day; return fsec('Kind of Ceremony', fChips(p, 'wtype'), 'wtype') + fsec('When and Where', `<p class="wd-big">${esc([d.date ? nice(d.date) : 'Date to come', tm(d.time)].filter(Boolean).join(', '))}${d.place ? '<br>' + esc([d.place, d.city].filter(Boolean).join(', ')) : ''}</p>`, 'when') + fsec('How Many Guests', fChips(p, 'size'), 'size') + fsec('Kind of Place', fChips(p, 'venue'), 'venue') + fsec('Time of Day', fChips(p, 'timeofday'), 'timeofday') +
  fsec(cfg().attire.title || 'What to Wear', fChips(p, 'attire') + `<p class="wd-soft" style="margin:12px 0 6px">${esc(list('partyWears').title)}</p>` + fChips(p, 'partyWears') + `<p class="wd-soft" style="margin:12px 0 6px">${esc(list('chrisWears').title)}</p>` + fChips(p, 'chrisWears'), 'attire') + fsec('Weather Plan', fChips(p, 'weather') + (d.rain ? `<p class="wd-big" style="margin-top:8px">If it rains: ${esc(d.rain)}</p>` : ''), 'weather'); };
FV[5] = p => fsec('Minnesota Marriage License', flist(licItems().map(x => fli(((p.lic || {})[x.id] ? '&#10003; ' : '') + esc(fill(x.text, p)), (p.lic || {})[x.id] ? 'Done' : ''))), 'lic') + fsec('Witnesses', `<p class="wd-big">${esc(byRole(p, wRole()).map(id => pName(p, id)).join(', ') || 'Two to choose')}</p>`, 'witnesses');
FV[6] = p => { const o = order(p), ch = inSvc(p), L = lbList(p).slice(0, 12), op = S.lb.open, openX = op ? lbAll(p).find(({k, x}) => lbKey(k, x.id) === op) : null;
  return fsec('Order of the Ceremony', o.length ? flist(o.map(r => fli(esc(r.name) + (holds(r).length ? ': <em>' + esc(holds(r).join('; ')) + '</em>' : ''), r.mins + ' min')).concat(fli('<b>About</b>', '<b>' + svcTotal(p) + ' min</b>'))) : '<p class="wd-big wd-soft">Coming together now.</p>', 'order') +
    fsec('Readings, Music, and Rituals', (ch.length ? flist(ch.map(x => fli('&#10003; <b>' + esc(x.title) + '</b>' + (x.by ? ', ' + esc(x.by) : ''), esc(x.part)))) : '<p class="wd-big wd-soft">Nothing chosen yet.</p>') +
      `<h3 style="margin-top:16px">${esc((LBT.find(t => t[0] === S.lb.type) || ['', ''])[1])} to Choose From</h3><ul class="wd-flist">${L.map(({k, x}) => `<li class="${S.lb.open === lbKey(k, x.id) ? 'wd-cur' : ''}"><span><b>${esc(rTitle(x))}</b>${x.by ? '<br><span class="wd-soft">' + esc(x.by) + '</span>' : ''}</span><span>${ch.some(c => c.kind === k && c.id === x.id) ? '&#10003; Chosen' : ''}</span></li>`).join('')}</ul>`, 'pieces') +
    (openX ? fsec(rTitle(openX.x), lbPrev(p, openX.k, openX.x), 'lb-' + openX.x.id) : '') +
    (musicByMoment(p).length ? fsec('Music by Moment', flist(musicByMoment(p).map(m => fli('<b>' + esc(m.x.title) + '</b>', esc(m.when)))), 'music') : ''); };
FV[7] = p => fsec('Your People', arr(p.people).length ? flist(p.people.map(x => fli(esc(clean(x.name) || 'Someone'), esc(roleName(p, x.role))))) : '<p class="wd-big wd-soft">Coming together now.</p>', 'people') +
  fsec('Processional', procLines(p).length ? `<ol class="wd-olist">${procLines(p).map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '<p class="wd-big wd-soft">To set together.</p>', 'proc') + (recLines(p).length ? fsec('Recessional', `<ol class="wd-olist">${recLines(p).map(x => `<li>${esc(x)}</li>`).join('')}</ol>`, 'rec') : '');
FV[8] = p => fsec('How You Will Say Your Vows', fChips(p, 'vowstyle'), 'vowstyle') + VK.map(k => fsec(vName(p, k) + "'s Vows", vS(p, k).show && vText(p, k) ? `<div class="wd-read">${paras(vText(p, k))}</div>` : `<p class="wd-big wd-soft">${vText(p, k) ? 'Written, and kept private until the day.' : 'Still to write.'}</p>`, 'vows-' + k)).join('');
FV[9] = p => fsec('Rehearsal', `<p class="wd-big">${esc([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', ') || 'Date to set')}${p.reh.place ? '<br>' + esc(p.reh.place) : ''}</p>`, 'reh') + fsec('Who Stands Where', flist(standers(p).filter(id => posOf(p, id)).map(id => fli(esc(pName(p, id)), esc(label(p, 'places', posOf(p, id)))))), 'pos') + fsec('Cues', fChips(p, 'cues'), 'cues');
FV[10] = p => summary(p);
FV[11] = p => fsec("What You'll Receive", flist(cfg().outputs.map(o => fli(esc(o.title)))).replace('</ul>', fli(esc(cfg().bundle.title) + ': all of it in one packet') + '</ul>'), 'bundle');
FV[12] = p => { const s = sinceLast(p), n = p.nextMt || {}; return fsec(cfg().meetings.sinceTitle || 'Since Last Time', (s.prev && s.done.length ? flist(s.done.map(x => fli('&#10003; ' + esc(x.t)))) : '') + `<p class="wd-soft">${s.open.length} still open</p>` + (s.open.length ? flist(s.open.slice(0, 10).map(x => fli(esc(x.t)))) : ''), 'since') +
  fsec(cfg().meetings.nextTitle || 'Next Meeting', `<p class="wd-big">${esc([nice(n.date), tm(n.time), n.place].filter(Boolean).join(', ') || 'To set together')}</p>${picked(p, 'agenda').length ? `<p class="wd-soft" style="margin-top:8px">${esc(picked(p, 'agenda').join(', '))}</p>` : ''}`, 'nextmt'); };
function famHelper(p, k){
  const Q = arr(cfg().vowsHelper.prompts), v = vS(p, k);
  if (!v.show) return `<p class="wd-fsub">${esc(vName(p, k))}'s Vows</p><h2>Writing the Vows</h2>` + fsec('Kept Private', '<p class="wd-big">These vows stay private until the day.</p>', 'v-' + k + '-draft');
  if (S.vSec === 0) return `<p class="wd-fsub">${esc(vName(p, k))}'s Vows</p><h2>The Questions</h2>` + Q.map(q => fsec(fill(q.t, p), `${q.q ? `<p class="wd-soft" style="margin:0 0 8px">${esc(fill(q.q, p))}</p>` : ''}<p class="wd-big wd-ans">${clean(v.a[q.id]) ? esc(v.a[q.id]).replace(/\n/g, '<br>') : '<span class="wd-soft">&hellip;</span>'}</p>`, 'v-' + k + '-' + q.id)).join('');
  return `<p class="wd-fsub">${esc(vName(p, k))}'s Vows</p><h2>The Draft</h2>` + fsec(vText(p, k) ? readTime(vText(p, k)) : 'Coming together now', `<div class="wd-read">${paras(v.d)}</div>`, 'v-' + k + '-draft');
}
function famBody(p){
  if (S.step === 'finish') return famFinish(p);
  const n = typeof S.step === 'number' ? S.step : 10, st = STEP(n), ap = S.appr ? apBox(p) : '';
  if (n === 8 && S.sub) return `<div class="wd-fam"><p class="wd-fsub">${esc(couple(p))}</p>${famHelper(p, S.sub)}${ap}</div>`;
  return `<div class="wd-fam"><p class="wd-fsub">${esc(couple(p))}</p><h2>${esc(st.title)}</h2>${FV[n](p)}${ap}</div>`;
}
const FCSS = `:root{--bg:#F6F0E4;--card:#FFFCF6;--ink:#2A1C12;--soft:#6B5A4D;--line:#DDD0B8;--gold:#8B5E1A;--on:#2E2118;--onink:#F4EBDA;}
@media (prefers-color-scheme: dark){:root{--bg:#18120D;--card:#231A13;--ink:#F2EADC;--soft:#BFB09A;--line:#3A2E23;--gold:#D9A847;--on:#D9A847;--onink:#1A130D;}}
*{box-sizing:border-box;}html,body{margin:0;}body{background:var(--bg);color:var(--ink);font-family:Barlow,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.45;}
main{max-width:980px;margin:0 auto;padding:36px 28px 60px;}
.wd-fam h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:2.4em;line-height:1.1;margin:.1em 0 .5em;}
.wd-fsub{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:.8em;}
.wd-fsec{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 22px;margin:0 0 16px;}
.wd-fsec h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}
.wd-fchips{display:flex;flex-wrap:wrap;gap:10px;}.wd-fchip{border:1.5px solid var(--line);border-radius:30px;padding:10px 18px;color:var(--soft);}
.wd-fchip.on{background:var(--on);border-color:var(--on);color:var(--onink);font-weight:600;}
.wd-flist{list-style:none;margin:0;padding:0;}.wd-flist li{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding:9px 0;}.wd-flist li:first-child{border-top:0;}
.wd-flist li span:last-child{color:var(--soft);text-align:right;white-space:nowrap;}
.wd-big{font-size:1.2em;margin:0;}.wd-soft{color:var(--soft);font-size:.8em;}
.wd-top{display:flex;justify-content:space-between;align-items:center;gap:12px;color:var(--soft);font-size:.7em;border-bottom:1px solid var(--line);padding:10px 28px;}
.wd-fsec h3 + .wd-flist{margin-top:0;}.wd-read{white-space:pre-wrap;font-family:"Cormorant Garamond",Georgia,serif;font-size:1.15em;line-height:1.5;}.wd-read p{margin:0 0 .7em;}
.wd-prev p{margin:.2em 0 .5em;}.wd-prev ol,.wd-prev ul{margin:.2em 0 .6em;padding-left:1.2em;}.wd-src{font-style:italic;color:var(--soft);font-size:.75em;}.wd-lbl{font-family:"Barlow Condensed",sans-serif;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--soft);font-size:.65em;margin-top:.6em;}
.wd-flist li.wd-cur{background:color-mix(in srgb,var(--gold) 16%,transparent);border-radius:10px;padding-left:10px;padding-right:10px;}.wd-ans{overflow-wrap:anywhere;}.wd-words{white-space:pre-wrap;}
.wd-top label{display:flex;gap:6px;align-items:center;}
.wd-apbox{background:var(--card);border:3px solid var(--gold);border-radius:18px;padding:18px 22px;margin:16px 0;}.wd-apbox h3{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35em;margin:0 0 10px;}
.wd-apin{display:block;width:100%;box-sizing:border-box;font:inherit;font-size:1.1em;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);margin:8px 0 12px;}
.wd-apbtn{font:inherit;font-weight:700;font-size:1.05em;background:var(--gold);color:var(--card);border:0;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:54px;}
.wd-lbl{display:block;}
@media(max-width:600px){body{font-size:18px;}main{padding:20px 16px 40px;}.wd-flist li{flex-wrap:wrap;}.wd-flist li span:last-child{white-space:normal;}}
.wd-olist{margin:0;padding-left:1.4em;}.wd-olist li{padding:4px 0;}`;
let famWin = null, famT = null;
function famPage(p){
  const fonts = new URL('/fonts/fonts.css', location.href).href;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Family View</title><link rel="stylesheet" href="${fonts}"><style>${FCSS}</style></head><body><div class="wd-top"><span>Grow With Grounded</span><span>Family View</span></div><main id="fv">${famBody(p)}</main></body></html>`;
}
function openFam(){
  const p = plan(); if (!p) return;
  let w = null; try { w = window.open('', 'gg-wd-family', 'width=1100,height=820'); } catch (e) { w = null; }
  if (!w){ toast('Your browser kept the window from opening. Showing the Family View here instead.'); S.mode = 'family'; rerender(); return; }
  famWin = w;
  try { if (!w.document.getElementById('fv')){ w.document.open(); w.document.write(famPage(p)); w.document.close(); } else pushFam(true); bindFam(w); w.focus(); } catch (e) {}
  API.famWin = w; setTimeout(syncFam, 120);
}
function bindFam(w){ try { const d = w.document; if (d.__wdBound) return; d.__wdBound = 1;
  d.addEventListener('input', e => { if (e.target && e.target.dataset && e.target.dataset.wdapn) S.apName = e.target.value; });
  d.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-wda="fam-approve"]'); if (b){ e.preventDefault(); act('fam-approve', '', b); } }); } catch (e) {} }
function pushFam(now){
  clearTimeout(famT);
  const go = () => { const p = plan(); if (!p || !famWin || famWin.closed) return; try { const el = famWin.document.getElementById('fv'); if (el){ el.innerHTML = famBody(p); syncFam(); } } catch (e) {} };
  if (now) go(); else famT = setTimeout(go, 200);
}
// Follow My Scroll: the family window follows this window's place by section.
function syncFam(){
  if (!S.follow || !famWin || famWin.closed || !S.on || !S.id) return;
  let fd, fw = famWin; try { fd = fw.document; if (!fd || !fd.getElementById('fv')) return; } catch (e){ return; }
  const main = document.getElementById('wd-main'); if (!main) return;
  const de = document.documentElement, top = ((document.querySelector('header.bar') || {}).offsetHeight || 0) + 12;
  const fmax = Math.max(0, fd.documentElement.scrollHeight - fw.innerHeight), myMax = Math.max(0, de.scrollHeight - window.innerHeight);
  const F = {}; fd.querySelectorAll('[data-wdanc]').forEach(el => { if (!F[el.dataset.wdanc]) F[el.dataset.wdanc] = el; });
  const A = [...main.querySelectorAll('[data-wdanc]')];
  let i = -1; A.forEach((a, j) => { if (a.getBoundingClientRect().top <= top) i = j; });
  let target = null;
  for (let j = i; j >= 0; j--){ const a = A[j], f = F[a.dataset.wdanc]; if (!f) continue;
    const r = a.getBoundingClientRect(), frac = Math.max(0, Math.min(1, (top - r.top) / Math.max(1, r.height)));
    target = f.getBoundingClientRect().top + fw.scrollY + frac * f.offsetHeight - 16; break; }
  if (target == null) target = myMax ? window.scrollY / myMax * fmax : 0;
  if (window.scrollY <= 2) target = 0; else if (myMax && window.scrollY >= myMax - 2) target = fmax;
  target = Math.max(0, Math.min(fmax, Math.round(target)));
  try { fw.scrollTo(0, target); } catch (e) {}
  API.lastSync = {target, i, key: i >= 0 ? A[i].dataset.wdanc : null};
}
let syncRaf = 0;
window.addEventListener('scroll', () => { if (!famWin || famWin.closed || !S.follow) return; if (syncRaf) return; syncRaf = requestAnimationFrame(() => { syncRaf = 0; syncFam(); }); }, {passive: true});

// ---------- Phone Mode ----------
function vPhone(p){
  const ol = L => `<ol>${L.map(x => `<li><h3>${esc(fill(x[0], p))}</h3><p>${esc(fill(x[1], p, {Minutes: svcTotal(p) || 'about thirty'}))}</p></li>`).join('')}</ol>`;
  if (S.step === 'finish'){ const F = cfg().finish; return `<div class="wd-phone"><div class="wd-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, slowly.</div>${ol([['Thank You', F.thanks]].concat(arr(F.next).map(t => ['Next', t])))}</div>`; }
  const n = typeof S.step === 'number' ? S.step : 1, L = arr(STEP(n).phoneLines).slice();
  if (n === 1) L.push(['Writing help', cfg().writingHelp.ask]);
  if (n === 4 && arr(cfg().attire.phoneLine).length === 2) L.push(cfg().attire.phoneLine);
  if (n === 5 && arr(cfg().license.phoneLine).length === 2) L.push(cfg().license.phoneLine);
  if (n === 10) L.push([cfg().approval.title, 'If it all sounds right, just say "I approve" and your names, and I will note it with today\'s date.']);
  if (n === 12){ const s = sinceLast(p); if (s.prev) L.unshift([cfg().meetings.sinceTitle || 'Since Last Time', s.done.length ? 'Since we last met: ' + s.done.map(x => x.t).join('; ') + '.' : 'Let us pick up where we left off.']); }
  if (n === 8 && S.sub){ const Q = arr(cfg().vowsHelper.prompts);
    return `<div class="wd-phone"><div class="wd-ph-h"><span aria-hidden="true">&#9742;</span> Read each question aloud to ${esc(vName(p, S.sub))} and type what they say in ${esc(me())}'s View.</div>${S.vSec === 0 ? `<ol>${Q.map(q => `<li><h3>${esc(fill(q.t, p))}</h3><p>${esc(fill(q.q || '', p))}</p></li>`).join('')}</ol>` : `<p>Read the vows aloud slowly, and ask what they would change.</p>`}</div>`; }
  const pick = n === 6 ? lbList(p).slice(0, 8) : [];
  return `<div class="wd-phone"><div class="wd-ph-h"><span aria-hidden="true">&#9742;</span> Read aloud, one at a time. Pause after each.</div>${ol(L)}
    ${n === 5 ? `<h3 style="margin-top:6px">The License, Step by Step</h3><ol>${licItems().map(x => `<li><p>${esc(fill(x.text, p))}</p></li>`).join('')}</ol>` : ''}
    ${pick.length ? `<h3 style="margin-top:6px">${esc((LBT.find(t => t[0] === S.lb.type) || ['', ''])[1])} to Read Aloud</h3><ol>${pick.map(({k, x}) => `<li><h3>${esc(rTitle(x))}${x.by && x.kind !== 'scripture' ? ', ' + esc(x.by) : ''}</h3><p>${esc(snip(k === 'reading' ? (x.bring ? 'Text not included; we would bring a copy.' : rBody(x, 'kjv').text) : x.about, 140))}</p></li>`).join('')}</ol>` : ''}
    ${n === 7 && procLines(p).length ? `<h3 style="margin-top:6px">The Processional</h3><ol>${procLines(p).map(x => `<li><p>${esc(x)}</p></li>`).join('')}</ol>` : ''}
    ${n === 12 ? `<div class="wd-crisis">${esc(cfg().crisis)}</div>` : ''}</div>`;
}

// ---------- printouts (the Field Guide's own print path: fgSheet) ----------
const H = s => esc(s);
function sheet(html, title, file){
  const body = (C.ph ? C.ph('Wedding Planning Session') : '') + html + (C.pf ? C.pf() : '');
  API.last = {title, html: body};
  if (C.sheet) C.sheet(body, title, {file});
}
const headLine = p => couple(p) + (p.day.date ? ', ' + nice(p.day.date) : '');
const dayLine = p => { const d = p.day; return [d.date ? WD[dOf(d.date).getDay()] + ', ' + nice(d.date) : '', tm(d.time), [d.place, d.city].filter(Boolean).join(', ')].filter(Boolean).join(' · '); };
// The vows go where the Vows part asks for them ("[Sam's vows]"), else under the part.
function vowsInto(p, words){
  let i = 0; const st = vStyle(p), own = VK.map(k => vText(p, k));
  const out = String(words || '').replace(/\[[^\]\n]*['’]s (renewed )?vows\]/gi, m => { const k = VK[i++]; if (!k) return m; return own[VK.indexOf(k)] && st !== 'repeat' ? own[VK.indexOf(k)] : m; });
  return {text: out, used: i > 0 && own.some(Boolean) && st !== 'repeat'};
}
function partExtra(p, r){
  const id = r.part || '', nm = String(r.name || '').toLowerCase(), out = [];
  if (/processional/.test(nm) && procLines(p).length) out.push(['The Processional', procLines(p).map((x, i) => (i + 1) + '. ' + x).join('\n')]);
  if (/recessional/.test(nm) && recLines(p).length) out.push(['The Recessional', recLines(p).map((x, i) => (i + 1) + '. ' + x).join('\n')]);
  if (/couple.s story/.test(nm) && clean(p.address)) out.push(['Words About the Couple', p.address]);
  if (/^welcome/.test(nm) && clean(p.welcomeText)) out.push(['Welcome, as Written', p.welcomeText]);
  if (/license/.test(nm)){ const w = byRole(p, wRole()).map(x => pName(p, x)); if (w.length) out.push(['Witnesses', w.join(', ')]); }
  return out;
}
function scriptParts(p){
  return timedOrder(p).map(r => { let w = r.words, vw = null;
    if (/^vows/i.test(r.name)){ const v = vowsInto(p, w); w = v.text; if (!v.used){ const b = vowsBlock(p); if (b && vStyle(p) !== 'repeat' && VK.some(k => vText(p, k))) vw = b; } }
    return Object.assign({}, r, {w, vw, extra: partExtra(p, r)}); });
}
function scriptHTML(p){ const o = scriptParts(p); if (!o.length) return '<h1>Officiant Script</h1><p>Set up the order in The Ceremony first.</p>';
  return `<h1>Officiant Script</h1><p>${H(couple(p))}</p><p><b>${H(dayLine(p))}</b></p><p>About ${svcTotal(p)} minutes.</p>` +
    o.map((r, i) => `<div class="wd-sp"><h2>${i + 1}. ${H(r.name)} <small>(${r.at ? H(r.at) + ', ' : ''}${r.mins} min${r.by ? ', ' + H(r.by) : ''})</small></h2>${holds(r).length ? `<p><b>${H(holds(r).join('; '))}</b></p>` : ''}${paras(fill(r.w, p))}${arr(r.rd).map(x => `<p><b>${H(x.head)}</b></p>${paras(x.text)}${x.source ? `<p style="font-size:8.5pt;font-style:italic">${H(x.source)}</p>` : ''}`).join('')}${r.vw ? `<p><b>The Vows</b></p>${paras(r.vw)}` : ''}${r.extra.map(x => `<p><b>${H(x[0])}</b></p>${paras(x[1])}`).join('')}${r.dos.length ? `<p style="font-size:9pt"><i>For the officiant: ${H(r.dos.join(' '))}</i></p>` : ''}</div>`).join(''); }
function scriptText(p){ return scriptParts(p).map((r, i) => [(i + 1) + '. ' + r.name.toUpperCase() + ' (' + (r.at ? r.at + ', ' : '') + r.mins + ' min' + (r.by ? ', ' + r.by : '') + ')', holds(r).join('; '), fill(r.w, p), ...arr(r.rd).map(x => x.head + '\n' + x.text), r.vw ? 'THE VOWS\n' + r.vw : '', ...r.extra.map(x => x[0].toUpperCase() + '\n' + x[1])].filter(Boolean).join('\n\n')).join('\n\n'); }
const cueText = p => picked(p, 'cues').concat(clean(p.reh.cueNote) ? [p.reh.cueNote] : []);
function outHTML(p, k){
  const sec = (h, x) => x ? `<div class="wd-ps"><h3>${H(h)}</h3>${x}</div>` : '', ln = a => a.filter(Boolean).map(x => `<p>${x}</p>`).join(''), ol = a => a.length ? `<ol>${a.map(x => `<li>${H(x)}</li>`).join('')}</ol>` : '';
  if (k === 'script') return [scriptHTML(p), 'Officiant Script', 'officiant-script'];
  if (k === 'rehearsal'){
    const o = order(p), R = cfg().rehearsal;
    const cues = o.map((r, i) => `<tr><td>${i + 1}</td><td>${H(r.name)}</td><td>${H(r.by || me())}</td><td>${r.mins}</td><td>${H(o[i + 1] ? 'Next: ' + o[i + 1].name + (o[i + 1].by ? ', ' + o[i + 1].by : '') : 'The end: the recessional and the license signing')}</td></tr>`).join('');
    const pos = standers(p).filter(id => posOf(p, id)).map(id => `<tr><td>${H(pName(p, id))}</td><td>${H(VP[id] ? '' : roleName(p, (person(p, id) || {}).role))}</td><td>${H(label(p, 'places', posOf(p, id)))}</td></tr>`).join('');
    return [`<h1>Rehearsal Plan</h1><p>${H(headLine(p))}</p><p><b>${H([nice(p.reh.date), tm(p.reh.time)].filter(Boolean).join(', ') || 'Date to set')}</b>${p.reh.place ? ' · ' + H(p.reh.place) : ''}</p>` +
      `<div class="wd-2c">${arr(R.blocks).map(b => `<div class="wd-ps"><h3>${H(fill(b.h, p))}${b.min ? ` <small>(${b.min} min)</small>` : ''}</h3>${paras(fill(b.t, p))}</div>`).join('')}` +
      sec('Processional, First to Last', ol(procLines(p))) + sec('Recessional, First to Last', ol(recLines(p))) + sec('Cues', cueText(p).length ? ln(cueText(p).map(H)) : '') + `</div>` +
      (pos ? `<h2>Who Stands Where</h2><table class="wd-pt"><tr><th>Who</th><th>Role</th><th>Where</th></tr>${pos}</table>` : '') +
      (o.length ? `<h2>The Ceremony, in Order</h2><table class="wd-pt"><tr><th>#</th><th>Part</th><th>Who</th><th>Min</th><th>Cue</th></tr>${cues}</table>` : ''), 'Rehearsal Plan', 'rehearsal-plan'];
  }
  if (k === 'couple'){
    const o = order(p), fw = picked(p, 'faithway').concat(picked(p, 'tradition')), nx = p.next.filter(x => !x.done), d = p.day, lo = licOpen(p);
    return [`<h1>${H(couple(p))}</h1><p><i>${H(fill(cfg().coupleCopyLead, p))}</i></p><div class="wd-2c">` +
      sec('The Day', ln([H(dayLine(p)), d.arrive ? 'Please arrive by ' + H(tm(d.arrive)) + '.' : '', d.recep ? 'Reception: ' + H(d.recep) : ''])) + sec('The Ceremony Will Be', fw.length ? ln([H(fw.join(', '))]) : '') +
      sec('Order of the Ceremony, About ' + svcTotal(p) + ' Minutes', o.length ? `<ol>${o.map(r => `<li>${H(r.name)}${r.by ? ', ' + H(r.by) : ''}${holds(r).length ? ' <i>(' + H(holds(r).join('; ')) + ')</i>' : ''}</li>`).join('')}</ol>` : '') +
      sec('Processional', ol(procLines(p))) + sec('Recessional', ol(recLines(p))) + sec('Vows', vStyle(p) ? ln([H(picked(p, 'vowstyle').join(''))]) : '') +
      sec('Music by Moment', musicByMoment(p).length ? ln(musicByMoment(p).map(m => '<b>' + H(m.x.title) + '</b>' + (m.x.by ? ', ' + H(m.x.by) : '') + ': ' + H(m.when))) : '') +
      sec(cfg().attire.title || 'What to Wear', ln(attireLines(p).map(H))) + sec('Weather Plan', ln([H(picked(p, 'weather').join(', ')), d.rain ? 'If it rains: ' + H(d.rain) : ''])) +
      sec('Rehearsal', (p.reh.date || p.reh.place) ? ln([H([nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', '))]) : '') +
      sec('The License: Still to Do', lo.length ? `<ul>${lo.map(x => `<li>${H(fill(x.text, p))}</li>`).join('')}</ul>` : '') +
      sec('Next Steps', nx.length ? `<ul>${nx.map(x => `<li>${H(x.t)}</li>`).join('')}</ul>` : '') + sec('Our Next Meeting', (p.nextMt || {}).date ? ln([H([nice(p.nextMt.date), tm(p.nextMt.time), p.nextMt.place].filter(Boolean).join(', '))]) : '') +
      `</div><p>With joy,<br>${H(me())}</p>`, 'Couple Copy', 'couple-copy'];
  }
  if (k === 'party'){ const P = cfg().partySheet, d = p.day, mine = arr(p.people).filter(x => !['photographer', 'coordinator'].includes(x.role));
    return [`<h1>${H(P.title)}</h1><p>${H(headLine(p))}</p><p><i>${H(fill(P.intro, p))}</i></p><div class="wd-2c">` +
      sec('Where and When', ln([p.reh.date || p.reh.place ? '<b>Rehearsal:</b> ' + H([nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', ')) : '', '<b>The day:</b> ' + H(dayLine(p)), d.arrive ? '<b>Arrive by:</b> ' + H(tm(d.arrive)) : ''])) +
      sec('Who Is Who', mine.length ? `<ul>${mine.map(x => `<li>${H(clean(x.name) || 'Someone')}, ${H(roleName(p, x.role))}${posOf(p, x.id) ? ': ' + H(label(p, 'places', posOf(p, x.id))) : ''}</li>`).join('')}</ul>` : '') +
      sec('Processional, First to Last', ol(procLines(p))) + sec('Recessional, First to Last', ol(recLines(p))) + sec('Cues', ln(cueText(p).map(H))) + sec(cfg().attire.title || 'What to Wear', ln(attireLines(p).map(H))) +
      sec('What to Bring', ln([byRole(p, 'ring').length || byRole(p, 'honor1').length ? 'The rings: ' + H(byRole(p, 'ring').concat(byRole(p, 'honor1'), byRole(p, 'honor2')).map(id => pName(p, id)).join(', ')) : '', byRole(p, 'readers').length ? 'Readers: your reading, printed in large type.' : '', 'A phone on silent.'])) +
      sec('Contacts', ln([H(me()) + ', officiant' + (store().me.ph ? ', ' + H(store().me.ph) : ''), clean((p.venue || {}).coord) ? H(p.venue.coord) + ', venue coordinator' + (p.venue.cph ? ', ' + H(p.venue.cph) : '') : ''])) + `</div>`, P.title, 'wedding-party-sheet']; }
  if (k === 'license'){ const L = licItems(), WH = {couple: 'The Couple', officiant: 'The Officiant'};
    return [`<h1>License Checklist</h1><p>${H(headLine(p))}</p><p><i>${H(fill(cfg().license.intro, p))}</i></p>${p.licD.county || p.licD.appt ? `<p>${p.licD.county ? 'County: <b>' + H(p.licD.county) + '</b>' : ''}${p.licD.appt ? ' · Appointment: <b>' + H(nice(p.licD.appt)) + '</b>' : ''}</p>` : ''}
      <ul class="wd-lic2">${L.map(x => `<li><span class="wd-bx">${(p.lic || {})[x.id] ? '&#10003;' : ''}</span><div>${x.who ? '<b>' + H(WH[x.who] || x.who) + ':</b> ' : ''}${H(fill(x.text, p))}${x.confirmed === false ? ' <i>(Check with the County)</i>' : ''}${x.source ? `<br><small><i>Source: ${H(x.source)}${x.link ? ', ' + H(x.link) : ''}</i></small>` : ''}</div></li>`).join('')}</ul>
      <p>Witnesses: ${H(byRole(p, wRole()).map(id => pName(p, id)).join(', ') || 'two to choose')}</p>`, 'License Checklist', 'license-checklist']; }
  if (k === 'venue') return [vpHTML(p), cfg().venuePacket.title, 'venue-coordinator-packet'];
  if (k === 'venueQ') return [vqHTML(p), cfg().venueQuestions.title, 'questions-for-the-venue'];
  return null;
}
const PCSS = `<style>.wd-pt{border-collapse:collapse;width:100%;font-size:9pt;}.wd-pt td,.wd-pt th{border-bottom:.5pt solid #DDD0B8;padding:.6mm 1.5mm;text-align:left;vertical-align:top;}
.wd-2c{columns:2;column-gap:7mm;}.wd-ps{break-inside:avoid;margin:0 0 2.5mm;}.wd-ps h3{margin:0 0 .8mm !important;}.wd-ps p,.wd-ps li{margin:0 0 .6mm !important;}.wd-ps ol,.wd-ps ul{margin:0;padding-left:5mm;}
.wd-sp{break-inside:avoid;margin:0 0 3mm;}.wd-sp h2 small{font-weight:400;}.wd-qs li{margin:0 0 3mm;}.wd-wl{border-bottom:.5pt solid #9C8B76;height:6mm;}
.wd-lic2{list-style:none;padding:0;margin:0;}.wd-lic2 li{display:flex;gap:3mm;margin:0 0 2.5mm;break-inside:avoid;}.wd-bx{flex:none;width:4.5mm;height:4.5mm;border:.6pt solid #2A1C12;text-align:center;line-height:4.5mm;font-size:9pt;}
.wd-pg + .wd-pg{break-before:page;page-break-before:always;}</style>`;
function printOut(k){ const p = plan(); if (!p) return; const r = outHTML(p, k); if (r) sheet(PCSS + r[0], r[1], r[2]); }

// ---------- the Venue Coordinator Packet and the Questions for the Venue ----------
function contactRows(p){
  const m = store().me, v = p.venue || {}, R = [];
  VK.forEach(k => { const o = pc(p, k); if (clean(o.full) || clean(o.called)) R.push([fullOf(p, k), [o.ph, o.em].filter(Boolean).join(', ')]); });
  R.push([me() + ', officiant', [m.ph, m.em].filter(Boolean).join(', ')]);
  if (clean(v.coord)) R.push([v.coord + ', venue coordinator', [v.cph, v.cem].filter(Boolean).join(', ')]);
  arr(p.people).filter(x => ['musicians', 'photographer', 'coordinator'].includes(x.role) && clean(x.name)).forEach(x => R.push([x.name + ', ' + roleName(p, x.role).toLowerCase(), x.ph || '']));
  return R;
}
function vpSecs(p){
  const P = cfg().venuePacket, H2 = id => (arr(P.sections).find(x => x.id === id) || {}).h, out = [], T = timedOrder(p), d = p.day;
  const add = (id, html, text) => { if (H2(id) && (html || text)) out.push([id, H2(id), html, text]); };
  add('order', T.length ? `<table class="wd-pt"><tr><th>#</th><th>Time</th><th>Part</th><th>Who</th><th>Min</th></tr>${T.map((r, i) => `<tr><td>${i + 1}</td><td>${H(r.at)}</td><td><b>${H(r.name)}</b>${holds(r).length ? '<br><i>' + H(holds(r).join('; ')) + '</i>' : ''}</td><td>${H(r.by || me())}</td><td>${r.mins}</td></tr>`).join('')}</table><p>About ${svcTotal(p)} minutes.</p>` : '',
    T.map((r, i) => (i + 1) + '. ' + (r.at ? r.at + ' ' : '') + r.name + (r.by ? ', ' + r.by : '') + ' (' + r.mins + ' min)' + (holds(r).length ? ': ' + holds(r).join('; ') : '')).join('\n'));
  const tl = [p.reh.date || p.reh.place ? 'Rehearsal: ' + [nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', ') : '', d.arrive ? 'The couple arrives: ' + tm(d.arrive) : '', d.time ? 'Ceremony starts: ' + tm(d.time) : '', d.time && svcTotal(p) ? 'Ceremony ends about: ' + clockAdd(d.time, svcTotal(p)) : '', d.recep ? 'Reception: ' + d.recep : ''].filter(Boolean);
  add('timeline', tl.length ? '<ul>' + tl.map(x => `<li>${H(x)}</li>`).join('') + '</ul>' : '', tl.join('\n'));
  const M = musicByMoment(p);
  add('music', M.length ? `<table class="wd-pt"><tr><th>Song</th><th>When</th><th>Who plays or brings it</th></tr>${M.map(m => `<tr><td><b>${H(m.x.title)}</b>${m.x.by ? ', ' + H(m.x.by) : ''}</td><td>${H(m.when)}</td><td>${H(musWho(p, m.x.id) || m.x.lead || 'To confirm')}</td></tr>`).join('')}</table>` : '', M.map(m => m.x.title + (m.x.by ? ', ' + m.x.by : '') + ': ' + m.when + '. ' + (musWho(p, m.x.id) || 'To confirm') + '.').join('\n'));
  const pl = arr(p.people).filter(x => clean(x.name)).map(x => x.name + ', ' + roleName(p, x.role));
  add('people', pl.length || procLines(p).length ? (pl.length ? '<ul>' + pl.map(x => `<li>${H(x)}</li>`).join('') + '</ul>' : '') + (procLines(p).length ? '<p><b>Processional</b></p><ol>' + procLines(p).map(x => `<li>${H(x)}</li>`).join('') + '</ol>' : '') + (recLines(p).length ? '<p><b>Recessional</b></p><ol>' + recLines(p).map(x => `<li>${H(x)}</li>`).join('') + '</ol>' : '') : '',
    pl.join('\n') + (procLines(p).length ? '\nProcessional: ' + procLines(p).join('; ') : '') + (recLines(p).length ? '\nRecessional: ' + recLines(p).join('; ') : ''));
  const su = [picked(p, 'size')[0] ? 'Guests: ' + picked(p, 'size')[0] : '', 'A microphone for the officiant, and one for readers if possible.', 'A small table for the license signing' + (inSvc(p).some(x => x.kind === 'ritual') ? ' and the unity ritual' : '') + '.', (p.venue || {}).setup || ''].filter(Boolean);
  add('setup', '<ul>' + su.map(x => `<li>${H(x)}</li>`).join('') + '</ul>', su.join('\n'));
  const RT = inSvc(p).filter(x => x.kind === 'ritual').map(x => { const r = CER() && CER().pieceOf('ritual', x.id); return x.title + (r && arr(r.needs).length ? ': ' + r.needs.join(', ') : ''); });
  add('rituals', RT.length ? '<ul>' + RT.map(x => `<li>${H(x)}</li>`).join('') + '</ul>' : '', RT.join('\n'));
  const at = attireLines(p); add('attire', at.length ? at.map(x => `<p>${H(x)}</p>`).join('') : '', at.join('\n'));
  const wx = [picked(p, 'weather').join(', '), d.rain ? 'If it rains: ' + d.rain : '', p.tags.weather ? 'The weather call: ' + p.tags.weather : ''].filter(Boolean);
  add('weather', wx.length ? wx.map(x => `<p>${H(x)}</p>`).join('') : '', wx.join('\n'));
  const lw = byRole(p, wRole()).map(id => pName(p, id)); const lt = 'Right after the ceremony, the couple, two witnesses' + (lw.length ? ' (' + lw.join(', ') + ')' : '') + ', and the officiant sign the license. A small table and a pen, please.';
  add('license', `<p>${H(lt)}</p>`, lt);
  const cr = contactRows(p); add('contacts', '<ul>' + cr.map(x => `<li><b>${H(x[0])}</b>${x[1] ? ': ' + H(x[1]) : ''}</li>`).join('') + '</ul>', cr.map(x => x[0] + (x[1] ? ': ' + x[1] : '')).join('\n'));
  add('notes', clean((p.venue || {}).notes) ? paras(p.venue.notes) : '', clean((p.venue || {}).notes));
  return out;
}
function vpHTML(p){ const P = cfg().venuePacket; return `<h1>${H(P.title)}</h1><p>${H(couple(p))}</p><p><b>${H(dayLine(p))}</b></p><p><i>${H(fill(P.intro, p))}</i></p>` + vpSecs(p).map(x => `<div class="wd-ps"><h2>${H(x[1])}</h2>${x[2]}</div>`).join(''); }
function vpText(p){ const P = cfg().venuePacket; return [P.title.toUpperCase(), couple(p), dayLine(p), fill(P.intro, p), ''].concat(vpSecs(p).map(x => x[1].toUpperCase() + '\n' + x[3])).join('\n\n').replace(/\n{3,}/g, '\n\n'); }
function vqHTML(p){ const Q = cfg().venueQuestions, A = p.vq || {};
  return `<h1>${H(Q.title)}</h1><p>${H(couple(p))}</p><p><b>${H(dayLine(p))}</b></p><p><i>${H(fill(Q.intro, p))}</i></p><ol class="wd-qs">${arr(Q.items).map(q => `<li><b>${H(fill(q.q, p))}</b>${q.h ? `<br><small>${H(q.h)}</small>` : ''}${clean(A[q.id]) ? `<p>${H(A[q.id])}</p>` : '<div class="wd-wl"></div><div class="wd-wl"></div>'}</li>`).join('')}</ol><p>${H(me())}${store().me.ph ? ', ' + H(store().me.ph) : ''}${store().me.em ? ', ' + H(store().me.em) : ''}</p>`; }
function vqText(p){ const Q = cfg().venueQuestions, A = p.vq || {}; return arr(Q.items).map((q, i) => (i + 1) + '. ' + fill(q.q, p) + (clean(A[q.id]) ? '\n   ' + A[q.id] : '')).join('\n'); }

// ---------- Send Everything and Couple Approval ----------
function bundleHTML(p){ const ap = lastAppr(p), pg = k => { const r = outHTML(p, k); return r ? `<div class="ht-page wd-pg">${r[0]}</div>` : ''; };
  return PCSS + pg('couple') + pg('script') + pg('rehearsal') + pg('party') + pg('license') + pg('venue') + (ap ? `<p style="margin-top:4mm"><i>${H(apLine(p, ap))}</i></p>` : ''); }
function bundleText(p){ return [coupleText(p), order(p).length ? 'THE CEREMONY, WORD FOR WORD\n' + scriptText(p) : ''].filter(Boolean).join('\n\n'); }
function verOf(p){ const t = bundleText(p); let h = 5381; for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) >>> 0; return h.toString(36).toUpperCase(); }
const lastAppr = p => arr(p.appr)[arr(p.appr).length - 1] || null;
const apLine = (p, a) => W(cfg().approval.done, p).replace('[Who]', a.name).replace('[Date]', nice(a.date)) + ' Version ' + a.ver + '.';
function apStatus(p){ const a = lastAppr(p); if (!a) return {ok: false, t: 'Not approved yet.'}; const cur = a.ver === verOf(p);
  const both = cur ? arr(p.appr).filter(x => x.ver === a.ver).map(x => x.name) : [];
  return {ok: cur, a, t: apLine(p, a) + (a.way === 'reply' ? ' By reply.' : a.typed ? ' Typed name, in Family View.' : ' Tapped in Family View.') + (cur && both.length > 1 ? ' Approved by ' + [...new Set(both)].join(' and ') + '.' : '') + (cur ? '' : ' ' + cfg().approval.changed)}; }
function recordAppr(p, o){ p.appr = arr(p.appr); const text = o.text || bundleText(p), ver = o.ver || verOf(p);
  p.appr.push({id: 'ap' + uid(), way: o.way, name: o.name, typed: !!o.typed, date: o.date || today(), at: Date.now(), ver, text, reply: o.reply || ''}); }
function apBox(p){ const A = cfg().approval, st = apStatus(p);
  return `<div class="wd-apbox" data-wdanc="approve"><h3>${esc(A.title)}</h3>${st.ok ? `<p class="wd-big">&#10003; ${esc(st.t)}</p>` : ''}<p class="wd-big">${esc(W(A.lead, p))}</p>
    <label class="wd-lbl" for="wd-apname">${esc(A.typed)}</label><input type="text" id="wd-apname" class="wd-apin" data-wdapn="1" value="${esc(S.apName || '')}" autocomplete="off" aria-label="${esc(A.typed)}">
    <button type="button" class="wd-apbtn btn btn-gold" data-wda="fam-approve">${esc(A.button)}</button><p class="wd-soft">${esc(nice(today()))}</p></div>`; }
function vApprove(p){ const A = cfg().approval, st = apStatus(p), sent = p.apSent, fresh = sent && sent.ver === verOf(p);
  return blk(p, A.title, 'approval', (A.say ? `<div class="wd-say" style="margin-top:0"><b>Say</b><q>${esc(W(A.say, p))}</q></div>` : '') +
    `<p class="${st.ok ? 'wd-ok' : 'wd-sub'}" role="status" id="wd-apstat">${esc(st.t)}</p>
    <div class="wd-lbl">In Family View</div><p class="wd-sub" style="margin-top:2px">Each of you can approve in the Family View with a typed name or a tap. It is dated and saved with this exact version (${esc(verOf(p))}).</p>
    <div class="row"><button type="button" class="btn ${S.appr ? 'btn-line' : 'btn-gold'} btn-sm" data-wda="appr-show"${fk('aps')}>${S.appr ? 'Hide the Approve Box' : 'Show for Approval in Family View'}</button></div>
    <div class="wd-lbl" style="margin-top:14px">Or Send It to Read at Home</div>
    <div class="row" style="margin-top:4px"><button type="button" class="btn btn-line btn-sm" data-wda="appr-send" data-wdv="copy">Copy</button><button type="button" class="btn btn-line btn-sm" data-wda="appr-send" data-wdv="text">Text It</button><button type="button" class="btn btn-line btn-sm" data-wda="appr-send" data-wdv="email">Email It</button></div>
    ${sent ? `<p class="wd-sub">${fresh ? 'Sent' : 'Last sent'} ${esc(nice(sent.date))}${fresh ? '.' : '. The plan changed since then; send it again.'}</p>` : ''}
    <details class="wd-load"${sent ? ' open' : ''}><summary>Load Their Reply</summary><p class="wd-sub">Paste their reply. It is saved with the exact version they were sent.</p>
      <textarea id="wd-apreply" rows="3" aria-label="Their reply" placeholder="I approve. Sam Larson"></textarea>
      <div class="wd-g2">${fld('apr.name', 'Their full name', (p.apr || {}).name || fullOf(p, 'p1'))}${fld('apr.date', 'Date they replied', (p.apr || {}).date || today(), 'date')}</div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-wda="appr-reply">Record Their Approval</button></div></details>
    ${arr(p.appr).length ? `<details class="wd-custom" style="margin-top:12px"><summary>Approvals (${p.appr.length})</summary><ul class="wd-flist">${p.appr.map(a => `<li><span>${esc(a.name)}, ${esc(nice(a.date))}, ${a.way === 'reply' ? 'by reply' : 'in Family View'}${a.reply ? ': "' + esc(snip(a.reply, 60)) + '"' : ''}</span><span>Version ${esc(a.ver)}</span></li>`).join('')}</ul></details>` : ''}`); }
function vSend(p){ const B = cfg().bundle, P = cfg().venuePacket, Q = cfg().venueQuestions, v = p.venue || {}, A = p.vq || {};
  return `<div class="wd-ocard wd-big1" data-wdanc="bundle"><h4>${esc(B.title)}</h4><p>${esc(W(B.lead, p))}</p><div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="bundle-print">Save or Print the Packet</button><button type="button" class="btn btn-line btn-sm" data-wda="bundle-send" data-wdv="email">Email It</button><button type="button" class="btn btn-line btn-sm" data-wda="bundle-send" data-wdv="text">Text It</button><button type="button" class="btn btn-line btn-sm" data-wda="bundle-send" data-wdv="copy">Copy</button></div>
    <p class="wd-sub">${p.bundleSent ? 'Sent ' + esc(nice(p.bundleSent.date)) + '. ' : ''}Save it as a PDF first, then attach it to the email or text. ${esc(apStatus(p).t)}</p></div>` +
  blk(p, P.title, 'vpacket', `<p class="wd-sub" style="margin-top:0">${esc(W(P.lead, p))}</p>
    <div class="wd-g2">${fld('venue.coord', 'Venue coordinator', v.coord)}${fld('venue.cph', 'Phone', v.cph, 'tel')}${fld('venue.cem', 'Email', v.cem, 'email')}${fld('venue.setup', 'Setup notes', v.setup, 'text', 'An arch at the end of the aisle')}</div>
    <label class="f" for="wd-vnotes">Notes for the Coordinator</label><textarea id="wd-vnotes" rows="2" data-wdi="venue.notes" placeholder="Seats saved in the front row for grandparents">${esc(v.notes || '')}</textarea>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-wda="out" data-wdv="venue">Print or Save the Packet</button><button type="button" class="btn btn-line btn-sm" data-wda="vp-send" data-wdv="email">Email It</button><button type="button" class="btn btn-line btn-sm" data-wda="vp-send" data-wdv="copy">Copy</button></div>${p.vpSent ? `<p class="wd-sub">Sent ${esc(nice(p.vpSent.date))}.</p>` : ''}`) +
  blk(p, Q.title, 'vquestions', `<p class="wd-sub" style="margin-top:0">${esc(W(Q.lead, p))}</p>
    <details class="wd-custom" data-wdkeep="vqOpen"${S.vqOpen ? ' open' : ''}><summary>Their Answers (${arr(Q.items).filter(q => clean(A[q.id])).length} of ${arr(Q.items).length})</summary>${arr(Q.items).map(q => `<div class="wd-fld"><label class="f" for="wd-vq-${esc(q.id)}">${esc(W(q.q, p))}</label><input id="wd-vq-${esc(q.id)}" type="text" data-wdi="vq.${esc(q.id)}" value="${esc(A[q.id] || '')}" autocomplete="off"></div>`).join('')}</details>
    <div class="row" style="margin-top:10px"><button type="button" class="btn btn-gold btn-sm" data-wda="out" data-wdv="venueQ">Print or Save the Questions</button><button type="button" class="btn btn-line btn-sm" data-wda="vq-send" data-wdv="email">Email Them</button><button type="button" class="btn btn-line btn-sm" data-wda="vq-send" data-wdv="copy">Copy</button></div>${p.vqSent ? `<p class="wd-sub">Sent ${esc(nice(p.vqSent.date))}.</p>` : ''}`); }

// ---------- Start a Session: the rehearsal and the ceremony (DATA.ses.list, sessions.js shape) ----------
const DEBRIEF = 'Take five minutes for the After-Session Debrief.';
const sesId = (p, k) => 'wd-' + p.id + '-' + k;
const splitSay = t => String(t || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
function sesGuides(p){
  const out = [], CP = couple(p), cueOf = (L, i) => L[i + 1] ? 'Next cue: ' + L[i + 1].t + (L[i + 1].by ? ', ' + L[i + 1].by : '') + '.' : 'Next cue: the end. Celebrate!';
  const mk = (key, t, steps, purpose, prep) => { const mins = steps.reduce((a, s) => a + (+s.m || 0), 0);
    out.push({id: sesId(p, key), cat: 'ceremony', service: 'officiant', title: CP + ': ' + t, length: 'About ' + mins + ' minutes', purpose, prep: prep || [], bring: ['This plan, printed, as a backup', 'The marriage license and a good pen'],
      steps: steps.map((s, i) => { const o = {t: s.t, m: s.m || 0}; if (s.say && s.say.length) o.say = s.say; o.do = [s.by ? 'Speaking: ' + s.by : 'Speaking: ' + me()].concat(s.do || []); o.tip = cueOf(steps, i); return o; }),
      after: [DEBRIEF], debrief: true}); };
  if (hasSvc(p)){
    const steps = scriptParts(p).map(r => { let say = splitSay(fill(r.w, p)); r.rd.forEach(x => { say = say.concat([x.head], splitSay(x.text)); }); if (r.vw) say = say.concat(splitSay(r.vw)); r.extra.forEach(x => { say = say.concat([x[0]], splitSay(x[1])); });
      return {t: r.name, m: r.mins, by: r.by, say, do: r.dos.concat(r.note ? ['Notes: ' + r.note] : [])}; });
    mk('ceremony', 'The Ceremony', steps, ['The ceremony', dayLine(p)].filter(Boolean).join('. ') + '.', ['Print the Officiant Script as a backup.', 'Check in with the coordinator and the musicians.', 'Have the license and a pen at the signing table.']);
  }
  if (p.reh.date || hasSvc(p)){
    const R = arr(cfg().rehearsal.blocks).map(b => ({t: fill(b.h, p), m: +b.min || 0, say: splitSay(fill(b.t, p))}));
    const at = Math.min(3, R.length); if (procLines(p).length) R.splice(at, 0, {t: 'The Processional, in Order', m: 5, say: procLines(p).map((x, i) => (i + 1) + '. ' + x)});
    if (recLines(p).length) R.splice(Math.min(R.length, at + 2), 0, {t: 'The Recessional, in Order', m: 3, say: recLines(p).map((x, i) => (i + 1) + '. ' + x)});
    const o = order(p); if (o.length) R.push({t: 'The Order, at a Glance', m: 2, say: o.map((r, i) => (i + 1) + '. ' + r.name + (r.by ? ', ' + r.by : ''))});
    mk('rehearsal', 'Rehearsal', R, ['Rehearsal', [nice(p.reh.date), tm(p.reh.time), p.reh.place].filter(Boolean).join(', ')].filter(Boolean).join('. ') + '.', cueText(p).length ? ['Cues: ' + cueText(p).join('; ')] : []);
  }
  return out;
}
function makeSessions(){
  const p = plan(), d = D(); if (!p || !d) return;
  const G = sesGuides(p);
  if (!G.length){ toast('Set up the order in The Ceremony first, or a rehearsal date.'); return; }
  d.ses = d.ses || {list: []}; d.ses.list = d.ses.list || []; d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.ses = d.deleted.ses || {};
  const now = Date.now(), ids = G.map(g => g.id);
  arr(p.ses).filter(id => !ids.includes(id)).forEach(id => { d.ses.list = d.ses.list.filter(x => x.id !== id); d.deleted.ses[id] = now; });
  G.forEach(g => { const i = d.ses.list.findIndex(x => x.id === g.id), rec = {id: g.id, base: null, u: now, made: i < 0 ? now : (d.ses.list[i].made || now), g}; if (i < 0) d.ses.list.push(rec); else d.ses.list[i] = rec; delete d.deleted.ses[g.id]; });
  p.ses = ids; touch(p); rerender(true);
  toast(G.length + (G.length === 1 ? ' session is' : ' sessions are') + ' ready in Start a Session.');
}
function sesList(p){
  const d = D(), L = arr(p.ses).map(id => ((d && d.ses && d.ses.list) || []).find(x => x.id === id)).filter(Boolean);
  return L.length ? `<div class="wd-ses">${L.map(r => `<div class="wd-ses-r"><div><b>${esc(r.g.title)}</b><br><small class="muted">${esc(r.g.length)}, ${(r.g.steps || []).length} steps</small></div><button type="button" class="btn btn-line btn-sm" data-act="start" data-v="${esc(r.id)}">Run It</button></div>`).join('')}</div>` : '';
}

// ---------- Writing Help: the couple's yes, the placeholder map (kept only in this plan), Copy for Writing Help, Paste Finished Pieces ----------
function waOf(p){ if (p.wa && p.wa.ans) return Object.assign({src: 'plan'}, p.wa); const c = p.cli && window.GGCli && GGCli.wa ? GGCli.wa(p.cli) : null; return c && c.ans ? Object.assign({src: 'file'}, c) : null; }
const WA_HOW = [['aloud', 'Said Yes Aloud'], ['text', 'Replied by Text'], ['email', 'Replied by Email']];
function waBlk(p){ const w = waOf(p), H0 = cfg().writingHelp;
  return blk(p, 'Writing Help', 'wa', `<div class="wd-say" style="margin-top:0"><b>Ask</b><q>${esc(H0.ask)}</q></div>
    <div class="wd-chips" role="group" aria-label="Their answer">${[['yes', 'Yes'], ['no', 'No, Thank You']].map(([k, l]) => `<button type="button" class="chip" data-wda="wa" data-wdv="${k}" aria-pressed="${!!(p.wa && p.wa.ans === k)}"${fk('wa|' + k)}>${l}</button>`).join('')}</div>
    <div class="wd-who"><span class="wd-lbl">How</span>${WA_HOW.map(([k, l]) => `<button type="button" class="chip wd-sm" data-wda="wa-how" data-wdv="${k}" aria-pressed="${!!(p.wa && p.wa.how === k)}"${fk('wh|' + k)}>${l}</button>`).join('')}</div>
    ${w ? `<p class="wd-ok" role="status">${w.ans === 'yes' ? 'Yes' : 'No'}${w.how ? ', ' + esc((WA_HOW.find(x => x[0] === w.how) || ['', w.how])[1].toLowerCase()) : ''}, ${esc(nice(w.date))}${w.src === 'file' ? ', from the Client File' : ''}. Saved with the plan.</p>` : ''}`, 'Names become placeholders, and phone numbers, emails, and addresses stay on this device.'); }
const WH_KIND = ['partner1', 'partner2', 'parent', 'attendant', 'reader', 'musician', 'clergy', 'venue', 'coordinator', 'church', 'place', 'city', 'other'];
const WH_ONE = ['partner1', 'partner1Full', 'partner2', 'partner2Full', 'venue', 'coordinator', 'church', 'city'];
const ROLE_KIND = {p1parents: 'parent', p2parents: 'parent', grandparents: 'parent', honor1: 'attendant', honor2: 'attendant', att1: 'attendant', att2: 'attendant', readers: 'reader', musicians: 'musician', coordinator: 'coordinator'};
const whS = p => { p.wh = p.wh || {}; p.wh.own = arr(p.wh.own); p.wh.priv = p.wh.priv || ''; p.wh.want = p.wh.want || {vows1: true, vows2: true, address: true}; return p.wh; };
function placeKind(t){ t = String(t || '').toLowerCase(); return /church|chapel|cathedral|parish|temple|synagogue|mosque|meeting house/.test(t) ? 'church' : 'place'; }
function whMap(p){
  const L = cfg().writingHelp.labels || {}, n = {}, out = [], seen = new Set();
  const lab = k => L[k] || DEF.writingHelp.labels[k] || 'Name';
  const put = (real, k) => { real = clean(real); if (real.length < 2 || seen.has(real.toLowerCase())) return null; seen.add(real.toLowerCase());
    n[k] = (n[k] || 0) + 1; const ph = '[' + lab(k) + (WH_ONE.includes(k) && n[k] === 1 ? '' : ' ' + n[k]) + ']'; out.push({real, ph, kind: k, i: out.length});
    const stem = /^(church|place|venue)$/.test(k) ? real.replace(/\s+(Church|Chapel|Cathedral|Parish|Pavilion|Hall|Gardens|Barn|Center)$/i, '') : real;
    if (stem !== real && /\s|^[A-Z][a-z]{3,}/.test(stem) && !seen.has(stem.toLowerCase())){ seen.add(stem.toLowerCase()); out.push({real: stem, ph, kind: k, i: out.length}); } return ph; };
  const alias = (real, ph, k) => { real = clean(real); if (real.length > 1 && !seen.has(real.toLowerCase())){ seen.add(real.toLowerCase()); out.push({real, ph, kind: k, i: out.length}); } };
  const putName = (full, k) => { full = clean(full); if (!full) return; const ph = put(full, k); const first = full.split(/\s+/)[0]; if (ph && first !== full) alias(first, ph, k); };
  const lastNames = [];
  VK.forEach((k, j) => { const o = pc(p, k), kk = 'partner' + (j + 1), full = clean(o.full), w = full.split(/\s+/).filter(Boolean);
    if (full) put(full, kk + 'Full');
    [clean(o.called), w[0] || ''].forEach(x => alias(x, '[' + lab(kk) + ']', kk));
    if (w.length > 1) lastNames.push(w[w.length - 1]); });
  arr(whS(p).own).forEach(o => { if (clean(o.real)) putName(o.real, WH_KIND.includes(o.kind) ? o.kind : 'other'); });
  arr(p.people).forEach(x => putName(x.name, ROLE_KIND[x.role] || 'other'));
  arr(p.clergy).forEach(c => putName(c.name, 'clergy'));
  const v = p.venue || {}; if (clean(v.coord)) putName(v.coord, 'coordinator');
  if (clean(p.day.place)) put(p.day.place, placeKind(p.day.place) === 'church' ? 'church' : 'venue'); if (clean(v.name) && v.name !== p.day.place) put(v.name, 'venue');
  if (clean(p.day.city)) put(p.day.city, 'city'); if (clean(p.day.recep)) put(p.day.recep, placeKind(p.day.recep)); if (clean(p.reh.place)) put(p.reh.place, placeKind(p.reh.place));
  [...new Set(lastNames)].forEach(l => put(l, 'other'));
  return out.sort((a, b) => b.real.length - a.real.length);
}
const reEsc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function hide(t, M){ let s2 = String(t || ''); M.forEach(m => { s2 = s2.replace(new RegExp('(^|[^\\w\\[])' + reEsc(m.real) + '(?![\\w])', 'gi'), (x, a) => a + m.ph); }); return s2; }
const PHONE = /(\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g, ADDR = /\b\d{1,6}\s+(?:[A-Z0-9][\w.]*\s+){0,4}(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Boulevard|Blvd|Way|Court|Ct|Circle|Cir|Place|Pl|Parkway|Pkwy|Highway|Hwy|Trail|Terrace|NE|NW|SE|SW)\b\.?(?:,?\s*(?:Apt|Unit|Suite|#)\s*\w+)?/g;
function scrub(t, priv){ let s2 = String(t || '').replace(EMAIL, '[left out]').replace(ADDR, '[left out]').replace(PHONE, '[left out]');
  const P = String(priv || '').split(/\n+/).map(x => x.trim()).filter(x => x.length > 1);
  if (P.length) s2 = s2.split('\n').map(line => line.split(/(?<=[.!?])\s+/).filter(sn => !P.some(w => sn.toLowerCase().includes(w.toLowerCase()))).join(' ')).join('\n');
  return s2; }
const MARK = {vows1: 'VOWS PARTNER 1', vows2: 'VOWS PARTNER 2', address: "COUPLE'S STORY", welcome: 'WELCOME', program: 'PROGRAM TEXT', other: 'OTHER'};
function whDetails(p){
  const st = p.story || {}, out = [], w = whS(p), Q = arr(cfg().vowsHelper.prompts);
  out.push('About: ' + P1(p) + ' and ' + P2(p) + (p.day.date ? ', marrying ' + nice(p.day.date) : '') + (picked(p, 'wtype')[0] ? ' (' + picked(p, 'wtype')[0] + ')' : ''));
  const fw = picked(p, 'faithway').concat(picked(p, 'tradition')); if (fw.length) out.push('Faith or plain: ' + fw.join(', ') + '. ' + (plainOf(p) ? 'Use plain words, with no faith language.' : 'Faith words are welcome.'));
  if (picked(p, 'customs').length) out.push('Customs to honor: ' + picked(p, 'customs').join(', '));
  const sn = items(p, 'story').filter(it => clean(st[it.id])).map(it => '- ' + fill(it.t, p) + ': ' + st[it.id]); if (sn.length) out.push('Story notes:\n' + sn.join('\n'));
  if (clean(p.address)) out.push("The couple's story as drafted so far:\n" + p.address);
  VK.forEach((k, j) => { if (!w.want['vows' + (j + 1)]) return; const a = vS(p, k).a, L = Q.filter(q => clean(a[q.id])).map(q => '- ' + fill(q.t, p) + ': ' + a[q.id]);
    if (L.length) out.push(vName(p, k) + "'s answers for the vows:\n" + L.join('\n')); if (vText(p, k)) out.push(vName(p, k) + "'s vows so far:\n" + vText(p, k)); });
  const ord = order(p); if (ord.length) out.push('The ceremony: ' + ord.map(r => r.name + (holds(r).length ? ' (' + holds(r).join('; ') + ')' : '')).join(', ') + '.');
  const pp = arr(p.people).filter(x => clean(x.name)).map(x => x.name + ', ' + roleName(p, x.role)); if (pp.length) out.push('Their people: ' + pp.join('; '));
  const at = attireLines(p); if (at.length) out.push('Attire: ' + at.join(' '));
  if (clean(w.other)) out.push('Other pieces asked for: ' + w.other);
  return out.join('\n\n');
}
function whText(p){
  const H0 = cfg().writingHelp, w = whS(p), M = whMap(p), want = arr(H0.pieces).filter(x => w.want[x.id]), use = want.length ? want : [arr(H0.pieces)[0]];
  const phs = [...new Set(M.map(m => m.ph))];
  return ['WRITING HELP REQUEST', String(H0.header || '').trim(), '', 'WHAT TO WRITE', ...use.map(x => '- ' + x.t.replace(/Partner 1/g, '[Partner 1]').replace(/Partner 2/g, '[Partner 2]') + ': ' + hide(x.ask, M)),
    '', 'PLACEHOLDERS (keep each one exactly as written)', phs.join(', ') || '[Partner 1], [Partner 2]', '', 'RETURN EACH PIECE UNDER ITS OWN MARKER LINE, EXACTLY LIKE THIS:', ...use.map(x => '=== ' + (MARK[x.id] || 'OTHER') + (x.id === 'other' ? ': (the title)' : '') + ' ==='),
    '', 'THE DETAILS', hide(scrub(whDetails(p), w.priv), M)].join('\n');
}
const MRE = new RegExp('^\\s*(?:[=#*>_-]+\\s*)?(' + Object.values(MARK).map(reEsc).join('|') + ')(?:\\s*:\\s*([^=*#]+?))?\\s*(?:[=*#_-]+)?\\s*$', 'i');
function whParse(text){ const out = []; let cur = null; String(text || '').replace(/\r\n?/g, '\n').split('\n').forEach(l => { const m = MRE.exec(l.replace(/’/g, "'"));
  if (m){ const key = Object.keys(MARK).find(k => MARK[k] === m[1].toUpperCase()); cur = {id: key, title: clean(m[2] || ''), t: ''}; out.push(cur); } else if (cur) cur.t += l + '\n'; });
  out.forEach(x => { x.t = x.t.replace(/^\s+|\s+$/g, ''); }); return out.filter(x => x.t); }
function restore(t, M){ let s2 = String(t || ''); const byPh = {}, at = {}; M.forEach(m => { if (at[m.ph] == null || m.i < at[m.ph]){ at[m.ph] = m.i; byPh[m.ph] = m.real; } });
  Object.keys(byPh).sort((a, b) => b.length - a.length).forEach(ph => { s2 = s2.split(ph).join(byPh[ph]); const loose = new RegExp(reEsc(ph).replace(/\\\[/, '\\[\\s*').replace(/\\\]$/, '\\s*\\]'), 'gi'); s2 = s2.replace(loose, byPh[ph]); });
  return s2; }
function whPaste(p, text){
  const parts = whParse(text), M = whMap(p);
  if (!parts.length){ toast('No section markers found. Paste the whole reply, with lines like === VOWS PARTNER 1 ===.'); return null; }
  const prev = {v1: vS(p, 'p1').d, v2: vS(p, 'p2').d, address: p.address || '', welcome: p.welcomeText || '', progText: p.progText || '', wn: arr(p.writings).length}, put = [];
  parts.forEach(x => { const t = restore(x.t, M);
    if (x.id === 'vows1' || x.id === 'vows2'){ const k = x.id === 'vows1' ? 'p1' : 'p2', v = vS(p, k); v.d = t; v.edited = true; put.push(vName(p, k) + "'s Vows"); }
    else if (x.id === 'address'){ p.address = t; put.push("The Couple's Story"); }
    else if (x.id === 'welcome'){ p.welcomeText = t; put.push('Welcome'); }
    else if (x.id === 'program'){ p.progText = t; put.push('Program Text'); }
    else { p.writings = arr(p.writings); p.writings.push({id: uid(), kind: 'writing', name: x.title || 'Other Piece', from: 'Writing Help', body: t, at: Date.now()}); put.push(x.title || 'Other Piece'); } });
  const left = [...new Set((parts.map(x => restore(x.t, M)).join('\n').match(/\[[A-Z][A-Za-z ]{1,30}(?: \d+)?\]/g) || []))].filter(x => !/^\[ask/i.test(x));
  whS(p).last = {at: Date.now(), put, left, prev}; return {put, left};
}
function vWriting(p){
  const H0 = cfg().writingHelp, w = whS(p), M = whMap(p), wa = waOf(p), L = H0.labels || {}, last = w.last;
  const kindSel = `<select id="wd-whkind" aria-label="Kind of name">${WH_KIND.map(k => `<option value="${k}"${(S.whKind || 'other') === k ? ' selected' : ''}>${esc(L[k] || DEF.writingHelp.labels[k] || k)}</option>`).join('')}</select>`;
  return blk(p, 'Writing Help', 'writing', (wa && wa.ans === 'yes' ? '' : `<p class="wd-warn" role="note">${esc(H0.reminder)} <button type="button" class="linkbtn" data-wda="step" data-wdv="1">Go to Welcome the Couple</button></p>`) +
    `<p class="wd-sub" style="margin-top:0">Copy for Writing Help makes a text with names turned into placeholders and contact details left out. Paste it into a chat with your writing assistant, then paste what comes back below. The names come back in on this device only.</p>
    <div class="wd-lbl">What to Write</div><div class="wd-chips">${arr(H0.pieces).map(x => `<button type="button" class="chip wd-sm" data-wda="wh-want" data-wdv="${esc(x.id)}" aria-pressed="${!!w.want[x.id]}"${fk('ww|' + x.id)}>${esc(x.id === 'vows1' ? vName(p, 'p1') + "'s Vows" : x.id === 'vows2' ? vName(p, 'p2') + "'s Vows" : x.t)}</button>`).join('')}</div>
    ${w.want.other ? fld('wh.other', 'Other pieces to ask for', w.other, 'text', 'A blessing for the meal, a toast') : ''}
    <details class="wd-custom" style="margin-top:12px" data-wdanc="wh-map" data-wdkeep="whMap"${S.whMap ? ' open' : ''}><summary>Names and Placeholders (${M.length})</summary><p class="wd-sub">Kept only in this plan, on this device.</p>
      <ul class="wd-flist">${M.map(m => `<li><span>${esc(m.real)}</span><span>${esc(m.ph)}${arr(w.own).some(o => o.real === m.real) ? ` <button type="button" class="linkbtn" data-wda="wh-del" data-wdv="${esc(m.real)}">Remove</button>` : ''}</span></li>`).join('')}</ul>
      <div class="wd-add"><input type="text" id="wd-whreal" placeholder="Another name or place to hide" autocomplete="off" aria-label="Another name or place to hide">${kindSel}<button type="button" class="btn btn-line btn-sm" data-wda="wh-add" data-wdv="">Add</button></div>
      <label class="f" for="wd-whpriv">Keep Private (one word or phrase a line; any sentence with it is left out)</label><textarea id="wd-whpriv" rows="2" data-wdi="wh.priv" placeholder="a past marriage, a family rift">${esc(w.priv)}</textarea></details>
    <div class="row" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-wda="wh-copy">Copy for Writing Help</button><button type="button" class="btn btn-line btn-sm" data-wda="wh-file">Save as a File</button><button type="button" class="btn btn-line btn-sm" data-wda="wh-see" aria-expanded="${!!S.whSee}">${S.whSee ? 'Hide It' : 'See What Goes'}</button></div>
    ${S.whSee ? `<div class="wd-words" id="wd-whtext" style="margin-top:10px;max-height:340px;overflow:auto">${esc(whText(p))}</div>` : ''}
    <div class="wd-lbl" style="margin-top:16px">Paste Finished Pieces</div><p class="wd-sub" style="margin-top:2px">${esc(H0.pasteHelp)}</p>
    <textarea id="wd-whpaste" rows="4" aria-label="Paste the finished pieces" placeholder="=== VOWS PARTNER 1 ===&#10;..."></textarea>
    <div class="row" style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" data-wda="wh-paste">Put Them in Place</button><label class="btn btn-line btn-sm" style="cursor:pointer">Load a File<input type="file" accept=".txt,.md,text/plain,text/markdown" data-wdwh="1" hidden></label>${last && last.prev ? '<button type="button" class="btn btn-line btn-sm" data-wda="wh-undo">Undo the Last Paste</button>' : ''}</div>
    ${last && last.put ? `<p class="wd-ok" role="status">In place: ${esc(last.put.join(', '))}.${last.left && last.left.length ? ' Still in brackets: ' + esc(last.left.join(', ')) + '.' : ''}</p>` : ''}`); }

// ---------- the Finish screen ----------
function finNext(p){ const F = cfg().finish, L = arr(F.next).map(t => ({t: W(t, p)})), st = apStatus(p);
  if (!st.ok) L.unshift({t: 'Couple approval: ' + st.t, go: 10});
  if (licOpen(p).length) L.push({t: 'The license: ' + licOpen(p).length + ' steps still open.', go: 5});
  if (!p.vpSent) L.push({t: 'Send the Venue Coordinator Packet.', go: 11});
  if (!p.vqSent) L.push({t: 'Send the Questions for the Venue.', go: 11});
  if (!arr(p.ses).length) L.push({t: 'Create the live sessions in Start a Session.', go: 11});
  p.next.filter(x => !x.done).forEach(x => L.push({t: x.t}));
  const T = touches(p).find(t => !(p.fu[t.id] || {}).done && t.date); if (T) L.push({t: 'Follow-up: ' + T.title + ', ' + nice(T.date) + '.', go: 12});
  return L; }
function vFinish(p){ const F = cfg().finish, st = apStatus(p);
  return sayBox(p, F.say) + `<div class="wd-fin" data-wdanc="fin-thanks"><p class="wd-read">${esc(W(F.thanks, p))}</p><p>With joy,<br>${esc(me())}</p></div>` +
    blk(p, 'The Packet', 'fin-packet', `<p class="wd-sub" style="margin-top:0">${esc(W(cfg().bundle.lead, p))}</p><div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="bundle-print">Save or Print</button><button type="button" class="btn btn-line btn-sm" data-wda="bundle-send" data-wdv="email">Email It</button><button type="button" class="btn btn-line btn-sm" data-wda="bundle-send" data-wdv="text">Text It</button></div>`) +
    blk(p, cfg().approval.title, 'fin-approval', `<p class="${st.ok ? 'wd-ok' : 'wd-sub'}" style="margin-top:0">${esc(st.t)}</p>${st.ok ? '' : '<div class="row"><button type="button" class="btn btn-line btn-sm" data-wda="step" data-wdv="10">Go to Couple Approval</button></div>'}`) +
    blk(p, 'Next Steps', 'fin-next', `<ul class="wd-flist">${finNext(p).map(x => `<li><span>${esc(x.t)}</span><span>${x.go ? `<button type="button" class="linkbtn" data-wda="step" data-wdv="${x.go}">Step ${x.go}</button>` : ''}</span></li>`).join('')}</ul>`) + gmCard(p) + (window.GGHw && GGHw.atvCard ? GGHw.atvCard(p) : '' /* GWG BLD 782 hook: After the Vows invite (heartwood.js) */); }
function famFinish(p){ const F = cfg().finish;
  return `<div class="wd-fam"><p class="wd-fsub">${esc(couple(p))}</p><h2>${esc(F.familyLine || 'Thank you.')}</h2>` + fsec('Thank You', `<p class="wd-read">${esc(W(F.thanks, p))}</p><p>With joy,<br>${esc(me())}</p>`, 'fin-thanks') +
    fsec('Next Steps', `<ul class="wd-flist">${arr(F.next).map(t => `<li><span>${esc(W(t, p))}</span><span></span></li>`).join('')}</ul>`, 'fin-next') + (S.appr ? apBox(p) : fsec(cfg().approval.title, `<p class="wd-big">${esc(apStatus(p).t)}</p>`, 'fin-approval')) + '</div>'; }

// ---------- the page ----------
const CSS = `
#wd-root{min-width:0;}
/* BLD 769: attire, Polish It, approval, Send Everything, writing help, Finish */
.wd-pol{list-style:none;margin:0 0 8px;padding:0;}.wd-pol li{border-top:1px solid var(--line);}.wd-pol li:first-child{border-top:0;}.wd-pol .wd-ck span{overflow-wrap:anywhere;}
.wd-polread{margin-top:12px;max-height:360px;overflow:auto;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;}
.wd-ok{color:var(--ink);font-weight:600;background:color-mix(in srgb,var(--gold) 12%,transparent);border-radius:10px;padding:8px 12px;overflow-wrap:anywhere;}
.wd-warn{background:color-mix(in srgb,var(--danger) 8%,transparent);border-left:3px solid var(--danger);border-radius:8px;padding:8px 12px;font-weight:600;font-size:15px;margin:0 0 10px;}
.wd-apbox{background:var(--card);border:2px solid var(--gold);border-radius:16px;padding:16px 18px;margin:14px 0;}.wd-apbox h3{margin:0 0 8px;}
.wd-apin{width:100%;font-size:calc(20px * var(--scale));padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);margin:6px 0 10px;}
.wd-apbtn{min-height:52px;font-size:calc(19px * var(--scale));}
.wd-fin{background:var(--bg-deep);border-left:4px solid var(--gold);border-radius:14px;padding:16px 18px;margin:0 0 14px;}.wd-fin p{margin:0 0 8px;}
.wd-big1{margin-bottom:14px;border:1.5px solid var(--gold);}
#wd-root select{max-width:100%;}

#wd-root input[type=time],#wd-root input[type=tel],#wd-root input[type=email]{width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg);font-size:calc(17px * var(--scale));color:var(--ink);font-family:inherit;}
.wd-head{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;justify-content:space-between;margin-top:10px;}
.wd-head h1{overflow-wrap:anywhere;}
.wd-modes{display:flex;flex-wrap:wrap;gap:6px;}
.wd-modes .chip{min-height:44px;}
.wd-lay{display:grid;grid-template-columns:230px minmax(0,1fr);gap:22px;align-items:start;margin-top:14px;}
.wd-rail{position:sticky;top:calc(var(--wd-top,110px) + 8px);min-width:0;}
.wd-rail ol{list-style:none;margin:0;padding:0;}
.wd-rail li button{display:flex;gap:10px;align-items:center;width:100%;text-align:left;background:none;border:0;border-radius:12px;padding:9px 10px;color:var(--ink-soft);font:inherit;font-weight:600;cursor:pointer;min-height:44px;}
.wd-rail li button .n{flex:none;display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--line);font-size:14px;}
.wd-rail li button[aria-current="step"]{background:var(--card);color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--gold);}
.wd-rail li button[aria-current="step"] .n{background:var(--gold);border-color:var(--gold);color:var(--card);}
.wd-sep{border-top:1px dashed var(--line);margin:6px 8px;}
.wd-cbt{margin-top:14px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 14px;}
.wd-cbt h2{font-size:calc(20px * var(--scale));margin:0 0 6px;}
.wd-cbt ul{list-style:none;margin:0;padding:0;}.wd-cbt li button{background:none;border:0;padding:6px 0;text-align:left;color:var(--ink);font:inherit;cursor:pointer;overflow-wrap:anywhere;}
.wd-cbt .empty{color:var(--ink-soft);font-size:15px;margin:0;}
.wd-cbt.mob{display:none;}
@media(max-width:900px){.wd-lay{grid-template-columns:minmax(0,1fr);}.wd-rail{position:static;}.wd-rail ol{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;}.wd-rail li{flex:none;}.wd-rail li button{white-space:nowrap;}.wd-sep{display:none;}.wd-rail .wd-cbt{display:none;}.wd-cbt.mob{display:block;}}
.wd-kick{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);font-size:14px;}
.wd-say{background:var(--bg-deep);border-left:4px solid var(--gold);border-radius:12px;padding:14px 16px;margin:10px 0 14px;font-size:calc(21px * var(--scale));line-height:1.4;}
.wd-say b{display:block;font-family:'Barlow Condensed',sans-serif;letter-spacing:1.5px;text-transform:uppercase;font-size:13px;color:var(--gold);}
.wd-say q{quotes:none;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;}
.wd-blk{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:0 0 14px;min-width:0;}
.wd-blk-h{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;}
.wd-blk-h h3,.wd-blk-h h4{margin:0;overflow-wrap:anywhere;}
.wd-sub{color:var(--ink-soft);font-size:15px;margin:6px 0 10px;}
.wd-chips{display:flex;flex-wrap:wrap;gap:8px;}
.wd-chips .chip{min-height:48px;font-size:calc(17px * var(--scale));padding:10px 18px;}
.chip.wd-sm{min-height:40px;padding:7px 12px;font-size:14px;}
.wd-star{background:none;border:1px solid var(--line);border-radius:20px;padding:6px 12px;color:var(--ink-soft);font:inherit;font-size:14px;font-weight:600;cursor:pointer;min-height:40px;}
.wd-star[aria-pressed="true"]{color:var(--gold);border-color:var(--gold);}
.wd-who{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:10px;}
.wd-lbl{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink-soft);margin-right:4px;}
.wd-other{display:flex;gap:6px;align-items:center;flex:1 1 220px;min-width:0;}.wd-other input{min-width:0;}
.wd-add{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}.wd-add input{flex:1 1 200px;min-width:0;}
.wd-note{margin-top:4px;}.wd-note textarea{min-height:70px;}
.wd-tidy{margin-top:6px;background:none;border:1px dashed var(--line);border-radius:20px;padding:6px 12px;color:var(--ink-soft);font:inherit;font-size:14px;font-weight:600;cursor:pointer;min-height:40px;}
.wd-tidy[aria-pressed="true"]{border-style:solid;border-color:var(--gold);color:var(--gold);}
.wd-custom{margin:0 0 12px;border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--card);}
.wd-custom summary,.wd-load summary{cursor:pointer;font-weight:600;min-height:32px;}
.wd-custom textarea{margin-top:8px;min-height:80px;}
.wd-load{margin:0 0 14px;border:1.5px dashed var(--gold);border-radius:14px;padding:10px 14px;}
.wd-load textarea{min-height:80px;}
.wd-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;}
.wd-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 14px;}
@media(max-width:700px){.wd-g2,.wd-g3{grid-template-columns:minmax(0,1fr);}}
.wd-fld{min-width:0;}
.wd-prompts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
@media(max-width:700px){.wd-prompts{grid-template-columns:minmax(0,1fr);}}
.wd-pcard{display:flex;flex-direction:column;gap:6px;min-width:0;}.wd-pcard .chip{align-self:flex-start;min-height:44px;}
.wd-pcard small{color:var(--ink-soft);font-size:14px;}.wd-pcard textarea{min-height:64px;}
.wd-draft{margin-top:12px;}.wd-draft textarea{margin-top:8px;}
.wd-share{display:grid;grid-template-columns:150px minmax(0,1fr);gap:14px;margin-top:12px;border:1px solid var(--line);border-radius:14px;padding:12px;background:var(--bg);}
.wd-qr svg{width:150px;height:150px;display:block;background:#fff;border-radius:8px;}
.wd-share h4{margin:0 0 6px;}.wd-share-m{min-width:0;}
@media(max-width:560px){.wd-share{grid-template-columns:minmax(0,1fr);}.wd-qr svg{margin:0 auto;}}
.wd-words{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:16px;}
.wd-wr{border-top:1px solid var(--line);padding:8px 0;}.wd-wr summary{cursor:pointer;}
.wd-lines{display:flex;flex-direction:column;gap:8px;}
.wd-line{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,120px) auto;gap:8px;align-items:center;}
@media(max-width:560px){.wd-line{grid-template-columns:minmax(0,1fr) minmax(0,90px);}.wd-line .btn{grid-column:1 / -1;justify-self:start;}}
.wd-gath{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:12px 16px;margin:0 0 12px;}
.wd-svc{display:flex;flex-direction:column;gap:8px;}
.wd-srow{display:grid;grid-template-columns:minmax(0,1.3fr) 90px minmax(0,1fr) minmax(0,1fr) auto;gap:8px;align-items:end;border-top:1px solid var(--line);padding-top:8px;}
.wd-srow:first-child{border-top:0;}
.wd-snm{align-self:center;min-width:0;}.wd-snm b{display:block;overflow-wrap:anywhere;}.wd-snm small{color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.wd-mini{display:flex;flex-direction:column;gap:2px;min-width:0;}.wd-mini span{font-size:12px;color:var(--ink-soft);font-weight:600;}
.wd-mini input,.wd-mini select{padding:8px 10px;}
.wd-mv{display:flex;gap:4px;flex-wrap:wrap;}.wd-mv .btn{min-width:44px;padding:8px 10px;}
@media(max-width:860px){.wd-srow{grid-template-columns:minmax(0,1fr) 90px;}.wd-snm{grid-column:1 / -1;}.wd-lead,.wd-ch{grid-column:1 / -1;}.wd-mv{grid-column:1 / -1;}}
.wd-total{display:flex;justify-content:space-between;margin-top:12px;padding:10px 12px;background:var(--bg-deep);border-radius:10px;font-weight:600;}
.wd-task{border-top:1px solid var(--line);padding:10px 0;}.wd-task:first-child{border-top:0;}
.wd-task.done b,.wd-task.done span{color:var(--ink-soft);}
.wd-ck{display:flex;gap:12px;align-items:center;cursor:pointer;min-height:44px;font-size:calc(18px * var(--scale));}
.wd-ck input{width:28px;height:28px;flex:none;accent-color:var(--gold);}
.wd-td{margin-top:6px;}
.wd-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:14px;}
@media(max-width:700px){.wd-cards{grid-template-columns:minmax(0,1fr);}}
.wd-ocard{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;min-width:0;}.wd-ocard h4{margin:0 0 4px;}.wd-ocard p{color:var(--ink-soft);font-size:15px;margin:0 0 10px;}
.wd-ses{margin-top:12px;}.wd-ses-r{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:10px 0;}
.wd-tl{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
.wd-fu{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:0;}
.wd-fu summary{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 16px;cursor:pointer;min-height:48px;}
.wd-fu .wd-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--gold);flex:none;}
.wd-fu.done .wd-dot{background:var(--gold);}
.wd-when{margin-left:auto;color:var(--ink-soft);font-size:15px;}
.wd-fu-in{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:0 16px 16px;}
@media(max-width:760px){.wd-fu-in{grid-template-columns:minmax(0,1fr);}}
.wd-box{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;min-width:0;}.wd-box h4{margin:0 0 6px;}.wd-box p{margin:2px 0 8px;}.wd-box ul{margin:2px 0 8px;padding-left:20px;}
.wd-full{grid-column:1 / -1;}
.wd-crisis{margin-top:8px;padding:8px 10px;border-left:3px solid var(--danger);background:color-mix(in srgb,var(--danger) 8%,transparent);border-radius:8px;font-weight:600;font-size:15px;}
.wd-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px;flex-wrap:wrap;}
.wd-phone{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 20px;}
.wd-ph-h{color:var(--ink-soft);font-weight:600;margin-bottom:8px;}
.wd-phone ol{margin:0;padding-left:22px;}.wd-phone li{margin:0 0 14px;}.wd-phone h3{margin:0 0 4px;}.wd-phone p{font-size:calc(21px * var(--scale));line-height:1.45;margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;}
.wd-famwrap{background:var(--bg-deep);border-radius:18px;padding:18px;}
.wd-fam h2{font-size:calc(34px * var(--scale));margin:.1em 0 .4em;}
.wd-fsub{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:0;font-size:14px;}
.wd-fsec{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 18px;margin:0 0 12px;}
.wd-fsec h3{margin:0 0 8px;}
.wd-fchips{display:flex;flex-wrap:wrap;gap:8px;}.wd-fchip{border:1.5px solid var(--line);border-radius:30px;padding:8px 16px;color:var(--ink-soft);font-size:calc(18px * var(--scale));}
.wd-fchip.on{background:var(--umber);border-color:var(--umber);color:#F4EBDA;font-weight:600;}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .wd-fchip.on{background:var(--gold);border-color:var(--gold);color:#1A130D;}}:root[data-theme="dark"] .wd-fchip.on{background:var(--gold);border-color:var(--gold);color:#1A130D;}
.wd-flist{list-style:none;margin:0;padding:0;}.wd-flist li{display:flex;justify-content:space-between;gap:14px;border-top:1px solid var(--line);padding:8px 0;font-size:calc(18px * var(--scale));}.wd-flist li:first-child{border-top:0;}
.wd-flist li span:last-child{color:var(--ink-soft);text-align:right;}
.wd-big{font-size:calc(20px * var(--scale));margin:0;}.wd-soft{color:var(--ink-soft);font-size:.8em;}
.wd-inline{background:var(--bg-deep);border-radius:16px;padding:14px;margin-bottom:14px;}
.wd-list-r{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:12px 0;}.wd-list-r:first-child{border-top:0;}
.wd-list-r .m{min-width:0;flex:1 1 220px;}.wd-list-r b{overflow-wrap:anywhere;}
.wd-home .wd-list-r{padding:8px 0;}
/* BLD 768: the helpers in the session, Readings, Music, and Rituals, Follow My Scroll */
.wd-helper{margin-top:12px;border:1.5px solid var(--gold);border-radius:14px;padding:12px 14px;background:var(--bg);}
.wd-secnav{margin:4px 0 10px;}.wd-secnav .chip{min-height:44px;font-size:calc(16px * var(--scale));}.wd-n{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1.5px solid currentColor;font-size:12px;margin-right:4px;}
.wd-q textarea{min-height:90px;font-size:calc(18px * var(--scale));}.wd-q input{font-size:calc(18px * var(--scale));}
.wd-bigta{min-height:300px;font-size:calc(18px * var(--scale));line-height:1.5;}
.wd-ref{margin:8px 0 0;padding-left:20px;}.wd-ref li{margin:0 0 6px;overflow-wrap:anywhere;}
.wd-lbt{margin-bottom:6px;}.wd-lbt .chip{min-height:44px;}
.wd-lbf{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:0 12px;}@media(max-width:700px){.wd-lbf{grid-template-columns:minmax(0,1fr);}}
.wd-lbf select{width:100%;}
.wd-place{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--bg-deep);}
.wd-lbl-list{margin-top:12px;}
.wd-lbr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:start;border-top:1px solid var(--line);padding:10px 0;}.wd-lbr:first-child{border-top:0;}
.wd-lbr.on .wd-lbm b{color:var(--gold);}
.wd-lbm{min-width:0;}.wd-lbm b{overflow-wrap:anywhere;font-size:calc(17px * var(--scale));}.wd-lbm small{color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.wd-lbb{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;}
@media(max-width:560px){.wd-lbr{grid-template-columns:minmax(0,1fr);}.wd-lbb{justify-content:flex-start;}}
.wd-prev{grid-column:1 / -1;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;min-width:0;}
.wd-prev ol,.wd-prev ul{margin:4px 0 8px;padding-left:20px;}.wd-prev p{margin:2px 0 8px;overflow-wrap:anywhere;}
.wd-read{white-space:pre-wrap;font-family:'Cormorant Garamond',Georgia,serif;font-size:calc(19px * var(--scale));line-height:1.5;overflow-wrap:anywhere;}
.wd-src{font-style:italic;color:var(--ink-soft);font-size:14px;overflow-wrap:anywhere;}
.wd-note2{background:color-mix(in srgb,var(--gold) 12%,transparent);border-radius:8px;padding:8px 10px;}
.wd-tag{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:12px;background:color-mix(in srgb,var(--gold) 16%,transparent);color:var(--gold);vertical-align:middle;}
.wd-tag.on{background:var(--gold);color:var(--card);}
.wd-chosen{margin-bottom:12px;padding:10px 12px;border-radius:12px;background:var(--bg-deep);}.wd-chosen .wd-flist li span:first-child{min-width:0;overflow-wrap:anywhere;}.wd-chosen .wd-flist li span:last-child{white-space:nowrap;}
.wd-flist li.wd-cur{background:color-mix(in srgb,var(--gold) 16%,transparent);border-radius:10px;padding-left:10px;padding-right:10px;}
.wd-fam .wd-prev{background:var(--card);}.wd-ans{overflow-wrap:anywhere;}
.wd-scan{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);display:grid;place-items:center;padding:16px;}
.wd-scan-in{background:var(--card);border-radius:16px;padding:14px;max-width:420px;width:100%;text-align:center;}.wd-scan video{width:100%;border-radius:10px;background:#000;}

.wd-lic{list-style:none;margin:8px 0 0;padding:0;}.wd-lic li{border-top:1px solid var(--line);padding:6px 0;}.wd-lic li:first-child{border-top:0;}.wd-lic .wd-ck span{overflow-wrap:anywhere;}
.wd-tag.wd-warn2{background:color-mix(in srgb,var(--danger) 12%,transparent);color:var(--danger);margin-left:40px;}
.wd-plist{margin:6px 0 0;padding-left:22px;}.wd-plist li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,220px) auto;gap:8px;align-items:end;border-top:1px solid var(--line);padding:8px 0;}.wd-plist li:first-child{border-top:0;}
.wd-pn{align-self:center;min-width:0;overflow-wrap:anywhere;}
.wd-proc{margin-top:14px;}.wd-proc .wd-add select{flex:1 1 200px;min-width:0;}
.wd-pline{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1.2fr) minmax(0,1fr) auto;gap:8px;align-items:center;}
.wd-olist{margin:0;padding-left:1.4em;}.wd-olist li{padding:4px 0;font-size:calc(18px * var(--scale));}
@media(max-width:760px){.wd-plist li{grid-template-columns:minmax(0,1fr);}.wd-pline{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.wd-pline .btn{justify-self:start;}}
#wd-root select{max-width:100%;}
`;
(function(){ const s = document.createElement('style'); s.id = 'wd-css'; s.textContent = CSS; document.head.appendChild(s); })();
function rail(p){
  const nt = cfg().steps.filter(s => p.tidy[s.id] && (p.notes[s.id] || '').trim()).length;
  return `<ol>${cfg().steps.map((s, i) => `${i === 9 ? '<li aria-hidden="true"><div class="wd-sep"></div></li>' : ''}<li><button type="button" data-wda="step" data-wdv="${i + 1}"${S.step === i + 1 ? ' aria-current="step"' : ''}${fk('rs|' + (i + 1))}><span class="n">${i + 1}</span><span>${esc(s.title)}</span></button></li>`).join('')}
    <li><button type="button" data-wda="step" data-wdv="tidy"${S.step === 'tidy' ? ' aria-current="step"' : ''}${fk('rs|tidy')}><span class="n">&#10003;</span><span>Tidy Up${nt ? ' (' + nt + ')' : ''}</span></button></li>
    <li><button type="button" data-wda="step" data-wdv="finish"${S.step === 'finish' ? ' aria-current="step"' : ''}${fk('rs|finish')}><span class="n">&#9825;</span><span>${esc(cfg().finish.title || 'Finish')}</span></button></li></ol>
    <div class="wd-cbt">${cbt(p)}</div>`;
}
function cbt(p){
  const ks = Object.keys(p.stars);
  return `<h2>Come Back To This</h2>${ks.length ? `<ul>${ks.map(k => `<li><button type="button" data-wda="step" data-wdv="${p.stars[k].step}">&#9733; ${esc(p.stars[k].label)} <span class="muted">(Step ${p.stars[k].step})</span></button></li>`).join('')}</ul>` : '<p class="empty">Tap a star on any step to save it here.</p>'}`;
}
function vPlan(p){
  const n = S.step, st = typeof n === 'number' ? STEP(n) : {title: n === 'finish' ? (cfg().finish.title || 'Finish') : 'Tidy Up'}, mode = S.mode;
  let body;
  if (n === 'tidy') body = vTidy(p);
  else if (n === 'finish' && mode === 'chris') body = vFinish(p);
  else if (mode === 'family') body = `<div class="wd-famwrap">${famBody(p)}</div>`;
  else if (mode === 'phone') body = vPhone(p);
  else if (n === 8 && S.sub) body = vHelper(p, S.sub);
  else body = V[n](p);
  const pm = p.pm && arr(((D() || {}).pm || {}).couples).some(c => c.id === p.pm);
  return `<button type="button" class="linkbtn" data-wda="plans">&larr; All Wedding Plans</button>
  <div class="wd-head"><div style="min-width:0"><div class="eyebrow">Wedding Planning Session</div><h1>${esc(pTitle(p))}</h1>${dayLine(p) ? `<p class="muted">${esc(dayLine(p))}</p>` : ''}<div class="row" style="gap:12px">${p.cli && window.GGCli ? GGCli.link(p.cli) : ''}${pm ? '<button type="button" class="linkbtn" data-wda="gm-open">The Grounded Marriage</button>' : ''}</div></div>
    <div class="wd-modes" role="group" aria-label="View">${[['chris', me() + "'s View"], ['family', 'Family View Here'], ['phone', 'Phone Mode']].map(([k, l]) => `<button type="button" class="chip" data-wda="mode" data-wdv="${k}" aria-pressed="${mode === k}"${fk('md|' + k)}>${esc(l)}</button>`).join('')}<button type="button" class="btn btn-gold btn-sm" data-wda="famwin">Open Family View Window</button><button type="button" class="chip" data-wda="follow" aria-pressed="${!!S.follow}"${fk('fl')} title="The Family View Window follows your place on the page">Follow My Scroll</button></div></div>
  <div class="wd-lay"><nav class="wd-rail" aria-label="Steps">${rail(p)}</nav>
  <div id="wd-main" style="min-width:0"><div class="wd-kick">${typeof n === 'number' ? 'Step ' + n + ' of ' + CNT : n === 'finish' ? 'All Done' : 'After the Meeting'}${n === 8 && S.sub ? ' &middot; Vows Helper' : ''}${mode === 'family' && n !== 'tidy' ? ' &middot; Family View' : mode === 'phone' && n !== 'tidy' ? ' &middot; Phone Mode' : ''}${curMeet(p) ? ' &middot; Meeting of ' + esc(short(today())) : ''}</div><h2 style="margin:2px 0 6px">${esc(n === 8 && S.sub ? vName(p, S.sub) + "'s Vows" : st.title)}</h2>
    ${mode === 'family' && n !== 'tidy' ? '<p class="wd-sub">This is what the couple sees. For a call, open the Family View Window and share that window by itself on Zoom, Teams, or FaceTime. It follows your taps.</p>' : ''}
    ${body}
    <div class="wd-cbt mob" style="margin-top:16px">${cbt(p)}</div>
    ${n === 8 && S.sub && mode === 'chris' ? '' : `<div class="wd-nav"><button type="button" class="btn btn-line" data-wda="nav" data-wdv="-1"${n === 1 ? ' disabled' : ''}${fk('nb')}>&larr; Back</button>${n === 'finish' ? '<button type="button" class="btn btn-gold" data-wda="plans">All Wedding Plans</button>' : `<button type="button" class="btn btn-gold" data-wda="nav" data-wdv="1"${fk('nn')}>${n === CNT ? 'Tidy Up' : n === 'tidy' ? esc(cfg().finish.title || 'Finish') : 'Next'} &rarr;</button>`}</div>`}</div></div>`;
}
function vList(){
  const L = plans().slice().sort((a, b) => (b.u || 0) - (a.u || 0)), due = dueSoon();
  return `<button type="button" class="linkbtn" data-wda="close">&larr; Service Builder</button>
  <div class="page-head" style="margin-top:10px"><div class="eyebrow">Ceremonies</div><h1>Wedding Planning Session</h1><p>Plan a wedding, an elopement, or a vow renewal with the couple, live together or by phone, across as many meetings as it takes. Tap more than you type, and keep your eyes on them.</p></div>
  <div class="card"><div class="row"><button type="button" class="btn btn-gold" data-wda="new">Start a New Plan</button></div>
    <p class="muted" style="font-size:15px;margin-top:10px">Plans stay on this device, encrypted with your records, and travel in your backups.</p></div>
  ${due.length ? `<div class="card"><h3>Follow-Ups Due This Week</h3>${due.map(x => `<div class="wd-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">${esc(couple(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}</small></div><button type="button" class="btn btn-line btn-sm" data-wda="fu-open" data-wdv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('')}</div>` : ''}
  <div class="card"><h2 style="margin-bottom:4px">Plans</h2>${L.length ? L.map(p => `<div class="wd-list-r"><div class="m"><b>${esc(pTitle(p))}</b><br><small class="muted">${esc([wDate(p) ? 'Wedding ' + nice(wDate(p)) : 'Started ' + nice(p.made), arr(p.mt).length ? arr(p.mt).length + (arr(p.mt).length === 1 ? ' meeting' : ' meetings') : '', (p.nextMt || {}).date ? 'Next meeting ' + nice(p.nextMt.date) : ''].filter(Boolean).join(' · '))}</small></div>
    <div class="row"><button type="button" class="btn btn-gold btn-sm" data-wda="open" data-wdv="${esc(p.id)}">Open</button><button type="button" class="btn btn-line btn-sm" data-wda="del" data-wdv="${esc(p.id)}">Delete</button></div></div>`).join('') : '<p class="muted">Plans you start show here, one for each couple.</p>'}</div>
  <div class="card"><h3>Your Contact for the Couple</h3><p class="muted" style="font-size:15px">Optional. These print on the Questions for the Venue and the Wedding Party Sheet.</p>
    <div class="wd-g2">${fld('me.em', 'Your email', store().me.em, 'email')}${fld('me.ph', 'Your mobile number', store().me.ph, 'tel')}</div></div>`;
}
function view(){ setTimeout(headTop, 0); const p = plan(); return `<div id="wd-root">${S.id && p ? vPlan(p) : vList()}</div>`; }
function headTop(){ const h = document.querySelector('header.bar'), r = document.getElementById('wd-root'); if (h && r) r.style.setProperty('--wd-top', h.offsetHeight + 'px'); }
function rerender(keepScroll){
  const r = document.getElementById('wd-root'); if (!r){ if (C.render) C.render(); return; }
  const ae = document.activeElement, k = ae && ae.getAttribute && ae.getAttribute('data-fk'), y = window.scrollY;
  r.outerHTML = view(); if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (k){ const el = document.querySelector('#wd-root [data-fk="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"]'); if (el) try { el.focus({preventScroll: true}); } catch (e) {} }
  pushFam();
}
function goStep(n){ S.step = n; S.other = null; S.sub = null; const p = plan(), m = p && curMeet(p); if (m && typeof n === 'number' && !arr(m.steps).includes(n)){ m.steps = arr(m.steps).concat(n); C.save && C.save(); }
  rerender(false); if (window.matchMedia && matchMedia('(max-width: 900px)').matches){ const c = document.querySelector('.wd-rail [aria-current="step"]'); if (c && c.scrollIntoView) c.scrollIntoView({block: 'nearest', inline: 'center'}); } }
function openPlan(id, step){ if (window.GGFw && GGFw.state) GGFw.state.on = false; S.on = true; S.id = id; S.step = step || 1; S.mode = 'chris'; S.other = null; S.sub = null; S.vSec = 0; S.lb.open = null; if (C.go) C.go('ceremonies'); }

// ---------- actions ----------
function setPath(o, path, v){
  const ks = path.split('.'); let x = o;
  for (let i = 0; i < ks.length - 1; i++){ const k = ks[i]; if (x[k] == null) x[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
function findPiece(p, key){ const i = key.indexOf('|'), k = key.slice(0, i), id = key.slice(i + 1); const c = cerBind(); return c ? {k, id, x: c.pieceOf(k, id)} : {k, id, x: null}; }
function lbRedraw(p){ const l = document.getElementById('wd-lb-list'); if (l) l.innerHTML = lbRows(p); pushFam(); }
function addOwnItem(p, id, t){
  t = String(t || '').trim(); if (!t) return false;
  if (id === 'clergy'){ p.clergy = arr(p.clergy); p.clergy.push({name: t, role: ''}); return true; }
  if (id === 'tasks'){ p.tasks.push({id: 'own_' + uid(), t, who: '', done: false, d: ''}); return true; }
  if (id === 'next'){ p.next.push({t, done: false}); return true; }
  if (id === 'svcpart'){ if (hasSvc(p)) CER().add(p.svc, t); return true; }
  const it = {id: 'own_' + uid(), t}; (p.own[id] = p.own[id] || []).push(it);
  if (id === 'places') return true;
  const single = !!list(id).single; if (single) p.sel[id] = [it.id]; else (p.sel[id] = p.sel[id] || []).push(it.id);
  return true;
}
function gmLink(p){ const L = arr(((D() || {}).pm || {}).couples); return p.pm && L.some(c => c.id === p.pm) ? p.pm : null; }
function act(a, v, el){
  const p = plan();
  switch (a){
    case 'close': S.on = false; S.id = null; if (C.go) C.go('ceremonies'); return;
    case 'plans-open': if (window.GGFw && GGFw.state) GGFw.state.on = false; S.on = true; S.id = null; if (C.go) C.go('ceremonies'); return;
    case 'plans': S.id = null; S.on = true; rerender(false); return;
    case 'new': { const n = newPlan(); plans().push(n); const d = D(); if (d && d.deleted && d.deleted.wdp) delete d.deleted.wdp[n.id]; startMeet(n); touch(n); S.id = n.id; S.step = 1; S.mode = 'chris'; S.sub = null; rerender(false); return; }
    case 'open': openPlan(v, el && el.closest('#cer-root') ? 6 : 1); return;
    case 'del': { const x = plans().find(q => q.id === v); if (!x || !confirm('Delete the plan for ' + pTitle(x) + '? Its sessions in Start a Session stay until you delete them.')) return;
      const d = D(); d.wdp.plans = plans().filter(q => q.id !== v); d.deleted = d.deleted || {clients: {}, sessions: {}}; d.deleted.wdp = d.deleted.wdp || {}; d.deleted.wdp[v] = Date.now(); C.save(); rerender(true); return; }
    case 'fu-open': { const [pid, tid] = v.split('|'); S.fuOpen = tid; openPlan(pid, 12); return; }
  }
  if (!p) return;
  switch (a){
    case 'step': goStep(v === 'tidy' || v === 'finish' ? v : +v); return;
    case 'nav': { const n = S.step === 'tidy' ? CNT + 1 : S.step === 'finish' ? CNT + 2 : S.step, m = n + (+v); if (m < 1) return; goStep(m > CNT + 1 ? 'finish' : m > CNT ? 'tidy' : m); return; }
    case 'mode': S.mode = v; rerender(true); return;
    case 'famwin': openFam(); return;
    case 'follow': S.follow = !S.follow; rerender(true); if (S.follow) syncFam(); toast(S.follow ? 'The Family View Window follows your scroll.' : 'The Family View Window stays where it is.'); return;
    case 'chip': { const i = v.indexOf('|'), id = v.slice(0, i), val = v.slice(i + 1), single = !!list(id).single || (el && el.dataset.wds === '1'); const cur = p.sel[id] = arr(p.sel[id]);
      if (single) p.sel[id] = cur.includes(val) ? [] : [val]; else p.sel[id] = cur.includes(val) ? cur.filter(x => x !== val) : cur.concat(val);
      if (id === 'wtype' && hasSvc(p)){ const c = CER(); c.sync(p.svc, Object.assign(svcSync(p), {type: svcType(p)})); }
      if (id === 'faithway' && hasSvc(p)) CER().sync(p.svc, svcSync(p));
      touch(p); rerender(true); return; }
    case 'own': { const inp = document.querySelector(`#wd-root [data-wdown="${v}"]`); if (inp && addOwnItem(p, v, inp.value)){ touch(p); rerender(true); const n = document.querySelector(`#wd-root [data-wdown="${v}"]`); if (n) n.focus(); } return; }
    case 'tidy': p.tidy[v] = !p.tidy[v]; touch(p); rerender(true); return;
    case 'star': if (p.stars[v]) delete p.stars[v]; else p.stars[v] = {label: (el && el.dataset.wdl) || v, step: typeof S.step === 'number' ? S.step : 1}; touch(p); rerender(true); return;
    case 'tag': { const i = v.indexOf('|'), key = v.slice(0, i), w = v.slice(i + 1); S.other = null;
      if (key.startsWith('task.')){ const t = p.tasks[+key.slice(5)]; if (t) t.who = t.who === w ? '' : w; } else { if (p.tags[key] === w) delete p.tags[key]; else p.tags[key] = w; }
      touch(p); rerender(true); return; }
    case 'tagother': S.other = S.other === v ? null : v; rerender(true); setTimeout(() => { const i = document.querySelector(`#wd-root [data-wdtag="${v}"]`); if (i) i.focus(); }, 0); return;
    case 'tagset': { const i = document.querySelector(`#wd-root [data-wdtag="${v}"]`), w = i ? i.value.trim() : ''; if (!w) return; S.other = null;
      if (v.startsWith('task.')){ const t = p.tasks[+v.slice(5)]; if (t) t.who = w; } else p.tags[v] = w; touch(p); rerender(true); return; }
    case 'cl-del': p.clergy.splice(+v, 1); touch(p); rerender(true); return;
    case 'next-del': p.next.splice(+v, 1); touch(p); rerender(true); return;
    case 'meet-start': if (startMeet(p)){ const m = curMeet(p); if (typeof S.step === 'number') m.steps = [S.step]; touch(p); toast("Today's meeting is started. The Since Last Time list follows it."); } rerender(true); return;
    // The people and the processional
    case 'pp-add': { const inp = document.getElementById('wd-pnew'), nm = inp ? inp.value.trim() : ''; p.people = arr(p.people); p.people.push({id: 'pp' + uid(), name: nm, role: v, ph: ''}); touch(p); rerender(true); const n = document.getElementById('wd-pnew'); if (n) n.focus({preventScroll: true}); if (!nm) toast('Added. Type their name in the list.'); return; }
    case 'pp-del': { const x = p.people[+v]; if (!x) return; p.people.splice(+v, 1); ['order', 'rec'].forEach(k => { p.proc[k] = arr(p.proc[k]).filter(r => r.id !== x.id).map(r => r.with === x.id ? Object.assign({}, r, {with: ''}) : r); }); if (p.reh.pos) delete p.reh.pos[x.id]; touch(p); rerender(true); return; }
    case 'pr-pat': if ((arr(p.proc.order).length || arr(p.proc.rec).length) && p.proc.pattern !== v && !confirm('Fill the processional and recessional again from this pattern? The order you set is replaced.')) return; buildOrder(p, v); touch(p); rerender(true); toast('The processional and recessional are filled in. Change anything.'); return;
    case 'pr-up': case 'pr-down': { const [k, i0] = v.split('|'), i = +i0, L = p.proc[k], j = i + (a === 'pr-up' ? -1 : 1); if (!L || j < 0 || j >= L.length) return; const t = L[i]; L[i] = L[j]; L[j] = t; touch(p); rerender(true); return; }
    case 'pr-del': { const [k, i] = v.split('|'); arr(p.proc[k]).splice(+i, 1); touch(p); rerender(true); return; }
    case 'pr-add': { const s = document.getElementById('wd-padd-' + v); if (!s || !s.value) return; p.proc[v] = arr(p.proc[v]); p.proc[v].push({id: s.value, with: ''}); touch(p); rerender(true); return; }
    case 'pos': { const i = v.indexOf('|'), id = v.slice(0, i), pl = v.slice(i + 1); p.reh.pos = p.reh.pos || {}; if (p.reh.pos[id] === pl) delete p.reh.pos[id]; else p.reh.pos[id] = pl; touch(p); rerender(true); return; }
    // Vows
    case 'sub': S.sub = v || null; S.vSec = v && vText(p, v) ? 1 : 0; rerender(false); return;
    case 'v-sec': { const k = S.sub; if (!k) return; S.vSec = Math.max(0, Math.min(2, +v || 0)); if (S.vSec >= 1 && !vText(p, k)){ const V0 = vS(p, k); V0.d = vowsProse(p, k); V0.edited = false; touch(p); } rerender(false); return; }
    case 'v-build': { const k = S.sub, V0 = vS(p, k); if (vText(p, k) && V0.edited && !confirm('Build the draft again from the answers? Changes you typed into the draft are replaced.')) return; V0.d = vowsProse(p, k); V0.edited = false; touch(p); rerender(true); toast('The draft is ready.'); return; }
    case 'v-tone': case 'v-var': { const k = S.sub, V0 = vS(p, k); if (a === 'v-tone'){ if ((V0.tone || 'warm') === v) return; V0.tone = v; V0.oi = 0; V0.ci = 0; } else V0[v] = (+V0[v] || 0) + 1;
      if (V0.edited && vText(p, k) && !confirm('Build the draft again with this change? Changes you typed into the draft are replaced.')){ touch(p); rerender(true); return; }
      V0.d = vowsProse(p, k); V0.edited = false; touch(p); rerender(true); toast(a === 'v-tone' ? (v === 'plain' ? 'A plainer voice.' : 'A warmer voice.') : v === 'oi' ? 'A new opening.' : 'A new closing.'); return; }
    case 'v-ready': { const V0 = vS(p, S.sub); V0.ready = V0.ready ? '' : today(); touch(p); rerender(true); if (V0.ready) toast('The vows are marked ready.'); return; }
    case 'v-copy': copyText(vText(p, S.sub), 'The vows are copied.'); return;
    case 'v-print': { const k = S.sub, d = vText(p, k); if (!d) return toast('Build the draft first.'); sheet(`<style>.wd-eu p{font-size:16pt;line-height:2;margin:0 0 5mm;}</style><h1>${H(vName(p, k))}'s Vows</h1><p><i>${H(readTime(d))}</i></p><div class="wd-eu">${paras(d)}</div>`, 'Vows', 'vows-' + vName(p, k).toLowerCase().replace(/[^a-z]+/g, '-')); return; }
    case 'speak': speak(vText(p, S.sub)); return;
    case 'v-share-copy': copyText(vShareText(p, v), 'The questions are copied.'); return;
    case 'v-load': { const t = document.getElementById('wd-vpaste-' + v); if (loadVows(p, v, t ? t.value : '')) rerender(true); return; }
    case 'scan': scanQR(v); return;
    // The Grounded Marriage
    case 'gm-open': { const id = gmLink(p); if (!id || !window.GGPm) return; S.on = false; GGPm.open(id); if (C.go) C.go('premarital'); return; }
    case 'gm-new': { if (!window.GGPm || !GGPm.create){ toast('The Premarital tab is not on this device yet.'); return; }
      const id = GGPm.create({cli: p.cli || '', a: P1(p), b: P2(p), full1: fullOf(p, 'p1'), full2: fullOf(p, 'p2'), wedding: p.day.date || '', data: D(), lib: C.lib && C.lib(), save: C.save});
      p.pm = id; touch(p); toast('The Grounded Marriage is ready for ' + couple(p) + '.'); rerender(true); return; }
    // Writing help
    case 'wa': { p.wa = Object.assign({}, p.wa || {}, {ans: v, date: (p.wa && p.wa.date) || today(), at: Date.now()}); if (!p.wa.how) p.wa.how = 'aloud'; touch(p); rerender(true); return; }
    case 'wa-how': { p.wa = Object.assign({ans: 'yes', date: today()}, p.wa || {}, {how: v, at: Date.now()}); touch(p); rerender(true); return; }
    case 'go-wh': goStep(11); setTimeout(() => { const e2 = document.querySelector('#wd-root [data-wdanc="writing"]'); if (e2 && e2.scrollIntoView) e2.scrollIntoView({block: 'start'}); }, 30); return;
    case 'wh-want': { const w = whS(p); w.want[v] = !w.want[v]; touch(p); rerender(true); return; }
    case 'wh-add': { const w = whS(p), inp = document.getElementById('wd-whreal'), k = (document.getElementById('wd-whkind') || {}).value || 'other', real = clean(v || (inp ? inp.value : '')); if (!real) return toast('Type a name or place first.');
      S.whKind = k; w.own.push({real, kind: k}); touch(p); rerender(true); toast(real + ' is now ' + ((whMap(p).find(m => m.real.toLowerCase() === real.toLowerCase()) || {}).ph || 'hidden') + '.'); return; }
    case 'wh-del': { const w = whS(p); w.own = w.own.filter(o => o.real !== v); touch(p); rerender(true); return; }
    case 'wh-see': S.whSee = !S.whSee; rerender(true); return;
    case 'wh-copy': case 'wh-file': { const wa = waOf(p); if (!(wa && wa.ans === 'yes') && !confirm(cfg().writingHelp.reminder + ' Copy anyway?')) return; const t = whText(p); whS(p).copied = Date.now(); touch(p);
      if (a === 'wh-copy') copyText(t, 'Copied for writing help: names are placeholders, contact details left out.'); else saveFile('writing-help-' + today() + '.txt', t); return; }
    case 'wh-paste': { const t = document.getElementById('wd-whpaste'), r = whPaste(p, t ? t.value : ''); if (!r) return; touch(p); rerender(true); toast('In place: ' + r.put.join(', ') + '.'); return; }
    case 'wh-undo': { const L = whS(p).last; if (!L || !L.prev || !confirm('Undo the last paste and bring back what was there before?')) return; vS(p, 'p1').d = L.prev.v1; vS(p, 'p2').d = L.prev.v2; p.address = L.prev.address; p.welcomeText = L.prev.welcome; p.progText = L.prev.progText; p.writings = arr(p.writings).slice(0, L.prev.wn); whS(p).last = null; touch(p); rerender(true); toast('The last paste is undone.'); return; }
    // Approval and sending
    case 'appr-show': S.appr = !S.appr; S.apName = S.apName || ''; rerender(true); if (S.appr && (!famWin || famWin.closed) && S.mode !== 'family') toast('The approve box shows in the Family View. Open the Family View Window, or use Family View Here.'); return;
    case 'fam-approve': { const box = el && el.closest('.wd-apbox'), inp = box && box.querySelector('input'), nm = clean(inp ? inp.value : S.apName);
      recordAppr(p, {way: 'view', name: nm || couple(p), typed: !!nm}); S.apName = ''; if (inp) inp.value = ''; touch(p); rerender(true); toast('Approved and saved with this version.'); return; }
    case 'appr-send': { const words = W(cfg().approval.sendWords, p) + '\n\n' + bundleText(p); p.apSent = {text: bundleText(p), ver: verOf(p), date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(words, 'The plan and your words are copied.'); else if (v === 'text') openLink(smsHref(cPh(p), words)); else openLink(mailHref(cEm(p), W(cfg().approval.subject, p), words)); touch(p); rerender(true); return; }
    case 'appr-reply': { const t = document.getElementById('wd-apreply'), reply = t ? t.value.trim() : '', r2 = p.apr || {};
      if (!p.apSent) return toast('Send the plan first, so their approval is saved with the exact version they read.');
      if (!reply){ toast('Paste their reply first.'); if (t) t.focus(); return; }
      if (!/\bapprove|\byes\b|\bagree\b|looks (good|right)/i.test(reply) && !confirm('Their reply does not say "I approve". Record it as their approval anyway?')) return;
      if (p.apSent.ver !== verOf(p) && !confirm('The plan changed after it was sent. Their approval is saved with the version they were sent. Continue?')) return;
      recordAppr(p, {way: 'reply', name: clean(r2.name) || couple(p), date: r2.date || today(), reply, ver: p.apSent.ver, text: p.apSent.text}); p.apr = {}; touch(p); rerender(true); toast('Their approval is recorded with the version they read.'); return; }
    case 'bundle-print': sheet(bundleHTML(p), cfg().bundle.title || 'Send Everything', 'wedding-packet'); return;
    case 'bundle-send': { const B = cfg().bundle, words = W(B.sendWords, p); p.bundleSent = {date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(words + '\n\n' + bundleText(p), 'The packet words are copied.'); else if (v === 'text') openLink(smsHref(cPh(p), words)); else openLink(mailHref(cEm(p), W(B.subject, p), words + '\n\n' + bundleText(p))); touch(p); rerender(true); return; }
    case 'vp-send': { const P = cfg().venuePacket, words = W(P.sendWords, p) + '\n\n' + vpText(p); p.vpSent = {date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(words, 'The packet is copied.'); else openLink(mailHref((p.venue || {}).cem, W(P.subject, p), words)); touch(p); rerender(true); return; }
    case 'vq-send': { const Q = cfg().venueQuestions, words = W(Q.sendWords, p) + '\n\n' + vqText(p); p.vqSent = {date: today(), at: Date.now(), how: v};
      if (v === 'copy') copyText(words, 'The questions are copied.'); else openLink(mailHref((p.venue || {}).cem, W(Q.subject, p), words)); touch(p); rerender(true); return; }
    case 'mus-who': { const i = v.indexOf('|'), id = v.slice(0, i), w = v.slice(i + 1); p.mus = p.mus || {}; p.mus[id] = Object.assign({}, p.mus[id], {who: musWho(p, id) === w ? '' : w}); touch(p); rerender(true); return; }
    case 'out': printOut(v); return;
    case 'cc-copy': copyText(coupleText(p), 'The couple copy is copied.'); return;
    case 'make-ses': makeSessions(); return;
    case 'fu-copy': { const t = touches(p).find(x => x.id === v); if (t) copyText(fill((t.f.email || {}).body || '', p) + (t.f.invite ? '\n\n' + fill(cfg().gmInvite, p, {Link: gmURL()}) : '')); return; }
    case 'fu-add': { const t = document.getElementById('wd-fuo-t'), d = document.getElementById('wd-fuo-d'); if (!t || !t.value.trim()) return toast('Name the check-in first.'); p.fuOwn.push({id: 'own_' + uid(), title: t.value.trim(), date: d ? d.value : ''}); touch(p); rerender(true); return; }
    case 'fu-del': p.fuOwn = p.fuOwn.filter(x => x.id !== v); delete p.fu[v]; touch(p); rerender(true); return;
    // The ceremony and the picker
    case 'lb-type': S.lb.type = v; S.lb.tag = ''; S.lb.open = null; S.lb.more = 0; rerender(true); return;
    case 'lb-faith': S.lb.faith = v; S.lb.more = 0; rerender(true); return;
    case 'lb-mom': S.lb.moment = v; S.lb.more = 0; rerender(true); return;
    case 'lb-mine': S.lb.mine = !S.lb.mine; S.lb.more = 0; rerender(true); return;
    case 'lb-place': S.lb.place = v; rerender(true); return;
    case 'lb-more': S.lb.more += 25; lbRedraw(p); return;
    case 'lb-prev': S.lb.open = S.lb.open === v ? null : v; lbRedraw(p); return;
    case 'lb-add': { const f = findPiece(p, v); if (!f.x) return; if (!ensureSvc(p)) return toast('The Service Builder did not load. Reload the Field Guide.');
      const r = CER().addPiece(p.svc, {kind: f.k, id: f.id, moment: S.lb.place === 'best' ? null : S.lb.place, by: S.lb.by});
      if (!r) return toast('That piece could not be added.');
      if (f.k === 'ritual' && arr(f.x.needs).length && !p.tasks.some(t => t.id === 'rit_' + f.id)) p.tasks.push({id: 'rit_' + f.id, t: f.x.title + ': ' + f.x.needs.join('; '), who: 'Couple', done: false, d: ''});
      touch(p); rerender(true); toast('Added to ' + r.part + '.'); return; }
    case 'lb-rm': { const f = findPiece(p, v); if (!hasSvc(p)) return; CER().removePiece(p.svc, f.k, f.id); const i = p.tasks.findIndex(t => t.id === 'rit_' + f.id && !t.done && !t.d); if (i >= 0) p.tasks.splice(i, 1); touch(p); rerender(true); toast('Taken out of the ceremony.'); return; }
    case 'lb-own': { const g = id => { const e = document.getElementById(id); return e ? (e.type === 'checkbox' ? e.checked : e.value) : ''; }, t = S.lb.type, k = lbKind(t);
      const title = String(g('wd-lo-title')).trim(); if (!title) return toast('Give it a title first.');
      if (!ensureSvc(p)) return; const c = CER();
      const m = {kind: k === 'reading' ? t : k, title, by: g('wd-lo-by'), ref: g('wd-lo-ref'), text: g('wd-lo-text'), how: g('wd-lo-how'), needs: g('wd-lo-needs'), source: g('wd-lo-src'), faith: plainOf(p) ? 'plain' : 'faith', moments: S.lb.place !== 'best' ? [S.lb.place] : (k === 'ritual' ? ['unity'] : [])};
      const id = c.savePiece(m, p.svc, !!g('wd-lo-keep')); if (!id) return;
      const r = c.addPiece(p.svc, {kind: k, id, moment: S.lb.place === 'best' ? null : S.lb.place, by: S.lb.by});
      S.lb.own = false; touch(p); rerender(true); toast(r ? 'Added to ' + r.part + '.' : 'Saved.'); return; }
    case 'lb-mypieces': { const c = cerBind(); if (!c) return; c.openMine(p.id); S.on = false; if (C.go) C.go('ceremonies'); return; }
    case 'svc-new': { const c = cerBind(); if (!c) return; const o = svcSync(p); o.type = v; o.wdp = p.id; p.svc = c.make(o); if (!arr(p.sel.wtype).length && items(p, 'wtype').some(x => x.id === v)) p.sel.wtype = [v]; touch(p); rerender(true); toast('The order is ready. Change anything that does not fit.'); return; }
    case 'svc-sync': { const c = cerBind(); if (!c || !hasSvc(p)) return; c.sync(p.svc, svcSync(p)); touch(p); rerender(true); toast('Matched to the couple\'s choices.'); return; }
    case 'svc-open': { const c = cerBind(); if (!c || !hasSvc(p)) return; svcPush(p, true); c.sync(p.svc, svcSync(p)); c.open(p.svc, 'check'); S.on = false; if (C.go) C.go('ceremonies'); return; }
    case 'svc-up': case 'svc-down': CER().move(p.svc, v, a === 'svc-up' ? -1 : 1); touch(p); rerender(true); return;
    case 'svc-off': CER().set(p.svc, v, 'on', false); touch(p); rerender(true); return;
    case 'svc-on': CER().set(p.svc, v, 'on', true); touch(p); rerender(true); return;
    case 'cer-print': if (hasSvc(p)){ cerBind(); svcPush(p, true); CER().print(p.svc, v); } return;
  }
}
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('[data-wda]'); if (!t || !D()) return;
  if (t.disabled) return;
  e.preventDefault(); act(t.dataset.wda, t.dataset.wdv || '', t);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.closest) return;
  const o = e.target.closest('#wd-root [data-wdown]'); if (o){ e.preventDefault(); act('own', o.dataset.wdown, o); return; }
  const g = e.target.closest('#wd-root [data-wdtag]'); if (g){ e.preventDefault(); act('tagset', g.dataset.wdtag, g); }
});
function headSync(p){ const h = document.querySelector('#wd-root .wd-head h1'); if (h) h.textContent = pTitle(p); }
document.addEventListener('input', e => {
  const t = e.target; if (!t.closest || !t.closest('#wd-root') || !D()) return;
  if (t.dataset.wdi){
    if (t.dataset.wdi.startsWith('me.')){ store().me[t.dataset.wdi.slice(3)] = t.value; C.save(); return; }
    const p = plan(); if (!p) return; let v = t.value; if (t.type === 'number') v = v === '' ? '' : +v;
    setPath(p, t.dataset.wdi, v);
    const vm = /^vows\.(p1|p2)\.(d|target)$/.exec(t.dataset.wdi);
    if (vm && vm[2] === 'd'){ vS(p, vm[1]).edited = true; const tm2 = document.getElementById('wd-v-time'); if (tm2) tm2.textContent = v.trim() ? readTime(v) : 'Not built yet'; }
    if (vm && vm[2] === 'target'){ const f2 = document.getElementById('wd-v-fit'); if (f2) f2.textContent = fitLine(vText(p, vm[1]), v); }
    if (t.dataset.wdi === 'address'){ const a2 = document.getElementById('wd-addr-time'); if (a2) a2.textContent = v.trim() ? readTime(v) : ''; }
    touch(p); if (/^c\.|^people\./.test(t.dataset.wdi)) headSync(p); return;
  }
  if (t.dataset.wdlq){ const p = plan(); if (!p) return; S.lb.q = t.value; S.lb.more = 0; lbRedraw(p); return; }
  if (t.dataset.wdlby){ S.lb.by = t.value; return; }
  if (t.dataset.wdapn){ S.apName = t.value; return; }
  if (t.dataset.wdsvc){ const p = plan(); if (!p || !hasSvc(p)) return; const [k, f] = t.dataset.wdsvc.split('|'); if (f === 'option') return; CER().set(p.svc, k, f, t.value); const tot = document.getElementById('wd-tot'); if (tot) tot.textContent = CER().total(p.svc) + ' minutes'; touch(p); }
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.closest || !t.closest('#wd-root') || !D()) return;
  const p = plan();
  if (t.dataset.wdwh && t.files && t.files[0]){ const f = t.files[0]; t.value = ''; const r = new FileReader(); r.onload = () => { if (p){ const x = whPaste(p, String(r.result || '')); if (x){ touch(p); rerender(true); toast('In place: ' + x.put.join(', ') + '.'); } } }; r.readAsText(f); return; }
  if (t.dataset.wdvfile && t.files && t.files[0]){ const f = t.files[0], k = t.dataset.wdvfile; t.value = ''; const r = new FileReader(); r.onload = () => { if (p && loadVows(p, k, String(r.result || ''))) rerender(true); }; r.readAsText(f); return; }
  if (!p) return;
  if (t.dataset.wdc){ setPath(p, t.dataset.wdc, !!t.checked); touch(p); rerender(true); return; }
  if (t.dataset.wdlt){ S.lb.tag = t.value; S.lb.more = 0; lbRedraw(p); return; }
  if (t.dataset.wdpr){ const x = p.people[+t.dataset.wdpr]; if (x){ x.role = t.value; touch(p); rerender(true); } return; }
  if (t.dataset.wdproc){ const [k, i] = t.dataset.wdproc.split('|'), r = arr(p.proc[k])[+i]; if (r){ r.with = t.value; if (t.value) p.proc[k] = p.proc[k].filter((x, j) => j === +i || x.id !== t.value); touch(p); rerender(true); } return; }
  if (t.dataset.wdsvc){ const [k, f] = t.dataset.wdsvc.split('|'); if (f === 'option'){ CER().set(p.svc, k, 'option', t.value); touch(p); rerender(true); } return; }
  if (t.dataset.wdi && (t.type === 'date' || t.type === 'time') && /^(day\.)/.test(t.dataset.wdi)){ setPath(p, t.dataset.wdi, t.value); if (hasSvc(p)) CER().sync(p.svc, svcSync(p)); touch(p); }
});
document.addEventListener('toggle', e => { const d = e.target; if (d && d.dataset && d.dataset.wdfu && d.open) S.fuOpen = d.dataset.wdfu; if (d && d.dataset && d.dataset.wdkeep) S[d.dataset.wdkeep] = d.open; }, true);

// ---------- the API ----------
const API = window.GGWed = {
  init(ctx){ C = ctx || {}; },
  on: () => S.on && isStaff() && !!D(),
  view,
  // The card on the Service Builder's home (Ceremonies tab).
  card(){
    if (!isStaff() || !D()) return '';
    const n = plans().length, due = dueSoon().length;
    return `<div class="card" style="border-left:4px solid var(--gold)"><div class="spread"><div style="min-width:0;flex:1 1 260px"><div class="eyebrow">With the Couple</div><h2 style="margin:2px 0 4px">Wedding Planning Session</h2><p class="muted" style="margin:0">Plan a wedding, an elopement, or a vow renewal together across your meetings: the license, the ceremony, the processional, the vows, the rehearsal, every printout, and live sessions.${n ? ' ' + n + (n === 1 ? ' plan' : ' plans') + (due ? ', ' + due + ' follow-up' + (due === 1 ? '' : 's') + ' due this week' : '') + '.' : ''}</p></div>
      <button type="button" class="btn btn-gold" data-wda="plans-open">Open</button></div></div>`;
  },
  // The Wedding Follow-Ups card on the Staff and Founder Home, only when something is due this week.
  homeCard(){
    if (!isStaff() || !D() || !plans().length) return '';
    const due = dueSoon(); if (!due.length) return '';
    return `<div class="card wd-home" style="margin-top:14px"><div class="spread"><h3>Wedding Follow-Ups Due</h3><button type="button" class="linkbtn" data-wda="plans-open">Wedding Plans</button></div>
      ${due.map(x => `<div class="wd-list-r"><div class="m"><b>${esc(x.t.title)}</b> <span class="muted">for ${esc(couple(x.p))}</span><br><small class="muted">${esc(nice(x.t.date))}${x.t.date < today() ? ' <span class="pill warn">Overdue</span>' : ''}</small></div><button type="button" class="btn btn-line btn-sm" data-wda="fu-open" data-wdv="${esc(x.p.id + '|' + x.t.id)}">Open</button></div>`).join('')}</div>`;
  },
  // Backups: plans combine like saved services; the newest copy of each wins and deleted ones stay deleted.
  merge(out, inc){
    out.deleted = out.deleted || {clients: {}, sessions: {}}; out.deleted.wdp = out.deleted.wdp || {};
    Object.entries((inc.deleted || {}).wdp || {}).forEach(([id, ts]) => { out.deleted.wdp[id] = Math.max(out.deleted.wdp[id] || 0, ts); });
    out.wdp = out.wdp || {plans: []}; out.wdp.plans = out.wdp.plans || []; let added = 0, updated = 0;
    ((inc.wdp || {}).plans || []).forEach(x => { const i = out.wdp.plans.findIndex(y => y.id === x.id); if (i < 0){ out.wdp.plans.push(x); added++; } else if ((x.u || 0) > (out.wdp.plans[i].u || 0)){ out.wdp.plans[i] = x; updated++; } });
    out.wdp.plans = out.wdp.plans.filter(x => !(out.deleted.wdp[x.id] && out.deleted.wdp[x.id] >= (x.u || 0)));
    if (inc.wdp && inc.wdp.me && !(out.wdp.me && (out.wdp.me.em || out.wdp.me.ph))) out.wdp.me = Object.assign({}, inc.wdp.me);
    return {added, updated};
  },
  // Clients and Intake (clients.js): a plan started from a client file carries cli, the file's id.
  create(o){ o = o || {}; const n = newPlan(); if (o.cli) n.cli = o.cli; if (o.pm) n.pm = o.pm;
    ['p1', 'p2'].forEach(k => Object.assign(n.c[k], (o.c || {})[k] || {})); Object.assign(n.day, o.day || {});
    if (o.type && items(n, 'wtype').some(x => x.id === o.type)) n.sel.wtype = [o.type];
    plans().push(n); const d = D(); if (d && d.deleted && d.deleted.wdp) delete d.deleted.wdp[n.id]; touch(n); return n.id; },
  open(id){ openPlan(id, 1); },
  plans: () => plans(),
  // For tests and the lead.
  state: S, cfg, plan, touches, dueSoon, coupleText, famBody, outHTML, sesGuides, fill, DEF, vowsProse, loadVows, buildOrder, sinceLast, trackables, startMeet,
  whMap, whText, whPaste, whParse, bundleHTML, bundleText, vpText, vqText, verOf, apStatus, waOf, scriptText, licItems,
  famWin: null, last: null, lastCopy: null, lastLink: null, lastFile: null, noOpen: false
};
})();
