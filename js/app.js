/*----- constants -----*/
const PLAYER1COLOR = 'red';
const PLAYER2COLOR = 'purple';

/*----- app's state (variables) -----*/



const lines = [
    ['I am a hack'],
    [1],
    [2],
    [3],
    [4],
    [1],
    [1,2],
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

    const boxes = ["also hack",0,0,0,0,0,0,0,0,0,0,0,0];

    // loop through selected lines
    selectedLines.forEach(function (line, i){

        // add one to the local var boxes index of each element of the lines array at the index of line
        let linesTouchBoxesArray = lines[line];
        
        // for each element (or box the index of the line touches)
        linesTouchBoxesArray.forEach(function (boxThatsTouched, j) {
            // add one to the boxes 
            boxes[boxThatsTouched]++;

            // if the box equals 4 keep it at 4 if it was player 1 that closed it, or set it to -4 if player to closed it
            if(boxes[boxThatsTouched] === 4) {
                if (playerTurn[i] === 1) {
                    boxes[boxThatsTouched] = 4;
                } else if (playerTurn[i] === 2) {
                    boxes[boxThatsTouched] = -4;
                }
            }

        });
    });

    return boxes;
}

// Render
function render() {
    // Iterate through selectedLines and activate the corrosponding ID
    selectedLines.forEach(function (line, i){
        lineEls[line - 1].style.backgroundColor = eval(`PLAYER${playerTurn[i]}COLOR`);
    });


    // Display boxes to fill in
    boxes = checkClosedBox();
    boxes.forEach(function(box, i) {
        // Check if the box is at 4 (whether negative or positive)
        if (Math.abs(box) >= 4) {
            if (box === 4) {
                boxesEls[i - 1].style.backgroundColor = PLAYER1COLOR;
            } else if (box === -4) {
                boxesEls[i - 1].style.backgroundColor = PLAYER2COLOR;
            }
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
    // experiment with both pieces of data combined combinedDataTest = { selectedLines: [], playerTurn : [] };
    render();
}

init()