// Save data to IndexedDB
function saveSoundToDB(soundName, soundImage) {
    const transaction = db.transaction(["sounds"], "readwrite"); // Start a transaction on the "sounds" object store
    const store = transaction.objectStore("sounds");

    const soundData = {
        name: soundName,
        image: soundImage,
        dateAdded: new Date().toISOString() // Optional: Add a timestamp
    };

    const request = store.add(soundData); // Add the data to the object store

    request.onsuccess = function() {
        console.log("Sound saved to DB successfully!");
    };

    request.onerror = function(event) {
        console.log("Error saving sound to DB", event);
    };
}

// Example usage: Call this when a form is submitted
document.getElementById("addSoundForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const soundName = document.getElementById("soundName").value;
    const soundImage = document.getElementById("soundImage").files[0]; // Get the image file

    // You can either save the file directly or save the file URL (if uploading it somewhere else)
    saveSoundToDB(soundName, soundImage);
});
