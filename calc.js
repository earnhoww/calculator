class Calculator {
    currentDisplay = '';
    currentValue = '';
    prevValue = '';
    hasDecimal = false;
    operator = '';
    resetDisplay = false;

    addToDisplay(string) {
        if (this.resetDisplay) {
            // Clear the display if we just displayed a result
            this.currentDisplay = '';
            this.resetDisplay = false; // Reset the flag
        }
        this.currentDisplay += string;
        this.updateDisplay();
    }

    updateDisplay() {
        display.innerText = this.currentDisplay;
    }

    clear() {
        this.currentDisplay = '';
        this.updateDisplay();
    }

    decimal() {
        if (!this.currentDisplay.includes(".")) {
            this.hasDecimal = true;
            if (this.currentDisplay === '') {
                this.addToDisplay("0.");
            } else {
                this.addToDisplay(".");
            }
        }
    }

    negate() {
        if (this.currentDisplay.includes("-")) {
            this.currentDisplay = this.currentDisplay.substring(1, this.currentDisplay.length);
        } else {
            this.currentDisplay = "-" + this.currentDisplay;
        }
        this.updateDisplay();
    }

    saveValue() {
        this.prevValue = this.toNumber(this.currentDisplay);
        this.clear();
    }

    toNumber(string) {
        let number;
        if (this.hasDecimal) {
            number = parseFloat(string);
        } else {
            number = parseInt(string);
        }

        return number;
    }

    setOperator(operatorID) {
        if (this.currentDisplay === '' && this.prevValue === ''){
            console.log('ERRE');
            return;

        }
        if (this.currentDisplay === '' && this.operator != ''){
            console.log('ERRE');
            return;
        }



        if (this.prevValue != '') {
            console.log("Here!");
            this.operate();
            this.operator = operatorID;
            
        } else {
            this.operator = operatorID;
            this.saveValue();
        }
    }

    operate() {
        if (this.operator === ''){
            console.log("NO operator")
            return
        }

        let result;
        this.currentValue = this.toNumber(this.currentDisplay);
        console.log(this.prevValue, this.currentValue, this.operator);
        switch (this.operator) {
            case "plus":
                result = this.plus(this.prevValue, this.currentValue);
                break;
            case "minus":
                result = this.minus(this.prevValue, this.currentValue);
                break;
            case "multiply":
                result = this.multiply(this.prevValue, this.currentValue);
                break;
            case "divide":
                result = this.divide(this.prevValue, this.currentValue);
                break;
            case "power":
                result = this.power(this.prevValue, this.currentValue);
                break;
            case "mod":
                result = this.modulo(this.prevValue, this.currentValue);
                break
            default:
                console.log("?????")
                break

        }

        console.log("Result: " + result);
        if (result.toString().includes(".")) {
            this.hasDecimal = true;
        }

        this.prevValue = result;        
        this.clear();
        this.addToDisplay(result);
        this.operator = '';
        this.resetDisplay = true
        console.log(this.prevValue, this.currentValue, this.operator);
        
    }

    plus(x, y) {
        return x + y;
    }

    minus(x, y) {
        return x - y;
    }
    multiply(x, y) {
        return x * y;
    }
    divide(x, y) {
        return x / y;
    }

    power(x, y) {
        return x ** y;
    }

    modulo(x, y) {
        return x % y;
    }
}

const numbers = document.getElementsByClassName("buttons number");
const operators = document.getElementsByClassName("buttons operator");
const special = document.getElementsByClassName("buttons special");
const equal = document.getElementById("equal");
const display = document.getElementById("display");

let myCalc = new Calculator();

for (let number of numbers) {
    number.addEventListener("click", e => {
        console.log("Inputted: " + number.innerText);
        myCalc.addToDisplay(number.innerText);
    })
}

for (let operator of operators) {
    operator.addEventListener("click", e => {
        myCalc.setOperator(operator.id);
    })
}

for (let element of special) {
    element.addEventListener("click", e => {
        console.log(e);
        switch (element.id) {
            case "neg":
                myCalc.negate();
                break;
            case "clear":
                myCalc.currentValue = '';
                myCalc.prevValue = '';
                myCalc.operator = '';
                myCalc.hasDecimal = false;
                myCalc.clear();
                break;
            case "dec":
                myCalc.decimal();
                break;
            case "equal":
                myCalc.operate();
                break;
        }
    })
}