	(func $crossV3V3 (param v128 v128) (result v128)
				local.get 0
				v128.const i8x16 4 5 6 7 8 9 10 11 0 1 2 3 12 13 14 15
				i8x16.swizzle

				local.get 1
				v128.const i8x16 8 9 10 11 0 1 2 3 4 5 6 7 12 13 14 15
				i8x16.swizzle
			f32x4.mul

				local.get 0
				v128.const i8x16 8 9 10 11 0 1 2 3 4 5 6 7 12 13 14 15
				i8x16.swizzle

				local.get 1
				v128.const i8x16 4 5 6 7 8 9 10 11 0 1 2 3 12 13 14 15
				i8x16.swizzle
			f32x4.mul
		f32x4.sub
	)
