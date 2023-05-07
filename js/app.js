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
  window.scrollBy(sectionRectangle.x, sectionRectangle.top);
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
  const a = document.createElement('a');
  a.href = `#${section.id}`;
  a.innerText = section.dataset.sectionName
  a.classList.add('nav-item');
  return a;
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
  const section = e.target.parentElement.parentElement;
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

let [scrollToTop, timeOut] = [0, null];
window.addEventListener('scroll', () => {
  navBar.classList.remove('hidden');

  window.clearTimeout(timeOut);

  timeOut = setTimeout(() => navBar.classList.add('hidden'), 1500);
  
  scrollToTop = window.pageYOffset;
});

backToTopButton.addEventListener('click', () => window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
}));

document.addEventListener('DOMContentLoaded', buildNavBar(sectionCollection));

Array.from(document.getElementsByTagName('H2')).forEach(title => {
  title.addEventListener('click', collapse);
});
