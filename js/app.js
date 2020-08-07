/*----- constants -----*/
const player1Color = 'red'; //orange
const player2Color = 'turquoise';

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
            // Add selected line to selectedLines array
            selectedLines.push(lineID);
            // Run render function
            render();
        }
    }
}

// Render
function render() {
    // console.log(lineEls);
    // Iterate through selectedLines and activate the corrosponding ID
    selectedLines.forEach(function (line){
        lineEls[line - 1].style.backgroundColor = player1Color;
    });
    
    
    // Run the check for closed box function
    checkClosedBox();

    // Check for winner

    // Display message

}



// Check for closed box
function checkClosedBox() {
    // loop through selected lines referencing the lines array and every time a lineID references a box, add it to a local array of grid boxes then loop through that array and if it equals 4, close the box

    const boxes = [0,0,0,0,0,0,0,0,0,0,0,0];

    // loop through selected lines
    selectedLines.forEach(function (line){
        // add one to the boxes index of each element of the lines array at the index of line
        let linesArray = lines[line];
        
        linesArray.forEach(function (la) {
            boxes[la]++;
        });
    });

    boxes.forEach(function(box, i) {
        if (box >= 4) {
            boxesEls[i - 1].style.backgroundColor = player1Color;
        }
    });
}

// Check for winner

// Init
function init() {
    selectedLines = [];
    playerTurn = [1]
    render();
}

init()