	(func (export "mulM4V4") (param i32 i32 i32) 
		(local $vec v128)
		(local $col1 v128)
		(local $col2 v128)
		(local $col3 v128)
		(local $col4 v128)
		local.get 2

			local.get 1
			(local.set $vec (v128.load))
			
			local.get 0
			(local.set $col1 (v128.load))

			local.get 0
			i32.const 16
			i32.add
			(local.set $col2 (v128.load))
			
			local.get 0
			i32.const 32
			i32.add
			(local.set $col3 (v128.load))

			local.get 0
			i32.const 48
			i32.add
			(local.set $col4 (v128.load))

			local.get $col1
			local.get $col2
			local.get $col3
			local.get $col4
			local.get $vec
			call $mulM4V4
		v128.store
	
	)
