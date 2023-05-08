	(func $invertM4 (param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128) (result v128 v128 v128 v128)
		(local $tmp v128)
		(local $row0 v128)
		(local $row1 v128)
		(local $row2 v128)
		(local $row3 v128)
		(local $minor0 v128)
		(local $minor1 v128)
		(local $minor2 v128)
		(local $minor3 v128)
		(local $det v128)

		;; Transpose matrix 
		local.get $a0
		local.get $a1
		(local.tee $tmp (i8x16.shuffle 0 1 2 3 4 5 6 7 16 17 18 19 20 21 22 23)) ;; i32x4 0 1 4 5
		local.get $a2
		local.get $a3
		(local.tee $row1 (i8x16.shuffle 0 1 2 3 4 5 6 7 16 17 18 19 20 21 22 23)) ;; i32x4 0 1 4 5
		(local.set $row0 (i8x16.shuffle 0 1 2 3 8 9 10 11 16 17 18 19 24 25 26 27)) ;; i32x4 0 2 4 6
		local.get $row1
		local.get $tmp
		(local.set $row1 (i8x16.shuffle 4 5 6 7 12 13 14 15 20 21 22 23 28 29 30 31)) ;; i32x4 1 3 5 7
		local.get $a0
		local.get $a1
		(local.tee $tmp (i8x16.shuffle 8 9 10 11 12 13 14 15 24 25 26 27 28 29 30 31)) ;; i32x4 2 3 6 7
		local.get $a2
		local.get $a3
		(local.tee $row3 (i8x16.shuffle 8 9 10 11 12 13 14 15 24 25 26 27 28 29 30 31)) ;; i32x4 2 3 6 7
		(local.tee $row2 (i8x16.shuffle 0 1 2 3 8 9 10 11 16 17 18 19 24 25 26 27)) ;; i32x4 0 2 4 6
		local.get $row3
		local.get $tmp
		(local.tee $row3 (i8x16.shuffle 4 5 6 7 12 13 14 15 20 21 22 23 28 29 30 31)) ;; i32x4 1 3 5 7

		;; Compute matrix adjugate
		(local.tee $tmp (f32x4.mul)) ;; tmp = row2 * row3
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get  $row1
		(local.set $minor0 (f32x4.mul))
		local.get $row0
		local.get $tmp
		(local.set $minor1 (f32x4.mul))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $tmp (i8x16.swizzle))
		local.get  $row1
		f32x4.mul
		local.get  $minor0
		(local.set $minor0 (f32x4.sub))
		local.get  $row0
		local.get $tmp
		f32x4.mul
		local.get  $minor1
		(local.tee $minor1 (f32x4.sub))
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.set $minor1 (i8x16.swizzle))

		local.get $row1
		local.get $row2
		(local.tee $tmp (f32x4.mul))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get $row3
		f32x4.mul
		local.get $minor0
		(local.tee $minor0 (f32x4.add))
		local.get $row0
		local.get $tmp
		(local.set $minor3 (f32x4.mul))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.set $tmp (i8x16.swizzle))
		local.get $row3
		local.get $tmp
		f32x4.mul
		(local.set $minor0 (f32x4.sub))
		local.get $row0
		local.get $tmp
		f32x4.mul
		local.get $minor3
		(local.tee $minor3 (f32x4.sub))
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.set $minor3 (i8x16.swizzle))
		
		local.get $row1
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		i8x16.swizzle
		local.get $row3
		(local.tee $tmp (f32x4.mul))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get $row2
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $row2 (i8x16.swizzle))
		f32x4.mul ;; tmp * row2
		local.get $minor0
		(local.tee $minor0 (f32x4.add))
		local.get $row0
		local.get $tmp
		(local.set $minor2 (f32x4.mul))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $tmp (i8x16.swizzle))
		local.get $row2
		f32x4.mul
		(local.set $minor0 (f32x4.sub))
		local.get $row0
		local.get $tmp
		f32x4.mul
		local.get  $minor2
		(local.tee $minor2 (f32x4.sub))
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.set $minor2 (i8x16.swizzle))
		
		local.get $row0
		local.get $row1
		(local.tee $tmp (f32x4.mul))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get $row3
		f32x4.mul
		local.get $minor2
		(local.set $minor2 (f32x4.add))
		local.get $row2
		local.get $tmp
		f32x4.mul
		local.get $minor3
		(local.tee $minor3 (f32x4.sub))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $tmp (i8x16.swizzle))
		local.get $row3
		f32x4.mul
		local.get $minor2
		(local.set $minor2 (f32x4.sub))
		local.get $row2
		local.get $tmp
		f32x4.mul
		(local.set $minor3 (f32x4.sub))

		local.get $minor1
		local.get $row0
		local.get $row3
		(local.tee $tmp (f32x4.mul))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get $row2
		f32x4.mul
		(local.set $minor1 (f32x4.sub))
		local.get $row1
		local.get $tmp
		f32x4.mul
		local.get $minor2
		(local.tee $minor2 (f32x4.add))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $tmp (i8x16.swizzle))
		local.get $row2
		f32x4.mul
		local.get $minor1
		(local.set $minor1 (f32x4.add))
		local.get $row1
		local.get $tmp
		f32x4.mul
		(local.set $minor2 (f32x4.sub))

		local.get $row0
		local.get $row2
		(local.tee $tmp (f32x4.mul))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		(local.tee $tmp (i8x16.swizzle))
		local.get $row3
		f32x4.mul
		local.get $minor1
		(local.tee $minor1 (f32x4.add))
		local.get $minor3
		local.get $row1
		local.get $tmp
		f32x4.mul
		(local.set $minor3 (f32x4.sub))
		local.get $tmp
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		(local.tee $tmp (i8x16.swizzle))
		local.get $row3
		f32x4.mul
		(local.set $minor1 (f32x4.sub))
		local.get $row1
		local.get $tmp
		f32x4.mul
		local.get $minor3
		(local.set $minor3 (f32x4.add))
		
		;; Compute matrix determinant
		v128.const f32x4 1.0 1.0 1.0 1.0
		local.get $row0
		local.get $minor0
		(local.tee $det (f32x4.mul))
		v128.const i8x16 8 9 10 11 12 13 14 15 0 1 2 3 4 5 6 7 ;; i32x4  2 3 0 1
		i8x16.swizzle
		local.get $det
		(local.tee $det (f32x4.add))
		v128.const i8x16 4 5 6 7 0 1 2 3 12 13 14 15 8 9 10 11 ;; i32x4  1 0 3 2
		i8x16.swizzle
		local.get $det
		(local.tee $det (f32x4.add))
		(local.tee $tmp (f32x4.div))
		local.get $tmp
		f32x4.add
		local.get $tmp
		local.get $tmp
		f32x4.mul
		local.get $det
		f32x4.mul
		(local.tee $det (f32x4.sub))
		v128.const i8x16 0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 ;; i32x4  0 0 0 0
		(local.tee $det (i8x16.swizzle))

		;; Compute matrix inverse
		local.get $minor0
		f32x4.mul
		local.get $det
		local.get $minor1
		f32x4.mul
		local.get $det
		local.get $minor2
		f32x4.mul
		local.get $det
		local.get $minor3
		f32x4.mul

	)
