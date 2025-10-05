const fs = require("fs");
const path = require("path");
const swaggerSpec = require("../swagger"); // Adjust the path to your swagger.js file accordingly

const outputFile = path.join(__dirname, "../swagger_output.json");

fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2), "utf-8");

console.log(`Swagger JSON successfully generated at ${outputFile}`);
