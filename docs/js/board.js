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

var init = function() {
  var fenpath = 'https://raw.githubusercontent.com/mousebaiker/chess_puzzle_viewer/master/docs/materials/fens.txt'
  var answerspath = 'https://raw.githubusercontent.com/mousebaiker/chess_puzzle_viewer/master/docs/materials/answers.txt'
  data = new DataHolder(fenpath, answerspath)
  puzzle = data.getPuzzle(114);
  var puzzle_name = puzzle[0][0];
  var puzzle_fen = puzzle[0][1];
  console.log(typeof(puzzle_fen))
  var puzzle_answer = puzzle[1];
  var board = ChessBoard('board',
  {'draggable': true,
   'position': puzzle_fen.slice(0, puzzle_fen.length - 1)});
  document.getElementById('name').textContent = puzzle_name;
}
$(document).ready(init)


// $('#startBtn').on('click', board2.start);
// $('#clearBtn').on('click', board2.clear);
