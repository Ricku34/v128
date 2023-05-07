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

<a name="v128"></a>

## v128 : <code>object</code>
WebAssembly & Javascript module fast matrix vector calculations using SIMD vector 128 bits.

**Kind**: global namespace  

* [v128](#v128) : <code>object</code>
    * _instance_
        * [.ready](#v128+ready) : <code>Promise</code>
    * _static_
        * [.memory](#v128.memory) : <code>object</code>
        * [.matrix](#v128.matrix) : <code>object</code>
        * [.vector](#v128.vector) : <code>object</code>
        * [.init(size)](#v128.init) ⇒ <code>Promise</code>

<a name="v128+ready"></a>

### v128.ready : <code>Promise</code>
Promise resolve when API is ready

**Kind**: instance property of [<code>v128</code>](#v128)  
**Read only**: true  
<a name="v128.memory"></a>

### v128.memory : <code>object</code>
memory API

**Kind**: static namespace of [<code>v128</code>](#v128)  
<a name="v128.matrix"></a>

### v128.matrix : <code>object</code>
matrix API

**Kind**: static namespace of [<code>v128</code>](#v128)  
<a name="v128.vector"></a>

### v128.vector : <code>object</code>
vector API

**Kind**: static namespace of [<code>v128</code>](#v128)  
<a name="v128.init"></a>

### v128.init(size) ⇒ <code>Promise</code>
Initialize the v128 API

**Kind**: static method of [<code>v128</code>](#v128)  
**Returns**: <code>Promise</code> - resolve when API is ready  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the number of page for v128 Memory (page = 64Kb) |

