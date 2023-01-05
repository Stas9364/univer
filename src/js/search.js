import $ from 'jquery';

class Search {
    //1. describe object
    constructor() {
        this.searchHTML();
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('#search-term');
        this.resultDiv = $('#search-overlay__results');
        this.events();
        this.typingTimer;
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
    }

    //2. events
    events() {
        this.openButton.on('click', this.openOverlay);
        this.closeButton.on('click', this.closeOverlay);
        $(document).keyup(this.keyPressDispatcher.bind(this));
        this.searchField.on('keyup', this.typingLogic);
    }

    //3. methods
    typingLogic = (event) => {
        if (event.code === 'ArrowUp' ||
            event.code === 'ArrowDown' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowRight') {
            this.isSpinnerVisible = false;
        } else {
            clearTimeout(this.typingTimer);
            if (!this.isSpinnerVisible) {
                this.resultDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;
            }
            this.typingTimer = setTimeout(() => {
                this.getResults();
            }, 650);
        }
    }

    getResults = () => {
        $.when(
            $.getJSON(`${univerData.root_url}/wp-json/wp/v2/posts?search=${this.searchField.val()}`),
            $.getJSON(`${univerData.root_url}/wp-json/wp/v2/pages?search=${this.searchField.val()}`),
            $.getJSON(`${univerData.root_url}/wp-json/wp/v2/event?search=${this.searchField.val()}`)
        ).then((posts, pages, events) => {
            const results = [...posts[0], ...pages[0], ...events[0]];

            const out = results.map(el => `
                <li>
                    <a href="${el.link}">${el.title.rendered}</a>
                    ${el.type === 'post' ? `<span>by ${el.authorName}</span>` : ''}
                </li>
            `).join('');

            this.resultDiv.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                <ul class="link-list min-list">
                    ${out || '<p>No general information matches that search.</p>'}
                </ul>
            `);
        }, () => this.resultDiv.html('<p>Unexpected error. Please try again.</p>'));

        this.isSpinnerVisible = false;
    }

    openOverlay = () => {
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
    }

    closeOverlay = () => {
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.searchField.val('');
        this.isOverlayOpen = false;
    }

    keyPressDispatcher = (event) => {
        if (event.keyCode === 83 && !this.isOverlayOpen && !$('input, textarea').is(':focus')) {
            this.openOverlay();
        }

        if (event.keyCode === 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    searchHTML = () => {
        $('body').append(`
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                        <i class="fa fa-search fa-2x search-overlay__icon" aria-hidden="true"></i>
                        <input id="search-term" type="text" class="search-term" placeholder="What are you looking for?">
                        <i class="fa fa-window-close fa-2x search-overlay__close" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="container">
                    <div id="search-overlay__results"></div>
                </div>
            </div>
        `)
    }
}

export default Search;