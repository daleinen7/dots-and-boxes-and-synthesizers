/*----- constants -----*/
const player1Color = 'red'; //orange
const player2Color = 'green';

/*----- app's state (variables) -----*/

const lines = [
    ['I am a hack'],
    [1],
    [2],
    [3],
    [4],
    [1],
    [1,2], // this is painful
    [2,3],
    [3,4],
    [4],
    [1,5],
    [2,6],
    [3,7],
    [4,8],
    [5],
    [5,6],
    [6,7],
    [7,8],
    [8],
    [5,9],
    [6,10],
    [7,11],
    [8,12],
    [9],
    [9,10],
    [10,11],
    [11,12],
    [12],
    [9],
    [10],
    [11],
    [12]
];

let selectedLines;
let playerTurn;

/*----- cached element references -----*/
const main = document.getElementById('main');
const lineEls = document.querySelectorAll('.line');
const boxesEls = document.querySelectorAll('.box');
/*----- event listeners -----*/
main.addEventListener('click', clickLine);

/*----- functions -----*/
// Click logic
function clickLine(e) {
    let line = e.target;
    let lineID = line.id.replace('line','');
    
    if (line.id === 'line' + lineID){
        // If the line is already selected do nothing
        if (selectedLines.includes(lineID)) {
            return;
        } else {
            // Run render function
            gameLogic(lineID);
        }
    }
}

// Handle Main Logic
function gameLogic(lineID) {
    const preBoxSitch = checkClosedBox().filter(box => box >= 4);

    // Add selected line to selectedLines array
    selectedLines.push(lineID);

    const newBoxSitch = checkClosedBox().filter(box => box >= 4);
    
    // Check if a box was closed
    // If pre line select box count is less than post line select box count current player closed a box
    if (preBoxSitch.reduce((acc, current)=>acc+current, 0) < newBoxSitch.reduce((acc, current)=>acc+current, 0)) {
        // Add another entry of the previous player to the playlist
        playerTurn.push(playerTurn[playerTurn.length - 1]);
    } else {
        const turn = playerTurn[playerTurn.length - 1] % 2 === 0 ? 1 : 2;

        playerTurn.push( turn );
    }
    
    // Check if there are any more lines to fill
    if (checkWinner()){
        // Win logic
    }
    
    render();
}

// Check for closed box
function checkClosedBox() {
    // loop through selected lines referencing the lines array and every time a lineID references a box, add it to a local array of grid boxes then loop through that array and if it equals 4, close the box

    const boxes = [0,0,0,0,0,0,0,0,0,0,0,0,0];

    // loop through selected lines
    selectedLines.forEach(function (line){
        // add one to the boxes index of each element of the lines array at the index of line
        let linesArray = lines[line];
        linesArray.forEach(function (la) {
            boxes[la]++;
        });
    });

    return boxes;
}

// Render
function render() {
    // console.log(lineEls);
    // Iterate through selectedLines and activate the corrosponding ID
    selectedLines.forEach(function (line, i){
        console.log(eval(`player${playerTurn[i]}Color`));
        lineEls[line - 1].style.backgroundColor = eval(`player${playerTurn[i]}Color`);
    });


    // Display boxes to fill in
    boxes = checkClosedBox();

    boxes.forEach(function(box, i) {
        if (box >= 4) {
            boxesEls[i - 1].style.backgroundColor = player1Color;
        }
    });

    // Display message

}

// Check for winner
function checkWinner() {
    // if every line has been selected the game is over
    if (selectedLines.length >= 31) {
        return true;
    } else {
        return false;
    }
}  


// Init
function init() {
    selectedLines = [];
    playerTurn = [1]
    render();
}

init()