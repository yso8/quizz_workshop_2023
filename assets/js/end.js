const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const emojiScore = document.getElementById('emojiScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

let emoji = '';
if (mostRecentScore.toString().substring(0, 3) >= 0 && mostRecentScore.toString().substring(0, 3) < 75) {
    emoji = 'assets/emoji/1F640.svg';
} else if (mostRecentScore.toString().substring(0, 3) >= 75 && mostRecentScore.toString().substring(0, 3) < 150) {
    emoji = 'assets/emoji/1F63F.svg';
} else if (mostRecentScore.toString().substring(0, 3) >= 150 && mostRecentScore.toString().substring(0, 3) < 225) {
    emoji = 'assets/emoji/1F63A.svg';
} else if (mostRecentScore.toString().substring(0, 3) >= 225 && mostRecentScore.toString().substring(0, 3) <= 300) {
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