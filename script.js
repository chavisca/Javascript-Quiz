const startButton = document.getElementById('startbtn')
const nextButton = document.getElementById('nextbtn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const footerElement = document.getElementById('ftr')
const scoreEl = document.querySelector("score")
const gameOverEl = document.querySelector("gameover")
const saveButton = document.querySelector("save")
const highScoreList = document.querySelector("highscorelist")
var timeEl = document.querySelector("timer")
var secondsLeft = 75;
var score = 0;
var highScoreListing = [];


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame () {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setTime()
    setNextQuestion()
}

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + "seconds remaining";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
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

function renderMessage() {
    for (var i = 0; i < highScoreListing.length; i++) {
        var highScoreList = highScoreListing[i];

        var li = document.createElement("li");
        li.textContent = highScoreList;
        li.setAttribute("data-index", i);

        highScoreList.appendChild(li);

    }
    if (highScore !== null) {
        document.querySelector(".highscorelist").textContent = init.value + score.value
    }
}

saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    var highScore = {
        initials: init.value,
        score: score.value
    };
    highScoreListing.push(highScore);
    storeHighScoreListing();
    renderMessage();
});

function gameOver() {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    gameOverEl.classList.remove('hide')
    scoreEl.textContent = score;
    
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
        score++;
        localStorage.setItem("score", score)
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState () {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  Array.from(answerButtonsElement.children).forEach(button => {setStatusClass(button, button.dataset.correct)
  })
  nextButton.classList.remove('hide')
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
  }
  }

function setStatusClass (element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
    }

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
    element.classList.remove('ftr')
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
        question: 'What is the syntax for comparing both values and types in JavaScript?',
        answers: [
            { text: "===", correct: true },
            { text: "==", correct: false },
            { text: "!==", correct: false},
            { text: "==!", correct: false},
            
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
        question: 'What is the syntax for comparing both values and types in JavaScript?',
        answers: [
            { text: "===", correct: true },
            { text: "==", correct: false },
            { text: "!==", correct: false},
            { text: "==!", correct: false},
            
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

function init() {
    var storedHighScoreListing = JSON.parse(localStorage.getItem("highScoreListing"));
    if (storedHighScoreListing !== null) {
        highScoreListing = storedHighScoreList;
    }
}

function storeHighScoreListing() {
    localStorage.setItem("highScoreListing", JSON.stringify(highScoreListing));
}

init()