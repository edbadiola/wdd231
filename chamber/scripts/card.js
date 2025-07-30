import { places } from '../data/places.mjs';

const allCards = document.querySelectorAll('.place-card');

places.forEach((place, index) => {
    if (index < allCards.length) {
        const card = allCards[index];

        // Create image
        const img = document.createElement('img');
        img.src = `images/${place.image}`;
        img.alt = place.title;
        card.appendChild(img);

        // Title
        const title = document.createElement('h2');
        title.textContent = place.title;
        card.appendChild(title);

        // Address
        const address = document.createElement('address');
        address.textContent = place.address;
        card.appendChild(address);

        // Description
        const desc = document.createElement('p');
        desc.textContent = place.description;
        card.appendChild(desc);
    }
});
