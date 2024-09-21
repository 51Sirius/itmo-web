const buttons = document.querySelectorAll('.button')


for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener('mousemove', rising);
    button.addEventListener('mouseout', stopRising);
}


function rising(event) {
    const button = this
    button.style.background = '#FAFAFA'
    button.style.color = '#171717'
}

function stopRising(event) {
    const button = this
    button.style.background = 'none'
    button.style.color = '#FAFAFA'
}

if (document.location.href.includes("contacts")){
    block = document.getElementById("contacts")
    block.classList.add("active")
}

if (document.location.href.includes("anime")){
    block = document.getElementById("favor")
    block.classList.add("active")
}

if (document.location.href.includes("labus")){
    block = document.getElementById("projects")
    block.classList.add("active")
}