//always display game name at the top

//under game name, display "Player []'s Turn:" Alternate between player 1 and 2.
let whoseTurn = document.getElementById('turn');
let squares = document.querySelectorAll('div.square');
let playedSquare = 0;
let isWinner = false;
gamePlay();


/*
when all spots are filled in or if one letter or the other occupies three 
spots in a row, H,V, or D, the game is over. Declare a winner or a draw.
*/
function checkWin() {
    let 
    sq1 = document.getElementById('one'),
    sq2 = document.getElementById('two'),
    sq3 = document.getElementById('three'),
    sq4 = document.getElementById('four'),
    sq5 = document.getElementById('five'),
    sq6 = document.getElementById('six'),
    sq7 = document.getElementById('seven'),
    sq8 = document.getElementById('eight'),
    sq9 = document.getElementById('nine');

    //horizontal top row: if first square is not empty and its contents match 2nd and 3rd square contents
    if (sq1.innerHTML !== '' && (sq1.innerHTML === sq2.innerHTML && sq1.innerHTML === sq3.innerHTML)) {
        winningSquares(sq1, sq2, sq3);
    } else
    //horizontal middle row
    if (sq4.innerHTML !== '' && (sq4.innerHTML === sq5.innerHTML && sq4.innerHTML === sq6.innerHTML)) {
        winningSquares(sq4, sq5, sq6); 
    } else
    //horizontal bottom row
    if (sq7.innerHTML !== '' && (sq7.innerHTML === sq8.innerHTML && sq7.innerHTML === sq9.innerHTML)) {
        winningSquares(sq7, sq8, sq9); 
    } else
    //vertical left column
    if (sq1.innerHTML !== '' && (sq1.innerHTML === sq4.innerHTML && sq1.innerHTML === sq7.innerHTML)) {
        winningSquares(sq1, sq4, sq7); 
    } else
    //vertical middle column
    if (sq2.innerHTML !== '' && (sq2.innerHTML === sq5.innerHTML && sq2.innerHTML === sq8.innerHTML)) {
        winningSquares(sq2, sq5, sq8); 
    } else
    //vertical right column
    if (sq3.innerHTML !== '' && (sq3.innerHTML === sq6.innerHTML && sq3.innerHTML === sq9.innerHTML)) {
        winningSquares(sq3, sq6, sq9); 
    } else
    //diagonal l-r
    if (sq1.innerHTML !== '' && (sq1.innerHTML === sq5.innerHTML && sq1.innerHTML === sq9.innerHTML)) {
        winningSquares(sq1, sq5, sq9); 
    } else
    //diagonal r-l
    if (sq3.innerHTML !== '' && (sq3.innerHTML === sq5.innerHTML && sq3.innerHTML === sq7.innerHTML)) {
        winningSquares(sq3, sq5, sq7); 
    }
}

function winningSquares(s1, s2, s3) {
    s1.classList.add('winner');
    s2.classList.add('winner');
    s3.classList.add('winner');
    isWinner = true;
    whoseTurn.innerHTML = s1.innerHTML + ' wins! Play again.';
    $('.modal').modal('show')

    fire(0.25, {
        spread: 26, startVelocity: 55, 
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100, decay: 0.91, scalar: 0.8
    });
    fire(0.1, {
        spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2
    });
    fire(0.1, {
        spread: 120, startVelocity: 45,
    });
}

var count = 200;
var defaults = {origin: { y: 0.7 }};
    
function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
}

//when the player clicks on a column, enter their gamepiece as innerHTML
//could give user a selection of images to use as gamepiece and innerHTML would be the image file



function gamePlay() {

        for (let i = 0; i < squares.length; i++) {
            squares[i].onclick = function() {
                if (this.innerHTML !== 'X' && this.innerHTML !== 'O' && isWinner === false && playedSquare !== 9) {
                    if (playedSquare % 2 === 0) {
                        this.innerHTML = 'X';
                        whoseTurn.innerHTML = 'Its Os turn';
                        checkWin();
                        playedSquare += 1;
                    } else {
                        this.innerHTML = 'O';
                        whoseTurn.innerHTML = 'Its Xs turn';
                        checkWin();
                        playedSquare += 1;
                    }
                if (playedSquare === 9 && isWinner === false) {
                    whoseTurn.innerHTML = 'No winner. Try again!';
                    let audio = new Audio('.\sounds\Gameover.wav'); 
                    audio.play();
                }
                    } else {
                        if (playedSquare === 9 && isWinner === true); 
                        whoseTurn.innerHTML = 'Yay! You won!';
                        let audio = Audio('./sounds/Winner.wav'); 
                        audio.play();    
                       
                        
            }
        };
    }
}

//set a button at bottom (there all the time) to clear board and start again
document.getElementById('resetGame').addEventListener('click', resetGame);

function resetGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove('winner');
        squares[i].innerHTML = '';
        whoseTurn.innerHTML = 'Lets Play! X goes first.';
        playedSquare = 0;
        isWinner = false;
    }
}
