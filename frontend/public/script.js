// Handling visibility of login and registration sections
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const uploadForm = document.getElementById('uploadForm');
const transcriptionEditor = document.getElementById('transcriptionEditor');
const saveTranscriptionButton = document.getElementById('saveTranscription');

const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const uploadSection = document.getElementById('uploadSection');
const editorSection = document.getElementById('editorSection');

// Toggle between Login and Register forms
document.getElementById('registerLink').addEventListener('click', function() {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function() {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Handle Login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fake login validation (Replace this with actual authentication code)
    if (username === 'testuser' && password === 'testpassword') {
        alert('Login successful!');
        loginSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
    } else {
        alert('Invalid credentials. Try again!');
    }
});

// Handle Registration
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;

    // Fake registration (Replace with actual registration logic)
    alert(`Account created for ${newUsername}. Please log in.`);
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Handle File Upload
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput) {
        alert(`File "${fileInput.name}" uploaded successfully!`);
        uploadSection.classList.add('hidden');
        editorSection.classList.remove('hidden');
    } else {
        alert('Please select a file to upload.');
    }
});

// Handle Transcription Saving
saveTranscriptionButton.addEventListener('click', function() {
    const transcription = transcriptionEditor.value;
    if (transcription.trim()) {
        alert('Transcription saved successfully!');
        transcriptionEditor.value = ''; // Clear the editor
    } else {
        alert('Please enter some transcription text.');
    }
});

