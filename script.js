/** SET UP */

const cells = document.querySelectorAll(".move");
const playernameUI = document.querySelector("#playerNickName");
const gameboardUI = document.querySelector(".gameboard");

const gameboard = (() => {
    let grid = {
        topleft: undefined, topcenter: undefined, topright: undefined,
        midleft: undefined, midcenter: undefined, midright: undefined,
        btmleft: undefined, btmcenter: undefined, btmright: undefined
    };

    const reset = () => {
        for (let key in grid) {
            if (grid.hasOwnProperty(key)) {
                grid[key] = undefined;
                document.getElementById(key).textContent = ''; // Clear the UI
            }
        }
        gameboard.updateUI();
    };

    const isFilled = () => {
        return Object.values(grid).every(cell => cell != undefined);
    };

    const updateUI = () => {

        for (let key in grid) {
            if (grid.hasOwnProperty(key)) {
                document.getElementById(key).textContent = grid[key] || '';
            }
        }
    };

    const updateScore = () => {
        const playerOneScore = document.querySelector(".playerOneScore");
        const playerTwoScore = document.querySelector(".playerTwoScore");
        playerOneScore.textContent = playerOne.getScore();
        playerTwoScore.textContent = playerTwo.getScore();
    }

    return {grid, reset, isFilled, updateUI, updateScore}
})()

let playerOne;
let playerTwo;
let winner = undefined;
let move = "valid";


const startButton = document.querySelector("#start");
const formDialog = document.querySelector("#choosePlayers");
const form = document.querySelector("#createPlayer");

startButton.addEventListener("click", () => {
    formDialog.showModal();
})

    form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let userNick = formData.get("userNickName");
    let userChoice = formData.get("userChoice");
    let computerChoice = (userChoice == "O" ? "X" : "O");      //Initialise choice
    playerOne = makePlayer(userNick, userChoice, 0);       //Initialise players
    playerTwo = makePlayer("Computer", computerChoice, 0);
    playernameUI.textContent = playerOne.getNickName();    //Reset .status bar
    gameboard.updateScore();
    document.querySelector(".status").style.visibility = "visible";
    gameboard.reset();
    gameboardUI.style.visibility = "visible";
    startButton.value = "RESET";
    formDialog.close();

})

const initialise = (name, choice) => {

}


const makePlayer = (name, choice, score) => { 
    const getNickName = () => name;
    const getChoice = () => choice;
    const getScore = () => score;

    const makeMove = (position) => { // Accept 'position' as a parameter

        function checkWinner () {   /**CHECKS IF THE MOVE RESULTED IN A VICTORY BY THE PLAYER */

            const grid = gameboard.grid;

            function winner() { //Declares winner, gives one point to winner, resets board, updates score on screen
                let message = `The winner is ${name}! Game reset`;
                alert(`The winner is ${name}!`);
                console.log(message);
                gameboard.reset();
                score++;
                gameboard.updateScore(); 
                winner = name;
            }

            for (let i = 0; i < 3; i++) {

                if (grid.topleft === choice && grid.topcenter === choice && grid.topright === choice){
                    winner()
                } else if (grid.midleft === choice && grid.midcenter === choice && grid.midright === choice){
                    winner()
                } else if (grid.btmleft === choice && grid.btmcenter === choice && grid.btmright === choice){
                    winner()
                } else if (grid.topleft === choice && grid.midleft === choice && grid.btmleft === choice){
                    winner()
                } else if (grid.topcenter === choice && grid.midcenter === choice && grid.btmcenter === choice){
                    winner()
                } else if (grid.topright === choice && grid.midright === choice && grid.btmright === choice){
                    winner()
                } else if (grid.topleft === choice && grid.midcenter === choice && grid.btmright === choice){
                    winner()
                } else if (grid.topright === choice && grid.midcenter === choice && grid.btmleft === choice){
                    winner()
                } 

                if (gameboard.isFilled()) {
                    gameboard.reset();
                    alert(`It's a draw! No more moves. Game reset`)
                }
        return {winner}
        };
    }

    function getRandomEmptyIndex() {
        console.log("Current Grid:", gameboard.grid); // Log the grid for debugging
        let emptyKeys = [];
    
        // Collect all keys where the grid element is empty (undefined)
        for (let key in gameboard.grid) {
            if (gameboard.grid[key] === undefined) {
                emptyKeys.push(key);
            }
        }
    
        // If there are no empty keys, return null or handle as needed
        if (emptyKeys.length === 0) {
            return null;
        }
    
        // Generate a random key from the emptyKeys array
        const randomIndex = Math.floor(Math.random() * emptyKeys.length);
        return emptyKeys[randomIndex];
    }
    
        if (name == "Computer") {  /**RANDOMISE COMPUTER'S MOVE */

            position = getRandomEmptyIndex();
            gameboard.grid[position] = choice;
            gameboard.updateUI(); // Update the UI to reflect the move
            checkWinner();

        } else { /**USER'S MOVE */

            if (gameboard.grid[position] !== undefined) {
                alert(`${name}, that square is already taken, choose another!`);
                move = "invalid";
            } else {
                gameboard.grid[position] = choice;
                move = "valid";
                gameboard.updateUI(); // Update the UI to reflect the move
                checkWinner();
            }
        }

        // Add the fade-in effect after updating the UI
        const moveElement = document.getElementById(position);
        moveElement.classList.add('show'); // Apply the .show class to trigger the fade-in

    } 

    return {getNickName, getChoice, makeMove, getScore}

}

cells.forEach(cell => cell.addEventListener("click", (e) => {

    let position = e.target.id;

    playerOne.makeMove(position);

    if (winner == undefined && move == "valid") {
        setTimeout(() => {
            playerTwo.makeMove();
        }, 333); // 500 milliseconds = 1/3 second delay
    }
    else if (winner != undefined) {
        winner = undefined;
        setTimeout(() => {
            playerTwo.makeMove();
        }, 150)
    };
}))