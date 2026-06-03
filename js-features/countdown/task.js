function renderTimer(count, timerEl) {
  let hours = Math.floor(count / 3600);
  let minutes = Math.floor((count % 3600) / 60);
  let seconds = count % 60;

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timerEl.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer(count, timerEl) {
  const timer = setInterval(() => {
    count--;

    renderTimer(count, timerEl);

    if (count === 0) {
      clearInterval(timer);
      location.assign('https://code.visualstudio.com/thank-you?dv=osx');
      setTimeout(() => alert('Вы победили в конкурсе!'), 1000);
    }
  }, 1000);
}

function init() {
  const timerEl = document.querySelector('#timer');
  const count = timerEl.textContent;

  renderTimer(count, timerEl);

  startTimer(count, timerEl);
}

init();
