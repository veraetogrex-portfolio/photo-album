// Photo Album — github.com/veraetogrex-portfolio · zero dependencies
// The album's cover is a pile of its own prints on a board tinted by the print in front; trip photos wait in a tray below.
// Drag a photo up onto the album (or focus it and press Enter): the tray closes the gap, the pile spreads to make room,
// the photo lands on paper in front, the board takes its colour and the counter goes up. Undo puts it back.

// the pictures are drawn, 400 × 300: layered light and haze, a little film grain and lens fall-off on top
const tree = (x, b, h, w) => `M${x} ${b - h}L${x + w * .32} ${b - h * .55}H${x + w * .18}L${x + w * .42} ${b - h * .24}H${x + w * .25}L${x + w * .5} ${b}H${x - w * .5}L${x - w * .25} ${b - h * .24}H${x - w * .42}L${x - w * .18} ${b - h * .55}H${x - w * .32}Z`;
const trees = (xs, b, h, w, fill) => `<path fill="${fill}" d="${xs.map(([x, k]) => tree(x, b, h * k, w * k)).join('')}"/>`;
const stops = s => s.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('');
const lg = (id, s) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops(s)}</linearGradient>`;
const rg = (id, s) => `<radialGradient id="${id}">${stops(s)}</radialGradient>`;
const film = (id, seed) => `<defs><filter id="${id}-grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="1 1"/></feComponentTransfer></filter>
  <radialGradient id="${id}-fall" cx=".5" cy=".45" r=".78">${stops([[.5, '#000', 0], [1, '#000', .34]])}</radialGradient></defs>
  <rect width="400" height="300" filter="url(#${id}-grain)" opacity=".2" style="mix-blend-mode:overlay"/><rect width="400" height="300" fill="url(#${id}-fall)"/>`;
const PHOTOS = {
  ridge: { title: 'Ridge at sunrise', art: `<defs>${lg('ridge-sky', [[0, '#B48EB5'], [.42, '#EBAA9F'], [.78, '#F9D6B2'], [1, '#FCE6C6']])}${rg('ridge-sun', [[0, '#FFF7E6'], [.22, '#FFE9C7', .85], [1, '#FBD8B2', 0]])}
    ${lg('ridge-m1', [[0, '#C893A8'], [1, '#EBC6BC']])}${lg('ridge-m2', [[0, '#87629A'], [1, '#B992AC']])}${lg('ridge-m3', [[0, '#4C3C69'], [1, '#6C5582']])}${lg('ridge-m4', [[0, '#2A2242'], [1, '#382C50']])}</defs>
    <rect width="400" height="300" fill="url(#ridge-sky)"/><circle cx="270" cy="150" r="120" fill="url(#ridge-sun)"/><circle cx="270" cy="150" r="23" fill="#FFF5E0"/>
    <path d="M0 182 58 150 104 167 170 118 228 158 292 130 350 155 400 140V300H0Z" fill="url(#ridge-m1)"/>
    <path d="M0 224 70 172 122 201 190 120 250 189 320 150 400 205V300H0Z" fill="url(#ridge-m2)"/>
    <path d="M190 120 166 147 177 142 186 150 195 141 204 148 213 146ZM320 150 293 166 304 162 312 169 322 162 333 168 344 166Z" fill="#F7E9EA"/>
    <path d="M190 120 213 146 204 148 250 189 240 189Z" fill="#E9B9B6" opacity=".55"/>
    <path d="M0 257 92 216 162 245 240 208 320 239 400 225V300H0Z" fill="url(#ridge-m3)"/><path d="M0 283 120 260 232 276 330 256 400 268V300H0Z" fill="url(#ridge-m4)"/>${film('ridge', 3)}` },
  forest: { title: 'Pines in the fog', art: `<defs>${lg('forest-sky', [[0, '#BAC6C4'], [1, '#E3E8E4']])}${lg('forest-fog', [[0, '#E6EBE7', 0], [.5, '#E6EBE7', .85], [1, '#E6EBE7', 0]])}${lg('forest-floor', [[0, '#41554D'], [1, '#26332F']])}
    ${rg('forest-light', [[0, '#FFFFFF', .55], [1, '#FFFFFF', 0]])}</defs>
    <rect width="400" height="300" fill="url(#forest-sky)"/><circle cx="90" cy="40" r="170" fill="url(#forest-light)"/>
    ${trees([[12, .8], [44, 1], [74, .7], [104, .9], [136, 1.1], [168, .8], [200, 1], [232, .75], [262, .95], [294, 1.1], [326, .8], [358, 1], [390, .85]], 196, 74, 36, '#A7B6B1')}
    <rect y="168" width="400" height="56" fill="url(#forest-fog)"/>
    ${trees([[34, 1], [96, .85], [150, 1.05], [214, .9], [270, 1.1], [336, .9], [392, 1]], 248, 118, 56, '#71877F')}
    <rect y="222" width="400" height="40" fill="url(#forest-fog)" opacity=".7"/><rect y="244" width="400" height="56" fill="url(#forest-floor)"/>${trees([[18, 1], [384, .9]], 300, 236, 104, '#21302B')}${film('forest', 7)}` },
  bridge: { title: 'Footbridge at noon', art: `<defs>${lg('bridge-sky', [[0, '#4E9FDD'], [.65, '#A9D5F2'], [1, '#D7ECF7']])}${lg('bridge-far', [[0, '#8EB9A6'], [1, '#A9CBB3']])}${lg('bridge-hill', [[0, '#79AC74'], [1, '#5F975F']])}
    ${lg('bridge-meadow', [[0, '#B8DA8C'], [1, '#8DBE66']])}${lg('bridge-river', [[0, '#69B3DA'], [1, '#3C82B2']])}</defs>
    <rect width="400" height="300" fill="url(#bridge-sky)"/>
    <ellipse cx="90" cy="64" rx="58" ry="15" fill="#E3EEF6"/><ellipse cx="86" cy="58" rx="54" ry="14" fill="#FFFFFF"/><ellipse cx="122" cy="48" rx="34" ry="17" fill="#FFFFFF"/>
    <ellipse cx="302" cy="90" rx="46" ry="11" fill="#E6F1F8"/><ellipse cx="296" cy="86" rx="36" ry="9" fill="#FFFFFF"/>
    <path d="M0 150Q70 128 140 142T280 132 400 140V300H0Z" fill="url(#bridge-far)"/><path d="M0 164Q80 128 160 152T320 144 400 154V300H0Z" fill="url(#bridge-hill)"/>
    <rect y="184" width="400" height="116" fill="url(#bridge-meadow)"/>
    <path d="M168 184Q192 220 142 252T112 300H292Q252 270 272 240T238 184Z" fill="url(#bridge-river)"/>
    <path d="M140 232Q200 214 276 232L270 240Q200 224 146 240Z" fill="#2F6E99" opacity=".45"/>
    <path d="M182 268H218M204 252H226M232 282H262" stroke="#BFE3F3" stroke-width="3" stroke-linecap="round" opacity=".9"/>
    <path d="M145 213V197M175 206V190M205 204V188M235 206V190M265 213V197" stroke="#8E5F3F" stroke-width="4"/>
    <path d="M120 206Q200 176 290 206" stroke="#9A6A48" stroke-width="5" fill="none"/><path d="M118 224Q200 192 292 224" stroke="#6E4630" stroke-width="12" fill="none"/>
    <path d="M118 219Q200 187 292 219" stroke="#A37552" stroke-width="3" fill="none"/>${film('bridge', 11)}` },
  tent: { title: 'Tent under the stars', art: `<defs>${lg('tent-sky', [[0, '#070B20'], [.6, '#141D45'], [1, '#2A3667']])}${lg('tent-hill', [[0, '#202A54'], [1, '#18203F']])}${lg('tent-ground', [[0, '#121A30'], [1, '#0A0F1E']])}
    ${rg('tent-glow', [[0, '#FFB45A', .7], [.4, '#F08A3A', .28], [1, '#F08A3A', 0]])}${rg('tent-band', [[0, '#C8D2FF', .2], [1, '#C8D2FF', 0]])}${lg('tent-cloth', [[0, '#FFD07A'], [1, '#E8892F']])}</defs>
    <rect width="400" height="300" fill="url(#tent-sky)"/><ellipse cx="240" cy="70" rx="230" ry="38" transform="rotate(-18 240 70)" fill="url(#tent-band)"/>
    <g fill="#E7ECFF"><circle cx="40" cy="40" r="1.8"/><circle cx="92" cy="82" r="1.4"/><circle cx="150" cy="30" r="2.2"/><circle cx="212" cy="70" r="1.5"/><circle cx="272" cy="26" r="1.8"/><circle cx="332" cy="58" r="2.2"/><circle cx="372" cy="108" r="1.4"/><circle cx="120" cy="122" r="1.3"/><circle cx="302" cy="118" r="1.5"/><circle cx="62" cy="104" r="1"/><circle cx="186" cy="12" r="1.2"/><circle cx="250" cy="104" r="1"/><circle cx="356" cy="18" r="1.2"/></g>
    <path d="M0 200 80 140 130 170 210 110 280 165 340 135 400 175V300H0Z" fill="url(#tent-hill)"/>
    ${trees([[18, 1], [46, .8], [334, .85], [362, 1.05], [392, .8]], 238, 76, 38, '#0E142A')}
    <path d="M0 230Q200 210 400 232V300H0Z" fill="url(#tent-ground)"/><ellipse cx="206" cy="250" rx="150" ry="70" fill="url(#tent-glow)"/>
    <path d="M150 262 205 184 262 262Z" fill="url(#tent-cloth)"/><path d="M190 262 205 222 220 262Z" fill="#9C5222"/><path d="M205 184 213 172" stroke="#F2A546" stroke-width="4"/>${film('tent', 5)}` },
  lake: { title: 'Rowboat on the lake', art: `<defs>${lg('lake-sky', [[0, '#94C6E6'], [1, '#E2F0F6']])}${lg('lake-far', [[0, '#87A9BF'], [1, '#B5CDDB']])}${lg('lake-water', [[0, '#5AA3B4'], [1, '#2C6879']])}</defs>
    <rect width="400" height="300" fill="url(#lake-sky)"/>
    <path d="M0 130 60 92 120 118 190 70 260 116 330 86 400 120V172H0Z" fill="url(#lake-far)"/><path d="M190 70 172 88 182 85 190 92 199 84 208 90Z" fill="#F4F8FA"/>
    <path d="M0 150Q100 128 200 146T400 140V174H0Z" fill="#5C8C83"/>
    ${trees([[8, 1], [26, .8], [44, 1.1], [62, .9], [80, 1], [98, .75], [116, 1], [300, .9], [318, 1.1], [336, .8], [354, 1], [372, .9], [390, 1.1]], 174, 48, 24, '#2D5749')}
    <rect y="170" width="400" height="130" fill="url(#lake-water)"/>
    <path d="M0 170 60 196 120 182 190 214 260 184 330 204 400 178Z" fill="#9CC1CF" opacity=".28"/>
    <path d="M40 206H110M250 198H340M120 240H230M280 260H340M60 276H140" stroke="#8CC6D2" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <path d="M168 236H246L232 254H182Z" fill="#D45A40"/><path d="M182 254H232L226 258H188Z" fill="#7A2E22" opacity=".5"/><path d="M160 250 254 228" stroke="#5E3426" stroke-width="3"/>${film('lake', 9)}` },
  cabin: { title: 'Cabin at dusk', art: `<defs>${lg('cabin-sky', [[0, '#272150'], [.42, '#56366A'], [.7, '#B0566C'], [1, '#F2A26C']])}${rg('cabin-moon', [[0, '#F7E9D2', .5], [1, '#F7E9D2', 0]])}
    ${rg('cabin-lamp', [[0, '#FFC56A', .65], [1, '#FFC56A', 0]])}${lg('cabin-hill', [[0, '#2C2243'], [1, '#1D1730']])}</defs>
    <rect width="400" height="300" fill="url(#cabin-sky)"/><circle cx="318" cy="64" r="50" fill="url(#cabin-moon)"/><circle cx="318" cy="64" r="17" fill="#F6E8D2"/>
    <path d="M0 190Q100 168 200 186T400 178V300H0Z" fill="url(#cabin-hill)"/>
    ${trees([[24, 1], [70, .8], [332, .9], [380, 1.1]], 246, 124, 54, '#17132A')}
    <circle cx="205" cy="226" r="80" fill="url(#cabin-lamp)"/>
    <rect x="150" y="196" width="110" height="62" fill="#3B2A35"/><path d="M138 200 205 158 272 200Z" fill="#221A28"/><rect x="234" y="164" width="12" height="24" fill="#221A28"/>
    <rect x="166" y="212" width="30" height="24" fill="#FFC56A"/><rect x="214" y="212" width="30" height="24" fill="#FFC56A"/>
    <path d="M0 252Q200 238 400 254V300H0Z" fill="#151122"/>${film('cabin', 13)}` },
};
const TINT = {                                          // the cover board under each print in front: the colour of its light, flattened
  ridge: '#6a4078', forest: '#1f2c29', bridge: '#173041', tent: '#151c33', lake: '#163440', cabin: '#2c2140',
};
const LOOSE = ['forest', 'ridge', 'bridge', 'tent'];   // unsorted, in tray order
const INSIDE = ['cabin', 'lake'];                      // already in the album, oldest first: the last one is in front

const W = 1360;                                         // component width, px
const TRAY = { x: 64, y: 588, w: 293, h: 174, gap: 20 };   // the row of unsorted tiles under the album
const CARD = { x: 64, y: 100, w: 1232, h: 408 };        // the album: dropping anywhere on it adds the photo
const COVER = { x: 915, y: 304 };                       // centre of the pile of prints
const TILE = TRAY.w / 400, PRINT = .74;                 // picture scale as a tile, as a print on the cover
const PILE = [[0, -6, -1.5], [-200, 14, -6], [200, 14, 6]];   // newest in front, then left, then right: [dx, dy, deg]
const PAIR = [[-70, 4, -4], [92, -8, 5]];               // two prints: front a little left, the older one peeking right

const root = document.querySelector('#album');
const layer = root.querySelector('.pa-photos');
const card = root.querySelector('.pa-card');
const tints = root.querySelector('.pa-tints');
const leftCount = root.querySelector('.pa-left');
const rollEl = root.querySelector('.pa-roll');
const word = root.querySelector('.pa-word');
const undoBtn = root.querySelector('.pa-undo');

layer.innerHTML = Object.keys(PHOTOS).map(id => `<button class="pa-photo" data-id="${id}" aria-label="${PHOTOS[id].title}">
  <span class="pa-clip"><span class="pa-paper"></span><span class="pa-img"><svg viewBox="0 0 400 300" aria-hidden="true">${PHOTOS[id].art}</svg></span><span class="pa-ring"></span></span></button>`).join('');
tints.innerHTML = Object.keys(TINT).map(id => `<span class="pa-tint" data-id="${id}" style="background:${TINT[id]}"></span>`).join('');
const els = Object.fromEntries([...layer.children].map(el => [el.dataset.id, el]));

let state, drag = null, timers = [], raf = 0, noClick = false;
const later = (fn, ms) => timers.push(setTimeout(fn, ms));

// where things go: a tile in the tray, or a print in the pile on the cover
const tileAt = i => ({ x: TRAY.x + i * (TRAY.w + TRAY.gap) + TRAY.w / 2, y: TRAY.y + TRAY.h / 2, r: 0, s: TILE, z: 1 });
function pile(list) {
  const n = list.length, out = {};
  list.forEach((id, k) => {
    const back = n - 1 - k;                                        // 0 = the newest print, in front
    const p = n === 1 ? [0, 0, -2] : n === 2 ? PAIR[back] : PILE[back] || [0, 10, 0];   // older ones wait under the pile
    out[id] = { x: COVER.x + p[0], y: COVER.y + p[1], r: p[2], s: PRINT, z: 20 - back };
  });
  return out;
}
const tf = p => `translate(${p.x - 200}px, ${p.y - 150}px) rotate(${p.r}deg) scale(${p.s})`;
function put(id, p, print) {
  const el = els[id];
  el.style.transform = tf(p); el.style.zIndex = p.z;
  el.classList.toggle('is-print', print);
}
// the board takes the colour of the print in front
function tint(id = state.inside[state.inside.length - 1]) {
  tints.querySelectorAll('.pa-tint').forEach(t => t.classList.toggle('is-on', t.dataset.id === id));
}

// lay everything out from state; while a photo hovers the album the pile already spreads to make room for it
function layout() {
  const list = drag && drag.over ? [...state.inside, drag.id] : state.inside, f = pile(list);
  state.loose.forEach((id, i) => put(id, tileAt(i), false));
  state.inside.forEach(id => put(id, f[id], true));
  Object.entries(els).forEach(([id, el]) => {
    const loose = state.loose.includes(id);
    el.tabIndex = loose ? 0 : -1;
    el.setAttribute('aria-label', loose ? `${PHOTOS[id].title}. Add to album` : `${PHOTOS[id].title}, in the album`);
  });
  const left = state.loose.length + (drag && drag.moved ? 1 : 0);    // a photo in the hand is not sorted yet
  leftCount.textContent = left ? `${left} left` : 'All sorted';
}

// the album counter rolls to its new number: the old one leaves upwards when it grows
function roll(n = state.inside.length) {
  const old = rollEl.querySelector('.pa-n:not(.is-out)');
  word.textContent = n === 1 ? 'photo' : 'photos';
  if (+old.textContent === n) return;
  const dir = n > +old.textContent ? 1 : -1, el = document.createElement('span');
  el.className = 'pa-n'; el.textContent = n;
  el.style.transition = 'none'; el.style.transform = `translateY(${dir * 100}%)`; el.style.opacity = 0;
  rollEl.append(el); el.offsetWidth;
  el.style.transition = el.style.transform = el.style.opacity = '';
  old.classList.add('is-out'); old.style.transform = `translateY(${-dir * 100}%)`; old.style.opacity = 0;
  later(() => old.remove(), 500);
}

// the photo that crosses the screen moves on a longer curve and stays on top until it lands
function travel(id) {
  els[id].classList.add('is-travel'); els[id].style.zIndex = 40;
  later(() => { els[id].classList.remove('is-travel'); layout(); }, 1000);
}
function add(id, from, land = 60) {
  state.inside.push(id); state.last = { id, from };
  root.classList.add('has-undo'); undoBtn.tabIndex = 0;
  layout(); els[id].style.zIndex = 40;
  later(() => {                                                      // it lands: the board changes colour, the counter turns,
    tint(); roll();                                                  // the prints under it give way a little
    const f = pile(state.inside);
    state.inside.slice(-3, -1).forEach(k => { const p = f[k], d = Math.sign(p.x - COVER.x); put(k, { ...p, x: p.x + d * 14, r: p.r + d * 2.5 }, true); });
    later(layout, 180);
  }, land);
}
// click or Enter: the photo travels to the album by itself; keyboard focus moves on to the next photo
function addByKey(id) {
  const from = state.loose.indexOf(id); if (from < 0) return;
  state.loose.splice(from, 1); travel(id); add(id, from, 700);
  if (document.activeElement === els[id]) (els[state.loose[from] || state.loose[from - 1]] || undoBtn).focus({ preventScroll: true });
}
// undo, one motion: the print leaves the pile, the pile closes, the tray opens its old place
function undo() {
  if (!state.last) return;
  const { id, from } = state.last; state.last = null;
  state.inside.splice(state.inside.indexOf(id), 1);
  state.loose.splice(Math.min(from, state.loose.length), 0, id);
  root.classList.remove('has-undo'); undoBtn.tabIndex = -1;
  layout(); travel(id);                                              // the others make room at once, it flies on top and arrives last
  later(() => { tint(); roll(); }, 200);                             // the board lets go of its colour once the print has left
  if (document.activeElement === undoBtn) els[id].focus({ preventScroll: true });
}

// ── drag: the tile follows the pointer; over the album it turns into a print and the pile spreads ──
const local = e => { const r = root.getBoundingClientRect(), k = r.width / W; return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
const onCard = ([x, y]) => x > CARD.x && x < CARD.x + CARD.w && y > CARD.y && y < CARD.y + CARD.h;

Object.entries(els).forEach(([id, el]) => {
  el.addEventListener('pointerdown', e => {
    noClick = false; if (e.button || drag || !state.loose.includes(id)) return;
    const [x, y] = local(e), c = tileAt(state.loose.indexOf(id));
    drag = { id, el, from: state.loose.indexOf(id), x0: x, y0: y, px: x, py: y, ox: x - c.x, oy: y - c.y + 8, moved: false, over: false, s: TILE * 1.08, r: 0, k: 1, t: 0 };
    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    el.classList.add('is-press'); el.style.zIndex = 40;
    el.style.transform = tf({ ...c, y: c.y - 8, s: TILE * 1.08 });  // pressed: the tile rises off the tray
  });
  el.addEventListener('click', e => { if ((!noClick || !e.detail) && state.loose.includes(id)) addByKey(id); });   // Enter / Space always count
  el.addEventListener('keydown', e => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!step) return;
    e.preventDefault(); const i = state.loose.indexOf(id), next = state.loose[i + step];
    if (next) els[next].focus({ preventScroll: true });
  });
});
addEventListener('pointermove', e => {
  if (!drag) return;
  [drag.px, drag.py] = local(e);
  if (!drag.moved && Math.hypot(drag.px - drag.x0, drag.py - drag.y0) > 6) {
    drag.moved = true; state.loose.splice(drag.from, 1);               // lifted: the tray closes the gap
    drag.el.classList.add('is-drag'); drag.el.style.zIndex = 40;
    layout(); raf = requestAnimationFrame(follow);
  }
  if (!drag.moved) return;
  const over = onCard([drag.px, drag.py]);
  if (over !== drag.over) { drag.over = over; layout(); }                // the pile spreads; the paper forms only on landing
});
// one frame of the dragged photo: position follows the pointer, scale and tilt ease toward tile or print
function follow(now) {
  if (!drag || !drag.moved) return;
  const dt = drag.t ? Math.min(64, now - drag.t) : 16, a = 1 - Math.exp(-dt / 90); drag.t = now;
  const to = drag.over ? { s: PRINT, r: -1.5, k: .3 } : { s: TILE * 1.08, r: 0, k: 1 };
  for (const key of ['s', 'r', 'k']) drag[key] += (to[key] - drag[key]) * a;
  drag.el.style.transform = tf({ x: drag.px - drag.ox * drag.k, y: drag.py - drag.oy * drag.k, r: drag.r, s: drag.s });
  raf = requestAnimationFrame(follow);
}
function drop(cancel) {
  if (!drag) return;
  const { id, el, from, moved, over } = drag; drag = null; cancelAnimationFrame(raf);
  el.classList.remove('is-drag', 'is-press');
  if (!moved) { if (cancel) noClick = true; return layout(); }       // a plain click: handled by the click event; Esc cancels it
  noClick = true;                                                    // the click this gesture ends with is not an "add"
  if (over && !cancel) add(id, from);
  else { state.loose.splice(from, 0, id); layout(); }
  later(layout, 650);                                                // drop the "on top" z-index once it has landed
}
addEventListener('pointerup', () => drop(false));
addEventListener('pointercancel', () => drop(true));
undoBtn.addEventListener('click', undo);
root.addEventListener('keydown', e => {
  if (e.key === 'Escape') drop(true);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); }
});

function reset() {
  timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); drag = null;
  state = { loose: [...LOOSE], inside: [...INSIDE], last: null };
  root.classList.add('is-reset'); root.classList.remove('has-undo');
  Object.values(els).forEach(el => el.classList.remove('is-drag', 'is-press', 'is-travel'));
  rollEl.innerHTML = `<span class="pa-n">${INSIDE.length}</span>`; word.textContent = 'photos'; undoBtn.tabIndex = -1;
  layout(); tint();
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-reset')));
}

reset();
root.album = { reset, tile: id => els[id], undo: undoBtn, card, cover: COVER };   // for scripted demos
