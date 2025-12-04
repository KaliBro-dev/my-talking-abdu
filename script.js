const character = document.getElementById('abdu-character');
const characterWrapper = document.getElementById('character-wrapper'); // New reference for floating
const danceBtn = document.getElementById('dance-btn');
const dressBtn = document.getElementById('dress-btn');
const bathBtn = document.getElementById('bath-btn');
const defaultBtn = document.getElementById('default-btn');

let currentAnimation = null; // Used for Dance/Image swap loops
let isAnimatedState = false; // Flag to stop floating when doing a special animation

// --- SPEECH FUNCTION (Unchanged) ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.2; 
        utterance.pitch = 1.5; 
        window.speechSynthesis.speak(utterance);
    }
}

// --- CONTINUOUS FLOATING MOTION (The Math/Fluid Effect) ---
let floatFrame = 0;
const floatSpeed = 0.05; // Speed of the sine wave motion
const floatAmplitude = 8; // Max displacement (8px up/down)

function startFloating() {
    if (!isAnimatedState) { // Only float when not performing a special action
        floatFrame += floatSpeed;
        
        // Use Math.sin for smooth, wave-like up and down motion
        const floatY = Math.sin(floatFrame) * floatAmplitude;
        
        // Apply the mathematical position to the wrapper
        characterWrapper.style.transform = `translateY(${floatY}px)`;
    }
    
    // Request the browser to run this function again on the next repaint
    requestAnimationFrame(startFloating);
}


// --- TAP/CLICK REACTION (The Bubble Pulse) ---
character.addEventListener('click', handleCharacterInteraction);
character.addEventListener('touchstart', handleCharacterInteraction);

function handleCharacterInteraction() {
    
    // Stop any special animation loops before pulsing
    stopAnimation(); 
    
    // 1. Apply the CSS animation class (triggers the bubblePulse)
    character.classList.add('is-pulsing');
    
    // 2. Play Audio/Speak
    const reactionSound = new Audio('reaction.mp3'); 
    reactionSound.play().catch(error => {});
    speak("Whoa! I feel bubbly!"); 

    // 3. Remove the class after the animation is finished (500ms from CSS)
    setTimeout(() => {
        character.classList.remove('is-pulsing');
    }, 500); 
}


// --- ANIMATION CONTROLS (Using the simpler image swapping for special states) ---

// Helper to stop image swapping animations
function stopAnimation() {
    if (currentAnimation) {
        clearInterval(currentAnimation);
        currentAnimation = null;
    }
}

// Helper to start image swapping and set the animated state flag
function startAction(frames, interval, speechText) {
    stopAnimation();
    isAnimatedState = true; // Stop the floating motion
    
    let frameIndex = 0;
    currentAnimation = setInterval(() => {
        character.src = frames[frameIndex];
        frameIndex = (frameIndex + 1) % frames.length; 
    }, interval); 

    if (speechText) {
        speak(speechText);
    }
}

// Action functions
function startDance() {
    const frames = ['abdu_dance_1.jpg', 'abdu_dance_2.jpg']; 
    startAction(frames, 150, "I'm dancing! Look at my moves!");
}

function dressUp() {
    const frames = ['abdu_hat_1.jpg', 'abdu_hat_2.jpg']; 
    startAction(frames, 300, "I look so stylish in this cap!");
}

function takeABath() {
    const frames = ['abdu_bath_1.jpg', 'abdu_bath_2.jpg']; 
    startAction(frames, 400, "Ah, the water is nice and warm. Don't look!");
}

function goDefault() {
    stopAnimation();
    isAnimatedState = false; // Allow floating motion to resume
    character.src = 'talking_abdu.jpg'; // Reset image
    speak("I'm back to normal!");
}

// --- ATTACH LISTENERS ---
danceBtn.addEventListener('click', startDance);
danceBtn.addEventListener('touchstart', startDance);
dressBtn.addEventListener('click', dressUp);
dressBtn.addEventListener('touchstart', dressUp);
bathBtn.addEventListener('click', takeABath);
bathBtn.addEventListener('touchstart', takeABath);
defaultBtn.addEventListener('click', goDefault);
defaultBtn.addEventListener('touchstart', goDefault);

// --- INITIAL START ---
window.onload = function() {
    goDefault(); // Set initial state
    startFloating(); // Begin the continuous floating animation
};
