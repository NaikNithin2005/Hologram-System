const voiceDisplay = document.getElementById('voice-display');
const statusText = document.getElementById('status-text');

// Define processCommand since we are removing websocket_client.js
window.processCommand = function(cmd) {
    switch(cmd) {
        case 'ROTATE':
        case 'ROTATE_RIGHT':
            window.rotateRight ? window.rotateRight() : window.rotateObject();
            break;
            
        case 'ROTATE_LEFT':
            window.rotateLeft ? window.rotateLeft() : window.rotateObject();
            break;
            
        case 'STOP':
        case 'CLOSED_FIST':
            window.stopObject();
            break;
            
        case 'NEXT_OBJECT':
        case 'SWIPE_LEFT':
            window.nextObject();
            break;

        case 'PREV_OBJECT':
        case 'SWIPE_RIGHT':
            window.previousObject();
            break;
            
        case 'ZOOM':
        case 'PINCH':
            // Zoom is handled dynamically by pinch now, but if voice triggers it:
            window.zoomObject ? window.zoomObject() : null;
            break;
    }
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true; 
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log("Browser Voice Recognition started.");
        statusText.innerText = 'System Online (Local AI)';
        statusText.classList.remove('offline');
        statusText.classList.add('online');
    };

    recognition.onresult = function(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        
        console.log("🎤 Heard: ", transcript);
        let command = null;
        
        if (transcript.match(/rotate right|spin right|turn right/)) command = 'ROTATE_RIGHT';
        else if (transcript.match(/rotate left|spin left|turn left/)) command = 'ROTATE_LEFT';
        else if (transcript.match(/rotate|spin|turn|start/)) command = 'ROTATE';
        else if (transcript.match(/zoom|closer|bigger/)) command = 'ZOOM';
        else if (transcript.match(/previous|back|before/)) command = 'PREV_OBJECT';
        else if (transcript.match(/next|change|switch|another/)) command = 'NEXT_OBJECT';
        else if (transcript.match(/stop|halt|pause|wait/)) command = 'STOP';
        
        if (command) {
            voiceDisplay.innerText = `"${transcript}" -> ${command}`;
            window.processCommand(command);
        } else {
            voiceDisplay.innerText = `heard: ${transcript}`;
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
            voiceDisplay.innerText = "Microphone Permission Denied";
        }
    };

    recognition.onend = function() {
        // Auto-restart listening if it stops
        setTimeout(() => {
            try {
                recognition.start();
            } catch(e) {}
        }, 500);
    };

    let voiceInitialized = false;
    
    // Start it up - Browsers require user interaction to use the mic reliably!
    const startVoice = () => {
        if (!voiceInitialized) {
            try {
                recognition.start();
                voiceInitialized = true;
                statusText.innerText = 'System Online (Listening)';
            } catch(e) {}
        }
    };

    // Try starting immediately
    startVoice();
    
    // Fallback: Start on any click if blocked by browser policy
    document.body.addEventListener('click', startVoice);
    
} else {
    console.warn("Speech Recognition API not supported in this browser.");
    voiceDisplay.innerText = "Voice unsupported in this browser";
}
