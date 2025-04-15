const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    alert("Please correct form mistakes before submitting.");
  } else {
    alert("Awesome! Your form has been submitted.");
  }
});

inputs.forEach((input) => {
  const errorSpan = input.nextElementSibling;

  input.addEventListener("blur", (event) => {
    if (input.validity.valid) {
      errorSpan.textContent = "";
      errorSpan.className = "error";
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
  }

  // LEFT OFF HERE, ISSUES WITH TEXTCONTENT FOR ALL EXCEPT EMAIL. CHECK VALIDATION

  errorSpan.className = "error active";
}
