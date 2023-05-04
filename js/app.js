/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = document.getElementsByTagName('section');
const navBarUl = document.getElementById('ul');
const mainHeader = document.getElementById('nav-bar');
const backToTopButton = document.getElementById('back-to-top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description: takes a section and creates a navigation item that links to
 * the given section
 * @param {Element} section: the given <section>
*/
const createNavItem = (section) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<a href="#${section.id}" class="${section.id}">${section.dataset.sectionName}</a>`
    newLi.classList.add(`${section.id}`, 'nav_item');
    return newLi;
};

/**
 * @description: checks if a given element has a class 'active'
 * @param {HTMLElement} element: any HTMLElement
*/
const hasActiveClass = (element) => {
    const elementClassList = element.classList;
    for (let i = 0; i < elementClassList.length; i++) {
        if (elementClassList[i] === 'active') {
            return true;
        };
    }
    return false;
};

/**
 * @description: takes an element and determines wether or not it is in the
 * viewport
 * @param {HTMLElement} element: any HTML element
 *
*/
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (rect.y >= 30 && rect.bottom <= window.innerHeight);
};

/**
 * @description: makes the header visible
 *
*/
const unshrinkHeader = () => {
    mainHeader.classList.remove('shrinked');
}

/**
 * @description: adds or removes 'active' class to an element
 * @param {HTMLElement} element: any element
 * @param {Boolean} option: true for adding, false for removing
 *
*/
const addRemoveActive = (element, option) => {
    option ? element.classList.add('active') : element.classList.remove('active');
};

/**
 * @description: sets the class 'collapsed' to the section's content, and the
 * content's paragraphs to make it collapse
 * @param {HTMLElement}: the section's header
 *
*/
const collapseSections = (sectHeader) => {
    const sectContent = sectHeader.parentElement;
    const para = sectContent.querySelector('p');
    sectContent.parentElement.classList.toggle('collapsed');
    //para.classList.toggle('hidden');
};

/**
 * @description: sets the class 'inverted' to the arrows in the headers of each
 * section, signifying the section is collapsed or collapsible
 * @param {HTMLElement} header: the section's header
 *
*/
const invertArrow = (header) => {
    const arrow = header.querySelector('span');
    arrow.classList.toggle('inverted');
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description: creates a navigation bar from a list of the sections in the page
 * @param {NodeList} sectList: a list with all the sections
 * @param {HTMLElement} navBar: a UL element
 *
*/
const buildNavBar = (sectList, navBar) => {
    // emptying the nav_bar content so that we can update it in case new
    // sections are added to the page
    navBar.innerHTML = '';

    // a fragment to append the li to
    const fragment = new DocumentFragment();

    // create a new li for each section and append it to fragment
    for (let i = 0; i < sectList.length; i++) {
        fragment.appendChild(createNavItem(sectList[i]));
    }

    // append the fragment to the nav_bar
    navBar.append(fragment);
};

/**
 * @description: sets active class to section in viewport and corresponding
 * nav_bar_item 
 * @param {NodeList}: 
 *
*/
const setActiveClass = (sectList) => {
    for (let i = 0; i < sectList.length; i++) {
        // selecting the nav_bar_item so that it's class can be updated in case the
        // section is in the viewport
        const navItem = document.querySelector(`.${sectList[i].id}`);

        // if the section is in viewport but it hasn't the class 'active', add
        // the 'active' class to it and the corresponding nav_bar_item;
        //
        // otherwise, if the element is not in viewport and has the class
        // 'active', remove it from the section and the corresponding
        // nav_bar_item
        //
        if (isInViewport(sectList[i]) && !(hasActiveClass(sectList[i]))) {
            addRemoveActive(sectList[i], 1);
            addRemoveActive(navItem, 1);
        } else if (!isInViewport(sectList[i]) && hasActiveClass(sectList[i])) {
            addRemoveActive(sectList[i], 0);
            addRemoveActive(navItem, 0);
        }
    }
}

/**
 * @description: scrolls to an element given its id, respecting the conditions
 * set in the function isInViewport
 * @param {String} id: the element's id
 *
*/
const scrollToId = (id) => {
    // setting the constants
    const element = document.querySelector(`#${id}`);
    const elementRect = element.getBoundingClientRect();
    const headerHeight = mainHeader.offsetHeight;
    
    // srolling to the id's position
    window.scroll({
        // determine the position relative to the page scroll and the header
        // height
        top: (window.scrollY + (elementRect.y - 40)),
        left: 0,
        behavior: 'smooth'
    });
};

/**
 * @description: sets or unsets hidden tag on paragraphs as to make sections collapsible
 * @param {HTMLElement} element: any element
 * @param {Boolean} option: true hides, false unhides
 *
*/
const hideUnhideElement = (element) => {
    element.classList.toggle('hidden');
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function() {
    buildNavBar(sectionList, navBarUl);
    setActiveClass(sectionList);
});

// Scroll to section on link click
navBarUl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.srcElement.tagName !== 'UL') {
        scrollToId(event.srcElement.classList[0]);
    }
});

// Set sections as active
document.addEventListener('scroll', function() { setActiveClass(sectionList) });

// Show nav bar while scrolling, and hide it when stopped
document.addEventListener('scroll', function() {
    unshrinkHeader();
    setTimeout(function() { mainHeader.classList.add('shrinked') }, 2500);
});

// Show nav bar on hover
mainHeader.addEventListener('mouseover', function() {
    unshrinkHeader();
});

// if user scrolls past the bottom, show a button to return to top
document.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Scroll to top on button click
backToTopButton.addEventListener('click', function () {
    hideUnhideElement(backToTopButton);
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

// Make sections collapsible
document.addEventListener('click', function(event) {
    if (event.srcElement.tagName === 'section') {
        collapseSections(event.srcElement);
        invertArrow(event.srcElement);
    }
});
