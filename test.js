const { processData } = require('./sampler.js');

function testSampler() {
    console.log("Running Unit Tests...");
    
    // Test 1: Valid Data
    const valid = processData({ voltage: 3.5 });
    if (valid && valid.filteredValue === 3.5) {
        console.log("Test 1 Passed: Valid data processed");
    } else {
        console.log("Test 1 Failed");
        process.exit(1);
    }

    // Test 2: Invalid Data
    const invalid = processData({ voltage: 10.0 });
    if (invalid === null) {
        console.log("Test 2 Passed: Invalid data rejected");
    } else {
        console.log("Test 2 failed");
        process.exit(1);
    }
}

testSampler();
