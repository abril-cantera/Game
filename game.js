const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize;

//Esto calcula el tamaño en px que debe tener el cuadrado para que entren 10 elementos
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

//Esta es la posicion del jugador(objeto)
const playerPosition = {
  x: undefined,
  y: undefined,
};

//Esta es la posicion del objeto fijo, regalo (Objeto)
const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

// 1- Esto se ejecuta cada ves que cargamos el juego
window.addEventListener("load", setCanvasSize);

// 2 -Esto se ejecuta y vuelve a calcular el tamaño del canvas cuando cambiamos el tamaño de la pantalla
window.addEventListener("resize", setCanvasSize);
function fixNumber(n) {
  return Number(n.toFixed(2));
}
// 3- Se ejecuta esta funcion al cargarse el juego
function setCanvasSize() {
  //el ciclo if-else, calcula el tamaño de pantalla que debe usar
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  /* canvasSize = Number(canvasSize.toFixed(0)); */

  //Cambia el tammaño de la pantalla daptandose a el tamaño de el dispositivo
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}

//Encapsula y organiza el codigo
//Inicializa el codigo a ejecutar al principio

//4- Luego ser llama esta funcion
function startGame() {
  console.log({ canvasSize, elementsSize });

  //Con esto le damos el tamaño al emoji
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  showLives();

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  //Con el metodo for.each recorremos la variable de maprowcols, el cual es el array bidimencional a partir del string de nuestro map
  //A partir de este heach recibimos dos parametros que son las filas, el arreglo de las columnas y el indice de cada una de las filas
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      //A partir de cada una de las filas estamos recorriendolo para encontrar a cada una de las columnas de cada fila y ademas al indice de cada columna dentro de sus respectivas filals
      const emoji = emojis[col];

      // A partir de ahi estamos sacando el emoji de la lista de objetos de emojis obteniendo la letra.

      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);
      //Luego calculamos la posicion o coordenada
      //La posicion en X es multiplicar el tamaño que debe tener el elemento por lo que sea que venga en nuestro indice mas uno
      //Lo mismo se hace con la posicion Y

      //Si la columna es igual a la 'O'
      if (col == "O") {
        //Si la posicion falsa del jugador en 'X' y la posicion falsa del jugador en 'Y' se cumpla...
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  //Se crea una variable por cada distinta colicion que pudiese llegar a haber en 'X' o en 'Y'
  //Esta variable es igual a si el valor de la posicion del jugador en el eje 'X' es igual a la posicion del regalo en el mismo eje
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);

  //Si hubiese un error en la colicion por la cantidad de desimales se puede usar .toFixed(n° de decimales) luego de los ejes

  //Lo mismo se hace con el eje 'Y'
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);

  //En esta variable verificamos si las variables de giftColition en eje 'X' e 'Y' sean true
  const giftCollision = giftCollisionX && giftCollisionY;

  //Aca estamos verificando si giftColition es true
  if (giftCollision) {
    //De ser asi, el jugador pasa al siguiente nivel
    levelWin();
  }

  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  //Aca estamos verificando si enemyColision es true
  if (enemyCollision) {
    //De ser asi, el jugador pierde una vida
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log("Subiste de nivel");
  level++;
  startGame();
}

function levelFail() {
  console.log("Chocaste contra un enemigo :(");
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}

function gameWin() {
  console.log("¡Terminaste el juego!");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "SUPERASTE EL RECORD :)";
    } else {
      pResult.innerHTML = "lo siento, no superaste el records :(";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML =
      "Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)";
  }
  console.log({ recordTime, playerTime });
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);

  spanLives.innerHTML = "";
  heartsArray.forEach((heart) => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

//.trim ayuda a limpiar los espacios en blanco que esten al inicio o fin de los string

//El fin del array multidimencional es ser el mapa del juego

//Define el lugar donde va a empezar y terminar el trazo
//game.fillRect(0,0,100,100);

//Define el lugar donde va a epezar y terminar de borrar el trazo
//1°, lo mueve en el eje de las x, a los costados
//2°, lo mueve en el eje de las y, arriba y abajo
//4°, lo agaranda a lo alto
//5°, lo agranda a los ancho
//game.clearRect(0,0,90,90);

//Esto inserta texto y las posisciones
//game.fillText('aca adentro va el texto', 50, 50);
//Tambien se le pueden poner propiedades de estilos
// game.font = '25px Verdana';
// game.fillStyle = 'purple';
// game.textAlign = 'center';

//MOVIMIENTOS DEL JUGADOR

//Este evento hace que cuando se deje de presionar una tecla se ejecuten las instrucciones
window.addEventListener("keydown", moveByKeys);

//Estos eventos son para los movimientod de los botones en pantalla
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

//Estas son las funciones que dan el mensaje de lo que queremos hacer al presionar los botones en pantalla
function moveUp() {
  console.log("Me quiero mover hacia arriba");
  //El if verifica que el resultado de la posisicion del jugador en el eje 'Y' hacia arriba menos el tamaño del elemento sea menor que el tamaño del elemento, de ser asi se debe dejar de mover el jugador
  if (playerPosition.y - elementsSize < elementsSize) {
    console.log("OUT");
  } else {
    //De no cumplirse la condicion a la posicion del jugador se le resta el tamaño del elemento y se ejecuta la funcion startgame
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  console.log("Me quiero mover hacia izquierda");
  if (playerPosition.x - elementsSize < elementsSize) {
    console.log("OUT");
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  console.log("Me quiero mover hacia derecha");
  if (playerPosition.x + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
  if (playerPosition.y + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}

// setInterval(() =>
// console.log('texto'), n° tiempo en ms)
// Esto hace que cada cierto intervalo de tiempo se ejecute un bloque de codigo.
// Si fuese un hola cada 2 segundo, esto va a ahacer que el hola se ejecute infinitas veces cada 2 segundos.

//Para parar esto podemos guardar ese setInterval en una variable y  ejecutar:
//clearInterval(nombre de la variable)

//setTimeout (() =>
//console.log('texto'), n° tiempo en ms)
//Esto hace que el codigo se ejecute despues de pasar ese tiempo
