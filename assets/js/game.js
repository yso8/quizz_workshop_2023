const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const choicesContainer = document.getElementById('choices-container');
const puzzle = document.getElementById('validated-canvas');
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const explanationText = document.getElementById("explanation");
const PourcentageText = document.getElementById("pourcentage");
const scoreDisplay = document.getElementById('score');

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;
const PUZZLE_TERMINATED = 5;

let currentPourcentage = {};
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

fetch('assets/data/questions.json')
  .then((res) => res.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions;

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    startTimer();
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', scoreDisplay.textContent);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    
    choices.forEach((choice) => {
        choice.parentElement.classList.remove('correct');
    });

    choices.forEach((choice) => {
        choice.parentElement.classList.remove('incorrect');
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
          incrementScore(CORRECT_BONUS);
        }  

        choices.forEach((choice) => {
            if (choice.dataset['number'] == currentQuestion.answer) {
                choice.parentElement.classList.add('correct');
            }
        });

        selectedChoice.parentElement.classList.add(classToApply);
        showExplanation(currentQuestion.explanation);
    });
});

incrementScore = (num) => {
  score += num;
};

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      getNewPuzzle();
    }
  }

function getNewPuzzle() {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', scoreDisplay.textContent);
      //go to the end page
      return window.location.assign('./end.html');
    }

    let images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png', 'image11.png', 'image12.png', 'image13.png', 'image14.png', 'image15.png'];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    let imagePath = 'assets/image/' + randomImage;
  
    let amaral = new Image();
    amaral.src = imagePath;
    amaral.onload = () => {
      const keyboard = new headbreaker.Canvas('validated-canvas', {
        width: 380, height: 380, pieceSize: 150,
        image: amaral, strokeWidth: 2.5, strokeColor: '#F0F0F0',
        outline: new headbreaker.outline.Rounded(),
        fixed: true
      });
  
      keyboard.adjustImagesToPuzzleWidth();
      keyboard.autogenerate({
        horizontalPiecesCount: 2,
        verticalPiecesCount: 2,
        insertsGenerator: headbreaker.generators.keyboard
      });
      
      choicesContainer.classList.add('hidden');
      puzzle.classList.remove('hidden');
      question.innerText = 'Résoudre le puzzle ci-dessous : ';
          
      keyboard.shuffle(0.7);
      keyboard.registerKeyboardGestures();
      keyboard.draw();
      keyboard.attachSolvedValidator();
      keyboard.onValid(() => {
          setTimeout(() => {
              incrementScore(PUZZLE_TERMINATED);
              puzzle.classList.add('hidden');
              choicesContainer.classList.remove('hidden');
              getNewQuestion();
          }, 500);
      })
    };
}

  
  // Show the modal with the explanation
function getRandomPercentage() {
    return Math.floor(Math.random() * 100) + 1;
}

// Show the modal with the explanation
function showExplanation(explanation) {
    explanationText.innerText = explanation;

    // Générer un pourcentage aléatoire
    const randomPercentage = getRandomPercentage();

    // Afficher ce pourcentage
    PourcentageText.innerText = `${randomPercentage}% des personnes dans votre entreprise ont donné la même réponse que vous.`;

    modal.style.display = "block";
}

function startTimer() {
    let seconds = 0;
    let minutes = 0;
  
    function updateTimerDisplay() {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
  
      const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
      const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  
      scoreDisplay.textContent = score + " - " + displayMinutes + ":" + displaySeconds;
    }
  
    const timerInterval = setInterval(updateTimerDisplay, 1000);
}