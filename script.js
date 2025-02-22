// script.js
document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Correct answers
  const answers = {
    q1: 'Paris',
    q2: 'Mars',
  };

  // Calculate score
  let score = 0;
  const formData = new FormData(this);

  for (let [question, answer] of formData.entries()) {
    if (answer === answers[question]) {
      score++;
    }
  }

  // Display result
  const resultDiv = document.getElementById('result');
  const scoreSpan = document.getElementById('score');
  scoreSpan.textContent = `${score} / 2`;
  resultDiv.classList.remove('hidden');
});