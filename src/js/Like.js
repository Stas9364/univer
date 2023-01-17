class Like {
    constructor() {
        if (document.querySelector('.like-box')) {
            this.likeButton = document.querySelector('.like-box');
            this.events();
        }
    }

    events = () => {
        this.likeButton.addEventListener('click', this.clickDispatcher);
    }

    clickDispatcher = () => {
        if (this.likeButton.getAttribute('data-exists') === 'yes') {
            this.deleteLike();
        } else {
            this.createLike();
        }
    }

    createLike = async () => {
        const result = await request('POST', {professorId: this.likeButton.getAttribute('data-id')});

        if (typeof (result) === 'number' && this.likeButton.getAttribute('data-exists') === 'no') {
            ++this.likeButton.querySelector('.like-count').textContent;
            this.likeButton.setAttribute('data-exists', 'yes');
            this.likeButton.setAttribute('data-like', result.toString());
        } else {
            console.log(result);
        }
    }

    deleteLike = async () => {
        const result = await request('DELETE', {likeId: this.likeButton.getAttribute('data-like')});

        if (typeof (result) === 'object' && this.likeButton.getAttribute('data-exists') === 'yes') {
            --this.likeButton.querySelector('.like-count').textContent;
            this.likeButton.setAttribute('data-exists', 'no');
        } else {
            console.log(result);
        }
    }
}

export default Like;

const request = async (method, content) => {
    try {
        const res = await fetch(`${univerData.root_url}/wp-json/univer/v1/like`, {
            method,
            headers: {
                'X-WP-Nonce': univerData.nonce,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });
        return await res.json();

    } catch (e) {
        return e;
    }
}