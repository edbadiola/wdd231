import { places } from '../data/places.mjs';

const allPlaces = document.getElementById("allplaces");

places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("place-card");

    card.innerHTML = `
  <img src="images/${place.image}" alt="${place.title}" loading="lazy" />
  <div class="place-card-content">
    <h2>${place.title}</h2>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <a href="#" class="learn-more-btn">Learn More</a>
  </div>
`;


    // Add event listener to open modal
    card.querySelector(".learn-more-btn").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("modal-title").textContent = place.title;
        document.getElementById("modal-address").textContent = place.address;
        document.getElementById("modal-description").textContent = place.description;
        document.getElementById("modal-image").src = `images/${place.image}`;
        document.getElementById("modal-image").alt = place.title;
        document.getElementById("modal").style.display = "block";
    });

    allPlaces.appendChild(card);
});

// Add these OUTSIDE the loop
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
