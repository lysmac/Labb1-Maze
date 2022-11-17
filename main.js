window.addEventListener("DOMContentLoaded", main);

/** Lyssnar på knappar/form och vilka funktioner som ska köras vid klick/submit  */
function main() {
  const startbutton = document.getElementById("startbutton");
  startbutton.addEventListener("click", startGame);

  const form = document.getElementById("form");
  form.addEventListener("submit", playerMovementInput);
}

/** Hur labyrinten ser ut, vilka vägval som finns på de olika platserna.*/
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
  { spot: 12, east: true, west: true, wolf: true },
  { spot: 13, west: true },
  { spot: 14, north: true, east: true },
  { spot: 15, north: true, west: true },
];

/** Placerar spelaren på dess starposition i labyrinten */
let currentPlayerLocation = 13;

/** Alla funktioner som körs när man startar spelet.*/
function startGame() {
  showAndHideGame();
  hideInstructions();
  addWolf();
  printOutDirections();
}

function hideInstructions() {
  div = document.getElementById("intro");
  div.classList.add("hidden");
}

function showAndHideGame() {
  div = document.getElementById("gamestuff");
  div.classList.toggle("hidden");
}

/** Genererar en varg på en utav fem utvalda platser i labyrinten */
function addWolf() {
  const random = mymazeweird[randomNumber(1, 6)];
  // 1 = plats nummer två i arrayen, dvs spot 51
  // 6 = taket, dvs jag vill ha en siffra mellan 1-5
  random.wolf = true;
}

/** Ger ett slumpmässigt tal inom ett intervall*/
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/** Skriver ut vilket håll spelaren har möjlighet att gå från den positionen spelaren befinner sig i.
 * Skriver också över sig själv innan den skriver ut något nytt, för att spelaren bara ska ha uppdaterade insturktioner.
 */
function printOutDirections() {
  let location = playerLocation();
  const demo = document.getElementById("demo");

  demo.innerHTML = "";

  const addInstruction = (instruction) => {
    demo.innerHTML += `<div>${instruction}</div>`;
  };

  if (location.north === true) {
    addInstruction("You can go north.");
  }
  if (location.east === true) {
    addInstruction("You can go east");
  }
  if (location.south === true) {
    addInstruction("You can go south");
  }
  if (location.west === true) {
    addInstruction("You can go west");
  }
  // Ska tas bort, använts i testningssyfte
  addInstruction(`Din plats i labyrinten är: ${currentPlayerLocation}`);
}

/** Returnerar postionen spelaren befinner sig på för tillfället */
function playerLocation() {
  return mymazeweird.find(({ spot }) => spot === currentPlayerLocation);
}

/** Rensar inputfältet efter man har skickat ett kommando */
function clearTextfield() {
  const userwritteninput = document.getElementById("userinput");

  userwritteninput.value = "";
}

/**
 * Flyttar spelaren till en ny plats beroende på input från spelaren
 * @param {Lyssnar efter event} event
 */
function playerMovementInput(event) {
  // Gör så att default-utförandet vid ett form, dvs. reload på sidan, inte körs.
  event.preventDefault();

  const location = playerLocation();
  const inputfield = document.getElementById("userinput");

  // Gör så inputen från spelaren blir endast lowercase. Dvs. inputs är inte länge
  // känsliga för gemener och versaler.
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

  clearTextfield();
  addWolf();
  wolfDeath();
  winCondition();
  printOutDirections();
}

/** Kollar om spelaren är på den enda utgången som finns i labyrinten */
function winCondition() {
  if (currentPlayerLocation === 63) {
    alert("you are the winner");
  }
}

/** Hamnar du på samma plats som vargen, så dör du */
function wolfDeath() {
  const location = playerLocation();
  if (location.wolf === true) {
    div = document.getElementById("death");
    div.classList.toggle("hidden");
    showAndHideGame();
  }
}
