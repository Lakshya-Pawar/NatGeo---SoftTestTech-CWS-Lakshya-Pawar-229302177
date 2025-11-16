document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const resetBtn = document.getElementById("resetBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (username.includes("@") && !emailRegex.test(username)) {
      alert("Invalid email format. Please check your username or email.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    let loggedInUser = null;

    for (let email in users) {
      const user = users[email];
      if (
        (user.email === username || user.name === username) &&
        user.password === password
      ) {
        loggedInUser = user;
        break;
      }
    }

    if (loggedInUser) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      window.location.href = "/index.html";
    } else {
      alert("Invalid credentials. Please check your details and try again.");
    }
  });
});
