/* Faithful behaviours for the tours top:
   1) loading overlay fade-out (real #lovl)  2) AOS-style scroll reveal (original used AOS). */

// 1. loading overlay
addEventListener('load', () => {
    const o = document.getElementById('lovl');
    if (o) setTimeout(() => o.classList.add('hide'), 500);
});

// 2. scroll reveal
(function aos() {
    const els = document.querySelectorAll('.aos');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
})();
