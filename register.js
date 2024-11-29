// Handle form submissions for profile registration
document.getElementById("userProfileForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const userName = document.getElementById("userName").value;
    const userImage = document.getElementById("userImage").files[0];

    // Save the user profile to IndexedDB
    saveProfileToDB(userName, userImage);

    // Update profile in the UI after saving
    const profileImageUrl = URL.createObjectURL(userImage);
    document.getElementById("userName").textContent = userName;
    const userImageElement = document.getElementById("userImage");
    userImageElement.src = profileImageUrl;
    userImageElement.classList.remove("d-none");

    // Close the modal
    $('#registerModal').modal('hide');
});


document.getElementById('saveButton').addEventListener('click', function(event) {
    // Prevent form submission if needed
    event.preventDefault(); 

    // Your save functionality here
    console.log('Button clicked');
});