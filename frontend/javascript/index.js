// Main javascript file for all behaviour in index.html

const popup = document.getElementById("topicsPopUp");


function openPopup(){
    popup.classlist.add("open-popup");
}

function closePopup(){
    popup.classlist.remove("open-popup");
}


