import $ from 'jquery';

class Search {
    //1. describe object
    constructor() {
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
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        $(document).keyup(this.keyPressDispatcher.bind(this));
        this.searchField.on('keyup', this.typingLogic.bind(this));
    }

    //3. methods
    typingLogic(event) {
        if (event.code ==='ArrowUp' ||
            event.code === 'ArrowDown' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowRight') {
            this.isSpinnerVisible = false;
        }else {
            clearTimeout(this.typingTimer);
            if (!this.isSpinnerVisible) {
                this.resultDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;
            }
            this.typingTimer = setTimeout(() => {
                this.resultDiv.html(this.searchField.val());
                this.isSpinnerVisible = false;
            }, 1000);
        }
    }

    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }

    keyPressDispatcher(event) {
        if (event.keyCode === 83 && !this.isOverlayOpen && !$('input, textarea').is(':focus')) {
            this.openOverlay();
        }

        if (event.keyCode === 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }
}

export default Search;