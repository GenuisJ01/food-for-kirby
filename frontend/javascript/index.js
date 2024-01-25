// Main javascript file for all behaviour in index.html

const popup = document.getElementById("topicsPopUp");
const popup2 = document.getElementById("instructions");

function openPopup(){
    popup.classlist.add("open-popup");
}

function closePopup(){
    popup.classlist.remove("open-popup");
}

function openPopup2(){
    popup.classlist.add("open-popup2");
}

function closePopup2(){
    popup.classlist.remove("open-popup2");
}
