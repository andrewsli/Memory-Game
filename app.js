var cards = document.querySelectorAll(".card");
var cardIsFlipped = false;
var firstCard, secondCard;
document.getElementById("reset_button").addEventListener("click",resetGame);


function flipCard() {
    if (this===firstCard || document.getElementsByClassName("active").length===2){
        return;
    }
    
    this.classList.add('flipped');

    if(!cardIsFlipped){
        cardIsFlipped=true;
        firstCard=this;
        firstCard.classList.add('active');
        document.getElementById('flips').innerHTML++
        return;
    }

    secondCard = this;
    secondCard.classList.add('active');
    document.getElementById('flips').innerHTML++

    checkMatch();
}

function checkMatch(){
    if (firstCard.dataset.card_type===secondCard.dataset.card_type){
        cardsMatched();
    }
    else{
        unflipCards()
    }
}

//click event listener removed when cards matched
function cardsMatched(){
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);
    resetStates();
    if (document.getElementsByClassName("flipped").length===16 && document.getElementById("best_score").innerHTML >document.getElementById('flips').innerHTML){
        document.getElementById("best_score").innerHTML = document.getElementById('flips').innerHTML;
    }
}

function resetStates(){
    firstCard.classList.remove('active');
    secondCard.classList.remove('active');
    cardIsFlipped = false;
    firstCard = undefined;
    secondCard = undefined;
}

function unflipCards(){
    setTimeout(function(){firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetStates();},1000);
}

function resetGame(){
    let cards = document.querySelectorAll(".card");
    for (let x of cards){
        x.classList.remove("flipped");
    }
    addClicksToCards();
    resetCounter();
    firstCard = undefined;
    secondCard = undefined;
    cardIsFlipped = false;
    shuffleCards();
}

function addClicksToCards(){
    let cards = document.querySelectorAll(".card");
    for(let x of cards){
        x.addEventListener("click",flipCard)
    }
}

function resetCounter(){
    document.getElementById('flips').innerHTML=0;
}

//god bless stackoverflow
function shuffleArray(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0!==currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function shuffleCards(){
    let cardsArray=["ditto_bulbasaur","ditto_bulbasaur","ditto_pikachu","ditto_pikachu","ditto_quilava","ditto_quilava","feebas","feebas","mimikyu","mimikyu","mudkip","mudkip","quagsire","quagsire","tyranitar","tyranitar"];
    removeElementsByClass("card");
    shuffleArray(cardsArray);
    for (let x of cardsArray){
        let card_div = document.createElement('div');
        card_div.className = "card";
        card_div.dataset.card_type = x;

        let cardfront = document.createElement('img');
        cardfront.className = "card_front";
        cardfront.src = x+".png";

        let cardback = document.createElement('img');
        cardback.className = "card_back";
        cardback.src = "cardback.png";

        card_div.append(cardfront);
        card_div.append(cardback);
        game_board.appendChild(card_div);
    }
    addClicksToCards();
}

addClicksToCards();
shuffleCards();