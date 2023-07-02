const { values } = require("../../webpack.config");

exports.patchPageSize = function (byteCode, size) {
	let p=0,found=false;
	while(p<byteCode.length-5) {
		if(byteCode[p]==0x6D && byteCode[p+1]==0x65 && byteCode[p+2]==0x6D && byteCode[p+3]==0x6F  && byteCode[p+4]==0x72 && byteCode[p+5]==0x79) {
			found = true;
			break;
		}
		p+=1;
	}
	if(found && p-6>0) {
		byteCode[p-6]=size;
	}
}

exports.memoryManager = function (v128Instance) {

	const manager = {};
	const floatBuffer = new Float32Array(v128Instance.exports.memory.buffer);
	let heap = 0;
	const allocated = {}; // new Uint8Array(floatBuffer.length);
	const released = {};

	/**
	 * Randomize all the memory
	 * @method v128.memory#randomize
	 */
	manager.randomize = function () {
		for(var i=0;i<floatBuffer.length;i++) {
			floatBuffer[i]= Math.random()*2.0-1.0;
		}
	}

	/**
	 * allocate float memory array
	 * @method v128.memory#alloc
	 * @param {Number} size the number of float to allocate
	 * @returns {UInt32} the pointor from v128 memory
	 */
	manager.alloc = function(size) {
		if(released[size] && released[size].length) {
			var idx = released[size].pop();
			allocated[idx]=size;
			return idx * 4;
		}
		if(heap+size>=floatBuffer.length)
			return null;
		allocated[heap]=size;
		var p = heap*4;
		heap+=size;
		return p;
	}

	/**
	 * free float memory
	 * @method v128.memory#free
	 * @param {UInt32} pointer  the pointor to free
	 */
	manager.free = function(pointer) {
		var idx = pointer/4;
		var size = allocated[idx];
		allocated[idx] = 0;
		if(!released[size]) {
			released[size] = []; 
		}
		released[size].push(idx);
	}

	/**
	 * fill float memory with given values
	 * @method v128.memory#fill
	 * @param {UInt32} pointer 
	 * @param  {...Numbers} vals number values to fill
	 */
	manager.fill = function(pointer, ...vals) {
		var idx = pointer/4;
		var size = allocated[idx];
		for(let i=0;i<size && i<vals.length; i++) {
			floatBuffer[idx+i] = vals[i];
		}
	}

	/**
	 * get copy of portion float memory
	 * @method v128.memory#slice
	 * @param {UInt32} pointer 
	 * @returns {Float32Array} 
	 * 
	 */
	manager.slice = function(pointer) {
		var idx = pointer/4;
		var size = allocated[idx];
		return floatBuffer.slice(idx,idx+size);
	}

	/**
	 * get read/write access of portion float memory
	 * @method v128.memory#toArray
	 * @param {UInt32} pointer 
	 * @returns {Float32Array} 
	 * 
	 */
	manager.toArray = function(pointer,size) {
		var idx = pointer/4;
		size = size || allocated[idx];
		return floatBuffer.subarray(idx,idx+size);
	}

	return manager;

};