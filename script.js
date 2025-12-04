const character = document.getElementById('abdu-character');

// --- SPEECH FUNCTION ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.2; 
        utterance.pitch = 1.5; 
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Speech Synthesis not supported.");
    }
}

// --- INTERACTION HANDLER ---
character.addEventListener('click', () => {
    
    // 1. Visual Reaction
    character.style.transform = 'scale(1.05)'; 
    setTimeout(() => {
        character.style.transform = 'scale(1.0)';
    }, 100);

    // 2. Audio Reaction 
    // CRUCIAL CHECK: File name must match exactly.
    const reactionSound = new Audio('reaction.mp3'); 
    
    reactionSound.play().catch(error => {
        console.warn("Audio playback failed:", error);
    });

    // 3. Make him talk!
    speak("Ouch! That tickles! Click me again!"); 
});
