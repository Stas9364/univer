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
        $.getJSON(`${univerData.root_url}/wp-json/univer/v1/search?keyword=${this.searchField.val()}`, (results) => {
            this.resultDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        <ul class="link-list min-list">
                            ${results.generalInfo.length
                ? results.generalInfo.map(el => `
                                  <li>
                                      <a href="${el.link}">${el.title}</a>
                                      ${el.postType === 'post' ? `<span>by ${el.authorName}</span>` : ''}
                                  </li>
                                  `).join('')
                : `<p>No general information matches that search.</p>`}  
                        </ul>
                    </div>
                    
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        <ul class="link-list min-list">
                            ${results.programs.length
                ? results.programs.map(el => `
                                  <li>
                                      <a href="${el.link}">${el.title}</a>
                                  </li>
                                  `).join('')
                : `<p>No program matches that search. <a href="${univerData.root_url}/programs">View all programs.</a></p>`}  
                        </ul>
                        
                        <h2 class="search-overlay__section-title">Professors</h2>
                        <ul class="professor-cards">
                            ${results.professors.length
                ? results.professors.map(el => `
                                  <li class="professor-card__list-item">
                                        <a class="professor-card" href="${el.link}">
                                            <img class="professor-card__image" src="${el.thumbnail}"
                                                 alt="${el.title}">
                                            <span class="professor-card__name">
                                                ${el.title}
                                            </span>
                                        </a>
                                  </li>
                                        `).join('')
                : `<p>No professor matches that search.</p>`}  
                        </ul>
                    </div>
                    
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Events</h2>
                            ${results.events.length
                ? results.events.map(el => `
                        <div class="event-summary">
                            <a class="event-summary__date t-center" href="${el.link}">
                                <span class="event-summary__month">
                                    ${el.month}
                                </span>
                                <span class="event-summary__day">
                                    ${el.day}
                                </span>
                            </a>
                            <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny">
                                    <a href="${el.link}">${el.title}</a>
                                </h5>
                                <p>
                                    ${el.content}
                                    <a href="${el.link}">Learn more</a>
                                </p>
                            </div>
                        </div>
                                  `).join('')
                : `<p>No event matches that search. <a href="/events">View all events.</a></p>`}  
                    </div>
                </div>
            `)
        })

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