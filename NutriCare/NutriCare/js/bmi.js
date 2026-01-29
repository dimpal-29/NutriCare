//without user login

// if (localStorage.getItem("isLogin") !== "true") {
//   alert("Please login first");
//   window.location.href = "index.html";
// }

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("bmiForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let isLoggedIn = localStorage.getItem("isLogin");

        if (!isLoggedIn) {
            Swal.fire({
                icon: "warning",
                title: "Login Required!",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            });
            return;
        }

        let height = document.getElementById("height").value;
        let weight = document.getElementById("weight").value;

        if (height === "" || weight === "") {
            Swal.fire({
                icon: "error",
                title: "Missing Input!",
                
            });
            return;
        }

        height = height / 100;
        let bmi = (weight / (height * height)).toFixed(2);

        let status = "";
        if (bmi < 18.5) status = "Underweight";
        else if (bmi < 24.9) status = "Normal Weight";
        else if (bmi < 29.9) status = "Overweight";
        else status = "Obese";

        document.getElementById("bmiValue").innerHTML = "<strong>BMI:</strong> " + bmi;
        document.getElementById("bmiStatus").innerHTML = "<strong>Status:</strong> " + status;

        Swal.fire({
            icon: "success",
            title: "BMI Calculated!",
            text: `Your BMI is ${bmi} (${status})`
        });
    });

});


window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }
