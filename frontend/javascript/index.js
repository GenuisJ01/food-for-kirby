// Main javascript file for all behaviour in index.html

const popup = document.getElementById("topicsPopUp");
const popup2 = document.getElementById("instructions");
const topicsButton = document.getElementById ("topicsCovered");
const okButton = document.getElementById ("OK");
const helpButton = document.getElementById ("helpfulKirby");
const readyButton = document.getElementById ("ready");
const studentProfile = document.getElementById ("studentProfile");
const liveNumber = document.getElementById ("liveNumber");
const romeScore = document.getElementById ("romeScore");
const renaissanceScore = document.getElementById ("renaissanceScore");
const ww1Score = document.getElementById ("ww1Score");
const ww2Score = document.getElementById ("ww2Score");
const medicineScore = document.getElementById ("medicineScore");

topicsButton.addEventListener ('click', openPopup);
okButton.addEventListener('click', closePopup);
helpButton.addEventListener ('click', openPopup2);
readyButton.addEventListener ('click', closePopup2);

getProfile();


function openPopup(){

    if (popup.classList.length < 2){
        popup.classList.add("open-popup");
    } else {
        popup.classList.remove("open-popup");
    }
}

function closePopup (){
    popup.classList.remove("open-popup");
}


function openPopup2(){
    if (popup.classList.length < 2){
        popup2.classList.add("open-popup2"); 
    } else {
        popup2.classList.remove("open-popup2");
    }
}

function closePopup2 (){
    popup2.classList.remove("open-popup2");
}

async function getProfile (){
  let profileID = Math.floor(Math.random()*6) + 1
  const response = await fetch (`http://localhost:3000/profiles/${profileID}`);
  const profile = await response.json() 
  studentProfile.innerHTML = `<p>${profile.username}</p>`

  romeScore.textContent = profile.rome
  renaissanceScore.textContent = profile.renaissance
  ww1Score.textContent = profile.ww1
  ww2Score.textContent = profile.ww2
  medicineScore.textContent = profile.medicine
  liveNumber.textContent = profile.lives
}

