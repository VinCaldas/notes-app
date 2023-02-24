const titleAddNote = document.querySelector('.title')
// let title = document.querySelector('.noteTitle')
// let content = document.querySelector('.noteContent')
const button = document.querySelector('#save_button')
const addNote = document.querySelector('#addNote')
const colors = document.querySelectorAll('.colors')
let currentColor = document.querySelector('.selected')
const addContent = document.querySelector('.content')
let containerNotes = document.querySelector('#container_notes')
const colorsSection = document.querySelector('#colors-section')
const dateAddNote = document.querySelector('.date')
const deleteBtn = document.querySelectorAll('.delete-button')

const notes = JSON.parse(localStorage.getItem('notes')) || [];
showNotes()
showColors(colorsSection)

dateAddNote.innerHTML = new Date(Date.now()).toDateString()

new Sortable(containerNotes, {
    animation: 150,
})

let colorSelected = '#fd9792';

class Note {
    constructor(title, content, color, date){
        this.title = title;
        this.content = content;
        this.color = color;
        this.date = date;
    }
}

Array.from(colors).map(item => {
    let color = item.style.backgroundColor;


    item.addEventListener('click', () => {

        Array.from(colors).map(item => {
            item.classList.contains('selected') ? item.classList.remove('selected') : null
        })

        addNote.style.backgroundColor = color 
        colorSelected = color;
        item.classList.add('selected');
        currentColor = colorSelected;
    })
})

function AddNote(title, content, color, date) {
    if(title != "" || content != ""){
        const note = new Note(title, content, color, date)
        notes.push(note)
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    location.reload()
    
}

button.addEventListener('click', () => {
    let date = new Date(Date.now()).toDateString();
    AddNote(titleAddNote.value, addContent.value, colorSelected, date)
})

function deleteNote(index){
    notes.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notes));
    location.reload()
}

function showNotes(){
    document.querySelectorAll('.note').forEach(note => note.remove())
    notes.forEach((note, index) => {

        let newNote = `<div class="note" style="background-color: ${note.color}">
                            <div id="date-container">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span class="date">${note.date}</span>
                            </div>

                            <h2>${note.title}</h2>
                            <p>${note.content.replace(/\r?\n/g, '<br/>')}</p>
                            <button class="delete-button" onClick={deleteNote(${index})}><i class="fa-solid fa-trash"></i></button>
                      </div>`

        addNote.insertAdjacentHTML('afterend', newNote)
    })
}

function showColors(element){
    element.addEventListener('mouseover', () => {
        colors.forEach(color => {
            color.classList.remove('hide')
        })
    })
    
    element.addEventListener('mouseout', () => {
        colors.forEach(color => {
            if (!color.classList.contains('selected')){
                color.classList.add('hide')
            }
        })
    })
}
