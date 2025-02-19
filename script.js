const numberBtnsArray = [...document.querySelectorAll(".number")];
const display = document.querySelector("#display");
const plusToMinus = document.querySelector("#plusToMinus");

let readyForWritting = true;
let readyForSign = false;
let firstOperand = null;

numberBtnsArray.forEach((numberBtn) => {
  numberBtn.addEventListener("click", clickedNumber);
});

plusToMinus.addEventListener("click", () => {
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
  if (display.textContent.length >= 9) readyForWritting = false;
  else {
    display.textContent += number;
    display.textContent = +display.textContent;
    readyForSign = true;
  }
}
