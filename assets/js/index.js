const highScoresButton = document.getElementById("highScoresButton"); 
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length === 0) {
    highScoresButton.classList.add("disabled");
    highScoresButton.onclick = function(event) {
        event.preventDefault();
    }
} 