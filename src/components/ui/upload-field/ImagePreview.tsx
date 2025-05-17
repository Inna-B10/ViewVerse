import Image from 'next/image'
import { SkeletonLoader } from '../SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string
	sizePreview?: [number, number]
}

export function ImagePreview({ isLoading, value, overlay, sizePreview = [100, 100] }: Props) {
	const [width, height] = sizePreview

	return (
		<div className='mt-3'>
			{isLoading ? (
				<SkeletonLoader style={{ width, height }} />
			) : !!value ? (
				<div className='relative'>
					{!!overlay && (
						<Image
							alt='overlay'
							className='rounded-md absolute top-0 left-0 w-full h-full'
							src={overlay}
							width={width}
							height={height}
							priority
						/>
					)}
					<Image
						alt='uploaded file'
						className='rounded-md'
						src={value}
						width={width}
						height={height}
						priority
						style={{ maxHeight: '162px' }}
					/>
				</div>
			) : (
				<div
					className=' bg-slate-700 font-medium text-sm flex items-center justify-center text-center rounded-md'
					style={{ width: `${width}px`, height: `${height}px` }}
				>
					Waiting for image...
				</div>
			)}
		</div>
	)
}
