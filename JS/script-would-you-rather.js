document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
  });
  
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAppElement = document.getElementById('would_you_rather_app');
  const resultsElement = document.createElement('div');
  resultsElement.setAttribute('id', 'results');
  resultsElement.classList.add('results', 'hide');
  quizAppElement.appendChild(resultsElement);
  
  let shuffledQuestions, currentQuestionIndex;
  let score = 0;
  
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  
  function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    const currentImage = document.querySelector('.question-image');
    if (currentImage) {
        questionContainerElement.removeChild(currentImage);
    }
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function showQuestion(question) {
    const imageElement = document.createElement('img');
    imageElement.src = question.image;
    imageElement.style.maxWidth = '600px';
    imageElement.style.width = '100%';
    imageElement.style.marginBottom = '20px';
    imageElement.style.margin = 'auto';
    imageElement.style.display = 'block';
    imageElement.classList.add('question-image');
    questionContainerElement.appendChild(imageElement);
    

    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
}
  
  function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
  
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
  
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 1000);
   
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
  
    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    quizAppElement.appendChild(resultsElement);
  }
  
  function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
  }

  const questions = [
    {
        image: "images/wyr_1.png",
        question: "Who would you rather base your nutritional choices on recommendations?",
        answers: [
            { text: "Kim Kardashian, a celebrity promoting a trendy fad diet on social media", correct: false },
            { text: "Berry Johnson, registered dietitian with a Master's degree in nutrition", correct: true },
        ]
    },
    {
        image: "images/wyr_2.png",
        question: "Who would you rather get parenting advice from?",
        answers: [
            { text: "Dr. Leighann Poppy, child psychologist specializing in child development", correct: true },
            { text: "Abby Lee Miller, reality TV star who gained fame through sensationalized portrayals of family life", correct: false },
        ]
    },
    {
        image: "images/wyr_3.png",
        question: "Would you rather trust investigative journalism on government corruption?",
        answers: [
            { text: "Carmen Phillips,award-winning investigative journalist with a history of breaking major stories ", correct: true },
            { text: "Mr. Saproano, a grump who may or maynot be the head of the Italian Mafia", correct: false },
        ]
    },
    {
        image: "images/wyr_4.png",
        question: "Would you rather base your technology purchasing decisions from reviews?",
        answers: [
            { text: "Joshua Phillips, an anonymous commenter on an internet forum", correct: false },
            { text: "Mark Robber, a respected tech journalist with hands-on experience testing gadgets", correct: true },           
        ]
    },
    {
        image: "images/wyr_5.png",
        question: "Would you rather seek financial advice from?",
        answers: [
            { text: "Warren Buffett, one of the most successful investors in history", correct: true },
            { text: "Mr.Beast, self-proclaimed financial guru without any proven track record", correct: false },
        ]
    },
  ];
  