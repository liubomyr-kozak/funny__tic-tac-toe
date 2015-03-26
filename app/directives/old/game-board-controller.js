GameApp.controller('gameBoardCtroller', ['$timeout', '$scope', function ($timeout, $scope) {
 
  $scope.minions = [
    {name: 'minion-1'},
    {name: 'minion-2'},
    {name: 'minion-3'},
    {name: 'minion-4'},
    {name: 'minion-5'},
    {name: 'minion-6'},
    {name: 'minion-7'},
    {name: 'minion-8'},
    {name: 'minion-9'}
  ];

  $scope.player1 = {
    className:"",
    defaultClassName: "zero",
    wins:0
  };

  $scope.player2 = {
    className:"",
    defaultClassName: "cross",
    wins:0
  };

  $scope.notification = {
    isVisible: false,
    text: ""
  };

  $scope.$on('EndGame', function(event, playerIndex){

    if(playerIndex){
      $scope['player'+playerIndex].wins = $scope['player'+playerIndex].wins +1;
      $scope.notification.text = "Виграв гравець номер " + playerIndex;
    }else{
      $scope.notification.text = "Мир дружба жвачка =), в нас два чемпіона";
    }

    $scope.notification.isVisible = true;
  });

  $scope.restart = function(){
    $scope.notification.isVisible = false;



        angular.element(
          document
            .getElementsByClassName('box_block'))
            .append('<div id="item1" class="bomb" draggable></div>'
        );



    //angular.$digest()

    $scope.$broadcast('restartGame');
  };

  $scope.setClassToPlayer = function (playerIndex, className) {
    $scope['player' + playerIndex].className = className
  };


  [
    [{cell: 2, bomb: 0}],[{cell: 1, bomb: 0}],[{cell: 0, bomb: 0}]
  ]
}]);