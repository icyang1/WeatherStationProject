Endpoint: POST /transform
Communication Format: JSON
Protocol: HTTP/REST

Input JSON Example (From Sampler): {
  "sensorId": "WS-001",
  "voltage": 1.25,
  "timestamp": "2026-03-22T22:42:00Z"
}

Output JSON Example (To Pipeline): {
  "status": "processed",
  "temperature": 25.0,
  "unit": "Celsius",
  "originalVoltage": 1.25
}
Design Explanation: Transformer API manages the data processing layer. Uses JSON to validate the incoming sensor data and converts electric signals to values.
