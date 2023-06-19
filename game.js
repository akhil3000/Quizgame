const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions=[
    {
       question:"What is the Capital City of India",
       choice1:'Bangalore',
       choice2:'Delhi',
       choice3:'Chennai',
       choice4:'Mumbai',
       answer:2
    },
    {
        question:"What is the Capital City of U.S.A",
        choice1:'NewYork',
        choice2:'LasVegas',
        choice3:'Washington D.C',
        choice4:'All the Above',
        answer:3
    },
    {
        question:"What is the Capital City of England",
        choice1:'Manchester',
        choice2:'Leeds',
        choice3:'London',
        choice4:'Liverpool',
        answer:3
    },
    {
        question:"What is the Capital City of SouthAfrica",
        choice1:'CapeTown',
        choice2:'Pretoria',
        choice3:'Bloemfontein',
        choice4:'All the Above',
        answer:4
    }
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('file:///C:/Akhil%20HDD/WebDev/AngelaUdemy/Quizapp/Application/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });

});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();