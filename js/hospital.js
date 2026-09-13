
window.onload = function () {
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.onclick = function () {
      navMenu.classList.toggle("active");
    };
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var nameInput = document.getElementById("searchName");
  var cityFilter = document.getElementById("cityFilter");
  var searchBtn = document.getElementById("searchBtn");
  var cards = document.querySelectorAll(".hospital-card");
  var emptyMsg = document.getElementById("hospitalEmptyMsg");

  var cityNames = {
    ahmedabad: true,
    surat: true,
    vadodara: true,
    rajkot: true,
    bhavnagar: true,
    jamnagar: true,
    gandhinagar: true
  };

  function checkLogin() {
    var isLoggedIn = localStorage.getItem("isLogin");

    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to search hospitals",
        confirmButtonText: "Login"
      }).then(function () {
        window.location.href = "login.html";
      });
      return false;
    }
    return true;
  }

  function setCardVisible(card, visible) {
    if (visible) {
      card.classList.remove("is-hidden");
      card.style.display = "block";
    } else {
      card.classList.add("is-hidden");
      card.style.display = "none";
    }
  }

  function showDefaultHospitals() {
    cards.forEach(function (card) {
      var isExtra = card.classList.contains("extra-hospital");
      setCardVisible(card, !isExtra);
    });
    if (emptyMsg) emptyMsg.style.display = "none";
  }

  function cardMatchesQuery(card, query, selectedCity) {
    var hName = (card.getAttribute("data-name") || "").toLowerCase();
    var hCity = (card.getAttribute("data-city") || "").toLowerCase();
    var titleEl = card.querySelector("h3");
    var title = titleEl ? titleEl.textContent.toLowerCase() : "";
    var fullText = (card.textContent || "").toLowerCase();

    /* City dropdown selected */
    if (selectedCity && hCity !== selectedCity) {
      return false;
    }

    if (!query) {
      return true;
    }

    /* If user typed a city name in input, match by city */
    if (cityNames[query] && hCity === query) {
      return true;
    }

    /* Match hospital name / title / any text on card */
    if (hName.indexOf(query) !== -1) return true;
    if (title.indexOf(query) !== -1) return true;
    if (hCity.indexOf(query) !== -1) return true;
    if (fullText.indexOf(query) !== -1) return true;

    /* Match each word (e.g. "apollo hospital") */
    var words = query.split(/\s+/);
    var allWordsMatch = words.every(function (word) {
      if (!word) return true;
      return (
        hName.indexOf(word) !== -1 ||
        title.indexOf(word) !== -1 ||
        hCity.indexOf(word) !== -1 ||
        fullText.indexOf(word) !== -1
      );
    });

    return allWordsMatch;
  }

  function filterHospitals() {
    if (!checkLogin()) return;

    var query = nameInput.value.toLowerCase().trim();
    var selectedCity = (cityFilter.value || "").toLowerCase().trim();

    /* Search empty → default hospitals */
    if (!query && !selectedCity) {
      showDefaultHospitals();
      return;
    }

    var matchCount = 0;

    cards.forEach(function (card) {
      var show = cardMatchesQuery(card, query, selectedCity);
      setCardVisible(card, show);
      if (show) matchCount++;
    });

    if (emptyMsg) {
      if (matchCount === 0) {
        emptyMsg.textContent = "No hospitals found for your search. Try another name or city.";
        emptyMsg.style.display = "block";
      } else {
        emptyMsg.style.display = "none";
      }
    }
  }

  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    filterHospitals();
  });

  nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      filterHospitals();
    }
  });

  cityFilter.addEventListener("change", filterHospitals);

  /* Page load: default hospitals dikhao */
  showDefaultHospitals();
});
