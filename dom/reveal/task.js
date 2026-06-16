const init = () => {
  showReveal();
};

const showReveal = () => {
  const reveals = document.querySelectorAll('.reveal');

  document.addEventListener('scroll', () => {
    reveals.forEach((reveal) => {
      if (reveal.getBoundingClientRect().top <= window.innerHeight) {
        reveal.classList.add('reveal_active');
      }
    });
  });
};

document.addEventListener('load', init());
