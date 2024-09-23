document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cardForm');
    const downloadCard = document.getElementById('downloadCard');
    const cardElement = document.getElementById('card'); // The card element to capture

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const profilePictureInput = document.getElementById('profilePicture');
        const profileImage = document.getElementById('profileImage');

        // Update the name on the card
        document.getElementById('userName').textContent = name;

        // If a profile picture is uploaded, update it on the card
        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    downloadCard.addEventListener('click', () => {
        const scaleFactor = window.devicePixelRatio || 2; // Adjust for high-DPI screens

        html2canvas(cardElement, { scale: scaleFactor, useCORS: true }).then(canvas => {
            // Ensure the canvas is in high resolution for devices with different pixel ratios
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg', 1.0); // High-quality JPEG
            link.download = 'profile-card.jpg';
            link.click();
        });
    });
});
