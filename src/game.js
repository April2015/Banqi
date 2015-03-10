angular.module('myApp').controller('Ctrl',
    ['$scope', '$log', '$timeout',
        'gameService', 'stateService', 'gameLogic',
        //'aiService',
        'resizeGameAreaService',
        function ($scope, $log, $timeout,
                  gameService, stateService, gameLogic,
                  //aiService,
                  resizeGameAreaService) {

            'use strict';

            resizeGameAreaService.setWidthToHeight(2);

            var computerMoved = 0;// check if AI already made a move

            function sendComputerMove() {
                var possibleMoves = gameLogic.getPossibleMoves($scope.stateAfterMove, $scope.turnIndex);
                console.log('possibleMoves: ', possibleMoves);
                gameService.makeMove(possibleMoves[Math.floor(Math.random()*possibleMoves.length)]);

                //gameService.makeMove(aiService.createComputerMove($scope.stateAfterMove, $scope.turnIndex,
                //  // at most 1 second for the AI to choose a move (but might be much quicker)
                //  {millisecondsLimit: 1000}));

                //check if the game ends
                gameService.makeMove(gameLogic.checkGameEnd($scope.stateAfterMove, $scope.turnIndex));
            }

            function updateUI(params) {
                $scope.stateAfterMove = params.stateAfterMove;
                //if ($scope.stateAfterMove === null) {
                //    $scope.stateAfterMove = gameLogic.initialGame();
                //    return;
                //}
                $scope.delta = params.stateAfterMove.delta;
                $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
                params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
                $scope.turnIndex = params.turnIndexAfterMove;

                // Is it the computer's turn?
                  if (computerMoved !== 1 &&
                      params.playersInfo[params.yourPlayerIndex].playerId === '') {
                      computerMoved = 1;// to make sure the UI won't send another move.
                    // Waiting 0.5 seconds to let the move animation finish; if we call aiService
                    // then the animation is paused until the javascript finishes.
                    $timeout(sendComputerMove, 500);
                  }
                else
                  {
                      computerMoved = 0;
                  }
            }

            /**
             * Turn a position (a,b) to 'axb' key version
             * * ep. key(0,1) returns '0x1'
             *
             * @param x
             * @param y
             * @returns {string}
             */
            function key(x, y) {
                return 'b' + x.toString() + 'x' + y.toString();
            }

            //window.e2e_test_stateService = stateService; // to allow us to load any state in our e2e tests.


            //try to initial game 1st
            function initial() {
                try {
                    var move = gameLogic.initialGame();
                    //$scope.isYourTurn = false; // to prevent making another move
                    gameService.makeMove(move);
                } catch (e) {
                    $log.info(e);
                    $log.info("initialGame() failed");
                    return;
                }
            }


            gameService.setGame({
                gameDeveloperEmail: "xiaodongbo627@gmail.com",
                minNumberOfPlayers: 2,
                maxNumberOfPlayers: 2,
                isMoveOk: gameLogic.isMoveOk,
                updateUI: updateUI
            });

            // Before getting any updateUI, we initialize $scope variables (such as board)
            // and show an empty board to a viewer (so you can't perform moves).
            //updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});

            initial();

            var firstClickRow = null;
            var firstClickCol = null;
            $scope.cellClicked = function (row, col) {
                $log.info(["Clicked on cell:", row, col]);
                if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
                    throw new Error("Throwing the error because URL has '?throwException'");
                }
                if (!$scope.isYourTurn) {
                    return;
                }
                //turn the piece
                if ($scope.stateAfterMove[key(row, col)] === null) {
                    try {
                        var move = gameLogic.createMove($scope.stateAfterMove,
                            row, col, -1, -1, $scope.turnIndex);
                        $scope.isYourTurn = false; // to prevent making another move
                        gameService.makeMove(move);
                    } catch (e) {
                        $log.info(["Cell is already full in position:", row, col, -1, -1]);
                        return;
                    }
                }
                else{
                    if (firstClickRow === null || firstClickCol === null) {
                        firstClickRow = row, firstClickCol = col;
                        return;
                    }
                    else{
                        try {
                            var move = gameLogic.createMove($scope.stateAfterMove,
                                firstClickRow, firstClickCol, row, col, $scope.turnIndex);
                            $scope.isYourTurn = false; // to prevent making another move
                            gameService.makeMove(move);
                        } catch (e) {
                            $log.info(["Can not move the piece:", firstClickRow, firstClickCol, row, col]);
                            firstClickRow = null;
                            firstClickCol = null;
                            return;
                        }
                    }
                }
                //check if game end
                try {
                    var move = gameLogic.checkGameEnd($scope.stateAfterMove, $scope.turnIndex);
                    $scope.isYourTurn = false; // to prevent making another move
                    gameService.makeMove(move);
                    firstClickRow = null;
                    firstClickCol = null;
                } catch (e) {
                    $log.info(e);
                    $log.info("checkGameEnd failed!");
                    firstClickRow = null;
                    firstClickCol = null;
                    return;
                }
            };
            $scope.shouldShowImage = function (row, col) {
                var cell = $scope.stateAfterMove[key(row, col)];
                return cell !== "";
            };
            $scope.getImageSrc = function (row, col) {
                var cell = $scope.stateAfterMove[key(row, col)];
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
            };

        }]);
