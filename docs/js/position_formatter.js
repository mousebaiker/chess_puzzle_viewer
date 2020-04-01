var pieceNames = new Map([
  ["P", "Pawn"],
  ["N", "Knight"],
  ["R", "Rook"],
  ["B", "Bishop"],
  ["Q", "Queen"],
  ["K", "King"],
])

var addPiece = function(m, piece, square) {
  var name = pieceNames.get(piece)
  if (!m.has(name)) {
    m.set(name, [])
  }
  m.get(name).push(square)
}

var buildColorPieces = function(position) {
  var entries = Object.entries(position)
  var whites = new Map()
  var blacks = new Map()
  for (const [square, piece] of entries) {
    is_white = piece[0] == "w"
    current_map = is_white ? whites : blacks
    addPiece(current_map, piece[1], square)
  }
  return  [whites, blacks]
}


var buildPieceString = function(name, squares) {
  if (squares.length > 1) {
    name = name + "s"
  }
  description = "&nbsp;&nbsp;&nbsp;&nbsp;" + name + ": " + squares.join(', ')
  return description
}

var getFormatedPosition = function(pieceMaps) {
  whites = pieceMaps[0]
  blacks = pieceMaps[1]
  result = ["<b>Whites:</b>"]
  for (const [name, squares] of whites.entries()) {
    description = buildPieceString(name, squares)
    result.push(description)
  }

  result.push("<b>Blacks:</b>")
  for (const [name, squares] of blacks.entries()) {
    description = buildPieceString(name, squares)
    result.push(description)
  }
  return result.join("<br>")
}
