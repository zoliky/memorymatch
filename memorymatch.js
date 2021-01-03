// Copyright 2019 Zoltán Király. All rights reserved.

"use strict";

const board = document.querySelector(".board");
let memoryValues = [];
let tileID = [];
let turnedOver = 0;

// Sprite coordinates
const tiles = [
  {name: "apple",       posX: -148, posY:    2},
  {name: "apple",       posX: -148, posY:    2},
  {name: "strawberry",  posX: -142, posY:  393},
  {name: "strawberry",  posX: -142, posY:  393},
  {name: "watermelon",  posX: -150, posY:  209},
  {name: "watermelon",  posX: -150, posY:  209},
  {name: "orange",      posX:  351, posY:   10},
  {name: "orange",      posX:  351, posY:   10},
  {name: "banana",      posX:  552, posY: -179},
  {name: "banana",      posX:  552, posY: -179},
  {name: "pear",        posX:  553, posY: -367},
  {name: "pear",        posX:  553, posY: -367},
];

// The shuffle function takes an array and returns a new array
// of the same size but with its elements in a random order
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// The showBoard function is the entry-point of the program
const showBoard = () => {
  let output = "";

  // Shuffle the tiles and display them face down
  shuffle(tiles).forEach((tile, index) => {
    output += `<div id="tile_${index}" data-tile="${tile.posX} ${tile.posY}"></div>`;
  });
  board.innerHTML = output;

  // Attach an event listener to each tile
  const shownTiles = document.querySelectorAll(".board > div");
  shownTiles.forEach(tile => tile.addEventListener("click", turnTile));
};

// The turnTile function is invoked each time a tile is selected
const turnTile = event => {
  // Don't execute this function on tiles that has already been exposed
  if (!(event.target.style.background === "" && memoryValues.length < 2)) {
    return;
  }

  // Turn the tile over to see what it is
  const [posX, posY] = event.target.dataset.tile.split(" ");
  event.target.style.background = `url("fruit.jpg") ${posX}px ${posY}px`;

  // If it's the first tile, store its attributes
  if (memoryValues.length === 0) {
    memoryValues.push(event.target.dataset.tile);
    tileID.push(event.target.id);

  // If it's the second tile, store its attributes
  } else if (memoryValues.length === 1) {
    memoryValues.push(event.target.dataset.tile);
    tileID.push(event.target.id);

    // Compare both tiles to see if they match
    if (memoryValues[0] === memoryValues[1]) {
      turnedOver += 2;

      // Empty the arrays
      memoryValues = [];
      tileID = [];

      setTimeout(() => {
        if (turnedOver === tiles.length) {
          // There are no more tiles left to turn over
          alert("Game over!");
          showBoard();
        }
      }, 1000);

    } else { // No match
      const firstTile = document.getElementById(tileID[0]);
      const secondTile = document.getElementById(tileID[1]);

      // Perform the shaking animation
      firstTile.classList.add("shake");
      secondTile.classList.add("shake");

      setTimeout(() => {
        // Turn the tiles back over
        firstTile.style.background = "";
        secondTile.style.background = "";

        // Remove the shaking animation
        firstTile.classList.remove("shake");
        secondTile.classList.remove("shake");

        // Empty the arrays
        memoryValues = [];
        tileID = [];
      }, 1100);
    }
  }
};

showBoard();