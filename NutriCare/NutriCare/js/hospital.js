

window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }




    
// document.addEventListener("DOMContentLoaded", () => {

//   const nameInput = document.getElementById("searchName");
//   const cityFilter = document.getElementById("cityFilter");
//   const searchBtn = document.getElementById("searchBtn");
//   const cards = document.querySelectorAll(".hospital-card");

//   function filterHospitals() {
//     const name = nameInput.value.toLowerCase().trim();
//     const city = cityFilter.value;

//     cards.forEach(card => {
//       const hName = card.dataset.name;
//       const hCity = card.dataset.city;
//       const hState = card.dataset.state;

//       let show = true;
//       if (name && !hName.includes(name)) show = false;
//       if (city && hCity !== city) show = false;


//       card.style.display = show ? "block" : "none";
//     });
//   }

//   searchBtn.addEventListener("click", filterHospitals);
//   nameInput.addEventListener("keyup", filterHospitals);  
// });


document.addEventListener("DOMContentLoaded", () => {

  const nameInput = document.getElementById("searchName");
  const cityFilter = document.getElementById("cityFilter");
  const searchBtn = document.getElementById("searchBtn");
  const cards = document.querySelectorAll(".hospital-card");
  function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLogin");

    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to search hospitals",
        confirmButtonText: "Login"
      }).then(() => {
        window.location.href = "login.html";
      });

      return false;
    }
    return true;
  }

  function filterHospitals() {

    if (!checkLogin()){
       return;
    }

    else{

        const name = nameInput.value.toLowerCase().trim();
    const city = cityFilter.value;

    cards.forEach(card => {
      const hName = card.dataset.name.toLowerCase();
      const hCity = card.dataset.city;

      let show = true;
      if (name && !hName.includes(name)) show = false;
      if (city && hCity !== city) show = false;

      card.style.display = show ? "block" : "none";
    });

    }
     

  
  }
  searchBtn.addEventListener("click", filterHospitals);
  nameInput.addEventListener("keyup", filterHospitals);

});
