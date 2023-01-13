import $ from 'jquery';

class MyNotes {
    constructor() {
        this.myNotes = document.querySelector('#my-notes');
        this.events();
    }

    events = () => {
        this.myNotes.addEventListener("click", e => this.clickHandler(e));
        document.querySelector('.submit-note').addEventListener('click', (e) => this.createNote(e));
    }

    clickHandler(e) {
        if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) this.deleteNote(e);
        if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) this.editNote(e);
        if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) this.updateNote(e);
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

        const result = await requestToDB('DELETE', null, thisNote)
        console.log(result);

        $(thisNote).slideUp();
    }

    updateNote = async (e) => {
        const thisNote = this.findNearestParentLi(e.target);

        const content = {
            title: thisNote.querySelector('.note-title-field').value,
            content: thisNote.querySelector('.note-body-field').value
        }
        const result = await requestToDB('PUT', content, thisNote);
        console.log(result);

        this.saveMode(thisNote);
    }

    createNote = async (e) => {
        const content = {
            title: document.querySelector('.new-note-title').value,
            content: document.querySelector('.new-note-body').value,
            status: 'private'
        }
        if (content.title && content.content) {
            const result = await requestToDB('POST', content, null);
            console.log(result);

            document.querySelector('.new-note-title').value = '';
            document.querySelector('.new-note-body').value = '';

            document.querySelector('#my-notes').insertAdjacentHTML('afterBegin', `
                <li data-note-id="${result.id}">
                    <input class="note-title-field" value="${result.title.raw}" readonly>
                    <span class="edit-note">
                        <i class="fa fa-pencil" aria-hidden="true"></i>Edit
                    </span>
                    <span class="delete-note">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>Delete
                    </span>
                    <textarea class="note-body-field" readonly>
                        ${result.content.raw}
                    </textarea>
                    <span class="update-note btn btn--blue btn--small">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>Save
                    </span>
                </li>
            `);
        }
    }
}

export default MyNotes;

async function requestToDB(method, content, thisNote) {
    const resp = await fetch(
        `${univerData.root_url}/wp-json/wp/v2/note/${thisNote ? thisNote.getAttribute('data-note-id') : ''}`,
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