// Main javascript file for all behaviour in puzzle1.html
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const openCorrectModal = document.querySelector('correct-modal')
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

let addedAnswers = []

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');

    if (event.target.id === 'answer-list') {
        let answerList = document.getElementById('answer-list');
        if(!addedAnswers.includes(data) && !answerExists(answerList, data)) {
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
    }
}

function answerExists(answerList, answer) {
    let answers = answerList.getElementsByClassName('multi-choice-answers');
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].innerText === answer) {
            return true;
        }
    }
    return false;
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.innerText)
}

function checkOrder() {
    let answerList = document.getElementById('answer-list')
    let answers = answerList.getElementsByClassName('multi-choice-answers')
    let correctOrder = ["Event 1: Discovery of America in 1492", "Event 2: French Revolution in 1789", "Event 3: World War II in 1939", "Event 4: Moon Landing in 1969"]

    let currentOrder = Array.from(answers).map(function (answer) {
        return answer.innerText.split('\n')[0]
    })
    console.log("Current Order:", currentOrder);
    console.log("Correct Order:", correctOrder);
    if (arraysEqual(currentOrder, correctOrder)) {
        showPopUp()
    }
}

function arraysEqual(arrOne, arrTwo) {
    if (arrOne.length != arrTwo.length) {
        return false
    }
        for (let i = 0; i < arrOne.length; i++) {
            if (arrOne[i] != arrTwo[i]) {
                return false
            }
        }
    return true
}

function allowDrop(event) {
    event.preventDefault()
}


function showPopUp() {
    let popup = document.getElementById('popup');
    popup.show();

    let closePopupButton = document.getElementById('closePopup');
    closePopupButton.addEventListener('click', function () {
      popup.close();
    });

    closeModal(modal)
  }

  async function generateRandomClues(numClues) {
    try {
        // Fetch the JSON file asynchronously
        const response = await fetch('clues.json')
        const cluesObject = await response.json()
        //extract values from the clues.json object
        const clues = Object.values(cluesObject)

        const randomClues = []

        for (let i = 0; i < numClues; i++) {
            // Get a random index from the clues array
            const randomIndex = Math.floor(Math.random() * clues.length)
            // Push the randomly selected event to the randomClues array
            randomClues.push(clues[randomIndex])
        }
        return randomClues
    } catch (error) {
        console.error('Error fetching JSON file', error)
        throw error
    }
}
generateRandomClues(4)
    