import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);

const startButton = document.getElementById('start');

const winDiv = document.getElementById('win-message');
const lossDiv = document.getElementById('loss-message');

let isGame = false;


startButton.addEventListener('click', () => {
    startGame(game);
});

const game = Array();

game[0] = [ 
    [0, 3, 0, 1],
    [1, 3, 1, 3],
    [1, 2, 1, 1],
    [2, 2, 1, 2],
    [2, 3, 0, 0],
    [2, 4, 0, 0],
    [2, 5, 1, 0],
    [3, 5, 0, 1],
    [4, 5, 1, 3],
    [4, 4, 0, 0],
    [4, 3, 1, 1],
    [5, 3, 0, 1],
    [6, 3, 0, 1]
];

game[1] = [
    [0, 3, 0, 1],
    [1, 3, 0, 1],
    [2, 3, 1, 3],
    [2, 2, 0, 0],
    [2, 1, 1, 1],
    [3, 1, 1, 2],
    [3, 2, 0, 0],
    [3, 3, 0, 0],
    [3, 4, 1, 3],
    [2, 4, 1, 1],
    [2, 5, 1, 0],
    [3, 5, 0, 1],
    [4, 5, 0, 1],
    [5, 5, 1, 3],
    [5, 4, 0, 0],
    [5, 3, 1, 1],
    [6, 3, 0, 1]
];

game[2] = [
    [0, 3, 0, 1],
    [1, 3 ,0, 1],
    [2, 3, 0, 1],
    [3, 3 ,1, 2],
    [3, 4, 0, 0],
    [3, 5, 1, 3],
    [2, 5, 0, 1],
    [1, 5, 1, 1],
    [1, 6, 1, 0],
    [2, 6, 0, 1],
    [3, 6, 0, 1],
    [4, 6, 1, 3],
    [4, 5, 1, 1],
    [5, 5, 1, 3],
    [5, 4, 0, 0],
    [5, 3, 1, 1],
    [6, 3, 0, 1]
];

game[3] = [
    [0, 3, 0, 1],
    [1, 3, 1, 3],
    [1, 2, 1, 1],
    [2, 2, 1, 2],
    [2, 3, 0, 0],
    [2 ,4, 1, 0],
    [3, 4, 1, 3],
    [3, 3, 0, 0],
    [3, 2, 1, 1],
    [4, 2, 1, 2],
    [4, 3, 0, 0],
    [4, 4, 1, 0],
    [5, 4, 1, 3],
    [5, 3, 1, 1],
    [6, 3, 0, 1]
];

// startGame(game1);

function startGame(gameArray) {
    const gameIndex = Math.floor(Math.random() * 4);
    console.log(gameIndex);
    let game = gameArray[gameIndex];
    grid.clearCells();
    grid.setGame();
    startButton.style.setProperty('display', 'none');
    winDiv.classList.remove('visible');
    lossDiv.classList.remove('visible');
    for (let i = 0; i < game.length; i++) {
        grid.getCell(game[i][0], game[i][1]).linkTile(new Tile(gameBoard, game[i][2], Math.floor(Math.random() * 4)));
        // grid.getCell(game[i][0], game[i][1]).linkTile(new Tile(gameBoard, game[i][2], game[i][3]));
    }
    grid.cells.forEach(cell => {
        if (!cell.isEmpty()) {
            cell.linkedTile.tileElement.addEventListener('click', () => {
                cell.linkedTile.setValue(++cell.linkedTile.value);
                if (isWin(game)) {
                    isGame = false;
                    clearInterval(interval);
                    grid.setWin();
                    startButton.style.setProperty('display', 'inline-block');
                    winDiv.classList.add('visible');
                }
            });
        }
    });

    var c = 0;
    var interval = setInterval(function(){
        
        c++;
        document.getElementById('loader-line').style.setProperty("--width", `${c}%`)
        if (c == 100) {
            clearInterval(interval);
            grid.setLoss();
            startButton.style.setProperty('display', 'inline-block');
            lossDiv.classList.add('visible');
        }
    }, 400);
    
}

function isWin(game) {
    let win = true;
    game.forEach(el => {
        const cell = grid.getCell(el[0], el[1]);
        const degree = cell.linkedTile.value;
        if (el[2] == 0) {
            // линия
            if (degree % 2 != el[3]) {
                win = false;
            }
        } else if (el[2] == 1) {
            // угол
            if (degree % 4 != el[3]) {
                win = false;
            }
        }
        
    });
    return win;
}

