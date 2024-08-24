let pikachu = {
  name: "Pikachu",
  health: 45,
  image: "./Images/pikachu.png",
  level: 8,
};

let bulbasaur = {
  name: "Bulbasaur",
  health: 70,
  image: "./Images/bulbasaur.png",
  level: 12,
};

let oranguru = {
  name: "Oranguru",
  health: 170,
  image: "./Images/oranguru.png",
  level: 45,
};

let drowzee = {
  name: "Drowzee",
  health: 90,
  image: "./Images/drowzee.png",
  level: 33,
};

let possiblePokemon = [pikachu, bulbasaur, oranguru, drowzee];
let randomPokemon;





/* let playerObject = {
  Name: "Bjarne",
  Image: "./Images/pokemonTrainerIdle.png",
  Pokemon: []
} */


class playerClass {
  Pokemon = [];

  constructor(inputName, inputImage) {
    this.Name = inputName;
    this.Image = inputImage;

  }

}


let playerObject = new playerClass("Bjarne", "./Images/pokemonTrainerIdle.png");



/* let playerName = "Bjarne";
let playerImage = "./Images/pokemonTrainerIdle.png";
let playerPokemon = []; */

let app = document.getElementById("app");

updateView();

function updateView() {
  getRandomPokemon();
  app.innerHTML = /*HTML*/ `
  <div class="container">
    <div class="opposingPokemon">
        <div>${randomPokemon.name} </div>
        <div>lvl: ${randomPokemon.level}</div>
        <img src="${randomPokemon.image}">
    </div>
    
    <div class="bottomScreen">
        <div class="player">
            <img src="${playerObject.Image}">
            <div>${playerObject.Name}</div>
        </div>

        <div class="buttonContainer">
            <button onclick="catchPokemon()">Fang</button>    
            <button onclick="updateView()">Finn en annen</button>
            <button onclick="showPokemon()">Vis dine pokemon</button>       
        </div>

    </div>
  </div>
  `;
}

function caughtPokemonView() {
  app.innerHTML = /*HTML*/ `
  <div class="caughtContainer">
    <h1>Du fanget ${playerObject.Pokemon[playerObject.Pokemon.length - 1].name}</h1>
    <div class="buttonContainer">
              <button onclick="updateView()">Finn en annen</button>
              <button onclick="showPokemon()">Vis dine pokemon</button>       
          </div>
  </div>
  `;
}

function catchPokemon() {
  playerObject.Pokemon.push(randomPokemon);
  caughtPokemonView();
}

function showPokemon() {
  app.innerHTML = /*HTML*/ `
  <div>Du har fanget disse Pokèmonene : <br></div>
  <div> ${showPokemon2()}</div>
  
  
  `;
}


function showPokemon2() {
  let myString = "";
  playerObject.Pokemon.forEach(element => {
    myString += element.name + " <br>";
  });
  return myString;
}

function getRandomPokemon() {
  let randomNum = Math.floor(Math.random() * possiblePokemon.length);
  randomPokemon = possiblePokemon[randomNum];
}
