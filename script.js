/* ── Intersection observer for section letter animations ── */
function observeLetters(headingId) {
  const el = document.getElementById(headingId);
  if (!el) return;
  const letters = el.querySelectorAll('.letter-sec');
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      letters.forEach(s => {
        const d = parseFloat(s.dataset.i) * 0.08;
        s.style.animationDelay = d + 's';
        s.classList.add('on');
      });
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(el);
}
observeLetters('dl-heading');
observeLetters('gal-heading');

/* ── Card scroll-in ── */
const cardObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const ci = parseFloat(e.target.dataset.ci);
      e.target.style.animationDelay = (ci % 3) * 0.1 + 's';
      e.target.classList.add('on');
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.card-anim').forEach(c => cardObs.observe(c));

/* ── Expand / collapse detail ── */
function toggleDetail(btn) {
  const body = btn.nextElementSibling;
  const chevron = btn.querySelector('svg');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

/* ── Gateway ── */
const TOTAL = 15;
let gwTimer = null;
let gwUrl = '#';

function openGateway(url, name, ytUrl) {
  gwUrl = url;
  document.getElementById('gw-name').textContent = name;
  document.getElementById('gw-yt').href = ytUrl || '#';
  document.getElementById('gw-countdown').style.display = '';
  document.getElementById('gw-link').style.display = 'none';
  document.getElementById('gw').classList.add('open');

  let secs = TOTAL;
  const numEl  = document.getElementById('gw-num');
  const ringEl = document.getElementById('ring-fill');
  const circ   = 2 * Math.PI * 54;

  function tick() {
    numEl.textContent = secs;
    const pct = secs / TOTAL;
    ringEl.style.strokeDashoffset = circ * (1 - pct);
    if (secs <= 0) { clearInterval(gwTimer); showLink(); return; }
    secs--;
  }
  tick();
  clearInterval(gwTimer);
  gwTimer = setInterval(tick, 1000);
}

function showLink() {
  document.getElementById('gw-countdown').style.display = 'none';
  const lp = document.getElementById('gw-link');
  lp.style.display = '';
  document.getElementById('gw-dl').href = gwUrl;
  lp.style.opacity = '0'; lp.style.transform = 'scale(.92)'; lp.style.transition = 'opacity .35s, transform .35s';
  requestAnimationFrame(() => { lp.style.opacity = '1'; lp.style.transform = 'scale(1)'; });
}

function closeGw() {
  clearInterval(gwTimer);
  document.getElementById('gw').classList.remove('open');
}

document.getElementById('gw').addEventListener('click', e => { if (e.target === document.getElementById('gw')) closeGw(); });
