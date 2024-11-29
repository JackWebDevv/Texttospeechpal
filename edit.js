let isEditMode = false;

document.getElementById('editModeToggle').addEventListener('click', function () {
    isEditMode = !isEditMode;

    const buttons = document.querySelectorAll('.grid-button');
    buttons.forEach(button => {
        if (isEditMode) {
            // Add Edit and Remove icons
            button.classList.add('editable');

            // Create Remove Icon
            if (!button.querySelector('.remove-icon')) {
                const removeIcon = document.createElement('span');
                removeIcon.textContent = '❌'; // Or use an icon font like FontAwesome
                removeIcon.classList.add('remove-icon');
                removeIcon.style.cssText = 'position: absolute; top: 5px; right: 5px; cursor: pointer; color: red;';
                removeIcon.addEventListener('click', () => {
                    button.parentElement.remove(); // Remove the button's container
                });
                button.appendChild(removeIcon);
            }

            // Make button text editable
            const buttonText = button.querySelector('.button-text-container');
            buttonText.setAttribute('contenteditable', 'true');
            buttonText.style.border = '1px dashed #ccc';
        } else {
            // Remove editable styles and icons
            button.classList.remove('editable');
            const removeIcon = button.querySelector('.remove-icon');
            if (removeIcon) {
                removeIcon.remove();
            }

            // Disable text editing
            const buttonText = button.querySelector('.button-text-container');
            buttonText.removeAttribute('contenteditable');
            buttonText.style.border = 'none';
        }
    });

    // Update Edit Button Text
    this.textContent = isEditMode ? 'Save Changes' : 'Edit';
});

// Enable Drag-and-Drop Reordering using Sortable.js
const buttonGrid = document.getElementById('buttonGrid');

if (typeof Sortable !== 'undefined') {
    new Sortable(buttonGrid, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Class for dragging item
        handle: '.grid-button',      // Only allow dragging via buttons
    });
} else {
    console.warn('Sortable.js is not loaded. Please include it in your project.');
}
