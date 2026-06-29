function sendToServer(formData, welcomeEl, userIdEl, signinBlockEl) {
  const XHR_URL = 'https://students.netoservices.ru/nestjs-backend/auth';
  const xhr = new XMLHttpRequest();

  xhr.open('POST', XHR_URL);
  xhr.onload = () =>
    processingServerResponse(xhr, welcomeEl, userIdEl, signinBlockEl);
  xhr.send(formData);
}

function processingServerResponse(xhr, welcomeEl, userIdEl, signinBlockEl) {
  const response = JSON.parse(xhr.responseText);

  if (response.success) {
    localStorage.setItem('user_id', response['user_id']);
    showWelcome(welcomeEl, userIdEl, signinBlockEl);
  } else {
    alert('Неверный логин/пароль');
  }
}

function showWelcome(welcomeEl, userIdEl, signinBlockEl) {
  const logoutButton = document.createElement('button');

  logoutButton.type = 'button';
  logoutButton.textContent = 'Выйти';

  logoutButton.addEventListener('click', () => {
    logout(userIdEl, welcomeEl, signinBlockEl, logoutButton);
  });

  welcomeEl.after(logoutButton);

  welcomeEl.classList.add('welcome_active');
  signinBlockEl.classList.remove('signin_active');
  userIdEl.textContent = localStorage.getItem('user_id');
}

function logout(userIdEl, welcomeEl, signinBlockEl, logoutButton) {
  logoutButton.remove();

  localStorage.removeItem('user_id');
  userIdEl.textContent = '';
  welcomeEl.classList.remove('welcome_active');
  signinBlockEl.classList.add('signin_active');
}

function init() {
  const signinBlockEl = document.querySelector('#signin');
  const signinFormEl = document.querySelector('#signin__form');
  const welcomeEl = document.querySelector('#welcome');
  const userIdEl = welcomeEl.querySelector('#user_id');

  if (localStorage.getItem('user_id')) {
    showWelcome(welcomeEl, userIdEl, signinBlockEl);
  }

  signinFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signinFormEl);

    sendToServer(formData, welcomeEl, userIdEl, signinBlockEl);

    signinFormEl.reset();
  });
}

init();
