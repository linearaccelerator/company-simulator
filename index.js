function byId(id){
    return document.getElementById(id)
}
function byClass(class_){
    return document.getElementsByClassName(class_);
}

let money = 1000;
let upgrades = {
    "workers": 0,
    "workerCost": 500,
    "workerEffect": 0,
    "workerExpense": 0,
    "overseers": 0,
    "overseerCost": 2000,
    "overseerEffect": 0,
    "overseerExpense": 0
}

let improvements = {
    "workerCost": 1,
    "workerEffect": 0,
    "overseerCost": 5000,
    "overseerEffect": 1
}

function buy(upgradeID){
    switch(upgradeID){
        case "u1":
            if(money < upgrades.workerCost) break;
            money -= upgrades.workerCost;
            upgrades.workers++;
            upgrades.workerCost *= 1.02;
            upgrades.workerEffect += 5;
            upgrades.workerExpense += 2;
            break;
        case "u2":
            if(money < upgrades.overseerCost) break;
            money -= upgrades.overseerCost;
            upgrades.overseers++;
            upgrades.overseerCost *= 1.03;
            upgrades.overseerEffect += 40;
            upgrades.overseerExpense += 10;
            break;
        case "i1":
            if(money < improvements.workerCost) break;
            money -= improvements.workerCost;
            improvements.workerCost *= 10;
            improvements.workerEffect += 50;
            break;
        case "i2":
            if(money < improvements.overseerCost) break;
            money -= improvements.overseerCost;
            improvements.overseerCost *= 2.5;
            improvements.overseerEffect *= 0.99;
            break;
    }
}

function expenseCalc(){
    return ((taxesCalc() * (improvements.overseerEffect - (upgrades.overseers / 100)) + upgrades.workerExpense + upgrades.overseerExpense)) / 60
}

function moneyCalc(){
    return (upgrades.workerEffect * (1 + (improvements.workerEffect / 100)) + upgrades.overseerEffect) / 60;
}

function taxesCalc(){
    if(money <= 1) return 0;
    else return 1 + (Math.log(money) / 8) * (1 + (money / 1000))
}

setInterval(() => {
    byId("worker-expense-amount").innerHTML = upgrades.workerExpense;
    byId("overseer-expense-amount").innerHTML = upgrades.overseerExpense;
    byId("taxes-expense-amount").innerHTML = taxesCalc().toFixed(2);
    byId("disp").innerHTML = `$${money.toFixed(2)}`
    byId("worker-button").innerText = `Buy a worker\nCost: $${upgrades.workerCost.toFixed(2)}`
    byId("overseer-button").innerText = `Buy an overseer\nCost: $${upgrades.overseerCost.toFixed(2)}`
    byId("worker-improve-1").innerText = `Improve worker speed by 50%\nCost: $${improvements.workerCost.toFixed(2)}`
    byId("overseer-improve-1").innerText = `Overseers reduce taxes by +1%/overseer\nCost: $${improvements.overseerCost.toFixed(2)}`
    money += moneyCalc();
    money -= expenseCalc();
}, 16.666666667);