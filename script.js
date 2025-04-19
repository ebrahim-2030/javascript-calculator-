// Get reference to the display input field
const display = document.getElementById("display");

// Append value to display with validation
function append(value) {
  const lastChar = display.value.slice(-1);

  // Prevent multiple decimal points in one number
  if (value === "." && lastChar === ".") return;

  // Prevent consecutive operators
  if (
    ["+", "-", "*", "/"].includes(lastChar) &&
    ["+", "-", "*", "/"].includes(value)
  ) {
    display.value = display.value.slice(0, -1) + value;
  } else {
    display.value += value;
  }

  // Scroll to the end of the input
  scrollToEnd();
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Delete the last character in the display
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate and calculate the expression
function calculate() {
  try {
    // Validate allowed characters before evaluation
    if (/^[0-9+\-*/.() ]+$/.test(display.value)) {
      const result = new Function(`return ${display.value}`)();
      // Check if result is a valid number and display it
      display.value = Number.isFinite(result)
        ? parseFloat(result.toFixed(10))
        : "Error";
    } else {
      display.value = "Error";
    }
  } catch {
    display.value = "Error"; // Catch invalid expression errors
  }
}

// Scroll to the end of the display input (for long numbers)
function scrollToEnd() {
  display.scrollLeft = display.scrollWidth;
}

// Listen for keyboard inputs and map them to calculator functions
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    append(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
