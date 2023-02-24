//variables
// creando objeto para almacenar los datos del formulario
const email = {
    email: "",
    asunto: "",
    mensaje: "",
};

// Seleccionar elementos de la interfaz
const inputEmail = document.querySelector("#email");
const inputAsunto = document.querySelector("#asunto");
const inputMensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const cc = document.querySelector("#cc");

// Eventos
document.addEventListener("DOMContentLoaded", function (e) {
    console.log("DOM Cargado");
    //Asignar evento a los campos
    inputEmail.addEventListener("input", validarCampo);
    inputAsunto.addEventListener("input", validarCampo);
    inputMensaje.addEventListener("input", validarCampo);
    cc.addEventListener("input", validarCampo);
    btnEnviar.addEventListener("click", enviarFormulario);
    btnReset.addEventListener("click", resetFormulario);
});

// Funciones

// Valida que el campo tenga algo escrito
function validarCampo(e) {
    //Se valida si es el campo de cc y es valido
    if (
        e.target.id === "cc" &&
        !validarEmail(e.target.value.trim().toLowerCase())
    ) {
        mostrarAlerta(`El campo ${e.target.id} no es valido`, e);
        deshabilitarEnviar();
        return;
    }
    // Se valida la longitud del texto y que no este vacio
    if (e.target.value.trim() !== "") {
        validarEmail(e.target.value);
        cleanAlert(e);
    } else {
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e);
        email[e.target.id] = "";
        comprobarObjeto();
        return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
        mostrarAlerta(`El campo ${e.target.id} no es valido`, e);
        email[e.target.id] = "";
        comprobarObjeto();
        return;
    }
    //asignar al objeto
    email[e.target.id] = e.target.value.trim().toLowerCase();
    //comprobar que el objeto tenga datos
    comprobarObjeto();
}

// Muestra una alerta en caso de que el campo este vacio
function mostrarAlerta(mensaje, e) {
    //comprobar si hay una alerta previa
    const alert = e.target.parentElement.querySelector(".alerta");
    if (alert) {
        alert.remove();
    }
    //crear alerta HTML
    alerta = document.createElement("div");
    alerta.textContent = mensaje;
    alerta.classList.add(
        "alerta",
        "bg-red-600",
        "text-white",
        "p-2",
        "mt-2",
        "text-center",
        "error"
    );
    // Insertar en el DOM
    e.target.parentElement.appendChild(alerta);
}

// Elimina la alerta
function cleanAlert(e) {
    const alert = e.target.parentElement.querySelector(".alerta");
    if (alert) {
        alert.remove();
    }
}

// Valida el email
function validarEmail(valor) {
    const email_regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email_regex.test(valor);
}

// Comprueba que el objeto tenga datos
function comprobarObjeto() {
    if (Object.values(email).includes("")) {
        deshabilitarEnviar();
    } else {
        habilitarEnviar();
    }
}

// Envia el formulario
function enviarFormulario(e) {
    e.preventDefault();
    // Mostrar el spinner
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "flex";
    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = "none";
        spinner.classList.remove("hidden");
        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envio correctamente";
        parrafo.classList.add(
            "text-center",
            "my-10",
            "p-2",
            "bg-green-500",
            "text-white",
            "font-bold",
            "uppercase"
        );
        // Insertar el parrafo
        formulario.appendChild(parrafo);
        setTimeout(() => {
            parrafo.remove();
            resetFormulario(e);
        }, 2000);
    }, 3000);
}

// Resetear el formulario
function resetFormulario(e) {
    e.preventDefault();
    formulario.reset();
    const alertas = document.querySelectorAll(".alerta");
    alertas.forEach((alerta) => alerta.remove());
    cleanObjet();
    deshabilitarEnviar();
}

// Limpiar el objeto
function cleanObjet() {
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
}

// habilitar el boton de enviar
function habilitarEnviar() {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
}

//deshabilitar el boton de enviar
function deshabilitarEnviar() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}
