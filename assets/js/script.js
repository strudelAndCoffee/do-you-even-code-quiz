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
var highScoreSelect = document.querySelector("#high-scores-view");
var cardDisplayEl = document.querySelector(".display");
var timerEl = document.querySelector("#timer");
var currentTime = {
    count: 60,
    clear: false,
    reset: function() {
        this.count = 60;
        this.clear = false;
    },
};
var correctAnswers = 0;
var score = 0;

// quiz card message objects
var card1 = {
    question: "Commonly used data types DO NOT include:",
    wrongAnswers: ["strings", "booleans", "numbers"],
    rightAnswer: "alerts",
};
var card1 = {
    question: "A ____ is used when selecting an 'id' in a CSS style sheet",
    wrongAnswers: ["$", ".", "@"],
    rightAnswer: "#",
};
var card2 = {
    question: "The condition in an if / else statement is enclosed within ____.",
    wrongAnswers: ["quotes ''", "curly brackets {}", "square brackets []"],
    rightAnswer: "parantheses ()",
};
var card3 = {
    question: "Arrays in JavaScript can be used to store ____.",
    wrongAnswers: ["numbers and strings", "other arrays", "booleans"],
    rightAnswer: "all of the above",
};
var card4 = {
    question: "The two attributes that every <img> tag should have are:",
    wrongAnswers: ["rel, href", "type, href", "name, placeholder"],
    rightAnswer: "src, alt",
};
var card5 = {
    question: "localStorage and sessionStorage store data as:",
    wrongAnswers: ["objects", "arrays", "variables"],
    rightAnswer: "key / value pairs",
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
    score = 0;
    correctAnswers = 0;
    quizCardArray = [];
    quizCardArray.push(card1, card2, card3, card4, card5);
    shuffleArray(quizCardArray);

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Answer as many questions as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. Good Luck!</p>";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "start-btn");
    msgBtn.textContent = "Got It";

    newMsg.appendChild(msgBtn);
    cardDisplayEl.appendChild(newMsg);
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

    var ansList = document.createElement("div");
    ansList.className = "quiz-answers";
    var allAnswers = [];

    for (var i = 0; i < wrongAns.length; i++) {

        var wrongAnswerEl = document.createElement("p");
        wrongAnswerEl.className = "list-answer";
        var wrongAnswerBtn = document.createElement("button");
        wrongAnswerBtn.setAttribute("data-answer", 0);
        wrongAnswerBtn.className = "answer-btn";
        wrongAnswerBtn.textContent = wrongAns[i];
        wrongAnswerEl.appendChild(wrongAnswerBtn);

        allAnswers.push(wrongAnswerEl);
    };

    var rightAnswerEl = document.createElement("p");
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
    cardDisplayEl.appendChild(newCard);
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
    cardDisplayEl.appendChild(newMsg);
    cardDisplayEl.addEventListener("click", function(event) {
        if (event.target.matches("#end-btn")) {
            setTimeout(showScore, 100);
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
    cardDisplayEl.appendChild(newMsg);
    cardDisplayEl.addEventListener("click", function(event) {
        if (event.target.matches("#timeout-btn")) {
            showScore();
        }
    });
};

var showScore = function() {

    removeCard();

    var formEl = document.createElement("article");
    formEl.className = "card";
    var highScore = localStorage.getItem("high-score");
    highScore = JSON.parse(highScore);

    if (!highScore || highScore[1] <= score) {
        formEl.innerHTML = "<p>You set a new high score! <br />Enter your name to save your score.</p>";

        var yourScore = document.createElement("p");
        yourScore.className = "border";
        yourScore.textContent = "Your Score: " + score;
        formEl.appendChild(yourScore);

        var yourAnswers = document.createElement("p");
        yourAnswers.textContent = "Correct answers: " + correctAnswers;
        yourAnswers.className = "border";
        formEl.appendChild(yourAnswers);

        var nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "Name");
        nameInput.setAttribute("id", "name-input");
        formEl.appendChild(nameInput);

        var nameSubmit = document.createElement("button");
        nameSubmit.setAttribute("id", "name-submit");
        nameSubmit.textContent = "Submit";
        formEl.appendChild(nameSubmit);

        cardDisplayEl.appendChild(formEl);
        formEl.addEventListener("click", setHighScore);
    }
    else if (highScore[1] > score) {
        var formMsg = document.createElement("p");
        formMsg.textContent = "You did not break the current high score.";
        formEl.appendChild(formMsg);

        var highScoreToBeat = document.createElement("p");
        var value = highScore[1].toString();
        highScoreToBeat.className = "border";
        highScoreToBeat.textContent = "Current high score: " + value;
        formEl.appendChild(highScoreToBeat);

        var yourScore = document.createElement("p");
        yourScore.className = "border";
        yourScore.textContent = "Your Score: " + score;
        formEl.appendChild(yourScore);

        var yourAnswers = document.createElement("p");
        yourAnswers.className = "border";
        yourAnswers.textContent = "Correct answers: " + correctAnswers;
        formEl.appendChild(yourAnswers);

        var prompt = document.createElement("p");
        prompt.textContent = "Would you like to try again?";
        formEl.appendChild(prompt);
        var promptBtnRst = document.createElement("button");
        promptBtnRst.className = "btn";
        promptBtnRst.setAttribute("id", "restart-btn");
        promptBtnRst.textContent = "Restart Quiz";
        formEl.appendChild(promptBtnRst);
        var promptBtnQuit = document.createElement("button");
        promptBtnQuit.className = "btn";
        promptBtnQuit.setAttribute("id", "quit-btn");
        promptBtnQuit.textContent = "Quit";
        formEl.appendChild(promptBtnQuit);

        cardDisplayEl.appendChild(formEl);
        formEl.addEventListener("click", function(event) {
            var target = event.target;
    
            if (target.matches("#restart-btn")) {
                startMessage();
            }
            else if (target.matches("#quit-btn")) {
                removeCard();
            }
        });
    }
};

var setHighScore = function(event) {
    
    var target = event.target;
    
    if (target.matches("#name-submit")) {
        var nameInput = document.querySelector("input[id='name-input']").value;
        if (!nameInput) {
            window.alert("Please enter your name to save your score.");
            return false;
        }
        else {
            nameInput.toString();
            score.toString();
            var highScoreArray = [nameInput, score];
            localStorage.setItem("high-score", JSON.stringify(highScoreArray));
            retryOrQuit();
        }
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
    cardDisplayEl.appendChild(newMsg);

    cardDisplayEl.addEventListener("click", function(event) {
        var target = event.target;

        if (target.matches("#restart-btn")) {
            startMessage();
        }
        else if (target.matches("#quit-btn")) {
            removeCard();
        }
    });
};

var displayHighScore = function(event) {
    target = event.target;
    var currentHighScore = localStorage.getItem("high-score");
    var scoreDisplayEl = document.querySelector("#high-score-display");
    
    if (target.matches("#high-scores-view")) {

        var displayStatus = scoreDisplayEl.textContent;

        if (!displayStatus) {
            if (!currentHighScore) {
                scoreDisplayEl.textContent = "No high score yet...";
                return false;
            }
            else {
                var hsArray = JSON.parse(currentHighScore);
                var name = hsArray[0];
                var score = hsArray[1];
                scoreDisplayEl.textContent = "[ " + name + ": " + score + " ]";
            }
        }
        else {
            scoreDisplayEl.textContent = "";
        }
    }
};

// Global event listeners
// initial message card with begin button
cardDisplayEl.addEventListener("click", function(event) {
    if (event.target.matches("#begin-btn")) {
        startMessage();
    }
});

// first message card with "got it" button
cardDisplayEl.addEventListener("click", function(event) {
    if (event.target.matches("#start-btn")) {
        startTimer();
        runQuizCard();
    }
});

// quiz card answer buttons
cardDisplayEl.addEventListener("click", function(event) {
    var target = event.target;
    if (target.matches(".answer-btn")) {

        var responseId = target.getAttribute("data-answer");
        parseInt(responseId);
        var responseText = target.textContent;

        if (responseId == 1) {
            console.log(responseText + " is correct!");
            target.setAttribute("style", "background-color:green; color:white;");
            correctAnswers++;
        }
        else if (responseId == 0) {
            console.log("Sorry, " + responseText + " is incorrect.");
            target.setAttribute("style", "background-color:orange;");
            currentTime.count -= 7;
        }
        setTimeout(runQuizCard, 600);
    }
});

// view high scores select
highScoreSelect.addEventListener("click", displayHighScore);