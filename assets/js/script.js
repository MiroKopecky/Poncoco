(function () {
    "use strict";

    //Easy selector helper function
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    //Easy on scroll event listener
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - 50,
            behavior: 'smooth'
        })
    }

    //Toggle .header-scrolled class to #header when page is scrolled
    let selectHeader = select('#header')
    if (selectHeader) {
        let header = document.getElementById('header');
        const headerScrolled = () => {
            if (window.scrollY > 150) {
                header.style.backgroundColor = "rgba(145,120,109)";
            }
            else {
                header.style.backgroundColor = "transparent";
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
        setTimeout(function () {
            if (window.location.hash) {
                if (select(window.location.hash)) {
                    scrollto(window.location.hash)
                }
            }
        }, 400);
    });

})()

const eyes = document.querySelectorAll('.eye-letter .eye');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 767) {
        eyes.forEach(eye => {
            const container = eye.parentElement;
            const rect = container.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // vektor od stredu "O" po kurzor
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            // vzdialenosť kurzora od stredu
            const distance = Math.sqrt(dx * dx + dy * dy);

            // max vzdialenosť (rádius pohybu zreničky)
            const maxRadius = 15;

            let moveX, moveY;

            if (distance < maxRadius) {
                moveX = dx;
                moveY = dy;
            } else {
                const angle = Math.atan2(dy, dx);
                moveX = Math.cos(angle) * maxRadius;
                moveY = Math.sin(angle) * maxRadius;
            }

            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

const linkButton = document.querySelector('#order');

linkButton.addEventListener('mouseenter', () => {
    if (window.innerWidth > 767) {
        document.querySelectorAll('.eye').forEach(eye => {
            eye.style.width = '30px';
            eye.style.height = '35px';
            eye.style.top = '30px';
            eye.style.left = '32px';
        });
    }
});

linkButton.addEventListener('mouseleave', () => {
    document.querySelectorAll('.eye').forEach(eye => {
        eye.style.width = '22px';
        eye.style.height = '27px';
        eye.style.top = '34px';
        eye.style.left = '36px';
    });
});


//Links click scrolling
document.addEventListener("DOMContentLoaded", function () {
    const coursesLinks = document.querySelectorAll('a[href="#courses"]');
    coursesLinks.forEach(coursesLink => {
        coursesLink.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                const offset = targetSection.offsetTop - 100;
                window.scroll({
                    top: offset,
                    behavior: "smooth"
                });
            }
        });
    })
    const lecturersLink = document.querySelector('a[href="#lecturers"]');
    lecturersLink.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute("href"));
        if (targetSection) {
            const offset = targetSection.offsetTop;
            window.scroll({
                top: offset - 75,
                behavior: "smooth"
            });
        }
    });
    const contactLink = document.querySelector('a[href="#contact"]');
    contactLink.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute("href"));
        if (targetSection) {
            const offset = targetSection.offsetTop - 75;
            window.scroll({
                top: offset,
                behavior: "smooth"
            });
        }
    });
});


// Reviews
const slidesContainer = document.querySelector('.slides-container');
const reviews = document.querySelectorAll('.review');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
let currentReview = 0;

function showReview(index) {
    currentReview = (index + reviews.length) % reviews.length; // ensures index wraps around
    const offset = -currentReview * 100; // calculate offset for sliding
    slidesContainer.style.transform = `translateX(${offset}%)`;
}

leftArrow.addEventListener('click', () => showReview(currentReview - 1));
rightArrow.addEventListener('click', () => showReview(currentReview + 1));
