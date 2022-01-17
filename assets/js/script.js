var timerEl = document.querySelector("#timer");
var quizCardEl = document.querySelector(".display");

var startTimer = function (event) {
    var targetBtn = event.target;

    if (targetBtn.matches("#begin")) {
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

quizCardEl.addEventListener("click", startTimer);