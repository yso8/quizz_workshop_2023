const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const emojiScore = document.getElementById('emojiScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

let emoji = '';
if (mostRecentScore >= 0 && mostRecentScore < 50) {
    emoji = 'assets/emoji/1F640.svg';
} else if (mostRecentScore >= 50 && mostRecentScore < 100) {
    emoji = 'assets/emoji/1F63F.svg';
} else if (mostRecentScore >= 100 && mostRecentScore < 150) {
    emoji = 'assets/emoji/1F63A.svg';
} else if (mostRecentScore >= 150 && mostRecentScore <= 200) {
    emoji = 'assets/emoji/1F638.svg';
}
emojiScore.src = emoji;

score.innerText = mostRecentScore;

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