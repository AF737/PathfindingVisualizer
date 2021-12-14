'use strict';

export {depthFirstSearch};

function depthFirstSearch(grid, startNode, finishNode) {
    const visitedNodes = [];
    const nodesToCheck = [];
    startNode.isVisited = true;
    visitedNodes.push(startNode);
    nodesToCheck.push(startNode);

    while (nodesToCheck.length > 0) {
        /* Always check the last of the node the array */
        const currentNode = nodesToCheck.pop();

        if (currentNode.isWall === true) {
            continue;
        }
        
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);

        if (currentNode === finishNode) {
            let currentNode = finishNode;
            /* Just called path, because this algorithm doesn't
                necessarily produce the shortest path from start
                to finish */
            const path = [];

            while (currentNode !== null) {
                path.unshift(currentNode);
                currentNode = currentNode.prevNode;
            }

            return [visitedNodes, path];
        }

        /* Add the unvisited neighbors to the array */
        nodesToCheck.push.apply(nodesToCheck, updateUnvisitedNeighbors(grid, currentNode));
    }
}

function updateUnvisitedNeighbors(grid, node) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, node);

    /* Set the previous node of all neighbors to the node that
        we found them from so that we can backtrack from the
        finish node to the start node for the path */
    for (const neighbor of unvisitedNeighbors) {
        neighbor.prevNode = node;
    }

    return unvisitedNeighbors;
}

function getUnvisitedNeighbors(grid, node) {
    const neighbors = [];
    const row = node.row;
    const col = node.column;

    if (row > 0) {
        neighbors.push(grid.nodesMatrix[row - 1][col]);
    }

    if (row < (grid.rows - 1)) {
        neighbors.push(grid.nodesMatrix[row + 1][col]);
    }

    if (col > 0) {
        neighbors.push(grid.nodesMatrix[row][col - 1]);
    }

    if (col < (grid.columns - 1)) {
        neighbors.push(grid.nodesMatrix[row][col + 1]);
    }

    /* Only return the neighbors that haven't been visited yet */
    return neighbors.filter(checkUnvisited);
}

function checkUnvisited(neighbor) {
    return neighbor.isVisited === false;
}