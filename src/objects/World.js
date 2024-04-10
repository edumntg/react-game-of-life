import { CellObject } from "./CellObject";

export class World{
    constructor(width, height, numOfCells) {
        this.width = width;
        this.height = height;
        this.N = this.width * this.height;

        this.grid = [];
        for(let i = 0; i < this.height; i++) {
            this.grid.push(new Array(this.width).fill(-1));
        }

        this.count = 0;

        // Initialize world
        this.initializeWorld(numOfCells);
    }

    initializeWorld(numOfCells) {
        for(let i = 0; i < numOfCells; i++) {
            // Get a random position
            let pos = this.randomFreePosition();
            // Create cell
            let cell = new CellObject(pos.x, pos.y, true);
            // Add to world
            this.addCell(cell);
        }
    }

    addCell(cell) {
        this.grid[cell.x][cell.y] = cell;
        this.count++;
    }

    removeCell(x, y) {
        this.grid[x][y] = -1;
        this.count--;
    }

    randomPosition() {
        const x = Math.round(Math.random())*this.width;
        const y = Math.round(Math.random())*this.height;
        return {x, y}
    }

    randomFreePosition() {
        if(this.count === this.N) {
            // No empty spaces
            return undefined;
        }
        while(true) {
            const x = Math.floor(Math.random()*this.width);
            const y = Math.floor(Math.random()*this.height);
            if(this.grid[x][y] === -1) {
                return {x, y}
            }
        }
    }
}