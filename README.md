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
        * [.multiply(pMatA, pMatB, pMatDest)](#v128.matrix+multiply) ⇒ <code>UInt32</code>
        * [.tranform(pMat, pVec, pVecDest)](#v128.matrix+tranform) ⇒ <code>UInt32</code>
        * [.lookAt(pCamPos, pTargetPos, pMatDest)](#v128.matrix+lookAt) ⇒ <code>UInt32</code>
        * [.new(...vals)](#v128.matrix+new) ⇒ <code>UInt32</code>
        * [.free(pointer)](#v128.matrix+free)
        * [.perspective(fovy, aspect, near, far, pMatDest)](#v128.matrix+perspective) ⇒ <code>UInt32</code>
    * [.vector](#v128.vector) : <code>object</code>
        * [.new(...vals)](#v128.vector+new) ⇒ <code>UInt32</code>
        * [.free(pointer)](#v128.vector+free)
        * [.length(pVec)](#v128.vector+length) ⇒ <code>Number</code>
        * [.normalize(pVec, pVecDest)](#v128.vector+normalize) ⇒ <code>UInt32</code>
        * [.add(pVecA, pVecA, pVecDest)](#v128.vector+add) ⇒ <code>UInt32</code>
        * [.sub(pVecA, pVecA, pVecDest)](#v128.vector+sub) ⇒ <code>UInt32</code>
        * [.mul(pVecA, pVecA, pVecDest)](#v128.vector+mul) ⇒ <code>UInt32</code>
        * [.div(pVecA, pVecA, pVecDest)](#v128.vector+div) ⇒ <code>UInt32</code>
        * [.cross(pVecA, pVecA, pVecDest)](#v128.vector+cross) ⇒ <code>UInt32</code>
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
    * [.multiply(pMatA, pMatB, pMatDest)](#v128.matrix+multiply) ⇒ <code>UInt32</code>
    * [.tranform(pMat, pVec, pVecDest)](#v128.matrix+tranform) ⇒ <code>UInt32</code>
    * [.lookAt(pCamPos, pTargetPos, pMatDest)](#v128.matrix+lookAt) ⇒ <code>UInt32</code>
    * [.new(...vals)](#v128.matrix+new) ⇒ <code>UInt32</code>
    * [.free(pointer)](#v128.matrix+free)
    * [.perspective(fovy, aspect, near, far, pMatDest)](#v128.matrix+perspective) ⇒ <code>UInt32</code>

<a name="v128.matrix+multiply"></a>

#### matrix.multiply(pMatA, pMatB, pMatDest) ⇒ <code>UInt32</code>
fast multiply 2 matrix (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result matrix A*B  

| Param | Type | Description |
| --- | --- | --- |
| pMatA | <code>UInt32</code> | pointer to matrix A |
| pMatB | <code>UInt32</code> | pointer to matrix B |
| pMatDest | <code>UInt32</code> | pointer to result matrix A*B |

<a name="v128.matrix+tranform"></a>

#### matrix.tranform(pMat, pVec, pVecDest) ⇒ <code>UInt32</code>
fast multiply matrix * vector (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result transformed vector  

| Param | Type | Description |
| --- | --- | --- |
| pMat | <code>UInt32</code> | pointer to matrix |
| pVec | <code>UInt32</code> | pointer to vector |
| pVecDest | <code>UInt32</code> | pointer to result transformed vector (matrix * vector) |

<a name="v128.matrix+lookAt"></a>

#### matrix.lookAt(pCamPos, pTargetPos, pMatDest) ⇒ <code>UInt32</code>
fast create view matrix from camera position & target position (WebAssembly method)

**Kind**: instance method of [<code>matrix</code>](#v128.matrix)  
**Returns**: <code>UInt32</code> - the pointor to result view matrix  

| Param | Type | Description |
| --- | --- | --- |
| pCamPos | <code>UInt32</code> | pointer to camera position |
| pTargetPos | <code>UInt32</code> | pointer to target position |
| pMatDest | <code>UInt32</code> | pointer to result view matrix |

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
| pMatDest | <code>UInt32</code> | pointer to result projection matrix |

<a name="v128.vector"></a>

### v128.vector : <code>object</code>
vector API

**Kind**: static namespace of [<code>v128</code>](#v128)  

* [.vector](#v128.vector) : <code>object</code>
    * [.new(...vals)](#v128.vector+new) ⇒ <code>UInt32</code>
    * [.free(pointer)](#v128.vector+free)
    * [.length(pVec)](#v128.vector+length) ⇒ <code>Number</code>
    * [.normalize(pVec, pVecDest)](#v128.vector+normalize) ⇒ <code>UInt32</code>
    * [.add(pVecA, pVecA, pVecDest)](#v128.vector+add) ⇒ <code>UInt32</code>
    * [.sub(pVecA, pVecA, pVecDest)](#v128.vector+sub) ⇒ <code>UInt32</code>
    * [.mul(pVecA, pVecA, pVecDest)](#v128.vector+mul) ⇒ <code>UInt32</code>
    * [.div(pVecA, pVecA, pVecDest)](#v128.vector+div) ⇒ <code>UInt32</code>
    * [.cross(pVecA, pVecA, pVecDest)](#v128.vector+cross) ⇒ <code>UInt32</code>

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
| pVec | <code>UInt32</code> | pointer to vector |

<a name="v128.vector+normalize"></a>

#### vector.normalize(pVec, pVecDest) ⇒ <code>UInt32</code>
fast normalize 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to normalized vector  

| Param | Type | Description |
| --- | --- | --- |
| pVec | <code>UInt32</code> | pointer to vector |
| pVecDest | <code>UInt32</code> | pointer to receive normalized vector |

<a name="v128.vector+add"></a>

#### vector.add(pVecA, pVecA, pVecDest) ⇒ <code>UInt32</code>
fast add two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer to vector A |
| pVecA | <code>UInt32</code> | pointer to vector B |
| pVecDest | <code>UInt32</code> | pointer to receive sum result vector ( A + B ) |

<a name="v128.vector+sub"></a>

#### vector.sub(pVecA, pVecA, pVecDest) ⇒ <code>UInt32</code>
fast sub two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer to vector A |
| pVecA | <code>UInt32</code> | pointer to vector B |
| pVecDest | <code>UInt32</code> | pointer to receive sum result vector ( A - B ) |

<a name="v128.vector+mul"></a>

#### vector.mul(pVecA, pVecA, pVecDest) ⇒ <code>UInt32</code>
fast multiply two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer to vector A |
| pVecA | <code>UInt32</code> | pointer to vector B |
| pVecDest | <code>UInt32</code> | pointer to receive multiply result vector ( A * B ) |

<a name="v128.vector+div"></a>

#### vector.div(pVecA, pVecA, pVecDest) ⇒ <code>UInt32</code>
fast divide two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer to vector A |
| pVecA | <code>UInt32</code> | pointer to vector B |
| pVecDest | <code>UInt32</code> | pointer to receive divide result vector ( A / B ) |

<a name="v128.vector+cross"></a>

#### vector.cross(pVecA, pVecA, pVecDest) ⇒ <code>UInt32</code>
fast cross product of two 3D Homogeneous coordinates vector (WebAssembly method)

**Kind**: instance method of [<code>vector</code>](#v128.vector)  
**Returns**: <code>UInt32</code> - the pointer to result vector  

| Param | Type | Description |
| --- | --- | --- |
| pVecA | <code>UInt32</code> | pointer to vector A |
| pVecA | <code>UInt32</code> | pointer to vector B |
| pVecDest | <code>UInt32</code> | pointer to receive cross product result vector ( A.B ) |

<a name="v128.init"></a>

### v128.init(size) ⇒ <code>Promise</code>
Initialize the v128 API

**Kind**: static method of [<code>v128</code>](#v128)  
**Returns**: <code>Promise</code> - resolve when API is ready  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the number of page for v128 Memory (page = 64Kb) |


