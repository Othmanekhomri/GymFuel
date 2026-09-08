

/* =========================================================
   MOBILE NAV
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});



/* =========================================================
   SUBTLE PARALLAX BACKGROUND
========================================================= */



const sections = document.querySelectorAll(".section");

let ticking = false;


function updateParallax() {

    const isMobile =
        window.innerWidth <= 850;

    const strength =
        isMobile ? 0.025 : 0.055;


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        const sectionCenter =
            rect.top + rect.height / 2;

        const screenCenter =
            window.innerHeight / 2;

        const distance =
            screenCenter - sectionCenter;

        let movement =
            distance * strength;


        /* keep movement subtle */

        movement =
            Math.max(
                -45,
                Math.min(45, movement)
            );


        section.style.setProperty(
            "--parallax",
            `${movement}px`
        );

    });

    ticking = false;
}


function requestParallax() {

    if (!ticking) {

        requestAnimationFrame(
            updateParallax
        );

        ticking = true;
    }
}


window.addEventListener(
    "scroll",
    requestParallax,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateParallax
);


updateParallax();
// =========================
// FLOATING SECTION NAV
// =========================

const floatingNav = document.getElementById("floatingSectionNav");
const floatNavButton = document.getElementById("floatNavButton");
const floatNavArrow = document.getElementById("floatNavArrow");
const floatNavText = document.getElementById("floatNavText");

const gymSections = [
    {
        section: "superenergy",
        menus: "superenergy-menus",
        ingredients: "superenergy-ingredients"
    },
    {
        section: "bulking",
        menus: "bulking-menus",
        ingredients: "bulking-ingredients"
    },
    {
        section: "cutting",
        menus: "cutting-menus",
        ingredients: "cutting-ingredients"
    }
];

function updateFloatingNav() {

    let activeSection = null;

    gymSections.forEach(item => {
        const section = document.getElementById(item.section);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (
            rect.top <= window.innerHeight * 0.6 &&
            rect.bottom >= window.innerHeight * 0.4
        ) {
            activeSection = item;
        }
    });

    // Not inside Energy, Bulking or Cutting
    if (!activeSection) {
        floatingNav.classList.remove("active");
        return;
    }

    // Check whether we're in the menus or ingredients area
    const menus = document.getElementById(activeSection.menus);
    const ingredients = document.getElementById(activeSection.ingredients);

    if (!menus || !ingredients) return;

    const menusRect = menus.getBoundingClientRect();
    const ingredientsRect = ingredients.getBoundingClientRect();

    // We're currently around Ingredients
    if (ingredientsRect.top <= window.innerHeight * 0.6) {

        floatingNav.classList.add("active");

        floatNavArrow.textContent = "↑";
        floatNavText.textContent = "Menus";

        floatNavButton.href = "#" + activeSection.menus;

    } else {

        // We're around Menus
        floatingNav.classList.add("active");

        floatNavArrow.textContent = "↓";
        floatNavText.textContent = "Ingredients";

        floatNavButton.href = "#" + activeSection.ingredients;
    }
}

window.addEventListener("scroll", updateFloatingNav, { passive: true });
window.addEventListener("resize", updateFloatingNav);

updateFloatingNav();

