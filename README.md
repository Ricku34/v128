# v128

**v128** is an high performance javascript library for 3D matrix vector calculations using 128 bits vector type from [WebAssembly](https://webassembly.org/)

## Getting started
Web browser :
```HTML
	<script src="node_module/v128/dist/v128-min.js"></script>
```
Node.js :
```JavaScript
const v128 = require("v128");
```

```JavaScript
await v128.init(4);
let cameraPos = v128.vector.new(0,2.5,-4);
let center = v128.vector.new(0,0,0);
let viewMatrix = v128.matrix.lookAt(cameraPos,center,v128.matrix.new());
let projectionMatrix = v128.matrix.perspective(Math.PI/2,4/3,0.1,1000,v128.matrix.new());
let viewProjection = v128.matrix.multiply(viewMatrix, projectionMatrix,v128.matrix.new());
```
WebGL compatibility :
```JavaScript
gl.uniformMatrix4fv(projectionLocation, false, v128.memory.toArray(projectionMatrix));
```
## API Reference

<a name="v128"></a>

## v128 : <code>object</code>
WebAssembly & Javascript module fast matrix vector calculations using SIMD vector 128 bits.

**Kind**: global namespace  

* [v128](#v128) : <code>object</code>
    * [.ready](#v128.ready) : <code>Promise</code>
    * [.memory](#v128.memory) : <code>object</code>
        * [.randomize()](#v128.memory+randomize)
        * [.alloc(size)](#v128.memory+alloc) ⇒ <code>UInt32</code>
        * [.free(pointer)](#v128.memory+free)
        * [.fill(pointer, ...vals)](#v128.memory+fill)
        * [.slice(pointer)](#v128.memory+slice) ⇒ <code>Float32Array</code>
        * [.toArray(pointer)](#v128.memory+toArray) ⇒ <code>Float32Array</code>
    * [.matrix](#v128.matrix) : <code>object</code>
        * [.new(...vals)](#v128.matrix+new) ⇒ <code>UInt32</code>
        * [.free(pointer)](#v128.matrix+free)
        * [.identity([pMatDest])](#v128.matrix+identity) ⇒
        * [.multiply(pMatA, pMatB, pMatDest)](#v128.matrix+multiply) ⇒ <code>UInt32</code>
        * [.transform(pMat, pVec, pVecDest)](#v128.matrix+transform) ⇒ <code>UInt32</code>
        * [.lookAt(pCamPos, pTargetPos, pMatDest)](#v128.matrix+lookAt) ⇒ <code>UInt32</code>
        * [.invert(pMat, pMatDest)](#v128.matrix+invert) ⇒ <code>UInt32</code>
        * [.perspective(fovy, aspect, near, far, pMatDest)](#v128.matrix+perspective) ⇒ <code>UInt32</code>
        * [.fromTranslation(pVec, pMatDest)](#v128.matrix+fromTranslation) ⇒ <code>UInt32</code>
        * [.fromScaling(pVec, pMatDest)](#v128.matrix+fromScaling) ⇒ <code>UInt32</code>
        * [.fromXRotation(rad, pMatDest)](#v128.matrix+fromXRotation) ⇒ <code>UInt32</code>
        * [.fromYRotation(rad, pMatDest)](#v128.matrix+fromYRotation) ⇒ <code>UInt32</code>
        * [.fromZRotation(rad, pMatDest)](#v128.matrix+fromZRotation) ⇒ <code>UInt32</code>
        * [.rotateX(pMat, angle, pMatDest)](#v128.matrix+rotateX) ⇒ <code>UInt32</code>
        * [.rotateY(pMat, angle, pMatDest)](#v128.matrix+rotateY) ⇒ <code>UInt32</code>
        * [.rotateZ(pMat, angle, pMatDest)](#v128.matrix+rotateZ) ⇒ <code>UInt32</code>
        * [.rotateX(pMat, pVec, pMatDest)](#v128.matrix+rotateX) ⇒ <code>UInt32</code>
    * [.vector](#v128.vector) : <code>object</code>
        * [.new(...vals)](#v128.vector+new) ⇒ <code>UInt32</code>
        * [.free(pointer)](#v128.vector+free)
        * [.length(pVec)](#v128.vector+length) ⇒ <code>Number</code>
        * [.normalize(pVec, pVecDest)](#v128.vector+normalize) ⇒ <code>UInt32</code>
        * [.add(pVecA, pVecB, pVecDest)](#v128.vector+add) ⇒ <code>UInt32</code>
        * [.sub(pVecA, pVecB, pVecDest)](#v128.vector+sub) ⇒ <code>UInt32</code>
        * [.mul(pVecA, pVecB, pVecDest)](#v128.vector+mul) ⇒ <code>UInt32</code>
        * [.div(pVecA, pVecB, pVecDest)](#v128.vector+div) ⇒ <code>UInt32</code>
        * [.cross(pVecA, pVecB, pVecDest)](#v128.vector+cross) ⇒ <code>UInt32</code>
        * [.dot(pVecA, pVecB)](#v128.vector+dot) ⇒ <code>Number</code>
        * [.scale(pVec, scale, pVecDest)](#v128.vector+scale) ⇒ <code>UInt32</code>
    * [.uniformBlock](#v128.uniformBlock) : <code>object</code>
    * [.vertexBuffer](#v128.vertexBuffer) : <code>object</code>
    * [.init(size)](#v128.init) ⇒ <code>Promise</code>

<a name="v128.ready"></a>

### v128.ready : <code>Promise</code>
Promise resolve when API is ready

**Kind**: static property of [<code>v128</code>](#v128)  
<a name="v128.memory"></a>

### v128.memory : <code>object</code>
memory API

**Kind**: static namespace of [<code>v128</code>](#v128)  

* [.memory](#v128.memory) : <code>object</code>
    * [.randomize()](#v128.memory+randomize)
    * [.alloc(size)](#v128.memory+alloc) ⇒ <code>UInt32</code>
    * [.free(pointer)](#v128.memory+free)
    * [.fill(pointer, ...vals)](#v128.memory+fill)
    * [.slice(pointer)](#v128.memory+slice) ⇒ <code>Float32Array</code>
    * [.toArray(pointer)](#v128.memory+toArray) ⇒ <code>Float32Array</code>

<a name="v128.memory+randomize"></a>

#### memory.randomize()
Randomize all the memory

**Kind**: instance method of [<code>memory</code>](#v128.memory)  
<a name="v128.memory+alloc"></a>

#### memory.alloc(size) ⇒ <code>UInt32</code>
allocate float memory array

**Kind**: instance method of [<code>memory</code>](#v128.memory)  
**Returns**: <code>UInt32</code> - the pointor from v128 memory  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the number of float to allocate |

<a name="v128.memory+free"></a>

#### memory.free(pointer)
free float memory

**Kind**: instance method of [<code>memory</code>](#v128.memory)  

| Param | Type | Description |
| --- | --- | --- |
| pointer | <code>UInt32</code> | the pointor to free |

<a name="v128.memory+fill"></a>

#### memory.fill(pointer, ...vals)
fill float memory with given values

**Kind**: instance method of [<code>memory</code>](#v128.memory)  

| Param | Type | Description |
| --- | --- | --- |
| pointer | <code>UInt32</code> |  |
| ...vals | <code>Numbers</code> | number values to fill |

<a name="v128.memory+slice"></a>

#### memory.slice(pointer) ⇒ <code>Float32Array</code>
get copy of portion float memory

**Kind**: instance method of [<code>memory</code>](#v128.memory)  

| Param | Type |
| --- | --- |
| pointer | <code>UInt32</code> | 

<a name="v128.memory+toArray"></a>

#### memory.toArray(pointer) ⇒ <code>Float32Array</code>
get read/write access of portion float memory

**Kind**: instance method of [<code>memory</code>](#v128.memory)  

| Param | Type |
| --- | --- |
| pointer | <code>UInt32</code> | 

<a name="v128.matrix"></a>

### v128.matrix : <code>object</code>
matrix API

**Kind**: static namespace of [<code>v128</code>](#v128)  

* [.matrix](#v128.matrix) : <code>object</code>
    * [.new(...vals)](#v128.matrix+new) ⇒ <code>UInt32</code>
    * [.free(pointer)](#v128.matrix+free)
    * [.identity([pMatDest])](#v128.matrix+identity) ⇒
    * [.multiply(pMatA, pMatB, pMatDest)](#v128.matrix+multiply) ⇒ <code>UInt32</code>
    * [.transform(pMat, pVec, pVecDest)](#v128.matrix+transform) ⇒ <code>UInt32</code>
    * [.lookAt(pCamPos, pTargetPos, pMatDest)](#v128.matrix+lookAt) ⇒ <code>UInt32</code>
    * [.invert(pMat, pMatDest)](#v128.matrix+invert) ⇒ <code>UInt32</code>
    * [.perspective(fovy, aspect, near, far, pMatDest)](#v128.matrix+perspective) ⇒ <code>UInt32</code>
    * [.fromTranslation(pVec, pMatDest)](#v128.matrix+fromTranslation) ⇒ <code>UInt32</code>
    * [.fromScaling(pVec, pMatDest)](#v128.matrix+fromScaling) ⇒ <code>UInt32</code>
    * [.fromXRotation(rad, pMatDest)](#v128.matrix+fromXRotation) ⇒ <code>UInt32</code>
    * [.fromYRotation(rad, pMatDest)](#v128.matrix+fromYRotation) ⇒ <code>UInt32</code>
    * [.fromZRotation(rad, pMatDest)](#v128.matrix+fromZRotation) ⇒ <code>UInt32</code>
    * [.rotateX(pMat, angle, pMatDest)](#v128.matrix+rotateX) ⇒ <code>UInt32</code>
    * [.rotateY(pMat, angle, pMatDest)](#v128.matrix+rotateY) ⇒ <code>UInt32</code>
    * [.rotateZ(pMat, angle, pMatDest)](#v128.matrix+rotateZ) ⇒ <code>UInt32</code>
    * [.rotateX(pMat, pVec, pMatDest)](#v128.matrix+rotateX) ⇒ <code>UInt32</code>

<a name="v128.matrix+new"></a>

#### matrix.new(...vals) ⇒ <code>UInt32</code>
fast create new matrix from initial values

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to new matrix  

| Param | Type | Description |
| --- | --- | --- |
| ...vals | <code>Numbers</code> | number values to fill into matrix |

<a name="v128.matrix+free"></a>

#### matrix.free(pointer)
free the matrix

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  

| Param | Type | Description |
| --- | --- | --- |
| pointer | <code>UInt32</code> | the pointor of matrix to free |

<a name="v128.matrix+identity"></a>

#### matrix.identity([pMatDest]) ⇒
set or create matrix identity

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: the pointor of matrix identity  

| Param | Type | Description |
| --- | --- | --- |
| [pMatDest] | <code>UInt32</code> | the pointor of matrix to set |

<a name="v128.matrix+multiply"></a>

#### matrix.multiply(pMatA, pMatB, pMatDest) ⇒ <code>UInt32</code>
fast multiply 2 matrix (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result matrix A*B  

| Param | Type | Description |
| --- | --- | --- |
| pMatA | <code>UInt32</code> | pointer of matrix A |
| pMatB | <code>UInt32</code> | pointer of matrix B |
| pMatDest | <code>UInt32</code> | pointer of result matrix A*B |

<a name="v128.matrix+transform"></a>

#### matrix.transform(pMat, pVec, pVecDest) ⇒ <code>UInt32</code>
fast multiply matrix * vector (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result transformed vector  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of matrix |
| pVec | <code>UInt32</code> | pointer of vector |
| pVecDest | <code>UInt32</code> | pointer of result transformed vector (matrix * vector) |

<a name="v128.matrix+lookAt"></a>

#### matrix.lookAt(pCamPos, pTargetPos, pMatDest) ⇒ <code>UInt32</code>
fast create view matrix from camera position & target position (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result view matrix  

| Param | Type | Description |
| --- | --- | --- |
| pCamPos | <code>UInt32</code> | pointer of camera position |
| pTargetPos | <code>UInt32</code> | pointer of target position |
| pMatDest | <code>UInt32</code> | pointer of result view matrix |

<a name="v128.matrix+invert"></a>

#### matrix.invert(pMat, pMatDest) ⇒ <code>UInt32</code>
fast invert matrix (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to inversed matrix  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of th matrix |
| pMatDest | <code>UInt32</code> | pointer of inversed matrix |

<a name="v128.matrix+perspective"></a>

#### matrix.perspective(fovy, aspect, near, far, pMatDest) ⇒ <code>UInt32</code>
create projection matrix from perspective data

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result projection matrix  

| Param | Type | Description |
| --- | --- | --- |
| fovy | <code>number</code> | Vertical field of view in radians |
| aspect | <code>number</code> | Aspect ratio. typically viewport width/height |
| near | <code>number</code> | Near clipping bound of the frustum |
| far | <code>number</code> | Far clipping bound of the frustum |
| pMatDest | <code>UInt32</code> | pointer of result projection matrix |

<a name="v128.matrix+fromTranslation"></a>

#### matrix.fromTranslation(pVec, pMatDest) ⇒ <code>UInt32</code>
Creates a matrix from a vector translation

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result translated matrix  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer of Translation vector |
| pMatDest | <code>UInt32</code> | pointer of result translated matrix |

<a name="v128.matrix+fromScaling"></a>

#### matrix.fromScaling(pVec, pMatDest) ⇒ <code>UInt32</code>
Creates a matrix from a vector scaling

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result scaled matrix  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer of scaling vector |
| pMatDest | <code>UInt32</code> | pointer of result scaled matrix |

<a name="v128.matrix+fromXRotation"></a>

#### matrix.fromXRotation(rad, pMatDest) ⇒ <code>UInt32</code>
Creates a matrix from the given angle around the X axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result rotated matrix  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | the angle to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of result rotated matrix |

<a name="v128.matrix+fromYRotation"></a>

#### matrix.fromYRotation(rad, pMatDest) ⇒ <code>UInt32</code>
Creates a matrix from the given angle around the Y axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result rotated matrix  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | the angle to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of result rotated matrix |

<a name="v128.matrix+fromZRotation"></a>

#### matrix.fromZRotation(rad, pMatDest) ⇒ <code>UInt32</code>
Creates a matrix from the given angle around the Z axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result rotated matrix  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>Number</code> | the angle to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of result rotated matrix |

<a name="v128.matrix+rotateX"></a>

#### matrix.rotateX(pMat, angle, pMatDest) ⇒ <code>UInt32</code>
Rotates a matrix by the given angle around the X axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor of the receiving matrix  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of matrix to rotate |
| angle | <code>Number</code> | the angle in radian to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of the receiving matrix |

<a name="v128.matrix+rotateY"></a>

#### matrix.rotateY(pMat, angle, pMatDest) ⇒ <code>UInt32</code>
Rotates a matrix by the given angle around the Y axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor of the receiving matrix  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of matrix to rotate |
| angle | <code>Number</code> | the angle in radian to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of the receiving matrix |

<a name="v128.matrix+rotateZ"></a>

#### matrix.rotateZ(pMat, angle, pMatDest) ⇒ <code>UInt32</code>
Rotates a matrix by the given angle around the Z axis

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor of the receiving matrix  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of matrix to rotate |
| angle | <code>Number</code> | the angle in radian to rotate the matrix by |
| pMatDest | <code>UInt32</code> | pointer of the receiving matrix |

<a name="v128.matrix+rotateX"></a>

#### matrix.rotateX(pMat, pVec, pMatDest) ⇒ <code>UInt32</code>
Translates a matrix by the given vector

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor of the receiving matrix  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer of matrix to translate |
| pVec | <code>Number</code> | pointer of vector to translate by |
| pMatDest | <code>UInt32</code> | pointer of the receiving matrix |

<a name="v128.vector"></a>

### v128.vector : <code>object</code>
vector API

**Kind**: static namespace of [<code>v128</code>](#v128)  

* [.vector](#v128.vector) : <code>object</code>
    * [.new(...vals)](#v128.vector+new) ⇒ <code>UInt32</code>
    * [.free(pointer)](#v128.vector+free)
    * [.length(pVec)](#v128.vector+length) ⇒ <code>Number</code>
    * [.normalize(pVec, pVecDest)](#v128.vector+normalize) ⇒ <code>UInt32</code>
    * [.add(pVecA, pVecB, pVecDest)](#v128.vector+add) ⇒ <code>UInt32</code>
    * [.sub(pVecA, pVecB, pVecDest)](#v128.vector+sub) ⇒ <code>UInt32</code>
    * [.mul(pVecA, pVecB, pVecDest)](#v128.vector+mul) ⇒ <code>UInt32</code>
    * [.div(pVecA, pVecB, pVecDest)](#v128.vector+div) ⇒ <code>UInt32</code>
    * [.cross(pVecA, pVecB, pVecDest)](#v128.vector+cross) ⇒ <code>UInt32</code>
    * [.dot(pVecA, pVecB)](#v128.vector+dot) ⇒ <code>Number</code>
    * [.scale(pVec, scale, pVecDest)](#v128.vector+scale) ⇒ <code>UInt32</code>

<a name="v128.vector+new"></a>

#### vector.new(...vals) ⇒ <code>UInt32</code>
fast create new vector from initial values

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointor to new vector  

| Param | Type | Description |
| --- | --- | --- |
| ...vals | <code>Numbers</code> | number values to fill into vector |

<a name="v128.vector+free"></a>

#### vector.free(pointer)
free the vector

**Kind**: instance method of [<code>vector</code>](#v128.vector)  

| Param | Type | Description |
| --- | --- | --- |
| pointer | <code>UInt32</code> | the pointor of vector to free |

<a name="v128.vector+length"></a>

#### vector.length(pVec) ⇒ <code>Number</code>
get fast length of 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>Number</code> - the length of vector  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer of vector |

<a name="v128.vector+normalize"></a>

#### vector.normalize(pVec, pVecDest) ⇒ <code>UInt32</code>
fast normalize 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of normalized vector  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer of vector |
| pVecDest | <code>UInt32</code> | pointer of receive normalized vector |

<a name="v128.vector+add"></a>

#### vector.add(pVecA, pVecB, pVecDest) ⇒ <code>UInt32</code>
fast add two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |
| pVecDest | <code>UInt32</code> | pointer of receive sum result vector ( A + B ) |

<a name="v128.vector+sub"></a>

#### vector.sub(pVecA, pVecB, pVecDest) ⇒ <code>UInt32</code>
fast sub two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |
| pVecDest | <code>UInt32</code> | pointer of receive sum result vector ( A - B ) |

<a name="v128.vector+mul"></a>

#### vector.mul(pVecA, pVecB, pVecDest) ⇒ <code>UInt32</code>
fast multiply two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |
| pVecDest | <code>UInt32</code> | pointer of receive multiply result vector ( A * B ) |

<a name="v128.vector+div"></a>

#### vector.div(pVecA, pVecB, pVecDest) ⇒ <code>UInt32</code>
fast divide two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |
| pVecDest | <code>UInt32</code> | pointer of receive divide result vector ( A / B ) |

<a name="v128.vector+cross"></a>

#### vector.cross(pVecA, pVecB, pVecDest) ⇒ <code>UInt32</code>
fast cross product of two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |
| pVecDest | <code>UInt32</code> | pointer of receive cross product result vector ( A.B ) |

<a name="v128.vector+dot"></a>

#### vector.dot(pVecA, pVecB) ⇒ <code>Number</code>
fast dot product of two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>Number</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer of vector A |
| pVecB | <code>UInt32</code> | pointer of vector B |

<a name="v128.vector+scale"></a>

#### vector.scale(pVec, scale, pVecDest) ⇒ <code>UInt32</code>
fast scale vector by a scalar number

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer of result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer of vector to scale |
| scale | <code>Number</code> | amount to scale the vector by |
| pVecDest | <code>UInt32</code> | pointer of receive result vector |

<a name="v128.uniformBlock"></a>

### v128.uniformBlock : <code>object</code>
WebGL2 Uniform Buffer Objects API (UBOs) using std140 layout.

**Kind**: static namespace of [<code>v128</code>](#v128)  
<a name="v128.vertexBuffer"></a>

### v128.vertexBuffer : <code>object</code>
WebGL Vertex Buffer Objects API (VBOs)

**Kind**: static namespace of [<code>v128</code>](#v128)  
<a name="v128.init"></a>

### v128.init(size) ⇒ <code>Promise</code>
Initialize the v128 API

**Kind**: static method of [<code>v128</code>](#v128)  
**Returns**: <code>Promise</code> - resolve when API is ready  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the number of page for v128 Memory (page = 64Kb) |


