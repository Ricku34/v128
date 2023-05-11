	(func (export "rotateX") (param i32 f32 i32) (result i32)
		local.get 0
		v128.load ;; Matrix col0
		
		local.get 0
		i32.const 16
		i32.add
		v128.load ;; Matrix col1
		
		local.get 0
		i32.const 32
		i32.add
		v128.load ;; Matrix col2

		local.get 0
		i32.const 48
		i32.add
		v128.load ;; Matrix col3

		local.get 1 ;; rad angle

		call $rotateX
		local.get 2
		call $storeM4 

		local.get 2
	)
	(func (export "rotateY") (param i32 f32 i32) (result i32)
		local.get 0
		v128.load ;; Matrix col0
		
		local.get 0
		i32.const 16
		i32.add
		v128.load ;; Matrix col1
		
		local.get 0
		i32.const 32
		i32.add
		v128.load ;; Matrix col2

		local.get 0
		i32.const 48
		i32.add
		v128.load ;; Matrix col3

		local.get 1 ;; rad angle

		call $rotateY
		local.get 2
		call $storeM4 

		local.get 2
	)
	(func (export "rotateZ") (param i32 f32 i32) (result i32)
		local.get 0
		v128.load ;; Matrix col0
		
		local.get 0
		i32.const 16
		i32.add
		v128.load ;; Matrix col1
		
		local.get 0
		i32.const 32
		i32.add
		v128.load ;; Matrix col2

		local.get 0
		i32.const 48
		i32.add
		v128.load ;; Matrix col3

		local.get 1 ;; rad angle

		call $rotateZ
		local.get 2
		call $storeM4 

		local.get 2
	)
	(func (export "translate") (param i32 i32 i32) (result i32)
		local.get 0
		v128.load ;; Matrix col0
		
		local.get 0
		i32.const 16
		i32.add
		v128.load ;; Matrix col1
		
		local.get 0
		i32.const 32
		i32.add
		v128.load ;; Matrix col2

		local.get 0
		i32.const 48
		i32.add
		v128.load ;; Matrix col3

		local.get 1 
		v128.load ;; vector
		call $translate
		local.get 2
		call $storeM4 

		local.get 2
	)
