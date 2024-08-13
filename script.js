/** SET UP */

const cells = document.querySelectorAll(".move");

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

    return {grid, reset, isFilled, updateUI}
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
    let computerChoice = (userChoice == "O" ? "X" : "O");
    playerOne = makePlayer(userNick, userChoice);
    playerTwo = makePlayer("Computer", computerChoice);
    formDialog.close();

})

const initialise = (name, choice) => {

}


const makePlayer = (name, choice) => {
    const getNickName = () => name;
    const getChoice = () => choice;

    const makeMove = (position) => { // Accept 'position' as a parameter

        function checkWinner () {   /**CHECKS IF THE MOVE RESULTED IN A VICTORY BY THE PLAYER */

            const grid = gameboard.grid;

            for (let i = 0; i < 3; i++) {
                let message = `The winner is ${name}! Game reset`;

                if (grid.topleft === choice && grid.topcenter === choice && grid.topright === choice){
                        alert(`The winner is ${name}!`);
                        console.log(message);
                        gameboard.reset();
                        winner = name;
                } else if (grid.midleft === choice && grid.midcenter === choice && grid.midright === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.btmleft === choice && grid.btmcenter === choice && grid.btmright === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.topleft === choice && grid.midleft === choice && grid.btmleft === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.topcenter === choice && grid.midcenter === choice && grid.btmcenter === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.topright === choice && grid.midright === choice && grid.btmright === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.topleft === choice && grid.midcenter === choice && grid.btmright === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
                } else if (grid.topright === choice && grid.midcenter === choice && grid.btmleft === choice){
                    alert(`The winner is ${name}!`);
                    console.log(message);
                    gameboard.reset();
                    winner = name;
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
    } 

    return {getNickName, getChoice, makeMove}

}

cells.forEach(cell => cell.addEventListener("click", (e) => {
    let position = e.target.id;
    playerOne.makeMove(position);
    if (winner == undefined && move == "valid") {playerTwo.makeMove()}
    else {winner = undefined};
}))