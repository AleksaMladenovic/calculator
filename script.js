const numberBtnsArray = [...document.querySelectorAll(".number")];
const display = document.querySelector("#display");
const plusToMinus = document.querySelector("#plusToMinus");
const operationBtnsArray = [...document.querySelectorAll(".operation")];
const equalBtn = document.querySelector("#equal");
const dotBtn = document.querySelector("#dot");

let readyForWritting = true;
let readyForSign = false;
let firstOperand = null;
let seccondOperand = null;
let lastOperation = null;
let dotClicked = false;
const DISPLAY_SIZE = 9;

function setOperation(newOperation){
    if(lastOperation!==null)
        lastOperation.classList.remove("picked");
    if(newOperation!==null)
        newOperation.classList.add("picked");
    lastOperation = newOperation;
}
dotBtn.addEventListener("click", (e)=>{
    if(!dotClicked)
    {
        dotClicked=clickedNumber(e);
    }
})

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
      display.textContent.length //&&
      //display.textContent.length <= DISPLAY_SIZE - 1
    ) {
      if (display.textContent[0] !== "-") {
        display.textContent = "-" + display.textContent;
        displayTheResult(+display.textContent);
      } else {
        display.textContent = display.textContent.slice(1);
      }

      if (seccondOperand === null&&firstOperand!==null) firstOperand = -firstOperand;
    } else if(display.textContent.length ===DISPLAY_SIZE){
        
    }
});

function clickedNumber(e) {
  if (readyForWritting) {
    return addNumber(e.currentTarget.textContent);
  }
  return false;
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
    if(!dotClicked&&number!='.')
    display.textContent = +display.textContent;
    readyForSign = true;
    if (firstOperand !== null) {
      seccondOperand = +display.textContent;
    }
    return true;
  }
  return false;
}

function clickedOperation(e) {
  if (readyForSign) {
    if (!lastOperation) {
      setOperation(e.currentTarget);
      readyForWritting = true;
      dotClicked = false;
      if (firstOperand === null) firstOperand = +display.textContent;
    } else {
      if (seccondOperand === null) {
        setOperation(e.currentTarget);
        readyForWritting = true;
      } else {
        equalOperation();
        setOperation(e.currentTarget);
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
    setOperation(null);
    seccondOperand = null;
    displayTheResult(firstOperand);
    readyForWritting = false;
    readyForSign = true;
    dotClicked = true;
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
