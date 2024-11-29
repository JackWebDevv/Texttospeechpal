// Fetch sounds based on a condition (e.g., filtering by sound name)
function searchSoundsFromDB(searchTerm) {
    const transaction = db.transaction(["sounds"], "readonly");
    const store = transaction.objectStore("sounds");

    const index = store.index("name"); // Assume there's an index on the 'name' property
    const request = index.openCursor(IDBKeyRange.bound(searchTerm, searchTerm + "\uffff")); // Match the search term

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            console.log("Found sound:", cursor.value);
            cursor.continue(); // Move to the next item
        }
    };
}
