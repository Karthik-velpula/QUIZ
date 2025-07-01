const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    correct: 1
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Hypertext Markup Language",
      "Hyper Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "Home Text Markup Language"
    ],
    correct: 0
  },
  {
    question: "What year was JavaScript launched?",
    answers: ["1996", "1995", "1994", "1997"],
    correct: 1
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Microsoft", "Netscape", "Google", "Apple"],
    correct: 1
  },
  {
    question: "What does API stand for?",
    answers: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Application Process Integration",
      "Automated Programming Interface"
    ],
    correct: 0
  },
  {
    question: "Which of the following is NOT a programming language?",
    answers: ["Python", "JavaScript", "HTML", "Java"],
    correct: 2
  },
  {
    question: "What does SQL stand for?",
    answers: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query Language",
      "Sequential Query Language"
    ],
    correct: 0
  },
  {
    question: "Which protocol is used for secure web browsing?",
    answers: ["HTTP", "HTTPS", "FTP", "SMTP"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  nextBtn.style.display = "none";
  
  updateProgress();

  answerButtons.forEach((btn, index) => {
    btn.textContent = q.answers[index];
    btn.disabled = false;
    btn.className = "answer-btn";
  });
}

function getPerformanceMessage(score, total) {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return "Excellent! You're a true expert! 🌟";
  if (percentage >= 80) return "Great job! You did very well! 🎉";
  if (percentage >= 70) return "Good work! Keep it up! 👍";
  if (percentage >= 60) return "Not bad! Room for improvement! 📚";
  return "Keep studying and try again! 💪";
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  const performanceMsg = getPerformanceMessage(score, questions.length);
  
  document.getElementById("quiz").innerHTML = `
    <div class="quiz-complete">
      <div class="completion-icon">🎯</div>
      <div class="final-score">Quiz Complete!</div>
      <div class="performance-message">${performanceMsg}</div>
      <div style="font-size: 2rem; font-weight: 700; color: #667eea; margin-bottom: 20px;">
        ${score}/${questions.length} (${percentage}%)
      </div>
      <button class="restart-btn" onclick="location.reload()">Take Quiz Again</button>
    </div>
  `;
}

answerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = parseInt(btn.dataset.index);
    const correct = questions[currentQuestion].correct;

    answerButtons.forEach((button, i) => {
      button.disabled = true;
      if (i === correct) button.classList.add("correct");
      if (i === selected && i !== correct) button.classList.add("wrong");
    });

    if (selected === correct) {
      feedbackEl.textContent = "✅ Correct! Well done!";
      feedbackEl.className = "feedback-correct";
      score++;
    } else {
      feedbackEl.textContent = `❌ Incorrect. The correct answer is: ${questions[currentQuestion].answers[correct]}`;
      feedbackEl.className = "feedback-wrong";
    }

    scoreEl.textContent = `Current Score: ${score}/${questions.length}`;
    nextBtn.style.display = "inline-block";
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Initialize quiz
loadQuestion();