// Main javascript file for all behaviour in puzzle1.html
let question = "";
let headers = [];
let excerpts = [];
let clues = [];
let questions = [];
let answers = [];
let reasons = [];
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const generateButton = document.getElementById('bootleg-kirby')
const closeModalButtons = document.querySelector('[data-close-btn]')
const openCorrectModal = document.querySelector('correct-modal')
const overlay = document.getElementById('overlay')
const logicPuzzle = document.getElementById('logic-puzzle')
const logicQuestion = document.getElementById('logic-question')
const exerptsBox = document.getElementById('exerpts-box')
const exerptTitle = document.getElementById('exerpt-box-title')
const exerpt1 = document.getElementById('exerpt1')
const exerpt2 = document.getElementById('exerpt2')
const exerpt3 = document.getElementById('exerpt3')
const exerpt4 = document.getElementById('exerpt4')
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
const sortableList = document.getElementById("sortable-list");
const submitBtn = document.getElementById("submit");
const message = document.getElementById('reason-message');
const reason1 = document.getElementById('reason1');
updateAll();
function openModal(modal) {
    modal.classList.add('active')
    overlay.classList.add('active')
    logicPuzzle.classList.add('inactive')
    logicQuestion.classList.add('inactive')
    exerptsBox.classList.add('inactive')
    exerptTitle.classList.add('inactive')
    exerpt1.classList.add('inactive')
    exerpt2.classList.add('inactive')
    exerpt3.classList.add('inactive')
    exerpt4.classList.add('inactive')
}

    // Call dragDrop function after opening the modal
    dragDrop();
//removes the modal and overlay and brings back all other elements
function closeModal(modal) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    logicPuzzle.classList.remove('inactive')
    logicQuestion.classList.remove('inactive')
    exerptsBox.classList.remove('inactive')
    exerptTitle.classList.remove('inactive')
    exerpt1.classList.remove('inactive')
    exerpt2.classList.remove('inactive')
    exerpt3.classList.remove('inactive')
    exerpt4.classList.remove('inactive')
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
// closeModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = button.closest('.modal')
//         closeModal(modal)
//     })
// })
function createRandomDivs(answerArray, questionArray) {
    // Get the multi-choice-container and the modal title
    const multiChoiceContainer = document.getElementById('multi-choice-container')
    let multiChoiceQuestion = document.getElementById('modal-title')
    // Shuffle the answer array to get a random order
    const shuffledAnswers = shuffleArray(answerArray)
    multiChoiceContainer.innerHTML = ''
    //sets modal title to which ever question from the question array is passed in
    multiChoiceQuestion.innerText = questionArray
    // Creates the answer-list div and assigns an id as well as attributes
    // const answerListDiv = document.createElement('li');
    // answerListDiv.id = 'choice1';
    // answerListDiv.setAttribute('ondrop', 'drop(event)');
    // answerListDiv.setAttribute('ondragover', 'allowDrop(event)');
    //Adding a p element with text
    const pElement = document.createElement('p');
    pElement.innerText = 'Drag and drop the events to arrange them in the order you deem correct:'
    answerListDiv.appendChild(pElement);
    multiChoiceContainer.appendChild(answerListDiv)
    // Create and append 4 divs with random order to the multi-choice-container
    for (let i = 1; i <= 4; i++) {
        const newDiv = document.createElement('li')
        newDiv.className = 'multi-choice-answers'
        newDiv.id = 'choice' + i
        newDiv.draggable = true
        // newDiv.ondragstart = function (event) {
        //     dragDrop(event)
        // };
        newDiv.setAttribute('data-answer', shuffledAnswers[i - 1])
        newDiv.innerText = shuffledAnswers[i - 1]
        multiChoiceContainer.appendChild(newDiv)
    }
}
generateButton.addEventListener('click', async function () {
    try {
        // Wait for data to be fetched before creating random divs
        await getAllData()
        // Pass the first array from the answers array to createRandomDivs
        initialize()
    } catch (error) {
        console.error('Error:', error)
    }
})
// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
async function initialize() {
    await getAllData();
     // Call the function to create random divs after fetching the answers
      createRandomDivs(answers[0], questions[0]);
}
// Call the initialization function
initialize()
//Drag and drop function
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
    const correctOrder = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
    const currentOrder = Array.from(sortableList.children).map(item => item.textContent.trim());

    if (arraysAreEqual(currentOrder, correctOrder)) {
        // All answers are correct
        openPopup("popup", "Congrats! You're 100% correct");
    } else {
        // Check how many answers are correct
        const correctCount = correctOrder.filter((value, index) => value === currentOrder[index]).length;

        if (correctCount === 0) {
            // No correct answers
            openPopup("popup-half", "Oops! None of your answers are correct", tryAgainFunction(), revealAnswerFunction());
        } if (correctCount === 1) {
            // Only one correct answer
            openPopup("popup-half", `Nice try, You got ${correctCount} out of 4 correct`, tryAgainFunction(), revealAnswerFunction());
        } else {
            // Partially correct answers
            openPopup("popup-half", `Good job, You got ${correctCount} out of 4 correct`, tryAgainFunction(), revealAnswerFunction());
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

function openPopup(popupId, message) {
    const popup = document.getElementById(popupId);
    popup.querySelector('p').textContent = message;
    popup.showModal();

    popup.querySelector('button').addEventListener('click', function () {
        popup.close();
    });
}

function tryAgainFunction() {
}

function revealAnswerFunction() {
    const correctOrder = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];

    message.textContent = "Below are the reasons for this order:"
    reason1.textContent = "abc"
}

async function getAllData() {
    const response = await fetch("http://localhost:3003/clues/1")
    const information = await response.json();
    question = information.question;
    clues.push(information.clue1, information.clue2, information.clue3);
    excerpts.push(information.excerpt1, information.excerpt2, information.excerpt3);
    questions.push(information.question1, information.question2, information.question3);
    answers.push([information.answer1a, information.answer1b, information.answer1c, information.answer1d], [information.answers2a, information.answers2b, information.answers2c, information.answers2d], [information.answers3a, information.answers3b, information.answers3c, information.answers3d]);
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
        if (i.innerHTML  != '<img src="../assets/Yellow_x.png" width="54px" height="54px">') {
            i.innerHTML  = '<img src="../assets/Yellow_x.png" width="54px" height="54px">';
        } else {
            i.innerHTML = '';
        }
    })
    i.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (i.innerHTML != '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">') {
            i.innerHTML = '<img src="../assets/600px-Yellow_check.png" width="50px" height="50px">';
        } else {
            i.innerHTML = '';
        }
    })
}