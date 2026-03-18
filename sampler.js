const http = require('http');

// Simple logic to "sample" or filter data
function processData(data) {
    if (data.voltage < 0 || data.voltage > 5) return null; // Logic check
    return {
        status: "processed",
        filteredValue: data.voltage,
        unit: "V"
    };
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/sample') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const result = processData(JSON.parse(body));
                res.writeHead(result ? 200 : 400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result || {error: "Invalid Voltage"}));
            } catch (e) {
                res.writeHead(400);
                res.end();
            }
        });
    }
});

if (require.main === module) {
    server.listen(3000, () => console.log('Sampler running on port 3000'));
}

module.exports = { processData }; // Export for unit tests
