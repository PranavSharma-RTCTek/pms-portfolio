/* ================= NAV ================= */

document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
});

/* ================= TILT EFFECT ================= */

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});

/* ================= CONTACT FORM ================= */

document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message submitted (frontend demo only).");
    e.target.reset();
});
