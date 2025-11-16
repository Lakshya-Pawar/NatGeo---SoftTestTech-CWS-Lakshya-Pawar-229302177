window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.add('fixed-navbar');
});

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const navUser = document.getElementById("user");

  if (user) {
    navUser.innerHTML = `
      <li><a href="/profile/profile.html" class="user-link">${user.name}</a></li>
      <li><a href="#" id="logout">Logout</a></li>
    `;
  } else {
    navUser.innerHTML = `
      <li><a href="/login/login.html">Login</a></li>
      <li><a href="/register/subscribe.html">Subscribe</a></li>
    `;
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "logout") {
      sessionStorage.removeItem("loggedInUser");
      window.location.reload();
    }
  });
});
