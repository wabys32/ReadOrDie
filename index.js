var shopTab = document.getElementById("shopTab")
var readingTab = document.getElementById("readingTab")
var read = document.getElementById("read")
var shop = document.getElementById("shop")

var opened = false;
function openShop(){
    opened = !opened;
    if(opened){
        shopTab.style.opacity = "1";
        shopTab.style.pointerEvents = "all";

    }else{
        shopTab.style.opacity = "0";
        shopTab.style.pointerEvents = "none";

    }
}

var opened2 = false;
function openReadingTab(){
    opened2 = !opened2;
    if(opened2){
        readingTab.style.opacity = "1";
        readingTab.style.pointerEvents = "all";
        read.style.zIndex = "1"
        shop.style.zIndex = "-1";
    }else{
        readingTab.style.opacity = "0";
        readingTab.style.pointerEvents = "none";
        shop.style.removeProperty('z-index');
        read.style.removeProperty('z-index');
    }
}



var numbers = document.getElementById('numbers');
for (let i = 1; i <= 120; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i;
  numbers.appendChild(option);
}
numbers.value = 10;

var money = document.getElementById('money');
var bank = 0;
if(localStorage.getItem('bank') != null){
    bank = parseInt(localStorage.getItem('bank'))
    money.innerHTML = "💵"+bank;
}
function addMoney(){
    bank+=parseInt(numbers.value);
    numbers.value = 10;
    localStorage.setItem('bank', bank);
    money.innerHTML = "💵"+bank;
    openReadingTab()
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyE') {
        localStorage.clear()
    }
});


var hunger = document.getElementById('hunger');
function eat(cost){
    if(bank >= cost){
        if(hunger.value+cost<=100){
            hunger.value += cost;
            bank-=cost;
            localStorage.setItem('bank', bank)
            money.innerHTML = "💵"+bank;
            openShop();
        }else{
            hunger.value = 100;
            bank-=cost;
            localStorage.setItem('bank', bank)
            money.innerHTML = "💵"+bank;
            openShop();
        }
    }
}




/*console.log(localStorage.getItem('sec'))
function update(){
    var currentDate = new Date();
    localStorage.setItem('sec', currentDate.getSeconds())
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)*/



const currentDate = new Date();
const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
const timeDiff = currentDate - startOfYear;
const hours = timeDiff / 1000 / 60 / 60; 

var lastTimeHours = 0;
if(localStorage.getItem('lastTime') != null){
    lastTimeHours = localStorage.getItem('lastTime');
    console.log('Last time was: '+lastTimeHours)
}

for(var i = roundToNearestHalf(hours); i > lastTimeHours; i--){
    if(i%0.5 == 0){
        hunger.vlaue -= 10;
    }
}

function setLastTime(){
    localStorage.setItem('lastTime', roundToNearestHalf(hours))
    console.log('Last time is set to: ' +localStorage.getItem('lastTime'))
    setTimeout(setLastTime, 5000)
}setLastTime()



function roundToNearestHalf(number) {
    return Math.round(number * 2) / 2;
}
