// script.js (Find the existing click event listener)

// --- DEFAULT CLICK/TOUCH REACTION ---
character.addEventListener('click', handleCharacterInteraction);
character.addEventListener('touchstart', handleCharacterInteraction); // ADD THIS LINE

function handleCharacterInteraction() {
    // 1. Visual Reaction
    character.style.transform = 'scale(1.05)'; 
    setTimeout(() => {
        character.style.transform = 'scale(1.0)';
    }, 100);

    // 2. Audio Reaction and Speak
    const reactionSound = new Audio('reaction.mp3'); 
    reactionSound.play().catch(error => {
        console.warn("Audio playback failed:", error);
    });
    speak("Ouch! That tickles! Click me again!"); 
}

// Then, update your button listeners to also include touchstart:
danceBtn.addEventListener('click', startDance);
danceBtn.addEventListener('touchstart', startDance); // ADD THIS LINE

dressBtn.addEventListener('click', dressUp);
dressBtn.addEventListener('touchstart', dressUp); // ADD THIS LINE

// ... and so on for all buttons ...
