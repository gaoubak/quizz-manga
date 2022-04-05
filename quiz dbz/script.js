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
        "Qui fut le premier maitre de Sangoku ?",
        ["Le Très Haut","Tortue Féniale","Tortue Géniale","Le Maitre des Grue"],
        "Tortue Géniale"
        ),
    new Question(
        "Dans 'Dragon Ball', qui tue Sangohan, le grand-père ?",
        ["Sangoku, sans le faire exprès","Tao Pai Pai, en lui tirant un Dodompa","Petit-Cœur, en lui tordant le cou","Un dinosaure, en lui croquant la tête"],
        "Sangoku, sans le faire exprès"  
       ),
    new Question(
        "Quel est l'intrus ?",
        ["Sangoku","Tao Pai Pai","Petit-Cœur","Thalès"],
        "Thalès"  
       ),
    new Question(
        "Dans 'Dragon Ball Z', lequel de ces personnages est le moins puissant ?",
        ["Sangoku","Hercule","Petit-Cœur","Krilin"],
        "Hercule"  
       ),
    new Question(
        "À quel âge Sangohan rencontre-t-il Videl ?",
        ["7 ans","14 ans","16 ans","25 ans"],
        "16 ans"  
       ),
    new Question(
        "De combien d'enfants Vegeta est-il le père à la fin de DBZ ? (cf. Le tome 42, dans les dernières pages ! )",
        ["Trois","Deux","Un","Aucun"],
        "Deux"  
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

