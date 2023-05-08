/*
 * Desired functionality:
 *  - [x] Scroll to section
 *  - [x] Scroll back to top
 *  - [x] Populate navigation bar
 *  - [ ] Collapse section
 */

const backToTopButton = document.getElementById('back-to-top');
const navBar = document.getElementById('nav-bar');
const sectionCollection = Array.from(document.getElementsByTagName('section'));

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

const sections = Array.from(document.getElementsByTagName('section'));
sections.forEach(section => section.addEventListener('click', e => {
  scrollToSection(section.id);
}));


/**
 * @description: create a list item with a link to the given section
 * @param {HTMLElement} section: the section to link to
 */
const createLi = section => {
  const p = document.createElement('p');
  p.innerText = section.dataset.sectionName
  p.classList.add('nav-item');
  p.addEventListener('click', () => scrollToSection(section.id));
  return p;
};

/**
 * @description: create a list item for each section of the page, with a link
 * to said section
 * @param {HTMLCollection} sections: the section collection
 */
const buildNavBar = sections => {
  const fragment = new DocumentFragment();

  sections.forEach(section => {
    fragment.appendChild(createLi(section));
  });

  navBar.appendChild(fragment);
};

/*
 * Collapse sections
 */
const collapse = e => {
  const section = e.target.parentElement;
  const parag = e.target.nextElementSibling;

  section.classList.toggle('collapsed');
  parag.classList.toggle('hidden');
};

/*
 * Show scroll back button when bottom of the page is reached
 */
document.addEventListener('scroll', () => {
  (window.innerHeight + Math.round(window.scrollY)) >= document.body.scrollHeight
    ? backToTopButton.classList.remove('hidden')
    : backToTopButton.classList.add('hidden');
});

/*
 * Show navbar when:
 *  - user scrolls
 *  - user clicks/taps top of the page
 *  - user places mouse on top of the page
 */
let timeOut = null;

window.addEventListener('scroll', () => {
  const classArray = Array.from(navBar.classList);
  if (window.scrollY > 0 && classArray.includes('hidden')) {
    navBar.classList.remove('hidden');
  }

  window.clearTimeout(timeOut);

  timeOut = setTimeout(() => navBar.classList.add('hidden'), 1500);
});

const handlePointerUp = e => {
  if (e.clientY <= 70) {
    navBar.classList.remove('hidden');
    window.clearTimeout(timeOut);
    timeOut = setTimeout(() => navBar.classList.add('hidden'), 1500);
  }
};

document.onpointerup = handlePointerUp;
document.onclick = handlePointerUp;
document.onmousemove = handlePointerUp;

const setActiveNavItem = e => {
  sectionCollection.forEach((section, i) => {
    const coords = section.getBoundingClientRect();
    const topHalfInView = coords.top > 0 && coords.top <= window.innerHeight / 2;
    const bottomHalfInView = coords.bottom <= window.innerHeight && coords.bottom >= window.innerHeight / 2;
    const navItems = Array.from(document.getElementsByClassName('nav-item'));

    section.classList.contains('collapsed') ?
      topHalfInView && bottomHalfInView ? navItems[i].classList.add('active')
        : navItems[i].classList.remove('active')
      : topHalfInView || bottomHalfInView ? navItems[i].classList.add('active') : navItems[i].classList.remove('active');
  });
};

document.addEventListener('scroll', setActiveNavItem);

backToTopButton.addEventListener('click', () => window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
}));

document.addEventListener('DOMContentLoaded', buildNavBar(sectionCollection));

Array.from(document.getElementsByTagName('H2')).forEach(title => {
  title.addEventListener('click', collapse);
});
