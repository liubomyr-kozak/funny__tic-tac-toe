GameApp.directive('gameBoard', ['$timeout', 'gameCoreFactory', function ($timeout, gameCore) {
  return {
    restrict: "E",
    replace: true,
    scope:{
      player1: "=",
      player2: "="
    },
    template: '<table id="board-table">\
      <tr ng-repeat="row in board">\
        <td id="c-{{ $parent.$index}}-{{$index}}" ng-repeat="cell in row" ng-click="getCell($event)">\
          <span >&nbsp;</span>\
          <span droppable  style="opacity: 0.3;" drop="handleDrop()"></span>\
        </td>\
      </tr>\
      </table>',
    link: function ($scope) {

      var audioHehehe = new Audio('./app/assets/sound/hehehe.mp3');
      var audioExplosion = new Audio('./app/assets/sound/explosion.mp3');

      function createBoard(){
        var gameBoard = [];
        for(var i = 0; i < 3; i++ ){
          var row = [];
          for(var j = 0; j < 3; j++ ) row.push({cell: 0, bomb: 0})
          gameBoard.push(row)
        }
        $scope.board = gameBoard;

        gameCore.setBoardData($scope.board);
      }

      createBoard();

      $scope.$on('restartGame', function () {
        createBoard();
      });

      gameCore.setBoardData($scope.board);

      function endGame(playerIndex){
        $scope.$emit('EndGame',playerIndex);
      }

      $scope.getCell = function (element) {
        var
          posX,
          posY,
          td = getTargetTdNode(element.target);

        posX = td.id.replace(/c-/, '').replace(/-.*/, '');
        posY = td.id.replace(/c-/, '').replace(/.*-/, '');

        if (!gameCore.checkIsCellClearAndNoWinner(posX, posY)) {
          changeCell(posX, posY, td);
          gameCore.checkWinner(endGame);
        }
      };

      $scope.$on('bombIdDropped', function (event, nv) {
        var row = nv.replace(/c-/, '').replace(/-.*/, '');
        var col = nv.replace(/c-/, '').replace(/.*-/, '');

        $scope.board[row][col].bomb = 1;
        gameCore.setBoardData($scope.board);

      });

      function changeCell(row, col, cell) {

        var currentPlayer = gameCore.currentPlayer();

        if (gameCore.checkIsBombDropped(row, col)) {
          angular.element(cell).addClass(getCurrentUserClass(currentPlayer));
          emulateExplosion(currentPlayer, cell);
          return
        }

        $scope.board[row][col].cell = currentPlayer;

        gameCore.setBoardData($scope.board);

        var id = '#c-' + row + '-' + col;

        if (currentPlayer == 1) {
          angular.element(cell).addClass(getCurrentUserClass(1));
        }
        else {
          angular.element(cell).addClass(getCurrentUserClass(2));
        }
      }

      function getCurrentUserClass(playerIndex){
        var player = $scope['player'+playerIndex];
        return player.className ? player.className : player.defaultClassName;
      }

      function emulateExplosion(playerIndex, cell) {

        $timeout(function () {
          audioExplosion.play();
          angular.element(cell).removeClass(getCurrentUserClass(playerIndex));
          dropBomb(cell);
        }, 500);

        if(getCurrentUserClass(playerIndex).slice(0,-2) == 'minion'){
         $timeout(function () {
              audioHehehe.play();
          }, 800);
        }
      }

      function dropBomb(cell) {
        angular.element(cell).find('span')[1].innerHTML = "&nbsp;";
        gameCore.setBombToUsed();
      }

      function getTargetTdNode(element) {
        var firstParent = angular.element(element).parent()[0];
        var secondParent = angular.element(element).parent().parent()[0];

        return firstParent.nodeName == 'TD' ? firstParent : secondParent;
      }
    }
  }
}]);