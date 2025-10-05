const fs = require("fs");
const path = require("path");
const swaggerSpec = require("../swagger"); // Adjust path accordingly

const outputPath = path.resolve(__dirname, "../swagger_output.json");

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log(`Swagger JSON written to ${outputPath}`);
