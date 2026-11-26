/* =========================================
   MOBILE NAVIGATION
========================================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", isOpen);

    navToggle.textContent = isOpen ? "✕" : "☰";
  });

  const links = navLinks.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      navToggle.setAttribute("aria-expanded", "false");

      navToggle.textContent = "☰";
    });
  });
}

/* =========================================
   BOOKING FORM
========================================= */

const bookingForm = document.querySelector("#booking-form");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* Disable the button so the form cannot be
       accidentally submitted multiple times */

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "";
    formStatus.classList.remove("error");

    const formData = new FormData(bookingForm);

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",

        body: formData,

        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        /* Only redirect after Formspree confirms
           that the submission was successful */

        window.location.href = "thank-you.html";
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      formStatus.textContent =
        "Something went wrong while sending your request. Please try again.";

      formStatus.classList.add("error");

      submitButton.disabled = false;
      submitButton.textContent = "Send Booking Request";

      console.error(error);
    }
  });
}
