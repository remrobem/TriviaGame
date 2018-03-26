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


// global variables
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

// main game object
let triviaGame = {

  // start the game when start or start over buttons selected 
  startGame: function () {
    $('#start').hide();
    $('#gameOver').hide();
    $('#game').show();
    $('#responseBox').hide();

    triviaGame.spiders();
    triviaGame.processQuestion();

  },

  // display the questions and set timer waiting for reponse
  processQuestion: function () {

    if (questionIndex < questionArray.length) {
      clockRunning = true;
      seconds = defaultSeconds;
      // call count one time initially so no gap in timer
      triviaGame.count();
      intervalId = setInterval(triviaGame.count, 1000);
      // display the question and then use function to display answers
      $("#question").text(questionArray[questionIndex]["question"]);
      triviaGame.displayAnswers(questionIndex);

      questionIndex++;
    } else {
      //end game when no more questions
      triviaGame.endGame();
    }

  },

  // display the answers for the question
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

  // executed by the setinterval for player to respond to question
  // if it times out, the correct answer is displayed and nest question presented
  count: function () {
    // seconds--;
    // make sure seconds displays 2 digits
    seconds = seconds.toString().padStart(2, "0");

    // set text color to green/yellow/red based on time remaining
    triviaGame.timeWarning(seconds);

    // display the seconds remaining
    $('#seconds').text(seconds);

    // when time ends, display out of time information
    if (seconds === "00") {
      unanswered++;
      clearInterval(intervalId);
      clockRunning = false;

      $("#question").text("Out of time. The answer is: " + correctAnswer);

      triviaGame.responseImage();
      timerId = setTimeout(triviaGame.processQuestion, defaultTimeout);

    };

    seconds--;
  },

  // sets coloe of the time remaining message
  timeWarning: function (seconds) {

    if (seconds < 10) {
      $("#timeRemaining").css('color', 'red');
    } else if (seconds < 20) {
      $("#timeRemaining").css('color', 'yellow');
    } else {
      $("#timeRemaining").css('color', 'green');
    }

  },

  // check the answer selected and respond based on right/wrong.
  // then set timer before proceeding to nest question
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

  // executed when all questons have been processed.
  // display game results
  endGame: function () {

    $("#correctAnswers").text(wins);
    $("#incorrectAnswers").text(losses);
    $("#unanswered").text(unanswered);

    $('#game').hide();
    $('#gameOver').show();

  },

  // executed when Start Over button selected at end of game
  // resets global variables and executes startGame
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

  // display image associated with the question 
  // executed after questions answered right/wrong or time out
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