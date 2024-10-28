"use strict";

const questions = [
  {
    question: "Who is the Richtofen that we see in BO6?",
    answers: [
      { text: "Ultimis", correct: false },
      { text: "Primis", correct: false },
      { text: "Dimension 2210", correct: true },
      { text: "Dimension 2102", correct: false },
    ],
  },

  {
    question: "Which Sentinel Artefact do we see in Voyage of Despair?",
    answers: [
      { text: "Odin", correct: true },
      { text: "Ra", correct: false },
      { text: "Danu", correct: false },
      { text: "Zeus", correct: false },
    ],
  },

  {
    question:
      "Which of these scientist where not involved in the Griffin station activities",
    answers: [
      { text: "Dr. Groph", correct: false },
      { text: "Dr. Maxis", correct: true },
      { text: "Dr. Schuster", correct: false },
      { text: "Dr. Richtofen", correct: false },
    ],
  },

  {
    question:
      "Which of these scientist belonged to Group 935 and then went to the Ascention group",
    answers: [
      { text: "Anton Gersh", correct: false },
      { text: "H Poter", correct: false },
      { text: "Yuri Zavoyski", correct: false },
      { text: "Harvey Yena", correct: true },
    ],
  },
];

const questionElement = document.querySelector(".quizQuestions");
const answerButton = document.querySelector(".quizButtonDiv");
const nextButton = document.querySelector(".nextButton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("quizButton");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
