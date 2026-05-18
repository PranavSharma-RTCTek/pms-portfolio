/* ===========================
   MOBILE NAV
=========================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* ===========================
   TSPARTICLES
=========================== */

tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                area: 900
            }
        },
        color: {
            value: ["#00d9ff", "#8a2be2", "#ff00aa"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.45
        },
        size: {
            value: { min: 1, max: 4 }
        },
        links: {
            enable: true,
            distance: 150,
            color: "#00d9ff",
            opacity: 0.15,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "bounce"
            },
            parallax: {
                enable: true,
                force: 60,
                smooth: 10
            }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: ["repulse", "grab"]
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 120
            },
            grab: {
                distance: 150
            }
        }
    },
    detectRetina: true
});

/* ===========================
   THREE.JS ENGINEERING MESH
=========================== */

const canvas = document.getElementById("bg-canvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00d9ff,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

function animateThree() {
    requestAnimationFrame(animateThree);

    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;

    renderer.render(scene, camera);
}

animateThree();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

/* ===========================
   MOUSE TRAIL EFFECT
=========================== */

const trail = document.getElementById("mouse-trail");

document.addEventListener("mousemove", (e) => {
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
});

/* ===========================
   SCROLL HUE SHIFT
=========================== */

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const hue = Math.floor((scrollY / maxScroll) * 360);

    document.body.style.background = `
        linear-gradient(
            135deg,
            hsl(${hue}, 60%, 8%),
            hsl(${(hue + 70) % 360}, 60%, 16%)
        )
    `;

    mesh.rotation.z = scrollY * 0.001;
});

/* ===========================
   SCROLL REVEAL
=========================== */

const revealElements = document.querySelectorAll(
    ".project-card, .about, .contact"
);

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";
});

function revealOnScroll() {
    const trigger = window.innerHeight - 100;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

/* ===========================
   HEADER HIDE/SHOW
=========================== */

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }

    lastScrollTop = scrollTop;
});

/* ===========================
   CONTACT FORM DEMO
=========================== */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Frontend demo complete. Backend integration can be added later.");

    contactForm.reset();
});
