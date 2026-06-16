const handleChangeFontSize = (e, fontSizeBtns, bookContent) => {
  e.preventDefault();

  fontSizeBtns.forEach((fontSizeBtn) => {
    fontSizeBtn.classList.remove('font-size_active');
  });

  bookContent.classList.remove('book_fs-big', 'book_fs-small');
  e.target.classList.add('font-size_active');

  if (e.target.dataset.size === 'small') {
    bookContent.classList.add('book_fs-small');
  }

  if (e.target.dataset.size === 'big') {
    bookContent.classList.add('book_fs-big');
  }
};
const handleChangeColor = (e, colorBtns, bookContent) => {
  e.preventDefault();

  colorBtns.forEach((colorBtn) => {
    colorBtn.classList.remove('color_active');
  });

  bookContent.classList.remove(
    'book_color-black',
    'book_color-gray',
    'book_color-whitesmoke',
  );

  if (e.target.dataset.textColor === 'black') {
    bookContent.classList.add('book_color-black');
    e.target.classList.add('color_active');
  }

  if (e.target.dataset.textColor === 'gray') {
    bookContent.classList.add('book_color-gray');
    e.target.classList.add('color_active');
  }

  if (e.target.dataset.textColor === 'whitesmoke') {
    bookContent.classList.add('book_color-whitesmoke');
    e.target.classList.add('color_active');
  }
};
const handleChangeBackground = (e, backgroundBtns, bookContent) => {
  e.preventDefault();

  backgroundBtns.forEach((backgroundBtn) => {
    backgroundBtn.classList.remove('color_active');
  });

  bookContent.classList.remove(
    'book_bg-gray',
    'book_bg-black',
    'book_bg-white',
  );

  if (e.target.dataset.bgColor === 'black') {
    bookContent.classList.add('book_bg-black');
    e.target.classList.add('color_active');
  }

  if (e.target.dataset.bgColor === 'gray') {
    bookContent.classList.add('book_bg-gray');
    e.target.classList.add('color_active');
  }

  if (e.target.dataset.textColor === 'white') {
    bookContent.classList.add('book_bg-white');
    e.target.classList.add('color_active');
  }
};
const init = () => {
  const controlFontSize = document.querySelector('.book__control_font-size');
  const fontSizeBtns = controlFontSize.querySelectorAll('.font-size');
  const controlColor = document.querySelector('.book__control_color');
  const colorBtns = controlColor.querySelectorAll('.color');
  const controlBackground = document.querySelector('.book__control_background');
  const backgroundBtns = controlBackground.querySelectorAll('.color');
  const bookContent = document.querySelector('.book__content');

  controlFontSize.addEventListener('click', (e) =>
    handleChangeFontSize(e, fontSizeBtns, bookContent),
  );

  controlColor.addEventListener('click', (e) =>
    handleChangeColor(e, colorBtns, bookContent),
  );

  controlBackground.addEventListener('click', (e) =>
    handleChangeBackground(e, backgroundBtns, bookContent),
  );
};

window.addEventListener('load', () => init());
