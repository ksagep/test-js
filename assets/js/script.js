const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');

const shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {

}

function selectAnswer() {

}

const questions = [
    {
        question: '',
        answers: [
            {text: '', correct: ''},
            {text: '', correct: ''},
            {text: '', correct: 'true'},
            {text: '', correct: 'false'}
        ]
    }
]