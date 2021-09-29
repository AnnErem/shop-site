
'use strict'

let btn = document.querySelector('.sidebar__open');
let sidebar = document.querySelector('.sidebar');

// создаем аналог медиа запроса и скрываем все, что хотим скрыть
const mediaQuery = window.matchMedia('(max-width: 820px)');

function handleTabletChange(e) {
    if (e.matches) {
        sidebar.classList.remove('sidebar--open');
        sidebar.classList.add('sidebar--close');
    } else if (sidebar.classList.contains('sidebar--close')) {
        sidebar.classList.remove('sidebar--close');
        sidebar.classList.add('sidebar--open');
    }
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)


// ставим обработчик клика на кнопочку, которая раскрывает нам боковую навигацию
btn.addEventListener('click', function (event) {
    if (sidebar.classList.contains('sidebar--open')) {
        sidebar.classList.remove('sidebar--open');
        sidebar.classList.add('sidebar--close');
    } else {
        sidebar.classList.remove('sidebar--close');
        sidebar.classList.add('sidebar--open');
    };
});

