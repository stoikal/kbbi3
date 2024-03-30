const fs = require("fs");
const readline = require("readline");

const INPUT_PATH = "entri.txt";
const OUTPUT_DIR = "rima/";

const tunggalFlag = process.argv.find(arg => arg === '--tunggal');
const majemukFlag = process.argv.find(arg => arg === '--majemuk');
const needle = process.argv[2] || "";
const outputPath = OUTPUT_DIR + `-${needle}.txt`;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const inputStream = fs.createReadStream(INPUT_PATH);

const rl = readline.createInterface({
  input: inputStream,
  crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break
});


const outputStream = fs.createWriteStream(outputPath);
const result = []

rl.on("line", (line) => {
  const needleLength = needle.length;
  const lineLength = line.length;
  const lastIndex = line.lastIndexOf(needle);

  if (lastIndex > -1 && lastIndex === lineLength - needleLength) {
    if (tunggalFlag && line.includes(" ")) return
    if (majemukFlag && !line.includes(" ")) return
    result.push(line);
  }
});

rl.on('close', () => {
  result.forEach((line) => {
    outputStream.write(line + "\n");
  })

  console.log('File reading completed.');
  console.log('Found:', result.length)
  console.log('Output:', outputPath)

  outputStream.end(); // Close the output stream
});
