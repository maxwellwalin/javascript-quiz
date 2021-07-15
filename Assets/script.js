var timer = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var headerEl = document.querySelector("header");
var startBtn = document.querySelector("#startbtn");
var quizDescription = document.querySelector("p");
var h1 = document.querySelector("h1");
var answerOptionButtons = document.querySelectorAll(".answerOption");
var correctAnswer = document.querySelector("#correctAnswer");
var incorrectAnswer = document.querySelectorAll(".incorrectAnswer");
var questionCounter = 0;
var randomIndex = [Math.floor(Math.random() * 3)];
var timerInterval;
var timeLeft;
var answerOptionDisplayInterval = setInterval(function () {
    var displayTimeLeft = 3;
    displayTimeLeft--;

    if (timeLeft===0) {
    timer.textContent = "Time's up!";
    clearInterval(timerInterval);

    }
}, 1000);;
var highscoresArray = [];


var questions = ["The Javascript file is linked with the HTML using the __________ element.", "How can you select the <p> element from the HTML using Javascript?", "How can you set a 'startQuiz' function to occur when you click the 'startBtn' variable?", "How can you define variables using Javascript?"];

var answers = [["<script>","<javascript>","<scripting>","<js>"],["document.elementSelector('<p>')","document.querySelector('p')","document.getElement('p')", "html.getElement('p')"],["startBtn.event('click', 'startQuiz')","startBtn.click('startQuiz')","startBtn.addEventListener('click', startQuiz')","addEvent(startBtn, 'click', 'startQuiz'"],["var x = ","const x = ","let x =","All of the above."]];

function startQuiz(event) {
    var timeLeft = 60;
    localStorage.setItem("timeleft", JSON.stringify(timeLeft))
    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft;
        localStorage.setItem("timeleft", JSON.stringify(timeLeft))

        if (timeLeft===0) {
        timer.textContent = "Time's up!";
        clearInterval(timerInterval);

        }
    }, 1000);

    quizDescription.setAttribute("style", "display:none")
    startBtn.setAttribute("style", "display:none")
    mainEl.setAttribute("style" , "align-items: flex-start; margin: 2em 25%;")
    
    for (let i = 0; i < answerOptionButtons.length; i++) {
        answerOptionButtons[i].setAttribute("style", "display:block")
    }

    nextQuestion()
}            

function nextQuestion() {
    for (let i = 0; i < answerOptionButtons.length; i++) {
        answerOptionButtons[i].removeEventListener("click", nextQuestion)
        }
    
    h1.textContent = questions[randomIndex]
    questionCounter++

    for (let i = 0; i < answerOptionButtons.length; i++) {
        answerOptionButtons[i].textContent = answers[randomIndex][i];
        if (i == randomIndex) {
            answerOptionButtons[i].addEventListener("click", nextQuestion)
        } else {
            answerOptionButtons[i].addEventListener("click", nextQuestionIncorrect)
            }
        }
    
    randomIndex++
    if (randomIndex>3) {
        randomIndex = 0
    }
    if (questionCounter > questions.length) {
        gameOver()
    }
}

function nextQuestionIncorrect() {
    clearInterval(timerInterval);
    timeLeft = localStorage.getItem("timeleft") - 10;
    localStorage.setItem("timeleft", JSON.stringify(timeLeft))
    timer.textContent = "Timer: " + timeLeft;
    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft;
        localStorage.setItem("timeleft", JSON.stringify(timeLeft))

        if (timeLeft<=0) {
        timer.textContent = "Time's up!";
        gameOver();
        clearInterval(timerInterval);
        }
    }, 1000);
    nextQuestion()
}

function gameOver() {
    clearInterval(timerInterval);
    h1.textContent = "All Done!";
    quizDescription.textContent = "Your score is: " + localStorage.getItem("timeleft");
    quizDescription.setAttribute("style", "display:block");
    
    var submitP = document.createElement("p");
    submitP.innerHTML = "Enter initials: <textarea></textarea><button id='submit'>Submit</button>";
    mainEl.appendChild(submitP);
    document.querySelector("#submit").addEventListener("click", highscoresPage);

    for (let i = 0; i < answerOptionButtons.length; i++) {
        answerOptionButtons[i].setAttribute("style", "display:none;");
        }
}

function updateHighscores() {

}

function highscoresPage() {
    var userInitials = document.querySelector("textarea").value;

    if (userInitials == "") {
        return;
    }

    localStorage.setItem("initials", userInitials);

    headerEl.setAttribute("style", "display:none");
    h1.textContent = "Highscores";
    var submitPageContent = document.querySelectorAll("p");
    for (let i = 0; i < submitPageContent.length; i++) {
        submitPageContent[i].setAttribute("style", "display:none");
    }

    var highscoresList = document.createElement("ol");
    for (var i = 0; i < highscoresArray.length; i++) {
        var userScore = highscoresArray[i];
    
        var li = document.createElement("li");
        li.textContent = userScore;
        highscoresList.appendChild(li);
    }
    userScore = document.createElement("li");
    userScore.textContent = localStorage.getItem("initials") + " - " + localStorage.getItem("timeleft");
    highscoresList.appendChild(userScore);
    mainEl.appendChild(highscoresList);
    highscoresArray.push(userScore.textContent);
    storeHighscores();

    var highscoreButtonsContainer = document.createElement("div");
    highscoreButtonsContainer.setAttribute("id","inline");

    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("onClick", "window.location.reload();")
    goBackButton.textContent = "Go Back";
    highscoreButtonsContainer.appendChild(goBackButton);

    var clearHighscoresButton = document.createElement("button");
    clearHighscoresButton.textContent = "Clear Highscores";
    highscoreButtonsContainer.appendChild(clearHighscoresButton);
    clearHighscoresButton.addEventListener("click", function() {
        highscoresList.innerHTML = "";
        localStorage.removeItem("highscoresArray");
    })
    mainEl.appendChild(highscoreButtonsContainer);
}

function init() {
    // Get stored todos from localStorage
    var highscoresArrayStored = JSON.parse(localStorage.getItem("highscoresArray"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (highscoresArrayStored !== null) {
      highscoresArray = highscoresArrayStored;
    }

  }
  
function storeHighscores() {
    localStorage.setItem("highscoresArray", JSON.stringify(highscoresArray));
}

startBtn.addEventListener("click", startQuiz);
init();