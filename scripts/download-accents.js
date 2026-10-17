const https = require('https');
const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const dest = path.join(cacheDir, 'accents.txt');
if (fs.existsSync(dest) && fs.statSync(dest).size > 1000000) {
  console.log('accents.txt already exists:', dest, fs.statSync(dest).size, 'bytes');
  process.exit(0);
}

console.log('Downloading accents.txt from kanjium...');
const file = fs.createWriteStream(dest);
https.get('https://raw.githubusercontent.com/mifunetoshiro/kanjium/master/data/source_files/raw/accents.txt', (res) => {
  if (res.statusCode !== 200) {
    console.error('Download failed with status:', res.statusCode);
    process.exit(1);
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Successfully downloaded accents.txt:', fs.statSync(dest).size, 'bytes');
    });
  });
}).on('error', (err) => {
  fs.unlinkSync(dest);
  console.error('Error downloading:', err.message);
  process.exit(1);
});
