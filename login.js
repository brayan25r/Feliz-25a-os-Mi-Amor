function validarLogin() {
    let usuario = document.getElementById("usuario").value.toLowerCase().trim();
    let fecha = document.getElementById("fecha").value;

    let usuarioCorrecto = ["amorcito", "amor"];
    let fechaCorrecta = "2024-07-07"; // Asegúrate de que coincida con el formato que devuelve el input

    console.log("Usuario ingresado:", usuario); // Para depurar en consola
    console.log("Fecha ingresada:", fecha); // Para verificar formato

    if (usuarioCorrecto.includes(usuario) && fecha === fechaCorrecta) {
        console.log("¡Inicio de sesión exitoso! Redirigiendo...");
        window.location.href = "carta.html"; // Asegúrate de que el archivo exista en la misma carpeta
    } else {
        alert("Usuario o contraseña incorrectos. Intenta de nuevo. 😢");
    }
}