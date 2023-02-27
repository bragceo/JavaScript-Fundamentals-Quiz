const containerQuestionEl = document.getElementById("question-container")
const containerStartEl = document.getElementById("starter-container")
const containerEndEl = document.getElementById("end-container")
const containerScoreEl = document.getElementById("score-banner")
const formInitials = document.getElementById("initials-form")
const containerHighScoresEl = document.getElementById("high-score-container")
const ViewHighScoreEl = document.getElementById("view-high-scores")
const listHighScoreEl = document.getElementById("high-score-list")
const correctEl = document.getElementById("correct")
const wrongEl = document.getElementById("wrong")
const banners = document.querySelectorAll(".banner")
const sections = document.querySelectorAll(".section")
//buttons
const btnStartEl = document.querySelector("#start-game")
const btnGoBackEl = document.querySelector("#go-back")
const btnClearScoresEl = document.querySelector("#clear-high-scores")
//questions/answers element
const questionEl = document.getElementById("question")
const answerbuttonsEl = document.getElementById("answer-buttons")
const timerEl = document.querySelector("#timer")
let score = 0
let timeleft
let gameover
timerEl.innerText = 0

//High Score Array
let HighScores = []

//assign array details for questions 
let arrayShuffledQuestions
let QuestionIndex = 0


// The array of questions for our quiz game.
let questions = [{
  q: "What is the result of `1 + 2`?",
  a: "3",
  choices: [
    {
      choice: "1",
    },
    {
      choice: "2",
    },
    {
      choice: "3",
    },
    {
      choice: "4",
    },
  ],
},
{
  q: "What is a boolean in JavaScript?",
  a: "A data type that represents either true or false.",
  choices: [
    {
      choice: "A method for manipulating arrays.",
    },
    {
      choice: "A variable that can hold multiple values.",
    },
    {
      choice: "A data type that represents either true or false.",
    },
    {
      choice: "A loop that executes a fixed number of times.",
    },
  ],
},
{
  q: "What is an array in JavaScript?",
  a: "An ordered collection of values.",
  choices: [
    {
      choice: "A type of function that returns a value.",
    },
    {
      choice: "A special character that separates values in a string.",
    },
    {
      choice: "An ordered collection of values.",
    },
    {
      choice: "A way to create objects in JavaScript.",
    },
  ],
},
{
  q: "What is the purpose of the `if` statement in JavaScript?",
  a: "To execute code conditionally based on a true or false value.",
  choices: [
    {
      choice: "To create a new variable.",
    },
    {
      choice: "To loop over an array.",
    },
    {
      choice: "To execute code unconditionally.",
    },
    {
      choice: "To execute code conditionally based on a true or false value.",
    },
  ],
},
{
  q: "What is the purpose of the `return` statement in JavaScript?",
  a: "To return a value from a function.",
  choices: [
    {
      choice: "To stop the execution of a loop.",
    },
    {
      choice: "To jump to a different part of the code.",
    },
    {
      choice: "To define a new variable.",
    },
    {
      choice: "To return a value from a function.",
    },
  ],
},
]



//if go back button is hit on high score page
const renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerStartEl.classList.remove("hide")
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0
  score = 0

  banners.forEach((banner) => banner.classList.add("hide"))
}

//create the timer functionality. We can use the setInterval function to decrement the time every second until it reaches 0. We can display the time remaining to the user on the page.
// every second, check if game-over is true, or if there is time left. Start time at 75. 
const setTime = function () {
  timeleft = 75

  const timercheck = setInterval(function () {
    timerEl.innerText = timeleft
    timeleft--

    if (gameover) {
      clearInterval(timercheck)
    }

    if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
    }

  }, 1000)
}

const startGame = function () {
  //add classes to show/hide start and quiz screen
  containerStartEl.classList.add('hide')
  containerQuestionEl.classList.remove('hide')
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//set next question for quiz
const setQuestion = function () {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
const resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  }
}

//display question information (including answer buttons)
const displayQuestion = function (index) {
  questionEl.innerText = index.q
  for (let i = 0; i < index.choices.length; i++) {
    let answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    answerbuttonsEl.appendChild(answerbutton)
  }
}
//display correct! on screen
const answerCorrect = function () {
  correctEl.classList.remove("hide")
  wrongEl.classList.add("hide")
}
//display wrong! on screen
const answerWrong = function () {
  wrongEl.classList.remove("hide")
  correctEl.classList.add("hide")
}

//check if answer is correct    
const answerCheck = function (event) {
  let selectedanswer = event.target
  if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
    answerCorrect()
    score = score + 7
  }

  else {
    answerWrong()
    score = score - 1
    timeleft = timeleft - 3
  }

  //go to next question, check if there is more questions
  QuestionIndex++
  if (arrayShuffledQuestions.length > QuestionIndex + 1) {
    setQuestion()
  }
  else {
    gameover = "true"
    showScore()
  }
}

//Display total score screen at end of game
const showScore = function () {
  containerQuestionEl.classList.add("hide")
  containerEndEl.classList.remove("hide")
  setTimeout(() => {
    banners.forEach((banner) => banner.classList.add("hide"))
  }, 1500);

  const scoreDisplay = document.createElement("p")
  scoreDisplay.innerText = ("Your final score is " + score + "!")
  containerScoreEl.appendChild(scoreDisplay)
}

//create high score values
const createHighScore = function (event) {
  event.preventDefault()
  let initials = document.querySelector("#initials").value
  if (!initials) {
    alert("Enter your intials!")
    return
  }

  formInitials.reset()

  let HighScore = {
    initials: initials,
    score: score
  }

  //push and sort scores
  HighScores.push(HighScore)
  HighScores.sort((a, b) => { return b.score - a.score })

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }
  //create elements in order of high scores
  for (let i = 0; i < HighScores.length; i++) {
    let highscoreEl = document.createElement("li")
    highscoreEl.className = "high-score"
    highscoreEl.textContent = `${i + 1}. ${HighScores[i].initials} - ${HighScores[i].score}`
    listHighScoreEl.appendChild(highscoreEl)
  }

  saveHighScore()
  displayHighScores()

}
//save high score
const saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

//load values/ called on page load
const loadHighScore = function () {
  let LoadedHighScores = localStorage.getItem("HighScores")
  if (!LoadedHighScores) {
    return false
  }

  LoadedHighScores = JSON.parse(LoadedHighScores)
  LoadedHighScores.sort((a, b) => { return b.score - a.score })


  for (let i = 0; i < LoadedHighScores.length; i++) {
    let highscoreEl = document.createElement("li")
    highscoreEl.ClassName = "high-score"
    highscoreEl.innerText = `${i + 1}. ` + LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score
    listHighScoreEl.appendChild(highscoreEl)

    HighScores.push(LoadedHighScores[i])

  }
}

//display high score screen from link or when intiials entered
const displayHighScores = function () {

  banners.forEach(banner => banner.classList.add("hide"))
  sections.forEach(section => section.classList.add("hide"))
  containerHighScoresEl.classList.remove("hide")
  gameover = "true"
}

//clears high scores
const clearScores = function () {
  HighScores = []

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }

  localStorage.clear(HighScores)

}

loadHighScore()

//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)