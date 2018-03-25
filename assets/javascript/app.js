window.onload = function () {
  $("#startButton").click(triviaGame.startGame);
  $("#startOverBtn").click(triviaGame.restartGame);
  $(".gameBtn").click(triviaGame.buttonProcess);

};


let questionArray = [{
    "question": "xxxx xxxx xxxxxx xxxxxx xxxxxx",
    "answers": [{
        "answer": "aaaa aaaaaa aaaaaaa aaaaa",
        "correct": "true"
      },
      {
        "answer": "bbbbbbbbb bbbbbbbbbbb",
        "correct": "false"
      },
      {
        "answer": "cccc cccccc",
        "correct": "false"
      },
      {
        "answer": "ddddd ddddddddddddddd",
        "correct": "false"
      }
    ]
  },

  {
    "question": "yyyy yyyyyyyyyyyyyy",
    "answers": [{
        "answer": "jjjjjj j j j jj",
        "correct": "false"
      },
      {
        "answer": "kkkkkkkkkkkkkkkkkkkk",
        "correct": "true"
      },
      {
        "answer": "lllllllllllll lllllllllll",
        "correct": "false"
      },
      {
        "answer": "mmmmmmmm mmmmmm mmmmmmmmmmm",
        "correct": "false"
      }
    ]
  }
];

// console.log(questionArray[0]["question"]);
// console.log(questionArray[0]["answers"][0]["answer"]);
// console.log(questionArray[0]["answers"][0]["correct"]);
// console.log(questionArray[1]["question"]);
// console.log(questionArray[1]["answers"][0]["answer"]);
// console.log(questionArray[1]["answers"][0]["correct"]);



let defaultSeconds = "5";
let seconds = "0";
let clockRunning = false;
let questionIndex = 0;
let correctAnswer = "";
let wins = 0;
let losses = 0;
let unanswered = 0;


let triviaGame = {

  startGame: function () {
    $('#start').hide();
    $('#gameOver').hide();
    $('#game').show();
    triviaGame.spiders();
    triviaGame.processQuestion();

  },


  processQuestion: function () {



    if (questionIndex < questionArray.length) {

      $("#question").text(questionArray[questionIndex]["question"]);
      triviaGame.displayAnswers(questionIndex);
      questionIndex++;
      clockRunning = true;
      seconds = defaultSeconds;
      intervalId = setInterval(triviaGame.count, 1000);

    } else {
      triviaGame.endGame();
    }

  },

  displayAnswers: function (i) {

    questionArray[i]["answers"].forEach(function (_, j) {
      $("#button" + j).text(questionArray[i]["answers"][j]["answer"]);

      if (questionArray[i]["answers"][j]["correct"] === "true") {
        correctAnswer = questionArray[i]["answers"][j]["answer"];
      }
    });
  },

  count: function () {
    // seconds--;
    // make sure seconds displays 2 digits
    seconds = seconds.toString().padStart(2, "0");

    // set text color to green/yellow/red based on time remaining
    triviaGame.timeWarning(seconds);

    // display the seconds remaining
    $('#seconds').text(seconds);


    if (seconds === "00") {
      clearInterval(intervalId);
      clockRunning = false;
      $("#question").text("Out of time. The answer is: " + correctAnswer);
      unanswered++;

      timerId = setTimeout(triviaGame.processQuestion, 3000);

    };

    seconds--;
  },

  timeWarning: function (seconds) {

    if (seconds < 10) {
      $("#timeRemaining").css('color', 'red');
    } else if (seconds < 20) {
      $("#timeRemaining").css('color', 'yellow');
    } else {
      $("#timeRemaining").css('color', 'green');
    }

  },


  buttonProcess: function (e) {

    clearInterval(intervalId);
    clockRunning = false;
    
    if (this.attributes["2"].ownerElement.innerText === correctAnswer) {
      $("#question").text("Correct Answer");
      wins++;
    } else {
      $("#question").text("Wrong. The answer is: " + correctAnswer);
      losses++;
    }

    timerId = setTimeout(triviaGame.processQuestion, 3000);

  },


  endGame: function () {

    $("#correctAnswers").text(wins);
    $("#incorrectAnswers").text(losses);
    $("#unanswered").text(unanswered);

    $('#game').hide();
    $('#gameOver').show();
    
    // clearInterval(intervalId);
    // clearInterval(timerId);
  },


  restartGame: function () {

    seconds = "0";
    clockRunning = false;
    questionIndex = 0;
    correctAnswer = "";
    wins = 0;
    losses = 0;
    unanswered = 0;

    triviaGame.startGame();

  },



















  spiders: function () {
    var targethead = window.document.getElementsByTagName("head")[0],
      loadedSpiders = false,
      jst = window.document.createElement("script");
    jst.async = true;
    jst.type = "text/javascript";
    jst.src = "assets/javascript/bug-min.js";
    jst.onload = jst.onreadystatechange = function () {
      if (!loadedSpiders && (!this.readyState || this.readyState == 'complete')) {
        loadedSpiders = true;
        // start fire the JS.
        new SpiderController();
      }
    };
    targethead.appendChild(jst);
  },
}