
const quotes = [
    { quote: "I'll be back.", movie: "The Terminator", year: 1984 },
    { quote: "May the Force be with you.", movie: "Star Wars", year: 1977 },
    { quote: "I'm the king of the world!", movie: "Titanic", year: 1997 },
    { quote: "Houston, we have a problem.", movie: "Apollo 13", year: 1995 },
    { quote: "You can't handle the truth!", movie: "A Few Good Men", year: 1992 },
    { quote: "Why so serious?", movie: "The Dark Knight", year: 2008 },
    { quote: "I see dead people.", movie: "The Sixth Sense", year: 1999 },
    { quote: "Life is like a box of chocolates. You never know what you're gonna get.", movie: "Forrest Gump", year: 1994 },
    { quote: "Say hello to my little friend!", movie: "Scarface", year: 1983 },
    { quote: "Here's Johnny!", movie: "The Shining", year: 1980 },
    { quote: "To infinity and beyond!", movie: "Toy Story", year: 1995 },
    { quote: "I am your father.", movie: "Star Wars: The Empire Strikes Back", year: 1980 },
    { quote: "I'm gonna make him an offer he can't refuse.", movie: "The Godfather", year: 1972 },
    { quote: "Hasta la vista, baby.", movie: "Terminator 2: Judgment Day", year: 1991 },
    { quote: "E.T. phone home.", movie: "E.T. the Extra-Terrestrial", year: 1982 },
    { quote: "Keep your friends close, but your enemies closer.", movie: "The Godfather Part II", year: 1974 },
    { quote: "You talking to me?", movie: "Taxi Driver", year: 1976 },
    { quote: "I'm walking here! I'm walking here!", movie: "Midnight Cowboy", year: 1969 },
    { quote: "Nobody puts Baby in a corner.", movie: "Dirty Dancing", year: 1987 },
    { quote: "You complete me.", movie: "Jerry Maguire", year: 1996 },
    { quote: "Show me the money!", movie: "Jerry Maguire", year: 1996 },
    { quote: "Bond. James Bond.", movie: "Dr. No", year: 1962 }
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const chosen = quotes[randomIndex];

document.getElementById("movie-quote").textContent = `"${chosen.quote}"`;
document.getElementById("movie-info").textContent = `— ${chosen.movie} (${chosen.year})`;

const heroImg = document.querySelector('.hero-img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scale = 1 + scrollY * 0.0006; // Adjust this value to control intensity
    heroImg.style.transform = `scale(${scale})`;
});



document.addEventListener("DOMContentLoaded", () => {
    // Get all the containers
    const top100List = document.getElementById("top100-list");
    const genreDrama = document.getElementById("genre-drama");
    const genreComedy = document.getElementById("genre-comedy");
    const genreHorror = document.getElementById("genre-horror");
    const genreAction = document.getElementById("genre-action");
    const genreScifi = document.getElementById("genre-scifi");
    const allFilmsList = document.getElementById("all-films-list");

    // Load entries from localStorage
    let entries = JSON.parse(localStorage.getItem("filmEntries") || "[]");

    if (entries.length === 0) {
        allFilmsList.innerHTML = "<p>No films logged yet.</p>";
        top100List.innerHTML = "<p>No films logged yet.</p>";
        genreDrama.innerHTML = "<p>No films logged yet.</p>";
        genreComedy.innerHTML = "<p>No films logged yet.</p>";
        genreHorror.innerHTML = "<p>No films logged yet.</p>";
        genreAction.innerHTML = "<p>No films logged yet.</p>";
        genreScifi.innerHTML = "<p>No films logged yet.</p>";
        return; // no data to show
    }

    // Utility: Create film card HTML for one entry
    function createFilmCard(film) {
        return `
      <div class="film-card">
        <h4>${film.title} (${film.year})</h4>
        <p><strong>Genre:</strong> ${capitalize(film.genre)}</p>
        <p><strong>Total Score:</strong> ${film.totalScore.toFixed(1)} / 10</p>
        <details>
          <summary>Ratings breakdown</summary>
          <ul>
            <li>Feel / Impact: ${film.ratings.feel.toFixed(1)}</li>
            <li>Storytelling: ${film.ratings.story.toFixed(1)}</li>
            <li>Direction & Performances: ${film.ratings.direction.toFixed(1)}</li>
            <li>Sound Design: ${film.ratings.sound.toFixed(1)}</li>
            <li>Video Production: ${film.ratings.video.toFixed(1)}</li>
          </ul>
          <p><strong>Review:</strong> ${film.review ? film.review : "<em>No review provided</em>"}</p>
        </details>
      </div>
    `;
    }

    // Capitalize helper
    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Sort by totalScore descending
    entries.sort((a, b) => b.totalScore - a.totalScore);

    // Render top 100 highest rated (or fewer if less entries)
    const top100 = entries.slice(0, 100);
    top100List.innerHTML = top100.map(createFilmCard).join("");

    // Function to get top 10 by genre
    function topByGenre(genre) {
        return entries.filter(f => f.genre === genre).slice(0, 10);
    }

    genreDrama.innerHTML = topByGenre("drama").map(createFilmCard).join("") || "<p>No Drama films logged.</p>";
    genreComedy.innerHTML = topByGenre("comedy").map(createFilmCard).join("") || "<p>No Comedy films logged.</p>";
    genreHorror.innerHTML = topByGenre("horror").map(createFilmCard).join("") || "<p>No Horror films logged.</p>";
    genreAction.innerHTML = topByGenre("action").map(createFilmCard).join("") || "<p>No Action films logged.</p>";
    genreScifi.innerHTML = topByGenre("sci-fi").map(createFilmCard).join("") || "<p>No Sci-Fi films logged.</p>";

    // Render all logged films (most recent first)
    allFilmsList.innerHTML = entries
        .slice()
        .reverse()
        .map(createFilmCard)
        .join("");

    // Toggle buttons for showing/hiding lists
    document.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const target = document.getElementById(targetId);
            if (!target) return;

            if (target.style.display === "none" || !target.style.display) {
                target.style.display = "block";
                btn.textContent = "Hide";
            } else {
                target.style.display = "none";
                btn.textContent = "Show";
            }
        });
    });

    // Initially hide all lists except "All Logged Films"
    ["top100-list", "genre-drama", "genre-comedy", "genre-horror", "genre-action", "genre-scifi"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
});
