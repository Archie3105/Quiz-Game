const questions = [
  {
    question: "Who is Tushar's father?",
    answers: [
      { text: "Mukesh Papa", correct: false },
      { text: "Abhishek Papa", correct: true },
      { text: "Shiva Papa", correct: false },
      { text: "Nobody", correct: false },
    ],
  },
  {
    question: "Who is Shiva's father?",
    answers: [
      { text: "Vinod Papa", correct: false },
      { text: "Abhishek Papa", correct: false },
      { text: "Tushar Papa", correct: true },
      { text: "Nobody", correct: false },
    ],
  },
  {
    question: "Who is Shiva's grandfather?",
    answers: [
      { text: "Vinod Daddu", correct: false },
      { text: "Abhishek Daddu", correct: true },
      { text: "Tushar Daddu", correct: false },
      { text: "Nobody", correct: false },
    ],
  },
  {
    question: "Who are Abhishek, Shiva & Tushar?",
    answers: [
      { text: "Kaam nikalne waale", correct: false },
      { text: "All are best friends!", correct: false },
      { text: "Haraam ka Khane waale", correct: false },
      { text: "Option 2nd & 3rd both correct", correct: true },
    ],
  },
  {
    question: "Who is powerful person in the group?",
    answers: [
      { text: "Abhishek", correct: false },
      { text: "Shiva to kuch bhi na", correct: false },
      { text: "Tushar pagal hai", correct: true },
      { text: "Saare bekkar hai", correct: false },
    ],
  },
  {
    question: "Who is Railway employee?",
    answers: [
      { text: "Shiva", correct: true },
      { text: "Abhishek", correct: false },
      { text: "Tushar", correct: false },
      { text: "MFU", correct: false },
    ],
  },
  {
    question: "Whose party is it from today?",
    answers: [
      { text: "Abhishek", correct: false },
      { text: "Tushar", correct: false },
      { text: "Shiva (1 Crore)", correct: true },
      { text: "You are not invited.", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

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
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const iscorrect = selectBtn.dataset.correct === "true";
  if (iscorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
