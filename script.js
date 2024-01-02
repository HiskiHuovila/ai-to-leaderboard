document.addEventListener("DOMContentLoaded", function() {
    const leaderboard = document.getElementById("leaderboard");
    const addScoreForm = document.getElementById("addScoreForm");

    function saveScores(scores) {
        localStorage.setItem("leaderboardScores", JSON.stringify(scores));
    }

    function loadScores() {
        return JSON.parse(localStorage.getItem("leaderboardScores")) || [];
    }

    function renderScores() {
        const scores = loadScores();
        scores.sort((a, b) => b.score - a.score);

        // Create table structure
        let tableHTML = `<table><thead><tr><th></th><th></th><th></th></tr></thead><tbody>`;

        // Add rows for each score
        scores.forEach((score, index) => {
            tableHTML += `<tr data-index="${index}"><td>${index + 1}</td><td>${score.name}</td><td>${score.score}</td></tr>`;
        });
        tableHTML += `</tbody></table>`;

        leaderboard.innerHTML = tableHTML;

        // Attach click event listeners for deletion
        attachRowClickListeners();
    }

    function attachRowClickListeners() {
        const rows = document.querySelectorAll('#leaderboard tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (confirm(`Are you sure you want to delete the score of ${rows[index].cells[1].textContent}?`)) {
                    deleteScore(index);
                }
            });
        });
    }

    function deleteScore(index) {
        const scores = loadScores();
        scores.splice(index, 1);
        saveScores(scores);
        renderScores();
    }

    addScoreForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const score = document.getElementById("score").value.trim();

        if (name && score) {
            const scores = loadScores();
            scores.push({ name, score: parseInt(score, 10) });
            saveScores(scores);

            renderScores();
            addScoreForm.reset();
        }
    });

    renderScores();
});
