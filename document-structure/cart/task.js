const productsEls = document.querySelectorAll('.product');
const shoppingCart = document.querySelector('.cart__products');
const cartEl = document.querySelector('.cart');

let cart = getCart();

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
  const savedCart = localStorage.getItem('cart');

  return savedCart ? JSON.parse(savedCart) : [];
}

function renderCart() {
  shoppingCart.innerHTML = '';

  cart.forEach((product) => {
    const productCartEl = document.createElement('div');
    const productCartImageEl = document.createElement('img');
    const productCartCountEl = document.createElement('div');
    const productCartDeleteBtnEl = document.createElement('button');

    productCartEl.className = 'cart__product';
    productCartEl.dataset.id = product.id;

    productCartImageEl.className = 'cart__product-image';
    productCartImageEl.src = product.src;

    productCartCountEl.className = 'cart__product-count';
    productCartCountEl.textContent = product.count;

    productCartDeleteBtnEl.textContent = 'Удалить';
    productCartDeleteBtnEl.style.display = 'block';
    productCartDeleteBtnEl.type = 'button';

    productCartDeleteBtnEl.addEventListener('click', () => {
      cart = cart.filter((item) => item.id !== product.id);

      saveCart();
      renderCart();
    });

    productCartEl.append(
      productCartImageEl,
      productCartCountEl,
      productCartDeleteBtnEl,
    );

    shoppingCart.append(productCartEl);
  });

  cartEl.style.display = cart.length > 0 ? 'block' : 'none';
}

function startAnimation(productEl, currentProductEl) {
  const startImageEl = productEl.querySelector('.product__image');
  const endImageEl = currentProductEl.querySelector('.cart__product-image');

  const startRect = startImageEl.getBoundingClientRect();
  const endRect = endImageEl.getBoundingClientRect();

  const clonedStartImageEl = startImageEl.cloneNode(true);

  document.body.append(clonedStartImageEl);

  clonedStartImageEl.style.position = 'fixed';
  clonedStartImageEl.style.left = `${startRect.left}px`;
  clonedStartImageEl.style.top = `${startRect.top}px`;
  clonedStartImageEl.style.width = `${startRect.width}px`;
  clonedStartImageEl.style.height = `${startRect.height}px`;
  clonedStartImageEl.style.zIndex = '1000';
  clonedStartImageEl.style.pointerEvents = 'none';

  const diffX = endRect.left - startRect.left;
  const diffY = endRect.top - startRect.top;

  const steps = 20;
  const stepX = diffX / steps;
  const stepY = diffY / steps;

  let currentStep = 0;

  const intervalId = setInterval(() => {
    currentStep += 1;

    clonedStartImageEl.style.left = `${startRect.left + stepX * currentStep}px`;
    clonedStartImageEl.style.top = `${startRect.top + stepY * currentStep}px`;

    if (currentStep >= steps) {
      clearInterval(intervalId);
      clonedStartImageEl.remove();
    }
  }, 20);
}

renderCart();

productsEls.forEach((productEl) => {
  const productImageEl = productEl.querySelector('.product__image');
  const decreaseEl = productEl.querySelector('.product__quantity-control_dec');
  const increaseEl = productEl.querySelector('.product__quantity-control_inc');
  const quantityEl = productEl.querySelector('.product__quantity-value');
  const addProductEl = productEl.querySelector('.product__add');

  decreaseEl.addEventListener('click', () => {
    quantityEl.textContent = Math.max(Number(quantityEl.textContent) - 1, 1);
  });

  increaseEl.addEventListener('click', () => {
    quantityEl.textContent = Number(quantityEl.textContent) + 1;
  });

  addProductEl.addEventListener('click', () => {
    const addedCount = Number(quantityEl.textContent);

    const cartProduct = cart.find((product) => {
      return product.id === productEl.dataset.id;
    });

    if (cartProduct) {
      cartProduct.count += addedCount;
    } else {
      cart.push({
        id: productEl.dataset.id,
        src: productImageEl.src,
        count: addedCount,
      });
    }

    saveCart();
    renderCart();

    const currentProductEl = shoppingCart.querySelector(
      `.cart__product[data-id='${productEl.dataset.id}']`,
    );

    startAnimation(productEl, currentProductEl);
  });
});
