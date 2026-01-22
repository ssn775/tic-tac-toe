const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const turnIndicator = document.querySelector(".turnIndicator");
const restartBtn = document.querySelector('.restartBtn');
const infoBox = document.querySelector('.info');
const showImg = document.querySelector('.imgBox');
const imgS = document.getElementsByTagName('img');

const playersName = document.getElementById('startNames');

//Define a Storage Key
const SCORE_KEY = "tic_tac_toe_scores";


// Making Variables
let currentPlayer = 'O';
let nextPlayer = 'X';
let playerTurn = currentPlayer;

let playerOName = "Player O";
let playerXName = "Player X";

// Making Audio Variables
let musicAudio = new Audio("music.mp3");
let turnAudio = new Audio("ting.mp3");
let gameOverAudio = new Audio("gameover.mp3");
let sadAudio = new Audio("sadMusic.mp3");

//Add Score Variables
let scoreO = 0;
let scoreX = 0;
let scoreDraw = 0;

const scoreOEl = document.getElementById("scoreO");
const scoreXEl = document.getElementById("scoreX");
const scoreDrawEl = document.getElementById("scoreDraw");


player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;


// Function to start your game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click',handleClick);

        cell.addEventListener("mouseenter", () => addHoverEffect(cell));
        cell.addEventListener("mouseleave", () => removeHoverEffect(cell));
    });
    updateTurnUI();
}

//handleClick Function
const handleClick = (e) => {
    if(e.target.textContent === ''){
                e.target.textContent = playerTurn;
                removeHoverEffect(e.target);
                clickColorChange(e.target, playerTurn);
                highlightLastMove(e.target);
                turnAudio.play();
                if(checkWin()){
                    if (playerTurn === "O") {
                        scoreO++;
                        scoreOEl.textContent = scoreO;
                        } 
                    else {
                        scoreX++;
                        scoreXEl.textContent = scoreX;
                        }

                    saveScores(); // ✅ save after win
                    
                    // console.log(`${playerTurn} is a winner`);
                    showMsg(`${playerTurn} is a winner!`);
                    disableCells();
                    gameOverAudio.play();
                    musicAudio.play();
                    //showImg.imgS[0].style.width = "200px";
                    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "300px";
                }
                else if(checkTie()){
                    scoreDraw++;
                    scoreDrawEl.textContent = scoreDraw;

                    saveScores(); // ✅ save after draw

                    // console.log(`It's a Tie!`);
                    showMsg(`It's a Tie!`);
                    disableCells();
                    gameOverAudio.play();
                    sadAudio.play();
                    document.querySelector('.imgFolder').getElementsByTagName('img')[0].style.width = "250px";
                }
                else{
                changePlayerTurn();
                // showMsg(`Turn for player: ${playerTurn}`);
                updateTurnUI();
                turnAudio.play();
                }
            }
}

//Function to change player's turn
const changePlayerTurn = () => {
        // if (playerTurn === currentPlayer){
        //     playerTurn = nextPlayer;
        // }
        // else{
        //     playerTurn = currentPlayer;
        // }

        playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
    }


//Function to check win
const checkWin = () => {
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i=0; i<winningConditions.length; i++){
        const [pos1, pos2, pos3] = winningConditions[i];
        // console.log(`${pos1} ${pos2} ${pos3}`);
        if(gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent){
            highlightWinningCells([pos1, pos2, pos3]);
            return true;
                
        }
        
    }
    return false;
    }

 //Function to Highlight Winning Cells
 const highlightWinningCells = (indexes) => {
    indexes.forEach(i => {
        gameCells[i].classList.add('win');
    });
 }

//Function to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === ''){
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();
}

//Function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

//Function to show Players Name
    playersName.addEventListener("click", () => {
    const oName = document.getElementById("playerO").value.trim();
    const xName = document.getElementById("playerX").value.trim();

    if (oName) playerOName = oName;
    if (xName) playerXName = xName;

    player1.textContent = `Player 1: ${playerOName} (O)`;
    player2.textContent = `Player 2: ${playerXName} (X)`;

    updateTurnUI();
});

//Hover Pre-view color (ghost move)
// const addHoverEffect = (cell) => {
//     if (cell.textContent !== '') return;

//     if (playerTurn === "O") {
//         cell.classList.add("preview-o");
//         cell.textContent = "O";
//     } else {
//         cell.classList.add("preview-x");
//         cell.textContent = "X";
//     }
// };
// //Remove Hover Pre-view
// const removeHoverEffect = (cell) => {
//     if (cell.classList.contains("preview-o") || cell.classList.contains("preview-x")) {
//         cell.textContent = "";
//         cell.classList.remove("preview-o", "preview-x");
//     }
// };

//Function to Cell Hover Pre-view color (ghost move)
const addHoverEffect = (cell) => {
    if (cell.textContent !== "" || cell.classList.contains("disabled")) return;

    if (playerTurn === "O") {
        cell.classList.add("preview-o");
    } else {
        cell.classList.add("preview-x");
    }
};

const removeHoverEffect = (cell) => {
    cell.classList.remove("preview-o", "preview-x");
};


//Function to restart game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled','win','last-move',"preview-o", "preview-x");
        cell.style.color = "";
    });
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.imgFolder').getElementsByTagName('img')[0].style.width = "0px";
     // reset inputs
    document.getElementById("playerO").value = "";
    document.getElementById("playerX").value = "";
      // reset names
    playerOName = "Player O";
    playerXName = "Player X";
    player1.textContent = `Player 1: ${currentPlayer}`;
    player2.textContent = `Player 2: ${nextPlayer}`;

    // reset turn
    playerTurn = currentPlayer;

    // reset turn UI
    turnIndicator.textContent = "";
    turnIndicator.classList.remove("player1", "player2");

    // stop sounds
    musicAudio.pause();
    musicAudio.currentTime = 0;

    sadAudio.pause();
    sadAudio.currentTime = 0;

    infoBox.textContent='';
    startGame();
}

//Function to Reset Score Btn
document.getElementById("resetScore").addEventListener("click", () => {
    scoreO = 0;
    scoreX = 0;
    scoreDraw = 0;

    scoreOEl.textContent = 0;
    scoreXEl.textContent = 0;
    scoreDrawEl.textContent = 0;

    localStorage.removeItem(SCORE_KEY); // ✅ clear saved data
});

//Function to Load Scores From localStorage (On Page Load)
const loadScores = () => {
    const savedScores = JSON.parse(localStorage.getItem(SCORE_KEY));

    if (savedScores) {
        scoreO = savedScores.scoreO;
        scoreX = savedScores.scoreX;
        scoreDraw = savedScores.scoreDraw;
    }

    scoreOEl.textContent = scoreO;
    scoreXEl.textContent = scoreX;
    scoreDrawEl.textContent = scoreDraw;
};

//Function to Save Scores to localStorage
const saveScores = () => {
    const scores = {
        scoreO,
        scoreX,
        scoreDraw
    };

    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
};


//Function to clickColorChange wrong idea
// const clickColorChange = () => {
//     gameCells.forEach(cell => {
//         if(playerTurn === "O"){
//             cell.style.color = 'blueviolet';
//         }
//         else{
//             cell.style.color = 'red';
//         }
//         // currentPlayer === "O" ? "red" : "green";
//     });
   
// }

//Function to clickColorChange
const clickColorChange = (cell, playerTurn) => {
    if (playerTurn === "O") {
        cell.style.color = "blueviolet";
    } else {
        cell.style.color = "#db04cc";
    }
};


//Function to show Msg
const showMsg = (msg) => {
    infoBox.textContent = msg;
    infoBox.style.display = "block";
    setTimeout(() => {
        infoBox.style.display = "none";
    }, 10000);
}

// const updateTurnUI = () => {
//     infoBox.textContent = `Turn for Player: ${playerTurn}`;
//     infoBox.classList.remove("player1", "player2");

//     if (playerTurn === "O") {
//         infoBox.classList.add("player1");
//     } else {
//         infoBox.classList.add("player2");
//     }
// };

//Function to Show Whoose turn with color
const updateTurnUI = () => {
    turnIndicator.classList.remove("player1", "player2");

    if (playerTurn === "O") {
        turnIndicator.textContent = `${playerOName}'s Turn (O)`;
        turnIndicator.classList.add("player1");
    } else {
        turnIndicator.textContent = `${playerXName}'s Turn (X)`;
        turnIndicator.classList.add("player2");
    }

    animateTurnChange();
};

//Function for Animate Turn Change
const animateTurnChange = () => {
    turnIndicator.style.transform = "scale(1.2)";
    setTimeout(() => {
        turnIndicator.style.transform = "scale(1)";
    }, 300);
};

//Function to highlight last move
const highlightLastMove = (cell) => {
    gameCells.forEach(c => c.classList.remove("last-move"));
    cell.classList.add("last-move");
};

//Function to wonSound Timer
const pauseSound = () => {
    
    setTimeout(() => {
        musicAudio.pause();
    }, 10000);

}


// Adding event Listener to restart button
restartBtn.addEventListener('click', restartGame);

//Load Scores When App Starts
saveScores(); // 

//Calling Start Game Function
startGame();


console.log(localStorage.getItem("tic_tac_toe_scores"));
console.log(JSON.parse(localStorage.getItem("tic_tac_toe_scores")));

