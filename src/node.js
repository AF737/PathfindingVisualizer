'use strict';

export default class Node {
    constructor(id, row, col, currClass, start, finish) {
        this.id = id;
        this.class = currClass;
        this.row = row;
        this.column = col;
        this.weight = 0;
        this.isStart = start;
        this.isFinish = finish;
        this.isVisited = false;
        this.isWall = false;
        this.distance = Infinity;
        this.prevNode = null;
    }
}