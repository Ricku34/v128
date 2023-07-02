exports.vertexBuffer = function (v128Instance, v128) {
	var vertexBuffer = {};
	const sizeByType = {};
	sizeByType[v128.TYPES.FLOAT]      =  1;
	sizeByType[v128.TYPES.FLOAT_VEC2] =  2;
	sizeByType[v128.TYPES.FLOAT_VEC3] =  3;
	sizeByType[v128.TYPES.FLOAT_VEC4] =  4;
	sizeByType[v128.TYPES.FLOAT_MAT2] =  4;
	sizeByType[v128.TYPES.FLOAT_MAT3] =  9;
	sizeByType[v128.TYPES.FLOAT_MAT4] = 16;

	Object.defineProperties(vertexBuffer,{

		create : {
			enumerable : true,
			writable : false,
			value : function (vertexCount,vertexAttribInfo) {
				let vertexSize = 0;
				for (var prop in vertexAttribInfo) {
					if(sizeByType[vertexAttribInfo[prop]]===undefined) {
						throw new Error("[v128.vertexBuffer.create] : unsuported type of vertex attribut '"+prop+"'.");
					} else {
						vertexSize += sizeByType[vertexAttribInfo[prop]];
					}
				}
				let pointor = v128.memory.alloc(vertexCount*vertexSize);
				function Vertex(index) {
					let pointors = new Object();
					Object.defineProperties(this, {
						buffer : {
							enumerable : true,
							writable : false,
							value : v128.memory.toArray(pointor + (index * vertexSize * 4), vertexSize )
						},
						pointors : {
							enumerable : true,
							writable : false,
							value : pointors
						}
					});
					let offset = 0;
					for (var prop in vertexAttribInfo) {
						var p = pointor + ((index * vertexSize) + offset) * 4;
						var size = sizeByType[vertexAttribInfo[prop]];
						Object.defineProperty(pointors, prop, {
							enumerable : true,
							writable : false,
							value : p
						});
						Object.defineProperty(this, prop, {
							enumerable : true,
							get : (function(pt, s) { 
								return function () { 
									if(s==1) 
										return v128.memory.toArray(pt,s)[0];
									else
										return v128.memory.toArray(pt,s);
								}
							})(p, size),
							set : (function(pt, s) { 
								return function (values) { 
									dest = v128.memory.toArray(pt,s);
									if(s==1) {
										dest[0] = values;
									} else if(values.length <= dest.length) {
										for(let i = 0; i< values.length; i++) {
											dest[i] = values[i];
										}
									} 
								}
							})(p, size)
						});
						offset += size;
					}
				};

				return Object.defineProperties({},{
					buffer : {
						enumerable : true,
						writable : false,
						value : v128.memory.toArray(pointor)
					},
					count : {
						enumerable : true,
						writable : false,
						value : vertexCount
					},
					info : {
						enumerable : true,
						writable : false,
						value : vertexAttribInfo
					},
					getVertex : {
						enumerable : true,
						writable : false,
						value : function (index) {
							return new Vertex(index);
						}
					},
					computeBounds : {
						enumerable : true,
						writable : false,
						value : function (attribute) {
							var attribPt = this.getVertex(0).pointors[attribute];
							var minPt = v128.vector.new(); //v128.memory.alloc(sizeByType[vertexAttribInfo[attribute]]);
							var minBuf = v128.memory.toArray(minPt);
							for(var i=0;i<minBuf.length;i++) 
								minBuf[i] = Number.POSITIVE_INFINITY;
							var maxPt = v128.vector.new(); //v128.memory.alloc(sizeByType[vertexAttribInfo[attribute]]);
							var maxBuf = v128.memory.toArray(maxPt); 
							for(var i=0;i<maxBuf.length;i++) 
								maxBuf[i] = Number.NEGATIVE_INFINITY; 
							v128Instance.exports.boundsV3(attribPt, vertexCount, vertexSize, minPt, maxPt)
							return {
								min : minPt,
								max : maxPt
							};
						}
					} 
				});

			}
		}

	})
	return vertexBuffer;
};