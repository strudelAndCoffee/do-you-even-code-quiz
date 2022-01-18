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
var currentTime = 60;
var displayEl = document.querySelector(".display");
var correctResponses = 0;

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
    question: "What is 2 + 2?",
    wrongAnswers: ["5", "1", "3"],
    rightAnswer: "4",
};
var card2 = {
    id: 2,
    question: "What is 2 - 2?",
    wrongAnswers: ["2", "1", "-2"],
    rightAnswer: "0",
};
var card3 = {
    id: 3,
    question: "What is 2 * 2?",
    wrongAnswers: ["2", "8", "5"],
    rightAnswer: "4",
};
var card4 = {
    id: 4,
    question: "What is 2 / 2 ",
    wrongAnswers: ["2", "-1", "0"],
    rightAnswer: "1",
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

        var newCard = document.createElement("article");
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

        var timeInterval = setInterval(function () {
            if (currentTime >= 1) {
            timerEl.textContent = currentTime;
            currentTime--;
            } else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            runGameOver();
            }
        }, 1000);
    }
};

// Runs through quiz cards
var runQuiz = function() {
    
    for (var i = 0; i < quizCardArray.length; i++) {
        var currentCard = quizCardArray[i];
        var wrongAnswers = currentCard.wrongAnswers;
        var rightAnswer = currentCard.rightAnswer;

        var newCardEl = document.createElement("article");
        newCardEl.className = "quiz-card";
        newCardEl.setAttribute("id", currentCard.id);

        var cardQuestion = document.createElement("h4");
        cardQuestion.className = "quiz-question";
        cardQuestion.textContent = currentCard.question;
        newCardEl.appendChild(cardQuestion);

        var cardAnswersEl = document.createElement("ul");
        cardAnswersEl.className = "quiz-answers";
        var allAnswers = [];

        for (var i = 0; i < wrongAnswers.length; i++) {
            var wrongAnswerEl = document.createElement("li");
            wrongAnswerEl.className = "list-answer";
            var wrongAnswerBtn = document.createElement("button");
            wrongAnswerBtn.setAttribute("data-answer", 0);
            wrongAnswerBtn.className = "answer-btn";
            wrongAnswerBtn.textContent = wrongAnswers[i];
            wrongAnswerEl.appendChild(wrongAnswerBtn);

            allAnswers.push(wrongAnswerEl);
        }

        var rightAnswerEl = document.createElement("li");
        rightAnswerEl.className = "list-answer";
        var rightAnswerBtn = document.createElement("button");
        rightAnswerBtn.setAttribute("data-answer", 1);
        rightAnswerBtn.className = "answer-btn";
        rightAnswerBtn.textContent = rightAnswer;
        rightAnswerEl.appendChild(rightAnswerBtn);

        allAnswers.push(rightAnswerEl);
        shuffleArray(allAnswers);

        for (var i = 0; i < allAnswers.length; i++) {
            var answerEl = allAnswers[i];
            cardAnswersEl.appendChild(answerEl);
        }

        newCardEl.appendChild(cardAnswersEl);
        displayEl.appendChild(newCardEl);
        cardAnswersEl.addEventListener("click", response);
    }
};

var response = function(event) {
    var cardEl = document.querySelector(".quiz-card");
    var selectedAnswer = event.target;
    var answerBtnValue = selectedAnswer.getAttribute("data-answer");

    if (answerBtnValue == 1) {
        selectedAnswer.setAttribute("style", "background-color: green;");
        var answerMsg = document.createElement("h4");
        answerMsg.className = "answer-msg";
        answerMsg.textContent = "Correct!";
        cardEl.appendChild(answerMsg);
        correctResponses++;
    }
    else if (answerBtnValue == 0) {
        selectedAnswer.setAttribute("style", "background-color: orange;");
        var answerMsg = document.createElement("h4");
        answerMsg.className = "answer-msg";
        answerMsg.textContent = "Incorrect.";
        cardEl.appendChild(answerMsg);
        currentTime -= 5;
    }
};


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