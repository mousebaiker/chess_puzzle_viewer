function DataHolder(fenPath, answersPath) {
  this.fendata = null;
  this.answerdata = null;
  this.fenpath = fenPath;
  this.answerspath = answersPath;
  this.getPuzzlewithData = function(puzzleNumber) {
    return [this.fendata[puzzleNumber], this.answerdata[puzzleNumber]];
  }
  this.loadData = function() {
    $.ajax({
      url: this.fenpath,
      async: false,
      success: function (data) {
        this.fendata = data.split('\n');
        for (var i = 0; i < this.fendata.length; i++) {
          this.fendata[i] = this.fendata[i].split(';');
        }
      }.bind(this)
    });

    $.ajax({
      url: this.answerspath,
      async: false,
      success: function (data) {
        this.answerdata = data.split('\n');
        for (var i = 0; i < this.answerdata.length; i++) {
          this.answerdata[i] = this.answerdata[i].split(' ').slice(1).join(' ');
        }
      }.bind(this)
    });
  };

  this.getPuzzle = function(puzzleNumber) {
    puzzleNumber--;
    if (this.fendata === null) {
      this.loadData();
    }
    return this.getPuzzlewithData(puzzleNumber);
  }
}

var parseHash = function() {
  hash = document.location.hash
  if (hash.length == 0) {
    hash = "#1"
  }
  hash = parseInt(hash.slice(1))
  return hash
}

var data = null;
var board = null;

var init = function() {
  var fenpath = 'https://raw.githubusercontent.com/mousebaiker/chess_puzzle_viewer/master/docs/materials/fens.txt'
  var answerspath = 'https://raw.githubusercontent.com/mousebaiker/chess_puzzle_viewer/master/docs/materials/answers.txt'
  data = new DataHolder(fenpath, answerspath)
  board = ChessBoard('board',
  {'draggable': true,
   'position': 'start',
    'showNotation': false});
  updatePage(0);
}
$(document).ready(init)

var updatePage = function(hashIncrement) {
  var hash = parseHash()
  hash += hashIncrement;
  var puzzle = data.getPuzzle(hash);
  var puzzle_name = puzzle[0][0];
  var puzzle_fen = puzzle[0][1];
  var puzzle_answer = puzzle[1];
  board.position(puzzle_fen.slice(0, puzzle_fen.length - 1));
  document.getElementById('name').textContent = puzzle_name;
  document.getElementById('answer').open = false;
  document.getElementById('answer_text').textContent = puzzle_answer;
  document.location.hash = "#" + hash.toString();
}

// $('#startBtn').on('click', board2.start);
// $('#clearBtn').on('click', board2.clear);
