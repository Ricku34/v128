	(func $transposeM4 (param v128 v128 v128 v128) (result v128 v128 v128 v128)
	 	(local $tmp01 v128)
		(local $tmp23 v128)

		local.get 0
		local.get 1
		(local.set $tmp01 (i8x16.shuffle 0 1 2 3 4 5 6 7 16 17 18 19 20 21 22 23)) ;; i32x4 0 1 4 5

		local.get 2
		local.get 3
		(local.set $tmp23 (i8x16.shuffle 0 1 2 3 4 5 6 7 16 17 18 19 20 21 22 23)) ;; i32x4 0 1 4 5

		local.get $tmp01
		local.get $tmp23
		i8x16.shuffle 0 1 2 3 8 9 10 11 16 17 18 19 24 25 26 27 ;; i32x4 0 2 4 6

		local.get $tmp01
		local.get $tmp23
		i8x16.shuffle 4 5 6 7 12 13 14 15 20 21 22 23 28 29 30 31 ;; i32x4 1 3 5 7

		local.get 0
		local.get 1
		(local.set $tmp01 (i8x16.shuffle 8 9 10 11 12 13 14 15 24 25 26 27 28 29 30 31)) ;; i32x4 2 3 6 7

		local.get 2
		local.get 3
		(local.set $tmp23 (i8x16.shuffle 8 9 10 11 12 13 14 15 24 25 26 27 28 29 30 31)) ;; i32x4 2 3 6 7

		local.get $tmp01
		local.get $tmp23
		i8x16.shuffle 0 1 2 3 8 9 10 11 16 17 18 19 24 25 26 27 ;; i32x4 0 2 4 6

		local.get $tmp01
		local.get $tmp23
		i8x16.shuffle 4 5 6 7 12 13 14 15 20 21 22 23 28 29 30 31 ;; i32x4 1 3 5 7
		
	)
