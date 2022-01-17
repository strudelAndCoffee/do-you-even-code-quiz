// code sourced from Laurens Holst and ashleedawg at stackoverflow.com: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
};

// GLOBAL VARIABLES AND OBJECTS
// Element selectors for page sections
var timerEl = document.querySelector("#timer");
var displayEl = document.querySelector(".display");

// Display message objects
var startMsgObj = {
    msg: "<p>Answer as many questions correctly as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. <br />Good Luck!",
    btnId: "start",
    btnMsg: "Got It",
};
var finishMsgObj = {
    msg: "<p>You finished! <br />Let's see how you did...",
    btnId: "end",
    btnMsg: "Continue",
};
var timesUpMsgObj = {
    msg: "<p>Oops! You ran out of time. <br />Try again?",
    btnIdY: "restart",
    btnIdN: "quit",
    btnMsgY: "Try Again",
    btnMsgN: "Quit",
};
// Quiz card message objects
var card1 = {
    id: 1,
    question: "this is the question for card id=1",
    wrongAnswers: ["card 1: wrong answer 1", "card 1: wrong answer 2", "card 1: wrong answer 3"],
    rightAnswer: "card 1: right answer",
};
var card2 = {
    id: 2,
    question: "this is the question for card id=2",
    wrongAnswers: ["card 2: wrong answer 1", "card 2: wrong answer 2", "card 2: wrong answer 3"],
    rightAnswer: "card 2: right answer",
};
var card3 = {
    id: 3,
    question: "this is the question for card id=3",
    wrongAnswers: ["card 3: wrong answer 1", "card 3: wrong answer 2", "card 3: wrong answer 3"],
    rightAnswer: "card 3: right answer",
};
var card4 = {
    id: 4,
    question: "this is the question for card id=4",
    wrongAnswers: ["card 4: wrong answer 1", "card 4: wrong answer 2", "card 4: wrong answer 3"],
    rightAnswer: "card 4: right answer",
};
var quizCardArray = [card1, card2, card3, card4];
shuffleArray(quizCardArray);

// GLOBAL FUNCTIONS
// Prompt to begin
var beginQuiz = function(event) {
    targetBtn = event.target;

    if (targetBtn.matches("#begin-btn")) {
        displayMessage(startMsgObj);
    }
};

// Generates messages to display before/after taking quiz
var displayMessage = function(msgObj) {

    if (msgObj !== timesUpMsgObj) {
        var displayMsg = msgObj.msg;
        var btnId = msgObj.btnId;
        var btnMsg = msgObj.btnMsg;

        var currentCard = document.querySelector(".msg-card");
        currentCard.remove();

        var newCard = document.createElement("article");
        newCard.className = "msg-card";
        newCard.innerHTML = displayMsg;
        var newBtn = document.createElement("button")
        newBtn.setAttribute("id", btnId);
        newBtn.textContent = btnMsg;

        newCard.appendChild(newBtn);
        displayEl.appendChild(newCard);
    }
    else if (msgObj === timesUpMsgObj) {
        var displayMsg = msgObj.msg;
        var btnIdYes = msgObj.btnIdY;
        var btnIdNo = msgObj.btnIdN;
        var btnYes = msgObj.btnMsgY;
        var btnNo = msgObj.btnMsgN;

        var currentCard = document.querySelector(".msg-card");
        currentCard.remove();

        var newCard = displayEl.createElement("article");
        newCard.className = "msg-card";
        newCard.innerHTML = displayMsg;
        var newBtnY = document.createElement("button")
        newBtnY.setAttribute("id", btnIdYes);
        newBtnY.textContent = btnYes;
        var newBtnN = document.createElement("button")
        newBtnN.setAttribute("id", btnIdNo);
        newBtnN.textContent = btnNo;
    }
};

// Starts countdown and quiz
var startTimer = function (event) {
    var targetBtn = event.target;

    if (targetBtn.matches("#start")) {
        var currentCard = document.querySelector(".msg-card");
        currentCard.remove();

        runQuiz();
        
        let currentTime = 60;

        var timeInterval = setInterval(function () {
            if (currentTime >= 1) {
            timerEl.textContent = currentTime;
            currentTime--;
            } else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            }
        }, 1000);
    }
};

// Runs through quiz cards
var runQuiz = function() {
    for (var i = 0; i < quizCardArray; i++) {
        var currentCard = quizCardArray[i];
        var wrongAnswers = currentCard.wrongAnswers;
        var rightAnswer = currentCard.rightAnswer;

        var newCardEl = displayEl.createElement("article");
        newCardEl.className = "quiz-card";
        newCardEl.setAttribute("id", currentCard.id);

        var cardQuestion = displayEl.createElement("h4");
        cardQuestion.className = "quiz-question";
        cardQuestion.textContent = currentCard.question;
        newCardEl.appendChild(cardQuestion);

        var cardAnswersEl = displayEl.createElement("ul");
        cardAnswersEl.className = "quiz-answers";
        var allAnswers = [];

        for (var i = 0; i < wrongAnswers.length; i++) {
            var wrongAnswerEl = displayEl.createElement("li");
            var wrongAnswerBtn = displayEl.createElement("button");
            wrongAnswerBtn.setAttribute("data-answer", 0);
            wrongAnswerBtn.textContent = wrongAnswers[i];
            wrongAnswerEl.appendChild(wrongAnswerBtn);

            allAnswers.push(wrongAnswerEl);
        }

        var rightAnswerEl = displayEl.createElement("li");
        var rightAnswerBtn = displayEl.createElement("button");
        rightAnswerBtn.setAttribute("data-answer", 1);
        rightAnswerBtn.textContent = rightAnswer;
        rightAnswerEl.appendChild(rightAnswerBtn);

        allAnswers.push(rightAnswerEl);
        shuffleArray(allAnswers);

        for (var i = 0; i < allAnswers.length; i++) {
            cardAnswersEl.appendChild(allAnswers[i]);
        }

        newCardEl.appendChild(cardAnswersEl);

        currentCardHandler(currentCard);
    }
};

var currentCardHandler = function(card) {
    var currentCard = card;

;}

var playAgain = function(event) {
    var targetBtn = event.target;

    if (targetBtn.matches("#restart")) {
        console.log("restart quiz");
    }
    else if (targetBtn.matches("#quit")) {
        console.log("quit quiz");
    }
}

displayEl.addEventListener("click", beginQuiz);
displayEl.addEventListener("click", startTimer);
displayEl.addEventListener("click", playAgain);