const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Handle clear button
    if (button.classList.contains('clear')) {
      currentInput = '';
      operator = '';
      firstOperand = '';
      display.textContent = '0';
      return;
    }

    // Handle operator
    if (button.classList.contains('operator')) {
      if (currentInput) {
        firstOperand = currentInput;
        operator = value;
        currentInput = '';
      }
      return;
    }

    // Handle equals button
    if (button.classList.contains('equals')) {
      if (currentInput && operator && firstOperand) {
        const result = evaluate(Number(firstOperand), Number(currentInput), operator);
        display.textContent = result;
        currentInput = result.toString();
        operator = '';
        firstOperand = '';
      }
      return;
    }

    // Handle number and decimal input
    if (value === '.' && currentInput.includes('.')) {
      return; // Avoid multiple decimals
    }

    currentInput += value;
    display.textContent = currentInput;
  });
});

// Calculation logic
function evaluate(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return 0;
  }
}
