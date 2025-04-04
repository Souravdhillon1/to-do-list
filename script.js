const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const focusButton = document.getElementById("focus-button");
const disableButton = document.getElementById("disable-button");

let focusMode = false; // Flag to track focus mode state
let disableMode = false; // Flag to track disable mode state

// Function to open browser notification settings based on OS (optional)
function openNotificationSettings() {
  if (navigator.platform.startsWith("Win")) {
    window.open("ms-settings:notifications", "_blank"); // Windows
  } else if (navigator.platform.startsWith("Mac")) {
    window.open("chrome://settings/content/notifications", "_blank"); // macOS (Chrome settings)
  } else {
    alert("Notification settings can be found in your browser's settings. Here are some resources:\n- Chrome: https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop\n- Firefox: https://support.mozilla.org/en-US/kb/push-notifications-firefox\n- Edge: https://support.microsoft.com/en-us/microsoft-edge/manage-website-notifications-in-microsoft-edge-0c555609-5bf2-479d-a59d-fb30a0b80b2b"); // Generic fallback
  }
}

function toggleFocusMode() {
  focusMode = !focusMode;
  focusButton.textContent = focusMode ? "Focus Mode " : "Focus Mode ";

  // Update UI based on focus mode (CSS classes)
  listContainer.classList.toggle("focus-mode");

  if (focusMode) {
    openNotificationSettings(); // Optionally open notification settings
  }
}

function toggleDisableMode() {
  disableMode = !disableMode;
  disableButton.textContent = disableMode ? "Disable (On)" : "Disable (Off)";

  // Update UI and functionality based on disable mode
  inputBox.disabled = disableMode; // Disable input box when disable mode is on
  if (disableMode) {
    inputBox.value = ""; // Clear input box on enabling disable mode
  }
}

function addTask() {
  if (disableMode) {
    alert("Task adding is disabled in Disable Mode!");
    return; // Prevent adding tasks when disable mode is on
  }
  // ... (rest of the addTask function logic)
}

// ... (rest of your JavaScript code)

// ... (rest of your JavaScript code)


function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `
      ${inputBox.value}
      <span class="delete">&#10006;</span>
    `;

    // Add click event listener for task completion
    li.addEventListener("click", function() {
      if (focusMode) {
        alert("This task list is currently in Focus Mode. Uncheck Focus Mode to mark tasks complete.");
        return; // Prevent further processing if focus mode is enabled
      }
      this.classList.toggle("checked");
      save(); // Call your save function (if applicable)
    });

    // Add click event listener for delete button
    li.querySelector(".delete").addEventListener("click", function() {
      this.parentElement.remove();
      save(); // Call your save function (if applicable)
    });

    listContainer.appendChild(li);
    inputBox.value = "";
    save(); // Call your save function (if applicable)
  }
}

// Basic save function (replace with your preferred storage method)
function save() {
  const allTasks = listContainer.querySelectorAll("li");
  let tasks = [];
  for (const task of allTasks) {
    const taskText = task.textContent.trim();
    const isChecked = task.classList.contains("checked");
    tasks.push({ text: taskText, completed: isChecked });
  }
  // You can replace this with localStorage.setItem('tasks', JSON.stringify(tasks)) or any other storage method
  console.log("Tasks:", tasks);
}

// Inside the event listener for listContainer (modified)
listContainer.addEventListener("click", function(e) {
  if (focusMode && e.target.tagName !== "SPAN" && !e.target.classList.contains("delete")) {
    // Ignore clicks on list items (except for delete button)
    return;
  }
  // You can add your existing logic for handling clicks on checkboxes (optional)
});
