Endpoint: POST /temperature
Communication Format: JSON
Protocol: HTTP

Input JSON Example (From Transformer): 
{
  "temperature": 25.0,
  "unit": "Celsius",
  "timestamp": "2026-04-12T18:30:00Z"
}

Output JSON Example (confirmation): 
{
  "status": "stored",
  "db_id": 1,
  "message": "Data persisted successfully"
}

Design Explanation: REST API serves as the "gatekeeper" for the database. Ensures the Transformer gets confirmation that the data is safe with POST pattern.
