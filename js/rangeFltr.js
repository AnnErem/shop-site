// осуществляем сортировку цены
let rangeBackground = document.querySelector('.rangeFltr');
let rangeBetween = document.querySelector('.rangeFltr__between');
let rangeBtnMin = document.querySelector('.rangeFltr__buttons-min');
let rangeBtnMax = document.querySelector('.rangeFltr__buttons-max');
let rangePriceMin = document.querySelector('.rangeFltr__prices-min');
let rangePriceMax = document.querySelector('.rangeFltr__prices-max');
// получили координаты
let coordRangeBackground = rangeBackground.getBoundingClientRect();
let coordRangeBtnMin = rangeBtnMin.getBoundingClientRect();
let coordRangeBtnMax = rangeBtnMax.getBoundingClientRect();
// выставляем цены
rangePriceMin.textContent = '$' + Math.round((coordRangeBtnMin.left - coordRangeBackground.left) / (rangeBackground.clientWidth / 1000));

rangePriceMax.textContent = '$' + Math.round((coordRangeBtnMax.left - coordRangeBackground.left) / (rangeBackground.clientWidth / 1000));



// при нажатии на кнопку минимальной цены
rangeBtnMin.onmousedown = function (event) {
    // следим за движением мышки
    function onMouseMove(event) {
        let moveX = event.clientX - coordRangeBackground.left;
        let coordMax = rangeBtnMax.getBoundingClientRect();
        let coordMin = rangeBtnMin.getBoundingClientRect();
        // следим, чтобы не выехало за пределы range 
        if (moveX < 0) {
            moveX = 0;
        }

        // следим, чтобы не выехало за предели кнопки max цены
        if (event.clientX >= coordMax.left) {
            rangeBtnMin.style.left = coordMax.left - coordRangeBackground.left + 'px';
        } else {
            // меняем минимальную цену, 1000 в данном случае это макс стоимость
            let changePrice = Math.round(moveX / (rangeBackground.clientWidth / 1000));
            rangePriceMin.textContent = '$' + changePrice;
            // меняем значения положения кнопки и нужных цен
            rangeBtnMin.style.left = moveX + 'px';
            rangeBetween.style.left = moveX + 2 + 'px';
            rangeBetween.style.width = coordMax.left - coordMin.left + 2 + 'px';
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp)
};

// при нажатии на кнопку максимальной цены
rangeBtnMax.onmousedown = function (event) {
    // следим за движением мышки
    function onMouseMove(event) {
        let moveX = event.clientX - coordRangeBackground.left;
        let coordMax = rangeBtnMax.getBoundingClientRect();
        let coordMin = rangeBtnMin.getBoundingClientRect();
        // следим, чтобы не выехало за пределы range 
        if (moveX >= rangeBackground.clientWidth) {
            moveX = rangeBackground.clientWidth;
        }
        // следим, чтобы не выехало за предели кнопки min цены
        if (event.clientX <= coordMin.left) {
            rangeBtnMax.style.left = coordMin.left - coordRangeBackground.left + 'px';
        } else {
            // меняем минимальную цену, 1000 в данном случае это макс стоимость
            let changePrice = Math.round(moveX / (rangeBackground.clientWidth / 1000));
            rangePriceMax.textContent = '$' + changePrice;
            // меняем значения положения кнопки и нужных цен
            rangeBtnMax.style.left = moveX + 2 + 'px';
            rangeBetween.style.width = coordMax.left - coordMin.left + 2 + 'px';
            rangeBetween.style.left = coordMin.left - coordRangeBackground.left + 2 + 'px';
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp)
};