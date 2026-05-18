const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* =========================
   SECTION STATE SYSTEM
========================= */

const sections = [
    { id: "hero", color: new THREE.Color("#5EEAD4"), z: 6 },
    { id: "case1", color: new THREE.Color("#60A5FA"), z: 5 },
    { id: "case2", color: new THREE.Color("#A78BFA"), z: 5 },
    { id: "about", color: new THREE.Color("#F472B6"), z: 6 },
    { id: "contact", color: new THREE.Color("#FBBF24"), z: 7 }
];

let activeColor = sections[0].color.clone();
let targetZ = 6;

/* =========================
   GPU PARTICLES
========================= */

const count = 1800;

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 14;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: activeColor,
    transparent: true,
    opacity: 0.75
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

/* =========================
   ACTIVE SECTION DETECTION
========================= */

function getActiveSection() {
    let index = 0;

    sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.5) {
            index = i;
        }
    });

    return index;
}

/* =========================
   SCROLL STATE
========================= */

let scrollY = 0;

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    const active = sections[getActiveSection()];

    activeColor.lerp(active.color, 0.08);
    targetZ = active.z;
});

/* =========================
   ANIMATION LOOP
========================= */

function animate() {
    requestAnimationFrame(animate);

    const scrollProgress =
        scrollY / (document.body.scrollHeight - window.innerHeight);

    camera.position.y = -scrollProgress * 7;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    particles.material.color = activeColor;

    particles.rotation.y += 0.0004;

    renderer.render(scene, camera);
}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   REVEAL SYSTEM
========================= */

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            gsap.to(e.target, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1
            });
        }
    });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* =========================
   MAGNET SYSTEM
========================= */

document.querySelectorAll(".magnet").forEach(el => {
    el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();

        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);

        gsap.to(el, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.25
        });
    });

    el.addEventListener("mouseleave", () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5
        });
    });
});