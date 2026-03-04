// Selección de elementos del DOM
const boton = document.querySelector("#botonCargar");
const galeriaEspacio = document.querySelector("#galeriaEspacio");

// Evento principal
boton.addEventListener("click", async () => {
    // Limpiamos la galería previa
    galeriaEspacio.innerHTML = "";
    
    // Cambiamos el estado del botón
    boton.disabled = true;
    boton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Cargando...`;
    
    await mostrarImagenes();
    
    // Restauramos el botón
    boton.disabled = false;
    boton.innerHTML = 'Cargar Imágenes';
});

// Función que realiza la petición a la API
function peticionApi() {
    return new Promise((resolve, reject) => {
        // Simulamos un retraso de 1.2 segundos para apreciar el efecto de carga
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/photos")
                .then(response => {
                    if (!response.ok) throw new Error("Error en la petición");
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }, 1200);
    });
}

// Función que renderiza las imágenes en el HTML
async function mostrarImagenes() {
    try {
        const fotos = await peticionApi();
        let fragmentoHtml = ""; // Usamos un string para evitar múltiples inserciones lentas

        for (let i = 0; i < 9; i++) {
            const indiceAleatorio = Math.floor(Math.random() * fotos.length);
            const item = fotos[indiceAleatorio];

            fragmentoHtml += `
            <div class="col">
                <div class="card h-100">
                    <img src="${item.thumbnailUrl}" class="card-img-top" alt="Thumbnail">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title fw-bold text-capitalize">${item.title.substring(0, 30)}...</h6>
                        <div class="mt-auto pt-3 border-top">
                            <small class="text-muted">
                                <b>ID:</b> ${item.id} | <b>Álbum:</b> ${item.albumId}
                            </small>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        
        galeriaEspacio.innerHTML = fragmentoHtml;

    } catch (error) {
        console.error("Error al obtener datos:", error);
        galeriaEspacio.innerHTML = `<div class="alert alert-danger w-100 text-center">No se pudo cargar la galería.</div>`;
    }
}