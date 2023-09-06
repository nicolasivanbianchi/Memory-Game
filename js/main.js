// Variables
let uncoveredCards = 0;
let cardOne = null;
let cardTwo = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let time = 30;
let initialTimer = time;
let regressiveTime = null;

//HTML document
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('timeLeft');

// Random number generation
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
    return Math.random() - 0.5
});

//Functions
function countTime() {
    regressiveTime = setInterval(() => {
        time--;
        showTime.innerHTML = `Time: ${time} seconds`;
        if(time == 0){
            clearInterval(regressiveTime);
            lockedCards();
        }
    }, 1000);
}

function lockedCards(){
    for(let i = 0; i<=15; i++){
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = numbers[i];
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
        cardOne = document.getElementById(id);
        firstResult = numbers[id];
        cardOne.innerHTML = `<img src="./imgs/${firstResult}.png"`;

        //Disable first button
        cardOne.disabled = true;
    } else if (uncoveredCards == 2) {
        //Show second number
        cardTwo = document.getElementById(id);
        secondResult = numbers[id];
        cardTwo.innerHTML = secondResult;

        //Disable first button
        cardTwo.disabled = true;

        //Movements
        movements++;
        showMovements.innerHTML = `Movements: ${movements}`;

        if (firstResult == secondResult) {
            //If the pair is found, the counter is reset and I can continue uncovering cards
            uncoveredCards = 0;

            //Increase hits
            hits++;
            showHits.innerHTML = `Hits: ${hits}`;

            if (hits == 8) {
                clearInterval(regressiveTime);
                showHits.innerHTML = `Hits: ${hits} 😎`;
                showTime.innerHTML = `Fantastic! 🥳 You did it in just ${initialTimer - time} seconds`;
                showMovements.innerHTML = `Movements: ${movements} 🕹️🔥`;
            }
        } else {
            //Show values ​​and recap
            setTimeout((e) => {
                cardOne.innerHTML = ' ';
                cardTwo.innerHTML = ' ';
                cardOne.disabled = false;
                cardTwo.disabled = false;
                uncoveredCards = 0;
            }, 800);
        }
    }
};