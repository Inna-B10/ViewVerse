'use client'

import * as m from 'framer-motion/m'
import { Upload } from 'lucide-react'
import { type ChangeEvent, type DragEvent, useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { useUpload } from '@/ui/upload-field/useUpload'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	reset: UseFormReset<IVideoFormData>
}

export function DragDropVideo({ reset }: Props) {
	const { uploadFile, isLoading: isUploading } = useUpload({
		maxFileSize: 3 * 1024 * 1024 * 1024, //3gb
		folder: 'videos',
		onSuccess(data) {
			const file = data[0]
			if (!file) {
				if (process.env.NODE_ENV === 'development') {
					console.log('Upload error: cannot find file(data[0]')
				}
				return
			}
			reset({
				videoFileName: file.name,
				title: file.name,
				maxResolution: file.maxResolution
			})
			toast.success('The video file has been uploaded successfully!')
		},
		onError() {
			toast.error('Failed to upload the video!')
		}
	})

	const [isDragging, setIsDragging] = useState(false)

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault()
		setIsDragging(true)
	}
	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault()
		setIsDragging(false)
		const file = event.dataTransfer?.files?.[0]
		if (file) {
			uploadFile({ target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>)
		}
	}
	return isUploading ? (
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '308px',
				position: 'relative'
			}}
		>
			<SkeletonLoader className='rounded-md h-[308px] w-full p-2' />
			<p className='mt-4 text-lg absolute left-[45%] top-[38%]'>Uploading ...</p>
		</m.div>
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
			<span>Supported file formats: .mp4 and .av</span>
			<Upload size={40} />
			<span>
				{isDragging ? 'Drop file here' : 'Drag and drop your video file here, or click to select'}
			</span>
			<input
				type='file'
				accept='video/mp4, video/avi'
				className='hidden'
				onChange={uploadFile}
			/>
		</label>
	)
}
