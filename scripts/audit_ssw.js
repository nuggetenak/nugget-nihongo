const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");
const masterFile = path.join(__dirname, "../corpus/sections/synthesis/syllabi/NUGGET-CURRICULUM-SSW-MASTER-SYLLABUS-v1.md");
const masterBibFile = path.join(__dirname, "../corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md");
const refDir = path.join(__dirname, "../../reference-books/ssw");

const bibContent = fs.readFileSync(masterBibFile, "utf8");
const validCitations = new Set();
const bibMatches = bibContent.match(/\[([A-Z]{2,4}-[0-9]+)\]/g) || [];
bibMatches.forEach(m => validCitations.add(m.replace(/[\[\]]/g, "")));

console.log(`Loaded ${validCitations.size} valid citation keys from MASTER-BIBLIOGRAPHY-FINAL.md`);

const files = fs.readdirSync(sswDir).filter(f => f.endsWith(".md")).sort();

console.log(`Auditing ${files.length} SSW syllabi and Master Syllabus...\n`);

let totalErrors = 0;

files.forEach(f => {
  const filePath = path.join(sswDir, f);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  let s4Count = 0;
  let inS4 = false;
  let s3SubSubCount = 0;
  let s3TopicCount = 0;

  for (const line of lines) {
    if (line.startsWith("## 4.")) inS4 = true;
    else if (line.startsWith("## 5.")) inS4 = false;
    else if (inS4 && line.startsWith("|") && !line.includes("---") && !line.includes("Kanji")) {
      s4Count++;
    }

    if (/^- \*\*Topik \d+\.\d+\.\d+:/.test(line.trim())) {
      s3SubSubCount++;
    } else if (/^- \*\*Topik \d+\.\d+:/.test(line.trim())) {
      s3TopicCount++;
    }
  }

  // Check path references
  const pathMatches = content.match(/reference-books\/ssw\/[^\s\)`"']+/g) || [];
  const missingPaths = [];
  [...new Set(pathMatches)].forEach(p => {
    const relToSsw = p.replace("reference-books/ssw/", "");
    const fullOnDisk = path.join(refDir, relToSsw);
    if (!fs.existsSync(fullOnDisk)) {
      missingPaths.push(p);
      totalErrors++;
    }
  });

  // Check citation keys
  const citMatches = content.match(/\[(VS|EA|CA|SR|TE|BC|PR|CM|ER|OD|KS|MV|SC)-[0-9]+\]/g) || [];
  const invalidCits = [];
  citMatches.forEach(c => {
    const key = c.replace(/[\[\]]/g, "");
    if (!validCitations.has(key)) {
      invalidCits.push(key);
      totalErrors++;
    }
  });

  // Check specific requirements for this file
  const fileNotes = [];
  if (s4Count < 35) {
    fileNotes.push(`S4 Lexicon count is ${s4Count} (Needs 35+)`);
  }
  if (s3SubSubCount === 0) {
    fileNotes.push(`S3 lacks sub-sub-topics X.Y.Z (has ${s3TopicCount} X.Y topics)`);
  }

  if (f === "SSW-01-KAIGO-ELDERCARE-SYLLABUS.md") {
    if (content.includes("Pronovost")) fileNotes.push("Still contains misattributed Pronovost!");
    const painCount = (content.match(/\d+\.\s+[^\n]+->/g) || []).length;
    if (painCount < 42) fileNotes.push(`Pain onomatopoeia count is ${painCount} (Needs 42)`);
  }

  if (f === "SSW-18-AUTOMOBILE-TRANSPORT-SYLLABUS.md") {
    if (!content.includes("Dai-ni-shu") && !content.includes("第二種")) {
      fileNotes.push("Missing Class 2 Commercial Driver's License (Dai-ni-shu Menkyo) note!");
    }
  }

  if (f === "SSW-19-RAILWAY-OPERATIONS-SYLLABUS.md") {
    if (!content.includes("JTOA") || !content.includes("Transport_Taxi_Driver_Sample_Exam_JA.pdf")) {
      fileNotes.push("Missing JTOA provenance note for Transport_Taxi_Driver_Sample_Exam_JA.pdf!");
    }
  }

  console.log(`[${f}]`);
  console.log(`  S4 Terms: ${s4Count} | S3 Sub-sub: ${s3SubSubCount} | S3 Topics: ${s3TopicCount}`);
  if (missingPaths.length > 0) {
    console.log(`  MISSING PATHS (${missingPaths.length}):`);
    missingPaths.forEach(mp => console.log(`    - ${mp}`));
  }
  if (invalidCits.length > 0) {
    console.log(`  INVALID CITATIONS: ${invalidCits.join(", ")}`);
  }
  if (fileNotes.length > 0) {
    console.log(`  NOTES: ${fileNotes.join(" | ")}`);
  }
});

// Master Syllabus Audit
console.log("\n[NUGGET-CURRICULUM-SSW-MASTER-SYLLABUS-v1.md]");
const masterContent = fs.readFileSync(masterFile, "utf8");
const masterLines = masterContent.split("\n");

// Check decoupling
const s3Headings = masterLines.filter(l => /^#### 3\.\d+/.test(l));
console.log(`  Section 3 subsections count: ${s3Headings.length} (Target: 19, from 3.1 to 3.19)`);
s3Headings.forEach(h => console.log(`    ${h}`));

// Check citations
const masterCitMatches = masterContent.match(/\[(VS|EA|CA|SR|TE|BC|PR|CM|ER|OD|KS|MV|SC)-[0-9]+\]/g) || [];
const masterInvalidCits = [];
masterCitMatches.forEach(c => {
  const key = c.replace(/[\[\]]/g, "");
  if (!validCitations.has(key)) {
    masterInvalidCits.push(key);
  }
});
if (masterInvalidCits.length > 0) {
  console.log(`  Invalid citations in Master: ${[...new Set(masterInvalidCits)].join(", ")}`);
}

// Check Pronovost & MHLW [VS-40]
if (masterContent.includes("Pronovost")) {
  console.log("  WARNING: Master still contains misattributed Pronovost!");
}
if (masterContent.includes("Rousai (MHLW 2023 [VS-40])") || masterContent.includes("ROUSAI 4-TIER (MHLW 2023 [VS-40])")) {
  console.log("  WARNING: Master still misattributes MHLW Rousai to [VS-40] (should be [VS-28])!");
}

// Check 42 onomatopoeia in 3.1
const master31PainMatches = masterContent.match(/\[42 ONOMATOPOEIA NYERI LANSIA/);
console.log(`  Master 3.1 contains 42 Onomatopoeia Matrix header: ${!!master31PainMatches}`);

console.log(`\nAudit completed. Total path/citation errors detected: ${totalErrors}`);
