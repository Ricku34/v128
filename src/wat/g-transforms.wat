	(func (export "transformV3") (param $attribPointer i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $matrixPointer i32)
		(local $col1 v128)
		(local $col2 v128)
		(local $col3 v128)
		(local $col4 v128)
		(local $pt i32)
		local.get $matrixPointer
		(local.set $col1 (v128.load))

		local.get $matrixPointer
		i32.const 16
		i32.add
		(local.set $col2 (v128.load))
		
		local.get $matrixPointer
		i32.const 32
		i32.add
		(local.set $col3 (v128.load))

		local.get $matrixPointer
		i32.const 48
		i32.add
		(local.set $col4 (v128.load))
		
		(loop $vertex_loop

			local.get $vertexCount
			i32.const 1
			i32.sub
			local.set $vertexCount

			local.get $col1
			local.get $col2
			local.get $col3
			local.get $col4

			local.get $attribPointer
			local.get $vertexCount
			local.get $vertexSize
			i32.const 4
			i32.mul
			i32.mul
			(local.tee $pt (i32.add))
			call $loadV3
			call $mulM4V4
			local.get $pt
			call $storeV3

			local.get $vertexCount
			br_if $vertex_loop
		)
	)
	(func (export "transformV4") (param $attribPointer i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $matrixPointer i32)
		(local $col1 v128)
		(local $col2 v128)
		(local $col3 v128)
		(local $col4 v128)
		(local $pt i32)
		local.get $matrixPointer
		(local.set $col1 (v128.load))

		local.get $matrixPointer
		i32.const 16
		i32.add
		(local.set $col2 (v128.load))
		
		local.get $matrixPointer
		i32.const 32
		i32.add
		(local.set $col3 (v128.load))

		local.get $matrixPointer
		i32.const 48
		i32.add
		(local.set $col4 (v128.load))
		(loop $vertex_loop

			local.get $vertexCount
			i32.const 1
			i32.sub
			local.set $vertexCount

			local.get $attribPointer
			local.get $vertexCount
			local.get $vertexSize
			i32.const 4
			i32.mul
			i32.mul
			(local.tee $pt (i32.add))
			local.get $col1
			local.get $col2
			local.get $col3
			local.get $col4
			local.get $pt
			v128.load
			call $mulM4V4
			v128.store

			local.get $vertexCount
			br_if $vertex_loop
		)
	)
	