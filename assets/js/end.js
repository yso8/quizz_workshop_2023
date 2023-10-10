const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const emojiScore = document.getElementById('emojiScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

let emoji = '';
if (mostRecentScore >= 0 && mostRecentScore < 50) {
    emoji = '🤬';
} else if (mostRecentScore >= 50 && mostRecentScore < 100) {
    emoji = '🙂';
} else if (mostRecentScore >= 100 && mostRecentScore < 150) {
    emoji = '😀';
} else if (mostRecentScore >= 150 && mostRecentScore <= 200) {
    emoji = '😆';
}

emojiScore.innerText = mostRecentScore + ' ' + emoji;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};