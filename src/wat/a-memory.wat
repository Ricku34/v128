	(func $storeM4 (param v128 v128 v128 v128 i32) 
		local.get 4
		local.get 0
		v128.store
		
		local.get 4
		i32.const 16
		i32.add
		local.get 1
		v128.store
		
		local.get 4
		i32.const 32
		i32.add
		local.get 2
		v128.store

		local.get 4
		i32.const 48
		i32.add
		local.get 3
		v128.store
	)
	(func $loadV3 (param i32) (result v128)
		
		v128.const f32x4 0.0 0.0 0.0 0.0
		local.get 0
	 	f32.load
		f32x4.replace_lane 0
		local.get 0
		i32.const 4
		i32.add
		f32.load
		f32x4.replace_lane 1
		local.get 0
		i32.const 8
		i32.add
		f32.load
		f32x4.replace_lane 2
	)
	(func $storeV3 (param v128 i32)
		local.get 1
			local.get 0
			f32x4.extract_lane 0
		f32.store

		local.get 1
		i32.const 4
		i32.add
			local.get 0
			f32x4.extract_lane 1
		f32.store

		local.get 1
		i32.const 8
		i32.add
			local.get 0
			f32x4.extract_lane 2
		f32.store
	)
	(func $loadV2 (param i32) (result v128)
		
		v128.const f32x4 0.0 0.0 0.0 0.0
		local.get 0
	 	f32.load
		f32x4.replace_lane 0
		local.get 0
		i32.const 4
		i32.add
		f32.load
		f32x4.replace_lane 1
	)
	(func $storeV2 (param v128 i32)
		local.get 1
			local.get 0
			f32x4.extract_lane 0
		f32.store

		local.get 1
		i32.const 4
		i32.add
			local.get 0
			f32x4.extract_lane 1
		f32.store
	)
