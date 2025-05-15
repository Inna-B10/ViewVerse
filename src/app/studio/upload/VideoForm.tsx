import type { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	form: UseFormReturn<IVideoFormData, any, IVideoFormData>
	isReadyToPublish: boolean
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
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
	)
}
