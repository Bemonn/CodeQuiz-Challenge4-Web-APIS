document.getElementById("quizButton").addEventListener("click", startQuiz);
document.getElementById("highScoresButton").addEventListener("click", showHighScores);

var score = 0;
var timeRemaining = 40;
var timerInterval;
//quiz questions
var questions = [
    { 
        question: "Commonly used data types DO NOT INCLUDE:", 
        options: ["Strings", "Boolean", "Alerts", "Numbers"], 
        answer: "Boolean" 
    },
    { 
        question: "How many options can a Boolean have?", 
        options: ["1", "2", "3", "4"], 
        answer: "2" 
    },
    { 
        question: "The condition in an if / else statement is enclosed with ____.", 
        options: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 
        answer: "Parentheses" 
    },
    { 
        question: "Arrays in JavaScript can be used to store ____.", 
        options: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"], 
        answer: "All of the above" 
    },
    { 
        question: "String values must be enclosed within ____ when being assigned to variables.", 
        options: ["Commas", "Curly brackets", "Quotes", "Parentheses"], 
        answer: "Quotes" 
    },
    { 
        question: "What is a useful tool for following code/debugging?", 
        options: ["CSS", "Terminal.Bash", "For loops", "console.log"],
        answer: "console.log"
}
];
var currentQuestionIndex = 0;

//function to start the quiz
function startQuiz() {
    document.getElementById("startQuizParagraph").style.display = "none";
    document.getElementById("quizButton").style.display = "none";
    timeLeft = 40;
    document.getElementById("timer").textContent = timeLeft;
    startTimer();
    loadQuestion();
}

//function to start timer
function startTimer() {
    var timerElement = document.getElementById("timer");
    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

function clearQuizContainer() {
    var quizContainer = document.getElementById("quizContainer");
    while (quizContainer.firstChild) {
        quizContainer.removeChild(quizContainer.firstChild);
    }
}

//add answers/questions to the page
function loadQuestion() {
    clearQuizContainer();
    var quizContainer = document.getElementById("quizContainer");
    var question = questions[currentQuestionIndex].question;
    var options = questions[currentQuestionIndex].options;
    
    var questionElement = document.createElement("p");
    questionElement.textContent = question;
    quizContainer.appendChild(questionElement);
    
    for (var i = 0; i < options.length; i++) {
        var optionElement = document.createElement("button");
        optionElement.textContent = options[i];
        optionElement.classList.add('answer-button');
        optionElement.addEventListener("click", checkAnswer);
        quizContainer.appendChild(optionElement);
      }
}

//function to check answers and give correct/incorrect dependant on answer
function checkAnswer(event) {
    var resultElement = document.createElement("p");
    if (event.target.textContent === questions[currentQuestionIndex].answer) {
        score += 10;
        resultElement.textContent = "Correct!";
    } else {
        score -= 5;
        timeLeft -= 5;
        resultElement.textContent = "Incorrect!";
    }
    document.getElementById("quizContainer").appendChild(resultElement);

    currentQuestionIndex++;
    
    if(currentQuestionIndex < questions.length && timeRemaining > 0){
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(showScore, 1000);
    }
}

//functions to show quiz score and restart quiz
function showScore() {
    clearInterval(timerInterval);
    clearQuizContainer();
    document.getElementById("timer").textContent = "Time: " + timeLeft;
    var quizContainer = document.getElementById("quizContainer");
    var scoreElement = document.createElement("p");
    scoreElement.textContent = "Your final score is: " + score;
    quizContainer.appendChild(scoreElement);

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("placeholder", "Your initials");
    initialsInput.id = "initials";
    quizContainer.appendChild(initialsInput);

    var submitScoreButton = document.createElement("button");
    submitScoreButton.textContent = "Submit Score";
    submitScoreButton.addEventListener("click", saveHighScore);
    quizContainer.appendChild(submitScoreButton);

    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go back";
    goBackButton.addEventListener("click", restartQuiz);
    quizContainer.appendChild(goBackButton);
}

function saveHighScore() {
    var initials = document.getElementById("initials").value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = {
        score: score,
        initials: initials
    };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

function showHighScores() {
    var backButtonExists = document.getElementById("goBackButton") !== null;
    if (backButtonExists) {
        return;
    }
    
    clearQuizContainer();
    document.getElementById("highScoresButton").style.display = "block";
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var quizContainer = document.getElementById("quizContainer");

    highScores.forEach(function(score) {
        var p = document.createElement("p");
        p.textContent = score.initials + ": " + score.score;
        quizContainer.appendChild(p);
    });

    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go back";
    goBackButton.id = "goBackButton";
    goBackButton.addEventListener("click", restartQuiz);
    quizContainer.appendChild(goBackButton);
}
//functions to show quiz score and restart quiz END

//function to restart the quiz when completed or when time runs out
function restartQuiz() {
    clearQuizContainer();
    score = 0;
    timeLeft = 40;
    currentQuestionIndex = 0;
    document.getElementById("timer").textContent = "Time: " + timeLeft;
    var quizContainer = document.getElementById("quizContainer");
    var startQuizParagraph = document.createElement("p");
    startQuizParagraph.textContent = "Answer the following JavaScript related questions, every time you get a question right you will given 10 points and if you answer a question wrong you get 5 points deducted and 5 seconds taken off the clock.";
    startQuizParagraph.id = "startQuizParagraph";
    quizContainer.appendChild(startQuizParagraph);
    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Start Quiz";
    startQuizButton.id = "quizButton";
    startQuizButton.addEventListener("click", startQuiz);
    quizContainer.appendChild(startQuizButton);
}