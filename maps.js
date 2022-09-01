const emojis = {
  "-": " ",
  O: "🚪",
  X: "💣",
  I: "🧠",
  PLAYER: "🧟‍♂️",
  BOMB_COLLISION: "🔥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤️",
};
const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  XX-X----XX
  XX-X-XX-XX
  XX---XX-XX
  XXXXXXX-XX
  XXX-----XX
  XX--XXXXXX
  XX-XX---XX
  XX----XIXX
  XXXXXXXXXX
`);

//La I puede representar el jugador
//La O puede ser la posicion inicial donde comenzara el jugador
//Los - representan espacios en blanco donde no se debe renderizar nada
//Las X representan obstaculos

//El mapa va a ser un arreglo de filas y las filas van a ser un arreglo de columnas
