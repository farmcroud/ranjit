document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cardForm');
    const profilePictureInput = document.getElementById('profilePicture');
    const profileImage = document.getElementById('profileImage');
    const userName = document.getElementById('userName');
    const downloadCard = document.getElementById('downloadCard');
    const card = document.getElementById('card'); // This is the entire card element

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        userName.textContent = name;

        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    downloadCard.addEventListener('click', () => {
        html2canvas(card, {
            useCORS: true, // To support cross-origin images
            scale: 2 // Increase resolution for better image quality
        }).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg', 1.0); // Highest quality
            link.download = 'profile-card.jpg';
            link.click();
        });
    });
});
