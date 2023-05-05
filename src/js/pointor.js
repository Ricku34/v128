
// function readFloat(bufferView,adress) {
	// return bufferView.getFloat32(adress*4,true);
// }
// function writeFloat(bufferView,adress,value) {
	// bufferView.setFloat32(adress*4,value, true);
// }
function Pointer(adress,size,memory) {
	Object.defineProperties(this, {
		memory : {
			value : memory
		},
		adress : {
			value : adress
		},
		size : {
			value : size,
			enumerable : true
		}
	});
	for(let i=0;i<size;i++) {
		(function(i) {
			Object.defineProperty(this,i,{
				enumerable : true,
				get : function() {
					return this.memory.view.getFloat32((this.adress+i)*4,true);
				},
				set : function(value) {
					this.memory.view.setFloat32((this.adress+i)*4,value, true);	
				} 
			});
		}).call(this,i);
	}
	
}

Pointer.prototype.valueOf = function() {
	return this.adress*4;
}

Pointer.prototype.toString = function() {
	return "[ " +this.memory.floatBuffer.slice(this.adress,this.adress+this.size).join(", ") +"]";
}


function Memory(wasmMem) {
	Object.defineProperties(this, {
		heap : {
			value: 0,
			writable : true
		},
		view : {
			value : new DataView(wasmMem.buffer) 
		},
		floatBuffer : {
			value : new Float32Array(wasmMem.buffer)
		}
	});
} 

Memory.prototype.randomize = function () {
	for(var i=0;i<this.floatBuffer.length;i++) {
		this.view.setFloat32(i*4 , Math.random()*2.0-1.0, true);
	}
}

Memory.prototype.allocV4 = function () {
	if(this.heap+4>=this.floatBuffer.length)
		return null;

	var p = new Pointer(this.heap,4,this);
	this.heap += 4;
	return p;
}
Memory.prototype.allocM4 = function () {
	if(this.heap+16>=this.floatBuffer.length)
		return null;

	var p = new Pointer(this.heap,16,this);
	this.heap += 16;
	return p;
}
exports.Memory = Memory;