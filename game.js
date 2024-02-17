//gameBoard
var blockSize = 25;
var rows = 17;
var cols = 30;
var board;
var context;

//snakeHead
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

//snakeBody
var snakeBody = [];

//snakeFood
var foodX;
var foodY;

//score
var score = 0;
var scoreElement = document.getElementById("score");

//end
var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing the board

    var savedScore = localStorage.getItem("score");
    
    placeFood();
    document.addEventListener("keyup",changeDirection);
    
    setInterval(update, 1000/10); //update
}

function update() {
    if (gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if (snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY])
        placeFood();
        score++; //to increment the score
        scoreElement.textContent = score;
        
    }

    for (let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }

    context.fillStyle="yellow";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize,blockSize);
    }

    // gameOver conditions 
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over. Your Score is " + score); // display score

        //download score 
        downloadScore();
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over. Your Score is " + score);
        }
    }
}


function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function downloadScore(){
    const filename = 'score.txt';
    const text = 'your Score: '+ score;

    const element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    element.setAttribute('download',filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}