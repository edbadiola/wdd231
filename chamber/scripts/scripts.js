// Toggle nav menu
document.getElementById("menu").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("open");
});

// Year and Last Modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


// Load members from JSON
async function loadMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    data.members.forEach(member => {
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
loadMembers();
  