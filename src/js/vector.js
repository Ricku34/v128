exports.vector = function (v128Instance, v128) {
	return {
		new : function(...vals) { 
			var p = v128.memory.alloc(4);
			if(p!==null && vals.length) {
				v128.memory.fill(p, ...vals);
			}
			return p;
		},
		free : v128.memory.free,
		length : v128Instance.exports.length,
		normalize : v128Instance.exports.normalize, 
		
		add : v128Instance.exports.addV4V4,
		sub : v128Instance.exports.subV4V4,
		mul : v128Instance.exports.mulV4V4,
		div : v128Instance.exports.divV4V4,
		cross:  v128Instance.exports.crossV3V3
	};
};