window.addEventListener('load', () => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawStars() {
        let numberOfStars = 100; // Nombre d'étoiles

        for (let i = 0; i < numberOfStars; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let radius = Math.random() * 2; // Taille des étoiles

            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    drawStars();

    // Redimensionner le canvas si la fenêtre change de taille
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStars();
    });
});
