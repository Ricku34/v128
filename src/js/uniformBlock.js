exports.uniformBlock = function (v128Instance, v128) {
	var uniformBlock = {};
	const sizeByType = {};
	sizeByType[v128.TYPES.FLOAT]      =  1;
	sizeByType[v128.TYPES.FLOAT_VEC2] =  2;
	sizeByType[v128.TYPES.FLOAT_VEC3] =  3;
	sizeByType[v128.TYPES.FLOAT_VEC4] =  4;
	sizeByType[v128.TYPES.FLOAT_MAT2] =  4;
	sizeByType[v128.TYPES.FLOAT_MAT3] =  9;
	sizeByType[v128.TYPES.FLOAT_MAT4] = 16;
	const std140AlignByType = {};
	std140AlignByType[v128.TYPES.FLOAT]      =  1;
	std140AlignByType[v128.TYPES.FLOAT_VEC2] =  2;
	std140AlignByType[v128.TYPES.FLOAT_VEC3] =  4;
	std140AlignByType[v128.TYPES.FLOAT_VEC4] =  4;
	std140AlignByType[v128.TYPES.FLOAT_MAT2] = 16;
	std140AlignByType[v128.TYPES.FLOAT_MAT3] = 16;
	std140AlignByType[v128.TYPES.FLOAT_MAT4] = 16;

	Object.defineProperties(uniformBlock,{

		getInfo : {
			enumerable : true,
			writable : false,
			value : function (gl,program, uniformBlockName) {
				let blockInfo = {};
				let indices = gl.getActiveUniformBlockParameter(program,uniformBlockName,gl.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
				if(indices) {
					for(let i=0;i<indices.length;i++) {
						let info = gl.getActiveUniform(program,indices[i]);
						if(info) {
							var name = info.name.replace(uniformBlockName+".","");
							blockInfo[name] = { type : info.type, size : info.size }
						}
					}
				}
				return blockInfo;
			}
		},

		create : {
			enumerable : true,
			writable : false,
			value : function (blockInfo, values) {
				let size = 0;
				for (var prop in blockInfo) {
					if(std140AlignByType[blockInfo[prop].type]===undefined) {
						throw new Error("[v128.uniformBlock.create] : unsuported type of uniform property '"+prop+"'.");
					} else {
						size += size % std140AlignByType[blockInfo[prop].type];
						size += std140AlignByType[blockInfo[prop].type] * blockInfo[prop].size;
					}
				}
				let pointer = v128.memory.alloc(size);
				let pointers = new Object();
				let ubo = new Object();
				let offset = 0;
				for (var prop in blockInfo) {
					offset +=  offset % std140AlignByType[blockInfo[prop].type];
					Object.defineProperty(pointers,prop,{
						enumerable : true,
						writable : false,
						value: pointer + (offset * 4)
					});
					Object.defineProperty(ubo,prop,{
						enumerable : true,
						get : (function(property, p) { 
							return function () { 
								var size = sizeByType[blockInfo[property].type];
								if(size==1) 
									return v128.memory.toArray(p,size)[0];
								else
									return v128.memory.toArray(p,size);
							}
						})(prop, pointer + (offset * 4)),
						set : (function(property, p) { 
							return function (values) { 
								var size = sizeByType[blockInfo[property].type];
								dest = v128.memory.toArray(p,size);
								if(size==1) {
									dest[0] = values;
								} else if(values.length <= dest.length) {
									for(let i = 0; i< values.length; i++) {
										dest[i] = values[i];
									}
								} 
							}
						})(prop, pointer + (offset * 4))
					});
					offset += std140AlignByType[blockInfo[prop].type] * blockInfo[prop].size;
				}
				for (var p in values) {
					if(ubo[p]!==undefined) {
						ubo[p] = values[p];
					}
				}
				return Object.defineProperties(ubo,{
					buffer : {
						enumerable : true,
						writable : false,
						value : v128.memory.toArray(pointer)
					},
					pointers : {
						enumerable : true,
						writable : false,
						value : pointers
					},
					info : {
						enumerable : true,
						writable : false,
						value : blockInfo
					}
				});

			}
		}

	})
	return uniformBlock;
};