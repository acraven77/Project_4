"use strict";

//I know that I could have wrote this project without Constructor functions however I
//wanted to use them to really learn how they work. Also my goal was to use mostly all vanilla
//JS with the exception of using jQuery for element selection and assigning classes and things.
//I feel that method is much faster and saves lines of code. Also I know there might be some
//extra code especially when checking for a winner. I tried to use the DRY method as much as
//possible however I didn't want to copy other students work, instead I wanted to come up with my
//own solution.


//immediately invoked function
// (function() {


  /* ================================================================
  Global Variables
  ================================================================ */

  var game = new Game();
  var vsComputer = false;


  /* ================================================================
  Once Window is loaded
  ================================================================ */


//Function to append HTML to the start page. Hide the appended HTML and show the game board once
//"start game" is selected. Create a new game object and select at random a player to go first.
//Also create a new game against the computer if "vsComputer" is selected.
  window.onload = function() {
    $("#board").hide();
    $("body").append('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a><form><input type="text" class="nameInput" id="startName1" placeholder="player 1 name"><input type="text" class="nameInput" id="startName2" placeholder="player 2 name"></form><h1 class="or">or</h1><a href="#" class="compButton">vs Computer</a></header></div>');

    $(".button").click(function(){
      var player1 = new Player($("#startName1").val(), 1);
      var player2 = new Player($("#startName2").val(), 2);

        $("#board").show();
        $("#start").hide();
        $("#player1").append("<div class='playerName'>" + $("#startName1").val() + "</div>");
        $("#player2").append("<div class='playerName'>" + $("#startName2").val() + "</div>");

        if (randomNum() < .5) {
          $("#player1").addClass("active");
        } else {
          $("#player2").addClass("active");
        }

        game.newGame(player1);
        game.newGame(player2);
    });

    $(".compButton").click(function(){
      var computer = new Player('Computer', 1);
      var you = new Player('You', 2);
      vsComputer = true;

      $("#board").show();
      $("#start").hide();
      $("#player1").append("<div class='playerName'>" + "Computer" + "</div>");
      $("#player2").append("<div class='playerName'>" + "You" + "</div>");

      if (randomNum() < .5) {
        $("#player1").addClass("active");
      } else {
        $("#player2").addClass("active");
      }

      game.newGame(computer);
      game.newGame(you);

      if ($("#player1").hasClass("active")) {
        computerMove();
      }
    });
  };


//Simple random number generator.
  function randomNum() {
    return Math.random();
  }


//Constructor function to create new game object.
  function Game() {
    this.board = [];
    this.boxesArr = [[0,0,0], [0,0,0], [0,0,0]];
  }


//Prototype function to keep track of how many moves have been made so far in the game.
  Game.prototype.moveCount = function(playerNum) {
    game.board[playerNum].moves.push(1);
  };


//Prototype function to track the player moves and store their positions in an array.
  Game.prototype.move = function(boxPosition, playerNum) {
    var boxMove = $(".box").index(boxPosition);
    var position = 0;

      for (var i = 0; i < 3; i++) {
        for (var x = 0; x < 3; x++) {
          if (boxMove === position) {
            if(playerNum === 0) {
              this.boxesArr[i][x] = 1;
            } else {
              this.boxesArr[i][x] = 6;
            }
          }
          position++;
        }
      }
  };


//Prototype function to create a new board in the game object.
  Game.prototype.newGame = function(board) {
    this.board.push(board);
  };


//This prototype function checks the array holding the clicked elements for a winner. I know this can be
//accomplished with fewer lines of code. I found a few other examples that other students were
//implementing however I wanted to come up with my own solution.
  Game.prototype.checkWin = function() {
    var boxes = this.boxesArr;

      for (var i = 0; i < 3; i++) {
        if (boxes[i].reduce(getSum) === 3) {
          return "Player 1";
        } else if (boxes[i].reduce(getSum) === 18) {
          return "Player 2";
          }
      } for (var x = 0; x < 3; x++) {
          if ((boxes[0][x] + boxes[1][x] + boxes[2][x]) === 3) {
            return "Player 1";
          } else if ((boxes[0][x] + boxes[1][x] + boxes[2][x]) === 18) {
            return "Player 2";
            }
      } if ((boxes[0][0] + boxes[1][1] + boxes[2][2]) === 3) {
            return "Player 1";
        } else if ((boxes[0][0] + boxes[1][1] + boxes[2][2]) === 18) {
            return "Player 2";
          }
        if ((boxes[0][2] + boxes[1][1] + boxes[2][0]) === 3) {
          return "Player 1";
        } else if ((boxes[0][2] + boxes[1][1] + boxes[2][0]) === 18) {
          return "Player 2";
          }
        if (boxes[0].reduce(getSum) + boxes[1].reduce(getSum) + boxes[2].reduce(getSum) === 29) {
          return "Tie";
        } else if (boxes[0].reduce(getSum) + boxes[1].reduce(getSum) + boxes[2].reduce(getSum) === 34) {
          return "Tie";
        }
  };


//Simple function to get the total from an array and return the sum to the reduce function.
  function getSum(total, num) {
    return total + num;
  }


//Constructor function to build player objects to store their name, player number and move count.
  function Player(name, playerNum) {
    this.name = name;
    this.playerNum = playerNum;
    this.moves = [];
  }


//Simple function to add and remove the 'active' class to the current player.
  function switchPlayer(player) {
    if (player === 'player1') {
      $("#player1").removeClass("active");
      $("#player2").addClass("active");
    } else if (player === 'player2') {
      $("#player2").removeClass("active");
      $("#player1").addClass("active");
    }
  }


//On click handler will first check which is the current user. Then if there is already
//a "hover" class added it will be removed. Finally add the appropriate "X" or "O" class to the element.
  $(".box").on("mouseover", function() {
    if (($("#player1").hasClass('active')) && ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2'))) {
      $(this).removeClass("xHover");
      $(this).removeClass("oHover");
    } else if ($("#player1").hasClass('active')) {
      $(this).removeClass("xHover");
      $(this).addClass("oHover");
      }
    if (($("#player2").hasClass('active')) && ($(this).hasClass('box-filled-2') || $(this).hasClass('box-filled-1'))) {
      $(this).removeClass("xHover");
      $(this).removeClass("oHover");
    } else if ($("#player2").hasClass('active')) {
      $(this).removeClass("oHover");
      $(this).addClass("xHover");
      }
  });


//On click handler to add the proper class based off of "X's" and "O's" to the element. Increment the
//move count and call the move tracking function. Also checks if there is a winner yet.
  $(".box").on("click", function() {
    var win = false;
      if ($("#player1").hasClass('active') && !$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        $(this).addClass('box-filled-1');
        game.moveCount(0);
        game.move(this,0);
        if (game.checkWin() === 'Player 1') {
          winner('Player 1');
          win = true;
        } else if (game.checkWin() === 'Tie') {
            winner('Tie');
            win = true;
        }
        switchPlayer('player1');
      } else if ($("#player2").hasClass('active') && !$(this).hasClass('box-filled-2') && !$(this).hasClass('box-filled-1')) {
          $(this).addClass('box-filled-2');
          game.moveCount(1);
          game.move(this,1);
          if (game.checkWin() === 'Player 2') {
            winner('Player 2');
            win = true;
          } else if (game.checkWin() === 'Tie') {
              winner('Tie');
              win = true;
          }
          if (vsComputer && !win) {
            switchPlayer('player2');
            computerMove();
          } else {
              switchPlayer('player2');
            }
        }
  });


//Function to display proper screen once a winner has been decided. Also reloads the page if
//the new game button is clicked. Once "New Game" is clicked the move count, Boxes
//array, board boxes classes are all reset back to zero. A random player is chosen
//and checks to see if the previous game was played with computer.
  function winner(player) {
    $("#board").hide();

    if (document.getElementById('finish')) {
      $("#finish").show();
    } else {
      $("body").append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button newGame">New game</a><h1 class="winPage">or</h1><a href="#" class="button resetGame">Reset Game</a></header></div>');
    }

    if (player === 'Player 1') {
      $("#finish").addClass('screen-win-one');
      $(".message").text('Winner is ' + game.board[0].name);
    } else if (player === 'Player 2'){
        $("#finish").addClass('screen-win-two');
        $(".message").text('Winner is ' + game.board[1].name);
    } else {
      $("#finish").addClass('screen-win-tie');
      $(".message").text("It's a Tie!");
    }

    $(".resetGame").on("click", function() {
      $("#finish").hide();
      $("#board").show();
      for (var i = 0; i < 2; i++) {
        game.board[i].moves = [];
      }
      for (var x = 0; x < document.getElementsByClassName('box').length; x++) {
        document.getElementsByClassName('box')[x].classList.remove("xHover", "oHover", "box-filled-1", "box-filled-2");
      }
      document.getElementById('finish').classList.remove("screen-win-one", "screen-win-two", "screen-win-tie");
      game.boxesArr = [[0,0,0], [0,0,0], [0,0,0]];

      $("#player1").removeClass("active");
      $("#player2").removeClass("active");

      if (randomNum() < .5) {
        $("#player1").addClass("active");
      } else {
        $("#player2").addClass("active");
      }

      if (game.board[0].name === "Computer" && $("#player1").hasClass("active")) {
        computerMove();
      }
    });    

    $(".newGame").on("click", function() {
      location.reload();
    });
  }


//Function to implement the computers chosen move
  function computerMove() {
    var compChose = document.getElementsByClassName('box')[computerRand()];
      if ($("#player1").hasClass('active') && !$(compChose).hasClass('box-filled-1')) {
        $(compChose).addClass('box-filled-1');
        game.moveCount(0);
        game.move(compChose,0);
        if (game.checkWin() === 'Player 1') {
          winner('Player 1');
        } else if (game.checkWin() === 'Tie') {
            winner('Tie');
        }
        switchPlayer('player1');
  }
}


//Function to pick random box when it's the computers turn. I know the choosing isn't very
//"smart" and it just chooses at random and not what would be the next best move. I read over
//the suggested minimax algorithm however honestly I didn't really understand how to implement
//it. I will revisit later.
  function computerRand() {
    var box = document.getElementsByClassName('box');
    do {
      //Not sure if this is the best solution by recreating the variable every time, but it works.
      var num = Math.floor(Math.random() * 9);
      if ((game.board[0].moves.length + game.board[1].moves.length) === 9) {
        break;
      }
    } while (box[num].classList.contains('box-filled-1') || box[num].classList.contains('box-filled-2'));
    return num;
  }


// }());
