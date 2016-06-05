//Modules
var cricBase = angular.module('cricBase', ['ngRoute', 'ngResource', 'ngAnimate', 'firebase']);

//Routes
cricBase.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'pages/main.htm',
    controller: 'mainController',
    controllerAs: 'main'
  })

});

//Services


//Controllers
cricBase.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
  var vm = this;

  var ref = new Firebase('https://cricbase626262.firebaseio.com/Matches');
  vm.matches = $firebaseArray(ref);

  //Add New Match
  function match(){
    this.match = '';
    this.venue = '';
    this.date = '';
    this.format = 'Format';
    this.league = 'League';
  }
  vm.newMatch = new match();

  vm.addMatch = function(){
    vm.matches.$add(vm.newMatch);
    vm.newMatch = new match();
  };

  //Format/League Values
  // vm.formats = {
  //
  // }

  //Toggle Edit/Delete for elements
  vm.toggle = false;
  vm.labelName = function(){
    if(vm.toggle){
      return 'done';
    }
    else {
      return 'edit';
    }
  };
  vm.color = function(){
    if(vm.toggle){
      return 'btn-success';
    }
    else{
      return 'btn-warning';
    }
  };

  //Remove/Update Elements
  vm.removeMatch = function(match){
    vm.matches.$remove(match);
  }
  vm.editMatch = function(match){
    vm.matches.$save(match);
  }

}]);
