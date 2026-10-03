const videoElement = document.getElementById('webcam');
const fallbackMsg = document.getElementById('video-fallback-msg');
const translationOutput = document.getElementById('translation-output');
const actionBtn = document.getElementById('action-btn');
const nextBtn = document.getElementById('next-btn');
const statusText = document.getElementById('status-text');

let cameraStream = null;
let currentSentenceIndex = 0;

// Conversational Phrases Dataset Matrix
const conversationalLibrary = [
    "Hello, good morning! It is wonderful to meet you today.",
    "Can you please help me? I am looking for assistance.",
    "Thank you so much for visiting our science exhibition project booth.",
    "Excuse me, where is the nearest emergency exit located?",
    "Yes, I completely understand what you are explaining to me.",
    "I need a sign language interpreter to help communicate this message.",
    "Please drive carefully and have a safe journey back home.",
    "I love you all for supporting this accessibility technology creation!"
];

// Universal Absolute Page Navigator
function directNavigate(pageId) {
    const pages = document.querySelectorAll('.page');
    for(let i = 0; i < pages.length; i++) {
        pages[i].style.setProperty('display', 'none', 'important');
    }
    
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.style.setProperty('display', 'flex', 'important');
    }
}

// Media Camera Stream Processor & Controller
async function triggerCameraPipeline() {
    directNavigate('page-translator');
    
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" },
            audio: false 
        });
        
        videoElement.srcObject = cameraStream;
        videoElement.style.display = 'block';
        fallbackMsg.style.display = 'none';
        statusText.innerText = "Dynamic gesture stream active...";
    } catch (err) {
        console.error("Camera system offline. Engaging fallback setup.", err);
        fallbackMsg.innerText = "[Camera blocked - Exhibition Mode Active]";
        statusText.innerText = "Exhibition Simulator Ready";
    }
}

// Voice Output Synthesis & Visual Translator Display
function showTranslation() {
    const currentPhrase = conversationalLibrary[currentSentenceIndex];
    translationOutput.innerText = currentPhrase;
    statusText.innerText = "Sentence Interpreted";

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); 
        const speechNode = new SpeechSynthesisUtterance(currentPhrase);
        speechNode.lang = 'en-US';
        speechNode.rate = 0.95; 
        window.speechSynthesis.speak(speechNode);
    }

    actionBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

// Iteration Management
function nextTranslation() {
    currentSentenceIndex = (currentSentenceIndex + 1) % conversationalLibrary.length;
    translationOutput.innerText = "...";
    statusText.innerText = "Awaiting next hand sign structure...";
    actionBtn.style.display = 'block';
    nextBtn.style.display = 'none';
}

// Reset Pipeline Tracking State
function backToHome() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    videoElement.style.display = 'none';
    fallbackMsg.style.display = 'block';
    fallbackMsg.innerText = "Loading Video Stream...";
    translationOutput.innerText = "...";
    actionBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    directNavigate('page-welcome');
}

// Global Execution Operations Binder
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-start").addEventListener("click", () => directNavigate('page-permission'));
    document.getElementById("btn-allow").addEventListener("click", triggerCameraPipeline);
    document.getElementById("btn-cancel").addEventListener("click", () => directNavigate('page-welcome'));
    document.getElementById("action-btn").addEventListener("click", showTranslation);
    document.getElementById("next-btn").addEventListener("click", nextTranslation);
    document.getElementById("btn-home").addEventListener("click", backToHome);
    document.getElementById("btn-exit").addEventListener("click", () => directNavigate('page-exit'));
    document.getElementById("btn-restart").addEventListener("click", () => location.reload());
});
  
