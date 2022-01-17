// code sourced from Laurens Holst and ashleedawg at stackoverflow.com: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

var timerEl = document.querySelector("#timer");
var displayEl = document.querySelector(".display");

// Display message objects
var beginMsg = {
    msg: "<p>Answer as many questions correctly as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. <br />Good Luck!",
    btnId: "start-continue",
    btnMsg: "Got It",
};
var completeMsg = {
    msg: "<p>You finished! <br />Let's see how you did...",
    btnId: "end-continue",
    btnMsg: "Continue",
};
var timesUpMsg = {
    msg: "<p>Oops! You ran out of time. <br />Try again?",
    btnId: "end-prompt",
    btnMsgY: "Try Again",
    btnMsgN: "Quit",
};
// Quiz card message objects
var card1 = {
    id: 1,
    question: "this is the question for card id=1",
    wrongAnswers: ["card 1: wrong answer 1", "card 1: wrong answer 2", "card 1: wrong answer 3"],
    correctAnswer: "card 1: correct answer",
};
var card2 = {
    id: 2,
    question: "this is the question for card id=2",
    wrongAnswers: ["card 2: wrong answer 1", "card 2: wrong answer 2", "card 2: wrong answer 3"],
    correctAnswer: "card 2: correct answer",
};
var card3 = {
    id: 3,
    question: "this is the question for card id=3",
    wrongAnswers: ["card 3: wrong answer 1", "card 3: wrong answer 2", "card 3: wrong answer 3"],
    correctAnswer: "card 3: correct answer",
};
var card4 = {
    id: 4,
    question: "this is the question for card id=4",
    wrongAnswers: ["card 4: wrong answer 1", "card 4: wrong answer 2", "card 4: wrong answer 3"],
    correctAnswer: "card 4: correct answer",
};
var quizCardArray = [card1, card2, card3, card4];
shuffleArray(quizCardArray);

// Countdown begins and quiz starts
var startTimer = function (event) {
    var targetBtn = event.target;

    if (targetBtn.matches("#begin-btn")) {
        runQuiz();
        displayMessage(beginMsg);

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

var runQuiz = function() {

}

// Generates message to display before/after taking quiz
var displayMessage = function(msgObj) {

    if (msgObj !== timesUpMsg) {
        var displayMsg = msgObj.msg;
        var btnId = msgObj.btnId;
        var btnMsg = msgObj.btnMsg;

        var currentCard = document.querySelector(".msg-card");
        var msgEl = document.querySelector(".display");
        currentCard.remove();

        var newCard = msgEl.createElement("article");
        newCard.className = "msg-card";
        newCard.innerHTML = displayMsg;
        var newBtn = document.createElement("button")
        newBtn.setAttribute("data-btn-id", btnId);
        newBtn.textContent = btnMsg;
    }
    else if (msgObj === timesUpMsg) {
        var displayMsg = msgObj.msg;
        var btnId = msgObj.btnId;
        var btnYes = msgObj.btnMsgY;
        var btnNo = msgObj.btnMsgN;

        var currentCard = document.querySelector(".msg-card");
        var msgEl = document.querySelector(".display");
        currentCard.remove();

        var newCard = msgEl.createElement("article");
        newCard.className = "msg-card";
        newCard.innerHTML = displayMsg;
        var newBtnY = document.createElement("button")
        newBtnY.setAttribute("data-btn-id", btnId);
        newBtnY.textContent = btnYes;
        var newBtnN = document.createElement("button")
        newBtnN.setAttribute("data-btn-id", btnId);
        newBtnN.textContent = btnNo;
    }
};

displayEl.addEventListener("click", startTimer);