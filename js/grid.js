import { Cell } from "./cell.js";

const  GRID_SIZE = 7;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
    constructor(gridElement) {
        this.gridElement = gridElement;
        this.cells = [];
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(
                new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
            );
            
        }
        gridElement.classList.add('game');
    }

    getCell(x, y) {
        return this.cells[y * GRID_SIZE + x];
    }

    clearCells() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(function(el){
            el.parentNode.removeChild(el);
        });
        
    }

    setWin() {
        this.gridElement.classList.remove("game");
        this.gridElement.classList.add("win");
    }

    setGame() {
        this.gridElement.classList.remove("win");
        this.gridElement.classList.remove("loss");
        this.gridElement.classList.add("game");
    }

    setLoss() {
        this.gridElement.classList.remove("game");
        this.gridElement.classList.add("loss");
    }


}