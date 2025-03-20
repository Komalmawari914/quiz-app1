const questions = [
    {
        question: "What is the capital city of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "B"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "D"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        answer: "C"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Elephant", "Lion", "Tiger", "Giraffe"],
        answer: "B"
    }
];

let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const startButton = document.getElementById("start-quiz");
const quizContent = document.getElementById("quiz-content");
const questionsContainer = document.getElementById("questions-container");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const finalScoreDisplay = document.getElementById("final-score");

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    quizContent.style.display = "block";
    loadAllQuestions();
});

function loadAllQuestions() {
    questionsContainer.innerHTML = "";
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";

    questions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${q.question} (10 points)`;
        questionBox.appendChild(questionText);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        let labels = ["A", "B", "C", "D"];
        q.options.forEach((option, optionIndex) => {
            const optionBox = document.createElement("div");
            optionBox.classList.add("option-box");

            const abcdBox = document.createElement("div");
            abcdBox.classList.add("abcd-box");
            abcdBox.textContent = labels[optionIndex];

            const optionText = document.createElement("span");
            optionText.textContent = option;

            optionBox.appendChild(abcdBox);
            optionBox.appendChild(optionText);
            optionsContainer.appendChild(optionBox);

            optionBox.addEventListener("click", () => {
                // Deselect all options for this question
                optionsContainer.querySelectorAll(".option-box").forEach((box) => {
                    box.classList.remove("selected");
                });

                // Select the clicked option
                selectedAnswers[index] = labels[optionIndex];
                optionBox.classList.add("selected");
            });
        });

        questionBox.appendChild(optionsContainer);
        questionsContainer.appendChild(questionBox);
    });
}

submitButton.addEventListener("click", () => {
    score = 0;
    questions.forEach((q, index) => {
        const optionsContainer = questionsContainer.children[index].querySelector(".options-container");
        const selectedOption = optionsContainer.querySelector(".selected");

        if (selectedOption) {
            const selectedAnswer = selectedOption.querySelector(".abcd-box").textContent;
            if (selectedAnswer === q.answer) {
                score += 10;
                selectedOption.classList.add("correct");
            } else {
                selectedOption.classList.add("incorrect");
            }
        }
    });

    scoreDisplay.textContent = `Score: ${score} / 50`;
    finalScoreDisplay.textContent = `Final Score: ${score} / 50`;
    finalScoreDisplay.style.display = "block";
    resetButton.style.display = "block";
    generateConfetti();
});

resetButton.addEventListener("click", () => {
    score = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    scoreDisplay.textContent = "Score: 0 / 50";
    loadAllQuestions();
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";
    startButton.style.display = "block";
    quizContent.style.display = "none";
});

function generateConfetti() {
    const confettiContainer = document.createElement("div");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const size = Math.random() * 10 + 5;
        const color = getRandomColor();
        const startPositionX = Math.random() * window.innerWidth;
        const startPositionY = Math.random() * window.innerHeight;

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${startPositionX}px`;
        confetti.style.top = `${startPositionY}px`;

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

function getRandomColor() {
    const colors = ['#ff6347', '#ffd700', '#32cd32', '#1e90ff', '#8a2be2'];
    return colors[Math.floor(Math.random() * colors.length)];
}