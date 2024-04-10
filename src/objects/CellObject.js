export class CellObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
        this.id = `${x}-${y}`;
    }

    move({dx, dy}) {
        if(!this.isAlive()) {
            return;
        }
        this.x += dx;
        this.y += dy;
    }

    isAlive() {
        return this.alive;
    }

    kill() {
        this.alive = false;
    }

    revive() {
        this.alive = true;
    }
}