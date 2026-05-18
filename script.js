function init() {

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

const count = 1700;

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 14;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x5eead4,
    transparent: true,
    opacity: 0.75
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

let scrollY = 0;

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

function animate() {
    requestAnimationFrame(animate);

    const scrollProgress =
        scrollY / (document.body.scrollHeight - window.innerHeight);

    camera.position.y = -scrollProgress * 7;

    particles.rotation.y += 0.0004;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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

}

window.addEventListener("load", init);