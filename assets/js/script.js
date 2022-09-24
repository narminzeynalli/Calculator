// variables
const previousInput = document.querySelector('[data-previous-input]');
const currentInput = document.querySelector('[data-current-input]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearEndButton = document.querySelector('[data-clear-end]');
const deleteSymbolButton = document.querySelector('[data-delete]');
const decimalSignButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
let lastValue = '0';
let resultOfCalculation = null;
let clickedEqualButton = false;



// calling functions
updateInputDisplay();
enterNumber();
enterOperator();
enterDecimalSign();
clearAll();
endValueClear();
deleteLastSymbol();
showAnswer();



// functions
function updateInputDisplay() {
    currentInput.innerText = lastValue;
}

function enterNumber() {
    numberButtons.forEach(numberButton =>{
        numberButton.addEventListener('click', ()=>{
            if (numberButton.innerText === 'π') {
                lastValue = 3.14159265;
            } else if (clickedEqualButton) {
                lastValue = numberButton.innerText;
            } else {
                lastValue = lastValue === '0' || lastValue === 3.14159265? numberButton.innerText: lastValue += numberButton.innerText;
            }
            updateInputDisplay();
            clickedEqualButton = false;
        })
    })
}

function enterOperator() {
    operatorButtons.forEach(operatorButton =>{
        operatorButton.addEventListener('click', ()=>{
            if (previousInput.innerText == '') {
                lastValue += operatorButton.innerText;
                previousInput.innerText = lastValue;
                lastValue = '';
                updateInputDisplay();
            } else if (lastValue !== '') {
                let operator = String(previousInput.innerText).slice(-1);
                previousInput.innerText = String(previousInput.innerText).slice(0, -1);
                previousInput.innerText = calculate(parseFloat(previousInput.innerText), parseFloat(lastValue), operator) + operatorButton.innerText;
                updateInputDisplay();
                lastValue = ''
            }
        })
    })
}

function enterDecimalSign() {
    decimalSignButton.addEventListener('click', ()=>{
        if (String(lastValue).indexOf(decimalSignButton.innerText) == -1) {
            if (String(lastValue).length == 0) {
                lastValue = '0.'
            } else {
                lastValue += decimalSignButton.innerText;
            }
        }
        updateInputDisplay();
    })
}

function endValueClear() {
    clearEndButton.addEventListener('click', ()=>{
        lastValue = '0';
        updateInputDisplay();
    })
}

function clearAll() {
    allClearButton.addEventListener('click', ()=>{
        lastValue = '0';
        previousInput.innerText = '';
        updateInputDisplay();
    })
}

function deleteLastSymbol() {
    deleteSymbolButton.addEventListener('click', ()=>{
        if (String(lastValue).length == 1) {
            lastValue = '0'
        } else {
            lastValue = String(lastValue).slice(0, -1);
        }
        updateInputDisplay();
    })
}

function calculate(firstValue, secondValue, operator) {
    switch(operator) {
        case '+':
            resultOfCalculation = firstValue + secondValue;
            break;
        case '-':
            resultOfCalculation = firstValue - secondValue;
            break;
        case 'x':
            resultOfCalculation = firstValue * secondValue;
            break;
        case '÷':
            resultOfCalculation = firstValue / secondValue;
            break;
        default:
            resultOfCalculation = secondValue;
            break;
    }
    previousInput.innerText = '';
    lastValue = resultOfCalculation;
    return lastValue;
}

function showAnswer() {
    equalsButton.addEventListener('click', ()=>{
        clickedEqualButton = true;
        if (lastValue === '') {
            return;
        } else {
            let operator = String(previousInput.innerText).slice(-1);
            previousInput.innerText = String(previousInput.innerText).slice(0, -1);
            calculate(parseFloat(previousInput.innerText), parseFloat(lastValue), operator);
            updateInputDisplay();
        }
    })
}