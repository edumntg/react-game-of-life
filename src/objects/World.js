import { CellObject } from "./CellObject";

export class World{
    static MOVES = [
        {x: -1, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1}
    ];

    static NEIGHBORS_POS = [
        ...World.MOVES,
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: -1},
        {x: -1, y: 1}
    ];

    constructor(size, numOfCells) {;
        this.size = size;
        this.N = this.size * this.size;

        //this.grid = [];
        this.cells = [];
        // for(let i = 0; i < this.size; i++) {
        //     this.grid.push(new Array(this.size).fill(-1));
        // }

        this.count = 0;

        // Initialize world
        this.initializeWorld(numOfCells);

        this.stepsPerformed = 0;
    }

    static fromWorld(world) {
        // Create new world
        const newWorld = new World(world.size, world.numOfCells);
        newWorld.cells = world.cells;
        newWorld.count = world.count;
        newWorld.stepsPerformed = world.stepsPerformed;

        return newWorld;

    }

    isPosValid(pos) {
        return pos.x >= 0 && pos.x < this.size && pos.y >= 0 && pos.y < this.size;
    }

    initializeWorld(numOfCells) {
        for(let i = 0; i < numOfCells; i++) {
            // Get a random position
            let pos = this.randomFreePosition();
            // Create cell
            let cell = new CellObject(pos.x, pos.y);
            // Add to world
            this.addCell(cell);
        }
    }

    addCell(cell) {
        //this.grid[cell.x][cell.y] = cell;
        this.cells.push(cell);
        this.count++;
    }

    removeCell(x, y) {
        //this.grid[x][y] = -1;
        this.count--;
    }

    randomPosition() {
        const x = Math.round(Math.random())*this.size;
        const y = Math.round(Math.random())*this.size;
        return {x, y}
    }

    randomFreePosition() {
        if(this.count === this.N) {
            // No empty spaces
            return undefined;
        }
        while(true) {
            const x = Math.floor(Math.random()*this.size);
            const y = Math.floor(Math.random()*this.size);
            if(!this.cells.find(cell => cell.x === x && cell.y === y)) {
                return {x, y};
            }
        }
    }

    canMove(cell, dx, dy) {
        const newPos = {x: cell.x + dx, y: cell.y + dy};

        if(!this.isPosValid(newPos)) {
            return false;
        }

        // Check if position is busy
        if(this.hasCell(newPos.x, newPos.y)) {
            return false;
        }

        // Check if cell is dead
        if(!cell.isAlive()) {
            return false;
        }

        return true;

    }
    
    hasCell(x, y) {
        return !!this.get(x,y);
    }
    
    randomMovement(cell) {

        // Pick change in position
        const ds = World.MOVES[Math.floor(Math.random()*World.MOVES.length)];
        const dx = ds.x;
        const dy = ds.y;

        if(!this.canMove(cell, dx, dy)) {
            return;
        }
        // Move cell
        cell.move({dx, dy});

        // Update cells array
        const cellIndex = this.cells.findIndex(_cell => _cell.id === cell.id);
        this.cells[cellIndex] = cell;

        // Remove cell from old world pos
        //this.grid[oldPos.x][oldPos.y] = -1;
        
        // Add cell to new pos
        //this.grid[newPos.x][newPos.y] = cell;
    }

    get(x, y) {
        return this.cells.find(cell => cell.x === x && cell.y === y);
        //return this.grid[x][y];
    }

    getNeighbors(cell) {
        let neighbors = [];
        for(let ds of World.NEIGHBORS_POS) {
            let pos = {x: cell.x + ds.x, y: cell.y + ds.y};
            if(!this.isPosValid(pos)) {
                continue;
            }

            if(this.hasCell(pos.x, pos.y) && this.get(pos.x, pos.y).id != cell.id) {
                neighbors.push(this.get(pos.x, pos.y))
            }
        }

        return neighbors;
    }

    getNeighborsAlive(cell) {
        // Get neighbors
        let neighbors = this.getNeighbors(cell);

        // Filter out dead cells
        neighbors = neighbors.filter(cell => cell.isAlive());

        return neighbors;
    }

    step() {
        // Loop through cells
        let cellsKilled = 0;
        let cellsRevived = 0;
        for(let cell of this.cells) {
            // Rule 1: Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            let neighbors = this.getNeighborsAlive(cell);
            if(cell.isAlive() && neighbors.length < 2) {
                cell.kill();
                cellsKilled++;
                continue;
            }

            // Rule 2: Any live cell with two or three live neighbors lives on to the next generation.
            if(cell.isAlive() && neighbors.length >= 2 && neighbors.length <= 3) {
                // Move cell
                this.randomMovement(cell);
                continue;
            }

            // Rule 3: Any live cell with more than three live neighbors dies, as if by overpopulation.
            if(cell.isAlive() && neighbors.length > 3) {
                cell.kill();
                cellsKilled++;
                continue;
            }

            // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if(!cell.isAlive() && neighbors.length === 3) {
                cell.revive();
                cellsRevived++;
                continue;
            }
        }

        this.stepsPerformed++;

        console.log("Number of cells alive", this.cells.filter(cell => cell.isAlive()).length);
        console.log("Killed:", cellsKilled, ", revived:", cellsRevived);
    }
}