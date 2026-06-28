function loadFromServer(callback, pollTitle, pollAnswers) {
  const RESPONSE_URL = 'https://students.netoservices.ru/nestjs-backend/poll';
  const response = new XMLHttpRequest();

  response.open('GET', RESPONSE_URL);
  response.send();

  response.onload = () => {
    const loadedResponse = JSON.parse(response.responseText);
    callback(loadedResponse, pollTitle, pollAnswers);
  };
}
function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;

  return element;
}
function renderPolls(polls, pollTitle, pollAnswers) {
  const pollsId = polls['id'];

  pollTitle.textContent = polls['data']['title'];

  polls['data']['answers'].forEach((answer, index) => {
    const buttonAnswerEl = createElement('button', 'poll__answer');

    buttonAnswerEl.textContent = answer;

    buttonAnswerEl.addEventListener('click', () => {
      sendVote(pollsId, index, pollAnswers);
    });

    pollAnswers.append(buttonAnswerEl);
  });
}
function renderVotes(votes, pollAnswers) {
  const allVotes = calculateAllVotes(votes);

  pollAnswers.innerHTML = '';

  votes['stat'].forEach((vote) => {
    const voteEl = createElement('div', '');
    const percent = (vote['votes'] / allVotes) * 100;

    voteEl.textContent = `${vote['answer']}: ${percent.toFixed(2)}%`;

    pollAnswers.append(voteEl);
  });
}
function sendVote(pollsId, index, pollAnswers) {
  const RESPONSE_URL = 'https://students.netoservices.ru/nestjs-backend/poll';
  const request = new XMLHttpRequest();

  request.open('POST', RESPONSE_URL);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(`vote=${pollsId}&answer=${index}`);

  request.onload = () => {
    const requestParse = JSON.parse(request.responseText);

    alert('Спасибо, ваш голос засчитан!');
    renderVotes(requestParse, pollAnswers);
  };
}
function calculateAllVotes(votes) {
  return votes['stat'].reduce((acc, item) => {
    return (acc += item['votes']);
  }, 0);
}
function init() {
  const pollTitle = document.querySelector('#poll__title');
  const pollAnswers = document.querySelector('#poll__answers');

  loadFromServer(renderPolls, pollTitle, pollAnswers);
}

init();
