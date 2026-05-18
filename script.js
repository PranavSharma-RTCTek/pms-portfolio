/* =========================================================
   COLOR PALETTE
========================================================= */

const palette = ["#0A1045", "#00C2D1", "#F9E900", "#F6AF65", "#ED33B9"];

/* =========================================================
   GSAP TILT
========================================================= */

const cards = document.querySelectorAll(".tilt");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotX = (y - 0.5) * -12;
        const rotY = (x - 0.5) * 12;

        gsap.to(card, {
            rotationX: rotX,
            rotationY: rotY,
            scale: 1.03,
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
   INTERSECTION OBSERVER (REVEAL)
========================================================= */

const observer = new IntersectionObserver(entries => {
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

document.querySelectorAll(".reveal").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(60px)";
    observer.observe(el);
});

/* =========================================================
   PARALLAX DEPTH
========================================================= */

const parallax = document.querySelectorAll(".parallax");

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    parallax.forEach(el => {
        const depth = parseFloat(el.dataset.depth || 0.1);
        gsap.to(el, {
            y: y * depth * -0.3,
            duration: 0.6
        });
    });

    updateParticleColors(y);
});

/* =========================================================
   PARTICLES (CUSTOM COLLISION + DUPLICATION)
========================================================= */

let particleCount = 60;
const maxParticles = 120;

function spawnParticles(color) {
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        particles: {
            number: { value: particleCount },
            color: { value: color },
            move: {
                enable: true,
                speed: 1.5,
                outModes: "bounce"
            },
            collisions: {
                enable: true
            },
            size: { value: { min: 1, max: 3 } }
        },
        interactivity: { events: { resize: true } }
    });
}

spawnParticles(palette[1]);

/* collision-based spawn simulation */
function duplicateParticles() {
    if (particleCount < maxParticles) {
        particleCount += 2;
        spawnParticles(currentColor);
    }
}

let currentColor = palette[1];

/* =========================================================
   SCROLL COLOR WHEEL SHIFT
========================================================= */

function updateParticleColors(scrollY) {

    const index = Math.floor(
        (scrollY / (document.body.scrollHeight - window.innerHeight)) * palette.length
    );

    const newColor = palette[index % palette.length];

    if (newColor !== currentColor) {
        currentColor = newColor;
        spawnParticles(currentColor);
    }
}

/* =========================================================
   CONTACT
========================================================= */

document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent (frontend demo)");
    e.target.reset();
});
