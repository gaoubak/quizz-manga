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
        "Qui sont les membres de l'équipe Kakashi ?",
        ["Naruto, Sakura, Sasuke","Kakashi, Naruto, Sakura, Sasuke","Naruto, Sakura, Kakashi","Jiraya, Kakashi, Tsunade"],
        "Naruto, Sakura, Kakashi"
        ),
    new Question(
        "Qui est le père de Naruto ?",
        ["Jiraya","Minato","Kakashi","Iruka"],
        "Minato"  
       ),
    new Question(
        "Qui sont les trois ninjas légendaires ?",
        ["Jiraya, Naruto, Kakashi","Jiraya, Tsunade, Naruto","Oroshimaru, Itachi, Sasuke","Tsunade, Jiraya, Oroshimaru"],
        "Tsunade, Jiraya, Oroshimaru"  
       ),
    new Question(
        "Qui est la première personne a avoir brisé la solitude de Naruto ?",
        ["Iruka","Kakashi","Sakura","Jiraya"],
        "Iruka"  
       ),
    new Question(
        "Au début de shippuden, combien de fois Jiraya a-t-il failli mourir ??",
        ["2","1","6","0"],
        "2"  
       ),
    new Question(
        "Quelle est la signification d'être un ninja pour Naruto ?",
        ["Toujours être le plus fort","Toujours tenir sa parole","Battre tous ses adversaires","S'entraîner H24"],
        "Toujours tenir sa parole"  
       ),
    new Question(
      "De quoi Jiraya a-t-il failli mourir la première fois ?",
      ["Quand il était petit, il a énervé Tsunade et elle a failli le tuer","Dans un combat contre l'Akatsuki","Dans la grande guerre de Konoha","De Tsunade car il a essayé de mater des filles dans un spa"],
      "De Tsunade car il a essayé de mater des filles dans un spa"
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
      saveScore()
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

