/* =========================================================
   GSAP SETUP
========================================================= */

gsap.defaults({ ease: "power3.out", duration: 0.6 });

/* =========================================================
   INTERSECTION OBSERVER (SECTION REVEAL)
========================================================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 1
            });
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* =========================================================
   TILT + GSAP SMOOTHING
========================================================= */

const cards = document.querySelectorAll(".tilt");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.04,
            duration: 0.4
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6
        });
    });
});

/* =========================================================
   SCROLL-BASED PARALLAX (DEPTH SYSTEM)
========================================================= */

const parallaxEls = document.querySelectorAll(".parallax");

parallaxEls.forEach(el => {
    el._y = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallaxEls.forEach(el => {
        const depth = parseFloat(el.dataset.depth || 0.1);
        el._y(scrollY * depth * -0.3);
    });
});

/* =========================================================
   CONTACT FORM
========================================================= */

document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Demo form submitted");
    e.target.reset();
});

/* =========================================================
   tsParticles
========================================================= */

tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    particles: {
        number: { value: 80 },
        color: { value: ["#00d9ff"] },
        shape: { type: "circle" },
        opacity: { value: 0.4 },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 1 }
    }
});
