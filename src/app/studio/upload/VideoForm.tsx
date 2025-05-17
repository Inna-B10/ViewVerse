import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { TagsField } from '@/ui/fields/TagsField'
import { Textarea } from '@/ui/fields/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { UploadVideoSkeleton } from './UploadVideoSkeleton'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	form: UseFormReturn<IVideoFormData, any, IVideoFormData>
	isReadyToPublish: boolean
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		watch
	},
	isReadyToPublish
}: Props) {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.STUDIO_HOME)
		},
		onError() {
			toast.error('Publishing video failed!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			name='videoUpload'
		>
			<div className='grid grid-cols-[2fr_1fr] gap-8'>
				{/* {true ? ( */}
				{isPending ? (
					<UploadVideoSkeleton />
				) : (
					<>
						<div className='border-border border-r pr-8'>
							{/* ---------------------------------- Title --------------------------------- */}
							<Field
								label='Title:'
								placeholder='Enter title'
								type='text'
								name='title'
								registration={register('title', { required: 'Title is required!' })}
								error={errors.title?.message}
							/>
							{/* ------------------------------- Description ------------------------------ */}
							<Textarea
								label='Description:'
								placeholder='Enter description'
								name='description'
								rows={7}
								registration={register('description', { required: 'Description is required' })}
								error={errors.description?.message}
								className='mt-5'
							/>

							{/* -------------------------------- Thumbnail ------------------------------- */}
							<Controller
								control={control}
								name='thumbnailUrl'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<UploadField
										label='Thumbnail: '
										onChange={onChange}
										value={value}
										error={error}
										folder='thumbnails'
										className='mb-4'
										sizePreview={[151, 82]}
									/>
								)}
							/>

							{/* ---------------------------------- Tags ---------------------------------- */}
							<Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										label='Tags:'
										onTagsChange={onChange}
										tags={value}
										error={error?.message}
									/>
								)}
							/>
						</div>
						<div>
							<div className='bg-gray-700 rounded-md overflow-hidden border border-border/0'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={watch('thumbnailUrl')}
										width={250}
										height={140}
										style={{ objectFit: 'cover' }}
									/>
								) : (
									<div className='w-full h-[140] bg-field font-medium text-sm flex items-center justify-center'>
										Waiting for thumbnail...
									</div>
								)}
								<div className='text-sm p-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			{/* --------------------------------- Button --------------------------------- */}
			<div className='text-center mt-[1.1rem]'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Processing video...'}
				</Button>
			</div>
		</form>
	)
}
