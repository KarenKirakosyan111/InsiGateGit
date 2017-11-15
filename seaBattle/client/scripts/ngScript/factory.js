
angular.module('seaBattleApp').factory('Field', function() {

    var makeCell = function(ship) {
        return {
            state: 'clearqq',
            hasShip: ship
        }
    }
    
    var ourRows = [];
    var logicArr = [];
    var enemyRows = [];
    var initArr = function() {
        ourRows = [];
        logicArr = [];
        enemyRows = [];
        for (var i = 0; i < 10; i++) {
            var arr = [];
            var logicRow = [];
            for (var j = 0; j < 10; j++) {
                arr.push(makeCell(false));
                logicRow.push(0);
            }
            ourRows.push(arr);
            logicArr.push(logicRow);
        }


        for (var i = 0; i < 10; i++) {
            var arr = [];
            for (var j = 0; j < 10; j++) {
                arr.push(makeCell(false));
            }
            enemyRows.push(arr);
        }
        return {
            "ourRows": ourRows,
            "enemyRows": enemyRows,
            "logicArr": logicArr,
            "initArr": initArr
        }
    }

    initArr();
    return {
        "ourRows": ourRows,
        "enemyRows": enemyRows,
        "logicArr": logicArr,
        "initArr": initArr
    };

});