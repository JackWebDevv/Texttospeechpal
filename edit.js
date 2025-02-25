// Handle edit mode toggle
document.getElementById("editModeToggle").addEventListener("click", function () {
    try {
        // Get current profile information
        const profileData = getCurrentProfileData();
        
        if (!profileData) {
            throw new Error('No profile data found. Please register first.');
        }

        // Pre-fill form fields
        prefillFormFields(profileData);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('registerModal'));
        modal.show();
    } catch (error) {
        alert(error.message);
        console.error('Edit mode error:', error);
    }
});

// Get current profile data
function getCurrentProfileData() {
    const greetingElement = document.getElementById("greeting");
    const profilePicElement = document.getElementById("profilePic");

    if (!greetingElement || !profilePicElement) {
        throw new Error('Profile elements not found');
    }

    const currentName = greetingElement.textContent
        .replace("Hello, ", "")
        .replace("!", "")
        .trim();

    if (!currentName || !profilePicElement.src) {
        return null;
    }

    return {
        name: currentName,
        image: profilePicElement.src
    };
}

// Pre-fill form fields with current data
function prefillFormFields(profileData) {
    const nameInput = document.getElementById("registerUserName");
    if (!nameInput) {
        throw new Error('Name input field not found');
    }

    // Set name
    nameInput.value = profileData.name;

    // Create or update image preview
    updateImagePreview(profileData.image);
}

// Update image preview
function updateImagePreview(imageUrl) {
    const form = document.getElementById("registerUserImage").closest("form");
    let previewContainer = document.getElementById("imagePreviewContainer");

    if (!previewContainer) {
        previewContainer = document.createElement("div");
        previewContainer.id = "imagePreviewContainer";
        previewContainer.className = "text-center mt-2";
        form.insertBefore(previewContainer, form.querySelector("button"));
    }

    let previewImg = previewContainer.querySelector("img");
    if (!previewImg) {
        previewImg = document.createElement("img");
        previewImg.className = "img-preview rounded mt-2";
        previewImg.style.maxWidth = "150px";
        previewImg.style.height = "auto";
        previewContainer.appendChild(previewImg);
    }

    previewImg.src = imageUrl;
    previewImg.alt = "Current profile picture";
}
