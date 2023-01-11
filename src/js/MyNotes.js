import $ from 'jquery';

class MyNotes {
    constructor() {
        this.editButton = document.querySelectorAll('.edit-note');
        this.deleteButton = document.querySelectorAll('.delete-note');
        this.updateButton = document.querySelectorAll('.update-note');
        this.events();
    }

    events = () => {
        this.editButton.forEach(btn => btn.addEventListener('click', (e) => {
            this.editNote(e);
        }));

        this.deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
            this.deleteNote(e);
        }));

        this.updateButton.forEach(btn => btn.addEventListener('click', (e) => {
            this.updateNote(e);
        }));
    }

    findNearestParentLi(el) {
        let thisNote = el;
        while (thisNote.tagName !== "LI") {
            thisNote = thisNote.parentElement
        }
        return thisNote;
    }

    editMode = (thisNote) => {
        thisNote.setAttribute('data-state', 'editable');

        thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>Cancel';

        thisNote.querySelector('.note-title-field').removeAttribute('readonly');
        thisNote.querySelector('.note-title-field').classList.add('note-active-field');

        thisNote.querySelector('.note-body-field').removeAttribute('readonly');
        thisNote.querySelector('.note-body-field').classList.add('note-active-field');

        thisNote.querySelector('.update-note').classList.add('update-note--visible');
    }

    saveMode = (thisNote) => {
        thisNote.setAttribute('data-state', 'cancel');

        thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';

        thisNote.querySelector('.note-title-field').setAttribute('readonly', 'readonly');
        thisNote.querySelector('.note-title-field').classList.remove('note-active-field');

        thisNote.querySelector('.note-body-field').setAttribute('readonly', 'readonly');
        thisNote.querySelector('.note-body-field').classList.remove('note-active-field');

        thisNote.querySelector('.update-note').classList.remove('update-note--visible');

    }

    editNote = (e) => {
        const thisNote = this.findNearestParentLi(e.target);

        if (thisNote.getAttribute('data-state') === 'editable') {
            this.saveMode(thisNote);
        } else {
            this.editMode(thisNote);
        }
    }

    deleteNote = async (e) => {
        const thisNote = this.findNearestParentLi(e.target);

        const result = await request('DELETE', null, thisNote)
        console.log(result);

        $(thisNote).slideUp();
    }

    updateNote = async (e) => {
        const thisNote = this.findNearestParentLi(e.target);

        const content = {
            title: thisNote.querySelector('.note-title-field').value,
            content: thisNote.querySelector('.note-body-field').value
        }
        const result = await request('PUT', content, thisNote);
        console.log(result);

        this.saveMode(thisNote);
    }
}

export default MyNotes;

async function request(method, content, thisNote) {
    const resp = await fetch(
        `${univerData.root_url}/wp-json/wp/v2/note/${thisNote.getAttribute('data-note-id')}`,
        {
            method,
            headers: {
                'X-WP-Nonce': univerData.nonce,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        });

    return await resp.json();
}