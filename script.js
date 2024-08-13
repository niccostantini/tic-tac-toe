const gameboard = (() => {
    const grid = [ , , , , , , , , , ]
    return {grid}
})()



const makePlayer = (name, choice) => {
    const getNickName = () => name;
    const getChoice = () => choice;
    const makeMove = (n) => {

        gameboard.grid[n] = choice;

        function checkWinner () {   /**CHECKS IF THE MOVE RESULTED IN A VICTORY BY THE PLAYER */
            const winSequences = [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ] 
            const grid = gameboard.grid;
            /**CI VUOLE IL CICLO FOR SENNò NON VEDE TUTTE LE POSSIBILITà */
            for (let i = 0; i < 3; i++) {
                if (grid[winSequences[i][0]] == "o"         /**CHECK HORIZONTALLY*/
                    && grid[winSequences[i][1]] == "o"
                    && grid[winSequences[i][2]] == "o") {
                    console.log("WE HAVE A WINNER!")
                } else if (grid[winSequences[0][i]] == "o"  /**CHECK VERTICALLY*/
                    && grid[winSequences[1][i]] == "o"
                    && grid[winSequences[2][i]] == "o") {
                    console.log("WE HAVE A WINNER!")
                } else if (grid[winSequences[0][0]] == "o"  /**CHECK ACROSS*/
                    && grid[winSequences[1][1]] == "o"
                    && grid[winSequences[2][2]] == "o") {
                    console.log("WE HAVE A WINNER!"); break; //need to break otherwise will win 3 times (i count)
                } else if (grid[winSequences[0][2]] == "o"  
                    && grid[winSequences[1][1]] == "o"
                    && grid[winSequences[2][0]] == "o") {
                    console.log("WE HAVE A WINNER!"); break;
                };}

        };

        checkWinner();
    } 

    return {getNickName, getChoice, makeMove}
}