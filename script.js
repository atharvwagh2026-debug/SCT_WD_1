// ==========================
// THEME TOGGLE
// ==========================

const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
    themeBtn.innerHTML = '<i class="ri-sun-line"></i>';
}

themeBtn.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = '<i class="ri-moon-line"></i>';
    }

});


// ==========================
// STICKY NAVBAR
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(9,9,11,.8)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";

    } else {

        header.style.background = "rgba(255,255,255,.05)";
        header.style.boxShadow = "none";

    }

});


// ==========================
// HERO CARD FLOATING
// ==========================

const dashboard = document.querySelector(".dashboard");

window.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    dashboard.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});


// ==========================
// BUTTON RIPPLE EFFECT
// ==========================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;

        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ==========================
// SCROLL REVEAL
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .2

});

document.querySelectorAll(".hero-content,.dashboard").forEach((el) => {

    observer.observe(el);

});


// ==========================
// PRELOADER (Future Ready)
// ==========================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ==========================
// CONSOLE MESSAGE 
// ==========================

console.log("%cATHNEX",
"font-size:32px;font-weight:bold;color:#a855f7;");

console.log("Designed & Developed by Atharv 🚀");