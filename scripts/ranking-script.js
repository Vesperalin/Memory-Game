// script for results.html page
const results = JSON.parse(localStorage.getItem('results'));
const levelNames = ["easyResults", "mediumResults", "hardResults", "mobileResults"];
const columnOfRankingNames = ["easy-level", "medium-level", "hard-level", "mobile"];
const pairsOnBord = [4, 6, 8, 4];

levelNames.forEach((level, index) => {
    const column = document.querySelector(`.${columnOfRankingNames[index]}`);
    results[`${level}`].forEach(result => {
        const time = result[0].split(":");
        column.innerHTML += `
        <div class="result">
            <p>Guessed pairs: ${result[2]}/${pairsOnBord[index]}</p>
            <p>Time: ${time[0]}h ${time[1]}min ${time[2]}s</p>
            <p>Moves: ${result[1]}</p>
        </div>`;
    });
});
