  window.onload = function (){

            let hamburger = document.getElementById("hamburger");
             let navMenu = document.getElementById("navMenu");

            hamburger.onclick = function () 
            {
                navMenu.classList.toggle("active");
            };

        }
      