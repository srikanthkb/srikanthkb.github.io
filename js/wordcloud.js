document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wordCloudCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Calculate center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Define words in a circular pattern around the center
    const words = [
        { text: 'AI', color: '#FF6B6B', angle: 0 },
        { text: 'ML', color: '#4ECDC4', angle: Math.PI * 0.4 },
        { text: 'Tesla', color: '#45B7D1', angle: Math.PI * 0.8 },
        { text: 'Gaming', color: '#96CEB4', angle: Math.PI * 1.2 },
        { text: 'Stocks', color: '#FFEEAD', angle: Math.PI * 1.6 }
    ];

    // Calculate positions in a circle
    const radius = 100; // Distance from center
    words.forEach(word => {
        word.x = centerX + radius * Math.cos(word.angle);
        word.y = centerY + radius * Math.sin(word.angle);
    });

    function drawCloud(x, y, width, height) {
        ctx.beginPath();
        
        // Create a more cloud-like shape
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x - 20, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 20, y, 20, 0, Math.PI * 2);
        ctx.arc(x, y - 15, 20, 0, Math.PI * 2);
        ctx.arc(x, y + 15, 20, 0, Math.PI * 2);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    }

    function drawStickFigure() {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        
        // Head
        ctx.beginPath();
        ctx.arc(centerX, centerY - 30, 20, 0, Math.PI * 2);
        ctx.stroke();
        
        // Body
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 10);
        ctx.lineTo(centerX, centerY + 40);
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(centerX - 30, centerY + 10);
        ctx.lineTo(centerX + 30, centerY + 10);
        ctx.stroke();
        
        // Legs
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 40);
        ctx.lineTo(centerX - 20, centerY + 80);
        ctx.moveTo(centerX, centerY + 40);
        ctx.lineTo(centerX + 20, centerY + 80);
        ctx.stroke();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stick figure
        drawStickFigure();
        
        // Draw words with clouds
        words.forEach(word => {
            drawCloud(word.x, word.y, 60, 30);
            
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = word.color;
            ctx.textAlign = 'center';
            ctx.fillText(word.text, word.x, word.y + 5);
        });
        
        requestAnimationFrame(draw);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Recalculate center and word positions
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        words.forEach((word, index) => {
            word.x = centerX + radius * Math.cos(word.angle);
            word.y = centerY + radius * Math.sin(word.angle);
        });
    });

    // Start drawing
    draw();
});