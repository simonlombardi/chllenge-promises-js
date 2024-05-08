// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};
const mostrarAlerta = (msj) => {
    alert(msj)
}
// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ id: (jugadores.length) +1, nombre, edad, posicion });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(mostrarAlerta('Jugador agregado correctamente.'), 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    // Implementación para listar todos los jugadores
    const jugadores = await obtenerJugadoresLocalStorage()
    const listaJugadores = document.getElementById('listaJugadores')
    while(listaJugadores.firstChild){
        listaJugadores.removeChild(listaJugadores.firstChild)
    }

    jugadores.forEach(jugador => {
        const elementoJugador = document.createElement('li')
        const nombreJugador = document.createElement('p')
        const edadJugador = document.createElement('p')
        const posicionJugador = document.createElement('p')
        const botonPosicion = document.createElement('button')
        nombreJugador.textContent = jugador.nombre
        edadJugador.textContent = jugador.edad
        posicionJugador.textContent = jugador.posicion
        botonPosicion.textContent = "Cambiar posicion"
        botonPosicion.addEventListener('click', (e) => asignarPosicion(e, jugador))
        elementoJugador.appendChild(nombreJugador)
        elementoJugador.appendChild(edadJugador)
        elementoJugador.appendChild(posicionJugador)
        elementoJugador.appendChild(botonPosicion)
        listaJugadores.appendChild(elementoJugador)
    });
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (e, jugadorAntiguaPosicion) => {
    const jugadores = await obtenerJugadoresLocalStorage()
    const elementoJugador = e.target.parentElement
    const jugadorCambiarPosicion = jugadores.find(jugador => jugador.id == jugadorAntiguaPosicion.id)
    const nuevaPosicion = prompt('Ingrese la nueva posicion')
    jugadores[jugadores.indexOf(jugadorCambiarPosicion)] = {...jugadorAntiguaPosicion, posicion: nuevaPosicion}
    guardarJugadoresLocalStorage(jugadores)
    listarJugadores()

};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
