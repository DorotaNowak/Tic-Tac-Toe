var player1 = {
    mark: 'X',
    name: 'Player 1',
    style: 'player1_cell',
    score_el: 'player1_wins',
    wins: 0
};

var player2 = {
    mark: 'O',
    name: 'Player 2',
    style: 'player2_cell',
    score_el: 'player2_wins',
    wins: 0
};

var players = [player1, player2];
var current_player = 0;
var num_of_cols = 3;
var num_of_rows = 3;

function checkAndProcessWin() {
    wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [0, 4, 8], [6, 4, 2]];
    for (k in wins) {
        pattern = wins[k];
        p = $("#" + pattern[0]).text()
            + $("#" + pattern[1]).text()
            + $("#" + pattern[2]).text();
        if (p === "XXX") {
            player1.wins++;
            return true;
        }
        if (p === "OOO") {
            player2.wins++;
            return true;
        }
    }
    return false;
}

function initTurn() {
    $("#player_name").text(players[current_player].name);
    $("#player_mark").text(players[current_player].mark);
}

function hoverCell(ev) {
    $(this).addClass("hover");
    return false;
};

function leaveCell(ev) {
    $(this).removeClass("hover");
    return false;
};

function playMove(ev) {
    var cell = $(this);
    cell
        .addClass(players[current_player].style)
        .addClass("marked")
        .text(players[current_player].mark)
        .trigger("mouseout")
        .off("click mouseover mouseout");

    // check if someone won
    if (!checkAndProcessWin()) {
        // change the player
        if (current_player == 0) {
            current_player = 1;
        } else {
            current_player = 0;
        }
        initTurn(current_player);
    } else {
        window.setTimeout(function () {
            alert("Koniec gry");
            restart();
        }, 0);
    }
};

function restart() {
    $('#game_map').empty();
    // draw grid
    for (var i = 0; i < num_of_cols * num_of_rows; ++i) {
        var cell = $("<div></div>")
            .addClass("cell")
            .appendTo("#game_map")
            .attr("id", i);
        if (i % num_of_cols === 0) {
            cell.before('<div class="clear"></div>');
        }
    }
    $("#player1_points").text(players[0].wins);
    $("#player2_points").text(players[1].wins);

    $("#game_map .cell")
        .on("click", playMove)
        .on('mouseover', hoverCell)
        .on('mouseout', leaveCell);

    // init the first move
    initTurn();
}

$(document).ready(restart);
   