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
// When a line is clicked
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
    // const preBoxSitch = getBoxLineCount().filter(box => Math.abs(box) >= 4);
    const preBoxSitch = getBoxLineCount().filter(box => Math.abs(box) >= 4).length;

    // Add selected line to selectedLines array
    selectedLines.push(lineID);
    // Play musical notes
    playMusicalNotes(lineID)

    const newBoxSitch = getBoxLineCount().filter(box => Math.abs(box) >= 4).length;

    // Check if a box was closed
    // If pre line select (absolute) box count is less than post line select box count current player closed a box

    if (preBoxSitch < newBoxSitch) {

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
        boxes = getBoxLineCount();
        // If player1 has highest number of boxes they win
        if (numBoxes(boxes, 4) > numBoxes(boxes, -4)) {
            message = `Player one wins with ${numBoxes(boxes, 4)} boxes!`;
            setTimeout(playVictorySong(4), 500);

        // If player two has more, they win
        } else if (numBoxes(boxes, -4) > numBoxes(boxes, 4)) {
            message = `Player two wins with ${numBoxes(boxes, -4)} boxes!`;
            setTimeout(playVictorySong(-4), 500);

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
    boxes = getBoxLineCount();
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
    comp.textContent = "Bs bro!";
    displayMessage();
}

function getMusicalNotes(boxesPlayed, turn) {
    let notesBeingPlayed = [];
    const boxes = getPlayerLinesBox();

    // Add the musical notes of each box to the notes to play array
    boxesPlayed.forEach(function (box){
          // filter each players notes they contributed to the box; put into array and get length
          let p1Notes = boxes[box].filter(p => p === 1).length;
          let p2Notes = boxes[box].filter(p => p === 2).length;

          // add player one notes to notes being played array
          while (p1Notes > 0) {
              notesBeingPlayed.unshift(notes[1][p1Notes]);
              p1Notes--;
          }

          // add player two notes to notes being played array
          while (p2Notes > 0) {
              notesBeingPlayed.unshift(notes[2][p2Notes]);
              p2Notes--;
          }
    });

    if (turn) {
        // If this is a regular turn (not the ending song) this will convert an array into an object, then eliminate the duplicates. Then I turn it back into an array
        var hackIFoundOnline = new Set(notesBeingPlayed);
        notesBeingPlayed = [...hackIFoundOnline];
    }

    return notesBeingPlayed;

}

function playMusicalNotes(line) {
    // Check boxes that are playing
    const boxesBeingPlayed = lines[line];

    // true because we're just playing a turn sound
    const notesBeingPlayed = getMusicalNotes(boxesBeingPlayed, true);

    notesBeingPlayed.forEach(function (note) {
        playNote(note, 0.6 - ( notesBeingPlayed.length * 0.07 ));
    })
}

function playNote(note, vol) {
    const audio = new Audio(note);
    audio.volume = vol;
    audio.play();
}

function playVictorySong(winner) {
    // find what boxes are the winning boxes
    const boxes = getBoxLineCount();
    const boxesNotes = getPlayerLinesBox();
    const winningBoxes = [];
    boxes.forEach(function (box, i) {
        if (box === winner) {
            winningBoxes.push(i);
        }
    })

    // find what notes need played (pass false because this is the ending song)
    const notesToPlay = getMusicalNotes(winningBoxes, false);
    console.log(notesToPlay);

    // for each notesToPlay play interval
    notesToPlay.forEach((note, i) => {
        setTimeout(playNote, 300 * i, note, 0.6);
    });

}

// Check for closed box
function getPlayerLinesBox() {
    // loop through selected lines referencing the lines array and every time a lineID references a box, add it to a local array of grid boxes then loop through that array and if it equals 4, close the box

    const boxes = ["hack",[],[],[],[],[],[],[],[],[],[],[],[]];

    // loop through selected lines
    selectedLines.forEach(function (line, i){
        // make a local array to hold the boxes that are touched by each played line
        let boxesTouchingLine = lines[line];
        // for every box that we're checking (that the line we're checking touch so two at most)
        boxesTouchingLine.forEach(function (box, j) {
            boxes[box].push( playerTurn[i] )
        });
    });
    return boxes;
}

function getBoxLineCount() {
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
