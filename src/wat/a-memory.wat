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
