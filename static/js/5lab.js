document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('scheduleData');
    if (savedData) {
        const data = JSON.parse(savedData);
        generateSchedule(data.days, data.lessons, data.language);
    }

    document.getElementById('schedule-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const lessons = document.getElementById('lessons').value;
        const language = document.getElementById('language').value;
        const scheduleData = {
            days,
            lessons,
            language
        };
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
            td.innerText = `${language === 'ru' ? 'Занятие' : 'Lesson'} ${i + 1}`;
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}
