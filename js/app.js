/*
 * Desired functionality:
 *  - [x] Scroll to section
 *  - [ ] Scroll back to top
 *  - [ ] Create navigation bar
 *  - [ ] Populate navigation bar
 *  - [ ] Collapse section
 */


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
