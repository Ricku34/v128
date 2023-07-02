exports.matrix = function (v128Instance, v128) {
	return {
		/**
		 * fast create new matrix from initial values 
		 * @method v128.matrix#new
		 * @param  {...Numbers} vals number values to fill into matrix
		 * @returns {UInt32} the pointor to new matrix
		 */
		new : function(...vals) { 
			var p = v128.memory.alloc(16);
			if(p!==null && vals.length) {
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
		 * set or create matrix identity
		 * @method v128.matrix#identity
		 * @param {UInt32} [pMatDest] the pointor of matrix to set
		 * @returns the pointor of matrix identity
		 */
		identity : function(pMatDest) {
			if(pMatDest===undefined) {
				pMatDest = v128.matrix.new()
			}
			v128.memory.fill(pMatDest, 1, 0, 0, 0,  0, 1, 0, 0,  0, 0, 1, 0,  0, 0, 0, 1);
			return pMatDest;
		},
		/**
		 * fast multiply 2 matrix (WebAssembly method)
		 * @method v128.matrix#multiply
		 * @param {UInt32} pMatA pointer of matrix A
		 * @param {UInt32} pMatB pointer of matrix B
		 * @param {UInt32} pMatDest pointer of result matrix A*B
		 * @returns {UInt32} the pointor to result matrix A*B
		 */
		multiply : v128Instance.exports.mulM4M4,
		mul : v128Instance.exports.mulM4M4,	
		/**
		 * fast multiply matrix * vector (WebAssembly method)
		 * @method v128.matrix#transform
		 * @param {UInt32} pMat pointer of matrix 
		 * @param {UInt32} pVec pointer of vector
		 * @param {UInt32} pVecDest pointer of result transformed vector (matrix * vector)
		 * @returns {UInt32} the pointor to result transformed vector
		 */
		transform : v128Instance.exports.mulM4V4,
		/**
		 * fast create view matrix from camera position & target position (WebAssembly method)
		 * @method v128.matrix#lookAt
		 * @param {UInt32} pCamPos pointer of camera position 
		 * @param {UInt32} pTargetPos pointer of target position
		 * @param {UInt32} pMatDest pointer of result view matrix
		 * @returns {UInt32} the pointor to result view matrix
		 */
		lookAt : v128Instance.exports.lookAt,
		/**
		 * fast invert matrix (WebAssembly method)
		 * @method v128.matrix#invert
		 * @param {UInt32} pMat pointer of th matrix 
		  * @param {UInt32} pMatDest pointer of inversed matrix
		 * @returns {UInt32} the pointor to inversed matrix
		 */
		invert : v128Instance.exports.invert,
		/**
		 * create projection matrix from perspective data
		 * @method v128.matrix#perspective
		 * @param {number} fovy Vertical field of view in radians
		 * @param {number} aspect Aspect ratio. typically viewport width/height
		 * @param {number} near Near clipping bound of the frustum
		 * @param {number} far Far clipping bound of the frustum
		 * @param {UInt32} pMatDest pointer of result projection matrix
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
		},
		/**
		 * Creates a matrix from a vector translation
		 * @method v128.matrix#fromTranslation
		 * @param {UInt32} pVec pointer of Translation vector
		 * @param {UInt32} pMatDest pointer of result translated matrix
		 * @returns {UInt32} the pointor to result translated matrix
		 */
		fromTranslation : function(pVec, pMatDest) {
			var v = v128.memory.toArray(pVec,3);
			v128.memory.fill(pMatDest,
				 1,
				 0,
				 0,
				 0,
				 0,
				 1,
				 0,
				 0,
				 0,
				 0,
				 1,
				 0,
				 v[0],
				 v[1],
				 v[2],
				 1);
			return pMatDest;
		},

		/**
		 * Creates a matrix from a vector scaling
		 * @method v128.matrix#fromScaling
		 * @param {UInt32} pVec pointer of scaling vector
		 * @param {UInt32} pMatDest pointer of result scaled matrix
		 * @returns {UInt32} the pointor to result scaled matrix
		 */
		fromScaling : function(pVec, pMatDest) {
			var v = v128.memory.toArray(pVec,3);
			v128.memory.fill(pMatDest,
				 v[0],
				 0,
				 0,
				 0,
				 0,
				 v[1],
				 0,
				 0,
				 0,
				 0,
				 v[2],
				 0,
				 0,
				 0,
				 0,
				 1);
			return pMatDest;
		},
		/**
		 * Creates a matrix from the given angle around the X axis
		 * @method v128.matrix#fromXRotation
		 * @param {Number} rad the angle to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of result rotated matrix
		 * @returns {UInt32} the pointor to result rotated matrix
		 */
		fromXRotation : function(rad, pMatDest) {
			var s = Math.sin(rad),
				c = Math.cos(rad);

			v128.memory.fill(pMatDest,
				 1,
				 0,
				 0,
				 0,
				 0,
				 c,
				 s,
				 0,
				 0,
				 -s,
				 c,
				 0,
				 0,
				 0,
				 0,
				 1);
			return pMatDest;
		},

		/**
		 * Creates a matrix from the given angle around the Y axis
		 * @method v128.matrix#fromYRotation
		 * @param {Number} rad the angle to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of result rotated matrix
		 * @returns {UInt32} the pointor to result rotated matrix
		 */
		fromYRotation : function(rad, pMatDest) {
			var s = Math.sin(rad),
				c = Math.cos(rad);

			v128.memory.fill(pMatDest,
				 c,
				 0,
				 -s,
				 0,
				 0,
				 1,
				 0,
				 0,
				 s,
				 0,
				 c,
				 0,
				 0,
				 0,
				 0,
				 1);
			return pMatDest;
		},

		/**
		 * Creates a matrix from the given angle around the Z axis
		 * @method v128.matrix#fromZRotation
		 * @param {Number} rad the angle to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of result rotated matrix
		 * @returns {UInt32} the pointor to result rotated matrix
		 */
		fromZRotation : function(rad, pMatDest) {
			var s = Math.sin(rad),
				c = Math.cos(rad);

			v128.memory.fill(pMatDest,
				 c,
				 s,
				 0,
				 0,
				 -s,
				 c,
				 0,
				 0,
				 0,
				 0,
				 1,
				 0,
				 0,
				 0,
				 0,
				 1);
			return pMatDest;
		},

		/**
		 * Rotates a matrix by the given angle around the X axis
		 * @method v128.matrix#rotateX
		 * @param {UInt32} pMat pointer of matrix to rotate
		 * @param {Number} angle the angle in radian to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of the receiving matrix
		 * @returns {UInt32} the pointor of the receiving matrix
		 */
		rotateX : v128Instance.exports.rotateX,
		/**
		 * Rotates a matrix by the given angle around the Y axis
		 * @method v128.matrix#rotateY
		 * @param {UInt32} pMat pointer of matrix to rotate
		 * @param {Number} angle the angle in radian to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of the receiving matrix
		 * @returns {UInt32} the pointor of the receiving matrix
		 */
		rotateY : v128Instance.exports.rotateY,
		/**
		 * Rotates a matrix by the given angle around the Z axis
		 * @method v128.matrix#rotateZ
		 * @param {UInt32} pMat pointer of matrix to rotate
		 * @param {Number} angle the angle in radian to rotate the matrix by
		 * @param {UInt32} pMatDest pointer of the receiving matrix
		 * @returns {UInt32} the pointor of the receiving matrix
		 */
		rotateZ : v128Instance.exports.rotateZ,
		/**
		 * Translates a matrix by the given vector
		 * @method v128.matrix#rotateX
		 * @param {UInt32} pMat pointer of matrix to translate
		 * @param {Number} pVec pointer of vector to translate by
		 * @param {UInt32} pMatDest pointer of the receiving matrix
		 * @returns {UInt32} the pointor of the receiving matrix
		 */
		translate : v128Instance.exports.translate

	};
};