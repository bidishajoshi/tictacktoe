var N_SIZE = 3,
    EMPTY = "&nbsp;",
    boxes = [],
    turn = "X",
    score,
    moves;

function init() {
    var board = document.createElement('table');
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 0);

    var identifier = 1;

    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);

        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');

            cell.classList.add('col' + j, 'row' + i);

            if (i == j) cell.classList.add('diagonal0');
            if (j == N_SIZE - i - 1) cell.classList.add('diagonal1');

            cell.identifier = identifier;
            cell.addEventListener("click", set);

            row.appendChild(cell);
            boxes.push(cell);

            identifier++; // ✅ FIXED (was doubling before)
        }
    }

    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}

function startNewGame() {
    score = { "X": 0, "O": 0 };
    moves = 0;
    turn = "X";

    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
        square.classList.remove("win"); // remove highlight
    });

    document.getElementById('turn').textContent = 'Player ' + turn;
}

function win(clicked) {
    var memberOf = clicked.className.split(/\s+/);

    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#tictactoe ' + testClass, turn);

        if (items.length == N_SIZE) {
            // ✅ highlight winning cells
            items.forEach(cell => cell.classList.add("win"));
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);

    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

function set() {
    if (this.innerHTML !== EMPTY) return;

    this.innerHTML = turn;
    this.classList.add(turn); // add X or O class for styling

    moves += 1;
    score[turn] += this.identifier;

    if (win(this)) {
        document.getElementById('turn').textContent = 'Winner: Player ' + turn;

        setTimeout(function () {
            alert('Winner: Player ' + turn);
            startNewGame();
        }, 1000); // delay so user sees final move

    } else if (moves === N_SIZE * N_SIZE) {
        document.getElementById('turn').textContent = 'Draw';

        setTimeout(function () {
            alert("Draw");
            startNewGame();
        }, 1000);

    } else {
        turn = turn === "X" ? "O" : "X";
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}
function toggleTheme() {
    document.body.classList.toggle("dark");

    // save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// load saved theme
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};
init();