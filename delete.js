// Delete a sound from the database
function deleteSoundFromDB(soundId) {
    const transaction = db.transaction(["sounds"], "readwrite");
    const store = transaction.objectStore("sounds");

    const request = store.delete(soundId); // Pass the ID of the sound to delete

    request.onsuccess = function() {
        console.log("Sound deleted successfully!");
        fetchAllSoundsFromDB(); // Refresh the list after deletion
    };

    request.onerror = function(event) {
        console.log("Error deleting sound", event);
    };
}
