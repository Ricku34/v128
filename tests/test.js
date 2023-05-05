const {v128} = require('..');
const {vec3} = require('gl-matrix');
const EPSILON = 0.000001;
console.assert(v128);
console.assert(v128.init);
(async function() {
	await v128.init(2);
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


	console.log("SUCCESS");

})();