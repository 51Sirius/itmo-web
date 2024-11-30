document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('scheduleData');
    if (savedData) {
        const data = JSON.parse(savedData);
        generateSchedule(data.days, data.lessons, data.language);
    }

    document.getElementById('schedule-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const days = parseInt(formData.get('days'), 10);
        const lessons = parseInt(formData.get('lessons'), 10);
        const language = formData.get('language');

        const scheduleData = { days, lessons, language };
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));

        generateSchedule(days, lessons, language);
    });
});

function generateSchedule(days, lessons, language) {
    const container = document.getElementById('result-container');
    container.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    for (let i = 1; i <= days; i++) {
        const th = document.createElement('th');
        th.innerText = `${language === 'ru' ? 'День' : 'Day'} ${i}`;
        headerRow.appendChild(th);
    }

    table.appendChild(headerRow);

    for (let i = 0; i < lessons; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < days; j++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `${language === 'ru' ? 'Занятие' : 'Lesson'} ${i + 1}`;
            td.appendChild(input);
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}
