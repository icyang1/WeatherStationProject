Endpont: POST / Sample
Protocol: HTTPS
Communication format: JSON

Input JSON Example (from Sensor):
{
  "sensorId": "WS-001",
  "voltage": 3.45,
  "timestamp": "2026-03-18T19:00:00Z"
}

Output JSON Example (To Pipeline):
{
  "status": "processed",
  "filteredValue": 3.45,
  "unit": "V"
}

Design Explanation:
Sampler API manages the data processing. it uses JSON to validate and makes sures the pipeline won't fail
