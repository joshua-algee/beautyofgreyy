const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {

  navToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    navToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

    navToggle.textContent = isOpen ? "✕" : "☰";

  });


  const links = navLinks.querySelectorAll("a");

  links.forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.textContent = "☰";

    });

  });

}