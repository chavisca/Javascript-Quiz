const startButton = document.getElementById('startbtn')
const nextButton = document.getElementById('nextbtn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const footerElement = document.getElementById('ftr')
const scoreEl = document.getElementById("score")
const gameOverEl = document.getElementById("gameover")
const saveButton = document.getElementById("save")
const highScoreList = document.getElementById("highscorelist")
var timeEl = document.getElementById("timer")
var secondsLeft = 75;
var score = "";
var highScoreListing = [];


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => { //add this to select answer function to remove next button
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
        if(secondsLeft === 0) {
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

function gameOver() {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    gameOverEl.classList.remove('hide')
    scoreEl.textContent = "The Game is over! Your Final score is " + score;
    
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
    } //add else statement to detract 10 seconds from timer for incorrect answer - this may require cleaning up questions (false 1, false 2)
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

answerButtonsElement.addEventListener('click', selectAnswer); //moved outside of showquestion function; possible fix for timer decrement expectation

function resetState () {
    clearStatusClass(document.body) //remove global colorization attributes that were not implemented and add onhover css for color change rather than on click as part of next button removal stage
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild) //research what this does again
    }
}

function selectAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  Array.from(answerButtonsElement.children).forEach(button => {setStatusClass(button, button.dataset.correct) //reclass falses separately?
  })
  nextButton.classList.remove('hide')
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart the Game'
    startButton.classList.remove('hide')
    nextButton.classList.add('hide')
    secondsLeft = 0;
    gameOver();
    return;
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

saveButton.addEventListener("click", function(event) { //fix localstorage score possibly in var set
    event.preventDefault();
    var highScore = {
        initials: initial.value, //define where initial value comes from - define input field capture
        score: score.value
    };
    localStorage.setItem("highScore", JSON.stringify(highScore));
    renderMessage();
});

function renderHighScoreListing() {
    highScoreList.innerHTML = "";
    for (var i = 0; i < highScoreListing.length; i++) {
        var highScoreList = highScoreListing[i];

        var li = document.createElement("li");
        li.textContent = highScoreList;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "Complete";
        li.appendChild(button);
        highScoreList.appendChild(li);

    }
}

function init() {
    var storedHighScoreList = JSON.parse(localStorage.getItem("highScoreListing"));
    if (storedHighScoreList !==null) {
        highScoreList = storedHighScoreList;
    }
}