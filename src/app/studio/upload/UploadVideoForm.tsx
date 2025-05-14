'use client'

import { useQuery } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { Upload } from 'lucide-react'
import { type DragEvent, useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { useUpload } from '@/ui/upload-field/useUpload'
import { COLORS } from '@/constants/colors.constants'
import { fileService } from '@/services/studio/file.service'
import type { IVideoFormData } from '@/types/studio-videos.types'

export function UploadVideoForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		watch
	} = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const fileName = watch('videoFileName')

	// const { mutate, isPending } = useMutation({
	// 	mutationKey: ['create playlist'],
	// 	mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
	// 	onSuccess: () => {
	// 		reset()
	// 		toast.success('Playlist successfully created!')
	// 	},
	// 	onError() {
	// 		toast.error('Playlist creation failed!')
	// 	}
	// })

	const [progress, setProgress] = useState(0)
	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

	const { uploadFile, isLoading: isUploading } = useUpload({
		maxFileSize: 3 * 1024 * 1024 * 1024, //3gb
		onSuccess(data) {
			const file = data[0]
			if (!file) {
				if (process.env.NODE_ENV === 'development') {
					console.log('Upload error: cannot find file(data[0]')
				}
				return
			}
			reset({
				videoFileName: file.url,
				title: file.name,
				maxResolution: file.maxResolution
			})
			toast.success('The video file has been uploaded successfully!')
		},
		onError() {
			toast.error('Failed to upload the video!')
		}
	})

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
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress < 100 ? 1000 : false
		}
	})

	useEffect(() => {
		const progressResponse = processingData?.data
		if (!progressResponse) {
			if (process.env.NODE_ENV === 'development') {
				console.log('Error getting progressResponse')
			}
			return
		}
		setProgress(progressResponse)
		if (progressResponse === 100) {
			setIsReadyToPublish(true)
			toast.success('Video processing completed.')
		}
	}, [isSuccess, processingData?.data])

	//*end

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		// mutate({ ...data, videoPublicId })
	}
	const [isDragging, setIsDragging] = useState(false)
	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}
	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files?.[0]
		if (file) {
			uploadFile({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>)
		}
	}

	const isPending = false

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-black/50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='w-[80%] max-w-[60rem] relative'
			>
				<div className='bg-bg rounded-lg px-8 pt-9 pb-11'>
					<Heading
						isPageHeading={false}
						hSize='text-2xl'
						className='justify-center'
					>
						Upload a video
					</Heading>

					{isUploading ? (
						<SkeletonLoader className='rounded-md h-72' />
					) : (
						<label
							className={twMerge(
								'flex flex-col items-center justify-center h-72 p-2 gap-4 rounded-md bg-field border-2 border-border border-dashed cursor-pointer transition-all duration-200  mb-8 text-sm text-gray-300 hover:text-white hover:border-gray-400',
								isDragging && 'border-primary text-white border-solid'
							)}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<Upload size={40} />
							<span>
								{isDragging
									? 'Drop file here'
									: 'Drag and drop your video file here, or click to select'}
							</span>
							<input
								type='file'
								accept='video/*'
								className='hidden'
								onChange={uploadFile}
							/>
						</label>
					)}

					{isUploading && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<p className='mt-4'>Uploading ...</p>
						</m.div>
					)}

					{/* ------------------------------ Progress Bar ------------------------------ */}

					{progress > 0 && progress < 100 && (
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
					)}

					{watch('videoFileName') && (
						<form
							onSubmit={handleSubmit(onSubmit)}
							name='playlist'
						>
							{isPending ? (
								<SkeletonLoader count={1} />
							) : (
								<div className=' flex flex-col gap-4'>
									<Field
										label='Title:'
										placeholder='Give a name'
										type='text'
										name='title'
										registration={register('title', { required: 'Title is required!' })}
										error={errors.title?.message}
									/>
									<Textarea
										label='Description:'
										placeholder='Enter description'
										name='description'
										rows={10}
										registration={register('description')}
										error={errors.description?.message}
									/>
									{/* //[TODO] upload thumbnail, tags */}
								</div>
							)}
							<div className='text-center mt-[1.1rem]'>
								{/* <button
								type='submit'
								disabled={isPending}
								className='py-1 px-3 w-fit font-semibold rounded duration-300 transition-all disabled:bg-gray-400	bg-primary hover:bg-primaryDark text-field'
							>
								Publish
							</button> */}
								<Button
									type='submit'
									disabled={!isReadyToPublish}
								>
									{isReadyToPublish ? 'Publish' : 'Processing video...'}
								</Button>
							</div>
						</form>
					)}
				</div>
			</m.div>
		</div>
	)
}
