import { renderNotes } from "./app.js";
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");

let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

let arrayOfNotes = JSON.parse(localStorage.getItem('notes')) || []   // JSON.parse is used to convert string into object in local storage.
if (arrayOfNotes.length > 0) {
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener('click', (e) => {
    // console.log(e.target);
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;
    // console.log({type,noteId});

    switch (type) {
        case 'del':
            arrayOfNotes = arrayOfNotes.filter(({ _id }) => _id.toString() != noteId);
            // console.log(arrayOfNotes);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned }) => !isPinned));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned }) => isPinned));

            localStorage.setItem('notes', JSON.stringify(arrayOfNotes));
            break;

        case 'pinned':

            // dout;
            // arrayOfNotes = arrayOfNotes.map(({_id,isPinned}) => _id.toString()===noteId ? {...note,isPinned:!isPinned}:note);
            // console.log(arrayOfNotes);
            // console.log("\n");
            // arrayOfNotes = arrayOfNotes.map(note => note._id.toString() === noteId ? {...note,isPinned: !note.isPinned} : note);

            for (let i = 0; i < arrayOfNotes.length; i++) {
                if (arrayOfNotes[i]._id == noteId) {
                    arrayOfNotes[i].isPinned = !arrayOfNotes[i].isPinned;
                }
            }

            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned }) => !isPinned));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned }) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
    }


})

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




