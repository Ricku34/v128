	(func (export "length") (param i32) (result f32)
			local.get 0
			v128.load 
			call $lenV3
	)
	(func (export "normalize") (param i32 i32) (result i32)
		local.get 1
			local.get 0
			v128.load 
			call $normalizeV3
		v128.store
		local.get 1
	)
	(func (export "addV4V4") (param i32 i32 i32) (result i32)

		local.get 2
			local.get 0
			v128.load ;; vector A 
			
			local.get 1
			v128.load ;; vector B

			f32x4.add
		v128.store
		local.get 2
	)
	(func (export "subV4V4") (param i32 i32 i32) (result i32)

		local.get 2
			local.get 0
			v128.load ;; vector A 
			
			local.get 1
			v128.load ;; vector B

			f32x4.sub
		v128.store
		local.get 2
	)
	(func (export "mulV4V4") (param i32 i32 i32) (result i32)

		local.get 2
			local.get 0
			v128.load ;; vector A 
			
			local.get 1
			v128.load ;; vector B

			f32x4.mul
		v128.store
		local.get 2
	)
	(func (export "divV4V4") (param i32 i32 i32) (result i32)

		local.get 2
			local.get 0
			v128.load ;; vector A 
			
			local.get 1
			v128.load ;; vector B

			f32x4.mul
		v128.store
		local.get 2
	)
	(func (export "crossV3V3") (param i32 i32 i32) (result i32)

		local.get 2
			local.get 0
			v128.load ;; vector A 
			
			local.get 1
			v128.load ;; vector B

			call $crossV3V3
		v128.store
		local.get 2
	)
