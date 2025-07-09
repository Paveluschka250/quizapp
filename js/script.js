let current = 0

function init() {
    document.getElementById('questions-length').innerHTML = quiz.length;
    document.getElementById('questions-number').innerHTML = current + 1;
    showQuiz()
}

function showQuiz() {
    let quizNumber = quiz[current];
    document.getElementById('picture').src = quizNumber.picture;
    document.getElementById('question').innerHTML = quizNumber.question;
    document.getElementById('answer-1').innerHTML = quizNumber.answers[0];
    document.getElementById('answer-2').innerHTML = quizNumber.answers[1];
    document.getElementById('answer-3').innerHTML = quizNumber.answers[2];
    document.getElementById('answer-4').innerHTML = quizNumber.answers[3];
}