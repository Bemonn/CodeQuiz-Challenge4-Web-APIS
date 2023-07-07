document.getElementById("quizButton").addEventListener("click", startQuiz);

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
    timerInterval = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeRemaining").textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    loadQuestion();
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
        timeRemaining -= 5;
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

//function to show quiz score and restart quiz
function showScore() {
    clearInterval(timerInterval);
    clearQuizContainer();
    var quizContainer = document.getElementById("quizContainer");
    var scoreElement = document.createElement("p");
    scoreElement.textContent = "Your final score is: " + score;
    quizContainer.appendChild(scoreElement);
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go back";
    goBackButton.addEventListener("click", restartQuiz);
    quizContainer.appendChild(goBackButton);
}

//function to restart the quiz when completed or when time runs out
function restartQuiz() {
    clearQuizContainer();
    score = 0;
    timeRemaining = 40;
    currentQuestionIndex = 0;
    document.getElementById("timeRemaining").textContent = timeRemaining; // Update timer display
    var quizContainer = document.getElementById("quizContainer");
    var startQuizParagraph = document.createElement("p");
    startQuizParagraph.textContent = "Start the quiz here";
    startQuizParagraph.id = "startQuizParagraph";
    quizContainer.appendChild(startQuizParagraph);
    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Start Quiz";
    startQuizButton.id = "quizButton";
    startQuizButton.addEventListener("click", startQuiz);
    quizContainer.appendChild(startQuizButton);
}