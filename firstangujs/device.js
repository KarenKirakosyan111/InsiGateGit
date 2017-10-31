var app = angular.module("myApp", ['ngTable', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);


app.service('Devices', ['$http', function($http) {
    // var devicearr = [];
    // this.getDevices = function() {
    //     return devicearr;
    // };

    this.getRequest = function(successCallback, errorCallback) {
        $http({
            method: 'GET',
            url: '/supporteddevices'
        }).then(successCallback, errorCallback);
    };

    this.addRequest = function(item, successCallback, errorCallback) {
        $http({
            method: 'POST',
            url: '/postadd',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: item
        }).then(successCallback, errorCallback);
    };

    this.deleteRequest = function(index, successCallback, errorCallback) {
        $http({
            method: 'DELETE',
            url: '/deletedev',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: { "index": index }
        }).then(successCallback, errorCallback);
    };

    this.editRequest = function(index, item, successCallback, errorCallback) {
        $http({
            method: 'PUT',
            url: '/editdev',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: {
                "index": index,
                "object": item
            }
        }).then(successCallback, errorCallback);
    };

}]);


app.controller('myCtrl', [
    '$scope',
    'Devices',
    'NgTableParams',
    '$uibModal',
    '$document',

    function($scope, Devices, NgTableParams, $uibModal, $document) {
        // var n = 0;
        // if (n == 0) {
        //     $scope.obj = Devices.getDevices();
        //     n = 1;
        // }

        Devices.getRequest(function(res) {

            $scope.obj = res.data;
            // console.log(Object.prototype.toString.call($scope.obj), "tape of obj")
            $scope.tableParams = new NgTableParams({}, { dataset: $scope.obj });

        }, function(err) {
            console.log(err, '-------------err------------')
        });
        $scope.showAdd = true;

        $scope.addItem = function() {
            console.log("addfunk");
            var newItem = {
                'Branding': $scope.newBranding || ' ',
                'Device': $scope.newDev || ' ',
                'Model': $scope.newModel || ' ',
                'MarketingName': $scope.newMar || ' '
            };

            console.log("resfunk", "-------------");

            Devices.addRequest(newItem, function(res) {
                console.log("resfunk");
                console.log(newItem);

                $scope.obj.push(newItem);
                $scope.tableParams.reload();
                $scope.newBranding = "";
                $scope.newMar = "";
                $scope.newDev = "";
                $scope.newModel = "";

            }, function(err) {
                console.log(err, '-------------err  ADDDD------------')
            });
        }

        $scope.deleteItem = function(item) {
            var index = $scope.obj.indexOf(item);

            if (index < 0) {
                return;
            };

            Devices.deleteRequest(index, function(res) {

                $scope.obj.splice(index, 1);
                $scope.tableParams.reload();

            }, function(err) {
                console.log(err, '-------------err  DEL------------')
            });

        }

        $scope.animationsEnabled = true;

        $scope.open = function(size, item, parentSelector) {
            var index = $scope.obj.indexOf(item);

            console.log(index, "parent index");

            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function() {
                        return $scope.obj[index];
                    }
                }
            });
            modalInstance.result.then(

                function(device) {
                        console.log(device, 'devvvvvvv');
                        console.log(index, 'indexxxxxxxxxxxx');
                    Devices.editRequest(index, device, function(res) {
                        
                        $scope.obj[index].Branding = device.Branding;
                        $scope.obj[index].Device = device.Device;
                        $scope.obj[index].Model = device.Model;
                        $scope.obj[index].MarketingName = device.MarketingName;
                        $scope.tableParams.reload();

                    }, function(err) {
                        console.log(err, '-------------err  DEL------------')
                    });

                },

                function() {});
        };
    },
]);

app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {
    // console.log($scope.$parent.obj, "index");
    $scope.editBranding = items.Branding;
    $scope.editDev = items.Device;
    $scope.editModel = items.Model;
    $scope.editMar = items.MarketingName;

    $scope.ok = function() {
        var device = {
            'Branding': $scope.editBranding,
            'Device': $scope.editDev,
            'Model': $scope.editModel,
            'MarketingName': $scope.editMar
        }
        $uibModalInstance.close(device);
        console.log('pressed OK ');
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
        console.log('pressed cancel ');
    };
});