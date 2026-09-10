console.log("EFITEM NFC funcionando");


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

document.title = negocio.nombre;


const titulo =
    document.getElementById("nombre-negocio");

const descripcion =
    document.getElementById("descripcion-negocio");

const logo =
    document.getElementById("logo-negocio");


titulo.textContent =
    negocio.nombre;

descripcion.textContent =
    negocio.descripcion;

logo.src =
    negocio.logo;

logo.alt =
    "Logo de " + negocio.nombre;



// ==============================
// SERVICIOS
// ==============================

const listaServicios =
    document.getElementById("lista-servicios");

const detalleServicio =
    document.getElementById("detalle-servicio");

const detalleServicioTitulo =
    document.getElementById("detalle-servicio-titulo");

const detalleServicioTexto =
    document.getElementById("detalle-servicio-texto");


let servicioActivo = null;


function cerrarDetalleServicio() {

    document
        .querySelectorAll(".servicio")
        .forEach(function(boton) {

            boton.classList.remove("activo");

            boton.setAttribute(
                "aria-expanded",
                "false"
            );

        });


    detalleServicio.classList.remove(
        "visible"
    );

    detalleServicio.setAttribute(
        "aria-hidden",
        "true"
    );

    servicioActivo = null;

}


negocio.servicios.forEach(
    function(servicio, indice) {


        const boton =
            document.createElement("button");


        boton.type =
            "button";


        boton.className =
            "servicio";


        boton.setAttribute(
            "aria-expanded",
            "false"
        );


        boton.setAttribute(
            "aria-controls",
            "detalle-servicio"
        );


        boton.innerHTML = `

            <span class="servicio-contenido">

                <i class="fa-solid ${servicio.icono || "fa-wrench"}"></i>

                <span>
                    ${servicio.nombre}
                </span>

            </span>

            <i class="fa-solid fa-chevron-down servicio-flecha"></i>

        `;


        boton.addEventListener(
            "click",
            function() {


                const estabaActivo =

                    servicioActivo === indice &&

                    detalleServicio.classList.contains(
                        "visible"
                    );


                if (estabaActivo) {

                    cerrarDetalleServicio();

                    return;

                }


                cerrarDetalleServicio();

                cerrarPromocion();


                boton.classList.add(
                    "activo"
                );


                boton.setAttribute(
                    "aria-expanded",
                    "true"
                );


                detalleServicioTitulo.textContent =
                    servicio.nombre;


                detalleServicioTexto.textContent =
                    servicio.descripcion;


                detalleServicio.classList.add(
                    "visible"
                );


                detalleServicio.setAttribute(
                    "aria-hidden",
                    "false"
                );


                servicioActivo =
                    indice;

            }

        );


        listaServicios.appendChild(
            boton
        );

    }

);



// ==============================
// PROMOCIÓN
// ==============================

const botonPromocion =
    document.getElementById(
        "boton-promocion"
    );

const textoBotonPromocion =
    document.getElementById(
        "texto-boton-promocion"
    );

const detallePromocion =
    document.getElementById(
        "detalle-promocion"
    );

const promocionTitulo =
    document.getElementById(
        "promocion-titulo"
    );

const promocionDescripcion =
    document.getElementById(
        "promocion-descripcion"
    );

const promocionVigencia =
    document.getElementById(
        "promocion-vigencia"
    );

const botonPromocionWhatsapp =
    document.getElementById(
        "boton-promocion-whatsapp"
    );


function cerrarPromocion() {

    botonPromocion.classList.remove(
        "activo"
    );


    botonPromocion.setAttribute(
        "aria-expanded",
        "false"
    );


    detallePromocion.classList.remove(
        "visible"
    );


    detallePromocion.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (
    negocio.promocion &&
    negocio.promocion.activa
) {


    botonPromocion.hidden =
        false;


    textoBotonPromocion.textContent =

        negocio.promocion.textoBoton ||

        "Ver promoción";


    promocionTitulo.textContent =
        negocio.promocion.titulo;


    promocionDescripcion.textContent =
        negocio.promocion.descripcion;


    if (
        negocio.promocion.vigencia
    ) {

        promocionVigencia.textContent =
            negocio.promocion.vigencia;

    } else {

        promocionVigencia.style.display =
            "none";

    }


    if (
        negocio.whatsapp &&
        negocio.promocion.mensajeWhatsapp
    ) {


        botonPromocionWhatsapp.href =

            "https://wa.me/" +

            negocio.whatsapp +

            "?text=" +

            encodeURIComponent(
                negocio.promocion.mensajeWhatsapp
            );


    } else {


        botonPromocionWhatsapp.style.display =
            "none";

    }


    botonPromocion.addEventListener(
        "click",
        function() {


            const abrir =

                !detallePromocion.classList.contains(
                    "visible"
                );


            if (abrir) {


                cerrarDetalleServicio();


                botonPromocion.classList.add(
                    "activo"
                );


                botonPromocion.setAttribute(
                    "aria-expanded",
                    "true"
                );


                detallePromocion.classList.add(
                    "visible"
                );


                detallePromocion.setAttribute(
                    "aria-hidden",
                    "false"
                );


            } else {


                cerrarPromocion();

            }

        }

    );

}



// ==============================
// CARRUSEL
// ==============================

const galeria =
    document.getElementById(
        "galeria-negocio"
    );

const carrusel =
    document.getElementById(
        "carrusel"
    );

const carruselPista =
    document.getElementById(
        "carrusel-pista"
    );

const botonAnterior =
    document.getElementById(
        "carrusel-anterior"
    );

const botonSiguiente =
    document.getElementById(
        "carrusel-siguiente"
    );

const indicadores =
    document.getElementById(
        "carrusel-indicadores"
    );


const imagenes =

    Array.isArray(negocio.imagenes)

        ? negocio.imagenes

        : [];


let indiceImagen =
    0;

let temporizadorCarrusel =
    null;

let inicioToqueX =
    0;


const reducirMovimiento =

    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



if (
    imagenes.length === 0
) {


    galeria.style.display =
        "none";


} else {


    imagenes.forEach(
        function(ruta, indice) {


            const slide =
                document.createElement(
                    "div"
                );


            slide.className =
                "carrusel-slide";


            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                ruta;


            imagen.alt =

                negocio.nombre +

                " - fotografía " +

                (indice + 1);


            imagen.loading =

                indice === 0

                    ? "eager"

                    : "lazy";


            imagen.decoding =
                "async";


            imagen.onerror =
                function() {

                    imagen.onerror =
                        null;

                    imagen.src =
                        negocio.logo;

                };


            slide.appendChild(
                imagen
            );


            carruselPista.appendChild(
                slide
            );


            const indicador =
                document.createElement(
                    "button"
                );


            indicador.type =
                "button";


            indicador.className =
                "carrusel-indicador";


            indicador.setAttribute(

                "aria-label",

                "Ver fotografía " +

                (indice + 1)

            );


            indicador.addEventListener(
                "click",
                function() {


                    mostrarImagen(
                        indice
                    );


                    reiniciarCarrusel();

                }

            );


            indicadores.appendChild(
                indicador
            );

        }

    );



    function mostrarImagen(
        nuevoIndice
    ) {


        if (
            nuevoIndice < 0
        ) {

            nuevoIndice =
                imagenes.length - 1;

        }


        if (
            nuevoIndice >=
            imagenes.length
        ) {

            nuevoIndice =
                0;

        }


        indiceImagen =
            nuevoIndice;


        carruselPista.style.transform =

            "translateX(-" +

            indiceImagen * 100 +

            "%)";


        document
            .querySelectorAll(
                ".carrusel-indicador"
            )
            .forEach(
                function(
                    indicador,
                    indice
                ) {


                    indicador.classList.toggle(

                        "activo",

                        indice ===
                        indiceImagen

                    );

                }

            );

    }



    function detenerCarrusel() {


        if (
            temporizadorCarrusel
        ) {


            clearInterval(
                temporizadorCarrusel
            );


            temporizadorCarrusel =
                null;

        }

    }



    function iniciarCarrusel() {


        detenerCarrusel();


        if (
            imagenes.length <= 1 ||
            reducirMovimiento
        ) {

            return;

        }


        const intervalo =

            Number(
                negocio.intervaloCarrusel
            ) ||

            5000;


        temporizadorCarrusel =

            setInterval(
                function() {


                    mostrarImagen(
                        indiceImagen + 1
                    );


                },
                intervalo
            );

    }



    function reiniciarCarrusel() {

        iniciarCarrusel();

    }



    botonAnterior.addEventListener(
        "click",
        function() {


            mostrarImagen(
                indiceImagen - 1
            );


            reiniciarCarrusel();

        }

    );



    botonSiguiente.addEventListener(
        "click",
        function() {


            mostrarImagen(
                indiceImagen + 1
            );


            reiniciarCarrusel();

        }

    );



    carrusel.addEventListener(
        "touchstart",
        function(evento) {


            inicioToqueX =

                evento.changedTouches[0]
                    .clientX;

        },

        {
            passive: true
        }

    );



    carrusel.addEventListener(
        "touchend",
        function(evento) {


            const finalToqueX =

                evento.changedTouches[0]
                    .clientX;


            const diferencia =

                finalToqueX -

                inicioToqueX;


            if (
                Math.abs(diferencia) <
                45
            ) {

                return;

            }


            if (
                diferencia < 0
            ) {


                mostrarImagen(
                    indiceImagen + 1
                );


            } else {


                mostrarImagen(
                    indiceImagen - 1
                );

            }


            reiniciarCarrusel();

        },

        {
            passive: true
        }

    );



    carrusel.addEventListener(
        "mouseenter",
        detenerCarrusel
    );


    carrusel.addEventListener(
        "mouseleave",
        iniciarCarrusel
    );



    document.addEventListener(
        "visibilitychange",
        function() {


            if (
                document.hidden
            ) {


                detenerCarrusel();


            } else {


                iniciarCarrusel();

            }

        }

    );



    if (
        imagenes.length === 1
    ) {


        botonAnterior.style.display =
            "none";


        botonSiguiente.style.display =
            "none";


        indicadores.style.display =
            "none";

    }


    mostrarImagen(0);

    iniciarCarrusel();

}



// ==============================
// FORMATO DE HORAS
// ==============================

function formatearHora(valor) {


    let horas;

    let minutos;


    if (
        typeof valor === "number"
    ) {


        horas =
            valor;


        minutos =
            0;


    } else {


        const partes =
            valor.split(":");


        horas =
            Number(
                partes[0]
            );


        minutos =
            Number(
                partes[1] || 0
            );

    }


    const periodo =

        horas >= 12

            ? "PM"

            : "AM";


    let horaMostrar =
        horas;


    if (
        horaMostrar === 0
    ) {


        horaMostrar =
            12;


    } else if (
        horaMostrar > 12
    ) {


        horaMostrar -=
            12;

    }


    const minutosMostrar =

        minutos
            .toString()
            .padStart(
                2,
                "0"
            );


    return (

        horaMostrar +

        ":" +

        minutosMostrar +

        " " +

        periodo

    );

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


diasSemana.forEach(
    function(dia) {


        const elemento =

            document.getElementById(
                dia
            );


        const horario =

            negocio.horario[
                dia
            ];


        if (
            !elemento
        ) {

            return;

        }


        if (
            horario === null
        ) {


            elemento.textContent =
                "Cerrado";


        } else {


            elemento.textContent =

                formatearHora(
                    horario.apertura
                ) +

                " - " +

                formatearHora(
                    horario.cierre
                );

        }

    }

);



// ==============================
// CONVERTIR HORA A MINUTOS
// ==============================

function convertirAMinutos(
    valor
) {


    if (
        typeof valor === "number"
    ) {


        return valor * 60;

    }


    const partes =
        valor.split(":");


    const horas =
        Number(
            partes[0]
        );


    const minutos =
        Number(
            partes[1] || 0
        );


    return (

        horas * 60 +

        minutos

    );

}



// ==============================
// HORA LOCAL DEL NEGOCIO
// ==============================

function obtenerHoraNegocio() {


    const mapaDias = {

        Sunday: "domingo",

        Monday: "lunes",

        Tuesday: "martes",

        Wednesday: "miercoles",

        Thursday: "jueves",

        Friday: "viernes",

        Saturday: "sabado"

    };


    try {


        const formato =

            new Intl.DateTimeFormat(
                "en-US",
                {

                    timeZone:
                        negocio.zonaHoraria ||
                        "America/Mexico_City",

                    weekday:
                        "long",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    hourCycle:
                        "h23"

                }

            );


        const valores =
            {};


        formato
            .formatToParts(
                new Date()
            )
            .forEach(
                function(parte) {


                    if (
                        parte.type !==
                        "literal"
                    ) {


                        valores[
                            parte.type
                        ] =
                            parte.value;

                    }

                }

            );


        return {

            dia:
                mapaDias[
                    valores.weekday
                ],

            minutos:

                Number(
                    valores.hour
                ) * 60 +

                Number(
                    valores.minute
                )

        };


    } catch (error) {


        const ahora =
            new Date();


        const diasLocales = [

            "domingo",

            "lunes",

            "martes",

            "miercoles",

            "jueves",

            "viernes",

            "sabado"

        ];


        return {

            dia:
                diasLocales[
                    ahora.getDay()
                ],

            minutos:

                ahora.getHours() * 60 +

                ahora.getMinutes()

        };

    }

}



// ==============================
// ESTADO DEL NEGOCIO
// ==============================

const estado =

    document.getElementById(
        "estado-negocio"
    );


function actualizarEstadoNegocio() {


    const momento =
        obtenerHoraNegocio();


    const horarioHoy =

        negocio.horario[
            momento.dia
        ];


    if (
        !horarioHoy
    ) {


        estado.textContent =
            "Cerrado hoy";


        estado.className =
            "cerrado";


        return;

    }


    const apertura =

        convertirAMinutos(
            horarioHoy.apertura
        );


    const cierre =

        convertirAMinutos(
            horarioHoy.cierre
        );


    const abierto =

        momento.minutos >= apertura &&

        momento.minutos < cierre;


    if (
        abierto
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


actualizarEstadoNegocio();


setInterval(
    actualizarEstadoNegocio,
    60000
);



// ==============================
// BOTONES PRINCIPALES
// ==============================

const botonWhatsapp =

    document.getElementById(
        "boton-whatsapp"
    );


const botonLlamar =

    document.getElementById(
        "boton-llamar"
    );


const botonMaps =

    document.getElementById(
        "boton-maps"
    );


const botonInstagram =

    document.getElementById(
        "boton-instagram"
    );


const botonFacebook =

    document.getElementById(
        "boton-facebook"
    );


const botonResenas =

    document.getElementById(
        "boton-resenas"
    );



botonWhatsapp.href =

    "https://wa.me/" +

    negocio.whatsapp +

    "?text=" +

    encodeURIComponent(
        negocio.mensajeWhatsapp
    );



botonLlamar.href =

    "tel:" +

    negocio.telefono;



botonMaps.href =
    negocio.maps;



const usuarioInstagram =

    negocio.instagram.replace(
        "@",
        ""
    );


botonInstagram.href =

    "https://www.instagram.com/" +

    usuarioInstagram +

    "/";



if (
    negocio.facebook
) {


    botonFacebook.href =
        negocio.facebook;


} else {


    botonFacebook.style.display =
        "none";

}



botonResenas.href =
    negocio.resenas;