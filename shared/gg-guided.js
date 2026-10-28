/* =====================================================================
   GROW WITH GROUNDED . GUIDED CHECK-INS AND GUIDED GROWTH PLANS (shared/gg-guided.js), GWG BLD 886
   (c) 2026 Grow With Grounded LLC.
   A video style walk through for every tree's check-ins and first assessments, and for building a Growth Plan:
   one question per screen, read aloud one sentence at a time, big answer buttons, and short guide moments between.
   Looks: shared/gg-guided.css (loaded on first use when the page has not loaded it).

   GGGuided.run(opts) opens the player full screen (in place on a tree page, or inside The Grounded Way's in-app sheet)
   and returns a handle {el, close(), state()}.
     opts.tree       'oak', 'maple', and so on (the painting, the voice, the music)
     opts.kind       'start' (first assessment), 'full' (check-in), 'quick' (Quick Check-in), 'plan', or the tree's own kinds
     opts.title      shown at the top (Title Case)
     opts.voice      'brian' or 'jenny' (else the script's voice, else the tree's narrator)
     opts.kid        true for the kid look (bigger, playful)
     opts.questions  steps in order. A question: {id, part, text, say?, help?, type: 'choice'|'scale'|'multi'|'text',
                     options: [{v, label, short?, edge?}], low?, high?, noTip?, tags?}. say is what the voice reads
                     when it differs from text. A Growth Plan step: {type: 'plan', part, label?, choices: [{name, how,
                     r, x, min}], max: 3}; r, x, min, how come from window.GG_RHYTHM[tree]['part|name'] when missing.
     opts.answers    answers so far {id: value}: the player resumes at the first unanswered question
     opts.plan       a plan so far {part: [names]}: the cards start chosen
     opts.script     window.GG_GUIDED[tree] (read from there when missing)
     opts.isEdge     function (question, value): true when the answer shows a Growing Edge (else: an option with
                     edge: true, or the lowest third of a scale)
     opts.hero       a painting url for the background (else shared/heroes/<tree>-wide.webp and -phone.webp)
     opts.onAnswer(id, value)   each answer, the moment it is chosen
     opts.onPlan(part, names)   each Growth Plan step, when Next is tapped
     opts.onDone({answers, plan})   the last screen's Done (plan is null when the run has no plan steps)
     opts.onClose()             the player closed (after onDone too)
     opts.onReadAll(answers)    shows Read It All; the player closes, then this opens the tree's classic form
   GGGuided.lines(opts) returns every sentence the voice can say for that run, in order, each once:
     [{voice, text, clip, url, where}], for the recorder. opts.allKinds: true walks every kind in the script.
   GGGuided.close() closes the player on screen.

   Scripts (shared/guided/<tree>.js): GG_GUIDED[tree] = {voice, tipSkip: [tags], kinds: {<kind>: {open: [lines],
   resume?: [lines], enter?: {part: [lines]}, mid: {every, lines}, tips: {part: [lines]}, close: [lines]},
   plan: {open, part: {part: [lines]}, close}}}.
     open, resume, close, and plan open and close are spoken in full, in order. A line that is itself a list is a set of
     choices: the player says one of them. enter, tips, and plan part lines are choices too (one is said); mid lines
     take turns. A tip comes once per part per run, after an answer that shows a Growing Edge, never for a question
     with noTip or with a tag named in tipSkip (q.tags includes it, or q[tag] is true).
   Voice: recorded public clips, the same scheme as the tree Learn videos (GGLearn.clipName, cyrb53 of voice and
   sentence, at https://audio.growwithgrounded.com/v1/<voice>/<name>.mp3). A missing clip plays the device voice
   (read.js GGRead.say, else speechSynthesis) for that sentence. Voice Off says nothing and fetches nothing
   (kept on this device as gg-guided-voice). Music: the soft Learn music, the same Volume setting (gg-music).
   Privacy: answers live only in memory here and go to the tree through onAnswer and onDone.
   No crisis line or helpline is ever spoken here: trees keep their own text line.
   ===================================================================== */
(function () {
  'use strict';
  if (window.GGGuided) return;
  var V = 'b886';
  var ROOT = (function () { try { var s = document.currentScript && document.currentScript.src; if (s) return new URL('..', s).href.replace(/\/$/, ''); } catch (e) {} return location.origin; })();
  var REC = { base: 'https://audio.growwithgrounded.com/', round: 'v1' };
  var TREE_VOICE = { maple: 'jenny', aspen: 'jenny', pine: 'jenny', grove: 'jenny', birch: 'brian', oak: 'brian', sequoia: 'brian', willow: 'brian' };
  var HEROES = ['maple', 'aspen', 'pine', 'birch', 'oak', 'sequoia', 'willow', 'grove'];
  var PARTS = { roots: 'Roots', trunk: 'Trunk', bark: 'Bark', branches: 'Branches', leaves: 'Leaves', fruit: 'Fruit' };
  var RHY = { d: 'Daily', f: 'A Few Times a Week', w: 'Weekly', n: 'Now and Then' };
  var RESUME = ["Welcome back. We'll pick up right where you left off."];
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- clip names: the same as GGLearn.clipName and GGRead.clipName, byte for byte ---------- */
  // cyrb53 (a public domain 53-bit string hash, by bryc)
  function ownClipName(voice, text) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, s = voice + '\n' + String(text).replace(/\s+/g, ' ').trim();
    for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return voice + '/' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function clipName(voice, text) { try { if (window.GGLearn && GGLearn.clipName) return GGLearn.clipName(voice, text); } catch (e) {} return ownClipName(voice, text); }
  function rec() { var r = (window.GGLearn && GGLearn.rec) || (window.GGRead && GGRead.rec) || REC; return { base: r.base || REC.base, round: r.round || REC.round }; }
  function clipUrl(voice, text) { var r = rec(); return r.base + r.round + '/' + clipName(voice, text) + '.mp3'; }

  /* ---------- sentences: the player speaks one at a time (the same split as GGLearn.beatsOf) ---------- */
  var ABBR = /\b(Mr|Mrs|Ms|Dr|St|Rev|Fr|Sr|Jr|vs|etc|No)\.$/i;
  function sentences(text) {
    var txt = String(text == null ? '' : text).replace(/\s+/g, ' ').trim(); if (!txt) return [];
    var parts = txt.match(/[^.!?]+(?:[.!?]+["'”’)]*|$)/g) || [txt], out = [];
    parts.forEach(function (x) {
      x = x.trim(); if (!x) return;
      var prev = out[out.length - 1];
      if (prev && (ABBR.test(prev) || (/\d\.$/.test(prev) && /^\d/.test(x)) || x.length < 3)) out[out.length - 1] = prev + (/^\d/.test(x) && /\d\.$/.test(prev) ? '' : ' ') + x;
      else out.push(x);
    });
    return out;
  }

  /* ---------- the script ---------- */
  function lineText(x) { return typeof x === 'string' ? x : x && typeof x.t === 'string' ? x.t : ''; }
  function arr(x) { return Array.isArray(x) ? x : x == null ? [] : [x]; }
  function anyOf(list) { list = arr(list).filter(function (x) { return lineText(x) || Array.isArray(x); }); return list.length ? list[Math.floor(Math.random() * list.length)] : null; }
  // A spoken sequence: each line in order; a line that is a list says one of its choices.
  function seq(list) { var out = []; arr(list).forEach(function (x) { var t = Array.isArray(x) ? lineText(anyOf(x)) : lineText(x); if (t) out.push(t); }); return out; }
  function allText(list) { var out = []; (function walk(x) { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object' && !('t' in x)) Object.keys(x).forEach(function (k) { walk(x[k]); }); else { var t = lineText(x); if (t) out.push(t); } })(list); return out; }
  function scriptOf(o) { var s = o.script || (window.GG_GUIDED || {})[o.tree] || {}; return s; }
  function kindOf(s, kind) {
    if (s && !s.kinds && (s.open || s.close || s.mid || s.tips)) return s; // a kind passed on its own
    var K = (s && s.kinds) || {};
    return K[kind] || (kind === 'plan' ? {} : K.full || K.checkin || {});
  }
  function voiceOf(o, s) { var v = o.voice || (s && s.voice) || TREE_VOICE[o.tree] || 'brian'; return /^[a-z]+$/.test(v) ? v : 'brian'; }
  function partName(p, step) { return (step && step.label) || PARTS[p] || (p ? String(p).charAt(0).toUpperCase() + String(p).slice(1) : ''); }
  function rhythmOf(tree, part, c) {
    var R = ((window.GG_RHYTHM || {})[tree] || {})[part + '|' + c.name] || {};
    var how = c.how != null ? c.how : R.how;
    return { r: c.r || R.r || 'd', x: c.x != null ? c.x : R.x, min: c.min != null ? c.min : R.min, how: Array.isArray(how) ? how : how ? sentences(how) : [] };
  }
  function rhythmLabel(r) { return RHY[r.r] || RHY.d; }
  function rhythmPill(r) { return r.r === 'f' && r.x ? RHY.f + ', ' + r.x + 'x' : rhythmLabel(r); }

  /* ---------- GGGuided.lines: every sentence the voice can say, for the recorder ---------- */
  function lines(o) {
    o = o || {};
    var s = scriptOf(o), voice = voiceOf(o, s), out = [], seen = {};
    var add = function (text, where) { sentences(text).forEach(function (t) { var k = voice + '|' + t; if (seen[k]) return; seen[k] = 1; out.push({ voice: voice, text: t, clip: clipName(voice, t), url: clipUrl(voice, t), where: where }); }); };
    var steps = o.questions || [], Q = steps.filter(function (q) { return q && q.type !== 'plan'; }), P = steps.filter(function (q) { return q && q.type === 'plan'; });
    var kinds = o.allKinds ? Object.keys((s && s.kinds) || {}) : [o.kind || 'full'];
    kinds.forEach(function (kn) {
      var K = kindOf(s, kn);
      if (kn === 'plan') {
        allText(K.open).forEach(function (t) { add(t, 'plan.open'); });
        var parts = P.length ? P.map(function (p) { return p.part; }) : Object.keys(K.part || {});
        parts.forEach(function (p) { allText((K.part || {})[p]).forEach(function (t) { add(t, 'plan.part.' + p); }); });
        allText(K.close).forEach(function (t) { add(t, 'plan.close'); });
        return;
      }
      allText(K.open).forEach(function (t) { add(t, kn + '.open'); });
      allText(K.resume && arr(K.resume).length ? K.resume : RESUME).forEach(function (t) { add(t, kn + '.resume'); });
      var last = '';
      Q.forEach(function (q) {
        if (q.part !== last && K.enter && K.enter[q.part]) allText(K.enter[q.part]).forEach(function (t) { add(t, kn + '.enter.' + q.part); });
        last = q.part;
        add(q.say || q.text, 'question.' + q.id);
      });
      allText((K.mid || {}).lines).forEach(function (t) { add(t, kn + '.mid'); });
      Object.keys(K.tips || {}).forEach(function (p) { allText(K.tips[p]).forEach(function (t) { add(t, kn + '.tip.' + p); }); });
      allText(K.close).forEach(function (t) { add(t, kn + '.close'); });
    });
    if (!o.allKinds && P.length && o.kind !== 'plan') {
      var K = kindOf(s, 'plan');
      allText(K.open).forEach(function (t) { add(t, 'plan.open'); });
      P.forEach(function (p) { allText((K.part || {})[p.part]).forEach(function (t) { add(t, 'plan.part.' + p.part); }); });
      allText(K.close).forEach(function (t) { add(t, 'plan.close'); });
    }
    return out;
  }

  /* ---------- styles and fonts, loaded once ---------- */
  function ensureCss() {
    var has = function (re) { return Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function (l) { return re.test(l.getAttribute('href') || ''); }); };
    if (!has(/gg-guided\.css/)) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = ROOT + '/shared/gg-guided.css?v=' + V; document.head.appendChild(l); }
    if (!has(/fonts\/fonts\.css/)) { var f = document.createElement('link'); f.rel = 'stylesheet'; f.href = ROOT + '/fonts/fonts.css?v=b788'; document.head.appendChild(f); }
  }

  /* ---------- music: the soft Learn music under the voice ---------- */
  var MU = { el: null, ctx: null, gain: null, fade: 0 };
  var MOODN = 7, LEVEL = { soft: 0.11, medium: 0.18 };
  function musicVol() { var v = lsGet('gg-music'); return v === 'off' ? 'off' : v === 'medium' ? 'medium' : 'soft'; }
  function musicOn() { return musicVol() !== 'off'; }
  function moodOf(o) { return o.kid || o.tree === 'maple' || o.tree === 'aspen' ? 'kids' : o.tree === 'willow' ? 'willow' : 'calm'; }
  function musicTrack(o) {
    var mood = moodOf(o), list = window.GGLearn && GGLearn.music && GGLearn.music[mood], key = (o.tree || 'home') + '|' + (o.kind || ''), h = 0;
    for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    if (list && list.length) { var m = list[h % list.length]; return { src: ROOT + m.src + '?v=mu2', credit: m.credit || '' }; }
    return { src: ROOT + '/audio/music/' + mood + '-' + (1 + h % MOODN) + '.mp3?v=mu2', credit: '' };
  }
  function muVol(v) { if (MU.gain) MU.gain.gain.value = v; else if (MU.el) MU.el.volume = v; }
  function muNow() { return MU.gain ? MU.gain.gain.value : MU.el ? MU.el.volume : 0; }
  function muFade(to, ms, done) { clearInterval(MU.fade); var from = muNow(), t0 = Date.now(); MU.fade = setInterval(function () { var k = Math.min(1, (Date.now() - t0) / ms); muVol(from + (to - from) * k); if (k >= 1) { clearInterval(MU.fade); if (done) done(); } }, 50); }
  function muPlay(o) {
    if (!musicOn() || !window.Audio) return;
    try {
      var t = musicTrack(o);
      if (!MU.el) {
        MU.el = new Audio(); MU.el.loop = true; MU.el.preload = 'auto'; MU.el.crossOrigin = 'anonymous';
        var AC = window.AudioContext || window.webkitAudioContext; // phones ignore an audio element's volume, so Web Audio sets it
        if (AC) { try { MU.ctx = new AC(); MU.gain = MU.ctx.createGain(); MU.gain.gain.value = 0; MU.ctx.createMediaElementSource(MU.el).connect(MU.gain); MU.gain.connect(MU.ctx.destination); } catch (e) { MU.ctx = MU.gain = null; } }
      }
      if (MU.el.getAttribute('data-src') !== t.src) { MU.el.src = t.src; MU.el.setAttribute('data-src', t.src); muVol(0); }
      if (MU.ctx && MU.ctx.state === 'suspended') MU.ctx.resume();
      var p = MU.el.play(); if (p && p.catch) p.catch(function () {});
      muFade(LEVEL[musicVol()] || LEVEL.soft, 1600);
    } catch (e) {}
  }
  function muStop(ms) { if (!MU.el) return; muFade(0, ms || 600, function () { try { MU.el.pause(); } catch (e) {} }); }

  /* ---------- icons ---------- */
  var SV = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var I = {
    voice: SV('<path d="M11 5 6 9H3v6h3l5 4z"/><path class="ggd-on" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/><path class="ggd-off" d="m16 9 6 6m0-6-6 6"/>'),
    music: SV('<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path class="ggd-off" d="m3 3 18 18"/>'),
    read: SV('<path d="M4 5h16M4 10h16M4 15h10M4 20h7"/>'),
    back: SV('<path d="m15 18-6-6 6-6"/>'),
    next: SV('<path d="m9 18 6-6-6-6"/>'),
    check: SV('<path d="m5 12 5 5 9-10"/>'),
    leaf: SV('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'),
    sun: SV('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')
  };

  /* ---------- the player ---------- */
  var CUR = null;
  function run(opts) {
    var o = opts || {};
    if (CUR) CUR.close(true);
    ensureCss();
    var s = scriptOf(o), voice = voiceOf(o, s), kind = o.kind || 'full', K = kindOf(s, kind), KP = kindOf(s, 'plan');
    var steps = (o.questions || []).filter(Boolean), Q = steps.filter(function (q) { return q.type !== 'plan'; });
    var P = steps.filter(function (q) { return q.type === 'plan' && (q.choices || []).length; });
    var A = {}, PL = {};
    Object.keys(o.answers || {}).forEach(function (k) { A[k] = o.answers[k]; });
    Object.keys(o.plan || {}).forEach(function (k) { PL[k] = arr(o.plan[k]).slice(); });
    var tipSkip = arr(s.tipSkip);
    var S = { tok: 0, screen: null, voiceOn: lsGet('gg-guided-voice') !== '0', tips: {}, midN: Math.floor(Math.random() * 7), timer: 0, closed: false, lock: null, el: null, pre: null, prevFocus: document.activeElement };
    var insheet = !!o.inSheet || document.documentElement.classList.contains('gg-insheet');

    /* the frame */
    var hero = HEROES.indexOf(o.tree) >= 0 ? o.tree : 'home';
    var heroW = o.hero || ROOT + '/shared/heroes/' + hero + '-wide.webp', heroP = o.hero || ROOT + '/shared/heroes/' + hero + (hero === 'home' ? '-narrow' : '-phone') + '.webp';
    var el = document.createElement('div');
    el.className = 'ggd' + (o.kid ? ' ggd-kid' : '') + (insheet ? ' ggd-insheet' : '') + ' ggd-t-' + esc(o.tree || 'home');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'ggd-h');
    el.style.setProperty('--ggd-hero-w', 'url("' + heroW + '")'); el.style.setProperty('--ggd-hero-p', 'url("' + heroP + '")');
    el.innerHTML = '<div class="ggd-bg" aria-hidden="true"></div>'
      + '<header class="ggd-top"><div class="ggd-ttl"><b>' + esc(o.title || 'Guided Check-in') + '</b><span class="ggd-prog" aria-live="polite"></span></div>'
      + '<div class="ggd-ctl">'
      + '<button type="button" class="ggd-tb" data-g="voice" aria-pressed="' + S.voiceOn + '">' + I.voice + '<span></span></button>'
      + '<button type="button" class="ggd-tb" data-g="music" aria-pressed="' + musicOn() + '">' + I.music + '<span></span></button>'
      + (typeof o.onReadAll === 'function' ? '<button type="button" class="ggd-tb" data-g="readall">' + I.read + '<span>Read It All</span></button>' : '')
      + '<button type="button" class="ggd-tb ggd-done" data-g="close">Done</button></div>'
      + '<div class="ggd-bar" aria-hidden="true"><i></i></div></header>'
      + '<main class="ggd-stage"></main>'
      + '<footer class="ggd-foot"><button type="button" class="ggd-btn" data-g="back">' + I.back + 'Back</button><span class="ggd-sp"></span><button type="button" class="ggd-btn pri" data-g="next" hidden></button></footer>';
    document.body.appendChild(el);
    document.documentElement.classList.add('ggd-open');
    S.el = el;
    var $ = function (q) { return el.querySelector(q); };
    var stage = $('.ggd-stage'), prog = $('.ggd-prog'), bar = $('.ggd-bar i'), bBack = $('[data-g="back"]'), bNext = $('[data-g="next"]');
    function ctlLabels() {
      var v = $('[data-g="voice"]'), m = $('[data-g="music"]');
      v.setAttribute('aria-pressed', S.voiceOn); v.querySelector('span').textContent = S.voiceOn ? 'Voice On' : 'Voice Off';
      m.setAttribute('aria-pressed', musicOn()); m.querySelector('span').textContent = musicOn() ? 'Music On' : 'Music Off';
    }
    ctlLabels();

    /* the voice: one audio element, started on the tap that opened the player, reused for every sentence */
    var AU = window.Audio ? new Audio() : null;
    if (AU) { AU.preload = 'auto'; if (S.voiceOn) { try { AU.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAACAgICA'; var pp = AU.play(); if (pp && pp.catch) pp.catch(function () {}); } catch (e) {} } }
    var TRIM = { brian: [0.10, 0.28], jenny: [0.15, 0.78] }; // the silence each voice's recordings carry before and after the words
    function speed() { try { return window.GGRead && GGRead.speed ? GGRead.speed() : 1; } catch (e) { return 1; } }
    function est(t) { return Math.max(1400, String(t).split(/\s+/).length * 60000 / (165 * speed())); }
    function hush() {
      clearTimeout(S.guard); clearInterval(S.tl);
      if (AU) { AU.onended = AU.onerror = AU.onplaying = AU.onloadedmetadata = null; try { AU.pause(); } catch (e) {} }
      try { if (window.GGRead && GGRead.stop) GGRead.stop(); else if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    }
    function device(text, tok, fin) {
      var done = false, f = function () { if (done || tok !== S.tok) return; done = true; clearTimeout(S.guard); fin(); };
      var spoke = false;
      try { if (window.GGRead && GGRead.available) { spoke = !!GGRead.say(text, { onend: f }); } } catch (e) {}
      if (!spoke) { try { if (window.speechSynthesis && window.SpeechSynthesisUtterance) { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(text); u.rate = 0.95 * speed(); u.onend = u.onerror = f; S.utt = u; speechSynthesis.speak(u); spoke = true; } } catch (e) {} }
      clearTimeout(S.guard); S.guard = setTimeout(f, spoke ? est(text) * 2.4 + 2500 : est(text));
    }
    function playClip(text, tok, fin) {
      if (!AU) return device(text, tok, fin);
      var who = TRIM[voice] || [0, 0], sp = speed(), once = false, fell = false;
      var done1 = function () { if (once || tok !== S.tok) return; once = true; clearTimeout(S.guard); clearInterval(S.tl); fin(); };
      var fall = function () { if (once || fell || tok !== S.tok) return; fell = true; AU.onended = AU.onerror = AU.onplaying = AU.onloadedmetadata = null; try { AU.pause(); } catch (e) {} clearInterval(S.tl); device(text, tok, function () { once = true; fin(); }); };
      AU.onplaying = function () {
        clearInterval(S.tl);
        if (!who[1] || !isFinite(AU.duration) || AU.duration < who[0] + who[1] + 0.4) return;
        var end = AU.duration - who[1];
        S.tl = setInterval(function () { if (tok !== S.tok) return clearInterval(S.tl); if (!AU.paused && AU.currentTime >= end) { clearInterval(S.tl); try { AU.pause(); } catch (e) {} done1(); } }, 25);
      };
      AU.onended = done1; AU.onerror = fall;
      AU.onloadedmetadata = function () { if (isFinite(AU.duration) && AU.duration > 0) { clearTimeout(S.guard); S.guard = setTimeout(done1, AU.duration * 1000 / sp + 3000); } };
      var src = clipUrl(voice, text);
      AU.src = who[0] ? src + '#t=' + who[0] : src;
      try { AU.defaultPlaybackRate = sp; AU.playbackRate = sp; } catch (e) {}
      clearTimeout(S.guard); S.guard = setTimeout(fall, 8000); // a clip that has not started in 8 seconds gives way to the device voice
      var pr = AU.play(); if (pr && pr.then) pr.then(function () { if (tok === S.tok && !once && !fell) { clearTimeout(S.guard); S.guard = setTimeout(done1, est(text) * 2.4 + 6000); } }).catch(function (e) { if (!e || e.name !== 'AbortError') fall(); });
    }
    function prefetch(text) {
      if (!S.voiceOn || !text || !window.Audio) return;
      var first = sentences(text)[0]; if (!first) return;
      try { var a = S.pre || (S.pre = new Audio()); a.preload = 'auto'; var u = clipUrl(voice, first); if (a.getAttribute('data-u') !== u) { a.setAttribute('data-u', u); a.src = u; a.load(); } } catch (e) {}
    }
    // Say a list of lines, sentence by sentence; onLine(i) as each line begins; done() at the end.
    // With Voice Off, quiet: true waits a reading time per line (guide moments), else ends at once.
    function say(list, onLine, done, quiet) {
      var tok = S.tok, L = [];
      list.forEach(function (t, i) { sentences(t).forEach(function (x, j) { L.push({ t: x, i: i, first: j === 0 }); }); });
      var k = 0, GAP = o.tree === 'willow' || o.tree === 'sequoia' ? 650 : 450;
      (function next() {
        if (tok !== S.tok) return;
        if (k >= L.length) { if (done) done(); return; }
        var b = L[k++];
        if (b.first && onLine) onLine(b.i);
        var fin = function () { if (tok !== S.tok) return; S.timer = setTimeout(next, GAP); };
        if (S.voiceOn) playClip(b.t, tok, fin);
        else if (quiet) S.timer = setTimeout(next, Math.min(7000, 1100 + b.t.length * 48));
        else fin();
      })();
    }

    /* the steps */
    function qIndex(id) { for (var i = 0; i < Q.length; i++) if (Q[i].id === id) return i; return -1; }
    function answered(q) { var v = A[q.id]; if (q.type === 'text') return typeof v === 'string'; if (v === null && Object.prototype.hasOwnProperty.call(A, q.id)) return (q.options || []).some(function (x) { return x.v === null; }); return v !== undefined && v !== null && !(Array.isArray(v) && !v.length) && v !== ''; }
    function firstOpen() { for (var i = 0; i < Q.length; i++) if (!answered(Q[i])) return i; return Q.length; }
    function edge(q, v) {
      if (v === undefined || v === null || v === '') return false;
      if (typeof o.isEdge === 'function') { try { return !!o.isEdge(q, v); } catch (e) { return false; } }
      var ops = (q.options || []).filter(function (x) { return x.v !== null && x.v !== undefined; });
      for (var i = 0; i < ops.length; i++) if (ops[i].v === v) { if (ops[i].edge) return true; if (q.type === 'scale') return i < ops.length / 3; }
      return false;
    }
    function tipOk(q) {
      if (q.noTip) return false;
      for (var i = 0; i < tipSkip.length; i++) { var t = tipSkip[i]; if (q[t] || arr(q.tags).indexOf(t) >= 0 || q.tag === t) return false; }
      return true;
    }
    function midEvery() { var m = K.mid || {}; return +m.every > 0 && arr(m.lines).length ? +m.every : 0; }

    // What follows question i, once answered: a tip, a mid moment, then the next question or the close.
    function after(i) {
      var q = Q[i], nxt = i + 1 < Q.length ? { k: 'q', i: i + 1 } : Q.length ? { k: 'close' } : { k: 'popen' };
      var tips = (K.tips || {})[q.part];
      if (tips && arr(tips).length && !S.tips[q.part] && tipOk(q) && edge(q, A[q.id])) { S.tips[q.part] = 1; return { k: 'tip', part: q.part, from: i, then: nxt }; }
      var ev = midEvery();
      if (ev && (i + 1) % ev === 0 && i + 1 < Q.length) return { k: 'mid', from: i, then: nxt };
      return nxt;
    }
    function nextAfterClose() { return P.length ? { k: 'popen' } : null; }

    function progress(sc) {
      var tot = Q.length + P.length, n = 0, label = '';
      if (sc.k === 'q') { n = sc.i; label = 'Question ' + (sc.i + 1) + ' of ' + Q.length; }
      else if (sc.k === 'plan') { n = Q.length + sc.j; label = 'Growth Plan, Part ' + (sc.j + 1) + ' of ' + P.length; }
      else if (sc.k === 'open' || sc.k === 'resume') { n = sc.k === 'resume' ? firstOpen() : 0; label = Q.length ? Q.length + ' Questions' : ''; }
      else if (sc.k === 'mid' || sc.k === 'tip') { n = sc.from + 1; label = 'Question ' + (sc.from + 1) + ' of ' + Q.length; }
      else if (sc.k === 'close') { n = Q.length; label = 'Every Question Answered'; }
      else if (sc.k === 'popen') { n = Q.length; label = 'Your Growth Plan'; }
      else if (sc.k === 'sum') { n = tot; label = 'Your Growth Plan'; }
      prog.textContent = label;
      bar.style.width = (tot ? Math.round(100 * n / tot) : 0) + '%';
    }

    function show(sc) {
      if (S.closed) return;
      S.tok++; hush(); clearTimeout(S.timer); clearTimeout(S.adv);
      S.screen = sc; progress(sc);
      bNext.hidden = true; bNext.disabled = false; bNext.onclick = null;
      bBack.hidden = false; bBack.disabled = !canBack(sc);
      ({ q: drawQ, open: drawMoment, resume: drawMoment, mid: drawMoment, tip: drawMoment, close: drawMoment, popen: drawMoment, plan: drawPlan, sum: drawSum })[sc.k](sc);
      stage.scrollTop = 0;
      var h = stage.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
    }
    function canBack(sc) {
      if (sc.k === 'q') return sc.i > 0;
      if (sc.k === 'mid' || sc.k === 'tip') return true;
      if (sc.k === 'close') return Q.length > 0;
      if (sc.k === 'popen') return Q.length > 0;
      if (sc.k === 'plan') return true;
      if (sc.k === 'sum') return P.length > 0;
      return false;
    }
    function back() {
      var sc = S.screen; if (!sc || !canBack(sc)) return;
      if (sc.k === 'q') return show({ k: 'q', i: sc.i - 1 });
      if (sc.k === 'mid' || sc.k === 'tip') return show({ k: 'q', i: sc.from });
      if (sc.k === 'close' || sc.k === 'popen') return Q.length ? show({ k: 'q', i: Q.length - 1 }) : null;
      if (sc.k === 'plan') return sc.j > 0 ? show({ k: 'plan', j: sc.j - 1 }) : Q.length ? show({ k: 'q', i: Q.length - 1 }) : show({ k: 'popen' });
      if (sc.k === 'sum') return show({ k: 'plan', j: P.length - 1 });
    }

    /* one question */
    function partCls(p) { return PARTS[p] ? ' ggd-p-' + p : ''; }
    function drawQ(sc) {
      var q = Q[sc.i], v = A[q.id], type = q.type || 'choice', ops = q.options || [];
      var prevPart = sc.i > 0 ? Q[sc.i - 1].part : null, enterList = (K.enter || {})[q.part];
      var enter = q.part !== prevPart && enterList ? lineText(anyOf(enterList)) : '';
      var body = '';
      if (type === 'scale') {
        var many = ops.length > 5;
        body = '<div class="ggd-a"><div class="ggd-scale' + (many ? ' ggd-many' : '') + '" style="--n:' + Math.max(1, ops.length) + '" role="group" aria-label="' + esc(q.text) + '">'
          + ops.map(function (x, j) { var on = v === x.v; return '<button type="button" class="ggd-dot" data-v="' + j + '" aria-pressed="' + on + '" aria-label="' + esc(x.label) + '"><span class="ggd-c">' + esc(x.short != null ? x.short : many ? j + 1 : j + 1) + '</span>' + (many ? '' : '<span class="ggd-l">' + esc(x.label) + '</span>') + '</button>'; }).join('')
          + '</div>' + (many ? '<div class="ggd-ends"><span>' + esc(q.low || (ops[0] || {}).label || '') + '</span><span>' + esc(q.high || (ops[ops.length - 1] || {}).label || '') + '</span></div><div class="ggd-chosen" aria-hidden="true">' + esc(ops.filter(function (x) { return x.v === v; }).map(function (x) { return x.label; })[0] || '') + '</div>' : '') + '</div>';
      } else if (type === 'text') {
        body = '<div class="ggd-a"><label class="ggd-sr" for="ggd-txt">' + esc(q.text) + '</label><textarea id="ggd-txt" class="ggd-txt" rows="4">' + esc(typeof v === 'string' ? v : '') + '</textarea></div>';
      } else {
        var multi = type === 'multi', cur = multi ? arr(v) : null;
        body = ops.map(function (x, j) { var on = multi ? cur.indexOf(x.v) >= 0 : v === x.v; return '<button type="button" class="ggd-opt ggd-a' + (multi ? ' ggd-multi' : '') + '" data-v="' + j + '" aria-pressed="' + on + '"><span class="ggd-k" aria-hidden="true">' + (multi ? (on ? I.check : '') : j + 1) + '</span><span>' + esc(x.label) + '</span></button>'; }).join('');
      }
      stage.innerHTML = '<section class="ggd-card' + partCls(q.part) + '">'
        + (q.part ? '<div class="ggd-eb">' + esc(partName(q.part)) + '</div>' : '')
        + (enter ? '<p class="ggd-enter">' + esc(enter) + '</p>' : '')
        + '<h2 id="ggd-h">' + esc(q.text) + '</h2>' + (q.help ? '<p class="ggd-help">' + esc(q.help) + '</p>' : '')
        + '<div class="ggd-ans">' + body + '</div></section>';
      var card = stage.firstChild;
      if (type === 'multi' || type === 'text') { bNext.hidden = false; bNext.innerHTML = 'Next' + I.next; bNext.onclick = function () { commit(q, type === 'text' ? (stage.querySelector('textarea').value || '').trim() : arr(A[q.id]).slice(), true); }; }
      else if (answered(q)) { bNext.hidden = false; bNext.innerHTML = 'Next' + I.next; bNext.onclick = function () { go(after(sc.i)); }; }
      if (type === 'multi') card.querySelectorAll('.ggd-opt').forEach(function (b) { b.addEventListener('click', function () {
        var x = ops[+b.getAttribute('data-v')], cur = arr(A[q.id]).slice(), at = cur.indexOf(x.v);
        if (at >= 0) cur.splice(at, 1); else cur.push(x.v);
        A[q.id] = cur; b.setAttribute('aria-pressed', at < 0); b.querySelector('.ggd-k').innerHTML = at < 0 ? I.check : '';
        stopVoiceSoon();
      }); });
      else if (type !== 'text') card.querySelectorAll('[data-v]').forEach(function (b) { b.addEventListener('click', function () { pick(q, ops[+b.getAttribute('data-v')], b, sc); }); });
      var go1 = function () { card.classList.add('ggd-go'); };
      var spoken = [enter, q.say || q.text].filter(Boolean);
      var started = false;
      say(spoken, function (i) { if (i === spoken.length - 1 && !started) { started = true; go1(); } }, function () { go1(); });
      if (!S.voiceOn) go1();
      var nx = Q[sc.i + 1]; prefetch(nx ? nx.say || nx.text : '');
    }
    function stopVoiceSoon() { /* a tap means the person is ready: the voice steps aside */ S.tok++; hush(); clearTimeout(S.timer); }
    function pick(q, x, b, sc) {
      stopVoiceSoon();
      b.closest('.ggd-ans').querySelectorAll('[data-v]').forEach(function (y) { y.setAttribute('aria-pressed', y === b); });
      var ch = stage.querySelector('.ggd-chosen'); if (ch) ch.textContent = x.label;
      commit(q, x.v, false);
      var tok = S.tok; clearTimeout(S.adv);
      S.adv = setTimeout(function () { if (tok === S.tok && S.screen === sc) go(after(sc.i)); }, 700);
    }
    function commit(q, v, move) {
      A[q.id] = v;
      if (typeof o.onAnswer === 'function') { try { o.onAnswer(q.id, v); } catch (e) {} }
      if (move) go(after(qIndex(q.id)));
    }
    function go(sc) { if (!sc) return finish(); show(sc); }

    /* guide moments: open, resume, mid, tip, close, and the plan's open */
    function drawMoment(sc) {
      var list = [], eb = '', cls = '', icon = I.leaf, partC = '';
      if (sc.k === 'open') { list = seq(K.open); eb = o.title || 'Guided Check-in'; icon = I.sun; }
      else if (sc.k === 'resume') { list = seq(arr(K.resume).length ? K.resume : RESUME); eb = 'Welcome Back'; icon = I.sun; }
      else if (sc.k === 'mid') { var ml = arr((K.mid || {}).lines); list = [lineText(ml[S.midN++ % ml.length])].filter(Boolean); eb = 'Keep Going'; }
      else if (sc.k === 'tip') { list = [lineText(anyOf((K.tips || {})[sc.part]))].filter(Boolean); eb = 'A Tip for ' + partName(sc.part); cls = ' ggd-tip'; partC = partCls(sc.part); }
      else if (sc.k === 'close') { list = seq(K.close); eb = 'Well Done'; icon = I.sun; }
      else if (sc.k === 'popen') { list = seq(KP.open); eb = 'Your Growth Plan'; }
      if (!list.length && sc.k !== 'close' && sc.k !== 'popen') return go(sc.k === 'open' || sc.k === 'resume' ? { k: 'q', i: sc.k === 'resume' ? firstOpen() : 0 } : sc.then);
      var head = list.length ? '' : sc.k === 'close' ? 'Every question is answered.' : 'Let’s build your Growth Plan.';
      stage.innerHTML = '<section class="ggd-card ggd-mo' + cls + partC + '"><div class="ggd-leaf" aria-hidden="true">' + icon + '</div><div class="ggd-eb">' + esc(eb) + '</div>'
        + '<h2 id="ggd-h" class="ggd-sr">' + esc(eb) + '</h2>'
        + '<div class="ggd-lines">' + (head ? '<p class="ggd-ln on">' + esc(head) + '</p>' : '') + list.map(function (t) { return '<p class="ggd-ln">' + esc(t) + '</p>'; }).join('') + '</div>' + (sc.k === 'close' && !P.length ? creditLine() : '') + '</section>';
      var ls = stage.querySelectorAll('.ggd-ln');
      var nextSc = sc.k === 'open' ? (Q.length ? { k: 'q', i: 0 } : P.length ? { k: 'plan', j: 0 } : null)
        : sc.k === 'resume' ? (firstOpen() < Q.length ? { k: 'q', i: firstOpen() } : nextAfterClose() || { k: 'close' })
        : sc.k === 'mid' || sc.k === 'tip' ? sc.then
        : sc.k === 'popen' ? { k: 'plan', j: 0 }
        : nextAfterClose();
      bNext.hidden = false;
      if (sc.k === 'close') bNext.innerHTML = P.length ? 'Build My Growth Plan' + I.next : 'Done';
      else bNext.innerHTML = (sc.k === 'popen' ? 'Let’s Begin' : 'Continue') + I.next;
      bNext.onclick = function () { go(nextSc); };
      if (sc.k === 'resume' || sc.k === 'open') bBack.hidden = true;
      if (!S.voiceOn) ls.forEach(function (x) { x.classList.add('on'); });
      var auto = sc.k !== 'close'; // the close waits for a tap: Done, or on to the Growth Plan
      say(list, function (i) { if (ls[i + (head ? 1 : 0)]) ls[i + (head ? 1 : 0)].classList.add('on'); }, function () {
        ls.forEach(function (x) { x.classList.add('on'); });
        if (auto) { var tok = S.tok; S.timer = setTimeout(function () { if (tok === S.tok) go(nextSc); }, 900); }
      }, true);
      if (nextSc && nextSc.k === 'q') { var nq = Q[nextSc.i]; prefetch(nq && (nq.say || nq.text)); }
    }

    /* one Growth Plan step: cards to choose from, up to max */
    function drawPlan(sc) {
      var st = P[sc.j], part = st.part, max = Math.max(1, +st.max || 3), mine = (PL[part] = arr(PL[part]).slice());
      var why = lineText(anyOf((KP.part || {})[part]));
      var cards = st.choices.map(function (c, j) {
        var r = rhythmOf(o.tree, part, c), on = mine.indexOf(c.name) >= 0;
        return '<div class="ggd-pc' + (on ? ' on' : '') + '" data-j="' + j + '"><button type="button" class="ggd-pick" aria-pressed="' + on + '"><span class="ggd-k" aria-hidden="true">' + I.check + '</span><span><b>' + esc(c.name) + '</b>'
          + '<span class="ggd-meta"><span class="ggd-pill r">' + esc(rhythmPill(r)) + '</span>' + (+r.min > 0 ? '<span class="ggd-pill">' + esc(r.min) + ' min</span>' : '') + '</span></span></button>'
          + (r.how.length ? '<button type="button" class="ggd-how" aria-expanded="false" aria-controls="ggd-how-' + j + '">How</button><ol class="ggd-steps" id="ggd-how-' + j + '" hidden>' + r.how.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ol>' : '')
          + '</div>';
      }).join('');
      stage.innerHTML = '<section class="ggd-card ggd-wide' + partCls(part) + '"><div class="ggd-eb">' + esc(partName(part, st)) + '</div>'
        + '<h2 id="ggd-h">' + esc(st.text || 'Choose up to ' + max + ' practices for ' + partName(part, st) + '.') + '</h2>'
        + (why ? '<p class="ggd-why">' + esc(why) + '</p>' : '')
        + '<div class="ggd-count" aria-live="polite"></div><div class="ggd-cards">' + cards + '</div><div class="ggd-full" aria-live="polite"></div></section>';
      function count() {
        stage.querySelector('.ggd-count').textContent = mine.length + ' of ' + max + ' Chosen';
        stage.querySelector('.ggd-full').textContent = mine.length >= max ? 'That’s a full set. Tap a chosen card to swap it for another.' : '';
      }
      count();
      stage.querySelectorAll('.ggd-pc').forEach(function (cd) {
        var c = st.choices[+cd.getAttribute('data-j')], pb = cd.querySelector('.ggd-pick'), hb = cd.querySelector('.ggd-how');
        pb.addEventListener('click', function () {
          var at = mine.indexOf(c.name);
          if (at >= 0) mine.splice(at, 1);
          else { if (mine.length >= max) { var full = stage.querySelector('.ggd-full'); full.textContent = 'You’ve chosen ' + max + '. Tap a chosen card first to make room.'; return; } mine.push(c.name); }
          cd.classList.toggle('on', at < 0); pb.setAttribute('aria-pressed', at < 0); count();
        });
        if (hb) hb.addEventListener('click', function () { var ol = cd.querySelector('.ggd-steps'), open = ol.hidden; ol.hidden = !open; hb.setAttribute('aria-expanded', open); hb.textContent = open ? 'Hide How' : 'How'; });
      });
      bNext.hidden = false; bNext.innerHTML = (sc.j + 1 < P.length ? 'Next' : 'See My Plan') + I.next;
      bNext.onclick = function () {
        PL[part] = mine.slice();
        if (typeof o.onPlan === 'function') { try { o.onPlan(part, PL[part].slice()); } catch (e) {} }
        go(sc.j + 1 < P.length ? { k: 'plan', j: sc.j + 1 } : { k: 'sum' });
      };
      say(why ? [why] : [], null, null);
    }

    /* the summary: here's what you're tending this season */
    function drawSum() {
      var head = 'Here\u2019s what you\u2019re tending this season.', norm = function (t) { return String(t).replace(/[\u2018\u2019]/g, "'").trim(); };
      var spoken = seq(KP.close), lead = spoken.length && norm(spoken[0]) === norm(head) ? 1 : 0, shown = spoken.slice(lead);
      var cards = P.map(function (st, j) {
        var names = arr(PL[st.part]); if (!names.length) return '';
        return '<div class="ggd-sp-card' + partCls(st.part) + '"><h3>' + esc(partName(st.part, st)) + '</h3><ul>' + names.map(function (nm) {
          var c = st.choices.filter(function (x) { return x.name === nm; })[0] || { name: nm }, r = rhythmOf(o.tree, st.part, c);
          return '<li><b>' + esc(nm) + '</b><small>' + esc(rhythmPill(r)) + (+r.min > 0 ? ', ' + esc(r.min) + ' min' : '') + '</small></li>';
        }).join('') + '</ul><button type="button" class="ggd-chg" data-j="' + j + '" aria-label="Change ' + esc(partName(st.part, st)) + '">Change</button></div>';
      }).join('');
      var chosen = P.some(function (st) { return arr(PL[st.part]).length; });
      stage.innerHTML = '<section class="ggd-card ggd-wide ggd-mo"><div class="ggd-leaf" aria-hidden="true">' + I.leaf + '</div><div class="ggd-eb">Your Growth Plan</div>'
        + '<h2 id="ggd-h" class="ggd-ln on">' + esc(head) + '</h2>'
        + '<div class="ggd-lines">' + shown.map(function (t) { return '<p class="ggd-ln">' + esc(t) + '</p>'; }).join('') + '</div>'
        + (chosen ? '<div class="ggd-sum">' + cards + '</div>' : '<p class="ggd-help">Choose a practice or two, and they\u2019ll be ready for you in Today.</p>')
        + creditLine() + '</section>';
      stage.querySelectorAll('.ggd-chg').forEach(function (b) { b.addEventListener('click', function () { show({ k: 'plan', j: +b.getAttribute('data-j') }); }); });
      var ls = stage.querySelectorAll('.ggd-lines .ggd-ln');
      if (!S.voiceOn) ls.forEach(function (x) { x.classList.add('on'); });
      bNext.hidden = false; bNext.innerHTML = 'Done'; bNext.onclick = finish;
      say(spoken, function (i) { var x = ls[i - lead]; if (x) x.classList.add('on'); }, function () { ls.forEach(function (x) { x.classList.add('on'); }); }, true);
    }
    function creditLine() { var c = musicOn() ? musicTrack(o).credit : ''; return c ? '<small class="ggd-src">Music: ' + esc(c) + '</small>' : ''; }

    /* finishing and closing */
    function result() { return { answers: Object.assign({}, A), plan: P.length ? (function () { var r = {}; P.forEach(function (st) { r[st.part] = arr(PL[st.part]).slice(); }); return r; })() : null }; }
    function finish() {
      if (S.closed) return;
      var r = result(); S.finished = true;
      if (typeof o.onDone === 'function') { try { o.onDone(r); } catch (e) {} }
      close();
    }
    function close(quiet) {
      if (S.closed) return; S.closed = true;
      S.tok++; hush(); clearTimeout(S.timer); clearTimeout(S.adv); muStop(400);
      if (S.lock) { try { S.lock.release(); } catch (e) {} S.lock = null; }
      document.removeEventListener('keydown', onKey, true); document.removeEventListener('visibilitychange', onVis);
      el.remove(); document.documentElement.classList.remove('ggd-open');
      if (CUR === api) CUR = null;
      try { if (S.prevFocus && S.prevFocus.focus && S.prevFocus.isConnected) S.prevFocus.focus(); } catch (e) {}
      if (!quiet && typeof o.onClose === 'function') { try { o.onClose(); } catch (e) {} }
    }
    // Done in the top bar: on the last screen it finishes (saving), anywhere else it closes (answers so far went through onAnswer).
    function doneTap() { var k = S.screen && S.screen.k; if (k === 'sum' || (k === 'close' && !P.length)) finish(); else close(); }

    /* controls, keys, focus, and the screen staying awake */
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-g]'); if (!b || !el.contains(b)) return;
      var g = b.getAttribute('data-g');
      if (g === 'back') back();
      else if (g === 'close') doneTap();
      else if (g === 'voice') {
        S.voiceOn = !S.voiceOn; lsSet('gg-guided-voice', S.voiceOn ? '1' : '0'); ctlLabels();
        show(S.screen); // the same screen again, now spoken or quiet
        var vb = el.querySelector('[data-g="voice"]'); if (vb) vb.focus();
      } else if (g === 'music') {
        lsSet('gg-music', musicOn() ? 'off' : 'soft'); ctlLabels();
        if (musicOn()) muPlay(o); else muStop(300);
      } else if (g === 'readall') {
        var ans = Object.assign({}, A); close(); try { o.onReadAll(ans); } catch (er) {}
      }
    });
    function onKey(e) {
      if (S.closed) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); doneTap(); return; }
      if (e.key === 'Tab') {
        var f = Array.prototype.filter.call(el.querySelectorAll('button,textarea,[href],[tabindex]:not([tabindex="-1"])'), function (x) { return !x.disabled && !x.hidden && x.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (!el.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && (document.activeElement === first || !f.length)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        return;
      }
      var sc = S.screen, tag = (document.activeElement && document.activeElement.tagName) || '';
      if (sc && sc.k === 'q' && /^[1-9]$/.test(e.key) && tag !== 'TEXTAREA' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        var bs = stage.querySelectorAll('.ggd-ans [data-v]'), b = bs[+e.key - 1]; if (b) { e.preventDefault(); b.click(); }
      }
    }
    document.addEventListener('keydown', onKey, true);
    function wake() { try { if (navigator.wakeLock && navigator.wakeLock.request && document.visibilityState === 'visible') navigator.wakeLock.request('screen').then(function (l) { if (S.closed) { try { l.release(); } catch (e) {} } else S.lock = l; }, function () {}); } catch (e) {} }
    function onVis() { if (document.visibilityState === 'visible' && !S.closed) wake(); }
    document.addEventListener('visibilitychange', onVis);
    wake();
    muPlay(o);

    var api = { el: el, close: function (quiet) { close(quiet); }, state: function () { return { screen: S.screen ? Object.assign({}, S.screen) : null, answers: Object.assign({}, A), plan: result().plan, voice: voice, voiceOn: S.voiceOn }; } };
    CUR = api;

    /* where to begin: the open, or where the person left off, or the Growth Plan on its own */
    var any = Q.some(answered), at = firstOpen();
    if (!Q.length && !P.length) show({ k: 'close' });
    else if (!Q.length) show(seq(KP.open).length ? { k: 'popen' } : { k: 'plan', j: 0 });
    else if (any && at < Q.length) show({ k: 'resume' });
    else if (any && at >= Q.length) show(P.length ? { k: 'popen' } : { k: 'close' });
    else show({ k: 'open' });
    return api;
  }

  window.GGGuided = { run: run, lines: lines, clipName: clipName, clipUrl: clipUrl, sentences: sentences, close: function () { if (CUR) CUR.close(); }, version: V };
})();
