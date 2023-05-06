	(func (export "mulM4M4") (param i32 i32 i32)

		local.get 0
		v128.load ;; A col0
		
		local.get 0
		i32.const 16
		i32.add
		v128.load ;; A col1
		
		local.get 0
		i32.const 32
		i32.add
		v128.load ;; A col2

		local.get 0
		i32.const 48
		i32.add
		v128.load ;; A col3

		
		local.get 1
		v128.load ;; B col0

		local.get 1
		i32.const 16
		i32.add
		v128.load ;; B col1
		
		local.get 1
		i32.const 32
		i32.add
		v128.load ;; B col2

		local.get 1
		i32.const 48
		i32.add
		v128.load ;; B col3

		call $mulM4xM4
		local.get 2
		call $storeM4 
	)
	(func (export "lookAt") (param $pPos i32) (param $pTarget i32) (param $pDestM4 i32) (result i32)

		local.get $pPos
		v128.load ;; position vector
		
		local.get $pTarget
		v128.load ;; target position vector
		
		call $lookAt
		local.get $pDestM4
		call $storeM4 

		local.get $pDestM4
	)
