document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header-mob__burger');
    const body = document.body;

    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('menu-open');
    });

    // Закрытие при клике на оверлей
    document.querySelector('.menu-overlay').addEventListener('click', function() {
        body.classList.remove('menu-open');
    });
});