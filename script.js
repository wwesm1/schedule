
/* ───────────────────────────────────────────────
   OCEAN CANVAS ANIMATION
─────────────────────────────────────────────── */
const canvas = document.getElementById('ocean-canvas');
const ctx = canvas.getContext('2d');
let W, H, waves = [];

function initCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    waves = [
        { A: 55, T: 1200, speed: .6, phase: 0, y: .72, alpha: .12, color: '#00B4D8' },
        { A: 40, T: 900, speed: .9, phase: 2.1, y: .76, alpha: .09, color: '#0077B6' },
        { A: 65, T: 1500, speed: .45, phase: 1.2, y: .68, alpha: .08, color: '#90E0EF' },
        { A: 30, T: 700, speed: 1.2, phase: 3.5, y: .82, alpha: .06, color: '#023E8A' },
    ];
}

function drawWaves(t) {
    // deep gradient bg
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#001D3D');
    grad.addColorStop(.5, '#011530');
    grad.addColorStop(1, '#00111f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    waves.forEach(w => {
        ctx.beginPath();
        ctx.moveTo(0, H * w.y);
        for (let x = 0; x <= W; x += 3) {
            const y = H * w.y + Math.sin((x / w.T) * Math.PI * 2 + w.phase + t * w.speed * .001) * w.A;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = w.color + Math.round(w.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        w.phase += .002;
    });
}

let raf;
function animLoop(t) {
    drawWaves(t);
    raf = requestAnimationFrame(animLoop);
}

window.addEventListener('resize', initCanvas);
initCanvas();
requestAnimationFrame(animLoop);


/* ───────────────────────────────────────────────
   CLOCK & DATE
─────────────────────────────────────────────── */
const quotes = [
    "Discipline is choosing between what you want now and what you want most.",
    "The ocean does not apologize for its depth, and you need not apologize for yours.",
    "Small steps every day build the life you dream of.",
    "Calm seas never made a skilled sailor.",
    "Your future self is watching you right now through your memory.",
    "Flow like water — persistent, patient, unstoppable.",
    "Consistency is the bridge between goals and achievement.",
];

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('hero-clock').textContent = h + ':' + m;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('hero-date').textContent =
        `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // day progress: 5am–midnight = 19h window
    const startMin = 5 * 60, endMin = 24 * 60;
    const curMin = now.getHours() * 60 + now.getMinutes();
    const pct = Math.min(100, Math.max(0, Math.round((curMin - startMin) / (endMin - startMin) * 100)));
    document.getElementById('day-pct').textContent = pct + '%';
    document.getElementById('day-fill').style.width = pct + '%';
}

document.getElementById('hero-quote').textContent =
    '"' + quotes[new Date().getDay() % quotes.length] + '"';

updateClock();
setInterval(updateClock, 60000);


/* ───────────────────────────────────────────────
   SCHEDULE DATA & RENDER
─────────────────────────────────────────────── */
const schedule = [
    { time: '5:00–5:15', label: 'Wake Up & Morning Ritual', cat: 'health', sub: '' },
    { time: '5:15–5:45', label: 'Running + Light Exercise', cat: 'health', sub: '' },
    { time: '5:45–6:15', label: 'Shower + Breakfast', cat: 'health', sub: '' },
    { time: '6:15–6:45', label: 'IELTS Vocabulary', cat: 'ielts', sub: '15–20 academic words · Review previous · Collocations & sentences' },
    { time: '6:45–7:45', label: 'IELTS Reading', cat: 'ielts', sub: '2+ passages · Analyze mistakes · Skimming & scanning practice' },
    { time: '7:45–8:30', label: 'IELTS Listening', cat: 'ielts', sub: 'Full listening section · Review difficult parts · Note vocabulary' },
    { time: '8:30–9:00', label: 'Break / Manhwa', cat: 'free', sub: '' },
    { time: '9:00–10:30', label: 'Frontend Website Project', cat: 'code', sub: 'Deep work session — ship features, build UI' },
    { time: '10:30–10:45', label: 'Break', cat: 'free', sub: '' },
    { time: '10:45–11:45', label: 'Coding Study', cat: 'code', sub: 'JavaScript · React · Algorithms · Git' },
    { time: '11:45–12:15', label: 'Japanese Study', cat: 'jp', sub: 'Grammar · Vocabulary · Reading practice' },
    { time: '12:15–1:00', label: 'Lunch', cat: 'health', sub: '' },
    { time: '1:00–2:00', label: 'Reading Books', cat: 'free', sub: 'Deep reading — no skimming' },
    { time: '2:00–3:00', label: 'Anime in Japanese', cat: 'jp', sub: 'Original audio · Learn expressions · Shadow speaking' },
    { time: '3:00–4:00', label: 'Frontend Website Project', cat: 'code', sub: 'Afternoon session — polish and iterate' },
    { time: '4:00–5:00', label: 'Nap', cat: 'health', sub: '' },
    { time: '5:00–5:30', label: 'IELTS Writing', cat: 'ielts', sub: 'Essay structure · Grammar · Linking devices' },
    { time: '5:30–6:00', label: 'IELTS Speaking', cat: 'ielts', sub: 'Record answers · Practice Parts 1, 2 & 3' },
    { time: '6:00–7:00', label: 'Dinner', cat: 'health', sub: '' },
    { time: '7:00–8:00', label: 'Coding Practice', cat: 'code', sub: 'LeetCode · Projects · Review concepts' },
    { time: '8:00–9:00', label: 'Free Time / Manhwa', cat: 'free', sub: '' },
    { time: '9:00–9:45', label: 'Japanese Review', cat: 'jp', sub: 'Anki · Reading · Grammar review' },
    { time: '9:45–10:30', label: 'Light English Practice', cat: 'ielts', sub: 'Vocabulary review · Reading articles' },
    { time: '10:30–11:30', label: 'Relaxation & Reading', cat: 'free', sub: '' },
    { time: '11:30–12:00', label: 'Sleep Routine', cat: 'health', sub: 'Wind down · No screens · Reflect on the day' },
];

const catClass = { ielts: 'cat-ielts', code: 'cat-code', jp: 'cat-jp', health: 'cat-health', free: 'cat-free' };
const catLabel = { ielts: 'IELTS', code: 'Coding', jp: 'Japanese', health: 'Health', free: 'Free' };

function currentBlock() {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    const blocks = [
        [5 * 60, 5 * 60 + 15], [5 * 60 + 15, 5 * 60 + 45], [5 * 60 + 45, 6 * 60 + 15],
        [6 * 60 + 15, 6 * 60 + 45], [6 * 60 + 45, 7 * 60 + 45], [7 * 60 + 45, 8 * 60 + 30],
        [8 * 60 + 30, 9 * 60], [9 * 60, 10 * 60 + 30], [10 * 60 + 30, 10 * 60 + 45],
        [10 * 60 + 45, 11 * 60 + 45], [11 * 60 + 45, 12 * 60 + 15], [12 * 60 + 15, 13 * 60],
        [13 * 60, 14 * 60], [14 * 60, 15 * 60], [15 * 60, 16 * 60],
        [16 * 60, 17 * 60], [17 * 60, 17 * 60 + 30], [17 * 60 + 30, 18 * 60],
        [18 * 60, 19 * 60], [19 * 60, 20 * 60], [20 * 60, 21 * 60],
        [21 * 60, 21 * 60 + 45], [21 * 60 + 45, 22 * 60 + 30], [22 * 60 + 30, 23 * 60 + 30], [23 * 60 + 30, 24 * 60]
    ];
    return blocks.findIndex(([s, e]) => cur >= s && cur < e);
}

function renderTimeline() {
    const tl = document.getElementById('timeline');
    const active = currentBlock();
    tl.innerHTML = schedule.map((s, i) => `
    <div class="tl-item" data-i="${i}">
      <div class="tl-time">${s.time}</div>
      <div class="tl-dot-wrap">
        <div class="tl-dot ${i === active ? 'active' : ''}"></div>
        <div class="tl-body card" style="margin-left:8px;">
          <span class="tl-category ${catClass[s.cat]}">${catLabel[s.cat]}</span>
          <div class="tl-label">${s.label}</div>
          ${s.sub ? `<div class="tl-sub">${s.sub.replace(/·/g, '&nbsp;·&nbsp;')}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

renderTimeline();


/* ───────────────────────────────────────────────
   INTERSECTION OBSERVER – timeline fade-in
─────────────────────────────────────────────── */
const tlObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            tlObs.unobserve(e.target);
        }
    });
}, { threshold: .12 });

document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 35, 400) + 'ms';
    tlObs.observe(el);
});


/* ───────────────────────────────────────────────
   IELTS TRACKER
─────────────────────────────────────────────── */
const ielts = [
    { icon: '📖', label: 'Vocabulary', value: 'Day 12', sub: 'Words learned today', pct: 72, streak: 7 },
    { icon: '📄', label: 'Reading', value: 'Day 12', sub: 'Passages completed', pct: 65, streak: 5 },
    { icon: '🎧', label: 'Listening', value: 'Day 12', sub: 'Sections reviewed', pct: 58, streak: 6 },
    { icon: '✍️', label: 'Writing', value: 'Day 12', sub: 'Essays drafted', pct: 48, streak: 4 },
    { icon: '🎤', label: 'Speaking', value: 'Day 12', sub: 'Recordings made', pct: 55, streak: 5 },
];

function streakDots(n) {
    return Array.from({ length: 7 }, (_, i) =>
        `<div class="streak-dot ${i < n ? 'done' : ''}"></div>`).join('');
}

function renderIELTS() {
    document.getElementById('ielts-grid').innerHTML = ielts.map(t => `
    <div class="card tracker-card">
      <div class="tc-icon">${t.icon}</div>
      <div class="tc-label">${t.label}</div>
      <div class="tc-value">${t.value}</div>
      <div class="tc-sub">${t.sub}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${t.pct}%"></div></div>
      <div style="font-size:.7rem;color:var(--teal);margin-bottom:8px;">${t.pct}% of weekly goal</div>
      <div style="font-size:.65rem;color:rgba(248,253,255,.4);margin-bottom:5px;">7-day streak</div>
      <div class="streak-row">${streakDots(t.streak)}</div>
    </div>
  `).join('');
}

renderIELTS();


/* ───────────────────────────────────────────────
   CODING TRACKER
─────────────────────────────────────────────── */
const coding = [
    { icon: '💻', label: 'Frontend Project', value: '68%', sub: 'Portfolio site', pct: 68 },
    { icon: '🧠', label: 'Coding Study', value: 'Day 12', sub: 'JS · React · Algo', pct: 55 },
    { icon: '🟢', label: 'GitHub Commits', value: '8', sub: 'This week', pct: 80 },
];

function renderCoding() {
    document.getElementById('coding-grid').innerHTML = coding.map(t => `
    <div class="card tracker-card" style="text-align:center;">
      <div class="circ-wrap">
        <svg class="circ-svg" viewBox="0 0 80 80" width="80" height="80">
          <circle class="circ-bg"   cx="40" cy="40" r="35"/>
          <circle class="circ-fill" cx="40" cy="40" r="35"
            style="stroke-dashoffset:${220 - (220 * t.pct / 100).toFixed(1)}"/>
        </svg>
        <div class="circ-text">
          <span class="circ-pct">${t.value}</span>
          <span class="circ-lbl">${t.pct}%</span>
        </div>
      </div>
      <div class="tc-icon">${t.icon}</div>
      <div class="tc-label">${t.label}</div>
      <div class="tc-sub">${t.sub}</div>
    </div>
  `).join('');
}

renderCoding();


/* ───────────────────────────────────────────────
   JAPANESE TRACKER
─────────────────────────────────────────────── */
const japanese = [
    { icon: '🈶', label: 'Vocabulary', value: '84', sub: 'Words mastered', pct: 56, streak: 5 },
    { icon: '🎌', label: 'Anime Watched', value: '18 ep', sub: 'This week', pct: 72, streak: 6 },
    { icon: '文', label: 'Grammar Points', value: '23', sub: 'Points studied', pct: 46, streak: 4 },
    { icon: '🔊', label: 'Shadowing Sessions', value: 'Day 9', sub: 'Speaking practice', pct: 60, streak: 3 },
];

function renderJapanese() {
    document.getElementById('japanese-grid').innerHTML = japanese.map(t => `
    <div class="card tracker-card">
      <div class="tc-icon">${t.icon}</div>
      <div class="tc-label">${t.label}</div>
      <div class="tc-value">${t.value}</div>
      <div class="tc-sub">${t.sub}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${t.pct}%"></div></div>
      <div class="streak-row" style="margin-top:10px;">${streakDots(t.streak)}</div>
    </div>
  `).join('');
}

renderJapanese();


/* ───────────────────────────────────────────────
   READING TRACKER
─────────────────────────────────────────────── */
function renderReading() {
    document.getElementById('reading-grid').innerHTML = `
    <div class="card tracker-card" style="grid-column:span 1;">
      <div class="tc-icon">📚</div>
      <div class="tc-label">Current Book</div>
      <div class="tc-value" style="font-size:1.15rem;">Deep Work</div>
      <div class="tc-sub">Cal Newport</div>
    </div>
    <div class="card tracker-card">
      <div class="tc-icon">📃</div>
      <div class="tc-label">Pages Read</div>
      <div class="tc-value">142</div>
      <div class="tc-sub">of 296 pages</div>
      <div class="bar-track"><div class="bar-fill" style="width:48%"></div></div>
    </div>
    <div class="card tracker-card">
      <div class="tc-icon">🔥</div>
      <div class="tc-label">Reading Streak</div>
      <div class="tc-value">9</div>
      <div class="tc-sub">consecutive days</div>
      <div class="streak-row" style="margin-top:10px;">${streakDots(7)}</div>
    </div>
  `;
}

renderReading();


/* ───────────────────────────────────────────────
   SOCIAL MEDIA TIMER
─────────────────────────────────────────────── */
let smRunning = false, smElapsed = 0, smInterval = null;
const LIMIT = 30 * 60; // 30 minutes in seconds

function formatMMSS(s) {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return m + ':' + sec;
}

function toggleSMTimer() {
    smRunning = !smRunning;
    document.getElementById('sm-btn').textContent = smRunning ? 'PAUSE' : 'RESUME';
    if (smRunning) {
        smInterval = setInterval(() => {
            smElapsed++;
            document.getElementById('sm-display').textContent = formatMMSS(smElapsed);
            if (smElapsed >= LIMIT) {
                document.getElementById('warning').classList.add('show');
                document.getElementById('sm-display').style.color = '#FF8585';
            }
        }, 1000);
    } else {
        clearInterval(smInterval);
    }
}

function resetSMTimer() {
    clearInterval(smInterval);
    smRunning = false; smElapsed = 0;
    document.getElementById('sm-display').textContent = '00:00';
    document.getElementById('sm-display').style.color = 'var(--white)';
    document.getElementById('sm-btn').textContent = 'START';
    document.getElementById('warning').classList.remove('show');
}


/* ───────────────────────────────────────────────
   50/10 FOCUS TIMER
─────────────────────────────────────────────── */
let ftSeconds = 50 * 60, ftRunning = false, ftBreak = false, ftTimer = null;

function toggleFocus() {
    ftRunning = !ftRunning;
    if (ftRunning) {
        ftTimer = setInterval(() => {
            ftSeconds--;
            if (ftSeconds <= 0) {
                ftBreak = !ftBreak;
                ftSeconds = ftBreak ? 10 * 60 : 50 * 60;
                document.getElementById('ft-lbl').textContent = ftBreak ? 'BREAK' : 'FOCUS';
            }
            document.getElementById('ft-display').textContent = formatMMSS(ftSeconds);
        }, 1000);
    } else {
        clearInterval(ftTimer);
    }
}

/* ───────────────────────────────────────────────
   HIGHLIGHT CURRENT BLOCK
─────────────────────────────────────────────── */
function highlightActive() {
    const active = currentBlock();
    document.querySelectorAll('.tl-item').forEach((el, i) => {
        el.querySelector('.tl-dot')?.classList.toggle('active', i === active);
    });
}
setInterval(highlightActive, 60000);