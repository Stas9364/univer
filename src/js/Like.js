import {fetch} from "../../../../../wp-includes/js/dist/vendor/wp-polyfill-fetch";

class Like {
    constructor() {
        if(document.querySelector('.like-box')) {
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
        try {
            const res = await fetch(`${univerData.root_url}/wp-json/univer/v1/like`, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': univerData.nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    professorId: this.likeButton.getAttribute('data-id')
                })
            });
            const result = await res.json();
            console.log(result)
        } catch (e) {
            console.log(e);
        }
    }

    deleteLike = async () => {
        try {
            const res = await fetch(`${univerData.root_url}/wp-json/univer/v1/like`, {
                method: 'DELETE',
                headers: {
                    'X-WP-Nonce': univerData.nonce,
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({professorId})
            });
            const result = await res.json();
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
}

export default Like;