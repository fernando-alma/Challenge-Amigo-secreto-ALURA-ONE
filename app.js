// Conjunto para almacenar los nombres sin permitir duplicados
let listaDeAmigos = new Set();
let sorteoRealizado = false; // Controla si el sorteo ya se ha realizado

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) elementoHTML.textContent = texto; // Usamos textContent por seguridad
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    if (sorteoRealizado) {
        alert("El sorteo ya se realizó. Reinicia para agregar nuevos amigos.");
        return;
    }

    let nombresDeUsuario = document.getElementById("amigo");
    let nombre = nombresDeUsuario.value.trim(); // Eliminamos espacios innecesarios

    // Expresión regular para validar nombres (mínimo 3 letras, sin números ni símbolos)
    let validar = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}$/;
    if (!validar.test(nombre)) {
        alert("Debes ingresar un nombre válido con al menos 3 letras, sin números ni símbolos.");
        return;
    }

    let formatoDeNombre = nombre.toLowerCase(); // Convertimos a minúsculas para evitar duplicados
    if (listaDeAmigos.has(formatoDeNombre)) {
        alert("Este nombre ya ha sido ingresado.");
        return;
    }

    listaDeAmigos.add(formatoDeNombre); // Agregamos al conjunto
    nombresDeUsuario.value = ""; // Limpiamos el campo de entrada

    actualizarLista();
}

// Función para actualizar la lista de amigos en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiamos la lista antes de actualizar

    if (listaDeAmigos.size > 0) {
        lista.style.display = "grid"; // Mostramos la lista si hay elementos
        listaDeAmigos.forEach(amigo => {
            let li = document.createElement("li");
            li.textContent = amigo;
            lista.appendChild(li);
        });
    } else {
        lista.style.display = "none"; // Ocultamos la lista si está vacía
    }
}

// Función para realizar el sorteo
function sortearAmigo() {
    if (listaDeAmigos.size < 2) {
        alert("Debes ingresar al menos dos nombres para realizar el sorteo.");
        return;
    }

    let listaArray = Array.from(listaDeAmigos); // Convertimos el Set en un Array
    let amigoSeleccionado = listaArray[Math.floor(Math.random() * listaArray.length)]; // Elegimos un nombre aleatorio

    listaDeAmigos.clear(); // Limpiamos la lista después del sorteo
    actualizarLista();

    asignarTextoElemento("h2", `El amigo secreto es: ${amigoSeleccionado}`);
    sorteoRealizado = true; // Marcamos el sorteo como realizado
}

// Función para reiniciar el juego y limpiar la interfaz
function reiniciarJuego() {
    listaDeAmigos.clear(); // Eliminamos todos los nombres almacenados
    sorteoRealizado = false; // Restablecemos la variable de control

    document.getElementById("listaAmigos").innerHTML = ""; // Vaciamos la lista en pantalla
    asignarTextoElemento("h2", ""); // Eliminamos el mensaje del sorteo
    document.getElementById("amigo").value = ""; // Limpiamos el campo de entrada
}
