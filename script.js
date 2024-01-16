const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let arr = [];
let currentValue = 0;
let recentValue;
const display = document.querySelector('.display');

function getValue(number){
  if (countDigit(arr) < 10) {
    arr.push(number)
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
display.textContent = currentValue;
}

numbers.forEach((number) => {
  number.addEventListener('click', () => {
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
  if (countDigit(currentValue) > 10) {
    currentValue = 'hmmm';
  }
  updateValue();
  arr = [];
  currentOperator = undefined;
  operators.forEach((operator) => {operator.classList.remove('on')});
}

const percentage = document.querySelector('#percentage');
percentage.addEventListener('click', () => {
  currentOperator = '%';
  calculate() 
});

const equal = document.querySelector('#equal');
equal.addEventListener('click', calculate);

const clear = document.querySelector('#C');
clear.addEventListener('click', () => {
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
