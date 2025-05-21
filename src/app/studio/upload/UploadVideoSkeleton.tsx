import { SkeletonLoader } from '@/ui/SkeletonLoader'

export function UploadVideoSkeleton() {
	return (
		<>
			<div className='flex flex-col gap-8'>
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
					className='bg-gray-700 h-[66]'
				/>
				{/* <SkeletonLoader
					count={1}
					className='bg-gray-700 h-[66]'
				/> */}
			</div>
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col gap-8'>
					<SkeletonLoader
						count={1}
						className='bg-gray-700  h-[66]'
					/>
					<SkeletonLoader
						count={1}
						className='bg-gray-700 w-[288] h-[140]'
					/>
				</div>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[66]'
				/>
			</div>
		</>
	)
}
