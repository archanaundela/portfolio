```javascript
/* =========================================================
   ARCHANA UNDELA PORTFOLIO
   Interactive JavaScript
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        // Change menu icon
        if (navLinks.classList.contains("active")) {
            menuBtn.innerHTML = "✕";
        } else {
            menuBtn.innerHTML = "☰";
        }

    });


    // Close menu when clicking a navigation link

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuBtn.innerHTML = "☰";

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.1
    }

);


sections.forEach(function (section) {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(30px)";

    section.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(section);

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const allSections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", function () {

    let currentSection = "";

    allSections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active-link");

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active-link");

        }

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(12, 10, 22, 0.92)";

        navbar.style.boxShadow =
            "0 15px 50px rgba(0, 0, 0, 0.35)";

    } else {

        navbar.style.background =
            "rgba(17, 15, 30, 0.75)";

        navbar.style.boxShadow =
            "0 15px 50px rgba(0, 0, 0, 0.3)";

    }

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement =
    document.querySelector(".typing");


if (typingElement) {

    const words = [
        "Python Developer",
        "Java Developer",
        "Data Science Enthusiast",
        "Creative Problem Solver"
    ];

    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1500
                );

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (
                    wordIndex === words.length
                ) {

                    wordIndex = 0;

                }

            }

        }


        const speed =
            deleting ? 60 : 100;

        setTimeout(
            typeEffect,
            speed
        );

    }


    typeEffect();

}


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");

            ripple.style.position =
                "absolute";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.3)";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.transform =
                "scale(0)";

            ripple.style.pointerEvents =
                "none";


            const rect =
                button.getBoundingClientRect();


            ripple.style.left =
                event.clientX -
                rect.left -
                5 +
                "px";

            ripple.style.top =
                event.clientY -
                rect.top -
                5 +
                "px";


            button.style.position =
                "relative";

            button.style.overflow =
                "hidden";


            button.appendChild(ripple);


            ripple.animate(
                [
                    {
                        transform: "scale(0)",
                        opacity: 1
                    },
                    {
                        transform: "scale(25)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );


            setTimeout(function () {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   PROJECT CARD TILT EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 25;

            const rotateY =
                (centerX - x) / 25;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0)";

        }
    );

});


/* =========================================================
   SKILL CARD HOVER
========================================================= */

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            card.style.transition =
                "0.3s ease";

        }
    );

});


/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTopButton =
    document.querySelector(".scroll-top");


if (scrollTopButton) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add(
                    "show"
                );

            } else {

                scrollTopButton.classList.remove(
                    "show"
                );

            }

        }
    );


    scrollTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT EMAIL
========================================================= */

const emailButtons =
    document.querySelectorAll(
        '[data-email]'
    );


emailButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const email =
                button.getAttribute(
                    "data-email"
                );

            if (email) {

                window.location.href =
                    "mailto:" + email;

            }

        }
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.querySelector("#year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!menuBtn || !navLinks) return;


        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedButton =
            menuBtn.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navLinks.classList.remove(
                "active"
            );

            menuBtn.innerHTML = "☰";

        }

    }
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "✨ Welcome to Archana Undela's Portfolio!"
);
```
