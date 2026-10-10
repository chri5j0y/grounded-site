/* Grounded profile pictures, shared by every tool.
   A picture is stored as a short string in each tool's own saved data:
   "av:fox" for an illustrated avatar, or a small "data:image/jpeg..." for an uploaded photo.
   Photos are cropped to a square, shrunk to 160 pixels, and never leave this device.
   Usage: GGAv.html(value, name, size)  and  GGAv.pick({ value, name, photo:true, prefer:'friendly'|'bold', onPick })  */
(function () {
  var C = function (bg, inner) { return '<circle cx="40" cy="40" r="38" fill="' + bg + '"/>' + inner; };
  var K = function (bg, inner, id) { return '<defs><clipPath id="gga-' + id + '"><circle cx="40" cy="40" r="38"/></clipPath></defs><g clip-path="url(#gga-' + id + ')"><rect width="80" height="80" fill="' + bg + '"/>' + inner + '</g>'; };
  var A = [
    /* friendly set */
    ['fox', 'Fox', 'f', C('#FCE3CF', '<path d="M18 26l10 14M62 26l-10 14" stroke="#D9772E" stroke-width="7" stroke-linecap="round"/><path d="M40 62c-14 0-22-10-22-20c0-8 8-14 22-14s22 6 22 14c0 10-8 20-22 20z" fill="#E08A3C"/><path d="M40 62c-8 0-13-5-14-10c5 2 9 2 14 2s9 0 14-2c-1 5-6 10-14 10z" fill="#FFF5EA"/><circle cx="32" cy="42" r="2.4" fill="#2C1810"/><circle cx="48" cy="42" r="2.4" fill="#2C1810"/><circle cx="40" cy="52" r="2.6" fill="#2C1810"/>')],
    ['owl', 'Owl', 'f', C('#E3DAF7', '<path d="M22 30q18-16 36 0v24q-18 12-36 0z" fill="#8A6A4A"/><path d="M26 22l6 8M54 22l-6 8" stroke="#8A6A4A" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="38" r="7" fill="#FFF5EA"/><circle cx="48" cy="38" r="7" fill="#FFF5EA"/><circle cx="32" cy="38" r="3.4" fill="#2C1810"/><circle cx="48" cy="38" r="3.4" fill="#2C1810"/><path d="M37 46l3 5l3-5z" fill="#E8B23A"/>')],
    ['bunny', 'Bunny', 'f', C('#DCEFE6', '<ellipse cx="32" cy="22" rx="5" ry="14" fill="#EDE6DC"/><ellipse cx="48" cy="22" rx="5" ry="14" fill="#EDE6DC"/><ellipse cx="32" cy="22" rx="2.2" ry="9" fill="#F5C6CF"/><ellipse cx="48" cy="22" rx="2.2" ry="9" fill="#F5C6CF"/><circle cx="40" cy="46" r="17" fill="#EDE6DC"/><circle cx="34" cy="44" r="2.2" fill="#2C1810"/><circle cx="46" cy="44" r="2.2" fill="#2C1810"/><path d="M38 50h4l-2 2z" fill="#E58FB0"/>')],
    ['turtle', 'Turtle', 'f', C('#D8F3FF', '<ellipse cx="38" cy="46" rx="20" ry="14" fill="#6E9A5B"/><path d="M28 42l10-6l10 6l-4 9h-12z" fill="#8FB070"/><circle cx="62" cy="44" r="6" fill="#9DB883"/><circle cx="64" cy="42" r="1.4" fill="#2C1810"/><path d="M24 58l-2 5M52 58l2 5" stroke="#9DB883" stroke-width="4" stroke-linecap="round"/>')],
    ['bee', 'Bee', 'f', C('#FFF3C4', '<ellipse cx="30" cy="30" rx="9" ry="6" fill="#FFFFFF" opacity=".9"/><ellipse cx="50" cy="30" rx="9" ry="6" fill="#FFFFFF" opacity=".9"/><ellipse cx="40" cy="46" rx="15" ry="11" fill="#F2B33D"/><path d="M34 37v18M40 36v20M46 37v18" stroke="#2C1810" stroke-width="3"/><circle cx="54" cy="44" r="1.8" fill="#2C1810"/>')],
    ['hedgehog', 'Hedgehog', 'f', C('#F3E1D8', '<path d="M18 50q2-24 26-26q16 2 18 18l6 4l-6 4q-6 10-22 10q-18 0-22-10z" fill="#8A6A4A"/><g stroke="#5E4530" stroke-width="2" stroke-linecap="round"><path d="M22 40l-4-4M28 32l-2-6M36 28l0-6M44 28l2-6"/></g><path d="M44 52q10 4 20-6l4 4l-6 4q-8 6-18-2z" fill="#E8D2B8"/><circle cx="56" cy="44" r="1.8" fill="#2C1810"/><circle cx="67" cy="49" r="2" fill="#2C1810"/>')],
    ['bear', 'Bear cub', 'f', C('#EAF3E0', '<circle cx="26" cy="26" r="7" fill="#8A5A34"/><circle cx="54" cy="26" r="7" fill="#8A5A34"/><circle cx="40" cy="44" r="19" fill="#9C6A40"/><ellipse cx="40" cy="51" rx="9" ry="7" fill="#E8D2B8"/><circle cx="33" cy="41" r="2.3" fill="#2C1810"/><circle cx="47" cy="41" r="2.3" fill="#2C1810"/><ellipse cx="40" cy="48" rx="3" ry="2.2" fill="#2C1810"/>')],
    ['fawn', 'Fawn', 'f', C('#FDEFD9', '<ellipse cx="24" cy="30" rx="8" ry="4" transform="rotate(-25 24 30)" fill="#C98A56"/><ellipse cx="56" cy="30" rx="8" ry="4" transform="rotate(25 56 30)" fill="#C98A56"/><path d="M28 32q12-10 24 0l-4 22q-8 8-16 0z" fill="#C98A56"/><g fill="#FFF5EA"><circle cx="34" cy="36" r="1.4"/><circle cx="46" cy="36" r="1.4"/><circle cx="40" cy="33" r="1.2"/></g><circle cx="34" cy="43" r="2.2" fill="#2C1810"/><circle cx="46" cy="43" r="2.2" fill="#2C1810"/><ellipse cx="40" cy="54" rx="3" ry="2" fill="#2C1810"/>')],
    ['frog', 'Frog', 'f', C('#E1F4F7', '<ellipse cx="40" cy="48" rx="22" ry="15" fill="#6FB35A"/><circle cx="29" cy="33" r="8" fill="#6FB35A"/><circle cx="51" cy="33" r="8" fill="#6FB35A"/><circle cx="29" cy="33" r="4" fill="#FFF"/><circle cx="51" cy="33" r="4" fill="#FFF"/><circle cx="29" cy="34" r="2" fill="#2C1810"/><circle cx="51" cy="34" r="2" fill="#2C1810"/><path d="M30 50q10 7 20 0" stroke="#2F6A2A" stroke-width="2.2" fill="none" stroke-linecap="round"/>')],
    ['squirrel', 'Squirrel', 'f', C('#F6ECE3', '<path d="M56 64q16-10 8-30q-6-12-16-6q8 6 4 16q-2 8-6 12z" fill="#B5654A"/><circle cx="34" cy="44" r="15" fill="#C77B55"/><path d="M26 30l2-8l5 7M38 29l2-8l4 8" fill="#C77B55"/><ellipse cx="34" cy="50" rx="8" ry="6" fill="#F3DCC8"/><circle cx="29" cy="41" r="2" fill="#2C1810"/><circle cx="39" cy="41" r="2" fill="#2C1810"/>')],
    ['hummingbird', 'Hummingbird', 'f', C('#FDEBEF', '<ellipse cx="42" cy="44" rx="14" ry="9" fill="#2F9E6B"/><path d="M28 40l-18-6l16 12z" fill="#2C1810"/><path d="M44 38q10-18 24-16q-8 10-20 20z" fill="#7ED3A0"/><circle cx="32" cy="41" r="6" fill="#E4574F"/><circle cx="31" cy="39" r="1.6" fill="#2C1810"/><path d="M56 48l10 6" stroke="#2F9E6B" stroke-width="4" stroke-linecap="round"/>')],
    ['ladybug', 'Ladybug', 'f', C('#EAF3E0', '<circle cx="40" cy="30" r="8" fill="#2C1810"/><ellipse cx="40" cy="48" rx="18" ry="16" fill="#E4574F"/><path d="M40 32v32" stroke="#2C1810" stroke-width="2"/><g fill="#2C1810"><circle cx="31" cy="44" r="3.2"/><circle cx="49" cy="44" r="3.2"/><circle cx="33" cy="55" r="2.6"/><circle cx="47" cy="55" r="2.6"/></g><path d="M36 24l-4-6M44 24l4-6" stroke="#2C1810" stroke-width="1.6" stroke-linecap="round"/>')],
    ['sunflower', 'Sunflower', 'f', C('#DDF0EC', '<path d="M40 72V44" stroke="#4E7A45" stroke-width="4"/><path d="M40 60q-10-2-14-10q10-1 14 6z" fill="#5C7A52"/><g fill="#E8B23A"><circle cx="40" cy="22" r="7"/><circle cx="52" cy="28" r="7"/><circle cx="52" cy="40" r="7"/><circle cx="40" cy="46" r="7"/><circle cx="28" cy="40" r="7"/><circle cx="28" cy="28" r="7"/></g><circle cx="40" cy="34" r="8" fill="#6B4226"/>')],
    ['fern', 'Fern', 'f', C('#E3EADB', '<path d="M34 70Q32 40 50 14" stroke="#3F6B4A" stroke-width="3" fill="none"/><g fill="#4F8A5B"><path d="M33 58q-14-2-18-10q12-2 18 6z"/><path d="M35 46q-13-2-16-11q11-1 16 7z"/><path d="M39 34q-10-3-12-12q10 2 13 9z"/><path d="M35 54q12-5 16-14q-11 2-16 10z"/><path d="M38 42q12-5 14-14q-10 3-14 10z"/></g>')],
    ['mushroom', 'Mushroom', 'f', C('#F6ECE3', '<path d="M16 42q24-30 48 0z" fill="#C9483F"/><g fill="#FFF5EA"><circle cx="30" cy="32" r="3.4"/><circle cx="44" cy="26" r="3"/><circle cx="52" cy="36" r="2.6"/></g><path d="M32 42h16v16q-8 5-16 0z" fill="#EFE3D0"/>')],
    ['lily', 'Lily', 'f', C('#EFE8F7', '<path d="M40 72V40" stroke="#4E6A3B" stroke-width="3.5"/><g fill="#FFFFFF" stroke="#D9C9A8" stroke-width="1.2"><path d="M40 40q-18-6-20-22q14 5 20 22z"/><path d="M40 40q18-6 20-22q-14 5-20 22z"/><path d="M40 40q-6-16 0-28q6 12 0 28z"/></g><circle cx="40" cy="34" r="2.4" fill="#E8B23A"/>')],
    ['oakleaf', 'Oak leaf', 'f', C('#FCE8D2', '<path d="M40 68V22" stroke="#8A5A2E" stroke-width="2.4"/><path d="M40 16c6 2 6 8 2 10c6 0 8 6 4 9c6 1 7 8 2 10c5 3 3 10-3 10c2 5-2 9-5 10c-3-1-7-5-5-10c-6 0-8-7-3-10c-5-2-4-9 2-10c-4-3-2-9 4-9c-4-2-4-8 2-10z" fill="#C07A26"/>')],
    ['butterfly', 'Butterfly', 'f', C('#FDEBEF', '<g transform="translate(40 40) rotate(-10)"><ellipse cx="-12" cy="-8" rx="13" ry="10" fill="#8E7CC3"/><ellipse cx="12" cy="-8" rx="13" ry="10" fill="#8E7CC3"/><ellipse cx="-9" cy="9" rx="9" ry="7" fill="#B6A8E0"/><ellipse cx="9" cy="9" rx="9" ry="7" fill="#B6A8E0"/><g fill="#FFF5EA"><circle cx="-13" cy="-9" r="3"/><circle cx="13" cy="-9" r="3"/></g><path d="M0 -14v28" stroke="#2C1810" stroke-width="3" stroke-linecap="round"/><path d="M0-14l-5-7M0-14l5-7" stroke="#2C1810" stroke-width="1.4" stroke-linecap="round"/></g>')],
    ['snail', 'Snail', 'f', C('#E1F4F7', '<path d="M14 60h46q8 0 10-8" stroke="#C9A67A" stroke-width="7" stroke-linecap="round" fill="none"/><circle cx="36" cy="44" r="15" fill="#B5654A"/><path d="M36 44m-9 0a9 9 0 1 1 9 9a5 5 0 1 1 -5 -5" stroke="#FCE3CF" stroke-width="2.4" fill="none"/><path d="M66 50l2-12M70 52l6-10" stroke="#C9A67A" stroke-width="2" stroke-linecap="round"/><circle cx="68" cy="37" r="2" fill="#2C1810"/>')],
    ['acorn', 'Acorn', 'f', C('#EAF3E0', '<path d="M24 38q16-12 32 0z" fill="#8A5A34"/><path d="M26 38h28q0 22-14 28q-14-6-14-28z" fill="#C9894F"/><path d="M40 26v-8" stroke="#6B4226" stroke-width="3" stroke-linecap="round"/><path d="M30 34h20" stroke="#6B4A2E" stroke-width="1.4"/>')],
    ['strawberry', 'Strawberry', 'f', C('#FDEBEF', '<path d="M22 32q18-8 36 0q2 20-18 34q-20-14-18-34z" fill="#E4574F"/><g fill="#FFE59A"><circle cx="32" cy="40" r="1.2"/><circle cx="40" cy="38" r="1.2"/><circle cx="48" cy="40" r="1.2"/><circle cx="36" cy="48" r="1.2"/><circle cx="44" cy="48" r="1.2"/><circle cx="40" cy="56" r="1.2"/></g><path d="M28 30l6-6l6 5l6-5l6 6q-12 6-24 0z" fill="#4DB36E"/>')],
    ['tulip', 'Tulip', 'f', C('#FFF3C4', '<path d="M40 72V42" stroke="#4E7A45" stroke-width="3"/><path d="M40 62q12-2 16-12q-12 0-16 8z" fill="#5C7A52"/><path d="M28 24q2 18 12 20q10-2 12-20l-6 6l-6-10l-6 10z" fill="#E4574F"/>')],
    ['clover', 'Clover', 'f', C('#DCEFE6', '<g fill="#4DB36E"><circle cx="33" cy="32" r="9"/><circle cx="47" cy="32" r="9"/><circle cx="33" cy="46" r="9"/><circle cx="47" cy="46" r="9"/></g><path d="M40 40q4 14 12 26" stroke="#3F6B4A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="40" cy="39" r="3" fill="#2F9E6B"/>')],
    ['cactus', 'Cactus', 'f', C('#FCE8D2', '<path d="M34 66V26a6 6 0 0 1 12 0v40z" fill="#5C9A5A"/><path d="M34 46h-6a4 4 0 0 1-4-4V34a3 3 0 0 1 6 0v6h4M46 40h6v-8a3 3 0 0 1 6 0v10a4 4 0 0 1-4 4h-8" fill="#5C9A5A"/><path d="M26 66h28l-3 8H29z" fill="#C07A26"/><circle cx="40" cy="22" r="3" fill="#E58FB0"/>')],
    /* bold set */
    ['wolf', 'Wolf', 'b', C('#2E3A4A', '<path d="M20 20l10 12h20l10-12l-2 20l-6 14l-12 10l-12-10l-6-14z" fill="#9AA6B2"/><path d="M40 64l-9-8l9-6l9 6z" fill="#E6EAEE"/><path d="M28 38l6 3M52 38l-6 3" stroke="#F2B33D" stroke-width="3" stroke-linecap="round"/><path d="M37 54h6l-3 3z" fill="#1E2630"/>')],
    ['hawk', 'Hawk', 'b', C('#6B2E22', '<path d="M8 38q16-10 28-4l4-6l4 6q12-6 28 4q-14 0-24 8l-8 12l-8-12q-10-8-24-8z" fill="#C8894F"/><path d="M36 34q4-8 8 0" fill="#F3E6CC"/><path d="M40 26l-3 4h6z" fill="#F2B33D"/>')],
    ['stag', 'Stag', 'b', C('#1F3325', '<g stroke="#E3C79A" stroke-width="3" stroke-linecap="round" fill="none"><path d="M32 30L24 14M24 22l-8-4M28 22l-2-10"/><path d="M48 30l8-16M56 22l8-4M52 22l2-10"/></g><path d="M30 32q10-6 20 0l-2 22l-8 10l-8-10z" fill="#B07A45"/><circle cx="35" cy="42" r="1.8" fill="#1F1A14"/><circle cx="45" cy="42" r="1.8" fill="#1F1A14"/><path d="M38 60h4l-2 3z" fill="#1F1A14"/>')],
    ['mountain', 'Mountain', 'b', K('#1F6F74', '<circle cx="58" cy="24" r="6" fill="#F3E6CC"/><path d="M-4 70L26 30l12 16l10-12l36 36z" fill="#2C4A55"/><path d="M26 30l-6 8l6-2l4 4zM48 34l-5 6l5-1l4 4z" fill="#F3E6CC"/>', 'mtn')],
    ['wave', 'Wave', 'b', K('#0E4D6B', '<path d="M-4 52q14-20 32-10q-10 4-6 12q10 6 22-6q12-12 40 4v32h-88z" fill="#3E9CC0"/><path d="M-4 64q20-8 40 0t48 0v20h-88z" fill="#1C7EA5"/><path d="M28 42q-10 4-6 12" stroke="#E6F4FA" stroke-width="2.5" fill="none" stroke-linecap="round"/>', 'wav')],
    ['pinemoon', 'Pine and moon', 'b', C('#232B45', '<path d="M58 16a9 9 0 1 0 6 16a7 7 0 1 1 -6 -16z" fill="#F3E6CC"/><g fill="#F3E6CC"><circle cx="20" cy="22" r="1.2"/><circle cx="28" cy="14" r="1"/><circle cx="16" cy="36" r="1"/></g><path d="M40 20l14 20h-7l10 14h-8l9 12H22l9-12h-8l10-14h-7z" fill="#3F6B4A"/><path d="M38 66h4v6h-4z" fill="#6B4226"/>')],
    ['campfire', 'Campfire', 'b', C('#2C1F17', '<path d="M40 16q14 16 6 30q10-6 8-16q10 14 0 26q-6 6-14 6t-14-6q-10-12 0-26q-2 10 8 16q-8-14 6-30z" fill="#E8792E"/><path d="M40 34q8 10 3 18q-3 3-6 0q-5-8 3-18z" fill="#F7C548"/><path d="M22 64l36-8M22 56l36 8" stroke="#8A5A34" stroke-width="5" stroke-linecap="round"/>')],
    ['raven', 'Raven', 'b', C('#5E6B73', '<path d="M18 50q4-20 22-24q10-2 16 6l10 2l-8 4q4 14-8 22l-6 8l-2-8q-16 2-24-10z" fill="#1E2328"/><circle cx="49" cy="34" r="2" fill="#F2B33D"/><path d="M26 44q10 2 20-6" stroke="#3A4450" stroke-width="2" fill="none"/>')],
    ['bearpaw', 'Bear', 'b', C('#3A2A1E', '<circle cx="24" cy="24" r="8" fill="#6B4A2E"/><circle cx="56" cy="24" r="8" fill="#6B4A2E"/><path d="M16 46q0-26 24-26t24 26q-2 20-24 22q-22-2-24-22z" fill="#7A5236"/><ellipse cx="40" cy="52" rx="11" ry="8" fill="#B08560"/><path d="M28 40l6 2M52 40l-6 2" stroke="#1F1A14" stroke-width="3" stroke-linecap="round"/><ellipse cx="40" cy="48" rx="4" ry="3" fill="#1F1A14"/>')],
    ['orca', 'Orca', 'b', K('#0B3350', '<path d="M8 50q20-24 50-14l8-14l4 18q6 6 4 12q-20 16-50 8q-12-2-16-10z" fill="#111820"/><path d="M26 58q14 8 34 0q-10 10-24 8q-8-2-10-8z" fill="#F2F6F8"/><ellipse cx="48" cy="44" rx="5" ry="2.6" fill="#F2F6F8"/><circle cx="18" cy="48" r="1.6" fill="#F2F6F8"/>', 'orc')],
    ['oak', 'Old oak', 'b', C('#6B2E22', '<g fill="#3F6B4A"><circle cx="40" cy="30" r="14"/><circle cx="28" cy="36" r="10"/><circle cx="52" cy="36" r="10"/><circle cx="34" cy="24" r="9"/><circle cx="47" cy="24" r="9"/></g><path d="M36 68q2-14 1-24l-6-6M44 68q-2-14-1-24l6-6" stroke="#2C1810" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M34 68h12" stroke="#2C1810" stroke-width="5" stroke-linecap="round"/>')],
    ['aurora', 'Aurora', 'b', K('#15203A', '<path d="M-4 40q20-20 44-8t48-10v18q-24 14-48 4t-44 10z" fill="#3FBF95" opacity=".75"/><path d="M-4 30q24-14 48-2t40-6v8q-18 10-40 2t-48 8z" fill="#8E7CC3" opacity=".6"/><path d="M-4 66l18-10l14 8l16-12l18 10l22-8v30h-88z" fill="#0C1426"/><g fill="#F3E6CC"><circle cx="16" cy="16" r="1"/><circle cx="60" cy="12" r="1.2"/><circle cx="70" cy="30" r="1"/></g>', 'aur')]
  ];
  var BY = {}; A.forEach(function (a) { BY[a[0]] = a; });
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function initials(name) { var p = String(name || '?').trim().split(/\s+/); return ((p[0] || '?')[0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase(); }
  var uid = 0;
  function svgFor(id) {
    var a = BY[id]; if (!a) return '';
    uid++; return '<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">' + a[3].replace(/gga-([a-z]+)/g, 'gga-$1-' + uid) + '</svg>';
  }
  function html(value, name, size) {
    size = size || 44;
    var st = 'width:' + size + 'px;height:' + size + 'px;';
    if (value && /^data:image\/(jpeg|png|webp);base64,/.test(value)) return '<span class="gga" style="' + st + '"><img src="' + value + '" alt=""></span>';
    if (value && value.indexOf('av:') === 0 && BY[value.slice(3)]) return '<span class="gga" style="' + st + '">' + svgFor(value.slice(3)) + '</span>';
    return '<span class="gga gga-ini" style="' + st + 'font-size:' + Math.round(size * .36) + 'px">' + esc(initials(name)) + '</span>';
  }
  function photo(file) {
    return new Promise(function (res, rej) {
      if (!file || !/^image\//.test(file.type)) return rej(new Error('not an image'));
      var r = new FileReader();
      r.onload = function () {
        var img = new Image();
        img.onload = function () {
          var s = Math.min(img.width, img.height), c = document.createElement('canvas'); c.width = c.height = 160;
          c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 160, 160);
          res(c.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = rej; img.src = r.result;
      };
      r.onerror = rej; r.readAsDataURL(file);
    });
  }
  var css = '.gga{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;flex:0 0 auto;vertical-align:middle;background:#E9E2D4;}' +
    '.gga svg,.gga img{width:100%;height:100%;display:block;object-fit:cover;}' +
    '.gga-ini{background:#5E6B73;color:#fff;font-family:Barlow,system-ui,sans-serif;font-weight:700;letter-spacing:.5px;}' +
    '.gga-back{position:fixed;inset:0;background:rgba(20,16,12,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;}' +
    '.gga-box{background:#FFFDF8;color:#2C1810;border-radius:18px;max-width:560px;width:100%;max-height:88vh;overflow:auto;padding:18px 18px 16px;font-family:Barlow,system-ui,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,.3);}' +
    '.gga-box h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;margin:0 0 4px;}' +
    '.gga-box h3{font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#6B5A4D;margin:14px 0 8px;}' +
    '.gga-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:10px;}' +
    '.gga-opt{border:none;background:none;padding:2px;border-radius:50%;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font:inherit;font-size:11px;color:#6B5A4D;}' +
    '.gga-opt .gga{width:58px;height:58px;}' +
    '.gga-opt[aria-pressed="true"] .gga{outline:3px solid #8B5E1A;outline-offset:2px;}' +
    '.gga-opt:focus-visible .gga{outline:3px solid #1F6F74;outline-offset:2px;}' +
    '.gga-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;align-items:center;}' +
    '.gga-btn{font:inherit;font-weight:600;font-size:15px;border-radius:999px;padding:9px 16px;border:1px solid #D9CDB8;background:#fff;color:#2C1810;cursor:pointer;}' +
    '.gga-btn.main{background:#8B5E1A;border-color:#8B5E1A;color:#fff;}' +
    '.gga-note{font-size:13px;color:#6B5A4D;margin:6px 0 0;}' +
    '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .gga-box{background:#2A241D;color:#F3EDE3;}:root:not([data-theme="light"]) .gga-box h3,:root:not([data-theme="light"]) .gga-opt,:root:not([data-theme="light"]) .gga-note{color:#C2B6A4;}:root:not([data-theme="light"]) .gga-btn{background:#1F1A14;color:#F3EDE3;border-color:#3A322A;}}' +
    ':root[data-theme="dark"] .gga-box{background:#2A241D;color:#F3EDE3;}:root[data-theme="dark"] .gga-box h3,:root[data-theme="dark"] .gga-opt,:root[data-theme="dark"] .gga-note{color:#C2B6A4;}:root[data-theme="dark"] .gga-btn{background:#1F1A14;color:#F3EDE3;border-color:#3A322A;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function pick(o) {
    o = o || {};
    var cur = o.value || '', prefer = o.prefer === 'bold' ? 'b' : 'f', lastFocus = document.activeElement;
    var sets = prefer === 'b' ? [['b', 'Bold'], ['f', 'Friendly']] : [['f', 'Friendly'], ['b', 'Bold']];
    var back = document.createElement('div'); back.className = 'gga-back';
    back.innerHTML = '<div class="gga-box" role="dialog" aria-modal="true" aria-labelledby="gga-title">' +
      '<h2 id="gga-title">Choose a picture</h2>' +
      sets.map(function (s) {
        return '<h3>' + s[1] + '</h3><div class="gga-grid">' + A.filter(function (a) { return a[2] === s[0]; }).map(function (a) {
          return '<button type="button" class="gga-opt" data-v="av:' + a[0] + '" aria-pressed="' + (cur === 'av:' + a[0]) + '" aria-label="' + esc(a[1]) + '">' + html('av:' + a[0], '', 58) + '<span>' + esc(a[1]) + '</span></button>';
        }).join('') + '</div>';
      }).join('') +
      '<div class="gga-row">' + (o.photo === false ? '' : '<label class="gga-btn">Upload a photo<input type="file" accept="image/*" hidden></label>') +
      '<button type="button" class="gga-btn" data-v="">Use initials</button><span style="flex:1"></span><button type="button" class="gga-btn" data-close>Cancel</button></div>' +
      (o.photo === false ? '<p class="gga-note">For privacy, the people you serve get avatars or initials.</p>' : '<p class="gga-note">Photos stay on this device, private to you.</p>') +
      '</div>';
    function close() { back.remove(); document.removeEventListener('keydown', key); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    function choose(v) { close(); if (o.onPick) o.onPick(v); }
    function key(e) { if (e.key === 'Escape') close(); }
    back.addEventListener('click', function (e) {
      if (e.target === back || e.target.closest('[data-close]')) { close(); return; }
      var b = e.target.closest('[data-v]'); if (b) choose(b.getAttribute('data-v'));
    });
    var fi = back.querySelector('input[type=file]');
    if (fi) fi.addEventListener('change', function () { photo(fi.files[0]).then(choose).catch(function () { alert('That picture could not be used. Try a different photo.'); }); });
    document.addEventListener('keydown', key);
    document.body.appendChild(back);
    var first = back.querySelector('[aria-pressed="true"]') || back.querySelector('.gga-opt'); if (first) first.focus();
  }
  window.GGAv = { list: A.map(function (a) { return { id: a[0], name: a[1], set: a[2] === 'b' ? 'bold' : 'friendly' }; }), html: html, pick: pick, photo: photo };
})();
