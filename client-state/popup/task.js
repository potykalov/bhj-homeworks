function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, props = {}) {
  let exp = props.expires;

  if (typeof exp === 'number' && exp) {
    const date = new Date();

    date.setTime(date.getTime() + exp * 1000);

    exp = props.expires = date;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);

  let updatedCookie = `${name}=${encodedValue}`;

  for (const propName in props) {
    updatedCookie += `; ${propName}`;

    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}

function init() {
  const subscribeModalEl = document.querySelector('#subscribe-modal');
  const modalCloseEl = document.querySelector('.modal__close');

  if (!getCookie('subscribeModalClosed')) {
    subscribeModalEl.classList.add('modal_active');
  }

  modalCloseEl.addEventListener('click', () => {
    setCookie('subscribeModalClosed', 'true');
    subscribeModalEl.classList.remove('modal_active');
  });
}

init();
