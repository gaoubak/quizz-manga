if(!localStorage.getItem('user')) {
  alert('Connectez vous avant de pouvoir jouer');
  document.location.href = '../connexion/connexion.html';
}
class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question(
        "Qui est le personnage principal de la série ?",
        ["Saori","Aioros","Seiya","Jabu"],
        "Seiya"
        ),
    new Question(
        "Quel est le premier combat de l'animé ?",
        ["Seiya contre Cassios","Ikki contre nachi","Qeiya contre Geki","Jabu contre Ban"],
        "Jabu contre ban"  
       ),
    new Question(
        "Dans le manga comment Hyoga apprends t-il l'emplacement de son armure ?",
        ["Par une lettre envoyée par le grand pope","Il découvre son emplacement en écoutant une histoire raconté par Jacob","Saori lui remêt à son arrivé au colisée","L'armure se révêle à lui de son plein gré"],
        "Par une lettre envoyée par le grand pope"  
       ),
    new Question(
        "Que doit accomplir Shiryu pour avoir le droit de porter son armure ?",
        ["Battre son Maître","Renverser le cours de la cascade de Rozan","Déclencher l'Ultime Dragon","Gagner le Tournoi Intergalactique"],
        "Renverser le cours de la cascade de Rozan"  
       ),
    new Question(
        "Combien y a t-il d'Armures Sacrées ?",
        ["75","114","88","92"],
        "16 ans"  
       ),
    new Question(
        "Dans The Lost Canvas Comment s'appelle le Chevaler Pegase ?",
        ["Tenma","Alone","Kagaho","Fedor"],
        "Tenma"  
       ),
  ];
  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  let timer = 0;
// let timerVisible = 0;

/**
 * Chronomètre qui démare au chargement de la page
 */
 let interval = setInterval(
    function () {
        timer++;
    },
    1000
);
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
       <a href="../index.html"><h1>Quiz terminé !</h1><a/>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
      saveScore();
    } else {
      display.question();
      display.choices();
      display.progress();
      timerVisible = 0;
    } 
  }
  function saveScore() {

    // Récupération
    const pseudo = localStorage.getItem('user');
    let classement = localStorage.getItem('classement');
    if(classement) {
        classement = JSON.parse(classement);
    } else {
        classement = [];
    }

    // Modification
    classement.push({
        pseudo: pseudo,
        score: quiz.score,
        timer: timer,
    });

    // Sauvegarde
    localStorage.setItem('classement', JSON.stringify(classement));
}

  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);

