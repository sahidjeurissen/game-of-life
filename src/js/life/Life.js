import Cell from '@/js/life/entity/Cell';

class Life {
    /**
     * @type {number}
     */
    cols = 0;

    /**
     * @type {number}
     */
    rows = 0;

    /**
     * @type {Cell[]}
     */
    cells = [];

    /**
     * @type {boolean}
     */
    initialStateRendering = true;

    /**
     * @type {number}
     */
    fillRate = 0.4;

    /**
     * @param cols {number}
     * @param rows {number}
     * @param initialStateRendering {boolean}
     */
    constructor(cols, rows, initialStateRendering = true) {
        this.cols = cols;
        this.rows = rows;
        this.initialStateRendering = initialStateRendering;

        this.fill();
    }

    fill() {
        const numberOfCells = this.cols * this.rows;

        for (let i = 0; i < numberOfCells; i += 1) {
            const cell = new Cell(i);
            cell.x = i % this.cols;
            cell.y = Math.floor(i / this.rows);

            if (this.initialStateRendering && Math.random() < this.fillRate) {
                cell.active = true;
            }

            this.cells.push(cell);
        }
    }

    nextGeneration() {
        for (let i = 0; i < this.cells.length; i += 1) {
            this.checkNeighbours(i);
        }

        for (let i = 0; i < this.cells.length; i += 1) {
            this.cells[i].update();
        }
    }

    checkNeighbours(i) {
        const cell = this.cells[i];

        const coordinateModifiers = [
            {
                x: -1,
                y: -1,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: 1,
                y: -1,
            },
            {
                x: 1,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 1,
            },
            {
                x: -1,
                y: 0,
            },
        ];

        const neighbourCellsActive = coordinateModifiers.reduce((activeCells, modifier) => {
            if (this.checkCellActiveState(cell.x + modifier.x, cell.y + modifier.y)) {
                return activeCells + 1;
            }

            return activeCells;
        }, 0);

        // Any live cell with two or three live neighbors survives.
        if (cell.active && (neighbourCellsActive === 2 || neighbourCellsActive === 3)) {
            cell.nextStateActive = true;
            return;
        }

        // Any dead cell with three live neighbors becomes a live cell.
        if (!cell.active && neighbourCellsActive === 3) {
            cell.nextStateActive = true;
            return;
        }

        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        cell.nextStateActive = false;
    }

    /**
     * @param x
     * @param y
     * @returns {boolean}
     */
    checkCellActiveState(x, y) {
        if (x < 0 || y < 0 || x > (this.cols - 1) || y > (this.rows - 1)) {
            return false;
        }

        return this.fetchCellByXY(x, y).active;
    }

    /**
     * @param x
     * @param y
     * @returns {Cell}
     */
    fetchCellByXY(x, y) {
        return this.cells[x + (y * this.cols)];
    }
}

export default Life;
