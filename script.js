const startButton = document.getElementById('startbtn')
const nextButton = document.getElementById('nextbtn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionTemplateElement = document.getElementById('question-template')
const answerButtonsElement = document.getElementById('answer-buttons')
const footerElement = document.getElementById('ftr')
const scoreEl = document.getElementById("score")
const gameOverEl = document.getElementById("gameover")
const saveButton = document.getElementById("save")
const highScoreList = document.getElementById("highscorelist")
const highScoreContainer = document.getElementById("highscore")
const highScoreLink = document.getElementById("view-high-score-link")
const clearHSButton = document.getElementById("clearhighscoresbtn")
const initialTime = 75;
const highScoreListStorageKey = "highScoreList"
var timeEl = document.getElementById("timer")
var secondsLeft = initialTime;
var score = 0;
var highScoreListing = [];


let shuffledQuestions, currentQuestionIndex, timerInterval

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)
highScoreLink.addEventListener('click', renderHighScoreListing)

function startGame () {
    console.log('Started')
    startButton.classList.add('hide')
    gameOverEl.classList.add('hide')
    highScoreContainer.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')

    secondsLeft = initialTime;
    score = 0

    setTime()
    setNextQuestion()
}

function nextQuestion () {
    currentQuestionIndex++
    setNextQuestion()
}

function setTime() {
    var timerInterval = setInterval(function() {
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            sendMessage();
            return;
        }
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining";

    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "Out of Time!";
    gameOver()
}

function setNextQuestion() {
    resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showRestartButton() {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
}

function gameOver() {
    showRestartButton()

    questionContainerElement.classList.add('hide')
    gameOverEl.classList.remove('hide')
    saveButton.classList.remove('hide')

    scoreEl.textContent = "Your Final score is " + score;
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {

    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.classList.add('m1')
    button.addEventListener('click', selectAnswer)

    if (answer.correct) {
        button.dataset.correct = answer.correct
        localStorage.setItem("score", score)
    }

    answerButtonsElement.appendChild(button)
  })
}

answerButtonsElement.addEventListener('click', selectAnswer); //moved outside of showquestion function; possible fix for timer decrement expectation

function resetState () { 
    nextButton.classList.add('hide')
    answerButtonsElement.innerHTML = '';
}

function selectAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  e.stopPropagation();

  if(correct) {
    score += 1;
    secondsLeft += 1;
  } else {
    secondsLeft -= 10;
  }
  showCorrectOrWrong(correct)

  Array.from(answerButtonsElement.children).forEach(button => {
  if (button.dataset.correct) {
      button.classList.add('correct')
    } else {
      button.classList.add('wrong')
    }
  })

  nextButton.classList.remove('hide')
  if(shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
    nextButton.classList.add('hide')
    secondsLeft = 0;
    gameOver();
    return;
  }

  nextQuestion()
  }

function showCorrectOrWrong(isCorrect) {
    footerElement.classList.remove('correct');
    footerElement.classList.remove('wrong');

    if (isCorrect) {
        footerElement.innerText = "Correct!";
        footerElement.classList.add('correct');
    } else {
        footerElement.innerText = "WRONG!";
        footerElement.classList.add('wrong');
    }
}

const questions = [
    {
        question: 'What is the syntax for comparing both values and types in JavaScript?',
        answers: [
            { text: "===", correct: true },
            { text: "==", correct: false },
            { text: "!==", correct: false },
            { text: "==!", correct: false },
            
        ]
    },
    {
        question: 'Which of the following is not a primitive type?',
        answers: [
            { text: "Undefined", correct: false },
            { text: "Object", correct: true },
            { text: "Boolean", correct: false },
            { text: "String", correct: false },
            
        ]
    },
    {
        question: 'What does BOM stand for?',
        answers: [
            { text: "Browser Operating Module", correct: false },
            { text: "Browser Original Module", correct: false },
            { text: "Browser Object Model", correct: true },
            { text: "Browser Operating Model", correct: false },
            
        ]
    },
    {
        question: 'Which method does not use the browser window object?',
        answers: [
            { text: "reload()", correct: true },
            { text: "alert()", correct: false },
            { text: "open()", correct: false },
            { text: "prompt()", correct: false },
            
        ]
    },
    {
        question: 'Which primitive type relates to comparisons equaling TRUE or FALSE?',
        answers: [
            { text: "Logic", correct: false },
            { text: "Number", correct: false },
            { text: "Symbol", correct: false },
            { text: "Boolean", correct: true },
            
        ]
    },
    {
        question: 'What symbols are used to encapsulate function code in JavaScript?',
        answers: [
            { text: "{}", correct: true },
            { text: "[]", correct: false },
            { text: "//", correct: false},
            { text: "()", correct: false},
            
        ]
    },
    {
        question: 'What company developed JavaScript?',
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Netscape", correct: true },
            { text: "Mozilla", correct: false },
            
        ]
    },
    {
        question: 'What keywords cannot declare an object in JavaScript?',
        answers: [
            { text: "State", correct: true },
            { text: "Let", correct: false },
            { text: "Var", correct: false},
            { text: "Const", correct: false},
            
        ]
    },
    {
        question: 'What symbol(s) is/are used for comments in JavaScript?',
        answers: [
            { text: "<--*", correct: false },
            { text: "//", correct: true },
            { text: "||", correct: false },
            { text: "\\", correct: false },
            
        ]
    },
    {
        question: 'Which is not a looping structure in JavaScript?',
        answers: [
            { text: "While", correct: false },
            { text: "Do-while", correct: false },
            { text: "For", correct: false },
            { text: "Loop", correct: true },
            
        ]
    }
]

saveButton.addEventListener("click", function(event) { 
    event.preventDefault();
    var highScore = {
        initials: initial.value, 
        score: score
    };
    highScoreListing.push(highScore)

    highScoreListing.sort(function(a, b) {
        var keyA = a.score
        var keyB = b.score

        if (keyA > keyB) return -1;
        if (keyB > keyA) return 1;
        return 0;
    });

    localStorage.setItem(highScoreListStorageKey, JSON.stringify(highScoreListing));
    renderHighScoreListing();
});

function renderHighScoreListing() {
    clearInterval(timerInterval);

    highScoreList.innerHTML = "";
    for (var i = 0; i < highScoreListing.length; i++) {
        var highScoreElem = highScoreListing[i];

        var li = document.createElement("li");
        li.textContent = highScoreElem.initials + " - " + highScoreElem.score;
        li.setAttribute("data-index", i);

        highScoreList.appendChild(li);
    }
    questionContainerElement.classList.add('hide')
    gameOverEl.classList.add('hide')
    highScoreContainer.classList.remove('hide')
    clearHSButton.classList.remove('hide')
    showRestartButton()
}

function init() {
    var storedHighScoreList = JSON.parse(localStorage.getItem(highScoreListStorageKey));
    if (storedHighScoreList !==null) {
        highScoreList = storedHighScoreList;
    }
}

init()