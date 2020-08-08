/*----- constants -----*/
const PLAYER1COLOR = 'var(--player-1-color)';
const PLAYER2COLOR = 'var(--player-2-color)';
const PLAYER1BOXCOLOR = 'var(--player-1-box)';
const PLAYER2BOXCOLOR = 'var(--player-2-box)';

const notes = {
    1 : {
        1: 'audio/Clow.mp3',
        2: 'audio/G.mp3',
        3: 'audio/Chigh.mp3',
        4: 'audio/E.mp3'
    },

    2 : {
        1: 'audio/Eb.mp3',
        2: 'audio/F.mp3',
        3: 'audio/Bblow.mp3',
        4: 'audio/Bbhigh.mp3'
    }
}


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
let message;

/*----- cached element references -----*/
const main = document.getElementById('main');
const lineEls = document.querySelectorAll('.line');
const boxesEls = document.querySelectorAll('.box');
const messageArea = document.querySelector('h2');
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
    const preBoxSitch = checkClosedBox().filter(box => Math.abs(box) >= 4);

    // Add selected line to selectedLines array
    selectedLines.push(lineID);
    // Play musical notes
    playMusicalNotes(lineID)

    const newBoxSitch = checkClosedBox().filter(box => Math.abs(box) >= 4);
    
    // Check if a box was closed
    // If pre line select (absolute) box count is less than post line select box count current player closed a box
    //////////////////////////////////////////////////////
    // Developer note: I'm sorry for the following line //
    if (Math.abs(preBoxSitch.reduce((acc, current)=>acc+current, 0)) < Math.abs(newBoxSitch.reduce((acc, current)=>acc+current, 0))) {
        // TODO: why does sometimes player 1 not continue
        console.log("player: ", playerTurn);
        // Add another entry of the previous player to the playlist
        playerTurn.push(playerTurn[playerTurn.length - 1]);

        message = `It is still ${playerTurn[playerTurn.length - 1]}'s turn`
    } else {
        const turn = playerTurn[playerTurn.length - 1] % 2 === 0 ? 1 : 2;
        playerTurn.push( turn );

        // Remove the hover class of the previous player and add the new player hover class
        lineEls.forEach(function (line) {
            line.classList.remove(`line-p${playerTurn[playerTurn.length - 2]}`);
            line.classList.add(`line-p${turn}`);
        });
        
        message = `Player${turn}'s turn`;
    }

    // Check if there are any more lines to fill
    if (isWinner()){
        // Win logic
        boxes = checkClosedBox();
        // If player1 has highest number of boxes they win
        if (numBoxes(boxes, 4) > numBoxes(boxes, -4)) {
            message = `Player one wins with ${numBoxes(boxes, 4)} boxes!`;
        // If player two has more, they win
        } else if (numBoxes(boxes, -4) > numBoxes(boxes, 4)) {
            message = `Player two wins with ${numBoxes(boxes, -4)} boxes!`;
        // I guess there can be a tie. I just don't think I've ever seen it happen
        } else {
            mesage = "Can you even tie in dots and boxes? I'm sorry ... I didn't even account for this";
        }

        render();

    } else {

        render();
    }

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
                boxesEls[i - 1].style.backgroundColor = PLAYER1BOXCOLOR;
            } else if (box === -4) {
                boxesEls[i - 1].style.backgroundColor = PLAYER2BOXCOLOR;
            }
        }
    });

    displayMessage();
}

function playMusicalNotes(line) {
    // Check number of boxes line is touching
    const boxesBeingPlayed = lines[line];
    const boxes = checkClosedBox();
    const player = playerTurn[playerTurn.length - 1];

    // Play the musical notes of the player for each box and number of lines = note in sequence
    boxesBeingPlayed.forEach(function (box){
        playNote(player, boxes[box]);
    });
}

function playNote(player, note) {
    const audio = new Audio(notes[player][note]);
    audio.volume = 0.5;
    console.log(player,note, audio)
    audio.play();
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


// Check how many boxes a player has
function numBoxes(boxArr, boxInt) {
    return boxArr.filter(x => x == boxInt).length;
}

// Check for winner
function isWinner() {
    // if less than all the lines have been selected
    if (selectedLines.length < 31) {
        return false;
    } else {
        return true;
    }
}  

// Display message
function displayMessage() {
    messageArea.textContent = message; 
}

// Init
function init() {
    selectedLines = [];
    playerTurn = [1];
    message = 'Player 1 selects the first line';
    render();
}

init();