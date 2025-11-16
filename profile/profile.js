document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const allUsers = JSON.parse(localStorage.getItem("users")) || {};

  if (!user) {
    alert("You must be logged in to access your profile.");
    window.location.href = "/login/login.html";
    return;
  }

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("password").value = user.password;

  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number (must be 10 digits, Indian format).");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must include:\n• 8+ characters\n• Uppercase\n• Lowercase\n• Number\n• Special character"
      );
      return;
    }

    // === SAVE CHANGES ===
    const email = user.email;
    allUsers[email] = { name, email, phone, password };
    localStorage.setItem("users", JSON.stringify(allUsers));

    sessionStorage.setItem("loggedInUser", JSON.stringify(allUsers[email]));
    alert("Profile updated successfully!");
  });

  // === DELETE ACCOUNT ===
  document.getElementById("deleteAccount").addEventListener("click", () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    const email = user.email;
    delete allUsers[email];
    localStorage.setItem("users", JSON.stringify(allUsers));

    sessionStorage.removeItem("loggedInUser");
    alert("Your account has been deleted.");
    window.location.href = "/index.html";
  });
});
