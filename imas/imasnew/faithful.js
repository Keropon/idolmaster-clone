/* Faithful behaviour for the 20th portal: scroll reveal of news rows / banners. */
(function aos() {
    const els = document.querySelectorAll('.aos');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
})();
