import { renderNotes } from "./app.js";
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");

let arrayOfNotes = JSON.parse(localStorage.getItem('notes')) || []   // JSON.parse is used to convert string into object in local storage.

addNoteButton.addEventListener('click', () => {
    // console.log(title.value);
    // console.log(note.value);

    if (title.value.trim().length > 0 || note.value.trim().length > 0) {
        arrayOfNotes = [...arrayOfNotes, { title: title.value.trim(), note: note.value.trim(), _id: Date.now(), isPinned: false, isArchived: false }];
        // console.log(arrayOfNotes);

        title.value = note.value = "";
        showOtherNotes.innerHTML = renderNotes(arrayOfNotes);
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));   // JSON.stringfy is used to converted object into string in local storage.
    }
})
showOtherNotes.innerHTML = renderNotes(arrayOfNotes);




