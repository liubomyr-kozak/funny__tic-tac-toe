GameApp.factory('gameCoreFactory', function () {

  var board = [];
  var winningPlayer = 0;


  function setBoardData(BoardArr) {
    board = BoardArr;
  }

  var turn = {
    number: 0,
    currentPlayer: function () {
      if (this.number % 2 === 0) {
        return 1;
      }
      else {
        return 2;
      }
    },
    changeTurn: function () {
      this.number += 1;
    }
  };

  function currentPlayer(){
    return turn.currentPlayer();
  }

  function checkRows() {
    for (var i = 0; i < board.length; i++) {
      var same = true;
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j].cell === 0 || board[i][j].cell !== board[i][0].cell) {
          same = false;
        }
      }
      if (same) {
        return same;
      }
    }
  }

  function checkCols() {
    for (var i = 0; i < board.length; i++) {
      var same = true;
      for (var j = 0; j < board[i].length; j++) {
        if (board[j][i].cell === 0 || board[j][i].cell !== board[0][i].cell) {
          same = false;
        }
      }
      if (same) {
        return same;
      }
    }
  }

  function checkDiag() {
    var same = true;
    for (var i = 0; i < board.length; i++) {
      if (board[i][i].cell === 0 || board[i][i].cell !== board[0][0].cell) {
        same = false;
      }
    }
    if (same) {
      return same;
    }
    same = true;
    for (var i = 0; i < board.length; i++) {
      if (board[i][2 - i].cell === 0 || board[i][2 - i].cell !== board[0][2].cell) {
        same = false;
      }
    }
    if (same) {
      return same;
    }
  }

  function checkTie() {
    var flattenedBoard = Array.prototype.concat.apply([], board);
    for(var i = 0; i < flattenedBoard.length; i++){
      if (flattenedBoard[i].cell === 0) {
        return false;
      }
    }
    return true;
  }

  function checkWinner(endGame) {
    if (checkRows() === true || checkCols() === true || checkDiag() === true) {
      winningPlayer = currentPlayer();
      endGame(winningPlayer)
    }
    else if (checkTie() === true) {
      endGame(0)
    }
    else {
      turn.changeTurn();
    }
  }

  function checkIsCellClearAndNoWinner(row, col) {
    return (board[row][col].cell) && !winningPlayer;
  }

  var bombIsUsed = false;
  function checkIsBombDropped(row, col) {
    return !bombIsUsed && board[row][col].bomb;
  }

  function setBombToUsed() {
    bombIsUsed = true;
  }


  function endGame(message) {
    alert(message);
    location.reload();
  }

  return {
    checkWinner: checkWinner,
    checkIsCellClearAndNoWinner: checkIsCellClearAndNoWinner,
    checkIsBombDropped: checkIsBombDropped,
    setBoardData: setBoardData,
    setBombToUsed: setBombToUsed,
    currentPlayer:currentPlayer
  }
});

