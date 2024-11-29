document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get user input
    const name = document.getElementById("nameInput").value;
    const imageFile = document.getElementById("imageInput").files[0];

    // Update UI
    const userNameElement = document.getElementById("userName");
    const userImageElement = document.getElementById("userImage");

    userNameElement.textContent = `Hi ${name}`;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userImageElement.src = e.target.result;
            userImageElement.classList.remove("d-none");
        };
        reader.readAsDataURL(imageFile);
    }

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
    modal.hide();
});
