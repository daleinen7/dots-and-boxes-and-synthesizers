# Dots and Boxes
## Rules
A game respectable game of dots and boxes is played between two people. They take turns drawing a line between dots. If one player completes a 4 sided box then they can make an additional line.

When all the dots are connected, the player with the most completed boxes wins. 

## Pseudocode

- Display a grid of 5 by 4 dots
- When player clicks on a point between two dots a line of their color fills in
    - a faded hover line appears so it's clear where their line will appear
- After a line is place it's the other players turn and when they place their line it will be in their color
- If a player completes the 4th side of a box, they get to go again (it's not the other players turn)
    - The box changes color to the player who completed the box's color
    - If they continue to finish boxes it continues to be their turn
- When there are no more moves to make the player with the most completed boxes wins the game
    - A message is displayed saying as much
- Job done

"Wouldn't it be nice" Goals
- At start player determines custom grid guide
- At start a random player is selected to go first