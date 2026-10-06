/* =====================================================================
   GROUNDED . THE GROVE TREE DRAWING (shared)
   One tree per person, shaped by their life stage. The parts someone is
   tending show their colors on the tree. Used by The Grove (/grove/) and
   the Grove Guide in the Grounded Field Guide, so both draw the same tree.
   Change the drawing here, not in either page.
   ===================================================================== */
window.GGScene = (function(){
function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const ease = g => 1 - Math.pow(1 - Math.max(0, Math.min(1, g)), 2);
const f1 = n => Math.round(n * 10) / 10;
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TRUNK_TENDED = '#C27A1E';   // the Trunk part's color (PARTS in grove/data.js)
const TONE = { trunk:'#6B4A2E', bark:'#B9A8F2', barkDim:'#4F3620', branch:'#C9B79A', branchHi:'#3CC0C6',
  leaf:['#2F5A3A','#3F6B40','#4F7F4A'], leafHi:['#3E8A4E','#4FA85F','#6CC27A'], root:'#D6C3A0', rootHi:'#F2B36B',
  fruit:'#E8862E', fruitHi:'#FF6B57', ink:'#2C1810' };
const STAGE_H = { maple:.34, aspen:.6, pine:.8, adult:1, sequoia:1.06, willow:1 };      // side by side in a family grove
const STAGE_SOLO = { maple:.62, aspen:.82, pine:.92, adult:1, sequoia:1, willow:1 };  // your own tree, filling the scene
// A grown-up whose tree is Sequoia (GWG BLD 733) stands as a sequoia: stageOf(age, tree)
const stageOf = (age, tree) => age === 'maple' || age === 'aspen' || age === 'pine' ? age : tree === 'sequoia' ? 'sequoia' : 'adult';
const STAGE_NAME = { maple:'Maple', aspen:'Aspen', pine:'Pine', adult:'Oak', sequoia:'Sequoia', willow:'Willow' };
function leafPath(x, y, len, ang, col){ return `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})" d="M0 0C${f1(len*.25)} ${f1(-len*.32)} ${f1(len*.75)} ${f1(-len*.32)} ${f1(len)} 0C${f1(len*.75)} ${f1(len*.32)} ${f1(len*.25)} ${f1(len*.32)} 0 0Z" fill="${col}"/>`; }
// Roots: thick where they leave the trunk, thinning as they flow out.
function rootsOf(t, H, R){
  const col = t.parts.includes('roots') ? TONE.rootHi : TONE.root, n = {maple:3, aspen:4, pine:5, adult:6, sequoia:7, willow:6}[t.stage];
  // Sequoia roots run shallow and very wide, so they stay near the surface.
  const seq = t.stage === 'sequoia', L = H * (t.stage === 'maple' ? .9 : seq ? .78 : .62) * (t.rooting ? 1.3 : 1), w = Math.max(1.2, H * .012);
  let o = '';
  for (let i=0;i<n;i++){ const a = Math.PI * (.1 + .8 * i/(n-1)), len = L * (.75 + .35*R());
    const ex = Math.cos(a)*len, ey = Math.max(8, Math.sin(a)*len*(seq ? .28 : .55) + 6 + R()*8);
    const c1 = `${f1(ex*.25)} ${f1(ey*.1+4)}`, c2 = `${f1(ex*.72)} ${f1(ey*.7)}`;
    o += `<path d="M0 2C${c1} ${c2} ${f1(ex)} ${f1(ey)}" stroke="${col}" stroke-width="${f1(w)}" fill="none" stroke-linecap="round"/>`;
    o += `<path d="M0 2C${f1(ex*.12)} ${f1(ey*.05+3)} ${f1(ex*.3)} ${f1(ey*.25)} ${f1(ex*.42)} ${f1(ey*.38)}" stroke="${col}" stroke-width="${f1(w*2.3)}" fill="none" stroke-linecap="round"/>`;
    if (t.stage !== 'maple') o += `<path d="M${f1(ex)} ${f1(ey)}c${f1(-3*Math.sign(ex||1))} 3 ${f1(-1*Math.sign(ex||1))} 7 ${f1(3*Math.sign(ex||1))} 6" stroke="${col}" stroke-width="${f1(w*.8)}" fill="none" stroke-linecap="round"/>`;
  }
  const tw = Math.max(1.6, H*.02), tl = L*.75;
  o += `<path d="M${f1(-tw)} 0C${f1(-tw)} ${f1(tl*.3)} ${f1(-tw*.3)} ${f1(tl*.6)} 0 ${f1(tl)}C${f1(tw*.3)} ${f1(tl*.6)} ${f1(tw)} ${f1(tl*.3)} ${f1(tw)} 0Z" fill="${col}"/>`;
  return o;
}
// One tree: t = {stage, g, parts, kind, rooting, snow}. Returns the part above ground,
// the roots, a spot for a bird to perch, and its height.
function treeParts(t, maxH, seed){
  const R = rng(seed || 3), tend = id => t.parts.includes(id);
  const H = maxH * (t.solo ? STAGE_SOLO : STAGE_H)[t.stage] * (.62 + .38*ease(t.g));
  const leafs = tend('leaves') ? TONE.leafHi : TONE.leaf, fruitC = tend('fruit') ? TONE.fruitHi : TONE.fruit;
  const trunkC = tend('trunk') ? TRUNK_TENDED : (t.kind === 'birch' ? '#EDE7DA' : TONE.trunk);
  const brC = tend('branches') ? TONE.branchHi : (t.stage === 'aspen' ? TONE.trunk : TONE.branch);
  let top = '', perch = { x: H*.2, y: -H*.7 };
  if (t.stage === 'willow'){
    // Willow (Willow Build Session 2): drooping strands from a rounded crown.
    // A remembered willow stays, softer, with a small star above it.
    const soft = t.remembered, tw = H*.04, cy = -H*.72, r = H*.3;
    const dark = soft ? '#7E8A74' : (tend('leaves') ? '#4F7F4A' : '#5F7350'), light = soft ? '#A3AE97' : (tend('leaves') ? '#6CC27A' : '#8BA071');
    top += `<path d="M${f1(-tw)} 0C${f1(-tw*.8)} ${f1(-H*.3)} ${f1(-tw*.4)} ${f1(cy*.8)} ${f1(-tw*.3)} ${f1(cy)}L${f1(tw*.3)} ${f1(cy)}C${f1(tw*.4)} ${f1(cy*.8)} ${f1(tw*.8)} ${f1(-H*.3)} ${f1(tw)} 0Z" fill="${trunkC}"/>`;
    let crown = '';
    [[0,0,1],[-.6,.15,.7],[.6,.15,.7],[-.3,-.35,.6],[.3,-.35,.6]].forEach(([x,y,k]) => { crown += `<circle cx="${f1(x*r)}" cy="${f1(cy+y*r)}" r="${f1(k*r*.62+1.6)}" fill="${TONE.ink}"/>`; });
    [[0,0,1],[-.6,.15,.7],[.6,.15,.7],[-.3,-.35,.6],[.3,-.35,.6]].forEach(([x,y,k],i) => { crown += `<circle cx="${f1(x*r)}" cy="${f1(cy+y*r)}" r="${f1(k*r*.62)}" fill="${i%2?light:dark}"/>`; });
    top += crown;
    const n = 15, sw = Math.max(1.6, H*.022);
    for (let i=0;i<n;i++){ const x = (-1 + 2*i/(n-1))*r*1.05, y0 = cy - r*.25 + Math.abs(x)/r*r*.25, len = H*(.45 + .25*R())*(1 - Math.abs(x)/r*.35);
      top += `<path d="M${f1(x)} ${f1(y0)}Q${f1(x*1.08)} ${f1(y0+len*.5)} ${f1(x*1.12)} ${f1(Math.min(-2, y0+len))}" stroke="${i%2?light:dark}" stroke-width="${f1(sw)}" fill="none" stroke-linecap="round"/>`; }
    if (tend('fruit') && !soft) [[-.4,.1],[.35,0],[.05,-.3]].forEach(([x,y]) => { top += `<circle cx="${f1(x*r)}" cy="${f1(cy+y*r)}" r="${f1(Math.max(2.2,H*.016))}" fill="${fruitC}"/>`; });
    if (soft) top += `<path transform="translate(${f1(r*.9)} ${f1(cy-r*1.1)}) scale(${f1(Math.max(.8,H/90))})" d="M0-6L1.6-1.6 6 0 1.6 1.6 0 6-1.6 1.6-6 0-1.6-1.6Z" fill="#E8C27A"/>`;
    perch = { x: r*.5, y: cy - r*.5 };
  } else if (t.stage === 'sequoia'){
    // Sequoia (GWG BLD 733): a massive red trunk that flares wide at the ground, short limbs,
    // and a narrow, high crown in rounded tiers.
    const tw = H*.07, cy0 = -H*.42, top0 = -H, red = tend('trunk') ? TRUNK_TENDED : '#8E3B22';
    top += `<path d="M${f1(-tw*2.2)} 0C${f1(-tw*1.1)} ${f1(-H*.02)} ${f1(-tw)} ${f1(-H*.08)} ${f1(-tw*.95)} ${f1(-H*.18)}L${f1(-tw*.45)} ${f1(-H*.86)}L${f1(tw*.45)} ${f1(-H*.86)}L${f1(tw*.95)} ${f1(-H*.18)}C${f1(tw)} ${f1(-H*.08)} ${f1(tw*1.1)} ${f1(-H*.02)} ${f1(tw*2.2)} 0Z" fill="${red}" stroke="${TONE.ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
    top += `<path d="M${f1(-tw*.4)} ${f1(-H*.03)}L${f1(-tw*.22)} ${f1(-H*.4)}M${f1(tw*.35)} ${f1(-H*.03)}L${f1(tw*.2)} ${f1(-H*.42)}" stroke="${tend('bark') ? TONE.bark : '#5E2414'}" stroke-width="${f1(Math.max(1.2,H*.01))}" fill="none" stroke-linecap="round" opacity=".8"/>`;
    [[-1,.48],[1,.56],[-1,.64],[1,.72]].forEach(([sd,k]) => { top += `<path d="M${f1(sd*tw*.4)} ${f1(-H*k)}l${f1(sd*H*.09)} ${f1(-H*.03)}" stroke="${brC === TONE.branch ? '#6B2A18' : brC}" stroke-width="${f1(Math.max(1.6,H*.016))}" stroke-linecap="round"/>`; });
    const pal = tend('leaves') ? ['#3E8A4E','#4FA85F','#6CC27A'] : ['#2F5A3A','#3F6B40','#56804C'];
    const tiers = [[.44,.15],[.52,.17],[.6,.17],[.68,.155],[.76,.13],[.84,.1],[.92,.07]];
    let out = '', crown = '';
    tiers.forEach(([k,wk],i) => { const y = -H*k, w = H*wk; [[-.55,.9],[0,1],[.55,.9]].forEach(([x,r]) => {
      out += `<circle cx="${f1(x*w)}" cy="${f1(y)}" r="${f1(r*w*.62+1.4)}" fill="${TONE.ink}"/>`; crown += `<circle cx="${f1(x*w)}" cy="${f1(y)}" r="${f1(r*w*.62)}" fill="${pal[(i+(x>0?1:0))%3]}"/>`; }); });
    out += `<circle cx="0" cy="${f1(top0*.97)}" r="${f1(H*.05+1.4)}" fill="${TONE.ink}"/>`; crown += `<circle cx="0" cy="${f1(top0*.97)}" r="${f1(H*.05)}" fill="${pal[2]}"/>`;
    top += out + crown;
    if (t.g > .5 || tend('fruit')) [[-.06,.5],[.07,.62],[-.05,.74],[.04,.84]].forEach(([x,k]) => { top += `<ellipse cx="${f1(x*H)}" cy="${f1(-H*k)}" rx="${f1(Math.max(2,H*.014))}" ry="${f1(Math.max(2.6,H*.02))}" fill="${tend('fruit') ? TONE.fruitHi : '#8A5A2B'}" stroke="${TONE.ink}" stroke-width=".8"/>`; });
    perch = { x: H*.12, y: -H*.6 };
  } else if (t.stage === 'pine'){
    // Pine (GWG BLD 739): a tall straight trunk and ragged, layered boughs that reach out
    // unevenly to each side, widest low and narrowing to a spire.
    const tw = H*.038, pal = tend('leaves') ? ['#3E8A4E','#4FA85F','#6CC27A'] : ['#24503A','#2E6244','#3B7350'];
    top += `<path d="M${f1(-tw)} 0C${f1(-tw*.85)} ${f1(-H*.3)} ${f1(-tw*.4)} ${f1(-H*.7)} ${f1(-tw*.15)} ${f1(-H*.97)}L${f1(tw*.15)} ${f1(-H*.97)}C${f1(tw*.4)} ${f1(-H*.7)} ${f1(tw*.85)} ${f1(-H*.3)} ${f1(tw)} 0Z" fill="${trunkC}" stroke="${TONE.ink}" stroke-width="1" stroke-linejoin="round"/>`;
    top += `<path d="M${f1(-tw*.35)} ${f1(-H*.04)}c2 ${f1(-H*.06)} -2 ${f1(-H*.12)} 0 ${f1(-H*.2)}" stroke="${tend('bark') ? TONE.bark : TONE.barkDim}" stroke-width="${f1(Math.max(1.2,H*.011))}" fill="none" stroke-linecap="round" opacity="${tend('bark') ? 1 : .6}"/>`;
    const tiers = 6, d = H*.15, bw = f1(Math.max(1.4, H*.012));
    let boughs = '', first = null;
    for (let i=0;i<tiers;i++){
      const y = -H*(.3 + i*.11), base = H*(.31 - i*.045), wl = base*(.85 + R()*.3), wr = base*(.85 + R()*.3), dd = d*(1 - i*.06);
      if (!first) first = { y, wr };
      const n = 5 + (i < 3 ? 2 : 0); let edge = '';
      for (let j=1;j<n;j++){ const x = wr - (wr + wl)*j/n, dip = (j%2 ? H*.024 : -H*.004) * (.7 + R()*.6); edge += `L${f1(x)} ${f1(y + dip)}`; }
      boughs += `<path d="M${f1(-wl)} ${f1(y)}Q${f1(-wl*.45)} ${f1(y-dd*.55)} 0 ${f1(y-dd)}Q${f1(wr*.45)} ${f1(y-dd*.55)} ${f1(wr)} ${f1(y)}${edge}Z" fill="${pal[i%3]}" stroke="${TONE.ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
      boughs += `<path d="M0 ${f1(y-dd*.25)}L${f1(-wl*.7)} ${f1(y-dd*.05)}M0 ${f1(y-dd*.35)}L${f1(wr*.7)} ${f1(y-dd*.12)}" stroke="${brC}" stroke-width="${bw}" fill="none" stroke-linecap="round" opacity="${tend('branches') ? 1 : .55}"/>`;
      if (t.snow) boughs += `<path d="M${f1(-wl*.5)} ${f1(y-dd*.5)}Q${f1(-wl*.2)} ${f1(y-dd*.85)} 0 ${f1(y-dd)}Q${f1(wr*.2)} ${f1(y-dd*.85)} ${f1(wr*.5)} ${f1(y-dd*.5)}Z" fill="#FFFFFF" opacity=".9"/>`;
    }
    const tipY = -H*(.3 + (tiers-1)*.11) - d*.6;
    boughs += `<path d="M${f1(-H*.04)} ${f1(tipY+H*.02)}L0 ${f1(-H)}L${f1(H*.04)} ${f1(tipY+H*.02)}Z" fill="${pal[2]}" stroke="${TONE.ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
    top += boughs;
    if (t.g > .55 || tend('fruit')) [[-.16,.36],[.19,.47],[-.12,.58],[.1,.69]].forEach(([x,k]) => { top += `<ellipse cx="${f1(x*H)}" cy="${f1(-H*k+H*.02)}" rx="${f1(Math.max(1.8,H*.012))}" ry="${f1(Math.max(2.6,H*.02))}" fill="${tend('fruit') ? TONE.fruitHi : '#8A5A2B'}" stroke="${TONE.ink}" stroke-width=".8"/>`; });
    perch = { x: first.wr*.75, y: first.y - d*.5 };
  } else if (t.stage === 'maple'){
    const lc = tend('leaves') ? ['#4FA85F','#7ED36A'] : ['#6CB34A','#9CD06A'];
    top += `<path d="M0 0Q-3 ${f1(-H*.5)} 0 ${f1(-H)}" stroke="${trunkC}" stroke-width="${f1(Math.max(2.4, H*.05))}" fill="none" stroke-linecap="round"/>`;
    top += leafPath(0, -H*.72, H*.42, 200, lc[0]) + leafPath(0, -H*.86, H*.42, -25, lc[1]);
    if (t.g > .5) top += leafPath(0, -H*.45, H*.32, 160, lc[0]) + leafPath(0, -H*.55, H*.3, 15, lc[1]);
    top += `<circle cx="0" cy="${f1(-H)}" r="${f1(Math.max(3, H*(tend('fruit')?.09:.07)))}" fill="${tend('fruit')?TONE.fruitHi:'#E86A5E'}"/>`;
    if (tend('bark')) top += `<path d="M1.5 ${f1(-H*.2)}v${f1(-H*.12)}M-1.5 ${f1(-H*.4)}v${f1(-H*.1)}" stroke="${TONE.bark}" stroke-width="1.6" stroke-linecap="round"/>`;
    perch = { x: H*.75, y: -6 };
  } else if (t.stage === 'aspen' && t.kind !== 'pine'){
    const lc = t.kind === 'maple' ? ['#D9483F','#E8962E'] : t.kind === 'birch' ? ['#9CCB5A','#C8E07A'] : [leafs[1], leafs[2]];
    top += `<path d="M0 0Q-4 ${f1(-H*.5)} 0 ${f1(-H)}" stroke="${trunkC}" stroke-width="${f1(Math.max(3, H*.035))}" fill="none" stroke-linecap="round"/>`;
    if (t.kind === 'birch') top += `<path d="M-1 ${f1(-H*.25)}h3M-1 ${f1(-H*.45)}h3" stroke="#2A2A2A" stroke-width="2"/>`;
    const tips = [[-.34,-.62,-150],[.36,-.74,-30],[-.2,-.86,-120],[.12,-.95,-70]];
    tips.forEach(([x,y],i) => { top += `<path d="M0 ${f1(y*H+H*.14)}Q${f1(x*H*.5)} ${f1(y*H+H*.06)} ${f1(x*H)} ${f1(y*H)}" stroke="${brC}" stroke-width="${f1(Math.max(1.8, H*.016))}" fill="none" stroke-linecap="round"/>`; });
    tips.forEach(([x,y,a],i) => { top += leafPath(x*H, y*H, H*.2, a, lc[i%2]) + leafPath(x*H, y*H, H*.18, a+60, lc[(i+1)%2]); });
    if (tend('bark')) top += `<path d="M1.5 ${f1(-H*.2)}v${f1(-H*.1)}M-1.8 ${f1(-H*.35)}v${f1(-H*.08)}" stroke="${TONE.bark}" stroke-width="1.8" stroke-linecap="round"/>`;
    if (t.g > .55 || tend('fruit')) [[-.34,-.62],[.36,-.74]].forEach(([x,y]) => { top += `<circle cx="${f1(x*H)}" cy="${f1(y*H-2)}" r="${f1(Math.max(2.4,H*.02))}" fill="${fruitC}"/>`; });
    perch = { x: .36*H, y: -.74*H - 6 };
  } else {
    // Oak, or another stage drawn as the pine kind
    const big = t.stage === 'adult', cy = -H*.6, r = H*(big ? .3 : .28), tw = H*(big ? .045 : .036);
    top += `<path d="M${f1(-tw)} 0C${f1(-tw*.8)} ${f1(-H*.3)} ${f1(-tw*.5)} ${f1(cy*.7)} ${f1(-tw*.45)} ${f1(cy)}L${f1(tw*.45)} ${f1(cy)}C${f1(tw*.5)} ${f1(cy*.7)} ${f1(tw*.8)} ${f1(-H*.3)} ${f1(tw)} 0Z" fill="${trunkC}"/>`;
    if (t.kind === 'birch') [.2,.35,.5].forEach(k => { top += `<path d="M${f1(-tw*.5)} ${f1(-H*k)}h${f1(tw*.7)}" stroke="#2A2A2A" stroke-width="${f1(Math.max(1.5,H*.012))}" stroke-linecap="round"/>`; });
    top += tend('bark') ? `<path d="M${f1(-tw*.35)} ${f1(-H*.06)}c2 ${f1(-H*.08)} -2 ${f1(-H*.14)} 0 ${f1(-H*.22)}M${f1(tw*.3)} ${f1(-H*.14)}c-2 ${f1(-H*.07)} 2 ${f1(-H*.13)} 0 ${f1(-H*.2)}" stroke="${TONE.bark}" stroke-width="${f1(Math.max(1.6,H*.012))}" fill="none" stroke-linecap="round"/>`
      : t.kind === 'birch' ? '' : `<path d="M${f1(-tw*.35)} ${f1(-H*.06)}c2 ${f1(-H*.08)} -2 ${f1(-H*.14)} 0 ${f1(-H*.22)}" stroke="${TONE.barkDim}" stroke-width="1.2" fill="none" opacity=".6"/>`;
    if (t.kind === 'pine'){
      const tiers = 5; let tr = '';
      for (let i=0;i<tiers;i++){ const y = -H*(.22 + i*.16), w = H*(.34 - i*.055);
        tr += `<path d="M${f1(-w)} ${f1(y)}L0 ${f1(y-H*.3)}L${f1(w)} ${f1(y)}Z" fill="${i%2?(tend('leaves')?'#3E8A4E':'#2E6B4A'):(tend('leaves')?'#4FA85F':'#255E40')}" stroke="${TONE.ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
        if (t.snow) tr += `<path d="M${f1(-w*.35)} ${f1(y-H*.2)}L0 ${f1(y-H*.3)}L${f1(w*.35)} ${f1(y-H*.2)}Z" fill="#FFFFFF" opacity=".9"/>`; }
      top += tr;
      if (big || t.g > .55 || tend('fruit')) for (let i=0;i<(big?5:3);i++){ const y = -H*(.3 + R()*.5), x = (R()-.5)*H*.3*(1-(-y/H-.3)); top += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(2.4,H*.018))}" fill="${fruitC}" stroke="${TONE.ink}" stroke-width=".8"/>`; }
      perch = { x: H*.22, y: -H*.36 };
    } else {
      const blobs = [[0,0,1],[-.78,.34,.72],[.78,.34,.72],[-.45,-.6,.72],[.45,-.6,.72],[0,-.95,.62],[0,.5,.66]];
      const pal = t.kind === 'maple' ? (tend('leaves') ? ['#E0503F','#F09A3A','#F7C24A'] : ['#C0392B','#D9483F','#E8962E'])
        : t.kind === 'birch' ? (tend('leaves') ? ['#8FD05A','#B9E274','#6FBF4E'] : ['#7DB34A','#9CCB5A','#B7D96A']) : leafs;
      let crown = '', out = '';
      blobs.forEach(([x,y,k],i) => { out += `<circle cx="${f1(x*r)}" cy="${f1(cy+y*r)}" r="${f1(k*r+1.6)}" fill="${TONE.ink}"/>`; crown += `<circle cx="${f1(x*r)}" cy="${f1(cy+y*r)}" r="${f1(k*r)}" fill="${pal[i%3]}"/>`; });
      crown += `<circle cx="${f1(-r*.25)}" cy="${f1(cy-r*.2)}" r="${f1(r*.45)}" fill="${pal[2]}" opacity=".7"/>`;
      if (t.snow) [[0,-.95,.62],[-.45,-.6,.72],[.45,-.6,.72]].forEach(([x,y,k]) => { crown += `<path d="M${f1(x*r-k*r*.7)} ${f1(cy+y*r-k*r*.55)}Q${f1(x*r)} ${f1(cy+y*r-k*r*1.15)} ${f1(x*r+k*r*.7)} ${f1(cy+y*r-k*r*.55)}Z" fill="#FFFFFF" opacity=".92"/>`; });
      top += out + crown;
      const bw = f1(Math.max(1.6, H*.011));
      top += `<path d="M0 ${f1(cy+r*.7)}L0 ${f1(cy-r*.3)}M0 ${f1(cy+r*.4)}Q${f1(-r*.35)} ${f1(cy+r*.15)} ${f1(-r*.62)} ${f1(cy+r*.05)}M0 ${f1(cy+r*.15)}Q${f1(r*.35)} ${f1(cy-r*.12)} ${f1(r*.6)} ${f1(cy-r*.2)}M0 ${f1(cy-r*.1)}Q${f1(-r*.2)} ${f1(cy-r*.4)} ${f1(-r*.35)} ${f1(cy-r*.62)}" stroke="${brC}" stroke-width="${bw}" fill="none" stroke-linecap="round"/>`;
      const nf = big ? 7 : 4;
      if (big || t.g > .55 || tend('fruit')) for (let i=0;i<nf;i++){ const a = R()*Math.PI*2, d = r*(.25 + R()*.6);
        top += `<circle cx="${f1(Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d*.8)}" r="${f1(Math.max(2.4, r*.075))}" fill="${fruitC}" stroke="${TONE.ink}" stroke-width=".9"/>`; }
      perch = { x: r*.62, y: cy - r*.92 };
    }
  }
  return { top, roots: rootsOf(t, H, R), perch, H };
}
const SKIES = {
 dawn:["#F2D3A8","#C9D9C3"], day:["#CBE0DA","#EEF2E3"], dusk:["#E2A57E","#8C7DA0"], night:["#16233A","#2A3E47"]
};
function skyNow(){ const h = new Date().getHours(); return h>=5&&h<10?'dawn':h>=10&&h<17?'day':h>=17&&h<20?'dusk':'night'; }
const FAR = { day:['#A9C0A4','#8FAE8E'], dawn:['#B7BFA0','#9AAE8E'], dusk:['#7E6F86','#6A5E78'], night:['#1D302B','#24382F'],
  autumn:['#C99A5E','#B07A3A'], winter:['#C9D6D2','#AFC2BD'] };
function butterflySVG(i, R, gy){ return `<g class="butterfly" style="animation-delay:${-i*2.3}s" transform="translate(${i*170} ${i%2?-26:10})"><g transform="translate(${f1(260+R()*300)} ${f1(gy*.4)})"><ellipse class="wing" cx="-6" cy="0" rx="7" ry="9" fill="#E9B949"/><ellipse class="wing r" cx="6" cy="0" rx="7" ry="9" fill="#F2C94C"/><ellipse class="wing" cx="-5" cy="7" rx="4" ry="5" fill="#D9674C"/><ellipse class="wing r" cx="5" cy="7" rx="4" ry="5" fill="#D9674C"/><path d="M0 -8v18" stroke="#3A2A1E" stroke-width="2" stroke-linecap="round"/></g></g>`; }
function critterSVG(id, x, y){
  if (id === 'ladybug') return `<g transform="translate(${f1(x)} ${f1(y)})"><circle r="4.2" fill="#D8352A"/><circle cx="3.4" cy="-2.4" r="2" fill="#1B1B1B"/><path d="M-3 3L3 -3" stroke="#1B1B1B" stroke-width=".8"/><circle cx="-1.6" cy="-1" r=".9" fill="#1B1B1B"/><circle cx="1.2" cy="1.8" r=".9" fill="#1B1B1B"/></g>`;
  if (id === 'bird') return `<g transform="translate(${f1(x)} ${f1(y)}) scale(1.4)"><path d="M-8 1L-15 4L-8 4Z" fill="#3E5E82"/><ellipse rx="8" ry="5.5" fill="#4E78A6"/><path d="M-2 1C0 6 5 6 7 1Z" fill="#D9864A"/><circle cx="6" cy="-4" r="3.6" fill="#4E78A6"/><path d="M9.2 -4.4L12 -3.6L9.2 -2.8Z" fill="#E0A33A"/><circle cx="7" cy="-4.6" r=".8" fill="#141414"/><path d="M-1 5.5V8M2 5.5V8" stroke="#3A2A1E" stroke-width=".9"/></g>`;
  if (id === 'bunny') return `<g transform="translate(${f1(x)} ${f1(y)}) scale(1.5)"><ellipse cy="-7" rx="9" ry="7.5" fill="#C9B59B"/><circle cx="7" cy="-14" r="5" fill="#C9B59B"/><path d="M6 -18C4 -28 6 -31 8 -30C9 -26 9 -22 8 -18ZM9 -18C10 -27 13 -29 14 -27C14 -24 12 -20 10 -17Z" fill="#C9B59B"/><circle cx="-8.5" cy="-6" r="3" fill="#F4EEE4"/><circle cx="9" cy="-15" r="1" fill="#2A1E14"/></g>`;
  return '';
}
// o = {w, h, gy, trees:[{stage,g,parts,kind,label}], sky, scenery, rooting, visitors:[ids], uid, seed, label}
function groveSceneSVG(o){
  const W = o.w||1000, Hh = o.h||400, gy = o.gy, R = rng(o.seed||7), id = o.uid||'s', sc = o.scenery || 'forest';
  const skyKey = sc === 'dusk' ? 'dusk' : (o.sky||'day');
  let defs = '', bg = '';
  const s = sc === 'winter' && skyKey !== 'night' ? ['#DCE6EA','#F3F5F1'] : SKIES[skyKey];
  defs += `<linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s[0]}"/><stop offset="1" stop-color="${s[1]}"/></linearGradient>`;
  bg += `<rect width="${W}" height="${gy+10}" fill="url(#${id}sky)"/>`;
  if (skyKey==='night'){ for (let i=0;i<46;i++) bg += `<circle cx="${f1(R()*W)}" cy="${f1(R()*(gy-30))}" r="${f1(.6+R()*1.3)}" fill="#F4EBDA" opacity="${f1(.35+R()*.6)}"/>`; bg += `<circle cx="945" cy="${f1(gy*.26)}" r="20" fill="#F4EBDA"/><circle cx="954" cy="${f1(gy*.26-5)}" r="18" fill="#1A2940"/>`; }
  else { const sy = gy*(skyKey==='day'?.2:skyKey==='dusk'?.34:.3), sn = skyKey==='dusk'?'#F2B26B':skyKey==='dawn'?'#F7D48A':'#FFF3C9';
    bg += `<circle cx="945" cy="${f1(sy)}" r="40" fill="${sn}" opacity=".35"/><circle cx="945" cy="${f1(sy)}" r="24" fill="${sn}"/>`;
    for (let i=0;i<3;i++){ const cx = 260+i*250+R()*60, cy = gy*(.14+R()*.14); bg += `<g fill="#fff" opacity="${skyKey==='day'?.7:.35}"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="48" ry="12"/><ellipse cx="${f1(cx+26)}" cy="${f1(cy-8)}" rx="28" ry="12"/></g>`; } }
  const far = sc === 'autumn' ? FAR.autumn : sc === 'winter' && skyKey !== 'night' ? FAR.winter : FAR[skyKey] || FAR.day;
  [[far[0], 60, 95, 30], [far[1], 34, 60, 24]].forEach(([c, hmin, hmax, step]) => { let d = '', x = -10;
    while (x < W + 20){ const h = hmin + R()*(hmax-hmin), w = 12 + R()*8; d += `M${f1(x-w)} ${gy+2}L${f1(x)} ${f1(gy-h)}L${f1(x+w)} ${gy+2}Z`;
      if (sc === 'winter' && skyKey !== 'night') bg += `<path d="M${f1(x-w*.3)} ${f1(gy-h*.7)}L${f1(x)} ${f1(gy-h)}L${f1(x+w*.3)} ${f1(gy-h*.7)}Z" fill="#fff" opacity=".85"/>`;
      x += step + R()*10; }
    bg = bg.replace(/$/, '') + `<path d="${d}" fill="${c}"/>`; });
  if (sc === 'lake'){ const lc = skyKey === 'night' ? '#2B4556' : skyKey === 'dusk' ? '#9B8AA8' : '#86B8CB';
    bg += `<path d="M0 ${gy-18}Q${W*.5} ${gy-30} ${W} ${gy-16}V${gy+4}H0Z" fill="${lc}"/><path d="M${W*.18} ${gy-12}h60M${W*.55} ${gy-16}h80M${W*.8} ${gy-10}h50" stroke="#fff" stroke-width="2" opacity=".5" stroke-linecap="round"/>`; }
  const layers = ['#6B4E33','#5B412B','#4D3624','#402D1F','#35251A'];
  const depth = Hh - gy, band = depth / layers.length; let soil = '';
  layers.forEach((c,i)=>{ const y = gy + i*band + (i? 0: -2); const a = 5+R()*6;
    soil += `<path d="M0 ${f1(y)}C${f1(W*.2)} ${f1(y-a)} ${f1(W*.38)} ${f1(y+a)} ${f1(W*.55)} ${f1(y)}S${f1(W*.85)} ${f1(y-a)} ${W} ${f1(y+2)}V${Hh}H0Z" fill="${c}"/>`; });
  for (let i=0;i<60;i++){ const x = R()*W, y = gy + 12 + R()*(depth-16); soil += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(1+R()*3.4)}" ry="${f1(.8+R()*2)}" fill="${R()>.5?'#8A6B4C':'#2A1D13'}" opacity="${f1(.25+R()*.4)}"/>`; }
  let ground = `<path d="M0 ${gy}C${W*.2} ${gy-5} ${W*.38} ${gy+5} ${W*.55} ${gy}S${W*.85} ${gy-5} ${W} ${gy+2}" fill="none" stroke="${sc==='winter'?'#FFFFFF':'#2C1810'}" stroke-width="${sc==='winter'?5:2}" opacity="${sc==='winter'?.9:.55}"/>`;
  if (sc !== 'winter') for (let i=0;i<60;i++){ const x = R()*W, h = 5+R()*9; ground += `<path d="M${f1(x)} ${gy+1}l${f1(-2+R()*1)} ${f1(-h)}M${f1(x+2)} ${gy+1}l${f1(1+R()*2)} ${f1(-h*.8)}" stroke="${sc==='autumn'?'#B08A4A':'#5E8C3F'}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`; }
  const n = o.trees.length, gap = Math.min(300, 820/Math.max(1,n)), left = 500 - gap*(n-1)/2, maxH = (gy - 14) / 1.08;
  let roots = '', tops = '', labels = '', vis = '';
  o.trees.forEach((t, i) => { const x = n === 1 ? 500 : left + gap*i, tp = treeParts(Object.assign({ rooting:o.rooting, snow: sc==='winter', solo: n === 1 }, t), maxH, (o.seed||7) + i*31);
    roots += `<g transform="translate(${f1(x)} ${gy})">${tp.roots}</g>`;
    tops += `<g transform="translate(${f1(x)} ${gy})" data-x="${f1(x)}"><g class="sway" style="animation-delay:${f1(-R()*6)}s">${tp.top}</g></g>`;
    if (t.label) labels += `<text x="${f1(x)}" y="${f1(Hh - 18)}" text-anchor="middle" font-family="Barlow, Arial, sans-serif" font-weight="600" font-size="${n > 10 ? 15 : n > 7 ? 18 : 22}" fill="#F4EBDA" stroke="#2C1810" stroke-width="${n > 10 ? 4 : 5}" paint-order="stroke" stroke-linejoin="round">${esc(t.label)}</text>`;
    if (i === 0 && o.visitors){ const V = o.visitors;
      if (V.includes('ladybug')) vis += critterSVG('ladybug', x + Math.max(16, tp.H*.12), gy - 5);
      if (V.includes('bird')) vis += critterSVG('bird', x + tp.perch.x, gy + tp.perch.y);
      if (V.includes('bunny')) vis += critterSVG('bunny', Math.min(W - 40, x + Math.max(70, tp.H*.55)), gy + 2);
      V.filter(v => v.startsWith('butterfly')).forEach((v, k) => { vis += butterflySVG(k, R, gy); });
    } });
  return `<svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.label||'A grove seen in cross section')}"><defs>${defs}</defs>${bg}${soil}${roots}${ground}<g class="plants">${tops}</g>${labels}${vis}</svg>`;
}
return { stageOf, STAGE_NAME, skyNow, treeParts, sceneSVG: groveSceneSVG, critterSVG };
})();
