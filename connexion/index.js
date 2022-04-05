const btnConnection = document.querySelector('#btn-connection');
const inputPseudo = document.querySelector('#input-pseudo');
const inputMdp = document.querySelector('#input-mdp')

btnConnection.onclick = function () {
    localStorage.setItem('user', inputPseudo.value); // Sauvegarde le pseudo dans le localStorage
    localStorage.setItem('Password', inputMdp.value)
    document.location.href = '../index.html'; // Redirige vers quiz.html
};