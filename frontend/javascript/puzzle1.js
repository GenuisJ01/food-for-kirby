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
const header1a = document.getElementById('h1a');
const header1b = document.getElementById('h1b');
const header1c = document.getElementById('h1c');
const header2a = document.getElementById('h2a');
const header2b = document.getElementById('h2b');
const header2c = document.getElementById('h2c');
const header3a = document.getElementById('h3a');
const header3b = document.getElementById('h3b');
const header3c = document.getElementById('h3c');
const header4a = document.getElementById('h4a');
const header4b = document.getElementById('h4b');
const header4c = document.getElementById('h4c');
let question = "";
let headers = [];
let excerpts = [];
let clues = [];
let questions = [];
let answers = [];
let reasons = [];

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

//removes the modal and overlay and brings back all other elements
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

//adds overlay to the background when modal button is clicked
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active') 
    modals.forEach(modal => {
        closeModal(modal)
    })
})

//will open whatever modal is attached to that button
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})


//not functional
function createRandomDivs() {
    // Get the multi-choice-container
    const multiChoiceContainer = document.getElementById('multi-choice-container');

    // Check if answers is empty (not fetched yet)
    if (answers.length === 0) {
        console.error('Answers not fetched yet. Call getAllData first.');
        return;
    }

    // Shuffle the answers array to get a random order
    const shuffledAnswers = shuffleArray(answers.flat());

    // Create and append 4 divs with random order to the multi-choice-container
    for (let i = 1; i <= 4; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'multi-choice-answers';
        newDiv.id = 'choice' + i;
        newDiv.draggable = true;
        newDiv.ondragstart = function (event) {
            drag(event);
        };
        newDiv.setAttribute('data-answer', shuffledAnswers[i - 1]);
        newDiv.innerText = shuffledAnswers[i - 1];
        multiChoiceContainer.appendChild(newDiv);
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage
getAllData().then(() => {
    // Call the function to create random divs after fetching answers
    createRandomDivs();
});

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
    } else if(arraysHalfEqual(currentOrder, correctOrder)) {
        showPopUpHalf()
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

//not working correctly, returns true immediatley
function arraysHalfEqual(arr1, arr2) {
    const minLength = arr1.length
    const halfLength = Math.ceil(minLength / 2)

    while (arr1.length !== arr2.length) {
        if (arr1.length < arr2.length) {
            arr1.push(null); // Placeholder for missing values
        } else {
            arr2.push(null); // Placeholder for missing values
        }
    }

    for (let i = 0; i < halfLength; i++) {
        if (arr1[i] !== arr2[i]) {
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

  //not working correctly
  function showPopUpHalf() {
    let popup = document.getElementById('popup-half');
    popup.show();

    let closePopupButton = document.getElementById('closePopup-half');
    closePopupButton.addEventListener('click', function () {
      popup.close();
    });

    closeModal(modal)
  }


async function getAllData() {
    const response = await fetch("http://localhost:3000/clues/1")
    const information = await response.json();
    question = information.question;
    clues.push(information.clue1, information.clue2, information.clue3);
    excerpts.push(information.excerpt1, information.excerpt2, information.excerpt3);
    questions.push(information.question1, information.question2, information.question3);
    answers.push([information.answers1a, information.answers1b, information.answers1c, information.answers1d], [information.answers2a, information.answers2b, information.answers2c, information.answers2d], [information.answers3a, information.answers3b, information.answers3c, information.answers3d]);
    reasons.push([information.reasons1a, information.reasons1b, information.reasons1c, information.reasons1d], [information.reasons2a, information.reasons2b, information.reasons2c, information.reasons2d], [information.reasons3a, information.reasons3b, information.reasons3c, information.reasons3d]);
    headers.push(information.h1a, information.h1b, information.h1c, information.h2a, information.h2b, information.h2c, information.h3a, information.h3b, information.h3c, information.h4a, information.h4b, information.h4c);
}
