const questionEl = document.getElementById('question');
const answerChoicesEl = document.getElementById('answer-choices');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');

let currentQuestionIndex = 0;
let questions;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion();
  });

function displayQuestion() {
  if (currentQuestionIndex === questions.length) {
   
    questionEl.textContent = 'Congratulations! You finished the quiz.';
    answerChoicesEl.innerHTML = '';
    nextBtn.style.display = 'none'; 
    feedbackEl.textContent = ''; 
  } else {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerChoicesEl.innerHTML = ''; 

    currentQuestion.choices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => handleAnswer(choice));
      answerChoicesEl.appendChild(li);
    });

    feedbackEl.textContent = '';
  }
}

function handleAnswer(selectedChoice) {
  const correctAnswer = questions[currentQuestionIndex].answer;
 
  if (currentQuestionIndex < questions.length) {
    feedbackEl.textContent = selectedChoice === correctAnswer ? 'Correct!' : 'Incorrect.';
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  displayQuestion();
  nextBtn.disabled = true; 
});
