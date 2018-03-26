window.onload = function () {
  $("#startButton").click(triviaGame.startGame);
  $("#startOverBtn").click(triviaGame.restartGame);
  $(".gameBtn").click(triviaGame.buttonProcess);

};


let questionArray = [{
    "question": "About how many species of spiders are known?",
    "answers": [{
        "answer": "3,000",
        "correct": "false"
      },
      {
        "answer": "18,000",
        "correct": "false"
      },
      {
        "answer": "38,000",
        "correct": "true",
        "image": "assets/images/species.jpg"
      },
      {
        "answer": "59,000",
        "correct": "false"
      }
    ]
  },

  {
    "question": "What is the color of spider blood?",
    "answers": [{
        "answer": "Blue",
        "correct": "true",
        "image": "assets/images/blueblood.jpg"
      },
      {
        "answer": "Green",
        "correct": "false"
      },
      {
        "answer": "Red",
        "correct": "false"
      },
      {
        "answer": "Yellow",
        "correct": "false"
      }
    ]
  },
  {
    "question": "The worlds largest spider is the goliath spider. How wide can it get?",
    "answers": [{
        "answer": "5 in.",
        "correct": "false"
      },
      {
        "answer": "8 in.",
        "correct": "false"
      },
      {
        "answer": "11 in.",
        "correct": "true",
        "image": "assets/images/goliath.jpg"
      },
      {
        "answer": "14 in.",
        "correct": "false"
      }
    ]
  },
  {
    "question": "In what year did Spiderman first appear in comic books?",
    "answers": [{
        "answer": "1959",
        "correct": "false"
      },
      {
        "answer": "1962",
        "correct": "true",
        "image": "assets/images/spiderman.jpg"
      },
      {
        "answer": "1966",
        "correct": "false"
      },
      {
        "answer": "1971",
        "correct": "false"
      }
    ]
  },
  {
    "question": "In the book Charlottes Web, who did Charlotte save?",
    "answers": [{
        "answer": "Danny boy",
        "correct": "false"
      },
      {
        "answer": "Wilbur the pig",
        "correct": "true",
        "image": "assets/images/wilbur.jpg"
      },
      {
        "answer": "Larry the goose",
        "correct": "false"
      },
      {
        "answer": "Mr. Web",
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



let defaultSeconds = "30";
let defaultTimeout = 5000;
let seconds = "0";
let clockRunning = false;
let questionIndex = 0;
let correctAnswer = "";
let image = "";
let wins = 0;
let losses = 0;
let unanswered = 0;


let triviaGame = {

  startGame: function () {
    $('#start').hide();
    $('#gameOver').hide();
    $('#game').show();
    $('#responseBox').hide();
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
        image = questionArray[i]["answers"][j]["image"];
      }
    });

    $('#responseBox').hide();
    $('#qaBox').show();
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

      triviaGame.responseImage();
      timerId = setTimeout(triviaGame.processQuestion, defaultTimeout);

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

    if (clockRunning) {
      clearInterval(intervalId);
      clockRunning = false;

      if (this.attributes["2"].ownerElement.innerText === correctAnswer) {
        $("#question").text("Correct Answer");
        wins++;
      } else {
        $("#question").text("Wrong. The answer is: " + correctAnswer);
        losses++;
      }
      triviaGame.responseImage();
      timerId = setTimeout(triviaGame.processQuestion, defaultTimeout);
    }
  },


  endGame: function () {

    $("#correctAnswers").text(wins);
    $("#incorrectAnswers").text(losses);
    $("#unanswered").text(unanswered);

    $('#game').hide();
    $('#gameOver').show();

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

  responseImage: function () {

    $("#imageBox").html('<image src="' + image + '">')

    $('#qaBox').hide();
    $('#responseBox').show();

  },

  // Thanks to Graham McNicoll for the spiders
  // https://github.com/Auz
  // https://github.com/Auz/Bug

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