
 


//logout

window.onload = function () {

  let isLogin = localStorage.getItem("isLogin");

  let loginItem = document.getElementById("loginItem");
  let logoutItem = document.getElementById("logoutItem");

  if (isLogin === "true") {
    loginItem.style.display = "none";
    logoutItem.style.display = "block";
  } else {
    loginItem.style.display = "block";
    logoutItem.style.display = "none";
  }

  logoutItem.onclick = function () {
    localStorage.removeItem("isLogin");
    // window.location.href = "index.html";

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success"
        }).then(() => {
              window.location.href = 'index.html';
            }); 
      }
    });

  };


  //responsive navbar 
  let hamburger = document.getElementById("hamburger");
  let navMenu = document.getElementById("navMenu");

  hamburger.onclick = function () 
  {
    navMenu.classList.toggle("active");
  };
};







