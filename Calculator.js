let display = document.getElementById("display");
let operator1 = null;
let lastOperator = null;
let currentValue = "";
let isResultDisplayed = false;

function updateDisplay(value) {
    display.value = value;
}

function performOperation(op1, op2, operator) {
    switch (operator) {
        case '+': return op1 + op2;
        case '-': return op1 - op2;
        case '*': return op1 * op2;
        case '/': return op2 !== 0 ? op1 / op2 : 'Error'; // Handle division by zero
        default: return op2;
    }
}

function handleButtonClick(event) {
    const buttonText = event.target.textContent;

    if (buttonText >= '0' && buttonText <= '9' || buttonText === '.') {
        if (isResultDisplayed) {
            currentValue = buttonText;
            isResultDisplayed = false;
        } else {
            currentValue += buttonText;
        }
        updateDisplay(currentValue);
    } else if (buttonText === 'C') {
        currentValue = "";
        operator1 = null;
        lastOperator = null;
        isResultDisplayed = false;
        updateDisplay(currentValue);
    } else if (buttonText === 'Backspace') {
        currentValue = currentValue.slice(0, -1);
        updateDisplay(currentValue);
    } else if (buttonText === '=') {
        if (operator1 !== null && lastOperator !== null && currentValue !== "") {
            currentValue = performOperation(operator1, parseFloat(currentValue), lastOperator).toString();
            updateDisplay(currentValue);
            operator1 = null;
            lastOperator = null;
            isResultDisplayed = true;
        }
    } else { // Operator buttons
        if (currentValue !== "") {
            if (operator1 === null) {
                operator1 = parseFloat(currentValue);
            } else if (lastOperator) {
                operator1 = performOperation(operator1, parseFloat(currentValue), lastOperator);
            }
            lastOperator = buttonText;
            currentValue = "";
            isResultDisplayed = false;
        }
    }
}

document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

document.addEventListener('keydown', function (event) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const operatorKeys = ['+', '-', '*', '/'];
    if (allowedKeys.includes(event.key)) {
        if (isResultDisplayed) {
            currentValue = event.key;
            isResultDisplayed = false;
        } else {
            currentValue += event.key;
        }
        updateDisplay(currentValue);
    } else if (operatorKeys.includes(event.key)) {
        if (currentValue !== "") {
            if (operator1 === null) {
                operator1 = parseFloat(currentValue);
            } else if (lastOperator) {
                operator1 = performOperation(operator1, parseFloat(currentValue), lastOperator);
            }
            lastOperator = event.key;
            currentValue = "";
            isResultDisplayed = false;
        }
    } else if (event.key === 'Enter') {
        if (operator1 !== null && lastOperator !== null && currentValue !== "") {
            currentValue = performOperation(operator1, parseFloat(currentValue), lastOperator).toString();
            updateDisplay(currentValue);
            operator1 = null;
            lastOperator = null;
            isResultDisplayed = true;
        }
    } else if (event.key === 'Backspace') {
        currentValue = currentValue.slice(0, -1);
        updateDisplay(currentValue);
    } else if (event.key === 'Escape') { // Handle escape for clearing
        currentValue = "";
        operator1 = null;
        lastOperator = null;
        isResultDisplayed = false;
        updateDisplay(currentValue);
    }
});
