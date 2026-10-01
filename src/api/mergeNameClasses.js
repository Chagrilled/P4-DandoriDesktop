const { readFileSync, writeFileSync } = require('fs');
const nc1 = JSON.parse(readFileSync(process.argv[2], { encoding: 'utf-8' }));
const nc2 = JSON.parse(readFileSync(process.argv[3], { encoding: 'utf-8' }));
console.log(`Merging ${process.argv[2]} and ${process.argv[3]}`)
const deepmerge = require('deepmerge');
const newNc = deepmerge(nc1, nc2);

writeFileSync('name_classes_output.json', JSON.stringify(newNc, null, 4), { encoding: "utf-8" });
console.log("Written");