// script.js
let displayValue = '0'; // Display value on calculator
let firstOperand = null; // First operand for the operation
let secondOperand = false; // Check if second operand is input
let operator = null; // Operator for calculation

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = displayValue; // Update the display text
}

function handleNumber(number) {
  if (secondOperand) {
    displayValue = number;
    secondOperand = false;
  } else {
    displayValue = displayValue === '0' ? number : displayValue + number;
  }
}

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && secondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(value)) {
    firstOperand = value;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, value);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  secondOperand = true;
  operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = false;
  operator = null;
}

updateDisplay();

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      handleNumber(button.dataset.value);
      updateDisplay();
    } else if (button.classList.contains('operator')) {
      handleOperator(button.dataset.value);
      updateDisplay();
    } else if (button.id === 'clear') {
      resetCalculator();
      updateDisplay();
    } else if (button.id === 'equals') {
      handleOperator('=');
      updateDisplay();
    }
  });
});
