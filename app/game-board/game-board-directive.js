GameApp.directive('gameBoard', function(){
  return {
    scope:{
      boardSize: "="
    },
    templateUrl: './app/game-board/game-board.html',
    controller:function(){

    },
    link: function(scope, element){

      function createBoard(){
        var gameBoard = [];
        for(var i = 0; i < scope.boardSize; i++ ){
          var row = [];
          for(var j = 0; j < scope.boardSize; j++ ) row.push({cell: 0, bomb: 0})
          gameBoard.push(row)
        }
        scope.board = gameBoard;
      }
      createBoard()
    }
  }
});