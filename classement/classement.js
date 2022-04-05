let classement = localStorage.getItem('classement');
if(classement) {
    classement = JSON.parse(classement);
} else {
    classement = [];
}

const divClassement = document.querySelector('#classement');

let classementDansOrdre = [];

for(let i = 0; i < classement.length; i++) {
    // let { score, timer, pseudo } = classement[i];
    let score = classement[i].score;
    let timer = classement[i].timer;
    let pseudo = classement[i].pseudo;

    let total = score * 100 - timer * 4;

    classementDansOrdre.push({
        pseudo: pseudo,
        total: total
    });

    console.log(classementDansOrdre[i]);
}

// Voir : https://www.azur-web.com/astuces/javascript-trier-tableau-objet
classementDansOrdre = classementDansOrdre.sort(function (a, b) {
    if(a.total < b.total) {
        return 1;
    } else if(a.total > b.total) {
        return -1;
    }
    return 0;
});

for(let i = 0; i < classementDansOrdre.length; i++) {
    divClassement.innerHTML += `
        <tr>
            <td>#${i + 1}</td>
            <td>${classementDansOrdre[i].pseudo}</td>
            <td>${classementDansOrdre[i].total}</td>
        </tr>
    `;
}