angular.module('seaBattleApp').controller('boardController', [
    '$scope',
    'Field',
    'Logic',
    'Random',
    'seaBattleSocket',
    function($scope, Field, Logic, Random, seaBattleSocket) {
        $scope.ourField = Field.ourRows;
        $scope.enemyField = Field.enemyRows;
        $scope.logicArr = Field.logicArr;

        $scope.btnBeforStart = true;
        var isEnemyBoardIsClickable = false;
        $scope.opaTable2 = 'opaTable';
        $scope.opaTable1 = '';
        var shipArr = [];

        $scope.yourShipCell = function(cell) {
            if (shipCount[0] + shipCount[1] + shipCount[2] + shipCount[3] === 0) {
                return;
            }
            if (cell.state === 'filledqq') {
                return;
            }
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if ($scope.ourField[i][j] === cell) {
                        if ($scope.logicArr[i][j] !== 0) {
                            return;
                        }

                        if (cell.state === 'checkedqq') {
                            cell.state = 'clearqq';
                            cell.hasShip = false;
                            for (var k = 0; k < shipArr.length; k++) {
                                if (shipArr[k].row == i && shipArr[k].col == j) {
                                    shipArr.splice(k, 1);
                                }
                            }
                            return;
                        }
                        shipArr.push({ row: i, col: j });
                    }
                }
            }
            cell.state = 'checkedqq';
            cell.hasShip = true;
        }
        $scope.toogleCell = function(cell) {
            if (!isEnemyBoardIsClickable) {
                return;
            }
            if (cell.state !== 'clearqq') {
                return;
            }
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if ($scope.enemyField[i][j] === cell) {
                        seaBattleSocket.emit('Shoot', { i: i, j: j });

                    }
                }
            }
            isEnemyBoardIsClickable = false;
            $scope.opaTable2 = 'opaTable';
            $scope.opaTable1 = '';
        }

        $scope.onClickStart = function() {
            console.log("araj")
            if (shipCount[0] + shipCount[1] + shipCount[2] + shipCount[3] !== 0) {
                return;
            }
            console.log("araj")

            $scope.btnBeforStart = false;
            $scope.btnAfterStart = true;
            isEnemyBoardIsClickable = true;
             $scope.opaTable1 = 'opaTable';
            $scope.opaTable2 = '';
            seaBattleSocket.emit('shipValidate', makeOneZerro($scope.logicArr));
        }

        $scope.onClickResign = function() {
            $scope.btnBeforStart = true;
            $scope.btnAfterStart = false;
            seaBattleSocket.emit('resigne');
            $scope.onClickNew();

        }

        $scope.onClickNew = function() {
            shipCount = [4, 3, 2, 1];
            var newArr = Field.initArr();
            $scope.ourField = newArr.ourRows;
            $scope.enemyField = newArr.enemyRows;
            $scope.logicArr = newArr.logicArr;
            isEnemyBoardIsClickable = false;
            $scope.gameover = "";
        }

        $scope.onClickSubmit = function() {
            if (shipArr.length === 0) {
                return;
            }
            console.log("i == ", shipArr);
            var logicBack = Logic.logic(shipArr, $scope.logicArr);

            if (logicBack.status) {
                for (var i = 0; i < logicBack.array.length; i++) {
                    $scope.ourField[logicBack.array[i].row][logicBack.array[i].col].state = 'filledqq';
                }
            } else {
                for (var i = 0; i < logicBack.array.length; i++) {
                    $scope.ourField[logicBack.array[i].row][logicBack.array[i].col].state = 'clearqq';
                }
            }
            console.log("status", logicBack.status);
            shipArr = [];
        }
        $scope.onClickRandom = function() {
            console.log(Random.random());
            $scope.onClickNew();
            $scope.logicArr = Random.random();
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if ($scope.logicArr[i][j] === 1) {
                        $scope.ourField[i][j].state = 'filledqq';
                    }
                }
            }
            shipCount = [0, 0, 0, 0];

        }

        var makeOneZerro = function(arr) {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (arr[i][j] === 2) {
                        arr[i][j] = 0;
                    }
                }
            }
            return arr;
        }
        seaBattleSocket.on('gameOver', function(data) {
            console.log(data);
            $scope.gameover = data;
            isEnemyBoardIsClickable = false;
            $scope.opaTable2 = 'opaTable';
            $scope.opaTable1 = '';
            $scope.btnBeforStart = true;
            $scope.btnAfterStart = false;
        });


        seaBattleSocket.on('CheckFire', function(data) {
            data = JSON.parse(data);
            if (data.status === 'miss') {

                $scope.enemyField[data.row][data.col].state = 'missqq';
            } else if (data.status === 'hit') {
                isEnemyBoardIsClickable = true;
                 $scope.opaTable1 = 'opaTable';
            $scope.opaTable2 = '';
                $scope.enemyField[data.row][data.col].state = 'hitqq';
            } else if (data.status === 'kill') {
                isEnemyBoardIsClickable = true;
                 $scope.opaTable1 = 'opaTable';
            $scope.opaTable2 = '';
                for (var i = 0; i < data.shipCoordinats.length; i++) {
                    $scope.enemyField[data.shipCoordinats[i].row][data.shipCoordinats[i].col].state = 'burnqq';
                }
            }
        });

        seaBattleSocket.on('enemyFire', function(data) {
            data = JSON.parse(data);
            if (data.status === 'miss') {
                isEnemyBoardIsClickable = true;
                 $scope.opaTable1 = 'opaTable';
            $scope.opaTable2 = '';
                $scope.ourField[data.row][data.col].state = 'missqq';

            } else if (data.status === 'hit') {
                $scope.ourField[data.row][data.col].state = 'hitqq';
            } else if (data.status === 'kill') {
                for (var i = 0; i < data.shipCoordinats.length; i++) {
                    $scope.ourField[data.shipCoordinats[i].row][data.shipCoordinats[i].col].state = 'burnqq';
                }
            }

        });



    }
]);