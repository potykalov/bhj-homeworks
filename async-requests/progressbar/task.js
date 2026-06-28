function handleFormSubmit(e, formEl, progressBarEl, sendButtonEl) {
  e.preventDefault();

  const formData = new FormData(formEl);

  loadToServer(formData, progressBarEl, sendButtonEl);
}

function handleProgressBarProgress(e, progressBarEl) {
  progressBarEl.value = e.loaded / e.total;
}

function handleProgressBarLoadstart(e, sendButtonEl) {
  sendButtonEl.disabled = true;
}

function handleProgressBarLoadend(e, sendButtonEl) {
  sendButtonEl.disabled = false;
}

function loadToServer(data, progressBarEl, sendButtonEl) {
  const RESPONSE_URL = 'https://students.netoservices.ru/nestjs-backend/upload';
  const response = new XMLHttpRequest();

  response.open('POST', RESPONSE_URL);

  response.upload.addEventListener('loadstart', (e) => {
    handleProgressBarLoadstart(e, sendButtonEl);
  });

  response.upload.addEventListener('progress', (e) => {
    handleProgressBarProgress(e, progressBarEl);
  });

  response.upload.addEventListener('loadend', (e) => {
    handleProgressBarLoadend(e, sendButtonEl);
  });

  response.send(data);
}

function init() {
  const progressBarEl = document.querySelector('#progress');
  const formEl = document.querySelector('#form');
  const sendButtonEl = document.querySelector('#send');

  formEl.addEventListener('submit', (e) => {
    handleFormSubmit(e, formEl, progressBarEl, sendButtonEl);
  });
}

init();
