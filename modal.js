//Fonction permettant de rajouter la classe Css responsive au menu
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Déclaration des variables
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.getElementsByClassName("close");

//  Événement lancer la fenêtre modale du formulaire lorsque le bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour ouvrir la fenêtre modale du formulaire
function launchModal() {
  modalbg.style.display = "block";
}

//  Événement fermer la fenêtre modale du formulaire lorsque le bouton est cliqué
closeModalBtn[0].addEventListener("click", closeModal);

// Fonction pour fermer la fenêtre modale du formulaire
function closeModal() {
  modalbg.style.display = "none";
}
