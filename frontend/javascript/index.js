// Main javascript file for all behaviour in index.html
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')

function openModal(modal) {
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active') 
    modals.forEach(modal => {
        closeModal(modal)
    })
})

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    let draggedAnswer = document.createElement('div');
    draggedAnswer.className = 'multi-choice-answers';
    draggedAnswer.innerText = data;
    draggedAnswer.draggable = true;
    draggedAnswer.ondragstart = function (dragEvent) {
        drag(dragEvent, draggedAnswer);
    };
    event.target.appendChild(draggedAnswer);

    checkOrder();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.innerText)
}

function checkOrder() {
    let answerList = document.getElementById('answer-list')
    let answers = answerList.getElementsByClassName('multi-choice-answers')
    let correctOrder = ["Event 1: Discovery of America in 1492", "Event 2: French Revolution in 1789", "Event 3: World War II in 1939", "Event 4: Moon Landing in 1969"]

    let currentOrder = Array.from(answers).map(function (answer) {
        return answer.innerText
    })

    if (arraysEqual(currentOrder, correctOrder)) {
        alert("Congrats!!, You've arrenged the events in the correct order")
    }
}

function arraysEqual(arrOne, arrTwo) {
    if (arrOne.length != arrTwo.length) {
        return false
    } else {
        for (let i = 0; i < arrOne.length; i++) {
            if (arrOne[i] != arrTwo[i]) {
                return false
            }
        }
    }
    return true
}

function allowDrop(event) {
    event.preventDefault()
}