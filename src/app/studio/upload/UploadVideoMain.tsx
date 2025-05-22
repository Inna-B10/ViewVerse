'use client'

import * as m from 'framer-motion/m'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Heading } from '@/ui/Heading'
import { CreateVideoForm } from './CreateVideoForm'
import { DragDropVideo } from './DragDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'
import type { IVideoFormData } from '@/types/studio-videos.types'

export function UploadVideoMain() {
	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const fileName = form.watch('videoFileName')

	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

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

					{!fileName && <DragDropVideo reset={form.reset} />}

					<ProgressVideoProcessing
						fileName={fileName}
						isReadyToPublish={isReadyToPublish}
						setIsReadyToPublish={setIsReadyToPublish}
					/>

					{!!fileName && (
						<CreateVideoForm
							form={form}
							isReadyToPublish={isReadyToPublish}
						/>
					)}
				</div>
			</m.div>
		</div>
	)
}
