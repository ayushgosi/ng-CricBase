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

    .when('/form', {
      templateUrl: 'pages/form.htm',
      controller: 'formController',
      controllerAs: 'form'
    })
});

//Services


//Controllers
cricBase.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
  var vm = this;

  var ref = new Firebase('https://cricbase626262.firebaseio.com/Matches');
  vm.matches = $firebaseArray(ref);
  console.log(vm.matches);

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

}]);

cricBase.controller('formController', ['$scope', '$firebaseArray', '$resource', '$timeout', function($scope, $firebaseArray, $resource, $timeout){
  var vm = this;

  var ref = new Firebase('https://cricbase626262.firebaseio.com/Matches');
  vm.matchData = $firebaseArray(ref);

  function match(){
    this.firstTeam = '';
    this.secondTeam = '';
    this.city = '';
    this.stadium = '';
    this.date = '';
    this.format = '';
    this.league = '';
  }
  vm.newMatch = new match();
  vm.bool = false;

  vm.addMatch = function(){
    vm.matchData.$add(vm.newMatch);
    vm.newMatch = new match();
    // vm.bool = true;
    // $timeout(function(){
    //   vm.bool = false;
    // },2000);
  }

}]);
