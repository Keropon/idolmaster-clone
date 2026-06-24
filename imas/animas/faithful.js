/* Faithful behaviour for the anime products page: gentle scroll reveal of product rows.
   (Original used a movie-bg + standard fades; kept minimal and reduced-motion aware.) */
(function reveal() {
    const els = document.querySelectorAll('.ds-product, .ds-h4');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    els.forEach((e) => { e.style.opacity = 0; e.style.transform = 'translateY(18px)';
        e.style.transition = 'opacity .6s ease, transform .6s ease'; });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
})();
