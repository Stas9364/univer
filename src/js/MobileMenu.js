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