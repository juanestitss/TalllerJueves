const listaTitanes = document.querySelector('#listaTitanes');
const botonesHeader = document.querySelectorAll(".btn-header");

// Estas URLs apuntan a repositorios de activos (assets) que no bloquean la visualización
const titanes = [
    { 
        id: 1, 
        name: "Titán de Ataque", 
        types: ["shifter", "eldia"], 
        height: "15m", 
        portador: "Eren Yeager", 
        img: "https://api.otakugif.com/images/attack-on-titan/eren-titan.png" 
    },
    { 
        id: 2, 
        name: "Titán Acorazado", 
        types: ["shifter", "marley"], 
        height: "15m", 
        portador: "Reiner Braun", 
        img: "https://www.pngmart.com/files/13/Armor-Titan-PNG-Transparent-Image.png" 
    },
    { 
        id: 3, 
        name: "Titán Colosal", 
        types: ["shifter", "marley"], 
        height: "60m", 
        portador: "Bertholdt / Armin", 
        img: "https://www.pngmart.com/files/13/Colossal-Titan-PNG-Photos.png" 
    },
    { 
        id: 4, 
        name: "Titán Hembra", 
        types: ["shifter", "marley"], 
        height: "14m", 
        portador: "Annie Leonhart", 
        img: "https://www.pngmart.com/files/13/Female-Titan-PNG-Clipart.png" 
    },
    { 
        id: 5, 
        name: "Titán Mandíbula", 
        types: ["shifter", "marley"], 
        height: "5m", 
        portador: "Porco Galliard", 
        img: "https://www.pngmart.com/files/13/Jaw-Titan-PNG-File.png" 
    },
    { 
        id: 6, 
        name: "Titán Bestia", 
        types: ["shifter", "marley"], 
        height: "17m", 
        portador: "Zeke Yeager", 
        img: "https://www.pngmart.com/files/13/Beast-Titan-PNG-Transparent.png" 
    },
    { 
        id: 7, 
        name: "Titán Carguero", 
        types: ["shifter", "marley"], 
        height: "4m", 
        portador: "Pieck Finger", 
        img: "https://www.pngmart.com/files/13/Cart-Titan-PNG-HD.png" 
    },
    { 
        id: 8, 
        name: "Titán Martillo", 
        types: ["shifter", "marley"], 
        height: "15m", 
        portador: "Lara Tybur", 
        img: "https://www.pngmart.com/files/13/War-Hammer-Titan-PNG-Image.png" 
    },
    { 
        id: 9, 
        name: "Titán Fundador", 
        types: ["shifter", "eldia"], 
        height: "Varía", 
        portador: "Eren Yeager", 
        img: "https://www.pngmart.com/files/13/Founding-Titan-PNG-Transparent-Image.png" 
    }
];

function mostrarTitanes(datos) {
    listaTitanes.innerHTML = ""; 

    datos.forEach(titan => {
        let titanId = titan.id.toString().padStart(3, '0');
        const tipos = titan.types.map(tipo => `<p class="${tipo} tipo">${tipo}</p>`).join('');

        const div = document.createElement("div");
        div.classList.add("pokemon"); 
        div.innerHTML = `
            <p class="pokemon-id-back">#${titanId}</p>
            <div class="pokemon-imagen">
                <img src="${titan.img}" alt="${titan.name}" loading="lazy">
            </div>
            <div class="Pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${titanId}</p>
                    <h2 class="pokemon-nombre">${titan.name}</h2>
                </div>
                <div class="pokemon-tipos">${tipos}</div>
                <div class="Pokemon-stats">
                    <p class="Stat"><b>Alt:</b> ${titan.height}</p>
                    <p class="Stat"><b>Usuario:</b> ${titan.portador}</p>
                </div>
            </div>
        `;
        listaTitanes.append(div);
    });
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    if (botonId === "ver-todos") {
        mostrarTitanes(titanes);
    } else {
        const filtrados = titanes.filter(titan => titan.types.includes(botonId));
        mostrarTitanes(filtrados);
    }
}));

mostrarTitanes(titanes);