document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');
    const dataContainer = document.getElementById('data-container');

    const API_URL = 'https://jsonplaceholder.typicode.com/comments';

    function renderComments(comments) {
        dataContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <h4>${comment.name} (${comment.email})</h4>
                <p>${comment.body}</p>
            `;
            dataContainer.appendChild(commentElement);
        });
    }

    async function fetchComments() {
        try {
            preloader.style.display = 'block';
            errorMessage.textContent = '';
            const randomFilter = Math.random() > 0.5 ? 'above' : 'below'
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const comments = await response.json();
            const filteredComments =
                randomFilter === 'above'
                    ? comments.filter(comment => comment.id >= 10  && comment.id < 30)
                    : comments.filter(comment => comment.id < 10);

            renderComments(filteredComments);
        } catch (error) {
            console.error(error);
            errorMessage.textContent = `⚠ Тотал анлак`;
        } finally {
            preloader.style.display = 'none';
        }
    }
    fetchComments();
});
