let current = 0;

function init() {
  document.getElementById("questions-length").innerHTML = quiz.length;
  document.getElementById("questions-number").innerHTML = current + 1;
  showQuiz();
}

function showQuiz() {
  let quizNumber = quiz[current];
  document.getElementById("picture").src = quizNumber.picture;
  document.getElementById("question").innerHTML = quizNumber.question;
  document.getElementById("answer-1").innerHTML = quizNumber.answers[0];
  document.getElementById("answer-2").innerHTML = quizNumber.answers[1];
  document.getElementById("answer-3").innerHTML = quizNumber.answers[2];
  document.getElementById("answer-4").innerHTML = quizNumber.answers[3];
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById(`answer-${i}`);
    btn.classList.remove("btn-correct", "btn-wrong");
    btn.disabled = false;
  }
}

function answer(number) {
  let currentQuestion = quiz[current];
  let selectedAnswer = currentQuestion.answers[number];
  let correctAnswerText = currentQuestion.correctAnswer;

  if (selectedAnswer === correctAnswerText) {
    correctAnswer(number);
  } else {
    wrongAnswer(number, correctAnswerText);
  }
}

function correctAnswer(selectedIndex) {
  document.getElementById("next-button").disabled = false;
  let result = document.getElementById("result");
  result.classList.remove("text-danger");
  result.classList.add("text-success");
  result.innerHTML = correctAnswerText();

  let btn = document.getElementById(`answer-${selectedIndex + 1}`);
  btn.classList.add("btn-correct");

  disableAllButtons();
}

function wrongAnswer(selectedIndex, correctText) {
  document.getElementById("next-button").disabled = false;
  let result = document.getElementById("result");
  result.classList.remove("text-success");
  result.classList.add("text-danger");
  result.innerHTML = wrongAnswerText();

  let wrongBtn = document.getElementById(`answer-${selectedIndex + 1}`);
  wrongBtn.classList.add("btn-wrong");

  let currentAnswers = quiz[current].answers;
  let correctIndex = currentAnswers.indexOf(correctText);
  if (correctIndex !== -1) {
    let correctBtn = document.getElementById(`answer-${correctIndex + 1}`);
    correctBtn.classList.add("btn-correct");
  }

  disableAllButtons();
}

function correctAnswerText() {
  return /*html*/ `
        deine Anwort ist richtig
    `;
}

function wrongAnswerText() {
  return /*html*/ `
        deine Antwort ist falsch
    `;
}

function disableAllButtons() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`answer-${i}`).disabled = true;
  }
}

function nextQuestion() {
  document.getElementById("next-button").disabled = true;
  current++;
  removeAllclassList();
  showQuiz();
}

function removeAllclassList() {
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById(`answer-${i}`);
    btn.classList.remove("btn-correct", "btn-wrong");
    btn.disabled = false;
  }

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.classList.remove("text-success", "text-danger");
}
