const toggleCases = (card) => {
  const rotatorCases = card.querySelectorAll('.rotator__case');
  const activeRotatorCase = card.querySelector('.rotator__case_active');
  const speed = Number(activeRotatorCase.dataset.speed);

  activeRotatorCase.classList.remove('rotator__case_active');

  if (activeRotatorCase.nextElementSibling === null) {
    rotatorCases[0].classList.add('rotator__case_active');
  } else {
    activeRotatorCase.nextElementSibling.classList.add('rotator__case_active');
  }

  setTimeout(() => toggleCases(card), speed);
};
const setColorOfTexts = (card) => {
  const rotatorCases = card.querySelectorAll('.rotator__case');

  rotatorCases.forEach((rotatorCase) => {
    rotatorCase.style.color = rotatorCase.dataset.color;
  });
};
const init = () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const rotatorCaseActive = card.querySelector('.rotator__case_active');
    const speed = Number(rotatorCaseActive.dataset.speed);

    setColorOfTexts(card);

    setTimeout(() => toggleCases(card), speed);
  });
};

window.addEventListener('load', init);
