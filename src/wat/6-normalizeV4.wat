	(func $lenV3 (param v128) (result f32)
		(local $square v128)
		local.get 0
		local.get 0
		(local.set $square (f32x4.mul))

		local.get $square
		f32x4.extract_lane 0

		local.get $square
		f32x4.extract_lane 1

		f32.add

		local.get $square
		f32x4.extract_lane 2

		f32.add
		f32.sqrt

	)
	(func $normalizeV3 (param v128) (result v128)
		
		(local $len f32)
		f32.const 0.000001
		local.get 0
		(local.tee $len (call $lenV3))
		f32.ge
		(if (result v128) 
			(then 
				v128.const f32x4 0.0 0.0 0.0 0.0
			)
			(else
				f32.const 1.0
				local.get $len
				f32.div
				f32x4.splat
				local.get 0
				f32x4.mul
			)
		)
	)
