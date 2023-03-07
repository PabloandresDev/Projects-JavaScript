// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

//Event Listeners

eventListeners();

function eventListeners() {
  addEventListener("DOMContentLoaded", validarLocalStorage());
  formulario.addEventListener("submit", agregarTweet);
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();
  // Textarea donde el usuario escribe
  const texto = document.querySelector("#tweet").value;
  // validacion que contenga algo en el textarea
  if (texto === "") {
    agregarAlerta();
  } else {
    agregarTweets(texto);
  }
}

function agregarAlerta() {
  const alert = document.createElement("p");
  alert.textContent =
    "No se puede agregar tweet vacio, por favor ingresa datos en el campo";
  const row = document.querySelector("#contenido");
  row.appendChild(alert);
  eliminarAlerta(alert);
}

function eliminarAlerta(alert) {
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function agregarTweets(texto) {
  const tweetObj = {
    id: Date.now(),
    tweet: texto,
  };
  tweets = [...tweets, tweetObj];
  generarHtml();
}

function generarHtml() {
  borrarHtml();
  tweets.forEach((element) => {
    //console.log(element);
    const btnEliminar = document.createElement("a");
    btnEliminar.classList.add("borrar-tweet");
    btnEliminar.textContent = "X";

    const tweetHtml = document.createElement("li");
    tweetHtml.textContent = element.tweet;
    tweetHtml.appendChild(btnEliminar);

    listaTweets.appendChild(tweetHtml);
    formulario.reset();
    almacenarLocalStorage();
    //revisar si se hace click en el boton creado ya que no se puede con una variable global
    btnEliminar.onclick = () => {
      borrarTweet(element.id);
    };
  });
}

function borrarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function almacenarLocalStorage() {
  const tweetLocalStorage = JSON.stringify(tweets);
  localStorage.setItem("tweet", tweetLocalStorage);
}

function validarLocalStorage() {
  const localTweet = JSON.parse(localStorage.getItem("tweet"));
  if (localTweet) {
    tweets = localTweet;
    generarHtml();
  }
  // else{
  //     console.log("no hay anda en localstorage")
  // }
}
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  generarHtml();
}
