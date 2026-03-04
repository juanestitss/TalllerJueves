const result = document.getElementById("result");
const button = document.getElementById("btnSearch");
const cityButtons = document.querySelectorAll(".city-btn");

const climas = [
    "Soleado ☀️",
    "Nublado ☁️",
    "Lluvia ligera 🌧️",
    "Tormenta ⛈️",
    "Parcialmente nublado 🌤️",
    "Frío ❄️",
    "Calor intenso 🔥"
];

// Evento botón consultar manual
button.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    mostrarInformacion(city);
});

// Evento botones por defecto
cityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const city = btn.dataset.city;
        mostrarInformacion(city);
    });
});

function mostrarInformacion(city) {

    if (!city) {
        result.textContent = "Debe ingresar una ciudad válida.";
        return;
    }

    const fechaActual = new Date();

    const fecha = fechaActual.toLocaleDateString("es-CO");
    const hora = fechaActual.toLocaleTimeString("es-CO");

    const climaAleatorio = climas[Math.floor(Math.random() * climas.length)];

    result.innerHTML = `
        <strong>Ciudad:</strong> ${city} <br>
        <strong>Fecha:</strong> ${fecha} <br>
        <strong>Hora:</strong> ${hora} <br>
        <strong>Clima:</strong> ${climaAleatorio}
    `;
}