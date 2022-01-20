'use strict';

let buttonCart = document.querySelectorAll('.catalog-grid__add-cart');
let cartCount = document.querySelector('.header__cart-count')
let cartContain = document.querySelector('.header__cart-contain')
let i = 1;
let productsArr = [];
let cartIcon = document.querySelector('.header__cart-icon');

buttonCart.forEach(function callback(button) {
    button.addEventListener('click', getsAttributes);
    button.addEventListener('click', counts);
})

cartIcon.addEventListener('mouseover', function (event) {
    cartContain.style = 'display: block';
})

cartIcon.addEventListener('mouseout', function (event) {
    cartContain.style = 'display: none';
})

/**
 * Функция формирует массив и вставляет данные в корзину 
 * @param {*} event 
 * @param {string} name - имя товара
 * @param {number} price - цена товара
 */
function getsAttributes(event) {
    let name = event.target.parentNode.parentNode.querySelector('h3').innerText;
    let price = +(event.target.parentNode.parentNode.querySelector('.catalog-grid__price').innerText.slice(1, -3));
    let obj = {
        name,
        price
    };
    productsArr.push(obj)
    let result = filterItems(productsArr);
    cartContain.innerHTML = "";
    let subTotal = null;
    for (let j = 0; j < result.length; j++) {
        console.log(result[j].name);
        let sum = result[j].groupCount * result[j].price;
        let cartDescription = `
            <ul class = "header__cart-product">
                <li class = "header__cart-name">${result[j].name}</li>
                <li class = "header__cart-number">${result[j].groupCount}</li>
                <li class = "header__cart-price">${result[j].price}$</li>
                <li class = "header__cart-sum">${sum} $</li>
            </ul>`
        cartContain.insertAdjacentHTML('beforeend', cartDescription);
        subTotal = subTotal + sum;
    }
    
    let cartTotal = `
            <div class = "header__cart-total">
            Total: ${subTotal}$
            </div>`;
    cartContain.insertAdjacentHTML('beforeend', cartTotal);

}
/**
 * Функция возвращает сгруппированый массив
 * @param {*} query 
 * @returns 
 */
function filterItems(query) {
    let newArray = [];
    productsArr.forEach(function (each) {
        if (newArray.some(r => r.name == each.name) == false) {
            let tmp = query.filter(item => item.name == each.name);
            let topush = {};
            topush.name = each.name;
            topush.price = each.price;
            topush.groupCount = tmp.length;
            newArray.push(topush);
        }
    });
    return newArray;
}

/**
 * Считает кол-во товаров в карзине
 * @param {*} event 
 * @param {number} - общее количество кликов по кнопке
 */
function counts(event) {
    cartCount.innerHTML = "";
    cartCount.insertAdjacentHTML("afterbegin", i++)
}