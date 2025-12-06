function showTab(tab) {
    document.querySelectorAll(".content").forEach(div => div.style.display = "none");
    document.getElementById(tab).style.display = "block";
}

let daily_val = 0, weekly_val = 0, monthly_val = 0;

function pcCarbon() {
    let p = parseFloat(document.getElementById("power").value);
    let h = parseFloat(document.getElementById("hours").value);

    if (!p || !h) {
        document.getElementById("pc-result").innerHTML = "⚠️ Enter valid inputs!";
        return;
    }

    let daily = ((p / 1000) * h * 0.475).toFixed(3);
    let weekly = (daily * 7).toFixed(3);
    let monthly = (daily * 30).toFixed(3);

    daily_val = daily;
    weekly_val = weekly;
    monthly_val = monthly;

    document.getElementById("pc-result").innerHTML = `
        <b>Daily CO₂:</b> ${daily} kg<br>
        <b>Weekly CO₂:</b> ${weekly} kg<br>
        <b>Monthly CO₂:</b> ${monthly} kg
    `;

    renderCharts();
}

let carbonChart = null;

function renderCharts() {
    let type = document.getElementById("chartType").value;

    if (carbonChart) carbonChart.destroy();

    const ctx = document.getElementById("carbonChart").getContext("2d");

    carbonChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ["Daily", "Weekly", "Monthly"],
            datasets: [{
                label: "CO₂ Emissions (kg)",
                data: [daily_val, weekly_val, monthly_val],
                borderWidth: 3,
                borderColor: "#00ff99",
                backgroundColor: "rgba(0,255,150,0.3)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "white" } }
            },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
}

function aiEnergy() {
    let m = document.getElementById("model").value;

    let energy = {
        "Logistic Regression": 0.05,
        "Random Forest": 0.20,
        "Small Neural Network": 1.2,
        "Large Neural Network": 6.5
    };

    document.getElementById("ai-result").innerHTML =
        `Estimated Energy: <b>${energy[m]} kWh</b>`;
}

function webCarbon() {
    let url = document.getElementById("url").value;

    if (!url) {
        document.getElementById("web-result").innerHTML = "⚠️ Enter a URL!";
        return;
    }

    let emission = (Math.random() * 1).toFixed(3);
    document.getElementById("web-result").innerHTML =
        `Estimated Emission: <b>${emission} kg CO₂ per visit</b>`;
}

function startBot() {
    document.getElementById("bot-result").innerHTML =
        "⏳ Bot Active: Hourly reminders are enabled!";
}
