import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	isReadyToPublish: boolean
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({
	fileName,
	isReadyToPublish,
	setIsReadyToPublish
}: Props) {
	const [progress, setProgress] = useState(0)

	//* working version, but not optimal
	// const trackProcessingStatus = (fileName: string) => {
	// 	const intervalId = setInterval(async () => {
	// 		const { data } = await fileService.getProcessingStatus(fileName)
	// 		setProgress(data)
	// 		if (data === 100) {
	// 			clearInterval(intervalId)
	// 			setIsReadyToPublish(true)
	// 			toast.success('Video processing completed.')
	// 		}
	// 	}, 2000)
	// }

	//* more optimal versional to get processing progress
	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['processing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		select(data) {
			return data.data.status
		},
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress.status < 100 ? 3500 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	useEffect(() => {
		if (!processingData) {
			if (process.env.NODE_ENV === 'development') {
				console.log('Error getting processingData')
			}
			return
		}
		setProgress(processingData)
		if (processingData === 100) {
			setIsReadyToPublish(true)
			toast.success('Video processing completed.')
		}
	}, [isSuccess, processingData, setIsReadyToPublish])

	return (
		progress > 0 && (
			<div
				className='flex items-center justify-center w-full py-0.5 relative rounded overflow-hidden mb-8'
				style={{ backgroundColor: 'rgba(196,196,196,0.3)' }}
			>
				<div
					className={cn(
						'absolute inset-0 h-full bg-gradient-to-r from-[#05df72] to-[#016630] transition-all',
						progress < 100 && 'animate-pulse'
					)}
					style={{
						width: progress ? `${progress}%` : 0
					}}
				/>

				<div className='relative tracking-wider text-xs font-medium'>
					Processing video ({Math.round(progress)}%)
				</div>
			</div>
		)
	)
}
