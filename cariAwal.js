const fs = require("fs");
const readline = require("readline");

const INPUT_PATH = "entri.txt";
const OUTPUT_DIR = "awal/";

const isTunggal = ['--tunggal', '-t'].some((flag) => process.argv.includes(flag));
const isMajemuk = ['--majemuk', '-m'].some((flag) => process.argv.includes(flag));
const needle = process.argv[2] ? process.argv[2].toLocaleLowerCase() : "";
const outputPath = OUTPUT_DIR + `${needle}-.txt`;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const outputStream = fs.createWriteStream(outputPath);

const inputStream = fs.createReadStream(INPUT_PATH);

const rl = readline.createInterface({
  input: inputStream,
  crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break
});

const result = [];

rl.on("line", (line) => {
  const index = line.indexOf(needle);

  if (index === 0) {
    if (isTunggal && line.includes(" ")) return
    if (isMajemuk && !line.includes(" ")) return
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
