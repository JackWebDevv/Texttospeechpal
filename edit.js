document.getElementById("editModeToggle").addEventListener("click", function () {
    // Open the modal (Bootstrap handles this via `data-bs-toggle` automatically)

    // Get the current profile information from the navbar
    const greetingElement = document.getElementById("greeting");
    const profilePicElement = document.getElementById("profilePic");

    const currentName = greetingElement.textContent.replace("Hello, ", "").replace("!", "").trim();
    const currentImage = profilePicElement.src;

    // Pre-fill the modal form fields with current values
    document.getElementById("registerUserName").value = currentName;

    if (currentImage) {
        // Display the image as a preview (if available)
        const fileInput = document.getElementById("registerUserImage");
        const previewImg = document.createElement("img");
        previewImg.src = currentImage;
        previewImg.alt = "Current Profile Picture";
        previewImg.style.width = "100px";
        previewImg.style.height = "100px";
        previewImg.classList.add("mt-2", "d-block");

        // Append the preview to the modal if not already appended
        const form = fileInput.closest("form");
        if (!form.querySelector("img")) {
            form.appendChild(previewImg);
        }
    }
});
