// inputs 
const billInput             = document.querySelector(".calculator-section__bill-input"),
      customPercentageInput = document.querySelector(".calculator-section__custom-amount"),
      peopleAmountInput     = document.querySelector(".calculator-section__people-amount-input"),
// btns
      percentageBtns        = document.querySelectorAll(".calculator-section__btn"),
      resetBtn              = document.querySelector(".result-section__reset-btn"),
// result value      
      tipAmountValue        = document.querySelector(".result-section__tip-amount-value"),
      totalAmountValue      = document.querySelector(".result-section__total-amount-value"),
// error      
      peopleError           = document.querySelector(".calculator-section__people-amount-error");

let billNumber   = parseInt(billInput.value);
let peopleNumber = parseInt(peopleAmountInput.value);
let tipValue     = 0;

percentageBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    //Cambiar color
    //La 1er parte de esta funcion me permite eliminar la clase a los otros botones, para evitar que se marque mas de uno con la clase selected-btn
    removeActive();
    button.classList.add("selected-btn");
    tipValue = parseInt(e.target.innerText.slice(0, -1));

    calculateTip();
  });
});

const removeActive = () => {
  percentageBtns.forEach((element) => {
    element.classList.remove("selected-btn");
  });
};

// Actualizando bill
billInput.addEventListener("input", () => {
  billNumber = parseFloat(billInput.value);
    calculateTip();
});

// Actualizando custom
customPercentageInput.addEventListener("click", () => {
  removeActive();
});

customPercentageInput.addEventListener("input", () => {
  tipValue = parseInt(customPercentageInput.value);
  if (!isNaN(tipValue)) {
    calculateTip();
  }
});

// Actualizando personas
peopleAmountInput.addEventListener("input", () => {
  peopleNumber = parseFloat(peopleAmountInput.value);

  if (peopleNumber == 0 || isNaN(peopleNumber)) {
    peopleAmountInput.classList.add("input-error");
    peopleError.style.opacity = 1;
  } else {
    peopleAmountInput.classList.remove("input-error");
    peopleError.style.opacity = 0;
    calculateTip();
  }
});

// Reset BTN
resetBtn.addEventListener("click", () => {
  billInput.value = 0;
  billNumber = 0;
  peopleAmountInput.value = 0;
  peopleNumber = 1;
  customPercentageInput.value = "";
  calculateTip();
});

const calculateTip = () => {
  //Calculo - tip amount
  tipAmountValue.innerText = `$${((billNumber * tipValue) / 100 / peopleNumber).toFixed(2)}`;

  // Calculo - total amount
  totalAmountValue.innerText = `$${(((billNumber * tipValue / 100) + billNumber) / peopleNumber).toFixed(2)
}`};
