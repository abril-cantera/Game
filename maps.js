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
  XXXXXXXXXXXXXXX
  XI----------XXX
  XXXXXX-XXXXXXXX
  XX-XXX-XXX----X
  XX-----XXX-XXXX
  XX-XXX--------X
  XX-XXXXXXX-XXXX
  XX-XXXXXXX-XXXX
  XX-XXXXXXX-XXXX
  XX--------XXXXX
  XXXXXXXXX-XXXXX
  XXX-XXXXX-XXXXX
  XXX-XXXXX-XXXXX
  XX-------OXXXXX
  XXXXXXXXXXXXXXX
`);
maps.push(`
  XXXXXXXXXXXXXXX
  XO-XXXXXXXXXXXX
  XX----XXXXXXXXX
  X--XX--------XX
  X-XXXX-XXXXX-XX
  X--XXX-XXXXX-XX
  XX-XXX--XXXX-XX
  XX-XXXX-XXXXXXX
  XX----XXX----XX
  XXXXX-XXX-XX-XX
  XXXXX-XXX-XX-XX
  X-XXX-----XX-XX
  X-XIXXXXXXXX-XX
  X------------XX
  XXXXXXXXXXXXXXX
  `);
maps.push(`
  XXXXXXXXXXXXXXX
  XIXXX-XXX-----X
  X-----XXX-XXX-X
  XX-XXXXXX-XXX-X
  XX-----XX-XXX-X
  XXXXXX-XX-XXX-X
  XX-----XX-XXX-X
  XX-XXXXXX-XXX-X
  XX-----XX-XXX-X
  XX-XXXXXX-XXX-X
  XX--------XXX-X
  XXXXXXXXXXXXX-X
  XXXOXXX----XX-X
  XXX-----XX----X
  XXXXXXXXXXXXXXX
`);
maps.push(`
  XXXXXXXXXXXXXXX
  XO-X-------XXXX
  XX-X-XX-XX-XXXX
  XX---XX-XX-XXXX
  XXXXXXX-XX-XXXX
  XXX-----XX-XXXX
  XX--XXXXXX---XX
  XX-XX---XXXX-XX
  X----XXXXXXX-XX
  X-XXX--------XX
  X---X-XXXXXXXXX
  XXXXX-X----XXXX
  XXXXX-X-XX-XXXX
  XXXXX---XX--IXX
  XXXXXXXXXXXXXXX
`);

//La I puede representar el jugador
//La O puede ser la posicion inicial donde comenzara el jugador
//Los - representan espacios en blanco donde no se debe renderizar nada
//Las X representan obstaculos

//El mapa va a ser un arreglo de filas y las filas van a ser un arreglo de columnas
