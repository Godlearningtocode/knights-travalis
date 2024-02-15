#!/usr/bin/env node

const knightMoves = (startLocation, endLocation) => {
    function validatePosition(currentPosition) {
        let validCurrentPosition = true;
        if(currentPosition[0] < 0 || currentPosition[0] > 7 || currentPosition[1] < 0 || currentPosition[1] > 7) validCurrentPosition = false;
        if(!validCurrentPosition) return false
        
        return true
    }

    function validMoves(currentPosition) {
        validatePosition(currentPosition);
        let possibleMoves = [];
        let validMovesArray = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-1, -2], [-2, -1]];

        for(let i = 0; i < validMovesArray.length; i++) {
            let newSquare = [];
            newSquare.push(validMovesArray[i][0] + currentPosition[0]);
            newSquare.push(validMovesArray[i][1] + currentPosition[1]);
            if(validatePosition(newSquare)) {
                possibleMoves.push(newSquare);
            }
        }

        return possibleMoves
    }

    function chessSquare(currentPosition) {
        let allowedMoves = validMoves(currentPosition);
        return {currentPosition, allowedMoves}
    }

    function gameBoard() {
        const board = [];
        for(let i = 0; i < 8; i++) {
            board[i] = [];
            for(let j = 0; j < 8; j++) {
                board[i][j] = chessSquare([i, j])
            }
        }
        return board;
    }

    function breadthFirstSearch() {
        let makeBoard = gameBoard();

        function moveTracking(position) {
            let square = makeBoard[position[0]][position[1]];
            let location = square.currentPosition
            let legalMoves = square.allowedMoves;
            let moveHistory = [];
            moveHistory.push(position);
            return {location, legalMoves, moveHistory}
        }

        let startingPosition = moveTracking(startLocation);
        let queue = [];
        let visited = [];
        queue.push(startingPosition)
        while(queue.length > 0) {
            console.log()
            let thisLocation = queue.shift();
            visited.push(thisLocation.location);
            let futureMoves = thisLocation.legalMoves;
            for(let i = 0; i < futureMoves.length; i++) {
                if(!visited.includes(futureMoves[i])) {
                    visited.push(futureMoves[i]);
                    let newLocation = moveTracking(futureMoves[i]);
                    let newMoveHistroy = thisLocation.moveHistory.concat(newLocation.moveHistory);
                    newLocation.moveHistory = newMoveHistroy;
                    queue.push(newLocation);
                    if(newLocation.location[0] === endLocation[0] && newLocation.location[1] === endLocation[1]) return newLocation.moveHistory
                }
            }
        }
    }

    let shortestPath = breadthFirstSearch();

    return shortestPath
}

console.log(knightMoves([0, 0], [5, 5]))