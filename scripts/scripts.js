document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  // Remove default validation
  form.setAttribute("novalidate", true);

  // Add input event listeners for real-time validation
  form
    .querySelectorAll("input[required], textarea[required]")
    .forEach((input) => {
      input.addEventListener("input", function () {
        if (this.type === "radio") return; // Skip radio buttons
        validateField(this);
      });
    });

  // Add change event listener for radio buttons
  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const radioGroup = this.closest(".radio-group");
      radioGroup.classList.remove("error");
      radioGroup.nextElementSibling.classList.remove("visible");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset any existing error states
    hideAllErrors();

    let isValid = true;

    // Validate first name
    const firstName = document.getElementById("firstName");
    if (!validateField(firstName)) {
      isValid = false;
    }

    // Validate last name
    const lastName = document.getElementById("lastName");
    if (!validateField(lastName)) {
      isValid = false;
    }

    // Validate email
    const email = document.getElementById("email");
    if (!validateField(email)) {
      isValid = false;
    }

    // Validate query type
    const queryType = document.querySelector('input[name="queryType"]:checked');
    if (!queryType) {
      const radioGroup = document.querySelector(".radio-group");
      radioGroup.classList.add("error");
      radioGroup.nextElementSibling.classList.add("visible");
      isValid = false;
    }

    // Validate message
    const message = document.getElementById("message");
    if (!validateField(message)) {
      isValid = false;
    }

    // Validate consent
    const consent = document.getElementById("consent");
    if (!consent.checked) {
      const consentLabel = consent.parentElement;
      consentLabel.classList.add("error");
      consentLabel.nextElementSibling.classList.add("visible");
      isValid = false;
    }

    // If valid, show success message
    if (isValid) {
      // Show success message
      successMessage.style.display = "block";

      // Reset the form
      form.reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    }
  });

  // Helper function to validate a single field
  function validateField(input) {
    const isValid =
      input.type === "email"
        ? input.value.trim() && isValidEmail(input.value)
        : input.value.trim();

    if (!isValid) {
      showError(
        input,
        input.type === "email"
          ? "Please enter a valid email address"
          : "This field is required"
      );
      return false;
    }

    // Clear error state
    input.classList.remove("error");
    const errorElements =
      input.parentElement.querySelectorAll(".error-message");
    errorElements.forEach((el) => el.classList.remove("visible"));
    return true;
  }

  // Helper function to show specific error for an input
  function showError(input, message) {
    input.classList.add("error");

    // Find the error message element
    const errorContainer = input.parentElement;
    const errorElements = errorContainer.querySelectorAll(".error-message");

    if (errorElements.length > 0) {
      if (input.type === "email" && !input.value.trim()) {
        errorElements[1].classList.add("visible"); // Show "required" message
      } else {
        errorElements[0].classList.add("visible"); // Show first error message
      }
    }
  }

  // Hide all error messages
  function hideAllErrors() {
    document.querySelectorAll(".error").forEach((el) => {
      el.classList.remove("error");
    });

    document.querySelectorAll(".error-message").forEach((el) => {
      el.classList.remove("visible");
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
