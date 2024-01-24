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
    event.preventDefault()
    let data = event.dataTransfer.getData('text')
    let draggedEvent = document.createElement('div')
    draggedEvent.className = 'event'
    draggedEvent.innerText = data
    draggedEvent.draggable = true
    draggedEvent.ondragstart = function (event) {
        drag(event);
      };
      event.target.appendChild(draggedEvent)

      checkOrder()
}

