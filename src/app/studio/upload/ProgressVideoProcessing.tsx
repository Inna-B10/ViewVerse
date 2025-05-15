'use client'

import { useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { COLORS } from '@/constants/colors.constants'
import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({ fileName, setIsReadyToPublish }: Props) {
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
			return queryProgress !== undefined && queryProgress.status < 100 ? 5000 : false
		},
		enabled: !!fileName
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

	console.log('processingData: ', processingData)
	return (
		progress > 0 && (
			<m.div
				initial={{ width: 0 }}
				animate={{ width: `${progress}%` }}
				style={{
					height: '0.5rem',
					backgroundColor: COLORS.primary,
					borderRadius: 10,
					transition: 'all 0.4s easy'
				}}
			/>
		)
	)
}
