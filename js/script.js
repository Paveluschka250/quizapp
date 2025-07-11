let current = 0;
let score = 0;

function init() {
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
  document.getElementById("questions-length").innerHTML = quiz.length;
  document.getElementById("questions-number").innerHTML = current + 1;
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById(`answer-${i}`);
    btn.classList.remove("btn-correct", "btn-wrong");
    btn.disabled = false;
  }
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const percent = Math.round((current / quiz.length) * 100);

  progressBar.style.width = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", percent);
  progressBar.innerText = `${percent}%`;
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
  btn.classList.remove("btn-dark");
  btn.classList.add("btn-success");
  score++;

  disableAllButtons();
}

function wrongAnswer(selectedIndex, correctText) {
  document.getElementById("next-button").disabled = false;
  let result = document.getElementById("result");
  result.classList.remove("text-success");
  result.classList.add("text-danger");
  result.innerHTML = wrongAnswerText();

  let wrongBtn = document.getElementById(`answer-${selectedIndex + 1}`);
  wrongBtn.classList.remove("btn-dark");
  wrongBtn.classList.add("btn-danger");

  let currentAnswers = quiz[current].answers;
  let correctIndex = currentAnswers.indexOf(correctText);
  if (correctIndex !== -1) {
    let correctBtn = document.getElementById(`answer-${correctIndex + 1}`);
    correctBtn.classList.remove("btn-dark");
    correctBtn.classList.add("btn-success");
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
  current++;

  if (current >= quiz.length) {
    showEndScreen();
    return;
  }

  document.getElementById("next-button").disabled = true;
  updateProgressBar();
  removeAllclassList();
  showQuiz();
}

function removeAllclassList() {
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById(`answer-${i}`);
    btn.classList.remove("btn-success", "btn-danger");
    btn.classList.add("btn-dark");
    btn.disabled = false;
  }

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.classList.remove("text-success", "text-danger");
}

function showEndScreen() {
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("end-screen").classList.remove("d-none");

  const total = quiz.length;
  const percentage = (score / total) * 100;

  let message = "";
  if (percentage === 100) {
    message = "Perfekt! Du hast alle Fragen richtig beantwortet 🎉";
  } else if (percentage >= 70) {
    message = "Sehr gut gemacht! Du kennst dich aus 👏";
  } else if (percentage >= 40) {
    message = "Ganz okay – etwas Übung schadet nicht 😉";
  } else {
    message = "Da geht noch was... versuch's gleich nochmal! 😅";
  }

  document.getElementById(
    "end-result-text"
  ).innerHTML = `Du hast <strong>${score}</strong> von <strong>${total}</strong> Fragen richtig beantwortet.`;
  document.getElementById("end-feedback-text").innerHTML = message;
}

function resetQuiz() {
  current = 0;
  score = 0;

  // Zeige wieder das Quiz
  document.getElementById("quiz-container").classList.remove("d-none");
  document.getElementById("end-screen").classList.add("d-none");

  // Setze Anzeige zurück
  document.getElementById("next-button").disabled = true;
  document.getElementById("result").innerHTML = "";
  document
    .getElementById("result")
    .classList.remove("text-success", "text-danger");

  removeAllclassList();
  showQuiz();
}
