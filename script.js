console.log("EFITEM NFC funcionando");

console.log(negocio);


// ==============================
// COLORES
// ==============================

document.documentElement.style.setProperty(
    "--color-principal",
    negocio.colores.principal
);

document.documentElement.style.setProperty(
    "--color-botones",
    negocio.colores.botones
);

document.documentElement.style.setProperty(
    "--color-fondo",
    negocio.colores.fondo
);

document.documentElement.style.setProperty(
    "--color-texto",
    negocio.colores.texto
);


// ==============================
// INFORMACIÓN DEL NEGOCIO
// ==============================

const titulo = document.getElementById("nombre-negocio");
titulo.textContent = negocio.nombre;


const logo = document.getElementById("logo-negocio");
logo.src = negocio.logo;
logo.alt = "Logo de " + negocio.nombre;


const imagen = document.getElementById("imagen-negocio");
imagen.src = negocio.imagen;
imagen.alt = negocio.nombre;


const descripcion = document.getElementById("descripcion-negocio");
descripcion.textContent = negocio.descripcion;

// ==============================
// SERVICIOS
// ==============================

const listaServicios =
    document.getElementById("lista-servicios");

negocio.servicios.forEach(function(servicio) {

    const elementoServicio =
        document.createElement("div");

    elementoServicio.className =
        "servicio";

    elementoServicio.innerHTML =
        '<i class="fa-solid fa-check"></i>' +
        '<span>' + servicio + '</span>';

    listaServicios.appendChild(
        elementoServicio
    );

});


// ==============================
// FUNCIÓN PARA FORMATEAR HORA
// ==============================

function formatearHora(valor) {

    let horas;
    let minutos;

    // Si viene como número: 9, 19, etc.
    if (typeof valor === "number") {

        horas = valor;
        minutos = 0;

    } else {

        // Si viene como texto: "09:30"
        const partes = valor.split(":");

        horas = Number(partes[0]);
        minutos = Number(partes[1] || 0);
    }

    const periodo = horas >= 12 ? "PM" : "AM";

    let horaMostrar = horas;

    if (horaMostrar === 0) {
        horaMostrar = 12;
    } else if (horaMostrar > 12) {
        horaMostrar -= 12;
    }

    const minutosMostrar =
        minutos.toString().padStart(2, "0");

    return `${horaMostrar}:${minutosMostrar} ${periodo}`;
}


// ==============================
// HORARIOS
// ==============================

const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
];

diasSemana.forEach(function(dia) {

    const elemento = document.getElementById(dia);
    const horario = negocio.horario[dia];

    if (!elemento) {
        return;
    }

    if (horario === null) {

        elemento.textContent = "Cerrado";

    } else {

        elemento.textContent =
            formatearHora(horario.apertura) +
            " - " +
            formatearHora(horario.cierre);
    }

});

// ==============================
// BOTONES
// ==============================

const botonWhatsapp =
    document.getElementById("boton-whatsapp");

botonWhatsapp.href =
    "https://wa.me/" +
    negocio.whatsapp +
    "?text=" +
    encodeURIComponent(negocio.mensajeWhatsapp);

const botonLlamar =
    document.getElementById("boton-llamar");

botonLlamar.href =
    "tel:" + negocio.telefono;

const botonInstagram =
    document.getElementById("boton-instagram");

botonInstagram.href =
    "https://www.instagram.com/" + negocio.instagram + "/";


const botonMaps =
    document.getElementById("boton-maps");

botonMaps.href =
    negocio.maps;


const botonResenas =
    document.getElementById("boton-resenas");

botonResenas.href =
    negocio.resenas;


function convertirAMinutos(valor) {

    if (typeof valor === "number") {
        return valor * 60;
    }

    const partes = valor.split(":");

    const horas = Number(partes[0]);
    const minutos = Number(partes[1] || 0);

    return horas * 60 + minutos;
}


// ==============================
// ESTADO DEL NEGOCIO
// ==============================

const estado =
    document.getElementById("estado-negocio");

const ahora = new Date();

const dia = ahora.getDay();

const horaActual =
    ahora.getHours() * 60 +
    ahora.getMinutes();


const dias = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
];


const diaActual =
    dias[dia];


const horarioHoy =
    negocio.horario[diaActual];


if (horarioHoy === null) {

    estado.textContent =
        "Cerrado hoy";

    estado.className =
        "cerrado";

} else {

    const aperturaMinutos =
    convertirAMinutos(horarioHoy.apertura);

const cierreMinutos =
    convertirAMinutos(horarioHoy.cierre);

    if (
        horaActual >= aperturaMinutos &&
        horaActual < cierreMinutos
    ) {

        estado.textContent =
            "Abierto ahora";

        estado.className =
            "abierto";

        } else {

        estado.textContent =
            "Cerrado";

        estado.className =
            "cerrado";
    }
}