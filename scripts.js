const $noteTitle = document.querySelector('.title')
const $noteContent = document.querySelector('.content')
const $btnSave = document.querySelector('#save_button')
const $addNoteContainer = document.querySelector('#addNote')
const $colorsToPick = document.querySelectorAll('.colors')
const $containerNotes = document.querySelector('#container_notes')
const $colorsList = document.querySelector('#colors-list')
const $dateAddNote = document.querySelector('.date')

const notesInLocalStorage = JSON.parse(localStorage.getItem('notes')) || [];

showNotes()

$dateAddNote.innerHTML = new Date(Date.now()).toDateString()

new Sortable($containerNotes, {
    animation: 150,
})

$btnSave.addEventListener('click', () => {
    const currentColor = $addNoteContainer.style.backgroundColor
    const currentNoteDate = new Date(Date.now()).toDateString();
    AddNote($noteTitle.value, $noteContent.value, currentColor, currentNoteDate)
})

$colorsToPick.forEach(item => {
    item.addEventListener('click', () => pickAColor(item))
})

class Note {
    constructor(title, content, color, date){
        this.title = title;
        this.content = content;
        this.color = color;
        this.date = date;
    }
}


function pickAColor(el){
    let color = el.style.backgroundColor;

    $colorsToPick.forEach(item => {
        item.classList.contains('selected') ? item.classList.remove('selected') : null
    })

    el.classList.add('selected');

    $addNoteContainer.style.backgroundColor = color
}

function AddNote(title, content, color, date) {
    if(title != "" || content != ""){
        const note = new Note(title, content, color, date)
        const updatedNotes = [
            ...notesInLocalStorage,
            note
        ]
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }

    location.reload()
    
}

function deleteNote(index){
    notesInLocalStorage.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesInLocalStorage));
    location.reload()
}

function showNotes(){
    const $notes = document.querySelectorAll('.note')
    $notes.forEach(note => note.remove())
    notesInLocalStorage.forEach((note, index) => {

        let newNoteHTML = `<div class="note" style="background-color: ${note.color}">
                            <div id="date-container">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span class="date">${note.date}</span>
                            </div>

                            <h2>${note.title}</h2>
                            <p>${note.content.replace(/\r?\n/g, '<br/>')}</p>
                            <button class="delete-button" onClick={deleteNote(${index})}><i class="fa-solid fa-trash"></i></button>
                      </div>`

        $addNoteContainer.insertAdjacentHTML('afterend', newNoteHTML)
    })
}

