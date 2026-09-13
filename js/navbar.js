/* ================================================
   SHARED NAVBAR SCRIPT
   Injects the exact same navbar (same as Home page)
   into every page that has a #navbar-placeholder div.
================================================= */

(function () {

  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  // current page file name (e.g. "product.html")
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage) currentPage = "index.html";

  function activeClass(page) {
    return currentPage === page ? "active" : "";
  }

  placeholder.innerHTML =
    '<header class="navbar">' +
      '<div class="logo"><a href="index.html">Nutricar</a></div>' +
      '<nav>' +
        '<div class="hamburger" id="hamburger">' +
          '<span></span><span></span><span></span>' +
        '</div>' +
        '<ul class="nav-text" id="navMenu">' +
          '<li><a href="index.html" class="' + activeClass("index.html") + '">Home</a></li>' +
          '<li><a href="about.html" class="' + activeClass("about.html") + '">About</a></li>' +
          '<li><a href="product.html" class="' + activeClass("product.html") + '">Products</a></li>' +
          '<li><a href="hospital.html" class="' + activeClass("hospital.html") + '">Hospitals</a></li>' +
          '<li><a href="bmi.html" class="' + activeClass("bmi.html") + '">BMI Calculator</a></li>' +
          '<li><a href="contact.html" class="' + activeClass("contact.html") + '">Contact Us</a></li>' +
          '<li><a href="feedback.html" class="' + activeClass("feedback.html") + '">Feedback</a></li>' +
          '<li><a href="login.html" id="loginItem">Login</a></li>' +
          '<li id="logoutItem"><a href="#">Logout</a></li>' +
        '</ul>' +
      '</nav>' +
    '</header>';

  // ---- show Login or Logout button based on login state ----
  const loginItem = document.getElementById("loginItem");
  const logoutItem = document.getElementById("logoutItem");

  function refreshAuthButtons() {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      loginItem.style.display = "none";
      logoutItem.style.display = "block";
    } else {
      loginItem.style.display = "block";
      logoutItem.style.display = "none";
    }
  }

  refreshAuthButtons();

  // ---- logout button click ----
  logoutItem.onclick = function (e) {
    e.preventDefault();

    function finishLogout() {
      localStorage.removeItem("isLogin");
      window.location.href = "index.html";
    }

    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then(function (result) {
        if (result.isConfirmed) {
          localStorage.removeItem("isLogin");
          Swal.fire({
            title: "Logged out!",
            text: "You have been logged out successfully.",
            icon: "success"
          }).then(function () {
            window.location.href = "index.html";
          });
        }
      });
    } else {
      if (confirm("Do you want to logout?")) {
        finishLogout();
      }
    }
  };

})();
