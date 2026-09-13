//without user login

// if (localStorage.getItem("isLogin") !== "true") {
//   alert("Please login first");
//   window.location.href = "index.html";
// }

document.addEventListener("DOMContentLoaded", function () {

    const HISTORY_KEY = "bmiHistory";

    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");

    const bmiValueEl = document.getElementById("bmiValue");
    const bmiStatusEl = document.getElementById("bmiStatus");
    const bmiRangeEl = document.getElementById("bmiRange");
    const bmiTipEl = document.getElementById("bmiTip");

    const historyBody = document.getElementById("historyBody");
    const historyTable = document.getElementById("historyTable");
    const noHistoryMsg = document.getElementById("noHistoryMsg");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    const chartCanvas = document.getElementById("bmiChart");
    const noChartMsg = document.getElementById("noChartMsg");

    // ---------- helpers ----------

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveHistory(history) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }

    function getStatus(bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 24.9) return "Normal Weight";
        if (bmi < 29.9) return "Overweight";
        return "Obese";
    }

    function getRecommendation(status) {
        switch (status) {
            case "Underweight":
                return "Try adding more nutrient-dense foods like nuts, dairy, and fruits to your diet, and consider consulting a nutritionist for a healthy weight gain plan.";
            case "Normal Weight":
                return "Great job! You're in a healthy range. Keep maintaining a balanced diet and stay active with regular exercise.";
            case "Overweight":
                return "Focus on a balanced diet, reduce sugary and fried foods, and try to include at least 30 minutes of daily physical activity.";
            default:
                return "Consider consulting a doctor or dietitian for a personalized weight management plan along with regular physical activity.";
        }
    }

    function getHealthyRange(heightCm) {
        const h = heightCm / 100;
        const minWeight = (18.5 * h * h).toFixed(1);
        const maxWeight = (24.9 * h * h).toFixed(1);
        return minWeight + " kg - " + maxWeight + " kg";
    }

    // ---------- history table ----------

    function renderHistory() {
        const history = getHistory();

        if (!historyBody) return;
        historyBody.innerHTML = "";

        if (history.length === 0) {
            if (noHistoryMsg) noHistoryMsg.style.display = "block";
            if (historyTable) historyTable.style.display = "none";
        } else {
            if (noHistoryMsg) noHistoryMsg.style.display = "none";
            if (historyTable) historyTable.style.display = "table";

            history.forEach(function (entry) {
                const row = document.createElement("tr");
                row.innerHTML =
                    "<td>" + entry.date + "</td>" +
                    "<td>" + entry.height + "</td>" +
                    "<td>" + entry.weight + "</td>" +
                    "<td>" + entry.bmi + "</td>" +
                    "<td>" + entry.status + "</td>";
                historyBody.appendChild(row);
            });
        }

        renderChart(history);
    }

    // ---------- progress chart (plain canvas, no external library) ----------

    function renderChart(history) {
        if (!chartCanvas) return;

        const ctx = chartCanvas.getContext("2d");
        const container = chartCanvas.parentElement;

        const width = container.clientWidth - 60 > 250 ? container.clientWidth - 60 : 250;
        chartCanvas.width = width;
        chartCanvas.height = 280;

        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

        if (history.length === 0) {
            if (noChartMsg) noChartMsg.style.display = "block";
            chartCanvas.style.display = "none";
            return;
        }

        if (noChartMsg) noChartMsg.style.display = "none";
        chartCanvas.style.display = "block";

        const padding = 40;
        const w = chartCanvas.width;
        const h = chartCanvas.height;

        const bmiValues = history.map(function (e) { return parseFloat(e.bmi); });
        const maxBmi = Math.max.apply(null, bmiValues.concat([30])) + 3;
        const minBmi = Math.min.apply(null, bmiValues.concat([15])) - 3;

        // axes
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, 10);
        ctx.lineTo(padding, h - padding);
        ctx.lineTo(w - 10, h - padding);
        ctx.stroke();

        const stepX = (w - padding - 20) / Math.max(history.length - 1, 1);

        function getY(bmi) {
            return h - padding - ((bmi - minBmi) / (maxBmi - minBmi)) * (h - padding - 20);
        }

        // line connecting points
        ctx.strokeStyle = "#2e8b57";
        ctx.lineWidth = 2;
        ctx.beginPath();
        history.forEach(function (entry, i) {
            const x = padding + stepX * i;
            const y = getY(parseFloat(entry.bmi));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // points and labels
        history.forEach(function (entry, i) {
            const x = padding + stepX * i;
            const y = getY(parseFloat(entry.bmi));

            ctx.fillStyle = "#2e8b57";
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#0f172a";
            ctx.font = "11px Arial";
            ctx.textAlign = "center";
            ctx.fillText(entry.bmi, x, y - 10);

            ctx.fillStyle = "#555";
            const shortDate = entry.date.split(",")[0];
            ctx.fillText(shortDate, x, h - padding + 16);
        });
    }

    // ---------- clear history ----------

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener("click", function () {
            Swal.fire({
                title: "Clear History?",
                text: "This will remove all your saved BMI records.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2e8b57",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, clear it!"
            }).then(function (result) {
                if (result.isConfirmed) {
                    localStorage.removeItem(HISTORY_KEY);
                    renderHistory();
                }
            });
        });
    }

    window.addEventListener("resize", function () {
        renderChart(getHistory());
    });

    // ---------- form submit ----------

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

        let height = heightInput.value;
        let weight = weightInput.value;

        if (height === "" || weight === "" || height <= 0 || weight <= 0) {
            Swal.fire({
                icon: "error",
                title: "Missing Input!",
                text: "Please enter valid height and weight values."
            });
            return;
        }

        let heightM = height / 100;
        let bmi = (weight / (heightM * heightM)).toFixed(2);

        let status = getStatus(bmi);
        let range = getHealthyRange(height);
        let tip = getRecommendation(status);

        bmiValueEl.innerHTML = "<strong>BMI:</strong> " + bmi;
        bmiStatusEl.innerHTML = "<strong>Status:</strong> " + status;
        bmiRangeEl.innerHTML = "<strong>Healthy Weight Range:</strong> " + range;
        bmiTipEl.innerHTML = "<strong>Recommendation:</strong> " + tip;

        // save this record into history (keep last 10 entries)
        const history = getHistory();
        history.push({
            date: new Date().toLocaleString(),
            height: height,
            weight: weight,
            bmi: bmi,
            status: status
        });

        while (history.length > 10) history.shift();

        saveHistory(history);
        renderHistory();

        Swal.fire({
            icon: "success",
            title: "BMI Calculated!",
            text: "Your BMI is " + bmi + " (" + status + ")"
        });
    });

    // initial render of history + chart on page load
    renderHistory();

});


window.onload = function () {

      let hamburger = document.getElementById("hamburger");
      let navMenu = document.getElementById("navMenu");

    hamburger.onclick = function () 
      { 
        navMenu.classList.toggle("active");
      };
    }
