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
var quizCardEl = document.querySelector(".display");

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

        timeInterval();
    }
};

var runQuiz = function() {

}

quizCardEl.addEventListener("click", startTimer);