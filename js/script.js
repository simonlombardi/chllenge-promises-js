let jugadoresJugando = []
let jugadoresBanco = []
let contadorCambios = 0
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
        let estado = prompt('Ingrese el estado del jugador: ti (titular), su (suplente), le (lesionado)')

        if (estado.toLowerCase() === 'ti'){
            estado = 'jugando'
        }
        else if (estado.toLowerCase() === 'su'){
            estado = 'banco'
        }
        else if (estado.toLowerCase() === 'le'){
            estado = 'lesionado'
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
    listarJugadores()

};

const separarListaJugadores = (jugadores) => {
    jugadoresJugando = []
    jugadoresBanco = []
    jugadores.forEach(jugador => {
        if(jugador.estado === 'jugando'){
            jugadoresJugando.push(jugador)
        }
        else if(jugador.estado === 'banco'){
            jugadoresBanco.push(jugador)
        }
    })
}

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    // Implementación para listar todos los jugadores
    const jugadores = await obtenerJugadoresLocalStorage()
    separarListaJugadores(jugadores)
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
    if (contadorCambios < 5){
        const cambios = document.getElementById('cambios')
        const jugadores = await obtenerJugadoresLocalStorage()
        const selectTitulares = document.createElement('select')
        selectTitulares.id = Date.now()
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
        selectSuplentes.id = Date.now()
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
            for (let i = 0; i < jugadores.length; i++){
                if(jugadores[i].nombre === jugadorCancha.nombre){
                    jugadores[i] = jugadorCancha
                }
                else if(jugadores[i].nombre === jugadorBanco.nombre){
                    jugadores[i] = jugadorBanco
                }
            }
            guardarJugadoresLocalStorage(jugadores)
            listarJugadores()
            while (cambios.firstChild) {
                cambios.removeChild(cambios.firstChild);
            }
            contadorCambios++
        })
    }
    else{
        alert('Ya se han realizado los 5 cambios')
    }
    
};

const eliminarEquipo = () => {
    localStorage.clear()
    listarJugadores()
}

