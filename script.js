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


const videoElement = document.getElementById('webcam');
const fallbackMsg = document.getElementById('video-fallback-msg');
const translationOutput = document.getElementById('translation-output');
const actionBtn = document.getElementById('action-btn');
const nextBtn = document.getElementById('next-btn');
const statusText = document.getElementById('status-text');

let cameraStream = null;

// Explicit Conversational Map Matrix
const signMapping = {
    'HELLO': "Hello, good morning! It is wonderful to meet you today.",
    'THANK_YOU': "Thank you so much for visiting our science exhibition project booth.",
    'PLEASE': "Can you please help me? I am looking for assistance.",
    'YES': "Yes, I completely understand what you are explaining to me.",
    'HELP': "Excuse me, where is the nearest emergency exit located?",
    'ILU': "I love you all for supporting this accessibility technology creation!"
};

function directNavigate(pageId) {
    const pages = document.querySelectorAll('.page');
    for(let i = 0; i < pages.length; i++) {
        pages[i].style.setProperty('display', 'none', 'important');
    }
    
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.style.setProperty('display', 'flex', 'important');
        
        // Dynamically inject the manual interface controls when opening the workspace
        if(pageId === 'page-translator') {
            injectGestureDashboard();
        }
    }
}

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
        statusText.innerText = "Tracking stream operational. Select gesture key below.";
    } catch (err) {
        console.error(err);
        fallbackMsg.innerText = "[Camera Blocked - Exhibition Simulator Engaged]";
        statusText.innerText = "Exhibition Simulator Ready";
    }
}

// Injects the selection nodes directly under the camera viewfinder feed
function injectGestureDashboard() {
    let dashboard = document.getElementById('gesture-dashboard');
    if (!dashboard) {
        dashboard = document.createElement('div');
        dashboard.id = 'gesture-dashboard';
        dashboard.className = 'gesture-grid';
        
        // Create interactive hotkeys for each expression badge
        const signs = [
            { id: 'HELLO', label: '👋 HELLO' },
            { id: 'THANK_YOU', label: '🙏 THANK YOU' },
            { id: 'PLEASE', label: '🥺 PLEASE' },
            { id: 'YES', label: '👍 YES' },
            { id: 'HELP', label: '🆘 HELP' },
            { id: 'ILU', label: '🤟 I LOVE YOU' }
        ];
        
        signs.forEach(sign => {
            const btn = document.createElement('button');
            btn.className = 'gesture-node-btn';
            btn.innerText = sign.label;
            btn.onclick = () => processTargetSign(sign.id, btn);
            dashboard.appendChild(btn);
        });
        
        // Insert right below camera viewport box
        const cameraBox = document.getElementById('camera-container');
        cameraBox.parentNode.insertBefore(dashboard, cameraBox.nextSibling);
    }
}

let activeTranslationSentence = "";

function processTargetSign(signKey, element) {
    // Clear active highlight styling across layout nodes
    document.querySelectorAll('.gesture-node-btn').forEach(b => b.classList.remove('selected-node'));
    
    // Highlight the active sign button you clicked
    element.classList.add('selected-node');
    
    activeTranslationSentence = signMapping[signKey];
    statusText.innerText = `Sign Loaded: [${signKey}] Ready to Speak`;
    
    // Reset reading view field parameters
    translationOutput.innerText = "...";
    actionBtn.style.display = 'block';
    nextBtn.style.display = 'none';
}

function showTranslation() {
    if(!activeTranslationSentence) {
        statusText.innerText = "Please select a sign input button from the panel first!";
        return;
    }
    
    translationOutput.innerText = activeTranslationSentence;
    statusText.innerText = "Sign Interpreted Successfully";

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); 
        const speechNode = new SpeechSynthesisUtterance(activeTranslationSentence);
        speechNode.lang = 'en-US';
        speechNode.rate = 0.95; 
        window.speechSynthesis.speak(speechNode);
    }

    actionBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function nextTranslation() {
    activeTranslationSentence = "";
    translationOutput.innerText = "...";
    statusText.innerText = "Awaiting sign language gesture mapping...";
    actionBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    document.querySelectorAll('.gesture-node-btn').forEach(b => b.classList.remove('selected-node'));
}

function backToHome() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    videoElement.style.display = 'none';
    fallbackMsg.style.display = 'block';
    fallbackMsg.innerText = "Loading Video Stream...";
    translationOutput.innerText = "...";
    activeTranslationSentence = "";
    actionBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    
    const dashboard = document.getElementById('gesture-dashboard');
    if(dashboard) dashboard.remove();
    
    directNavigate('page-welcome');
}

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
    
