const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Non-rotated rectangle
ctx.fillStyle = 'gray';
ctx.fillRect(80, 60, 140, 30);

// Matrix transformation
ctx.translate(150, 75);
ctx.rotate(Math.PI / 2);
ctx.translate(-150, -75);

// Rotated rectangle
ctx.fillStyle = 'red';
ctx.fillRect(80, 60, 140, 30);