const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  const errorSpan = input.nextElementSibling;

  input.addEventListener("input", (event) => {
    if (input.validity.valid) {
      errorSpan.textContent = "";
      errorSpan.className = "error";
    } else {
      console.log(`There is an error with this value. Input: ${input}`);
      showError(input, errorSpan);
    }
  });
});

function showError(input, errorSpan) {
  console.log(`Input: ${input} Error span: ${errorSpan}`);
  if (input.validity.valueMissing) {
    console.log(`Type: ${input.name} or ${input.id}`);
    errorSpan.textContent = `A valid ${input.name || input.id} is required.`;
  } else if (input.validity.typeMismatch) {
    errorSpan.textContent = `You must enter a valid ${input.name || input.id}.`;
  } else if (input.validity.patternMismatch) {
    errorSpan.textContent = `Invalid format for ${input.name || input.id}.`;
  }

  // LEFT OFF HERE, ISSUES WITH TEXTCONTENT FOR ALL EXCEPT EMAIL. CHECK VALIDATION

  errorSpan.className = "error active";
}
