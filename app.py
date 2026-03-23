from flask import Flask, request, jsonify

app = Flask(__name__)

VOLTAGE_TO_TEMP_FACTOR = 20  # Example: 1.25V * 20 = 25.0C
MIN_SAFE_VOLTAGE = 0.0
MAX_SAFE_VOLTAGE = 5.0

@app.route('/transform', methods=['POST'])
def transform():
    try:
        # Get JSON data from the Sampler
        data = request.get_json()
        
        # Check if raw_voltage exists (Safety Tactic)
        if 'raw_voltage' not in data:
            return jsonify({"error": "Missing 'raw_voltage' field"}), 400
            
        voltage = float(data['raw_voltage'])
        
        # Additional Safety Check
        if not (MIN_SAFE_VOLTAGE <= voltage <= MAX_SAFE_VOLTAGE):
            return jsonify({"error": "Voltage out of physical range"}), 400

        # --- THE TRANSFORMER LOGIC ---
        # Task 2: Converts voltage to temperature
        temperature_c = voltage * VOLTAGE_TO_TEMP_FACTOR
        
        # Task 1/5: Return the JSON result
        return jsonify({
            "sensor_id": data.get('sensor_id', 'unknown'),
            "temperature_c": round(temperature_c, 2),
            "unit": "Celsius",
            "status": "success"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Runs on Port 5001 to match sampler.js
    print("Transformer Service starting on http://127.0.0.1:5001")
    app.run(host='127.0.0.1', port=5001, debug=True)
