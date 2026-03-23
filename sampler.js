const http = require('http');

/**
 * Task 3/5: Validation Logic
 * Simple check to ensure voltage is within a safe physical range (0-5V).
 */
function processData(data) {
    if (data.voltage === undefined || data.voltage < 0 || data.voltage > 5) {
        return null; 
    }
    return {
        sensor_id: data.sensor_id || "UNKNOWN_SENSOR",
        voltage: data.voltage,
        timestamp: new Date().toISOString()
    };
}

/**
 * Task 5: Integration with Transformer
 * This function sends the validated voltage to the Python Flask service.
 */
function sendToTransformer(validatedData, callback) {
    const postData = JSON.stringify({
        sensor_id: validatedData.sensor_id,
        raw_voltage: validatedData.voltage,
        timestamp: validatedData.timestamp
    });

    const options = {
        hostname: '127.0.0.1',
        port: 5001, // Port where your Python Transformer is running
        path: '/transform',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
            try {
                callback(null, JSON.parse(body));
            } catch (e) {
                callback("Error parsing Transformer response");
            }
        });
    });

    req.on('error', (e) => {
        callback(`Transformer connection failed: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

/**
 * Main Server Logic
 */
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/sample') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const input = JSON.parse(body);
                const validated = processData(input);

                if (!validated) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({ error: "Invalid Voltage (Must be 0-5V)" }));
                }

                // Forward to Transformer
                sendToTransformer(validated, (err, transformerResult) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify({ error: err }));
                    }

                    // Return the final temperature to the original requester
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        status: "Success",
                        received_voltage: validated.voltage,
                        transformer_output: transformerResult
                    }));
                });

            } catch (e) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON format" }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

// Start the Sampler
const PORT = 3000;
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Sampler (Node.js) running at http://127.0.0.1:${PORT}`);
        console.log(`Forwarding requests to Transformer at http://127.0.0.1:5001/transform`);
    });
}

module.exports = { processData };