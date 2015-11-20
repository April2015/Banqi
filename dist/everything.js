var gameLogic;
(function (gameLogic) {
    /**
     * initial the Game
     *
     * setTurn:
     * {setTurn: {turnIndex: 0}}
     *
     * setDelta -1,-1,-1,-1 for initial:
     * {set: {key: 'delta', value: {rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1}}},
     *
     * set keys (pieces) with position as the key;
     *
     * {set: {key: '0x0', value: 'R1'}}
     * ...{{key: '3x7', value: 'B7'}}
     *
     * shuffle:
     * {shuffle: ["0x0", ..., "3x7"]}
     *
     * hide:
     * {setVisibility: {key: 'b0x0', visibleToPlayerIndexes: []}}
     * ...{setVisibility: {key: 'b3x7', visibleToPlayerIndexes: []}}
     *
     * @returns {*[]}
     */
    function initialGame() {
        return [
            //set turn
            { setTurn: { turnIndex: 0 } },
            //set delta, (-1, -1) (-1, -1) means initial game
            { set: { key: 'delta', value: { rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1 } } },
            //set keys
            { set: { key: 'b0x0', value: 'R1' } },
            { set: { key: 'b0x1', value: 'R1' } },
            { set: { key: 'b0x2', value: 'R1' } },
            { set: { key: 'b0x3', value: 'R1' } },
            { set: { key: 'b0x4', value: 'R1' } },
            { set: { key: 'b0x5', value: 'R2' } },
            { set: { key: 'b0x6', value: 'R2' } },
            { set: { key: 'b0x7', value: 'R3' } },
            { set: { key: 'b1x0', value: 'R3' } },
            { set: { key: 'b1x1', value: 'R4' } },
            { set: { key: 'b1x2', value: 'R4' } },
            { set: { key: 'b1x3', value: 'R5' } },
            { set: { key: 'b1x4', value: 'R5' } },
            { set: { key: 'b1x5', value: 'R6' } },
            { set: { key: 'b1x6', value: 'R6' } },
            { set: { key: 'b1x7', value: 'R7' } },
            { set: { key: 'b2x0', value: 'B1' } },
            { set: { key: 'b2x1', value: 'B1' } },
            { set: { key: 'b2x2', value: 'B1' } },
            { set: { key: 'b2x3', value: 'B1' } },
            { set: { key: 'b2x4', value: 'B1' } },
            { set: { key: 'b2x5', value: 'B2' } },
            { set: { key: 'b2x6', value: 'B2' } },
            { set: { key: 'b2x7', value: 'B3' } },
            { set: { key: 'b3x0', value: 'B3' } },
            { set: { key: 'b3x1', value: 'B4' } },
            { set: { key: 'b3x2', value: 'B4' } },
            { set: { key: 'b3x3', value: 'B5' } },
            { set: { key: 'b3x4', value: 'B5' } },
            { set: { key: 'b3x5', value: 'B6' } },
            { set: { key: 'b3x6', value: 'B6' } },
            { set: { key: 'b3x7', value: 'B7' } },
            { set: { key: 'stage', value: 0 } },
            //shuffle
            {
                shuffle: {
                    keys: ['b0x0', 'b0x1', 'b0x2', 'b0x3', 'b0x4', 'b0x5', 'b0x6', 'b0x7',
                        'b1x0', 'b1x1', 'b1x2', 'b1x3', 'b1x4', 'b1x5', 'b1x6', 'b1x7',
                        'b2x0', 'b2x1', 'b2x2', 'b2x3', 'b2x4', 'b2x5', 'b2x6', 'b2x7',
                        'b3x0', 'b3x1', 'b3x2', 'b3x3', 'b3x4', 'b3x5', 'b3x6', 'b3x7']
                }
            },
            //hide
            { setVisibility: { key: 'b0x0', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x1', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x2', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x3', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x4', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x5', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x6', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b0x7', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x0', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x1', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x2', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x3', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x4', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x5', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x6', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b1x7', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x0', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x1', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x2', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x3', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x4', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x5', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x6', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b2x7', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x0', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x1', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x2', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x3', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x4', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x5', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x6', visibleToPlayerIndexes: [] } },
            { setVisibility: { key: 'b3x7', visibleToPlayerIndexes: [] } }
        ];
    }
    gameLogic.initialGame = initialGame;
    /**
     * Turn a position (a,b) to 'axb' key version
     * ep. key(0,1) returns '0x1'
     *
     * @param x
     * @param y
     * @returns {string}
     */
    function key(x, y) {
        return 'b' + x.toString() + 'x' + y.toString();
    }
    /**
     * * Return a winner (either 'R' or 'B') or '' if there is no winner.
     *
     * A game is ended with a winner as the following rule:
     * If the board only has Red pieces left, Red win
     * If the board only has Black pieces left, Black win
     *
     * @param stateBeforeMove
     * @param turnIndexAfterMove
     * @returns {string}
     */
    function getWinner(stateBeforeMove, turnIndexAfterMove) {
        var numR = 0;
        var numB = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                //if there is a hide piece, the game won't end
                if (stateBeforeMove[key(i, j)] === null)
                    return '';
                if (stateBeforeMove[key(i, j)][0] === 'R') {
                    numR++;
                }
                if (stateBeforeMove[key(i, j)][0] === 'B') {
                    numB++;
                }
            }
        }
        if (numR === 0)
            return 'B';
        if (numB === 0)
            return 'R';
        if (angular.equals(getPossibleMoves(stateBeforeMove, turnIndexAfterMove), [])) {
            if (turnIndexAfterMove === 0)
                return 'B';
            if (turnIndexAfterMove === 1)
                return 'R';
        }
        return '';
    }
    /**
     * Check if the game is tie
     *
     * A game is tie as the following rule:
     * If Red and Black has both one piece and they are not next to each other, it's a Tie
     * If Red only has one piece left and the piece rank higher than all piece in Black, it's a Tie
     * If Black only has one piece left and the piece rank higher than all piece in Red, it's a Tie
     *
     * @param stateBeforeMove
     * @returns {boolean}
     */
    function isTie(stateBeforeMove) {
        var numR = 0;
        var numB = 0;
        var Rx = 0;
        var Ry = 0;
        var Bx = 0;
        var By = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                //if there is a hide piece, the game won't end
                if (stateBeforeMove[key(i, j)] === null)
                    return false;
                if (stateBeforeMove[key(i, j)][0] === 'R') {
                    numR++;
                    Rx = i;
                    Ry = j;
                }
                if (stateBeforeMove[key(i, j)][0] === 'B') {
                    numB++;
                    Bx = i;
                    By = j;
                }
            }
        }
        // If Red and Black has both one piece and they are not next to each other, it's a tie
        if (numR === 1 && numB === 1 && !isNext(Rx, Ry, Bx, By))
            return true;
        //Red tie situate
        if (numR === 1 && numB > 1) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    //Red only has one piece left and the piece rank higher than all piece in Black, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(Rx, Ry)][1] < stateBeforeMove[key(i, j)][1])) {
                        return false;
                    }
                    //Red only has one piece left and it's a General, if Black has no Soldier, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(Rx, Ry)][1] === '7' && stateBeforeMove[key(i, j)][1] === '1')) {
                        return false;
                    }
                    //Red only has one piece left, but Black has a Cannon, it's not tie yet
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(i, j)][1] === '2')) {
                        return false;
                    }
                }
            }
            return true;
        }
        //Black tie situate
        if (numB === 1 && numR > 1) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(Bx, By)][1] < stateBeforeMove[key(i, j)][1])) {
                        return false;
                    }
                    //Black only has one piece left and it's a General, if Red has no Soldier, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(Rx, Ry)][1] === '7' && stateBeforeMove[key(i, j)][1] === '1')) {
                        return false;
                    }
                    //Black only has one piece left, but Red has a Cannon, it's not tie yet
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(i, j)][1] === '2')) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Check if two spot (x1,y1) and (x2, y2) is next to each other
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {boolean}
     */
    function isNext(x1, y1, x2, y2) {
        if (x1 === x2 && (y1 - y2 === 1 || y1 - y2 === -1)) {
            return true;
        }
        if (y1 === y2 && (x1 - x2 === 1 || x1 - x2 === -1)) {
            return true;
        }
        return false;
    }
    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     *
     * @param stateBeforeMove
     * @param turnIndexBeforeMove
     * @returns {Array}
     */
    function getPossibleMoves(stateBeforeMove, turnIndexBeforeMove) {
        var possibleMoves = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                for (var k = -1; k < 4; k++) {
                    for (var l = -1; l < 8; l++) {
                        try {
                            possibleMoves.push(createMove(stateBeforeMove, i, j, k, l, turnIndexBeforeMove));
                        }
                        catch (e) {
                        }
                    }
                }
            }
        }
        return possibleMoves;
    }
    gameLogic.getPossibleMoves = getPossibleMoves;
    /**
     * CreateMove function
     * Move a piece from (rowBeforeMove, colBeforeMove) to (rowAfterMove, colAfterMove)
     * if the piece is hided, simply gave (-1, -1) to (rowAfterMove, colAfterMove), this would turn it over
     * a spot is free if stateBeforeMove[key(row, col)] === ''
     *
     * stage 0, createMove
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @param turnIndexBeforeMove
     * @returns {*}
     */
    function createMove(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove, turnIndexBeforeMove) {
        //When the space has nothing, cant choose it
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === '') {
            throw new Error("There is nothing at that position!");
        }
        //can't move a unturned piece
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === null) && !(rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("Can not move a unturned piece!");
        }
        ////can't turn a turned piece
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] !== null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("This piece is already turned!");
        }
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)] !== null) {
            //You can't kill yourself
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === stateBeforeMove[key(rowAfterMove, colAfterMove)][0]) {
                throw new Error("You can't kill yourself!");
            }
            //when it's not Red's turn, cant choose red showed piece
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === 'R' && turnIndexBeforeMove !== 0) {
                throw new Error("Please wait for your turn!");
            }
            //when it's not Black's turn, cant choose Black showed piece
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === 'B' && turnIndexBeforeMove !== 1) {
                throw new Error("Please wait for your turn!");
            }
        }
        if (rowBeforeMove === rowAfterMove && colBeforeMove === colAfterMove) {
            throw new Error("Same piece, move canceled!");
        }
        //if state 0, move or kill
        var needToSet = [];
        //turn a piece over
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            needToSet = [{ setVisibility: { key: key(rowBeforeMove, colBeforeMove), visibleToPlayerIndexes: null } }];
        }
        else {
            //move piece
            if (stateBeforeMove[key(rowAfterMove, colAfterMove)] === '') {
                needToSet = movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
            else {
                needToSet = killPiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
        }
        var moves = [{ setTurn: { turnIndex: turnIndexBeforeMove } },
            {
                set: {
                    key: 'delta', value: {
                        rowBeforeMove: rowBeforeMove, colBeforeMove: colBeforeMove,
                        rowAfterMove: rowAfterMove, colAfterMove: colAfterMove
                    }
                }
            },
            { set: { key: 'stage', value: 1 } }];
        moves = moves.concat(needToSet);
        return moves;
        // [{setTurn: {turnIndex: turnIndexBeforeMove}},
        //     {
        //         set: {
        //             key: 'delta', value: {
        //                 rowBeforeMove: rowBeforeMove, colBeforeMove: colBeforeMove,
        //                 rowAfterMove: rowAfterMove, colAfterMove: colAfterMove
        //             }
        //         }
        //     },
        //     {set: {key: 'stage', value: 1}}].concat(needToSet);
    }
    gameLogic.createMove = createMove;
    /**
     * checkGameEnd
     * if state 1, check if game end
     *
     * @param stateBeforeMove
     * @param turnIndexBeforeMove
     * @returns {{set: {key: string, value: number}}[]}
     */
    function checkGameEnd(stateBeforeMove, turnIndexBeforeMove) {
        var firstOperation;
        var winner = getWinner(stateBeforeMove, 1 - turnIndexBeforeMove);
        if (winner !== '' || isTie(stateBeforeMove)) {
            // Game over.
            firstOperation = {
                endMatch: {
                    endMatchScores: (winner === 'R' ? [1, 0] : (winner === 'B' ? [0, 1] : [0, 0]))
                }
            };
        }
        else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = { setTurn: { turnIndex: 1 - turnIndexBeforeMove } };
        }
        return [firstOperation,
            { set: { key: 'stage', value: 0 } }];
    }
    gameLogic.checkGameEnd = checkGameEnd;
    /**
     * Move a piece from (rowBeforeMove, colBeforeMove) to a next free spot (rowAfterMove, colAfterMove)
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*[]}
     */
    function movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove) {
        if (!isNext(rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)) {
            throw new Error("You can not move the piece to that position!");
        }
        else {
            return [{
                    set: {
                        key: key(rowAfterMove, colAfterMove),
                        value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                    }
                },
                { set: { key: key(rowBeforeMove, colBeforeMove), value: '' } }];
        }
    }
    /**
     * Kill a piece, place the killer piece from (rowBeforeMove, colBeforeMove) on killed piece (rowAfterMove, colAfterMove)
     * Return the the sets
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*[]}
     */
    function killPiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove) {
        //can not kill a unturned piece
        if (stateBeforeMove[key(rowAfterMove, colAfterMove)] === null) {
            throw new Error("You can not kill a unturned piece!");
        }
        //For special Cannon
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '2') {
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
                    return [{
                            set: {
                                key: key(rowAfterMove, colAfterMove),
                                value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                            }
                        },
                        { set: { key: key(rowBeforeMove, colBeforeMove), value: '' } }];
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
                    return [{
                            set: {
                                key: key(rowAfterMove, colAfterMove),
                                value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                            }
                        },
                        { set: { key: key(rowBeforeMove, colBeforeMove), value: '' } }];
                }
            }
            throw new Error("You can not kill the piece at that position!");
        }
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '7'
            && stateBeforeMove[key(rowAfterMove, colAfterMove)][1] === '1') {
            throw new Error("General can not kills soldier, soldier kills General!");
        }
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '1'
            && stateBeforeMove[key(rowAfterMove, colAfterMove)][1] === '7') {
            return movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
        }
        else {
            //rank compare
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] >= stateBeforeMove[key(rowAfterMove, colAfterMove)][1]) {
                return movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
            throw new Error("You can not kill the piece at that position!");
        }
    }
    /**
     * isMoveOk function
     *
     * @param params
     * @returns {boolean}
     */
    function isMoveOk(params) {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        // The state and turn after move are not needed in any game where all state is public.
        //var turnIndexAfterMove = params.turnIndexAfterMove;
        //var stateAfterMove = params.stateAfterMove;
        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {
            var stage;
            if (stateBeforeMove !== (undefined || null)) {
                stage = stateBeforeMove.stage;
            }
            console.log('stage', stage);
            if (stage === 0) {
                var deltaValue = move[1].set.value;
                var rowBeforeMove = deltaValue.rowBeforeMove;
                var colBeforeMove = deltaValue.colBeforeMove;
                var rowAfterMove = deltaValue.rowAfterMove;
                var colAfterMove = deltaValue.colAfterMove;
                var expectedMove = createMove(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove, turnIndexBeforeMove);
                if (!angular.equals(move, expectedMove)) {
                    console.log('move, expectedMove are not equal');
                    return false;
                }
            }
            else if (stage === 1) {
                var expectedMove = checkGameEnd(stateBeforeMove, turnIndexBeforeMove);
                if (!angular.equals(move, expectedMove)) {
                    console.log('move, expectedMove are not equal');
                    return false;
                }
            }
            else {
                console.log('should initialGame');
                var expectedMove = initialGame();
                //the move and expected move won't equal because move would set hide pieces to null
                if (!angular.equals(move, expectedMove)) {
                    console.log('move: ', move);
                    console.log('expectedMove: ', expectedMove);
                    console.log('move, expectedMove are not equal');
                    return false;
                }
            }
        }
        catch (e) {
            // if there are any exceptions then the move is illegal
            console.log('got exceptions in isMoveOk: ', e);
            return false;
        }
        console.log('isMoveOk is True!');
        return true;
    }
    gameLogic.isMoveOk = isMoveOk;
})(gameLogic || (gameLogic = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .factory('gameLogic', function () {
    return {
        initialGame: gameLogic.initialGame,
        getPossibleMoves: gameLogic.getPossibleMoves,
        createMove: gameLogic.createMove,
        checkGameEnd: gameLogic.checkGameEnd,
        isMoveOk: gameLogic.isMoveOk
    };
});
;var game;
(function (game) {
    var animationEnded = false;
    var canMakeMove = false;
    var isComputerTurn = false;
    game.isHelpModalShown = false;
    var state = null;
    var delta;
    var turnIndex = null;
    var gameArea;
    var rowsNum = 4;
    var colsNum = 8;
    var draggingStartedRowCol = null;
    var draggingPiece = null;
    function init() {
        console.log("Translation of 'RULES_OF_BANQI' is " + translate('RULES_OF_BANQI'));
        resizeGameAreaService.setWidthToHeight(2);
        gameService.setGame({
            // gameDeveloperEmail: "xiaodongbo627@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            isMoveOk: gameLogic.isMoveOk,
            updateUI: updateUI
        });
        // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
        document.addEventListener("animationend", animationEndedCallback, false); // standard
        document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
        document.addEventListener("oanimationend", animationEndedCallback, false); // Opera
        dragAndDropService.addDragListener("gameArea", handleDragEvent);
    }
    game.init = init;
    function animationEndedCallback() {
        $rootScope.$apply(function () {
            log.info("Animation ended");
            animationEnded = true;
            sendComputerMove();
        });
    }
    function sendComputerMove() {
        if (!isComputerTurn) {
            return;
        }
        isComputerTurn = false; // to make sure the computer can only move once.
        var move = aiService.createComputerMove(state, turnIndex, { millisecondsLimit: 1000 });
        log.info("computer move: ", move);
        gameService.makeMove(move);
    }
    function updateUI(params) {
        log.info("Game got updateUI:", params);
        animationEnded = false;
        state = params.stateAfterMove;
        delta = state.delta;
        canMakeMove = params.turnIndexAfterMove >= 0 &&
            params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
        var turnChanged;
        if (turnIndex !== params.turnIndexAfterMove) {
            turnChanged = true;
        }
        else
            turnChanged = false;
        turnIndex = params.turnIndexAfterMove;
        if (!delta && canMakeMove) {
            try {
                var move = gameLogic.initialGame();
                gameService.makeMove(move);
            }
            catch (e) {
                log.info(e);
                log.info("initialGame() failed");
            }
            return;
        }
        // Is it the computer's turn?
        isComputerTurn = canMakeMove &&
            params.playersInfo[params.yourPlayerIndex].playerId === '';
        if (isComputerTurn) {
            // To make sure the player won't click something and send a move instead of the computer sending a move.
            canMakeMove = false;
            // We calculate the AI move only after the animation finishes,
            // because if we call aiService now
            // then the animation will be paused until the javascript finishes.
            if (!state.delta) {
                // This is the first move in the match, so
                // there is not going to be an animation, so
                // call sendComputerMove() now (can happen in ?onlyAIs mode)
                sendComputerMove();
            }
        }
        //check if the game is end
        //
        if ((!turnChanged) && (delta !== undefined)
            && ((delta.rowBeforeMove !== -1) || (delta.colBeforeMove !== -1))
            && state.stage === 1) {
            log.info('delta: ', delta);
            try {
                canMakeMove = false; // to prevent making another move
                gameService.makeMove(gameLogic.checkGameEnd(state, turnIndex));
            }
            catch (e) {
                log.info(e);
                log.info("checkGameEnd failed!");
                return;
            }
        }
        //animation
        //
        if ((turnChanged) && (delta !== undefined)) {
            //if it's tuning a piece
            if (((delta.rowAfterMove === -1) || (delta.colAfterMove === -1))
                && ((delta.rowBeforeMove !== -1) || (delta.colBeforeMove !== -1))) {
                var row = delta.rowBeforeMove;
                var col = delta.colBeforeMove;
                var img = document.getElementById('img_' + row + 'x' + col);
                if (img.className === 'slowlyAppear1') {
                    img.className = "slowlyAppear2";
                }
                else {
                    img.className = "slowlyAppear1";
                }
            }
            else if ((delta.rowBeforeMove !== -1) || (delta.colBeforeMove !== -1)) {
                var row = delta.rowAfterMove;
                var col = delta.colAfterMove;
                var img = document.getElementById('img_' + row + 'x' + col);
                if (img.className === 'scale1') {
                    img.className = "scale2";
                }
                else {
                    img.className = "scale1";
                }
            }
        }
    }
    /**
     * handle the Drag Event using DragAndDropListener
     *
     * @param type
     * @param clientX
     * @param clientY
     */
    function handleDragEvent(type, clientX, clientY) {
        gameArea = document.getElementById("gameArea");
        // Center point in gameArea
        var x = clientX - gameArea.offsetLeft;
        var y = clientY - gameArea.offsetTop;
        var row, col;
        // Is outside gameArea?
        if (x < 0 || y < 0 || x >= gameArea.clientWidth || y >= gameArea.clientHeight) {
            log.info("outside gameArea");
            if (draggingPiece) {
                // Drag the piece where the touch is (without snapping to a square).
                var size = getSquareWidthHeight();
                setDraggingPieceTopLeft({ top: y - size.height / 2, left: x - size.width / 2 });
            }
            else {
                return;
            }
        }
        else {
            // Inside gameArea. Let's find the containing square's row and col
            var col = Math.floor(colsNum * x / gameArea.clientWidth);
            var row = Math.floor(rowsNum * y / gameArea.clientHeight);
            log.info("now at: ", row, col);
            if (type === "touchstart" && !draggingStartedRowCol) {
                // drag started
                draggingStartedRowCol = { row: row, col: col };
                if ((state[aiService.key(row, col)] !== null) //not hide
                    && (state[aiService.key(row, col)] !== '') //has piece
                    && (((turnIndex === 0) && (state[aiService.key(row, col)][0] === 'R')) //red piece can move
                        || ((turnIndex === 1) && (state[aiService.key(row, col)][0] === 'B')) //blue piece can move
                    )) {
                    draggingPiece = document.getElementById("img_" + draggingStartedRowCol.row + "x" + draggingStartedRowCol.col);
                }
            }
            if (type === "touchend") {
                var from = draggingStartedRowCol;
                var to = { row: row, col: col };
                dragDone(from, to);
            }
            else {
                // Drag continue
                var size = getSquareWidthHeight();
                setDraggingPieceTopLeft({ top: y - size.height / 2, left: x - size.width / 2 });
            }
        }
        if (type === "touchend" || type === "touchcancel" || type === "touchleave") {
            // drag ended
            // return the piece to it's original style (then angular will take care to hide it).
            setDraggingPieceTopLeft(getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col));
            draggingStartedRowCol = null;
            if (draggingPiece !== null) {
                draggingPiece.removeAttribute("style"); //fix broken UI
                draggingPiece = null;
            }
        }
    }
    /**
     * set Dragging Piece Top Left
     *
     * @param topLeft
     */
    function setDraggingPieceTopLeft(topLeft) {
        var size = getSquareWidthHeight();
        var top = size.height / 10;
        var left = size.width / 10;
        var originalSize = getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col);
        if (draggingPiece !== null) {
            draggingPiece.style.left = (topLeft.left - originalSize.left + left) + "px";
            draggingPiece.style.top = (topLeft.top - originalSize.top + top) + "px";
        }
    }
    /**
     * get Square Width Height of board (square position)
     * @returns {{width: number, height: number}}
     */
    function getSquareWidthHeight() {
        return {
            width: gameArea.clientWidth * .96 / colsNum,
            height: gameArea.clientHeight * .98 / rowsNum
        };
    }
    /**
     * get Square Top Left position
     * @param row
     * @param col
     * @returns {{top: number, left: number}}
     */
    function getSquareTopLeft(row, col) {
        var size = getSquareWidthHeight();
        return { top: row * size.height, left: col * size.width };
    }
    /**
     * drag Done listener
     * @param from
     * @param to
     */
    function dragDone(from, to) {
        log.info("DragDone");
        var msg = "Dragged piece " + from.row + "x" + from.col + " to square " + to.row + "x" + to.col;
        log.info(msg);
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!canMakeMove) {
            return;
        }
        //turn a piece
        if ((from.row === to.row) && (from.col === to.col)
            && state[aiService.key(from.row, from.col)] === null) {
            //turn the piece
            try {
                var move = gameLogic.createMove(state, from.row, from.col, -1, -1, turnIndex);
                canMakeMove = false; // to prevent making another move
                gameService.makeMove(move);
            }
            catch (e) {
                log.info(["Can't turn piece:", from.row, from.col, -1, -1]);
                return;
            }
        }
        else {
            try {
                var move = gameLogic.createMove(state, from.row, from.col, to.row, to.col, turnIndex);
                canMakeMove = false; // to prevent making another move
                gameService.makeMove(move);
            }
            catch (e) {
                log.info(["Can not move the piece:", from.row, from.col, to.row, to.col]);
                return;
            }
        }
    }
    function shouldShowImage(row, col) {
        var cell = state[aiService.key(row, col)];
        return cell !== "";
        //return true;
    }
    game.shouldShowImage = shouldShowImage;
    ;
    function getImageSrc(row, col) {
        var cell = state[aiService.key(row, col)];
        return cell === "R1" ? "res/R1.png"
            : cell === "R2" ? "res/R2.png"
                : cell === "R3" ? "res/R3.png"
                    : cell === "R4" ? "res/R4.png"
                        : cell === "R5" ? "res/R5.png"
                            : cell === "R6" ? "res/R6.png"
                                : cell === "R7" ? "res/R7.png"
                                    : cell === "B1" ? "res/B1.png"
                                        : cell === "B2" ? "res/B2.png"
                                            : cell === "B3" ? "res/B3.png"
                                                : cell === "B4" ? "res/B4.png"
                                                    : cell === "B5" ? "res/B5.png"
                                                        : cell === "B6" ? "res/B6.png"
                                                            : cell === "B7" ? "res/B7.png"
                                                                : cell === null ? "res/Hide.png"
                                                                    : "";
    }
    game.getImageSrc = getImageSrc;
    ;
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en', {
        "RULES_OF_BANQI": "Rules of Banqi",
        "RULES_SLIDE1": "The ranking goes as follows: general, advisor, elephant, chariot, horse, soldier. Only pieces of equal or lower rank may be captured, with one exception. The one exception concerns generals and soldiers: the general cannot capture soldiers, and soldiers can capture the general.",
        "RULES_SLIDE2": "Except for the cannon, pieces capture with the same motion as for movement: one square up, down, left, or right.",
        "RULES_SLIDE3": "The cannon is not included in the ranking because it is exceptional: it captures in an unusual way, it can capture a piece of any rank, and yet is vulnerable to capture by any piece except the soldier.",
        "RULES_SLIDE4": "A cannon captures is: moves any distance along a single row or column of the board, jumping over exactly one intermediate piece. Any other squares between the cannon and its target must be empty. Since a cannon must jump to capture, it cannot capture a piece in an adjacent square.",
        "RULES_SLIDE5": "Red has the 1st move. The player killed all pieces in other side win the game.",
        "CLOSE": "Close"
    });
    game.init();
});
;var aiService;
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
