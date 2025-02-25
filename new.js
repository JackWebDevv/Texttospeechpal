// Function to create and save a new sound button
document.getElementById('addSoundForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        // Get form values
        const soundName = document.getElementById('soundName').value.trim();
        const imageFile = document.getElementById('soundImage').files[0];

        // Validate inputs
        if (!soundName) {
            throw new Error('Please enter a sound name.');
        }

        if (!imageFile) {
            throw new Error('Please select an image file.');
        }

        // Validate file type
        if (!imageFile.type.startsWith('image/')) {
            throw new Error('Please select a valid image file.');
        }

        // Convert image to base64
        const base64Image = await convertImageToBase64(imageFile);

        // Create sound data object
        const soundData = {
            id: Date.now().toString(),
            name: soundName,
            image: base64Image,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        saveSound(soundData);

        // Add to UI
        addSoundToUI(soundData);

        // Reset form and close modal
        resetFormAndModal();

    } catch (error) {
        alert(error.message || 'An error occurred while adding the sound.');
        console.error('Error adding sound:', error);
    }
});

// Convert image file to base64
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to process the image.'));
        reader.readAsDataURL(file);
    });
}

// Save sound to localStorage
function saveSound(soundData) {
    try {
        const sounds = JSON.parse(localStorage.getItem('sounds') || '[]');
        sounds.push(soundData);
        localStorage.setItem('sounds', JSON.stringify(sounds));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw new Error('Failed to save sound data.');
    }
}

// Add sound to UI
function addSoundToUI(soundData) {
    const gridContainer = document.querySelector('.row.row-cols-6');
    
    const colDiv = document.createElement('div');
    colDiv.classList.add('col', 'button-container');
    colDiv.dataset.soundId = soundData.id;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'grid-button', 'button-with-sections');
    button.setAttribute('data-text', soundData.name);

    const buttonImageContainer = document.createElement('div');
    buttonImageContainer.classList.add('button-image-container');

    const img = document.createElement('img');
    img.src = soundData.image;
    img.alt = soundData.name;
    img.loading = 'lazy'; // Add lazy loading for better performance

    const buttonTextContainer = document.createElement('div');
    buttonTextContainer.classList.add('button-text-container');
    buttonTextContainer.textContent = soundData.name;

    // Append elements
    buttonImageContainer.appendChild(img);
    button.appendChild(buttonImageContainer);
    button.appendChild(buttonTextContainer);
    colDiv.appendChild(button);
    gridContainer.appendChild(colDiv);

    // Attach text-to-speech functionality
    attachSpeechToButton(button, soundData.name);
}

// Attach speech functionality to button
function attachSpeechToButton(button, text) {
    if ('speechSynthesis' in window) {
        button.addEventListener('click', () => {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        });
    } else {
        button.addEventListener('click', () => {
            alert('Sorry, your browser does not support Text-to-Speech functionality.');
        });
        console.warn('Speech synthesis not supported');
    }
}

// Reset form and close modal
function resetFormAndModal() {
    document.getElementById('addSoundForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addSoundModal'));
    if (modal) {
        modal.hide();
    }
}

// Load saved sounds on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        const sounds = JSON.parse(localStorage.getItem('sounds') || '[]');
        sounds.forEach(sound => addSoundToUI(sound));
    } catch (error) {
        console.error('Error loading saved sounds:', error);
    }
});
