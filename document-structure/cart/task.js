const productsEls = document.querySelectorAll('.product');
const shoppingCart = document.querySelector('.cart__products');

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
    const currentProductEl = shoppingCart.querySelector(
      `.cart__product[data-id = '${productEl.dataset.id}']`,
    );

    if (!currentProductEl) {
      const productCartEl = document.createElement('div');
      const productCartImageEl = document.createElement('img');
      const productCartCountEl = document.createElement('div');

      productCartEl.className = 'cart__product';
      productCartEl.dataset.id = productEl.dataset.id;

      productCartImageEl.className = 'cart__product-image';
      productCartImageEl.src = productImageEl.src;

      productCartCountEl.className = 'cart__product-count';
      productCartCountEl.textContent = quantityEl.textContent;

      productCartEl.append(productCartImageEl, productCartCountEl);
      shoppingCart.append(productCartEl);

      return;
    }

    const cartProductCount = currentProductEl.querySelector(
      '.cart__product-count',
    );

    cartProductCount.textContent =
      Number(cartProductCount.textContent) + Number(quantityEl.textContent);
  });
});
