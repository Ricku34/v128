	(func $rotateX (param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128) (param $rad f32) (result v128 v128 v128 v128)
		(local $c v128)
		(local $s v128)
		local.get $rad
		call $cos
		(local.set $c (f32x4.splat))
		local.get $rad
		call $sin
		(local.set $s (f32x4.splat))
		
		local.get $a0 ;; unchanged

		local.get $a1
		local.get $c
		f32x4.mul
		local.get $a2
		local.get $s
		f32x4.mul
		f32x4.add

		local.get $a2
		local.get $c
		f32x4.mul
		local.get $a1
		local.get $s
		f32x4.mul
		f32x4.sub

		local.get $a3 ;; unchanged
	)
	(func $rotateY (param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128) (param $rad f32) (result v128 v128 v128 v128)
		(local $c v128)
		(local $s v128)
		local.get $rad
		call $cos
		(local.set $c (f32x4.splat))
		local.get $rad
		call $sin
		(local.set $s (f32x4.splat))
		
		
		local.get $a0
		local.get $c
		f32x4.mul
		local.get $a2
		local.get $s
		f32x4.mul
		f32x4.sub

		local.get $a1 ;; unchanged

		local.get $a0
		local.get $s
		f32x4.mul
		local.get $a2
		local.get $c
		f32x4.mul
		f32x4.add

		local.get $a3 ;; unchanged
	)
	(func $rotateZ (param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128) (param $rad f32) (result v128 v128 v128 v128)
		(local $c v128)
		(local $s v128)
		local.get $rad
		call $cos
		(local.set $c (f32x4.splat))
		local.get $rad
		call $sin
		(local.set $s (f32x4.splat))
		
		
		local.get $a0
		local.get $c
		f32x4.mul
		local.get $a1
		local.get $s
		f32x4.mul
		f32x4.add


		local.get $a0
		local.get $c
		f32x4.mul
		local.get $a1
		local.get $s
		f32x4.mul
		f32x4.sub

		local.get $a2 ;; unchanged
		local.get $a3 ;; unchanged
	)
	(func $translate (param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128) (param $vec v128) (result v128 v128 v128 v128)
		local.get $a0 ;; unchanged
		local.get $a1 ;; unchanged
		local.get $a2 ;; unchanged

		local.get $a0
		local.get $vec
		v128.const i8x16 0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 ;; i32x4  0, 0, 0, 0
		i8x16.swizzle
		f32x4.mul 

		local.get $a1
		local.get $vec
		v128.const i8x16 4 5 6 7 4 5 6 7 4 5 6 7 4 5 6 7 ;; i32x4  1, 1, 1, 1
		i8x16.swizzle
		f32x4.mul

		local.get $a2
		local.get $vec
		v128.const i8x16 8 9 10 11 8 9 10 11 8 9 10 11 8 9 10 11 ;; i32x4  2, 2, 2, 2
		i8x16.swizzle
		f32x4.mul

		local.get $a3
		f32x4.add
		f32x4.add
		f32x4.add

	)
