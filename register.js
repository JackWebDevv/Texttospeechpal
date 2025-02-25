// Constants
const STORAGE_KEY = 'userProfile';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Handle form submission
document.getElementById("userProfileForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const userName = document.getElementById("registerUserName").value.trim();
        const userImage = document.getElementById("registerUserImage").files[0];

        // Validate inputs
        validateInputs(userName, userImage);

        // Process image
        const base64Image = await processImage(userImage);

        // Save profile data
        const profileData = {
            name: userName,
            image: base64Image,
            updatedAt: new Date().toISOString()
        };

        saveProfileData(profileData);
        updateNavBar(profileData);

        // Close modal if it exists
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (modal) {
            modal.hide();
        }

    } catch (error) {
        alert(error.message || 'An error occurred while saving your profile.');
        console.error('Profile save error:', error);
    }
});

// Validate form inputs
function validateInputs(userName, userImage) {
    if (!userName) {
        throw new Error('Please enter your username.');
    }

    if (!userImage) {
        throw new Error('Please upload a profile image.');
    }

    if (!userImage.type.startsWith('image/')) {
        throw new Error('Please upload a valid image file.');
    }

    if (userImage.size > MAX_IMAGE_SIZE) {
        throw new Error('Image size should be less than 5MB.');
    }
}

// Process image file
function processImage(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function (event) {
            resolve(event.target.result);
        };

        reader.onerror = function () {
            reject(new Error('Failed to process the image. Please try again.'));
        };

        reader.readAsDataURL(imageFile);
    });
}

// Save profile data to localStorage
function saveProfileData(profileData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
    } catch (error) {
        console.error('Storage error:', error);
        throw new Error('Failed to save profile data. Please try again.');
    }
}

// Update navbar with user data
function updateNavBar(profileData) {
    const greetingElement = document.getElementById("greeting");
    const profilePicElement = document.getElementById("profilePic");

    if (!greetingElement || !profilePicElement) {
        console.error('Navbar elements not found');
        return;
    }

    greetingElement.textContent = `Hello, ${profileData.name}!`;
    profilePicElement.src = profileData.image;
    profilePicElement.alt = `${profileData.name}'s profile picture`;
    profilePicElement.classList.remove("d-none");
}

// Add image preview functionality
document.getElementById("registerUserImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        try {
            validateInputs('placeholder', file); // Check file type and size
            
            const reader = new FileReader();
            reader.onload = function (e) {
                const previewContainer = document.getElementById("imagePreviewContainer") || createPreviewContainer();
                const previewImg = previewContainer.querySelector("img") || document.createElement("img");
                
                previewImg.src = e.target.result;
                previewImg.alt = "Profile picture preview";
                previewImg.className = "img-preview rounded mt-2";
                previewImg.style.maxWidth = "150px";
                previewImg.style.height = "auto";
                
                if (!previewContainer.contains(previewImg)) {
                    previewContainer.appendChild(previewImg);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            alert(error.message);
            this.value = ''; // Reset file input
        }
    }
});

// Create preview container
function createPreviewContainer() {
    const container = document.createElement("div");
    container.id = "imagePreviewContainer";
    container.className = "text-center mt-2";
    const form = document.getElementById("registerUserImage").closest("form");
    form.insertBefore(container, form.querySelector("button"));
    return container;
}

// Load profile data on page load
document.addEventListener("DOMContentLoaded", function () {
    try {
        const savedProfile = localStorage.getItem(STORAGE_KEY);
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            updateNavBar(profile);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
});
