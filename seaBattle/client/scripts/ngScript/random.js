angular.module('seaBattleApp').service('Random',
    function() {

        var arrayOfShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

        var rowBegin;
        var rowEnd;
        var columnBegin;
        var columnEnd;

        var randRow;
        var randColumn;
        var dir;

        var rowBeginExtended;
        var rowEndExtended;
        var columnBeginExtended;
        var columnEndExtended;

        var table;
        this.random = function() {
            arrayOfShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

            initArray();
            setQuartet();

            var shipIsNotAnchored;
            for (var s = 0; s < 5; s++) {
                shipIsNotAnchored = true;
                while (shipIsNotAnchored) {
                    initializeRandoms();
                    ////////////////////////////////////////
                    if (initCoordinates(randRow, randColumn, arrayOfShips[0], dir)) {
                        initIncludingRectangle();
                        if (shipCoordinatesAreSet() && (rowBeginExtended >= 0) &&
                            (rowEndExtended >= 0) && (columnBeginExtended >= 0) && (columnEndExtended >= 0) &&
                            isFieldFree()) {
                            shipIsNotAnchored = !(fillField());
                            if (!shipIsNotAnchored) {
                                arrayOfShips.splice(0, 1);
                            }
                        }
                    }
                }
            }
            setSingle();
            return table;
        };


        var initArray = function() {
            table = [];
            for (var i = 0; i < 10; i++) {
                var arr = [];
                for (var j = 0; j < 10; j++) {
                    arr.push(0);
                }
                table.push(arr);
            }
            return table;
        };




        var initializeRandoms = function() {
            randRow = Math.floor(Math.random() * 10);
            randColumn = Math.floor(Math.random() * 10);
            dir = Math.floor(Math.random() * 4);
        };


        var setQuartet = function() {
            initializeRandoms();
            if (initCoordinates(randRow, randColumn, 4, dir)) {
                initIncludingRectangle();
                fillField();
                arrayOfShips.splice(0, 1);
            } else {
                setQuartet();
            }
        };

        var setSingle = function() {
            var singleIsNotSet;
            for (var v = 0; v < 4; ++v) {
                singleIsNotSet = true;
                while (singleIsNotSet) {
                    initializeRandoms();
                    initCoordinates(randRow, randColumn, 1, dir);
                    initIncludingRectangle();
                    if (isFieldFree()) {
                        singleIsNotSet = !(fillField());
                        arrayOfShips.splice(0, 1);
                    }
                }
            }
        };

        var fillField = function() {
            for (var r = rowBeginExtended; r <= rowEndExtended; ++r) {
                for (var c = columnBeginExtended; c <= columnEndExtended; ++c) {
                    table[r][c] = 2;
                }
            }

            for (var i = rowBegin; i <= rowEnd; ++i) {
                for (var j = columnBegin; j <= columnEnd; ++j) {
                    table[i][j] = 1;
                }
            }
            return true;
        };

        var isFieldFree = function() {
            for (var r = rowBeginExtended; r <= rowEndExtended; ++r) {
                for (var c = columnBeginExtended; c <= columnEndExtended; ++c) {
                    if (table[r][c] === 1) {
                        return false;
                    }
                }
            }

            return true;
        };

        var initCoordinates = function(r, c, shipSize, dirCoord) {
            var coordinatesAreSet = false;
            switch (dirCoord) {
                case 0:
                    if (isFieldInRange(r, r, c, (c + shipSize - 1))) {
                        rowBegin = r;
                        rowEnd = r;
                        columnBegin = c;
                        columnEnd = c + (shipSize - 1);
                        coordinatesAreSet = true;
                    } else {
                        coordinatesAreSet = false;
                    }
                    break;
                case 1:
                    if (isFieldInRange(r, (r + shipSize - 1), c, c)) {
                        rowBegin = r;
                        rowEnd = r + (shipSize - 1);
                        columnBegin = c;
                        columnEnd = c;
                        coordinatesAreSet = true;
                    } else {
                        coordinatesAreSet = false;
                    }
                    break;
                case 2:
                    if (isFieldInRange(r, r, (c - shipSize + 1), c)) {
                        rowBegin = r;
                        rowEnd = r;
                        columnBegin = c - (shipSize - 1);
                        columnEnd = c;
                        coordinatesAreSet = true;
                    } else {
                        coordinatesAreSet = false;
                    }
                    break;
                case 3:
                    if (isFieldInRange((r - shipSize + 1), r, c, c)) {
                        rowBegin = r - (shipSize - 1);
                        rowEnd = r;
                        columnBegin = c;
                        columnEnd = c;
                        coordinatesAreSet = true;
                    } else {
                        coordinatesAreSet = false;
                    }
                    break;
            }
            return coordinatesAreSet;
        };

        var isFieldInRange = function(rb, re, cb, ce) {
            if ((rb < 0) || (re > 9) || (cb < 0) || (ce > 9)) {
                return false;
            }

            return true;
        };

        var shipCoordinatesAreSet = function() {
            if (rowBegin >= 0 && rowEnd >= 0 && columnBegin >= 0 && columnEnd >= 0) {
                return true;
            } else {
                return false;
            }
        };

        var initIncludingRectangle = function() {
            if (shipCoordinatesAreSet()) {
                rowBeginExtended = (rowBegin === 0) ? rowBegin : (rowBegin - 1);
                rowEndExtended = (rowEnd === 9) ? rowEnd : (rowEnd + 1);
                columnBeginExtended = (columnBegin === 0) ? columnBegin : (columnBegin - 1);
                columnEndExtended = (columnEnd === 9) ? columnEnd : (columnEnd + 1);
            }
        };
    });
