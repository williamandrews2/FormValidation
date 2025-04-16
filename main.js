const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitButton = document.getElementById("submit-button");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
let confirmPasswordTouched = false; // TODO reset when/if form resets.

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    alert("Please correct form mistakes before submitting.");
  } else {
    alert("Awesome! Your form has been submitted.");
  }
});

confirmPassword.addEventListener("input", () => {
  confirmPasswordTouched = true;
  checkPasswords();
});

confirmPassword.addEventListener("blur", () => {
  confirmPasswordTouched = true;
});

password.addEventListener("input", () => {
  checkPasswords();
});

inputs.forEach((input) => {
  if (input === confirmPassword) return;

  const errorSpan = input.nextElementSibling;

  input.addEventListener("blur", () => {
    if (input.validity.valid) {
      clearError(errorSpan);
    } else {
      showError(input, errorSpan);
    }
  });
});

function showError(input, errorSpan) {
  if (input.validity.valueMissing) {
    errorSpan.textContent = `A valid ${input.name || input.id} is required.`;
  } else if (input.validity.typeMismatch) {
    errorSpan.textContent = `You must enter a valid ${input.name || input.id}.`;
  } else if (input.validity.patternMismatch) {
    errorSpan.textContent = `Invalid format for ${input.name || input.id}.`;
  } else if (input.validity.customError) {
    errorSpan.textContent = input.validationMessage;
  }

  errorSpan.className = "error active";
}

function checkPasswords() {
  // using confirmPassword as we only want the error to show up on the confirm password input field.
  const errorSpan = confirmPassword.nextElementSibling;
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");

    // prevent error message from rendering prematurely
    if (confirmPasswordTouched) {
      showError(confirmPassword, errorSpan);
    }
  } else {
    confirmPassword.setCustomValidity("");
    clearError(errorSpan);
  }
}

function clearError(errorSpan) {
  errorSpan.textContent = "";
  errorSpan.className = "error";
}
