// Toggle nav menu
document.getElementById("menu").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("open");
});

// Year and Last Modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members from JSON and store
let members = [];

async function loadMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    members = data.members;
    displayGridView();
}
loadMembers();

// Grid view function (with images)
function displayGridView() {
    const directory = document.getElementById("directory");
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directory.appendChild(card);
    });
}

// List view function (no images)
function displayListView() {
    const directory = document.getElementById("directory");
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directory.appendChild(card);
    });
}

// Button listeners
document.getElementById("gridBtn").addEventListener("click", displayGridView);
document.getElementById("listBtn").addEventListener("click", displayListView);
