// ==============================
// Theme Toggle (Dark/Light Mode)
// ==============================
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');

    // Toggle the class on the body
    body.classList.toggle('dark-mode');

    // Change icon and save preference
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Check saved theme when page loads
window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('bx-moon', 'bx-sun');
    }

    // Load a random quote
    loadRandomQuote();
};

// ==============================
// Daily Quotes
// ==============================
const quotes = [
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" }
];

function loadRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').innerText = '"' + randomQuote.text + '"';
    document.getElementById('quoteAuthor').innerText = "- " + randomQuote.author;
}

// ==============================
// Mentor Search Filter
// ==============================
function filterMentors() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.mentor-card');

    for (let i = 0; i < cards.length; i++) {
        // We get the hidden "data-skills" attribute from HTML
        const skills = cards[i].getAttribute('data-skills').toLowerCase();

        if (skills.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// ==============================
// Modals Logic
// ==============================
const loginModal = document.getElementById('loginModal');
const profileModal = document.getElementById('profileModal');

function showLogin() {
    loginModal.style.display = "block";
}

function closeLogin() {
    loginModal.style.display = "none";
}

function openMentorProfile(name, time) {
    document.getElementById('m-name').innerText = name;
    document.getElementById('m-time').innerText = time;
    profileModal.style.display = "block";
}

function closeProfile() {
    profileModal.style.display = "none";
}

// Close modals when clicking outside the box
window.onclick = function (event) {
    if (event.target == loginModal) {
        closeLogin();
    }
    if (event.target == profileModal) {
        closeProfile();
    }
}

// Dashboard tracking variables
let appliedProjects = 0;
let requestedSessions = 0;
let currentRole = 'student';

// Simple Dummy Login
function handleLogin(event) {
    event.preventDefault(); 
    
    // Check if the email ends with the correct university domain
    const email = document.getElementById('loginEmail').value;
    if (!email.endsWith('@chitkara.edu.in')) {
        alert("Access Denied: You must use a valid @chitkara.edu.in email address to login.");
        return; // Stop the login process
    }
    
    currentRole = document.getElementById('loginRole').value;
    
    alert("Login successful as " + currentRole + "! Welcome to LearnLink.");
    closeLogin();
    
    // Hide login button, show dashboard and user profile
    document.getElementById('nav-login').style.display = 'none';
    document.getElementById('nav-dashboard').style.display = 'inline-block';
    document.getElementById('nav-logout').style.display = 'inline-block';
    
    const navUser = document.getElementById('nav-user');
    navUser.style.display = 'inline-block';
    
    // Update UI based on role
    if (currentRole === 'teacher') {
        navUser.innerHTML = `<span style="color: var(--primary); font-weight: bold; display: flex; align-items: center; gap: 5px;"><i class='bx bx-chalkboard' style="font-size: 24px;"></i> Teacher</span>`;
        document.getElementById('dashTitle').innerText = "Teacher Dashboard";
        document.getElementById('dashSubtitle').innerText = "Manage your posted projects and mentee requests.";
        document.getElementById('projectLabel').innerText = "Project Applications Received";
        document.getElementById('sessionLabel').innerText = "Mentorship Requests Received";
        document.getElementById('listOneTitle').innerText = "Applications Received";
        document.getElementById('listTwoTitle').innerText = "Session Requests";
    } else {
        navUser.innerHTML = `<span style="color: var(--primary); font-weight: bold; display: flex; align-items: center; gap: 5px;"><i class='bx bx-user-circle' style="font-size: 24px;"></i> Student</span>`;
        document.getElementById('dashTitle').innerText = "Student Dashboard";
        document.getElementById('dashSubtitle').innerText = "Track your applications and mentorship sessions.";
        document.getElementById('projectLabel').innerText = "Projects Applied";
        document.getElementById('sessionLabel').innerText = "Sessions Requested";
        document.getElementById('listOneTitle').innerText = "My Applied Projects";
        document.getElementById('listTwoTitle').innerText = "My Mentors";
    }
}

function handleLogout() {
    // Hide dashboard and user options
    document.getElementById('nav-dashboard').style.display = 'none';
    document.getElementById('nav-user').style.display = 'none';
    document.getElementById('nav-logout').style.display = 'none';
    
    // Show login button again
    document.getElementById('nav-login').style.display = 'inline-block';
    
    // Reset dashboard data
    appliedProjects = 0;
    requestedSessions = 0;
    document.getElementById('projectCount').innerText = '0';
    document.getElementById('sessionCount').innerText = '0';
    document.getElementById('projectList').innerHTML = '<li>No projects yet.</li>';
    document.getElementById('sessionList').innerHTML = '<li>No sessions yet.</li>';
    
    // Return to home view
    showHome();
    
    alert("You have successfully logged out.");
}

function showDashboard() {
    // Hide other sections
    document.getElementById('home').style.display = 'none';
    document.getElementById('mentors').style.display = 'none';
    document.getElementById('projects').style.display = 'none';
    
    // Show dashboard
    document.getElementById('dashboard').style.display = 'block';
}

function showHome() {
    // Restore main sections
    document.getElementById('home').style.display = 'flex';
    document.getElementById('mentors').style.display = 'block';
    document.getElementById('projects').style.display = 'block';
    
    // Hide dashboard
    document.getElementById('dashboard').style.display = 'none';
}

function bookSession() {
    alert("Mentorship request sent successfully!");
    closeProfile();
    
    // Update dashboard
    requestedSessions++;
    document.getElementById('sessionCount').innerText = requestedSessions;
    
    const list = document.getElementById('sessionList');
    if (requestedSessions === 1) list.innerHTML = ''; // Remove default message
    
    const mentorName = document.getElementById('m-name').innerText;
    list.innerHTML += `<li>${mentorName}</li>`;
}

function applyProject(projectName) {
    alert("You have applied for: " + projectName + "\nThe project lead will contact you soon.");
    
    // Update dashboard
    appliedProjects++;
    document.getElementById('projectCount').innerText = appliedProjects;
    
    const list = document.getElementById('projectList');
    if (appliedProjects === 1) list.innerHTML = ''; // Remove default message
    
    list.innerHTML += `<li>${projectName}</li>`;
}

// ==============================
// Chatbot Logic
// ==============================
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    // Toggle active class to show/hide with animation
    chatWindow.classList.toggle('active');
}

// Listen for Enter key in chat
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById('chatInput');
    const userText = inputField.value.trim();

    if (userText === "") return;

    const chatBody = document.getElementById('chatBody');

    // Add user message to UI
    chatBody.innerHTML += `<div class="msg user">${userText}</div>`;
    inputField.value = "";

    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Wait 1 second to simulate "typing"
    setTimeout(function () {
        let botResponse = getBotResponse(userText.toLowerCase());
        chatBody.innerHTML += `<div class="msg bot">${botResponse}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Simple keyword matching for the bot
function getBotResponse(text) {
    if (text.includes('hello') || text.includes('hi')) {
        return "Hello! I am the LearnLink bot. Are you looking for a mentor or a project?";
    } else if (text.includes('mentor') || text.includes('teacher')) {
        return "Awesome! You can search for mentors by their skills (like React or Python) in the Mentors section.";
    } else if (text.includes('project')) {
        return "We have active projects looking for developers! Check out the Projects section below.";
    } else if (text.includes('login') || text.includes('account')) {
        return "You can login using the button at the top right of the navigation bar.";
    } else {
        return "I'm still learning! Try asking me about 'mentors', 'projects', or 'login'.";
    }
}
