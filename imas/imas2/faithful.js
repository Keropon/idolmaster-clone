/* Faithful behaviours for the columbia 2010 top:
   1) news ticker (horizontal scroll)  2) CD carousel (prev/next + auto). */

// ---- 1. carousel: real CD jacket images ----
(function carousel() {
    const strip = document.getElementById('strip');
    if (!strip) return;
    // real jacket files present in assets/img (img12..img19 are the 2010 lineup)
    const imgs = ['img18', 'img19', 'img16', 'img17', 'img15', 'img14', 'img12', 'img13'];
    strip.innerHTML = imgs.map((n) => `<li><img src="assets/img/${n}.jpg" alt="CD jacket"></li>`).join('');

    const step = 160;                 // 150px jacket + 10px gap
    const per = 6;                    // visible-ish
    let i = 0;
    const max = Math.max(0, imgs.length - per);
    const go = () => { strip.style.transform = `translateX(${-i * step}px)`; };
    document.getElementById('next').addEventListener('click', () => { i = i >= max ? 0 : i + 1; go(); });
    document.getElementById('prev').addEventListener('click', () => { i = i <= 0 ? max : i - 1; go(); });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        setInterval(() => { i = i >= max ? 0 : i + 1; go(); }, 3500);
})();

// ---- 2. news ticker: continuous scroll ----
(function ticker() {
    const track = document.getElementById('ticker');
    if (!track || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    track.innerHTML += track.innerHTML;          // duplicate for seamless loop
    let x = 0;
    (function loop() {
        x -= 0.6;
        if (-x >= track.scrollWidth / 2) x = 0;
        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(loop);
    })();
})();
