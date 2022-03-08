// Déclaration des variables 

const inputs = document.querySelectorAll(
  "input[type=text], input[type=number], input[type=email], input[type=date], input[type=checkbox]"
);
const radio = document.querySelectorAll("input[type=radio]");
const form = document.getElementById("form");
const modal = document.querySelector(".modal-body");
let first, last, email, date, quantity, locations, termOfUse, nextEvenement;

// Fonction permettant d'afficher les messages d'erreurs lorsqu'un champ du formulaire est mal renseigné

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(".formData-" + tag);
  const span = document.querySelector(".formData-" + tag + " > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

//Fonction permettant de vérifier le champ 'Prénom'

const firstChecker = (value) => {
  if (value.length < 2) {
    errorDisplay(
      "first",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};

//Fonction permettant de vérifier le champ 'Nom'

const lastChecker = (value) => {
  if (value.length < 2) {
    errorDisplay(
      "last",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

//Fonction permettant de vérifier le champ 'Email'

const emailChecker = (value) => {
  if (!value.match(/^[\w_\-.]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Veuillez entrer une adresse email valide.");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

//Fonction permettant de vérifier le champ 'Date'

const dateChecker = (value) => {
  //Fonction permettant d'harmoniser le format de la date afin de
  // pouvoir stocker les différentes dates des utilisateurs dans le même format
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };
  if (
    !value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ||
    value == "" ||
    value == "jj/mm/aaaa"
  ) {
    errorDisplay("date", "Veuillez renseigner votre date de naissance");
    date = null;
  } else {
    let parseDate = dateParser(value);
    date = parseDate;
    errorDisplay("date", "", true);
  }
};

//Fonction permettant de vérifier le champ 'Nombre de tournois'

const quantityChecker = (value) => {
  if (value == "" || isNaN(value)) {
    errorDisplay(
      "quantity",
      "Vous devez renseigner le nombre de concours auquel vous avez participé "
    );
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};

//Fonction permettant de vérifier le champ 'Ville sélectionnée'

const radioChecker = () => {
  for (const radioButton of radio) {
    if (radioButton.checked) {
      locations = radioButton.value;
      break;
    }
  }
  if (locations == null) {
    errorDisplay("location", "Vous devez sélectionner un tournoi");
    locations = null;
  }
};
// Fonction permettant de vérifier le champ si les checkbox "Condition d'utilisation"
// ainsi que "Prochains tournois" sont coché ou non
const checkboxChecker = () => {
  if (!checkbox1.checked) {
    errorDisplay(
      "checkbox",
      "Vous devez accepter les conditions d'utilisation"
    );
    termOfUse = null;
  } else {
    errorDisplay("checkbox", "", true);
    termOfUse = true;
  }
  if (!checkbox2.checked) {
    nextEvenement = false;
  } else {
    nextEvenement = true;
  }
};

//Déclaration des fonctions de vérification des différents champs relatifs aux inputs ci-dessous

inputs.forEach((inputs) => {
  inputs.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "date":
        dateChecker(e.target.value);
        break;
      case "quantity":
        quantityChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});


// Événement lors du click sur le bouton "Submit" du formulaire
//Stockage des données utilisateur sous forme de tableaux , affichage d'un message de validation ou d'erreur
//Déclaration des fonctions de vérification des boutons radio et des checkbox 

form.addEventListener("submit", (e) => {
  e.preventDefault();
  radioChecker();
  checkboxChecker();
  if (first && last && email && date && quantity && locations && termOfUse) {
    const data = {
      first,
      last,
      email,
      date,
      quantity,
      locations,
      nextEvenement,
    };
    console.log(data);
    inputs.forEach((input) => (input.value = ""));
    for (const radioButton of radio) {
      radioButton.checked = false;
    }
    first = null;
    last = null;
    email = null;
    date = null;
    quantity = null;
    locations = null;
    nextEvenement = null;
    modal.innerHTML = "<div class='modal__finish'> <h3>Merci pour votre inscription</h3></div>"
  } else {
    alert("Erreur d'inscription");
  }
});

