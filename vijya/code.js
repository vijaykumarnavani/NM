document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('digitCanvas');
    const ctx = canvas.getContext('2d');
    const recognizeBtn = document.getElementById('recognizeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const predictionText = document.getElementById('predictionText');
    const loader = document.getElementById('loader');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // --- Canvas Setup ---
    function initializeCanvas() {
        // Set drawing style
        ctx.strokeStyle = '#FFFFFF'; // White drawing color
        ctx.lineWidth = 18; // Thickness of the line
        ctx.lineCap = 'round'; // Rounded ends for smoother lines
        ctx.lineJoin = 'round'; // Rounded corners

        // Clear canvas initially
        clearCanvas();
    }

    // --- Drawing Functions ---
    function getMousePos(canvasDom, event) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function startDrawing(e) {
        e.preventDefault(); // Prevent scrolling on touch
        isDrawing = true;
        let pos;
        if (e.touches) {
            pos = getTouchPos(canvas, e);
        } else {
            pos = getMousePos(canvas, e);
        }
        [lastX, lastY] = [pos.x, pos.y];
        // Optional: Draw a dot on click/tap
        // ctx.beginPath();
        // ctx.arc(lastX, lastY, ctx.lineWidth / 2, 0, Math.PI * 2);
        // ctx.fillStyle = ctx.strokeStyle;
        // ctx.fill();
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling on touch

        let pos;
         if (e.touches) {
            pos = getTouchPos(canvas, e);
        } else {
            pos = getMousePos(canvas, e);
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        [lastX, lastY] = [pos.x, pos.y];
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
        }
    }

    // --- Canvas Clearing ---
    function clearCanvas() {
        ctx.fillStyle = '#0f0f1a'; // Match canvas background color
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill, not just clear
        predictionText.textContent = '?'; // Reset prediction
        predictionText.style.color = '#50fa7b'; // Reset color
        predictionText.style.textShadow = '0 0 15px #50fa7b, 0 0 25px #50fa7b'; // Reset glow
        loader.style.display = 'none'; // Hide loader
    }

    // --- Recognition (Simulated) ---
    function recognizeDigit() {
        // Show loading state
        predictionText.textContent = '';
        loader.style.display = 'block';
        recognizeBtn.disabled = true;
        clearBtn.disabled = true;

        // --- !!! IMPORTANT PLACEHOLDER !!! ---
        // In a real application, you would:
        // 1. Get image data: `const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);`
        // 2. Preprocess imageData:
        //    - Resize to model input size (e.g., 28x28 for MNIST)
        //    - Convert to grayscale
        //    - Normalize pixel values (e.g., 0 to 1)
        //    - Potentially invert colors (if model expects white digit on black bg)
        // 3. Send data to backend OR feed to TensorFlow.js model
        // 4. Receive prediction result

        // Simulate network delay and recognition process
        setTimeout(() => {
            // Simulate receiving a prediction (replace with actual result)
            const simulatedPrediction = Math.floor(Math.random() * 10); // Random digit 0-9

            // Display the result
            predictionText.textContent = simulatedPrediction;
            predictionText.style.color = '#50fa7b'; // Green for success
            predictionText.style.textShadow = '0 0 15px #50fa7b, 0 0 25px #50fa7b';

            // Hide loader and re-enable buttons
            loader.style.display = 'none';
            recognizeBtn.disabled = false;
            clearBtn.disabled = false;

        }, 1500); // Simulate 1.5 seconds processing time
    }

    // --- Event Listeners ---
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing); // Stop if mouse leaves canvas

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    // Button events
    recognizeBtn.addEventListener('click', recognizeDigit);
    clearBtn.addEventListener('click', clearCanvas);

    // --- Initialize ---
    initializeCanvas();
});