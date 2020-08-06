
/*----- constants -----*/
/*----- app's state (variables) -----*/
let player1Turn = true;
let player1Color = 'orange';
let player2Color = 'turquoise';

let gridState = {
    box1 : {column: 1, row: 1, left: false, right: false, top: false, bottom: false},
    box2 : {column: 2, row: 1, left: false, right: false, top: false, bottom: false},
    box3 : {column: 3, row: 1, left: false, right: false, top: false, bottom: false},
    box4 : {column: 4, row: 1, left: false, right: false, top: false, bottom: false},
    box5 : {column: 1, row: 2, left: false, right: false, top: false, bottom: false},
    box6 : {column: 2, row: 2, left: false, right: false, top: false, bottom: false},
    box7 : {column: 3, row: 2, left: false, right: false, top: false, bottom: false},
    box8 : {column: 4, row: 2, left: false, right: false, top: false, bottom: false},
    box9 : {column: 1, row: 3, left: false, right: false, top: false, bottom: false},
    box10 : {column: 2, row: 3, left: false, right: false, top: false, bottom: false},
    box11 : {column: 3, row: 3, left: false, right: false, top: false, bottom: false},
    box12 : {column: 4, row: 3, left: false, right: false, top: false, bottom: false},
}

/*----- cached element references -----*/
const main = document.getElementById('main');
/*----- event listeners -----*/
main.addEventListener('click', clickLine);
/*----- functions -----*/
function clickLine(e) {
    if (e.target.classList.contains('line')){
        let line = e.target;

        line.style.backgroundColor = 'red';
    }
}

// Render


// Check for closed box


// Check for winner


// Init