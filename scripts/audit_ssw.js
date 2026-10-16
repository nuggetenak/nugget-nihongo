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

// Specific citation requirements mapping
const specificRequirements = {
  "SSW-01-KAIGO-ELDERCARE-SYLLABUS.md": {
    required: ["VS-39", "VS-35"],
    forbidden: ["Pronovost"],
    name: "Kaigo (JNIOSH [VS-39], Nurjaleka [VS-35], no Pronovost)"
  },
  "SSW-02-BUILDING-CLEANING-SYLLABUS.md": {
    required: ["VS-01", "VS-02", "VS-09", "VS-10", "VS-39", "VS-31", "VS-33", "EA-25"],
    name: "Building Cleaning ([VS-01],[02],[09],[10],[39],[31],[33],[EA-25])"
  },
  "SSW-06-AUTOMOBILE-MAINTENANCE-SYLLABUS.md": {
    required: ["VS-54"],
    forbidden: ["[VS-41]"],
    name: "Automobile Maintenance (JASPA [VS-54] not [VS-41])"
  },
  "SSW-07-SHIPBUILDING-MARINE-SYLLABUS.md": {
    required: ["VS-50"],
    forbidden: ["[VS-42]"],
    name: "Shipbuilding (ClassNK [VS-50] not [VS-42])"
  },
  "SSW-08-AVIATION-INDUSTRY-SYLLABUS.md": {
    required: ["VS-51", "VS-39"],
    forbidden: ["[VS-43]"],
    name: "Aviation (JAEA [VS-51] not [VS-43], add [VS-39])"
  },
  "SSW-09-CONSTRUCTION-INDUSTRY-SYLLABUS.md": {
    required: ["VS-41"],
    forbidden: ["[VS-44]"],
    name: "Construction (JAC [VS-41] not [VS-44])"
  },
  "SSW-10-AGRICULTURE-CROP-FARMING-SYLLABUS.md": {
    required: ["VS-47"],
    name: "Crop Farming (NCA [VS-47])"
  },
  "SSW-11-AGRICULTURE-LIVESTOCK-SYLLABUS.md": {
    required: ["VS-47"],
    name: "Livestock (NCA [VS-47])"
  },
  "SSW-12-FISHERIES-AQUACULTURE-SYLLABUS.md": {
    required: ["VS-48"],
    name: "Fisheries (JFA [VS-48])"
  },
  "SSW-13-FORESTRY-INDUSTRY-SYLLABUS.md": {
    required: ["VS-52"],
    name: "Forestry (Forestry Agency [VS-52])"
  },
  "SSW-14-TIMBER-PROCESSING-SYLLABUS.md": {
    required: ["VS-49"],
    name: "Timber Processing (JAWIC [VS-49])"
  },
  "SSW-15-FOOD-MANUFACTURING-SYLLABUS.md": {
    required: ["VS-43", "VS-44"],
    name: "Food Manufacturing (OTAFF [VS-43], HACCP [VS-44])"
  },
  "SSW-16-FOOD-SERVICE-RESTAURANT-SYLLABUS.md": {
    required: ["VS-42", "VS-43", "VS-44"],
    name: "Food Service (Wijayanti [VS-42], OTAFF [VS-43], HACCP [VS-44])"
  },
  "SSW-17-HOSPITALITY-ACCOMMODATION-SYLLABUS.md": {
    required: ["VS-30", "VS-34"],
    forbidden: ["[VS-29]"],
    name: "Hospitality (Pratama [VS-30], Sari [VS-34], replace [VS-29])"
  },
  "SSW-18-AUTOMOBILE-TRANSPORT-SYLLABUS.md": {
    required: ["VS-45", "VS-46"],
    name: "Automobile Transport (MLIT [VS-45], NASVA [VS-46])"
  },
  "SSW-19-RAILWAY-OPERATIONS-SYLLABUS.md": {
    required: ["VS-53"],
    name: "Railway (MLIT [VS-53])"
  }
};

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
    else if (inS4 && /^\|\s*\d+\s*\|/.test(line.trim())) {
      s4Count++;
    }

    if (/^- \*\*Topik \d+\.\d+\.\d+:/.test(line.trim())) {
      s3SubSubCount++;
    } else if (/^- \*\*Topik \d+\.\d+:/.test(line.trim())) {
      s3TopicCount++;
    }
  }

  // Check path references
  const pathMatches = content.match(/reference-books\/ssw\/[^\s\)`"'>]+/g) || [];
  const missingPaths = [];
  [...new Set(pathMatches)].forEach(p => {
    const relToSsw = p.replace("reference-books/ssw/", "");
    const fullOnDisk = path.join(refDir, relToSsw);
    if (!fs.existsSync(fullOnDisk)) {
      missingPaths.push(p);
      totalErrors++;
    }
  });

  // Check citation keys validity against master bibliography
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
    totalErrors++;
  }
  if (s3SubSubCount === 0) {
    fileNotes.push(`S3 lacks sub-sub-topics X.Y.Z (has ${s3TopicCount} X.Y topics)`);
    totalErrors++;
  }

  const spec = specificRequirements[f];
  if (spec) {
    (spec.required || []).forEach(reqKey => {
      if (!content.includes(reqKey)) {
        fileNotes.push(`Missing required citation/text [${reqKey}] for ${spec.name}`);
        totalErrors++;
      }
    });
    (spec.forbidden || []).forEach(forbKey => {
      if (content.includes(forbKey)) {
        fileNotes.push(`Contains forbidden/misattributed citation/text [${forbKey}] for ${spec.name}`);
        totalErrors++;
      }
    });
  }

  if (f === "SSW-01-KAIGO-ELDERCARE-SYLLABUS.md") {
    const painCount = (content.match(/\d+\.\s+[^\n]+->/g) || []).length;
    if (painCount < 42) {
      fileNotes.push(`Pain onomatopoeia count is ${painCount} (Needs 42)`);
      totalErrors++;
    }
    const has7Clusters = [1,2,3,4,5,6,7].every(k => content.includes(`Klaster ${k}:`));
    if (!has7Clusters) {
      fileNotes.push("Missing one or more of the 7 physiological trauma clusters in Section 5!");
      totalErrors++;
    }
  }

  if (f === "SSW-18-AUTOMOBILE-TRANSPORT-SYLLABUS.md") {
    if (!content.includes("Dai-ni-shu") && !content.includes("第二種")) {
      fileNotes.push("Missing Class 2 Commercial Driver's License (Dai-ni-shu Menkyo) note!");
      totalErrors++;
    }
  }

  if (f === "SSW-19-RAILWAY-OPERATIONS-SYLLABUS.md") {
    if (!content.includes("JTOA") || !content.includes("Transport_Taxi_Driver_Sample_Exam_JA.pdf")) {
      fileNotes.push("Missing JTOA provenance note for Transport_Taxi_Driver_Sample_Exam_JA.pdf!");
      totalErrors++;
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
    console.log(`  NOTES/FAILURES: ${fileNotes.join(" | ")}`);
  }
});

// Master Syllabus Audit
console.log("\n[NUGGET-CURRICULUM-SSW-MASTER-SYLLABUS-v1.md]");
const masterContent = fs.readFileSync(masterFile, "utf8");
const masterLines = masterContent.split("\n");

// Check decoupling: exactly 19 subsections from 3.1 to 3.19
const s3Headings = masterLines.filter(l => /^#### 3\.\d+/.test(l));
console.log(`  Section 3 subsections count: ${s3Headings.length} (Target: 19, from 3.1 to 3.19)`);
if (s3Headings.length !== 19) {
  console.log(`  ERROR: Expected exactly 19 subsections in Section 3, found ${s3Headings.length}`);
  totalErrors++;
}

for (let i = 1; i <= 19; i++) {
  const expectedSub = `#### 3.${i} Sektor ${i < 10 ? '0' + i : i}:`;
  const found = s3Headings.some(h => h.startsWith(expectedSub));
  if (!found) {
    console.log(`  ERROR: Missing expected subsection: ${expectedSub}`);
    totalErrors++;
  }
}

// Check path references in Master Syllabus
const masterPathMatches = masterContent.match(/reference-books\/ssw\/[^\s\)`"'>]+/g) || [];
const masterMissingPaths = [];
[...new Set(masterPathMatches)].forEach(p => {
  const rel = p.replace("reference-books/ssw/", "");
  const full = path.join(refDir, rel);
  if (!fs.existsSync(full)) {
    masterMissingPaths.push(p);
    totalErrors++;
  }
});
if (masterMissingPaths.length > 0) {
  console.log(`  MISSING PATHS IN MASTER (${masterMissingPaths.length}):`);
  masterMissingPaths.forEach(mp => console.log(`    - ${mp}`));
}

// Check citations validity in Master
const masterCitMatches = masterContent.match(/\[(VS|EA|CA|SR|TE|BC|PR|CM|ER|OD|KS|MV|SC)-[0-9]+\]/g) || [];
const masterInvalidCits = [];
masterCitMatches.forEach(c => {
  const key = c.replace(/[\[\]]/g, "");
  if (!validCitations.has(key)) {
    masterInvalidCits.push(key);
    totalErrors++;
  }
});
if (masterInvalidCits.length > 0) {
  console.log(`  Invalid citations in Master: ${[...new Set(masterInvalidCits)].join(", ")}`);
}

// Check required statutory citations [VS-41] through [VS-54] in Master
for (let v = 41; v <= 54; v++) {
  const vKey = `[VS-${v}]`;
  if (!masterContent.includes(vKey)) {
    console.log(`  ERROR: Master Syllabus missing statutory citation ${vKey}`);
    totalErrors++;
  }
}

// Check Pronovost & MHLW [VS-40]
if (masterContent.includes("Pronovost")) {
  console.log("  ERROR: Master still contains misattributed Pronovost!");
  totalErrors++;
}
if (masterContent.includes("Rousai (MHLW 2023 [VS-40])") || masterContent.includes("ROUSAI 4-TIER (MHLW 2023 [VS-40])")) {
  console.log("  ERROR: Master still misattributes MHLW Rousai to [VS-40] (should be [VS-28])!");
  totalErrors++;
}
if (!masterContent.includes("Nurjaleka 2022 [VS-35]")) {
  console.log("  ERROR: Master missing Nurjaleka 2022 [VS-35] in Section 1!");
  totalErrors++;
}
if (!masterContent.includes("MHLW 2019 [VS-28]")) {
  console.log("  ERROR: Master missing MHLW 2019 [VS-28] in Section 1 or Section 5!");
  totalErrors++;
}

// Check 42 onomatopoeia in Master 3.1
const master31PainMatches = (masterContent.match(/\d+\.\s+[^\n]+->/g) || []).length;
console.log(`  Master 3.1 contains 42 Onomatopoeia Matrix items: ${master31PainMatches}`);
if (master31PainMatches < 42) {
  console.log(`  ERROR: Master 3.1 has ${master31PainMatches} onomatopoeia items (Needs 42)`);
  totalErrors++;
}
const masterHas7Clusters = [1,2,3,4,5,6,7].every(k => masterContent.includes(`Klaster ${k}:`));
if (!masterHas7Clusters) {
  console.log("  ERROR: Master 3.1 missing one or more of the 7 physiological trauma clusters!");
  totalErrors++;
}

console.log(`\n========================================`);
console.log(`Audit completed. Total errors detected: ${totalErrors}`);
console.log(`========================================`);

process.exit(totalErrors > 0 ? 1 : 0);
