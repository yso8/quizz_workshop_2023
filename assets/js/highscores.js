const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .sort((a, b) => b.score.slice(0,3) - a.score.slice(0,3))
  .map(score => {
    return `<li class="high-score"><b>${score.name}</b> : ${score.score}</li>`;
  })
  .join("");