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
var timerEl = document.querySelector("#timer");

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
// starting message and prompt
var startMessage = function() {
    var currentMsg = document.querySelector(".card");
    currentMsg.remove();

    var newMsg = document.createElement("article");
    newMsg.className = "card";
    newMsg.innerHTML = "<p>Answer as many questions correctly as you can in 60 seconds. <br />Answering incorrectly will subtract time from the counter. <br />Good Luck!";
    var msgBtn = document.createElement("button");
    msgBtn.className = "btn";
    msgBtn.setAttribute("id", "start-btn");
    msgBtn.textContent = "Got It";

    newMsg.appendChild(msgBtn);
    displayEl.appendChild(newMsg);
    displayEl.addEventListener("click", function(event) {
        if (event.target.matches("#start-btn")) {
            runQuiz();
        }
    });
};

// displays quiz cards and cycles through after answering until time runs out
var runQuiz = function() {

    startTimer();

    for (var i = 0; i < quizCardArray.length; i++) {

        var currentCard = displayEl.querySelector(".card");
        currentCard.remove();

        var quizCardInfo = quizCardArray[i];
        var wrongAns = quizCardInfo.wrongAnswers;
        var rightAns = quizCardInfo.rightAnswer;

        var newCard = document.createElement("article");
        newCard.className = "card";
        var cardQuestion = document.createElement("h4");
        cardQuestion.textContent = quizCardInfo.question;
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
        displayEl.addEventListener("click", function(event) {
            var target = event.target;

            if (target.matches(".answer-btn")) {
                var response = target.getAttribute("data-answer");
                parseInt(response);
                
                if (response == 1) {
                    console.log("Correct!");
                    return;
                }
                else if (response == 0) {
                    console.log("Sorry, incorrect");
                    return;
                };
            }
        });
    };
};

var startTimer = function() {
    console.log("timer has started");
};

// Global event listeners
// displays starting message when "begin" button is clicked
displayEl.addEventListener("click", function(event) {
    if (event.target.matches("#begin-btn")) {
        startMessage();
    }
});