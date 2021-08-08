let buffer = "0"; //What is shown in screen
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".output-screen");

document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}

function handleNumber(value) {
    if(buffer === "0") {
        buffer = "" + value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(value);
            buffer = "" + runningTotal;
            runningTotal = 0;
            previousOperator = null;
            break;

        case '⬅':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substr(0, buffer.length-1);
            }
            break;
    
        default:
            flushOperation(value);
            break;
    }
}

function flushOperation(value) {
    if (buffer === "0") {
        return;
    }
    if(runningTotal === 0) {
        runningTotal = parseInt(buffer);
        buffer = "0";
        previousOperator = value;
    } else {
        handleMath();
    }
}

function handleMath() {
    let intBuffer = parseInt(buffer);
    if(previousOperator === "+") {
        runningTotal += intBuffer;
    } else if(previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if(previousOperator === "x") {
        runningTotal *= intBuffer;
    } else if(previousOperator === "/") {
        runningTotal /= intBuffer;
    }
}

function reRender() {
    screen.innerText = buffer;
}
