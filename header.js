document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header-mob__burger');
    const body = document.body;
    const header = document.querySelector('.header-mob'); // Предполагается, что у вас есть класс .header у вашего хедера

    // Обработчик для бургер-меню
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('menu-open');
    });

    // Закрытие при клике на оверлей
    document.querySelector('.menu-overlay').addEventListener('click', function() {
        body.classList.remove('menu-open');
    });

    // Обработчик скролла
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            header.classList.add('header-scrolled'); // Добавляем класс при скролле
        } else {
            header.classList.remove('header-scrolled'); // Убираем класс, когда страница вверху
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutList = document.querySelector('.about-list');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');

                // Центральный элемент — появляется первым
                items[1].style.animation = 'fadeInUp 0.8s forwards 0.3s';

                // Левый и правый — с задержкой
                items[0].style.animation = 'slideInFromLeft 0.8s forwards 0.6s';
                items[2].style.animation = 'slideInFromRight 0.8s forwards 0.6s';

                // Отключаем наблюдение после анимации
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Срабатывает, когда 50% блока в зоне видимости
    });

    observer.observe(aboutList);
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutListMob = document.querySelector('.about-list__mob');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');

                // Запускаем анимации с задержкой для каждого элемента
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInUp 0.6s forwards`;
                    }, index * 300); // Задержка: 0ms, 300ms, 600ms
                });

                // Отключаем наблюдение после анимации
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Срабатывает, когда 30% блока в зоне видимости
    });

    observer.observe(aboutListMob);
});

document.addEventListener('DOMContentLoaded', function() {
    const consultationList = document.querySelector('.consultation-list');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');

                // Последовательное появление с задержкой
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInUp 0.6s forwards`;
                    }, index * 300); // Задержка: 0, 300, 600 мс
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(consultationList);
});