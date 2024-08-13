/** SET UP */

const gameboard = (() => {
    const grid = [ , , , , , , , , , ]
    return {grid}
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
    playerOne = makePlayer(formData.get(userNick), formData.get(userChoice));
    formDialog.close();

    
})

const makeCompPlayer = (name, choice) => {

}


const makePlayer = (name, choice) => {
    const getNickName = () => name;
    const getChoice = () => choice;

    const makeMove = (n) => {

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
                if (grid[gridTemplate[i][0]] == choice         /**CHECK HORIZONTALLY*/
                    && grid[gridTemplate[i][1]] == choice
                    && grid[gridTemplate[i][2]] == choice) {
                    console.log(`The winner is ${name}!`);
                    winner = name;
                } else if (grid[gridTemplate[0][i]] == choice  /**CHECK VERTICALLY*/
                    && grid[gridTemplate[1][i]] == choice
                    && grid[gridTemplate[2][i]] == choice) {
                    console.log(`The winner is ${name}!`);
                    winner = name;
                } else if (grid[gridTemplate[0][0]] == choice  /**CHECK ACROSS*/
                    && grid[gridTemplate[1][1]] == choice
                    && grid[gridTemplate[2][2]] == choice) {
                    console.log(`The winner is ${name}!`);
                    winner = name;
                    break; //need to break otherwise will win 3 times (i count)
                    
                } else if (grid[gridTemplate[0][2]] == choice  
                    && grid[gridTemplate[1][1]] == choice
                    && grid[gridTemplate[2][0]] == choice) {
                    console.log(`The winner is ${name}!`);
                    winner = name;
                    break; //see above

                };}
        return {winner}
        };

        if (gameboard.grid[n] != undefined) {console.log(`${name}, that square is already taken, choose another!`)}
        else if (gameboard.grid[n] == undefined) {
            gameboard.grid[n] = choice;
            checkWinner();}
    } 

    return {getNickName, getChoice, makeMove}
}