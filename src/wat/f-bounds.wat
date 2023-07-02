	(func (export "boundsV3") (param $attribPointor i32)  (param $vertexCount i32) (param $vertexSize i32)  (param $minPointer i32) (param $maxPointer i32)
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

			local.get $attribPointor
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