window.addEventListener('load', () => {
    let loadTime = performance.now();
    const block = document.getElementById('load');
    if (block) {
        block.innerHTML = 'Page load time is ' + loadTime.toFixed(2) + ' ms';
    }
});