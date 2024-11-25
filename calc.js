const buttons = document.getElementsByClassName("buttons");
const display = document.getElementById("display");

let currentNum = "";
let output = "";
let value1 = 0;
let value2 = 0;

for (const elements of buttons) {
    elements.addEventListener("click", e => {
        if (elements.className === "buttons number") {
            // numbers
            switch (elements.id) {
                case "neg":
                    negate();
                    break;

                case "dec":
                    decimal();
                    break;

                case "clear":
                    clear();
                    break

                default:
                    addToDisplay(elements.innerHTML);
                    break;
            }

            if (currentNum.includes(".")) {
                // float 
                currentValue = parseFloat(currentNum);
                console.log(currentValue);

            } else {
                currentValue = parseInt(currentNum);
                console.log(currentValue);
            }

            console.log("Current: " + currentValue + typeof(currentValue));



        } else if (elements.className === "buttons operator") {
            let result = 0;
            addToMemory(e);
            if (memory.length === 2) {
                operate(memory, elements.id);
            }
        }
    }
    )
}

function addToDisplay(e) {
    currentNum += e;
    display.innerText = currentNum;
}

function clear() {
    currentNum = "";
    currentValue = 0;
    memory = new Array();
    display.innerText = "";
}

function negate() {
    if (currentNum.includes("-")) {
        currentNum = currentNum.substring(1, currentNum.length);
    } else {
        currentNum = "-" + currentNum;
    }
    display.innerText = currentNum;
}

function decimal() {
    if (currentNum.includes("."))
        currentNum;
    else {
        currentNum += "."
    }
    display.innerText = currentNum;
}

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function displayResult(e) {
    display.innerHTML = e;
}