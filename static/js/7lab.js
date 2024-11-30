document.addEventListener('DOMContentLoaded', async () => {
    const oject_ids = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11';
    const swiperWrapper = document.getElementById('swiper-wrapper');
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');
    const dataContainer = document.getElementById('data-container');

    function renderPhotos(metmuseum) {
            console.log(metmuseum)
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <img src="${metmuseum.primaryImageSmall}" alt="${metmuseum.title}" data-title="${metmuseum.title}">
            `;
            swiperWrapper.appendChild(slide);
        };

    try {
        preloader.style.display = 'block';
        errorMessage.textContent = '';
        const response = await fetch(oject_ids);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных.');
        }
        const randomFilter = Math.random() > 0.5 ? 'more' : 'less'
        const count =
            randomFilter === 'more'
                    ? 10
                    : 20;
        const metmuseums = await response.json();
        const metmuseums_id = metmuseums.objectIDs
        console.log(metmuseums_id, count)
        for (let i = 0; i < count; i++) {
            const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+metmuseums_id[i]);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных.');
            }
            const metmuseum = await response.json();
            renderPhotos(metmuseum);
        }
        
        const swiper = new Swiper('.swiper', {
            loop: true, // Бесконечный режим
            pagination: {
                el: '.swiper-pagination', // Указывает контейнер для пагинации
                clickable: true, // Пагинация кликабельна
            },
            navigation: {
                nextEl: '.swiper-button-next', // Кнопка "вперед"
                prevEl: '.swiper-button-prev', // Кнопка "назад"
            },
        });

    } catch (error) {
        console.error(error);
        errorMessage.textContent = `⚠ Тотал анлак`;
    } finally {
        preloader.style.display = 'none';
    }
});
