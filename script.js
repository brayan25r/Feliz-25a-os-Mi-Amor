document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("carta").style.display = "none"; 
    document.getElementById("overlay").style.display = "none"; 

  

    document.getElementById("desbloquear").addEventListener("click", function() {
        let candado = document.getElementById("candado");
        candado.classList.add("abierto"); 
        setTimeout(() => {
            candado.src = "imagenes/candado_abierto.png"; 
            candado.classList.remove("abierto");
        }, 500);
    });
});

// Funciones para manejar la carta
function abrirCarta() {
    document.getElementById("carta").style.display = "block"; // Muestra la carta
    document.getElementById("overlay").style.display = "block"; // Activa el fondo oscuro
}

function cerrarCarta() {
    document.getElementById("carta").style.display = "none"; // Oculta la carta
    document.getElementById("overlay").style.display = "none"; // Oculta el fondo oscuro
}


const preguntas = [
    { pregunta: "1) ¿Dónde fue nuestra primera salida en pandemia?", opciones: ["Un parque", "Una crepería", "Un cine", "Una biblioteca"], respuestaCorrecta: "Una crepería" },
    { pregunta: "2) ¿Qué decía el postre con el que te pedí que fueras mi enamorada?", opciones: ["Te amo", "¿Quieres ser mi enamorada?", "Eres mi todo", "Siempre juntos"], respuestaCorrecta: "¿Quieres ser mi enamorada?" },
    { pregunta: "3) ¿En qué fecha oficializamos nuestra relación?", opciones: ["14 de febrero", "7 de julio", "25 de diciembre", "1 de enero"], respuestaCorrecta: "7 de julio" }
];

const preguntasAlternativas = [
    { pregunta: "1.1) ¿De qué hablamos mucho en nuestra primera salida?", opciones: ["Deportes", "Animes e idiomas", "Películas de terror", "Tecnología"], respuestaCorrecta: "Animes e idiomas" },
    { pregunta: "2.1) ¿En qué piso del restaurante te pedí que fueras mi enamorada?", opciones: ["Piso 10", "Piso 15", "Piso 21", "Piso 25"], respuestaCorrecta: "Piso 21" },
    { pregunta: "3.1) ¿Cuál fue nuestra primera película en el cine como pareja?", opciones: ["Spider-Man: No Way Home", "Barbie", "Intensamente 2", "Avatar 2"], respuestaCorrecta: "Intensamente 2" }
];


let indicePregunta = 0;
let usandoPreguntaAlternativa = false;
let respuestasCorrectas = 0;

function mostrarPreguntas() {
    console.log("📢 Se hizo clic en el botón y se ejecutó mostrarPreguntas()");
    document.getElementById("botonDesbloqueo").style.display = "none";
    document.getElementById("preguntas").style.display = "block";
    cargarPregunta(indicePregunta);
}

function cargarPregunta(indice) {
    console.log("Cargando pregunta índice:", indice);
    
    if (respuestasCorrectas >= 3) {
        desbloquearCandado();
        return;
    }

    let preguntaActual = usandoPreguntaAlternativa ? preguntasAlternativas[indice] : preguntas[indice];

    if (preguntaActual) {
        document.getElementById("preguntaTexto").innerText = preguntaActual.pregunta;
        let contenedorOpciones = document.getElementById("opciones");
        contenedorOpciones.innerHTML = "";
        
        preguntaActual.opciones.forEach(opcion => {
            let boton = document.createElement("button");
            boton.innerText = opcion;
            boton.classList.add("opcion-btn");
            boton.onclick = function() {
                console.log("🔘 Se hizo clic en:", opcion);
                validarRespuesta(opcion);
            };
            contenedorOpciones.appendChild(boton);
        });
    }
}

function validarRespuesta(opcionSeleccionada) {
    let preguntaActual = usandoPreguntaAlternativa ? preguntasAlternativas[indicePregunta] : preguntas[indicePregunta];

    // 🎞️ GIFs y mensajes personalizados para cada pregunta
    const mensajesCorrectos = [
        "¡Yeeei! Sabía que te acordarías. 🥰🥰",
        "¡Correcto, amorcito! 🥰",
        "¡Esooo! Sabía que no olvidarías algo tan especial. 💕🥰",
        "¡Acertaste! Hablamos mucho sobre animes e idiomas. 🎌📖",
        "¡Sí! Fue en el piso 21, un momento realmente especial. 🌆❤️",
        "¡Bien hecho! Así de mágico fue ese día. ✨❤️"
    ];

    const gifsCorrectos = [
        "imagenes/gatoaplaudiendo.gif",
        "imagenes/hinata.gif",
        "imagenes/narutobien.gif",
        "imagenes/bubufeliz.gif",
        "imagenes/bailando.gif",
        "imagenes/bobbailando.gif"
    ];

    const mensajesIncorrectos = [
       "Oops, ese no es el lugar correcto. Intenta otra vez. 🚫❌",
        "No, eso no decía en el postre. Piensa bien. 🍰❌",
        "Esa no es la fecha correcta, inténtalo de nuevo. 📆❌",
        "No hablamos de eso en nuestra primera salida. Recuerda bien. 🤔❌",
        "No fue en ese piso. ¿Quieres intentarlo otra vez? 🏢❌",
        "Esa no fue nuestra primera película juntos. Vuelve a intentarlo. 🎥❌"
    ];

    const gifsIncorrectos = [
        "imagenes/narutotriste.gif",
        "imagenes/patricio.gif",
        "imagenes/bobesponja.gif",
        "imagenes/gatosorprendido.gif",
        "imagenes/bubu.gif",
        "imagenes/bubutriste.gif"
    ];

    if (opcionSeleccionada === preguntaActual.respuestaCorrecta) {
        respuestasCorrectas++;

        // ✅ Muestra el mensaje y el GIF correcto correspondiente a la pregunta
        mostrarMensaje(mensajesCorrectos[indicePregunta], gifsCorrectos[indicePregunta]);

        usandoPreguntaAlternativa = false;
        setTimeout(() => {
            indicePregunta++;
            if (respuestasCorrectas >= 3) {
                desbloquearCandado();
            } else {
                cargarPregunta(indicePregunta);
            }
        }, 2500);

    } else {
        // ❌ Muestra el mensaje y el GIF incorrecto correspondiente a la pregunta
        mostrarMensaje(mensajesIncorrectos[indicePregunta], gifsIncorrectos[indicePregunta]);

        if (!usandoPreguntaAlternativa) {
            usandoPreguntaAlternativa = true;
        } else {
            usandoPreguntaAlternativa = false;
            indicePregunta++;
        }

        setTimeout(() => {
            cargarPregunta(indicePregunta);
        }, 2500);
    }
}

function verificarRespuesta(respuestaUsuario, respuestaCorrecta) {
    if (respuestaUsuario.toLowerCase() === respuestaCorrecta.toLowerCase()) {
        respuestasCorrectas++;
        console.log("✅ Respuesta correcta. Total correctas: " + respuestasCorrectas);
        
        if (respuestasCorrectas === 3) {
            console.log("🔓 Se deben desbloquear los elementos.");
            desbloquearCandado();
        } else {
            mostrarSiguientePregunta();
        }
    } else {
        console.log("❌ Respuesta incorrecta.");
        alert("Respuesta incorrecta. Inténtalo de nuevo.");
    }
}

function mostrarSiguientePregunta() {
    let preguntas = document.querySelectorAll(".pregunta");
    for (let i = 0; i < preguntas.length; i++) {
        if (preguntas[i].style.display !== "none") {
            preguntas[i].style.display = "none"; // Oculta la pregunta actual
            if (i + 1 < preguntas.length) {
                preguntas[i + 1].style.display = "block"; // Muestra la siguiente pregunta
            }
            break;
        }
    }
}


function mostrarMensaje(mensaje, gif) {
    let mensajeContainer = document.getElementById("mensajeContainer");
    let mensajeTexto = document.getElementById("mensaje");
    let gifMensaje = document.getElementById("gifMensaje");

    mensajeTexto.innerText = mensaje;
    gifMensaje.src = gif;
    
    mensajeContainer.style.display = "block";
    gifMensaje.style.display = "block"; // Aseguramos que el GIF se vea

    setTimeout(() => {
        mensajeContainer.style.display = "none";
        gifMensaje.style.display = "none";
    }, 2500);
}


function desbloquearCandado() {
    console.log("🔓 Dentro de desbloquearCandado(). Ocultando elementos...");

    // Ocultar el candado
    let candado = document.getElementById("candado");
    if (candado) {
        candado.style.display = "none";
        console.log("✅ Candado ocultado.");
    } else {
        console.log("⚠️ Candado no encontrado.");
    }

    // Ocultar las preguntas
    let preguntasDiv = document.getElementById("preguntas");
    if (preguntasDiv) {
        preguntasDiv.style.display = "none";
        console.log("✅ Preguntas ocultadas.");
    } else {
        console.log("⚠️ Preguntas no encontradas.");
    }

    // Mostrar mensaje de felicitaciones
    let mensajeFinal = document.createElement("div");
    mensajeFinal.id = "mensajeFinal";
    mensajeFinal.style.position = "fixed";
    mensajeFinal.style.top = "50%";
    mensajeFinal.style.left = "50%";
    mensajeFinal.style.transform = "translate(-50%, -50%)";
    mensajeFinal.style.textAlign = "center";
    mensajeFinal.style.fontSize = "24px";
    mensajeFinal.style.color = "white";
    mensajeFinal.style.background = "rgba(0, 0, 0, 0.8)";
    mensajeFinal.style.padding = "20px";
    mensajeFinal.style.borderRadius = "10px";
    mensajeFinal.style.zIndex = "1001";
    mensajeFinal.innerHTML = `
        🎉 Felicidades, amor! 🎉 <br> ¡Has desbloqueado la sorpresa! 💖  
        <div style="margin-top: 20px;">
            <button id="btnSorpresa" style="padding: 10px 20px; font-size: 18px; background: pink; 
            color: white; border: none; border-radius: 5px; cursor: pointer;">Ver Sorpresa</button>
        </div>
    `;

    document.body.appendChild(mensajeFinal);

    setTimeout(() => {
        document.getElementById("btnSorpresa").addEventListener("click", function() {
            window.location.href = "libro.html"; 
        });
    }, 1000); // Esperar 1 segundo para asegurarse de que el DOM se haya actualizado

    console.log("✅ Mensaje de felicitaciones añadido.");
}

// Función para redirigir a la página de la sorpresa
function irASorpresa() {
    window.location.href = "libro.html"; // Reemplaza con la URL de la sorpresa
}



