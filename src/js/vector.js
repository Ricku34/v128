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
		 * @param {UInt32} pVec pointer of vector
		 * @returns {Number} the length of vector 
		 */
		length : v128Instance.exports.length,

		/**
		 * fast normalize 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#normalize
		 * @param {UInt32} pVec pointer of vector
		 * @param {UInt32} pVecDest pointer of receive normalized vector
		 * @returns {UInt32} the pointer of normalized vector
		 */
		normalize : v128Instance.exports.normalize, 

		/**
		 * fast add two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#add
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @param {UInt32} pVecDest pointer of receive sum result vector ( A + B )
		 * @returns {UInt32} the pointer of result vector
		 */
		add : v128Instance.exports.addV4V4,

		/**
		 * fast sub two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#sub
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @param {UInt32} pVecDest pointer of receive sum result vector ( A - B )
		 * @returns {UInt32} the pointer of result vector
		 */
		sub : v128Instance.exports.subV4V4,

		/**
		 * fast multiply two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#mul
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @param {UInt32} pVecDest pointer of receive multiply result vector ( A * B )
		 * @returns {UInt32} the pointer of result vector
		 */
		mul : v128Instance.exports.mulV4V4,

		/**
		 * fast divide two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#div
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @param {UInt32} pVecDest pointer of receive divide result vector ( A / B )
		 * @returns {UInt32} the pointer of result vector
		 */
		div : v128Instance.exports.divV4V4,

		/**
		 * fast cross product of two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#cross
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @param {UInt32} pVecDest pointer of receive cross product result vector ( A.B )
		 * @returns {UInt32} the pointer of result vector
		 */
		cross:  v128Instance.exports.crossV3V3,

		/**
		 * fast dot product of two 3D Homogeneous coordinates vector (WebAssembly method)
		 * @method v128.vector#dot
		 * @param {UInt32} pVecA pointer of vector A
		 * @param {UInt32} pVecB pointer of vector B
		 * @returns {Number} the pointer of result vector
		 */
		dot:  v128Instance.exports.dotV3V3,
		/**
		 * fast scale vector by a scalar number 
		 * @method v128.vector#scale
		 * @param {UInt32} pVec pointer of vector to scale
		 * @param {Number} scale amount to scale the vector by
		 * @param {UInt32} pVecDest pointer of receive result vector
		 * @returns {UInt32} the pointer of result vector
		 */
		scale : v128Instance.exports.scaleV3
	};
};