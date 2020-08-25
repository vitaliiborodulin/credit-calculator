/* Значения из текстовых инпутов */
const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creditTerm = document.getElementById('credit-term');

/* Значения из range инпутов */
const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range');

/* Все number input */
const inputsNumber = document.querySelectorAll('input[type="number"]');  

/* Все range */
const inputsRange = document.querySelectorAll('.input-range');

/* Все кнопки процентов */
const bankBtns = document.querySelectorAll('.bank');

/* Итоговые значения */
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income');

/* Пересчет для number inputs */
for (number of inputsNumber){
    number.addEventListener('change', () => {
        totalCostRange.value = totalCost.value;
        anInitialFeeRange.value = anInitialFee.value;
        creditTermRange.value = creditTerm.value;
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

/* Поработал с ranges */
const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

assignValue();

for (range of inputsRange) {
    range.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

/* Поработал с процентной ставкой */
const banks = [{
        name: 'alfa',
        percent: 8.7
    },
    {
        name: 'sberbank',
        percent: 8.4
    },
    {
        name: 'pochta',
        percent: 7.9
    },
    {
        name: 'tinkoff',
        percent: 9.2
    }
]

let currentPercent = banks[0].percent;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

const takeActiveBank = activeBank => {
    const dataAttrValue = activeBank.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPercent = currentBank.percent;
}

/* Рассчет кредита */
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /* 
        ЕП - ежемесячный платеж; 
        РК - размер кредита; 
        ПС - процентная ставка; 
        КМ - количество месяцев

        ЕП = (РК + (((РК / 100) * ПС) / 12 ) * КМ) / КМ
    */
    
    let lounAmount = totalCost - anInitialFee //РК - размер кредита
    let interestRate = currentPercent; //ПС - процентная ставка
    let numberOfMonths = creditTerm * 12; //КМ - количество месяцев

    let monthlyPayment = (lounAmount + ((((lounAmount / 100) * interestRate) / 12) * numberOfMonths)) / numberOfMonths; //ЕП - ежемесячный платеж
    let monthlyPaymentArounded = Math.round(monthlyPayment);

    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} руб.`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} руб.`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + (monthlyPaymentArounded / 100) * 35} руб.`; //+35%
    }
}




