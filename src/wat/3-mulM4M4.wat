	;; multiply 2 matrix 4 f32x4 rows
	(func $mulM4xM4 
		(param $a0 v128) (param $a1 v128) (param $a2 v128) (param $a3 v128)
		(param $b0 v128) (param $b1 v128) (param $b2 v128) (param $b3 v128)
			(result v128 v128 v128 v128)
		local.get $b0
		f32x4.extract_lane 0
		f32x4.splat
		local.get $a0
		f32x4.mul

			local.get $b0
			f32x4.extract_lane 1
			f32x4.splat
			local.get $a1
			f32x4.mul

				local.get $b0
				f32x4.extract_lane 2
				f32x4.splat
				local.get $a2
				f32x4.mul

				local.get $b0
				f32x4.extract_lane 3
				f32x4.splat
				local.get $a3
				f32x4.mul
				f32x4.add
			f32x4.add
		f32x4.add ;; first  result

		local.get $b1
		f32x4.extract_lane 0
		f32x4.splat
		local.get $a0
		f32x4.mul

			local.get $b1
			f32x4.extract_lane 1
			f32x4.splat
			local.get $a1
			f32x4.mul

				local.get $b1
				f32x4.extract_lane 2
				f32x4.splat
				local.get $a2
				f32x4.mul

				local.get $b1
				f32x4.extract_lane 3
				f32x4.splat
				local.get $a3
				f32x4.mul
				f32x4.add
			f32x4.add
		f32x4.add ;; 2me result

		local.get $b2
		f32x4.extract_lane 0
		f32x4.splat
		local.get $a0
		f32x4.mul

			local.get $b2
			f32x4.extract_lane 1
			f32x4.splat
			local.get $a1
			f32x4.mul

				local.get $b2
				f32x4.extract_lane 2
				f32x4.splat
				local.get $a2
				f32x4.mul

				local.get $b2
				f32x4.extract_lane 3
				f32x4.splat
				local.get $a3
				f32x4.mul
				f32x4.add
			f32x4.add
		f32x4.add ;; 3me  result

		local.get $b3
		f32x4.extract_lane 0
		f32x4.splat
		local.get $a0
		f32x4.mul

			local.get $b3
			f32x4.extract_lane 1
			f32x4.splat
			local.get $a1
			f32x4.mul

				local.get $b3
				f32x4.extract_lane 2
				f32x4.splat
				local.get $a2
				f32x4.mul

				local.get $b3
				f32x4.extract_lane 3
				f32x4.splat
				local.get $a3
				f32x4.mul
				f32x4.add
			f32x4.add
		f32x4.add ;; 4me result

	)
