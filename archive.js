import { renderNotes } from "./app.js";

let arrayOfNotes = JSON.parse(localStorage.getItem('notes')) || [];

let showArchivedNotes = document.querySelector('.archive-notes-container');

showArchivedNotes.addEventListener('click', (e) => {
    let noteId = e.target.dataset.id;
    let type = e.target.dataset.type;
    switch (type) {
        case 'del':
            arrayOfNotes = arrayOfNotes.filter(({ _id }) => _id.toString() !== noteId);
            showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isArchived }) => isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case 'archived':
            // dout
            // arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {
            //     ...note,
            //     isArchived: !note.isArchived
            // } : note);

            for (let i = 0; i < arrayOfNotes.length; i++) {
                if (arrayOfNotes[i]._id == noteId) {
                    arrayOfNotes[i].isArchived = !arrayOfNotes[i].isArchived;
                }
            }
            showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isArchived }) => isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
    }    
})

showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived}) => isArchived));

