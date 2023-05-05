const { readFile } = require('node:fs/promises');
(async function(wasmFile) {
	var wasmData = await readFile(wasmFile)
	var d = [];
	for(const value of wasmData) {
		d.push(value);
	}
	console.log('module.exports = new Uint8Array(['+d.join(',')+']);');
})(process.argv[2])