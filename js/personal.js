/****************************************
  NutriCare — Personal Herbal Recommendation
  Rule-based scoring (Age, Gender, Problem,
  Diet, Allergy, Goal, Medicine)
****************************************/

   window.onload = function () {
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.onclick = function () {
        navMenu.classList.toggle("active");
      };
    }
};
  
var isLogin = localStorage.getItem("isLogin");

if (!isLogin) {
  Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login first to get personal herbal recommendations.",
    confirmButtonText: "Login Now",
    allowOutsideClick: false
  }).then(function () {
    window.location.href = "login.html";
  });
} else {

  var STORAGE_KEY = "nutricareRecommendations";
  var LAST_KEY = "nutricareLastRecommendation";
  var fallbackImg = "img/back-img.jpg";

  /* ---------------------------------------
     Product tags used for scoring / filters
  --------------------------------------- */
  var catalog = {
    tulsi: {
      tags: ["cold", "cough", "fever", "immunity", "energy"],
      age: "all",
      allergyFlags: []
    },
    ginger: {
      tags: ["cold", "cough", "digestion", "weight loss", "obesity", "immunity"],
      age: "all",
      allergyFlags: []
    },
    neem: {
      tags: ["skin", "diabetes", "immunity"],
      age: "adult",
      allergyFlags: []
    },
    cinnamon: {
      tags: ["diabetes", "digestion", "sugar", "heart"],
      age: "adult",
      allergyFlags: []
    },
    giloy: {
      tags: ["fever", "immunity", "cold"],
      age: "adult",
      allergyFlags: []
    },
    fennel: {
      tags: ["digestion", "weight loss"],
      age: "all",
      allergyFlags: []
    },
    isabgol: {
      tags: ["constipation", "digestion", "weight loss", "obesity"],
      age: "adult",
      allergyFlags: ["high-fiber"]
    },
    triphala: {
      tags: ["constipation", "digestion", "skin"],
      age: "adult",
      allergyFlags: ["high-fiber"]
    },
    garlic: {
      tags: ["bp", "heart", "immunity", "cold"],
      age: "adult",
      allergyFlags: ["garlic"]
    },
    turmeric: {
      tags: ["immunity", "skin", "cold", "cough"],
      age: "all",
      allergyFlags: []
    },
    ashwagandha: {
      tags: ["immunity", "energy", "stress"],
      age: "adult",
      allergyFlags: []
    },
    "green-tea": {
      tags: ["weight loss", "obesity", "heart", "energy"],
      age: "adult",
      allergyFlags: ["caffeine"]
    },
    "aloe-vera": {
      tags: ["skin", "digestion"],
      age: "all",
      allergyFlags: []
    },
    amla: {
      tags: ["immunity", "skin", "digestion", "cold"],
      age: "all",
      allergyFlags: ["citrus"]
    },
    mint: {
      tags: ["digestion", "skin"],
      age: "all",
      allergyFlags: []
    },
    apple: {
      tags: ["heart", "diabetes", "weight loss", "obesity", "digestion", "sugar"],
      age: "all",
      allergyFlags: []
    },
    guava: {
      tags: ["cold", "cough", "immunity", "digestion", "diabetes"],
      age: "all",
      allergyFlags: []
    },
    orange: {
      tags: ["cold", "cough", "immunity", "skin"],
      age: "all",
      allergyFlags: ["citrus"]
    },
    strawberry: {
      tags: ["skin", "heart", "immunity"],
      age: "all",
      allergyFlags: []
    },
    kiwi: {
      tags: ["immunity", "digestion", "fever", "skin"],
      age: "all",
      allergyFlags: ["kiwi", "latex-fruit", "citrus"]
    },
    papaya: {
      tags: ["digestion", "skin", "weight loss", "constipation"],
      age: "all",
      allergyFlags: ["latex-fruit"]
    },
    pear: {
      tags: ["digestion", "constipation", "heart", "diabetes"],
      age: "all",
      allergyFlags: ["high-fiber"]
    },
    fig: {
      tags: ["constipation", "digestion", "energy"],
      age: "all",
      allergyFlags: ["high-fiber"]
    },
    banana: {
      tags: ["bp", "heart", "energy", "digestion"],
      age: "all",
      allergyFlags: ["banana", "latex-fruit"]
    },
    pomegranate: {
      tags: ["heart", "bp", "immunity", "skin"],
      age: "all",
      allergyFlags: []
    },
    lemon: {
      tags: ["weight loss", "obesity", "immunity", "cold", "heart"],
      age: "all",
      allergyFlags: ["citrus"]
    },
    watermelon: {
      tags: ["skin", "weight loss", "obesity", "bp"],
      age: "all",
      allergyFlags: []
    }
  };

  /* Goal → helpful tags */
  var goalTags = {
    immunity: ["immunity", "cold", "cough", "fever"],
    weight: ["weight loss", "obesity"],
    digestion: ["digestion", "constipation"],
    heart: ["heart", "bp"],
    skin: ["skin"],
    energy: ["energy", "immunity"],
    sugar: ["diabetes", "sugar"]
  };

  /* Medicine purpose → items to exclude (safety) + warning text */
  var medicineSafety = {
    diabetes: {
      exclude: [],
      caution: ["cinnamon", "giloy", "neem", "fenugreek", "aloe-vera"],
      message: "Some herbs (like cinnamon, giloy, neem) may further lower blood sugar when combined with diabetes medicine."
    },
    "blood-pressure": {
      exclude: [],
      caution: ["garlic", "ashwagandha", "green-tea"],
      message: "Garlic and some adaptogens may affect blood pressure when you are already on BP medicine."
    },
    "blood-thinner": {
      exclude: ["garlic", "ginger", "turmeric", "green-tea", "cinnamon"],
      caution: ["pomegranate"],
      message: "Garlic, ginger, turmeric, green tea, and cinnamon may increase bleeding risk with blood thinners — they were filtered out or flagged."
    },
    thyroid: {
      exclude: ["ashwagandha"],
      caution: [],
      message: "Ashwagandha may interfere with thyroid medication and was excluded for safety."
    },
    sedative: {
      exclude: ["ashwagandha"],
      caution: ["tulsi"],
      message: "Ashwagandha and calming herbs may increase drowsiness with sedative medicines."
    },
    immunity: {
      exclude: ["giloy", "ashwagandha", "tulsi"],
      caution: ["turmeric"],
      message: "Immune-stimulating herbs were limited because they may conflict with immunosuppressant therapy."
    },
    heart: {
      exclude: [],
      caution: ["garlic", "green-tea", "pomegranate"],
      message: "Some heart-supportive foods/herbs may interact with heart medicines — use only under medical advice."
    },
    other: {
      exclude: [],
      caution: [],
      message: "Because you take medicine, please check with a healthcare professional before using any herb regularly."
    }
  };

  var diseaseLabels = {
    cold: "Cold",
    cough: "Cough",
    "cold cough": "Cold & Cough",
    diabetes: "Diabetes",
    fever: "Fever",
    digestion: "Digestion Issues",
    constipation: "Constipation",
    bp: "High Blood Pressure",
    heart: "Heart Problems",
    immunity: "Low Immunity",
    "weight loss": "Weight Loss",
    obesity: "Obesity",
    skin: "Skin Problems"
  };

  var allergyLabels = {
    none: "No Allergy",
    citrus: "Citrus Allergy",
    banana: "Banana Allergy",
    kiwi: "Kiwi Allergy",
    garlic: "Garlic Allergy / Sensitivity",
    "latex-fruit": "Latex-Fruit Syndrome",
    "high-fiber": "Sensitive to High Fiber",
    caffeine: "Caffeine Sensitivity"
  };

  var goalLabels = {
    immunity: "Boost Immunity",
    weight: "Weight Management",
    digestion: "Better Digestion",
    heart: "Heart Health",
    skin: "Skin Health",
    energy: "Energy & Stress Relief",
    sugar: "Blood Sugar Support"
  };

  var form = document.getElementById("healthForm");
  var formPanel = document.getElementById("formPanel");
  var resultBox = document.getElementById("resultBox");
  var recommendationUi = document.querySelector(".recommendation-ui");
  var medicineSelect = document.getElementById("medicine");
  var medicineFields = document.getElementById("medicineFields");
  var medicineNameInput = document.getElementById("medicineName");
  var medicinePurposeSelect = document.getElementById("medicinePurpose");
  var toggleSavedBtn = document.getElementById("toggleSavedBtn");
  var backToFormBtn = document.getElementById("backToFormBtn");
  var savedList = document.getElementById("savedList");
  var savedSection = document.getElementById("savedSection");
  var savedEntry = document.getElementById("savedEntry");
  var savedPanel = document.getElementById("savedPanel");

  var lastProfile = null;
  var lastResults = null;
  var skipNextAutoSave = false;

  function getMedicinePurposeLabel(purposeValue) {
    if (!purposeValue) return "";
    for (var i = 0; i < medicinePurposeSelect.options.length; i++) {
      if (medicinePurposeSelect.options[i].value === purposeValue) {
        return medicinePurposeSelect.options[i].text;
      }
    }
    return purposeValue;
  }

  function hideFormShowResults() {
    if (formPanel) formPanel.hidden = true;
    if (savedSection) savedSection.hidden = true;
    if (recommendationUi) {
      recommendationUi.classList.add("results-mode");
      recommendationUi.classList.remove("saved-mode");
    }
    resultBox.classList.add("result-visible");
    window.scrollTo({ top: resultBox.offsetTop - 80, behavior: "smooth" });
  }

  function showFormHideResults() {
    if (formPanel) formPanel.hidden = false;
    if (savedSection) savedSection.hidden = false;
    if (savedEntry) savedEntry.hidden = false;
    if (savedPanel) savedPanel.hidden = true;
    if (recommendationUi) {
      recommendationUi.classList.remove("results-mode");
      recommendationUi.classList.remove("saved-mode");
    }
    resultBox.classList.remove("result-visible");
    resultBox.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showSavedReportsOnly() {
    if (formPanel) formPanel.hidden = true;
    if (savedEntry) savedEntry.hidden = true;
    if (savedPanel) savedPanel.hidden = false;
    if (savedSection) savedSection.hidden = false;
    if (recommendationUi) {
      recommendationUi.classList.remove("results-mode");
      recommendationUi.classList.add("saved-mode");
    }
    resultBox.classList.remove("result-visible");
    resultBox.innerHTML = "";
    renderSavedList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fillFormFromProfile(profile) {
    if (!profile) return;
    document.getElementById("age").value = profile.age || "";
    document.getElementById("gender").value = profile.gender || "";
    document.getElementById("disease").value = profile.disease || "";
    document.getElementById("diet").value = profile.diet || "";
    document.getElementById("allergy").value = profile.allergy || "";
    document.getElementById("goal").value = profile.goal || "";
    document.getElementById("medicine").value = profile.medicine || "";

    if (profile.medicine === "Yes") {
      medicineFields.hidden = false;
      medicineNameInput.required = true;
      medicinePurposeSelect.required = true;
      medicineNameInput.value = profile.medicineName || "";
      medicinePurposeSelect.value = profile.medicinePurpose || "";
    } else {
      medicineFields.hidden = true;
      medicineNameInput.required = false;
      medicinePurposeSelect.required = false;
      medicineNameInput.value = "";
      medicinePurposeSelect.value = "";
    }
  }

  function bindResultActions() {
    var saveBtn = document.getElementById("saveRecBtn");
    var regenBtn = document.getElementById("regenBtn");
    var editBtn = document.getElementById("editProfileBtn");
    var emptyBtn = document.getElementById("regenEmptyBtn");
    var editEmptyBtn = document.getElementById("editEmptyBtn");

    if (saveBtn) saveBtn.addEventListener("click", function () {
      saveCurrentRecommendation(true);
    });
    if (regenBtn) regenBtn.addEventListener("click", regenerateRecommendations);
    if (emptyBtn) emptyBtn.addEventListener("click", regenerateRecommendations);
    if (editBtn) {
      editBtn.addEventListener("click", function () {
        fillFormFromProfile(lastProfile);
        showFormHideResults();
      });
    }
    if (editEmptyBtn) {
      editEmptyBtn.addEventListener("click", function () {
        fillFormFromProfile(lastProfile);
        showFormHideResults();
      });
    }
  }

  /* Show / hide medicine detail fields */
  medicineSelect.addEventListener("change", function () {
    if (medicineSelect.value === "Yes") {
      medicineFields.hidden = false;
      medicineNameInput.required = true;
      medicinePurposeSelect.required = true;
    } else {
      medicineFields.hidden = true;
      medicineNameInput.required = false;
      medicinePurposeSelect.required = false;
      medicineNameInput.value = "";
      medicinePurposeSelect.value = "";
    }
  });

  /* ---------------------------------------
     Validation
  --------------------------------------- */
  function validateForm(profile) {
    if (!profile.age || profile.age < 1 || profile.age > 120) {
      return "Please enter a valid age between 1 and 120.";
    }
    if (!profile.gender) return "Please select your gender.";
    if (!profile.disease) return "Please select a health problem.";
    if (!profile.diet) return "Please select your diet type.";
    if (!profile.allergy) return "Please select a food allergy / preference option.";
    if (!profile.goal) return "Please select a health goal.";
    if (!profile.medicine) return "Please select whether you are taking medicine.";
    if (profile.medicine === "Yes") {
      if (!profile.medicineName || !profile.medicineName.trim()) {
        return "Please enter the medicine name.";
      }
      if (!profile.medicinePurpose) {
        return "Please select the medicine purpose / type.";
      }
    }
    return "";
  }

  function readProfile() {
    return {
      age: Number(document.getElementById("age").value),
      gender: document.getElementById("gender").value,
      disease: document.getElementById("disease").value.toLowerCase(),
      diet: document.getElementById("diet").value,
      allergy: document.getElementById("allergy").value,
      goal: document.getElementById("goal").value,
      medicine: document.getElementById("medicine").value,
      medicineName: (medicineNameInput.value || "").trim(),
      medicinePurpose: medicinePurposeSelect.value
    };
  }

  /* ---------------------------------------
     Product helpers (reuse product-data.js)
  --------------------------------------- */
  function getProduct(key) {
    if (typeof productDetails !== "undefined" && productDetails[key]) {
      return productDetails[key];
    }
    return {
      name: formatName(key),
      category: "Unknown",
      img: fallbackImg,
      description: "",
      benefits: ["Natural wellness support"],
      usage: "Use as part of a balanced diet.",
      precautions: "Consult a healthcare professional."
    };
  }

  function formatName(name) {
    return String(name)
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      });
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------------------------------------
     Scoring engine
  --------------------------------------- */
  function buildRecommendations(profile) {
    var excludeSet = {};
    var warnings = [];
    var keys = Object.keys(catalog);

    /* Allergy hard exclusions */
    if (profile.allergy && profile.allergy !== "none") {
      keys.forEach(function (key) {
        var flags = catalog[key].allergyFlags || [];
        if (flags.indexOf(profile.allergy) !== -1) {
          excludeSet[key] = true;
        }
      });
    }

    /* Medicine safety exclusions + warnings */
    if (profile.medicine === "Yes" && profile.medicinePurpose) {
      var safety = medicineSafety[profile.medicinePurpose] || medicineSafety.other;

      (safety.exclude || []).forEach(function (key) {
        excludeSet[key] = true;
      });

      if (safety.message) {
        warnings.push(safety.message);
      }

      warnings.push(
        "You reported taking \"" +
          profile.medicineName +
          "\" (" +
          (medicinePurposeSelect.options[medicinePurposeSelect.selectedIndex]
            ? medicinePurposeSelect.options[medicinePurposeSelect.selectedIndex].text
            : profile.medicinePurpose) +
          "). Herbs are NOT a replacement for prescribed medicine. Always consult a healthcare professional before combining herbs with medication."
      );
    }

    var scored = [];

    keys.forEach(function (key) {
      if (excludeSet[key]) return;

      var meta = catalog[key];
      var info = getProduct(key);
      var score = 0;
      var reasons = [];

      /* 1) Health problem match */
      if (meta.tags.indexOf(profile.disease) !== -1) {
        score += 40;
        reasons.push("Supports your selected health concern (" + (diseaseLabels[profile.disease] || profile.disease) + ")");
      }

      /* 2) Health goal match */
      var gTags = goalTags[profile.goal] || [];
      var goalHit = false;
      for (var i = 0; i < gTags.length; i++) {
        if (meta.tags.indexOf(gTags[i]) !== -1) {
          goalHit = true;
          break;
        }
      }
      if (goalHit) {
        score += 25;
        reasons.push("Aligns with your goal: " + (goalLabels[profile.goal] || profile.goal));
      }

      /* 3) Age suitability */
      if (meta.age === "all") {
        score += 10;
      } else if (meta.age === "adult" && profile.age >= 16) {
        score += 10;
      } else if (meta.age === "adult" && profile.age < 16) {
        score -= 20;
        reasons.push("Use only with pediatric guidance due to age");
      }

      if (profile.age >= 60 && (key === "isabgol" || key === "banana" || key === "pear")) {
        score += 5;
        reasons.push("Gentle option often suitable for older adults");
      }
      if (profile.age < 18 && (key === "ashwagandha" || key === "neem" || key === "giloy")) {
        score -= 15;
      }

      /* 4) Gender mild preference (wellness tips, not medical) */
      if (profile.gender === "Female" && (key === "aloe-vera" || key === "strawberry" || key === "pomegranate" || key === "amla")) {
        score += 5;
        reasons.push("Popular supportive choice for skin & general wellness");
      }
      if (profile.gender === "Male" && (key === "ashwagandha" || key === "ginger" || key === "banana")) {
        score += 5;
        reasons.push("Often chosen for energy and everyday vitality");
      }

      /* 5) Diet type (all catalog items are plant-based; small boost for vegan/veg) */
      if (profile.diet === "Vegan" || profile.diet === "Vegetarian") {
        score += 5;
        if (reasons.indexOf("Fits a plant-based diet") === -1) {
          reasons.push("Fits a plant-based diet");
        }
      } else {
        score += 3;
      }

      /* 6) Medicine caution (keep item but lower score + flag) */
      var cautionNote = "";
      if (profile.medicine === "Yes" && profile.medicinePurpose) {
        var s = medicineSafety[profile.medicinePurpose] || medicineSafety.other;
        if ((s.caution || []).indexOf(key) !== -1) {
          score -= 12;
          cautionNote = "Use with caution alongside your medicine — ask your doctor first.";
          reasons.push("Possible interaction risk with your medicine type");
        }
      }

      /* Only keep somewhat relevant items */
      if (score < 20) return;

      if (reasons.length === 0) {
        reasons.push("Generally supportive for everyday wellness");
      }

      var matchPercent = Math.max(35, Math.min(99, Math.round(score)));

      scored.push({
        key: key,
        name: info.name,
        category: info.category,
        img: info.img || fallbackImg,
        benefits: info.benefits || [],
        usage: info.usage || "",
        score: score,
        matchPercent: matchPercent,
        reasons: reasons,
        cautionNote: cautionNote
      });
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    var fruits = scored.filter(function (item) {
      return item.category === "Fruit";
    }).slice(0, 4);

    var herbs = scored.filter(function (item) {
      return item.category === "Herb";
    }).slice(0, 4);

    return {
      fruits: fruits,
      herbs: herbs,
      warnings: warnings,
      excludedCount: Object.keys(excludeSet).length
    };
  }

  /* ---------------------------------------
     Render UI
  --------------------------------------- */
  function renderItemCard(item) {
    var benefitsHtml = "";
    var maxBenefits = Math.min(3, item.benefits.length);
    for (var i = 0; i < maxBenefits; i++) {
      benefitsHtml += "<li>" + escapeHtml(item.benefits[i]) + "</li>";
    }

    var reasonsHtml = "";
    for (var r = 0; r < item.reasons.length; r++) {
      reasonsHtml += "<li>" + escapeHtml(item.reasons[r]) + "</li>";
    }

    var cautionHtml = item.cautionNote
      ? "<p class='item-caution'><i class='fa-solid fa-triangle-exclamation'></i> " +
        escapeHtml(item.cautionNote) +
        "</p>"
      : "";

    return (
      "<div class='product-card recommend-card'>" +
        "<div class='match-badge'>" + item.matchPercent + "% match</div>" +
        "<img src='" + escapeHtml(item.img) + "' alt='" + escapeHtml(item.name) + "' onerror=\"this.src='" + fallbackImg + "'\">" +
        "<h4>" + escapeHtml(item.name) + "</h4>" +
        "<p class='card-label'>Benefits</p>" +
        "<ul class='card-list'>" + benefitsHtml + "</ul>" +
        "<p class='card-label'>Why this was recommended?</p>" +
        "<ul class='card-list why-list'>" + reasonsHtml + "</ul>" +
        "<p class='card-usage'><strong>Usage:</strong> " + escapeHtml(item.usage) + "</p>" +
        cautionHtml +
      "</div>"
    );
  }

  function renderResults(profile, results) {
    lastProfile = profile;
    lastResults = results;
    hideFormShowResults();

    if (results.fruits.length === 0 && results.herbs.length === 0) {
      resultBox.innerHTML =
        "<div class='empty-state'>" +
          "<h3>No Safe Matches Found</h3>" +
          "<p>Based on your allergies and medicine safety filters, we could not recommend items right now. Try adjusting allergy/medicine options, or consult a healthcare professional.</p>" +
          "<button type='button' class='btn full-btn' id='regenEmptyBtn'>Regenerate Recommendations</button>" +
          "<button type='button' class='btn-secondary' id='editEmptyBtn'>Edit Profile</button>" +
        "</div>";
      bindResultActions();
      return;
    }

    var diseaseLabel = diseaseLabels[profile.disease] || profile.disease;
    var allergyLabel = allergyLabels[profile.allergy] || profile.allergy;
    var goalLabel = goalLabels[profile.goal] || profile.goal;

    var medicineSummary = "No";
    var purposeLabel =
      profile.medicinePurposeLabel || getMedicinePurposeLabel(profile.medicinePurpose);
    if (profile.medicine === "Yes") {
      medicineSummary =
        "Yes — " +
        escapeHtml(profile.medicineName) +
        " (" +
        escapeHtml(purposeLabel) +
        ")";
    }

    var html = "";

    html += "<div class='results-header'>";
    html += "<h2>Your Personal Recommendations</h2>";
    html += "<p>Based on your answers, here is your wellness profile and matched fruits & herbs.</p>";
    html += "</div>";

    html += "<div class='profile-summary'>";
    html += "<h3>Your Wellness Profile Summary</h3>";
    html += "<div class='profile-grid'>";
    html += "<p><strong>Age:</strong> " + profile.age + "</p>";
    html += "<p><strong>Gender:</strong> " + escapeHtml(profile.gender) + "</p>";
    html += "<p><strong>Health Problem:</strong> " + escapeHtml(diseaseLabel) + "</p>";
    html += "<p><strong>Diet Type:</strong> " + escapeHtml(profile.diet) + "</p>";
    html += "<p><strong>Allergy / Preference:</strong> " + escapeHtml(allergyLabel) + "</p>";
    html += "<p><strong>Health Goal:</strong> " + escapeHtml(goalLabel) + "</p>";
    html += "<p class='full-row'><strong>Medicine:</strong> " + medicineSummary + "</p>";
    html += "</div>";
    if (results.excludedCount > 0) {
      html +=
        "<p class='filter-note'><i class='fa-solid fa-filter'></i> " +
        results.excludedCount +
        " item(s) were excluded due to allergy or medicine-safety rules.</p>";
    }
    html += "</div>";

    if (results.warnings.length > 0) {
      html += "<div class='warning-box'>";
      html += "<h3><i class='fa-solid fa-triangle-exclamation'></i> Medicine & Safety Warnings</h3>";
      html += "<ul>";
      for (var w = 0; w < results.warnings.length; w++) {
        html += "<li>" + escapeHtml(results.warnings[w]) + "</li>";
      }
      html += "</ul>";
      html +=
        "<p class='disclaimer'><strong>Important:</strong> These suggestions are educational only. Do not stop or replace any prescribed medicine with herbs or fruits.</p>";
      html += "</div>";
    } else {
      html +=
        "<div class='info-box'><p>These suggestions are for general wellness education. Consult a healthcare professional for personalized medical advice.</p></div>";
    }

    html += "<h3 class='section-title'>Top 4 Recommended Fruits</h3>";
    if (results.fruits.length === 0) {
      html += "<p class='empty-inline'>No fruit matches after safety filtering.</p>";
    } else {
      html += "<div class='product-cards'>";
      for (var f = 0; f < results.fruits.length; f++) {
        html += renderItemCard(results.fruits[f]);
      }
      html += "</div>";
    }

    html += "<h3 class='section-title'>Top 4 Recommended Herbs</h3>";
    if (results.herbs.length === 0) {
      html += "<p class='empty-inline'>No herb matches after safety filtering.</p>";
    } else {
      html += "<div class='product-cards'>";
      for (var h = 0; h < results.herbs.length; h++) {
        html += renderItemCard(results.herbs[h]);
      }
      html += "</div>";
    }

    html += "<div class='action-row'>";
    html += "<p class='auto-save-note'><i class='fa-solid fa-floppy-disk'></i> Report auto-saved in your browser. You can open it anytime without filling the form again.</p>";
    html += "<button type='button' class='btn full-btn' id='saveRecBtn'>Save Another Copy</button>";
    html += "<button type='button' class='btn-secondary' id='regenBtn'>Regenerate Recommendations</button>";
    html += "<button type='button' class='btn-secondary' id='editProfileBtn'>Edit Profile</button>";
    html += "</div>";

    resultBox.innerHTML = html;
    bindResultActions();

    /* Always keep latest full report saved (skip when only re-opening) */
    profile.medicinePurposeLabel = purposeLabel;
    if (skipNextAutoSave) {
      skipNextAutoSave = false;
    } else {
      autoSaveReport(profile, results, false);
    }
  }

  /* ---------------------------------------
     Save / View / Remove (localStorage)
  --------------------------------------- */
  function getSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setSaved(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getLastReport() {
    try {
      var raw = localStorage.getItem(LAST_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setLastReport(entry) {
    localStorage.setItem(LAST_KEY, JSON.stringify(entry));
  }

  function makeReportEntry(profile, results) {
    return {
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
      profile: profile,
      fruits: results.fruits,
      herbs: results.herbs,
      warnings: results.warnings || [],
      excludedCount: results.excludedCount || 0
    };
  }

  function isSameProfile(a, b) {
    if (!a || !b) return false;
    return (
      Number(a.age) === Number(b.age) &&
      a.gender === b.gender &&
      a.disease === b.disease &&
      a.diet === b.diet &&
      a.allergy === b.allergy &&
      a.goal === b.goal &&
      a.medicine === b.medicine &&
      (a.medicineName || "") === (b.medicineName || "") &&
      (a.medicinePurpose || "") === (b.medicinePurpose || "")
    );
  }

  function autoSaveReport(profile, results, showAlert) {
    if (!profile || !results) return;

    var entry = makeReportEntry(profile, results);
    setLastReport(entry);

    var list = getSaved();
    if (list.length > 0 && isSameProfile(list[0].profile, profile)) {
      entry.id = list[0].id;
      list[0] = entry;
    } else {
      list.unshift(entry);
    }
    if (list.length > 20) list = list.slice(0, 20);
    setSaved(list);

    if (showAlert) {
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Report saved. You can open it later without filling the form.",
        timer: 1600,
        showConfirmButton: false
      });
    }

    if (savedPanel && !savedPanel.hidden) renderSavedList();
  }

  function saveCurrentRecommendation(showAlert) {
    if (!lastProfile || !lastResults) {
      Swal.fire({
        icon: "info",
        title: "Nothing to Save",
        text: "Generate a recommendation first."
      });
      return;
    }
    /* Force a new copy in the list */
    var entry = makeReportEntry(lastProfile, lastResults);
    setLastReport(entry);
    var list = getSaved();
    list.unshift(entry);
    if (list.length > 20) list = list.slice(0, 20);
    setSaved(list);

    if (showAlert !== false) {
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Report copy saved. Open it anytime from My Saved Reports.",
        timer: 1600,
        showConfirmButton: false
      });
    }
    if (savedPanel && !savedPanel.hidden) renderSavedList();
  }

  function hydrateItems(items) {
    if (!items || !items.length) return [];
    return items.map(function (item) {
      if (item.benefits && item.usage && item.img) return item;
      var info = getProduct(item.key);
      return {
        key: item.key,
        name: item.name || info.name,
        category: item.category || info.category,
        img: item.img || info.img || fallbackImg,
        benefits: item.benefits || info.benefits || [],
        usage: item.usage || info.usage || "",
        score: item.score || item.matchPercent || 50,
        matchPercent: item.matchPercent || 50,
        reasons: item.reasons || ["Saved from your previous recommendation"],
        cautionNote: item.cautionNote || ""
      };
    });
  }

  function openSavedReport(entry) {
    if (!entry || !entry.profile) return;

    var results = {
      fruits: hydrateItems(entry.fruits || []),
      herbs: hydrateItems(entry.herbs || []),
      warnings: entry.warnings || [],
      excludedCount: entry.excludedCount || 0
    };

    fillFormFromProfile(entry.profile);
    setLastReport(entry);
    skipNextAutoSave = true;
    renderResults(entry.profile, results);
  }

  function removeSaved(id) {
    var list = getSaved().filter(function (item) {
      return item.id !== id;
    });
    setSaved(list);

    var last = getLastReport();
    if (last && last.id === id) {
      if (list.length > 0) setLastReport(list[0]);
      else localStorage.removeItem(LAST_KEY);
    }

    renderSavedList();
    Swal.fire({
      icon: "success",
      title: "Removed",
      text: "Saved report deleted.",
      timer: 1200,
      showConfirmButton: false
    });
  }

  function renderSavedList() {
    var list = getSaved();
    if (list.length === 0) {
      savedList.innerHTML =
        "<div class='empty-state compact'><p>No saved reports yet. Generate a recommendation and it will be saved automatically.</p></div>";
      return;
    }

    var html = "";
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var p = item.profile || {};
      var fruitNames = (item.fruits || [])
        .map(function (f) {
          return (f.name || f.key) + (f.matchPercent ? " (" + f.matchPercent + "%)" : "");
        })
        .join(", ");
      var herbNames = (item.herbs || [])
        .map(function (h) {
          return (h.name || h.key) + (h.matchPercent ? " (" + h.matchPercent + "%)" : "");
        })
        .join(", ");

      html += "<div class='saved-card'>";
      html += "<div class='saved-card-top'>";
      html += "<strong>Saved:</strong> " + escapeHtml(item.savedAt || "");
      html +=
        "<button type='button' class='remove-btn' data-id='" +
        item.id +
        "'><i class='fa-solid fa-trash'></i> Remove</button>";
      html += "</div>";
      html +=
        "<p><strong>Profile:</strong> Age " +
        (p.age || "-") +
        ", " +
        escapeHtml(p.gender || "-") +
        ", " +
        escapeHtml(diseaseLabels[p.disease] || p.disease || "-") +
        ", Goal: " +
        escapeHtml(goalLabels[p.goal] || p.goal || "-") +
        "</p>";
      if (p.medicine === "Yes") {
        html +=
          "<p><strong>Medicine:</strong> " +
          escapeHtml(p.medicineName || "") +
          " (" +
          escapeHtml(p.medicinePurposeLabel || p.medicinePurpose || "") +
          ")</p>";
      }
      html += "<p><strong>Fruits:</strong> " + escapeHtml(fruitNames || "None") + "</p>";
      html += "<p><strong>Herbs:</strong> " + escapeHtml(herbNames || "None") + "</p>";
      html +=
        "<button type='button' class='btn-secondary view-saved-btn' data-id='" +
        item.id +
        "'>View Full Report</button>";
      html += "</div>";
    }

    savedList.innerHTML = html;

    var removeButtons = savedList.querySelectorAll(".remove-btn");
    for (var b = 0; b < removeButtons.length; b++) {
      removeButtons[b].addEventListener("click", function (e) {
        var id = Number(e.currentTarget.getAttribute("data-id"));
        removeSaved(id);
      });
    }

    var viewButtons = savedList.querySelectorAll(".view-saved-btn");
    for (var v = 0; v < viewButtons.length; v++) {
      viewButtons[v].addEventListener("click", function (e) {
        var id = Number(e.currentTarget.getAttribute("data-id"));
        var found = getSaved().filter(function (x) {
          return x.id === id;
        })[0];
        if (found) openSavedReport(found);
      });
    }
  }

  toggleSavedBtn.addEventListener("click", function () {
    showSavedReportsOnly();
  });

  if (backToFormBtn) {
    backToFormBtn.addEventListener("click", function () {
      showFormHideResults();
    });
  }

  function regenerateRecommendations() {
    var profile = lastProfile || readProfile();
    var error = validateForm(profile);
    if (error) {
      Swal.fire({ icon: "error", title: "Validation", text: error });
      return;
    }
    var results = buildRecommendations(profile);
    Swal.fire({
      icon: "success",
      title: "Recommendations Updated",
      text: "Fresh top matches calculated for your profile.",
      timer: 1400,
      showConfirmButton: false
    });
    renderResults(profile, results);
  }

  /* ---------------------------------------
     Form submit
  --------------------------------------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var profile = readProfile();
    var error = validateForm(profile);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Please Check the Form",
        text: error
      });
      return;
    }

    profile.medicinePurposeLabel = getMedicinePurposeLabel(profile.medicinePurpose);

    var results = buildRecommendations(profile);

    Swal.fire({
      icon: "success",
      title: "Recommendation Generated",
      text: "Report saved. You can open it later anytime.",
      timer: 1500,
      showConfirmButton: false
    });

    renderResults(profile, results);
  });
}
