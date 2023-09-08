// Variables
let uncoveredCards = 0;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let time = 30;
let peers = 0;
let initialTimer = time;
let regressiveTime = null;
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('timeLeft');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('/sounds/lose.wav');
let clickAudio = new Audio('/sounds/click.wav');
let rightAudio = new Audio('sounds/right.wav');
let wrongAudio = new Audio('/sounds/wrong.wav');

// Random number generation
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
    return Math.random() - 0.3
});

//Functions
function countTime() {
    regressiveTime = setInterval(() => {
        time--;
        showTime.innerHTML = `Time: ${time} seconds`;
        if(time < 0){
            clearInterval(regressiveTime);
            lockedCards();
            loseAudio.play();
        }
    }, 1000, time);
}

function lockedCards(numbers){
    for(let i = 0; i<=15; i++){
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = `<img src="./imgs/${numbers[i]}.png" alt="">`;
        lockedCard.disabled = true;
    }
}

//Principal function
function uncover(id) {

    if (timer == false) {
        countTime();
        timer = true;
    }

    uncoveredCards++

    if (uncoveredCards == 1) {
        //Show first number
        let cardOne = document.getElementById(id);
        firstResult = numbers[id];
        cardOne.innerHTML = `<img src="./imgs/${firstResult}.png" alt="">`;
        clickAudio.play();

        //Disable first button
        cardOne.disabled = true;

        firstId = id;

    } else if (uncoveredCards == 2) {
        //Show second number
        let cardTwo = document.getElementById(id);
        secondResult = numbers[id];
        cardTwo.innerHTML = `<img src="./imgs/${secondResult}.png" alt="">`;

        //Disable first button
        cardTwo.disabled = true;

        secondId = id;

        //Movements
        movements++;
        showMovements.innerHTML = `Movements: ${movements}`;

        if (firstResult == secondResult) {
            //If the pair is found, the counter is reset and I can continue uncovering cards
            uncoveredCards = 0;
            //Increase hits
            peers++;
            hits++;
            showHits.innerHTML = `Score: ${hits}`;
            rightAudio.play();
        }else{
            //Show values ​​and recap
            wrongAudio.play();
            setTimeout(()=>{
                cardOne = document.getElementById(firstId);
                cardTwo = document.getElementById(secondId);
                cardOne.innerHTML = ' ';
                cardTwo.innerHTML = ' ';
                cardOne.disabled = false;
                cardTwo.disabled = false;
                uncoveredCards = 0;
            }, 500)
        }
    }

            if (peers == 8) {
                winAudio.play()
                clearInterval(regressiveTime);
                showHits.innerHTML = `Score: ${hits} 😎`;
                showTime.innerHTML = `Wow! 🥳 You did it in ${initialTimer - time} seconds`;
                showMovements.innerHTML = `Movements: ${movements} 🕹️🔥`;
            }
    }

    //Reset game
    function resetGame() {
        // Restablecer todas las variables del juego
        uncoveredCards = 0;
        firstResult = null;
        secondResult = null;
        movements = 0;
        hits = 0;
        timer = false;
        time = 30;
        peers = 0;
        initialTimer = time;
        clearInterval(regressiveTime); // Detener el temporizador
        showTime.innerHTML = `Time: ${time} seconds`;
        showMovements.innerHTML = `Movements: ${movements}`;
        showHits.innerHTML = `Score: ${hits}`;
    
        // Restablecer el contenido de las cartas (botones)
        for (let i = 0; i <= 15; i++) {
            let card = document.getElementById(i);
            card.innerHTML = '';
            card.disabled = false;
        }
    
        // Ocultar cualquier mensaje de finalización
        // Esto podría ser algún elemento HTML que muestre "Fantastic! You did it" u otro mensaje similar.
        // Por ejemplo:
        let winMessage = document.getElementById('winMessage');
        if (winMessage) {
            winMessage.style.display = 'none';
        }
    
        // Volver a barajar las cartas
        numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
        numbers = numbers.sort(() => {
            return Math.random() - 0.3;
        });
    }
    