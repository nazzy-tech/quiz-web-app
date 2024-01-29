const questions = [
    {
        question: "HTML is the acronym of what?",
        answers: [
            { text: "HyperText Language", correct: false},
            { text: "HyperText Markup Language", correct: true},
            { text: "HyperText Markdown Language", correct: false},
            { text: "HyperText Maxup Language", correct: false},
        ]
    },
    {
        question: "CSS is the acronym of what?",
        answers: [
            {text: "Cascading Style Sheets", correct: true},
            { text: "Cascading Style Spreadsheets", correct: false},
            { text: "Cascading Source Sheets", correct: false},
            { text: "Cascading Styling Sheets", correct: false},
        ]
    },
    {
        question: "Where is the correct place to insert a Javascript?",
        answers: [
            { text: "Both the <head> section and the <body> section", correct:true},
            { text: "The <body> section", correct: false},
            { text: "The <head> section", correct: false},
            { text: "The <header> section", correct: false},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "x", correct: false},
            { text: "*", correct: false},
            { text: "-", correct: false},
            { text: "=", correct: true},
        ]
    },
    {
        question: "How to write an IF statement in Javascript?",
        answers: [
            { text: "if i = 5 then", correct: false},
            { text: "if i = 5", correct: false},
            { text: "if i == 5 then", correct: false},
            { text: "if (i == 5)", correct: true},
        ]
    },
    {
        question: "How can you detect the client's browser name?",
        answers: [
            { text: "navigator.appName", correct: true},
            { text: "browser.name", correct: false},
            { text: "client.navName", correct: false},
            { text: "nav.navName", correct: false},
        ]
    },
    {
        question: "Javascript is the same as Java?",
        answers: [
            { text: "True", correct: false},
            { text: "false", correct: true},
            { text: "NaN", correct: false},
            { text: "Nil", correct: false},
        ]
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            { text: "Math.max(x,y)", correct: true},
            { text: "top(x.y)", correct: false},
            { text: "ceil(x,y)", correct: false},
            { text: "Math.ceil(x,y)", correct: false},
        ]
    },
    {
        question: "How do you create a function in Javascript?",
        answers: [
            { text: "function myfunction()", correct: true},
            { text: "function:myfunction()", correct: false},
            { text: "function = myfunction()", correct: false},
            { text: "function: myfunction()", correct: false},
        ]
    },
    {
        question: "Is Javascript case-sensitive?",
        answers: [
            { text: "Yes", correct: true},
            { text: "No", correct: false},
            { text: "NaN", correct: false},
            { text: "Nil", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timer = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;

const quizDurationInSeconds = 300
let timeRemaining = quizDurationInSeconds;
updateTimer();


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Set the quiz duration in seconds
aquizDurationInSeconds = 300; // 5 minutes

// Display the initial timer value
updateTimer();

// Set up the timer interval
const timerInterval = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimer();
  } else {
    // Quiz time is up, you can perform actions here
    clearInterval(timerInterval); // Stop the timer
    alert("Time's up!");
  }
}, 1000); // Update every 1 second

function updateTimer() {
  // Format the time in MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Display the timer
  document.getElementById('timer').innerText = `${padZero(minutes)}: ${padZero(seconds)}`;
}

function padZero(number) {
  return (number < 10 ? '0' : '') + number;
}



function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
            
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
        
    }
    }

    function selectAnswer(e){
        const selectBtn = e.target;
        const isCorrect = selectBtn.dataset.correct == "true"
        if(isCorrect){
            selectBtn.classList.add("correct");
            score++;
        }else{
            selectBtn.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block"
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }

    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    });

startQuiz();
