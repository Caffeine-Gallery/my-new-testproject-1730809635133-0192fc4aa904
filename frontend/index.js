import { backend } from 'declarations/backend';

let currentValue = '';
let storedValue = '';
let currentOperation = null;

window.appendToDisplay = (value) => {
    currentValue += value;
    updateDisplay();
};

window.setOperation = (operation) => {
    if (currentValue !== '') {
        if (storedValue !== '') {
            calculate();
        }
        storedValue = currentValue;
        currentValue = '';
        currentOperation = operation;
    }
};

window.clearDisplay = () => {
    currentValue = '';
    storedValue = '';
    currentOperation = null;
    updateDisplay();
};

window.calculate = async () => {
    if (currentOperation && storedValue !== '' && currentValue !== '') {
        const a = parseFloat(storedValue);
        const b = parseFloat(currentValue);
        let result;

        switch (currentOperation) {
            case '+':
                result = await backend.add(a, b);
                break;
            case '-':
                result = await backend.subtract(a, b);
                break;
            case '*':
                result = await backend.multiply(a, b);
                break;
            case '/':
                result = await backend.divide(a, b);
                break;
        }

        currentValue = result.toString();
        storedValue = '';
        currentOperation = null;
        updateDisplay();
    }
};

function updateDisplay() {
    document.getElementById('display').value = currentValue;
}
