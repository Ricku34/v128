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
				let pointer = v128.memory.alloc(vertexCount*vertexSize);
				function Vertex(index) {
					let pointers = new Object();
					Object.defineProperties(this, {
						buffer : {
							enumerable : true,
							writable : false,
							value : v128.memory.toArray(pointer + (index * vertexSize * 4), vertexSize )
						},
						pointers : {
							enumerable : true,
							writable : false,
							value : pointers
						}
					});
					let offset = 0;
					for (var prop in vertexAttribInfo) {
						var p = pointer + ((index * vertexSize) + offset) * 4;
						var size = sizeByType[vertexAttribInfo[prop]];
						Object.defineProperty(pointers, prop, {
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
						value : v128.memory.toArray(pointer)
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
							if(!this.info[attribute]) {
								throw new Error("attribute '"+attribute+"' not found in vertexBuffer.");
							}
							var bounds
							if(this.info[attribute]==v128.TYPES.FLOAT_VEC2){
								bounds = v128Instance.exports.boundsV2;
							} else if(this.info[attribute]==v128.TYPES.FLOAT_VEC3){
								bounds = v128Instance.exports.boundsV3;
							} else if(this.info[attribute]==v128.TYPES.FLOAT_VEC4){
								bounds = v128Instance.exports.boundsV4;
							} else {
								throw new Error("unsupported type for compute bounds on attribute '"+attribute+"' .");
							}

							var attribPt = this.getVertex(0).pointers[attribute];
							var minPt = v128.vector.new(); //v128.memory.alloc(sizeByType[vertexAttribInfo[attribute]]);
							var minBuf = v128.memory.toArray(minPt);
							for(var i=0;i<minBuf.length;i++) 
								minBuf[i] = Number.POSITIVE_INFINITY;
							var maxPt = v128.vector.new(); //v128.memory.alloc(sizeByType[vertexAttribInfo[attribute]]);
							var maxBuf = v128.memory.toArray(maxPt); 
							for(var i=0;i<maxBuf.length;i++) 
								maxBuf[i] = Number.NEGATIVE_INFINITY; 
							bounds(attribPt, vertexCount, vertexSize, minPt, maxPt)
							return {
								min : minPt,
								max : maxPt
							};
						}
					},
					transform : {
						enumerable : true,
						writable : false,
						value : function (attribute, matrix) {
							if(!this.info[attribute]) {
								throw new Error("attribute '"+attribute+"' not found in vertexBuffer.");
							}
							var transform
							if(this.info[attribute]==v128.TYPES.FLOAT_VEC3){
								transform = v128Instance.exports.transformV3;
							} else if(this.info[attribute]==v128.TYPES.FLOAT_VEC4){
								transform = v128Instance.exports.transformV4;
							} else {
								throw new Error("unsupported type for compute bounds on attribute '"+attribute+"' .");
							}
							var attribPt = this.getVertex(0).pointers[attribute];
							transform(attribPt, vertexCount, vertexSize, matrix);
							
						}
					} 
				});

			}
		}

	})
	return vertexBuffer;
};