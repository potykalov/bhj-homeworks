function loadFromServer(callback, itemsEl, loaderEl) {
  const RESPONSE_URL =
    'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
  const response = new XMLHttpRequest();

  response.open('GET', RESPONSE_URL);
  response.send();
  response.onload = () => {
    saveToLocalStorage(response.responseText);
    const currencies = JSON.parse(response.responseText);
    callback(currencies, itemsEl, loaderEl);
  };
}
function saveToLocalStorage(currencies) {
  localStorage.setItem('currencies', currencies);
}
function loadFromLocalStorage() {
  const currencies = localStorage.getItem('currencies');

  if (currencies) {
    return JSON.parse(currencies);
  }

  return null;
}
function renderCurrencies(currencies, itemsEl, loaderEl) {
  const valutes = currencies.response.Valute;

  itemsEl.innerHTML = '';

  loaderEl.classList.remove('loader_active');

  for (const key in valutes) {
    const itemEl = document.createElement('div');
    const itemCodeEl = document.createElement('div');
    const itemValueEl = document.createElement('div');
    const itemCurrencyEl = document.createElement('div');

    itemEl.className = 'item';
    itemCodeEl.className = 'item__code';
    itemValueEl.className = 'item__value';
    itemCurrencyEl.className = 'item__currency';

    itemCodeEl.textContent = valutes[key]['CharCode'];
    itemValueEl.textContent = valutes[key]['Value'];
    itemCurrencyEl.textContent = 'руб.';

    itemEl.append(itemCodeEl, itemValueEl, itemCurrencyEl);
    itemsEl.append(itemEl);
  }
}
function init() {
  const itemsEl = document.querySelector('#items');
  const loaderEl = document.querySelector('.loader');
  const savedCurrencies = loadFromLocalStorage();

  if (savedCurrencies) {
    renderCurrencies(savedCurrencies, itemsEl, loaderEl);
  }

  loadFromServer(renderCurrencies, itemsEl, loaderEl);
}

init();
