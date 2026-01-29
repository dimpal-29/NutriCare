//without user login

// if (localStorage.getItem("isLogin") !== "true") {
//   alert("Please login first");
//   window.location.href = "index.html";
// }


window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }

// disease → 4 products mapping
  const diseaseProducts = {
    "cold": ["tulsi", "ginger", "orange", "guava"],
    "cough": ["tulsi", "ginger", "orange", "guava"],
    "cold cough": ["tulsi", "ginger", "orange", "guava"],

    "diabetes": ["cinnamon", "neem", "apple", "guava"],

    "fever": ["giloy", "tulsi", "kiwi", "apple"],

    "digestion": ["fennel", "ginger", "papaya", "pear"],

    "constipation": ["isabgol", "triphala", "fig", "pear"],

    "bp": ["garlic", "banana", "pomegranate", "lemon"],
    "blood pressure": ["garlic", "banana", "pomegranate", "lemon"],

    "heart": ["garlic", "pomegranate", "apple", "lemon"],

    "immunity": ["turmeric", "ashwagandha", "kiwi", "orange"],

    "weight loss": ["green-tea", "ginger", "apple", "lemon"],
    "obesity": ["green-tea", "ginger", "apple", "lemon"],

    "skin": ["neem", "aloe-vera", "papaya", "orange"]
  };

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.querySelector(".product-search input");
  const searchBtn = document.querySelector(".product-search .btn");
  const allCards = document.querySelectorAll(".product-card");

  // safety
  if (!searchInput || !searchBtn || allCards.length === 0) {
    console.error("Product search elements not found");
    return;
  }

  searchBtn.addEventListener("click", function () {

    const userInput = searchInput.value.trim().toLowerCase();

    // pehle sab hide
    allCards.forEach(card => {
      card.style.display = "none";
    });

    // agar disease match hui
    if (diseaseProducts[userInput]) {

      diseaseProducts[userInput].forEach(product => {
        const card = document.querySelector(
          `.product-card[data-product="${product}"]`
        );
        if (card) {
          card.style.display = "block";
        }
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "No Products Found",
        text: "Please enter a valid health problem",
        confirmButtonColor: "#2e8b57"
      });

      allCards.forEach(card => {
        card.style.display = "block";
      });
    }
  });

});
