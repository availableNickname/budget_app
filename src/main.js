'use strict'
let startBtn = document.getElementById('start'),
    //итоговые значения, справа
    budget_value = document.getElementsByClassName('budget-value')[0],
    dayBudget_value = document.getElementsByClassName('daybudget-value')[0],
    level_value = document.getElementsByClassName('level-value')[0],
    expenses_value = document.getElementsByClassName('expenses-value')[0],
    optionalExpenses_value = document.getElementsByClassName('optionalexpenses-value')[0],
    income_value = document.getElementsByClassName('income-value')[0],
    monthSavings_value = document.getElementsByClassName('monthsavings-value')[0],
    yearSavings_value = document.getElementsByClassName('yearsavings-value')[0],
    //4 инпута обязательных расходов
    important_expenses = document.getElementsByClassName('expenses-item'),
    //первая кнопка Утвердить
    expenses_btn = document.getElementsByTagName('button')[0],
    //3 инпута необязательных расходов
    optionalExpenses_input = document.querySelectorAll('.optionalexpenses-item'),
    //вторая кнопка Утвердить
    optionalExpenses_btn = document.getElementsByTagName('button')[1],
    //кнопка Рассчитать дневной бюджет
    count_btn = document.getElementsByTagName('button')[2],
    //инпут статей возможного дохода через запятую
    incomeItem = document.querySelector('#income'),
    //чекбокс
    savings_checkbox = document.querySelector('#savings'),
    //инпут суммы накопления
    savings_sum_value = document.querySelector('#sum'),
    //инпут процентной ставки по накоплениям
    savings_percent_value = document.querySelector('#percent'),
    //год
    yearValue = document.querySelector('.year-value'),
    //месяц
    monthValue = document.querySelector('.month-value'),
    //день
    dayValue = document.querySelector('.day-value');

let money, time;

startBtn.addEventListener('click', function (){
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');
    while (isNaN(money) || money == "" || money == null){
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    expenses_btn.disabled = "";
    optionalExpenses_btn.disabled = "";
    count_btn.disabled = "";
    appData.budget = money;
    appData.timeData = time;
    budget_value.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() +1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expenses_btn.addEventListener('click', function (){
    let sum = 0;
    for (let i = 0; i < important_expenses.length; i++) {
        let a = important_expenses[i].value,
            b = important_expenses[++i].value;
        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b; //унарный плюс для перевода string в number
        } else {
            console.log('bad result');
            i--;
        }
    }
    expenses_value.textContent = sum;
})

optionalExpenses_btn.addEventListener("click", function (){
    for (let i = 0; i < optionalExpenses_input.length; i++) {
        let OptExpenses = optionalExpenses_input[i].value;
        appData.optionalExpenses[i] = OptExpenses;
        optionalExpenses_value.textContent += appData.optionalExpenses[i] + ' ';
    }
})

count_btn.addEventListener("click", function (){
    if(appData.budget != undefined){
        //выводит бюджет на один день
        appData.moneyPerDay = ((appData.budget - expenses_value.textContent) / 30).toFixed();
        dayBudget_value.textContent = appData.moneyPerDay;
        //исходя из дневного бюджета показывает уровень дохода и выводит
        if (appData.moneyPerDay < 100) {
            level_value.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level_value.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            level_value.textContent = 'Высокий уровень достатка';
        } else {
            level_value.textContent = 'Упс, что пошло не так...';
        }
    } else {
        dayBudget_value.textContent = 'Ошибочка...';
    }
});

incomeItem.addEventListener('input', function (){
    let items = incomeItem.value; //создал переменную для хранения введенной инфы
        appData.income = items.split(",  "); //добавил разделитель и пробел
        income_value.textContent = appData.income; //вывел в основной блок справа
});

savings_checkbox.addEventListener("click", function (){
    /* изначально чекбокс должен быть со значением false (т.е. отжат), если мы его нажимаем то
    присваивается значение true и появляется галочка, и наоборот */
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

savings_sum_value.addEventListener('input', function (){
   if(appData.savings == true) {
       /* создаем переменные для того, чтобы они следили за вводом данных в инпуты */
        let sum = +savings_sum_value.value,
            percent = +savings_percent_value.value;
       appData.monthIncome = sum / 100 / 12 * percent; //расчет на 1 месяц
       appData.yearIncome = sum / 100 * percent; //расчет на год

       monthSavings_value.textContent = appData.monthIncome.toFixed(1);
       yearSavings_value.textContent = appData.yearIncome.toFixed(2);
   }
});
savings_percent_value.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +savings_sum_value.value,
            percent = +savings_percent_value.value;
        appData.monthIncome = sum / 100 / 12 * percent; //расчет на 1 месяц
        appData.yearIncome = sum / 100 * percent; //расчет на год

        monthSavings_value.textContent = appData.monthIncome.toFixed(1);
        yearSavings_value.textContent = appData.yearIncome.toFixed(2);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}
