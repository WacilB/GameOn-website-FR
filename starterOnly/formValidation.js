// Dom Elements

const inputs = document.querySelectorAll(
  "input[type=text], input[type=number], input[type=email], input[type=date]"
);
const radio = document.querySelectorAll("input[type=radio]");
const form = document.getElementById("form");
let first, last, email, date, quantity, locations, nextEvenement;

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
const firstChecker = (value) => {
  if (value.length > 1 && value.length < 3) {
    errorDisplay("first", "Le prénom doit contenir 2 caractères");
    first = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractère spéciaux"
    );
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};
const lastChecker = (value) => {
  if (value.length > 1 && value.length < 3) {
    errorDisplay("last", "Le nom doit contenir 2 caractères");
    last = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("last", "Le nom ne doit pas contenir de caractère spéciaux");
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};
const dateChecker = (value) => {

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };
  if(!value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)|| value == ""||value =="jj/mm/aaaa"){
    errorDisplay("date", "Veuillez renseignez votre date de naissance")
    date = null
  }else{
    let parseDate = dateParser(value);
    date = parseDate;
    errorDisplay("date", "", true);
  }
};

const quantityChecker = (value) => {
  if (value == "") {
    errorDisplay(
      "quantity",
      "Vous devez renseigner le nombres de concours auxquelles vous avez participez "
    );
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};
const radioChecker = () => {
  for(const radioButton of radio){
    if(radioButton.checked){
      locations = radioButton.value
      break
    }
  }
  if(locations == null){
    errorDisplay("location", "Vous devez selectionner un tournois")
    locations = null;
  }
};
const checkboxChecker =()=>{
  if(!checkbox1.checked){
    errorDisplay("checkbox", "Vous devez accepter les conditions d'utilisation")
  }else{
    errorDisplay("checkbox","", true)
  }
  if(!checkbox2.checked){
    nextEvenement = false;
  }else{
    nextEvenement =true;
  }
}

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

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  radioChecker()
  checkboxChecker()
  if(first && last && email && date && quantity && locations){
    const data = {
      first,
      last,
      email,
      date,
      quantity,
      locations,
      nextEvenement,
    }
    console.log(data);
    alert("Inscription validé")
  }else{
    alert("Erreur d'inscription")
  }
})