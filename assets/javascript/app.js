window.onload = function () {
  $("#startButton").click(triviaGame.startGame);


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

console.log(questionArray[0]["question"]);
console.log(questionArray[0]["answers"][0]["answer"]);
console.log(questionArray[0]["answers"][0]["correct"]);
console.log(questionArray[1]["question"]);
console.log(questionArray[1]["answers"][0]["answer"]);
console.log(questionArray[1]["answers"][0]["correct"]);

let numberOfQuestions = 2;

let defaultSeconds = "5";
let seconds = "0";
let clockRunning = false;
let questionIndex = 0;
let triviaGame = {

  startGame: function () {
    $('#start').hide();
    $('#game').show();
    triviaGame.spiders();
    triviaGame.processQuestion();

  },

  processQuestion: function () {


    // questionArray.forEach(function (_, i) {



    if (questionIndex < questionArray.length) {

      $("#question").text(questionArray[questionIndex]["question"]);

      triviaGame.buildAnswers(questionIndex);

      questionIndex++;

      if (!clockRunning) {
        seconds = defaultSeconds.toString().padStart(2, "0");
        triviaGame.timeWarning(seconds);
        $('#seconds').text(seconds);
        clockRunning = true;
        intervalId = setInterval(triviaGame.count, 1000);
      };
    } else {
      triviaGame.endGame();
    }
    // });
  },

  buildAnswers: function (i) {

    questionArray[i]["answers"].forEach(function (_, j) {
      $("#button" + j).text(questionArray[i]["answers"][j]["answer"]);
    });
  },


  count: function () {
    seconds--;
    seconds = seconds.toString().padStart(2, "0");
    triviaGame.timeWarning(seconds);
    $('#seconds').text(seconds);
    if (seconds === "00") {
      clearInterval(intervalId);
      clockRunning = false;
      $("#question").text("Out of time");
      timerId = setTimeout(triviaGame.processQuestion, 3000);

    };
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

  endGame: function () {

    $("#question").text("Game Over");

  },

  timeout: function () {

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