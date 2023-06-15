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