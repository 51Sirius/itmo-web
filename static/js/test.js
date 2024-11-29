window.addEventListener('load', () => {
    let loadTime = performance.now();
    const block = document.getElementById('load');
    if (block) {
        block.innerHTML = 'Page load time is ' + loadTime.toFixed(2) + ' ms';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheduleForm');
    const resultContainer = document.getElementById('resultContainer');

    // Функция для обработки отправки формы
    function handleSubmit(event) {
        event.preventDefault();
        
        const weekType = document.querySelector('input[name="weekType"]:checked').value;
        const maxLessons = parseInt(document.getElementById('maxLessons').value);
        const language = document.querySelector('input[name="language"]:checked').value;

        generateSchedule(weekType, maxLessons, language).then(result => {
            resultContainer.innerHTML = result;
        });
    }

    // Функция для генерации расписания
    async function generateSchedule(weekType, maxLessons, language) {
        const schedule = await fetch(`/api/generate-schedule?weekType=${weekType}&maxLessons=${maxLessons}&language=${language}`);
        return await schedule.text();
    }

    // Обработка отправки формы
    form.addEventListener('submit', handleSubmit);

    // Загрузка сохраненных данных из localStorage
    loadSavedData();
});

// Функция для загрузки сохраненных данных из localStorage
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('scheduleParams'));
    
    if (savedData) {
        Object.entries(savedData).forEach(([key, value]) => {
            const input = document.querySelector(`input[name="${key}"][value="${value}"]`);
            if (input) {
                input.checked = true;
            }
        });
    }
}

// Функция для сохранения данных в localStorage
function saveData() {
    const formData = new FormData(form);
    const params = {};
    formData.forEach((value, key) => {
        if (key !== 'weekType' && key !== 'language') { // Игнорируем checkbox
            params[key] = value;
        }
    });

    localStorage.setItem('scheduleParams', JSON.stringify(params));
}