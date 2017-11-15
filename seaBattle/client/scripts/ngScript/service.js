var shipCount = [4, 3, 2, 1];

angular.module('seaBattleApp').service('Logic',
    function() {
        var rowBegin;
        var rowEnd;
        var columnBegin;
        var columnEnd;

        this.logic = function(indexArray, wholeArray) {
            console.log('ffffffffffff', indexArray);
            var len = indexArray.length;
            var trueRow = average(indexArray, 'row');
            var trueCol = average(indexArray, 'col');
            var retValue = {
                status: false,
                array: indexArray
            };

            if (!trueRow && !trueCol) {
                console.log('first return');
                console.log(retValue)
                return retValue;
            }

            if (trueCol) {
                indexArray.sort(function(a, b) {
                    return a.row - b.row;
                });
            }

            if (trueRow) {
                indexArray.sort(function(a, b) {
                    return a.col - b.col;
                });
            }

            if ((trueRow && indexArray[len - 1].col - indexArray[0].col + 1 == len) ||
                (trueCol && indexArray[len - 1].row - indexArray[0].row + 1 == len)) {
                if (shipCount[len - 1] === 0 || typeof shipCount[len - 1] == 'undefined') {
                    console.log('second return');
                    return retValue;
                }

                if (checkField(wholeArray, indexArray[0].row, indexArray[len - 1].row,
                        indexArray[0].col, indexArray[len - 1].col)) {

                    fillShipFields(wholeArray, indexArray[0].row, indexArray[len - 1].row,
                        indexArray[0].col, indexArray[len - 1].col);

                    --shipCount[len - 1];
                    retValue.status = true;
                }

            }


            console.log(indexArray, wholeArray, retValue);
            return retValue;
        };

        var checkField = function(arr, indexBeginRow, indexEndRow, indexBeginColumn, indexEndColumn) {
            for (var i = indexBeginRow; i <= indexEndRow; i++) {
                for (var j = indexBeginColumn; j <= indexEndColumn; j++) {
                    if (arr[i][j] !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };

        var fillShipFields = function(arr, indexBeginRow, indexEndRow, indexBeginColumn, indexEndColumn) {
            initiateCoordinates(indexBeginRow, indexEndRow, indexBeginColumn, indexEndColumn);
            for (var i = rowBegin; i <= rowEnd; i++) {
                for (var j = columnBegin; j <= columnEnd; j++) {
                    // if(typeof arr[i][j] !== 'undefined')
                        arr[i][j] = 2;
                }
            }

            for (var i = indexBeginRow; i <= indexEndRow; i++) {
                for (var j = indexBeginColumn; j <= indexEndColumn; j++) {
                    arr[i][j] = 1;
                }
            }
        };

        var average = function(arr, which) {
            var sum = 0;

                for (var i = 0; i < arr.length; ++i) {
                    sum += arr[i][which];
                }
                return sum / arr.length == arr[0][which];


        };

        var initiateCoordinates = function(indexBeginRow, indexEndRow, indexBeginColumn, indexEndColumn) {
            rowBegin = indexBeginRow - 1;
            rowEnd = indexEndRow + 1;
            columnBegin = indexBeginColumn - 1;
            columnEnd = indexEndColumn + 1;

            if (indexBeginRow === 0) {
                rowBegin = indexBeginRow;
            }

            if (indexEndRow === 9) {
                rowEnd = indexEndRow;
            }

            if (indexBeginColumn === 0) {
                columnBegin = indexBeginColumn;
            }

            if (indexEndColumn === 9) {
                columnEnd = indexEndColumn;
            }
        };
    });


            // //----------------TEST------------------//
            // var Array1 = [
            //     { row: 3, col: 3 },
            //     { row: 5, col: 2 },
            //     { row: 4, col: 2 },
            //     { row: 2, col: 2 },
            // ];

            // var logicArr = [];
            // for (var i = 0; i < 10; i++) {
            //     var logicRow = [];
            //     for (var j = 0; j < 10; j++) {
            //         logicRow.push(0);
            //     }
            //     logicArr.push(logicRow);
            // }
