var timer = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var headerEl = document.querySelector("header");
var startBtn = document.querySelector("#startbtn");
var quizDescription = document.querySelector("p");
var h1 = document.querySelector("h1");
var answerOptionButtons = $(".answerOption");
var correctAnswer = document.querySelector("#correctAnswer");
var incorrectAnswer = document.querySelectorAll(".incorrectAnswer");
var questionCounter = 0;
var randomIndex = [Math.floor(Math.random() * 3)];

var questions = ["The Javascript file is linked with the HTML using the __________ element.", "How can you select the <p> element from the HTML using Javascript?", "How can you define variables using Javascript?", "How can you set a 'startQuiz' function to occur when you click the 'startBtn' variable?"];

var answers = [["<javascript>","<script>","<scripting>","<js>"],["document.elementSelector('<p>')","document.getElement('p')","document.querySelector('p')", "html.getElement('p')"],["var x = ","const x = ","let x =","All of the above."],["startBtn.event('click', 'startQuiz')","startBtn.click('startQuiz')","addEvent(startBtn, 'click', 'startQuiz'","startBtn.addEventListener('click', startQuiz')"]];
console.log(answers[0][1]);

function startQuiz(event) {
    var timeLeft = 60;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft;
        if (timeLeft===0) {
        timer.textContent = "Time's up!";
        clearInterval(timeInterval);
        gameOver(0);
        }
    }, 1000);

    quizDescription.setAttribute("style", "display:none")
    startBtn.setAttribute("style", "display:none")
    mainEl.setAttribute("style","align-items: flex-start;")
    answerOptionButtons.css("display", "block")

    nextQuestion()
}            

function nextQuestion() {
    h1.textContent = questions[randomIndex]
    questionCounter++
    for (let i = 0; i < 4; i++) {
        $('#button-container').children().eq(i+1).text(answers[randomIndex][i]);
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

}

function gameOver() {
    h1.textContent = "All Done!"
    quizDescription.textContent = "Your score is: " + parseInt(timer.textContent, 10);
    quizDescription.setAttribute("style", "display:block");
    $('main').append("<p>Enter initials: <textarea></textarea></p>");
    for (let i = 0; i < questions.length; i++) {
        $('#button-container').children().eq(i+1).css("display", "none");
        }
    $('main').append("<button id=#highscoresbtn>View Highscores</button>");
}

function updateHighscores() {

}

function highscoresPage() {
    headerEl.setAttribute("style", "display:none");
}

startBtn.addEventListener("click", startQuiz);
answerOptionButtons.on("click", nextQuestion);
// incorrectAnswer.addEventListener("click", nextQuestionIncorrect);