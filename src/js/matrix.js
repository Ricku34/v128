exports.matrix = function (v128Instance, v128) {
	return {
		/**
		 * fast multiply 2 matrix (WebAssembly method)
		 * @method v128.matrix#multiply
		 * @param {UInt32} pMatA pointer to matrix A
		 * @param {UInt32} pMatB pointer to matrix B
		 * @param {UInt32} pMatDest pointer to result matrix A*B
		 * @returns {UInt32} the pointor to result matrix A*B
		 */
		multiply : v128Instance.exports.mulM4M4,
		mul : v128Instance.exports.mulM4M4,	
		/**
		 * fast multiply matrix * vector (WebAssembly method)
		 * @method v128.matrix#tranform
		 * @param {UInt32} pMat pointer to matrix 
		 * @param {UInt32} pVec pointer to vector
		 * @param {UInt32} pVecDest pointer to result transformed vector (matrix * vector)
		 * @returns {UInt32} the pointor to result transformed vector
		 */
		tranform : v128Instance.exports.mulM4V4,
		/**
		 * fast create view matrix from camera position & target position (WebAssembly method)
		 * @method v128.matrix#lookAt
		 * @param {UInt32} pCamPos pointer to camera position 
		 * @param {UInt32} pTargetPos pointer to target position
		 * @param {UInt32} pMatDest pointer to result view matrix
		 * @returns {UInt32} the pointor to result view matrix
		 */
		lookAt : v128Instance.exports.lookAt,
		/**
		 * fast invert matrix (WebAssembly method)
		 * @method v128.matrix#invert
		 * @param {UInt32} pMat pointer to th matrix 
		  * @param {UInt32} pMatDest pointer to inversed matrix
		 * @returns {UInt32} the pointor to inversed matrix
		 */
		invert : v128Instance.exports.invert,
		/**
		 * fast create new matrix from initial values 
		 * @method v128.matrix#new
		 * @param  {...Numbers} vals number values to fill into matrix
		 * @returns {UInt32} the pointor to new matrix
		 */
		new : function(...vals) { 
			var p = v128.memory.alloc(16);
			if(p && vals.length) {
				v128.memory.fill(p, ...vals);
			}
			return p;
		},
		/**
		 * free the matrix
		 * @method v128.matrix#free
		 * @param {UInt32} pointer  the pointor of matrix to free
		 */
		free : v128.memory.free,
		/**
		 * create projection matrix from perspective data
		 * @method v128.matrix#perspective
		 * @param {number} fovy Vertical field of view in radians
		 * @param {number} aspect Aspect ratio. typically viewport width/height
		 * @param {number} near Near clipping bound of the frustum
		 * @param {number} far Far clipping bound of the frustum
		 * @param {UInt32} pMatDest pointer to result projection matrix
		 * @returns {UInt32} the pointor to result projection matrix
		 */
		perspective : function (fovy, aspect, near, far, pMatDest) {
			var f = 1.0 / Math.tan(fovy / 2),
				nf = 1 / (near - far);
			v128.memory.fill(pMatDest,
				f / aspect,
				0,
				0,
				0,
				0,
				f,
				0,
				0,
				0,
				0,
				(far + near) * nf,
				-1,
				0,
				0,
				(2 * far * near) * nf,
				0);
			return pMatDest;
		}
	};
};