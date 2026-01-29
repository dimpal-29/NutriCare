
 document.getElementById("contactform").addEventListener("submit", function (e) {
    e.preventDefault(); 

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    if (name == "" || email == "" || phone == "" || message == "") {
      return;
    }
      else {
    Swal.fire({
      title: "Your data is successfully submitted!",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      document.getElementById("contactform").reset();
    });
  }
  });

//responsiv-navbar
    window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }