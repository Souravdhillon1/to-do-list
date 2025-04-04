// Function to retrieve user data from localStorage
function getUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users;
}

// Function to save users data to localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to initialize localStorage with default users
function initializeLocalStorage() {
    // Check if users data already exists in localStorage
    if (!localStorage.getItem("users")) {
        // Default users data
        const users = [
            {
                username: "user1",
                email: "user1@example.com",
                password: "password1"
            },
            {
                username: "user2",
                email: "user2@example.com",
                password: "password2"
            }
            // Add more user objects as needed
        ];

        // Store users data in localStorage
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Call the function to initialize localStorage with default users
initializeLocalStorage();

// Function to register a new user
function registerUser(username, email, password) {
    // Check if username already exists
    const users = getUsers();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return `User ${username} already exists. Please choose a different username.`;
    }

    // Add new user to the array
    users.push({ username, email, password });
    saveUsers(users);

    return `User ${username} registered successfully!`;
}

// Function to delete a user by username
function deleteUser(username) {
    // Get the current list of users
    let users = getUsers();

    // Filter out the user to be deleted
    users = users.filter(user => user.username !== username);

    // Save the updated user list
    saveUsers(users);

    return `User ${username} deleted successfully!`;
}

// Function to handle login
// Function to handle login
function loginUser(username, password) {
    // Retrieve user data from localStorage
    const users = getUsers();

    // Find the user with the given username
    const user = users.find(user => user.username === username);

    // Check if user exists
    if (!user) {
        console.log(`User ${username} not found.`);
        return `User ${username} not found.`;
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
        console.log(`Incorrect password for user ${username}.`);
        return `Incorrect password for user ${username}.`;
    }

    // Redirect to the desired page after successful login
    window.location.href = "to-do.html"; // Relative path example

    console.log(`Welcome back, ${username}!`);
    return `Welcome back, ${username}!`;
}



// Function to setup forms and event listeners
function setupForm() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }
}

// Function to handle login form submission
function handleLoginSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const result = document.getElementById("result");

    const response = loginUser(username, password);
    result.innerHTML = response;
}

// Function to handle register form submission
function handleRegisterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = document.getElementById("result");

    const response = registerUser(username, email, password);
    result.innerHTML = response;
}

// Call setupForm when the page loads
document.addEventListener("DOMContentLoaded", setupForm);
