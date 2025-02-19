const numberBtnsArray = [...document.querySelectorAll(".number")];
const display = document.querySelector("#display");
const plusToMinus = document.querySelector("#plusToMinus");
const operationBtnsArray = [...document.querySelectorAll(".operation")];

let readyForWritting = true;
let readyForSign = false;
let firstOperand = null;
let seccondOperand = null;
let lastOperation = null;

numberBtnsArray.forEach((numberBtn) => {
  numberBtn.addEventListener("click", clickedNumber);
});

operationBtnsArray.forEach((operationBtn)=>{
    operationBtn.addEventListener("click",clickedOperation);
})

plusToMinus.addEventListener("click", () => {
  if(firstOperand===null||seccondOperand!=null)
  if (display.textContent.length) {
    if (display.textContent[0] != "-") {
      display.textContent = "-" + display.textContent;
    } else {
      display.textContent = display.textContent.slice(1);
    }
  }
});

function clickedNumber(e) {
  if (readyForWritting) {
    addNumber(e.currentTarget.textContent);
  }
}

function addNumber(number) {
  if(seccondOperand===null&&firstOperand!==null&&lastOperation!==null){
    display.textContent="";
  }  

  if (display.textContent.length >= 9) readyForWritting = false;
  else {
    display.textContent += number;
    display.textContent = +display.textContent;
    readyForSign = true;
    if(firstOperand!==null){
        seccondOperand = +display.textContent;
    }
  }
}

function clickedOperation(e){
    if(readyForSign){
        if(!lastOperation){
            lastOperation = e.currentTarget;
            firstOperand = +display.textContent;
        } else{
            if(seccondOperand===null){
                lastOperation = e.currentTarget;
            }else{
                //do last operation
                //result from last operation set for firstOperand
                //set the new last operation
                //clear the seccond operand

                //equal operation
            }
        }
    }
}

