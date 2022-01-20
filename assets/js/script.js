// code sourced from Laurens Holst and ashleedawg at stackoverflow.com: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
};

// Global variables and objects
// display elements
var displayEl = document.querySelector(".display");
var displayStatus = displayEl.getAttribute("status");
var timerEl = document.querySelector("#timer");
var currentTime = {
    count: 30,
    clear: false
};
var correctAnswers = 0;
var score = 0;

// quiz card message objects
var card1 = {
    question: "What is 2 + 2?",
    wrongAnswers: ["5", "1", "3"],
    rightAnswer: "4",
};
var card2 = {
    question: "What is 2 - 2?",
    wrongAnswers: ["2", "1", "-2"],
    rightAnswer: "0",
};
var card3 = {
    question: "What is 2 * 2?",
    wrongAnswers: ["2", "8", "5"],
    rightAnswer: "4",
};
var card4 = {
    question: "What is 2 / 2 ",
    wrongAnswers: ["2", "-1", "0"],
    rightAnswer: "1",
};
var quizCardArray = [card1, card2, card3, card4];
shuffleArray(quizCardArray);

// Global functions
var removeCard = function() {
    var currentCard = document.querySelector(".card");
    currentCard.remove();
}

var startMessage = function() {
    
    removeCard();

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Answer as many questions correctly as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. <br />Good Luck!</p>";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "start-btn");
    msgBtn.textContent = "Got It";

    newMsg.appendChild(msgBtn);
    displayEl.appendChild(newMsg);

    displayEl.addEventListener("click", function(event) {
        if (event.target.matches("#start-btn")) {
            startTimer();
            runQuizCard();
        }
    });
};

var startTimer = function() {
    var timeInterval = setInterval(function () {
        if (currentTime.clear == true) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
        }
        else if (currentTime.count >= 1) {
            timerEl.textContent = currentTime.count;
            currentTime.count--;
        }
        else if (currentTime.count <= 0) {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            runTimeOut();
        }
    }, 1000);
};

var runQuizCard = function() {

    removeCard();

    var currentCard = quizCardArray.shift();

    if (!currentCard) {
        score = currentTime.count;
        endMessage();
    }
    else {
        quizCardHandler(currentCard);
    };
};

var quizCardHandler = function(card) {

    var wrongAns = card.wrongAnswers;
    var rightAns = card.rightAnswer;

    var newCard = document.createElement("article");
    newCard.className = "card";

    var cardQuestion = document.createElement("h4");
    cardQuestion.textContent = card.question;
    newCard.appendChild(cardQuestion);

    var ansList = document.createElement("ul");
    ansList.className = "quiz-answers";
    var allAnswers = [];

    for (var i = 0; i < wrongAns.length; i++) {

        var wrongAnswerEl = document.createElement("li");
        wrongAnswerEl.className = "list-answer";
        var wrongAnswerBtn = document.createElement("button");
        wrongAnswerBtn.setAttribute("data-answer", 0);
        wrongAnswerBtn.className = "answer-btn";
        wrongAnswerBtn.textContent = wrongAns[i];
        wrongAnswerEl.appendChild(wrongAnswerBtn);

        allAnswers.push(wrongAnswerEl);
    };

    var rightAnswerEl = document.createElement("li");
    rightAnswerEl.className = "list-answer";
    var rightAnswerBtn = document.createElement("button");
    rightAnswerBtn.setAttribute("data-answer", 1);
    rightAnswerBtn.className = "answer-btn";
    rightAnswerBtn.textContent = rightAns;
    rightAnswerEl.appendChild(rightAnswerBtn);

    allAnswers.push(rightAnswerEl);
    shuffleArray(allAnswers);

    for (var i = 0; i < allAnswers.length; i++) {
        var answerEl = allAnswers[i];
        ansList.appendChild(answerEl);
    };

    newCard.appendChild(ansList);
    displayEl.appendChild(newCard);
};

var endMessage = function() {
    currentTime.clear = true;

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>You answered all of the cards! <br />Let's see how you did...</p>";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "end-btn");
    msgBtn.textContent = "See Score";

    newMsg.appendChild(msgBtn);
    displayEl.appendChild(newMsg);
    displayEl.addEventListener("click", function(event) {
        if (event.target.matches("#end-btn")) {
            displayScore();
        }
    });
};

var runTimeOut = function() {
    removeCard();
    window.alert("Opps, you ran out of time!");
};

var displayScore = function() {

    removeCard();

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Score: " + score + "<br /> Correct answers: " + correctAnswers + "</p>";

    displayEl.appendChild(newMsg);

    // var msgBtn = document.createElement("button");
    // msgBtn.className = "btn";
    // msgBtn.setAttribute("id", "end-btn");
    // msgBtn.textContent = "See Score";
};

// Global event listeners
displayEl.addEventListener("click", function(event) {
    if (event.target.matches("#begin-btn")) {
        startMessage();
    }
});

displayEl.addEventListener("click", function(event) {
    var target = event.target;
    if (target.matches(".answer-btn")) {

        var responseId = target.getAttribute("data-answer");
        parseInt(responseId);
        var responseText = target.textContent;

        if (responseId == 1) {
            console.log(responseText + " is correct!");
            correctAnswers++;
        }
        else if (responseId == 0) {
            console.log("Sorry, " + responseText + " is incorrect.");
            currentTime.count -= 5;
        }

        runQuizCard();
    }
});