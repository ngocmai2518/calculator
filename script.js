const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let arr = [];
let currentValue = 0;
let recentValue;
const display = document.querySelector('.display');

function getValue(number){
  if (countDigit(arr) < 9) {
    arr.push(number)
    console.log(countDigit);
    currentValue = parseFloat(arr.join('')); 
    updateValue();
  };
}

function countDigit(value) {
  if (Array.isArray(value)) {
    return value.join('').replace('.','').length;
  } else if (typeof value === 'number') {
    return value.toString().replace('.','').length;
  }
}

function updateValue() { 
if (typeof currentValue === 'number') {
  display.textContent = currentValue.toLocaleString();
} else {
  display.textContent = currentValue;
}};

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    getValue(number.value);
  })

// add touch support
  number.addEventListener('touchstart', () => {
    getValue(number.value);
  })
});


let currentOperator = undefined;

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    recentValue = currentValue;
    operators.forEach((operator) => {operator.classList.remove('on')});
    currentOperator = operator.textContent
    arr = [];
    operator.classList.add('on');
  })

  // add touch support
  operator.addEventListener('touchstart', () => {
    recentValue = currentValue;
    operators.forEach((operator) => {operator.classList.remove('on')});
    currentOperator = operator.textContent
    arr = [];
    operator.classList.add('on');
  })

})  


function calculate() {
  switch (currentOperator) {
    case '+':
      currentValue = parseFloat(recentValue) + parseFloat(currentValue);
      break;
    case '-':
      currentValue = parseFloat(recentValue) - parseFloat(currentValue);
      break;
    case 'x':
      currentValue = parseFloat(recentValue) * parseFloat(currentValue);
      break;
    case '/':
      if (parseFloat(currentValue) === 0) {
        currentValue = "lma0";
      } else {
        currentValue = parseFloat(recentValue) / parseFloat(currentValue);
      }
      break;
    case '%':
      currentValue = parseFloat(currentValue) / 100;
      break;
  };
  round10Digit();
  updateValue();
  arr = [];
  currentOperator = undefined;
  operators.forEach((operator) => {operator.classList.remove('on')});
}
function round10Digit () {
  let integerCount = Math.floor(Math.abs(currentValue)).toString().length;
  if (integerCount >= 10) {
    currentValue = parseFloat(currentValue.toString().slice(0,6)) / (10**5) + 'e' + (integerCount - 1);
  } else {
    let decimalShown = 10 - integerCount;
    currentValue = Math.round(currentValue * (10 ** decimalShown)) / (10 ** decimalShown);
  }
}

const percentage = document.querySelector('#percentage');
percentage.addEventListener('click', () => {
  currentOperator = '%';
  calculate() 
});
// add touch support
percentage.addEventListener('touchstart', calculate);

const equal = document.querySelector('#equal');
equal.addEventListener('click', calculate);
// add touch support
equal.addEventListener('touchstart', calculate);

const clear = document.querySelector('#C');
clear.addEventListener('click', () => {
  arr = [];
  currentValue = 0;
  updateValue();
})
// add touch support
clear.addEventListener('touchstart', () => {
  arr = [];
  currentValue = 0;
  updateValue();
})


const allClear = document.querySelector('#AC');
allClear.addEventListener('click', () => {
  arr = [];
  currentOperator = undefined;
  operators.forEach((operator) => {operator.classList.remove('on')});
  recentValue = '';
  currentValue = 0;
  updateValue();
})

// add touch support
allClear.addEventListener('touchstart', () => {
  allClear.preventDefault();
  arr = [];
  currentOperator = undefined;
  operators.forEach((operator) => {operator.classList.remove('on')});
  recentValue = '';
  currentValue = 0;
  updateValue();
})


// prevent event twice triggered
const buttons = document.querySelectorAll("button")
buttons.forEach((button) => {
  button.addEventListener('touchstart', (event) => {
    event.preventDefault();
  })
});