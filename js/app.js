/*
 * Desired functionality:
 *  - [x] Scroll to section
 *  - [x] Scroll back to top
 *  - [x] Populate navigation bar
 *  - [ ] Collapse section
 */

const backToTopButton = document.getElementById('back-to-top');
const navUl = document.getElementById('nav-item-list');
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
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${section.id}`;
  a.innerText = section.dataset.sectionName
  li.appendChild(a);
  li.classList.add('nav-item');
  return li;
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

  navUl.appendChild(fragment);
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
  (window.innerHeight + window.scrollY) > document.body.scrollHeight
    ? backToTopButton.classList.remove('hidden')
    : backToTopButton.classList.add('hidden');
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
