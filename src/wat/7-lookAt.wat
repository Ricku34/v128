	(func $lookAt (param $pos v128) (param $target v128) (param $up v128) (result v128 v128 v128 v128)
		(local $at v128)
		(local $right v128)
		(local $Yaxis v128)
		(local $Waxis v128)
		local.get $target
		local.get $pos
		(local.tee $at (f32x4.sub))
		f32x4.abs
		v128.const f32x4 0.000001 0.000001 0.000001 0.000001
		f32x4.lt
		i32x4.all_true
		(if (result v128 v128 v128 v128)
			(then
				v128.const f32x4 1.0 0.0 0.0 0.0
				v128.const f32x4 0.0 1.0 0.0 0.0
				v128.const f32x4 0.0 0.0 1.0 0.0
				v128.const f32x4 0.0 0.0 0.0 1.0
			)
			(else
				
				local.get $up
				local.get $at
				(local.tee $at (call $normalizeV3))
				(local.tee $right (call $crossV3V3))
				(local.tee $right (call $normalizeV3))
				local.get $at
				(local.tee $Yaxis (call $crossV3V3))
				(local.set $Yaxis (call $normalizeV3))

				local.get $right
				local.get $Yaxis
				local.get $at
				v128.const f32x4 0.0 0.0 0.0 0.0
				call $transposeM4	
				local.get $pos
				(local.set $Waxis (call $mulM4V4))
				local.get $right
				f32x4.neg
				local.get $Yaxis
				f32x4.neg
				local.get $at
				f32x4.neg
				v128.const f32x4 0.0 0.0 0.0 0.0
				call $transposeM4
				drop
				local.get $Waxis	
				f32.const 1.0
				f32x4.replace_lane 3
			)
		)
	)
