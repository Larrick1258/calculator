// access the dom for display output
// =================================
let prevOutput = document.getElementById('previous-output');
let currentOutput = document.getElementById('recent-output');
let operatorDisplay = document.getElementById('operator-display');


// getting access to the dom
// ===============================
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.center-cont');

// initaiting the clicked button to display on the screen
// =======================================
keys.addEventListener('click', e => {
    if (e.target.matches('a')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = currentOutput.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                currentOutput.textContent = keyContent;
            } else {
                currentOutput.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        if (action === 'add' || action === 'minus' || action === 'divide' || action === 'multiply') {
            operatorDisplay.textContent = key.textContent;
            calculator.dataset.previousKeyType = 'operator';
            prevOutput.textContent = displayedNum;
            currentOutput.textContent = '0';

            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                currentOutput.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator') {
                currentOutput.textContent = '0';
            }
            calculator.dataset.previousKey = 'decimal';

        }
        if (action === 'deleteAll') {
            prevOutput.textContent = '';
            currentOutput.textContent = 0;
            operatorDisplay.textContent = '';
            calculator.dataset.previousKeyType = '';
        }
        if (action === 'clear') {
            currentOutput.textContent = currentOutput.textContent.slice(0, -1);
            operatorDisplay.textContent = '';
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action === 'total') {
            // create a funtion 
            // ======================================
            const total = (n1, operator, n2) => {
                let result = '';
                if (operator === 'add') {
                    result = parseFloat(n1) + parseFloat(n2);
                } else if (operator === 'minus') {
                    result = parseFloat(n1) - parseFloat(n2);
                } else if (operator === 'multiply') {
                    result = parseFloat(n1) * parseFloat(n2);
                } else if (operator === 'divide') {
                    result = parseFloat(n1) / parseFloat(n2);
                }
                return result;
            }
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            calculator.dataset.previousKeyType = 'total';
            currentOutput.textContent = total(firstValue, operator, secondValue);

        }
    }

});
