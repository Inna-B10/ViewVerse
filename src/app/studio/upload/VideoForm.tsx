import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { TagsField } from '@/ui/fields/TagsField'
import { Textarea } from '@/ui/fields/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	form: UseFormReturn<IVideoFormData, any, IVideoFormData>
	isReadyToPublish: boolean
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
		control,
		formState: { errors }
	},
	isReadyToPublish
}: Props) {
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

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		// mutate({ ...data, videoPublicId })
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			name='playlist'
		>
			{false ? (
				<SkeletonLoader count={2} />
			) : (
				<div className=' flex flex-col gap-4'>
					<Field
						label='Title:'
						placeholder='Enter title'
						type='text'
						name='title'
						registration={register('title', { required: 'Title is required!' })}
						error={errors.title?.message}
					/>
					<Textarea
						label='Description:'
						placeholder='Enter description'
						name='description'
						rows={7}
						registration={register('description')}
						error={errors.description?.message}
					/>
					{/* //[TODO] upload thumbnail, tags */}
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
							/>
						)}
					/>
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
	)
}
