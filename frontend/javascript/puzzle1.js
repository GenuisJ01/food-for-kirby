// Main javascript file for all behaviour in puzzle1.html
let question = "";
let headers = [];
let excerpts = [];
let clues = [];
let questions = [];
let answers = [];
let reasons = [];

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const generateButton = document.getElementById('bootleg-kirby') //change to correct answer in grid
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

// Call the dragDrop function to set up drag and drop events
dragDrop();

function createRandomDivs(answerArray, questionArray) {
    // Get the multi-choice-container and the modal title
    const multiChoiceContainer = document.getElementById('multi-choice-container');
    let multiChoiceQuestion = document.getElementById('modal-title');

    // Shuffle the answer array to get a random order
    const shuffledAnswers = shuffleArray(answerArray);

    multiChoiceContainer.innerHTML = '';

    // Sets modal title to whichever question from the question array is passed in
    multiChoiceQuestion.innerText = questionArray;

    // Create the answer-list div and assign an id as well as attributes
    const answerListDiv = document.createElement('ul');
    answerListDiv.id = 'sortable-list';
    answerListDiv.setAttribute('ondrop', 'drop(event)');
    answerListDiv.setAttribute('ondragover', 'allowDrop(event)');

    // Adding a p element with text
    const pElement = document.createElement('p');
    pElement.innerText = 'Drag and drop the events to arrange them in the order you deem correct:';
    pElement.id = 'multi-choice-title'

    answerListDiv.appendChild(pElement);
    multiChoiceContainer.appendChild(answerListDiv);

    // Declare draggedItem outside the event listeners
    let draggedItem = null;

    // Create and append 4 li elements with random order to the multi-choice-container
    for (let i = 1; i <= 4; i++) {
        const newLi = document.createElement('li');
        newLi.className = 'multi-choice-answers';
        newLi.id = 'choice' + i;
        newLi.draggable = true;
        newLi.ondragstart = function (event) {
            // Set the draggedItem when drag starts
            draggedItem = event.target;
            drag(event);
        };
        newLi.setAttribute('data-answer', shuffledAnswers[i - 1]);
        newLi.innerText = shuffledAnswers[i - 1];

        // Add the drag and drop functionality for the li elements
        newLi.ondragover = function (event) {
            event.preventDefault();
        };
        newLi.ondrop = function (event) {
            event.preventDefault();
            const target = event.target;
            if (target.classList.contains('multi-choice-answers')) {
                const targetIndex = Array.from(answerListDiv.children).indexOf(target);
                const draggedIndex = Array.from(answerListDiv.children).indexOf(draggedItem);
                if (draggedIndex !== targetIndex) {
                    answerListDiv.insertBefore(draggedItem, targetIndex > draggedIndex ? target.nextSibling : target);
                }
            }
        };

        answerListDiv.appendChild(newLi);
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

function dragDrop() {
    // Enable draggability for each item in the sortableList
    Array.from(sortableList.children).forEach(item => {
        item.draggable = true;
    });

    let draggedItem = null;

    // Event listener for the dragstart event
    sortableList.addEventListener("dragstart", function (event) {
        // Store the dragged item
        draggedItem = event.target;
        
        // Set the allowed drag effect
        event.dataTransfer.effectAllowed = "move";
        
        // Set dummy data for Firefox to enable dragging
        event.dataTransfer.setData('text/plain', '');
    });

    // Event listener for the dragover event
    sortableList.addEventListener("dragover", function (event) {
        // Prevent the default behavior of the dragover event
        event.preventDefault();
        
        // Set the drop effect to 'move'
        event.dataTransfer.dropEffect = 'move';
    });

    // Event listener for the drop event
    sortableList.addEventListener("drop", function (event) {
        // Prevent the default behavior of the drop event
        event.preventDefault();
        
        const target = event.target;
        
        // Check if the target has the class 'multi-choice-answers'
        if (target.classList.contains("multi-choice-answers")) {
            // Get the indices of the dragged item and the target item
            const targetIndex = Array.from(sortableList.children).indexOf(target);
            const draggedIndex = Array.from(sortableList.children).indexOf(draggedItem);

            // If the indices are different, perform the reorder
            if (draggedIndex !== targetIndex) {
                sortableList.insertBefore(draggedItem, targetIndex > draggedIndex ? target.nextSibling : target);
            }
        }
    });

    // Event listener for the submitBtn click event
    submitBtn.addEventListener("click", function () {
        // Perform a checkOrder function when the submit button is clicked
        checkOrder();
    });
}

// function drop(event) {
//     event.preventDefault();
//     let data = event.dataTransfer.getData('text');
//     let addedAnswers = []

//     if (event.target.id === 'answer-list') {
//         let answerList = document.getElementById('answer-list');
//         if(!addedAnswers.includes(data) && !answerExists(answerList, data)) {
//             let draggedAnswer = document.createElement('li');
//             draggedAnswer.className = 'multi-choice-answers';
//             draggedAnswer.innerText = data;
//             draggedAnswer.draggable = true;
//             draggedAnswer.ondragstart = function (dragEvent) {
//                 drag(dragEvent, draggedAnswer);
//             };
//             event.target.appendChild(draggedAnswer);

//             let originalList = document.getElementById('multi-choice-container');
//             let originalAnswer = originalList.querySelector('.multi-choice-answers[data-answer="' + data + '"]');
//             if (originalAnswer) {
//                 originalAnswer.remove();
//             }

//             checkOrder();
//         }
//     }
// }

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

  //storing answer and giving option to try again

  let correctRanking = answers;

function checkRanking(playerAttempt) {
    const currentQuestion = clues.evalQ1;

    const isCorrect = playerAttempt === a
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

