   window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }



  
const isLogin = localStorage.getItem("isLogin");

if (!isLogin) {
  Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login first to get personal herbal recommendations.",
    confirmButtonText: "Login Now",
    allowOutsideClick: false
  }).then(() => {
    window.location.href = "login.html";
  });
}
else {

  /****************************************
   🌿 DISEASE → PRODUCT DATA
  ****************************************/
  const recommendationData = {
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

  const form = document.getElementById("healthForm");
  const resultBox = document.getElementById("resultBox");

  /****************************************
   📝 FORM SUBMIT
  ****************************************/
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const disease = document.getElementById("disease").value.toLowerCase();

    if (!disease) {
      Swal.fire({
        icon: "error",
        title: "Required",
        text: "Please select a health problem"
      });
      return;
    }

    if (!recommendationData[disease]) {
      Swal.fire({
        icon: "info",
        title: "No Recommendation",
        text: "No products found for selected condition"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Recommendation Generated",
      text: "4 best products selected for you",
      timer: 1500,
      showConfirmButton: false
    });

    showProducts(recommendationData[disease], disease);
  });

  /****************************************
   🧾 SHOW PRODUCTS (4 CARDS)
  ****************************************/
 function showProducts(products, disease) {

  var html = "<h3>Recommended Products for " + disease + "</h3>";
  html += "<div class='product-cards'>";

  for (var i = 0; i < products.length; i++) {
    html +=
      "<div class='product-card'>" +
        "<img src='img/" + products[i] + ".jpg' alt='" + products[i] + "'>" +
        "<h4>" + products[i] + "</h4>" +
      "</div>";
  }

  html += "</div>";
  resultBox.innerHTML = html;
}


  /****************************************
   🔧 HELPERS
  ****************************************/
  function formatName(name) {
    return name
      .replace("-", " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  function formatTitle(text) {
    return text.replace(/\b\w/g, c => c.toUpperCase());
  }
}
