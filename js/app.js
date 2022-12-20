/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = document.getElementsByTagName('section');
const navBarUl = document.querySelector('ul');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description: takes a section and creates a navigation item that links to
 * the given section
 * @param {Element} sectionElement: a <section> element
*/
const createNavItem = (sectionElement) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<a href="#${sectionElement.id}">${sectionElement.dataset.sectionName}</a>`
    newLi.classList.add('nav_item', `${sectionElement.id}`);
    return newLi;
};

/**
 * @description: checks if a given element has a class 'active'
 * @param {Element} elem: any HTMLElement
*/
const hasActiveClass = (elem) => {
    const classArray = Array.from(elem.classList);
    for (let i = 0; i < classArray.length; i++) {
        if (classArray[i] === 'active') {
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
    const mainHeader = document.querySelector('header');
    const rect = element.getBoundingClientRect();
    return (rect.y >= mainHeader.offsetHeight && rect.bottom <= window.innerHeight);
};

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
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description: creates a nav_bar from a list of the sections in the page
 * @param {NodeList} sectList: a list with all the sections
 * @param {HTMLElement} navBar: a ul element
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
        if (isInViewport(sectList[i])) {
            if (!hasActiveClass(sectList[i])) {
                addRemoveActive(sectList[i], 1);
                addRemoveActive(navItem, 1);
            }
        } else if (!isInViewport(sectList[i]) && (hasActiveClass(sectList[i]))) {
            addRemoveActive(sectList[i], 0);
            addRemoveActive(navItem, 0);
        }
    }
}

/**
 * @description: scrolls to an element given its id, sets it in viewport (as per
 * isInViewport above) and makes it avoid colliding with the navbar
 * @param {String} id: the element's id
 *
*/
const scrollToId = (id) => {
    // setting the constants
    const element = document.querySelector(`#${id}`);
    const elementRect = element.getBoundingClientRect();
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // srolling to the id's position
    window.scroll({
        // determine the position relative to the page scroll and the header
        // height
        
        top: (window.scrollY + (elementRect.y - headerHeight - 20)),
        left: 0,
        behavior: 'smooth'
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

