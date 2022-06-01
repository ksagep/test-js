const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let scorenumbers = document.getElementById('scores');
let endresult = document.getElementById('end-result');
let lastMessage = document.getElementById('last-message');

let scores = 0;
let counter;

/** Get the button elements and add event listeners to them */

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
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    
    console.log('answer', selectAnswer);
    console.log('show question length', showQuestion.length);
    console.log('shuffled questions length', shuffledQuestions.length);
    console.log('attempted questions', attemptedQuestions);

    if (currentQuestionIndex +1 < shuffledQuestions.length) {
      checkAnswer(); 
      showQuestion();
    } else {
      gameover();
    }
}

/** Take the questions and the linked possible answers to the screen */

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/** Provide the possibility of selection from shuffled questions */

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide'); 
  }  else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
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

/** Check the answer which was chose by player */

function checkAnswer(question) {
  console.log(question);
  let userAnswer = parseInt(document.getElementById("answer-buttons").innerText);
  let calculatedAnswer = selectAnswer(correct, true);
  let correct = userAnswer === calculatedAnswer;
  scorepush();
  scores++;
  setNextQuestion();
}

/** Gets the correct answers from the DOM and increments it by 1 */

function scorepush() {
  scorenumbers.innerHTML = `Score: ${scores}/10`;
}

function gameover() {
  console.log('Finished the game');
  clearInterval(counter);
  endscore();
}

function endscore() {
  console.log('Shows the results');
  endresult.innerText = `Your result: ${scores}/10`;
  if(scores<=5){
    lastMessage.innerText="I think you can do this better! Drink another coffee!";
  }
  else if(scores >5 && scores <= 9){    
    lastMessage.innerText="You know some important things.";
  }
  else if(scores === 10){
    lastMessage.innerText="Congratulations! You are a real coffee fan!";
  }
}

const questions = [
    {
        question: 'Where does coffee come from?',
        answer: [
          { text: 'Ethiopia', correct: true },
          { text: 'Italy', correct: false },
          { text: 'France', correct: false },
          { text: 'from a nearby store', correct: false }
        ]
    },
    {
        question: 'Which is not a roasting method?',
        answer:[
          { text: 'Spanish', correct: false },
          { text: 'Italian', correct: false },
          { text: 'French', correct: false },
          { text: 'British', correct: true }
        ]        
      },
      {
        question: 'What color is the ripe coffee berry?',
        answer:[
          { text: 'Yellow', correct: false },
          { text: 'Green', correct: false },
          { text: 'Red', correct: true },
          { text: 'Blue', correct: false }
        ]        
      },
      {
        question: 'There is really no caffeine in decaffeinated coffee?',
        answer:[
          { text: 'Yes, it is true', correct: false },
          { text: 'Decaffeinated coffee contains 2-6% caffeine', correct: true },
          { text: 'Maybe, it is true', correct: false },
          { text: 'What does decaffeinated coffee mean?', correct: false }
        ]        
      },
      {
        question: 'Where they produce the most coffee in the world?',
        answer:[
          { text: 'Vietnam', correct: false },
          { text: 'Brasil', correct: true },
          { text: 'Ethiopia', correct: false },
          { text: 'India', correct: false }
        ]        
      },
      {
        question: 'What is not the main characteristic of robusta coffees?',
        answer:[
          { text: 'acidic', correct: false },
          { text: 'high in caffeine', correct: false },
          { text: 'dark brown', correct: true },
          { text: 'full-bodied', correct: false }
        ]
      },
      {
        question: 'What is not the main characteristic of arabica coffees?',
        answer:[
          { text: 'sweeter than the robusta', correct: false },
          { text: 'low in caffeine', correct: false },
          { text: 'light-bodied', correct: false },
          { text: 'smaller beans', correct: true }
        ]
      },
      {
        question: 'When coffee was discovered?',
        answer:[
          { text: '15th century', correct: true },
          { text: '16th century', correct: false },
          { text: '17th century', correct: false },
          { text: '19th century', correct: false }
        ]
      },
      {
        question: 'What percentage of the coffee stays warm if we add cream to it?',
        answer:[
          { text: '10%', correct: false },
          { text: '20%', correct: true },
          { text: '30%', correct: false },
          { text: 'if you have a microwave oven, always', correct: false }
        ]
      },
      {
        question: 'In which country do people drink the most coffee?',
        answer:[
          { text: 'USA', correct: false },
          { text: 'Finland', correct: true },
          { text: 'Russia', correct: false },
          { text: 'Vietnam', correct: false }
        ]
      }

];