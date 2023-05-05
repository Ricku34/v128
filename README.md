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

