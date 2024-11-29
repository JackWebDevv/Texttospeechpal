// Open or create a database
let db;
const request = indexedDB.open("SpeechPalDB", 1); // 'SpeechPalDB' is the database name, '1' is the version

request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store (table) for saving sound data
    if (!db.objectStoreNames.contains("sounds")) {
        db.createObjectStore("sounds", { keyPath: "id", autoIncrement: true });
    }
};

request.onerror = function(event) {
    console.log("Error opening IndexedDB", event);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("IndexedDB opened successfully");
};
