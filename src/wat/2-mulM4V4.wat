	;; transform vector f32x4  by matrix 4 f32x4 columns 
	(func $mulM4V4 (param $col1 v128) (param $col2 v128) (param $col3 v128) (param $col4 v128) (param $vec v128) (result v128)
		(local $u1 v128)
		(local $u2 v128)
		(local $u3 v128)
		(local $u4 v128)
		(local $prod1 v128)
		(local $prod2 v128)
		(local $prod3 v128)
		(local $prod4 v128)

		local.get $vec
		f32x4.extract_lane 0
		(local.set $u1 (f32x4.splat))

		local.get $vec
		f32x4.extract_lane 1
		(local.set $u2 (f32x4.splat))
		
		local.get $vec
		f32x4.extract_lane 2
		(local.set $u3 (f32x4.splat))
		
		local.get $vec
		f32x4.extract_lane 3
		(local.set $u4 (f32x4.splat))
		
		local.get $u1
		local.get $col1
		(local.set $prod1 (f32x4.mul))

		local.get $u2
		local.get $col2
		(local.set $prod2 (f32x4.mul))

		local.get $u3
		local.get $col3
		(local.set $prod3 (f32x4.mul))

		local.get $u4
		local.get $col4
		(local.set $prod4 (f32x4.mul))	

		local.get $prod1
		local.get $prod2
		f32x4.add
		local.get $prod3
		local.get $prod4
		f32x4.add
		f32x4.add
	)