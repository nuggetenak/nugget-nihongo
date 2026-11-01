const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync("C:/Users/Timedoor/.gemini/antigravity/brain/315bcf6d-badf-4ef8-9b03-5fab71855574/.system_generated/steps/5345/output.txt", "utf8");
const parsed = JSON.parse(raw);
const targetPath = path.resolve(__dirname, "../src/types/database.types.ts");
fs.writeFileSync(targetPath, parsed.types, "utf8");
console.log("Successfully wrote database.types.ts, length:", parsed.types.length);
