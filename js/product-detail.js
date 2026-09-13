window.onload = function () {

  let hamburger = document.getElementById("hamburger");
  let navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.onclick = function () {
      navMenu.classList.toggle("active");
    };
  }
};

document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("product");
  const cameFrom = params.get("from"); // "home" or "product"

  const nameEl = document.getElementById("productName");
  const categoryEl = document.getElementById("productCategory");
  const imgEl = document.getElementById("productImage");
  const descEl = document.getElementById("productDesc");
  const benefitsEl = document.getElementById("productBenefits");
  const usageEl = document.getElementById("productUsage");
  const quickFactEl = document.getElementById("productQuickFact");
  const precautionsEl = document.getElementById("productPrecautions");
  const backBtn = document.getElementById("backBtn");

  // ---- Back button goes to Home if user came from Home, else to Products page ----
  if (backBtn) {
    if (cameFrom === "home") {
      backBtn.href = "index.html";
      backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to Home';
    } else {
      backBtn.href = "product.html";
      backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to All Products';
    }
  }

  const data = (typeof productDetails !== "undefined" && slug) ? productDetails[slug] : null;

  if (!data) {
    nameEl.textContent = "Product Not Found";
    categoryEl.textContent = "";
    descEl.textContent = "Sorry, we could not find details for this product. Please go back and choose a product from the list.";
    if (imgEl) imgEl.style.display = "none";
    if (benefitsEl) benefitsEl.style.display = "none";
    if (usageEl) usageEl.style.display = "none";
    if (quickFactEl) quickFactEl.style.display = "none";
    if (precautionsEl) precautionsEl.style.display = "none";
    return;
  }

  document.title = data.name + " | NutriCare";
  nameEl.textContent = data.name;
  categoryEl.textContent = data.category;

  imgEl.src = data.img;
  imgEl.alt = data.name;

  descEl.textContent = data.description;

  benefitsEl.innerHTML = "";
  data.benefits.forEach(function (benefit) {
    const li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + benefit;
    benefitsEl.appendChild(li);
  });

  usageEl.textContent = data.usage;

  if (quickFactEl) {
    quickFactEl.textContent = data.quickFact || "No additional fact available.";
  }

  if (precautionsEl) {
    precautionsEl.textContent = data.precautions || "Please use in moderation and consult a healthcare professional if unsure.";
  }

});
