from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Database connection
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "weather_db"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASS", "password")
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route('/temperature', methods=['POST'])
def store_temperature():
    data = request.get_json()
    temp = data.get('temperature')
    
    if temp is None:
        return jsonify({"status": "error", "message": "Missing temperature"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Inserting the transformed data into table
        cur.execute(
            'INSERT INTO weather_logs (temperature) VALUES (%s) RETURNING id',
            (temp,)
        )
        db_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({"status": "stored", "db_id": db_id}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)