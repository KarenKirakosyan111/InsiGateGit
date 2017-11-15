var cellSate = {
    empty: 0,
    ship: 1,
    hitedShip: 2,
    killedShip: 3
};

var shipsCount = {
    four: 1,
    three: 2,
    two: 3,
    one: 4
}

var shipType = {
    single: 0,
    horizontal: 1,
    vertical: 2
}

var player1Table = [10][10];
var player2Table = [10][10];
//var killedShipCount=0;

function validateTable(t) {

    var ShipsCount = [0,0,0,0];

    for (var i = 0; i < 10; ++i) {
        for (var j = 0; j < 10; j++) {
            if (isShip(i, j, t)) {
                if (isAlreadychecked(i, j, t))
                    continue;

                if (!validateShip(i, j, t, ShipsCount))
                    return false;
            }
        }
    }

    if (ShipsCount[3] == 1 && ShipsCount[2] == 2 &&
        ShipsCount[1] == 3 && ShipsCount[0] == 4)
        return true;

    return false;
}

function isShip(i, j, t) {
    if (t[i][j] == cellSate.empty)
        return false;

    return true;
}

function isAlreadychecked(i, j, t) {
    if (i != 0 && t[i - 1][j] == cellSate.ship)
        return true;
    if (j != 0 && t[i][j - 1] == cellSate.ship)
        return true;

    return false;
}

function validateShip(i, j, t, eachShpCnt) {

    var shipInfo = getShipType(i, j, t);

    if(shipInfo.count>4)
        return false;

    switch (shipInfo.type) {

        case shipType.single:
            eachShpCnt[shipInfo.count - 1]++;
            if (CheckSingleShipBorders(i, j, t, shipInfo))
                return true;
            break;

        case shipType.horizontal:
            eachShpCnt[shipInfo.count - 1]++;
            if (CheckHorizontalleShipBorders(i, j, t, shipInfo))
                return true;
            break;
            
        case shipType.vertical:
            eachShpCnt[shipInfo.count - 1]++;
            if (CheckVerticalShipBorders(i, j, t, shipInfo))
                return true;
            break;
    }

    return false;
}

function getShipType(i, j, t) {
    var count = 0;
    var i1 = i;
    var j1 = j;

    //checking is vertical
    while (i1 < 10 && t[i1][j] != cellSate.empty) {
        count++;
        i1++;
    }

    if (count != 1)
        return {
            type: shipType.vertical,
            count: count
        };
    ////////////////////////////////

    //checkin is horizontal
    count = 0;
    while (j1 < 10 && t[i][j1] != cellSate.empty) {
        count++;
        j1++;
    }

    if (count != 1)
        return {
            type: shipType.horizontal,
            count: count
        };
    ////////////////////////////////////

    return {
        type: shipType.single,
        count: 1
    };
}

function CheckSingleShipBorders(i, j, t, SInfo) {
    var valid = true;

    if (i != 0)
        if (t[i - 1][j] != cellSate.empty)
            return false;

    if (j != 0)
        if (t[i][j - 1] != cellSate.empty)
            return false;

    if (i != 0 && j != 0)
        if (t[i - 1][j - 1] != cellSate.empty)
            return false;

    if (i != 9)
        if (t[i + 1][j] != cellSate.empty)
            return false;

    if (j != 9)
        if (t[i][j + 1] != cellSate.empty)
            return false;

    if (i != 9 && j != 9)
        if (t[i + 1][j + 1] != cellSate.empty)
            return false;

    if (i != 9 && j != 0)
        if (t[i + 1][j - 1] != cellSate.empty)
            return false;

    if (i != 0 && j != 9)
        if (t[i - 1][j + 1] != cellSate.empty)
            return false;

    return true;
}

function CheckHorizontalleShipBorders(i, j, t, SInfo) {
    var valid = true;

    var count = 1;

    while (count <= SInfo.count) {
        if (i != 0)
            if (t[i - 1][j] != cellSate.empty)
                return false;

        if (count == 1)
            if (j != 0)
                if (t[i][j - 1] != cellSate.empty)
                    return false;

        if (i != 0 && j != 0)
            if (t[i - 1][j - 1] != cellSate.empty)
                return false;

        if (i != 9)
            if (t[i + 1][j] != cellSate.empty)
                return false;

        if (count == SInfo.count)
            if (j != 9)
                if (t[i][j + 1] != cellSate.empty)
                    return false;

        if (i != 9 && j != 9)
            if (t[i + 1][j + 1] != cellSate.empty)
                return false;

        if (i != 9 && j != 0)
            if (t[i + 1][j - 1] != cellSate.empty)
                return false;

        if (i != 0 && j != 9)
            if (t[i - 1][j + 1] != cellSate.empty)
                return false;

        count++;
        j++;
    }



    return true;
}

function CheckVerticalShipBorders(i, j, t, SInfo) {
    var valid = true;

    var count = 1;

    while (count <= SInfo.count) {
        if (count == 1)
            if (i != 0)
                if (t[i - 1][j] != cellSate.empty)
                    return false;

        if (j != 0)
            if (t[i][j - 1] != cellSate.empty)
                return false;

        if (i != 0 && j != 0)
            if (t[i - 1][j - 1] != cellSate.empty)
                return false;

        if (count == SInfo.count)
            if (i != 9)
                if (t[i + 1][j] != cellSate.empty)
                    return false;

        if (j != 9)
            if (t[i][j + 1] != cellSate.empty)
                return false;

        if (i != 9 && j != 9)
            if (t[i + 1][j + 1] != cellSate.empty)
                return false;

        if (i != 9 && j != 0)
            if (t[i + 1][j - 1] != cellSate.empty)
                return false;

        if (i != 0 && j != 9)
            if (t[i - 1][j + 1] != cellSate.empty)
                return false;

        count++;
        i++;
    }
    return true;
}


function hitResult(i,j,t, killedShipCount, playerInd){

    if(!isShip(i,j,t)){
        return JSON.stringify({
            col:j,
            row:i,
            status:"miss",
            shipCoordinats:[]
        });
    }

    if(t[i][j]==cellSate.ship){

        var index=1;
        var start=findShipStart(i,j,t);
        var ShInf=getShipType(start.i, start.j, t);
        var stat="";
        var i1=start.i, j1=start.j;

        t[i][j]=cellSate.hitedShip;

        switch (ShInf.type){
            case shipType.single:

                if(++killedShipCount[playerInd]==10)
                    return "You win";

                return JSON.stringify({
                    col:j,
                    row:i,
                    status:"kill",
                    shipCoordinats:[{col:j, row:i}]
                });
                break;

            case shipType.horizontal:
                var coordinats = [];
                while(index <= ShInf.count){
	            coordinats.push({col:j1++, row:i1});
                    index++;
                }
                if(isKilled(start.i, start.j ,t, ShInf))
                {
                    if(++killedShipCount[playerInd]==10)
                        return "You win";
                    stat="kill";
                }
                else{
                     stat="hit";
                      coordinats=[];
                }

                return JSON.stringify({
                    col:j,
                    row:i,
                    status:stat,
                    shipCoordinats:coordinats
                });
                break;

            case shipType.vertical:
                var coordinats = [];
                while(index <= ShInf.count){
                    coordinats.push({col:j1, row:i1++});
                    index++;
                }
                if(isKilled(start.i, start.j ,t, ShInf))
                {
                    if(++killedShipCount[playerInd]==10)
                        return "You win";
                        stat="kill";
                }
                else{
                     stat="hit";
                      coordinats=[];
                }

                return JSON.stringify({
                    col:j,
                    row:i,
                    status:stat,
                    shipCoordinats:coordinats
                });
                break;
        }
    }
}

function isKilled(i,j,t, shipInfo){
    if(shipInfo.count==1)
        return true;

    for(var c=1; c<=shipInfo.count; c++){
        
        if(t[i][j]!=cellSate.hitedShip)
            return false;

        (shipInfo.type == shipType.vertical)? i++ : j++;
    }

    return true;
}

function findShipStart(i,j,t){
    var i1=i;
    var j1=j;
    var count=0;
    ////////////////////////////
    if(i!=0){
        while((i1>=0) && (t[i1][j] != cellSate.empty)){
            i1--;
            count++;
        }
    }

    if(count>1)
        return {

            i:++i1,

            j: j
        };
    ///////////////////////////////
    if(j!=0){
        count=0;
        while(j1>=0 && t[i][j1] != cellSate.empty){
            j1--;
            count++;
        }
    }
    
    if(count>1)
        return {
            i: i,
            j: ++j1
        };
    //////////////////////////////////
    return {
        i: i,
        j: j
    };


}

module.exports.validateTable = validateTable;
module.exports.hitResult = hitResult;

// var a = [
//     [1,1,1,0,0,1,1,1,1,0,],
//     [0,0,0,0,0,0,0,0,0,0,],
//     [1,1,1,0,1,1,0,0,0,0,],
//     [0,0,0,0,0,0,0,0,0,0,],
//     [1,1,0,1,1,0,0,0,0,0,],
//     [0,0,0,0,0,0,0,0,0,0,],
//     [0,0,0,0,1,0,1,0,0,0,],
//     [0,0,0,0,0,0,0,0,0,0,],
//     [0,0,0,0,1,0,0,0,0,0,],
//     [0,0,1,0,0,0,0,0,0,0,]
// ];
// var arr = [0,0];

// console.log(hitResult(0,5, a, arr, 0));
// console.log(hitResult(0,6, a, arr, 0));
// console.log(hitResult(0,7, a, arr, 0));
// console.log(hitResult(0,8, a, arr, 0));

// console.log(hitResult(0,0, a, arr, 0));
// console.log(hitResult(0,2, a, arr, 0));
// console.log(hitResult(0,1, a, arr, 0));

// console.log(hitResult(2,0, a, arr, 0));
// console.log(hitResult(2,2, a, arr, 0));
// console.log(hitResult(2,1, a, arr, 0));

// console.log(hitResult(2,4, a, arr, 0));
// console.log(hitResult(2,5, a, arr, 0));

// console.log(hitResult(4,0, a, arr, 0));
// console.log(hitResult(4,1, a, arr, 0));

// console.log(hitResult(4,3, a, arr, 0));
// console.log(hitResult(4,4, a, arr, 0));

// console.log(hitResult(6,4, a, arr, 0));
// console.log(hitResult(6,6, a, arr, 0));
// console.log(hitResult(8,4, a, arr, 0));
// console.log(hitResult(9,2, a, arr, 0));
