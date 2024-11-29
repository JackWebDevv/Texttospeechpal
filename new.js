document.getElementById('addSoundForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const soundName = document.getElementById('soundName').value;
    const imageFile = document.getElementById('soundImage').files[0]; // Get the uploaded image

    // Validate the sound name
    if (!soundName) {
        alert('Please enter a sound name.');
        return;
    }

    // Get the grid container
    const gridContainer = document.querySelector('.row.row-cols-6');

    // Create the new button structure
    const colDiv = document.createElement('div');
    colDiv.classList.add('col', 'button-container');

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'grid-button', 'button-with-sections');
    button.setAttribute('data-text', soundName);

    const buttonImageContainer = document.createElement('div');
    buttonImageContainer.classList.add('button-image-container');

    const img = document.createElement('img');
    if (imageFile) {
        img.src = URL.createObjectURL(imageFile); // Use the uploaded image as the source
    } else {
        img.src = 'images/default-placeholder.png'; // Use a default placeholder if no image is provided
    }
    img.alt = soundName;

    const buttonTextContainer = document.createElement('div');
    buttonTextContainer.classList.add('button-text-container');
    buttonTextContainer.textContent = soundName;

    // Append elements
    buttonImageContainer.appendChild(img);
    button.appendChild(buttonImageContainer);
    button.appendChild(buttonTextContainer);
    colDiv.appendChild(button);
    gridContainer.appendChild(colDiv);

    // Attach text-to-speech functionality to the new button
    if ('speechSynthesis' in window) {
        button.addEventListener('click', () => {
            const utterance = new SpeechSynthesisUtterance(soundName);
            speechSynthesis.speak(utterance);
        });
    } else {
        alert('Sorry, your browser does not support Text-to-Speech functionality.');
    }

    // Reset the form
    event.target.reset();

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addSoundModal'));
    modal.hide();
});
