import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylistData } from '@/types/playlist.types'

interface ICreatePlaylist {
	refetch: () => void
	onClose: () => void
	ref: React.RefObject<any | null>
}

export function CreatePlaylist({ refetch, onClose, ref }: ICreatePlaylist) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	useHotkeys('esc', event => {
		event.preventDefault()
		onClose()
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess: () => {
			refetch()
			reset()
			onClose()
			toast.success('Playlist successfully created!')
		},
		onError() {
			toast.error('Playlist creation failed!')
		}
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='w-[80%] max-w-[24rem] relative'
			>
				<div
					className='bg-bgSecondary relative rounded-lg p-6'
					ref={ref}
				>
					<button
						title='Close the form'
						onClick={onClose}
						className='absolute top-2 right-4 text-gray-500 hover:text-white transition-colors duration-300'
					>
						<X size={18} /> {/* Close icon */}
					</button>
					<Heading
						isPageHeading={false}
						hTag={'h3'}
						hSize='text-xl'
					>
						Create a New Playlist
					</Heading>
					<form
						onSubmit={handleSubmit(onSubmit)}
						name='playlist'
					>
						{isPending ? (
							<SkeletonLoader count={2} />
						) : (
							<>
								<Field
									label='Title'
									placeholder='Give a name'
									type='text'
									name='title'
									registration={register('title', { required: 'Title is required!' })}
									error={errors.title?.message}
								/>
								<Field
									label='Video public id (from url)'
									placeholder='Enter video public id'
									type='text'
									name='videoPublicId'
									registration={register('videoPublicId', {
										required: 'Video public id is required!',
										minLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters long!'
										},
										maxLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters long!'
										}
									})}
									error={errors.videoPublicId?.message}
								/>
							</>
						)}
						<div className='text-center mt-[1.1rem]'>
							<Button
								type='submit'
								isLoading={isPending}
							>
								Create new
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	)
}
