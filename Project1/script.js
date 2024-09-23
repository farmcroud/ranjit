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
        // Set a fixed canvas size with a specific aspect ratio to maintain uniformity
        const scaleFactor = 2; // Increase this factor for higher resolution
        const width = 600; // Fixed width (same across all devices)
        const height = 760; // Fixed height (same across all devices)
        const borderRadius = 10 * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        // Draw background image
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, borderRadius); // Ensure rounded corners
        ctx.clip();
        ctx.drawImage(backgroundImage, 0, 0, width, height); // Fixed background size
        ctx.restore();

        // Draw profile picture
        const profileImageElement = document.getElementById('profileImage');
        const profileImageX = (width - 240) / 2; // Fixed position for image
        const profileImageY = 100; // Fixed top margin for image
        const profileImageSize = 240;

        ctx.save();
        ctx.beginPath();
        ctx.arc(profileImageX + profileImageSize / 2, profileImageY + profileImageSize / 2, profileImageSize / 2, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(profileImageElement, profileImageX, profileImageY, profileImageSize, profileImageSize);
        ctx.restore();

        // Draw name
        ctx.font = `${28 * scaleFactor}px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`; // Use exact font size
        ctx.fillStyle = '#fff'; // Use fixed text color
        ctx.textAlign = 'center';
        ctx.fillText(userName.textContent, width / 2, profileImageY + profileImageSize + 50); // Fixed position for name
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
