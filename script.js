let currentQuestion = 1;
let correctAnswer = "optionA";  
let isAnswered = false;
let score = 0;

const nextButton = document.getElementById('nextButton');
const resultText = document.querySelector('.result-text');
const options = document.querySelectorAll('.option');
const gameContainer = document.querySelector('.container'); 
const resultContainer = document.createElement('div'); 

const questions = [
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/burger king 1.png", text: "Logo A" }, optionB: { image: "foto/burger king2.png", text: "Logo B" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/chupa chups 2.png", text: "Logo C" }, optionB: { image: "foto/chupa chups1.png", text: "Logo D" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/samsung 2.png", text: "Logo E" }, optionB: { image: "foto/samsung 1.png", text: "Logo F" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/pepsi1.png", text: "Logo G" }, optionB: { image: "foto/pepsi2.png", text: "Logo H" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/starbucks 1.png", text: "Logo I" }, optionB: { image: "foto/starbucks 2.png", text: "Logo J" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/volkswagen 1.png", text: "Logo K" }, optionB: { image: "foto/volkswagen 2.png", text: "Logo L" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/the north face 1.png", text: "Logo M" }, optionB: { image: "foto/the north face2.png", text: "Logo N" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/nutella2.png", text: "Logo O" }, optionB: { image: "foto/nutella1.png", text: "Logo P" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/tiktok2.png", text: "Logo Q" }, optionB: { image: "foto/tiktok1.png", text: "Logo R" } } },
    { questionText: "Which version of the logo is the correct one?", correctAnswer: "optionA", options: { optionA: { image: "foto/nescafé1.png", text: "Logo S" }, optionB: { image: "foto/nescafé2.png", text: "Logo T" } } },
];

const updateQuestion = () => {
    if (currentQuestion > questions.length) return showResults();

    const question = questions[currentQuestion - 1];
    document.querySelector('.question-button').textContent = "Question " + currentQuestion;
    document.querySelector('.question-text').textContent = question.questionText;
    
    Object.keys(question.options).forEach(optionId => {
        const optionElement = document.querySelector(`#${optionId}`);
        optionElement.innerHTML = `<img src="${question.options[optionId].image}" alt="${question.options[optionId].text}">`;
    });
    
    correctAnswer = question.correctAnswer;

    updateProgressBar();
};

function updateProgressBar() {
    // Bereken het percentage van de voortgang
    const progressPercentage = (currentQuestion / questions.length) * 100;
    console.log(`Progress Percentage: ${progressPercentage}%`);  // Debugging
    // Update de breedte van de voortgangsbalk
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = progressPercentage + "%";  
}

function resetOptions() {
    options.forEach(option => option.classList.remove('selected', 'correct'));
    resultText.textContent = '';
    resultText.classList.remove('correct', 'wrong');
    isAnswered = false;
}

function handleOptionClick(event) {
    if (isAnswered) return;

    const selectedOption = event.currentTarget;
    selectedOption.classList.add('selected');

    if (selectedOption.id === correctAnswer) {
        resultText.textContent = 'Correct!';
        resultText.classList.add('correct');
        score++;
    } else {
        resultText.textContent = 'Wrong!';
        resultText.classList.add('wrong');
    }

    document.getElementById(correctAnswer).classList.add('correct');
    isAnswered = true;
    nextButton.disabled = false;
}

options.forEach(option => option.addEventListener('click', handleOptionClick));

nextButton.addEventListener('click', function () {
  if (currentQuestion >= questions.length) {  
      localStorage.setItem("finalScore", score); 
      window.location.href = "end.html"; 
      return;
  }

  currentQuestion++;
  resetOptions();
  nextButton.disabled = true;
  updateQuestion();
  updateProgressBar();
});


function showResults() {
    gameContainer.innerHTML = ''; 
    resultContainer.innerHTML = `
        <h2>Game Over!</h2>
        <p>Je score: ${score}/${questions.length}</p>
        <p>${score >= 5 ? "Congrats! 🎉" : "Oh, unfortunatly... 😢"}</p>
        <button class="play-again-btn">Play again</button>
    `;
    resultContainer.classList.add('result-container');
    document.body.appendChild(resultContainer);

    document.querySelector('.play-again-btn').addEventListener('click', function () {
        location.reload();
    });
}

updateQuestion();

