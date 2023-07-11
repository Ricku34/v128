	(func (export "boundsV3") (param $attribPointer i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $minPointer i32) (param $maxPointer i32)
		(local $min v128)
		(local $max v128)
		(local $vec v128)
		local.get $minPointer
		(local.set $min (call $loadV3))
		local.get $maxPointer
		(local.set $max (call $loadV3))
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
			i32.add
			(local.tee $vec (call $loadV3))
			local.get $min
			(local.set $min (f32x4.min))
			local.get $vec
			local.get $max
			(local.set $max (f32x4.max))

			local.get $vertexCount
			br_if $vertex_loop
		)
		local.get $min
		local.get $minPointer
		call $storeV3
		local.get $max
		local.get $maxPointer
		call $storeV3
	)
	(func (export "boundsV4") (param $attribPointer i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $minPointer i32) (param $maxPointer i32)
		(local $min v128)
		(local $max v128)
		(local $vec v128)
		local.get $minPointer
		(local.set $min (v128.load))
		local.get $maxPointer
		(local.set $max (v128.load))
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
			i32.add
			(local.tee $vec (v128.load))
			local.get $min
			(local.set $min (f32x4.min))
			local.get $vec
			local.get $max
			(local.set $max (f32x4.max))

			local.get $vertexCount
			br_if $vertex_loop
		)
		local.get $minPointer
		local.get $min
		v128.store
		local.get $maxPointer
		local.get $max
		v128.store
	)
	(func (export "boundsV2") (param $attribPointer i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $minPointer i32) (param $maxPointer i32)
		(local $min v128)
		(local $max v128)
		(local $vec v128)
		local.get $minPointer
		(local.set $min (call $loadV2))
		local.get $maxPointer
		(local.set $max (call $loadV2))
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
			i32.add
			(local.tee $vec (call $loadV2))
			local.get $min
			(local.set $min (f32x4.min))
			local.get $vec
			local.get $max
			(local.set $max (f32x4.max))

			local.get $vertexCount
			br_if $vertex_loop
		)
		local.get $min
		local.get $minPointer
		call $storeV2
		local.get $max
		local.get $maxPointer
		call $storeV2
	)