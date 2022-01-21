// Global variables and objects
// code sourced from Laurens Holst and ashleedawg at stackoverflow.com: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
};

// display elements
var highScoresSelect = document.querySelector("#high-scores-view");
var highScoresDisplay = document.querySelector("#high-scores");
var highScores = [];
var displayEl = document.querySelector(".display");
var displayStatus = displayEl.getAttribute("status");
var timerEl = document.querySelector("#timer");
var currentTime = {
    count: 30,
    clear: false,
    reset: function() {
        this.count = 30;
        this.clear = false;
    },
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
var quizCardArray = [];

// Global functions
var removeCard = function() {
    var currentCard = document.querySelector(".card");
    currentCard.remove();
}

var startMessage = function() {

    removeCard();

    currentTime.reset();
    correctAnswers = 0;
    quizCardArray = [];
    quizCardArray.push(card1, card2, card3, card4);
    shuffleArray(quizCardArray);

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Answer as many questions correctly as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. <br />Good Luck!</p>";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "start-btn");
    msgBtn.textContent = "Got It";

    newMsg.appendChild(msgBtn);
    displayEl.appendChild(newMsg);
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
    if (quizCardArray.length == 0) {
        score = currentTime.count;
        endMessage();
    }
    else {
        quizCardHandler(quizCardArray.shift());
    };
};

var quizCardHandler = function(card) {

    removeCard();

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

    removeCard();
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

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Oops, you ran out of time!</p>";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "timeout-btn");
    msgBtn.textContent = "Okay";

    newMsg.appendChild(msgBtn);
    displayEl.appendChild(newMsg);
    displayEl.addEventListener("click", function(event) {
        if (event.target.matches("#timeout-btn")) {
            retryOrQuit();
        }
    });
};

var displayScore = function() {

    removeCard();

    var formEl = document.createElement("article");
    formEl.className = "card";

    var formMsg = document.createElement("p");
    formMsg.textContent = "Enter your name to save your score!";
    formEl.appendChild(formMsg);

    var scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Your Score: " + score;
    formEl.appendChild(scoreDisplay);

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("id", "name-input");
    formEl.appendChild(nameInput);

    var nameSubmit = document.createElement("button");
    nameSubmit.setAttribute("id", "name-submit");
    nameSubmit.textContent = "Submit";
    formEl.appendChild(nameSubmit);

    displayEl.appendChild(formEl);
    formEl.addEventListener("click", setHighScore);
};

var setHighScore = function(event) {
    
    var target = event.target;
    var nameInput = document.querySelector("input[id='name-input']").value;
    var highScoreObj = {
        name: nameInput,
        score: score,
    }
    highScores.push(highScoreObj);

    if (target.matches("#name-submit")) {

        if (!nameInput) {
            window.alert("Please enter your name to save your score.");
            return false;
        }

        localStorage.setItem("", JSON.stringify(highScores));
        console.log(highScoreObj);
        retryOrQuit();
    }
};

var retryOrQuit = function() {

    removeCard();

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Would you like to try again?</p>";
    var msgBtnRst = document.createElement("button");
    msgBtnRst.className = "btn";
    msgBtnRst.setAttribute("id", "restart-btn");
    msgBtnRst.textContent = "Restart Quiz";
    var msgBtnQuit = document.createElement("button");
    msgBtnQuit.className = "btn";
    msgBtnQuit.setAttribute("id", "quit-btn");
    msgBtnQuit.textContent = "Quit";

    newMsg.appendChild(msgBtnRst);
    newMsg.appendChild(msgBtnQuit);
    displayEl.appendChild(newMsg);

    displayEl.addEventListener("click", function(event) {
        var target = event.target;

        if (target.matches("#restart-btn")) {
            startMessage();
        }
        else if (target.matches("#quit-btn")) {
            removeCard();
        }
    });
};

var displayHighScores = function(event) {
    target = event.target;

    if (target.matches(".view-high-scores")) {
        var names = localStorage.getItem("name");
        var scores = localStorage.getItem("score");
        var scoresList = document.createElement("ol");
        scoresList.setAttribute("class", "scores-list");

        //var listEl = document.createElement("li");
        //listEl.innerHTML = "<p>" + names
        console.log(names + " " + scores);
    }
};

// Global event listeners
// initial message card with begin button
displayEl.addEventListener("click", function(event) {
    if (event.target.matches("#begin-btn")) {
        startMessage();
    }
});

// first message card with "got it" button
displayEl.addEventListener("click", function(event) {
    if (event.target.matches("#start-btn")) {
        startTimer();
        runQuizCard();
    }
});

// quiz card answer buttons
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

// view high scores select
highScoresSelect.addEventListener("click", displayHighScores);