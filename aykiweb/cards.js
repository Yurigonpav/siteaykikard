
var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]


var cardSet;
var board = [];
var rows = 4;
var columns =5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
   
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}
function update() {
    // Se as cartas selecionadas são iguais
    if (card1Selected.src === card2Selected.src) {
        // Verificar se todas as cartas foram encontradas
        if (todasCartasEncontradas()) {
            // Adicionar aqui o código para avançar para a próxima página
            alert("Parabéns! Você encontrou todas as cartas.");
            window.location.href = "indexp3.html";
        }
    } else {
        // Se as cartas não são iguais, virar de volta e contar erro
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}

// Função para verificar se todas as cartas foram encontradas
function todasCartasEncontradas() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            // Se encontrar uma carta virada para baixo, retorna falso
            if (card.src.includes("back")) {
                return false;
            }
        }
    }
   
    return true;
}


var tempoRestante = 90;


var cronometro = setInterval(function () {
    
    var minutos = Math.floor(tempoRestante / 60);
    var segundos = tempoRestante % 60;

   
    segundos = segundos < 10 ? '0' + segundos : segundos;

    
    document.getElementById('timer').innerHTML = minutos + ':' + segundos;

    
    if (tempoRestante <= 0) {
        
        clearInterval(cronometro);

        window.location.href = "index.html"
        window.alert("você perdeu!")
    } else {
        
        tempoRestante--;
    }
}, 1000);
