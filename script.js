/** SET UP */

const gameboard = (() => {
    let grid = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]
    
    const reset = () => {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = undefined;
        }
    };

    const isFilled = () => {
        return grid.every(cell => cell != undefined);
    };

    return {grid, reset, isFilled}
})()

let playerOne;
let playerTwo;

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

    const makeMove = (n = 0) => {

        function checkWinner () {   /**CHECKS IF THE MOVE RESULTED IN A VICTORY BY THE PLAYER */
            const gridTemplate = [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ] 
            var winner;
            const grid = gameboard.grid;
            /**CI VUOLE IL CICLO FOR SENNò NON VEDE TUTTE LE POSSIBILITà */

            for (let i = 0; i < 3; i++) {
                let message = `The winner is ${name}! Game reset`;
                if (grid[gridTemplate[i][0]] == choice         /**CHECK HORIZONTALLY*/
                    && grid[gridTemplate[i][1]] == choice
                    && grid[gridTemplate[i][2]] == choice) {
                        alert(`The winner is ${name}!`);
                        console.log(message);
                        gameboard.reset()
                        winner = name;
                } else if (grid[gridTemplate[0][i]] == choice  /**CHECK VERTICALLY*/
                    && grid[gridTemplate[1][i]] == choice
                    && grid[gridTemplate[2][i]] == choice) {
                        alert(message);
                        console.log(message);
                        winner = name;
                } else if (grid[gridTemplate[0][0]] == choice  /**CHECK ACROSS*/
                    && grid[gridTemplate[1][1]] == choice
                    && grid[gridTemplate[2][2]] == choice) {
                        console.log(message);
                        alert(message);
                        winner = name;
                    break; //need to break otherwise will win 3 times (i count)
                    
                } else if (grid[gridTemplate[0][2]] == choice  
                    && grid[gridTemplate[1][1]] == choice
                    && grid[gridTemplate[2][0]] == choice) {
                        console.log(message);
                        alert(message);
                        winner = name;
                    break; //see above
                };}

                if (gameboard.isFilled()) {
                    gameboard.reset();
                    alert(`It's a draw! No more moves. Game reset`)
                }
        return {winner}
        };

        function getRandomEmptyIndex() {
            console.log("Current Grid:", gameboard.grid); // Log the grid for debugging
            let emptyIndices = [];
        
            // Collect all indices where the grid element is empty (undefined or null)
            gameboard.grid.forEach((value, index) => {
                if (value == undefined) {
                    emptyIndices.push(index);
                }
            });
        
            // If there are no empty indices, return null or handle as needed
            if (emptyIndices.length === 0) {
                return null;
            }
        
            // Generate a random index from the emptyIndices array
            const randomIndex = Math.floor(Math.random() * emptyIndices.length);
            return emptyIndices[randomIndex];
        }
        
        

        if (name == "Computer") {  /**RANDOMISE COMPUTER'S MOVE */

            // n = getRandomEmptyIndex();
            gameboard.grid[n] = choice;
            checkWinner();

        } else if (name != "Computer") {  /**USER'S MOVE */

            if (gameboard.grid[n] != undefined) {
                alert(`${name}, that square is already taken, choose another!`)
                }
            else if (gameboard.grid[n] == undefined) {

                gameboard.grid[n] = choice;
                checkWinner();}
        }
    } 

    return {getNickName, getChoice, makeMove}
}