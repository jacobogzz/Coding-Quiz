document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const timerContainer = document.getElementById('timer');
    const timeSpan = document.getElementById('time');
    const endScreen = document.getElementById('end-screen');
    const scoreSpan = document.getElementById('score');
    const initialsInput = document.getElementById('initials');
    const saveBtn = document.getElementById('save-btn');

    const questions = [
        { question: 'What does HTML stand for?', options: ['a. Hyper Text Markup Language', 'b. High-Level Text Machine Language', 'c. Hyperlink and Text Markup Language', 'd. High-Level Text Markup Language'], correctAnswer: 'a. Hyper Text Markup Language' },
        
        { question: 'What is the primary difference between <div> and <span> tags?', options: ['a. <div> is inline, and <span> is block-level.', 'b. <div> is block-level, and <span> is inline.', 'c. Both <div> and <span> are block-level.', 'd. Both <div> and <span> are inline.'], correctAnswer: 'b. <div> is block-level, and <span> is inline.' },
        
        { question: 'How can you create a text input field in HTML?', options: ['a. <text-input>', 'b. <input type="text">', 'c. <text-field>', 'd. <textbox>'], correctAnswer: 'b. <input type="text">' },
       
        { question: 'What is the purpose of an ID selector in CSS?', options: ['a. To select multiple elements.', 'b. To select a single, unique element.', 'c. To style all elements within a class.', 'd. To apply styles to a specific HTML tag.'], correctAnswer: 'b. To select a single, unique element.' },
       
        { question: 'What components make up the CSS box model?', options: ['a. Margin, Padding, Content, Border', 'b. Border, Padding, Margin, Content', 'c. Content, Margin, Border, Padding', 'd. Padding, Content, Margin, Border'], correctAnswer: 'd. Padding, Content, Margin, Border' },
        
        { question: 'What is the primary advantage of using Flexbox in CSS?', options: ['a. It is only suitable for vertical layouts.', 'b. It provides a simple and efficient way to layout items in a single dimension.', 'c. It is designed for complex grid-based layouts.', 'd. It is used for creating circular layouts.'], correctAnswer: 'c. It is designed for complex grid-based layouts.' },
        
        { question: 'What is the keyword for declaring a variable in JavaScript?', options: ['a. variable', 'b. var', 'c. let', 'd. const'], correctAnswer: 'b. var' },
       
        { question: 'How would you declare a function in JavaScript?', options: ['a. function myFunction() {}', 'b. def myFunction() {}', 'c. void myFunction() {}', 'd. func myFunction() {}'], correctAnswer: 'a. function myFunction() {}' },

    ];

    let currentQuestionIndex = 0;
    let timer;
    let timeRemaining = 60;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    saveBtn.addEventListener('click', saveScore);

    function startQuiz() {
        startBtn.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            feedbackContainer.textContent = 'Correct!';
            score++;
        } else {
            feedbackContainer.textContent = 'Incorrect!';
            timeRemaining -= 10; 
        }

        setTimeout(() => {
            feedbackContainer.textContent = '';
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        }, 1000);
    }

    function startTimer() {
        timer = setInterval(() => {
            timeRemaining--;
            timeSpan.textContent = timeRemaining;

            if (timeRemaining <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        quizContainer.style.display = 'none';
        endScreen.style.display = 'block';
        scoreSpan.textContent = score;
    }

    function saveScore() {
        const initials = initialsInput.value.trim();
        if (initials !== '') {
            alert(`Score saved for ${initials}!`);
        } else {
            alert('Please enter your initials.');
        }
    }
});