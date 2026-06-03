function init() {
  const deadEl = document.querySelector('#dead');
  const lostEl = document.querySelector('#lost');

  startGame(deadEl, lostEl);
}

function startGame(deadEl, lostEl) {
  for (let i = 1; i <= 9; i++) {
    const holeEl = getHole(i);

    holeEl.onclick = () => {
      if (holeEl.className.includes('hole_has-mole')) {
        deadEl.textContent = Number(deadEl.textContent) + 1;
      } else lostEl.textContent = Number(lostEl.textContent) + 1;

      if (Number(lostEl.textContent) === 5) {
        lostEl.textContent === 5;
        alert('Вы проиграли!');
        resetGame(deadEl, lostEl);
      }

      if (Number(deadEl.textContent) === 10) {
        alert('Вы выиграли!');
        resetGame(deadEl, lostEl);
      }
    };
  }
}

function resetGame(deadEl, lostEl) {
  deadEl.textContent = 0;
  lostEl.textContent = 0;
}

function getHole(i) {
  return document.querySelector(`#hole${i}`);
}

init();
