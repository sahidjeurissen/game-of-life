class Cell {
    /**
     * @type {number}
     */
    index = 0;

    /**
     * @type {number}
     */
    x = 0;

    /**
     * @type {number}
     */
    y = 0;

    /**
     * @type {boolean}
     */
    active = false;

    /**
     * @type {boolean}
     */
    nextStateActive = false;

    /**
     * @param index {number}
     */
    constructor(index) {
        this.index = index;
    }

    update() {
        this.active = this.nextStateActive;
    }
}

export default Cell;
