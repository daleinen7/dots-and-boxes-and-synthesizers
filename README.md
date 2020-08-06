# Dots and Boxes
## Rules
A respectable game of dots and boxes is played between two people. They take turns drawing a line between dots. If one player completes a 4 sided box then they can make an additional line.

When all the dots are connected, the player with the most completed boxes wins. 

## Pseudocode

- Display a grid of 5 by 4 dots 
- Under the hood there are invisible divs that make up a grid
- Have clickable lines in between the div grid
- When player clicks on a point between two dots a line of their (the player's) color fills in
    - (wouldn't it be nice goal) a faded hover line appears so it's clear where their line will appear
    - The line that is selected tells the two boxes in between what side the line is placed on the box
    - Also the box checks to see if it has 4 sides surrounding it
        - If a player completes the 4th side of a box, 
            -They get to go again (it's not the other players turn)
            -The box fills in and is colored the players color
- After a line is placed it's the other players turn and when they place their line it will be in their color
- When there are no more moves to make the player with the most completed boxes wins the game
    - A message is displayed saying as much
- Job done

"Wouldn't it be nice" Goals
- At start player determines custom grid guide
- At start a random player is selected to go first 
