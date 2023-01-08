import $ from 'jquery';

class Search {
    //1. describe object
    constructor() {
        this.searchHTML();
        this.resultDiv = document.querySelector('#search-overlay__results');
        this.openButton = document.querySelectorAll('.js-search-trigger');
        this.closeButton = document.querySelector('.search-overlay__close');
        this.searchOverlay = document.querySelector('.search-overlay');
        this.searchField = document.querySelector('#search-term');
        this.events();
        this.typingTimer;
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
    }

    //2. events
    events() {

        this.openButton.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.openOverlay();
            });
        });

        this.closeButton.addEventListener('click', () => this.closeOverlay());
        document.addEventListener('keyup', (e) => this.keyPressDispatcher(e));
        this.searchField.addEventListener('keyup', (e) => this.typingLogic(e));
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
                this.resultDiv.innerHTML = '<div class="spinner-loader"></div>';
                this.isSpinnerVisible = true;
            }
            this.typingTimer = setTimeout(() => {
                this.getResults();
            }, 650);
        }
    }

    getResults = async () => {
        try {
            const response = await fetch(`${univerData.root_url}/wp-json/univer/v1/search?keyword=${this.searchField.value}`);
            const results = await response.json();
            this.resultDiv.innerHTML = `
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
                </div>`
        } catch (e) {
            console.log(e);
        }

        this.isSpinnerVisible = false;
    }

    openOverlay = () => {
        this.searchOverlay.classList.add('search-overlay--active');
        document.body.classList.add('body-no-scroll');
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
        return false;
    }

    closeOverlay = () => {
        this.searchOverlay.classList.remove('search-overlay--active');
        document.body.classList.remove('body-no-scroll');
        this.searchField.value = '';
        this.isOverlayOpen = false;
    }

    keyPressDispatcher = (event) => {
        if (event.keyCode === 83 && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
            this.openOverlay();
        }

        if (event.keyCode === 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    searchHTML = () => {
        document.body.insertAdjacentHTML('beforeend', `
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