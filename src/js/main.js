
const wasmdata = require("../../build/wasm-data.js");
const {memoryManager , patchPageSize} = require("./memoryManager.js");
const {matrix} = require("./matrix.js");
const {vector} = require("./vector.js");
/**
 * WebAssembly & Javascript module fast matrix vector calculations using SIMD vector 128 bits.
 * @namespace v128
 */
const v128 = {};
let isReady = 0;
/**
 * Promise resolve when API is ready 
 * @type {Promise}
 * @memberof v128
 * @static
 */
v128.ready = new Promise((resolve) => {

	/**
	 * Initialize the v128 API
	 * @param {Number} size the number of page for v128 Memory (page = 64Kb) 
	 * @returns {Promise} resolve when API is ready 
	 */
	v128.init = async function(size) {
		if(isReady) {
			if(size!=isReady)
			console.warn("v128 ever initialize with memory size ", isReady);
			return v128.ready;
		}
		patchPageSize(wasmdata,size);
		var module = await WebAssembly.instantiate(wasmdata.buffer,{Math});
		/**
		 * memory API 
		 * @namespace v128.memory
		 */
		v128.memory = memoryManager(module.instance); 
		/**
		 * matrix API 
		 * @namespace v128.matrix
		 */
		v128.matrix = matrix(module.instance,v128);
		/**
		 * vector API 
		 * @namespace v128.vector
		 */
		v128.vector = vector(module.instance,v128);
		isReady=size;
		resolve();
		return v128.ready;
	}
});

exports.v128 = v128;