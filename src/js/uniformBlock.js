exports.uniformBlock = function (v128Instance, v128) {
	var uniformBlock = {};
	const TYPES = Object.defineProperties({},{
		FLOAT : {
			enumerable : true,
			writable : false,
			value : 0x1406
		},
		FLOAT_VEC2 : {
			enumerable : true,
			writable : false,
			value : 0x8B50
		},
		FLOAT_VEC3: {
			enumerable : true,
			writable : false,
			value : 0x8B51
		},
		FLOAT_VEC4 : {
			enumerable: true,
			writable : false,
			value: 0x8B52
		},
		FLOAT_MAT2 : {
			enumerable: true,
			writable : false,
			value: 0x8B5A
		},
		FLOAT_MAT3 : {
			enumerable: true,
			writable : false,
			value: 0x8B5B
		},
		FLOAT_MAT4 : {
			enumerable: true,
			writable : false,
			value: 0x8B5C
		}
	});
	const sizeByType = {};
	sizeByType[TYPES.FLOAT]      =  1;
	sizeByType[TYPES.FLOAT_VEC2] =  2;
	sizeByType[TYPES.FLOAT_VEC3] =  3;
	sizeByType[TYPES.FLOAT_VEC4] =  4;
	sizeByType[TYPES.FLOAT_MAT2] =  4;
	sizeByType[TYPES.FLOAT_MAT3] =  9;
	sizeByType[TYPES.FLOAT_MAT4] = 16;
	const alignByType = {};
	alignByType[TYPES.FLOAT]      =  1;
	alignByType[TYPES.FLOAT_VEC2] =  2;
	alignByType[TYPES.FLOAT_VEC3] =  4;
	alignByType[TYPES.FLOAT_VEC4] =  4;
	alignByType[TYPES.FLOAT_MAT2] = 16;
	alignByType[TYPES.FLOAT_MAT3] = 16;
	alignByType[TYPES.FLOAT_MAT4] = 16;

	Object.defineProperties(uniformBlock,{
		types : {
			enumerable : true,
			writable : false,
			value : TYPES
		},

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
					if(alignByType[blockInfo[prop].type]===undefined) {
						throw new Error("[v128.uniformBlock.create] : unsuported type of uniform property '"+prop+"'.");
					} else {
						size += size % alignByType[blockInfo[prop].type];
						size += alignByType[blockInfo[prop].type] * blockInfo[prop].size;
					}
				}
				let pointor = v128.memory.alloc(size);
				let pointors = new Object();
				let ubo = new Object();
				let offset = 0;
				for (var prop in blockInfo) {
					offset +=  offset % alignByType[blockInfo[prop].type];
					Object.defineProperty(pointors,prop,{
						enumerable : true,
						writable : false,
						value: pointor + (offset * 4)
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
						})(prop, pointor + (offset * 4)),
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
						})(prop, pointor + (offset * 4))
					});
					offset += alignByType[blockInfo[prop].type] * blockInfo[prop].size;
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
						value : v128.memory.toArray(pointor)
					},
					pointors : {
						enumerable : true,
						writable : false,
						value : pointors
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