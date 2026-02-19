let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
let editIndex = null;

const inputTitulo = document.getElementById("inputTitulo");
const inputGenero = document.getElementById("inputGenero");
const inputDirector = document.getElementById("inputDirector");
const inputAno = document.getElementById("inputAno");
const inputCalificacion = document.getElementById("inputCalificacion");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputImagen = document.getElementById("inputImagen");

const btnGuardar = document.getElementById("btnGuardarPelicula");
const gridPeliculas = document.getElementById("gridPeliculas");
const sinResultados = document.getElementById("sinResultados");
const inputBuscar = document.getElementById("inputBuscar");
const selectGenero = document.getElementById("selectGenero");

function guardar() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

function limpiar() {
    inputTitulo.value = "";
    inputGenero.value = "";
    inputDirector.value = "";
    inputAno.value = "";
    inputCalificacion.value = "";
    inputDescripcion.value = "";
    inputImagen.value = "";
    editIndex = null;
    document.getElementById("modalTitulo").innerText = "Agregar Película";
}

btnGuardar.onclick = function () {
    const peli = {
        titulo: inputTitulo.value,
        genero: inputGenero.value,
        director: inputDirector.value,
        ano: inputAno.value,
        calificacion: inputCalificacion.value,
        descripcion: inputDescripcion.value,
        imagen: inputImagen.value
    };

    if (editIndex == null) {
        peliculas.push(peli);
    } else {
        peliculas[editIndex] = peli;
    }

    guardar();
    mostrar(peliculas);
    limpiar();

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalPelicula"));
    modal.hide();
};

function mostrar(lista) {
    gridPeliculas.innerHTML = "";

    if (lista.length == 0) {
        sinResultados.style.display = "block";
        return;
    } else {
        sinResultados.style.display = "none";
    }

    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];

        const col = document.createElement("div");
        col.className = "col-md-3";

        col.innerHTML = `
        <div class="movie-card">
            <img src="${p.imagen}" class="movie-image">
            <div class="movie-content">
                <div class="movie-title">${p.titulo}</div>
                <div class="movie-genre">${p.genero}</div>
                <div class="movie-meta">Director: ${p.director}</div>
                <div class="movie-meta">Año: ${p.ano}</div>
                <div class="movie-rating">⭐ ${p.calificacion}</div>
                <div class="movie-description">${p.descripcion}</div>
                <div class="movie-actions">
                    <button class="btn btn-info btn-sm" onclick="verDetalles(${i})">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editar(${i})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar(${i})">Eliminar</button>
                </div>
            </div>
        </div>
        `;
        gridPeliculas.appendChild(col);
    }
}

function eliminar(i) {
    if (confirm("¿Eliminar?")) {
        peliculas.splice(i, 1);
        guardar();
        mostrar(peliculas);
    }
}

function editar(i) {
    const p = peliculas[i];

    inputTitulo.value = p.titulo;
    inputGenero.value = p.genero;
    inputDirector.value = p.director;
    inputAno.value = p.ano;
    inputCalificacion.value = p.calificacion;
    inputDescripcion.value = p.descripcion;
    inputImagen.value = p.imagen;

    editIndex = i;
    document.getElementById("modalTitulo").innerText = "Editar Película";

    new bootstrap.Modal(document.getElementById("modalPelicula")).show();
}

function verDetalles(i) {
    const p = peliculas[i];

    document.getElementById("detallesTitulo").innerText = p.titulo;
    document.getElementById("detallesImagen").src = p.imagen;
    document.getElementById("detallesGenero").innerText = p.genero;
    document.getElementById("detallesDirector").innerText = p.director;
    document.getElementById("detallesAno").innerText = p.ano;
    document.getElementById("detallesCalificacion").innerText = p.calificacion;
    document.getElementById("detallesDescripcion").innerText = p.descripcion;

    new bootstrap.Modal(document.getElementById("modalDetalles")).show();
}

inputBuscar.onkeyup = filtrar;
selectGenero.onchange = filtrar;

function filtrar() {
    const texto = inputBuscar.value.toLowerCase();
    const gen = selectGenero.value;

    let res = [];

    for (let i = 0; i < peliculas.length; i++) {
        const p = peliculas[i];
        if (p.titulo.toLowerCase().includes(texto) && (gen == "" || p.genero == gen)) {
            res.push(p);
        }
    }
    mostrar(res);
}

mostrar(peliculas);

const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");
const loginSection = document.getElementById("loginSection");
const mainContent = document.getElementById("mainContent");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnAgregar = document.getElementById("btnAgregar");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

formRegistro.onsubmit = function (e) {
    e.preventDefault();

    const nombre = document.getElementById("inputNombre").value;
    const email = document.getElementById("inputEmail").value;
    const user = document.getElementById("inputUserReg").value;
    const pass = document.getElementById("inputPasswordReg").value;
    const pass2 = document.getElementById("inputConfirmPassword").value;

    if (pass !== pass2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    usuarios.push({ nombre, email, user, pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado, ahora puedes iniciar sesión");
    formRegistro.reset();
};

formLogin.onsubmit = function (e) {
    e.preventDefault();

    const user = document.getElementById("inputUser").value;
    const pass = document.getElementById("inputPassword").value;

    let encontrado = false;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user === user && usuarios[i].pass === pass) {
            encontrado = true;
            break;
        }
    }

    if (encontrado) {
        loginSection.style.display = "none";
        mainContent.style.display = "block";
        btnLogin.style.display = "none";
        btnLogout.style.display = "inline-block";
        btnAgregar.style.display = "inline-block";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
};

btnLogout.onclick = function () {
    mainContent.style.display = "none";
    loginSection.style.display = "flex";
    btnLogin.style.display = "inline-block";
    btnLogout.style.display = "none";
    btnAgregar.style.display = "none";
};
