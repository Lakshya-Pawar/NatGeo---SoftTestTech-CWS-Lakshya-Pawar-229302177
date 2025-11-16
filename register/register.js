document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !phone || !password) {
      alert("All fields are required!");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address (e.g. user@example.com)");
      return;
    }

    const phoneRegex =
      /^(?:\+91|91)?[6-9]\d{9}$/; // Indian mobile format, accepts +91 or 91 prefix
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number (Indian format).");
      return;
    }

    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include:\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character"
      );
      return;
    }

    // === Store in localStorage ===
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("User already registered. Please login instead.");
      window.location.href = "/login/login.html";
      return;
    }

    users[email] = { name, email, phone, password };
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/login/login.html";
  });

});
