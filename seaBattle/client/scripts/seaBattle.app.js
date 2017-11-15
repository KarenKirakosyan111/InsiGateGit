
angular.module('seaBattleApp', [
    'btford.socket-io',
    'ui.router'

]).config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('login');
    
    $stateProvider
        
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'seaBattleController'
        })
        
        .state('play_board', {
            url: '/board',
            templateUrl: '../playBoard.html',
            controller: 'boardController'
        })
        
}).factory('seaBattleSocket', [
    'socketFactory',

    function (socketFactory) {
    return socketFactory();
}]);