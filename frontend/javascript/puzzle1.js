// Main javascript file for all behaviour in puzzle1.html
const openModalButtons = document.querySelectorAll('[data-modal-target]')
//const closeModalButtons = document.querySelector('[data-close-btn]')
const openCorrectModal = document.querySelector('correct-modal')
const overlay = document.getElementById('overlay')
const logicPuzzle = document.getElementById('logic-puzzle')
const logicQuestion = document.getElementById('logic-question')
const cluesBox = document.getElementById('clues-box')
const clueTitle = document.getElementById('clue-box-title')
const clue1 = document.getElementById('exerpt1')
const clue2 = document.getElementById('exerpt2')
const clue3 = document.getElementById('exerpt3')
const sortableList = document.getElementById("sortable-list");
const submitBtn = document.getElementById("submit");
const tryAgainBtn = document.getElementById("tryAgainButton");
const revealAnsBtn = document.getElementById("revealAnswerButton");
const bootlegKirby = document.getElementById('bootleg-kirby');
const modal = document.getElementById('modal');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const message = document.getElementById('reason-message');
const reason1 = document.getElementById('reason1');
const reason2 = document.getElementById('reason2');
const reason3 = document.getElementById('reason3');
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
const cleaned_grid = document.getElementsByClassName('grid-item');

let question = "";
let headers = [];
let excerpts = [];
let clues = [];
let questions = [];
let answers = [];
let reasons = [];
let fillCount = 0;

updateAll();

function openModal(modal) {

    shuffleSortableList();

    modal.classList.add('active')
    overlay.classList.add('active')
    logicPuzzle.classList.add('inactive')
    logicQuestion.classList.add('inactive')
    cluesBox.classList.add('inactive')
    clueTitle.classList.add('inactive')
    clue1.classList.add('inactive')
    clue2.classList.add('inactive')
    clue3.classList.add('inactive')
}

    // Call dragDrop function after opening the modal
    dragDrop();

    bootlegKirby.addEventListener('click', () => {
        openGameDiv();
        openModal(modal);
    });

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
    button.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})
// closeModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = button.closest('.modal')
//         closeModal(modal)
//     })
// })


// Function to shuffle an array

function shuffleSortableList() {
    const items = Array.from(sortableList.children);

    // Shuffle the items using Fisher-Yates algorithm with the seeded random function
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    // Append the shuffled items back to the sortableList
    items.forEach(item => sortableList.appendChild(item));
}

function dragDrop() {
    Array.from(sortableList.children).forEach(item => {
        item.draggable = true;
    });

    let draggedItem = null;
    sortableList.addEventListener("dragstart", function (event) {
        draggedItem = event.target;
        event.dataTransfer.effectAllowed = "move";
    });

    sortableList.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    sortableList.addEventListener("drop", function (event) {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains("multi-choice-answers")) {
            const targetIndex = Array.from(sortableList.children).indexOf(target);
            const draggedIndex = Array.from(sortableList.children).indexOf(draggedItem);

            if (draggedIndex !== targetIndex) {
                sortableList.insertBefore(draggedItem, targetIndex > draggedIndex ? target.nextSibling : target);
            }
        }
    });

    submitBtn.addEventListener("click", function () {
        checkOrder();
    });
    
};

function checkOrder() {
    const correctOrder = ["Answer 1", "Answer 2", "Answer 3"]
    const currentOrder = Array.from(sortableList.children).map(item => item.textContent.trim());

    if (arraysAreEqual(currentOrder, correctOrder)) {
        // All answers are correct
        openPopup("Congrats! You're 100% correct");
    } else {
        // Check how many answers are correct
        const correctCount = correctOrder.filter((value, index) => value === currentOrder[index]).length;

        if (correctCount === 0) {
            // No correct answers
            openPopupHalf("Oops! None of your answers are correct");
        } else {
            // Partially correct answers
            openPopupHalf(`Nice try, You got ${correctCount} out of 3 correct`);
        }
    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function openPopup(message) {
    const popup = document.getElementById("popup");
    popup.querySelector('p').textContent = message;
    popup.showModal();

    popup.querySelector('button').addEventListener('click', function () {
        popup.close();
        closeGameDiv();
    });
}

function closeGameDiv() {
    // Add logic here to close the game div
    // For example, hide or remove the game div element
    const gameDiv = document.getElementById('modal'); // Replace with your actual game div id
    gameDiv.style.display = 'none'; // Hide the game div
    // Alternatively, you can remove the game div from the DOM if you don't need it anymore
    // gameDiv.parentNode.removeChild(gameDiv);
}

function openGameDiv() {
    const gameDiv = document.getElementById('modal'); // Replace with your actual game div id
    const reasDiv = document.getElementById("correct-reasons");
    gameDiv.style.display = 'block'; // Show the game div
    reasDiv.style.display = 'none'
}

function openPopupHalf(message) {
    const popup = document.getElementById("popup-half");
    popup.querySelector('p').textContent = message;
    popup.showModal();

    tryAgainBtn.addEventListener("click", function () {
        tryAgainFunction();
        popup.close();
    });
    revealAnsBtn.addEventListener("click", function () {
        const reasDiv = document.getElementById("correct-reasons");
        revealAnswerFunction();
        popup.close();
        reasDiv.style.display = 'block'
    });
}

function tryAgainFunction() {
}

function revealAnswerFunction() {
    const correctOrder = ["Answer 1", "Answer 2", "Answer 3"];

    correctOrder.forEach((value, index) => {
        const item = Array.from(sortableList.children).find(item => item.textContent.trim() === value);
        sortableList.appendChild(item);
    });

    message.textContent = "Below are the reasons for the correct order above:"
    reason1.textContent = "He sought to unite all German-speaking people into a Greater Germany and to acquire territory in Eastern Europe for agricultural and strategic purposes."
    reason2.textContent = "The strategic advantages included a more defensible eastern border and the ability to stage future military operations in the East. This was part of Hitler's broader plan for territorial expansion and dominance in Europe."
    reason3.textContent = "Germany signed a non-aggression pact with the Soviet Union, which included a secret protocol dividing Eastern Europe into spheres of influence. This pact ensured that the Soviet Union would not interfere with German actions in the West."
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

async function updateAll() {
    await getAllData();
    header1a.textContent = headers[0];
    header1b.textContent = headers[1];
    header1c.textContent = headers[2];
    header2a.textContent = headers[3];
    header2b.textContent = headers[4];
    header2c.textContent = headers[5];
    header3a.textContent = headers[6];
    header3b.textContent = headers[7];
    header3c.textContent = headers[8];
    header4a.textContent = headers[9];
    header4b.textContent = headers[10];
    header4c.textContent = headers[11];
    
    clue1.textContent = clues[0];
    clue2.textContent = clues[1];
    clue3.textContent = clues[2];

    logicQuestion.textContent = question;
}

for (let i of cleaned_grid) {
    i.addEventListener('click', () => {
        if (i.innerHTML  == '') {
            i.innerHTML  = '<img src="../assets/Yellow_x.png" width="54px" height="54px">';
            fillCount++;
        } else if (i.innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">') {
            i.innerHTML  = '<img src="../assets/Yellow_x.png" width="54px" height="54px">';
        } else {
            i.innerHTML = '';
            fillCount--;
        }
        if (fillCount >= 27) {
            checkGrid();
        }
    })
    i.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (i.innerHTML == '') {
            i.innerHTML = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
            fillCount++;
        } else if (i.innerHTML == '<img src="../assets/Yellow_x.png" width="54px" height="54px">') {
            i.innerHTML = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
        } else {
            i.innerHTML = '';
            fillCount--;
        }
        if (fillCount >= 27) {
            checkGrid();
        }
    })
}

function checkGrid() {
    if(cleaned_grid[1].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[4].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[6].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[9].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[14].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[17].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[18].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[22].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[26].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">') {
        console.log("Correct!");
    } else {
        console.log("Incorrect!");
    }
}