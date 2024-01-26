// Main javascript file for all behaviour in puzzle1.html
const openModalButtons = document.querySelectorAll('[data-modal-target]')
// const closeModalButtons = document.querySelector('[data-close-btn]')
const openCorrectModal = document.querySelector('correct-modal')
const overlay = document.getElementById('overlay')
const logicPuzzle = document.getElementById('logic-puzzle')
const logicQuestion = document.getElementById('logic-question')
const cluesBox = document.getElementById('exerpts-box')
const clueTitle = document.getElementById('exerpts-box-title')
const excerpt1 = document.getElementById('exerpt1')
const excerpt2 = document.getElementById('exerpt2')
const excerpt3 = document.getElementById('exerpt3')
const clue1 = document.getElementById('clue1');
const clue2 = document.getElementById('clue2');
const clue3 = document.getElementById('clue3');
const sortableList = document.getElementById("sortable-list");
const submitBtn = document.getElementById("submit");
const tryAgainBtn = document.getElementById("tryAgainButton");
const revealAnsBtn = document.getElementById("revealAnswerButton");
const bootlegKirby = document.getElementById('bootleg-kirby');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const message = document.getElementById('reason-message');
const reason1 = document.getElementById('reason1');
const reason2 = document.getElementById('reason2');
const reason3 = document.getElementById('reason3');
const reason4 = document.getElementById('reason4');
const header1a = document.getElementById('h1a2');
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
let reason1Text;
let reason2Text;
let reason3Text;
let reason4Text;

updateAll();

function openModal(modal) {

    shuffleSortableList();

    modal.classList.add('active')
    overlay.classList.add('active')
    logicPuzzle.classList.add('inactive')
    logicQuestion.classList.add('inactive')
    cluesBox.classList.add('inactive')
    clueTitle.classList.add('inactive')
    excerpt1.classList.add('inactive');
    excerpt2.classList.add('inactive');
    excerpt3.classList.add('inactive');
    clue1.classList.add('inactive')
    clue2.classList.add('inactive')
    clue3.classList.add('inactive')
}

    // Call dragDrop function after opening the modal
    dragDrop();

    // bootlegKirby.addEventListener('click', () => {
    //     openGameDiv();
    //     openModal(modal);
    // });

//removes the modal and overlay and brings back all other elements
function closeModal(modal) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    logicPuzzle.classList.remove('inactive')
    logicQuestion.classList.remove('inactive')
    cluesBox.classList.remove('inactive')
    clueTitle.classList.remove('inactive')
    excerpt1.classList.remove('inactive');
    excerpt2.classList.remove('inactive');
    excerpt3.classList.remove('inactive');
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

// openModalButtons.forEach(button => {
//     button.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//         const modal = document.querySelector(button.dataset.modalTarget)
//         openGameDiv();
//         openModal(modal);
//     })
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalTarget)
//         openGameDiv();
//         openModal(modal);
//     })
// })
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
    const correctOrder = answers[0];
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
            openPopupHalf(`Nice try, You got ${correctCount} out of 4 correct`);
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
    const correctOrder = answers[0];

    correctOrder.forEach((value, index) => {
        const item = Array.from(sortableList.children).find(item => item.textContent.trim() === value);
        sortableList.appendChild(item);
    });

    message.textContent = "Below are the reasons for the correct order above:"
    reason1.textContent = reason1Text;
    reason2.textContent = reason2Text;
    reason3.textContent = reason3Text;
    reason4.textContent = reason4Text;
}

async function getAllData() {
    const response = await fetch("http://localhost:3000/clues/2")
    const information = await response.json();
    question = information.question;
    clues.push(information.clue1, information.clue2, information.clue3);
    excerpts.push(information.excerpt1, information.excerpt2, information.excerpt3);
    questions.push(information.question1, information.question2, information.question3);
    answers.push([information.answer1a, information.answer1b, information.answer1c, information.answer1d], [information.answer2a, information.answer2b, information.answer2c, information.answer2d], [information.answer3a, information.answer3b, information.answer3c, information.answer3d]);
    reasons.push([information.reason1a, information.reason1b, information.reason1c, information.reason1d], [information.reason2a, information.reason2b, information.reason2c, information.reason2d], [information.reason3a, information.reason3b, information.reason3c, information.reason3d]);
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

    excerpt1.textContent = excerpts[0];
    excerpt2.textContent = excerpts[1];
    excerpt3.textContent = excerpts[2];

    logicQuestion.textContent = question;

    choice1.textContent = answers[0][0];
    choice2.textContent = answers[0][1];
    choice3.textContent = answers[0][2];
    choice4.textContent = answers[0][3];

    reason1Text = reasons[0][0];
    reason2Text = reasons[0][1];
    reason3Text = reasons[0][2];
    reason4Text = reasons[0][3];

    modalTitle.innerHTML = questions[0];
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
    if(cleaned_grid[0].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[5].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[7].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[9].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[14].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[16].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[19].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && cleaned_grid[23].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">' && 
    cleaned_grid[24].innerHTML == '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">') {
        openGameDiv();
        openModal(modal);
    } else {
        console.log("Incorrect!");
    }
}