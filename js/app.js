/*
 *
 * FUNCTIONS
 *
 */

/**
 * @description: scrolls to a given section
 * @param {String} sectionId: the id of the desired section
 */
const scrollToSection = sectionId => {
  const section = document.getElementById(sectionId);
  const sectionRectangle = section.getBoundingClientRect();
  window.scrollBy({
    top: sectionRectangle.top,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * @description: create a list item with a link to the given section
 * @param {HTMLElement} section: the section to link to
 */
const createNavItem = section => {
  const p = document.createElement('p');
  p.innerText = section.dataset.sectionName
  p.classList.add('nav-item');
  p.addEventListener('click', () => scrollToSection(section.id));
  return p;
};

/**
 * @description: create a list item for each section of the page
 * @param {HTMLCollection} sections: the section collection
 */
const buildNavBar = sections => {
  const navBar = document.getElementById('nav-bar');
  const fragment = new DocumentFragment();

  for (let section of sections) {
    fragment.appendChild(createNavItem(section));
  }

  navBar.appendChild(fragment);
};

/**
 * @description: collapses and expands sections on demand
 * @param {Event} e: the 'click' event which will trigger the function
 */
const collapse = e => {
  const section = e.target.parentElement;
  const parag = e.target.nextElementSibling;

  section.classList.toggle('collapsed');
  parag.classList.toggle('hidden');
};

/**
 * @description: shows the navigation bar given a certain conditions
 * @param {Event} e: the event that triggered the function; one of:
 *  [scroll, pointerup, click, mousemove]
 */
const showNavBar = e => {
  const navBar = document.getElementById('nav-bar');

  // handle scroll event, and show only if not in top of the page
  e.type === 'scroll' && window.scrollY > 0 && navBar.classList.remove('hidden');

  /*
   * handle pointer related events, and show only if they happen on the top 70
   * pixels
   */
  e.clientY <= 70 && navBar.classList.remove('hidden');

  window.clearTimeout(timeOut);
  timeOut = setTimeout(() => navBar.classList.add('hidden'), 1500);
}

/**
 * @description: sets active class for nav-item when correct section is on
 * viewport
 */
const setActiveNavItem = () => {
  const sections = document.getElementsByTagName('section');
  const navItems = document.getElementsByClassName('nav-item');

  for (let i = 0; i < sections.length; i++) {
    const [section, navItem] = [sections[i], navItems[i]];
    const coords = section.getBoundingClientRect();
    const topHalfInView = coords.top > 0 && coords.top <= window.innerHeight / 2;
    const bottomHalfInView = coords.bottom <= window.innerHeight && coords.bottom >= window.innerHeight / 2;

    // unset active class if previously set
    navItem.classList.remove('active');

    /*
     * if section is collapsed, only set active when both top and bottom of
     * section are on viewport
    */
    section.classList.contains('collapsed') && topHalfInView && bottomHalfInView && navItem.classList.add('active');

    /*
     * if section is not collapsed, then set active class if either top half of
     * section is on top half of viewport, or bottom half of section is on
     * bottom half of viewport
     */
    (topHalfInView || bottomHalfInView) && navItem.classList.add('active');
  }
};

/**
 * @description: set visibility of #back-to-top button
 */
const toggleBackToTopButton = () => {
  const button = document.getElementById('back-to-top');
  
  (window.innerHeight + Math.round(window.scrollY)) >= document.body.scrollHeight
    ? button.classList.remove('hidden')
    : button.classList.add('hidden');
};

/*
 *
 * EVENTS
 *
 */

/*
 * Show scroll back button when bottom of the page is reached
 */
document.addEventListener('scroll', toggleBackToTopButton);

/*
 * Add ability to scroll back to top of the page to #back-to-top button
 */
document.getElementById('back-to-top').addEventListener('click', () => window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
}));

/*
 * Show navigation bar when scrolling, when clicking on top of the screen, or
 * when mouseover the top of the screen
 */
let timeOut = null;
document.addEventListener('scroll', showNavBar);
document.onpointerup = showNavBar;
document.onclick = showNavBar;
document.onmousemove = showNavBar;

/*
 * Set active nav-item
 */
document.addEventListener('scroll', setActiveNavItem);

/*
 * Build the navigation bar when the DOM has loaded
 */
document.addEventListener('DOMContentLoaded', buildNavBar(document.getElementsByTagName('section')));

/*
 * Add click event to section headers
 */
for (let title of document.getElementsByTagName('h2')) {
  title.addEventListener('click', collapse);
}
