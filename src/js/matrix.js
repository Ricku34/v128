exports.matrix = function (v128Instance, v128) {
	return {
		mul : v128Instance.exports.mulM4M4,
		multiply : v128Instance.exports.mulM4M4,
		tranform : v128Instance.exports.mulM4V4,
		new : function(...vals) { 
			var p = v128.memory.alloc(16);
			if(p && vals.length) {
				v128.memory.fill(p, ...vals);
			}
			return p;
		},
		free : v128.memory.free,
		perspective : function (fovy, aspect, near, far, pMat) {
			var f = 1.0 / Math.tan(fovy / 2),
				nf = 1 / (near - far);
			v128.memory.fill(pMat,
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
			return pMat;
		}
	};
};