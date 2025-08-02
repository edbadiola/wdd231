
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

