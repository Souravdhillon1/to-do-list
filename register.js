// Function to handle registration
function handleRegister(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the registration form
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Check if username and password are provided
    if (!username || !password) {
        // Show an error message if either field is empty
        document.getElementById("register-error").innerText = "Please enter both username and password.";
        return; // Exit the function
    }

    // Simulate user registration (replace with actual registration logic)
    // For demonstration, we're just logging the username and password
    console.log("Registered username:", username);
    console.log("Registered password:", password);

    // Redirect to login page after successful registration
    window.location.href = "login.html";
}

// Add event listener to the register form
document.getElementById("register-form").addEventListener("submit", handleRegister);
