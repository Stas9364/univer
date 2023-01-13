/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../css/style.scss */ "./css/style.scss");
/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider.js */ "./src/js/slider.js");
/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_slider_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_MobileMenu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/MobileMenu.js */ "./src/js/MobileMenu.js");
/* harmony import */ var _js_MobileMenu_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_MobileMenu_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_MyNotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/MyNotes */ "./src/js/MyNotes.js");
/* harmony import */ var _js_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/search */ "./src/js/search.js");
/* harmony import */ var _js_Like__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/Like */ "./src/js/Like.js");






const search = new _js_search__WEBPACK_IMPORTED_MODULE_4__["default"]();
const myNotes = new _js_MyNotes__WEBPACK_IMPORTED_MODULE_3__["default"]();
const like = new _js_Like__WEBPACK_IMPORTED_MODULE_5__["default"]();

/***/ }),

/***/ "./src/js/Like.js":
/*!************************!*\
  !*** ./src/js/Like.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wp_includes_js_dist_vendor_wp_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../wp-includes/js/dist/vendor/wp-polyfill-fetch */ "../../../wp-includes/js/dist/vendor/wp-polyfill-fetch.js");
/* harmony import */ var _wp_includes_js_dist_vendor_wp_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wp_includes_js_dist_vendor_wp_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);

class Like {
  constructor() {
    if (document.querySelector('.like-box')) {
      this.likeButton = document.querySelector('.like-box');
      this.events();
    }
  }
  events = () => {
    this.likeButton.addEventListener('click', this.clickDispatcher);
  };
  clickDispatcher = () => {
    if (this.likeButton.getAttribute('data-exists') === 'yes') {
      this.deleteLike();
    } else {
      this.createLike();
    }
  };
  createLike = async () => {
    try {
      const res = await (0,_wp_includes_js_dist_vendor_wp_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__.fetch)(`${univerData.root_url}/wp-json/univer/v1/like`, {
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
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  deleteLike = async () => {
    try {
      const res = await (0,_wp_includes_js_dist_vendor_wp_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__.fetch)(`${univerData.root_url}/wp-json/univer/v1/like`, {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': univerData.nonce,
          'Content-Type': 'application/json'
        }
        // body: JSON.stringify({professorId})
      });

      const result = await res.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Like);

/***/ }),

/***/ "./src/js/MobileMenu.js":
/*!******************************!*\
  !*** ./src/js/MobileMenu.js ***!
  \******************************/
/***/ (() => {

const menu = document.querySelector(".site-header__menu");
const openButton = document.querySelector(".site-header__menu-trigger");
function MobileMenu() {
  openButton.addEventListener("click", () => openMenu());
}
function openMenu() {
  openButton.classList.toggle("fa-bars");
  openButton.classList.toggle("fa-window-close");
  menu.classList.toggle("site-header__menu--active");
}
MobileMenu();

/***/ }),

/***/ "./src/js/MyNotes.js":
/*!***************************!*\
  !*** ./src/js/MyNotes.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MyNotes {
  constructor() {
    if (document.querySelector('#my-notes')) {
      this.myNotes = document.querySelector('#my-notes');
      this.events();
    }
  }
  events = () => {
    this.myNotes.addEventListener("click", e => this.clickHandler(e));
    document.querySelector('.submit-note').addEventListener('click', e => this.createNote(e));
  };
  clickHandler(e) {
    if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) this.deleteNote(e);
    if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) this.editNote(e);
    if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) this.updateNote(e);
  }
  findNearestParentLi(el) {
    let thisNote = el;
    while (thisNote.tagName !== "LI") {
      thisNote = thisNote.parentElement;
    }
    return thisNote;
  }
  editMode = thisNote => {
    thisNote.setAttribute('data-state', 'editable');
    thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>Cancel';
    thisNote.querySelector('.note-title-field').removeAttribute('readonly');
    thisNote.querySelector('.note-title-field').classList.add('note-active-field');
    thisNote.querySelector('.note-body-field').removeAttribute('readonly');
    thisNote.querySelector('.note-body-field').classList.add('note-active-field');
    thisNote.querySelector('.update-note').classList.add('update-note--visible');
  };
  saveMode = thisNote => {
    thisNote.setAttribute('data-state', 'cancel');
    thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';
    thisNote.querySelector('.note-title-field').setAttribute('readonly', 'readonly');
    thisNote.querySelector('.note-title-field').classList.remove('note-active-field');
    thisNote.querySelector('.note-body-field').setAttribute('readonly', 'readonly');
    thisNote.querySelector('.note-body-field').classList.remove('note-active-field');
    thisNote.querySelector('.update-note').classList.remove('update-note--visible');
  };
  editNote = e => {
    const thisNote = this.findNearestParentLi(e.target);
    if (thisNote.getAttribute('data-state') === 'editable') {
      this.saveMode(thisNote);
    } else {
      this.editMode(thisNote);
    }
  };
  deleteNote = async e => {
    const thisNote = this.findNearestParentLi(e.target);
    const result = await requestToDB('DELETE', null, thisNote);
    console.log(result);
    if (typeof result !== 'string') {
      thisNote.style.height = `${thisNote.offsetHeight}px`;
      setTimeout(() => {
        thisNote.classList.add('fade-out');
      }, 20);
      setTimeout(() => {
        thisNote.remove();
      }, 401);
    }
    if (result.userNoteCount < '5') {
      document.querySelector('.note-limit-message').classList.remove('active');
    }
  };
  updateNote = async e => {
    const thisNote = this.findNearestParentLi(e.target);
    const content = {
      title: thisNote.querySelector('.note-title-field').value,
      content: thisNote.querySelector('.note-body-field').value
    };
    const result = await requestToDB('PUT', content, thisNote);
    console.log(result);
    if (typeof result !== 'string') {
      this.saveMode(thisNote);
    }
  };
  createNote = async () => {
    const content = {
      title: document.querySelector('.new-note-title').value,
      content: document.querySelector('.new-note-body').value,
      status: 'private'
    };
    if (content.title && content.content) {
      const result = await requestToDB('POST', content, null);
      console.log(result);
      if (typeof result !== 'string') {
        document.querySelector('.new-note-title').value = '';
        document.querySelector('.new-note-body').value = '';
        document.querySelector('#my-notes').insertAdjacentHTML('afterbegin', `
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

        // notice in the above HTML for the new <li> I gave it a class of fade-in-calc which will make it invisible temporarily so we can count its natural height

        let finalHeight; // browser needs a specific height to transition to, you can't transition to 'auto' height
        let newlyCreated = document.querySelector("#my-notes li");

        // give the browser 30 milliseconds to have the invisible element added to the DOM before moving on
        setTimeout(function () {
          finalHeight = `${newlyCreated.offsetHeight}px`;
          newlyCreated.style.height = "0px";
        }, 30);

        // give the browser another 20 milliseconds to count the height of the invisible element before moving on
        setTimeout(function () {
          newlyCreated.classList.remove("fade-in-calc");
          newlyCreated.style.height = finalHeight;
        }, 50);

        // wait the duration of the CSS transition before removing the hardcoded calculated height from the element so that our design is responsive once again
        setTimeout(function () {
          newlyCreated.style.removeProperty("height");
        }, 450);
      } else {
        document.querySelector('.note-limit-message').classList.add('active');
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyNotes);
async function requestToDB(method, content, thisNote) {
  try {
    const resp = await fetch(`${univerData.root_url}/wp-json/wp/v2/note/${thisNote ? thisNote.getAttribute('data-note-id') : ''}`, {
      method,
      headers: {
        'X-WP-Nonce': univerData.nonce,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    return await resp.json();
  } catch (e) {
    return 'Limit Post';
  }
}

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

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
      el.addEventListener('click', e => {
        e.preventDefault();
        this.openOverlay();
      });
    });
    this.closeButton.addEventListener('click', () => this.closeOverlay());
    document.addEventListener('keyup', e => this.keyPressDispatcher(e));
    this.searchField.addEventListener('keyup', e => this.typingLogic(e));
  }

  //3. methods
  typingLogic = event => {
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
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
  };
  getResults = async () => {
    try {
      const response = await fetch(`${univerData.root_url}/wp-json/univer/v1/search?keyword=${this.searchField.value}`);
      const results = await response.json();
      this.resultDiv.innerHTML = `
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        <ul class="link-list min-list">
                            ${results.generalInfo.length ? results.generalInfo.map(el => `
                                  <li>
                                      <a href="${el.link}">${el.title}</a>
                                      ${el.postType === 'post' ? `<span>by ${el.authorName}</span>` : ''}
                                  </li>
                                  `).join('') : `<p>No general information matches that search.</p>`}
                        </ul>
                    </div>

                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        <ul class="link-list min-list">
                            ${results.programs.length ? results.programs.map(el => `
                                  <li>
                                      <a href="${el.link}">${el.title}</a>
                                  </li>
                                  `).join('') : `<p>No program matches that search. <a href="${univerData.root_url}/programs">View all programs.</a></p>`}
                        </ul>

                        <h2 class="search-overlay__section-title">Professors</h2>
                        <ul class="professor-cards">
                            ${results.professors.length ? results.professors.map(el => `
                                  <li class="professor-card__list-item">
                                        <a class="professor-card" href="${el.link}">
                                            <img class="professor-card__image" src="${el.thumbnail}"
                                                 alt="${el.title}">
                                            <span class="professor-card__name">
                                                ${el.title}
                                            </span>
                                        </a>
                                  </li>
                                        `).join('') : `<p>No professor matches that search.</p>`}
                        </ul>
                    </div>

                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Events</h2>
                            ${results.events.length ? results.events.map(el => `
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
                                  `).join('') : `<p>No event matches that search. <a href="/events">View all events.</a></p>`}
                    </div>
                </div>`;
    } catch (e) {
      console.log(e);
    }
    this.isSpinnerVisible = false;
  };
  openOverlay = () => {
    this.searchOverlay.classList.add('search-overlay--active');
    document.body.classList.add('body-no-scroll');
    setTimeout(() => this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  };
  closeOverlay = () => {
    this.searchOverlay.classList.remove('search-overlay--active');
    document.body.classList.remove('body-no-scroll');
    this.searchField.value = '';
    this.isOverlayOpen = false;
  };
  keyPressDispatcher = event => {
    if (event.keyCode === 83 && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      this.openOverlay();
    }
    if (event.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  };
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
        `);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

const slider = document.querySelector('.sim-slider');
if (slider) {
  function Sim(sldrId) {
    let id = document.getElementById(sldrId);
    if (id) {
      this.sldrRoot = id;
    } else {
      this.sldrRoot = document.querySelector('.sim-slider');
    }

    // Slider objects
    this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

    // Initialization
    this.options = Sim.defaults;
    Sim.initialize(this);
  }
  Sim.defaults = {
    // Default options for the slider
    loop: true,
    // Бесконечное зацикливание слайдера
    auto: true,
    // Автоматическое пролистывание
    interval: 5000,
    // Интервал между пролистыванием элементов (мс)
    arrows: false,
    // Пролистывание стрелками
    dots: true // Индикаторные точки
  };

  Sim.prototype.elemPrev = function (num) {
    num = num || 1;
    let prevElement = this.currentElement;
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.elemCount - 1;
    if (!this.options.loop) {
      if (this.currentElement === 0) {
        this.leftArrow.style.display = 'none';
      }
      ;
      this.rightArrow.style.display = 'block';
    }
    ;
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
    if (this.options.dots) {
      this.dotOn(prevElement);
      this.dotOff(this.currentElement);
    }
  };
  Sim.prototype.elemNext = function (num) {
    num = num || 1;
    let prevElement = this.currentElement;
    this.currentElement += num;
    if (this.currentElement >= this.elemCount) this.currentElement = 0;
    if (!this.options.loop) {
      if (this.currentElement === this.elemCount - 1) {
        this.rightArrow.style.display = 'none';
      }
      ;
      this.leftArrow.style.display = 'block';
    }
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
    if (this.options.dots) {
      this.dotOn(prevElement);
      this.dotOff(this.currentElement);
    }
  };
  Sim.prototype.dotOn = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;';
  };
  Sim.prototype.dotOff = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;';
  };
  Sim.initialize = function (that) {
    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов

    // Variables
    that.currentElement = 0;
    let bgTime = getTime();

    // Functions
    function getTime() {
      return new Date().getTime();
    }
    ;
    function setAutoScroll() {
      that.autoScroll = setInterval(function () {
        let fnTime = getTime();
        if (fnTime - bgTime + 10 > that.options.interval) {
          bgTime = fnTime;
          that.elemNext();
        }
      }, that.options.interval);
    }

    // Start initialization
    if (that.elemCount <= 1) {
      // Отключить навигацию
      that.options.auto = false;
      that.options.arrows = false;
      that.options.dots = false;
      that.leftArrow.style.display = 'none';
      that.rightArrow.style.display = 'none';
    }
    if (that.elemCount >= 1) {
      // показать первый элемент
      that.sldrElemFirst.style.opacity = '1';
    }
    ;
    if (!that.options.loop) {
      that.leftArrow.style.display = 'none'; // отключить левую стрелку
      that.options.auto = false; // отключить автопркрутку
    } else if (that.options.auto) {
      // инициализация автопрокруки
      setAutoScroll();
      // Остановка прокрутки при наведении мыши на элемент
      that.sldrList.addEventListener('mouseenter', function () {
        clearInterval(that.autoScroll);
      }, false);
      that.sldrList.addEventListener('mouseleave', setAutoScroll, false);
    }
    if (that.options.arrows) {
      // инициализация стрелок
      that.leftArrow.addEventListener('click', function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemPrev();
        }
      }, false);
      that.rightArrow.addEventListener('click', function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemNext();
        }
      }, false);
    } else {
      that.leftArrow.style.display = 'none';
      that.rightArrow.style.display = 'none';
    }
    if (that.options.dots) {
      // инициализация индикаторных точек
      let sum = '',
        diffNum;
      for (let i = 0; i < that.elemCount; i++) {
        sum += '<span class="sim-dot"></span>';
      }
      that.indicatorDots.innerHTML = sum;
      that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
      // Назначаем точкам обработчик события 'click'
      for (let n = 0; n < that.elemCount; n++) {
        that.indicatorDotsAll[n].addEventListener('click', function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
          // Если n == that.currentElement ничего не делаем
        }, false);
      }
      that.dotOff(0); // точка[0] выключена, остальные включены
      for (let i = 1; i < that.elemCount; i++) {
        that.dotOn(i);
      }
    }
  };
  new Sim();
}

/***/ }),

/***/ "../../../wp-includes/js/dist/vendor/wp-polyfill-fetch.js":
/*!****************************************************************!*\
  !*** ../../../wp-includes/js/dist/vendor/wp-polyfill-fetch.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) : 0;
})(this, function (exports) {
  'use strict';

  var global = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global;
  var support = {
    searchParams: 'URLSearchParams' in global,
    iterable: 'Symbol' in global && 'iterator' in Symbol,
    blob: 'FileReader' in global && 'Blob' in global && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in global,
    arrayBuffer: 'ArrayBuffer' in global
  };
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }
  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];
    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }
  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name: "' + name + '"');
    }
    return name.toLowerCase();
  }
  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function () {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };
    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }
    return iterator;
  }
  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };
  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };
  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };
  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };
  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };
  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };
  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };
  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };
  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };
  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }
  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }
  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }
  function Body() {
    this.bodyUsed = false;
    this._initBody = function (body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }
      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };
    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed;
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
          } else {
            return Promise.resolve(this._bodyArrayBuffer);
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }
    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };
    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }
    this.json = function () {
      return this.text().then(JSON.parse);
    };
    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }
  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    options = options || {};
    var body = options.body;
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }
    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }
  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };
  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }
  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders.split('\r').map(function (header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
    }).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }
  Body.call(Request.prototype);
  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    if (!options) {
      options = {};
    }
    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };
  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }
    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };
  exports.DOMException = global.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function (message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }
  function fetch(input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'));
      }
      var xhr = new XMLHttpRequest();
      function abortXhr() {
        xhr.abort();
      }
      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function () {
          resolve(new Response(body, options));
        }, 0);
      };
      xhr.onerror = function () {
        setTimeout(function () {
          reject(new TypeError('Network request failed'));
        }, 0);
      };
      xhr.ontimeout = function () {
        setTimeout(function () {
          reject(new TypeError('Network request failed'));
        }, 0);
      };
      xhr.onabort = function () {
        setTimeout(function () {
          reject(new exports.DOMException('Aborted', 'AbortError'));
        }, 0);
      };
      function fixUrl(url) {
        try {
          return url === '' && global.location.href ? global.location.href : url;
        } catch (e) {
          return url;
        }
      }
      xhr.open(request.method, fixUrl(request.url), true);
      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }
      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (support.arrayBuffer && request.headers.get('Content-Type') && request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1) {
          xhr.responseType = 'arraybuffer';
        }
      }
      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function (name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
      } else {
        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });
      }
      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);
        xhr.onreadystatechange = function () {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  }
  fetch.polyfill = true;
  if (!global.fetch) {
    global.fetch = fetch;
    global.Headers = Headers;
    global.Request = Request;
    global.Response = Response;
  }
  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkuniver"] = globalThis["webpackChunkuniver"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map