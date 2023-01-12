
const miModulo = (()=>{
'use strict';

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];
  
  let puntosJugadores = [];

  // referencias html
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

        const divCartasJugadores = document.querySelectorAll('.divCartas'),
              playerpounts = document.querySelectorAll("small");
        

// inicializar juego
        const inicializarJuego = (numJugadores = 2)=>{
         deck = crearDeck();

         puntosJugadores= [];
         for (let i= 0; i < numJugadores; i++){
         puntosJugadores.push(0);
         }

         playerpounts.forEach(elem => elem.innerText= 0);
         divCartasJugadores.forEach(elem => elem.innerHTML = '');


         btnPedir.disabled = false;
         btnDetener.disabled = false;

         
        }

// Esta funcion cre una nueva baraja
const crearDeck = () => {
  deck = [];

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  return _.shuffle(deck);
};

// esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  return deck.pop();
};



const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1;
};


const acumularPuntos =  (carta, turno) => {

puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
playerpounts[turno].innerText =puntosJugadores[turno];
return puntosJugadores[turno];

}

const crearCarta = (carta,turno) => {

  const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("cartas");
    divCartasJugadores[turno].append(imgCarta);
 }

 const determinarGanador = () => {

  const [puntosMinimos, puntosComputadora] = puntosJugadores;
  

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("jugador gana");
    } else {
      alert("Computadora gana");
    }
  }, 100);

 }
// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

  let puntosComputadora= 0;

  do {
    const carta = pedirCarta();
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
    crearCarta(carta, puntosJugadores.length-1);

    // digamos q aca si bien la compu no debe superar los puntos minimos, aveces por sacar una carta aleatoria se puede pasr, sobre todo cuando se trata de numeros altos, es decir cerca de 21
  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

  determinarGanador();

 
};

// eventos
btnPedir.addEventListener("click", () => {

  const carta = pedirCarta();
  const puntosJugador = acumularPuntos(carta, 0);
  
  crearCarta(carta, 0);

 

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, ya perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, Genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugadores[0]);
});

// btnNuevo.addEventListener("click", () => {
  
//   inicializarJuego();
 
// });

return {
  nuevoJuego : inicializarJuego
};

})();



// TODO: YA TERMINE EL JUEGO PER LO Q YO QUIERO SABER BASICAMENTE ES DE DONDE SACA SUS CARTAS LA COMPUTADORA(MAÑANA INVESTIGAR ESO, LEEER EL CODIGO)