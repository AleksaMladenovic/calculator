const numberBtnsArray = [...document.querySelectorAll(".number")];
const display = document.querySelector("#display");
const plusToMinus = document.querySelector("#plusToMinus");
const operationBtnsArray = [...document.querySelectorAll(".operation")];
const equalBtn = document.querySelector("#equal");

let readyForWritting = true;
let readyForSign = false;
let firstOperand = null;
let seccondOperand = null;
let lastOperation = null;
const DISPLAY_SIZE = 9;

numberBtnsArray.forEach((numberBtn) => {
  numberBtn.addEventListener("click", clickedNumber);
});

operationBtnsArray.forEach((operationBtn) => {
  operationBtn.addEventListener("click", clickedOperation);
});

equalBtn.addEventListener("click", equalOperation);

plusToMinus.addEventListener("click", () => {
  if (lastOperation === null || seccondOperand !== null)
    if (
      display.textContent.length &&
      display.textContent.length <= DISPLAY_SIZE - 1
    ) {
      if (display.textContent[0] != "-") {
        display.textContent = "-" + display.textContent;
      } else {
        display.textContent = display.textContent.slice(1);
      }

      if (seccondOperand === null) firstOperand = -firstOperand;
    }
});

function clickedNumber(e) {
  if (readyForWritting) {
    addNumber(e.currentTarget.textContent);
  }
}

function addNumber(number) {
  if (
    seccondOperand === null &&
    firstOperand !== null &&
    lastOperation !== null
  ) {
    display.textContent = "";
  }

  if (display.textContent.length >= DISPLAY_SIZE) readyForWritting = false;
  else {
    display.textContent += number;
    display.textContent = +display.textContent;
    readyForSign = true;
    if (firstOperand !== null) {
      seccondOperand = +display.textContent;
    }
  }
}

function clickedOperation(e) {
  if (readyForSign) {
    if (!lastOperation) {
      lastOperation = e.currentTarget;
      readyForWritting = true;
      if (firstOperand === null) firstOperand = +display.textContent;
    } else {
      if (seccondOperand === null) {
        lastOperation = e.currentTarget;
        readyForWritting = true;
      } else {
        //do last operation
        //result from last operation set for firstOperand
        //set the new last operation
        //clear the seccond operand

        //equal operation
        equalOperation();
        lastOperation = e.currentTarget;
        readyForWritting = true;
      }
    }
  }
}

function equalOperation() {
  if (firstOperand !== null && lastOperation !== null) {
    let sign = lastOperation.textContent;
    switch (sign) {
      case "+":
        firstOperand = firstOperand + seccondOperand;
        break;
      case "-":
        firstOperand = firstOperand - seccondOperand;
        break;
      case "×":
        firstOperand = firstOperand * seccondOperand;
        break;
      case "÷":
        firstOperand = firstOperand / seccondOperand;
        break;
    }
    lastOperation = null;
    seccondOperand = null;
    displayTheResult(firstOperand);
    readyForWritting = false;
    readyForSign = true;
  }
}

function displayTheResult(num) {
  if (Number.isInteger(num)) {
    let str = "" + num;
    if (str.length > 9) {
      if (num > 0) {
        display.textContent = "+Infinity";
      } else {
        display.textContent = "-Infinity";
      }
    } else {
      display.textContent = "" + num;
    }
  } else {
    let i = DISPLAY_SIZE;
    let strFirst = "" + num;
    while (strFirst.length > DISPLAY_SIZE) {
      num = Math.round((num + Number.EPSILON) * 10 ** i) / 10 ** i;
      strFirst = "" + num;
      i--;
    }
    display.textContent = strFirst;
  }
}
