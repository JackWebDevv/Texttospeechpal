// When the form is submitted, save user data to localStorage and update the navbar
document.getElementById("userProfileForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form reload

    const userName = document.getElementById("registerUserName").value.trim();
    const userImage = document.getElementById("registerUserImage").files[0];

    if (!userName) {
        alert("Please enter your username.");
        return;
    }

    if (!userImage) {
        alert("Please upload a profile image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const base64Image = event.target.result;

        // Create a profile object
        const profileData = {
            name: userName,
            image: base64Image
        };

        // Save to localStorage
        localStorage.setItem("userProfile", JSON.stringify(profileData));

        // Update the navbar with user data
        updateNavBar(profileData);
    };

    reader.onerror = function () {
        alert("Failed to process the image. Please try again.");
    };

    reader.readAsDataURL(userImage);
});

// Function to update the navbar with the user's greeting and profile picture
function updateNavBar(profileData) {
    const greetingElement = document.getElementById("greeting");
    const profilePicElement = document.getElementById("profilePic");

    // Update the greeting text
    greetingElement.textContent = `Hello, ${profileData.name}!`;

    // Update the profile picture
    profilePicElement.src = profileData.image;
    profilePicElement.classList.remove("d-none");
}

// Load the user data from localStorage on page load and update the navbar
document.addEventListener("DOMContentLoaded", function () {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        updateNavBar(profile);
    }
});
