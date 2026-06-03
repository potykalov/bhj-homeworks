function init() {
  const cookieEl = document.querySelector('#cookie');
  const counterEl = document.querySelector('#clicker__counter');
  const clickerEl = document.querySelector('#clicker__speed');
  let lastClickTime = null;

  cookieEl.onclick = () => {
    counterEl.textContent++;

    const now = new Date();

    if (lastClickTime !== null) {
      const diffMs = now - lastClickTime;
      const diffSec = diffMs / 1000;
      const speed = 1 / diffSec;

      clickerEl.textContent = speed.toFixed(2);
    }

    lastClickTime = now;

    if (cookieEl.width === 200) {
      cookieEl.width = 250;
    } else cookieEl.width = 200;
  };
}

init();
