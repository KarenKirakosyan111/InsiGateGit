var app = angular.module("myApp", ["ngTable", "ui.bootstrap"]);

app.service("Devices", function() {
    this.getDevices = function() {
        return listOfDevice;
    }
});

app.controller("myCtrl", [
    '$scope',
    'Devices',
    'NgTableParams',
    // '$uibModal',
    function($scope, Devices, NgTableParams) {
        var n = 0;
        if (n == 0) {
            $scope.obj = Devices.getDevices();
            n = 1;
        }
        $scope.showAdd = true;
        $scope.showModal = false;
        $scope.tableParams = new NgTableParams({}, { dataset: $scope.obj });

        $scope.addItem = function(data) {
            var newItem = {
                'Branding': $scope.newBranding || ' ',
                'Device': $scope.newDev || ' ',
                'Model': $scope.newModel || ' ',
                'MarketingName': $scope.newMar || ' '
            };
            $scope.obj.push(newItem);
            // console.log($scope.obj[$scope.obj.length - 1]);
            $scope.tableParams.reload();
            $scope.newBranding = "";
            $scope.newMar = "";
            $scope.newDev = "";
            $scope.newModel = "";
        }

        $scope.deleteItem = function(item) {
            // console.log($scope.obj[$scope.obj.length - 1]);
            var index = $scope.obj.indexOf(item);
            if (index < 0) {
                return;
            }
            $scope.obj.splice(index, 1);
            $scope.tableParams.reload();
        }

        $scope.open = function() {
            console.log("edit button click");
            $scope.showModal = true;



            // $uibModal.open({
            //     animation: $sco.animationsEnabled,
            //     ariaLabelledBy: 'modal-title',
            //     ariaDescribedBy: 'modal-body',
            //     templateUrl: 'myModalContent.html',
            //     controller: 'ModalInstanceCtrl',
            //     controllerAs: '$ctrl',
            //     size: size,
            //     appendTo: parentElem,
            //     resolve: {
            //         // items: function() {
            //         //     return $ctrl.items;
            //         // }
            //     }
            // });

            // modalInstance.result.then(function(selectedItem) {
            //     $ctrl.selected = selectedItem;
            // }, function() {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });



        };

        $scope.ok = function() {
            $scope.showModal = false;
        };

        $scope.cancel = function() {
            $scope.showModal = false;
        };


        // $scope.editItem = function(item) {

        //     // var index = $scope.obj.indexOf(item);
        //     // $scope.obj.splice(index, 1);
        // }

    }
]);
// app.controller("editCtrl",  function ($uibModal, $log, $document) {
//   var $ctrl = this;
//   $ctrl.items = ['item1', 'item2', 'item3'];

//   $ctrl.animationsEnabled = true;

//   $ctrl.open = function (size, parentSelector) {
//     var parentElem = parentSelector ? 
//       angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
//     var modalInstance = $uibModal.open({
//       animation: $ctrl.animationsEnabled,
//       ariaLabelledBy: 'modal-title',
//       ariaDescribedBy: 'modal-body',
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       controllerAs: '$ctrl',
//       size: size,
//       appendTo: parentElem,
//       resolve: {
//         items: function () {
//           return $ctrl.items;
//         }
//       }
//     });