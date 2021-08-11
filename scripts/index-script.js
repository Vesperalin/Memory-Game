// script for index.html page
let nav = document.querySelector('nav');

nav.addEventListener('click', e => {
    if (e.target.id === 'easy-level') {
        localStorage.setItem("level", 0);
    } else if (e.target.id === 'medium-level') {
        localStorage.setItem("level", 1);
    } else if (e.target.id === 'hard-level') {
        localStorage.setItem("level", 2);
    } else if (e.target.id === 'mobile') {
        localStorage.setItem("level", 3);
    }
});
