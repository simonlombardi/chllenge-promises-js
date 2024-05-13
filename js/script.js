let jugadoresJugando = []
let jugadoresBanco = []
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
    let jugadores = obtenerJugadoresLocalStorage();
    if(jugadores.length < 23){
        try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        let posicion = prompt("Ingrese la posición del jugador:");
        let estado = confirm('El jugador es titular?')

        if (estado){
            estado = 'jugando'
        }
        else{
            estado = 'banco'
        }


        // Obtener los jugadores del localStorage
        

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ id: (jugadores.length) +1, nombre, edad, posicion, estado });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(mostrarAlerta('Jugador agregado correctamente.'), 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
    }
    else{
        alert('Ya hay 22 jugadores en el equipo')
    }
    

};

const verificarListaJugadores = (jugador) => {
    if (jugador.estado == 'jugando'){
        let indice = jugadoresBanco.indexOf(jugador);
        if (indice !== -1) {
            jugadoresBanco.splice(indice, 1);
        } else {
            jugadoresJugando.push(jugador)
        }
    }
    else if(jugador.estado == 'banco'){
        let indice = jugadoresJugando.indexOf(jugador);
        if (indice !== -1) {
            jugadoresJugando.splice(indice, 1);
        } else {
            jugadoresBanco.push(jugador)
        }
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
        const estadoJugador = document.createElement('p')
        const botonPosicion = document.createElement('button')        
        nombreJugador.textContent = jugador.nombre
        edadJugador.textContent = jugador.edad
        posicionJugador.textContent = jugador.posicion
        estadoJugador.textContent = jugador.estado
        botonPosicion.textContent = "Cambiar posicion"
        botonPosicion.addEventListener('click', (e) => asignarPosicion(e, jugador))
        elementoJugador.appendChild(nombreJugador)
        elementoJugador.appendChild(edadJugador)
        elementoJugador.appendChild(posicionJugador)
        elementoJugador.appendChild(estadoJugador)
        elementoJugador.appendChild(botonPosicion)
        listaJugadores.appendChild(elementoJugador)
        verificarListaJugadores(jugador)

})}

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
const realizarCambio = async () => {
    const cambios = document.getElementById('cambios')

    const selectTitulares = document.createElement('select')
    const placeHolderTitular = document.createElement('option')
    placeHolderTitular.text = 'Seleccione un jugador en el campo'
    selectTitulares.appendChild(placeHolderTitular)
    jugadoresJugando.forEach(jugador => {
        const opcion = document.createElement('option')
        opcion.text = jugador.nombre
        opcion.value = jugador.nombre
        selectTitulares.appendChild(opcion)
    })

    const selectSuplentes = document.createElement('select')
    const placeHolderSuplente = document.createElement('option')
    placeHolderSuplente.text = 'Seleccione un jugador en el banco'
    selectSuplentes.appendChild(placeHolderSuplente)
    jugadoresBanco.forEach(jugador => {
        const opcion = document.createElement('option')
        opcion.text = jugador.nombre
        opcion.value = jugador.nombre
        selectSuplentes.appendChild(opcion)
    })
    cambios.appendChild(selectTitulares)
    cambios.appendChild(selectSuplentes)
    const btnCambio = document.createElement('button')
    btnCambio.textContent = "Realizar cambio"
    cambios.appendChild(btnCambio)
    btnCambio.addEventListener('click', () => {
        let jugadorCancha = selectTitulares.value
        jugadorCancha = jugadoresJugando.find(jugador => jugadorCancha == jugador.nombre)
        let jugadorBanco = selectSuplentes.value
        jugadorBanco = jugadoresBanco.find(jugador => jugadorBanco == jugador.nombre)
        jugadorCancha = {...jugadorCancha, estado: 'banco'}
        jugadorBanco = {...jugadorBanco, estado: 'jugando'}
        listarJugadores()
        cambios.style.display = 'none'
    })
};

const eliminarEquipo = () => {
    localStorage.clear()
    listarJugadores()
}

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
