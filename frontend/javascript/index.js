// Main javascript file for all behaviour in index.html
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const logicPuzzle = document.getElementById('logic-puzzle')
const logicQuestion = document.getElementById('logic-question')
const cluesBox = document.getElementById('clues-box')
const clueTitle = document.getElementById('clue-box-title')
const clue1 = document.getElementById('clue1')
const clue2 = document.getElementById('clue2')
const clue3 = document.getElementById('clue3')
const clue4 = document.getElementById('clue4')

function openModal(modal) {
    modal.classList.add('active')
    overlay.classList.add('active')
    logicPuzzle.classList.add('inactive')
    logicQuestion.classList.add('inactive')
    cluesBox.classList.add('inactive')
    clueTitle.classList.add('inactive')
    clue1.classList.add('inactive')
    clue2.classList.add('inactive')
    clue3.classList.add('inactive')
    clue4.classList.add('inactive')
}

function closeModal(modal) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    logicPuzzle.classList.remove('inactive')
    logicQuestion.classList.remove('inactive')
    cluesBox.classList.remove('inactive')
    clueTitle.classList.remove('inactive')
    clue1.classList.remove('inactive')
    clue2.classList.remove('inactive')
    clue3.classList.remove('inactive')
    clue4.classList.remove('inactive')
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

    let originalList = document.getElementById('multi-choice-container');
    let originalAnswer = originalList.querySelector('.multi-choice-answers[data-answer="' + data + '"]');
    if (originalAnswer) {
        originalAnswer.remove();
    }

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
        correctAnswer()
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

function correctAnswer() {
    closeModal(modal)

}