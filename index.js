var shopTab = document.getElementById("shopTab")
var readingTab = document.getElementById("readingTab")
var read = document.getElementById("read")
var shop = document.getElementById("shop")
var face = document.getElementById("face")
var settingsTab = document.getElementById("settingsTab")
var excelent = ['🤑', '🤩', '😇', '😍', '😎']
var alright = ['😃', '😙', '😋', '😁']
var good = ['😀', '🙂', '🙃', '😉']
var bad = ['😕', '🙁', '😟', '😐']
var terrible = ['☹️', '😖', '😬', '😶']
var deadly = ['🤒', '🤕', '😭', '😑']

function randint(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  


var opened = false;
function openShop(){
    opened = !opened;
    if(opened){
        shopTab.style.opacity = "1";
        shopTab.style.pointerEvents = "all";
        settings.style.zIndex = '-1';

    }else{
        shopTab.style.opacity = "0";
        shopTab.style.pointerEvents = "none";
        settings.style.zIndex = '10000';
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
        settings.style.zIndex = '-1';
    }else{
        settings.style.zIndex = '10000';
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
function checkMood(){
    var v = hunger.value;
    if(v >= 90 && v <= 100){
        face.innerHTML = excelent[randint(0, 4)];
    }
    else if(v >= 70 && v < 90){
        face.innerHTML = alright[randint(0, 3)];
    }
    else if(v >= 50 && v < 70){
        face.innerHTML = good[randint(0, 3)];
    }
    else if(v >= 30 && v < 50){
        face.innerHTML = bad[randint(0, 3)];
    }
    else if(v >= 10 && v < 30){
        face.innerHTML = terrible[randint(0, 3)];
    }
    else if(v >= 1 && v < 10){
        face.innerHTML = deadly[randint(0, 3)];
    }
    else{
        document.getElementById('hunger').remove()
        document.getElementById('shop').remove()
        document.getElementById('read').remove()
        document.getElementById('money').remove()
        document.getElementById('settings').remove()
        face.innerHTML = '💀'
        setTimeout(die, 2000)
    }
}

function eat(cost, emoji){
    if(bank >= cost){
        if(hunger.value+cost<=100){
            hunger.value += cost;
            localStorage.setItem('hunger', hunger.value)
            bank-=cost;
            localStorage.setItem('bank', bank)
            money.innerHTML = "💵"+bank;
            checkMood()
            openShop();
            var obj = document.createElement('div')
            obj.setAttribute('class', 'float')
            obj.innerHTML = emoji
            document.body.append(obj)
            obj.addEventListener("animationend", function() {
                obj.remove();
              });
        }else{
            hunger.value = 100;
            localStorage.setItem('hunger', hunger.value)
            bank-=cost;
            localStorage.setItem('bank', bank)
            money.innerHTML = "💵"+bank;
            checkMood()
            openShop();
            var obj = document.createElement('div')
            obj.setAttribute('class', 'float')
            obj.innerHTML = emoji
            document.body.append(obj)
            obj.addEventListener("animationend", function() {
                obj.remove();
              });
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

if(localStorage.getItem('hunger') != null){
    hunger.value = parseInt(localStorage.getItem('hunger'));   
}


var currentDate, startOfYear, timeDiff, hours;
currentDate = new Date();startOfYear = new Date(currentDate.getFullYear(), 0, 1);timeDiff = currentDate - startOfYear;hours = timeDiff / 1000/60/60; 
if(localStorage.getItem('lastTime') != null){
    lastTime = localStorage.getItem('lastTime');
    //console.log(hours - lastTime) time absent
    for(var i = floorHalf(hours); i>floorHalf(lastTime); i-=0.5){
        hunger.value -= 1;
        localStorage.setItem('hunger', hunger.value)
    }
}
var nextTime = floorHalf(hours)+0.5;

sett();
var lastTime = 0;
function sett (){
    currentDate = new Date();
    startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    timeDiff = currentDate - startOfYear;
    hours = timeDiff / 1000 /60 /60; 
    localStorage.setItem('lastTime', hours)
    setTimeout(sett, 5000)
    if(hours >= nextTime){
        hunger.value -= 1;
        checkMood()
        localStorage.setItem('hunger', hunger.value)
        nextTime = floorHalf(hours)+0.5;
    }
}


/*document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyE') {
        hunger.value -= 10;
        checkMood()
        localStorage.setItem('hunger', hunger.value)
    }
});*/

function floorHalf(number) {
    return Math.floor(number * 2) / 2;
  }

  function roundHalf(number) {
    return Math.round(number * 2) / 2;
  }


  checkMood()

/*function minus(){
    hunger.value -= 10;
        checkMood()
        localStorage.setItem('hunger', hunger.value)
}*/

function die(){
    document.getElementById('face').remove()
    document.body.style.backgroundColor = '#96e1f6';
    document.body.innerHTML += '<div id="grave">🪦</div><div id="grass"></div><div id="reborn" onclick="reborn()">Reborn</div>';
    document.getElementById('name').style.top = '7%';
    document.getElementById('name').style.zIndex = '10';
}

function reborn(){
    localStorage.clear()
    location.reload()
}


var opened = false
function openSettings(){
    opened = !opened;
    if(opened){
        settingsTab.style.opacity = "1";
        settingsTab.style.pointerEvents = "all";
    }else{
        settingsTab.style.opacity = "0";
        settingsTab.style.pointerEvents = "none";
    }
}


if(localStorage.getItem('name') != null){
    document.getElementById('name').innerHTML = localStorage.getItem('name')
}else{
    document.getElementById('name').innerHTML = 'No name'
}
var nameField = document.getElementById('nameField')
function changeName(){
    localStorage.setItem('name', nameField.value)
    document.getElementById('name').innerHTML = localStorage.getItem('name')
}
