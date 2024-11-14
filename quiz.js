const quizData = [
    {
        question: "Qual dos seguintes é um tipo de dado em JavaScript?",
        choices: ["String", "Number", "Boolean", "Todos os acima"],
        answer: "Todos os acima"
    },
    {
        question: "Como declaramos uma variável em JavaScript?",
        choices: ["var", "let", "const", "Todas as acima"],
        answer: "Todas as acima"
    },
    {
        question: "Qual é o operador de igualdade estrita em JavaScript?",
        choices: ["=", "==", "===", "!=="],
        answer: "==="
    },
    {
        question: "Como chamamos uma função chamada 'minhaFuncao'?",
        choices: ["chamar minhaFuncao", "minhaFuncao()", "invocar minhaFuncao", "func minhaFuncao"],
        answer: "minhaFuncao()"
    },
    {
        question: "Qual das seguintes opções cria um alerta na tela?",
        choices: ["console.log('Alerta')", "window.alert('Alerta')", "msgBox('Alerta')", "alertBox('Alerta')"],
        answer: "window.alert('Alerta')"
    }
];

const quizContainer = document.getElementById("quiz");
const resultadoContainer = document.getElementById("resultado");

// Função para exibir o quiz
function displayQuiz() {
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.innerText = `${index + 1}. ${item.question}`;
        questionDiv.appendChild(questionText);

        item.choices.forEach(choice => {
            const choiceLabel = document.createElement("label");
            const choiceInput = document.createElement("input");

            choiceInput.type = "radio";
            choiceInput.name = `question${index}`;
            choiceInput.value = choice;

            choiceLabel.appendChild(choiceInput);
            choiceLabel.append(` ${choice}`);
            questionDiv.appendChild(choiceLabel);
            questionDiv.appendChild(document.createElement("br"));
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Função para calcular o resultado
function calculateScore() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === item.answer) {
            score++;
        }
    });

    // Salva a pontuação no localStorage
    localStorage.setItem("quizScore", score);

    return score;
}

// Função para exibir o resultado
function showResult(score) {
    resultadoContainer.innerHTML = `Você acertou ${score} de ${quizData.length} perguntas.`;
    const savedScore = localStorage.getItem("quizScore");
    if (savedScore) {
        resultadoContainer.innerHTML += `<p>Pontuação salva: ${savedScore}</p>`;
    }
}

// Manipulador de envio do formulário
document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const score = calculateScore();
    showResult(score);
});

// Exibe o quiz ao carregar a página
displayQuiz();
