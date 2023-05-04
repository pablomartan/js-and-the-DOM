/*
 * Desired functionality:
 *  - [x] Scroll to section
 *  - [x] Scroll back to top
 *  - [ ] Create navigation bar
 *  - [ ] Populate navigation bar
 *  - [ ] Collapse section
 */

const backToTopButton = document.getElementById('back-to-top');

/*
 * Scroll to section
 */

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

/*
 * Scroll back to top
 */

backToTopButton.addEventListener('click', () => window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth'
}));

/*
 * Show scroll back button when bottom of the page is reached
 */
document.addEventListener('scroll', () => {
  (window.innerHeight + window.scrollY) > document.body.scrollHeight
    ? backToTopButton.classList.remove('hidden')
    : backToTopButton.classList.add('hidden');
});
