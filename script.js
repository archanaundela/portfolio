/* =========================================================
   ARCHANA UNDELA PORTFOLIO
   Optimized Interactive Logic
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  
  /* --- MOBILE MENU --- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-links a");

  function toggleMenu(open) {
    const isActive = open !== undefined ? open : !navLinks.classList.contains("active");
    navLinks.classList.toggle("active", isActive);
    menuBtn.innerHTML = isActive ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isActive);
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => toggleMenu());
    links.forEach(link => link.addEventListener("click", () => toggleMenu(false)));

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  /* --- SCROLL REVEAL (INTERSECTION OBSERVER) --- */
  const observerOptions = { threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    revealObserver.observe(section);
  });

  /* --- ACTIVE NAVIGATION & NAVBAR SCROLL --- */
  const allSections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const navbar = document.querySelector(".navbar");
  const scrollTopButton = document.getElementById("scrollTop");

  let isTicking = false;

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar Background
        if (navbar) {
          if (scrollY > 50) {
            navbar.style.background = "rgba(12, 10, 22, 0.92)";
            navbar.style.boxShadow = "0 15px 50px rgba(0, 0, 0, 0.35)";
          } else {
            navbar.style.background = "rgba(17, 15, 30, 0.75)";
            navbar.style.boxShadow = "none";
          }
        }

        // Scroll Top Button
        if (scrollTopButton) {
          scrollTopButton.classList.toggle("show", scrollY > 500);
        }

        // Active Link Highlighting
        let currentSection = "";
        allSections.forEach(section => {
          const sectionTop = section.offsetTop - 150;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
          }
        });

        navAnchors.forEach(link => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active-link");
          }
        });

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- TYPING EFFECT --- */
  const typingElement = document.querySelector(".typing");
  if (typingElement) {
    const words = ["Python Developer", "Java Developer", "Data Science Enthusiast", "Creative Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      const speed = isDeleting ? 60 : 100;
      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  /* --- BUTTON RIPPLE EFFECT --- */
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (event) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();

      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.pointerEvents = "none";
      ripple.style.left = `${event.clientX - rect.left - 5}px`;
      ripple.style.top = `${event.clientY - rect.top - 5}px`;

      button.appendChild(ripple);

      ripple.animate([
        { transform: "scale(0)", opacity: 1 },
        { transform: "scale(25)", opacity: 0 }
      ], { duration: 600, easing: "ease-out" });

      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* --- PROJECT CARD TILT EFFECT --- */
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 20;
      const rotateY = (rect.width / 2 - x) / 20;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* --- CONTACT EMAIL BUTTONS --- */
  document.querySelectorAll("[data-email]").forEach(button => {
    button.addEventListener("click", () => {
      const email = button.getAttribute("data-email");
      if (email) window.location.href = "mailto:" + email;
    });
  });

  /* --- DYNAMIC YEAR --- */
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  console.log("✨ Portfolio initialized successfully.");
});
