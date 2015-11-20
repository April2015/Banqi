var aiService;
(function (aiService) {
    /** Returns the move that the computer player should do for the given updateUI. */
    // export function findComputerMove(move: IMove): IMove {
    //   return createComputerMove(move,
    //       // at most 1 second for the AI to choose a move (but might be much quicker)
    //       {millisecondsLimit: 1000});
    // }
    /**
     * Returns the move that the computer player should do for the given state.
     * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
     * and it has either a millisecondsLimit or maxDepth field:
     * millisecondsLimit is a time limit, and maxDepth is a depth limit.
     */
    function createComputerMove(stateAfterMove, playerIndex, alphaBetaLimits) {
        var possibleMoves = gameLogic.getPossibleMoves(stateAfterMove, playerIndex);
        var p1Moves = [];
        var p2Moves = [];
        var p3Moves = [];
        var p4Moves = [];
        var p5Moves = [];
        var p6Moves = possibleMoves;
        for (var i = 0; i < possibleMoves.length; i++) {
            var delta = possibleMoves[i][1].set.value;
            if ((delta.rowAfterMove !== -1) || (delta.colAfterMove !== -1)) {
                //kill
                if (stateAfterMove[key(delta.rowAfterMove, delta.colAfterMove)]
                    !== '') {
                    //kill a unprotected piece
                    if (!isProtected(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowAfterMove, delta.colAfterMove)) {
                        p1Moves.push(possibleMoves[i]);
                    }
                    else {
                        p2Moves.push(possibleMoves[i]);
                    }
                }
                else {
                    //go to attack position that is not protected
                    if ((!isProtected(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowAfterMove, delta.colAfterMove))
                        && (isAttackPoint(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowAfterMove, delta.colAfterMove))) {
                        p3Moves.push(possibleMoves[i]);
                    }
                    //run away
                    if (!isProtected(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowAfterMove, delta.colAfterMove)
                        && isProtected(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowBeforeMove, delta.colBeforeMove)) {
                        p3Moves.push(possibleMoves[i]);
                    }
                    else if (!isProtected(stateAfterMove, delta.rowBeforeMove, delta.colBeforeMove, delta.rowAfterMove, delta.colAfterMove)) {
                        p4Moves.push(possibleMoves[i]);
                    }
                    else {
                        p5Moves.push(possibleMoves[i]);
                    }
                }
            }
            else {
                p4Moves.push(possibleMoves[i]);
            }
        }
        if (!angular.equals(p1Moves, [])) {
            return p1Moves[Math.floor(Math.random() * p1Moves.length)];
        }
        if (!angular.equals(p2Moves, [])) {
            return p2Moves[Math.floor(Math.random() * p2Moves.length)];
        }
        if (!angular.equals(p3Moves, [])) {
            return p3Moves[Math.floor(Math.random() * p3Moves.length)];
        }
        if (!angular.equals(p4Moves, [])) {
            return p4Moves[Math.floor(Math.random() * p4Moves.length)];
        }
        if (!angular.equals(p5Moves, [])) {
            return p5Moves[Math.floor(Math.random() * p5Moves.length)];
        }
        if (!angular.equals(p6Moves, [])) {
            return p6Moves[Math.floor(Math.random() * p6Moves.length)];
        }
    }
    aiService.createComputerMove = createComputerMove;
    function key(x, y) {
        return 'b' + x.toString() + 'x' + y.toString();
    }
    aiService.key = key;
    /**
     * Check if the piece/position is getting protected
     * that means, if I kill it, it has another can kill me back
     *
     * @param stateAfterMove
     * @param rowBefore
     * @param colBefore
     * @param rowAfter
     * @param colAfter
     * @returns {boolean}
     */
    function isProtected(stateAfterMove, rowBefore, colBefore, rowAfter, colAfter) {
        //check up
        if (rowAfter - 1 >= 0) {
            if (stateAfterMove[key(rowAfter - 1, colAfter)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter - 1, colAfter)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter - 1, colAfter)][1] >= stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter - 1, colAfter)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1'))
                        && !(stateAfterMove[key(rowAfter - 1, colAfter)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter - 1, colAfter)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7')))) {
                    return true;
                }
            }
        }
        //check left
        if (colAfter - 1 >= 0) {
            if (stateAfterMove[key(rowAfter, colAfter - 1)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter, colAfter - 1)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter, colAfter - 1)][1] >= stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter, colAfter - 1)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1'))
                        && !(stateAfterMove[key(rowAfter, colAfter - 1)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter, colAfter - 1)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7')))) {
                    return true;
                }
            }
        }
        //check down
        if (rowAfter + 1 <= 3) {
            if (stateAfterMove[key(rowAfter + 1, colAfter)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter + 1, colAfter)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter + 1, colAfter)][1] >= stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter + 1, colAfter)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1'))
                        && !(stateAfterMove[key(rowAfter + 1, colAfter)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter + 1, colAfter)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7')))) {
                    return true;
                }
            }
        }
        //check right
        if (colAfter + 1 <= 7) {
            if (stateAfterMove[key(rowAfter, colAfter + 1)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter, colAfter + 1)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter, colAfter + 1)][1] >= stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter, colAfter + 1)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1'))
                        && !(stateAfterMove[key(rowAfter, colAfter + 1)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter, colAfter + 1)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7')))) {
                    return true;
                }
            }
        }
        // check if protected by cannon
        var cannon;
        if (stateAfterMove[key(rowBefore, colBefore)][0] === 'R')
            cannon = 'B2';
        if (stateAfterMove[key(rowBefore, colBefore)][0] === 'B')
            cannon = 'R2';
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                if (stateAfterMove[key(i, j)] === cannon) {
                    if (cannonRule(stateAfterMove, i, j, rowAfter, colAfter)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /**
     * check if protected by cannon
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {boolean}
     */
    function cannonRule(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove) {
        //check if it's follow the cannon killing rule
        if (rowBeforeMove === rowAfterMove) {
            var cnt = 0;
            var bigger;
            var smaller;
            if (colBeforeMove > colAfterMove) {
                bigger = colBeforeMove;
                smaller = colAfterMove;
            }
            else {
                bigger = colAfterMove;
                smaller = colBeforeMove;
            }
            for (var i = smaller + 1; i < bigger; i++) {
                if (stateBeforeMove[key(rowAfterMove, i)] !== '') {
                    cnt++;
                }
            }
            if (cnt === 1) {
                return true;
            }
        }
        if (colBeforeMove === colAfterMove) {
            var cnt = 0;
            var bigger;
            var smaller;
            if (rowBeforeMove > rowAfterMove) {
                bigger = rowBeforeMove;
                smaller = rowAfterMove;
            }
            else {
                bigger = rowAfterMove;
                smaller = rowBeforeMove;
            }
            for (var i = smaller + 1; i < bigger; i++) {
                if (stateBeforeMove[key(i, colAfterMove)] !== '') {
                    cnt++;
                }
            }
            if (cnt === 1) {
                return true;
            }
        }
        return false;
    }
    function isAttackPoint(stateAfterMove, rowBefore, colBefore, rowAfter, colAfter) {
        //check up
        if (rowAfter - 1 >= 0) {
            if (stateAfterMove[key(rowAfter - 1, colAfter)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter - 1, colAfter)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter - 1, colAfter)][1] < stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter - 1, colAfter)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7'))
                        && !(stateAfterMove[key(rowBefore, colBefore)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter - 1, colAfter)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1')))) {
                    return true;
                }
            }
        }
        //check left
        if (colAfter - 1 >= 0) {
            if (stateAfterMove[key(rowAfter, colAfter - 1)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter, colAfter - 1)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter, colAfter - 1)][1] < stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter, colAfter - 1)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7'))
                        && !(stateAfterMove[key(rowBefore, colBefore)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter, colAfter - 1)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1')))) {
                    return true;
                }
            }
        }
        //check down
        if (rowAfter + 1 <= 3) {
            if (stateAfterMove[key(rowAfter + 1, colAfter)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter + 1, colAfter)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter + 1, colAfter)][1] < stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter + 1, colAfter)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7'))
                        && !(stateAfterMove[key(rowBefore, colBefore)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter + 1, colAfter)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1')))) {
                    return true;
                }
            }
        }
        //check right
        if (colAfter + 1 <= 7) {
            if (stateAfterMove[key(rowAfter, colAfter + 1)] !== ('' || null)) {
                if ((stateAfterMove[key(rowAfter, colAfter + 1)][0] !== stateAfterMove[key(rowBefore, colBefore)][0])
                    && (((stateAfterMove[key(rowAfter, colAfter + 1)][1] < stateAfterMove[key(rowBefore, colBefore)][1])
                        && !((stateAfterMove[key(rowAfter, colAfter + 1)][1] === '1') && (stateAfterMove[key(rowBefore, colBefore)][1] === '7'))
                        && !(stateAfterMove[key(rowBefore, colBefore)][1] === '2'))
                        || ((stateAfterMove[key(rowAfter, colAfter + 1)][1] === '7') && (stateAfterMove[key(rowBefore, colBefore)][1] === '1')))) {
                    return true;
                }
            }
        }
        return false;
    }
    function getStateScoreForIndex0(move, playerIndex) {
        if (move[0].endMatch) {
            var endMatchScores = move[0].endMatch.endMatchScores;
            return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
                : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
                    : 0;
        }
        return 0;
    }
})(aiService || (aiService = {}));
angular.module('myApp').factory('aiService', function () {
    return { createComputerMove: aiService.createComputerMove };
});
