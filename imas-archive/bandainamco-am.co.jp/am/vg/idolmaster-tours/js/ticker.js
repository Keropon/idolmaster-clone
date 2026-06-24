$(document).ready(function(){
  const animTime = 8000;
  const speed = 50;
  const limit = 0;
  let animId;
  let isRunning = false;

  const ticker = document.querySelector('.ticker');
  loadTicker();

  function loadTicker() {
    tickerAnim();
    animId = setInterval(tickerAnim, animTime);
    isRunning = true;
  }

  function tickerAnim() {
    const items = ticker.querySelectorAll('.ticker-item');
    const running = ticker.querySelector('.run');
    let idx, link, first, next;
    if (!running) {
      first = items[0];
      link = first.querySelector('a');
      first.classList.add('fadeInDown', 'run');
      first.style.zIndex = 1;
      setTimeout(textMove, 1000, link);
    } else {
      for (let i = 0; i < items.length; i++) {
        if (items[i] == running) {
          idx = i;
          break;
        }
      }
      next = items[(idx + 1) % items.length];
      running.classList.replace('fadeInDown', 'fadeOutDown');
      setTimeout(() => {
        running.classList.remove('fadeOutDown', 'run');
        running.style.zIndex = 0;
        link = running.querySelector('a');
        link.style.transform = 'none';
        next.classList.add('fadeInDown', 'run');
        next.style.zIndex = 1;
        link = next.querySelector('a');
        setTimeout(textMove, 1000, link);
      }, 300);
    }
  }

  function textMove(elm) {
    const move = elm.parentNode.clientWidth - elm.clientWidth;
    if (move < 0) {
      elm.style.transform = 'translateX(' + move + 'px)';
      elm.style.transitionDuration = Math.abs(move) / speed + 's';
    }
  }

  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= limit) {
      ticker.style.display = 'none';
      clearInterval(animId);
      isRunning = false;
    } else {
      if (!isRunning) {
        ticker.style.display = 'block';
        animId = setInterval(tickerAnim, animTime);
        isRunning = true;
      }
    }
  });
});
