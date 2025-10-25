
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "my favourtie show?",
    answers: [
      { text: "b99", correct: true },
      { text: "suits", correct: false },
      { text: "peaky blinders", correct: false },
      { text: "lucifer", correct: false },
    ],
  },
  {
    question: "my favourite food?",
    answers: [
      { text: "aloo ka paratha", correct: false },
      { text: "pav bhaji", correct: false },
      { text: "maggiee", correct: false },
      { text: "chole bathure", correct: true },
    ],
  },
  {
    question: "whats my height?",
    answers: [
      { text: "5'6", correct: false },
      { text: "5'8", correct: false },
      { text: "5'11", correct: false },
      { text: "5'10", correct: true },
    ],
  },
  {
    question: "my favourite programming language?",
    answers: [
      { text: "java", correct: false },
      { text: "python", correct: false },
      { text: "none", correct: true },
      { text: "js", correct: false },
    ],
  },
  {
    question: "my favourite sport",
    answers: [
      { text: "swimming", correct: false },
      { text: "table tennis", correct: true },
      { text: "football", correct: false },
      { text: "basketball", correct: false },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "perfect!! crazy!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "great job!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "good work!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "okayish!";
  } else {
    resultMessage.textContent = "loser!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}