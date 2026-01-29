
  window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }



    document.getElementById("feedbackform").addEventListener("submit", function (e) {
      e.preventDefault(); 

      
        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;

        if(name == "" || message == "")
        {
          return;
        }
        else {
            Swal.fire({
              title: "Your feedback is successfully submitted!",
              icon: "success",
              confirmButtonText: "OK"
            }).then(() => {
              document.getElementById("feedbackform").reset();
            });
        }
      });