var test;
var activeElement;
var moveDone = false;
$(document).ready(function() {
    $("td").click(function() {
        id = this.id;
        test = this.id;
        if (document.getElementById(id).style.backgroundColor == "rgb(26, 83, 255)") {
            activeElement.offsetParent.innerHTML = "";
            $("#" + test).append(activeElement);
            moveDone = true;
        }

        if (document.getElementById(id).style.backgroundColor == "rgb(255, 0, 0)") {
            document.getElementById(test).firstChild.remove();
            document.getElementById(test).append(activeElement);
            moveDone = true;
        }

        resetColor();

        if (checkPositionFree(id) == 0) {
            return 0;
        }

        var figureName = document.getElementById(id).lastChild.alt;
        var color = figureColor(id);

        if (moveDone != true) {
            switch (figureName) {
                case "queen":
                    checkQueen(id);
                    break;
                case "pawn":
                    checkPawn(id, color);
                    break;
                case "rook":
                    checkRook(id);
                    break;
                case "bishop":
                    checkBishop(id);
                    break;
                case "king":
                    checkKing(id);
                    break;
                case "knight":
                    checkKnight(id);
                    break;
            }
        }
        moveDone = false;
    });
});


var moves = [];

function canMove(id) {
    activeElement = document.getElementById(id).lastChild;
    for (var i = 0; i < 8; i++)
        for (var j = 1; j <= 8; j++) {
            var k = String.fromCharCode(i + 97);
            var cell = k + j;
            var colorChecker = checkBlueColor(cell);
            if (colorChecker) {
                moves.push(cell);
            }
        }
}

function canKill(id) {
    activeElement = document.getElementById(id).lastChild;
    for (var i = 0; i < 8; i++)
        for (var j = 1; j <= 8; j++) {
            var k = String.fromCharCode(i + 97);
            var redCell = k + j;
            var colorChecker = redLight(redCell);
            if (colorChecker) {
                moves.push(redCell);
            }
        }
}

function redLight(id) {
    if (document.getElementById(id).style.backgroundColor == "rgb(255, 0, 0)") {
        return true;
    } else {
        return false;
    }
}

function checkBlueColor(id) {
    if (document.getElementById(id).style.backgroundColor == "rgb(26, 83, 255)") {
        return true;
    } else {
        return false;
    }
}


function figureColor(id) {
    if (document.getElementById(id) == null) {
        return 0;
    }
    var imgtag = document.getElementById(id).lastChild;

    if (imgtag != null)
        return imgtag.className;
}

function resetColor() {
    var chessboard = document.getElementsByClassName("chessboard");
    for (var i = 0; i < chessboard.length; i++) {
        chessboard[i].style.backgroundColor = "#996633";
    }

    var chessboardwhite = document.getElementsByClassName("chessboardwhite");
    for (var i = 0; i < chessboardwhite.length; i++) {
        chessboardwhite[i].style.backgroundColor = "#dfbe9f";
    }
}

function checkPositionFree(id) {
    if (document.getElementById(id) == null || document.getElementById(id).childNodes.length) {
        return 1;
    }
    return 0;
}

function checkboundSize(row, column) {
    if (row >= 1 && row <= 8 && column >= "a" && column <= "h") {
        return true;
    } else {
        return false;
    }
}


function checkQueen(id) {
    checkRook(id);
    checkBishop(id);
    canMove(id);
    canKill(id);
}


function checkBishop(id) {
    var column = id[0];
    var row = parseInt(id[1], 10);
    var color1 = figureColor(id);

    var m = row;
    var n = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(n + 97);
    n++;
    m++;

    while (checkboundSize(m, k) && checkPositionFree(k + m) == 0) {
        document.getElementById(k + m).style.backgroundColor = "#1a53ff";
        k = String.fromCharCode(n + 97);
        n++;
        m++;
    }

    var color2 = figureColor(k + m)
    if (checkboundSize(m, k) && checkPositionFree(k + m) != 0 && color1 != color2) {
        document.getElementById(k + m).style.backgroundColor = "#ff0000";
    }


    var m = row;
    var n = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(n + 97);
    n++;
    m--;
    while (checkboundSize(m, k) && checkPositionFree(k + m) == 0) {
        document.getElementById(k + m).style.backgroundColor = "#1a53ff";
        k = String.fromCharCode(n + 97);
        n++;
        m--;
    }
    var color3 = figureColor(k + m)
    if (checkboundSize(m, k) && checkPositionFree(k + m) != 0 && color1 != color3) {
        document.getElementById(k + m).style.backgroundColor = "#ff0000";
    }

    var m = row;
    var n = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(n + 97);
    n--;
    m--;
    while (checkboundSize(m, k) && checkPositionFree(k + m) == 0) {
        document.getElementById(k + m).style.backgroundColor = "#1a53ff";
        k = String.fromCharCode(n + 97);
        n--;
        m--;
    }
    var color4 = figureColor(k + m)
    if (checkboundSize(m, k) && checkPositionFree(k + m) != 0 && color1 != color4) {
        document.getElementById(k + m).style.backgroundColor = "#ff0000";
    }

    var m = row;
    var n = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(n + 97);
    n--;
    m++;
    while (checkboundSize(m, k) && checkPositionFree(k + m) == 0) {
        document.getElementById(k + m).style.backgroundColor = "#1a53ff";
        k = String.fromCharCode(n + 97);
        n--;
        m++;
    }
    var color5 = figureColor(k + m)
    if (checkboundSize(m, k) && checkPositionFree(k + m) != 0 && color1 != color5) {
        document.getElementById(k + m).style.backgroundColor = "#ff0000";
    }
    canMove(id);
    canKill(id);
}


function checkKing(id) {
    var column = id[0];
    var row = parseInt(id[1], 10);

    var i = row - 1;
    var color1 = figureColor(id);
    var color2 = figureColor(column + i);
    if (checkboundSize(i, column) && checkPositionFree(column + i) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(i, column) && checkPositionFree(column + i) != 0 && color1 != color2) {
        document.getElementById(column + i).style.backgroundColor = "#ff0000";
    }

    var j = row + 1;
    var color3 = figureColor(column + j);
    if (checkboundSize(j, column) && checkPositionFree(column + j) == 0) {
        document.getElementById(column + j).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(j, column) && checkPositionFree(column + j) != 0 && color1 != color3) {
        document.getElementById(column + j).style.backgroundColor = "#ff0000";
    }

    var s = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(s + 97);
    var color4 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color4) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    var s = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(s + 97);
    var color5 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color5) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    var s = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(s + 97);
    row++;
    var color6 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color6) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    row--;

    var s = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(s + 97);
    row--;
    var color7 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color7) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    row++;

    var s = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(s + 97);
    row--;
    var color8 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color8) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    row++;

    var s = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(s + 97);
    row++;
    var color9 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color9) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    canMove(id);
    canKill(id);
}


function checkRook(id) {
    var column = id[0];
    var row = parseInt(id[1], 10);

    var i = row - 1;
    var color1 = figureColor(id);
    while (checkboundSize(i, column) && checkPositionFree(column + i) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
        i--;
    }
    var color2 = figureColor(column + i)
    if (checkboundSize(i, column) && checkPositionFree(column + i) != 0 && color1 != color2) {
        document.getElementById(column + i).style.backgroundColor = "#ff0000";
    }

    var j = row + 1;
    while (checkboundSize(j, column) && checkPositionFree(column + j) == 0) {
        document.getElementById(column + j).style.backgroundColor = "#1a53ff";
        j++;
    }
    var color3 = figureColor(column + j);
    if (checkboundSize(j, column) && checkPositionFree(column + j) != 0 && color1 != color3) {
        document.getElementById(column + j).style.backgroundColor = "#ff0000";
    }

    var s = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(s + 97);
    while (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
        s++;
        k = String.fromCharCode(s + 97);
    }
    var color4 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color4) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    var l = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(l + 97);
    while (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
        l--;
        k = String.fromCharCode(l + 97);
    }
    var color5 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color5) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    canMove(id);
    canKill(id);
}


function checkKnight(id) {
    var column = id[0];
    var row = parseInt(id[1], 10);

    row++;
    var l = column.charCodeAt(0) - 97 - 2;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }


    var l = column.charCodeAt(0) - 97 + 2;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    row = row - 3;
    var l = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    row = row + 1;
    var l = column.charCodeAt(0) - 97 + 2;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }


    row += 3;
    var l = column.charCodeAt(0) - 97 + 1;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    var l = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    row -= 4;
    var l = column.charCodeAt(0) - 97 - 1;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }

    row++;
    var l = column.charCodeAt(0) - 97 - 2;
    var k = String.fromCharCode(l + 97);
    var color1 = figureColor(id);
    var color2 = figureColor(k + row);
    if (checkboundSize(row, k) && checkPositionFree(k + row) == 0) {
        document.getElementById(k + row).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(row, k) && checkPositionFree(k + row) != 0 && color1 != color2) {
        document.getElementById(k + row).style.backgroundColor = "#ff0000";
    }
    canMove(id);
    canKill(id);
}


function checkPawn(id, color) {
    var column = id[0];
    var row = parseInt(id[1], 10);

    var i = row - 1;
    var j = row - 2;
    var k = column.charCodeAt(0) - 97;
    var f = String.fromCharCode(k + 97 + 1);
    var l = String.fromCharCode(k + 97 - 1);
    var color1 = figureColor(id);
    var color2 = figureColor(l + i);
    var color3 = figureColor(f + i);
    if (checkboundSize(i, column) && color == "black" && checkPositionFree(column + i) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(i, l) && color == "black" && checkPositionFree(l + i) != 0 && color1 != color2) {
        document.getElementById(l + i).style.backgroundColor = "#ff0000";
    }
    if (checkboundSize(i, f) && color == "black" && checkPositionFree(f + i) != 0 && color1 != color3) {
        document.getElementById(f + i).style.backgroundColor = "#ff0000";
    }
    if (color == "black" && checkPositionFree(column + i) == 0 && row == 7 && checkPositionFree(column + j) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
        document.getElementById(column + j).style.backgroundColor = "#1a53ff";
    }

    i += 2;
    j += 4;
    var color2 = figureColor(l + i);
    var color3 = figureColor(f + i);
    if (checkboundSize(i, column) && color == "white" && checkPositionFree(column + i) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
    }
    if (checkboundSize(i, l) && color == "white" && checkPositionFree(l + i) != 0 && color1 != color2) {
        document.getElementById(l + i).style.backgroundColor = "#ff0000";
    }
    if (checkboundSize(i, f) && color == "white" && checkPositionFree(f + i) != 0 && color1 != color3) {
        document.getElementById(f + i).style.backgroundColor = "#ff0000";
    }
    if (color == "white" && checkPositionFree(column + i) == 0 && row == 2 && checkPositionFree(column + j) == 0) {
        document.getElementById(column + i).style.backgroundColor = "#1a53ff";
        document.getElementById(column + j).style.backgroundColor = "#1a53ff";
    }
    canMove(id);
    canKill(id);
}