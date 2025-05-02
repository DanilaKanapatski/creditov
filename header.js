document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header-mob__burger');
    const menu = document.querySelector('.header-mob__menu');
    const overlay = document.querySelector('.header-mob__overlay');
    const header = document.querySelector('.header-mob');

    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        header.classList.toggle('menu-open');
    });

    overlay.addEventListener('click', function() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        header.classList.remove('menu-open');
    });

    // Закрытие меню при клике на документ
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target)) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            header.classList.remove('menu-open');
        }
    });
});