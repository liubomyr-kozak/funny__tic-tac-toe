'use strict';
var GameApp = angular.module('game', []);
GameApp.controller('gameBoardController', ['$timeout', '$scope', function ($timeout, $scope) {

  $scope.player_count = 2;
  $scope.rollCount = 3;

  $scope.boardSize = 10
}]);