/* Faithful behaviours for the imas renew top:
   1) gif rollover (original onmouseover this.src='..._o.gif')
   2) rotating main banner (original randomAdv) */

// ---- 1. rollover: swap foo.gif <-> foo_o.gif on hover (preload to avoid flicker) ----
document.querySelectorAll('img[data-ro]').forEach((img) => {
    const base = img.getAttribute('src');
    const over = base.replace(/\.(gif|jpg|png)$/i, '_o.$1');
    new Image().src = over;                       // preload
    const a = img.closest('a') || img;
    a.addEventListener('pointerenter', () => { img.src = over; });
    a.addEventListener('pointerleave', () => { img.src = base; });
});

// ---- 2. main banner rotator ----
(function banner() {
    const host = document.getElementById('banner');
    if (!host) return;
    const names = [
        'img_main_l4udlc01', 'img_main_l4udlc02', 'img_main_l4udlc03', 'img_main_l4udlc04',
        'img_main_l4udlc05', 'img_main_l4udlc06', 'img_main_l4udlc07', 'img_main_l4udlc08',
        'img_main_l4udlc09', 'img_main_l4udlc10', 'img_main_l4udlc11', 'img_main_l4udlc12',
        'img_main_l4udlc13a', 'img_main_l4udlc13b', 'img_main_l4udlc14a', 'img_main_l4udlc14b',
        'img_main_l4udlc15a', 'img_main_l4udlc15b', 'img_main_l4udlc16a', 'img_main_l4udlc16b',
        'img_main_l4udlc17a', 'img_main_l4udlc17b',
    ];
    const slides = names.map((n, i) => {
        const im = document.createElement('img');
        im.src = `assets/images/${n}.jpg`;
        im.alt = '';
        if (i === 0) im.classList.add('on');
        host.appendChild(im);
        return im;
    });
    if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    setInterval(() => {
        slides[i].classList.remove('on');
        i = (i + 1) % slides.length;
        slides[i].classList.add('on');
    }, 4000);
})();
