document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header-mob__burger');
    const body = document.body;
    const header = document.querySelector('.header-mob');
    const menuLinks = document.querySelectorAll('.header-mob a[href^="#"]'); // Все якорные ссылки в хедере

    // Обработчик для бургер-меню
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('menu-open');
    });

    // Закрытие при клике на оверлей
    document.querySelector('.menu-overlay').addEventListener('click', function() {
        body.classList.remove('menu-open');
    });

    // Закрытие меню при клике на якорную ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('menu-open');
        });
    });

    // Обработчик скролла
    // Замените текущий обработчик скролла на этот:
    let lastScroll = 0;
    const scrollThreshold = 10; // Порог в пикселях для определения направления

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        // Если прокрутили вниз больше порога и хедер видим
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.classList.add('header-hidden');
            header.classList.remove('header-scrolled');
        }
        // Если прокрутили вверх
        else if (currentScroll < lastScroll) {
            header.classList.remove('header-hidden');

            // Добавляем scrolled-класс если не в самом верху
            if (currentScroll > 10) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        lastScroll = currentScroll;
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

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.cases-wrapper');
    const prevBtn = document.querySelector('.cases-btn__prev');
    const nextBtn = document.querySelector('.cases-btn__next');
    const cases = document.querySelectorAll('.cases-slider-container .case');
    const caseWidth = 362;
    const gap = 20;
    const visibleCases = 4;
    let currentPosition = 0;
    const maxPosition = -(cases.length - visibleCases) * (caseWidth + gap);
    const overlay = document.querySelector('.cases-overlay');

    // Создаем контейнер для попапов вне слайдера
    const popupsContainer = document.createElement('div');
    popupsContainer.className = 'popups-container';
    document.body.appendChild(popupsContainer);

    // Копируем все попапы в отдельный контейнер
    cases.forEach((caseEl, index) => {
        const popup = caseEl.querySelector('.cases-popup');
        if (popup) {
            popup.remove(); // Удаляем из DOM
            popup.id = `case-popup-${index}`; // Добавляем уникальный ID
            popupsContainer.appendChild(popup); // Переносим в контейнер
        }
    });

    // Функция для обновления состояния кнопок
    function updateButtons() {
        prevBtn.classList.toggle('disabled', currentPosition >= 0);
        nextBtn.classList.toggle('disabled', currentPosition <= maxPosition);
    }

    // Навигация слайдера
    nextBtn.addEventListener('click', function() {
        if (!nextBtn.classList.contains('disabled')) {
            currentPosition -= caseWidth + gap;
            slider.style.transform = `translateX(${currentPosition}px)`;
            updateButtons();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (!prevBtn.classList.contains('disabled')) {
            currentPosition += caseWidth + gap;
            slider.style.transform = `translateX(${currentPosition}px)`;
            updateButtons();
        }
    });

    // Обработчики для кнопок "Подробнее"
    document.querySelectorAll('.case-btn').forEach((button, index) => {
        button.addEventListener('click', function() {
            const popup = document.getElementById(`case-popup-${index}`);
            if (popup) {
                popup.style.display = 'flex';
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Закрытие попапов
    document.querySelectorAll('.cases-popup__close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const popup = this.closest('.cases-popup');
            popup.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Закрытие при клике на оверлей
    overlay.addEventListener('click', function() {
        document.querySelectorAll('.cases-popup').forEach(popup => {
            popup.style.display = 'none';
        });
        this.style.display = 'none';
        document.body.style.overflow = '';
    });

    updateButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.cases-tablet__pag .cases-btn__prev');
    const nextBtn = document.querySelector('.cases-tablet__pag .cases-btn__next');
    const cases = document.querySelectorAll('.cases-tablet .case');
    let currentSlide = 0;

    // Инициализация первого слайда
    cases[currentSlide].classList.add('active');
    prevBtn.classList.add('disabled');

    // Функция для обновления состояния кнопок
    function updateButtons() {
        prevBtn.classList.toggle('disabled', currentSlide === 0);
        nextBtn.classList.toggle('disabled', currentSlide === cases.length - 1);
    }

    // Переключение на следующий слайд
    nextBtn.addEventListener('click', function() {
        if (currentSlide < cases.length - 1) {
            cases[currentSlide].classList.remove('active');
            currentSlide++;
            cases[currentSlide].classList.add('active');
            updateButtons();
        }
    });

    // Переключение на предыдущий слайд
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            cases[currentSlide].classList.remove('active');
            currentSlide--;
            cases[currentSlide].classList.add('active');
            updateButtons();
        }
    });
});