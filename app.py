from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# -------------------------
# 1. PC Carbon Calculator
# -------------------------
@app.route("/pc-carbon", methods=["POST"])
def pc_carbon():
    power = float(request.form["power"])
    hours = float(request.form["hours"])

    daily_kwh = (power * hours) / 1000
    co2_factor = 0.7

    daily_co2 = daily_kwh * co2_factor
    monthly_co2 = daily_co2 * 30

    return jsonify({
        "daily_kwh": round(daily_kwh, 2),
        "daily_co2": round(daily_co2, 2),
        "monthly_co2": round(monthly_co2, 2)
    })

# -------------------------
# 2. AI Model Energy Checker
# -------------------------
@app.route("/ai-model", methods=["POST"])
def ai_model():
    model = request.form["model"]
    energy = {
        "Logistic Regression": 0.1,
        "Random Forest": 0.5,
        "Small Neural Network": 1.2,
        "Large Neural Network": 5.0
    }

    co2 = energy[model] * 0.7

    return jsonify({
        "energy": energy[model],
        "co2": round(co2, 2)
    })

# -------------------------
# 3. Website Carbon Checker
# -------------------------
@app.route("/website-carbon", methods=["POST"])
def website_carbon():
    url = request.form["url"]

    try:
        response = requests.get(url)
        size_kb = len(response.content) / 1024
        co2 = size_kb * 0.0002
    except:
        return jsonify({"error": "Unable to load website"})

    return jsonify({
        "size_kb": round(size_kb, 2),
        "co2": round(co2, 6)
    })

if __name__ == "__main__":
    app.run(debug=True)
