import { SkeletonLoader } from '@/ui/SkeletonLoader'

export function UploadVideoSkeleton() {
	return (
		<>
			<div>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[66]'
				/>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[176]'
				/>
				<SkeletonLoader
					count={1}
					className='bg-gray-700'
				/>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[66]'
				/>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[66]'
				/>
			</div>
			<div>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 w-[288] h-[140]'
				/>
				<SkeletonLoader
					count={2}
					className='bg-gray-700'
				/>
			</div>
		</>
	)
}
