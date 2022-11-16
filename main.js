// Hur labyrinten ser ut, vilka val som finns att göra på alla olika platser.
const mymaze = [
  { spot: 1, east: true, south: true },
  { spot: 2, east: true, south: true, west: true },
  { spot: 3, north: true, west: true },
  { spot: 4, east: true, south: true },
  { spot: 5, west: true },

  { spot: 6, north: true, south: true },
  { spot: 7, north: true, east: true },
  { spot: 8, east: true, west: true },
  { spot: 9, north: true, east: true, west: true },
  { spot: 10, south: true, west: true },

  { spot: 11, north: true, east: true },
  { spot: 12, west: true },
  { spot: 13, east: true, south: true },
  { spot: 14, east: true, west: true },
  { spot: 15, north: true, south: true, west: true },

  { spot: 16, east: true, south: true },
  { spot: 17, east: true, west: true },
  { spot: 18, north: true, west: true },
  { spot: 19, south: true },
  { spot: 20, north: true, south: true },

  { spot: 21, north: true, east: true },
  { spot: 22, east: true, west: true },
  { spot: 23, west: true },
  { spot: 24, north: true, east: true },
  { spot: 25, north: true, west: true },
];

const mymazeweird = [
  { spot: 63 },

  { spot: 51, east: true, south: true },
  { spot: 52, east: true, south: true, west: true },
  { spot: 53, north: true, west: true },
  { spot: 54, east: true, south: true },
  { spot: 55, west: true },

  { spot: 41, north: true, south: true },
  { spot: 42, north: true, east: true },
  { spot: 43, east: true, west: true },
  { spot: 44, north: true, east: true, west: true },
  { spot: 45, south: true, west: true },

  { spot: 31, north: true, east: true },
  { spot: 32, west: true },
  { spot: 33, east: true, south: true },
  { spot: 34, east: true, west: true },
  { spot: 35, north: true, south: true, west: true },

  { spot: 21, east: true, south: true },
  { spot: 22, east: true, west: true },
  { spot: 23, north: true, west: true },
  { spot: 24, south: true },
  { spot: 25, north: true, south: true },

  { spot: 11, north: true, east: true },
  { spot: 12, east: true, west: true },
  { spot: 13, west: true },
  { spot: 14, north: true, east: true },
  { spot: 15, north: true, west: true },
];

let currentPlayerLocation = 13;

function printOutDirections() {
  let location = playerLocation();
  const demo = document.getElementById("demo");

  // Rensar så det skrivs över för varje ny location
  demo.innerHTML = "";

  const addInstruction = (instruction) => {
    demo.innerHTML += `<div>${instruction}</div>`;
  };

  if (location.north === true) {
    addInstruction("Du kan gå norr ut");
  }
  if (location.east === true) {
    addInstruction("Du kan gå öster ut");
  }
  if (location.south === true) {
    addInstruction("Du kan gå söder ut");
  }
  if (location.west === true) {
    addInstruction("Du kan gå väster ut");
  }
  addInstruction(`Din plats i labyrinten är: ${currentPlayerLocation}`);
  // console.log(currentPlayerLocation);
}

// returnerar postionen spelaren är på så funktionen kan användas i andra funktioner
function playerLocation() {
  // const inputfield = parseInt(document.getElementById("userinput").value, 10);
  // return mymaze.find(({ spot }) => spot === inputfield);

  // Startar på 23, hårdkodat, borttaget
  return mymazeweird.find(({ spot }) => spot === currentPlayerLocation);
}

function playerMovementInput() {
  const location = playerLocation();
  const inputfield = document.getElementById("userinput");
  const inputfieldclean = String(inputfield.value).toLowerCase();
  const playermoves = document.getElementById("playermoves");

  const printPlayerChoice = (choice) => {
    playermoves.innerHTML += `<div>${choice}</div>`;
  };

  if (inputfieldclean === "north" && location.north === true) {
    currentPlayerLocation = currentPlayerLocation + 10;
    printPlayerChoice("> You went north");
  }
  if (inputfieldclean === "east" && location.east === true) {
    currentPlayerLocation = currentPlayerLocation + 1;
    printPlayerChoice("> You went east");
  }
  if (inputfieldclean === "south" && location.south === true) {
    currentPlayerLocation = currentPlayerLocation - 10;
    printPlayerChoice("> You went south");
  }
  if (inputfieldclean === "west" && location.west === true) {
    currentPlayerLocation = currentPlayerLocation - 1;
    printPlayerChoice("> You went west");
  }

  addWolf();
  wolfDeath();
  winCondition();
  printOutDirections();
  return currentPlayerLocation;
}

function winCondition() {
  if (currentPlayerLocation === 63) {
    alert("you are the winner");
  }
}

function wolfDeath() {
  const location = playerLocation();
  if (location.wolf === true) {
    alert("En varg äter dig");
  }
}

function addWolf() {
  const random = mymazeweird[randomNumber(1, 6)];
  console.log(random);
  random.wolf = true;
  console.log(mymazeweird);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
