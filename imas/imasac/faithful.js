/* Faithful behaviour for the archive: gif rollover.
   Original convention inserts "2" before the extension:
   menu-what.gif  <->  menu-what2.gif  (onmouseover this.src). */
document.querySelectorAll('img[data-ro]').forEach((img) => {
    const base = img.getAttribute('src');
    const over = img.dataset.over || base.replace(/\.(gif|jpg|png)$/i, '2.$1');
    new Image().src = over;                       // preload
    const a = img.closest('a') || img;
    a.addEventListener('pointerenter', () => { img.src = over; });
    a.addEventListener('pointerleave', () => { img.src = base; });
});
