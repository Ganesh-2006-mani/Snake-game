const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

// Load images (same folder)
const headImg = new Image();
headImg.src = "head.png";

const bodyImg = new Image();
bodyImg.src = "body.png";

const foodImg = new Image();
foodImg.src = "food.png";

// Snake initial state
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";

// Food
let food = generateFood();

// Score
let score = 0;

// Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Generate food
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Main game loop
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((part, index) => {
        if (index === 0) {
            ctx.drawImage(headImg, part.x, part.y, box, box);
        } else {
            ctx.drawImage(bodyImg, part.x, part.y, box, box);
        }
    });

    // Draw food
    ctx.drawImage(foodImg, food.x, food.y, box, box);

    // Move snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    // Game over conditions
    if (
        headX < 0 || headX >= canvas.width ||
        headY < 0 || headY >= canvas.height ||
        snake.some((part, index) => index !== 0 && part.x === headX && part.y === headY)
    ) {
        alert("Game Over! Score: " + score);
        location.reload();
        return;
    }

    let newHead = { x: headX, y: headY };

    // Eat food
    if (headX === food.x && headY === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

// Start game
setInterval(drawGame, 150);
