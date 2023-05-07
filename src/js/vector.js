exports.vector = function (v128Instance, v128) {
	return {
		/**
		 * fast create new vector from initial values 
		 * @method v128.vector#new
		 * @param  {...Numbers} vals number values to fill into vector
		 * @returns {UInt32} the pointor to new vector
		 */
		new : function(...vals) { 
			var p = v128.memory.alloc(4);
			if(p!==null && vals.length) {
				v128.memory.fill(p, ...vals);
			}
			return p;
		},
		/**
		 * free the vector
		 * @method v128.vector#free
		 * @param {UInt32} pointer  the pointor of vector to free
		 */
		free : v128.memory.free,
		/**
		 * get fast length of 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#length
		 * @param {UInt32} pVec pointer to vector
		 * @returns {Number} the length of vector 
		 */
		length : v128Instance.exports.length,

		/**
		 * fast normalize 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#normalize
		 * @param {UInt32} pVec pointer to vector
		 * @param {UInt32} pVecDest pointer to receive normalized vector
		 * @returns {UInt32} the pointer to normalized vector
		 */
		normalize : v128Instance.exports.normalize, 

		/**
		 * fast add two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#add
		 * @param {UInt32} pVecA pointer to vector A
		 * @param {UInt32} pVecA pointer to vector B
		 * @param {UInt32} pVecDest pointer to receive sum result vector ( A + B )
		 * @returns {UInt32} the pointer to result vector
		 */
		add : v128Instance.exports.addV4V4,

		/**
		 * fast sub two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#sub
		 * @param {UInt32} pVecA pointer to vector A
		 * @param {UInt32} pVecA pointer to vector B
		 * @param {UInt32} pVecDest pointer to receive sum result vector ( A - B )
		 * @returns {UInt32} the pointer to result vector
		 */
		sub : v128Instance.exports.subV4V4,

		/**
		 * fast multiply two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#mul
		 * @param {UInt32} pVecA pointer to vector A
		 * @param {UInt32} pVecA pointer to vector B
		 * @param {UInt32} pVecDest pointer to receive multiply result vector ( A * B )
		 * @returns {UInt32} the pointer to result vector
		 */
		mul : v128Instance.exports.mulV4V4,

		/**
		 * fast divide two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#div
		 * @param {UInt32} pVecA pointer to vector A
		 * @param {UInt32} pVecA pointer to vector B
		 * @param {UInt32} pVecDest pointer to receive divide result vector ( A / B )
		 * @returns {UInt32} the pointer to result vector
		 */
		div : v128Instance.exports.divV4V4,

		/**
		 * fast cross product of two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#cross
		 * @param {UInt32} pVecA pointer to vector A
		 * @param {UInt32} pVecA pointer to vector B
		 * @param {UInt32} pVecDest pointer to receive cross product result vector ( A.B )
		 * @returns {UInt32} the pointer to result vector
		 */
		cross:  v128Instance.exports.crossV3V3
	};
};