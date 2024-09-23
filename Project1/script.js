document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cardForm');
    const profilePictureInput = document.getElementById('profilePicture');
    const profileImage = document.getElementById('profileImage');
    const userName = document.getElementById('userName');
    const downloadCard = document.getElementById('downloadCard');
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');

    const card = document.getElementById('card');
    const backgroundImageUrl = getComputedStyle(card).backgroundImage.slice(5, -2); // Extract URL from CSS

    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageUrl;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        userName.textContent = name;

        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                profileImage.onload = function() {
                    generateCard();
                };
            };
            reader.readAsDataURL(file);
        } else {
            generateCard();
        }
    });

    downloadCard.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 1.0); // Max quality
        link.download = 'profile-card.jpg';
        link.click();
    });

    function generateCard() {
        // Set canvas size to match the card's visual size
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;

        canvas.width = cardWidth;
        canvas.height = cardHeight;

        const scaleFactor = 2; // Scale factor for higher resolution download

        // Adjust the canvas for high-resolution output
        canvas.width = cardWidth * scaleFactor;
        canvas.height = cardHeight * scaleFactor;
        ctx.scale(scaleFactor, scaleFactor); // Apply the scaling to the context

        // Draw background image
        backgroundImage.onload = function() {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(0, 0, cardWidth, cardHeight, 10); // Match the card's rounded corners
            ctx.clip();
            ctx.drawImage(backgroundImage, 0, 0, cardWidth, cardHeight); // Match background to card
            ctx.restore();

            // Draw profile picture
            const profileImageElement = document.getElementById('profileImage');
            const profileImageX = (cardWidth - 120) / 2;
            const profileImageY = 80; // Adjust this to match your card design

            ctx.save();
            ctx.beginPath();
            ctx.arc(profileImageX + 60, profileImageY + 60, 60, 0, 2 * Math.PI); // Circular profile picture
            ctx.clip();
            ctx.drawImage(profileImageElement, profileImageX, profileImageY, 120, 120); // Match profile picture size
            ctx.restore();

            // Draw name
            ctx.font = `22px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
            ctx.fillStyle = '#fff'; // Use white color as per CSS
            ctx.textAlign = 'center';
            ctx.fillText(userName.textContent, cardWidth / 2, profileImageY + 160); // Position name below profile picture
        };
    }

    // Extend CanvasRenderingContext2D to support rounded rectangles
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
        return this;
    };
});
