//Game variables
var alienX = 80;
var alienY = 20;
var guessX = 0;
var guessY = 0;
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = ''
var gameWon = false;

//The game objects
var cannon = document.getElementById('cannon');
var alien = document.getElementById('alien');
var missile = document.getElementById('missile');
var explosion = document.getElementById('explosion');
var inputX = document.getElementById('inputX');
var inputY = document.getElementById('inputY');
var output = document.getElementById('output');

//The button
var fireBtn = document.getElementById('fire_button');
fireBtn.style.cursor = 'pointer';
fireBtn.addEventListener('click', handleClick, false);

function render() {
    //Position the alien
    alien.style.left = `${alienX}px`;
    alien.style.top = `${alienY}px`;

    //Position the cannon
    cannon.style.left = `${guessX}px`;

    //Positon the missile
    missile.style.left = `${guessX}px`;
    missile.style.top = `${guessY}px`;

    if (gameWon) {
        explosion.style.left = `${alienX}px`;
        explosion.style.top = `${alienY}px`;
        explosion.style.display = 'block';
        alien.style.display = 'none';
        missile.style.display = 'none';

    }

}

function handleClick() {
    validateInput();
}


function playGame() {
    shotsRemaining = shotsRemaining - 1;
    shotsMade = shotsMade + 1;
    gameState = `Shots: ${shotsMade}, Remaining: ${shotsRemaining}`;

    guessX = parseInt(inputX.value);
    guessY = parseFloat(inputY.value);

    //Player hit
    if (guessX >= alienX && guessX <= alienX + 20) {
        if (guessY >= alienY && guessY <= alienY + 20) {
            gameWon = true;
            endGame();
        }
    } else {
        output.innerHTML = `Miss! ${gameState}`;
        if (shotsRemaining < 1) {
            endGame();
        }
    }
    if (!gameWon) {
        //Update alien position X
        alienX = Math.floor(Math.random() * 280);

        //Move Sprite towoard earth
        alienY += 30;
    }
    render();
    console.log(`X: ${alienX}`);
    console.log(`Y: ${alienY}`);
}

function endGame() {
    if (gameWon) {
        output.innerHTML
            = `Hit! You saved the earth! <br> It took you ${shotsMade} shots.`
    } else {
        output.innerHTML = `You lost! <br> The earth has been invaded!`;
    }
}

function validateInput() {

    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    if (isNaN(guessX) || isNaN(guessY)) {
        output.innerHTML = 'Please enter a number.';
    } else {
        if (guessX > 300 || guessY > 300) {
            output.innerHTML = 'Please enter a number less than 300.'
        } else {

            playGame()
        }
    }
}