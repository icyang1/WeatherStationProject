import pytest
from app import app  # This imports your Flask 'app' from app.py

@pytest.fixture
def client():
    # This creates a "fake" browser to talk to your Flask app
    return app.test_client()

def test_transform_conversion(client):
    # --- PASTE YOUR JSON HERE AS A DICTIONARY ---
    test_data = {
        "sensor_id": "DHT11_01",
        "raw_voltage": 1.25,
        "timestamp": "2026-03-22T16:20:00Z"
    }
    
    # This sends the JSON to your /transform endpoint
    response = client.post('/transform', json=test_data)
    
    # This checks if the code actually worked
    assert response.status_code == 200
    json_result = response.get_json()
    assert json_result["temperature_c"] == 25.0  # (Assuming 1.25 * 20 = 25)