const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll("[data-num]");
const opButtons = document.querySelectorAll("[data-op]");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const negativeButton = document.querySelector("#negative");

let numArr = [];
let currOp;
let currNum = "";

function updateScreen(num){
    screen.textContent = num;
}

function round(num) {
    let n = Math.round(num*100000)/100000;
    return n;
}

function calc(num1, num2, op) {
    switch(op) {
        case "multiply":
            return num1*num2;
        case "divide":
            if (num2 === 0) return undefined;
            return num1/num2;
        case "add":
            return num1+num2;
        case "subtract":
            return num1-num2;
        case "modulo":
            return num1%num2;
    }
}

function pushCurrNum(){
    if (currNum === "") return;
    numArr.push(Number(currNum));   
    currNum = "";
    if (numArr.length === 2 && !currOp){
        numArr.shift();
    }
    else if(numArr.length === 2 && currOp) {
        let result = calc(numArr[0], numArr[1], currOp);
        if (result) {
            result = round(result);
            currOp = undefined;
            numArr.shift();
            numArr.shift();
            numArr.push(result);
            updateScreen(result);            
        } 
        else  {
            clear();
            updateScreen("OOPS");
        }
    }
    console.log(numArr);
}

function handleNum(){
    let num = this.dataset.num
    currNum = currNum + num;
    updateScreen(currNum)
}

function handleOp(){
    if (numArr.length === 1 || currNum !== "") {
        pushCurrNum();        
        currOp = this.dataset.op;
        console.log(this.dataset.op);
    }
}

function handleEqual() {
    pushCurrNum();
}

function clear() {
    numArr.shift();
    numArr.shift();
    currOp = "";
    currNum = "";
    updateScreen(currNum);
}

function addDecimal() {
    console.log("...");
    if (currNum.includes("."))
        return;
    currNum = currNum + ".";
    updateScreen(currNum);
}

function negate() {
    if (currNum === "" && numArr.length === 1) {
        let num = numArr[0];
        num = -num
        numArr.shift();
        numArr.push(num);
        updateScreen(num);
    }
    else if (currNum !== "") {
        let num = Number(currNum);
        num = -num;
        currNum = String(num);
        updateScreen(currNum);
    }
}

numberButtons.forEach(function(e){
    e.addEventListener('click', handleNum);
});

opButtons.forEach(function(e){
    e.addEventListener('click', handleOp);
});

equal.addEventListener('click', handleEqual);

clearButton.addEventListener('click', clear);

decimalButton.addEventListener('click', addDecimal);

negativeButton.addEventListener('click', negate);