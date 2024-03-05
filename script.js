$(document).ready(function () {
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var numRange = 10;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);

    if (score > highScore) {
      highScore = score;
      $("#high-score").text(highScore);
    }
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1, num2;
    var operation = Math.random() < 0.5 ? "+" : "*";

    if (operation === "+") {
      num1 = randomNumberGenerator(numRange); 
      num2 = randomNumberGenerator(numRange); 
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
    } else {
      num1 = randomNumberGenerator(numRange); 
      num2 = randomNumberGenerator(numRange); 
      question.answer = num1 * num2;
      question.equation = String(num1) + " * " + String(num2);
    }

    return question;
  };


  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $("#user-input").on("keyup", function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();

  function updateRange() {
        var range = Number($("#number-range").val());
        if (range > 0 && range < 50) {
            renderNewQuestion();
        }
    }
  
  $("#number-range").on("change", function() {
      numRange = $(this).val() || 10;
      updateRange(); 
  });
  $("#update-range-btn").on("click", function() {
      updateRange();
  });
  return numRange

});
