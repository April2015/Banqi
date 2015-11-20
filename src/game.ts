interface BoardDelta {
  row: number;
  col: number;
}

interface WidthHeight {
    width: number;
    height: number;
}
interface TopLeft {
    top: number;
    left: number;
}


module game {
  let animationEnded = false;
  let canMakeMove = false;
  let isComputerTurn = false;
  export let isHelpModalShown: boolean = false;


  let state: IState = null;
  let delta: {rowBeforeMove: number, colBeforeMove: number, rowAfterMove: number, colAfterMove: number};
  let turnIndex: number = null;
  let gameArea: HTMLElement;
  let rowsNum: number = 4;
  let colsNum: number = 8;
  let draggingStartedRowCol: BoardDelta = null;
  let draggingPiece: HTMLElement = null;

  export function init() {
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
    let move = aiService.createComputerMove(state, turnIndex, {millisecondsLimit: 1000});
    log.info("computer move: ", move);
    gameService.makeMove(move);
  }

  function updateUI(params: IUpdateUI): void {
    log.info("Game got updateUI:", params);
    animationEnded = false;
    state = params.stateAfterMove;
    delta = state.delta;
    canMakeMove = params.turnIndexAfterMove >= 0 && // game is ongoing
      params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
    let turnChanged: boolean;

    if (turnIndex !== params.turnIndexAfterMove) {
      turnChanged = true;
    } else turnChanged = false;
    turnIndex = params.turnIndexAfterMove;

    if (!delta && canMakeMove) {
      try {
        let move = gameLogic.initialGame();
        gameService.makeMove(move);
      } catch (e) {
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
        && state.stage === 1){

        log.info('delta: ', delta);
        try {
            canMakeMove = false; // to prevent making another move
            gameService.makeMove(gameLogic.checkGameEnd(state, turnIndex));

        } catch (e) {
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
        //if it's moving piece
        else if ((delta.rowBeforeMove !== -1) || (delta.colBeforeMove !== -1)){
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
  function handleDragEvent(type: string, clientX: number, clientY: number) {
      gameArea = document.getElementById("gameArea");
      // Center point in gameArea
      var x = clientX - gameArea.offsetLeft;
      var y = clientY - gameArea.offsetTop;
      var row: number, col: number;
      // Is outside gameArea?
      if (x < 0 || y < 0 || x >= gameArea.clientWidth || y >= gameArea.clientHeight) {
          log.info("outside gameArea");
          if (draggingPiece) {
              // Drag the piece where the touch is (without snapping to a square).
              var size = getSquareWidthHeight();
              setDraggingPieceTopLeft({top: y - size.height / 2, left: x - size.width / 2});
          } else {
              return;
          }
      } else {
          // Inside gameArea. Let's find the containing square's row and col
          var col = Math.floor(colsNum * x / gameArea.clientWidth);
          var row = Math.floor(rowsNum * y / gameArea.clientHeight);
          log.info("now at: ", row, col);

          if (type === "touchstart" && !draggingStartedRowCol) {
              // drag started
              draggingStartedRowCol = {row: row, col: col};

              if ((state[aiService.key(row, col)] !== null)//not hide
                  && (state[aiService.key(row, col)] !== '')//has piece
                  && (((turnIndex === 0) && (state[aiService.key(row, col)][0] ==='R'))//red piece can move
                      || ((turnIndex === 1) && (state[aiService.key(row, col)][0] ==='B'))//blue piece can move
                      )
                  ){
                  draggingPiece = document.getElementById("img_" + draggingStartedRowCol.row + "x" + draggingStartedRowCol.col);
              }
          }
          if (type === "touchend") {
              var from: BoardDelta = draggingStartedRowCol;
              var to: BoardDelta = {row: row, col: col};
              dragDone(from, to);
          } else {
              // Drag continue
              var size = getSquareWidthHeight();
              setDraggingPieceTopLeft({top: y - size.height / 2, left: x - size.width / 2});
          }
      }
      if (type === "touchend" || type === "touchcancel" || type === "touchleave") {
          // drag ended
          // return the piece to it's original style (then angular will take care to hide it).
          setDraggingPieceTopLeft(getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col));
          draggingStartedRowCol = null;
          if (draggingPiece !== null) {
              draggingPiece.removeAttribute("style");//fix broken UI
              draggingPiece = null;
          }
      }
  }

  /**
   * set Dragging Piece Top Left
   *
   * @param topLeft
   */
  function setDraggingPieceTopLeft(topLeft: TopLeft): void {
      var size: WidthHeight = getSquareWidthHeight();
      var top: number = size.height / 10;
      var left: number = size.width / 10;

      var originalSize: TopLeft = getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col);
      if (draggingPiece !== null) {
          draggingPiece.style.left = (topLeft.left - originalSize.left + left) + "px";
          draggingPiece.style.top = (topLeft.top - originalSize.top + top) + "px";
      }
  }


  /**
   * get Square Width Height of board (square position)
   * @returns {{width: number, height: number}}
   */
  function getSquareWidthHeight(): WidthHeight {
      return {
          width: gameArea.clientWidth *.96 / colsNum,
          height: gameArea.clientHeight *.98 / rowsNum
      };
  }

  /**
   * get Square Top Left position
   * @param row
   * @param col
   * @returns {{top: number, left: number}}
   */
  function getSquareTopLeft(row: number, col: number): TopLeft {
      var size = getSquareWidthHeight();
      return {top: row * size.height, left: col * size.width}
  }

  /**
   * drag Done listener
   * @param from
   * @param to
   */
  function dragDone(from: BoardDelta, to: BoardDelta) {
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
              let move = gameLogic.createMove(state,
                  from.row, from.col, -1, -1, turnIndex);
              canMakeMove = false; // to prevent making another move
              gameService.makeMove(move);
          } catch (e) {
              log.info(["Can't turn piece:", from.row, from.col, -1, -1]);
              return;
          }
      }
      //move piece
      else {
          try {
              let move = gameLogic.createMove(state,
                  from.row, from.col, to.row, to.col, turnIndex);
              canMakeMove = false; // to prevent making another move
              gameService.makeMove(move);


          } catch (e) {
              log.info(["Can not move the piece:", from.row, from.col, to.row, to.col]);
              return;
          }
      }
  }


  export function shouldShowImage(row: number, col: number): boolean {
      var cell = state[aiService.key(row, col)];
      return cell !== "";
      //return true;
  };

  export function getImageSrc(row: number, col: number) {
      let cell: string = state[aiService.key(row, col)];
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

}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en',  {
    "RULES_OF_BANQI":"Rules of Banqi",
    "RULES_SLIDE1":"The ranking goes as follows: general, advisor, elephant, chariot, horse, soldier. Only pieces of equal or lower rank may be captured, with one exception. The one exception concerns generals and soldiers: the general cannot capture soldiers, and soldiers can capture the general.",
    "RULES_SLIDE2":"Except for the cannon, pieces capture with the same motion as for movement: one square up, down, left, or right.",
    "RULES_SLIDE3":"The cannon is not included in the ranking because it is exceptional: it captures in an unusual way, it can capture a piece of any rank, and yet is vulnerable to capture by any piece except the soldier.",
    "RULES_SLIDE4":"A cannon captures is: moves any distance along a single row or column of the board, jumping over exactly one intermediate piece. Any other squares between the cannon and its target must be empty. Since a cannon must jump to capture, it cannot capture a piece in an adjacent square.",
    "RULES_SLIDE5":"Red has the 1st move. The player killed all pieces in other side win the game.",
    "CLOSE":"Close"
    });
    game.init();
  });
