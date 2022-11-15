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

function playerLocation() {
  const inputfield = parseInt(document.getElementById("userinput").value, 10);

  // returnerar postionen så funktionen kan användas i andra funktioner
  return mymaze.find(({ spot }) => spot === inputfield);
}

function printOutDirections() {
  const location = playerLocation();
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
}
