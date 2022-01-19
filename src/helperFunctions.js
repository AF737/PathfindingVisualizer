'use strict';

export {enableButtons, disableButtons, changeWallStatus, removeWalls,
        resetToggleButtons, disableToggleButtons, enableDirections,
        enableCornerCutting, removePreviousAlgorithm, resetStartAndFinish,
        setAndDisableDirections};

function enableButtons() {
    let dropDownButtons = document.getElementsByClassName('dropDownButton');

    for (const button of dropDownButtons.length) {
        button.disabled = false;
    }

    let menuButtons = document.getElementsByClassName('menuButton');

    for (const button of menuButtons.length) {
        button.disabled = false;
    }
}

function disableButtons() {
    let dropDownButtons = document.getElementsByClassName('dropDownButton');

    for (const button of dropDownButtons.length) {
        button.disabled = true;
    }

    let menuButtons = document.getElementsByClassName('menuButton');

    for (const button of menuButtons.length) {
        button.disabled = true;
    }
}

function changeWallStatus(id, newWallStatus, gridBoard) {
    const [descriptor, row, col] = id.split('-');
    
    gridBoard.nodesMatrix[row][col].isWall = newWallStatus;
}

function removeWalls(gridBoard) {
    for (let row = 0; row < gridBoard.rows; row++) {
        for (let col = 0; col < gridBoard.columns; col++) {
            if (gridBoard.nodesMatrix[row][col].isWall === true) {
                gridBoard.nodesMatrix[row][col].isWall = false;
                document.getElementById(`node-${row}-${col}`).className = 'unvisited';
            } 
        }
    }
}

function removePreviousAlgorithm(gridBoard) {
    for (let row = 0; row < gridBoard.rows; row++) {
        for (let col = 0; col < gridBoard.columns; col++) {
            let node = document.getElementById(`node-${row}-${col}`);

            /* Leave walls and weights as they are */
            if (node.className === 'visited' || node.className === 'shortestPath' ||
                node.className === 'jumpPoint') {
                node.className = 'unvisited';
            }

            /* Reset each element in the nodesMatrix so that the next algorithm
                can start fresh */
            gridBoard.nodesMatrix[row][col].isVisited = false;
            gridBoard.nodesMatrix[row][col].distanceFromStart = Infinity;
            gridBoard.nodesMatrix[row][col].distanceFromFinish = Infinity;
            gridBoard.nodesMatrix[row][col].heuristicDistance = Infinity;
            gridBoard.nodesMatrix[row][col].totalDistance = Infinity;
            gridBoard.nodesMatrix[row][col].prevNode = null;
            gridBoard.nodesMatrix[row][col].prevNodeFromFinish = null;
            gridBoard.nodesMatrix[row][col].direction = null;
            gridBoard.nodesMatrix[row][col].isJumpPoint = false;
        }
    }
    
    document.getElementById(`node-${gridBoard.startRow}-${gridBoard.startCol}`)
        .className = 'start';
    document.getElementById(`node-${gridBoard.finishRow}-${gridBoard.finishCol}`)
    .className = 'finish';
}

/* Place start and finish at their original positions from when the grid was first
    created */
function resetStartAndFinish(gridBoard) {
    document.getElementById(`node-${gridBoard.startRow}-${gridBoard.startCol}`)
        .className = 'unvisited';
    document.getElementById(`node-${gridBoard.finishRow}-${gridBoard.finishCol}`)
        .className = 'unvisited';
    
    gridBoard.startRow = Math.floor(gridBoard.rows / 2);
    gridBoard.startCol = Math.floor(gridBoard.columns / 4);
    gridBoard.finishRow = Math.floor(gridBoard.rows / 2);
    gridBoard.finishCol = Math.floor((gridBoard.columns / 4) * 3);

    document.getElementById(`node-${gridBoard.startRow}-${gridBoard.startCol}`)
        .className = 'start';
    document.getElementById(`node-${gridBoard.finishRow}-${gridBoard.finishCol}`)
        .className = 'finish';
}

function resetToggleButtons() {
    document.getElementById('directionsToggleButton').checked = false;
    document.getElementById('cornerCuttingToggleButton').checked = false;
}

function disableToggleButtons() {
    document.getElementById('directionsToggleButton').disabled = true;
    document.getElementById('directionsSwitch').style.backgroundColor = 'red';
    document.getElementById('cornerCuttingToggleButton').disabled = true;
    document.getElementById('cornerCuttingSwitch').style.backgroundColor = 'red';
}

function enableDirections() {
    document.getElementById('directionsToggleButton').disabled = false;
    document.getElementById('directionsSwitch').style.backgroundColor = '#79e082';
}

/* Used for Jump Point Search where only eight directions are allowed */
function setAndDisableDirections() {
    document.getElementById('directionsToggleButton').checked = true;
    document.getElementById('directionsToggleButton').disabled = true;
    document.getElementById('directionsToggleButton').style.backgroundColor = 'red';
}

function enableCornerCutting() {
    document.getElementById('cornerCuttingToggleButton').disabled = false;
    document.getElementById('cornerCuttingSwitch').style.backgroundColor = '#79e082';
}