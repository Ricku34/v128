const {v128} = require('..');
const {vec3, mat4} = require('gl-matrix');
const { vector } = require('../src/js/vector');
const EPSILON = 0.000001;
console.assert(v128);
console.assert(v128.init);
(async function() {
	await v128.init(4);
	console.assert(v128.memory && v128.vector && v128.matrix);
	var camPos = v128.vector.new(2,4.5,-10);
	console.assert(camPos==0);
	var camPosArray = v128.memory.toArray(camPos);
	console.assert(camPosArray[0]===2 && camPosArray[1]===4.5 && camPosArray[2]===-10);
	camPosArray[0]=0;
	camPosArray = v128.memory.slice(camPos);
	console.assert(camPosArray[0]===0 && camPosArray[1]===4.5 && camPosArray[2]===-10);
	camPosArray[0]=-5;
	camPosArray = v128.memory.toArray(camPos);
	console.assert(camPosArray[0]===0 && camPosArray[1]===4.5 && camPosArray[2]===-10);
	
	var RIGHT = v128.vector.new(1,0,0);
	console.assert(RIGHT==16);
	var UP = v128.vector.new(0,1,0);
	console.assert(UP==32);

	var AT = v128.vector.cross(RIGHT,UP,v128.vector.new())
	console.assert(AT==48);
	console.assert(vec3.equals(v128.memory.slice(AT),vec3.cross(vec3.create(),v128.memory.slice(RIGHT),v128.memory.slice(UP))))

	var tmp = v128.vector.new()
	console.assert(tmp==64);
	tmp = v128.vector.add(RIGHT,UP,tmp);
	console.assert(vec3.equals(v128.memory.slice(tmp),vec3.add(vec3.create(),v128.memory.slice(RIGHT),v128.memory.slice(UP))))
	console.assert( Math.abs(v128.vector.length(tmp)-vec3.length(v128.memory.slice(tmp))) < EPSILON);
	tmp = v128.vector.normalize(tmp,tmp);
	console.assert( Math.abs(v128.vector.length(tmp)-1.0) < EPSILON);

	console.assert( v128.vector.dot(UP,RIGHT) - vec3.dot(v128.memory.slice(UP), v128.memory.slice(RIGHT)) < EPSILON);

	v128.memory.free(tmp);

	var lookAtMat =  v128.matrix.lookAt(camPos,AT,UP,v128.matrix.new());
	var glLookAt = mat4.lookAt(mat4.create(),v128.memory.slice(camPos),v128.memory.slice(AT),v128.memory.slice(UP));
	console.assert(mat4.equals(glLookAt, v128.memory.slice(lookAtMat)))
	

	var invView = v128.matrix.invert(lookAtMat, v128.matrix.new());
	var glInvView = mat4.invert(mat4.create(),glLookAt);
	console.assert(mat4.equals(glInvView, v128.memory.slice(invView)))

	var IDENTITY = v128.matrix.identity();
	var rotX = v128.matrix.rotateX(IDENTITY,Math.PI/2,v128.matrix.new());
	glRotX = mat4.rotateX(mat4.create(),v128.memory.slice(IDENTITY),Math.PI/2);
	console.assert(mat4.equals(glRotX, v128.memory.slice(rotX)));

	lookAtMat = v128.matrix.translate(lookAtMat, v128.vector.scale(UP,2.5,v128.vector.new()), lookAtMat)
	glLookAt = mat4.translate(glLookAt, glLookAt, vec3.scale(vec3.create(),v128.memory.slice(UP),2.5));
	console.assert(mat4.equals(glLookAt, v128.memory.slice(lookAtMat)))

	

	console.log("SUCCESS");

})();