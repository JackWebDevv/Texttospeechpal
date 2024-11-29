// Fetch all sounds from the database
function fetchAllSoundsFromDB() {
    const transaction = db.transaction(["sounds"], "readonly"); // Start a read-only transaction
    const store = transaction.objectStore("sounds");

    const request = store.getAll(); // Get all items in the "sounds" object store

    request.onsuccess = function(event) {
        const sounds = event.target.result;
        console.log("Sounds fetched from DB", sounds);

        // You can now display these sounds on the page
        sounds.forEach(sound => {
            // Example: Add the sound name and image to your grid of buttons
            addSoundToUI(sound);
        });
    };

    request.onerror = function(event) {
        console.log("Error fetching sounds from DB", event);
    };
}

// Example function to add a sound to the UI
function addSoundToUI(sound) {
    const soundContainer = document.createElement("div");
    soundContainer.classList.add("col", "button-container");

    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "grid-button", "button-with-sections");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("button-image-container");

    const img = document.createElement("img");
    img.src = sound.image; // Add the image path or URL
    img.alt = sound.name;
    imageContainer.appendChild(img);

    const textContainer = document.createElement("div");
    textContainer.classList.add("button-text-container");
    textContainer.textContent = sound.name;

    button.appendChild(imageContainer);
    button.appendChild(textContainer);
    soundContainer.appendChild(button);

    document.querySelector(".row.row-cols-6.g-2").appendChild(soundContainer); // Append to the grid
}

// Example usage: Fetch all sounds when the page loads
window.onload = function() {
    fetchAllSoundsFromDB();
};
