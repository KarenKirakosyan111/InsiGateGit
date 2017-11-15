
'use strict';
 
angular.module('seaBattleApp').controller('seaBattleController', 
    ['$scope', '$http',  '$state' , function($scope, $http, $state){
    $scope.userNick = null;
    $scope.warningMessage = "";
    $scope.checkNickName = false;

    $scope.loginFn = function() {
        console.log("on cklich sign in");
        if($scope.userNick == null) {
            $scope.checkNickName = true;
            $scope.warningMessage = "You must enter a username."; 
            return;
        }
        $http({
               method: 'POST',
               url: '/postadd', 
               headers: {"Content-Type": "application/json;charset=UTF-8"},
               data: { userNick: $scope.userNick}
           }).then(function mySuccess(res) {
            console.log(res.data.success);

                if(res.data.success){
                 $state.go('play_board');

                }
                else{
                    
                    $scope.checkNickName = true;
                    $scope.warningMessage = "User by that  name already exists. Try another name.";
                  }
           }, 
           function myError(err) {
           alert('You have some error to connection with server');
           }); 
        $scope.checkNickName = false;
    }  
}]);