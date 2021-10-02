'use strict'

let addButtons = document.querySelectorAll('.item__add');
let cartDropdown = document.querySelector('.cart__dropdown');
let items = document.querySelectorAll('.item');
let totalPrice = document.querySelector('.cart__total-price-right');

// переменная для суммы в корзине
let totalSumm = 0;
// каждому элементу задаем уникальный айди
items.forEach(function (item) {
    item.setAttribute('data-id', Math.floor(Math.random() * 1000));
})

// объект в который будет добавлять айди карточек в корзине
let cartItems = {};

// обработчик клика на кнопку 'добавить'
addButtons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let parent = event.path[1];
        collectItem(parent);
    })
})
// собираем все данные о карточке
function collectItem(item) {
    let itemLink = item.querySelector('.item__link').getAttribute('href');
    let itemImg = item.querySelector('.item__img').getAttribute('src');
    let itemName = item.querySelector('.item__name').textContent;
    let itemPrice = item.querySelector('.item__price').textContent;
    let itemId = item.dataset.id;
    return addItemToCart(itemLink, itemImg, itemName, itemPrice, itemId);
}
// функция добавления карточки в корзину
function addItemToCart(link, img, name, price, id) {
    // если корзина скрыта, открываем
    if (!cartDropdown.classList.contains('cart__dropdown')) {
        cartDropdown.classList.add('cart__dropdown');
        cartDropdown.classList.remove('cart__dropdown_hidden');
    }
    // Если у нас есть такая карточка, тогда прибавляем, если нет - создаем
    if (cartItems[id] === undefined) {
        cartItems[id] = 1;
        cartDropdown.insertAdjacentHTML('afterbegin',
            `<div class="cart-item">
            <a class="cart-item__link" href="${link}" data-id="${id}">
        <img class="cart-item__img" src="${img}" alt="img">
        <div class="cart-item__info">
            <div class="cart-item__name">${name}</div>
            <div class="cart-item__rating">
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div class="cart-item__price">${cartItems[id]} x ${price}</div>
        </div>
    </a>
    <button class="cart-item__delete fas fa-times-circle">
    </button></div>`);
    } else {
        cartItems[id] = cartItems[id] + 1;
        let quantity = cartItems[id];
        let el = cartDropdown.querySelector('.cart-item__link[data-id="' + id + '"]');
        let elInfo = el.childNodes[3];
        let elPrice = elInfo.childNodes[5];
        elPrice.textContent = `${quantity} X ${price} `;
    };
    // плюсуем стоимость предмета к общей сумма
    let summ = +(price.split('$')[1]);
    totalSumm = (totalSumm + summ);
    totalPrice.textContent = "$" + totalSumm;

    // добавляем кнопке "удалить" обработчик клика
    let itemInCart = cartDropdown.querySelector('[data-id="' + id + '"]');
    let deleteBtn = itemInCart.nextElementSibling;
    deleteBtn.addEventListener('click', function (event) {
        let parent = event.currentTarget.parentElement;
        parent.parentNode.removeChild(parent);
        totalSumm = totalSumm - summ * cartItems[id];
        totalPrice.textContent = "$" + totalSumm;
        delete cartItems[id];
        if (isEmpty(cartItems)) {
            cartDropdown.classList.remove('cart__dropdown');
            cartDropdown.classList.add('cart__dropdown_hidden');
        }
    })

}

// Функция проверяет, пустая ли у нас корзина
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}
// Если корзина пустая, мы ее скрываем
if (isEmpty(cartItems)) {
    cartDropdown.classList.remove('cart__dropdown');
    cartDropdown.classList.add('cart__dropdown_hidden');
}

