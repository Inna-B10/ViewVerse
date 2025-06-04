'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { type Toast } from 'react-hot-toast'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function StudioActions({ video }: Props) {
	const queryClient = useQueryClient()

	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete a video'],
		mutationFn: () => studioVideoService.delete(video.id),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			const { toast } = await import('react-hot-toast')
			toast.success('Successfully deleted!')
		}
	})

	const handleDelete = async () => {
		const { toast } = await import('react-hot-toast')
		toast.custom((t: Toast) => (
			<div className='whitespace-nowrap text-white bg-zinc-700 border border-white/20 shadow-lg rounded-md p-4'>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2 transition-all duration-300'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-500 font-bold hover:underline hover:underline-offset-4'
						title='Delete the video'
						aria-label='Delete the video'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-300 font-bold hover:underline hover:underline-offset-4'
						title='Cancel deleting'
						aria-label='Cancel deleting'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}

	return (
		<div className='flex justify-center items-start gap-5'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='text-blue-600 transition-opacity opacity-80 hover:opacity-100'
				target='_blank'
				title='Open the video in a new tab'
				aria-label='Open the video in a new tab'
			>
				<ExternalLink size={22} />
			</Link>
			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='text-primary transition-opacity opacity-80 hover:opacity-100'
				title='Edit the video'
				aria-label='Edit the video'
			>
				<Edit size={22} />
			</Link>
			<button
				onClick={handleDelete}
				className='text-red-500 transition-opacity opacity-80 hover:opacity-100'
				title='Delete the video'
				aria-label='Delete the video'
				disabled={isDeletePending}
			>
				<Trash2 size={22} />
			</button>
		</div>
	)
}
